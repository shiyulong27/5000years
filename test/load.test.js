import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll, locOf } from '../src/lib/load.js'

const FIXTURES = fileURLToPath(new URL('./fixtures', import.meta.url))
const ROOT = fileURLToPath(new URL('..', import.meta.url))

describe('loadAll', () => {
  const data = loadAll(FIXTURES)

  it('读入朝代', () => {
    expect(data.dynasties).toHaveLength(8)
    expect(data.dynasties.map((d) => d.id)).toContain('qin')
  })

  it('合并 rulers/ 下的所有文件', () => {
    // qin.yaml 两条 + han.yaml 三条
    expect(data.rulers).toHaveLength(5)
  })

  it('合并 events/ 下的所有文件，文件名不参与解析', () => {
    // qin.yaml 两条 + han.yaml 两条 + sanguo.yaml 一条
    expect(data.events).toHaveLength(5)
    const ids = data.events.map((e) => e.id)
    expect(ids).toContain('qin-unify-221bc')
    expect(ids).toContain('wei-founding-220')
  })

  it('读入世界事件与文明色带', () => {
    expect(data.worldEvents).toHaveLength(2)
    expect(data.civilizations).toHaveLength(3)
  })

  it('目录缺失时返回空数组而非抛错', () => {
    const empty = loadAll(fileURLToPath(new URL('./fixtures/nonexistent', import.meta.url)))
    expect(empty.events).toEqual([])
    expect(empty.dynasties).toEqual([])
  })
})

describe('locOf', () => {
  const data = loadAll(FIXTURES)

  it('朝代记录带正确的文件与行号', () => {
    const qin = data.dynasties.find((d) => d.id === 'qin')
    const loc = locOf(qin)
    expect(loc.file).toBe('dynasties.yaml')
    // fixtures/dynasties.yaml 中 "- id: qin" 在第 9 行
    expect(loc.line).toBe(9)
  })

  it('事件记录带正确的文件与行号', () => {
    const ev = data.events.find((e) => e.id === 'dazexiang-209bc')
    const loc = locOf(ev)
    expect(loc.file).toBe('events/qin.yaml')
    expect(loc.line).toBe(13)
  })

  it('无 id 的记录（君主）按序回查行号', () => {
    const r = data.rulers.find((x) => x.temple_name === '秦二世')
    const loc = locOf(r)
    expect(loc.file).toBe('rulers/qin.yaml')
    expect(loc.line).toBe(11)
  })

  it('位置信息不污染数据本身', () => {
    const qin = data.dynasties.find((d) => d.id === 'qin')
    expect(Object.keys(qin)).not.toContain('loc')
    // 序列化后不应出现位置信息
    expect(JSON.stringify(qin)).not.toContain('dynasties.yaml')
  })
})

describe('1989 年重大事件补全', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const chinaEvents = data.events.filter((event) => String(event.date).startsWith('1989'))
  const worldEvents = data.worldEvents.filter((event) => String(event.date).startsWith('1989'))
  const requiredFields = [
    'id', 'date', 'title', 'category', 'importance',
    'summary', 'confidence', 'tags', 'sources',
  ]

  it('包含已确认的 8 条中国事件和 10 条世界事件，且字段完整', () => {
    expect(chinaEvents).toHaveLength(8)
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

  it('存在 1989 年专页并注册两个主时间线入口', () => {
    expect(fs.existsSync(path.join(ROOT, 'src/pages/1989.astro'))).toBe(true)

    const timeline = fs.readFileSync(path.join(ROOT, 'src/components/Timeline.astro'), 'utf8')
    const axisCell = fs.readFileSync(path.join(ROOT, 'src/components/AxisCell.astro'), 'utf8')
    expect(timeline).toMatch(/summaryYears\s*=\s*\[[^\]]*1989/)
    expect(axisCell).toMatch(/hasSummary\s*=\s*\[[^\]]*1989/)
  })
})

describe('1970 年重大事件补全', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const chinaEvents = data.events.filter((event) => String(event.date).startsWith('1970'))
  const worldEvents = data.worldEvents.filter((event) => String(event.date).startsWith('1970'))
  const requiredFields = [
    'id', 'date', 'title', 'category', 'importance',
    'summary', 'confidence', 'tags', 'sources',
  ]

  it('包含已确认的 7 条中国事件和 11 条世界事件，且字段完整', () => {
    expect(chinaEvents).toHaveLength(7)
    expect(worldEvents).toHaveLength(11)

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

  it('存在 1970 年专页并注册两个主时间线入口', () => {
    expect(fs.existsSync(path.join(ROOT, 'src/pages/1970.astro'))).toBe(true)

    const timeline = fs.readFileSync(path.join(ROOT, 'src/components/Timeline.astro'), 'utf8')
    const axisCell = fs.readFileSync(path.join(ROOT, 'src/components/AxisCell.astro'), 'utf8')
    expect(timeline).toMatch(/summaryYears\s*=\s*\[[^\]]*1970/)
    expect(axisCell).toMatch(/hasSummary\s*=\s*\[[^\]]*1970/)
  })
})

describe('1971—1979 年重大事件连续补全', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const timeline = fs.readFileSync(path.join(ROOT, 'src/components/Timeline.astro'), 'utf8')
  const axisCell = fs.readFileSync(path.join(ROOT, 'src/components/AxisCell.astro'), 'utf8')
  const requiredFields = [
    'id', 'date', 'title', 'category', 'importance',
    'summary', 'confidence', 'tags', 'sources',
  ]

  for (const year of [1971, 1972, 1973, 1974]) {
    it(`${year} 年有完整的中外事件、专页和中轴入口`, () => {
      const chinaEvents = data.events.filter((event) => String(event.date).startsWith(String(year)))
      const worldEvents = data.worldEvents.filter((event) => String(event.date).startsWith(String(year)))
      expect(chinaEvents.length, `${year} 年中国事件不足`).toBeGreaterThanOrEqual(6)
      expect(worldEvents.length, `${year} 年世界事件不足`).toBeGreaterThanOrEqual(8)

      for (const event of [...chinaEvents, ...worldEvents]) {
        for (const field of requiredFields) {
          expect(event, `${event.id ?? event.title ?? '未知事件'} 缺少 ${field}`).toHaveProperty(field)
        }
        expect(event.sources.length).toBeGreaterThan(1)
      }

      expect(fs.existsSync(path.join(ROOT, `src/pages/${year}.astro`))).toBe(true)
      expect(timeline).toMatch(new RegExp(`summaryYears\\s*=\\s*\\[[^\\]]*${year}`))
      expect(axisCell).toMatch(new RegExp(`hasSummary\\s*=\\s*\\[[^\\]]*${year}`))
    })
  }
})
