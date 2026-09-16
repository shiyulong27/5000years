import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const beastsPath = path.join(process.cwd(), 'data/shanhaijing/beasts.yaml')
const mythsPath = path.join(process.cwd(), 'data/shanhaijing/myths.yaml')

const beasts = yaml.load(fs.readFileSync(beastsPath, 'utf8'))
const myths = yaml.load(fs.readFileSync(mythsPath, 'utf8'))

for (const b of beasts) {
  const shortId = b.id.replace(/^beast-/, '')
  b.image_refined = `/images/shanhaijing/refined/${shortId}_refined.svg`
  b.image = b.image_refined
}

for (const m of myths) {
  const shortId = m.id.replace(/^myth-/, '')
  const mythKey = shortId === 'jingwei' ? 'jingwei_myth' : shortId
  m.image_refined = `/images/shanhaijing/refined_myths/${mythKey}_refined.svg`
  m.image = m.image_refined
}

fs.writeFileSync(beastsPath, yaml.dump(beasts, { lineWidth: -1 }), 'utf8')
fs.writeFileSync(mythsPath, yaml.dump(myths, { lineWidth: -1 }), 'utf8')
console.log('Successfully updated beasts.yaml and myths.yaml!')
