import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import yaml from 'js-yaml'

const ROOT = process.cwd()
const USER_AGENT = 'TenqiuCodexBot/1.0 (annual event image audit; contact: admin@tenqiu.org)'
const MIN_YEAR = Number(process.argv.find((x) => x.startsWith('--min-year='))?.split('=')[1] ?? 1920)
const MAX_YEAR = Number(process.argv.find((x) => x.startsWith('--max-year='))?.split('=')[1] ?? 1948)
const LIMIT = Number(process.argv.find((x) => x.startsWith('--limit='))?.split('=')[1] ?? Infinity)
const DRY_RUN = process.argv.includes('--dry-run')
const API_TIMEOUT_MS = Number(process.argv.find((x) => x.startsWith('--api-timeout-ms='))?.split('=')[1] ?? 8000)
const DOWNLOAD_TIMEOUT_MS = Number(process.argv.find((x) => x.startsWith('--download-timeout-ms='))?.split('=')[1] ?? 10000)
const REMOVE_IMAGE_IDS = process.argv
  .filter((x) => x.startsWith('--remove-image-id='))
  .map((x) => x.split('=')[1])
const SKIP_IDS = new Set(process.argv
  .filter((x) => x.startsWith('--skip-id='))
  .map((x) => x.split('=')[1]))
