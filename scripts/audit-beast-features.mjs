import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const beasts = yaml.load(fs.readFileSync('data/shanhaijing/beasts.yaml', 'utf8'))
const myths = yaml.load(fs.readFileSync('data/shanhaijing/myths.yaml', 'utf8'))

console.log('=== 35 种山海经神兽核心特征与图像对应表 ===')
beasts.forEach((b, i) => {
  console.log(`[${i+1}] ${b.name} (${b.book} · ${b.mountain})`)
  console.log(`    形态特征: ${b.appearance}`)
  console.log(`    原文: ${b.original_text.trim()}`)
  console.log(`    图片路径: ${b.image}`)
  console.log(`    文件存在: ${fs.existsSync(path.join(process.cwd(), 'public', b.image))}`)
  console.log('---')
})

console.log('=== 8 大神话史诗 ===')
myths.forEach((m, i) => {
  console.log(`[${i+1}] ${m.title} (${m.book})`)
  console.log(`    图片路径: ${m.image}`)
  console.log(`    文件存在: ${fs.existsSync(path.join(process.cwd(), 'public', m.image))}`)
  console.log('---')
})
