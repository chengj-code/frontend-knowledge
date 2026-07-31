# AGENTS.md

> 本文件为 AI 编码助手（如 Trae、Cursor、Copilot 等）提供项目上下文和开发规范指引。

## 项目概述

**前端知识库**（frontend-knowledge）是一个体系化的前端知识文档站点，涵盖前端各大核心模块的基础知识、面试题库、源码分析和 VueUse 学习文档，并附带一个在线答题系统。

- **仓库地址**：https://github.com/chengj-code/frontend-knowledge
- **线上站点**：https://chengj-code.github.io/frontend-knowledge/
- **协议**：MIT

## 技术栈

| 模块 | 技术 | 版本 |
|------|------|------|
| 文档站点 | VitePress | ^1.5.0 |
| 答题系统 | Vue 3 + Vite + TypeScript | Vue ^3.5 / Vite ^6.0 |
| 答题路由 | Vue Router | ^4.4.0 |
| Markdown 渲染增强 | Mermaid | ^10.9.0 |
| 包管理器 | pnpm | 10.0.0 |
| 部署 | GitHub Actions → GitHub Pages | — |

## 项目结构

```
frontend-knowledge/
├── docs/                        # VitePress 文档根目录
│   ├── .vitepress/
│   │   └── config.ts            # VitePress 配置（导航、侧边栏、主题等）
│   ├── public/                  # 静态资源
│   │   ├── favicon.svg
│   │   └── .nojekyll            # 禁用 GitHub Pages Jekyll 处理
│   ├── index.md                 # 首页
│   ├── html-css/                # HTML-CSS 模块
│   ├── javascript/              # JavaScript 模块
│   ├── typescript/              # TypeScript 模块
│   ├── vue/                     # Vue 模块
│   ├── react/                   # React 模块
│   ├── nodejs/                  # Node.js 模块
│   ├── engineering/             # 工程化模块
│   ├── performance/             # 性能优化模块
│   ├── browser/                 # 浏览器模块
│   ├── network/                 # 网络模块
│   ├── ai/                      # 前端 AI 模块
│   ├── source-code/             # 源码分析模块
│   │   ├── vue2/
│   │   ├── vue3/
│   │   └── react/
│   └── vueuse/                  # VueUse 学习文档
│       ├── README.md            # 总览
│       ├── STANDARDS.md         # 编写规范
│       ├── PROGRESS.md          # 学习进度
│       └── stage-1/ ~ stage-7/  # 七个阶段文档
├── quiz/                        # 答题系统（独立 Vue 3 应用）
│   ├── src/
│   │   ├── components/          # UI 组件（TButton、TCard 等）
│   │   ├── composables/         # 组合式函数（useTheme）
│   │   ├── router/              # 路由配置
│   │   ├── styles/              # 全局样式与 CSS 变量
│   │   ├── views/               # 页面（HomePage、QuizPage、ResultPage）
│   │   ├── App.vue
│   │   └── main.ts
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── scripts/
│   └── parse-questions.mjs      # 面试题解析脚本（MD → JSON）
├── .github/workflows/
│   └── deploy.yml               # GitHub Actions 部署工作流
├── package.json
└── pnpm-lock.yaml
```

## 分支策略

| 分支 | 用途 |
|------|------|
| `main` | 生产分支，推送后触发 GitHub Actions 自动构建部署 |
| `dev` | 日常开发分支，功能完成后合并到 main |

> **注意**：不要直接向 main 推送，应在 dev 分支开发，测试无误后合并到 main。

> **合并后回切**：每次推送到远端并合并到目标分支（dev/main）后，必须切换回之前的开发分支（如 `trae/agent-xxx`），不要停留在 dev 或 main 上。

## 常用命令

