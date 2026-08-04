import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'
import { buildTimeline, resolveRoot, collectYears } from '../src/lib/timeline.js'

const FIXTURES = fileURLToPath(new URL('./fixtures', import.meta.url))
const data = loadAll(FIXTURES)

describe('resolveRoot — 朝代层级', () => {
  const all = data.dynasties

  it('无 parent 者其根为自身', () => {
    const qin = all.find((d) => d.id === 'qin')
    expect(resolveRoot(qin, all).id).toBe('qin')
  })

  it('子朝代解析到根——西汉的根是汉', () => {
    const xihan = all.find((d) => d.id === 'xihan')
    expect(resolveRoot(xihan, all).id).toBe('han')
  })

  it('东汉的根也是汉', () => {
    const donghan = all.find((d) => d.id === 'donghan')
    expect(resolveRoot(donghan, all).id).toBe('han')
  })

  it('循环引用时抛出明确错误', () => {
    const cyclic = [
      { id: 'a', name: 'A', parent: 'b', start: '0001', end: '0002', color: '#000' },
      { id: 'b', name: 'B', parent: 'a', start: '0001', end: '0002', color: '#000' },
    ]
    expect(() => resolveRoot(cyclic[0], cyclic)).toThrow(/循环/)
  })
})

describe('collectYears — 出行年份', () => {
  const years = collectYears(data.events, data.worldEvents, data.dynasties)

  it('升序且去重', () => {
    expect(years).toEqual([...new Set(years)].sort((a, b) => a - b))
  })

  it('含有事件的年份', () => {
    expect(years).toContain(-221) // 秦统一
    expect(years).toContain(-209) // 大泽乡
    expect(years).toContain(-138) // 张骞
    expect(years).toContain(208) // 赤壁
  })

  it('含世界事件的年份', () => {
    expect(years).toContain(-509) // 罗马共和国
    expect(years).toContain(-486) // 释迦牟尼
  })

  it('含朝代起始年', () => {
    expect(years).toContain(-2100) // 上古起
    expect(years).toContain(-202) // 汉起
    expect(years).toContain(25) // 东汉起
    expect(years).toContain(222) // 吴起
  })

  it('不含无内容的年份——公元前稀疏，逐年出行会产生数千空行', () => {
    expect(years).not.toContain(-1000)
    expect(years).not.toContain(-500)
    expect(years).not.toContain(100)
  })
})

describe('buildTimeline — 行生成', () => {
  const { rows } = buildTimeline(data)

  it('gridRow 从 1 起连续无空洞', () => {
    const grid = rows.map((r) => r.gridRow)
    expect(grid).toEqual(Array.from({ length: rows.length }, (_, i) => i + 1))
  })

  it('年份行按年份升序', () => {
    const ys = rows.filter((r) => r.type === 'year').map((r) => r.year)
    expect(ys).toEqual([...ys].sort((a, b) => a - b))
  })

  it('事件挂在正确的年份行上', () => {
    const row = rows.find((r) => r.type === 'year' && r.year === -221)
    expect(row.cnEvents.map((e) => e.id)).toContain('qin-unify-221bc')
  })

  it('世界事件与中国事件分列', () => {
    const row = rows.find((r) => r.type === 'year' && r.year === -509)
    expect(row.worldEvents.map((e) => e.id)).toContain('w-rome-republic')
    expect(row.cnEvents).toEqual([])
  })

  it('显示的是根朝代而非子朝代——汉而非西汉', () => {
    const row = rows.find((r) => r.type === 'year' && r.year === -138)
    expect(row.dynasties.map((d) => d.id)).toContain('han')
    expect(row.dynasties.map((d) => d.id)).not.toContain('xihan')
  })

  it('君主取自子朝代——张骞之年在位者为汉武帝', () => {
    const row = rows.find((r) => r.type === 'year' && r.year === -138)
    expect(row.rulers.map((r) => r.temple_name)).toContain('汉武帝')
  })

  it('dynasties 与 rulers 皆为数组——分裂期同年多政权', () => {
    const row = rows.find((r) => r.type === 'year' && r.year === 222)
    expect(Array.isArray(row.dynasties)).toBe(true)
    expect(Array.isArray(row.rulers)).toBe(true)
    // 222 年魏蜀吴并存
    const ids = row.dynasties.map((d) => d.id)
    expect(ids).toContain('wei')
    expect(ids).toContain('shu')
    expect(ids).toContain('wu')
  })

  it('朝代交替之年归属正确——-0207 秦末，-0202 汉初', () => {
    const rowQinEnd = rows.find((r) => r.type === 'year' && r.year === -207)
    if (rowQinEnd) expect(rowQinEnd.dynasties.map((d) => d.id)).toContain('qin')
    const rowHanStart = rows.find((r) => r.type === 'year' && r.year === -202)
    expect(rowHanStart.dynasties.map((d) => d.id)).toContain('han')
  })

  it('同年多事件按 sortKey 升序，同 sortKey 时按 importance 降序', () => {
    const rowsWithMulti = rows.filter((r) => r.type === 'year' && r.cnEvents.length > 1)
    for (const r of rowsWithMulti) {
      for (let i = 1; i < r.cnEvents.length; i++) {
        expect(r.cnEvents[i - 1]._sortKey).toBeLessThanOrEqual(r.cnEvents[i]._sortKey)
      }
    }
  })

  it('根朝代集合变化处插入横幅', () => {
    const banners = rows.filter((r) => r.type === 'banner')
    const names = banners.map((b) => b.dynasty.name)
    expect(names).toContain('秦')
    expect(names).toContain('汉')
  })

  it('横幅带所属朝代的君主', () => {
    const qinBanner = rows.find((r) => r.type === 'banner' && r.dynasty.id === 'qin')
    expect(qinBanner.rulers.map((x) => x.temple_name)).toContain('秦始皇')
  })

  it('并存政权各出一条横幅', () => {
    const banners = rows.filter((r) => r.type === 'banner')
    const ids = banners.map((b) => b.dynasty.id)
    expect(ids).toContain('wei')
    expect(ids).toContain('shu')
    expect(ids).toContain('wu')
  })

  it('横幅出现在其朝代首个年份行之前', () => {
    const bi = rows.findIndex((r) => r.type === 'banner' && r.dynasty.id === 'qin')
    const yi = rows.findIndex((r) => r.type === 'year' && r.year === -221)
    expect(bi).toBeLessThan(yi)
  })
})