const rejectByEvent = {
  'w-league-of-nations-founded-192001': [/mandate_Middle_East_and_Africa/i],
  'w-new-economic-policy-192103': [/Intervention.Strategy.Matrix/i],
  'w-egypt-independence-192202': [/Order.of.Independence/i],
  'w-soviet-union-founded-192212': [/1989/i],
  'w-treaty-lausanne-192307': [/Lausanne.Wiki/i],
  'w-beer-hall-putsch-192311': [/medal/i],
  'w-disney-founded-192310': [/Roy.O..Disney/i, /DianeDisney/i, /entrance.gate/i, /poster/i, /press.conference/i],
  'w-turkish-republic-192310': [/Northern Cyprus/i, /President/i, /Aliyev/i],
  'w-balfour-declaration-192611': [/Balfour.declaration.unmarked/i],
  'w-lindbergh-flight-192705': [/1933/i, /cachet/i]
}
const contextualByEvent = {
  'w-league-of-nations-founded-192001': [/The.League.of.Nations.*1927/i],
  'w-new-economic-policy-192103': [/Vladimir.Lenin/i],
  'w-insulin-discovery-192107': [/Macleod/i],
  'w-egypt-independence-192202': [/Anglo.Egyptian.war/i]
}
const forcedByEvent = {
  'w-bbc-founded-192210': 'File:Peter Eckersley, Chief Engineer of the British Broadcasting Company, with microphone, 1925.jpg',
  'w-beer-hall-putsch-192311': 'File:Bundesarchiv Bild 119-1486, Hitler-Putsch, München, Marienplatz.jpg',
  'w-rentenmark-introduced-192311': 'File:500 Rentenmark 1923-11-01.jpg',
  'w-caliphate-abolished-192403': 'File:Abolition of the Caliphate in 1924 as reported in the Times of London, 4 March 1924.jpg',
  'w-surrealist-manifesto-192410': 'File:Edition originale du Manifeste du surréalisme éditée le 15 octobre 1924.png',
  'w-serum-run-nome-192501': 'File:Gunnar Kaasen with Balto.jpg',
  'w-mein-kampf-volume1-192507': 'File:Erstausgabe von Mein Kampf.jpg',
  'w-pahlavi-dynasty-192512': 'File:Reza shah coronation.jpg',
  'w-germany-league-nations-192609': 'File:Bundesarchiv Bild 102-03146, Genf, Aufnahme Deutschlands in den Völkerbund.jpg',
  'w-balfour-declaration-192611': 'File:ImperialConferenceDinner1926.jpg',
  'w-showa-era-begins-192612': 'File:Showa Emperor on horseback cph.3b18305.jpg',
  'w-lindbergh-flight-192705': 'File:Lindbergh dans le Spirit of St Louis, Paris (21 mai 1927) - btv1b53114013x.jpg',
  'w-farnsworth-television-192709': 'File:Farnsworth image dissector tube.jpg',
  'w-solvay-conference-192710': 'File:Solvay conference 1927 Version2.jpg',
  'w-trotsky-expelled-192711': 'File:Trotsky-Annenkov 1922 sketch.jpg',
  'w-kellogg-briand-pact-192808': 'File:Kellogg–Briand Pact (1928).jpg',
  'w-penicillin-discovered-192809': 'File:Synthetic Production of Penicillin TR1468.jpg',
  'w-soviet-first-five-year-plan-192810': 'File:1933. Пятилетний план 1928 год.jpg',
  'w-lateran-treaty-192902': 'File:Group of Vatican and Italian government notables posing at the Lateran Palace before the signing of the treaty.jpg',
  'w-first-academy-awards-192905': 'File:1st Academy Awards Program Cover.jpg',
  'w-geneva-pow-convention-192907': 'File:Geneva Convention of 1929-07-27 (prisoner of war) - CH-BAR - 29357032.pdf',
  'w-great-depression-1929': 'File:Crowd outside nyse.jpg',
  'w-uk-equal-franchise-192807': 'File:Officers and members of National Union of Societies to Equal Citizenship after Royal Assent to the Equal Franchise Act on 2 July 1928.jpg',
  'w-steamboat-willie-192811': 'File:Steamboat Willie (1928) Intertitle.jpg',
  'w-young-plan-192909': 'File:16-9-29, comité Young des biens cédés - btv1b53219670b.jpg',
  'w-pluto-discovered-193002': 'File:Pluto discovery plates.png',
  'w-salt-march-193003': 'File:Gandhi at Dandi 5 April 1930.jpg',
  'w-london-naval-treaty-193004': 'File:Reijiro Wakatsuki at the signing of the London Naval Treaty.jpg',
  'w-smoot-hawley-tariff-193006': 'File:Willis C. Hawley, bw photo portrait, 1923.jpg',
  'w-first-fifa-world-cup-193007': 'File:Uruguay 1930 World Cup.jpg',
  'w-german-federal-election-193009': 'File:1930 Nazi Party federal election poster.jpg',
  'w-spanish-second-republic-193104': 'File:Bundesarchiv Bild 102-11543, Madrid, Ausrufung der Zweiten Spanischen Republik.jpg',
  'w-hoover-moratorium-193106': 'File:President Hoover portrait.jpg',
  'w-manchurian-crisis-193109': 'File:Mukden 1931 japan shenyang.jpg',
  'w-stimson-doctrine-193201': 'File:Henry Lewis Stimson cph.3b21803.jpg',
  'w-chaco-war-begins-193209': 'File:NidoAmetralladora.jpg',
  'w-saudi-arabia-founded-193209': 'File:Ibn Saud.founded Saudi Arabia 1932.jpg',
  'w-roosevelt-elected-193211': 'File:FDR-Campaign-October-24-1932.jpg',
  'w-hitler-chancellor-193301': 'File:Bundesarchiv Bild 183-H28422, Reichskabinett Adolf Hitler.jpg',
  'w-reichstag-fire-193302': 'File:Reichstagsbrand.jpg',
  'w-new-deal-begins-193303': "File:Franklin D. Roosevelt and Herbert Hoover on the way to U.S. Capitol for Roosevelt's inauguration, March 4, 1933.jpg",
  'w-enabling-act-193303': 'File:Enabling act of 1933 printed in the Reich Law Gazette.jpg',
  'w-night-long-knives-193406': 'File:RGBL I 1934 S 0529.png',
  'w-hitler-fuhrer-193408': 'File:RGBL I 1934 S 0747.png',
  'w-ussr-joins-league-193409': 'File:Maxim Litvinov 1932.jpg'
  , 'w-france-falls-194006': 'File:Bundesarchiv B 145 Bild-P50284, Compiègne, Waffenstillstandvertrag, Huntziger.jpg'
  , 'w-gatt-signed-194710': 'File:UN Treaty Series - vol 55.pdf'
}
const captionByEvent = {
  'w-pahlavi-dynasty-192512': '礼萨汗加冕场景历史图像，数字文件来源为1967年伊朗王室出版物；作为巴列维王朝建立的资料图，原始拍摄时间未明确',
  'w-germany-league-nations-192609': '1926年9月11日德国加入国际联盟后，施特雷泽曼率德国代表团离开日内瓦会议场所并接受祝贺',
  'w-balfour-declaration-192611': '1926年10月帝国会议期间，各自治领总理在伦敦兰开斯特宫出席晚宴；该会议形成了贝尔福宣言',
  'w-showa-era-begins-192612': '约1926至1928年的裕仁骑马照片，作为昭和时代开始的人物背景资料；非1926年12月25日即位当天现场',
  'w-lindbergh-flight-192705': '1927年5月21日林德伯格驾驶“圣路易斯精神号”抵达巴黎后的新闻照片',
  'w-farnsworth-television-192709': '法恩斯沃斯1930年设计的早期图像分解器管，作为其1927年电子电视演示的技术背景资料；非1927年演示设备原件',
  'w-solvay-conference-192710': '1927年第五届索尔维会议全体合影，与会者包括爱因斯坦、玻尔、居里、海森堡等物理学家',
  'w-trotsky-expelled-192711': '安年科夫创作的托洛茨基1923年肖像，该版本用于1927年11月《时代》杂志封面；作为托洛茨基被开除出党的同期人物资料',
  'w-kellogg-briand-pact-192808': '1928年8月27日各国代表在巴黎签署《非战公约》，照片中可见施特雷泽曼、凯洛格、白里安等签署人',
  'w-penicillin-discovered-192809': '1943年弗莱明在伦敦圣玛丽医院实验室的照片，作为1928年发现青霉素的科学家与实验环境背景；非发现当天现场',
  'w-soviet-first-five-year-plan-192810': '维克托·捷尼创作的1933年苏联五年计划宣传画，作为1928年启动的第一个五年计划执行期资料；非计划启动现场',
  'w-lateran-treaty-192902': '1929年2月拉特兰条约签署前，梵蒂冈与意大利政府代表在拉特兰宫合影，中央为加斯帕里枢机与墨索里尼',
  'w-first-academy-awards-192905': '1929年5月16日首届奥斯卡金像奖典礼节目封面',
  'w-geneva-pow-convention-192907': '1929年7月27日《关于战俘待遇的日内瓦公约》原文首页，来自瑞士联邦档案馆数字档案',
  'w-great-depression-1929': '1929年10月29日华尔街股灾后，民众聚集在纽约证券交易所外',
  'w-uk-equal-franchise-192807': '1928年7月2日同等选举权法案获御准后，英国平等公民权组织成员合影，照片中包括米利森特·福西特等女性权利活动家',
  'w-steamboat-willie-192811': '《汽船威利号》1929年重映版字幕卡，使用影片中米奇与米妮的原始形象；作为1928年影片资料，非首映现场',
  'w-young-plan-192909': '1929年9月16日杨格计划相关赔款委员会成员在巴黎合影，法国国家图书馆 Rol 通讯社档案',
  'w-pluto-discovered-193002': '克莱德·汤博发现冥王星时使用的1930年原始观测底片，图中标示冥王星在不同日期的位置变化',
  'w-salt-march-193003': '1930年4月5日盐进军抵达丹迪后，甘地在海滩拾取天然盐，身后可见其子马尼拉尔等人',
  'w-london-naval-treaty-193004': '1930年4月22日伦敦海军条约签署仪式上，日本首席全权代表若槻礼次郎就座准备签署',
  'w-smoot-hawley-tariff-193006': '斯姆特-霍利关税法共同发起人、美国众议员威利斯·霍利1923年肖像；作为法案人物背景，非1930年签署现场',
  'w-first-fifa-world-cup-193007': '吉列尔莫·拉博德创作的1930年乌拉圭首届世界杯官方艺术图',
  'w-german-federal-election-193009': '纳粹党为1930年德国国会选举发布的竞选宣传海报，作为该党选票跃升的同期政治宣传资料',
  'w-spanish-second-republic-193104': '1931年4月14日巴塞罗那民众庆祝西班牙第二共和国宣告成立，电车悬挂加泰罗尼亚旗；Commons 文件说明已纠正旧档案标题中的“马德里”误记',
  'w-hoover-moratorium-193106': '胡佛1928年总统肖像，作为其1931年提出暂停战争债务和德国赔款支付倡议的人物背景资料；非倡议发布现场',
  'w-manchurian-crisis-193109': '1931年9月18日九一八事变期间，日军骑兵进入沈阳（奉天）',
  'w-stimson-doctrine-193201': '美国国务卿亨利·史汀生1931年7月肖像，作为其1932年提出不承认以武力改变中国东北现状原则的人物背景资料；非外交照会发布现场',
  'w-chaco-war-begins-193209': '约1932年查科战争期间，巴拉圭士兵操作机枪的阵地照片',
  'w-saudi-arabia-founded-193209': '伊本·沙特1930年致英国海湾事务官员的信函，作为其1932年统一并建立沙特阿拉伯王国的建国前文献背景；非建国公告原件',
  'w-roosevelt-elected-193211': '1932年10月24日美国总统竞选期间，富兰克林·罗斯福与埃莉诺·罗斯福等人在佐治亚州沃姆斯普林斯前往车站途中',
  'w-hitler-chancellor-193301': '1933年1月30日希特勒出任德国总理后，其首届内阁成员在柏林合影',
  'w-reichstag-fire-193302': '1933年2月27日德国国会大厦起火时，消防人员在现场灭火',
  'w-new-deal-begins-193303': '1933年3月4日富兰克林·罗斯福与即将卸任的胡佛乘车前往美国国会大厦参加总统就职典礼；新政随后在百日新政中展开',
  'w-enabling-act-193303': '1933年3月24日刊载于德国《帝国法律公报》的《授权法》文本，法案于前一日由国会通过',
  'w-night-long-knives-193406': '1934年7月3日刊载于德国《帝国法律公报》的“国家自卫法”，以法律形式追认6月30日起的长刀之夜清洗行动；非行动现场照片',
  'w-hitler-fuhrer-193408': '1934年8月2日刊载于德国《帝国法律公报》的国家元首法，规定兴登堡去世后总统职权并入总理职位',
  'w-ussr-joins-league-193409': '苏联外交人民委员李维诺夫1932年出席日内瓦裁军会议时的照片，作为其推动苏联1934年加入国际联盟的人物与外交背景资料；非入会现场'
  , 'w-france-falls-194006': '1940年6月22日法国代表团团长亨齐格在贡比涅签署对德停战协定，法国战役由此结束'
  , 'w-gatt-signed-194710': '《联合国条约汇编》第55卷收录的《关税与贸易总协定》文本资料；协定于1947年10月30日在日内瓦签署'
}
const authorByEvent = {
  'w-spanish-second-republic-193104': 'Unknown photographer / German Federal Archives',
  'w-hoover-moratorium-193106': 'Underwood & Underwood',
  'w-manchurian-crisis-193109': 'Unknown author',
  'w-stimson-doctrine-193201': 'Underwood & Underwood',
  'w-chaco-war-begins-193209': 'Unknown author',
  'w-saudi-arabia-founded-193209': 'Abdulaziz ibn Saud',
  'w-roosevelt-elected-193211': 'FDR Presidential Library & Museum',
  'w-hitler-chancellor-193301': 'Unknown photographer / German Federal Archives',
  'w-reichstag-fire-193302': 'Unknown author',
  'w-new-deal-begins-193303': 'Architect of the Capitol',
  'w-enabling-act-193303': 'German Reich Law Gazette',
  'w-night-long-knives-193406': 'German Reich Law Gazette',
  'w-hitler-fuhrer-193408': 'German Reich Law Gazette / Hitler cabinet',
  'w-ussr-joins-league-193409': 'Georges Devred / Agence Rol'
  , 'w-france-falls-194006': 'Unknown photographer / German Federal Archives'
  , 'w-gatt-signed-194710': 'Secretariat of the United Nations'
}

