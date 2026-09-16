import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'
import { buildTimeline } from '../src/lib/timeline.js'
import { buildRulerTransitions } from '../src/lib/rulerTransitions.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const CHUNQIU_RULERS = [
  '周平王', '周桓王', '周庄王', '周釐王', '周惠王', '周襄王', '周顷王',
  '周匡王', '周定王', '周简王', '周灵王', '周景王', '周悼王', '周敬王',
]
const ZHANGUO_RULERS = [
  '周元王', '周贞定王', '周哀王', '周思王', '周考王', '周威烈王',
  '周安王', '周烈王', '周显王', '周慎靓王', '周赧王',
]
const RULERS = [...CHUNQIU_RULERS, ...ZHANGUO_RULERS]
const EVENTS = [
  'xuge-battle', 'kuiqiu-alliance', 'three-families-partition-jin',
  'tian-replaces-qi', 'zhou-royal-house-ends', 'qin-destroys-east-zhou-state',
]
const AUDIT_EVENTS = [
  'changshao-battle', 'battle-of-hong', 'xian-gao-warns-zheng',
  'battle-of-xiao', 'yue-destroys-wu',
]
const FIGURES = [
  'qihuangong', 'jinwengong', 'chuzhuangwang', 'yanzi', 'zichan',
  'mozi', 'mengzi', 'shangyang', 'suqin', 'xunzi', 'hanfei',
]
const AUDIT_FIGURES = ['caogui', 'songxiangong', 'xiangao', 'fanli', 'wenzhong']
const QIN_HAN_AUDIT_EVENTS = [
  'bolang-sha-assassination', 'shaqiu-change', 'dafeng-ge', 'baideng-siege',
  'baima-oath', 'zhoubu-zhu-lu', 'tiying-shangshu',
]
const CHUNQIU_POLITIES = ['齐', '晋', '楚', '秦', '宋', '吴', '越']
const ZHANGUO_POLITIES = ['秦', '楚', '齐', '燕', '韩', '赵', '魏']

