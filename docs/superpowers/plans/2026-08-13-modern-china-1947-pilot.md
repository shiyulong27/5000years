# 1947 Modern China Reverse Pilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 1947 as the first reverse-order pilot year for the approved 1840-1948 China modern history event coverage plan.

**Architecture:** Work backward from completed 1948. Add a complete 1947 vertical slice: failing regression test, verified candidate plan, China events in `data/events/minguo.yaml`, world events in `data/world/modern.yaml`, `src/pages/1947.astro`, route registration in `Timeline.astro` and `AxisCell.astro`, and an appended `check.md` audit record. Preserve 1948 unchanged.

**Tech Stack:** Astro 5, Vitest, js-yaml, existing YAML loader and validator.

---

## File Map

- Modify `test/load.test.js`: add a 1947 reverse pilot regression block.
- Create `1947_events_plan.md`: candidate events, source audit, and verification notes.
- Modify `data/events/minguo.yaml`: append verified 1947 China events.
- Modify `data/world/modern.yaml`: append verified 1947 world events.
- Create `src/pages/1947.astro`: annual page wrapper around `AnnualEventsPage`.
- Modify `src/components/Timeline.astro`: add `1947` to `summaryYears`.
- Modify `src/components/AxisCell.astro`: add `1947` to `hasSummary`.
- Append `check.md`: record baseline, sources read, data changes, unresolved gaps, and verification results.

## 1947 Target Event Set

China events:

| ID | Date | Title | Category | Importance |
|---|---|---|---|---:|
| `cn-feb28-incident-194702` | `1947-02-28` | 台湾发生二二八事件 | 政治 | 5 |
| `cn-inner-mongolia-autonomous-government-194705` | `1947-05-01` | 内蒙古自治政府成立 | 政治 | 4 |
| `cn-liu-deng-dabie-mountains-194706` | `1947-06-30` | 刘邓大军千里跃进大别山 | 战争 | 5 |
| `cn-land-law-outline-194710` | `1947-10-10` | 《中国土地法大纲》公布 | 政治 | 5 |
| `cn-taiwan-constitution-election-194711` | `1947-11-21` | 行宪国民大会代表选举举行 | 政治 | 4 |

World events:

| ID | Date | Title | Category | Importance |
|---|---|---|---|---:|
| `w-truman-doctrine-194703` | `1947-03-12` | 杜鲁门主义提出 | 政治 | 5 |
| `w-india-pakistan-independence-194708` | `1947-08-15` | 印度和巴基斯坦分治独立 | 政治 | 5 |
| `w-marshall-plan-speech-194706` | `1947-06-05` | 马歇尔提出欧洲复兴计划 | 经济 | 5 |
| `w-imf-world-bank-begin-194703` | `1947-03-01` | 国际货币基金组织和世界银行开始运作 | 经济 | 4 |
| `w-gatt-signed-194710` | `1947-10-30` | 《关税与贸易总协定》签署 | 经济 | 5 |
| `w-un-palestine-partition-194711` | `1947-11-29` | 联合国通过巴勒斯坦分治决议 | 政治 | 5 |

These are starting candidates. During implementation, read accessible source bodies before writing data. If a candidate cannot be verified from accessible authoritative or Wikipedia sources, drop it and update the test and `1947_events_plan.md` before continuing.

### Task 1: Add Failing 1947 Regression Test

**Files:**
- Modify: `test/load.test.js`

- [ ] **Step 1: Insert the failing test block after the 1989 block**

Add this block after `describe('1989 年重大事件补全', ...)` and before `describe('1970 年重大事件补全', ...)`:

```js
describe('1947 年重大事件补全倒序试点', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const chinaEvents = data.events.filter((event) => String(event.date).startsWith('1947'))
  const worldEvents = data.worldEvents.filter((event) => String(event.date).startsWith('1947'))
  const requiredFields = [
    'id', 'date', 'title', 'category', 'importance',
    'summary', 'confidence', 'tags', 'sources',
  ]

  it('包含已确认的 5 条中国事件和 6 条世界事件，且字段完整', () => {
    expect(chinaEvents).toHaveLength(5)
    expect(worldEvents).toHaveLength(6)

    for (const event of [...chinaEvents, ...worldEvents]) {
      for (const field of requiredFields) {
        expect(event, `${event.id ?? event.title ?? '未知事件'} 缺少 ${field}`).toHaveProperty(field)
      }
      expect(event.importance).toBeGreaterThanOrEqual(1)
      expect(event.importance).toBeLessThanOrEqual(5)
      expect(event.confidence).toBe('确定')
      expect(event.tags.length).toBeGreaterThan(0)
      expect(event.sources.length).toBeGreaterThan(1)
    }
  })

  it('包含二二八事件、跃进大别山、土地法大纲、杜鲁门主义、印巴分治和巴勒斯坦分治决议', () => {
    const ids = [...chinaEvents, ...worldEvents].map((event) => event.id)
    expect(ids).toEqual(expect.arrayContaining([
      'cn-feb28-incident-194702',
      'cn-liu-deng-dabie-mountains-194706',
      'cn-land-law-outline-194710',
      'w-truman-doctrine-194703',
      'w-india-pakistan-independence-194708',
      'w-un-palestine-partition-194711',
    ]))
  })

  it('存在 1947 年专页并注册两个主时间线入口', () => {
    expect(fs.existsSync(path.join(ROOT, 'src/pages/1947.astro'))).toBe(true)

    const timeline = fs.readFileSync(path.join(ROOT, 'src/components/Timeline.astro'), 'utf8')
    const axisCell = fs.readFileSync(path.join(ROOT, 'src/components/AxisCell.astro'), 'utf8')
    expect(timeline).toMatch(/summaryYears\s*=\s*\[[^\]]*1947/)
    expect(axisCell).toMatch(/hasSummary\s*=\s*\[[^\]]*1947/)
  })
})
```

- [ ] **Step 2: Run the new test and verify failure**

Run:

```bash
npm test -- test/load.test.js
```

Expected: fail in the new 1947 block because current data has no complete 1947 event set, no `src/pages/1947.astro`, and no route registration.

- [ ] **Step 3: Commit the failing test**

Run:

```bash
git add test/load.test.js
git commit -m "test: define 1947 event coverage"
```

### Task 2: Create 1947 Candidate Plan and Verify Sources

**Files:**
- Create: `1947_events_plan.md`

- [ ] **Step 1: Create the candidate plan**

Create `1947_events_plan.md` with this content:

```markdown
# 1947 年重大事件候选与核验计划

## 目标

补全 1947 年中国与世界重大事件，作为从 1948 年向前倒序推进的第一个试点。

## 中国候选

| 日期 | 事件 | 拟定 ID | 分类 | 重要度 | 核验来源 |
|---|---|---|---|---:|---|
| 1947-02-28 | 台湾发生二二八事件 | cn-feb28-incident-194702 | 政治 | 5 | 中文维基百科；英文维基百科；台湾地区公开资料 |
| 1947-05-01 | 内蒙古自治政府成立 | cn-inner-mongolia-autonomous-government-194705 | 政治 | 4 | 新华网或人民网资料；中文维基百科 |
| 1947-06-30 | 刘邓大军千里跃进大别山 | cn-liu-deng-dabie-mountains-194706 | 战争 | 5 | 中国共产党新闻网；中文维基百科 |
| 1947-10-10 | 《中国土地法大纲》公布 | cn-land-law-outline-194710 | 政治 | 5 | 中国共产党新闻网；中文维基百科 |
| 1947-11-21 | 行宪国民大会代表选举举行 | cn-taiwan-constitution-election-194711 | 政治 | 4 | 中文维基百科；英文维基百科 |

## 世界候选

| 日期 | 事件 | 拟定 ID | 分类 | 重要度 | 核验来源 |
|---|---|---|---|---:|---|
| 1947-03-01 | 国际货币基金组织和世界银行开始运作 | w-imf-world-bank-begin-194703 | 经济 | 4 | IMF；World Bank；英文维基百科 |
| 1947-03-12 | 杜鲁门主义提出 | w-truman-doctrine-194703 | 政治 | 5 | Truman Library；英文维基百科 |
| 1947-06-05 | 马歇尔提出欧洲复兴计划 | w-marshall-plan-speech-194706 | 经济 | 5 | OECD 或 Marshall Foundation；英文维基百科 |
| 1947-08-15 | 印度和巴基斯坦分治独立 | w-india-pakistan-independence-194708 | 政治 | 5 | 英文维基百科；Britannica 或英国议会资料 |
| 1947-10-30 | 《关税与贸易总协定》签署 | w-gatt-signed-194710 | 经济 | 5 | WTO；英文维基百科 |
| 1947-11-29 | 联合国通过巴勒斯坦分治决议 | w-un-palestine-partition-194711 | 政治 | 5 | United Nations；英文维基百科 |

## 来源审计

- 待读取正文：
  - 中文维基百科 1947 年页面
  - 英文维基百科 1947 年页面
  - 中国共产党新闻网或人民网相关资料页
  - Truman Library 杜鲁门主义资料页
  - WTO GATT 资料页
  - United Nations 巴勒斯坦分治决议资料页
- 未找到或不可访问来源：
  - 无

## 验收

- 中国事件 5 条。
- 世界事件 6 条。
- 1947 年专页和主时间线入口存在。
- `npm run validate` 通过。
- `npm test -- test/load.test.js` 通过。
```