const DATA_FILES = process.argv.includes('--world-only')
  ? [path.join(ROOT, 'data/world/modern.yaml')]
  : process.argv.includes('--cn-only')
    ? [path.join(ROOT, 'data/events/minguo.yaml')]
    : [
        path.join(ROOT, 'data/events/minguo.yaml'),
        path.join(ROOT, 'data/world/modern.yaml')
      ]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function api(endpoint, params) {
  const url = `${endpoint}?${new URLSearchParams({ ...params, format: 'json', origin: '*' })}`
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS)
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT }, signal: controller.signal }).finally(() => clearTimeout(timeout))
    if (response.ok) return response.json()
    if (response.status !== 429) throw new Error(`${endpoint} HTTP ${response.status}`)
    await sleep(1500 * (attempt + 1))
  }
  throw new Error(`${endpoint} HTTP 429 after retries`)
}

function clean(value, fallback = '') {
  return String(value ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() || fallback
}

function yearOf(event) {
  return Number(String(event.date ?? '').slice(0, 4))
}

function safeSlug(value) {
  return value.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '')
}

function extFrom(info) {
  const mime = info.mime ?? ''
  if (mime.includes('png')) return '.png'
  if (mime.includes('webp')) return '.webp'
  return '.jpg'
}

function imageUrl(info) {
  return info.thumburl || info.url
}

