# 上下五千年 · 历史时间线 —— 实施计划

配套设计文档：[2026-08-04-history-timeline-design.md](../specs/2026-08-04-history-timeline-design.md)

## 阶段总览

| 阶段 | 内容 | 产出 |
|---|---|---|
| 一 | 项目骨架与配置 | 可 `npm run build` 的空 Astro 站点 |
| 二 | 日期工具与数据加载 | `src/lib/date.js`、`src/lib/load.js` |
| 三 | 数据校验 | `src/lib/validate.js`、`scripts/validate.mjs` |
| 四 | 渲染模型 | `src/lib/timeline.js` |
| 五 | 组件与页面 | 长卷主页、朝代概览页 |
| 六 | 样式与交互 | 三栏布局、开关筛选、朝代跳转 |
| 七 | CI/CD 与内容填充 | GitHub Actions + 约 300–500 条事件 |

阶段一至四为纯逻辑层，全部 TDD；五、六为渲染层，肉眼验收；七为数据工程。

## 已验证结论（spike，勿重复验证）

以下五条已在真实 Astro + Vitest 环境中跑通验证，实现时直接采用，不必再试：

1. **排序键 `year*10000 + month*100 + day` 对公元前成立。**
   验算：`-221-01` → `-2210000 + 100 + 1 = -2209899`；`-221-07` → `-2210000 + 700 + 1 = -2209299`。
   `-2209899 < -2209299`，公元前年内月份升序正确。

2. **`base` 必须保留尾斜杠。**
   `astro.config.mjs` 中 `base: '/5000years/'`。去掉尾斜杠会导致构建产物中的资源路径少一层。
   所有链接一律写作 `` `${import.meta.env.BASE_URL}path` ``，不再单独封装 helper。

3. **父子朝代的时间重叠是合法的。**
   西汉 `-202~8` 完全落在汉 `-202~220` 之内。因此重叠校验**只在同层兄弟朝代之间**执行，父子之间跳过。
   兄弟重叠亦非一律报错——三国等并存政权需 `concurrent: true` 豁免。

4. **只为有内容的年份生成行。**
   出行条件：该年有中国事件 ∨ 有世界事件 ∨ 是某朝代起始年。
   公元前事件稀疏，逐年出行会产生数千空行。视觉连续性由朝代色带跨行保证，不靠空行。

5. **文明色带用 CSS Grid 跨行实现。**
   每行是一个 grid row，色带作为 grid item 用 `grid-row-start` / `grid-row-end` 跨越。
   因此 `timeline.js` 除 `rows[]` 外还须输出色带的行号区间与列号。

## 约定

- **语言**：代码注释、文档、提交信息一律中文。
- **提交粒度**：每个任务一次提交，消息格式 `feat(lib): ...` / `test(lib): ...` / `docs: ...`。
- **TDD**：阶段一至四每个任务先写测试再写实现，测试须先失败。
- **任务粒度**：每个任务 2–5 分钟可完成，自包含，可单独交付。

---

## 阶段一：项目骨架与配置

### 任务 1.1　初始化 Node 项目

```
npm init -y
npm i -D astro vitest js-yaml
```

`package.json` 设 `"type": "module"`，脚本：

```json
{
  "dev": "astro dev",
  "build": "node scripts/validate.mjs && vitest run && astro build",
  "preview": "astro preview",
  "test": "vitest run",
  "validate": "node scripts/validate.mjs"
}
```

`build` 串联校验与测试，使得本地一条命令即可复现 CI 的全部门禁。

验收：`npm run build` 报错退出（此时无 `scripts/validate.mjs`），属预期。

### 任务 1.2　Astro 配置

`astro.config.mjs`：

```js
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://shiyulong27.github.io',
  base: '/5000years/',      // 尾斜杠必须保留，见已验证结论 2
  output: 'static',
})
```

仓库为 `shiyulong27/5000years`，部署至 GitHub Pages 项目站点，故 `base` 为 `/5000years/`。

验收：建一个最简 `src/pages/index.astro`，`npx astro build` 通过，`dist/index.html` 中资源路径含 `/5000years/`。

### 任务 1.3　目录骨架与 .gitignore

