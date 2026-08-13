import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const ROOT = process.cwd()
const xiandai = yaml.load(fs.readFileSync(path.join(ROOT, 'data/events/xiandai.yaml'), 'utf8')) || []
const modern = yaml.load(fs.readFileSync(path.join(ROOT, 'data/world/modern.yaml'), 'utf8')) || []

const cn2021 = xiandai.filter(e => String(e.date).startsWith('2021'))
const w2021 = modern.filter(e => String(e.date).startsWith('2021'))

console.log(`=== 2021 CHINA EVENTS (${cn2021.length}) ===`)
cn2021.forEach((e, i) => {
  console.log(`[${i+1}] [${e.importance}★] ${e.id} (${e.date}) [${e.category}]: ${e.title}`)
})

console.log(`\n=== 2021 WORLD EVENTS (${w2021.length}) ===`)
w2021.forEach((e, i) => {
  console.log(`[${i+1}] [${e.importance}★] ${e.id} (${e.date}) [${e.category}]: ${e.title}`)
})
