import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'
import { buildTimeline } from '../src/lib/timeline.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const RULERS = [
  '汤', '外丙', '仲壬', '太甲', '沃丁', '太庚', '小甲', '雍己', '太戊', '仲丁',
  '外壬', '河亶甲', '祖乙', '祖辛', '沃甲', '祖丁', '南庚', '阳甲', '盘庚', '小辛',
  '小乙', '武丁', '祖庚', '祖甲', '廪辛', '康丁', '武乙', '文丁', '帝乙', '帝辛',
]
const EVENTS = [
  'shang-founding', 'yi-yin-regency', 'zhongding-moves-ao', 'oracle-bone',
  'wuding-restoration', 'fuhao-campaigns', 'late-shang-east-campaigns', 'zhou-founding',
]
const FIGURES = ['yiyin', 'zhonghui', 'fuyue', 'fuhao', 'bigan', 'jizi', 'weizi', 'daji', 'jiangziya']

describe('商朝内容完善', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const shangRulers = data.rulers.filter((ruler) => ruler.dynasty === 'shang')

  it('按实际即位口径完整收录三十王', () => {
    expect(shangRulers.map((ruler) => ruler.temple_name)).toEqual(RULERS)
    expect(shangRulers.some((ruler) => ruler.temple_name === '太丁')).toBe(false)
    for (const ruler of shangRulers) {
      expect(ruler.tags, `${ruler.temple_name} 缺少帝王标签`).toContain('帝王')
      expect(ruler.note?.trim(), `${ruler.temple_name} 缺少简介`).toBeTruthy()
      expect(ruler.confidence, `${ruler.temple_name} 的 confidence 不正确`).toBe('有争议')
      expect(ruler.dispute?.trim(), `${ruler.temple_name} 缺少争议说明`).toBeTruthy()
    }
  })

  it('明确开国君主和末代君主', () => {
    expect(shangRulers.find((ruler) => ruler.temple_name === '汤')?.role).toBe('founder')
    expect(shangRulers.find((ruler) => ruler.temple_name === '帝辛')?.role).toBe('last')
    expect(shangRulers.find((ruler) => ruler.temple_name === '帝辛')?.note).toContain('纣王')
  })

  it('三十王全部在即位年份进入时间线', () => {
    const { rows } = buildTimeline(data)
    const startingRulers = rows
      .filter((row) => row.type === 'year')
      .flatMap((row) => row.startingRulers)
      .filter((ruler) => ruler.dynasty === 'shang')
      .map((ruler) => ruler.temple_name)
    expect(startingRulers).toEqual(RULERS)
  })

  it('收录商朝关键事件并提供来源和不确定性说明', () => {
    const events = data.events.filter((event) => EVENTS.includes(event.id))
    expect(events.map((event) => event.id)).toEqual(expect.arrayContaining(EVENTS))
    for (const event of events) {
      expect(event.related_dynasties, `${event.id} 未关联商朝`).toContain('shang')
      expect(event.tags?.length, `${event.id} 缺少标签`).toBeGreaterThan(0)
      expect(event.sources?.length, `${event.id} 缺少来源`).toBeGreaterThan(0)
      expect(event.dispute?.trim(), `${event.id} 缺少争议说明`).toBeTruthy()
      expect(event.confidence, `${event.id} 的 confidence 不正确`).toBe('有争议')
    }
  })

  it('收录商朝非君王重要人物，并避免与世系重复', () => {
    const figures = data.figures.filter((figure) => FIGURES.includes(figure.id))
    expect(figures.map((figure) => figure.id)).toEqual(expect.arrayContaining(FIGURES))
    for (const figure of figures) {
      expect(figure.related_dynasties, `${figure.id} 未关联商朝`).toContain('shang')
      expect(figure.note?.trim(), `${figure.id} 缺少简介`).toBeTruthy()
      expect(figure.confidence, `${figure.id} 的 confidence 不正确`).toBe('有争议')
      expect(figure.dispute?.trim(), `${figure.id} 缺少争议说明`).toBeTruthy()
      expect(RULERS, `${figure.id} 不应与商王世系重复`).not.toContain(figure.name)
    }
  })

  it('详情页优先按显式朝代关联筛选人物', () => {
    const dynastyPage = fs.readFileSync(path.join(ROOT, 'src/pages/dynasty/[id].astro'), 'utf8')
    expect(dynastyPage).toContain('figure.related_dynasties?.length ? isRelated(figure) : overlaps')
  })
})
