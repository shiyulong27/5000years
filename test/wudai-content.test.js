import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const data = loadAll(path.join(ROOT, 'data'))
const events = new Map(data.events.map((event) => [event.id, event]))

describe('五代十国首批审计事件', () => {
  it('提供钱镠与后唐伶人政治的直接入口', () => {
    for (const id of ['qianliu-wuyue-0907', 'tang-伶官干政-0923']) {
      const event = events.get(id)
      expect(event, `缺少事件 ${id}`).toBeTruthy()
      expect(event?.related_dynasties?.length).toBeGreaterThan(0)
      expect(event?.sources?.length).toBeGreaterThan(0)
    }
  })

  it('保留钱镠的五代与吴越并存关系', () => {
    const qianliu = events.get('qianliu-wuyue-0907')
    expect(qianliu?.date).toBe('0907')
    expect(qianliu?.related_dynasties).toEqual(['wudai'])
  })

  it('为伶人政治的连续叙事保留年份争议', () => {
    const event = events.get('tang-伶官干政-0923')
    expect(event?.confidence).toBe('有争议')
    expect(event?.dispute?.trim()).toBeTruthy()
  })

  it('覆盖后汉建立与冯道劝阻北征的来源入口', () => {
    const houhan = events.get('liuzhiyuan-houhan-0947')
    expect(houhan?.date).toBe('0947')
    expect(houhan?.related_dynasties).toContain('houhan')
    expect(houhan?.sources).toContain('旧五代史·汉高祖纪')

    const fengdao = events.get('fengdao-shizong-0954')
    expect(fengdao?.date).toBe('0954')
    expect(fengdao?.sources).toContain('新五代史·冯道传')
    expect(fengdao?.dispute).toMatch(/评价性概括/)
  })
})