- [ ] **Step 2: Read source bodies**

Use web search/browser tools to read accessible bodies for the sources listed in `1947_events_plan.md`. Do not rely on snippets. For each candidate, confirm date, subject, and consequence.

- [ ] **Step 3: Update source audit**

Edit `1947_events_plan.md` so `来源审计` lists actual URLs read and any unavailable source. If any event is dropped, update the target counts in `test/load.test.js` before continuing.

- [ ] **Step 4: Commit the candidate plan**

Run:

```bash
git add 1947_events_plan.md
git commit -m "docs: plan 1947 event candidates"
```

### Task 3: Add 1947 Data

**Files:**
- Modify: `data/events/minguo.yaml`
- Modify: `data/world/modern.yaml`

- [ ] **Step 1: Append 1947 China events to `data/events/minguo.yaml`**

Append the verified entries below after the existing pre-1948 `minguo.yaml` entries and before the 1948 block if preserving chronological order is convenient. Otherwise append at the end of `minguo.yaml`; the loader sorts by event date for rendering.

```yaml
- id: cn-feb28-incident-194702
  date: '1947-02-28'
  title: 台湾发生二二八事件
  category: 政治
  importance: 5
  summary: 台湾因查缉私烟引发冲突并扩展为全岛性抗议和镇压，造成大量人员伤亡，深刻影响战后台湾政治与社会记忆。
  confidence: 确定
  tags:
    - 台湾
    - 二二八事件
    - 战后政治
  sources:
    - 中文维基百科
    - 英文维基百科

- id: cn-inner-mongolia-autonomous-government-194705
  date: '1947-05-01'
  title: 内蒙古自治政府成立
  category: 政治
  importance: 4
  summary: 内蒙古自治政府在乌兰浩特成立，是中国共产党领导下民族区域自治实践的重要早期节点，并为后来的内蒙古自治区建制奠定基础。
  confidence: 确定
  tags:
    - 内蒙古
    - 民族区域自治
    - 边疆
  sources:
    - 新华网
    - 中文维基百科

- id: cn-liu-deng-dabie-mountains-194706
  date: '1947-06-30'
  title: 刘邓大军千里跃进大别山
  category: 战争
  importance: 5
  summary: 刘伯承、邓小平率晋冀鲁豫野战军主力强渡黄河，向大别山实施战略跃进，揭开人民解放军由战略防御转入战略进攻的序幕。
  confidence: 确定
  tags:
    - 解放战争
    - 大别山
    - 战略进攻
  sources:
    - 中国共产党新闻网
    - 中文维基百科

- id: cn-land-law-outline-194710
  date: '1947-10-10'
  title: 《中国土地法大纲》公布
  category: 政治
  importance: 5
  summary: 中共中央公布《中国土地法大纲》，明确废除封建性及半封建性剥削土地制度，推动解放区土地改革进入系统展开阶段。
  confidence: 确定
  tags:
    - 土地改革
    - 解放区
    - 制度变革
  sources:
    - 中国共产党新闻网
    - 中文维基百科

- id: cn-taiwan-constitution-election-194711
  date: '1947-11-21'
  title: 行宪国民大会代表选举举行
  category: 政治
  importance: 4
  summary: 中华民国举行行宪国民大会代表选举，作为 1947 年宪法施行前后的制度安排之一，反映国民政府战后宪政转轨尝试。
  confidence: 确定
  tags:
    - 行宪
    - 国民大会
    - 民国政治
  sources:
    - 中文维基百科
    - 英文维基百科
```

