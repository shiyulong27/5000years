import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll, locOf } from '../src/lib/load.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const data = loadAll(path.join(ROOT, 'data'))
const events = new Map(data.events.map((event) => [event.id, event]))

describe('清代前中期阶段基线', () => {
  it('保留现有清代关键入口并带源位置', () => {
    for (const id of [
      'huangtaiji-qing-1636',
      'huangtaiji-counterplot-1630',
      'eight-banners-1635',
      'nurhaci-jin-1616',
      'sarhu-battle-1619',
      'ningyuan-battle-1626',
      'qing-enter-pass-1644',
      'deliberative-princes-council-1644',
      'qing-land-enclosure-1645',
      'yangzhou-jiading',
      'zhengchenggong-taiwan-1662',
      'li-dingguo-southwest-1659',
      'sanfan-zhiluan',
      'nerchinsk-treaty-1689',
      'yakesa-campaign-1685',
      'kangxi-galdan-1690',
      'zhaomodo-battle-1696',
      'kyakhta-treaty-1727',
      'lobzang-danjin-rebellion-1723',
      'grand-council-1729',
      'bailianjiao-uprising-1796',
      'humen-xiaoyan',
      'hu-zhongzao-literary-inquisition-1755',
      'qing-proscribed-books-1774',
      'gu-yanwu-journal-1650',
    ]) {
      const event = events.get(id)
      expect(event, `缺少事件 ${id}`).toBeTruthy()
      expect(locOf(event)?.file, `事件 ${id} 缺少源文件位置`).toBe('events/qing.yaml')
    }
    for (const id of [
      'luxiangsheng-julu-1639',
      'zhangxianzhong-xiangyang-1641',
      'li-zicheng-shun-1644',
      'xia-wanchun-anti-qing-1647',
    ]) {
      const event = events.get(id)
      expect(event, `缺少事件 ${id}`).toBeTruthy()
      expect(locOf(event)?.file, `事件 ${id} 缺少源文件位置`).toBe('events/ming.yaml')
      expect(event.sources?.length, `事件 ${id} 缺少来源`).toBeGreaterThan(0)
    }
  })

  it('只统计 1636–1839，明确排除 1840 年以后清代数据', () => {
    const windowEvents = data.events.filter((event) => {
      const year = Number(String(event.date).slice(0, 4))
      return Number.isFinite(year) && year >= 1616 && year <= 1839
    })
    expect(windowEvents).toHaveLength(46)
    expect(windowEvents.filter((event) => locOf(event)?.file === 'events/qing.yaml')).toHaveLength(37)
    expect(windowEvents.some((event) => String(event.date).startsWith('1840'))).toBe(false)
    expect(data.events.some((event) => String(event.date).startsWith('1840'))).toBe(true)
  })

  it('清代王表当前记录包含近代跨度，不能直接视为古代完整王表', () => {
    expect(data.rulers.filter((ruler) => ruler.dynasty === 'qing')).toHaveLength(11)
    expect(data.rulers.some((ruler) => ruler.dynasty === 'qing' && Number(ruler.reign_start) >= 1840)).toBe(true)
  })
})