function commonsSource(title) {
  return `https://commons.wikimedia.org/wiki/${encodeURIComponent(title.replaceAll(' ', '_'))}`
}

function titleFromUploadUrl(url) {
  const fileName = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? '')
  if (!fileName) return null
  return `File:${fileName.replace(/^(\d+px-)+/, '')}`
}

function yearTooFar(event, text) {
  const year = yearOf(event)
  const years = (text.match(/(?<!\d)(18\d{2}|19\d{2}|20\d{2})(?!\d)/g) ?? []).map(Number)
  return years.some((value) => Math.abs(value - year) > 20)
}

function symbolOnly(title) {
  return /\b(flag|flags|coat of arms|emblem|seal|logo|map of|location map)\b/i.test(title)
}

function badContextOnly(title) {
  return /\b(memorial|monument|museum|denkmal|anniversary|commemorat|protection sign|site of|exhibition|entrance)\b/i.test(title)
    || /周年|纪念|舊址|旧址|遗址|保護標誌|保护标志|展览|博物馆/.test(title)
}

function symbolEvent(event) {
  return /(founded|establish|independence|republic|state|government|constitution|league|union|bank|nations|organization|organisation|party|congress|assembly|treaty|conference|declaration|charter)/i.test(event.id)
}

function idTokens(event) {
  const stopwords = new Set(['begins', 'begin', 'founded', 'founding', 'effective', 'signed', 'enacted', 'first', 'second', 'battle', 'war', 'event', 'incident', 'conference', 'treaty', 'movement'])
  return event.id
    .replace(/^(cn-|w-)/, '')
    .replace(/-\d{4,8}$/, '')
    .split('-')
    .filter((token) => token.length >= 4 && !stopwords.has(token))
}

