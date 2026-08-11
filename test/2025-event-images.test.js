import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const EXPECTED_IDS = [
  'cn-deepseek-202501',
  'cn-sco-tianjin-202509',
  'cn-antijapan-80th-202509',
  'cn-4th-plenum-20th-202510',
  'cn-fujian-commission-202511',
  'w-gaza-ceasefire-202501',
  'w-us-trump-2nd-term-202501',
  'w-liberation-day-tariffs-202504',
  'w-pope-francis-dies-202504',
  'w-israel-iran-war-202506',
  'w-gaza-ceasefire-plan-202510',
  'w-un-80th-202510',
]

function readYaml(relativePath) {
  return yaml.load(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'))
}

describe('2025 年五级重大事件数据与专属配图校验', () => {
  const events = [
    ...readYaml('data/events/xiandai.yaml'),
    ...readYaml('data/world/modern.yaml'),
  ]
  const major2025 = events.filter(
    (event) => String(event.date).startsWith('2025') && event.importance === 5,
  )

  it('五级事件集合保持为已确认的 12 条', () => {
    expect(major2025.map((event) => event.id).sort()).toEqual([...EXPECTED_IDS].sort())
  })

  it('配有图片的五级事件必须拥有有效本地物理图片与非空图注', () => {
    const withImg = major2025.filter(e => e.image && e.image.url)
    for (const event of withImg) {
      expect(event.image).toBeTypeOf('object')
      expect(event.image.url).toMatch(/^\/images\/events\/2025\/[a-z0-9-]+\.(?:jpg|png|webp)$/)
      expect(event.image.caption.trim().length).toBeGreaterThan(0)

      const imagePath = path.join(ROOT, 'public', event.image.url.replace(/^\//, ''))
      expect(fs.existsSync(imagePath), `${event.id} 图片不存在`).toBe(true)
      expect(fs.statSync(imagePath).size, `${event.id} 图片文件过小`).toBeGreaterThan(1024)
    }
  })
})