```bash
# 安装依赖
pnpm install

# 安装答题系统依赖
cd quiz && pnpm install

# 本地开发（文档站点）
pnpm dev                          # → http://localhost:5173

# 答题系统本地开发
cd quiz && pnpm dev               # → http://localhost:5174

# 解析面试题（MD → JSON，供答题系统使用）
pnpm run parse-questions

# 完整构建（解析题目 + 构建答题系统 + 构建文档）
pnpm build

# 仅构建文档站点
pnpm exec vitepress build docs

# 预览构建产物
pnpm preview
```

## 文档编写规范

### 模块文件结构

每个知识模块（如 `javascript/`、`vue/`）包含两个核心文件：

- `basics.md` — 基础知识文档
- `interviews.md` — 面试题库文档

### 面试题格式要求

面试题文档中的每道题必须遵循以下格式，`parse-questions.mjs` 脚本依赖此格式解析：

```markdown
### Q1: 题目标题

**难度**：初级/中级/高级

**参考答案**：

答案内容...

---

### Q2: 下一题...
```

**关键规则**：
- 题目以 `### Q` 开头
- `**参考答案**：` 为答案起始标记
- 题目之间用 `---` 分隔
- 新增模块需在 `scripts/parse-questions.mjs` 的 `CATEGORY_MAP` 和 `MD_FILES` 中注册

### VitePress 配置

新增文档模块时，需在 [docs/.vitepress/config.ts](docs/.vitepress/config.ts) 中同步配置：

1. **导航栏**（`nav`）：在对应下拉菜单中添加入口
2. **侧边栏**（`sidebar`）：为新模块的路径前缀添加侧边栏分组

### VueUse 文档规范

VueUse 学习文档遵循 [STANDARDS.md](docs/vueuse/STANDARDS.md) 中定义的编写规范，每个 hook 文档包含：

- 源码分析
- 类型定义
- 使用示例
- 设计思路
- 练习题

## 答题系统

### 架构

- **入口**：`quiz/src/main.ts`
- **路由**：`quiz/src/router/index.ts`（HomePage → QuizPage → ResultPage）
- **数据源**：由 `scripts/parse-questions.mjs` 生成的 JSON 文件，输出到 `quiz/public/data/`
- **构建产物**：输出到 `docs/.vitepress/dist/quiz/`，与文档站点一同部署

### 组件命名规范

答题系统组件以 `T` 前缀命名（如 `TButton`、`TCard`、`TTag`），与业务组件区分。

## 部署流程

1. 代码合并到 `main` 分支
2. GitHub Actions 自动触发（见 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)）：
   - 安装依赖
   - 解析面试题（`pnpm run parse-questions`）
   - 构建 VitePress 文档（`pnpm exec vitepress build docs`）
   - 构建答题系统（`cd quiz && pnpm exec vite build`）
   - 上传产物到 GitHub Pages
3. 部署完成后访问 https://chengj-code.github.io/frontend-knowledge/

### 部署注意事项

- `docs/public/.nojekyll` 文件必须存在，否则 GitHub Pages 会按 Jekyll 规则处理，导致 SPA 路由 404
- VitePress 的 `base` 路径根据 `GITHUB_REPOSITORY` 环境变量自动计算
- 答题系统的 `base` 路径同理，独立计算为 `/<repo>/quiz/`

## 环境要求

- **Node.js**：≥ 18（推荐 24，与 CI 一致）
- **pnpm**：≥ 10.0.0
- 构建内存：VitePress 构建较耗内存，CI 中设置 `NODE_OPTIONS: --max-old-space-size=8192`

## 开发注意事项

1. **新增文档模块**时，需同步更新三处：文档目录、`config.ts`（nav + sidebar）、`parse-questions.mjs`（如含面试题）
2. **修改答题系统**时，注意构建产物路径为 `docs/.vitepress/dist/quiz/`，不要更改 `vite.config.ts` 中的 `outDir`
3. **提交前**建议运行 `pnpm run parse-questions` 确认面试题解析无误
4. **不要提交** `quiz/public/data/` 目录（已在 `.gitignore` 中），该目录由解析脚本动态生成
5. **Git 用户配置**：如遇提交报错，需配置 `git config user.email` 和 `git config user.name`
