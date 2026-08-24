import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const TARGET_EVENTS = [
  'yuanshao-eunuchs-189',
  'caocao-chenliu-189',
  'wangyun-lvbu-192',
  'xiandi-moves-xu-196',
  'yidai-edict-199',
]
const INSTITUTIONAL_EVENTS = [
  'liangji-fall-159',
  'first-party-prohibition-166',
  'second-party-prohibition-169',
]
const EARLY_EASTERN_HAN_EVENTS = [
  'chuwang-ying-buddhism-65',
]

describe('东汉早期佛教内容', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const events = new Map(data.events.map((event) => [event.id, event]))

  it('以楚王英诏书承载第79篇的可定位节点', () => {
    const event = events.get(EARLY_EASTERN_HAN_EVENTS[0])
    expect(event).toBeTruthy()
    expect(event?.date).toBe('0065')
    expect(event?.related_dynasties).toContain('donghan')
    expect(event?.summary).toContain('永平八年')
    expect(event?.summary).toContain('浮屠')
    expect(event?.confidence).toBe('有争议')
    expect(event?.dispute).toContain('世传')
    expect(event?.dispute).toContain('白马寺创建')
  })
})

describe('东汉中期制度政治内容', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const events = new Map(data.events.map((event) => [event.id, event]))

  it('补齐第82至84篇的三个直接事件入口', () => {
    for (const id of INSTITUTIONAL_EVENTS) {
      const event = events.get(id)
      expect(event, `缺少事件 ${id}`).toBeTruthy()
      expect(event?.related_dynasties, `${id} 未关联东汉`).toContain('donghan')
      expect(event?.tags?.length, `${id} 缺少标签`).toBeGreaterThan(0)
      expect(event?.sources?.length, `${id} 缺少来源`).toBeGreaterThan(0)
      expect(event?.confidence, `${id} 未保留传世纪传边界`).toBe('有争议')
      expect(event?.dispute?.trim(), `${id} 缺少争议说明`).toBeTruthy()
    }
  })

  it('分别保留梁冀覆亡和两次党锢的年份级节点', () => {
    expect(events.get('liangji-fall-159')?.date).toBe('0159')
    expect(events.get('first-party-prohibition-166')?.date).toBe('0166')
    expect(events.get('second-party-prohibition-169')?.date).toBe('0169')
    expect(events.get('first-party-prohibition-166')?.dispute).toContain('不与169年的第二次捕杀合并')
  })

  it('范滂由第二次党锢节点承载且不固化文学化临别言辞', () => {
    expect(events.get('first-party-prohibition-166')?.summary).not.toContain('范滂')
    expect(events.get('second-party-prohibition-169')?.summary).toContain('范滂')
    expect(events.get('second-party-prohibition-169')?.summary).toContain('自行前往县狱')
    expect(events.get('second-party-prohibition-169')?.dispute).toContain('文学化临别言辞')
  })
})

describe('东汉末年政权竞争内容', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const events = new Map(data.events.map((event) => [event.id, event]))

  it('补齐第86至90篇的五个直接事件入口', () => {
    for (const id of TARGET_EVENTS) {
      const event = events.get(id)
      expect(event, `缺少事件 ${id}`).toBeTruthy()
      expect(event?.related_dynasties, `${id} 未关联东汉`).toContain('donghan')
      expect(event?.tags?.length, `${id} 缺少标签`).toBeGreaterThan(0)
      expect(event?.sources?.length, `${id} 缺少来源`).toBeGreaterThan(0)
      expect(event?.confidence, `${id} 未保留传世叙事边界`).toBe('有争议')
      expect(event?.dispute?.trim(), `${id} 缺少争议说明`).toBeTruthy()
    }
  })

  it('五个节点采用来源可支持的年份级锚点', () => {
    expect(events.get('yuanshao-eunuchs-189')?.date).toBe('0189')
    expect(events.get('caocao-chenliu-189')?.date).toBe('0189')
    expect(events.get('wangyun-lvbu-192')?.date).toBe('0192')
    expect(events.get('xiandi-moves-xu-196')?.date).toBe('0196')
    expect(events.get('yidai-edict-199')?.date).toBe('0199')
  })

  it('摘要承载核心过程且不写入文学扩展', () => {
    expect(events.get('yuanshao-eunuchs-189')?.summary).toContain('何进被宦官杀害')
    expect(events.get('caocao-chenliu-189')?.summary).toContain('陈留')
    expect(events.get('wangyun-lvbu-192')?.summary).toContain('士孙瑞')
    expect(events.get('xiandi-moves-xu-196')?.summary).toContain('洛阳残破')
    expect(events.get('yidai-edict-199')?.summary).toContain('董承')
    expect(events.get('yidai-edict-199')?.dispute).toContain('不沿用后世文学扩展情节')
  })
})

describe('黄巾与官渡叙事边界', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const events = new Map(data.events.map((event) => [event.id, event]))

  it('黄巾事件承载组织与镇压过程而非单句王朝结论', () => {
    const event = events.get('huangjin-184')
    expect(event?.related_dynasties).toContain('donghan')
    expect(event?.tags).toContain('太平道')
    expect(event?.summary).toContain('皇甫嵩')
    expect(event?.summary).toContain('持续活动')
    expect(event?.summary).not.toContain('名存实亡')
    expect(event?.confidence).toBe('有争议')
    expect(event?.sources).toContain('后汉书·皇甫嵩朱儁列传')
  })

  it('官渡事件保留年份级日期与兵力争议', () => {
    const event = events.get('guandu-zhizhan')
    expect(event?.date).toBe('0200')
    expect(event?.related_dynasties).toContain('donghan')
    expect(event?.summary).toContain('乌巢')
    expect(event?.summary).toContain('仍延续数年')
    expect(event?.summary).not.toContain('奠定北方统一')
    expect(event?.summary).not.toContain('以少胜多')
    expect(event?.dispute).toContain('裴松之')
    expect(event?.dispute).toContain('不把农历冬十月直接写作公历月份')
  })
})
