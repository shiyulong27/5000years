# 1946 年重大事件候选与核验计划

## 目标

参考 1947 年事件补全提交的粒度与落库方式，补全 1946 年中国与世界重大事件，并注册年度专页与时间线入口。

## 中国候选

| 日期 | 事件 | 拟定 ID | 分类 | 重要度 | 核验来源 |
|---|---|---|---|---:|---|
| 1946-01-10 | 政治协商会议在重庆开幕 | cn-ppcc-chongqing-194601 | 政治 | 4 | 中文维基百科、英文维基百科、中国共产党新闻网 |
| 1946-06-26 | 国民党军进攻中原解放区，全面内战爆发 | cn-full-civil-war-194606 | 战争 | 5 | 中国共产党新闻网、中文维基百科 |
| 1946-12-25 | 制宪国民大会通过《中华民国宪法》 | cn-constitution-adopted-194612 | 政治 | 4 | 中文维基百科、英文维基百科 |

## 世界候选

| 日期 | 事件 | 拟定 ID | 分类 | 重要度 | 核验来源 |
|---|---|---|---|---:|---|
| 1946-01-10 | 联合国大会第一届会议开幕 | w-un-general-assembly-first-194601 | 政治 | 5 | United Nations、英文维基百科 |
| 1946-02-14 | ENIAC 公布，电子通用计算机时代开启 | w-eniac-announced-194602 | 文化 | 4 | 宾夕法尼亚大学、NIST、英文维基百科 |
| 1946-03-05 | 丘吉尔发表“铁幕”演说 | w-iron-curtain-speech-194603 | 政治 | 5 | 美国国务院历史办公室、英文维基百科 |
| 1946-06-02 | 意大利公投废除君主制，建立共和国 | w-italy-republic-194606 | 政治 | 4 | 意大利总统府、Encyclopaedia Britannica、英文维基百科 |
| 1946-07-04 | 菲律宾脱离美国正式独立 | w-philippines-independence-194607 | 政治 | 4 | 美国国务院历史办公室、英文维基百科 |
| 1946-10-01 | 纽伦堡国际军事法庭宣判 | w-nuremberg-verdicts-194610 | 政治 | 5 | United States Holocaust Memorial Museum、英文维基百科 |
| 1946-12-11 | 联合国儿童基金会成立 | w-unicef-founded-194612 | 文化 | 4 | UNICEF、United Nations、英文维基百科 |

## 来源审计

- 已读取或检索核验的来源类型：
  - 1946 年中文与英文维基百科年度页。
  - 中国共产党新闻网关于重庆政协会议、全面内战与中原突围相关资料。
  - 联合国官网关于联合国大会第一届会议和 UNICEF 成立资料。
  - 美国国务院历史办公室关于“铁幕”演说与菲律宾独立资料。
  - United States Holocaust Memorial Museum 关于纽伦堡审判判决资料。
  - 宾夕法尼亚大学、NIST 关于 ENIAC 公开展示资料。
  - 意大利总统府、Encyclopaedia Britannica 关于 1946 年意大利共和国公投资料。
- 未找到或不采用：
  - 未找到可直接引用的 1946 年新华社年度十大新闻正文；按项目既有 1947 年处理方式，1978 年以前以党史、政府机构、国际组织、专业机构和维基百科补查。
  - 本次未强行补配图片，避免早期资料图片与事件现场不匹配。

## 验收

- 中国事件 3 条。
- 世界事件 7 条。
- 已创建 `src/pages/1946.astro`。
- 已在 `Timeline.astro` 与 `AxisCell.astro` 注册 1946 年概览/详情入口。
- `npm run validate` 通过。
- `npx vitest run test/load.test.js test/validate.test.js test/1948-events.test.js` 通过。
- `npm test` 存在既有无关失败：`test/xia-content.test.js` 的夏朝内容断言失败，以及 `test/2020-2024-event-images.test.js` 图片审计超时。
