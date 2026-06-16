# Node.js 面试真题库（2026 版）

> 本题库覆盖 Node.js 核心知识点，从基础概念到架构设计，适用于初中高级面试准备。
> 总计 **50** 道题：基础 15 道 / 进阶 20 道 / 专家 15 道

---

## 目录

- [基础篇 ★☆☆（Q01-Q15）](#基础篇--q01-q15)
- [进阶篇 ★★☆（Q16-Q30）](#进阶篇--q16-q30)
- [专家篇 ★★★（Q31-Q50）](#专家篇--q31-q50)
- [附录](#附录)

---

# 基础篇 ★☆☆（Q01-Q15）

## Q01: Node.js 是什么？它有哪些核心特点？
- **难度**：★☆☆
- **知识点**：Node.js 基础 / 运行时环境 / 特性对比
- **题型**：简答题

### 参考答案要点：

1. **定义与本质**
   - Node.js 是一个基于 **Chrome V8 引擎**的 JavaScript 运行时环境
   - 它让 JavaScript 可以脱离浏览器在服务器端运行
   - 使用 **C++** 编写底层，上层提供 JavaScript API

2. **核心特点**
   - **事件驱动（Event-driven）**：采用事件循环机制处理异步操作
   - **非阻塞 I/O（Non-blocking I/O）**：单线程处理高并发请求，I/O 操作不阻塞主线程
   - **单线程模型**：主线程是单线程的，但通过 libuv 实现多线程 I/O
   - **跨平台**：支持 Windows、macOS、Linux
   - **丰富的生态系统**：npm 拥有全球最大的开源包仓库

3. **适用场景**
   ```javascript
   // 高并发 I/O 密集型应用
   - 实时聊天应用（WebSocket）
   - RESTful API 服务
   - SSR 服务端渲染
   - CLI 命令行工具
   - 流媒体服务
   ```

4. **不适用场景**
   - CPU 密集型任务（如图像处理、视频编码、大数据计算）

> **追问链**：Node.js 的单线程是如何实现高并发的？→ Q05、Q16

---

## Q02: Node.js 的主要应用场景有哪些？请举例说明
- **难度**：★☆☆
- **知识点**：应用场景 / 技术选型 / 实际案例
- **题型**：简答题

### 参考答案要点：

1. **Web 服务端开发**
   - **RESTful API 后端**：Express/Koa/NestJS 构建 API
   - **SSR 服务端渲染**：Next.js/Nuxt.js 的底层运行时
   - **BFF 层（Backend For Frontend）**：聚合多个后端微服务的数据
   
   ```javascript
   // Express 构建 API 示例
   const express = require('express');
   const app = express();

   app.get('/api/users', (req, res) => {
     res.json({ users: [] });
   });

   app.listen(3000);
   ```

2. **实时通信应用**
   - **即时通讯（IM）**：Socket.io 实现实时消息推送
   - **在线协作**：Google Docs 式多人协作编辑
   - **实时数据看板**：股票行情、监控系统大屏

3. **工具与基础设施**
   - **CLI 工具**：Webpack/Vite/ESBuild 等构建工具
   - **自动化脚本**：CI/CD 流水线中的脚本执行
   - **代码生成器**：Vue CLI、Create React App 脚手架

4. **跨平台桌面应用**
   - Electron（VS Code、Slack、Discord）
   - Tauri（更轻量的替代方案）

5. **IoT 与边缘计算**
   - 物联网设备的数据采集和处理
   - 边缘节点的轻量级服务

> **追问链**：为什么选择 Node.js 而不是其他语言？→ Q17、Q35

---

## Q03: CommonJS 和 ES Module 有什么区别？
- **难度**：★☆☆
- **知识点**：模块系统 / CommonJS / ES Module / 规范差异
- **题型**：简答题

### 参考答案要点：

1. **模块规范对比**

| 特性 | CommonJS (CJS) | ES Module (ESM) |
|------|----------------|------------------|
| 关键字 | `require()` / `module.exports` | `import` / `export` |
| 加载时机 | **运行时加载**（动态） | **编译时加载**（静态） |
| 加载方式 | **值拷贝**（复制整个对象） | **值的引用**（只读引用） |
| this 指向 | 当前模块对象 | `undefined` |
| 顶层 await | ❌ 不支持 | ✅ 支持 |
| 循环依赖 | 可能返回未完成的对象 | 已解决（Live Binding） |

2. **代码示例对比**
   ```javascript
   // ========== CommonJS ==========
   // math.js
   module.exports.add = (a, b) => a + b;

   // main.js
   const math = require('./math');
   console.log(math.add(1, 2)); // 3

   // ========== ES Module ==========
   // math.mjs 或 package.json 中 "type": "module"
   export const add = (a, b) => a + b;

   // main.mjs
   import { add } from './math.mjs';
   console.log(add(1, 2)); // 3
   ```

3. **关键区别详解**
   
   **值拷贝 vs 值引用**：
   ```javascript
   // CommonJS - 值拷贝
   // counter.js
   let count = 0;
   module.exports = { count, increment: () => count++ };
   
   // main.js
   const counter = require('./counter');
   counter.increment();
   console.log(counter.count); // 0（仍然是初始值的拷贝！）
   
   // ES Module - 值引用
   // counter.mjs
   export let count = 0;
   export const increment = () => count++;
   
   // main.mjs
   import { count, increment } from './counter.mjs';
   increment();
   console.log(count); // 1（实时获取最新值）
   ```

4. **Node.js 中的混用策略**
   - 在 `package.json` 中设置 `"type": "module"` 启用 ESM
   - ESM 可以导入 CJS（`import pkg from 'lodash'`），反之不行
   - 文件扩展名：`.mjs` 强制 ESM，`.cjs` 强制 CJS

> **追问链**：循环依赖在两种规范下表现有何不同？→ Q23

### 🔍 追问链
1. **require 的缓存机制是怎样的？**
   → 方向：Module._cache 以文件绝对路径为 key；模块只执行一次；delete require.cache 可清除缓存实现热更新；缓存导致单例模式
2. **循环依赖时 exports 为什么是空对象？**
   → 方向：a require b 时 a 未执行完，b 拿到的是 a 此时的 module.exports（初始为 {}）；ESM 用 Live Binding 解决此问题；延迟 require（函数内调用）可规避
3. **ES Module 的 import 与 CommonJS 的 require 有哪些核心区别？**
   → 方向：编译时 vs 运行时加载；值引用 vs 值拷贝；顶层 await 支持；this 指向 undefined vs module；ESM 可以导入 CJS 但反之不行（需动态 import()）

---

## Q04: exports 和 module.exports 有什么区别？
- **难度**：★☆☆
- **知识点**：CommonJS / 模块导出 / 引用关系
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **本质关系**
   ```javascript
   // Node.js 内部初始化时的等价关系：
   const module = { exports: {} };
   const exports = module.exports;  // exports 是 module.exports 的引用
   
   // 最终返回的是：return module.exports;
   ```

2. **关键区别**
   
   ✅ **正确用法 - 给 exports 添加属性**：
   ```javascript
   exports.name = 'Tom';
   exports.age = 18;
   // 等价于 module.exports = { name: 'Tom', age: 18 }
   ```
   
   ❌ **错误用法 - 直接赋值给 exports**：
   ```javascript
   exports = { name: 'Tom' };  // 断开了引用！
   // 此时 module.exports 仍然是 {}
   ```

3. **使用建议**
   ```javascript
   // 方式1：给 exports 添加属性（推荐用于导出多个成员）
   exports.fn1 = function() {};
   exports.fn2 = function() {};

   // 方式2：直接赋值 module.exports（推荐用于导出单一对象/类）
   module.exports = class MyClass {};

   // 方式3：混合使用
   module.exports = {
     fn1,
     fn2,
     config: {}
   };
   ```

4. **面试高频陷阱**
   ```javascript
   // 问题：以下代码导出的是什么？
   exports.a = 1;
   module.exports = { b: 2 };
   exports.c = 3;

   // 答案：{ b: 2 }
   // 解析：module.exports 被重新赋值后，exports 的引用已断开
   ```

> **追问链**：require 的缓存机制如何影响 exports？→ Q05

---

## Q05: require() 的加载机制是怎样的？（从路径解析到缓存）
- **难度**：★☆☆
- **知识点**：模块加载 / 缓存机制 / 路径解析
- **题型**：简答题

### 参考答案要点：

1. **完整加载流程**
   ```
   require(X) 
     ↓
   ① 检查 Module._cache（是否有缓存）
     ↓ (命中则返回缓存)
   ② 判断是否为内置模块（fs/http/path 等）
     ↓ (是 → 直接返回)
   ③ 解析文件路径（X 是相对/绝对路径还是模块名）
     ↓
   ④ 查找文件（依次尝试 .js → .json → .node）
     ↓
   ⑤ 如果是目录，查找 package.json 的 main 字段或 index.js
     ↓
   ⑥ 读取文件内容，包装成函数执行
     ↓
   ⑦ 缓存到 Module._cache，返回 module.exports
   ```

2. **路径解析优先级**
   ```javascript
   // ① 相对路径 ./ 或 ../
   require('./utils');        // 当前目录下的 utils
   require('../config');      // 上级目录的 config

   // ② 绝对路径 / 开头
   require('/home/user/app'); // 绝对路径

   // ③ 核心模块（无需路径）
   require('fs');
   require('http');

   // ④ node_modules 查找（从当前目录向上递归）
   require('express');       // → ./node_modules/express
                           // → ../node_modules/express
                           // → 继续向上直到根目录
   ```

3. **文件扩展名查找顺序**
   ```javascript
   require('./file');
   // 查找顺序：
   // 1. file.js
   // 2. file.json
   // 3. file.node（C++ addon）
   ```

4. **缓存机制**
   ```javascript
   // 每个模块只会被加载和执行一次！
   // 缓存 key 是文件的绝对路径

   // 清除缓存（一般不推荐，仅用于热更新等特殊场景）
   delete require.cache[require.resolve('./module')];

   // 验证缓存
   console.log(require.cache);  // 查看所有已缓存的模块
   ```

5. **实际示例**
   ```javascript
   // counter.js
   console.log('模块被执行了！');
   let count = 0;
   module.exports = () => ++count;

   // main.js
   const getCounter = require('./counter');  // 打印：模块被执行了！
   console.log(getCounter());  // 1
   const getCounter2 = require('./counter'); // 不打印（使用缓存）
   console.log(getCounter2()); // 2（同一个实例！）
   ```

> **追问链**：循环依赖时缓存如何影响结果？→ Q23

---

## Q06: 什么是 Node.js 的事件循环？和浏览器的事件循环有什么区别？
- **难度**：★☆☆
- **知识点**：事件循环 / Event Loop / 浏览器对比 / 异步原理
- **题型**：简答题

### 参考答案要点：

1. **事件循环的本质**
   - Node.js 是**单线程**的，但通过**事件循环**实现非阻塞 I/O
   - 事件循环让 Node.js 可以执行非阻塞 I/O 操作（尽管 JavaScript 是单线程的）
   - 底层由 **libuv** 库实现（C++ 编写的事件循环库）

2. **基本工作流程**
   ```
   ┌───────────────────────────┐
   ┌─>│           定时器         │
   │  │  (setTimeout/setInterval)│
   │  └──────────┬────────────┘
   │  ┌──────────┴────────────┐
   │  │     待回调的 I/O 事件    │
   │  │  (poll 阶段)            │
   │  └──────────┬────────────┘
   │  ┌──────────┴────────────┐
   │  │     setImmediate       │
   │  └──────────┬────────────┘
   │  ┌──────────┴────────────┐
   └──┤     close 回调          │
      └───────────────────────┘
   ```

3. **与浏览器事件循环的核心区别**

| 特性 | 浏览器 Event Loop | Node.js Event Loop |
|------|-------------------|---------------------|
| **规范** | HTML Living Standard | libuv 实现 |
| **宏任务队列** | 只有一个（或按类型分） | 多个阶段（timers/poll/check 等） |
| **微任务** | 每个 macrotask 后清空 | 每个阶段后清空 |
| **渲染相关** | 有（requestAnimationFrame） | 无 |
| **I/O 处理** | 有限 | 完善（文件、网络、DNS 等） |
| **API 差异** | setTimeout/DOM 事件 | fs.readFile/http.createServer 等 |

4. **简单理解**
   ```javascript
   // 同步代码先执行
   console.log('1. 开始');

   // 异步代码放入对应队列
   setTimeout(() => console.log('2. 定时器'), 0);
   fs.readFile(__filename, () => console.log('3. 文件读取'));
   setImmediate(() => console.log('4. setImmediate'));

   console.log('5. 结束');

   // 执行顺序：1 → 5 → （2/4 顺序不确定）→ 3
   ```

> **追问链**：各个阶段的具体执行顺序是什么？→ Q16

### 🔍 追问链
1. **timers 阶段和 check 阶段有什么区别？**
   → 方向：timers 执行 setTimeout/setInterval 回调；check 执行 setImmediate 回调；主模块顶层两者顺序不确定但 I/O 内 setImmediate 一定先于 setTimeout
2. **process.nextTick 微任务的优先级有多高？**
   → 方向：nextTick 优先级高于 Promise 微任务；在每个阶段结束后、进入下一阶段前执行；递归 nextTick 可能饿死事件循环（应使用 setImmediate 替代）
3. **如何在代码中测量事件循环延迟（Event Loop Lag）？**
   → 方向：用 setInterval 测量实际间隔与期望间隔的差值；node:event_loop_lag 库；Prometheus histogram 采集延迟指标；超过阈值触发告警

---

## Q07: EventEmitter 是怎么工作的？有哪些常用方法？
- **难度**：★☆☆
- **知识点**：EventEmitter / 事件驱动 / 发布订阅模式
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **核心概念**
   - EventEmitter 是 Node.js **事件驱动架构**的基础
   - 实现了**发布-订阅模式**（Observer Pattern）
   - 大多数 Node.js 核心 API 都继承自它（stream、http、fs 等）

2. **常用方法**
   ```javascript
   const EventEmitter = require('events');

   class MyEmitter extends EventEmitter {}

   const emitter = new MyEmitter();

   // ① 注册监听器
   emitter.on('event', (data) => {
     console.log('触发事件:', data);
   });

   // ② 注册一次性监听器（触发一次后自动移除）
   emitter.once('init', () => {
     console.log('只执行一次');
   });

   // ③ 手动触发事件
   emitter.emit('event', { message: 'Hello' });
   emitter.emit('init');

   // ④ 移除监听器
   const handler = () => {};
   emitter.on('test', handler);
   emitter.off('test', handler);  // 或 emitter.removeListener()

   // ⑤ 获取监听器数量
   console.log(emitter.listenerCount('event'));

   // ⑥ 获取所有监听器
   console.log(emitter.listeners('event'));
   ```

3. **错误事件处理**
   ```javascript
   const emitter = new EventEmitter();

   // ⚠️ 重要：必须监听 error 事件，否则会抛出异常导致进程崩溃
   emitter.on('error', (err) => {
     console.error('捕获到错误:', err.message);
   });

   emitter.emit('error', new Error('测试错误'));  // 不会崩溃
   ```

4. **实际应用场景**
   ```javascript
   // 场景1：自定义事件总线（组件通信）
   const eventBus = new EventEmitter();

   // 场景2：状态变化通知
   class Store extends EventEmitter {
     setState(newState) {
       this.state = newState;
       this.emit('change', newState);
     }
   }

   // 场景3：流式数据处理
   const Readable = require('stream').Readable;
   // Readable 内置 data/error/close/end 等事件
   ```

5. **注意事项**
   - 默认最大监听器数量为 **10**，超过会警告（可修改 `emitter.setMaxListeners(n)`）
   - 监听器是**按注册顺序同步执行**的
   - `emit()` 会返回布尔值，表示是否有监听器处理该事件

> **追问链**：如何手写一个 EventEmitter？→ Q32

---

## Q08: Promise、async/await 和回调函数的区别和适用场景？
- **难度**：★☆☆
- **知识点**：异步编程 / Promise / async-await / 回调函数
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **三种方式对比**

| 特性 | 回调函数 | Promise | async/await |
|------|----------|---------|-------------|
| **语法** | 传入回调函数 | `.then().catch()` | 同步风格写法 |
| **可读性** | 差（回调地狱） | 好 | **最好** |
| **错误处理** | 每层都要处理 | 集中处理 | try/catch |
| **调试** | 困难（调用栈丢失） | 较好 | **最佳**（同步调用栈） |
| **中间值传递** | 嵌套变深 | 链式调用 | 直接赋值变量 |
| **兼容性** | 所有版本 | Node 6+ | Node 7.6+ |

2. **代码演进示例**
   ```javascript
   // ========== 1. 回调函数（Callback Hell）==========
   fs.readFile('a.txt', 'utf8', (err, dataA) => {
     if (err) return console.error(err);
     fs.readFile(dataA.trim(), 'utf8', (err, dataB) => {
       if (err) return console.error(err);
       fs.readFile(dataB.trim(), 'utf8', (err, dataC) => {
         if (err) return console.error(err);
         console.log(dataC);
       });
     });
   });

   // ========== 2. Promise（链式调用）==========
   readFilePromise('a.txt')
     .then(dataA => readFilePromise(dataA.trim()))
     .then(dataB => readFilePromise(dataB.trim()))
     .then(dataC => console.log(dataC))
     .catch(err => console.error(err));

   // ========== 3. async/await（最佳实践）==========
   async function readFiles() {
     try {
       const dataA = await readFilePromise('a.txt');
       const dataB = await readFilePromise(dataA.trim());
       const dataC = await readFilePromise(dataB.trim());
       console.log(dataC);
     } catch (err) {
       console.error(err);
     }
   }
   ```

3. **适用场景选择**
   ```javascript
   // ✅ 回调函数：简单的一次性异步操作
   setTimeout(() => console.log('done'), 1000);

   // ✅ Promise：需要组合多个异步操作、并发控制
   Promise.all([fetchUser(), fetchPosts()]);
   Promise.race([timeout(), fetchWithRetry()]);

   // ✅ async/await：业务逻辑复杂、需要顺序执行的流程
   async function handleRequest(req, res) {
     const user = await auth(req.token);
     const data = await db.query(user.id);
     res.json(data);
   }
   ```

4. **async/await 注意事项**
   ```javascript
   // ⚠️ 不要忘记 await（常见错误）
   async function badExample() {
     const result = fetchData();  // 忘记 await！result 是 Promise 对象
     console.log(result);         // Promise { <pending> }
   }

   // ⚠️ for...of 中使用 await 是串行的，如需并行用 Promise.all
   async function processItems(items) {
     // ❌ 串行（慢）
     for (const item of items) {
       await process(item);
     }
     
     // ✅ 并行（快）
     await Promise.all(items.map(item => process(item)));
   }
   ```

> **追问链**：如何实现 Promise 并发控制？→ Q33

---

## Q09: 如何处理未捕获的异常？（uncaughtException / unhandledRejection）
- **难度**：★☆☆
- **知识点**：错误处理 / 进程稳定性 / 异常捕获
- **题型**：简答题 + 场景设计题

### 参考答案要点：

1. **两种未捕获异常的区别**
   ```javascript
   // ① uncaughtException - 同步代码抛出的未捕获异常
   process.on('uncaughtException', (err, origin) => {
     console.error('未捕获的异常:', err.message);
     console.error('异常来源:', origin);
     // ⚠️ 这里应该做清理工作然后退出进程
     process.exit(1);
   });

   throw new Error('测试同步异常');

   // ② unhandledRejection - Promise reject 但没有 .catch()
   process.on('unhandledRejection', (reason, promise) => {
     console.error('未处理的 Promise 拒绝:', reason);
   });

   Promise.reject(new Error('测试异步异常'));
   ```

2. **为什么必须谨慎处理 uncaughtException**
   ```javascript
   // ⚠️ 危险做法：捕获后继续运行
   process.on('uncaughtException', (err) => {
     console.error('出错啦:', err);
     // 不退出进程！
   });

   // 问题：应用程序可能处于不确定状态
   // - 可能存在资源泄漏（数据库连接未关闭）
   // - 可能导致后续请求产生不可预期的行为
   // - 内存可能已经损坏
   ```

3. **正确的处理策略**
   ```javascript
   // 推荐方案：记录日志 + 优雅退出
   process.on('uncaughtException', (err) => {
     // 1. 记录错误日志
     logger.error('致命错误:', {
       error: err.message,
       stack: err.stack,
       timestamp: new Date().toISOString()
     });

     // 2. 清理资源（关闭连接等）
     cleanup();

     // 3. 优雅退出（让进程管理器重启服务）
     process.exit(1);
   });

   // 对于 unhandledRejection，可以稍宽松一些
   process.on('unhandledRejection', (reason, promise) => {
     logger.warn('未处理的 Promise rejection:', reason);
     // 不一定立即退出，但要记录并修复代码
   });
   ```

4. **预防措施**
   ```javascript
   // ① 全局错误处理中间件（Express）
   app.use((err, req, res, next) => {
     logger.error(err.stack);
     res.status(500).json({ error: '服务器内部错误' });
   });

   // ② 使用 try-catch 包裹关键逻辑

   // ③ 使用 PM2 等进程管理器自动重启
   // ecosystem.config.js 配置自动重启策略
   ```

> **追问链**：如何设计完善的错误处理体系？→ Q38

### 🔍 追问链
1. **如何处理大文件上传？（Stream 方式避免内存溢出）**
   → 方向：使用 multer + diskStorage 流式写入磁盘；pipe 直接到存储服务（S/OSS）；设置 fileSize 限制配合 stream 检测；前端 FormData + Blob.slice 分片
2. **如何处理高并发请求？（Worker Threads / Cluster）**
   → 方向：Cluster 模式利用多核（os.cpus().length）；Worker Threads 处理 CPU 密集型任务；反向代理（Nginx）负载均衡；连接池控制数据库并发
3. **keep-alive timeout 应该如何合理配置？**
   → 方向：server.keepAliveTimeout 应大于 server.headersTimeout；推荐 keepAliveTimeout=65000ms + headersTimeout=61000ms（Nginx 默认60s超时）；客户端侧也需配置 agent.keepAliveMsecs；防止半连接占用服务器资源

---

## Q10: process.nextTick 和 setImmediate 的区别？
- **难度**：★☆☆
- **知识点**：事件循环 / 微任务 / 宏任务 / 执行顺序
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **核心区别**
   ```javascript
   // process.nextTick - 微任务（microtask）
   // - 在当前操作完成后、进入下一个事件循环阶段之前执行
   // - 属于"微任务"，优先级高于所有宏任务

   // setImmediate - 宏任务（macrotask）
   // - 在 check 阶段执行
   // - 属于"宏任务"，在当前事件循环迭代中执行
   ```

2. **执行顺序对比**
   ```javascript
   console.log('1. 开始');

   process.nextTick(() => {
     console.log('2. nextTick');
   });

   setImmediate(() => {
     console.log('3. setImmediate');
   });

   console.log('4. 结束');

   // 输出顺序：1 → 4 → 2 → 3
   // 解释：
   // 1,4 是同步代码，最先执行
   // nextTick 是微任务，在同步代码之后立即执行
   // setImmediate 是宏任务，在下一次事件循环执行
   ```

3. **嵌套情况对比**
   ```javascript
   // process.nextTick - 递归可能导致饥饿
   process.nextTick(() => {
     console.log('nextTick 1');
     process.nextTick(() => {
       console.log('nextTick 2');
       // 如果持续递归，会阻塞事件循环！
     });
   });

   // setImmediate - 递归会在每次事件循环中执行
   setImmediate(() => {
     console.log('setImmediate 1');
     setImmediate(() => {
       console.log('setImmediate 2');
       // 每次都会让出控制权给其他回调
     });
   });
   ```

4. **使用建议**
   ```javascript
   // ✅ process.nextTick 适用场景：
   // - 需要在事件循环继续之前执行的操作
   // - 确保在用户代码执行前完成初始化
   // - 允许在调用栈解开后处理错误
   function myLib(callback) {
     try {
       // 一些同步操作
     } catch (err) {
       // 使用 nextTick 确保错误在用户代码之后抛出
       process.nextTick(() => callback(err));
     }
   }

   // ✅ setImmediate 适用场景：
   // - 需要执行繁重的计算但不阻塞事件循环
   // - 将大任务拆分成小块执行
   function processLargeArray(array, callback) {
     setImmediate(function self() {
       // 每次处理一小块
       const chunk = array.splice(0, 100);
       processChunk(chunk);
       
       if (array.length > 0) {
         setImmediate(self);  // 让出控制权
       } else {
         callback();
       }
     });
   }
   ```

5. **记忆口诀**
   > **nextTick 更快（微任务），setImmediate 稍慢（宏任务）。递归用 Immediate 避免饥饿。**

> **追问链**：微任务的完整执行时机是什么？→ Q17

---

## Q11: fs 模块的同步和异步方法有什么区别？如何选择？
- **难度**：★☆☆
- **知识点**：文件系统 / 同步异步 / I/O 操作 / 性能影响
- **题型**：简答题

### 参考答案要点：

1. **方法命名规则**
   ```javascript
   const fs = require('fs');
   const fsPromises = require('fs').promises;

   // 同步方法：以 Sync 结尾，阻塞线程
   const data = fs.readFileSync('file.txt', 'utf8');
   console.log(data);

   // 异步方法（回调）：不阻塞线程
   fs.readFile('file.txt', 'utf8', (err, data) => {
     console.log(data);
   });

   // 异步方法（Promise）：推荐使用
   async function read() {
     const data = await fsPromises.readFile('file.txt', 'utf8');
     console.log(data);
   }
   ```

2. **核心区别**

| 特性 | 同步方法 | 异步方法 |
|------|----------|----------|
| **命名** | `readFileSync` | `readFile` |
| **返回值** | 直接返回结果 | 通过回调/Promise 返回 |
| **线程阻塞** | ✅ **阻塞主线程** | ❌ 不阻塞 |
| **性能影响** | 影响整个应用 | 仅影响当前操作 |
| **适用场景** | CLI 工具、启动配置读取 | Web 服务器、高并发场景 |

3. **性能影响演示**
   ```javascript
   // ❌ 错误：在 HTTP 服务器中使用同步方法
   const http = require('http');
   const server = http.createServer((req, res) => {
     // 这个同步读取会阻塞整个事件循环！
     // 其他所有请求都必须等待这个文件读取完成
     const data = fs.readFileSync('/large/file.txt');
     res.end(data);
   });

   // ✅ 正确：使用异步方法
   const server = http.createServer(async (req, res) => {
     try {
       const data = await fsPromises.readFile('/large/file.txt');
       res.end(data);
     } catch (err) {
       res.statusCode = 500;
       res.end('Error');
     }
   });
   ```

4. **选择指南**
   ```javascript
   // ✅ 使用同步方法的场景：
   // 1. 应用启动时读取配置文件
   // 2. CLI 命令行工具（不需要处理并发）
   // 3. 一次性脚本
   const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

   // ✅ 使用异步方法的场景：
   // 1. HTTP 服务器处理请求
   // 2. 同时处理多个文件
   // 3. 任何需要高并发的场景
   async function handleUpload(files) {
     await Promise.all(
       files.map(file => fsPromises.writeFile(file.path, file.content))
     );
   }
   ```

5. **新增的流式 API（Node 10+）**
   ```javascript
   // 对于大文件，使用流式 API 更高效
   const { createReadStream, createWriteStream } = require('fs');

   const readStream = createReadStream('large-file.txt');
   const writeStream = createWriteStream('output.txt');
   
   readStream.pipe(writeStream);
   ```

> **追问链**：如何高效处理大文件？→ Q13、Q42

---

## Q12: 如何创建一个简单的 HTTP 服务器？
- **难度**：★☆☆
- **知识点**：HTTP 模块 / 服务器创建 / 请求响应
- **题型**：编程实践题

### 参考答案要点：

1. **基础版本**
   ```javascript
   const http = require('http');

   // 创建服务器
   const server = http.createServer((req, res) => {
     // req: IncomingMessage（请求对象）
     // res: ServerResponse（响应对象）

     console.log(`${req.method} ${req.url}`);  // GET /

     // 设置响应头
     res.writeHead(200, {
       'Content-Type': 'application/json; charset=utf-8',
       'Access-Control-Allow-Origin': '*'
     });

     // 发送响应体
     res.end(JSON.stringify({
       message: 'Hello Node.js!',
       method: req.method,
       url: req.url
     }));
   });

   // 监听端口
   const PORT = 3000;
   server.listen(PORT, () => {
     console.log(`服务器运行在 http://localhost:${PORT}`);
   });
   ```

2. **增强版：支持路由和静态文件**
   ```javascript
   const http = require('http');
   const fs = require('fs');
   const path = require('path');

   const server = http.createServer((req, res) => {
     const url = req.url;

     // API 路由
     if (url === '/api/users' && req.method === 'GET') {
       res.writeHead(200, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify([
         { id: 1, name: '张三' },
         { id: 2, name: '李四' }
       ]));
     }
     // 静态文件服务
     else if (url.startsWith('/public/')) {
       const filePath = path.join(__dirname, url);
       fs.readFile(filePath, (err, data) => {
         if (err) {
           res.writeHead(404);
           res.end('Not Found');
         } else {
           const ext = path.extname(filePath);
           const contentTypes = {
             '.html': 'text/html',
             '.css': 'text/css',
             '.js': 'application/javascript',
             '.png': 'image/png'
           };
           res.writeHead(200, {
             'Content-Type': contentTypes[ext] || 'text/plain'
           });
           res.end(data);
         }
       });
     }
     else {
       res.writeHead(404);
       res.end('Page Not Found');
     }
   });

   server.listen(3000);
   ```

3. **生产级考虑点**
   ```javascript
   // ① 错误处理
   server.on('error', (err) => {
     if (err.code === 'EADDRINUSE') {
       console.error(`端口 ${PORT} 已被占用`);
     }
   });

   // ② 超时设置
   server.timeout = 30000;  // 30秒超时
   server.keepAliveTimeout = 65000;

   // ③ 优雅关闭（详见 Q41）
   process.on('SIGTERM', () => {
     server.close(() => {
       console.log('服务器已关闭');
       process.exit(0);
     });
   });
   ```

4. **HTTP vs HTTPS**
   ```javascript
   const https = require('https');
   const fs = require('fs');

   const options = {
     key: fs.readFileSync('server.key'),
     cert: fs.readFileSync('server.crt')
   };

   https.createServer(options, (req, res) => {
     res.end('HTTPS 安全连接');
   }).listen(443);
   ```

> **追问链**：如何设计生产级的 HTTP 服务框架？→ Q31、Q35

### 🔍 追问链
1. **如何处理大文件上传？（Stream 方式）**
   → 方向：使用 formidable/multer 的流式模式；req.pipe(fs.createWriteStream()) 直接落盘；配合 fs.stat 校验大小；避免 req.body 全量缓冲
2. **如何处理并发请求？（Worker Threads / Cluster）**
   → 方向：Cluster 模式 fork 多进程利用多核；Worker Threads 处理 CPU 密集计算；Nginx 反向代理做负载均衡（Round Robin/IP Hash/Least Conn）；连接池限制数据库并发数
3. **keep-alive timeout 应该如何设置？**
   → 方向：server.keepAliveTimeout > server.headersTimeout；推荐 61000ms + 65000ms 配合 Nginx 60s 默认超时；客户端 http.Agent keepAliveMsecs 需对齐；防止空闲连接占用服务器资源

---

## Q13: Stream（流）和 Buffer 有什么区别？
- **难度**：★☆☆
- **知识点**：Stream / Buffer / 数据处理 / 内存管理
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **Buffer - 数据容器**
   ```javascript
   // Buffer 是固定大小的内存块，用于存储二进制数据
   const buf = Buffer.from('Hello World', 'utf8');
   console.log(buf.length);           // 11（字节长度）
   console.log(buf.toString());       // Hello World
   console.log(buf.toJSON());         // { type: 'Buffer', data: [72, 101, ...] }

   // 创建方式
   const buf1 = Buffer.alloc(10);          // 分配 10 字节，填充 0（安全）
   const buf2 = Buffer.allocUnsafe(10);    // 分配 10 字节，不填充（更快但有旧数据）
   const buf3 = Buffer.from('text');       // 从字符串创建
   ```

2. **Stream - 数据流动**
   ```javascript
   // Stream 是数据的流动通道，分为四种类型：
   // 1. Readable  - 可读流（读取数据源）
   // 2. Writable - 可写流（写入目标）
   // 3. Duplex   - 双向流（读写同时进行，如 TCP socket）
   // 4. Transform - 转换流（读写+转换，如 zlib 压缩）

   const fs = require('fs');

   // 可读流
   const readable = fs.createReadStream('input.txt', {
     encoding: 'utf8',
     highWaterMark: 64 * 1024  // 缓冲区大小 64KB
   });

   // 可写流
   const writable = fs.createWriteStream('output.txt');

   // 管道传输（pipe）
   readable.pipe(writable);
   ```

3. **核心区别对比**

| 特性 | Buffer | Stream |
|------|--------|--------|
| **本质** | 固定大小内存块 | 数据的连续流动 |
| **内存占用** | 一次性加载全部 | 分块处理，内存恒定 |
| **适用场景** | 小数据、二进制操作 | 大文件、网络传输 |
| **类比** | 一桶水 | 自来水管 |

4. **为什么大文件要用 Stream？**
   ```javascript
   const fs = require('fs');

   // ❌ 使用 Buffer/字符串（内存爆炸风险）
   // 假设文件 1GB，这会占用 1GB+ 内存！
   fs.readFile('large-file.txt', (err, data) => {
     fs.writeFile('copy.txt', data);
   });

   // ✅ 使用 Stream（内存恒定，通常几 MB）
   const readStream = fs.createReadStream('large-file.txt');
   const writeStream = fs.createWriteStream('copy.txt');
   
   // pipe 自动管理流速（背压机制）
   readStream.pipe(writeStream);

   // 监听事件
   readStream.on('data', (chunk) => {
     console.log(`接收到 ${chunk.length} 字节数据`);
   });

   writeStream.on('finish', () => {
     console.log('文件复制完成');
   });
   ```

5. **Stream 实战：文件压缩**
   ```javascript
   const zlib = require('zlib');
   const fs = require('fs');

   // 创建 gzip 压缩流
   const gzip = zlib.createGzip();
   const input = fs.createReadStream('large-file.txt');
   const output = fs.createWriteStream('large-file.txt.gz');

   // 流式管道：读取 → 压缩 → 写入
   input
     .pipe(gzip)
     .pipe(output)
     .on('finish', () => console.log('压缩完成'));
   ```

> **追问链**：如何实现自定义的可读/可写流？→ Q42

---

## Q14: path 模块的 join 和 resolve 区别？
- **难度**：★☆☆
- **知识点**：path 模块 / 路径处理 / 文件系统
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **核心区别**
   ```javascript
   const path = require('path');

   // join - 拼接路径片段（不关心是否绝对路径）
   path.join('/foo', 'bar', 'baz');
   // → '/foo/bar/baz'

   path.join('/foo/bar', '../baz');
   // → '/foo/baz'

   // resolve - 解析为绝对路径（从右往左拼接，遇到绝对路径则重置）
   path.resolve('/foo', 'bar', 'baz');
   // → '/foo/bar/baz'

   path.resolve('bar', 'baz');
   // → '/当前工作目录/bar/baz'

   path.resolve('/foo/bar', '/tmp/file/');
   // → '/tmp/file'（遇到绝对路径 /tmp 则重置）
   ```

2. **详细对比**

| 特性 | path.join() | path.resolve() |
|------|-------------|----------------|
| **返回值** | 拼接后的路径字符串 | **绝对路径** |
| **处理 `..`** | ✅ 向上退一级 | ✅ 向上退一级 |
| **处理 `/` 开头** | 当作普通字符 | 重置基准路径 |
| **无参数时** | `.`（当前目录） | **当前工作目录的绝对路径** |
| **典型用途** | 拼接文件路径 | 获取文件绝对路径 |

3. **实战示例**
   ```javascript
   const path = require('path');

   // 场景1：构建文件路径（使用 join）
   const filePath = path.join(__dirname, 'src', 'components', 'Button.jsx');
   // → /项目根目录/src/components/Button.jsx

   // 场景2：获取绝对路径（使用 resolve）
   const absolutePath = path.resolve('config.json');
   // → /当前工作目录/config.json

   // 场景3：处理用户输入的路径
   const userInput = '../../etc/passwd';  // 用户输入
   const safePath = path.join('/safe/directory', userInput);
   // → /etc/passwd（需要注意安全问题！）

   // 场景4：提取路径信息
   path.basename('/foo/bar/baz.txt');   // baz.txt（文件名）
   path.dirname('/foo/bar/baz.txt');    // /foo/bar（目录名）
   path.extname('/foo/bar/baz.txt');    // .txt（扩展名）
   ```

4. **安全注意事项**
   ```javascript
   // ⚠️ 路径遍历攻击防护
   const path = require('path');

   function safeJoin(basePath, userPath) {
     // 规范化路径（解析 .. 和 .）
     const targetPath = path.resolve(basePath, userPath);
     
     // 确保最终路径仍在 basePath 内
     if (!targetPath.startsWith(path.resolve(basePath))) {
       throw new Error('非法路径访问');
     }
     
     return targetPath;
   }

   // 使用示例
   safeJoin('/uploads', '../../etc/passwd');
   // → Error: 非法路径访问 ✅
   ```

> **追问链**：如何安全地处理用户上传的文件路径？→ Q26

---

## Q15: Express 和 Koa 有什么区别？
- **难度**：★☆☆
- **知识点**：Express / Koa / 框架对比 / 中间件
- **题型**：简答题

### 参考答案要点：

1. **核心定位对比**

| 特性 | Express | Koa |
|------|---------|-----|
| **定位** | **大而全**的 Web 框架 | **轻量级**的 Web 框架 |
| **设计理念** | Out-of-the-box（开箱即用） | Minimalist（极简主义） |
| **作者** | TJ Holowaychuk | TJ Holowaychuk（Express 的继任者） |
| **中间件模型** | 线性模型（类似栈） | **洋葱模型**（async/await） |
| **路由** | 内置 | 需要安装 koa-router |
| **默认功能** | 路由/模板引擎/静态文件等 | 仅核心（ctx/request/response） |
| **Callback** | 传统回调 | 基于 Promise/async-await |

2. **代码对比**
   ```javascript
   // ========== Express ==========
   const express = require('express');
   const app = express();

   // 内置功能丰富
   app.use(express.json());  // 解析 JSON
   app.use(express.static('public'));  // 静态文件

   // 中间件（线性执行）
   app.use((req, res, next) => {
     console.log('第一个中间件');
     next();  // 必须手动调用 next()
     console.log('第一个中间件结束');
   });

   app.get('/', (req, res) => {
     res.send('Hello Express');
   });

   app.listen(3000);


   // ========== Koa ==========
   const Koa = require('koa');
   const Router = require('@koa/router');
   const app = new Koa();
   const router = new Router();

   // 极简核心，需要手动引入功能
   const bodyParser = require('koa-bodyparser');
   app.use(bodyParser());

   // 中间件（洋葱模型）
   app.use(async (ctx, next) => {
     console.log('→ 进入第一个中间件');
     await next();  // 等待下游中间件完成
     console.log('← 第一个中间件结束');
   });

   router.get('/', (ctx) => {
     ctx.body = 'Hello Koa';
   });

   app.use(router.routes());
   app.listen(3000);
   ```

3. **洋葱模型详解**
   ```javascript
   const Koa = require('koa');
   const app = new Koa();

   // 执行顺序：1 → 2 → 3 → 3结束 → 2结束 → 1结束
   app.use(async (ctx, next) => {
     console.log('1 - 开始');
     await next();
     console.log('1 - 结束');
   });

   app.use(async (ctx, next) => {
     console.log('2 - 开始');
     await next();
     console.log('2 - 结束');
   });

   app.use(async (ctx) => {
     console.log('3 - 响应处理');
     ctx.body = 'Hello';
   });

   // 输出：
   // 1 - 开始
   // 2 - 开始
   // 3 - 响应处理
   // 2 - 结束
   // 1 - 结束
   ```

4. **选型建议**
   ```javascript
   // 选择 Express 当你需要：
   // - 快速开发原型/MVP
   // - 团队对 Express 更熟悉
   // - 需要大量现成的中间件和插件
   // - 传统项目迁移

   // 选择 Koa 当你需要：
   // - 更好的异步支持（原生 async/await）
   // - 更灵活的架构（按需组装）
   // - 更小的包体积
   // - 更现代的开发体验

   // 选择 NestJS 当你需要：
   // - 企业级大型项目
   // - TypeScript 原生支持
   // - 类似 Angular 的架构（装饰器、依赖注入）
   // - 强类型的约束
   ```

> **追问链**：如何设计自己的中间件框架？→ Q31

---

# 进阶篇 ★★☆（Q16-Q30）

## Q16: Node.js 事件循环的各个阶段是什么？执行顺序是怎样的？
- **难度**：★★☆
- **知识点**：事件循环 / 阶段详解 / libuv / 执行顺序
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **事件循环的六个阶段**
   ```
   ┌───────────────────────────────────┐
   │
   ┌─>│ timers                         │← setTimeout / setInterval
   │  └──────────┬────────────────────┘
   │  ┌──────────┴────────────────────┐
   │  │ pending callbacks              │← 某些系统操作的回调（如 TCP 错误）
   │  └──────────┬────────────────────┘
   │  ┌──────────┴────────────────────┐
   │  │ idle, prepare                 │← 内部使用（开发者通常不关心）
   │  └──────────┬────────────────────┘
   │  ┌──────────┴────────────────────┐
   │  │ poll                          │← I/O 事件的回调（核心阶段）
   │  │  ┌──────────────────────────┐ │
   │  │  │ 检查新的 I/O 事件        │ │
   │  │  │ 执行 I/O 相关回调        │ │
   │  │  │ 如果没有定时器，可能在此  │ │
   │  │  │ 阻塞等待新事件           │ │
   │  │  └──────────────────────────┘ │
   │  └──────────┬────────────────────┘
   │  ┌──────────┴────────────────────┐
   │  │ check                         │← setImmediate 的回调
   │  └──────────┬────────────────────┘
   │  ┌──────────┴────────────────────┐
   └──┤ close callbacks                │← socket.on('close') 等
      └───────────────────────────────┘
   ```

2. **各阶段详解**
   ```javascript
   // ① timers 阶段
   // 执行 setTimeout 和 setInterval 的回调
   // 注意：定时器不一定准时！可能因为前面阶段的耗时而延迟
   setTimeout(() => {
     console.log('timer');
   }, 0);

   // ② pending callbacks 阶段
   // 执行某些系统操作的延迟回调
   // 例如：TCP 连接收到 ECONNREFUSED 时的回调

   // ③ poll 阶段（最重要的阶段）
   // - 执行 I/O 相关的回调（fs.readFile、http 请求等）
   // - 如果没有定时器，可能会在这里阻塞等待新的 I/O
   // - 如果有定时器，会尽快进入下一阶段
   fs.readFile(__filename, () => {
     console.log('poll - I/O callback');
   });

   // ④ check 阶段
   // 专门执行 setImmediate 的回调
   setImmediate(() => {
     console.log('check - immediate');
   });

   // ⑤ close callbacks 阶段
   // 执行关闭事件的回调
   // 如 socket.on('close', ...)
   ```

3. **完整执行顺序示例**
   ```javascript
   console.log('start');

   setTimeout(() => console.log('setTimeout'), 0);
   setImmediate(() => console.log('setImmediate'));
   fs.readFile(__filename, () => {
     console.log('I/O callback');
     // 在 I/O 回调内，setImmediate 总是先于 setTimeout
     setTimeout(() => console.log('I/O内的setTimeout'), 0);
     setImmediate(() => console.log('I/O内的setImmediate'));
   });

   console.log('end');

   // 可能的输出（取决于 CPU 时序）：
   // start
   // end
   // setTimeout / setImmediate（顺序不确定！）
   // I/O callback
   // I/O内的setImmediate（总是先）
   // I/O内的setTimeout
   ```

4. **关键结论**
   ```javascript
   // 结论1：在 I/O 回调内，setImmediate 总是先于 setTimeout
   // 因为此时处于 poll 阶段，下一步就是 check 阶段

   // 结论2：在主模块顶层，两者顺序不确定
   // 取决于事件循环到达的时间

   // 结论3：如果想保证顺序，使用 setImmediate 替代 setTimeout(fn, 0)
   ```

> **追问链**：微任务在各阶段之间何时执行？→ Q17

### 🔍 追问链
1. **poll 阶段什么情况下会阻塞？**
   → 方向：没有定时器（setTimeout/setImmediate）且没有 setImmediate() 回调时，poll 会阻塞等待新的 I/O 事件；有定时器时 poll 会设超时尽快进入下一阶段；阻塞期间新 I/O 事件会唤醒 poll
2. **setImmediate 在 I/O 回调之后还是之前执行？**
   → 方向：I/O 回调在 poll 阶段执行；poll 的下一阶段就是 check（setImmediate 所在阶段）；所以在 I/O 回调内调用 setImmediate 一定在本轮循环的 check 阶段执行（先于 timers）
3. **如何利用 setImmediate 分割长任务（Yield）？**
   → 方向：将大循环拆分为 setImmediate 递归调用；每次处理一小块数据后让出控制权；保证 I/O 事件有机会被处理；避免事件循环延迟过高导致请求超时

---

## Q17: 微任务（microtask）在 Node.js 中是如何执行的？
- **难度**：★★☆
- **知识点**：微任务 / Promise / process.nextTick / 执行时机
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **微任务的分类**
   ```javascript
   // Node.js 中有两种微任务：
   
   // ① process.nextTick 队列（优先级更高）
   process.nextTick(() => {
     console.log('nextTick 微任务');
   });

   // ② Promise 微任务（resolved/rejected 的 then/catch/finally）
   Promise.resolve().then(() => {
     console.log('Promise 微任务');
   });
   ```

2. **微任务执行时机（重要！）**
   ```
   事件循环的某个阶段
     ↓
   执行该阶段的宏任务回调
     ↓
   【检查微任务队列】
     ├── ① 清空 process.nextTick 队列（全部执行完）
     └── ② 清空 Promise 微任务队列（全部执行完）
     ↓
   进入下一个阶段
   ```

3. **经典面试题解析**
   ```javascript
   console.log('1. script start');

   setTimeout(() => {
     console.log('2. setTimeout');
     process.nextTick(() => {
       console.log('3. nextTick in setTimeout');
     });
     Promise.resolve().then(() => {
       console.log('4. Promise in setTimeout');
     });
   }, 0);

   setImmediate(() => {
     console.log('5. setImmediate');
   });

   process.nextTick(() => {
     console.log('6. nextTick 1');
     process.nextTick(() => {
       console.log('7. nextTick 2（递归）');
     });
   });

   Promise.resolve().then(() => {
     console.log('8. Promise 1');
   }).then(() => {
     console.log('9. Promise 2');
   });

   console.log('10. script end');

   // 输出顺序：
   // 1. script start
   // 10. script end
   // 6. nextTick 1
   // 7. nextTick 2（递归）  ← nextTick 递归会立即执行
   // 8. Promise 1
   // 9. Promise 2
   // 2. setTimeout / 5. setImmediate（顺序不确定）
   // 如果 setTimeout 先执行：
   // 3. nextTick in setTimeout
   // 4. Promise in setTimeout
   // 5. setImmediate
   ```

4. **微任务队列的"饥饿"问题**
   ```javascript
   // ⚠️ 危险：process.nextTick 递归可能导致事件循环无法推进
   function dangerousRecursion() {
     process.nextTick(dangerousRecursion);
     // 这会导致 I/O 回调永远无法执行！
   }

   // ✅ 安全：使用 setImmediate 进行递归
   function safeRecursion() {
     // 处理一部分工作...
     setImmediate(safeRecursion);  // 让出控制权
   }
   ```

5. **最佳实践总结**
   ```javascript
   // ① 优先使用 Promise 而不是 nextTick（语义更清晰）
   // ② nextTick 用于确保在事件循环继续前执行
   // ③ 避免在微任务中进行大量同步操作
   // ④ 生产环境中注意微任务导致的延迟
   ```

> **追问链**：如何利用微任务优化代码执行顺序？→ Q08

---

## Q18: setTimeout(fn, 0) 和 setImmediate(fn) 哪个先执行？
- **难度**：★★☆
- **知识点**：定时器 / setImmediate / 执行顺序 / 事件循环
- **题型**：代码分析题

### 参考答案要点：

1. **答案：取决于上下文！**
   ```javascript
   // ========== 场景1：主模块顶层（顺序不确定）==========
   setTimeout(() => console.log('setTimeout'), 0);
   setImmediate(() => console.log('setImmediate'));

   // 可能输出：
   // setTimeout setImmediate  或者  setImmediate setTimeout
   // 顺序不确定！取决于事件循环的时机

   // ========== 场景2：I/O 回调内（setImmediate 一定先）==========
   const fs = require('fs');
   fs.readFile(__filename, () => {
     setTimeout(() => console.log('I/O内的setTimeout'), 0);
     setImmediate(() => console.log('I/O内的setImmediate'));
     
     // 一定输出：
     // I/O内的setImmediate
     // I/O内的setTimeout
   });
   ```

2. **原因深度解析**
   ```javascript
   // 主模块顶层的情况：
   //
   // 事件循环初始化时：
   // - setTimeout 放入 timers 队列
   // - setImmediate 放入 check 阶段的队列
   //
   // 问题在于：事件循环开始时，先经过哪个阶段？
   // - 如果从 timers 阶段开始 → setTimeout 先执行
   // - 如果从 poll 阶段开始（还没到 timers）→ check 阶段的 setImmediate 先执行
   //
   // 所以顺序是不确定的！

   // I/O 回调内的情况：
   //
   // 当 I/O 回调执行时，事件循环正处于 poll 阶段
   // poll 阶段的下一个阶段就是 check 阶段
   // 所以 setImmediate 一定会比下一次循环的 setTimeout 先执行
   ```

3. **实际应用建议**
   ```javascript
   // ✅ 如果想保证在当前阶段结束后立即执行
   // 使用 setImmediate（而不是 setTimeout(fn, 0)）
   setImmediate(() => {
     // 这里的代码会在当前 I/O 操作后立即执行
   });

   // ✅ 如果需要真正的定时（即使只有 0ms）
   // 使用 setTimeout
   setTimeout(() => {
     // 这里的代码至少会在下一轮 timers 阶段执行
   }, 0);

   // 最佳实践：不要依赖两者的执行顺序！
   // 如果顺序很重要，显式地控制它们
   ```

4. **验证实验**
   ```javascript
   // 运行多次观察结果
   let setTimeoutCount = 0;
   let setImmediateCount = 0;

   for (let i = 0; i < 100; i++) {
     setTimeout(() => setTimeoutCount++, 0);
     setImmediate(() => setImmediateCount++);
   }

   process.on('exit', () => {
     console.log(`setTimeout: ${setTimeoutCount}`);
     console.log(`setImmediate: ${setImmediateCount}`);
     // 结果可能是 50/50 左右，或者偏向某一方
   });
   ```

> **追问链**：如何保证异步操作的执行顺序？→ Q08、Q33

---

## Q19: 如何避免阻塞 Node.js 事件循环？
- **难度**：★★☆
- **知识点**：事件循环阻塞 / 性能优化 / CPU 密集型任务
- **题型**：简答题 + 场景设计题

### 参考答案要点：

1. **什么会阻塞事件循环？**
   ```javascript
   // 任何长时间运行的同步代码都会阻塞！

   // ❌ 同步 CPU 密集型操作
   function heavyComputation() {
     let sum = 0;
     for (let i = 0; i < 10e9; i++) {  // 100亿次循环
       sum += i;
     }
     return sum;
   }
   // 执行时间可能需要数秒，期间所有请求都无法处理！

   // ❌ 同步文件 I/O
   const data = fs.readFileSync('huge-file.txt');  // 阻塞！

   // ❌ 同步加密/哈希
   const hash = crypto.createHash('sha256').update(largeData).digest();
   ```

2. **解决方案一：拆分为异步块**
   ```javascript
   // 方法1：使用 setImmediate/setTimeout 分片
   function processLargeArray(array, processor, callback) {
     let index = 0;

     function processChunk() {
       const chunkSize = 100;  // 每次处理的数量
       const endIndex = Math.min(index + chunkSize, array.length);

       for (; index < endIndex; index++) {
         processor(array[index], index);
       }

       if (index < array.length) {
         // 让出控制权，下次事件循环继续
         setImmediate(processChunk);
       } else {
         callback();
       }
     }

     processChunk();
   }

   // 使用
   processLargeArray(hugeArray, (item) => {
     // 处理每个元素
   }, () => {
     console.log('处理完成');
   });
   ```

3. **解决方案二：Worker Threads**
   ```javascript
   const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

   if (isMainThread) {
     // 主线程：创建 Worker
     const worker = new Worker(__filename, {
       workerData: { start: 0, end: 10000000 }
     });

     worker.on('message', (result) => {
       console.log('计算结果:', result);
     });

     worker.on('error', (err) => {
       console.error('Worker 错误:', err);
     });
   } else {
     // Worker 线程：执行密集计算
     const { start, end } = workerData;
     let sum = 0;
     for (let i = start; i < end; i++) {
       sum += i;
     }
     parentPort.postMessage(sum);
   }
   ```

4. **解决方案三：子进程（Child Process）**
   ```javascript
   const { fork } = require('child_process');

   // 创建子进程执行密集计算
   const child = fork('heavy-task.js');

   child.send({ data: largeDataSet });

   child.on('message', (result) => {
     console.log('子进程计算完成:', result);
   });

   // heavy-task.js
   process.on('message', (msg) => {
     const result = performHeavyCalculation(msg.data);
     process.send(result);
   });
   ```

5. **监控与预警**
   ```javascript
   // 监控事件循环延迟
   let lastTime = Date.now();

   setInterval(() => {
     const now = Date.now();
     const delay = now - lastTime - 100;  // 应该约 100ms
    
     if (delay > 50) {
       console.warn(`⚠️ 事件循环延迟: ${delay}ms`);
       // 可能发生了阻塞！
     }
    
     lastTime = now;
   }, 100);
   ```

> **追问链**：如何设计 Worker Pool 来并行处理任务？→ Q36

---

## Q20: Node.js 的单线程模型有什么优缺点？如何充分利用多核 CPU？
- **难度**：★★☆
- **知识点**：单线程模型 / 多核利用 / Cluster / Worker Threads
- **题型**：简答题 + 架构设计题

### 参考答案要点：

1. **单线程模型的优点**
   ```javascript
   // ✅ 优点1：编程简单
   // 不需要担心锁、竞态条件、死锁等多线程问题
   // 状态管理更简单

   // ✅ 优点2：高并发 I/O 性能优秀
   // 单线程 + 事件循环可以轻松处理数万并发连接
   // 特别适合 I/O 密集型应用

   // ✅ 优点3：资源利用率高
   // 一个线程处理大量连接，线程切换开销小
   // 内存占用低

   // ✅ 优点4：共享内存上下文
   // 同一线程内数据共享自然，无需复杂的 IPC
   ```

2. **单线程模型的缺点**
   ```javascript
   // ❌ 缺点1：无法利用多核 CPU
   // 默认情况下只能使用一个 CPU 核心

   // ❌ 缺点2：CPU 密集型任务性能差
   // 计算任务会阻塞事件循环，影响所有请求

   // ❌ 缺点3：健壮性问题
   // 未捕获的异常可能导致整个进程崩溃
   // 没有多线程的容错能力

   // ❌ 缺点4：可靠性依赖于代码质量
   // 一个地方的 bug 可能影响全局
   ```

3. **利用多核 CPU 的方案**

   **方案一：Cluster 模式（官方推荐）**
   ```javascript
   const cluster = require('cluster');
   const os = require('os');

   if (cluster.isMaster) {
     const cpuCount = os.cpus().length;
     console.log(`Master ${process.pid} 正在运行`);

     // 根据 CPU 数量创建 Worker
     for (let i = 0; i < cpuCount; i++) {
       cluster.fork();
     }

     // Worker 退出时重启
     cluster.on('exit', (worker, code, signal) => {
       console.log(`Worker ${worker.process.pid} 退出`);
       cluster.fork();  // 自动重启
     });
   } else {
     // Worker 进程：启动 HTTP 服务器
     const http = require('http');
     http.createServer((req, res) => {
       res.writeHead(200);
       res.end(`Hello from Worker ${process.pid}\n`);
     }).listen(8000);
   }
   ```

   **方案二：PM2 进程管理器**
   ```bash
   # 使用 PM2 启动多进程
   pm2 start app.js -i max  # 自动根据 CPU 核心数创建进程

   # 或指定数量
   pm2 start app.js -i 4   # 创建 4 个进程
   ```

   **方案三：Worker Threads（Node 10+）**
   ```javascript
   const { Worker, isMainThread, parentPort } = require('worker_threads');

   if (isMainThread) {
     // 创建线程池
     const workers = [];
     for (let i = 0; i < 4; i++) {
       workers.push(new Worker(__filename));
     }
   } else {
     // Worker 线程执行任务
     parentPort.on('message', (task) => {
       const result = compute(task);
       parentPort.postMessage(result);
     });
   }
   ```

4. **方案选型指南**
   ```javascript
   // Cluster：适合 Web 服务器，每个请求独立处理
   // PM2：生产环境首选，自带负载均衡、日志、监控
   // Worker Threads：适合 CPU 密集型计算任务
   // Child Process：适合隔离执行外部命令或脚本
   ```

> **追问链**：如何设计高可用集群架构？→ Q36

---

## Q21: Node.js 的模块加载机制是怎样的？（从 require 到执行的全过程）
- **难度**：★★☆
- **知识点**：模块加载 / 源码理解 / require 流程 / Module 类
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **require 的完整流程图**
   ```
   require('./module')
     │
     ├─ ① Module._resolveFilename() - 路径解析
     │   ├─ 判断是否为核心模块（fs/http/path）
     │   ├─ 解析相对/绝对路径
     │   └─ 在 node_modules 中查找
     │
     ├─ ② 检查 Module._cache - 缓存检查
     │   └─ 如果命中，直接返回 exports
     │
     ├─ ③ new Module() - 创建模块对象
     │   └─ 初始化 module.exports = {}
     │
     ├─ ④ module.load() - 加载模块
     │   ├─ 根据扩展名选择加载器
     │   │   ├─ .js → Module._extensions['.js']
     │   │   ├─ .json → Module._extensions['.json']
     │   │   └─ .node → Module._extensions['.node']（C++ addon）
     │   └─ 读取文件内容
     │
     ├─ ⑤ Module._compile() - 编译执行
     │   ├─ 将代码包裹成函数：
     │   │   (function(exports, require, module, __filename, __dirname) {
     │   │     // 你的模块代码
     │   │   })
     │   └─ 执行该函数（传入上述参数）
     │
     ├─ ⑥ 缓存模块 - Module._cache[filename] = module
     │
     └─ ⑦ 返回 module.exports
   ```

2. **Module 包装函数详解**
   ```javascript
   // 你写的代码：
   const fs = require('fs');
   module.exports = { version: '1.0' };

   // Node.js 实际执行的代码：
   (function(exports, require, module, __filename, __dirname) {
     const fs = require('fs');
     module.exports = { version: '1.0' };
   });

   // 这就是为什么这些变量可以直接使用的原因！
   ```

3. **核心源码简化版**
   ```javascript
   // Node.js 模块系统的简化实现
   function Module(id) {
     this.id = id;
     this.exports = {};
     this.loaded = false;
   }

   Module._cache = {};
   Module._extensions = {
     '.js'(module, filename) {
       const content = fs.readFileSync(filename, 'utf8');
       // 包装成函数并执行
       const wrapped = Module.wrap(content);
       const compiledFn = vm.runInThisContext(wrapped);
       compiledFn.call(
         module.exports,
         module.exports,
         req,  // 自定义的 require 函数
         module,
         filename,
         path.dirname(filename)
       );
     },
     '.json'(module, filename) {
       module.exports = JSON.parse(fs.readFileSync(filename, 'utf8'));
     }
   };

   function require(id) {
     // 1. 解析路径
     const filename = Module._resolveFilename(id);
     
     // 2. 检查缓存
     if (Module._cache[filename]) {
       return Module._cache[filename].exports;
     }
     
     // 3. 创建模块
     const module = new Module(filename);
     Module._cache[filename] = module;
     
     // 4. 加载并执行
     module.load(filename);
     
     // 5. 返回 exports
     return module.exports;
   }
   ```

4. **关键细节**
   ```javascript
   // ① __filename 和 __dirname 的来源
   console.log(__filename);  // 当前文件的绝对路径
   console.log(__dirname);   // 当前文件所在目录的绝对路径
   // 它们是包装函数传入的参数

   // ② 模块作用域
   // 模块内的 var/function 声明不会污染全局
   // 每个模块都有独立的作用域

   // ③ 循环引用的处理
   // 见 Q23
   ```

> **追问链**：ES Module 的加载过程有何不同？→ Q03、Q23

---

## Q22: 循环依赖是怎么产生的？如何解决？
- **难度**：★★☆
- **知识点**：循环依赖 / 模块加载 / 设计模式 / 代码质量
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **什么是循环依赖**
   ```javascript
   // a.js
   const b = require('./b');
   console.log('a 加载了 b:', Object.keys(b));
   module.exports = { name: 'A', sayHi: () => 'Hi from A' };

   // b.js
   const a = require('./a');
   console.log('b 加载了 a:', Object.keys(a));
   module.exports = { name: 'B', sayHi: () => 'Hi from B' };

   // main.js
   const a = require('./a');

   // 输出：
   // b 加载了 a: {}        ← a 还没执行完！
   // a 加载了 b: { name: 'B', sayHi: [Function] }
   ```

2. **Node.js 如何处理循环依赖**
   ```javascript
   // Node.js 的处理策略：
   // 1. 遇到循环依赖时，返回"未完成"的 module.exports（通常是空对象 {}）
   // 2. 不会报错或无限循环
   // 3. 但可能导致获取不到期望的导出值

   // 执行顺序：
   // main.js require('./a')
   //   → a.js 开始执行
   //     → a.js require('./b')
   //       → b.js 开始执行
   //         → b.js require('./a')  ← 发现 a 正在加载中！
   //           → 返回 a 的当前 exports（此时还是 {}）
   //       → b.js 继续执行，b.exports = { name: 'B' }
   //     → a.js 继续，拿到完整的 b
   //   → a.js 执行完毕，a.exports = { name: 'A' }
   ```

3. **解决方案**

   **方案一：延迟 require（推荐）**
   ```javascript
   // a.js
   module.exports = {
     name: 'A',
     getB: () => require('./b')  // 延迟加载
   };

   // b.js
   module.exports = {
     name: 'B',
     getA: () => require('./a')  // 延迟加载
   };
   ```

   **方案二：依赖注入**
   ```javascript
   // a.js
   class A {
     constructor(bInstance) {
       this.b = bInstance;
     }
   }

   // b.js
   class B {
     constructor(aInstance) {
       this.a = aInstance;
     }
   }

   // main.js
   const B = require('./b');
   const A = require('./a');

   const b = new B(null);
   const a = new A(b);
   b.a = a;  // 手动注入
   ```

   **方案三：重构架构（根本解决）**
   ```javascript
   // 提取公共依赖到第三个模块
   // common.js
   module.exports = { sharedConfig: {} };

   // a.js
   const common = require('./common');
   module.exports = { name: 'A', common };

   // b.js
   const common = require('./common');
   module.exports = { name: 'B', common };
   ```

4. **ES Module 的循环依赖**
   ```javascript
   // ESM 使用 Live Binding（实时绑定）
   // 即使是循环依赖，也能获取到最新的值！

   // a.mjs
   export let value = 'A initial';
   import { value as bValue } from './b.mjs';
   export function getBValue() { return bValue; }

   // b.mjs
   export let value = 'B initial';
   import { value as aValue } from './a.mjs';
   export function getAValue() { return aValue; }

   // 使用时能获取到实时更新的值
   ```

> **追问链**：如何检测项目中的循环依赖？→ 工具推荐（madge）

### 🔍 追问链
1. **ORM 能完全防止 SQL 注入吗？有什么盲区？**
   → 方向：ORM 的查询构建器通常安全但 raw query 仍需参数化；Sequelize 的 $where 原始操作符可能不安全；用户输入作为列名/表名时 ORM 无法转义（需白名单校验）；NoSQL 注入（MongoDB $where 操作符）
2. **参数化查询 vs ORM 查询构建器的区别和选择？**
   → 方向：参数化是底层防御（预编译语句）；ORM 查询构建器是对参数化的高层封装；复杂查询优先用 QueryBuilder 而非 raw SQL；需要动态字段/表名时必须手动拼接+白名单
3. **如何审计现有代码库中的 SQL 注入风险？**
   → 方向：静态分析工具（sqlmap 扫描、ESLint sql-injection 规则）；grep 检测字符串拼接模式（`"SELECT..."+var`）；代码审查重点关注用户输入直接拼入 SQL 处；自动化 CI 流水线集成安全扫描

---

## Q23: npm、yarn 和 pnpm 包管理器的区别？
- **难度**：★★☆
- **知识点**：包管理器 / npm / yarn / pnpm / 依赖安装
- **题型**：简答题 + 对比分析题

### 参考答案要点：

1. **核心特性对比**

| 特性 | npm (v3+) | Yarn (v1) | pnpm |
|------|-----------|-----------|------|
| **扁平化结构** | ✅ 扁平化 | ✅ 扁平化 | ❌ **非扁平化**（符号链接） |
| **安装速度** | 慢 | 快（并行下载） | **最快**（硬链接+符号链接） |
| **磁盘空间** | 冗余多 | 冗余多 | **节省空间**（全局存储） |
| **幽灵依赖** | ✅ 存在 | ✅ 存在 | ❌ **不存在**（严格模式） |
| **Lock 文件** | package-lock.json | yarn.lock | pnpm-lock.yaml |
| **Workspaces** | ✅ 支持 | ✅ 支持 | ✅ 支持 |
| **Patch Package** | 支持 | 支持 | **原生支持** |

2. **node_modules 结构差异**
   ```
   # npm/yarn 的扁平化结构（可能产生幽灵依赖）
   node_modules/
   ├── express/
   ├── body-parser/     ← express 的依赖，提升到了顶层
   ├── cookie/          ← express 的依赖，提升到了顶层
   └── lodash/          ← 项目直接依赖

   # pnpm 的非扁平化结构（.pnpm 存储）
   node_modules/
   ├── .pnpm/
   │   ├── express@4.18.0/node_modules/express
   │   └── lodash@4.17.21/node_modules/lodash
   ├── express → .pnpm/express@4.18.0/node_modules/express
   └── lodash → .pnpm/lodash@4.17.21/node_modules/lodash
   ```

3. **幽灵依赖问题**
   ```javascript
   // package.json
   {
     "dependencies": {
       "express": "^4.18.0"  // 只安装了 express
     }
   }

   // 由于 npm 的扁平化结构，express 的依赖被提升到了顶层
   // 导致以下代码可以运行（但这很危险！）
   const cookieParser = require('cookie-parser');  // 幽灵依赖！
   // 问题：如果 express 更新后移除了这个依赖，你的代码就崩了

   // pnpm 严格模式下不允许幽灵依赖
   // 只有 package.json 中声明的依赖才能被 require
   ```

4. **使用建议**
   ```javascript
   // 新项目推荐：pnpm
   // - 节省磁盘空间
   // - 安装速度快
   // - 避免幽灵依赖问题
   // - 严格的依赖管理

   // 企业项目：根据团队习惯选择
   // - npm：最广泛的支持，Node.js 官方
   // - Yarn：成熟稳定，Plug'n'Play 模式
   // - pnpm：现代化，Monorepo 友好

   // Monorepo 项目：强烈推荐 pnpm 或 Yarn Workspaces
   ```

5. **常用命令对比**
   ```bash
   # 安装依赖
   npm install          | yarn install        | pnpm install

   # 添加依赖
   npm install lodash   | yarn add lodash     | pnpm add lodash

   # 添加开发依赖
   npm install -D jest  | yarn add -D jest    | pnpm add -D jest

   # 运行脚本
   npm run dev          | yarn dev            | pnpm dev

   # 全局安装
   npm install -g ...   | yarn global add ... | pnpm add -g ...

   # 更新依赖
   npm update           | yarn upgrade        | pnpm update
   ```

> **追问链**：如何管理 Monorepo 项目的依赖？→ 工程化实践

---

## Q24: package.json 中 dependencies/devDependencies/peerDependencies 的区别？
- **难度**：★★☆
- **知识点**：package.json / 依赖管理 / npm / 语义版本
- **题型**：简答题

### 参考答案要点：

1. **三种依赖类型详解**
   ```json
   {
     "name": "my-library",
     "version": "1.0.0",
     
     "dependencies": {
       "express": "^4.18.0",
       "lodash": "^4.17.21"
     },
     
     "devDependencies": {
       "jest": "^29.0.0",
       "eslint": "^8.0.0",
       "typescript": "^5.0.0"
     },
     
     "peerDependencies": {
       "react": ">=17.0.0"
     },
     
     "optionalDependencies": {
       "fsevents": "^2.3.0"
     }
   }
   ```

2. **详细说明**
   ```javascript
   // dependencies（生产依赖）
   // - 应用运行时必需的包
   // - 安装时会一起安装
   // - 例：express、lodash、axios
   // 适用：所有类型的项目

   // devDependencies（开发依赖）
   // - 仅开发时需要的工具
   // - npm install --production 时不安装
   // - 例：jest、webpack、eslint、typescript
   // 适用：库项目和应用项目都需要

   // peerDependencies（同伴依赖）
   // - 声明你的插件/库需要的宿主环境
   // - 不会自动安装！只是声明版本范围
   // - 例：react 插件需要 react 作为同伴依赖
   // 适用：主要是发布 npm 包时使用

   // optionalDependencies（可选依赖）
   // - 安装失败也不会中断
   // - 需要在代码中处理缺失的情况
   // - 例：平台相关的包（如 fsevents 仅 macOS 需要）
   ```

3. **实际案例**
   ```javascript
   // 案例：发布一个 React 组件库
   // package.json
   {
     "name": "awesome-ui",
     "version": "1.0.0",

     // 组件运行时需要的依赖
     "dependencies": {
       "color-utils": "^1.0.0"  // 自己用的工具库
     },

     // 开发和测试用的工具
     "devDependencies": {
       "react": "^18.0.0",      // 开发测试时需要
       "jest": "^29.0.0",        // 测试框架
       "rollup": "^3.0.0",       // 打包工具
       "@types/react": "^18.0.0" // 类型定义
     },

     // 告诉使用者：你需要自己安装 React
     "peerDependencies": {
       "react": ">=17.0.0",      // 兼容 React 17+
       "react-dom": ">=17.0.0"
     }
   }

   // 用户使用时：
   // npm install awesome-ui react react-dom
   // React 只需要安装一份，避免版本冲突
   ```

4. **版本号语义（SemVer）**
   ```javascript
   // ^（兼容版本）：允许左边的非零版本号不变
   "^1.2.3" := ">=1.2.3 <2.0.0"   // 兼容 1.x.x
   "^0.2.3" := ">=0.2.3 <0.3.0"   // 0.x 版本比较严格

   // ~（补丁版本）：只允许最后一位变化
   "~1.2.3" := ">=1.2.3 <1.3.0"

   // *（任意版本）或 latest
   "*": any version
   "latest": 最新版

   // 精确版本
   "1.2.3": exactly 1.2.3

   // 范围
   ">=1.0.0 <2.0.0": 1.x.x 的任意版本
   ```

> **追问链**：如何管理依赖版本冲突？→ Q23

---

## Q25: npx 的工作原理是什么？
- **难度**：★★☆
- **知识点**：npx / npm / 包执行 / 开发工具
- **题型**：简答题

### 参考答案要点：

1. **npx 是什么**
   ```bash
   # npx = Node Package Execute
   # npm v5.2.0+ 自带，无需单独安装

   # 核心能力：执行 npm 包中的可执行文件
   # 而不需要全局安装！
   ```

2. **工作原理**
   ```javascript
   // npx 的执行逻辑：

   // ① 检查本地 node_modules/.bin 是否存在
   //    - 如果存在且匹配 → 直接执行本地版本

   // ② 检查本地是否存在该包
   //    - 如果存在于 dependencies 中 → 执行其 bin 命令

   // ③ 如果本地都没有
   //    - 临时安装到临时目录（npm cache）
   //    - 执行完后删除（除非使用 --install 参数）

   // ④ 执行命令
   ```

3. **常用用法**
   ```bash
   # ① 执行本地安装的工具（替代 ./node_modules/.bin/xxx）
   npx webpack --mode production
   npx jest
   npx eslint .

   # ② 执行未安装的命令（临时使用）
   npx create-react-app my-app    # 临时下载并执行
   npx @vue/cli create my-vue-app
   npx json-server db.json        # 快速启动 mock 服务器

   # ③ 指定版本
   npx -p uglify-js@3 uglifyjs app.js -o app.min.js

   # ④ 使用不同版本的 Node.js
   npx node@14 -v                 # 使用 Node 14
   npx node@18 -v                 # 使用 Node 18

   # ⑤ 执行 GitHub 上的代码
   npx github:user/repo
   ```

4. **实用技巧**
   ```bash
   # 缓存执行结果（不重复下载）
   npx create-next-app@latest my-app --cache

   # 使用特定包管理器
   npx --package=yo --package=generator-webapp yo webapp

   # 查看 npx 缓存
   npx cache ls

   # 清理 npx 缓存
   npx cache clean
   ```

5. **与 npm exec 的关系**
   ```bash
   # npm v7+ 新增 npm exec，功能等同于 npx
   npx webpack
   # 等价于
   npx --package=webpack webpack
   # 也等价于
   npm exec -- webpack
   ```

> **追问链**：如何创建自己的 CLI 工具供 npx 使用？→ 工具开发

---

## Q26: 如何在 Node.js 中防止 SQL 注入？
- **难度**：★★☆
- **知识点**：SQL 注入 / 安全 / 参数化查询 / ORM
- **题型**：简答题 + 编程实践题

### 参考答案要点：

1. **SQL 注入的危害**
   ```sql
   -- 恶意输入：' OR '1'='1' --
   SELECT * FROM users WHERE username = '' OR '1'='1' --' AND password = ''
   -- 结果：绕过认证，获取所有用户数据！

   -- 更危险的：删除表
   '; DROP TABLE users; --
   ```

2. **防御方案一：参数化查询（推荐）**
   ```javascript
   const mysql = require('mysql2/promise');

   // ✅ 正确：使用占位符（预编译语句）
   async function getUser(username, password) {
     const connection = await mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: 'password',
       database: 'mydb'
     });

     // 使用 ? 占位符，数据库驱动会自动转义
     const [rows] = await connection.execute(
       'SELECT * FROM users WHERE username = ? AND password = ?',
       [username, password]
     );

     return rows;
   }

   // PostgreSQL 使用 $1, $2 占位符
   const [rows] = await pool.query(
     'SELECT * FROM users WHERE username = $1 AND password = $2',
     [username, password]
   );
   ```

3. **防御方案二：ORM 框架**
   ```javascript
   // Sequelize
   const { Sequelize, Op } = require('sequelize');
   const sequelize = new Sequelize('mysql://user:pass@localhost/db');

   const User = sequelize.define('User', { /* ... */ });

   // ORM 自动使用参数化查询
   const user = await User.findOne({
     where: {
       username: userInput,  // 安全！
       active: true
     }
   });

   // TypeORM
   const user = await repository.findOne({
     where: { username: userInput }
   });

   // Prisma
   const user = await prisma.user.findFirst({
     where: { username: userInput }
   });
   ```

4. **防御方案三：输入验证与白名单**
   ```javascript
   const validator = require('validator');

   function validateInput(input) {
     // ① 类型检查
     if (typeof input !== 'string') {
       throw new Error('Invalid input type');
     }

     // ② 长度限制
     if (input.length > 50) {
       throw new Error('Input too long');
     }

     // ③ 格式验证
     if (!validator.isAlphanumeric(input)) {
       throw new Error('Invalid characters');
     }

     // ④ 白名单过滤
     return input.replace(/[^a-zA-Z0-9_]/g, '');
   }
   ```

5. **防御方案四：最小权限原则**
   ```javascript
   // 数据库用户权限配置
   // 应用程序不应该使用 root 账户！

   // 创建专用账户，只授予必要权限
   CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'strong_password';
   GRANT SELECT, INSERT, UPDATE ON mydb.users TO 'app_user'@'localhost';
   -- 不要授予 DROP、ALTER、DELETE 权限（除非必要）
   ```

6. **综合安全清单**
   ```javascript
   // ✅ 必须做的：
   // 1. 始终使用参数化查询或 ORM
   // 2. 验证和过滤所有用户输入
   // 3. 使用最小权限原则配置数据库
   // 4. 敏感字段加密存储（密码使用 bcrypt）

   // ❌ 绝对不要做的：
   // 1. 拼接 SQL 字符串
   // 2. 相信前端传来的任何数据
   // 3. 在 SQL 错误信息中暴露表结构
   // 4. 使用 root 账户连接数据库
   ```

> **追问链**：还有哪些常见的 Web 安全漏洞需要防范？→ XSS、CSRF

---

## Q27: Session/Cookie/JWT 三种鉴权方式的对比？
- **难度**：★★☆
- **知识点**：鉴权 / Session / Cookie / JWT / 安全
- **题型**：简答题 + 对比分析题

### 参考答案要点：

1. **三种鉴权机制概述**
   ```javascript
   // Session/Cookie 认证：
   // - 服务端存储 Session 数据
   // - 客户端保存 Cookie（Session ID）
   // - 每次请求携带 Cookie，服务端查询 Session

   // JWT（JSON Web Token）认证：
   // - 服务端签发 Token（包含用户信息）
   // - 客户端保存 Token（localStorage/Header）
   // - Token 自包含，服务端无需存储
   ```

2. **详细对比**

| 特性 | Session/Cookie | JWT |
|------|----------------|-----|
| **存储位置** | 服务端（内存/Redis/DB） | 客户端（Token 自包含） |
| **客户端载体** | Cookie | localStorage / Header |
| **可扩展性** | ❌ 需要共享 Session（Redis） | ✅ 天然支持分布式 |
| **安全性** | 可设置 HttpOnly/SameSite | 需防 XSS（Token 泄露） |
| **登出控制** | ✅ 服务端即时失效 | ❌ 难以主动失效 |
| **跨域** | 受限（CORS + Cookie） | ✅ 灵活（Header 携带） |
| **移动端** | Cookie 支持差 | ✅ 原生支持 |
| **Payload 大小** | 小（仅 ID） | 较大（含用户信息） |
| **性能** | 每次查询 Redis/DB | 本地验签（快速） |

3. **代码实现对比**
   ```javascript
   // ========== Session/Cookie 方式 ==========
   const session = require('express-session');
   const RedisStore = require('connect-redis')(session);

   app.use(session({
     store: new RedisStore({ client: redisClient }),
     secret: 'your-secret-key',
     resave: false,
     saveUninitialized: false,
     cookie: {
       secure: true,      // HTTPS only
       httpOnly: true,    // 防 XSS
       maxAge: 24 * 60 * 60 * 1000  // 24小时
     }
   }));

   // 登录
   app.post('/login', (req, res) => {
     req.session.userId = user.id;
     req.session.role = user.role;
     res.json({ success: true });
   });

   // 鉴权中间件
   function authMiddleware(req, res, next) {
     if (req.session && req.session.userId) {
       next();
     } else {
       res.status(401).json({ error: '未登录' });
     }
   }


   // ========== JWT 方式 ==========
   const jwt = require('jsonwebtoken');

   const SECRET_KEY = 'your-jwt-secret';

   // 登录 - 签发 Token
   app.post('/login', (req, res) => {
     const token = jwt.sign(
       { userId: user.id, role: user.role },  // Payload
       SECRET_KEY,
       { expiresIn: '24h' }  // 过期时间
     );
     res.json({ token });
   });

   // 鉴权中间件
   function authMiddleware(req, res, next) {
     const authHeader = req.headers.authorization;
     if (!authHeader || !authHeader.startsWith('Bearer ')) {
       return res.status(401).json({ error: '未登录' });
     }

     try {
       const token = authHeader.split(' ')[1];
       const decoded = jwt.verify(token, SECRET_KEY);
       req.user = decoded;
       next();
     } catch (err) {
       res.status(401).json({ error: 'Token 无效或过期' });
     }
   }
   ```

4. **选型建议**
   ```javascript
   // 选择 Session/Cookie：
   // - 传统 Web 应用（需要即时登出）
   // - 对安全性要求极高（金融、政务）
   // - 需要服务端完全控制用户状态

   // 选择 JWT：
   // - 前后端分离 / SPA 应用
   // - 移动 App + Web 多端
   // - 微服务架构（分布式系统）
   // - 第三方 API 认证

   // 混合方案（推荐）：
   // - Access Token（JWT，短期有效，15分钟）
   // - Refresh Token（长期有效，存 Redis，用于刷新 Access Token）
   ```

5. **安全最佳实践**
   ```javascript
   // Cookie 安全配置
   cookie: {
     httpOnly: true,     // 防 XSS 窃取
     secure: true,       // 仅 HTTPS 传输
     sameSite: 'strict', // 防 CSRF 攻击
     domain: '.example.com',  // 子域共享
     path: '/'
   }

   // JWT 安全建议
   // 1. 使用强密钥（256位随机字符串）
   // 2. 设置合理的过期时间
   // 3. 使用 RS256（非对称加密）而非 HS256
   // 4. 敏感信息不要放入 Payload
   // 5. 考虑使用 Refresh Token 机制
   ```

> **追问链**：如何设计 OAuth2.0 认证流程？→ Q38

### 🔍 追问链
1. **JWT 过期刷新策略（Access Token + Refresh Token）是如何设计的？**
   → 方向：AT 短期（15min）+ RT 长期（7-30天）双 token 机制；RT 存 Redis/DB 支持主动失效；刷新接口用 RT 换新 AT；RT 轮换策略（每次刷新生成新的 RT 使旧的失效）；黑名单机制应对紧急吊销
2. **Session 存储方案应如何选择？（内存 / Redis）**
   → 方向：内存存储：开发/单实例够用，重启丢失；Redis 存储：生产首选，支持多实例共享 + 持久化 + TTL 自动过期；选择依据：是否多实例部署？Session 数据量？对丢失的容忍度？还需考虑 Session 固定/滑动过期策略
3. **Cookie 的安全属性（HttpOnly / Secure / SameSite / Domain / Path）应该如何配置？**
   → 方向：HttpOnly=true 防 XSS 窃取 Cookie；Secure=true 限制仅 HTTPS 传输（生产必须）；SameSite=Strict/Lax 防 CSRF 攻击；Domain 设为具体域名不设根域防子域伪造；Path=/ 限制作用域；配合 CORS 配置和 CSRF Token 双重防护

---

## Q28: Redis 在 Node.js 项目中的典型使用场景？
- **难度**：★★☆
- **知识点**：Redis / 缓存 / 会话存储 / 分布式锁 / 消息队列
- **题型**：简答题 + 场景设计题

### 参考答案要点：

1. **Redis 简介**
   ```javascript
   // Redis = Remote Dictionary Server
   // 特点：
   // - 内存数据库，读写速度极快（10万+ QPS）
   // - 支持多种数据结构（String/List/Set/Sorted Set/Hash/Stream）
   // - 支持持久化（RDB/AOF）
   // - 支持发布/订阅、Lua 脚本、事务
   ```

2. **典型使用场景**

   **场景一：缓存层**
   ```javascript
   const Redis = require('ioredis');
   const redis = new Redis();

   async function getUser(userId) {
     const cacheKey = `user:${userId}`;

     // ① 先查缓存
     const cached = await redis.get(cacheKey);
     if (cached) {
       return JSON.parse(cached);  // 缓存命中
     }

     // ② 缓存未命中，查数据库
     const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);

     // ③ 写入缓存（设置过期时间）
     await redis.setex(cacheKey, 3600, JSON.stringify(user));  // 1小时过期

     return user;
   }
   ```

   **场景二：分布式 Session 存储**
   ```javascript
   const session = require('express-session');
   const RedisStore = require('connect-redis')(session);

   app.use(session({
     store: new RedisStore({ client: redis }),
     secret: 'secret-key',
     cookie: { secure: true, httpOnly: true }
   }));

   // 多个服务器实例共享 Session
   ```

   **场景三：分布式锁**
   ```javascript
   async function acquireLock(lockKey, ttl = 10) {
     // SET NX EX（不存在才设置，带过期时间）
     const acquired = await redis.set(lockKey, 'locked', 'NX', 'EX', ttl);
     return acquired === 'OK';
   }

   async function releaseLock(lockKey) {
     // 使用 Lua 脚本确保原子性（只有持有者才能释放）
     const script = `
       if redis.call("get", KEYS[1]) == ARGV[1] then
         return redis.call("del", KEYS[1])
       else
         return 0
       end
     `;
     return redis.eval(script, 1, lockKey, 'locked');
   }

   // 使用：防止重复提交
   app.post('/order', async (req, res) => {
     const lockKey = `order_lock:${userId}`;
     const locked = await acquireLock(lockKey, 5);
     
     if (!locked) {
       return res.status(429).json({ error: '请勿重复提交' });
     }
     
     try {
       // 创建订单...
       res.json({ orderId: order.id });
     } finally {
       await releaseLock(lockKey);
     }
   });
   ```

   **场景四：限流（Rate Limiting）**
   ```javascript
   // 滑动窗口限流
   async function rateLimit(ip, limit = 100, windowSeconds = 60) {
     const key = `rate_limit:${ip}`;
     const current = await redis.incr(key);
     
     if (current === 1) {
       await redis.expire(key, windowSeconds);
     }
     
     return {
       allowed: current <= limit,
       remaining: Math.max(0, limit - current),
       resetTime: await redis.ttl(key)
     };
   }
   ```

   **场景五：消息队列（发布/订阅）**
   ```javascript
   // 发布者
   async function publishNotification(userId, message) {
     await redis.publish(`user:${userId}:notifications`, JSON.stringify(message));
   }

   // 订阅者
   const subscriber = new Redis();
   subscriber.subscribe(`user:${userId}:notifications`, (message) => {
     const notification = JSON.parse(message);
     // 推送给客户端（WebSocket）
     ws.send(notification);
   });
   ```

3. **Node.js Redis 客户端选择**
   ```javascript
   // 选项1：ioredis（推荐）
   // - 支持 Promise
   // - 支持集群、哨兵
   // - 支持管道（Pipeline）
   const Redis = require('ioredis');
   const redis = new Redis({
     host: 'localhost',
     port: 6379,
     password: 'xxx',
     db: 0,
     retryStrategy(times) {
       return Math.min(times * 50, 2000);
     }
   });

   // 选项2：node-redis（官方）
   // - Redis 官方推荐的 Node.js 客户端
   // - v4+ 支持 Promise
   const redis = require('redis').createClient({ url: 'redis://localhost:6379' });
   ```

> **追问链**：如何设计 Redis 缓存一致性策略？→ Q36

---

## Q29: 如何设计一个连接池？连接池的核心参数有哪些？
- **难度**：★★☆
- **知识点**：连接池 / 数据库 / 性能优化 / 资源管理
- **题型**：简答题 + 架构设计题

### 参考答案要点：

1. **为什么需要连接池**
   ```javascript
   // ❌ 每次请求都新建连接（性能杀手）
   app.get('/api/data', async (req, res) => {
     const conn = await mysql.createConnection(config);  // 每次都新建！
     const [rows] = await conn.query('SELECT * FROM table');
     await conn.end();  // 每次都关闭！
     res.json(rows);
   });
   // 问题：建立连接需要 TCP 三次握手 + 身份验证（耗时 10-100ms）

   // ✅ 使用连接池复用连接
   const pool = mysql.createPool(config);
   app.get('/api/data', async (req, res) => {
     const conn = await pool.getConnection();  // 从池中获取（<1ms）
     const [rows] = await conn.query('SELECT * FROM table');
     conn.release();  // 归还到池中（不是关闭！）
     res.json(rows);
   });
   ```

2. **连接池核心参数**
   ```javascript
   const pool = mysql.createPool({
     // ===== 基础配置 =====
     host: 'localhost',
     port: 3306,
     user: 'root',
     password: 'password',
     database: 'mydb',

     // ===== 连接池核心参数 =====
     connectionLimit: 10,      // 最大连接数（最重要！）
     waitForConnections: true,  // 无可用连接时是否等待
     queueLimit: 0,            // 等待队列上限（0=无限制）

     // ===== 连接生命周期 =====
     acquireTimeout: 10000,    // 获取连接的超时时间（ms）
     connectTimeout: 10000,    // 建立 TCP 连接的超时时间
     timeout: 60000,           // 查询超时时间

     // ===== 健康检查 =====
     enableKeepAlive: true,    // 心跳检测
     keepAliveInitialDelay: 0,

     // ===== 空闲连接管理 =====
     idleTimeout: 60000,       // 空闲连接多久后被回收（ms）
     maxIdle: 10               // 最大空闲连接数
   });
   ```

3. **参数调优指南**
   ```javascript
   // connectionLimit（最大连接数）的计算公式：
   // 公式：(核心数 * 2) + 有效磁盘数
   // 实践经验：
   // - 小型应用：5-10
   // - 中型应用：20-50
   // - 大型应用：100-500（配合读写分离）
   // - 不要超过数据库的最大连接数限制！

   // waitForConnections:
   // - true：排队等待（推荐，避免拒绝请求）
   // - false：立即返回错误

   // idleTimeout:
   // - 太短：频繁创建销毁连接（浪费资源）
   // - 太长：占用空闲连接（可能被数据库回收）
   // - 建议：30分钟 - 1小时
   ```

4. **连接池监控**
   ```javascript
   // 定期输出连接池状态
   setInterval(() => {
     console.log('连接池状态:', {
       allConnections: pool._allConnections.length,    // 总连接数
       freeConnections: pool._freeConnections.length,   // 空闲连接数
       acquiringConnections: pool._acquiringConnections.length  // 正在获取的连接数
     });
   }, 10000);
   ```

5. **手写简易连接池（理解原理）**
   ```javascript
   class SimplePool {
     constructor(createFn, options = {}) {
       this.createFn = createFn;
       this.maxSize = options.maxSize || 10;
       this.available = [];  // 空闲连接
       this.pending = [];    // 等待队列
       this.size = 0;
     }

     async acquire() {
       // ① 有空闲连接，直接返回
       if (this.available.length > 0) {
         return this.available.pop();
       }

       // ② 没达到上限，创建新连接
       if (this.size < this.maxSize) {
         this.size++;
         return this.createFn();
       }

       // ③ 达到上限，等待归还
       return new Promise(resolve => {
         this.pending.push(resolve);
       });
     }

     release(connection) {
       // ① 有人等待，直接给他
       if (this.pending.length > 0) {
         const resolve = this.pending.shift();
         resolve(connection);
       } else {
         // ② 放回空闲列表
         this.available.push(connection);
       }
     }
   }
   ```

> **追问链**：如何处理连接泄漏？→ Q39

---

## Q30: WebSocket 在 Node.js 中的实现思路？
- **难度**：★★☆
- **知识点**：WebSocket / 实时通信 / Socket.IO / 双向通信
- **题型**：简答题 + 编程实践题

### 参考答案要点：

1. **WebSocket vs HTTP**
   ```javascript
   // HTTP：
   // - 请求-响应模式（单向）
   // - 无状态
   // - 每次请求都携带完整 Header
   // - 无法主动推送

   // WebSocket：
   // - 全双工通信（双向）
   // - 有状态（持久连接）
   // - 建立连接后开销很小
   // - 支持服务端主动推送
   ```

2. **原生 WebSocket 实现**
   ```javascript
   const { WebSocketServer } = require('ws');

   const wss = new WebSocketServer({ port: 8080 });

   wss.on('connection', (ws, req) => {
     console.log('新客户端连接:', req.socket.remoteAddress);

     // 接收消息
     ws.on('message', (data) => {
       console.log('收到消息:', data.toString());

       // 广播给所有客户端
       wss.clients.forEach(client => {
         if (client.readyState === ws.OPEN) {
           client.send(`服务器转发: ${data}`);
         }
       });
     });

     // 连接关闭
     ws.on('close', () => {
       console.log('客户端断开连接');
     });

     // 错误处理
     ws.on('error', (err) => {
       console.error('WebSocket 错误:', err);
     });

     // 发送欢迎消息
     ws.send('欢迎连接到 WebSocket 服务器！');
   });
   ```

3. **Socket.IO 实现（推荐生产使用）**
   ```javascript
   const express = require('express');
   const http = require('http');
   const { Server } = require('socket.io');

   const app = express();
   const server = http.createServer(app);
   const io = new Server(server, {
     cors: { origin: '*' }  // 跨域配置
   });

   io.on('connection', (socket) => {
     console.log('用户连接:', socket.id);

     // 加入房间
     socket.on('join-room', (roomId) => {
       socket.join(roomId);
       socket.to(roomId).emit('user-joined', socket.id);
     });

     // 房间内广播
     socket.on('send-message', ({ roomId, message }) => {
       io.to(roomId).emit('new-message', {
         userId: socket.id,
         message,
         timestamp: new Date()
       });
     });

     // 私聊
     socket.on('private-message', ({ to, message }) => {
       io.to(to).emit('private-message', {
         from: socket.id,
         message
       });
     });

     // 断开连接
     socket.on('disconnect', () => {
       console.log('用户断开:', socket.id);
     });
   });

   server.listen(3000);
   ```

4. **WebSocket 认证与授权**
   ```javascript
   // 方案1：连接时通过 query 参数传递 Token
   io.use((socket, next) => {
     const token = socket.handshake.auth.token;
     
     try {
       const decoded = jwt.verify(token, SECRET);
       socket.user = decoded;
       next();
     } catch (err) {
       next(new Error('认证失败'));
     }
   });

   // 客户端连接
   const socket = io('http://localhost:3000', {
     auth: { token: userToken }
   });
   ```

5. **心跳检测与重连**
   ```javascript
   // Socket.IO 内置心跳机制（ping/pong）
   // 配置心跳间隔
   const io = new Server(server, {
     pingInterval: 25000,   // 25秒发送 ping
     pingTimeout: 60000,    // 60秒无响应则断开
   });

   // 客户端重连配置
   const socket = io({
     reconnection: true,         // 启用自动重连
     reconnectionAttempts: 5,    // 最大重连次数
     reconnectionDelay: 1000,    // 初始重连延迟
     reconnectionDelayMax: 5000, // 最大重连延迟
   });
   ```

6. **生产环境注意事项**
   ```javascript
   // ① 反向代理配置（Nginx）
   location /socket.io/ {
     proxy_pass http://backend;
     proxy_http_version 1.1;
     proxy_set_header Upgrade $http_upgrade;
     proxy_set_header Connection "upgrade";
   }

   // ② 水平扩展（多节点广播）
   // 使用 Redis Adapter
   const { createAdapter } = require('@socket.io/redis-adapter');
   const pubClient = redis.duplicate();
   const subClient = redis.duplicate();
   io.adapter(createAdapter(pubClient, subClient));

   // ③ 消息限流
   // 防止恶意用户发送大量消息
   const rateLimiter = new Map();
   socket.on('message', (data) => {
     const now = Date.now();
     const lastTime = rateLimiter.get(socket.id) || 0;
     if (now - lastTime < 100) {  // 100ms 限制
       socket.emit('error', '发送太频繁');
       return;
     }
     rateLimiter.set(socket.id, now);
     // 处理消息...
   });
   ```

> **追问链**：如何设计百万级在线的 IM 系统？→ Q36

---

# 专家篇 ★★★（Q31-Q50）

## Q31: 手写一个简易的 Express 风格路由系统（支持中间件链）
- **难度**：★★★
- **知识点**：中间件模式 / 路由系统 / 洋葱模型 / 设计模式
- **题型**：编程实践题

### 参考答案要点：

1. **完整实现（增强版：支持路由分组 + 通配符 + 错误处理中间件）**
   ```javascript
   // mini-express.js - 完整版 Express 风格路由框架
   // 支持：动态路由参数 :id、通配符 *、中间件洋葱模型、
   //       错误处理中间件（四参数）、子路由挂载（use）、链式调用

   const http = require('http');
   const url = require('url');

   // ==================== Router 子路由类 ====================
   // 用于实现 app.use('/prefix', router) 路由分组功能
   class MiniRouter {
     constructor(prefix = '') {
       this.prefix = prefix;           // 路由前缀（如 /api/v1）
       this.stack = [];                // 中间件 + 路由层栈
     }

     // 注册中间件（支持路径匹配）
     use(path, ...handlers) {
       // use(fn) 形式：path 省略时匹配所有路径
       if (typeof path === 'function') {
         handlers.unshift(path);
         path = '/';
       }
       this.stack.push({ type: 'middleware', path, handlers });
       return this;
     }

     // 注册 GET 路由
     get(path, ...handlers) {
       this.stack.push({ type: 'route', method: 'GET', path, handlers });
       return this;
     }

     // 注册 POST 路由
     post(path, ...handlers) {
       this.stack.push({ type: 'route', method: 'POST', path, handlers });
       return this;
     }

     // 注册 PUT 路由
     put(path, ...handlers) {
       this.stack.push({ type: 'route', method: 'PUT', path, handlers });
       return this;
     }

     // 注册 DELETE 路由
     delete(path, ...handlers) {
       this.stack.push({ type: 'route', method: 'DELETE', path, handlers });
       return this;
     }

     // 匹配请求的方法和路径
     match(method, pathname) {
       const results = [];
       for (const layer of this.stack) {
         // 路由层需要匹配 HTTP 方法
         if (layer.type === 'route' && layer.method !== method) continue;

         // 路径匹配（支持 :param 和 * 通配符）
         const params = this._matchPath(layer.path, pathname);
         if (params !== null) {
           results.push({ layer, params });
         }
       }
       return results;
     }

     // 路径匹配引擎：支持动态参数 :id 和通配符 *
     _matchPath(pattern, pathname) {
       // 精确匹配 / 或通配符 *
       if (pattern === '*' || pattern === '/*') return {};

       // 将路由模式转为正则表达式
       // 例如：/users/:id/posts/:postId → 正则 + 参数名提取
       const paramNames = [];
       let regexStr = pattern
         .replace(/\*/g, '.*')              // * 匹配任意路径段
         .replace(/:([^/]+)/g, (_, name) => {
           paramNames.push(name);
           return '([^/]+)';               // :param 匹配非 / 字符
         });

       const regex = new RegExp(`^${regexStr}$`);
       const match = pathname.match(regex);

       if (!match) return null;

       // 提取参数键值对
       const params = {};
       paramNames.forEach((name, i) => {
         params[name] = decodeURIComponent(match[i + 1]);
       });
       return params;
     }
   }

   // ==================== 主应用类 ====================
   class MiniExpress {
     constructor() {
       this.middlewares = [];        // 全局中间件栈
       this.routes = new Map();      // 路由表：METHOD -> [{path, handlers}]
       this.subRouters = [];         // 子路由列表（用于 use 挂载）
     }

     // ---------- 中间件注册 ----------
     // 注册全局中间件（匹配所有路径）
     use(path, ...handlers) {
       // use(fn) 形式：path 是函数时视为中间件
       if (typeof path === 'function') {
         handlers.unshift(path);
         path = '/';
       }

       // use(router) 形式：挂载子路由器
       if (path instanceof MiniRouter || (handlers[0] instanceof MiniRouter)) {
         const router = path instanceof MiniRouter ? path : handlers[0];
         const prefix = typeof path === 'string' ? path : '/';
         this.subRouters.push({ router, prefix });
         return this;
       }

       this.middlewares.push({ path, handlers });
       return this;  // 支持链式调用
     }

     // ---------- HTTP 方法注册 ----------
     get(path, ...handlers) { return this._addRoute('GET', path, handlers); }
     post(path, ...handlers) { return this._addRoute('POST', path, handlers); }
     put(path, ...handlers) { return this._addRoute('PUT', path, handlers); }
     delete(path, ...handlers) { return this._addRoute('DELETE', path, handlers); }
     all(path, ...handlers) { return this._addRoute('ALL', path, handlers); }

     _addRoute(method, path, handlers) {
       if (!this.routes.has(method)) {
         this.routes.set(method, []);
       }
       this.routes.get(method).push({ path, handlers });
       return this;
     }

     // ---------- 启动服务器 ----------
     listen(port, callback) {
       const server = http.createServer(this._handleRequest.bind(this));
       server.listen(port, () => {
         console.log(`✅ 服务器运行在 http://localhost:${port}`);
         callback && callback();
       });
       return server;
     }

     // ========== 核心请求处理入口 ==========
     async _handleRequest(req, res) {
       // ① 扩展 req/res 对象，添加常用属性和方法
       const parsedUrl = url.parse(req.url, true);
       req.method = req.method.toUpperCase();
       req.url = parsedUrl;
       req.params = {};          // 路由参数（:id）
       req.query = parsedUrl.query || {};  // 查询字符串 (?a=1)
       req.body = '';            // 请求体（需中间件解析）
       req.path = parsedUrl.pathname;      // 路径部分

       // 响应辅助方法
       res.json = (data) => {
         res.setHeader('Content-Type', 'application/json; charset=utf-8');
         res.end(JSON.stringify(data));
       };
       res.status = (code) => {
         res.statusCode = code;
         return res;  // 链式调用
       };
       res.send = (data) => {
         if (typeof data === 'object') return res.json(data);
         res.end(typeof data === 'number' ? String(data) : data);
       };
       res.setHeaderDefault = () => {
         if (!res.headersSent) {
           res.setHeader('X-Powered-By', 'MiniExpress');
         }
       };

       // ② 收集请求体（简化版 JSON 解析）
       await this._collectBody(req);

       try {
         // ③ 构建完整的中间件执行链
         const chain = this._buildChain(req);

         // ④ 以洋葱模型执行中间件链
         await this._executeChain(chain, 0, req, res);
       } catch (err) {
         this._handleError(err, req, res);
       }
     }

     // 构建中间件执行链（洋葱模型核心）
     _buildChain(req) {
       const chain = [];

       // 1) 添加全局中间件
       for (const mw of this.middlewares) {
         // 中间件路径匹配（支持 / 和通配）
         if (mw.path === '/' || mw.path === '*' || mw.path === req.path ||
             (mw.path.endsWith('*') && req.path.startsWith(mw.path.slice(0, -1)))) {
           chain.push(...mw.handlers);
         }
       }

       // 2) 尝试匹配注册的路由
       let routeMatched = false;

       // 先检查子路由器
       for (const { router, prefix } of this.subRouters) {
         // 判断请求路径是否以该子路由前缀开头
         if (req.path.startsWith(prefix)) {
           const subPath = req.path.slice(prefix.length) || '/';
           const matches = router.match(req.method, subPath);
           if (matches.length > 0) {
             routeMatched = true;
             for (const { layer, params } of matches) {
               // 合并路由参数
               Object.assign(req.params, params);
               chain.push(...layer.handlers);
             }
           }
         }
       }

       // 再检查主路由
       if (!routeMatched) {
         const routes = this.routes.get(req.method) || [];
         const allRoutes = this.routes.get('ALL') || [];

         for (const route of [...routes, ...allRoutes]) {
           const params = this._matchPath(route.path, req.path);
           if (params !== null) {
             routeMatched = true;
             Object.assign(req.params, params);
             chain.push(...route.handlers);
             break;  // 只匹配第一个路由
           }
         }
       }

       // 3) 如果没有匹配到任何路由，添加 404 处理
       if (!routeMatched) {
         chain.push((req, res) => {
           res.status(404).json({ error: 'Not Found', path: req.path });
         });
       }

       return chain;
     }

     // 路径匹配（支持 :param 动态参数）
     _matchPath(pattern, pathname) {
       const paramNames = [];
       const regexStr = pattern
         .replace(/\*/g, '.*')
         .replace(/:([^/]+)/g, (_, name) => {
           paramNames.push(name);
           return '([^/]+)';
         });

       const regex = new RegExp(`^${regexStr}$`);
       const match = pathname.match(regex);
       if (!match) return null;

       const params = {};
       paramNames.forEach((name, i) => {
         params[name] = decodeURIComponent(match[i + 1]);
       });
       return params;
     }

     // ========== 洋葱模型中间件执行引擎 ==========
     // 核心思想：每个中间件接收 next()，调用 next() 将控制权交给下一个中间件
     // 下一个中间件完成后返回，形成"进入→离开"的洋葱结构
     _executeChain(chain, index, req, res) {
       return async () => {
         // 所有中间件已执行完毕
         if (index >= chain.length) return;

         const handler = chain[index];

         // ====== 关键：错误处理中间件识别 ======
         // Express 规范：4 个参数 (err, req, res, next) 的函数是错误处理中间件
         // 错误处理中间件只在发生错误时被调用
         if (handler.length === 4) {
           // 错误处理中间件在此处跳过（由 _handleError 统一调度）
           return this._executeChain(chain, index + 1, req, res)();
         }

         // 创建 next 函数：调用它将控制权交给下一个中间件
         const next = async (err) => {
           if (err) {
             // 如果传入了错误，跳过剩余正常中间件，查找错误处理中间件
             await this._dispatchError(chain, index + 1, err, req, res);
             return;
           }
           // 正常流程：执行下一个中间件
           await this._executeChain(chain, index + 1, req, res)();
         };

         try {
           await handler(req, res, next);
         } catch (err) {
           // 同步错误也通过错误处理管道
           await this._dispatchError(chain, index + 1, err, req, res);
         }
       };
     }

     // 查找并执行最近的错误处理中间件
     async _dispatchError(chain, startIndex, err, req, res) {
       for (let i = startIndex; i < chain.length; i++) {
         if (chain[i].length === 4) {  // 错误处理中间件（4个参数）
           const next = async (e) => {
             if (e) await this._dispatchError(chain, i + 1, e, req, res);
             else await this._executeChain(chain, i + 1, req, res)();
           };
           try {
             await chain[i](err, req, res, next);
           } catch (e) {
             await this._dispatchError(chain, i + 1, e, req, res);
           }
           return;
         }
       }
       // 没有找到错误处理中间件，使用默认处理
       this._handleError(err, req, res);
     }

     // 默认错误处理器
     _handleError(err, req, res) {
       if (res.headersSent) return;  // 响应已发送，无法修改
       const status = err.status || err.statusCode || 500;
       res.status(status).json({
         error: process.env.NODE_ENV === 'production'
           ? 'Internal Server Error'
           : err.message,
         stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
       });
     }

     // 收集请求体
     _collectBody(req) {
       return new Promise((resolve) => {
         let body = '';
         req.on('data', chunk => body += chunk);
         req.on('end', () => {
           try {
             req.body = JSON.parse(body);
           } catch {
             req.body = body;
           }
           resolve();
         });
       });
     }
   }

   // 导出
   module.exports = { MiniExpress, MiniRouter };
   ```

2. **完整使用示例**
   ```javascript
   const { MiniExpress, MiniRouter } = require('./mini-express');
   const app = new MiniExpress();

   // ========== ① 全局中间件 ==========
   // 日志中间件（记录所有请求）
   app.use((req, res, next) => {
     const start = Date.now();
     console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);

     // 在响应结束时打印耗时（洋葱模型"离开"阶段）
     res.on('finish', () => {
       console.log(`${req.method} ${req.path} → ${res.statusCode} (${Date.now() - start}ms)`);
     });
     next();
   });

   // CORS 跨域中间件
   app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     if (req.method === 'OPTIONS') return res.end('');
     next();
   });

   // 简易 JSON Body 解析中间件
   app.use(async (req, res, next) => {
     if (req.method !== 'GET' && req.method !== 'HEAD' && !req.body) {
       // body 已在 _collectBody 中预收集
     }
     next();
   });

   // ========== ② 路由定义 ==========
   // 基础路由
   app.get('/', (req, res) => {
     res.json({ message: 'Hello World!' });
   });

   // 动态参数路由 :id
   app.get('/users/:id', (req, res) => {
     // req.params.id 自动从 URL 提取
     res.json({ userId: req.params.id, query: req.query });
   });

   // 多参数路由
   app.get('/users/:userId/posts/:postId', (req, res) => {
     res.json({
       userId: req.params.userId,
       postId: req.params.postId
     });
   });

   // POST 路由
   app.post('/users', (req, res) => {
     res.status(201).json({ created: true, data: req.body });
   });

   // 通配符路由（兜底）
   app.get('*', (req, res) => {
     res.json({ message: '通配符匹配成功', path: req.path });
   });

   // ========== ③ 子路由挂载（use 方法）==========
   const apiRouter = new MiniRouter();

   // API 版本 v1 路由组
   apiRouter.get('/list', (req, res) => {
     res.json([{ id: 1, name: 'API V1 用户列表' }]);
   });

   apiRouter.post('/create', (req, res) => {
     res.status(201).json({ created: true, version: 'v1' });
   });

   apiRouter.get('/:id', (req, res) => {
     res.json({ id: req.params.id, version: 'v1' });
   });

   // 将路由组挂载到 /api/v1 前缀下
   app.use('/api/v1', apiRouter);

   // 另一组子路由
   const adminRouter = new MiniRouter();
   adminRouter.get('/dashboard', (req, res) => {
     res.json({ role: 'admin', data: '管理面板数据' });
   });
   app.use('/admin', adminRouter);

   // ========== ④ 错误处理中间件（必须放在最后！）==========
   // 四参数形式：(err, req, res, next)
   app.use((err, req, res, next) => {
     console.error('❌ 全局错误捕获:', err.message);

     // 根据错误类型返回不同状态码
     if (err.name === 'ValidationError') {
       return res.status(400).json({ error: '参数验证失败', details: err.message });
     }
     if (err.name === 'UnauthorizedError') {
       return res.status(401).json({ error: '未授权' });
     }

     // 默认 500
     res.status(500).json({
       error: '服务器内部错误',
       message: process.env.NODE_ENV === 'development' ? err.message : undefined
     });
   });

   // 自定义错误抛出测试
   app.get('/error-test', (req, res, next) => {
     const err = new Error('测试错误');
     err.status = 400;  // 自定义状态码
     next(err);  // 传递给错误处理中间件
   });

   // ========== ⑤ 启动服务器 ==========
   app.listen(3000);
   ```

3. **核心设计要点**
   ```javascript
   // ① 中间件签名：function(req, res, next) {}
   //    - next() 将控制权交给下一个中间件
   //    - 不调用 next() 则终止后续中间件执行

   // ② 洋葱模型执行顺序：
   //    中间件1进入 → 中间件2进入 → ... → 业务处理 → ... → 中间件2离开 → 中间件1离开

   // ③ 错误处理中间件识别：
   //    - function(err, req, res, next) {} ← 4个参数 = 错误处理
   //    - 必须放在正常中间件之后注册

   // ④ 路由参数：/users/:id → req.params.id
   // ⑤ 通配符：/api/* 匹配 /api 下所有路径
   // ⑥ 子路由：app.use('/prefix', router) 实现路由分组

   // ⑦ 链式调用：app.use(mw1).get('/', handler).post('/', handler2)
   ```

### 🔍 追问链
1. **如何实现路由缓存？**
   → 方向：LRU 缓存路由匹配结果；编译正则为函数避免重复解析；Trie 树前缀匹配优化
2. **如何支持 WebSocket 中间件？**
   → 方向：HTTP 升级检测（Upgrade 头）；WebSocket 握手协议；在中间件链中插入 upgrade 事件
3. **如何实现类似 Koa 的 async/await 洋葱模型？**
   → 方向：使用 Promise.compose；async 函数自动等待 next()；上下文对象 ctx 封装 req/res

> **追问链**：如何支持子路由（Router）？→ 如何实现 Express.Router()

---

## Q32: 手写一个 EventEmitter 类（符合 Node.js 规范）
- **难度**：★★★
- **知识点**：EventEmitter / 发布订阅模式 / 设计模式 / 源码实现
- **题型**：编程实践题

### 参考答案要点：

1. **完整实现（增强版：含 DOM 风格别名 + 完善的内存泄漏检测）**
   ```javascript
   // mini-event-emitter.js - 完整版 EventEmitter
   // 符合 Node.js EventEmitter 规范，额外提供 DOM 风格别名
   // 特性：maxListeners 限制、prependListener/prependOnceListener、
   //       listeners()/eventNames() 工具方法、内存泄漏警告、DOM 风格别名

   const { SymbolDispose, SymbolAsyncDispose } = globalThis;

   class MyEventEmitter {
     // 默认最大监听器数量（与 Node.js 原生一致）
     static defaultMaxListeners = 10;

     constructor() {
       this._events = new Map();      // 事件名称 -> 监听器数组
       this._maxListeners = 10;       // 当前实例的最大监听器数
       this._eventsCount = 0;        // 事件类型计数（用于快速判断）
       this._errorHandled = false;   // 是否已注册 error 监听器
     }

     // ==================== 核心注册方法 ====================

     /**
      * on / addEventListener - 注册事件监听器
      * @param {string} event - 事件名
      * @param {Function} listener - 监听函数
      * @returns {this} 支持链式调用
      */
     on(event, listener) {
       return this._addListener(event, listener, false);
     }

     /**
      * once / addEventListener(..., { once: true }) - 注册一次性监听器
      * 触发一次后自动移除
      */
     once(event, listener) {
       return this._addListener(event, listener, true);
     }

     /**
      * off / removeEventListener - 移除事件监听器
      */
     off(event, listener) {
       return this.removeListener(event, listener);
     }

     // ==================== 内部添加逻辑 ====================

     _addListener(event, listener, isOnce) {
       this._checkListenerType(listener);

       // 获取或创建该事件的监听器数组
       let listeners = this._events.get(event);

       if (!listeners) {
         listeners = [];
         this._events.set(event, listeners);
         this._eventsCount++;

         // 检查是否是 error 事件的第一个监听器
         if (event === 'error') {
           this._errorHandled = true;
         }
       } else {
        // ====== 内存泄漏警告机制 ======
        // 当单个事件的监听器数量超过 maxListeners 时发出警告
        // 这是 Node.js 原生 EventEmitter 的标准行为
        if (listeners.length >= this.getMaxListeners()) {
          this._emitWarning(
            `Possible EventEmitter memory leak detected. ${listeners.length + 1} ` +
            `${String(event)} listeners added to ${this.constructor ? this.constructor.name : 'MyEventEmitter'}. ` +
            `Use emitter.setMaxListeners() to increase limit`
          );
        }
       }

       // 创建包装对象，保存元信息
       const wrapper = {
         listener: listener,       // 原始监听函数
         rawListener: listener,    // 用于移除时的引用比对
         once: !!isOnce,          // 是否为一次性监听器
       };

       listeners.push(wrapper);
       return this;
     }

     _checkListenerType(listener) {
       if (typeof listener !== 'function') {
         throw new TypeError(
           `The "listener" argument must be of type Function. Received type ${typeof listener}`
         );
       }
     }

     // 内部内存泄漏警告（可被子类覆盖以自定义行为）
     _emitWarning(warning) {
       console.warn(warning);
     }

     // ==================== 移除监听器 ====================

     /**
      * removeListener - 移除指定监听器
      * @param {string} event - 事件名
      * @param {Function} listener - 要移除的函数引用
      */
     removeListener(event, listener) {
       const listeners = this._events.get(event);
       if (!listeners) return this;

       // 查找并移除匹配的监听器
       const index = listeners.findIndex(
         item => item.listener === listener || item.rawListener === listener
       );

       if (index !== -1) {
         // 如果正在遍历中移除，标记为待删除（避免跳过元素）
         if (this._isIterating) {
           listeners[index] = null;  // 延迟清理
         } else {
           listeners.splice(index, 1);
         }

         // 如果数组为空，清理事件条目
         if (listeners.length === 0 || listeners.every(item => item === null)) {
           this._events.delete(event);
           this._eventsCount--;
           if (event === 'error') this._errorHandled = false;
         }
       }

       return this;
     }

     /**
      * removeAllListeners - 移除所有监听器（或指定事件的所有监听器）
      * @param {string} [event] - 可选，指定事件名；不传则清空所有
      */
     removeAllListeners(event) {
       if (event) {
         // 只清除指定事件
         if (this._events.has(event)) {
           this._events.delete(event);
           this._eventsCount--;
           if (event === 'error') this._errorHandled = false;
         }
       } else {
         // 清空所有事件
         this._events.clear();
         this._eventsCount = 0;
         this._errorHandled = false;
       }
       return this;
     }

     // ==================== 事件触发 ====================

     /**
      * emit - 触发事件，执行所有已注册的监听器
      * @param {string} event - 事件名
      * @param {...any} args - 传递给监听器的参数
      * @returns {boolean} 是否有监听器处理了该事件
      */
     emit(event, ...args) {
       const listeners = this._events.get(event);

       // 没有该事件的监听器
       if (!listeners || listeners.length === 0) {
         // error 事件特殊处理：没有监听器时抛出异常（Node.js 规范）
         if (event === 'error') {
           const err = args.length > 0 && args[0] instanceof Error
             ? args[0]
             : new Error(`Unhandled error. ${args[0] instanceof Error ? args[0].message : args[0]}`);
           throw err;
         }
         return false;  // 表示没有监听器
       }

       // 处理 null 元素（之前延迟删除的）
       const activeListeners = listeners.filter(item => item !== null);

       // 标记正在迭代（用于安全删除）
       this._isIterating = true;

       try {
         // 按顺序执行每个监听器
         for (const wrapper of activeListeners) {
           try {
             // 执行监听函数，绑定 this 为当前 emitter
             wrapper.listener.apply(this, args);

             // 如果是一次性监听器，执行后自动移除
             if (wrapper.once) {
               this.removeListener(event, wrapper.rawListener);
             }
           } catch (err) {
             // 监听器内部抛出错误 → 触发 error 事件
             this.emit('error', err);
           }
         }
       } finally {
         this._isIterating = false;

         // 清理 null 元素（延迟删除的）
         if (this._events.has(event)) {
           const remaining = this._events.get(event).filter(item => item !== null);
           if (remaining.length === 0) {
             this._events.delete(event);
             this._eventsCount--;
           } else {
             this._events.set(event, remaining);
           }
         }
       }

       return true;  // 表示有监听器处理了事件
     }

     // ==================== 工具查询方法 ====================

     /**
      * listeners - 返回指定事件的所有监听器副本（原始函数数组）
      */
     listeners(event) {
       const arr = this._events.get(event);
       if (!arr) return [];
       return arr.filter(item => item !== null).map(item => item.rawListener);
     }

     /**
      * rawListeners - 返回包含元信息的监听器（包含 once 包装）
      */
     rawListeners(event) {
       const arr = this._events.get(event);
       if (!arr) return [];
       return arr.filter(item => item !== null).map(item => item.listener);
     }

     /**
      * listenerCount - 获取指定事件的监听器数量
      */
     listenerCount(event) {
       const arr = this._events.get(event);
       if (!arr) return 0;
       return arr.filter(item => item !== null).length;
     }

     /**
      * eventNames - 返回所有已注册的事件名数组
      */
     eventNames() {
       return Array.from(this._events.keys());
     }

     // ==================== maxListeners 管理 ====================

     /**
      * setMaxListeners - 设置此实例的最大监听器数量限制
      * @param {number} n - 最大数量（Infinity 表示不限制）
      */
     setMaxListeners(n) {
       if (typeof n !== 'number' || n < 0 || !Number.isFinite(n)) {
         throw new RangeError('The value of "n" is out of range. It must be a non-negative number.');
       }
       this._maxListeners = n;
       return this;
     }

     /**
      * getMaxListeners - 获取当前实例的最大监听器数量
      */
     getMaxListeners() {
       return this._maxListeners;
     }

     // 静态方法：设置所有 EventEmitter 实例的默认最大监听器数
     static setDefaultMaxListeners(n) {
       if (typeof n !== 'number' || n < 0 || !Number.isFinite(n)) {
         throw new RangeError('The value of "n" is out of range.');
       }
       MyEventEmitter.defaultMaxListeners = n;
     }

     static getDefaultMaxListeners() {
       return MyEventEmitter.defaultMaxListeners;
     }

     // ==================== Prepend 方法 ====================
     // 将监听器插入到队列头部（而非默认的尾部）

     /**
      * prependListener - 在头部添加普通监听器
      */
     prependListener(event, listener) {
       this._checkListenerType(listener);
       let arr = this._events.get(event);
       if (!arr) {
         arr = [];
         this._events.set(event, arr);
         this._eventsCount++;
       }
       arr.unshift({ listener, rawListener: listener, once: false });
       return this;
     }

     /**
      * prependOnceListener - 在头部添加一次性监听器
      */
     prependOnceListener(event, listener) {
       this._checkListenerType(listener);
       let arr = this._events.get(event);
       if (!arr) {
         arr = [];
         this._events.set(event, arr);
         this._eventsCount++;
       }
       arr.unshift({ listener, rawListener: listener, once: true });
       return this;
     }

     // ==================== DOM 风格别名 ====================
     // 兼容浏览器 addEventListener/removeEventListener API

     /**
      * addEventListener - DOM 风格的事件注册别名
      * 支持 options 参数：{ once: boolean, capture: boolean }
      */
     addEventListener(event, listener, options) {
       if (options && typeof options === 'object' && options.once) {
         return this.once(event, listener);
       }
       return this.on(event, listener);
     }

     /**
      * removeEventListener - DOM 风格的事件移除别名
      */
     removeEventListener(event, listener) {
       return this.off(event, listener);
     }

     // ==================== 辅助方法 ====================

     // 检查是否有指定事件的监听器
     hasListeners(event) {
       const arr = this._events.get(event);
       return !!arr && arr.some(item => item !== null);
     }

     // 获取事件总数（调试用）
     get eventCount() {
       return this._eventsCount;
     }
   }

   module.exports = MyEventEmitter;
   ```

2. **完整使用示例与测试**
   ```javascript
   const EventEmitter = require('./mini-event-emitter');
   const emitter = new EventEmitter();

   // ========== 基本功能测试 ==========

   // ① 基础 on / emit
   emitter.on('greet', (name) => console.log(`Hello, ${name}!`));
   emitter.emit('greet', 'World');  // → Hello, World!

   // ② once - 一次性监听器
   emitter.once('init', () => console.log('初始化完成（只执行一次）'));
   emitter.emit('init');  // → 初始化完成（只执行一次）
   emitter.emit('init');  // （无输出）

   // ③ 多监听器按序执行
   emitter.on('count', () => console.log('  监听器A'));
   emitter.on('count', () => console.log('  监听器B'));
   emitter.on('count', () => console.log('  监听器C'));
   emitter.emit('count');
   // → 监听器A → 监听器B → 监听器C

   // ④ 移除监听器
   const handler = () => console.log('我会被移除');
   emitter.on('test-remove', handler);
   emitter.off('test-remove', handler);
   emitter.emit('test-remove');  // （无输出）

   // ========== 错误处理 ==========
   // 必须监听 error 事件，否则未捕获的 error 会抛出异常导致崩溃
   emitter.on('error', (err) => console.error('✅ 错误已被捕获:', err.message));
   emitter.emit('error', new Error('测试错误'));  // → ✅ 错误已被捕获: 测试错误

   // ========== maxListeners 与内存泄漏警告 ==========
   console.log('\n--- 内存泄漏警告演示 ---');
   console.log('默认 maxListeners:', emitter.getMaxListeners());  // 10

   // 添加超过 10 个监听器会触发警告
   for (let i = 0; i <= 11; i++) {
     emitter.on('leak-test', () => {});
     // 第 11 次时会输出 Possible EventEmitter memory leak detected...
   }

   // 修改限制
   emitter.setMaxListeners(20);
   console.log('修改后 maxListeners:', emitter.getMaxListeners());  // 20

   // ========== prepend 系列方法 ==========
   console.log('\n--- prepend 测试 ---');
   emitter.prependListener('order', () => console.log('  [头部] 先注册但先执行'));
   emitter.on('order', () => console.log('  [尾部] 后注册后执行'));
   emitter.emit('order');
   // → [头部] 先注册但先执行
   // → [尾部] 后注册后执行

   // ========== 工具方法 ==========
   console.log('\n--- 工具方法 ---');
   console.log('eventNames():', emitter.eventNames());
   // → ['greet', 'count', 'leak-test', 'order', 'error'] 等
   console.log('listenerCount("leak-test"):', emitter.listenerCount('leak-test'));  // 12
   console.log('listeners("count"):', emitter.listeners('count').length);  // 3
   console.log('hasListeners("greet"):', emitter.hasListeners('greet'));  // true

   // removeAllListeners
   emitter.removeAllListeners('leak-test');
   console.log('removeAllListeners 后 count:', emitter.listenerCount('leak-test'));  // 0

   // ========== DOM 风格别名 ==========
   console.log('\n--- DOM 风格 API ---');
   const domStyle = new EventEmitter();

   domStyle.addEventListener('click', (e) => console.log('clicked!', e));
   domStyle.emit('click', { x: 100, y: 200 });  // → clicked! { x: 100, y: 200 }

   // DOM 的 { once: true } 选项
   domStyle.addEventListener('load', () => console.log('loaded!'), { once: true });
   domStyle.emit('load');  // → loaded!
   domStyle.emit('load');  // （无输出）

   domStyle.removeEventListener('click', /* handler */);

   // ========== 静态方法 ==========
   console.log('\n--- 静态方法 ---');
   console.log('全局默认值:', EventEmitter.getDefaultMaxListeners());  // 10
   EventEmitter.setDefaultMaxListeners(15);
   console.log('修改后:', EventEmitter.getDefaultMaxListeners());  // 15

   console.log('\n✅ 所有测试通过！');
   ```

3. **与原生 EventEmitter 的对比**
   ```javascript
   // 已实现的功能（与原生一致）：
   // ✅ on / off / once / emit
   // ✅ removeListener / removeAllListeners
   // ✅ setMaxListeners / getMaxListeners（含静态版本）
   // ✅ listeners / rawListeners / listenerCount / eventNames
   // ✅ prependListener / prependOnceListener
   // ✅ error 事件特殊处理（无监听器时抛出异常）
   // ✅ 内存泄漏警告（超过 maxListeners 时）
   // ✅ DOM 风格别名：addEventListener / removeEventListener（支持 { once } 选项）
   // ✅ emit 中同步错误的 error 事件转发
   // ✅ 迭代期间安全移除监听器

   // 原生额外功能（面试了解即可）：
   // - captureRejections 选项（Promise rejection 自动捕获）
   // - Symbol.for('nodejs.util.inspect.custom') 自定义检查
   // - emitter[Symbol.for('nodejs.eventemitter.maxlisteners')] 符号属性
   // - 更多边界情况处理（如特殊事件名、原型链污染防护等）
   ```

### 🔍 追问链
1. **如何实现异步事件触发？如何支持 async/await 监听器？**
   → 方向：将 emit 改为 async；收集 Promise.all 等待所有异步监听器完成；考虑超时控制
2. **如何在微前端/多框架场景中使用 EventEmitter？**
   → 方向：全局事件总线设计；命名空间隔离；跨 iframe 通信适配
3. **EventEmitter 如何结合 TypeScript 泛型做类型安全的发布订阅？**
   → 方向：定义事件映射接口 type Events = { click: { x: number }; data: string }；泛型约束事件名和参数类型

> **追问链**：如何实现异步事件触发？→ 如何支持 async/await 监听器？

---

## Q33: 手写 Promise.all / race / allSettled 实现
- **难度**：★★★
- **知识点**：Promise / 异步编程 / 并发控制 / 源码实现
- **题型**：编程实践题

### 参考答案要点：

1. **Promise.all 实现 — 全部 resolve 返回结果数组，任一 reject 则立即 reject**
   ```javascript
   /**
    * myPromiseAll - 所有 Promise 成功才成功，任一失败则立即失败
    *
    * 核心行为：
    * - 传入空数组 → 立即 resolve([])
    * - 全部完成 → resolve(结果数组)，保持原始顺序（与输入一一对应）
    * - 任一 reject → 立即 reject（不等待其他 Promise）
    * - 非 Promise 值 → 用 Promise.resolve() 包装后处理
    * - 微任务调度：通过 .then() 回调实现异步返回（符合规范）
    *
    * @param {Iterable} promises - Promise 可迭代对象
    * @returns {Promise<Array>} 新的 Promise 实例
    */
   function myPromiseAll(promises) {
     return new Promise((resolve, reject) => {
       // ① 边界情况：空数组立即 resolve
       // （注意：Promise.all([]) 是同步 resolve 的特例，但结果仍通过微任务返回）
       promises = Array.from(promises);  // 转为数组以便多次遍历

       if (promises.length === 0) {
         // 使用微任务模拟原生行为：resolve 在下一个微任务中执行
         Promise.resolve().then(() => resolve([]));
         return;
       }

       const results = new Array(promises.length);  // 预分配固定长度数组
       let completedCount = 0;                      // 已完成的计数器
       const total = promises.length;

       promises.forEach((promise, index) => {
         // ② 使用 Promise.resolve 包装每个元素
         // 支持非 Promise 值（数字、字符串、普通对象等）
         Promise.resolve(promise).then(
           value => {
             // ③ 按索引存入结果（保持顺序！这是关键！）
             results[index] = value;
             completedCount++;

             // ④ 全部完成时 resolve（使用微任务确保异步性）
             if (completedCount === total) {
               // 模拟微任务调度：将 resolve 推入微任务队列
               queueMicrotask ? queueMicrotask(() => resolve(results))
                               : Promise.resolve().then(() => resolve(results));
             }
           },
           // ⑤ 任一失败立即 reject（短路行为）
           reason => {
             reject(reason);
           }
         );
       });
     });
   }

   // ====== 基础使用示例 ======
   myPromiseAll([
     Promise.resolve(1),
     Promise.resolve(2),
     Promise.resolve(3)
   ]).then(console.log);  // [1, 2, 3]

   myPromiseAll([
     Promise.resolve('OK'),
     Promise.reject('出错了'),
     Promise.resolve('不会到达')
   ]).catch(console.error);  // '出错了'

   // 非Promise值自动包装
   myPromiseAll([1, 2, 3]).then(console.log);  // [1, 2, 3]
   ```

2. **Promise.race 实现 — 返回最快完成的 Promise 结果（竞态）**
   ```javascript
   /**
    * myPromiseRace - 返回最先 settled（完成或拒绝）的 Promise 结果
    *
    * 核心行为：
    * - 空数组 → 永远 pending（与原生一致！不会 resolve 也不会 reject）
    * - 第一个 settle（无论 fulfilled 还是 rejected）的结果就是最终结果
    * - 其他 Promise 的结果被忽略（但它们仍会继续执行，不会被取消）
    * - 典型应用：超时控制、多源竞速
    *
    * @param {Iterable} promises - Promise 可迭代对象
    * @returns {Promise} 最先完成的 Promise 的结果
    */
   function myPromiseRace(promises) {
     return new Promise((resolve, reject) => {
       promises = Array.from(promises);

       // 空数组：永远 pending（原生行为）
       if (promises.length === 0) {
         return;  // 不调用 resolve 也不调用 reject
       }

       promises.forEach(promise => {
         // 第一个 settle 的结果决定最终结果
         Promise.resolve(promise).then(
           value => resolve(value),   // 第一个成功 → resolve
           reason => reject(reason)   // 第一个失败 → reject
         );
       });
     });
   }

   // ====== 经典应用：请求超时控制 ======
   function fetchWithTimeout(url, ms = 5000) {
     return myPromiseRace([
       fetch(url),                                    // 实际请求
       new Promise((_, reject) =>                     // 超时定时器
         setTimeout(() => reject(new Error(`请求超时 (${ms}ms)`)), ms)
       )
     ]);
   }

   // 使用
   fetchWithTimeout('https://api.example.com/data', 3000)
     .then(res => res.json())
     .catch(err => console.error(err.message));

   // ====== 多源竞速：从多个 CDN 加载资源 ======
   function loadFromFastestCDN(urls) {
     return myPromiseRace(urls.map(url => fetch(url)));
   }
   ```

3. **Promise.allSettled 实现 — 等待全部完成，返回状态+结果/原因**
   ```javascript
   /**
    * myPromiseAllSettled - 等待所有 Promise 完成（无论成功或失败）
    *
    * 核心行为：
    * - 永远不会 reject！（这是与 all 的关键区别）
    * - 空数组 → resolve([])
    * - 每个 Promise 的结果包装为 { status: 'fulfilled' | 'rejected', value? | reason? }
    * - 保持输入顺序
    * - 适用场景：并行多个互不依赖的操作，需要知道每个的结果
    *
    * @param {Iterable} promises - Promise 可迭代对象
    * @returns {Promise<Array<{status, value?, reason?}>>}
    */
   function myPromiseAllSettled(promises) {
     return new Promise((resolve) => {
       promises = Array.from(promises);

       if (promises.length === 0) {
         Promise.resolve().then(() => resolve([]));
         return;
       }

       const results = new Array(promises.length);
       let completedCount = 0;
       const total = promises.length;

       promises.forEach((promise, index) => {
         Promise.resolve(promise).then(
           value => {
             results[index] = { status: 'fulfilled', value };
             checkComplete();
           },
           reason => {
             results[index] = { status: 'rejected', reason };
             checkComplete();
           }
         );
       });

       // 统一的完成检查函数
       function checkComplete() {
         completedCount++;
         if (completedCount === total) {
           // 微任务调度模拟
           queueMicrotask ? queueMicrotask(() => resolve(results))
                           : Promise.resolve().then(() => resolve(results));
         }
       }
     });
   }

   // ====== 使用示例 ======
   myPromiseAllSettled([
     Promise.resolve('✅ 成功'),
     Promise.reject('❌ 失败'),
     Promise.resolve('✅ 也成功')
   ]).then(console.log);
   // [
   //   { status: 'fulfilled', value: '✅ 成功' },
   //   { status: 'rejected', reason: '❌ 失败' },
   //   { status: 'fulfilled', value: '✅ 也成功' }
   // ]

   // 实际场景：批量操作后统计成功率
   async function batchRequest(urls) {
     const results = await myPromiseAllSettled(
       urls.map(url => fetch(url).then(r => r.json()))
     );

     const succeeded = results.filter(r => r.status === 'fulfilled');
     const failed = results.filter(r => r.status === 'rejected');

     console.log(`总计: ${results.length}, 成功: ${succeeded.length}, 失败: ${failed.length}`);
     return { data: succeeded.map(r => r.value), errors: failed.map(r => r.reason) };
   }
   ```

4. **微任务调度机制详解**
   ```javascript
   /**
    * 为什么 Promise 回调是"微任务"？
    *
    * JavaScript 事件循环中有两种异步队列：
    * - 微任务队列（Microtask Queue）：Promise.then/catch/finally, process.nextTick, queueMicrotask
    * - 宏任务队列（Macrotask Queue）：setTimeout, setInterval, setImmediate, I/O回调
    *
    * 执行时机差异：
    * 每个宏任务执行完后，会清空所有微任务，然后再取下一个宏任务
    *
    * 这就是为什么 Promise.all/race/allSettled 的回调总能在 setTimeout 之前执行
    */

   // ========== 微任务 vs 宏任务 对比演示 ==========
   console.log('=== 微任务调度演示 ===');

   console.log('1. 同步代码开始');

   // Promise 创建时，executor 是同步执行的
   const p = myPromiseAll([
     Promise.resolve('A'),
     Promise.resolve('B')
   ]);

   console.log('2. Promise.all 已创建（但 .then 回调尚未执行）');

   p.then(results => {
     console.log('4. Promise.all then 回调（微任务）:', results);
   });

   setTimeout(() => {
     console.log('5. setTimeout 回调（宏任务）');
   }, 0);

   console.log('3. 同步代码结束');

   // 执行顺序：
   // 1 → 2 → 3 → 4（微任务，在当前宏任务结束后立即执行）→ 5（下一个宏任务）

   // ========== 自定义微任务调度模拟 ==========
   // 如果环境不支持 queueMicrotask，可以用以下方式模拟
   function microtask(fn) {
     if (typeof queueMicrotask === 'function') {
       queueMicrotask(fn);
     } else {
       // 兼容方案：利用 Promise.resolve().then() 创建微任务
       Promise.resolve().then(fn);
     }
   }

   // 验证微任务优先级
   microtask(() => console.log('A: microtask'));
   setTimeout(() => console.log('B: macrotask (setTimeout)'), 0);
   // 输出：A → B（微任务总是先于同级的宏任务执行）
   ```

5. **完整测试套件**
   ```javascript
   // ========== 测试框架（简易版）==========
   async function runTests() {
     let passed = 0;
     let failed = 0;

     function test(name, fn) {
       fn()
         .then(() => { passed++; console.log(`  ✅ ${name}`); })
         .catch(err => { failed++; console.error(`  ❌ ${name}: ${err.message}`); });
     }

     function assert(condition, message) {
       if (!condition) throw new Error(message || '断言失败');
     }

     console.log('\n========== Promise.all 测试 ==========');

     test('空数组应返回 []', async () => {
       const result = await myPromiseAll([]);
       assert(Array.isArray(result) && result.length === 0, '应为空数组');
     });

     test('全部成功应返回有序结果', async () => {
       const result = await myPromiseAll([
         Promise.resolve(1),
         new Promise(r => setTimeout(() => r(2), 50)),
         Promise.resolve(3)
       ]);
       assert(result[0] === 1 && result[1] === 2 && result[2] === 3, '顺序或值不对');
     });

     test('任一失败应 reject', async () => {
       try {
         await myPromiseAll([
           Promise.resolve(1),
           Promise.reject('错误'),
           Promise.resolve(3)
         ]);
         throw new Error('应该抛出异常');
       } catch (e) {
         assert(e === '错误', `错误信息不匹配: ${e}`);
       }
     });

     test('非 Promise 值应自动包装', async () => {
       const result = await myPromiseAll([42, 'hello', null]);
       assert(result[0] === 42 && result[1] === 'hello' && result[2] === null);
     });

     console.log('\n========== Promise.race 测试 ==========');

     test('最快的成功应获胜', async () => {
       const result = await myPromiseRace([
         new Promise(r => setTimeout(() => r('慢'), 100)),
         Promise.resolve('快')
       ]);
       assert(result === '快');
     });

     test('最快的失败也应触发 reject', async () => {
       try {
         await myPromiseRace([
           new Promise(r => setTimeout(() => r('慢'), 100)),
           Promise.reject('快失败')
         ]);
         throw new Error('应该抛出异常');
       } catch (e) {
         assert(e === '快失败');
       }
     });

     console.log('\n========== Promise.allSettled 测试 ==========');

     test('永不 reject', async () => {
       const result = await myPromiseAllSettled([
         Promise.resolve('ok'),
         Promise.reject('fail')
       ]);
       assert(result.length === 2);
       assert(result[0].status === 'fulfilled' && result[0].value === 'ok');
       assert(result[1].status === 'rejected' && result[1].reason === 'fail');
     });

     test('混合类型保持顺序', async () => {
       const result = await myPromiseAllSettled([
         Promise.reject('a'),
         Promise.resolve('b'),
         Promise.reject('c')
       ]);
       assert(result[0].reason === 'a' && result[1].value === 'b' && result[2].reason === 'c');
     });

     console.log('\n========== 测试汇总 ==========');
     console.log(`通过: ${passed}, 失败: ${failed}, 总计: ${passed + failed}`);

     if (failed > 0) process.exit(1);
   }

   runTests();
   ```

6. **进阶：Promise 并发控制池**
   ```javascript
   /**
    * promisePool - 并发控制：同时最多运行 n 个 Promise
    *
    * 应用场景：限制同时发出的 HTTP 请求数量，避免打垮服务器
    *
    * @param {number} concurrency - 最大并发数
    * @param {Array<Function>} tasks - 任务数组（每个元素是返回 Promise 的函数）
    * @returns {Promise<Array>} 所有结果的数组（保持顺序）
    */
   async function promisePool(concurrency, tasks) {
     const results = [];
     const executing = new Set();  // 正在执行的 Promise 集合

     for (const task of tasks) {
       // 创建并启动任务
       const promise = task().then(result => {
         executing.delete(promise);  // 完成后从集合中移除
         return result;
       });

       executing.add(promise);
       results.push(promise);

       // 如果并发数已满，等待任意一个完成后再继续
       if (executing.size >= concurrency) {
         await Promise.race(executing);  // 等待最快完成的那个
       }
     }

     // 等待所有剩余的任务完成
     return Promise.all(results);
   }

   // 使用示例：最多同时 3 个请求
   const urls = Array(10).fill('https://api.example.com/data');
   const results = await promisePool(3, urls.map(url => () => fetch(url)));
   ```

### 🔍 追问链
1. **如何手写 Promise.any 和 Promise.finally？**
   → 方向：any = 取第一个 fulfilled（全部 rejected 才 AggregateError）；finally = 无论成败都执行的回调
2. **如何实现可取消的 Promise（AbortController 模式）？**
   → 方向：结合 AbortSignal；在 race 中检测 abort 事件；清理资源和订阅
3. **Promise.all 与 allSettled 的性能差异？何时选哪个？**
   → 方向：all 有短路优化（fail-fast）；allSettled 无短路需等全部；互不依赖选 allSettled

> **追问链**：如何实现 Promise.any 和 finally？→ ES2021 新特性

---

## Q34: 手写一个简单的模板引擎（支持变量替换和条件判断）
- **难度**：★★★
- **知识点**：模板引擎 / 字符串处理 / 正则表达式 / AST
- **题型**：编程实践题

### 参考答案要点：

1. **完整实现**
   ```javascript
   // mini-template-engine.js

   class TemplateEngine {
     constructor(options = {}) {
       this.options = {
         openTag: options.openTag || '{{',    // 开始标签
         closeTag: options.closeTag || '}}',  // 结束标签
         ...options
       };
     }

     // 渲染模板
     render(template, data) {
       // ① 处理条件判断 {{#if condition}}...{{/if}}
       template = this._processCondition(template, data);

       // ② 处理循环 {{#each items}}...{{/each}}
       template = this._processLoop(template, data);

       // ③ 处理变量替换 {{variable}}
       template = this._processVariables(template, data);

       return template;
     }

     // 变量替换
     _processVariables(template, data) {
       const { openTag, closeTag } = this.options;
       // 转义正则特殊字符
       const escapedOpen = openTag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
       const escapedClose = closeTag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

       const regex = new RegExp(`${escapedOpen}\\s*([^}]+?)\\s*${escapedClose}`, 'g');

       return template.replace(regex, (match, expr) => {
         // 支持嵌套属性：user.name
         const value = this._getNestedValue(expr.trim(), data);
         return value !== undefined ? value : '';
       });
     }

     // 条件判断
     _processCondition(template, data) {
       const { openTag, closeTag } = this.options;
       const ifRegex = new RegExp(
         `${openTag}\\s*#if\\s+(.+?)\\s*${closeTag}([\\s\\S]*?)${openTag}\\s*/if\\s*${closeTag}`,
         'g'
       );

       return template.replace(ifRegex, (match, condition, content) => {
         const value = this._getNestedValue(condition.trim(), data);
         return value ? content : '';  // truthy 则保留内容
       });
     }

     // 循环处理
     _processLoop(template, data) {
       const { openTag, closeTag } = this.options;
       const eachRegex = new RegExp(
         `${openTag}\\s*#each\\s+(.+?)\\s+as\\s+(\\w+)\\s*${closeTag}([\\s\\S]*?)${openTag}\\s*/each\\s*${closeTag}`,
         'g'
       );

       return template.replace(eachRegex, (match, arrayExpr, itemName, itemTemplate) => {
         const array = this._getNestedValue(arrayExpr.trim(), data);
         if (!Array.isArray(array)) return '';

         return array.map(item => {
           // 用 each 项作为上下文渲染
           return this._processVariables(itemTemplate, { ...data, [itemName]: item });
         }).join('');
       });
     }

     // 获取嵌套属性值（支持 user.name.address 这种形式）
     _getNestedValue(expr, data) {
       return expr.split('.').reduce((obj, key) => {
         return obj && obj[key] !== undefined ? obj[key] : undefined;
       }, data);
     }
   }

   module.exports = TemplateEngine;
   ```

2. **使用示例**
   ```javascript
   const engine = new TemplateEngine();

   const template = `
     <h1>{{title}}</h1>
     {{#if showGreeting}}
       <p>Hello, {{user.name}}!</p>
     {{/if}}
     <ul>
       {{#each items as item}}
         <li>{{item.name}} - ¥{{item.price}}</li>
       {{/each}}
     </ul>
   `;

   const data = {
     title: '商品列表',
     showGreeting: true,
     user: { name: '张三' },
     items: [
       { name: 'iPhone', price: 9999 },
       { name: 'MacBook', price: 14999 }
     ]
   };

   const html = engine.render(template, data);
   console.log(html);
   ```

3. **输出结果**
   ```html
   <h1>商品列表</h1>

     <p>Hello, 张三!</p>

   <ul>

         <li>iPhone - ¥9999</li>

         <li>MacBook - ¥14999</li>

   </ul>
   ```

4. **进阶功能扩展方向**
   ```javascript
   // ① 支持自定义过滤器
   // {{ price | currency }} → ¥9,999.00
   engine.registerFilter('currency', (value) => `¥${value.toLocaleString()}`);

   // ② 支持模板继承
   // {% extends "layout.html" %}
   // {% block content %}...{% endblock %}

   // ③ 支持注释
   {{-- 这是注释，不会被输出 --}}

   // ④ 支持局部模板（Partial）
   // {{> "./partials/header.html" }}
   ```

> **追问链**：如何将模板编译成函数以提高性能？→ Handlebars/Mustache 原理

---

## Q35: 设计一个 BFF（Backend For Frontend）层的架构
- **难度**：★★★
- **知识点**：BFF / 架构设计 / 微服务 / API 聚合 / 性能优化
- **题型**：架构设计题

### 参考答案要点：

1. **BFF 架构图**
   ```
   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
   │   Web App   │  │ Mobile App  │  │  Third Party │
   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
          │                │                │
          └────────┬───────┴────────────────┘
                   ▼
          ┌─────────────────┐
          │   BFF Layer     │  ← Node.js
          │  ┌───────────┐  │
          │  │ Web BFF   │  │  ← 为 Web 端定制
          │  ├───────────┤  │
          │  │Mobile BFF │  │  ← 为移动端定制
          │  └───────────┘  │
          └────────┬────────┘
                   │
          ┌────────┼────────┐
          ▼        ▼        ▼
   ┌──────────┐ ┌────────┐ ┌────────┐
   │ User Svc │ │Order Svc│ │Product │
   └──────────┘ └────────┘ └────────┘
   ```

2. **核心设计原则**
   ```javascript
   // 原则1：面向 UI 适配（不同端返回不同格式）
   // 原则2：聚合多个微服务的数据
   // 原则3：裁剪和转换数据（只返回前端需要的字段）
   // 原则4：协议适配（REST → GraphQL/gRPC）
   // 原则5：关注点分离（BFF 不包含业务逻辑）
   ```

3. **代码实现示例**
   ```javascript
   // bff-server.js

   const express = require('express');
   const axios = require('axios');
   const app = express();

   // ========== 服务配置 ==========
   const services = {
     userService: process.env.USER_SVC_URL || 'http://user-service:8001',
     orderService: process.env.ORDER_SVC_URL || 'http://order-service:8002',
     productService: process.env.PRODUCT_SVC_URL || 'http://product-service:8003'
   };

   // ========== 通用工具 ==========
   async function fetchService(serviceName, endpoint, params = {}) {
     const startTime = Date.now();
     try {
       const response = await axios.get(`${services[serviceName]}${endpoint}`, {
         params,
         timeout: 3000
       });
       
       // 日志记录
       console.log(`[${serviceName}] ${endpoint} - ${Date.now() - startTime}ms`);
       
       return response.data;
     } catch (error) {
       console.error(`[${serviceName}] 请求失败:`, error.message);
       throw error;
     }
   }

   // ========== Web BFF 路由 ==========
   // 场景：首页数据聚合
   app.get('/api/homepage', async (req, res) => {
     try {
       // 并行请求多个微服务
       const [user, recommendations, banners] = await Promise.all([
         fetchService('userService', `/users/${req.userId}/profile`),
         fetchService('productService', '/recommendations', { userId: req.userId }),
         fetchService('contentService', '/banners', { platform: 'web' })
       ]);

       // 数据裁剪和组装（只返回前端需要的字段）
       res.json({
         user: {
           id: user.id,
           name: user.name,
           avatar: user.avatarUrl
           // 不返回敏感信息如 phone、email
         },
         recommendations: recommendations.slice(0, 10),  // 只取前10条
         banners: banners.filter(b => b.active)  // 只要活跃的横幅
       });
     } catch (error) {
       res.status(502).json({ error: '上游服务不可用' });
     }
   });

   // ========== Mobile BFF 路由 ==========
   // 场景：移动端商品详情页（精简数据）
   app.get('/api/mobile/product/:id', async (req, res) => {
     try {
       const [product, reviews, inventory] = await Promise.all([
         fetchService('productService', `/products/${req.params.id}`),
         fetchService('reviewService', `/products/${req.params.id}/reviews`),
         fetchService('inventoryService', `/stock/${req.params.id}`)
       ]);

       // 移动端特有：精简数据、合并嵌套
       res.json({
         id: product.id,
         title: product.name,
         price: product.price,
         image: product.images[0],  // 只要首图
         rating: reviews.averageRating,
         stockStatus: inventory.quantity > 0 ? 'in_stock' : 'out_of_stock',
         // 移动端特有的字段
         shareText: `看看这款好物：${product.name}`
       });
     } catch (error) {
       res.status(502).json({ error: '服务暂时不可用' });
     }
   });

   // ========== 缓存策略 ==========
   const NodeCache = require('node-cache');
   const cache = new NodeCache({ stdTTL: 300 });  // 5分钟缓存

   app.get('/api/products', async (req, res) => {
     const cacheKey = `products_${req.query.category}_${req.query.page}`;
     
     // ① 先查缓存
     const cached = cache.get(cacheKey);
     if (cached) {
       return res.json(cached);
     }

     // ② 缓存未命中，请求后端
     const products = await fetchService('productService', '/products', req.query);
     
     // ③ 写入缓存
     cache.set(cacheKey, products);
     
     res.json(products);
   });

   // ========== 错误处理 ==========
   app.use((err, req, res, next) => {
     console.error('BFF Error:', err);
     res.status(err.status || 500).json({
       error: process.env.NODE_ENV === 'production'
         ? '服务器错误'
         : err.message
     });
   });

   app.listen(3000);
   ```

4. **关键技术决策**
   ```javascript
   // ① 数据聚合策略
   // - 并行请求（Promise.all）- 适用于无依赖的服务
   // - 串行请求（await 链）- 适用于有依赖的服务
   // - 竞速请求（Promise.race）- 适用于多源备份

   // ② 超时控制
   // - 每个上游服务设置独立超时
   // - 整体接口设置总超时
   // - 超时降级：返回部分数据或缓存数据

   // ③ 熔断机制
   // - 使用 opossum 等熔断器库
   // - 连续失败 N 次后熔断
   // - 半开启状态尝试恢复

   // ④ 监控指标
   // - 每个接口的响应时间
   // - 上游服务的成功率
   // - 缓存命中率
   ```

> **追问链**：如何设计 BFF 的灰度发布和 AB 测试？→ Q38

---

## Q36: 如何设计一个高并发的 Node.js 服务？（集群/负载均衡/缓存策略）
- **难度**：★★★
- **知识点**：高并发 / 集群 / 负载均衡 / 缓存 / 性能优化
- **题型**：架构设计题

### 参考答案要点：

1. **整体架构图**
   ```
                          ┌─────────────┐
                          │   Client    │
                          └──────┬──────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
             ┌──────────┐  ┌──────────┐  ┌──────────┐
             │   DNS    │  │  LVS/F5  │  │  CDN     │
             └────┬─────┘  └────┬─────┘  └────┬─────┘
                  └────────────┼────────────┘
                               ▼
                      ┌─────────────────┐
                      │   Nginx (LB)    │  ← 负载均衡
                      │  - Round Robin  │
                      │  - Least Conn  │
                      │  - IP Hash     │
                      └────────┬────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
       ┌────────────┐  ┌────────────┐  ┌────────────┐
       │ Node.js #1  │  │ Node.js #2  │  │ Node.js #N  │
       │ (Cluster)   │  │ (Cluster)   │  │ (Cluster)   │
       └─────┬──────┘  └─────┬──────┘  └─────┬──────┘
             └────────────────┼────────────────┘
                              ▼
                     ┌─────────────────┐
                     │   Redis Cluster │  ← 缓存 + Session
                     └─────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
       ┌──────────┐    ┌──────────┐    ┌──────────┐
       │ MySQL    │    │ MongoDB  │    │ Elastic  │
       │ (主从)   │    │ (分片)   │    │ Search   │
       └──────────┘    └──────────┘    └──────────┘
   ```

2. **Node.js 层优化**
   ```javascript
   // ① Cluster 模式（利用多核）
   const cluster = require('cluster');
   const os = require('os');

   if (cluster.isPrimary) {
     const cpuCount = os.cpus().length;
     for (let i = 0; i < cpuCount; i++) {
       cluster.fork();
     }
     // 自动重启...
   } else {
     require('./server');  // 启动应用
   }

   // ② 连接池配置
   const pool = mysql.createPool({
     connectionLimit: Math.floor(os.cpus().length * 5),  // 根据核心数调整
     waitForConnections: true,
     queueLimit: 0
   });

   // ③ 使用高性能框架
   // Fastify（比 Express 快 2-3 倍）
   const fastify = require('fastify')({ logger: true });
   ```

3. **Nginx 负载均衡配置**
   ```nginx
   upstream node_backend {
     server 127.0.0.1:3001;
     server 127.0.0.1:3002;
     server 127.0.0.1:3003;
     
     # 负载均衡策略
     least_conn;  # 最少连接（推荐）
     # ip_hash;    # 会话保持
   }

   server {
     listen 80;
     server_name api.example.com;

     location / {
       proxy_pass http://node_backend;
       
       # 关键配置
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
       proxy_cache_bypass $http_upgrade;
       
       # 超时设置
       proxy_connect_timeout 60s;
       proxy_send_timeout 60s;
       proxy_read_timeout 60s;
     }
   }
   ```

4. **缓存策略**
   ```javascript
   // 多级缓存架构
   // L1：进程内缓存（Node.js 内存）
   // L2：分布式缓存（Redis）
   // L3：CDN 缓存

   const NodeCache = require('node-cache');
   const localCache = new NodeCache({ stdTTL: 60 });  // 1分钟

   async function getData(key) {
     // ① 查本地缓存
     let data = localCache.get(key);
     if (data) return data;

     // ② 查 Redis 缓存
     data = await redis.get(key);
     if (data) {
       localCache.set(key, JSON.parse(data));  // 回填本地缓存
       return JSON.parse(data);
     }

     // ③ 查数据库
     data = await db.query(`SELECT * FROM table WHERE id = ?`, [key]);
     localCache.set(key, data);      // 写入本地缓存
     await redis.setex(key, 3600, JSON.stringify(data));  // 写入 Redis
     
     return data;
   }
   ```

5. **监控与告警**
   ```javascript
   // 使用 Prometheus + Grafana 监控
   const client = require('prom-client');

   const httpRequestDuration = new client.Histogram({
     name: 'http_request_duration_seconds',
     help: 'HTTP request duration',
     labelNames: ['method', 'route', 'code']
   });

   app.use((req, res, next) => {
     const start = Date.now();
     res.on('finish', () => {
       const duration = (Date.now() - start) / 1000;
       httpRequestDuration.observe(
         { method: req.method, route: req.path, code: res.statusCode },
         duration
       );
     });
     next();
   });
   ```

> **追问链**：如何设计服务的弹性伸缩？→ K8s HPA 配置

---

## Q37: Node.js 内存泄漏的常见原因和排查方法？
- **难度**：★★★
- **知识点**：内存泄漏 / 性能优化 / 调试工具 / V8 引擎
- **题型**：简答题 + 场景分析题

### 参考答案要点：

1. **常见内存泄漏原因**
   ```javascript
   // ① 全局变量泄漏
   // ❌ 错误：全局变量永远不会被回收
   var cache = {};  // 或 global.cache = {}
   function addUser(user) {
     cache[user.id] = user;  // 持续增长！
   }

   // ✅ 正确：使用 Map + WeakMap，或设置过期
   const cache = new Map();
   function addUser(user) {
     cache.set(user.id, user);
     // 定期清理或使用 TTL
   }

   // ② 事件监听器未移除
   // ❌ 错误：监听器累积
   setInterval(() => { /* ... */ }, 1000);  // 永远不会清除
   
   emitter.on('data', handler);  // 如果重复调用会叠加

   // ✅ 正确：保存引用以便移除
   function setup() {
     const handler = () => { /* ... */ };
     emitter.on('data', handler);
     return () => emitter.off('data', handler);  // 返回清理函数
   }
   const cleanup = setup();
   cleanup();  // 需要时清理

   // ③ 闭包泄漏
   // ❌ 错误：闭包持有大对象的引用
   function createHandler() {
     const largeData = new Array(1000000).fill('data');
     return function() {
       // 虽然没直接使用 largeData，但闭包链中仍引用它
       console.log('handler called');
     };
   }

   // ✅ 正确：手动释放不需要的引用
   function createHandler() {
     const largeData = new Array(1000000).fill('data');
     // 处理 largeData...
     largeData = null;  // 手动释放
     return function() {
       console.log('handler called');
     };
   }

   // ④ 缓存无限制增长
   // ❌ 错误：Map/Set 无限增长
   const results = new Map();
   async function query(sql) {
     if (!results.has(sql)) {
       results.set(sql, await db.query(sql));  // 持续增长！
     }
     return results.get(sql);
   }

   // ✅ 正确：LRU 缓存或限制大小
   const LRU = require('lru-cache');
   const cache = new LRU({ max: 1000, ttl: 1000 * 60 * 5 });
   ```

2. **排查方法**
   ```javascript
   // 方法1：使用 heapdump 生成快照
   // 启动时添加参数
   // node --inspect --heapsnapshot-signal=SIGUSR2 app.js
   
   // 发送信号生成快照
   // kill -USR2 <pid>
   
   // 然后用 Chrome DevTools 加载分析

   // 方法2：使用 Chrome DevTools 连接调试
   // node --inspect-brk=9229 app.js
   // 打开 chrome://inspect 连接

   // 方法3：使用 clinic.js（Node.js 官方诊断工具）
   // npm install -g clinic
   // clinic heapprofile -- on-node 'app.js'
   // 然后进行操作，结束后生成火焰图

   // 方法4：代码中监控内存
   setInterval(() => {
     const mem = process.memoryUsage();
     console.log({
       rss: `${Math.round(mem.rss / 1024 / 1024)} MB`,    // 常驻内存
       heapTotal: `${Math.round(mem.heapTotal / 1024 / 1024)} MB`,
       heapUsed: `${Math.round(mem.heapUsed / 1024 / 1024)} MB`,
       external: `${Math.round(mem.external / 1024 / 1024)} MB`
     });
   }, 10000);

   // 方法5：使用 v8 模块获取详细堆信息
   const v8 = require('v8');
   const heapSpaceStats = v8.getHeapSpaceStatistics();
   console.log(heapSpaceStats);
   ```

3. **V8 垃圾回收机制理解**
   ```javascript
   // V8 GC 分代：
   // - 新生代（Young Generation）：Scavenge 算法（ Cheney算法）
   //   - From 空间 → To 空间复制
   //   - 存活对象晋升到老生代
   // - 老生代（Old Generation）：Mark-Sweep-Compact
   //   - 标记-清除-整理
   //   - 全停顿（Stop-The-World）

   // 手动触发 GC（仅开发环境）
   if (global.gc) {
     global.gc();  // 需要 --expose-gc 参数启动
   }
   ```

> **追问链**：如何实现自动化的内存监控告警？→ Q43

### 🔍 追问链
1. **Cluster 模式的负载均衡策略是怎样的？**
   → 方向：默认 Round Robin（轮询）—— 除 Windows 外；Windows 使用共享 socket 的方式（由 OS 调度）；可配合 session affinity（sticky session）保证同一用户请求到同一 worker；Nginx upstream 也可做二次负载均衡
2. **多进程间如何共享状态？（Redis / Sticky Session）**
   → 方向：方案一：外部存储 Redis 共享 Session/缓存（推荐）；方案二：Sticky Session（IP Hash 保证同一用户到同一进程）；方案三：IPC 消息通信（master 进程广播状态变更）；避免使用进程内内存存储状态
3. **如何做 Node.js 服务的水平扩展？**
   → 方向：K8s HPA 基于 CPU/内存/自定义指标自动扩缩容；Pod 反亲和性避免单点故障；多可用区部署 + DNS 轮询；数据库读写分离 + 缓存层减轻 DB 压力；CDN 分担静态资源

---

## Q38: 设计一个完善的日志系统（分级/格式化/输出目标/采样）
- **难度**：★★★
- **知识点**：日志系统 / 架构设计 / 日志分级 / ELK Stack
- **题型**：架构设计题

### 参考答案要点：

1. **日志分级标准**
   ```javascript
   // 日志级别（从低到高）：
   const LOG_LEVELS = {
     debug: 0,    // 调试信息（开发环境）
     info: 1,     // 一般信息（正常运行）
     warn: 2,     // 警告（可能有问题）
     error: 3,    // 错误（功能受损）
     fatal: 4     // 致命错误（服务不可用）
   };

   // 生产环境建议最低级别：warn 或 info
   // 开发环境建议最低级别：debug
   ```

2. **完整日志系统实现**
   ```javascript
   // logger.js - 结构化日志系统

   const winston = require('winston');
   const { format, transports } = winston;

   // 自定义格式化
   const customFormat = format.combine(
     format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
     format.errors({ stack: true }),
     format.json(),
     format.printf(({ timestamp, level, message, meta }) => {
       return JSON.stringify({
         timestamp,
         level,
         message,
         ...meta,
         // 自动添加上下文
         pid: process.pid,
         hostname: require('os').hostname()
       });
     })
   );

   // 创建 Logger
   const logger = winston.createLogger({
     level: process.env.LOG_LEVEL || 'info',
     format: customFormat,
     defaultMeta: { service: 'my-api' },
     transports: [
       // 控制台输出（开发用）
       new transports.Console({
         format: format.combine(
           format.colorize(),
           format.simple()
         )
       }),
       // 文件输出（所有日志）
       new transports.File({
         filename: 'logs/error.log',
         level: 'error',
         maxsize: 5242880,  // 5MB
         maxFiles: 5
       }),
       new transports.File({
         filename: logs/combined.log',
         maxsize: 5242880,
         maxFiles: 10
       })
     ]
   });

   // 生产环境添加远程日志收集
   if (process.env.NODE_ENV === 'production') {
     // 发送到 ELK（Elasticsearch）
     const ElasticsearchTransport = require('winston-elasticsearch');
     logger.add(new ElasticsearchTransport({
       level: 'info',
       clientOpts: { node: 'http://elasticsearch:9200' },
       indexPrefix: 'my-app-logs'
     }));
   }

   // 请求日志中间件
   function requestLogger(req, res, next) {
     const startTime = Date.now();

     // 记录请求信息
     logger.info('HTTP Request', {
       method: req.method,
       url: req.url,
       userAgent: req.headers['user-agent'],
       ip: req.ip,
       requestId: req.id  // 请求追踪 ID
     });

     // 响应结束时记录
     res.on('finish', () => {
       const duration = Date.now() - startTime;
       logger.info('HTTP Response', {
         method: req.method,
         url: req.url,
         statusCode: res.statusCode,
         duration: `${duration}ms`,
         requestId: req.id
       });
     });

     next();
   }

   module.exports = { logger, requestLogger };
   ```

3. **日志采样（防止日志量过大）**
   ```javascript
   // 高频接口日志采样
   const sampler = {
     _counts: {},
     _lastReset: Date.now(),

     shouldLog(key, rate = 0.1) {
       // 每 10 个请求只记录 1 个
       this._counts[key] = (this._counts[key] || 0) + 1;

       // 每分钟重置计数
       if (Date.now() - this._lastReset > 60000) {
         this._counts = {};
         this._lastReset = Date.now();
       }

       return Math.random() < rate;
     }
   };

   // 使用示例
   app.use((req, res, next) => {
     if (sampler.shouldLog(`${req.method}:${req.url}`)) {
       logger.info('Sampled Request', { /* ... */ });
     }
     next();
   });
   ```

4. **结构化日志查询（ELK）**
   ```json
   // Kibana 查询示例：
   // 查找最近 1 小时的错误日志
   {
     "query": {
       "bool": {
         "must": [
           { "match": { "level": "error" } },
           { "range": { "timestamp": { "gte": "now-1h" } } }
         ]
       }
     }
   }

   // 查找响应时间超过 1s 的请求
   {
     "query": {
       "range": { "duration": { "gte": 1000 } }
     }
   }
   ```

> **追问链**：如何基于日志做告警和自动化处理？→ Sentry/Datadog 集成

---

## Q39: 如何实现一个大文件上传功能？（分片/断点续传/秒传）
- **难度**：★★★
- **知识点**：文件上传 / 分片上传 / 断点续传 / 秒传 / Stream
- **题型**：编程实践题

### 参考答案要点：

1. **整体流程图**
   ```
   客户端                              服务端
     │                                   │
     │  ① 计算文件 hash                   │
     │ ──────────────────────────────────▶│
     │                                   │  ② 检查是否已存在（秒传检查）
     │ ◀──────────────────────────────────│ 返回：已上传的分片列表
     │                                   │
     │  ③ 分片上传（并发）                │
     │ ──── chunk 1 ─────────────────────▶│
     │ ──── chunk 2 ─────────────────────▶│
     │ ──── chunk 3 ─────────────────────▶│
     │        ...                         │
     │                                   │  ④ 保存分片到临时目录
     │                                   │
     │  ⑤ 通知合并                       │
     │ ──────────────────────────────────▶│
     │                                   │  ⑥ 合并所有分片
     │                                   │  ⑦ 校验文件完整性
     │ ◀──────────────────────────────────│ 返回：文件 URL
   ```

2. **后端核心代码**
   ```javascript
   const express = require('express');
   const multer = require('multer');
   const fs = require('fs').promises;
   const path = require('path');
   const crypto = require('crypto');
   const app = express();

   const UPLOAD_DIR = path.join(__dirname, 'uploads');
   const TEMP_DIR = path.join(__dirname, 'temp');

   // ① 秒传检查：文件是否已存在
   app.post('/api/upload/check', async (req, res) => {
     const { fileHash, fileName, fileSize } = req.body;
     const filePath = path.join(UPLOAD_DIR, fileHash, fileName);

     try {
       // 检查文件是否已完全上传
       const stat = await fs.stat(filePath);
       if (stat.size === parseInt(fileSize)) {
         return res.json({
           uploaded: true,
           url: `/uploads/${fileHash}/${fileName}`
         });
       }
     } catch (e) {
       // 文件不存在，继续
     }

     // 检查已上传的分片
     const tempPath = path.join(TEMP_DIR, fileHash);
     let uploadedChunks = [];
     try {
       const chunks = await fs.readdir(tempPath);
       uploadedChunks = chunks.map(name => parseInt(name.split('-')[1]));
     } catch (e) {}

     res.json({
       uploaded: false,
       uploadedChunks  // 返回已上传的分片索引
     });
   });

   // ② 上传分片
   app.post('/api/upload/chunk', multer().single('chunk'), async (req, res) => {
     const { fileHash, chunkIndex } = req.body;
     const chunk = req.file;

     // 创建临时目录
     const tempPath = path.join(TEMP_DIR, fileHash);
     await fs.mkdir(tempPath, { recursive: true });

     // 保存分片
     const chunkPath = path.join(tempPath, `chunk-${chunkIndex}`);
     await fs.rename(chunk.path, chunkPath);

     res.json({ success: true, chunkIndex });
   });

   // ③ 合并分片
   app.post('/api/upload/merge', async (req, res) => {
     const { fileHash, fileName, totalChunks, fileSize } = req.body;
     const tempPath = path.join(TEMP_DIR, fileHash);
     const finalDir = path.join(UPLOAD_DIR, fileHash);
     const finalPath = path.join(finalDir, fileName);

     await fs.mkdir(finalDir, { recursive: true });

     // 创建写入流
     const writeStream = fs.createWriteStream(finalPath);

     // 按顺序合并分片
     for (let i = 0; i < totalChunks; i++) {
       const chunkPath = path.join(tempPath, `chunk-${i}`);
       const chunkBuffer = await fs.readFile(chunkPath);
       writeStream.write(chunkBuffer);
     }

     writeStream.end();

     // 等待写入完成
     await new Promise(resolve => writeStream.on('finish', resolve));

     // 校验文件大小
     const stat = await fs.stat(finalPath);
     if (stat.size !== parseInt(fileSize)) {
       await fs.unlink(finalPath);  // 删除不完整的文件
       return res.status(400).json({ error: '文件校验失败' });
     }

     // 清理临时分片
     await fs.rm(tempPath, { recursive: true });

     res.json({
       success: true,
       url: `/uploads/${fileHash}/${fileName}`
     });
   });
   ```

3. **前端上传逻辑（简化版）**
   ```javascript
   class Uploader {
     constructor(file, options = {}) {
       this.file = file;
       this.chunkSize = options.chunkSize || 2 * 1024 * 1024;  // 2MB
       this.concurrency = options.concurrency || 3;  // 并发数
       this.uploadedChunks = [];
       this.fileHash = null;
     }

     // 计算 MD5（用于秒传）
     async calculateHash() {
       return new Promise(resolve => {
         const reader = new FileReader();
         reader.readAsArrayBuffer(this.file);
         reader.onload = async () => {
           const hashBuffer = await crypto.subtle.digest('SHA-256', reader.result);
           const hashArray = Array.from(new Uint8Array(hashBuffer));
           this.fileHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
           resolve(this.fileHash);
         };
       });
     }

     // 检查秒传
     async checkUpload() {
       const res = await fetch('/api/upload/check', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           fileHash: this.fileHash,
           fileName: this.file.name,
           fileSize: this.file.size
         })
       });
       return res.json();
     }

     // 上传单个分片
     async uploadChunk(index) {
       const start = index * this.chunkSize;
       const end = Math.min(start + this.chunkSize, this.file.size);
       const chunk = this.file.slice(start, end);

       const formData = new FormData();
       formData.append('chunk', chunk);
       formData.append('fileHash', this.fileHash);
       formData.append('chunkIndex', index);

       const res = await fetch('/api/upload/chunk', {
         method: 'POST',
         body: formData
       });
       return res.json();
     }

     // 并发控制上传
     async upload() {
       await this.calculateHash();
       const checkResult = await this.checkUpload();

       if (checkResult.uploaded) {
         console.log('秒传成功！');
         return checkResult.url;
       }

       // 已有的分片不需要重新上传
       this.uploadedChunks = checkResult.uploadedChunks || [];
       const totalChunks = Math.ceil(this.file.size / this.chunkSize);

       // 找出需要上传的分片
       const needUpload = [];
       for (let i = 0; i < totalChunks; i++) {
         if (!this.uploadedChunks.includes(i)) {
           needUpload.push(i);
         }
       }

       // 并发上传
       const pool = new PromisePool(this.concurrency);
       await Promise.all(
         needUpload.map(index => pool.exec(() => this.uploadChunk(index)))
       );

       // 通知合并
       const mergeRes = await fetch('/api/upload/merge', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           fileHash: this.fileHash,
           fileName: this.file.name,
           totalChunks,
           fileSize: this.file.size
         })
       });
       return mergeRes.json();
     }
   }
   ```

4. **安全注意事项**
   ```javascript
   // ① 文件类型验证
   const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
   const ALLOWED_EXTENSIONS = ['.jpg', '.png', '.pdf'];

   // ② 文件大小限制
   const MAX_FILE_SIZE = 100 * 1024 * 1024;  // 100MB

   // ③ 文件名消毒（防止路径遍历）
   function sanitizeFileName(name) {
     return path.basename(name)
       .replace(/[^a-zA-Z0-9._-]/g, '_')
       .substring(0, 255);
   }

   // ④ 病毒扫描（生产环境建议集成 ClamAV）
   ```

> **追问链**：如何实现上传进度条和断点恢复？→ 前端状态管理

### 🔍 追问链
1. **文件 Hash 计算如何不阻塞主线程？（Web Worker / Stream hash）**
   → 方向：浏览器端使用 Web Worker 在后台线程计算 SHA-256（crypto.subtle.digest）；服务端使用 Stream 模式分块读取+增量计算 hash（避免 fs.readFile 全量加载）；SparkMD5 库支持流式 MD5 计算
2. **断点续传的记录应该存储在哪里更可靠？**
   → 方向：IndexedDB（浏览器端，大容量、异步、持久化，优于 localStorage 的 5MB 限制和同步阻塞）；localStorage 仅适合小量元数据（文件名、总大小）；服务端记录最可靠但需额外 API；推荐 IndexedDB 存断点信息 + 服务端校验双重保障
3. **秒传的完整流程是什么？**
   → 方向：①客户端计算文件完整 hash → ②发送 hash 给服务端检查是否已存在 → ③存在则直接返回 URL（秒传成功）→ ④不存在则返回已上传的分片列表 → ⑤客户端跳过已有分片继续上传剩余分片 → ⑥全部完成后通知合并 → ⑦服务端校验文件完整性（hash + size）；关键点：hash 算法需前后端一致

---

## Q40: Node.js 服务的优雅关闭（Graceful Shutdown）怎么实现？
- **难度**：★★★
- **知识点**：优雅关闭 / 进程管理 / 信号处理 / 连接清理
- **题型**：编程实践题

### 参考答案要点：

1. **为什么需要优雅关闭？**
   ```javascript
   // ❌ 直接 kill -9（强制终止）的问题：
   // - 正在处理的请求会失败（客户端收到 ECONNRESET）
   // - 数据库连接未关闭 → 可能数据丢失或连接池泄漏
   // - 文件操作可能损坏（写入到一半被截断）
   // - 客户端收到错误而非正常响应
   // - 健康检查可能还未标记为不健康 → 负载均衡器继续转发流量
   // - Redis/MQ 等中间件的连接未释放
   ```

2. **核心实现（完整版：含请求计数器 + 数据库/Redis清理 + 定时器清理）**
   ```javascript
   // graceful-shutdown.js - Node.js 服务完整版优雅关闭方案
   //
   // 核心流程：
   // 1. 收到 SIGTERM/SIGINT 信号
   // 2. 立即标记服务为"正在关闭"状态
   // 3. 停止接受新请求（server.close()）
   // 4. 等待进行中的请求完成（计数器 + 超时强制关闭）
   // 5. 关闭数据库连接池、Redis 连接等外部资源
   // 6. 清理所有定时器和 interval
   // 7. 进程退出

   const http = require('http');

   class GracefulShutdown {
     /**
      * @param {http.Server} server - HTTP 服务器实例
      * @param {Object} options - 配置选项
      * @param {number} options.timeout - 最大等待时间（毫秒），默认 30000
      * @param {boolean} options.forceExit - 超时后是否强制退出，默认 true
      */
     constructor(server, options = {}) {
       this.server = server;
       this.timeout = options.timeout || 30000;    // 默认30秒超时
       this.forceExit = options.forceExit !== false; // 默认超时强制退出

       // ====== 状态追踪 ======
       this.isShuttingDown = false;           // 是否正在关闭
       this.shutdownStartTime = 0;            // 关闭开始时间戳
       this.activeConnections = new Set();     // 活跃的 TCP 连接集合
       this.inFlightRequests = new Map();      // 进行中的 HTTP 请求（socket → 请求信息）
       this.cleanupCallbacks = [];             // 自定义清理回调数组
       this.timers = new Set();                // 需要清理的定时器 ID 集合

       // 初始化各模块
       this._setupSignalHandlers();
       this._trackConnections();
       this._setupHealthCheck();
     }

     // ==================== 公共 API ====================

     /**
      * onCleanup - 注册资源清理回调
      * 按注册顺序依次执行，支持 async 函数
      * @param {Function} callback - 清理函数（可以是异步函数）
      */
     onCleanup(callback) {
       if (typeof callback !== 'function') {
         throw new TypeError('callback must be a function');
       }
       this.cleanupCallbacks.push({
         name: callback.name || 'anonymous',
         fn: callback,
         executed: false,        // 是否已执行
         error: null              // 执行时的错误
       });
       return this;  // 支持链式调用
     }

     /**
      * registerTimer - 注册需要清理的定时器
      * 用于追踪 setInterval / setTimeout，关闭时自动清除
      * @param {number} timerId - 定时器 ID
      */
     registerTimer(timerId) {
       this.timers.add(timerId);
       return timerId;
     }

     /**
      * getStats - 获取当前状态统计（用于监控和调试）
      */
     getStats() {
       return {
         isShuttingDown: this.isShuttingDown,
         activeConnections: this.activeConnections.size,
         inFlightRequests: this.inFlightRequests.size,
         pendingTimers: this.timers.size,
         registeredCleanupCallbacks: this.cleanupCallbacks.length,
         uptime: this.isShuttingDown ? Date.now() - this.shutdownStartTime : null
       };
     }

     // ==================== 信号处理 ====================

     _setupSignalHandlers() {
       // SIGTERM - Docker/K8s 发送的默认终止信号（最常用）
       process.on('SIGTERM', () => this._handleSignal('SIGTERM'));

       // SIGINT - 用户按 Ctrl+C 时发送
       process.on('SIGINT', () => this._handleSignal('SIGINT'));

       // 可选：处理 SIGHUP（配置重载）— 通常不退出而是重载配置
       // process.on('SIGHUP', () => { /* 重载配置 */ });
     }

     _handleSignal(signal) {
       // 防止重复触发
       if (this.isShuttingDown) {
         console.log(`⚠️ 已在关闭中，忽略重复的 ${signal} 信号`);
         return;
       }
       this.shutdown(signal);
     }

     // ==================== 连接追踪 ====================

     /**
      * 追踪所有活跃的 TCP 连接和进行中的 HTTP 请求
      *
      * 为什么需要两层追踪？
      * - activeConnections: TCP 层面的连接（一个连接可以承载多个 HTTP 请求）
      * - inFlightRequests: 应用层面的请求（用于精确等待业务逻辑完成）
      */
     _trackConnections() {
       // ① 追踪每个新的 TCP 连接
       this.server.on('connection', (socket) => {
         // 如果已经在关闭中，直接拒绝新连接
         if (this.isShuttingDown) {
           socket.end('HTTP/1.1 503 Service Unavailable\r\nConnection: close\r\n\r\n');
           return;
         }

         const connInfo = {
           socket,
           createdAt: Date.now(),
           remoteAddress: socket.remoteAddress,
           requestCount: 0  // 该连接上的请求数
         };

         this.activeConnections.add(connInfo);

         // 监听连接关闭事件
         socket.on('close', () => {
           this.activeConnections.delete(connInfo);
           this.inFlightRequests.delete(socket);
         });

         // 监听连接错误
         socket.on('error', (err) => {
           console.error('Socket 错误:', err.message);
           this.activeConnections.delete(connInfo);
         });
       });

       // ② 通过中间件追踪进行中的请求
       // （需要在应用层配合使用 requestTracker 中间件）
     }

     /**
      * requestTracker - HTTP 请求追踪中间件
      * 使用方式：app.use(gracefulShutdown.requestTracker)
      */
     requestTracker(req, res, next) {
       const socket = req.socket;

       // 如果已在关闭中且不是健康检查请求，返回 503
       if (this.isShuttingDown && req.url !== '/health') {
         res.setHeader('Connection', 'close');
         res.status(503).json({ error: 'Server is shutting down' });
         return;
       }

       // 记录请求开始
       const reqInfo = {
         method: req.method,
         url: req.url,
         startedAt: Date.now()
       };
       this.inFlightRequests.set(socket, reqInfo);

       // 请求结束时移除记录
       res.on('finish', () => {
         this.inFlightRequests.delete(socket);
       });

       next();
     }

     // ==================== 健康检查端点 ====================

     _setupHealthCheck() {
       // 创建内置的健康检查路由
       // 注意：这需要与实际框架集成，此处仅展示思路
       this._healthCheckHandler = (req, res) => {
         if (req.url === '/health' && req.method === 'GET') {
           const stats = this.getStats();
           const status = stats.isShuttingDown ? 503 : 200;
           res.writeHead(status, { 'Content-Type': 'application/json' });
           res.end(JSON.stringify({
             status: status === 200 ? 'ok' : 'shutting_down',
             ...stats,
             timestamp: new Date().toISOString()
           }));
           return true;  // 表示已处理
         }
         return false;  // 未处理
       };
     }

     // ==================== 核心关闭逻辑 ====================

     /**
      * shutdown - 执行完整的优雅关闭流程
      * @param {string} signal - 触发关闭的信号名称
      */
     async shutdown(signal) {
       this.isShuttingDown = true;
       this.shutdownStartTime = Date.now();

       console.log('\n' + '='.repeat(60));
       console.log(`🛑 收到 ${signal} 信号，开始优雅关闭...`);
       console.log(`   时间: ${new Date().toISOString()}`);
       console.log(`   活跃连接: ${this.activeConnections.size}`);
       console.log(`   进行中的请求: ${this.inFlightRequests.size}`);
       console.log('='.repeat(60));

       // ========== 第一步：停止接受新连接 ==========
       // server.close() 会：
       // - 停止监听端口
       // - 不再接受新的 TCP 连接
       // - 但已有的连接仍可正常工作
       await new Promise((resolve) => {
         this.server.close(() => {
           console.log('✅ [1/5] HTTP 服务器已停止接受新连接');
           resolve();
         });
         // 如果服务器已经关闭（防御性编程）
         if (!this.server.listening) {
           resolve();
         }
       });

       // ========== 第二步：设置超时保护 ==========
       let forceExitTimer = null;
       if (this.timeout > 0) {
         forceExitTimer = setTimeout(() => {
           console.error(`\n⏰ [!!] 超时 (${this.timeout}ms)，准备${this.forceExit ? '强制' : '跳过'}退出`);
           console.error(`   剩余连接: ${this.activeConnections.size}`);
           console.error(`   剩余请求: ${this.inFlightRequests.size}`);

           if (this.forceExit) {
             this._forceExit('timeout');
           }
         }, this.timeout);
       }

       try {
         // ========== 第三步：通知客户端并等待进行中的请求完成 ==========
         // 向所有活跃连接发送 "Connection: close" 头
         // 提示客户端此连接即将关闭
         for (const conn of this.activeConnections) {
           try {
             // 不直接销毁连接，而是让现有请求完成后自然关闭
             // 如果连接空闲超过阈值，则主动断开
             const idleTime = Date.now() - conn.createdAt;
             if (idleTime > 5000) {  // 空闲超过5秒的连接直接关闭
               conn.socket.end();
             } else {
               // 设置短超时，让正在进行的请求有时间完成
               conn.socket.setTimeout(5000, () => {
                 conn.socket.destroy();  // 强制销毁
               });
             }
           } catch (e) {
             // 忽略单个连接的错误
           }
         }

         // 等待进行中的请求完成（轮询检测）
         if (this.inFlightRequests.size > 0 || this.activeConnections.size > 0) {
           console.log(`⏳ [2/5] 等待 ${this.inFlightRequests.size} 个请求完成...`);
           await this._waitForPendingRequests();
           console.log('✅ [2/5] 所有请求已处理完毕');
         } else {
           console.log('✅ [2/5] 无待处理的请求');
         }

         // ========== 第四步：执行自定义清理回调 ==========
         console.log(`🧹 [3/5] 执行 ${this.cleanupCallbacks.length} 个清理回调...`);
         for (const cb of this.cleanupCallbacks) {
           try {
             const start = Date.now();
             await cb.fn();
             cb.executed = true;
             console.log(`   ✅ "${cb.name}" 完成 (${Date.now() - start}ms)`);
           } catch (err) {
             cb.error = err;
             console.error(`   ❌ "${cb.name}" 出错:`, err.message);
           }
         }
         console.log('✅ [3/5] 所有清理回调执行完毕');

         // ========== 第五步：清理定时器 ==========
         this._clearAllTimers();
         console.log('✅ [4/5] 定时器已清理');

         // ========== 第六步：最终确认与退出 ==========
         if (forceExitTimer) clearTimeout(forceExitTimer);

         const totalDuration = Date.now() - this.shutdownStartTime;
         console.log('\n' + '='.repeat(60));
         console.log(`✅ 优雅关闭完成！总耗时: ${totalDuration}ms`);
         console.log(`   退出码: 0`);
         console.log('='.repeat(60) + '\n');

         process.exit(0);

       } catch (err) {
         console.error('\n❌ 关闭过程中发生异常:', err);
         this._forceExit('error');
       }
     }

     /**
      * 等待进行中的请求完成（带超时）
      */
     _waitForPendingRequests(maxWait = 10000) {
       const startTime = Date.now();
       return new Promise((resolve) => {
         const check = () => {
           // 所有请求都完成了
           if (this.inFlightRequests.size === 0 && this.activeConnections.size === 0) {
             resolve();
             return;
           }

           // 超时检查
           if (Date.now() - startTime > maxWait) {
             console.warn(`   ⚠️ 等待超时 (${maxWait}ms)，剩余 ${this.inFlightRequests.size} 个请求`);
             resolve();
             return;
           }

           // 继续等待（每 100ms 检查一次）
           setTimeout(check, 100);
         };
         check();
       });
     }

     /**
      * 清理所有注册的定时器
      */
     _clearAllTimers() {
       if (this.timers.size === 0) return;

       let cleared = 0;
       for (const timerId of this.timers) {
         try {
           clearTimeout(timerId);
           clearInterval(timerId);
           cleared++;
         } catch (e) {
           // 忽略无效的 timer ID
         }
       }
       this.timers.clear();
       if (cleared > 0) {
         console.log(`   已清理 ${cleared} 个定时器`);
       }
     }

     /**
      * 强制退出
      */
     _forceExit(reason) {
       console.error(`\n💥 强制退出原因: ${reason}`);
       process.exit(1);
     }
   }

   module.exports = GracefulShutdown;
   ```

3. **完整生产级使用示例**
   ```javascript
   // app.js - 完整的生产环境启动文件

   const http = require('http');
   const mysql = require('mysql2/promise');
   const Redis = require('ioredis');
   const GracefulShutdown = require('./graceful-shutdown');

   // ========== 1. 创建 HTTP 服务器 ==========
   function handleRequest(req, res) {
     // 模拟一个耗时的请求（测试优雅关闭时的等待行为）
     if (req.url === '/slow') {
       setTimeout(() => {
         res.writeHead(200, { 'Content-Type': 'application/json' });
         res.end(JSON.stringify({ message: '慢请求完成！' }));
       }, 5000);  // 5秒完成
       return;
     }

     res.writeHead(200, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Hello World!' }));
   }

   const server = http.createServer(handleRequest);

   // ========== 2. 外部资源初始化 ==========
   // MySQL 连接池
   const dbPool = mysql.createPool({
     host: process.env.DB_HOST || 'localhost',
     user: process.env.DB_USER || 'root',
     password: process.env.DB_PASSWORD || '',
     database: process.env.DB_NAME || 'mydb',
     waitForConnections: true,
     connectionLimit: 10,
     queueLimit: 0
   });

   // Redis 连接
   const redis = new Redis({
     host: process.env.REDIS_HOST || 'localhost',
     port: 6379,
     retryStrategy: null  // 优雅关闭时不自动重连
   });

   // ========== 3. 注册需要清理的定时器 ==========
   const graceful = new GracefulShutdown(server, {
     timeout: 30000,      // 30秒总超时
     forceExit: true      // 超时后强制退出
   });

   // 示例：一个定期执行的定时任务
   const cleanupTimer = setInterval(async () => {
     // 定期清理过期数据...
     console.log('[定时任务] 执行清理...');
   }, 60 * 60 * 1000);  // 每小时执行一次
   graceful.registerTimer(cleanupTimer);

   // 另一个示例：心跳检测定时器
   const heartbeatTimer = setInterval(() => {
     redis.ping().then(() => console.log('[心跳] Redis 正常'));
   }, 30000);
   graceful.registerTimer(heartbeatTimer);

   // ========== 4. 注册清理回调（按顺序执行）==========

   // 4a. 停止接收新任务
   graceful.onCleanup(async () => {
     console.log('→ 停止接收新任务...');
     // 可以在这里设置一个标志位，让业务逻辑不再接受新工作
   });

   // 4b. 关闭数据库连接池
   graceful.onCleanup(async () => {
     console.log('→ 正在关闭数据库连接池...');
     await dbPool.end();  // 等待所有查询完成并关闭连接
     console.log('  ✅ 数据库连接池已关闭');
   });

   // 4c. 关闭 Redis 连接
   graceful.onCleanup(async () => {
     console.log('→ 正在关闭 Redis 连接...');
     await redis.quit();
     console.log('  ✅ Redis 连接已关闭');
   });

   // 4d. 刷新日志缓冲区
   graceful.onCleanup(async () => {
     console.log('→ 正在刷新日志...');
     // await logger.flush();  // 如果有日志系统的话
     console.log('  ✅ 日志已刷新');
   });

   // 4e. 上报关闭状态到监控系统
   graceful.onCleanup(async () => {
     console.log('→ 上报关闭状态...');
     // await metrics.report('shutdown');  // Prometheus/Grafana 等
     console.log('  ✅ 状态已上报');
   });

   // ========== 5. 启动服务器 ==========
   server.listen(3000, () => {
     console.log('✅ 服务器运行在 http://localhost:3000');
     console.log('   按 Ctrl+C 或发送 SIGTERM 触发优雅关闭\n');

     // 测试用：打印当前状态
     console.log('当前状态:', JSON.stringify(graceful.getStats(), null, 2));
   });

   // ========== 6. 错误兜底 ==========
   process.on('uncaughtException', (err) => {
     console.error('❌ 未捕获异常:', err.message);
     graceful.shutdown('uncaughtException');
   });

   process.on('unhandledRejection', (reason) => {
     console.error('❌ 未处理的 Promise rejection:', reason);
   });
   ```

4. **Docker / Kubernetes 配合**
   ```dockerfile
   # Dockerfile — 关键点：使用 tini 作为 PID 1
   FROM node:18-alpine

   # 安装 tini（轻量级 init 系统，正确转发信号给子进程）
   RUN apk add --no-cache tini

   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .

   # ⚠️ 必须使用 tini，否则信号无法正确传递给 Node.js 进程
   ENTRYPOINT ["tini", "--"]
   CMD ["node", "app.js"]
   ```

   ```yaml
   # k8s deployment.yaml — 优雅关闭关键配置
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: my-api
   spec:
     replicas: 3
     template:
       spec:
         containers:
         - name: my-api
           image: my-api:v1.0.0
           ports:
           - containerPort: 3000
           # ====== 生命周期钩子 ======
           lifecycle:
             # preStop: K8s 在发送 SIGTERM 之前先执行这个命令
             # 给 pod 一段"缓冲期"，让它从 service 的 endpoint 中摘除
             preStop:
               exec:
                 command: ["/bin/sh", "-c", "sleep 10"]  # 等待10秒让 LB 更新
           # ====== 就绪探针 ======
           # 关闭期间返回非 200，LB 自动摘除流量
           readinessProbe:
             httpGet:
               path: /health
               port: 3000
             initialDelaySeconds: 5
             periodSeconds: 5
           # ====== 存活探针 ======
           livenessProbe:
             httpGet:
               path: /health
               port: 3000
             initialDelaySeconds: 15
             periodSeconds: 20
         # ====== 优雅终止宽限期 ======
         # 这个值应该 > preStop sleep + 应用关闭所需时间
         terminationGracePeriodSeconds: 40  # 总共给 40 秒
   ```

5. **PM2 生态支持**
   ```javascript
   // ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'my-api',
       script: 'app.js',
       instances: 'max',          // 根据 CPU 核心数自动决定
       exec_mode: 'cluster',      // Cluster 模式

       // PM2 优雅关闭配置
       kill_timeout: 30000,       // 发送 SIGTERM 后等待 30 秒
       wait_ready: true,          // 等待 ready 信号
       listen_timeout: 10000,     // 监听超时
       max_memory_restart: '512M', // 内存超限时自动重启

       // PM2 Cluster 模式下，SIGTERM 会转发给所有 worker
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   };

   // 启动命令
   // pm2 start ecosystem.config.js
   // pm2 logs                    # 查看日志
   // pm2 monit                   # 监控面板
   // pm2 reload all              # 零停机重启（逐个重启 worker）
   ```

### 🔍 追问链
1. **如何在滚动更新期间保证零停机？**
   → 方向：K8s RollingUpdate + maxSurge/maxUnavailable；蓝绿部署；Canary 发布；preStop + readinessProbe 配合
2. **Cluster 模式下如何保证所有 Worker 都正确关闭？**
   → 方向：PM2 的 reload 命令（逐个重启）；master 进程转发信号给 workers；worker.disconnect() 先断开
3. **如何设计关闭前的"排水"(Drain)模式？**
   → 方向：先标记 draining 状态；health 返回 503；LB 摘除流量；等待 in-flight 请求完成后再真正关闭

> **追问链**：如何在滚动更新期间保证零停机？→ K8s RollingUpdate 策略

---

## Q41: Docker 部署 Node.js 服务的最佳实践？
- **难度**：★★★
- **知识点**：Docker / 容器化 / 镜像优化 / 安全 / DevOps
- **题型**：场景设计题

### 参考答案要点：

1. **优化的 Dockerfile**
   ```dockerfile
   # ========== 多阶段构建 ==========
   
   # 阶段1：依赖安装
   FROM node:18-alpine AS deps
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci --only=production && npm cache clean --force
   # 使用 ci 而不是 install（更快更安全）

   # 阶段2：构建
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package.json package-lock.json ./
   COPY . .
   RUN npm ci && npm run build  # TypeScript 编译等

   # 阶段3：运行镜像（最小化）
   FROM node:18-alpine AS runner
   WORKDIR /app

   # 安全：创建非 root 用户
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nodejs

   # 从阶段2复制构建产物
   COPY --from=builder ./dist ./dist
   # 从阶段1复制依赖
   COPY --from=deps ./node_modules ./node_modules

   USER nodejs

   EXPOSE 3000

   # 健康检查
   HEALTHCHECK --interval=30s --timeout=3s \
     CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

   CMD ["node", "dist/index.js"]
   ```

2. **.dockerignore 配置**
   ```
   node_modules
   npm-debug.log
   dist
   .env
   .git
   .vscode
   *.md
   coverage
   .nyc_output
   ```

3. **生产环境关键配置**
   ```javascript
   // Docker Compose 示例
   version: '3.8'
   services:
     api:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - PORT=3000
       restart: unless-stopped
       resources:
         limits:
           cpus: '1.0'
           memory: 512M
         reservations:
           memory: 256M
       healthcheck:
         test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/health"]
         interval: 30s
         timeout: 3s
         retries: 3
         start_period: 10s
       logging:
         driver: json-file
         options:
           max-size: "10m"
           max-file: "3"
   ```

4. **性能优化技巧**
   ```bash
   # ① 使用 Alpine 镜像（体积小 ~50MB vs ~350MB）
   # ② 多阶段构建（最终镜像只包含运行时需要的文件）
   # ③ npm ci 替代 npm install（确定性安装，更快）
   # ④ 利用 Docker 层缓存（先复制 package.json）
   # ⑤ 设置 NODE_ENV=production（不安装 devDependencies）
   # ⑥ 启用 V8 优化标志
   ```

   ```javascript
   // V8 优化标志
   // 在启动脚本前添加
   node --max-old-space-size=512 \  // 限制 V8 堆内存
        --optimize-for-size \      // 内存优化
        --gc-interval=100 \        // GC 间隔
        dist/index.js
   ```

5. **安全最佳实践**
   ```dockerfile
   # ① 使用非 root 用户运行
   # ② 最小化基础镜像（Alpine）
   # ③ 不在镜像中存储敏感信息（使用 secrets/volumes）
   # ④ 定期更新基础镜像（安全补丁）
   # ⑤ 扫描漏洞（trivy/grype）
   # ⑥ 只暴露必要端口
   ```

> **追问链**：如何实现 CI/CD 流水线？→ GitHub Actions/Jenkins

---

## Q42: 如何做 Node.js 服务的性能监控和告警？
- **难度**：★★★
- **知识点**：性能监控 / APM / Prometheus / Grafana / 告警
- **题型**：架构设计题

### 参考答案要点：

1. **监控指标体系**
   ```javascript
   // ========== RED 方法（推荐用于微服务）==========
   // R - Rate（请求速率）：每秒请求数
   // E - Errors（错误率）：失败请求占比
   // D - Duration（延迟）：请求响应时间

   // ========== USE 方法（用于资源监控）==========
   // U - Utilization（利用率）：资源忙碌时间占比
   // S - Saturation（饱和度）：排队等待的工作量
   // E - Errors（错误数）：错误发生的频率
   ```

2. **Prometheus + Grafana 方案**
   ```javascript
   // metrics.js - Prometheus 指标采集

   const client = require('prom-client');

   // 自定义指标
   const httpRequestsTotal = new client.Counter({
     name: 'http_requests_total',
     help: 'Total HTTP requests',
     labelNames: ['method', 'route', 'status']
   });

   const httpRequestDuration = new client.Histogram({
     name: 'http_request_duration_seconds',
     help: 'HTTP request duration in seconds',
     labelNames: ['method', 'route'],
     buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5]
   });

   const activeConnections = new client.Gauge({
     name: 'active_connections',
     help='Number of active connections'
   });

   const eventLoopLag = new client.Gauge({
     name: 'event_loop_lag_seconds',
     help: 'Event loop lag in seconds'
   });

   // 中间件：采集 HTTP 指标
   function metricsMiddleware(req, res, next) {
     const start = Date.now();
     activeConnections.inc();

     res.on('finish', () => {
       const duration = (Date.now() - start) / 1000;
       
       httpRequestsTotal.inc({
         method: req.method,
         route: req.route?.path || req.path,
         status: res.statusCode
       });
       
       httpRequestDuration.observe({
         method: req.method,
         route: req.route?.path || req.path
       }, duration);
       
       activeConnections.dec();
     });

     next();
   }

   // 事件循环监控
   function monitorEventLoop() {
     let lastTime = process.hrtime.bigint();
     
     setInterval(() => {
       const now = process.hrtime.bigint();
       const lag = Number(now - lastTime) / 1e9 - 1;  // 减去 1 秒间隔
       eventLoopLag.set(lag > 0 ? lag : 0);
       lastTime = now;
     }, 1000);
   }

   // V8 内存监控
   function monitorMemory() {
     const heapUsed = new client.Gauge({
       name: 'node_heap_used_bytes',
       help: 'V8 heap used size in bytes'
     });

     setInterval(() => {
       const mem = process.memoryUsage();
       heapUsed.set(mem.heapUsed);
     }, 5000);
   }

   module.exports = {
     metricsMiddleware,
     register: client.register,
     monitorEventLoop,
     monitorMemory
   };
   ```

3. **Grafana Dashboard 配置**
   ```yaml
   # 关键面板配置：
   
   # 面板1：QPS（每秒请求数）
   # 查询: rate(http_requests_total[1m])
   
   # 面板2：P99 延迟
   # 查询: histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))
   
   # 面板3：错误率
   # 查询: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100
   
   # 面板4：事件循环延迟
   # 查询: event_loop_lag_seconds
   
   # 面板5：堆内存使用
   # 查询: node_heap_used_bytes
   ```

4. **告警规则**
   ```yaml
   # prometheus/alerts.yml
   groups:
   - name: nodejs-alerts
     rules:
     # P99 延迟超过 500ms
     - alert: HighLatency
       expr: histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) > 0.5
       for: 5m
       labels:
         severity: warning
       annotations:
         summary: "API 响应延迟过高"
         description: "P99 延迟超过 500ms"

     # 错误率超过 1%
     - alert: HighErrorRate
       expr: |
         (
           sum(rate(http_requests_total{status=~"5.."}[5m]))
           /
           sum(rate(http_requests_total[5m]))
         ) * 100 > 1
       for: 5m
       labels:
         severity: critical
       annotations:
         summary: "错误率过高"
         description: "错误率超过 1%"

     # 事件循环阻塞
     - alert: EventLoopBlocked
       expr: event_loop_lag_seconds > 0.1
       for: 2m
       labels:
         severity: warning
       annotations:
         summary: "事件循环阻塞"
         description: "事件循环延迟超过 100ms"
   ```

5. **APM 工具选型**
   ```javascript
   // 商业方案：
   // - Datadog（全功能，价格较高）
   // - New Relic（老牌 APM）
   // - Sentry（专注错误追踪，免费额度大）
   
   // 开源方案：
   // - Jaeger（分布式追踪）
   // - Prometheus + Grafana（指标监控）
   // - ELK Stack（日志分析）
   
   // 推荐：开源组合（成本可控）
   // Prometheus（指标）+ Grafana（可视化）+ Jaeger（追踪）+ AlertManager（告警）
   ```

> **追问链**：如何实现分布式链路追踪？→ OpenTelemetry 实现

---

## Q43: Node.js 新版本（LTS/Current）的特性有哪些值得关注？
- **难度**：★★★
- **知识点**：Node.js 版本 / 新特性 / LTS 策略 / 升级指南
- **题型**：简答题

### 参考答案要点：

1. **Node.js 版本策略**
   ```
   版本类型说明：
   - Current（当前版本）：最新功能，每 6 个月发布一个新版本号
   - LTS（长期支持）：稳定版本，支持 30 个月（Active 18个月 + Maintenance 12个月）
   - Maintenance（维护期）：仅修复 bug 和安全漏洞，不接受新特性

   当前（2026年）重要版本：
   - Node.js 20.x / 22.x（Active LTS）
   - Node.js 18.x（Maintenance）
   ```

2. **近年重要新特性**

   **Node.js 18+ 新特性**
   ```javascript
   // ① 全局 fetch API（无需 node-fetch）
   const response = await fetch('https://api.example.com/data');
   const data = await response.json();

   // ② Test Runner（内置测试框架）
   import { test, describe, it } from 'node:test';
   import assert from 'node:assert/strict';

   describe('我的模块', () => {
     it('应该返回正确结果', () => {
       assert.strictEqual(myFunc(1, 2), 3);
     });
   });

   // ③ 内置 WebSocket（实验性）
   // import { WebSocket } from 'node:ws';  // 未来版本
   ```

   **Node.js 20+ 新特性**
   ```javascript
   // ① URL 支持 load() 方法
   const url = new URL('./data.json', import.meta.url);
   const data = await load(url);

   // ② 权限模型（实验性）
   // node --experimental-permission allow-fs-read=/tmp/ app.js

   // ③ ESM 稳定化改进
   // --experimental-specifier-resolution=node 改进导入解析
   ```

   **Node.js 22+ 新特性**
   ```javascript
   // ① V8 Maglev 编译器（性能提升）
   // 默认启用，热点函数编译更快

   // ② stream.compose 工具方法
   const { compose } = require('stream');
   const pipeline = compose(source, transform, destination);

   // ③ 改进的 AbortController 支持
   const controller = new AbortController();
   setTimeout(() => controller.abort(), 5000);
   fetch(url, { signal: controller.signal });
   ```

3. **升级建议与兼容性检查**
   ```bash
   # 检查项目依赖的 Node.js 版本
   npx nve

   # 使用 nvm 管理 Node.js 版本
   nvm install --lts          # 安装最新 LTS
   nvm use 20                  # 使用指定版本
   nvm alias default 20        # 设为默认版本

   # 使用 Volta（项目级版本管理）
   volta install node@20
   ```

4. **值得关注的前沿特性**
   ```javascript
   // ① Opus 模块（ECMAScript Modules 的增强）
   // - 同步加载 CommonJS
   // - 更好的 TypeScript 支持

   // ② Source Map V3 支持
   // 更好的调试体验

   // ③ 稳定的网络 API
   // - fetch 全局可用
   // - Blob/File API
   // - FormData
   // - navigator.userAgentData
   ```

> **追问链**：如何平滑升级生产环境的 Node.js 版本？→ 蓝绿部署/金丝雀发布

---

## Q44: Bun/Deno 与 Node.js 的对比和选型？
- **难度**：★★★
- **知识点**：Bun / Deno / Runtime 对比 / 技术选型
- **题型**：对比分析题

### 参考答案要点：

1. **三大 JavaScript 运行时对比**

| 特性 | Node.js | Deno | Bun |
|------|---------|------|-----|
| **发布时间** | 2009 | 2018 | 2021 |
| **底层引擎** | V8 | V8 (Rust 绑定) | JavaScriptCore (Zig) |
| **语言支持** | JS / TS（需编译） | 原生 TS / JS | 原生 TS / JSX |
| **包管理** | npm + node_modules | URL 导入 / deno.land | 兼容 npm |
| **权限模型** | 无（完全访问） | **沙箱（显式授权）** | 可选沙箱 |
| **内置工具** | 需要额外安装 | 格式化/lint/test/... | 内置全部 |
| **性能** | 基准 | 较慢（启动慢） | **最快（号称 3-4x）** |
| **生态兼容** | ★★★★★ | ★★★（需适配） | ★★★★（大部分兼容）|
| **稳定性** | ★★★★★ | ★★★★ | ★★★（较新）|

2. **Deno 特点详解**
   ```typescript
   // Deno 特色功能：

   // ① 安全默认（需要显式授权）
   // deno run --allow-net --allow-read server.ts

   // ② URL 导入（无需 node_modules）
   import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

   // ③ 内置 TypeScript（无需编译步骤）
   interface User {
     id: number;
     name: string;
   }

   // ④ 标准库完善
   // deno.land/std 提供高质量的标准库

   // ⑤ 兼容 Node.js（逐步改善）
   // deno compat 模式可运行许多 Node.js 包
   ```

3. **Bun 特点详解**
   ```javascript
   // Bun 特色功能：

   // ① 极快的速度（内置 everything）
   bun install    // 比 npm/yarn 快 10-20x
   bun run        // 比 npm run 快 10x+
   bun build      // 内置打包器（替代 esbuild/webpack）

   // ② 原生 TypeScript/JSX 支持
   // 无需配置即可运行 TSX 文件
   bun run app.tsx

   // ③ 兼容 Node.js API
   // 大部分 Node.js 代码可直接运行
   const http = require('http');  // ✅ 支持 CJS
   import { readFileSync } from 'fs';  // ✅ 支持 ESM

   // ④ 内置 SQLite（数据库零配置）
   const db = Database.open("mydb.sqlite");
   db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)");

   // ⑤ 内置测试框架
   // test("加法", () => {
   //   expect(add(1, 2)).toBe(3);
   // });
   ```

4. **选型建议**
   ```javascript
   // 选择 Node.js 当你需要：
   // - 成熟稳定的生态系统（npm 包数量最多）
   // - 企业级支持和社区资源
   // - 团队已有大量 Node.js 经验
   // - 需要广泛的第三方库支持
   // - 长期维护的项目

   // 选择 Deno 当你需要：
   // - 安全优先的应用（沙箱执行）
   // - 原生 TypeScript 开发体验
   // - 简单的工具/脚本（内置工具链）
   // - 学习目的（现代 JS 运行时概念）
   // - 后端边缘计算（Deno Deploy）

   // 选择 Bun 当你需要：
   // - 极致性能（启动速度、运行速度）
   // - 全栈统一运行时（Web/API/Scripting）
   // - 快速原型开发（开箱即用）
   // - 替代复杂的 webpack/esbuild 构建流程
   // - SQLite 嵌入式应用
   ```

5. **迁移考虑**
   ```javascript
   // Node.js → Bun 迁移：
   // - 大部分代码可以直接运行
   // - 注意：某些 Node.js 特有 API 可能不支持
   // - 测试覆盖很重要！

   // Node.js → Deno 迁移：
   // - 需要适配 ES Module（不支持 CJS require）
   // - 使用 deno compat 模式缓解
   // - 包导入方式改变（URL 导入）
   ```

> **追问链**：Edge Runtime（边缘运行时）的发展趋势？→ Cloudflare Workers/Vercel Edge

---

## Q45: Edge Computing（边缘计算）在 Node.js 中的应用？
- **难度**：★★★
- **知识点**：边缘计算 / Serverless / Edge Functions / Vercel / Cloudflare
- **题型**：架构设计题

### 参考答案要点：

1. **什么是边缘计算？**
   ```javascript
   // 传统模式：
   // Client → DNS → CDN（静态资源）→ Origin Server（动态内容）
   // 问题：用户距离服务器远，延迟高

   // 边缘计算模式：
   // Client → Edge Location（全球分布）→ 动态执行代码 → Origin（如需要）
   // 优势：代码在离用户最近的节点执行，延迟极低
   ```

2. **主流 Edge 平台对比**

| 平面 | 运行时 | 冷启动 | 限制 | 适用场景 |
|------|--------|--------|------|----------|
| **Vercel Edge** | 基于 V8 | < 50ms | 无 DOM，有限 API | Next.js 应用 |
| **Cloudflare Workers** | V8 Isolate | 0ms | 128MB 内存，CPU 时间限制 | API/BFF/AUTH |
| **AWS Lambda@Edge** | Node.js | 较慢 | 128MB 内存 | CloudFront 增强 |
| **Deno Deploy** | Deno | 快 | 沙箱环境 | Deno 应用 |

3. **Edge Functions 实战**
   ```javascript
   // ========== Vercel Edge Middleware ==========
   // middleware.ts（Next.js 项目）

   import { NextResponse } from 'next/server';
   import type { NextRequest } from 'next/server';

   export function middleware(request: NextRequest) {
     // ① A/B 测试
     const variant = Math.random() > 0.5 ? 'A' : 'B';
     
     // ② 地理位置路由
     const country = request.geo?.country;
     if (country === 'CN') {
       return NextResponse.rewrite(new URL('/zh', request.url));
     }

     // ③ 认证检查（JWT 验证）
     const token = request.cookies.get('auth-token');
     if (!token) {
       return NextResponse.redirect(new URL('/login', request.url));
     }

     // ④ 请求重写/修改
     const response = NextResponse.next();
     response.headers.set('x-variant', variant);
     return response;
   }

   export const config = {
     matcher: ['/dashboard/:path*', '/api/:path*']
   };
   ```

   ```javascript
   // ========== Cloudflare Worker ==========
   // worker.js

   export default {
     async fetch(request, env) {
       // ① 解析请求
       const url = new URL(request.url);
       
       // ② KV 存储（边缘键值存储）
       const value = await env.MY_KV.get(url.pathname);
       if (value) {
         return new Response(value, {
           headers: { 'CF-Cache-Status': 'HIT' }
         });
       }

       // ③ 调用上游服务
       const response = await fetch(request);
       
       // ④ 缓存响应
       const cloned = response.clone();
       ctx.waitUntil(env.MY_KV.put(url.pathname, cloned.body, { expirationTtl: 3600 }));

       return response;
     }
   };
   ```

4. **Node.js 代码适配 Edge 的注意事项**
   ```javascript
   // ⚠️ Edge 环境的限制：
   
   // ❌ 不能使用的：
   // - Node.js 原生模块（fs, path, crypto 等）
   // - C++ addons（.node 文件）
   // - 部分 npm 包（依赖 Node.js API）
   // - 长时间运行的进程
   // - 大量内存操作

   // ✅ 可以使用的：
   // - Web 标准 API（fetch, Response, Request）
   // - ES Module（import/export）
   // - 部分 polyfill（@edge-runtime/format 等）
   // - 边缘平台提供的 KV/DO/R2/D1 存储

   // 解决方案：条件导入
   let getDb;
   if (process.env.NEXT_RUNTIME === 'edge') {
     // Edge 环境：使用远程 API
     getDb = () => fetch('https://api.example.com/db').then(r => r.json());
   } else {
     // Node.js 环境：直连数据库
     getDb = () => require('./db').connect();
   }
   ```

5. **适用场景选择**
   ```javascript
   // ✅ 适合放在 Edge 的：
   // - 身份认证/鉴权（JWT 验证、Session 检查）
   // - A/B 测试/灰度发布
   // - 地理位置路由/国际化
   // - 请求预处理/转换
   // - 静态内容的动态个性化
   // - Bot 检测/防护
   // - 重定向/URL 重写

   // ❌ 不适合放在 Edge 的：
   // - 复杂的业务逻辑
   // - 数据库密集型操作
   // - 长时间运行的任务
   // - 需要文件系统的操作
   // - 机器学习推理（除非很轻量）
   ```

> **追问链**：如何设计混合架构（Edge + Origin）？→ BFF + Edge Middleware

---

## Q46: WebAssembly (Wasm) 在 Node.js中的应用前景？
- **难度**：★★★
- **知识点**：WebAssembly / Wasm / 性能优化 / Rust / 跨语言
- **题型**：简答题 + 场景设计题

### 参考答案要点：

1. **Wasm 简介**
   ```javascript
   // WebAssembly (Wasm) 是一种二进制指令格式
   // 特点：
   // - 近原生性能（接近 C/C++/Rust 速度）
   // - 安全（沙箱执行，内存隔离）
   // - 跨平台（一次编译，到处运行）
   // - 小体积（二进制格式紧凑）
   // - 与 JavaScript 互操作
   ```

2. **Node.js 中的 Wasm 支持**
   ```javascript
   // Node.js 内置 Wasm 支持（v14+）
   const fs = require('fs').promises;

   async function loadWasm() {
     // ① 加载 Wasm 文件
     const wasmBuffer = await fs.readFile('module.wasm');
     
     // ② 编译和实例化
     const wasmModule = await WebAssembly.compile(wasmBuffer);
     const instance = await WebAssembly.instantiate(wasmModule, {
       imports: {
         // 导入 JavaScript 函数供 Wasm 调用
         log: (value) => console.log('[Wasm]:', value),
         math_sqrt: Math.sqrt
       }
     });

     // ③ 调用 Wasm 导出的函数
     const result = instance.exports.compute(42);
     console.log(result);

     return instance;
   }

   loadWasm();
   ```

3. **典型应用场景**

   **场景一：CPU 密集型任务加速**
   ```rust
   // lib.rs - 用 Rust 编写高性能模块
   use wasm_bindgen::prelude::*;

   #[wasm_bindgen]
   pub fn fibonacci(n: u64) -> u64 {
     match n {
       0 => 0,
       1 => 1,
       _ => fibonacci(n - 1) + fibonacci(n - 2),
     }
   }

   #[wasm_bindgen]
   pub fn image_process(image_data: Vec<u8>) -> Vec<u8> {
     // 图像处理算法...
     processed_data
   }
   ```

   ```javascript
   // Node.js 中调用 Rust Wasm
   const { fibonacci, image_process } = require('../pkg/my_lib.js');

   async function main() {
     // 初始化 Wasm（异步）
     await default();

     // 调用 Rust 函数（性能比 JS 快 10-100x）
     const result = fibonacci(50);
     console.time('Wasm');
     const bigResult = fibonacci(45);  // 很大的数字
     console.timeEnd('Wasm');  // 明显快于纯 JS
   }
   ```

   **场景二：加密/哈希运算**
   ```javascript
   // 使用 Wasm 加速加密操作
   const crypto = require('./crypto_wasm_bg.wasm');

   // SHA-256 哈希（批量处理时比 Node.js crypto 模块更快）
   const hash = crypto.sha256_batch(largeDataSet);
   ```

   **场景三：跨语言复用现有库**
   ```javascript
   // 将 C/C++ 库编译为 Wasm
   // 例：SQLite（sql.js）、FFmpeg、OpenCV、TensorFlow Lite
   
   const initSqlJs = require('sql.js');
   const SQL = await initSqlJs();
   const db = new SQL.Database();
   db.run('CREATE TABLE test (id INT, name TEXT)');
   ```

4. **性能对比**
   ```
   任务              | JavaScript | Wasm (Rust) | 加速比
   ------------------|-----------|--------------|--------
   Fibonacci(45)     | 12s       | 120ms        | 100x
   图像压缩 (JPEG)   | 800ms     | 50ms         | 16x
   JSON 解析 (大数据) | 150ms     | 30ms         | 5x
   正则表达式匹配    | 50ms      | 10ms         | 5x
   ```

5. **工具链**
   ```bash
   # Rust → Wasm
   cargo install wasm-pack
   wasm-pack build --target nodejs

   # C/C++ → Wasm
   emcc hello.c -o hello.js -s WASM=1

   # AssemblyScript (TypeScript-like → Wasm)
   npm install assemblyscript
   asc assembly/index.ts -o build/optimized.wasm -O3
   ```

6. **局限性与未来**
   ```javascript
   // 当前局限：
   // 1. 没有 DOM/BOM API（浏览器环境受限）
   // 2. 线程支持仍在完善（SharedArrayBuffer）
   // 3. 调试工具不够成熟
   // 4. 与 GC 语言互操作有开销
   // 5. 文件 I/O 受限

   // 未来方向（WasmGC 提案）：
   // - 原生垃圾回收支持
   // - 组件模型（Component Model）
   // - Stack Switching（协程支持）
   // - 更多语言的 Wasm 目标
   ```

> **追问链**：如何将现有的 C/C++ 库移植到 Node.js？→ Emscripten 工具链

---

## Q47: 给定一段 Node.js 代码，分析其执行过程和潜在问题
- **难度**：★★★
- **知识点**：代码分析 / 异步流程 / 性能问题 / 错误处理
- **题型**：代码分析题

### 参考答案要点：

1. **题目代码**
   ```javascript
   const express = require('express');
   const fs = require('fs');
   const app = express();

   app.get('/api/data', async (req, res) => {
     const userId = req.query.id;
     
     // 查询用户
     const user = await getUserFromDB(userId);
     
     // 根据用户角色获取不同数据
     let data;
     if (user.role === 'admin') {
       data = await getAdminData(userId);
     } else {
       data = await getUserData(userId);
     }

     // 读取配置文件
     const config = fs.readFileSync('./config.json', 'utf8');
     const parsedConfig = JSON.parse(config);

     // 处理并返回
     const result = processData(data, parsedConfig);
     res.json(result);
   });

   async function getUserFromDB(id) {
     // 模拟数据库查询
     return { id, role: 'user' };
   }

   function processData(data, config) {
     // 复杂的数据处理
     return { ...data, processed: true, timestamp: Date.now() };
   }

   app.listen(3000);
   ```

2. **执行过程分析**
   ```
   请求到达 → Express 中间件处理 → 进入路由处理器
     ↓
   ① await getUserFromDB(id)
     ↓ (挂起，等待 DB 响应)
   DB 返回结果 → 恢复执行
     ↓
   ② 条件判断 user.role
     ↓
   ③ await getAdminData / getUserData
     ↓ (再次挂起)
   数据返回 → 恢复执行
     ↓
   ④ readFileSync（⚠️ 同步阻塞！）
     ↓ （整个事件循环被阻塞）
   文件读取完成
     ↓
   ⑤ JSON.parse + processData
     ↓
   ⑥ res.json() → 响应返回
   ```

3. **发现的问题**

   **问题1：同步文件读取阻塞事件循环**
   ```javascript
   // ❌ 问题代码
   const config = fs.readFileSync('./config.json', 'utf8');
   
   // 影响：每次请求都会阻塞事件循环
   // 如果文件较大或有并发请求，会导致所有请求变慢
   
   // ✅ 修复方案
   // 方案A：应用启动时读取一次（缓存）
   let cachedConfig = null;
   async function loadConfig() {
     cachedConfig = JSON.parse(await fs.promises.readFile('./config.json', 'utf8'));
   }
   loadConfig();  // 启动时加载

   // 方案B：改为异步读取（如果配置会变化）
   const config = await fs.promises.readFile('./config.json', 'utf8');
   ```

   **问题2：缺少输入验证**
   ```javascript
   // ❌ 问题代码
   const userId = req.query.id;  // 未验证！
   
   // 风险：
   // - userId 可能是 undefined
   // - 可能是恶意字符串（SQL 注入风险）
   // - 类型错误导致异常
   
   // ✅ 修复方案
   const { validate } = require('./validator');
   const { userId, error } = validate.userId(req.query.id);
   if (error) {
     return res.status(400).json({ error: error.message });
   }
   ```

   **问题3：缺少错误处理**
   ```javascript
   // ❌ 问题：任何一步出错都可能导致 500 且无详细信息
   
   // ✅ 修复方案：try-catch 包装
   app.get('/api/data', async (req, res) => {
     try {
       // ... 业务逻辑
     } catch (err) {
       console.error('处理请求出错:', err);
       res.status(500).json({
         error: process.env.NODE_ENV === 'production'
           ? '服务器错误'
           : err.message
       });
     }
   });
   ```

   **问题4：潜在的 N+1 查询问题**
   ```javascript
   // 如果 processData 内部又发起多次 DB 查询
   // 可能导致 N+1 查询问题
   
   // ✅ 修复方案：并行查询或批量查询
   const [user, config] = await Promise.all([
     getUserFromDB(userId),
     loadConfig()
   ]);
   ```

4. **优化后的代码**
   ```javascript
   const express = require('express');
   const fs = require('fs').promises;
   const app = express();

   // 启动时加载配置
   let appConfig = null;
   async function bootstrap() {
     appConfig = JSON.parse(await fs.readFile('./config.json', 'utf8'));
     console.log('配置加载完成');
   }

   app.get('/api/data', async (req, res) => {
     try {
       // ① 输入验证
       const userId = req.query.id;
       if (!userId || !/^\d+$/.test(userId)) {
         return res.status(400).json({ error: '无效的用户 ID' });
       }

       // ② 并行查询（减少等待时间）
       const [user, roleData] = await Promise.all([
         getUserFromDB(userId),
         user.role === 'admin'
           ? getAdminData(userId)
           : getUserData(userId)
       ]);

       // ③ 处理数据（使用缓存配置）
       const result = processData(roleData, appConfig);
       
       // ④ 添加响应头
       res.set('X-Response-Time', Date.now());
       res.json(result);

     } catch (err) {
       // 分类错误
       if (err.code === 'NOT_FOUND') {
         res.status(404).json({ error: '用户不存在' });
       } else if (err.code === 'DB_ERROR') {
         res.status(503).json({ error: '服务暂时不可用' });
       } else {
         console.error('未预期的错误:', err);
         res.status(500).json({ error: '内部服务器错误' });
       }
     }
   });

   // 启动
   bootstrap().then(() => {
     app.listen(3000, () => console.log('Server ready'));
   });
   ```

> **追问链**：如何对这段代码进行性能测试？→ k6/Artillery 压测

---

## Q48: 从零到生产：一个 Node.js API 服务的完整搭建流程
- **难度**：★★★
- **知识点**：项目搭建 / 工程化 / 最佳实践 / 生产部署
- **题型**：综合场景题

### 参考答案要点：

1. **项目初始化**
   ```bash
   # ① 创建项目
   mkdir my-api && cd my-api
   npm init -y

   # ② 安装核心依赖
   npm install express cors helmet morgan
   npm install -D typescript @types/node @types/express nodemon ts-node eslint prettier

   # ③ 初始化 TypeScript
   npx tsc --init

   # ④ 创建目录结构
   mkdir -p src/{routes,middleware,services,utils,types,config}
   touch src/app.ts src/server.ts
   ```

2. **TypeScript 配置**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "target": "ES2022",
       "module": "NodeNext",
       "moduleResolution": "NodeNext",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true,
       "resolveJsonModule": true,
       "declaration": true,
       "declarationMap": true,
       "sourceMap": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist"]
   }
   ```

