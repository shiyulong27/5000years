import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'

const dataDir = fileURLToPath(new URL('../data', import.meta.url))
const data = loadAll(dataDir)

describe('山海经数据完整性与结构测试', () => {
  it('应成功加载山海经神兽、神话与卷目数据', () => {
    expect(data.shanhaijing).toBeDefined()
    expect(data.shanhaijing.beasts.length).toBeGreaterThanOrEqual(30)
    expect(data.shanhaijing.myths.length).toBeGreaterThanOrEqual(8)
    expect(data.shanhaijing.chapters.length).toBe(18)
  })

  it('神兽数据应包含完整必填字段与注音', () => {
    for (const b of data.shanhaijing.beasts) {
      expect(b.id).toBeTruthy()
      expect(b.name).toBeTruthy()
      expect(b.pinyin).toBeTruthy()
      expect(b.book).toBeTruthy()
      expect(b.category).toBeTruthy()
      expect(b.summary).toBeTruthy()
      expect(b.original_text).toBeTruthy()
      expect(b.translation).toBeTruthy()
      expect(Array.isArray(b.tags)).toBe(true)
    }
  })

  it('神话史诗数据应包含精神内核与古文出处', () => {
    for (const m of data.shanhaijing.myths) {
      expect(m.id).toBeTruthy()
      expect(m.title).toBeTruthy()
      expect(m.book).toBeTruthy()
      expect(m.spirit).toBeTruthy()
      expect(m.summary).toBeTruthy()
      expect(m.original_text).toBeTruthy()
      expect(m.translation).toBeTruthy()
      expect(m.cultural_meaning).toBeTruthy()
    }
  })

  it('十八卷目应包含五藏山经与海内海外大荒四大系列', () => {
    const sections = new Set(data.shanhaijing.chapters.map((c) => c.section))
    expect(sections.has('五藏山经')).toBe(true)
    expect(sections.has('海外经')).toBe(true)
    expect(sections.has('海内经')).toBe(true)
    expect(sections.has('大荒经')).toBe(true)
  })
})
