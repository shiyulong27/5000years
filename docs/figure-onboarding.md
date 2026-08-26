# 人物详卷接入与来源维护规范

> 适用范围：`data/figures.yaml`（L1 索引）、`data/figures/detail/*.yaml`（全景详卷，schema v1）、`data/sources.yaml`（来源登记表）。
> 本文档由 TASK-013 固化，依据 47 卷文学样板 + 岳飞非文学样板的生产经验整理。新执行者按本清单操作即可完成接入、验证与回填，无需依赖聊天记录。

## 一、Schema 与门禁速查

- Schema 定义：`docs/figure-detail-schema.md`（schema v1）
- 枚举唯一出处：`src/lib/enums.js`
  - `FIELDS`: 文学/思想/政治/军事/科技/艺术
  - `DATE_PRECISIONS`: 精确/约/范围/未知（**未知不得携带 year/range_end**）
  - `ATTRIBUTIONS`: 确凿/存疑/托名
  - `FOOTPRINT_KINDS`: 出生/居住/游历/任职/谪迁/逝世/纪念地
  - `RELATION_TYPES`: 挚友/师承/同僚/论敌/亲属/社群/思想影响/后世附会
  - `RECEPTION_ERAS`: 同时代/历代批评/近现代学术/教科书与公共文化/影视与网络
- 门禁命令：`npm run validate`（0 错误为过）；定向测试 `npx vitest run test/figure-detail.test.js`
- has_detail 双向校验：L1 标记 `has_detail: true` 而 detail 文件缺失 → 报错；detail 文件存在而 L1 未标记 → 报错。**收口时统一补标记**。

## 二、新人物接入模板（固定流水线）

1. **名单评估**：确认候选有可靠史料路线（正史本传 / 正史附传 / 公版别集序跋 / 两种以上总集小传）。三者皆无 → 记录不纳入理由，不建卷。
2. **L1 预登记**（`data/figures.yaml`）：id/name/birth|birth_note/death|death_note/field/note/roles/tags/confidence[+dispute]。生卒存疑用 birth_note/death_note 表述，不编造年份；年份四位补零（如 `'0991'`）。
3. **来源占位预登记**（`data/sources.yaml`）：每条主史料一个 id（正史卷次可预判），`status: 失效` + `notes: 待核验`。**先 grep 已登记 id 防重复**。
4. **子代理实取生产**（单路或并行）：
   - 只允许新建 `data/figures/detail/{id}.yaml` 一个文件；共享文件由主会话收口；
   - 维基文库实取原文建头注审计表（事实点｜证据｜结论与置信），逐层标注：正史本传层 / 总集文本层 / 序跋自述层 / 笔记传闻层 / 后世考证层；
   - 无载年份一律 约/范围/未知 + dispute；著作权争议用 attribution 存疑/托名 + dispute；
   - 自检枚举（对照第一节清单）与缩进（LF 行尾、无 BOM）。
5. **主会话收口**：
   - 补 `has_detail: true`（锚点必须含 id 行，防止误插相邻条目）；
   - 来源翻转：实取成功者 `status: 有效` + 当日 access_date + notes 写明证据；预判错误的卷次改标题与 URL 后翻转；
   - 新增登记当日实取的来源并回填 detail 中相应 `source_ids`；
   - 跑门禁（validate 0 错误 + 定向测试），修掉所有 ✗。
6. **页面验证**：dev server 抽查详情页 200、七模块齐、JSON-LD 在；总览页链接出现。

## 三、维基文库路径已知坑

| 坑 | 正确姿势 |
|---|---|
| 卷号零填充 | `晉書/卷092` 可达，`晉書/卷92` 404 |
| 分卷阿拉伯数字 | `唐才子傳/卷2`（非「卷二」） |
| 页面名消歧后缀 | `金石錄後序_(李清照)`（无括号页 404） |
| 总集页缺失 | 改单篇页逐篇实取（如荔支嘆经 API 全文检索定位页名）；如实记录核验方式 |
| 404 预判 | 如实记录错误预判并在 sources notes 注明纠正结果 |

## 四、来源复核清单（翻转前逐项过）