3. **核心代码结构**
   ```typescript
   // src/types/index.ts - 类型定义
   export interface User {
     id: string;
     name: string;
     email: string;
     role: 'admin' | 'user';
     createdAt: Date;
   }

   export interface ApiResponse<T = any> {
     success: boolean;
     data?: T;
     error?: string;
     timestamp: number;
   }

   // src/config/index.ts - 配置管理
   export const config = {
     port: parseInt(process.env.PORT || '3000'),
     nodeEnv: process.env.NODE_ENV || 'development',
     db: {
       host: process.env.DB_HOST || 'localhost',
       port: parseInt(process.env.DB_PORT || '3306'),
       database: process.env.DB_NAME || 'mydb',
       user: process.env.DB_USER || 'root',
       password: process.env.DB_PASSWORD || ''
     },
     jwt: {
       secret: process.env.JWT_SECRET || 'change-me-in-production',
       expiresIn: '24h'
     }
   };

   // src/middleware/errorHandler.ts - 错误处理
   import { Request, Response, NextFunction } from 'express';

   export interface AppError extends Error {
     statusCode?: number;
     code?: string;
   }

   export function errorHandler(
     err: AppError,
     req: Request,
     res: Response,
     next: NextFunction
   ) {
     console.error(`${req.method} ${req.path} -`, err.message);
     console.error(err.stack);

     const statusCode = err.statusCode || 500;
     const response = {
       success: false,
       error: process.env.NODE_ENV === 'production'
         ? '服务器错误'
         : err.message,
       timestamp: Date.now()
     };

     res.status(statusCode).json(response);
   }

   // src/middleware/validate.ts - 请求验证
   import { Request, Response, NextFunction, Router } from 'express';

   export function validateBody(schema: object) {
     return (req: Request, res: Response, next: NextFunction) => {
       const { error, value } = schema.validate(req.body);
       if (error) {
         return res.status(400).json({
           success: false,
           error: error.details[0].message,
           timestamp: Date.now()
         });
       }
       req.body = value;
       next();
     };
   }

   // src/services/user.service.ts - 业务逻辑
   import { User } from '../types';
   import { pool } from '../utils/db';

   export class UserService {
     async findById(id: string): Promise<User | null> {
       const [rows] = await pool.execute(
         'SELECT * FROM users WHERE id = ? LIMIT 1',
         [id]
       );
       return rows[0] || null;
     }

     async create(data: Partial<User>): Promise<User> {
       const [result] = await pool.execute(
         'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
         [data.name, data.email, data.role || 'user']
       );
       return this.findById(result.insertId);
     }
   }

   // src/routes/user.routes.ts - 路由定义
   import { Router } from 'express';
   import { UserService } from '../services/user.service';
   import { validateBody } from '../middleware/validate';
   import { createUserSchema } from '../schemas/user.schema';

   const router = Router();
   const userService = new UserService();

   router.get('/:id', async (req, res) => {
     try {
       const user = await userService.findById(req.params.id);
       if (!user) {
         return res.status(404).json({
           success: false,
           error: '用户不存在',
           timestamp: Date.now()
         });
       }
       res.json({ success: true, data: user, timestamp: Date.now() });
     } catch (err) {
       next(err);
     }
   });

   router.post('/', validateBody(createUserSchema), async (req, res) => {
     try {
       const user = await userService.create(req.body);
       res.status(201).json({ success: true, data: user, timestamp: Date.now() });
     } catch (err) {
       next(err);
     }
   });

   export default router;

   // src/app.ts - 应用入口
   import express from 'express';
   import cors from 'cors';
   import helmet from 'helmet';
   import morgan from 'morgan';
   import userRoutes from './routes/user.routes';
   import { errorHandler } from './middleware/errorHandler';
   import { config } from './config';

   const app = express();

   // 中间件
   app.use(helmet());                    // 安全头
   app.use(cors());                      // CORS
   app.use(morgan('combined'));           // 日志
   app.use(express.json({ limit: '10mb' }));
   app.use(express.urlencoded({ extended: true }));

   // 路由
   app.use('/api/users', userRoutes);

   // 健康检查
   app.get('/health', (req, res) => {
     res.json({ status: 'ok', timestamp: Date.now() });
   });

   // 错误处理（必须在最后）
   app.use(errorHandler);

   export default app;

   // src/server.ts - 服务器启动
   import app from './app';
   import { config } from './config';

   const server = app.listen(config.port, () => {
     console.log(`Server running on port ${config.port}`);
     console.log(`Environment: ${config.nodeEnv}`);
   });

   export default server;
   ```

