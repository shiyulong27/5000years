import fs from 'node:fs'
import path from 'node:path'

async function fetchWebSizeImage(fileTitle, dest) {
  // Use Wikimedia Commons API with iiurlwidth to get an optimized web size
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json`
  const res = await fetch(apiUrl, {
    headers: { 'User-Agent': '5000yearsHistoryBot/1.0 (contact@5000years.org)' }
  })
  const json = await res.json()
  const page = Object.values(json.query?.pages || {})[0]
  const thumbUrl = page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url
  console.log(`Fetching ${fileTitle} -> ${thumbUrl}`)

  const imgRes = await fetch(thumbUrl, {
    headers: { 'User-Agent': '5000yearsHistoryBot/1.0 (contact@5000years.org)' }
  })
  const buf = Buffer.from(await imgRes.arrayBuffer())
  fs.writeFileSync(dest, buf)
  console.log(`Saved optimized ${dest} (${buf.length} bytes)`)
}

async function run() {
  await fetchWebSizeImage('Thure de Thulstrup - L. Prang and Co. - Battle of Gettysburg - Restoration by Adam Cuerden.jpg', 'public/images/events/1863/w-gettysburg-battle-186307.jpg')
  await fetchWebSizeImage('Belvedere of the God of Literature, Summer Palace, Beijing, 6–18 October, 1860.jpg', 'public/images/events/1860/cn-summer-palace-burnt-186010.jpg')
  await fetchWebSizeImage('MANCHURIA-U.S.S.R BOUNDARY Ct002999.jpg', 'public/images/events/1858/cn-treaty-aigun-185805.jpg')
  await fetchWebSizeImage('The Signing of the Treaty of Nanking.jpg', 'public/images/events/1842/cn-treaty-of-nanking-184208.jpg')
}

run()
