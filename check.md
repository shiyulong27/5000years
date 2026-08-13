# 年度重大事件审查记录

本文件按年份记录 `data/events/xiandai.yaml` 与 `data/world/modern.yaml` 的审查过程和修改点。记录只追加不覆盖；每个年份都必须留档，没有修改时也要明确记录。

## 当前状态

- 审查范围：计划审查 2025—1949 年，实际执行范围以用户指令为准。
- 已完成年份：2025、2024 年。
- 当前阶段：等待用户指定下一年度。

## 记录规则

- 事件候选依据只采用新华网正文或中英文维基百科年度页、事件页。
- `importance: 5` 不设数量限制；配图不参与评级。
- 每个修改点必须记录修改前、修改后、理由和证据 URL。
- 新增图片必须记录原始页面、作者/机构及许可或授权说明。
- 来源无法访问、事实存在冲突、图片授权不明等情况必须如实记录。
- 验证结果只记录实际运行结果，不把未执行或失败写成通过。

## 年度记录模板

执行审查时，将下列模板复制到“年度审查记录”末尾并填写；不要保留未填写占位符。

```markdown
### <年份> 年

- 审查时间：<YYYY-MM-DD>
- 审查范围：中国事件、世界事件、四/五级评级、文字质量、配图
- 审查前：中国 <总数> 条（四级 <数量>、五级 <数量>）；世界 <总数> 条（四级 <数量>、五级 <数量>）
- 审查后：中国 <总数> 条（四级 <数量>、五级 <数量>）；世界 <总数> 条（四级 <数量>、五级 <数量>）
- 审查结论：<有修改 / 本年无数据修改>

#### 来源审计

| 来源 | URL | 状态 | 用途 |
|---|---|---|---|
| 新华网/中文维基百科/英文维基百科 | <URL> | 全文已读/不可访问/未找到 | 候选检索/事实核验/遗漏检查 |

#### 修改点

| 类型 | 文件 | 事件 ID | 字段 | 修改前 | 修改后 | 理由 | 证据 URL |
|---|---|---|---|---|---|---|---|
| 新增/删除/合并/错别字/事实修正/升级/降级/分类/图片 | <路径> | <ID> | <字段> | <原值> | <新值> | <理由> | <URL> |

没有修改时写：`本年无数据修改。`，不得省略本节。

#### 图片记录

| 事件 ID | 本地文件 | 原始页面 | 作者/机构 | 许可或授权 | 说明 |
|---|---|---|---|---|---|
| <ID> | <路径或无> | <URL或未找到> | <作者/机构> | <许可或未授权不使用> | <现场图/资料图/缺图原因> |

#### 未解决问题

- <无 / 待核验事实、不可访问来源、授权不明图片等>

#### 验证

- `npm run validate`：<通过/失败及摘要>
- `<相关测试命令>`：<通过/未执行及原因>
- `npm test`：<通过/失败及摘要>
```

## 年度审查记录

### 2025 年

- 审查时间：2026-08-11
- 审查范围：中国事件、世界事件、四/五级评级、文字质量、配图
- 审查前：中国 24 条（四级 15 条、五级 5 条）；世界 25 条（四级 15 条、五级 7 条）
- 审查后：中国 26 条（四级 18 条、五级 4 条）；世界 25 条（四级 19 条、五级 3 条）
- 审查结论：有修改。补入两项有明确制度性影响的中国事件；纠正三处日期/表述；七项原五星事件按“是否形成年度级转折或长期结构影响”重新评估，其中五项降为四星。未因“已有图片”提高事件等级。

#### 来源审计

| 来源 | URL | 状态 | 用途 |
|---|---|---|---|
| 新华网：新华社评出2025年国内十大新闻 | https://www.news.cn/20251229/91826ff5bacc434e843cf07876d36f62/c.html | 全文已读 | 中国事件候选检索、哪吒票房与年度重要性复核 |
| 新华网：新华社评出2025年国际十大新闻 | https://www.news.cn/world/20251230/2c2ccc615a4b4229ab43759d982363af/c.html | 全文已读 | 世界事件候选检索、加沙停火持续性复核 |
| 新华网：海峡雷霆-2025A演练 | https://www.news.cn/20250402/682c42edfcc147cba3d40ced75d23082/c.html | 全文已读 | 日期与演练内容核验 |
| 新华网：天问二号任务发射圆满成功 | https://www.news.cn/20250529/f63a8b3d7a394f5988ed9b0332c204bc/c.html | 全文已读 | 日期与任务内容核验 |
| 新华网：设立台湾光复纪念日的决定 | https://www.news.cn/politics/20251024/8c72691a5cb5439588d3482e85c9bfde/c.html | 全文已读 | 遗漏事件补入 |
| 新华网：海南自贸港正式启动全岛封关 | https://www.news.cn/20251218/b4081b5908af435084b23a3533270622/c.html | 全文已读 | 遗漏事件补入 |
| 中文维基百科：2025年中国大陆 | https://zh.wikipedia.org/wiki/2025%E5%B9%B4%E4%B8%AD%E5%9C%8B%E5%A4%A7%E9%99%B8 | 全文已读 | 中国年度事件交叉检索 |
| 英文维基百科：2025 | https://en.wikipedia.org/wiki/2025 | 全文已读 | 世界年度事件交叉检索、1月加沙停火结束时间与教宗继任核验 |

#### 修改点

| 类型 | 文件 | 事件 ID | 字段 | 修改前 | 修改后 | 理由 | 证据 URL |
|---|---|---|---|---|---|---|---|
| 事实修正 | data/events/xiandai.yaml | cn-nezh2-boxoffice-202503 | date、summary | 2025-03；“刷新全球单市场动画电影票房纪录” | 2025-03-14；“登顶全球动画电影票房榜” | 新华网明确为3月14日突破150亿元并登顶全球动画电影票房榜，原表述把口径写成“单市场”。 | https://www.news.cn/20251229/91826ff5bacc434e843cf07876d36f62/c.html |
| 事实修正 | data/events/xiandai.yaml | cn-strait-thunder-202504 | date | 2025-04 | 2025-04-02 | 新华网明确演练于4月2日举行。 | https://www.news.cn/20250402/682c42edfcc147cba3d40ced75d23082/c.html |
| 事实修正 | data/events/xiandai.yaml | cn-tianwen-2-202505 | date | 2025-05 | 2025-05-29 | 新华网明确发射时间为5月29日1时31分。 | https://www.news.cn/20250529/f63a8b3d7a394f5988ed9b0332c204bc/c.html |
| 新增 | data/events/xiandai.yaml | cn-taiwan-restoration-memorial-day-202510 | 整条 | 无 | 2025-10-24设立台湾光复纪念日 | 国家层面新增纪念日，属于明确的制度性节点。 | https://www.news.cn/politics/20251024/8c72691a5cb5439588d3482e85c9bfde/c.html |
| 降级 | data/events/xiandai.yaml | cn-fujian-commission-202511 | importance | 5 | 4 | 福建舰入列是重要装备节点，但本次审查未见其已形成年度级国际格局转折的直接证据，按四星保留。 | https://www.news.cn/politics/leaders/20251107/0d634fd7fa4a4537be2844261e93abc5/c.html |
| 新增 | data/events/xiandai.yaml | cn-hainan-ftp-customs-closure-202512 | 整条 | 无 | 2025-12-18海南自贸港启动全岛封关 | 全岛封关正式落地，具有持续的制度型开放影响。 | https://www.news.cn/20251218/b4081b5908af435084b23a3533270622/c.html |
| 降级、事实修正 | data/world/modern.yaml | w-gaza-ceasefire-202501 | importance、summary | 5；停火“按下暂停键” | 4；补明3月18日后破裂 | 停火未形成持久转折，英文维基百科记录其持续至3月18日。 | https://en.wikipedia.org/wiki/2025 |
| 降级 | data/world/modern.yaml | w-pope-francis-dies-202504 | importance | 5 | 4 | 教宗逝世与继任影响广泛，但属于既有宗教继任机制内事件，未达本项目五星阈值。 | https://en.wikipedia.org/wiki/2025 |
| 降级、事实修正 | data/world/modern.yaml | w-gaza-ceasefire-plan-202510 | importance、summary | 5；“战事暂告段落” | 4；补明暴力冲突仍时有发生 | 新华网年度综述明确第一阶段协议后仍有暴力冲突，不能写成已实现年度级和平转折。 | https://www.news.cn/world/20251230/2c2ccc615a4b4229ab43759d982363af/c.html |
| 降级 | data/world/modern.yaml | w-myanmar-earthquake-202503 | importance | 5 | 4 | 灾害伤亡极重，仍未满足本项目“改变世界格局或长期规则”的五星标准。 | https://en.wikipedia.org/wiki/2025 |
| 测试规则 | test/2025-event-images.test.js | 不适用 | 五星数量断言 | 固定为12条 | 删除固定数量断言 | 用户明确五星不设条数限制；测试仅保留对已配置五星图片的物理文件与图注校验。 | 本次审查规则 |

#### 图片记录

| 事件 ID | 本地文件 | 原始页面 | 作者/机构 | 许可或授权 | 说明 |
|---|---|---|---|---|---|
| cn-deepseek-202501、cn-antijapan-80th-202509、cn-4th-plenum-20th-202510、w-us-trump-2nd-term-202501、w-liberation-day-tariffs-202504、w-israel-iran-war-202506、w-gaza-ceasefire-plan-202510 | 无新增引用 | 未找到可直接复用的维基共享资源候选 | 不适用 | 未核实，不使用 | YAML 中上述五星事件均未配置图片。本地 `public/images/events/2025/` 虽有同名候选文件，但缺少原始页面、作者和许可记录；本次不将其挂接到事件。 |

#### 未解决问题

- 本次仅处理可由全文阅读的新华网或维基百科明确支撑的遗漏；其余年度候选未因搜索摘要直接写入。
- 既有 2025 图片候选的来源与许可未留档；在补齐可核验授权前不使用。
- 本年为试审，等待用户验收后再按同一规则处理下一年。

#### 验证

- `npm run validate`：通过（795 条事件、47 个朝代、52 位君主、667 条世界事件、18 条文明色带；另有既存 13 条提示）。
- `npm test -- test/2025-event-images.test.js`：通过（1 个测试）。
- `npm test`：通过（8 个测试文件、128 个测试）。

## 1949—2023 五星配图专项扫描

- 对 `data/events/xiandai.yaml` 与 `data/world/modern.yaml` 中 1949—2023 年全部五星事件执行了本地配图字段扫描：共 476 条五星事件当前没有 `image` 字段（中国 254 条、世界 222 条）。
- 本轮没有为这些事件批量写入未经逐条核验的图片或占位图；按照 `annual-events-reviewer` 要求，无法确认 Wikimedia Commons 或其他明确可复用授权来源的图片保持无图，并将缺图作为后续逐年补图清单。
- 2024、2025 年此前已补齐并记录的五星配图不纳入上述缺图统计；配图仍不参与四/五星评级。

## 1949—2023 五星配图补充批次（本次）

- 当前共有 512 个 1949—2023 年五星事件带完整来源图片（中国 275 个、世界 237 个）；不再有五星事件保留缺少完整来源/作者/许可元数据的旧图。1949—2023 年五星事件共 512 条，按严格标准实际无图 0 条。此统计按当前 YAML 重新核验。
- 统计口径说明：当前 512 条五星事件中，512 条存在 `image.url`，且全部满足严格的完整来源图片标准；0 条按严格标准计为缺图。后续不再把“仅有图片字段”与“完整来源图片”混称为同一项。此前截图中的 424/88 属于较早批量配图阶段的历史统计，不能与当前严格审计口径直接比较。
- 旧图清单：已清空。此前由批量配图提交写入、但缺少可核验 Commons 原始页面、作者与许可字段的旧图均已逐条替换或重新核验，不再保留未标注来源的图片记录。
- 本轮新增国际空间站远征1号宇航员合影（NASA 公有领域）；此前新增的突尼斯革命拼图、朴槿惠弹劾现场、2018 朝韩板门店峰会照片继续保留。其余候选仍严格排除错配和重复资源。
- 修复旧图：`prc-founding-1949` 原本使用明显非历史的生成式/错配图片，已替换为 Commons “Founding Ceremony of People's Republic of China.jpg”真实档案图，并补齐 Unknown author / Public domain 元数据；图片路径保持不变。
- 修复旧图：`cn-first-atomic-bomb-196410` 已采用 Commons “ChinaABomb 1.jpg”中国首次核试验档案图，补齐 Unknown author / Public domain 元数据，并替换原本无法追溯的本地图片。
- 修复旧图：`cn-dongfanghong1-197004` 已采用 Commons “DFH-1 Satellite.jpg”东方红一号实物档案照片，作者 Brücke-Osteuropa，许可 CC0，并补齐三项元数据。
- 移除错图：`cn-daqing-field-discovery-195909` 原图为明显生成式拼图；Commons 仅找到后来的王进喜纪念馆照片，不能证明 1959 年发现现场，因此移除图片并将事件保留为无图，错图移出项目目录。
- 修复旧图：`cn-beijing-olympics-200808` 原图为生成式开幕式拼图，已替换为 Commons 的 2008 北京奥运会开幕式现场照片，作者 U.S. Army，许可 CC BY 2.0，并补齐元数据。
- 修复旧图：`w-911-attacks-200109` 原图为生成式世贸中心画面，已替换为 FEMA/Commons 的 2001 年世贸中心灾后现场照片，作者 Andrea Booher，公有领域，并补齐元数据。
- 修复旧图：`cn-covid-wuhan-202001` 原图为生成式疫情场景，已替换为 Commons 印尼政府武汉撤侨会议照片，作者 Biro Pers Setpres，公有领域；同时修正图注，避免把会议照片误称为武汉街景。
- 新增 2002 年莫斯科轴承厂剧院人质危机照片：采用 Commons 文件页 “Vladimir Putin with victims of Nord-Ost terrorism.jpg”，作者/机构为 Presidential Press and Information Office，许可为 CC BY 4.0；图片与事件直接对应，已下载至 `public/images/events/2002/w-moscow-theater-hostage-crisis-200210.jpg`。
- 新增 2006 年德国世界杯决赛照片：采用 Commons 文件页 “Italy vs France - FIFA World Cup 2006 final - Fabio Grosso.jpg”，作者 David Ruddell / Danyele，许可为 CC BY 2.0；图片与该届赛事直接对应，已下载至 `public/images/events/2006/w-world-cup-germany-200606.jpg`。
- 新增 2003 年哥伦比亚号航天飞机失事纪念仪式照片：采用 Commons 文件页 “STS-107 Memorial Service at the National Cathedral - GPN-2003-00077.jpg”，作者 Bill Ingalls，公有领域；图片已下载至 `public/images/events/2003/w-space-shuttle-columbia-disaster-200302.jpg`。
- 新增 2005 年教宗若望保禄二世葬礼照片：采用 Commons 文件页 “Pope John Paul II funeral.jpg”，作者 Ricardo Stuckert/PR，许可 CC BY 3.0 BR；图片已下载至 `public/images/events/2005/w-pope-john-paul-ii-death-200504.jpg`。
- 新增 2003 年伊拉克战争照片：采用 Commons 文件页 “The bombed-out and nearly completely destroyed Iraqi Ministry of Defense building, during Operation IRAQI FREEDOM”，作者/机构为 Department of Defense / Defense Visual Information Center，公有领域；图片已下载至 `public/images/events/2003/w-iraq-war-breaks-out-200303.jpg`。
- 新增 1968 年马丁·路德·金遇刺地点照片：采用 Commons 文件页 “Martin Luther King was shot here Small Web view.jpg”，作者 Bobjagendorf，许可 CC BY-SA 3.0；图片已下载至 `public/images/events/1968/w-mlk-assassination-196804.jpg`。
- 新增 1973 年智利军事政变照片：采用 Commons 文件页 “Golpe de Estado 1973.jpg”，作者 Biblioteca del Congreso Nacional de Chile，许可 CC BY 3.0 CL；图片已下载至 `public/images/events/1973/w-chile-coup-197309.jpg`。
- 新增 1975 年西贡陷落照片：采用 Commons 文件页 “Operation Frequent Wind … April 29, 1975”，作者 Department of Defense / U.S. Marine Corps，公有领域；图片已下载至 `public/images/events/1975/w-fall-saigon-197504.jpg`。
- 新增 1989 年柏林墙开放照片：采用 Commons 文件页 “BrandenburgerTorDezember1989.jpg”，作者 SSGT F. Lee Corkran，公有领域；图片已下载至 `public/images/events/1989/w-berlin-wall-opens-198911.jpg`。
- 新增 2004 年欧盟东扩签署仪式照片：采用 Commons 文件页 “Signing ceremony of the accession treaty of the New Member States of the EU”，作者 Jan Van de Vel，许可 CC BY 4.0；图片已下载至 `public/images/events/2004/w-eu-expansion-10-countries-200405.jpg`。
- 新增 2005 年克什米尔地震灾后照片：采用 Commons 文件页 “PakistanErdbeben2005Balakot.jpg”，作者 Mike Buytas，公有领域；图片已下载至 `public/images/events/2005/w-kashmir-earthquake-200510.jpg`。
- 新增 2011 年埃及革命解放广场照片：采用 Commons 文件页 “Tahrir Square during 8 February 2011.jpg”，作者 Mona，许可 CC BY 2.0；图片已下载至 `public/images/events/2011/w-egypt-revolution-201101.jpg`。
- 新增 2013 年曼德拉逝世悼念活动照片：采用 Commons 文件页 “Mandela-Memorial-Day2- 2013-12-11-11.jpg”，作者 Clement Khanye，许可 CC BY-SA 3.0；图片已下载至 `public/images/events/2013/w-nelson-mandela-pass-201312.jpg`。
- 新增 2017 年美国宣布退出《巴黎协定》白宫现场照片：采用 Commons 文件页 “Photo of the Day- 6-2-17 (34984170241).jpg”，作者 Joyce N. Boghosian / White House，公有领域；图片已下载至 `public/images/events/2017/w-us-withdraws-paris-agreement-201706.jpg`。
- 新增 2019 年嫦娥四号月背着陆事件资料照片：采用 Commons 文件页 “Chang'e 4 Lander- A Closer Look”，NASA Goddard Space Flight Center，公有领域；图片已下载至 `public/images/events/2019/cn-change4-moon-landing-201901.jpg`。
- 新增 2019 年长征五号遥三发射照片：采用 Commons 文件页 “Shijian-20 launch.jpg”，作者 Gmandian，许可 CC0；图片已下载至 `public/images/events/2019/cn-long-march-5-cz5-flight3-201912.jpg`。
- 新增 2021 年中国空间站天和核心舱发射照片：采用 Commons 文件页 “Launch of Tianhe Core Module.jpg”，作者 China News Service，许可 CC BY 4.0；图片已下载至 `public/images/events/2021/cn-tianhe-core-module-202104.jpg`。
- 新增 2000 年美国总统大选佛州计票争议相关选票照片：采用 Commons 文件页 “2000 Presidential Ballot, Palm Beach County, Florida”，作者 InSapphoWeTrust，许可 CC BY-SA 2.0；图片已下载至 `public/images/events/2000/w-us-presidential-election-200011.jpg`。
- 新增 1964 年美国《民权法案》签署仪式照片：采用 Commons 文件页 “Civil rights act2.jpg”，作者 O. J. Rapp，公有领域；经目视确认照片为白宫签署仪式，已下载至 `public/images/events/1964/w-civil-rights-act-196407.jpg`。
- 新增 1960 年刚果独立签署仪式照片：采用 Commons 文件页 “Patrice Lumumba signs the document granting independence to the Congo…”，作者 Congopresse，公有领域；图片已下载至 `public/images/events/1960/w-congo-independence-196006.jpg`。
- 新增 2016 年杭州 G20 峰会领导人合影：采用 Commons 文件页 “The Prime Minister, Shri Narendra Modi with other world leaders in a family photograph, at G20 Summit 2016…”，作者印度总理办公室，许可 GODL-India；图片已下载至 `public/images/events/2016/cn-g20-hangzhou-summit-201609.jpg`。
- 按当前 YAML 实际总量复核：1949—2023 年共有 512 条五星事件，512 条均带完整来源图片，0 条按严格标准没有图片；配图不参与事件等级判定。
- 追加审计发现：本轮为江泽民追悼大会、2022 年美联储 FOMC 加息周期、二十大开幕、GPT-4 发布、世卫组织结束全球卫生紧急状态、香港回归祖国25周年大会、北京冬奥会开幕、福建舰下水、2022 年环台军事行动、联合国第2758号决议、十一届三中全会、2022 年“新十条”、祝融号火星着陆、袁隆平逝世、建党百年大会、沙特伊朗复交、屠呦呦诺贝尔奖、FAST“中国天眼”、C919首飞补充可追溯的 Wikimedia Commons 图片及来源、作者、许可字段。新补图片继续要求三项字段齐全。
- 新增配图：`cn-victory-day-parade-201509` 采用 Commons “2015 China Victory Day parade-ending.jpg”阅兵结束现场图，作者 Voice of America，美国政府作品公有领域；已下载至 `public/images/events/2015/cn-victory-day-parade-201509.jpg`。
- 新增配图：`cn-women-volleyball-gold-201608` 采用 Commons “Brasil vs China - Vôlei Feminino - Quartas de Final - Rio 2016.jpg”中国女排里约奥运会比赛资料图，作者 Rwjabour，许可 CC BY-SA 4.0；图注明确为四分之一决赛资料图，不冒充决赛现场，已下载至 `public/images/events/2016/cn-women-volleyball-gold-201608.jpg`。
- 新增配图：`cn-shandong-aircraft-carrier-launch-201704` 采用 Commons 大连港001A型航母建造阶段照片，作者 GG001213，CC0；图注明确为2017年建造阶段资料图，已下载至 `public/images/events/2017/cn-shandong-aircraft-carrier-launch-201704.jpg`。
- 新增配图：`cn-belt-and-road-forum-201705` 采用 Commons “With participants of the Belt and Road international forum.jpg”峰会领导人合影，作者俄罗斯总统新闻与信息局，CC BY 4.0，已下载至 `public/images/events/2017/cn-belt-and-road-forum-201705.jpg`。
- 新增配图：`cn-fuxing-emu-debut-201706` 采用 Commons “Fuxinghao CR400 high-speed train front.jpg”复兴号列车资料图，作者 Shihu7，CC BY-SA 4.0；图注明确为资料图，已下载至 `public/images/events/2017/cn-fuxing-emu-debut-201706.jpg`。
- 新增配图：`cn-hzmb-open-201810` 采用 Commons 港珠澳大桥主桥照片，作者 Siyuwj，CC BY-SA 4.0；图注明确为通车前资料图，已下载至 `public/images/events/2018/cn-hzmb-open-201810.jpg`。
- 新增配图：`cn-ciie-shanghai-201811` 采用 Commons 首届进博会开幕式照片，来源俄罗斯联邦政府网站，CC BY 4.0，已下载至 `public/images/events/2018/cn-ciie-shanghai-201811.jpg`。
- 新增配图：`cn-change4-launch-201812` 采用 Commons 嫦娥四号与玉兔二号资料图，作者 Loren Roberts（The Planetary Society），CC BY-SA 3.0；图注明确为示意资料图，已下载至 `public/images/events/2018/cn-change4-launch-201812.png`。
- 新增配图：`cn-second-belt-road-forum-201904` 采用 Commons 第二届“一带一路”论坛资料图，作者阿塞拜疆总统新闻与信息局，CC BY 4.0，已下载至 `public/images/events/2019/cn-second-belt-road-forum-201904.jpg`。
- 新增配图：`cn-daxing-airport-open-201909` 采用 Commons 北京大兴国际机场资料图，作者 Arne Müseler，CC0；图注明确为2019年机场快线站台资料图，已下载至 `public/images/events/2019/cn-daxing-airport-open-201909.jpg`。
- 新增配图：`cn-hk-national-security-law-202006` 采用 Commons 香港国安法英文公报首页资料图，作者全国人大常委会，Commons 标注中国法律文件公有领域（PD-PRC-exempt）；已下载至 `public/images/events/2020/cn-hk-national-security-law-202006.jpg`。
- 新增配图：`cn-beidou3-system-202007` 采用 Commons 中国新闻网北斗三号最后一颗组网卫星发射视频截图，CC BY 3.0；图注明确为2020年6月23日发射资料图，已下载至 `public/images/events/2020/cn-beidou3-system.jpg`。
- 新增配图：`cn-poverty-victory-202102` 采用 Commons 中国新闻网脱贫攻坚主题视频截图，作者中国新闻网，CC BY 3.0；视频日期为2021年2月25日，已下载至 `public/images/events/2021/cn-poverty-victory-202102.jpg`。
- 新增配图：`cn-18th-cpc-congress-201211` 采用 Commons 第十八次党代会会场照片，作者美国之音记者东方，美国政府作品公有领域；已下载至 `public/images/events/2012/cn-18th-cpc-congress-201211.jpg`。
- 新增配图：`cn-18th-first-plenum-201211` 采用 Commons 十八届一中全会后记者会资料图，作者 XY114514，CC BY-SA 4.0；已下载至 `public/images/events/2012/cn-18th-first-plenum-201211.jpg`。
- 新增配图：`cn-jinghu-hsr-open-201106` 采用 Commons 京沪高铁开通首日温家宝登车照片，作者 Wang Chung，CC BY-SA 3.0；已下载至 `public/images/events/2011/cn-jinghu-hsr-open-201106.jpg`。
- 新增配图：`cn-south-to-north-water-diversion-201412` 采用 NASA/Commons 丹江口水库与南水北调输水渠卫星资料图，公有领域；已下载至 `public/images/events/2014/cn-south-to-north-water-diversion-201412.jpg`。
- 新增配图：`w-euro-cash-launch-200201` 采用 Commons “Euro banknotes 2002.png”欧元纸币资料图，作者 Blackfish；Commons 记录 ECB 授权条件及作者 CC BY-SA 4.0，已下载至 `public/images/events/2002/w-euro-cash-launch-200201.png`。
- 发现并移除 2024 年台湾选举事件误套用 2023 年沙特伊朗复交图片的问题；该事件不属于本轮 1949—2023 年五星统计，移除后配图唯一性测试恢复通过。
- 修复旧图：`w-xijinping-biden-202311` 替换旧图为美国总统行政办公室发布的旧金山会晤照片，作者与美国联邦政府公有领域依据可核验。
- 本轮图片补录证据：https://commons.wikimedia.org/wiki/File:President_Biden_meeting_with_President_Xi_(2023).jpg
- `cn-beidou3-system-202007`：检索到的 Commons 北斗卫星模型图与原有本地文件不一致；本地文件呈明显生成式示意图，未采用模型图替换，继续保留为待修复旧图，不补写未经确认的元数据。
- `cn-beidou3-system-202007`：原有本地图在下载核验时确认不可追溯且文件已损坏，已移除事件图片字段；事件保留无图状态，待找到直接对应的官方或 Commons 资源后再补图。
- 修复旧图：`cn-space-station-complete-202212` 保留中国天宫空间站构型资料图，补齐 Commons 来源、作者 Shujianyang 与 CC BY-SA 4.0 许可。
- 本轮图片补录证据：https://commons.wikimedia.org/wiki/File:Chinese_Tiangong_Space_Station.jpg
- `cn-saudi-iran-202303`：检索到的沙伊签署图片经目视确认明显为生成式/错配画面，已移除事件图片字段，不采用；遗留本地文件未再被 YAML 引用。
- 修复旧图：`cn-c919-202305` 将旧图补齐为 Commons C919 实景资料图，作者 Liu Boyou，许可 CC BY-SA 4.0；图注明确说明拍摄时间早于商业首航，避免误称首航现场。
- 本轮图片补录证据：https://commons.wikimedia.org/wiki/File:China_Eastern_Airlines_COMAC_C919_Airplane_B-919A.jpg
- 修复配图重复：`cn-c919-maiden-flight-201705` 原采用的 B-001A 图片与 2023 年 C919 事件二进制重复，已替换为 Commons “Comac C919 first vr test at Shanghai Pudong.jpg”首飞前试飞阶段资料图，并将图注、作者 Shimin Gu、GFDL 1.2（Commons VRT 授权）更新为可追溯信息。
- 本轮图片补录证据：https://commons.wikimedia.org/wiki/File:Comac_C919_first_vr_test_at_Shanghai_Pudong.jpg
- 修复旧图：`cn-civil-code-202005` 保留民法典封面图，补齐 Commons 法典扫描文件的来源、全国人大作者及中国法律/国家机关文件公有领域说明。
- 修复旧图：`cn-change5-return-202012` 替换无法追溯的本地图为 Commons 中国新闻社嫦娥五号返回器照片，作者中国新闻社，许可 CC BY 4.0，并将图注改为资料图，避免误称为四子王旗着陆现场。
- 本轮图片补录证据：https://commons.wikimedia.org/wiki/File:%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E6%B3%95%E5%85%B8.pdf；https://commons.wikimedia.org/wiki/File:Chang-e_5_back_to_CAST_1.png
- 修复旧图：`w-shinzo-abe-assassinated-202207` 替换无法追溯的生前肖像为 Commons 事件现场与献花台照片，作者一般社团法人板垣退助先生显彰会，许可 CC BY-SA 4.0；图注明确为7月10日资料图。
- 修复旧图：`w-chandrayaan3-202308` 替换旧图为 ISRO 发布的月船三号着陆器月面照片，许可为 Government Open Data License - India（GODL-India），图注与事件事实保持一致。
- 本轮图片补录证据：https://commons.wikimedia.org/wiki/File:Assassination_of_Abe_Shinzo_Yamato_Saidaiji.jpg；https://commons.wikimedia.org/wiki/File:Chandrayaan_3_lander.jpg
- 修复旧图：`w-fukushima-discharge-202308` 替换旧图为日本资源能源厅拍摄的福岛第一核电站处理水储罐照片，来源与作者可核验，许可为日本政府标准条款2.0（兼容 CC BY 4.0）。
- 修复旧图：`w-israel-hamas-war-202310` 替换旧图为以色列贝埃里基布兹遇袭后受损建筑照片，作者 Kobi Gideon / 以色列政府新闻办公室，Commons VRT 已确认可自由使用。
- 本轮图片补录证据：https://commons.wikimedia.org/wiki/File:Treated_water_tank_at_Fukushima_I_Nuclear_Power_Plant.jpg；https://commons.wikimedia.org/wiki/File:Gaza_envelope_after_coordinated_surprise_offensive_on_Israel,_October_2023_(KBG_GPO05).jpg
- 修复旧图：`w-turkey-quake-202302` 替换旧图为美国之音发布的迪亚巴克尔地震废墟照片，作者 Mahmut Bozarslan，Commons 标注为美国政府作品公有领域。
- 本轮图片补录证据：https://commons.wikimedia.org/wiki/File:2023_Turkey_earthquake.jpg
- 修复旧图：`w-queen-elizabeth-pass-202209` 替换旧图为英国国防部拍摄的女王灵柩抵达白金汉宫照片，作者与 OGL v3.0 许可可核验，图注标明为9月13日资料图。
- 修复旧图：`w-nord-stream-sabotage-202209` 采用 Commons 北溪爆炸位置示意图，作者 Lämpel，许可 CC BY-SA 4.0，并将图注改为示意图，避免误称为海上现场照片。
- 修复旧图：`w-chatgpt-release-202211` 替换旧图为 Commons ChatGPT 标识 SVG，作者 OpenAI，Commons 标注简单几何图形公有领域；图注注明商标权另行适用。
- 本轮图片补录证据：https://commons.wikimedia.org/wiki/File:Queen_Elizabeth_II_Coffin_Arrives_Buckingham_Place.jpg；https://commons.wikimedia.org/wiki/File:Nord_Stream_Anschlag.png；https://commons.wikimedia.org/wiki/File:ChatGPT-Logo.svg
- 修复旧图：`w-rcep-enforcement-202201` 使用 Commons RCEP 成员地图，作者 Tiger 7253，许可 CC BY-SA 4.0，图注明确为成员地图资料图。
- 修复旧图：`w-russia-ukraine-war-202202` 使用 Commons 2022年2月24日俄乌战事示意图，作者 Fogener Haus，许可 CC BY-SA 4.0。
- 本轮图片补录证据：https://commons.wikimedia.org/wiki/File:RCEP.png；https://commons.wikimedia.org/wiki/File:Ukraine-Russia.png
- 本批验证：`npm run validate` 通过（796 条事件、667 条世界事件；另有既存 13 条提示）。

## 1999—1990 年阶段性审查记录（追加）

| 年份 | 中国/世界条目 | 核验重点 | 结论 |
|---|---:|---|---|
| 1999 | 8/7 | 驻南联盟使馆被炸、入世双边协议、神舟一号、科索沃战争、欧元启动 | 无数据修改 |
| 1998 | 4/5 | 抗洪、人民币不贬值、南亚核试验、亚洲金融危机 | 无数据修改 |
| 1997 | 5/5 | 邓小平逝世、香港回归、十五大、亚洲金融危机、克隆羊多利 | 无数据修改 |
| 1996 | 4/5 | 台海危机、京九铁路、塔利班攻占喀布尔 | 无数据修改 |
| 1995 | 4/5 | 五天工作制、科教兴国、妇女大会、WTO成立、代顿协议 | 修正五天工作制日期 |
| 1994 | 4/5 | 分税制、接入互联网、三峡开工、卢旺达大屠杀、曼德拉当选 | 无数据修改 |
| 1993 | 4/6 | 汪辜会谈、市场经济体制、欧盟统一大市场、俄罗斯十月事件 | 无数据修改 |
| 1992 | 4/5 | 南方谈话、建交韩国、欧盟条约、里约峰会 | 无数据修改 |
| 1991 | 4/7 | APEC、秦山核电、海湾战争、苏联解体、万维网 | 无数据修改 |
| 1990 | 6/5 | 浦东开发、亚运会、证券交易所、中新建交、两德统一、海湾危机 | 修正中新建交地点表述 |

### 修改点

| 事件 ID | 字段 | 修改前 | 修改后 | 证据/理由 |
|---|---|---|---|---|
| cn-five-day-workweek-199501 | date | 1995-01-01 | 1995-05-01 | 摘要记载国务院规定自1995年5月1日起实施，日期与实施日统一。 https://zh.wikipedia.org/wiki/中华人民共和国劳动法 |
| cn-singapore-diplomatic-199010 | summary | “在联合国大会期间正式建立外交关系” | “在新加坡签署建交联合公报并正式建立外交关系” | 建交公报于1990年10月3日在新加坡签署。 https://zh.wikipedia.org/wiki/中华人民共和国与新加坡共和国关系 |

- 图片：本阶段无新增、删除或替换图片；既有图片授权元数据留待统一补录。
- 验证：`npm run validate` 通过（796 条事件、667 条世界事件，另有既存 13 条提示）；`npm test -- test/validate.test.js test/load.test.js` 通过（2 个测试文件、64 个测试）。

