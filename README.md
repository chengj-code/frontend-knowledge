# Frontend Knowledge Base

> 前端知识点体系化文档仓库，涵盖前端各大核心模块的基础知识与面试题。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 模块进度总览

| 模块 | 基础知识 | 面试题 | 评分 | 状态 | 最后更新 |
|------|:--------:|:------:|:----:|:----:|:--------:|
| **TypeScript** | ✅ 13章+3附录 | ✅ 43题 | ⭐ **9.5** | 🟢 已优化 | 2026-06-14 |
| **Vue** | ✅ 13章+3附录 | ✅ 45题 | ⭐ **9.0** | 🟢 已优化 | 2026-06-14 |
| **JavaScript** | ✅ 17章+附录 | ✅ 50题 | ⭐ **9.0+** | 🟢 已优化 | 2026-06-14 |
| **HTML-CSS** | ✅ 14章+2附录 | ✅ 50题 | ⭐ **9.0+** | 🟢 已优化 | 2026-06-15 |
| **React** | ✅ 15章+附录 | ✅ 53题 | ⭐ **9.0+** | 🟢 已优化 | 2026-06-14 |
| **Node.js** | ✅ 14章+2附录 | ✅ 50题 | ⭐ **9.3** | 🟢 已优化 | 2026-06-16 |
| **工程化** | ✅ 15章+2附录 | ✅ 50题 | ⭐ **9.0+** | 🟢 已优化 | 2026-06-15 |
| **性能优化** | ✅ 16章+2附录 | ✅ 50题 | ⭐ **9.3** | 🟢 已优化 | 2026-06-16 |
| **网络** | ✅ 14章+2附录 | ✅ 50题 | ⭐ **9.3** | 🟢 已优化 | 2026-06-16 |
| **浏览器** | ✅ 14章+2附录 | ✅ 50题 | ⭐ **9.2** | 🟢 已优化 | 2026-06-16 |

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
├── HTML-CSS/                # HTML 与 CSS 基础              ⭐9.0+
│   ├── basics/
│   │   └── HTML-CSS-Basics-Guide.md           # ~8695行 (14章+2附录)
│   └── interviews/
│       └── HTML-CSS-Interview-Questions.md    # ~5400行 (50题)
│
├── React/                   # React 框架与生态                ⭐9.0+
│   ├── basics/
│   │   └── React-Basics-Guide.md              # ~3800行 (15章+附录)
│   └── interviews/
│       └── React-Interview-Questions.md      # ~11900行 (53题)
│
├── Nodejs/                   # Node.js 后端开发                ⭐9.3
│   ├── basics/
│   │   └── Nodejs-Basics-Guide.md               # ~8894行 (14章+2附录)
│   └── interviews/
│       └── Nodejs-Interview-Questions.md        # ~8335行 (50题)
│
│
├── 工程化/                   # 构建工具、包管理、CI/CD     ⭐9.0+
│   ├── basics/
│   │   └── 工程化-Basics-Guide.md            # ~3108行 (15章+2附录)
│   └── interviews/
│       └── 工程化-Interview-Questions.md     # ~4569行 (50题)
│
├── 性能优化/                 # 前端性能优化策略与实践       ⭐9.3
│   ├── basics/
│   │   └── 性能优化-Basics-Guide.md           # ~5578行 (16章+2附录)
│   └── interviews/
│       └── 性能优化-Interview-Questions.md    # ~6244行 (50题)
├── 浏览器/                   # 浏览器原理、渲染机制、存储与安全  ⭐9.2
│   ├── basics/
│   │   └── 浏览器-Basics-Guide.md               # ~5682行 (14章+2附录)
│   └── interviews/
│       └── 浏览器-Interview-Questions.md        # ~7161行 (50题)
│
├── 网络/                     # HTTP、HTTPS、WebSocket 等        ⭐9.3
│   ├── basics/
│   │   └── 网络-Basics-Guide.md                  # ~5147行 (14章+2附录)
│   └── interviews/
│       └── 网络-Interview-Questions.md           # ~6091行 (50题)
│
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

### HTML-CSS ⭐ 9.0+ 分

| 文档 | 规模 | 内容亮点 |
|------|------|----------|
| [基础知识指南](HTML-CSS/basics/HTML-CSS-Basics-Guide.md) | ~8695 行 | 14 章 + 附录 A（HTML 标签速查表）+ 附录 B（响应式个人主页实战案例）+ P0-P2 深度优化（手写盒模型计算/Flex布局引擎/渲染流水线伪代码） |
| [面试题库](HTML-CSS/interviews/HTML-CSS-Interview-Questions.md) | ~5400 行 | 50 题 / 25+ 题追问链 / 10+ 道手写实现（两栏布局/BFC检测/浮动清除/渲染性能监控/居中方案对比/Loading动画等）+ 知识体系速查表附录 |

**核心覆盖**：HTML5 语义化标签与 ARIA、CSS 盒模型与选择器优先级、BFC 与层叠上下文、Flexbox 弹性布局、Grid 网格布局、定位与浮动、响应式设计与媒体查询、CSS 动画与过渡、浏览器渲染原理（解析→样式→布局→绘制→合成）、重排重绘与 GPU 加速、CSS 现代方案（Modules/CSS-in-JS/Tailwind）、移动端适配（rem/vw/1px/安全区域）

### 工程化 ⭐ 9.0+ 分

