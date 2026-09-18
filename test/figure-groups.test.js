import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { loadAll, withLoc } from '../src/lib/load.js'
import { validate } from '../src/lib/validate.js'

const DATA_DIR = fileURLToPath(new URL('../data', import.meta.url))

describe('名家组合与历史谱系数据 (data/figure-groups.yaml)', () => {
  const data = loadAll(DATA_DIR)
  const { figureGroups = [], figures = [], legends = [] } = data
  const figIds = new Set(figures.map((f) => f.id))
  const legendIds = new Set(legends.map((l) => l.id))

  it('成功加载 figureGroups 且记录数符合预期', () => {
    expect(figureGroups.length).toBeGreaterThanOrEqual(16)
  })

  it('所有组合必须具备必填字段且 id 唯一', () => {
    const ids = new Set()
    for (const g of figureGroups) {
      expect(g.id).toBeTruthy()
      expect(g.name).toBeTruthy()
      expect(g.category).toBeTruthy()
      expect(g.period).toBeTruthy()
      expect(g.summary).toBeTruthy()
      expect(Array.isArray(g.figures)).toBe(true)
      expect(g.figures.length).toBeGreaterThan(0)

      expect(ids.has(g.id)).toBe(false)
      ids.add(g.id)
    }
  })

  it('所有成员引用的 figure id 必须在 figures.yaml 或 legends 中存在', () => {
    for (const g of figureGroups) {
      for (const ref of g.figures) {
        expect(ref.id).toBeTruthy()
        const exists = figIds.has(ref.id) || legendIds.has(ref.id)
        if (!exists) {
          throw new Error(`组合「${g.name}」引用的成员 id「${ref.id}」不存在`)
        }
        expect(exists).toBe(true)
      }
    }
  })

  it('核心经典组合名单完整性验证', () => {
    const byId = new Map(figureGroups.map((g) => [g.id, g]))

    // 三苏
    const sansu = byId.get('sansu')
    expect(sansu).toBeDefined()
    expect(sansu.figures.map((f) => f.id)).toEqual(['suxun', 'sushi', 'suzhe'])

    // 唐宋八大家
    const badajia = byId.get('tangsong-badajia')
    expect(badajia).toBeDefined()
    expect(badajia.figures).toHaveLength(8)
    const badajiaIds = new Set(badajia.figures.map((f) => f.id))
    for (const id of ['hanyu', 'liuzongyuan', 'ouyangxiu', 'suxun', 'sushi', 'suzhe', 'wanganshi', 'zenggong']) {
      expect(badajiaIds.has(id)).toBe(true)
    }

    // 扬州八怪
    const baguai = byId.get('yangzhou-baguai')
    expect(baguai).toBeDefined()
    expect(baguai.figures).toHaveLength(8)
    const baguaiIds = new Set(baguai.figures.map((f) => f.id))
    for (const id of ['zhengxie', 'jinnong', 'huangshen', 'lishan', 'lifangying', 'wangshishen', 'luopin', 'gaoxiang']) {
      expect(baguaiIds.has(id)).toBe(true)
    }

    // 三皇五帝
    const shwd = byId.get('sanhuang-wudi')
    expect(shwd).toBeDefined()
    expect(shwd.figures).toHaveLength(8)
    for (const f of shwd.figures) {
      expect(legendIds.has(f.id)).toBe(true)
    }

    // 战国四公子
    const sigongzi = byId.get('zhanguo-sigongzi')
    expect(sigongzi).toBeDefined()
    expect(sigongzi.figures.map((f) => f.id)).toEqual(['mengchangjun', 'pingyuanjun', 'xinlingjun', 'chunshenjun'])

    // 汉初三杰
    const sanjie = byId.get('hanchu-sanjie')
    expect(sanjie).toBeDefined()
    expect(sanjie.figures.map((f) => f.id)).toEqual(['zhangliang', 'xiaohe', 'hanxin'])
  })

  it('双向索引正确性：苏轼属于多个经典组合', () => {
    const sushiGroups = figureGroups.filter((g) => g.figures.some((f) => f.id === 'sushi')).map((g) => g.id)
    expect(sushiGroups).toContain('tangsong-badajia')
    expect(sushiGroups).toContain('sansu')
    expect(sushiGroups).toContain('song-sijia')
  })
})

describe('validateFigureGroups 校验器规则拦截', () => {
  it('缺失必填字段或引用不存在的人物时报错', () => {
    const fakeData = {
      dynasties: [],
      rulers: [],
      events: [],
      worldEvents: [],
      civilizations: [],
      figures: [
        withLoc({ id: 'fig-a', name: '人物A', field: '文学', birth: '1000', death: '1050' }, 'figures.yaml', 10),
      ],
      legends: [],
      figureGroups: [
        withLoc(
          {
            id: 'test-group',
            name: '测试组合',
            category: '文学',
            period: '宋代',
            // summary 缺失
            figures: [{ id: 'fig-a' }, { id: 'non-existent-person' }],
          },
          'figure-groups.yaml',
          5
        ),
      ],
    }

    const errors = validate(fakeData)
    const summaryErr = errors.find((e) => e.message.includes('缺少必填字段 summary'))
    expect(summaryErr).toBeDefined()
    expect(summaryErr.file).toBe('figure-groups.yaml')
    expect(summaryErr.line).toBe(5)

    const missingFigErr = errors.find((e) => e.message.includes('non-existent-person'))
    expect(missingFigErr).toBeDefined()
    expect(missingFigErr.message).toContain('在 figures.yaml 与 legends/ 中均不存在')
  })
})
