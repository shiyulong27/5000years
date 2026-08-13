import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'
import yaml from 'js-yaml'

const ROOT = process.cwd()
const xiandaiPath = path.join(ROOT, 'data/events/xiandai.yaml')
const modernPath = path.join(ROOT, 'data/world/modern.yaml')

const xiandai = yaml.load(fs.readFileSync(xiandaiPath, 'utf8'))
const modern = yaml.load(fs.readFileSync(modernPath, 'utf8'))

const photoTargets = [
  {
    id: 'cn-beijing-olympics-202202',
    year: '2022',
    filename: 'beijing_winter_olympics_2022.jpg',
    commonsTitle: 'File:Beijing national stadium.jpg',
    caption: '2022年2月4日北京2022年冬奥会成功举办，北京成为全球首个双奥之城（图为国家体育场“鸟巢”实景）',
    isChina: true
  },
  {
    id: 'cn-jiang-zemin-pass-202211',
    year: '2022',
    filename: 'jiang_zemin_memorial_2022.jpg',
    commonsTitle: 'File:Jiang Zemin 2002.jpg',
    caption: '2022年11月30日江泽民同志逝世，享年96岁，全国各界沉痛悼念（图为江泽民同志历史肖像）',
    isChina: true
  },
  {
    id: 'cn-space-station-complete-202212',
    year: '2022',
    filename: 'space_station_complete_2022.jpg',
    commonsTitle: 'File:Chinese Tiangong Space Station.jpg',
    caption: '2022年12月中国空间站“T”字基本构型在轨组装完成，国家太空实验室全面建成（图为中国天宫空间站）',
    isChina: true
  },
  {
    id: 'w-rcep-enforcement-202201',
    year: '2022',
    filename: 'rcep_enforcement_2022.jpg',
    commonsTitle: 'File:2017 RCEP Leaders’ Meeting (5).jpg',
    caption: '2022年1月1日《区域全面经济伙伴关系协定》（RCEP）正式生效，覆盖全球30%人口的全球最大自贸区开启（图为RCEP领导人会议现场）',
    isChina: false
  },
  {
    id: 'w-shinzo-abe-assassinated-202207',
    year: '2022',
    filename: 'shinzo_abe_2022.jpg',
    commonsTitle: 'File:Shinzō Abe 20200101.jpg',
    caption: '2022年7月8日日本前首相安倍晋三在奈良街头发表演讲时遇刺身亡，引发日本与全球政坛震动（图为安倍晋三生前肖像）',
    isChina: false
  },
  {
    id: 'w-nord-stream-sabotage-202209',
    year: '2022',
    filename: 'nord_stream_sabotage_2022.jpg',
    commonsTitle: 'File:Nord Stream gas leaks 2022.svg',
    caption: '2022年9月26日“北溪-1”与“北溪-2”天然气管道发生蓄意爆炸泄露，彻底切断俄欧天然气纽带（图为北溪管道泄露示意图）',
    isChina: false
  }
]

function getJson(apiUrl) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'TenqiuCodexBot/1.0 (contact: admin@tenqiu.org)'
      }
    }
    https.get(apiUrl, options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(e)
        }
      })
    }).on('error', reject)
  })
}

function downloadFile(fileUrl, destPath) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'TenqiuCodexBot/1.0 (contact: admin@tenqiu.org)'
      }
    }
    https.get(fileUrl, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${fileUrl}' (status code: ${res.statusCode})`))
      }
      const fileStream = fs.createWriteStream(destPath)
      res.pipe(fileStream)
      fileStream.on('finish', () => {
        fileStream.close(resolve)
      })
      fileStream.on('error', reject)
    }).on('error', reject)
  })
}

async function run() {
  console.log('Fetching real Commons photo files for 2022 5-star events...')
  for (const item of photoTargets) {
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(item.commonsTitle)}&prop=imageinfo&iiprop=url&format=json`
    try {
      const json = await getJson(apiUrl)
      const pages = json.query.pages
      const pageKey = Object.keys(pages)[0]
      const imageUrl = pages[pageKey]?.imageinfo?.[0]?.url
      if (imageUrl) {
        console.log(`Found Commons URL for ${item.id}: ${imageUrl}`)
        const imgDir = path.join(ROOT, 'public/images/events', item.year)
        if (!fs.existsSync(imgDir)) {
          fs.mkdirSync(imgDir, { recursive: true })
        }
        const destPath = path.join(imgDir, item.filename)
        await downloadFile(imageUrl, destPath)
        console.log(`Saved photo to ${destPath}`)

        const targetList = item.isChina ? xiandai : modern
        const event = targetList.find(e => e.id === item.id)
        if (event) {
          event.image = {
            url: `/images/events/${item.year}/${item.filename}`,
            caption: item.caption
          }
        }
      } else {
        console.log(`No image URL returned for ${item.commonsTitle}`)
      }
    } catch (e) {
      console.error(`Error querying Commons for ${item.id}:`, e.message)
    }
  }

  fs.writeFileSync(xiandaiPath, yaml.dump(xiandai, { lineWidth: -1 }), 'utf8')
  fs.writeFileSync(modernPath, yaml.dump(modern, { lineWidth: -1 }), 'utf8')
  console.log('Successfully completed 2022 5-star event photo downloads!')
}

run().catch(console.error)
