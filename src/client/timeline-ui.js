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

  // ── 事件卡片日期解析与 DOM 排序辅助函数 ──────────────────────────
  function getEventSortKey(el) {
    const str = el.dataset.date
    if (!str) return 0
    const m = /^(-?\d+)(?:-(\d+)(?:-(\d+))?)?$/.exec(str)
    if (!m) return 0
    const y = parseInt(m[1], 10)
    const mth = m[2] ? parseInt(m[2], 10) : 0
    const d = m[3] ? parseInt(m[3], 10) : 0
    return y * 10000 + (y >= 0 ? mth * 100 + d : -((13 - mth) * 100 + (32 - d)))
  }

  function sortContainerCards(container, desc) {
    const cards = [...container.children].filter((el) => el.classList.contains('event-card'))
    if (cards.length > 1) {
      cards.sort((a, b) => {
        const kA = getEventSortKey(a)
        const kB = getEventSortKey(b)
        return desc ? kB - kA : kA - kB
      })
      cards.forEach((card) => container.appendChild(card))
    }
  }

  function sortAllContainers(desc) {
    const containers = timeline.querySelectorAll('.year-detail-wrapper, .world-detail-wrapper, .cell-china, .cell-world')
    containers.forEach((c) => sortContainerCards(c, desc))
  }

  function isDescMode() {
    const btnSortDesc = document.getElementById('btn-sort-desc')
    return btnSortDesc ? btnSortDesc.classList.contains('active') : false
  }

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

    // 每次计算可见性时，确保 DOM 卡片顺序严格符合当前排序设置
    sortAllContainers(isDescMode())
  }

  levelToggles.forEach((t) => t.addEventListener('change', apply))
  showWorld?.addEventListener('change', apply)
  showFigures?.addEventListener('change', apply)
  catToggles.forEach((t) => t.addEventListener('change', apply))

  // 概览 / 详情模式动态切换控制 (支持 2023, 2024, 2025, 2026 等年份)
  const toggleBtns = [...document.querySelectorAll('.axis-toggle-btn')]
  const btnGlobalDetail = document.getElementById('btn-view-detail')
  const btnGlobalSummary = document.getElementById('btn-view-summary')

  // 辅助函数：切换单一年份的模式
  function setYearViewMode(year, mode) {
    const btn = toggleBtns.find((b) => b.dataset.year === String(year))
    if (btn) {
      btn.dataset.mode = mode
      const toggleText = btn.querySelector('.toggle-text')
      if (toggleText) toggleText.textContent = mode === 'summary' ? '概览' : '详情'
    }

    const summaryWrapper = timeline.querySelector(`.year-summary-wrapper[data-year="${year}"]`)
    const chinaDetailWrapper = timeline.querySelector(`.cell-china .year-detail-wrapper[data-year="${year}"]`)
    const worldDetailWrapper = timeline.querySelector(`.cell-world .world-detail-wrapper[data-year="${year}"]`)

    if (mode === 'summary') {
      if (summaryWrapper) summaryWrapper.style.display = 'block'
      if (chinaDetailWrapper) chinaDetailWrapper.style.display = 'none'
      if (worldDetailWrapper) worldDetailWrapper.style.display = 'none'
    } else {
      if (summaryWrapper) summaryWrapper.style.display = 'none'
      if (chinaDetailWrapper) chinaDetailWrapper.style.display = ''
      if (worldDetailWrapper) worldDetailWrapper.style.display = ''
    }

    sortAllContainers(isDescMode())
  }

  // 检查并同步顶栏全局按钮高亮
  function syncGlobalButtons() {
    if (!btnGlobalDetail || !btnGlobalSummary) return
    const modes = toggleBtns.map((b) => b.dataset.mode)
    const allSummary = modes.length > 0 && modes.every((m) => m === 'summary')
    const allDetail = modes.length > 0 && modes.every((m) => m === 'detail')

    btnGlobalDetail.classList.toggle('active', allDetail)
    btnGlobalSummary.classList.toggle('active', allSummary)
  }

  // 1. 全局一键控制 [全展开] 或 [概览卡片]
  btnGlobalDetail?.addEventListener('click', () => {
    toggleBtns.forEach((b) => setYearViewMode(b.dataset.year, 'detail'))
    syncGlobalButtons()
    apply()
  })

  btnGlobalSummary?.addEventListener('click', () => {
    toggleBtns.forEach((b) => setYearViewMode(b.dataset.year, 'summary'))
    syncGlobalButtons()
    apply()
  })

  // 2. 单年份中轴按钮自由覆盖切换
  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()

      const year = btn.dataset.year
      const currentMode = btn.dataset.mode
      const newMode = currentMode === 'summary' ? 'detail' : 'summary'

      setYearViewMode(year, newMode)
      syncGlobalButtons()
      apply()
    })
  })

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

  // ── 排序切换：正序 (asc) / 倒序 (desc) ──────────────────────────
  const btnSortAsc  = document.getElementById('btn-sort-asc')
  const btnSortDesc = document.getElementById('btn-sort-desc')

  if (btnSortAsc && btnSortDesc) {
    /** 收集所有参与 grid 定位的元素并缓存其原始 gridRow */
    function collectGridItems() {
      const selectors = ['.cell', '.banner-row', '.civ-band', '.figure-slot']
      const items = []
      for (const sel of selectors) {
        for (const el of timeline.querySelectorAll(sel)) {
          const raw = el.style.gridRow
          if (!raw) continue
          // 格式如 "12" 或 "12 / 15"
          const parts = raw.split('/').map((s) => parseInt(s.trim(), 10))
          const rowStart = parts[0]
          const rowEnd = parts[1] !== undefined ? parts[1] : (parts[0] + 1)
          items.push({ el, rowStart, rowEnd })
        }
      }
      return items
    }

    // 在首次切换时缓存正序原始值，避免多次翻转产生累积偏差
    let _cachedItems = null
    let _maxRow = 0

    function getItems() {
      if (_cachedItems) return { items: _cachedItems, maxRow: _maxRow }
      _cachedItems = collectGridItems()
      _maxRow = _cachedItems.reduce((m, i) => Math.max(m, i.rowEnd), 0)
      return { items: _cachedItems, maxRow: _maxRow }
    }

    /**
     * 镜像翻转：以 maxRow 为轴，对每个元素的 gridRow 做反射
     *   newStart = maxRow - rowEnd   + 2
     *   newEnd   = maxRow - rowStart + 2
     * 保持每个元素占用的行数不变，位置整体翻转
     */
    function applyOrder(desc) {
      const { items, maxRow } = getItems()
      for (const { el, rowStart, rowEnd } of items) {
        if (desc) {
          const newStart = maxRow - rowEnd + 2
          const newEnd   = maxRow - rowStart + 2
          el.style.gridRow = `${newStart} / ${newEnd}`
        } else {
          el.style.gridRow = `${rowStart} / ${rowEnd}`
        }
      }
      timeline.classList.toggle('is-reversed', desc)

      // 同步按 data-date 物理重排各年份容器内部的事件卡片 DOM 顺序（倒序: 12月→1月，正序: 1月→12月）
      sortAllContainers(desc)
    }

    btnSortAsc.addEventListener('click', () => {
      btnSortAsc.classList.add('active')
      btnSortDesc.classList.remove('active')
      applyOrder(false)
    })

    btnSortDesc.addEventListener('click', () => {
      btnSortDesc.classList.add('active')
      btnSortAsc.classList.remove('active')
      applyOrder(true)
    })

    // 初始化检查：若页面加载时默认按钮选中的是倒序，立即执行一次按日期倒序
    if (btnSortDesc.classList.contains('active')) {
      applyOrder(true)
    }
  }

  // 初始应用全套重算与卡片物理排序
  apply()
}