function chineseOverlap(event, text) {
  const chineseTokens = `${event.title}${Array.isArray(event.tags) ? event.tags.join('') : ''}`
    .match(/[\u4e00-\u9fff]{2,}/g) ?? []
  return chineseTokens.some((token) => text.includes(token.slice(0, Math.min(6, token.length))))
}

function relevantEnough(event, text) {
  const lower = text.toLowerCase()
  const tokens = idTokens(event)
  const hits = tokens.filter((token) => lower.includes(token)).length
  if (chineseOverlap(event, text)) return true
  if (tokens.length >= 3) return hits >= 3
  return hits >= Math.max(1, tokens.length)
}

function acceptable(event, title, info, articleVerified = false, forced = false) {
  const normalizedTitle = title.replace(/[^\p{L}\p{N}]+/gu, ' ')
  const mime = info.mime ?? ''
  const forcedPdfThumbnail = forced && mime === 'application/pdf' && info.thumburl
  if (!/^image\/(jpeg|png|webp)$/.test(mime) && !forcedPdfThumbnail) return false
  if (badContextOnly(normalizedTitle)) return false
  if ((rejectByEvent[event.id] ?? []).some((pattern) => pattern.test(title))) return false
  if (yearTooFar(event, title)) return false
  if (/founded/.test(event.id) && !new RegExp(`${yearOf(event)}|found|establish|opening`, 'i').test(title)) return false
  if (symbolOnly(normalizedTitle) && !symbolEvent(event)) return false
  const contextualMatch = articleVerified
    && (contextualByEvent[event.id] ?? []).some((pattern) => pattern.test(title))
  if (!forced && !contextualMatch && !relevantEnough(event, title)) return false
  return true
}