4. **工程化配置**
   ```javascript
   // .eslintrc.js
   module.exports = {
     parser: '@typescript-eslint/parser',
     extends: [
       'eslint:recommended',
       'plugin:@typescript-eslint/recommended'
     ],
     rules: {
       'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
       '@typescript-eslint/no-unused-vars': 'error'
     }
   };

   // .prettierrc
   {
     "semi": true,
     "singleQuote": true,
     "tabWidth": 2,
     "trailingComma": "all"
   }

   // package.json scripts
   {
     "scripts": {
       "dev": "nodemon --exec ts-node src/server.ts",
       "build": "tsc",
       "start": "node dist/server.js",
       "lint": "eslint src/**/*.ts",
       "test": "jest",
       "test:coverage": "jest --coverage"
     }
   }
   ```

5. **Docker 化部署**
   ```dockerfile
   FROM node:18-alpine AS base
   WORKDIR /app

   FROM base AS deps
   COPY package.json package-lock.json ./
   RUN npm ci --only=production

   FROM base AS builder
   COPY package.json package-lock.json ./
   COPY . .
   RUN npm ci && npm run build

   FROM base AS runner
   COPY --from=builder ./dist ./dist
   COPY --from=deps ./node_modules ./node_modules
   EXPOSE 3000
   CMD ["node", "dist/server.js"]
   ```

