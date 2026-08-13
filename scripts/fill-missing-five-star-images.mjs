import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const ROOT = process.cwd()
const files = [
  path.join(ROOT, 'data/events/xiandai.yaml'),
  path.join(ROOT, 'data/world/modern.yaml')
]
const limit = Number(process.argv.find((x) => x.startsWith('--limit='))?.split('=')[1] ?? 20)
const minYear = Number(process.argv.find((x) => x.startsWith('--min-year='))?.split('=')[1] ?? 1949)
const maxYear = Number(process.argv.find((x) => x.startsWith('--max-year='))?.split('=')[1] ?? 2023)
const dryRun = process.argv.includes('--dry-run')
const rejectedIds = new Set([
  'cn-campaign-suppress-counterrevolutionaries-195010',
  'cn-four-modernizations-196501',
  'cn-sino-vietnamese-war-197902',
  'cn-us-diplomatic-relations-197901',
  'cn-japan-diplomatic-normalization-197209',
  'cn-sino-portuguese-macau-declaration-198704',
  'cn-13th-congress-198710',
  'w-solidarity-founded-198008',
  'w-black-monday-198710',
  'w-cuban-missile-crisis-end-196210',
  'cn-world-cup-qualification-200110',
  'cn-wto-accession-signed-200111',
  'cn-national-npc-200303',
  'cn-constitution-amendment-200403',
  'cn-russia-border-agreement-200410',
  'cn-victory-60th-200509',
  'cn-lien-chan-visit-200504',
  'w-space-shuttle-columbia-disaster-200302',
  'w-kashmir-earthquake-200510',
  'w-java-earthquake-200605',
  'w-world-cup-germany-200606',
  'cn-northeast-revitalization-200310',
  'w-inter-korean-summit-200006',
  'w-us-presidential-election-200011',
  'w-egypt-revolution-201101',
  'w-us-iraq-war-end-201112',
  'cn-18th-cpc-congress-201211',
  'cn-chinese-dream-201211',
  'cn-xijinping-president-201303',
  'cn-socialist-legal-system-201103',
  'cn-shanghai-stock-exchange-199011',
  'cn-14th-cpc-congress-199210',
  'cn-tax-sharing-reform-199401',
  'cn-50th-parade-199910',
  'cn-new-china-60th-parade-200910',
  'cn-hainan-province-sez-198804',
  'w-bhola-cyclone-197011',
  'w-nixon-shock-197108',
  'w-oil-crisis-197310',
  'w-ethiopia-emperor-deposed-197409',
  'w-fall-phnom-penh-197504',
  'w-fall-saigon-197504',
  'w-berlin-wall-opens-198911',
  'cn-cuba-relations-196009'
  , 'cn-marriage-law-195005',
  'cn-first-npc-constitution-195409',
  'cn-three-major-remoulding-195601',
  'cn-first-five-year-plan-completed-195712',
  'cn-land-reform-basic-completed-195212',
  'w-warsaw-pact-195505',
  'w-human-rights-covenants-196612',
  'w-asean-founded-196708',
  'w-civil-rights-act-196407',
  'w-vietnam-invades-cambodia-197812',
  'cn-agricultural-tax-free-decided-200512',
  'cn-agricultural-tax-repeal-200601',
  'cn-shenzhou1-199911',
  'cn-macau-handover-199912',
  'cn-11th-five-year-plan-200603'
  , 'w-lebanon-war-200607',
  'cn-property-law-200703',
  'w-saddam-executed-200612',
  'w-north-korea-second-nuclear-test-200905',
  'w-nelson-mandela-pass-201312',
  'cn-reform-openning-30th-200812',
  'cn-new-medical-reform-200904',
  'cn-targeted-poverty-alleviation-201311'
  , 'cn-jinghu-hsr-open-201106',
  'cn-south-to-north-water-diversion-201412',
  'cn-aiib-agreement-signed-201506',
  'cn-beijing-winters-olympics-bid-201507',
  'cn-victory-day-parade-201509',
  'cn-pla-rocket-force-established-201512',
  'cn-two-child-policy-enforced-201601',
  'cn-women-volleyball-gold-201608',
  'cn-g20-hangzhou-summit-201609',
  'cn-fast-telescope-open-201609',
  'cn-shandong-aircraft-carrier-launch-201704',
  'cn-belt-and-road-forum-201705'
  , 'w-arab-spring-begins-201012',
  'w-park-geun-hye-removed-201703',
  'w-panmunjom-declaration-201804'
])

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function api(params, endpoint = 'https://commons.wikimedia.org/w/api.php') {
  const url = `${endpoint}?${new URLSearchParams({ ...params, format: 'json' })}`
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await fetch(url, { headers: { 'User-Agent': 'TenqiuCodexBot/1.0 (annual event image audit; contact: admin@tenqiu.org)' } })
    if (response.ok) return response.json()
    if (response.status !== 429) throw new Error(`Commons HTTP ${response.status}`)
    await sleep(1500 * (attempt + 1))
  }
  throw new Error('Commons HTTP 429 after retries')
}

