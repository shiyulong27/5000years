# 人物详卷数据规范（figure-detail-schema v1）

> 隶属 Todo：`todos/2026-08-24-千古风流历史人物与诗词名家体系建设.md` TASK-001
> 冻结时间：2026-08-25
> 上游约束：附录 A（范围矩阵、三级展示策略、媒体策略）、DEC-004（timeline 语义、条目级证据）
> 实施任务：TASK-002（加载器与校验器落地）

## 1. 版本与文件形状

| 项 | 决定 |
|---|---|
| `schema_version` | 整数 `1`。后续不兼容变更递增；TASK-013 维护迁移规则 |
| 文件位置 | `data/figures/detail/{id}.yaml`，`{id}` 必须等于 figures.yaml 中对应人物的 `id` |
| **顶层形状** | **每文件单对象**（DEC-008）。现有 `parseWithLoc()` 仅接受顶层数组，故加载器须新增单对象解析路径并附加 LOC 信息（TASK-002 实现）；不得为迁就旧解析器把单对象包成单元素数组 |
| 命名空间 | 详卷内不再重复 `id/name` 等索引字段之外的基础身份信息以外冗余——基础字段以 L1 为准，详卷只做补充与深化 |

## 2. 与 L1（data/figures.yaml）的兼容与迁移

- L1 现有字段 `id, name, related_dynasties, birth, death, field, note, confidence, dispute` 全部保留，173 条存量数据零改动。
- L1 新增**可选**字段：
  - `roles: string[]` — 身份体裁标签（如 `[诗人, 书法家]`），取值建议来自 enums.js 的 `FIGURE_ROLES`，未登录值暂只警告；
  - `tags: string[]` — 自由流派/群组/时期标签（如 `[盛唐, 边塞]`），不做枚举校验；
  - `has_detail: boolean` — 是否存在对应详卷；校验器交叉核验「有 has_detail 无文件」报错、「无 has_detail 有文件」报错（TASK-002 落地）。
- **日期兼容（回应 ISSUE-004）**：L1 的 `birth/death` 放宽为可空；为空时必须提供 `birth_note/death_note`（字符串）说明约数或未知原因。校验规则从「必填 + yearOf 排序」改为：
  - birth 与 death 同时存在时仍执行顺序检查；
  - 任一为空时跳过排序，且要求对应 note 非空；
  - 展示层对空年份渲染 note 文本而非空白或占位年份。
- 主领域仍以 L1 `field` 为准；跨领域信息写入详卷 `profile.fields`，不得在 L1 另开多值。

## 3. 通用条目级证据模型

所有内容条目（年谱事件、作品、足迹、关系、评价）共享以下可选证据字段，替代「人物顶层一个 dispute 覆盖全部」的旧模式：

```yaml
confidence: 确定 | 存疑 | 有争议 | 传说   # 复用 CONFIDENCES，缺省=确定
dispute: ""                               # 标非「确定」时强烈建议填写争议内容（警告）
source_ids: [src-hist-001]                # 指向 data/sources.yaml 注册表
inferred: false                           # 推定项（如推定路线）必须显式标 true
```

## 4. 日期精度模型

任何日期值使用以下形状之一（解决「只有约数也要编单年」问题）：

```yaml
# 形态 A：单点
{ text: "701年", year: 701, precision: 约 }
# 形态 B：范围
{ text: "701—702年之间", year: 701, range_end: 702, precision: 范围 }
# 形态 C：未知
{ text: "不详", precision: 未知 }
```

- `DATE_PRECISIONS = ['精确', '约', '范围', '未知']`（enums.js 新增）。
- `precision: 未知` 时禁止出现 `year`；`precision: 范围` 时 `year/range_end` 必须成对且 `year <= range_end`。
- `text` 必填，供页面直接展示；`year` 仅用于排序与联动，缺失时该条目不参与时间轴精确定位而进入「年代不详」分组。

## 5. 顶层字段定义

