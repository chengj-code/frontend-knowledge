# Frontend Knowledge Base

> 前端知识点体系化文档仓库，涵盖前端各大核心模块的基础知识与面试题。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 模块进度总览

| 模块 | 基础知识 | 面试题 | 评分 | 状态 | 最后更新 |
|------|:--------:|:------:|:----:|:----:|:--------:|
| **TypeScript** | ✅ 13章+3附录 | ✅ 43题 | ⭐ **9.5** | 🟢 已优化 | 2026-06-14 |
| **Vue** | ✅ 13章+3附录 | ✅ 45题 | ⭐ **9.0** | 🟢 已优化 | 2026-06-14 |
| **JavaScript** | ✅ 17章+附录 | ✅ 50题 | ⭐ **9.0+** | 🟢 已优化 | 2026-06-14 |
| **HTML-CSS** | 📋 待生成 | 📋 待生成 | — | ⚪ 待开始 | — |
| **React** | ✅ 15章+附录 | ✅ 53题 | ⭐ **9.0+** | 🟢 已优化 | 2026-06-14 |
| **Node.js** | 📋 待生成 | 📋 待生成 | — | ⚪ 待开始 | — |
| **工程化** | 📋 待生成 | 📋 待生成 | — | ⚪ 待开始 | — |
| **性能优化** | 📋 待生成 | 📋 待生成 | — | ⚪ 待开始 | — |
| **网络** | 📋 待生成 | 📋 待生成 | — | ⚪ 待开始 | — |
| **浏览器** | 📋 待生成 | 📋 待生成 | — | ⚪ 待开始 | — |

> 评分标准：满分 10 分，9.0+ 为优秀（可直接用于面试准备）

---

## 目录结构

```
frontend-knowledge/
├── README.md                 # 本文件
├── SOP.md                    # 文档生成标准流程（SOP）
│
├── TypeScript/               # TypeScript 类型系统与工程实践  ⭐9.5
│   ├── basics/
│   │   └── TypeScript-Basics-Guide.md      # ~8500行
│   └── interviews/
│       └── TypeScript-Interview-Questions.md # ~4300行
│
├── JavaScript/               # JavaScript 核心语言特性       🔵初稿
│   ├── basics/
│   │   └── JavaScript-Basics-Guide.md      # ~1850行 (17章)
│   └── interviews/
│       └── JavaScript-Interview-Questions.md # ~7260行 (50题)
│
├── Vue/                     # Vue 框架与生态                ⭐9.0
│   ├── basics/
│   │   └── Vue-Basics-Guide.md              # ~8200行 (13章+3附录)
│   └── interviews/
│       └── Vue-Interview-Questions.md      # ~6000行 (45题)
│
├── HTML-CSS/                # HTML 与 CSS 基础              📋 待生成
│   ├── basics/.gitkeep
│   └── interviews/.gitkeep
│
├── React/                   # React 框架与生态                ⭐9.0+
│   ├── basics/
│   │   └── React-Basics-Guide.md              # ~3800行 (15章+附录)
│   └── interviews/
│       └── React-Interview-Questions.md      # ~11900行 (53题)
│
├── Nodejs/                  # Node.js 后端开发            📋 待生成
│   ├── basics/.gitkeep
│   └── interviews/.gitkeep
│
├── 工程化/                   # 构建工具、包管理、CI/CD     📋 待生成
│   ├── basics/.gitkeep
│   └── interviews/.gitkeep
│
├── 性能优化/                 # 前端性能优化策略与实践       📋 待生成
│   ├── basics/.gitkeep
│   └── interviews/.gitkeep
│
├── 网络/                     # HTTP、HTTPS、WebSocket 等    📋 待生成
│   ├── basics/.gitkeep
│   └── interviews/.gitkeep
│
└── 浏览器/                   # 浏览器原理、渲染机制、存储    📋 待生成
    ├── basics/.gitkeep
    └── interviews/.gitkeep
```

---