function clean(value, fallback) {
  const text = String(value ?? '').replace(/\s+/g, ' ').trim()
  return text || fallback
}

function safeSlug(id) {
  return id.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '')
}

function relevant(event, title) {
  const haystack = title.toLowerCase()
  const english = event.id.replace(/^(cn-|w-)/, '').replace(/-\d{6}$/, '').split('-').filter((x) => x.length >= 4)
  if (english.some((token) => haystack.includes(token))) return true
  const chinese = (event.title.match(/[\u4e00-\u9fff]{2,}/g) ?? []).filter((token) => token.length >= 2)
  return chinese.some((token) => title.includes(token))
}

function hasChineseOverlap(a, b) {
  const left = a.replace(/[^\u4e00-\u9fff]/g, '')
  const right = b.replace(/[^\u4e00-\u9fff]/g, '')
  for (let length = Math.min(10, left.length); length >= 4; length -= 1) {
    for (let i = 0; i + length <= left.length; i += 1) {
      if (right.includes(left.slice(i, i + length))) return true
    }
  }
  return false
}

function acceptableFileTitle(event, title) {
  const year = Number(String(event.date ?? '').slice(0, 4))
  const years = (title.match(/\b(1[89]\d{2}|20\d{2})\b/g) ?? []).map(Number)
  if (years.some((value) => Math.abs(value - year) > 20)) return false
  const lower = title.toLowerCase()
  if (/(^|[_ -])(flag|coat of arms|emblem|徽)([_ -]|$)/i.test(title)) {
    const symbolEvent = /共和国|独立|建交|成立|国徽|国旗|自治/.test(event.title)
    if (!symbolEvent) return false
  }
  if (event.id.startsWith('w-')) {
    const tokens = event.id.replace(/^w-/, '').replace(/-\d{6}$/, '').split('-').filter((x) => x.length >= 5)
    if (tokens.length && !tokens.some((token) => lower.includes(token))) return false
  }
  return true
}

function extension(url) {
  const pathname = new URL(url).pathname.toLowerCase()
  const match = pathname.match(/\.(jpg|jpeg|png|webp|svg|gif)$/)
  return match ? `.${match[1] === '.jpeg' ? 'jpg' : match[1]}` : '.jpg'
}

function eventBlocks(raw) {
  const lines = raw.split(/\r?\n/)
  const starts = []
  lines.forEach((line, index) => {
    if (/^- id:\s+/.test(line)) starts.push(index)
  })
  return starts.map((start, i) => ({ start, end: starts[i + 1] ?? lines.length }))
}

function insertImage(raw, id, image) {
  const newline = raw.includes('\r\n') ? '\r\n' : '\n'
  const lines = raw.split(/\r?\n/)
  const block = eventBlocks(raw).find(({ start, end }) => lines[start] === `- id: ${id}` && !lines.slice(start, end).some((line) => /^  image:/.test(line)))
  if (!block) return raw
  const imageLines = [
    '  image:',
    `    url: ${JSON.stringify(image.localUrl)}`,
    `    caption: ${JSON.stringify(image.caption)}`,
    `    source: ${JSON.stringify(image.source)}`,
    `    author: ${JSON.stringify(image.author)}`,
    `    license: ${JSON.stringify(image.license)}`
  ]
  lines.splice(block.end, 0, ...imageLines)
  return lines.join(newline)
}

async function findImage(event) {
  const wiki = await findWikiImage(event)
  if (wiki) return wiki
  const queries = [event.title, event.id.replace(/^(cn-|w-)/, '').replace(/-\d{6}$/, '').replaceAll('-', ' ')]
  for (const query of queries) {
    const result = await api({ action: 'query', list: 'search', srnamespace: '6', srlimit: '5', srsearch: `${query} filetype:bitmap` })
    for (const hit of result?.query?.search ?? []) {
      const title = hit.title
      if (!relevant(event, title)) continue
      if (!acceptableFileTitle(event, title)) continue
      const detail = await api({ action: 'query', titles: title, prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '1600' })
      const page = Object.values(detail?.query?.pages ?? {})[0]
      const info = page?.imageinfo?.[0]
      if (!info?.url) continue
      const meta = info.extmetadata ?? {}
      const license = clean(meta.LicenseShortName?.value, '')
      const author = clean(meta.Artist?.value?.replace(/<[^>]+>/g, ''), 'Wikimedia Commons contributor')
      if (!license) continue
      return {
        title,
        url: info.url,
        source: `https://commons.wikimedia.org/wiki/${encodeURIComponent(title.replaceAll(' ', '_'))}`,
        author,
        license
      }
    }
  }
  return null
}

