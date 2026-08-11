import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const EXPECTED_2020_IDS = [
  'cn-covid-wuhan-202001',
  'cn-civil-code-202005',
  'cn-hk-national-security-law-202006',
  'cn-beidou3-system-202007',
  'cn-fifth-plenum-202010',
  'cn-poverty-alleviation-202011',
  'cn-change5-return-202012',
  'w-brexit-official-202001',
  'w-covid-pandemic-202003',
  'w-us-election-biden-202011',
]

function readYaml(relativePath) {
  return yaml.load(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'))
}

describe('2020 年五星事件配图', () => {
  const events = [
    ...readYaml('data/events/xiandai.yaml'),
    ...readYaml('data/world/modern.yaml'),
  ]
  const major2020 = events.filter(
    (event) => String(event.date).startsWith('2020') && event.importance === 5,
  )

  it('五星事件集合保持为 10 条', () => {
    expect(major2020.map((e) => e.id).sort()).toEqual([...EXPECTED_2020_IDS].sort())
  })

  it('2020 年配有图片的五星事件均拥有有效本地物理图片和图注', () => {
    const withImg = major2020.filter(e => e.image && e.image.url)
    for (const event of withImg) {
      expect(event.image?.url, `${event.id} 缺少 image.url`).toBeTruthy()
      expect(event.image?.caption?.trim(), `${event.id} 缺少图片图注`).toBeTruthy()
      expect(event.image.url).toMatch(/^\/images\/events\/2020\/[a-z0-9-_]+\.(?:jpg|png|webp)$/)

      const imagePath = path.join(ROOT, 'public', event.image.url.replace(/^\//, ''))
      expect(fs.existsSync(imagePath), `${event.id} 图片不存在: ${imagePath}`).toBe(true)
      expect(fs.statSync(imagePath).size, `${event.id} 图片文件过小`).toBeGreaterThan(1024)
    }
  })
})
