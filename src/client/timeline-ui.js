/**
 * 长卷交互。约 100 行原生 JavaScript，不引入前端框架。
 *
 * 渐进增强：本脚本全部失效时，页面仍是一份完整可读的时间线
 * （三栏俱在，仅开关失效）。对以阅读为主的项目，这是恰当的保证。
 */

const timeline = document.querySelector('.timeline')
if (timeline) {
  const levelFilter = document.getElementById('level-filter')
  const onlyMajor = document.getElementById('only-major')
  const showWorld = document.getElementById('show-world')
  const showFigures = document.getElementById('show-figures')
  const catToggles = [...document.querySelectorAll('.cat-toggle')]
  const jump = document.getElementById('jump-dynasty')
  const current = document.getElementById('current-dynasty')

  /**
   * 重算各行可见性。
   */
  function apply() {
    const level = levelFilter?.value || (onlyMajor?.checked ? 'classic' : 'all')
    const active = new Set(catToggles.filter((t) => t.checked).map((t) => t.value))

    // 先决定每张卡片的去留
    for (const card of timeline.querySelectorAll('.event-card')) {
      const imp = Number(card.dataset.importance) || 3
      let impOk = true
      if (level === 'major') {
        impOk = imp >= 5
      } else if (level === 'classic') {
        impOk = imp >= 4
      } else {
        impOk = true // 'all'
      }

      const catOk = active.has(card.dataset.category)
      card.hidden = !(impOk && catOk)
    }

    // 2. 按行 (grid-row) 分组统计可见性，防止中轴年份节点在空行处堆叠重叠
    const rowsMap = new Map()
    for (const cell of timeline.querySelectorAll('.cell')) {
      const gRow = cell.style.gridRow
      if (!gRow) continue
      if (!rowsMap.has(gRow)) {
        rowsMap.set(gRow, { china: null, world: null, axis: null })
      }
      const entry = rowsMap.get(gRow)
      if (cell.classList.contains('cell-china')) entry.china = cell
      else if (cell.classList.contains('cell-world')) entry.world = cell
      else if (cell.classList.contains('cell-axis')) entry.axis = cell
    }

    for (const [_, entry] of rowsMap) {
      const chinaCards = entry.china ? [...entry.china.querySelectorAll('.event-card')] : []
      const worldCards = entry.world ? [...entry.world.querySelectorAll('.event-card')] : []

      const hasChinaVisible = chinaCards.some((c) => !c.hidden)
      const hasWorldVisible = worldCards.some((c) => !c.hidden)

      if (entry.china) entry.china.classList.toggle('is-empty', chinaCards.length > 0 && !hasChinaVisible)
      if (entry.world) entry.world.classList.toggle('is-empty', worldCards.length > 0 && !hasWorldVisible)
      // 中轴单元格：左右两侧均无可见事件卡片时隐藏，防止空行年份吸顶重叠
      if (entry.axis) entry.axis.classList.toggle('is-empty', !hasChinaVisible && !hasWorldVisible)
    }

    // 3. 处理朝代横幅：若某朝代下无任何可见事件，则隐藏其横幅
    const allChildren = [...timeline.children]
    let currentBanner = null
    let currentBannerHasEvents = false

    for (const el of allChildren) {
      if (el.classList.contains('banner-row')) {
        if (currentBanner) {
          currentBanner.classList.toggle('is-empty', !currentBannerHasEvents)
        }
        currentBanner = el
        currentBannerHasEvents = false
      } else if (el.classList.contains('cell-china') || el.classList.contains('cell-world')) {
        if (!el.classList.contains('is-empty')) {
          const cards = el.querySelectorAll('.event-card')
          if ([...cards].some((c) => !c.hidden)) {
            currentBannerHasEvents = true
          }
        }
      }
    }
    if (currentBanner) {
      currentBanner.classList.toggle('is-empty', !currentBannerHasEvents)
    }

    timeline.classList.toggle('hide-world', showWorld && !showWorld.checked)

    // 人物图层默认关闭——人物数量远多于事件，常驻显示会淹没长卷本身
    timeline.classList.toggle('show-figures', !!showFigures?.checked)
  }


  levelFilter?.addEventListener('change', apply)
  onlyMajor?.addEventListener('change', apply)
  showWorld?.addEventListener('change', apply)
  showFigures?.addEventListener('change', apply)
  catToggles.forEach((t) => t.addEventListener('change', apply))
  apply()


  // 朝代跳转
  jump?.addEventListener('change', () => {
    const id = jump.value
    if (!id) return
    document.getElementById(`dynasty-${id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    jump.value = ''
  })

  // 滚动高亮当前朝代
  const banners = [...document.querySelectorAll('.dynasty-banner')]
  if (banners.length > 0 && current) {
    let latest = null

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) latest = entry.target
        }
        if (latest) current.textContent = latest.querySelector('.banner-name')?.textContent.trim() ?? ''
      },
      { rootMargin: '-10% 0px -85% 0px', threshold: 0 }
    )

    banners.forEach((b) => io.observe(b))
  }
}
