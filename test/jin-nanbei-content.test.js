import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const data = loadAll(path.join(ROOT, 'data'))
const events = new Map(data.events.map((event) => [event.id, event]))

const STRUCTURAL_EVENTS = [
  'li-te-refugees-301',
  'liu-yuanhai-han-304',
  'liu-yuanhai-emperor-308',
  'shile-read-hanshu-321',
  'huanwen-beifa-369',
  'tandaoji-liangsha-0431',
  'gaoyun-history-case-450',
  'beiwei-juntian-485',
  'beiwei-sanchang-486',
  'fan-zhen-shenmielun-0500',
  'liangwudi-sheshen-527',
]

describe('两晋南北朝结构事件', () => {
  it('为高优先级缺口提供可加载的直接入口', () => {
    for (const id of STRUCTURAL_EVENTS) {
      const event = events.get(id)
      expect(event, `缺少事件 ${id}`).toBeTruthy()
      expect(event?.related_dynasties?.length, `${id} 缺少分期关系`).toBeGreaterThan(0)
      expect(event?.sources?.length, `${id} 缺少来源`).toBeGreaterThan(0)
    }
  })

  it('区分刘渊称汉与称帝两个时间点', () => {
    expect(events.get('liu-yuanhai-han-304')?.date).toBe('0304')
    expect(events.get('liu-yuanhai-emperor-308')?.date).toBe('0308')
  })

  it('约估年份均保留争议说明', () => {
    for (const id of ['li-te-refugees-301', 'shile-read-hanshu-321', 'fan-zhen-shenmielun-0500']) {
      const event = events.get(id)
      expect(event?.confidence).toBe('有争议')
      expect(event?.dispute).toBeTruthy()
    }
  })

  it('保留北魏制度与南朝跨政权关系', () => {
    expect(events.get('beiwei-juntian-485')?.tags).toContain('制度')
    expect(events.get('beiwei-sanchang-486')?.tags).toContain('户籍')
    expect(events.get('tandaoji-liangsha-0431')?.related_dynasties).toEqual(['liusong', 'beiwei'])
    expect(events.get('sui-destroy-chen-0589')?.related_dynasties).toEqual(['sui', 'chen'])
  })

  it('纠正侯景死亡和557年北方格局叙事', () => {
    const houjing = events.get('houjing-zhiluan')
    expect(houjing?.summary).toContain('忧愤感疾而崩')
    expect(houjing?.summary).not.toContain('饿死')

    const transition = events.get('chen-and-beizhou-557')
    expect(transition?.summary).toContain('北齐与北周并立')
    expect(transition?.summary).not.toContain('陈与北周相持')
  })
})
