import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

function readYaml(relativePath) {
  return yaml.load(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'))
}

describe('1949-2024 年 5 级（⭐⭐⭐⭐⭐ 历史转折）重大事件配图 100% 全覆盖强约束验证', () => {
  const events = [
    ...readYaml('data/events/xiandai.yaml'),
    ...readYaml('data/world/modern.yaml'),
  ]

  const years = Array.from({ length: 76 }, (_, i) => String(1949 + i))
  const major5StarEvents = events.filter((event) => {
    const year = String(event.date).slice(0, 4)
    return years.includes(year) && event.importance === 5
  })

  it('1949-2024 年共有 511 条 5 级重大事件', () => {
    expect(major5StarEvents.length).toBe(511)
  })

  it('所有 511 条 5 级重大事件必须 100% 配置图片、本地物理存在且具备非空图注', () => {
    for (const event of major5StarEvents) {
      expect(event.image, `${event.id} 缺少 image 属性`).toBeTypeOf('object')
      expect(event.image.url).toMatch(/^\/images\/events\/(?:19[4-9]\d|20\d{2})\/[a-zA-Z0-9_-]+\.(?:jpg|png|webp)$/)
      expect(event.image.caption.trim().length, `${event.id} 图注为空`).toBeGreaterThan(0)

      const imagePath = path.join(ROOT, 'public', event.image.url.replace(/^\//, ''))
      expect(fs.existsSync(imagePath), `${event.id} 图片文件 ${event.image.url} 不存在`).toBe(true)
      expect(fs.statSync(imagePath).size, `${event.id} 图片文件 ${event.image.url} 过小`).toBeGreaterThan(1024)
    }
  })
})
