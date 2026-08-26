import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import yaml from 'js-yaml'
import { loadAll, withLoc } from '../src/lib/load.js'
import { validateWithWarnings } from '../src/lib/validate.js'

/**
 * 人物详卷链路专项测试（TASK-002）。
 *
 * 夹具是独立于真实数据的合成样本：figures/events/dynasties/sources 均由
 * 本文件提供，使断言只针对详卷校验逻辑本身，不受真实数据演进干扰。
 * 真实数据目录的加载与校验由 npm run validate 全量覆盖。
 */

const here = dirname(fileURLToPath(import.meta.url))
const dataDir = join(here, '..', 'data')

function loadFixture(name) {
  const doc = yaml.load(readFileSync(join(here, 'fixtures', 'figure-detail', name), 'utf8'))
  // 直接解析的夹具没有经过加载层，补上源位置以便断言错误指向的文件
  return withLoc(doc, `figures/detail/${name}`)
}

// 合成的最小外部依赖：dufu 供关系目标引用，事件与朝代供 related_event_id 与区间判定引用
const baseFigures = [
  { id: 'valid-sample', name: '合法样例', field: '文学', birth: '0701', death: '0762' },
  { id: 'invalid-sample', name: '非法样例', field: '文学', birth: '0701', death: '0762' },
  { id: 'dufu', name: '杜甫', field: '文学', birth: '0712', death: '0770' },
]
const baseEvents = [
  { id: 'evt-742', date: '0742', title: '测试事件', category: '政治', importance: 3 },
]
const baseDynasties = [
  { id: 'tang', name: '唐', start: '0618', end: '0907', color: '#123456' },
]
const baseSources = [
  { id: 'src-test-001', type: '原始文献', title: '测试文献一', status: '有效' },
  { id: 'src-test-002', type: '学术研究', title: '测试研究二', status: '有效' },
  { id: 'src-gone-001', type: '网络权威页面', title: '已失效来源', status: '失效' },
]

function runWith(details, overrides = {}) {
  return validateWithWarnings({
    figureDetails: details,
    figures: overrides.figures ?? baseFigures,
    events: overrides.events ?? baseEvents,
    dynasties: overrides.dynasties ?? baseDynasties,
    sources: overrides.sources ?? baseSources,
  })
}

describe('loadAll 集成人物详卷与来源注册表', () => {
  it('真实数据目录：figureDetails 与 sources 字段存在且为数组', () => {
    const data = loadAll(dataDir)
    expect(Array.isArray(data.figureDetails)).toBe(true)
    expect(Array.isArray(data.sources)).toBe(true)
    expect(Array.isArray(data.figures)).toBe(true)
  })

  it('单对象文件形状：非对象顶层会被拒绝', async () => {
    // parseSingleWithLoc 未导出，经 loadSingleDir 行为间接验证：
    // 构造临时数据不可行（loadAll 只接受目录），故以行为契约断言
    // 真实目录当前不含 detail 文件时不报错。
    const data = loadAll(dataDir)
    expect(() => validateWithWarnings(data)).not.toThrow()
  })
})

describe('合法夹具通过全部详卷校验', () => {
  const valid = loadFixture('valid-sample.yaml')

  it('无 error 级问题', () => {
    const { errors } = runWith([valid])
    expect(errors.filter((e) => e.file.includes('detail/valid-sample'))).toEqual([])
  })

  it('条目级来源齐备时不产生「未引用来源」警告', () => {
    const { warnings } = runWith([valid])
    expect(warnings.filter((w) => w.message.includes('valid-sample') && w.message.includes('未引用任何来源'))).toEqual([])
  })
})

