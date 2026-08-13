import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const RULERS = ['禹', '启', '太康', '仲康', '相', '少康', '杼', '槐', '芒', '泄', '不降', '扃', '廑', '孔甲', '皋', '发', '桀']
const EVENTS = [
  'dayu-zhishui', 'xia-founding', 'gan-oath', 'taikang-lost-state',
  'houyi-takes-xia', 'hanzhuo-usurpation', 'shaokang-restoration',
  'zhu-expansion', 'shang-founding',
]
const FIGURES = ['gun', 'boyi', 'youhu-leader', 'houyi-xia', 'hanzhuo', 'nuai', 'mi-xia', 'guanlongpang', 'meixi', 'shangtang']

describe('夏朝内容完善', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const xiaRulers = data.rulers.filter((ruler) => ruler.dynasty === 'xia')
  const xiaEvents = data.events.filter((event) => EVENTS.includes(event.id))

  it('完整收录十七王，并标注其争议性与帝王身份', () => {
    expect(xiaRulers.map((ruler) => ruler.temple_name)).toEqual(RULERS)
    for (const ruler of xiaRulers) {
      expect(Array.isArray(ruler.tags), `${ruler.temple_name} 的 tags 须为数组`).toBe(true)
      expect(ruler.tags, `${ruler.temple_name} 缺少帝王标签`).toContain('帝王')
      expect(ruler.confidence, `${ruler.temple_name} 的 confidence 不正确`).toBe('有争议')
      expect(ruler.dispute?.trim(), `${ruler.temple_name} 缺少 dispute`).toBeTruthy()
    }
  })

  it('明确禹、启、桀的历史角色', () => {
    expect(xiaRulers.find((ruler) => ruler.temple_name === '禹')?.role).toBe('founder')
    expect(xiaRulers.find((ruler) => ruler.temple_name === '启')?.note).toContain('首位世袭君主')
    expect(xiaRulers.find((ruler) => ruler.temple_name === '桀')?.role).toBe('last')
  })

  it('收录九项夏朝关键事件及其来源和争议说明', () => {
    expect(xiaEvents.map((event) => event.id)).toEqual(expect.arrayContaining(EVENTS))
    for (const event of xiaEvents) {
      expect(Array.isArray(event.tags), `${event.id} 的 tags 须为数组`).toBe(true)
      expect(event.tags.length, `${event.id} 缺少 tags`).toBeGreaterThan(0)
      expect(Array.isArray(event.sources), `${event.id} 的 sources 须为数组`).toBe(true)
      expect(event.sources.length, `${event.id} 缺少 sources`).toBeGreaterThan(0)
      for (const source of event.sources) {
        expect(typeof source === 'string' && source.trim(), `${event.id} 存在空或非文本来源`).toBeTruthy()
      }
      expect(['传说', '有争议'], `${event.id} 的 confidence 不正确`).toContain(event.confidence)
      expect(event.dispute?.trim(), `${event.id} 缺少 dispute`).toBeTruthy()
    }
  })

  it('收录十位夏朝相关人物并保留人物说明与争议信息', () => {
    const figures = data.figures.filter((figure) => FIGURES.includes(figure.id))
    expect(figures.map((figure) => figure.id), '缺少夏朝相关人物').toEqual(expect.arrayContaining(FIGURES))
    for (const figure of figures) {
      expect(figure.note?.trim(), `${figure.id} 缺少 note`).toBeTruthy()
      expect(figure.confidence, `${figure.id} 的 confidence 不正确`).toBe('有争议')
      expect(figure.dispute?.trim(), `${figure.id} 缺少 dispute`).toBeTruthy()
      expect(RULERS, `${figure.id} 不应与君主重复`).not.toContain(figure.name)
    }
  })

  it('为三项核心事件提供可用且有出处的夏朝图片', () => {
    for (const id of ['dayu-zhishui', 'shaokang-restoration', 'shang-founding']) {
      const event = data.events.find((item) => item.id === id)
      expect(event, `缺少事件 ${id}`).toBeDefined()
      expect(event?.image?.url ?? '', `${id} 的图片路径不正确`).toMatch(/^\/images\/events\/xia\/[a-z0-9-]+\.jpg$/)
      expect(event?.image?.caption?.trim(), `${id} 缺少图片说明`).toBeTruthy()
      expect(event?.image?.source ?? '', `${id} 的图片来源不正确`).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/)
      expect(event?.image?.author?.trim(), `${id} 缺少作者`).toBeTruthy()
      expect(event?.image?.license?.trim(), `${id} 缺少许可`).toBeTruthy()

      const imagePath = path.join(ROOT, 'public', (event?.image?.url ?? '').replace(/^\//, ''))
      expect(fs.existsSync(imagePath), `${id} 图片不存在: ${imagePath}`).toBe(true)
      expect(fs.statSync(imagePath).size, `${id} 图片文件过小`).toBeGreaterThan(1024)
      expect([...fs.readFileSync(imagePath).subarray(0, 3)], `${id} 图片不是 JPEG`).toEqual([0xff, 0xd8, 0xff])
    }
  })

  it('在帝王表中展示标签', () => {
    const rulerTable = fs.readFileSync(path.join(ROOT, 'src/components/RulerTable.astro'), 'utf8')
    expect(rulerTable).toContain('rt-th-tags')
    expect(rulerTable).toContain('r.tags?.map')
    expect(rulerTable).toContain('ruler-tag')
  })
})