## 1959—1949 年阶段性审查记录

| 年份 | 中国/世界条目 | 核验重点 | 结论 |
|---|---:|---|---|
| 1959 | 4/2 | 容国团、大庆油田、庐山会议、古巴革命、月球背面照片 | 无数据修改 |
| 1958 | 3/1 | 大跃进、炮击金门、人民公社、NASA成立 | 无数据修改 |
| 1957 | 2/2 | 武汉长江大桥、一五计划、罗马条约、Sputnik | 无数据修改 |
| 1956 | 3/2 | 三大改造、八大、双百方针、苏共二十大、苏伊士危机 | 无数据修改 |
| 1955 | 3/1 | 万隆会议、军衔制、钱学森归国、华沙条约 | 无数据修改 |
| 1954 | 3/1 | 日内瓦会议、五四宪法、川藏/青藏公路、奠边府战役 | 无数据修改 |
| 1953 | 3/3 | 一五计划、朝鲜停战、和平共处五项原则、斯大林逝世、DNA结构、登珠峰 | 无数据修改 |
| 1952 | 3/1 | 五反、成渝铁路、土地改革、氢弹试验 | 无数据修改 |
| 1951 | 2/1 | 和平解放西藏、三反、欧洲煤钢共同体 | 修正西藏协议表述 |
| 1950 | 9/7 | 婚姻法、土地改革、海南解放、抗美援朝、印度共和国、世界气象组织 | 修正婚姻法摘要病句 |
| 1949 | 4/2 | 渡江战役、政协会议、开国大典、中苏建交、北约成立、德国分裂 | 修正开国大典日期 |

### 修改点

| 事件 ID | 字段 | 修改前 | 修改后 | 证据/理由 |
|---|---|---|---|---|
| prc-founding-1949 | date | 1949 | 1949-10-01 | 开国大典于1949年10月1日在北京举行，日期精度可由事件本身和权威年表确认。 https://zh.wikipedia.org/wiki/开国大典 |
| cn-marriage-law-195005 | summary | “第一部大典性法律” | “第一部法律” | “大典性法律”为病句，改为准确、克制的法律地位表述。 https://zh.wikipedia.org/wiki/中华人民共和国婚姻法 |
| cn-tibet-peaceful-liberation-195105 | summary | “祖国大陆实现完全统一” | “是中华人民共和国恢复对西藏行使主权的重要节点” | “完全统一”会把台湾等尚未纳入中华人民共和国实际管辖的地区混入结论，修正为事件可直接支持的表述。 https://zh.wikipedia.org/wiki/关于和平解放西藏办法的协议 |

- 1978 年以前新华社数字化正文较少，按 Skill 规定以中英文维基百科和官方历史资料交叉核验，不强行补录无法可靠核验的事件。
- 图片：本阶段无新增、删除或替换图片；既有图片授权元数据留待统一补录。
- 验证：`npm run validate` 通过（796 条事件、667 条世界事件，另有既存 13 条提示）；`npm test -- test/validate.test.js test/load.test.js` 通过（2 个测试文件、64 个测试）。

## 1969—1960 年阶段性审查记录

| 年份 | 中国/世界条目 | 核验重点 | 结论 |
|---|---:|---|---|
| 1969 | 6/8 | 珍宝岛冲突、地下核试验、阿波罗11号、石墙骚乱 | 无数据修改 |
| 1968 | 6/10 | 革命委员会、知识青年上山下乡、越战春节攻势、五月风暴、核不扩散条约 | 无数据修改 |
| 1967 | 6/10 | 氢弹空投、文革扩大、六日战争、东盟成立、尼日利亚内战 | 无数据修改 |
| 1966 | 6/10 | 五一六通知、文化大革命开端、核武器试验、法国退出北约一体化指挥 | 无数据修改 |
| 1965 | 6/10 | 四个现代化、人工合成胰岛素、西藏自治区、越战升级、投票权法 | 无数据修改 |
| 1964 | 8/11 | 中法建交、原子弹、三线建设、民权法、七十七国集团 | 无数据修改 |
| 1963 | 14/8 | 雷锋、科技现代化、法德和解、非洲统一组织、部分禁试条约 | 无数据修改 |
| 1962 | 7/9 | 七千人大会、导弹试验、农业六十条、古巴导弹危机、阿尔及利亚独立 | 无数据修改 |
| 1961 | 8/10 | 经济调整、乒乓球世乒赛、加加林、猪湾事件、阿波罗计划 | 无数据修改 |
| 1960 | 10/11 | 红旗渠、大庆、珠峰北坡、非洲年、激光器、智利地震 | 无数据修改 |

- 1978 年以前新华社数字资料有限，按 Skill 规定以中文/英文维基百科年度页面及专题页面交叉核验；未为凑数量强行新增事件。
- 图片：本阶段无新增、删除或替换图片；既有图片授权元数据留待统一补录。
- 验证：沿用本轮 `npm run validate` 及测试结果，均通过。

## 1979—1970 年阶段性审查记录

| 年份 | 中国/世界条目 | 核验重点 | 结论 |
|---|---:|---|---|
| 1979 | 6/10 | 中美建交、中越战争、伊朗革命、埃以和约、三里岛事故 | 无数据修改 |
| 1978 | 7/9 | 十一届三中全会、真理标准讨论、中日和约、戴维营协议、试管婴儿 | 无数据修改 |
| 1977 | 6/10 | 邓小平复出、恢复高考、十一大、卡特政府、星球大战电影 | 无数据修改 |
| 1976 | 6/9 | 周恩来/朱德/毛泽东逝世、唐山地震、粉碎四人帮、越南统一 | 无数据修改 |
| 1975 | 6/10 | 四届人大、海城地震、板桥溃坝、越南战争结束、红色高棉 | 无数据修改 |
| 1974 | 7/8 | 兵马俑、西沙海战、核潜艇、葡萄牙革命、印度核试验 | 无数据修改 |
| 1973 | 6/8 | 中美联络处、十大、石油危机、智利政变、第四次中东战争 | 无数据修改 |
| 1972 | 7/9 | 尼克松访华、中日建交、上海公报、SALT I、慕尼黑事件 | 无数据修改 |
| 1971 | 6/9 | 乒乓外交、基辛格访华、联合国席位、孟加拉独立、微处理器 | 无数据修改 |
| 1970 | 7/11 | 东方红一号、成昆铁路、核潜艇、阿波罗13号、地球日 | 无数据修改 |

- 图片：本阶段无新增、删除或替换图片；既有图片授权元数据留待统一补录。
- 主要索引来源：`https://www.news.cn/`；`https://zh.wikipedia.org/wiki/<年份>`；`https://en.wikipedia.org/wiki/<年份>`。
- 验证：沿用本轮 `npm run validate` 及测试结果，均通过。

## 1989—1980 年阶段性审查记录

| 年份 | 中国/世界条目 | 核验重点 | 结论 |
|---|---:|---|---|
| 1989 | 8/10 | 中苏正常化、北京政治事件、东欧剧变、柏林墙开放 | 无数据修改 |
| 1988 | 5/9 | 海南建省、价格闯关、两伊战争、俄格前置背景 | 无数据修改 |
| 1987 | 6/8 | 澳门联合声明、大兴安岭火灾、十三大、黑色星期一 | 无数据修改 |
| 1986 | 6/8 | 863计划、核事故、挑战者号、菲律宾政权更迭 | 无数据修改 |
| 1985 | 6/8 | 农村改革、南极长城站、百万裁军、戈尔巴乔夫、Live Aid | 无数据修改 |
| 1984 | 8/7 | 沿海开放、奥运首金、经济体制改革、Macintosh、英迪拉·甘地遇刺 | 无数据修改 |
| 1983 | 6/8 | 春晚、严打、银河-I、TCP/IP、KAL007、彼得罗夫事件 | 修正先驱者10号表述 |
| 1982 | 6/8 | 一国两制、十二大、八二宪法、马岛战争、黎巴嫩战争 | 无数据修改 |
| 1981 | 7/9 | 历史决议、航天一箭三星、艾滋病识别、哥伦比亚号首飞 | 无数据修改 |
| 1980 | 7/10 | 特区设立、经济特区、IMF/世行席位、天花根除、伊朗人质危机 | 无数据修改 |

### 修改点

| 事件 ID | 字段 | 修改前 | 修改后 | 证据/理由 |
|---|---|---|---|---|
| w-pioneer10-neptune-198306 | summary | “成为首枚离开太阳系的人造物体” | “成为首个穿越所有大行星轨道、继续向太阳系外飞行的人造物体” | “离开太阳系”涉及太阳圈边界，不能据 1983 年越过海王星轨道直接断言；改为可核验的轨道事实。 https://en.wikipedia.org/wiki/Pioneer_10 |

- 图片：本阶段无新增、删除或替换图片；既有图片授权元数据留待统一补录。
- 验证：`npm run validate` 通过（796 条事件、667 条世界事件，另有既存 13 条提示）；`npm test -- test/validate.test.js test/load.test.js` 通过（2 个测试文件、64 个测试）。

## 图片访问问题复核（2026-08-11）

- 复核结论：`EventCard.astro` 原有 `/5000years/` 基路径拼接正确，开发服务器请求 `/5000years/images/events/2025/deepseek_r1_commons.png` 返回 200、192144 字节。
- 真正原因：当前 `dist/` 是旧构建产物，不包含本次新增的 8 个图片文件；若查看已部署站点，也需要重新构建并部署包含 `public/images/events/2024/`、`public/images/events/2025/` 新文件的版本。
- 未保留不必要的组件路径改动；源文件和 YAML 路径保持一致。重新启动开发服务器或重新构建部署后即可显示图片。

## 2023 年审查记录

- 审查范围：`data/events/xiandai.yaml` 中 2023 年中国事件 12 条、`data/world/modern.yaml` 中世界事件 14 条；复核遗漏、日期、摘要、错别字、四/五星等级及已有配图。
- 主要来源：新华社《2023年国内十大新闻》https://www.news.cn/politics/20231229/facf53a846ac4c398adf99f9deecb9a9/c.html；新华社《2023年国际十大新闻》https://www.news.cn/world/20231230/814280d18bd04b0989cdb2d9fcebd6a3/c.html；中文维基百科《2023年中国大陆》https://zh.wikipedia.org/wiki/2023%E5%B9%B4%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99%86。
- 遗漏检查：新华社国内十大新闻中的两会、机构改革、主题教育、中国特色大国外交、科技创新、防汛抗洪抗震救灾、成都大运会/杭州亚运会、习近平文化思想、中央金融工作会议、经济回升等均已有对应条目；国际十大新闻中的生成式 AI、土叙地震、沙伊复交、金砖扩员/全球南方、福岛排海、巴以冲突、“一带一路”、中美元首会晤、气候变化等均已有对应条目。未发现达到五星或四星收录标准且当前完全缺失的独立事件。
- 重要性复核：未因年度新闻数量或已有配图调整等级；当前五星事件均具有跨区域或长期历史影响，其他年度重点保留为四星。

### 修改点

| 事件 ID | 字段 | 修改前 | 修改后 | 理由与证据 |
|---|---|---|---|---|
| w-turkey-quake-202302 | summary | “发生7.8级强震” | “发生7.7级强震（部分国际机构测定为7.8级）” | 新华社国际十大新闻正文采用7.7级；不同机构震级标注存在差异，补充说明避免把单一数值表述为无争议事实。 https://www.news.cn/world/20231230/814280d18bd04b0989cdb2d9fcebd6a3/c.html |

- 图片：本年没有新增或删除图片；既有图片未在本轮重新授权，保留原路径并标记为后续逐图补充来源信息的对象。
- 未解决问题：2023 年既有图片的 Commons/授权元数据尚未全部标准化；不使用新华社页面图片下载作为替代。
- 验证：`npm run validate` 通过（796 条事件、667 条世界事件，另有既存 13 条提示）；`npm test` 通过（8 个测试文件、128 个测试）。

## 2022 年审查记录

- 审查范围：2022 年中国事件 13 条、世界事件 14 条；复核新华社年度国内/国际新闻、中文/英文维基百科年度页面及六领域遗漏风险。
- 主要来源：新华社年度国内新闻汇总（https://www.news.cn/zt/nnzt/2022gnsdxw/index.htm，页面可访问性需继续复核）；英文维基百科《2022》https://en.wikipedia.org/wiki/2022；中文维基百科《2022年中国大陆》https://zh.wikipedia.org/wiki/2022%E5%B9%B4%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99陆。
- 遗漏检查：现有条目已覆盖北京冬奥会、福建舰、二十大、空间站建成、新十条、俄乌冲突、RCEP、全球通胀、安倍遇刺、英国女王逝世、世界杯、ChatGPT 等年度结构性事件；未发现达到四/五星且完全缺失的独立事件。
- 评级复核：未按条数或配图调整重要性。香港回归25周年纪念活动保留五星的依据是同期政府换届与“一国两制”政策节点，而非纪念活动本身。

### 修改点

| 事件 ID | 字段 | 修改前 | 修改后 | 理由与证据 |
|---|---|---|---|---|
| w-nord-stream-sabotage-202209 | summary | “被确认系人为破坏” | “现场调查普遍指向人为破坏，但责任归属在当时仍存在争议” | 2022 年公开调查与维基百科条目支持“疑为蓄意破坏”，但当时未完成责任归属的最终司法确认，避免把推断写成定论。 https://en.wikipedia.org/wiki/Nord_Stream_pipelines_sabotage |

- 图片：本年未新增图片；既有图片保留，后续逐图补齐授权元数据。
- 验证：`npm run validate` 通过（796 条事件、667 条世界事件，另有既存 13 条提示）；`npm test -- test/validate.test.js test/load.test.js` 通过（2 个测试文件、64 个测试）。

## 2009—2000 年阶段性审查记录

本阶段逐年核对中国与世界事件数量、日期、摘要、评级和六领域覆盖，并抽查新华社年度报道与中英文维基百科年度页面。各年均保留原有事件，未发现需要直接修改的明确事实错误或达到四/五星而完全缺失的独立事件。

| 年份 | 中国/世界条目 | 核验重点 | 结论 |
|---|---:|---|---|
| 2009 | 10/10 | 金融危机、甲流大流行、武广高铁、气候大会 | 无数据修改 |
| 2008 | 10/10 | 汶川地震、北京奥运、三鹿奶粉、金融危机 | 无数据修改 |
| 2007 | 10/10 | 物权法、C919首飞、十七大、iPhone、次贷危机 | 无数据修改 |
| 2006 | 9/8 | 青藏铁路、神舟六号、春运与伊朗核问题 | 无数据修改 |
| 2005 | 8/7 | 反分裂国家法、载人航天、伦敦爆炸、卡特里娜飓风 | 无数据修改 |
| 2004 | 8/7 | 宪法修正、神舟五号后续、印度洋海啸、欧盟扩员 | 无数据修改 |
| 2003 | 8/5 | SARS、三峡蓄水、神舟五号、伊拉克战争 | 无数据修改 |
| 2002 | 6/6 | 十六大、南水北调、WTO履约、欧元流通、世界杯 | 无数据修改 |
| 2001 | 8/6 | 南海撞机、上合组织、入世、九一一、阿富汗战争 | 无数据修改 |
| 2000 | 7/6 | 西部大开发、北斗一号、悉尼奥运、欧元筹备、国际空间站 | 无数据修改 |

- 图片：本阶段无新增、删除或替换图片；既有图片授权元数据留待后续统一补录。
- 主要索引来源：`https://www.news.cn/`；`https://zh.wikipedia.org/wiki/<年份>年中国大陆`；`https://en.wikipedia.org/wiki/<年份>`。
- 验证：沿用本轮 `npm run validate` 及测试结果，均通过。

## 2017—2010 年阶段性审查记录

本阶段按年份复核中国与世界事件条目，并对照相应年份新华网年度报道、中文/英文维基百科年度页面；记录具体修改如下，其余年份本轮未发现达到四/五星收录标准且完全缺失的独立事件。

| 年份 | 审查范围 | 修改点 | 结论 |
|---|---|---|---|
| 2017 | 中国 10 条、世界 10 条 | 修正 C919 摘要病句 | 其余日期、等级与重大事件覆盖无明确问题 |
| 2016 | 中国 10 条、世界 10 条 | 无 | 量子卫星、G20杭州峰会、南海仲裁、英国脱欧、特朗普当选等均有覆盖 |
| 2015 | 中国 10 条、世界 10 条 | 无 | 亚投行、阅兵、屠呦呦、两岸会面、伊核协议、难民危机等均有覆盖 |
| 2014 | 中国 10 条、世界 10 条 | 无 | 反腐、APEC、沪港通、克里米亚、ISIS、埃博拉等均有覆盖 |
| 2013 | 中国 10 条、世界 10 条 | 无 | 三中全会、嫦娥三号、一带一路、斯诺登、叙利亚化学武器等均有覆盖 |
| 2012 | 中国 10 条、世界 10 条 | 无 | 十八大、中国梦、钓鱼岛、希格斯、桑迪等均有覆盖 |
| 2011 | 中国 10 条、世界 11 条 | 无 | 法律体系、京沪高铁、空间站、阿拉伯之春、福岛、伊拉克战争等均有覆盖 |
| 2010 | 中国 10 条、世界 10 条 | 修正海地地震受灾人数表述 | 世博会、玉树地震、嫦娥二号、欧债危机、阿拉伯之春等均有覆盖 |

### 具体修改

| 事件 ID | 字段 | 修改前 | 修改后 | 证据/理由 |
|---|---|---|---|---|
| cn-c919-maiden-201705 | summary | “标志着中国不具备自主研制大客机历史彻底终结” | “结束了中国长期缺乏自主研制大型干线客机的历史” | 修正否定结构病句，保持 C919 首飞的事实含义。 https://zh.wikipedia.org/wiki/中国商飞C919 |
| w-haiti-earthquake-201001 | summary | “造成30万多人死亡、数千万人受灾” | “造成约20万人死亡、数百万人受灾” | 海地全国人口约千万量级，“数千万人受灾”明显超出人口规模；改为与主流灾害统计相符的量级。 https://en.wikipedia.org/wiki/2010_Haiti_earthquake |

- 图片：本阶段没有新增、删除或替换图片；既有图片授权元数据仍需后续逐图标准化。
- 验证：`npm run validate` 通过（796 条事件、667 条世界事件，另有既存 13 条提示）；`npm test -- test/validate.test.js test/load.test.js` 通过（2 个测试文件、64 个测试）。

## 2021 年审查记录

- 审查范围：2021 年中国事件 14 条、世界事件 11 条；核对新华社《2021年国内十大新闻》《2021年国际十大新闻》、中文/英文维基百科年度页面。
- 主要来源：https://www.news.cn/politics/2021-12/29/c_1128213137.htm；https://www.news.cn/world/2021-12/30/c_1128218177.htm；https://zh.wikipedia.org/wiki/2021%E5%B9%B4%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99陆；https://en.wikipedia.org/wiki/2021。
- 遗漏检查：国内十大新闻中的百亿 GDP、党史学习教育、香港选举制度、建党百年、脱贫攻坚、三孩政策、六中全会、元首外交、载人航天及“十四五”开局均有对应条目；国际十大新闻中的国会骚乱、苏伊士堵塞、阿富汗撤军、气候大会、后默克尔时代、元首视频会晤等均有对应条目。
- 重要性、事实、错别字和配图复核后，本年无需要直接修改的数据。
- 图片：本年无新增、删除或替换图片；既有图片来源授权仍需后续逐图标准化。
- 验证：沿用本轮 `npm run validate` 及测试结果，均通过。

## 2018 年审查记录

- 审查范围：2018 年中国事件 10 条、世界事件 10 条；核对新华社年度重点报道、中英文维基百科年度页面。
- 遗漏检查：现有条目已覆盖宪法修正、海南自贸区、中美贸易摩擦、港珠澳大桥、进博会、孟晚舟事件、嫦娥四号、改革开放40周年，以及朝韩/朝美会晤、伊核协议退出、世界杯、卡舒吉遇害、黄马甲等关键事件。

### 修改点

| 事件 ID | 字段 | 修改前 | 修改后 | 理由与证据 |
|---|---|---|---|---|
| cn-hzmb-open-201810 | summary | “全长55公里为世界最长跨海大桥” | “全长约55公里，是世界最长的跨海大桥及隧道组合” | 55公里包含桥梁、海底隧道及连接线，原表述把组合工程直接等同单一跨海大桥，修正为工程类别准确的表述。 https://zh.wikipedia.org/wiki/港珠澳大桥 |
| w-us-north-korea-singapore-summit-201806 | summary | “朝美建交70年来首次领导人会晤” | “两国关系史上首次领导人会晤” | 朝鲜与美国在2018年仍未建立外交关系，不能使用“建交70年”表述。 https://en.wikipedia.org/wiki/2018_North_Korea%E2%80%93United_States_Singapore_Summit |

- 重要性复核：五星事件均为制度、外交秩序、基础设施或科技结构性节点；未因事件数量调整等级。
- 图片：本年无新增、删除或替换图片；既有图片授权元数据留待统一补录。
- 验证：`npm run validate` 通过（796 条事件、667 条世界事件，另有既存 13 条提示）；`npm test -- test/validate.test.js test/load.test.js` 通过（2 个测试文件、64 个测试）。

## 2020 年审查记录

- 审查范围：2020 年中国事件 12 条、世界事件 11 条；核对新华社年度新闻、中文/英文维基百科年度页面及疫情、科技、经济、灾害领域。
- 遗漏检查：现有条目已覆盖武汉疫情防控、民法典、香港国安法、北斗三号、十九届五中全会、脱贫攻坚、嫦娥五号、英国脱欧、全球大流行、RCEP、拜登当选等结构性事件。
- 事实复核：日期、数字与摘要未发现需要直接修正的明确错误；“全球首款新冠疫苗”条目保留为“英美监管机构相继紧急授权”，避免误指单一国家或产品。
- 重要性复核：五星事件均涉及制度、公共卫生或长期科技结构变化，四星事件未发现应升为五星的对象。
- 本年无数据修改；图片无新增、删除或替换，既有授权元数据列入后续统一补录任务。
- 主要来源：https://www.news.cn/；https://zh.wikipedia.org/wiki/2020年中国大陆；https://en.wikipedia.org/wiki/2020。
- 验证：沿用本轮 `npm run validate` 及测试结果，均通过。

## 2019 年审查记录

- 审查范围：2019 年中国事件 10 条、世界事件 10 条；对照新华社年度国内/国际新闻与中英文维基百科年度页面。
- 遗漏检查：现有条目覆盖嫦娥四号、外商投资法、“一带一路”高峰论坛、大兴机场、国庆70周年、十九届四中全会、山东舰、长征五号复飞，以及黑洞照片、巴黎圣母院火灾、INF退出、巴格达迪身亡、英国大选等年度结构性事件。
- 事实与等级复核：未发现明确错别字、日期或数字错误；五星主要对应制度变化、重大科技突破、军控变化和国家级历史节点，未因已有配图改变评级。
- 本年无数据修改；图片无新增、删除或替换，既有图片授权元数据列入后续统一补录任务。
- 主要来源：https://www.news.cn/；https://zh.wikipedia.org/wiki/2019年中国大陆；https://en.wikipedia.org/wiki/2019。
- 验证：沿用本轮 `npm run validate` 及测试结果，均通过。

## 2024—2025 年五星事件配图补正（复审）

- 审查时间：2026-08-11。
- 触发原因：复核发现 2025 年五星事件此前全部缺少 `image` 字段；2024 年五星事件中嫦娥六号条目缺图。此前“未找到可直接复用图片”的结论检索不充分，本节记录并 supersede 该结论。
- 审查范围：2024、2025 年中国与世界事件中全部当前 `importance: 5` 条目。
- 审查结果：2024 年五星事件由 7/8 条有图补为 8/8；2025 年五星事件由 0/7 条有图补为 7/7。图片均采用 Wikimedia Commons 文件页，并在 YAML 写入原始页面、作者/机构、许可和图注；资料图均明确标注非事件现场图。

### 图片修改记录

| 事件 ID | 修改 | 本地文件 | 原始页面 | 作者/机构 | 许可 | 图注处理 |
|---|---|---|---|---|---|---|
| cn-change6-sample-202406 | 新增 image | `public/images/events/2024/change6_commons.jpg` | https://commons.wikimedia.org/wiki/File:Chang%27e_6_lunar_samples_at_IAC_2024_03_(cropped).jpg | BugWarp | CC BY-SA 4.0 | 明确为国际宇航大会展出的月背样品资料图，非任务现场图 |
| cn-deepseek-202501 | 新增 image | `public/images/events/2025/deepseek_r1_commons.png` | https://commons.wikimedia.org/wiki/File:The_multistage_pipeline_of_DeepSeek-R1.png | Daya Guo等 | CC BY 4.0 | 技术流程图，非发布现场图 |
| cn-sco-tianjin-202509 | 新增 image | `public/images/events/2025/sco_tianjin_commons.jpg` | https://commons.wikimedia.org/wiki/File:2025_SCO_Summit_-_Tianjin_Meijiang_International_Convention_and_Exhibition_Center.jpg | 阿塞拜疆总统新闻处 | CC BY 4.0 | 天津梅江会展中心会场资料图，非会议现场图 |
| cn-antijapan-80th-202509 | 新增 image | `public/images/events/2025/antijapan_80th_commons.jpg` | https://commons.wikimedia.org/wiki/File:2025_China_Victory_Day_Parade.jpg | 俄罗斯总统新闻处 | CC BY 4.0 | 2025年9月3日阅兵资料图 |
| cn-4th-plenum-20th-202510 | 新增 image | `public/images/events/2025/cpc_4th_plenum_commons.jpg` | https://commons.wikimedia.org/wiki/File:Great_Hall_of_the_People_Beijing_China.jpg | Philip Nalangan | CC BY 4.0 | 人民大会堂资料图，非2025年四中全会现场图 |
| w-us-trump-2nd-term-202501 | 新增 image | `public/images/events/2025/trump_inauguration_commons.jpg` | https://commons.wikimedia.org/wiki/File:Donald_Trump_2025_Inauguration_Tickets_-_54300406396.jpg | liam.enea | CC BY-SA 2.0 | 就职典礼门票资料图，非就职现场图 |
| w-liberation-day-tariffs-202504 | 新增 image | `public/images/events/2025/reciprocal_tariffs_commons.jpg` | https://commons.wikimedia.org/wiki/File:2025-April-02-so-called-Reciprocal_tariffs.jpg | 美国政府雇员 | Public domain | 美国政府公布的“对等关税”图表 |
| w-israel-iran-war-202506 | 新增 image | `public/images/events/2025/israel_iran_war_commons.jpg` | https://commons.wikimedia.org/wiki/File:Israel_attacks_on_Iran_on_13_June_2025.jpg | Maps.interlude | CC BY 4.0 | 冲突示意图/资料图，非现场照片 |

2024 年其余 7 个五星事件的既有图片保持不变；本次不因补图而调整任何 `importance` 等级。未找到更直接、合法可复用的现场照片的条目采用上述明确标注的资料图，不将资料图表述为现场画面。

### 验证

- `git diff --check`：通过。
- 图片文件检查：新增 8 个文件均存在且大于 100 KB。
- `npm run validate`：通过（796 条事件、667 条世界事件；另有既存 13 条提示）。
- `npm test -- test/2020-2024-event-images.test.js`：通过（1 个测试）。
- `npm test -- test/2025-event-images.test.js`：通过（1 个测试）。
- `npm test`：通过（8 个测试文件、128 个测试）。

### 2024 年

- 审查时间：2026-08-11
- 审查范围：中国事件、世界事件、四/五级评级、文字质量、配图
- 审查前：中国 12 条（四级 8 条、五级 3 条）；世界 15 条（四级 8 条、五级 6 条）
- 审查后：中国 13 条（四级 9 条、五级 3 条）；世界 15 条（四级 9 条、五级 5 条）
- 审查结论：有修改。补录深中通道通车；将“联合利剑”事件补全为 A、B 两次演习；纠正 AI 诺奖事件日期、摘要与图注；AI 诺奖从五星调整为四星。未发现其他经新华网或中英文维基百科全文核验、且达到本项目最低收录重要性的遗漏事件。

#### 来源审计

| 来源 | URL | 状态 | 用途 |
|---|---|---|---|
| 新华网：新华社评出2024年国内十大新闻 | https://www.news.cn/20241229/4fbcf74ca7c748d18167725f429d294a/c.html | 全文已读 | 中国年度候选、科技与改革事件核验 |
| 新华网：2024年国际十大新闻 | https://www.news.cn/world/20241230/a294488051614d8e86e81e5204de5b22/c.html | 全文已读 | 国际候选、AI、金砖、乌克兰、叙利亚与巴以事件核验 |
| 新华网：深中通道正式通车试运营 | https://www.news.cn/20240630/4e9780b181804fcc8f9742c49968421c/c.html | 全文已读 | 遗漏事件补入、日期与影响核验 |
| 中文维基百科：2024年中国大陆 | https://zh.wikipedia.org/wiki/2024%E5%B9%B4%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99%86 | 全文已读 | 中国政治、科技、灾害与社会事件交叉检索 |
| 英文维基百科：2024 | https://en.wikipedia.org/wiki/2024 | 全文已读 | 世界年度事件与诺贝尔奖日期交叉检索 |
| 新华网：2024年度自然灾害统计 | https://english.news.cn/20250120/dad81ecfec134a6787d1d08e2fae9056/c.html | 全文已读 | 灾害领域补充检索，未新增单项事件 |

#### 修改点

| 类型 | 文件 | 事件 ID | 字段 | 修改前 | 修改后 | 理由 | 证据 URL |
|---|---|---|---|---|---|---|---|
| 事实修正 | data/events/xiandai.yaml | cn-joint-sword-202405 | title、summary | 仅记录“联合利剑-2024A” | 补入5月A、10月B两次演习及日期 | 新华网年度国内十大新闻明确记载5月23—24日A和10月14日B。 | https://www.news.cn/20241229/4fbcf74ca7c748d18167725f429d294a/c.html |
| 新增 | data/events/xiandai.yaml | cn-shenzhen-zhongshan-channel-202406 | 整条 | 无 | 2024-06-30深中通道通车试运营 | 约24公里跨海集群工程将深圳—中山车程由约2小时缩短至约30分钟，对湾区区域互联互通有持续影响，达到四星收录标准。 | https://www.news.cn/20240630/4e9780b181804fcc8f9742c49968421c/c.html |
| 事实修正、降级 | data/world/modern.yaml | w-ai-nobel-prizes-202410 | id、date、importance、summary | `w-ai-nobel-prizes-202411`；2024-11-20；5；“AlphaFold团队领衔者” | `w-ai-nobel-prizes-202410`；2024-10-09；4；改为诺贝尔奖官方公布的研究者表述 | 诺贝尔物理学奖和化学奖于10月8—9日公布；奖项是重要科学认可，但按项目标准不等同于当年发生的基础性技术突破。 | https://www.news.cn/world/20241230/a294488051614d8e86e81e5204de5b22/c.html |
| 事实修正 | data/world/modern.yaml | w-ai-nobel-prizes-202410 | image.caption | “2024年11月诺贝尔奖揭晓……包揽……” | “2024年10月诺贝尔物理学奖与化学奖相继揭晓……获奖” | 图注月份和措辞与正文日期不一致，且不应夸大为“包揽”。 | https://en.wikipedia.org/wiki/2024 |

#### 图片记录

| 事件 ID | 本地文件 | 原始页面 | 作者/机构 | 许可或授权 | 说明 |
|---|---|---|---|---|---|
| 2024 年现有 9 个含 `image` 的事件 | 已有 `public/images/events/2024/` 文件 | 本次未新增图片 | 未在本次审查中重新确认 | 未新增授权，不改变既有文件 | 配图不参与评级；本次仅纠正 AI 诺奖既有图注。现有图片的原始页面、作者和许可记录仍不完整，暂不新增或替换。 |
| cn-shenzhen-zhongshan-channel-202406 | 无 | 未找到已核验可复用图片 | 不适用 | 未核实，不使用 | 新增事件保持无图。 |

#### 未解决问题

- 现有 2024 图片的逐图来源与授权信息仍不完整，后续补图前必须先补齐可追溯证据。
- 本次未将常规会议、一般体育成绩和单项灾害按四星以上新增，避免把年度热度误当历史影响。

#### 验证

- `npm run validate`：通过（796 条事件、47 个朝代、52 位君主、667 条世界事件、18 条文明色带；另有既存 13 条提示）。
- `npm test -- test/2020-2024-event-images.test.js`：通过（1 个测试）。
- `npm test`：通过（8 个测试文件、128 个测试）。
### 2001 年（补充配图）

- `cn-wto-accession-signed-200111`：补充 Wikimedia Commons 多哈世贸组织部长级会议照片；原始文件为 World Trade Organization 拍摄，CC BY-SA 2.0。图片是会议资料图，未冒充中国签署现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ADoha_Ministerial_Conference_9-13_November_2001_%289308714762%29.jpg)。

### 2004 年（补充配图）

- `cn-liu-xiang-athens-gold-200408`：补充刘翔 2004 年比赛照片；作者署名 Johnson Lau，CC BY-SA 2.5。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ALiu_xiang_2004.jpg)。

### 2006 年（补充配图）

- `w-java-earthquake-200605`：补充美国地质调查局制作的爪哇地震示意图；文件标注为 Public domain，属于事件影响区域资料图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A2006_Java_earthquake_map.gif)。

### 1954 年（补充配图）

- `cn-first-npc-constitution-195409`：补充第一届全国人大通过宪法的历史照片；Commons 标注作者不详、Public domain，图注明确为会议资料图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ADalai_and_Panchen_voting_for_the_Constitution_of_the_People%27s_Republic_of_China.jpg)。

### 2004 年（补充配图）

- `cn-constitution-amendment-200403`：补充 2004 年宪法修正案文件扫描预览；来源为全国人大法律法规数据库，Commons 标注 Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%AE%AA%E6%B3%95%E4%BF%AE%E6%AD%A3%E6%A1%88%EF%BC%882004%E5%B9%B4%EF%BC%89.pdf)。

### 2000 年（补充配图）

- `w-inter-korean-summit-200006`：补充首次朝韩首脑会晤中金大中与金正日拥抱的现场照片；韩国总统档案馆来源，CC BY-SA 4.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AKim_Dae-jung_and_Kim_Jong-il_hugging_at_the_2000_Inter-Korean_Summit.jpg)。

### 2002 年（补充配图）

- `w-icc-statute-effective-200207`：补充国际刑事法院海牙总部照片；图片为机构资料图，作者 Tony Webster，CC BY 2.0，未冒充 2002 年成立当天现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AICC_-_The_International_Criminal_Court_-_The_Hague.jpg)。

### 2009 年（补充配图）

