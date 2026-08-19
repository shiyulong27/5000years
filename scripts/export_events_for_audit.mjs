import fs from 'node:fs'
import path from 'node:path'
import { loadAll } from '../src/lib/load.js'

const data = loadAll('./data')

function getYear(dateStr) {
  if (typeof dateStr === 'number') return dateStr
  const m = String(dateStr).match(/^(-?\d+)/)
  return m ? parseInt(m[1], 10) : null
}

const list = []
function collect(events, scope) {
  for (const e of events) {
    const y = getYear(e.date)
    if (y >= 1920 && y <= 1948) {
      list.push({
        scope,
        file: e[Symbol.for('loc')]?.file,
        line: e[Symbol.for('loc')]?.line,
        year: y,
        id: e.id,
        date: e.date,
        title: e.title,
        category: e.category,
        importance: e.importance,
        summary: e.summary,
        confidence: e.confidence,
        tags: e.tags,
        sources: e.sources,
        image: e.image
      })
    }
  }
}

collect(data.events, '中国')
collect(data.worldEvents, '世界')

// Sort chronologically
list.sort((a, b) => String(a.date).localeCompare(String(b.date)))

fs.writeFileSync('scripts/events_1920_1948_full.json', JSON.stringify(list, null, 2))
console.log(`Exported ${list.length} events for 1920-1948.`)