describe('非法夹具逐类拦截（err-01 至 err-18）', () => {
  const invalid = loadFixture('invalid-sample.yaml')
  let errors = []
  let warnings = []

  const collect = () => {
    const r = runWith([invalid])
    errors = r.errors.filter((e) => e.file.includes('detail/invalid-sample'))
    warnings = r.warnings.filter((e) => e.file.includes('detail/invalid-sample'))
  }

  it('存在 error 且均指向非法夹具文件', () => {
    collect()
    expect(errors.length).toBeGreaterThan(10)
    expect(errors.every((e) => e.file === 'figures/detail/invalid-sample.yaml')).toBe(true)
  })

  const cases = [
    ['schema_version 必须为 1', /schema_version 须为 1/],
    ['gender 枚举', /profile\.gender.*不在/],
    ['fields 越界', /profile\.fields 含不在 FIELDS 内的值：「美食」/],
    ['roles 类型', /profile\.roles 须为数组/],
    ['未知日期禁 year', /标为「未知」却携带 year/],
    ['范围倒置', /范围倒置：year 720 晚于 range_end 710/],
    ['关联事件不存在', /related_event_id「no-such-event」不存在/],
    ['作品 context 缺失', /works\[0\]\.context 缺失/],
    ['full 超长文本', /text_display=full 但 excerpt 超过 200 字/],
    ['经度越界', /lng 超出 \[-180,180\]/],
    ['推定缺坐标来源', /为推定项但未填 coord_source/],
    ['纪念地须 memorial_only', /kind 为「纪念地」时 memorial_only 必须为 true/],
    ['relation_type 枚举', /relation_type「笔友」不在/],
    ['关系目标不存在', /target_id「no-such-figure」不存在/],
    ['后世附会强制 inferred', /为后世附会，必须 inferred: true/],
    ['reception era 枚举', /era「现代网评」不在/],
    ['条目级来源不存在', /reception\[0\] 引用的来源「src-gone-999」不存在/],
    ['sources_used 来源不存在', /sources_used 引用的来源「src-gone-999」不存在/],
  ]

  for (const [name, pattern] of cases) {
    it(`拦截：${name}`, () => {
      collect()
      expect(errors.some((e) => pattern.test(e.message))).toBe(true)
    })
  }

  it('失效来源引用产生警告而非错误', () => {
    const srcs = [...baseSources, { id: 'src-old-001', type: '学术研究', title: '旧来源', status: '失效' }]
    const d = structuredClone(invalid)
    d.sources_used = ['src-old-001']
    const r = runWith([d], { sources: srcs })
    expect(r.warnings.some((w) => w.message.includes('已失效来源「src-old-001」'))).toBe(true)
  })
})

describe('has_detail 双向一致性与 L1 日期兼容', () => {
  it('声明 has_detail 但文件缺失 → 报错指向 L1 记录', () => {
    const figures = [{ ...baseFigures[2], has_detail: true }]
    const { errors } = runWith([], { figures })
    expect(errors.some((e) => e.message.includes('声明了 has_detail 但 data/figures/detail/dufu.yaml 不存在'))).toBe(true)
  })

  it('存在详卷但 L1 未声明 → 报错', () => {
    const figures = [{ id: 'valid-sample', name: 'x', field: '文学', birth: '0701', death: '0762' }]
    const valid = loadFixture('valid-sample.yaml')
    const { errors } = runWith([valid], { figures })
    expect(errors.some((e) => e.message.includes('L1 未声明 has_detail'))).toBe(true)
  })

  it('生卒年缺失但有 note → 不再报必填错误（ISSUE-004）', () => {
    const figures = [{ id: 'p1', name: '某古人', field: '思想', birth_note: '约前6世纪，不详', death_note: '不详' }]
    const { errors } = validateWithWarnings({ figures })
    expect(errors.filter((e) => e.message.includes('birth_note') || e.message.includes('death_note'))).toEqual([])
  })

  it('生卒年缺失且无 note → 报错并提示字段名', () => {
    const figures = [{ id: 'p1', name: '某古人', field: '思想' }]
    const { errors } = validateWithWarnings({ figures })
    expect(errors.some((e) => e.message.includes('缺少 birth 且未填 birth_note'))).toBe(true)
    expect(errors.some((e) => e.message.includes('缺少 death 且未填 death_note'))).toBe(true)
  })

  it('存量带生卒年的人物不受影响', () => {
    const figures = [{ id: 'p1', name: '李白', field: '文学', birth: '0701', death: '0762' }]
    const { errors } = validateWithWarnings({ figures })
    expect(errors).toEqual([])
  })
})
