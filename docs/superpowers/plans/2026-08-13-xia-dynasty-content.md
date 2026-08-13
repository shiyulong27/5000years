# 夏朝内容完善实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 补齐传统文献所载的夏代十七王、夏朝关键事件与非君主重要人物，在世系表显示“帝王”标签，并为三条重点事件配置来源和许可清楚的本地图片。

**Architecture:** 保持现有 YAML 数据驱动结构：君主、事件、人物分别写入既有数据文件，页面继续通过 `loadAll()` 自动加载。只为 `RulerTable.astro` 增加兼容可选 `tags` 的展示列；图片继续使用 `EventCard.astro` 已支持的 `image` 对象，不新增媒体组件。夏代绝对年代统一视为时间线展示所需的推定框架，以 `confidence`、`dispute`、图注和来源字段明确区分传统叙事、考古关联与后世图像。

**Tech Stack:** Astro 5、JavaScript ESM、YAML（js-yaml）、Vitest、CSS、Wikimedia Commons 本地图片资源。

---

## 文件结构

- Create: `test/xia-content.test.js` — 集中验证十七王、标签、身份说明、事件、人物、图片文件和组件展示。
- Modify: `data/rulers/xia.yaml` — 保存完整传统十七王及其推定年代、标签和争议说明。
- Modify: `src/components/RulerTable.astro` — 增加可选标签列及徽章 DOM。
- Modify: `src/styles/global.css` — 只增加世系标签徽章样式。
- Modify: `data/events/pre-qin.yaml` — 修订三条既有记录并补充六条夏代关键事件。
- Modify: `data/figures.yaml` — 在文件开头增加十位夏代非君主人物。
- Create: `public/images/events/xia/yu-song-portrait.jpg` — 南宋马麟《夏禹王立像》的后世想象图。
- Create: `public/images/events/xia/erlitou-turquoise-dragon.jpg` — 二里头文化绿松石龙形器考古实物照片。
- Create: `public/images/events/xia/erlitou-bronze-jue.jpg` — 二里头遗址出土铜爵考古实物照片。

## 统一内容口径

- 十七王顺序固定为：禹、启、太康、仲康、相、少康、杼、槐、芒、泄、不降、扃、廑、孔甲、皋、发、桀。
- `temple_name` 延续现有字段名，但夏王没有后世意义上的庙号；它在当前项目中实际承担“君主显示名”。
- 十七王全部使用 `confidence: 有争议`、`tags: [帝王]`；禹保留 `role: founder`，桀保留 `role: last`。
- 推定在位区间固定为：禹前2070—2061、启前2061—2052、太康前2052—2023、仲康前2023—1996、相前1996—1968、少康前1940—1919、杼前1919—1902、槐前1902—1858、芒前1858—1840、泄前1840—1824、不降前1824—1765、扃前1765—1744、廑前1744—1723、孔甲前1723—1692、皋前1692—1681、发前1681—1652、桀前1652—1601。相与少康间的空档用于表现传统叙事中的失国期，不插入后羿、寒浞为夏王。
- 新增事件固定为有扈氏之战、太康失国、后羿代夏、寒浞篡权、少康中兴、杼时期东征；既有大禹治水、夏朝建立、商汤灭夏一并修订，合计九条夏朝主线事件。
- 新增人物固定为鲧、伯益、有扈氏首领、后羿、寒浞、女艾、靡、关龙逄、妹喜、商汤。后羿、寒浞作为失国期掌权者只进人物表和事件表，不加“帝王”标签。
- 图片只配置给大禹治水、少康中兴、商汤灭夏三条。二里头实物只表述为夏代问题的重要考古背景，不直接归属于某位王或某次事件。

### Task 1: 建立夏朝内容契约测试

**Files:**
- Create: `test/xia-content.test.js`

- [ ] **Step 1: 写入君主、事件和人物的失败测试**

创建测试文件，直接加载真实 `data/`，固定预期名单与字段：

