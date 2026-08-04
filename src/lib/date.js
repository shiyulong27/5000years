/**
 * 变精度日期工具。
 *
 * 日期一律为字符串，采用 ISO 8601 扩展格式，负号表示公元前，支持三种精度：
 *   "-0221"       仅到年（公元前 221 年）
 *   "-0209-07"    到月
 *   "1937-07-07"  到日
 *
 * 用字符串而非日期类型是刻意的：夏商只能确定到「约公元前 1600 年」，
 * 抗战需精确到日。日期类型会强迫为未知的月、日编造数值。
 */

const PATTERN = /^(-?\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/

const CN_MONTHS = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']

/**
 * 解析日期串。
 * @param {string} str
 * @returns {{year: number, month: number|null, day: number|null, precision: 'year'|'month'|'day'}}
 * @throws {Error} 格式非法时
 */
export function parseDate(str) {
  if (typeof str !== 'string' || str === '') {
    throw new Error(`日期须为非空字符串，实际为 ${JSON.stringify(str)}`)
  }

  const m = PATTERN.exec(str)
  if (!m) {
    throw new Error(`日期格式非法：「${str}」。年份须四位补零，如 -0221、0618、1937-07-07`)
  }

  const year = Number(m[1])
  const month = m[2] === undefined ? null : Number(m[2])
  const day = m[3] === undefined ? null : Number(m[3])

  if (month !== null && (month < 1 || month > 12)) {
    throw new Error(`月份越界：「${str}」`)
  }

  // 日只做 01–31 的粗校验，不做逐月天数校验。
  // 古代日期多由史料的干支、朔望记法折算而来，逐月精校会误拒合法数据。
  if (day !== null && (day < 1 || day > 31)) {
    throw new Error(`日越界：「${str}」`)
  }

  const precision = day !== null ? 'day' : month !== null ? 'month' : 'year'
  return { year, month, day, precision }
}

/**
 * 排序键。公式 year*10000 + month*100 + day。
 *
 * 该公式对公元前成立：-0221-01 得 -2209899，-0221-07 得 -2209299，
 * 前者小于后者，年内月份升序正确。
 *
 * @param {string} str
 * @returns {number}
 */
export function sortKey(str) {
  const { year, month, day } = parseDate(str)
  return year * 10000 + (month ?? 0) * 100 + (day ?? 0)
}

/**
 * 取年份。
 * @param {string} str
 * @returns {number}
 */
export function yearOf(str) {
  return parseDate(str).year
}

/**
 * 起止之间的年数，左闭右闭。
 *
 * 不存在公元 0 年，故跨越公元前后时为 |start| + end。
 * 汉「前202–220」计为 422 年，与传统纪年习惯一致。
 *
 * @param {string} start
 * @param {string} end
 * @returns {number}
 */
export function spanYears(start, end) {
  const s = yearOf(start)
  const e = yearOf(end)
  if (s < 0 && e > 0) return Math.abs(s) + e
  return e - s + 1
}

/**
 * 显示串。公元前用汉字月名，公元后用阿拉伯数字。
 * @param {string} str
 * @returns {string}
 */
export function formatDate(str) {
  const { year, month, day } = parseDate(str)
  const bce = year < 0
  const y = bce ? `前${Math.abs(year)}年` : `${year}年`

  if (month === null) return y
  if (bce) return `${y}${CN_MONTHS[month - 1]}月`
  if (day === null) return `${y}${month}月`
  return `${y}${month}月${day}日`
}
