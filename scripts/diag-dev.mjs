import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } })
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))
page.on('requestfailed', (r) => errors.push(`FAILED ${r.url()} :: ${r.failure()?.errorText}`))

await page.goto('http://127.0.0.1:4321/5000years/', { waitUntil: 'networkidle' })

const sheets = await page.evaluate(() => ({
  styleSheets: document.styleSheets.length,
  rules: [...document.styleSheets].reduce((n, s) => {
    try { return n + s.cssRules.length } catch { return n }
  }, 0),
  timelineDisplay: getComputedStyle(document.querySelector('.timeline')).display,
  bodyFont: getComputedStyle(document.body).fontFamily.slice(0, 40),
}))

console.log('样式表数：', sheets.styleSheets)
console.log('规则数：', sheets.rules)
console.log('.timeline display：', sheets.timelineDisplay)
console.log('body 字体：', sheets.bodyFont)
console.log('错误：', errors.length ? errors.join('\n  ') : '无')

await page.screenshot({ path: '.shots/dev-mode.png' })
await browser.close()