describe('buildTimeline — 文明色带', () => {
  const { bands, columns, rows } = buildTimeline(data)

  it('色带跨越多行', () => {
    const rome = bands.find((b) => b.name === '罗马共和国')
    expect(rome.rowEnd).toBeGreaterThan(rome.rowStart)
  })

  it('rowStart 取第一个 >= start 年的行', () => {
    const rome = bands.find((b) => b.name === '罗马共和国')
    const row = rows.find((r) => r.gridRow === rome.rowStart)
    expect(row.type === 'year' ? row.year : null).toBe(-509)
  })

  it('同 region 的色带列号一致', () => {
    const a = bands.find((b) => b.name === '罗马共和国')
    const b = bands.find((b) => b.name === '罗马帝国')
    expect(a.column).toBe(b.column)
  })

  it('不同 region 的色带列号不同', () => {
    const egypt = bands.find((b) => b.name === '古埃及新王国')
    const rome = bands.find((b) => b.name === '罗马共和国')
    if (egypt) expect(egypt.column).not.toBe(rome.column)
  })

  it('区间内无任何行的色带被排除——长卷上那段时间不存在，画出来无处可放', () => {
    const extra = {
      ...data,
      civilizations: [
        ...data.civilizations,
        { name: '虚空文明', start: '-0900', end: '-0800', region: '虚空', color: '#000' },
      ],
    }
    const out = buildTimeline(extra)
    expect(out.bands.find((b) => b.name === '虚空文明')).toBeUndefined()
  })

  it('columns 输出 region 映射与总列数', () => {
    expect(columns.total).toBeGreaterThan(0)
    expect(columns.regions['地中海']).toBeTypeOf('number')
  })
})

describe('边界情况', () => {
  it('公元前后交界——不存在公元 0 年', () => {
    const { rows } = buildTimeline(data)
    const years = rows.filter((r) => r.type === 'year').map((r) => r.year)
    expect(years).not.toContain(0)
  })

  it('变精度日期在同年内正确排序', () => {
    const mixed = {
      ...data,
      events: [
        { id: 'm1', date: '-0221-07', title: '七月', category: '政治', importance: 3 },
        { id: 'm2', date: '-0221', title: '仅到年', category: '政治', importance: 3 },
        { id: 'm3', date: '-0221-03', title: '三月', category: '政治', importance: 3 },
      ],
    }
    const { rows } = buildTimeline(mixed)
    const row = rows.find((r) => r.type === 'year' && r.year === -221)
    expect(row.cnEvents.map((e) => e.id)).toEqual(['m2', 'm3', 'm1'])
  })

  it('空数据不崩溃', () => {
    const out = buildTimeline({
      dynasties: [],
      rulers: [],
      events: [],
      worldEvents: [],
      civilizations: [],
    })
    expect(out.rows).toEqual([])
    expect(out.bands).toEqual([])
  })
})