- [ ] **Step 2: Append 1947 world events to `data/world/modern.yaml`**

Append the verified entries below near the existing early modern entries or at the file end:

```yaml
- id: w-imf-world-bank-begin-194703
  date: '1947-03-01'
  title: 国际货币基金组织和世界银行开始运作
  category: 经济
  importance: 4
  summary: 国际货币基金组织和世界银行在布雷顿森林体系框架下开始实际运作，成为战后国际金融和发展治理的重要机构基础。
  confidence: 确定
  tags:
    - IMF
    - 世界银行
    - 布雷顿森林体系
  sources:
    - IMF
    - World Bank

- id: w-truman-doctrine-194703
  date: '1947-03-12'
  title: 杜鲁门主义提出
  category: 政治
  importance: 5
  summary: 美国总统杜鲁门在国会演说中提出援助希腊和土耳其以遏制共产主义扩张的政策，标志冷战遏制战略公开成形。
  confidence: 确定
  tags:
    - 冷战
    - 美国
    - 遏制政策
  sources:
    - Truman Library
    - 英文维基百科

- id: w-marshall-plan-speech-194706
  date: '1947-06-05'
  title: 马歇尔提出欧洲复兴计划
  category: 经济
  importance: 5
  summary: 美国国务卿乔治·马歇尔在哈佛大学演说中提出援助欧洲复兴的计划，成为战后西欧重建和冷战阵营形成的重要经济安排。
  confidence: 确定
  tags:
    - 马歇尔计划
    - 欧洲复兴
    - 冷战
  sources:
    - Marshall Foundation
    - 英文维基百科

- id: w-india-pakistan-independence-194708
  date: '1947-08-15'
  title: 印度和巴基斯坦分治独立
  category: 政治
  importance: 5
  summary: 英属印度分治为印度和巴基斯坦两个独立国家，结束英国在南亚的殖民统治，同时引发大规模迁徙和暴力冲突。
  confidence: 确定
  tags:
    - 印巴分治
    - 去殖民化
    - 南亚
  sources:
    - 英文维基百科
    - Britannica

- id: w-gatt-signed-194710
  date: '1947-10-30'
  title: 《关税与贸易总协定》签署
  category: 经济
  importance: 5
  summary: 23 个缔约方在日内瓦签署《关税与贸易总协定》，为战后多边贸易规则奠定基础，并成为世界贸易组织的制度前身。
  confidence: 确定
  tags:
    - GATT
    - 国际贸易
    - 多边规则
  sources:
    - WTO
    - 英文维基百科

- id: w-un-palestine-partition-194711
  date: '1947-11-29'
  title: 联合国通过巴勒斯坦分治决议
  category: 政治
  importance: 5
  summary: 联合国大会通过第 181 号决议，建议在巴勒斯坦分别建立犹太国家和阿拉伯国家，成为随后中东冲突格局的重要制度节点。
  confidence: 确定
  tags:
    - 联合国
    - 巴勒斯坦
    - 中东
  sources:
    - United Nations
    - 英文维基百科
```

- [ ] **Step 3: Run validation and targeted test**

Run:

```bash
npm run validate
npm test -- test/load.test.js
```

Expected: validation passes; `test/load.test.js` still fails only on missing page/route registration if Task 4 has not run yet.

- [ ] **Step 4: Commit data changes**

Run:

```bash
git add data/events/minguo.yaml data/world/modern.yaml
git commit -m "feat: add 1947 event data"
```

### Task 4: Add 1947 Page and Timeline Registration

**Files:**
- Create: `src/pages/1947.astro`
- Modify: `src/components/Timeline.astro`
- Modify: `src/components/AxisCell.astro`

- [ ] **Step 1: Create the 1947 annual page**

Create `src/pages/1947.astro`:

```astro
---
import AnnualEventsPage from '../components/AnnualEventsPage.astro'
---

<AnnualEventsPage year={1947} />
```

- [ ] **Step 2: Add 1947 to `summaryYears`**

In `src/components/Timeline.astro`, add `1947` immediately before `1948` in the existing `summaryYears` array:

```js
const summaryYears = [1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]
```

- [ ] **Step 3: Add 1947 to `hasSummary`**

In `src/components/AxisCell.astro`, add `1947` immediately before `1948` in the existing `hasSummary` array:

```js
const hasSummary = [1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].includes(year)
```

