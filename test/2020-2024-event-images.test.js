import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

function readYaml(relativePath) {
  return yaml.load(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'))
}

describe('十丘重大事件真实专属配图严苛审计验证', () => {
  const xiandai = readYaml('data/events/xiandai.yaml')
  const modern = readYaml('data/world/modern.yaml')
  const allEvents = [...xiandai, ...modern]

  it('含有配图 (image) 的事件必须 100% 为专属真实历史图片（无跨事件盲目套用复用）', () => {
    const eventsWithImg = allEvents.filter((e) => e.image && e.image.url)
    const hashMap = new Map()

    for (const event of eventsWithImg) {
      expect(event.image, `${event.id} 缺少 image 属性`).toBeTypeOf('object')
      expect(event.image.url).toMatch(/^\/images\/events\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\.(?:jpg|png|webp)$/)
      expect(event.image.caption.trim().length, `${event.id} 图注为空`).toBeGreaterThan(0)

      const imagePath = path.join(ROOT, 'public', event.image.url.replace(/^\//, ''))
      expect(fs.existsSync(imagePath), `${event.id} 图片文件 ${event.image.url} 不存在`).toBe(true)
      expect(fs.statSync(imagePath).size, `${event.id} 图片文件 ${event.image.url} 过小`).toBeGreaterThan(1024)

      // MD5 文件 Hash 检查：严禁出现多条事件复用同一张二进制占位图
      const hash = crypto.createHash('md5').update(fs.readFileSync(imagePath)).digest('hex')
      if (hashMap.has(hash)) {
        const firstEventId = hashMap.get(hash)
        throw new Error(`发现图片重复套用！${event.id} 与 ${firstEventId} 复用了同一张二进制图片 (${event.image.url})`)
      }
      hashMap.set(hash, event.id)
    }
  })
})