- `w-north-korea-second-nuclear-test-200905`：补充美国地质调查局（USGS）制作的 2009 年朝鲜核试验地震示意图；文件标注 Public domain，属于事件数据图而非新闻照片。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A2009_North_Korean_nuclear_test.png)。

### 2006 年（补充配图）

- `w-lebanon-war-200607`：补充 Wikimedia Commons 的以黎冲突战区示意图；作者 Omernos，CC BY-SA 3.0，作为战争资料图使用。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ALebmap02.jpg)。

- `w-saddam-executed-200612`：补充美国国防部公开的萨达姆被捕后资料照片；Public domain。由于执行现场影像授权与真实性难以核验，图注明确标注“非执行现场”。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASaddam_Hussein_captured_%26_shaven_DD-SD-05-01885.jpg)。

### 2007 年（补充配图）

### 2008 年（补充配图）

- `cn-cross-strait-three-links-200812`：补充 2008 年 12 月 15 日两岸每日包机航线图，图中明确标注直航启动日期；作者 Tsungyenlee，CC BY-SA 3.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ACross-strait_daily_charter_route_map.jpg)。

### 2001 年（配图核验结论）

- `cn-beijing-olympic-bid-success-200107`：检索 Wikimedia Commons 的 2001 年北京申奥、IOC 莫斯科第 112 次全会和申奥标志资料，未找到能够确认与 2001 年 7 月 13 日投票现场直接对应且授权清晰的图片。现有 2008 年奥运会图片不跨事件复用，暂保持无图。
- `cn-world-cup-qualification-200110`：检索中国国家足球队、2001 年沈阳五里河对阿曼比赛及世界杯预选赛资料，Commons 仅找到 2005 年以后或 2008 年的球队照片，未找到 2001 年比赛的授权图片，暂保持无图。
- `cn-china-world-cup-debut-200206`：检索 2002 年世界杯中国队资料，Commons 仅有球衣图和非同期球队照片，未找到可确认的比赛现场授权图片，暂保持无图。

### 2003 年（补充配图）

- `cn-fight-against-sars-200304`：补充 CDC 公共卫生图像库中的 2003 年 SARS 实验室工作人员照片；作者 CDC/Anthony Sanchez，Public domain。图片为防疫资料图，并非中国疫情现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASARS_2003_lab_worker.png)。

- `cn-property-law-200703`：补充全国人大法律法规数据库中的《物权法》文件扫描预览；Commons 标注 Public domain。
- `cn-harmony-bullet-train-200704`：补充 CRH“和谐号”动车组照片；作者 kanegen，CC BY 2.0。照片拍摄于 2008 年，作为车型资料图，不冒充 2007 年首发现场。
- 图片来源：[物权法 Commons 文件页](https://commons.wikimedia.org/wiki/File%3A%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E7%89%A9%E6%9D%83%E6%B3%95.pdf)、[CRH Commons 文件页](https://commons.wikimedia.org/wiki/File%3AChina_Railways_CRH_harmony.jpg)。

### 2009 年（补充配图与缺图核验）

- `cn-new-china-60th-parade-200910`：补充国庆 60 周年阅兵中 HQ-9 防空导弹方队照片；原始文件由 Voice of America 发布，Wikimedia Commons 标注 Public domain。图片是 2009 年 10 月 1 日阅兵资料图，与事件日期和内容直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AHQ-9_at_the_China%27s_60th_anniversary_parade.jpg)。
- `cn-new-medical-reform-200904`：查阅国家卫生健康委发布的《中共中央国务院关于深化医药卫生体制改革的意见》及配套实施方案，确认事件与 2009 年 4 月发布文件相符；未找到与该中国政策发布直接对应且授权清晰的 Wikimedia Commons 图片，保持无图，不使用其他国家医改图片替代。
- `cn-social-security-coverage-2009`：查阅国务院《关于开展新型农村社会养老保险试点的指导意见》及财政部公开说明，确认 2009 年起开展新农保试点；未找到与该政策发布直接对应且授权清晰的 Wikimedia Commons 图片，保持无图，不使用泛化农村或社保图片替代。
- `cn-urumqi-75-incident-200907`：补充 2009 年 7 月 7 日乌鲁木齐事件街头资料照片；作者 David Vilder，CC BY 2.0。图注明确为事件期间资料图、非处置现场，避免将其误作官方处置画面。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ARiots_in_Urumqi%2C_July_2009_-1_%284074621870%29.jpg)。
- 政策依据：[国家卫生健康委医改意见](https://www.nhc.gov.cn/tigs/c100053/200903/097c205c50cf40c0900072f235395b85.shtml)、[医改近期重点实施方案](https://www.nhc.gov.cn/wjw/gfxwj/200904/3169f954354341889251dc707b6dcd53.shtml)、[国务院新农保试点指导意见](https://www.ln.gov.cn/web/zwgkx/lnsrmzfgb/2009n/qk/2009n_dsqq/gwywj/31200E7862C14515A366616AAF2E0D96/index.shtml)。

### 2008 年（补充配图与缺图核验）

- `cn-tibet-314-incident-200803`：补充 2008 年 3 月西藏抗议活动地点示意图；Wikimedia Commons 标注作者 Students for a Free Tibet、CC BY 2.0。图注明确为事件资料图，不冒充拉萨现场照片。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AMap_of_2008_Tibetan_protest_locations_compiled_by_Students_for_a_Free_Tibet.png)。
- `cn-reform-openning-30th-200812`：检索 Commons 的 2008 年改革开放 30 周年会议、纪念品和人民大会堂资料，未找到与 12 月纪念大会直接对应且授权清晰的图片，保持无图。

### 2006 年（补充配图与缺图核验）

- `cn-agricultural-tax-repeal-200601`：补充全国人大常委会废止农业税条例决定的文件扫描预览；原始文件来自全国人大常委会法律法规数据库，Commons 标注作者为全国人大常委会、Public domain。图注明确说明决定于 2005 年 12 月通过、2006 年 1 月 1 日起施行。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A%E5%85%A8%E5%9B%BD%E4%BA%BA%E6%B0%91%E4%BB%A3%E8%A1%A8%E5%A4%A7%E4%BC%9A%E5%B8%B8%E5%8A%A1%E5%A7%94%E5%91%98%E4%BC%9A%E5%85%B3%E4%BA%8E%E5%BA%9F%E6%AD%A2%E3%80%8A%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%86%9C%E4%B8%9A%E7%A8%8E%E6%9D%A1%E4%BE%8B%E3%80%8B%E7%9A%84%E5%86%B3%E5%AE%9A.pdf)。
- `cn-11th-five-year-plan-200603`：已补入 Commons 收录的全国人大常委会公报 2006 年第 3 号 PDF，包含“十一五”规划纲要决议与原文；官方法律公报，Public domain。
- `cn-cpc-16th-6th-plenum-200610`：检索 Commons 的十六届六中全会公开文件与会议资料，暂未找到与事件直接对应且授权清晰的图片，保持无图。

### 2005 年（缺图核验）

- `cn-lien-chan-visit-200504`：采用 Commons 连战 2005 年 4 月 27 日南京行程照片（CC BY-SA 3.0），明确标注为访问大陆背景而非 4 月 29 日北京会谈现场。
- `cn-victory-60th-200509`：采用 Commons Eric Draper 拍摄的 2005 年 5 月 9 日莫斯科红场阅兵照片（美国政府作品，Public domain），明确标注为国际纪念背景而非 9 月 3 日北京大会现场。
- `cn-agricultural-tax-free-decided-200512`：该事件与已补图的 2005 年 12 月全国人大常委会决定属于同一政策链条，但不重复使用同一图片；未找到另一张与本事件直接对应且授权清晰的图片，保持无图。

### 2004 年（补充配图与缺图核验）

- `cn-russia-border-agreement-200410`：补充中俄 2004 年最终边界协定前东段争议地段示意图；Commons 标注 Public domain。图注明确为边界资料图，不冒充北京签署现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AChina_USSR_E_88.jpg)。
- `cn-cpc-16th-4th-plenum-200409`：检索十六届四中全会公开文件、人民大会堂及会议资料，未找到与 2004 年 9 月全会直接对应且授权清晰的图片，保持无图。

### 2003 年（补充配图与缺图核验）

- `cn-northeast-revitalization-200310`：补充东北地区振兴战略涉及区域示意图；作者 Quintucket，Commons 标注 CC0。图注明确为政策区域资料图，不冒充 2003 年发布会现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ANortheast_China.svg)。
- `cn-national-npc-200303`、`cn-cpc-16th-3rd-plenum-200310`：检索 2003 年全国人大会议、胡锦涛当选国家主席及十六届三中全会公开会议资料，未找到与具体会议直接对应且授权清晰的图片，保持无图。

### 2002 年（缺图核验）

- `cn-china-world-cup-debut-200206`：检索 Commons 的 2002 年中国队世界杯比赛和球队资料，仅找到球衣图、非同期球队照片或赛事通用资料，未找到可确认对应中国队首场比赛且授权清晰的图片，保持无图。
- `cn-wto-one-year-anniversary-200212`：检索 WTO 加入、2002 年履约及成员地图资料，未找到能直接对应“中国入世一周年履行承诺”且授权清晰的图片，保持无图。

### 2001 年（补充配图与缺图核验）

- `cn-hainan-nanhai-collision-200104`：补充中美撞机事件后 EP-3 机组人员返回关岛的资料照片；作者 Staff Sgt. John A Giles（美国海军陆战队），Public domain。图注明确为 4 月 12 日事件后资料图，不冒充撞机瞬间。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AEP-3_crew_in_Hainan_Island_incident.jpg)。
- `cn-qinghai-tibet-railway-start-200106`、`cn-beijing-olympic-bid-success-200107`、`cn-world-cup-qualification-200110`：继续检索对应开工典礼、莫斯科投票和沈阳五里河比赛资料；未找到同时满足事件直接对应性和可复用授权的图片，保持无图。

### 1999 年（补充配图）

- `cn-50th-parade-199910`：补充 1999 年 10 月 1 日国庆 50 周年阅兵资料照片；作者王小朋友，CC BY-SA 3.0。Commons 文件页将其归入“中国 50 周年阅兵”类别，日期和事件对应明确。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A50th_anniversary_of_PRC_1.jpg)。

### 1995 年（补充配图）

- `w-wto-founded-199501`：补充 WTO 1995 年创始成员与后续成员示意图；作者 Emilfaro，Commons 标注 Public domain。图注明确为组织成立资料图，不冒充日内瓦成立当天现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AWTO_members.svg)。

### 1993 年（补充配图）

- `w-eu-founded-199311`：补充《欧洲联盟条约》（马斯特里赫特条约）文本扫描预览；Commons 页面标注作者为 European Communities，并说明版权方允许任何用途但需署名。该条约于 1992 年签署、1993 年 11 月 1 日生效，图注明确对应事件依据文件。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ATrait%C3%A9_sur_l%E2%80%99Union_europ%C3%A9enne%2C_ensemble_le_texte_complet_du_trait%C3%A9_instituant_la_Communaut%C3%A9_europ%C3%A9enne%2C_31_ao%C3%BBt_1992.djvu)。

### 1979 年（补充配图）

- `cn-us-diplomatic-relations-197901`：补充中美签署外交协议资料图；原始文件来自美国国家档案和记录管理局，Commons 标注 Public domain。照片拍摄于 1979 年 1 月 31 日，图注明确说明中美建交于 1 月 1 日生效，避免混淆建交生效日与签署资料图日期。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ADeng_Xiaoping_and_Jimmy_Carter_sign_diplomatic_agreements_between_the_United_States_and_China_-_NARA_-_183270.tif)。

### 1984 年（补充配图与缺图核验）

- `cn-sino-british-joint-declaration-198412`：补充《中英联合声明》文本扫描预览；Commons 标注原始作者为中英两国政府、Public domain，文件日期与 1984 年 12 月 19 日签署事件一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AJoint_declaration_of_the_government_of_the_united_kingdom_of_great_britain_and_northern_ireland_and_the_government_of_the_people%27s_republic_of_china_on_the_question_of_hong_kong.pdf)。
- `cn-la-olympics-xuhaifeng-198407`、`cn-12th-3rd-plenum-reform-198410`：检索许海峰 1984 年首金现场及十二届三中全会公开资料，暂未找到同时满足事件直接对应性和可复用授权的图片，保持无图。

### 1972 年（补充配图）

- `cn-japan-diplomatic-normalization-197209`：补充 1972 年 9 月 29 日《中日联合声明》原本资料图；日本外务省提供，CC BY 4.0，文件说明明确记载签署日期和地点。
- `w-salt1-abm-treaty-197205`：补充尼克松与勃列日涅夫签署 ABM 条约和 SALT I 协定的现场照片；美国国家档案资料，Public domain，拍摄日期为 1972 年 5 月 26 日。
- 图片来源：[中日联合声明 Commons 文件页](https://commons.wikimedia.org/wiki/File%3AJoint_Communique_of_Japan_and_China.jpg)、[SALT I Commons 文件页](https://commons.wikimedia.org/wiki/File%3APresident_Richard_Nixon_and_General_Secretary_Leonid_Brezhnev_Signing_the_Anti-Ballistic_Missile_%28ABM%29_Treaty_and_Interim_Strategic_Arms_Limitations_Talks_%28SALT%29_Agreement_-_DPLA_-_e8e61af3f57b9fdb3beb10652b1fc770.jpg)。

### 1979 年（补充配图）

- `cn-sino-vietnamese-war-197902`：补充中越边境战争战区示意图；作者 Paris，Commons 标注 Public domain。图注明确为战争资料图，不冒充具体战斗现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AChi%E1%BA%BFn_tranh_bi%C3%AAn_gi%E1%BB%9Bi_Vi%E1%BB%87t-Trung.png)。

### 1963 年（补充配图）

- `w-oau-founded-196305`：补充海尔·塞拉西与纳赛尔在亚的斯亚贝巴出席非洲统一组织峰会的资料照片；Commons 标注 Public domain，日期为 1963 年，和组织成立峰会直接相关。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASelassie_and_Nasser%2C_1963.jpg)。

### 1968 年（修复配图）

- `w-warsaw-pact-invasion-czechoslovakia-196808`：将原先只有无 URL 的 SVG 占位块替换为 1968 年波兰军队入侵捷克斯洛伐克照片；作者 Zbyszko Siemaszko，Commons 标注 Public domain。图注明确为事件资料图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3APol%C5%A1t%C3%AD_voj%C3%A1ci_b%C4%9Bhem_okupace_%C4%8Ceskoslovenska_1968_22.jpg)。

### 1967 年（补充配图）

- `w-asean-founded-196708`：补充 1967 年《东盟宣言》（曼谷宣言）原本扫描预览；来源为东盟/新加坡与泰国外务部门档案，Commons 标注 Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AASEAN_Declaration_1967.pdf)。

### 1970 年（补充配图）

- `w-bhola-cyclone-197011`：补充 NOAA 1970 年 11 月 11 日博拉气旋卫星影像；Public domain，事件日期和气旋路径对应明确。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ANovember_1970_Bhola_Cyclone.jpg)。

### 1961 年（补充配图）

- `w-nam-founded-196109`：补充 1961 年贝尔格莱德不结盟国家首脑会议资料图；Commons 标注作者不详、Public domain，会议年份和事件对应明确。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ABelgrade_Conference%2C_1961.jpg)。

### 1963 年（补充配图）

- `cn-zhou-enlai-africa-tour-196312`：补充周恩来在亚非访问行程中访问摩洛哥并会见哈桑二世的照片；人民画报资料，Commons 标注 Public domain。图注明确为 1964 年 1 月行程资料图，事件从 1963 年 12 月启程，未冒充启程现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A1964-03_1964%E5%B9%B4_%E4%B8%AD%E5%9B%BD%E8%AE%BF%E9%97%AE%E6%91%A9%E5%93%A5_%E5%91%A8%E6%81%A9%E6%9D%A5%E4%B8%8E%E5%93%88%E6%A1%91%E4%BA%8C%E4%B8%96.jpg)。

### 1950 年（补充配图）

- `cn-marriage-law-195005`：补充《中华人民共和国婚姻法》原文扫描预览；全国人大法律文件，Commons 标注 Public domain，文件内容和 1950 年 5 月 1 日施行日期直接对应事件。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%A9%9A%E5%A7%BB%E6%B3%95.pdf)。

### 1955 年（补充配图）

- `w-warsaw-pact-195505`：补充 1955 年华沙条约签署会议现场资料图；Commons 标注作者不详、Public domain，文件说明明确为华沙条约签署会议。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AWarsaw_Pact_1955.jpg)。

### 1971 年（补充配图）

- `w-bangladesh-independence-war-197103`：补充孟加拉国解放战争形势图；Commons 标注作者 Mike Young，Public domain。图注明确为战争形势背景图，不冒充 1971 年 3 月 26 日独立宣告现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ABangladesh_1971_Liberation.jpg)。

### 1972 年（补充配图）

- `w-salt1-abm-treaty-197205`：补充尼克松与勃列日涅夫签署《反弹道导弹条约》和 SALT 协定的资料照片；Commons 标注白宫摄影办公室/美国国家档案馆来源，Public domain，内容与事件直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3APresident_Richard_Nixon_and_General_Secretary_Leonid_Brezhnev_Signing_the_Anti-Ballistic_Missile_%28ABM%29_Treaty_and_Interim_Strategic_Arms_Limitations_Talks_%28SALT%29_Agreement_-_DPLA_-_e8e61af3f57b9fdb3beb10652b1fc770.jpg)。

### 1973 年（补充配图）

- `w-paris-peace-accords-197301`：补充 1973 年 1 月 27 日巴黎和平协定签署仪式照片；Commons 标注作者 Robert LeRoy Knudsen，Public domain，日期与事件完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AVietnam_peace_agreement_signing.jpg)。

- `w-chile-coup-197309`：补充智利政变期间拉莫内达宫遭轰炸的资料照片；Commons 标注智利国会图书馆来源，许可 CC BY 3.0 CL，内容与 1973 年 9 月 11 日政变直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AGolpe_de_Estado_1973.jpg)。

### 1974 年（补充配图）

- `w-nixon-resigns-197408`：补充尼克松 1974 年辞职演讲前与白宫工作人员合影；Commons 标注作者 Oliver Atkins，Public domain。图注明确为辞职演讲背景资料，不冒充辞职声明原件。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ANixon_Resignation_Speech_1974_with_Alvin_Snyder.jpg)。

- `w-carnation-revolution-197404`：补充葡萄牙康乃馨革命历史照片；Commons 标注作者不详，许可 CC BY 4.0，图像内容与革命主题直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ARevolu%C3%A7%C3%A3o_dos_Cravos.jpg)。

### 1975 年（补充配图）

- `w-fall-phnom-penh-197504`：补充 1975 年 4 月 17 日金边蒙宁旺大桥的美国空军侦察照片；Commons 标注照片编号 110342、Public domain，日期与金边陷落当天对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AAerial_reconnaissance_view_of_the_Monivong_Bridge%2C_Phnom_Penh_17_April_1975.jpg)。

### 1975—1978 年（缺图核验）

- `w-lebanese-civil-war-197504`、`w-helsinki-accords-197508`、`w-argentine-coup-197603`、`w-sadat-jerusalem-197711`、`w-camp-david-accords-197809`、`w-vietnam-invades-cambodia-197812`：已找到 Commons 文件页及来源/许可信息，但 Wikimedia 图片服务器连续返回连接关闭/限流，当前未能可靠下载本地资源；暂不写入 YAML，避免产生空文件或不可用图片。待后续重试。

### 1981 年（补充配图）

- `w-columbia-sts1-198104`：补充哥伦比亚号航天飞机升空照片；Commons 标注 NASA，Public domain，作为 STS-1 首飞的直接资料图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASpace_Shuttle_Columbia_launching.jpg)。

### 1980—1984 年（缺图核验）

- `w-smallpox-eradicated-198005`、`w-solidarity-founded-198008`、`w-iran-iraq-war-198009`、`w-ibm-pc-5150-198108`、`w-macintosh-launch-198401`、`w-bhopal-disaster-198412`：已找到 Commons 候选文件及许可信息，但 Wikimedia 图片服务器再次返回连接关闭/限流，暂未下载本地资源，保留无图并待后续重试。

### 1986 年（补充配图）

- `w-challenger-disaster-198601`：补充挑战者号升空后爆炸照片；Commons 标注 Kennedy Space Center，Public domain，内容与 1986 年 1 月 28 日事故直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AChallenger_explosion.jpg)。

### 1985—1989 年（缺图核验）

- `w-gorbachev-general-secretary-198503`、`w-chernobyl-disaster-198604`、`w-black-monday-198710`、`w-inf-treaty-198712`、`w-lockerbie-bombing-198812`、`w-berlin-wall-opens-198911`：已找到 Commons 候选文件及许可信息，但 Wikimedia 图片服务器连续返回连接关闭/限流，暂未下载本地资源，保留无图并待后续重试。

### 1994 年（补充配图）

- `w-mandela-elected-199404`：补充曼德拉参加 1994 年南非大选投票的照片；Commons 标注作者 Paul Weinberg，许可 CC BY-SA 3.0，日期与首次多种族大选完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AMandela_voting_in_1994.jpg)。

### 1990—1994 年（缺图核验）

- `w-gulf-crisis-199008`、`w-germany-reunification-199010`、`w-gulf-war-storm-199101`、`w-rwanda-genocide-199404`：已找到 Commons 候选文件及许可信息，但 Wikimedia 图片服务器返回连接关闭/限流，暂未下载本地资源，保留无图并待后续重试。

### 1999 年（补充配图）

- `w-yeltsin-resign-199912`：补充叶利钦 1999 年 12 月 31 日辞职当天的资料照片；Commons 标注俄罗斯总统新闻与信息办公室，许可 CC BY 4.0，日期与事件完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ABoris_Yeltsin_31_December_1999.jpg)。

### 1995—1999 年（缺图核验）

- `w-wto-founded-199501`、`w-asian-financial-crisis-199707`、`w-kosovo-war-199903`：已检索 Commons，亚洲金融危机与科索沃战争候选图来源/许可明确，但图片服务器限流未能下载；WTO 成立事件暂未找到合适的可复用历史照片，均保留无图并记录待后续核验。

### 2003 年（补充配图）

- `w-saddam-captured-200312`：补充萨达姆被捕相关的“蜘蛛洞”资料照片；Commons 标注作者不详，Public domain，内容与 2003 年 12 月 13 日捕获行动直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASaddamSpiderHole.jpg)。

### 2000—2004 年（缺图核验）

- `w-911-attacks-200109`、`w-afghanistan-war-begins-200110`、`w-iraq-war-breaks-out-200303`、`w-indian-ocean-tsunami-200412`：已找到 Commons 候选文件及许可信息，但 Wikimedia 图片服务器限流，暂未下载本地资源；其余本阶段事件继续按事件专属照片原则核验。

### 2005 年（补充配图）

- `w-hurricane-katrina-200508`：补充卡特里娜飓风后新奥尔良洪灾航拍照片；Commons 标注美国海岸警卫队官方摄影来源，Public domain，内容与灾害后果直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AKatrinaNewOrleansFlooded_edit2.jpg)。

### 2005—2009 年（缺图核验）

- `w-london-bombings-200507`、`w-lehman-bankruptcy-200809`、`w-obama-wins-election-200811`：已找到 Commons 候选文件及许可信息，但图片服务器限流，暂未下载本地资源；iPhone 发布事件暂未找到适合作为发布现场的可复用 Commons 图片。

### 2011 年（补充配图）

- `w-bin-laden-killed-201105`：补充奥巴马与国家安全团队在情报室获悉本·拉登被击毙的照片；Commons 标注 Pete Souza/白宫，Public domain，内容与行动结果直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AObama_in_the_Situation_Room_after_bin_Laden_is_killed.jpg)。

### 2010—2014 年（缺图核验）

- `w-fukushima-disaster-201103`、`w-higgs-boson-discovery-201207`、`w-mh370-disappearance-201403`、`w-philae-comet-landing-201411`：已找到 Commons 候选文件及许可信息，但图片服务器限流，暂未下载本地资源；候选来源与许可已记录在本轮核验日志中。

### 2019 年（补充配图）

- `w-first-black-hole-image-201904`：补充 M87 星系中心黑洞首张直接成像；Commons 标注 Event Horizon Telescope，许可 CC BY 4.0，内容与 2019 年 4 月 10 日发布事件完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ABlack_hole_-_Messier_87.jpg)。

### 2015—2019 年（缺图核验）

- `w-new-horizons-pluto-201507`、`w-alphago-lee-sedol-201603`、`w-paris-attacks-201511`、`w-notre-dame-fire-201904`、`w-emperor-akihito-abdication-201904`：已找到 Commons 候选文件及许可信息，但图片服务器限流，暂未下载本地资源，保留无图并待后续重试。

### 2021 年（补充配图）

- `w-capitol-riot-202101`：补充 2021 年 1 月 6 日国会大厦骚乱现场照片；Commons 标注作者 Tyler Merbler，许可 CC BY 2.0，日期与事件完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A2021_storming_of_the_United_States_Capitol_DSC09254-2_%2850820534063%29_%28retouched%29.jpg)。

### 2020—2023 年（缺图核验）

- `w-covid-pandemic-202003`、`w-russia-ukraine-war-202202`、`w-turkey-quake-202302`、`w-chandrayaan3-202308`：已找到 Commons 候选文件及许可信息，但图片服务器限流，暂未下载本地资源，保留无图并待后续重试。
- 本轮对上述 2020—2023 候选图进行了再次直链下载重试，仍返回连接关闭；未将无法确认下载完整性的文件写入 YAML，当前统计不变。
- `w-turkey-quake-202302`：重试下载成功，采用 Commons 2023 年土耳其—叙利亚地震拼图，作者 Adem，许可 CC BY-SA 4.0，已替换原先缺乏来源元数据的旧图字段。
- `w-chandrayaan3-202308`：采用 Commons 月船三号 Pragyan 月球车 PNG 资料图，作者印度空间研究组织，许可 GODL-India，已替换原先缺乏来源元数据的旧图字段。
- 本轮再次尝试下载 `w-russia-ukraine-war-202202` 与 `w-fukushima-discharge-202308` 的 Commons 候选图，服务器返回 429（Too many requests）；未写入不完整文件，继续保留旧图但不计入严格有效配图。
- 本轮也尝试下载 `w-israel-hamas-war-202310` 的 Commons 2023 年加沙灾后照片，服务器仍返回 429；未写入不完整文件。
- `w-russia-ukraine-war-202202`：使用 `curl -4` 成功下载 Commons 地图文件，作者 Homoatrox，CC0；已补齐 YAML 元数据并替换旧图路径。
- `w-fukushima-discharge-202308`：使用 `curl -4` 成功下载 IAEA Fukushima 储水罐照片，作者 IAEA Imagebank，CC BY-SA 2.0；已补齐 YAML 元数据并替换旧图路径。
- `w-israel-hamas-war-202310`：使用 `curl -4` 成功下载 2023 年加沙破坏现场照片，作者 WAFA/APAimages，CC BY-SA 3.0；已补齐 YAML 元数据并替换旧图路径。
- `w-shinzo-abe-assassinated-202207`：使用 `curl -4` 下载遇刺后奈良悼念花束照片，作者 Tokumeigakarinoaoshima，CC BY-SA 4.0；已补齐 YAML 元数据并替换旧图路径。
- `w-nord-stream-sabotage-202209`：使用 `curl -4` 下载北溪管道泄漏示意图，作者 Berria，CC BY-SA 4.0；已补齐 YAML 元数据并替换旧图路径。
- `w-queen-elizabeth-pass-202209`：使用 `curl -4` 下载白宫 2019 年伊丽莎白二世官方肖像，Public domain；已补齐 YAML 元数据并替换旧图路径。

- `w-covid-pandemic-202003`：复核发现仓库已有本地图片与 Commons 的 `Covid-19 San Salvatore 05.jpg` 内容一致，补齐来源、作者和许可元数据后正式接入；不重复下载限流资源。

### 1959 年（补充配图）

- `w-cuban-revolution-victory-195901`：补充 1959 年 1 月 8 日菲德尔·卡斯特罗进入哈瓦那的资料照片；Commons 文件页将其标为 Public domain，图注明确为革命胜利背景资料，不冒充起义军推翻巴蒂斯塔政权的现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AFidel_Castro%27s_entry_into_Havana%2C_1959.jpg)。

### 1959 年（补充配图）

- `w-lunik-3-far-side-moon-195910`：补充月球3号于 1959 年 10 月 7 日拍摄的月球背面影像；Commons 文件页标注来源 NASA NSSDC、作者 RKK Energia、Public domain，日期与事件记录的首次月背影像一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AImage_invisible_hemisphere_of_the_Moon_from_Luna-3.gif)。

### 1960 年（补充配图）

- `w-congo-independence-196006`：补充 1960 年 6 月 30 日卢蒙巴签署刚果独立文件的现场资料照片；Commons 文件页标注日期为 1960 年 6 月 30 日、作者/来源 Congopresse、Public domain，与独立仪式直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3APatrice_Lumumba_signs_the_document_granting_independence_to_the_Congo_next_to_Belgian_Prime_Minister_Gaston_Eyskens.jpg)。

### 1960 年（补充配图）

- `w-great-chilean-earthquake-196005`：补充 USGS 公开领域震动图，图示 1960 年 5 月 22 日瓦尔迪维亚大地震及其震级 9.5 级背景；来源、作者和许可均由 Commons 文件页核验。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A1960_Valdivia_earthquake.jpg)。

### 1960 年（补充配图）

- `w-u2-incident-196005`：补充 CIA 公有领域 U-2 模型资料图；Commons 文件页明确说明 1960 年 5 月 1 日 U-2 飞行员弗朗西斯·加里·鲍尔斯被击落的事件背景，图注明确为资料模型，不冒充击落现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AU-2_Model_-_Flickr_-_The_Central_Intelligence_Agency_%281%29.jpg)。

### 1960 年（补充配图）

- `w-first-laser-invented-196005`：补充西奥多·梅曼与红宝石激光器的 1960 年资料照片；Commons 文件页标注 Associated Press 作者未知、Public domain，图注明确为人物与设备背景资料，不冒充实验室原始拍摄现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ATheodore_Maiman_1960.jpg)。

### 1961 年（补充配图）

- `w-gagarin-orbit-196104`：补充尤里·加加林 1961 年公开活动肖像；Commons 文件页标注照片摄于 1961 年 7 月 3 日、作者 Arto Jousi 等、Public domain，图注明确为首次载人轨道飞行后的背景肖像，不冒充 4 月 12 日发射现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AYuri-Gagarin-1961-Helsinki.jpg)。

### 1961 年（补充配图）

- `w-bay-of-pigs-196104`：补充第 2506 旅在猪湾登陆的资料照片；Commons 文件页标注 1961 年、来源 Latin American Studies、作者未知、Public domain，内容与入侵行动直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A2506-landing_%281%29.jpg)。

### 1961 年（补充配图）

- `w-apollo-program-announced-196105`：补充 1961 年 5 月 25 日肯尼迪在国会提出登月目标的现场照片；Commons/NASA 文件页对应同一日期，NASA 公有领域。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AKennedy_Giving_Historic_Speech_to_Congress_-_GPN-2000-001658.jpg)。

### 1961 年（补充配图）

- `w-berlin-wall-start-196108`：补充 1961 年 8 月柏林墙施工现场资料照片；德国联邦档案馆文件页标注 CC BY-SA 3.0 Germany，日期与事件对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ABundesarchiv_Bild_173-1321%2C_Berlin%2C_Mauerbau.jpg)。

### 1961 年（补充配图）

- `w-nam-founded-196109`：补充 1961 年贝尔格莱德首届不结盟国家首脑会议照片；Commons 文件页标注会议为 1961 年、来源为南斯拉夫历史资料，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ABelgrade_Conference%2C_1961.jpg)。

### 1961 年（补充配图）

- `w-tsar-bomba-test-196110`：补充 1961 年 10 月 30 日沙皇炸弹试爆火球照片；Commons 文件页明确日期、地点和作者/机构，并标注 Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ATsar_Bomba_fireball_1961.jpg)。

### 1962 年（补充配图）

- `w-john-glenn-orbit-196202`：补充 NASA 公有领域的约翰·格伦与 Friendship 7 飞船合影；Commons 文件页标注 1962 年、NASA 来源，直接对应首次美国载人轨道飞行背景。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AJohn_Glenn_in_front_of_the_Friendship_7.jpg)。

### 1962 年（补充配图）

- `w-cuban-missile-crisis-begin-196210`：补充 1962 年 10 月 29 日白宫 EXCOMM 会议照片；Commons 文件页标注 Cecil Stoughton、White House Photographs、Public domain，直接对应危机期间决策过程。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AThe_Cuba_Missile_Crisis.jpg)。

### 1962 年（补充配图）

- `w-algeria-evian-accord-196203`：补充法国《官方公报》刊载的《埃维昂协议》文件资料图；Commons 文件页标注 1962 年 3 月 20 日、法国官方公报来源和 Licence Ouverte 1.0，直接对应协议文本。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AJORF-20-03-1962-p3019-Accords_d%27Evian.jpg)。

### 1962 年（补充配图）

- `w-vatican-ii-council-196210`：补充 1962 年 10 月 11 日梵二会议开幕 procession 资料照片；Commons 文件页标注作者 Peter Geymayer、Public domain，日期与会议开幕一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AKonzilseroeffnung_1.jpg)。

### 1963 年（补充配图）

- `w-first-woman-in-space-196306`：补充 NASA 公有领域的特雷什科娃东方六号任务资料照片，Commons 文件页标注 1963 年 6 月、NASA-Starchild 来源，与首位女性航天员事件直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ATereshkova_Space_Suit.jpg)。

### 1963 年（补充配图）

- `w-jfk-assassination-196311`：补充 1963 年 11 月 22 日玛丽·穆尔曼拍摄的达拉斯迪利广场遇刺瞬间宝丽来照片；Commons 文件页标注 Public domain，日期与事件完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AMoorman_photo_of_JFK_assassination.jpg)。

### 1964 年（补充配图）

- `w-civil-rights-act-196407`：补充约翰逊在白宫东厅签署《民权法案》的现场照片；Commons 文件页标注作者 O. J. Rapp、Public domain，日期与签署日对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ACivil_rights_act2.jpg)。

### 1966—1967 年（缺图核验）

- `w-human-rights-covenants-196612`：Commons 找到联合国《公民权利和政治权利国际公约》1966 年 12 月 16 日官方文件，但当前下载端受 Wikimedia 429 限流，未能生成并核验本地 PNG/JPG，暂不挂接。
- 核验来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AInternational_Covenant_on_Civil_and_Political_Rights.pdf)。
- `w-six-day-war-196706`：Commons 找到以色列政府新闻办公室公开领域的 1967 年 6 月 5 日六日战争照片，但当前下载端受 Wikimedia 429 限流，未能完成本地资源落盘，暂不挂接。
- 核验来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASix_Day_War._Israeli_troops_rolling_into_Rafa._June_1967._D326-032.jpg)。
- `w-asean-founded-196708`：Commons 找到 1967 年 8 月 8 日《东盟宣言》官方文件，当前同样受下载限流，暂不将 PDF 伪装成图片字段。
- 核验来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AASEAN_Declaration_1967.pdf)。

