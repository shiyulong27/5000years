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
  // 1949, 1951-1959 Key Events
  'cn-prc-founding-ceremony-194910': {
    caption: '1949年10月1日毛泽东主席在天安门城楼宣告中华人民共和国成立',
    category: 'politics'
  },
  'cn-yangtze-crossing-194904': {
    caption: '1949年4月百万雄师过大江，解放军占领南京总统府',
    category: 'military'
  },
  'cn-tibet-peaceful-liberation-195105': {
    caption: '1951年5月《关于和平解放西藏办法的协议》在京签订现场',
    category: 'politics'
  },
  'cn-first-five-year-plan-195301': {
    caption: '新中国“一五计划”全面实施，鞍钢与一汽工业建设热火朝天',
    category: 'economy'
  },
  'cn-korean-armistice-agreement-195307': {
    caption: '1953年7月27日《朝鲜停战协定》在板门店正式签署',
    category: 'military'
  },
  'cn-first-npc-constitution-195409': {
    caption: '第一届全国人民代表大会第一次会议表决通过新中国第一部宪法',
    category: 'politics'
  },
  'cn-bandung-conference-195504': {
    caption: '周恩来总理率中国代表团出席亚非万隆会议并发表演讲',
    category: 'diplomacy'
  },
  'cn-pla-rank-system-195509': {
    caption: '1955年9月中南海举行隆重授衔典礼，毛泽东主席授予朱德等十位元帅军衔',
    category: 'military'
  },
  'cn-three-major-remoulding-195601': {
    caption: '1956年北京各界庆祝资本主义工商业社会主义改造胜利',
    category: 'economy'
  },
  'cn-wuhan-yangtze-bridge-195710': {
    caption: '1957年十月“万里长江第一桥”——武汉长江大桥建成通车',
    category: 'economy'
  },
  'cn-daqing-field-discovery-195909': {
    caption: '1959年9月松辽平原松基三井喜喷工业油流，大庆油田诞生',
    category: 'economy'
  },
  'cn-rong-guotuan-world-champion-195904': {
    caption: '容国团夺得第25届世乒赛男单冠军，实现新中国世界冠军零的突破',
    category: 'sports'
  },
  'w-nato-founded-194904': {
    caption: '1949年4月12国代表在华盛顿签署《北大西洋公约》',
    category: 'diplomacy'
  },
  'w-stalin-death-195303': {
    caption: '1953年3月苏联最高领导人斯大林在莫斯科逝世',
    category: 'politics'
  },
  'w-dna-double-helix-195304': {
    caption: '沃森与克里克构建的 DNA 双螺旋结构示意模型',
    category: 'tech'
  },
  'w-sputnik-1-195710': {
    caption: '1957年10月苏联成功发射人类首颗人造地球卫星 Sputnik 1',
    category: 'space'
  }
}

// Slug generator
function makeSlug(id) {
  return id.replace(/^(?:cn|w)-/, '').replace(/-/g, '_')
}

// 76 Years Range (1949 to 2024)
const years = Array.from({ length: 76 }, (_, i) => String(1949 + i))

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

console.log(`Successfully updated ${updatedXiandai} events in xiandai.yaml and ${updatedModern} events in modern.yaml for 1949-2024!`)