| 文档 | 规模 | 内容亮点 |
|------|------|----------|
| [基础知识指南](工程化/basics/工程化-Basics-Guide.md) | ~3108 行 | 15 章 + 附录 A（常用配置速查表）+ 附录 B（Vue3+TS 工程化项目搭建实战） |
| [面试题库](工程化/interviews/工程化-Interview-Questions.md) | ~4569 行 | 50 题 / 三级难度分层 / 追问链设计 / 手写实现题（打包器/HMR/脚手架/Git Hook 等） |

**核心覆盖**：模块化规范（CJS/ESM/AMD/UMD）、包管理器（npm/yarn/pnpm）、构建工具（Webpack/Vite/Rollup/esbuild）、代码规范（ESLint/Prettier/Husky）、CSS 工程化（PostCSS/Sass/CSS Modules）、Git 工作流、CI/CD、Monorepo、项目脚手架、性能监控

### 性能优化 ⭐ 9.3 分

| 文档 | 规模 | 内容亮点 |
|------|------|----------|
| [基础知识指南](性能优化/basics/性能优化-Basics-Guide.md) | ~5578 行 | 16 章 + 附录 A（按场景分类的优化速查表）+ 附录 B（电商首页完整实战案例）+ 6 组 Mermaid 图 |
| [面试题库](性能优化/interviews/性能优化-Interview-Questions.md) | ~6244 行 | 50 题（基础15/进阶18/专家17）+ 15 题追问链 + 5 道手写实现（debounce/虚拟列表/懒加载指令/Performance SDK）|

**核心覆盖**：Core Web Vitals、关键渲染路径、代码分割、缓存策略（HTTP/SW）、渲染性能优化（Reflow/Repaint/合成层）、JS 执行性能（长任务/Web Worker）、内存管理与泄漏防护、网络层优化（HTTP/2&3/CDN）、图片/字体/打包体积优化、移动端特殊考虑、性能监控体系、Lighthouse 实战、性能预算与工程化

### 浏览器 ⭐ 9.2 分

| 文档 | 规模 | 内容亮点 |
|------|------|----------|
| [基础知识指南](浏览器/basics/浏览器-Basics-Guide.md) | ~5682 行 | 14 章 + 附录 A（按场景分类的知识速查表）+ 附录 B（浏览器端监控 SDK 完整实现）+ 7 组 Mermaid 图 |
| [面试题库](浏览器/interviews/浏览器-Interview-Questions.md) | ~7161 行 | 50 题（基础15/进阶20/专家15）+ 8 题追问链 + 4 道增强手写实现（EventEmitter/Promise/debounce+throttle/懒加载指令）|

**核心覆盖**：浏览器多进程架构、渲染管线（DOM/CSSOM/Layout/Paint/Composite）、V8 引擎（Ignition/TurboFan/GC/Hidden Class）、Event Loop（宏任务/微任务/rAF）、DOM 事件机制、存储方案选型（Cookie/LocalStorage/IndexedDB）、跨域通信（CORS/postMessage/WebSocket）、浏览器安全（XSS/CSRF/CSP/SRI/HSTS）、网络 API（Fetch/WebSocket/SSE）、Web Components/WASM/Workers、移动端特殊行为、DevTools 调试实战

### 网络 ⭐ 9.3 分

| 文档 | 规模 | 内容亮点 |
|------|------|----------|
| [基础知识指南](网络/basics/网络-Basics-Guide.md) | ~5147 行 | 14 章 + 附录 A（HTTP状态码/请求头/响应头/缓存头/安全头速查表）+ 附录 B（网络层封装 SDK 完整实现）+ 7 组 Mermaid 图 |
| [面试题库](网络/interviews/网络-Interview-Questions.md) | ~6091 行 | 50 题（基础15/进阶15/专家20）+ 10 题追问链 + 4 道手写实现（HTTP服务器/WebSocket服务端/断点续传/axios封装库）|

**核心覆盖**：OSI与TCP/IP模型、HTTP协议全版本演进(1.0→3)、HTTPS/TLS加密握手、HTTP/2多路复用与HPACK、HTTP/3 QUIC协议、TCP三次握手/四次挥手/流量控制/拥塞控制、DNS解析机制、CDN分发原理、WebSocket协议、Fetch/XHR/Beacon API、CORS跨域解决方案、网络性能优化实战（缓存策略/资源提示/弱网降级）、网络安全（XSS/CSRF/CSP/HSTS/DDoS）

### Node.js ⭐ 9.3 分

| 文档 | 规模 | 内容亮点 |
|------|------|----------|
| [基础知识指南](Nodejs/basics/Nodejs-Basics-Guide.md) | ~8894 行 | 14 章 + 附录 A（常用模块速查表）+ 附录 B（BFF 完整实战案例）+ 6 组 Mermaid 图 |
| [面试题库](Nodejs/interviews/Nodejs-Interview-Questions.md) | ~8335 行 | 50 题（基础15/进阶20/专家15）+ 8 题追问链 + 4 道手写实现（Express路由系统/EventEmitter/Promise方法集/优雅关闭）|

**核心覆盖**：Node.js 架构与 libuv 事件循环、CommonJS/ESM 模块系统、异步编程模式（Callback/Promise/async-await/EventEmitter）、文件系统操作（fs/Stream/Buffer）、HTTP 服务开发与 Express/Koa 框架、数据库交互（MySQL/MongoDB/Redis/ORM）、WebSocket/gRPC 网络通信、安全鉴权（Session/JWT/OAuth2.0/bcrypt/CORS/Rate Limiting）、Stream 流式处理与背压、性能优化（Cluster/PM2/内存泄漏排查/Docker 部署）、测试工程化（Jest/E2E/CI-CD/GitHub Actions）

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