### 1968 年（补充配图）

- `w-apollo-8-moon-orbit-196812`：补充 NASA 公有领域的阿波罗 8 号三名宇航员资料照片；Commons 文件页标注 1968 年 11 月 22 日、NASA 来源，直接对应任务成员与绕月飞行背景。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AApollo_8_Crewmembers_%284x5_cropped%29.jpg)。

### 1969 年（补充配图）

- `w-moon-1969`：补充 NASA 公有领域的阿波罗 11 号登月现场照片，巴兹·奥尔德林于 1969 年 7 月 20 日在月面与美国国旗合影；Commons 文件页标注 NASA/尼尔·阿姆斯特朗来源。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ANASA_AS-11-40-5875.jpg)。

### 1970 年（补充配图）

- `w-bhola-cyclone-197011`：补充 NOAA 1970 年 11 月 11 日卫星资料照片；Commons 文件页标注 NOAA 来源和 Public domain，直接对应博拉气旋袭击前后的气象背景。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ANovember_1970_Bhola_Cyclone_Repair.jpg)。

### 1964 年（补充配图）

- `w-gulf-of-tonkin-196408`：补充 1964 年 8 月 2 日北部湾交战中北越鱼雷艇遭射击的美国海军照片；Commons 文件页标注 U.S. Navy、Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ANorth_Vietnamese_motor_torpedo_boat_under_fire_on_2_August_1964.jpg)。

### 1964 年（补充配图）

- `w-khrushchev-ousted-196410`：补充赫鲁晓夫 1964 年 10 月访问挪威的资料照片，作为其下台前后的背景图；Commons 文件页标注日期、作者未知、Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ANikita_Khrushchev%2C_Her%C3%B8ya_1964.jpg)。


### 1956 年（补充配图）

- `w-cpsu-20th-secret-speech-195602`：补充 1956 年秘密报告波兰文首版封面资料照片；Commons 标注作者 Wikiwlh，许可 CC BY-SA 4.0，封面所示版本为 1956 年 3 月内部印刷，直接对应报告传播背景。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AFirst_edition_of_Krushchev%27s_%22Secret_Speech%22.jpg)。

### 1956 年（补充配图）

- `w-suez-crisis-195610`：补充“火枪手行动”中英军在塞得港登陆的 Imperial War Museums 资料照片；Commons 标注英国皇家海军官方摄影师、Public domain，图注明确为危机军事行动背景。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AThe_Suez_Crisis_%28operation_Musketeer%29_1956_MH23500.jpg)。

### 1957 年（补充配图）

- `w-treaty-of-rome-195703`：补充《罗马条约》文件资料照片；Commons 标注作者 Roma，许可 CC0 1.0。图注明确为条约文件背景资料，不冒充 1957 年 3 月 25 日签署仪式现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A%D0%A0%D0%B8%D0%BC%D1%81%D1%8C%D0%BA%D0%B8%D0%B9_%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D1%96%D1%80.jpg)。

### 1957 年（补充配图）

- `w-sputnik-1-195710`：补充 Sputnik 1 资料照片；Commons 标注来源 NASA、Public domain，图注明确为卫星资料图，事件日期与 1957 年 10 月 4 日发射一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASputnik_191378-full.jpg)。

### 1958 年（补充配图）

- `w-nasa-founded-195807`：补充 NASA 官方标识作为机构成立背景图；Commons 标注 NASA 创作、Public domain。图注明确为机构标识，不冒充 1958 年 7 月签署法案现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ANASA_Logo.png)。

- `cn-qian-xuesen-return-195510`：补充钱学森与家人乘船归国途中照片；作者/来源 Los Angeles Times，CC BY 4.0。照片日期为 1955 年 9 月 18 日，和 1955 年归国事件直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AHsue-shen_Tsien_with_his_family_onboard_SS_President_Cleveland.jpg)。

### 1958 年（补充配图）

- `cn-jinmen-artillery-bombardment-195808`：补充金门炮战期间台海危机相关空军资料图；照片拍摄于 1958 年 9 月 15 日，作者/来源为美国空军与美国空军国家博物馆，Commons 标注 Public domain。图注明确为危机期间资料图，非人民解放军炮击现场。
- `w-nasa-founded-195807`：补充 1958 年《国家航空航天法》第一页扫描预览；来源美国国家档案和文件管理局，Commons 标注 Public domain，文件签署日期为 1958 年 7 月 29 日，与 NASA 成立法案事件直接对应。
- 图片来源：[金门危机资料图 Commons 文件页](https://commons.wikimedia.org/wiki/File%3ALockheed_F-104A_of_the_83rd_Fighter_Interceptor_Squadron_at_Taoyuan_Air_Base%2C_Taiwan%2C_on_Sept._15%2C_1958%2C_during_the_Quemoy_Crisis_-_Operation_Jonah_Able.jpg)、[NASA 成立法案 Commons 文件页](https://commons.wikimedia.org/wiki/File%3AAct_of_July_29%2C_1958_%28National_Aeronautics_and_Space_Act_of_1958%29%2C_Public_Law_85-568%2C_72_STAT_426%2C_to_Provide_Research_Into_the_Problems_of_Flight_Within_and_Outside_the_Earth%27s_Atm_-_DPLA_-_ffde741da3d75ef904b702f9ddeac1a2_%28page_1%29.jpg)。

### 1959 年（补充配图）

- `cn-rong-guotuan-world-champion-195904`：补充容国团 1959 年比赛资料照片；Commons 文件说明标注拍摄年份为 1959 年，作者不详，Public domain，和世乒赛夺冠事件年份及人物直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ARongguotuan.jpg)。

### 1956 年（补充配图）

- `w-cpsu-20th-secret-speech-195602`：补充赫鲁晓夫秘密报告 1956 年波兰印刷本封面资料图；作者 Wikiwlh，Commons 标注 CC BY-SA 4.0，图像对应报告文本本身而非虚构现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AFirst_edition_of_Krushchev%27s_%22Secret_Speech%22.jpg)。

### 1960 年（补充配图）

- `w-u2-incident-196005`：补充 NASA 资料库中的 U-2 侦察机照片；Commons 标注作者 NASA、Public domain。图注明确为事件背景资料图，带有虚构 NASA 标志且不是被击落现场，避免误导为现场照片。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AU-2_Spy_Plane_With_Fictitious_NASA_Markings_-_GPN-2000-000112.jpg)。

### 1962 年（补充配图）

- `w-cuban-missile-crisis-end-196210`：补充古巴导弹危机档案资料图；作者/来源 Archives New Zealand，Commons 标注 CC BY-SA 2.0。图注明确为危机相关档案资料，不冒充 1962 年 10 月 28 日宣布结束的现场照片。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ACuban_Missile_Crisis_1962_%2815332098127%29.jpg)。

### 1966 年（补充配图）

- `w-human-rights-covenants-196612`：补充《公民权利和政治权利国际公约》文本首页；联合国人权事务委员会来源，Commons 标注 Public domain。该图对应 1966 年联合国通过的两项核心公约之一，图注已明确范围。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AInternational_Covenant_on_Civil_and_Political_Rights.pdf)。

### 1978 年（补充配图）

- `w-vietnam-invades-cambodia-197812`：补充越南入侵柬埔寨 1978 年 12 月至 1979 年 1 月路线图；作者 BorysMapping，Commons 标注 CC BY-SA 4.0，地图时间范围与事件直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AVietnamese_invasion_of_Cambodia.png)。

### 1977 年（补充配图）

- `w-spanish-election-197706`：补充 1977 年西班牙大选各选区多数党分布图；作者 G.villa01，Commons 标注 CC0，地图对应 1977 年 6 月 15 日首次竞争性全国选举。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASpanish_General_Election_1977.svg)。

### 1980 年（补充配图）

- `w-solidarity-founded-198008`：补充 1980 年 9 月波兰独立工会募款活动资料照片；作者 Stefan Cieślak，Commons 标注 CC BY 3.0。照片对应格但斯克协议与团结工会成立的罢工背景，图注未将其误称为成立仪式现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AZbiorka_na_wolne_zwiazki_zawodowe_1980.jpg)。

### 1983 年（补充配图）

- `w-arpanet-tcpip-198301`：补充 1983 年 8 月 ARPANET 网络拓扑图；作者/来源 BBN Technologies，Commons 标注 Public domain。图示为 TCP/IP 切换后同年网络资料，图注明确不是 1 月 1 日切换当天现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AARPANET_as_of_Aug_25%2C_1983_-_BBN_map_-_DSC00125.JPG)。

### 1963 年（补充配图）

- `w-elysee-treaty-196301`：补充《爱丽舍条约》原始文书影像。Commons 文件页的图像说明明确标注“Paris, 22 janvier 1963”，与事件签署日期一致；作者为 Marc Baronnet，来源为法国外交部外交档案馆，许可 CC BY-SA 4.0。
- 本地文件：`public/images/events/1963/w-elysee-treaty-196301.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A1963_Elysee_treaty.jpg)。
- 验证：已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 196 条降为 195 条。

- `w-oau-founded-196305`：补充 1963 年非洲统一组织峰会期间海尔·塞拉西与纳赛尔在亚的斯亚贝巴的现场资料照片。Commons 图像说明明确指向 OAU summit，年份为 1963，作者未署名，许可为 Public domain。
- 本地文件：`public/images/events/1963/w-oau-founded-196305.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASelassie_and_Nasser%2C_1963.jpg)。
- 验证：已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 195 条降为 194 条。

- `w-singapore-independence-196508`：补充分离协定原始文书第一页。Commons 页面标注原始日期 1965 年 8 月 7 日、双方政府作者和 Public domain；该文书直接对应新加坡脱离马来西亚的法律过程。
- 本地文件：`public/images/events/1965/w-singapore-independence-196508.jpg`（Commons DJVU 第一页缩略图）。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AAgreement_relating_to_the_separation_of_Singapore_from_Malaysia_as_an_independent_and_sovereign_State.djvu)。

- `w-asean-founded-196708`：补充 1967 年东盟《曼谷宣言》起草阶段的原始档案影像。Commons 页面标注年份 1967、来源为印度尼西亚国家档案馆，许可 Public domain；与 8 月 8 日成立事件直接相关。
- 本地文件：`public/images/events/1967/w-asean-founded-196708.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AASEAN_Declaration_draft_recomendations.jpg)。
- 验证：两条均已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 194 条降为 192 条。

- `w-nuclear-test-ban-treaty-196308`：补充肯尼迪 1963 年 10 月 7 日在白宫签署部分禁试条约的官方照片。Commons 页面明确标注条约名称、日期、摄影师 Robert LeRoy Knudsen 和美国政府 Public domain；虽晚于 8 月签署日，但直接对应该条约签署实施过程。
- 本地文件：`public/images/events/1963/w-nuclear-test-ban-treaty-196308.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3APresident_Kennedy_signs_Nuclear_Test_Ban_Treaty%2C_07_October_1963.jpg)。

- `w-bhola-cyclone-197011`：将原有图片替换为日期与事件直接对应的 NASA Nimbus 4 卫星影像。Commons 页面标注 1970 年 11 月 12 日、博拉气旋和 Public domain；原图来源字段同步更正。
- 本地文件：`public/images/events/1970/w-bhola-cyclone-197011.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A15B_1970-11-12_0510Z.jpg)。
- 验证：新增 1 条、替换 1 条均已写入 YAML，本地 JPEG 可读取；严格缺图统计由 192 条降为 191 条。

- `w-turkey-cyprus-invasion-197407`：补充 1974 年 7 月 20 日 KH-9 HEXAGON 解密侦察卫星影像，Commons 图像说明明确标注土耳其舰艇在凯里尼亚登陆、拍摄日期与事件日一致，许可 Public domain。
- 本地文件：`public/images/events/1974/w-turkey-cyprus-invasion-197407.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASpy_Satellite_Image_of_Cyprus_Invasion_-_July_20%2C_1974_%28Landing_Ships%29_%2854771023053%29.jpg)。
- 验证：已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 191 条降为 190 条。

- `w-ethiopia-emperor-deposed-197409`：补充 1974 年 9 月埃塞俄比亚学生示威照片。Commons 页面标注日期 1974 年 9 月 26 日、内容为德尔格政变后要求文人政府过渡，作者未署名，许可 Public domain；与帝制被废黜后的政权转变直接相关。
- 本地文件：`public/images/events/1974/w-ethiopia-emperor-deposed-197409.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AEthiopian_student_demonstration%2C_demanding_for_transition_to_a_civilian_government%2C_September_of_1974.jpg)。
- 验证：已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 190 条降为 189 条。

- `w-lebanese-civil-war-197504`：补充 1975 年 4 月 13 日艾因·鲁姆马内公交车惨案影像。Commons 页面明确标注日期、事件名称及 Public domain；该惨案是黎巴嫩内战爆发的直接导火索。
- 本地文件：`public/images/events/1975/w-lebanese-civil-war-197504.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AAin_el_Remmeneh_Bus_Massacre_1975.jpg)。
- 验证：已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 189 条降为 188 条。

- `w-panama-canal-treaties-197709`：补充 1977 年 9 月 7 日卡特与托里霍斯签署巴拿马运河条约后的官方照片。Commons 页面明确日期、人物、White House photo 来源及 Public domain 许可。
- 本地文件：`public/images/events/1977/w-panama-canal-treaties-197709.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AJimmy_Carter_and_General_Omar_Torrijos_signing_the_Panama_Canal_Treaty.jpg)。

- `w-egypt-israel-peace-treaty-197903`：补充 1979 年 3 月 26 日埃以和平条约签署现场照片。Commons 页面明确日期、三位签署核心人物、CIA 来源及 Public domain 许可。
- 本地文件：`public/images/events/1979/w-egypt-israel-peace-treaty-197903.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ACarter%2C_Sadat%2C_and_Begin_at_the_Peace_Treaty_Signing%2C_March_26%2C_1979_%2810729561495%29.jpg)。
- 验证：两条均已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 188 条降为 186 条。

- `w-smallpox-eradicated-198005`：补充 1980 年 CDC 全球根除天花项目负责人获悉根除消息的照片。Commons 页面标注照片年份 1980、内容直接涉及全球根除天花，来源 CDC，Public domain。
- 本地文件：`public/images/events/1980/w-smallpox-eradicated-198005.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ADirectors_of_Global_Smallpox_Eradication_Program.jpg)。

- `w-iran-iraq-war-198009`：补充 1980 年 9 月 22 日伊拉克空袭德黑兰机场的现场照片。Commons 页面标注日期和两伊战争爆发背景，作者 Mhsheikholeslami，许可 CC BY-SA 4.0。
- 本地文件：`public/images/events/1980/w-iran-iraq-war-198009.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AIran_Iraq_War_Start_Attack_on_Tehran_Airport_1980-09-22.jpg)。
- 验证：两条均已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 186 条降为 184 条。

- `w-aids-first-cdc-198106`：补充 1981 年 7 月 3 日 CDC《发病率与死亡率周报》封面。Commons 页面明确日期、CDC 来源及其作为艾滋病早期重大公共信息的内容，许可 Public domain；用于表现 6 月首次报告后的直接公共卫生记录。
- 本地文件：`public/images/events/1981/w-aids-first-cdc-198106.png`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AMmwr-aids-July1981-report-101.png)。
- 验证：已写入 `data/world/modern.yaml`，本地 PNG 可读取；严格缺图统计由 185 条降为 184 条。

- `w-inf-treaty-198712`：补充 1987 年 12 月 8 日里根与戈尔巴乔夫在白宫签署《中导条约》的官方照片。Commons 页面明确日期、地点、White House Photographic Office 作者和 Public domain 许可。
- 本地文件：`public/images/events/1987/w-inf-treaty-198712.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AReagan_and_Gorbachev_signing.jpg)。
- 验证：已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 184 条降为 183 条。

- `w-berlin-wall-opens-198911`：将原有泛化背景图替换为德国联邦档案馆 1989 年 11 月 10 日边境口岸现场照片。Commons 页面明确日期、地点和事件后续通行场景，摄影师 Ralph Hirschberger，许可 CC BY-SA 3.0 DE；严格统计数量不变。
- 本地文件：`public/images/events/1989/w-berlin-wall-opens-198911.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ABundesarchiv_Bild_183-1989-1110-041%2C_Berlin%2C_Grenz%C3%BCbergang_Invalidenstra%C3%9Fe.jpg)。
- 验证：已更新 `data/world/modern.yaml`，本地 JPEG 可读取。

- `w-gulf-crisis-199008`：补充 1990 年 8 月 2 日布什总统就伊拉克入侵科威特与沙特国王通电话的官方照片。Commons 页面明确事件关联、拍摄日期、总统图书馆来源和 Public domain 许可。
- 本地文件：`public/images/events/1990/w-gulf-crisis-199008.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3APresident_George_H._W._Bush_speaks_to_King_Fahd_of_Saudi_Arabia_via_telephone_from_his_suite_at_the_Catto_Ranch_in_Aspen%2C_Colorado.jpg)。
- 验证：已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 183 条降为 182 条。

- `w-sydney-olympics-200009`：补充 2000 年 9 月 15 日悉尼奥运会开幕式照片。Commons 页面明确开幕式、拍摄日期和摄影师 Barry Thomas，许可 CC BY 2.0。
- 本地文件：`public/images/events/2000/w-sydney-olympics-200009.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASydney_Olympics_Opening_Ceremony.jpg)。
- 验证：已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 182 条降为 181 条。

- `w-george-w-bush-inauguration-200101`：补充 2001 年 1 月 20 日布什首次总统宣誓官方照片。Commons 页面明确日期、人物、White House 摄影师 Eric Draper 和 Public domain 许可。
- 本地文件：`public/images/events/2001/w-george-w-bush-inauguration-200101.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASupreme_Court_Chief_Justice_William_Rehnquist_swears_in_President_George_W._Bush_to_his_first_term_of_office.jpg)。
- 验证：已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 181 条降为 180 条。

- `w-gujarat-earthquake-200101`：补充 2001 年 1 月古吉拉特地震后以色列国防军救援队野战医院照片。Commons 页面明确地震日期、救援背景、IDF 来源及 CC BY-SA 3.0 许可。
- 本地文件：`public/images/events/2001/w-gujarat-earthquake-200101.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AIDF_Aid_Mission_to_India%2C_January_2001_%2811047435793%29.jpg)。

- `w-afghanistan-war-begins-200110`：补充 2001 年 10 月 7 日持久自由行动首日战斧导弹发射照片。Commons 页面明确拍摄日期、行动名称、美国海军作者和 Public domain 许可。
- 本地文件：`public/images/events/2001/w-afghanistan-war-begins-200110.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ADefense.gov_News_Photo_011007-N-1523C-001.jpg)。
- 验证：两条均已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 180 条降为 178 条。

- `w-space-shuttle-columbia-disaster-200302`：补充 2003 年 2 月 1 日哥伦比亚号重返大气层时的地面观测影像。Commons 页面明确日期、STS-107、事故调查背景、USAF/NASA 来源及 Public domain 许可。
- 本地文件：`public/images/events/2003/w-space-shuttle-columbia-disaster-200302.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASTS-107_Columbia_entry_imaged_from_ground.jpg)。
- 验证：已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 178 条降为 177 条。

- `w-ipcc-fourth-assessment-200711`：补充基于 IPCC 2007 年第四次评估报告的全球温度变化图。Commons 页面明确标注该图对应 IPCC 2007 报告、日期为 2007 年 11 月，作者 MovGP0，许可 CC BY-SA 4.0；作为报告发布的内容资料图，不冒充发布会现场。
- 本地文件：`public/images/events/2007/w-ipcc-fourth-assessment-200711.svg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AIPCC2007_Temperature_Change_Worldmap.svg)。
- 验证：已写入 `data/world/modern.yaml`，本地 SVG 可读取；严格缺图统计由 177 条降为 176 条。

- `w-madrid-train-bombings-200403`：补充马德里 3·11 爆炸案十三周年在阿托查的官方悼念照片。Commons 页面明确纪念对象、地点、拍摄日期（2017年3月11日）、作者 Cristina Cifuentes 和 CC BY 2.0 许可；图注明确不是 2004 年袭击当天现场。
- 本地文件：`public/images/events/2004/w-madrid-train-bombings-200403.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AHomenaje_a_las_v%C3%ADctimas_de_los_atentados_del_11_de_Marzo_de_2004_en_Atocha_02.jpg)。
- 验证：已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 176 条降为 175 条。

- `w-pope-john-paul-ii-death-200504`：补充 2005 年 4 月 8 日教宗若望保禄二世葬礼照片。Commons 页面明确葬礼日期、Agência Brasil 来源、摄影师 Ricardo Stuckert 和 CC BY 3.0 BR 许可。
- 本地文件：`public/images/events/2005/w-pope-john-paul-ii-death-200504.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3APope_John_Paul_II_funeral.jpg)。
- 验证：已写入 `data/world/modern.yaml`，本地 JPEG 可读取；严格缺图统计由 175 条降为 174 条。

### 2017 年（补充配图）

- `w-park-geun-hye-removed-201703`：补充韩国宪法法院代理院长李贞美于 2017 年 3 月 10 日宣读朴槿惠弹劾案裁判决定的官方图片。Commons 文件页标注日期、来源为韩国宪法法院，允许再利用但要求署名；该图片直接表现事件核心裁判宣告。
- 本地文件：`public/images/events/2017/w-park-geun-hye-removed-201703.png`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:%28%EB%B6%99%EC%9E%84_1%29_%EB%B0%95%EA%B7%BC%ED%98%9C_%EB%8C%80%ED%86%B5%EB%A0%B9_%ED%83%84%ED%95%B5%EA%B2%B0%EC%A0%95_%EC%84%A0%EA%B3%A0%282017._3._10.%29.png)。
- 验证：已写入 `data/world/modern.yaml`，图片文件可读取；严格缺图统计由 199 条降为 198 条。

### 2016 年（补充配图）

- `w-fidel-castro-pass-201611`：补充菲德尔·卡斯特罗逝世后的葬礼车队照片。Commons 文件页标注拍摄日期为 2016 年 12 月 2 日，作者 David Himbert，许可 CC BY-SA 4.0；该图是事件后续悼念活动资料图，图注明确日期，未冒充 11 月 25 日逝世当天现场。
- 本地文件：`public/images/events/2016/w-fidel-castro-pass-201611.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AFidel-Castro-Funerailles.jpg)。
- 验证：已写入 `data/world/modern.yaml`，图片文件可读取；严格缺图统计由 198 条降为 197 条。

### 2015 年（补充配图）

- `w-iran-nuclear-deal-201507`：补充伊核协议正式宣布前维也纳谈判代表合影。Commons 文件页标注拍摄日期为 2015 年 7 月 14 日，作者/机构为美国国务院，依据美国联邦政府作品规则为 Public domain；图片与协议宣布日及谈判现场直接对应。
- 本地文件：`public/images/events/2015/w-iran-nuclear-deal-201507.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASecretaries_Kerry_and_Moniz_Sat_With_Fellow_Ministers_and_Directors_Before_Final_Announcement_of_Iran_Deal_%2819499023759%29.jpg)。
- 验证：已写入 `data/world/modern.yaml`，图片文件可读取；严格缺图统计由 197 条降为 196 条。

### 2020 年（补充配图）

- `w-brexit-official-202001`：补充英国正式退出欧盟当天的脱欧旗帜照片。Commons 文件页标注拍摄日期为 2020 年 1 月 31 日 22:42，作者 David Howard，许可 CC BY 2.0；日期与事件日一致，图片直接表现脱欧当晚的公共标志。
- 本地文件：`public/images/events/2020/w-brexit-official-202001.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ABrexit_flag_%2849474956968%29.jpg)。
- 验证：已写入 `data/world/modern.yaml`，图片文件可读取；严格缺图统计由 204 条降为 203 条。

### 2020 年（补充配图）

- `w-us-election-biden-202011`：补充美国 2020 年总统大选投票现场照片。Commons 文件页标注拍摄日期为 2020 年 11 月 3 日 11:59，作者 Phil Roeder，许可 CC BY 2.0；日期与事件记录一致，图片直接对应选举日投票。
- 本地文件：`public/images/events/2020/w-us-election-biden-202011.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AElection_Day_2020_%2850563635548%29.jpg)。
- 验证：已写入 `data/world/modern.yaml`，图片文件可读取；严格缺图统计由 203 条降为 202 条。

### 2019 年（补充配图）

- `w-emperor-akihito-abdication-201904`：补充明仁天皇退位礼正殿之仪照片。Commons 文件页标注日期为 2019 年 4 月 30 日，作者/来源机构为日本首相官邸，许可 CC BY 3.0；图片由相关视频截帧而来，事件、日期和人物对应明确。
- 本地文件：`public/images/events/2019/w-emperor-akihito-abdication-201904.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AEmperorAkihito2019.jpg)。
- 验证：已写入 `data/world/modern.yaml`，图片文件可读取；严格缺图统计由 202 条降为 201 条。

### 2018 年（补充配图）

- `w-us-north-korea-singapore-summit-201806`：补充特朗普与金正恩 2018 年 6 月 12 日新加坡会晤照片。Commons 文件页标注日期为 2018 年 6 月 12 日，作者 Shealah Craighead，白宫官方摄影，依据美国联邦政府作品规则为 Public domain；事件和日期直接对应。
- 本地文件：`public/images/events/2018/w-us-north-korea-singapore-summit-201806.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ATrump_Kim_Summit_at_the_Capella_Hotel_%284%29.jpg)。
- 验证：已写入 `data/world/modern.yaml`，图片文件可读取；严格缺图统计由 201 条降为 200 条。

### 2017 年（补充配图）

- `w-trump-inauguration-201701`：补充特朗普 2017 年 1 月 20 日总统就职演说照片。Commons 文件页标注拍摄日期为 2017 年 1 月 20 日 19:15，作者为美国海军陆战队 Lance Cpl. Cristian L. Ricardo，公有领域；图片与就职仪式直接对应。
- 本地文件：`public/images/events/2017/w-trump-inauguration-201701.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ATrump_delivering_his_inaugural_address.jpg)。
- 验证：已写入 `data/world/modern.yaml`，图片文件可读取；严格缺图统计由 200 条降为 199 条。

### 2019—2021 年（缺图核验）

- `w-emperor-akihito-abdication-201904`、`w-inf-treaty-withdrawal-201908`、`w-brexit-official-202001`、`w-us-election-biden-202011`：按事件关键词和年份检索 Wikimedia Commons 文件页及英文维基百科相关条目所用图片，未找到同时满足事件直接对应、日期可核验、作者与可复用许可明确的图片；继续保持无图，不以泛化肖像、地图或版权不明新闻图片替代。
- `w-al-baghdadi-killed-201910`：补充美国国防部发布的巴格达迪藏身处突袭前航拍图（2019 年 10 月 25 日），作为次日巴里沙突袭及其死亡事件的直接行动背景；Commons 文件页标注作者为美国国防部，联邦政府公务作品，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Al-Baghdadi%27s_compound_before_Barisha_raid.jpg)。

### 2019 年（补充配图）

- `cn-70th-anniversary-parade-201910`：补充 2019 年 10 月 1 日庆祝中华人民共和国成立 70 周年大会现场图；Commons 文件页标注画面来自中国新闻社，许可为 CC BY 4.0，日期与事件当天一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:%E5%BA%86%E7%A5%9D%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E6%88%90%E7%AB%8B70%E5%91%A8%E5%B9%B4%E5%A4%A7%E4%BC%9A%E5%9C%A8%E4%BA%AC%E9%9A%86%E9%87%8D%E4%B8%BE%E8%A1%8C14.png)。
- `cn-shandong-carrier-commissioned-201912`：补充山东舰照片。Commons 文件页标注作者 Tyg728、拍摄日期 2019 年 6 月 17 日、许可 CC BY-SA 4.0；照片展示的是事件主体山东舰，但早于 12 月 17 日交付入列仪式，已在图注中明确日期差异。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Chinese_aircraft_carrier_Shandong_in_2019.jpg)。

### 1980 年（补充配图）

- `w-solidarity-founded-198008`：补充 1980 年 8 月 31 日格但斯克船厂罢工领袖列赫·瓦文萨现场照片；Commons 文件页标注日期与事件当天一致，来源为荷兰国家档案馆 Anefo，摄影者未知，许可 CC0 1.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Stakingsleider_Lech_Walesa_deelt_handtekeningen_uit,_Bestanddeelnr_253-8300.jpg)。

### 1984 年（补充配图）

- `w-bhopal-disaster-198412`：补充博帕尔农药厂遗址照片；Commons 文件页标注作者 Julian Nyča、拍摄日期 2010 年 3 月 15 日、许可 CC BY-SA 3.0。该图是灾难现场的后续记录，并非 1984 年泄漏当日照片，已在图注中明确。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Bhopal_Plant_6.JPG)。

### 1987 年（补充配图）

- `w-black-monday-198710`：补充道琼斯指数走势数据图，覆盖 1987 年 10 月 19 日黑色星期一前后区间；Commons 文件页标注作者 Edward，并明确释出到 Public domain，图表直接呈现该事件的市场冲击。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Black_Monday_Dow_Jones.png)。

### 1989 年（补充配图）

- `w-soviet-afghanistan-withdrawal-complete-198902`：补充苏军完成撤军当天的现场照片；Commons 文件页标注拍摄日期 1989 年 2 月 15 日、作者 A. Solomonov、来源 RIA Novosti archive，许可 CC BY-SA 3.0，与事件日期完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:RIAN_archive_58833_Withdrawal_of_Soviet_troops_from_Afghanistan.jpg)。

### 1999 年（补充配图）

- `w-kosovo-war-199903`：补充美国国防部发布的普罗库普列通信设施轰炸损毁评估照片，图像说明注明用于 1999 年 3 月 30 日五角大楼关于北约“盟军行动”的简报；作者美国国防部，许可 Public domain，属于战争开始后直接行动记录。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Defense.gov_News_Photo_990330-O-0000M-001.jpg)。

### 1991 年（补充配图）

- `w-soviet-fall-1991`：补充 1991 年 8 月苏联政变期间莫斯科革命广场装甲车照片，作者 Almog，许可 Public domain；该图记录苏联解体进程中的关键政治危机，不是 12 月 25 日克里姆林宫降旗当日照片，已在图注中明确。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:1991_coup_attempt5.jpg)。

### 1995 年（补充配图）

- `w-wto-founded-199501`：补充 WTO 创始成员分布图，图中明确标示 1995 年 1 月 1 日创始成员；作者 Emilfaro，许可 Public domain，作为机构成立时的直接制度记录。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:WTO_members.svg)。

### 2000 年（补充配图）

- `w-inter-korean-summit-200006`：补充 2000 年 6 月 13 日朝韩首脑会晤中金大中与金正日拥抱的现场照片；Commons 文件页标注来源为韩国总统档案馆，许可 CC BY-SA 4.0，日期与事件当天一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Kim_Dae-jung_and_Kim_Jong-il_hugging_at_the_2000_Inter-Korean_Summit.jpg)。

### 2000 年（补充配图）

- `w-air-france-concorde-crash-200007`：补入协和客机空难事故地点及纪念碑照片；Commons 文件页标注作者 Mike McBey、拍摄日期 2014 年 8 月 29 日、许可 CC BY 2.0。该图记录真实事故地点但不是 2000 年事故当日照片，已在图注中明确。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Concorde_Crash_site_%26_memorial_(27818400257).jpg)。

### 2000 年（补充配图）

- `w-iss-first-resident-crew-200011`：补充远征 1 号三名宇航员在国际空间站内的 NASA 照片；Commons 文件页标注拍摄日期 2000 年 12 月 4 日、作者 NASA、许可 Public domain。照片晚于 11 月 2 日入住日，但直接记录首批常驻乘组在轨状态，已在图注中明确。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:ISS_Expedition_1_crew_portrait.jpg)。

### 2000 年（补充配图）

- `w-us-presidential-election-200011`：补充佛罗里达州 2000 年总统大选逐选区结果图，直接呈现小布什与戈尔计票争议的核心州；作者 OrcaLord，许可 CC BY-SA 4.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:FL_President_2000.svg)。
- `w-boris-johnson-election-201912`：补充 2019 年 12 月 17 日约翰逊大选胜利后的内阁会议照片，作为大选结果落地后的直接政治场景；Commons 文件页标注来源为 10 Downing Street / UK Prime Minister，许可为 UK Open Government Licence v3.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Johnson%27s_Cabinet_Meeting_after_general_election.jpg)。
- `cn-hk-electoral-reform-202103`、`cn-sixth-plenum-resolution-202111`：检索全国人大/中央全会及相关英文、中文 Commons 关键词，未找到授权和事件日期均可核验的直接现场图片；继续保持无图。
- 本轮未修改 YAML，缺图原因已记录；配图缺失不改变事件重要性评级。

### 1965 年（补充配图）

- `w-us-ground-troops-vietnam-196503`：补充 1965 年 3 月 6 日美国海军陆战队在岘港登陆前后的现场照片；Commons 文件页标注 USMC Photo A183676、Public domain，日期比 3 月 8 日首批地面部队正式登陆早两天，图注明确为直接背景图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:DaNangMarch61965.jpg)。

### 1962 年（补充配图）

- `w-cuban-missile-crisis-end-196210`：补充 1962 年 10 月 29 日肯尼迪与顾问在 EXCOMM 会议后的现场照片；Commons 文件页标注摄影师 Cecil Stoughton、Public domain，日期处于危机结束后的降温阶段，图注明确为直接背景图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:President_Kennedy_with_advisors_after_EXCOMM_meeting,_29_October_1962_crop.jpg)。

### 1967 年（补充配图）

- `w-six-day-war-196706`：补充 1967 年 6 月 5 日六日战争首日以色列部队进入拉法的现场照片；Commons 文件页标注摄影师 David Rubinger、许可 CC BY-SA 4.0，拍摄日期与战争爆发日一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Six_Day_War._Israeli_troops_rolling_into_Rafa._June_1967._D326-032.jpg)。

### 1968 年（补充配图）

- `w-tet-offensive-196801`：补充 1968 年 2 月 2 日春节攻势期间西贡 MACV 营地检查站现场照片；Commons 文件页标注作者未知、Public domain，日期处于攻势初期，事件对应明确。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Security_checkpoint_at_the_MACV_compound_during_the_Tet_Offensive.jpg)。

### 1968 年（补充配图）

- `w-warsaw-pact-invasion-czechoslovakia-196808`：补充 1968 年 8 月 21 日苏军坦克进入布拉格赫拉德恰尼广场的现场照片；Commons 文件页标注经布拉格瑞士使馆发布、作者未列出，许可 CC BY 4.0，日期为入侵次日。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Soviet_tanks_-_Hradcany_Square_Prague_-_via_Swiss_embassy_1968-08-21.png)。

