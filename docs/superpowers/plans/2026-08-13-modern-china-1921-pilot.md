# 1921 Modern China Pilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the 1921 pilot year for the approved 1840-1948 China modern history event coverage plan.

**Architecture:** Use 1921 as a complete vertical slice: test first, verify current failure, add China events to `data/events/minguo.yaml`, add world events to `data/world/modern.yaml`, create a `src/pages/1921.astro` annual page, register the timeline route arrays, and append a `check.md` audit entry. Keep 1948 untouched and reuse `AnnualEventsPage`.

**Tech Stack:** Astro 5, Vitest, js-yaml, existing YAML data loader and validator.

---

## File Map

- Modify `test/load.test.js`: add a 1921 pilot regression block using the same style as the existing 1989 and 1970 tests.
- Modify `data/events/minguo.yaml`: supplement and normalize 1921 Chinese events.
- Modify `data/world/modern.yaml`: add 1921 world events.
- Create `src/pages/1921.astro`: annual page wrapper around `AnnualEventsPage`.
- Modify `src/components/Timeline.astro`: add `1921` to `summaryYears`.
- Modify `src/components/AxisCell.astro`: add `1921` to `hasSummary`.
- Append `check.md`: record sources read, changes made, unresolved image/source gaps, and verification results.
- Create `1921_events_plan.md`: candidate list and implementation notes for the pilot year.

## 1921 Target Event Set

China events:

| ID | Date | Title | Category | Importance |
|---|---|---|---|---:|
| `cn-cpc-founding-192107` | `1921-07-23` | 中国共产党第一次全国代表大会召开 | 政治 | 5 |
| `cn-cpc-founding-conclusion-192108` | `1921-08-03` | 中共一大在嘉兴南湖闭幕 | 政治 | 5 |
| `cn-mongolian-revolution-192103` | `1921-03-18` | 外蒙古人民革命政府建立 | 政治 | 4 |
| `cn-guangzhou-government-192105` | `1921-05-05` | 孙中山在广州就任非常大总统 | 政治 | 4 |
| `cn-hk-seamen-strike-192109` | `1921-09` | 香港海员筹备大罢工 | 经济 | 4 |

World events:

| ID | Date | Title | Category | Importance |
|---|---|---|---|---:|
| `w-irish-treaty-192112` | `1921-12-06` | 《英爱条约》签署 | 政治 | 5 |
| `w-washington-naval-conference-192111` | `1921-11-12` | 华盛顿会议开幕 | 政治 | 4 |
| `w-ussr-new-economic-policy-192103` | `1921-03` | 苏俄实行新经济政策 | 经济 | 4 |
| `w-rif-war-battle-annual-192107` | `1921-07-22` | 安瓦尔战役重创西班牙殖民军 | 战争 | 4 |
| `w-tulsa-race-massacre-192105` | `1921-05-31` | 塔尔萨种族屠杀 | 灾害 | 4 |
| `w-insulin-first-success-192108` | `1921-08` | 胰岛素实验取得关键突破 | 文化 | 4 |

These are starting candidates. During implementation, read accessible source bodies before writing data. If a candidate cannot be verified from accessible authoritative or Wikipedia sources, drop it and update both the test and `1921_events_plan.md` with the reason.

### Task 1: Add Failing 1921 Regression Test

**Files:**
- Modify: `test/load.test.js`

- [ ] **Step 1: Insert the failing test block after the 1989 block**

Add this block after `describe('1989 年重大事件补全', ...)` and before `describe('1970 年重大事件补全', ...)`:

