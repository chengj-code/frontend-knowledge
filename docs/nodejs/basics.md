---
---
# Node.js 完整基础知识指南

> **版本**：v1.0.0  
> **更新日期**：2026-06-16  
> **适用人群**：前端开发者、全栈工程师、Node.js 初学者及进阶者  
> **目标**：从零基础到生产级应用开发的完整学习路径

---

## 目录

- [第1章：Node.js 概述](#第1章nodejs-概述)
- [第2章：Node.js 架构与运行原理](#第2章nodejs-架构与运行原理)
- [第3章：模块系统](#第3章模块系统)
- [第4章：异步编程模式](#第4章异步编程模式)
- [第5章：文件系统操作（fs 模块）](#第5章文件系统操作fs-模块)
- [第6章：HTTP 服务开发（http 模块）](#第6章http-服务开发http-模块)
- [第7章：Express/Koa 框架实战](#第7章expresskoa-框架实战)
- [第8章：数据库操作](#第8章数据库操作)
- [第9章：Stream 流式处理](#第9章stream-流式处理)
- [第10章：网络通信进阶](#第10章网络通信进阶)
- [第11章：安全与鉴权](#第11章安全与鉴权)
- [第12章：性能优化与监控](#第12章性能优化与监控)
- [第13章：测试与工程化](#第13章测试与工程化)
- [第14章：部署与运维](#第14章部署与运维)
- [附录A：Node.js 常用模块速查表](#附录anodejs-常用模块速查表)
- [附录B：综合实战案例 — BFF 服务搭建](#附录b综合实战案例--bff-服务搭建)

---

# 第1章：Node.js 概述

## 📚 本章学习目标

- 理解 **Node.js 是什么** 以及它的核心设计理念
- 掌握 **事件驱动（Event-Driven）** 和 **非阻塞 I/O（Non-blocking I/O）** 的概念
- 明确 Node.js 与浏览器 JavaScript 的区别
- 了解 Node.js 的典型应用场景
- 理解为什么选择 Node.js 作为后端技术栈
- 掌握 **CommonJS** 与 **ES Modules（ESM）** 两种模块系统的区别

---

## 1.1 什么是 Node.js

### 定义

**Node.js** 是一个基于 Chrome V8 引擎的 **JavaScript 运行时环境（Runtime Environment）**，它让 JavaScript 能够脱离浏览器在服务器端运行。Node.js 由 Ryan Dahl 于 2009 年创建，现由 Node.js 基金会维护。

### 核心特性

```javascript
// 示例：展示 Node.js 的基本特性
// 特性1：JavaScript 在服务器端运行
const http = require('http'); // 使用内置 HTTP 模块

// 创建一个简单的 HTTP 服务器
const server = http.createServer((req, res) => {
    // 回调函数处理请求
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Hello, Node.js! 你好，Node.js！');
});

// 监听端口 3000
server.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});
```

### 关键特点总结

| 特性 | 说明 |
|------|------|
| **V8 引擎** | 使用 Google Chrome 的 V8 引擎执行 JavaScript，性能优异 |
| **事件驱动** | 基于 Event Loop（事件循环）机制处理并发请求 |
| **非阻塞 I/O** | 所有 I/O 操作都是异步的，不会阻塞主线程 |
| **单线程** | 主线程是单线程的，但通过 libuv 实现多线程 I/O |
| **跨平台** | 可运行于 Windows、macOS、Linux 等操作系统 |
| **丰富的生态** | npm（Node Package Manager）拥有超过 200 万个包 |

---

## 1.2 设计哲学：事件驱动与非阻塞 I/O

### 1.2.1 事件驱动模型（Event-Driven Model）

**事件驱动编程** 是一种编程范式，程序的流程由外部事件（如用户点击、网络请求、文件读写完成等）决定。

```javascript
// 示例：事件驱动的基本概念
const EventEmitter = require('events');

// 创建事件发射器实例
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// 注册事件监听器（订阅者）
myEmitter.on('event', () => {
    console.log('事件触发了！'); // 当 'event' 事件被触发时执行
});

// 触发事件（发布者）
myEmitter.emit('event'); // 输出：事件触发了！
```

### 1.2.2 非阻塞 I/O（Non-blocking I/O）

**非阻塞 I/O** 指的是程序在发起 I/O 操作（如读取文件、网络请求）时不会等待操作完成，而是立即继续执行后续代码。当 I/O 操作完成后，通过回调函数、Promise 或 async/await 处理结果。

```javascript
const fs = require('fs');

console.log('开始读取文件...');

// 非阻塞方式：异步读取文件（推荐）
fs.readFile('./example.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('读取文件出错:', err);
        return;
    }
    console.log('文件内容:', data); // 文件读取完成后执行
});

console.log('继续执行其他代码...'); // 这行代码会先执行

/* 
输出顺序：
开始读取文件...
继续执行其他代码...
文件内容: ...（稍后输出）
*/
```

### 1.2.3 阻塞 vs 非阻塞对比

```javascript
const fs = require('fs');

// ❌ 阻塞方式：同步读取文件（不推荐用于高并发场景）
try {
    const data = fs.readFileSync('./example.txt', 'utf-8');
    console.log('同步读取完成:', data);
} catch (err) {
    console.error('同步读取错误:', err);
}

// ✅ 非阻塞方式：异步读取文件（推荐）
fs.readFile('./example.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('异步读取错误:', err);
        return;
    }
    console.log('异步读取完成:', data);
});
```

**对比表格：**

| 特性 | 阻塞 I/O | 非阻塞 I/O |
|------|----------|------------|
| **执行方式** | 等待操作完成后才继续 | 立即返回，通过回调处理结果 |
| **性能影响** | 阻塞主线程，吞吐量低 | 不阻塞主线程，支持高并发 |
| **适用场景** | 脚本工具、配置加载 | Web 服务器、API 服务 |
| **函数命名** | 通常带 `Sync` 后缀 | 默认为异步版本 |

---

## 1.3 Node.js 与浏览器 JavaScript 的区别

虽然两者都使用 JavaScript 语言，但在运行环境和 API 上存在显著差异：

### 对比表格

| 特性 | 浏览器 JavaScript | Node.js |
|------|-------------------|---------|
| **运行环境** | 浏览器（Chrome、Firefox 等） | 服务器/命令行 |
| **DOM/BOM API** | ✅ 支持（document, window） | ❌ 不支持 |
| **文件系统访问** | ❌ 受限（沙盒限制） | ✅ 完全支持（fs 模块） |
| **网络功能** | 受同源策略限制 | 无限制（http/net 模块） |
| **模块系统** | ES Modules（逐步普及） | CommonJS + ES Modules |
| **全局对象** | `window`, `document` | `global`, `process` |
| **this 指向** | 全局 window | 空对象 `{}` 或 module.exports |

```javascript
// 浏览器环境中的代码
console.log(this); // 输出：Window { ... }

// Node.js 环境中的代码
console.log(this); // 输出：{} （空对象）

// Node.js 中访问全局变量
console.log(global); // 类似浏览器的 window 对象
console.log(process); // 进程信息对象
console.log(__dirname); // 当前文件所在目录
console.log(__filename); // 当前文件的完整路径
```

---

## 1.4 应用场景

### 1.4.1 典型应用场景

#### 1️⃣ Web 服务器 / API 服务

Node.js 最核心的应用场景，特别适合构建 RESTful API 和 GraphQL API。

```javascript
// 简单的 RESTful API 示例
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // 设置响应头（允许跨域）
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // 简单路由实现
    if (pathname === '/api/users' && method === 'GET') {
        // 返回用户列表
        res.end(JSON.stringify({
            code: 200,
            data: [
                { id: 1, name: '张三', email: 'zhangsan@example.com' },
                { id: 2, name: '李四', email: 'lisi@example.com' }
            ],
            message: '获取成功'
        }));
    } else if (pathname === '/api/users' && method === 'POST') {
        // 创建用户（需要解析请求体）
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const userData = JSON.parse(body);
            res.end(JSON.stringify({
                code: 201,
                data: { id: Date.now(), ...userData },
                message: '创建成功'
            }));
        });
    } else {
        // 404 处理
        res.statusCode = 404;
        res.end(JSON.stringify({ code: 404, message: '接口不存在' }));
    }
});

server.listen(3000, () => {
    console.log('API 服务器启动成功: http://localhost:3000');
});
```

#### 2️⃣ 实时通信应用（WebSocket、聊天室）

```javascript
// WebSocket 聊天服务示例（使用 ws 库）
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// 存储所有连接的客户端
const clients = new Set();

wss.on('connection', (ws) => {
    console.log('新客户端连接');
    clients.add(ws); // 将客户端添加到集合

    // 接收消息
    ws.on('message', (message) => {
        console.log('收到消息:', message.toString());
        
        // 广播消息给所有客户端
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`[广播] ${message}`);
            }
        });
    });

    // 连接关闭
    ws.on('close', () => {
        console.log('客户端断开连接');
        clients.delete(ws); // 从集合中移除
    });
});
```

#### 3️⃣ 构建工具和脚本

```javascript
// 文件批量处理脚本示例
const fs = require('fs');
const path = require('path');

// 批量重命名文件
function batchRename(dirPath, prefix) {
    // Step 1: 读取目录下所有文件
    const files = fs.readdirSync(dirPath);

    files.forEach((file, index) => {
        const oldPath = path.join(dirPath, file);
        const ext = path.extname(file); // 获取文件扩展名
        const newName = `${prefix}_${String(index + 1).padStart(3, '0')}${ext}`;
        const newPath = path.join(dirPath, newName);

        // Step 2: 重命名文件
        fs.renameSync(oldPath, newPath);
        console.log(`${file} -> ${newName}`);
    });

    console.log(`\n共处理 ${files.length} 个文件`);
}

// 使用示例
batchRename('./images', 'photo');
```

#### 4️⃣ BFF 层（Backend for Frontend）

BFF 是一种架构模式，Node.js 作为中间层聚合多个后端服务的数据，为前端提供统一 API。

```javascript
// BFF 层示例：聚合多个微服务数据
const http = require('http');
const https = require('https');

// 模拟调用用户服务
function fetchUserService(userId) {
    return new Promise((resolve, reject) => {
        https.get(`https://api.userservice.com/users/${userId}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

// 模拟调用订单服务
function fetchOrderService(userId) {
    return new Promise((resolve, reject) => {
        https.get(`https://api.orderservice.com/orders?userId=${userId}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

// BFF 服务器：聚合数据返回给前端
const server = http.createServer(async (req, res) => {
    const userId = '123'; // 实际应从 token 或 session 获取

    try {
        // 并行请求多个服务
        const [userInfo, orders] = await Promise.all([
            fetchUserService(userId),
            fetchOrderService(userId)
        ]);

        // 聚合数据返回
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            user: userInfo,
            orders: orders,
            recommended: [] // 还可以加入推荐服务等
        }));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '服务暂时不可用' }));
    }
});

server.listen(4000, () => console.log('BFF 服务启动: http://localhost:4000'));
```

### 1.4.2 为什么选择 Node.js？

#### ✅ 优势

1. **高性能**
   - V8 引擎持续优化，执行速度快
   - 非阻塞 I/O 模型适合 I/O 密集型任务

2. **前后端语言统一**
   - 降低学习成本
   - 代码复用（如类型定义、验证逻辑、工具函数）
   - 团队协作更高效

3. **丰富的生态系统**
   - npm 拥有海量开源包
   - 几乎任何需求都能找到解决方案

4. **开发效率高**
   - JavaScript 动态特性，开发快速
   - JSON 天然数据格式，无需转换
   - 热更新提升开发体验

5. **社区活跃**
   - 大量教程、文档、最佳实践
   - 持续迭代更新

#### ⚠️ 注意事项

1. **不适合 CPU 密集型任务**
   - 单线程模型导致长时间计算会阻塞 Event Loop
   - 解决方案：Worker Threads、子进程、或使用其他语言编写服务

2. **回调地狱风险**
   - 多层嵌套回调难以维护
   - 解决方案：async/await、Promise

3. **相对较新的技术栈**
   - 部分企业对稳定性有顾虑
   - 但已被 Netflix、PayPal、LinkedIn 等大厂验证

---

## 1.5 CommonJS vs ES Modules

Node.js 支持两种模块系统：**CommonJS（CJS）** 和 **ES Modules（ESM）**。

### 1.5.1 CommonJS 规范

CommonJS 是 Node.js 原生的模块系统，使用 `require()` 导入和 `module.exports` 导出。

```javascript
// ===== math.js（导出模块）=====
// 方式一：使用 module.exports 导出单个对象
module.exports = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : Error('除数不能为零')
};

// 方式二：使用 exports 导出（exports 是 module.exports 的引用）
// exports.add = (a, b) => a + b;
// exports.subtract = (a, b) => a - b;

// ===== main.js（导入模块）=====
const math = require('./math'); // 导入整个模块

// 使用模块中的方法
console.log(math.add(10, 20));      // 输出：30
console.log(math.subtract(10, 5));  // 输出：5

// 解构导入特定方法
const { add, multiply } = require('./math');
console.log(add(3, 7));       // 输出：10
console.log(multiply(4, 5));  // 输出：20
```

### 1.5.2 ES Modules 规范

ES Modules 是 ECMAScript 标准化的模块系统，使用 `import/export` 语法。

```javascript
// ===== utils.mjs（ES Module 文件扩展名为 .mjs 或设置 "type": "module"）=====

// 命名导出（Named Exports）
export const greet = (name) => `你好，${name}！`;

export const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// 默认导出（Default Export）
export default class Calculator {
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
}

// ===== app.mjs（导入 ES Module）=====

// 导入默认导出
import Calculator from './utils.mjs';

// 导入命名导出（可按需导入）
import { greet, formatDate } from './utils.mjs';

// 使用导入的功能
const calc = new Calculator();
console.log(calc.add(15, 25));              // 输出：40
console.log(greet('世界'));                  // 输出：你好，世界！
console.log(formatDate(new Date()));         // 输出当前日期

// 命名空间导入（导入所有导出）
import * as utils from './utils.mjs';
console.log(utils.greet('Node.js'));         // 输出：你好，Node.js！
```

### 1.5.3 CommonJS vs ESM 对比

| 特性 | CommonJS (CJS) | ES Modules (ESM) |
|------|----------------|------------------|
| **关键字** | `require` / `module.exports` | `import` / `export` |
| **加载时机** | **运行时**加载 | **编译时**静态分析 |
| **值拷贝** | 导出值的拷贝 | 导出值的**实时绑定**（live binding） |
| **this 指向** | 指向当前模块 | `undefined` |
| **顶层 await** | ❌ 不支持 | ✅ 支持 |
| **Tree Shaking** | ❌ 不支持 | ✅ 支持（打包工具优化） |
| **循环依赖** | 获取未完成的副本 | 获取已导出的绑定引用 |
| **文件扩展名** | `.js` | `.mjs` 或 `.js`（package.json 配置 `"type": "module"`） |

```javascript
// 循环依赖演示（CJS vs ESM 差异）

// ===== CJS 循环依赖 =====
// a.js
console.log('a 开始加载');
const b = require('./b');
console.log('a 加载完成', b.done); // b.done 为 undefined（因为 b 未完全加载）
module.exports = { done: true };

// b.js
console.log('b 开始加载');
const a = require('./a');
console.log('b 加载完成', a.done); // a.done 也为 undefined
module.exports = { done: true };

/*
输出：
a 开始加载
b 开始加载
b 加载完成 undefined
a 加载完成 undefined
*/

// ===== ESM 循环依赖 =====
// a.mjs
console.log('a 开始加载');
import { done as bDone } from './b.mjs';
export const done = true;
console.log('a 加载完成', bDone); // bDone 可能是 undefined 或 true（取决于执行时机）

// b.mjs
console.log('b 开始加载');
import { done as aDone } from './a.mjs';
export const done = true;
console.log('b 加载完成', aDone);
```

### 1.5.4 如何选择模块系统？

```javascript
// 项目根目录的 package.json 配置
{
    "name": "my-nodejs-project",
    "version": "1.0.0",
    
    // 方式一：设置为 ESM 模式（推荐新项目）
    "type": "module", 
    
    // 方式二：保持默认 CJS 模式（传统项目）
    // 不设置 type 字段，或显式设置 "type": "commonjs"
    
    // 混合使用：在 CJS 项目中使用 ESM
    // 可以动态 import() 来加载 ESM 模块
}
```

**选型建议：**

- **新项目** → 推荐 **ES Modules**（现代标准、更好的静态分析、Tree Shaking）
- **旧项目维护** → 保持 **CommonJS**（避免迁移成本）
- **库开发** → 提供 **双格式支持**（同时发布 CJS 和 ESM 版本）

---

## 本章要点速查

### 核心概念

- **Node.js**：基于 V8 引擎的服务器端 JavaScript 运行时
- **事件驱动**：基于事件循环机制处理异步操作
- **非阻塞 I/O**：I/O 操作不阻塞主线程，通过回调/Promise/async-await 处理结果
- **单线程**：主线程单线程，libuv 线程池处理 I/O

### 关键区别

| 场景 | 浏览器 JS | Node.js |
|------|-----------|---------|
| 运行环境 | 浏览器 | 服务器/终端 |
| 全局对象 | `window` | `global`/`process` |
| DOM 访问 | ✅ | ❌ |
| 文件系统 | ❌ | ✅ |

### 模块系统对比

| 特性 | CommonJS | ES Modules |
|------|----------|-------------|
| 语法 | `require/exports` | `import/export` |
| 加载 | 运行时 | 编译时静态分析 |
| 适用 | 传统项目 | 新项目/库开发 |

### 应用场景速查

- ✅ Web API 服务、实时通信、BFF 层、构建工具
- ⚠️ 避免 CPU 密集型计算（使用 Worker Threads 或其他方案）

---

# 第2章：Node.js 架构与运行原理

## 📚 本章学习目标

- 深入理解 **V8 引擎** 如何集成到 Node.js 中
- 掌握 **libuv 事件循环（Event Loop）** 的完整工作流程和各阶段详解
- 理解 **单线程模型** 的优势与局限，以及 **Worker Threads** 的使用场景
- 学会使用 **child_process** 和 **cluster** 进行进程管理
- 了解 Node.js 的 **内存管理** 机制和垃圾回收策略

---

## 2.1 整体架构概览

Node.js 的架构可以分为以下几层：

```
┌─────────────────────────────────────┐
│           Node.js APIs              │  ← JavaScript 核心模块（fs, http, path 等）
├─────────────────────────────────────┤
│           Node.js Bindings          │  ← C++ 绑定层（连接 JS 和 C++）
├─────────────────────────────────────┤
│             V8 Engine               │  ← Google V8 JavaScript 引擎
├─────────────────┬───────────────────┤
│     libuv       │    c-ares         │  ← 异步 I/O 库 / DNS 解析
│  (Event Loop)   │    http parser    │  ← HTTP 解析器
│                 │    OpenSSL etc.   │  ← 加密库等
└─────────────────┴───────────────────┘
```

### 各层职责说明

| 层级 | 技术组件 | 职责描述 |
|------|----------|----------|
| **应用层** | JavaScript 代码 | 开发者编写的业务逻辑 |
| **Node.js API 层** | 核心模块 | 提供文件系统、网络、路径等高级 API |
| **Binding 层** | C++ 绑定 | 将 JavaScript 调用桥接到底层 C/C++ 库 |
| **V8 引擎层** | V8 Engine | 解析和执行 JavaScript 代码 |
| **底层支撑** | libuv/c-ares/OpenSSL | 提供异步 I/O、DNS、加密等底层能力 |

---

## 2.2 V8 引擎集成

### 2.2.1 V8 引擎简介

**V8** 是 Google 开源的高性能 JavaScript 和 WebAssembly 引擎，用于 Chrome 浏览器和 Node.js。

```javascript
// V8 引擎的关键特性演示

// 特性1：即时编译（JIT - Just-In-Time Compilation）
// V8 会将热点的 JavaScript 代码编译成机器码执行
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 特性2：隐藏类（Hidden Classes）优化对象属性访问
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// 创建大量相同结构的对象（V8 会优化）
const points = Array.from({ length: 10000 }, (_, i) => new Point(i, i * 2));

// 特性3：内联缓存（Inline Caching）加速方法调用
points.forEach(point => point.x * 2); // V8 会缓存属性访问路径
```

### 2.2.2 Node.js 如何使用 V8

```javascript
// 查看 V8 引擎信息
console.log(process.versions.v8);     // 输出版本号，如 "9.4.146.24-node.26"
console.log(process.arch);            // 输出 CPU 架构，如 "x64"
console.log(process.platform);        // 输出平台，如 "linux"

// V8 内存限制相关配置
// 默认堆内存限制：约 1.5GB（64位系统）或 ~700MB（32位系统）
console.log(`堆内存大小限制: ${process.memoryUsage().heapUsed} bytes`);

// 通过命令行参数调整 V8 内存限制
// node --max-old-space-size=4096 app.js  // 设置最大堆内存为 4GB
```

### 2.2.3 V8 垃圾回收机制

V8 采用 **分代垃圾回收（Generational GC）** 策略：

```javascript
// V8 GC 分代示意
/*
┌─────────────────────────────────────┐
│           V8 Heap                   │
├──────────────────┬──────────────────┤
│   New Space      │    Old Space     │
│   (新生代)        │    (老生代)       │
│   ~2-8MB         │    无固定大小     │
│                  │                  │
│ Scavenge 算法   │ Mark-Sweep      │
│ (快速回收)       │ Mark-Compact    │
│ (复制算法)       │ (标记清除/整理)  │
└──────────────────┴──────────────────┘
*/

// 监控内存使用情况
function monitorMemory() {
    const used = process.memoryUsage(); // 获取当前内存使用情况
    
    console.log('内存使用报告:');
    console.log(`  RSS（常驻内存集）: ${(used.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Heap Total（堆总量）: ${(used.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Heap Used（堆已用）: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  External（外部内存）: ${(used.external / 1024 / 1024).toFixed(2)} MB`);
    
    return used;
}

// 定期监控
setInterval(monitorMemory, 5000); // 每5秒打印一次
```

---

## 2.3 libuv 事件循环架构

### 2.3.1 什么是事件循环（Event Loop）

**事件循环** 是 Node.js 的核心机制，它使得 Node.js 能够在单线程环境下处理大量并发操作。事件循环负责协调 JavaScript 代码的执行、回调函数的处理以及 I/O 操作的调度。

### 2.3.2 事件循环各阶段详解

以下是 Node.js 事件循环的完整流程图：

```mermaid
graph TD
    A[<strong>外部输入</strong><br/>定时器/I/O/Immediate] --> B[<strong>Timers 阶段</strong><br/>执行 setTimeout/setInterval<br/>到期的回调]
    B --> C[<strong>Pending Callbacks 阶段</strong><br/>执行延迟到下一轮的系统回调]
    C --> D[<strong>Idle/Prepare 阶段</strong><br/>内部使用，开发者不可见]
    D --> E[<strong>Poll 阶段</strong><br/>获取新的 I/O 事件<br/>执行 I/O 相关回调]
    E --> F{是否有 setImmediate?}
    F -->|是| G[<strong>Check 阶段</strong><br/>执行 setImmediate 回调]
    F -->|否| H[<strong>Close Callbacks 阶段</strong><br/>执行关闭事件的回调]
    G --> H
    H --> I{事件循环是否继续?}
    I -->|是| B
    I -->|否| J[<strong>退出</strong>]
    
    style A fill:#e1f5fe
    style B fill:#fff3e0
    style E fill:#e8f5e9
    style G fill:#fce4ec
    style H fill:#f3e5f5
```

#### 图表1：Node.js 事件循环各阶段完整流程图

以下是更加详细的事件循环流程图，展示了每个阶段的具体判断逻辑和执行流程：

```mermaid
flowchart TD
    A["事件循环开始"] --> B{"timers 阶段<br/>检查到期的 timer"}
    B --> C["执行到期的<br/>setTimeout/setInterval 回调"]
    C --> D{"pending callbacks 阶段<br/>有推迟的 I/O 回调?"}
    D -- 是 --> E["执行推迟的<br/>I/O 回调（上限50个）"]
    D -- 否 --> F{"poll 阶段<br/>（核心阶段）"}
    E --> F
    F --> G{"有新的 I/O 事件?"}
    G -- 是 --> H["执行对应的 I/O 回调"]
    H --> F
    G -- 无且无定时器 --> I{"check 阶段<br/>有 setImmediate?"}
    I -- 是 --> J["执行 setImmediate 回调"]
    J --> K{"close callbacks 阶段<br/>有 socket.close?"}
    I -- 否 --> K
    K -- 是 --> L["执行 close 回调"]
    L --> A
    K -- 否 --> M{"有 timer 或 pending?"}
    M -- 是 --> A
    M -- 否 --> N["等待新事件<br/>（可能阻塞在此处）"]
    N --> A
    
    style A fill:#4CAF50,color:#fff
    style N fill:#90A4AE,color:#000
```

**流程图说明**：
- **timers 阶段**：检查 setTimeout/setInterval 是否到期，执行对应回调
- **pending callbacks 阶段**：处理推迟到下一轮循环的 I/O 回调（如 TCP 错误）
- **poll 阶段**（核心）：获取新的 I/O 事件，可能在此阻塞等待
- **check 阶段**：执行 setImmediate() 的回调
- **close callbacks 阶段**：处理 socket.close() 等关闭事件的回调
- 循环会持续运行直到没有待处理的事件

#### 各阶段详细说明

```javascript
/**
 * 事件循环六阶段详解
 */

// ==================== 阶段1：Timers（定时器阶段）====================
// 本阶段执行 setTimeout() 和 setInterval() 到期的回调
console.log('1. 脚本开始执行');

setTimeout(() => {
    console.log('2. setTimeout (0ms) 回调 - Timers 阶段');
}, 0);

setTimeout(() => {
    console.log('3. setTimeout (100ms) 回调 - Timers 阶段');
}, 100);

// ==================== 阶段2：Pending Callbacks（待定回调阶段）====================
// 执行某些系统操作的延迟回调（如 TCP 错误类型）
// 通常开发者不需要关注此阶段

// ==================== 阶段3：Idle/Prepare（空闲/准备阶段）====================
// 仅内部使用，Node.js 内部调度使用

// ==================== 阶段4：Poll（轮询阶段）【最重要】====================
// 获取新的 I/O 事件；执行 I/O 相关回调（除了 timers、close、setImmediate 之外）
// Node.js 会在适当的时候在此处阻塞等待

const fs = require('fs');

// 文件 I/O 回调会在 Poll 阶段执行
fs.readFile(__filename, () => {
    console.log('5. readFile 回调 - Poll 阶段');
    
    // Poll 阶段的嵌套定时器
    setTimeout(() => {
        console.log('7. readFile 内部的 setTimeout - 下一轮 Timers');
    }, 0);
    
    // Poll 阶段的 setImmediate
    setImmediate(() => {
        console.log('8. readFile 内部的 setImmediate - Check 阶段');
    });
});

// ==================== 阶段5：Check（检查阶段）====================
// 执行 setImmediate() 注册的回调
setImmediate(() => {
    console.log('4. setImmediate 回调 - Check 阶段');
});

// ==================== 阶段6：Close Callbacks（关闭回调阶段）====================
// 执行一些关闭事件的回调，如 socket.on('close', ...)
const net = require('net');

const server = net.createServer(); // 创建 TCP 服务器
server.listen(() => {
    server.close(); // 关闭服务器，触发 close 事件
});

server.on('close', () => {
    console.log('6. 服务器 close 事件 - Close Callbacks 阶段');
});

console.log('1. 脚本同步代码执行完毕，进入事件循环');

/*
实际输出顺序：
1. 脚本开始执行
1. 脚本同步代码执行完毕，进入事件循环
4. setImmediate 回调 - Check 阶段（同一轮循环）
2. setTimeout (0ms) 回调 - Timers 阶段（可能在不同轮次）
6. 服务器 close 事件 - Close Callbacks 阶段
5. readFile 回调 - Poll 阶段
8. readFile 内部的 setImmediate - Check 阶段
7. readFile 内部的 setTimeout - 下一轮 Timers 阶段
3. setTimeout (100ms) 回调 - Timers 阶段
*/
```

### 2.3.3 微任务队列（Microtask Queue）

除了上述六个宏任务阶段外，还有两个**微任务队列**：

```javascript
/**
 * 微任务队列（Microtask Queue）
 * 包括：Promise.then/catch/finally、queueMicrotask、process.nextTick
 * 
 * 重要规则：每个宏任务阶段结束后，都会清空所有微任务队列
 */

console.log('=== 同步代码开始 ===');

// Promise 微任务（属于 Microtask Queue）
Promise.resolve()
    .then(() => console.log('1. Promise.then (微任务)'));

// process.nextTick 微任务（属于 Next Tick Queue，优先级最高）
process.nextTick(() => console.log('2. process.nextTick (Next Tick Queue)'));

// queueMicrotask 微任务
queueMicrotask(() => console.log('3. queueMicrotask (微任务)'));

console.log('=== 同步代码结束 ===');

// 定时器（属于 Timers 阶段的宏任务）
setTimeout(() => {
    console.log('4. setTimeout (宏任务)');
    
    // 宏任务内部的微任务
    Promise.resolve().then(() => console.log('5. 宏任务内的 Promise.then'));
}, 0);

/*
输出顺序：
=== 同步代码开始 ===
=== 同步代码结束 ===
2. process.nextTick (Next Tick Queue)  ← 最高优先级
1. Promise.then (微任务)
3. queueMicrotask (微任务)
4. setTimeout (宏任务)
5. 宏任务内的 Promise.then
*/
```

### 2.3.4 nextTick vs setImmediate vs setTimeout

```javascript
/**
 * 三种延迟执行的对比
 */
console.log('脚本开始');

// 1. process.nextTick - 在同一阶段立即执行（优先级最高）
process.nextTick(() => {
    console.log('nextTick: 在当前操作后立即执行');
});

// 2. setImmediate - 在 Check 阶段执行（当前轮循环的最后一个阶段之前）
setImmediate(() => {
    console.log('setImmediate: 在 I/O 回调后的 Check 阶段执行');
});

// 3. setTimeout(fn, 0) - 在 Timers 阶段执行（至少延迟 1ms）
setTimeout(() => {
    console.log('setTimeout(0): 在 Timers 阶段执行（可能有 1ms 延迟）');
}, 0);

console.log('脚本结束');

/*
输出：
脚本开始
脚本结束
nextTick: 在当前操作后立即执行
setImmediate: 在 I/O 回调后的 Check 阶段执行  ← 通常比 setTimeout(0) 先
setTimeout(0): 在 Timers 阶段执行（可能有 1ms 延迟）

注意：setImmediate 和 setTimeout(0) 的执行顺序取决于事件循环的阶段，
但在 I/O 回调内部，setImmediate 总是先于 setTimeout(0) 执行。
*/
```

---

## 2.4 单线程模型与 Worker Threads

### 2.4.1 单线程模型的本质

Node.js 的"单线程"指的是 **JavaScript 执行的主线程是单线程**，但实际上 Node.js 底层通过 libuv 的线程池实现了多线程 I/O 操作。

```javascript
/**
 * 单线程模型示意图
 * 
 * JavaScript 主线程（单线程）:
 *   ├── 执行同步代码
 *   ├── 处理回调函数
 *   └── 协调事件循环
 * 
 * libuv 线程池（默认4个线程）:
 *   ├── 文件 I/O 操作（fs 模块的异步方法）
 *   ├── DNS 查询
 *   ├── 压缩/解压缩（zlib）
 *   └── 其他 CPU 密集型操作
 */

// 演示：主线程不会被 I/O 阻塞
const crypto = require('crypto');

console.log('开始加密操作...');

// 异步加密（使用 libuv 线程池，不阻塞主线程）
crypto.pbkdf2('password', 'salt', 100000, 512, 'sha256', (err, derivedKey) => {
    if (err) throw err;
    console.log('加密完成:', derivedKey.toString('hex').substring(0, 20) + '...');
});

console.log('主线程继续执行其他任务...');
// 输出：主线程不会被加密操作阻塞
```

### 2.4.2 Worker Threads（工作线程）

当遇到 **CPU 密集型任务**（如图片处理、大数据计算、加密运算）时，可以使用 **Worker Threads** 将任务转移到独立线程执行，避免阻塞主线程的事件循环。

```javascript
/**
 * Worker Threads 使用示例
 * 
 * 场景：斐波那契数列大数计算（CPU 密集型）
 */

// ===== 主线程文件：main.js =====
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    // 主线程代码
    
    console.log('主线程：开始创建工作线程...');
    
    // 创建工作线程
    const worker = new Worker(__filename, {
        workerData: { n: 45 } // 传递参数给工作线程
    });
    
    // 监听工作线程的消息
    worker.on('message', (result) => {
        console.log(`主线程：收到计算结果 - 斐波那契(${workerData.n}) = ${result}`);
        worker.terminate(); // 终止工作线程
    });
    
    // 监听工作线程的错误
    worker.on('error', (err) => {
        console.error('主线程：工作线程错误:', err.message);
    });
    
    // 监听工作线程退出
    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`主线程：工作线程异常退出，退出码 ${code}`);
        } else {
            console.log('主线程：工作线程正常退出');
        }
    });
    
    console.log('主线程：继续执行其他任务（不被阻塞）');
    
} else {
    // 工作线程代码
    
    const { n } = workerData; // 接收主线程传递的参数
    
    console.log(`工作线程：开始计算斐波那契(${n})...`);
    
    // CPU 密集型计算
    function fib(num) {
        if (num <= 1) return num;
        return fib(num - 1) + fib(num - 2);
    }
    
    const result = fib(n);
    
    // 将结果发送回主线程
    parentPort.postMessage(result);
}
```

### 2.4.3 Worker Threads 最佳实践

```javascript
/**
 * Worker Pool（工作线程池）模式
 * 用于管理多个 Worker Thread，提高资源利用率
 */

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const os = require('os');

if (isMainThread) {
    // ===== 主线程：工作线程池管理器 =====
    
    class WorkerPool {
        constructor(workerPath, numberOfWorkers) {
            this.workers = [];
            this.taskQueue = [];
            this.activeWorkers = 0;
            
            // 创建指定数量的工作线程
            for (let i = 0; i < numberOfWorkers; i++) {
                const worker = new Worker(workerPath);
                
                worker.on('message', (result) => {
                    this.activeWorkers--;
                    
                    // 调用任务的回调
                    const task = this.taskQueue.shift();
                    if (task && task.callback) {
                        task.callback(null, result);
                    }
                    
                    // 处理队列中的下一个任务
                    this.processQueue();
                });
                
                this.workers.push(worker);
            }
        }
        
        // 提交任务到线程池
        run(taskData) {
            return new Promise((resolve, reject) => {
                this.taskQueue.push({
                    data: taskData,
                    callback: (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    }
                });
                
                this.processQueue();
            });
        }
        
        // 处理任务队列
        processQueue() {
            while (this.activeWorkers < this.workers.length && this.taskQueue.length > 0) {
                const task = this.taskQueue.shift();
                const worker = this.workers[this.activeWorkers];
                
                this.activeWorkers++;
                worker.postMessage(task.data);
            }
        }
        
        // 关闭所有工作线程
        destroy() {
            this.workers.forEach(worker => worker.terminate());
        }
    }
    
    // 使用示例：根据 CPU 核心数创建线程池
    const cpuCount = os.cpus().length;
    const pool = new WorkerPool(__filename, Math.min(cpuCount, 4));
    
    // 提交多个并行任务
    const tasks = [40, 41, 42, 43].map(n => pool.run({ n }));
    
    Promise.all(tasks)
        .then(results => {
            console.log('所有任务完成:', results);
            pool.destroy();
        })
        .catch(console.error);
        
} else {
    // ===== 工作线程：执行具体任务 =====
    
    const { n } = workerData;
    
    function fib(num) {
        if (num <= 1) return num;
        return fib(num - 1) + fib(num - 2);
    }
    
    parentPort.postMessage(fib(n));
}
```

---

## 2.5 进程管理

### 2.5.1 child_process（子进程模块）

`child_process` 模块提供了创建子进程的能力，可以执行系统命令或其他 Node.js 脚本。

```javascript
const { exec, execFile, spawn, fork } = require('child_process');
const path = require('path');

// ==================== 方法1：exec ====================
// 执行 shell 命令，将结果缓冲后传入回调
exec('ls -la', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec 错误: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`exec stderr: ${stderr}`);
    }
    console.log(`exec stdout:\n${stdout}`);
});

// 带 options 的 exec
exec(
    'find . -type f -name "*.js"',  // 要执行的命令
    {
        cwd: __dirname,              // 工作目录
        maxBuffer: 1024 * 1024,      // 最大缓冲区大小（1MB）
        timeout: 5000,               // 超时时间（毫秒）
        encoding: 'utf-8'            // 输出编码
    },
    (err, stdout, stderr) => {
        if (!err) console.log('找到的 JS 文件:\n', stdout);
    }
);

// ==================== 方法2：execFile ====================
// 直接执行可执行文件（不经过 shell，更安全）
execFile('node', ['--version'], (error, stdout, stderr) => {
    if (error) throw error;
    console.log('Node 版本:', stdout.trim()); // 输出：v18.x.x
});

// ==================== 方法3：spawn（推荐用于大量数据输出）====================
// 创建子进程，以流的方式处理输出（适用于大量数据）

// 示例：使用 spawn 执行长时间运行的命令
const ls = spawn('ls', ['-lh', '/usr']);

// 以流的方式监听标准输出
ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`); // 数据分块到达
});

// 监听标准错误
ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

// 子进程关闭事件
ls.on('close', (code) => {
    console.log(`子进程退出码: ${code}`);
});

// ==================== 方法4：fork（专门用于 Node.js 脚本）====================
// 创建新的 Node.js 进程并建立 IPC 通信通道

if (process.argv[2] !== 'child') {
    // 主进程
    console.log('主进程 PID:', process.pid);
    
    const child = fork(__filename, ['child']); // 启动子进程
    
    // 发送消息给子进程
    child.send({ type: 'greeting', message: '你好，子进程！' });
    
    // 接收子进程的消息
    child.on('message', (msg) => {
        console.log('主进程收到:', msg);
    });
    
    // 子进程退出
    child.on('exit', (code) => {
        console.log(`子进程退出，退出码: ${code}`);
    });
    
} else {
    // 子进程
    console.log('子进程 PID:', process.pid);
    
    // 接收主进程的消息
    process.on('message', (msg) => {
        console.log('子进程收到:', msg);
        
        // 回复主进程
        process.send({
            type: 'response',
            message: '收到！我是子进程',
            pid: process.pid
        });
    });
}
```

### 2.5.2 cluster（集群模块）

`cluster` 模块用于创建共享服务器端口的**子进程集群**，充分利用多核 CPU 性能。

```javascript
/**
 * Cluster 集群示例：创建 HTTP 服务器集群
 * 
 * 架构：
 * ┌─────────────┐
 * │ Master 进程  │ ← 负责管理 Worker 进程
 * ├─────┬───────┤
 * │ W0  │ W1    │ ← Worker 进程（各自独立的事件循环）
 * │     │ W2    │
 * └─────┴───────┘
 */

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length; // 获取 CPU 核心数

if (cluster.isMaster) {
    // ========== Master 进程（主进程）==========
    
    console.log(`主进程 ${process.pid} 正在运行`);
    console.log(`CPU 核心数: ${numCPUs}`);
    
    // 根据 CPU 核心数创建 Worker 进程
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // 创建 Worker 进程
    }
    
    // 监听 Worker 进程上线事件
    cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} 已上线`);
    });
    
    // 监听 Worker 进程退出事件
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} 退出（退出码: ${code}, 信号: ${signal}）`);
        
        // 自动重启退出的 Worker（保证服务可用性）
        console.log('正在重启 Worker...');
        cluster.fork();
    });
    
} else {
    // ========== Worker 进程（工作进程）==========
    
    // 每个 Worker 都创建独立的 HTTP 服务器
    // 它们共享相同的端口（由 Master 进程分发请求）
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Hello from Worker ${process.pid}\n`);
    }).listen(3000);
    
    console.log(`Worker ${process.pid} 已启动 HTTP 服务器`);
}
```

### 2.5.3 进程间通信（IPC）

```javascript
/**
 * 进程间通信（Inter-Process Communication）
 * Node.js 支持 JSON 序列化和高级序列化两种方式
 */

const { fork } = require('child_process');

// 主进程
const child = fork('./child-process.js', [], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'] // 开启 IPC 通道
});

// 发送 JSON 可序列化的数据
child.send({
    type: 'config',
    database: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'secret'
    }
});

// 发送句柄（Handle）（高级用法，传递服务器或 socket）
const server = require('http').createServer();
child.send('server', server); // 将 HTTP 服务器句柄发送给子进程

// 接收子进程消息
child.on('message', (msg) => {
    console.log('来自子进程:', msg);
    
    if (msg.type === 'ready') {
        console.log('子进程准备就绪');
    }
});
```

---

## 2.6 内存管理

### 2.6.1 V8 堆内存结构

```javascript
/**
 * V8 堆内存布局
 * 
 * ┌─────────────────────────────────────────┐
 * │              New Space（新生代）          │
 * │  存放短生命周期对象                        │
 * │  大小：2-8MB（可配置）                     │
 * │  回收算法：Scavenge（复制算法）            │
 * │  特点：快速回收，但占用空间翻倍             │
 * ├─────────────────────────────────────────┤
 * │              Old Space（老生代）           │
 * │  存放长生命周期对象或从新生代晋升的对象       │
 * │  回收算法：Mark-Sweep / Mark-Compact      │
 * │  特点：回收速度慢，但空间利用率高            │
 * ├──────────────────┬──────────────────────┤
 * │ Large Object     │ Code/Meta Space      │
 * │ Space（大对象）   │（代码/元数据空间）     │
 * │ > 1MB 的对象     │                      │
 * └──────────────────┴──────────────────────┘
 */

// 查看内存使用详情
function printMemoryUsage(tag = '') {
    const mem = process.memoryUsage();
    
    console.log(`\n${tag ? `[${tag}] ` : ''}内存使用情况:`);
    console.log(`  RSS（常驻内存集）:    ${(mem.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Heap Total（堆总量）:  ${(mem.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Heap Used（堆已用）:   ${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  External（外部内存）:   ${(mem.external / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  ArrayBuffers:         ${(mem.arrayBuffers / 1024 / 1024).toFixed(2)} MB`);
    
    return mem;
}

printMemoryUsage('初始状态');
```

### 2.6.2 垃圾回收策略

```javascript
/**
 * V8 垃圾回收策略详解
 */

// ========== 新生代回收（Scavenge 算法）==========

// 新生代分为两半：From-Space 和 To-Space
// 新对象分配在 From-Space
// 回收时，存活对象复制到 To-Space，然后角色互换

function demonstrateNewSpaceGC() {
    // 创建大量短生命周期对象
    const shortLivedObjects = [];
    
    for (let i = 0; i < 10000; i++) {
        // 这些对象很快就会变成垃圾
        shortLivedObjects.push({ id: i, data: `temp-${i}` });
    }
    
    // 清空引用，这些对象将成为垃圾回收的目标
    shortLivedObjects.length = 0;
    
    // 手动触发 GC（需要在启动时加 --expose-gc 参数）
    if (global.gc) {
        global.gc(); // 强制执行垃圾回收
        console.log('手动触发 GC 完成');
    }
}

// ========== 老生代回收（Mark-Sweep-Compact）==========

// 当对象在新生代存活足够多次（通常经过多次 Scavenge），会被晋升到老生代
// 老生代使用标记-清除-整理算法

function demonstrateOldSpaceGC() {
    // 创建长生命周期的全局对象（模拟老生代对象）
    global.longLivedCache = new Map();
    
    // 持续添加数据（模拟长期使用的缓存）
    setInterval(() => {
        global.longLivedCache.set(Date.now(), {
            timestamp: Date.now(),
            data: new Array(1000).fill('cache-data')
        });
        
        // 限制缓存大小，防止内存泄漏
        if (global.longLivedCache.size > 1000) {
            const firstKey = global.longLivedCache.keys().next().value;
            global.longLivedCache.delete(firstKey);
        }
    }, 1000);
}
```

### 2.6.3 内存泄漏常见场景与排查

```javascript
/**
 * 常见的内存泄漏场景
 */

// ==================== 泄漏场景1：全局变量 ====================
// 未声明的变量会成为全局变量，永远不会被回收
function leakGlobalVariable() {
    // ❌ 错误：忘记使用 var/let/const，leakyVar 变成全局变量
    leakyVar = '这是一个泄漏的全局变量'; // 相当于 global.leakyVar
}

// ✅ 正确做法：始终使用声明语句
function noLeak() {
    const safeVar = '这是局部变量'; // 函数执行完后会被回收
}

// ==================== 泄漏场景2：闭包引用 ====================
function createLeakyClosure() {
    const largeData = new Array(1000000).fill('big-data'); // 大数组
    
    return function() {
        // 闭包引用了 largeData，即使不使用也不会被释放
        console.log('闭包被调用');
        // 如果确实不需要 largeData，应该将其设为 null
        // largeData = null; // ✅ 解决方案
    };
}

// ==================== 泄漏场景3：事件监听器未移除 ====================
const EventEmitter = require('events');

class LeakyServer extends EventEmitter {
    start() {
        // 每次 start 都会新增监听器，但不移除旧的
        this.on('request', this.handleRequest.bind(this));
        // ✅ 应该使用 once() 或在合适时机 removeListener()
    }
    
    handleRequest(req) {
        console.log('处理请求:', req);
    }
}

// ==================== 泄漏场景4：缓存无限制增长 ====================
const cache = new Map();

function getDataWithCache(key) {
    if (cache.has(key)) {
        return cache.get(key); // 命中缓存
    }
    
    const data = fetchDataFromDB(key); // 模拟数据库查询
    cache.set(key, data); // 缓存数据
    
    // ⚠️ 问题：缓存无限增长，没有过期和清理机制
    // ✅ 解决方案：使用 LRU 缓存或设置最大容量
    return data;
}

// ==================== 泄漏场景5：Timer/Interval 未清除 ====================
function leakyTimer() {
    setInterval(() => {
        // 这个 interval 永远不会被清除
        // 即使包含它的对象已经不再使用，回调仍会保留引用
        console.log('定时器执行');
    }, 1000);
    
    // ✅ 解决方案：保存 timer ID，在适当时机 clearInterval(id)
}

// ==================== 内存泄漏检测工具 ====================
function detectMemoryLeak() {
    const usage1 = process.memoryUsage();
    console.log('初始内存:', (usage1.heapUsed / 1024 / 1024).toFixed(2), 'MB');
    
    // 模拟一段时间的操作
    setTimeout(() => {
        const usage2 = process.memoryUsage();
        console.log('操作后内存:', (usage2.heapUsed / 1024 / 1024).toFixed(2), 'MB');
        
        const diff = ((usage2.heapUsed - usage1.heapUsed) / 1024 / 1024).toFixed(2);
        console.log('内存增长:', diff, 'MB');
        
        // 如果内存持续增长且不下降，可能存在泄漏
        if (parseFloat(diff) > 10) {
            console.warn('⚠️ 警告：内存增长过快，请检查是否存在内存泄漏！');
        }
    }, 5000);
}

detectMemoryLeak();
```

---

## 2.8 libuv 架构详细说明

### 2.8.1 libuv 线程池模型

**libuv** 是 Node.js 的核心异步 I/O 库，它提供了一个基于事件循环的异步模型。除了事件循环，libuv 还维护了一个 **线程池（Thread Pool）** 用于处理某些无法完全异步的操作。

#### 线程池架构图

```
┌─────────────────────────────────────────────────────────────┐
│                    Node.js 主线程                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              JavaScript 执行引擎 (V8)                │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │           Event Loop (事件循环)              │    │   │
│  │  │  Timers → Pending → Poll → Check → Close     │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│                          ↕                                  │
│                    任务队列 (Task Queue)                     │
└─────────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────────┐
│                  libuv 线程池 (默认4个线程)                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ Thread 1│ │ Thread 2│ │ Thread 3│ │ Thread 4│          │
│  │ 文件I/O │ │ DNS查询 │ │ 文件I/O │ │ Crypto  │          │
│  │ 压缩/解压│ │         │ │ 压缩/解压│ │ 编译正则 │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                             │
│  可通过 UV_THREADPOOL_SIZE 环境变量调整线程数量               │
└─────────────────────────────────────────────────────────────┘
```

#### 使用线程池的操作类型

| 操作类别 | 具体操作 | 说明 |
|---------|---------|------|
| **文件系统 I/O** | `fs.readFile()`, `fs.writeFile()` 等 | 除了 `fs.FS_*` 同步版本外的所有文件操作 |
| **DNS 查询** | `dns.lookup()` | 使用 getaddrinfo 的 DNS 解析 |
| **加密操作** | 部分 crypto 操作 | 如 pbkdf2、randomBytes、randomFill |
| **压缩/解压** | zlib 相关操作 | 压缩和解压大文件时使用 |
| **编译正则** | 复杂的正则表达式 | 某些情况下会在线程池中编译 |

```javascript
/**
 * libuv 线程池演示
 */

const fs = require('fs');
const crypto = require('crypto');
const dns = require('dns');
const zlib = require('zlib');

// ==================== 1. 文件 I/O 线程池 ====================
console.log('=== 文件 I/O 操作 ===');

// 这些文件操作会在 libuv 线程池中执行
const fileOperations = [
    fs.promises.readFile('./package.json', 'utf8'),
    fs.promises.readFile('./README.md', 'utf8'),
    fs.promises.readdir('./src'),
    fs.promises.stat('./node_modules')
];

Promise.allSettled(fileOperations)
    .then(results => {
        results.forEach((result, index) => {
            console.log(`操作 ${index + 1}: ${result.status === 'fulfilled' ? '成功' : '失败'}`);
        });
    });

// ==================== 2. DNS 查询线程池 ====================
console.log('\n=== DNS 查询 ===');

// dns.lookup() 使用线程池（底层调用 getaddrinfo）
dns.lookup('github.com', (err, address) => {
    if (err) {
        console.error('DNS 查询失败:', err.message);
    } else {
        console.log(`GitHub IP 地址: ${address}`);
    }
});

// 注意：dns.resolve() 不使用线程池，它直接执行 DNS 查询
dns.resolve4('github.com', (err, addresses) => {
    if (err) {
        console.error('DNS resolve 失败:', err.message);
    } else {
        console.log(`GitHub 所有 IPv4 地址: ${addresses.join(', ')}`);
    }
});

// ==================== 3. 加密操作线程池 ====================
console.log('\n=== 加密操作 ===');

// PBKDF2 密钥派生函数（CPU 密集型，在线程池执行）
const password = 'mySecretPassword';
const salt = crypto.randomBytes(16);

console.time('PBKDF2');
crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
    if (err) {
        console.error('加密失败:', err);
    } else {
        console.timeEnd('PBKDF2');
        console.log(`派生密钥长度: ${derivedKey.length} bytes`);
        console.log(`派生密钥前32字符: ${derivedKey.toString('hex').substring(0, 32)}...`);
    }
});

// ==================== 4. 压缩操作线程池 ====================
console.log('\n=== 压缩/解压操作 ===');

const largeData = 'x'.repeat(10 * 1024 * 1024); // 10MB 数据

console.time('压缩');
zlib.gzip(largeData, (err, compressed) => {
    if (err) {
        console.error('压缩失败:', err);
    } else {
        console.timeEnd('压缩');
        console.log(`原始大小: ${(largeData.length / 1024 / 1024).toFixed(2)} MB`);
        console.log(`压缩后大小: ${(compressed.length / 1024 / 1024).toFixed(2)} MB`);
        console.log(`压缩率: ${(100 - (compressed.length / largeData.length * 100)).toFixed(2)}%`);
        
        // 解压
        console.time('解压');
        zlib.gunzip(compressed, (err, decompressed) => {
            if (err) {
                console.error('解压失败:', err);
            } else {
                console.timeEnd('解压');
                console.log('✅ 压缩/解压完成！');
            }
        });
    }
});

// ==================== 调整线程池大小 ====================
console.log('\n=== 线程池配置 ===');
console.log(`当前线程池大小: ${process.env.UV_THREADPOOL_SIZE || '默认值 (4)'}`);
console.log('可通过设置环境变量 UV_THREADPOOL_SIZE=8 来调整');
```

### 2.8.2 线程池性能优化建议

```javascript
/**
 * libuv 线程池最佳实践
 */

// ✅ 最佳实践1：对于大量文件 I/O，考虑增加线程池大小
// 在启动脚本前设置：UV_THREADPOOL_SIZE=8 node app.js

// ✅ 最佳实践2：避免在热点路径上使用同步 I/O
// 错误示例：阻塞主线程
// const data = fs.readFileSync('large-file.txt'); // ❌ 阻塞

// 正确示例：异步 I/O
fs.promises.readFile('large-file.txt')
    .then(data => console.log('文件读取完成'))
    .catch(err => console.error('读取错误:', err));

// ✅ 最佳实践3：使用流式处理大文件
const { createReadStream, createWriteStream } = require('fs');

function streamLargeFile(inputPath, outputPath) {
    const readStream = createReadStream(inputPath);
    const writeStream = createWriteStream(outputPath);
    
    readStream.pipe(writeStream);
    
    return new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
        readStream.on('error', reject);
    });
}

// ✅ 最佳实践4：批量处理任务时控制并发
async function batchFileProcessing(files, concurrency = 4) {
    const results = [];
    
    for (let i = 0; i < files.length; i += concurrency) {
        const batch = files.slice(i, i + concurrency);
        const batchResults = await Promise.all(
            batch.map(file => fs.promises.readFile(file))
        );
        results.push(...batchResults);
    }
    
    return results;
}
```

---

## 2.9 Worker Threads 详细用法

### 2.9.1 Worker Threads 简介

**Worker Threads**（工作线程）是 Node.js 10.5+ 引入的多线程模块，允许开发者创建真正的多线程来执行 CPU 密集型任务，而不会阻塞主线程的事件循环。

#### 主线程 vs 工作线程对比

| 特性 | 主线程 (Main Thread) | Worker Threads |
|------|---------------------|----------------|
| **职责** | 处理 I/O、事件循环、轻量计算 | 执行 CPU 密集型任务 |
| **阻塞影响** | 阻塞整个应用 | 只影响自身 |
| **内存共享** | 可通过 SharedArrayBuffer 共享 | 可通过 SharedArrayBuffer 共享 |
| **通信方式** | N/A | postMessage / onmessage |
| **适用场景** | 网络 I/O、文件 I/O | 图像处理、数据加密、复杂计算 |

### 2.9.2 基本用法示例

#### 主线程代码 (main.js)

```javascript
/**
 * Worker Threads 基本用法 - 主线程
 */

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const path = require('path');

if (isMainThread) {
    // ==================== 主线程代码 ====================
    console.log('📱 主线程启动');
    console.log(`主线程 PID: ${process.pid}`);
    
    // 创建工作线程
    const worker = new Worker(__filename, {
        workerData: {
            number: 40,  // 计算 fibonacci(40)
            iterations: 10  // 计算10次
        }
    });
    
    // 监听工作线程消息
    worker.on('message', (result) => {
        console.log('📨 收到工作线程消息:');
        console.log(`   结果: ${result.fibonacciNumber}`);
        console.log(`   耗时: ${result.executionTime}ms`);
        console.log(`   工作线程 PID: ${result.workerPid}`);
    });
    
    // 监听错误
    worker.on('error', (err) => {
        console.error('❌ 工作线程错误:', err);
    });
    
    // 监听退出
    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`❌ 工作线程异常退出，退出码: ${code}`);
        } else {
            console.log('✅ 工作线程正常退出');
        }
        console.log('📱 主线程继续执行其他任务...');
    });
    
    // 主线程可以继续做其他事情
    console.log('⏳ 主线程发送任务给工作线程后继续执行...');
    
} else {
    // ==================== 工作线程代码 ====================
    console.log('🔧 工作线程启动');
    console.log(`工作线程 PID: ${process.pid}`);
    
    const { number, iterations } = workerData;
    
    // Fibonacci 计算（CPU 密集型任务）
    function fibonacci(n) {
        if (n <= 1) return n;
        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) {
            [a, b] = [b, a + b];
        }
        return b;
    }
    
    console.log(`开始计算 fibonacci(${number})，重复 ${iterations} 次...`);
    
    const startTime = Date.now();
    
    // 执行多次计算以模拟长时间运行的任务
    for (let i = 0; i < iterations; i++) {
        const result = fibonacci(number);
        if (i === iterations - 1) {
            const executionTime = Date.now() - startTime;
            
            // 发送结果回主线程
            parentPort.postMessage({
                fibonacciNumber: result,
                executionTime,
                workerPid: process.pid
            });
        }
    }
}
```

### 2.9.3 SharedArrayBuffer 共享内存

**SharedArrayBuffer** 允许主线程和工作线程之间共享内存，避免数据复制的开销，提高性能。

```javascript
/**
 * SharedArrayBuffer 共享内存示例 - 主线程
 */

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    console.log('=== SharedArrayBuffer 示例 ===\n');
    
    // 创建共享内存缓冲区（Int32Array，长度为10）
    const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 10);
    const sharedArray = new Int32Array(sharedBuffer);
    
    // 初始化数据
    for (let i = 0; i < sharedArray.length; i++) {
        sharedArray[i] = i * 10;
    }
    
    console.log('初始共享数组:', [...sharedArray]);
    
    // 创建多个工作线程同时修改共享内存
    const worker1 = new Worker(__filename, {
        workerData: {
            sharedBuffer,
            startIndex: 0,
            endIndex: 5,
            workerId: 1
        }
    });
    
    const worker2 = new Worker(__filename, {
        workerData: {
            sharedBuffer,
            startIndex: 5,
            endIndex: 10,
            workerId: 2
        }
    });
    
    let completedWorkers = 0;
    
    const handleWorkerMessage = (workerId) => {
        completedWorkers++;
        console.log(`工作线程 ${workerId} 完成`);
        
        if (completedWorkers === 2) {
            console.log('\n最终共享数组:', [...sharedArray]);
            console.log('✅ 多个工作线程成功共享和修改了同一块内存！');
        }
    };
    
    worker1.on('message', () => handleWorkerMessage(1));
    worker2.on('message', () => handleWorkerMessage(2));
    
    worker1.on('error', console.error);
    worker2.on('error', console.error);
    
} else {
    // 工作线程代码
    const { sharedBuffer, startIndex, endIndex, workerId } = workerData;
    const sharedArray = new Int32Array(sharedBuffer);
    
    console.log(`工作线程 ${workerId}: 处理索引 ${startIndex}-${endIndex - 1}`);
    
    // 修改共享数组的指定范围
    for (let i = startIndex; i < endIndex; i++) {
        sharedArray[i] = sharedArray[i] + (workerId * 100);  // 每个worker加不同的值
    }
    
    // 通知主线程完成
    parentPort.postMessage({ workerId, status: 'completed' });
}
```

### 2.9.4 Worker Threads 实战：并行图像处理

```javascript
/**
 * Worker Threads 实战：并行图像处理
 * 场景：批量调整图片尺寸（模拟）
 */

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const path = require('path');
const os = require('os');

if (isMainThread) {
    console.log('🖼️  并行图像处理示例\n');
    
    // 模拟图片列表
    const images = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `image_${i + 1}.jpg`,
        size: Math.floor(Math.random() * 5000) + 1000  // 1-6KB（模拟）
    }));
    
    console.log(`待处理图片数量: ${images.length}`);
    console.log(`CPU 核心数: ${os.cpus().length}\n`);
    
    const startTime = Date.now();
    let completedImages = 0;
    const results = [];
    
    // 根据 CPU 核心数决定并发 worker 数量
    const maxWorkers = Math.min(os.cpus().length, images.length);
    const chunkSize = Math.ceil(images.length / maxWorkers);
    
    console.log(`创建 ${maxWorkers} 个工作线程...\n`);
    
    // 分配任务给各个 worker
    for (let i = 0; i < maxWorkers; i++) {
        const startIdx = i * chunkSize;
        const endIdx = Math.min(startIdx + chunkSize, images.length);
        const chunk = images.slice(startIdx, endIdx);
        
        const worker = new Worker(__filename, {
            workerData: {
                images: chunk,
                workerId: i + 1
            }
        });
        
        worker.on('message', (result) => {
            completedImages++;
            results.push(...result.processedImages);
            
            console.log(`✅ 工作线程 ${result.workerId}: 完成 ${result.processedImages.length} 张图片`);
            
            if (completedImages === images.length || completedImages === maxWorkers) {
                const totalTime = Date.now() - startTime;
                console.log(`\n🎉 全部完成！总耗时: ${totalTime}ms`);
                console.log(`处理图片总数: ${results.length}`);
                
                // 显示部分结果
                console.log('\n处理结果预览:');
                results.slice(0, 5).forEach(img => {
                    console.log(`  ${img.name}: ${img.originalSize}KB → ${img.newSize}KB (${img.operation})`);
                });
                if (results.length > 5) {
                    console.log(`  ... 还有 ${results.length - 5} 张图片`);
                }
            }
        });
        
        worker.on('error', (err) => {
            console.error(`❌ 工作线程 ${i + 1} 错误:`, err.message);
        });
    }
    
} else {
    // 工作线程：处理图片
    const { images, workerId } = workerData;
    
    const processedImages = images.map(img => {
        // 模拟图片处理（调整尺寸、压缩等）
        const operations = ['resize', 'compress', 'thumbnail', 'optimize'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        // 模拟处理时间
        const start = Date.now();
        while (Date.now() - start < Math.random() * 50 + 10);  // 10-60ms
        
        return {
            ...img,
            originalSize: img.size,
            newSize: Math.floor(img.size * (Math.random() * 0.5 + 0.3)),  // 压缩到30%-80%
            operation,
            processedAt: new Date().toISOString()
        };
    });
    
    // 返回处理结果
    parentPort.postMessage({
        workerId,
        processedImages,
        processingTime: Date.now() - workerData.startTime || 0
    });
}
```

### 2.9.5 Worker Threads 最佳实践

```javascript
/**
 * Worker Threads 最佳实践总结
 */

// ✅ 实践1：合理控制 Worker 数量
// 建议：不超过 CPU 核心数
const MAX_WORKERS = require('os').cpus().length;

// ✅ 实践2：使用 Worker Pool（线程池模式）
class WorkerPool {
    constructor(scriptPath, numWorkers) {
        this.workers = [];
        this.taskQueue = [];
        this.activeTasks = 0;
        
        for (let i = 0; i < numWorkers; i++) {
            this._createWorker(scriptPath, i);
        }
    }
    
    _createWorker(scriptPath, id) {
        const { Worker } = require('worker_threads');
        const worker = new Worker(scriptPath);
        
        worker.on('message', (result) => {
            this.activeTasks--;
            if (this.taskQueue.length > 0) {
                const { task, resolve, reject } = this.taskQueue.shift();
                this._runTask(worker, task, resolve, reject);
            }
        });
        
        this.workers.push(worker);
    }
    
    _runTask(worker, task, resolve, reject) {
        this.activeTasks++;
        worker.once('message', resolve);
        worker.once('error', reject);
        worker.postMessage(task);
    }
    
    run(task) {
        return new Promise((resolve, reject) => {
            const idleWorker = this.workers.find(w => !this._isWorkerBusy(w));
            
            if (idleWorker && this.activeTasks < this.workers.length) {
                this._runTask(idleWorker, task, resolve, reject);
            } else {
                this.taskQueue.push({ task, resolve, reject });
            }
        });
    }
    
    _isWorkerBusy(worker) {
        // 简化版：实际实现需要跟踪每个 worker 的状态
        return false;
    }
}

// ✅ 实践3：及时终止不再需要的 Worker
function gracefulShutdown(workers) {
    workers.forEach(worker => {
        worker.terminate()
            .then(() => console.log('Worker 已终止'))
            .catch(err => console.error('终止 Worker 失败:', err));
    });
}

// ✅ 实践4：错误处理和超时控制
function runWithTimeout(worker, task, timeout = 30000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            worker.terminate();
            reject(new Error('任务超时'));
        }, timeout);
        
        worker.once('message', (result) => {
            clearTimeout(timer);
            resolve(result);
        });
        
        worker.once('error', (err) => {
            clearTimeout(timer);
            reject(err);
        });
        
        worker.postMessage(task);
    });
}
```

---

## 2.10 child_process 详解

### 2.10.1 child_process 概述

Node.js 的 `child_process` 模块提供了创建子进程的能力，可以通过以下四种方式创建子进程：

| 方法 | 特点 | 适用场景 | 返回类型 |
|------|------|----------|----------|
| **spawn()** | 流式输出，适合大数据量 | 长时间运行的进程、实时输出 | ChildProcess |
| **exec()** | 缓冲输出，适合小数据量 | 简单命令、Shell 脚本 | 回调（buffer） |
| **execFile()** | 直接执行文件，不经过 Shell | 可执行文件、安全性要求高 | 回调（buffer） |
| **fork()** | 专门用于 Node.js 脚本 | Node.js 进程间通信 | ChildProcess |

### 2.10.2 spawn() - 流式子进程

```javascript
/**
 * spawn() 用法详解
 * 特点：返回流（stdout/stderr），适合处理大量输出
 */

const { spawn } = require('child_process');

// ==================== 基础用法 ====================
console.log('=== spawn() 基础用法 ===\n');

// 执行 ls 命令
const ls = spawn('ls', ['-lh', '/usr'], {
    shell: true,  // 在 Shell 中执行
    cwd: process.cwd(),  // 工作目录
    env: process.env,  // 环境变量
    stdio: 'pipe'  // 标准 I/O 配置
});

// 监听 stdout 数据流（流式输出）
ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

// 监听 stderr 数据流
ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

// 监听关闭事件
ls.on('close', (code) => {
    console.log(`子进程退出码: ${code}`);
});

// ==================== 高级用法：实时处理输出 ====================
console.log('\n=== spawn() 实时处理 ===\n');

function runCommand(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            shell: true,
            ...options
        });
        
        let stdout = '';
        let stderr = '';
        
        child.stdout.on('data', (data) => {
            const output = data.toString();
            stdout += output;
            // 实时打印每一行
            output.split('\n').filter(line => line.trim()).forEach(line => {
                console.log(`[STDOUT] ${line}`);
            });
        });
        
        child.stderr.on('data', (data) => {
            const output = data.toString();
            stderr += output;
            output.split('\n').filter(line => line.trim()).forEach(line => {
                console.error(`[STDERR] ${line}`);
            });
        });
        
        child.on('close', (code) => {
            if (code === 0) {
                resolve({ code, stdout, stderr });
            } else {
                reject(new Error(`命令执行失败，退出码: ${code}\n${stderr}`));
            }
        });
        
        child.on('error', (err) => {
            reject(new Error(`无法启动子进程: ${err.message}`));
        });
    });
}

// 使用示例：运行 npm 命令
// runCommand('npm', ['list', '--depth=0'])
//     .then(result => console.log('命令执行成功'))
//     .catch(err => console.error('命令执行失败:', err.message));

// ==================== 管道（Pipe）用法 ====================
console.log('=== spawn() 管道用法 ===\n');

// 将一个命令的输出传递给另一个命令
const find = spawn('find', ['.','-name','*.js','-type','f']);
const wc = spawn('wc', ['-l']);

// 将 find 的 stdout 连接到 wc 的 stdin
find.stdout.pipe(wc.stdin);

wc.stdout.on('data', (data) => {
    console.log(`JavaScript 文件总行数: ${data}`);
});
```

### 2.10.3 exec() - 缓冲输出子进程

```javascript
/**
 * exec() 用法详解
 * 特点：将输出缓冲到内存，适合小数据量的简单命令
 */

const { exec } = require('child_process');

// ==================== 基础用法 ====================
console.log('=== exec() 基础用法 ===\n');

exec('ls -lh', (error, stdout, stderr) => {
    if (error) {
        console.error(`执行错误: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`标准错误: ${stderr}`);
        return;
    }
    console.log(`标准输出:\n${stdout}`);
});

// ==================== Promise 封装 ====================
function execPromise(command, options = {}) {
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

// 使用示例
(async () => {
    try {
        const { stdout } = await execPromise('node --version');
        console.log(`Node.js 版本: ${stdout.trim()}`);
        
        const { stdout: npmVersion } = await execPromise('npm --version');
        console.log(`npm 版本: ${npmVersion.trim()}`);
        
    } catch ({ error, stderr }) {
        console.error('命令执行失败:', error.message);
        console.error('错误输出:', stderr);
    }
})();

// ==================== 带超时的 exec ====================
console.log('\n=== 带 timeout 的 exec ===\n');

exec('sleep 5', { timeout: 2000 }, (error, stdout, stderr) => {
    if (error) {
        if (error.killed) {
            console.log('❌ 子进程因超时被终止');
        }
        console.error(`错误: ${error.message}`);
    } else {
        console.log(`输出: ${stdout}`);
    }
});
```

### 2.10.4 fork() - Node.js 进程通信

```javascript
/**
 * fork() 用法详解
 * 特点：专门用于执行 Node.js 脚本，支持进程间通信（IPC）
 */

const { fork } = require('child_process');
const path = require('path');

if (process.env.CHILD_PROCESS === 'true') {
    // ==================== 子进程代码 ====================
    console.log('📦 子进程启动');
    console.log(`子进程 PID: ${process.pid}`);
    console.log(`父进程 PPID: ${process.ppid}`);
    
    // 接收来自父进程的消息
    process.on('message', (msg) => {
        console.log('📨 子进程收到消息:', msg);
        
        if (msg.type === 'compute') {
            // 执行计算任务
            const result = heavyComputation(msg.data);
            
            // 发送结果回父进程
            process.send({
                type: 'result',
                data: result,
                pid: process.pid
            });
        }
        
        if (msg.type === 'exit') {
            console.log('📦 子进程收到退出指令');
            process.exit(0);
        }
    });
    
    // 通知父进程已就绪
    process.send({ type: 'ready', pid: process.pid });
    
    function heavyComputation(n) {
        // 模拟 CPU 密集型任务
        let result = 0;
        for (let i = 0; i < n; i++) {
            result += Math.sqrt(i) * Math.sin(i);
        }
        return { input: n, output: result };
    }
    
} else {
    // ==================== 父进程代码 ====================
    console.log('👤 父进程启动\n');
    
    // fork 当前文件作为子进程
    const child = fork(__filename, [], {
        env: { ...process.env, CHILD_PROCESS: 'true' },
        silent: false  // 是否共享 stdio
    });
    
    console.log(`父进程 PID: ${process.pid}`);
    console.log(`子进程 PID: ${child.pid}\n`);
    
    // 监听子进程消息
    child.on('message', (msg) => {
        console.log('👤 父进程收到消息:', msg);
        
        if (msg.type === 'ready') {
            console.log('✅ 子进程就绪，开始发送任务...');
            
            // 发送计算任务
            setTimeout(() => {
                child.send({ type: 'compute', data: 1000000 });
            }, 1000);
        }
        
        if (msg.type === 'result') {
            console.log('📊 计算结果:', msg.data);
            
            // 发送退出指令
            setTimeout(() => {
                child.send({ type: 'exit' });
            }, 500);
        }
    });
    
    // 监听子进程退出
    child.on('exit', (code, signal) => {
        console.log(`\n📦 子进程退出: code=${code}, signal=${signal}`);
        console.log('👤 父进程继续运行...');
    });
    
    // 断开连接（不杀死进程）
    // child.disconnect();
    
    // 杀死子进程
    // child.kill('SIGTERM');
}
```

### 2.10.5 三种方式对比与选择指南

```javascript
/**
 * spawn vs exec vs fork 对比
 */

const comparison = `
╔═══════════════╦═══════════════════════════════════════════════════╗
║     方法      ║                   特点对比                        ║
╠═══════════════╬═══════════════════════════════════════════════════╣
║   spawn()     ║ • 流式输出，内存效率高                             ║
║               ║ • 适合长时间运行的进程                              ║
║               ║ • 可以实时处理输出                                ║
║               ║ • 支持管道（pipe）操作                            ║
║               ║ • 示例：ffmpeg 视频转码、webpack 构建             ║
╠═══════════════╬═══════════════════════════════════════════════════╣
║   exec()      ║ • 缓冲输出到内存                                  ║
║               ║ • 适合简单的短命令                                ║
║               ║ • 自动调用 Shell 解析命令                         ║
║               ║ • 使用方便但有大输出限制                          ║
║               ║ • 示例：ls、git status、npm version              ║
╠═══════════════╬═══════════════════════════════════════════════════╣
║   fork()      ║ • 专门用于 Node.js 脚本                           ║
║               ║ • 支持 IPC 进程间通信                            ║
║               ║ • 可以传递复杂数据对象                            ║
║               ║ • 子进程可以使用所有 Node.js API                  ║
║               ║ • 示例：CPU 密集型任务、微服务架构               ║
╚═══════════════╩═══════════════════════════════════════════════════╝
`;

console.log(comparison);

// 选择决策树
function chooseMethod(scenario) {
    const scenarios = {
        'long-running-process': {
            method: 'spawn()',
            reason: '流式输出，不会因为输出过大导致内存溢出',
            example: 'ffmpeg -i input.mp4 output.webm'
        },
        'simple-command': {
            method: 'exec()',
            reason: '使用简单，自动缓冲输出',
            example: 'git status'
        },
        'node-script': {
            method: 'fork()',
            reason: '支持 IPC 通信，可以传递复杂对象',
            example: 'fork("heavy-computation.js")'
        },
        'security-sensitive': {
            method: 'execFile()',
            reason: '不经过 Shell 解释，更安全',
            example: 'execFile("/usr/bin/git", ["status"])'
        },
        'need-pipe': {
            method: 'spawn()',
            reason: '原生支持管道操作',
            example: 'spawn("cat").pipe(spawn("grep", ["pattern"]))'
        }
    };
    
    return scenarios[scenario] || { method: 'unknown', reason: '请重新评估需求' };
}

// 使用示例
console.log('\n选择建议:');
console.log('场景1 - 长时间运行的进程:', chooseMethod('long-running-process').method);
console.log('场景2 - 简单的 Shell 命令:', chooseMethod('simple-command').method);
console.log('场景3 - Node.js 脚本:', chooseMethod('node-script').method);
```

---

## 2.11 Cluster 模块详解

### 2.11.1 Cluster 模块概述

**Cluster 模块**允许 Node.js 创建共享相同端口的子进程（workers），从而充分利用多核 CPU 的能力，提高应用的吞吐量和可靠性。

#### Cluster 架构图

```
┌──────────────────────────────────────────────────────────────┐
│                      Client (客户端)                         │
│                         HTTP 请求                            │
└───────────────────────────┬──────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                    Load Balancer (负载均衡)                   │
│                 （操作系统或 Round-Robin）                     │
└───────────────────────────┬──────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   Master      │  │   Worker 1    │  │   Worker 2    │
│   (Primary)   │  │   PID: 12345  │  │   PID: 12346  │
│               │  │               │  │               │
│ • 管理 Workers│  │ • 处理请求    │  │ • 处理请求    │
│ • 监控状态    │  │ • 执行业务逻辑│  │ • 执行业务逻辑│
│ • 重启策略    │  │               │  │               │
│ • 日志收集    │  │ Port: 3000   │  │ Port: 3000    │
└───────────────┘  └───────────────┘  └───────────────┘
                                           (更多 Workers...)
```

### 2.11.2 基本 Cluster 实现

```javascript
/**
 * Cluster 模块基本用法
 * 功能：根据 CPU 核心数创建多个 Worker 进程
 */

const cluster = require('cluster');
const http = require('http');
const os = require('os');
const process = require('process');

if (cluster.isMaster) {
    // ==================== Master 进程代码 ====================
    const cpuCount = os.cpus().length;
    
    console.log(`Master ${process.pid} 正在启动`);
    console.log(`检测到 ${cpuCount} 个 CPU 核心\n`);
    
    // 根据 CPU 数量 fork workers
    const workers = [];
    for (let i = 0; i < cpuCount; i++) {
        const worker = cluster.fork();
        workers.push(worker);
        console.log(`✅ Worker ${worker.id} 启动 (PID: ${worker.pid})`);
    }
    
    console.log(`\n共启动 ${workers.length} 个 Worker 进程`);
    console.log('等待 HTTP 请求...\n');
    
    // ==================== Master 进程管理功能 ====================
    
    // 监听 Worker 退出事件，自动重启
    cluster.on('exit', (worker, code, signal) => {
        console.log(`\n⚠️  Worker ${worker.pid} 退出`);
        console.log(`   退出码: ${code}, 信号: ${signal}`);
        
        // 重启策略：立即重启新的 Worker
        console.log('🔄 正在重启 Worker...');
        const newWorker = cluster.fork();
        workers[workers.indexOf(worker)] = newWorker;
        console.log(`✅ 新 Worker 启动 (PID: ${newWorker.pid})`);
    });
    
    // 监听 Worker 在线事件
    cluster.on('online', (worker) => {
        console.log(`💚 Worker ${worker.pid} 已上线`);
    });
    
    // 监听 setup 事件（fork 后触发）
    cluster.on('setup', (settings) => {
        console.log('Cluster 设置完成:', settings);
    });
    
    // 优雅关闭：监听 SIGINT/SIGTERM 信号
    process.on('SIGTERM', () => {
        console.log('\n🛑 收到 SIGTERM 信号，开始优雅关闭...');
        
        // 逐个关闭 Workers
        workers.forEach((worker, index) => {
            setTimeout(() => {
                console.log(`关闭 Worker ${worker.pid}`);
                worker.disconnect();
                worker.process.kill('SIGTERM');
            }, index * 1000);  // 每个 Worker 间隔1秒关闭
        });
        
        // 最后关闭 Master
        setTimeout(() => {
            console.log('✅ 所有进程已关闭');
            process.exit(0);
        }, workers.length * 1000 + 1000);
    });
    
} else {
    // ==================== Worker 进程代码 ====================
    
    // 每个 Worker 都是一个独立的 HTTP 服务器
    // 它们共享同一个端口（由操作系统进行负载均衡）
    
    const server = http.createServer((req, res) => {
        const timestamp = new Date().toISOString();
        const workerInfo = `Worker ${process.pid}`;
        
        // 模拟不同响应时间（验证负载均衡）
        const delay = Math.random() * 100;
        
        setTimeout(() => {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'X-Worker-PID': process.pid.toString(),
                'X-Timestamp': timestamp
            });
            
            res.end(JSON.stringify({
                message: 'Hello from Cluster!',
                worker: workerInfo,
                pid: process.pid,
                url: req.url,
                method: req.method,
                headers: req.headers['user-agent'],
                timestamp,
                processingTime: `${delay.toFixed(2)}ms`
            }));
        }, delay);
    });
    
    // 错误处理
    server.on('error', (err) => {
        console.error(`Worker ${process.pid} 服务器错误:`, err.message);
    });
    
    server.listen(3000, () => {
        console.log(`Worker ${process.pid} 正在监听端口 3000`);
    });
}
```

### 2.11.3 Master-Worker 通信机制

```javascript
/**
 * Cluster 进程间通信（IPC）
 * Master 和 Worker 可以通过 send()/on('message') 通信
 */

const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) {
    // Master 进程
    const worker = cluster.fork();
    
    // 向 Worker 发送消息
    setTimeout(() => {
        console.log('📤 Master → Worker: 发送配置更新');
        worker.send({
            type: 'config-update',
            data: {
                maxConnections: 1000,
                timeout: 30000,
                featureFlags: {
                    newAPI: true,
                    betaFeature: false
                }
            }
        });
    }, 2000);
    
    // 接收 Worker 消息
    worker.on('message', (msg) => {
        console.log('📥 Master ← Worker:', msg.type);
        
        if (msg.type === 'metrics') {
            console.log('   性能指标:', msg.data);
        }
        
        if (msg.type === 'alert') {
            console.log('   ⚠️  告警:', msg.data);
        }
    });
    
    // 定期收集指标
    setInterval(() => {
        Object.values(cluster.workers).forEach(worker => {
            worker.send({ type: 'request-metrics' });
        });
    }, 5000);
    
} else {
    // Worker 进程
    
    // 接收 Master 消息
    process.on('message', (msg) => {
        console.log('📥 Worker ← Master:', msg.type);
        
        if (msg.type === 'config-update') {
            console.log('   收到新配置:', msg.data);
            // 应用新配置...
        }
        
        if (msg.type === 'request-metrics') {
            // 收集并上报性能指标
            const metrics = collectMetrics();
            process.send({
                type: 'metrics',
                data: metrics
            });
        }
    });
    
    // 模拟收集指标
    function collectMetrics() {
        const memUsage = process.memoryUsage();
        return {
            pid: process.pid,
            uptime: process.uptime(),
            memory: {
                heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
                heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
                rss: Math.round(memUsage.rss / 1024 / 1024)
            },
            cpu: process.cpuUsage(),
            requests: {
                total: Math.floor(Math.random() * 10000),
                errors: Math.floor(Math.random() * 100),
                avgResponseTime: Math.random() * 50 + 20
            }
        };
    }
    
    // 启动 HTTP 服务器（简化版）
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('OK');
    }).listen(3000);
}
```

### 2.11.4 高级重启策略

```javascript
/**
 * Cluster 高级重启策略
 * 包括：优雅重启（Graceful Restart）、滚动重启（Rolling Restart）、零停机部署
 */

const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) {
    class ClusterManager {
        constructor() {
            this.workers = new Map();
            this.restartQueue = [];
            this.isRestarting = false;
        }
        
        // 初始化 Workers
        init(numWorkers) {
            console.log(`初始化 ${numWorkers} 个 Workers...`);
            for (let i = 0; i < numWorkers; i++) {
                this.spawnWorker(i);
            }
        }
        
        // 创建新 Worker
        spawnWorker(id) {
            const worker = cluster.fork({ WORKER_ID: id });
            this.workers.set(id, worker);
            
            worker.on('exit', (code, signal) => {
                this.workers.delete(id);
                console.log(`Worker ${id} 退出: code=${code}, signal=${signal}`);
                
                // 如果不是主动重启，自动重启
                if (!this.isRestarting) {
                    console.log(`自动重启 Worker ${id}`);
                    this.spawnWorker(id);
                }
            });
            
            return worker;
        }
        
        // 优雅重启（Graceful Restart）
        async gracefulRestart() {
            if (this.isRestarting) {
                console.log('正在重启中，请稍候...');
                return;
            }
            
            this.isRestarting = true;
            console.log('\n🔄 开始优雅重启...\n');
            
            const workerIds = Array.from(this.workers.keys());
            
            for (const id of workerIds) {
                await this.restartWorkerGracefully(id);
                // 等待一段时间再重启下一个
                await this.sleep(2000);
            }
            
            this.isRestarting = false;
            console.log('\n✅ 优雅重启完成！\n');
        }
        
        // 单个 Worker 优雅重启
        restartWorkerGracefully(id) {
            return new Promise((resolve) => {
                const oldWorker = this.workers.get(id);
                if (!oldWorker) {
                    resolve();
                    return;
                }
                
                console.log(`重启 Worker ${id} (PID: ${oldWorker.pid})`);
                
                // 先创建新的 Worker
                const newWorker = this.spawnWorker(id);
                
                // 等待新 Worker 就绪
                newWorker.on('online', () => {
                    console.log(`  新 Worker ${id} 就绪 (PID: ${newWorker.pid})`);
                    
                    // 通知旧 Worker 停止接收新连接
                    oldWorker.send({ type: 'shutdown' });
                    
                    // 等待旧 Worker 处理完现有连接
                    setTimeout(() => {
                        console.log(`  关闭旧 Worker ${id}`);
                        oldWorker.disconnect();
                        oldWorker.process.kill('SIGTERM');
                        resolve();
                    }, 5000);  // 给旧 Worker 5秒处理剩余请求
                });
            });
        }
        
        // 滚动重启（Rolling Restart）- 用于零停机部署
        async rollingRestart(deployMessage) {
            console.log(`\n🚀 开始滚动部署: ${deployMessage}\n`);
            
            const workerIds = Array.from(this.workers.keys());
            
            for (let i = 0; i < workerIds.length; i++) {
                const id = workerIds[i];
                console.log(`[${i + 1}/${workerIds.length}] 重启 Worker ${id}`);
                
                await this.restartWorkerGracefully(id);
                
                // 健康检查
                await this.healthCheck();
            }
            
            console.log('\n✅ 滚动部署完成！\n');
        }
        
        // 健康检查
        async healthCheck() {
            console.log('  执行健康检查...');
            // 这里可以实现真实的健康检查逻辑
            await this.sleep(1000);
            console.log('  ✅ 健康检查通过');
        }
        
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
    
    // 使用 ClusterManager
    const manager = new ClusterManager();
    manager.init(require('os').cpus().length);
    
    // 监听 SIGHUP 信号触发优雅重启
    process.on('SIGHUP', () => {
        console.log('\n收到 SIGHUP 信号');
        manager.gracefulRestart();
    });
    
    // 模拟：10秒后执行一次滚动重启
    // setTimeout(() => {
    //     manager.rollingRestart('v2.0.0 部署');
    // }, 10000);
    
} else {
    // Worker 进程
    const id = process.env.WORKER_ID;
    let isShuttingDown = false;
    let connections = 0;
    
    // 接收 Master 的关闭指令
    process.on('message', (msg) => {
        if (msg.type === 'shutdown') {
            console.log(`Worker ${id}: 收到关闭指令，停止接受新连接`);
            isShuttingDown = true;
        }
    });
    
    const server = http.createServer((req, res) => {
        if (isShuttingDown) {
            res.writeHead(503, { 'Connection': 'close' });
            res.end('Server is shutting down');
            return;
        }
        
        connections++;
        
        res.writeHead(200);
        res.end(`Hello from Worker ${id}! Active connections: ${connections}`);
        
        req.on('close', () => connections--);
    });
    
    server.listen(3000, () => {
        console.log(`Worker ${id} started and listening on port 3000`);
    });
}
```

### 2.11.5 Cluster 生产环境最佳实践

```javascript
/**
 * Cluster 生产环境配置清单
 */

// ✅ 1. 日志管理
// 所有 Worker 的日志应该统一收集和管理
const winston = require('winston'); // 或其他日志库
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// ✅ 2. 健康检查端点
// 每个都应该提供健康检查接口
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        pid: process.pid,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
    });
});

// ✅ 3. 优雅关闭
// 必须正确处理 SIGTERM/SIGINT 信号
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

function gracefulShutdown(signal) {
    logger.info(`${signal} received. Shutting down gracefully...`);
    
    // 停止接受新连接
    server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
    });
    
    // 强制超时后退出
    setTimeout(() => {
        logger.error('Forced shutdown due to timeout');
        process.exit(1);
    }, 10000);
}

// ✅ 4. 监控和告警
// 集成 Prometheus、Datadog 等监控工具
const client = require('prom-client'); // Prometheus 客户端

// ✅ 5. 环境变量配置
// 通过环境变量配置 Cluster 行为
const config = {
    workers: parseInt(process.env.WORKER_COUNT) || require('os').cpus().length,
    port: parseInt(process.env.PORT) || 3000,
    restartDelay: parseInt(process.env.RESTART_DELAY_MS) || 2000,
    shutdownTimeout: parseInt(process.env.SHUTDOWN_TIMEOUT_MS) || 10000
};

module.exports = { logger, config };
```

---

## 本章要点速查

### 核心架构

| 层级 | 技术 | 作用 |
|------|------|------|
| 应用层 | JavaScript | 业务逻辑 |
| API 层 | Node.js 模块 | 高级抽象 |
| Binding 层 | C++ | JS ↔ C++ 桥接 |
| 引擎层 | V8 | JS 执行引擎 |
| 底层 | libuv | 异步 I/O / 事件循环 |

### 事件循环六阶段

1. **Timers**：`setTimeout/setInterval` 回调
2. **Pending Callbacks**：延迟的系统回调
3. **Idle/Prepare**：内部使用
4. **Poll**：I/O 回调（**核心阶段**）
5. **Check**：`setImmediate` 回调
6. **Close Callbacks**：关闭事件回调

### 进程/线程选择指南

| 场景 | 推荐方案 | 模块 |
|------|----------|------|
| 执行 shell 命令 | 子进程 | `child_process.exec/spawn` |
| 多核利用 | 进程集群 | `cluster` |
| CPU 密集型任务 | 工作线程 | `worker_threads` |
| IPC 通信 | 消息传递 | `process.send/parentPort` |

### 内存管理要点

- **新生代**：Scavenge 算法，存放短期对象
- **老生代**：Mark-Sweep/Compact，存放长期对象
- **常见泄漏**：全局变量、闭包、事件监听器、无限缓存、未清理 Timer
- **诊断工具**：`--inspect`、heap snapshot、clinic.js

---

# 第3章：模块系统

## 📚 本章学习目标

- 深入理解 **CommonJS 规范** 的完整机制（require/module.exports/exports 区别）
- 掌握 **ES Modules** 的特性和使用方式
- 理解模块的**完整加载流程**（解析→加载→编译→链接→执行）
- 掌握**循环依赖问题**及其解决方案
- 熟悉 **Node.js 内置模块** 的分类和使用
- 理解**模块缓存机制**的工作原理

---

## 3.1 CommonJS 规范详解

### 3.1.1 核心概念

CommonJS 是 Node.js 原生的模块规范，采用**运行时加载**方式。

```javascript
/**
 * CommonJS 模块系统核心对象
 *
 * 每个模块内部自动拥有以下变量：
 * - __dirname: 当前模块所在目录的绝对路径
 * - __filename: 当前模块文件的绝对路径
 * - exports: module.exports 的引用（导出快捷方式）
 * - module: 当前模块的信息对象
 * - require(): 模块加载函数
 * - parent: 父模块（require 该模块的模块）
 * - children: 子模块（该模块 require 的模块列表）
 */

// 查看模块信息
console.log('模块目录:', __dirname);
console.log('模块文件:', __filename);
console.log('模块 ID:', module.id);           // 通常等于 __filename
console.log('是否为主模块:', module.loaded);    // 是否已完成加载
console.log('父模块:', module.parent);         // 谁 require 了该模块
console.log('子模块:', module.children);       // 该模块 require 了哪些模块
```

### 3.1.2 module.exports vs exports

这是初学者最容易混淆的概念，必须彻底理解！

```javascript
/**
 * module.exports 与 exports 的关系
 *
 * 关键点：
 * 1. exports 是 module.exports 的初始引用（类似 const exports = module.exports）
 * 2. require() 返回的是 module.exports，不是 exports
 * 3. 如果重新赋值 exports，会断开与 module.exports 的联系
 */

// ===== 方式1：使用 module.exports（推荐）=====

// calculator.js
module.exports = {
    // 导出一个对象字面量
    name: '计算器模块',
    
    // 导出方法
    add(a, b) {
        return a + b;
    },
    
    subtract(a, b) {
        return a - b;
    },
    
    // 导出属性
    version: '1.0.0'
};

// main.js
const calc = require('./calculator');
console.log(calc.name);        // 输出：计算器模块
console.log(calc.add(5, 3));   // 输出：8
// ===== 方式2：使用 exports（便捷语法）=====

// utils.js
// ✅ 正确：向 exports 对象添加属性
exports.greet = function(name) {
    return `你好，${name}！`;
};

exports.getTime = function() {
    return new Date().toLocaleString('zh-CN');
};

// ❌ 错误：不能重新赋值 exports（会导致断开引用）
// exports = { value: 123 }; // 这样做无效！require() 得到的是空对象 {}
// ===== 方式3：混合使用（理解原理）=====

// mixed.js
// 初始状态：exports 和 module.exports 指向同一个对象 {}
console.log(exports === module.exports); // true

// 向 exports 添加属性（实际上是在修改 module.exports 的属性）
exports.prop1 = 'value1';

// 直接修改 module.exports（也有效果）
module.exports.prop2 = 'value2';

console.log(exports);           // { prop1: 'value1', prop2: 'value2' }
console.log(module.exports);    // { prop1: 'value1', prop2: 'value2' }

// ⚠️ 危险：重新赋值 module.exports
module.exports = {
    newProp: 'newValue'
};
// 此时 exports 仍然指向旧对象，而 module.exports 指向新对象
// require() 返回的是 module.exports（新对象），exports 的修改无效
// ===== 方式4：导出类/构造函数 =====

// Person.js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        return `我叫${this.name}，今年${this.age}岁`;
    }
}

// 导出类本身（不是实例）
module.exports = Person;

// app.js
const Person = require('./Person');
const p = new Person('张三', 25);
console.log(p.introduce()); // 输出：我叫张三，今年25岁
// ===== 方式5：导出单个值/函数 =====

// getConfig.js
module.exports = {
    dbHost: 'localhost',
    dbPort: 3306,
    dbName: 'myapp',
    redisUrl: 'redis://localhost:6379'
};

// getDate.js
module.exports = function() {
    return new Date().toISOString();
};

// 常量导出
module.exports.PI = 3.141592653589793;
module.exports.E = 2.718281828459045;
```

### 3.1.3 require() 加载机制

```javascript
/**
 * require(X) 的完整解析流程
 *
 * 步骤1：判断 X 是否为核心模块（如 fs, http, path）
 *   → 是：直接返回核心模块
 *
 * 步骤2：判断 X 是否以 ./ ../ / 开头（相对/绝对路径）
 *   → 是：按照路径查找文件
 *     - 尝试 X（精确匹配）
 *     - 尝试 X.js
 *     - 尝试 X.json
 *     - 尝试 X.node（C++ addon）
 *     - 尝试 X/index.js
 *     - 尝试 X/index.json
 *
 * 步骤3：X 是裸模块名（如 'lodash', 'express'）
 *   → 从 node_modules 目录查找
 *   - 当前目录/node_modules/X
 *   - 父目录/node_modules/X
 *   - ...直到根目录
 */

// 示例：各种 require 用法

// 1. 加载核心模块（无需路径）
const fs = require('fs');           // 文件系统模块
const path = require('path');       // 路径处理模块
const http = require('http');       // HTTP 模块
const events = require('events');   // 事件模块

// 2. 加载本地文件模块（相对路径）
const myModule = require('./myModule');         // 加载 ./myModule.js
const config = require('../config/app.config'); // 加载上级目录的配置
const utils = require('./utils/index');         // 显式指定 index 文件

// 3. 加载 JSON 文件
const packageConfig = require('./package.json'); // 自动解析 JSON
const settings = require('./settings.json');

// 4. 加载第三方模块（从 node_modules 查找）
const _ = require('lodash');       // 工具库
const express = require('express'); // Web 框架
const axios = require('axios');     // HTTP 客户端

// 5. 条件加载（动态 require）
let dbModule;
if (process.env.NODE_ENV === 'test') {
    dbModule = require('./db/mock'); // 测试环境使用 mock
} else {
    dbModule = require('./db/real'); // 生产环境使用真实数据库
}
```

---

## 3.2 ES Modules（ESM）

### 3.2.1 启用 ESM

Node.js 从 v12 起稳定支持 ES Modules，有两种启用方式：

```javascript
/**
 * 方式一：使用 .mjs 扩展名（推荐）
 * 文件扩展名为 .mjs 时，自动作为 ESM 处理
 */

// greeting.mjs
export const sayHello = (name) => `Hello, ${name}!`;

// app.mjs
import { sayHello } from './greeting.mjs';
console.log(sayHello('World'));
/**
 * 方式二：在 package.json 中声明 "type": "module"
 * 所有 .js 文件都将作为 ESM 处理
 */

// package.json
{
    "name": "esm-project",
    "version": "1.0.0",
    "type": "module",  // ← 关键配置：启用 ESM
    "main": "./src/index.js"
}

// src/utils.js（现在是 ESM 模块）
export const helper = () => 'helper function';

// src/app.js
import { helper } from './utils.js'; // 注意：ESM 必须写完整扩展名
console.log(helper());
/**
 * 方式三：混合使用（CJS 项目中引入 ESM）
 * 使用动态 import() 语法（返回 Promise）
 */

// main.cjs（CommonJS 模块）
async function loadEsmModule() {
    // 动态 import() 可以在 CJS 中使用
    const module = await('./esm-module.mjs');
    console.log(module.default);
    console.log(module.namedExport);
}

loadEsmModule();
```

### 3.2.2 ESM 导出语法大全

```javascript
// ===== esm-module.mjs（ES Module 完整导出示例）=====

// 1. 命名导出（Named Exports）- 可以有多个
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export class Calculator {
    static multiply(a, b) {
        return a * b;
    }
}

// 2. 导出时重命名
export { add as sum, PI as PI_VALUE };

// 3. 重新导出（Re-export）
export { default as React } from 'react'; // 从其他模块重新导出
export * from './utils'; // 导出另一个模块的所有命名导出

// 4. 默认导出（Default Export）- 每个模块只能有一个
export default class AppConfig {
    constructor() {
        this.env = process.env.NODE_ENV || 'development';
        this.debug = this.env !== 'production';
    }
    
    get isProduction() {
        return this.env === 'production';
    }
}
// ===== app.mjs（ES Module 完整导入示例）=====

// 1. 导入命名导出
import { PI, add, Calculator } from './esm-module.mjs';

// 2. 导入时重命名
import { sum as addition, PI_VALUE as pi } from './esm-module.mjs';

// 3. 导入默认导出
import AppConfig from './esm-module.mjs';

// 4. 同时导入默认和命名导出
import AppConfigDefault, { PI, add } from './esm-module.mjs';

// 5. 命名空间导入（导入所有导出到一个对象）
import * as EsmModule from './esm-module.mjs';
console.log(EsmModule.PI);
console.log(EsmModule.add(1, 2));

// 6. 副作用导入（只执行模块代码，不导入任何绑定）
import './polyfills'; // 用于执行 polyfill 代码或注册全局样式

// 7. 动态导入（返回 Promise，可用于条件加载和懒加载）
if (condition) {
    const heavyModule = await('./heavy-module.mjs');
    heavyModule.doSomething();
}
```

### 3.2.3 ESM 特殊特性

```javascript
/**
 * ESM 独有的重要特性
 */

// ========== 特性1：顶层 await（Top-level Await）==========
// ESM 支持在模块顶层直接使用 await（CJS 不支持）

// config.mjs
const response = await fetch('https://api.example.com/config');
export const config = await response.json(); // 顶层 await

// 使用
import { config } from './config.mjs';
console.log(config.apiKey); // 已解析的配置数据
// ========== 特性2：Live Bindings（实时绑定）==========
// ESM 导出的是值的引用（绑定），而不是值的拷贝

// counter.mjs
export let count = 0; // 使用 let（可以被修改）

export function increment() {
    count++; // 修改原始值
}

// app.mjs
import { count, increment } from './counter.mjs';

console.log(count); // 输出：0
increment();
console.log(count); // 输出：1（获取到最新的值，而不是拷贝）

// 对比 CJS：CJS 导出的是值的快照（拷贝），无法获取后续修改
// ========== 特性3：静态分析（Static Analysis）==========
// ESM 的导入/导出在编译时就确定，支持 Tree Shaking

// 只导入需要的部分，未使用的导出会被打包工具删除
import { justOneFunction } from './huge-library.mjs';
// huge-library.mjs 中的其他导出如果未被使用，最终打包时会移除
// ========== 特性4：this 指向 ==========
// ESM 中顶层 this 是 undefined（CJS 中 this 指向 module.exports）

// esm-test.mjs
console.log(this); // 输出：undefined

// cjs-test.js
console.log(this); // 输出：{} 或 module.exports
```

---

## 3.3 模块加载机制详解

### 3.3.1 完整加载流程

```javascript
/**
 * Node.js 模块加载五步骤
 *
 * ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
 * │  Resolution│ → │ Loading  │ → │ Wrapping │ → │ Evaluation│ → │ Caching  │
 * │   解析    │   │   加载   │   │   包装   │   │   执行   │   │   缓存   │
 * └──────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘
 */

/**
 * Step 1: 解析（Resolution）
 * 确定 require/import 的参数对应的绝对文件路径
 * - 核心模块 → 内置模块
 * - 相对路径 → 基于当前文件目录解析
 * - 裸模块名 → 从 node_modules 查找
 */

/**
 * Step 2: 加载（Loading）
 * 根据解析到的路径加载文件内容
 * - .js 文件 → 读取为 JavaScript 文本
 * - .json 文件 → 读取为 JSON，用 JSON.parse() 解析
 * - .node 文件 → 加载为 C++ 插件（addon）
 * - 目录 → 查找 package.json 的 main 字段或 index.js
 */

/**
 * Step 3: 包装（Wrapping）
 * 将模块代码包装在函数作用域中
 * 
 * 实际执行形式：
 * (function(exports, require, module, __filename, __dirname) {
 *     // 你的模块代码在这里
 * });
 */

// 验证包装函数的存在
console.log('arguments:', arguments);
console.log('exports:', typeof exports);      // 'object'
console.log('require:', typeof require);      // 'function'
console.log('module:', typeof module);        // 'object'
console.log('__filename:', typeof __filename);// 'string'
console.log('__dirname:', typeof __dirname);  // 'string'

/**
 * Step 4: 执行（Evaluation）
 * 执行模块代码，最终得到 module.exports 的值
 * - 此时模块内的代码真正运行
 * - 变量初始化、函数定义、副作用执行等
 */

/**
 * Step 5: 缓存（Caching）
 * 将 module.exports 缓存到 Module._cache
 * - 后续 require 同一路径时直接返回缓存的值
 * - 不会重复加载和执行模块代码
 */
```

### 3.3.2 模块缓存机制

```javascript
/**
 * 模块缓存机制详解
 *
 * 缓存位置：require.cache（等同于 Module._cache）
 * 缓存 key：模块的绝对路径（解析后的完整路径）
 */

// 查看当前已缓存的模块
console.log('已缓存的模块数量:', Object.keys(require.cache).length);

// 打印所有缓存模块的路径
Object.keys(require.cache).forEach(filePath => {
    console.log('缓存模块:', filePath);
});
// 清除特定模块的缓存（强制重新加载）
function reloadModule(modulePath) {
    // Step 1: 从缓存中删除该模块
    delete require.cache[require.resolve(modulePath)];
    
    // Step 2: 重新 require（会重新执行模块代码）
    return require(modulePath);
}

// 使用示例
const config1 = require('./config');
// 修改了 config.js 文件...

const config2 = reloadModule('./config'); // 重新加载最新版本
// 清除所有缓存（谨慎使用，可能导致状态不一致）
function clearAllCache() {
    Object.keys(require.cache).forEach(key => {
        delete require.cache[key];
    });
    console.log('所有模块缓存已清除');
}
// 模块只执行一次的证明
// counter.js
let count = 0;
module.exports = {
    increment() {
        return ++count;
    },
    getCount() {
        return count;
    }
};

// test.js
const counter1 = require('./counter');
const counter2 = require('./counter'); // 返回同一个缓存的对象

console.log(counter1.increment()); // 1
console.log(counter2.increment()); // 2（同一个对象！）
console.log(counter1.getCount() === counter2.getCount()); // true
```

---

## 3.4 循环依赖问题

### 3.4.1 什么是循环依赖

当模块 A 依赖模块 B，同时模块 B 又依赖模块 A 时，就形成了**循环依赖（Circular Dependency）**。

```javascript
/**
 * 循环依赖示意图
 *
 *  a.js ──require──→ b.js
 *   ↑                  │
 *   └────require───────┘
 */

// ===== a.js =====
console.log('a.js 开始加载');
const b = require('./b');
console.log('a.js 加载完成, b.value =', b.value);
module.exports = { value: '来自 A' };

// ===== b.js =====
console.log('b.js 开始加载');
const a = require('./a');
console.log('b.js 加载完成, a.value =', a.value);
module.exports = { value: '来自 B' };

// ===== main.js =====
const a = require('./a');

/*
执行顺序：
a.js 开始加载
b.js 开始加载
b.js 加载完成, a.value = undefined  ← a 还没执行完！
a.js 加载完成, b.value = 来自 B

原因：
- a.js 加载到 require('./b') 时，暂停执行 a.js，开始加载 b.js
- b.js 执行 require('./a') 时，发现 a.js 正在加载中
- 此时 a.js 的 module.exports 还是空对象 {}（还没执行到赋值语句）
- 所以 b.js 拿到的是未完成的 a.js 导出对象
*/
```

### 3.4.2 解决方案

```javascript
/**
 * 解决方案1：延迟加载（Lazy Require）
 * 将 require 语句移动到函数内部，在使用时才加载
 */

// ===== a-fixed.js =====
console.log('a.js 开始加载');
module.exports = {
    value: '来自 A',
    
    getB() {
        // 延迟加载：在需要时才 require
        const b = require('./b-fixed');
        return b;
    }
};

// ===== b-fixed.js =====
console.log('b.js 开始加载');
module.exports = {
    value: '来自 B',
    
    getA() {
        const a = require('./a-fixed');
        return a;
    }
};
/**
 * 解决方案2：抽取公共依赖到第三个模块
 * 将共同依赖的逻辑提取到单独的模块中
 */

// ===== shared.js（公共模块）=====
module.exports = {
    sharedData: '共享数据',
    sharedFunction() {
        return '共享函数';
    }
};

// ===== a-refactored.js =====
const shared = require('./shared');
module.exports = {
    value: '来自 A',
    shared
};

// ===== b-refactored.js =====
const shared = require('./shared');
module.exports = {
    value: '来自 B',
    shared
};
/**
 * 解决方案3：使用依赖注入（Dependency Injection）
 * 通过参数传递依赖，而不是直接 require
 */

// ===== service-a.js =====
class ServiceA {
    constructor(serviceB) {
        this.serviceB = serviceB; // 通过构造函数注入
    }
    
    doSomething() {
        return 'A doing something with ' + this.serviceB.getValue();
    }
}

module.exports = ServiceA;

// ===== service-b.js =====
class ServiceB {
    constructor(serviceA) {
        this.serviceA = serviceA;
    }
    
    getValue() {
        return 'B value';
    }
    
    doOtherThing() {
        return this.serviceA.doSomething();
    }
}

module.exports = ServiceB;

// ===== index.js（组合层）=====
const ServiceA = require('./service-a');
const ServiceB = require('./service-b');

// 在这里解决循环依赖
const serviceB = new ServiceB(null); // 先创建 B
const serviceA = new ServiceA(serviceB); // 再创建 A 并注入 B
serviceB.serviceA = serviceA; // 手动设置反向引用
```

---

## 3.5 Node.js 内置模块分类

### 3.5.1 全局对象与模块

```javascript
/**
 * Node.js 内置模块一览
 */

// ==================== 全局对象（无需 require）====================

// process - 进程对象
console.log(process.pid);           // 进程 ID
console.log(process.platform);      // 操作系统平台
console.log(process.env.NODE_ENV);  // 环境变量
process.exit(0);                    // 退出进程

// console - 控制台输出
console.log('普通日志');
console.info('信息日志');
console.warn('警告日志');
console.error('错误日志');
console.table([{ name: '张三', age: 25 }, { name: '李四', age: 30 }]); // 表格输出
console.time('timer'); // 开始计时
console.timeEnd('timer'); // 结束计时

// 定时器（浏览器也有，但 Node.js 实现）
setTimeout(() => {}, 1000);  // 延迟执行
setInterval(() => {}, 1000); // 周期执行
setImmediate(() => {});      // 立即执行（当前轮循环）

// Buffer - 二进制数据处理（Node.js 特有）
const buf = Buffer.from('你好，世界', 'utf-8');
console.log(buf.toString('hex')); // 十六进制表示
// ==================== 需要 require 的核心模块 ====================

// 文件系统
const fs = require('fs');
const fsPromises = require('fs/promises'); // Promise 版本（推荐）

// 路径处理
const path = require('path');

// HTTP/HTTPS
const http = require('http');
const https = require('https');

// URL 处理
const url = require('url');

// 事件系统
const EventEmitter = require('events');

// 流（Stream）
const stream = require('stream');

// 加密
const crypto = require('crypto');

// 操作系统信息
const os = require('os');

// 子进程
const childProcess = require('child_process');

// 集群
const cluster = require('cluster');

// 工作线程
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// 断言（测试用）
const assert = require('assert');

// 查询字符串
const querystring = require('querystring');

// 虚拟机（动态执行代码）
const vm = require('vm');

// 性能钩子
const performance = require('perf_hooks');
```

### 3.5.2 常用内置模块快速参考

```javascript
/**
 * path 模块 - 路径处理（跨平台）
 */
const path = require('path');

// 拼接路径（自动处理分隔符）
const fullPath = path.join('/user', 'local', 'bin', 'node');
// Linux: '/user/local/bin/node'
// Windows: '\\user\\local\\bin\\node'

// 解析为绝对路径
const absPath = path.resolve('src', 'index.js');
// 基于当前工作目录解析

// 获取路径各部分
path.dirname('/a/b/c/file.txt'); // '/a/b/c'（目录）
path.basename('/a/b/c/file.txt'); // 'file.txt'（文件名）
path.extname('/a/b/c/file.txt'); // '.txt'（扩展名）

// 解析路径对象
path.parse('/home/user/dir/file.txt');
// 返回: { root: '/', dir: '/home/user/dir', base: 'file.txt', ext: '.txt', name: 'file' }
/**
 * os 模块 - 操作系统信息
 */
const os = require('os');

console.log('操作系统平台:', os.platform());        // 'linux', 'win32', 'darwin'
console.log('CPU 架构:', os.arch());                // 'x64', 'arm64'
console.log('CPU 核心数:', os.cpus().length);       // 8
console.log('总内存:', (os.totalmem() / 1024**3).toFixed(2), 'GB');
console.log('空闲内存:', (os.freemem() / 1024**3).toFixed(2), 'GB');
console.log('主机名:', os.hostname());
console.log('临时目录:', os.tmpdir());
console.log('用户主目录:', os.homedir());
/**
 * crypto 模块 - 加密与哈希
 */
const crypto = require('crypto');

// 哈希函数（MD5, SHA1, SHA256 等）
const hash = crypto.createHash('sha256')
    .update('我的密码')
    .digest('hex');
console.log('SHA256 哈希:', hash);

// HMAC（带密钥的哈希）
const hmac = crypto.createHmac('sha256', 'secret-key')
    .update('要签名的数据')
    .digest('hex');

// 随机字节
const randomBytes = crypto.randomBytes(16).toString('hex');
console.log('随机 token:', randomBytes);

// UUID 生成
const uuid = crypto.randomUUID();
console.log('UUID:', uuid);
/**
 * events 模块 - 事件发射器
 */
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
    // 自定义事件发射器
}

const emitter = new MyEmitter();

// 监听事件（可监听多次）
emitter.on('message', (data) => {
    console.log('收到消息:', data);
});

// 一次性监听（只触发一次）
emitter.once('connect', () => {
    console.log('首次连接');
});

// 移除监听器
function onLog(data) {
    console.log('日志:', data);
}
emitter.on('log', onLog);
emitter.off('log', onLog); // 移除特定监听器

// 触发事件
emitter.emit('message', { text: 'Hello' });
emitter.emit('log', '测试日志');

// 获取监听器数量
console.log('message 监听器数量:', emitter.listenerCount('message'));
```

---

## 本章要点速查

### CommonJS 核心

| 语法 | 说明 |
|------|------|
| `module.exports = {...}` | 导出对象（覆盖式） |
| `exports.xxx = value` | 向导出对象添加属性 |
| `require('./module')` | 导入模块 |
| `__dirname/__filename` | 当前模块目录/文件路径 |

### CJS vs ESM 对比

| 特性 | CommonJS | ES Modules |
|------|----------|------------|
| 关键字 | `require/exports` | `import/export` |
| 加载时机 | 运行时 | 编译时静态分析 |
| 值语义 | 值拷贝 | **实时绑定**（live binding）|
| 顶层 await | ❌ | ✅ |
| this 指向 | `module.exports` | `undefined` |
| 循环依赖 | 获取未完成拷贝 | 获取绑定引用 |

### 模块加载五步曲

1. **Resolution**（解析）：确定文件绝对路径
2. **Loading**（加载）：读取文件内容
3. **Wrapping**（包装）：包裹在函数作用域
4. **Evaluation**（执行）：运行模块代码
5. **Caching**（缓存）：缓存 `module.exports`

### 循环依赖解决方案

- **延迟 require**：将 require 移到函数内部
- **提取公共模块**：将共享逻辑抽离到第三模块
- **依赖注入**：通过参数传递而非直接 require

---

# 第4章：异步编程模式

## 📚 本章学习目标

- 理解**回调函数**机制及**回调地狱（Callback Hell）**问题
- 掌握 **Promise** 的链式调用和错误处理
- 精通 **async/await** 语法糖的使用
- 理解 **EventEmitter 发布订阅模式**
- 掌握四种异步模式的**对比与选型策略**
- 学会异步编程的**错误处理最佳实践**

---

## 4.1 回调函数（Callback）

### 4.1.1 回调函数基础

**回调函数** 是作为参数传递给另一个函数，并在适当时候被调用的函数。它是 Node.js 最早期的异步编程模式。

```javascript
/**
 * 回调函数的基本概念
 *
 * Node.js 回调约定：
 * 1. 回调函数通常是最后一个参数
 * 2. 回调的第一个参数是错误对象（Error-first Callback）
 * 3. 成功时第一个参数为 null，失败时为 Error 对象
 */

// ========== 基础回调示例 ==========

// 模拟异步操作（如数据库查询）
function getUserById(userId, callback) {
    // 模拟网络延迟
    setTimeout(() => {
        // 模拟数据
        const users = {
            1: { id: 1, name: '张三', email: 'zhangsan@example.com' },
            2: { id: 2, name: '李四', email: 'lisi@example.com' }
        };
        
        const user = users[userId];
        
        if (user) {
            // 成功：第一个参数传 null，第二个传结果
            callback(null, user);
        } else {
            // 失败：第一个参数传 Error 对象
            callback(new Error(`用户 ${userId} 不存在`), null);
        }
    }, 100);
}

// 使用回调函数
getUserById(1, (error, user) => {
    if (error) {
        console.error('获取用户失败:', error.message);
        return;
    }
    
    console.log('获取用户成功:', user);
    // 输出: { id: 1, name: '张三', email: 'zhangsan@example.com' }
});
```

### 4.1.2 回调地狱（Callback Hell）

当多个异步操作存在依赖关系时，回调层层嵌套，形成**金字塔形代码**，称为"回调地狱"。

```javascript
/**
 * 回调地狱示例：三层嵌套
 * 场景：获取用户 → 获取用户的订单 → 获取订单的商品详情
 */

// ❌ 反面教材：回调地狱
function getUserOrdersCallbackHell(userId, callback) {
    // 第一层：获取用户信息
    getUserById(userId, (err, user) => {
        if (err) return callback(err);
        
        console.log('用户:', user.name);
        
        // 第二层：获取用户的订单
        getOrdersByUserId(user.id, (err, orders) => {
            if (err) return callback(err);
            
            console.log(`找到 ${orders.length} 个订单`);
            
            // 第三层：获取每个订单的商品详情
            getOrderDetails(orders[0].id, (err, details) => {
                if (err) return callback(err);
                
                // 第四层...还可以继续嵌套
                console.log('商品详情:', details);
                
                callback(null, details);
            });
        });
    });
}

// 使用（已经很难阅读和维护了）
getUserOrdersCallbackHell(1, (err, result) => {
    if (err) console.error('最终错误:', err);
    else console.log('最终结果:', result);
});
```

### 4.1.3 回调的最佳实践

```javascript
/**
 * 回调函数使用建议
 */

// 1. 始终遵循 Error-first 约定
function goodCallback(errorFirstStyle, callback) {
    // 第一个参数永远是 error
    try {
        const result = processSomething(errorFirstStyle);
        callback(null, result); // 成功
    } catch (err) {
        callback(err); // 失败
    }
}

// 2. 使用命名函数代替匿名函数（提高可读性）
function handleUserResult(err, user) {
    if (err) {
        console.error('处理用户出错:', err);
        return;
    }
    console.log('用户数据:', user);
}

getUserById(1, handleUserResult); // 命名函数

// 3. 提取复杂逻辑到独立函数
function fetchCompleteUserData(userId, finalCallback) {
    // Step 1: 获取用户
    getUserById(userId, (err, user) => {
        if (err) return finalCallback(err);
        
        // Step 2: 获取订单（扁平化结构）
        getOrdersByUserId(user.id, handleOrders);
    });
    
    // 独立的处理函数
    function handleOrders(err, orders) {
        if (err) return finalCallback(err);
        finalCallback(null, { user, orders });
    }
}
```

---

## 4.2 Promise 链式调用

### 4.2.1 Promise 基础

**Promise** 是异步编程的一种解决方案，代表一个异步操作的最终完成（或失败）及其结果值。

```javascript
/**
 * Promise 三种状态
 *
 * 1. Pending（进行中）：初始状态，既没有被兑现，也没有被拒绝
 * 2. Fulfilled（已兑现）：操作成功完成
 * 3. Rejected（已拒绝）：操作失败
 *
 * 状态转换：Pending → Fulfilled 或 Pending → Rejected（单向不可逆）
 */

// ========== 创建 Promise ==========

// 方式一：new Promise 构造函数
const promise = new Promise((resolve, reject) => {
    // 异步操作
    const success = Math.random() > 0.3; // 70% 概率成功
    
    setTimeout(() => {
        if (success) {
            resolve('操作成功！'); // 兑现 promise，传递结果
        } else {
            reject(new Error('操作失败！')); // 拒绝 promise，传递原因
        }
    }, 1000);
});

// 使用 Promise
promise
    .then(result => {
        console.log('成功:', result);
    })
    .catch(error => {
        console.error('失败:', error.message);
    });
// 方式二：Promise.resolve / Promise.reject 快捷方法
const resolvedPromise = Promise.resolve('立即成功的值');
const rejectedPromise = Promise.reject(new Error('立即失败的错误'));
// 方式三：将回调风格的函数转换为 Promise
function promisifyGetUser(userId) {
    return new Promise((resolve, reject) => {
        getUserById(userId, (err, user) => {
            if (err) reject(err);
            else resolve(user);
        });
    });
}

// 使用
promisifyGetUser(1)
    .then(user => console.log(user))
    .catch(err => console.error(err));
// 方式四：使用 util.promisify（Node.js 内置工具）
const util = require('util');
const promisifiedGetUser = util.promisify(getUserById);

promisifiedGetUser(1)
    .then(user => console.log(user))
    .catch(err => console.error(err));
```

### 4.2.2 链式调用（Chaining）

```javascript
/**
 * Promise 链式调用
 * .then() 返回新的 Promise，可以实现链式调用
 */

// ✅ 正确示例：用 Promise 解决回调地狱
function getUserOrdersWithPromise(userId) {
    return promisifyGetUser(userId)  // Promise 1
        .then(user => {
            console.log('用户:', user.name);
            return promisifyGetOrders(user.id); // 返回 Promise 2
        })
        .then(orders => {
            console.log(`找到 ${orders.length} 个订单`);
            return promisifyGetOrderDetails(orders[0].id); // 返回 Promise 3
        })
        .then(details => {
            console.log('商品详情:', details);
            return details; // 最终结果
        });
}

// 使用（扁平化结构，易于阅读）
getUserOrdersWithPromise(1)
    .then(result => console.log('✅ 最终结果:', result))
    .catch(err => console.error('❌ 任意环节出错:', err)); // 统一错误处理
```

### 4.2.3 Promise 组合 API

```javascript
/**
 * Promise 静态方法（组合多个 Promise）
 */

// ========== Promise.all() ==========
// 所有 Promise 都成功才成功，任一失败则整体失败
Promise.all([
    fetchUser(1),
    fetchOrders(1),
    fetchPreferences(1)
]).then(([user, orders, preferences]) => {
    // 结果按顺序对应，与数组索引一致
    console.log('并行请求全部成功:', { user, orders, preferences });
}).catch(err => {
    console.error('任一请求失败:', err);
});
// ========== Promise.allSettled() ==========
// 等待所有 Promise 完成（无论成功或失败），返回详细状态
Promise.allSettled([
    fetchUser(1),
    fetchInvalidResource(), // 可能失败
    fetchPreferences(1)
]).then(results => {
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`请求${index} 成功:`, result.value);
        } else {
            console.log(`请求${index} 失败:`, result.reason);
        }
    });
});
// ========== Promise.race() ==========
// 返回最先完成（无论成功或失败）的 Promise 的结果
Promise.race([
    fetchFromPrimaryServer(),
    timeout(3000) // 3秒超时
]).then(result => {
    console.log('最快的结果:', result);
}).catch(err => {
    console.error('超时或失败:', err);
});
// ========== Promise.any() ==========
// 任一成功即成功（与 all 相反），全部失败才失败
Promise.any([
    fetchFromServer1(),
    fetchFromServer2(), // 备用服务器
    fetchFromServer3()  // 另一个备用
]).then(result => {
    console.log('最快成功的:', result);
}).catch(err => {
    console.error('所有服务器都失败了:', err);
    // err 是 AggregateError，包含所有错误
});
```

### 4.2.4 Promise 错误处理

```javascript
/**
 * Promise 错误处理的几种方式
 */

// 方式1：.catch() 链尾捕获
doSomething()
    .then(step1)
    .then(step2)
    .catch(err => {
        // 捕获前面所有 .then() 中的错误
        console.error('链中某处出错:', err);
    });
// 方式2：每个 .then() 都处理错误
doSomething()
    .then(step1, err1 => {
        // 只处理 step1 的错误
        console.error('Step1 出错:', err1);
        return defaultValue; // 返回默认值继续链式调用
    })
    .then(step2)
    .catch(err => {
        // 捕获 step2 的错误
    });
// 方式3：.then() 中抛出错误
validateInput(input)
    .then(validated => {
        if (!validated.isValid) {
            throw new Error('输入验证失败'); // 抛出到 .catch()
        }
        return process(validated);
    })
    .catch(err => {
        if (err.message === '输入验证失败') {
            // 特定错误处理
            return getFallbackData();
        }
        throw err; // 重新抛出未知错误
    });
```

---

## 4.3 async/await 语法糖

### 4.3.1 基础语法

**async/await** 是基于 Promise 的语法糖，让异步代码看起来像同步代码，极大提高了可读性。

```javascript
/**
 * async/await 基础
 *
 * - async 函数总是返回 Promise
 * - await 只能在 async 函数内部使用
 * - await 会暂停 async 函数的执行，等待 Promise 完成
 */

// ========== 基本 async 函数 ==========

async function fetchUserData(userId) {
    // await 等待 Promise 完成
    const user = await promisifyGetUser(userId);
    
    console.log('获取到用户:', user.name);
    
    return user; // 相当于 return Promise.resolve(user)
}

// 调用 async 函数（返回 Promise）
fetchUserData(1)
    .then(user => console.log('用户:', user))
    .catch(err => console.error('错误:', err));
// ========== async 函数中的错误处理 ==========

async function safeFetchUser(userId) {
    try {
        const user = await promisifyGetUser(userId);
        return { success: true, data: user };
    } catch (error) {
        // 捕获 await 中的错误
        console.error('获取用户失败:', error.message);
        return { success: false, error: error.message };
    }
}
```

### 4.3.2 用 async/await 重构回调地狱

```javascript
/**
 * ✅ 最佳实践：async/await 彻底解决回调地狱
 */

async function getUserOrdersModern(userId) {
    try {
        // Step 1: 获取用户（顺序执行）
        const user = await promisifyGetUser(userId);
        console.log('用户:', user.name);
        
        // Step 2: 获取订单
        const orders = await promisifyGetOrders(user.id);
        console.log(`找到 ${orders.length} 个订单`);
        
        // Step 3: 获取订单详情
        const details = await promisifyGetOrderDetails(orders[0].id);
        console.log('商品详情:', details);
        
        // 返回最终结果
        return { user, orders, details };
        
    } catch (error) {
        // 统一错误处理（任意一步出错都会跳到这里）
        console.error('操作流程出错:', error.message);
        throw error; // 可以选择重新抛出或返回默认值
    }
}

// 使用（代码清晰易读）
async function main() {
    try {
        const result = await getUserOrdersModern(1);
        console.log('✅ 最终结果:', result);
    } catch (err) {
        console.error('❌ 最终错误:', err);
    }
}

main();
```

### 4.3.3 并行执行

```javascript
/**
 * async/await 下的并行执行
 * 注意：不要在循环中滥用 await（串行执行很慢）
 */

// ❌ 错误：串行等待（慢）
async function fetchSequential(ids) {
    const results = [];
    for (const id of ids) {
        const data = await fetchData(id); // 等待每个请求完成
        results.push(data);
    }
    return results; // 总时间 = 所有请求时间之和
}

// ✅ 正确：并行执行（快）
async function fetchParallel(ids) {
    // 同时发起所有请求
    const promises = ids.map(id => fetchData(id));
    
    // 等待所有请求完成
    const results = await Promise.all(promises);
    
    return results; // 总时间 = 最慢请求的时间
}

// ✅ 更好：控制并发数量（避免过多请求压垮服务器）
async function fetchWithLimit(ids, concurrency = 3) {
    const results = [];
    
    // 分批处理
    for (let i = 0; i < ids.length; i += concurrency) {
        const batch = ids.slice(i, i + concurrency);
        const batchResults = await Promise.all(batch.map(fetchData));
        results.push(...batchResults);
    }
    
    return results;
}
```

### 4.3.4 高级技巧

```javascript
/**
 * async/await 高级用法
 */

// ========== 技巧1：for await...of（异步迭代器）==========

// 异步生成器函数
async function* generateNumbers() {
    yield 1;
    yield 2;
    yield 3;
}

// 使用 for await...of 遍历
async function consumeAsyncIterator() {
    for await (const num of generateNumbers()) {
        console.log('数字:', num); // 依次输出 1, 2, 3
    }
}
// ========== 技巧2：Promise 包装器工具函数 ==========

// 超时控制
function withTimeout(promise, ms) {
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`操作超时 (${ms}ms)`)), ms)
    );
    
    return Promise.race([promise, timeoutPromise]);
}

