/**
 * 长卷交互。约 100 行原生 JavaScript，不引入前端框架。
 *
 * 渐进增强：本脚本全部失效时，页面仍是一份完整可读的时间线
 * （三栏俱在，仅开关失效）。对以阅读为主的项目，这是恰当的保证。
 */

const timeline = document.querySelector('.timeline')
if (timeline) {
  const onlyMajor = document.getElementById('only-major')
  const showWorld = document.getElementById('show-world')
  const showFigures = document.getElementById('show-figures')
  const catToggles = [...document.querySelectorAll('.cat-toggle')]
  const jump = document.getElementById('jump-dynasty')
  const current = document.getElementById('current-dynasty')

  /**
   * 重算各行可见性。
   *
   * 用 JavaScript 而非纯 CSS :has()——需要「当某行的事件被全部筛除时
   * 隐藏整行」，这依赖对子元素的计数，:has() 在此场景下既脆弱又难调试。
   */
  function apply() {
    const major = onlyMajor?.checked
    const active = new Set(catToggles.filter((t) => t.checked).map((t) => t.value))

    // 先决定每张卡片的去留
    for (const card of timeline.querySelectorAll('.event-card')) {
      const impOk = !major || Number(card.dataset.importance) >= 4
      const catOk = active.has(card.dataset.category)
      card.hidden = !(impOk && catOk)
    }

    // 再回扫各单元格：卡片全被筛除则隐藏该格
    for (const cell of timeline.querySelectorAll('.cell-china, .cell-world')) {
      const cards = cell.querySelectorAll('.event-card')
      const visible = [...cards].some((c) => !c.hidden)
      cell.classList.toggle('is-empty', cards.length > 0 && !visible)
    }

    timeline.classList.toggle('hide-world', showWorld && !showWorld.checked)

    // 人物图层默认关闭——人物数量远多于事件，常驻显示会淹没长卷本身
    timeline.classList.toggle('show-figures', !!showFigures?.checked)
  }

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
