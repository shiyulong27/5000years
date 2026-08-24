import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'
import { buildTimeline } from '../src/lib/timeline.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const RULERS = [
  '清太宗', '清世祖', '清圣祖', '清世宗', '清高宗',
  '清仁宗', '清宣宗', '清文宗', '清穆宗', '清德宗', '宣统帝'
]

const KEY_EVENTS = [
  'huangtaiji-qing-1636', 'qing-enter-pass-1644', 'zhengchenggong-taiwan-1662',
  'taiwan-incorporation-1683', 'nerchinsk-treaty-1689', 'tandingrumou-1723',
  'grand-council-1729', 'qianlong-xinjiang-1759', 'humen-xiaoyan',
  'cn-opium-war-184006', 'cn-sino-japanese-war-189407', 'cn-wuchang-uprising-191110',
  'cn-qing-abdication-191202'
]

const KEY_FIGURES = [
  'dorgon', 'guyanwu', 'huangzongxi', 'wangfuzhi', 'pusongling',
  'songgotu', 'caoxueqin', 'jixiaolan', 'linzexu', 'weiyuan',
  'zengguofan', 'zuozongtang', 'lihongzhang', 'cixi', 'yixin',
  'zhantianyou', 'tansitong', 'liangqichao'
]

describe('清朝内容体系化完善', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const qingRulers = data.rulers.filter((ruler) => ruler.dynasty === 'qing')

  it('完整收录清代十一帝世系，无断代与缺漏', () => {
    expect(qingRulers.map((ruler) => ruler.temple_name)).toEqual(RULERS)
    for (const ruler of qingRulers) {
      expect(Array.isArray(ruler.tags), `${ruler.temple_name} 的 tags 须为数组`).toBe(true)
      expect(ruler.tags, `${ruler.temple_name} 缺少帝王标签`).toContain('帝王')
      expect(ruler.note?.trim(), `${ruler.temple_name} 缺少 note 简介`).toBeTruthy()
      expect(ruler.confidence, `${ruler.temple_name} confidence 应为确定`).toBe('确定')
    }
  })

  it('明确清太宗开国与宣统帝末代历史角色', () => {
    expect(qingRulers.find((r) => r.temple_name === '清太宗')?.role).toBe('founder')
    expect(qingRulers.find((r) => r.temple_name === '宣统帝')?.role).toBe('last')
    expect(qingRulers.find((r) => r.temple_name === '宣统帝')?.note).toContain('退位')
  })

  it('十一帝全部在即位年份进入历史时间线', () => {
    const { rows } = buildTimeline(data)
    const startingRulers = rows
      .filter((row) => row.type === 'year')
      .flatMap((row) => row.startingRulers)
      .filter((ruler) => ruler.dynasty === 'qing')
      .map((ruler) => ruler.temple_name)
    expect(startingRulers).toEqual(RULERS)
  })

  it('收录清代关键转折与国家制度建设重大事件', () => {
    const events = data.events.filter((event) => KEY_EVENTS.includes(event.id))
    expect(events.map((event) => event.id)).toEqual(expect.arrayContaining(KEY_EVENTS))
    for (const event of events) {
      expect(event.related_dynasties, `${event.id} 未关联到清朝 qing`).toContain('qing')
      expect(Array.isArray(event.tags), `${event.id} 的 tags 须为数组`).toBe(true)
      expect(event.tags.length, `${event.id} 缺少 tags`).toBeGreaterThan(0)
      expect(Array.isArray(event.sources), `${event.id} 的 sources 须为数组`).toBe(true)
      expect(event.sources.length, `${event.id} 缺少 sources`).toBeGreaterThan(0)
      expect(event.summary?.trim(), `${event.id} 缺少 summary`).toBeTruthy()
    }
  })

  it('收录清代非君主核心重要人物，并正确关联朝代', () => {
    const figures = data.figures.filter((figure) => KEY_FIGURES.includes(figure.id))
    expect(figures.map((figure) => figure.id), '缺少清代重要人物').toEqual(expect.arrayContaining(KEY_FIGURES))
    for (const figure of figures) {
      expect(figure.related_dynasties, `${figure.id} 未关联到清朝 qing`).toContain('qing')
      expect(figure.note?.trim(), `${figure.id} 缺少 note`).toBeTruthy()
      expect(figure.birth, `${figure.id} 缺少生年`).toBeTruthy()
      expect(figure.death, `${figure.id} 缺少卒年`).toBeTruthy()
      expect(figure.field, `${figure.id} 缺少领域分类`).toBeTruthy()
      expect(RULERS, `${figure.id} 不应与皇帝庙号重复`).not.toContain(figure.name)
    }
  })
})
