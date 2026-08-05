import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto('http://127.0.0.1:4321/5000years/', { waitUntil: 'networkidle' })

const info = await page.evaluate(() => {
  const banners = [...document.querySelectorAll('.dynasty-banner')].map(
    (b) => b.querySelector('.banner-name')?.textContent?.trim()
  )
  const years = [...document.querySelectorAll('.axis-year')].map((y) => y.textContent.trim())
  return {
    banners,
    firstYear: years[0],
    lastYear: years[years.length - 1],
    rowCount: years.length,
    bandNames: [...document.querySelectorAll('.civ-name')].map((c) => c.textContent.trim()),
  }
})

console.log('朝代横幅：', info.banners.join(' → '))
console.log('年份范围：', info.firstYear, '→', info.lastYear, `（${info.rowCount} 行）`)
console.log('文明色带：', info.bandNames.join('、'))
console.log('JS 错误：', errors.length ? errors.join('; ') : '无')

// 滚到底部看晋朝那段
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1400))
await page.waitForTimeout(400)
await page.screenshot({ path: '.shots/jin-section.png' })
await browser.close()
