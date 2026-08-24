import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const data = loadAll(path.join(ROOT, 'data'))
const events = new Map(data.events.map((event) => [event.id, event]))

const STRUCTURAL_EVENTS = [
  'longzhong-plan-207',
  'liubei-yizhou-214',
  'lumeng-jingzhou-219',
  'sunquan-emperor-229',
  'wuzhangyuan-234',
  'simayi-feign-illness-249',
  'simazhao-power-255',
]

describe('三国政权结构与跨政权关系', () => {
  it('为五个首批高优先级缺口提供直接事件入口', () => {
    for (const id of STRUCTURAL_EVENTS) {
      const event = events.get(id)
      expect(event, `缺少事件 ${id}`).toBeTruthy()
      expect(event?.related_dynasties?.length, `${id} 缺少分期关系`).toBeGreaterThan(0)
      expect(event?.tags?.length, `${id} 缺少标签`).toBeGreaterThan(0)
      expect(event?.sources?.length, `${id} 缺少来源`).toBeGreaterThan(0)
    }
  })

  it('区分孙吴分期起点与229年孙权称帝', () => {
    const event = events.get('sunquan-emperor-229')
    expect(event?.date).toBe('0229')
    expect(event?.related_dynasties).toEqual(['wu'])
    expect(event?.title).toContain('建立帝号')
    expect(event?.summary).toContain('武昌')
    expect(event?.summary).toContain('建业')
  })

  it('隆中对只采用有争议的年份级传统系年', () => {
    const event = events.get('longzhong-plan-207')
    expect(event?.date).toBe('0207')
    expect(event?.confidence).toBe('有争议')
    expect(event?.dispute).toContain('没有直接标明会见年份')
    expect(event?.dispute).toContain('不补造具体月日')
  })

  it('以214年成都受降承载刘备取得益州的多年过程', () => {
    const event = events.get('liubei-yizhou-214')
    expect(event?.date).toBe('0214')
    expect(event?.summary).toContain('211年')
    expect(event?.summary).toContain('刘璋出降')
    expect(event?.related_dynasties).toEqual(['donghan', 'shu'])
  })

  it('以史实过程而非典故标题承载吕蒙取荆州和司马昭掌权', () => {
    const jingzhou = events.get('lumeng-jingzhou-219')
    expect(jingzhou?.date).toBe('0219')
    expect(jingzhou?.title).not.toContain('白衣渡江')
    expect(jingzhou?.summary).toContain('伪装商旅')

    const simazhao = events.get('simazhao-power-255')
    expect(simazhao?.date).toBe('0255')
    expect(simazhao?.title).not.toContain('野心')
    expect(simazhao?.summary).toContain('都督中外诸军')
    expect(simazhao?.related_dynasties).toEqual(['wei', 'jin'])
  })

  it('直接承载五丈原和司马懿称疾避爽', () => {
    const wuzhangyuan = events.get('wuzhangyuan-234')
    expect(wuzhangyuan?.date).toBe('0234')
    expect(wuzhangyuan?.summary).toContain('五丈原')
    expect(wuzhangyuan?.summary).toContain('病卒于军中')
    expect(wuzhangyuan?.dispute).toContain('死诸葛走生仲达')

    const illness = events.get('simayi-feign-illness-249')
    expect(illness?.date).toBe('0249')
    expect(illness?.confidence).toBe('有争议')
    expect(illness?.summary).toContain('以年老有病为由退避')
    expect(illness?.dispute).toContain('《魏末传》')
  })
})

describe('三国社会经济与既有叙事边界', () => {
  it('以196年始兴屯田承载东汉至曹魏的跨期经济结构', () => {
    const event = events.get('caocao-tuntian-196')
    expect(event?.date).toBe('0196')
    expect(event?.category).toBe('经济')
    expect(event?.related_dynasties).toEqual(['donghan', 'wei'])
    expect(event?.confidence).toBe('有争议')
    expect(event?.dispute).toContain('裴松之注引《魏书》')
  })

  it('魏代汉不再被表述为三政权同日形成', () => {
    const event = events.get('wei-founding-220')
    expect(event?.summary).toContain('并非在同一天同时成立')
    expect(event?.summary).not.toContain('正式形成')
  })

  it('晋灭吴使用事实性摘要而非诗句', () => {
    const event = events.get('jin-unify-280')
    expect(event?.summary).toContain('孙皓投降')
    expect(event?.summary).toContain('结束三国分立局面')
    expect(event?.summary).not.toContain('金陵王气')
    expect(event?.sources).toContain('晋书·王濬传')
  })

  it('七步诗不保留无来源的月级精度', () => {
    const event = events.get('caozhi-qibu')
    expect(event?.date).toBe('0220')
    expect(event?.confidence).toBe('传说')
    expect(event?.dispute).toContain('没有给出事件年份')
    expect(event?.dispute).toContain('不保留原有月级精度')
  })

  it('街亭条目分开承载战败与马谡处置记载', () => {
    const event = events.get('jieting-jiji')
    expect(event?.title).toBe('街亭失守与马谡被处置')
    expect(event?.summary).toContain('断绝蜀军汲水道路')
    expect(event?.summary).not.toContain('挥泪斩马谡')
    expect(event?.confidence).toBe('有争议')
    expect(event?.dispute).toContain('下狱物故')
    expect(event?.sources).toContain('三国志·张郃传')
  })
})
