# 前端知识库 (Frontend Knowledge Base)

> 基于 VitePress 构建的前端知识点体系化文档站点，涵盖前端各大核心模块的基础知识与面试题。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![VitePress](https://img.shields.io/badge/VitePress-1.x-3eaf7c)](https://vitepress.dev/)
[![Vue](https://img.shields.io/badge/Vue-3.x-42b883)](https://vuejs.org/)

## ✨ 特性

- 📚 **10+ 技术模块** — JavaScript、TypeScript、Vue、React、Node.js、工程化、性能优化、浏览器、网络、HTML-CSS
- 🔥 **源码级深度** — Vue2/Vue3/React 三大框架源码逐行解读
- ✍️ **手写实现** — Promise、Diff算法、响应式系统、EventLoop 等核心原理
- 🎯 **面试备战** — 500+ 道面试题，含追问链设计，覆盖基础/进阶/专家三级难度
- 📊 **图表辅助** — Mermaid 流程图、架构图、对比表，帮助理解抽象概念
- 🔍 **全文搜索** — 内置本地搜索，快速定位知识点
- 🌙 **深色模式** — 支持明暗主题切换
- 📱 **响应式设计** — 完美适配移动端

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

访问 `http://localhost:5173` 查看站点。

### 在线浏览

直接访问文档站点（部署后）。

## 📊 模块进度总览

| 模块 | 基础知识 | 面试题 | 评分 | 状态 | 最后更新 |
|------|:--------:|:------:|:----:|:----:|:--------:|
| **TypeScript** | ✅ 13章+3附录 | ✅ 43题 | ⭐ **9.5** | 🟢 已优化 | 2026-06-24 |
| **Vue** | ✅ 13章+3附录 | ✅ 45题 | ⭐ **9.0** | 🟢 已优化 | 2026-06-24 |
| **JavaScript** | ✅ 17章+附录 | ✅ 50题 | ⭐ **9.0+** | 🟢 已优化 | 2026-06-24 |
| **HTML-CSS** | ✅ 14章+2附录 | ✅ 50题 | ⭐ **9.0+** | 🟢 已优化 | 2026-06-24 |
| **React** | ✅ 15章+附录 | ✅ 53题 | ⭐ **9.0+** | 🟢 已优化 | 2026-06-24 |
| **Node.js** | ✅ 14章+2附录 | ✅ 50题 | ⭐ **9.3** | 🟢 已优化 | 2026-06-24 |
| **工程化** | ✅ 15章+2附录 | ✅ 50题 | ⭐ **9.0+** | 🟢 已优化 | 2026-06-24 |
| **性能优化** | ✅ 16章+2附录 | ✅ 50题 | ⭐ **9.3** | 🟢 已优化 | 2026-06-24 |
| **网络** | ✅ 14章+2附录 | ✅ 35题 | ⭐ **9.3** | 🟢 已优化 | 2026-06-24 |
| **浏览器** | ✅ 14章+2附录 | ✅ 50题 | ⭐ **9.2** | 🟢 已优化 | 2026-06-24 |

### 源码分析模块（进阶 — 框架源码逐行解读）

> **定位**：面向中高级开发者，从「会用」进阶到「懂原理」，每个知识点包含**真实源码片段 + 行号引用 + 设计意图分析 + 版本对比**

| 模块 | 基础知识 | 面试题 | 评分 | 状态 |
|------|:--------:|:------:|:----:|:----:|
| Vue2 源码解读 | ✅ 12章+2附录 | ✅ 50题 | ⭐ **9.3** | 🟢 已优化 |
| Vue3 源码解读 | ✅ 12章+2附录 | ✅ 54题 | ⭐ **9.5** | 🟢 已优化 |
| React 源码解读 | ✅ 12章+2附录 | ✅ 50题 | ⭐ **9.3** | 🟢 已优化 |

> 评分标准：满分 10 分，9.0+ 为优秀（可直接用于面试准备）

## 📁 项目结构

```
frontend-knowledge/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts          # VitePress 站点配置
│   ├── public/
│   │   └── favicon.svg        # 站点图标
│   ├── index.md               # 首页
│   ├── html-css/              # HTML-CSS 模块
│   │   ├── basics.md          # 基础知识
│   │   └── interviews.md      # 面试题库
│   ├── javascript/            # JavaScript 模块
│   ├── typescript/            # TypeScript 模块
│   ├── vue/                   # Vue 模块
│   ├── react/                 # React 模块
│   ├── nodejs/                # Node.js 模块
│   ├── engineering/           # 工程化模块
│   ├── performance/           # 性能优化模块
│   ├── browser/               # 浏览器模块
│   ├── network/               # 网络模块
│   └── source-code/           # 源码分析模块
│       ├── vue2/
│       ├── vue3/
│       └── react/
├── README.md                  # 本文件
├── SOP.md                     # 文档生成标准流程（SOP）
├── package.json               # 项目配置
└── package-lock.json          # 依赖锁定
```

## 📖 推荐阅读顺序

```
第一阶段：语言基础
  JavaScript → TypeScript

第二阶段：框架深入（选一个主攻）
  Vue 或 React

第三阶段：工程化与生态
  工程化 → 性能优化 → 网络 → 浏览器 → Node.js

第四阶段：源码级进阶（中高级开发者）
  Vue2 源码解读 → Vue3 源码解读（含Composition API专项）→ React 源码解读
```

## 🎯 文档规范

### 内容结构

每个模块包含两个文档：

- **`basics.md`** — 系统化的基础知识文档
  - 12-18 章节式结构，从入门到进阶
  - 每个概念配有代码示例和详细中文注释
  - 包含 Mermaid 流程图/示意图帮助理解抽象概念
  - 附带实战案例和最佳实践

- **`interviews.md`** — 分级面试题库
  - **基础层 ★☆☆** (~30%)：概念记忆、基础语法
  - **进阶层 ★★☆** (~40%)：多点综合、原理理解
  - **专家层 ★★★** (~30%)：源码级深度、架构设计
  - 每题附参考答案要点，核心题有手写实现和追问链

### 质量标准

所有文档均按 [SOP.md](SOP.md) 标准流程生成和优化：

```
Phase 1: 文档生成 → Phase 2: 质量评审打分 → Phase 3: 优化提升 → Phase 4: 提交推送
```

优化项包括：
- **P0** 核心原理手写实现（Promise / Diff / 响应式系统 / Event Loop 等）
- **P1** 流程图与示意图（Mermaid + ASCII）
- **P2** 追问链设计（模拟真实面试场景）
- **P3** 贯穿性实战案例
- **P4** 版本特性速查 / 迁移指南

## 🚢 部署

构建产物位于 `docs/.vitepress/dist`，可部署到任意静态托管服务：

- **GitHub Pages** — 配合 GitHub Actions 自动部署
- **Vercel / Netlify** — 一键部署，自动构建
- **Cloudflare Pages** — 全球 CDN 加速
- **Nginx / 任意静态服务器**

## 🤝 贡献指南

本仓库采用 [SOP.md](SOP.md) 定义的标准化流程维护。如需贡献：

1. Fork 本仓库
2. 按照 SOP 的文档规范编写内容
3. 提交 Pull Request

## 📄 License

[MIT](LICENSE)
