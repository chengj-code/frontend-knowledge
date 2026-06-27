# 前端答题系统 Spec

## Why
当前前端知识库已部署为静态站点，拥有 600+ 道面试题，但缺少交互式学习检测能力。用户需要一套答题系统来检验学习成果，从已有题库中按主题和数量抽题组卷，支持在线答题和结果评估。

## What Changes
- 新增独立的前端答题系统 SPA 应用（采用 Trae 设计风格），部署在 `/quiz` 路径下
- 从现有 13 个主题的面试题 Markdown 文档中解析题目，生成 JSON 题库数据
- 实现主题选择、数量配置、在线答题、结果统计的完整答题流程
- 在 VitePress 静态站点的导航栏和首页添加答题系统入口

## Impact
- Affected code:
  - `docs/.vitepress/config.ts` — 添加导航入口
  - `docs/index.md` — 首页添加答题入口按钮
  - 新增 `quiz/` 目录 — 独立答题系统应用
  - 新增 `scripts/` 目录 — 题库解析脚本
- 题库数据来源：`docs/*/interviews.md` 和 `docs/source-code/*/interviews.md`（共 13 个文件，~600 道题）

## ADDED Requirements

### Requirement: 题库数据生成
系统 SHALL 提供脚本从面试题 Markdown 文档中解析题目，生成结构化 JSON 题库数据。

#### Scenario: 解析面试题文档生成题库
- **WHEN** 运行题库解析脚本
- **THEN** 从 13 个 `interviews.md` 文件中提取所有题目，生成包含以下字段的 JSON 数据：
  - `id`: 题目唯一标识
  - `category`: 主题分类（如 `html-css`、`javascript`、`vue`、`source-code/vue3` 等）
  - `categoryLabel`: 主题中文名（如 `HTML-CSS`、`JavaScript`、`Vue3 源码` 等）
  - `questionIndex`: 题号（如 Q01、Q02）
  - `question`: 题目文本
  - `difficulty`: 难度等级（1/2/3，对应 ★☆☆ / ★★☆ / ★★★）
  - `type`: 题型（简答题/代码分析题/编程实践题/选择题）
  - `keyPoints`: 参考答案要点（从 `### 参考答案要点` 后的内容提取，截取前 3 个要点作为关键点）

#### Scenario: 题库数据按主题分组
- **WHEN** 题库 JSON 生成完成
- **THEN** 每个主题的题目独立存储在一个 JSON 文件中，文件名与分类目录名对应（如 `html-css.json`、`javascript.json`、`source-code-vue3.json`）

### Requirement: 答题系统应用
系统 SHALL 提供一个独立的前端答题系统 SPA，采用 Trae 设计风格。

#### Scenario: 选择主题和题目数量
- **WHEN** 用户进入答题系统首页
- **THEN** 展示所有可选主题列表（13 个主题），每个主题显示中文名、题目数量
- **AND** 用户可以选择一个或多个主题
- **AND** 用户可以设置题目数量（默认 10 题，可选 5/10/15/20/30）
- **AND** 用户可以选择难度筛选（全部/基础★/进阶★★/专家★★★）
- **AND** 点击"开始答题"生成随机题目

#### Scenario: 在线答题
- **WHEN** 用户开始答题
- **THEN** 系统逐题展示，每题显示：题号、难度标签、题型标签、题目内容
- **AND** 用户可以选择"看过答案"或"没看答案"标记自己的作答状态
- **AND** 用户可以展开查看参考答案要点
- **AND** 用户可以点击"上一题"/"下一题"切换题目
- **AND** 用户可以点击题号导航栏快速跳转到指定题目
- **AND** 用户可以随时点击"交卷"结束答题

#### Scenario: 答题结果统计
- **WHEN** 用户交卷
- **THEN** 展示答题结果页面，包含：
  - 总题数、已答/未答统计
  - 每道题的作答状态（看过答案/没看答案）
  - 按难度统计的完成率
  - 按主题统计的完成率
  - 学习建议（基于答题情况给出薄弱方向）
- **AND** 用户可以点击"重新答题"返回首页
- **AND** 用户可以点击"查看错题"重新浏览标记为看过答案的题目

### Requirement: Trae 设计风格
答题系统 SHALL 采用 Trae 的视觉设计语言。

#### Scenario: 视觉风格实现
- **WHEN** 用户打开答题系统
- **THEN** 界面采用以下 Trae 设计元素：
  - **主色调**：Intelligent Green（#00D47E），用于主要按钮、选中状态、进度指示
  - **暗色主题**：背景 #0D0D0D / #1A1A1A / #242424 层级，文字 #E5E5E5 / #999999
  - **亮色主题**：背景 #FFFFFF / #F5F5F5 / #EBEBEB 层级，文字 #1A1A1A / #666666
  - **圆角**：8px（卡片）、6px（按钮）、4px（标签）
  - **字体**：系统字体栈，-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
  - **间距**：8px 基准网格（8/16/24/32/48）
  - **风格**：简洁、专业、高信息密度、克制的动画过渡
  - **明暗切换**：支持跟随系统或手动切换

### Requirement: 静态站点导航入口
VitePress 静态站点 SHALL 在导航栏和首页提供答题系统入口。

#### Scenario: 导航栏入口
- **WHEN** 用户浏览 VitePress 站点
- **THEN** 导航栏显示"答题系统"链接，点击跳转到答题系统页面

#### Scenario: 首页入口
- **WHEN** 用户访问站点首页
- **THEN** hero 区域的 actions 中显示"开始答题"按钮，点击跳转到答题系统页面

### Requirement: 构建与部署集成
答题系统 SHALL 与现有 VitePress 站点统一构建部署。

#### Scenario: 开发模式
- **WHEN** 运行 `npm run dev`
- **THEN** VitePress 开发服务器和答题系统开发服务器同时可用
- **AND** 答题系统可通过 `/quiz/` 路径访问

#### Scenario: 生产构建
- **WHEN** 运行 `npm run build`
- **THEN** VitePress 站点和答题系统统一构建到 `docs/.vitepress/dist/` 目录
- **AND** 答题系统产物位于 `docs/.vitepress/dist/quiz/` 下
- **AND** GitHub Actions 部署后答题系统可通过 `/quiz/` 路径访问

#### Scenario: 题库数据更新
- **WHEN** 面试题文档内容变更后重新构建
- **THEN** 题库数据自动重新生成，答题系统使用最新题库
