/**
 * 交互验收：筛选、跳转、渐进增强。
 * 这些图看不出来，须实际操作后断言 DOM。
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const outDir = fileURLToPath(new URL('../.shots', import.meta.url))
mkdirSync(outDir, { recursive: true })

const PORT = 4332
const BASE = `http://127.0.0.1:${PORT}/5000years/`

const server = spawn(
  process.execPath,
  ['node_modules/astro/astro.js', 'preview', '--port', String(PORT), '--host', '127.0.0.1'],
  { stdio: ['ignore', 'pipe', 'pipe'] }
)

const ready = new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('预览服务器启动超时')), 30000)
  server.stdout.on('data', (b) => {
    if (b.toString().includes(String(PORT))) {
      clearTimeout(timer)
      setTimeout(resolve, 300)
    }
  })
})

const results = []
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail })
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? `　${detail}` : ''}`)
}

/** 类别 chip 的 input 为视觉隐藏，点 label——这也正是真实用户的操作方式 */
const toggleCat = async (page, cat) => {
  await page.locator('.chip', { hasText: cat }).first().click()
  await page.waitForTimeout(60)
}

try {
  await ready
  const browser = await chromium.launch()

  // ── 启用 JavaScript ────────────────────────────────
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } })
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(BASE, { waitUntil: 'networkidle' })

  const totalCards = await page.locator('.event-card').count()
  const visibleAtStart = await page.locator('.event-card:not([hidden])').count()
  check('初始全部卡片可见', totalCards === visibleAtStart, `${visibleAtStart}/${totalCards}`)

  // 只看重大事件
  await page.check('#only-major')
  await page.waitForTimeout(150)
  const majorVisible = await page.locator('.event-card:not([hidden])').count()
  const allMajor = await page.evaluate(() =>
    [...document.querySelectorAll('.event-card:not([hidden])')].every(
      (c) => Number(c.dataset.importance) >= 4
    )
  )
  check('只看重大事件生效', majorVisible < totalCards && allMajor, `${majorVisible}/${totalCards}`)
  await page.screenshot({ path: `${outDir}/filter-major.png` })

  await page.uncheck('#only-major')
  await page.waitForTimeout(150)

  // 类别筛选
  await toggleCat(page, '战争')
  const noWar = await page.evaluate(() =>
    [...document.querySelectorAll('.event-card:not([hidden])')].every(
      (c) => c.dataset.category !== '战争'
    )
  )
  check('类别筛选生效', noWar)

  // 空行残留：卡片全被筛除的格子应隐藏
  const emptyLeak = await page.evaluate(() => {
    const cells = [...document.querySelectorAll('.cell-china, .cell-world')]
    return cells.filter((cell) => {
      const cards = [...cell.querySelectorAll('.event-card')]
      if (cards.length === 0) return false
      const allHidden = cards.every((c) => c.hidden)
      return allHidden && !cell.classList.contains('is-empty')
    }).length
  })
  check('无空行残留', emptyLeak === 0, `残留 ${emptyLeak} 处`)

  // 全部类别关掉
  for (const cat of ['政治', '文化', '科技', '经济', '外交', '灾异']) {
    await toggleCat(page, cat)
  }
  await page.waitForTimeout(200)
  const noneVisible = await page.locator('.event-card:not([hidden])').count()
  check('全部关闭时无卡片可见', noneVisible === 0, `剩 ${noneVisible}`)
  await page.screenshot({ path: `${outDir}/filter-none.png` })

  // 恢复
  for (const cat of ['政治', '战争', '文化', '科技', '经济', '外交', '灾异']) {
    await toggleCat(page, cat)
  }
  await page.waitForTimeout(150)

  // 世界栏开关
  const axisXBefore = await page.evaluate(
    () => document.querySelector('.cell-axis').getBoundingClientRect().left
  )
  await page.uncheck('#show-world')
  await page.waitForTimeout(150)
  const worldHidden = await page.evaluate(() => {
    const b = document.querySelector('.civ-band')
    const w = document.querySelector('.cell-world')
    return (
      (!b || getComputedStyle(b).display === 'none') &&
      (!w || getComputedStyle(w).display === 'none')
    )
  })
  check('世界栏开关生效', worldHidden)

  // display:none 不会让 Grid 模板列收缩——须确认空间确实被回收
  const axisXAfter = await page.evaluate(
    () => document.querySelector('.cell-axis').getBoundingClientRect().left
  )
  check(
    '关闭世界栏后空间被回收',
    axisXAfter < axisXBefore - 100,
    `中轴 ${Math.round(axisXBefore)} → ${Math.round(axisXAfter)}`
  )
  await page.screenshot({ path: `${outDir}/no-world.png` })
  await page.check('#show-world')
  await page.waitForTimeout(150)

  // 朝代跳转
  const beforeY = await page.evaluate(() => window.scrollY)
  await page.selectOption('#jump-dynasty', 'han')
  await page.waitForTimeout(900)
  const afterY = await page.evaluate(() => window.scrollY)
  check('朝代跳转生效', afterY > beforeY, `${beforeY} → ${afterY}`)

  // 滚动高亮
  const current = await page.locator('#current-dynasty').textContent()
  check('当前朝代高亮', current.trim().length > 0, `「${current.trim()}」`)

  check('无 JavaScript 运行时错误', errors.length === 0, errors.join(' / '))
  await page.close()

  // ── 禁用 JavaScript：渐进增强 ──────────────────────
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1600, height: 1000 } })
  const nojs = await ctx.newPage()
  await nojs.goto(BASE, { waitUntil: 'load' })

  const nojsCards = await nojs.locator('.event-card').count()
  const nojsBanners = await nojs.locator('.dynasty-banner').count()
  const nojsBands = await nojs.locator('.civ-band').count()
  check(
    '禁用 JS 后三栏内容完整',
    nojsCards === totalCards && nojsBanners > 0 && nojsBands > 0,
    `卡片 ${nojsCards}　横幅 ${nojsBanners}　色带 ${nojsBands}`
  )
  await nojs.screenshot({ path: `${outDir}/no-js.png` })
  await ctx.close()

  await browser.close()

  const failed = results.filter((r) => !r.ok)
  console.log(`\n${results.length - failed.length}/${results.length} 项通过`)
  if (failed.length > 0) process.exitCode = 1
} finally {
  server.kill()
}