async function commonsFileInfo(title, event, articleVerified = false, forced = false) {
  const detail = await api('https://commons.wikimedia.org/w/api.php', {
    action: 'query',
    titles: title,
    prop: 'imageinfo',
    iiprop: 'url|extmetadata|mime',
    iiurlwidth: '1200'
  })
  const page = Object.values(detail?.query?.pages ?? {})[0]
  const info = page?.imageinfo?.[0]
  if (!info || !acceptable(event, title, info, articleVerified, forced)) return null
  const meta = info.extmetadata ?? {}
  const license = clean(meta.LicenseShortName?.value)
  if (!license) return null
  return {
    title,
    url: imageUrl(info),
    ext: extFrom(info),
    source: commonsSource(title),
    author: clean(meta.Artist?.value, 'Wikimedia Commons contributor'),
    license
  }
}

async function findFromWikipedia(event, endpoint, queries) {
  for (const query of queries) {
    const result = await api(endpoint, {
      action: 'query',
      generator: 'search',
      gsrsearch: query,
      gsrlimit: '5',
      prop: 'pageimages|extracts',
      piprop: 'original',
      exintro: '1',
      explaintext: '1'
    })
    const pages = Object.values(result?.query?.pages ?? {})
    for (const page of pages) {
      const text = `${page.title} ${page.extract ?? ''}`
      if (!relevantEnough(event, text)) continue
      const title = page.original?.source ? titleFromUploadUrl(page.original.source) : null
      if (!title) continue
      const found = await commonsFileInfo(title, event, true).catch(() => null)
      if (found) return { ...found, articleTitle: page.title }
    }
    await sleep(150)
  }
  return null
}

async function findFromCommons(event, queries) {
  for (const query of queries) {
    const result = await api('https://commons.wikimedia.org/w/api.php', {
      action: 'query',
      generator: 'search',
      gsrnamespace: '6',
      gsrsearch: query,
      gsrlimit: '12',
      prop: 'imageinfo',
      iiprop: 'url|extmetadata|mime',
      iiurlwidth: '1200'
    })
    const pages = Object.values(result?.query?.pages ?? {})
    for (const page of pages) {
      const title = page.title
      const info = page.imageinfo?.[0]
      if (!info || !acceptable(event, title, info)) continue
      const meta = info.extmetadata ?? {}
      const license = clean(meta.LicenseShortName?.value)
      if (!license) continue
      return {
        title,
        url: imageUrl(info),
        ext: extFrom(info),
        source: commonsSource(title),
        author: clean(meta.Artist?.value, 'Wikimedia Commons contributor'),
        license
      }
    }
    await sleep(150)
  }
  return null
}