describe('东周内容完善', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const chunqiuRulers = data.rulers.filter((ruler) => ruler.dynasty === 'chunqiu')
  const zhanguoRulers = data.rulers.filter((ruler) => ruler.dynasty === 'zhanguo')
  const rulers = [...chunqiuRulers, ...zhanguoRulers]

  it('按春秋十四王、战国十一王完整收录东周二十五王', () => {
    expect(chunqiuRulers.map((ruler) => ruler.temple_name)).toEqual(CHUNQIU_RULERS)
    expect(zhanguoRulers.map((ruler) => ruler.temple_name)).toEqual(ZHANGUO_RULERS)
    expect(rulers.map((ruler) => ruler.temple_name)).toEqual(RULERS)
    for (const ruler of rulers) {
      expect(ruler.tags, `${ruler.temple_name} 缺少帝王标签`).toContain('帝王')
      expect(ruler.note?.trim(), `${ruler.temple_name} 缺少简介`).toBeTruthy()
      expect(['确定', '有争议'], `${ruler.temple_name} 缺少可信度`).toContain(ruler.confidence)
    }
  })

  it('标明东周开国、末代君主及生僻姓名拼音', () => {
    expect(rulers.find((ruler) => ruler.temple_name === '周平王')?.role).toBe('founder')
    expect(rulers.find((ruler) => ruler.temple_name === '周赧王')?.role).toBe('last')
    expect(rulers.find((ruler) => ruler.temple_name === '周平王')?.name).toContain('jiù')
    expect(rulers.find((ruler) => ruler.temple_name === '周惠王')?.name).toContain('làng')
    expect(rulers.find((ruler) => ruler.temple_name === '周敬王')?.name).toContain('gài')
    expect(rulers.find((ruler) => ruler.temple_name === '周考王')?.name).toContain('wéi')
  })

  it('二十五王全部在即位年份进入时间线', () => {
    const { rows } = buildTimeline(data)
    const startingRulers = rows
      .filter((row) => row.type === 'year')
      .flatMap((row) => row.startingRulers)
      .filter((ruler) => ruler.dynasty === 'chunqiu' || ruler.dynasty === 'zhanguo')
      .map((ruler) => ruler.temple_name)
    expect(startingRulers).toEqual(RULERS)
  })

  it('同年多次继位按前王到后王依次衔接', () => {
    const { rows } = buildTimeline(data)
    const transitionsAt = (year) => {
      const row = rows.find((item) => item.type === 'year' && item.year === year)
      return buildRulerTransitions(
        row.startingRulers.filter((ruler) => ruler.dynasty === 'chunqiu' || ruler.dynasty === 'zhanguo'),
        row.endingRulers.filter((ruler) => ruler.dynasty === 'chunqiu' || ruler.dynasty === 'zhanguo'),
      )
    }
    expect(transitionsAt(-520)).toEqual(['周景王 → 周悼王', '周悼王 → 周敬王'])
    expect(transitionsAt(-441)).toEqual(['周贞定王 → 周哀王', '周哀王 → 周思王'])
  })

  it('周王室止于前256年，不虚构延续至秦统一', () => {
    const { rows } = buildTimeline(data)
    const afterKingNan = rows
      .filter((row) => row.type === 'year' && row.year > -256 && row.year <= -221)
      .flatMap((row) => row.rulers)
      .filter((ruler) => ruler.dynasty === 'chunqiu' || ruler.dynasty === 'zhanguo')
    expect(afterKingNan).toEqual([])
    expect(rulers.at(-1)?.reign_end).toBe('-0256')
  })

  it('补入东周结构性事件并提供来源、分期和争议说明', () => {
    const events = data.events.filter((event) => EVENTS.includes(event.id))
    expect(events.map((event) => event.id)).toEqual(expect.arrayContaining(EVENTS))
    for (const event of events) {
      expect(event.related_dynasties, `${event.id} 未关联东周`).toContain('dongzhou')
      expect(event.related_dynasties?.some((id) => id === 'chunqiu' || id === 'zhanguo'), `${event.id} 未关联分期`).toBe(true)
      expect(event.tags?.length, `${event.id} 缺少标签`).toBeGreaterThan(0)
      expect(event.sources?.length, `${event.id} 缺少来源`).toBeGreaterThan(0)
      expect(event.confidence, `${event.id} 的 confidence 不正确`).toBe('有争议')
      expect(event.dispute?.trim(), `${event.id} 缺少争议说明`).toBeTruthy()
    }
  })

  it('补齐审计确认的春秋高优先级事件', () => {
    const events = data.events.filter((event) => AUDIT_EVENTS.includes(event.id))
    expect(events.map((event) => event.id)).toEqual(expect.arrayContaining(AUDIT_EVENTS))
    for (const event of events) {
      expect(event.related_dynasties, `${event.id} 未关联东周`).toContain('dongzhou')
      expect(event.related_dynasties?.some((id) => id === 'chunqiu' || id === 'zhanguo'), `${event.id} 未关联分期`).toBe(true)
      expect(event.tags?.length, `${event.id} 缺少标签`).toBeGreaterThan(0)
      expect(event.sources?.length, `${event.id} 缺少来源`).toBeGreaterThan(0)
      expect(event.dispute?.trim(), `${event.id} 缺少争议说明`).toBeTruthy()
      expect(event.confidence, `${event.id} 应保留传统史料争议`).toBe('有争议')
    }
    expect(data.events.find((event) => event.id === 'yue-destroys-wu')?.related_dynasties).toEqual(
      expect.arrayContaining(['chunqiu', 'zhanguo']),
    )
  })

  it('补入春秋战国代表人物并明确分期关联', () => {
    const figures = data.figures.filter((figure) => FIGURES.includes(figure.id))
    expect(figures.map((figure) => figure.id)).toEqual(expect.arrayContaining(FIGURES))
    for (const figure of figures) {
      expect(figure.related_dynasties, `${figure.id} 未关联东周`).toContain('dongzhou')
      expect(figure.related_dynasties?.some((id) => id === 'chunqiu' || id === 'zhanguo'), `${figure.id} 未关联分期`).toBe(true)
      expect(figure.note?.trim(), `${figure.id} 缺少简介`).toBeTruthy()
      expect(figure.dispute?.trim(), `${figure.id} 缺少争议说明`).toBeTruthy()
    }
  })

  it('补齐审计确认的春秋高优先级人物', () => {
    const figures = data.figures.filter((figure) => AUDIT_FIGURES.includes(figure.id))
    expect(figures.map((figure) => figure.id)).toEqual(expect.arrayContaining(AUDIT_FIGURES))
    for (const figure of figures) {
      expect(figure.related_dynasties, `${figure.id} 未关联东周`).toContain('dongzhou')
      expect(figure.related_dynasties?.some((id) => id === 'chunqiu' || id === 'zhanguo'), `${figure.id} 未关联分期`).toBe(true)
      expect(figure.birth, `${figure.id} 缺少时间线生年`).toBeTruthy()
      expect(figure.death, `${figure.id} 缺少时间线卒年`).toBeTruthy()
      expect(figure.note?.trim(), `${figure.id} 缺少简介`).toBeTruthy()
      expect(figure.dispute?.trim(), `${figure.id} 缺少争议说明`).toBeTruthy()
      expect(figure.confidence, `${figure.id} 应保留传统史料争议`).toBe('有争议')
    }
  })

  it('由人物简介承载中优先级的关系与跨年经历', () => {
    const guanzhong = data.figures.find((figure) => figure.id === 'guanzhong')
    expect(guanzhong?.note).toContain('鲍叔牙举荐')
    expect(guanzhong?.dispute).toContain('《左传》《史记》')

    const kongzi = data.figures.find((figure) => figure.id === 'kongzi')
    expect(kongzi?.note).toContain('周游卫、宋、陈、蔡')
    expect(kongzi?.dispute).toContain('《史记·孔子世家》')

    const wuzixu = data.figures.find((figure) => figure.id === 'wuzixu')
    expect(wuzixu?.note).toContain('逃楚入吴')
    expect(wuzixu?.dispute).toContain('过昭关')
  })

  it('修正三条审计指出的叙事置信度和首屏表述', () => {
    expect(data.events.find((event) => event.id === 'jiangtaigong-diaoyu')?.confidence).toBe('有争议')
    expect(data.events.find((event) => event.id === 'wuzi-xilu')?.confidence).toBe('有争议')
    const goujian = data.events.find((event) => event.id === 'woxin-changdan')
    expect(goujian?.title).toBe('越王勾践归国图强，灭吴雪耻')
    expect(goujian?.summary).not.toContain('卧薪')
    expect(goujian?.dispute).toContain('卧薪')
  })

  it('补齐战国至秦统一书籍审计确认的四个覆盖缺口', () => {
    const mozi = data.figures.find((figure) => figure.id === 'mozi')
    expect(mozi?.note).toContain('说服楚王停止攻宋')
    expect(mozi?.dispute).toContain('事件精确年份')

    const fanju = data.events.find((event) => event.id === 'fanju-far-alliance-near-attack')
    expect(fanju?.date).toBe('-0271')
    expect(fanju?.summary).toContain('远国、攻取邻国')
    expect(fanju?.sources).toContain('史记·范睢蔡泽列传')

    const changping = data.events.find((event) => event.id === 'changping-zhizhan')
    expect(changping?.summary).toContain('赵括代廉颇')
    expect(changping?.confidence).toBe('有争议')
    expect(changping?.dispute).toContain('纸上谈兵')
    expect(changping?.sources).toEqual(expect.arrayContaining([
      '史记·廉颇蔺相如列传', '史记·白起王翦列传',
    ]))

    const lisi = data.events.find((event) => event.id === 'lisi-remonstrates-expulsion')
    expect(lisi?.date).toBe('-0237')
    expect(lisi?.summary).toContain('撤销逐客令')
    expect(lisi?.sources).toEqual(expect.arrayContaining(['史记·李斯列传', '谏逐客书']))
  })

  it('纠正燕昭王招贤条目的寓言主角和黄金台边界', () => {
    const event = data.events.find((item) => item.id === 'qianjin-maigu')
    expect(event?.date).toBe('-0311')
    expect(event?.title).toBe('燕昭王礼郭隗，招贤复国')
    expect(event?.summary).toContain('郭隗以古人「千金市马骨」作譬')
    expect(event?.summary).not.toContain('黄金台')
    expect(event?.confidence).toBe('有争议')
    expect(event?.dispute).toContain('不是燕昭王亲自买骨')
    expect(event?.dispute).toContain('未记筑黄金台')
    expect(event?.dispute).toContain('未给此事独立纪年')
  })

  it('逐条收紧七个战国传统故事的证据边界', () => {
    const ids = [
      'shangyang-limu', 'sunbin-pangjuan', 'mengchangjun-jiming',
      'tiandan-huoniu', 'quyuan-miluo', 'maosui-zijian', 'qiefu-jiuzhao',
    ]
    const events = ids.map((id) => data.events.find((event) => event.id === id))
    for (const [index, event] of events.entries()) {
      expect(event, `${ids[index]} 不存在`).toBeTruthy()
      expect(event?.confidence, `${ids[index]} 未标明传世叙事争议`).toBe('有争议')
      expect(event?.dispute?.trim(), `${ids[index]} 缺少具体争议说明`).toBeTruthy()
      expect(event?.sources?.length, `${ids[index]} 未补独立纪年来源`).toBeGreaterThanOrEqual(2)
    }

    const shangyang = data.events.find((event) => event.id === 'shangyang-limu')
    expect(shangyang?.summary).toContain('先募能移至北门者予十金')
    expect(shangyang?.sources).toContain('史记·秦本纪')

    for (const event of events.slice(1)) {
      expect(event?.sources).toContain('史记·六国年表')
    }

    const maling = data.events.find((event) => event.id === 'sunbin-pangjuan')
    expect(maling?.title).toBe('马陵之战，孙膑减灶诱敌')
    expect(maling?.summary).not.toContain('魏国精锐尽丧')
    expect(maling?.dispute).toContain('庞涓死于此树之下')

    const mengchangjun = data.events.find((event) => event.id === 'mengchangjun-jiming')
    expect(mengchangjun?.date).toBe('-0298')
    expect(mengchangjun?.dispute).toContain('前299年薛文入相秦')

    const tiandan = data.events.find((event) => event.id === 'tiandan-huoniu')
    expect(tiandan?.dispute).toContain('千余头牛')

    const quyuan = data.events.find((event) => event.id === 'quyuan-miluo')
    expect(quyuan?.summary).not.toContain('秦破楚都郢城')
    expect(quyuan?.dispute).toContain('未把投江直接系于郢都失守')

    const maosui = data.events.find((event) => event.id === 'maosui-zijian')
    expect(maosui?.date).toBe('-0257')
    expect(maosui?.summary).not.toContain('解围')

    const xinlingjun = data.events.find((event) => event.id === 'qiefu-jiuzhao')
    expect(xinlingjun?.date).toBe('-0257')
    expect(xinlingjun?.dispute).toContain('未记十月')
  })

  it('补入秦末汉初书目候选事件并保留纪年争议边界', () => {
    const events = QIN_HAN_AUDIT_EVENTS.map((id) => data.events.find((event) => event.id === id))
    for (const [index, event] of events.entries()) {
      expect(event, `${QIN_HAN_AUDIT_EVENTS[index]} 不存在`).toBeTruthy()
      expect(event?.confidence, `${QIN_HAN_AUDIT_EVENTS[index]} 未保留传世叙事争议`).toBe('有争议')
      expect(event?.dispute?.trim(), `${QIN_HAN_AUDIT_EVENTS[index]} 缺少争议说明`).toBeTruthy()
      expect(event?.sources?.length, `${QIN_HAN_AUDIT_EVENTS[index]} 缺少实际来源`).toBeGreaterThanOrEqual(1)
    }

    expect(data.events.find((event) => event.id === 'bolang-sha-assassination')?.date).toBe('-0218')
    expect(data.events.find((event) => event.id === 'shaqiu-change')?.summary).toContain('胡亥继位')
    expect(data.events.find((event) => event.id === 'dafeng-ge')?.summary).toContain('《大风歌》')
    expect(data.events.find((event) => event.id === 'baideng-siege')?.summary).toContain('白登七日')
    expect(data.events.find((event) => event.id === 'baima-oath')?.dispute).toContain('具体日期')
    expect(data.events.find((event) => event.id === 'zhoubu-zhu-lu')?.summary).toContain('迎立代王刘恒')

    const tiying = data.events.find((event) => event.id === 'tiying-shangshu')
    expect(tiying?.date).toBe('-0167')
    expect(tiying?.dispute).toContain('文帝四年')
    expect(tiying?.dispute).toContain('文帝十三年')
  })

  it('第63篇细柳营保留纪年依据和传世叙事边界', () => {
    const event = data.events.find((item) => item.id === 'zhouyafu-xiliu')
    expect(event?.date).toBe('-0158')
    expect(event?.summary).toContain('驻军细柳')
    expect(event?.summary).not.toContain('此真将军矣')
    expect(event?.confidence).toBe('有争议')
    expect(event?.dispute).toContain('文帝之后六年')
    expect(event?.dispute).toContain('传世列传')

    const figure = data.figures.find((item) => item.id === 'zhouyafu')
    expect(figure?.confidence).toBe('有争议')
    expect(figure?.dispute).toContain('前200年仅为项目时间线占位')
  })

  it('补入第65篇马邑诱敌战并保留传世叙事边界', () => {
    const event = data.events.find((item) => item.id === 'mayi-lure-battle')
    expect(event?.date).toBe('-0133')
    expect(event?.title).toBe('马邑诱敌战未成')
    expect(event?.summary).toContain('聂壹')
    expect(event?.summary).toContain('单于察觉汉军计划后退兵')
    expect(event?.confidence).toBe('有争议')
    expect(event?.dispute).toContain('前133年只作年份级纪年')
    expect(event?.sources).toEqual(['史记·匈奴列传'])
  })

  it('汉初人物不会因生卒年份重叠误入战国人物组', () => {
    expect(data.figures.find((figure) => figure.id === 'lishiqi')?.related_dynasties).toEqual(['han'])
    expect(data.figures.find((figure) => figure.id === 'xiangyu')?.related_dynasties).toEqual(['qin', 'han'])
    expect(data.figures.find((figure) => figure.id === 'hanxin')?.related_dynasties).toEqual(['han'])
  })

  it('按国家收录春秋主要诸侯和战国七雄的代表君主', () => {
    const chunqiuPolities = data.polities.filter((polity) => polity.period === 'chunqiu')
    const zhanguoPolities = data.polities.filter((polity) => polity.period === 'zhanguo')
    expect(chunqiuPolities.map((polity) => polity.name)).toEqual(CHUNQIU_POLITIES)
    expect(zhanguoPolities.map((polity) => polity.name)).toEqual(ZHANGUO_POLITIES)
    expect(chunqiuPolities.flatMap((polity) => polity.rulers)).toHaveLength(16)
    expect(zhanguoPolities.flatMap((polity) => polity.rulers)).toHaveLength(20)

    for (const polity of data.polities) {
      expect(polity.summary?.trim(), `${polity.id} 缺少国家概况`).toBeTruthy()
      expect(polity.sources?.length, `${polity.id} 缺少来源`).toBeGreaterThan(0)
      expect(polity.rulers?.length, `${polity.id} 缺少代表君主`).toBeGreaterThan(0)
      for (const ruler of polity.rulers) {
        expect(ruler.title?.trim(), `${polity.id} 存在无称号君主`).toBeTruthy()
        expect(ruler.name?.trim(), `${ruler.title} 缺少姓名`).toBeTruthy()
        expect(ruler.note?.trim(), `${ruler.title} 缺少简介`).toBeTruthy()
      }
    }
  })

  it('诸侯国君主不混入周天子世系，并为生僻字提供拼音', () => {
    expect(rulers).toHaveLength(25)
    expect(data.rulers.some((ruler) => ruler.temple_name === '齐桓公')).toBe(false)
    const polityRulers = data.polities.flatMap((polity) => polity.rulers)
    expect(polityRulers.find((ruler) => ruler.title.startsWith('吴王阖闾'))?.title).toContain('hé lǘ')
    expect(polityRulers.find((ruler) => ruler.title.startsWith('齐湣王'))?.title).toContain('mǐn')
    expect(polityRulers.find((ruler) => ruler.title.startsWith('魏安釐王'))?.title).toContain('xī')
  })

  it('周朝详情页在周王世系之外渲染诸侯国分组', () => {
    const dynastyPage = fs.readFileSync(path.join(ROOT, 'src/pages/dynasty/[id].astro'), 'utf8')
    const polityComponent = fs.readFileSync(path.join(ROOT, 'src/components/PolityRulers.astro'), 'utf8')
    expect(dynastyPage).toContain('<PolityRulers period={group.period} polities={group.polities} />')
    expect(polityComponent).toContain('这不是把诸侯并入周王世系')
    expect(polityComponent).toContain('{period.name} · 主要诸侯国')
    expect(polityComponent).toContain('id={`period-${period.id}`}')
    expect(dynastyPage).toContain('href={`#period-${c.id}`}')
  })

  it('窄屏时周王表和诸侯表各自在内部横向滚动', () => {
    const rulerTable = fs.readFileSync(path.join(ROOT, 'src/components/RulerTable.astro'), 'utf8')
    const styles = fs.readFileSync(path.join(ROOT, 'src/styles/global.css'), 'utf8')
    expect(rulerTable).toContain('class="ruler-table-wrap"')
    expect(styles).toMatch(/\.ruler-table-wrap\s*\{[^}]*overflow-x:\s*auto/s)
    expect(styles).toMatch(/\.polity-rulers-wrap\s*\{[^}]*overflow-x:\s*auto/s)
  })

  it('周朝详情页按西周、春秋、战国三个叶子时期分组', () => {
    const dynastyPage = fs.readFileSync(path.join(ROOT, 'src/pages/dynasty/[id].astro'), 'utf8')
    expect(dynastyPage).toContain('descendants.filter((period) => !descendants.some')
    expect(dynastyPage).toContain("`${group.period.name} · 重要人物`")
    expect(dynastyPage).toContain("`${group.period.name} · 重要事件`")
  })
})
