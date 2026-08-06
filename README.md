# 上下五千年 · 历史时间线

一幅纵贯五千年的长卷时间线。从上古传说到 2026，中国朝代、人物与
世界文明色带并置于一轴，可缩放、可筛选、可对照东西方历史进程。

纯静态站点，数据为 YAML，构建期强校验，绝不发布错误页面。

## 项目一览

- **技术栈**：Astro 5 · js-yaml · vitest · Playwright（诊断脚本）· GitHub Actions
- **数据模型**：`data/` 下 YAML——朝代（dynasties）、事件（events）、
  君主（rulers）、人物（figures）、世界事件（world）、文明色带（civilizations）
- **渲染**：`src/lib/timeline.js` 纯函数把数据编译为行/列，Astro 组件布局
- **质量闸门**：`npm run build` 串联 校验 → 单测 → 构建，任一步失败即中断

## 本地运行

```bash
npm i          # 安装依赖
npm run dev    # 开发服务器，http://localhost:4321/5000years/
npm run build  # 校验 + 测试 + 构建，产物在 dist/
npm run validate  # 仅跑数据校验
```

## 数据贡献流程

1. **读速查**：`docs/superpowers/plans/phase7-todo.md` 的「数据模型速查」——
   date 用四位补零字符串（`"-0221"`、`"0618"`、`"1937-07-07"`），
   公元前为负；category 五类（政治/战争/文化/经济/灾害）；
   confidence 四等（确定/存疑/有争议/传说）。
2. **改数据**：在 `data/` 对应文件增删条目。
3. **校验**：`npm run validate`。errors=0 才可提交；warnings 需懂来源。
4. **争议标注**：confidence 非「确定」必须填 `dispute` 说明争议内容，
   不得只标「有争议」而不写为何。异说一律按争议机制标注，不伪造精确。
5. **提交**：消息格式跟随历史（`feat(data): …`、`ci: …`）。

## 外部 AI 审查

数据量大、AI 生成与人工编辑混合，建议定期用强模型全量复审：
[`docs/prompts/data-review.md`](docs/prompts/data-review.md) 提供四套
审查模板（史实交叉、表述中性、争议标注、编年一致性），可产出
`条目id | 问题类型 | 说明 | 建议` 表后逐条修复。

## 阶段计划索引

- 实施计划：`docs/superpowers/plans/phase7-todo.md`（阶段七：长卷数据延伸至 2026 + CI/CD）