// 使用
try {
    const result = await withTimeout(fetchData(), 3000); // 3秒超时
} catch (err) {
    if (err.message.includes('超时')) {
        console.log('请求超时，使用缓存数据');
    }
}
// ========== 技巧3：重试机制 ==========

async function retry(fn, maxRetries = 3, delay = 1000) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn(); // 尝试执行
        } catch (error) {
            lastError = error;
            console.warn(`第 ${attempt}/${maxRetries} 次尝试失败:`, error.message);
            
            if (attempt < maxRetries) {
                // 等待后重试（指数退避）
                await new Promise(resolve => setTimeout(resolve, delay * attempt));
            }
        }
    }
    
    throw lastError; // 所有尝试都失败
}

// 使用
const data = await retry(() => fetchFromAPI(), 3, 1000);
```

---

## 4.4 EventEmitter 发布订阅模式

### 4.4.1 基本概念

**EventEmitter** 是 Node.js 事件驱动的核心，几乎所有异步操作都基于此模式。

```javascript
/**
 * EventEmitter 核心概念
 *
 * 发布-订阅模式（Publish-Subscribe Pattern）：
 * - 发布者（Emitter）：发出事件
 * - 订阅者（Listener）：监听并响应事件
 * - 事件（Event）：信号名称
 * 
 * 优势：松耦合、一对多通信
 */

