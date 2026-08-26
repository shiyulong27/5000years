import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import yaml from 'js-yaml'

/**
 * YAML 加载层。
 *
 * 每条记录附带其源位置（文件 + 行号），存于不可枚举的 Symbol 属性上——
 * 校验器的报错必须指向具体文件与行号，而作者将长期手工编辑数千条 YAML，
 * 错误定位的精确度直接决定这件事是否可持续。
 *
 * 用 Symbol 而非普通字段，是为了不污染数据本身：位置信息不会出现在
 * Object.keys 中，也不会被 JSON.stringify 序列化进构建产物。
 */

const LOC = Symbol('loc')

/**
 * 解析单个 YAML 文件，为顶层数组的每一项附加源位置。
 *
 * 行号由扫描源文本得出：顶层数组项必以列 0 的「-」起始，块标量的内容
 * 一律缩进，故不会误匹配。这比 js-yaml 的 listener 可靠——listener 的
 * close 事件给的是节点结束行，而报错需要的是起始行。
 *
 * 若扫描出的行数与解析出的条数不符（如采用了流式写法 [{...}]），
 * 则不附加位置，宁可缺失也不给出错误的行号。
 */
function parseWithLoc(text, fileLabel) {
  const docs = yaml.load(text, { filename: fileLabel })
  if (docs == null) return []
  if (!Array.isArray(docs)) {
    throw new Error(`${fileLabel}：顶层须为数组，实际为 ${typeof docs}`)
  }

  const starts = []
  const lines = text.split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    if (/^-(\s|$)/.test(lines[i])) starts.push(i + 1)
  }

  if (starts.length === docs.length) {
    for (let i = 0; i < docs.length; i++) {
      const item = docs[i]
      if (item === null || typeof item !== 'object') continue
      Object.defineProperty(item, LOC, {
        value: { file: fileLabel, line: starts[i] },
        enumerable: false,
        writable: false,
        configurable: false,
      })
    }
  }

  return docs
}

/** 读取单个文件；不存在则返回空数组 */
function loadFile(dir, name) {
  const path = join(dir, name)
  if (!existsSync(path)) return []
  return parseWithLoc(readFileSync(path, 'utf8'), name)
}

/**
 * 解析单对象 YAML 文件（人物详卷、来源注册表等一文件一条记录的形状）。
 *
 * 与顶层数组的 parseWithLoc 相对：详卷每文件只描述一位人物，包一层
 * 数组只会徒增噪音。行号取首个非空非注释行——报错定位到文件级已够用，
 * 条目级错误由校验器在 message 中携带条目路径（如 works[2].context）。
 */
function parseSingleWithLoc(text, fileLabel) {
  const doc = yaml.load(text, { filename: fileLabel })
  if (doc == null) return null
  if (typeof doc !== 'object' || Array.isArray(doc)) {
    throw new Error(`${fileLabel}：顶层须为单个对象，实际为 ${Array.isArray(doc) ? '数组' : typeof doc}`)
  }

  let line = 1
  const lines = text.split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim()
    if (t !== '' && !t.startsWith('#')) {
      line = i + 1
      break
    }
  }
  Object.defineProperty(doc, LOC, {
    value: { file: fileLabel, line },
    enumerable: false,
    writable: false,
    configurable: false,
  })
  return doc
}

/**
 * 读取目录下所有 .yaml 单对象文件，返回对象数组（附各自源位置）。
 * 文件名即记录 id 的命名约定由校验器负责核对，加载层不做假设。
 */
function loadSingleDir(baseDir, subDir) {
  const dir = join(baseDir, subDir)
  if (!existsSync(dir)) return []

  const out = []
  for (const name of readdirSync(dir).sort()) {
    if (!name.endsWith('.yaml') && !name.endsWith('.yml')) continue
    const doc = parseSingleWithLoc(readFileSync(join(dir, name), 'utf8'), `${subDir}/${name}`)
    if (doc !== null) out.push(doc)
  }
  return out
}

/**
 * 读取目录下所有 .yaml 文件并合并。
 *
 * 文件名不参与任何解析逻辑，仅供人工归档之便——事件归属哪个朝代
 * 由其 date 与 dynasties.yaml 的区间比对决定。因此近现代等不便按
 * 朝代切分的时段，可自由采用 modern-1931-1945.yaml 这类命名。
 */
function loadDir(baseDir, subDir) {
  const dir = join(baseDir, subDir)
  if (!existsSync(dir)) return []

  const out = []
  for (const name of readdirSync(dir).sort()) {
    if (!name.endsWith('.yaml') && !name.endsWith('.yml')) continue
    const label = `${subDir}/${name}`
    out.push(...parseWithLoc(readFileSync(join(dir, name), 'utf8'), label))
  }
  return out
}

/**
 * 读取整个数据目录。
 * @param {string} dataDir
 * @returns {{dynasties: object[], rulers: object[], polities: object[], events: object[],
 *            worldEvents: object[], civilizations: object[], figures: object[], legends: object[],
 *            figureDetails: object[], sources: object[]}}
 */
export function loadAll(dataDir) {
  return {
    dynasties: loadFile(dataDir, 'dynasties.yaml'),
    civilizations: loadFile(dataDir, 'civilizations.yaml'),
    figures: loadFile(dataDir, 'figures.yaml'),
    legends: loadDir(dataDir, 'legends'),
    rulers: loadDir(dataDir, 'rulers'),
    events: loadDir(dataDir, 'events'),
    worldEvents: loadDir(dataDir, 'world'),
    figureDetails: loadSingleDir(dataDir, 'figures/detail'),
    sources: loadFile(dataDir, 'sources.yaml'),
  }
}

/**
 * 取记录的源位置。
 * @param {object} record
 * @returns {{file: string, line: number}|null}
 */
export function locOf(record) {
  return record?.[LOC] ?? null
}

/**
 * 为程序化构造的记录附加源位置。
 *
 * 测试夹具经 js-yaml 直接解析时没有经过加载层，报错会落到「(未知):0」；
 * 校验器测试用本函数补上位置信息，使断言能核对错误指向的文件。
 */
export function withLoc(record, file, line = 1) {
  Object.defineProperty(record, LOC, {
    value: { file, line },
    enumerable: false,
    writable: false,
    configurable: false,
  })
  return record
}