- [ ] 该 id 未被他人登记过（grep `data/sources.yaml`）
- [ ] URL 当日真实抓取成功且内容与标题相符（不是消歧义页/重定向壳）
- [ ] access_date 为实取当日；notes 含「实取成功」+ 关键证据摘要（或失败说明）
- [ ] 引文层级正确：正史原文 > 公版总集/别集 > 序跋自述 > 笔记转引 > 近现代考证（最后者不入库，只作中立转述）
- [ ] detail 文件内所有 `source_ids` 指向已登记 id（无裸 id）

## 五、版权检查清单

- [ ] 只收公版古籍原文与中立转述；现代注释/译文/学术引文不入库
- [ ] 作品归属存疑时用 `attribution: 存疑/托名` 并在 dispute 并陈双方（参照满江红公案著录法）
- [ ] 传说轶事（七岁咏鹅类）标笔记层，不冒充信史
- [ ] 图片/媒体沿用附录 A §A6 三条件开放许可策略（首期纯文本+自制图形）

## 六、非文学人物适配注意（岳飞样板经验）

- fields 用 军事/政治/科技 等均通过校验；works 允许极少甚至 0 件，**禁止硬凑文学作品**
- 制度贡献入 timeline（军纪/建军等），evidence 用本传原文
- reception 的历代批评层可用论赞/谥号/从祀填充，evaluator 措辞需中性化
- 已知摩擦点五项（schema v1 未解决，v2 议题）：
  1. works.source_ids 强制非空 → 未登记作品来源只能错挂本传 id
  2. timeline 无 kind 字段区分「制度」与「事件」
  3. reception.evaluator 语义偏文学
  4. footprints.kind 缺「驻防/屯军」义项
  5. relations 无法指向群体（如岳家军），只能降级入 timeline/reception

## 七、Schema 版本迁移规则

- 当前 schema_version: 1。升级时：新增可选字段不换版本号；改变既有字段语义或必填性必须升 v2 并在 `docs/figure-detail-schema.md` 追加迁移说明
- 校验器对 `schema_version` 不匹配的处理以 `src/lib/validate.js` 为准；迁移期间允许旧版本文件共存，但门禁对未声明版本的文件报错

## 八、失效链接处理

1. validate 警告「引用了已失效来源」不阻塞门禁，但每次批量收官应清点
2. 处理路径：重试原 URL → 站内检索新位置（消歧义名/分卷名变化）→ 找到则更新 edition_or_url 并把 status 保持有效 + notes 记录迁移；找不到替代则保持失效并在 detail 对应条目 dispute 注明「原始链接失效，转引待补」
3. 存量失效清单见各批次 Todo；当前遗留：src-qts-wangbo、src-qingzhenji、src-huaihaiji（均为「待定位」而非死链）

## 九、定期复审入口

- 触发时机：每完成一批详卷 / schema 升级 / 用户报告数据问题
- 动作：跑全量 validate + vitest → 清点失效来源与空 source_ids 警告 → 抽查 3 卷详情页 dev 渲染 → 把结论回填对应 Todo 的「验证证据」节
- 全量回归注意事项：工作区可能存在他人并行改动（历史案例：王表重构致夏商西周东周清内容测试 8 例失败）。**先判定失败域归属，非本域失败如实记录移交，不越权修复**

## 十、桌面演练记录（TASK-013 要求，2026-08-26）

以未收录候选**高适**（盛唐边塞诗人，figures.yaml 无 L1）走一遍本规范：

1. 名单评估：两唐书有传（《旧唐书》卷111 有高适专传）→ 有正史路线，可建卷 ✔
2. L1 预登记（演练，未落盘）：`- id: gaoshi / name: 高适 / birth_note: 约704年（一说700）/ death: '0765' / field: 文学 / roles: [诗人] / tags: [盛唐, 边塞] / confidence: 有争议 + dispute 生年异说`
3. 来源占位（演练）：`src-jts-vol111`（预判旧唐书卷111 高适传）、`src-gaoshiji`（高常侍集占位）
4. 生产要点预判：与李白杜甫梁宋之游有正史铁证（relation 挚友 libai/dufu 可建——dufu 已入库）；作品实取走全唐诗卷214 单篇页
5. 结论：流水线可直接套用，无需 schema 改动；演练未产生任何文件改动 ✔