```js
describe('1921 年重大事件补全试点', () => {
  const data = loadAll(path.join(ROOT, 'data'))
  const chinaEvents = data.events.filter((event) => String(event.date).startsWith('1921'))
  const worldEvents = data.worldEvents.filter((event) => String(event.date).startsWith('1921'))
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

  it('包含中共一大、广州非常政府、英爱条约、华盛顿会议和新经济政策', () => {
    const ids = [...chinaEvents, ...worldEvents].map((event) => event.id)
    expect(ids).toEqual(expect.arrayContaining([
      'cn-cpc-founding-192107',
      'cn-guangzhou-government-192105',
      'w-irish-treaty-192112',
      'w-washington-naval-conference-192111',
      'w-ussr-new-economic-policy-192103',
    ]))
  })

  it('存在 1921 年专页并注册两个主时间线入口', () => {
    expect(fs.existsSync(path.join(ROOT, 'src/pages/1921.astro'))).toBe(true)

    const timeline = fs.readFileSync(path.join(ROOT, 'src/components/Timeline.astro'), 'utf8')
    const axisCell = fs.readFileSync(path.join(ROOT, 'src/components/AxisCell.astro'), 'utf8')
    expect(timeline).toMatch(/summaryYears\s*=\s*\[[^\]]*1921/)
    expect(axisCell).toMatch(/hasSummary\s*=\s*\[[^\]]*1921/)
  })
})
```

- [ ] **Step 2: Run the new test and verify failure**

Run:

```bash
npm test -- test/load.test.js
```

Expected: fail in the new 1921 block because current data has only one 1921 China event, zero 1921 world events, no `src/pages/1921.astro`, and no route registration.

- [ ] **Step 3: Commit the failing test**

Run:

```bash
git add test/load.test.js
git commit -m "test: define 1921 event coverage"
```

### Task 2: Create 1921 Candidate Plan and Verify Sources

**Files:**
- Create: `1921_events_plan.md`

- [ ] **Step 1: Create the candidate plan**

Create `1921_events_plan.md` with this structure:

```markdown
# 1921 年重大事件候选与核验计划

## 目标

补全 1921 年中国与世界重大事件，作为中国近代史 1921-1947 逐年覆盖的试点。

## 中国候选

| 日期 | 事件 | 拟定 ID | 分类 | 重要度 | 核验来源 |
|---|---|---|---|---:|---|
| 1921-07-23 | 中国共产党第一次全国代表大会召开 | cn-cpc-founding-192107 | 政治 | 5 | 中国共产党新闻网；中文维基百科 |
| 1921-08-03 | 中共一大在嘉兴南湖闭幕 | cn-cpc-founding-conclusion-192108 | 政治 | 5 | 中国共产党新闻网；嘉兴南湖革命纪念馆 |
| 1921-03-18 | 外蒙古人民革命政府建立 | cn-mongolian-revolution-192103 | 政治 | 4 | 中文维基百科；英文维基百科 |
| 1921-05-05 | 孙中山在广州就任非常大总统 | cn-guangzhou-government-192105 | 政治 | 4 | 中文维基百科；孙中山故居纪念馆或政府资料 |
| 1921-09 | 香港海员筹备大罢工 | cn-hk-seamen-strike-192109 | 经济 | 4 | 中国工运史资料；中文维基百科 |

## 世界候选

| 日期 | 事件 | 拟定 ID | 分类 | 重要度 | 核验来源 |
|---|---|---|---|---:|---|
| 1921-12-06 | 《英爱条约》签署 | w-irish-treaty-192112 | 政治 | 5 | 英文维基百科；英国/爱尔兰机构资料 |
| 1921-11-12 | 华盛顿会议开幕 | w-washington-naval-conference-192111 | 政治 | 4 | 英文维基百科；美国国务院历史资料 |
| 1921-03 | 苏俄实行新经济政策 | w-ussr-new-economic-policy-192103 | 经济 | 4 | 英文维基百科；百科事件页 |
| 1921-07-22 | 安瓦尔战役重创西班牙殖民军 | w-rif-war-battle-annual-192107 | 战争 | 4 | 英文维基百科；事件页 |
| 1921-05-31 | 塔尔萨种族屠杀 | w-tulsa-race-massacre-192105 | 灾害 | 4 | 英文维基百科；Tulsa Historical Society |
| 1921-08 | 胰岛素实验取得关键突破 | w-insulin-first-success-192108 | 文化 | 4 | 英文维基百科；诺贝尔奖或医学史资料 |

## 来源审计

- 待读取正文：
  - 中文维基百科 1921 年页面
  - 英文维基百科 1921 年页面
  - 中国共产党新闻网中共一大资料页
  - 华盛顿会议或美国国务院历史资料页
  - 英爱条约资料页
- 未找到或不可访问来源：
  - 无

## 验收

- 中国事件 5 条。
- 世界事件 6 条。
- 1921 年专页和主时间线入口存在。
- `npm run validate` 通过。
- `npm test -- test/load.test.js` 通过。
```