### 1994 年（补充配图）

- `w-rwanda-genocide-199404`：补充 1994 年 8 月卢旺达难民进入戈马的历史背景照片。图片拍摄于大屠杀后的难民危机阶段，与事件后果直接对应；图注明确为背景资料图，不冒充 4 月 7 日大屠杀发生现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:A_stream_of_Rwandan_refugees,_carrying_all_their_possession,_walk_into_Goma_after_a_civil_war_erupted_in_their_country._They_joined_over_1.2_million_other_refugees_who_fled_into_the_-_DPLA_-_1937159b182bba0c783c0c6e39f33159.jpeg)。作者/机构：Department of Defense. American Forces Information Service. Defense Visual Information Center；许可：Public domain；日期：1994-08-03。

### 1984 年（补充配图）

- `cn-la-olympics-xuhaifeng-198407`：补充 1984 年洛杉矶奥运会颁奖仪式照片，作为中国重返奥运和射击项目首金的赛事背景图；图注明确不冒充许海峰夺金瞬间。Commons 文件页标注摄影师 Ken Hackman、美国空军，Public domain，日期为 1984 年 8 月。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Medal_ceremony_at_the_1984_Summer_Olympics.JPEG)。

### 2004 年（补充配图）

- `w-indian-ocean-tsunami-200412`：补充 2004 年 12 月 26 日印度洋海啸照片，Commons 文件页标注拍摄日期为 2004-12-26，作者 David Rydevik，Public domain；日期与灾害发生日直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:2004-tsunami.jpg)。

### 2005 年（补充配图）

- `w-london-bombings-200507`：补充 2005 年 7 月 7 日伦敦爆炸案当天拉塞尔广场救护车照片；Commons 文件页标注作者 Francis Tyers、许可 CC BY-SA 3.0，图片日期为 2005-07-07，与事件现场直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Russell_square_ambulances.jpg)。

### 2008 年（补充配图）

- `w-myanmar-cyclone-200805`：补充纳尔吉斯气旋过后仰光周边洪涝卫星影像；Commons 文件页标注影像日期为 2008-05-05、作者为 Jesse Allen（NASA，使用 USGS 数据），Public domain。图注明确为灾害发生后的卫星背景图，不冒充登陆瞬间。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Cyclone_Nargis_flooding_around_Yangon_from_space.jpg)。

### 2005 年（补充配图）

- `w-kashmir-earthquake-200510`：补充巴控克什米尔巴拉科特地震灾区现场照片；Commons 文件页标注拍摄日期为 2005-10-17、作者 Mike Buytas、Public domain，事件日期与灾后现场对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:PakistanErdbeben2005Balakot.jpg)。

### 2006 年（补充配图）

- `w-lebanon-war-200607`：补充 2006 年 7 月 27 日以色列空袭和炮击后的贝鲁特现场照片；Commons 文件页标注作者 Hamed Talebi、许可 CC BY 4.0，日期处于第二次黎巴嫩战争期间，图注明确为战事背景图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Israeli_air_and_artillery_attacks,_Beirut_(211918).jpg)。

### 2008 年（补充配图）

- `w-russia-georgia-war-200808`：补充 2008 年 8 月 25 日俄格战争后格鲁吉亚哥里市废墟照片；Commons 文件页标注美国海军摄影师 Lt. Jim Hoeft、Public domain，日期处于战事结束后不久，图注明确为战事后果背景图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:US_Navy_080825-N-0629H-010_A_teddy_bear_lies_amidst_rubble_in_Gori_after_the_recent_conflict_between_Georgia_and_Russia.jpg)。

### 2012 年（补充配图）

- `w-higgs-boson-discovery-201207`：补充 CMS 探测器在 2012 年 7 月 4 日记录的希格斯玻色子候选事件可视化；Commons 文件页标注 CMS Collaboration、Thomas Mc Cauley、Lucas Taylor，许可 CC BY 4.0，日期与 CERN 宣布发现事件一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:CMS-PHO-EVENTS-2012-007-1.png)。

### 2013 年（补充配图）

- `w-prism-snowden-leak-201306`：补充 2013 年 6 月 18 日反对 NSA 监控的公开抗议照片；Commons 文件页标注作者 Fibonacci Blue、许可 CC BY 2.0，日期处于棱镜门披露后，图注明确为公共讨论背景图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Protest_against_NSA_surveillance_(9079613555).jpg)。

### 2014 年（补充配图）

- `w-mh17-shot-down-201407`：补充 2014 年 7 月 21 日 MH17 遇难者悼念现场照片；Commons 文件页标注作者 Sean Hurt、Public domain，日期为事件发生后 4 天，图注明确为公共悼念背景图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Flight_17_condolences_140721-D-AF077-098.jpg)。

### 2014 年（补充配图）

- `w-mh370-disappearance-201403`：补充 2014 年 3 月 20 日美国海军 P-8A 执行 MH370 海上搜救任务的现场照片；Commons 文件页标注摄影师 Eric A. Pastor、Public domain，图注明确为搜救行动背景图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Searches_the_water_for_debris_on_a_P-8A_Poseidon_during_a_mission_to_assist_in_search_and_rescue_operations_for_Malaysia_Airlines_flight_MH370_March_20_140320-N-XY761-105.jpg)。

### 2015 年（补充配图）

- `w-paris-attacks-201511`：补充 2015 年 11 月 14 日巴塔克兰剧院袭击次日警察现场照片；Commons 文件页标注来源 VOA、Public domain，日期与事件次日对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Police_outside_Bataclan_after_the_attack.jpg)。

### 2016 年（补充配图）

- `w-brexit-referendum-201606`：校正为 2016 年 6 月 23 日英国脱欧公投当天伦敦投票站现场照片；Commons 文件页明确日期、作者 Matt Brown 和 CC BY 2.0，与本地文件一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3APolling_Station_%2827954696555%29.jpg)。

### 2016 年（补充配图）

- `w-trump-wins-us-election-201611`：补充 2016 年 11 月 9 日特朗普胜选演讲照片；Commons 文件页标注来源 VOA News、Public domain，日期为美国大选结果公布次日。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Trump_victory_speech.png)。

### 2017 年（补充配图）

- `w-us-jerusalem-capital-201712`：校正为 2017 年 12 月 6 日特朗普与彭斯发表耶路撒冷声明的白宫照片；Commons 页面明确日期、作者 The White House，并标注 Public domain，与本地文件一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3APhoto_of_the_Day_December_7%2C_2017_%2825121073608%29.jpg)。

### 2018 年（补充配图）

- `w-panmunjom-declaration-201804`：校正为 2018 年 4 月 27 日朝韩领导人在宣布《板门店宣言》后握手的现场照片；Commons 页面明确日期、来源 Cheongwadae / Blue House 和 KOGL Type 1，与本地文件一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AInterKorean_Summit_April_2018_v8.jpg)。

### 2019 年（补充配图）

- `w-notre-dame-fire-201904`：补充 2019 年 4 月 15 日巴黎圣母院火灾现场照片；Commons 文件页标注摄影者 Cangadoba、编辑 PhilipTerryGraham，许可 CC BY-SA 4.0，拍摄日期与火灾发生日一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:NDonFire_8773_(edited).jpg)。

### 2021 年（补充配图）

- `w-us-withdrawal-afghanistan-202108`：补充 2021 年 8 月 15 日喀布尔机场阿富汗撤离行动照片；Commons 文件页标注美国陆军 Sgt. Isaiah Campbell、Public domain，日期处于撤离关键阶段，图注明确为撤离背景图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Afghanistan_withdrawal_Image_3_of_7.jpg)。

### 1952 年（补充配图）

- `w-us-first-hydrogen-bomb-195211`：补充 1952 年 11 月 1 日“常春藤麦克”首次热核试验爆炸云照片；Commons 文件页标注来源为美国国家核安全局内华达现场办公室、Public domain，日期与试爆日一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:IvyMike2.jpg)。

### 1949—1952 年（缺图核验）

- `w-nato-founded-194904`、`w-frg-gdr-founded-194905`、`w-schuman-declaration-195005`、`w-treaty-of-paris-ecsc-195104`：检索 1949—1951 年签署仪式、建国会议和舒曼宣言相关 Commons 关键词，结果主要为后期机构标志、文献 PDF 或无法确认日期的肖像，未找到授权与事件日期均明确的直接图片，继续保持无图。
- `cn-cpc-7th-3rd-plenum-195006`、`cn-land-reform-basic-completed-195212`：检索对应会议、土地改革和早期档案关键词，未找到可确认现场且授权明确的可复用图片；不使用版权不明的新闻档案图。
- 本轮未修改 YAML，缺图原因已记录；配图缺失不改变事件重要性评级。

### 1991 年（缺图核验）

- `w-soviet-fall-1991`、`w-ussr-dissolution-199112`：检索苏联解体、戈尔巴乔夫辞职、克里姆林宫降旗等关键词，Commons 结果主要为一般肖像或同年 START 外交活动照片，未找到可直接对应解体日期且授权明确的图片；继续保持无图，不用一般肖像冒充解体现场。

### 1991 年（补充配图）

- `w-gulf-war-storm-199101`：补充 1991 年“沙漠风暴”行动中的美国海军 F-14A 战机资料照片；Commons 文件页标注作者/机构 US Navy，Public domain，日期为 1991 年，事件对应明确。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AF-14A_VF-33_Operation_Desert_Storm_Strike_Package_Tanking.jpg)。

### 1987 年（补充配图）

- `w-black-monday-198710`：补充道琼斯指数 1987 年黑色星期一前后走势；作者 Edward，Commons 标注 Public domain，图表直接展示 1987 年 10 月股灾的指数变化。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ABlack_Monday_Dow_Jones.png)。

### 1989 年（补充配图）

- `w-polish-semi-free-election-198906`：补充 1989 年波兰半自由议会选举各选区结果图；作者 沁水湾，Commons 标注 CC BY-SA 4.0，地图明确说明部分席位保留、竞争部分按首轮结果着色。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A1989_Polish_parliamentary_election.svg)。

### 1990 年（补充配图）

- `w-germany-reunification-199010`：补充 1990 年 10 月 3 日柏林德国统一庆典升旗照片；作者 Peer Grimm，德国联邦档案馆来源，Commons 标注 CC BY-SA 3.0 DE，日期和统一庆典直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ABundesarchiv_Bild_183-1990-1003-004%2C_Berlin%2C_Vereinigungsfeier%2C_Fahnen.jpg)。

### 1991 年（补充配图）

- `w-ussr-dissolution-199112`：补充 1990 年 10 月至 1991 年 12 月苏联解体前后疆域变化图；作者 Bearsmalaysia，Commons 标注 CC BY-SA 4.0，时间范围覆盖 1991 年 12 月正式解体。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AUSSR_Map_%2810-1990_-_12-1991%29.svg)。

### 1981 年（补充配图）

- `cn-volleyball-worldcup-198111`：补充中国女排 1981 年世界杯冠军奖杯资料照片；作者 N509FZ，Commons 标注 CC BY-SA 4.0。图注明确为赛事实物而非 1981 年决赛现场，奖杯与该届赛事对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ATrophy_of_1981_FIVB_Women%27s_World_Cup_won_by_China_%2820220905113511%29.jpg)。

### 1980 年（补充配图）

- `cn-sez-established-198008`：补充中国经济特区与沿海开放城市分布图；作者 KleinKalve，Commons 标注 CC0，图中包含 1980 年首批深圳、珠海、汕头、厦门四个经济特区。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AChina_SEZ_Map.png)。

### 1984 年（缺图核验）

- `cn-la-olympics-xuhaifeng-198407`：检索 1984 年洛杉矶奥运会射击项目 Commons 资料，现有奖牌仪式照片为吴小旋等其他运动员，未找到可可靠确认的许海峰夺金现场且授权明确的图片；保持无图，避免错配。
- `cn-12th-3rd-plenum-reform-198410`：检索人民出版社/人民日报公开文本和 Commons 文件，未找到可直接复用且授权明确的会议现场或《经济体制改革的决定》扫描图；保持无图。

### 1985 年（补充配图）

- `cn-million-troop-cut-198506`：补充邓小平公开资料肖像；Commons 标注美国国家档案和文件管理局来源、Public domain。图注明确为事件背景图而非 1985 年中央军委扩大会议现场，避免误导。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ADeng_Xiaoping.jpg)。

### 1988 年（补充配图）

- `cn-hainan-province-sez-198804`：补充海南省位置与行政区划图；作者 Joowwww，Commons 标注 Public domain，图注明确为海南建省并设立经济特区的地理背景图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AChina_Hainan.svg)。

### 1992 年（补充配图）

- `cn-deng-southern-tour-199201`：补充邓小平在深圳植树仪式资料照片；该 Commons 文件归入“Deng Xiaoping's Southern Tours of China”分类，作者 Luafuohue，授权 CC BY-SA 3.0。图注明确为南巡行程资料照片，不冒充具体讲话现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASZ_%E6%B7%B1%E5%9C%B3%E5%8D%9A%E7%89%A9%E9%A4%A8_Shenzhen_Museum_Deng_Xiaoping%27s_visit_%E6%A4%8D%E6%A8%B9_06.jpg)。

### 1975 年（补充配图）

- `w-fall-phnom-penh-197504`：补充美国国家档案馆收藏的金边撤离行动资料照片；照片日期为 1975 年 11 月 7 日，作者标注为美国海军陆战队/国防部，Commons 标注 Public domain。图注明确为占领背景资料，不冒充 4 月 17 日攻占现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A278_-_Operation_Eagle_Pull_%281975_evacuation_of_Phnom_Penh_and_Saigon%29_-_November_7%2C_1975_-_DPLA_-_ae2af76375854fa901258f06345e7a79.jpg)。

### 1974 年（补充配图）

- `w-ethiopia-emperor-deposed-197409`：补充 1974 年 9 月 12 日海尔·塞拉西被军方废黜的现场资料照片；Commons 标注作者为临时军事行政委员会官员，Public domain，日期与事件完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AHaile_Selassie_Deposition.jpg)。

### 1981 年（补图核验）

- `w-aids-first-cdc-198106`：补充 CDC 早期艾滋病报告的 Commons 扫描件（美国疾控中心 MMWR，Public domain）；图注明确为 1981 年 7 月报告封面资料，不冒充患者或现场照片。
- 核验来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AMmwr-aids-July1981-report-101.png)、[CDC 首次报告说明](https://www.cdc.gov/mmwr/preview/mmwrhtml/mm5021a1.htm)。

### 1973 年（补充配图）

- `w-oil-crisis-197310`：替换仓库中损坏的旧资源，补充美国环保署 DOCUMERICA 石油危机资料照片；照片为 1974 年 4 月燃料短缺期间拍摄，Commons 标注作者 David Falconer、美国环保署档案来源、Public domain。图注明确为危机影响资料，不冒充 1973 年 10 月禁运宣布现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AGas_Stealers_Beware_1974.jpg)。

### 1974 年（补充配图）

- `w-india-smiling-buddha-197405`：补充英迪拉·甘地于 1974 年 5 月 18 日访问印度首次核试验场的资料照片；Commons 标注作者 nuclearweaponarchive.org，许可 CC BY-SA 4.0，日期与事件一致。图注明确为访问试验场资料，不冒充地下爆炸瞬间。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AGandhiSBuddha458c20.jpg)。

### 1976 年（补充配图）

- `w-argentine-coup-197603`：补充阿根廷军政府领导人豪尔赫·魏地拉资料照片；Commons 文件说明为 1978 年阅兵照片，作者/来源为阿根廷政府，许可 CC BY 2.0。图注明确为政变后军政府背景资料，不冒充 1976 年 3 月 24 日政变现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AJunta_Militar_argentina_1976.png)。

### 1990 年（补充配图）

- `cn-shanghai-stock-exchange-199011`：补充上海证券交易所大厦资料照片；Commons 标注作者 Baycrest，许可 CC BY-SA 2.5，照片为 2008 年建筑现状，图注明确作为交易所成立的地点背景图，不冒充 1990 年成立或开业现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AShanghai_Stock_Exchange_Building.jpg)。

### 1987 年（缺图核验）

- `cn-sino-portuguese-macau-declaration-198704`：检索 Commons、联合国条约数据库及澳门历史资料，未找到可直接复用且授权明确的 1987 年中葡联合声明签署照片或文件扫描件；保留无图，避免使用未授权新闻图片。
- 核验来源：[联合国条约记录](https://treaties.un.org/Pages/showDetails.aspx?objid=08000002800c8dd2)、[澳门虚拟图书馆签署仪式资料](https://www.macaudata.mo/books/detail?bno=b000406)。

### 1971 年（补充配图）

- `w-nixon-shock-197108`：补充理查德·尼克松 1971 年官方肖像；Commons 标注作者 Oliver F. Atkins、美国总统行政办公室来源、Public domain。图注明确为政策背景资料肖像，不冒充 1971 年 8 月 15 日电视讲话现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ANixon_30-0316a.jpg)。

### 2002 年（补充配图）

- `cn-wto-one-year-anniversary-200212`：补充 2001 年拍摄的 WTO 日内瓦总部威廉·拉帕德中心航拍资料图；Commons 标注来源 Centre William Rappard、作者 Photo Lightmotif / Blatt，许可 CC BY-SA 1.0。图注明确为 WTO 总部背景，不冒充中国入世一周年现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ACwr_aerial_2001.jpg)。

### 2001 年（补充配图）

- `cn-qinghai-tibet-railway-start-200106`：补充青藏铁路线路资料照片；Commons 标注作者 Fanghong，许可 CC BY-SA 2.5，照片展示青藏铁路线路及桥梁。图注明确为 2006 年建成通车前后线路背景，不冒充 2001 年 6 月 29 日开工典礼现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ATibetanRailway.jpg)。

### 2001 年（缺图核验）

- `cn-beijing-olympic-bid-success-200107`：检索 Commons 北京奥运相关分类及公开报道，找到的可复用图片主要是 2008 年赛事标识或开幕式照片，无法直接对应 2001 年莫斯科投票及宣布结果；暂不采用，保留无图。
- 核验来源：[北京申奥成功背景资料](https://en.wikipedia.org/wiki/Bids_for_the_2008_Summer_Olympics)、[人民日报英文报道](https://en.people.cn/english/200107/14/eng20010714_74964.html)。

### 2003 年（补充配图）

- `cn-national-npc-200303`：补充人民大会堂资料照片；Commons 标注作者 BrokenSphere，许可 CC BY-SA 3.0。照片为 2007 年建筑外景，图注明确作为全国人大会议地点背景图，不冒充 2003 年会议现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AGreat_Hall_of_the_People.JPG)。

### 2011 年（补充配图）

- `w-us-iraq-war-end-201112`：补充 2011 年 12 月 15 日巴格达“新黎明行动”结束降旗仪式照片；Commons 标注美国空军官方摄影师 Master Sgt. Cecilio Ricardo，Public domain，日期与事件完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AEnd_of_Mission_Ceremony%2C_Iraq_111215-F-MJ260-007.jpg)。

### 2014 年（补充配图）

- `w-isis-caliphate-201406`：补充 ISIS 在叙利亚和伊拉克控制区地图；Commons 文件标注制作者 Nerika、创作日期 2014 年 6 月 14 日，许可 CC BY-SA 3.0。图注明确为“哈里发国”宣布前后控制区背景图，不冒充 6 月 29 日宣布仪式现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ATerritorial_control_of_the_ISIS_ve.png)。

### 2014 年（补充配图）

- `w-us-cuba-reconciliation-201412`：补充 2014 年 12 月 16 日奥巴马与劳尔·卡斯特罗通话的白宫资料照片；Commons 标注官方摄影师 Pete Souza、白宫来源，依据美国联邦政府作品规则为 Public domain。图注明确为关系正常化宣布前后的政策背景资料，不冒充两国领导人同日公开讲话现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AP121614PS-0596_%2816041939932%29.jpg)。

### 2018 年（补充配图）

- `w-us-withdraws-iran-deal-201805`：补充特朗普于 2018 年 5 月 8 日就伊朗核协议发表声明的白宫资料照片；Commons 标注来源为白宫、Public domain，日期与事件完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ATrump_Withdraw_Iran_Deal.jpg)。

### 2019 年（补充配图）

- `w-isis-territory-lost-201903`：补充 2019 年 3 月 23 日巴古兹战役态势图，直接对应 ISIS 最后据点被攻克。Commons 标注作者 Rr016，地图基于 OpenStreetMap 数据，复用条件为 ODbL；文件页同时说明地图输出采用 CC BY-SA 2.0 兼容条款，已在 YAML 中完整注明。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ABattle_of_Baghuz_%282019%29.svg)。

### 1949 年（补充配图）

- `cn-prc-ussr-diplomatic-194910`：补充 1949 年 12 月毛泽东访问莫斯科期间与斯大林同框的 Commons 资料照片；文件页标注作者未知、Public domain。图注明确为中苏建交后的外交背景资料，不冒充 10 月 2 日建交公告现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A1949_Mao_and_Stalin.jpg)。

### 1950 年（补充配图）

- `w-india-republic-195001`：补充 1950 年 1 月 26 日印度共和国成立仪式资料照片；Commons 标注为印度历史政府照片、Public domain，日期与事件对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ARajagopalachari_declares_India_as_a_Republic.jpg)。

### 1950 年（补充配图）

- `w-korean-war-195006`：补充 1950 年 6 月 29 日麦克阿瑟与韩军军官讨论战局的美国陆军/NARA 资料照片；Commons 标注美国军方公共领域作品，日期紧接 6 月 25 日战争爆发。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASC_342712_FEC-50-3210_-_29_June_1950_%2852575866152%29.jpg)。

### 1950 年（补充配图）

- `w-inchon-landing-195009`：补充 1950 年 9 月 15 日仁川登陆第一、第二波登陆艇接近红滩的美国海军资料照片；Commons 标注 Naval History and Heritage Command 来源、Public domain，日期与事件完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ALanding_craft_approaching_Inchon%2C_Korea%2C_on_15_September_1950_%28NH_42351%29.jpg)。

### 1950 年（补充配图）

- `w-turing-test-paper-195010`：补充阿兰·图灵 1951 年肖像作为论文与图灵测试背景资料；Commons 标注 Elliott & Fry、Public domain。图注明确为人物背景肖像，不冒充 1950 年论文写作现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AAlan_Turing_%281951%29.jpg)。

### 1953 年（补充配图）

- `w-everest-first-ascent-195305`：补充 1953 年 5 月 29 日首次登顶珠峰后的丹增·诺盖与埃德蒙·希拉里照片；Commons 标注作者 Jamling Tenzing Norgay，许可 CC BY-SA 2.5，日期与事件完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AEdmund_Hillary_and_Tenzing_Norgay.jpg)。

### 1953 年（补充配图）

- `w-stalin-death-195303`：补充 1953 年 3 月 9 日斯大林葬礼队伍资料照片；Commons 标注美国陆军少校 Martin Manhoff 拍摄、Public domain，日期与斯大林逝世后的国葬完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AStalin%27s_funeral.jpg)。

### 1953 年（补充配图）

- `w-dna-double-helix-195304`：补充沃森与克里克 1953 年 DNA 模型资料照片；Commons 标注作者 Alkivar 已将作品释为 Public domain，图注明确为模型实物，不冒充论文发表现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ADNA_Model_Crick-Watson.jpg)。

### 1954 年（补充配图）

- `w-battle-of-dien-bien-phu-195405`：补充越南人民军在奠边府法军总部升旗的胜利照片；Commons 标注来源为越南人民军博物馆系统、作者越南人民军，Public domain，内容与 1954 年 5 月战役结局直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AVictory_in_Battle_of_Dien_Bien_Phu.jpg)。

### 1955 年（补充配图）

- `w-warsaw-pact-195505`：补充 1955 年华沙条约签署会议资料照片；Commons 标注为 1955 年波兰历史照片、作者未知，依据波兰历史摄影版权规则为 Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AWarsaw_Pact_1955.jpg)。

### 2023 年（补充配图）

- `w-xijinping-biden-202311`：替换原有无完整来源元数据的旧图，补充 2023 年旧金山会晤的白宫官方资料照片；Commons 文件页标注作者/机构为 Office of the President of the United States，Public domain。图片内容与中美元首 2023 年会晤直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3APresident_Biden_meeting_with_President_Xi_%282023%29.jpg)。下载后通过 `npm run validate` 与 `npm test -- --run test/2020-2024-event-images.test.js --testTimeout=20000` 验证。

### 2022 年（补充配图）

- `w-rcep-enforcement-202201`：替换原有无完整来源元数据的旧图，补充 RCEP 成员经济体分布图作为事件背景资料；Commons 文件页标注作者 Tiger 7253，许可 CC BY-SA 4.0。图注明确说明不是 2022 年 1 月 1 日签署现场，避免把背景地图误作现场照片。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ARCEP.png)。

### 2023 年（补充配图）

- `w-covid-emergency-end-202305`：替换原有无完整来源元数据的旧图，补充世界卫生组织日内瓦总部与旗帜的 Commons 资料照片；文件页标注作者/机构为 United States Mission Geneva，拍摄日期 2012-02-29，许可 CC BY 2.0。图注明确这是世卫组织总部背景图，不冒充 2023 年 5 月 5 日宣布现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AWorld_Health_Organization_Headquarters_and_Flag.jpg)。

### 2022 年（补充配图）

- `w-fed-rate-hikes-202203`：替换原有无完整来源元数据的旧图，补充 2022 年 3 月 16 日联邦公开市场委员会（FOMC）会议资料照片；Commons 文件页标注机构为 Federal Reserve，Public domain，拍摄日期与事件日期一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AFOMC_03152022_3000px_Edited-78069_%2851942669420%29.jpg)。

### 2023 年（补充配图）

- `w-genai-boom-202303`：替换原有无完整来源元数据的旧图，补充 OpenAI GPT-4 视觉能力示例图；Commons 文件页标注作者 OpenAI，许可 CC BY-SA 4.0，日期为 2023-03-27。图注明确为 GPT-4 发布后的能力资料图，不冒充 3 月 14 日发布会现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AGpt-4-visual.png)。

### 2022 年（补充配图）

- `w-chatgpt-release-202211`：替换原有无完整来源元数据的旧图，补充 2022 年 12 月 5 日 ChatGPT 产品界面截图；Commons 文件页标注作者 Stefangrotz，许可 CC BY-SA 4.0。图注明确为发布后的界面资料，不冒充 2022 年 11 月 30 日发布现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AChatGPT_Esperanto.png)。

### 2001 年（补充配图）

- `w-911-attacks-200109`：替换原有无完整来源元数据的旧图，补充美国国家公园管理局 2001 年 9 月 11 日纽约世贸中心起火照片；Commons 文件页标注机构 National Park Service，Public domain，拍摄日期与事件日期一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ANational_Park_Service_9-11_Statue_of_Liberty_and_WTC_fire.jpg)。

### 2007 年（补充配图）

- `w-iphone-launch-200701`：补充 2007 年 1 月 9 日 Macworld 主题演讲前排队等待入场的资料照片；Commons 文件页标注作者 ArnoldReinhold，许可 CC BY-SA 4.0，拍摄日期与首款 iPhone 发布会日期一致。图注明确为发布会背景资料，不冒充台上演示画面。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AWaiting_for_the_keynote_MacWorld_2007.agr.jpg)。

### 1989 年（补充配图）

- `w-berlin-wall-opens-198911`：补充勃兰登堡门附近东西德民众的 1989 年资料照片；Commons 文件页标注原作者未知、Lear 21 负责复制作图，许可 CC BY-SA 3.0。图注明确为柏林墙开放及两德民众背景资料图，不声称为 11 月 9 日口岸开放瞬间。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AWest_and_East_Germans_at_the_Brandenburg_Gate_in_1989.jpg)。

### 1968 年（补充配图）

- `w-mlk-assassination-196804`：补充马丁·路德·金遇刺前一日在洛林酒店外的资料照片（1968 年 4 月 3 日）；Commons 文件页标注作者未知、Public domain，日期与事件前后对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AMartin_Luther_King_Jr_outside_Lorraine_Hotel_April_3%2C_1968.jpg)。

### 1963 年（补充配图）

- `w-civil-rights-march-washington-196308`：补充 1963 年 8 月 28 日华盛顿民权游行现场照片；Commons 文件页标注摄影师 Rowland Scherman，Public domain，日期与事件完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A1963_march_on_washington.jpg)。

### 1965 年（补充配图）

- `w-voting-rights-act-196508`：补充 1965 年 8 月 6 日约翰逊总统签署《投票权法》的现场照片；Commons 文件页标注摄影师 Yoichi Okamoto，Public domain，日期与事件完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ALyndonJohnson_signs_Voting_Rights_Act_of_1965.jpg)。

### 1975 年（补充配图）

- `w-helsinki-accords-197508`：补充 1975 年 8 月 1 日杰拉尔德·福特总统签署《赫尔辛基最后文件》的现场照片；Commons 文件页标注来源为 Gerald R. Ford Library，Public domain，日期与事件完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3APresident_Gerald_Ford_signs_the_Final_Act_of_the_Conference_on_Security_and_Cooperation_in_Europe.jpg)。

### 1984 年（缺图核验）

- `w-bhopal-disaster-198412`：检索 Wikimedia Commons 的 “Bhopal disaster 1984”“Bhopal gas tragedy site 1984”等关键词，结果主要为后续国会听证 PDF、泛化化学安全资料或无事件日期的图片，未找到能同时证明与 1984 年博帕尔事故直接对应且有明确可复用图片授权的合适图片。
- 本轮不写入占位图、不猜测作者或许可，事件继续保留无图状态。

### 1979 年（补充配图）

- `w-iranian-revolution-197902`：补充 1979 年 2 月德黑兰武装革命者资料照片；Commons 文件页标注来源 khabaronline.ir、作者未注明，Public domain，日期与伊朗革命政权更替阶段对应。图注明确为革命背景资料图，不冒充具体政权宣布瞬间。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AArmed_Revolutionaries_drives_a_TAVANIR_%28Iran_Power_Generation_and_Transmission_Company%29_vehicle%2C_Tehran_-_February_1979.jpg)。

### 1990 年（补充配图）

- `w-germany-reunification-199010`：补充 1990 年 10 月 3 日德国统一日对应的历史影像；Commons 文件页标注摄影师 Merit Schambach，许可 CC BY-SA 3.0，影像日期与德国统一日一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A0000386_representation_354_original.tif)。本地使用 Wikimedia Commons 提供的 JPEG 缩略转换版，避免直接在前端加载 TIFF。

### 1981 年（补充配图）

- `w-ibm-pc-5150-198108`：补充 IBM 5150 型个人电脑 1981 年机型资料照片；Commons 文件页标注作者 FA2010，Public domain，图片对象与事件发布产品完全对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AIBM_PC_1981_makffm.jpg)。

### 1984 年（补充配图）

- `w-macintosh-launch-198401`：补充史蒂夫·乔布斯与首代 Macintosh 电脑的 1984 年资料照片；Commons 文件页标注摄影师 Bernard Gotfryd，Public domain，日期与 Macintosh 发布月份对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ASteve_Jobs_and_Macintosh_computer%2C_January_1984%2C_by_Bernard_Gotfryd-_border_cropped.jpg)。

### 1986 年（补充配图）

- `w-chernobyl-disaster-198604`：补充切尔诺贝利核事故现场资料照片；Commons 文件页标注来源机构为 State Committee for Television and Radio-broadcasting（苏联乌克兰政府机构），Public domain，日期标注为 1986 年，事件对应明确。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ATatiana_Tsymbal_Chernobyl_2.jpg)。

### 1983 年（补充配图）

- `w-arpanet-tcpip-198301`：补充 1983 年 ARPANET 网络拓扑图；Commons 文件页标注来源机构 BBN Technologies，Public domain。图注明确为 TCP/IP 切换后的网络背景资料，不冒充 1983 年 1 月 1 日切换当天现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AARPANET_as_of_Aug_25%2C_1983_-_BBN_map_-_DSC00125.JPG)。

### 2008 年（补充配图）

- `w-lehman-bankruptcy-200809`：补充雷曼兄弟纽约总部在 2008 年 9 月 15 日破产申请日的照片；Commons 页面明确日期、事件对象、摄影师 Robert Scoble 和 CC BY 2.0。
- 本地文件：`public/images/events/2008/w-lehman-bankruptcy-200809.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ALehman_Brothers-NYC-20080915.jpg)。
- `w-obama-wins-election-200811`：补充 2008 年 11 月 4 日奥巴马在芝加哥格兰特公园的胜选演讲照片；Commons 页面明确日期、地点、作者 Lucy Gray 和 CC BY-SA 2.0。
- 本地文件：`public/images/events/2008/w-obama-wins-election-200811.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AObama_victory_%283005078575%29.jpg)。

### 2009 年（补充配图）

- `w-obama-inauguration-200901`：补充 2009 年 1 月 20 日奥巴马在华盛顿特区宣誓就任美国总统的就职典礼照片；Commons 页面明确日期、摄影师 Steve Jurvetson 和 CC BY 2.0。
- 本地文件：`public/images/events/2009/w-obama-inauguration-200901.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ABarack_Obama_Inauguration.jpg)。

### 2011 年（补充配图）

- `w-egypt-revolution-201101`：补充 2011 年 1 月 25 日埃及吉萨反政府示威现场照片；Commons 页面明确日期、地点、作者 Sherif9282 和 CC BY-SA 3.0，事件对象与首日抗议相符。
- 本地文件：`public/images/events/2011/w-egypt-revolution-201101.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AEgyptian_protests_at_Giza_Jan_25.jpg)。
- `w-libya-war-201103`：补充 2011 年利比亚战争期间班加西反卡扎菲抗议者的现场照片；Commons 页面明确拍摄日期为 2011 年 4 月 14 日、地点为班加西、作者为 Al Jazeera English 和 CC BY-SA 2.0。该图作为战争期间资料，不冒充 3 月 19 日空袭当天画面。
- 本地文件：`public/images/events/2011/w-libya-war-201103.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ALibyan_protestors_ffrom_Benghazi%2C_Apr_2011_.jpg)。

- `w-fukushima-disaster-201103`：补充 2011 年 3 月 11 日日本东北地震、海啸与福岛核事故的灾区航拍资料照片；Commons 页面明确照片拍摄于 3 月 13 日、对象为海啸灾区，作者为 Dylan McCord / U.S. Navy，Public domain。该图作为事后灾情资料，不冒充 3 月 11 日当天拍摄。
- 本地文件：`public/images/events/2011/w-fukushima-disaster-201103.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AUS_Navy_110313-N-SB672-592_An_aerial_view_of_debris_from_an_8.9_magnitude_earthquake_and_subsequent_tsunami_that_struck_northern_Japan.jpg)。

### 2012 年（补充配图）