按设计文档五节建立空目录，各放一个 `.gitkeep`：

```
src/lib/  src/components/  src/pages/  src/styles/
scripts/  test/fixtures/
data/rulers/  data/events/  data/world/
```

`.gitignore` 追加 `.astro/`（Astro 类型缓存目录）。现有四条保持不变。

验收：`git status` 干净，无 `node_modules` 或 `dist` 泄漏。

### 任务 1.4　Vitest 配置

`vitest.config.js` 指定 `test.include: ['test/**/*.test.js']`，环境 `node`（无需 jsdom，因不测组件）。

写一条占位测试确认框架可用，随后删除。

验收：`npm test` 通过。

---

## 阶段二：日期工具与数据加载

### 任务 2.1　`src/lib/date.js` —— 解析与排序键

先写 `test/date.test.js`，覆盖：

| 输入 | `parseDate` 输出 | `sortKey` |
|---|---|---|
| `"-0221"` | `{year: -221, month: null, day: null, precision: 'year'}` | -2210000 |
| `"-0209-07"` | `{year: -209, month: 7, day: null, precision: 'month'}` | -2089300 |
| `"1937-07-07"` | `{year: 1937, month: 7, day: 7, precision: 'day'}` | 19370707 |
| `"221"` | 抛错（年份须四位补零） | — |
| `"1937-13"` | 抛错（月份越界） | — |

导出函数：

```
parseDate(str)      → {year, month, day, precision}，非法则抛 Error
sortKey(str)        → number，公式 year*10000 + (month??0)*100 + (day??0)
yearOf(str)         → number
spanYears(s, e)     → number，跨公元前后时为 |start| + end，否则 end - start + 1
formatDate(str)     → 显示串，"前221年" / "前209年七月" / "1937年7月7日"
```

格式正则：`/^(-?\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/`。

**日期校验的宽严尺度**：月份严格限 01–12；日严格限 01–31，但**不做逐月天数校验**。古代日期多为史料原文的干支或朔望记法折算而来，逐月精校会误拒合法数据。这是刻意的宽松。

`spanYears` 须与设计文档 214 行一致：汉 `-0202`→`220` 得 422。

验收：所有用例通过，含公元前后交界。

### 任务 2.2　`src/lib/load.js` —— YAML 加载与行号保留

用 `js-yaml` 的 `listener` 或 `CST` 能力为每条记录附带源位置。实现方式：解析后遍历原文行，按 `id` 字段回查行号，存入不可枚举的 `Symbol('loc')` 属性，避免污染数据本身与序列化输出。

导出：

```
loadAll(dataDir)  → {dynasties, rulers, events, worldEvents, civilizations}
locOf(record)     → {file, line}
```

`rulers/`、`events/`、`world/` 三个目录下的**所有** `.yaml` 文件合并读取，文件名不参与任何逻辑（见设计文档 89 行）。

验收：`test/load.test.js` 用 `test/fixtures/` 下的微型数据集，断言合并结果条数正确，且 `locOf` 返回的行号与文件实际行号一致。

### 任务 2.3　测试夹具

`test/fixtures/` 造一份最小但覆盖各种形态的数据集：

- 一个有父子关系的朝代（汉 / 西汉 / 东汉）
- 一组并存政权（魏 / 蜀 / 吴，均 `concurrent: true`）
- 三种精度的事件各一条
- 两位在交替之年衔接的君主（秦始皇 / 秦二世）
- 两条不同 region 的文明色带

后续三、四阶段的测试全部基于此夹具，不依赖 `data/` 下的真实数据——真实数据会变，测试不该随之红。

验收：夹具可被 `loadAll` 读取且无报错。

---

## 阶段三：数据校验

### 任务 3.1　`src/lib/validate.js` 骨架与基础规则

```
validate(data) → Error[]，空数组表示全部通过
Error = {file, line, message}
```

本任务实现三条最简规则：

- 必填字段齐全（各实体按设计文档四节的必填列）
- `id` 全局唯一（事件与朝代分别在各自命名空间内唯一）
- 枚举取值合法：`category` ∈ {政治,战争,文化,科技,经济,外交,灾异}，`confidence` ∈ {确定,存疑,有争议}，`importance` ∈ 1–5 整数