function eventQueries(event) {
  const idPhrase = event.id
    .replace(/^(cn-|w-)/, '')
    .replace(/-\d{4,8}$/, '')
    .replaceAll('-', ' ')
  const year = String(event.date).slice(0, 4)
  const base = [event.title, idPhrase, `${idPhrase} ${year}`]
  if (event.id.startsWith('cn-') || event.id === 'cpc-founding-1921' || event.id === 'september-18-incident-1931' || event.id === 'xian-incident-1936' || event.id === 'lugou-bridge-incident-1937' || event.id === 'victory-over-japan-1945') {
    base.push(`${event.title} ${year}`, `${idPhrase} China`)
  }
  return [...new Set(base.filter(Boolean))]
}

async function findImage(event) {
  if (forcedByEvent[event.id]) {
    const forced = await commonsFileInfo(forcedByEvent[event.id], event, false, true).catch(() => null)
    if (forced) return forced
  }
  const queries = eventQueries(event)
  const wikiEndpoint = event.id.startsWith('w-')
    ? 'https://en.wikipedia.org/w/api.php'
    : 'https://zh.wikipedia.org/w/api.php'
  return await findFromWikipedia(event, wikiEndpoint, queries)
    || await findFromWikipedia(event, 'https://en.wikipedia.org/w/api.php', queries)
    || await findFromCommons(event, queries)
}

async function download(url, destination) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT_MS)
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT, Referer: 'https://commons.wikimedia.org/' }, signal: controller.signal }).finally(() => clearTimeout(timeout))
    if (response.ok) {
      const bytes = Buffer.from(await response.arrayBuffer())
      if (bytes.length < 1024) throw new Error('image response too small')
      fs.mkdirSync(path.dirname(destination), { recursive: true })
      fs.writeFileSync(destination, bytes)
      return bytes
    }
    if (response.status !== 429) throw new Error(`image HTTP ${response.status}`)
    await sleep(1500 * (attempt + 1))
  }
  throw new Error('image HTTP 429 after retries')
}

function eventBlocks(raw) {
  const lines = raw.split(/\r?\n/)
  const starts = []
  lines.forEach((line, index) => {
    if (/^- id:\s+/.test(line)) starts.push(index)
  })
  return starts.map((start, index) => ({ start, end: starts[index + 1] ?? lines.length }))
}

function insertImage(raw, id, image) {
  const newline = raw.includes('\r\n') ? '\r\n' : '\n'
  const lines = raw.split(/\r?\n/)
  const block = eventBlocks(raw).find(({ start, end }) => {
    return lines[start] === `- id: ${id}` && !lines.slice(start, end).some((line) => /^  image:/.test(line))
  })
  if (!block) return raw
  lines.splice(block.end, 0,
    '  image:',
    `    url: ${JSON.stringify(image.localUrl)}`,
    `    caption: ${JSON.stringify(image.caption)}`,
    `    source: ${JSON.stringify(image.source)}`,
    `    author: ${JSON.stringify(image.author)}`,
    `    license: ${JSON.stringify(image.license)}`
  )
  return lines.join(newline)
}

function removeImages(raw, ids) {
  if (!ids.length) return raw
  const newline = raw.includes('\r\n') ? '\r\n' : '\n'
  const lines = raw.split(/\r?\n/)
  for (const block of eventBlocks(raw).reverse()) {
    const id = lines[block.start].slice('- id: '.length)
    if (!ids.includes(id)) continue
    const imageStart = lines.slice(block.start, block.end).findIndex((line) => /^  image:/.test(line))
    if (imageStart < 0) continue
    lines.splice(block.start + imageStart, block.end - block.start - imageStart)
  }
  return lines.join(newline)
}

