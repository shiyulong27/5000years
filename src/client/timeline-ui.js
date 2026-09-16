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
  const figureFieldsBar = document.getElementById('figure-fields-bar')
  const figFieldToggles = [...document.querySelectorAll('.fig-field-toggle')]
  const catToggles = [...document.querySelectorAll('.cat-toggle')]
  const jump = document.getElementById('jump-dynasty')
  const current = document.getElementById('current-dynasty')

  const lifespanBeam = document.getElementById('lifespan-beam')
  const beamBadge = document.getElementById('beam-badge')

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

  // 预缓存关键 DOM 引用以实现亚毫秒级无卡顿即时筛选
  const allEventCards = [...timeline.querySelectorAll('.event-card')]
  const allFigureCards = [...timeline.querySelectorAll('.figure-card')]

  // 按行 (grid-row) 分组缓存，避免每次触发筛选重复遍历 3000+ 个单元格
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

  // 预编译朝代横幅区块
  const allTimelineChildren = [...timeline.children]

  /**
   * 重算各行可见性（优化版：纯内存 Map 遍历，无重复 querySelectorAll 开销）。
   */
  function apply() {
    const activeLevels = new Set(levelToggles.filter((t) => t.checked).map((t) => Number(t.value)))
    const activeCats = new Set(catToggles.filter((t) => t.checked).map((t) => t.value))
    const isFiguresOn = !!showFigures?.checked
    const activeFigFields = new Set(figFieldToggles.filter((t) => t.checked).map((t) => t.value))

    // 动态更新重要度按钮文案
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

    // 控制人物子领域筛选栏的显隐
    if (figureFieldsBar) {
      if (isFiguresOn) {
        figureFieldsBar.removeAttribute('hidden')
      } else {
        figureFieldsBar.setAttribute('hidden', '')
      }
    }

    // 1. 决定每张事件卡片的去留
    for (let i = 0; i < allEventCards.length; i++) {
      const card = allEventCards[i]
      const imp = Number(card.dataset.importance) || 3
      const impOk = activeLevels.has(imp)
      const catOk = activeCats.has(card.dataset.category)
      card.hidden = !(impOk && catOk)
    }

    // 2. 决定人物卡片的去留（按领域多选过滤）
    for (let i = 0; i < allFigureCards.length; i++) {
      const figCard = allFigureCards[i]
      const fieldOk = activeFigFields.has(figCard.dataset.field)
      figCard.hidden = !fieldOk
    }

    // 3. 极速行可见性与中轴空行收拢计算
    for (const [_, entry] of rowsMap) {
      const chinaCards = entry.china ? [...entry.china.querySelectorAll('.event-card')] : []
      const worldCards = entry.world ? [...entry.world.querySelectorAll('.event-card')] : []
      const figureCards = entry.china ? [...entry.china.querySelectorAll('.figure-card')] : []

      const hasFiguresVisible = isFiguresOn && figureCards.some((c) => !c.hidden)
      const hasChinaVisible = chinaCards.some((c) => !c.hidden) || hasFiguresVisible
      const hasWorldVisible = worldCards.some((c) => !c.hidden)
      const hasRulers = !!entry.axis?.querySelector('.axis-rulers')
      const hasRulerCards = !!entry.china?.querySelector('.ruler-card')

      if (entry.china) entry.china.classList.toggle('is-empty', chinaCards.length > 0 && !hasChinaVisible && !hasRulerCards)
      if (entry.world) entry.world.classList.toggle('is-empty', worldCards.length > 0 && !hasWorldVisible)
      // 君主即位节点即使没有事件也须保留；真正的空行才隐藏。
      if (entry.axis) entry.axis.classList.toggle('is-empty', !hasChinaVisible && !hasWorldVisible && !hasRulers)
    }

    // 4. 处理朝代横幅：若某朝代下无任何可见事件/君主/人物，则隐藏其横幅
    let currentBanner = null
    let currentBannerHasContent = false

    for (let i = 0; i < allTimelineChildren.length; i++) {
      const el = allTimelineChildren[i]
      if (el.classList.contains('banner-row')) {
        if (currentBanner) {
          currentBanner.classList.toggle('is-empty', !currentBannerHasContent)
        }
        currentBanner = el
        currentBannerHasContent = false
      } else if (el.classList.contains('cell-china') || el.classList.contains('cell-world')) {
        if (!el.classList.contains('is-empty')) {
          const cards = el.querySelectorAll('.event-card')
          const figCards = el.querySelectorAll('.figure-card')
          if ([...cards].some((c) => !c.hidden) || (isFiguresOn && [...figCards].some((c) => !c.hidden)) || el.querySelector('.ruler-card')) {
            currentBannerHasContent = true
          }
        }
      }
    }
    if (currentBanner) {
      currentBanner.classList.toggle('is-empty', !currentBannerHasContent)
    }

    timeline.classList.toggle('hide-world', showWorld && !showWorld.checked)

    // 人物图层控制
    timeline.classList.toggle('show-figures', isFiguresOn)
  }

  levelToggles.forEach((t) => t.addEventListener('change', apply))
  showWorld?.addEventListener('change', apply)
  showFigures?.addEventListener('change', apply)
  figFieldToggles.forEach((t) => t.addEventListener('change', apply))
  catToggles.forEach((t) => t.addEventListener('change', apply))

  // ── 交互式生命周期纵向高亮光束 (Lifespan Projection Beam) ──────────
  function formatYear(yearNum) {
    const y = Number(yearNum)
    if (isNaN(y)) return ''
    return y < 0 ? `前${Math.abs(y)}年` : `${y}年`
  }

  function handleFigureEnter(card) {
    if (!lifespanBeam) return
    const rowStart = Number(card.dataset.rowStart)
    const rowEnd = Number(card.dataset.rowEnd)
    const figureName = card.dataset.figureName || ''
    const startYear = card.dataset.startYear
    const endYear = card.dataset.endYear

    const themeColor = getComputedStyle(card).getPropertyValue('--fig-theme-color').trim() || '#8a6d3b'

    // 查找对应起点行与终点行 DOM
    const startCell = timeline.querySelector(`.cell-axis[style*="grid-row:${rowStart}"], .cell-axis[style*="grid-row: ${rowStart}"]`) || card.closest('.cell-china')
    const endCell = timeline.querySelector(`.cell-axis[style*="grid-row:${rowEnd}"], .cell-axis[style*="grid-row: ${rowEnd}"]`) || card.closest('.cell-china')

    if (!startCell || !endCell) return

    const timelineRect = timeline.getBoundingClientRect()
    const startRect = startCell.getBoundingClientRect()
    const endRect = endCell.getBoundingClientRect()

    const top = startRect.top - timelineRect.top
    const height = Math.max(endRect.bottom - startRect.top, 28)

    // 定位到中轴中心线
    const axisCell = timeline.querySelector('.cell-axis')
    let left = 0
    if (axisCell) {
      const axisRect = axisCell.getBoundingClientRect()
      left = axisRect.left - timelineRect.left + (axisRect.width / 2) - 2
    }

    lifespanBeam.style.top = `${top}px`
    lifespanBeam.style.height = `${height}px`
    lifespanBeam.style.left = `${left}px`
    lifespanBeam.style.setProperty('--beam-color', themeColor)

    // 计算同时代交集名士羁绊
    const otherFigures = [...timeline.querySelectorAll('.figure-card')].filter((f) => f !== card && !f.hidden)
    const peers = otherFigures
      .filter((f) => {
        const rS = Number(f.dataset.rowStart)
        const rE = Number(f.dataset.rowEnd)
        return Math.max(rowStart, rS) <= Math.min(rowEnd, rE)
      })
      .map((f) => f.dataset.figureName)
      .filter(Boolean)

    const uniquePeers = [...new Set(peers)]
    const peerText = uniquePeers.length > 0 ? ` · 同代名士: ${uniquePeers.slice(0, 4).join('、')}${uniquePeers.length > 4 ? '等' : ''}` : ''

    if (beamBadge) {
      beamBadge.textContent = `★ ${figureName} (${formatYear(startYear)}～${formatYear(endYear)})${peerText}`
    }

    lifespanBeam.style.display = 'block'
    timeline.classList.add('figure-focusing')

    // 为区间内的年份行高亮
    for (let r = rowStart; r <= rowEnd; r++) {
      const cells = timeline.querySelectorAll(`.cell[style*="grid-row:${r}"], .cell[style*="grid-row: ${r}"]`)
      cells.forEach((c) => c.classList.add('in-lifespan'))
    }
  }

  function handleFigureLeave() {
    if (lifespanBeam) lifespanBeam.style.display = 'none'
    timeline.classList.remove('figure-focusing')
    timeline.querySelectorAll('.in-lifespan').forEach((c) => c.classList.remove('in-lifespan'))
  }

  timeline.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.figure-card')
    if (card) {
      handleFigureEnter(card)
    }
  })

  timeline.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.figure-card')
    if (card) {
      handleFigureLeave()
    }
  })

  // ── 全局即时搜索与高亮直达 ────────────────────────────────────
  const searchInput = document.getElementById('timeline-search-input')
  const searchDropdown = document.getElementById('search-results-dropdown')
  const searchList = document.getElementById('search-results-list')

  function highlightTarget(el) {
    if (!el) return
    // 若目标属于人物卡且当前人物图层未开启，自动开启
    if (el.classList.contains('figure-card') && showFigures && !showFigures.checked) {
      showFigures.checked = true
      apply()
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.classList.add('highlight-pulse')
    setTimeout(() => el.classList.remove('highlight-pulse'), 3000)

    if (el.classList.contains('figure-card')) {
      handleFigureEnter(el)
    }
  }

  function buildSearchIndex() {
    const index = []

    // 1. 人物
    timeline.querySelectorAll('.figure-card').forEach((el) => {
      const name = el.dataset.figureName || ''
      const field = el.dataset.field || ''
      const sY = el.dataset.startYear || ''
      const eY = el.dataset.endYear || ''
      const note = el.querySelector('.figure-card-note')?.textContent || ''
      index.push({
        type: 'figure',
        typeName: '人物',
        title: name,
        meta: `${field} · ${formatYear(sY)}~${formatYear(eY)}`,
        sub: note,
        el,
      })
    })

    // 2. 事件
    timeline.querySelectorAll('.event-card').forEach((el) => {
      const title = el.querySelector('.event-title')?.textContent || ''
      const date = el.dataset.date || ''
      const cat = el.dataset.category || ''
      const summary = el.querySelector('.event-summary')?.textContent || ''
      index.push({
        type: 'event',
        typeName: '事件',
        title,
        meta: `${cat} · ${date}`,
        sub: summary,
        el,
      })
    })

    // 3. 君主
    timeline.querySelectorAll('.ruler-card').forEach((el) => {
      const name = el.querySelector('.ruler-name, h3')?.textContent || ''
      const note = el.querySelector('.ruler-note, p')?.textContent || ''
      index.push({
        type: 'ruler',
        typeName: '君主',
        title: name,
        meta: '在位君主',
        sub: note,
        el,
      })
    })

    // 4. 朝代
    timeline.querySelectorAll('.banner-row').forEach((el) => {
      const name = el.querySelector('.banner-name')?.textContent || ''
      const dates = el.querySelector('.banner-dates')?.textContent || ''
      index.push({
        type: 'dynasty',
        typeName: '朝代',
        title: name,
        meta: dates,
        sub: '历史纪元',
        el,
      })
    })

    return index
  }

  let searchIndex = null
  let selectedSearchIndex = -1

  function performSearch(query) {
    const q = query.trim().toLowerCase()
    if (!q) {
      searchDropdown?.setAttribute('hidden', '')
      if (searchList) searchList.innerHTML = ''
      return
    }

    if (!searchIndex) {
      searchIndex = buildSearchIndex()
    }

    const matches = searchIndex
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.meta.toLowerCase().includes(q) ||
          item.sub.toLowerCase().includes(q)
        )
      })
      .slice(0, 10)

    if (!searchList || !searchDropdown) return
    searchList.innerHTML = ''
    selectedSearchIndex = -1

    if (matches.length === 0) {
      const emptyDiv = document.createElement('div')
      emptyDiv.className = 'search-no-result'
      emptyDiv.textContent = `未找到与「${query}」相关的历史人物或事件`
      searchList.appendChild(emptyDiv)
    } else {
      matches.forEach((item, idx) => {
        const itemBtn = document.createElement('div')
        itemBtn.className = 'search-result-item'
        itemBtn.dataset.idx = String(idx)

        const badge = document.createElement('span')
        badge.className = `search-item-badge badge-${item.type}`
        badge.textContent = item.typeName

        const title = document.createElement('span')
        title.className = 'search-item-title'
        title.textContent = item.title

        const meta = document.createElement('span')
        meta.className = 'search-item-year'
        meta.textContent = item.meta

        itemBtn.appendChild(badge)
        itemBtn.appendChild(title)
        itemBtn.appendChild(meta)

        itemBtn.addEventListener('click', () => {
          searchDropdown.setAttribute('hidden', '')
          highlightTarget(item.el)
        })

        searchList.appendChild(itemBtn)
      })
    }

    searchDropdown.removeAttribute('hidden')
  }

  if (searchInput && searchDropdown && searchList) {
    let debounceTimer = null
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        performSearch(searchInput.value)
      }, 120)
    })

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim()) {
        performSearch(searchInput.value)
      }
    })

    searchInput.addEventListener('keydown', (e) => {
      const items = [...searchList.querySelectorAll('.search-result-item')]
      if (items.length === 0) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        selectedSearchIndex = (selectedSearchIndex + 1) % items.length
        items.forEach((it, i) => it.classList.toggle('is-selected', i === selectedSearchIndex))
        items[selectedSearchIndex]?.scrollIntoView({ block: 'nearest' })
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        selectedSearchIndex = (selectedSearchIndex - 1 + items.length) % items.length
        items.forEach((it, i) => it.classList.toggle('is-selected', i === selectedSearchIndex))
        items[selectedSearchIndex]?.scrollIntoView({ block: 'nearest' })
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (selectedSearchIndex >= 0 && items[selectedSearchIndex]) {
          items[selectedSearchIndex].click()
        } else if (items[0]) {
          items[0].click()
        }
      } else if (e.key === 'Escape') {
        searchDropdown.setAttribute('hidden', '')
      }
    })

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.setAttribute('hidden', '')
      }
    })
  }

  // 快捷键 Ctrl+K / Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      searchInput?.focus()
      searchInput?.select()
    }
  })

  // ── 朝代微缩导航轨 (Minimap) 联动 ─────────────────────────────
  const minimapNodes = [...document.querySelectorAll('.minimap-node')]
  minimapNodes.forEach((node) => {
    node.addEventListener('click', () => {
      const dynastyId = node.dataset.dynastyId
      if (!dynastyId) return
      const target = timeline.querySelector(`.cell-china[data-dynasty~="${dynastyId}"]`)
      if (target) {
        highlightTarget(target)
      }
    })
  })

  const dynastyBanners = [...timeline.querySelectorAll('.banner-row')]
  if (dynastyBanners.length > 0 && minimapNodes.length > 0) {
    const minimapObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const bannerName = entry.target.querySelector('.banner-name')?.textContent.trim()
            if (bannerName) {
              minimapNodes.forEach((n) => {
                n.classList.toggle('is-active', n.dataset.name === bannerName)
              })
            }
          }
        }
      },
      { rootMargin: '-10% 0px -75% 0px', threshold: 0 }
    )
    dynastyBanners.forEach((b) => minimapObserver.observe(b))
  }

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

  /** 收集所有参与 grid 定位的元素并缓存其原始 gridRow */
  function collectGridItems() {
    const selectors = ['.cell', '.banner-row', '.civ-band']
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

  if (btnSortAsc && btnSortDesc) {
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
  }

  // ── LocalStorage 本地偏好持久化（默认从 LS 读取，点击保存按钮更新） ──
  const STORAGE_KEY = 'tenqiu_toolbar_settings'

  function loadSavedSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      return JSON.parse(raw)
    } catch (e) {
      console.warn('读取十丘本地偏好设置失败:', e)
      return null
    }
  }

  function saveCurrentSettings() {
    const settings = {
      levels: levelToggles.filter((t) => t.checked).map((t) => Number(t.value)),
      viewMode: btnGlobalSummary?.classList.contains('active') ? 'summary' : 'detail',
      sortOrder: btnSortDesc?.classList.contains('active') ? 'desc' : 'asc',
      showWorld: showWorld ? showWorld.checked : true,
      showFigures: showFigures ? showFigures.checked : false,
      figureFields: figFieldToggles.filter((t) => t.checked).map((t) => t.value),
      categories: catToggles.filter((t) => t.checked).map((t) => t.value),
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
      return true
    } catch (e) {
      console.warn('保存十丘本地偏好设置失败:', e)
      return false
    }
  }

  function applySavedSettingsToUI() {
    const settings = loadSavedSettings()
    if (!settings) return // 无本地存盘偏好时保持当前 HTML 的初始默认状态

    // 1. 等级筛选 (levels)
    if (Array.isArray(settings.levels)) {
      const levelSet = new Set(settings.levels)
      levelToggles.forEach((t) => {
        t.checked = levelSet.has(Number(t.value))
      })
    }

    // 2. 世界对照 (showWorld)
    if (typeof settings.showWorld === 'boolean' && showWorld) {
      showWorld.checked = settings.showWorld
    }

    // 3. 人物 (showFigures)
    if (typeof settings.showFigures === 'boolean' && showFigures) {
      showFigures.checked = settings.showFigures
    }

    // 3.1 人物领域 (figureFields)
    if (Array.isArray(settings.figureFields)) {
      const figFieldSet = new Set(settings.figureFields)
      figFieldToggles.forEach((t) => {
        t.checked = figFieldSet.has(t.value)
      })
    }

    // 4. 事件分类 (categories)
    if (Array.isArray(settings.categories)) {
      const catSet = new Set(settings.categories)
      catToggles.forEach((t) => {
        t.checked = catSet.has(t.value)
      })
    }

    // 5. 视图模式 (viewMode: 'summary' | 'detail')
    if (settings.viewMode === 'summary') {
      btnGlobalSummary?.classList.add('active')
      btnGlobalDetail?.classList.remove('active')
      toggleBtns.forEach((b) => setYearViewMode(b.dataset.year, 'summary'))
      syncGlobalButtons()
    } else if (settings.viewMode === 'detail') {
      btnGlobalDetail?.classList.add('active')
      btnGlobalSummary?.classList.remove('active')
      toggleBtns.forEach((b) => setYearViewMode(b.dataset.year, 'detail'))
      syncGlobalButtons()
    }

    // 6. 排序方向 (sortOrder: 'asc' | 'desc')
    if (settings.sortOrder === 'desc') {
      btnSortDesc?.classList.add('active')
      btnSortAsc?.classList.remove('active')
      applyOrder(true)
    } else if (settings.sortOrder === 'asc') {
      btnSortAsc?.classList.add('active')
      btnSortDesc?.classList.remove('active')
      applyOrder(false)
    }
  }

  // 绑定 [💾 保存为默认] 按钮点击事件
  const btnSaveSettings = document.getElementById('btn-save-settings')
  btnSaveSettings?.addEventListener('click', () => {
    const success = saveCurrentSettings()
    if (success) {
      btnSaveSettings.classList.add('saved-success')
      const origText = btnSaveSettings.textContent
      btnSaveSettings.textContent = '✓ 已保存默认'
      setTimeout(() => {
        btnSaveSettings.classList.remove('saved-success')
        btnSaveSettings.textContent = origText
      }, 2000)
    }
  })

  // 1. 初始化时先尝试恢复本地保存的偏好设置
  applySavedSettingsToUI()

  // 2. 应用全套可见性重算与 DOM 卡片排序
  apply()
}