```js
import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAll } from '../src/lib/load.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const data = loadAll(path.join(ROOT, 'data'))

const RULERS = ['禹', '启', '太康', '仲康', '相', '少康', '杼', '槐', '芒', '泄', '不降', '扃', '廑', '孔甲', '皋', '发', '桀']
const EVENTS = ['dayu-zhishui', 'xia-founding', 'gan-oath', 'taikang-lost-state', 'houyi-takes-xia', 'hanzhuo-usurpation', 'shaokang-restoration', 'zhu-expansion', 'shang-founding']
const FIGURES = ['gun', 'boyi', 'youhu-leader', 'houyi-xia', 'hanzhuo', 'nuai', 'mi-xia', 'guanlongpang', 'meixi', 'shangtang']

describe('夏朝内容完善', () => {
  const xiaRulers = data.rulers.filter((r) => r.dynasty === 'xia')

  it('按传统世系收录十七王并全部标记帝王', () => {
    expect(xiaRulers.map((r) => r.temple_name)).toEqual(RULERS)
    for (const ruler of xiaRulers) {
      expect(ruler.tags).toContain('帝王')
      expect(ruler.confidence).toBe('有争议')
      expect(ruler.dispute.trim().length).toBeGreaterThan(0)
    }
  })

  it('明确开国、首位世袭与末代君主', () => {
    expect(xiaRulers.find((r) => r.temple_name === '禹')?.role).toBe('founder')
    expect(xiaRulers.find((r) => r.temple_name === '启')?.note).toContain('首位世袭君主')
    expect(xiaRulers.find((r) => r.temple_name === '桀')?.role).toBe('last')
  })

  it('包含九条主线事件且争议与来源字段完整', () => {
    for (const id of EVENTS) {
      const event = data.events.find((item) => item.id === id)
      expect(event, `缺少事件 ${id}`).toBeDefined()
      expect(event.tags.length).toBeGreaterThan(0)
      expect(event.sources.length).toBeGreaterThan(0)
      expect(['传说', '有争议']).toContain(event.confidence)
      expect(event.dispute.trim().length).toBeGreaterThan(0)
    }
  })

  it('包含十位非君主重要人物且不与十七王重复', () => {
    for (const id of FIGURES) {
      const figure = data.figures.find((item) => item.id === id)
      expect(figure, `缺少人物 ${id}`).toBeDefined()
      expect(figure.note.trim().length).toBeGreaterThan(0)
      expect(figure.confidence).toBeDefined()
      expect(figure.dispute.trim().length).toBeGreaterThan(0)
      expect(RULERS).not.toContain(figure.name)
    }
  })
})
```

- [ ] **Step 2: 追加图片和组件契约的失败测试**

在同一 `describe` 中追加：

```js
  it('三条重点事件引用有许可信息的真实本地图片', () => {
    for (const id of ['dayu-zhishui', 'shaokang-restoration', 'shang-founding']) {
      const event = data.events.find((item) => item.id === id)
      expect(event.image.url).toMatch(/^\/images\/events\/xia\/[a-z0-9-]+\.jpg$/)
      expect(event.image.caption.trim().length).toBeGreaterThan(0)
      expect(event.image.source).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File/)
      expect(event.image.author.trim().length).toBeGreaterThan(0)
      expect(event.image.license.trim().length).toBeGreaterThan(0)
      const imagePath = path.join(ROOT, 'public', event.image.url.slice(1))
      expect(fs.existsSync(imagePath), `${id} 图片不存在`).toBe(true)
      expect(fs.statSync(imagePath).size).toBeGreaterThan(1024)
    }
  })

  it('世系表为可选 tags 渲染标签列和徽章', () => {
    const component = fs.readFileSync(path.join(ROOT, 'src/components/RulerTable.astro'), 'utf8')
    expect(component).toContain('rt-th-tags')
    expect(component).toContain('r.tags?.map')
    expect(component).toContain('ruler-tag')
  })
```

- [ ] **Step 3: 运行测试并确认当前实现失败**

Run: `npx vitest run test/xia-content.test.js`

Expected: FAIL；失败原因应包括夏王不足十七位、缺少新增事件和人物、缺少图片与 `rt-th-tags`，而不是 YAML 解析错误。

- [ ] **Step 4: 提交测试契约**

```powershell
git add -- test/xia-content.test.js
git commit -m "test(xia): 定义夏朝内容完善契约"
```

### Task 2: 补齐传统十七王和“帝王”标签

**Files:**
- Modify: `data/rulers/xia.yaml`

- [ ] **Step 1: 保留文件编码并用最小补丁扩充世系**

将文件头“只录关键几位”改为说明传统十七王完整收录。保留现有禹、启、少康、桀的长争议说明；为每条添加 `tags: [帝王]`，把启的 `note` 改为“夏朝首位世袭君主，家天下之始”。按“统一内容口径”写入其余十三王和固定推定区间。