- [ ] **Step 2: Read source bodies**

Use web search/browser tools to read accessible bodies for the sources listed in `1921_events_plan.md`. Do not rely on snippets. For each candidate, confirm date, subject, and consequence.

- [ ] **Step 3: Update source audit**

Edit `1921_events_plan.md` so `来源审计` lists the actual URLs read and any unavailable source. If any target event is dropped, update the target counts in the test before continuing.

- [ ] **Step 4: Commit the candidate plan**

Run:

```bash
git add 1921_events_plan.md
git commit -m "docs: plan 1921 event candidates"
```

### Task 3: Add 1921 Data

**Files:**
- Modify: `data/events/minguo.yaml`
- Modify: `data/world/modern.yaml`

- [ ] **Step 1: Update existing 1921 China event in `minguo.yaml`**

Find the existing `cpc-founding-1921` entry and replace it with the normalized entry below. This intentionally renames the ID to the `cn-` style used by annual event coverage.

```yaml
- id: cn-cpc-founding-192107
  date: "1921-07-23"
  title: 中国共产党第一次全国代表大会召开
  category: 政治
  tags: [建党, 中共一大, 历史转折]
  importance: 5
  summary: 中国共产党第一次全国代表大会在上海法租界望志路召开，来自各地共产党早期组织的代表出席会议，标志着中国共产党的正式创建进入组织化阶段。
  confidence: 确定
  sources: [中国共产党新闻网, 中文维基百科]
```

- [ ] **Step 2: Append the remaining 1921 China events after the normalized entry**

```yaml
- id: cn-cpc-founding-conclusion-192108
  date: "1921-08-03"
  title: 中共一大在嘉兴南湖闭幕
  category: 政治
  tags: [建党, 嘉兴南湖, 历史转折]
  importance: 5
  summary: 中共一大最后阶段转移至浙江嘉兴南湖游船上举行，会议通过党的纲领和决议，选举产生中央局，完成中国共产党创建的组织程序。
  confidence: 确定
  sources: [中国共产党新闻网, 嘉兴南湖革命纪念馆]

- id: cn-mongolian-revolution-192103
  date: "1921-03-18"
  title: 外蒙古人民革命政府建立
  category: 政治
  tags: [外蒙古, 革命, 边疆]
  importance: 4
  summary: 1921 年蒙古革命中，外蒙古革命力量在苏俄支持下建立人民革命政府，随后改变外蒙古政治走向，成为近代中国边疆格局变化的重要节点。
  confidence: 确定
  sources: [中文维基百科, 英文维基百科]

- id: cn-guangzhou-government-192105
  date: "1921-05-05"
  title: 孙中山在广州就任非常大总统
  category: 政治
  tags: [孙中山, 护法运动, 广州政府]
  importance: 4
  summary: 孙中山在广州就任中华民国非常大总统，继续推动护法运动并与北洋政府对峙，体现民国初年南北政治分裂格局。
  confidence: 确定
  sources: [中文维基百科, 孙中山故居纪念馆]

- id: cn-hk-seamen-strike-192109
  date: "1921-09"
  title: 香港海员筹备大罢工
  category: 经济
  tags: [工人运动, 香港, 海员]
  importance: 4
  summary: 香港海员工会在 1921 年下半年推动改善工资待遇和劳动条件的组织动员，次年发展为香港海员大罢工，成为中国早期工人运动的重要前奏。
  confidence: 确定
  sources: [中国工运史资料, 中文维基百科]
```

- [ ] **Step 3: Append 1921 world events to `data/world/modern.yaml`**

Add these entries near other early modern world records or at the end of the file, preserving valid YAML:

```yaml
- id: w-ussr-new-economic-policy-192103
  date: '1921-03'
  title: 苏俄实行新经济政策
  category: 经济
  importance: 4
  summary: 俄共（布）第十次代表大会后，苏俄以粮食税替代余粮收集制，并允许一定范围的市场交换和私营经济活动，以恢复内战后的经济秩序。
  confidence: 确定
  tags:
    - 苏俄
    - 新经济政策
    - 经济改革
  sources:
    - 英文维基百科
    - 中文维基百科

- id: w-tulsa-race-massacre-192105
  date: '1921-05-31'
  title: 塔尔萨种族屠杀爆发
  category: 灾害
  importance: 4
  summary: 美国俄克拉何马州塔尔萨市格林伍德区发生针对非裔社区的大规模暴力袭击，造成重大人员伤亡和社区毁坏，成为美国种族暴力史上的重要事件。
  confidence: 确定
  tags:
    - 美国
    - 种族暴力
    - 塔尔萨
  sources:
    - 英文维基百科
    - Tulsa Historical Society

- id: w-rif-war-battle-annual-192107
  date: '1921-07-22'
  title: 安瓦尔战役重创西班牙殖民军
  category: 战争
  importance: 4
  summary: 里夫战争中，阿卜杜勒·克里姆领导的里夫武装在安瓦尔战役击败西班牙军队，重挫西班牙在摩洛哥北部的殖民统治。
  confidence: 确定
  tags:
    - 里夫战争
    - 摩洛哥
    - 殖民战争
  sources:
    - 英文维基百科
    - 中文维基百科

- id: w-insulin-first-success-192108
  date: '1921-08'
  title: 胰岛素实验取得关键突破
  category: 文化
  importance: 4
  summary: 班廷、贝斯特等人在多伦多完成胰岛素提取和动物实验关键突破，为糖尿病治疗带来根本改变，并推动随后的人体临床应用。
  confidence: 确定
  tags:
    - 医学
    - 胰岛素
    - 糖尿病
  sources:
    - 英文维基百科
    - 诺贝尔奖官网

- id: w-washington-naval-conference-192111
  date: '1921-11-12'
  title: 华盛顿会议开幕
  category: 政治
  importance: 4
  summary: 美国、英国、日本、中国等国在华盛顿召开会议，讨论海军军备限制和太平洋、远东问题，随后形成华盛顿体系的重要条约安排。
  confidence: 确定
  tags:
    - 华盛顿会议
    - 军备限制
    - 国际秩序
  sources:
    - 英文维基百科
    - 美国国务院历史资料

- id: w-irish-treaty-192112
  date: '1921-12-06'
  title: 《英爱条约》签署
  category: 政治
  importance: 5
  summary: 英国政府与爱尔兰代表签署《英爱条约》，结束爱尔兰独立战争并建立爱尔兰自由邦的制度基础，重塑英国与爱尔兰关系。
  confidence: 确定
  tags:
    - 爱尔兰
    - 英爱条约
    - 民族独立
  sources:
    - 英文维基百科
    - 爱尔兰国家档案馆
```

- [ ] **Step 4: Run validation and the targeted test**

Run:

```bash
npm run validate
npm test -- test/load.test.js
```

Expected: validation passes; `test/load.test.js` still fails only on missing page/route registration if Task 4 has not run yet.

- [ ] **Step 5: Commit data changes**

Run:

```bash
git add data/events/minguo.yaml data/world/modern.yaml
git commit -m "feat: add 1921 event data"
```

### Task 4: Add 1921 Page and Timeline Registration

**Files:**
- Create: `src/pages/1921.astro`
- Modify: `src/components/Timeline.astro`
- Modify: `src/components/AxisCell.astro`

- [ ] **Step 1: Create the 1921 annual page**

Create `src/pages/1921.astro`:

```astro
---
import AnnualEventsPage from '../components/AnnualEventsPage.astro'
---

<AnnualEventsPage year={1921} />
```

- [ ] **Step 2: Add 1921 to `summaryYears`**

In `src/components/Timeline.astro`, add `1921` at the beginning of the existing `summaryYears` array:

```js
const summaryYears = [1921, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]
```

- [ ] **Step 3: Add 1921 to `hasSummary`**

In `src/components/AxisCell.astro`, add `1921` at the beginning of the existing `hasSummary` array:

```js
const hasSummary = [1921, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].includes(year)
```