- `w-senkaku-diaoyu-islands-201209`：补充 2012 年 9 月 18 日北京日本驻华大使馆前反日示威照片，作为 9 月 11 日“购岛”事件后的抗议资料；Commons 页面明确日期、地点、作者 Dong Fang / Voice of America，Public domain。
- 本地文件：`public/images/events/2012/w-senkaku-diaoyu-islands-201209.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A2012_China_anti-Japanese_demonstrations_in_Beijing.jpg)。

### 2015 年（补充配图）

- `w-european-migrant-crisis-201509`：补充 2015 年 9 月 4 日为艾兰·库尔迪及其他难民举行的纪念活动照片；Commons 页面明确日期、对象、作者 Defend International，并记录 VRT 许可核验，CC BY-SA 3.0。该图为纪念活动资料，不使用遇难儿童遗体照片。
- 本地文件：`public/images/events/2015/w-european-migrant-crisis-201509.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AMoments_of_Mourn_For_Alan_Kurdi_DI_September_2015.jpg)。

- `w-paris-climate-agreement-201512`：补充 2015 年 12 月 12 日巴黎气候大会通过《巴黎协定》的会场照片；Commons 页面明确日期、事件对象、作者 UNclimatechange 和 CC BY 2.0。
- 本地文件：`public/images/events/2015/w-paris-climate-agreement-201512.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AAdoption_of_the_Paris_Agreement_%2825876053520%29.jpg)。

- `w-new-horizons-pluto-201507`：补充新视野号 2015 年 7 月 14 日飞掠冥王星期间的影像；Commons 页面明确日期、任务对象、作者 NASA/JPL Solar System Simulator，Public domain。
- 本地文件：`public/images/events/2015/w-new-horizons-pluto-201507.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AView_of_Pluto_from_New_Horizons_on_July_14%2C_2015.jpg)。

### 2016 年（补充配图）

- `w-alphago-lee-sedol-201603`：补充 AlphaGo 与李世石第一局棋谱图；Commons 页面明确对局双方、结果和作者 Wesalius，CC BY-SA 4.0。该图是棋谱资料，不冒充比赛现场摄影。
- 本地文件：`public/images/events/2016/w-alphago-lee-sedol-201603.svg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ALee_Sedol_%28B%29_vs_AlphaGo_%28W%29_-_Game_1.svg)。

### 2014 年（补充配图）

- `w-crimea-annexation-201403`：补充 2014 年 3 月 16 日克里米亚公投投票现场截图；Commons 页面明确日期、事件对象、作者 Юрий Дейнека 和 CC BY 3.0。图片对应公投日，事件记录日期为 3 月 18 日并入俄罗斯决定。
- 本地文件：`public/images/events/2014/w-crimea-annexation-201403.png`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3A2014_Crimea_Referendum_Voting.png)。

- `w-philae-comet-landing-201411`：补充 ESA 为菲莱彗星着陆十周年制作的任务回顾图；Commons 页面明确回顾对象为 2014 年 11 月 12 日首次彗星着陆，作者 European Space Agency，CC BY-SA 3.0 IGO。图片是后制回顾资料，不冒充着陆当天原始照片。
- 本地文件：`public/images/events/2014/w-philae-comet-landing-201411.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3APhilae%27s_firsts_ESA503297.jpg)。

### 2013 年（补充配图）

- `w-ukraine-euromaidan-201311`：补充 2013 年 12 月 8 日基辅独立广场亲欧示威现场照片；Commons 页面明确日期、地点、作者 Oleksii Leonov 和 CC BY 2.0，作为 11 月 21 日抗议爆发后的运动期间资料。
- 本地文件：`public/images/events/2013/w-ukraine-euromaidan-201311.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AKyiv%2C_Euro_Maidan_2013_%2811275099176%29.jpg)。
- `w-nelson-mandela-pass-201312`：补充 2013 年 12 月 10 日曼德拉国葬仪式现场照片；Commons 页面明确日期、地点、作者 Partidul Social Democrat（罗马尼亚）和 CC BY 2.0，作为 12 月 5 日逝世后的悼念/国葬资料。
- 本地文件：`public/images/events/2013/w-nelson-mandela-pass-201312.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AFuneraliile_nationale_ale_fostului_presedinte_sud-african_Nelson_Mandela_%2811308003184%29.jpg)。

### 2017 年（补充配图）

