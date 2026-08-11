import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

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
    expect(major2025.length).toBe(12)
  })

  it('2025 年配有图片的 5 级重大事件必须拥有有效本地物理图片与非空图注', () => {
    const withImg = major2025.filter(e => e.image && e.image.url)
    for (const event of withImg) {
      expect(event.image).toBeTypeOf('object')
      expect(event.image.url).toMatch(/^\/images\/events\/2025\/[a-zA-Z0-9_-]+\.(?:jpg|png|webp)$/)
      expect(event.image.caption.trim().length, `${event.id} 图注为空`).toBeGreaterThan(0)

      const imagePath = path.join(ROOT, 'public', event.image.url.replace(/^\//, ''))
      expect(fs.existsSync(imagePath), `${event.id} 图片不存在`).toBe(true)
      expect(fs.statSync(imagePath).size, `${event.id} 图片文件过小`).toBeGreaterThan(1024)
    }
  })
})
