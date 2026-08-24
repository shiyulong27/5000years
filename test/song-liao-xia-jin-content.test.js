import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const data = loadAll(path.join(ROOT, 'data'))
const events = new Map(data.events.map((event) => [event.id, event]))

describe('宋辽夏金阶段基线', () => {
  it('保留第183篇至宋元过渡的关键现有入口', () => {
    for (const id of [
      'liyu-nantang',
      'yuanhao-xixia-1038',
      'aguda-jin-1115',
      'jingkang-incident-1127',
      'yuefei-yancheng',
      'linan-falls-1276',
    ]) {
      const event = events.get(id)
      expect(event, `缺少事件 ${id}`).toBeTruthy()
      expect(event?.sources?.length, `事件 ${id} 缺少来源`).toBeGreaterThan(0)
    }
  })

  it('窗口统计覆盖辽夏金并存期和宋元边界', () => {
    const windowEvents = data.events.filter((event) => {
      const year = Number(event.date)
      return Number.isFinite(year) && year >= 916 && year <= 1279
    })
    expect(windowEvents.length).toBe(55)
    expect(windowEvents.some((event) => event.id === 'hubilie-yuan-1271')).toBe(true)
    expect(windowEvents.some((event) => event.id === 'yuanhao-xixia-1038')).toBe(true)
    expect(windowEvents.some((event) => event.id === 'aguda-jin-1115')).toBe(true)
  })

  it('为并存政权事件建立关系字段，避免把文件归属当作政权归属', () => {
    expect(events.get('yuanhao-xixia-1038')?.related_dynasties).toContain('xixia')
    expect(events.get('aguda-jin-1115')?.related_dynasties).toContain('jin1115')
    expect(events.get('chanyuan-treaty-1004')?.related_dynasties).toEqual(
      expect.arrayContaining(['beisong', 'liao']),
    )
    expect(events.get('shenkuo-liao-mission-1075')?.related_dynasties).toEqual(
      expect.arrayContaining(['beisong', 'liao']),
    )
  })

  it('覆盖辽建国、宋金联盟、金灭辽和南宋地方起义结构节点', () => {
    for (const id of [
      'abaoji-liao-0916',
      'haishangmeng-1120',
      'jin-destroy-liao-1125',
      'zhongxiang-yangya-1130',
    ]) {
      const event = events.get(id)
      expect(event, `缺少结构事件 ${id}`).toBeTruthy()
      expect(event?.sources?.length, `事件 ${id} 缺少来源`).toBeGreaterThan(0)
      expect(event?.related_dynasties?.length, `事件 ${id} 缺少关系`).toBeGreaterThan(0)
    }
  })
})
