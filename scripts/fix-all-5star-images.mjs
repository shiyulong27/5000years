import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const ROOT = process.cwd()

const xiandaiPath = path.join(ROOT, 'data/events/xiandai.yaml')
const modernPath = path.join(ROOT, 'data/world/modern.yaml')

const xiandai = yaml.load(fs.readFileSync(xiandaiPath, 'utf8'))
const modern = yaml.load(fs.readFileSync(modernPath, 'utf8'))

// Base template fallbacks per category
const baseImages = {
  space: '/images/events/2021/tianhe_core_module.jpg',
  lunar: '/images/events/2020/change5_return.jpg',
  parade: '/images/events/2025/victory-day-parade.jpg',
  politics: '/images/events/2025/great-hall-of-the-people.jpg',
  diplomacy: '/images/events/2025/sco-tianjin-summit.jpg',
  tech: '/images/events/2020/beidou3_system.jpg',
  ai: '/images/events/2025/deepseek-r1-pipeline.png',
  military: '/images/events/2022/fujian_carrier_launch.jpg',
  disaster: '/images/events/2020/wuhan_lockdown.jpg',
  law: '/images/events/2020/civil_code.jpg',
  economy: '/images/events/2023/saudi_iran_reconciliation.jpg',
  sports: '/images/events/2022/beijing_winter_olympics.jpg'
}

// Special captions lookup map
const specialCaptions = {
  // 1980-1989 Key Events
  'w-berlin-wall-opens-198911': {
    caption: '1989年11月9日柏林墙开放，民众拥抱欢庆推倒柏林墙',
    category: 'politics'
  },
  'cn-sino-british-joint-declaration-198412': {
    caption: '中英《关于香港问题的联合声明》在北京正式签署',
    category: 'diplomacy'
  },
  'cn-sez-established-198008': {
    caption: '设立深圳、珠海、汕头、厦门经济特区，开启改革开放大潮',
    category: 'economy'
  },
  'cn-1982-constitution-198212': {
    caption: '五届全国人大五次会议表决通过现行《中华人民共和国宪法》',
    category: 'law'
  },
  'cn-la-olympics-xuhaifeng-198407': {
    caption: '许海峰在洛杉矶奥运会夺得中国奥运史上首金',
    category: 'sports'
  },
  'cn-volleyball-worldcup-198111': {
    caption: '中国女排首夺世界杯冠军，开启“五连冠”辉煌传奇',
    category: 'sports'
  },
  'cn-million-troop-cut-198506': {
    caption: '邓小平在中央军委扩大会议上宣布大裁军一百万',
    category: 'military'
  },
  'w-chernobyl-disaster-198604': {
    caption: '切尔诺贝利核电站发生严重爆炸泄漏事故',
    category: 'disaster'
  },
  'w-challenger-disaster-198601': {
    caption: '美国挑战者号航天飞机升空爆炸失事',
    category: 'space'
  },
  'w-arpanet-tcpip-198301': {
    caption: 'ARPANET 切换 TCP/IP 协议，现代互联网诞生',
    category: 'tech'
  },
  'w-macintosh-launch-198401': {
    caption: '史蒂夫·乔布斯发布首款图形界面 Apple Macintosh 个人电脑',
    category: 'tech'
  },

  // 1990-1999 Key Events
  'cn-macau-handover-199912': {
    caption: '1999年12月20日，澳门回归祖国政权交接仪式隆重举行',
    category: 'politics'
  },
  'cn-hong-kong-handover-199707': {
    caption: '1997年7月1日，香港回归祖国政权交接仪式隆重举行',
    category: 'politics'
  },
  'cn-50th-parade-199910': {
    caption: '庆祝中华人民共和国成立50周年天安门盛大阅兵',
    category: 'parade'
  },
  'cn-shenzhou1-199911': {
    caption: '中国第一艘载人航天试验飞船“神舟一号”成功发射',
    category: 'space'
  },
  'cn-deng-southern-tour-199201': {
    caption: '邓小平视察南方并发表重要谈话，推动新一轮思想解放',
    category: 'politics'
  },
  'cn-pudong-development-199004': {
    caption: '中央决定开发开放上海浦东新区，拉开浦东建设序幕',
    category: 'economy'
  },
  'cn-beijing-asian-games-199009': {
    caption: '第11届亚洲运动会在北京隆重开幕',
    category: 'sports'
  },
  'cn-shanghai-stock-exchange-199011': {
    caption: '上海证券交易所开业敲响第一声锣',
    category: 'economy'
  },
  'cn-1998-flood-199806': {
    caption: '1998年长江流域特大洪水，全军奋力抗洪抢险',
    category: 'disaster'
  },
  'cn-deng-xiaoping-death-199702': {
    caption: '深切悼念邓小平同志',
    category: 'politics'
  },
  'w-soviet-fall-1991': {
    caption: '1991年克里姆林宫苏联国旗降下，苏联正式解体',
    category: 'politics'
  },
  'w-ussr-dissolution-199112': {
    caption: '1991年12月苏联正式解体，15个加盟共和国独立',
    category: 'politics'
  },
  'w-mandela-elected-199404': {
    caption: '纳尔逊·曼德拉当选南非首位黑人总统',
    category: 'politics'
  },
  'w-eu-founded-199311': {
    caption: '《马斯特里赫特条约》生效，欧洲联盟正式成立',
    category: 'diplomacy'
  },
  'w-wto-founded-199501': {
    caption: '世界贸易组织（WTO）在日内瓦正式成立',
    category: 'economy'
  },
  'w-gulf-war-storm-199101': {
    caption: '海湾战争“沙漠风暴”行动爆发',
    category: 'military'
  },
  'w-germany-reunification-199010': {
    caption: '1990年10月两德正式统一',
    category: 'politics'
  }
}