每条错误须带 `locOf` 返回的文件与行号。

验收：夹具中人为破坏一条数据，测试断言恰好报出一条错误，且行号正确。

### 任务 3.2　日期格式与朝代归属校验

- 所有 `date` / `start` / `end` / `reign_start` / `reign_end` 能被 `parseDate` 接受
- 每条事件的日期落在**至少一个**朝代区间内

**孤儿事件的处理**：事件不属于任何朝代时报错，而非静默通过。因此 `dynasties.yaml` 必须有一条兜底记录（如「上古/传说」）覆盖夏以前的时段。这比允许孤儿更好——孤儿事件在长卷上无处安放，会静默消失。

验收：夹具加一条落在所有朝代之外的事件，断言报错。

### 任务 3.3　区间重叠校验

三条独立规则，注意各自的适用范围：

1. **朝代重叠**——**仅在同层兄弟之间**（`parent` 相同者）比较。父子重叠合法（已验证结论 3）。双方均 `concurrent: true` 时豁免。
2. **君主在位重叠**——仅在**同一叶子朝代内**两两比较。跨朝代的君主同时在位是分裂期的常态，不报错。
3. **君主在位期落在所属朝代区间内**。

区间为左闭右闭，交替之年共享（设计文档 212 行）。判定重叠的条件是**后者起始年严格早于前者结束年**，而非 `<=`——秦始皇 `-0221~-0210` 与秦二世 `-0210~-0207` 在 -0210 交接，不算重叠。

验收：夹具的并存政权组不报错；把 `concurrent` 改为 false 后报错；秦始皇/秦二世不报错；把秦二世起始改为 `-0211` 则报错。

### 任务 3.4　`scripts/validate.mjs` CLI

读 `data/`，调 `validate`，按设计文档 218–224 行的格式打印：

```
✗ data/events/han.yaml:47
  事件「张骞出使西域」缺少必填字段 importance
```

有错则 `process.exit(1)`；全通过打印 `✓ 校验通过：N 条事件，M 个朝代，K 位君主`。

**报错信息质量是本项目的核心体验**——作者将长期手工编辑数千条 YAML，错误定位的精确度直接决定这件事是否可持续。宁可多花时间打磨措辞与行号准确性。

验收：`npm run validate` 对夹具与真实数据均给出正确结论与退出码。

---

## 阶段四：渲染模型 `timeline.js`

全项目唯一的复杂逻辑层。纯函数，不碰 DOM，不依赖 Astro。

```
buildTimeline({dynasties, rulers, events, worldEvents, civilizations})
  → {rows, bands, columns}
```

### 任务 4.1　朝代层级解析

```
resolveRoot(dynasty, all) → 顶层祖先
```

西汉 → 汉，南宋 → 宋。长卷显示根朝代，其色值取自根；概览页才拆分子朝代。

须检测循环引用（`a.parent = b, b.parent = a`）并抛出明确错误，否则后续遍历会死循环。

验收：夹具的汉/西汉/东汉三级关系解析正确；人为构造环，断言报错。

### 任务 4.2　出行年份的选取

```
collectYears(events, worldEvents, dynasties) → number[]，升序去重
```

出行条件（已验证结论 4）：该年有中国事件 ∨ 有世界事件 ∨ 是某朝代起始年。

**不逐年出行**：公元前跨度约 2500 年而事件仅数十条，逐年会产生数千空行，页面既慢又无从阅读。视觉连续性由朝代色带跨行保证。

验收：夹具中断言年份数等于「有内容的年份」数，且不含空年。

### 任务 4.3　行的生成与朝代横幅

对每个出行年份产出一行：

```
{ type: 'year', year, dynasties[], rulers[], cnEvents[], worldEvents[], gridRow }
{ type: 'banner', dynasty, rulers[], gridRow }
```

`dynasties` 与 `rulers` 皆为**数组**——分裂期同一年存在多个政权与多位君主，单值模型在三国、南北朝处会直接崩塌。中国史约四分之一时间处于分裂状态，这不是边界情况。

**横幅插入时机**：相邻两行的根朝代**集合**发生变化时，在其间插入横幅行。并存政权各出一条横幅。

