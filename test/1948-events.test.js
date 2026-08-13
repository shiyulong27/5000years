import { describe, expect, it } from 'vitest'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

describe('1948 年重大事件补全', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const chinaEvents = data.events.filter((event) => String(event.date).startsWith('1948'))
  const worldEvents = data.worldEvents.filter((event) => String(event.date).startsWith('1948'))
  const requiredFields = [
    'id', 'date', 'title', 'category', 'importance',
    'summary', 'confidence', 'tags', 'sources',
  ]

  it('包含已确认的 7 条中国事件和 10 条世界事件，且字段完整', () => {
    expect(chinaEvents).toHaveLength(7)
    expect(worldEvents).toHaveLength(10)

    for (const event of [...chinaEvents, ...worldEvents]) {
      for (const field of requiredFields) {
        expect(event, `${event.id ?? event.title ?? '未知事件'} 缺少 ${field}`).toHaveProperty(field)
      }
      expect(event.importance).toBeGreaterThanOrEqual(1)
      expect(event.importance).toBeLessThanOrEqual(5)
      expect(event.confidence).toBe('确定')
      expect(event.tags.length).toBeGreaterThan(0)
      expect(event.sources.length).toBeGreaterThan(1)
    }
  })

  it('包含五一口号、三大战役、人民币、以色列建国、柏林封锁与世界人权宣言', () => {
    const ids = [...chinaEvents, ...worldEvents].map((event) => event.id)
    expect(ids).toEqual(expect.arrayContaining([
      'cn-may-day-slogans-194804',
      'cn-liaoshen-campaign-194809',
      'cn-huaihai-campaign-194811',
      'cn-pingjin-campaign-194811',
      'cn-pboc-first-rmb-194812',
      'w-israel-founded-war-194805',
      'w-berlin-blockade-airlift-194806',
      'w-udhr-adopted-194812',
    ]))
  })

  it('存在 1948 年专页并注册两个主时间线入口', () => {
    expect(fs.existsSync(path.join(ROOT, 'src/pages/1948.astro'))).toBe(true)

    const timeline = fs.readFileSync(path.join(ROOT, 'src/components/Timeline.astro'), 'utf8')
    const axisCell = fs.readFileSync(path.join(ROOT, 'src/components/AxisCell.astro'), 'utf8')
    expect(timeline).toMatch(/summaryYears\s*=\s*\[[^\]]*1948/)
    expect(axisCell).toMatch(/hasSummary\s*=\s*\[[^\]]*1948/)
  })

  it('五星事件及已核验的重点事件使用可追溯且不重复的真实配图', () => {
    const illustratedIds = [
      'cn-liaoshen-campaign-194809',
      'cn-huaihai-campaign-194811',
      'cn-pingjin-campaign-194811',
      'cn-pboc-first-rmb-194812',
      'cn-kiangya-disaster-194812',
      'w-gandhi-assassination-194801',
      'w-israel-founded-war-194805',
      'w-south-africa-national-party-194805',
      'w-manchester-baby-194806',
      'w-berlin-blockade-airlift-194806',
      'w-korean-two-states-194808',
      'w-udhr-adopted-194812',
    ]
    const events = [...chinaEvents, ...worldEvents]
    const hashes = new Set()

    for (const event of events.filter((item) => item.importance === 5)) {
      expect(event.image, `${event.id} 五星事件缺少配图`).toBeTypeOf('object')
    }

    for (const id of illustratedIds) {
      const event = events.find((item) => item.id === id)
      expect(event, `${id} 事件不存在`).toBeTruthy()
      expect(event.image, `${id} 缺少配图`).toMatchObject({
        url: expect.stringMatching(/^\/images\/events\/1948\/.+\.(?:jpg|png|webp)$/),
        caption: expect.any(String),
        source: expect.stringMatching(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/),
        author: expect.any(String),
        license: expect.any(String),
      })

      const imagePath = path.join(ROOT, 'public', event.image.url.replace(/^\//, ''))
      expect(fs.existsSync(imagePath), `${id} 图片文件不存在`).toBe(true)
      expect(fs.statSync(imagePath).size, `${id} 图片文件过小`).toBeGreaterThan(1024)
      const hash = crypto.createHash('sha256').update(fs.readFileSync(imagePath)).digest('hex')
      expect(hashes.has(hash), `${id} 与其他 1948 事件复用了同一图片`).toBe(false)
      hashes.add(hash)
    }
  })
})