function hasImage(event) {
  return event.image && (typeof event.image === 'string' || event.image.url)
}

function imageCaption(event, found) {
  const fileTitle = found.title
    .replace(/^File:/, '')
    .replace(/\.[^.]+$/, '')
    .replaceAll('_', ' ')
  const context = found.articleTitle ? `维基百科“${found.articleTitle}”条目主图` : 'Wikimedia Commons 相关资料图'
  return `${event.title}相关资料：${fileTitle}（${context}；具体拍摄或制作时间以原始文件页为准）`
}

const usedSources = new Set()
const usedHashes = new Set()

function rememberExistingImages(events) {
  for (const event of events) {
    if (!event.image?.url) continue
    if (event.image.source) usedSources.add(event.image.source)
    const imagePath = path.join(ROOT, 'public', event.image.url.replace(/^\//, ''))
    if (!fs.existsSync(imagePath)) continue
    const hash = crypto.createHash('md5').update(fs.readFileSync(imagePath)).digest('hex')
    usedHashes.add(hash)
  }
}

async function processFile(file) {
  const original = fs.readFileSync(file, 'utf8')
  if (REMOVE_IMAGE_IDS.length) {
    const raw = removeImages(original, REMOVE_IMAGE_IDS)
    if (raw !== original) fs.writeFileSync(file, raw, 'utf8')
    return { file: path.relative(ROOT, file), removed: raw !== original }
  }
  const events = yaml.load(original.replace(/^\uFEFF/, '')) ?? []
  rememberExistingImages(events)
  let raw = original
  const missing = events.filter((event) => {
    const year = yearOf(event)
    return year >= MIN_YEAR && year <= MAX_YEAR && !hasImage(event) && !SKIP_IDS.has(event.id)
  }).slice(0, LIMIT)

  let added = 0
  let missed = 0
  for (const event of missing) {
    try {
      console.log(`TRY ${event.id} | ${event.title}`)
      const found = await findImage(event)
      if (!found || usedSources.has(found.source)) {
        console.log(`MISS ${event.id} | ${event.title}`)
        missed += 1
        continue
      }
      const year = String(event.date).slice(0, 4)
      const filename = `${safeSlug(event.id)}${found.ext}`
      const destination = path.join(ROOT, 'public/images/events', year, filename)
      const localUrl = `/images/events/${year}/${filename}`
      console.log(`${DRY_RUN ? 'DRY' : 'ADD'} ${event.id} | ${found.title}`)
      if (!DRY_RUN) {
        const bytes = await download(found.url, destination)
        const hash = crypto.createHash('md5').update(bytes).digest('hex')
        if (usedHashes.has(hash)) {
          fs.unlinkSync(destination)
          console.log(`MISS ${event.id} | duplicate image hash`)
          missed += 1
          continue
        }
        usedHashes.add(hash)
        usedSources.add(found.source)
        raw = insertImage(raw, event.id, {
          localUrl,
          caption: captionByEvent[event.id] ?? imageCaption(event, found),
          source: found.source,
          author: authorByEvent[event.id] ?? found.author,
          license: found.license
        })
        added += 1
      }
      await sleep(250)
    } catch (error) {
      console.log(`ERROR ${event.id} | ${error.message}`)
      missed += 1
    }
  }

  if (!DRY_RUN && raw !== original) {
    const bom = original.startsWith('\uFEFF') ? '\uFEFF' : ''
    const eol = original.includes('\r\n') ? '\r\n' : '\n'
    fs.writeFileSync(file, bom + raw.replace(/^\uFEFF/, '').replace(/\r?\n/g, eol), 'utf8')
  }
  return { file: path.relative(ROOT, file), checked: missing.length, added, missed }
}

const results = []
for (const file of DATA_FILES) results.push(await processFile(file))
console.log(JSON.stringify(results, null, 2))