const EventEmitter = require('events');

// 创建自定义事件发射器
class ShoppingCart extends EventEmitter {
    constructor() {
        super();
        this.items = []; // 购物车商品列表
    }
    
    addItem(item) {
        this.items.push(item);
        
        // 发布 'add' 事件，携带商品数据
        this.emit('add', item);
        
        // 检查是否达到优惠门槛
        if (this.getTotal() >= 100) {
            this.emit('threshold-reached', this.getTotal());
        }
    }
    
    removeItem(itemId) {
        const index = this.items.findIndex(i => i.id === itemId);
        if (index > -1) {
            const removed = this.items.splice(index, 1)[0];
            this.emit('remove', removed);
        }
    }
    
    getTotal() {
        return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
}

// 使用购物车
const cart = new ShoppingCart();

// 订阅事件（注册监听器）
cart.on('add', (item) => {
    console.log(`🛒 添加商品: ${item.name} (¥${item.price})`);
});

cart.on('remove', (item) => {
    console.log(`🗑️ 移除商品: ${item.name}`);
});

cart.on('threshold-reached', (total) => {
    console.log(`🎉 恭喜！满 ¥${total}，可享受优惠！`);
});

// 触发事件（通过方法调用）
cart.addItem({ id: 1, name: '键盘', price: 299, quantity: 1 });
cart.addItem({ id: 2, name: '鼠标', price: 99, quantity: 1 });
// 输出: 🎉 恭喜！满 ¥398，可享受优惠！

cart.removeItem(1);
```

### 4.4.2 高级用法

```javascript
/**
 * EventEmitter 高级特性
 */

const EventEmitter = require('events');

// ========== 1. 一次性监听器（once）==========
const emitter = new EventEmitter();

emitter.once('first-connect', () => {
    console.log('仅首次连接时执行');
});

emitter.emit('first-connect'); // 执行
emitter.emit('first-connect'); // 不再执行
// ========== 2. 错误事件（特殊处理）==========
// 如果 emit('error') 但没有监听器，会抛出异常并终止进程
emitter.on('error', (err) => {
    console.error('捕获到错误:', err.message);
    // 必须监听 error 事件，否则未处理的 error 会崩溃
});

// 安全地触发错误
emitter.emit('error', new Error('模拟错误'));
// ========== 3. 同步 vs 异步监听器 ==========
// EventEmitter 默认同步调用监听器
emitter.on('sync-event', () => {
    console.log('同步监听器 1');
});

emitter.on('sync-event', () => {
    console.log('同步监听器 2');
});

console.log('Before emit');
emitter.emit('sync-event');
console.log('After emit');
// 输出顺序: Before emit → 同步监听器 1 → 同步监听器 2 → After emit
// ========== 4. 监听器管理 ==========
function listener1() { console.log('Listener 1'); }
function listener2() { console.log('Listener 2'); }

emitter.on('test', listener1);
emitter.on('test', listener2);

console.log('监听器数量:', emitter.listenerCount('test')); // 2
console.log('监听器列表:', emitter.listeners('test')); // [listener1, listener2]

// 移除特定监听器
emitter.off('test', listener1); // 或 emitter.removeListener()

// 移除所有监听器
emitter.removeAllListeners('test');
// ========== 5. 最大监听器数警告 ==========
// 默认单个事件最多 10 个监听器，超出会警告（防止内存泄漏）
emitter.setMaxListeners(20); // 调整限制（谨慎使用）

// 或者禁用特定事件的警告
emitter.setMaxListeners(0); // 0 表示不限
// ========== 6. 实际应用：文件观察器 ==========
const fs = require('fs');

class FileWatcher extends EventEmitter {
    watch(filePath) {
        fs.watch(filePath, (eventType, filename) => {
            this.emit('change', { eventType, filename });
        });
        
        this.emit('start', filePath);
        return this;
    }
}

const watcher = new FileWatcher();
watcher.on('start', (path) => console.log(`开始监视: ${path}`));
watcher.on('change', (info) => console.log('文件变化:', info));
watcher.watch('./config.json');
```

---

## 4.5 四种异步模式对比与选型

### 4.5.1 对比表格

| 特性 | 回调函数 | Promise | async/await | EventEmitter |
|------|----------|---------|-------------|--------------|
| **可读性** | ⭐ 差（嵌套地狱）| ⭐⭐ 好 | ⭐⭐⭐ 优秀 | ⭐⭐ 取决于场景 |
| **错误处理** | 每个 callback 都要处理 | `.catch()` 统一处理 | `try/catch` 同步风格 | `.on('error')` |
| **调试体验** | 困难 | 较好 | **优秀**（同步堆栈） | 一般 |
| **适用场景** | 简单一次性操作 | 链式异步流程 | 复杂业务逻辑 | 事件驱动/多次触发 |
| **兼容性** | 所有 Node.js 版本 | Node.js 0.12+ | Node.js 7.6+ | 所有版本 |
| **性能** | 最快 | 略有开销 | 有开销（转译为 Promise+Generator） | 轻量 |

### 4.5.2 选型决策树

```
需要处理异步操作？
│
├─ 一次性简单操作？
│  └─ 回调函数 或 Promise
│
├─ 多步顺序/并行操作？
│  └─ async/await（首选）或 Promise 链
│
├─ 需要多次触发（事件流）？
│  └─ EventEmitter
│
└─ 需要向后兼容旧版 Node.js？
   └─ 回调函数（或使用 Babel 转译）
```

### 4.5.3 现代项目推荐模式

```javascript
/**
 * 2024+ 推荐的异步编程模式
 * 
 * 首选：async/await
 * 辅助：Promise（并行、竞态、超时等）
 * 特殊场景：EventEmitter（事件流、自定义事件）
 * 避免纯回调（除非封装底层库）
 */

// ========== 推荐的项目结构 ==========

// services/user.service.js
class UserService {
    /**
     * 获取完整的用户资料（含关联数据）
     * 使用 async/await 实现清晰的业务逻辑
     */
    async getUserProfile(userId) {
        try {
            // 并行获取无关数据
            const [user, preferences, stats] = await Promise.all([
                this.userRepository.findById(userId),
                this.preferenceRepo.findByUserId(userId),
                this.statRepo.getUserStats(userId)
            ]);
            
            // 顺序处理依赖数据
            const orders = await this.orderRepository.findByUserId(userId);
            
            // 组装返回数据
            return {
                ...user,
                preferences,
                stats,
                recentOrders: orders.slice(0, 5)
            };
            
        } catch (error) {
            // 统一错误处理
            logger.error('获取用户资料失败', { userId, error: error.message });
            throw new AppError('无法获取用户资料', 500);
        }
    }
}

// 使用
const userProfile = await userService.getUserProfile(123);
```

---

## 4.6 错误处理策略

### 4.6.1 分层错误处理

```javascript
/**
 * 异步错误处理最佳实践
 */

// ========== 1. 自定义错误类 ==========
class AppError extends Error {
    constructor(message, statusCode, code = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode; // HTTP 状态码
        this.code = code; // 业务错误码
        this.isOperational = true; // 标记为可预期的操作错误
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AppError {
    constructor(message, fields) {
        super(message, 400, 'VALIDATION_ERROR');
        this.fields = fields; // 校验失败的字段
    }
}

class NotFoundError extends AppError {
    constructor(resource, id) {
        super(`${resource} (ID: ${id}) 未找到`, 404, 'NOT_FOUND');
        this.resource = resource;
        this.id = id;
    }
}
// ========== 2. Service 层错误处理 ==========
class OrderService {
    async createOrder(orderData) {
        // Step 1: 数据校验
        this.validateOrder(orderData);
        
        // Step 2: 业务逻辑
        const order = await this.orderRepository.create(orderData);
        
        // Step 3: 发送事件（不影响主流程）
        this.eventEmitter.emit('order.created', order);
        
        return order;
    }
    
    validateOrder(data) {
        const errors = [];
        
        if (!data.userId) errors.push('userId 不能为空');
        if (!data.items || data.items.length === 0) errors.push('订单不能为空');
        if (data.totalAmount <= 0) errors.push('金额必须大于 0');
        
        if (errors.length > 0) {
            throw new ValidationError('订单数据校验失败', errors);
        }
    }
}
// ========== 3. Controller 层错误处理 ==========
class OrderController {
    async create(req, res, next) {
        try {
            const order = await orderService.createOrder(req.body);
            res.status(201).json({ success: true, data: order });
        } catch (error) {
            // 传递给统一的错误处理中间件
            next(error);
        }
    }
}
// ========== 4. 全局错误处理中间件 ==========
function errorHandler(err, req, res, next) {
    // 已知的操作错误
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
                ...(err.fields && { fields: err.fields }) // 附带额外信息
            }
        });
    }
    
    // 未知错误（编程错误或外部服务故障）
    console.error('Unexpected error:', err);
    return res.status(500).json({
        success: false,
        error: {
            code: 'INTERNAL_ERROR',
            message: process.env.NODE_ENV === 'production' 
                ? '服务器内部错误' 
                : err.message
        }
    });
}

