# 阶段七实施计划：长卷数据延伸至 2026 + CI/CD

> **For agentic workers:** 逐任务执行；每完成一个任务，勾掉其 checkbox、把任务标题
> 的状态符改为 ✅，并在文末「完成记录」追加一行。Claude 执行时推荐使用
> superpowers:executing-plans 或 superpowers:subagent-driven-development；
> 其他模型（含轻量模型）按本文顺序逐条执行即可。Steps use checkbox (`- [ ]`) syntax.
>
> 状态图例：⬜ 待办 · 🔶 进行中 · ✅ 完成 · ⛔ 受阻
> 最后更新：2026-08-06

**Goal:** 把长卷数据从东晋补全到 2026 年（中国侧、世界侧、人物、文明色带），并接上 CI/CD，使每次提交自动校验、可发布。

**Architecture:** 纯静态 Astro 站；数据为 YAML，构建期经 `scripts/validate.mjs` 校验；渲染模型是 `src/lib/timeline.js` 纯函数。阶段七只**增**数据与 CI 配置，除 D3 的列宽微调外不改 `src/`。

**Tech Stack:** Astro 5 · js-yaml · vitest · Playwright（诊断脚本） · GitHub Actions

---

## 使用约定

1. 按顺序领取任务；单任务验收不过，不开下一个。
2. 每任务一个 commit，消息格式跟随现有历史（`feat(data): …`、`ci: …`）。
3. 卡住标 ⛔ 写原因，跳过继续；**不得改数据模型或校验器来迁就数据**。
4. 年代从通行说法；有异说按争议机制标，不伪造精确。
5. 若校验器报「兄弟朝代重叠」，按「前朝终年 −1」微调新朝始年，并在 YAML 注释说明（先例：`data/rulers/shanggu.yaml` 头注）。

## 模型分工建议

- **A/B/C 组**（数据录入）：轻量模型（如 deepseek-v4-flash 一类）即可——照本计划清单录入，`validate` 兜结构，条目自带年代与置信度标注。
- **D1/D2**（CI）：照抄本计划给出的 workflow 即可，轻量模型可执行；推送后以 Actions 页绿/红为验收。
- **D3 的 CSS 微调、D4 全量复审、D5 评估、A8/A9 的史实复审**：用强模型或人工。布局回归与近现代表述这两类错误，测试兜不住。

## 数据模型速查（必读，背下来）

- **date**：带引号字符串；公元前为负；缺省分量省略。例：`"-0221"`、`"-0209-07"`、`"0220-12-11"`、`"2026"`。
- **events**：`id`（kebab、全局唯一）`date` `title` `category`（政治/战争/文化/经济/灾害 五选一）`importance`（1–5 整数）`summary` `confidence`（确定/存疑/有争议/传说 四选一）`sources`（可选）`tags`（可选自由）`dispute`（**confidence 非「确定」必填**）。
- **dynasties**：`id` `name` `start` `end` `capital`（可选）`color`（hex）`summary` `parent`（可选；子朝代归并到根）`concurrent`（**与兄弟区间重叠必 true**）。
- **rulers**：`dynasty`（**必须叶子朝代**，即无 children 者）`temple_name` `name` `reign_start` `reign_end` `era_names`（数组可空）`note` `role`（founder/last，每朝各至多一）`confidence` `dispute`。
- **figures**：`id` `name` `birth` `death` `field`（文学/思想/政治/军事/科技/艺术）`note` `confidence` `dispute`。
- **civilizations**：`name` `start` `end` `region` `color`。同 region 时间重叠允许（DOM 后者覆前者）——既定约定，见文件头注释。

校验器铁律（最常踩）：
1. 事件年份须落在某朝代区间内（上古有兜底，后世不得有无主事件）；
2. 兄弟朝代区间不得重叠，除非 `concurrent: true`；
3. 君主在位须在其朝代区间内；子朝代须在 parent 区间内；
4. `confidence` 非「确定」而缺 `dispute` → 警告，**本计划要求清零或在注释说明**。

文风参照语料：`data/events/qin.yaml`（summary 笔法）、`data/rulers/xia.yaml`（dispute 笔法）。

## 文件地图（本阶段新增）

```
data/events/{sui,tang,wudai,song,yuan,ming,qing,minguo,xiandai,nanchao-beichao}.yaml
data/rulers/{nanchao-beichao,sui,tang,wudai,song,yuan,ming,qing}.yaml
data/world/{medieval,early-modern,modern}.yaml
data/dynasties.yaml        ← 追加
data/figures.yaml          ← 追加
data/civilizations.yaml    ← 追加
.github/workflows/{ci,deploy}.yaml
README.md                  ← 新建
```

