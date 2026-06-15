# 前端工程化基础知识完全指南

> **版本**：v1.0 | **更新日期**：2026-06-15
>
> 从零开始，系统掌握前端工程化的核心概念、工具链与最佳实践

---

<!-- 文档内容正在生成中 -->

---

## 目录

- [第一章：前端工程化概述](#第一章前端工程化概述)
  - [1.1 什么是前端工程化](#11-什么是前端工程化)
  - [1.2 为什么需要工程化](#12-为什么需要工程化)
  - [1.3 前端工程化发展历程](#13-前端工程化发展历程)
  - [1.4 核心目标与体系架构](#14-核心目标与体系架构)
- [第二章：模块化规范详解](#第二章模块化规范详解)
  - [2.1 模块化演进历史](#21-模块化演进历史)
  - [2.2 CommonJS 规范](#22-commonjs-规范)
  - [2.3 ES Modules（ESM）](#23-es-modulesesm)
  - [2.4 AMD 与 UMD](#24-amd-与-umd)
  - [2.5 各规范对比与互操作](#25-各规范对比与互操作)
- [第三章：包管理器深度解析](#第三章包管理器深度解析)
  - [3.1 npm 核心原理](#31-npm-核心原理)
  - [3.2 yarn 的改进与创新](#32-yarn-的改进与创新)
  - [3.3 pnpm 革命性设计](#33-pnpm-革命性设计)
  - [3.4 三者全面对比](#34-三者全面对比)
  - [3.5 依赖管理策略](#35-依赖管理策略)
  - [3.6 Monorepo 包管理](#36-monorepo-包管理)
- [第四章：Webpack 构建工具基础](#第四章webpack-构建工具基础)
  - [4.1 为什么需要构建工具](#41-为什么需要构建工具)
  - [4.2 Webpack 核心概念](#42-webpack-核心概念)
  - [4.3 Entry 入口配置](#43-entry-入口配置)
  - [4.4 Output 输出配置](#44-output-输出配置)
  - [4.5 Loader 模块转换器](#45-loader-模块转换器)
  - [4.6 Plugin 扩展机制](#46-plugin-扩展机制)
  - [4.7 Mode 模式配置](#47-mode-模式配置)
  - [4.8 最小化完整配置示例](#48-最小化完整配置示例)
- [第五章：Webpack 高级特性与优化](#第五章webpack-高级特性与优化)
  - [5.1 代码分割 Code Splitting](#51-代码分割-code-splitting)
  - [5.2 Tree Shaking 死码消除](#52-tree-shaking-死码消除)
  - [5.3 HMR 热模块替换](#53-hmr-热模块替换)
  - [5.4 缓存优化策略](#54-缓存优化策略)
  - [5.5 Source Map 配置](#55-source-map-配置)
  - [5.6 构建性能优化](#56-构建性能优化)
  - [5.7 Webpack 5 新特性](#57-webpack-5-新特性)
- [第六章：Vite 原理与实战](#第六章vite-原理与实战)
  - [6.1 Vite 是什么](#61-vite-是什么)
  - [6.2 开发服务器原理](#62-开发服务器原理)
  - [6.3 生产构建原理](#63-生产构建原理)
  - [6.4 Vite 插件机制](#64-vite-插件机制)
  - [6.5 Vite vs Webpack 全面对比](#65-vite-vs-webpack-全面对比)
  - [6.6 Vite 项目配置实战](#66-vite-项目配置实战)
  - [6.7 Webpack 迁移到 Vite](#67-webpack-迁移到-vite)
- [第七章：其他构建工具概览](#第七章其他构建工具概览)
  - [7.1 esbuild：极致速度的打包器](#71-esbuild极致速度的打包器)
  - [7.2 Parcel：零配置构建工具](#72-parcel零配置构建工具)
  - [7.3 Rspack：Rust 驱动的 Webpack 兼容方案](#73-rspackrust-驱动的-webpack-兼容方案)
  - [7.4 Turbopack：Vite 团队的下一代构建工具](#74-turbopackvite-团队的下一代构建工具)
  - [7.5 构建工具选型指南](#75-构建工具选型指南)
- [第八章：代码规范与质量保障](#第八章代码规范与质量保障)
  - [8.1 ESLint 代码检查](#81-eslint-代码检查)
  - [8.2 Prettier 代码格式化](#82-prettier-代码格式化)
  - [8.3 Stylelint 样式检查](#83-stylelint-样式检查)
  - [8.4 Git Hooks 自动化](#84-git-hooks-自动化)
  - [8.5 Commit 规范校验](#85-commit-规范校验)
  - [8.6 编辑器统一配置](#86-编辑器统一配置)
  - [8.7 完整工作流整合](#87-完整工作流整合)
- [第九章：CSS 工程化方案](#第九章css-工程化方案)
  - [9.1 CSS 预处理器](#91-css-预处理器)
  - [9.2 CSS Modules 模块化](#92-css-modules-模块化)
  - [9.3 CSS-in-JS 方案](#93-css-in-js-方案)
  - [9.4 Tailwind CSS 原子化框架](#94-tailwind-css-原子化框架)
  - [9.5 PostCSS 转换生态](#95-postcss-转换生态)
  - [9.6 CSS 方案选型建议](#96-css-方案选型建议)
- [第十章：Git 工作流与协作规范](#第十章git-工作流与协作规范)
  - [10.1 分支管理策略](#101-分支管理策略)
  - [10.2 Conventional Commits 规范](#102-conventional-commits-规范)
  - [10.3 Git Hooks 应用场景](#103-git-hooks-应用场景)
  - [10.4 Merge / Rebase / Squash 选择](#104-merge--rebase--squash-选择)
  - [10.5 Changelog 自动生成](#105-changelog-自动生成)
- [第十一章：CI/CD 持续集成与部署](#第十一章cicd-持续集成与部署)
  - [11.1 CI/CD 基础概念](#11-1-cicd-基础概念)
  - [11.2 GitHub Actions 实战](#112-github-actions-实战)
  - [11.3 其他 CI 平台概览](#113-其他-ci-平台概览)
  - [11.4 前端 CI/CD 流水线设计](#114-前端-cicd-流水线设计)
  - [11.5 Docker 容器化部署](#115-docker-容器化部署)
- [第十二章：Monorepo 工程实践](#第十二章monorepo-工程实践)
  - [12.1 Monorepo vs MultiRepo](#121-monorepo-vs-multirepo)
  - [12.2 pnpm workspace](#122-pnpm-workspace)
  - [12.3 Turborepo 任务编排](#123-turborepo-任务编排)
  - [12.4 Nx 高级 Monorepo 工具](#124-nx-高级-monorepo-工具)
  - [12.5 Lerna 包管理](#125-lerna-包管理)
  - [12.6 Monorepo 最佳实践](#126-monorepo-最佳实践)
- [第十三章：项目脚手架与模板](#第十三章项目脚手架与模板)
  - [13.1 主流脚手架工具](#131-主流脚手架工具)
  - [13.2 自定义脚手架开发](#132-自定义脚手架开发)
  - [13.3 项目模板管理](#133-项目模板管理)
- [第十四章：性能监控与错误追踪](#第十四章性能监控与错误追踪)
  - [14.1 前端性能指标体系](#141-前端性能指标体系)
  - [14.2 性能数据采集方案](#142-性能数据采集方案)
  - [14.3 错误监控 Sentry](#143-错误监控-sentry)
  - [14.4 用户行为埋点](#144-用户行为埋点)
- [第十五章：工程化最佳实践总结](#第十五章工程化最佳实践总结)
  - [15.1 项目目录结构规范](#151-项目目录结构规范)
  - [15.2 环境变量管理](#152-环境变量管理)
  - [15.3 安全加固要点](#153-安全加固要点)
  - [15.4 工程化成熟度评估](#154-工程化成熟度评估)
- [附录 A：常用配置速查表](#附录-a常用配置速查表)
  - [A.1 Webpack 常用配置模板](a1-webpack-常用配置模板)
  - [A.2 Vite 常用配置模板](a2-vite-常用配置模板)
  - [A.3 ESLint + Prettier 联合配置](a3-eslint--prettier-联合配置)
  - [A.4 GitHub Actions 前端模板](a4-github-actions-前端模板)
- [附录 B：实战案例 — Vue3+TS 工程化项目搭建](#附录-b实战案例--vue3ts-工程化项目搭建)
  - [B.1 项目概述](b1-项目概述)
  - [B.2 完整项目结构与说明](b2-完整项目结构与说明)
  - [B.3 核心配置文件详解](b3-核心配置文件详解)
  - [B.4 功能与知识点对照表](b4-功能与知识点对照表)

---

## 第一章：前端工程化概述

> **本章要点速查**：
> | 关键词 | 核心内容 |
> |--------|----------|
> | 定义 | 将前端开发流程标准化、自动化、智能化的方法论 |
> | 四大支柱 | 模块化、组件化、规范化、自动化 |
> | 核心目标 | 提升效率、保障质量、降低成本、便于协作 |
> | 技术栈 | 构建/打包 → 规范/质量 → 协作/部署 → 监控/运维 |

### 1.1 什么是前端工程化

**前端工程化（Frontend Engineering）** 是指将软件工程的方法论和工具应用于前端开发领域，通过**标准化、自动化、智能化**的手段，解决前端项目在规模增长过程中遇到的各类问题。

通俗来说，就是把前端开发从"手工作坊"升级为"现代化工厂"：

```
┌─────────────────────────────────────────────────────────────┐
│                    传统开发模式（手工作坊）                     │
│                                                             │
│  手写 HTML/CSS/JS → 手动复制到服务器 → 手动测试 → 手动修复    │
│       ↑ 问题：效率低、易出错、难协作、不可复现                  │
└─────────────────────────────────────────────────────────────┘
                            ↓ 升级
┌─────────────────────────────────────────────────────────────┐
│                   工程化模式（现代化工厂）                      │
│                                                             │
│  模块化编码 → 自动构建 → 自动检测 → 自动测试 → 自动部署 → 监控   │
│       ✓ 优势：高效、稳定、可协作、可追溯、可度量                 │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 为什么需要工程化

随着前端应用复杂度的爆炸式增长，工程化变得不可或缺：

| 痛点维度 | 具体问题 | 工程化解决方案 |
|----------|----------|---------------|
| **复杂度管理** | 代码量从千行到百万行，难以维护 | 模块化拆分、组件化架构 |
| **协作效率** | 多人开发冲突频繁、风格不统一 | 代码规范、Git 工作流、Code Review |
| **运行性能** | 加载慢、渲染卡顿、资源浪费 | 构建优化、Tree Shaking、代码分割 |
| **交付质量** | Bug 多、回归问题频发 | 自动化测试、Lint 检查、类型系统 |
| **部署运维** | 发布流程繁琐、回滚困难 | CI/CD 流水线、Docker 容器化 |
| **开发体验** | 等待构建时间长、调试困难 | HMR 热更新、Source Map、DevTools |

### 1.3 前端工程化发展历程

```
2010 之前 ──→ 2010-2015 ──→ 2015-2019 ──→ 2020-2023 ──→ 2024+
   │            │             │             │             │
   ▼            ▼             ▼             ▼             ▼
 jQuery时代    Grunt/Gulp     Webpack时代   Vite崛起      AI+工程化
              任务 runner     模块打包器    ESM原生      智能化工具链
              文件合并压缩    HMR/CodeSplit  极速HMR     辅助生成
              语法预编译      Loader生态    Rollup构建
```

### 1.4 核心目标与体系架构

#### 前端工程化的四大支柱

```
                    ┌──────────────┐
                    │  前端工程化    │
                    └──────┬───────┘
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │  模块化    │    │  规范化    │    │  自动化    │
    ├──────────┤    ├──────────┤    ├──────────┤
    │•CommonJS │    │•ESLint   │    │•CI/CD    │
    │•ESM      │    │•Prettier │    │•自动化测试│
    │•组件化    │    │•Commit规范│   │•自动部署  │
    │•Monorepo │    │•Git Flow  │    │•监控告警  │
    └──────────┘    └──────────┘    └──────────┘
           │               │               │
           └───────────────┴───────────────┘
                           ▼
                    ┌──────────────┐
                    │  组件化（基础）│
                    │•UI组件封装   │
                    │•业务组件抽象 │
                    │•设计系统     │
                    └──────────────┘
```

#### 完整技术栈全景图

```
┌──────────────────────────────────────────────────────────────────┐
│                        前端工程化技术全景                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  编码阶段                                                 │    │
│  │  TypeScript · ESLint · Prettier · EditorConfig · Husky   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              ↓                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  构建阶段                                                 │    │
│  │  Vite/Webpack/esbuild · Sass/Less · PostCSS · Babel/SWC  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              ↓                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  质量保障                                                 │    │
│  │  单元测试 · E2E测试 · 覆盖率报告 · Code Review · SonarQube│    │
│  └─────────────────────────────────────────────────────────┘    │
│                              ↓                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  版本控制 & 协作                                           │    │
│  │  Git Flow/GitHub Flow · Conventional Commits · Changelog  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              ↓                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  持续集成 & 部署                                           │    │
│  │  GitHub Actions/Jenkins · Docker · CDN · 灰度发布         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              ↓                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  运维 & 监控                                               │    │
│  │  Sentry · 性能监控 · 日志系统 · 用户行为分析 · 告警        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 第二章：模块化规范详解

> **本章要点速查**：
> | 规范 | 环境 | 关键语法 | 特点 |
> |------|------|----------|------|
> | CommonJS | Node.js | `require()` / `module.exports` | 同步加载，服务端主流 |
> | ES Modules | 浏览器+Node.js | `import` / `export` | 静态分析，官方标准 |
> | AMD | 浏览器（历史） | `define()` / `require()` | 异步加载，RequireJS |
> | UMD | 通用 | 兼容 CJS/AMD/全局 | 兼容多环境 |

### 2.1 模块化演进历史

在 JavaScript 早期（ES5 及之前），语言层面没有模块化能力，开发者通过各种变通方式实现模块化：

```javascript
// ========== 方式一：全局函数命名冲突 ==========
// utils.js
function formatName(name) {          // 全局作用域，容易冲突
  return name.trim()
}

// ========== 方式二：IIFE 立即执行函数 ==========
// utils.js — 用闭包模拟私有作用域
var Utils = (function() {
  // 私有变量，外部无法访问
  var _prefix = '[Utils]'             // 下划线前缀约定为私有

  function _log(msg) {
    console.log(_prefix + msg)        // 内部辅助函数
  }

  return {                             // 返回公开 API
    formatName: function(name) {
      _log('formatName called')       // 可调用私有函数
      return name.trim()
    }
  }
})()                                  // 立即执行，赋值给全局变量 Utils

// 使用
Utils.formatName('  hello  ')         // "hello"
// Utils._log('test')                  // ❌ 无法访问，真正实现"私有"
```

### 2.2 CommonJS 规范

CommonJS 是 Node.js 采用的模块规范，使用 `require()` 导入、`module.exports` 导出：

```javascript
// ========== math.js — 定义模块 ==========
// 定义常量
const PI = Math.PI                   // 圆周率常量

// 定义工具函数
function add(a, b) {
  return a + b                        // 两数相加
}

function multiply(a, b) {
  return a * b                        // 两数相乘
}

// 定义类
class Calculator {
  constructor(initialValue = 0) {
    this.value = initialValue         // 初始值，默认为 0
  }
  add(num) {
    this.value += num                 // 累加
    return this                       // 支持链式调用
  }
  getResult() {
    return this.value                 // 获取当前结果
  }
}

// 导出：module.exports 是 Node.js 提供的特殊对象
module.exports = {
  PI: PI,                             // 导出常量
  add: add,                           // 导出函数
  multiply: multiply,
  Calculator: Calculator              // 导出类
}
```

```javascript
// ========== app.js — 使用模块 ==========
const math = require('./math')        // 同步加载 math 模块（相对路径）

console.log(math.PI)                  // 3.14159...
console.log(math.add(2, 3))           // 5

const calc = new math.Calculator(10)  // 创建计算器实例
calc.add(5).add(3)
console.log(calc.getResult())         // 18
```

**CommonJS 核心特点：**

| 特性 | 说明 |
|------|------|
| **加载方式** | 同步（`require()` 会阻塞代码执行直到模块加载完成） |
| **运行时加载** | 只有代码运行到 `require()` 时才去读取和编译模块 |
| **值拷贝** | 导出的是值的拷贝，修改原模块不会影响已导出的值 |
| **缓存机制** | 首次加载后缓存到 `require.cache`，后续直接取缓存 |
| **适用场景** | 服务端（Node.js），文件本地读取快，同步无压力 |

```javascript
// ========== CommonJS 值拷贝演示 ==========
// counter.js
let count = 0                         // 模块内部计数器

function increment() {
  count += 1                          // 计数加 1
  return count
}

module.exports = { count, increment }  // 导出当前值和函数

// main.js
const counter = require('./counter')
console.log(counter.count)            // 0 — 初始值拷贝
counter.increment()
console.log(counter.count)            // 0 — ⚠️ 仍然是 0！因为导出的是拷贝
console.log(counter.increment())      // 1 — 函数引用是共享的
```

### 2.3 ES Modules（ESM）

ES Modules（ESM）是 JavaScript 官方标准的模块系统，使用 `import` / `export` 语法：

```javascript
// ========== utils.ts — ESM 导出多种形式 ==========
// 命名导出（Named Exports）
export const VERSION = '1.0.0'        // 导出常量

export const MAX_RETRY = 3             // 最大重试次数

// 命名导出函数
export function formatDate(date: Date): string {
  const y = date.getFullYear()        // 获取年份
  const m = String(date.getMonth() + 1).padStart(2, '0')  // 月份补零
  const d = String(date.getDate()).padStart(2, '0')        // 日期补零
  return `${y}-${m}-${d}`             // 返回 YYYY-MM-DD 格式
}

// 命名导出类
export class HttpClient {
  private baseURL: string             // 私有属性：API 基础地址

  constructor(baseURL: string) {
    this.baseURL = baseURL            // 初始化基础地址
  }

  async get<T>(path: string): Promise<T> {
    const url = `${this.baseURL}${path}`  // 拼接完整 URL
    const res = await fetch(url)       // 发起 GET 请求
    return res.json() as Promise<T>    // 解析 JSON 并返回
  }
}

// 默认导出（Default Export）
export default class App {
  name: string                        // 应用名称

  constructor(name: string) {
    this.name = name                  // 设置应用名
  }

  start() {
    console.log(`${this.name} started`)  // 启动提示
  }
}
```

```javascript
// ========== app.ts — ESM 导入方式 ==========
// 方式一：导入命名导出（使用 {} 解构）
import { formatDate, VERSION, HttpClient } from './utils'

// 方式二：导入默认导出（不需要 {}）
import App from './utils'

// 方式三：命名导入 + 重命名（as 关键字）
import { formatDate as format } from './utils'  // 重命名为 format

// 方式四：整体导入（命名空间导入）
import * as Utils from './utils'

// 使用示例
const api = new HttpClient('/api/v1')   // 创建 HTTP 客户端实例
api.get<UserInfo>('/user/me')           // 泛型约束返回类型

const today = formatDate(new Date())    // 格式化今天的日期
console.log(today)                      // "2026-06-15"

const myApp = new App('MyApp')          // 创建应用实例
myApp.start()                           // "MyApp started"
```

**ESM 核心特点：**

| 特性 | 说明 |
|------|------|
| **静态分析** | 在代码执行前就能确定依赖关系（`import` 必须在顶层） |
| **值引用** | 导出的是值的实时绑定（live binding），不是拷贝 |
| **异步加载** | 浏览器中原生支持异步加载模块 |
| **Tree Shaking** | 静态结构使得未使用的导出可以被安全删除 |
| **严格模式** | ESM 模块自动启用 strict mode |

```javascript
// ========== ESM 实时绑定演示（对比 CommonJS） ==========
// counter.mjs (ESM 模块用 .mjs 或 package.json type:"module")
export let count = 0                    // let 声明，允许重新赋值

export function increment() {
  count += 1                            // 修改原始绑定
  return count
}

// main.mjs
import { count, increment } from './counter.mjs'
console.log(count)                      // 0
increment()
console.log(count)                      // 1 ✅ 实时绑定！能获取最新值
```

### 2.4 AMD 与 UMD

#### AMD（Asynchronous Module Definition）

AMD 主要用于浏览器环境的异步模块加载，代表库是 RequireJS：

```javascript
// ========== AMD 格式 ==========
// 定义模块
define(['jquery', './utils'], function($, utils) {  // 声明依赖
  return {                                          // 返回模块对象
    init: function() {
      $('body').append(utils.greet())               // 使用依赖
    }
  }
})
```

#### UMD（Universal Module Definition）

UMD 同时支持 CommonJS、AMD 和全局变量三种模式：

```javascript
// ========== UMD 模板 ==========
(function(root, factory) {
  // 判断当前环境支持的模块规范
  if (typeof module === 'object' && module.exports) {
    // ✅ CommonJS 环境（Node.js）
    module.exports = factory(require('jquery'))
  } else if (typeof define === 'function' && define.amd) {
    // ✅ AMD 环境（浏览器 + RequireJS）
    define(['jquery'], factory)
  } else {
    // ✅ 浏览器全局变量模式
    root.MyModule = factory(root.jQuery)
  }
}(typeof self !== 'undefined' ? self : this, function($) {

  // ======== 模块实际代码写在这里 ========
  function init() {
    $(document).ready(function() {
      console.log('UMD module initialized')
    })
  }

  return { init }                       // 返回公共 API
}))
```

### 2.5 各规范对比与互操作

#### 全面对比表

| 对比维度 | CommonJS | ES Modules (ESM) | AMD | UMD |
|----------|----------|-------------------|-----|-----|
| **关键字** | `require` / `exports` | `import` / `export` | `define` / `require` | 自适应 |
| **加载时机** | 运行时同步 | 编译时静态分析 | 运行时异步 | 取决于环境 |
| **值传递** | 值拷贝 | 实时绑定（live binding） | 值拷贝 | 值拷贝 |
| **Tree Shaking** | 不支持 | 原生支持 | 不支持 | 不支持 |
| **循环依赖** | 已加载部分可用 | 可能得到 undefined | 支持 | 取决于适配 |
| **Node.js** | 原生支持 | 原生支持（`.mjs`） | 需要库 | 需要库 |
| **浏览器** | 需要打包工具 | 原生支持（`<script type="module">`） | 需要库 | 需要打包 |
| **当前地位** | Node.js 生态仍广泛使用 | **官方标准，推荐使用** | 历史遗留 | 库发布常用 |

#### CommonJS 与 ESM 互操作

```javascript
// ========== CJS 中导入 ESM ==========
// 注意：CommonJS 可以 require() ESM 模块（Node.js 支持）
// 但只能获取 default 导出（被包装成 .default 属性）

// ========== ESM 中导入 CJS ==========
// ESM 可以 import CJS 模块
// CJS 的 module.exports 整体作为 default 导入
import pkg from 'lodash'                // 整体作为 default
import { cloneDeep } from 'lodash'      // 命名导入也能用（构建工具处理）
```

---

## 第三章：包管理器深度解析

> **本章要点速查**：
> | 工具 | 核心特点 | 锁定文件 | 符号链接 |
> |------|----------|----------|----------|
> | npm v3+ | 扁平 node_modules | `package-lock.json` | 无 |
> | yarn v1 | 扁平 + 缓存优化 | `yarn.lock` | 无 |
> | pnpm | 内容寻址存储 + 硬链接 | `pnpm-lock.yaml` | 符号链接（.pnpm） |

### 3.1 npm 核心原理

npm（Node Package Manager）是 Node.js 默认的包管理器，目前最新版本为 npm 10.x。

#### npm 安装依赖的过程

```
npm install 执行流程：

  1. 读取 package.json
       ↓
  2. 读取 package-lock.json（如有）
       ↓
  3. 解析依赖树（确定版本）
       ↓
  4. 下载包到全局缓存 (~/.npm/_cacache/)
       ↓
  5. 扁平化安装到 node_modules/
       ↓
  6. 写入/更新 package-lock.json
```

#### node_modules 结构（npm 扁平化）

```
my-project/node_modules/
├── react/                    # 直接依赖
├── react-dom/                # 直接依赖
│   └── node_modules/
│       ├── scheduler/        # react-dom 的依赖 — 被提升到顶层
│       └── loose-envify/     # react-dom 的依赖 — 被提升到顶层
├── lodash/                   # 直接依赖
├── scheduler/                # ← 被提升上来的（react-dom 需要）
├── loose-envify/             # ← 被提升上来的（react-dom 需要）
├── .package-lock.json        # 锁定文件
```

**扁平化的问题**：依赖提升可能导致非法访问（phantom dependencies）和版本冲突。

### 3.2 yarn 的改进与创新

yarn 由 Facebook（Meta）团队开发，主要解决了 npm v3 的痛点：

| npm v3 问题 | yarn v1 解决方案 |
|-------------|------------------|
| 安装不确定（顺序影响结果） | 使用 `yarn.lock` 保证确定性 |
| 安装速度慢 | 并行下载 + 离线缓存 |
| 安全隐患（CVE-2021-23338） | 引入 checksum 校验 |

```bash
# yarn 常用命令对照
yarn add <pkg>              # 添加依赖（= npm install <pkg> --save）
yarn add <pkg> -D           # 添加开发依赖（= npm install <pkg> --save-dev）
yarn remove <pkg>           # 移除依赖（= npm uninstall <pkg>）
yarn upgrade                # 更新所有依赖
yarn cache clean            # 清理缓存
yarn workspaces <cmd>       # Monorepo 操作
```

### 3.3 pnpm 革命性设计

pnpm 是目前最先进的包管理器，其核心创新在于**内容寻址存储（CAS）+ 硬链接 + 符号链接**。

#### pnpm 的 node_modules 结构

```
my-project/node_modules/
├── .pnpm/                   # pnpm 内部目录（符号链接仓库）
│   ├── react@18.2.0/
│   │   └── node_modules/
│   │       └── react -> ../../../../store/react@18.2.0/node_modules/react
│   ├── react-dom@18.2.0/
│   │   └── node_modules/
│   │       ├── react -> ../../../react@18.2.0/node_modules/react  # 共享！
│   │       └── scheduler@0.23.0 -> ...
│   └── scheduler@0.23.0/
│       └── ...
├── react -> .pnpm/react@18.2.0/node_modules/react       # 符号链接
├── react-dom -> .pnpm/react-dom@18.2.0/node_modules/react-dom
└── lodash -> .pnpm/lodash@4.17.21/node_modules/lodash
```

#### pnpm 存储模型图解

```
┌────────────────────────────────────────────────────────────┐
│                    pnpm 全局存储（~/.pnpm-store）             │
│                                                            │
│  react@18.2.0/  ─┐                                         │
│  ┌─────────────┐ │    ┌──────────────────────────┐        │
│  │  实际文件    │ ├────│  硬链接（hard link）       │        │
│  │  只存一份！  │ │    │  多个项目共享同一份数据    │        │
│  └─────────────┘ │    └──────────────────────────┘        │
│                   │                                         │
│  lodash@4.17.21/ ─┤    ┌──────────────────────────┐        │
│  ┌─────────────┐ ├────│  项目 A 的 node_modules    │        │
│  │  实际文件    │ │    │  ┌─────────────────────┐  │        │
│  └─────────────┘ │    │  │ react -> (.pnpm/) symlink │     │
│                   │    │  │ lodash -> (.pnpm/) symlink│    │
│                   │    │  └─────────────────────┘  │        │
│                   │    └──────────────────────────┘        │
│                   │                                         │
│                   │    ┌──────────────────────────┐        │
│                   ├────│  项目 B 的 node_modules    │        │
│                   │    │  （同样的硬链接指向同一份）  │        │
│                   │    └──────────────────────────┘        │
└────────────────────────────────────────────────────────────┘
```

#### pnpm 核心优势

| 优势 | 说明 |
|------|------|
| **磁盘空间节省** | 全局存储只保留一份，项目间硬链接共享 |
| **安装速度快** | 相比 npm/yarn 快 2-5 倍 |
| **杜绝 phantom dependencies** | 严格的依赖结构，只能访问声明过的依赖 |
| **安全性高** | `.pnpm` 目录保护，避免非声明依赖的非法访问 |

### 3.4 三者全面对比

| 对比维度 | npm (v10) | yarn (v1/berry) | pnpm (v9) |
|----------|-----------|------------------|-----------|
| **安装速度** | 基准 | 比 npm 快约 20% | **最快（2-5x npm）** |
| **磁盘占用** | 基准（扁平结构重复多） | 类似 npm | **最少（硬链接共享）** |
| **node_modules 结构** | 扁平化 | 扁平化 | **符号链接 + 内容寻址** |
| **Phantom Deps** | 存在问题 | 存在问题 | **不存在** |
| **Monorepo 内置** | workspaces | workspaces | **workspaces（更优）** |
| **锁定文件** | `package-lock.json` | `yarn.lock` | `pnpm-lock.yaml` |
| **生态兼容性** | 最佳 | 很好 | 好（偶有兼容问题） |

### 3.5 依赖管理策略

#### package.json 依赖分类

```json
{
  "dependencies": {
    "vue": "^3.4.0",           // 生产依赖：运行时必需
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",    // 开发依赖：仅开发/构建时需要
    "vite": "^5.0.0",
    "eslint": "^9.0.0",
    "@types/node": "^20.0.0"   // 类型定义也是 devDep
  },
  "peerDependencies": {
    "react": ">=17.0.0"        // 对等依赖：宿主环境必须提供（插件场景）
  },
  "optionalDependencies": {
    "fsevents": "^2.3.0"       // 可选依赖：安装失败不影响整体
  },
  "bundleDependencies": []     // 打捆依赖（很少用）
}
```

#### 语义化版本（Semver）

```
版本号格式：MAJOR.MINOR.PATCH（主版本.次版本.修订号）

^1.2.3  := >=1.2.3  <2.0.0    // ^：兼容次版本变更（最常用）
~1.2.3  := >=1.2.3  <1.3.0    // ~：仅允许补丁版本变更
1.2.3   := =1.2.3             // 精确匹配
* / x   := 最新版本             // 任意版本（危险！）
>=1.0.0 <2.0.0                 // 范围指定
```

### 3.6 Monorepo 包管理

```json
// ========== 根目录 package.json（Monorepo 配置）==========
{
  "name": "my-monorepo",
  "private": true,               // 私有包，不发布到 npm
  "type": "module",              // 使用 ESM
  "scripts": {
    "dev": "turbo run dev",      // 所有包并行启动 dev server
    "build": "turbo run build",  // 所有包按依赖顺序构建
    "test": "turbo run test",    // 所有包并行跑测试
    "lint": "eslint packages/*/src/**/*.{ts,vue}"  // 统一代码检查
  },
  "devDependencies": {
    "turbo": "^2.0.0"            // Turborepo 任务编排工具
  }
}
```

---

## 第四章：Webpack 构建工具基础

> **本章要点速查**：
> | 概念 | 作用 | 对应配置 |
> |------|------|----------|
> | Entry | 构建入口 | `entry: './src/main.js'` |
> | Output | 输出配置 | `output: { path, filename }` |
> | Loader | 文件转换 | `module.rules[{ test, use }]` |
> | Plugin | 功能扩展 | `plugins: [new XxxPlugin()]` |
> | Mode | 构建模式 | `mode: 'development' \| 'production'` |

### 4.1 为什么需要构建工具

现代前端开发使用了大量浏览器不直接支持的语法和特性，需要构建工具进行转换：

```
源代码（开发者编写）
  ├── TypeScript / JSX / Vue SFC    → 需要编译为 JS
  ├── Sass / Less / Tailwind        → 需要编译为 CSS
  ├── 图片 / 字体 / SVG             → 需要压缩和优化
  ├── ESNext+ 语法                   → 需要转译为 ES5 兼容
  ├── import / export 模块化         → 需要打包为浏览器可执行
  └── 环境变量 / 别名路径            → 需要在构建时替换
       ↓
  构建工具（Webpack/Vite/esbuild）
       ↓
  输出产物（浏览器可运行）
  ├── bundle.js（压缩混淆后的 JS）
  ├── style.css（压缩后的 CSS）
  ├── *.hash.png（带 hash 的优化图片）
  └── index.html（注入了资源的 HTML）
```

### 4.2 Webpack 核心概念

```
┌─────────────────────────────────────────────────────────────┐
│                      Webpack 工作流程                        │
│                                                             │
│  Entry（入口）                                               │
│    ↓                                                        │
│  ┌──────────────────────────────────────────────────┐       │
│  │            Module Graph（模块依赖图）               │       │
│  │                                                   │       │
│  │   main.js ──import──→ utils.js                    │       │
│  │      │                    │                       │       │
│  │      ├──import──→ App.vue  ├──import──→ axios     │       │
│  │      │                                            │       │
│  │      └──import──→ styles.scss                     │       │
│  └──────────────────────────────────────────────────┘       │
│    ↓                                                        │
│  Loader（逐个转换模块）                                       │
│    ├── .vue 文件 → vue-loader → JS + CSS + 模板             │
│    ├── .scss 文件 → sass-loader → CSS                       │
│    ├── .ts 文件 → ts-loader → JS                            │
│    └── .png 文件 → asset-loader → data URL / 文件           │
│    ↓                                                        │
│  Plugin（扩展功能钩子）                                       │
│    ├── HtmlWebpackPlugin → 生成 index.html                  │
│    ├── MiniCssExtractPlugin → 提取 CSS 为独立文件            │
│    ├── DefinePlugin → 定义环境变量                           │
│    └── ForkTsCheckerWebpackPlugin → 类型检查                │
│    ↓                                                        │
│  Output（输出产物）                                           │
│    ├── dist/main.[hash].js                                   │
│    ├── dist/style.[hash].css                                │
│    └── dist/index.html                                      │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 Entry 入口配置

```javascript
// webpack.config.js
module.exports = {
  // ========== 方式一：单入口（字符串）==========
  entry: './src/main.js',             // 最简形式，打包为一个 bundle

  // ========== 方式二：单入口（数组）==========
  entry: ['./src/polyfill.js', './src/main.js'],
  // 数组中的多个入口会被合并到一个 chunk 中

  // ========== 方式三：多入口（对象）— 推荐 ==========
  entry: {
    main: './src/main.js',           // 主应用入口
    admin: './src/admin.js',         // 管理后台独立入口
    vendor: ['vue', 'router', 'pinia']  // 第三方库单独打包
  },

  output: {
    filename: '[name].[contenthash:8].js'  // [name] 替换为入口名称
  }
}
```

### 4.4 Output 输出配置

```javascript
const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),  // 输出目录（绝对路径）

    filename: (pathData) => {              // 动态文件名（函数形式）
      return pathData.chunk.name === 'main'
        ? 'js/[name].[contenthash:8].js'
        : 'js/[name].[fullhash:8].js'
    },

    publicPath: '/',                      // 公共路径（CDN 时改为 CDN 地址）
    clean: true,                          // 每次构建清空 dist 目录
    assetModuleFilename: 'assets/[hash][ext]'  // 静态资源输出路径
  }
}
```

### 4.5 Loader 模块转换器

Loader 用于对源文件的**转换**（从左到右、从下到上执行）：

```javascript
module.exports = {
  module: {
    rules: [
      // ========== 规则 1：处理 TypeScript ==========
      {
        test: /\.tsx?$/,                   // 匹配 .ts/.tsx 文件
        exclude: /node_modules/,           // 排除 node_modules
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true            // 仅转译不做类型检查（加速构建）
          }
        }]
      },

      // ========== 规则 2：处理 Vue 单文件组件 ==========
      {
        test: /\.vue$/,
        use: 'vue-loader'                  // vue-loader 处理 .vue 文件
      },

      // ========== 规则 3：处理样式（loader 链，从右到左执行）==========
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',              // ① 将 CSS 注入到 DOM（开发模式）
          {
            loader: 'css-loader',          // ② 解析 @import 和 url()
            options: { esModule: false }   // 避免 css-modules 问题
          },
          'postcss-loader',                // ③ PostCSS 处理（autoprefixer 等）
          {                                // ④ SCSS → CSS 编译
            loader: 'sass-loader',
            options: {
              additionalData: `@use "@/styles/variables" as *;`  // 全局变量注入
            }
          }
        ]  // 执行顺序：④ → ③ → ② → ①
      },

      // ========== 规则 4：处理静态资源 ==========
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',                     // Webpack5 内置资源模块
        parser: {
          dataUrlCondition: { maxSize: 8 * 1024 }  // < 8KB 转 base64
        },
        generator: {
          filename: 'images/[hash][ext]'   // 大文件输出路径
        }
      }
    ]
  }
}
```

### 4.6 Plugin 扩展机制

Plugin 可以监听 Webpack 构建生命周期中的各个钩子（Hook），执行自定义逻辑：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DefinePlugin } = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  plugins: [
    new VueLoaderPlugin(),                 // Vue Loader 必需插件

    new HtmlWebpackPlugin({
      template: './public/index.html',    // HTML 模板文件
      title: 'My App',
      favicon: './public/favicon.ico',
      minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true,
        removeComments: true
      } : false
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),

    new DefinePlugin({                     // 环境变量注入
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VITE_API_BASE: JSON.stringify(process.env.VITE_API_BASE || '/api')
      }
    })
  ]
}
```

### 4.7 Mode 模式配置

```javascript
module.exports = {
  mode: process.env.NODE_ENV || 'development',

  // mode: 'development' 默认效果：
  //   开启 source map、不压缩、不 Tree Shaking、有用错误提示、快速增量构建

  // mode: 'production' 默认效果：
  //   全部优化（压缩/Tree Shaking/作用域提升）、关闭 source map、标识符最小化
}
```

### 4.8 最小化完整配置示例

```javascript
// webpack.config.js — Vue3 + TypeScript 完整配置
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/main.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash:8].js',
    publicPath: '/',
    clean: true
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),  // @ 映射到 src 目录
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  },

  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.ts$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader', 'postcss-loader', 'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8192 } }
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:8].css' })]
      : []
    ),
    new DefinePlugin({ 'process.env.BASE_URL': JSON.stringify('/') })
  ],

  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,             // SPA 路由 fallback
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, '')
      }
    }
  },

  devtool: process.env.NODE_ENV === 'production'
    ? 'hidden-source-map'
    : 'eval-cheap-module-source-map'
}
```

---

## 第五章：Webpack 高级特性与优化

> **本章要点速查**：
> | 优化项 | 目标 | 核心手段 |
> |--------|------|----------|
> | 代码分割 | 减少首屏体积 | `splitChunks` / 动态 `import()` |
> | Tree Shaking | 消除死代码 | ESM + `sideEffects` 标记 |
> | HMR | 开发体验 | `devServer.hot` + module.accept |
> | 缓存 | 利用浏览器缓存 | `[contenthash]` + 持久化缓存 |
> | Source Map | 调试定位 | 不同 devtool 策略选择 |

### 5.1 代码分割 Code Splitting

代码分割是将一个大的 bundle 拆分成多个较小的文件，实现**按需加载**：

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',                      // 同步 + 异步都分割

      minSize: 20000,                     // 最小 20KB 才分割
      maxSize: 244000,                    // 最大 244KB（超了继续拆）
      minChunks: 1,

      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,  // 匹配 node_modules
          priority: 10,                    // 最高优先级
          name: 'vendors',
          reuseExistingChunk: true
        },

        common: {
          minChunks: 2,                    // 至少 2 个 chunk 引用才提取
          priority: 5,
          name: 'common',
          reuseExistingChunk: true
        },

        vueCore: {
          test: /[\\/]node_modules[\\/](vue|vue-router|pinia)[\\/]/,
          priority: 20,
          name: 'vue-core'
        }
      }
    }
  }
}
```

#### 动态 import() 语法

```javascript
// 路由懒加载（最常见的代码分割场景）
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
      //   ↑ 动态 import() 返回 Promise
      //     /* webpackChunkName */ 注释指定 chunk 名
    },
    {
      path: '/about',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]
})

// 条件加载（按环境加载不同模块）
if (process.env.NODE_ENV === 'development') {
  import('@vue/devtools').then(module => {
    module.default.connect()
  })
}
```

### 5.2 Tree Shaking 死码消除

Tree Shaking 基于 ESM 的**静态结构**，在构建时删除未被使用的导出：

```javascript
// utils.js
export function usedFunction() {
  return 'I am used!'                     // ✅ 保留
}

export function unusedFunction() {
  return 'I am NOT used!'                 // ⚠️ 被 Tree Shaking 删除
}

export const SOME_CONSTANT = 42           // 未使用也会被删除
```

#### sideEffects 配置

```json
// package.json — 声明是否有副作用
{
  "sideEffects": ["*.css", "./src/global-polyfills.js"]
  // "sideEffects": false  → 整个包无副作用，可放心 Tree Shake
}
```

```javascript
// webpack.config.js — 确保 production 模式开启
optimization: {
  usedExports: true,                     // 标记未使用的导出
  sideEffects: true,                     // 根据 sideEffects 跳过无副作用模块
  minimize: true                        // 压缩删除死代码
}
```

### 5.3 HMR 热模块替换

HMR 在应用运行时替换、添加或删除模块，**无需刷新页面**：

```javascript
// webpack.config.js
devServer: {
  hot: true                             // 开启 HMR（默认开启）
}
```

```javascript
// 手动接受 HMR 更新
if (module.hot) {
  module.hot.accept('./App.vue', () => {
    console.log('App.vue has been updated!')
  })

  module.hot.dispose(() => {
    console.log('About to replace the old module')
  })
}
```

### 5.4 缓存优化策略

```javascript
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  output: {
    filename: 'js/[name].[contenthash:8].js'  // 内容 hash（内容不变 hash 不变）
  },

  optimization: {
    runtimeChunk: 'single',               // runtime 提取为独立文件
    moduleIds: 'deterministic',            // 确定的 module id

    minimizer: [new TerserPlugin({
      parallel: true,                      // 多线程压缩
      extractComments: false,
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',  // 生产去掉 console
          drop_debugger: true
        }
      }
    })],

    // Webpack5 持久化缓存
    cache: {
      type: 'filesystem',                  // 使用文件系统缓存
      buildDependencies: { config: [__filename] },
      version: '1.0.0'
    }
  }
}
```

### 5.5 Source Map 配置

| devtool 值 | 构建速度 | 质量 | 适用场景 |
|------------|----------|------|----------|
| `eval` | 最快 | 差 | 快速开发调试 |
| `eval-cheap-source-map` | 快 | 一般 | 开发环境 |
| `eval-cheap-module-source-map` | 中等 | 好 | **开发推荐** |
| `source-map` | 慢 | 最好 | 生产调试 |
| `hidden-source-map` | 慢 | 好 | Sentry 上传用 |
| `nosources-source-map` | 慢 | 无源码 | **生产推荐** |

### 5.6 构建性能优化

```javascript
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.vue', '.js'],
    alias: { '@': path.resolve(__dirname, 'src') }
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        { loader: 'thread-loader', options: { workers: 3 } },  // 多线程
        { loader: 'babel-loader', options: { cacheDirectory: true } }  // 缓存
      ]
    }]
  },

  externals: {                           // 外部化大型库（CDN 加载）
    vue: 'Vue',
    'vue-router': 'VueRouter',
    pinia: 'Pinia'
  }
}
```

### 5.7 Webpack 5 新特性

#### Module Federation（模块联邦）

Module Federation 允许不同的 Webpack 构建**动态共享代码**：

```javascript
// host 应用（消费者）
const { ModuleFederationPlugin } = require('webpack').container

plugins: [
  new ModuleFederationPlugin({
    name: 'host',
    remotes: {
      remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js'
    }
  })
]

// 使用远程模块
import('./remoteApp/Header').then(({ default: Header }) => {
  app.component('RemoteHeader', Header)
})
```

```javascript
// remote 应用（提供者）
plugins: [
  new ModuleFederationPlugin({
    name: 'remoteApp',
    filename: 'remoteEntry.js',
    exposes: {
      './Header': './src/components/Header.vue',
      './Button': './src/components/Button.vue'
    },
    shared: {
      vue: { singleton: true, requiredVersion: '^3.4.0' },  // 单例共享
      pinia: { singleton: true }
    }
  })
]
```

#### 其他重要新特性

| 新特性 | 说明 |
|--------|------|
| **持久化缓存** | `cache.type: 'filesystem'`，二次构建提速 90% |
| **ModuleIds: deterministic** | 确定 ID，避免不必要的缓存失效 |
| **Asset Modules** | 内置资源处理（替代 file/url/raw-loader） |
| **移除 Node Polyfill** | 不再内置 Node.js 核心模块 polyfill |

---

## 第六章：Vite 原理与实战

> **本章要点速查**：
> | 阶段 | 工具 | 原理 |
> |------|------|------|
> | 开发（Dev） | 原生 ESM Server | 浏览器直接请求源码，按需编译 |
> | 生产（Build） | Rollup | 预编译，输出高度优化的静态资源 |
> | 插件 | 兼容 Rollup + 独有钩子 | `config` / `resolveId` / `load` / `transform` |

### 6.1 Vite 是什么

Vite（法语意为"快速"）核心理念——开发时不打包，利用浏览器原生 ESM：

```
传统构建工具（Webpack）开发模式：
  源码 → 全量打包 → 启动 Dev Server → 浏览器请求 bundle
  ⚠️ 无论改哪个文件，都需要重新打包整个依赖图

Vite 开发模式：
  源码 → 启动 Dev Server → 浏览器请求源码 → Vite 按需转换 → 返回
  ✅ 只处理浏览器当前请求的文件，启动秒开
```

### 6.2 开发服务器原理

```
浏览器请求 http://localhost:5173/src/main.ts
        ↓
┌──────────────────────────────────────────┐
│            Vite Dev Server               │
│                                          │
│  1. 请求拦截                             │
│     ├── 静态资源 → 直接返回              │
│     └── 模块文件 → 进入转换管道          │
│                                          │
│  2. 转换管道（Middleware 链）             │
│     ├─ 路径重写（bare imports → /@modules/）│
│     ├─ Vite 插件 transform (.vue/.ts/.scss)│
│     └─ HMR 注入（注入客户端代码）        │
│                                          │
│  3. 返回转换后的 ESM 代码给浏览器         │
└──────────────────────────────────────────┘
```

### 6.3 生产构建原理

| 对比维度 | 开发时 esbuild | 生产时 Rollup |
|----------|---------------|--------------|
| **速度** | 极快（Go 语言） | 较快（JS 编写） |
| **Tree Shaking** | 基础支持 | **更完善** |
| **CSS 处理** | 基础 | **完善**（分割/提取） |
| **代码分割** | 不支持 | **强大** |
| **插件生态** | 较少 | **丰富成熟** |

### 6.4 Vite 插件机制

```javascript
// my-vite-plugin.js — 自定义 Vite 插件
export default function myVitePlugin(options = {}) {
  return {
    name: 'vite-plugin-my-plugin',

    // Vite 独有钩子
    config(config, { command }) {
      if (command === 'serve') {
        return { server: { port: 3000 } }  // 开发模式修改端口
      }
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/hello') {
          res.end(JSON.stringify({ message: 'Hello!' }))
          return
        }
        next()
      })
    },

    transformIndexHtml(html) {
      return html.replace('</head>', '<script src="/custom-script.js"></script></head>')
    },

    // Rollup 兼容钩子（构建阶段生效）
    resolveId(source) {
      if (source === 'virtual:my-module') return source
      return null
    },

    load(id) {
      if (id === 'virtual:my-module') {
        return `export const msg = "Hello from virtual!"`
      }
      return null
    },

    transform(code, id) {
      if (id.endsWith('.ts')) {
        return { code, map: null }
      }
      return null
    }
  }
}
```

### 6.5 Vite vs Webpack 全面对比

| 对比维度 | Webpack | Vite |
|----------|---------|------|
| **核心原理** | 打包所有模块为 bundle | 开发时不打包，按需编译 ESM |
| **启动速度** | 慢（全量打包） | **极快（毫秒级）** |
| **热更新** | 较快（增量编译） | **极快（只编单个文件）** |
| **生产构建** | 成熟稳定 | Rollup 构建，同样优秀 |
| **插件生态** | **极其丰富** | 快速成长中 |
| **学习曲线** | 陡峭 | **平缓** |
| **适用场景** | 复杂企业项目 | **现代新项目首选** |

### 6.6 Vite 项目配置实战

```javascript
// vite.config.ts — Vue3 + TypeScript 完整配置
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue()],

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components')
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json']
    },

    css: {
      preprocessorOptions: {
        scss: { additionalData: `@use "@/styles/variables" as *;` }
      }
    },

    server: {
      port: 5173,
      open: true,
      cors: true,
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_API_TARGET || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },

    build: {
      outDir: 'dist',
      sourcemap: command === 'serve',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'pinia'],
            'utils': ['lodash-es', 'dayjs']
          }
        }
      },
      target: 'es2020',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true
        }
      }
    },

    envPrefix: 'VITE_'
  }
})
```

### 6.7 Webpack 迁移到 Vite

```javascript
// 迁移检查清单：
//
// 1. ✅ package.json 使用 ESM（"type": "module" 或保持 CJS）
// 2. ✅ index.html 移到项目根目录
// 3. ✅ 静态资源引用改为绝对路径（以 / 开头）
// 4. ✅ process.env → import.meta.env
// 5. ✅ require() → import
// 6. ✅ Webpack 特有语法替换：
//    • require.context() → import.meta.glob()
//    • require.ensure() → dynamic import()
//    • webpackChunkName → manualChunks
// 7. ✅ 替换 Loader 为 Vite/Rollup 插件
// 8. ✅ 添加 vite.config.ts

// import.meta.glob 示例（替代 require.context）
// Webpack: const modules = require.context('./modules', false, /\.ts$/)
// Vite:
const modules = import.meta.glob('./modules/*.ts', { eager: true })
const routes = Object.values(modules).map(mod => mod.default)
```

---

## 第七章：其他构建工具概览

> **本章要点速查**：
> | 工具 | 语言 | 核心优势 | 适用场景 |
> |------|------|----------|----------|
> | esbuild | Go | **极速编译**（100x faster than babel） | 作为底层编译器 |
> | Parcel | Rust/JS | **零配置** | 快速原型/小型项目 |
> | Rspack | Rust | **Webpack 兼容** | Webpack 项目无痛迁移 |
> | Turbopack | Rust | **Vite 团队出品** | Next.js / 未来 Vite |

### 7.1 esbuild：极致速度的打包器

esbuild 用 Go 语言编写，编译速度极快：

```
esbuild 速度对比（官方基准测试）：
  • 打包 10 份 three.js：esbuild 0.29s vs webpack 15.37s（53x）
  • 编译 10 个 JSX+TS 文件：esbuild 0.03s vs babel 0.44s（15x）
  • 生产构建：esbuild 0.09s vs parcel 3.68s（41x）
```

**esbuild 在生态中的角色**：通常不直接用作主构建工具，而是作为**底层编译器**被 Vite/Webpack/Rspack 等调用。

### 7.2 Parcel：零配置构建工具

Parcel 的卖点是真正的**零配置**——无需任何配置文件即可工作：

```bash
# 安装与使用
npm install -D parcel
parcel serve src/index.html              # 开发模式（零配置启动）
parcel build src/index.html              # 生产构建
```

### 7.3 Rspack：Rust 驱动的 Webpack 兼容方案

Rspack 由字节跳动团队开发，**兼容 Webpack 配置**但用 Rust 实现：

| 特性 | 说明 |
|------|------|
| **Webpack 兼容** | Loader / Plugin / 配置基本兼容 |
| **Rust 性能** | 构建 5-10x faster than Webpack |
| **增量构建** | 冷启动和 HMR 都非常快 |
| **迁移成本低** | 大多数项目只需替换 `@rspack/cli` |

### 7.4 Turbopack：Vite 团队的下一代构建工具

Turbopack 由 Vite/Rollup 作者为 Next.js 开发，基于 Rust：

| 特性 | 说明 |
|------|------|
| **增量计算引擎** | 基于 Turbo 引擎的重算机制 |
| **原生 TS 支持** | 无需额外配置即可处理 TypeScript |
| **Next.js 集成** | 目前主要用于 Next.js（`next dev --turbo`） |
| **未来方向** | 可能成为独立的通用构建工具 |

### 7.5 构建工具选型指南

```
如何选择构建工具？

  新项目（Vue/React）？
    ├── 追求最佳开发体验 → Vite（推荐 ✅✅✅）
    ├── 需要 Webpack 生态兼容 → Rspack
    └── 快速原型验证 → Parcel

  已有 Webpack 项目想提速？
    ├── 保持兼容 → Rspack（迁移成本最低）
    └── 愿意重构 → Vite

  大型 Monorepo 项目？
    ├── Turborepo + Turbopack（实验中）
    └── Vite + pnpm workspace（稳定可靠 ✅）

  库/包发布？
    └── Rollup（直接使用，Tree Shaking 最佳）
```

---

## 第八章：代码规范与质量保障

> **本章要点速查**：
> | 工具 | 职责 | 配置文件 |
> |------|------|----------|
> | ESLint | 代码质量检查（潜在 bug / 风格） | `.eslintrc.*` |
> | Prettier | 代码格式化（缩进 / 引号 / 分号等） | `.prettierrc` |
> | Stylelint | CSS/SCSS 样式检查 | `.stylelintrc.*` |
> | Husky | Git Hooks 管理 | `.husky/` |
> | lint-staged | 暂存区文件过滤 | `lint-staged.config.*` |
> | commitlint | Commit 信息规范 | `commitlint.config.*` |

### 8.1 ESLint 代码检查

ESLint 通过**静态分析 AST（抽象语法树）**来检查代码质量问题：

```javascript
// .eslintrc.cjs — ESLint 配置（Vue3 + TypeScript 项目）
module.exports = {
  root: true,                             // 停止向上查找配置文件
  env: {                                  // 预定义的全局变量
    browser: true,                        // 浏览器 API
    node: true,                           // Node.js API
    es2021: true                          // ES2021 语法
  },
  extends: [
    'eslint:recommended',                 // ESLint 推荐规则
    'plugin:vue/vue3-essential',          // Vue3 基本规则
    'plugin:@typescript-eslint/recommended',  // TS 推荐规则
    'plugin:prettier/recommended'         // 关闭与 Prettier 冲突的规则
  ],
  parser: 'vue-eslint-parser',            // Vue 文件的解析器
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',                 // 使用 ESM
    parser: '@typescript-eslint/parser'   // TS 文件用 TS 解析器
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern': '^_'             // 忽略 _ 开头的参数
    }],
    'prefer-const': 'error',              // 应该用 const 时强制使用
    'no-var': 'error'                     // 禁止 var
  },
  globals: {                              // 额外的全局变量声明
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
```

#### ESLint 工作原理

```
源代码 → Parser 解析为 AST → 遍历 AST 节点（Rule 匹配）→ 报告问题
```

### 8.2 Prettier 代码格式化

Prettier 是 **opinionated（有主见的）** 格式化工具：

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "all",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "vueIndentScriptAndStyle": false
}
```

**ESLint vs Prettier 职责划分**：

| 维度 | ESLint | Prettier |
|------|--------|----------|
| **关注点** | 代码**质量**（bug/逻辑） | 代码**格式**（外观风格） |
| **典型规则** | no-unused-vars / no-eq-null | singleQuote / semi / tabWidth |
| **可配置性** | 高度可自定义 | 低（opinionated） |
| **协作方式** | eslint-config-prettier 关闭冲突 | 独立运行 |

### 8.3 Stylelint 样式检查

```javascript
// .stylelintrc.cjs — Stylelint 配置
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
  overrides: [{
    files: ['**/*.scss'],
    customSyntax: 'postcss-scss'
  }],
  rules: {
    'color-hex-length': 'short',
    'selector-class-pattern': null,
    'no-descending-specificity': true,
    'declaration-block-no-duplicate-properties': [true, {
      ignore: ['consecutive-duplicates-with-different-values']
    }]
  }
}
```

### 8.4 Git Hooks 自动化

```bash
# 安装 Husky（Git Hooks 管理工具）
npm install -D husky
npx husky init                           # 创建 .husky/ 目录

# 添加具体的 Hook
npx husky add .husky/pre-commit "npx lint-staged"       # 提交前 lint
npx husky add .husky/commit-msg "npx --no commitlint --edit $1"  # commit 格式校验
```

### 8.5 Commit 规范校验

```javascript
// commitlint.config.cjs — Commit 信息规范配置
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'chore', 'ci', 'revert', 'build'
    ]]
  }
}
```

### 8.6 编辑器统一配置

```ini
# .editorconfig — 编辑器统一配置（VSCode/WebStorm/IDE 都支持）
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false         # Markdown 保留行尾空格

[*.{js,ts,vue,json}]
indent_size = 2
```

```json
// .vscode/settings.json — VSCode 工作区设置
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  }
}
```

### 8.7 完整工作流整合

```
完整的代码规范工作流：

  开发者编辑代码 → 保存
    ↓ VSCode 自动触发：Prettier 格式化 + ESLint 自动修复
  git add（暂存）
    ↓ git commit
  Husky → pre-commit hook
    ↓ lint-staged：eslint + prettier + stylelint
  commitlint 校验 commit message
    ↓ 通过
  提交成功 ✅
    ↓ git push
  CI Pipeline：完整 Lint + TypeCheck + Test + Build
    ↓ 全部通过
  合并/部署 ✅
```

---

## 第九章：CSS 工程化方案

> **本章要点速查**：
> | 方案 | 类型 | 特点 | 适用场景 |
> |------|------|------|----------|
> | Sass/Less | 预处理器 | 变量/混合/嵌套 | 传统项目首选 |
> | CSS Modules | 模块化 | 作用域隔离（hash 类名） | 中大型项目 |
> | CSS-in-JS | 运行时 | 动态样式 / 主题切换 | 高度动态主题 |
> | Tailwind CSS | 原子化 | utility-first | 快速开发 / 设计系统 |
> | PostCSS | 转换平台 | 插件生态（autoprefixer 等） | 几乎所有项目的底层 |

### 9.1 CSS 预处理器

```scss
// variables.scss — 全局变量
$primary-color: #409eff;
$success-color: #67c23a;
$border-radius-base: 4px;
$breakpoints: (
  'sm': 640px,
  'md': 768px,
  'lg': 1024px
);

// mixins.scss — 常用混合
@mixin flex-center {                      // 居中布局 mixin
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin respond-to($breakpoint) {          // 响应式 mixin
  @if map-has-key($breakpoints, $breakpoint) {
    @media (max-width: map-get($breakpoints, $breakpoint)) {
      @content;                          // 占位符，传入的内容块
    }
  }
}

// 使用示例
.button {
  display: inline-flex;
  padding: 8px 16px;
  background-color: $primary-color;
  border-radius: $border-radius-base;
  @include flex-center;

  &:hover {
    background-color: darken($primary-color, 10%);
  }

  @include respond-to('sm') {
    width: 100%;                          // 小屏幕下宽度 100%
  }
}
```

### 9.2 CSS Modules 模块化

CSS Modules 通过将类名编译为**唯一的哈希值**来实现作用域隔离：

```vue
<!-- Button.vue — CSS Modules 使用 -->
<template>
  <button :class="[styles.btn, styles[size], { [styles.active]: isActive }]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import styles from './Button.module.scss'

interface Props {
  size?: 'small' | 'medium' | 'large'
  active?: boolean
}
const props = withDefaults(defineProps<Props>(), { size: 'medium', active: false })
</script>

<style module lang="scss">
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &.active { background-color: var(--primary); color: white; }
}
.small { font-size: 12px; }
.medium { font-size: 14px; }
.large { font-size: 16px; }
</style>
```

编译后的 CSS 类名变为 `Button_btn_1a2b3c` 这样的唯一哈希值，避免全局冲突。

### 9.3 CSS-in-JS 方案

```tsx
import styled from 'styled-components'

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${({ $size }) => ($size === 'large' ? '12px 24px' : '8px 16px')};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: ${({ $variant }) =>
    $variant === 'secondary' ? '#6c757d' : '#409eff'};
  &:hover { opacity: 0.9; }
`

<Button $variant="primary" $size="large">Click me</Button>
```

### 9.4 Tailwind CSS 原子化框架

Tailwind 采用 **utility-first**（实用优先）理念：

```vue
<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <Card class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Title</h1>
      <p class="text-sm text-gray-600 leading-relaxed mb-6">Content...</p>
      <button class="w-full px-4 py-2 bg-blue-500 text-white rounded
                         hover:bg-blue-600 transition-colors">Submit</button>
    </Card>
  </div>
</template>
```

**优点**：不需写 CSS 文件、设计一致性天然保证、生产构建自动 purge（体积极小）、响应式内联书写。

### 9.5 PostCSS 转换生态

PostCSS 是 CSS 的 **Babel**——用 JS 插件转换 CSS：

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')({            // 自动添加浏览器前缀
      overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead']
    }),
    ...(process.env.NODE_ENV === 'production'
      ? [require('cssnano')({ preset: 'default' })]  // CSS nano 压缩
      : []
    ),
    require('postcss-custom-properties')({ preserve: true }),
    require('postcss-import')             // @import 合并
  ]
}
```

### 9.6 CSS 方案选型建议

```
如何选择 CSS 方案？

  需要强作用域隔离？   → CSS Modules（推荐 ✅）
  需要高度动态主题？   → CSS-in-JS（styled-components）
  追求极致开发速度？   → Tailwind CSS（推荐 ✅）
  传统项目渐进增强？   → Sass + BEM 命名
  需要灵活的转换能力？ → PostCSS（通常与其他方案搭配）

  Vue 项目推荐组合：Sass + CSS Modules + PostCSS
  React 项目推荐组合：Tailwind CSS + CSS Modules（混合使用）
```

---

## 第十章：Git 工作流与协作规范

> **本章要点速查**：
> | 策略 | 特点 | 适用团队规模 |
> |------|------|-------------|
> | **Git Flow** | 严谨的多分支模型，release 分支 | 中大型 / 需要版本发布 |
> | **GitHub Flow** | 简洁的 feature 分支 PR | 小中型 / 持续部署 |
> | **Trunk Based** | 短生命周期分支，频繁合入主干 | 大型 / 高频发布 |

### 10.1 分支管理策略

#### Git Flow（经典模型）

```
Git Flow 分支模型：

  main（生产分支）
    │  ← 只接受来自 release 和 hotfix 的合并
    │
  develop（开发分支）
    │  ← 日常开发的集成分支
    │
    ├── feature/login（功能分支）     → 合并到 develop
    ├── feature/dashboard            → 合并到 develop
    │
  release/v1.2.0（发布分支）
    │  ← 从 develop 创建，用于发布准备
    │  ← 测试通过后合并到 main + develop
    │
  hotfix/v1.2.1（热修复分支）
       ← 从 main 创建，紧急修复后合并到 main + develop
```

#### GitHub Flow（简化模型）

```
GitHub Flow：

  main（主干分支，始终保持可部署状态）
    │
    ├── feature/new-ui     → PR → Code Review → 合并到 main
    ├── fix/typo           → PR → Code Review → 合并到 main
    └── 每次 PR 合并后自动触发 CI/CD 部署
```

#### Trunk Based Development

```
Trunk Based：

  main（唯一长期分支）
    ├── 开发者 A 的短周期分支（存活 < 1 天）→ 快速合入
    ├── 开发者 B 的短周期分支               → 快速合入
    └── 特性开关（Feature Flags）控制未完成功能的可见性
```

### 10.2 Conventional Commits 规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

| Type | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat(auth): 添加登录功能` |
| `fix` | 修复 Bug | `fix(login): 修复 token 过期未跳转` |
| `docs` | 文档变更 | `docs(readme): 更新安装步骤` |
| `style` | 格式调整 | `style(button): 调整按钮间距` |
| `refactor` | 重构 | `refactor(utils): 简化日期格式化函数` |
| `perf` | 性能优化 | `perf(list): 虚拟列表滚动优化` |
| `test` | 测试相关 | `test(user): 添加用户服务单元测试` |
| `chore` | 构建/工具/依赖 | `chore(deps): 升级 vue 到 3.4.0` |
| `ci` | CI/CD 配置 | `ci(github): 添加 staging 部署 workflow` |
| `revert` | 回滚提交 | `revert(feat(login))` |
| `build` | 构建系统 | `build(webpack): 添加生产环境配置)` |

#### 实际案例

```
feat(user): 添加用户权限管理模块

- 新增 RolePermission 组件
- 新增 permission API 接口
- 添加 RBAC 权限判断工具函数

Closes #123
```

### 10.3 Git Hooks 应用场景

```bash
# .husky/pre-commit — 提交前检查
#!/usr/bin/env sh
echo "🔍 Running pre-commit checks..."
npx lint-staged                              # 运行 lint-staged

# .husky/commit-msg — 提交信息格式检查
#!/usr/bin/env sh
npx commitlint --edit $1                     # 校验 commit message

# .husky/pre-push — 推送前检查
#!/usr/bin/env sh
echo "🧪 Running tests before push..."
npm run test:unit                             # 推送前跑单元测试
```

### 10.4 Merge / Rebase / Squash 选择

| 操作 | 效果 | 适用场景 |
|------|------|----------|
| **Merge** | 保留完整历史，生成 merge commit | 公共分支 / 希望保留上下文 |
| **Rebase** | 线性历史，变基到目标分支最新 | 个人分支整理 / 清洁历史 |
| **Squash** | 多个 commit 压缩为一个 | PR 合并时（推荐 ✅） |

### 10.5 Changelog 自动生成

```bash
# 安装 standard-version（基于 Conventional Commits 自动生成 Changelog）
npm install -D standard-version

# package.json scripts
{
  "scripts": {
    "release": "standard-version",            # 自动升级版本号 + 生成 Changelog
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major"
  }
}
# 运行 npm run release 后：
#   - 根据 commit type 自动升级版本号
#   - 更新 package.json version
#   - 生成 CHANGELOG.md（含本次所有 commit 分类汇总）
#   - 创建 git tag
```

---

## 第十一章：CI/CD 持续集成与部署

> **本章要点速查**：
> | 平台 | 配置格式 | 特点 |
> |------|----------|------|
> | GitHub Actions | YAML（`.github/workflows/*.yml`） | 与 GitHub 深度集成 |
> | GitLab CI | YAML（`.gitlab-ci.yml`） | 自托管友好 |
> | Jenkins | Groovy（`Jenkinsfile`） | 高度可定制、老牌 |

### 11.1 CI/CD 基础概念

```
CI/CD 流水线全景：

  代码提交（git push）
       ↓
  ┌─────────────────────────────────────────────┐
  │  CI（Continuous Integration 持续集成）        │
  │                                             │
  │  ① Checkout 代码拉取                         │
  │  ② Install   依赖安装                        │
  │  ③ Lint      代码检查                        │
  │  ④ TypeCheck 类型检查                       │
  │  ⑤ Test      单元测试 + E2E                  │
  │  ⑥ Build     构建产物                        │
  │                                             │
  │  任一步骤失败 → 通知开发者 → 阻止合并         │
  └─────────────────────────────────────────────┘
       ↓ 全部通过
  ┌─────────────────────────────────────────────┐
  │  CD（Continuous Deployment 持续部署）         │
  │                                             │
  │  ⑦ 部署到 Staging（预发布环境）              │
  │  ⑧ Staging E2E 测试                         │
  │  ⑨ 部署到 Production（生产环境）             │
  │  ⑩ 通知相关人员 + 回滚机制                   │
  └─────────────────────────────────────────────┘
```

### 11.2 GitHub Actions 实战

```yaml
# .github/workflows/ci.yml — 前端 CI/CD 完整流水线
name: Frontend CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

concurrency:                                   # 并发控制
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

env:
  NODE_VERSION: '20'
  PNPM_VERSION: '9'

jobs:
  # ========== Job 1: 代码质量检查 ==========
  lint-and-typecheck:
    name: Lint & TypeCheck
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint                        # ESLint 检查
      - run: pnpm type-check                  # TypeScript 类型检查

  # ========== Job 2: 测试 ==========
  test:
    name: Unit Tests
    runs-on: ubuntu-latest
    needs: lint-and-typecheck                # 依赖 lint 通过
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:unit --coverage
      - name: Upload coverage                 # 上传覆盖率到 Codecov
        uses: codecov/codecov-action@v4
        with:
          fail_ci_if_error: false

  # ========== Job 3: 构建与部署 ==========
  build-and-deploy:
    name: Build & Deploy
    runs-on: ubuntu-latest
    needs: test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    # 仅在 main 分支 push 时部署
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - name: Build project
        run: pnpm build
        env:
          NODE_ENV: production
      - name: Deploy to server
        run: echo "🚀 Deploying to production..."
      - name: Notify success
        if: success()
        run: echo "🚀 Deployment successful!"
```

### 11.3 其他 CI 平台概览

| 平台 | 配置文件 | 优势 | 劣势 |
|------|----------|------|------|
| **GitHub Actions** | `.github/workflows/*.yml` | 与 GitHub 深度集成、免费额度充足 | 仅限 GitHub |
| **GitLab CI** | `.gitlab-ci.yml` | 自托管友好、内置 Docker | 配置较复杂 |
| **Jenkins** | `Jenkinsfile` | 高度可定制、插件丰富 | 维护成本高 |
| **CircleCI** | `.circleci/config.yml` | 配置简洁、并行能力强 | 免费额度有限 |
| **Vercel/Netlify** | `vercel.json` | **前端专用、零配置部署** | 定制性受限 |

### 11.4 前端 CI/CD 流水线设计原则

| 原则 | 说明 |
|------|------|
| **快速反馈** | lint/typecheck 应在 3 分钟内完成 |
| **分层执行** | 先质量 → 再测试 → 最后构建部署 |
| **缓存利用** | 缓存 node_modules 和构建产物 |
| **并行化** | 无依赖的任务并行执行 |
| **幂等性** | 同样的输入永远产生同样的输出 |
| **安全** | 密钥用 Secrets 管理，不要硬编码 |

### 11.5 Docker 容器化部署

```dockerfile
# Dockerfile — 前端应用容器化
# ========== 阶段 1：构建 ==========
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# ========== 阶段 2：运行（生产镜像尽可能小）==========
FROM nginx:alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", 'daemon off;']
```

```nginx
# nginx.conf — Nginx 配置（SPA 路由 + 缓存策略 + Gzip）
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location /assets/ {                    # 静态资源长期缓存
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /api/ {                      # API 反向代理
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {                          # SPA 路由 fallback
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 第十二章：Monorepo 工程实践

> **本章要点速查**：
> | 工具 | 定位 | 核心能力 |
> |------|------|----------|
> | pnpm workspace | 包管理 | 依赖管理 + 工作区 |
> | Turborepo | 任务编排 | 增量构建 + 远程缓存 |
> | Nx | 全功能平台 | 图依赖 + 代码生成 + 插件 |
> | Lerna | 包管理（历史） | 版本发布 + 变更管理 |

### 12.1 Monorepo vs MultiRepo

| 对比维度 | Monorepo | MultiRepo |
|----------|-----------|------------|
| **代码组织** | 一个仓库包含所有项目 | 每个项目独立仓库 |
| **依赖管理** | 本地包直接引用，版本统一 | 通过 npm 发布，版本可能不一致 |
| **代码共享** | 天然方便 | 需要抽包发布或复制 |
| **CI/CD** | 统一流水线 | 每个仓库独立流水线 |
| **适合场景** | 高度关联的项目群 | 独立性强的产品线 |

### 12.2 pnpm workspace

```json
// 根目录 package.json
{
  "name": "my-monorepo",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "pnpm -r --parallel run dev",
    "build": "pnpm -r run build",
    "test": "pnpm -r run test"
  }
}
```

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'                                # 应用目录
  - 'packages/*'                            # 共享包目录
  - 'tools/*'                               # 工具目录
```

```
项目结构示意：
my-monorepo/
├── pnpm-workspace.yaml
├── package.json
├── pnpm-lock.yaml                          # 统一锁文件
│
├── apps/                                   # 📱 应用
│   ├── web/                                # 主站 {"name": "@myorg/web"}
│   ├── admin/                              # 管理后台 {"name": "@myorg/admin"}
│   └── docs/                               # 文档站 {"name": "@myorg/docs"}
│
├── packages/                               # 📦 共享包
│   ├── ui/                                 # UI 组件库 {"name": "@myorg/ui"}
│   ├── shared/                             # 共享工具和类型 {"name": "@myorg/shared"}
│   └── utils/                              # 通用工具函数 {"name": "@myorg/utils"}
│
├── tools/                                  # 🔧 工具
│   └── scripts/
│
├── .editorconfig
├── .eslintrc.cjs                           # 根 ESLint（各包继承）
├── tsconfig.base.json                      # 基础 TS 配置（各包继承）
└── turbo.json                              # Turborepo 配置（可选）
```

```json
// apps/web/package.json — 子包引用本地包
{
  "name": "@myorg/web",
  "dependencies": {
    "@myorg/ui": "workspace:*",              // workspace:* 引用本地包
    "@myorg/shared": "workspace:*",
    "vue": "^3.4.0"
  }
}
```

### 12.3 Turborepo 任务编排

```json
// turbo.json — Turborepo 配置
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],

  "tasks": {
    "build": {
      "dependsOn": ["^build"],              // ^ 依赖的包先 build
      "outputs": ["dist/**", ".next/**"],
      "env": ["NODE_ENV", "VITE_API_BASE"]
    },
    "dev": {
      "dependsOn": ["^build"],
      "cache": false,                       // dev 不缓存
      "persistent": true                    # 长时间运行
    },
    "test": {
      "outputs": ["coverage/**"]
    },
    "lint": {
      "outputs": []
    }
  }
}
```

**Turborepo 核心价值**：增量构建、远程缓存（团队共享）、并行执行、Pipeline 可视化。

### 12.4 Nx 高级 Monorepo 工具

```bash
# Nx 常用命令
nx g @nx/vue:lib my-ui-component           # 生成 Vue 组件库
nx g @nx/vue:app my-app                    # 生成 Vue 应用
nx affected:test                           # 只测试受影响的包
nx affected:build                          # 只构建受影响的包
nx graph                                   # 可视化依赖图
```

### 12.5 Lerna 包管理

Lerna 曾经最流行的 Monorepo 工具，现在更多配合 nx 或 pnpm workspace 使用：

```bash
lerna run build                            # 所有包中执行 build
lerna run test --scope=@myorg/ui           # 只在 ui 包中执行 test
lerna version --conventional-commits       # 基于 commits 自动升级版本
lerna publish from-package                 # 从变更的包开始发布
```

### 12.6 Monorepo 最佳实践

```
Monorepo 最佳实践清单：

  ✅ 依赖管理
    ├── 使用 workspace:* 引用本地包
    ├── 统一 lock 文件（pnpm-lock.yaml）
    ├── 根目录放共享的 devDependencies
    └── 避免循环依赖（用图工具检测）

  ✅ 构建策略
    ├── 使用 Turborepo/Nx 进行增量构建
    ├── 基础包先行（shared → ui → apps）
    ├── 配置合理的缓存策略
    └── 并行化无依赖的任务

  ✅ 代码规范
    ├── 根目录统一 ESLint/Prettier 配置
    ├── 各包继承根配置 + 可自定义覆盖
    ├── 统一的 TS 配置（tsconfig.base.json）
    └── 统一的 EditorConfig

  ✅ CI/CD
    ├── 只构建和测试受影响的包（affected）
    ├── 缓存 node_modules 和构建产物
    ├── 变更检测：基于 git diff
    └── 分阶段部署（先 shared/ui，再 apps）

  ✅ 目录结构
    ├── apps/ 放置可运行的应用
    ├── packages/ 放置共享的包
    ├── tools/ 放置工程脚本
    └── 清晰的命名规范（@org/name）
```

---

## 第十三章：项目脚手架与模板

### 13.1 主流脚手架工具

| 工具 | 框架 | 特点 |
|------|------|------|
| `create-vue` | Vue 3 | 官方脚手架，交互式配置 |
| `create-react-app` | React | 官方脚手架（已不推荐维护） |
| `create-next-app` | Next.js | Next.js 官方脚手架 |
| `create-vite` | 通用 | Vite 官方脚手架，支持多框架 |
| `Taro CLI` | 跨端 | 小程序/H5/RN 多端统一 |

### 13.2 自定义脚手架开发

脚手架核心就是**交互式提问 + 模板渲染 + 依赖安装**：

```bash
# 使用示例
npm install -g @myorg/create-app
create-app my-project
# → ? 选择框架: Vue / React
# → ? 使用 TypeScript: Yes
# → ? 选择 CSS 方案: Sass / Tailwind
# → ✅ 项目创建完成！cd my-project && npm run dev
```

### 13.3 项目模板管理策略

| 方式 | 说明 | 优缺点 |
|------|------|--------|
| **Git 仓库模板** | 模板放独立 Git 仓库，clone + 变量替换 | 易于版本管理，用户体验好 |
| **npm 包发布** | 随 npm 包分发（如 create-vue） | `npx create-vue` 即可用 |
| **Monorepo 内置** | templates/ 目录存放多个模板 | 企业内部统一，方便维护 |

---

## 第十四章：性能监控与错误追踪

### 14.1 前端性能指标体系

| 指标 | 全称 | 含义 | 目标值 |
|------|------|------|--------|
| **FCP** | First Contentful Paint | 首次内容绘制 | < 1.8s |
| **LCP** | Largest Contentful Paint | 最大内容绘制 | < 2.5s |
| **FID** | First Input Delay | 首次输入延迟 | < 100ms |
| **CLS** | Cumulative Layout Shift | 累积布局偏移 | < 0.1 |
| **TTI** | Time to Interactive | 可交互时间 | < 3.8s |
| **TTFB** | Time to First Byte | 首字节时间 | < 800ms |

### 14.2 性能数据采集方案

```typescript
// utils/performance.ts — 性能数据采集
export function reportWebVitals() {
  if ('PerformanceObserver' in window) {
    // 监听 LCP（最大内容绘制）
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      sendMetric('LCP', lastEntry.startTime)
    }).observe({ type: 'largest-contentful-paint', buffered: true })

    // 监听 FID（首次输入延迟）
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        sendMetric('FID', entry.processingStart - entry.startTime)
      }
    }).observe({ type: 'first-input', buffered: true })

    // 监听 CLS（累积布局偏移）
    let clsValue = 0
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {         // 排除用户操作引起的偏移
          clsValue += entry.value
        }
      }
      sendMetric('CLS', clsValue)
    }).observe({ type: 'layout-shift', buffered: true })
  }
}

function sendMetric(name: string, value: number) {
  const data = JSON.stringify({ name, value, url: location.href, ts: Date.now() })
  navigator.sendBeacon('/api/metrics', data)  // Beacon API（可靠性高）
}
```

### 14.3 错误监控 Sentry

```typescript
// utils/sentry.ts — Sentry 初始化
import * as Sentry from '@sentry/vue'

export function initSentry(app: any) {
  Sentry.init({
    app,
    dsn: 'https://xxx@sentry.io/project-id',
    environment: import.meta.env.MODE,
    release: import.meta.env.VITE_APP_VERSION,
    tracesSampleRate: 0.2,                  // 性能采样率（20%）

    // 错误过滤：忽略已知无害的错误
    ignoreErrors: [
      /Loading chunk \d+ failed/,
      /NetworkError/,
      /Request cancelled/
    ],

    beforeSend(event) {
      event.user = { id: getCurrentUserId() }  // 附加用户信息
      return event
    }
  })
}
```

### 14.4 用户行为埋点

```typescript
// utils/tracker.ts — 用户行为追踪
class Tracker {
  private queue: any[] = []
  private timer: ReturnType<typeof setTimeout> | null = null

  track(event: string, properties?: Record<string, any>) {
    this.queue.push({
      event,
      properties: { ...properties, page: location.pathname },
      timestamp: Date.now()
    })
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => this.flush(), 500)  // 防抖批量上报
  }

  private flush() {
    const events = [...this.queue]
    this.queue = []
    navigator.sendBeacon('/api/track', JSON.stringify({
      events,
      sessionId: this.getSessionId()
    }))
  }

  private getSessionId(): string {
    const key = 'tracker_session_id'
    let id = sessionStorage.getItem(key)
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem(key, id)
    }
    return id
  }
}

export const tracker = new Tracker()

// 使用示例
tracker.track('button_click', { button_id: 'submit' })
tracker.track('page_view', { stay_time: 30 })
```

---

## 第十五章：工程化最佳实践总结

### 15.1 项目目录结构规范

```
推荐的 Vue3 + TypeScript 项目结构：

project-root/
├── public/                                # 静态资源（不经过构建）
│   ├── favicon.ico
│   └── index.html                         # HTML 入口
│
├── src/                                   # 源代码目录
│   ├── api/                               # API 接口层
│   │   ├── index.ts                       # API 统一导出
│   │   └── request.ts                     # 请求封装
│   ├── assets/                            # 静态资源（经构建处理）
│   │   ├── images/
│   │   └── fonts/
│   ├── components/                        # 通用组件
│   │   └── common/
│   ├── composables/                       # Vue3 组合式函数
│   ├── layouts/                           # 布局组件
│   ├── router/                            # 路由配置
│   ├── stores/                            # 状态管理（Pinia）
│   ├── styles/                            # 全局样式
│   │   ├── variables.scss                 # SCSS 变量
│   │   ├── mixins.scss                    # SCSS 混合
│   │   ├── reset.scss                     # 样式重置
│   │   └── global.scss                    # 全局样式
│   ├── types/                             # TypeScript 类型定义
│   ├── utils/                             # 工具函数
│   ├── views/                             # 页面组件
│   ├── App.vue                            # 根组件
│   ├── main.ts                            # 入口文件
│   └── env.d.ts                           # Vite 环境类型声明
│
├── .env                                   # 所有环境共用
├── .env.development                       # 开发环境变量
├── .env.production                        # 生产环境变量
├── .eslintrc.cjs                          # ESLint 配置
├── .prettierrc                            # Prettier 配置
├── .stylelintrc.cjs                       # Stylelint 配置
├── .editorconfig                          # 编辑器配置
├── index.html                             # Vite HTML 入口
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
├── .husky/                                # Git Hooks
├── .vscode/settings.json                  # VSCode 工作区设置
└── README.md
```

### 15.2 环境变量管理

```bash
# .env — 所有环境共用
VITE_APP_TITLE=My Application
VITE_APP_VERSION=1.0.0

# .env.development — 开发环境
VITE_API_BASE_URL=http://localhost:8080/api
VITE_ENABLE_MOCK=true

# .env.production — 生产环境
VITE_API_BASE_URL=https://api.example.com/v1
VITE_ENABLE_MOCK=false
VITE_SENTRY_DSN=https://xxx@sentry.io/project-id
```

```typescript
// src/utils/env.ts — 类型安全的环境变量工具
interface EnvConfig {
  APP_TITLE: string
  APP_VERSION: string
  API_BASE_URL: string
  ENABLE_MOCK: boolean
  SENTRY_DSN: string
}

function getEnv(): EnvConfig {
  return {
    APP_TITLE: import.meta.env.VITE_APP_TITLE || 'My App',
    APP_VERSION: import.meta.env.VITE_APP_VERSION || '0.0.0',
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
    ENABLE_MOCK: import.meta.env.VITE_ENABLE_MOCK === 'true',
    SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || ''
  }
}
export const env = getEnv()               // 导出环境变量单例
```

### 15.3 安全加固要点

| 安全风险 | 防护措施 | 工程化落地 |
|----------|----------|-----------|
| **XSS** | 输入转义 / CSP 策略 | ESLint `no-danger` 规则 + Helmet CSP |
| **CSRF** | Token 校验 / SameSite Cookie | Axios 拦截器自动附加 CSRF Token |
| **依赖漏洞** | 定期审计 | `pnpm audit` + CI 自动检查 |
| **敏感信息泄露** | 环境变量 / Secrets | `.env` 不入库 + CI Secrets 管理 |
| **点击劫持** | X-Frame-Options | Nginx / Webpack 注入响应头 |

### 15.4 工程化成熟度评估

```
工程化成熟度模型（L1-L5）：

  L1 — 初始级（手工作坊）：无构建工具或基础配置、无代码规范、手动部署、无监控
  L2 — 可重复级（基础工程化）：使用构建工具、基本 ESLint、Git 基本工作流、手动部署
  L3 — 已定义级（规范化）：完整代码规范、Conventional Commits、CI/CD 自动化、基础监控
  L4 — 量化管理级（精细化）：Monorepo + Turborepo、完整测试体系、Sentry 监控、自动化发布
  L5 — 优化级（智能化）：AI 辅助审查、全链路压测、灰度发布 + A/B 测试、自愈系统

  当前项目处于：L___ 级    下一步目标：L___ 级
```

---

## 附录 A：常用配置速查表

### A.1 Webpack 常用配置模板

```javascript
// webpack.prod.config.js — Webpack 生产环境优化配置
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  mode: 'production',
  devtool: 'nosources-source-map',           // 生产隐藏源码

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash:8].js',
    clean: true,
    publicPath: '/'
  },

  optimization: {
    usedExports: true,
    sideEffects: true,
    minimize: true,

    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },

    runtimeChunk: 'single',
    moduleIds: 'deterministic',

    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: { drop_console: true, pure_funcs: ['console.log'] }
        }
      }),
      new CssMinimizerPlugin()
    ]
  },

  cache: { type: 'filesystem', version: '1.0.0' },

  plugins: process.env.ANALYZE
    ? [new BundleAnalyzerPlugin({ analyzerMode: 'static' })]
    : []
}
```

### A.2 Vite 常用配置模板

```javascript
// vite.config.prod.ts — Vite 生产环境补充配置
export default {
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        ecma: 2020,
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'utils': ['lodash-es', 'dayjs', 'axios']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true
  }
}
```

### A.3 ESLint + Prettier 联合配置

```json
// package.json scripts 部分
{
  "scripts": {
    "lint": "eslint . --ext .ts,.vue,.tsx",
    "lint:fix": "eslint . --ext .ts,.vue,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,vue,css,scss,json,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,vue,css,scss,json,md}\"",
    "stylelint": \"stylelint \\\"src/**/*.{css,scss,vue}\\\"\",
    "stylelint:fix": \"stylelint --fix \\\"src/**/*.{css,scss,vue}\\\"\"
  }
}
```

### A.4 GitHub Actions 前端模板

```yaml
# .github/workflows/pr.yml — PR 检查流水线（轻量快速）
name: PR Check
on:
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  quality-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm test:unit
```

---

## 附录 B：实战案例 — Vue3+TS 工程化项目搭建

### B.1 项目概述

本案例从零搭建一个完整的 Vue3 + TypeScript 前端工程化项目，覆盖以下知识点：

| 文件 | 对应章节 | 核心功能 |
|------|----------|----------|
| `package.json` | 第三章 | 依赖管理与脚本命令 |
| `vite.config.ts` | 第六章 | Vite 构建配置 |
| `tsconfig.json` | 第二章 | TypeScript 编译配置 |
| `.eslintrc.cjs` | 第八章 | ESLint 代码检查 |
| `.prettierrc` | 第八章 | Prettier 格式化 |
| `.husky/pre-commit` | 第八章 | 提交前自动检查 |
| `.env.*` | 第十五章 | 多环境变量管理 |
| `Dockerfile` | 第十一章 | 容器化部署 |

### B.2 完整项目结构与说明

```
vue3-ts-engineered/
├── .env                                  【第15章】环境变量
├── .env.development
├── .env.production
├── .eslintrc.cjs                         【第8章】ESLint 配置
├── .prettierrc                           【第8章】Prettier 配置
├── .stylelintrc.cjs                      【第8章】Stylelint 配置
├── .editorconfig                         【第8章】编辑器配置
├── Dockerfile                             【第11章】容器化部署
├── docker-compose.yml                    【第11章】容器编排
├── nginx.conf                            【第11章】Nginx 反向代理配置
├── commitlint.config.cjs                 【第10章】Commit 规范校验
├── index.html                            【第6章】Vite HTML 入口
├── package.json                          【第3章】项目依赖与脚本
├── pnpm-lock.yaml                        【第3章】锁文件
├── postcss.config.js                     【第9章】PostCSS 配置
├── tsconfig.json                         【第2章】TypeScript 配置
├── vite.config.ts                        【第6章】Vite 构建配置
│
├── .husky/                               【第8章】Git Hooks
│   ├── pre-commit                        （运行 lint-staged）
│   └── commit-msg                         （运行 commitlint）
│
├── .vscode/                              【第8章】VSCode 设置
│   └── settings.json
│
└── src/                                  【第15章】源码目录
    ├── api/                               【第15章】API 层
    │   ├── index.ts
    │   ├── request.ts                      （axios 封装 + 拦截器）
    │   └── types.ts                        （API 返回类型定义）
    ├── assets/                            【第15章】静态资源
    │   └── images/
    ├── components/                        【第15章】通用组件
    │   └── common/
    │       └── BaseButton.vue              （带样式和类型的基础按钮）
    ├── composables/                       【第15章】组合式函数
    │   ├── useAuth.ts                     （认证状态管理）
    │   └── useRequest.ts                  （请求封装 composable）
    ├── layouts/                           【第15章】布局组件
    │   └── DefaultLayout.vue              （侧边栏 + 头部 + 内容区）
    ├── router/                            【第15章】路由配置
    │   ├── index.ts                       （路由表 + 懒加载）
    │   └── guards.ts                      （路由守卫：登录鉴权）
    ├── stores/                            【第15章】Pinia 状态管理
    │   ├── index.ts
    │   └── modules/
    │       └── user.ts                   （用户状态 store）
    ├── styles/                            【第9章】全局样式
    │   ├── variables.scss                 （设计 token 变量）
    │   ├── mixins.scss                    （响应式等 mixin）
    │   ├── reset.scss                     （CSS Reset）
    │   └── global.scss                    （全局通用样式）
    ├── types/                             【第2章】类型定义
    │   ├── api.d.ts                       （API 相关接口类型）
    │   └── env.d.ts                       （环境变量类型声明）
    ├── utils/                             【第15章】工具函数
    │   ├── index.ts
    │   ├── format.ts                      （日期/数字格式化）
    │   └── storage.ts                     （localStorage 封装）
    ├── views/                             【第15章】页面组件
    │   ├── home/
    │   │   └── HomePage.vue
    │   ├── login/
    │   │   └── LoginPage.vue
    │   └── dashboard/
    │       └── DashboardPage.vue
    ├── App.vue                            【第6章】根组件
    ├── main.ts                            【第6章】入口文件
    └── env.d.ts                           【第15章】Vite 环境类型声明
```

### B.3 核心配置文件详解

#### package.json（关键部分）

```json
{
  "name": "vue3-ts-engineered",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.vue --ignore-path .gitignore",
    "lint:fix": "eslint . --ext .ts,.vue --fix --ignore-path .gitignore",
    "format": "prettier --write \"src/**/*.{ts,vue,css,scss,json}\"",
    "type-check": "vue-tsc --noEmit",
    "test:unit": "vitest run",
    "prepare": "husky"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.3.0",
    "pinia": "^2.1.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.4.0",
    "vite": "^5.0.0",
    "sass": "^1.70.0",
    "eslint": "^9.0.0",
    "eslint-plugin-vue": "^9.20.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "prettier": "^3.2.0",
    "stylelint": "^16.0.0",
    "stylelint-config-standard": "^36.0.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "commitlint": "^19.0.0",
    "@commitlint/config-conventional": "^19.0.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "vitest": "^1.4.0"
  },
  "lint-staged": {
    "*.{ts,vue}": ["eslint --fix", "prettier --write"],
    "*.{css,scss}": ["stylelint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### B.4 功能与知识点对照表

| 功能点 | 涉及知识点 | 对应章节 |
|--------|-----------|----------|
| ESM 模块系统 (`import`/`export`) | ES Modules 规范 | 第 2 章 |
| TypeScript 类型系统 | TS 编译配置与使用 | 第 2 章 |
| Vite 开发服务器 + HMR | Vite 原理与配置 | 第 6 章 |
| SCSS 变量/Mixin + PostCSS | CSS 工程化方案 | 第 9 章 |
| ESLint + Prettier 自动修复 | 代码规范工作流 | 第 8 章 |
| Husky + lint-staged | Git Hooks 自动化 | 第 8 章 |
| Conventional Commits 校验 | Commit 规范 | 第 10 章 |
| pnpm + lock 文件锁定 | 包管理器原理 | 第 3 章 |
| 路由懒加载 (`import()`) | 代码分割 | 第 5 章 |
| 环境变量分级管理 | 环境变量最佳实践 | 第 15 章 |
| Docker 多阶段构建 | CI/CD 与容器化部署 | 第 11 章 |
| Nginx SPA 路由 + 缓存策略 | 反向代理配置 | 第 11 章 |
| Pinia 状态管理 | 状态管理模式 | 第 15 章 |
| axios 拦截器封装 | API 层设计 | 第 15 章 |
| 路由守卫鉴权 | 权限控制 | 第 15 章 |

> **扩展练习方向**：
> 1. 集成 Sentry 错误监控（参考第十四章）
> 2. 接入单元测试 Vitest + Testing Library
> 3. 添加 GitHub Actions CI/CD 流水线
> 4. 升级为 Monorepo 结构（添加 packages/ui 子包）
> 5. 集成 Tailwind CSS 替换 SCSS 方案