async function findWikiImage(event) {
  const endpoint = event.id.startsWith('cn-') ? 'https://zh.wikipedia.org/w/api.php' : 'https://en.wikipedia.org/w/api.php'
  const queries = event.id.startsWith('cn-')
    ? [event.title]
    : [event.id.replace(/^w-/, '').replace(/-\d{6}$/, '').replaceAll('-', ' '), event.title]
  for (const query of queries) {
    const result = await api({
      action: 'query',
      generator: 'search',
      gsrsearch: query,
      gsrlimit: '5',
      prop: 'pageimages|extracts',
      exintro: '1',
      explaintext: '1',
      piprop: 'original'
    }, endpoint)
    const pages = Object.values(result?.query?.pages ?? {})
    for (const page of pages) {
    const imageUrl = page.original?.source
    if (!imageUrl) continue
    const articleText = `${page.title} ${page.extract ?? ''}`.toLowerCase()
    const titleTerms = (event.id.replace(/^w-/, '').replace(/-\d{6}$/, '').split('-').filter((x) => x.length >= 5))
    const tagText = Array.isArray(event.tags) ? event.tags.join('') : ''
    if (event.id.startsWith('cn-') && !hasChineseOverlap(`${event.title}${tagText}`, page.title)) continue
    if (event.id.startsWith('w-') && titleTerms.length && !titleTerms.some((term) => articleText.includes(term.toLowerCase()))) continue
    const fileName = decodeURIComponent(new URL(imageUrl).pathname.split('/').pop() ?? '')
    const fileTitle = `File:${fileName}`
    if (!acceptableFileTitle(event, fileTitle)) continue
    const detail = await api({ action: 'query', titles: fileTitle, prop: 'imageinfo', iiprop: 'url|extmetadata' })
    const info = Object.values(detail?.query?.pages ?? {})[0]?.imageinfo?.[0]
    const meta = info?.extmetadata ?? {}
    const license = clean(meta.LicenseShortName?.value, '')
    if (!info?.url || !license) continue
    return {
      title: fileTitle,
      url: info.url,
      source: `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle.replaceAll(' ', '_'))}`,
      author: clean(meta.Artist?.value?.replace(/<[^>]+>/g, ''), 'Wikimedia Commons contributor'),
      license
    }
  }
  }
  return null
}

async function download(url, destination) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await fetch(url, { headers: { 'User-Agent': 'TenqiuCodexBot/1.0 (annual event image audit; contact: admin@tenqiu.org)' } })
    if (response.ok) {
      const bytes = Buffer.from(await response.arrayBuffer())
      if (bytes.length < 1000) throw new Error('image response too small')
      fs.writeFileSync(destination, bytes)
      return
    }
    if (response.status !== 429) throw new Error(`image HTTP ${response.status}`)
    await sleep(2000 * (attempt + 1))
  }
  throw new Error('image HTTP 429 after retries')
}

async function processFile(file) {
  const original = fs.readFileSync(file, 'utf8')
  const data = yaml.load(original.replace(/^\uFEFF/, ''))
  const events = Array.isArray(data) ? data : []
  const missing = events.filter((event) => {
    const year = Number(String(event.date ?? '').slice(0, 4))
    return event.importance === 5 && year >= minYear && year <= maxYear && !event.image && !rejectedIds.has(event.id)
  }).slice(0, limit)
  let raw = original
  for (const event of missing) {
    const year = String(event.date).slice(0, 4)
    try {
      const found = await findImage(event)
      if (!found) {
        console.log(`MISS ${event.id} | ${event.title}`)
        continue
      }
      const ext = extension(found.url)
      const filename = `${safeSlug(event.id)}${ext}`
      const directory = path.join(ROOT, 'public/images/events', year)
      const destination = path.join(directory, filename)
      const localUrl = `/images/events/${year}/${filename}`
      console.log(`${dryRun ? 'DRY' : 'ADD'} ${event.id} | ${found.title}`)
      if (!dryRun) {
        fs.mkdirSync(directory, { recursive: true })
        await download(found.url, destination)
        raw = insertImage(raw, event.id, {
          localUrl,
          caption: `${year}年：${event.title}`,
          source: found.source,
          author: found.author,
          license: found.license
        })
      }
      await sleep(250)
    } catch (error) {
      console.log(`ERROR ${event.id} | ${error.message}`)
    }
  }
  if (!dryRun && raw !== original) {
    const bom = original.startsWith('\uFEFF') ? '\uFEFF' : ''
    const normalized = raw.replace(/^\uFEFF/, '')
    const eol = original.includes('\r\n') ? '\r\n' : '\n'
    fs.writeFileSync(file, bom + normalized.replace(/\r?\n/g, eol), 'utf8')
  }
  return missing.length
}

for (const file of files) await processFile(file)