`gridRow` 为从 1 开始的连续整数，供 CSS Grid 定位，在此处一次算定，组件不再计算。

君主查找：在位期含该年，且所属朝代是显示朝代（根）的后代。

同年多条事件按 `sortKey` 升序；同 `sortKey` 时按 `importance` 降序，重要者在上。

验收：朝代交替之年归属正确；并存政权同年多朝代；`gridRow` 连续无空洞。

### 任务 4.4　文明色带的跨行区间

```
bands[] = {name, region, color, rowStart, rowEnd, column}
```

色带的起止年多半落在无行的年份上（如古埃及新王国止于 -1069，该年无事件）。因此 `rowStart` 取**第一个 ≥ start 年的行**，`rowEnd` 取**最后一个 ≤ end 年的行**。若整个区间内无任何行，则该色带不渲染——此时长卷上那段时间根本不存在，画出来无处可放。

**列分配按 region**（设计文档 198 行），而非贪心排布：为每个 region 按其首个文明的起始年先后分配列号。按 region 分列的结果稳定可预期——同一文明区始终在同一列，读者能建立空间记忆；贪心排布虽列数更省，但同一文明可能在不同时段跳列。

`columns` 输出各 region 的列号映射与总列数，供 Grid 模板列使用。

验收：跨多行的色带区间正确；区间内无行的色带被排除；同 region 的多条色带列号一致。

### 任务 4.5　边界情况测试

集中补齐设计文档 291–297 行列出的五类：

- 朝代交替之年的归属
- 并存政权（同年多政权）
- 跨越多年的文明色带
- 公元前后交界（无公元 0 年）
- 变精度日期的排序与对齐

验收：五类各至少一条测试，全绿。

---

## 阶段五：组件与页面

自此进入渲染层。**组件不做单元测试**（设计文档 299 行）——静态 HTML 的问题肉眼可见，测试成本高于收益。验收方式为 `npm run dev` 目视检查。

### 任务 5.1　`Timeline.astro` 三栏骨架

顶层 CSS Grid，列构成：

```
[文明列 × N] [世界事件] [中轴] [中国朝代事件]
```

`N` 与各列位置来自 `timeline.js` 输出的 `columns`，组件不自行计算。每行用 `grid-row: <gridRow>` 显式定位，横幅行横跨全部列。

验收：三栏各就各位，行序与年份升序一致。

### 任务 5.2　`AxisCell` 与 `DynastyBanner`

- `AxisCell`：年份 + 朝代色带 + 在位君主。色带底色取根朝代 `color`。
- `DynastyBanner`：横跨三栏，显示朝代名、起止、年数（`spanYears`）、都城、开国与末代君主（`role` 字段）。带 `id` 锚点供跳转。

并存政权的横幅需并排显示，不可覆盖。

验收：滚动时朝代分界清晰；「汉 前202–220 共422年」数值正确。

### 任务 5.3　`EventCard` 与 `CivBand`

- `EventCard`：标题、日期（`formatDate`）、类别、简述。`confidence` 非「确定」时加视觉标记。`data-category` 与 `data-importance` 属性供客户端筛选使用。
- `CivBand`：`grid-row: rowStart / rowEnd`，`grid-column` 取 `column`。竖排文明名。

**缺失字段不渲染对应区块**，不显示空白占位（设计文档 305 行）。数据缺失是常态而非错误。

验收：三种精度的日期显示正确；色带跨行位置正确。

### 任务 5.4　主页 `index.astro`

`loadAll` → `buildTimeline` → 渲染。构建期完成，产物为纯静态 HTML。

顶部放 `Toolbar`。所有内部链接写作 `` `${import.meta.env.BASE_URL}...` ``（已验证结论 2）。

验收：`npm run build` 后 `dist/index.html` 可离线打开，三栏俱全。

### 任务 5.5　朝代概览页 `dynasty/[id].astro`

`getStaticPaths` 为每个**根朝代**生成一页。内容：概述、子朝代拆分、`RulerTable` 世系表、按 `importance` 自动挑选的关键事件、返回长卷对应锚点的链接。

`summary` 为空则不渲染该块。

