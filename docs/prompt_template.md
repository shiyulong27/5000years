# 【十丘】项目提示词模板 —— 用于在其他机器/大模型上操作

> 将以下内容作为系统提示词或首轮用户消息发给任意 AI 编程助手（如 Claude、GPT、Gemini、Cursor、Windsurf 等）。

---

## 一、通用项目上下文提示词（必贴）

```
你正在操作一个名为【十丘 (TENQIU CODEX)】的中国历史全景时间线项目。

## 项目概况
- **技术栈**：Astro 5.x 静态站点 + 原生 JavaScript + Vanilla CSS
- **数据格式**：YAML（不是数据库）
- **包管理**：npm
- **仓库地址**：已 clone 到本地，进入项目根目录操作即可

## 项目结构（关键文件）
data/
  events/xiandai.yaml     # 中国近现代事件（1840至今），当前约 500+ 条
  world/modern.yaml       # 世界近现代事件，当前约 300+ 条
  dynasties/              # 朝代定义 YAML
  rulers/                 # 君主/在位者 YAML
  civilizations.yaml      # 世界文明色带
src/
  components/
    Timeline.astro        # 主时间线三栏网格组件
    AxisCell.astro         # 中轴单元格（年份节点、切换按钮）
    EventCard.astro        # 单条事件卡片组件
    Toolbar.astro          # 顶部工具栏（等级筛选、排序、视图切换）
    YearSummaryCard.astro  # 年份概览卡片
    DynastyBanner.astro    # 朝代横幅
    CivBand.astro          # 文明色带
  client/
    timeline-ui.js         # 前端交互逻辑（筛选、排序、展开/概览切换）
  lib/
    timeline.js            # 渲染模型构建（纯函数，无 DOM）
    load.js                # YAML 数据加载
    date.js                # 变精度日期解析（支持公元前）
  styles/
    global.css             # 全局样式
  pages/
    index.astro            # 十丘知识门户首页
    timeline.astro         # 历史长卷主页
    2000.astro ~ 2026.astro # 各年份独立专页
  layouts/
    Base.astro             # 基础布局
scripts/
  validate.mjs            # 数据校验脚本
test/                     # Vitest 单元测试
.agents/skills/annual-events-builder/SKILL.md  # 年度事件补全标准 SOP

## 关键设计原则
1. **数据与渲染分离**：YAML 是唯一数据源 → timeline.js 纯函数构建渲染模型 → Astro 组件只负责模板渲染
2. **变精度日期**：日期格式为 ISO 字符串如 "-0221" / "1937-07-07"，支持年/月/日三种精度
3. **summaryYears 数组**：Timeline.astro 和 AxisCell.astro 中的 summaryYears 数组控制哪些年份有 [概览/详情] 切换功能，当前为 [2000~2026]
4. **前端交互全由原生 JS**：src/client/timeline-ui.js 负责等级筛选、分类筛选、正序/倒序切换、视图模式切换，不使用任何前端框架
5. **倒序排列**：通过 JS 物理重排 DOM 节点实现（不用 CSS flex-direction: column-reverse，会导致双重反转）
6. **年份概览卡片 (YearSummaryCard)**：概览卡片不使用固定的静态模版描述，而是接收 events={row.cnEvents} 属性，动态按重要度提炼该年份最核心的 3~5 条中国要闻生成列表概览
7. **历史事件图片配图 (Image Support)**：重大事件 YAML 支持可选的 image 字段（对象 { url, caption } 或图片路径），EventCard.astro 会自动渲染带悬浮缩放与图注的历史影像卡片。静态图片存放于 public/images/events/<年份>/ 目录下

## 两步门禁校验（每次修改后必须跑）
npm run validate   # 校验 YAML 数据格式
npm test           # 运行 Vitest 单元测试

## 启动开发服务器
npm run dev -- --host 127.0.0.1 --port 4321
# 访问 http://127.0.0.1:4321/5000years/
```

---

## 二、补充年度事件的提示词

```
请按照 `.agents/skills/annual-events-builder/SKILL.md` 中定义的 6 步标准 SOP，为我补全 <目标年份> 年的中国与世界重大事件。

具体要求：
1. 以新华社站内搜索、新华社年度国内/国际十大新闻和中英文维基百科年度页作为主要候选来源
2. 完整读取可访问的来源正文，必要时分页或分段读取；不得仅凭搜索摘要生成事件
3. 在新华社站内按政治、经济工业、外交军事、科技、文化体育、灾害六个领域补充检索；该清单只用于防漏，不要求每个领域必须有事件
4. 1978 年以前找不到新华社资料时如实记录；可选用人民日报历史数据库或官方党史、档案资料补充，但不强制扩充数量
5. 事件数量不设最低或最高限制，不得为了凑数降低 importance 标准
6. 每条事件必须包含：id, date, title, category, importance(1-5), summary, confidence, tags, sources（重大事件可选加 image 配图）
7. 中国事件追加到 `data/events/xiandai.yaml`，世界事件追加到 `data/world/modern.yaml`
8. 创建 `src/pages/<目标年份>.astro` 专页，并确保 Timeline.astro 的 summaryYears 和 AxisCell.astro 的 hasSummary 已包含该年份
9. 写入前提交候选清单与来源审计报告，列出实际读取的正文和未找到的来源
10. 完成后依次运行 `npm run validate`、`npm test` 确保 0 错误
11. 只暂存本次实际修改的明确文件，禁止使用 `git add .`；提交信息使用 `feat(events): 补全<目标年份>年重大事件与专页路由`

事件 YAML 格式示例：
- id: cn-example-202201
  date: "2022-01-01"
  title: 事件标题
  category: 政治
  importance: 5
  summary: |
    事实描述摘要，不超过 3 句话。
  confidence: 确定
  tags: [标签1, 标签2]
  sources: [新华网, 维基百科]
  image: # 可选：重大事件历史图片配图
    url: "/images/events/2022/example.jpg"
    caption: "图片说明图注"

importance 评级标准：
- 5级 (历史转折)：划时代重大转折，一年仅 3-5 件
- 4级 (重大事件)：重大政策、航天突破、国际盛会
- 3级 (常态事件)：常规重要节点

category 可选值：政治、经济、文化、战争、灾害
```

---

## 三、修 Bug / 改功能的提示词

```
这是一个 Astro 5.x 静态站点项目【十丘】。

我需要你修改/新增以下功能：<描述你的需求>

关键文件位置：
- 前端交互逻辑：src/client/timeline-ui.js
- 全局样式：src/styles/global.css
- 时间线组件：src/components/Timeline.astro
- 工具栏组件：src/components/Toolbar.astro
- 事件卡片：src/components/EventCard.astro

注意事项：
- 本项目不使用任何前端框架，纯原生 JS
- 修改后运行 `npm run validate` 和 `npm test` 确保通过
- 事件排序（倒序）通过 JS 物理重排 DOM 实现，不要用 CSS flex-direction: column-reverse
- EventCard 上有 data-date 属性可用于排序
```

---

## 四、批量操作的提示词（如一次补多年）

```
请使用 `.agents/skills/annual-events-builder/SKILL.md` 中的标准 SOP，
依次为以下年份补全中国与世界重大事件：1998, 1999

要求：
- 一次处理一年，完成一年后 git commit 一次
- 每年完成后运行 npm run validate + npm test
- commit 消息格式：feat(events): 补全<年份>年重大事件与专页路由
- 如果 summaryYears 和 hasSummary 数组需要扩展，一并处理
```
