import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

function readYaml(relativePath) {
  return yaml.load(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'))
}

describe('全量近现代史事件配图 100% 全覆盖强约束验证', () => {
  const xiandai = readYaml('data/events/xiandai.yaml')
  const modern = readYaml('data/world/modern.yaml')
  const allEvents = [...xiandai, ...modern]

  it('全库共有 1198 条近现代历史事件（中国史 569 条，世界史 629 条）', () => {
    expect(allEvents.length).toBe(1198)
  })

  it('所有 1198 条历史事件必须 100% 配置图片、本地物理存在且具备非空图注', () => {
    for (const event of allEvents) {
      expect(event.image, `${event.id} 缺少 image 属性`).toBeTypeOf('object')
      expect(event.image.url).toMatch(/^\/images\/events\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\.(?:jpg|png|webp)$/)
      expect(event.image.caption.trim().length, `${event.id} 图注为空`).toBeGreaterThan(0)

      const imagePath = path.join(ROOT, 'public', event.image.url.replace(/^\//, ''))
      expect(fs.existsSync(imagePath), `${event.id} 图片文件 ${event.image.url} 不存在`).toBe(true)
      expect(fs.statSync(imagePath).size, `${event.id} 图片文件 ${event.image.url} 过小`).toBeGreaterThan(1024)
    }
  })
})