- [ ] **Step 4: Run the targeted test**

Run:

```bash
npm test -- test/load.test.js
```

Expected: the new 1921 tests pass. If unrelated tests in `test/load.test.js` fail, inspect and fix only if caused by the 1921 changes.

- [ ] **Step 5: Commit page and route changes**

Run:

```bash
git add src/pages/1921.astro src/components/Timeline.astro src/components/AxisCell.astro
git commit -m "feat: add 1921 annual page"
```

### Task 5: Append Audit Record

**Files:**
- Modify: `check.md`

- [ ] **Step 1: Append a 1921 audit section to `check.md`**

Append this section after the current final section in `check.md`. In the `已读取来源正文` list, use the exact URL lines already written into `1921_events_plan.md` during Task 2. Do not commit the audit record until each source line contains a real URL and each verification line contains the real command result.

```markdown

## 1921 年事件补全审查（2026-08-13）

- 审查范围：1921 年中国事件 5 条、世界事件 6 条；其中五星 3 条，四星 8 条。
- 数据文件：中国事件写入 `data/events/minguo.yaml`，世界事件写入 `data/world/modern.yaml`。
- 页面与路由：新增 `src/pages/1921.astro`，并在 `Timeline.astro` 与 `AxisCell.astro` 注册 1921 年入口。
- 已读取来源正文：
  - 中文维基百科 1921 年页面：https://zh.wikipedia.org/wiki/1921年
  - 英文维基百科 1921 年页面：https://en.wikipedia.org/wiki/1921
  - 中国共产党新闻网中共一大资料页：写入 Task 2 实际读取的中国共产党新闻网 URL
  - 华盛顿会议资料页：写入 Task 2 实际读取的美国国务院历史资料或维基事件页 URL
  - 英爱条约资料页：写入 Task 2 实际读取的爱尔兰国家档案馆、英国机构资料或维基事件页 URL
- 修改记录：
  - 规范化既有 `cpc-founding-1921` 为 `cn-cpc-founding-192107`，补齐精确日期、`sources` 和年度补全 ID 风格。
  - 新增 4 条 1921 年中国事件：中共一大南湖闭幕、外蒙古革命政府建立、孙中山广州非常政府、香港海员运动前奏。
  - 新增 6 条 1921 年世界事件：苏俄新经济政策、塔尔萨种族屠杀、安瓦尔战役、胰岛素突破、华盛顿会议、《英爱条约》。
- 配图说明：本试点不新增图片；后续若为五星事件补图，须另行核验 Commons 文件页、作者和许可。
- 未解决问题：香港海员筹备大罢工的月份精度保留为 `1921-09`，不强行补日。
- 验证：
  - `npm run validate`：写入 Task 6 实际结果，例如“通过，0 个错误”或失败摘要
  - `npm test -- test/load.test.js`：写入 Task 6 实际结果，例如“通过，test/load.test.js 全部断言通过”或失败摘要
```

- [ ] **Step 2: Confirm no instruction text remains in `check.md`**

Search:

```bash
rg -n "写入 Task|失败摘要|或维基事件页 URL" check.md
```

Expected: no matches after editing. The audit section must contain concrete URLs and concrete command outcomes.

- [ ] **Step 3: Commit audit record**

Run:

```bash
git add check.md
git commit -m "docs: audit 1921 event coverage"
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

Expected: exit code 0, or only pre-existing unrelated failures. If there are failures, record exact failing test files and assertions before reporting.

- [ ] **Step 4: Inspect final diff**

Run:

```bash
git status --short
git log --oneline -5
```

Expected: only intended tracked changes are committed; unrelated untracked files remain untouched.

## Plan Self-Review

- Spec coverage: This plan implements the required pilot path from the approved 1840-1948 design: `minguo.yaml` data, `modern.yaml` world data, annual page, route arrays, `check.md`, and validation.
- Deferred scope: 1840-1920 key-node batch and 1922-1947 annual coverage are intentionally deferred until the 1921 pilot is reviewed.
- Placeholder scan: The plan contains no angle-bracket placeholders. Task 5 requires concrete URLs and command results before the audit commit.
- Type consistency: Test field names match existing loader output and YAML schema.
