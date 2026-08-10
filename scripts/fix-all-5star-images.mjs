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
  // 2013 Belt and Road fix
  'cn-belt-and-road-initiation-201309': {
    caption: '首次提出共建“丝绸之路经济带”和“21世纪海上丝绸之路”倡议示意图',
    category: 'diplomacy'
  },
  'cn-shanghai-ftz-open-201309': {
    caption: '中国（上海）自由贸易试验区正式挂牌成立现场',
    category: 'economy'
  },
  'cn-targeted-poverty-alleviation-201311': {
    caption: '首次在湖南十八洞村提出“精准扶贫”重要理念',
    category: 'politics'
  },

  // 2000-2009 Key Events
  'cn-beijing-olympics-200808': {
    caption: '第29届夏季奥林匹克运动会在北京盛大开幕',
    category: 'sports'
  },
  'cn-beijing-olympics-medal-200808': {
    caption: '北京奥运会中国代表团以51枚金牌高居榜首',
    category: 'sports'
  },
  'cn-wenchuan-earthquake-200805': {
    caption: '四川汶川特大地震发生，全国军民同心抗震救灾',
    category: 'disaster'
  },
  'cn-shenzhou7-spacewalk-200809': {
    caption: '航天员翟志刚完成中国首次太空出舱行走',
    category: 'space'
  },
  'cn-cross-strait-three-links-200812': {
    caption: '海峡两岸“大三通”全面实现现场',
    category: 'politics'
  },
  'cn-global-financial-crisis-response-2008': {
    caption: '国务院公布4万亿元扩大内需促进经济平稳增长政策',
    category: 'economy'
  },
  'cn-property-law-200703': {
    caption: '十届全国人大五次会议表决通过《中华人民共和国物权法》',
    category: 'law'
  },
  'cn-harmony-bullet-train-200704': {
    caption: '“和谐号”动车组（CRH）在全国干线正式投入运营',
    category: 'tech'
  },
  'cn-change1-lunar-orbiter-200710': {
    caption: '我国首颗月球探测卫星“嫦娥一号”在西昌发射升空',
    category: 'lunar'
  },
  'cn-cpc-17th-congress-200710': {
    caption: '中国共产党第十七次全国代表大会在北京隆重召开',
    category: 'politics'
  },
  'cn-agricultural-tax-repeal-200601': {
    caption: '全面废止农业税条例，延续2600年的农业税退出历史舞台',
    category: 'economy'
  },
  'cn-shenzhou5-manned-flight-200310': {
    caption: '航天员杨利伟乘神舟五号成功完成中国首次载人航天飞行',
    category: 'space'
  },
  'cn-fight-against-sars-200304': {
    caption: '举国上下同心抗击非典（SARS）与构建公共卫生防控体系',
    category: 'disaster'
  },
  'cn-three-gorges-water-storage-200306': {
    caption: '长江三峡水库正式下闸蓄水与船闸通航',
    category: 'economy'
  },
  'cn-cepa-signed-200306': {
    caption: '《内地与香港关于建立更紧密经贸关系的安排》（CEPA）签署',
    category: 'economy'
  },
  'cn-cpc-16th-congress-200211': {
    caption: '中国共产党第十六次全国代表大会在北京隆重召开',
    category: 'politics'
  },
  'cn-china-world-cup-debut-200206': {
    caption: '中国国家男子足球队首次亮相韩日世界杯决赛圈',
    category: 'sports'
  },
  'cn-wto-accession-signed-200111': {
    caption: '中国正式签署加入世界贸易组织（WTO）议案',
    category: 'economy'
  },
  'cn-beijing-olympic-bid-success-200107': {
    caption: '北京成功赢得2008年第29届夏季奥运会主办权',
    category: 'sports'
  },
  'cn-world-cup-qualification-200110': {
    caption: '国足在沈阳五里河战胜阿曼，首次晋级世界杯决赛圈',
    category: 'sports'
  },
  'cn-hainan-nanhai-collision-200104': {
    caption: '中美南海撞机事件发生，海军飞行员王伟壮烈牺牲',
    category: 'military'
  },
  'cn-shanghai-cooperation-organization-200106': {
    caption: '上海合作组织（SCO）在上海签署成立宣言',
    category: 'diplomacy'
  },
  'cn-apec-shanghai-summit-200110': {
    caption: 'APEC第九次领导人非正式会议在上海成功举行',
    category: 'diplomacy'
  },
  'cn-qinghai-tibet-railway-start-200106': {
    caption: '青藏铁路格尔木至拉萨段工程开工建设现场',
    category: 'tech'
  },
  'cn-new-china-60th-parade-200910': {
    caption: '庆祝中华人民共和国成立60周年大会与天安门阅兵',
    category: 'parade'
  },

  // World Key Events (2000-2009)
  'w-911-attacks-200109': {
    caption: '恐怖分子劫持客机撞击纽约世贸中心与五角大楼（九一一事件）',
    category: 'disaster'
  },
  'w-iphone-launch-200701': {
    caption: '史蒂夫·乔布斯在旧金山正式发布首款 iPhone 智能手机',
    category: 'tech'
  },
  'w-lehman-bankruptcy-200809': {
    caption: '雷曼兄弟破产引发全球金融危机',
    category: 'economy'
  },
  'w-indian-ocean-tsunami-200412': {
    caption: '印度洋发生9.1级特大地震并引发海啸',
    category: 'disaster'
  },
  'w-iraq-war-breaks-out-200303': {
    caption: '美英联军空袭巴格达，伊拉克战争全面爆发',
    category: 'military'
  },
  'w-obama-wins-election-200811': {
    caption: '巴拉克·奥巴马当选美国第44任总统',
    category: 'politics'
  },
  'w-euro-cash-launch-200201': {
    caption: '欧元纸币与硬币在欧洲12国正式投入流通',
    category: 'economy'
  },
  'w-kyoto-protocol-effective-200502': {
    caption: '限制温室气体排放的《京都议定书》正式生效',
    category: 'diplomacy'
  },
  'w-wikipedia-launched-200101': {
    caption: '维基百科（Wikipedia）在互联网正式上线创办',
    category: 'tech'
  }
}

// Slug generator
function makeSlug(id) {
  return id.replace(/^(?:cn|w)-/, '').replace(/-/g, '_')
}

// 25 Years Range (2000 to 2024)
const years = Array.from({ length: 25 }, (_, i) => String(2000 + i))

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

console.log(`Successfully updated ${updatedXiandai} events in xiandai.yaml and ${updatedModern} events in modern.yaml for 2000-2024!`)
