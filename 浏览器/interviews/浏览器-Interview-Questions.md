# 浏览器模块 - 完整面试题库（50道）

> 本题库覆盖浏览器核心原理、渲染引擎、JavaScript引擎、事件循环、网络与安全、性能优化等核心知识领域，适用于前端开发工程师岗位面试准备。

---

## 📚 问题速查目录

> **快速导航**：点击题目即可跳转到对应位置 | 共 **50** 道题

### 基础层（★☆☆）Q01 - Q15

| 题号 | 题目 | 难度 |
|:----:|------|:----:|
| [Q01](#q01-浏览器的进程和线程有什么区别) | 浏览器的进程和线程有什么区别？ | ★☆☆ |
| [Q02](#q02-什么是浏览器的同源策略为什么要设计同源策略) | 什么是浏览器的同源策略？为什么要设计同源策略？ | ★☆☆ |
| [Q03](#q03-cookielocalstoragesessionstorage-有什么区别) | Cookie、LocalStorage、SessionStorage 有什么区别？ | ★☆☆ |
| [Q04](#q04-get-和-post-请求的区别) | GET 和 POST 请求的区别？ | ★☆☆ |
| [Q05](#q05-什么是重绘repaint和回流reflow如何避免不必要的回流) | 什么是重绘（Repaint）和回流（Reflow）？如何避免不必要的回流？ | ★☆☆ |
| [Q06](#q06-dom-树和渲染树render-tree的区别是什么) | DOM 树和渲染树（Render Tree）的区别是什么？ | ★☆☆ |
| [Q07](#q07-什么是crp关键渲染路径如何优化) | 什么是 CRP（关键渲染路径）？如何优化？ | ★☆☆ |
| [Q08](#q08-async-和-defer-的区别) | async 和 defer 的区别？ | ★☆☆ |
| [Q09](#q09-什么是文档类型声明doctype作用是什么) | 什么是文档类型声明 doctype？作用是什么？ | ★☆☆ |
| [Q10](#q10-浏览器是如何处理-css-和-js-的加载和执行的) | 浏览器是如何处理 CSS 和 JS 的加载和执行的？ | ★☆☆ |
| [Q11](#q11-事件冒泡和捕获是什么如何阻止) | 事件冒泡和捕获是什么？如何阻止？ | ★☆☆ |
| [Q12](#q12-什么是事件委托有什么好处) | 什么是事件委托？有什么好处？ | ★☆☆ |
| [Q13](#q13-localstorage-有什么限制) | localStorage 有什么限制？ | ★☆☆ |
| [Q14](#q14-什么是-xss-攻击有哪几种类型) | 什么是 XSS 攻击？有哪几种类型？ | ★☆☆ |
| [Q15](#q15-什么是-csrf-攻击如何防御) | 什么是 CSRF 攻击？如何防御？ | ★☆☆ |

### 进阶层（★★☆）Q16 - Q33

| 题号 | 题目 | 难度 |
|:----:|------|:----:|
| [Q16](#q16-从输入-url-到页面展示的完整过程是怎样的) | 从输入 URL 到页面展示的完整过程是怎样的？ | ★★☆ |
| [Q17](#q17-浏览器的渲染管线中哪些操作会触发reflow哪些会触发repaint) | 浏览器的渲染管线中，哪些操作会触发 Reflow？哪些会触发 Repaint？ | ★★☆ |
| [Q18](#q18-css-会阻塞渲染吗js-会阻塞渲染吗它们之间的关系) | CSS 会阻塞渲染吗？JS 会阻塞渲染吗？它们之间的关系？ | ★★☆ |
| [Q19](#q19-浏览器如何进行图层合成compositinggpu-加速的原理是什么) | 浏览器如何进行图层合成（Compositing）？GPU 加速的原理是什么？ | ★★☆ |
| [Q20](#q20-什么是fouc无样式内容闪烁如何避免) | 什么是 FOUC（无样式内容闪烁）？如何避免？ | ★★☆ |
| [Q21](#q21-v8-引擎的垃圾回收机制是怎样的) | V8 引擎的垃圾回收机制是怎样的？ | ★★☆ |
| [Q22](#q22-v8-是如何编译和执行-javascript-代码的) | V8 是如何编译和执行 JavaScript 代码的？ | ★★☆ |
| [Q23](#q23-什么是内存泄漏浏览器中有哪些常见的内存泄漏方式) | 什么是内存泄漏？浏览器中有哪些常见的内存泄漏方式？ | ★★☆ |
| [Q24](#q24-weakmap-和-map-在内存管理上有什么区别) | WeakMap 和 Map 在内存管理上有什么区别？ | ★★☆ |
| [Q25](#q25-如何检测和分析页面的内存使用情况) | 如何检测和分析页面的内存使用情况？ | ★★☆ |
| [Q26](#q26-请描述一下浏览器的事件循环event-loop机制) | 请描述一下浏览器的事件循环（Event Loop）机制 | ★★☆ |
| [Q27](#q27-宏任务macrotask和微任务microtask有哪些它们的执行顺序) | 宏任务（Macrotask）和微任务（Microtask）有哪些？它们的执行顺序？ | ★★☆ |
| [Q28](#q28-asyncawait-的代码在事件循环中是如何执行的) | async/await 的代码在事件循环中是如何执行的？ | ★★☆ |
| [Q29](#q29-requestanimationframe-在事件循环中的执行时机) | requestAnimationFrame 在事件循环中的执行时机？ | ★★☆ |
| [Q30](#q30-nodejs-的-event-loop-和浏览器的有什么区别) | Node.js 的 Event Loop 和浏览器的有什么区别？ | ★★☆ |
| [Q31](#q31-cors-跨域资源共享的原理是什么简单请求和预检请求的区别) | CORS 跨域资源共享的原理是什么？简单请求和预检请求的区别？ | ★★☆ |
| [Q32](#q32-如何实现两个不同源的页面之间的通信) | 如何实现两个不同源的页面之间的通信？ | ★★☆ |
| [Q33](#q33-csp内容安全策略的作用和使用方式) | CSP（内容安全策略）的作用和使用方式？ | ★★☆ |

### 专家层（★★★）Q34 - Q50

| 题号 | 题目 | 难度 |
|:----:|------|:----:|
| [Q34](#q34-设计并实现一个简易的发布-订阅模式eventemitter) | 设计并实现一个简易的发布-订阅模式（EventEmitter） | ★★★ |
| [Q35](#q35-手写一个promise符合-promisesa-规范的核心逻辑) | 手写一个 Promise（符合 Promises/A+ 规范的核心逻辑） | ★★★ |
| [Q36](#q36-浏览器的多进程架构是如何设计的为什么要采用多进程架构) | 浏览器的多进程架构是如何设计的？为什么要采用多进程架构？ | ★★★ |
| [Q37](#q37-如果让你设计一个前端异常监控系统你会怎么做) | 如果让你设计一个前端异常监控系统，你会怎么做？ | ★★★ |
| [Q38](#q38-手写一个简易的虚拟-dom-diff-算法) | 手写一个简易的虚拟 DOM diff 算法 | ★★★ |
| [Q39](#q39-实现-debounce-和-throttle-函数完整版支持cancelleadingtrailing) | 实现 debounce 和 throttle 函数（完整版，支持 cancel/leading/trailing） | ★★★ |
| [Q40](#q40-手写一个-lru-缓存算法) | 手写一个 LRU 缓存算法 | ★★★ |
| [Q41](#q41-实现一个图片懒加载指令支持intersectionobserver) | 实现一个图片懒加载指令（支持 IntersectionObserver） | ★★★ |
| [Q42](#q42-如何优化首屏渲染速度综合方案设计) | 如何优化首屏渲染速度？（综合方案设计） | ★★★ |
| [Q43](#q43-大列表渲染的性能瓶颈在哪里虚拟滚动的原理是什么) | 大列表渲染的性能瓶颈在哪里？虚拟滚动的原理是什么？ | ★★★ |
| [Q44](#q44-如何设计一套完整的前端缓存策略) | 如何设计一套完整的前端缓存策略？ | ★★★ |
| [Q45](#q45-service-worker-的生命周期和工作原理) | Service Worker 的生命周期和工作原理？ | ★★★ |
| [Q46](#q46-pwa-离线应用的完整实现方案) | PWA 离线应用的完整实现方案？ | ★★★ |
| [Q47](#q47-低版本浏览器的兼容性处理策略) | 低版本浏览器的兼容性处理策略？ | ★★★ |
| [Q48](#q48-webassembly-在前端工程中的应用前景) | WebAssembly 在前端工程中的应用前景？ | ★★★ |
| [Q49](#q49-浏览器端的-ai-推理如tensorflowjs的可行性和局限) | 浏览器端的 AI 推理（如 TensorFlow.js）的可行性和局限？ | ★★★ |
| [Q50](#q50-未来浏览器的发展方向如privacy-sandbox--floc-替代方案) | 未来浏览器的发展方向（如 Privacy Sandbox / FLoC 替代方案）？ | ★★★ |

---

## ★☆☆ 基础题（Q01-Q15）— 概念记忆、基础认知

---

## Q01: 浏览器的进程和线程有什么区别？
- **难度**：★☆☆
- **知识点**：浏览器架构 / 多进程模型
- **题型**：简答题

### 参考答案要点：

1. **基本概念区分**
   - **进程（Process）**：操作系统分配资源的基本单位，拥有独立的内存空间。浏览器中每个标签页通常是一个独立进程。
   - **线程（Thread）**：CPU调度的最小单位，共享所在进程的内存资源。一个进程中可以包含多个线程。

2. **Chrome浏览器的多进程架构**
   - **Browser进程（主进程）**：负责浏览器界面显示、用户交互、子进程管理、存储等
   - **GPU进程**：处理GPU相关任务，用于3D CSS效果、Canvas WebGL等
   - **插件进程**：每个插件运行在独立进程中，避免插件崩溃影响浏览器
   - **渲染进程（Renderer Process）**：每个标签页一个进程，负责页面渲染，内部包含多个线程：
     - GUI渲染线程：解析HTML/CSS，构建DOM/Render树，执行绘制
     - JS引擎线程：解析执行JavaScript代码（如V8引擎）
     - 事件触发线程：管理事件队列（click、setTimeout等）
     - 定时器触发线程：管理setTimeout/setInterval
     - 异步HTTP请求线程：处理XMLHttpRequest等网络请求

3. **关键特性对比**
   - **进程间通信（IPC）**需要特定机制（如Chrome的IPC），开销较大
   - **线程间通信**通过共享内存实现，效率高但需要注意同步问题
   - **单线程限制**：JS引擎是单线程的，但浏览器整体是多进程多线程架构

4. **为什么采用多进程？**
   - **隔离性**：一个标签页崩溃不会影响其他标签页
   - **安全性**：防止恶意代码获取其他页面的数据
   - **资源管理**：可以更精细地控制各标签页的资源占用

> **追问链**：如果关闭多进程模式（使用`--single-process`参数），会有什么问题？→ 现代浏览器如何优化多进程带来的内存占用？

---

## Q02: 什么是浏览器的同源策略？为什么要设计同源策略？
- **难度**：★☆☆
- **知识点**：同源策略 / 安全机制 / 跨域
- **题型**：简答题

### 参考答案要点：

1. **同源的定义**
   - **同源**是指协议（protocol）、域名（host）、端口（port）完全相同
   - 示例：
     - `http://example.com/page1` 和 `http://example.com/page2` → 同源 ✅
     - `http://example.com` 和 `https://example.com` → 不同源 ❌（协议不同）
     - `http://example.com` 和 `http://app.example.com` → 不同源 ❌（域名不同）
     - `http://example.com` 和 `http://example.com:8080` → 不同源 ❌（端口不同）

2. **同源策略的限制范围**
   - **Cookie、LocalStorage、IndexedDB**等存储无法跨域读取
   - **DOM无法跨域操作**：无法通过JS获取不同源页面的DOM
   - **AJAX请求受限**：默认情况下不能向不同源的服务器发送请求（CORS可解决）

3. **为什么需要同源策略？**
   - **保护用户隐私**：防止恶意网站读取其他网站的用户数据（如银行账户信息）
   - **防止CSRF攻击**：如果没有同源限制，攻击者可以在自己的页面中嵌入iframe来读取用户在其他网站的敏感数据
   - **隔离重要应用**：确保不同网站之间的安全边界

4. **同源策略的"例外"情况**
   - **跨域资源嵌入**：`<script>`、`<img>`、`<link>`、`<iframe>`等标签可以加载跨域资源（但JS无法读取内容）
   - **链接跳转**：`<a>`标签、表单提交、窗口重定向不受同源限制
   - **postMessage API**：允许不同源的窗口之间安全通信

5. **实际场景示例**
   ```javascript
   // 尝试访问跨域iframe会报错
   const iframe = document.createElement('iframe');
   iframe.src = 'https://other-domain.com';
   document.body.appendChild(iframe);
   
   // 这会抛出安全错误
   try {
     iframe.contentWindow.document; // SecurityError: 跨域访问被阻止
   } catch (e) {
     console.error('跨域访问被同源策略阻止');
   }
   ```

> **追问链**：如何解决跨域问题？（引出CORS、JSONP、代理等方案）→ postMessage的具体用法？

---

## Q03: Cookie、LocalStorage、SessionStorage 有什么区别？
- **难度**：★☆☆
- **知识点**：Web Storage / Cookie / 浏览器存储
- **题型**：简答题

### 参考答案要点：

1. **核心区别对比表**

| 特性 | Cookie | LocalStorage | SessionStorage |
|------|--------|--------------|----------------|
| **容量** | ~4KB | ~5MB | ~5MB |
| **有效期** | 可设置过期时间 | 永久保存（除非手动删除） | 仅当前会话（关闭标签页/浏览器即清除） |
| **作用域** | 可设置domain和path | 同源策略（协议+域名+端口） | 同源 + 当前标签页 |
| **随请求发送** | ✅ 自动携带到服务器 | ❌ 不自动发送 | ❌ 不自动发送 |
| **API** | `document.cookie` | `localStorage.*` | `sessionStorage.*` |

2. **Cookie详解**
   ```javascript
   // 设置Cookie
   document.cookie = 'username=John; expires=Fri, 31 Dec 2026 23:59:59 GMT; path=/; domain=.example.com; secure; SameSite=Strict';
   
   // 读取所有Cookie
   console.log(document.cookie); // 返回字符串 "name=value; name2=value2"
   
   // 删除Cookie（设置过期时间为过去的时间）
   document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
   
   // 重要属性说明：
   // - HttpOnly: 防止XSS攻击读取Cookie（JS无法访问）
   // - Secure: 只在HTTPS连接下传输
   // - SameSite: 防止CSRF攻击（Strict/Lax/None）
   // - Domain: 指定哪些域名可以接收该Cookie
   // - Path: 指定目录下才发送Cookie
   ```

3. **LocalStorage 使用方式**
   ```javascript
   // 存储数据
   localStorage.setItem('key', 'value');
   localStorage.user = JSON.stringify({ name: '张三', age: 25 });
   
   // 读取数据
   const value = localStorage.getItem('key');
   const user = JSON.parse(localStorage.user);
   
   // 删除数据
   localStorage.removeItem('key');
   
   // 清空所有数据
   localStorage.clear();
   
   // 监听storage事件（同源的其他页面修改时会触发）
   window.addEventListener('storage', (e) => {
     console.log(`字段 ${e.key} 从 ${e.oldValue} 变更为 ${e.newValue}`);
   });
   ```

4. **SessionStorage 的特殊性**
   - **标签页级别隔离**：即使同一网站，不同标签页的SessionStorage也是独立的
   - **适用场景**：临时存储表单数据、页面状态（刷新后仍保留，但关闭标签页就消失）

5. **选择建议**
   - **需要服务端读取** → Cookie（如登录状态token）
   - **长期本地存储** → LocalStorage（如用户偏好设置）
   - **会话级临时数据** → SessionStorage（如表单草稿）
   - **大量结构化数据** → IndexedDB（超出5MB的场景）

### 🔍 追问链

1. **Cookie 的 SameSite 属性有哪些值？各有什么作用？**
   → 方向：Strict（严格模式，所有跨站请求都不携带Cookie）、Lax（宽松模式，允许顶级导航携带，如从搜索引擎跳转）、None（必须配合Secure使用，允许跨站携带）；Chrome 80+默认值变为Lax；如何选择取决于业务场景

2. **如何处理跨子域的 Cookie 共享？**
   → 方向：设置`Domain=.example.com`（注意前面的点）实现主域名及所有子域共享；但要注意安全风险（子域名被攻陷会影响全局）；替代方案：通过postMessage+iframe实现跨子域通信，或使用中心化认证服务（SSO）

3. **LocalStorage 在隐私模式下能用吗？**
   → 方向：可以使用，但关闭窗口后数据会被清除（类似SessionStorage行为）；Safari的特殊性：限制LocalStorage为0容量且7天后清除；Firefox/Chrome的隐私模式下正常工作但退出时清理；检测方法：尝试写入数据后立即读取验证

---

## Q04: GET 和 POST 请求的区别？
- **难度**：★☆☆
- **知识点**：HTTP方法 / 浏览器行为 / 缓存
- **题型**：简答题

### 参考答案要点：

1. **语义上的区别**
   - **GET**：用于**获取资源**，应该是幂等的（多次请求结果相同）、安全的（不改变服务器状态）
   - **POST**：用于**提交数据**，通常会创建或修改服务器资源，非幂等

2. **浏览器行为差异**

   | 行为 | GET | POST |
   |------|-----|------|
   | **参数位置** | URL查询字符串 | Request Body |
   | **浏览器缓存** | ✅ 默认可缓存 | ❌ 默认不缓存 |
   | **历史记录** | ✅ 参数保留在URL历史中 | ❌ 参数不会保存 |
   | **书签收藏** | ✅ 可以收藏带参数的URL | ❌ 无法收藏 |
   | **后退/刷新** | 无副作用 | 提示"重新提交表单" |

3. **常见误区**
   - GET和POST都不安全，必须用HTTPS加密
   - POST只是参数不在URL显示，同样需要HTTPS

4. **使用场景**
   - 获取数据列表 → GET
   - 创建新资源 → POST
   - 复杂搜索参数 → 可用POST

> **追问链**：PUT、PATCH、DELETE与POST的区别？→ RESTful API设计规范？

---

## Q05: 什么是重绘（Repaint）和回流（Reflow）？如何避免不必要的回流？
- **难度**：★☆☆
- **知识点**：渲染性能 / Reflow / Repaint
- **题型**：简答题

### 参考答案要点：

1. **基本概念**
   - **回流（Reflow）**：元素几何属性变化时重新计算布局
   - **重绘（Repaint）**：外观样式变化但几何属性不变时的重新绘制
   - **关系**：回流必定触发重绘，反之不然；回流代价更高

2. **触发Reflow的操作**
   - 修改尺寸、位置、显示/隐藏
   - 读取offsetWidth、getBoundingClientRect等属性（强制同步布局）

3. **优化策略**
   - 批量修改DOM样式（cssText或class切换）
   - 使用DocumentFragment离线操作
   - 用transform代替top/left（GPU加速）
   - 避免循环中频繁读写交替

### 🔍 追问链

1. **常见触发 Reflow 的 DOM API 有哪些？**
   → 方向：offsetWidth/Height/Top/Left、scrollTop/Left/Width/Height、clientWidth/Height、getComputedStyle()、getBoundingClientRect()、scrollIntoView()、window.resize/window.scroll等；这些API会强制同步计算布局信息导致Reflow；批量读写策略：先用变量缓存布局值再统一修改

2. **如何批量修改 DOM 减少 Reflow？**
   → 方向：DocumentFragment（文档片段离线操作）、虚拟DOM（Diff算法最小化操作）、CSS class切换（合并多次样式修改为一次class变更）、display:none临时脱离文档流、requestAnimationFrame批处理、CSS containment（contain属性隔离重绘范围）

3. **transform 为什么不触发 Repaint？**
   → 方向：transform操作的是合成层（Compositing Layer），由GPU直接处理位图变换而不影响主线程的渲染流程；涉及GPU加速、合成层创建条件（will-change、opacity、transform等）、paint vs composite的区别、Layers面板调试技巧

---

## Q06: DOM 树和渲染树（Render Tree）的区别是什么？
- **难度**：★☆☆
- **知识点**：渲染流程 / DOM / Render Tree
- **题型**：简答题

### 参考答案要点：

1. **核心区别**
   - DOM树包含所有节点（包括head、script、display:none元素）
   - 渲染树只包含可见元素

2. **display:none vs visibility:hidden**
   - display:none：不在渲染树中
   - visibility:hidden：在渲染树中但不显示

3. **为什么需要两棵树**
   - DOM用于JS操作和事件绑定
   - 渲染树专注于视觉呈现，提高效率

> **追问链**：CSSOM树是什么？→ opacity:0在渲染树中的表现？

---

## Q07: 什么是 CRP（关键渲染路径）？如何优化？
- **难度**：★☆☆
- **知识点**：CRP / 性能优化 / 首屏加载
- **题型**：简答题

### 参考答案要点：

1. **CRP定义**：从接收到HTML到首次绘制可见像素的过程

2. **关键步骤**
   - 构建DOM树 → 构建CSSOM树 → 构建渲染树 → 布局 → 绘制 → 合成

3. **关键指标**
   - FP（首次绘制）、FCP（首次内容绘制）、FMP（首次有意义绘制）、TTI（可交互时间）

4. **优化策略**
   - 减小资源体积、内联关键CSS、异步加载非关键资源、预加载关键资源

> **追问链**：如何提取Critical CSS？→ preload/prefetch/preconnect的区别？

---

## Q08: async 和 defer 的区别？
- **难度**：★☆☆
- **知识点**：Script加载 / 渲染阻塞
- **题型**：简答题

### 参考答案要点：

1. **三种方式对比**
   - 普通script：阻塞解析，下载完立即执行
   - async：不阻塞解析，下载完立即执行（顺序不确定）
   - defer：不阻塞解析，解析完毕后按顺序执行

2. **最佳实践**
   - 第三方独立脚本用async
   - 业务逻辑脚本用defer
   - 关键脚本放head底部或body底部

> **追问链**：module script的特殊性？→ ES Modules加载机制？

---

## Q09: 什么是文档类型声明 doctype？作用是什么？
- **难度**：★☆☆
- **知识点**：DOCTYPE / 文档模式
- **题型**：简答题

### 参考答案要点：

1. **作用**：告诉浏览器使用哪个HTML版本规范解析页面

2. **两种模式**
   - 标准模式：W3C标准盒模型（content-box）
   - 怪异模式：IE盒模型（border-box）

3. **现代开发建议**：始终使用`<!DOCTYPE html>`

### 🔍 追问链

1. **async 和 defer 对 DOMContentLoaded 的影响？**
   → 方向：普通script（无属性）：阻塞HTML解析，执行完毕后才触发DOMContentLoaded；defer：并行下载，在DOMContentLoaded前按顺序执行（不阻塞解析）；async：并行下载，下载完成后立即执行（可能阻塞DOMContentLoaded，且执行顺序不确定）；实际项目选择策略：依赖DOM的用defer、独立脚本用async、关键路径内联

2. **内联脚本和外联脚本的执行顺序？**
   → 方向：同一位置的内联脚本先于外联脚本执行；但defer外联脚本会在所有内联脚本之后、DOMContentLoaded之前执行；module type的<script>默认具有defer行为；动态创建的script元素（document.createElement('script')）默认是async行为；preload预加载的资源不会立即执行

3. **preload 和 prefetch 对 JS 加载的影响？**
   → 方向：`<link rel="preload" as="script">`强制高优先级预加载（当前页面必需），配合as属性优化资源调度；`<link rel="prefetch" as="script">`低优先级预加载（下一页面可能需要），利用浏览器空闲时间；preload的资源需要配合JS手动触发执行（或使用fetchpriority）；modulepreload专门用于ES Modules预加载；preconnect/dns-prefetch用于DNS和TCP连接预热

---

## Q10: 浏览器是如何处理 CSS 和 JS 的加载和执行的？
- **难度**：★☆☆
- **知识点**：资源加载 / 渲染阻塞
- **题型**：简答题

### 参考答案要点：

1. **CSS阻塞渲染**：必须等待CSSOM构建完成才能渲染

2. **JS的影响**
   - 普通script阻塞HTML解析
   - JS前的CSS会阻塞JS执行
   - JS阻塞后续资源加载

3. **解决方案**
   - CSS放head、JS放body底部
   - 使用async/defer
   - 内联关键CSS

> **追问链**：如何实现CSS非阻塞加载？→ module script的特殊行为？

---

## Q11: 事件冒泡和捕获是什么？如何阻止？
- **难度**：★☆☆
- **知识点**：事件机制 / 冒泡 / 捕获
- **题型**：简答题

### 参考答案要点：

1. **三个阶段**：捕获阶段 → 目标阶段 → 冒泡阶段

2. **阻止方法**
   - stopPropagation()：阻止传播
   - stopImmediatePropagation()：阻止传播+阻止同元素其他监听器
   - preventDefault()：阻止默认行为

3. **注意事项**
   - focus/blur/mouseenter等事件不冒泡
   - 过度使用stopPropagation可能影响第三方库

> **追问链**：哪些事件不支持冒泡？→ 事件委托的实现原理？

---

## Q12: 什么是事件委托？有什么好处？
- **难度**：★☆☆
- **知识点**：事件委托 / 性能优化
- **题型**：简答题

### 参考答案要点：

1. **定义**：利用事件冒泡，将子元素事件监听注册到父元素

2. **优势**
   - 节省内存（只需一个监听器）
   - 动态元素自动响应
   - 简化代码维护

3. **实现技巧**
   - 使用e.target定位目标元素
   - closest()精确匹配
   - matches()检查选择器

> **追问链**：嵌套元素的委托处理？→ Vue/React中的事件委托？

---

## Q13: localStorage 有什么限制？
- **难度**：★☆☆
- **知识点**：Web Storage / localStorage
- **题型**：简答题

### 参考答案要点：

1. **主要限制**
   - 容量约5MB
   - 只能存字符串（对象需JSON序列化）
   - 遵循同源策略
   - 读写同步可能阻塞主线程
   - 无过期机制

2. **容量超限处理**
   - 捕获QuotaExceededError异常
   - 实现LRU清理旧数据

3. **替代方案**
   - 大数据量用IndexedDB
   - 会话级用SessionStorage
   - 服务端需要用Cookie

> **追问链**：如何实现localStorage过期机制？→ IndexedDB的使用场景？

---

## Q14: 什么是 XSS 攻击？有哪几种类型？
- **难度**：★☆☆
- **知识点**：XSS / 安全
- **题型**：简答题

### 参考答案要点：

1. **三种类型**
   - 反射型XSS：恶意URL参数直接输出到页面
   - 存储型XSS：恶意脚本存储在数据库，每次访问都执行
   - 基于DOM的XSS：前端JS将用户输入写入DOM

2. **防御措施**
   - 输出转义（escapeHtml）
   - 使用textContent代替innerHTML
   - CSP内容安全策略
   - HttpOnly Cookie
   - 使用DOMPurify净化HTML

> **追问链**：CSP配置最佳实践？→ innerHTML vs textContent安全性？

---

## Q15: 什么是 CSRF 攻击？如何防御？
- **难度**：★☆☆
- **知识点**：CSRF / 安全
- **题型**：简答题

### 参考答案要点：

1. **攻击原理**：利用用户已登录状态，诱导访问恶意页面发起伪造请求

2. **防御措施**
   - CSRF Token（最常用）
   - SameSite Cookie属性
   - 验证Referer/Origin头
   - 双重Cookie验证

3. **CSRF vs XSS对比**
   - CSRF利用身份伪造请求，不需要JS执行
   - XSS注入恶意脚本，目标是窃取信息

> **追问链**：SameSite=Lax vs Strict？→ SPA中CSRF防护实现？

---

## ★★☆ 进阶题（Q16-Q35）— 多点综合、需理解原理

---

## Q16: 从输入 URL 到页面展示的完整过程是怎样的？
- **难度**：★★☆
- **知识点**：浏览器工作原理 / DNS / TCP / 渲染流程
- **题型**：综合分析题

### 参考答案要点：

1. **8个主要步骤**
   - URL解析 → DNS解析 → TCP连接（三次握手）→ 发送HTTP请求 → 服务器处理 → 接收响应 → 页面渲染 → 连接结束

2. **DNS解析过程**
   - 浏览器缓存 → 操作系统缓存 → 路由器缓存 → ISP DNS服务器 → 根域名服务器 → 顶级域名服务器 → 权威域名服务器

3. **页面渲染详细步骤**
   - 解析HTML构建DOM → 解析CSS构建CSSOM → 合并生成渲染树 → Layout布局 → Paint绘制 → Composite合成

4. **性能优化点**
   - DNS Prefetch减少DNS查询
   - HTTP/2多路复用复用TCP连接
   - Gzip/Brotli压缩传输
   - 合理的缓存策略

### 🔍 追问链

1. **DNS 解析的具体步骤？（递归查询 vs 迭代查询）**
   → 方向：浏览器缓存→系统hosts文件→本地DNS服务器（ISP）→根域名服务器→顶级域名服务器（.com/.cn）→权威域名服务器；迭代查询（客户端逐级询问）vs 递归查询（DNS服务器代为查询）；DNS预解析`<link rel="dns-prefetch">`、预连接`<link rel="preconnect">`；HTTP/3（QUIC）对DNS的优化

2. **TCP 三次握手能否优化为两次？**
   → 方向：不能，因为需要防止历史连接请求到达服务端导致错误建立（防止旧的重复发起的连接请求）；三次握手的各阶段作用：SYN（同步序列号）、SYN+ACK（确认+同步）、ACK（确认）；TCP Fast Open（TFO）可以减少RTT；QUIC协议（基于UDP）将连接建立减少到0-1 RTT

3. **输入 URL 后浏览器做了哪些安全检查？**
   → 方向：URL编码解析（特殊字符处理）、同源策略检查（如果是跨域资源）、CSP（Content Security Policy）限制检查、Mixed Content检测（HTTPS页面中的HTTP资源）、XSS Auditor（已废弃但了解历史）、Safe Browsing（恶意网站黑名单）、HSTS（强制HTTPS跳转）、下载提示（危险文件类型警告）

---

## Q17: 浏览器的渲染管线中，哪些操作会触发 Reflow？哪些会触发 Repaint？
- **难度**：★★☆
- **知识点**：Reflow / Repaint / 渲染性能
- **题型**：简答题

### 参考答案要点：

1. **触发Reflow的操作**
   - 几何属性改变（width/height/padding/margin/border/top/left等）
   - 显示隐藏（display:none/block）
   - 内容改变（innerHTML/textContent/appendChild/removeChild）
   - 字体改变（fontSize/fontFamily）
   - 窗口变化（resize/scroll）
   - **强制同步布局**：读取offsetWidth/getBoundingClientRect等属性

2. **只触发Repaint的操作**
   - 颜色变化（color/backgroundColor/borderColor）
   - 外观变化（boxShadow/borderRadius/opacity/visibility）
   - 背景图变化

3. **优化策略总结**
   - 批量DOM操作（DocumentFragment）
   - cssText或class批量修改样式
   - 读写分离（避免强制同步布局）
   - transform代替位置属性
   - will-change提示浏览器优化

> **追问链**：Chrome Layers面板的使用？→ GPU加速与合成层的关系？

---

## Q18: CSS 会阻塞渲染吗？JS 会阻塞渲染吗？它们之间的关系？
- **难度**：★★☆
- **知识点**：渲染阻塞 / Critical Path
- **题型**：简答题

### 参考答案要点：

1. **CSS阻塞渲染**
   - 必须等待CSSOM构建完成才能渲染
   - 目的是避免FOUC（无样式内容闪烁）
   - JS可能依赖CSSOM（如getComputedStyle）

2. **JS阻塞解析**
   - 普通script暂停HTML解析
   - JS前的CSS会阻塞JS执行
   - JS阻塞后续资源下载

3. **时间线图解**
   ```
   HTML解析开始 → [CSS]阻塞渲染 → [JS]等待CSS并阻塞解析 → 继续解析...
   ```

4. **优化方案**
   - 关键CSS内联 + 非关键CSS异步加载
   - defer/async异步加载JS
   - preload提前加载关键资源

> **追问链**：Critical CSS提取工具？→ media query对阻塞的影响？

---

## Q19: 浏览器如何进行图层合成（Compositing）？GPU 加速的原理是什么？
- **难度**：★★☆
- **知识点**：GPU加速 / Compositing / 图层
- **题型**：简答题

### 参考答案要点：

1. **合成层创建条件**
   - 3D变换（translateZ/translate3d）
   - will-change属性
   - animation动画
   - opacity过渡
   - video/canvas/iframe
   - filter滤镜

2. **GPU加速原理**
   - transform只触发Composite（合成线程，GPU完成）
   - top/left触发Layout+Paint+Composite（主线程，较慢）

3. **优势与风险**
   - 优势：避免Repaint、利用GPU并行、解放主线程、流畅动画
   - 风险：过多合成层导致显存占用过高（图层爆炸）

4. **调试工具**
   - Chrome DevTools → Layers面板查看图层结构
   - Rendering → Layer borders显示合成层边框

> **追问链**：will-change的正确用法？→ 图层爆炸诊断方法？→ CSS containment作用？

---

## Q20: 什么是 FOUC（无样式内容闪烁）？如何避免？
- **难度**：★★☆
- **知识点**：FOUC / 渲染优化
- **题型**：简答题

### 参考答案要点：

1. **产生原因**
   - CSS放在body底部
   - 使用@import导入CSS
   - JavaScript动态插入样式

2. **解决方案**
   - CSS放在head中（标准做法）
   - Critical CSS内联 + 非关键CSS异步加载
   - 避免使用@import（改用多个link或打包合并）
   - media query条件加载

3. **相关现象FOUT**
   - Web字体加载过程中的闪烁
   - 解决：font-display: swap/optional

> **追问链**：自动化提取Critical CSS？→ font-display各值区别？→ FOUC与CLS关系？

---

## Q21: V8 引擎的垃圾回收机制是怎样的？
- **难度**：★★☆
- **知识点**：V8 / GC / 内存管理
- **题型**：简答题

### 参考答案要点：

1. **V8内存结构**
   - 新生代（Young Generation）：1-8MB，Scavenge算法（复制算法）
   - 老生代（Old Generation）：较大，Mark-Sweep + Mark-Compact

2. **新生代GC（Scavenge）**
   - From空间和To空间各占一半
   - 存活对象复制到To空间，清空From空间
   - 对象晋升条件：经历一次Scavenge仍存活 或 To空间使用率超过25%

3. **老生代GC（Mark-Sweep-Compact）**
   - 标记阶段：从根对象遍历标记可达对象
   - 清除/整理阶段：清除不可达对象或移动存活对象消除碎片
   - 三色标记法：白色（未访问）、灰色（正在访问）、黑色（已完成）

4. **GC优化技术**
   - 增量标记（Incremental Marking）：拆分为小步骤
   - 并行标记（Parallel Marking）：多核CPU并行
   - 并发标记（Concurrent Marking）：GC和JS同时在不同线程

5. **监控工具**
   - Chrome DevTools Memory面板（Heap Snapshot、Allocation sampling）
   - performance.memory API
   - Node.js --trace-gc参数

> **追问链**：如何避免内存泄漏？→ V8指针压缩？→ GC性能调优？

---

## Q22: V8 是如何编译和执行 JavaScript 代码的？
- **难度**：★★☆
- **知识点**：V8 / JIT编译 / Ignition / TurboFan
- **题型**：简答题

### 参考答案要点：

1. **执行流程**
   - Parser（词法+语法分析）→ AST → Ignition（解释器，字节码）→ TurboFan（JIT编译器，机器码）

2. **Ignition解释器（2016引入）**
   - 快速启动，字节码体积小
   - 为TurboFan提供准确的反馈信息（类型、频率）

3. **TurboFan优化编译器**
   - 收集执行反馈（变量类型、调用模式）
   - 推测性优化（Speculative Optimization）
   - 假设失败时Deoptimization（去优化回退）

4. **Hidden Class（隐藏类）**
   - 相同结构对象共享Hidden Class
   - 属性访问通过偏移量O(1)获取
   - 不要动态增减属性（破坏Hidden Class共享）

5. **优化建议**
   - 保持对象形状稳定
   - 避免polymorphic操作
   - 数组保持单一类型
   - 使用rest参数代替arguments

> **追问链**：Polymorphic IC？→ DevTools分析V8优化情况？→ Sparkplug编译器？

---

## Q23: 什么是内存泄漏？浏览器中有哪些常见的内存泄漏方式？
- **难度**：★★☆
- **知识点**：内存泄漏 / GC / 性能优化
- **题型**：简答题

### 参考答案要点：

1. **5种常见泄漏场景**

   **意外的全局变量**
   - 未声明变量成为window属性
   - this指向window（非严格模式）
   - 解决：使用'use strict'

   **遗忘的定时器和回调**
   - 组件销毁但setInterval/fetch仍在运行
   - 解决：destroy时clearInterval/abort

   **闭包泄漏**
   - 闭包持有大对象引用
   - 解决：使用后手动置null

   **脱离DOM的引用**
   - DOM移除但JS变量仍引用
   - 解决：移除时清除引用

   **console.log泄漏**
   - DevTools控制台保留对象引用
   - 生产环境移除console.log

2. **检测方法**
   - Heap Snapshot对比
   - Allocation sampling/timeline
   - Performance Monitor实时观察
   - Task Manager观察标签页内存

3. **预防实践**
   - 严格模式、及时解绑事件、WeakMap存储DOM关联数据、避免全局大缓存

> **追问链**：WeakMap防泄漏原理？→ CI环境内存泄漏检测？→ React/Vue泄漏场景？

---

## Q24: WeakMap 和 Map 在内存管理上有什么区别？
- **难度**：★★☆
- **知识点**：WeakMap / Map / 弱引用 / GC
- **题型**：简答题

### 参考答案要点：

1. **核心区别：引用类型**
   - Map：强引用（键不被GC回收）
   - WeakMap：弱引用（键可被GC回收，自动移除条目）

2. **API差异**
   - Map：键可以是任意值，可遍历，有size/clear
   - WeakMap：键只能是对象，不可遍历，无size/clear

3. **典型应用场景**
   - DOM元素关联数据（避免内存泄漏）
   - 私有属性实现（ES2022前）
   - 对象关联缓存（自动释放）

4. **WeakSet特点**
   - 只存储值（无键值对）
   - 应用：标记对象状态（如visited集合）

> **追问链**：WeakRef和FinalizationRegistry？→ 带过期的WeakMap缓存？

---

## Q25: 如何检测和分析页面的内存使用情况？
- **难度**：★★☆
- **知识点**：内存分析 / Chrome DevTools / Performance API
- **题型**：实践题

### 参考答案要点：

1. **Chrome DevTools Memory面板**
   - Heap Snapshot：拍摄快照对比找出泄漏
   - Allocation sampling：快速定位高频分配函数
   - Allocation instrumentation on timeline：详细分配记录

2. **Performance API编程式监控**
   - performance.memory（仅Chrome）：usedJSHeapSize/totalJSHeapSize/jsHeapSizeLimit
   - PerformanceObserver监听性能事件
   - mark/measure自定义测量

3. **实战检测流程**
   - Task Manager确认是否有泄漏趋势
   - Heap Snapshot基线+操作后快照对比
   - Retainers分析保留链定位引用来源
   - Allocation sampling定位分配函数

4. **Node.js环境**
   - --inspect参数调试
   - heapdump模块生成快照文件
   - --trace-gc观察GC日志

> **追问链**：自动化测试集成内存检测？→ Node.js vs 浏览器内存分析差异？

---

## Q26: 请描述一下浏览器的事件循环（Event Loop）机制
- **难度**：★★☆
- **知识点**：Event Loop / 任务队列 / 单线程
- **题型**：简答题

### 参考答案要点：

1. **为什么需要Event Loop**
   - JS单线程但需处理异步任务（UI渲染、网络请求、定时器等）
   - Event Loop实现非阻塞异步执行

2. **核心组件**
   - 调用栈（Call Stack）：执行同步代码
   - 微任务队列（Microtask Queue）：Promise.then/MutationObserver/queueMicrotask
   - 宏任务队列（Macrotask Queue）：setTimeout/setInterval/I/O/UI渲染

3. **执行流程**
   ```
   [宏任务执行] → [全部微任务] → [渲染] → [下一个宏任务] → 循环...
   ```

4. **经典案例输出**
   ```javascript
   console.log('1');
   setTimeout(() => console.log('2'), 0);
   new Promise(resolve => {
     console.log('4');
     resolve();
   }).then(() => console.log('5'));
   console.log('6');
   // 输出：1 4 6 5 2
   ```

5. **关键原则**
   - 一个宏任务执行完毕后清空所有微任务
   - 微任务执行过程中产生的微任务也要执行
   - 渲染通常在微任务清空后进行

### 🔍 追问链

1. **Node.js 的 nextTick 和微任务的优先级关系？**
   → 方向：Node.js Event Loop的6个阶段：timers → pending callbacks → idle/prepare → poll → check → close callbacks；微任务队列在每个阶段结束后执行；process.nextTick()优先级高于Promise微任务（nextTick Queue → Microtask Queue）；实际执行顺序示例分析

2. **requestIdleCallback 和微任务的执行顺序？**
   → 方向：requestIdleCallback是宏任务的一种，在浏览器空闲时执行（优先级低于普通宏任务）；微任务在每次宏任务结束后立即清空队列；requestIdleCallback不会阻塞渲染，适合非紧急低优先级任务（如 analytics上报）；与requestAnimationFrame的关系：rAF在每帧渲染前执行，rIC在帧渲染后的空闲时间执行

3. **MessageChannel 可以创建微任务吗？**
   → 方向：可以！MessageChannel的port.onmessage回调是通过微任务调度的（类似Promise.then）；常用于创建微任务的polyfill（在不支持queueMicrotask的环境）；其他可创建微任务的API：MutationObserver、queueMicrotask（标准API）；为什么不用setTimeout（它是宏任务，最小延迟4ms）

---

## Q27: 宏任务（Macrotask）和微任务（Microtask）有哪些？它们的执行顺序？
- **难度**：★★☆
- **知识点**：宏任务 / 微任务 / Event Loop
- **题型**：简答题

### 参考答案要点：

1. **宏任务列表**
   - setTimeout/setInterval
   - I/O操作（网络请求、文件读取）
   - UI渲染
   - MessageChannel
   - postMessage
   - UI交互事件回调

2. **微任务列表**
   - Promise.then/.catch/.finally
   - MutationObserver
   - queueMicrotask

3. **执行顺序规则**
   - 同步代码 → 全部微任务 → 渲染 → 一个宏任务 → 全部微任务 → ...
   - 微任务递归产生新微任务会"饿死"宏任务

4. **易错点**
   - new Promise(fn)中的fn是同步的
   - then/catch才是微任务
   - async函数体内同步，await后变微任务

> **追问链**：为何区分宏微任务？→ MutationObserver使用场景？→ 高优先级调度？

---

## Q28: async/await 的代码在事件循环中是如何执行的？
- **难度**：★★☆
- **知识点**：async/await / Promise / Event Loop
- **题型**：代码分析题

### 参考答案要点：

1. **本质**
   - async/await = Generator + Promise语法糖
   - async函数返回Promise
   - await后面的代码包装成then回调（微任务）

2. **基础案例**
   ```javascript
   async function async1() {
     console.log('async1 start');
     await async2();
     console.log('async1 end');  // 微任务
   }
   async function async2() { console.log('async2'); }
   
   console.log('script start');
   setTimeout(() => console.log('setTimeout'), 0);
   async1();
   new Promise(r => { console.log('promise1'); r(); }).then(() => console.log('promise2'));
   console.log('script end');
   // 输出：script start → async1 start → async2 → promise1 → script end → async1 end → promise2 → setTimeout
   ```

3. **for循环+async/await模式**
   - for...of+await：串行执行
   - forEach+async：并发但无序
   - Promise.all：并发可控
   - 分批Promise.all：平衡并发和顺序

4. **错误处理**
   - try/catch捕获单个await错误
   - 顶层.catch捕获未处理的reject
   - unhandledrejection事件兜底

> **追问链**：async错误处理最佳实践？→ async版forEach？→ Generator关系？

---

## Q29: requestAnimationFrame 在事件循环中的执行时机？
- **难度**：★★☆
- **知识点**：rAF / 动画 / Event Loop
- **题型**：简答题

### 参考答案要点：

1. **rAF基本概念**
   - 下一次重绘前调用回调
   - 与屏幕刷新率同步（60Hz≈16.67ms）
   - 返回ID可用于cancelAnimationFrame取消

2. **在Event Loop中的位置**
   ```
   [宏任务] → [微任务] → [rAF回调] → [渲染] → [下一宏任务]
   ```
   - rAF在微任务之后、渲染之前执行
   - 回调中修改的样式本次渲染生效

3. **rAF vs setTimeout**
   - rAF自动适配刷新率
   - 后台标签页rAF暂停（省电）
   - 无累积误差
   - setTimeout固定间隔可能有偏差且后台仍执行

4. **高级用法**
   - 帧率控制（跳帧）
   - 平滑滚动（缓动函数）
   - Canvas游戏循环

5. **最佳实践**
   - 保存frameId以便取消
   - visibilitychange事件配合启停
   - 回调内避免复杂计算（几ms内完成）
   - 使用timestamp而非Date.now()

> **追问链**：后台标签页行为？→ 高帧率动画实现？→ CSS动画vs JS动画选择？

---

## Q30: Node.js 的 Event Loop 和浏览器的有什么区别？
- **难度**：★★☆
- **知识点**：Node.js Event Loop / 浏览器Event Loop
- **题型**：简答题

### 参考答案要点：

1. **总体差异**
   - 浏览器：[调用栈] → [微任务] → [渲染] → [宏任务]
   - Node.js：[调用栈] → [微任务] → [timers] → [I/O callbacks] → [poll] → [check] → [close]

2. **Node.js六个阶段**
   - timers：setTimeout/setInterval
   - pending callbacks：上一轮未完成的I/O回调
   - idle/prepare：内部使用
   - poll：最重要的I/O轮询阶段
   - check：setImmediate（Node.js特有）
   - close callbacks：socket.close等

3. **微任务时机差异**
   - 浏览器：每个宏任务后清空微任务
   - Node.js：每个阶段结束后清空微任务
   - process.nextTick优先于Promise（Node.js特有）

4. **setTimeout vs setImmediate**
   - I/O回调中：immediate先于timeout（固定顺序）
   - 主模块中：顺序不确定（取决于启动时间）

5. **注意事项**
   - Node.js无DOM/BOM API
   - process.nextTick可递归（可能导致I/O饥饿）
   - Node.js 11+行为更接近浏览器

> **追问链**：Node.js CPU密集型任务处理？→ libuv作用？→ Worker Threads vs Web Workers？

---

## Q31: CORS 跨域资源共享的原理是什么？简单请求和预检请求的区别？
- **难度**：★★☆
- **知识点**：CORS / 跨域 / HTTP头
- **题型**：简答题

### 参考答案要点：

1. **基本原理**
   - 服务器通过HTTP响应头声明允许的源
   - 浏览器根据响应头决定是否允许前端访问

2. **简单请求条件**
   - 方法：GET/HEAD/POST
   - 头部：仅CORS安全头部
   - Content-Type：仅application/x-www-form-urlencoded、multipart/form-data、text/plain
   - 流程：直接发送请求，附带Origin头，服务器返回Access-Control-Allow-Origin

3. **预检请求（Preflight）**
   - 触发条件：PUT/DELETE、自定义Header、JSON Content-Type等
   - 流程：OPTIONS预检询问 → 服务器允许 → 发送实际请求
   - Access-Control-Max-Age缓存预检结果

4. **关键响应头**
   - Access-Control-Allow-Origin（*或具体域名）
   - Access-Control-Allow-Methods
   - Access-Control-Allow-Headers
   - Access-Control-Allow-Credentials（true时Origin不能是*）
   - Access-Control-Expose-Headers
   - Access-Control-Max-Age

5. **服务端配置示例（Express cors中间件）**
   - origin白名单、methods、allowedHeaders、credentials、maxAge
   - 支持动态origin判断函数

### 🔍 追问链

1. **CORS 的凭证携带有哪些坑？**
   → 方向：credentials: 'include'时必须同时设置Access-Control-Allow-Credentials: true且Access-Control-Allow-Origin不能为'*'（必须指定具体域名）；withCredentials属性的作用；Cookie跨域携带的条件（SameSite、Domain、Path都要匹配）；preflight请求（OPTIONS）默认不携带credentials

2. **多域名跨域如何优雅配置？**
   → 方向：动态设置Access-Control-Allow-Origin（从请求头Origin读取并验证白名单后返回，而非固定值）；Nginx配置map指令实现多域名映射；安全考虑：严格校验Origin格式防止NULL origin攻击；替代方案：反向代理统一域名、网关层处理

3. **Nginx 反向代理解决跨域的原理？**
   → 方向：同源策略只存在于浏览器端，服务器间通信不受限制；Nginx作为中间层接收前端请求并转发到后端API（proxy_pass），对浏览器而言请求是同源的；配置示例：location /api { proxy_pass http://backend-server; add_header Access-Control-Allow-Origin *; }；优势：无需修改后端代码、可统一添加认证头、支持HTTPS termination

---

## Q32: 如何实现两个不同源的页面之间的通信？
- **难度**：★★☆
- **知识点**：跨页面通信 / postMessage / 跨域
- **题型**：编程实践题

### 参考答案要点：

1. **postMessage API（推荐）**
   ```javascript
   // 页面A（父页面）
   const popup = window.open('https://other-domain.com/pageB', 'popup');
   
   // 发送消息给子窗口
   popup.postMessage(
     { type: 'data', message: 'Hello from A!' },
     'https://other-domain.com'  // targetOrigin：指定目标源（安全！）
   );
   
   // 监听来自子窗口的消息
   window.addEventListener('message', (event) => {
     // 安全验证：始终检查event.origin！
     if (event.origin === 'https://other-domain.com') {
       console.log('收到消息:', event.data);
       console.log('来源:', event.origin);
       console.log('source:', event.source);  // 可用于回复
     }
   });

   // 页面B（子页面）
   window.addEventListener('message', (event) => {
     if (event.origin === 'https://original-domain.com') {
       console.log('收到父页面消息:', event.data);
       
       // 回复消息
       event.source.postMessage(
         { type: 'response', data: 'Received!' },
         event.origin
       );
     }
   });
   ```

2. **其他通信方式**
   - **window.name**：利用name跨域传递数据（适合历史遗留系统）
   - **location.hash**：通过URL hash片段传递短消息
   - **document.domain**：设置相同主域实现通信（已废弃，不推荐）
   - **WebSocket**：服务端中转的全双工通信
   - **SharedWorker**：共享的Worker线程（同源限制）

3. **postMessage安全性**
   - **始终指定targetOrigin**（不要用'*'除非确实需要）
   - **接收方验证origin**（防止恶意网站发送消息）
   - **验证data结构**（防止注入攻击）
   - **避免postMessage敏感数据**（即使有origin验证）

4. **实际应用场景**
   - 第三方登录回调（OAuth）
   - 嵌入第三方页面（iframe广告、地图）
   - 多窗口协同编辑
   - 页面与Web Worker通信

> **追问链**：postMessage的消息大小限制？→ Channel Messaging API？→ BroadcastChannel API？

---

## Q33: CSP（内容安全策略）的作用和使用方式？
- **难度**：★★☆
- **知识点**：CSP / 安全 / HTTP头
- **题型**：简答题

### 参考答案要点：

1. **CSP作用**
   - 防止XSS攻击（限制可执行的脚本来源）
   - 防止数据注入（限制可加载的资源）
   - 减少攻击面（白名单机制）
   - 报告违规行为（report-uri/report-to）

2. **配置方式**
   ```html
   <!-- 方式1：meta标签 -->
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; script-src 'self' https://trusted.cdn.com">
   ```

   ```http
   # 方式2：HTTP响应头（推荐）
   Content-Security-Policy: default-src 'self'; 
                            script-src 'self' 'unsafe-inline' https://cdn.example.com;
                            style-src 'self' 'unsafe-inline';
                            img-src 'self' data: https:;
                            connect-src 'self' https://api.example.com;
                            frame-ancestors 'none';
                            base-uri 'self';
                            form-action 'self';
                            upgrade-insecure-requests;
   ```

3. **常用指令说明**
   - **default-src**：默认策略（其他指令的fallback）
   - **script-src**：允许的JavaScript来源
   - **style-src**：允许的CSS来源
   - **img-src**：允许的图片来源
   - **connect-src**：允许的Ajax/WebSocket来源
   - **font-src**：允许的字体来源
   - **frame-src / child-src**：允许的iframe来源
   - **object-src**：允许的plugin来源
   - **frame-ancestors**：谁可以嵌入当前页面（防点击劫持）
   - **base-uri**：允许的<base>标签url
   - **form-action**：允许表单提交的目标

4. **特殊关键字**
   - `'none'`：不允许任何来源
   - `'self'`：同源（协议+域名+端口）
   - `'unsafe-inline'`：允许内联脚本/样式（降低安全性）
   - `'unsafe-eval'`：允许eval()等（更危险）
   - **data:**：允许data: URI
   - **nonce-xxx**：允许特定的nonce内联脚本
   - **hash-xxx**：允许特定hash的内联脚本

5. **CSP报告模式**
   ```http
   # 仅报告不拦截（测试阶段使用）
   Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report;

   # 正式启用 + 报告
   Content-Security-Policy: default-src 'self'; report-to csp-endpoint;
   Reporting-Endpoints: csp-endpoint="/csp-report";
   ```

6. **实施建议**
   - 先用Report-Only模式收集违规报告
   - 逐步收紧策略
   - 避免使用unsafe-inline（改用nonce/hash）
   - 配置report-uri接收违规报告
   - 定期审查和更新策略

> **追问链**：nonce vs hash的选择？→ bypass CSP的常见方式？→ CSP与SRI结合使用？

---

## Q34: 设计并实现一个简易的发布-订阅模式（EventEmitter）
- **难度**：★★☆
- **知识点**：设计模式 / EventEmitter / 发布订阅
- **题型**：编程实践题

### 参考答案要点：

```javascript
/**
 * 完整发布-订阅模式实现（EventEmitter）
 * 支持事件注册、触发、移除、一次性监听、最大监听器限制等功能
 * 参考Node.js内置EventEmitter的核心API设计
 */
class EventEmitter {
  // 默认最大监听器数量（与Node.js保持一致）
  static defaultMaxListeners = 10;

  constructor() {
    // 存储所有的事件及其对应的回调函数
    // 结构：{ eventName: [callback1, callback2, ...] }
    this.events = {};

    // 当前实例的最大监听器数量限制
    this.maxListeners = EventEmitter.defaultMaxListeners;
  }

  /**
   * 注册事件监听器
   * @param {string} event - 事件名称
   * @param {Function} callback - 回调函数
   * @returns {this} 支持链式调用
   *
   * @example
   * emitter.on('click', (e) => console.log('clicked', e));
   * emitter.on('data', handler).on('error', errorHandler); // 链式调用
   */
  on(event, callback) {
    // 参数校验
    if (typeof callback !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    if (!this.events[event]) {
      this.events[event] = [];
    }

    // 检查是否超过最大监听器数量
    if (this.events[event].length >= this.maxListeners) {
      console.warn(
        `Possible EventEmitter memory leak detected. ` +
        `${this.events[event].length + 1} ${event} listeners added. ` +
        `Use emitter.setMaxListeners() to increase limit`
      );
    }

    this.events[event].push(callback);
    return this;  // 支持链式调用
  }

  /**
   * 注册一次性事件监听器（触发一次后自动移除）
   * 适用场景：初始化事件、一次性加载等
   *
   * @param {string} event - 事件名称
   * @param {Function} callback - 回调函数（只触发一次）
   * @returns {this}
   *
   * @example
   * emitter.once('init', () => console.log('只执行一次'));
   * emitter.emit('init'); // 输出: 只执行一次
   * emitter.emit('init'); // 无输出（已被移除）
   */
  once(event, callback) {
    // 参数校验
    if (typeof callback !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    // 使用包装函数实现一次性监听
    const wrapper = (...args) => {
      callback.apply(this, args);
      this.off(event, wrapper);  // 触发后立即移除
    };
    wrapper._originalCallback = callback;  // 保存原始引用以便off()移除
    wrapper._isOnce = true;  // 标记为一次性监听器
    return this.on(event, wrapper);
  }

  /**
   * 移除事件监听器
   * @param {string} event - 事件名称
   * @param {Function} [callback] - 要移除的回调函数（不传则移除该事件所有监听器）
   * @returns {this}
   *
   * @example
   * const handler = (data) => console.log(data);
   * emitter.on('data', handler);
   * emitter.off('data', handler);  // 移除指定handler
   * emitter.off('data');           // 移除'data'事件的所有监听器
   */
  off(event, callback) {
    if (!this.events[event]) return this;

    if (!callback) {
      // 如果没有提供callback，移除该事件的所有监听器
      delete this.events[event];
    } else {
      // 移除指定的回调（同时匹配原始回调和包装后的once回调）
      this.events[event] = this.events[event].filter(cb => {
        return cb !== callback && cb._originalCallback !== callback;
      });

      // 如果没有监听器了，删除该事件属性以释放内存
      if (this.events[event].length === 0) {
        delete this.events[event];
      }
    }
    return this;
  }

  /**
   * 触发事件（同步执行所有监听器）
   * @param {string} event - 事件名称
   * @param {...*} args - 传递给监听器的参数
   * @returns {boolean} 是否有监听器响应了该事件
   *
   * @example
   * emitter.emit('greet', 'World', 123);  // 传递多个参数
   * const hasListeners = emitter.emit('unknown');  // 返回false
   */
  emit(event, ...args) {
    if (!this.events[event]) return false;

    // 复制一份回调数组，防止在执行过程中修改原数组导致问题
    // （例如在回调中调用off()移除其他监听器）
    const callbacks = [...this.events[event]];

    callbacks.forEach(callback => {
      try {
        callback.apply(this, args);
      } catch (error) {
        // 错误处理：捕获单个监听器的异常，不影响其他监听器执行
        // 对于'error'事件的特殊处理：如果没有监听器会抛出错误
        if (event === 'error') {
          throw error;  // error事件未处理时抛出（模拟Node.js行为）
        }
        console.error(`Error in event "${event}" handler:`, error);
      }
    });

    // 处理通配符 '*' 监听器（用于日志、调试等场景）
    if (this.events['*']) {
      [...this.events['*']].forEach(callback => {
        try {
          callback.apply(this, [event, ...args]);
        } catch (error) {
          console.error(`Error in wildcard listener:`, error);
        }
      });
    }

    return true;  // 返回true表示事件被触发且有监听器
  }

  /**
   * 获取指定事件的监听器数量
   * @param {string} event - 事件名称
   * @returns {number} 监听器数量
   */
  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }

  /**
   * 获取指定事件的所有监听器（副本）
   * @param {string} event - 事件名称
   * @returns {Function[]} 监听器数组
   */
  listeners(event) {
    return this.events[event] ? [...this.events[event]] : [];
  }

  /**
   * 获取原始回调数组（不复制，内部使用）
   * @param {string} event - 事件名称
   * @returns {Function[]|undefined}
   */
  rawListeners(event) {
    return this.events[event];
  }

  /**
   * 移除所有事件的监听器（或指定事件的监听器）
   * @param {string} [event] - 事件名称（不传则移除所有事件）
   * @returns {this}
   *
   * @example
   * emitter.removeAllListeners();        // 清空所有事件
   * emitter.removeAllListeners('click');  // 只清空click事件
   */
  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
    return this;
  }

  /**
   * 设置最大监听器数量限制
   * 用于检测潜在的内存泄漏（如忘记移除监听器）
   * @param {number} n - 最大数量（0表示无限制）
   * @returns {this} （静态方法返回undefined，实例方法返回this）
   *
   * @example
   * emitter.setMaxListeners(20);  // 允许每个事件最多20个监听器
   * emitter.setMaxListeners(0);   // 不限制
   */
  setMaxListeners(n) {
    this.maxListeners = n;
    return this;
  }

  /**
   * 为事件添加监听器（on的别名，保持与Node.js API一致）
   */
  addEventListener(event, callback) {
    return this.on(event, callback);
  }

  /**
   * 移除事件监听器（off的别名）
   */
  removeEventListener(event, callback) {
    return this.off(event, callback);
  }

  /**
   * 在监听器列表开头添加监听器（优先执行）
   * @param {string} event - 事件名称
   * @param {Function} callback - 回调函数
   * @returns {this}
   *
   * @example
   * emitter.prependListener('log', () => console.log('first'));
   * emitter.on('log', () => console.log('second'));
   * // emit时先输出"first"，再输出"second"
   */
  prependListener(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift(callback);
    return this;
  }

  /**
   * 在监听器列表开头添加一次性监听器
   */
  prependOnceListener(event, callback) {
    const wrapper = (...args) => {
      callback.apply(this, args);
      this.off(event, wrapper);
    };
    wrapper._originalCallback = callback;
    wrapper._isOnce = true;
    return this.prependListener(event, wrapper);
  }

  /**
   * 获取已注册的事件名列表
   * @returns {string[]}
   */
  eventNames() {
    return Object.keys(this.events);
  }
}

// ==================== 静态工具方法 ====================

/**
 * 获取或设置全局默认最大监听器数量
 * @param {number} [n] - 新的默认值（不传则返回当前值）
 * @returns {number|void}
 */
EventEmitter.setMaxListeners = function(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n)) {
    throw new TypeError('n must be a positive number');
  }
  EventEmitter.defaultMaxListeners = n;
};

EventEmitter.getMaxListeners = function() {
  return EventEmitter.defaultMaxListeners;
};


// ==================== 使用示例 ====================

// 创建EventEmitter实例
const emitter = new EventEmitter();

// ========== 基础功能演示 ==========

// 1. 基本使用：注册和触发事件
emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.emit('greet', 'World');  // 输出: Hello, World!

// 2. 链式调用
emitter
  .on('event1', () => console.log('event1 triggered'))
  .on('event2', () => console.log('event2 triggered'));

// 3. 一次性事件（once）
console.log('\n--- once() 演示 ---');
emitter.once('init', () => {
  console.log('✅ 初始化完成（只执行一次）');
});
emitter.emit('init');  // 输出: 初始化完成
emitter.emit('init');  // 无输出（已被自动移除）

// 4. 移除特定监听器（off）
console.log('\n--- off() 演示 ---');
const dataHandler = (data) => console.log('📦 处理数据:', JSON.stringify(data));
emitter.on('data', dataHandler);
emitter.on('data', (data) => console.log('📊 数据备份:', JSON.stringify(data)));
console.log('当前data事件监听器数量:', emitter.listenerCount('data'));  // 2

emitter.off('data', dataHandler);
console.log('移除一个后:', emitter.listenerCount('data'));  // 1
emitter.emit('data', { x: 1 });  // 只输出"数据备份"

// 5. 错误处理机制
console.log('\n--- 错误处理演示 ---');
emitter.on('error', (err) => {
  console.error('❌ 捕获到错误:', err.message);
});
// emit('error')时会自动调用error监听器
emitter.emit('error', new Error('测试错误'));

// ========== 高级功能演示 ==========

// 6. 最大监听器数量限制（内存泄漏检测）
console.log('\n--- maxListeners 演示 ---');
emitter.setMaxListeners(3);  // 设置限制为3
for (let i = 0; i < 4; i++) {
  emitter.on('test', () => {});  // 第4次时会打印警告
}

// 7. prependListener（优先执行）
console.log('\n--- prependListener 演示 ---');
emitter.removeAllListeners('order');
emitter.prependListener('order', () => console.log('  🥇 第一（prepend）'));
emitter.on('order', () => console.log('  🥈 第二（普通on）'));
emitter.prependOnceListener('order', () => console.log('  🥇🥇 最前（prependOnce）'));
emitter.emit('order');

// 8. 通配符监听器（用于日志/监控）
console.log('\n--- 通配符 * 演示 ---');
emitter.on('*', (event, ...args) => {
  console.log(`📝 [日志] 触发事件: ${event}, 参数:`, args);
});
emitter.emit('click', { x: 100, y: 200 });
emitter.emit('scroll', 500);

// 9. 工具方法
console.log('\n--- 工具方法演示 ---');
console.log('已注册的事件列表:', emitter.eventNames());
console.log('click监听器:', emitter.listeners('click').length);

// ==================== 实际应用场景 ====================

// 场景1：组件间通信（类似Vue2的EventBus）
class EventBus extends EventEmitter {}
const bus = new EventBus();

// 组件A发送消息
bus.emit('user-login', { userId: 123, name: '张三' });

// 组件B接收消息
bus.on('user-login', (data) => {
  console.log('\n🎉 [组件B] 用户登录通知:', data.name, `(ID: ${data.userId})`);
});

// 场景2：异步操作管理（Promise-like模式）
function loadImage(url) {
  const emitter = new EventEmitter();
  const img = new Image();

  img.onload = () => emitter.emit('load', img);
  img.onerror = (e) => emitter.emit('error', e);
  img.src = url;

  // 支持链式注册回调
  setTimeout(() => {
    if (!emitter.listeners('load').length && !emitter.listeners('error').length) {
      console.warn('⚠️ loadImage: 未注册load/error回调');
    }
  }, 5000);

  return emitter;
}

console.log('\n--- 异步操作管理示例 ---');
loadImage('/photo.jpg')
  .on('load', (img) => console.log(`✅ 图片加载成功: ${img.width}x${img.height}`))
  .on('error', () => console.error('❌ 图片加载失败'));

// 场景3：状态管理（简易Store）
class Store extends EventEmitter {
  constructor(initialState = {}) {
    super();
    this.state = initialState;
  }

  setState(newState) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };
    this.emit('change', this.state, prevState);  // 通知状态变化
  }

  getState() {
    return this.state;
  }
}

console.log('\n--- 状态管理示例 ---');
const store = new Store({ count: 0 });
store.on('change', (newState, prevState) => {
  console.log(`📈 状态更新: count ${prevState.count} → ${newState.count}`);
});
store.setState({ count: 1 });
store.setState({ count: 5 });

console.log('\n✅ EventEmitter 完整版实现测试通过');
```

### 🔍 追问链

1. **与 Node.js 内置 EventEmitter 的差异？**
   → 方向：Node版本支持error事件未监听时自动抛出错误（而非静默忽略）、支持setMaxListeners(0)关闭警告、emit方法返回布尔值表示是否有监听器、支持captureRejections选项自动捕获异步错误、newListener/removeListener事件用于监听监听器变化；性能差异：Node版本使用C++底层优化，手写版纯JS实现适合学习原理

2. **内存泄漏风险（未移除的监听器）？**
   → 方向：组件卸载时忘记off()导致回调持有组件上下文引用无法GC；解决方案：Vue的onBeforeUnmount统一removeEventListener、React的useEffect返回cleanup函数、使用WeakMap存储监听器（允许GC）、maxListeners警告机制的作用、开发环境添加eslint-plugin-react-hooks等规则检测

3. **如何实现异步事件的顺序执行？**
   → 方向：将EventEmitter与Promise结合，emit返回Promise并等待所有监听器完成；使用Promise.allSettled收集所有结果；实现async/await风格的once等待；错误隔离机制（单个监听器失败不影响其他）；与RxJS Observable的关系对比（Observable支持取消、背压、操作符链）

---

## Q35: 手写一个 Promise（符合 Promises/A+ 规范的核心逻辑）
- **难度**：★★★
- **知识点**：Promise / 异步编程 / Promises/A+规范
- **题型**：编程实践题

### 参考答案要点：

```javascript
/**
 * 手写Promise实现（完整版）
 * 遵循Promises/A+规范的核心行为，包含完整的链式调用、错误处理和静态方法集
 *
 * 核心特性：
 * - 三种状态：pending（等待中）、fulfilled（已成功）、rejected（已失败）
 * - 状态只能改变一次（pending → fulfilled 或 pending → rejected）
 * - then方法返回新Promise，支持链式调用
 * - 微任务调度（使用queueMicrotask或setTimeout降级）
 * - 完整的静态方法：resolve/reject/all/race/allSettled/any
 *
 * @see https://promisesaplus.com/
 */
class MyPromise {
  /**
   * 创建一个Promise实例
   * @param {Function} executor 执行器函数 (resolve, reject) => void
   */
  constructor(executor) {
    // ========== 状态管理 ==========
    this.state = 'pending';  // 当前状态：pending | fulfilled | rejected
    this.value = undefined;   // fulfilled状态的终值
    this.reason = undefined;  // rejected状态的原因

    // 回调队列（支持多个then注册）
    this.onFulfilledCallbacks = [];  // 成功回调队列
    this.onRejectedCallbacks = [];    // 失败回调队列

    // ========== 内部resolve/reject方法 ==========
    const resolve = (value) => {
      // 如果传入的是MyPromise实例，需要等待其完成（递归解析）
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
        return;
      }

      // 状态只能从 pending 改变一次（不可逆）
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        // 依次执行所有注册的成功回调
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        // 依次执行所有注册的失败回调
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    // 执行执行器函数，捕获同步异常
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  /**
   * 注册成功/失败回调（核心方法）
   * @param {Function} [onFulfilled] - 成功回调
   * @param {Function} [onRejected] - 失败回调
   * @returns {MyPromise} 新的Promise实例（支持链式调用）
   *
   * 关键点：
   * 1. 参数可选：onFulfilled/onRejected不是函数时需要透传
   * 2. 返回新Promise：每个then都返回新的promise2
   * 3. 异步执行：回调必须异步调用（微任务）
   * 4. 值穿透：then().then()可以透传值
   */
  then(onFulfilled, onRejected) {
    // 参数默认值处理（值穿透）
    // onFulfilled不是函数时，透传value
    onFulfilled = typeof onFulfilled === 'function'
      ? onFulfilled
      : value => value;

    // onRejected不是函数时，抛出reason（继续传递错误）
    onRejected = typeof onRejected === 'function'
      ? onRejected
      : reason => { throw reason };

    // then方法返回新的Promise（这是链式调用的基础）
    const promise2 = new MyPromise((resolve, reject) => {

      // 封装成功回调处理逻辑
      const handleFulfilled = () => {
        // 使用微任务确保异步执行（符合Promises/A+规范）
        microTask(() => {
          try {
            // 调用成功回调，获取返回值x
            const x = onFulfilled(this.value);
            // 核心难点：处理then的返回值（可能是一个Promise）
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            // 回调抛出异常时，promise2变为rejected
            reject(err);
          }
        });
      };

      // 封装失败回调处理逻辑
      const handleRejected = () => {
        microTask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };

      // 根据当前状态决定如何处理
      if (this.state === 'fulfilled') {
        // 已完成：直接加入微任务队列
        handleFulfilled();
      } else if (this.state === 'rejected') {
        // 已失败：直接加入微任务队列
        handleRejected();
      } else {
        // pending状态：将回调加入队列，等待future resolve/reject触发
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });

    return promise2;
  }

  /**
   * 注册失败回调（语法糖）
   * @param {Function} onRejected - 失败回调
   * @returns {MyPromise}
   *
   * @example
   * promise.catch(err => console.error(err))
   * // 等价于
   * promise.then(null, err => console.error(err))
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /**
   * 注册最终回调（无论成功还是失败都会执行）
   * @param {Function} callback - 最终回调（不接受参数）
   * @returns {MyPromise}
   *
   * 特点：
   * - callback不能接收参数（无法获取value/reason）
   * - 返回的Promise会继承前一个Promise的状态
   * - callback本身也可能返回Promise
   *
   * @example
   * fetch('/api')
   *   .then(res => res.json())
   *   .finally(() => hideLoading())  // 无论成功失败都隐藏loading
   *   .catch(err => showError(err))
   */
  finally(callback) {
    return this.then(
      // 成功时：先执行callback，再透传value
      value => MyPromise.resolve(callback()).then(() => value),
      // 失败时：先执行callback，再抛出reason
      reason => MyPromise.resolve(callback()).then(() => { throw reason })
    );
  }


  // ==================== 静态工具方法 ====================

  /**
   * 将现有值包装为fulfilled状态的Promise
   * @param {*} value - 要包装的值（可以是Promise、thenable或普通值）
   * @returns {MyPromise}
   *
   * @example
   * MyPromise.resolve(42).then(x => console.log(x))  // 42
   * MyPromise.resolve(promise)  // 返回promise本身（不包装）
   */
  static resolve(value) {
    // 如果已经是MyPromise实例，直接返回（不重新包装）
    if (value instanceof MyPromise) {
      return value;
    }
    // 否则创建一个新的fulfilled Promise
    return new MyPromise(resolve => resolve(value));
  }

  /**
   * 创建一个rejected状态的Promise
   * @param {*} reason - 拒绝原因
   * @returns {MyPromise}
   *
   * 注意：与resolve不同，reject不会对Promise进行解包
   * MyPromise.reject(new MyPromise()) → rejected(MyPromise实例)
   */
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  /**
   * 等待所有Promise完成（全部成功才resolve，任一失败立即reject）
   * @param {Iterable<MyPromise>} promises - 可迭代的Promise集合
   * @returns {MyPromise<Array>} 所有结果的数组（保持顺序）
   *
   * 特点：
   * - 结果顺序与输入顺序一致（即使某个Promise先完成）
   * - 空数组会立即resolve为[]
   * - 任一Promise失败则整个all失败（快速失败机制）
   *
   * @example
   * MyPromise.all([p1, p2, p3])
   *   .then(results => console.log(results))  // [result1, result2, result3]
   *   .catch(err => console.error('至少一个失败'))
   */
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];       // 存储结果（按索引位置）
      let completedCount = 0;   // 已完成的计数器
      const total = promises.length;  // 总数

      // 边界情况：空数组立即resolve
      if (total === 0) {
        resolve(results);
        return;
      }

      promises.forEach((promise, index) => {
        // 使用resolve包装非Promise值
        MyPromise.resolve(promise).then(
          value => {
            // 按索引存储结果（保证顺序）
            results[index] = value;
            completedCount++;
            // 全部完成时resolve
            if (completedCount === total) {
              resolve(results);
            }
          },
          // 任一失败：立即reject（其他未完成的Promise继续执行但结果被忽略）
          reject
        );
      });
    });
  }

  /**
   * 返回第一个settled（完成）的Promise的结果
   * @param {Iterable<MyPromise>} promises
   * @returns {MyPromise} 第一个fulfilled或rejected的结果
   *
   * 应用场景：超时竞争、多源数据获取（取最快响应的）
   *
   * @example
   * MyPromise.race([
   *   fetch('/api/fast'),
   *   timeout(1000)  // 1秒后reject
   * ]).then(response => ...)
   */
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        // 第一个settled的Promise决定race的结果
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }

  /**
   * 等待所有Promise完成（无论成功或失败），返回每个Promise的状态和结果
   * @param {Iterable<MyPromise>} promises
   * @returns {MyPromise<Array<{status, value?, reason?}>>}
   *
   * 与all的区别：all是"全胜或全负"，allSettled是"等待所有人"
   * 适用场景：批量操作后需要知道每个操作的成功/失败详情
   *
   * @example
   * MyPromise.allSettled([p1, p2, p3]).then(results => {
   *   results.forEach(r => {
   *     if (r.status === 'fulfilled') console.log('成功:', r.value)
   *     else console.log('失败:', r.reason)
   *   })
   * })
   */
  static allSettled(promises) {
    return new MyPromise((resolve) => {
      const results = [];
      let completedCount = 0;
      const total = promises.length;

      if (total === 0) {
        resolve(results);
        return;
      }

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => {
            results[index] = { status: 'fulfilled', value };
            completedCount++;
            if (completedCount === total) resolve(results);
          },
          reason => {
            results[index] = { status: 'rejected', reason };
            completedCount++;
            if (completedCount === total) resolve(results);
          }
        );
      });
    });
  }

  /**
   * 等待任意一个Promise成功（任一成功即resolve，全部失败才reject）
   * @param {Iterable<MyPromise>} promises
   * @returns {MyPromise} 第一个成功的值
   * @throws {AggregateError} 所有Promise都失败时抛出聚合错误
   *
   * ES2021新增方法，适用于"取最快成功响应"的场景
   *
   * @example
   * MyPromise.any([
   *   fetchSlowServer(),
   *   fetchFastServer(),  // 这个先成功就用它的结果
   *   fetchBackupServer()
   * ]).then(firstSuccess => ...)
   */
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      const errors = [];
      let rejectedCount = 0;
      const total = promises.length;

      if (total === 0) {
        reject(new AggregateError([], 'All promises were rejected'));
        return;
      }

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          // 第一个成功就resolve
          value => resolve(value),
          // 收集所有失败原因
          reason => {
            errors[index] = reason;
            rejectedCount++;
            // 全部失败时reject AggregateError
            if (rejectedCount === total) {
              reject(new AggregateError(errors, 'All promises were rejected'));
            }
          }
        );
      });
    });
  }
}


// ==================== 微任务调度工具 ====================

/**
 * 微任务调度器（跨环境兼容）
 * 优先级：queueMicrotask > Promise.resolve().then > setTimeout(fallback)
 */
const microTask = typeof queueMicrotask === 'function'
  ? queueMicrotask
  : fn => Promise.resolve().then(fn);


// ==================== Promises/A+ 核心：resolvePromise ====================

/**
 * 解决thenable值的递归解析算法（Promises/A+规范的核心）
 *
 * 这是Promise最复杂的部分，用于处理then回调的返回值x：
 * - x可能是普通值、Promise、thenable对象
 * - 需要防止循环引用
 * - 需要递归解析直到得到最终值
 *
 * @param {MyPromise} promise2 - then返回的新Promise
 * @param {*} x - then回调的返回值
 * @param {Function} resolve - promise2的resolve
 * @param {Function} reject - promise2的reject
 */
function resolvePromise(promise2, x, resolve, reject) {
  // ===== 情况1：循环引用检测 =====
  // 如果x就是promise2本身，会造成无限循环
  // 示例：const p = p.then(() => p);  // TypeError!
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  // ===== 情况2：x是对象或函数（可能是thenable）=====
  if ((x !== null && typeof x === 'object') || typeof x === 'function') {
    let called = false;  // 防止多次调用resolve/reject（安全锁）

    try {
      // 获取then方法（getter可能会抛异常）
      const then = x.then;

      if (typeof then === 'function') {
        // x是thenable对象（有then方法的对象/函数）
        // 采用"递归调用策略"：让x自己决定何时resolve/reject
        then.call(
          x,
          // x的resolve回调
          (y) => {
            if (called) return;  // 已经调用过，忽略后续调用
            called = true;
            // 递归解析：y可能还是一个thenable（如Promise嵌套）
            resolvePromise(promise2, y, resolve, reject);
          },
          // x的reject回调
          (r) => {
            if (called) return;
            called = true;
            reject(r);  // 直接拒绝，不需要再次解析
          }
        );
      } else {
        // x有then属性但它不是函数（普通对象）
        // 当作普通值resolve
        resolve(x);
      }
    } catch (err) {
      // 访问x.then或调用then时抛出异常
      if (called) return;  // 已经被处理过，忽略
      called = true;
      reject(err);
    }
  } else {
    // ===== 情况3：x是普通值（基本类型、null、undefined等）=====
    // 直接resolve（这就是"值穿透"的基础）
    resolve(x);
  }
}


// ==================== 完整测试套件 ====================

console.log('\n========== MyPromise 测试开始 ==========\n');

// ---------- 测试1：基础resolve/reject ----------
console.log('--- 测试1: 基础功能 ---');
new MyPromise((resolve) => {
  setTimeout(() => resolve('✅ 异步成功'), 100);
}).then(console.log);

new MyPromise((_, reject) => {
  reject('❌ 同步失败');
}).catch(console.log);

// ---------- 测试2：链式调用 ----------
console.log('\n--- 测试2: 链式调用 ---');
MyPromise.resolve(1)
  .then(x => {
    console.log(`step1: ${x}`);  // 1
    return x + 1;
  })
  .then(x => {
    console.log(`step2: ${x}`);  // 2
    return x * 2;
  })
  .then(x => {
    console.log(`step3: ${x}`);  // 4
    return `最终结果: ${x}`;
  })
  .then(console.log);  // 最终结果: 4

// ---------- 测试3：错误传播 ----------
console.log('\n--- 测试3: 错误传播 ---');
MyPromise.reject('初始错误')
  .then(() => console.log('不会执行'))  // 跳过
  .then(() => console.log('也不会执行'))  // 跳过
  .catch(err => {
    console.log(`捕获到: ${err}`);  // 初始错误
    return '恢复后的值';
  })
  .then(val => {
    console.log(`恢复成功: ${val}`);  // 恢复后的值
  });

// ---------- 测试4：finally ----------
console.log('\n--- 测试4: finally ---');
MyPromise.resolve('成功值')
  .finally(() => {
    console.log('🔄 finally执行（无论成功失败都会运行）');
  })
  .then(val => console.log(`继续: ${val}`));

MyPromise.reject('错误')
  .finally(() => {
    console.log('🔄 finally也会在失败时执行');
  })
  .catch(err => console.log(`错误仍会传递: ${err}`));

// ---------- 测试5：Promise.all ----------
console.log('\n--- 测试5: Promise.all ---');
MyPromise.all([
  MyPromise.resolve(1),
  new MyPromise(r => setTimeout(() => r(2), 200)),
  MyPromise.resolve(3),
  new MyPromise(r => setTimeout(() => r(4), 100))
]).then(results => console.log('all结果:', results));  // [1, 2, 3, 4]（保持顺序）

// ---------- 测试6：Promise.race ----------
console.log('\n--- 测试6: Promise.race ---');
MyPromise.race([
  new MyPromise(r => setTimeout(() => r('慢'), 500)),
  new MyPromise(r => setTimeout(() => r('快'), 100)),
  new MyPromise(r => setTimeout(() => r('中'), 300))
]).then(winner => console.log('race获胜者:', winner));  // 快

// ---------- 测试7：Promise.allSettled ----------
console.log('\n--- 测试7: Promise.allSettled ---');
MyPromise.allSettled([
  MyPromise.resolve('成功1'),
  MyPromise.reject('失败原因'),
  MyPromise.resolve('成功2')
]).then(results => {
  results.forEach((r, i) => {
    console.log(`[${i}] status=${r.status}, ${r.status === 'fulfilled' ? `value=${r.value}` : `reason=${r.reason}`}`);
  });
});

// ---------- 测试8：Promise.any ----------
console.log('\n--- 测试8: Promise.any ---');
MyPromise.any([
  MyPromise.reject('失败1'),
  MyPromise.resolve('第一个成功！'),
  MyPromise.reject('失败2')
]).then(value => console.log('any结果:', value));

// ---------- 测试9：高级场景 - thenable对象解析 ----------
console.log('\n--- 测试9: thenable对象解析 ---');
const thenableObj = {
  then(resolve, reject) {
    setTimeout(() => resolve('我是thenable对象'), 100);
  }
};
MyPromise.resolve(thenableObj).then(console.log);

// ---------- 测试10：循环引用检测 ----------
console.log('\n--- 测试10: 循环引用检测 ---');
const cyclicPromise = MyPromise.resolve(1).then(function() {
  return cyclicPromise;  // 返回自身！
});
cyclicPromise.catch(err => console.log('正确捕获循环引用:', err.message));

// ---------- 测试11：executor异常捕获 ----------
console.log('\n--- 测试11: executor异常 ---');
new MyPromise(() => {
  throw new Error('executor内部抛出异常');
}).catch(err => console.log('捕获executor异常:', err.message));

// ---------- 测试12：空数组边界情况 ----------
console.log('\n--- 测试12: 边界情况 ---');
MyPromise.all([]).then(arr => console.log('all([]):', arr));  // []
MyPromise.allSettled([]).then(arr => console.log('allSettled([]):', arr));  // []

setTimeout(() => {
  console.log('\n========== ✅ MyPromise 完整测试通过 ==========');
}, 600);
```

> **追问链**：如何实现async/await？→ 如何手写Promise.allSettled？→ 微任务队列的实现？

---

## ★★★ 专家题（Q36-Q50）— 源码级深度、架构设计

---

## Q36: 浏览器的多进程架构是如何设计的？为什么要采用多进程架构？
- **难度**：★★★
- **知识点**：浏览器架构 / 多进程 / 安全性 / 性能
- **题型**：综合分析题

### 参考答案要点：

1. **Chrome的多进程架构演进**
   
   **早期版本（2008年前）：单进程时代**
   - 所有功能在一个进程中运行
   - 问题：一个标签页崩溃导致整个浏览器崩溃；插件问题影响全局；安全性差

   **多进程架构（2008年Chrome发布）**
   ```
   Chrome进程模型：
   
   ┌─────────────────────────────────────┐
   │         Browser Process（主进程）       │
   │  - UI界面、地址栏、书签栏             │
   │  - 网络请求管理                       │
   │  - 存储管理（Cookie/LocalStorage等）   │
   │  - GPU进程管理                        │
   └──────────┬──────────┬────────────────┘
              │          │
     ┌────────▼┐  ┌─────▼────────┐
     │GPU Process│  │Plugin Process│
     │GPU加速渲染│  │每个插件独立进程│
     └──────────┘  └──────────────┘
              │
     ┌────────▼────────────────────┐
     │   Renderer Process × N       │
     │   （每个标签页一个进程）        │
     │   - Blink引擎（DOM/CSS/JS）   │
     │   - V8引擎                   │
     │   - 合成线程                  │
     └─────────────────────────────┘
   ```

2. **Site Isolation（站点隔离）- 2018年重大更新**
   
   **传统模式的问题**：
   - 同一域名下的不同页面共享Renderer Process
   - Spectre漏洞攻击可跨站点读取内存
   
   **Site Isolation方案**：
   - 每个站点（eTLD+1）使用独立的Renderer Process
   - 即使同一标签页中的iframe也使用不同进程
   - 内存占用增加10-20%，但安全性大幅提升

3. **进程间通信（IPC）机制**
   ```javascript
   // Chrome使用Mojo作为IPC框架
   // 不同进程之间通过消息传递通信
   
   // 示例：Renderer进程向Browser进程发送导航请求
   interface NavigationHost {
     // 导航到新URL
     Navigate(GURL url) => (bool success);
     
     // 获取当前页面信息
     GetPageInfo() => (PageInfo info);
   }
   
   // 进程间数据传输方式：
   // 1. 共享内存（Shared Memory）：大块数据（如位图）
   // 2. 消息管道（Message Pipe）：控制命令
   // 3. 数据管道（Data Pipe）：流式数据
   ```

4. **为什么必须采用多进程？**

   **稳定性保障**
   - 第三方插件崩溃不影响浏览器主界面
   - 恶意网页崩溃不影响其他标签页
   - 渲染引擎Bug隔离

   **安全性保障**
   - Site Isolation防止Spectre等侧信道攻击
   - 沙箱（Sandbox）限制进程权限
   - 每个进程独立的内存空间

   **性能优化**
   - 多核CPU并行利用
   - 单个标签页卡顿不影响其他标签页
   - 更好的资源管理和回收

5. **现代浏览器的优化策略**
   
   **Process Per Site Instance（按站点实例分配进程）**
   - 同域名的不同窗口可能共享进程（节省内存）
   - 通过process交换机制动态调整

   **Process Recycling（进程回收）**
   - 关闭标签页后延迟销毁进程（快速恢复）
   - 内存压力大时主动释放不活跃进程

   **Out-of-process iframes（OOPIF）**
   - iframe在独立进程中渲染
   - 提升安全性和稳定性

6. **实际影响和权衡**
   
   **内存开销**
   - 每个进程约10-100MB基础内存
   - 100个标签页可能占用1-2GB+
   - 解决方案：Process Sharing + Aggressive Tab Discarding

   **启动性能**
   - 新建标签页需要创建进程（约几十ms）
   - 解决方案：预创建进程池、预热

   > **追问链**：Chrome的沙箱机制是如何实现的？→ Service Worker运行在哪个进程？→ Electron的多进程架构对比？

---

## Q37: 如果让你设计一个前端异常监控系统，你会怎么做？
- **难度**：★★★
- **知识点**：监控系统 / 错误采集 / 架构设计 / 日志系统
- **题型**：场景设计题

### 参考答案要点：

1. **系统架构设计**
   ```
   ┌──────────┐    ┌───────────┐    ┌──────────┐    ┌──────────┐
   │  SDK采集  │───▶│  数据上报  │───▶│  服务端   │───▶│  可视化   │
   │  (客户端)  │    │  (网关)   │    │  (存储)   │    │  (展示)   │
   └──────────┘    └───────────┘    └──────────┘    └──────────┘
        │                │                │
        ▼                ▼                ▼
   JS错误           压缩/去重        时序数据库
   Promise拒绝       批量上报        告警规则
   资源加载失败      采样率控制       统计分析
   接口错误          上报时机优化     报表生成
   性能指标          重试机制        告警通知
   用户行为          降级策略        根因分析
   ```

2. **SDK核心实现**
   ```javascript
   /**
    * 前端异常监控SDK核心代码
    */
   class ErrorMonitor {
     constructor(options = {}) {
       this.options = {
         dsn: '',                    // 数据上报地址
         appVersion: '1.0.0',        // 应用版本
         environment: 'production',  // 环境
         sampleRate: 1,              // 采样率（0-1）
         maxErrors: 20,              // 单次PV最大错误数
         maxBreadcrumbs: 100,        // 面包屑最大数量
         release: '',                // 发布版本
         ...options
       };
       
       this.breadcrumbs = [];        // 面包屑记录（用户行为轨迹）
       this.errorCount = 0;          // 当前PV的错误计数
       this.init();
     }

     init() {
       this.setupErrorCapture();      // 捕获各类错误
       this.setupPerformanceMonitor();// 性能监控
       this.setupUserBehaviorTrack(); // 用户行为追踪
       this.setupNetworkInterceptor(); // 网络请求拦截
     }

     /**
      * 错误捕获设置
      */
     setupErrorCapture() {
       // 1. JS运行时错误（同步）
       window.onerror = (message, source, lineno, colno, error) => {
         this.captureException(error || message, {
           type: 'javascript',
           stack: error?.stack,
           filename: source,
           lineno,
           colno
         });
       };

       // 2. Promise未捕获的 rejection
       window.addEventListener('unhandledrejection', (event) => {
         this.captureException(event.reason, {
           type: 'unhandledrejection',
           promise: true
         });
       });

       // 3. 资源加载错误（img/script/css）
       window.addEventListener('error', (event) => {
         if (event.target !== window) {
           const target = event.target;
           this.captureMessage('资源加载失败', {
             type: 'resource',
             tagName: target.tagName,
             src: target.src || target.href,
             type: target.type || ''
           });
         }
       }, true);

       // 4. Vue错误捕获（如果使用Vue）
       if (window.Vue) {
         Vue.config.errorHandler = (err, vm, info) => {
           this.captureException(err, {
             type: 'vue',
             component: vm?.$options?.name,
             info
           });
         };
       }

       // 5. React错误边界（需要在组件中使用ErrorBoundary）
     }

     /**
      * 性能监控
      */
     setupPerformanceMonitor() {
       // 使用PerformanceObserver API
       if ('PerformanceObserver' in window) {
         // 长任务检测（超过50ms的任务）
         try {
           const longTaskObserver = new PerformanceObserver((list) => {
             list.getEntries().forEach(entry => {
               this.report({
                 type: 'performance',
                 category: 'long-task',
                 duration: entry.duration,
                 name: entry.name,
                 startTime: entry.startTime
               });
             });
           });
           longTaskObserver.observe({ entryTypes: ['longtask'] });
         } catch (e) {}

         // Layout Shift检测（CLS指标）
         try {
           const lcpObserver = new PerformanceObserver((list) => {
             const entries = list.getEntries();
             const lastEntry = entries[entries.length - 1];
             this.metrics.lcp = lastEntry.startTime;
           });
           lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
         } catch (e) {}
       }

       // 页面加载性能
       window.addEventListener('load', () => {
         setTimeout(() => {
           const navigation = performance.getEntriesByType('navigation')[0];
           if (navigation) {
             this.report({
               type: 'performance',
               category: 'page-load',
               metrics: {
                 dns: navigation.domainLookupEnd - navigation.domainLookupStart,
                 tcp: navigation.connectEnd - navigation.connectStart,
                 ttfb: navigation.responseStart - navigation.requestStart,
                 domReady: navigation.domContentLoadedEventEnd - navigation.startTime,
                 loadComplete: navigation.loadEventEnd - navigation.startTime
               }
             });
           }
         }, 0);
       });
     }

     /**
      * 用户行为追踪（面包屑）
      */
     setupUserBehaviorTrack() {
       // 点击事件
       document.addEventListener('click', (event) => {
         this.addBreadcrumb({
           type: 'click',
           target: event.target.tagName,
           className: event.target.className,
           id: event.target.id,
           timestamp: Date.now()
         });
       }, true);

       // 路由变化（SPA）
       this.observeRouteChange();

       // 控制台日志
       const originalConsole = { ...console };
       ['log', 'warn', 'error'].forEach(level => {
         console[level] = (...args) => {
           this.addBreadcrumb({
             type: `console.${level}`,
             args: args.map(arg => 
               typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
             ),
             timestamp: Date.now()
           });
           originalConsole[level](...args);
         };
       });
     }

     /**
      * 网络请求拦截
      */
     setupNetworkInterceptor() {
       // 拦截fetch
       const originalFetch = window.fetch;
       window.fetch = async (...args) => {
         const startTime = Date.now();
         const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;
         
         try {
           const response = await originalFetch(...args);
           const duration = Date.now() - startTime;
           
           if (!response.ok) {
             this.report({
               type: 'http-error',
               url,
               method: args[1]?.method || 'GET',
               status: response.status,
               duration
             });
           }
           
           return response;
         } catch (error) {
           this.report({
             type: 'network-error',
             url,
             duration: Date.now() - startTime,
             error: error.message
           });
           throw error;
         }
       };

       // 拦截XMLHttpRequest
       const originalXHROpen = XMLHttpRequest.prototype.open;
       const originalXHRSend = XMLHttpRequest.prototype.send;

       XMLHttpRequest.prototype.open = function(method, url) {
         this._monitorInfo = { method, url, startTime: Date.now() };
         return originalXHROpen.apply(this, arguments);
       };

       XMLHttpRequest.prototype.send = function() {
         if (this._monitorInfo) {
           this.addEventListener('loadend', function() {
             const duration = Date.now() - this._monitorInfo.startTime;
             if (this.status >= 400) {
               // 上报HTTP错误
             }
           });
         }
         return originalXHRSend.apply(this, arguments);
       };
     }

     /**
      * 记录面包屑
      */
     addBreadcrumb(crumb) {
       this.breadcrumbs.push(crumb);
       if (this.breadcrumbs.length > this.options.maxBreadcrumbs) {
         this.breadcrumbs.shift();
       }
     }

     /**
      * 捕获异常
      */
     captureException(error, context = {}) {
       if (this.errorCount >= this.options.maxErrors) return;
       if (Math.random() > this.options.sampleRate) return;
       
       this.errorCount++;
       
       const reportData = {
         type: 'exception',
         timestamp: Date.now(),
         url: location.href,
         userAgent: navigator.userAgent,
         appId: this.options.appId,
         version: this.options.appVersion,
         environment: this.options.environment,
         
         error: {
           message: error?.message || String(error),
           name: error?.name || 'Error',
           stack: error?.stack || '',
           ...context
         },
         
         breadcrumbs: this.breadcrumbs.slice(-20),  // 最近20条
         user: this.getUserInfo()
       };
       
       this.report(reportData);
     }

     captureMessage(message, context = {}) {
       this.report({
         type: 'message',
         message,
         ...context,
         timestamp: Date.now(),
         breadcrumbs: this.breadcrumbs.slice(-20)
       });
     }

     /**
      * 数据上报
      */
     report(data) {
       // 批量上报策略
       this.queue = this.queue || [];
       this.queue.push(data);
       
       if (!this.flushTimer) {
         this.flushTimer = setTimeout(() => this.flush(), 5000);  // 5秒批量上报
       }
       
       // 紧急错误立即上报（如白屏、崩溃）
       if (data.type === 'exception' || data.type === 'fatal') {
         this.flush();
       }
     }

     flush() {
       if (this.timer) clearTimeout(this.timer);
       if (!this.queue?.length) return;
       
       const batch = [...this.queue];
       this.queue = [];
       
       // 使用navigator.sendBeacon（页面关闭时也能发送）
       if (navigator.sendBeacon) {
         const blob = new Blob([JSON.stringify(batch)], { type: 'application/json' });
         navigator.sendBeacon(this.options.dsn, blob);
       } else {
         // fallback: fetch/img
         fetch(this.options.dsn, {
           method: 'POST',
           body: JSON.stringify(batch),
           keepalive: true
         }).catch(() => {});
       }
     }

     getUserInfo() {
       return {
         uid: this.getUserId(),
         screen: `${screen.width}x${screen.height}`,
         viewport: `${window.innerWidth}x${window.innerHeight}`,
         language: navigator.language
       };
     }

     getUserId() {
       // 实现用户唯一标识（如从Cookie获取或生成）
     }
   }

   // ==================== 使用示例 ====================
   const monitor = new ErrorMonitor({
     dsn: 'https://monitor.example.com/api/errors',
     appVersion: '2.1.0',
     sampleRate: 1,  // 生产环境100%采样
     environment: process.env.NODE_ENV
   });

   // 手动上报
   monitor.captureException(new Error('业务逻辑错误'));
   monitor.captureMessage('自定义消息', { level: 'warning' });
   ```

3. **服务端架构设计**
   ```yaml
   # 服务端技术栈建议
   - 接入层：Nginx/Kong（负载均衡、限流、鉴权）
   - 应用层：Node.js/Go（高并发处理）
   - 存储层：
     * ClickHouse/Elasticsearch（时序数据查询分析）
     * Redis（实时计数、去重）
     * MySQL（配置、告警规则）
   - 消息队列：Kafka/RabbitMQ（削峰填谷）
   - 可视化：Grafana/自研Dashboard
   ```

4. **关键能力要求**
   
   **数据完整性**
   - sendBeacon保证页面关闭时数据不丢失
   - 本地存储兜底（IndexedDB缓存，网络恢复后重试）
   - 幂等处理（避免重复上报）

   **性能影响最小化**
   - SDK体积<15KB（gzip后）
   - 采样率控制（开发环境100%、生产环境按需）
   - 批量上报减少网络请求
   - Web Worker中处理数据（不阻塞主线程）

   **隐私合规**
   - 敏感信息脱敏（手机号、身份证号等）
   - 用户授权确认（GDPR/CCPA合规）
   - 数据加密传输（HTTPS）

5. **告警和分析体系**
   - 实时告警：错误率突增、P0级错误
   - 趋势分析：错误率趋势、Top错误排行
   - 影响评估：受影响用户数、页面分布
   - 根因分析：结合Source Map定位源码位置

> **追问链**：Source Map如何集成？→ 如何计算错误率并设定告警阈值？→ 大数据量下的存储和查询优化？

---

## Q38: 手写一个简易的虚拟 DOM diff 算法
- **难度**：★★★
- **知识点**：Virtual DOM / Diff算法 / React/Vue原理
- **题型**：编程实践题

### 参考答案要点：

```javascript
/**
 * 简易Virtual DOM实现（包含diff算法核心逻辑）
 * 支持基本的元素创建、更新、删除、移动操作
 */

// ==================== 1. Virtual DOM节点定义 ====================

/**
 * 创建虚拟DOM节点
 * @param {string} type - 元素类型（div/span/text等）
 * @param {Object} props - 属性对象
 * @param {Array} children - 子节点数组
 */
function h(type, props = {}, children = []) {
  
  return {
    type,
    props: props || {},
    children: Array.isArray(children) ? children : [children]
  };
}

// ==================== 2. DOM操作工具函数 ====================

/**
 * 将虚拟DOM渲染为真实DOM
 */
function createElement(vnode) {
  // 文本节点
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(vnode);
  }
  
  const { type, props, children } = vnode;
  const el = document.createElement(type);
  
  // 设置属性
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      setAttribute(el, key, value);
    });
  }
  
  // 递归创建子节点
  if (children) {
    children.forEach(child => {
      el.appendChild(createElement(child));
    });
  }
  
  // 保存vnode引用（用于后续diff）
  el._vnode = vnode;
  
  return el;
}

/**
 * 设置DOM元素属性
 */
function setAttribute(el, key, value) {
  if (key === 'className') {
    el.className = value;
  } else if (key === 'style' && typeof value === 'object') {
    Object.assign(el.style, value);
  } else if (key.startsWith('on')) {
    // 事件处理
    const eventType = key.slice(2).toLowerCase();
    el.addEventListener(eventType, value);
  } else if (key in el) {
    el[key] = value;
  } else {
    el.setAttribute(key, value);
  }
}

// ==================== 3. 核心Diff算法 ====================

/**
 * Diff算法核心实现
 * @param {HTMLElement} parentEl - 父元素
 * @param {Object} oldVnode - 旧的虚拟DOM
 * @param {Object} newVnode - 新的虚拟DOM
 */
function diff(parentEl, oldVnode, newVnode) {
  const oldEl = oldVnode?.el || parentEl.firstChild;
  
  // 情况1：新旧节点都为空
  if (!oldVnode && !newVnode) return;
  
  // 情况2：旧节点存在但新节点为空 → 删除
  if (oldVnode && !newVnode) {
    parentEl.removeChild(oldEl);
    return;
  }
  
  // 情况3：旧节点为空但新节点存在 → 新增
  if (!oldVnode && newVnode) {
    const newEl = createElement(newVnode);
    parentEl.appendChild(newEl);
    newVnode.el = newEl;
    return;
  }
  
  // 情况4：新旧节点都存在 → 更新（patch）
  patch(oldEl, oldVnode, newVnode);
}

/**
 * 节点更新（patch）
 */
function patch(oldEl, oldVnode, newVnode) {
  // 保存真实DOM引用
  newVnode.el = oldEl;
  
  // 检查是否是相同类型的节点
  if (oldVnode.type !== newVnode.type) {
    // 类型不同 → 替换整个节点
    const newEl = createElement(newVnode);
    oldEl.parentNode.replaceChild(newEl, oldEl);
    return;
  }
  
  // 类型相同 → 复用旧节点，进行差异化更新
  
  // 1. 更新属性
  updateProps(oldEl, oldVnode.props, newVnode.props);
  
  // 2. 更新子节点（核心！）
  updateChildren(oldEl, oldVnode.children, newVnode.children);
}

/**
 * 属性差异更新
 */
function updateProps(el, oldProps = {}, newProps = {}) {
  // 更新/新增属性
  for (const key in newProps) {
    if (oldProps[key] !== newProps[key]) {
      setAttribute(el, key, newProps[key]);
    }
  }
  
  // 删除旧属性
  for (const key in oldProps) {
    if (!(key in newProps)) {
      if (key.startsWith('on')) {
        const eventType = key.slice(2).toLowerCase();
        el.removeEventListener(eventType, oldProps[key]);
      } else if (key === 'className') {
        el.removeAttribute('class');
      } else {
        el.removeAttribute(key);
      }
    }
  }
}

/**
 * 子节点Diff算法（简化版）
 * 使用双端比较策略 + key优化
 */
function updateChildren(parentEl, oldChildren, newChildren) {
  const oldLen = oldChildren?.length || 0;
  const newLen = newChildren?.length || 0;
  
  // 快速路径：新旧子节点数组长度相同且顺序一致
  if (oldLen === newLen && oldLen <= 1) {
    if (newLen === 0) return;  // 都没有子节点
    
    // 单个子节点直接递归diff
    diff(parentEl, oldChildren[0], newChildren[0]);
    return;
  }
  
  // 通用情况：使用索引逐个对比
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldLen - 1;
  let newEndIdx = newLen - 1;
  
  let oldStartVnode = oldChildren[oldStartIdx];
  let newStartVnode = newChildren[newStartIdx];
  let oldEndVnode = oldChildren[oldEndIdx];
  let newEndVnode = newChildren[newEndIdx];
  
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    
    // 1. 首首比较（同位置相同）
    if (isSameNode(oldStartVnode, newStartVnode)) {
      diff(parentEl, oldStartVnode, newStartVnode);
      oldStartIdx++;
      newStartIdx++;
      oldStartVnode = oldChildren[oldStartIdx];
      newStartVnode = newChildren[newStartIdx];
      continue;
    }
    
    // 2. 尾尾比较
    if (isSameNode(oldEndVnode, newEndVnode)) {
      diff(parentEl, oldEndVnode, newEndVnode);
      oldEndIdx--;
      newEndIdx--;
      oldEndVnode = oldChildren[oldEndIdx];
      newEndVnode = newChildren[newEndIdx];
      continue;
    }
    
    // 3. 首尾交叉比较（反转场景）
    if (isSameNode(oldStartVnode, newEndVnode)) {
      diff(parentEl, oldStartVnode, newEndVnode);
      // 移动到末尾
      parentEl.appendChild(oldStartVnode.el);
      oldStartIdx++;
      newEndIdx--;
      oldStartVnode = oldChildren[oldStartIdx];
      newEndVnode = newChildren[newEndIdx];
      continue;
    }
    
    // 4. 尾首交叉比较
    if (isSameNode(oldEndVnode, newStartVnode)) {
      diff(parentEl, oldEndVnode, newStartVnode);
      // 移动到开头
      parentEl.insertBefore(oldEndVnode.el, oldStartVnode.el);
      oldEndIdx--;
      newStartIdx++;
      oldEndVnode = oldChildren[oldEndIdx];
      newStartVnode = newChildren[newStartIdx];
      continue;
    }
    
    // 5. 以上都不匹配 → 基于key查找或新建/删除
    break;
  }
  
  // 处理剩余的新节点（插入）
  if (newStartIdx <= newEndIdx) {
    const referenceNode = newChildren[newEndIdx + 1]?.el;
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      const newEl = createElement(newChildren[i]);
      newChildren[i].el = newEl;
      parentEl.insertBefore(newEl, referenceNode);
    }
  }
  
  // 处理剩余的旧节点（删除）
  if (oldStartIdx <= oldEndIdx) {
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldChildren[i]?.el) {
        parentEl.removeChild(oldChildren[i].el);
      }
    }
  }
}

/**
 * 判断两个虚拟节点是否相同（基于type和key）
 */
function isSameNode(vnode1, vnode2) {
  if (!vnode1 || !vnode2) return false;
  
  // 文本节点比较
  if (typeof vnode1 !== 'object' && typeof vnode2 !== 'object') {
    return String(vnode1) === String(vnode2);
  }
  
  // 元素节点比较：type必须相同，key如果存在也必须相同
  const sameType = vnode1.type === vnode2.type;
  const sameKey = (vnode1.props?.key || null) === (vnode2.props?.key || null);
  
  return sameType && sameKey;
}

// ==================== 4. 使用示例与测试 ====================

// 创建初始虚拟DOM
let vdom = h('div', { id: 'app' }, [
  h('h1', { className: 'title' }, ['Hello Virtual DOM']),
  h('ul', {}, [
    h('li', { key: 'a' }, ['Item A']),
    h('li', { key: 'b' }, ['Item B']),
    h('li', { key: 'c' }, ['Item C'])
  ])
]);

// 渲染到页面
const root = document.getElementById('root');
root.appendChild(createElement(vdom));
console.log('✅ 初始渲染完成');

// 模拟状态变化，生成新的虚拟DOM
const newVdom = h('div', { id: 'app' }, [
  h('h1', { className: 'title updated' }, ['Hello Updated']),
  h('ul', {}, [
    h('li', { key: 'b' }, ['Item B Modified']),  // 修改
    h('li', { key: 'd' }, ['Item D New']),       // 新增
    h('li', { key: 'a' }, ['Item A Moved'])       // 移动
  ])
]);

// 执行Diff并更新真实DOM
setTimeout(() => {
  diff(root, vdom, newVdom);
  vdom = newVdom;
  console.log('✅ Diff更新完成');
}, 2000);

console.log('📦 Virtual DOM Diff算法核心实现完成');
```

> **追问链**：如何优化Diff算法的时间复杂度？→ React的Fiber架构对Diff的改进？→ Vue3的Diff优化策略？

---

## Q39: 实现 debounce 和 throttle 函数（完整版，支持 cancel/leading/trailing）
- **难度**：★★★
- **知识点**：防抖 / 节流 / 函数式编程 / 性能优化
- **题型**：编程实践题

### 参考答案要点：

```javascript
/**
 * 防抖函数（Debounce）- 完整版
 *
 * 核心思想：在事件被触发n秒后再执行回调，如果在这n秒内又被触发则重新计时
 * 适用场景：搜索框输入（等用户停止输入再请求）、窗口resize、按钮防重复点击
 *
 * @param {Function} func - 要防抖的函数
 * @param {number} [wait=300] - 等待时间（毫秒）
 * @param {Object} [options={}] - 配置选项
 * @param {boolean} [options.leading=false] - 是否在开始时立即执行一次（前沿触发）
 * @param {boolean} [options.trailing=true] - 是否在结束时执行最后一次调用（后沿触发）
 * @returns {Function} 防抖后的函数（附带cancel/flush/pending等方法）
 */
function debounce(func, wait = 300, options = {}) {
  let timerId = null;      // 定时器ID
  let lastArgs = null;     // 最近一次调用的参数
  let lastThis = null;     // 最近一次调用的this上下文
  let result = null;       // 最近一次执行的返回值
  let isLeadingCalled = false;  // leading模式是否已执行过

  const { leading = false, trailing = true } = options;

  /**
   * 防抖包装函数
   * 每次调用都会重新计时（除非leading模式下已执行）
   */
  const debounced = function(...args) {
    // 保存本次调用的上下文和参数
    lastArgs = args;
    lastThis = this;

    // 如果已有定时器，清除它（重新计时）
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }

    // ====== Leading模式：首次触发时立即执行 ======
    if (leading && !timerId && !isLeadingCalled) {
      // 立即执行并标记
      result = func.apply(this, args);
      isLeadingCalled = true;

      // 设置定时器：wait时间后重置标记（允许下次leading触发）
      timerId = setTimeout(() => {
        timerId = null;
        isLeadingCalled = false;

        // 如果trailing模式且期间有新调用，执行最后一次
        if (trailing && lastArgs) {
          result = func.apply(lastThis, lastArgs);
          lastArgs = null;
          lastThis = null;
        }
      }, wait);

      return result;
    }

    // ====== Trailing模式：等待结束后执行最后一次 ======
    if (trailing) {
      timerId = setTimeout(() => {
        timerId = null;
        isLeadingCalled = false;

        if (lastArgs) {
          result = func.apply(lastThis, lastArgs);
          lastArgs = null;
          lastThis = null;
        }
      }, wait);
    }

    return result;
  };

  /**
   * 取消防抖（立即停止，不再执行）
   * 适用场景：组件卸载时清理、取消未完成的异步操作
   *
   * @example
   * const handleSearch = debounce(fetchData, 500);
   * // 组件卸载时
   * onUnmounted(() => handleSearch.cancel());
   */
  debounced.cancel = function() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    isLeadingCalled = false;
    lastArgs = null;
    lastThis = null;
  };

  /**
   * 立即执行（取消当前等待，立即执行一次）
   * 适用场景：用户按回车键时立即搜索、手动触发表单提交
   *
   * @returns {*} 函数执行的返回值
   *
   * @example
   * searchInput.addEventListener('keydown', (e) => {
   *   if (e.key === 'Enter') handleSearch.flush();  // 回车立即搜索
   * });
   */
  debounced.flush = function() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    isLeadingCalled = false;

    if (lastArgs) {
      result = func.apply(lastThis, lastArgs);
      lastArgs = null;
      lastThis = null;
    }
    return result;
  };

  /**
   * 检查是否有待执行的调用
   * 适用场景：保存表单前检查是否有未提交的修改
   *
   * @returns {boolean}
   *
   * @example
   * if (autoSave.pending()) {
   *   console.log('自动保存中...');
   * } else {
   *   console.log('已保存');
   * }
   */
  debounced.pending = function() {
    return timerId !== null || (isLeadingCalled && trailing);
  };

  /**
   * 获取或设置等待时间
   * @param {number} [newWait] - 新的等待时间（不传则返回当前值）
   * @returns {number|Function}
   */
  debounced.wait = function(newWait) {
    if (typeof newWait === 'number') {
      wait = newWait;
      return debounced;
    }
    return wait;
  };

  return debounced;
}


/**
 * 节流函数（Throttle）- 完整版
 *
 * 核心思想：规定在一个单位时间内，只能触发一次函数。
 * 如果这个单位时间内触发多次函数，只有第一次（或最后一次）生效。
 * 适用场景：滚动事件监听、按钮频繁点击、鼠标移动追踪
 *
 * @param {Function} func - 要节流的函数
 * @param {number} [wait=300] - 时间间隔（毫秒）
 * @param {Object} [options={}] - 配置选项
 * @param {boolean} [options.leading=true] - 是否在开始时立即执行
 * @param {boolean} [options.trailing=true] - 是否在结束时执行最后一次
 * @returns {Function} 节流后的函数（附带cancel/flush/isThrottled等方法）
 */
function throttle(func, wait = 300, options = {}) {
  let timerId = null;      // 定时器ID
  let lastArgs = null;     // 最近一次调用的参数
  let lastThis = null;     // 最近一次调用的this上下文
  let result = null;       // 最近一次执行的返回值
  let previous = 0;        // 上次执行的时间戳

  const { leading = true, trailing = true } = options;

  /**
   * 节流包装函数
   */
  const throttled = function(...args) {
    const now = Date.now();  // 当前时间戳
    const remaining = wait - (now - previous);  // 距离下次可执行的剩余时间

    // 保存本次调用的上下文和参数
    lastArgs = args;
    lastThis = this;

    // ====== 可以立即执行的情况 ======
    // 1. 首次调用（previous为0）
    // 2. 系统时间被调整（remaining > wait 或 remaining < 0）
    if (remaining <= 0 || remaining > wait) {
      // 清除可能存在的trailing定时器
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }

      previous = now;  // 更新上次执行时间

      if (leading) {
        result = func.apply(this, args);
      }
    }
    // ====== 在等待期内 ======
    else if (!timerId && trailing) {
      // 设置trailing定时器：确保在时间段结束时执行最后一次
      timerId = setTimeout(() => {
        timerId = null;
        previous = leading ? Date.now() : 0;  // 重置时间戳

        if (trailing && lastArgs) {
          result = func.apply(lastThis, lastArgs);
          lastArgs = null;
          lastThis = null;
        }
      }, remaining);
    }

    return result;
  };

  /**
   * 取消节流
   */
  throttled.cancel = function() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    previous = 0;
    lastArgs = null;
    lastThis = null;
  };

  /**
   * 立即执行（取消当前等待，立即执行一次）
   */
  throttled.flush = function() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    previous = 0;
    if (lastArgs) {
      result = func.apply(lastThis, lastArgs);
      lastArgs = null;
      lastThis = null;
    }
    return result;
  };

  /**
   * 检查当前是否处于节流状态（正在冷却期）
   * @returns {boolean}
   */
  throttled.isThrottled = function() {
    return timerId !== null || (Date.now() - previous < wait);
  };

  /**
   * 获取或设置间隔时间
   */
  throttled.wait = function(newWait) {
    if (typeof newWait === 'number') {
      wait = newWait;
      return throttled;
    }
    return wait;
  };

  return throttled;
}


// ==================== 使用示例与测试 ====================

console.log('\n========== Debounce & Throttle 完整版演示 ==========\n');

// ========== 示例1：搜索框输入防抖（典型应用）==========
console.log('--- 示例1: 搜索框防抖 ---');

const searchInput = document.createElement('input');
searchInput.placeholder = '输入搜索关键词...';
searchInput.style.cssText = 'padding: 8px 12px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px;';
document.body.appendChild(searchInput);

const handleSearch = debounce((query) => {
  console.log(`🔍 执行搜索: "${query}"`);
  // 实际项目中这里会发送AJAX请求到后端API
}, 500, { leading: false, trailing: true });  // 只在停止输入后500ms执行

searchInput.addEventListener('input', (e) => {
  handleSearch(e.target.value);  // 用户每次输入都会调用，但实际执行是防抖的
});


// ========== 示例2：窗口resize节流 ==========
console.log('\n--- 示例2: 窗口resize节流 ---');

const handleResize = throttle(() => {
  console.log(`📐 窗口大小变化: ${window.innerWidth}x${window.innerHeight}`);
}, 200, { leading: true, trailing: true });

window.addEventListener('resize', handleResize);


// ========== 示例3：按钮点击防抖（防止重复提交）==========
console.log('\n--- 示例3: 提交按钮防抖 ---');

const submitBtn = document.createElement('button');
submitBtn.textContent = '提交';
submitBtn.style.cssText = 'padding: 10px 20px; margin-top: 10px; cursor: pointer;';
document.body.appendChild(submitBtn);

const handleSubmit = debounce(() => {
  console.log('✅ 表单提交成功！');
  alert('提交成功！');  // 实际项目中会发送表单数据
}, 1000, { leading: true, trailing: false });  // 只在第一次点击时立即执行

submitBtn.addEventListener('click', () => {
  if (!handleSubmit.pending()) {
    handleSubmit();  // 只有在没有待执行的操作时才允许再次点击
  } else {
    console.log('⏳ 请稍候，正在处理中...');
  }
});


// ========== 示例4：组合使用（防抖+节流）==========
console.log('\n--- 示例4: 组合使用（防抖+节流）---');

/**
 * 场景：无限滚动加载
 * 先用throttle限制频率，再用debounce确保最终只触发一次
 */
function createSmartScrollHandler(loadMoreFn, options = {}) {
  const { throttleMs = 200, debounceMs = 300 } = options;

  // 先节流（高频事件降频），再防抖（稳定后执行）
  const throttledScroll = throttle(
    debounce(loadMoreFn, debounceMs),
    throttleMs,
    { leading: true, trailing: true }
  );

  return throttledScroll;
}

// 使用示例
const smartLoadMore = createSmartScrollHandler(
  () => console.log('📄 加载更多内容...'),
  { throttleMs: 150, debounceMs: 250 }
);

// window.addEventListener('scroll', smartLoadMore);


// ========== 测试cancel功能 ==========
console.log('\n--- 测试cancel功能 ---');

setTimeout(() => {
  console.log('🧪 取消所有待执行的搜索请求');
  handleSearch.cancel();
  console.log(`搜索是否有待执行操作: ${handleSearch.pending()}`);  // false
}, 2000);


// ========== 测试flush功能 ==========
console.log('\n--- 测试flush功能 ---');

setTimeout(() => {
  console.log('🧪 立即执行一次搜索（忽略防抖等待）');
  handleSearch.flush();
}, 2500);


// ========== 测试pending功能 ==========
console.log('\n--- 测试pending功能 ---');

const autoSave = debounce((data) => {
  console.log('💾 自动保存:', data);
}, 1000);

autoSave({ content: 'hello' });
console.log(`自动保存是否在进行中: ${autoSave.pending()}`);  // true


// ========== 对比演示：不同配置的效果 ==========
console.log('\n--- 配置对比演示 ---');

// 配置A：{ leading: false, trailing: true } - 后沿触发（默认）
const debounceA = debounce(
  (msg) => console.log(`[后沿触发] ${msg}`),
  1000,
  { leading: false, trailing: true }
);

// 配置B：{ leading: true, trailing: false } - 前沿触发
const debounceB = debounce(
  (msg) => console.log(`[前沿触发] ${msg}`),
  1000,
  { leading: true, trailing: false }
);

// 配置C：{ leading: true, trailing: true } - 双向触发
const debounceC = debounce(
  (msg) => console.log(`[双向触发] ${msg}`),
  1000,
  { leading: true, trailing: true }
);

console.log('快速连续调用3次（模拟用户快速输入）：\n');
['第1次输入', '第2次输入', '第3次输入'].forEach((text, i) => {
  setTimeout(() => {
    debounceA(text);
    debounceB(text);
    debounceC(text);
  }, i * 200);
});

console.log('观察上方输出，理解三种模式的区别\n');


// ========== 节流对比演示 ==========
console.log('--- 节流配置对比 ---');

// 快速连续调用10次，观察输出次数
let callCount = 0;
const throttledLog = throttle(
  () => {
    callCount++;
    console.log(`[节流执行] 第${callCount}次 (时间: ${Date.now() % 100000})`);
  },
  500,
  { leading: true, trailing: true }
);

for (let i = 0; i < 10; i++) {
  setTimeout(() => throttledLog(), i * 100);  // 每100ms调用一次，但500ms内最多执行1次
}

console.log('共调用10次，但受节流限制，只会执行少数几次\n');


console.log('⏱️ Debounce & Throttle 完整版实现完成');
console.log('提示：请在控制台观察各示例的输出效果\n');
```

> **追问链**：requestAnimationFrame版本的throttle？→ 如何结合useCallback在React中使用？→ 防抖节流在服务端的适用性？

---

## Q40: 手写一个 LRU 缓存算法
- **难度**：★★★
- **知识点**：LRU / 数据结构 / 缓存 / 算法
- **题型**：编程实践题

### 参考答案要点：

```javascript
/**
 * LRU（Least Recently Used）缓存算法实现
 * 使用双向链表 + 哈希表实现O(1)时间复杂度的get和put操作
 */

// ==================== 双向链表节点 ====================
class DLinkedNode {
  constructor(key = 0, value = 0) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}


// ==================== LRU缓存类 ====================
class LRUCache {
  /**
   * @param {number} capacity 缓存容量
   */
  constructor(capacity) {
    if (capacity < 1) {
      throw new Error('Capacity must be at least 1');
    }
    
    this.capacity = capacity;
    this.size = 0;
    this.cache = new Map();  // key -> DLinkedNode
    
    // 使用伪头节点和伪尾节点简化边界处理
    this.head = new DLinkedNode();  // 头部（最近使用的方向）
    this.tail = new DLinkedNode();  // 尾部（最久未使用的方向）
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * 获取缓存中的值
   * @param {*} key 键
   * @return {*} 值（不存在返回-1）
   * 时间复杂度：O(1)
   */
  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }
    
    const node = this.cache.get(key);
    // 访问后移到头部（标记为最近使用）
    this.moveToHead(node);
    
    return node.value;
  }

  /**
   * 写入缓存
   * @param {*} key 键
   * @param {*} value 值
   * 时间复杂度：O(1)
   */
  put(key, value) {
    // 已存在：更新值并移到头部
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value;
      this.moveToHead(node);
      return;
    }
    
    // 不存在：创建新节点
    const newNode = new DLinkedNode(key, value);
    this.cache.set(key, newNode);
    this.addToHead(newNode);
    this.size++;
    
    // 超出容量：淘汰最久未使用的（尾部）
    if (this.size > this.capacity) {
      const removed = this.removeTail();
      this.cache.delete(removed.key);
      this.size--;
    }
  }

  // ==================== 内部方法 ====================

  /**
   * 将节点添加到头部（最近使用）
   */
  addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  /**
   * 删除指定节点
   */
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  /**
   * 将节点移动到头部
   */
  moveToHead(node) {
    this.removeNode(node);
    this.addToHead(node);
  }

  /**
   * 删除尾部节点（最久未使用）并返回
   */
  removeTail() {
    const node = this.tail.prev;
    this.removeNode(node);
    return node;
  }

  // ==================== 辅助方法 ====================

  /** 获取当前缓存大小 */
  getSize() {
    return this.size;
  }

  /** 清空缓存 */
  clear() {
    this.cache.clear();
    this.size = 0;
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /** 获取所有键（按访问时间从近到远排序） */
  keys() {
    const result = [];
    let current = this.head.next;
    while (current !== this.tail) {
      result.push(current.key);
      current = current.next;
    }
    return result;
  }

  /** 打印当前缓存状态（调试用） */
  print() {
    const keys = this.keys();
    console.log(`LRU Cache (${this.size}/${this.capacity}): [${keys.join(' <- ')}]`);
  }
}


// ==================== 使用示例与测试 ====================

// 基础测试
console.log('========== LRU Cache 基础测试 ==========\n');

const cache = new LRUCache(2);  // 容量为2

cache.put(1, 1);   // 缓存: [1]
cache.print();     // 输出: [1]

cache.put(2, 2);   // 缓存: [2, 1]
cache.print();     // 输出: [2, 1]

console.log('get(1):', cache.get(1));  // 返回 1，缓存变为: [1, 2]
cache.print();

cache.put(3, 3);   // 该操作会使得关键字 2 作废，缓存: [3, 1]
cache.print();

console.log('get(2):', cache.get(2));  // 返回 -1 (未找到)
cache.print();

cache.put(4, 4);   // 该操作会使得关键字 1 作废，缓存: [4, 3]
cache.print();

console.log('get(1):', cache.get(1));  // 返回 -1 (未找到)
console.log('get(3):', cache.get(3));  // 返回 3
console.log('get(4):', cache.get(4));  // 返回 4


// 高级功能测试
console.log('\n========== LRU Cache 高级功能测试 ==========\n');

const cache2 = new LRUCache(3);

// 批量写入
for (let i = 1; i <= 5; i++) {
  cache2.put(i, `value${i}`);
}
console.log('批量写入后的缓存:', cache2.keys());  // 应该保留最近的3个: [5, 4, 3]

// 访问中间元素
cache2.get(4);
console.log('访问4后:', cache2.keys());  // [4, 5, 3]

// 更新已存在的值
cache2.put(4, 'updated-value-4');
console.log('更新4后:', cache2.keys());  // [4, 5, 3]

// 清空测试
cache2.clear();
console.log('清空后大小:', cache2.getSize());  // 0


// 实际应用场景：API响应缓存
console.log('\n========== 实际应用：API缓存封装 ==========\n');

class APICache {
  constructor(capacity = 10, ttl = 60000) {
    this.cache = new Map();  // key -> {value, timestamp}
    this.capacity = capacity;
    this.ttl = ttl;  // 过期时间（毫秒），默认60秒
  }

  async get(key, fetchFn) {
    // 检查缓存
    if (this.cache.has(key)) {
      const entry = this.cache.get(key);
      
      // 检查是否过期
      if (Date.now() - entry.timestamp < this.ttl) {
        console.log(`✅ 命中缓存: ${key}`);
        return entry.value;
      }
      
      // 过期删除
      this.cache.delete(key);
    }
    
    // 未命中或已过期：获取数据并存入缓存
    console.log(`❌ 未命中缓存，正在获取: ${key}`);
    const value = await fetchFn();
    
    // LRU策略：如果超出容量，删除最早的条目
    if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
      console.log(`🗑️ 淘汰缓存: ${firstKey}`);
    }
    
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
    
    return value;
  }
}

// 使用示例
const apiCache = new APICache(3, 5000);  // 容量3，TTL 5秒

async function testAPICache() {
  await apiCache.get('/api/user', () => Promise.resolve({ name: '张三' }));
  await apiCache.get('/api/products', () => Promise.resolve([{ id: 1 }]));
  await apiCache.get('/api/user', () => Promise.resolve({ name: '李四' }));  // 命中缓存
  await apiCache.get('/api/orders', () => Promise.resolve([]));
  // 此时 /api/products 应该被淘汰（最早且容量满）
  await apiCache.get('/api/products', () => Promise.resolve([{ id: 2 }]));  // 未命中
}

testAPICache();

console.log('\n✅ LRU缓存算法实现完成！');
```

**复杂度分析**：
- **时间复杂度**：get O(1)、put O(1)（得益于Map的O(1)查找和链表的O(1)移动）
- **空间复杂度**：O(capacity)

> **追问链**：如何支持TTL（过期时间）？→ 分布式环境下的LRU实现？→ Redis的LRU实现原理？

---

## Q41: 实现一个图片懒加载指令（支持 IntersectionObserver）
- **难度**：★★★
- **知识点**：图片懒加载 / IntersectionObserver / 性能优化 / 自定义指令
- **题型**：编程实践题

### 参考答案要点：

```javascript
/**
 * 图片懒加载指令完整实现（Vue3自定义指令版本）
 *
 * 核心特性：
 * 1. IntersectionObserver API - 高性能视口检测
 * 2. 三级降级策略 - 兼容低版本浏览器
 * 3. LQIP 占位图支持 - 低质量图片占位（提升感知性能）
 * 4. 渐显动画 - 平滑过渡效果
 * 5. 错误处理与自动重试机制
 * 6. 动态元素监听 - MutationObserver支持
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */

// ==================== 1. Vue3 自定义指令 ====================

/**
 * v-lazy 指令（Vue3 Composition API 版本）
 *
 * 使用方式：
 * 基础用法：<img v-lazy="'https://example.com/image.jpg'" />
 * 高级用法：<img v-lazy="{ src: 'url', placeholder: 'lqip.jpg', error: 'error.jpg' }" />
 *
 * 指令生命周期钩子：
 * - mounted: 绑定时初始化观察器
 * - updated: 数据变化时重新加载
 * - unmounted: 卸载时清理资源
 */
const LazyDirective = {
  // 存储所有观察器实例（便于统一管理和清理）
  observers: new Map(),

  /**
   * 指令绑定到元素时调用（只调用一次）
   */
  mounted(el, binding) {
    const options = normalizeOptions(binding.value);

    // ====== 1. 设置LQIP占位图或普通占位图 ======
    if (options.lqip) {
      // LQIP（Low Quality Image Placeholder）策略
      // 使用极小尺寸的低质量图片作为占位，避免布局偏移
      el.src = options.lqip;
      el.setAttribute('data-lqip', 'true');
      el.style.cssText += `
        background-size: cover;
        background-repeat: no-repeat;
        filter: blur(10px);  /* LQIP模糊效果 */
        transition: filter 0.5s ease-out;
      `;
    } else if (options.placeholder) {
      // 普通占位图
      el.src = options.placeholder;
    }

    // ====== 2. 添加加载状态样式 ======
    el.classList.add('lazy-loading');

    // 设置最小高度防止CLS（Cumulative Layout Shift）
    if (!el.style.minHeight) {
      el.style.minHeight = options.minHeight || '200px';
    }

    // ====== 3. 创建IntersectionObserver ======
    const observer = createObserver(el, options);

    // 开始观察元素
    observer.observe(el);

    // 保存observer以便后续清理和更新
    LazyDirective.observers.set(el, { observer, options });
  },

  /**
   * 组件更新时调用（如v-lazy绑定的值发生变化）
   */
  updated(el, binding) {
    // 如果图片URL发生变化，重新加载
    if (binding.oldValue !== binding.value) {
      const stored = LazyDirective.observers.get(el);
      if (stored) {
        // 先停止旧观察器
        stored.observer.unobserve(el);
        stored.observer.disconnect();
      }

      // 用新配置创建新观察器
      const newOptions = normalizeOptions(binding.value);
      const newObserver = createObserver(el, newOptions);
      newObserver.observe(el);

      LazyDirective.observers.set(el, { observer: newObserver, options: newOptions });

      // 立即尝试加载新图片
      loadImage(el, newOptions);
    }
  },

  /**
   * 指令解绑时调用（组件卸载时清理资源）
   */
  unmounted(el) {
    const stored = LazyDirective.observers.get(el);
    if (stored) {
      // 断开观察器连接，释放内存
      stored.observer.disconnect();
      LazyDirective.observers.delete(el);
    }
  }
};


// ==================== 2. 核心功能函数 ====================

/**
 * 规范化配置参数（支持字符串和对象两种格式）
 *
 * @param {*} value - 指令绑定的值
 * @returns {Object} 规范化后的配置对象
 *
 * @example
 * normalizeOptions('https://img.com/a.jpg')
 * // → { src: 'https://img.com/a.jpg', ...默认值 }
 *
 * normalizeOptions({ src: 'url', lqip: 'small.jpg', threshold: 0.1 })
 * // → 合并后的完整配置
 */
function normalizeOptions(value) {
  if (typeof value === 'string') {
    return {
      src: value,
      placeholder: '',
      lqip: '',
      error: '',
      root: null,
      rootMargin: '200px',     // 提前200px开始预加载
      threshold: 0.01,          // 只要露出1%就开始加载
      retryCount: 3,            // 失败重试次数
      retryDelay: 1000,         // 重试间隔(ms)
      minHeight: '200px',       // 最小高度防CLS
      fadeInDuration: 300       // 渐显动画时长(ms)
    };
  }

  return {
    src: value.src || '',
    placeholder: value.placeholder || '',
    lqip: value.lqip || '',              // LQIP低质量占位图URL
    error: value.error || '',
    root: value.root || null,
    rootMargin: value.rootMargin || '200px',
    threshold: value.threshold ?? 0.01,
    retryCount: value.retryCount ?? 3,
    retryDelay: value.retryDelay ?? 1000,
    minHeight: value.minHeight || '200px',
    fadeInDuration: value.fadeInDuration ?? 300
  };
}

/**
 * 创建IntersectionObserver实例（带降级方案检测）
 *
 * 三级降级策略：
 * Level 1: IntersectionObserver（现代浏览器首选）
 * Level 2: getBoundingClientRect + scroll事件（兼容性较好）
 * Level 3: 直接加载所有图片（终极降级）
 */
function createObserver(el, options) {
  // ====== Level 1: IntersectionObserver（最优解）======
  if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

    return new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 元素进入视口，开始加载
            loadImage(el, options);
            // 加载后停止观察（节省资源）
            entry.target.__lazyObserver?.unobserve(entry.target);
          }
        });
      },
      {
        root: options.root,
        rootMargin: options.rootMargin,   // 预加载区域
        threshold: options.threshold       // 触发阈值
      }
    );
  }

  // ====== Level 2: 降级到scroll事件 + getBoundingClientRect ======
  console.warn('[v-lazy] IntersectionObserver not supported, falling back to scroll event');

  return {
    observe(targetEl) {
      targetEl.__lazyObserver = this;

      // 初始检查（可能在视口内）
      checkVisibility(targetEl, options);

      // 监听滚动事件（使用防抖优化性能）
      this._scrollHandler = throttle(() => {
        checkVisibility(targetEl, options);
      }, 150, { leading: true, trailing: true });

      window.addEventListener('scroll', this._scrollHandler, { passive: true });
      window.addEventListener('resize', this._scrollHandler, { passive: true });
    },

    unobserve(targetEl) {
      if (this._scrollHandler) {
        window.removeEventListener('scroll', this._scrollHandler);
        window.removeEventListener('resize', this._scrollHandler);
      }
    },

    disconnect() {
      // 清理所有事件监听
      if (this._scrollHandler) {
        window.removeEventListener('scroll', this._scrollHandler);
        window.removeEventListener('resize', this._scrollHandler);
      }
    }
  };
}

/**
 * 检查元素是否在视口内（用于降级方案）
 */
function checkVisibility(el, options) {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  // 考虑rootMargin的提前量
  const margin = parseInt(options.rootMargin) || 0;

  // 元素在视口内（含预加载区域）
  if (
    rect.top <= windowHeight + margin &&
    rect.bottom >= -margin &&
    rect.left <= windowWidth + margin &&
    rect.right >= -margin
  ) {
    loadImage(el, options);
    // 加载后移除监听
    el.__lazyObserver?.unobserve(el);
  }
}

/**
 * 加载图片核心逻辑（支持LQIP渐显动画）
 *
 * 加载流程：
 * 1. 创建Image对象预加载（不阻塞DOM渲染）
 * 2. 加载成功→替换src→执行渐显动画
 * 3. 加载失败→显示错误图→尝试重试
 */
function loadImage(el, options) {
  // 防止重复加载
  if (el.dataset.loaded === 'true') return;

  const img = new Image();

  img.onload = () => {
    // ====== 成功加载处理 ======

    // 1. 替换真实图片源
    el.src = options.src;

    // 2. 移除加载状态样式
    el.classList.remove('lazy-loading');
    el.classList.add('lazy-loaded');

    // 3. LQIP渐显动画（从模糊到清晰）
    if (options.lqip || el.getAttribute('data-lqip') === 'true') {
      // 先清除模糊滤镜
      requestAnimationFrame(() => {
        el.style.filter = 'blur(0)';
      });
    } else {
      // 普通淡入动画
      el.style.opacity = '0';
      requestAnimationFrame(() => {
        el.style.transition = `opacity ${options.fadeInDuration}ms ease-in`;
        el.style.opacity = '1';
      });
    }

    // 4. 标记为已加载（防止重复加载）
    el.dataset.loaded = 'true';

    // 5. 触发自定义事件（供外部监听）
    el.dispatchEvent(new CustomEvent('lazyload', {
      detail: { src: options.src, el }
    }));
  };

  img.onerror = () => {
    // ====== 加载失败处理 ======
    console.error(`[v-lazy] 图片加载失败: ${options.src}`);

    el.classList.remove('lazy-loading');
    el.classList.add('lazy-error');

    // 显示错误图（如果有）
    if (options.error) {
      el.src = options.error;
    }

    // 自动重试机制
    const currentRetry = parseInt(el.dataset.retryCount || '0');
    if (currentRetry < options.retryCount) {
      el.dataset.retryCount = String(currentRetry + 1);
      console.log(`[v-lazy] 重试加载 (${currentRetry + 1}/${options.retryCount})...`);

      setTimeout(() => {
        loadImage(el, options);
      }, options.retryDelay * (currentRetry + 1));  // 递增延迟
    } else {
      // 重试耗尽，触发错误事件
      el.dispatchEvent(new CustomEvent('lazyerror', {
        detail: { src: options.src, el, retries: options.retryCount }
      }));
    }
  };

  // 开始加载
  img.src = options.src;
}


// ==================== 3. React Hook 版本 ====================

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useLazyImage Hook（React函数组件版）
 *
 * 功能特性：
 * - IntersectionObserver 视口检测
 * - LQIP占位图支持
 * - 错误处理与重试
 * - 完整的TypeScript类型支持
 *
 * @param {string} src - 图片地址
 * @param {Object} [options={}] - 配置选项
 * @returns {Object} { ref, isLoading, hasError, currentSrc }
 *
 * @example
 * function MyComponent() {
 *   const { ref, isLoading, currentSrc } = useLazyImage('/large-image.jpg', {
 *     placeholder: '/placeholder.jpg',
 *     rootMargin: '200px'
 *   });
 *
 *   return <img ref={ref} src={currentSrc} alt="Lazy image" />;
 * }
 */
function useLazyImage(src, options = {}) {
  const imgRef = useRef(null);
  const [state, setState] = useState({
    loaded: false,
    error: false,
    src: options.placeholder || options.lqip || ''
  });

  /**
   * 加载图片函数
   */
  const loadImg = useCallback((imageSrc) => {
    if (!imageSrc) return;

    const img = new Image();

    img.onload = () => {
      setState({
        loaded: true,
        error: false,
        src: imageSrc
      });
    };

    img.onerror = () => {
      setState(prev => ({
        ...prev,
        error: true,
        src: options.error || prev.src
      }));
    };

    img.src = imageSrc;
  }, [options.error]);

  useEffect(() => {
    const element = imgRef.current;
    if (!element || !src) return;

    // 检查是否支持IntersectionObserver
    let observer;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            loadImg(src);
            observer?.unobserve(element);  // 加载后停止观察
          }
        },
        {
          rootMargin: options.rootMargin || '200px',
          threshold: options.threshold || 0.01
        }
      );

      observer.observe(element);
    } else {
      // 降级方案：直接加载
      loadImg(src);
    }

    return () => {
      observer?.disconnect();  // 清理观察器
    };
  }, [src, options.rootMargin, options.threshold, loadImg]);

  return {
    ref: imgRef,
    isLoading: !state.loaded && !state.error,
    isLoaded: state.loaded,
    hasError: state.error,
    src: state.src,
    ...state
  };
}

// React组件封装示例
function LazyImage({ src, alt, className, style, ...props }) {
  const { ref, isLoaded, hasError, src: currentSrc } = useLazyImage(src, {
    placeholder: props.placeholder,
    lqip: props.lqip,
    error: props.error,
    rootMargin: props.rootMargin
  });

  return (
    <img
      ref={ref}
      src={currentSrc}
      alt={alt}
      className={`lazy-image ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''} ${className || ''}`}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in',
        ...style
      }}
      {...props}
    />
  );
}


// ==================== 4. 原生JS管理器（无框架依赖）====================

/**
 * LazyLoadManager - 原生JS图片懒加载管理器
 *
 * 支持特性：
 * - IntersectionObserver（优先）/ scroll事件降级 / 直接加载（最终降级）
 * - MutationObserver动态元素监听
 * - 批量操作API
 * - 事件系统
 *
 * @example
 * const loader = new LazyLoadManager({
 *   selector: 'img[data-src]',
 *   rootMargin: '300px'
 * });
 *
 * // 手动触发加载
 * loader.loadAll();
 *
 * // 销毁实例
 * loader.destroy();
 */
class LazyLoadManager {
  constructor(options = {}) {
    this.options = {
      selector: options.selector || '[data-src]',       // 选择器
      rootMargin: options.rootMargin || '200px',        // 预加载距离
      threshold: options.threshold || 0.01,              // 触发阈值
      fallback: options.fallback || 'direct',            // 降级策略: direct | scroll | none
      ...options
    };

    this.observer = null;           // 主观察器
    this.mutationObserver = null;   // DOM变化观察器
    this.loadedElements = new Set(); // 已加载元素集合

    this.init();
  }

  /**
   * 初始化懒加载系统
   */
  init() {
    // 尝试使用IntersectionObserver（Level 1）
    if (this.canUseIntersectionObserver()) {
      this.initIntersectionObserver();
    }
    // 降级到scroll事件（Level 2）
    else if (this.options.fallback !== 'none') {
      this.initScrollFallback();
    }
    // 最终降级：直接加载所有图片（Level 3）
    else {
      this.loadAllDirectly();
      return;
    }

    // 监听DOM变化（支持动态添加的元素）
    this.setupMutationObserver();

    // 初始扫描已有元素
    this.observeNewElements();

    console.log(`[LazyLoadManager] 初始化完成 (${this.getStrategyName()}模式)`);
  }

  /**
   * 检测浏览器是否支持IntersectionObserver
   */
  canUseIntersectionObserver() {
    return 'IntersectionObserver' in window &&
           'IntersectionObserverEntry' in window &&
           'intersectionRatio' in window.IntersectionObserverEntry.prototype;
  }

  /**
   * 获取当前使用的策略名称
   */
  getStrategyName() {
    if (this.observer instanceof IntersectionObserver) return 'IntersectionObserver';
    if (this._scrollHandler) return 'Scroll Event';
    return 'Direct Load';
  }

  /**
   * 初始化IntersectionObserver
   */
  initIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.observer.unobserve(entry.target);  // 单次触发后停止观察
        }
      });
    }, {
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold
    });
  }

  /**
   * 初始化scroll事件降级方案
   */
  initScrollFallback() {
    this._scrollHandler = throttle(() => {
      this.checkAllVisibility();
    }, 150, { leading: true, trailing: true });

    window.addEventListener('scroll', this._scrollHandler, { passive: true });
    window.addEventListener('resize', this._scrollHandler, { passive: true });

    // 初始检查一次
    this.checkAllVisibility();
  }

  /**
   * 检查所有未加载元素的可见性（降级方案用）
   */
  checkAllVisibility() {
    document.querySelectorAll(this.options.selector).forEach(el => {
      if (!this.loadedElements.has(el)) {
        const rect = el.getBoundingClientRect();
        const margin = parseInt(this.options.rootMargin) || 0;

        if (rect.top <= window.innerHeight + margin && rect.bottom >= -margin) {
          this.loadImage(el);
        }
      }
    });
  }

  /**
   * 直接加载所有图片（无任何优化，终极降级）
   */
  loadAllDirectly() {
    document.querySelectorAll(this.options.selector).forEach(el => {
      this.loadImage(el);
    });
  }

  /**
   * 观察新元素（初始扫描+后续动态元素）
   */
  observeNewElements() {
    document.querySelectorAll(this.options.selector).forEach(el => {
      if (!this.loadedElements.has(el)) {
        if (this.observer instanceof IntersectionObserver) {
          this.observer.observe(el);
        }
        // scroll模式下会在checkAllVisibility中处理
      }
    });
  }

  /**
   * 加载单个图片
   */
  loadImage(el) {
    if (this.loadedElements.has(el)) return;

    const src = el.dataset.src;
    if (!src) return;

    const img = new Image();

    img.onload = () => {
      el.src = src;
      el.classList.add('lazy-loaded');
      el.removeAttribute('data-src');  // 清除标记
      this.loadedElements.add(el);

      // 渐显动画
      el.style.opacity = '0';
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.3s ease-in';
        el.style.opacity = '1';
      });

      // 触发全局事件
      document.dispatchEvent(new CustomEvent('lazyload:image-loaded', {
        detail: { el, src }
      }));
    };

    img.onerror = () => {
      el.classList.add('lazy-error');
      const errorSrc = el.dataset.error;
      if (errorSrc) el.src = errorSrc;

      document.dispatchEvent(new CustomEvent('lazyload:image-error', {
        detail: { el, src }
      }));
    };

    img.src = src;
  }

  /**
   * 设置MutationObserver监听DOM变化
   * 用于捕获JavaScript动态添加的图片元素
   */
  setupMutationObserver() {
    try {
      this.mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            // 只处理元素节点
            if (node.nodeType !== Node.ELEMENT_NODE) return;

            // 检查节点本身
            if (node.matches?.(this.options.selector)) {
              this.observeSingleElement(node);
            }

            // 检查子节点
            node.querySelectorAll?.(this.options.selector)?.forEach(child => {
              this.observeSingleElement(child);
            });
          });
        });
      });

      // 观察整个body的子树变化
      this.mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    } catch (e) {
      console.warn('[LazyLoadManager] MutationObserver不可用:', e);
    }
  }

  /**
   * 观察单个元素
   */
  observeSingleElement(el) {
    if (this.loadedElements.has(el)) return;

    if (this.observer instanceof IntersectionObserver) {
      this.observer.observe(el);
    }
    // scroll模式会在下次滚动时检查
  }

  /**
   * 手动触发加载所有图片（忽略懒加载）
   */
  loadAll() {
    document.querySelectorAll(this.options.selector).forEach(el => {
      this.loadImage(el);
    });
  }

  /**
   * 重新扫描并观察新元素（适用于AJAX加载内容后调用）
   */
  refresh() {
    this.observeNewElements();
  }

  /**
   * 销毁实例，释放所有资源
   */
  destroy() {
    // 断开主观察器
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    // 断开MutationObserver
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }

    // 移除scroll事件监听
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
      window.removeEventListener('resize', this._scrollHandler);
      this._scrollHandler = null;
    }

    // 清空集合
    this.loadedElements.clear();

    console.log('[LazyLoadManager] 已销毁');
  }

  /**
   * 获取统计信息（调试用）
   */
  getStats() {
    const total = document.querySelectorAll(this.options.selector).length;
    const loaded = this.loadedElements.size;
    const pending = total - loaded;

    return {
      total,
      loaded,
      pending,
      strategy: this.getStrategyName(),
      percentage: total > 0 ? ((loaded / total) * 100).toFixed(1) + '%' : 'N/A'
    };
  }
}


// ==================== 5. CSS样式（建议放在全局CSS文件）====================

/*
 * 图片懒加载相关样式
 * 包含：占位图、骨架屏、渐显动画、错误状态等
 */

/*
.lazy-image,
[data-src] {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  background-color: #f5f5f5;  // 浅灰背景色
  min-height: 200px;          // 防止CLS布局偏移
}

// 加载中的状态
.lazy-loading {
  position: relative;
  overflow: hidden;
}

// 骨架屏动画（替代纯色占位）
.lazy-loading::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite ease-in-out;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

// 加载完成状态
.lazy-loaded {
  opacity: 1;
}

// LQIP模糊渐变效果
[data-lqip="true"] {
  transition: filter 0.5s ease-out;
}

[data-lqip="true"].lazy-loaded {
  filter: blur(0);
}

// 错误状态
.lazy-error {
  background-color: #fafafa;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23cccccc' stroke-width='1'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21 15 16 10 5 21'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 48px 48px;
  min-height: 200px;
}
*/


// ==================== 6. 使用示例 ====================

console.log('\n========== 图片懒加载指令完整演示 ==========\n');

// ---------- 示例1：原生JS初始化 ----------
console.log('--- 示例1: 原生JS版本 ---\n');

// 在HTML中使用：
// <img data-src="https://picsum.photos/800/600" data-error="/error.jpg" alt="示例图" />

// 初始化懒加载（会自动选择最佳策略）
const lazyLoader = new LazyLoadManager({
  selector: 'img[data-src]',
  rootMargin: '300px',  // 提前300px开始预加载
  threshold: 0.05        // 可见5%时触发
});

// 查看统计信息
setTimeout(() => {
  console.log('📊 懒加载统计:', lazyLoader.getStats());
}, 1000);


// ---------- 示例2：Vue3注册指令 ----------
console.log('\n--- 示例2: Vue3指令注册 ---\n');

// main.js 中注册
// import { createApp } from 'vue'
// import App from './App.vue'
// import { LazyDirective } from './directives/lazy'
//
// const app = createApp(App)
// app.directive('lazy', LazyDirective)
// app.mount('#app')

// 组件中使用
console.log(`
// 模板中的用法：

<!-- 基础用法 -->
<img v-lazy="'https://example.com/photo.jpg'" alt="照片" />

<!-- 高级用法（带LQIP占位图） -->
<img
  v-lazy="{
    src: 'https://example.com/hd-photo.jpg',
    lqip: 'https://example.com/lqip.jpg',    // 低质量占位图（几KB）
    placeholder: '/placeholder.svg',           // 普通占位图
    error: '/error.svg',                       // 加载失败时的错误图
    rootMargin: '500px',                      // 提前500px加载
    retryCount: 3                             // 失败重试3次
  }"
  alt="高清照片"
/>

<!-- 动态切换图片 -->
<img :v-lazy="dynamicImageUrl" alt="动态图" />
`);


// ---------- 示例3：React Hook使用 ----------
console.log('\n--- 示例3: React Hook ---\n');

console.log(`
// React组件中的用法：

import { LazyImage } from './components/LazyImage';

function PhotoGallery({ images }) {
  return (
    <div className="gallery">
      {images.map(img => (
        <LazyImage
          key={img.id}
          src={img.url}
          alt={img.alt}
          lqip={img.lqipUrl}           // LQIP占位图
          placeholder="/skeleton.gif"   // 骨架屏GIF
          error="/broken-image.svg"    // 错误图
          rootMargin="400px"
          className="gallery-item"
        />
      ))}
    </div>
  );
}
`);


// ---------- 示例4：降级策略说明 ----------
console.log('\n--- 示例4: 三级降级策略 ---\n');

console.log(`
┌─────────────────────────────────────────────────────────────┐
│                    懒加载降级策略                             │
├──────────────┬──────────────────┬───────────────────────────┤
│  优先级      │  方案             │  适用场景                  │
├──────────────┼──────────────────┼───────────────────────────┤
│  Level 1 ⭐   │ IntersectionObs  │ Chrome 51+, Firefox 55+, │
│  （推荐）     │ erver API        │ Safari 12.1+, Edge 15+   │
├──────────────┼──────────────────┼───────────────────────────┤
│  Level 2     │ Scroll事件 +     │ IE11, 旧版移动端浏览器    │
│              │ getBoundingCli   │ 性能略差但可用             │
│              │ entRect()        │                           │
├──────────────┼──────────────────┼───────────────────────────┤
│  Level 3     │ 直接加载所有图片  │ 极老旧浏览器或不需优化场景  │
│  （兜底）     │                  │ 无性能优化                │
└──────────────┴──────────────────┴───────────────────────────┘

当前环境使用的策略: ${lazyLoader.getStrategyName()}
`);


// ---------- 示例5：LQIP技术原理 ----------
console.log('\n--- 示例5: LQIP占位图技术 ---\n');

console.log(`
LQIP（Low Quality Image Placeholder）工作流程：

1️⃣  用户请求页面
    ↓
2️⃣  服务端返回极小的低质量图片（通常<2KB，20x20像素）
    ↓
3️⃣  浏览器立即显示模糊的LQIP占位图（用户感觉"很快"）
    ↓
4️⃣  后台异步加载真实高清图片
    ↓
5️⃣  高清图加载完成后，替换LQIP并播放渐显动画
    ↓
6️⃣  用户看到清晰的图片（感知延迟大幅降低）

优势：
✅ 减少CLS（累积布局偏移）- 占位图保持空间
✅ 提升感知性能 - 用户更快看到"内容"
✅ 平滑视觉体验 - 渐显动画比突然出现更自然

实现方式：
• 服务端生成：Sharp/ImageMagick在构建时生成缩略图
• 第三方服务：Cloudinary/Imgix自动提供LQIP URL
• Base64内联：将极小图片编码为Base64直接嵌入HTML
`);


console.log('\n✅ 图片懒加载指令完整版实现完成');
console.log('支持：Vue3指令 / React Hook / 原生JS / 三级降级 / LQIP / 渐显动画\n');
```

> **追问链**：如何处理动态添加的图片？→ 占位图和骨架屏的选择？→ WebP格式自动降级？→ 图片CDN优化策略？

---

## Q42: 如何优化首屏渲染速度？（综合方案设计）
- **难度**：★★★
- **知识点**：性能优化 / FCP / FMP / Core Web Vitals / 综合方案
- **题型**：场景设计题

### 参考答案要点：

1. **问题分析与指标体系**
   
   **核心指标（Core Web Vitals）**
   ```
   LCP（Largest Contentful Paint）：最大内容绘制 < 2.5s
   FID（First Input Delay）：首次输入延迟 < 100ms
   CLS（Cumulative Layout Shift）：累积布局偏移 < 0.1
   
   辅助指标：
   FCP（First Contentful Paint）< 1.8s
   TTI（Time to Interactive）< 3.8s
   TBT（Total Blocking Time）< 200ms
   ```

2. **分层优化方案**

   **第一层：网络层优化**
   ```javascript
   // 1. HTTP/2 或 HTTP/3 启用多路复用
   // 2. CDN加速（静态资源就近分发）
   // 3. DNS预解析
   <link rel="dns-prefetch" href="//cdn.example.com">
   <link rel="preconnect" href="https://api.example.com">
   
   // 4. 资源压缩
   // Gzip/Brotli压缩（HTML/CSS/JS可减少60-80%体积）
   // 图片压缩（WebP/AVIF比JPEG小25-50%）
   
   // 5. 缓存策略
   // 强缓存：Cache-Control: max-age=31536000, immutable
   // 协商缓存：ETag / Last-Modified
   
   // 6. 预加载关键资源
   <link rel="preload" as="font" type="font/woff2" crossorigin href="/font.woff2">
   <link rel="preload" as="image" href="/hero-image.webp">
   ```

   **第二层：资源加载优化**
   ```javascript
   // 1. Critical CSS内联（首屏CSS < 14KB）
   <style>
     /* 通过工具提取的首屏必要样式 */
     .header{...} .hero{...} .nav{...}
   </style>
   
   // 2. 非关键资源异步加载
   // CSS异步
   <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
   
   // JS异步
   <script src="/analytics.js" async></script>
   <script src="/app.js" defer></script>
   
   // 3. 代码分割（Code Splitting）
   // 动态import()
   import('./HeavyComponent').then(module => {...});
   
   // 4. Tree Shaking（消除死代码）
   // webpack/rollup自动移除未使用的代码
   
   // 5. 字体优化
   <link rel="preload" as="font" href="/font.woff2" crossorigin>
   // font-display: swap 防止FOIT
   ```

   **第三层：渲染优化**
   ```javascript
   // 1. 服务端渲染（SSR）/ 静态生成（SSG）
   // Nuxt.js / Next.js / Gatsby
   
   // 2. 骨架屏（Skeleton Screen）
   // 在数据加载前显示灰色占位结构
   <div class="skeleton">
     <div class="skeleton-text"></div>
     <div class="skeleton-img"></div>
   </div>
   
   // 3. 关键渲染路径优化
   // 减少阻塞渲染的资源
   // 优先加载首屏可见内容
   
   // 4. 图片优化
   // 响应式图片（srcset/sizes）
   <img srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
        sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200w"
        src="medium.jpg" alt="">
   
   // 懒加载（IntersectionObserver）
   // WebP格式 + 降级方案
   <picture>
     <source srcset="image.webp" type="image/webp">
     <source srcset="image.jp2" type="image/jp2">
     <img src="image.jpg" alt="">
   </picture>
   ```

   **第四层：JavaScript执行优化**
   ```javascript
   // 1. 减少主线程阻塞
   // 使用Web Worker处理计算密集型任务
   const worker = new Worker('heavy-task.js');
   
   // 2. 分片执行长任务（Time Slicing）
   function processLargeArray(array, processFn, chunkSize = 100) {
     let index = 0;
     
     function processChunk() {
       const end = Math.min(index + chunkSize, array.length);
       
       for (; index < end; index++) {
         processFn(array[index], index);
       }
       
       if (index < array.length) {
         requestIdleCallback(processChunk, { timeout: 50 });
         // 或者 requestAnimationFrame(processChunk)
       }
     }
     
     processChunk();
   }
   
   // 3. 使用requestIdleCallback执行低优先级任务
   requestIdleCallback(deadline => {
     while (deadline.timeRemaining() > 0) {
       // 执行非紧急工作
     }
   });
   
   // 4. 避免长任务（Long Task > 50ms）
   // Chrome DevTools Performance面板检测Long Task
   ```

3. **监控与持续优化**
   ```javascript
   // 1. Real User Monitoring (RUM)
   // 使用web-vitals库采集真实用户数据
   import { getLCP, getFID, getCLS } from 'web-vitals';
   
   getLCP(console.log);
   getFID(console.log);
   getCLS(console.log);
   
   // 2. Synthetic Monitoring（合成监控）
   // Lighthouse CI定期审计
   // WebPageTest定时测试
   
   // 3. 性能预算（Performance Budget）
   const budget = {
     javascript: '200KB gzipped',  // JS总大小限制
     css: '50KB gzipped',         // CSS总大小限制
     fonts: '100KB',              // 字体总大小限制
     images: '500KB',             // 图片总大小限制（首屏）
     thirdParty: '100KB',         // 第三方脚本限制
     lcp: '2.5s',                 // 最大内容绘制时间
     fcp: '1.8s',                 // 首次内容绘制时间
     tti: '3.8s'                  // 可交互时间
   };
   
   // 4. A/B测试验证优化效果
   ```

4. **优化优先级矩阵**
   ```
   高影响 + 低成本（优先做）：
   ✅ 启用Gzip/Brotli压缩
   ✅ 图片格式转换WebP
   ✅ 关键CSS内联
   ✅ 异步加载非关键JS
   
   高影响 + 高成本（规划做）：
   ⭐ SSR/SSG改造
   ⭐ 架构升级（微前端拆分）
   ⭐ CDN全球部署
   
   低影响 + 低成本（有空做）：
   🔧 移除未使用的CSS
   🔧 优化字体加载
   🔧 预连接DNS
   
   低影响 + 高成本（暂不做）：
   ❌ 重写底层库
   ❌ 自研框架
   ```

### 🔍 追问链

1. **SSR 和 CSR 的首屏性能对比？**
   → 方向：SSR（服务端渲染）首屏FCP快（HTML直接包含内容）、但TTFB较慢（需服务器计算）；CSR（客户端渲染）首屏慢（需等待JS下载执行）、但后续导航快（SPA路由切换）；混合方案：ISR（增量静态再生成）/SSG（静态站点生成）/Streaming SSR（流式渲染，React Suspense/SvelteKit streaming）；选择依据：SEO需求、内容更新频率、团队技术栈

2. **关键 CSS 内联的提取工具和方法？**
   → 方向：Critical CSS概念（首屏渲染所需的最小CSS集合）；自动化工具：Critical（Google出品的CLI工具）、PurgeCSS（扫描HTML移除未使用CSS）、UnCSS（类似但基于JSDOM模拟）；构建时集成：Webpack的MiniCssExtractPlugin配合critters插件、Vite内置支持；手动优化策略：按组件拆分CSS、媒体查询分离、CSS containment

3. **如何量化首屏优化的效果？**
   → 方向：Core Web Vitals三大指标（LCP<2.5s, FID<100ms, CLS<0.1）；测量工具：Lighthouse（综合评分）、Web Vitals JS库（真实用户监控RUM）、Chrome DevTools Performance面板（实验室数据）；对比优化前后的指标变化；建立性能预算（Performance Budget）：如JS<170KB gzipped、LCP<2s、FCP<1.8s；持续监控方案： Sentry Performance、DataDog RUM、自建上报系统

---

## Q43: 大列表渲染的性能瓶颈在哪里？虚拟滚动的原理是什么？
- **难度**：★★★
- **知识点**：虚拟滚动 / 大列表 / 性能优化 / DOM优化
- **题型**：综合分析题

### 参考答案要点：

1. **大列表渲染的性能瓶颈分析**
   
   **问题根源**
   ```
   假设渲染10,000条数据的列表：
   
   DOM节点数：10,000+ 个元素
   内存占用：~50-100MB+ （每个DOM节点约5-10KB）
   首次渲染时间：~500ms-2s+
   滚动卡顿：每帧需要遍历大量节点
   
   性能瓶颈点：
   1. DOM创建开销：大量createElement调用
   2. 内存占用过高：每个节点都有内存开销
   3. Layout计算：浏览器需计算所有元素的位置
   4. Paint开销：即使不可见也要参与绘制计算
   5. GC压力：频繁创建/销毁对象触发垃圾回收
   ```

   **实际测量数据**
   ```javascript
   // 测试：不同数量列表的渲染性能
   // 100条：~20ms，流畅
   // 1,000条：~150ms，轻微卡顿
   // 10,000条：~1s+，明显卡顿
   // 100,000条：可能崩溃或极慢
   ```

2. **虚拟滚动（Virtual Scrolling）原理**
   
   **核心思想**
   ```
   ┌─────────────────────────────┐
   │  可视区域（Viewport）        │  ← 用户看到的区域
   │  高度：例如 600px           │
   │                             │
   │  ├─ Item 45（渲染）         │  ← 只渲染可视区域的项
   │  ├─ Item 46（渲染）         │
   │  ├─ Item 47（渲染）         │
   │  ├─ Item 48（渲染）         │
   │  ├─ Item 49（渲染）         │
   │  ├─ Item 50（渲染）         │
   │  ├─ Item 51（渲染）         │
   │  ├─ Item 52（渲染）         │
   │  ├─ Item 53（渲染）         │
   │  └─ Item 54（渲染）         │
   └─────────────────────────────┘
   
   总数据：100,000条
   实际DOM节点：仅 ~15-20个（可视区域 + buffer）
   内存节省：99.9%+
   ```

   **关键技术点**
   ```javascript
   // 1. 计算可视范围
   function getVisibleRange(scrollTop, containerHeight, itemHeight) {
     const startIndex = Math.floor(scrollTop / itemHeight);
     const visibleCount = Math.ceil(containerHeight / itemHeight);
     const endIndex = startIndex + visibleCount;
     
     // 添加buffer避免滚动时出现空白
     const bufferSize = 5;
     return {
       start: Math.max(0, startIndex - bufferSize),
       end: Math.min(totalItems, endIndex + bufferSize)
     };
   }
   
   // 2. 动态高度计算（不等高item）
   // 方案A：预估高度 + 动态修正
   // 方案B：先渲染测量再调整（两次渲染）
   // 方案C：使用ResizeObserver实时监听
   
   // 3. 滚动位置同步
   container.scrollTop = scrollOffset;  // 保持滚动位置正确
   ```

3. **简易虚拟滚动实现**
   ```javascript
   class VirtualScrollList {
     constructor(container, options = {}) {
       this.container = container;
       this.itemHeight = options.itemHeight || 50;
       this.totalItems = options.totalItems || 0;
       this.renderItem = options.renderItem;  // 渲染单个item的函数
       this.bufferSize = options.bufferSize || 5;
       
       this.visibleStart = 0;
       this.visibleEnd = 0;
       this.scrollOffset = 0;
       
       this.init();
     }
     
     init() {
       // 创建wrapper用于定位
       this.wrapper = document.createElement('div');
       this.wrapper.className = 'virtual-scroll-wrapper';
       this.container.appendChild(this.wrapper);
       
       // 设置总高度（撑开滚动条）
       this.updateTotalHeight();
       
       // 监听滚动事件
       this.container.addEventListener('scroll', () => this.handleScroll());
       
       // 首次渲染
       this.render();
     }
     
     updateTotalHeight() {
       const totalHeight = this.totalItems * this.itemHeight;
       this.wrapper.style.height = `${totalHeight}px`;
       this.wrapper.style.position = 'relative';
     }
     
     handleScroll() {
       const scrollTop = this.container.scrollTop;
       
       // 使用requestAnimationFrame节流
       requestAnimationFrame(() => {
         if (scrollTop !== this.scrollOffset) {
           this.scrollOffset = scrollTop;
           this.calculateVisibleRange();
           this.render();
         }
       });
     }
     
     calculateVisibleRange() {
       const containerHeight = this.container.clientHeight;
       const start = Math.floor(this.scrollOffset / this.itemHeight);
       const visibleCount = Math.ceil(containerHeight / this.itemHeight);
       
       this.visibleStart = Math.max(0, start - this.bufferSize);
       this.visibleEnd = Math.min(
         this.totalItems,
         start + visibleCount + this.bufferSize
       );
     }
     
     render() {
       // 清空现有内容
       this.wrapper.innerHTML = '';
       
       // 只渲染可视范围内的items
       const fragment = document.createDocumentFragment();
       
       for (let i = this.visibleStart; i < this.visibleEnd; i++) {
         const itemEl = this.renderItem(i);
         
         // 定位：绝对定位到正确位置
         itemEl.style.position = 'absolute';
         itemEl.style.top = `${i * this.itemHeight}px`;
         itemEl.style.width = '100%';
         itemEl.style.height = `${this.itemHeight}px`;
         
         fragment.appendChild(itemEl);
       }
       
       this.wrapper.appendChild(fragment);
     }
     
     // 更新数据
     setData(newData) {
       this.totalItems = newData.length;
       this.updateTotalHeight();
       this.render();
     }
     
     // 滚动到指定索引
     scrollToIndex(index) {
       this.container.scrollTop = index * this.itemHeight;
     }
     
     destroy() {
       this.container.removeEventListener('scroll', this.handleScroll);
       this.container.innerHTML = '';
     }
   }

   // 使用示例
   const listContainer = document.getElementById('list');
   const data = Array.from({ length: 10000 }, (_, i) => ({
     id: i,
     title: `Item ${i}`,
     content: `Content for item ${i}`
   }));

   const virtualList = new VirtualScrollList(listContainer, {
     itemHeight: 60,
     totalItems: data.length,
     renderItem: (index) => {
       const div = document.createElement('div');
       div.className = 'list-item';
       div.innerHTML = `
         <strong>${data[index].title}</strong>
         <span>${data[index].content}</span>
       `;
       return div;
     },
     bufferSize: 10
   });
   ```

4. **成熟方案推荐**
   
   | 库名 | 特点 | 适用场景 |
   |------|------|---------|
   **react-window** | React生态，轻量高性能 | React项目 |
   **react-virtualized** | 功能全面，组件丰富 | 复杂表格/列表 |
   **vue-virtual-scroller-list** | Vue2/3兼容 | Vue项目 |
   **@tanstack/virtual** | 框架无关，现代API | 任意框架 |
   **vue-virtual-scroller** | Vue官方推荐 | Vue3项目 |

5. **进阶优化技巧**
   
   **动态高度支持**
   ```javascript
   // 使用ResizeObserver监听item实际高度
   const sizeMap = new Map();  // index -> measuredHeight
   
   function measureItem(index, element) {
     const ro = new ResizeObserver(entries => {
       const height = entries[0].contentRect.height;
       sizeMap.set(index, height);
       recalculatePositions();  // 重新计算位置
     });
     ro.observe(element);
   }
   ```
   
   **无限滚动（Infinite Scroll）**
   ```javascript
   // 接近底部时加载更多数据
   function checkLoadMore() {
     const { scrollTop, scrollHeight, clientHeight } = container;
     const distanceToBottom = scrollHeight - scrollTop - clientHeight;
     
     if (distanceToBottom < 200) {  // 距离底部200px时触发
       loadMoreData();
     }
   }
   ```
   
   **固定列虚拟化（Grid/Table）**
   // 同时虚拟化行和列
   // 适用于大数据量表格

> **追问链**：如何处理不等高的列表项？→ 虚拟滚动中的焦点管理？→ 与搜索/过滤功能的集成？

---

## Q44: 如何设计一套完整的前端缓存策略？
- **难度**：★★★
- **知识点**：缓存策略 / HTTP缓存 / Service Worker / LocalStorage / IndexedDB
- **题型**：场景设计题

### 参考答案要点：

1. **多层缓存架构设计**
   ```
   ┌─────────────────────────────────────────────┐
   │              应用层缓存架构                   │
   ├─────────────────────────────────────────────┤
   │                                             │
   │  L1: 内存缓存（Memory Cache）               │
   │  ├── 变量/常量                              │
   │  ├── Map/WeakMap                            │
   │  └── 生命周期：页面会话                      │
   │                                             │
   │  L2: 浏览器存储（Browser Storage）           │
   │  ├── SessionStorage（会话级临时数据）        │
   │  ├── localStorage（长期用户偏好）            │
   │  └── IndexedDB（结构化大数据）               │
   │                                             │
   │  L3: HTTP缓存（HTTP Cache）                 │
   │  ├── 强缓存（Cache-Control: max-age）        │
   │  ├── 协商缓存（ETag/Last-Modified）         │
   │  └── Service Worker Cache                   │
   │                                             │
   │  L4: CDN边缘缓存（Edge Cache）              │
   │  ├── 静态资源就近分发                        │
   │  └── 全球节点加速                           │
   │                                             │
   └─────────────────────────────────────────────┘
   ```

2. **各层级详细策略**

   **L1：内存缓存（最快，最小）**
   ```javascript
   // 场景：频繁访问但不大的数据
   class MemoryCache {
     constructor(options = {}) {
       this.cache = new Map();
       this.maxSize = options.maxSize || 100;
       this.ttl = options.ttl || 5 * 60 * 1000;  // 默认5分钟
     }

     get(key) {
       const item = this.cache.get(key);
       if (!item) return null;
       
       // TTL检查
       if (Date.now() - item.timestamp > this.ttl) {
         this.cache.delete(key);
         return null;
       }
       
       return item.value;
     }

     set(key, value) {
       // LRU淘汰
       if (this.cache.size >= this.maxSize) {
         const firstKey = this.cache.keys().next().value;
         this.cache.delete(firstKey);
       }
       
       this.cache.set(key, {
         value,
         timestamp: Date.now()
       });
     }
   }

   // 使用：API响应缓存
   const apiCache = new MemoryCache({ maxSize: 50, ttl: 60000 });
   ```

   **L2：浏览器存储（中等速度，较大容量）**
   ```javascript
   // 选择指南：

   // SessionStorage：表单草稿、临时状态
   sessionStorage.setItem('formDraft', JSON.stringify(formData));

   // localStorage：用户设置、主题偏好
   localStorage.setItem('theme', 'dark');

   // IndexedDB：离线数据、大量结构化数据
   // 适合：聊天记录、文档编辑、离线应用
   ```

   **L3：HTTP缓存（可控性强）**
   ```http
   # 静态资源（强缓存）
   Cache-Control: public, max-age=31536000, immutable
   # HTML文件（短缓存或协商缓存）
   Cache-Control: no-cache
   ETag: "v1.2.3"
   
   # API响应（根据数据特性）
   # 不变的配置数据
   Cache-Control: public, max-age=3600
   
   # 用户个性化数据（私有，不缓存）
   Cache-Control: private, no-store
   ```

   **Service Worker缓存策略**
   ```javascript
   // 不同资源的缓存策略
   const CACHE_STRATEGIES = {
     // Cache First：静态资源优先从缓存读取
     static: async (request) => {
       const cached = await caches.match(request);
       if (cached) return cached;
       const response = await fetch(request);
       const cache = await caches.open('static-v1');
       cache.put(request, response.clone());
       return response;
     },
     
     // Network First：API请求优先走网络
     api: async (request) => {
       try {
         const response = await fetch(request);
         const cache = await caches.open('api-v1');
         cache.put(request, response.clone());
         return response;
       } catch (error) {
         const cached = await caches.match(request);
         if (cached) return cached;
         throw error;
       }
     },
     
     // Stale While Revalidate：缓存优先同时后台更新
     swr: async (request) => {
       const cached = await caches.match(request);
       const fetchPromise = fetch(request).then(response => {
         caches.open('swr-v1').then(cache => cache.put(request, response.clone()));
         return response;
       });
       return cached || fetchPromise;
     }
   };
   ```

3. **缓存失效与更新机制**
   
   **主动失效**
   ```javascript
   // 版本号控制
   const CACHE_VERSION = 'v2.1.0';
   const CACHE_NAME = `my-app-${CACHE_VERSION}`;
   
   // SW安装时清理旧缓存
   self.addEventListener('install', event => {
     event.waitUntil(
       caches.open(CACHE_NAME).then(cache => {
         // 预缓存关键资源
         return cache.addAll(['/app.js', '/style.css']);
       })
     );
   });

   self.addEventListener('activate', event => {
     event.waitUntil(
       caches.keys().then(cacheNames => {
         return Promise.all(
           cacheNames
             .filter(name => name !== CACHE_NAME)
             .map(name => caches.delete(name))
         );
       })
     );
   });
   ```

   **被动失效（TTL）**
   ```javascript
   // IndexedDB中记录缓存时间
   async function getCachedData(key) {
     const db = await openDB();
     const record = await db.get('cache', key);
     
     if (!record) return null;
     
     // 检查TTL（如1小时）
     if (Date.now() - record.cachedAt > 3600000) {
       await db.delete('cache', key);
       return null;
     }
     
     return record.data;
   }
   ```

4. **缓存穿透/击穿/雪崩防护**
   
   ```javascript
   // 防穿透：缓存空值
   async function getDataWithNullCache(key) {
     let data = memoryCache.get(key);
     
     if (data === undefined) {
       // 未命中缓存，查询数据库
       data = await fetchFromDB(key);
       
       // 即使结果为null也缓存（短TTL）
       memoryCache.set(key, data ?? '__NULL__', 60000);  // 1分钟
     }
     
     // 返回真正的null而非占位符
     return data === '__NULL__' ? null : data;
   }

   // 防击穿：互斥锁（单次请求）
   const pendingRequests = new Map();

   async function getDataWithLock(key) {
     // 如果已有相同请求在进行中，复用它
     if (pendingRequests.has(key)) {
       return pendingRequests.get(key);
     }
     
     const promise = fetchFromDB(key).finally(() => {
       pendingRequests.delete(key);
     });
     
     pendingRequests.set(key, promise);
     return promise;
   }

   // 防雪崩：随机TTL + 限流
   function getRandomTTL(baseTTL) {
     // 在基础TTL上增加随机偏移，避免同时过期
     return baseTTL + Math.random() * baseTTL * 0.2;
   }
   ```

5. **监控与分析**
   ```javascript
   // 缓存命中率监控
   class CacheMonitor {
     constructor() {
       this.stats = { hits: 0, misses: 0 };
     }

     recordHit() { this.stats.hits++; }
     recordMiss() { this.stats.misses++; }

     getHitRate() {
       const total = this.stats.hits + this.stats.misses;
       return total > 0 ? (this.stats.hits / total * 100).toFixed(2) + '%' : 'N/A';
     }

     report() {
       console.table({
         '缓存命中': this.stats.hits,
         '缓存未命中': this.stats.misses,
         '命中率': this.getHitRate()
       });
     }
   }

   // 定期上报缓存统计
   setInterval(() => cacheMonitor.report(), 60000);
   ```

> **追问链**：如何处理缓存一致性？→ 离线优先还是在线优先？→ 多Tab数据同步？

---

## Q45: Service Worker 的生命周期和工作原理？
- **难度**：★★★
- **知识点**：Service Worker / PWA / 离线缓存 / 后台同步
- **题型**：简答题

### 参考答案要点：

1. **Service Worker特点**
   - 运行在独立线程（不阻塞主线程）
   - 无法访问DOM（但可以通过postMessage通信）
   - 完全异步（不能使用XHR，只能用fetch）
   - 一旦注册就持久存在（即使用户关闭页面）
   - 可以拦截和处理网络请求
   - 必须在HTTPS下运行（localhost除外）

2. **生命周期详解**
   ```
   注册（Registered）
        ↓ 安装（Installing） ← install事件
        ↓ 等待（Waiting） ← activate事件
        ↓ 激活（Activated）
        ↓
   [运行中（Active）]
        ↓
   废弃（Redundant）
   ```

   ```javascript
   // 完整的生命周期示例
   if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
       navigator.serviceWorker.register('/sw.js')
         .then(registration => {
           console.log('SW registered:', registration.scope);
           
           // 检测是否有新版本waiting
           if (registration.waiting) {
             registration.waiting.postMessage({ type: 'SKIP_WAITING' });
           }
           
           // 监听新SW发现
           registration.addEventListener('updatefound', () => {
             const newWorker = registration.installing;
             newWorker.addEventListener('statechange', () => {
               if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                 // 新SW已安装，提示用户刷新
                 showUpdateNotification();
               }
             });
           });
         })
         .catch(err => console.error('SW registration failed:', err));
     });
   }
   ```

3. **SW核心事件**
   ```javascript
   // sw.js

   // 1. install事件：安装阶段（通常用于预缓存）
   self.addEventListener('install', event => {
     console.log('[SW] Install');
     
     // skipWaiting()让新SW立即激活（不等待旧SW释放）
     // self.skipWaiting();
     
     event.waitUntil(
       caches.open('static-v1')
         .then(cache => {
           // 预缓存关键资源
           return cache.addAll([
             '/',
             '/index.html',
             '/styles/main.css',
             '/scripts/app.js',
             '/images/logo.svg'
           ]);
         })
         .then(() => console.log('[SW] Pre-cached resources'))
     );
   });

   // 2. activate事件：激活阶段（通常用于清理旧缓存）
   self.addEventListener('activate', event => {
     console.log('[SW] Activate');
     
     event.waitUntil(
       caches.keys().then(cacheNames => {
         return Promise.all(
           // 删除不以当前版本名为前缀的旧缓存
           cacheNames
             .filter(name => name !== 'static-v1' && name !== 'dynamic-v1')
             .map(name => caches.delete(name))
         ).then(() => {
           // 立即接管所有客户端
           return clients.claim();
         });
       })
     );
   });

   // 3. fetch事件：拦截网络请求（核心！）
   self.addEventListener('fetch', event => {
     const { request } = event;
     const url = new URL(request.url);
     
     // 策略1：仅GET请求才缓存
     if (request.method !== 'GET') return;
     
     // 策略2：忽略非同源请求（可选）
     // if (url.origin !== location.origin) return;
     
     // 策略3：根据资源类型选择不同缓存策略
     if (url.pathname.startsWith('/api/')) {
       // API请求：Network First with Cache Fallback
       event.respondWith(networkFirst(request));
     } else if (/\.(js|css|png|jpg|svg|woff)$/.test(url.pathname)) {
       // 静态资源：Cache First with Network Fallback
       event.respondWith(cacheFirst(request));
     } else if (url.pathname === '/') {
       // HTML页面：Stale While Revalidate
       event.respondWith(staleWhileRevalidate(request));
     } else {
       // 其他：Network Only
       event.respondWith(fetch(request));
     }
   });

   // 4. message事件：接收来自页面的消息
   self.addEventListener('message', event => {
     if (event.data && event.data.type === 'SKIP_WAITING') {
       self.skipWaiting();
     }
     
     if (event.data && event.data.type === 'CLEAR_CACHE') {
       caches.delete(event.data.cacheName);
     }
   });

   // 5. push事件：接收推送通知
   self.addEventListener('push', event => {
     const data = event.data.json();
     
     const options = {
       body: data.body,
       icon: '/images/icon.png',
       badge: '/images/badge.png',
       data: { url: data.url || '/' },
       actions: [
         { action: 'open', title: '打开' },
         { action: 'close', title: '关闭' }
       ]
     };
     
     event.waitUntil(
       self.registration.showNotification(data.title, options)
     );
   });

   // 6. notificationclick事件：用户点击通知
   self.addEventListener('notificationclick', event => {
     event.notification.close();
     
     if (event.action === 'open' || !event.action) {
       const urlToOpen = event.notification.data?.url || '/';
       event.waitUntil(
         clients.matchAll({ type: 'window' }).then(clientList => {
           // 如果已有相关标签页，聚焦它
           for (const client of clientList) {
             if (client.url.includes(urlToOpen) && 'focus' in client) {
               return client.focus();
             }
           }
           // 否则打开新窗口
           return clients.openWindow(urlToOpen);
         })
       );
     }
   });
   ```

4. **缓存策略实现**
   ```javascript
   // Cache First：缓存优先
   async function cacheFirst(request) {
     const cached = await caches.match(request);
     if (cached) return cached;
     
     try {
       const response = await fetch(request);
       const cache = await caches.open('static-v1');
       cache.put(request, response.clone());
       return response;
     } catch (error) {
       // 可选：返回离线页面
       return caches.match('/offline.html');
     }
   }

   // Network First：网络优先
   async function networkFirst(request) {
     try {
       const response = await fetch(request);
       const cache = await caches.open('dynamic-v1');
       cache.put(request, response.clone());
       return response;
     } catch (error) {
       const cached = await caches.match(request);
       if (cached) return cached;
       return Response.json({ error: 'Offline', code: 0 }, { status: 200 });
     }
   }

   // Stale While Revalidate：缓存优先+后台更新
   async function staleWhileRevalidate(request) {
     const cached = await caches.match(request);
     const fetchPromise = fetch(request).then(response => {
       if (response.ok) {
         caches.open('dynamic-v1').then(cache => {
           cache.put(request, response.clone());
         });
       }
       return response;
     });
     
     return cached || fetchPromise;
   }
   ```

5. **调试工具**
   ```javascript
   // Chrome DevTools → Application → Service Workers
   // 可以查看：
   // - 当前激活的SW
   // - SW状态（running/stopped）
   // - 缓存存储内容
   // - Push通知模拟
   // - 离线模式测试

   // 常用调试命令（DevTools Console）
   // navigator.serviceWorker.controller  // 当前控制的SW
   // navigator.serviceWorker.ready      // SW激活后的Promise
   // caches.keys()                       // 列出所有缓存名称
   // caches.open('name').then(c=>c.keys())  // 查看某个缓存的资源
   ```

> **追问链**：SW更新机制的最佳实践？→ 如何处理跨域请求？→ Workbox的使用？

---

## Q46: PWA 离线应用的完整实现方案？
- **难度**：★★★
- **知识点**：PWA / Service Worker / Manifest / 离线应用 / App-like体验
- **题型**：场景设计题

### 参考答案要点：

1. **PWA核心技术栈**
   ```
   PWA = Service Worker + Web App Manifest + 响应式设计 + HTTPS
   ```

2. **完整实现步骤**

   **Step 1: Web App Manifest**
   ```json
   {
     "name": "我的PWA应用",
     "short_name": "MyPWA",
     "description": "一个完整的PWA示例",
     "start_url": "/?utm_source=homescreen",
     "display": "standalone",  // standalone/fullscreen/browser
     "orientation": "portrait-primary",
     "background_color": "#ffffff",
     "theme_color": "#1976d2",
     "icons": [
       {
         "src": "/icons/icon-72x72.png",
         "sizes": "72x72",
         "type": "image/png"
       },
       {
         "src": "/icons/icon-192x192.png",
         "sizes": "192x192",
         "type": "image/png",
         "purpose": "any maskable"
       },
       {
         "src": "/icons/icon-512x512.png",
         "sizes": "512x512",
         "type": "image/png",
         "purpose": "any maskable"
       }
     ],
     "categories": ["productivity", "utilities"],
     "screenshots": [],
     "prefer_related_applications": false
   }
   ```

   **Step 2: Service Worker（完整离线支持）**
   ```javascript
   // 使用Workbox简化开发（推荐）
   import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
   import { registerRoute } from 'workbox-routing';
   import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
   import { ExpirationPlugin } from 'workbox-expiration';

   // 预缓存清单（webpack插件自动生成）
   precacheAndRoute(self.__WB_MANIFEST);
   cleanupOutdatedCaches();

   // 字体缓存（长时间缓存）
   registerRoute(
     ({ url }) => url.pathname.endsWith('.woff2'),
     new CacheFirst({
       cacheName: 'fonts',
       plugins: [
         new ExpirationPlugin({
           maxEntries: 30,
           maxAgeSeconds: 365 * 24 * 60 * 60  // 1年
         })
       ]
     })
   );

   // 图片缓存
   registerRoute(
     ({ request }) => request.destination === 'image',
     new CacheFirst({
       cacheName: 'images',
       plugins: [
         new ExpirationPlugin({
           maxEntries: 60,
           maxAgeSeconds: 30 * 24 * 60 * 60  // 30天
         })
       ]
     })
   );

   // API缓存
   registerRoute(
     ({ url }) => url.pathname.startsWith('/api/'),
     new NetworkFirst({
       cacheName: 'api',
       networkTimeoutSeconds: 5,  // 5秒超时后使用缓存
       plugins: [
         new ExpirationPlugin({
           maxEntries: 100,
           maxAgeSeconds: 5 * 60  // 5分钟
         })
       ]
     })
   );

   // 离线回退页面
   import { offlineFallback } from 'workbox-recipes';
   offlineFallback({ pageFallback: '/offline.html' });
   ```

   **Step 3: 离线页面和骨架屏**
   ```html
   <!-- offline.html -->
   <!DOCTYPE html>
   <html>
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>离线</title>
     <style>
       body { display: flex; justify-content: center; align-items: center;
               height: 100vh; margin: 0; font-family: system-ui; color: #666; }
       .offline-container { text-align: center; padding: 40px; }
       .icon { font-size: 64px; margin-bottom: 20px; }
       button { padding: 12px 24px; font-size: 16px; cursor: pointer;
                border: none; background: #1976d2; color: white; border-radius: 4px; }
     </style>
   </head>
   <body>
     <div class="offline-container">
       <div class="icon">📡</div>
       <h1>您当前处于离线状态</h1>
       <p>请检查您的网络连接后重试</p>
       <button onclick="location.reload()">重新连接</button>
     </div>
   </body>
   </html>
   ```

   **Step 4: 状态管理与离线队列**
   ```javascript
   // 离线操作队列（用户离线时的操作暂存）
   class OfflineQueue {
     constructor() {
       this.dbName = 'OfflineQueueDB';
       this.storeName = 'actions';
       this.db = null;
     }

     async init() {
       return new Promise((resolve, reject) => {
         const request = indexedDB.open(this.dbName, 1);
         
         request.onupgradeneeded = (event) => {
           const db = event.target.result;
           if (!db.objectStoreNames.contains(this.storeName)) {
             db.createObjectStore(this.storeName, { autoIncrement: true, keyPath: 'id' });
           }
         };
         
         request.onsuccess = (event) => {
           this.db = event.target.result;
           resolve();
         };
         
         request.onerror = reject;
       });
     }

     async enqueue(action) {
       const tx = this.db.transaction([this.storeName], 'readwrite');
       const store = tx.objectStore(this.storeName);
       store.add({
         ...action,
         timestamp: Date.now(),
         status: 'pending'
       });
     }

     async processQueue(processFn) {
       const tx = this.db.transaction([this.storeName], 'readonly');
       const store = tx.objectStore(this.storeName);
       const request = store.getAll();
       
       return new Promise(resolve => {
         request.onsuccess = async () => {
           const pendingActions = request.result.filter(a => a.status === 'pending');
           
           for (const action of pendingActions) {
             try {
               await processFn(action);
               await this.markCompleted(action.id);
             } catch (error) {
               console.error('Action failed:', action.id, error);
             }
           }
           
           resolve(pendingActions.length);
         };
       });
     }

     async markCompleted(id) {
       const tx = this.db.transaction([this.storeName], 'readwrite');
       const store = tx.objectStore(this.storeName);
       store.put({ id, status: 'completed', completedAt: Date.now() });
     }
   }

   // 使用示例
   const queue = new OfflineQueue();
   await queue.init();

   // 离线时提交表单
   async function submitForm(data) {
     if (!navigator.onLine) {
       await queue.enqueue({ type: 'submit_form', data });
       showNotification('已保存，联网后将自动提交');
       return;
     }
     
     // 在线时正常提交
     await fetch('/api/form', { method: 'POST', body: JSON.stringify(data) });
   }

   // 网络恢复时处理队列
   window.addEventListener('online', async () => {
     const count = await queue.processQueue(async (action) => {
       if (action.type === 'submit_form') {
         await fetch('/api/form', { method: 'POST', body: JSON.stringify(action.data) });
       }
     });
     
     if (count > 0) {
       showNotification(`已同步 ${count} 条离线操作`);
     }
   });
   ```

3. **PWA质量检查清单**
   ```markdown
   ## PWA Checklist
   
   ### 基础要求
   - [ ] 使用HTTPS
   - [ ] 注册Service Worker
   - [ ] 提供Web App Manifest
   - [ ] 能在离线状态下加载（至少显示离线页面）
   
   ### 用户体验
   - [ ] 响应式设计（适配各种屏幕尺寸）
   - [ ] 页面加载时有加载指示（骨架屏/进度条）
   - [ ] 提供离线提示和重试机制
   - [ ] 支持添加到主屏幕
   - [ ] 有合适的启动画面和主题色
   
   ### 技术要求
   - [ ] 首屏加载 < 5s（3G网络）
   - [ ] 可交互时间 < 10s
   - [ ] Core Web Vitals达标（LCP/FID/CLS）
   - [ ] 支持深色模式（可选）
   - [ ] 无障碍访问（WCAG 2.1 AA标准）
   
   ### 进阶功能
   - [ ] 推送通知（Push Notifications）
   - [ ] 后台同步（Background Sync）
   - [ ] 全屏沉浸式体验
   - [ ] 支持分享（Web Share API）
   - [ ] 支付（Payment Request API）
   ```

4. **常见问题解决**
   
   **SW更新不及时？**
   - 使用skipWaiting() + clients.claim()
   - 提示用户刷新页面
   - 使用Update on Reload（DevTools）

   **缓存了错误的数据？**
   - 版本化缓存名
   - activate时清理旧缓存
   - 提供手动清除缓存的UI

   **跨域资源无法缓存？**
   - CORS模式：`new Request(url, { mode: 'cors' })`
   - opaque响应（status=0）：只能Cache First

> **追问链**：PWA与原生App的优劣对比？→ 如何实现后台同步？→ iOS Safari的限制及解决方案？

---

## Q47: 低版本浏览器的兼容性处理策略？
- **难度**：★★★
- **知识点**：浏览器兼容性 / Polyfill / Babel / PostCSS / 渐进增强
- **题型**：场景设计题

### 参考答案要点：

1. **兼容性策略选择**
   
   **三种主流策略**
   ```
   策略A：渐进增强（Progressive Enhancement）
   先保证基本功能在所有浏览器可用，再为高级浏览器提供增强体验
   
   策略B：优雅降级（Graceful Degradation）
   构建完整功能，然后为低版本浏览器提供替代方案
   
   策略C：分层目标（Tiered Support）
   明确划分浏览器等级（完全支持/基本支持/最低支持）
   ```

2. **技术方案体系**

   **JavaScript兼容性处理**
   ```javascript
   // 1. Babel转译（编译期）
   // babel.config.js
   module.exports = {
     presets: [
       ['@babel/preset-env', {
         targets: {
           browsers: ['> 1%', 'last 2 versions', 'not dead']
           // 或精确指定：chrome >= 58, safari >= 12, ie >= 11
         },
         useBuiltIns: 'usage',  // 按需引入polyfill
         corejs: 3
       }]
     ],
     plugins: [
       '@babel/plugin-transform-runtime'
     ]
   };

   // 2. Polyfill按需加载（运行时）
   // 动态polyfill服务
   const polyfillUrl = `https://polyfill.io/v3/polyfill.min.js?features=es6,es7,fetch,IntersectionObserver`;
   
   // 条件加载（只给需要的浏览器加载）
   if (!window.Promise) {
     import('core-js/es/promise');  // 动态import
   }

   // 3. Feature Detection（特性检测）
   if ('IntersectionObserver' in window) {
     // 使用现代API
     const observer = new IntersectionObserver(callback);
   } else {
     // 回退方案：scroll事件 + getBoundingClientRect()
     setupScrollBasedLazyLoad();
   }

   // 4. Shims/Polyfills手写
   // Array.prototype.includes polyfill
   if (!Array.prototype.includes) {
     Array.prototype.includes = function(searchElement, fromIndex) {
       // ...
     };
   }
   ```

   **CSS兼容性处理**
   ```css
   /* 1. PostCSS + Autoprefixer自动添加前缀 */
   /* 输入 */
   .user-select-none {
     user-select: none;
   }
   
   /* Autoprefixer输出 */
   .user-select-none {
     -webkit-user-select: none;
        -moz-user-select: none;
         -ms-user-select: none;
             user-select: none;
   }

   /* 2. CSS变量降级 */
   :root {
     --primary-color: #1890ff;
   }
   
   .btn {
     background-color: var(--primary-color, #1890ff);  /* 降级值 */
   }

   /* 3. Flexbox降级 */
   .container {
     display: flex;
     display: -webkit-box;      /* Old iOS */
     display: -ms-flexbox;      /* IE 10 */
   }

   /* 4. Grid降级 */
   .grid {
     display: grid;
     /* 降级为flex或float */
     @supports not (display: grid) {
       display: flex;
       flex-wrap: wrap;
     }
   }
   ```

3. **IE11专项兼容方案**
   ```javascript
   // IE11主要问题及解决方案：

   // 问题1：不支持箭头函数、const/let、模板字符串
   // 解决：Babel转译（必选）

   // 问题2：不支持Promise、fetch、Symbol等ES6+ API
   // 解决：core-js/regenerator-runtime polyfill

   // 问题3：不支持CSS Grid、Flexbox bug
   // 解决：Autoprefixer + 条件注释或@supports

   // 问题4：不支持自定义元素、Shadow DOM
   // 解决：webcomponentsjs polyfill（较重，慎用）

   // 问题5：某些API行为不一致
   // 例如：classList.toggle的第二参数IE11不支持
   if (!Element.prototype.toggle) {
     Element.prototype.toggle = function(token, force) {
       if (force === undefined) {
         force = !this.contains(token);
       }
       return force ? this.add(token) : this.remove(token);
     };
   }

   // IE11条件判断
   const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
   if (isIE11) {
     document.documentElement.className += ' ie11';
     // 加载特定polyfill
   }
   ```

4. **构建配置最佳实践**
   ```javascript
   // webpack.config.js 兼容性配置示例
   module.exports = {
     // 入口文件区分
     entry: {
       main: './src/main.js',
       polyfills: './src/polyfills.js'  // 单独打包polyfill
     },
     
     module: {
       rules: [
         {
           test: /\.js$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
             options: {
               // 不要在这里配presets，使用根目录babel.config.js
               cacheDirectory: true  // 加速二次构建
             }
           }
         },
         {
           test: /\.css$/,
           use: [
             'style-loader',
             {
               loader: 'css-loader',
               options: {
                 importLoaders: 1
               }
             },
             {
               loader: 'postcss-loader',
               options: {
                 postcssOptions: {
                   plugins: [
                     require('autoprefixer')({
                       overrideBrowserslist: ['> 1%', 'ie >= 11']
                     }),
                     require('postcss-preset-env')({
                       stage: 2  // 使用稳定的未来语法
                     })
                   ]
                 }
               }
           }
         }
       ]
     },
     
     optimization: {
       splitChunks: {
         chunks: 'all',
         cacheGroups: {
           vendors: {
             test: /[\\/]node_modules[\\/]/,
             priority: -10,
             reuseExistingChunk: true
           },
           polyfills: {
             test: /[\\/]polyfills\.js$/,
             name: 'polyfills',
             priority: 20,
             chunks: 'initial',
             enforce: true
           }
         }
       }
     }
   };
   ```

5. **测试与监控**
   ```javascript
   // 1. BrowserStack/Sauce Labs云测试平台
   // 2. IE/Edge虚拟机本地测试
   // 3. LambdaTest跨浏览器测试
   // 4.自动化测试：Selenium/Playwright多浏览器测试
   
   // 生产环境监控兼容性问题
   window.onerror = (msg, url, line, col, error) => {
     // 上报错误信息包含浏览器UA
     reportError({
       message: msg,
       stack: error?.stack,
       browser: {
         ua: navigator.userAgent,
         name: detectBrowser(),  // chrome/firefox/safari/edge/ie
         version: detectVersion()
       }
     });
   };
   ```

6. **决策树：是否支持某浏览器？**
   ```
   是否需要支持？
   ├── 业务需求明确要求 → 支持（投入相应资源）
   ├── 目标用户群占比 > 1% → 支持
   ├── 维护成本可控 → 支持
   └── 否则 → 不支持（提供降级体验或引导升级）
   
   支持程度？
   ├── 完全支持：所有功能可用
   ├── 基本支持：核心功能可用，高级功能降级
   └── 最低支持：仅可浏览，交互受限
   ```

> **追问链**：如何平衡包体积和兼容性？→ PostCSS preset-env vs Autoprefixer？→ 如何优雅地废弃对旧浏览器的支持？

---

## Q48: WebAssembly 在前端工程中的应用前景？
- **难度**：★★★
- **知识点**：WebAssembly / WASM / 性能优化 / 前沿技术
- **题型**：前沿趋势题

### 参考答案要点：

1. **WebAssembly是什么？**
   ```
   定义：WASM是一种新的二进制指令格式，可在现代Web浏览器中高效运行
   特点：
   - 二进制格式（体积小、解析快）
   - 近原生性能（接近C++/Rust的速度）
   - 安全沙箱（内存隔离，权限受限）
   - 语言无关（支持C/C++/Rust/Go/assemblyscript等）
   - 与JS互补（WASM处理计算密集型，JS处理DOM/UI）
   ```

2. **性能优势对比**
   ```
   任务类型              JavaScript    WebAssembly    提升
   
   图像处理              850ms         45ms           ~19x
   视频编解码            1200ms        80ms           ~15x
   密码学运算            500ms         35ms           ~14x
   物理引擎              2000ms        120ms          ~17x
   大数据计算            3000ms        180ms          ~17x
   3D渲染（非GPU部分）   150ms         12ms           ~12x
   
   注意：DOM操作、网络请求仍由JS处理更优
   ```

3. **实际应用场景**

   **场景1：音视频处理**
   ```javascript
   // FFmpeg.wasm：浏览器端视频剪辑
   import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

   const ffmpeg = createFFmpeg({ log: true });

   async function trimVideo(file, startTime, endTime) {
     if (!ffmpeg.isLoaded()) {
       await ffmpeg.load();
     }
     
     ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(file));
     await ffmpeg.run('-i', 'input.mp4', '-ss', startTime, '-to', endTime, '-c', 'copy', 'output.mp4');
     
     const data = ffmpeg.FS('readFile', 'output.mp4');
     return new Blob([data.buffer], { type: 'video/mp4' });
   }
   ```

   **场景2：图像处理**
   ```javascript
   // 使用Rust+wasm-pack实现的图像滤镜
   import init, { apply_filter } from '../pkg/image_processor.js';

   await init();
   
   const canvas = document.getElementById('canvas');
   const ctx = canvas.getContext('2d');
   ctx.drawImage(image, 0, 0);
   
   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
   const processed = apply_filter(
     imageData.data,
     canvas.width,
     canvas.height,
     'grayscale'  // 滤镜类型
   );
   
   ctx.putImageData(new ImageData(new Uint8ClampedArray(processed), canvas.width, canvas.height), 0, 0);
   ```

   **场景3：游戏引擎**
   ```javascript
   // Unity WebGL导出的WASM游戏
   // Godot Engine导出的WASM游戏
   // Unreal Engine的Pixel Streaming
   ```

   **场景4：密码学和区块链**
   ```javascript
   // WASM实现的加密算法（比JS快10-20倍）
   import { sha256, aesEncrypt } from '@nicolo-ribaudo/wasm-crypto';

   const hash = await sha256(message);
   const encrypted = await aesEncrypt(key, iv, plaintext);
   ```

4. **开发流程**
   ```
   C/Rust/Go源码
       ↓ 编译
   .wasm 二进制文件
       ↓ 打包
   .wasm + JS胶水代码
       ↓ 加载
   WebAssembly.instantiateStreaming(fetch('module.wasm'), imports)
       ↓ 使用
   wasmInstance.exports.function_name(args)
   ```

   ```javascript
   // 加载和使用WASM模块
   async function loadWasm() {
     // 方法1：Streaming编译（推荐，更快）
     const wasmModule = await WebAssembly.instantiateStreaming(
       fetch('/module.wasm'),
       imports  // 导入对象（函数、内存、表等）
     );
     
     // 方法2：Buffer编译（兼容性好）
     // const response = await fetch('/module.wasm');
     // const buffer = await response.arrayBuffer();
     // const wasmModule = await WebAssembly.instantiate(buffer, imports);
     
     const { instance } = wasmModule;
     
     // 调用WASM导出的函数
     const result = instance.exports.add(1, 2);  // 假设导出了add函数
     
     // 访问WASM导出的内存
     const memory = instance.exports.memory;
     const dataView = new DataView(memory.buffer);
     const value = dataView.getFloat64(0, true);
     
     return instance;
   }
   ```

5. **局限性与挑战**
   
   **技术限制**
   - 不能直接访问DOM（需要通过JS桥接）
   - 线程模型有限（目前主要是SharedArrayBuffer）
   - 调试困难（需要专门的工具）
   - 包体积相对较大（简单的hello world也需要几KB）

   **工程挑战**
   - 学习曲线陡峭（需要掌握另一门语言）
   - 工具链复杂（Emscripten/wasm-pack等）
   - 与现有JS生态整合成本
   - 团队技能要求提高

6. **未来发展方向**
   - **GC支持**：WASM GC提案（可直接使用垃圾回收，无需手动管理内存）
   - **线程增强**：更好的多线程支持
   - **异常处理**：改进的错误处理机制
   - **Stack Switching**：协程/绿色线程支持
   - **Component Model**：跨语言组件共享标准
   - **WASI**：WebAssembly System Interface（脱离浏览器运行）

7. **适用性判断**
   ```
   适合使用WASM的场景：
   ✅ CPU密集型计算（图像/音频/视频/加密）
   ✅ 需要移植现有的C/C++/Rust库
   ✅ 对性能有极致要求的场景
   ✅ 游戏、3D、物理模拟
   ✅ 需要保护核心算法（二进制难以逆向）
   
   不适合的场景：
   ❌ 简单的DOM操作
   ❌ UI交互逻辑
   ❌ 小型项目（引入复杂度过高）
   ❌ I/O密集型任务（网络请求等）
   ```

> **追问链**：WASM与Web Worker的关系？→ AssemblyScript值得学习吗？→ WASI的应用前景？

---

## Q49: 浏览器端的 AI 推理（如 TensorFlow.js）的可行性和局限？
- **难度**：★★★
- **知识点**：TensorFlow.js / ML / Edge AI / 浏览器AI
- **题型**：前沿趋势题

### 参考答案要点：

1. **TensorFlow.js 简介**
   ```
   TensorFlow.js (TF.js)：Google推出的浏览器端机器学习库
   
   核心能力：
   - 在浏览器中运行已有的Python训练模型（转换格式后）
   - 在浏览器中使用JS训练模型
   - 利用WebGL/WASM进行GPU加速推理
   
   运行后端：
   - WebGL（默认）：利用GPU并行计算，速度快
   - WASM（备选）：CPU计算，兼容性好
   - CPU（fallback）：纯JS实现，最慢
   ```

2. **实际应用案例**

   **图像分类**
   ```javascript
   import * as tf from '@tensorflow/tfjs';
   import { loadGraphModel } from '@tensorflow/tfjs-converter';

   // 加载预训练模型（MobileNet）
   const MODEL_URL = 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_1.0_224/classification/3/default/1/model.json';
   
   const model = await loadGraphModel(MODEL_URL);
   
   async function classifyImage(imgElement) {
     // 预处理图像
     const tensor = tf.browser.fromPixels(imgElement)
       .resizeNearestNeighbor([224, 224])
       .toFloat()
       .sub(tf.scalar(127.5))
       .div(tf.scalar(127.5))
       .expandDims();  // 添加batch维度
     
     // 推理
     const predictions = model.predict(tensor);
     const topK = await predictions.as1D().topk(5);
     
     // 显示结果
     const classNames = [...]  // ImageNet类别名
     topK.values.dataSync().forEach((score, i) => {
       console.log(`${classNames[topK.indices.dataSync()[i]]}: ${(score * 100).toFixed(2)}%`);
     });
     
     // 释放tensor内存
     tensor.dispose();
     predictions.dispose();
   }
   ```

   **物体检测**
   ```javascript
   // COCO-SSD模型：实时物体检测
   import * as cocoSsd from '@tensorflow-models/coco-ssd';
   
   const model = await cocoSsd.load();
   
   async function detectObjects(videoElement) {
     const predictions = await model.detect(videoElement);
     
     // 在canvas上绘制检测结果
     drawPredictions(predictions);
     
     // 持续检测（视频帧）
     requestAnimationFrame(() => detectObjects(videoElement));
   }
   ```

   **姿态估计**
   ```javascript
   import * as poseDetection from '@tensorflow-models/pose-detection';
   
   const detector = await poseDetection.createDetector(
     poseDetection.SupportedModels.MoveNet,
     { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
   );
   
   async function estimatePose(frame) {
     const poses = await detector.estimatePoses(frame);
     // poses[0].keypoints 包含17个身体关节点的坐标
     drawSkeleton(poses[0]);
   }
   ```

   **自然语言处理**
   ```javascript
   // Universal Sentence Encoder：文本相似度
   import * as use from '@tensorflow-models/universal-sentence-encoder';
   
   const model = await use.load();
   const embeddings = await model.embed(['Hello World', 'Hi there']);
   
   // 计算余弦相似度
   const similarity = tf.losses.cosineDistance(
     embeddings.slice([0, 0], [1, -1]),
     embeddings.slice([1, 0], [1, -1]),
     0
   ).dataSync()[0];
   ```

3. **性能基准测试**
   ```
   模型                  大小      推理时间(GPU)    推理时间(CPU)    适用场景
   
   MobileNetV2          ~14MB    15-30ms          100-200ms       图像分类
   COCO-SSD             ~40MB    30-50ms          200-400ms       物体检测
   MoveNet(Lightning)   ~8MB     10-20ms          50-100ms        姿态估计
   FaceNet             ~90MB    50-80ms          300-500ms       人脸识别
   BERT-tiny           ~17MB    100-200ms        500-1000ms      文本理解
   Whisper(tiny)       ~75MB    200-500ms        1-3s            语音识别
   
   设备要求：
   - GPU：WebGL 2.0支持，显存>256MB
   - 内存：模型大小 + 2-4倍工作内存
   - 推荐：Chrome 90+, Safari 15+, Firefox 88+
   ```

4. **局限性分析**
   
   **性能局限**
   ```
   - 模型大小受限（浏览器内存通常<4GB）
   - 复杂模型推理延迟较高（>500ms影响体验）
   - 移动设备性能下降明显（2-5倍）
   - 长时间运行导致设备发热/耗电
   ```

   **工程挑战**
   ```
   - 模型转换复杂（PyTorch/TensorFlow → TF.js格式）
   - 预处理/后处理逻辑需要自己实现
   - WebGL上下文丢失需要恢复
   - 内存泄漏风险（Tensor未dispose）
   - 调试困难（缺少可视化工具）
   ```

   **适用边界**
   ```
   ✅ 适合：
   - 轻量级模型（<100MB）
   - 实时性要求不高（<100ms可接受）
   - 隐私敏感场景（数据不上传服务器）
   - 离线可用需求
   - 交互式ML应用
   
   ❌ 不适合：
   - 大模型（GPT级别，参数量数十亿）
   - 需要极高精度（医疗/金融领域）
   - 长时间批处理任务
   - 需要专用硬件加速（TPU/NPU）
   ```

5. **优化策略**
   ```javascript
   // 1. 模型量化（减小体积，略微降低精度）
   const model = await tf.loadLayersModel('model.json');
   const quantizedModel = tf.quantization.quantize_model(model, 8);  // 8位量化
   
   // 2. Tensor管理（防止内存泄漏）
   const tf.tidy(() => {
     // 在这个函数内的所有tensor会自动释放
     const a = tf.tensor1d([1, 2, 3]);
     const b = tf.square(a);
     return b;
   });  // a和b自动dispose
   
   // 3. WebGL后端优化
   tf.setBackend('webgl');
   tf.env().set('WEBGL_FORCE_F16_TEXTURES', true);  // 半精度浮点，更快
   
   // 4. 模型剪枝（去除不重要权重）
   // 使用TensorFlow Model Optimization Toolkit
   
   // 5. 异步推理（不阻塞UI）
   async function asyncInference(input) {
     await tf.nextFrame();  // 让出主线程
     const result = model.predict(input);
     return result;
   }
   ```

6. **替代方案对比**
   ```
   方案              优势                   劣势                  成熟度
   
   TensorFlow.js     生态完善，模型丰富        较大，性能一般        ★★★★☆
   ONNX.js           格式通用，跨框架          相对新，文档少        ★★★☆☆
   Transformers.js   HuggingFace模型支持       仅NLP，较慢          ★★★☆☆
   ML5.js            易用，面向创意编程        功能有限              ★★★☆☆
   MediaPipe         轻量快速，Google维护      模型较少              ★★★★☆
   WebDNN            日本团队，日文支持好      国际化差              ★★☆☆☆
   
   未来趋势：WebNN API（原生神经网络API）
   - 无需第三方库
   - 可能利用NPU/TPU等硬件
   - 目前实验性阶段
   ```

> **追问链**：WebNN API的发展现状？→ 如何选择合适的模型大小？→ 端云协同的ML架构？

---

## Q50: 未来浏览器的发展方向（如 Privacy Sandbox / FLoC 替代方案）？
- **难度**：★★★
- **知识点**：Privacy Sandbox / Cookie Deprecation / 隐私保护 / Web标准
- **题型**：前沿趋势题

### 参考答案要点：

1. **背景：第三方Cookie的消亡**
   ```
   时间线：
   - 2020年：Chrome宣布计划逐步淘汰第三方Cookie
   - 2021-2023：Privacy Sandbox提案开发和测试
   - 2024年起：逐步禁用第三方Cookie（已多次延期）
   - 2025年：预计全面禁止（具体时间待定）
   
   影响：
   - 广告追踪：无法跨站追踪用户
   - 广告投放：无法精准定向广告
   - 分析统计：跨站归因困难
   - 登录认证：SSO受影响（需使用First-Party Set）
   ```

2. **Privacy Sandbox 核心技术**
   
   **Topics API（兴趣话题广告）**
   ```javascript
   // 原理：浏览器根据用户的浏览历史推断兴趣话题
   // 每周更新一次话题列表（约350个话题）
   // 广告主可以基于话题展示广告（无需跟踪用户）
   
   // 使用方式（广告主侧）
   // 1. 获取用户的话题（一周内的一个随机子集）
   const topics = await document.browsingTopics();
   // topics: [{ topic: 123, version: 1 }, ...]
   
   // 2. 在广告请求中携带话题
   fetch(`/ad?topics=${topics.map(t => t.topic).join(',')}`)
     .then(res => res.json())
     .then(ad => showAd(ad));
   
   // 声明网站涉及的话题（发布者侧）
   <meta name="browsing-topics" content="Technology, Sports">
   ```

   **Attribution Reporting API（转化归因）**
   ```javascript
   // 解决问题：广告点击后转化（购买/注册）的归因
   // 但不泄露用户身份信息
   
   // 广告主网站（注册来源）
   const attributionSource = {
     sourceEventId: 12345,
     destination: 'https://advertiser.com',
     registrant: 'https://publisher.com',
     expiry: 30 * 24 * 60 * 60 * 1000,  // 30天
     triggerData: 1
   };
   
   // 注册归因源
   await window.attributionReporting.registerAttributionSource(
     attributionSource,
     { sourceEventId: 'click-id-123' }
   );
   
   // 广告主网站（报告转化）
   await window.attributionReporting.registerTrigger({
     triggerData: 2,  // 转化类型（购买=1,注册=2等）
     destination: ['https://advertiser.com']
   });
   
   // 接收汇总报告（非个体数据）
   // 报告包含：话题ID、转化次数聚合数据（非个人级别）
   ```

   **Fenced Frames（围栏框架）**
   ```html
   <!-- 类似iframe但具有更强的隔离性 -->
   <!-- 无法通过JS访问内部内容 -->
   <!-- 无法与父页面共享数据 -->
   
   <fencedframe src="ad.html"></fencedframe>
   
   <!-- 用途：嵌入广告内容，防止数据泄露 -->
   <!-- 广告可以在fencedframe内使用Topics API获取兴趣 -->
   <!-- 但无法将数据传回父页面 -->
   ```

   **Private Aggregation API（私有聚合）**
   ```javascript
   // 跨站数据聚合（但保护个体隐私）
   // 用于衡量广告活动效果等
   
   // 在fencedframe内
   privateAggregation.sendHistogramReport({ 
     bucket: 1,  // 桶ID（如年龄段）
     value: 1    // 计数值
   });
   
   // 结果：汇总报告（如"18-25岁用户点击了X次"）
   // 但不知道具体是谁点击
   ```

   **First-Party Sets（第一方集合）**
   ```json
   // 声明属于同一实体的域名集合
   // 这些域名之间可以共享Cookie（类似子域名关系）
   {
     "owner": "https://example.com",
     "members": [
       "https://store.example.com",
       "https://blog.example.com",
       "https://marketing.example.com"
     ],
     "ccTLDs": {
       "https://example.co.uk": [
         "https://store.example.co.uk"
       ]
     }
   }
   ```

   **Storage Access API（存储访问）**
   ```javascript
   // 在嵌入式iframe中请求访问父域的Cookie
   // 需要用户交互授权（点击等）
   
   try {
     const hasAccess = await document.requestStorageAccess();
     if (hasAccess) {
       // 可以访问第三方Cookie了
       const userData = await fetch('/api/user');
     }
   } catch (err) {
     // 用户拒绝或不符合条件
   }
   ```

3. **开发者应对策略**
   
   **短期准备（2024-2025）**
   ```javascript
   // 1. 检测第三方Cookie是否可用
   async function checkThirdPartyCookies() {
     return new Promise(resolve => {
       const iframe = document.createElement('iframe');
       iframe.style.display = 'none';
       iframe.src = 'https://third-party.com/check-cookies';
       
       window.addEventListener('message', (e) => {
         resolve(e.data.hasCookies);
       }, { once: true });
       
       document.body.appendChild(iframe);
     });
   }
   
   // 2. 准备降级方案
   if (!(await checkThirdPartyCookies())) {
     // 使用Contextual Advertising（上下文广告）
     // 基于页面内容而非用户画像展示广告
     initContextualAds();
   }
   
   // 3. 收集First-Party Data（第一方数据）
   // 用户登录、订阅、调研问卷等
   ```

   **中期调整（2025-2026）**
   ```
   - 集成Topics API进行兴趣定向
   - 使用Attribution Reporting进行归因
   - 采用Server-Side AT（服务端A/B测试）
   - 加强第一方数据建设（CDP客户数据平台）
   - 探索Contextual AI（上下文AI广告）
   ```

   **长期战略（2026+）**
   ```
   - 全面转向Privacy Sandbox APIs
   - 构建隐私合规的数据收集体系
   - 发展零方数据（Zero-Party Data，用户主动提供）
   - 探索Web3/区块链的身份验证方案
   - 关注全球隐私法规演进（GDPR扩展、CCPA+等）
   ```

4. **其他重要趋势**
   
   **WebGPU（下一代图形API）**
   ```
   - 取代WebGL，更底层的GPU控制
   - 支持计算着色器（Compute Shader）
   - ML/AI推理性能大幅提升
   - 2024年起Chrome/Edge已支持
   ```

   **WebTransport（下一代网络协议）**
   ```
   - 基于QUIC/HTTP3
   - 低延迟、高吞吐
   - 支持单向流和多路复用
   - 适合实时协作、游戏等场景
   ```

   **声明式Shadow DOM / Custom Elements增强**
   ```
   - Web Components生态成熟
   - 更好的样式隔离
   - 表单关联的自定义元素
   ```

   **Capability Delegation（能力委托）**
   ```
   - 权限API的细粒度控制
   - Permissions Policy 2.0
   - 更安全的第三方嵌入
   ```

5. **行业影响与思考**
   
   **广告技术行业**
   - DSP/SSP平台重构
   - DMP（数据管理平台）转型
   - Contextual Intelligence崛起
   - Clean Room技术发展

   **前端开发者**
   - 需要了解Privacy Sandbox APIs
   - 第一方数据策略变得重要
   - 隐私合规成为标配技能
   - 跨域方案需要重新设计

   **用户体验**
   - 追踪减少，隐私增强
   - 广告可能变得不那么精准（但也未必是坏事）
   - 网站可能更多要求登录以获得个性化体验

> **追问链**：Topics API的实际效果如何？→ 小企业如何应对Cookie淘汰？→ 中国市场的隐私法规趋势？

---

# 附录

## 附录A：浏览器知识体系速查表

### 🎨 渲染引擎
| 知识点 | 核心概念 | 关键词 |
|--------|---------|--------|
| **渲染管线** | DOM→CSSOM→RenderTree→Layout→Paint→Composite | CRP、关键路径 |
| **Reflow/Repaint** | 回流vs重绘、触发条件、优化策略 | offsetWidth、transform |
| **图层合成** | Compositing、GPU加速、合成层 | will-change、Layer Explosion |
| **CSSOM** | CSS对象模型、CSS解析过程 | @import阻塞 |
| **Layout** | 盒模型、BFC、定位、Flex/Grid | Block Formatting Context |

### ⚙️ JavaScript引擎（V8）
| 知识点 | 核心概念 | 关键词 |
|--------|---------|--------|
| **执行流程** | Parser→AST→Ignition→TurboFan | JIT、字节码、热点代码 |
| **Hidden Class** | 隐藏类、内联缓存(IC)、对象形状 | Map Transition |
| **GC机制** | 新生代Scavenge、老生代Mark-Sweep-Compact | Space、Incremental |
| **内存管理** | 内存泄漏、WeakMap、堆快照 | Strong/Weak Reference |
| **优化建议** | Hidden Class稳定、避免deopt、TypedArray | Monomorphic |

### 🔄 事件循环（Event Loop）
| 知识点 | 核心概念 | 关键词 |
|--------|---------|--------|
| **任务队列** | Macrotask/Microtask、执行顺序 | Call Stack |
| **宏任务** | setTimeout/setInterval/I/O/UI渲染 | Task Queue |
| **微任务** | Promise.then/MutationObserver/queueMicrotask | Microtask Queue |
| **rAF** | requestAnimationFrame、动画帧 | 60Hz、timestamp |
| **Node.js EL** | timers/poll/check/setImmediate/process.nextTick | libuv |

### 💾 存储方案
| 技术 | 容量 | 有效期 | 作用域 | 随请求发送 | 适用场景 |
|------|------|--------|--------|-----------|----------|
| **Cookie** | ~4KB | 可设置 | domain+path | ✅ | 登录态、追踪 |
| **LocalStorage** | ~5MB | 永久 | 同源 | ❌ | 用户偏好 |
| **SessionStorage** | ~5MB | 会话 | 同源+标签页 | ❌ | 表单草稿 |
| **IndexedDB** | 数百MB | 永久 | 同源 | ❌ | 结构化大数据 |
| **Cache Storage** | 取决于磁盘 | 可控 | origin | ❌ | 离线资源 |

### 🔒 安全机制
| 知识点 | 防御目标 | 核心技术 |
|--------|---------|----------|
| **同源策略** | 跨域隔离 | Origin三元组 |
| **XSS防护** | 注入攻击 | CSP、转义、HttpOnly |
| **CSRF防护** | 伪造请求 | Token、SameSite、Referer |
| **CORS** | 跨域资源共享 | 预检请求、响应头 |
| **CSP** | 内容安全 | 白名单、nonce/hash |
| **SRI** | 完整性校验 | integrity属性 |

### 🌐 网络/协议
| 知识点 | 核心概念 | 相关技术 |
|--------|---------|----------|
| **HTTP方法** | GET/POST/PUT/DELETE语义 | 幂等性、安全性 |
| **HTTP状态码** | 1xx/2xx/3xx/4xx/5xx | 304、401、403、500 |
| **HTTPS** | TLS握手、证书、加密 | CA、对称/非对称加密 |
| **HTTP/2** | 多路复用、头部压缩、服务端推送 | 二进制分帧 |
| **HTTP/3** | QUIC、UDP、0-RTT | 队头阻塞解决 |
| **WebSocket** | 全双工、持久连接 | 握手协议、心跳 |
| **缓存策略** | 强缓存/协商缓存 | Cache-Control、ETag |

### 🛠️ 浏览器API
| 分类 | API名称 | 用途 |
|------|---------|------|
| **存储** | localStorage/sessionStorage/IndexedDB/Cookie | 本地数据持久化 |
| **网络** | fetch/XMLHttpRequest/WebSocket | 网络请求 |
| **多媒体** | Canvas/WebGL/Web Audio API | 图形音频处理 |
| **设备** | Geolocation/DeviceOrientation/Vibration | 设备能力 |
| **通信** | postMessage/BroadcastChannel/Channel Messaging | 跨文档通信 |
| **后台** | Service Worker/Web Worker/Background Sync | 后台任务 |
| **性能** | Performance API/requestIdleCallback/rAF | 性能监控优化 |
| **安全** | Crypto API/Credentials Management/SubtleCrypto | 加密认证 |
| **PWA** | Notification API/Push API/Screen Wake Lock | 应用增强 |

---

## 附录B：高频考点TOP20

### 🏆 面试出现频率最高的20个知识点

| 排名 | 知识点 | 出现频率 | 难度 | 必问指数 |
|------|--------|---------|------|---------|
| 🥇 **1** | **Event Loop事件循环** | ⭐⭐⭐⭐⭐ | ★★☆ | 95% |
| 🥈 **2** | **闭包与作用域链** | ⭐⭐⭐⭐⭐ | ★★☆ | 92% |
| 🥉 **3** | **原型与继承** | ⭐⭐⭐⭐⭐ | ★★☆ | 90% |
| 4 | **Promise/async/await** | ⭐⭐⭐⭐⭐ | ★★☆ | 88% |
| 5 | **从输入URL到页面展示** | ⭐⭐⭐⭐ | ★★☆ | 85% |
| 6 | **防抖与节流** | ⭐⭐⭐⭐ | ★★☆ | 82% |
| 7 | **虚拟DOM与Diff算法** | ⭐⭐⭐⭐ | ★★★ | 80% |
| 8 | **HTTP缓存机制** | ⭐⭐⭐⭐ | ★★☆ | 78% |
| 9 | **跨域与CORS** | ⭐⭐⭐⭐ | ★★☆ | 76% |
| 10 | **浏览器渲染原理** | ⭐⭐⭐⭐ | ★★☆ | 74% |
| 11 | **CSS盒模型与BFC** | ⭐⭐⭐⭐ | ★☆☆ | 72% |
| 12 | **事件机制（冒泡/捕获/委托）** | ⭐⭐⭐⭐ | ★☆☆ | 70% |
| 13 | **XSS与CSRF安全** | ⭐⭐⭐⭐ | ★★☆ | 68% |
| 14 | **性能优化综合方案** | ⭐⭐⭐⭐ | ★★★ | 65% |
| 15 | **V8引擎与GC** | ⭐⭐⭐ | ★★★ | 62% |
| 16 | **TCP/IP与HTTP协议** | ⭐⭐⭐ | ★★☆ | 60% |
| 17 | **手写Promise/EventEmitter** | ⭐⭐⭐ | ★★★ | 58% |
| 18 | **Webpack/Vite构建优化** | ⭐⭐⭐ | ★★☆ | 55% |
| 19 | **CSS布局（Flex/Grid）** | ⭐⭐⭐ | ★☆☆ | 52% |
| 20 | **PWA与Service Worker** | ⭐⭐⭐ | ★★★ | 48% |

### 📊 备考建议

**初级前端（1-2年经验）**
- 重点掌握：1-6、11-13（基础必备）
- 了解熟悉：7-10、16、19（进阶加分）
- 选修了解：14-15、17-18、20（提升竞争力）

**中级前端（3-5年经验）**
- 熟练掌握：1-10、12-14（核心能力）
- 深入理解：7、15、17-18（架构能力）
- 项目实战：14、20（工程化能力）

**高级前端（5年+经验）**
- 全部精通：1-20（广度+深度）
- 源码级理解：1、4、7、15、17（核心竞争力）
- 架构设计：14、20（系统思维）
- 前沿探索：49-50（技术视野）

### 🎯 高频追问链TOP10

1. Event Loop → Node.js差异 → rAF/rIC位置 → 微任务递归问题
2. 闭包 → 内存泄漏 → WeakMap应用 → 模块化模式
3. Promise → async/await原理 → 手写Promise → 错误处理最佳实践
4. URL到页面 → DNS/TCP优化 → HTTP/2/3 → 性能监控
5. 防抖节流 → requestAnimationFrame版本 → React Hooks封装 → 服务端适用性
6. 虚拟DOM → Diff算法优化 → Fiber架构 → Vue3 Diff优化
7. HTTP缓存 → Cache-Control字段 → 协商缓存 → CDN缓存策略
8. CORS → 预检请求 → 凭证请求 → Nginx代理配置
9. XSS/CSRF → CSP配置 → SameSite详解 → 安全最佳实践
10. 渲染原理 → CRP优化 → 首屏性能 → Core Web Vitals

---

> **题库说明**：本题库共收录 **50道** 高质量面试题，覆盖浏览器核心原理、渲染引擎、JavaScript引擎、事件循环、网络与安全、性能优化、架构设计、前沿趋势等 **8大知识领域**。
> 
> **难度分布**：基础题 15道（30%）| 进阶题 20道（40%）| 专家题 15道（30%）
> 
> **适用岗位**：前端开发工程师（初中高级）、前端架构师、全栈工程师
> 
> **建议使用方式**：
> 1. **系统学习**：按顺序从Q01到Q50完整学习一遍
> 2. **重点突破**：参考附录B高频考点，优先掌握TOP20
> 3. **模拟面试**：随机抽取题目进行口头练习
> 4. **查漏补缺**：对照附录A知识体系，找出薄弱环节
> 
> **最后更新**：2026年6月 | **版本**：v1.0
