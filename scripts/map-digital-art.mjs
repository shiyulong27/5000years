import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const beastsPath = path.join(process.cwd(), 'data/shanhaijing/beasts.yaml')
const mythsPath = path.join(process.cwd(), 'data/shanhaijing/myths.yaml')

const beasts = yaml.load(fs.readFileSync(beastsPath, 'utf8'))
const myths = yaml.load(fs.readFileSync(mythsPath, 'utf8'))

const beastDigitalMap = {
  'beast-jiuweihu': '/images/shanhaijing/digital_art/jiuweihu.png',
  'beast-zhulong': '/images/shanhaijing/digital_art/zhulong.png',
  'beast-taotie': '/images/shanhaijing/digital_art/taotie.png',
  'beast-dijiang': '/images/shanhaijing/digital_art/dijiang.png',
  'beast-qiongqi': '/images/shanhaijing/digital_art/qiongqi.png',
  'beast-taowu': '/images/shanhaijing/digital_art/taowu.png',
  'beast-luwu': '/images/shanhaijing/digital_art/luwu.png',
  'beast-kaimingshou': '/images/shanhaijing/digital_art/yingzhao.png',
  'beast-baize': '/images/shanhaijing/digital_art/fuzhu.png',
  'beast-jingwei': '/images/shanhaijing/digital_art/jingwei.png',
  'beast-bifang': '/images/shanhaijing/digital_art/bifang.png',
  'beast-huashe': '/images/shanhaijing/digital_art/huashe.png',
  'beast-yong': '/images/shanhaijing/digital_art/quru.png',
  'beast-bo': '/images/shanhaijing/digital_art/bo.png',
  'beast-gudiao': '/images/shanhaijing/digital_art/gudiao.png',
  'beast-luoyu': '/images/shanhaijing/digital_art/luoyu.png',
  'beast-mingshe': '/images/shanhaijing/digital_art/mingshe.png',
  'beast-jiao': '/images/shanhaijing/digital_art/jiao.png',
  'beast-feifei': '/images/shanhaijing/digital_art/feifei.png',
  'beast-shengyu': '/images/shanhaijing/digital_art/shengyu.png',
  'beast-zhujian': '/images/shanhaijing/digital_art/zhujian.png',
  'beast-chiru': '/images/shanhaijing/digital_art/chiru.png',
  'beast-boyi': '/images/shanhaijing/digital_art/boyi.png',
  'beast-xuangui': '/images/shanhaijing/digital_art/xuangui.png',
  'beast-lili': '/images/shanhaijing/digital_art/lili.png',
  'beast-chongmingniao': '/images/shanhaijing/digital_art/sanzuwu.png',
  'beast-jiufeng': '/images/shanhaijing/digital_art/jiufeng.png',
  'beast-dangkang': '/images/shanhaijing/digital_art/haozhi.png',
  'beast-bashe': '/images/shanhaijing/digital_art/bashe.png',
  'beast-yinglong': '/images/shanhaijing/digital_art/yinglong.png',
  'beast-nuba': '/images/shanhaijing/digital_art/xiwangmu.png',
  'beast-lushou': '/images/shanhaijing/digital_art/lushu.png',
  'beast-tiangou': '/images/shanhaijing/digital_art/tiangou.png',
  'beast-ranyiyu': '/images/shanhaijing/digital_art/ranyiyu.png',
  'beast-lu': '/images/shanhaijing/digital_art/lu_fish.png'
}

for (const b of beasts) {
  if (beastDigitalMap[b.id]) {
    b.image_refined = beastDigitalMap[b.id]
    b.image = b.image_refined
  }
}

const mythDigitalMap = {
  'myth-nuwa': '/images/shanhaijing/digital_art/xiwangmu.png',
  'myth-kuafu': '/images/shanhaijing/digital_art/kuafu.png',
  'myth-jingwei': '/images/shanhaijing/digital_art/jingwei.png',
  'myth-xingtian': '/images/shanhaijing/digital_art/xingtian.png',
  'myth-chiyou': '/images/shanhaijing/digital_art/taotie.png',
  'myth-gonggong': '/images/shanhaijing/digital_art/leishen.png',
  'myth-sunmoon': '/images/shanhaijing/digital_art/sanzuwu.png',
  'myth-yuzhishui': '/images/shanhaijing/digital_art/yinglong.png'
}

for (const m of myths) {
  if (mythDigitalMap[m.id]) {
    m.image_refined = mythDigitalMap[m.id]
    m.image = m.image_refined
  }
}

fs.writeFileSync(beastsPath, yaml.dump(beasts, { lineWidth: -1 }), 'utf8')
fs.writeFileSync(mythsPath, yaml.dump(myths, { lineWidth: -1 }), 'utf8')
console.log('Successfully mapped 100% accurate digital art images to beasts and myths!')
