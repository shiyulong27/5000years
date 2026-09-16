import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('.')

const fixes = [
  {
    dest: 'public/images/events/1851/cn-jintian-uprising-185101.jpg',
    query: 'Taiping Rebellion Jintian'
  },
  {
    dest: 'public/images/events/1855/cn-yellow-river-avulsion-1855.jpg',
    query: 'Yellow River course changes'
  },
  {
    dest: 'public/images/events/1861/cn-xinyou-coup-186111.jpg',
    query: 'Empress Dowager Cixi portrait'
  },
  {
    dest: 'public/images/events/1864/cn-fall-of-tianjing-186407.jpg',
    query: 'Third Battle of Nanking 1864'
  }
]

async function searchAndDownloadImage(query, dest) {
  const sUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`
  const sRes = await fetch(sUrl, {
    headers: { 'User-Agent': '5000yearsHistoryBot/1.0 (contact@5000years.org)' }
  })
  const sJson = await sRes.json()
  const hits = sJson.query?.search || []

  // Filter for jpg/png/webp
  const validHit = hits.find(h => /\.(jpe?g|png|webp)$/i.test(h.title))
  if (!validHit) {
    throw new Error(`No valid image hit for ${query}`)
  }

  const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(validHit.title)}&prop=imageinfo&iiprop=url&format=json`
  const infoRes = await fetch(infoUrl, {
    headers: { 'User-Agent': '5000yearsHistoryBot/1.0 (contact@5000years.org)' }
  })
  const infoJson = await infoRes.json()
  const p = Object.values(infoJson.query?.pages || {})[0]
  const imgUrl = p?.imageinfo?.[0]?.url

  console.log(`Downloading ${validHit.title} (${imgUrl}) -> ${dest}`)
  const imgRes = await fetch(imgUrl, {
    headers: { 'User-Agent': '5000yearsHistoryBot/1.0 (contact@5000years.org)' }
  })
  if (!imgRes.ok) throw new Error(`Download failed ${imgUrl}: ${imgRes.statusText}`)
  const buf = Buffer.from(await imgRes.arrayBuffer())

  const dir = path.dirname(dest)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(dest, buf)
  console.log(`Saved ${dest} (${buf.length} bytes)`)
}

async function run() {
  for (const item of fixes) {
    try {
      if (fs.existsSync(item.dest)) fs.unlinkSync(item.dest)
      await searchAndDownloadImage(item.query, item.dest)
    } catch (e) {
      console.error(`Error with ${item.dest}:`, e.message)
    }
  }
}

run()
