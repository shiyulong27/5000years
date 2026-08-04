#!/usr/bin/env node
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'
import { loadAll } from '../src/lib/load.js'
import { validate } from '../src/lib/validate.js'

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

const errors = validate(data)

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
console.log(
  `✓ 校验通过：${n(data.events)} 条事件，${n(data.dynasties)} 个朝代，` +
    `${n(data.rulers)} 位君主，${n(data.worldEvents)} 条世界事件，${n(data.civilizations)} 条文明色带`
)