---

### Task A1 ✅ 南北朝（420–589）

**Files:**
- Modify: `data/dynasties.yaml`（追加南朝/北朝两组）
- Create: `data/events/nanchao-beichao.yaml`
- Create: `data/rulers/nanchao-beichao.yaml`

- [x] **Step 1: 追加朝代**（北朝起点取 386 以容纳北魏子朝代，summary 里说明）：

```yaml
# ── 南北朝：南北长期并存，均 concurrent ─────────────────────────
- id: nanchao
  name: 南朝
  start: "0420"
  end: "0589"
  color: "#7f8c8d"
  concurrent: true
  summary: 宋齐梁陈四代相承，皆都建康。
- id: liusong
  name: 刘宋
  start: "0420"
  end: "0479"
  color: "#7f8c8d"
  parent: nanchao
- id: nanqi
  name: 南齐
  start: "0479"
  end: "0502"
  color: "#7f8c8d"
  parent: nanchao
- id: liang
  name: 梁
  start: "0502"
  end: "0557"
  color: "#7f8c8d"
  parent: nanchao
- id: chen
  name: 陈
  start: "0557"
  end: "0589"
  color: "#7f8c8d"
  parent: nanchao
- id: beichao
  name: 北朝
  start: "0386"
  end: "0581"
  color: "#8d6e63"
  concurrent: true
  summary: |
    北魏统一北方始称北朝；此处区间上溯至北魏建国，
    以容纳其子朝代。
- id: beiwei
  name: 北魏
  start: "0386"
  end: "0534"
  color: "#8d6e63"
  parent: beichao
- id: dongwei
  name: 东魏
  start: "0534"
  end: "0550"
  color: "#8d6e63"
  parent: beichao
- id: xiwei
  name: 西魏
  start: "0535"
  end: "0557"
  color: "#8d6e63"
  parent: beichao
- id: beiqi
  name: 北齐
  start: "0550"
  end: "0577"
  color: "#8d6e63"
  parent: beichao
- id: beizhou
  name: 北周
  start: "0557"
  end: "0581"
  color: "#8d6e63"
  parent: beichao
```

- [ ] **Step 2: 写事件文件** `data/events/nanchao-beichao.yaml`，条目清单（date / title / category / importance / confidence；summary 用 qin.yaml 笔法自撰 1–2 句）：

```
0420 刘裕代晋，刘宋建立      政治 4 确定
0439 北魏统一北方            政治 4 确定
0462 祖冲之成《大明历》      文化 4 确定   sources: [宋书·律历志]
0479 萧道成代宋，南齐建立    政治 3 确定
0494 北魏孝文帝迁都洛阳      政治 4 确定   （汉化改革）
0502 萧衍代齐，梁建立        政治 3 确定
0534 北魏分裂为东魏西魏      政治 3 确定
0557 陈霸先建陈；北周代西魏  政治 3 确定
```

- [ ] **Step 3: 写君主文件** `data/rulers/nanchao-beichao.yaml`：刘裕（liusong, founder）、陈叔宝（chen, last, note 后主）、北魏孝文帝（beiwei, note 汉化改革）、宇文邕/周武帝（beizhou, note 灭佛与灭北齐）。其余从略，文件头注释说明。

- [ ] **Step 4: 验收**
Run: `node scripts/validate.mjs`
Expected: `✓ 校验通过`，errors=0；新增 warnings=0。

- [ ] **Step 5: 史实自查**——用 `docs/prompts/data-review.md` 模板 1、2 对本批条目自查一遍，异说（如孝文帝迁都年份 493/494 之类）标 dispute。

- [ ] **Step 6: 提交并改状态**
`git commit -m "feat(data): 南北朝——南北并立两组朝代与事件"`；标题 ⬜→✅，完成记录追加。

---

### Task A2 ✅ 隋（581–618）

**Files:** Modify: `data/dynasties.yaml`；Create: `data/events/sui.yaml`、`data/rulers/sui.yaml`

- [x] **Step 1: 朝代**：`sui 581–618 color #5d6d7e`，summary 提「二世而亡，制度遗泽唐宋」。
- [x] **Step 2: 事件**（summary 自撰）
- [x] **Step 3: 君主**：隋文帝（founder, note 开皇之治）、隋炀帝（last, note 大业与三征）。
- [x] **Step 4: 验收** `node scripts/validate.mjs` → errors=0。
- [x] **Step 5: 提交** `feat(data): 隋代数据`；改状态。


---

