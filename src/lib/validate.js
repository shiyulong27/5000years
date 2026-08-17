import { parseDate, sortKey, yearOf } from './date.js'
import { locOf } from './load.js'
import { CATEGORIES, CONFIDENCES, FIELDS } from './enums.js'

/**
 * 数据校验。
 *
 * 这是本项目最重要的质量保证——数据由 AI 生成与人工编辑混合产生，
 * 失败方式具体且可枚举。构建时严格：数据不合法则构建失败，绝不发布错误页面。
 *
 * 每条错误须指向具体文件与行号。作者将长期手工编辑数千条 YAML，
 * 报错信息的质量直接决定这件事是否可持续。
 *
 * 枚举定义在 enums.js，与工具栏共用——各写一份的代价已经付过一次。
 */

// 顶层朝代（parent 为空）在分组时的哨兵键。用不可能与真实 id 冲突的字面量，
// 避免某个朝代恰好叫 root 时与顶层组混在一起。
const ROOT_KEY = Symbol('root')

const REQUIRED = {
  event: ['id', 'date', 'title', 'category', 'importance'],
  dynasty: ['id', 'name', 'start', 'end', 'color'],
  ruler: ['dynasty', 'temple_name', 'reign_start', 'reign_end'],
  civilization: ['name', 'start', 'end', 'region', 'color'],
  figure: ['id', 'name', 'birth', 'death', 'field'],
}

/** 记录的可读标签，用于报错措辞 */
function labelOf(record, kind) {
  if (kind === 'ruler') return record.temple_name ?? '(无庙号)'
  if (kind === 'civilization' || kind === 'figure') return record.name ?? '(无名)'
  return record.title ?? record.name ?? record.id ?? '(无标题)'
}

/**
 * 区间是否真正交叉。
 *
 * 区间为左闭右闭，交替之年由前后两条记录共享——秦始皇 -0221~-0210 与
 * 秦二世 -0210~-0207 在 -0210 交接，不算重叠。故判定条件是后者起始年
 * 严格早于前者结束年，而非 <=。
 */
function crosses(aStart, aEnd, bStart, bEnd) {
  return yearOf(bStart) < yearOf(aEnd) && yearOf(aStart) < yearOf(bEnd)
}

/** 区间 inner 是否被 outer 包含（左闭右闭） */
function contains(outerStart, outerEnd, innerStart, innerEnd) {
  return yearOf(innerStart) >= yearOf(outerStart) && yearOf(innerEnd) <= yearOf(outerEnd)
}

/**
 * @param {object} data loadAll 的输出
 * @returns {Array<{file: string, line: number, message: string}>} 空数组表示通过
 *
 * 只返回必须修复的错误。可疑但未必错的情形（如君主在位缺口过大）由
 * validateWithWarnings 单独返回——混在一个数组里返回，调用方极易把
 * 提示当错误处理，或在断言「无错误」时被提示绊住。
 */
export function validate(data) {
  return validateWithWarnings(data).errors
}

/**
 * @param {object} data loadAll 的输出
 * @returns {{errors: Array, warnings: Array}} errors 须修复，warnings 仅供参考
 */