// Express 中注册
app.use(errorHandler);
```

### 4.6.2 未捕获异常处理

```javascript
/**
 * 进程级别的错误兜底
 * 防止未处理的异常导致进程意外退出
 */

// 捕获未处理的 Promise rejection
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    
    // 生产环境：记录日志后优雅退出
    // 开发环境：保留进程以便调试
    if (process.env.NODE_ENV === 'production') {
        // 给日志系统一点时间写入
        setTimeout(() => process.exit(1), 1000);
    }
});

// 捕获未捕获的异常
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    
    // uncaughtException 后程序状态不确定
    // 最佳实践：记录日志后尽快重启
    logger.fatal('Uncaught Exception', { error: error.message, stack: error.stack });
    process.exit(1); // 必须退出！不要尝试恢复
});
```

---

## 本章要点速查

### 四种异步模式

| 模式 | 语法 | 适用场景 |
|------|------|----------|
| **回调函数** | `fn(err, data) => {}` | 简单操作、底层 API |
| **Promise** | `.then().catch()` | 链式调用、组合操作 |
| **async/await** | `await promise` | 复杂业务逻辑（**首选**）|
| **EventEmitter** | `.on('event', handler)` | 事件流、多次触发 |

### Promise 组合 API

| 方法 | 行为 | 使用场景 |
|------|------|----------|
| `Promise.all()` | 全部成功才成功 | 并行请求且都需要 |
| `allSettled()` | 等待全部完成 | 需要知道每个的结果 |
| `race()` | 返回最快的 | 超时控制、竞速 |
| `any()` | 任一成功即可 | 多源冗余请求 |

### 错误处理层级

1. **Service 层**：校验 + 抛出自定义错误
2. **Controller 层**：`try/catch` + `next(error)`
3. **中间件层**：统一响应格式
4. **进程层**：`unhandledRejection` + `uncaughtException` 兜底

---

# 第5章：文件系统操作（fs 模块）

## 📚 本章学习目标

- 掌握 **fs 模块**的同步与异步 API 的正确使用
- 学会**文件读写**的各种方式（readFile/writeFile/createReadStream/createWriteStream）
- 熟练进行**目录操作**（创建、删除、遍历）
- 实现**文件监听**功能（fs.watch）
- 正确使用 **path 模块**处理路径（join/resolve/parse）

---

## 5.1 同步 vs 异步 API

### 5.1.1 API 命名规范

Node.js `fs` 模块为大多数操作提供了同步和异步两个版本：

```javascript
const fs = require('fs');
const fsPromises = require('fs/promises'); // Node.js 14+ 推荐的 Promise API

