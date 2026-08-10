import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

function readYaml(relativePath) {
  return yaml.load(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'))
}

describe('2020-2024 年重大事件配图验证', () => {
  const events = [
    ...readYaml('data/events/xiandai.yaml'),
    ...readYaml('data/world/modern.yaml'),
  ]

  const years = ['2020', '2021', '2022', '2023', '2024']
  const eventsWithImage = events.filter((event) => {
    const year = String(event.date).slice(0, 4)
    return years.includes(year) && Boolean(event.image)
  })

  it('至少包含 10 条以上带有配图的 2020-2024 年重大事件', () => {
    expect(eventsWithImage.length).toBeGreaterThanOrEqual(10)
  })

  it('所有带有配图的事件均有本地物理存在的文件与合法图注', () => {
    for (const event of eventsWithImage) {
      expect(event.image).toBeTypeOf('object')
      expect(event.image.url).toMatch(/^\/images\/events\/(?:2020|2021|2022|2023|2024)\/[a-zA-Z0-9_-]+\.(?:jpg|png|webp)$/)
      expect(event.image.caption.trim().length).toBeGreaterThan(0)

      const imagePath = path.join(ROOT, 'public', event.image.url.replace(/^\//, ''))
      expect(fs.existsSync(imagePath), `${event.id} 图片文件 ${event.image.url} 不存在`).toBe(true)
      expect(fs.statSync(imagePath).size, `${event.id} 图片文件 ${event.image.url} 过小`).toBeGreaterThan(1024)
    }
  })
})