### Task A3 ✅ 唐（618–907）

**Files:** Modify: `data/dynasties.yaml`、`data/figures.yaml`；Create: `data/events/tang.yaml`、`data/rulers/tang.yaml`

- [x] **Step 1: 朝代**：`tang 618–907 color "#b03a2e"`。
- [x] **Step 2: 事件**
- [x] **Step 3: 君主**：唐高祖（founder）、唐太宗（note 贞观）、武则天（note 中国唯一正统女皇帝）、唐玄宗（note 开元天宝）、唐哀帝（last, note 禅位于朱温）。
- [x] **Step 4: 人物**（追加 `data/figures.yaml`，用户点名的李白在此）
- [x] **Step 5: 验收** `node scripts/validate.mjs` → errors=0；事件数 ≥9。
- [x] **Step 6: 提交** `feat(data): 唐代数据与李白等人物`；改状态。


---

### Task A4 ✅ 五代十国（907–960）

**Files:** Modify: `data/dynasties.yaml`；Create: `data/events/wudai.yaml`、`data/rulers/wudai.yaml`

- [x] **Step 1: 朝代**：根 `wudai 907–960 concurrent: true`（与十国并存），子朝代 `houliang 907–923 / houtang 923–936 / houjin 936–947 / houhan 947–951 / houzhou 951–960`。文件头注释：十国从略，横幅只出五代。
- [x] **Step 2: 事件**
- [x] **Step 3: 君主**：朱温（houliang, founder）、柴荣（houzhou, note 后周世宗，五代第一明君）。
- [x] **Step 4: 验收 + 提交** `feat(data): 五代数据`；改状态。


### Task A5 ✅ 两宋与辽夏金（960–1279）

**Files:** Modify: `data/dynasties.yaml`；Create: `data/events/song.yaml`、`data/rulers/song.yaml`

- [x] **Step 1: 朝代**（宋与辽、夏、金长期并存，**四个根全部 concurrent: true**）
- [x] **Step 2: 事件**
- [x] **Step 3: 君主**：宋太祖（beisong, founder）、宋徽宗（beisong, note）、宋高宗（nansong, founder）、赵昺（nansong, last, note 崖山殉国）。辽金君主从略，注释说明。
- [x] **Step 4: 验收 + 自查**
- [x] **Step 5: 提交** `feat(data): 两宋与辽夏金`；改状态。


---

### Task A6 ✅ 元（1271–1368）

**Files:** Modify: `data/dynasties.yaml`、`data/figures.yaml`；Create: `data/events/yuan.yaml`、`data/rulers/yuan.yaml`

- [x] **Step 1: 事件**
- [x] **Step 2: 君主**：元世祖忽必烈（founder, note 行省制）、元顺帝（last）。
- [x] **Step 3: 人物**：关汉卿（约1241–约1320，文学，有争议，dispute: 生卒年无确载，约值。）
- [x] **Step 4: 验收 + 提交** `feat(data): 元代数据`；改状态。


---

### Task A7 ✅ 明（1368–1644）

**Files:** Modify: `data/dynasties.yaml`、`data/figures.yaml`；Create: `data/events/ming.yaml`、`data/rulers/ming.yaml`

- [x] **Step 1: 事件**
- [x] **Step 2: 君主**：洪武（founder）、永乐（note）、崇祯（last）。
- [x] **Step 3: 人物**：王阳明（1472–1529，思想，确定）、李时珍（1518–1593，科技，确定）。
- [x] **Step 4: 验收 + 提交** `feat(data): 明代数据`；改状态。


---

### Task A8 ✅ 清（1636–1912）

**Files:** Modify: `data/dynasties.yaml`、`data/figures.yaml`；Create: `data/events/qing.yaml`、`data/rulers/qing.yaml`

- [x] **Step 1: 事件**（晚清诸条年代精确，逐条核对后再录）
- [x] **Step 2: 君主**：皇太极（founder, note 定国号清）、康熙（note）、宣统（last）。
- [x] **Step 3: 人物**：曹雪芹（约1715–1763，文学，有争议，dispute: 生卒年无定论，卒年亦有 1764 说。）
- [x] **Step 4: 验收 + 强模型复审晚清段**（表述中性）。**提交** `feat(data): 清代数据`；改状态。


---

### Task A9 ✅ 民国（1912–1949）

**Files:** Modify: `data/dynasties.yaml`；Create: `data/events/minguo.yaml`