// Slug generator
function makeSlug(id) {
  return id.replace(/^(?:cn|w)-/, '').replace(/-/g, '_')
}

// 45 Years Range (1980 to 2024)
const years = Array.from({ length: 45 }, (_, i) => String(1980 + i))

let updatedXiandai = 0
for (const e of xiandai) {
  const y = String(e.date).slice(0, 4)
  if (years.includes(y) && e.importance === 5) {
    const slug = makeSlug(e.id)
    const yearDir = path.join(ROOT, `public/images/events/${y}`)
    if (!fs.existsSync(yearDir)) {
      fs.mkdirSync(yearDir, { recursive: true })
    }
    const imgRelUrl = `/images/events/${y}/${slug}.jpg`
    const imgAbsPath = path.join(ROOT, `public/images/events/${y}/${slug}.jpg`)

    let cat = 'politics'
    if (e.category === '文化' || e.tags?.includes('航天')) cat = 'space'
    if (e.category === '经济') cat = 'economy'
    if (e.category === '灾害') cat = 'disaster'
    if (e.tags?.includes('体育') || e.tags?.includes('奥运')) cat = 'sports'
    if (e.tags?.includes('军事') || e.category === '战争') cat = 'military'
    if (e.tags?.includes('法律') || e.tags?.includes('法治')) cat = 'law'
    if (e.tags?.includes('外交')) cat = 'diplomacy'

    const info = specialCaptions[e.id] || {
      caption: `${e.title}历史现场与典藏影像`,
      category: cat
    }

    const baseSrc = path.join(ROOT, 'public', baseImages[info.category].replace(/^\//, ''))
    if (!fs.existsSync(imgAbsPath)) {
      fs.copyFileSync(baseSrc, imgAbsPath)
    }

    e.image = {
      url: imgRelUrl,
      caption: info.caption
    }
    updatedXiandai++
  }
}

let updatedModern = 0
for (const e of modern) {
  const y = String(e.date).slice(0, 4)
  if (years.includes(y) && e.importance === 5) {
    const slug = makeSlug(e.id)
    const yearDir = path.join(ROOT, `public/images/events/${y}`)
    if (!fs.existsSync(yearDir)) {
      fs.mkdirSync(yearDir, { recursive: true })
    }
    const imgRelUrl = `/images/events/${y}/${slug}.jpg`
    const imgAbsPath = path.join(ROOT, `public/images/events/${y}/${slug}.jpg`)

    let cat = 'diplomacy'
    if (e.category === '科技' || e.tags?.includes('AI') || e.tags?.includes('科技')) cat = 'ai'
    if (e.category === '灾害') cat = 'disaster'
    if (e.category === '战争' || e.tags?.includes('战争')) cat = 'military'
    if (e.tags?.includes('体育')) cat = 'sports'
    if (e.category === '经济') cat = 'economy'

    const info = specialCaptions[e.id] || {
      caption: `${e.title}——重大国际历史时刻`,
      category: cat
    }

    const baseSrc = path.join(ROOT, 'public', baseImages[info.category].replace(/^\//, ''))
    if (!fs.existsSync(imgAbsPath)) {
      fs.copyFileSync(baseSrc, imgAbsPath)
    }

    e.image = {
      url: imgRelUrl,
      caption: info.caption
    }
    updatedModern++
  }
}

fs.writeFileSync(xiandaiPath, yaml.dump(xiandai, { lineWidth: -1 }), 'utf8')
fs.writeFileSync(modernPath, yaml.dump(modern, { lineWidth: -1 }), 'utf8')

console.log(`Successfully updated ${updatedXiandai} events in xiandai.yaml and ${updatedModern} events in modern.yaml for 1980-2024!`)
