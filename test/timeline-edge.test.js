import { describe, it, expect } from 'vitest'
import { buildTimeline } from '../src/lib/timeline.js'

/**
 * 用最小构造数据逼问边界，不依赖夹具——夹具会演化，这些断言不该随之变化。
 */

const D = (id, start, end, extra = {}) => ({
  id,
  name: id,
  start,
  end,
  color: '#000',
  ...extra,
})
const E = (id, date) => ({ id, date, title: id, category: '政治', importance: 3 })

describe('并存政权退场后重新出现', () => {
  it('朝代集合收缩不产生重复横幅', () => {
    const { rows } = buildTimeline({
      dynasties: [D('a', '0001', '0010'), D('b', '0005', '0008', { concurrent: true })],
      rulers: [],
      events: [E('e1', '0002'), E('e2', '0006'), E('e3', '0009')],
      worldEvents: [],
      civilizations: [],
    })
    const banners = rows.filter((r) => r.type === 'banner')
    // a 与 b 各一条，b 退场后 a 不应再出一条
    expect(banners.map((x) => x.dynasty.id)).toEqual(['a', 'b'])
  })
})

describe('跨公元前后', () => {
  it('前后相邻两年之间无公元 0 年', () => {
    const { rows } = buildTimeline({
      dynasties: [D('d', '-0005', '0005')],
      rulers: [],
      events: [E('bc', '-0001'), E('ad', '0001')],
      worldEvents: [],
      civilizations: [],
    })
    const years = rows.filter((r) => r.type === 'year').map((r) => r.year)
    expect(years).toEqual([-5, -1, 1])
  })
})

describe('色带边界对齐', () => {
  it('起止年无行时向内收缩到实际存在的行', () => {
    const input = {
      dynasties: [D('d', '0001', '0100')],
      rulers: [],
      events: [E('a', '0010'), E('b', '0050'), E('c', '0090')],
      worldEvents: [],
      civilizations: [{ name: 'c1', start: '0005', end: '0060', region: 'r', color: '#111' }],
    }
    const { bands, rows } = buildTimeline(input)
    const band = bands[0]
    const startRow = rows.find((r) => r.gridRow === band.rowStart)
    const endRow = rows.find((r) => r.gridRow === band.rowEnd)
    // 起于 0005 → 收缩到 0010；止于 0060 → 收缩到 0050
    expect(startRow.year).toBe(10)
    expect(endRow.year).toBe(50)
  })

  it('单行色带 rowStart 等于 rowEnd', () => {
    const { bands } = buildTimeline({
      dynasties: [D('d', '0001', '0100')],
      rulers: [],
      events: [E('a', '0010')],
      worldEvents: [],
      civilizations: [{ name: 'c1', start: '0005', end: '0015', region: 'r', color: '#111' }],
    })
    expect(bands[0].rowStart).toBe(bands[0].rowEnd)
  })
})

describe('三代嵌套的朝代', () => {
  it('孙代解析到根，且君主上浮到根朝代行', () => {
    const { rows } = buildTimeline({
      dynasties: [
        D('root', '0001', '0100'),
        D('mid', '0001', '0050', { parent: 'root' }),
        D('leaf', '0001', '0025', { parent: 'mid' }),
      ],
      rulers: [
        { dynasty: 'leaf', temple_name: '某帝', reign_start: '0005', reign_end: '0020' },
      ],
      events: [E('a', '0010')],
      worldEvents: [],
      civilizations: [],
    })
    const row = rows.find((r) => r.type === 'year' && r.year === 10)
    expect(row.dynasties.map((d) => d.id)).toEqual(['root'])
    expect(row.rulers.map((r) => r.temple_name)).toEqual(['某帝'])
  })
})

describe('无朝代承接的事件', () => {
  it('校验器会拒绝，但渲染层不崩溃', () => {
    const { rows } = buildTimeline({
      dynasties: [],
      rulers: [],
      events: [E('orphan', '1937')],
      worldEvents: [],
      civilizations: [],
    })
    const row = rows.find((r) => r.type === 'year' && r.year === 1937)
    expect(row.dynasties).toEqual([])
    expect(row.rulers).toEqual([])
    expect(row.cnEvents).toHaveLength(1)
  })
})
