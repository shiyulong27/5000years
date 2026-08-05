/**
 * 截图脚本——阶段五、六的目视验收工具。
 *
 * 组件不做单元测试（静态 HTML 的问题肉眼可见，测试成本高于收益），
 * 故用此脚本抓取真实渲染结果供人工检查。
 *
 * 用法：node scripts/shoot.mjs [输出目录]
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const outDir = process.argv[2] ?? fileURLToPath(new URL('../.shots', import.meta.url))
mkdirSync(outDir, { recursive: true })

const PORT = 4331
const ORIGIN = `http://127.0.0.1:${PORT}`
const BASE = `${ORIGIN}/5000years/`

// astro preview 默认只绑 ::1，显式指定 host 以便用 127.0.0.1 访问
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
  server.stderr.on('data', (b) => process.stderr.write(b))
})

const shots = [
  { name: 'desktop-top', url: BASE, viewport: { width: 1600, height: 1000 } },
  { name: 'mobile', url: BASE, viewport: { width: 375, height: 800 } },
  { name: 'dynasty-han', url: `${BASE}dynasty/han/`, viewport: { width: 1100, height: 1000 } },
]

try {
  await ready
  const browser = await chromium.launch()

  for (const shot of shots) {
    const page = await browser.newPage({ viewport: shot.viewport })
    const errors = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(String(e)))

    await page.goto(shot.url, { waitUntil: 'networkidle' })
    await page.screenshot({ path: `${outDir}/${shot.name}.png`, fullPage: false })
    console.log(`✓ ${shot.name}${errors.length ? `　控制台错误：${errors.join(' / ')}` : ''}`)
    await page.close()
  }

  // 长卷全页另存一张，用于检查整体节奏
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.screenshot({ path: `${outDir}/desktop-full.png`, fullPage: true })
  console.log('✓ desktop-full')
  await page.close()

  await browser.close()
} finally {
  server.kill()
}
