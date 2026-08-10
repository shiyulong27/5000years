import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const ROOT = process.cwd()

const xiandaiPath = path.join(ROOT, 'data/events/xiandai.yaml')
const modernPath = path.join(ROOT, 'data/world/modern.yaml')

const xiandai = yaml.load(fs.readFileSync(xiandaiPath, 'utf8'))
const modern = yaml.load(fs.readFileSync(modernPath, 'utf8'))

// Image catalog & fallbacks per category
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
  economy: '/images/events/2023/saudi_iran_reconciliation.jpg'
}

// Map event IDs to specialized captions and category templates
const specialCaptions = {
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
  'cn-third-plenum-18th-201311': {
    caption: '党的十八届三中全会在北京胜利召开',
    category: 'politics'
  },
  'cn-xijinping-president-201303': {
    caption: '十二届全国人大一次会议表决现场与领导人就职',
    category: 'politics'
  },
  'cn-shenzhou10-space-lecture-201306': {
    caption: '航天员王亚平在天宫一号进行中国首次太空授课',
    category: 'space'
  },
  'cn-national-memorial-day-201402': {
    caption: '设立南京大屠杀死难者国家公祭日仪式现场',
    category: 'politics'
  },
  'cn-russia-gas-deal-201405': {
    caption: '中俄签署4000亿美元天然气购销历史性协议',
    category: 'diplomacy'
  },
  'cn-zhou-yongkang-investigation-201407': {
    caption: '党中央无禁区反腐，全面从严治党',
    category: 'law'
  },
  'cn-fourth-plenum-18th-201410': {
    caption: '党的十八届四中全会审议通过全面推进依法治国决定',
    category: 'law'
  },
  'cn-shanghai-hongkong-stock-connect-201411': {
    caption: '“沪港通”股票交易互联互通机制正式启动',
    category: 'economy'
  },
  'cn-aiib-agreement-signed-201506': {
    caption: '57个意向创始成员国代表在北京签署亚投行协定',
    category: 'diplomacy'
  },
  'cn-beijing-winters-olympics-bid-201507': {
    caption: '北京获得2022年第二十四届冬季奥林匹克运动会举办权',
    category: 'diplomacy'
  },
  'cn-fifth-plenum-18th-two-child-201510': {
    caption: '党的十八届五中全会决定全面实施“全面两孩”政策',
    category: 'politics'
  },
  'cn-c919-rollout-201511': {
    caption: '中国首架大型客机C919在上海总装下线',
    category: 'tech'
  },
  'cn-xi-ma-meeting-201511': {
    caption: '两岸领导人在新加坡举行历史性会面',
    category: 'diplomacy'
  },
  'cn-rmb-sdr-basket-201511': {
    caption: '国际货币基金组织宣布人民币加入SDR特别提款权货币篮子',
    category: 'economy'
  },
  'cn-pla-rocket-force-established-201512': {
    caption: '中国人民解放军陆军领导机构、火箭军、战略支援部队成立授旗',
    category: 'military'
  },
  'cn-two-child-policy-enforced-201601': {
    caption: '新修订人口与计划生育法实施，全面两孩政策正式落地',
    category: 'law'
  },
  'cn-south-china-sea-arbitration-201607': {
    caption: '中国政府发表关于在南海的主权和权益声明',
    category: 'diplomacy'
  },
  'cn-micius-quantum-satellite-201608': {
    caption: '世界首颗量子科学实验卫星“墨子号”成功发射',
    category: 'tech'
  },
  'cn-women-volleyball-gold-201608': {
    caption: '中国女排在里约奥运会勇夺金牌，重登奥运之巅',
    category: 'diplomacy'
  },
  'cn-tiangong2-space-lab-201609': {
    caption: '中国空间实验室“天宫二号”成功发射',
    category: 'space'
  },
  'cn-sixth-plenum-18th-core-201610': {
    caption: '党的十八届六中全会在北京举行',
    category: 'politics'
  },
  'cn-long-march-5-maiden-flight-201611': {
    caption: '中国最大运载火箭“长征五号”在文昌成功首飞',
    category: 'space'
  },
  'cn-tianzhou1-cargo-ship-201704': {
    caption: '中国首艘货运飞船“天舟一号”成功发射',
    category: 'space'
  },
  'cn-shandong-aircraft-carrier-launch-201704': {
    caption: '中国首艘国产航空母舰在大连造船厂成功下水',
    category: 'military'
  },
  'cn-belt-and-road-forum-201705': {
    caption: '第一届“一带一路”国际合作高峰论坛在北京举行',
    category: 'diplomacy'
  },
  'cn-fuxing-emu-debut-201706': {
    caption: '“复兴号”中国标准动车组在京沪高铁双向首发',
    category: 'tech'
  },
  'cn-zhurihe-parade-201707': {
    caption: '庆祝中国人民解放军建军90周年沙场阅兵在朱日和举行',
    category: 'military'
  },
  'cn-constitution-amendment-201803': {
    caption: '十三届全国人大一次会议表决通过宪法修正案',
    category: 'law'
  },
  'cn-us-china-trade-war-begins-201803': {
    caption: '中美贸易摩擦爆发，中国出台关税反制措施',
    category: 'economy'
  },
  'cn-hainan-free-trade-port-201804': {
    caption: '支持海南全岛建设自由贸易试验区与中国特色自由贸易港',
    category: 'economy'
  },
  'cn-meng-wanzhou-detention-201812': {
    caption: '中国政府就孟晚舟被无理拘押展开坚决外交交涉',
    category: 'diplomacy'
  },
  'cn-change4-launch-201812': {
    caption: '长征三号乙火箭成功将嫦娥四号送入预定轨道',
    category: 'space'
  },
  'cn-foreign-investment-law-201903': {
    caption: '十三届全国人大二次会议表决通过《外商投资法》',
    category: 'law'
  },
  'cn-second-belt-road-forum-201904': {
    caption: '第二届“一带一路”国际合作高峰论坛在北京成功举行',
    category: 'diplomacy'
  },
  'cn-fourth-plenum-19th-201910': {
    caption: '党的十九届四中全会在北京胜利召开',
    category: 'politics'
  },
  'cn-long-march-5-cz5-flight3-201912': {
    caption: '长征五号遥三运载火箭在海南文昌发射成功，胖五成功复飞',
    category: 'space'
  },
  'cn-gdp-99trillion-201912': {
    caption: '中国GDP逼近100万亿元，人均GDP突破1万美元',
    category: 'economy'
  },
  'cn-hk-national-security-law-202006': {
    caption: '十三届全国人大常委会表决通过香港国安法',
    category: 'law'
  },
  'cn-fifth-plenum-202010': {
    caption: '党的十九届五中全会在北京胜利召开',
    category: 'politics'
  },
  'cn-poverty-alleviation-202011': {
    caption: '全国832个贫困县全部脱贫摘帽，扶贫攻坚取得决定性胜利',
    category: 'politics'
  },
  'cn-economy-positive-202012': {
    caption: '2020年中国GDP突破100万亿元，成为全球唯一实现正增长的主要经济体',
    category: 'economy'
  },
  'cn-poverty-victory-202102': {
    caption: '全国脱贫攻坚总结表彰大会在北京隆重举行',
    category: 'politics'
  },
  'cn-hk-electoral-reform-202103': {
    caption: '全国人大通过关于完善香港特别行政区选举制度的决定',
    category: 'law'
  },
  'cn-sixth-plenum-resolution-202111': {
    caption: '党的十九届六中全会审议通过第三个历史决议',
    category: 'politics'
  },
  'cn-hk-25th-anniversary-202207': {
    caption: '庆祝香港回归祖国25周年大会在香港举行',
    category: 'politics'
  },
  'cn-taiwan-countermeasures-202208': {
    caption: '东部战区在台岛周边组织联合军事行动',
    category: 'military'
  },
  'cn-20th-cpc-congress-202210': {
    caption: '中国共产党第二十次全国代表大会在北京隆重召开',
    category: 'politics'
  },
  'cn-jiang-zemin-pass-202211': {
    caption: '沉痛悼念江泽民同志悼念大会在人民大会堂举行',
    category: 'politics'
  },
  'cn-covid-new-10-rules-202212': {
    caption: '国务院联防联控机制发布优化调整疫情防控“新十条”',
    category: 'disaster'
  }
}

// Helper to make image slug
function makeSlug(id) {
  return id.replace(/^(?:cn|w)-/, '').replace(/-/g, '_')
}

// Process xiandai.yaml
const years = Array.from({ length: 15 }, (_, i) => String(2010 + i))

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

    const info = specialCaptions[e.id] || {
      caption: `${e.title}历史现场与典藏影像`,
      category: 'politics'
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

// Process modern.yaml
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

    const info = {
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

console.log(`Successfully updated ${updatedXiandai} events in xiandai.yaml and ${updatedModern} events in modern.yaml!`)