新增记录采用以下完整字段形态；每位的 `note` 按世系关系或传统叙事填写，`dispute` 明示“传统文献有名、无同时代文字自证，具体在位年为后世推定”：

```yaml
- dynasty: xia
  temple_name: 太康
  name: 姒太康
  reign_start: "-2052"
  reign_end: "-2023"
  era_names: []
  tags: [帝王]
  note: 启之子，传统叙事中因失政而失国
  confidence: 有争议
  dispute: 太康仅见于后世传世文献，无同时代文字自证；失国经过与具体在位年均为后世重建。
```

姓名统一采用姒姓加显示名；不明确的本名直接沿用君主名，不制造额外别名。相与少康之间允许存在前1968—前1940的在位空档，以对应失国期。

- [ ] **Step 2: 运行君主相关测试确认通过**

Run: `npx vitest run test/xia-content.test.js -t "十七王|开国"`

Expected: 两项 PASS。

- [ ] **Step 3: 运行数据校验**

Run: `npm run validate`

Expected: `校验通过`；允许校验器输出既有的非致命 warnings，但不得出现夏王重叠、朝代越界、字段缺失或乱码。

- [ ] **Step 4: 检查差异与编码**

Run: `git diff --check -- data/rulers/xia.yaml`

Run: `git diff -- data/rulers/xia.yaml`

Expected: 仅夏王记录变化；中文可读，文件仍为 UTF-8、无 BOM、LF。

- [ ] **Step 5: 提交十七王数据**

```powershell
git add -- data/rulers/xia.yaml
git commit -m "feat(xia): 补齐传统十七王世系"
```

### Task 3: 在世系表显示“帝王”徽章

**Files:**
- Modify: `src/components/RulerTable.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: 为表头和数据行增加可选标签列**

在“姓名”和“在位”之间加入表头，并在每行同一位置渲染标签：

```astro
<th class="rt-th rt-th-tags">标签</th>
```

```astro
<td class="rt-td rt-td-tags">
  {r.tags?.map((tag) => <span class="ruler-tag">{tag}</span>)}
</td>
```

不根据朝代硬编码“帝王”，也不改变无 `tags` 记录的数据。

- [ ] **Step 2: 添加紧凑徽章样式**

紧接 `.ruler-table th` 规则后增加：

```css
.rt-td-tags {
  white-space: nowrap;
}