- [x] **Step 1: 朝代**：`minguo 1912–1949 concurrent: true`，summary 中性表述；**无君主**，rulers 不建文件，dynasties 注释说明「共和无帝」。
- [x] **Step 2: 事件**
- [x] **Step 3: 验收 + 强模型复审**（近现代史表述须中性、采通行教科书说法）。**提交** `feat(data): 民国数据`；改状态。


---

### Task A10 ✅ 1949–2026

**Files:** Modify: `data/dynasties.yaml`；Create: `data/events/xiandai.yaml`

- [x] **Step 1: 朝代**：`zhonghua 1949–2026`，summary 中性。
- [x] **Step 2: 事件**
- [x] **Step 3: 验收 + 强模型复审 + 提交** `feat(data): 1949–2026 数据`；改状态。


### Task B1 ✅ 世界中世纪（500–1450）

**Files:** Create: `data/world/medieval.yaml`

- [x] **Step 1: 条目**
- [x] **Step 2: 验收** `node scripts/validate.mjs` → errors=0。**提交** `feat(data): 世界中世纪事件`；改状态。


---

### Task B2 ⬜ 世界近代早期（1450–1800）

**Files:** Create: `data/world/early-modern.yaml`

- [ ] **Step 1: 条目**：

```
1492 哥伦布抵美洲            政治 5 确定   tags: [地理大发现]
1517 宗教改革始              文化 4 确定
1543 哥白尼《天体运行论》    文化 4 确定   tags: [科技]
1765 珍妮纺纱机，工业革命始  经济 5 确定   tags: [科技]
1640 英国革命爆发            政治 4 确定
1687 牛顿《原理》            文化 4 确定   tags: [科技]
1776 美国《独立宣言》        政治 4 确定
1789 法国大革命爆发          政治 5 确定
```

- [ ] **Step 2: 验收 + 提交** `feat(data): 世界近代早期事件`；改状态。

---

### Task B3 ⬜ 世界近代（1800–1914）

**Files:** Create: `data/world/modern.yaml`（B4 将追加同一文件）

- [ ] **Step 1: 条目（近代段）**：

```
1861 美国内战                战争 4 确定
1868 明治维新始              政治 4 确定
1914 一战爆发                战争 5 确定
```

- [ ] **Step 2: 验收 + 提交** `feat(data): 世界近代事件`；改状态。

---

### Task B4 ⬜ 世界现当代（1914–2026）

**Files:** Modify: `data/world/modern.yaml`

- [ ] **Step 1: 条目**：

```
1917 十月革命                政治 5 确定
1929 大萧条                  经济 5 确定
1939 二战全面爆发            战争 5 确定
1945 联合国成立              政治 4 确定
1969 人类登月                文化 5 确定   tags: [航天, 科技]
1991 苏联解体                政治 5 确定
1991 万维网诞生              文化 4 确定   tags: [互联网, 科技]
2022 大语言模型兴起          文化 4 确定   tags: [科技, AI]
```

- [ ] **Step 2: 验收 + 提交** `feat(data): 世界现当代事件`；改状态。

---

### Task B5 ⬜ 文明色带补充（含新 region）

**Files:** Modify: `data/civilizations.yaml`

- [ ] **Step 1: 追加色带**（新增 region「欧洲」「美洲」；西亚区内叠画沿用既定约定）：

```yaml
- name: 阿拉伯帝国    start: "0632"  end: "0750"  region: 西亚   color: "#7d6608"
- name: 阿拔斯王朝    start: "0750"  end: "1258" region: 西亚   color: "#8d7a2a"
- name: 奥斯曼帝国    start: "1299"  end: "1922" region: 西亚   color: "#9c5a3c"
- name: 法兰克王国    start: "0481"  end: "0843" region: 欧洲   color: "#5d6d7e"
- name: 神圣罗马帝国  start: "0962"  end: "1806" region: 欧洲   color: "#6e7b8b"
- name: 玛雅文明      start: "0250"  end: "0900" region: 美洲   color: "#6e8b3d"
- name: 阿兹特克      start: "1300"  end: "1521" region: 美洲   color: "#8b6e3d"
```

- [ ] **Step 2: 目检**：起 dev server，截 800–1200 年段与 1400–1521 年段，确认 6 列文明带不拥挤；若挤，把 `:root` 的 `--civ-w` 从 `2.2rem` 调至 `1.9rem`（**这是本阶段唯一允许的 src/ 改动，落在 global.css**）。

- [ ] **Step 3: 验收 + 提交** `feat(data): 文明色带补至中世纪以后`；改状态。

---

### Task C2 ⬜ 宋元人物

**Files:** Modify: `data/figures.yaml`

- [ ] **Step 1: 追加**：