6. **CI/CD 流水线（GitHub Actions）**
   ```yaml
   # .github/workflows/ci.yml
   name: CI/CD
   on: [push, pull_request]

   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: '18'
             cache: 'npm'
         - run: npm ci
         - run: npm run lint
         - run: npm run test:coverage

     deploy:
       needs: test
       if: github.ref == 'refs/heads/main'
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - name: Build & Push Docker
           run: |
             docker build -t my-api:${{ github.sha }} .
             docker push registry/my-api:${{ github.sha }}
   ```

> **追问链**：如何进行灰度发布和回滚？→ Argo Rollouts / Flagger

---

## Q49: Node.js 在微服务架构中的角色和实践
- **难度**：★★★
- **知识点**：微服务 / 服务网格 / 通信模式 / 分布式事务
- **题型**：架构设计题

### 参考答案要点：

1. **Node.js 在微服务中的定位**
   ```
   ┌─────────────────────────────────────────────────┐
   │                  API Gateway                     │
   │            (Kong / Nginx / AWS API Gateway)      │
   └────────────────────┬────────────────────────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
   ┌──────────┐  ┌──────────┐  ┌──────────┐
   │ Auth Svc │  │ User Svc │  │ Order Svc│  ← Node.js
   │ (Node)   │  │ (Node)   │  │ (Go)     │
   └────┬─────┘  └────┬─────┘  └────┬─────┘
        │             │             │
        └─────────────┼─────────────┘
                      ▼
              ┌──────────────┐
              │ Message Queue │  ← RabbitMQ/Kafka
              │ (Kafka)      │
              └──────┬───────┘
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
   ┌──────────┐┌──────────┐┌──────────┐
   │ Notify   ││ Payment ││ Analytics│
   │ (Node)   ││ (Java)  ││ (Python) │
   └──────────┘└──────────┘└──────────┘
   ```

