import { sortKey, yearOf } from './date.js'

/**
 * 渲染模型——全项目唯一的复杂逻辑层。
 *
 * 纯函数：输入数据、输出数据，不接触 DOM、不依赖 Astro。因此可独立测试，
 * 且更换前端框架时可直接复用。组件只负责渲染，不参与计算。
 */

/**
 * 解析朝代的顶层祖先。
 *
 * 长卷显示根朝代（汉），而非其子朝代（西汉/东汉）——若无此归并，
 * 顶部导航将被数十个碎片填满。概览页内再拆分展示。
 *
 * @throws {Error} 存在循环引用时
 */
export function resolveRoot(dynasty, all) {
  const byId = all instanceof Map ? all : new Map(all.map((d) => [d.id, d]))
  const seen = new Set()
  let cur = dynasty

  while (cur.parent !== undefined && cur.parent !== null) {
    if (seen.has(cur.id)) {
      throw new Error(`朝代 parent 存在循环引用：${[...seen].join(' → ')} → ${cur.id}`)
    }
    seen.add(cur.id)
    const next = byId.get(cur.parent)
    if (!next) return cur // parent 悬空，校验器已单独报错，此处止步
    cur = next
  }
  return cur
}

/** 某朝代是否为另一朝代的自身或后代 */
function isDescendantOf(dynasty, ancestorId, byId) {
  let cur = dynasty
  const seen = new Set()
  while (cur) {
    if (cur.id === ancestorId) return true
    if (seen.has(cur.id)) return false
    seen.add(cur.id)
    if (cur.parent === undefined || cur.parent === null) return false
    cur = byId.get(cur.parent)
  }
  return false
}

/**
 * 选取需要出行的年份。
 *
 * 出行条件：该年有中国事件 ∨ 有世界事件 ∨ 是某朝代起始年。
 *
 * 不逐年出行——公元前跨度约 2500 年而事件仅数十条，逐年会产生数千空行，
 * 页面既慢又无从阅读。视觉连续性由朝代色带跨行保证，不靠空行。
 *
 * @returns {number[]} 升序去重
 */
export function collectYears(events = [], worldEvents = [], dynasties = []) {
  const years = new Set()
  for (const e of events) years.add(yearOf(e.date))
  for (const e of worldEvents) years.add(yearOf(e.date))
  for (const d of dynasties) years.add(yearOf(d.start))
  return [...years].sort((a, b) => a - b)
}

/** 同年内排序：先按 sortKey 升序，同 sortKey 时按 importance 降序 */
function orderEvents(list) {
  return list
    .map((e) => ({ ...e, _sortKey: sortKey(e.date) }))
    .sort((a, b) => a._sortKey - b._sortKey || (b.importance ?? 0) - (a.importance ?? 0))
}

/**
 * 构建渲染模型。
 *
 * @param {object} data loadAll 的输出
 * @returns {{rows: object[], bands: object[], columns: {regions: object, total: number}}}
 */
export function buildTimeline(data) {
  const {
    dynasties = [],
    rulers = [],
    events = [],
    worldEvents = [],
    civilizations = [],
  } = data

  const byId = new Map(dynasties.map((d) => [d.id, d]))
  const years = collectYears(events, worldEvents, dynasties)

  // 按年份归拢事件
  const cnByYear = new Map()
  const worldByYear = new Map()
  for (const e of events) {
    const y = yearOf(e.date)
    if (!cnByYear.has(y)) cnByYear.set(y, [])
    cnByYear.get(y).push(e)
  }
  for (const e of worldEvents) {
    const y = yearOf(e.date)
    if (!worldByYear.has(y)) worldByYear.set(y, [])
    worldByYear.get(y).push(e)
  }

  /** 某年正在延续的所有根朝代 */
  const rootsAt = (y) => {
    const roots = new Map()
    for (const d of dynasties) {
      if (y < yearOf(d.start) || y > yearOf(d.end)) continue
      const root = resolveRoot(d, byId)
      roots.set(root.id, root)
    }
    return [...roots.values()]
  }

  /** 某年在位、且所属朝代为指定根之后代的君主 */
  const rulersAt = (y, rootIds) =>
    rulers.filter((r) => {
      if (y < yearOf(r.reign_start) || y > yearOf(r.reign_end)) return false
      const d = byId.get(r.dynasty)
      if (!d) return false
      return rootIds.some((rootId) => isDescendantOf(d, rootId, byId))
    })

  // ── 逐年产出行，根朝代集合变化处插入横幅 ────────────────────
  const rows = []
  let prevRootIds = ''

  for (const y of years) {
    const roots = rootsAt(y)
    const rootIds = roots.map((d) => d.id)
    const key = [...rootIds].sort().join(',')

    // 根朝代集合发生变化：为新出现的朝代各插一条横幅。
    // 并存政权（三国等）各出一条，不合并。
    if (key !== prevRootIds) {
      const prev = new Set(prevRootIds ? prevRootIds.split(',') : [])
      for (const root of roots) {
        if (prev.has(root.id)) continue
        rows.push({
          type: 'banner',
          dynasty: root,
          rulers: rulers.filter((r) => {
            const d = byId.get(r.dynasty)
            return d && isDescendantOf(d, root.id, byId)
          }),
          gridRow: rows.length + 1,
        })
      }
      prevRootIds = key
    }

    rows.push({
      type: 'year',
      year: y,
      dynasties: roots,
      rulers: rulersAt(y, rootIds),
      cnEvents: orderEvents(cnByYear.get(y) ?? []),
      worldEvents: orderEvents(worldByYear.get(y) ?? []),
      gridRow: rows.length + 1,
    })
  }

  // ── 文明色带的跨行区间 ──────────────────────────────────────
  // 色带起止年多半落在无行的年份上（古埃及新王国止于 -1069，该年无事件），
  // 故取区间内实际存在的首末行。
  const yearRows = rows.filter((r) => r.type === 'year')

  // 列按 region 分配，按各 region 首个文明的起始年先后排定。
  // 结果稳定可预期——同一文明区始终在同一列，读者能建立空间记忆；
  // 贪心排布虽列数更省，但同一文明可能在不同时段跳列。
  const firstSeen = new Map()
  for (const c of [...civilizations].sort((a, b) => sortKey(a.start) - sortKey(b.start))) {
    if (!firstSeen.has(c.region)) firstSeen.set(c.region, firstSeen.size)
  }
  const regions = Object.fromEntries(firstSeen)

  const bands = []
  for (const c of civilizations) {
    const s = yearOf(c.start)
    const e = yearOf(c.end)
    const inside = yearRows.filter((r) => r.year >= s && r.year <= e)
    if (inside.length === 0) continue // 区间内无行：那段时间在长卷上不存在

    bands.push({
      name: c.name,
      region: c.region,
      color: c.color,
      rowStart: inside[0].gridRow,
      rowEnd: inside[inside.length - 1].gridRow,
      column: regions[c.region],
    })
  }

  return {
    rows,
    bands,
    columns: { regions, total: firstSeen.size },
  }
}
