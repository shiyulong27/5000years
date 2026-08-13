import https from 'node:https'

function searchCommons(query) {
  return new Promise((resolve, reject) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`
    const options = {
      headers: {
        'User-Agent': 'TenqiuCodexBot/1.0 (contact: admin@tenqiu.org)'
      }
    }
    https.get(url, options, (res) => {
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

async function run() {
  const skRes = await searchCommons("National Assembly of South Korea")
  console.log('SK National Assembly Search Results:')
  skRes.query.search.slice(0, 5).forEach(s => console.log(s.title))

  const bricsRes = await searchCommons("BRICS summit")
  console.log('\nBRICS Search Results:')
  bricsRes.query.search.slice(0, 5).forEach(s => console.log(s.title))

  const nobelRes = await searchCommons("Nobel medal")
  console.log('\nNobel Medal Search Results:')
  nobelRes.query.search.slice(0, 5).forEach(s => console.log(s.title))
}

run().catch(console.error)
