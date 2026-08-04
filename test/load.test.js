import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { loadAll, locOf } from '../src/lib/load.js'

const FIXTURES = fileURLToPath(new URL('./fixtures', import.meta.url))

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