```yaml
schema_version: 1

id: libai                # 必填；必须等于本文件名（去扩展名）且存在于 figures.yaml

profile:
  courtesy_name: ""        # 字
  art_name: ""             # 号
  aliases: []              # 异名/别称
  gender: 男 | 女 | 不详    # GENDERS 枚举
  ethnicity: ""            # 族属，仅有可靠依据时填写；留空表示未知而非汉族
  ancestry: ""             # 籍贯/祖籍（历史地名）
  birthplace: ""           # 出生地（历史地名；异说写进 dispute）
  death_place: ""
  offices: []              # 官职/身份，自由文本数组
  fields: []               # 跨领域标签，取值 ⊆ FIELDS
  roles: []                # 身份体裁，取值建议 ⊆ FIGURE_ROLES
  summary: ""              # 一句话定位（详情页名片用）

timeline:                   # 人生阶段 + 关键事件统一于此（DEC-004）
  - stage: 少年蜀中          # 人生阶段名，同阶段多条事件可复用
    stage_order: 1          # 阶段序号
    title: ""               # 事件标题（必填）
    date: {…}               # §4 日期模型（必填，可为未知）
    place: ""               # 历史地名
    summary: ""             # 事实摘要（必填）
    related_event_id: ""    # 可选，关联 data/events 的事件 id
    related_year: 701       # 可选，用于反链年份页（TASK-006 校验目标存在性）
    # …§3 证据字段

works:
  - work_id: jing-ye-si     # 人物内唯一
    title: ""               # 必填
    alt_titles: []
    genre: ""               # 体裁（诗/词/文/赋/曲/专著…，自由文本）
    date: {…}               # 创作时间，允许未知
    place: ""
    context: ""             # 创作情境（必填——本专题核心卖点）
    attribution: 确凿 | 存疑 | 托名   # ATTRIBUTIONS 枚举，作者归属可信度
    excerpt: ""             # 展示文本；公版原文可为全篇
    text_display: full | excerpt | none   # DISPLAY_LEVELS（附录 A §A6/S2）
    themes: []
    influence: ""           # 后世影响
    # …§3 证据字段

footprints:
  - name: ""                # 地点名称（历史地名优先，现代名入 modern_name）
    modern_name: ""
    lng: null               # 坐标，允许 null；非 null 时须为数值且 lng∈[-180,180], lat∈[-90,90]
    lat: null
    coord_precision: 县级 | 乡镇级 | 推定    # COORD_PRECISIONS
    coord_source: ""        # 坐标来源；inferred=true 时必填
    visit_date: {…}         # 到访时间，允许未知
    kind: 出生 | 居住 | 游历 | 任职 | 谪迁 | 逝世 | 纪念地   # FOOTPRINT_KINDS
    route_order: 1          # 路线顺序，同序号并列
    memorial_only: false    # true 表示仅为后世纪念地，不是确证到访
    inferred: false         # 推定路线必须 true 且渲染层降级展示
    # …§3 证据字段

relations:
  - relation_type: 挚友 | 师承 | 同僚 | 论敌 | 亲属 | 社群 | 思想影响 | 后世附会   # RELATION_TYPES
    target_id: du-fu        # 目标人物 figures.yaml id（校验存在性）
    direction: 双向 | 单向   # 单向时以本人物为起点
    period: {…}             # 关系存续期，允许未知
    evidence: ""            # 交往证据摘要（可证实交往必填）
    # …§3 证据字段；「后世附会」类强制 inferred: true

reception:                  # 接受史分层（附录 A §A2 评价中立性要求）
  - era: 同时代 | 历代批评 | 近现代学术 | 教科书与公共文化 | 影视与网络   # RECEPTION_ERAS
    evaluator: ""           # 评价者/出处语境
    quote: ""               # 引文边界内的短引
    text_display: full | excerpt | none
    comment: ""             # 本项目的中立转述
    # …§3 证据字段

sources_used: [src-hist-001]   # 本文件引用的全部来源 id（须 ⊆ data/sources.yaml 注册表）

version_notes:
  created: 2026-08-25
  last_reviewed: 2026-08-25
  revisions:
    - {date: 2026-08-25, note: 初版}
```

## 6. 来源注册表（全局）

新建 `data/sources.yaml`（顶层数组，沿用现有解析器），条目结构即附录 A §A6/S1 模板：`id, type, title, author_or_org, edition_or_url, access_date, pub_date, isbn_or_id, notes, status(有效|失效)`。详卷只引用 ID，不在各自文件里重复登记书目信息。

## 7. 枚举汇总（enums.js 新增导出）

| 枚举 | 取值 |
|---|---|
| `DATE_PRECISIONS` | 精确 / 约 / 范围 / 未知 |
| `GENDERS` | 男 / 女 / 不详 |
| `ATTRIBUTIONS` | 确凿 / 存疑 / 托名 |
| `DISPLAY_LEVELS` | full / excerpt / none |
| `FOOTPRINT_KINDS` | 出生 / 居住 / 游历 / 任职 / 谪迁 / 逝世 / 纪念地 |
| `COORD_PRECISIONS` | 县级 / 乡镇级 / 推定 |
| `RELATION_TYPES` | 挚友 / 师承 / 同僚 / 论敌 / 亲属 / 社群 / 思想影响 / 后世附会 |
| `RECEPTION_ERAS` | 同时代 / 历代批评 / 近现代学术 / 教科书与公共文化 / 影视与网络 |
| `FIGURE_ROLES` | 诗人 / 词人 / 散文家 / 辞赋家 / 戏曲家 / 小说家 / 史学家 / 文学批评家 / 思想家 / 政治家 / 军事家 / 科学家 / 医学家 / 地理学家 / 旅行家 / 书法家 / 画家 / 音乐家 / 教育家 / 实业家 / 宗教人物 / 探险家 / 工程师 / 外交家 |

约定：`RELATION_TYPES/FOOTPRINT_KINDS/RECEPTION_ERAS` 为受控枚举（校验报错）；`roles/tags/genre/themes/offices` 为开放文本（仅类型校验），保证非文学人物与非主流体裁不被枚举卡死（TASK-012 适配前提）。

## 8. 校验要点清单（TASK-002 实现范围）

1. `id` 与文件名一致，且存在于 figures.yaml；
2. `has_detail` 与文件存在性双向一致；
3. `schema_version === 1`；
4. 日期模型三形态合法性（未知禁 year、范围成对有序）；
5. `timeline` 的 `related_year` 若提供，须落在某朝代区间（复用 spans 判定）；`related_event_id` 存在于 events；
6. `relations.target_id` 存在于 figures.yaml；禁止自指；
7. `footprints` 坐标范围与精度联动（推定必有来源；纪念地强制 `memorial_only: true`）;
8. `text_display !== 'full'` 的条目不得携带超长 `excerpt`（上限 200 字，超出报错）；
9. `sources_used` 与各条目 `source_ids` 均须存在于 sources.yaml；`status: 失效` 来源引用产生警告；
10. `work_id` 人物内唯一；非法值报错均带 file:line。

## 9. 夹具

- 合法夹具：`test/fixtures/figure-detail/valid-sample.yaml`
- 非法夹具：`test/fixtures/figure-detail/invalid-sample.yaml`（集中覆盖：schema_version 错误、未知日期带 year、范围倒置、断链 relation、坐标越界、full 超长摘录、失效来源引用）

两份夹具供 TASK-002 的 Vitest 使用，同时作为数据作者的参考样例。
