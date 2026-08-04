import { describe, it, expect } from 'vitest'
import { parseDate, sortKey, yearOf, spanYears, formatDate } from '../src/lib/date.js'

describe('parseDate', () => {
  it('解析仅到年的公元前日期', () => {
    expect(parseDate('-0221')).toEqual({ year: -221, month: null, day: null, precision: 'year' })
  })

  it('解析到月的公元前日期', () => {
    expect(parseDate('-0209-07')).toEqual({ year: -209, month: 7, day: null, precision: 'month' })
  })

  it('解析到日的公元日期', () => {
    expect(parseDate('1937-07-07')).toEqual({ year: 1937, month: 7, day: 7, precision: 'day' })
  })

  it('年份必须四位补零', () => {
    expect(() => parseDate('221')).toThrow()
    expect(() => parseDate('-221')).toThrow()
  })

  it('月份越界时抛错', () => {
    expect(() => parseDate('1937-13')).toThrow()
    expect(() => parseDate('1937-00')).toThrow()
  })

  it('日越界时抛错', () => {
    expect(() => parseDate('1937-07-32')).toThrow()
    expect(() => parseDate('1937-07-00')).toThrow()
  })

  it('不做逐月天数校验——古代日期多由史料原文折算，逐月精校会误拒合法数据', () => {
    expect(() => parseDate('1937-02-31')).not.toThrow()
  })

  it('拒绝非字符串与空值', () => {
    expect(() => parseDate(null)).toThrow()
    expect(() => parseDate(1937)).toThrow()
    expect(() => parseDate('')).toThrow()
  })
})

describe('sortKey', () => {
  it('仅到年', () => {
    expect(sortKey('-0221')).toBe(-2210000)
    expect(sortKey('1937')).toBe(19370000)
  })

  it('到月与到日', () => {
    expect(sortKey('-0209-07')).toBe(-2089300)
    expect(sortKey('1937-07-07')).toBe(19370707)
  })

  it('公元前年内月份升序正确（已验证结论 1）', () => {
    expect(sortKey('-0221-01')).toBe(-2209900)
    expect(sortKey('-0221-07')).toBe(-2209300)
    expect(sortKey('-0221-01')).toBeLessThan(sortKey('-0221-07'))
  })

  it('公元前年内日升序正确', () => {
    expect(sortKey('-0221-01-01')).toBe(-2209899)
    expect(sortKey('-0221-07-01')).toBe(-2209299)
    expect(sortKey('-0221-01-01')).toBeLessThan(sortKey('-0221-07-01'))
    expect(sortKey('-0221-01-01')).toBeLessThan(sortKey('-0221-01-02'))
  })

  it('跨公元前后排序正确', () => {
    expect(sortKey('-0001')).toBeLessThan(sortKey('0001'))
  })

  it('同年内精度递增者排在后（年 < 月 < 日）', () => {
    expect(sortKey('1937')).toBeLessThan(sortKey('1937-01'))
    expect(sortKey('1937-07')).toBeLessThan(sortKey('1937-07-07'))
  })
})

describe('yearOf', () => {
  it('取出年份', () => {
    expect(yearOf('-0221')).toBe(-221)
    expect(yearOf('1937-07-07')).toBe(1937)
  })
})

describe('spanYears', () => {
  it('跨公元前后为 |start| + end——不存在公元 0 年', () => {
    expect(spanYears('-0202', '0220')).toBe(422)
  })

  it('公元后为 end - start + 1', () => {
    expect(spanYears('0618', '0907')).toBe(290)
  })

  it('公元前为 end - start + 1', () => {
    expect(spanYears('-0221', '-0207')).toBe(15)
  })

  it('同年为 1', () => {
    expect(spanYears('1912', '1912')).toBe(1)
  })
})

describe('formatDate', () => {
  it('公元前仅到年', () => {
    expect(formatDate('-0221')).toBe('前221年')
  })

  it('公元前到月用汉字月名', () => {
    expect(formatDate('-0209-07')).toBe('前209年七月')
  })

  it('公元后到日', () => {
    expect(formatDate('1937-07-07')).toBe('1937年7月7日')
  })

  it('公元后仅到年', () => {
    expect(formatDate('0618')).toBe('618年')
  })
})