- [ ] **Step 4: Run the targeted test**

Run:

```bash
npm test -- test/load.test.js
```

Expected: the new 1947 tests pass. If unrelated tests in `test/load.test.js` fail, inspect and fix only if caused by 1947 changes.

- [ ] **Step 5: Commit page and route changes**

Run:

```bash
git add src/pages/1947.astro src/components/Timeline.astro src/components/AxisCell.astro
git commit -m "feat: add 1947 annual page"
```

### Task 5: Append Audit Record

**Files:**
- Modify: `check.md`

- [ ] **Step 1: Append a 1947 audit section to `check.md`**

Append this section after the current final section in `check.md`. Replace the instruction text in source and verification lines with concrete URLs and concrete command results before committing.

```markdown

## 1947 年事件补全审查（2026-08-13）

- 审查范围：1947 年中国事件 5 条、世界事件 6 条；其中五星 7 条、四星 4 条。
- 数据文件：中国事件写入 `data/events/minguo.yaml`，世界事件写入 `data/world/modern.yaml`。
- 页面与路由：新增 `src/pages/1947.astro`，并在 `Timeline.astro` 与 `AxisCell.astro` 注册 1947 年入口。
- 已读取来源正文：
  - 中文维基百科 1947 年页面：https://zh.wikipedia.org/wiki/1947年
  - 英文维基百科 1947 年页面：https://en.wikipedia.org/wiki/1947
  - 中国共产党新闻网或人民网相关资料页：写入 Task 2 实际读取 URL
  - Truman Library 杜鲁门主义资料页：写入 Task 2 实际读取 URL
  - WTO GATT 资料页：写入 Task 2 实际读取 URL
  - United Nations 巴勒斯坦分治决议资料页：写入 Task 2 实际读取 URL
- 修改记录：
  - 新增 5 条 1947 年中国事件：二二八事件、内蒙古自治政府成立、刘邓大军跃进大别山、《中国土地法大纲》公布、行宪国民大会代表选举。
  - 新增 6 条 1947 年世界事件：IMF 和世界银行开始运作、杜鲁门主义、马歇尔计划演说、印巴分治独立、GATT 签署、联合国巴勒斯坦分治决议。
- 配图说明：本试点不新增图片；后续若为五星事件补图，须另行核验 Commons 文件页、作者和许可。
- 未解决问题：本年暂不处理配图；若来源无法访问，已在 `1947_events_plan.md` 中记录。
- 验证：
  - `npm run validate`：写入实际结果
  - `npm test -- test/load.test.js`：写入实际结果
  - `npm test`：写入基线已知失败或通过结果
```

- [ ] **Step 2: Confirm no instruction text remains in `check.md`**

Search:

```bash
rg -n "写入 Task|写入实际结果|实际读取 URL" check.md
```

Expected: no matches after editing.

- [ ] **Step 3: Commit audit record**

Run:

```bash
git add check.md
git commit -m "docs: audit 1947 event coverage"
```

### Task 6: Final Pilot Verification

**Files:**
- Read-only verification across repository.

- [ ] **Step 1: Run schema validation**

Run:

```bash
npm run validate
```

Expected: exit code 0.

- [ ] **Step 2: Run targeted test**

Run:

```bash
npm test -- test/load.test.js
```

Expected: exit code 0.

- [ ] **Step 3: Run full test suite**

Run:

```bash
npm test
```

Expected: existing unrelated baseline failures may remain:

- `test/2020-2024-event-images.test.js` missing `public/images/events/2024/change6_commons.jpg`
- `test/2025-event-images.test.js` missing local 2025 image files such as `cn-deepseek-202501`
- `test/xia-content.test.js` pending Xia content work

No new 1947-related failures should appear.

- [ ] **Step 4: Inspect final state**

Run:

```bash
git status --short
git log --oneline -8
```

Expected: intended changes are committed in the worktree branch; unrelated untracked files remain untouched in the parent repository.

## Plan Self-Review

- Spec coverage: This plan implements the approved reverse-order starting point for 1921-1947 annual coverage by completing 1947 first.
- Deferred scope: 1946 and earlier years are intentionally deferred until the 1947 pilot is reviewed.
- Placeholder scan: The plan contains no angle-bracket placeholders. Task 5 requires concrete URLs and concrete command results before committing the audit.
- Type consistency: Test field names match `loadAll()` output and existing YAML schema.
