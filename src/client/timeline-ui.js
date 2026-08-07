/**
 * 长卷交互。约 100 行原生 JavaScript，不引入前端框架。
 *
 * 渐进增强：本脚本全部失效时，页面仍是一份完整可读的时间线
 * （三栏俱在，仅开关失效）。对以阅读为主的项目，这是恰当的保证。
 */

const timeline = document.querySelector('.timeline')
if (timeline) {
  const levelMultiselect = document.getElementById('level-multiselect')
  const levelBtn = document.getElementById('level-dropdown-btn')
  const levelMenu = document.getElementById('level-dropdown-menu')
  const levelBtnText = document.getElementById('level-btn-text')
  const levelToggles = [...document.querySelectorAll('.level-toggle')]

  const showWorld = document.getElementById('show-world')
  const showFigures = document.getElementById('show-figures')
  const catToggles = [...document.querySelectorAll('.cat-toggle')]
  const jump = document.getElementById('jump-dynasty')
  const current = document.getElementById('current-dynasty')

  // 下拉框展开/收起控制
  if (levelBtn && levelMenu) {
    levelBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      const isHidden = levelMenu.hasAttribute('hidden')
      if (isHidden) {
        levelMenu.removeAttribute('hidden')
        levelMultiselect?.classList.add('is-open')
        levelBtn.setAttribute('aria-expanded', 'true')
      } else {
        levelMenu.setAttribute('hidden', '')
        levelMultiselect?.classList.remove('is-open')
        levelBtn.setAttribute('aria-expanded', 'false')
      }
    })

    document.addEventListener('click', (e) => {
      if (levelMultiselect && !levelMultiselect.contains(e.target)) {
        levelMenu.setAttribute('hidden', '')
        levelMultiselect.classList.remove('is-open')
        levelBtn.setAttribute('aria-expanded', 'false')
      }
    })
  }

  /**
   * 重算各行可见性。
   */
  function apply() {
    const activeLevels = new Set(levelToggles.filter((t) => t.checked).map((t) => Number(t.value)))
    const activeCats = new Set(catToggles.filter((t) => t.checked).map((t) => t.value))

    // 动态更新按钮文案
    if (levelBtnText) {
      const selected = levelToggles.filter((t) => t.checked).map((t) => Number(t.value)).sort((a, b) => b - a)
      if (selected.length === 5) {
        levelBtnText.textContent = '等级: 全部(1-5级)'
      } else if (selected.length === 0) {
        levelBtnText.textContent = '等级: 未选择'
      } else {
        levelBtnText.textContent = `等级: ${selected.map((v) => v + '级').join(', ')}`
      }
    }

    // 先决定每张卡片的去留
    for (const card of timeline.querySelectorAll('.event-card')) {
      const imp = Number(card.dataset.importance) || 3
      const impOk = activeLevels.has(imp)
      const catOk = activeCats.has(card.dataset.category)
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

  levelToggles.forEach((t) => t.addEventListener('change', apply))
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