/**
 * 命名规则：
 * - 异步版本：fs.operation(callback) 或 fsPromises.operation()
 * - 同步版本：fs.operationSync()  （带 Sync 后缀）
 */

// ========== 异步：回调风格（传统）==========
fs.readFile('./data.txt', 'utf-8', (err, data) => {
    if (err) console.error('读取失败:', err);
    else console.log('文件内容:', data);
});

// ========== 异步：Promise 风格（推荐）==========
async function readData() {
    try {
        const data = await fsPromises.readFile('./data.txt', 'utf-8');
        console.log('文件内容:', data);
        return data;
    } catch (err) {
        console.error('读取失败:', err);
        throw err;
    }
}

// ========== 同步版本（注意：会阻塞事件循环！）==========
try {
    const data = fs.readFileSync('./data.txt', 'utf-8');
    console.log('文件内容:', data);
} catch (err) {
    console.error('读取失败:', err);
}
```

### 5.1.2 何时使用同步 API

```javascript
/**
 * 同步 API 使用场景判断
 *
 * ✅ 适合使用同步的场景：
 * - 启动时读取配置文件（应用启动阶段，阻塞影响小）
 * - CLI 命令行工具（脚本执行完即退出）
 * - 初始化阶段的一次性操作
 *
 * ❌ 不适合使用同步的场景：
 * - HTTP 请求处理过程中
 * - 高并发服务器
 * - 可能执行耗时操作的地方
 */