export function validateWithWarnings(data) {
  const errors = []
  const warnings = []
  const { dynasties = [], rulers = [], events = [], worldEvents = [], civilizations = [], figures = [], legends = [] } = data

  const push = (record, message, level = 'error') => {
    const loc = locOf(record) ?? { file: '(未知)', line: 0 }
    const item = { file: loc.file, line: loc.line, message }
    ;(level === 'warn' ? warnings : errors).push(item)
  }

  // ── 必填字段 ────────────────────────────────────────────────
  const checkRequired = (records, kind, noun) => {
    for (const r of records) {
      for (const field of REQUIRED[kind]) {
        if (r[field] === undefined || r[field] === null || r[field] === '') {
          push(r, `${noun}「${labelOf(r, kind)}」缺少必填字段 ${field}`)
        }
      }
    }
  }
  checkRequired(dynasties, 'dynasty', '朝代')
  checkRequired(rulers, 'ruler', '君主')
  checkRequired(events, 'event', '事件')
  checkRequired(worldEvents, 'event', '世界事件')
  checkRequired(civilizations, 'civilization', '文明')
  checkRequired(figures, 'figure', '人物')

  // 传说专题使用独立数据模型：不强制伪造在位年份，但必须标明传统分组、置信度和异说。
  for (const legend of legends) {
    for (const field of ['id', 'name', 'group', 'summary', 'confidence', 'dispute']) {
      if (legend[field] === undefined || legend[field] === null || legend[field] === '') {
        push(legend, `传说人物“${legend.name ?? legend.id ?? '(无标题)'}”缺少必填字段 ${field}`)
      }
    }
    if (legend.confidence !== undefined && !CONFIDENCES.includes(legend.confidence)) {
      push(legend, `传说人物“${legend.name ?? legend.id ?? '(无标题)'}”的 confidence 不合法：${legend.confidence}`)
    }
    if (legend.dispute !== undefined && typeof legend.dispute !== 'string') {
      push(legend, `传说人物“${legend.name ?? legend.id ?? '(无标题)'}”的 dispute 须为文本`)
    }
  }

  // ── 日期格式 ────────────────────────────────────────────────
  const checkDate = (record, field, noun, kind) => {
    const v = record[field]
    if (v === undefined || v === null || v === '') return false
    try {
      parseDate(v)
      return true
    } catch (e) {
      push(record, `${noun}「${labelOf(record, kind)}」的 ${field} 日期非法：${e.message}`)
      return false
    }
  }

  const dateOk = new WeakSet()
  for (const e of [...events, ...worldEvents]) {
    if (checkDate(e, 'date', '事件', 'event')) dateOk.add(e)
  }
  for (const d of dynasties) {
    const a = checkDate(d, 'start', '朝代', 'dynasty')
    const b = checkDate(d, 'end', '朝代', 'dynasty')
    if (a && b) {
      if (yearOf(d.start) > yearOf(d.end)) {
        push(d, `朝代「${d.name}」起止倒置：${d.start} 晚于 ${d.end}`)
      } else {
        dateOk.add(d)
      }
    }
  }
  for (const legend of legends) {
    const hasStart = legend.timeline_start !== undefined && legend.timeline_start !== null && legend.timeline_start !== ''
    const hasEnd = legend.timeline_end !== undefined && legend.timeline_end !== null && legend.timeline_end !== ''
    if (hasStart !== hasEnd) {
      push(legend, `传说人物「${legend.name}」的 timeline_start 与 timeline_end 必须同时设置`)
      continue
    }
    if (hasStart && hasEnd) {
      const a = checkDate(legend, 'timeline_start', '传说人物', 'legend')
      const b = checkDate(legend, 'timeline_end', '传说人物', 'legend')
      if (a && b && yearOf(legend.timeline_start) > yearOf(legend.timeline_end)) {
        push(legend, `传说人物「${legend.name}」时间线区间倒置：${legend.timeline_start} 晚于 ${legend.timeline_end}`)
      }
    }
  }
  for (const r of rulers) {
    const a = checkDate(r, 'reign_start', '君主', 'ruler')
    const b = checkDate(r, 'reign_end', '君主', 'ruler')
    if (a && b) {
      if (yearOf(r.reign_start) > yearOf(r.reign_end)) {
        push(r, `君主「${r.temple_name}」在位起止倒置：${r.reign_start} 晚于 ${r.reign_end}`)
      } else {
        dateOk.add(r)
      }
    }
  }
  for (const c of civilizations) {
    const a = checkDate(c, 'start', '文明', 'civilization')
    const b = checkDate(c, 'end', '文明', 'civilization')
    if (a && b) {
      if (yearOf(c.start) > yearOf(c.end)) {
        push(c, `文明「${c.name}」起止倒置：${c.start} 晚于 ${c.end}`)
      } else {
        dateOk.add(c)
      }
    }
  }

  // ── id 唯一性。朝代与事件分属独立命名空间 ──────────────────
  const checkUnique = (records, noun) => {
    const seen = new Map()
    for (const r of records) {
      if (r.id === undefined) continue
      if (seen.has(r.id)) {
        const prev = locOf(seen.get(r.id))
        push(r, `${noun} id「${r.id}」重复，已见于 ${prev ? `${prev.file}:${prev.line}` : '别处'}`)
      } else {
        seen.set(r.id, r)
      }
    }
  }
  checkUnique(dynasties, '朝代')
  checkUnique([...events, ...worldEvents], '事件')

  // ── 枚举取值 ────────────────────────────────────────────────
  for (const e of [...events, ...worldEvents]) {
    if (e.category !== undefined && !CATEGORIES.includes(e.category)) {
      push(e, `事件「${labelOf(e, 'event')}」的 category「${e.category}」不在 ${CATEGORIES.join('/')} 之内`)
    }
    if (e.importance !== undefined) {
      const n = e.importance
      if (!Number.isInteger(n) || n < 1 || n > 5) {
        push(e, `事件「${labelOf(e, 'event')}」的 importance 须为 1–5 的整数，实际为 ${n}`)
      }
    }
    // confidence 与 dispute 由下方 checkConfidence 统一校验
  }

  // ── tags 须为字符串数组 ─────────────────────────────────────
  // 取值不做枚举——tags 就是为了容纳 category 装不下的细分维度
  // （制度、宗教、科技、民族、边疆…），限死取值就失去了意义。
  // 只校验类型，避免误写成字符串导致下游 join 出怪结果。
  for (const e of [...events, ...worldEvents]) {
    if (e.tags === undefined) continue
    if (!Array.isArray(e.tags)) {
      push(e, `事件「${labelOf(e, 'event')}」的 tags 须为数组，实际为 ${typeof e.tags}`)
      continue
    }
    for (const t of e.tags) {
      if (typeof t !== 'string' || t === '') {
        push(e, `事件「${labelOf(e, 'event')}」的 tags 含非字符串项：${JSON.stringify(t)}`)
      }
    }
  }

  // ── confidence / dispute：事件、朝代、君主三类通用 ──────────
  // 夏是否为信史、三皇五帝是否实有其人、张骞出使是前139还是前138——
  // 争议既可能落在某条事件上，也可能落在整个朝代或某位君主身上，
  // 故三类都须支持，且都须能写清争议内容而非只标一个「有争议」。
  const checkConfidence = (records, kind, noun) => {
    for (const r of records) {
      // confidence 可缺省，默认「确定」
      if (r.confidence !== undefined && !CONFIDENCES.includes(r.confidence)) {
        push(
          r,
          `${noun}「${labelOf(r, kind)}」的 confidence「${r.confidence}」不在 ${CONFIDENCES.join('/')} 之内`
        )
      }
      if (r.dispute !== undefined && typeof r.dispute !== 'string') {
        push(r, `${noun}「${labelOf(r, kind)}」的 dispute 须为文本`)
      }
      // 标了非「确定」却不说明争议何在，等于只告诉读者「别信」而不告诉「为何」。
      // 这是提示不是错误——有些条目确实只能存疑而无从展开。
      if (r.confidence && r.confidence !== '确定' && !r.dispute) {
        push(
          r,
          `${noun}「${labelOf(r, kind)}」标为「${r.confidence}」但未填 dispute 说明争议内容`,
          'warn'
        )
      }
    }
  }
  checkConfidence(events, 'event', '事件')
  checkConfidence(worldEvents, 'event', '世界事件')
  checkConfidence(dynasties, 'dynasty', '朝代')
  checkConfidence(rulers, 'ruler', '君主')
  checkConfidence(figures, 'figure', '人物')

  // ── 引用完整性 ──────────────────────────────────────────────
  const byId = new Map(dynasties.filter((d) => d.id !== undefined).map((d) => [d.id, d]))

  for (const d of dynasties) {
    if (d.parent !== undefined && d.parent !== null && !byId.has(d.parent)) {
      push(d, `朝代「${d.name}」的 parent「${d.parent}」不存在`)
    }
  }
  for (const r of rulers) {
    if (r.dynasty !== undefined && !byId.has(r.dynasty)) {
      push(r, `君主「${r.temple_name}」的 dynasty「${r.dynasty}」不存在`)
    }
  }
  for (const [records, noun, kind] of [
    [events, '事件', 'event'],
    [worldEvents, '世界事件', 'event'],
    [figures, '人物', 'figure'],
  ]) {
    for (const record of records) {
      if (record.related_dynasties === undefined) continue
      if (!Array.isArray(record.related_dynasties) || record.related_dynasties.length === 0) {
        push(record, `${noun}「${labelOf(record, kind)}」的 related_dynasties 须为非空数组`)
        continue
      }
      for (const dynastyId of record.related_dynasties) {
        if (!byId.has(dynastyId)) {
          push(record, `${noun}「${labelOf(record, kind)}」关联的朝代「${dynastyId}」不存在`)
        }
      }
    }
  }

  // ── 事件的朝代归属 ──────────────────────────────────────────
  // 孤儿事件报错而非静默通过：它在长卷上无处安放，会静默消失。
  // 故 dynasties.yaml 必须有兜底记录（如「上古」）覆盖夏以前的时段。
  const spans = dynasties.filter((d) => dateOk.has(d))
  for (const e of events) {
    if (!dateOk.has(e)) continue
    const y = yearOf(e.date)
    const hit = spans.some((d) => y >= yearOf(d.start) && y <= yearOf(d.end))
    if (!hit) {
      push(e, `事件「${labelOf(e, 'event')}」（${e.date}）不属于任何朝代区间`)
    }
  }

  // ── 朝代重叠：仅同层兄弟之间 ────────────────────────────────
  // 父子重叠合法——西汉 -0202~0008 完全落在汉 -0202~0220 之内。
  // 双方均声明 concurrent 时豁免（三国、南北朝等分裂期）。
  const siblings = new Map()
  for (const d of spans) {
    const key = d.parent ?? ROOT_KEY
    if (!siblings.has(key)) siblings.set(key, [])
    siblings.get(key).push(d)
  }
  for (const group of siblings.values()) {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const a = group[i]
        const b = group[j]
        if (a.concurrent && b.concurrent) continue
        if (crosses(a.start, a.end, b.start, b.end)) {
          const loc = locOf(a)
          push(
            b,
            `朝代「${b.name}」${b.start}~${b.end} 与「${a.name}」${a.start}~${a.end} 时间重叠` +
              `${loc ? `（见 ${loc.file}:${loc.line}）` : ''}。若为并存政权，两者均须声明 concurrent: true`
          )
        }
      }
    }
  }

  // ── 君主在位：仅同一朝代内两两比较 ──────────────────────────
  // 跨朝代的君主同时在位是分裂期的常态，不报错。
  const byDynasty = new Map()
  for (const r of rulers.filter((x) => dateOk.has(x))) {
    if (!byDynasty.has(r.dynasty)) byDynasty.set(r.dynasty, [])
    byDynasty.get(r.dynasty).push(r)
  }
  for (const [dynastyId, group] of byDynasty) {
    const sorted = [...group].sort((a, b) => sortKey(a.reign_start) - sortKey(b.reign_start))
    for (let i = 0; i < sorted.length; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        const a = sorted[i]
        const b = sorted[j]
        if (crosses(a.reign_start, a.reign_end, b.reign_start, b.reign_end)) {
          push(
            b,
            `君主「${b.temple_name}」在位 ${b.reign_start}~${b.reign_end} ` +
              `与「${a.temple_name}」${a.reign_start}~${a.reign_end} 重叠`
          )
        }
      }
    }

    // 在位期须落在所属朝代区间内
    const d = byId.get(dynastyId)
    if (d && dateOk.has(d)) {
      for (const r of group) {
        if (!contains(d.start, d.end, r.reign_start, r.reign_end)) {
          push(
            r,
            `君主「${r.temple_name}」在位 ${r.reign_start}~${r.reign_end} ` +
              `超出所属朝代「${d.name}」${d.start}~${d.end} 的区间`
          )
        }
      }
    }
  }

  // ── 起止顺序：end 不得早于 start ────────────────────────────
  // 手工编辑时最易发生的低级错误，且会让下游的跨度计算得出负数。
  const checkOrder = (records, kind, noun, sf, ef) => {
    for (const r of records) {
      if (!dateOk.has(r)) continue
      if (yearOf(r[ef]) < yearOf(r[sf])) {
        push(r, `${noun}「${labelOf(r, kind)}」的 ${ef}（${r[ef]}）早于 ${sf}（${r[sf]}）`)
      }
    }
  }
  checkOrder(dynasties, 'dynasty', '朝代', 'start', 'end')
  checkOrder(civilizations, 'civilization', '文明', 'start', 'end')
  checkOrder(rulers, 'ruler', '君主', 'reign_start', 'reign_end')
  checkOrder(figures, 'figure', '人物', 'birth', 'death')

  // ── 人物：日期格式、field 枚举、id 唯一 ─────────────────────
  const figIds = new Set()
  for (const f of figures) {
    checkDate(f, 'birth', '人物', 'figure')
    checkDate(f, 'death', '人物', 'figure')

    if (f.field !== undefined && !FIELDS.includes(f.field)) {
      push(f, `人物「${labelOf(f, 'figure')}」的 field「${f.field}」不在 ${FIELDS.join('/')} 之内`)
    }

    if (f.id !== undefined) {
      if (figIds.has(f.id)) push(f, `人物 id「${f.id}」重复`)
      figIds.add(f.id)
    }
  }

  // ── parent 指向须存在，且不得成环 ──────────────────────────
  for (const d of dynasties) {
    if (!d.parent) continue
    if (!byId.has(d.parent)) {
      push(d, `朝代「${d.name}」的 parent「${d.parent}」不存在`)
      continue
    }
    // 顺 parent 链上溯，若回到自身则成环
    const seen = new Set([d.id])
    let cur = byId.get(d.parent)
    while (cur?.parent) {
      if (seen.has(cur.id)) {
        push(d, `朝代「${d.name}」的 parent 链成环`)
        break
      }
      seen.add(cur.id)
      cur = byId.get(cur.parent)
    }
  }

  // ── 子朝代须落在父朝代区间内 ────────────────────────────────
  // 西汉须在汉之内。父朝代的起止应当覆盖其全部子朝代，否则长卷上
  // 子朝代的事件会落在父朝代色带之外。
  for (const d of dynasties) {
    if (!d.parent || !dateOk.has(d)) continue
    const p = byId.get(d.parent)
    if (!p || !dateOk.has(p)) continue
    if (!contains(p.start, p.end, d.start, d.end)) {
      push(
        d,
        `子朝代「${d.name}」${d.start}~${d.end} 超出父朝代「${p.name}」${p.start}~${p.end} 的区间`
      )
    }
  }

  // ── 君主的 dynasty 须指向存在的朝代，且不宜挂在有子朝代的父上 ──
  for (const r of rulers) {
    if (!r.dynasty) continue
    const d = byId.get(r.dynasty)
    if (!d) {
      push(r, `君主「${r.temple_name}」的 dynasty「${r.dynasty}」不存在`)
      continue
    }
    const hasChildren = dynasties.some((x) => x.parent === r.dynasty)
    if (hasChildren) {
      push(
        r,
        `君主「${r.temple_name}」挂在有子朝代的「${d.name}」上，` +
          `应改挂到具体的子朝代（如西汉、东汉）`
      )
    }
  }

  // ── role 取值与唯一性 ───────────────────────────────────────
  const ROLES = ['founder', 'last']
  const roleCount = new Map()
  for (const r of rulers) {
    if (r.role === undefined || r.role === null || r.role === '') continue
    if (!ROLES.includes(r.role)) {
      push(r, `君主「${r.temple_name}」的 role「${r.role}」不在 ${ROLES.join(' / ')} 之内`)
      continue
    }
    const key = `${r.dynasty}:${r.role}`
    roleCount.set(key, (roleCount.get(key) ?? 0) + 1)
    if (roleCount.get(key) === 2) {
      push(r, `朝代「${r.dynasty}」有多位 role: ${r.role} 的君主`)
    }
  }

  // ── 颜色须为合法十六进制 ────────────────────────────────────
  const HEX = /^#[0-9a-fA-F]{6}$/
  const checkColor = (records, kind, noun) => {
    for (const r of records) {
      if (r.color === undefined || r.color === null) continue
      if (!HEX.test(String(r.color))) {
        push(r, `${noun}「${labelOf(r, kind)}」的 color「${r.color}」须为 #RRGGBB 格式`)
      }
    }
  }
  checkColor(dynasties, 'dynasty', '朝代')
  checkColor(civilizations, 'civilization', '文明')

  // ── 同一朝代内君主在位应衔接，缺口过大提示 ──────────────────
  // 只警告不报错：改朝换代之际的空位、史料缺失、有意只录代表性君主
  // 都属正常。但连续两位之间隔了几十年，值得看一眼是不是漏了人。
  for (const [dynastyId, group] of byDynasty) {
    const d = byId.get(dynastyId)
    if (!d) continue
    const sorted = [...group].sort((a, b) => sortKey(a.reign_start) - sortKey(b.reign_start))
    for (let i = 1; i < sorted.length; i++) {
      const gap = yearOf(sorted[i].reign_start) - yearOf(sorted[i - 1].reign_end)
      if (gap > 20) {
        push(
          sorted[i],
          `「${d.name}」中「${sorted[i - 1].temple_name}」终于 ${sorted[i - 1].reign_end}，` +
            `「${sorted[i].temple_name}」始于 ${sorted[i].reign_start}，相隔 ${gap} 年，可能漏录君主`,
          'warn'
        )
      }
    }
  }

  return { errors, warnings }
}
