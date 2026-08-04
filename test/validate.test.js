import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'
import { validate } from '../src/lib/validate.js'

const FIXTURES = fileURLToPath(new URL('./fixtures', import.meta.url))

/** 深拷贝夹具，避免用例间互相污染。位置信息为 Symbol，需手工搬运 */
function freshData(mutate) {
  const data = loadAll(FIXTURES)
  if (mutate) mutate(data)
  return data
}

describe('validate — 夹具基线', () => {
  it('未经破坏的夹具全部通过', () => {
    expect(validate(freshData())).toEqual([])
  })
})

describe('必填字段', () => {
  it('事件缺 importance 时报错，并指向正确文件行号', () => {
    const errs = validate(
      freshData((d) => {
        delete d.events.find((e) => e.id === 'dazexiang-209bc').importance
      })
    )
    expect(errs).toHaveLength(1)
    expect(errs[0].file).toBe('events/qin.yaml')
    expect(errs[0].line).toBe(13)
    expect(errs[0].message).toContain('importance')
  })

  it('朝代缺 color 时报错', () => {
    const errs = validate(
      freshData((d) => {
        delete d.dynasties.find((x) => x.id === 'qin').color
      })
    )
    expect(errs.some((e) => e.message.includes('color'))).toBe(true)
  })

  it('君主缺 temple_name 时报错', () => {
    const errs = validate(
      freshData((d) => {
        delete d.rulers.find((r) => r.temple_name === '秦二世').temple_name
      })
    )
    expect(errs.length).toBeGreaterThan(0)
  })
})

describe('id 唯一性', () => {
  it('事件 id 重复时报错', () => {
    const errs = validate(
      freshData((d) => {
        d.events.find((e) => e.id === 'dazexiang-209bc').id = 'qin-unify-221bc'
      })
    )
    expect(errs.some((e) => e.message.includes('重复'))).toBe(true)
  })

  it('朝代与事件的 id 命名空间独立，同名不报错', () => {
    const errs = validate(
      freshData((d) => {
        d.events.find((e) => e.id === 'dazexiang-209bc').id = 'qin'
      })
    )
    expect(errs.filter((e) => e.message.includes('重复'))).toHaveLength(0)
  })
})

describe('枚举取值', () => {
  it('category 越界时报错', () => {
    const errs = validate(
      freshData((d) => {
        d.events[0].category = '八卦'
      })
    )
    expect(errs.some((e) => e.message.includes('category'))).toBe(true)
  })

  it('importance 非 1-5 整数时报错', () => {
    const errs = validate(
      freshData((d) => {
        d.events[0].importance = 9
      })
    )
    expect(errs.some((e) => e.message.includes('importance'))).toBe(true)
  })

  it('confidence 越界时报错', () => {
    const errs = validate(
      freshData((d) => {
        d.events[0].confidence = '大概吧'
      })
    )
    expect(errs.some((e) => e.message.includes('confidence'))).toBe(true)
  })

  it('confidence 缺省不报错——默认「确定」', () => {
    const errs = validate(
      freshData((d) => {
        delete d.events[0].confidence
      })
    )
    expect(errs).toEqual([])
  })
})

describe('日期格式', () => {
  it('事件日期格式非法时报错', () => {
    const errs = validate(
      freshData((d) => {
        d.events[0].date = '221'
      })
    )
    expect(errs.some((e) => e.message.includes('日期'))).toBe(true)
  })

  it('朝代起止格式非法时报错', () => {
    const errs = validate(
      freshData((d) => {
        d.dynasties.find((x) => x.id === 'qin').end = '不详'
      })
    )
    expect(errs.length).toBeGreaterThan(0)
  })
})

describe('事件的朝代归属', () => {
  it('落在所有朝代之外的孤儿事件报错', () => {
    const errs = validate(
      freshData((d) => {
        d.events.push({ id: 'orphan', date: '1937', title: '孤儿', category: '政治', importance: 1 })
      })
    )
    expect(errs.some((e) => e.message.includes('不属于任何朝代'))).toBe(true)
  })

  it('落在兜底朝代内的远古事件不报错', () => {
    const errs = validate(
      freshData((d) => {
        d.events.push({ id: 'yu', date: '-2070', title: '大禹治水', category: '政治', importance: 4 })
      })
    )
    expect(errs).toEqual([])
  })
})

describe('朝代区间重叠', () => {
  it('父子朝代重叠合法——西汉完全落在汉之内（已验证结论 3）', () => {
    expect(validate(freshData())).toEqual([])
  })

  it('并存政权声明 concurrent 后不报错', () => {
    expect(validate(freshData())).toEqual([])
  })

  it('并存政权取消 concurrent 后报错', () => {
    const errs = validate(
      freshData((d) => {
        d.dynasties.find((x) => x.id === 'shu').concurrent = false
      })
    )
    expect(errs.some((e) => e.message.includes('重叠'))).toBe(true)
  })

  it('同层非并存朝代重叠时报错', () => {
    const errs = validate(
      freshData((d) => {
        // 秦提前到 -0230，与兜底的上古（止于 -0222）真正交叉
        d.dynasties.find((x) => x.id === 'qin').start = '-0230'
      })
    )
    expect(errs.some((e) => e.message.includes('重叠'))).toBe(true)
  })
})

describe('君主在位区间', () => {
  it('交替之年衔接不算重叠——秦始皇止 -0210，秦二世起 -0210', () => {
    expect(validate(freshData())).toEqual([])
  })

  it('真正交叉时报错', () => {
    const errs = validate(
      freshData((d) => {
        d.rulers.find((r) => r.temple_name === '秦二世').reign_start = '-0211'
      })
    )
    expect(errs.some((e) => e.message.includes('重叠'))).toBe(true)
  })

  it('跨朝代的君主同时在位不报错——分裂期的常态', () => {
    const errs = validate(
      freshData((d) => {
        d.rulers.push({
          dynasty: 'shu',
          temple_name: '汉昭烈帝',
          reign_start: '0221',
          reign_end: '0223',
        })
        d.rulers.push({
          dynasty: 'wu',
          temple_name: '吴大帝',
          reign_start: '0222',
          reign_end: '0252',
        })
      })
    )
    expect(errs).toEqual([])
  })

  it('在位期超出所属朝代区间时报错', () => {
    const errs = validate(
      freshData((d) => {
        d.rulers.find((r) => r.temple_name === '秦二世').reign_end = '-0200'
      })
    )
    expect(errs.some((e) => e.message.includes('朝代'))).toBe(true)
  })

  it('所属朝代 id 不存在时报错', () => {
    const errs = validate(
      freshData((d) => {
        d.rulers[0].dynasty = 'nonexistent'
      })
    )
    expect(errs.length).toBeGreaterThan(0)
  })
})

describe('朝代 parent 引用', () => {
  it('parent 指向不存在的朝代时报错', () => {
    const errs = validate(
      freshData((d) => {
        d.dynasties.find((x) => x.id === 'xihan').parent = 'ghost'
      })
    )
    expect(errs.length).toBeGreaterThan(0)
  })
})

describe('文明色带', () => {
  it('缺 region 时报错', () => {
    const errs = validate(
      freshData((d) => {
        delete d.civilizations[0].region
      })
    )
    expect(errs.some((e) => e.message.includes('region'))).toBe(true)
  })

  it('起止倒置时报错', () => {
    const errs = validate(
      freshData((d) => {
        d.civilizations[0].start = '-1000'
        d.civilizations[0].end = '-1550'
      })
    )
    expect(errs.length).toBeGreaterThan(0)
  })
})