// ✅ 合理使用同步：读取启动配置
function loadConfig() {
    const configPath = path.join(__dirname, 'config.json');
    
    try {
        // 启动时同步读取配置是可以接受的
        const raw = fs.readFileSync(configPath, 'utf-8');
        return JSON.parse(raw);
    } catch (err) {
        console.error('配置文件读取失败，使用默认配置');
        return { debug: false, port: 3000 }; // 降级为默认配置
    }
}

const config = loadConfig();
console.log('应用配置:', config);
```

---

## 5.2 文件读写操作

### 5.2.1 基础读写

```javascript
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

// ========== 写入文件 ==========

// 方式1：writeFile（异步，覆盖写入或创建新文件）
async function writeFileExample() {
    const content = 'Hello, Node.js 文件系统！\n这是第二行内容。';
    const filePath = path.join(__dirname, 'output.txt');
    
    await fsPromises.writeFile(filePath, content, 'utf-8');
    console.log('文件写入成功:', filePath);
}

// 方式2：appendFile（追加内容）
async function appendToFile() {
    const filePath = path.join(__dirname, 'output.txt');
    
    await fsPromises.appendFile(filePath, '\n追加的内容');
    console.log('内容追加成功');
}

// 方式3：writeFileSync（同步写入）
fs.writeFileSync(path.join(__dirname, 'sync-output.txt'), '同步写入的内容');
// ========== 读取文件 ==========

// 方式1：readFile（读取整个文件到内存）
async function readFileExample() {
    const filePath = path.join(__dirname, 'output.txt');
    
    // 读取为 UTF-8 字符串
    const textContent = await fsPromises.readFile(filePath, 'utf-8');
    console.log('文本内容:', textContent);
    
    // 读取为 Buffer（二进制数据）
    const bufferContent = await fsPromises.readFile(filePath);
    console.log('Buffer 长度:', bufferContent.length);
    console.log('十六进制:', bufferContent.toString('hex'));
}
// ========== 选项配置 ==========

async function advancedWrite() {
    const filePath = path.join(__dirname, 'advanced.txt');
    
    await fsPromises.writeFile(
        filePath,
        '高级写入选项示例',
        {
            encoding: 'utf-8',    // 编码格式
            mode: 0o666,          // 文件权限（rw-rw-rw-）
            flag: 'w',            // 文件标志
            // flag 选项：
            // 'r'  - 读取（文件必须存在）
            // 'r+' - 读写（文件必须存在）
            // 'w'  - 写入（创建或截断）
            // 'wx' - 排他写入（文件不存在时才成功）
            // 'a'  - 追加（创建或追加）
            // 'ax' - 排他追加
        }
    );
}
```

### 5.2.2 流式读写（Stream）

对于大文件操作，使用 **Stream（流）** 可以避免将整个文件加载到内存中。

```javascript
const fs = require('fs');
const path = require('path');

// ========== createReadStream（可读流）==========

function readLargeFile() {
    const filePath = path.join(__dirname, 'large-file.dat');
    
    // 创建可读流
    const readStream = fs.createReadStream(filePath, {
        encoding: 'utf-8',    // 编码（可选，不设则为 Buffer）
        highWaterMark: 64 * 1024, // 每次读取 64KB（默认 64KB）
        start: 0,             // 开始读取的位置（字节）
        end: Infinity,        // 结束位置（可选）
        autoClose: true       // 读完自动关闭
    });
    
    // 监听数据事件（每次读取一块数据）
    let chunkCount = 0;
    readStream.on('data', (chunk) => {
        chunkCount++;
        console.log(`收到第 ${chunkCount} 块数据，大小: ${chunk.length} 字节`);
        // 处理数据块...
    });
    
    // 监听结束事件
    readStream.on('end', () => {
        console.log(`文件读取完成，共 ${chunkCount} 块`);
    });
    
    // 监听错误事件
    readStream.on('error', (err) => {
        console.error('读取错误:', err.message);
    });
    
    return readStream;
}
// ========== createWriteStream（可写流）==========

function writeLargeFile(outputPath) {
    // 创建可写流
    const writeStream = fs.createWriteStream(outputPath, {
        encoding: 'utf-8',
        flags: 'w',           // 写入模式
        mode: 0o666,
        autoClose: true,
        highWaterMark: 16 * 1024 // 写入缓冲区大小 16KB
    });
    
    // 监听 drain 事件（缓冲区清空时可继续写入）
    writeStream.on('drain', () => {
        console.log('缓冲区已清空，可以继续写入');
    });
    
    // 监听 finish 事件（end() 调用后且数据刷新完成）
    writeStream.on('finish', () => {
        console.log('所有数据写入完成');
    });
    
    // 监听错误事件
    writeStream.on('error', (err) => {
        console.error('写入错误:', err.message);
    });
    
    return writeStream;
}
// ========== pipe 管道（流式复制文件）==========

function copyFileWithPipe(sourcePath, targetPath) {
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(targetPath);
    
    // 使用 pipe 自动处理背压（Backpressure）
    readStream.pipe(writeStream);
    
    // pipe 返回目标流，可以链式调用事件监听
    writeStream.on('finish', () => {
        console.log(`${sourcePath} → ${targetPath} 复制完成`);
    });
    
    writeStream.on('error', (err) => {
        console.error('复制失败:', err.message);
    });
}

// 使用示例
// copyFileWithPipe('./large-input.dat', './large-output.dat');
// ========== 流式文件处理实战 ==========

async function processLogFile(logFilePath) {
    const outputPath = logFilePath.replace('.log', '-processed.log');
    
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(logFilePath, 'utf-8');
        const writeStream = fs.createWriteStream(outputPath, 'utf-8');
        
        let lineCount = 0;
        let errorCount = 0;
        let remaining = ''; // 存储不完整的行
        
        // 处理每一块数据
        readStream.on('data', (chunk) => {
            // 将剩余数据和当前块拼接
            const data = remaining + chunk;
            const lines = data.split('\n');
            
            // 最后一个元素可能是不完整的行
            remaining = lines.pop() || '';
            
            lines.forEach(line => {
                lineCount++;
                
                // 过滤和处理每行
                if (line.includes('ERROR')) {
                    errorCount++;
                    writeStream.write(`[ERROR] ${line}\n`); // 写入错误行
                } else if (line.includes('WARN')) {
                    writeStream.write(`[WARN] ${line}\n`);
                }
                // 其他级别可以忽略
            });
        });
        
        // 读取结束
        readStream.on('end', () => {
            // 处理最后一行
            if (remaining) {
                writeStream.write(remaining + '\n');
                lineCount++;
            }
            
            // 结束写入流
            writeStream.end();
        });
        
        // 写入完成
        writeStream.on('finish', () => {
            console.log(`处理完成: ${lineCount} 行, ${errorCount} 个错误`);
            resolve({ lineCount, errorCount, outputPath });
        });
        
        // 错误处理
        readStream.on('error', reject);
        writeStream.on('error', reject);
    });
}
```

---

## 5.3 目录操作

### 5.3.1 基本操作

```javascript
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

// ========== 创建目录 ==========

// 创建单层目录
async function createSingleDir() {
    const dirPath = path.join(__dirname, 'test-dir');
    
    await fsPromises.mkdir(dirPath);
    console.log('目录创建成功:', dirPath);
}

// 创建多层嵌套目录（recursive: true）
async function createNestedDirs() {
    const nestedPath = path.join(__dirname, 'level1', 'level2', 'level3');
    
    await fsPromises.mkdir(nestedPath, { recursive: true });
    console.log('嵌套目录创建成功:', nestedPath);
}
// ========== 读取目录内容 ==========

async function listDirectory(dirPath) {
    try {
        // 读取目录内容（仅文件名）
        const items = await fsPromises.readdir(dirPath);
        console.log('\n目录内容（文件名）:');
        items.forEach(item => console.log(' -', item));
        
        // 读取目录内容（带详细信息）
        const detailedItems = await fsPromises.readdir(dirPath, {
            withFileTypes: true // 返回 Dirent 对象
        });
        
        console.log('\n详细信息:');
        for (const item of detailedItems) {
            const type = item.isDirectory() ? '[目录]' : '[文件]';
            const fullPath = path.join(dirPath, item.name);
            
            // 获取文件状态
            const stats = await fsPromises.stat(fullPath);
            const size = formatFileSize(stats.size);
            const modified = stats.mtime.toLocaleString('zh-CN');
            
            console.log(`${type} ${item.name.padEnd(20)} ${size.padEnd(10)} ${modified}`);
        }
        
        return detailedItems;
    } catch (err) {
        console.error('读取目录失败:', err.message);
        return [];
    }
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
// ========== 检查路径存在性 ==========

async function checkPathExists(targetPath) {
    try {
        await fsPromises.access(targetPath, fs.constants.F_OK);
        console.log('路径存在:', targetPath);
        return true;
    } catch {
        console.log('路径不存在:', targetPath);
        return false;
    }
}

// 检查权限
async function checkPermissions(filePath) {
    const permissions = {
        readable: fs.constants.R_OK,  // 读权限
        writable: fs.constants.W_OK,  // 写权限
        executable: fs.constants.X_OK // 执行权限
    };
    
    for (const [name, constant] of Object.entries(permissions)) {
        try {
            await fsPromises.access(filePath, constant);
            console.log(`✅ 有${name === 'readable' ? '读' : name === 'writable' ? '写' : '执行'}权限`);
        } catch {
            console.log(`❌ 无${name === 'readable' ? '读' : name === 'writable' ? '写' : '执行'}权限`);
        }
    }
}
```

### 5.3.2 高级目录操作

```javascript
/**
 * 递归删除目录（Node.js 14.14+ 内置支持）
 */
async function deleteDirectory(dirPath) {
    try {
        await fsPromises.rm(dirPath, {
            recursive: true, // 递归删除
            force: true      // 不存在时不报错
        });
        console.log('目录删除成功:', dirPath);
    } catch (err) {
        console.error('删除失败:', err.message);
    }
}

/**
 * 递归遍历目录（手动实现）
 */
async function walkDirectory(dirPath, options = {}) {
    const {
        filter = null,       // 文件过滤函数
        maxDepth = Infinity, // 最大深度
        currentDepth = 0     // 当前深度（内部使用）
    } = options;
    
    const results = [];
    
    if (currentDepth >= maxDepth) return results;
    
    const items = await fsPromises.readdir(dirPath, { withFileTypes: true });
    
    for (const item of items) {
        const fullPath = path.join(dirPath, item.name);
        
        if (item.isDirectory()) {
            // 递归遍历子目录
            const subResults = await walkDirectory(fullPath, {
                ...options,
                currentDepth: currentDepth + 1
            });
            results.push(...subResults);
        } else if (item.isFile()) {
            // 检查过滤器
            if (!filter || filter(fullPath, item)) {
                results.push({
                    path: fullPath,
                    name: item.name,
                    depth: currentDepth
                });
            }
        }
    }
    
    return results;
}

// 使用示例：查找所有 .js 文件
async function findAllJsFiles(rootDir) {
    const jsFiles = await walkDirectory(rootDir, {
        filter: (filePath) => filePath.endsWith('.js'),
        maxDepth: 5 // 最多深入 5 层
    });
    
    console.log(`找到 ${jsFiles.length} 个 JS 文件:`);
    jsFiles.forEach(f => console.log('  ', f.path));
    
    return jsFiles;
}
```

---

## 5.4 文件监听

### 5.4.1 fs.watch 基础

```javascript
const fs = require('fs');
const path = require('path');

/**
 * 文件监听（File Watching）
 * 用于热更新、自动构建、配置重载等场景
 */

// ========== 基础监听 ==========

function watchFile(filePath) {
    console.log(`开始监视文件: ${filePath}`);
    
    // 返回 FSWatcher 对象
    const watcher = fs.watch(filePath, (eventType, filename) => {
        /*
         * eventType:
         * - 'rename' - 文件被删除或重命名
         * - 'change' - 文件内容被修改
         *
         * filename: 触发变化的文件名（可能因平台不同而为 null）
         */
        
        console.log(`[${new Date().toLocaleTimeString()}] 事件: ${eventType}`);
        if (filename) {
            console.log(`文件名: ${filename}`);
        }
        
        // 根据事件类型处理
        if (eventType === 'change') {
            console.log('→ 文件内容发生变化，执行重载...');
            reloadConfig(filePath);
        }
    });
    
    // 监听错误
    watcher.on('error', (err) => {
        console.error('监听错误:', err.message);
    });
    
    // 手动关闭监听
    // watcher.close();
    
    return watcher;
}

// 配置重载函数
function reloadConfig(configPath) {
    try {
        delete require.cache[require.resolve(configPath)]; // 清除缓存
        const config = require(configPath);
        console.log('配置重载成功:', JSON.stringify(config, null, 2));
    } catch (err) {
        console.error('配置重载失败:', err.message);
    }
}

// 使用
// const watcher = watchFile('./config.json');
```

### 5.4.2 高级监听（chokidar）

对于生产环境，推荐使用 `chokidar` 库（跨平台更可靠）：

```javascript
// 需要先安装: npm install chokidar
const chokidar = require('chokidar');

function setupAdvancedWatch(rootPath) {
    // 初始化监听器
    const watcher = chokidar.watch(rootPath, {
        ignored: [
            /(^|[\/\\])\../,          // 忽略隐藏文件
            /node_modules/,            // 忽略 node_modules
            '**/*.log'                 // 忽略日志文件
        ],
        persistent: true,             // 持续监听
        ignoreInitial: true,          // 忽略初始扫描时的事件
        awaitWriteFinish: {
            stabilityThreshold: 200,  // 文件稳定 200ms 后才触发事件
            pollInterval: 100         // 轮询间隔
        }
    });
    
    // 监听各种事件
    watcher
        .on('add', filePath => {
            console.log(`[新增] ${filePath}`);
        })
        .on('change', filePath => {
            console.log(`[变更] ${filePath}`);
            // 防抖处理：避免频繁触发
            debouncedReload();
        })
        .on('unlink', filePath => {
            console.log(`[删除] ${filePath}`);
        })
        .on('error', error => {
            console.error(`[错误] ${error}`);
        })
        .on('ready', () => {
            console.log('初始扫描完成，开始监听变化...');
        });
    
    return watcher;
}

// 简单防抖函数
let reloadTimer = null;
function debouncedReload() {
    if (reloadTimer) clearTimeout(reloadTimer);
    reloadTimer = setTimeout(() => {
        console.log('执行防抖后的重载操作...');
        reloadTimer = null;
    }, 300); // 300ms 防抖延迟
}
```

---

## 5.5 路径处理（path 模块）

### 5.5.1 path 核心方法

```javascript
const path = require('path');

/**
 * path 模块 - 跨平台路径处理工具
 * 
 * 为什么使用 path 而不是字符串拼接？
 * - Windows 使用 \，Linux/macOS 使用 /
 * - path 自动处理这些差异
 */

// ========== path.join() - 拼接路径片段 ==========
const joinedPath = path.join('/user', 'local', 'bin', 'node.js');
console.log('拼接结果:', joinedPath);
// Linux: '/user/local/bin/node.js'
// Windows: '\\user\\local\\bin\\node.js'

// 自动处理 .. 和 .
const normalizedJoin = path.join('/foo', 'bar', '../baz', './qux');
console.log('标准化拼接:', normalizedJoin);
// 输出: '/foo/baz/qux'
// ========== path.resolve() - 解析为绝对路径 ==========
const absolutePath = path.resolve('src', 'components', 'Button.jsx');
console.log('绝对路径:', absolutePath);
// 基于当前工作目录（process.cwd()）解析

// 多种用法
console.log(path.resolve());                  // 当前工作目录
console.log(path.resolve('index.js'));        // cwd/index.js
console.log(path.resolve('/foo', '/bar'));    // '/bar'（后面的绝对路径覆盖前面的）
// ========== 路径分解 ==========
const filePath = '/home/user/documents/report.pdf';

console.log('目录部分:', path.dirname(filePath));   // '/home/user/documents'
console.log('文件名:', path.basename(filePath));    // 'report.pdf'
console.log('扩展名:', path.extname(filePath));     // '.pdf'

// basename 去掉扩展名
console.log('不含扩展名的文件名:', path.basename(filePath, '.pdf')); // 'report'
// ========== path.parse() - 解析路径对象 ==========
const parsed = path.parse('/home/user/docs/note.txt');
console.log('解析结果:', parsed);
/*
{
    root: '/',
    dir: '/home/user/docs',
    base: 'note.txt',
    ext: '.txt',
    name: 'note'
}
*/
// ========== path.format() - 从对象组装路径 ==========
const pathObj = {
    root: '/usr',
    dir: '/usr/local/bin',
    base: 'node',
    ext: '',
    name: 'node'
};
console.log('组装路径:', path.format(pathObj)); // '/usr/local/bin/node'
// ========== path.normalize() - 标准化路径 ==========
const messyPath = '/foo/bar//baz/.././qux/';
console.log('标准化:', path.normalize(messyPath));
// 输出: '/foo/bar/qux/'
// ========== path.isAbsolute() - 判断是否绝对路径 ==========
console.log(path.isAbsolute('/foo/bar')); // true
console.log(path.isAbsolute('./foo'));    // false
console.log(path.isAbsolute('C:\\foo'));  // Windows 下 true
// ========== path.relative() - 计算相对路径 ==========
const from = '/data/orandea/test/aaa';
const to = '/data/orandeka/impl/bbb';
console.log('相对路径:', path.relative(from, to));
// 输出: '../../orandeka/impl/bbb'
```

### 5.5.2 实战：文件路径工具函数

```javascript
const path = require('path');
const fs = require('fs');

/**
 * 常用的路径处理工具函数
 */

// 确保路径使用正确的分隔符
function ensurePosix(p) {
    return p.replace(/\\/g, '/');
}

// 获取文件类型的图标（用于显示）
function getFileIcon(filename) {
    const ext = path.extname(filename).toLowerCase();
    const icons = {
        '.js': '📜', '.ts': '📘', '.jsx': '⚛️', '.tsx': '⚛️',
        '.html': '🌐', '.css': '🎨', '.scss': '🎨', '.json': '📋',
        '.md': '📝', '.txt': '📄', '.png': '🖼️', '.jpg': '🖼️',
        '.svg': '🎭', '.pdf': '📕', '.zip': '📦', '.env': '🔐'
    };
    return icons[ext] || '📁';
}

// 安全地拼接路径（防止路径穿越攻击）
function safeJoin(baseDir, targetPath) {
    const targetPathResolved = path.resolve(baseDir, targetPath);
    const baseDirResolved = path.resolve(baseDir);
    
    // 确保最终路径在基准目录内
    if (!targetPathResolved.startsWith(baseDirResolved)) {
        throw new Error('路径穿越检测：不允许访问父目录');
    }
    
    return targetPathResolved;
}

// 使用示例
try {
    const safePath = safeJoin('/var/www/uploads', '../../../etc/passwd');
    // 会抛出错误！因为目标路径超出了 uploads 目录
} catch (err) {
    console.error('安全拦截:', err.message);
}
```

---

## 本章要点速查

### fs API 速查

| 操作 | 异步（Promise） | 同步 | 说明 |
|------|-----------------|------|------|
|
---

# 第7章：Express/Koa 框架实战

## 📚 本章学习目标

- 掌握 **Express 框架** 的核心概念和完整项目结构
- 理解 **中间件模式** 和洋葱模型的工作原理
- 学会使用 **Express 常用中间件** 提升开发效率
- 掌握 **RESTful API 设计** 的最佳实践
- 了解 **Koa2 框架** 的设计理念和 TypeScript 集成

---

## 7.1 Express 框架核心概念

### 7.1.1 Express 简介

**Express** 是 Node.js 最流行的 Web 应用框架，提供了简洁的 API 来构建 Web 应用和 API。它基于 Node.js 内置的 http 模块，添加了路由、中间件、视图系统等功能。

```javascript
/**
 * Express 基础示例
 */

const express = require('express');
const app = express();

// 基础路由
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.get('/api/users', (req, res) => {
    res.json({ users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

### 7.1.2 Express 完整项目结构示例

```
my-express-app/
├── src/
│   ├── config/                 # 配置文件
│   │   ├── index.js            # 主配置入口
│   │   ├── database.js         # 数据库配置
│   │   └── redis.js            # Redis 配置
│   │
│   ├── controllers/            # 控制器层
│   │   ├── userController.js   # 用户相关控制器
│   │   ├── authController.js   # 认证控制器
│   │   └── productController.js# 产品控制器
│   │
│   ├── middleware/             # 中间件
│   │   ├── index.js            # 中间件注册
│   │   ├── auth.js             # JWT 认证中间件
│   │   ├── errorHandler.js     # 全局错误处理
│   │   ├── validator.js        # 请求验证
│   │   └── rateLimiter.js      # 限流中间件
│   │
│   ├── models/                 # 数据模型
│   │   ├── User.js             # 用户模型
│   │   ├── Product.js          # 产品模型
│   │   └── Order.js            # 订单模型
│   │
│   ├── routes/                 # 路由定义
│   │   ├── index.js            # 路由注册
│   │   ├── userRoutes.js       # 用户路由
│   │   ├── authRoutes.js       # 认证路由
│   │   └── productRoutes.js    # 产品路由
│   │
│   ├── services/               # 业务逻辑层
│   │   ├── userService.js      # 用户服务
│   │   ├── authService.js      # 认证服务
│   │   └── emailService.js     # 邮件服务
│   │
│   ├── utils/                  # 工具函数
│   │   ├── response.js         # 统一响应格式
│   │   ├── logger.js           # 日志工具
│   │   └── helpers.js          # 辅助函数
│   │
│   ├── validators/             # 请求验证规则
│   │   ├── userValidator.js    # 用户验证规则
│   │   └── productValidator.js # 产品验证规则
│   │
│   └── app.js                  # Express 应用实例
│
├── tests/                      # 测试文件
│   ├── unit/                   # 单元测试
│   └── integration/            # 集成测试
│
├── docs/                       # 文档
│   └── api/                    # API 文档
│
├── .env                        # 环境变量
├── .env.example                # 环境变量示例
├── .gitignore                  # Git 忽略配置
├── package.json                # 项目依赖
├── server.js                   # 服务器入口
└── README.md                   # 项目说明
```

#### 各目录职责详解

| 目录 | 职责 | 说明 |
|------|------|------|
| **config/** | 配置管理 | 数据库、Redis、第三方服务等配置，支持多环境 |
| **controllers/** | 控制器 | 处理 HTTP 请求，调用 Service 层，返回响应 |
| **middleware/** | 中间件 | 认证、日志、错误处理、限流等横切关注点 |
| **models/** | 数据模型 | 定义数据结构、数据库交互（ORM/ODM） |
| **routes/** | 路由定义 | URL 路径与控制器的映射关系 |
| **services/** | 业务逻辑 | 核心业务处理，与数据存储无关 |
| **utils/** | 工具函数 | 响应封装、日志、辅助方法 |

#### 完整项目代码示例

```javascript
// ==================== config/index.js ====================
module.exports = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 27017,
        name: process.env.DB_NAME || 'myapp',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    },
    
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD
    },
    
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15分钟
        max: 100 // 每个 IP 最大请求数
    }
};

// ==================== utils/response.js ====================
class ApiResponse {
    static success(data, message = 'Success', statusCode = 200) {
        return {
            success: true,
            statusCode,
            message,
            data,
            timestamp: new Date().toISOString()
        };
    }
    
    static error(message = 'Error', statusCode = 500, errors = null) {
        return {
            success: false,
            statusCode,
            message,
            errors,
            timestamp: new Date().toISOString()
        };
    }
    
    static paginated(data, page, limit, total) {
        return {
            success: true,
            statusCode: 200,
            data,
            pagination: {
                current: page,
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
            timestamp: new Date().toISOString()
        };
    }
}

module.exports = ApiResponse;

// ==================== middleware/auth.js ====================
const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/response');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json(
            ApiResponse.error('No token provided', 401)
        );
    }
    
    const token = authHeader.substring(7);
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json(
                ApiResponse.error('Token expired', 401, { code: 'TOKEN_EXPIRED' })
            );
        }
        return res.status(401).json(
            ApiResponse.error('Invalid token', 401, { code: 'INVALID_TOKEN' })
        );
    }
}

function optionalAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (error) {
            // Token 无效但不阻止请求
        }
    }
    
    next();
}

module.exports = { authMiddleware, optionalAuth };

// ==================== controllers/userController.js ====================
const userService = require('../services/userService');
const ApiResponse = require('../utils/response');

class UserController {
    async getUsers(req, res, next) {
        try {
            const { page = 1, limit = 10, search } = req.query;
            
            const result = await userService.getUsers({
                page: parseInt(page),
                limit: parseInt(limit),
                search
            });
            
            res.status(200).json(
                ApiResponse.paginated(result.users, result.page, result.limit, result.total)
            );
        } catch (error) {
            next(error);
        }
    }
    
    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            
            if (!user) {
                return res.status(404).json(
                    ApiResponse.error('User not found', 404)
                );
            }
            
            res.status(200).json(ApiResponse.success(user));
        } catch (error) {
            next(error);
        }
    }
    
    async createUser(req, res, next) {
        try {
            const userData = req.body;
            const user = await userService.createUser(userData);
            
            res.status(201).json(ApiResponse.success(user, 'User created successfully'));
        } catch (error) {
            next(error);
        }
    }
    
    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const user = await userService.updateUser(id, updateData);
            
            res.status(200).json(ApiResponse.success(user, 'User updated successfully'));
        } catch (error) {
            next(error);
        }
    }
    
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            await userService.deleteUser(id);
            
            res.status(200).json(ApiResponse.success(null, 'User deleted successfully'));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();

// ==================== routes/userRoutes.js ====================
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');
const { validateCreateUser, validateUpdateUser } = require('../validators/userValidator');

// 所有用户路由都需要认证
router.use(authMiddleware);

router.get('/', userController.getUsers);                    // 获取用户列表
router.get('/:id', userController.getUserById);              // 获取单个用户
router.post('/', validateCreateUser, userController.createUser);     // 创建用户
router.put('/:id', validateUpdateUser, userController.updateUser);   // 更新用户
router.delete('/:id', userController.deleteUser);            // 删除用户

module.exports = router;

// ==================== app.js ====================
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();

// ==================== 基础中间件 ====================
app.use(helmet());                          // 安全头设置
app.use(cors());                            // CORS 支持
app.use(compression());                     // Gzip 压缩
app.use(morgan('combined'));                // 日志记录
app.use(express.json({ limit: '10mb' }));   // JSON 解析
app.use(express.urlencoded({ extended: true }));

// ==================== 限流配置 ====================
const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: { success: false, message: 'Too many requests' }
});
app.use('/api/', limiter);

// ==================== 路由注册 ====================
app.use('/api/users', userRoutes);

// ==================== 健康检查 ====================
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv
    });
});

// ==================== 错误处理 ====================
app.use(errorHandler);

// 404 处理
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.path} not found`
    });
});

module.exports = app;

// ==================== server.js ====================
const app = require('./src/app');
const config = require('./src/config');

app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port}`);
    console.log(`📚 Environment: ${config.nodeEnv}`);
});
```

---

## 7.2 Express 中间件模式详解

### 7.2.1 中间件的概念

**中间件（Middleware）** 是一个函数，它可以访问请求对象（`req`）、响应对象（`res`）和下一个中间件函数（`next`）。中间件可以执行以下操作：

1. 执行任何代码
2. 修改请求和响应对象
3. 结束请求-响应循环
4. 调用下一个中间件

### 7.2.2 图表2：Express/Koa 中间件洋葱模型图

以下是 Express/Koa 中间件执行流程的洋葱模型示意图：

```mermaid
flowchart LR
    subgraph Request ["请求进入"]
        REQ["HTTP Request"]
    end
    
    subgraph MiddlewareChain ["中间件链（洋葱模型）"]
        direction TB
        MW1["MW1: Logger<br/>req → next() → res.log"]
        MW2["MW2: Auth<br/>检查token → next()"]
        MW3["MW3: Body Parser<br/>解析body → next()"]
        MW4["MW4: Router<br/>处理路由逻辑"]
        MW5["MW5: Error Handler<br/>err, req, res, next"]
        
        MW1 --> MW2 --> MW3 --> MW4 --> MW5
    end
    
    subgraph Response ["响应返回"]
        RES["HTTP Response"]
    end
    
    Request --> MiddlewareChain --> RES
```

**洋葱模型说明**：
- **请求阶段**：请求从外向内穿过每个中间件（MW1 → MW2 → MW3 → MW4）
- **响应阶段**：响应从内向外返回（MW4 → MW3 → MW2 → MW1）
- **Error Handler**：始终作为最后一个中间件，捕获所有未处理的错误
- **next()**：将控制权传递给下一个中间件

### 7.2.3 中间件类型与示例

```javascript
/**
 * Express 中间件类型详解
 */

const express = require('express');
const app = express();

// ==================== 1. 应用级中间件 ====================
// 绑定到 app 对象，对所有路由生效

// 所有请求都会经过这个中间件
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// 特定路径的中间件
app.use('/api', (req, res, next) => {
    req.startTime = Date.now();
    next();
});

// ==================== 2. 路由级中间件 ====================
// 绑定到特定路由

app.get('/users/:id', 
    // 参数验证中间件
    (req, res, next) => {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id < 1) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        next();
    },
    // 路由处理器
    (req, res) => {
        res.json({ id: req.params.id, name: `User ${req.params.id}` });
    }
);

// ==================== 3. 错误处理中间件 ====================
// 必须有 4 个参数 (err, req, res, next)

app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ==================== 4. 内置中间件 ====================
app.use(express.json());                      // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码的请求体
app.use(express.static('public'));            // 静态文件服务

// ==================== 5. 第三方中间件示例 ====================

// Cookie 解析
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Session 管理
const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000 }
}));

