import fs from 'node:fs'
import path from 'node:path'

async function searchAndDownload(query, dest) {
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`
  const res = await fetch(searchUrl, {
    headers: {
      'User-Agent': 'ModernHistoryApp/1.0 (https://github.com/shiyulong27/5000years; bot@5000years.org)'
    }
  })
  const json = await res.json()
  const results = json.query?.search
  if (!results || results.length === 0) {
    throw new Error(`No search results for ${query}`)
  }
  const title = results[0].title
  console.log(`Top result for "${query}": ${title}`)

  const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|extmetadata&format=json`
  const infoRes = await fetch(infoUrl, {
    headers: {
      'User-Agent': 'ModernHistoryApp/1.0 (https://github.com/shiyulong27/5000years; bot@5000years.org)'
    }
  })
  const infoJson = await infoRes.json()
  const page = Object.values(infoJson.query.pages)[0]
  const imgUrl = page.imageinfo[0].url

  const dir = path.dirname(dest)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  const imgRes = await fetch(imgUrl, {
    headers: {
      'User-Agent': 'ModernHistoryApp/1.0 (https://github.com/shiyulong27/5000years; bot@5000years.org)'
    }
  })
  if (!imgRes.ok) throw new Error(`Download failed ${imgUrl}: ${imgRes.statusText}`)
  const buf = Buffer.from(await imgRes.arrayBuffer())
  fs.writeFileSync(dest, buf)
  console.log(`Saved ${dest} (${buf.length} bytes)`)
}

searchAndDownload('First Opium War Nemesis', 'public/images/events/1840/cn-opium-war-184006.jpg')
  .catch(err => console.error(err))