验收：`/dynasty/han/` 显示西汉/新/东汉三段与完整世系。

---

## 阶段六：样式与交互

### 任务 6.1　长卷样式

中轴吸顶（`position: sticky`），朝代色带纵向连续。字号与行距以长时间阅读为准，非以信息密度为准。

响应式：窄屏折叠世界栏与文明列，保留中轴与中国事件。手机上三栏并置无法阅读，折叠不是降级而是正确形态。

验收：1920px 与 375px 两档均可读。

### 任务 6.2　客户端脚本

约 100 行原生 JavaScript，不引入框架：

- 开关切换 → 增删 CSS class
- 朝代跳转 → `scrollIntoView`
- 滚动高亮当前朝代 → `IntersectionObserver`

**筛选用 JavaScript 重算行的可见性，不用纯 CSS `:has()`**——需要「当某行的事件被全部筛除时隐藏整行」，这依赖对子元素的计数，`:has()` 在此场景下既脆弱又难调试。脚本按 `data-category` / `data-importance` 过滤卡片，再回扫各行决定是否隐藏。

**渐进增强**：脚本全部失效时页面仍是完整可读的时间线，仅开关失效（设计文档 283 行）。

验收：禁用 JavaScript 后三栏内容完整；启用后筛选与跳转正常。

### 任务 6.3　`Toolbar`

开关：只看重大事件（`importance >= 4`）、按类别筛选、显示/隐藏世界栏。朝代快速跳转下拉。

验收：各开关组合均不出现空行残留。

---

## 阶段七：CI/CD 与内容填充

### 任务 7.1　GitHub Actions

`.github/workflows/deploy.yml`，手写标准 actions（`checkout` / `setup-node` / `configure-pages` / `upload-pages-artifact` / `deploy-pages`），**不使用 Astro 官方 action**——需要在 build 前显式插入校验与测试两道门禁，官方 action 的封装反而挡路。

```
npm ci
node scripts/validate.mjs     ← 数据不合法则中止
npx vitest run                ← 测试不过则中止
npx astro build
```

校验失败必须中止部署（设计文档 316 行），绝不发布错误页面。

验收：故意提交一条非法数据，Actions 变红且不部署。

### 任务 7.2　朝代与君主全量数据

夏至 2026 全部朝代 + 历任君主，写入 `data/dynasties.yaml` 与 `data/rulers/`。含兜底的「上古/传说」记录（见任务 3.2）。

按朝代分文件提交，每批跑一次 `npm run validate`。

**这是本阶段最容易出错的部分**——分裂期的并存政权、子朝代的 `parent` 关系、君主在位期的衔接，都会被校验器逐条查出。分批提交使每次只需面对一批错误。

验收：校验通过，长卷可从夏滚至 2026。

### 任务 7.3　事件骨架

每朝代 10–30 条，共约 300–500 条。按朝代分批生成，**每批后立即校验并提交**。

**分批不只是为了控制错误量**，也因为 AI 在冷门年代与精确日期上会出错——`confidence` 字段的存在正是为此。生成时对存疑条目如实标注，不要为了整齐而一律写「确定」。

验收：每批校验通过；全时段无明显空段。

### 任务 7.4　抗战高密度样本

1931–1945，精确到日，约 100–150 条，写入 `data/events/modern-1931-1945.yaml`。

这是**密度验证**：长卷界面能否承受每年数十条精确到日的事件，只有真装进去才知道。若此处崩溃，说明行模型或样式需要返工——这正是要尽早验证的部分（设计文档 341–343 行）。

验收：滚至 1937 年 7 月 7 日可见卢沟桥事变；该段滚动不卡顿。

### 任务 7.5　世界事件与文明色带

世界事件骨架 + `civilizations.yaml`。色带覆盖各主要文明区，使长卷任一位置的左栏都有参照物。

验收：从夏到 2026 沿途左栏不出现长段空白。

---

## 完成标准

打开网页，可从夏一路滚至 2026；沿途看到每个朝代的起止、年数、开国与末代君主；滚至 1937 年 7 月 7 日可见卢沟桥事变；左栏始终有世界文明作参照。此后欲细化任何时段，只需向对应 YAML 文件添加条目。
