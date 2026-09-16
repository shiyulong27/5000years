import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'
import { buildTimeline } from '../src/lib/timeline.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const RULERS = [
  '周武王', '周成王', '周康王', '周昭王', '周穆王', '周共王',
  '周懿王', '周孝王', '周夷王', '周厉王', '周宣王', '周幽王',
]
const EVENTS = [
  'zhou-founding', 'zhougong-dandan', 'zhou-enfeoffment-chengzhou', 'chengkang-rule',
  'zhaowang-south-campaign', 'muwang-western-tour', 'guoren-riot', 'gonghe-regency',
  'xuanwang-restoration', 'qianmu-defeat', 'fenghuo-xizhouhou', 'pingwang-east',
]
const FIGURES = [
  'jiangziya', 'zhougong', 'zhouwenwang', 'zhaogong-shi', 'boqin',
  'kangshu-feng', 'gongbo-he', 'yinjifu', 'baosi',
]

describe('西周内容完善', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const rulers = data.rulers.filter((ruler) => ruler.dynasty === 'xizhou')

  it('完整收录武王至幽王十二王', () => {
    expect(rulers.map((ruler) => ruler.temple_name)).toEqual(RULERS)
    for (const ruler of rulers) {
      expect(ruler.tags, `${ruler.temple_name} 缺少帝王标签`).toContain('帝王')
      expect(ruler.note?.trim(), `${ruler.temple_name} 缺少简介`).toBeTruthy()
      expect(ruler.confidence, `${ruler.temple_name} 的 confidence 不正确`).toBe('有争议')
      expect(ruler.dispute?.trim(), `${ruler.temple_name} 缺少争议说明`).toBeTruthy()
    }
  })

  it('标明开国、末代及生僻姓名拼音', () => {
    expect(rulers.find((ruler) => ruler.temple_name === '周武王')?.role).toBe('founder')
    expect(rulers.find((ruler) => ruler.temple_name === '周幽王')?.role).toBe('last')
    expect(rulers.find((ruler) => ruler.temple_name === '周共王')?.name).toContain('yī hù')
    expect(rulers.find((ruler) => ruler.temple_name === '周幽王')?.name).toContain('shēng')
  })

  it('十二王全部在即位年份进入时间线', () => {
    const { rows } = buildTimeline(data)
    const startingRulers = rows
      .filter((row) => row.type === 'year')
      .flatMap((row) => row.startingRulers)
      .filter((ruler) => ruler.dynasty === 'xizhou')
      .map((ruler) => ruler.temple_name)
    expect(startingRulers).toEqual(RULERS)
  })

  it('共和行政作为无王阶段而非虚构君王', () => {
    expect(rulers.some((ruler) => ruler.temple_name.includes('共和'))).toBe(false)
    const { rows } = buildTimeline(data)
    const republicRows = rows.filter((row) => row.type === 'year' && row.year > -841 && row.year < -827)
    expect(republicRows.flatMap((row) => row.rulers).filter((ruler) => ruler.dynasty === 'xizhou')).toEqual([])
  })

  it('收录西周关键事件并提供来源和争议说明', () => {
    const events = data.events.filter((event) => EVENTS.includes(event.id))
    expect(events.map((event) => event.id)).toEqual(expect.arrayContaining(EVENTS))
    for (const event of events) {
      expect(event.related_dynasties?.some((id) => id === 'zhou' || id === 'xizhou'), `${event.id} 未关联西周`).toBe(true)
      expect(event.tags?.length, `${event.id} 缺少标签`).toBeGreaterThan(0)
      expect(event.sources?.length, `${event.id} 缺少来源`).toBeGreaterThan(0)
      expect(event.confidence, `${event.id} 的 confidence 不正确`).toBe('有争议')
      expect(event.dispute?.trim(), `${event.id} 缺少争议说明`).toBeTruthy()
    }
  })

  it('收录西周非君王重要人物', () => {
    const figures = data.figures.filter((figure) => FIGURES.includes(figure.id))
    expect(figures.map((figure) => figure.id)).toEqual(expect.arrayContaining(FIGURES))
    for (const figure of figures) {
      expect(figure.related_dynasties?.some((id) => id === 'zhou' || id === 'xizhou'), `${figure.id} 未关联西周`).toBe(true)
      expect(figure.note?.trim(), `${figure.id} 缺少简介`).toBeTruthy()
      expect(figure.confidence, `${figure.id} 的 confidence 不正确`).toBe('有争议')
      expect(figure.dispute?.trim(), `${figure.id} 缺少争议说明`).toBeTruthy()
      expect(RULERS, `${figure.id} 不应与西周王表重复`).not.toContain(figure.name)
    }
  })

  it('周朝详情页按西周、东周分别展示人物和事件', () => {
    const dynastyPage = fs.readFileSync(path.join(ROOT, 'src/pages/dynasty/[id].astro'), 'utf8')
    expect(dynastyPage).toContain('const contentGroups = periods.map')
    expect(dynastyPage).toContain('data-period={group.period?.id}')
    expect(dynastyPage).toContain("`${group.period.name} · 重要人物`")
    expect(dynastyPage).toContain("`${group.period.name} · 重要事件`")
  })
})