## 各模块详情

### TypeScript ⭐ 9.5 分

| 文档 | 规模 | 内容亮点 |
|------|------|----------|
| [基础知识指南](TypeScript/basics/TypeScript-Basics-Guide.md) | ~8500 行 | 13 章 + 附录 A（26 个类型操作符）+ 附录 B（类型安全工具库实战）+ 附录 C（TS 5.x 新速查） |
| [面试题库](TypeScript/interviews/TypeScript-Interview-Questions.md) | ~4300 行 | 43 题 / 18 题追问链 / 6 道手写源码实现 |

**核心覆盖**：类型系统、泛型、高级类型（条件/映射/模板字面量）、工具类型手写实现、装饰器、类型体操、tsconfig 工程化配置

### Vue ⭐ 9.0 分

| 文档 | 规模 | 内容亮点 |
|------|------|----------|
| [基础知识指南](Vue/basics/Vue-Basics-Guide.md) | ~8200 行 | 13 章 + 附录 A（Vue 2 补充）+ 附录 B（Todo 实战案例，13 个文件） |
| [面试题库](Vue/interviews/Vue-Interview-Questions.md) | ~6000 行 | 45 题 / 14 题追问链 / 4 道手写原理实现（响应式/diff/nextTick/KeepAlive） |

**核心覆盖**：模板语法、响应式系统、Composition API、组件通信、Vue Router、Pinia、过渡动画、Vue 3 新特性、性能优化

### JavaScript ⭐ 9.0+ 分

| 文档 | 规模 | 内容亮点 |
|------|------|----------|
| [基础知识指南](JavaScript/basics/JavaScript-Basics-Guide.md) | ~4700 行 | 17 章 + 附录（异步工具函数库实战案例 10 模块）+ 6 组流程图 |
| [面试题库](JavaScript/interviews/JavaScript-Interview-Questions.md) | ~10900 行 | 50 题 / 17 题追问链 / 7 道手写源码实现（EventLoop/new/deepClone/V8/虚拟滚动等） |

**核心覆盖**：变量类型、函数进阶（this/call/bind）、闭包原理与应用、原型链与继承、ES6+ 类、作用域链、Event Loop 完整模拟、Promise 手写实现、async/await、DOM 事件机制、数组方法大全、正则表达式、V8 引擎/GC 机制、性能优化、XSS/CSRF 安全

---

## 文档规范

### 内容结构

每个模块包含两个子目录：

- **`basics/`** — 系统化的基础知识文档
  - 12-18 章节式结构，从入门到进阶
  - 每个概念配有代码示例和详细中文注释
  - 包含流程图/示意图帮助理解抽象概念
  - 附带实战案例和最佳实践

- **`interviews/`** — 分级面试题库
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
- **P0** 核心原理手写实现（Promise / diff / 响应式系统 / Event Loop 等）
- **P1** 流程图与示意图（Mermaid + ASCII）
- **P2** 追问链设计（模拟真实面试场景）
- **P3** 贯穿性实战案例
- **P4** 版本特性速查 / 迁移指南

---

## 快速开始

### 在线浏览

直接在 GitHub 上浏览各模块的 Markdown 文件。

### 本地使用

```bash
# 克隆仓库
git clone https://github.com/chengj-code/frontend-knowledge.git

# 用 VS Code 打开（推荐安装 Markdown Preview Enhanced 插件）
code frontend-knowledge
```

### 推荐阅读顺序

```
第一阶段：语言基础
  JavaScript → TypeScript

第二阶段：框架深入（选一个主攻）
  Vue 或 React

第三阶段：工程化与生态
  工程化 → 性能优化 → 网络 → 浏览器 → Node.js
```

---

## 贡献指南

本仓库采用 [SOP.md](SOP.md) 定义的标准化流程维护。如需贡献：

1. Fork 本仓库
2. 按照 SOP 的文档规范编写内容
3. 提交 Pull Request

## License

[MIT](LICENSE)
