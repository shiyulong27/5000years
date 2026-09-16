import fs from 'node:fs'

const stat = fs.statSync('dist/timeline/index.html')
console.log('Timeline HTML size:', (stat.size / 1024 / 1024).toFixed(2), 'MB')

const html = fs.readFileSync('dist/timeline/index.html', 'utf8')
console.log('Event cards:', (html.match(/class="[^"]*event-card/g) || []).length)
console.log('Figure cards:', (html.match(/class="[^"]*figure-card/g) || []).length)
console.log('Images:', (html.match(/<img/g) || []).length)
console.log('Cell elements:', (html.match(/class="[^"]*cell/g) || []).length)
console.log('Total DOM elements estimated:', (html.match(/<[a-z0-9]+/gi) || []).length)
