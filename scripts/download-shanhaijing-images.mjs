import fs from 'node:fs'
import path from 'node:path'

const beastsDir = path.join(process.cwd(), 'public/images/shanhaijing/beasts')
const mythsDir = path.join(process.cwd(), 'public/images/shanhaijing/myths')
fs.mkdirSync(beastsDir, { recursive: true })
fs.mkdirSync(mythsDir, { recursive: true })

const downloads = [
  { file: 'jiuweihu.png', commons: 'File:南山經-九尾狐.svg', dir: beastsDir },
  { file: 'zhulong.png', commons: 'File:海外北經-燭陰.svg', dir: beastsDir },
  { file: 'taotie.jpg', commons: 'File:Taotie bronsemotiv.jpg', dir: beastsDir },
  { file: 'dijiang.png', commons: 'File:西山經-帝江.svg', dir: beastsDir },
  { file: 'qiongqi.jpg', commons: 'File:Shan Hai Jing Qiongji.jpg', dir: beastsDir },
  { file: 'taowu.jpg', commons: 'File:Wu-Renchen-Shanhai-jing-guangzhu-Kui.jpg', dir: beastsDir },
  { file: 'luwu.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate XLIII.jpg', dir: beastsDir },
  { file: 'kaimingshou.jpg', commons: 'File:Shan Hai Jing Kaimeiju.jpg', dir: beastsDir },
  { file: 'baize.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate XXV (detail).jpg', dir: beastsDir },
  { file: 'jingwei.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate LXI.jpg', dir: beastsDir },
  { file: 'bifang.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate XLIII.jpg', dir: beastsDir },
  { file: 'huashe.jpg', commons: 'File:Shan Hai Jing Hua-She.jpg', dir: beastsDir },
  { file: 'yong.png', commons: 'File:南山經-顒.svg', dir: beastsDir },
  { file: 'bo.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate LXI.jpg', dir: beastsDir },
  { file: 'gudiao.png', commons: 'File:南山經-蠱雕.svg', dir: beastsDir },
  { file: 'luoyu.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate XLIII.jpg', dir: beastsDir },
  { file: 'mingshe.jpg', commons: 'File:Shan Hai Jing Hua-She.jpg', dir: beastsDir },
  { file: 'jiao.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate XLIII.jpg', dir: beastsDir },
  { file: 'feifei.png', commons: 'File:山海經朏朏.png', dir: beastsDir },
  { file: 'shengyu.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate XLIII.jpg', dir: beastsDir },
  { file: 'zhujian.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate LXI.jpg', dir: beastsDir },
  { file: 'chiru.png', commons: 'File:南山經-赤鱬.svg', dir: beastsDir },
  { file: 'boyi.png', commons: 'File:南山經-猼訑.svg', dir: beastsDir },
  { file: 'xuangui.png', commons: 'File:南山經-旋龜.svg', dir: beastsDir },
  { file: 'lili.jpg', commons: 'File:Shahaijing-chongzhen(1628–1644)-nanshanjing1-fol8a-lili-powercat.jpg', dir: beastsDir },
  { file: 'chongmingniao.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate XXV (detail).jpg', dir: beastsDir },
  { file: 'jiufeng.jpg', commons: 'File:Nine-headed phoenix, from a color edition of Shan Hai Jing (crop).jpg', dir: beastsDir },
  { file: 'dangkang.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate XLIII.jpg', dir: beastsDir },
  { file: 'bashe.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate LXI.jpg', dir: beastsDir },
  { file: 'yinglong.jpg', commons: 'File:Shan Hai Jing Yinglong.jpg', dir: beastsDir },
  { file: 'nuba.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate XLIII.jpg', dir: beastsDir },
  { file: 'lushou.png', commons: 'File:南山經-鹿蜀.svg', dir: beastsDir },
  { file: 'tiangou.jpg', commons: 'File:Shan Hai Jing Tiangou.jpg', dir: beastsDir },
  { file: 'ranyiyu.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate XXV (detail).jpg', dir: beastsDir },
  { file: 'lu.png', commons: 'File:南山經-鯥鱼.svg', dir: beastsDir },
  // Myths
  { file: 'nuwa.jpg', commons: 'File:Shanhaijing illustration of Nüwa.jpg', dir: mythsDir },
  { file: 'kuafu.gif', commons: 'File:Kua-fu.gif', dir: mythsDir },
  { file: 'jingwei_myth.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate LXI.jpg', dir: mythsDir },
  { file: 'xingtian.png', commons: 'File:海外西經-刑天.svg', dir: mythsDir },
  { file: 'chiyou.jpg', commons: 'File:Shan Hai Jing Yinglong.jpg', dir: mythsDir },
  { file: 'gonggong.jpg', commons: 'File:Classic of Mountains and Seas, 1597, plate XLIII.jpg', dir: mythsDir },
  { file: 'sunmoon.jpg', commons: 'File:Changxi(deity).jpg', dir: mythsDir },
  { file: 'yuzhishui.jpg', commons: 'File:Zhurong01.jpg', dir: mythsDir }
]

const USER_AGENT = 'TenqiuCodexBot/1.0 (https://tenqiu.org; admin@tenqiu.org)'
const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function run() {
  const titles = Array.from(new Set(downloads.map(d => d.commons)))
  const urlMap = {}

  // 1. 批量查询图片 URL
  for (let i = 0; i < titles.length; i += 20) {
    const chunk = titles.slice(i, i + 20)
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(chunk.join('|'))}&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json`
    const res = await fetch(apiUrl, { headers: { 'User-Agent': USER_AGENT } })
    const json = await res.json()
    for (const k in json.query.pages) {
      const p = json.query.pages[k]
      const info = p.imageinfo?.[0]
      urlMap[p.title] = info?.thumburl || info?.url
    }
    await sleep(500)
  }

  // 2. 逐一平稳下载
  for (const item of downloads) {
    const destPath = path.join(item.dir, item.file)
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 2000) {
      console.log(`✓ [已存在] ${item.file} (${fs.statSync(destPath).size} 字节)`)
      continue
    }

    const imgUrl = urlMap[item.commons]
    if (!imgUrl) {
      console.error(`✗ 无 URL: ${item.commons}`)
      continue
    }

    try {
      const res = await fetch(imgUrl, {
        headers: { 'User-Agent': USER_AGENT }
      })
      if (!res.ok) {
        console.error(`✗ 下载失败 ${item.file}: HTTP ${res.status}`)
        continue
      }
      const buf = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(destPath, buf)
      console.log(`✓ [成功] ${item.file} (${buf.length} 字节)`)
    } catch (e) {
      console.error(`✗ 异常 ${item.file}:`, e.message)
    }
    await sleep(300)
  }

  console.log('🎉 全部山海经古籍插图已就绪！')
}

run().catch(console.error)