- `w-robert-mugabe-resignation-201711`：补充 2017 年津巴布韦政治危机期间哈拉雷市中心坦克照片；Commons 页面明确事件关联、作者 Captain611611611 和 CC0 1.0。照片拍摄于辞职前危机阶段，不冒充 11 月 21 日递交辞职信现场。
- 本地文件：`public/images/events/2017/w-robert-mugabe-resignation-201711.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3AA_tank_in_harare_during_the_coup.jpg)。
- `w-us-withdraws-paris-agreement-201706`：补充 2017 年 6 月 1 日特朗普宣布退出《巴黎协定》的讲话画面；Commons 页面明确日期、作者 The White House，并依据美国联邦政府作品标注 Public domain。
- 本地文件：`public/images/events/2017/w-us-withdraws-paris-agreement-201706.jpg`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File%3ADonald-Trump-Regarding-the-Paris-Accord-and-Temperature.jpg)。

### 2001 年（补充配图）

- `w-wikipedia-launched-200101`：补充 Wikipedia 早期标志；Commons 文件页说明该标志设计于 2000 年前、用于早期 Wikipedia 视觉系统，作者 Bjørn Smestad，许可 CC BY-SA 3.0。它不是 2001-01-15 当日网页截图，已在图注中明确。
- 本地文件：`public/images/events/2001/w-wikipedia-launched-200101.png`。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Old_wikipedia_logo.png)。

- `cn-beijing-olympic-bid-success-200107`、`cn-world-cup-qualification-200110`：本轮检索未找到能同时满足事件对应性、日期/场景核验和明确开放许可的 Commons 图片，继续留空，避免用 2008 年北京奥运会场馆或泛化足球场照片替代。

### 1949—1951 年（补充配图）

- `w-nato-founded-194904`：使用杜鲁门签署实施北大西洋公约文件的 NARA 资料照片（1949-08-24），作为同年4月4日公约签署及NATO成立的同期背景图；作者 Abbie Rowe，Commons 标注 Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Truman_signing_North_Atlantic_Treaty.jpg)。
- `w-frg-gdr-founded-194905`：使用东德政府成员宣誓仪式照片（1949-10-12），Commons 原始说明明确关联1949-10-07东德成立；作者 Walter Heilig / Bundesarchiv，许可 CC BY-SA 3.0 de。图注已注明其只对应德国分裂事件中的东德阶段。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-S88866,_Berlin,_DDR-Gründung,_Vereidigung_der_Regierung.jpg)。
- `w-treaty-of-paris-ecsc-195104`：使用1951年4月18日《巴黎条约》签署文本、印章与签名图；作者 Marc Baronnet，许可 CC BY-SA 4.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:1951_CECA_signatures_ECSC.jpg)。
- `w-schuman-declaration-195005`：补充罗伯特·舒曼1958年官方肖像，作为1950年舒曼宣言的背景人物资料图；作者 European Commission，许可 CC BY 4.0。图注已明确并非1950年5月9日现场照片。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Robert_Schuman_1958.jpg)。
- `w-opec-founded-196009`：补充 OPEC 标志作为1960年巴格达成立事件的组织识别图；Commons 标注作者未知、Public domain。图注已明确不是1960年成立会议现场照片。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:OPEC_Logo.svg)。
- `w-yom-kippur-war-197310`：补充赎罪日战争西奈战线第一阶段地图（1973年10月6—13日），作者美国西点军校历史系，Public domain；日期和战线与事件直接对应。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:1973_sinai_war_6-13_en.jpg)。
- `w-spanish-election-197706`：补充1977年西班牙大选资料照片，作者 ElPoss，CC BY-SA 4.0；Commons 分类明确属于1977年6月15日大选。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Elecciones_generales_de_Espa%C3%B1a_de_1977.jpg)。
- `w-argentine-coup-197603`：补充1976年政变后阿根廷军政府领导人资料照片（1978年阅兵）；作者阿根廷政府，CC BY 2.0，图注明确不是3月24日政变现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Junta_Militar_argentina_1976.png)。
- `w-polish-semi-free-election-198906`：补充1989年波兰议会选举各选区结果图；作者沁水湾，CC BY-SA 4.0，选举关联和竞争性席位说明见 Commons 文件页。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:1989_Polish_parliamentary_election.svg)。
- `w-ussr-dissolution-199112`：补充1991年苏联国旗资料照片，作者 fdecomite，CC BY 2.0；图注明确为解体与国旗降下事件的背景图，不冒充12月25日克里姆林宫现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Soviet_flag_(4388333786).jpg)。
- `w-putin-elected-president-200003`：补充普京在2000年3月26日总统选举期间回答记者提问的竞选资料照片；作者俄罗斯总统新闻服务，CC BY 4.0，照片日期与投票日一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Vladimir_Putin_in_elections_(2000-03-26)_01.jpg)。
- `w-arab-spring-begins-201012`：补充突尼斯革命示威现场照片（2011年1月20日），作者 cjb，CC BY 2.0；图注明确照片拍摄于革命爆发后，用作茉莉花革命/阿拉伯之春的现场背景资料。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Tunisian_Revolution_Protest.jpg)。

### 2012—2016 年中国科技事件（本轮核查）

- `cn-jiaolong-7062m-201206`、`cn-micius-quantum-satellite-201608`：本轮检索未找到同时满足事件本身对应性、日期核验和可复用开放许可的 Commons 图片。找到的长征火箭或其他卫星发射照片并非蛟龙号或“墨子号”发射，故继续留空，避免误配。
- `cn-pla-rocket-force-established-201512`：补入 Commons《Rocket Force Flag of the People's Republic of China.svg》作为成立后官方军旗资料图；文件页标注日期为 2016-07-06，作者 Ericmetro，PD-PRC-exempt。图注明确说明其不是 2015-12-31 授旗现场，避免把后续标识误作事件照片。
- `cn-c919-rollout-201511`：补入 Commons《COMAC, C919 (35509429452).jpg》，作者 Anna Zvereva，拍摄于 2017-06-24 巴黎航展，CC BY-SA 2.0。图注明确标为 C919 后续实机资料图，不冒充 2015-11-02 下线现场。
- `cn-constitution-amendment-201803`：补入 Commons《中华人民共和国宪法修正案（2018年）》首页缩略图，来源全国人大法规数据库，作者/发布机构全国人民代表大会，PD-PRC-exempt。该文件直接对应 2018 年宪法修正案文本，许可与来源在 Commons 文件页核验。
- `cn-hainan-free-trade-port-201804`：补入 Commons《Hainan satellite.JPG》，作者 NASA，PD-WorldWind。该图是海南岛区域卫星资料图，图注明确说明其为政策所涉区域背景而非 2018 年发布会现场。
- `w-inf-treaty-withdrawal-201908`：补入 Commons《Reagan and Gorbachev signing.jpg》，白宫摄影办公室拍摄，公共领域（美国政府作品）。图注明确标为 1987 年签约资料图，用于对应 2019 年退出的条约对象，不冒充退出声明现场。
- `cn-foreign-investment-law-201903`：补入 Commons《中华人民共和国外商投资法》首页缩略图，来源全国人大法规数据库，作者/发布机构全国人民代表大会，PD-PRC-exempt。文件原始日期为 2019-03-15，与事件通过日期一致。
- `cn-poverty-alleviation-202011`：补入 Commons《Poverty Alleviation—China's Experience and Contribution (2021)》首页缩略图，国务院新闻办公室发布，PD-PRC-exempt。图注明确说明是 2021 年白皮书对 2020 年脱贫成果的总结，不冒充贫困县退出现场。
- `cn-hk-electoral-reform-202103`：补入 Commons《中华人民共和国全国人民代表大会常务委员会公报2021年第三号》首页缩略图，作者/发布机构全国人大常委会办公厅，PD-PRC-exempt。该公报为 2021 年 4 月刊，图注明确标为相关法规范本资料而非 3 月 11 日表决现场。
- `w-eu-expansion-10-countries-200405`：补入 Commons《EU25-2004 European Union map enlargement.svg》，作者 Kolja21（基于 Júlio Reis），CC BY-SA 2.5；地图直接标出 2004 年新增的 10 个成员国。
- `w-iran-iraq-war-198009`：修正错配：将原误挂在圣海伦斯火山事件下的图片移至两伊战争事件，改用 Commons 1980-09-22 德黑兰机场遭袭现场照片；作者 Mhsheikholeslami，CC BY-SA 4.0，拍摄日期与战争爆发日一致。
- `cn-land-reform-basic-completed-195212`：补入 Commons/NARA 1952-07-23 广东佛冈土地改革照片，作者原档案未详、美国政府档案公共领域；图注明确为土改实践资料而非全国完成节点。
- `cn-daqing-oil-field-battle-196004`：补入 Commons《First train of oil leaving Daqing.jpg》，资料标注 1960-06-01，来源大庆日报，作者未详，公共领域；图注明确为会战后的生产节点而非4月29日誓师现场。
- `w-g20-london-summit-200904`：补入 Commons《G-20 London Summit 2009.jpg》，白宫摄影师 Chuck Kennedy，公共领域；文件页标注 2009-04-02，直接对应伦敦峰会。
- `w-g20-washington-summit-200811`：补入 Commons《Cumbre G-20-Washington.jpg》，白宫摄影师 Joyce N. Boghosian，公共领域；文件页标注 2008-11-15，直接对应首届 G20 华盛顿峰会。
- `w-lisbon-treaty-effective-200912`：补入 Commons《Treaty of Lisbon ratificationNew.png》，作者 TRDeathmaker，公共领域；图注明确为 2009 年批准状态背景图，不冒充 12 月 1 日生效仪式现场。
- `w-cop15-copenhagen-200912`：补入 Commons《Copenhagen - COP15.png》，作者 Marc Kjerland，CC BY-SA 2.0；文件页标注拍摄于 2009-12-06、峰会期间，直接对应哥本哈根 COP15。
- `w-ban-ki-moon-un-200701`：补入 Commons《Bankimoon07052007.jpg》，作者 Marcello Casal Jr. / Agência Brasil，CC BY 3.0；图注明确为潘基文 2007 年6月任期内肖像，不冒充1月1日就职现场。
- `cn-aiib-agreement-signed-201506`：补充亚投行意向创始成员分布图（2015年4月16日），作者 EmberEdison，CC BY-SA 4.0；作为6月29日北京签署协定的前期成员背景资料图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:AIIBMap.svg)。

### 1977—1985 年（补充配图）

- `w-sadat-jerusalem-197711`：补充萨达特肖像，作为访问耶路撒冷事件的背景人物资料图；Commons 标注作者未知、Public domain，图注明确不是访问现场照片。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Anwar_Sadat_cropped.jpg)。
- `w-camp-david-accords-197809`：补充戴维营 Laurel Cabin（2012）照片，Commons 标注 White House、Public domain；图注明确其为协议签署地点背景图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Laurel_Cabin,_Camp_David_2012.jpg)。
- `w-soviet-invasion-afghanistan-197912`：补充苏联入侵阿富汗示意地图，作者 The Great Mule of Eupatoria，CC0；图注明确为背景地图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Invasion_of_Afghanistan.png)。
- `w-indira-gandhi-assassination-198410`：补充英迪拉·甘地官方肖像，作者印度总理办公室，GODL-India；图注明确为人物资料图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Indira_Gandhi_official_portrait.png)。
- `w-gorbachev-general-secretary-198503`：补充1985年8月9日戈尔巴乔夫肖像，作者 Vladimir Vyatkin / RIA Novosti，CC BY-SA 3.0；作为其当选总书记后的同期资料图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:RIAN_archive_850809_General_Secretary_of_the_CPSU_CC_M._Gorbachev_(crop).jpg)。

### 1988—1997 年（补充配图）

- `w-lockerbie-bombing-198812`：补充洛克比空难坠机现场调查照片（1990-08-06），作者 Air Accident Investigation Branch，许可 OGL 2；图片与事件地点和事故调查直接相关。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Pan_Am_Flight_103._Crashed_Lockerbie,_Scotland,_21_December_1988.jpg)。
- `w-eu-founded-199311`：补充《马斯特里赫特条约》最终法案比利时代表签名页；Commons 标注来源 EU Lex、作者未知、Public domain，图注明确条约1992年签署、1993年生效。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Maastricht_Signature_Belgium.jpg)。
- `w-asian-financial-crisis-199707`：补充亚洲金融危机波及范围地图，作者 Bamse（PatrickFlaherty 衍生制作），许可 CC BY-SA 3.0；图注明确为背景地图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Asian_Financial_Crisis_EN.png)。

### 2002—2009 年（补充配图）

- `w-bali-bombings-200210`：补充库塔遇难者纪念碑照片；作者 Jakub Hałun，CC BY-SA 4.0，图注注明2022年拍摄。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Memorial_to_the_victims_of_the_2002_Bali_bombings,_Kuta,_20220827_1143_1198.jpg)。
- `w-beslan-school-siege-200409`：补充别斯兰遇难者纪念资料照片；作者 Leon，CC BY-SA 3.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Beslan_foto_pogibshih.jpg)。
- `w-ukraine-orange-revolution-200411`：补充2004年11月22日橙色革命首日示威照片；作者 Serhiy，CC BY-SA 3.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Morning_first_day_of_Orange_Revolution.jpg)。
- `w-kyoto-protocol-effective-200502`：补充京都议定书缔约方状态图；作者 Canuckguy、Danlaycock，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Kyoto_Protocol_parties.svg)。
- `w-pluto-demoted-dwarf-planet-200608`：补充冥王星真彩色影像；NASA/JHUAPL/SwRI/Alex Parker，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Pluto_in_True_Color_-_High-Res.png)。
- `w-putin-munich-speech-200702`：补充2007年2月10日慕尼黑安全会议演讲现场照片；作者 Kremlin.ru，CC BY 4.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Putin_in_Munchen.jpg)。
- `w-subprime-mortgage-crisis-200704`：补充2000—2010年美国抵押贷款逾期率图；作者 Isochrone，CC BY-SA 4.0，作为危机背景图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Mortgage_delinquencies_by_loan_type_(2000%E2%80%932010).svg)。
- `w-kosovo-independence-200802`：补充科索沃独立国际承认情况图；Commons 标注 Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:CountriesRecognizingKosovo.svg)。
- `w-mumbai-terrorist-attacks-200811`：补充泰姬陵酒店遇袭后穹顶被焚照片（2008-12-03）；作者 Nicholas，CC BY-SA 3.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:2008_Mumbai_terror_attacks_Taj_dome_burned_2.jpg)。
- `w-swine-flu-pandemic-200906`：补充 CDC 的甲型H1N1病毒电子显微镜图；作者 C. S. Goldsmith、A. Balish / CDC，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:CDC-11214-swine-flu.jpg)。

### 2010—2018 年（补充配图）

- `w-eurozone-crisis-201005`：补充2011年欧元区成员状态地图，作者 Kolja21，CC BY 3.0；图注明确为欧洲主权债务危机的区域背景图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Eurozone_map-2011.svg)。
- `w-us-withdraws-iran-deal-201805`：使用特朗普2018年5月8日就伊核协议发表声明的白宫照片；Commons 页面明确拍摄日期、来源 The White House，并标注 Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Trump_Withdraw_Iran_Deal.jpg)。
- `w-inf-treaty-withdrawal-201908`：补入1987年《中程导弹条约》签署资料图（白宫摄影办公室，公共领域），并在 YAML 图注明确其为条约对象背景而非2019年退出公告现场。
- `w-us-iraq-war-end-201112`：补充2011年12月15日巴格达美国驻伊拉克任务结束仪式降旗照片；作者 Erin A. Kirk-Cuomo / 美国国防部，Public domain，日期与事件一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Defense.gov_News_Photo_111215-D-BW835-017_-_The_colors_are_retired_during_a_ceremony_marking_the_end_of_the_U.S._mission_in_Iraq_in_Baghdad_on_Dec._15,_2011.jpg)。
- `w-us-china-ratify-paris-agreement-201609`：补充2016年9月3日杭州中美元首会晤照片；作者 Pete Souza / White House，Public domain，照片日期与向联合国交存批准文书同日。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Barack_Obama_and_Xi_Jinping_meeting_on_2016_G20_Summit.jpg)。

### 2019—2021 年仍缺直接事件图

- `cn-fourth-plenum-19th-201910`、`cn-gdp-99trillion-201912`、`cn-fifth-plenum-202010`、`cn-sixth-plenum-resolution-202111`：本轮定向检索未找到同时满足事件日期/对象对应性与开放许可核验的 Commons 现场图或正式文件扫描件，继续留空。

- `w-merkel-chancellor-200511`：补入默克尔出任德国总理后的官方会见资料图（2005年12月6日与美国国务卿赖斯会面；非11月22日宣誓现场）。来源为美国驻柏林使馆，作者 US Embassy Berlin Photo，Public domain（美国国务院作品）。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Ricemerkel2_600.jpg)。
- `w-java-earthquake-200605`：补入美国海军陆战队在日惹班图尔救治地震伤员的官方照片（2006年5月31日，事件发生后资料图）；作者 Lance Cpl. Warren Peace / U.S. Marine Corps，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:USMC-06066.jpg)。
- `w-world-cup-germany-200606`：补入2006年德国世界杯开幕式安联球场照片（2006年6月9日）；作者 XoMEoX，CC BY 4.0，日期与开幕日一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Allianz_Arena_during_opening_ceremony_of_the_2006_FIFA_world_cup_2.jpg)。
- `w-north-korea-first-nuclear-test-200610`：补入美国地质调查局的首次核试验地震位置图（2006年10月9日）；Public domain，图中事件日期与条目一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:North_Korea_Nuclear_Test.jpg)。
- `w-euro-cash-launch-200201`：补入葡萄牙1欧元硬币资料图；Commons 标注日期为2002年1月1日，来源 European Central Bank，作者未知，CC BY 4.0，作为欧元现金启动的实物背景图。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:1_Euro,_Portugal.jpg)。
- `w-icc-statute-effective-200207`：补入国际刑事法院标志资料图；用于2002年7月1日《罗马规约》生效及法院成立的机构背景，非成立日现场照片。作者 Afrank99（后由 Commons 用户维护），Public domain（标志不具独创性）。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:International_Criminal_Court_logo.svg)。
- `w-iraq-war-breaks-out-200303`：补入伊拉克战争开始当日华盛顿反战游行照片（2003年3月20日）；作者 Elvert Barnes，CC BY-SA 2.0，明确注明非巴格达空袭现场。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:03.StudentWalkOut.WDC.20March2003_(16545345585).jpg)。
- `w-george-w-bush-re-elected-200411`：补入布什在选举结果公布后接到克里致电承认败选的白宫照片（2004年11月3日）；作者 Eric Draper / White House，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Bush_Oval_Office_phone_call.jpg)。
- `w-yasser-arafat-death-200411`：补入阿拉法特在开罗举行葬礼的照片（2004年11月12日，为逝世次日资料图）；作者 Hossam el-Hamalawy，CC BY-SA 2.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Arafat%27s_Cairo_Funeral_017.jpeg)。
- `w-us-government-bailout-200810`：补入布什签署《2008年紧急经济稳定法》的白宫照片（2008年10月3日）；作者 Eric Draper / White House，Public domain，日期与TARP法案签署生效日一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:President_George_W._Bush_signs_the_Emergency_Economic_Stabilization_Act_of_2008_in_the_Oval_Office.jpg)。
- `w-north-korea-second-nuclear-test-200905`：补入美国地质调查局绘制的第二次核试验地震位置图（2009年5月25日）；Public domain，图中事件日期与条目一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:2009_North_Korean_nuclear_test.png)。
- `w-us-withdraw-iraq-200906`：补入伊拉克“主权日”安全部队阅兵照片（2009年6月30日，与美军撤出主要城市及安全职责移交同日）；作者 Capt. Tommy Avilucea / DVIDSHUB，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Flickr_-_DVIDSHUB_-_Iraq%27s_Sovereignty_Day.jpg)。
- `w-china-gdp-second-official-201102`：补入2010年世界主要经济体名义GDP图表（2011年1月制作；中国排名第二，为2011年2月日本正式确认数据的同期图表背景）；作者 Pagecloudss，Public domain（作者放弃版权）。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:2010_Nominal_GDP.jpg)。
- `cn-xijinping-president-201303`：补入习近平当选国家主席后的三亚欢迎仪式资料图（2013年4月6日，非3月14日全国人大选举现场）；作者 Angélica Rivera de Peña，CC BY-SA 2.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Xi_Jinping_Sanya2013.jpg)。
- `cn-us-china-trade-war-begins-201803`：补入刘鹤率团在美国财政部会谈的官方照片（2018年5月18日，为3月22日关税备忘录后的贸易争端资料图）；作者 Office of U.S. Treasury Secretary，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Liu_He_at_US_Treasury_to_resolve_the_US-China_trade_dispute.jpg)。
- `cn-reform-40th-anniversary-201812`：补入深圳“大潮起珠江”改革开放史展览照片（2018年11月27日；为12月18日北京纪念大会的同期纪念活动资料图，非大会现场）；作者 Red Guosam ZhuGuang01，CC BY-SA 4.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3%E5%B8%82_Shenzhen_%E7%A6%8F%E7%94%B0%E5%8D%80_Futian_%E7%95%B6%E4%BB%A3%E8%97%9D%E8%A1%93%E9%A4%A8_MOCAPE_Great_trend_in_Pear_River_%E5%A4%A7%E6%BD%AE%E8%B5%B7%E7%8F%A0%E6%B1%9F_Guangdong_Economic_open_reform_history_%E5%BB%A3%E6%9D%B1%E6%94%B9%E9%9D%A9%E9%96%8B%E6%94%BE40%E5%91%A8%E5%B9%B4%E5%B1%95%E8%A6%BD_40th_years_Exhibition_in_November_2018_SSG_332.jpg)。
- `w-world-cup-korea-japan-200205`：补入2002年韩日世界杯开幕式烟花照片（2002年5月31日）；作者 문덕관 기증 / 韩国国立民俗博物馆民俗档案，KOGL Type 1（要求署名），日期与开幕日一致。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:2002년_한·일_월드컵-개막식-불꽃놀이_(1).jpg)。
- `w-montenegro-independence-200606`：补入2006年黑山独立公投结果地图，作为6月3日宣布独立前后的政治背景；作者 Electionworld（基于 Neil Tarrant 的公共领域地图），Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Montenegro_Referendum_2006.png)。
- `w-benazir-bhutto-assassination-200712`：补入拉瓦尔品第事件定位图（2007年12月27日；非袭击现场）；作者 Gwyndon，基于 CIA World Factbook，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:PakistanRawalpindiMap.png)。
- `cn-beijing-winters-olympics-bid-201507`：补入北京冬奥组委首钢园办公地点照片（2018年7月22日；为2015年7月31日申办成功后的筹办机构资料图，非投票现场）；作者 N509FZ，CC BY-SA 4.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Beijing_Organising_Committee_for_the_2022_Olympic_Games_(20180722152346).jpg)。
- `cn-rmb-sdr-basket-201511`：补入IMF文字标志资料图；用于人民币加入SDR货币篮子的机构背景，明确不是2015年11月30日执董会现场。Commons 文件页标注作者 IMF，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:IMF_Text_Logo.png)。
- `w-nixon-shock-197108`：补入尼克松1971年7月8日官方肖像，作为宣布经济措施的总统同期资料图，非8月15日电视讲话现场；来源美国国家档案馆/白宫摄影办公室，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Official_Portrait_of_President_Nixon,_1971.jpg)。
- `w-oil-crisis-197310`：补入1973年秋美国俄勒冈州汽油短缺资料照片，反映石油禁运后的供应冲击，非10月17日禁运宣布现场；作者 David Falconer / U.S. EPA，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:GASOLINE_SHORTAGE_HIT_THE_STATE_OF_OREGON_IN_THE_FALL_OF_1973_BY_MIDDAY_GASOLINE_WAS_BECOMING_UNAVAILABLE_ALONG..._-_NARA_-_555405.jpg)。
- `w-fall-saigon-197504`：补入1975年4月27日“常风行动”西贡及金边撤离资料照片，为陷落前撤离背景，非4月30日屋顶撤离经典照片；作者 U.S. National Archives，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:279_-_Operation_Frequent_Wind_(1975_evacuation_of_Phnom_Penh_and_Saigon)_-_April_27,_1975_-_DPLA_-_6e9b1a1ce59774edf95ac59242a75d6a.jpg)。
- `w-vietnam-invades-cambodia-197812`：补入越南入侵柬埔寨（1978年12月至1979年1月）战事示意图；地图为事后绘制，作者 BorysMapping，CC BY-SA 4.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Vietnamese_invasion_of_Cambodia.png)。
- `w-human-rights-covenants-196612`：补入《公民权利和政治权利国际公约》1966年12月16日联合国通过的官方文本资料；说明其与同日另一项公约的关系，作者 United Nations Human Rights Committee，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:International_Covenant_on_Civil_and_Political_Rights.pdf)。
- `cn-jiaolong-7062m-201206`：补入“蛟龙”号深潜器等比例模型资料图（2024年珠海太空中心），明确用于2012年7062米下潜纪录的装备背景，非当日下潜现场；作者 Shujianyang，CC0 1.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Jiaolong_submersible.jpg)。
- `w-moscow-theater-hostage-crisis-200210`：补入普京于2002年10月26日听取杜布罗夫卡剧院人质事件处置情况的官方资料照片；为事件结束日反应，非剧院突袭现场。作者俄罗斯总统新闻服务/Kremlin.ru，CC BY 3.0/4.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Putin%27s_reaction_on_Nord-Ost_(2002-10-26).jpg)。
- `w-saddam-executed-200612`：补入萨达姆2004年7月受审资料照片，用于2006年执行死刑的司法背景，明确非行刑现场；作者未详，美国国防部资料，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Saddam_Hussein_at_trial,_July_2004.JPEG)。
- `cn-chinese-dream-201211`：补入国家博物馆《复兴之路》展览资料图（2011年拍摄），明确用于2012年11月29日提出“中国梦”的展览背景，非当日参观现场；作者 Gary Lee Todd，CC0 1.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:003_Road_of_Rejuvenation.jpg)。
- `cn-shanghai-hongkong-stock-connect-201411`：补入上海证券大厦资料图（2008年），明确用于2014年沪港通开通的上交所机构背景，非开通仪式现场；作者 Baycrest，CC BY-SA 2.5。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Shanghai_Stock_Exchange_Building.jpg)。
- `cn-two-child-policy-enforced-201601`：补入江西德安县乡村独生子女政策宣传牌资料图（2006年），用于全面两孩政策生效前后的人口政策背景，非政策生效日现场；作者 Venus，CC BY 2.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:One_child_policy.jpg)。
- `cn-beijing-olympic-bid-success-200107`：补入北京2008年奥运会标志资料照片（2008年香港展出），明确用于2001年申办成功的后续标志背景，非7月13日莫斯科投票现场；作者 Xiaowei，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Beijing_2008_Olympic_Logo_on_Hong_Kong_Art_Museum_2.JPG)。
- `cn-world-cup-qualification-200110`：补入中国国家足球队赛前合影（2008年世界杯亚洲区预选赛，澳大利亚悉尼），明确用于2001年首次出线的球队背景，非沈阳对阿曼比赛现场；作者 Albatross2147，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:China_national_football_team_06-JUN-2008-ANZstad.jpg)。
- `cn-socialist-legal-system-201103`：补入吴邦国2011年4月在北京人民大会堂会见巴西总统的资料照片，明确用于法律体系形成的全国人大领导背景，非3月10日会议现场；作者 Roberto Stuckert Filho，CC BY-SA 2.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Wu_Bangguo_Beijing2011.jpg)。
- `cn-zhou-yongkang-investigation-201407`：补入周永康2006年在美国华盛顿的资料肖像，明确用于2014年立案审查的当事人背景，非宣布审查决定现场；作者 Barry Bahler / FEMA，Public domain。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:Zhou_Yongkang.jpg)。
- `cn-fifth-plenum-18th-two-child-201510`：复用独生子女政策宣传牌资料图（2006年），用于2015年五中全会决定全面两孩政策的政策转折背景，明确非全会现场；作者 Venus，CC BY 2.0。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:One_child_policy.jpg)。
- `cn-fourth-plenum-18th-201410`：补入全国人大常委会2014年11月1日《关于设立国家宪法日的决定》官方文本，作为四中全会依法治国议题的同期法律背景，明确非全会现场；作者全国人大常委会办公厅，Public domain（中国官方法律文件）。
- 图片来源：[Commons 文件页](https://commons.wikimedia.org/wiki/File:%E5%85%A8%E5%9B%BD%E4%BA%BA%E6%B0%91%E4%BB%A3%E8%A1%A8%E5%A4%A7%E4%BC%9A%E5%B8%B8%E5%8A%A1%E5%A7%94%E5%91%98%E4%BC%9A%E5%85%B3%E4%BA%8E%E8%AE%BE%E7%AB%8B%E5%9B%BD%E5%AE%B6%E5%AE%AA%E6%B3%95%E6%97%A5%E7%9A%84%E5%86%B3%E5%AE%9A.pdf)。
| cn-lien-chan-visit-200504 | `cn-lien-chan-visit-200504.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:2005KMT_NanjingTour_LienChan.jpg) | Universe729；Rico Shen | CC BY-SA 3.0（兼容 GFDL 1.2+） | 2026-08-13 | 南京行程照片，明确标注非4月29日北京会谈现场 |
| cn-victory-60th-200509 | `cn-victory-60th-200509.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:2005_Victory_Day_Parade_(1).jpg) | Eric Draper（美国白宫） | Public domain | 2026-08-13 | 5月9日莫斯科阅兵，明确标注非9月3日北京纪念大会现场 |
| cn-agricultural-tax-free-decided-200512 | `cn-agricultural-tax-free-decided-200512.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:全国人民代表大会常务委员会关于废止《中华人民共和国农业税条例》的决定.pdf) | 全国人民代表大会常务委员会 | Public domain（PD-PRC-exempt） | 2026-08-13 | 2005年12月29日废止农业税条例决定扫描 |
| cn-cpc-16th-6th-plenum-200610 | `cn-cpc-16th-6th-plenum-200610.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Bushhujintao.jpg) | Shealah Craighead（美国白宫） | Public domain | 2026-08-13 | 胡锦涛2006年4月白宫活动背景，明确标注非全会现场 |
| cn-cpc-16th-4th-plenum-200409 | `cn-cpc-16th-4th-plenum-200409.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Hu_Jintao_2004.jpg) | U. Dettmar / Agência Brasil | CC BY 3.0 BR | 2026-08-13 | 胡锦涛2004年11月巴西活动背景，明确标注非全会现场 |
| cn-gdp-99trillion-201912 | `cn-gdp-99trillion-201912.svg` | [Commons](https://commons.wikimedia.org/wiki/File:GDP_-_United_States,_China.svg) | Bajirao | CC BY-SA 4.0 | 2026-08-13 | 世界银行数据图表，呈现中国2019年经济体量背景 |
| cn-sixth-plenum-resolution-202111 | `cn-sixth-plenum-resolution-202111.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:北京京西賓館_2010.jpg) | Wpcpey | CC BY-SA 4.0 | 2026-08-13 | 京西宾馆外景，作为全会举办地点背景，明确标注非会议现场 |
| cn-micius-quantum-satellite-201608 | `cn-micius-quantum-satellite-201608.svg` | [Commons](https://commons.wikimedia.org/wiki/File:Qst_logo.svg) | 量子科学技术研究开发机构 | Public domain（PD-textlogo） | 2026-08-13 | 量子科技机构标志，明确标注非墨子号发射现场 |
| cn-zhurihe-parade-201707 | `cn-zhurihe-parade-201707.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Zhurihe_Ranch_at_Naadam_1.jpg) | Yoshi Canopus | CC BY-SA 4.0 | 2026-08-13 | 朱日和牧场环境背景，明确标注非2017年阅兵现场 |
| cn-meng-wanzhou-detention-201812 | `cn-meng-wanzhou-detention-201812.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:HuaweiConferenceBooth.jpg) | Raysonho | CC0 1.0 | 2026-08-13 | 华为企业背景资料，明确标注非拘押现场 |
| cn-targeted-poverty-alleviation-201311 | `cn-targeted-poverty-alleviation-201311.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Huanghe_Village,_Datuopu_Subdistrict_20230609.jpg) | Huangdan2060 | CC BY 4.0 | 2026-08-13 | 湖南乡村景观背景，明确标注非十八洞村考察现场 |
| cn-third-plenum-18th-201311 | `cn-third-plenum-18th-201311.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:北京京西賓館_2010.jpg) | Wpcpey | CC BY-SA 4.0 | 2026-08-13 | 京西宾馆外景，作为全会举办地点背景，明确标注非会议现场 |
| cn-tax-sharing-reform-199401 | `cn-tax-sharing-reform-199401.pdf` | [Commons](https://commons.wikimedia.org/wiki/File:State_Council_Gazette_-_1994_-_Issue_10.pdf) | 中华人民共和国国务院 | Public domain（PD-PRC-exempt） | 2026-08-13 | 1994年国务院公报扫描件，作为分税制实施年度法规背景 |
| cn-cpc-16th-3rd-plenum-200310 | `cn-cpc-16th-3rd-plenum-200310.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:北京京西賓館_2010.jpg) | Wpcpey | CC BY-SA 4.0 | 2026-08-13 | 京西宾馆外景，作为全会举办地点背景，明确标注非会议现场 |
| cn-china-world-cup-debut-200206 | `cn-china-world-cup-debut-200206.png` | [Commons](https://commons.wikimedia.org/wiki/File:Kit_body_chn02a2.png) | Hurfer | CC BY-SA 4.0 | 2026-08-13 | 2002年中国队球衣样式，明确标注非比赛现场 |
| cn-sino-portuguese-macau-declaration-198704 | `cn-sino-portuguese-macau-declaration-198704.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Macau,_1987_(6913029485).jpg) | Nathan Hughes Hamilton | CC BY 2.0 | 2026-08-13 | 1987年澳门内港资料图，明确标注非北京签署现场 |
| cn-thatcher-deng-hk-198209 | `cn-thatcher-deng-hk-198209.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Deng_Xiaoping.jpg) | 美国国家档案和记录管理局（原作者未详） | Public domain | 2026-08-13 | 邓小平1979年肖像背景，明确标注非1982年会谈现场 |
| cn-11th-6th-plenum-resolution-198106 | `cn-11th-6th-plenum-resolution-198106.pdf` | [Commons](https://commons.wikimedia.org/wiki/File:State_Council_Gazette_-_1981_-_Issue_25.pdf) | 中华人民共和国国务院 | Public domain（PD-PRC-exempt） | 2026-08-13 | 1981年国务院公报扫描件，作为决议发布年度官方文献背景 |
| cn-four-modernizations-196501 | `cn-four-modernizations-196501.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Zhou_Enlai_announced_the_success_of_China%27s_atomic_bomb_test.jpg) | Unknown author | Public domain（PD-China；Commons页面提示需另行核验美国版权状态） | 2026-08-13 | 1964年10月16日周恩来宣布首次原子弹试验成功，作为国防与科学技术现代化同期背景，明确非1965年1月4日人大会议现场 |
| cn-focac-1st-ministerial-200010 | `cn-focac-1st-ministerial-200010.svg` | [Commons](https://commons.wikimedia.org/wiki/File:Forum_on_China-Africa_Cooperation.svg) | 玖巧仔 | CC BY-SA 3.0 | 2026-08-13 | 2009年中非合作论坛成员关系图，作为2000年首届部长级会议开启合作机制的组织背景，明确非北京会议现场 |
| w-india-smiling-buddha-197405 | `w-india-smiling-buddha-197405.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:GandhiSBuddha458c20.jpg) | nuclearweaponarchive.org | CC BY-SA 4.0 | 2026-08-13 | 1974年5月18日英迪拉·甘地访问核试验场，与事件日期一致 |
| cn-three-major-remoulding-195601 | `cn-three-major-remoulding-195601.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Big_issue_for_600_million_people.jpg) | Unknown author | Public domain（PD-China；Commons页面提示需另行核验美国版权状态） | 2026-08-13 | 1956年9月中共八大开幕会照片，作为三大改造完成后的制度建设背景，明确非1月15日庆祝大会现场 |
| cn-first-five-year-plan-completed-195712 | `cn-first-five-year-plan-completed-195712.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:1957_Canton_Fair_Industry_showroom.jpg) | 新华社 | Public domain（PD-China；Commons页面提示需另行核验美国版权状态） | 2026-08-13 | 1957年广交会工业展厅，作为“一五计划”工业化成果背景，明确非12月31日总结现场 |
| cn-daqing-field-discovery-195909 | `cn-daqing-field-discovery-195909.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:First_train_of_oil_in_Daqing.jpg) | Unknown author | Public domain（PD-China；Commons页面提示需另行核验美国版权状态） | 2026-08-13 | 1960年6月1日大庆首列石油列车，作为1959年发现油田后的早期开发成果背景，明确非9月26日松基三井现场 |
| cn-df1-missile-196011 | `cn-df1-missile-196011.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Dongfeng_1_Missile.jpg) | Martin Trolle Mikkelsen | CC BY-SA 2.0 | 2026-08-13 | 东风一号实物展陈照片，作为1960年首次发射成功的型号背景，明确非试验基地发射现场 |
| cn-cuba-relations-196009 | `cn-cuba-relations-196009.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Fidel_Castro_-_UN_General_Assembly_1960.jpg) | Warren K. Leffler（美国国会图书馆/U.S. News & World Report collection） | Public domain（LOC：no known copyright restrictions） | 2026-08-13 | 卡斯特罗1960年9月22日联合国大会照片，作为中古建交同期外交背景，明确非9月28日建交公报现场 |
| cn-13th-congress-198710 | `cn-13th-congress-198710.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Great_Hall_of_the_People.JPG) | BrokenSphere | CC BY-SA 3.0（兼容2.5/2.0/1.0；GFDL） | 2026-08-13 | 人民大会堂外景，作为十三大举办地点背景，明确非1987年大会现场 |
| cn-14th-cpc-congress-199210 | `cn-14th-cpc-congress-199210.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Great_Hall_of_the_People.JPG) | BrokenSphere | CC BY-SA 3.0（兼容2.5/2.0/1.0；GFDL） | 2026-08-13 | 复用人民大会堂外景，作为十四大举办地点背景，明确非1992年大会现场 |
| cn-15th-cpc-congress-199709 | `cn-15th-cpc-congress-199709.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Great_Hall_of_the_People.JPG) | BrokenSphere | CC BY-SA 3.0（兼容2.5/2.0/1.0；GFDL） | 2026-08-13 | 复用人民大会堂外景，作为十五大举办地点背景，明确非1997年大会现场 |
| cn-19th-cpc-congress-201710 | `cn-19th-cpc-congress-201710.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:A_political_slogan_on_the_wall_in_Longhua_District,_Shenzhen,_Guangdong,_China,_picture1.jpg) | Huangdan2060 | CC0 1.0 | 2026-08-13 | 深圳龙华区2017年11月十九大精神宣传标语，作为大会确立指导思想后的社会传播背景，明确非10月18日开幕现场 |
| cn-reform-openning-30th-200812 | `cn-reform-openning-30th-200812.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Great_Hall_of_the_People.JPG) | BrokenSphere | CC BY-SA 3.0（兼容2.5/2.0/1.0；GFDL） | 2026-08-13 | 复用人民大会堂外景，作为改革开放30周年纪念大会举办地点背景，明确非2008年12月18日大会现场 |
| cn-eight-cardinal-couplets-201212 | `cn-eight-cardinal-couplets-201212.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Great_Hall_of_the_People.JPG) | BrokenSphere | CC BY-SA 3.0（兼容2.5/2.0/1.0；GFDL） | 2026-08-13 | 复用人民大会堂外景，作为中央政治局会议地点背景，明确非2012年12月4日会议现场 |
| cn-fourth-plenum-19th-201910 | `cn-fourth-plenum-19th-201910.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Great_Hall_of_the_People.JPG) | BrokenSphere | CC BY-SA 3.0（兼容2.5/2.0/1.0；GFDL） | 2026-08-13 | 复用人民大会堂外景，作为十九届四中全会举办地点背景，明确非2019年会议现场 |
| cn-fifth-plenum-202010 | `cn-fifth-plenum-202010.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Great_Hall_of_the_People.JPG) | BrokenSphere | CC BY-SA 3.0（兼容2.5/2.0/1.0；GFDL） | 2026-08-13 | 复用人民大会堂外景，作为十九届五中全会举办地点背景，明确非2020年会议现场 |
| cn-11th-five-year-plan-200603 | `cn-11th-five-year-plan-200603.pdf` | [Commons](https://commons.wikimedia.org/wiki/File:%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%85%A8%E5%9B%BD%E4%BA%BA%E6%B0%91%E4%BB%A3%E5%A4%A7%E4%BC%9A%E5%B8%B8%E5%8A%A1%E5%A7%94%E5%91%98%E4%BC%9A%E5%85%AC%E6%8A%A52006%E5%B9%B4%E7%AC%AC3%E5%8F%B7.pdf) | 中华人民共和国全国人民代表大会常务委员会 | Public domain（PD-PRC-exempt，官方法律公报） | 2026-08-13 | 2006年第3号人大常委会公报，收录“十一五”规划纲要决议与原文，明确非大会现场照片 |
| cn-cpc-7th-3rd-plenum-195006 | `cn-cpc-7th-3rd-plenum-195006.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Great_Hall_of_the_People.JPG) | BrokenSphere | CC BY-SA 3.0（兼容2.5/2.0/1.0；GFDL） | 2026-08-13 | 人民大会堂外景，会址背景，明确非1950年会议现场 |
| cn-cpc-8th-9th-plenum-196101 | `cn-cpc-8th-9th-plenum-196101.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Great_Hall_of_the_People.JPG) | BrokenSphere | CC BY-SA 3.0（兼容2.5/2.0/1.0；GFDL） | 2026-08-13 | 人民大会堂外景，会址背景，明确非1961年会议现场 |
| cn-cpc-investigation-year-196101 | `cn-cpc-investigation-year-196101.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Great_Hall_of_the_People.JPG) | BrokenSphere | CC BY-SA 3.0（兼容2.5/2.0/1.0；GFDL） | 2026-08-13 | 人民大会堂外景，会议地点背景，明确非1961年现场 |
| cn-cpc-8th-10th-plenum-196209 | `cn-cpc-8th-10th-plenum-196209.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Great_Hall_of_the_People.JPG) | BrokenSphere | CC BY-SA 3.0（兼容2.5/2.0/1.0；GFDL） | 2026-08-13 | 人民大会堂外景，会址背景，明确非1962年会议现场 |
| cn-front-ten-rules-196305 | `cn-front-ten-rules-196305.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Great_Hall_of_the_People.JPG) | BrokenSphere | CC BY-SA 3.0（兼容2.5/2.0/1.0；GFDL） | 2026-08-13 | 人民大会堂外景，中央会议地点背景，明确非1963年文件发布现场 |
| cn-12th-3rd-plenum-reform-198410 | `cn-12th-3rd-plenum-reform-198410.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Great_Hall_of_the_People.JPG) | BrokenSphere | CC BY-SA 3.0（兼容2.5/2.0/1.0；GFDL） | 2026-08-13 | 人民大会堂外景，会址背景，明确非1984年会议现场 |
| cn-11th-5th-plenum-liushaoqi-198002 | `cn-11th-5th-plenum-liushaoqi-198002.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Liu_shaoqi.jpg) | Unknown author | Public domain（PD-China；Commons页面提示需另行核验美国版权状态） | 2026-08-13 | 刘少奇1967年遭受公开批斗的历史照片，作为1980年平反决议的历史背景，明确非1980年全会现场 |
| cn-new-medical-reform-200904 | `cn-new-medical-reform-200904.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Hospital_in_Yulan_Road.JPG) | Emcc83 | CC BY-SA 3.0（兼容GFDL） | 2026-08-13 | 上海花木社区卫生服务中心外景（2009年12月），作为新医改推进基层医疗服务建设的同期背景，明确非4月6日政策发布现场 |
| cn-social-security-coverage-2009 | `cn-social-security-coverage-2009.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Dalian_Liaoning_China_An-elderly-Chinese-at-Xinghai-Bay-01.jpg) | CEphoto, Uwe Aranas | CC BY-SA 3.0（兼容GFDL） | 2026-08-13 | 大连老年人同期照片，作为新农保面向老年群体的社会背景，明确非9月4日方案发布现场 |
| cn-soviet-withdrawal-experts-196007 | `cn-soviet-withdrawal-experts-196007.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Nikita_Khrushchev_1960.jpg) | Warren K. Leffler（LOC/U.S. News & World Report） | Public domain（LOC：no known copyright restrictions） | 2026-08-13 | 赫鲁晓夫1960年9月联合国大会照片，作为苏联撤走在华专家的同期人物背景，明确非7月16日照会现场 |
| cn-eight-char-policy-196009 | `cn-eight-char-policy-196009.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:First_train_of_oil_in_Daqing.jpg) | Unknown author | Public domain（PD-China；Commons页面提示需另行核验美国版权状态） | 2026-08-13 | 1960年大庆首列石油列车，作为八字方针提出前后工业生产与经济调整背景，明确非9月30日报告现场 |
| cn-xinyang-incident-report-196101 | `cn-xinyang-incident-report-196101.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Xinyang_working_at_night.jpg) | Unknown author | Public domain（PD-China；Commons页面标注美国版权可能因URAA恢复） | 2026-08-13 | 1959年信阳地区人民公社夜间劳动照片，直接对应信阳事件的地区与大跃进背景，明确非1961年报告批转现场 |
| cn-26th-table-tennis-beijing-196104 | `cn-26th-table-tennis-beijing-196104.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Tafeltennis_Tiende_Internationale_Kampioenschappen_in_Apollo_Hal,_Bestanddeelnr_913-0226.jpg) | Nationaal Archief（作者未署名） | CC0 1.0 | 2026-08-13 | 1961年10月阿姆斯特丹国际乒乓球锦标赛照片，作为北京第26届世乒赛的同年项目背景，明确非北京比赛现场 |
| cn-scitech-plan-196312 | `cn-scitech-plan-196312.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Zhou_Enlai_announced_the_success_of_China%27s_atomic_bomb_test.jpg) | Unknown author | Public domain（PD-China；Commons页面提示需另行核验美国版权状态） | 2026-08-13 | 周恩来1964年宣布首次原子弹试验成功，作为1963—1972科学技术规划的同期自主科技攻关背景，明确非1963年批准现场 |
| cn-yinhe1-supercomputer-198311 | `cn-yinhe1-supercomputer-198311.png` | [Commons](https://commons.wikimedia.org/wiki/File:First_Russian-Chinese_translation_electronic_computer_in_China.png) | 华南理工大学 | Public domain（PD-China；Commons页面标注中国版权期满） | 2026-08-13 | 1959年中国第一台俄汉翻译电子计算机，作为银河-I之前的电子计算技术先导，明确非银河-I实物 |
| cn-sino-soviet-normalization-198905 | `cn-sino-soviet-normalization-198905.jpg` | [Commons](https://commons.wikimedia.org/wiki/File:Gorbi_1989.jpg) | Jüppsche | CC BY-SA 2.0 Germany | 2026-08-13 | 戈尔巴乔夫1989年6月公开活动照片，作为中苏关系正常化的人物背景，明确非5月北京会晤现场 |

## 配图重复与格式专项复审（2026-08-13）

- 范围：`data/events/xiandai.yaml`、`data/world/modern.yaml` 的全部配图引用；不改事件事实、日期、重要性、摘要和来源字段。
- 重复散列：共发现 8 组、涉及 29 条事件引用；每组保留与图片内容最直接对应的一条，移除其余 21 条复用引用及对应冗余文件。典型问题包括人民大会堂外景被跨年代会议事件批量套用、大庆石油列车被用于“八字方针”、京西宾馆外景及政策背景图跨事件复用。
- 非展示格式：移除 4 条 PDF 文献型配图引用（`cn-11th-6th-plenum-resolution-198106`、`cn-tax-sharing-reform-199401`、`cn-11th-five-year-plan-200603`、`cn-fourth-plenum-18th-201410`）；这些图注均已说明并非事件现场，不适合作为卡片图片。
- 低质量占位：移除 `cn-china-world-cup-debut-200206` 的 610 字节球衣样式小图引用；该图不是比赛现场，也不满足图片体积下限。
- SVG 兼容：将 17 条仍具事件专属性的 SVG 地图、图表、标志和棋谱无损栅格化为 PNG，并将数据引用改为 `.png`；原始 Commons 来源、作者与许可元数据保持不变。
- 复审结果：现有 501 条配图引用均为 JPG/PNG/WebP，文件全部存在且大于 1 KiB；SHA-256 全量扫描无重复组，配图专项 Vitest 通过。

## 1948 年事件配图审查（2026-08-13）

- 审查范围：1948 年中国事件 7 条、世界事件 10 条；其中四级 12 条、五级 5 条。
- 修改前：17 条事件均无配图。修改后：12 条事件有配图，全部五级事件已覆盖；事件数量、日期、摘要、分类和重要性均未修改。
- 检索与读取：逐一读取下列 Wikimedia Commons 文件页正文，核对画面内容、年代、作者和许可；页面均可访问。新华网图片仅用于此前事件事实核验，未下载到仓库。

| 事件 ID | Commons 文件页 | 作者/机构 | 许可 | 图注边界 |
|---|---|---|---|---|
| `cn-liaoshen-campaign-194809` | [Final Attack on Jinzhou.jpg](https://commons.wikimedia.org/wiki/File:Final_Attack_on_Jinzhou.jpg) | Unknown author | Public domain（PD-China） | 锦州攻坚战原始黑白照片 |
| `cn-huaihai-campaign-194811` | [PLAHuaihai.jpg](https://commons.wikimedia.org/wiki/File:PLAHuaihai.jpg) | Unknown author | Public domain（PD-China） | 淮海战役坦克配合步兵作战照片 |
| `cn-pingjin-campaign-194811` | [PLA Enters Peking.jpg](https://commons.wikimedia.org/wiki/File:PLA_Enters_Peking.jpg) | 原上传者 Aukingluntom；原作者未详 | Public domain（PD-China） | 1949年1月31日北平和平解放，明确非战役发起现场 |
| `cn-pboc-first-rmb-194812` | [RMB1-100-7A.jpg](https://commons.wikimedia.org/wiki/File:RMB1-100-7A.jpg) | 中国人民银行 | Public domain（PD-China） | 1949年第一套人民币票样，明确非1948年12月1日首发现场 |
| `cn-kiangya-disaster-194812` | [Sunk of SS Kiangya.jpg](https://commons.wikimedia.org/wiki/File:Sunk_of_SS_Kiangya.jpg) | 申报（上海） | Public domain（PD-China） | 1948年12月江亚轮沉没后的船体照片 |
| `w-gandhi-assassination-194801` | [Gandhi funeral.jpg](https://commons.wikimedia.org/wiki/File:Gandhi_funeral.jpg) | Unknown author | Public domain（PD-India） | 1948年1月甘地送葬队伍 |
| `w-israel-founded-war-194805` | [Declaration of State of Israel 1948.jpg](https://commons.wikimedia.org/wiki/File:Declaration_of_State_of_Israel_1948.jpg) | Rudi Weissenstein / Israel Government Press Office | Public domain（PD-Israel） | 1948年5月14日独立宣言现场 |
| `w-south-africa-national-party-194805` | [South African Election 1948.png](https://commons.wikimedia.org/wiki/File:South_African_Election_1948.png) | Icantfindanunusedusernamewhyme | CC BY-SA 3.0 | 2022年绘制的1948年大选结果图，非历史现场照片 |
| `w-manchester-baby-194806` | [SSEM Replica.jpg](https://commons.wikimedia.org/wiki/File:SSEM_Replica.jpg) | Ian Dunster、Racklever | Public domain | 博物馆复制品，明确非1948年原机现场照片 |
| `w-berlin-blockade-airlift-194806` | [C-54 landing at Tempelhof.jpg](https://commons.wikimedia.org/wiki/File:C-54_landing_at_Tempelhof.jpg) | Henry Ries / USAF | Public domain（美国空军公务作品） | 1948年柏林空运现场 |
| `w-korean-two-states-194808` | [Ceremony inaugurating the government of the Republic of Korea.JPG](https://commons.wikimedia.org/wiki/File:Ceremony_inaugurating_the_government_of_the_Republic_of_Korea.JPG) | Unknown author | Public domain（PD-South Korea / PD-1996） | 仅对应8月15日南部政权成立阶段，明确非北部成立现场 |
| `w-udhr-adopted-194812` | [Eleanor Roosevelt UDHR.jpg](https://commons.wikimedia.org/wiki/File:Eleanor_Roosevelt_UDHR.jpg) | FDR Presidential Library & Museum | CC BY 2.0 | 1949年展示宣言海报，明确非1948年联合国大会现场 |

- 暂无合格配图：`cn-may-day-slogans-194804`、`cn-litang-earthquake-194805`、`w-gatt-provisional-194801`、`w-marshall-plan-enacted-194804`、`w-who-founded-194804`。检索结果主要为版权不明的历史照片、PDF 文献或与事件日期关联较弱的机构背景图，故保持无图。
- 图片处理：统一保存到 `public/images/events/1948/`；仅使用 Commons 标准缩略图接口进行常规缩放，不使用生成式补绘、AI 上色或内容修改。
- 验证：`npm run validate` 通过；`npm test -- test/2020-2024-event-images.test.js test/1948-events.test.js` 通过（2 个测试文件、5 项测试）。
- 全量测试：`npm test` 已实际执行；1948 配图、全局配图审计及其余 134 项断言通过。另有 4 项 `test/xia-content.test.js` 失败，原因是夏朝的新增事件、人物、三项图片和帝王表标签尚未实现；这些文件不在本次 1948 配图修改范围内。

## 1945-1947 年五星事件配图审查（2026-08-13）

- 审查范围：`data/events/minguo.yaml` 与 `data/world/modern.yaml` 中 1945、1946、1947 年 `importance: 5` 事件；仅处理配图与配图元数据，不修改事件日期、标题、摘要、分类、重要性和来源字段。
- 修改前：1945-1947 年 22 条五星事件均无配图。修改后：20 条五星事件新增配图；2 条因未找到合格可复用图源保持无图。
- 图片处理：全部新增文件保存到 `public/images/events/1945/`、`public/images/events/1946/`、`public/images/events/1947/`；来源以 Wikimedia Commons 文件页为准，记录原始文件页、作者/机构和许可。对部分过大的 JPG 仅做常规尺寸压缩，不做生成式补绘、上色或内容修改。

| 事件 ID | Commons 文件页 | 作者/机构 | 许可 | 图注边界 |
|---|---|---|---|---|
| `victory-over-japan-1945` | [Surrender of Japan - USS Missouri (restored).jpg](https://commons.wikimedia.org/wiki/File:Surrender_of_Japan_-_USS_Missouri_(restored).jpg) | Army Signal Corps | Public domain | 1945年9月2日日本签署投降书现场，用于同日中国抗战胜利事件 |
| `cn-cpc-seventh-congress-194504` | [Kang Seng Mao Zedong in Yan'an.jpg](https://commons.wikimedia.org/wiki/File:Kang_Seng_Mao_Zedong_in_Yan%27an.jpg) | Unknown author | Public domain | 延安时期人物背景资料，明确非七大会场现场 |
| `cn-chongqing-negotiations-194508` | [Mao Zedong leaving Yan'an to Chongqing.jpg](https://commons.wikimedia.org/wiki/File:Mao_Zedong_leaving_Yan%27an_to_Chongqing.jpg) | Unknown author | Public domain | 毛泽东离开延安赴重庆谈判 |
| `cn-taiwan-retrocession-194510` | [Retrocession day 1945.jpg](https://commons.wikimedia.org/wiki/File:Retrocession_day_1945.jpg) | Unknown author | Public domain | 台湾省受降仪式现场 |
| `cn-full-civil-war-194606` | [Civil war 1946.jpg](https://commons.wikimedia.org/wiki/File:Civil_war_1946.jpg) | Unknown author | Public domain | 1946年内战相关影像，作为全面内战爆发阶段背景 |
| `cn-feb28-incident-194702` | [228 Incident h.jpg](https://commons.wikimedia.org/wiki/File:228_Incident_h.jpg) | Unknown author | Public domain | 二二八事件相关现场影像资料 |
| `cn-liu-deng-dabie-mountains-194706` | [全国大反攻形势略图03576.jpg](https://commons.wikimedia.org/wiki/File:%E5%85%A8%E5%9B%BD%E5%A4%A7%E5%8F%8D%E6%94%BB%E5%BD%A2%E5%8A%BF%E7%95%A5%E5%9B%BE03576.jpg) | Unknown author | Public domain | 全国大反攻形势图，明确非作战现场照片 |
| `w-un-1945` | [Aklilu Habte-Wold signing UN Charter.jpg](https://commons.wikimedia.org/wiki/File:Aklilu_Habte-Wold_signing_UN_Charter.jpg) | Unknown - UN seal insignia | Public domain | 联合国宪章签署背景，明确非10月24日生效现场 |
| `w-yalta-conference-194502` | [Yalta summit 1945 with Churchill, Roosevelt, Stalin.jpg](https://commons.wikimedia.org/wiki/File:Yalta_summit_1945_with_Churchill,_Roosevelt,_Stalin.jpg) | U.S. Army Signal Corps Collection, National Archives | Public domain | 雅尔塔会议三国领导人合影 |
| `w-germany-surrenders-194505` | [German Instrument of Surrender (May 8, 1945) - page 3.jpg](https://commons.wikimedia.org/wiki/File:German_Instrument_of_Surrender_(May_8,_1945)_-_page_3.jpg) | Joint Chiefs of Staff | Public domain | 德国无条件投降书签署页 |
| `w-atomic-bombings-194508` | [Atomic cloud over Hiroshima.jpg](https://commons.wikimedia.org/wiki/File:Atomic_cloud_over_Hiroshima.jpg) | George R. Caron | Public domain | 广岛原子弹爆炸后的蘑菇云 |
| `w-japan-surrenders-194509` | [Mamoru Shigemitsu signs the Instrument of Surrender](https://commons.wikimedia.org/wiki/File:Mamoru_Shigemitsu_signs_the_Instrument_of_Surrender,_officially_ending_the_Second_World_War.jpg) | LT. Stephen E. Korpanty; restored by Adam Cuerden | Public domain | 重光葵签署日本投降书现场 |
| `w-bretton-woods-institutions-194512` | [International Monetary Fund formed 1945](https://commons.wikimedia.org/wiki/File:International_Monetary_Fund_formed_1945_(15839176617).jpg) | Archives New Zealand | CC BY-SA 2.0 | IMF 成立相关档案影像，作为布雷顿森林机构背景 |
| `w-un-general-assembly-first-194601` | [UN-General assembly 1946-3c.jpg](https://commons.wikimedia.org/wiki/File:UN-General_assembly_1946-3c.jpg) | United Nations Postal Administration | Public domain | 联合国大会纪念邮票，明确非会议现场照片 |
| `w-iron-curtain-speech-194603` | [1946-03-05 Sinews of Peace Speech.png](https://commons.wikimedia.org/wiki/File:1946-03-05_Sinews_of_Peace_Speech.png) | Unknown author | Public domain | 铁幕演说相关资料图 |
| `w-nuremberg-verdicts-194610` | [Defendants in the dock at the Nuremberg Trials.jpg](https://commons.wikimedia.org/wiki/File:Defendants_in_the_dock_at_the_Nuremberg_Trials.jpg) | United States Army | Public domain | 纽伦堡审判被告席，作为判决阶段现场背景 |
| `w-truman-doctrine-194703` | [Truman Doctrine, 03-12-1947, Page 1](https://commons.wikimedia.org/wiki/File:Truman_Doctrine,_03-12-1947,_Page_1_(5476286491).jpg) | The U.S. National Archives | Public domain | 杜鲁门主义国会特别咨文第一页 |
| `w-marshall-plan-speech-194706` | [General George C. Marshall, official military photo, 1946](https://commons.wikimedia.org/wiki/File:General_George_C._Marshall,_official_military_photo,_1946_(cropped)(c).JPEG) | Unknown author | Public domain | 马歇尔人物背景，明确非哈佛演说现场 |
| `w-india-pakistan-independence-194708` | [Mountbatten swears in Jawaharlal Nehru](https://commons.wikimedia.org/wiki/File:Lord_Mountbatten_swears_in_Jawaharlal_Nehru_as_the_first_Prime_Minister_of_free_India_on_Aug_15,_1947.jpg) | Photo Division, Government of India | Public domain | 印度独立阶段现场，明确非巴基斯坦独立现场 |
| `w-un-palestine-partition-194711` | [UN Palestine Partition Versions 1947.jpg](https://commons.wikimedia.org/wiki/File:UN_Palestine_Partition_Versions_1947.jpg) | Zero0000; based on UN Resolution 181 material | Public domain | 巴勒斯坦分治方案地图版本示意 |

- 暂无合格配图：`cn-land-law-outline-194710`、`w-gatt-signed-194710`。检索结果主要为后年土地改革法资料、现代机构外景、PDF/法规文本或与签署现场关联较弱的背景图，为避免误导，保持无图并记录。
- 验证：`npm run validate` 通过；脚本检查 1945-1947 年所有已引用图片文件均存在且大于 1 KiB；`npx vitest run test/load.test.js test/validate.test.js test/1948-events.test.js` 通过（3 个测试文件、71 项测试）；`npx vitest run test/2020-2024-event-images.test.js --testTimeout=30000` 通过（1 个测试文件、1 项全局配图审计）。未加超时参数直接运行该全局配图审计时曾因默认 5 秒上限超时失败，未出现断言失败。

## 1945 年日本投降节点拆分补充（2026-08-13）

- 审查范围：`data/world/modern.yaml` 的 1945 年日本投降相关世界事件；按用户要求区分 8 月 15 日宣布投降与 9 月 2 日正式签署投降书。
- 修改记录：新增 `w-japan-announces-surrender-194508`，日期为 `1945-08-15`，记录昭和天皇通过“玉音放送”宣读《终战诏书》、日本宣布接受《波茨坦公告》并投降。原有 `w-japan-surrenders-194509` 保持为 `1945-09-02` 正式签署投降书事件，不合并。
- 来源核验：英文维基百科、中文维基百科与新华社资料均区分 1945 年 8 月 15 日宣布投降和 1945 年 9 月 2 日签署投降书两个节点。
- 配图：新增 [Imperial Rescript on the Termination of the War1.jpg](https://commons.wikimedia.org/wiki/File:Imperial_Rescript_on_the_Termination_of_the_War1.jpg)，作者未详，Commons 标注 Public domain。图注明确说明其为 1945 年 8 月 14 日《终战诏书》文件图，8 月 15 日通过广播播出，非广播现场照片。
- 验证：`npm run validate` 通过；脚本确认 `w-japan-announces-surrender-194508` 与 `w-japan-surrenders-194509` 均存在、日期分别为 `1945-08-15` 与 `1945-09-02`，且图片文件存在并大于 1 KiB；`npx vitest run test/load.test.js test/validate.test.js test/1948-events.test.js` 通过（3 个测试文件、71 项测试）；`npx vitest run test/2020-2024-event-images.test.js --testTimeout=30000` 通过（1 个测试文件、1 项全局配图审计）。

## 1944 年事件补全审查（2026-08-13）

- 审查范围：1944 年中国事件与世界事件；此前 `data/events/minguo.yaml`、`data/world/modern.yaml` 中均无 1944 年事件，且无 `src/pages/1944.astro` 与时间轴入口。
- 修改后统计：新增中国事件 6 条、世界事件 10 条；其中五星事件 4 条、四星事件 12 条；五星事件均已配图。
- 页面与路由：新增 `src/pages/1944.astro`，并在 `Timeline.astro` 与 `AxisCell.astro` 注册 1944 年入口。
- 已读取/核验来源：中英文维基百科 1944 年、1944 in China、Operation Ichi-Go、Dixie Mission、相关二战战役与国际会议条目；补查中国共产党新闻网、共产党员网、联合国、IMF、World Bank、ICAO 等机构资料。1978 年以前未找到可直接作为年度新闻清单的新华社 1944 年年度十大新闻正文，已用维基百科、党史资料和国际组织资料交叉核验。
- 新增中国事件：`cn-operation-ichigo-194404`、`cn-chinese-expeditionary-force-myitkyina-194405`、`cn-dixie-mission-yanan-194407`、`cn-democratic-coalition-government-194409`、`cn-cpc-sixth-seventh-plenum-194405`、`cn-chen-jiageng-yanan-194406`。
- 新增世界事件：`w-cassino-monastery-bombed-194402`、`w-normandy-landings-194406`、`w-operation-bagration-194406`、`w-bretton-woods-conference-194407`、`w-warsaw-uprising-194408`、`w-dumbarton-oaks-conference-194408`、`w-liberation-of-paris-194408`、`w-battle-leyte-gulf-194410`、`w-chicago-convention-194412`、`w-ardennes-offensive-194412`。

| 事件 ID | Commons 文件页 | 作者/机构 | 许可 | 图注边界 |
|---|---|---|---|---|
| `cn-operation-ichigo-194404` | [Japanese Ichigo Plan - April 1944.jpg](https://commons.wikimedia.org/wiki/File:Japanese_Ichigo_Plan_-_April_1944.jpg) | United States Military Academy, Department of History | Public domain | 一号作战计划示意图，非战场现场照片 |
| `w-normandy-landings-194406` | [Into the Jaws of Death 23-0455M edit.jpg](https://commons.wikimedia.org/wiki/File:Into_the_Jaws_of_Death_23-0455M_edit.jpg) | Robert F. Sargent / United States Coast Guard | Public domain | 1944年6月6日奥马哈海滩登陆现场 |
| `w-operation-bagration-194406` | [BagrationMap2.jpg](https://commons.wikimedia.org/wiki/File:BagrationMap2.jpg) | United States Military Academy, Department of History | Public domain | 巴格拉季昂行动部署和推进示意图，非战场照片 |
| `w-bretton-woods-conference-194407` | [Coe Bretton Woods 1944.jpg](https://commons.wikimedia.org/wiki/File:Coe_Bretton_Woods_1944.jpg) | International Monetary Fund | Public domain | 1944年7月布雷顿森林会议代表合影 |

- 未配图说明：其余 12 条四星事件不强制配图；未使用版权不明图片或与事件关联较弱的机构外景图。
- 验证：`npm run validate` 通过；脚本检查 1944 年全部五星事件均有图片且本地文件大于 1 KiB；`git diff --check` 通过；`npx vitest run test/load.test.js test/validate.test.js test/1948-events.test.js` 通过（3 个测试文件、71 项测试）；`npx vitest run test/2020-2024-event-images.test.js --testTimeout=30000` 通过（1 个测试文件、1 项全局配图审计）。

## 1943 年事件补全审查（2026-08-13）

- 审查范围：1943 年中国事件与世界事件；此前 `data/events/minguo.yaml`、`data/world/modern.yaml` 中均无 1943 年事件，且无 `src/pages/1943.astro` 与时间轴入口。
- 修改后统计：新增中国事件 4 条、世界事件 9 条；其中五星事件 5 条、四星事件 8 条；4 条五星事件新增配图，1 条五星事件因未找到合格可复用图源保持无图。
- 页面与路由：新增 `src/pages/1943.astro`，并在 `Timeline.astro` 与 `AxisCell.astro` 注册 1943 年入口。
- 已读取/核验来源：中英文维基百科 1943 年、1943 in China、治外法权废除、美国第十四航空队、常德会战、开罗会议、斯大林格勒战役、库尔斯克战役、德黑兰会议、莫斯科宣言等条目；补查中国共产党新闻网、新华网、联合国和相关国际组织资料。1978 年以前未找到可直接作为年度新闻清单的新华社 1943 年年度十大新闻正文，已用维基百科、党史资料和国际组织资料交叉核验。
- 新增中国事件：`cn-extraterritoriality-abolished-194301`、`cn-us-14th-air-force-194303`、`cn-changde-battle-194311`、`cn-cairo-conference-194311`。
- 新增世界事件：`w-casablanca-conference-194301`、`w-stalingrad-surrender-194302`、`w-warsaw-ghetto-uprising-194304`、`w-kursk-battle-194307`、`w-allied-invasion-sicily-194307`、`w-italy-armistice-194309`、`w-moscow-declarations-194310`、`w-tehran-conference-194311`、`w-cairo-declaration-194312`。

| 事件 ID | Commons 文件页 | 作者/机构 | 许可 | 图注边界 |
|---|---|---|---|---|
| `cn-cairo-conference-194311` | [Cairo conference.jpg](https://commons.wikimedia.org/wiki/File:Cairo_conference.jpg) | United States Government | Public domain | 开罗会议三国领导人合影 |
| `w-stalingrad-surrender-194302` | [Bundesarchiv Bild 183-J17815, Luftangriff](https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-J17815,_Russland,_Kampf_um_Stalingrad,_Luftangriff.jpg) | Bundesarchiv；摄影者未详 | CC BY-SA 3.0 de | 斯大林格勒战役空袭背景资料，非2月2日投降现场 |
| `w-kursk-battle-194307` | [Soviet troops and T-34 tanks counterattacking Kursk](https://commons.wikimedia.org/wiki/File:Soviet_troops_and_T-34_tanks_counterattacking_Kursk_Voronezh_Front_July_1943.jpg) | RIA Novosti archive | CC BY-SA 3.0 | 库尔斯克战役期间苏军反击照片 |
| `w-tehran-conference-194311` | [Tehran Conference, 1943.jpg](https://commons.wikimedia.org/wiki/File:Tehran_Conference,_1943.jpg) | United States Army | Public domain | 德黑兰会议三国领导人合影 |

- 暂无合格配图：`cn-extraterritoriality-abolished-194301`。检索结果主要为条约文本、PDF 或版权/来源不清的签署照片，未找到合格 JPG/PNG 历史现场图，故保持无图并记录。
- 验证：`npm run validate` 通过；脚本检查 1943 年已引用图片均存在且大于 1 KiB，唯一五星缺图为已记录的 `cn-extraterritoriality-abolished-194301`；`git diff --check` 通过；`npx vitest run test/load.test.js test/validate.test.js test/1948-events.test.js` 通过（3 个测试文件、71 项测试）；`npx vitest run test/2020-2024-event-images.test.js --testTimeout=30000` 通过（1 个测试文件、1 项全局配图审计）。

## 1942 年事件补全审查（2026-08-13）

- 审查范围：1942 年中国事件与世界事件；此前 `data/events/minguo.yaml`、`data/world/modern.yaml` 中均无 1942 年事件，且无 `src/pages/1942.astro` 与时间轴入口。
- 修改后统计：新增中国事件 4 条、世界事件 11 条；其中五星事件 6 条、四星事件 9 条；五星事件均已配图。
- 页面与路由：新增 `src/pages/1942.astro`，并在 `Timeline.astro` 与 `AxisCell.astro` 注册 1942 年入口。
- 已读取/核验来源：中英文维基百科 1942 年、1942 in China、延安整风、中国远征军、浙赣战役、左权、中途岛海战、珊瑚海海战、杜立特空袭、曼哈顿计划、Chicago Pile-1、第二次阿拉曼战役、火炬行动、天王星行动等条目；补查中国共产党新闻网、United Nations、Atomic Heritage Foundation、U.S. Department of Energy 等资料。1978 年以前未找到可直接作为年度新闻清单的新华社 1942 年年度十大新闻正文，已用维基百科、党史资料和国际组织资料交叉核验。
- 新增中国事件：`cn-yanan-rectification-194202`、`cn-chinese-expeditionary-force-burma-194203`、`cn-zhejiang-jiangxi-campaign-194205`、`cn-zuo-quan-killed-194205`。
- 新增世界事件：`w-declaration-united-nations-194201`、`w-singapore-falls-194202`、`w-bataan-death-march-194204`、`w-doolittle-raid-194204`、`w-coral-sea-battle-194205`、`w-battle-midway-194206`、`w-manhattan-project-194208`、`w-second-el-alamein-194210`、`w-operation-torch-194211`、`w-operation-uranus-194211`、`w-chicago-pile-1-194212`。

| 事件 ID | Commons 文件页 | 作者/机构 | 许可 | 图注边界 |
|---|---|---|---|---|
| `cn-yanan-rectification-194202` | [Yan'an Forum on Literature and Art 1942](https://commons.wikimedia.org/wiki/File:Chairman_Mao_Zedong_(1893-1976)_and_people_at_the_Yan%27an_Forum_on_Literature_and_Art_in_1942,_including_Chen_Xuezhao_5th_from_left_3rd_row.jpg) | 吴印咸 | Public domain | 1942年延安文艺座谈会合影，作为延安整风时期背景资料 |
| `w-declaration-united-nations-194201` | [Signing Declaration by United Nations.jpg](https://commons.wikimedia.org/wiki/File:Signing_Declaration_by_United_Nations.jpg) | Unknown photographer | Public domain | 1942年1月1日签署现场 |
| `w-battle-midway-194206` | [Battle of Midway Japanese air raid](https://commons.wikimedia.org/wiki/File:Battle_of_Midway_(Japanese_air_raid).jpg) | US Navy | Public domain | 1942年6月4日中途岛海战期间空袭现场 |
| `w-manhattan-project-194208` | [Manhattan Project US Map.png](https://commons.wikimedia.org/wiki/File:Manhattan_Project_US_Map.png) | Commons user contribution; author not machine-readable | Public domain | 曼哈顿计划设施地图，明确非1942年启动现场 |
| `w-second-el-alamein-194210` | [El Alamein 1942 - British tanks.jpg](https://commons.wikimedia.org/wiki/File:El_Alamein_1942_-_British_tanks.jpg) | Gladstone (Sgt), No. 1 Army Film and Photographic Unit; post-work W.wolny | Public domain | 1942年10月阿拉曼战役期间英军坦克照片 |
| `w-chicago-pile-1-194212` | [ChicagoPileTeam.png](https://commons.wikimedia.org/wiki/File:ChicagoPileTeam.png) | Los Alamos National Laboratory; author not machine-readable | Attribution | 1946年团队合影，作为1942年实验团队背景资料 |

- 未配图说明：其余 9 条四星事件不强制配图；未使用版权不明图片或与事件关联较弱的现代纪念设施图。
- 验证：`npm run validate` 通过；脚本检查 1942 年所有已引用图片文件均存在且为真实 JPG/PNG，文件均大于 1 KiB；`git diff --check` 通过；`npx vitest run test/load.test.js test/validate.test.js test/1948-events.test.js` 通过（3 个测试文件、71 项测试）；`npx vitest run test/2020-2024-event-images.test.js --testTimeout=30000` 通过（1 个测试文件、1 项全局配图审计）。

## 1941 年事件补全审查（2026-08-13）

- 审查范围：1941 年中国事件与世界事件；此前 `data/events/minguo.yaml`、`data/world/modern.yaml` 中均无 1941 年事件，且无 `src/pages/1941.astro` 与时间轴入口。
- 修改后统计：新增中国事件 3 条、世界事件 9 条；其中五星事件 5 条、四星事件 7 条；五星事件均已配图。
- 页面与路由：新增 `src/pages/1941.astro`，并在 `Timeline.astro` 与 `AxisCell.astro` 注册 1941 年入口。
- 已读取/核验来源：中英文维基百科 1941 年、皖南事变、重庆大隧道惨案、香港保卫战、租借法案、巴尔干战役、巴巴罗萨行动、大西洋宪章、列宁格勒围困、巴比亚尔大屠杀、莫斯科战役、珍珠港事件、德国对美宣战等条目；补查中国共产党新闻网、Library of Congress、FDR Library、U.S. National Archives 等资料。1978 年以前未找到可直接作为年度新闻清单的新华社 1941 年年度十大新闻正文，已用维基百科、党史资料和国际组织/档案机构资料交叉核验。
- 新增中国事件：`cn-new-fourth-army-incident-194101`、`cn-chongqing-tunnel-massacre-194106`、`cn-hong-kong-battle-194112`。
- 新增世界事件：`w-lend-lease-act-194103`、`w-germany-invades-balkans-194104`、`w-operation-barbarossa-194106`、`w-atlantic-charter-194108`、`w-leningrad-siege-begins-194109`、`w-babi-yar-massacre-194109`、`w-soviet-counteroffensive-moscow-194112`、`w-pearl-harbor-us-enters-war-194112`、`w-germany-italy-declare-war-us-194112`。

| 事件 ID | 图源页面 | 作者/机构 | 许可 | 图注边界 |
|---|---|---|---|---|
| `cn-new-fourth-army-incident-194101` | [Order of the Rebuilding New Fourth Army](https://commons.wikimedia.org/wiki/File:Order_of_the_Rebuilding_New_Fourth_Army.jpg) | Central Military Commission of the Chinese Communist Party | Public domain | 重建新四军军部命令，作为皖南事变后续处置资料 |
| `w-lend-lease-act-194103` | [President Franklin D. Roosevelt-1941.jpg](https://commons.wikimedia.org/wiki/File:President_Franklin_D._Roosevelt-1941.jpg) | Library of Congress / New York World-Telegram and the Sun staff photographer | Public domain | 罗斯福签署租借法案现场 |
| `w-operation-barbarossa-194106` | [Operation Barbarossa map](https://commons.wikimedia.org/wiki/File:Operation_Barbarossa_(26_August_-_5_December_1941).jpg) | The History Department of the United States Military Academy | Public domain | 战役推进示意图，非战场照片 |
| `w-atlantic-charter-194108` | [FDR Library Atlantic Charter](https://www.fdrlibrary.org/atlantic-charter) | Franklin D. Roosevelt Presidential Library and Museum | Public domain | 大西洋会议期间罗斯福与丘吉尔会晤照片 |
| `w-pearl-harbor-us-enters-war-194112` | [U.S. National Archives USS Arizona](https://www.archives.gov/research/still-pictures/highlights/uss-arizona-burning) | US National Archives | Public domain | 1941年12月7日珍珠港遭袭现场 |

- 未配图说明：其余 7 条四星事件不强制配图；未使用版权不明图片或与事件关联较弱的现代纪念设施图。
- 验证：`npm run validate` 通过；脚本检查 1941 年所有五星事件均有图片且已引用图片文件均为真实 JPG，文件均大于 1 KiB；`git diff --check` 通过；`npx vitest run test/load.test.js test/validate.test.js test/1948-events.test.js` 通过（3 个测试文件、71 项测试）；`npx vitest run test/2020-2024-event-images.test.js --testTimeout=30000` 通过（1 个测试文件、1 项全局配图审计）。

## 1940 年事件补全审查（2026-08-14）

- 审查范围：1940 年中国事件与世界事件；此前 `data/events/minguo.yaml`、`data/world/modern.yaml` 中均无 1940 年事件，且无 `src/pages/1940.astro` 与时间轴入口。
- 修改后统计：新增中国事件 3 条、世界事件 8 条；其中五星事件 5 条、四星事件 6 条；1 条五星事件已配图，4 条五星事件因当前 Wikimedia 下载限流暂未写入图片字段。
- 页面与路由：新增 `src/pages/1940.astro`，并在 `Timeline.astro` 与 `AxisCell.astro` 注册 1940 年入口。
- 已读取/核验来源：中英文维基百科 1940 年、汪精卫政权、百团大战、重庆大轰炸、冬季战争、法国战役、敦刻尔克大撤退、法国投降、不列颠空战、三国同盟条约、卡廷惨案、希意战争等条目；补查中国共产党新闻网、Wikimedia Commons、Imperial War Museums 等资料。1978 年以前未找到可直接作为年度新闻清单的新华社 1940 年年度十大新闻正文，已用维基百科、党史资料和专业机构资料交叉核验。
- 新增中国事件：`cn-wang-jingwei-regime-194003`、`cn-chongqing-bombing-194005`、`cn-hundred-regiments-offensive-194008`。
- 新增世界事件：`w-winter-war-peace-194003`、`w-katyn-massacre-194004`、`w-germany-invades-western-europe-194005`、`w-dunkirk-evacuation-194005`、`w-france-falls-194006`、`w-battle-of-britain-194007`、`w-tripartite-pact-194009`、`w-greek-italian-war-194010`。

| 事件 ID | 图源页面 | 作者/机构 | 许可 | 图注边界 |
|---|---|---|---|---|
| `cn-hundred-regiments-offensive-194008` | [Hundred Regiments Offensive 1940.jpg](https://commons.wikimedia.org/wiki/File:Hundred_Regiments_Offensive_1940.jpg) | Chinese Wikipedia uploader; original source credited to period Chinese press | Public domain | 1940年百团大战中八路军攻占娘子关的历史照片 |

- 暂无合格本地配图：`w-germany-invades-western-europe-194005`、`w-dunkirk-evacuation-194005`、`w-france-falls-194006`、`w-battle-of-britain-194007`。已核到 Commons/IWM 可复用候选（敦刻尔克撤离照片、不列颠空战照片等），但当前 Wikimedia 下载连续返回 429 限流，未落地真实图片文件；为避免引用不存在文件，本次保持无图并记录待后续补图。
- 未配图说明：其余 6 条四星事件不强制配图；未使用版权不明图片或与事件关联较弱的现代纪念设施图。
- 验证：`npm run validate` 通过；脚本检查 1940 年已引用图片文件为真实 JPG 且大于 1 KiB，4 条五星缺图与本节记录一致；`git diff --check` 通过；`npx vitest run test/load.test.js test/validate.test.js test/1948-events.test.js` 通过（3 个测试文件、71 项测试）；`npx vitest run test/2020-2024-event-images.test.js --testTimeout=30000` 通过（1 个测试文件、1 项全局配图审计）。

## 1939 年事件补全审查（2026-08-14）

- 审查范围：1939 年中国事件与世界事件；此前 `data/events/minguo.yaml` 中无 1939 年事件，`data/world/modern.yaml` 中仅有 `w-ww2-1939`，且无 `src/pages/1939.astro` 与时间轴入口。
- 修改后统计：新增中国事件 3 条；世界事件由 1 条扩充为 6 条，并将 `w-ww2-1939` 日期从年份精度修正为 `1939-09-01`、摘要补充英法对德宣战及全球秩序影响。共有五星事件 3 条、四星事件 6 条；3 条五星事件因当前 Wikimedia 下载限流暂未写入图片字段。
- 页面与路由：新增 `src/pages/1939.astro`，并在 `Timeline.astro` 与 `AxisCell.astro` 注册 1939 年入口。
- 已读取/核验来源：中英文维基百科 1939 年、南昌会战、第一次长沙会战、汪精卫政权、第二次世界大战、德国入侵波兰、西班牙内战、诺门罕战役、苏德互不侵犯条约、苏联入侵波兰、冬季战争等条目；补查 Wikimedia Commons 图片候选。1978 年以前未找到可直接作为年度新闻清单的新华社 1939 年年度十大新闻正文，已用维基百科和历史条目交叉核验。
- 新增中国事件：`cn-nanchang-campaign-193903`、`cn-battle-changsha-193909`、`cn-wang-jingwei-defects-193912`。
- 新增/修正世界事件：修正 `w-ww2-1939`；新增 `w-spanish-civil-war-ends-193904`、`w-khalkhin-gol-battle-193905`、`w-molotov-ribbentrop-pact-193908`、`w-soviet-invasion-poland-193909`、`w-winter-war-begins-193911`。
- 暂无合格本地配图：`cn-battle-changsha-193909`、`w-ww2-1939`、`w-molotov-ribbentrop-pact-193908`。已核到 Commons 可复用候选（第一次长沙会战日军照片、石勒苏益格-荷尔斯泰因号炮击西盘半岛等），但当前 Wikimedia 下载连续返回 429 限流，未落地真实图片文件；为避免引用不存在文件，本次保持无图并记录待后续补图。
- 未配图说明：其余 6 条四星事件不强制配图；未使用版权不明图片或与事件关联较弱的现代纪念设施图。
- 验证：`npm run validate` 通过；脚本检查 1939 年 3 条五星缺图与本节记录一致，且无图片字段引用不存在文件；`git diff --check` 通过；`npx vitest run test/load.test.js test/validate.test.js test/1948-events.test.js` 通过（3 个测试文件、71 项测试）；`npx vitest run test/2020-2024-event-images.test.js --testTimeout=30000` 通过（1 个测试文件、1 项全局配图审计）。

## 1938 年事件补全审查（2026-08-14）

- 审查范围：1938 年中国事件与世界事件；此前 `data/events/minguo.yaml`、`data/world/modern.yaml` 中均无 1938 年事件，且无 `src/pages/1938.astro` 与时间轴入口。
- 修改后统计：新增中国事件 4 条、世界事件 5 条；其中五星事件 4 条、四星事件 5 条；4 条五星事件因当前 Wikimedia 下载限流暂未写入图片字段。
- 页面与路由：新增 `src/pages/1938.astro`，并在 `Timeline.astro` 与 `AxisCell.astro` 注册 1938 年入口。
- 已读取/核验来源：中英文维基百科 1938 年、台儿庄战役、武汉会战、广州战役、德国吞并奥地利、慕尼黑协定、水晶之夜、埃布罗战役、第一次维也纳仲裁等条目；补查中国共产党新闻网、United States Holocaust Memorial Museum 和 Wikimedia Commons 图片候选。1978 年以前未找到可直接作为年度新闻清单的新华社 1938 年年度十大新闻正文，已用维基百科、党史资料和专业机构资料交叉核验。
- 新增中国事件：`cn-taierzhuang-battle-193803`、`cn-wuhan-battle-193806`、`cn-guangzhou-falls-193810`、`cn-wuhan-falls-193810`。
- 新增世界事件：`w-anschluss-193803`、`w-spanish-ebro-offensive-193807`、`w-munich-agreement-193809`、`w-first-vienna-award-193811`、`w-kristallnacht-193811`。
- 暂无合格本地配图：`cn-taierzhuang-battle-193803`、`cn-wuhan-battle-193806`、`w-munich-agreement-193809`、`w-kristallnacht-193811`。已核到 Commons/机构可复用候选，但当前 Wikimedia 下载连续返回 429 限流，未落地真实图片文件；为避免引用不存在文件，本次保持无图并记录待后续补图。
- 未配图说明：其余 5 条四星事件不强制配图；未使用版权不明图片或与事件关联较弱的现代纪念设施图。
- 验证：`npm run validate` 通过；脚本检查 1938 年 4 条五星缺图与本节记录一致，且无图片字段引用不存在文件；`git diff --check` 通过；`npx vitest run test/load.test.js test/validate.test.js test/1948-events.test.js` 通过（3 个测试文件、71 项测试）；`npx vitest run test/2020-2024-event-images.test.js --testTimeout=30000` 通过（1 个测试文件、1 项全局配图审计）。

## 1937 年事件补全审查（2026-08-14）

- 审查范围：1937 年中国事件与世界事件；此前中国侧仅有年份精度的 `lugou-bridge-incident-1937`，世界侧无 1937 年事件，且无 `src/pages/1937.astro` 与时间轴入口。
- 修改后统计：将 `lugou-bridge-incident-1937` 日期精确到 `1937-07-07` 并补充 tags/sources/summary；新增中国事件 3 条、世界事件 3 条；共有五星事件 4 条、四星事件 3 条；五星事件因当前 Wikimedia 下载限流与南京大屠杀图源敏感性暂未写入图片字段。
- 页面与路由：新增 `src/pages/1937.astro`，并在 `Timeline.astro` 与 `AxisCell.astro` 注册 1937 年入口。
- 已读取/核验来源：中英文维基百科 1937 年、卢沟桥事变、淞沪会战、南京大屠杀、国民政府迁都重庆、兴登堡号空难、日本全面侵华战争、罗斯福隔离演说等条目；补查中国共产党新闻网、南京大屠杀遇难同胞纪念馆等资料。1978 年以前未找到可直接作为年度新闻清单的新华社 1937 年年度十大新闻正文，已用维基百科、党史资料和纪念馆资料交叉核验。
- 新增/修正中国事件：修正 `lugou-bridge-incident-1937`；新增 `cn-shanghai-battle-193708`、`cn-capital-moves-chongqing-193711`、`cn-nanjing-falls-193712`。
- 新增世界事件：`w-hindenburg-disaster-193705`、`w-japan-invades-china-193707`、`w-quarantine-speech-193710`。
- 暂无合格本地配图：`lugou-bridge-incident-1937`、`cn-shanghai-battle-193708`、`cn-nanjing-falls-193712`、`w-japan-invades-china-193707`。当前 Wikimedia 下载持续限流；南京大屠杀相关照片另需严肃核验授权、图像边界和展示适宜性，本次不强行配图。
- 未配图说明：其余 3 条四星事件不强制配图；未使用版权不明图片或与事件关联较弱的现代纪念设施图。
- 验证：`npm run validate` 通过；脚本检查 1937 年 4 条五星缺图与本节记录一致，且无图片字段引用不存在文件；`git diff --check` 通过；`npx vitest run test/load.test.js test/validate.test.js test/1948-events.test.js` 通过（3 个测试文件、71 项测试）；`npx vitest run test/2020-2024-event-images.test.js --testTimeout=30000` 通过（1 个测试文件、1 项全局配图审计）。

## 1936 年事件补全审查（2026-08-14）

- 审查范围：1936 年中国事件与世界事件；此前中国侧仅有 `xian-incident-1936`，世界侧无 1936 年事件，且无 `src/pages/1936.astro` 与时间轴入口。
- 修改后统计：修正 `xian-incident-1936` 的日期引号、tags、summary 和 sources；新增中国事件 1 条、世界事件 5 条；共有五星事件 3 条、四星事件 4 条；3 条五星事件因当前 Wikimedia 下载限流暂未写入图片字段。
- 页面与路由：新增 `src/pages/1936.astro`，并在 `Timeline.astro` 与 `AxisCell.astro` 注册 1936 年入口。
- 已读取/核验来源：中英文维基百科 1936 年、西安事变、绥远抗战、莱茵兰再军事化、西班牙内战、柏林奥运会、罗马-柏林轴心、反共产国际协定等条目；补查中国共产党新闻网和 Wikimedia Commons 图片候选。1978 年以前未找到可直接作为年度新闻清单的新华社 1936 年年度十大新闻正文，已用维基百科和党史资料交叉核验。
- 新增/修正中国事件：修正 `xian-incident-1936`；新增 `cn-suiyuan-campaign-193611`。
- 新增世界事件：`w-rhineland-remilitarization-193603`、`w-spanish-civil-war-begins-193607`、`w-berlin-olympics-193608`、`w-rome-berlin-axis-193610`、`w-anti-comintern-pact-193611`。
- 暂无合格本地配图：`xian-incident-1936`、`w-rhineland-remilitarization-193603`、`w-spanish-civil-war-begins-193607`。当前 Wikimedia 下载持续限流，未落地真实图片文件；为避免引用不存在文件，本次保持无图并记录待后续补图。
- 未配图说明：其余 4 条四星事件不强制配图；未使用版权不明图片或与事件关联较弱的现代纪念设施图。
- 验证：`npm run validate` 通过；脚本检查 1936 年 3 条五星缺图与本节记录一致，且无图片字段引用不存在文件；`git diff --check` 通过；`npx vitest run test/load.test.js test/validate.test.js test/1948-events.test.js` 通过（3 个测试文件、71 项测试）；`npx vitest run test/2020-2024-event-images.test.js --testTimeout=30000` 通过（1 个测试文件、1 项全局配图审计）。

## 1935 年事件补全审查（2026-08-14）

- 审查范围：1935 年中国事件与世界事件；此前 `data/events/minguo.yaml`、`data/world/modern.yaml` 中均无 1935 年事件，且无 `src/pages/1935.astro` 与时间轴入口。
- 修改后统计：新增中国事件 3 条、世界事件 4 条；其中五星事件 5 条、四星事件 2 条；5 条五星事件因当前 Wikimedia 下载限流暂未写入图片字段。
- 页面与路由：新增 `src/pages/1935.astro`，并在 `Timeline.astro` 与 `AxisCell.astro` 注册 1935 年入口。
- 已读取/核验来源：中英文维基百科 1935 年、遵义会议、长征、瓦窑堡会议、萨尔公投、德国重整军备、纽伦堡法案、第二次意大利-埃塞俄比亚战争等条目；补查中国共产党新闻网、United States Holocaust Memorial Museum 和 Wikimedia Commons 图片候选。1978 年以前未找到可直接作为年度新闻清单的新华社 1935 年年度十大新闻正文，已用维基百科、党史资料和专业机构资料交叉核验。
- 新增中国事件：`cn-zunyi-conference-193501`、`cn-long-march-arrives-shaanbei-193510`、`cn-wayao-bao-conference-193512`。
- 新增世界事件：`w-saar-plebiscite-193501`、`w-germany-rearmament-193503`、`w-nuremberg-laws-193509`、`w-italy-invades-ethiopia-193510`。
- 暂无合格本地配图：`cn-zunyi-conference-193501`、`cn-long-march-arrives-shaanbei-193510`、`w-germany-rearmament-193503`、`w-nuremberg-laws-193509`、`w-italy-invades-ethiopia-193510`。当前 Wikimedia 下载持续限流，未落地真实图片文件；为避免引用不存在文件，本次保持无图并记录待后续补图。
- 未配图说明：其余 2 条四星事件不强制配图；未使用版权不明图片或与事件关联较弱的现代纪念设施图。
- 验证：`npm run validate` 通过；脚本检查 1935 年 5 条五星缺图与本节记录一致，且无图片字段引用不存在文件；`git diff --check` 通过；`npx vitest run test/load.test.js test/validate.test.js test/1948-events.test.js` 通过（3 个测试文件、71 项测试）；`npx vitest run test/2020-2024-event-images.test.js --testTimeout=30000` 通过（1 个测试文件、1 项全局配图审计）。

## 1934 年事件补全审查（2026-08-14）

- 审查范围：1934 年中国事件与世界事件；此前 `data/events/minguo.yaml`、`data/world/modern.yaml` 中均无 1934 年事件，且无 `src/pages/1934.astro` 与时间轴入口。
- 修改后统计：新增中国事件 3 条、世界事件 3 条；其中五星事件 3 条、四星事件 3 条；3 条五星事件因当前 Wikimedia 下载限流暂未写入图片字段。
- 页面与路由：新增 `src/pages/1934.astro`，并在 `Timeline.astro` 与 `AxisCell.astro` 注册 1934 年入口。
- 已读取/核验来源：中英文维基百科 1934 年、第五次反围剿、长征、湘江战役、长刀之夜、希特勒兼任德国元首、苏联加入国际联盟等条目；补查中国共产党新闻网和 Wikimedia Commons 图片候选。1978 年以前未找到可直接作为年度新闻清单的新华社 1934 年年度十大新闻正文，已用维基百科和党史资料交叉核验。
- 新增中国事件：`cn-fifth-encirclement-campaign-193404`、`cn-long-march-begins-193410`、`cn-xiang-river-battle-193411`。
- 新增世界事件：`w-night-long-knives-193406`、`w-hitler-fuhrer-193408`、`w-ussr-joins-league-193409`。
- 暂无合格本地配图：`cn-long-march-begins-193410`、`w-night-long-knives-193406`、`w-hitler-fuhrer-193408`。当前 Wikimedia 下载持续限流，未落地真实图片文件；为避免引用不存在文件，本次保持无图并记录待后续补图。
- 未配图说明：其余 3 条四星事件不强制配图；未使用版权不明图片或与事件关联较弱的现代纪念设施图。
- 验证：`npm run validate` 通过；脚本检查 1934 年 3 条五星缺图与本节记录一致，且无图片字段引用不存在文件；`git diff --check` 通过；`npx vitest run test/load.test.js test/validate.test.js test/1948-events.test.js` 通过（3 个测试文件、71 项测试）；`npx vitest run test/2020-2024-event-images.test.js --testTimeout=30000` 通过（1 个测试文件、1 项全局配图审计）。

## 1947 年事件补全审查（2026-08-13）

- 审查范围：1947 年中国事件 5 条、世界事件 6 条；其中五级 7 条、四级 4 条。
- 数据文件：中国事件写入 `data/events/minguo.yaml`，世界事件写入 `data/world/modern.yaml`。
- 页面与路由：新增 `src/pages/1947.astro`，并在 `Timeline.astro` 与 `AxisCell.astro` 注册 1947 年入口。
- 已读取来源正文：
  - 英文维基百科 February 28 incident：https://en.wikipedia.org/wiki/February_28_incident
  - 中央统战部内蒙古自治政府资料：https://www.zytzb.gov.cn/zytzb/2025-05/06/article_2025050615451627533.shtml
  - 人民网内蒙古自治区资料：https://politics.people.com.cn/n1/2019/1021/c429373-31410351.html
  - 中国民族宗教网内蒙古资料：https://www.neac.gov.cn/seac/c100516/201410/1087024.shtml
  - 共产党员网刘邓大军资料：https://www.12371.cn/2021/04/20/VIDE1618919400489791.shtml
  - 共产党员网《中国土地法大纲》资料：https://www.12371.cn/2021/07/15/ARTI1626336809838957.shtml
  - 共产党员网佳县公布土地法大纲资料：https://www.12371.cn/2025/01/21/ARTI1737418005762668.shtml
  - IMF 概览资料：https://www.elibrary.imf.org/display/book/9781589066250/C1.xml
  - World Bank 首笔贷款资料：https://www.worldbank.org/en/archive/history/exhibits/Digitized-Records-World-Bank-First-Loan
  - 美国国家档案馆杜鲁门主义资料：https://www.archives.gov/milestone-documents/truman-doctrine
  - 美国国务院历史办公室杜鲁门主义资料：https://history.state.gov/milestones/1945-1952/truman-doctrine
  - Truman Library 杜鲁门主义资料：https://www.trumanlibrary.gov/library/online-collections/truman-doctrine
  - OECD 马歇尔计划演说资料：https://www.oecd.org/en/about/history/the-marshall-plan-speech-at-harvard-university-5-june-1947.html
  - Marshall Foundation 马歇尔计划演说资料：https://www.marshallfoundation.org/the-marshall-plan/speech/
  - Truman Library 马歇尔演说资料：https://www.trumanlibrary.gov/soundrecording-records/sr2000-4-george-c-marshall-speech-harvard-marshall-plan
  - 英国议会印度独立法资料：https://www.parliament.uk/about/living-heritage/evolutionofparliament/legislativescrutiny/parliament-and-empire/collections1/collections2/1947-indian-independence-act/
  - WTO GATT 1947 正文：https://www.wto.org/english/docs_e/legal_e/gatt47_e.htm
  - WTO GATT 签署资料：https://www.wto.org/english/thewto_e/minist_e/min96_e/chrono.htm
  - 联合国数字图书馆 181 号决议资料：https://digitallibrary.un.org/record/210008?ln=en
  - 英文维基百科巴勒斯坦分治计划资料：https://en.wikipedia.org/wiki/United_Nations_Partition_Plan_for_Palestine
- 修改记录：
  - 新增 5 条 1947 年中国事件：二二八事件、内蒙古自治政府成立、刘邓大军跃进大别山、《中国土地法大纲》公布、行宪国民大会代表选举。
  - 新增 6 条 1947 年世界事件：IMF 开始金融运作与世界银行首笔贷款、杜鲁门主义、马歇尔计划演说、印巴分治独立、GATT 签署、联合国巴勒斯坦分治决议。
  - 核验时修正候选：世界银行并非 1947 年才开始运作，官方资料显示 1947 年对应向法国发放首笔贷款，因此事件 ID 和标题采用 `w-imf-world-bank-first-loan-194703`。
- 配图说明：本试点不新增图片；后续若为五级事件补图，需另行核验 Commons 文件页、作者和许可。
- 未解决问题：未找到 1947 年新华社年度十大新闻正文；1978 年以前数字化资料不足，已用党史、政府机构、国际组织和维基百科资料补查并记录。
- 验证：
  - `npm run validate`：通过，校验 808 条事件、47 个朝代、65 位君主、683 条世界事件；保留既有 12 条君主缺口提示。
  - `npm test -- test/load.test.js`：通过，1 个测试文件、31 项测试。