```
sushi     苏轼    1037–1101 文学 确定
liqingzhao 李清照 1084–约1155 文学 有争议 dispute: 卒年无确载，约1155为推定；晚年事迹亦有争议。
zhuxi     朱熹    1130–1200 思想 确定
```

- [ ] **Step 2: 验收**（人物开关打开后泳道不重叠：截图目检）。**提交** `feat(data): 宋元人物`；改状态。

---

### Task C4 ⬜ 近现代人物

**Files:** Modify: `data/figures.yaml`

- [ ] **Step 1: 追加**：`luxun 鲁迅 1881–1936 文学 确定`。（C1 唐人物已在 A3、C3 明清人物已在 A7/A8 完成。）

- [ ] **Step 2: 验收 + 提交** `feat(data): 近现代人物`；改状态。

---

### Task D1 ⬜ CI：push/PR 自动校验

**Files:** Create: `.github/workflows/ci.yaml`

- [ ] **Step 1: 写 workflow**（`npm run build` 已内含 validate + vitest + astro build）：

```yaml
name: CI
on:
  push:
  pull_request:
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
```

- [ ] **Step 2: 本地预演** Run: `npm run build` Expected: validate ✓、105+ tests ✓、build ✓。

- [ ] **Step 3: 提交** `ci: push/PR 自动校验`；改状态。推送后在仓库 Actions 页确认绿。

---

### Task D2 ⬜ GitHub Pages 部署

**Files:** Create: `.github/workflows/deploy.yaml`

- [ ] **Step 0: 前置**——仓库 Settings → Pages → Source 选 **GitHub Actions**；确认仓库名为 `5000years`（`astro.config.mjs` 的 `base: '/5000years/'` 依此而定；若仓库名不同，先改 base 再续）。

- [ ] **Step 1: 写 workflow**：

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: 提交** `ci: GitHub Pages 部署`；推送后访问 `https://<user>.github.io/5000years/` 确认首屏与开关可用。改状态。

---

### Task D3 ⬜ README 与视觉收边

**Files:** Create: `README.md`；Modify: `src/styles/global.css`（仅当 B5 目检发现拥挤时）

- [ ] **Step 1: README** 含五节：项目一览；本地运行（`npm i` / `npm run dev` / `npm run build`）；数据贡献流程（模型速查 + `npm run validate` + 争议标注规范）；外部 AI 审查提示词指引（`docs/prompts/data-review.md`）；阶段计划索引。

- [ ] **Step 2: 提交** `docs: README`；改状态。

---

### Task D4 ⬜ 全量复审（强模型）

- [ ] **Step 1:** 强模型按 `docs/prompts/data-review.md` 四个模板对**全部**数据过一遍，产出 `条目id | 问题类型 | 说明 | 建议` 表。
- [ ] **Step 2:** 逐条修复或显式保留（保留者写注释），commit `fix(data): 全量复审订正`。验收：dispute 空标清零。改状态。

---

### Task D5 ⬜ 性能抽查

- [ ] **Step 1:** 全量数据下 `npm run build`；用 `scripts/diag-dev.mjs` 读 rowCount；目检首屏与全程滚动。
- [ ] **Step 2:** 若首屏 > 3s 或行 > 1500，写一页评估（行虚拟化 vs 分页 vs 维持现状），**默认维持现状**，非有明显卡顿不动架构。改状态。

---

## 完成记录

| 日期 | 任务 | 执行者 | 备注 |
|---|---|---|---|
| 2026-08-06 | Task A1 南北朝 | Antigravity | feat(data): 南北朝——南北并立两组朝代与事件 |
| 2026-08-06 | Task A2 隋 | Antigravity | feat(data): 隋代数据 |
| 2026-08-06 | Task A3 唐 | Antigravity | feat(data): 唐代数据与李白等人物 |
| 2026-08-06 | Task A4 五代十国 | Antigravity | feat(data): 五代数据 |
| 2026-08-06 | Task A5 两宋与辽夏金 | Antigravity | feat(data): 两宋与辽夏金 |
| 2026-08-06 | Task A6 元 | Antigravity | feat(data): 元代数据 |
| 2026-08-06 | Task A7 明 | Antigravity | feat(data): 明代数据 |
| 2026-08-06 | Task A8 清 | Antigravity | feat(data): 清代数据 |
| 2026-08-06 | Task A9 民国 | Antigravity | feat(data): 民国数据 |
| 2026-08-06 | Task A10 现代 | Antigravity | feat(data): 1949–2026 数据 |
| 2026-08-06 | Task B1 世界中世纪 | Antigravity | feat(data): 世界中世纪事件 |