.ruler-tag {
  display: inline-block;
  padding: 0.1rem 0.38rem;
  border: 1px solid color-mix(in srgb, var(--dynasty-color, #9a6b32) 45%, var(--line));
  border-radius: 999px;
  color: var(--text);
  background: color-mix(in srgb, var(--dynasty-color, #9a6b32) 10%, var(--card));
  font-size: 0.75rem;
  line-height: 1.3;
}
```

- [ ] **Step 3: 运行组件契约与全量现有测试**

Run: `npx vitest run test/xia-content.test.js -t "世系表"`

Expected: PASS。

Run: `npm test`

Expected: 全部测试 PASS；不得执行 `npm run build`。

- [ ] **Step 4: 提交展示改动**

```powershell
git add -- src/components/RulerTable.astro src/styles/global.css
git commit -m "feat(xia): 在世系表展示帝王标签"
```

### Task 4: 补充并修订九条夏朝主线事件

**Files:**
- Modify: `data/events/pre-qin.yaml`

- [ ] **Step 1: 修订三条既有事件的史实口径与来源**

对 `dayu-zhishui`、`xia-founding`、`shang-founding` 保留 ID 和日期，确保每条都有非空 `sources` 与 `dispute`。`xia-founding` 标题改为“禹建夏，启确立世袭”，摘要明确“禹为传统开国君主、启为首位世袭君主”，避免“禹传位于启”这一单一说法掩盖伯益争议。`shang-founding` 标题改为“鸣条之战，商汤灭夏”。

来源至少包含对应的早期文献名；考古背景可引用“中国国家博物馆《夏文化、夏王朝及相关问题》”或“中华文明探源工程成果”。

- [ ] **Step 2: 写入六条新增事件**

按时间顺序插入以下记录，全部设 `confidence: 有争议` 并解释年代与叙事均来自后世文献：

```yaml
- id: gan-oath
  date: "-2058"
  title: 甘之战，启讨伐有扈氏
  category: 战争
  tags: [世袭制, 有扈氏]
  importance: 4
  summary: 传统文献称有扈氏反对启继位，启在甘地交战并获胜，常被解释为世袭王权确立过程中的冲突。
  confidence: 有争议
  dispute: 《尚书·甘誓》保存了启战有扈氏的叙事，但成篇年代、战场位置与事件年代均无同时代证据。
  sources: [尚书·甘誓, 史记·夏本纪]

- id: taikang-lost-state
  date: "-2031"
  title: 太康失国
  category: 政治
  tags: [权力更替, 有穷氏]
  importance: 4
  summary: 传统叙事称太康长期在外游猎，有穷氏后羿乘机控制夏政，夏后氏统治由此中断。
  confidence: 有争议
  dispute: 事件主要见于后世传世文献，不同典籍对后羿夺权时间、方式及太康结局叙述不一；前2031年仅为时间线推定。
  sources: [尚书·五子之歌, 左传·襄公四年, 史记·夏本纪]

- id: houyi-takes-xia
  date: "-1990"
  title: 后羿代夏
  category: 政治
  tags: [有穷氏, 权力更替]
  importance: 4
  summary: 传统叙事称有穷氏首领后羿掌握夏政并排挤夏后相，形成夏后氏失国时期。
  confidence: 有争议
  dispute: 后羿代夏主要据《左传》和《竹书纪年》系统重建，且可能与射日神话中的羿发生混同；日期为推定。
  sources: [左传·襄公四年, 竹书纪年]

- id: hanzhuo-usurpation
  date: "-1968"
  title: 寒浞杀羿，覆灭斟灌、斟鄩
  category: 战争
  tags: [寒浞, 夏后氏失国]
  importance: 4
  summary: 传统叙事称寒浞杀后羿夺权，又命浇、豷攻灭支持夏后的斟灌氏与斟鄩氏，相遇害，夏后氏势力跌入低谷。
  confidence: 有争议
  dispute: 人物、部族关系与战争过程均来自后世追述，缺少同时代文字和可与具体人物直接对应的考古材料；日期为推定。
  sources: [左传·襄公四年, 竹书纪年]

- id: shaokang-restoration
  date: "-1940"
  title: 少康中兴，夏后氏复国
  category: 政治
  tags: [复国, 少康中兴]
  importance: 5
  summary: 传统叙事称少康依托有仍氏、有虞氏积聚力量，派女艾侦察、使季杼诱歼，最终消灭浇、豷并恢复夏后氏统治。
  confidence: 有争议
  dispute: “少康中兴”见于《左传》等后世文献，具体军事过程和年代无法由同时代材料核实；前1940年为本项目推定框架。
  sources: [左传·哀公元年, 左传·襄公四年, 竹书纪年]

- id: zhu-expansion
  date: "-1910"
  title: 杼时期向东夷扩张
  category: 战争
  tags: [东夷, 王朝扩张]
  importance: 3
  summary: 传统文献将少康之子杼描述为继续征伐东夷、巩固复国成果的君主，反映夏与东方族群关系的历史记忆。
  confidence: 有争议
  dispute: 杼的征伐对象、范围和年代在文献中并不一致，无法与具体考古现象一一对应；前1910年仅作时间线定位。
  sources: [竹书纪年, 国语·鲁语上]
```

- [ ] **Step 3: 运行事件测试和数据校验**

Run: `npx vitest run test/xia-content.test.js -t "九条主线事件"`

Expected: PASS。

Run: `npm run validate`

Expected: 校验通过，无新增 error。

- [ ] **Step 4: 检查仅修改前秦事件目标区块并提交**

Run: `git diff --check -- data/events/pre-qin.yaml`

Run: `git diff -- data/events/pre-qin.yaml`

Expected: 只有文件开头的夏朝相关记录变化，无全文件换行或编码污染。

```powershell
git add -- data/events/pre-qin.yaml
git commit -m "feat(xia): 补充夏朝关键事件"
```

### Task 5: 补充十位非君主重要人物

**Files:**
- Modify: `data/figures.yaml`

- [ ] **Step 1: 在既有人物前加入十条夏代人物记录**

使用以下 ID、显示名、推定时间带、领域和人物定位：

| ID | 姓名 | 生卒/活动时间带 | field | note 核心内容 |
|---|---|---|---|---|
| `gun` | 鲧 | 前2200—前2100 | 政治 | 禹父，传统治水叙事中的前任治水者 |
| `boyi` | 伯益 | 前2140—前2040 | 政治 | 辅禹治水，传统继承叙事中与启竞争 |
| `youhu-leader` | 有扈氏首领 | 前2080—前2040 | 军事 | 传统叙事中反对启继位并战于甘 |
| `houyi-xia` | 后羿（有穷氏） | 前2040—前1970 | 军事 | 失国期掌权者；与射日羿可能混同 |
| `hanzhuo` | 寒浞 | 前2010—前1940 | 政治 | 杀羿掌权，攻灭支持夏后的部族 |
| `nuai` | 女艾 | 前1970—前1910 | 军事 | 少康复国叙事中的侦察者 |
| `mi-xia` | 靡 | 前1980—前1910 | 军事 | 传统叙事中联合旧部讨灭寒浞 |
| `guanlongpang` | 关龙逄 | 前1700—前1620 | 政治 | 传统忠谏叙事中劝桀而遇害 |
| `meixi` | 妹喜 | 前1680—前1600 | 政治 | 夏末女性，亡国归因多属后世附会 |
| `shangtang` | 商汤 | 前1670—前1580 | 政治 | 商部族首领，传统叙事中灭夏建商 |

每条均使用 `confidence: 有争议`。`dispute` 不只写“年代推定”，还需点明主要问题：人物是否可证、不同文献身份冲突、后世道德化或神话混同。示例：

```yaml
- id: houyi-xia
  name: 后羿（有穷氏）
  birth: "-2040"
  death: "-1970"
  field: 军事
  note: 有穷氏首领，传统叙事中的夏政掌权者
  confidence: 有争议
  dispute: 其事迹主要见于后世文献，且常与神话中的射日之羿混同；生卒年仅为时间线占位。
```

- [ ] **Step 2: 运行人物测试与校验**

Run: `npx vitest run test/xia-content.test.js -t "十位非君主"`

Expected: PASS。

Run: `npm run validate`

Expected: 校验通过；不得出现人物 ID 重复、日期倒置或 `field` 越界。

- [ ] **Step 3: 检查差异与提交**

Run: `git diff --check -- data/figures.yaml`

Run: `git diff -- data/figures.yaml`

Expected: 只在文件说明之后、姜尚之前新增夏代人物，无其他人物格式变化。

```powershell
git add -- data/figures.yaml
git commit -m "feat(xia): 补充夏代重要人物"
```

### Task 6: 下载、记录并接入三张事件图片

**Files:**
- Create: `public/images/events/xia/yu-song-portrait.jpg`
- Create: `public/images/events/xia/erlitou-turquoise-dragon.jpg`
- Create: `public/images/events/xia/erlitou-bronze-jue.jpg`
- Modify: `data/events/pre-qin.yaml`

- [ ] **Step 1: 创建目标目录并下载经许可核验的图片**

使用 Commons 的 960px 或原图直链下载，避免抓取 HTML 页面。三个文件页与许可固定为：

- `https://commons.wikimedia.org/wiki/File:King_Yu_of_Xia.jpg`，马麟，Public Domain Mark；图注明确“南宋后世想象”。
- `https://commons.wikimedia.org/wiki/File:绿松石龙形器1.jpg`，僧盐（Wikimedia 用户陳寅恪），CC BY-SA 4.0。
- `https://commons.wikimedia.org/wiki/File:二里头出土铜爵,_2024-06-22_01.jpg`，Siyuwj，CC BY-SA 4.0。

先从文件页确认下载链接未变化，再用 PowerShell `Invoke-WebRequest -OutFile` 分别写入三个明确目标；不使用通配符或递归覆盖。

- [ ] **Step 2: 验证文件格式和尺寸**

Run:

```powershell
Get-Item 'public/images/events/xia/yu-song-portrait.jpg','public/images/events/xia/erlitou-turquoise-dragon.jpg','public/images/events/xia/erlitou-bronze-jue.jpg' | Select-Object Name,Length
```

Expected: 三个文件均大于 1 KB。

Run:

```powershell
Format-Hex -LiteralPath 'public/images/events/xia/yu-song-portrait.jpg' | Select-Object -First 1
Format-Hex -LiteralPath 'public/images/events/xia/erlitou-turquoise-dragon.jpg' | Select-Object -First 1
Format-Hex -LiteralPath 'public/images/events/xia/erlitou-bronze-jue.jpg' | Select-Object -First 1
```

Expected: 三个文件均以 JPEG `FF D8 FF` 魔数开头。

- [ ] **Step 3: 为三条事件写入完整图片元数据**

给 `dayu-zhishui` 写入：

```yaml
  image:
    url: /images/events/xia/yu-song-portrait.jpg
    caption: 南宋马麟《夏禹王立像》，为后世对大禹的想象，并非夏代同时期画像
    source: "https://commons.wikimedia.org/wiki/File:King_Yu_of_Xia.jpg"
    author: 马麟（作品）；台北故宫博物院数字化
    license: Public Domain Mark 1.0
```

给 `shaokang-restoration` 写入绿松石龙形器照片，图注明确它是“二里头文化礼器，作为夏代问题的考古背景，不与少康本人直接对应”。给 `shang-founding` 写入铜爵照片，图注明确它是“二里头文化晚期器物，作为夏商之际的考古背景，不等同于鸣条之战实物”。两个对象分别记录上述 Commons 文件页、作者和 `CC BY-SA 4.0`。

- [ ] **Step 4: 运行图片契约测试**

Run: `npx vitest run test/xia-content.test.js -t "本地图片"`

Expected: PASS。

- [ ] **Step 5: 提交图片与元数据**

```powershell
git add -- data/events/pre-qin.yaml public/images/events/xia/yu-song-portrait.jpg public/images/events/xia/erlitou-turquoise-dragon.jpg public/images/events/xia/erlitou-bronze-jue.jpg
git commit -m "feat(xia): 为重点事件补充考古与后世图像"
```

### Task 7: 完成全量验证与最终审查

**Files:**
- Verify only: `data/rulers/xia.yaml`
- Verify only: `data/events/pre-qin.yaml`
- Verify only: `data/figures.yaml`
- Verify only: `src/components/RulerTable.astro`
- Verify only: `src/styles/global.css`
- Verify only: `test/xia-content.test.js`
- Verify only: `public/images/events/xia/*.jpg`

- [ ] **Step 1: 运行夏朝专项测试**

Run: `npx vitest run test/xia-content.test.js`

Expected: 全部专项用例 PASS。

- [ ] **Step 2: 运行数据校验**

Run: `npm run validate`

Expected: 校验通过，无 error；记录但不把仓库既有 warning 误报为本次失败。

- [ ] **Step 3: 运行全量单元测试**

Run: `npm test`

Expected: 全部测试 PASS。遵守仓库指令，不运行 `npm run build`。

- [ ] **Step 4: 运行 Astro 类型/模板检查（若命令可用）**

Run: `npx astro check`

Expected: 若已安装检查依赖则 0 error；若 Astro 明确提示缺少 `@astrojs/check`/TypeScript 且需要交互安装，记录为未配置，不擅自安装依赖，也不改用 `npm run build`。

- [ ] **Step 5: 复核工作区差异、编码和图片归属**

Run:

```powershell
git diff --check 9e16a6d..HEAD
git show --stat --oneline 9e16a6d..HEAD
git status --short
```

Expected: 本功能提交只包含计划列出的夏朝文件；工作区原有 `data/events/xiandai.yaml` 和近现代图片改动仍保持原状、未被暂存或提交。

显式 UTF-8 读取三份 YAML，确认中文可读且无 `�`：

```powershell
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
Get-Content -LiteralPath 'data/rulers/xia.yaml' -Raw -Encoding utf8 | Select-String '�'
Get-Content -LiteralPath 'data/events/pre-qin.yaml' -Raw -Encoding utf8 | Select-String '�'
Get-Content -LiteralPath 'data/figures.yaml' -Raw -Encoding utf8 | Select-String '�'
```

Expected: 三条命令均无匹配。

- [ ] **Step 6: 如验证修正产生改动，单独提交**

只在确有修正时执行：

```powershell
git add -- data/rulers/xia.yaml data/events/pre-qin.yaml data/figures.yaml src/components/RulerTable.astro src/styles/global.css test/xia-content.test.js public/images/events/xia
git commit -m "fix(xia): 修正夏朝内容校验问题"
```

若没有修正，不创建空提交。
