import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const data = loadAll(path.join(ROOT, 'data'))
const events = new Map(data.events.map((event) => [event.id, event]))

const AUDITED_EVENTS = [
  'zhaochuo-law-0581',
  'taiyuan-uprising-0617',
  'hulao-unification-0621',
  'lijing-tujue-0630',
  'tang-land-tax-service-0624',
  'mawei-mutiny-0756',
  'zhangxun-suanyang-0757',
  'nanjiyun-seek-aid-0757',
  'yanzhaoqing-hebei-resistance-0755',
  'liguangbi-heyang-defense-0761',
  'duanxiushi-jingyuan-0783',
  'lisheng-recapture-changan-0784',
  'lisu-ping-huaixi-0817',
  'ganlu-incident-0835',
]

describe('隋唐首批审计事件', () => {
  it('为统一战争、边疆和安史战争链提供可加载入口', () => {
    for (const id of AUDITED_EVENTS) {
      const event = events.get(id)
      expect(event, `缺少事件 ${id}`).toBeTruthy()
      expect(event?.related_dynasties?.length, `${id} 缺少分期关系`).toBeGreaterThan(0)
      expect(event?.sources?.length, `${id} 缺少来源`).toBeGreaterThan(0)
    }
  })

  it('保留隋唐易代的跨分期关系', () => {
    expect(events.get('zhaochuo-law-0581')?.date).toBe('0581')
    expect(events.get('taiyuan-uprising-0617')?.related_dynasties).toEqual(['sui', 'tang'])
    expect(events.get('hulao-unification-0621')?.date).toBe('0621')
    expect(events.get('lijing-tujue-0630')?.date).toBe('0630')
    expect(events.get('tang-land-tax-service-0624')?.tags).toContain('均田')
  })

  it('区分马嵬驿与睢阳战争过程', () => {
    expect(events.get('mawei-mutiny-0756')?.date).toBe('0756-06')
    expect(events.get('zhangxun-suanyang-0757')?.date).toBe('0757-10')
    expect(events.get('nanjiyun-seek-aid-0757')?.date).toBe('0757')
    expect(events.get('yanzhaoqing-hebei-resistance-0755')?.date).toBe('0755')
    expect(events.get('liguangbi-heyang-defense-0761')?.date).toBe('0761')
    expect(events.get('duanxiushi-jingyuan-0783')?.date).toBe('0783')
    expect(events.get('lisheng-recapture-changan-0784')?.date).toBe('0784-06')
    expect(events.get('lisu-ping-huaixi-0817')?.date).toBe('0817')
    expect(events.get('ganlu-incident-0835')?.date).toBe('0835')
  })

  it('为约估年份和传世纪传细节保留争议边界', () => {
    for (const id of ['zhaochuo-law-0581', 'zhangxun-suanyang-0757', 'nanjiyun-seek-aid-0757', 'yanzhaoqing-hebei-resistance-0755', 'liguangbi-heyang-defense-0761', 'duanxiushi-jingyuan-0783']) {
      const event = events.get(id)
      expect(event?.confidence).toBe('有争议')
      expect(event?.dispute?.trim(), `${id} 缺少争议说明`).toBeTruthy()
    }
  })
})
