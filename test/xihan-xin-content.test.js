import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

describe('西汉末年与新朝过渡内容', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const events = new Map(data.events.map((event) => [event.id, event]))

  it('承载改制、危机、起义与过渡政权主链', () => {
    const ids = [
      'wangmang-9',
      'wangmang-crisis-17',
      'lulin-qiyi-17',
      'chimei-qiyi-18',
      'gengshi-liuxuan-23',
      'chimei-liupenzi-25',
      'kunyang-zhizhan',
      'guangwu-25',
    ]
    for (const id of ids) {
      expect(events.has(id), `缺少事件 ${id}`).toBe(true)
      expect(events.get(id)?.sources?.length, `${id} 缺少来源`).toBeGreaterThan(0)
    }
  })

  it('跨越新朝与东汉的节点保留分期关联', () => {
    expect(events.get('wangmang-9')?.related_dynasties).toEqual(['xihan', 'xin'])
    expect(events.get('chimei-liupenzi-25')?.related_dynasties).toEqual(['xin', 'donghan'])
    expect(events.get('guangwu-25')?.related_dynasties).toEqual(['xin', 'donghan'])
  })

  it('传世叙事节点使用年份级锚点并说明争议', () => {
    for (const id of ['wangmang-crisis-17', 'lulin-qiyi-17', 'chimei-qiyi-18', 'gengshi-liuxuan-23', 'chimei-liupenzi-25', 'kunyang-zhizhan', 'guangwu-25']) {
      const event = events.get(id)
      expect(event?.confidence).toBe('有争议')
      expect(event?.dispute?.trim(), `${id} 缺少争议边界`).toBeTruthy()
    }
    expect(events.get('kunyang-zhizhan')?.date).toBe('0023-06')
    expect(events.get('kunyang-zhizhan')?.summary).not.toContain('数十万')
    expect(events.get('guangwu-25')?.summary).toContain('统一战争仍在其后持续')
  })
})
