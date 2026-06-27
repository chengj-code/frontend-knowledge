# Tasks

- [x] Task 1: 创建题库解析脚本
  - [ ] 1.1 创建 `scripts/parse-questions.mjs` 脚本，解析所有 `interviews.md` 文件，提取题目元数据（id、category、questionIndex、question、difficulty、type）和参考答案关键要点
  - [ ] 1.2 生成按主题分组的 JSON 文件到 `quiz/public/data/` 目录（如 `html-css.json`、`javascript.json` 等 13 个文件）
  - [ ] 1.3 在 `package.json` 中添加 `parse-questions` 脚本命令，并在 `build` 前自动执行

- [x] Task 2: 初始化答题系统 Vue 3 项目
  - [ ] 2.1 在 `quiz/` 目录下创建 Vue 3 + Vite 项目，配置 Vite 输出到 `docs/.vitepress/dist/quiz/`
  - [ ] 2.2 配置 `quiz/vite.config.ts`：设置 base 路径（开发时 `/quiz/`，生产时根据 GITHUB_REPOSITORY 环境变量动态计算）
  - [ ] 2.3 配置开发代理，使 VitePress 和答题系统可同时开发
  - [ ] 2.4 安装必要依赖（Vue Router、无额外 UI 库，纯手写 Trae 风格组件）

- [x] Task 3: 实现 Trae 风格设计系统基础
  - [ ] 3.1 创建 `quiz/src/styles/` 目录，定义 Trae 色彩变量（Intelligent Green #00D47E 为主色）、暗色/亮色主题 CSS 变量、圆角/间距/字体规范
  - [ ] 3.2 创建全局样式文件（reset、typography、通用类），实现明暗主题切换
  - [ ] 3.3 实现基础 UI 组件：Button、Card、Tag（难度标签）、ProgressBar、ThemeToggle

- [x] Task 4: 实现答题首页 — 主题选择与配置
  - [ ] 4.1 创建 `HomePage.vue`，展示 13 个主题卡片，每张卡片显示中文名、题目数量、选中状态
  - [ ] 4.2 实现多选主题功能，选中主题卡片使用 Intelligent Green 高亮
  - [ ] 4.3 实现题目数量选择器（5/10/15/20/30）
  - [ ] 4.4 实现难度筛选器（全部/基础★/进阶★★/专家★★★）
  - [ ] 4.5 实现"开始答题"按钮，从选中主题和配置中随机抽题，跳转答题页面

- [x] Task 5: 实现答题页面
  - [ ] 5.1 创建 `QuizPage.vue`，顶部显示进度条、题号导航栏、计时器
  - [ ] 5.2 实现单题展示区域：题号、难度标签、题型标签、题目文本
  - [ ] 5.3 实现"看过答案"/"没看答案"状态切换按钮
  - [ ] 5.4 实现参考答案折叠面板（默认收起，点击展开显示 keyPoints）
  - [ ] 5.5 实现上一题/下一题导航和题号快速跳转
  - [ ] 5.6 实现"交卷"按钮，跳转结果页

- [x] Task 6: 实现答题结果页面
  - [ ] 6.1 创建 `ResultPage.vue`，展示答题统计卡片（总题数、已答/未答、按难度统计）
  - [ ] 6.2 实现题目列表回顾，每题显示作答状态和难度
  - [ ] 6.3 实现按主题的完成率统计
  - [ ] 6.4 实现学习建议（基于看过答案的比例给出薄弱方向提示）
  - [ ] 6.5 实现"重新答题"和"查看错题"功能按钮

- [x] Task 7: 集成到 VitePress 站点
  - [ ] 7.1 修改 `docs/.vitepress/config.ts`，在导航栏添加"答题系统"链接
  - [ ] 7.2 修改 `docs/index.md`，在 hero actions 中添加"开始答题"按钮
  - [ ] 7.3 修改 `package.json` 的 build 脚本，先运行题库解析和答题系统构建，再运行 VitePress 构建
  - [ ] 7.4 更新 `.gitignore`，忽略 `quiz/dist/`、`quiz/node_modules/`、`quiz/public/data/`（生成的题库 JSON）

- [x] Task 8: 构建验证与部署测试
  - [ ] 8.1 本地运行完整构建流程（题库解析 → 答题系统构建 → VitePress 构建），验证产物正确性
  - [ ] 8.2 本地预览验证答题系统功能和 VitePress 站点跳转
  - [ ] 8.3 验证 GitHub Actions 构建部署流程正常

- [ ] Task 9: 修复 Trae 设计风格问题
  - [ ] 9.1 将 `--color-primary` 改为 Intelligent Green `#00D47E`（当前为 `#4f46e5` 靛蓝色），同步修改暗色主题的 `--color-primary` 为对应的 Intelligent Green 色值
  - [ ] 9.2 在 `quiz/src/styles/variables.css` 中补充缺失的 CSS 变量定义：`--font-family`、`--font-size-base`、`--line-height`（当前 `global.css` 引用了这些变量但未定义）

# Task Dependencies
- Task 1 → Task 2（题库数据是答题系统的基础）
- Task 2 → Task 3（项目结构是样式开发的前提）
- Task 3 → Task 4, 5, 6（设计系统是页面开发的前提）
- Task 4, 5, 6 → Task 7（页面开发完成后集成到 VitePress）
- Task 7 → Task 8（集成完成后验证构建部署）
- Task 8 → Task 9（验证阶段发现的设计风格问题需要修复）
