# 5000years - 中华五千年与世界文明长卷

纯静态 Astro 打造的历史长卷可视化平台，将中国历史朝代、大事记、重要君主、文化人物与世界文明发展交织呈现。

---

## 1. 项目一览

- **中国史线**：覆盖上古至 现代（-3000 ~ 2026），包含朝代色带、重大政治/战争/文化/经济/灾害事件及君主在位时段。
- **世界史与文明泳道**：同步呈现在地中海、欧洲、西亚、美洲及印度等文明区域的发展演变与重大历史事件。
- **人物层**：整合重要历史人物生卒年与领域，支持开关显示。

---

## 2. 本地运行

```bash
# 安装依赖
npm install

# 启动本地开发服务器
npm run dev

# 运行数据校验与单元测试
npm test

# 生产环境构建
npm run build
```

---

## 3. 数据贡献流程

数据文件存放于 `data/` 目录，格式为 YAML。

### 数据模型速查
- **朝代 (`data/dynasties.yaml`)**: `id`, `name`, `start`, `end`, `color`, `summary`, `parent`（可选）, `concurrent`（可选）。
- **事件 (`data/events/*.yaml`)**: `id`, `date`, `title`, `category` (政治/战争/文化/经济/灾害), `importance` (1–5), `summary`, `confidence`, `dispute`（`confidence` 非「确定」时必填）。
- **君主 (`data/rulers/*.yaml`)**: `dynasty` (须为叶子朝代), `temple_name`, `name`, `reign_start`, `reign_end`, `era_names`, `note`, `role` (founder/last), `confidence`.
- **人物 (`data/figures.yaml`)**: `id`, `name`, `birth`, `death`, `field` (文学/思想/政治/军事/科技/艺术), `confidence`.
- **文明 (`data/civilizations.yaml`)**: `name`, `start`, `end`, `region`, `color`.

### 校验规范
提交数据前须运行校验器：
```bash
node scripts/validate.mjs
```
确保 `errors=0`。

---

## 4. 外部 AI 审查提示词指引

在对数据进行史实与表述复审时，可参考项目内置的 AI 审查提示词模板：
`docs/prompts/data-review.md`

---

## 5. 阶段计划索引

- `docs/superpowers/plans/phase7-todo.md` - 阶段七实施计划（长卷数据延伸至 2026 + CI/CD）