// 文件上传
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});
```

### 7.2.4 Express 常用中间件速查表

| 中间件名称 | 功能 | 安装命令 | 使用场景 |
|-----------|------|----------|----------|
| **morgan** | HTTP 请求日志记录 | `npm install morgan` | 开发环境调试、生产环境访问日志 |
| **helmet** | 设置安全相关的 HTTP 头 | `npm install helmet` | 所有生产环境的 Web 应用 |
| **cors** | 处理跨域资源共享 (CORS) | `npm install cors` | API 服务、前后端分离项目 |
| **compression** | Gzip/Brotli 压缩响应 | `npm install compression` | 减少传输体积，提升加载速度 |
| **cookie-parser** | 解析 Cookie 头 | `npm install cookie-parser` | 需要 Cookie 认证的应用 |
| **express-session** | 会话管理 | `npm install express-session` | 用户登录状态管理 |
| **body-parser** | 解析请求体（已内置在 Express 4.16+） | `npm install body-parser` | 旧版本 Express 或需要额外配置 |
| **multer** | 处理 multipart/form-data（文件上传） | `npm install multer` | 图片上传、文件导入功能 |
| **express-rate-limit** | API 限流保护 | `npm install express-rate-limit` | 防止 API 被滥用、DDoS 攻击防护 |
| **express-validator** | 请求数据验证 | `npm install express-validator` | 表单验证、API 参数校验 |
| **passport** | 认证中间件框架 | `npm install passport` | OAuth、本地策略、JWT 等多种认证方式 |
| **connect-mongo** | 将 session 存储到 MongoDB | `npm install connect-mongo` | 多实例部署、session 持久化 |
| **csurf** | CSRF 保护 | `npm install csurf` | 表单提交、防止跨站请求伪造 |

#### 中间件配置示例

```javascript
/**
 * Express 常用中间件配置大全
 */

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const csurf = require('csrf');

const app = express();

// ==================== Morgan - 日志配置 ====================
if (process.env.NODE_ENV === 'development') {
    // 开发环境：彩色详细日志
    app.use(morgan('dev'));
} else {
    // 生产环境：写入文件
    const fs = require('fs');
    const path = require('path');
    const accessLogStream = fs.createWriteStream(
        path.join(__dirname, 'logs/access.log'),
        { flags: 'a' }
    );
    app.use(morgan('combined', { stream: accessLogStream }));
}

// ==================== Helmet - 安全头配置 ====================
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    noSniff: true,
    frameguard: { action: 'deny' },
    xssFilter: true
}));

// ==================== CORS - 跨域配置 ====================
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://example.com'
    ],  // 允许的源
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  // 允许的方法
    allowedHeaders: ['Content-Type', 'Authorization'],  // 允许的请求头
    credentials: true,  // 允许携带凭证（Cookie）
    optionsSuccessStatus: 204  // 预检请求的成功状态码
}));

// ==================== Compression - 压缩配置 ====================
app.use(compression({
    level: 6,  // 压缩级别 (1-9)，6 是性能和压缩率的平衡点
    threshold: 1024,  // 只压缩大于 1KB 的响应
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;  // 不压缩
        }
        return compression.filter(req, res);
    }
}));

// ==================== Rate Limit - 限流配置 ====================
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15分钟
    max: 100,  // 每个 IP 最多 100 个请求
    message: {
        success: false,
        message: 'Too many requests from this IP',
        retryAfter: '15 minutes'
    },
    standardHeaders: true,  // 返回标准的 RateLimit-* 头
    legacyHeaders: false,  // 禁用 X-RateLimit-* 头
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,  // 登录接口更严格
    message: { success: false, message: 'Too many login attempts' }
});

app.use('/api/', apiLimiter);
app.post('/api/login', authLimiter, loginHandler);

// ==================== Cookie Parser - Cookie 配置 ====================
app.use(cookieParser(process.env.COOKIE_SECRET));

// ==================== CSRF Protection ====================
app.use(csurf({ cookie: true }));
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});
```

---

## 7.3 RESTful API 最佳实践

### 7.3.1 URL 设计规范

```
✅ 正确的 RESTful URL 设计：

资源集合：
GET    /api/v1/users              # 获取用户列表
POST   /api/v1/users              # 创建用户
GET    /api/v1/users/{id}         # 获取特定用户
PUT    /api/v1/users/{id}         # 更新整个用户
PATCH  /api/v1/users/{id}         # 部分更新用户
DELETE /api/v1/users/{id}         # 删除用户

子资源：
GET    /api/v1/users/{id}/posts           # 获取用户的文章列表
POST   /api/v1/users/{id}/posts           # 为用户创建文章
GET    /api/v1/users/{id}/posts/{postId}  # 获取用户的特定文章

❌ 错误的设计：
GET    /api/v1/getAllUsers          # 不要用动词
POST   /api/v1/createUser          # 不要用动词
GET    /api/v1/user/:userId         # 保持复数形式
```

#### URL 设计原则

| 原则 | 示例 | 说明 |
|------|------|------|
| **使用名词复数** | `/users`, `/products` | 资源的集合 |
| **避免动词** | ❌ `/getUsers`, ✅ `/users` | HTTP 方法已经表示动作 |
| **层级嵌套** | `/users/{id}/orders` | 表示所属关系 |
| **版本控制** | `/api/v1/`, `/api/v2/` | 便于 API 迭代 |
| **使用 kebab-case** | `/user-profiles`, `/order-items` | URL 友好 |
| **查询参数过滤** | `/users?role=admin&status=active` | 过滤、排序、分页 |

### 7.3.2 响应格式规范

```javascript
/**
 * 统一响应格式标准
 */

// ==================== 成功响应 ====================

// 单个资源
{
    "success": true,
    "statusCode": 200,
    "message": "Operation successful",
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
    },
    "timestamp": "2026-06-16T10:30:00Z"
}

// 资源集合（分页）
{
    "success": true,
    "statusCode": 200,
    "data": [...],
    "pagination": {
        "current": 1,
        "pageSize": 20,
        "total": 150,
        "totalPages": 8
    },
    "timestamp": "2026-06-16T10:30:00Z"
}

// 创建成功（201）
{
    "success": true,
    "statusCode": 201,
    "message": "Resource created",
    "data": { "id": 123, ... },
    "location": "/api/v1/users/123",  // 新资源的 URL
    "timestamp": "2026-06-16T10:30:00Z"
}

// 无内容（204）
// 状态码 204 No Content，无响应体

// ==================== 错误响应 ====================

// 客户端错误（4xx）
{
    "success": false,
    "statusCode": 400,
    "message": "Validation failed",
    "errors": [
        {
            "field": "email",
            "message": "Invalid email format"
        },
        {
            "field": "password",
            "message": "Password must be at least 8 characters"
        }
    ],
    "code": "VALIDATION_ERROR",
    "timestamp": "2026-06-16T10:30:00Z"
}

// 未授权（401）
{
    "success": false,
    "statusCode": 401,
    "message": "Authentication required",
    "code": "UNAUTHORIZED",
    "timestamp": "2026-06-16T10:30:00Z"
}

// 未找到（404）
{
    "success": false,
    "statusCode": 404,
    "message": "Resource not found",
    "code": "NOT_FOUND",
    "timestamp": "2026-06-16T10:30:00Z"
}

// 服务器错误（5xx）
{
    "success": false,
    "statusCode": 500,
    "message": "Internal server error",
    "code": "INTERNAL_ERROR",
    ...(process.env.NODE_ENV === 'development' && {
        "stack": "Error: ..."
    }),
    "timestamp": "2026-06-16T10:30:00Z"
}
```

### 7.3.3 分页、过滤与排序实现

```javascript
/**
 * RESTful API 高级功能实现
 */

const express = require('express');
const router = express.Router();

// ==================== 分页参数解析中间件 ====================
function parsePaginationParams(req, res, next) {
    const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        ...filters
    } = req.query;
    
    // 参数校验
    req.pagination = {
        page: Math.max(1, parseInt(page)),
        limit: Math.min(100, Math.max(1, parseInt(limit))),  // 限制最大100条
        skip: (Math.max(1, parseInt(page)) - 1) * Math.min(100, Math.max(1, parseInt(limit)))
    };
    
    req.sorting = {
        field: sortBy,  // 应该白名单校验
        order: sortOrder.toLowerCase() === 'asc' ? 1 : -1
    };
    
    req.filters = filters;  // 其他查询参数作为过滤器
    
    next();
}

// ==================== 过滤器构建 ====================
function buildFilters(filters, allowedFields) {
    const query = {};
    
    for (const [key, value] of Object.entries(filters)) {
        if (!allowedFields.includes(key)) continue;  // 只允许白名单字段
        
        // 特殊操作符支持
        if (typeof value === 'string') {
            // 模糊搜索 (name~like)
            if (value.endsWith('~')) {
                query[key] = { $regex: value.slice(0, -1), $options: 'i' };
            }
            // 数组值 (status=active,pending)
            else if (value.includes(',')) {
                query[key] = { $in: value.split(',') };
            }
            // 范围查询 (age>18,price<100)
            else if (value.startsWith('>')) {
                query[key] = { $gt: parseFloat(value.slice(1)) };
            } else if (value.startsWith('<')) {
                query[key] = { $lt: parseFloat(value.slice(1)) };
            }
            // 精确匹配
            else {
                query[key] = value;
            }
        } else {
            query[key] = value;
        }
    }
    
    return query;
}

// ==================== 完整的路由实现 ====================
router.get('/products', parsePaginationParams, async (req, res) => {
    try {
        const { pagination, sorting, filters } = req;
        
        // 构建查询条件
        const query = buildFilters(filters, [
            'category', 'brand', 'status', 'minPrice', 'maxPrice'
        ]);
        
        // 价格范围特殊处理
        if (filters.minPrice || filters.maxPrice) {
            query.price = {};
            if (filters.minPrice) query.price.$gte = parseFloat(filters.minPrice);
            if (filters.maxPrice) query.price.$lte = parseFloat(filters.maxPrice);
            delete query.minPrice;
            delete query.maxPrice;
        }
        
        // 并行执行查询和计数
        const [products, total] = await Promise.all([
            Product.find(query)
                .sort({ [sorting.field]: sorting.order })
                .skip(pagination.skip)
                .limit(pagination.limit)
                .lean(),
            Product.countDocuments(query)
        ]);
        
        // 响应头元数据
        res.set({
            'X-Total-Count': total,
            'X-Page': pagination.page,
            'X-Per-Page': pagination.limit,
            'X-Total-Pages': Math.ceil(total / pagination.limit),
            'X-Next-Page': pagination.page * pagination.limit < total ? pagination.page + 1 : null,
            'X-Prev-Page': pagination.page > 1 ? pagination.page - 1 : null
        });
        
        // 统一响应格式
        res.json({
            success: true,
            data: products,
            pagination: {
                current: pagination.page,
                pageSize: pagination.limit,
                total,
                totalPages: Math.ceil(total / pagination.limit)
            },
            links: {
                self: `${req.originalUrl}`,
                next: pagination.page * pagination.limit < total 
                    ? `${req.baseUrl}?page=${pagination.page + 1}&limit=${pagination.limit}` 
                    : null,
                prev: pagination.page > 1 
                    ? `${req.baseUrl}?page=${pagination.page - 1}&limit=${pagination.limit}` 
                    : null
            }
        });
        
    } catch (error) {
        next(error);
    }
});

// ==================== 使用示例 ====================
/*
GET /api/v1/products?page=2&limit=20&sortBy=price&sortOrder=asc&category=electronics&brand=Apple&minPrice=500&maxPrice=2000

响应头：
X-Total-Count: 150
X-Page: 2
X-Per-Page: 20
X-Total-Pages: 8
X-Next-Page: 3
X-Prev-Page: 1

响应体：
{
    "success": true,
    "data": [...],
    "pagination": {
        "current": 2,
        "pageSize": 20,
        "total": 150,
        "totalPages": 8
    },
    "links": {
        "self": "...",
        "next": "?page=3&limit=20...",
        "prev": "?page=1&limit=20..."
    }
}
*/
```

### 7.3.4 版本控制策略

```javascript
/**
 * API 版本控制实现方案
 */

// ==================== 方案1：URL 路径版本控制（推荐）====================
const express = require('express');

const v1Router = express.Router();
const v2Router = express.Router();

// v1 API
v1Router.get('/users', (req, res) => {
    res.json({ version: 1, users: [...] });
});

// v2 API（改进版）
v2Router.get('/users', async (req, res) => {
    const { includeProfile } = req.query;
    let users = await User.find({});
    if (includeProfile === 'true') {
        users = await Promise.all(users.map(u => u.populate('profile')));
    }
    res.json({ version: 2, users, meta: { totalCount: users.length } });
});

// 注册版本路由
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// ==================== 方案2：请求头版本控制 ====================
function versionMiddleware(versions) {
    return (req, res, next) => {
        const version = req.headers['api-version'] || 'v1';
        
        if (!versions[version]) {
            return res.status(400).json({
                success: false,
                message: `Unsupported API version: ${version}`,
                supportedVersions: Object.keys(versions)
            });
        }
        
        req.apiVersion = version;
        versions[version](req, res, next);
    };
}

app.use('/api/users', versionMiddleware({
    'v1': require('./routes/v1/userRoutes'),
    'v2': require('./routes/v2/userRoutes')
}));

// ==================== 版本废弃通知 ====================
app.use((req, res, next) => {
    if (req.path.startsWith('/api/v1')) {
        res.set('Deprecation', 'true');
        res.set('Sunset', '2026-12-31T23:59:59Z');  // 废弃日期
        res.set('Link', '</api/v2>; rel="successor-version"');
    }
    next();
});
```

---

## 7.4 Koa2 框架实战

### 7.4.1 Koa vs Express 对比

| 特性 | Express | Koa2 |
|------|---------|------|
| **设计理念** | 包含大量内置功能（路由、视图等） | 极简内核，功能通过中间件扩展 |
| **中间件模型** | 线性模型（简单易理解） | 洋葱模型（async/await） |
| **异步处理** | 回调/Promise | 原生 async/await |
| **Context 对象** | req, res 分离 | ctx（合并了 req 和 res） |
| **错误处理** | 需要手动传递 | 自动捕获 async 错误 |
| **学习曲线** | 较低 | 中等 |
| **包大小** | 较大（功能丰富） | 极小（约770行代码） |
| **适用场景** | 快速开发、全栈应用 | 高性能 API、微服务 |

### 7.4.2 Koa 完整项目示例（含 TypeScript）

```typescript
// ==================== types/koa.d.ts ====================
declare namespace Koa {
    interface Context {
        state: {
            user?: IUser;
            requestId?: string;
            startTime?: number;
        };
    }
}

interface IUser {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'user';
}

// ==================== types/errors.ts ====================
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly code: string;

    constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(public readonly errors: Array<{ field: string; message: string }>) {
        super('Validation failed', 400, 'VALIDATION_ERROR');
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string = 'Resource') {
        super(`${resource} not found`, 404, 'NOT_FOUND');
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401, 'UNAUTHORIZED');
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Forbidden') {
        super(message, 403, 'FORBIDDEN');
    }
}

// ==================== utils/response.ts ====================
import Context from 'koa';

interface SuccessResponse<T = any> {
    success: true;
    statusCode: number;
    message: string;
    data: T;
    timestamp: string;
}

interface ErrorResponse {
    success: false;
    statusCode: number;
    message: string;
    errors?: any;
    code?: string;
    timestamp: string;
}

interface PaginatedResponse<T> {
    success: true;
    statusCode: number;
    data: T[];
    pagination: {
        current: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
    timestamp: string;
}

export class ResponseHelper {
    static success<T>(ctx: Context, data: T, message: string = 'Success', statusCode: number = 200): void {
        ctx.status = statusCode;
        ctx.body = <SuccessResponse<T>>{
            success: true,
            statusCode,
            message,
            data,
            timestamp: new Date().toISOString()
        };
    }

    static error(ctx: Context, message: string, statusCode: number = 500, errors?: any, code?: string): void {
        ctx.status = statusCode;
        ctx.body = <ErrorResponse>{
            success: false,
            statusCode,
            message,
            errors,
            code,
            timestamp: new Date().toISOString()
        };
    }

    static paginated<T>(
        ctx: Context, 
        data: T[], 
        page: number, 
        limit: number, 
        total: number
    ): void {
        ctx.status = 200;
        ctx.body = <PaginatedResponse<T>>{
            success: true,
            statusCode: 200,
            data,
            pagination: {
                current: page,
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
            timestamp: new Date().toISOString()
        };
    }

    static created(ctx: Context, data: any, location?: string): void {
        ctx.status = 201;
        if (location) {
            ctx.set('Location', location);
        }
        ctx.body = <SuccessResponse>{
            success: true,
            statusCode: 201,
            message: 'Resource created',
            data,
            timestamp: new Date().toISOString()
        };
    }

    static noContent(ctx: Context): void {
        ctx.status = 204;
        ctx.body = null;
    }
}

// ==================== middleware/errorHandler.ts ====================
import { Context, Next } from 'koa';
import { AppError } from '../types/errors';
import { ResponseHelper } from '../utils/response';

export async function errorHandler(ctx: Context, next: Next): Promise<void> {
    try {
        await next();
    } catch (err) {
        console.error('Error caught by middleware:', err);

        if (err instanceof AppError) {
            // 已知的业务错误
            ResponseHelper.error(
                ctx,
                err.message,
                err.statusCode,
                err.errors,
                err.code
            );
        } else if (err.name === 'ValidationError') {
            // 参数验证错误（如 koa-bodyparser）
            ResponseHelper.error(ctx, 'Invalid request data', 400, err.details);
        } else if (err.status && err.status >= 400 && err.status < 500) {
            // 其他客户端错误
            ResponseHelper.error(ctx, err.message, err.status);
        } else {
            // 未知的服务器错误
            console.error('Unexpected error:', err);
            ResponseHelper.error(
                ctx,
                process.env.NODE_ENV === 'production' 
                    ? 'Internal server error' 
                    : err.message,
                500,
                process.env.NODE_ENV === 'development' ? err.stack : undefined,
                'INTERNAL_ERROR'
            );
        }
    }
}

// ==================== middleware/auth.ts ====================
import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import { UnauthorizedError, ForbiddenError } from '../types/errors';
import config from '../config';

interface JwtPayload {
    userId: string;
    role: string;
    iat: number;
    exp: number;
}

export function auth(requiredRole?: string[]) {
    return async (ctx: Context, next: Next): Promise<void> => {
        const authHeader = ctx.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedError('No token provided');
        }

        const token = authHeader.substring(7);

        try {
            const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
            ctx.state.user = {
                id: decoded.userId,
                role: decoded.role
            };

            // 角色检查
            if (requiredRole && !requiredRole.includes(decoded.role)) {
                throw new ForbiddenError('Insufficient permissions');
            }

            await next();
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                throw new UnauthorizedError('Token has expired');
            }
            if (err instanceof jwt.JsonWebTokenError) {
                throw new UnauthorizedError('Invalid token');
            }
            throw err;
        }
    };
}

// 可选认证（不强制要求 token）
export function optionalAuth(): (ctx: Context, next: Next) => Promise<void> {
    return async (ctx: Context, next: Next): Promise<void> => {
        const authHeader = ctx.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            try {
                const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
                ctx.state.user = {
                    id: decoded.userId,
                    role: decoded.role
                };
            } catch {
                // Token 无效但继续执行
            }
        }

        await next();
    };
}

// ==================== controllers/userController.ts ====================
import { Context } from 'koa';
import { ResponseHelper } from '../utils/response';
import { NotFoundError } from '../types/errors';
import * as userService from '../services/userService';

class UserController {
    async getUsers(ctx: Context): Promise<void> {
        const { page = '1', limit = '10', search } = ctx.query;

        const result = await userService.getUsers({
            page: parseInt(page as string),
            limit: parseInt(limit as string),
            search: search as string
        });

        ResponseHelper.paginated(
            ctx,
            result.users,
            result.page,
            result.limit,
            result.total
        );
    }

    async getUserById(ctx: Context): Promise<void> {
        const { id } = ctx.params;
        const user = await userService.getUserById(id);

        if (!user) {
            throw new NotFoundError('User');
        }

        ResponseHelper.success(ctx, user);
    }

    async createUser(ctx: Context): Promise<void> {
        const userData = ctx.request.body;
        const user = await userService.createUser(userData);

        ResponseHelper.created(ctx, user, `/api/v1/users/${user.id}`);
    }

    async updateUser(ctx: Context): Promise<void> {
        const { id } = ctx.params;
        const updateData = ctx.request.body;
        const user = await userService.updateUser(id, updateData);

        ResponseHelper.success(ctx, user, 'User updated successfully');
    }

    async deleteUser(ctx: Context): Promise<void> {
        const { id } = ctx.params;
        await userService.deleteUser(id);

        ResponseHelper.noContent(ctx);
    }
}

export default new UserController();

// ==================== routes/userRoutes.ts ====================
import Router from '@koa/router';
import userController from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = new Router({ prefix: '/users' });

// 所有路由都需要认证
router.use(auth());

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.del('/:id', userController.deleteUser);

export default router;

// ==================== app.ts ====================
import Koa from 'koa';
import koaBody from 'koa-body';
import koaJson from 'koa-json';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import compress from 'koa-compress';
import ratelimit from 'koa-ratelimit';
import Redis from 'ioredis';

import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import config from './config';

const app = new Koa();

