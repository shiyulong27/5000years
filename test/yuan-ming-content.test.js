import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll, locOf } from '../src/lib/load.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const data = loadAll(path.join(ROOT, 'data'))
const events = new Map(data.events.map((event) => [event.id, event]))

describe('元明阶段基线', () => {
  it('保留已有元明关键入口', () => {
    const ids = [
      'hubilie-yuan-1271',
      'mongol-unification-1206',
      'mongol-jin-war-1211',
      'mongol-destroy-jin-1234',
      'yuan-province-system-1280',
      'yuan-unify-1279',
      'guohushou-canal-1292',
      'yuan-fall-1368',
      'ming-1368',
      'po-yang-lake-1363',
      'hu-weiyong-case-1380',
      'jingnan-zhiyi',
      'zheng-he-1405',
      'tumu-1449',
      'beijing-baoweizhan',
      'hairui-baguan',
      'qijiguang-wokou',
      'bencao-1596',
      'yang-yiquan-li-jin-1510',
      'yang-jisheng-impeach-1553',
      'wanli-mining-tax-1596',
      'wen-tianxiang-qibing-1275',
      'zhangshijie-yashan-1279',
      'yuan-paper-money-crisis-1350',
      'shoushi-calendar-1281',
      'wangyangming-xinxue-1521',
    ]
    for (const id of ids) {
      const event = events.get(id)
      expect(event, `缺少事件 ${id}`).toBeTruthy()
      expect(locOf(event)?.file, `事件 ${id} 缺少源文件位置`).toMatch(/^events\//)
    }
    for (const id of ids.filter((id) => !['zheng-he-1405', 'tumu-1449'].includes(id))) {
      expect(events.get(id)?.sources?.length, `事件 ${id} 缺少来源`).toBeGreaterThan(0)
    }
  })

  it('复合窗口统计可复核并排除 1840 年以后内容', () => {
    const windowEvents = data.events.filter((event) => {
      const year = Number(String(event.date).slice(0, 4))
      return Number.isFinite(year) && year >= 1206 && year <= 1644
    })
    expect(windowEvents).toHaveLength(53)
    expect(windowEvents.filter((event) => locOf(event)?.file === 'events/yuan.yaml')).toHaveLength(13)
    expect(windowEvents.filter((event) => locOf(event)?.file === 'events/ming.yaml')).toHaveLength(26)
    expect(windowEvents.some((event) => event.id === 'qing-enter-pass-1644')).toBe(true)
  })

  it('王表基线明确存在缺口而非伪装为完整世系', () => {
    expect(data.rulers.filter((ruler) => ruler.dynasty === 'yuan')).toHaveLength(2)
    expect(data.rulers.filter((ruler) => ruler.dynasty === 'ming')).toHaveLength(3)
  })
})
