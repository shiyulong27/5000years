#!/usr/bin/env node
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'
import { loadAll } from '../src/lib/load.js'
import { validateWithWarnings } from '../src/lib/validate.js'

/**
 * 数据校验入口。构建与 CI 均先跑此脚本，不通过则中止，绝不发布错误页面。
 */

const dataDir = fileURLToPath(new URL('../data', import.meta.url))

if (!existsSync(dataDir)) {
  console.error('✗ 未找到 data/ 目录')
  process.exit(1)
}

let data
try {
  data = loadAll(dataDir)
} catch (e) {
  console.error(`✗ 读取数据失败：${e.message}`)
  process.exit(1)
}

const { errors, warnings } = validateWithWarnings(data)

// 警告先打印，不影响退出码——史料缺失、有意只录代表性君主都会触发，
// 值得看一眼但不该中止构建。
for (const w of warnings) {
  console.warn(`⚠ data/${w.file}:${w.line}`)
  console.warn(`  ${w.message}`)
  console.warn('')
}

if (errors.length > 0) {
  for (const e of errors) {
    console.error(`✗ data/${e.file}:${e.line}`)
    console.error(`  ${e.message}`)
    console.error('')
  }
  console.error(`共 ${errors.length} 处错误`)
  process.exit(1)
}

const n = (arr) => arr.length
const warnNote = warnings.length > 0 ? `（另有 ${warnings.length} 条提示）` : ''
console.log(
  `✓ 校验通过：${n(data.events)} 条事件，${n(data.dynasties)} 个朝代，` +
    `${n(data.rulers)} 位君主，${n(data.worldEvents)} 条世界事件，${n(data.civilizations)} 条文明色带，` +
    `${n(data.legends)} 条传说人物，${n(data.figures)} 位人物，` +
    `${n(data.figureDetails)} 卷人物详卷，${n(data.sources)} 条来源登记${warnNote}`
)