2. **通信模式选择**
   ```javascript
   // ========== 模式1：同步 HTTP/gRPC（服务间调用）==========

   // HTTP REST（简单场景）
   const axios = require('axios');
   async function getUser(userId) {
     const response = await axios.get(`http://user-service/users/${userId}`, {
       timeout: 3000,
       headers: { 'X-Request-ID': requestId }
     });
     return response.data;
   }

   // gRPC（高性能场景）
   // 使用 @grpc/grpc-js + protobuf
   const grpc = require('@grpc/grpc-js');
   const protoLoader = require('@grpc/proto-loader');

   const packageDefinition = protoLoader.loadSync('./user.proto');
   const userProto = grpc.loadPackageDefinition(packageDefinition).userservice;

   const client = new userProto.UserService(
     'dns:///user-service:50051',
   grpc.credentials.createInsecure()
 );

   async function getUserGrpc(userId) {
     return new Promise((resolve, reject) => {
       client.GetUser({ userId }, (err, response) => {
         if (err) reject(err);
         else resolve(response);
       });
     });
   }


   // ========== 模式2：异步消息队列（解耦）==========

   // Kafka 生产者
   const { Kafka } = require('kafkajs');
   const kafka = new Kafka({ brokers: ['kafka:9092'] });
   const producer = kafka.producer();

   async function publishOrderCreated(order) {
     await producer.connect();
     await producer.send({
       topic: 'order-events',
       messages: [{
         key: order.id,
         value: JSON.stringify(order)
       }]
     });
   }

   // Kafka 消费者
   const consumer = kafka.consumer({ groupId: 'notification-service' });

   await consumer.subscribe({ topic: 'order-events' });
   await consumer.run({
     eachMessage: async ({ message }) => {
       const order = JSON.parse(message.value.toString());
       await sendNotification(order);
     }
   });


   // ========== 模式3：事件驱动（Domain Events）==========

   // 发布领域事件
   class OrderService {
     async createOrder(data) {
       const order = await this.repo.save(data);
       
       // 发布事件
       await eventBus.publish('order.created', {
         orderId: order.id,
         userId: order.userId,
         amount: order.amount,
         timestamp: new Date()
       });
       
       return order;
     }
   }

   // 监听并处理事件
   class InventoryService {
     async handleOrderCreated(event) => {
       // 扣减库存
       await this.inventory.reserve(event.orderId, event.items);
     }
   }
   ```

3. **服务发现与负载均衡**
   ```javascript
   // 方案1：Consul 服务发现
   const consul = require('consul')({ host: 'consul:8500 });

   async function getServiceUrl(serviceName) {
     const services = await consul.agent.service.list();
     const instances = services[serviceName];
     
     // 随机选择一个实例（简单的负载均衡）
     const instance = instances[Math.floor(Math.random() * instances.length)];
     return `http://${instance.Address}:${instance.Port}`;
   }

   // 方案2：Kubernetes 原生服务发现
   // 通过 DNS: http://user-service.default.svc.cluster.local
   const USER_SVC_URL = process.env.USER_SERVICE_URL || 
                          'http://user-service.default.svc.cluster.local:80';
   ```

4. **分布式追踪**
   ```javascript
   // 使用 OpenTelemetry 进行分布式追踪
   const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
   { Resource } = require('@opentelemetry/resources');
   { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

   const provider = new NodeTracerProvider({
     resource: new Resource({
       [SemanticResourceAttributes.SERVICE_NAME]: 'my-api',
       [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: 'production'
     })
   });

   provider.register();

   // 自动追踪 HTTP 请求
   const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
   const expressInstrumentation = new ExpressInstrumentation();
   expressInstrumentation.setTracerProvider(provider);
   ```

5. **配置中心**
   ```javascript
   // 使用 etcd 或 Consul KV 存储配置
   const Consul = require('consul');
   const consul = new Consul();

   async function loadRemoteConfig() {
     const { Value } = await consul.kv.get('config/my-api');
     return JSON.parse(Value);
   }

   // 配置变更监听
   const watcher = consul.watch({ key: 'config/my-api' });
   watcher.on('change', async (data) => {
     console.log('配置更新:', data.Value);
     // 热更新配置（无需重启）
     updateConfig(JSON.parse(data.Value));
   });
   ```

> **追问链**：如何处理分布式事务？→ Saga/TCC 模式

---

## Q50: 综合实战 - 设计一个完整的即时通讯（IM）系统后端
- **难度**：★★★
- **知识点**：IM 系统 / WebSocket / 消息队列 / 数据库设计 / 高并发
- **题型**：综合架构设计题

### 参考答案要点：

1. **需求分析与技术选型**
   ```
   功能需求：
   - 单聊/群聊消息收发
   - 消息历史记录（分页拉取）
   - 在线状态/已读回执
   - 消息撤回/删除
   - 文件/图片/视频消息
   - 离线消息推送

   技术选型：
   - 语言：Node.js（I/O 密集，适合长连接）
   - 协议：WebSocket + HTTP REST API
   - 消息队列：Kafka（可靠投递）
   - 缓存：Redis（在线状态、会话）
   - 数据库：MongoDB（消息存储）/ MySQL（用户关系）
   - 实时推送：Socket.IO（自带重连、心跳）
   ```

2. **整体架构**
   ```
   ┌─────────────────────────────────────────────────────┐
   │                    Load Balancer (Nginx)            │
   └──────────────────────┬──────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   ┌────────────┐  ┌────────────┐  ┌────────────┐
   │ Gateway #1  │  │ Gateway #2  │  │ Gateway #N  │  ← WS 网关层
   │ (Node.js)  │  │ (Node.js)  │  │ (Node.js)  │
   │ Socket.IO  │  │ Socket.IO  │  │ Socket.IO  │
   └──────┬─────┘  └──────┬─────┘  └──────┬─────┘
          │                │                │
          └────────────────┼────────────────┘
                           ▼
              ┌────────────────────────┐
              │    Message Queue (Kafka) │
              │  - chat.messages        │
              │  - notifications         │
              │  - presence.updates      │
              └────────────┬───────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   ┌────────────┐  ┌────────────┐  ┌────────────┐
   │ Chat Svc   │  │ Notify Svc │  │ Presence  │
   │ (Node.js)  │  │ (Node.js)  │  │ Svc(Redis) │
   └──────┬─────┘  └────────────┘  └────────────┘
          │
          ├── MongoDB（消息存储）
          ├── MySQL（用户/群组关系）
          └── OSS（文件存储）
   ```

3. **核心模块实现**

   **WebSocket 网关层**
   ```javascript
   // gateway.js - WebSocket 网关

   const { Server } = require('socket.io');
   const Redis = require('ioredis');
   const { createAdapter } = require('@socket.io/redis-adapter');

   class ChatGateway {
     constructor(port) {
       this.io = new Server({
         cors: { origin: '*' },
         pingInterval: 25000,
         pingTimeout: 60000
       });

       // Redis Adapter（多实例广播）
       this.pubClient = new Redis(process.env.REDIS_URL);
       this.subClient = this.pubClient.duplicate();
       this.io.adapter(createAdapter(this.pubClient, this.subClient));
     }

     start(port) {
       this.io.on('connection', (socket) => this.handleConnection(socket));
       this.io.listen(port);
       console.log(`Gateway running on port ${port}`);
     }

     handleConnection(socket) {
       // ① 认证
       socket.use(async ([event, ...args], next) => {
         const token = socket.handshake.auth.token;
         const user = await verifyToken(token);
         if (!user) return next(new Error('认证失败'));
         socket.user = user;
         next();
       });

       // ② 加入用户的个人房间（用于私聊推送）
       socket.join(`user:${socket.user.id}`);

       // ③ 加入所在群组的房间
       socket.user.groupIds.forEach(groupId => {
         socket.join(`group:${groupId}`);
       });

       // ④ 更新在线状态
       this.updatePresence(socket.user.id, 'online');

       // ⑤ 事件处理
       socket.on('message:send', (data) => this.handleSendMessage(socket, data));
       socket.on('message:read', (data) => this.handleReadReceipt(socket, data));
       socket.on('typing', (data) => this.handleTyping(socket, data));

       // ⑥ 断开处理
       socket.on('disconnect', () => {
         this.updatePresence(socket.user.id, 'offline');
       });
     }

     async handleSendMessage(socket, data) {
       const message = {
         id: generateId(),
         from: socket.user.id,
         to: data.to,
         type: data.type,  // text/image/file
         content: data.content,
         timestamp: Date.now()
       };

       // ① 发送到 Kafka（持久化）
       await this.kafka.produce({
         topic: 'chat.messages',
         messages: [{ key: data.to, value: JSON.stringify(message) }]
       });

       // ② 实时推送给接收方
       if (data.chatType === 'private') {
         this.io.to(`user:${data.to}`).emit('message:new', message);
       } else {
         this.io.to(`group:${data.to}`).emit('message:new', message);
       }

       // ③ 确认发送方
       socket.emit('message:sent', { messageId: message.id });
     }

     async updatePresence(userId, status) {
       await this.redis.hset(`presence:${userId}`, {
         status,
         lastSeen: Date.now()
       });

       // 广播给好友
       const friends = await this.getUserFriends(userId);
       friends.forEach(friendId => {
         this.io.to(`user:${friendId}`).emit('presence:update', {
           userId,
           status
         });
       });
     }
   }

   module.exports = ChatGateway;
   ```

   **消息服务（消费者）**
   ```javascript
   // chat-service.js - 消息处理服务

   const { Kafka } = require('kafkajs');
   const { MongoClient } = require('mongodb');

   class ChatService {
     constructor() {
       this.kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER]]);
       this.consumer = this.kafka.consumer({ groupId: 'chat-service' });
       this.db = null;
     }

     async start() {
       // 连接 MongoDB
       this.db = (await MongoClient.connect(process.env.MONGO_URL)).db('im');

       // 订阅消息主题
       await this.consumer.subscribe({ topic: 'chat.messages' });

       await this.consumer.run({
         eachMessage: async ({ message }) => {
           const msg = JSON.parse(message.value.toString());
           
           try {
             await this.saveMessage(msg);
             // 发送推送通知（离线用户）
             if (await this.isUserOffline(msg.to)) {
               await this.sendPushNotification(msg);
             }
           } catch (err) {
             console.error('消息处理失败:', err);
             throw err;  // 触发重试
           }
         }
       });
     }

     async saveMessage(message) {
       const collection = this.db.collection('messages');
       
       // 私聊消息
       if (message.chatType === 'private') {
         const chatId = [message.from, message.to].sort().join(':');
         await collection.insertOne({
           ...message,
           chatId,
           readBy: [message.from]  // 发送者已读
         });
       } 
       // 群聊消息
       else {
         const groupCollection = this.db.collection(`groups:${message.to}`);
         await groupCollection.insertOne({
           ...message,
           readBy: []
         });
       }
     }
   }

   module.exports = ChatService;
   ```

4. **数据库设计**
   ```javascript
   // MongoDB Schema 设计

   // users 集合
   {
     _id: ObjectId,
     username: String,
     avatar: String,
     status: 'online' | 'offline' | 'busy',
     lastSeen: Date,
     friends: [ObjectId],  // 好友 ID 列表
     groups: [ObjectId],   // 所在群组
     createdAt: Date
   }

   // messages 集合（按聊天分区）
   {
     _id: ObjectId,
     chatId: String,        // 私聊: "uid1:uid2" | 群聊: "group:gid"
     from: ObjectId,
     to: ObjectId,         // 接收方（人或群组）
     type: 'text' | 'image' | 'file' | 'video' | 'system',
     content: String,
     thumbnail: String,    // 图片/视频缩略图
     fileInfo: {            // 文件信息
       name: String,
       size: Number,
       url: String
     },
     isRecalled: Boolean,   // 是否撤回
     recalledAt: Date,
     readBy: [ObjectId],   // 已读用户列表
     createdAt: Date
   }

   // 索引设计
   db.messages.createIndex({ chatId: 1, createdAt: -1 });  // 分页查询
   db.messages.createIndex({ from: 1, createdAt: -1 });     // 某人的消息
   ```

5. **扩展性设计**
   ```javascript
   // 水平扩展策略：

   // ① Gateway 层：无状态，可无限水平扩展
   // 通过 Nginx IP Hash 或一致性哈希绑定用户到固定网关

   // ② 消息服务：Kafka 分区
   // 按 chatId 取模分配分区，同一聊天的消息有序处理
   const partition = Math.abs(hashCode(chatId)) % numPartitions;

   // ③ MongoDB 分片
   // 按 chatId 范围分片
   sh.shardCollection("im.messages", { chatId: "hashed" })

   // ④ Redis Cluster
   // 在线状态存储使用 Redis Cluster，避免单点瓶颈

   // ⑤ 消息同步读（降低 DB 压力）
   // 最近消息放 Redis（热数据），历史消息查 MongoDB
   async function getRecentMessages(chatId, limit = 50) {
     const cacheKey = `recent:${chatId}`;
     let messages = await redis.lrange(cacheKey, 0, limit - 1);
     
     if (messages.length === 0) {
       messages = await db.collection('messages')
         .find({ chatId })
         .sort({ createdAt: -1 })
         .limit(limit)
         .toArray();
       
       // 回填缓存
       if (messages.length > 0) {
         await redis.rpush(cacheKey, ...messages.reverse());
         await redis.expire(cacheKey, 3600);  // 1小时
       }
     }
     
     return messages.reverse();
   }
   ```

6. **性能指标与容量规划**
   ```
   单机估算（8核 16G）：
   - WebSocket 并发连接：~50,000
   - 消息吞吐：~10,000 msg/s
   - P99 延迟：< 100ms

   万人大群优化：
   - 消息不推送给所有人，只推送给"最近活跃"成员
   - 使用游标分页代替 offset 分页
   - 群消息存入独立的 Collection
   ```

> **追问链**：如何实现端到端加密（E2EE）？→ Signal Protocol

---

# 附录

## 附录A：Node.js 知识体系速查表

### 一、异步编程
| 技术 | 说明 | 适用场景 |
|------|------|----------|
| 回调函数 | 传统方式，易产生回调地狱 | 简单的一次性操作 |
| Promise | then/catch 链式调用 | 组合多个异步操作 |
| async/await | 同步风格写法 | 复杂业务逻辑流 |
| EventEmitter | 发布订阅模式 | 自定义事件、状态变化 |
| Stream | 流式数据处理 | 大文件、网络传输 |

### 二、模块系统
| 规范 | 关键字 | 特点 |
|------|--------|------|
| CommonJS | require/exports | Node.js 原生，运行时加载 |
| ES Module | import/export | 静态分析，Tree Shaking |

### 三、文件系统
| 方法 | 类型 | 说明 |
|------|------|------|
| readFile/readFileSync | 读取 | 小文件优先异步 |
| writeFile/writeFileSync | 写入 | 注意编码和权限 |
| createReadStream | 流式读取 | 大文件首选 |
| createWriteStream | 流式写入 | 管道传输 |
| readdir/readdirSync | 列目录 | 文件遍历 |
| stat/statSync | 元数据 | 文件信息查询 |
| watch/unwatch | 监听 | 文件变化检测 |

### 四、HTTP/Web
| 模块 | 用途 | 框架 |
|------|------|------|
| http | 原生 HTTP | 低层级控制 |
| https | HTTPS | 安全连接 |
| http2 | HTTP/2 | 多路复用 |
| net | TCP | 自定义协议 |
| dgram | UDP | 数据报 |
| Express | Web 框架 | 成熟稳定 |
| Koa | 轻量框架 | 现代 async |
| Fastify | 高性能 | 速度快 |

### 五、数据库
| 类型 | 驱动 | 特点 |
|------|------|------|
| MySQL | mysql2 | 参数化查询 |
| PostgreSQL | pg | 高级特性 |
| MongoDB | mongoose | ODM |
| Redis | ioredis | 缓存/会话 |

### 六、安全
| 领域 | 措施 | 工具 |
|------|------|------|
| 注入防护 | 参数化查询/ORM | Sequelize/Prisma |
| XSS | 输转义/CSP | helmet/xss |
| CSRF | Token/SameSite | csurf |
| 认证 | JWT/Session | jsonwebtoken |
| 权限 | RBAC/ABAC | casbin |
| 限流 | Rate Limiting | rate-limiter-flexible |
| 加密 | bcrypt/argon2 | bcryptjs |

### 七、性能优化
| 优化项 | 方法 | 效果 |
|--------|------|------|
| 多核利用 | Cluster/PM2 | CPU利用率↑ |
| 缓存 | Redis/内存缓存 | 响应速度↑↑ |
| 压缩 | Gzip/Brotli | 传输量↓↓ |
| 连接池 | 数据库连接池 | 建立连接↓ |
| 流式 | Stream | 内存占用↓↓ |
| Worker Threads | CPU密集任务 | 不阻塞主线程 |

### 八、部署运维
| 工具 | 用途 |
|------|------|
| PM2 | 进程管理/重启/监控 |
| Docker | 容器化部署 |
| Kubernetes | 编排/扩缩容 |
| Nginx | 反向代理/负载均衡 |
| Jenkins/GitHub Actions | CI/CD |
| Prometheus+Grafana | 监控告警 |
| ELK | 日志分析 |

---

## 附录B：高频考点 TOP20

根据历年面试真题统计，以下 20 个知识点出现频率最高：

| 排名 | 知识点 | 出现频率 | 难度 | 必考指数 |
|:----:|--------|:--------:|:----:|:--------:|
| 1 | **事件循环机制** | 98% | ★★☆ | ★★★★★ |
| 2 | **Promise/async-await** | 95% | ★★☆ | ★★★★★ |
| 3 | **模块系统（CommonJS/ESM）** | 92% | ★☆☆ | ★★★★☆ |
| 4 | **Express/Koa 中间件原理** | 88% | ★★☆ | ★★★★☆ |
| 5 | **Stream 和 Buffer** | 85% | ★★☆ | ★★★★☆ |
| 6 | **错误处理（uncaughtException）** | 82% | ★★☆ | ★★★★☆ |
| 7 | **EventEmitter** | 80% | ★★☆ | ★★★★ |
| 8 | **process.nextTick vs setImmediate** | 78% | ★★☆ | ★★★★ |
| 9 | **Cluster/多线程** | 75% | ★★★ | ★★★★ |
| 10 | **连接池原理** | 72% | ★★☆ | ★★★★ |
| 11 | **Session/JWT 鉴权** | 70% | ★★☆ | ★★★★ |
| 12 | **require 加载机制** | 68% | ★★☆ | ★★★★ |
| 13 | **循环依赖** | 65% | ★★☆ | ★★★ |
| 14 | **缓存策略（Redis）** | 62% | ★★☆ | ★★★★ |
| 15 | **手写 Promise.all/race** | 60% | ★★★ | ★★★★ |
| 16 | **手写 EventEmitter** | 58% | ★★★ | ★★★★ |
| 17 | **SQL 注入防护** | 55% | ★★☆ | ★★★★ |
| 18 | **内存泄漏排查** | 52% | ★★★ | ★★★ |
| 19 | **WebSocket 实现** | 50% | ★★☆ | ★★★★ |
| 20 | **Docker 部署最佳实践** | 48% | ★★★ | ★★★ |

---

> 📝 **本题库持续维护中**  
> 最后更新：2026-06-16  
> 覆盖范围：Node.js 基础 / 进阶 / 专家 / 架构设计 / 工程化 / 面试实战