// ==================== 基础中间件 ====================
app.use(errorHandler);  // 错误处理必须在最前面
app.use(koaBody({ multipart: true, formidable: { maxFileSize: 10 * 1024 * 1024 } }));
app.use(koaJson({ pretty: false, param: 'pretty' }));
app.use(cors({ origin: '*', allowMethods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(helmet());
app.use(compress());

// ==================== 限流中间件 ====================
const redisClient = new Redis(config.redis.url);
app.use(ratelimit({
    db: redisClient,
    duration: 60000,  // 1分钟
    max: 100,  // 最多100个请求
    id: (ctx) => ctx.ip,
    headers: {
        remaining: 'X-RateLimit-Remaining',
        reset: 'X-RateLimit-Reset',
        total: 'X-RateLimit-Total'
    },
    errorMessage: { success: false, message: 'Rate limit exceeded' }
}));

// ==================== 请求ID中间件 ====================
app.use(async (ctx, next) => {
    ctx.state.requestId = generateRequestId();
    ctx.set('X-Request-ID', ctx.state.requestId);
    ctx.state.startTime = Date.now();
    
    await next();
    
    const duration = Date.now() - ctx.state.startTime!;
    ctx.set('X-Response-Time', `${duration}ms`);
});

function generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ==================== 路由注册 ====================
app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

// ==================== 健康检查 ====================
router.get('/health', (ctx) => {
    ctx.body = {
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv
    };
});

// ==================== 404处理 ====================
app.use(async (ctx) => {
    ctx.status = 404;
    ctx.body = {
        success: false,
        message: `Route ${ctx.method} ${ctx.path} not found`,
        code: 'NOT_FOUND'
    };
});

export default app;

// ==================== server.ts ====================
import app from './app';
import config from './config';

const server = app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port}`);
    console.log(`📚 Environment: ${config.nodeEnv}`);
});

// 优雅关闭
const shutdown = () => {
    console.log('\n🛑 Shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
    
    setTimeout(() => {
        console.error('❌ Forced shutdown');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
```

---

## 本章要点速查

---

# 第11章：安全与鉴权

## 📚 本章学习目标

- 掌握 **JWT (JSON Web Token)** 的原理和完整实现
- 理解 **认证 vs 授权** 的区别和最佳实践
- 学会 **常见安全威胁** 的防护措施
- 掌握 **OAuth 2.0** 和 **Session** 认证方案

---

## 11.1 JWT 鉴权完整实现

### 11.1.1 JWT 结构解析

**JSON Web Token (JWT)** 是一种开放标准 (RFC 7519)，用于在各方之间以 JSON 对象的形式安全地传输信息。

#### JWT 组成结构

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
└─────────────────┘ └───────────────────────────────┘ └──────────────────────────────┘
       Header                  Payload                      Signature
   (Base64URL)              (Base64URL)                   (HMACSHA256)
```

| 部分 | 内容 | 说明 |
|------|------|------|
| **Header** | `{"alg":"HS256","typ":"JWT"}` | 算法和令牌类型 |
| **Payload** | `{"sub":"1234567890","name":"John Doe"}` | 声明数据（用户信息、过期时间等） |
| **Signature** | 签名结果 | 用于验证消息未被篡改 |

### 11.1.2 图表3：JWT 鉴权完整流程图

以下是 JWT 认证的完整生命周期，包括登录、请求和刷新流程：

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server(Express)
    participant DB as Database
    participant R as Redis(可选)
    
    Note over C,S: 1. 登录获取 Token
    C->>S: POST /api/login {username, password}
    S->>DB: 查询用户 + 验证密码(bcrypt)
    DB-->>S: 用户信息
    S->>S: 生成 JWT {userId, role, exp}
    S-->>C: Access Token (AT) <br/>Refresh Token (RT)
    
    Note over C,S: 2. 携带 Token 请求 API
    C->>S: GET /api/user Authorization: Bearer AT
    S->>S: 验证 AT (签名+过期时间)
    S-->>C: 返回用户数据 ✅
    
    Note over C,S: 3. AT 过期 → 用 RT 刷新
    C->>S: POST /api/refresh {RT}
    S->>R: 验证 RT 是否有效/未撤销
    R-->>S: RT 有效
    S->>S: 签发新的 AT + RT
    S-->>C: 新 AT + 新 RT
```

**流程说明**：
1. **登录阶段**：用户提交凭证 → 服务端验证 → 签发 Access Token + Refresh Token
2. **请求阶段**：客户端携带 AT 请求 API → 服务端验证签名和过期时间 → 返回数据
3. **刷新阶段**：AT 过期后使用 RT 获取新的 token 对 → 实现**无感续期**

### 11.1.3 JWT 完整代码实现

```javascript
/**
 * JWT 鉴权完整实现
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// ==================== 配置 ====================
const JWT_CONFIG = {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'access-secret-key-min-32-chars',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key-min-32-chars',
    accessExpiresIn: '15m',      // Access Token 有效期：15分钟
    refreshExpiresIn: '7d',     // Refresh Token 有效期：7天
    algorithm: 'HS256'
};

// ==================== 工具函数 ====================
class JwtService {
    
    /**
     * 生成 Access Token
     */
    static generateAccessToken(user) {
        return jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
                type: 'access'
            },
            JWT_CONFIG.accessSecret,
            { 
                expiresIn: JWT_CONFIG.accessExpiresIn,
                algorithm: JWT_CONFIG.algorithm 
            }
        );
    }
    
    /**
     * 生成 Refresh Token
     */
    static generateRefreshToken(user) {
        const tokenId = crypto.randomBytes(32).toString('hex');
        
        const token = jwt.sign(
            {
                userId: user.id,
                tokenId,  // 用于撤销特定 token
                type: 'refresh'
            },
            JWT_CONFIG.refreshSecret,
            { 
                expiresIn: JWT_CONFIG.refreshExpiresIn,
                algorithm: JWT_CONFIG.algorithm 
            }
        );
        
        // 在实际应用中，应该将 refreshToken 存储到数据库或 Redis
        // await Redis.set(`refresh:${tokenId}`, user.id, 'EX', 7 * 24 * 3600);
        
        return { token, tokenId };
    }
    
    /**
     * 验证 Access Token
     */
    static verifyAccessToken(token) {
        try {
            const decoded = jwt.verify(token, JWT_CONFIG.accessSecret);
            
            if (decoded.type !== 'access') {
                throw new Error('Invalid token type');
            }
            
            return { valid: true, decoded };
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return { valid: false, error: 'TOKEN_EXPIRED', message: 'Access token has expired' };
            }
            if (error.name === 'JsonWebTokenError') {
                return { valid: false, error: 'INVALID_TOKEN', message: 'Invalid access token' };
            }
            return { valid: false, error: 'UNKNOWN_ERROR', message: error.message };
        }
    }
    
    /**
     * 验证 Refresh Token
     */
    static verifyRefreshToken(token) {
        try {
            const decoded = jwt.verify(token, JWT_CONFIG.refreshSecret);
            
            if (decoded.type !== 'refresh') {
                throw new Error('Invalid token type');
            }
            
            // 检查 token 是否被撤销（从数据库/Redis查询）
            // const isRevoked = await Redis.exists(`refresh:${decoded.tokenId}`);
            // if (isRevoked) {
            //     throw new Error('Token has been revoked');
            // }
            
            return { valid: true, decoded };
        } catch (error) {
            return { valid: false, error: error.name, message: error.message };
        }
    }
    
    /**
     * 刷新 Token 对
     */
    static async refreshTokens(refreshToken, userService) {
        const result = this.verifyRefreshToken(refreshToken);
        
        if (!result.valid) {
            throw new Error('Invalid or expired refresh token');
        }
        
        const { userId } = result.decoded;
        const user = await userService.findById(userId);
        
        if (!user || !user.isActive) {
            throw new Error('User not found or inactive');
        }
        
        // 生成新的 token 对
        const newAccessToken = this.generateAccessToken(user);
        const { token: newRefreshToken, tokenId } = this.generateRefreshToken(user);
        
        // 撤销旧的 refresh token（可选）
        // await Redis.del(`refresh:${oldTokenId}`);
        
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
}

// ==================== Express 中间件实现 ====================
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            code: 'AUTH_REQUIRED',
            message: 'Authorization header with Bearer token is required'
        });
    }
    
    const token = authHeader.substring(7);
    const result = JwtService.verifyAccessToken(token);
    
    if (!result.valid) {
        return res.status(401).json({
            success: false,
            code: result.error,
            message: result.message
        });
    }
    
    // 将用户信息附加到请求对象
    req.user = result.decoded;
    next();
}

// 可选角色检查中间件
function requireRole(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                code: 'FORBIDDEN',
                message: 'Insufficient permissions'
            });
        }
        
        next();
    };
}

// ==================== 路由实现示例 ====================
const express = require('express');
const router = express.Router();

// 登录路由
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // 1. 查找用户
        const user = await User.findOne({ 
            $or: [{ email: username }, { username }] 
        });
        
        if (!user) {
            return res.status(401).json({
                success: false,
                code: 'INVALID_CREDENTIALS',
                message: 'Invalid username or password'
            });
        }
        
        // 2. 验证密码（bcrypt）
        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        
        if (!isValidPassword) {
            // 安全建议：使用通用错误消息，不区分用户不存在和密码错误
            return res.status(401).json({
                success: false,
                code: 'INVALID_CREDENTIALS',
                message: 'Invalid username or password'
            });
        }
        
        // 3. 检查用户状态
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                code: 'ACCOUNT_DISABLED',
                message: 'Account has been disabled'
            });
        }
        
        // 4. 更新最后登录时间
        user.lastLoginAt = new Date();
        await user.save();
        
        // 5. 生成 token 对
        const accessToken = JwtService.generateAccessToken(user);
        const { token: refreshToken } = JwtService.generateRefreshToken(user);
        
        // 6. 返回响应
        res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                },
                tokens: {
                    accessToken,
                    refreshToken,
                    expiresIn: 15 * 60  // 秒
                }
            },
            message: 'Login successful'
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// 刷新 token 路由
router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                code: 'REFRESH_TOKEN_REQUIRED',
                message: 'Refresh token is required'
            });
        }
        
        const tokens = await JwtService.refreshTokens(refreshToken, userService);
        
        res.json({
            success: true,
            data: {
                ...tokens,
                expiresIn: 15 * 60
            },
            message: 'Tokens refreshed successfully'
        });
        
    } catch (error) {
        res.status(401).json({
            success: false,
            code: 'REFRESH_FAILED',
            message: error.message
        });
    }
});

// 登出路由（撤销 refresh token）
router.post('/logout', authMiddleware, async (req, res) => {
    try {
        // 在实际应用中，将 refresh token 加入黑名单
        // const refreshToken = req.body.refreshToken;
        // await Redis.del(`refresh:${tokenId}`);
        
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Logout failed'
        });
    }
});

module.exports = { router, authMiddleware, requireRole, JwtService };
```

### 11.1.4 JWT 最佳实践和安全建议

```javascript
/**
 * JWT 安全最佳实践清单
 */

// ✅ 1. 使用强密钥（至少256位随机字符串）
const secretKey = crypto.randomBytes(32).toString('hex');  // 64字符的十六进制字符串

// ✅ 2. 设置合理的过期时间
// - Access Token: 短有效期（15分钟 - 1小时）
// - Refresh Token: 较长有效期（7天 - 30天），但可撤销

// ✅ 3. 使用 HTTPS 传输
// 绝不在 HTTP 中传输 token

// ✅ 4. 敏感操作需要二次验证
async function sensitiveAction(req, res, next) {
    // 对于修改密码、支付等敏感操作，要求重新输入密码
    const { currentPassword } = req.body;
    
    const isValid = await bcrypt.compare(currentPassword, req.user.passwordHash);
    if (!isValid) {
        return res.status(403).json({ message: 'Password verification required' });
    }
    
    next();
}

// ✅ 5. Token 黑名单机制（用于强制登出）
class TokenBlacklist {
    constructor(redisClient) {
        this.redis = redisClient;
    }
    
    async add(token, ttl) {
        // 使用 token 的 jti (JWT ID) 作为 key
        const decoded = jwt.decode(token);
        await this.redis.setex(`blacklist:${decoded.jti}`, ttl, '1');
    }
    
    async isBlacklisted(token) {
        const decoded = jwt.decode(token);
        return await this.redis.exists(`blacklist:${decoded.jti}`);
    }
}

// ✅ 6. 不要在 Payload 中存储敏感信息
// ❌ 错误：存储密码哈希
jwt.sign({ passwordHash: '...' }, secret);

// ✅ 正确：只存储必要的信息
jwt.sign({ userId: '123', role: 'admin' }, secret);

// ✅ 7. 实现 Token 刷新策略
// 当 Access Token 即将过期时（如剩余 < 5分钟），自动刷新
function shouldRefreshToken(decoded) {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = decoded.exp - now;
    return timeLeft < 300;  // 剩余不足5分钟时刷新
}
```

---

## 本章要点速查

---

# 第14章：部署与运维

## 📚 本章学习目标

- 掌握 **PM2** 进程管理和生产环境配置
- 学会 **Docker 容器化** 部署的最佳实践
- 理解 **Nginx 反向代理** 配置和性能优化
- 掌握 **CI/CD 自动化部署** 流程

---

## 14.1 PM2 生产环境配置

### 14.1.1 PM2 简介

**PM2** 是 Node.js 应用的生产环境进程管理器，具有自动重启、负载均衡、日志管理、监控等功能。

### 14.1.2 ecosystem.config.js 完整配置示例

```javascript
/**
 * PM2 Ecosystem Configuration
 * 文件名: ecosystem.config.js
 */

module.exports = {
    // ==================== 应用配置 ====================
    apps: [
        {
            name: 'api-server',                    // 应用名称
            script: './src/server.js',             // 入口文件
            
            // ==================== 实例数量 ====================
            instances: 'max',                      // 'max' 或具体数字
            exec_mode: 'cluster',                  // cluster 模式（多进程）
            
            // ==================== 自动重启 ====================
            watch: false,                          // 生产环境不建议开启 watch
            ignore_watch: [                        // 忽略的目录
                'node_modules',
                'logs',
                '.git'
            ],
            
            max_memory_restart: '512M',             // 内存超过 512MB 时重启
            
            // ==================== 环境变量 ====================
            env: {
                NODE_ENV: 'development',
                PORT: 3000,
                DB_HOST: 'localhost',
                DB_NAME: 'myapp_dev',
                LOG_LEVEL: 'debug'
            },
            
            env_production: {
                NODE_ENV: 'production',
                PORT: 3000,
                DB_HOST: process.env.DB_HOST || 'prod-mongodb',
                DB_NAME: 'myapp_prod',
                LOG_LEVEL: 'info',
                JWT_SECRET: process.env.JWT_SECRET,
                REDIS_URL: process.env.REDIS_URL
            },
            
            env_staging: {
                NODE_ENV: 'staging',
                PORT: 3000,
                DB_HOST: 'staging-mongodb',
                DB_NAME: 'myapp_staging',
                LOG_LEVEL: 'warn'
            },
            
            // ==================== 日志配置 ====================
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            error_file: './logs/error.log',        // 错误日志路径
            out_file: './logs/out.log',            // 输出日志路径
            merge_logs: true,                       // 合并所有实例的日志
            
            // 日志轮转配置（需要 pm2-logrotate 插件）
            log_rotate: {
                workerInterval: '30s',             // 轮询间隔
                rotateModule: true,                // 启用轮转
                maxSize: '10M',                    // 单个日志最大大小
                retain: 30,                         // 保留的日志文件数
                dateFormat: 'YYYY-MM-DD_HH-mm-ss'   // 日志文件命名格式
            },
            
            // ==================== 性能监控 ====================
            max_restarts: 10,                       // 最大重启次数
            min_uptime: '10s',                     // 最小运行时间
            restart_delay: 4000,                   // 重启延迟 (ms)
            
            // ==================== 源码映射支持 ====================
            source_map_support: true,
            
            // ==================== 其他选项 ====================
            node_args: '--max-old-space-size=512',  // V8 引擎参数
            wait_ready: true,                       // 等待 ready 信号
            listen_timeout: 10000,                  // 监听超时时间
            
            // ==================== 部署配置（可选）====================
            deploy: {
                production: {
                    user: 'node',
                    host: '192.168.1.10',
                    ref: 'origin/main',
                    repo: 'git@github.com:user/myapp.git',
                    path: '/var/www/myapp',
                    'pre-deploy': 'git fetch --all',
                    'post-deploy': 
                        'npm install && ' +
                        'npm run build && ' +
                        'pm2 reload ecosystem.config.js --env production',
                    env: {
                        NODE_ENV: 'production'
                    }
                }
            }
        }
    ],
    
    // ==================== 部署配置 ====================
    deploy: {
        production: {
            user: 'deploy',
            host: ['192.168.1.10', '192.168.1.11'],  // 多服务器
            ref: 'origin/main',
            repo: 'https://github.com/user/myapp.git',
            path: '/var/www/production',
            'pre-setup': 'apt-get install git || yum install git',
            'post-setup': 
                'source ~/.nvm/nvm.sh && ' +
                'nvm install 18 && nvm use 18',
            'pre-deploy': 'git fetch --all',
            'deploy': 
                'source ~/.nvm/nvm.sh && ' +
                'nvm use 18 && ' +
                'npm ci --production=false && ' +
                'npm run build',
            'post-deploy': 
                'pm2 reload ecosystem.config.js --env production && ' +
                'pm2 save',
            env: {
                NODE_ENV: 'production'
            }
        }
    }
};
```

### 14.1.3 PM2 常用命令速查

```bash
# ==================== 基本操作 ====================
pm2 start server.js              # 启动应用
pm2 start ecosystem.config.js     # 使用配置文件启动
pm2 stop all                      # 停止所有应用
pm2 stop api-server               # 停止指定应用
pm2 restart all                   # 重启所有应用
pm2 reload all                    # 平滑重启（零停机）
pm2 delete all                    # 删除所有应用

# ==================== 监控和日志 ====================
pm2 list                          # 列出所有应用
pm2 show api-server               # 查看应用详情
pm2 logs                          # 查看所有日志
pm2 logs api-server               # 查看指定应用日志
pm2 logs --lines 200              # 显示最近200行日志
pm2 monit                          # 打开监控面板

# ==================== 集群模式 ====================
pm2 start server.js -i max         # 根据CPU核心数启动实例
pm2 start server.js -i 4           # 启动4个实例
pm2 reload all                    # 零停机重载

# ==================== 保存和开机自启 ====================
pm2 save                          # 保存当前进程列表
pm2 startup                       # 生成开机自启脚本
pm2 unstartup                     # 移除开机自启

# ==================== 其他实用功能 ====================
pm2 describe <id>                 # 详细信息
pm2 reset <id>                    # 重置计数器
pm2 flush                         # 清空日志
pm2 updatePM2                     # 更新 PM2 本身
```

---

## 14.2 Docker 多阶段构建最佳实践

### 14.2.1 Dockerfile 多阶段构建

```dockerfile
# ========================================
# 阶段1: 基础依赖安装
# ========================================
FROM node:18-alpine AS base

# 安装必要的系统依赖
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    tzdata \
    curl \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone

# 设置工作目录
WORKDIR /app

# ========================================
# 阶段2: 依赖安装
# ========================================
FROM base AS deps

# 复制 package 文件
COPY package.json package-lock.json* ./

# 安装生产依赖（使用 npm ci 保证一致性）
RUN npm ci --only=production && npm cache clean --force

# 开发依赖（用于构建）
FROM base AS build-deps
COPY package.json package-lock.json* ./
RUN npm ci

# ========================================
# 阶段3: 构建阶段
# ========================================
FROM build-deps AS builder

# 复制源代码
COPY . .

# 设置构建环境变量
ENV NODE_ENV=production

# 运行构建脚本
RUN npm run build

# ========================================
# 阶段4: 生产镜像（最终镜像）
# ========================================
FROM node:18-alpine AS runner

# 创建非 root 用户
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 安装 dumb-init（正确的 PID 1 进程）
RUN apk add --no-cache dumb-init

# 设置工作目录
WORKDIR /app

# 从依赖阶段复制 node_modules
COPY --from=deps /app/node_modules ./node_modules

# 从构建阶段复制构建产物
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# 如果有静态资源，单独复制
# COPY --from=builder /app/public ./public

# 切换到非 root 用户
USER appuser

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# 设置环境变量
ENV NODE_ENV=production \
    PORT=3000

# 使用 dumb-init 作为入口点
ENTRYPOINT ["dumb-init", "--"]

# 启动命令
CMD ["node", "dist/server.js"]
```

### 14.2.2 docker-compose.yml 示例

```yaml
version: '3.8'

services:
  # ==================== API 服务 ====================
  api:
    build:
      context: .
      dockerfile: Dockerfile
      target: runner
    container_name: myapp-api
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=${NODE_ENV:-production}
      - PORT=3000
      - DB_HOST=mongodb
      - DB_PORT=27017
      - DB_NAME=myapp
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
      - LOG_LEVEL=info
    depends_on:
      mongodb:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./logs:/app/logs
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"

  # ==================== MongoDB ====================
  mongodb:
    image: mongo:6
    container_name: myapp-mongo
    restart: always
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_USER:-admin}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD:-password123}
      - MONGO_INITDB_DATABASE=myapp
    volumes:
      - mongodb_data:/data/db
      - ./mongo-init:/docker-entrypoint-initdb.d
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5

  # ==================== Redis ====================
  redis:
    image: redis:7-alpine
    container_name: myapp-redis
    restart: always
    ports:
      - "6379:6379"
    command: >
      redis-server
      --maxmemory 128mb
      --maxmemory-policy allkeys-lru
      --appendonly yes
      --appendfsync everysec
    volumes:
      - redis_data:/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mongodb_data:
    driver: local
  redis_data:
    driver: local

networks:
  app-network:
    driver: bridge
```

### 14.2.3 .dockerignore 配置

```
node_modules
npm-debug.log
Dockerfile
.dockerignore
.git
.gitignore
.env
.env.local
.env.*.local
coverage
.nyc_output
logs
*.log
README.md
.vscode
.idea
.eslintcache
.tsbuildinfo
dist
build
```

---

## 14.3 Nginx 完整配置示例

### 14.3.1 Nginx 主配置文件

```nginx
# ========================================
# /etc/nginx/nginx.conf
# Nginx 全局配置
# ========================================

# 运行用户
user nginx;

# 工作进程数（通常设置为 CPU 核心数）
worker_processes auto;

# 错误日志路径和级别
error_log /var/log/nginx/error.log warn;

# PID 文件位置
pid /var/run/nginx.pid;

# 工作连接数
events {
    worker_connections 2048;
    use epoll;
    multi_accept on;
}

http {
    # ==================== 基础设置 ====================
    
    # 包含 MIME 类型定义
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # 日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for" '
                    'rt=$request_time';
    
    access_log /var/log/nginx/access.log main;
    
    # ==================== 性能优化 ====================
    
    # 高效文件传输
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    
    # 连接超时设置
    keepalive_timeout 65;
    client_header_timeout 15;
    client_body_timeout 15;
    send_timeout 25;
    
    # 请求体大小限制
    client_max_body_size 20m;
    
    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
    
    # ==================== 安全头 ====================
    
    # 隐藏版本号
    server_tokens off;
    
    # ==================== 限流配置 ====================
    
    limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=3r/m;
    limit_conn_zone $binary_remote_addr zone=connlimit:10m;
    
    # ==================== 上游服务器（Node.js 应用）====================
    
    upstream node_backend {
        least_conn;  # 最少连接算法
        
        server 127.0.0.1:3000 weight=5 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:3001 weight=5 max_fails=3 fail_timeout=30s;
        
        keepalive 32;  # 保持长连接
    }
    
    # ==================== 包含站点配置 ====================
    include /etc/nginx/conf.d/*.conf;
}
```

### 14.3.2 站点配置文件（反向代理 + SSL）

```nginx
# ========================================
# /etc/nginx/conf.d/myapp.conf
# Node.js 应用反向代理配置
# ========================================

# HTTP → HTTPS 重定向
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;
    
    # Let's Encrypt 验证
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS 主配置
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com www.example.com;
    
    # ==================== SSL/TLS 配置 ====================
    
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    
    # SSL 协议和加密套件
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # SSL 会话缓存
    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;
    
    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;
    
    # HSTS（HTTP 严格传输安全）
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    
    # ==================== 安全头 ====================
    
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    
    # ==================== 日志 ====================
    
    access_log /var/log/nginx/myapp_access.log main;
    error_log /var/log/nginx/myapp_error.log warn;
    
    # ==================== 根路由（API 反向代理）====================
    
    location / {
        # 限流
        limit_req zone=general burst=20 nodelay;
        limit_conn connlimit 20;
        
        # 代理到 Node.js 后端
        proxy_pass http://node_backend;
        
        # 代理头设置
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Request-ID $request_id;
        
        # WebSocket 支持
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # 缓冲设置
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
        proxy_busy_buffers_size 8k;
    }
    
    # ==================== 登录接口特殊限流 ====================
    
    location /api/login {
        limit_req zone=login burst=5 nodelay;
        limit_req_status 429;
        
        proxy_pass http://node_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # ==================== 静态资源 ====================
    
    location /static/ {
        alias /var/www/myapp/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
        
        # 防止执行脚本
        location ~* \.(php|py|sh|pl)$ {
            deny all;
        }
    }
    
    # ==================== 健康检查端点 ====================
    
    location /health {
        proxy_pass http://node_backend;
        access_log off;
    }
    
    # ==================== 错误页面 ====================
    
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
    
    # 自定义错误响应（JSON 格式）
    error_page 429 = @rate_limited;
    location @rate_limited {
        default_type application/json;
        return 429 '{"success":false,"message":"Too many requests","code":"RATE_LIMITED"}';
    }
}

# WebSocket 升级配置（如需要）
server {
    listen 443 ssl http2;
    server_name ws.example.com;
    
    ssl_certificate /etc/letsencrypt/live/ws.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ws.example.com/privkey.pem;
    
    location / {
        proxy_pass http://node_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}
```

### 14.3.3 Nginx 优化建议

```bash
# ==================== 系统级优化 ====================

# 编辑 /etc/sysctl.conf
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_tw_reuse = 1
net.core.netdev_max_backlog = 65535

# 应用配置
sudo sysctl -p

# ==================== 文件描述符限制 ====================

# 编辑 /etc/security/limits.conf
* soft nofile 65535
* hard nofile 65535

# Nginx 配置中添加
worker_rlimit_nofile 65535;
```

---

## 14.4 GitHub Actions CI/CD 流水线

### 14.4.1 完整 CI/CD 配置文件

```yaml
# ========================================
# .github/workflows/ci-cd.yml
# GitHub Actions CI/CD 流水线
# ========================================

name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
    
env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # ==================== Job 1: 代码质量检查 ====================
  lint-and-test:
    name: Lint & Test
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    services:
      mongodb:
        image: mongo:6
        ports:
          - 27017:27017
        options: >-
          --health-cmd "mongosh --eval 'db.adminCommand(\"ping\")'"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Check code formatting
        run: npm run format:check
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run unit tests
        run: npm run test:unit
        env:
          NODE_ENV: test
          DB_HOST: localhost
          DB_PORT: 27017
          DB_NAME: test_db
          REDIS_URL: redis://localhost:6379
          JWT_SECRET: test-secret-key-for-testing-only
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          NODE_ENV: test
          DB_HOST: localhost
          DB_PORT: 27017
          DB_NAME: test_db_integration
          REDIS_URL: redis://localhost:6379
      
      - name: Upload coverage report
        if: matrix.node-version == 18
        uses: actions/upload-artifact@v3
        with:
          name: coverage-report
          path: coverage/
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results-${{ matrix.node-version }}
          path: test-results/

  # ==================== Job 2: 构建 Docker 镜像 ====================
  build:
    name: Build Docker Image
    runs-on: ubuntu-latest
    needs: lint-and-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    
    permissions:
      contents: read
      packages: write
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=
            type=ref,event=branch
            type=semver,pattern={{version}}
            type=raw,value=latest,enable={{is_default_branch}}
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
  
  # ==================== Job 3: 部署到 Staging ====================
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/develop'
    environment: staging
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Deploy to staging server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.STAGING_HOST }}
          username: ${{ secrets.STAGING_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/staging/myapp
            git pull origin develop
            docker-compose pull
            docker-compose up -d --remove-orphans
            docker system prune -f
      
      - name: Run health checks
        run: |
          sleep 30
          curl -f https://staging.example.com/health || exit 1
      
      - name: Notify deployment
        if: success()
        uses: slackapi/slack-github-action@v1.24.0
        with:
          payload: |
            {
              "text": "✅ Staging Deployment Successful",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Staging Deploy* ✅\nBranch: `${{ github.head_ref }}`\nCommit: `${{ github.sha }}`"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_STAGING }}

  # ==================== Job 4: 部署到 Production ====================
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    environment: production
    
    concurrency:
      group: production
      cancel-in-progress: false
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Create deployment backup
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PRODUCTION_HOST }}
          username: ${{ secrets.PRODUCTION_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            BACKUP_DIR="/backups/$(date +%Y%m%d_%H%M%S)"
            mkdir -p $BACKUP_DIR
            cp -r /var/www/production/myapp/.env $BACKUP_DIR/
            docker exec myapp-api mongodump --archive=$BACKUP_DIR/mongo_backup.gz
            echo "Backup created at $BACKUP_DIR"
      
      - name: Deploy to production
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PRODUCTION_HOST }}
          username: ${{ secrets.PRODUCTION_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            set -e  # 遇到错误立即退出
            
            echo "🔄 Pulling latest changes..."
            cd /var/www/production/myapp
            git pull origin main
            
            echo "📦 Pulling new Docker images..."
            docker-compose pull
            
            echo "🚀 Rolling deployment..."
            docker-compose up -d --no-deps --build api
            
            echo "⏳ Waiting for health check..."
            sleep 45
            
            echo "✅ Verifying deployment..."
            for i in {1..10}; do
              if curl -sf http://localhost:3000/health > /dev/null; then
                echo "Health check passed!"
                break
              fi
              if [ $i -eq 10 ]; then
                echo "❌ Health check failed! Rolling back..."
                docker-compose rollback
                exit 1
              fi
              sleep 5
            done
            
            echo "🧹 Cleanup old resources..."
            docker image prune -f --filter "until=24h"
            docker volume prune -f
      
      - name: Verify deployment
        run: |
          sleep 30
          response=$(curl -sf https://api.example.com/health)
          echo "Health check response: $response"
          
          status=$(echo $response | jq -r '.status')
          if [ "$status" != "healthy" ]; then
            echo "❌ Health check failed!"
            exit 1
          fi
          echo "✅ Production deployment verified!"
      
      - name: Notify team (Slack)
        if: success()
        uses: slackapi/slack-github-action@v1.24.0
        with:
          payload: |
            {
              "text": "🚀 Production Deployment Successful",
              "blocks": [
                {
                  "type": "header",
                  "text": {
                    "type": "plain_text",
                    "text": "🚀 Production Deploy Success"
                  }
                },
                {
                  "type": "section",
                  "fields": [
                    {"type": "mrkdwn", "text": "*Commit:* `${{ github.sha }}`"},
                    {"type": "mrkdwn", "text": "*Author:* ${{ github.actor }}"},
                    {"type": "mrkdwn", "text": "*Branch:* `main`"},
                    {"type": "mrkdwn", "text": "*Time:* $(date '+%Y-%m-%d %H:%M:%S')"}
                  ]
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_PRODUCTION }}
      
      - name: Notify on failure
        if: failure()
        uses: slackapi/slack-github-action@v1.24.0
        with:
          payload: |
            {
              "text": "❌ Production Deployment Failed",
              "blocks": [
                {
                  "type": "header",
                  "text": {
                    "type": "plain_text",
                    "text": "❌ Production Deploy FAILED"
                  }
                },
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Commit:* `${{ github.sha }}`\n*Author:* ${{ github.actor }}\n*Action:* ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_ALERTS }}

  # ==================== Job 5: 性能测试（可选）====================
  performance-test:
    name: Performance Test
    runs-on: ubuntu-latest
    needs: deploy-staging
    if: github.ref == 'refs/heads/develop'
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install k6
        run: |
          sudo gpg --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D87D77E83886B4C1BAF69
          echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
          sudo apt-get update
          sudo apt-get install k6
      
      - name: Run load tests
        run: k6 run k6/load-test.js --env STAGING_URL=https://staging.example.com
      
      - name: Upload performance results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: performance-results
          path: k6/results/
```

### 14.4.2 GitHub Secrets 配置清单

在 GitHub 仓库的 Settings → Secrets and variables → Actions 中配置：

| Secret 名称 | 说明 | 示例值 |
|-------------|------|--------|
| `STAGING_HOST` | Staging 服务器 IP | `192.168.1.100` |
| `PRODUCTION_HOST` | 生产服务器 IP | `203.0.113.50` |
| `SSH_PRIVATE_KEY` | SSH 私钥 | （完整私钥内容） |
| `SLACK_WEBHOOK_STAGING` | Slack Webhook URL | `https://hooks.slack.com/...` |
| `SLACK_WEBHOOK_PRODUCTION` | Slack Webhook URL | `https://hooks.slack.com/...` |
| `SLACK_WEBHOOK_ALERTS` | 告警频道 Webhook | `https://hooks.slack.com/...` |

---

## 本章要点速查