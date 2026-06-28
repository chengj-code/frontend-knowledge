---
---
# 性能优化 面试题库（2025-2026 企业实战版）

> 本题库包含 **50 道**精选面试题目，覆盖前端性能优化的核心知识领域，按难度分为基础（★☆☆）、进阶（★★☆）、专家（★★★）三个等级。

---

## ★☆☆ 基础题（Q01-Q15）— 概念记忆、基础认知

---

## Q01: 什么是前端性能优化？为什么要做性能优化？
- **难度**：★☆☆
- **知识点**：性能优化概述 / 性能指标
- **题型**：简答题

### 参考答案要点：

1. **定义与核心目标**：前端性能优化是指通过技术手段**提升网页加载速度、运行流畅度和用户交互响应速度**的过程。其本质是在有限的网络、设备资源下，让用户更快地看到内容、更顺畅地操作页面。
   ```javascript
   // 性能优化的三大维度
   // 1. 加载性能：页面从开始加载到可交互的时间
   // 2. 运行性能：页面运行时的渲染效率、内存占用等
   // 3. 感知性能：用户主观感受到的快慢程度
   ```
2. **为什么要做性能优化**：
   - **用户体验角度**：Google 研究表明，**页面加载时间每增加1秒，转化率下降7%**；超过3秒的加载时间会导致53%的用户流失
   - **商业价值角度**：Amazon 发现页面加载时间减少100ms，收入增加1%；淘宝/京东等电商平台的性能直接影响GMV
   - **SEO 角度**：Google 将 Core Web Vitals 作为搜索排名因素，**性能好的网站排名更高**
   - **资源成本角度**：优化后可以降低服务器带宽成本、CDN费用，提升服务器承载能力

> 💡 **追问链预留位置**

---

## Q02: Core Web Vitals 包含哪些指标？各自含义是什么？
- **难度**：★☆☆
- **知识点**：Core Web Vitals / 性能指标 / Lighthouse
- **题型**：简答题

### 参考答案要点：

1. **Core Web Vitals 三大核心指标**：
   - **LCP（Largest Contentful Paint，最大内容绘制）**：衡量**加载性能**，记录视口内最大内容元素（图片、文本块等）的渲染时间。**良好阈值 ≤ 2.5s**
   - **INP（Interaction to Next Paint，交互到下次绘制的延迟）**：衡量**交互响应性**，记录用户操作（点击、按键等）到浏览器下一次绘制的延迟。**良好阈值 ≤ 200ms**
   - **CLS（Cumulative Layout Shift，累积布局偏移）**：衡量**视觉稳定性**，计算页面生命周期内所有意外布局偏移的分数。**良好阈值 ≤ 0.1**

2. **各指标的测量方式**：
   ```javascript
   // 使用 Performance Observer 监听 LCP
   const lcpObserver = new PerformanceObserver((list) => {
     const entries = list.getEntries();
     const lastEntry = entries[entries.length - 1];
     console.log('LCP:', lastEntry.startTime);
   });
   lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
   
   // CLS 计算（简化版）
   let clsValue = 0;
   const clsObserver = new PerformanceObserver((list) => {
     for (const entry of list.getEntries()) {
       if (!entry.hadRecentInput) {
         clsValue += entry.value; // layoutShift值累加
       }
     }
     console.log('CLS:', clsValue);
   });
   clsObserver.observe({ type: 'layout-shift', buffered: true });
   ```

3. **历史演进**：2024年 Google 将 FID（First Input Delay）升级为 **INP**，因为 INP 能更全面反映页面的交互响应性，而 FID 只关注首次输入。

### 🔍 追问链
1. **如何使用 web-vitals 库采集这些指标？**
   → 方向：安装 `web-vitals` 库，使用 `onLCP/onCLS/onFID/onINP` 等函数注册回调；注意 `buffered: true` 获取历史数据；SPA 路由切换时需重置指标
2. **LCP 的常见优化手段有哪些？**
   → 方向：优化关键资源加载（preload 关键字体/图片）、CDN 加速、服务端渲染、压缩/格式转换（WebP/AVIF）、避免 JS 阻塞渲染、使用 `<link rel=preload>` 预加载 LCP 元素
3. **INP 差的可能原因和排查思路？**
   → 方向：主线程被长任务阻塞（Long Task API 检测）、复杂的事件处理逻辑、第三方脚本占用主线程、大量 DOM 操作；排查工具：Performance 面板、Chrome DevTools Performance Tab

---

## Q03: FCP 和 LCP 有什么区别？
- **难度**：★☆☆
- **知识点**：FCP / LCP / 加载性能指标
- **题型**：简答题

### 参考答案要点：

1. **基本概念区别**：
   | 维度 | FCP（First Contentful Paint） | LCP（Largest Contentful Paint） |
   |------|------|------|
   | **含义** | 页面首次绘制任何内容的时间 | 页面绘制最大内容元素的时间 |
   | **触发条件** | 第一个 DOM 元素被渲染（文本、图片、canvas等） | 视口内最大的图片/文本块/视频等被渲染 |
   | **代表意义** | 用户感知到"页面开始加载" | 用户感知到"主要内容已加载完成" |
   | **良好阈值** | ≤ 1.8s | ≤ 2.5s |

2. **实际场景理解**：
   ```html
   <!-- 示例页面结构 -->
   <header>
     <h1>网站标题</h1>        <!-- 可能触发 FCP -->
     <nav>导航栏</nav>
   </header>
   <main>
     <img src="hero-banner.jpg" alt="主图">  <!-- 可能触发 LCP -->
     <article>文章正文...</article>
   </main>
   ```
   - **FCP 可能在 header 渲染时就触发**（时间较早）
   - **LCP 要等到主图或大段文本渲染时才触发**（时间较晚）
   - **两者差距越大，说明首屏关键资源加载越慢**

3. **优化策略差异**：
   - **优化 FCP**：减少阻塞渲染的资源、使用服务端渲染、优化关键CSS
   - **优化 LCP**：优化首屏图片（压缩、格式转换、预加载）、使用CDN、服务端渲染关键内容

> 💡 **追问链预留位置**

---

## Q04: 什么是 CLS（累积布局偏移）？如何避免？
- **难度**：★☆☆
- **知识点**：CLS / 布局稳定性 / 用户体验
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **CLS 的定义和计算公式**：
   - **CLS = 所有布局偏移分数的总和**
   - **单次偏移分数 = 影响比例 × 距离比例**
   - **影响比例**：受影响区域占视口面积的比例
   - **距离比例**：元素移动距离占视口尺寸的比例
   ```javascript
   // 示例：一个占视口50%面积的元素向下移动了10%
   // 偏移分数 = 0.5 * 0.1 = 0.05
   ```

2. **常见导致 CLS 高的场景及解决方案**：
   ```css
   /* 场景1：图片没有设置固定尺寸 */
   /* ❌ 错误做法：图片加载后会撑开容器 */
   img { width: 100%; } /* 高度由内容决定 */
   
   /* ✅ 正确做法：使用 aspect-ratio 或明确宽高 */
   img {
     width: 100%;
     aspect-ratio: 16 / 9; /* 保持宽高比 */
     object-fit: cover;
   }
   /* 或者直接设置 height */
   img {
     width: 100%;
     height: auto; /* 配合 HTML 的 width/height 属性 */
   }
   
   /* 场景2：动态插入内容导致布局变化 */
   /* ✅ 为动态内容预留空间 */
   .ad-container {
     min-height: 250px; /* 广告位预留空间 */
   }
   
   /* 场景3：字体加载导致的 FOIT/FOUT */
   /* ✅ 使用 font-display 控制字体加载行为 */
   @font-face {
     font-family: 'CustomFont';
     src: url('/fonts/custom.woff2');
     font-display: swap; /* 先显示后备字体，自定义字体加载后替换 */
     /* 其他可选值：
        - block: 短时间隐藏文本，超时后显示后备字体
        - fallback: 极短时间隐藏，然后显示后备字体
        - optional: 浏览器决定是否加载（适合不重要的装饰字体）
      */
   }
   
   /* 场景4：动画导致的布局偏移 */
   /* ✅ 使用 transform 代替 top/left/margin 等属性 */
   .element {
     /* ❌ 会触发重排，可能影响其他元素 */
     /* margin-top: 20px; */
     
     /* ✅ 使用 transform，不会影响文档流 */
     transform: translateY(20px);
   }
   ```

3. **最佳实践总结**：
   - **始终为图片和视频设置 `width` 和 `height` 属性**
   - **不要在已有内容上方插入新内容（除非响应用户操作）**
   - **使用 `transform` 做动画而非改变布局属性**
   - **为动态广告、嵌入内容预留空间**
   - **使用 `font-display: swap` 并匹配字体度量**

> 💡 **追问链预留位置**

---

## Q05: preload、prefetch、preconnect 的区别？
- **难度**：★☆☆
- **知识点**：Resource Hints / 资源预加载 / 网络优化
- **题型**：简答题

### 参考答案要点：

1. **三种 Resource Hints 的对比**：
   | 特性 | `<link rel="preload">` | `<link rel="prefetch">` | `<link rel="preconnect">` |
   |------|------|------|------|
   | **作用** | 当前导航必需的高优先级资源 | 未来导航可能需要的低优先级资源 | 提前建立 DNS/TCP/TLS 连接 |
   | **时机** | **当前页面立即需要** | **下一页面或未来可能用到** | **当前页面后续请求会用到** |
   | **优先级** | **高**（比普通请求高） | **低**（空闲时加载） | 中等 |
   | **示例** | 关键字体、首屏图片 | 下一个路由的JS包、非首屏资源 | API域名、CDN域名、字体服务器 |

2. **具体使用场景和代码示例**：
   ```html
   <!-- 1. preload：预加载当前页面关键资源 -->
   <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="preload" href="/images/hero.webp" as="image">
   <link rel="preload" href="/critical.css" as="style">
   
   <!-- ⚠️ 注意：必须指定 as 属性，否则浏览器无法正确设置优先级 -->
   <!-- ⚠️ 字体必须加 crossorigin 属性（匿名模式获取） -->
   
   <!-- 2. prefetch：预取未来可能需要的资源 -->
   <link rel="prefetch" href="/next-page.js" as="script">
   <link rel="prefetch" href="/next-page-lazy-image.jpg" as="image">
   
   <!-- 典型应用：SPA 路由切换时的代码分割 -->
   <link rel="prefetch" href="/static/js/about.[hash].js" as="script">
   
   <!-- 3. preconnect：提前建立连接 -->
   <link rel="preconnect" href="https://api.example.com">
   <link rel="preconnect" href="https://cdn.example.com" crossorigin>
   <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   
   <!-- 4. dns-prefetch（轻量版 preconnect，只做DNS解析） -->
   <link rel="dns-prefetch" href="//example.com">
   ```

3. **使用注意事项**：
   - **preload 不要滥用**：只用于真正关键的资源，过多会抢占带宽
   - **prefetch 适用于确定性高的场景**：如用户大概率会点击的下一个链接对应的资源
   - **preconnect 对跨域请求效果显著**：可以节省 1-3 次 RTT（DNS + TCP + TLS）
   - **移动端慎用 prefetch**：可能浪费用户流量

### 🔍 追问链
1. **preload 和 prefetch 在 webpack/vite 中如何配置？**
   → 方向：webpack 使用 `@vue/preload-webpack-plugin` / `@vue/prefetch-webpack-plugin`；vite 使用动态 import + webpackPrefetch: true 注释；也可以在 HTML 中手动添加 `<link>` 标签
2. **三种 resource hints 的浏览器兼容性？**
   → 方向：preconnect/dns-prefetch 兼容性最好（IE10+）；preload 需要现代浏览器（Chrome 54+）；prefetch 在 Chrome/Firefox 支持，Safari 支持有限；需配合 `<link rel="modulepreload">` 处理 ES 模块
3. **过度使用 preload 有什么副作用？**
   → 方向：抢占带宽导致其他资源加载变慢、增加服务器压力、移动端浪费流量；建议只 preload 3-5 个真正关键资源；使用 `as` 属性帮助浏览器正确设置优先级

---

## Q06: 强缓存和协商缓存的区别？
- **难度**：★☆☆
- **知识点**：HTTP 缓存 / Cache-Control / ETag / Last-Modified
- **题型**：简答题

### 参考答案要点：

1. **两种缓存机制的核心区别**：
   | 维度 | 强缓存（强制缓存） | 协商缓存（对比缓存） |
   |------|------|------|
   | **触发条件** | 未过期，直接使用本地缓存 | 过期后，向服务器验证是否可用 |
   | **状态码** | **200 (from disk cache / from memory cache)** | **304 (Not Modified)** 或 **200**（有更新） |
   | **控制字段** | Expires / Cache-Control | ETag / Last-Modified + If-None-Match / If-Modified-Since |
   | **网络请求** | **不发请求**（直接用缓存） | **发请求**（但可能返回304，无body） |
   | **适用场景** | 不常变化的静态资源 | 可能变化的动态资源 |

2. **完整缓存流程图解**：
   ```
   浏览器请求资源
       │
       ▼
   ┌─────────────────┐
   │ 本地有缓存吗？    │──否──▶ 直接向服务器请求
   └────────┬────────┘
            │是
            ▼
   ┌─────────────────────┐
   │ 强缓存是否过期？      │──未过期──▶ ✅ 200 (from cache) 直接使用
   └────────┬────────────┘
            │已过期
            ▼
   ┌─────────────────────────┐
   │ 发协商缓存请求给服务器    │
   │ 携带 If-None-Match/If-Modified-Since
   └────────┬────────────────┘
             │
             ▼
   ┌─────────────────────────────┐
   │ 服务器判断资源是否变化？      │
   └────────┬────────────────────┘
        未变化 │          │ 已变化
              ▼           ▼
         ✅ 304         ✅ 200 (新资源)
       (用旧缓存)      (更新本地缓存)
   ```

3. **HTTP 头部详解**：
   ```http
   # 强缓存相关头部
   # Expires（HTTP/1.0，绝对时间，不推荐）
   Expires: Wed, 21 Oct 2026 07:28:00 GMT
   
   # Cache-Control（HTTP/1.1，相对时间，推荐）
   Cache-Control: max-age=31536000      # 缓存1年（秒）
   Cache-Control: no-cache              # 每次都协商缓存
   Cache-control: no-store              # 完全不缓存
   Cache-Control: public                # 可被代理/CDN缓存
   Cache-Control: private               # 只有浏览器可缓存
   Cache-Control: immutable             # 资源永不改变（配合长max-age）
   
   # 协商缓存相关头部
   # Last-Modified / If-Modified-Since（基于最后修改时间）
   Last-Modified: Wed, 21 Oct 2026 07:28:00 GMT
   If-Modified-Since: Wed, 21 Oct 2026 07:28:00 GMT
   
   # ETag / If-None-Match（基于资源唯一标识，更精确）
   ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
   If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
   ```

4. **实际配置建议**：
   ```nginx
   # Nginx 配置示例
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
     # 静态资源强缓存1年（带hash的资源名不会变）
     add_header Cache-Control "public, max-age=31536000, immutable";
   }
   
   location ~* \.(html)$ {
     # HTML 文件协商缓存（可能随时更新）
     add_header Cache-Control "no-cache";
     etag on;
   }
   ```
### 🔍 追问链
1. **Cache-Control: no-cache 和 no-store 的区别？**
   → 方向：no-cache 会去服务器验证缓存是否有效（可返回 304）；no-store 完全不缓存，每次都从服务器获取；no-cache 适合需要实时性的数据（如 API 响应），no-store 适合敏感信息
2. **如何处理缓存更新问题（版本号/hash）？**
   → 方向：文件名带 hash（webpack output.filename: [contenthash]）、HTML 文件协商缓存、静态资源强缓存 + 长缓存时间（1年）、CDN 刷新/预热机制
3. **分布式场景下 ETag 的一致性问题？**
   → 方向：多台服务器生成的 ETag 可能不同（inode 不同）；解决方案：统一使用弱验证码（W/ 前缀）或自定义 ETag 生成规则（基于内容 hash 而非 inode）；CDN 场景下需配置源站 ETag 透传

---

## Q07: Cache-Control 常用指令有哪些？
- **难度**：★☆☆
- **知识点**：Cache-Control / HTTP 缓存策略
- **题型**：简答题

### 参考答案要点：

1. **Cache-Control 核心指令一览表**：
   | 指令 | 含义 | 适用场景 |
   |------|------|---------|
   | `max-age=<seconds>` | 缓存有效时长（秒） | 最常用，控制缓存时间 |
   | `no-cache` | 每次使用前必须向服务器验证 | 动态内容、敏感数据 |
   | `no-store` | 完全不缓存 | 支付页面、隐私数据 |
   | `public` | 可被中间节点（CDN/代理）缓存 | 公共静态资源 |
   | `private` | 仅终端用户可缓存 | 用户个性化内容 |
   | `immutable` | 资源永不变化（即使 max-age 过期也不验证） | 带 hash 的打包产物 |
   | `must-revalidate` | 过期后必须验证，不能用过期资源 | 重要数据一致性要求 |
   | `stale-while-revalidate=<seconds>` | 过期后的 N 秒内先用旧缓存，后台异步更新 | 允许短暂使用旧版本 |
   | `stale-if-error=<seconds>` | 服务器出错时允许使用过期缓存 | 提升容错能力 |
   | `no-transform` | 代理不得修改资源内容 | 需要原始内容的场景 |

2. **组合策略实战**：
   ```http
   # 场景1：带 hash 的静态资源（最优策略）
   Cache-Control: public, max-age=31536000, immutable
   # 说明：文件名包含内容hash，内容变则文件名变，可永久缓存
   
   # 场景2：HTML 入口文件
   Cache-Control: no-cache
   # 说明：HTML 可能引用新的带hash资源，每次都要验证
   
   # 场景3：API 响应（JSON 数据）
   Cache-Control: private, no-cache, must-revalidate
   # 说明：私有数据，每次都需要验证新鲜度
   
   # 场景4：第三方 CDN 回源策略
   Cache-Control: public, max-age=3600, s-maxage=86400
   # 说明：浏览器缓存1小时，CDN/代理可缓存24小时（s-maxage）
   
   # 场景5：SWR（Stale While Revalidate）策略
   Cache-Control: max-age=60, stale-while-revalidate=86400
   # 说明：60秒内直接用缓存，60秒~24小时内先返回旧缓存同时后台刷新
   ```

3. **s-maxage vs max-age 的区别**：
   - **max-age**：针对**浏览器/客户端**的缓存时间
   - **s-maxage**：针对**共享缓存（CDN、代理服务器）**的缓存时间
   - **当两者同时存在时，CDN 用 s-maxage，浏览器用 max-age**

> 💡 **追问链预留位置**

---

## Q08: async 和 defer 的区别？
- **难度**：★☆☆
- **知识点**：脚本加载 / 渲染阻塞 / async vs defer
- **题型**：简答题

### 参考答案要点：

1. **三种脚本加载方式的对比**：
   ```
   普通 script（无属性）：  [解析HTML] ===阻塞=== [下载JS] ===阻塞=== [执行JS] ===阻塞=== [继续解析HTML]
                         ↓ 整个HTML解析都被阻塞
   
   async：                 [解析HTML] ----并行---- [下载JS] ===阻塞=== [执行JS]
                          ↓ 下载完成后立即执行（可能在HTML解析完成前或后）
                          ↓ 不保证执行顺序！多个async脚本的执行顺序不确定
   
   defer：                 [解析HTML] ----并行---- [下载JS] ... [HTML解析完毕] → [按顺序执行所有defer脚本]
                          ↓ 下载不阻塞解析，执行在DOMContentLoaded之前
                          ↓ 保证执行顺序（按出现顺序）
   ```

2. **详细特性对比表**：
   | 特性 | `<script>` | `<script async>` | `<script defer>` |
   |------|-----------|------------------|------------------|
   | **是否阻塞 HTML 解析** | ✅ 阻塞 | ❌ 不阻塞 | ❌ 不阻塞 |
   | **下载时机** | 解析到时才开始 | **立即异步下载**（不等待） | **立即异步下载**（不等待） |
   | **执行时机** | 下载完立即执行 | **下载完后立即执行** | **DOM 解析完成后、DOMContentLoaded 前** |
   | **执行顺序** | 按出现顺序 | **不保证顺序** | **保证顺序**（按出现顺序） |
   | **适用场景** | 无（应避免使用） | 独立无依赖的脚本（统计、广告） | **依赖 DOM 或有顺序要求的脚本**（主业务逻辑） |
   | **DOMContentLoaded 影响** | 前面的脚本会推迟 DCL 触发 | 不影响 DCL（如果已解析完） | 在 DCL 前统一执行 |

3. **最佳实践建议**：
   ```html
   <!-- ✅ 推荐：现代项目的标准写法 -->
   <!-- 1. 关键的内联脚本（必须最先执行，如性能监控初始化） -->
   <script>
     // 初始化性能监控等基础功能
   </script>
   
   <!-- 2. 主业务逻辑脚本（defer，保证顺序且不阻塞） -->
   <script defer src="/app.js"></script>
   <script defer src="/vendor.js"></script>
   <script defer src="/main.js"></script>
   <!-- 即使 main.js 比 vendor.js 小先下完，也会等 vendor.js 执行完再执行 -->
   
   <!-- 3. 独立无依赖的第三方脚本（async） -->
   <script async src="https://www.google-analytics.com/analytics.js"></script>
   <script async src="/ads.js"></script>
   
   <!-- 4. ES Module（自带 defer 行为） -->
   <script type="module" src="/app-module.js"></script>
   <!-- type="module" 默认就是 defer 行为！ -->
   ```

4. **module vs defer**：
   - `<script type="module">` **默认具有 defer 行为**
   - Module 脚本**自动延迟到 DOM 解析后执行**
   - Module 脚本**也保证执行顺序**
   - **额外优势**：支持顶层 await、严格模式默认开启、作用域隔离

> 💡 **追问链预留位置**

---

## Q09: 什么是关键渲染路径（CRP）？
- **难度**：★☆☆
- **知识点**：CRP / 渲染流程 / 关键资源
- **题型**：简答题

### 参考答案要点：

1. **CRP（Critical Rendering Path）的定义**：
   **关键渲染路径是浏览器将 HTML、CSS、JavaScript 转换为屏幕上像素所经过的一系列关键步骤**。优化 CRP 就是**缩短这系列步骤的总耗时**，从而实现更快的首屏渲染。
   ```
   完整渲染路径：
   1. 处理 HTML 标记 → 构建 DOM 树
   2. 处理 CSS 标记 → 构建 CSSOM 树
   3. 合并 DOM + CSSOM → 构建渲染树（Render Tree）
   4. 计算布局（Layout/Reflow）→ 确定每个节点的几何信息
   5. 绘制（Paint）→ 将每个节点填充到像素
   6. 合成（Composite）→ 将多个图层合并显示
   ```

2. **CRP 中的关键资源和阻塞点**：
   ```
   HTML 文档
     │
     ├─► DOM 构建（遇到 <script> 时⚠️阻塞！除非 async/defer）
     │
     ├─► CSSOM 构建（<link rel="stylesheet"> ⚠️渲染阻塞！）
     │   （浏览器必须等待 CSSOM 构建完成才能开始渲染）
     │
     └─► JavaScript 执行
         ├─ 可能修改 DOM（innerHTML、createElement 等）
         └─ 可能读取 CSSOM（getComputedStyle、offsetWidth 等）
         → 因此 JS 的执行可能被 CSSOM 阻塞！
   ```

3. **CRP 优化策略**：
   ```html
   <!-- 策略1：减少关键资源的数量和大小 -->
   <!-- 内联关键CSS（Critical CSS），避免额外的CSS请求阻塞渲染 -->
   <style>
     /* 只包含首屏所需的样式（通常 < 14KB） */
     .hero { background: url(hero.jpg); min-height: 400px; }
     .nav { display: flex; /* ... */ }
   </style>
   <!-- 其余样式异步加载 -->
   <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
   <noscript><link rel="stylesheet" href="/styles.css"></noscript>
   
   <!-- 策略2：优化关键资源的加载顺序 -->
   <!-- 预连接到字体服务器 -->
   <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   
   <!-- 预加载关键字体 -->
   <link rel="preload" href="/fonts/critical-font.woff2" as="font" type="font/woff2" crossorigin>
   
   <!-- 策略3：defer 非关键 JavaScript -->
   <script defer src="/analytics.js"></script>
   <script defer src="/non-critical-feature.js"></script>
   
   <!-- 策略4：减少 DOM 节点数量 -->
   <!-- 简化 HTML 结构，避免过深的嵌套 -->
   ```

4. **关键指标与 CRP 的关系**：
   - **优化 CRP 可以显著改善 FCP、LCP、TTI（Time to Interactive）**
   - **关键路径长度 = 关键资源数量 × 往返次数 + 关键资源传输时间 + 浏览器处理时间**
   - **目标：最小化关键路径长度**

### 🔍 追问链
1. **DOM/CSSOM 构建的具体过程？**
   → 方向：HTML 解析器将字节流 → 字符 → Token（标签/属性）→ Node 节点 → DOM 树；CSS 类似但需处理 @import、@media 等规则；CSSOM 是完整解析（包括未应用的规则），而 Render Tree 只包含可见节点
2. **渲染阻塞资源有哪些？**
   → 方向：`<script>`（无 async/defer）阻塞 DOM 构建 + 可能阻塞渲染；`<link rel="stylesheet">` 阻塞渲染（FOUC 问题）；`<script>` 内部访问 `document.stylesheets` 会被 CSS 阻塞；字体文件（font-display: block）会隐藏文本
3. **如何识别和优化关键路径？**
   → 方向：Chrome DevTools Performance → Network 面板查看资源瀑布图；使用 Lighthouse 的"Opportunities"；关键路径可视化工具（Critical Path Generator）；优化手段：内联 Critical CSS、defer/async JS、preload 关键资源、减少 DOM 深度

---

## Q10: 什么是懒加载？如何实现图片懒加载？
- **难度**：★☆☆
- **知识点**：懒加载 / Intersection Observer / 图片优化
- **题型**：简答题 + 编程实践题

### 参考答案要点：

1. **懒加载（Lazy Loading）的概念**：
   **懒加载是一种延迟加载资源的策略**——不是在页面初始加载时就加载所有资源，而是**等到资源即将进入用户视口（或用户需要时）才去加载**。这样可以**大幅减少首屏请求数量和加载体积**，加快首屏渲染速度。

2. **图片懒加载的三种实现方式**：
   ```html
   <!-- 方式1：原生懒加载（最简单，现代浏览器支持） -->
   <img 
     data-src="https://example.com/large-image.jpg" 
     alt="懒加载图片"
     loading="lazy"
     decoding="async"
   >
   <!-- loading="lazy" 是 HTML 原生属性，浏览器自动处理 -->
   <!-- decoding="async" 图片解码不阻塞渲染 -->
   
   <!-- 方式2：Intersection Observer API（推荐的手动实现方式） -->
   <img 
     class="lazy-img" 
     data-src="https://example.com/large-image.jpg" 
     alt="懒加载图片"
   >
   
   <script>
   // Intersection Observer 实现
   document.addEventListener('DOMContentLoaded', () => {
     const lazyImages = document.querySelectorAll('.lazy-img');
     
     // 判断是否支持 Intersection Observer
     if ('IntersectionObserver' in window) {
       const imageObserver = new IntersectionObserver((entries, observer) => {
         entries.forEach(entry => {
           if (entry.isIntersecting) {
             const img = entry.target;
             // 将 data-src 赋值给 src，触发加载
             img.src = img.dataset.src;
             // 加载完成后移除观察，避免重复触发
             observer.unobserve(img);
             // 移除 lazy 类标记
             img.classList.remove('lazy-img');
           }
         });
       }, {
         rootMargin: '200px 0px' // 提前200px开始加载（给缓冲时间）
       });
       
       lazyImages.forEach(img => imageObserver.observe(img));
     } else {
       // 降级方案：滚动事件 + getBoundingClientRect
       let throttleTimer;
       window.addEventListener('scroll', () => {
         if (throttleTimer) return;
         throttleTimer = setTimeout(() => {
           lazyImages.forEach(img => {
             if (img.dataset.src && isInViewport(img)) {
               img.src = img.dataset.src;
               delete img.dataset.src;
             }
           });
           throttleTimer = null;
         }, 200); // 节流200ms
       });
       
       function isInViewport(el) {
         const rect = el.getBoundingClientRect();
         return (
           rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
           rect.bottom >= 0
         );
       }
     }
   });
   </script>
   
   <!-- 方式3：Vue 自定义指令（Vue 项目中常见用法） -->
   <!-- 见进阶题中的完整实现 -->
   ```

3. **懒加载的最佳实践**：
   - **使用 `loading="lazy"` 作为首选**（Chrome 77+、Firefox 75+、Safari 15.4+ 支持）
   - **配合 `decoding="async"`** 让图片解码不阻塞主线程
   - **设置合理的 `rootMargin`**（如 `200px`）提前加载，避免用户看到空白
   - **添加 loading 占位符**（骨架屏、模糊小图、渐显效果）提升体验
   - **对 SEO 重要图片谨慎使用懒加载**（如 logo、产品主图）

> 💡 **追问链预留位置**

---

## Q11: 什么是 Tree Shaking？它的原理是什么？
- **难度**：★☆☆
- **知识点**：Tree Shaking / 打包优化 / ES Module
- **题型**：简答题

### 参考答案要点：

1. **Tree Shaking 的定义**：
   **Tree Shaking（摇树优化）是一种基于 ES Module 静态分析特性的死代码消除技术**。它可以在打包时**检测出项目中未被使用的代码并将其从最终的输出文件中删除**，从而减小打包体积。

2. **工作原理**：
   ```javascript
   // utils.js
   export function usedFunction() {
     console.log('这个函数被使用了');
   }
   
   export function unusedFunction() {
     console.log('这个函数没被使用，会被 Tree Shaking 掉');
   }
   
   // main.js
   import { usedFunction } from './utils.js';
   usedFunction();
   
   // 打包结果：unusedFunction 不会被包含在最终 bundle 中！
   ```
   **原理步骤**：
   1. **标记（Mark）**：打包工具（Webpack/Rollup/Vite）分析所有模块的 import/export 关系，构建依赖图
   2. **识别导出**：找出所有 `export` 的变量、函数、类
   3. **追踪引用**：检查这些导出是否被其他模块 `import` 并实际使用
   4. **消除未使用代码**：未被引用的代码在最终输出中被剔除

3. **为什么只有 ES Module 支持 Tree Shaking？**
   ```javascript
   // ✅ ES Module（静态结构，支持 Tree Shaking）
   import { foo } from './module'; // 编译时就能确定引入了什么
   export const bar = () => {};   // 导出也是确定的
   
   // ❌ CommonJS（动态结构，不支持 Tree Shaking）
   const module = require('./module'); // 运行时才能确定
   const foo = module.foo;            // 无法静态分析
   module.exports.bar = () => {};
   ```

4. **确保 Tree Shaking 生效的条件**：
   - **使用 ES Module 语法**（`import/export`，不能用 `require`）
   - **确保打包工具的 `mode: 'production'`**（开发模式下默认关闭）
   - **避免副作用（Side Effects）**：
     ```json
     // package.json 中声明
     {
       "sideEffects": false,
       // 或者精确指定有副作用的文件
       "sideEffects": ["*.css", "./src/polyfill.js"]
     }
     ```
   - **使用支持 Tree Shaking 的库**（如 lodash-es 替代 lodash）

5. **常见的 Tree Shaking 失效场景**：
   ```javascript
   // ❌ 失效场景1：动态导入
   const lib = require('./lib'); // CommonJS 不支持
   const method = lib['method']; // 动态访问
   
   // ❌ 失效场景2：有副作用的代码
   import './polyfill'; // 全局注入 polyfill，不能被 shaking
   import './global.css'; // CSS 有副作用
   
   // ❌ 失效场景3：class 的方法调用
   import { MyClass } from './my-class';
   // 打包工具难以确定是否使用了类的所有方法
   // 解决方案：使用 babel-plugin-minify-dead-code-elimination
   
   // ✅ 有效场景：纯函数、常量
   import { PI, calculate } from './math';
   ```

### 🔍 追问链
1. **sideEffects 字段的作用？**
   → 方向：告诉打包工具哪些模块有副作用（不应被删除）；`false` 表示所有代码无副作用（可安全删除未使用的导出）；数组形式精确指定有副作用的文件；影响 Tree Shaking 的激进程度
2. **为什么 babel 的 commonjs 插件会影响 Tree Shaking？**
   → 方向：Babel 默认将 ES Module 转译为 CommonJS（`@babel/preset-env` 的 `modules: 'auto'`）；CommonJS 是动态结构无法静态分析；解决方案：设置 `modules: false` 或使用 ESM 原生支持的环境
3. **动态 import() 能被 Tree Shaking 吗？**
   → 方向：不能完全 Tree Shake（因为是运行时加载）；但可以进行代码分割（Code Splitting）；Webpack 会对动态 import 创建独立的 chunk；配合 Prefetch/Preload 可优化加载时机

---

## Q12: 什么是防抖和节流？区别是什么？
- **难度**：★☆☆
- **知识点**：防抖（Debounce）/ 节流（Throttle）/ 性能优化
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **防抖（Debounce）和节流（Throttle）的概念**：
   - **防抖**：**事件触发后等待一段时间（delay），如果在这段时间内事件再次触发，则重新计时**。只有**最后一次触发后的 delay 时间到了，才会真正执行回调函数**。
   - **节流**：**规定在一个单位时间间隔（interval）内，只能执行一次回调函数**。如果在这个单位时间内多次触发事件，**只有第一次生效**（或者最后一次，取决于实现），后续触发被忽略直到时间间隔结束。

2. **生活类比帮助理解**：
   ```
   防抖（Debounce）—— 电梯关门：
   - 有人进电梯（触发事件）→ 门准备关（开始计时）
   - 又有人进来（再次触发）→ 重新计时关门
   - 直到没人再进来（停止触发）→ delay 后门关了（执行函数）
   
   节流（Throttle）—— 地铁发车：
   - 无论多少人排队上车（频繁触发）
   - 每 5 分钟（interval）只发一班车（执行一次）
   - 中间来的人只能等下一班
   ```

3. **典型应用场景**：
   | 技术 | 适用场景 | 为什么 |
   |------|---------|--------|
   | **防抖 debounce** | 搜索框输入联想、窗口 resize 结束后操作、按钮防重复点击、表单验证 | 只要最终结果，中间过程不重要 |
   | **节流 throttle** | 滚动事件处理、鼠标移动事件、拖拽、进度条更新 | 需要持续响应，但要控制频率 |

4. **简单实现对比**：
   ```javascript
   // 防抖（Debounce）实现
   function debounce(fn, delay = 300) {
     let timer = null;
     return function(...args) {
       // 每次触发都清除上一个定时器，重新计时
       if (timer) clearTimeout(timer);
       timer = setTimeout(() => {
         fn.apply(this, args);
         timer = null;
       }, delay);
     };
   }
   
   // 节流（Throttle）实现 —— 时间戳版（首次立即执行）
   function throttle(fn, interval = 300) {
     let lastTime = 0;
     return function(...args) {
       const now = Date.now();
       if (now - lastTime >= interval) {
         fn.apply(this, args);
         lastTime = now;
       }
     };
   }
   
   // 节流（Throttle）实现 —— 定时器版（首次延迟执行）
   function throttleByTimer(fn, interval = 300) {
     let timer = null;
     return function(...args) {
       if (!timer) {
         timer = setTimeout(() => {
           fn.apply(this, args);
           timer = null;
         }, interval);
       }
     };
   }
   
   // 使用示例
   const handleSearch = debounce((keyword) => {
     console.log('搜索:', keyword); // 用户停止输入300ms后才执行
   }, 300);
   
   input.addEventListener('input', (e) => handleSearch(e.target.value));
   
   const handleScroll = throttle(() => {
     console.log('滚动位置:', window.scrollY); // 每300ms最多执行一次
   }, 300);
   window.addEventListener('scroll', handleScroll);
   ```

### 深度拓展：手写实现

#### 完整版防抖（Debounce）—— 支持 leading/trailing/cancel/flush

```typescript
/**
 * 完整版防抖函数
 * 
 * 算法思路：
 * 1. 使用闭包保存定时器引用和上次调用参数
 * 2. leading=true 时，首次触发立即执行（边缘情况：trailing=false时只执行首次）
 * 3. trailing=true 时（默认），延迟结束后执行最后一次
 * 4. cancel() 清除定时器并重置状态
 * 5. flush() 立即执行待执行的回调（如果有）
 * 
 * 时间线示例（delay=300ms, leading=false, trailing=true）：
 * ──触发──触发──触发─────────────300ms后执行
 *    ↑      ↑      ↑              ↑
 *   重置   重置   最后一次       执行
 */
interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  /** 取消防抖，清除定时器 */
  cancel(): void;
  /** 立即执行待执行的回调 */
  flush(): ReturnType<T> | undefined;
  /** 检查是否有待执行的回调 */
  pending(): boolean;
}

function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300,
  options: { leading?: boolean; trailing?: boolean } = {}
): DebouncedFunction<T> {
  // 解构配置项，设置默认值
  const { leading = false, trailing = true } = options;
  
  // 闭包变量：保存定时器、上次调用时间、是否已执行leading、待执行的参数
  let timer: ReturnType<typeof setTimeout> | null = null;  // 定时器引用
  let lastCallTime: number = 0;                             // 上次调用时间戳
  let leadingExecuted: boolean = false;                     // 是否已执行过leading模式
  let pendingArgs: Parameters<T> | null = null;             // 待执行的参数（用于flush）
  
  // 创建防抖后的函数
  const debounced = function(this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    const now = Date.now();                          // 当前时间戳
    const context = this;                            // 保存this上下文
    
    // 保存参数供flush使用
    pendingArgs = args;
    
    // 清除之前的定时器（核心：每次触发都重新计时）
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    
    // 判断是否是首次调用或距离上次调用超过delay（用于leading判断）
    const isFirstCall = !lastCallTime || (now - lastCallTime >= delay);
    
    // Leading 模式：首次触发立即执行
    if (leading && isFirstCall && !leadingExecuted) {
      fn.apply(context, args);                       // 立即执行原函数
      leadingExecuted = true;                        // 标记已执行
      lastCallTime = now;                            // 更新最后调用时间
      return;
    }
    
    // 重置leading标记（当距离上次调用超过delay时）
    if (now - lastCallTime >= delay) {
      leadingExecuted = false;
    }
    
    lastCallTime = now;                              // 更新最后调用时间
    
    // Trailing 模式：延迟结束后执行最后一次（默认开启）
    if (trailing) {
      timer = setTimeout(() => {
        // 延迟结束，执行回调
        fn.apply(context, args);                     // 使用闭包保存的context和args
        timer = null;                                // 清除定时器引用
        leadingExecuted = false;                     // 重置leading标记
        pendingArgs = null;                           // 清空待执行参数
      }, delay);
    }
    
    return undefined;
  } as DebouncedFunction<T>;
  
  // cancel 方法：取消防抖
  debounced.cancel = function() {
    if (timer !== null) {                            // 如果有定时器在运行
      clearTimeout(timer);                           // 清除定时器
      timer = null;                                  // 重置引用
    }
    leadingExecuted = false;                         // 重置leading标记
    pendingArgs = null;                               // 清空待执行参数
  };
  
  // flush 方法：立即执行待执行的回调
  debounced.flush = function(): ReturnType<T | undefined> {
    if (timer !== null && pendingArgs !== null) {     // 如果有待执行的回调
      clearTimeout(timer);                            // 先清除定时器
      timer = null;
      const result = fn.apply(this, pendingArgs);     // 立即执行
      pendingArgs = null;                              // 清空参数
      leadingExecuted = false;                         // 重置标记
      return result;
    }
    return undefined;
  };
  
  // pending 方法：检查是否有待执行的回调
  debounced.pending = function(): boolean {
    return timer !== null;                            // 有定时器说明有pending的调用
  };
  
  return debounced;
}
```

#### 完整版节流（Throttle）—— 支持 trailing/cancel

```typescript
/**
 * 完整版节流函数
 * 
 * 算法思路：
 * 1. 使用时间戳 + 定时器混合模式，保证首次和末次都能执行
 * 2. 首次触发立即执行（类似leading）
 * 3. 最后一次触发如果在冷却期，会在冷却期结束后补充执行（trailing）
 * 4. cancel() 可取消末次的补充执行
 * 
 * 时间线示例（interval=300ms）：
 * ──触发──触发──触发──300ms──触发────────300ms后补充执行
 *   ↑(立即)                ↑(立即)                    ↑(补充)
 */
interface ThrottledFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  /** 取消节流（包括末次补充执行） */
  cancel(): void;
}

function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number = 300,
  options: { trailing?: boolean } = {}
): ThrottledFunction<T> {
  const { trailing = true } = options;
  
  let lastExecTime: number = 0;                        // 上次执行时间
  let timer: ReturnType<typeof setTimeout> | null = null; // 用于trailing的定时器
  let pendingArgs: Parameters<T> | null = null;         // 待执行的参数
  
  const throttled = function(this: any, ...args: Parameters<T>) {
    const now = Date.now();                            // 当前时间
    const context = this;                              // 保存this上下文
    const remaining = interval - (now - lastExecTime); // 距离下次可执行的剩余时间
    
    // 保存参数供trailing使用
    pendingArgs = args;
    
    if (remaining <= 0) {
      // 距离上次执行已经超过interval，可以立即执行
      if (timer !== null) {                            // 清除可能存在的trailing定时器
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(context, args);                         // 立即执行
      lastExecTime = now;                              // 更新执行时间
      pendingArgs = null;                               // 清空参数
    } else if (trailing && !timer) {
      // 还在冷却期内，且没有待执行的trailing定时器
      // 设置一个定时器，在冷却期结束时补充执行
      timer = setTimeout(() => {
        if (pendingArgs) {
          fn.apply(context, pendingArgs);              // 补充执行最后一次
          lastExecTime = Date.now();                   // 更新执行时间
          pendingArgs = null;                           // 清空参数
        }
        timer = null;                                  // 清除定时器引用
      }, remaining);
    }
    // 否则忽略本次触发
  } as ThrottledFunction<T>;
  
  // cancel 方法：取消节流（包括末次补充执行）
  throttled.cancel = function() {
    if (timer !== null) {                              // 清除trailing定时器
      clearTimeout(timer);
      timer = null;
    }
    pendingArgs = null;                                 // 清空参数
  };
  
  return throttled;
}
```

#### 使用示例与组合式用法

```typescript
// ========== 使用示例 ==========

// 1. 防抖 - 搜索框输入联想（经典场景）
const searchInput = document.getElementById('search') as HTMLInputElement;

const handleSearch = debounce((keyword: string) => {
  console.log('发起搜索请求:', keyword);
  // 这里可以调用API进行搜索
}, 500);

searchInput.addEventListener('input', (e) => {
  handleSearch((e.target as HTMLInputElement).value);
});

// 用户快速输入 "abc" → 只会在停止输入500ms后执行一次搜索

// 2. 防抖 - 按钮防重复点击
const submitBtn = document.getElementById('submit') as HTMLButtonElement;

const handleSubmit = debounce(() => {
  console.log('提交表单');
}, 1000, { leading: true });  // leading: 首次点击立即执行

submitBtn.addEventListener('click', handleSubmit);
// 点击按钮 → 立即提交 → 1秒内的重复点击被忽略

// 3. 节流 - 滚动事件处理
const handleScroll = throttle(() => {
  console.log('滚动位置:', window.scrollY);
  // 更新滚动相关的UI（如回到顶部按钮显示/隐藏）
}, 100);

window.addEventListener('scroll', handleScroll);
// 快速滚动 → 每100ms最多执行一次

// 4. 节流 - 窗口resize处理
const handleResize = throttle(() => {
  console.log('窗口大小:', window.innerWidth, window.innerHeight);
  // 重新计算布局、图表尺寸等
}, 200, { trailing: true });

window.addEventListener('resize', handleResize);

// 5. cancel 和 flush 的使用场景
const debouncedSave = debounce((data: string) => {
  console.log('自动保存:', data);
  // 调用自动保存API
}, 2000);

// 用户输入时自动保存
document.addEventListener('input', () => {
  debouncedSave('用户输入的内容...');
});

// 用户点击"手动保存"按钮时
document.getElementById('manual-save')?.addEventListener('click', () => {
  debouncedSave.flush();  // 立即执行待执行的保存操作
});

// 表单验证失败时取消自动保存
if (validationFailed) {
  debouncedSave.cancel();  // 取消待执行的保存操作
}

// 6. 组合式用法：debounce + throttle
// 场景：既需要防抖又需要节流的复杂场景（如无限滚动加载）
function createDebouncedThrottle<T extends (...args: any[]) => any>(
  fn: T,
  debounceDelay: number,
  throttleInterval: number
): ThrottledFunction<T> {
  // 先节流，再防抖
  const throttledFn = throttle(fn, throttleInterval);
  return debounce(throttledFn, debounceDelay) as unknown as ThrottledFunction<T>;
}

// 使用：先限制频率（最多每500ms一次），再等待稳定（停止1s后才真正执行）
const smartScrollHandler = createDebouncedThrottle(
  (scrollPos: number) => {
    console.log('智能滚动处理:', scrollPos);
    // 加载更多数据
  },
  1000,  // 防抖延迟：停止滚动1s后执行
  500    // 节流间隔：最多每500ms触发一次
);

window.addEventListener('scroll', () => smartScrollHandler(window.scrollY));
```

> 💡 **追问链预留位置**

---

## Q13: 重排（Reflow）和重绘（Repaint）的区别？如何减少？
- **难度**：★☆☆
- **知识点**：Reflow / Repaint / 浏览器渲染 / CSS 性能
- **题型**：简答题

### 参考答案要点：

1. **Reflow 和 Repaint 的定义与区别**：
   | 维度 | Reflow（重排/回流） | Repaint（重绘） |
   |------|---------------------|-----------------|
   | **触发原因** | **元素的几何属性发生变化**（宽高、位置、隐藏等） | **元素的外观样式发生变化**（颜色、背景、阴影等）但不影响布局 |
   | **影响范围** | 可能影响父元素、子元素、兄弟元素的位置 | **只影响当前元素本身** |
   | **性能开销** | **大**（需要重新计算布局） | **较小**（只需重新绘制） |
   | **是否触发 Repaint** | **一定会触发 Repaint** | 不会触发 Reflow |

2. **会触发 Reflow 的操作**：
   ```javascript
   // ⚠️ 以下操作会触发 Reflow（代价较高）
   
   // 1. 操作 DOM 结构
   element.appendChild(child);        // 添加/删除节点
   element.removeChild(child);
   element.innerHTML = '<div></div>'; // 大范围替换
   
   // 2. 修改几何属性
   element.style.width = '100px';
   element.style.height = '200px';
   element.style.padding = '10px';
   element.style.margin = '20px';
   element.style.display = 'none';     // 显示/隐藏
   element.style.position = 'absolute';// 改变定位方式
   
   // 3. 读取某些属性（强制同步 Reflow！）
   // 这些属性需要返回最新的布局信息，浏览器必须立即 reflow
   element.offsetWidth;
   element.offsetHeight;
   element.offsetTop;
   element.offsetLeft;
   element.clientWidth;
   element.clientHeight;
   element.getBoundingClientRect();
   getComputedStyle(element);
   
   // ⚠️ 读写交替会导致"布局抖动"（Layout Thrashing）
   for (let i = 0; i < items.length; i++) {
     items[i].style.left = i * 10 + 'px'; // 写 → 触发 reflow
     console.log(items[i].offsetLeft);    // 读 → 又触发 reflow
     // 循环N次 = N次 reflow！非常耗性能
   }
   ```

3. **会触发 Repaint 但不触发 Reflow 的操作**：
   ```css
   /* ✅ 只触发 Repaint（开销较小） */
   color: red;
   background-color: blue;
   border-color: green;
   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
   outline: 1px solid black;
   visibility: hidden; /* 注意：不是 display:none */
   ```

4. **减少 Reflow 和 Repaint 的优化策略**：
   ```javascript
   // 策略1：批量修改 DOM（Document Fragment）
   const fragment = document.createDocumentFragment();
   for (let i = 0; i < 1000; i++) {
     const div = document.createElement('div');
     div.textContent = `Item ${i}`;
     fragment.appendChild(div); // 在内存中操作，不触发 reflow
   }
   container.appendChild(fragment); // 只触发一次 reflow
   
   // 策略2：批量读写（避免 Layout Thrashing）
   // ❌ 错误：读写交替
   elements.forEach(el => {
     el.style.width = el.offsetWidth + 10 + 'px'; // 读+写混合
   });
   
   // ✅ 正确：先读后写（分离读写）
   const widths = elements.map(el => el.offsetWidth); // 批量读取
   elements.forEach((el, i) => {
     el.style.width = widths[i] + 10 + 'px'; // 批量写入
   });
   
   // 策略3：使用 CSS transform 代替位置属性
   el.style.transform = 'translateX(100px)'; // ✅ 只触发 Composite，不 reflow
   // el.style.left = '100px'; // ❌ 触发 reflow
   
   // 策略4：使用 will-change 或 GPU 加速
   .animated-element {
     will-change: transform; /* 提示浏览器提前优化 */
     /* 或使用 */
     transform: translateZ(0); /* 触发 GPU 合成层 */
   }
   
   // 策略5：离线操作 DOM
   const clone = container.cloneNode(true); // 克隆到内存
   // 在克隆体上大量修改...
   container.parentNode.replaceChild(clone, container); // 一次性替换
   ```

### 🔍 追问链
1. **如何进一步优化 DOM 操作的性能？**
   → 方向：使用 DocumentFragment 批量插入、虚拟 DOM（React/Vue 的 diff 算法）、CSS 动画替代 JS 动画（GPU 加速）、避免频繁操作样式类名、使用 `requestAnimationFrame` 调度 DOM 更新
2. **如何检测和监控 Reflow/Repaint 的性能影响？**
   → 方向：Chrome DevTools Performance 面板查看 Layout/Paint 事件、Rendering 面板的 "Paint flashing" 高亮重绘区域、Performance Observer API 监控 longtask、使用 `console.time/timeEnd` 测量耗时
3. **CSS will-change 和 transform: translateZ(0) 的区别？**
   → 方向：will-change 是预告（浏览器提前优化），transform 是实际触发合成层；will-change 过度使用会浪费内存；transform 适合持续动画的元素；两者都会创建独立的合成层

---

## Q14: CDN 是什么？有什么作用？
- **难度**：★☆☆
- **知识点**：CDN / 网络优化 / 资源分发
- **题型**：简答题

### 参考答案要点：

1. **CDN（Content Delivery Network，内容分发网络）的定义**：
   **CDN 是一组分布在不同地理位置的服务器网络**，它将网站的静态资源（JS、CSS、图片、字体、视频等）**缓存到离用户最近的边缘节点服务器上**。当用户请求资源时，**从最近的节点获取而非源站**，从而大幅降低延迟、提高加载速度。

2. **CDN 的工作原理**：
   ```
   用户(北京) 请求  https://cdn.example.com/app.js
       │
       ▼
   DNS 智能解析（CNAME → 边缘节点IP）
       │
       ▼
   北京边缘节点（距离近，延迟低 ~10ms）
       ├── 命中缓存 → 直接返回资源 ✅（最快）
       └── 未命中 → 回源站拉取 → 缓存 → 返回给用户
       
   对比：不使用 CDN
   用户(北京) 请求  https://origin-server.com/app.js
       │
       ▼
   源站服务器(美国西雅图)
       ├── 跨洋光缆延迟 ~150-200ms
       └── 可能还经过多层网络跳转
   ```

3. **CDN 的核心作用和价值**：
   - **加速资源加载**：**减少物理传输距离**，降低网络延迟（RTT）。国内典型延迟：同城 ~10ms、跨省 ~30-50ms、跨国 ~150-300ms
   - **减轻源站压力**：**大部分请求由边缘节点处理**（命中率可达90%+），源站只需要处理回源请求和动态请求
   - **提高可用性**：**分布式架构天然具备容灾能力**，某个节点故障时可以自动切换到其他节点
   - **节省带宽成本**：CDN 服务商通常提供**比自建机房更低的带宽单价**
   - **安全防护**：主流 CDN 提供 **DDoS 防护、WAF（Web应用防火墙）、HTTPS 加速**等增值服务

4. **CDN 缓存配置的关键概念**：
   ```nginx
   # CDN 缓存策略配置示例
   # 1. 带哈希的静态资源：长期缓存
   location ~* \.[a-f0-9]{8}\.(js|css)$ {
     # 文件名含hash，内容不变则URL不变，可长期缓存
     add_header Cache-Control "public, max-age=31536000, immutable";
   }
   
   # 2. 图片资源：中等时间缓存
   location ~* \.(png|jpg|jpeg|gif|webp|svg)$ {
     add_header Cache-Control "public, max-age=86400"; # 缓存1天
   }
   
   # 3. HTML 文件：短缓存或不缓存
   location ~* \.html$ {
     add_header Cache-Control "no-cache"; # 每次都回源验证
   }
   
   # 4. API 接口：不缓存
   location /api/ {
     add_header Cache-Control "no-store, private";
   }
   ```

5. **主流 CDN 服务商**：
   - **国际**：Cloudflare、AWS CloudFront、Fastly、Akamai
   - **国内**：阿里云 CDN、腾讯云 CDN、华为云 CDN、七牛云、又拍云
   - **选择考虑因素**：节点覆盖、价格、功能丰富度、技术支持、合规要求

> 💡 **追问链预留位置**

---

## Q15: gzip 压缩的原理？
- **难度**：★☆☆
- **知识点**：gzip / Brotli / 压缩算法 / 传输优化
- **题型**：简答题

### 参考答案要点：

1. **gzip 压缩的基本原理**：
   **gzip 是一种基于 DEFLATE 算法的无损数据压缩格式**。它在服务器端对资源进行压缩，传输给浏览器后再解压还原。由于**文本类资源（HTML/CSS/JS）通常有 60-80% 的冗余**，gzip 压缩后体积可缩小 **60-70%**，显著减少传输时间和带宽消耗。

2. **DEFLATE 算法的核心思想**：
   ```
   DEFLATE = LZ77 算法 + Huffman 编码
   
   步骤1：LZ77（字典压缩/滑动窗口）
   - 找出数据中的重复字符串
   - 用 (距离, 长度) 引用替代重复内容
   - 例："ABCABCABC" → "ABC(3,6)" 表示"往后退3个字符，复制6个字符"
   
   步骤2：Huffman 编码（熵编码）
   - 统计字符出现频率
   - 出现频率高的字符用短编码表示
   - 出现频率低的字符用长编码表示
   - 进一步压缩体积
   ```

3. **实际压缩效果对比**：
   | 文件类型 | 原始大小 | gzip 后 | 压缩率 | 是否值得压缩 |
   |---------|---------|---------|--------|-------------|
   | HTML | 50KB | ~15KB | **70%** | ✅ 必须压缩 |
   | CSS | 100KB | ~30KB | **70%** | ✅ 必须压缩 |
   | JavaScript | 200KB | ~65KB | **67%** | ✅ 必须压缩 |
   | JSON | 30KB | ~10KB | **67%** | ✅ 必须压缩 |
   | SVG | 20KB | ~6KB | **70%** | ✅ 必须压缩 |
   | PNG/JPG（已压缩） | 100KB | ~98KB | **2%** | ❌ 不要压缩 |
   | MP4/MP3（已压缩） | 5MB | ~4.9MB | **2%** | ❌ 不要压缩 |

4. **服务端配置 gzip**：
   ```nginx
   # Nginx 配置 gzip
   http {
     gzip on;                    # 开启 gzip
     gzip_min_length 1k;         # 小于1KB的不压缩（压缩反而增大）
     gzip_comp_level 6;          # 压缩级别 1-9（6是平衡点，9最慢但压缩率最高）
     gzip_types
       text/plain
       text/css
       text/javascript
       application/javascript
       application/json
       application/xml
       image/svg+xml;            # 只压缩文本类型
     gzip_vary on;               # 响应头添加 Vary: Accept-Encoding
     gzip_disable "msie6";       # IE6 不支持 gzip
   }
   ```

   ```javascript
   // Express/Koa 中间件配置
   const compression = require('compression');
   app.use(compression({
     threshold: 1024,      // 大于1KB才压缩
     level: 6,            // 压缩级别
     filter: (req, res) => {
       // 只压缩文本类型
       return /text|javascript|json|xml/.test(res.getHeader('content-type'));
     }
   }));
   ```

5. **Brotli（br）—— 更优秀的压缩算法**：
   - **Brotli 是 Google 开发的压缩算法**，比 gzip 压缩率高 **15-25%**
   - **现代浏览器均支持**（Chrome/Firefox/Edge/Safari）
   - **配置方式**：安装 brotli 模块，优先使用 brotli，不支持时 fallback 到 gzip
   - **注意**：Brotli 压缩**消耗更多 CPU 资源**，需权衡服务器性能

### 🔍 追问链
1. **Brotli 和 gzip 的压缩率对比？**
   → 方向：Brotli 通常比 gzip 高 15-25% 的压缩率；但压缩速度更慢（约慢 2-3 倍）；适合静态资源（可预压缩）；动态内容建议用 gzip（实时压缩快）
2. **如何配置服务器启用 Brotli？**
   → 方向：Nginx 需安装 `ngx_brotli` 模块；Apache 使用 `mod_brotli`；CDN（Cloudflare/AWS CloudFront）通常自动支持；需设置 `Accept-Encoding` 头协商
3. **预压缩 vs 实时压缩的选择策略？**
   → 方向：静态资源（JS/CSS/图片）使用构建时预压缩（webpack compression plugin）；动态内容（API 响应）使用服务器实时压缩；根据 Content-Type 配置不同的压缩策略

---

## ★★☆ 进阶题（Q16-Q33）— 多点综合、需理解原理

---

## Q16: 从输入 URL 到页面展示的完整过程中，哪些环节可以优化？
- **难度**：★★☆
- **知识点**：浏览器渲染流程 / 网络优化 / 全链路优化
- **题型**：综合简答题

### 参考答案要点：

1. **完整流程与优化点全景图**：
   ```
   ┌─────────────────────────────────────────────────────────────────┐
   │                    输入 URL 到页面展示完整流程                      │
   ├─────────────────────────────────────────────────────────────────┤
   │                                                                  │
   │  1. DNS 解析 (~20-120ms)                                         │
   │     ├── DNS 预解析: <link rel="dns-prefetch">                   │
   │     ├── DNS 缓存: 浏览器/OS/路由器多级缓存                       │
   │     └── HTTPDNS: 绕过传统 DNS，直连 IP                           │
   │                                                                  │
   │  2. TCP 连接 (~20-100ms, 3次握手)                                │
   │     ├── TCP 快开 (TFO): 减少握手往返                             │
   │     ├── Keep-Alive: 复用连接                                     │
   │     └── 预连接: <link rel="preconnect">                         │
   │                                                                  │
   │  3. TLS 握手 (~50-200ms, HTTPS)                                  │
   │     ├── TLS 1.3: 减少至 1-RTT                                   │
   │     ├── Session Resumption: 会话复用                            │
   │     └── OCSP Stapling: 减少证书验证时间                         │
   │                                                                  │
   │  4. 发送 HTTP 请求                                               │
   │     ├── HTTP/2 多路复用: 并行请求                               │
   │     ├── HTTP/3 (QUIC): 无队头阻塞                               │
   │     └── 请求压缩: HPACK/QPACK 头部压缩                          │
   │                                                                  │
   │  5. 服务器处理 & 响应                                            │
   │     ├── CDN 边缘加速: 减少物理距离                               │
   │     ├── 缓存策略: 强缓存/协商缓存                                │
   │     └── 服务端渲染(SSR): 减少客户端工作量                        │
   │                                                                  │
   │  6. 浏览器接收 & 解析响应                                        │
   │     ├── 流式传输: 边下载边解析                                   │
   │     ├── 资源预加载: preload/prefetch                            │
   │     └── 关键渲染路径(CRP)优化                                    │
   │                                                                  │
   │  7. 构建 DOM                                                     │
   │     ├── 减少 DOM 节点数量                                       │
   │     ├── 避免深层嵌套                                             │
   │     └── 异步加载非关键 JS: defer/async/module                   │
   │                                                                  │
   │  8. 构建 CSSOM                                                  │
   │     ├── Critical CSS 内联: 减少渲染阻塞                         │
   │     ├── 异步加载非关键 CSS                                      │
   │     └── 避免 @import (串行加载)                                 │
   │                                                                  │
   │  9. 执行 JavaScript                                              │
   │     ├── 代码分割(Code Splitting): 按需加载                     │
   │     ├── Tree Shaking: 去除无用代码                              │
   │     └── 避免长任务(Long Task): 使用 Web Worker                  │
   │                                                                  │
   │  10. 构建渲染树 & 布局(Layout)                                   │
   │      ├── 避免 Layout Thrashing                                  │
   │      ├── 使用 CSS Containment                                   │
   │      └── 批量 DOM 操作                                          │
   │                                                                  │
   │  11. 绘制(Paint)                                                 │
   │      ├── 减少绘制区域                                           │
   │      ├── 使用 transform 代替位置属性                             │
   │      └── 提升合成层(will-change/transform)                      │
   │                                                                  │
   │  12. 合成(Composite) & 显示                                      │
   │      ├── GPU 加速                                                │
   │      └── 减少合成层数量                                         │
   │                                                                  │
   └─────────────────────────────────────────────────────────────────┘
   ```

2. **各阶段优化优先级排序**（ROI 从高到低）：
   ```
   🔴 最高优先级（投入产出比最高）：
   1. 启用 gzip/brotli 压缩 — 体积减少 60-70%
   2. 合理的缓存策略 — 回源率降至 5% 以下
   3. 使用 CDN — 延迟降低 50-80%
   4. 图片优化（格式/尺寸/懒加载）— 体积减少 50-80%
   5. 代码分割 + 懒加载 — 首屏 JS 体积减半
   
   🟠 中等优先级：
   6. 关键 CSS 内联 — FCP 提升 30-50%
   7. 预加载关键资源 — 关键路径缩短
   8. Tree Shaking — 打包体积减少 10-30%
   9. 字体优化 — 减少 FOIT/FOUT
   
   🟡 较低优先级（锦上添花）：
   10. Service Worker 离线缓存
   11. HTTP/2/3 升级
   12. SSR/SSG
   13. Web Worker 复杂计算
   ```

> 💡 **追问链预留位置**

---

## Q17: 如何优化首屏加载速度？（综合性问题）
- **难度**：★★☆
- **知识点**：首屏优化 / 加载性能 / 综合优化策略
- **题型**：场景设计题

### 参考答案要点：

1. **首屏优化的系统性方法论**：
   ```
   首屏加载时间 = DNS查询 + TCP连接 + TLS握手 + 首字节时间(TTFB) + 
                 内容下载 + DOM解析 + CSSOM构建 + JS执行 + 首次渲染
                 
   优化目标：将 Above-the-Fold Time (ATF) 控制在 1.5s 以内
   ```

2. **分阶段优化策略**：
   ```html
   <!DOCTYPE html>
   <html lang="zh-CN">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     
     <!-- ==================== 阶段1：Head 区域优化 ==================== -->
     
     <!-- 1.1 预连接关键域名（节省 DNS+TCP+TLS 时间） -->
     <link rel="preconnect" href="https://cdn.example.com" crossorigin>
     <link rel="preconnect" href="https://api.example.com" crossorigin>
     <link rel="dns-prefetch" href="//analytics.example.com">
     
     <!-- 1.2 预加载最关键的资源 -->
     <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
     <link rel="preload" href="/images/hero.webp" as="image">
     
     <!-- 1.3 关键 CSS 内联（Critical CSS，避免额外请求阻塞渲染） -->
     <style>
       /* 只包含首屏可见区域所需的最少样式 */
       body { margin: 0; font-family: system-ui, sans-serif; }
       .header { display: flex; justify-content: space-between; padding: 16px; }
       .hero { min-height: 500px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
       .hero h1 { color: white; font-size: 48px; text-align: center; padding-top: 200px; }
       /* ... 首屏必要样式 ... */
       /* 目标：Critical CSS < 14KB（一个 TCP 包的大小） */
     </style>
     
     <!-- 1.4 异步加载非关键 CSS -->
     <link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
     <noscript><link rel="stylesheet" href="/styles/main.css"></noscript>
   </head>
   <body>
     <!-- ==================== 阶段2：Body 结构优化 ==================== -->
     
     <!-- 2.1 骨架屏（用户感知上的"快速"） -->
     <div id="app-shell">
       <div class="header-skeleton">
         <div class="skeleton-line" style="width:120px;height:24px"></div>
         <div class="skeleton-line" style="width:200px;height:16px"></div>
       </div>
       <div class="hero-skeleton">
         <div class="skeleton-box" style="height:500px"></div>
       </div>
     </div>
     
     <!-- 2.2 真实内容（渐进增强） -->
     <header class="header">...</header>
     <section class="hero">
       <h1>欢迎来到我们的网站</h1>
     </section>
     
     <!-- 2.3 非关键内容懒加载 -->
     <img data-src="/images/about.jpg" alt="关于我们" loading="lazy" class="lazy">
     <div data-src="/sections/news.html" class="lazy-section"></div>
     
     <!-- ==================== 阶段3：脚本加载优化 ==================== -->
     
     <!-- 3.1 关键内联脚本（性能监控、错误捕获等必须在最早执行） -->
     <script>
       // 初始化性能监控
       if ('PerformanceObserver' in window) {
         // 收集核心指标...
       }
     </script>
     
     <!-- 3.2 核心 JS 使用 defer（不阻塞渲染，按序执行） -->
     <script defer src="/vendor.[hash].js"></script>
     <script defer src="/main.[hash].js"></script>
     
     <!-- 3.3 非关键 JS 延迟加载 -->
     <script>
       // 页面空闲时加载非关键脚本
       if ('requestIdleCallback' in window) {
         requestIdleCallback(() => {
           const script = document.createElement('script');
           script.src = '/analytics.js';
           document.head.appendChild(script);
         });
       }
     </script>
   </body>
   </html>
   ```

3. **量化优化效果的检查清单**：
   | 优化项 | 预期收益 | 验证方式 |
   |-------|---------|---------|
   | 启用 Gzip/Brotli | 传输体积减少 60-70% | DevTools Network → Size vs Transferred |
   | CDN 加速 | TTFB 降低 50-80% | DevTools Network → Timing → Waiting (TTFB) |
   | Critical CSS 内联 | FCP 提升 30-50% | Lighthouse / WebPageTest |
   | 图片懒加载 | 首屏请求数减少 40-60% | DevTools Network 面板 |
   | 代码分割 | 首屏 JS 体积减少 40-60% | webpack-bundle-analyzer |
   | 预加载关键资源 | 资源加载提前 100-500ms | DevTools Network → Waterfall |
   | 字体优化 | FOIT/FOUT 消除 | Chrome Font panel |
   | 骨架屏 | **感知性能大幅提升** | 用户测试 / A/B Test |

> 💡 **追问链预留位置**

---

## Q18: 代码分割有哪些方式？各适用于什么场景？
- **难度**：★★☆
- **知识点**：Code Splitting / 动态导入 / Webpack / Vite
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **代码分割（Code Splitting）的核心价值**：
   将一个大的 JavaScript 包拆分成多个较小的 chunk，**按需加载**，从而**减少首屏加载体积、提高缓存利用率、并行加载提升速度**。

2. **四种代码分割方式详解**：
   ```javascript
   // ========================================
   // 方式1：入口点分割（Entry Points Splitting）
   // ========================================
   // webpack.config.js
   module.exports = {
     entry: {
       main: './src/main.js',
       vendor: './src/vendor.js',    // 第三方库单独打包
       polyfills: './src/polyfills.js' // polyfill 单独打包
     },
     output: {
       filename: '[name].[chunkhash].js',
     },
     optimization: {
       splitChunks: {
         chunks: 'all',
         cacheGroups: {
           vendor: {
             test: /[\\/]node_modules[\\/]/,
             name: 'vendor',
             chunks: 'all',
           }
         }
       }
     }
   };
   // 适用场景：多页面应用（MPA），不同页面共享的公共代码提取
   // 优点：缓存利用率高（vendor 很少变动）
   
   // ========================================
   // 方式2：动态导入（Dynamic Imports）— 最常用
   // ========================================
   // 使用 import() 语法（返回 Promise）
   
   // 场景A：路由级代码分割（React Router）
   import { lazy, Suspense } from 'react';
   
   const Home = lazy(() => import('./pages/Home'));
   const About = lazy(() => import('./pages/About'));
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   
   function App() {
     return (
       <Suspense fallback={<LoadingSpinner />}>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/dashboard" element={<Dashboard />} />
         </Routes>
       </Suspense>
     );
   }
   // 每个 route 对应一个独立的 chunk，只在访问时才加载
   
   // 场景B：组件级代码分割
   import { lazy, Suspense } from 'react';
   
   const HeavyChart = lazy(() => import('./components/HeavyChart'));
   const RichTextEditor = lazy(() => import('./components/RichTextEditor'));
   
   function ArticlePage() {
     return (
       <article>
         <h1>文章标题</h1>
         <Suspense fallback={<div>图表加载中...</div>}>
           {/* 图表组件很大，滚动到这里才加载 */}
           <HeavyChart data={chartData} />
         </Suspense>
         <Suspense fallback={<div>编辑器加载中...</div>}>
           {/* 编辑器只在用户点击"编辑"时才加载 */}
           <RichTextEditor content={content} />
         </Suspense>
       </article>
     );
   }
   
   // 场景C：条件加载（基于用户权限、特性开关等）
   async function loadAdminPanel() {
     if (user.isAdmin) {
       const { AdminPanel } = await import('./admin/AdminPanel');
       return new AdminPanel();
     }
   }
   
   // ========================================
   // 方式3：SplitChunksPlugin（Webpack/Vite 自动分割）
   // ========================================
   // webpack.config.js
   module.exports = {
     optimization: {
       splitChunks: {
         chunks: 'all', // all/initial/async
         minSize: 20000, // 最小 20KB 才分割（避免产生太多小文件）
         maxSize: 244000, // 最大 244KB，超出继续拆分
         minChunks: 1, // 至少被 1 个 chunk 引用
         cacheGroups: {
           // 分组策略
           defaultVendors: {
             test: /[\\/]node_modules[\\/]/,
             priority: -10, // 优先级
             reuseExistingChunk: true, // 复用已有的 chunk
           },
           default: {
             minChunks: 2, // 至少被 2 个 chunk 共享
             priority: -20,
             reuseExistingChunk: true,
           }
         }
       }
     }
   };
   
   // ========================================
   // 方式4：CSS 代码分割
   // ========================================
   // MiniCssExtractPlugin 将 CSS 提取为独立文件
   // 每个动态导入的组件如果有 CSS，也会生成独立的 CSS chunk
   import styles from './Component.module.css'; // CSS 也会被分割
   ```

3. **代码分割的策略选择指南**：
   | 场景 | 推荐方式 | 原因 |
   |-----|---------|------|
   | SPA 路由切换 | **动态 import() + React.lazy()** | 按路由懒加载，用户体验好 |
   | 大型组件/弹窗 | **动态 import() + Suspense** | 按需加载，减少首屏体积 |
   | 第三方库 | **SplitChunks vendor** | 独立缓存，更新业务代码不影响 |
   | 多页面共享代码 | **SplitChunks common** | 避免重复打包 |
   | 国际化(i18n) | **动态 import() 按语言** | 只加载当前语言的翻译包 |
   | 主题/皮肤 | **动态 import() 按主题** | 按需加载主题样式 |

4. **注意事项**：
   - **不要过度分割**：每个额外的 chunk 都是一次 HTTP 请求的开销（虽然 HTTP/2 多路复用缓解了这个问题）
   - **minSize 设置合理阈值**：一般 **20-30KB** 以下不值得单独分片
   - **配合 Prefetch 预加载**：预测用户下一步操作，提前加载对应 chunk
   - **注意 Loading 状态**：使用 Skeleton/Spinner 给用户反馈

### 🔍 追问链
1. **动态 import() 的浏览器兼容性如何处理？**
   → 方向：现代浏览器原生支持；旧浏览器需 webpack/babel 转译；可配合 `<script nomodule>` 降级；检测 `import()` 是否支持后动态加载
2. **代码分割后的 chunk 命名和缓存策略？**
   → 方向：使用 `[contenthash]` 确保内容变化才更新文件名；runtime chunk 单独提取（optimization.runtimeChunk）；vendor chunk 长期缓存；配置 CDN 缓存策略
3. **预加载（Prefetch）和预获取（Preload）在代码分割中的应用？**
   → 方向：webpackPrefetch: true（空闲时加载下一路由）；webpackPreload: true（当前页面立即需要）；魔法注释 `/* webpackPrefetch: true */`；结合用户行为预测预加载

---

## Q19: Service Worker 的生命周期和缓存策略？
- **难度**：★★☆
- **知识点**：Service Worker / PWA / 离线缓存 / Cache API
- **题型**：简答题 + 编程实践题

### 参考答案要点：

1. **Service Worker 生命周期**：
   ```
   注册(register) → 安装(installing) → 已安装(installed) → 
   激活(activating) → 已激活(activated) → 运行中(activated)
   
   详细流程：
   ┌──────────┐    ┌──────────────┐    ┌──────────────┐
   │  注册     │───▶│  安装中      │───▶│  安装完成    │
   │ register  │    │ installing   │    │ installed    │
   └──────────┘    └──────────────┘    └──────┬───────┘
                                               │
                    ┌──────────────────────────┘
                    ▼
          ┌──────────────────┐
          │  等待旧 SW 不再控制页面 │ ← 如果有旧的 SW 还在工作
          │  waiting          │
          └────────┬─────────┘
                   │
          ┌────────┴─────────┐
          ▼                  ▼
   ┌──────────────┐   ┌──────────────┐
   │  激活中       │──▶│  已激活      │
   │ activating   │    │ activated   │
   └──────────────┘   └──────────────┘
                          │
                          ▼
                   开始拦截网络请求（fetch 事件）
   ```

2. **Service Worker 注册与基础缓存策略**：
   ```javascript
   // sw.js - Service Worker 文件
   
   // ==================== 1. 安装阶段：预缓存关键资源 ====================
   const CACHE_NAME = 'v1.0.0';
   const PRECACHE_URLS = [
     '/',
     '/index.html',
     '/styles/main.css',
     '/js/main.js',
     '/images/logo.svg',
     '/offline.html' // 离线页面
   ];
   
   self.addEventListener('install', (event) => {
     console.log('[SW] 安装中...');
     // waitUntil 确保 install 事件不会完成直到 promise 完成
     event.waitUntil(
       caches.open(CACHE_NAME).then((cache) => {
         console.log('[SW] 预缓存关键资源');
         return cache.addAll(PRECACHE_URLS);
       })
     );
     // skipWaiting 跳过等待阶段，立即激活
     self.skipWaiting();
   });
   
   // ==================== 2. 激活阶段：清理旧缓存 ====================
   self.addEventListener('activate', (event) => {
     console.log('[SW] 激活中...');
     event.waitUntil(
       caches.keys().then((cacheNames) => {
         return Promise.all(
           cacheNames
             .filter(name => name !== CACHE_NAME)
             .map(name => {
               console.log('[SW] 删除旧缓存:', name);
               return caches.delete(name);
             })
         );
       })
     );
     // clients.claim 立即控制所有页面
     self.clients.claim();
   });
   
   // ==================== 3. 拦截请求：缓存策略 ====================
   self.addEventListener('fetch', (event) => {
     const { request } = event;
     const url = new URL(request.url);
     
     // 策略1：Cache First（缓存优先）— 适用于静态资源
     if (isStaticAsset(url.pathname)) {
       event.respondWith(cacheFirst(request));
       return;
     }
     
     // 策略2：Network First（网络优先）— 适用于 API 数据
     if (url.pathname.startsWith('/api/')) {
       event.respondWith(networkFirst(request));
       return;
     }
     
     // 策略3：Stale While Revalidate（ stale-while-revalidate ）— 适用于 HTML
     event.respondWith(staleWhileRevalidate(request));
   });
   
   // 判断是否为静态资源
   function isStaticAsset(pathname) {
     return /\.(js|css|png|jpg|jpeg|gif|svg|woff2?|ttf|eot)$/.test(pathname);
   }
   
   // ==================== 缓存策略实现 ====================
   
   // 策略1：Cache First — 优先使用缓存，没有则请求网络
   async function cacheFirst(request) {
     const cachedResponse = await caches.match(request);
     if (cachedResponse) {
       return cachedResponse; // 命中缓存，直接返回
     }
     try {
       const networkResponse = await fetch(request);
       // 成功响应才缓存（只缓存 200 状态码）
       if (networkResponse.ok) {
         const cache = await caches.open(CACHE_NAME);
         cache.put(request, networkResponse.clone());
       }
       return networkResponse;
     } catch (error) {
       // 网络失败，返回离线页面（如果是导航请求）
       if (request.mode === 'navigate') {
         return caches.match('/offline.html');
       }
       throw error;
     }
   }
   
   // 策略2：Network First — 优先请求网络，失败则用缓存
   async function networkFirst(request) {
     try {
       const networkResponse = await fetch(request);
       // 成功则更新缓存
       if (networkResponse.ok) {
         const cache = await caches.open(CACHE_NAME);
         cache.put(request, networkResponse.clone());
       }
       return networkResponse;
     } catch (error) {
       const cachedResponse = await caches.match(request);
       if (cachedResponse) {
         return cachedResponse; // 网络失败，返回缓存
       }
       // 都没有，返回错误响应
       return new Response(JSON.stringify({ error: '离线状态' }), {
         status: 503,
         headers: { 'Content-Type': 'application/json' }
       });
     }
   }
   
   // 策略3：Stale While Revalidate — 同时返回缓存和更新缓存
   async function staleWhileRevalidate(request) {
     const cachedResponse = await caches.match(request);
     // 不管缓存有没有，都在后台更新
     const fetchPromise = fetch(request).then((networkResponse) => {
       if (networkResponse.ok) {
         caches.open(CACHE_NAME).then(cache => {
           cache.put(request, networkResponse.clone());
         });
       }
       return networkResponse;
     }).catch(() => {}); // 网络失败忽略
     
     // 优先返回缓存（即时响应）
     return cachedResponse || fetchPromise;
   }
   ```

3. **主线程注册 Service Worker**：
   ```javascript
   // main.js - 在主线程中注册
   if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
       navigator.serviceWorker.register('/sw.js')
         .then(registration => {
           console.log('SW 注册成功:', registration.scope);
           
           // 检查是否有更新
           registration.addEventListener('updatefound', () => {
             const newWorker = registration.installing;
             newWorker.addEventListener('statechange', () => {
               if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                 // 新 SW 已就绪，提示用户刷新
                 showUpdateNotification();
               }
             });
           });
         })
         .catch(error => {
           console.error('SW 注册失败:', error);
         });
     });
   }
   ```

4. **缓存策略选择指南**：
   | 策略 | 适用场景 | 优点 | 缺点 |
   |------|---------|------|------|
   | **Cache First** | 静态资源（JS/CSS/图片/字体） | 离线可用、响应极快 | 可能返回过期内容 |
   | **Network First** | API 数据、高频更新的内容 | 数据新鲜度高 | 离线时可能无数据 |
   | **Stale While Revalidate** | HTML 页面、中等频率更新的内容 | 即时响应 + 后台更新 | 首次加载较慢 |
   | **Network Only** | 支付、登录等敏感操作 | 数据始终最新 | 离线不可用 |
   | **Cache Only** | 不变的资源（带 hash 的打包产物） | 最快的响应 | 无法更新 |

### 🔍 追问链
1. **Workbox 的常用策略有哪些？**
   → 方向：Workbox 提供了 `workbox-strategies`（CacheFirst/NetworkFirst/StaleWhileRevalidate 等）；`workbox-routing` 按路由匹配策略；`workbox-expiration` 管理缓存过期；`workbox-background-sync` 离线时请求队列
2. **SW 更新机制和注意事项？**
   → 方向：SW 文件变化触发 install 事件；`skipWaiting()` 跳过等待立即激活；`clients.claim()` 立即控制所有页面；需处理 SW 更新后的版本兼容性；使用 `updateViaCache` 控制更新方式
3. **SW 适用的业务场景？**
   → 方向：PWA 应用（离线优先）、SPA 首屏加速、API 缓存（减少请求）、静态资源长期缓存、弱网环境降级、推送通知；不适合：高频实时数据（股票行情）、敏感数据（支付）、SEO 要求高的页面

---

## Q20: 虚拟列表的原理是什么？如何实现一个简单的虚拟列表？
- **难度**：★★☆
- **知识点**：虚拟列表 / Virtual Scrolling / 大列表渲染 / DOM 优化
- **题型**：编程实践题

### 参考答案要点：

1. **虚拟列表的核心原理**：
   **虚拟列表（Virtual List/Virtual Scrolling）的核心思想是"只渲染可视区域内的列表项"**。无论数据量多大（哪怕 10 万条），屏幕上始终只渲染约等于可视区能容纳的条目数（比如 20 条），通过动态计算哪些数据应该显示来实现**海量数据的流畅滚动**。

   ```
   传统渲染（10000 条数据）：
   ┌─────────────────────┐
   │ Item 1   (DOM节点)  │  ← 渲染了 10000 个 DOM 节点
   │ Item 2   (DOM节点)  │     内存占用巨大
   │ Item 3   (DOM节点)  │     滚动卡顿严重
   │ ...                  │
   │ Item 10000 (DOM节点)│
   └─────────────────────┘
   
   虚拟列表（10000 条数据，只渲染可视区的 ~20 条）：
   ┌─────────────────────┐
   │ (空白-上方溢出区域)  │  ← 用 padding-top 模拟
   ├─────────────────────┤
   │ Item 451  (DOM节点) │  ← 只渲染可视区域的 ~20 个节点
   │ Item 452  (DOM节点) │     内存占用恒定
   │ Item 453  (DOM节点) │     滚动丝滑流畅
   │ ...                  │
   │ Item 470  (DOM节点) │
   ├─────────────────────┤
   │ (空白-下方溢出区域)  │  ← 用 padding-bottom 模拟
   └─────────────────────┘
   ```

2. **手写虚拟列表实现**：
   ```html
   <!DOCTYPE html>
   <html lang="zh-CN">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>虚拟列表演示</title>
     <style>
       * { margin: 0; padding: 0; box-sizing: border-box; }
       
       .virtual-list-container {
         width: 600px;
         height: 500px; /* 固定高度的容器 */
         overflow-y: auto; /* 垂直滚动 */
         position: relative;
         border: 1px solid #ddd;
       }
       
       .virtual-list-content {
         position: absolute;
         left: 0;
         right: 0;
         top: 0;
       }
       
       .list-item {
         height: 50px; /* 每项固定高度 */
         display: flex;
         align-items: center;
         padding: 0 16px;
         border-bottom: 1px solid #eee;
       }
       
       .list-item:hover {
         background-color: #f5f5f5;
       }
     </style>
   </head>
   <body>
     <h2>虚拟列表演示（100000 条数据）</h2>
     <div id="virtualList" class="virtual-list-container"></div>
     
     <script>
       class VirtualList {
         constructor(container, options = {}) {
           this.container = typeof container === 'string'
             ? document.querySelector(container)
             : container;
           
           // 配置参数
           this.itemHeight = options.itemHeight || 50;      // 每项高度
           this.bufferSize = options.bufferSize || 5;       // 上下缓冲区条数
           this.data = options.data || [];                   // 数据源
           this.renderItem = options.renderItem || ((item) => 
             `<div class="list-item">${item}</div>`
           );
           
           // 状态
           this.visibleStart = 0;  // 可视区起始索引
           this.visibleEnd = 0;    // 可视区结束索引
           
           // DOM 元素
           this.contentEl = null;  // 内容区域
           
           this.init();
         }
         
         init() {
           // 创建内容区域
           this.contentEl = document.createElement('div');
           this.contentEl.className = 'virtual-list-content';
           this.container.appendChild(this.contentEl);
           
           // 绑定滚动事件（使用节流优化）
           let scrollRafId = null;
           this.container.addEventListener('scroll', () => {
             if (scrollRafId) return;
             scrollRafId = requestAnimationFrame(() => {
               this.updateVisibleRange();
               scrollRafId = null;
             });
           });
           
           // 初始渲染
           this.updateVisibleRange();
         }
         
         // 核心方法：计算可视范围并渲染
         updateVisibleRange() {
           const scrollTop = this.container.scrollTop;
           const containerHeight = this.container.clientHeight;
           
           // 计算可视区域的起始和结束索引
           const startIndex = Math.floor(scrollTop / this.itemHeight);
           const endIndex = Math.ceil(
             (scrollTop + containerHeight) / this.itemHeight
           );
           
           // 加入缓冲区（上下多渲染几条，防止滚动时出现白边）
           this.visibleStart = Math.max(0, startIndex - this.bufferSize);
           this.visibleEnd = Math.min(
             this.data.length - 1,
             endIndex + this.bufferSize
           );
           
           this.render();
         }
         
         // 渲染可视区域内的列表项
         render() {
           const totalHeight = this.data.length * this.itemHeight;
           const offsetY = this.visibleStart * this.itemHeight;
           
           // 构建内容 HTML
           let html = '';
           for (let i = this.visibleStart; i <= this.visibleEnd; i++) {
             html += this.renderItem(this.data[i], i);
           }
           
           this.contentEl.innerHTML = html;
           
           // 关键：通过 transform/y 定位内容区域
           // 上方留白模拟不可见的数据
           this.contentEl.style.transform = `translateY(${offsetY}px)`;
           // 总高度撑开滚动条
           this.container.style.paddingTop = `${totalHeight}px`;
           this.contentEl.style.minHeight = `${totalHeight}px`;
         }
         
         // 滚动到指定索引
         scrollToIndex(index) {
           this.container.scrollTop = index * this.itemHeight;
         }
         
         // 更新数据
         setData(newData) {
           this.data = newData;
           this.updateVisibleRange();
         }
       }
       
       // 使用示例：渲染 100000 条数据
       const data = Array.from({ length: 100000 }, (_, i) => ({
         id: i,
         name: `列表项 ${i + 1}`,
         description: `这是第 ${i + 1} 条数据的描述信息`
       }));
       
       new VirtualList('#virtualList', {
         itemHeight: 50,
         bufferSize: 5,
         data: data,
         renderItem: (item, index) => `
           <div class="list-item">
             <strong>#${item.id}</strong> ${item.name}
             <span style="margin-left:auto;color:#999">${item.description}</span>
           </div>
         `
       });
     </script>
   </body>
   </html>
   ```

3. **虚拟列表的进阶优化方向**：
   - **动态高度支持**：每项高度不固定时，需要维护一个**高度估算表**（estimated positions），先估算后修正
   - **水平虚拟列表**：横向滚动的场景
   - **二维虚拟表格**：同时做行列两个方向的虚拟化（如 Excel 风格的表格）
   - **无限滚动**：滚动到底部时自动加载更多数据（结合分页/游标）
   - **现有成熟库**：`react-window`、`react-virtualized`、`@tanstack/react-virtual`（推荐）

### 深度拓展：手写实现

#### 增强版虚拟滚动引擎 —— 支持动态高度估算 + scrollToIndex

```typescript
/**
 * 增强版虚拟滚动引擎
 * 
 * 算法思路：
 * 1. 使用"位置索引表"（Position Index）记录每项的起始位置
 * 2. 对于未渲染的项，使用 estimatedItemHeight 估算高度
 * 3. 渲染后测量真实高度，更新位置索引（增量更新）
 * 4. 二分查找快速定位可见范围
 * 5. scrollToIndex 通过位置索引计算目标 scrollTop
 * 
 * 数据结构：
 * positions = [0, 50, 100, 150, ...]  // 每项的起始位置
 * heights = [50, 50, 55, 48, ...]     // 每项的真实高度（已测量的）
 */

interface VirtualScrollOptions<T> {
  /** 容器元素 */
  container: HTMLElement;
  /** 所有数据 */
  data: T[];
  /** 估算的每项高度（用于未测量的项） */
  estimatedItemHeight?: number;
  /** 可见区域上下缓冲区数量 */
  bufferSize?: number;
  /** 渲染单项的函数 */
  renderItem: (item: T, index: number) => string;
  /** 高度变化时的回调（可选） */
  onHeightChange?: (index: number, height: number) => void;
}

class VirtualScrollEngine<T> {
  private container: HTMLElement;                          // 容器元素
  private data: T[];                                       // 数据源
  private estimatedItemHeight: number;                     // 估算高度
  private bufferSize: number;                              // 缓冲区大小
  private renderItem: (item: T, index: number) => string; // 渲染函数
  private onHeightChange?: (index: number, height: number) => void;
  
  // 核心数据结构
  private positions: number[] = [];                        // 位置索引表：每项的起始scrollTop
  private heights: Map<number, number> = new Map();        // 已测量的高度映射
  private measuredCount: number = 0;                       // 已测量的项数
  
  // DOM 相关
  private contentEl: HTMLElement | null = null;            // 内容容器
  private itemsMap: Map<number, HTMLElement> = new Map();  // 已渲染的DOM元素映射
  
  // 滚动状态
  private scrollTop: number = 0;                           // 当前滚动位置
  private isScrolling: boolean = false;                    // 是否正在滚动
  
  constructor(options: VirtualScrollOptions<T>) {
    this.container = options.container;
    this.data = options.data;
    this.estimatedItemHeight = options.estimatedItemHeight ?? 50;
    this.bufferSize = options.bufferSize ?? 5;
    this.renderItem = options.renderItem;
    this.onHeightChange = options.onHeightChange;
    
    // 初始化位置索引表（基于估算高度）
    this.initPositions();
    
    // 创建内容容器并绑定事件
    this.setupContainer();
    this.bindEvents();
    
    // 首次渲染
    this.updateVisibleRange();
  }
  
  /**
   * 初始化位置索引表
   * 基于估算高度预计算所有项的位置
   */
  private initPositions(): void {
    this.positions = [];
    let currentPosition = 0;
    
    for (let i = 0; i < this.data.length; i++) {
      this.positions[i] = currentPosition;                // 记录第i项的起始位置
      currentPosition += this.estimatedItemHeight;         // 累加估算高度
    }
    
    // 总高度 = 最后一项的位置 + 估算高度
    const totalHeight = currentPosition + this.estimatedItemHeight;
    this.container.style.height = `${totalHeight}px`;       // 设置容器总高度以产生滚动条
  }
  
  /**
   * 设置DOM结构
   */
  private setupContainer(): void {
    // 创建内容容器（绝对定位，通过 transform 移动）
    this.contentEl = document.createElement('div');
    this.contentEl.className = 'virtual-scroll-content';
    Object.assign(this.contentEl.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      willChange: 'transform'                               // GPU加速
    });
    
    this.container.appendChild(this.contentEl);
    this.container.style.position = 'relative';             // 容器设为相对定位
    this.container.style.overflow = 'auto';                 // 允许滚动
  }
  
  /**
   * 绑定滚动事件（使用 requestAnimationFrame 节流）
   */
  private bindEvents(): void {
    let rafId: number | null = null;                        // rAF ID
    
    this.container.addEventListener('scroll', () => {
      if (rafId !== null) return;                           // 如果已有待执行的rAF，跳过
      
      rafId = requestAnimationFrame(() => {                 // 在下一帧执行
        this.handleScroll();                                // 处理滚动
        rafId = null;                                      // 重置ID
      });
    });
  }
  
  /**
   * 处理滚动事件 - 核心逻辑
   */
  private handleScroll(): void {
    const newScrollTop = this.container.scrollTop;          // 获取新的滚动位置
    
    // 只有滚动位置变化超过阈值才更新（避免频繁重绘）
    if (Math.abs(newScrollTop - this.scrollTop) < 1) return;
    
    this.scrollTop = newScrollTop;
    this.isScrolling = true;
    
    this.updateVisibleRange();                              // 更新可见范围
    
    // 滚动结束后标记
    clearTimeout(this._scrollEndTimer);                     // 清除之前的定时器
    this._scrollEndTimer = window.setTimeout(() => {        // 滚动结束检测
      this.isScrolling = false;
    }, 150);
  }
  
  private _scrollEndTimer: ReturnType<typeof setTimeout>;   // 滚动结束定时器
  
  /**
   * 更新可见范围 - 核心算法
   * 
   * 步骤：
   * 1. 获取容器的可视区域高度
   * 2. 通过二分查找定位起始可见项
   * 3. 计算结束可见项（加上缓冲区）
   * 4. 调用 render 渲染这些项
   */
  private updateVisibleRange(): void {
    const viewHeight = this.container.clientHeight;         // 可视区域高度
    
    // 二分查找：找到第一个位置 > scrollTop 的项
    const startIndex = this.binarySearch(this.scrollTop);   // 起始可见索引
    // 向前扩展缓冲区
    const renderStart = Math.max(0, startIndex - this.bufferSize);
    
    // 找到结束索引：第一个位置 > scrollTop + viewHeight 的项
    const endIndex = this.binarySearch(this.scrollTop + viewHeight);
    // 向后扩展缓冲区
    const renderEnd = Math.min(this.data.length - 1, endIndex + this.bufferSize);
    
    // 渲染可见范围内的项
    this.renderRange(renderStart, renderEnd);
  }
  
  /**
   * 二分查找 - 快速定位可见范围的起始/结束索引
   * @param target 目标滚动位置
   * @returns 第一个 position > target 的索引
   */
  private binarySearch(target: number): number {
    let left = 0;
    let right = this.positions.length - 1;
    let result = this.positions.length;                     // 默认返回末尾
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      if (this.positions[mid] <= target) {
        left = mid + 1;                                    // 目标在右半部分
      } else {
        result = mid;                                      // 找到一个候选
        right = mid - 1;                                   // 继续在左半部分找更小的
      }
    }
    
    return result;
  }
  
  /**
   * 渲染指定范围的项
   * @param start 起始索引
   * @param end 结束索引
   */
  private renderRange(start: number, end: number): void {
    if (!this.contentEl) return;
    
    // 计算偏移量（使用起始项的位置）
    const offset = this.positions[start] || 0;
    this.contentEl.style.transform = `translateY(${offset}px)`; // 定位内容区域
    
    // 收集需要保留和需要移除的项
    const toKeep = new Set<number>();                       // 需要保留的索引集合
    
    for (let i = start; i <= end; i++) {
      toKeep.add(i);
      
      if (!this.itemsMap.has(i)) {
        // 新增项：创建DOM元素
        const itemEl = document.createElement('div');
        itemEl.innerHTML = this.renderItem(this.data[i], i);
        itemEl.dataset.index = String(i);                   // 存储索引
        
        // 测量真实高度（异步，避免阻塞）
        this.measureItemHeight(itemEl, i);
        
        this.contentEl.appendChild(itemEl);
        this.itemsMap.set(i, itemEl);
      }
    }
    
    // 移除不可见的项（释放内存）
    for (const [index, el] of this.itemsMap.entries()) {
      if (!toKeep.has(index)) {
        el.remove();                                        // 从DOM移除
        this.itemsMap.delete(index);                        // 从映射中删除
      }
    }
  }
  
  /**
   * 测量项的真实高度并更新位置索引
   * @param itemEl DOM元素
   * @param index 数据索引
   */
  private measureItemHeight(itemEl: HTMLElement, index: number): void {
    // 使用 ResizeObserver 监听尺寸变化（比 setTimeout 更准确）
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;           // 获取真实高度
        
        if (height > 0 && !this.heights.has(index)) {
          // 第一次测量到真实高度
          this.heights.set(index, height);                  // 保存真实高度
          
          // 更新位置索引表（从当前项开始向后重新计算）
          this.updatePositionsFrom(index, height);
          
          // 回调通知外部
          this.onHeightChange?.(index, height);
          
          observer.disconnect();                            // 断开观察者（只需测量一次）
        }
      }
    });
    
    observer.observe(itemEl);
  }
  
  /**
   * 从指定索引开始更新位置索引表（增量更新）
   * @param index 变化的索引
   * @param newHeight 新的高度值
   */
  private updatePositionsFrom(index: number, newHeight: number): void {
    const oldHeight = this.estimatedItemHeight;              // 之前使用的估算高度
    const delta = newHeight - oldHeight;                    // 高度差值
    
    // 更新当前位置及之后的所有位置
    for (let i = index; i < this.positions.length; i++) {
      if (i === index) {
        // 当前项：位置不变，但后续项都要调整
        continue;
      }
      this.positions[i] += delta;                           // 后续项位置 += 差值
    }
    
    // 更新总高度
    const totalHeight = this.positions[this.positions.length - 1] + 
                       (this.heights.get(this.positions.length - 1) || this.estimatedItemHeight);
    this.container.style.height = `${totalHeight}px`;
    
    this.measuredCount++;                                   // 增加已测量计数
    
    // 如果高度变化较大，重新渲染当前可见范围
    if (Math.abs(delta) > 5) {                             // 高度差超过5px才重绘
      this.updateVisibleRange();
    }
  }
  
  /**
   * 滚动到指定索引
   * @param targetIndex 目标索引
   * @param behavior 滚动行为（smooth/auto/instant）
   */
  scrollToIndex(targetIndex: number, behavior: ScrollBehavior = 'auto'): void {
    // 边界检查
    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex >= this.data.length) targetIndex = this.data.length - 1;
    
    // 获取目标位置的 scrollTop
    const targetScrollTop = this.positions[targetIndex];
    
    // 执行滚动
    this.container.scrollTo({
      top: targetScrollTop,
      behavior: behavior                                     // 支持平滑滚动
    });
  }
  
  /**
   * 更新数据源
   * @param newData 新的数据数组
   */
  setData(newData: T[]): void {
    this.data = newData;
    
    // 清空已测量的高度
    this.heights.clear();
    this.measuredCount = 0;
    
    // 清空DOM
    this.itemsMap.clear();
    if (this.contentEl) {
      this.contentEl.innerHTML = '';
    }
    
    // 重新初始化位置索引
    this.initPositions();
    
    // 重新渲染
    this.scrollTop = 0;
    this.container.scrollTop = 0;
    this.updateVisibleRange();
  }
  
  /**
   * 销毁实例（释放资源）
   */
  destroy(): void {
    // 清除定时器
    clearTimeout(this._scrollEndTimer);
    
    // 清空DOM
    this.itemsMap.clear();
    if (this.contentEl) {
      this.contentEl.remove();
      this.contentEl = null;
    }
    
    // 清空数据引用
    this.data = [] as unknown as T[];
    this.positions = [];
    this.heights.clear();
  }
}
```

#### 使用示例

```typescript
// ========== 使用示例 ==========

// 1. 基本使用：固定高度的列表
const data = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  title: `文章标题 ${i + 1}`,
  content: `这是第 ${i + 1} 条数据的详细内容...`,
  height: 40 + Math.random() * 60  // 随机高度 40-100px
}));

const engine = new VirtualScrollEngine({
  container: document.getElementById('virtualList')!,
  data: data,
  estimatedItemHeight: 50,              // 初始估算高度
  bufferSize: 10,                      // 上下各10个缓冲项
  renderItem: (item, index) => `
    <div class="list-item" style="
      padding: 12px 16px;
      border-bottom: 1px solid #eee;
      background: white;
    ">
      <h3 style="margin:0 0 8px">${item.title}</h3>
      <p style="margin:0;color:#666;font-size:14px">${item.content}</p>
    </div>
  `,
  onHeightChange: (index, height) => {
    console.log(`第 ${index} 项高度已测量: ${height.toFixed(1)}px`);
  }
});

// 2. 滚动到指定位置
document.getElementById('btn-goto-500')?.addEventListener('click', () => {
  engine.scrollToIndex(500, 'smooth');  // 平滑滚动到第500项
});

// 3. 动态更新数据
document.getElementById('btn-refresh')?.addEventListener('click', () => {
  const newData = Array.from({ length: 50000 }, (_, i) => ({
    id: i,
    title: `刷新后的标题 ${i + 1}`,
    content: `新数据的内容...`
  }));
  engine.setData(newData);
});

// 4. 组件销毁时释放资源
window.addEventListener('beforeunload', () => {
  engine.destroy();
});
```

#### 算法复杂度分析

```
时间复杂度分析：

操作                  | 平均情况       | 最坏情况
─────────────────────|───────────────|──────────
初始化位置索引        | O(n)          | O(n)
滚动处理              | O(log n)      | O(log n)  ← 二分查找
渲染可见项            | O(k)          | O(k)      ← k=可见项数+缓冲
高度测量后更新索引    | O(n)          | O(n)      ← 最坏需更新后续所有项
scrollToIndex         | O(1)          | O(1)

空间复杂度：O(n)  ← 位置索引表存储n个位置值

优化点：
✅ 二分查找将可见范围定位从 O(n) 降到 O(log n)
✅ 增量更新只修改受影响的位置，避免全量重算
✅ 缓冲区减少滚动时的DOM创建/销毁频率
✅ ResizeObserver 异步测量，不阻塞主线程
```

### 🔍 追问链
1. **虚拟列表在移动端的性能优化？**
   → 方向：使用 `transform` 替代 `top` 定位（GPU 加速）；减少事件监听（touch 事件节流）；使用 `will-change: transform` 提示浏览器；避免频繁的 DOM 操作；考虑使用 `IntersectionObserver` 优化可见性检测
2. **如何处理虚拟列表中的动态高度（如图片加载后高度变化）？**
   → 方向：使用估算高度 + 实际测量后更新；维护一个位置索引表（Position Index）；使用 `ResizeObserver` 监听尺寸变化；增量更新后续元素的位置；支持 `scrollToIndex` 的精确滚动
3. **虚拟列表与无限滚动的结合方案？**
   → 方向：监听滚动到底部事件触发数据加载；使用分页或游标机制；加载状态展示（Loading 指示器）；错误重试机制；已加载数据的缓存管理；结合 `requestIdleCallback` 在空闲时预加载下一页数据

---

## Q21: will-change 属性的作用和使用注意事项？
- **难度**：★★☆
- **知识点**：will-change / GPU 加速 / 合成层 / CSS 性能
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **will-change 的作用机制**：
   **`will-change` 是一个 CSS 属性，用来告诉浏览器某个元素** **即将发生的变化**，让浏览器**提前做好优化准备**（通常是提前创建独立的合成层、分配 GPU 内存等）。正确使用可以**显著提升动画和过渡的性能**。

   ```css
   /* 告诉浏览器：这个元素的 transform 属性将要变化 */
   .animated-element {
     will-change: transform;
   }
   
   /* 告诉浏览器：这个元素的 opacity 和 transform 都要变化 */
   .fade-slide-element {
     will-change: transform, opacity;
   }
   ```

2. **底层原理：合成层（Compositing Layer）**：
   ```
   普通渲染流程（无 will-change）：
   Layout → Paint → Composite（与其他元素共享一个图层）
   → 每次变化都可能触发 Layout/Paint
   
   使用 will-change 后：
   Layout → Paint → Composite（独立的新图层，GPU 管理）
   → 后续变化只触发 Composite（GPU 合成），跳过 Layout 和 Paint
   → 性能大幅提升！
   ```

3. **正确的使用方式和注意事项**：
   ```css
   /* ✅ 正确用法1：在动画开始前添加，结束后移除 */
   .card {
     transition: transform 0.3s ease;
   }
   .card:hover {
     will-change: transform; /* hover 时预告 */
     transform: scale(1.05);
   }
   /* 或者用 JS 控制 */
   .card.active {
     will-change: transform;
   }
   
   /* ✅ 正确用法2：用于持续动画的元素 */
   .spinning-loader {
     will-change: transform;
     animation: spin 1s linear infinite;
   }
   @keyframes spin {
     from { transform: rotate(0deg); }
     to { transform: rotate(360deg); }
   }
   
   /* ✅ 正确用法3：用于经常变化的 scroll 相关效果 */
   .parallax-bg {
     will-change: transform;
   }
   
   /* ❌ 错误用法1：全局滥用 */
   * {
     will-change: transform; /* 严重错误！会创建数千个合成层 */
   }
   
   /* ❌ 错误用法2：用在不需要动画的静态元素 */
   .static-header {
     will-change: transform; /* 浪费内存，没有任何好处 */
   }
   
   /* ❌ 错误用法3：指定的属性过于宽泛 */
   .bad-example {
     will-change: contents; /* 太宽泛，浏览器无法有效优化 */
   }
   ```

4. **will-change 的代价和限制**：
   | 问题 | 说明 |
   |------|------|
   | **内存占用**：每个合成层都占用额外的 GPU 内存（几 MB 到几十 MB） |
   | **图层管理开销**：过多的合成层会增加图层管理的 CPU 开销 |
   | **字体渲染问题**：某些情况下合成层的文字可能变模糊 |
   | **移动端更要谨慎**：移动设备的 GPU 内存有限，滥用会导致崩溃 |

5. **替代方案和最佳实践**：
   ```css
   /* 替代方案1：transform: translateZ(0) 触发 GPU 加速 */
   .gpu-accelerated {
     transform: translateZ(0); /* 创建合成层，无需 will-change */
   }
   
   /* 替代方案2：backface-visibility: hidden */
   .accelerated {
     backface-visibility: hidden; /* 也能创建合成层 */
   }
   
   /* 最佳实践：按需使用，及时清理 */
   .modal-overlay {
     /* 进入动画前添加 */
     will-change: transform, opacity;
   }
   .modal-overlay.is-visible {
     /* 动画完成后移除 */
     will-change: auto; /* 重置为默认值 */
   }
   ```

### 🔍 追问链
1. **will-change 和 CSS Containment 的区别？**
   → 方向：will-change 是提示浏览器"这个属性会变化"，提前创建合成层；Containment 是声明"这个元素的子树不会影响外部"，限制浏览器计算范围；两者可配合使用；Containment 更适合大型组件隔离
2. **如何检测 will-change 是否生效以及性能影响？**
   → 方向：Chrome DevTools Layers 面板查看合成层；Performance 面板查看 GPU 内存占用；过度使用会导致内存警告；使用 `document.elementsFromPoint()` 检查层叠顺序
3. **动画结束后是否需要移除 will-change？**
   → 方向：是的，应该及时移除（`will-change: auto`）；避免长期占用 GPU 内存；使用 JS 在动画开始前添加、结束后移除；或使用 CSS 类名控制（`.animate { will-change: transform; }`）

---

## Q22: CSS Containment 是什么？有什么好处？
- **难度**：★★☆
- **知识点**：CSS Containment / 渲染性能 / 浏览器优化
- **题型**：简答题

### 参考答案要点：

1. **CSS Containment 的定义**：
   **CSS Containment（CSS 包含）是一组 CSS 属性，允许开发者声明某个元素及其内容的独立性**。浏览器可以利用这些信息**将页面划分为独立的"区域"，限制样式计算、布局、绘制的范围**，从而**避免整个页面的重新计算**，显著提升复杂页面的渲染性能。

2. **四种 containment 类型**：
   ```css
   /* 1. size containment（尺寸包含）
      告诉浏览器：这个元素的尺寸不受内部内容影响
      浏览器可以跳过对该元素内部的布局计算 */
   .widget {
     contain: size;
     width: 200px;
     height: 200px;
     /* 必须设置明确的宽高，否则内容不可见 */
   }
   
   /* 2. layout containment（布局包含）
      告诉浏览器：该元素的布局不影响外部，外部的布局也不影响它
      浏览器可以孤立地计算该元素的布局 */
   .isolated-component {
     contain: layout;
   }
   
   /* 3. paint containment（绘制包含）
      告诉浏览器：该元素的内容不会绘制到边界之外（类似 overflow:hidden + clip）
      浏览器可以跳过该元素外的绘制检查 */
   .clipped-card {
     contain: paint;
   }
   
   /* 4. style containment（样式包含）
      告诉浏览器：该元素的样式计数器等不影响外部
      用于 CSS 计数器的隔离 */
   .counter-isolated {
     contain: style;
   }
   
   /* 组合使用：strict（全部四种）*/
   .fully-contained {
     contain: strict; /* 等价于 contain: size layout paint style */
   }
   
   /* 组合使用：content（layout + paint + style，不含 size）*/
   .content-contained {
     contain: content; /* 最常用的组合 */
   }
   ```

3. **实际应用场景和性能收益**：
   ```html
   <!-- 场景1：大量独立的小部件/卡片 -->
   <style>
     .dashboard-widget {
       contain: content; /* 每个小部件独立渲染 */
       /* 当某个 widget 内部变化时，不需要重新计算其他 widget */
     }
   </style>
   <div class="dashboard">
     <div class="dashboard-widget">图表组件</div>
     <div class="dashboard-widget">列表组件</div>
     <div class="dashboard-widget">表格组件</div>
     <!-- 数百个 widget... -->
   </div>
   
   <!-- 场景2：社交媒体的时间线/Feed 流 -->
   <style>
     .feed-item {
       contain: strict; /* 每条推文完全独立 */
       margin-bottom: 16px;
     }
   </style>
   <div class="feed">
     <article class="feed-item">推文1</article>
     <article class="feed-item">推文2</article>
     <!-- 数千条推文... -->
   </div>
   
   <!-- 场景3：侧边栏/模态框等独立区域 -->
   <style>
     .sidebar {
       contain: layout paint; /* 侧边栏独立于主内容 */
     }
     .modal-backdrop {
       contain: strict; /* 模态框完全独立 */
     }
   </style>
   ```

4. **contain 与其他性能属性的配合**：
   ```css
   /* contain + will-change 的组合使用 */
   .animated-widget {
     contain: content;       /* 限制重排/重绘范围 */
     will-change: transform;  /* GPU 加速动画 */
   }
   
   /* contain 在框架组件中的应用 */
   /* React/Vue 的虚拟列表组件通常会自动添加 contain */
   .virtual-list-item {
     contain: strict; /* 每个列表项独立 */
   }
   ```

5. **浏览器兼容性和检测**：
   ```javascript
   // 检测浏览器是否支持 CSS Containment
   if (CSS.supports('contain', 'strict') || CSS.supports('contain', 'content')) {
     console.log('浏览器支持 CSS Containment');
   }
   /* 现代浏览器均已支持：Chrome 52+, Firefox 69+, Safari 15.4+ */
   ```

> 💡 **追问链预留位置**

---

## Q23: 如何检测和解决内存泄漏？
- **难度**：★★☆
- **知识点**：内存泄漏 / Chrome DevTools / 垃圾回收 / 运行时性能
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **前端内存泄漏的常见场景**：
   ```javascript
   // ==========================================
   // 泄漏场景1：意外的全局变量
   // ==========================================
   function leakGlobal() {
     leakedVar = '我是泄漏的全局变量'; // 没有 var/let/const，成为全局变量
     this.leakedAlso = '我也是';         // this 在非严格模式下指向 window
   }
   // 解决：使用 'use strict' 严格模式，或始终用 let/const 声明
   
   // ==========================================
   // 泄漏场景2：遗忘的定时器和回调
   // ==========================================
   function startPolling() {
     const data = new Array(100000).fill('大数据');
     setInterval(() => {
       console.log('轮询中...', data); // data 被闭包引用，永远无法释放
     }, 1000);
     // setInterval 返回的 ID 没有保存，无法 clearInterval
   }
   // 解决：组件销毁时清除定时器
   // useEffect(() => {
   //   const timer = setInterval(callback, 1000);
   //   return () => clearInterval(timer); // 清理
   // }, []);
   
   // ==========================================
   // 泄漏场景3：闭包持有 DOM 引用
   // ==========================================
   function createLeakyClosure() {
     const hugeData = new Array(100000).fill('大数据');
     const button = document.getElementById('bigButton');
     
     button.addEventListener('click', function() {
       console.log(hugeData); // 闭包引用了 hugeData
       // 即使 button 被移除，hugeData 也不会被释放
       // 因为事件监听器仍然持有对 hugeData 的引用
     });
   }
   // 解决：移除 DOM 时同时移除事件监听器
   // button.removeEventListener('click', handler);
   
   // ==========================================
   // 泄漏场景4：脱离 DOM 的引用
   // ==========================================
   const elements = [];
   function addAndRemove() {
     const div = document.createElement('div');
     document.body.appendChild(div);
     elements.push(div); // 保存引用
     
     // 后来移除了 DOM
     document.body.removeChild(div);
     // 但 elements 数组仍然持有引用 → DOM 节点无法被 GC
   }
   // 解决：移除 DOM 时同时清除引用
   // elements.splice(index, 1);
   
   // ==========================================
   // 泄漏场景5：console.log 保留引用
   // ==========================================
   function logLargeObject() {
     const largeObj = { data: new Array(100000).fill('x') };
     console.log(largeObj); // DevTools 控制台保留了对 largeObj 的引用
     // 即使函数执行完，largeObj 也不会被释放
     // 解决：生产环境移除 console.log，或使用结构化日志
   }
   
   // ==========================================
   // 泄漏场景6：Map/Set 的键/值未清理
   // ==========================================
   const userCache = new Map();
   function cacheUser(user) {
     userCache.set(user.id, user); // 以对象作为值
     // 如果 user 对象不再需要但没有 delete，就会泄漏
   }
   // 解决：使用 WeakMap（弱引用，GC时可自动回收）
   const weakUserCache = new WeakMap();
   function cacheUserWeak(user) {
     weakUserCache.set(user, user); // 弱引用，user 可被正常 GC
   }
   
   // ==========================================
   // 泄漏场景7：事件总线/发布订阅未取消订阅
   // ==========================================
   class EventBus {
     constructor() {
       this.listeners = {};
     }
     on(event, callback) {
       if (!this.listeners[event]) this.listeners[event] = [];
       this.listeners[event].push(callback);
     }
     // off 方法缺失或未调用！
   }
   // 解决：组件卸载时调用 off 取消订阅
   ```

2. **内存泄漏的检测工具和方法**：
   ```javascript
   // 方法1：使用 performance.memory API（仅 Chrome）
   function checkMemory() {
     if (performance.memory) {
       console.log('JS 堆大小:', (performance.memory.usedJSHeapSize / 1048576).toFixed(2), 'MB');
       console.log('JS 堆限制:', (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2), 'MB');
     }
   }
   
   // 方法2：手动触发 GC 后观察（DevTools 中操作）
   // 1. 打开 Chrome DevTools → Memory 面板
   // 2. 选择 "Heap snapshot"
   // 3. 点击 Take snapshot（拍摄快照）
   // 4. 执行一些操作（打开/关闭页面、切换路由等）
   // 5. 再次拍摄快照
   // 6. 对比两次快照：#Delta 列显示新增的对象
   // 7. 关注 retained size（保留大小）大的对象
   
   // 方法3：Allocation instrumentation on timeline（分配时间线）
   // 1. Memory 面板 → 选择 "Allocation instrumentation on timeline"
   // 2. 执行操作，观察蓝色柱状图（内存分配情况）
   // 3. 手动触发 GC（垃圾桶图标）
   // 4. 如果柱状图不下降说明有泄漏
   
   // 方法4：Performance 面板录制
   // 1. Performance 面板 → 录制
   // 2. 执行操作
   // 3. 查看 Memory Timeline 和 Document Nodes
   // 4. 观察 DOM 节点数量是否持续增长
   ```

3. **内存泄漏排查流程**：
   ```
   1. 复现问题：找到具体的操作路径（如反复打开/关闭某弹窗 10 次）
   2. 基线测量：打开 DevTools Memory，拍摄 Heap Snapshot 作为基线
   3. 执行操作：重复可疑的操作
   4. 强制 GC：点击 DevTools 的垃圾桶图标
   5. 再次拍摄快照
   6. 对比分析：
      - 使用 Summary 视图看总体内存变化
      - 使用 Comparison 视图对比两次快照的差异
      - 使用 Retainers 视图追踪对象的引用链
   7. 定位根因：找到谁在引用本应被回收的对象
   8. 修复验证：修复后重复上述步骤确认泄漏消失
   ```

> 💡 **追问链预留位置**

---

## Q24: Web Worker 的使用场景和限制？
- **难度**：★★☆
- **知识点**：Web Worker / 多线程 / 长任务优化 / 并行计算
- **题型**：简答题 + 编程实践题

### 参考答案要点：

1. **Web Worker 的核心价值**：
   **Web Worker 允许在后台线程中运行 JavaScript 脚本**，**不阻塞主线程（UI 线程）**。这对于**执行耗时计算、处理大量数据**等场景至关重要，可以保持页面的流畅响应。

   ```
   主线程（UI Thread）          Worker 线程
   ┌──────────────────┐       ┌──────────────────┐
   │ 渲染 UI          │       │                  │
   │ 处理用户交互      │◀──postMessage──│ 复杂计算         │
   │ 执行 JS          │──postMessage──▶│ 数据处理         │
   │ 响应滚动/点击     │       │ 文件解析/加密     │
   │ ...              │       │ ...              │
   └──────────────────┘       └──────────────────┘
   互不阻塞！并行执行！
   ```

2. **Web Worker 的使用示例**：
   ```javascript
   // ============================================
   // worker.js - Worker 线程中的代码
   // ============================================
   
   // 监听来自主线程的消息
   self.onmessage = function(e) {
     const { type, data } = e.data;
     
     switch (type) {
       case 'COMPUTE_FIBONACCI':
         const result = fibonacci(data.n);
         // 将结果发送回主线程
         self.postMessage({ type: 'FIBONACCI_RESULT', result });
         break;
         
       case 'PROCESS_LARGE_ARRAY':
         const processed = processArray(data.array, data.filterFn);
         self.postMessage({ type: 'ARRAY_PROCESSED', data: processed });
         break;
         
       case 'PARSE_JSON':
         try {
           const parsed = JSON.parse(data.jsonString);
           self.postMessage({ type: 'PARSE_SUCCESS', data: parsed });
         } catch (error) {
           self.postMessage({ type: 'PARSE_ERROR', error: error.message });
         }
         break;
     }
   };
   
   // 计算斐波那契数列（CPU 密集型任务）
   function fibonacci(n) {
     if (n <= 1) return n;
     let a = 0, b = 1;
     for (let i = 2; i <= n; i++) {
       [a, b] = [b, a + b];
     }
     return b;
   }
   
   // 处理大型数组
   function processArray(array, filterFn) {
     return array.filter(filterFn).map(item => ({
       ...item,
       processed: true,
       timestamp: Date.now()
     }));
   }
   
   // ============================================
   // main.js - 主线程中使用 Worker
   // ============================================
   
   // 创建 Worker
   const worker = new Worker('./worker.js');
   
   // 监听 Worker 的消息
   worker.onmessage = function(e) {
     const { type, result, data, error } = e.data;
     
     switch (type) {
       case 'FIBONACCI_RESULT':
         console.log('斐波那契计算结果:', result);
         updateUI(result);
         break;
         
       case 'ARRAY_PROCESSED':
         console.log('数组处理完成，共', data.length, '条');
         renderTable(data);
         break;
         
       case 'PARSE_ERROR':
         console.error('JSON 解析失败:', error);
         showErrorToUser(error);
         break;
     }
   };
   
   // Worker 错误处理
   worker.onerror = function(e) {
     console.error('Worker 错误:', e.message);
   };
   
   // 向 Worker 发送任务
   function computeFibonacci(n) {
     worker.postMessage({ type: 'COMPUTE_FIBONACCI', data: { n } });
     // 主线程不会被阻塞！用户可以继续操作 UI
   }
   
   function processBigData(array) {
     worker.postMessage({
       type: 'PROCESS_LARGE_ARRAY',
       data: { array, filterFn: item => item.value > 100 }
     });
   }
   
   // 组件卸载时终止 Worker
   function cleanup() {
     worker.terminate(); // 立即终止 Worker 线程
   }
   ```

3. **Web Worker 的主要限制**：
   | 限制 | 说明 | 解决方案 |
   |------|------|---------|
   | **无法访问 DOM** | 不能操作 `document`、`window`、`parent` | 通过 postMessage 传递数据，主线程负责 DOM 操作 |
   | **无法访问部分 API** | `localStorage`、`sessionStorage`、`cookie` | 主线程读取后传递给 Worker |
   | **同源限制** | Worker 脚本必须与主线程同源 | 使用 Blob URL 或 CORS |
   | **通信开销** | 数据通过结构化克隆（structured clone）传递，大对象复制开销大 | 使用 Transferable Objects（零拷贝传输） |
   | **调试困难** | DevTools 对 Worker 的支持不如主线程完善 | Chrome DevTools Sources 面板可查看 Worker |
   | **启动开销**：创建 Worker 有一定的初始化成本 | 对于极小任务可能不划算 |

4. **Transferable Objects（可转移对象）—— 零拷贝传输**：
   ```javascript
   // 主线程
   const largeBuffer = new ArrayBuffer(1024 * 1024 * 100); // 100MB 数据
 
   // 普通传递：复制一份（慢，双倍内存）
   worker.postMessage({ buffer: largeBuffer }); // 复制 100MB
 
   // Transferable 传递：转移所有权（快，零拷贝）
   worker.postMessage({ buffer: largeBuffer }, [largeBuffer]);
   // largeBuffer 在主线程中变为不可用（length = 0）
   // Worker 接收后获得所有权，无需复制
 
   // 支持的类型：ArrayBuffer、MessagePort、ImageBitmap、OffscreenCanvas
   ```

5. **适用场景总结**：
   - ✅ **大规模数据处理**：排序、过滤、聚合百万级数据
   - ✅ **加密/解密**：AES、RSA 等加密运算
   - ✅ **文件处理**：解析 CSV/Excel、图片压缩、视频转码
   - ✅ **复杂数学运算**：物理引擎、3D 计算、机器学习推理
   - ✅ **语法高亮**：大文件的代码高亮处理
   - ❌ **简单的 UI 交互**：过度使用会增加复杂性

> 💡 **追问链预留位置**

---

## Q25: requestAnimationFrame 和 setTimeout 的区别？
- **难度**：★★☆
- **知识点**：rAF / setTimeout / 动画帧 / 渲染循环
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **核心区别对比**：
   | 维度 | `requestAnimationFrame` (rAF) | `setTimeout` / `setInterval` |
   |------|------|------|
   | **执行时机** | **下一次浏览器重绘之前** | **指定延迟后**（与渲染周期无关） |
   | **频率** | **与屏幕刷新率同步**（通常 60fps/120fps，即 ~16.6ms/8.3ms） | **取决于设定的延迟值** |
   | **精度** | **高**（自动适配显示器刷新率） | **低**（受限于最小精度 ~4ms，且可能漂移） |
   | **后台行为** | **页面不可见时暂停执行**（省电） | **继续执行**（浪费资源） |
   | **适用场景** | **动画、视觉变化、滚动效果** | **定时任务、延时操作、轮询** |
   | **GPU/VSync 同步** | **自动同步**（避免画面撕裂） | **不同步**（可能导致掉帧） |

2. **rAF 的工作原理**：
   ```
   浏览器渲染循环（Rendering Loop）：
   
   ┌──────────────────────────────────────────────────────┐
   │  Event Loop                                          │
   │  ┌──────────┐  ┌──────────┐  ┌────────────────────┐  │
   │  │ 执行宏任务 │→│ 执行微任务 │→│ rAF 回调队列        │  │
   │  │ (setTimeout│  │ (Promise │  │ (requestAnimFrame) │  │
   │  │  等)      │  │  等)     │  │  ← 在这里执行！    │  │
   │  └──────────┘  └──────────┘  └────────┬───────────┘  │
   │                                      │               │
   │                                      ▼               │
   │                        ┌─────────────────────────┐   │
   │                        │  浏览器渲染（Layout →    │   │
   │                        │  Paint → Composite）     │   │
   │                        │  ≈ 16.6ms (60Hz)         │   │
   │                        └─────────────────────────┘   │
   └──────────────────────────────────────────────────────┘
   
   rAF 的回调恰好在每一次渲染之前执行，
   所以动画的每一帧都能赶上浏览器的绘制周期。
   ```

3. **代码对比示例**：
   ```javascript
   // ==========================================
   // 方式1：使用 requestAnimationFrame 做动画（✅ 推荐）
   // ==========================================
   function animateWithRAF(element, targetOpacity) {
     let startTime = null;
     
     function step(timestamp) {
       if (!startTime) startTime = timestamp;
       const progress = (timestamp - startTime) / 1000; // 动画时长 1秒
       
       if (progress < 1) {
         // 使用缓动函数使动画更自然
         const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
         element.style.opacity = easeProgress * targetOpacity;
         // 请求下一帧
         requestAnimationFrame(step);
       } else {
         element.style.opacity = targetOpacity; // 确保最终值准确
       }
     }
     
     requestAnimationFrame(step);
   }
   
   // ==========================================
   // 方式2：使用 setTimeout 做动画（❌ 不推荐）
   // ==========================================
   function animateWithSetTimeout(element, targetOpacity) {
     let startTime = null;
     const interval = 16; // 约 60fps
     
     function step() {
       if (!startTime) startTime = Date.now();
       const progress = (Date.now() - startTime) / 1000;
       
       if (progress < 1) {
         element.style.opacity = progress * targetOpacity;
         setTimeout(step, interval);
         // 问题：
         // 1. 16ms 只是近似值，实际可能 16.7ms 或 15.8ms
         // 2. 可能与浏览器渲染周期不同步 → 掉帧或卡顿
         // 3. 页面不可见时仍执行 → 浪费 CPU
       } else {
         element.style.opacity = targetOpacity;
       }
     }
     
     setTimeout(step, interval);
   }
   
   // ==========================================
   // 方式3：rAF 的节流用法（✅ 常见实用技巧）
   // ==========================================
   // 用 rAF 实现高性能的 scroll/resize 监听
   function createRAFThrottle(callback) {
     let rafId = null;
     let lastArgs = null;
     
     return function(...args) {
       lastArgs = args;
       if (rafId === null) {
         rafId = requestAnimationFrame(() => {
           rafId = null;
           callback.apply(this, lastArgs);
         });
       }
     };
   }
   
   // 使用：滚动事件监听（比 setTimeout 节流更精准）
   const handleScroll = createRAFThrottle((e) => {
     const y = window.scrollY;
     updateParallax(y);
     updateNavbar(y);
   });
   
   window.addEventListener('scroll', handleScroll);
   ```

4. **rAF 的高级用法和注意事项**：
   ```javascript
   // 1. 取消 rAF（类似 clearTimeout）
   const rafId = requestAnimationFrame(animationLoop);
   cancelAnimationFrame(rafId); // 取消
   
   // 2. rAF 的兼容性 polyfill
   window.requestAnimationFrame = window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     function(callback) {
       return setTimeout(callback, 16); // 降级到 setTimeout
     };
   
   // 3. 使用 rAF 处理 Canvas 绘制
   function drawCanvas(ctx) {
     function render() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       // 绘制逻辑...
       particles.forEach(p => p.update());
       particles.forEach(p => p.draw(ctx));
       requestAnimationFrame(render); // 循环
     }
     render();
   }
   
   // 4. 注意：rAF 不是实时系统
   // 如果主线程被长任务阻塞，rAF 也会被延迟
   // 所以要避免在 rAF 回调中执行耗时操作
   ```

> 💡 **追问链预留位置**

---

## Q26: 大列表渲染的性能瓶颈在哪里？有哪些解决方案？
- **难度**：★★☆
- **知识点**：大列表渲染 / 虚拟列表 / 时间切片 / React 性能
- **题型**：综合简答题

### 参考答案要点：

1. **大列表渲染的性能瓶颈分析**：
   ```
   渲染 10000 条列表数据的性能瓶颈分解：
   
   瓶颈1：DOM 节点数量爆炸
   ├── 10000 个 <li>/<div> 节点
   ├── 每个节点都有内存占用（~1KB/节点）
   └── 总计：~10MB 仅用于 DOM 节点（不含数据）
   
   瓶颈2：JavaScript 执行时间长
   ├── 创建 10000 个 React/Vue 组件实例
   ├── diff 算法比较新旧 Virtual DOM
   └── 可能触发 Long Task (>50ms)，导致页面卡顿
   
   瓶颈3：内存占用过高
   ├── 组件实例 + props + state
   ├── 事件监听器绑定
   └── 可能导致低端机 OOM（内存不足）
   
   瓶颈4：初始渲染白屏时间长
   ├── 同步渲染 10000 个节点
   ├── 主线程被长时间占用
   └── 用户看到白屏时间 > 3s
   ```

2. **分层解决方案（从易到难）**：
   ```
   Layer 1: 基础优化（低成本，快速见效）
   ├── 使用 key 属性（React/Vue 的 key 要稳定唯一）
   ├── 避免 inline 函数定义（每次渲染创建新函数）
   ├── 使用 shouldComponentUpdate / React.memo / v-memo
   ├── 减少 state 更新粒度（批量更新）
   └── 冻结不变数据（Object.freeze）
   
   Layer 2: 架构优化（中等成本，效果显著）
   ├── 虚拟列表（Virtual Scroll）—— 最核心的方案
   ├── 分页加载（Pagination）—— 最传统的方案
   ├── 无限滚动（Infinite Scroll）—— 结合分页
   └── 时间切片（Time Slicing）—— 分批渲染
   
   Layer 3: 深度优化（高成本，极致性能）
   ├── Web Worker 渲染（离线 DOM）
   ├── Canvas/WebGL 渲染（绕过 DOM）
   ├── 离屏渲染（OffscreenCanvas）
   └── WASM 加速数据处理
   ```

3. **具体方案详细说明**：
   ```javascript
   // ==========================================
   // 方案1：虚拟列表（Virtual Scroll）—— 首选方案
   // ==========================================
   // 原理：只渲染可视区域 + 少量缓冲区的列表项
   // 效果：10000 条数据只渲染 ~20 个 DOM 节点
   // 库推荐：@tanstack/react-virtual, react-window, vue-virtual-scroller
   // 详见 Q20 的完整实现
   
   // ==========================================
   // 方案2：分页（Pagination）
   // ==========================================
   // 原理：每次只渲染一页的数据（如 20 条/页）
   // 优点：实现简单，兼容性好
   // 缺点：用户需要手动翻页，体验不如无限滚动
   
   function PaginatedList({ data, pageSize = 20 }) {
     const [page, setPage] = useState(1);
     const start = (page - 1) * pageSize;
     const end = start + pageSize;
     const currentData = data.slice(start, end);
     const totalPages = Math.ceil(data.length / pageSize);
     
     return (
       <div>
         {currentData.map(item => <ListItem key={item.id} data={item} />)}
         <Pagination page={page} total={totalPages} onChange={setPage} />
       </div>
     );
   }
   
   // ==========================================
   // 方案3：时间切片（Time Slicing / Chunked Rendering）
   // ==========================================
   // 原理：将大量渲染任务拆分成小块，分散到多个宏任务中执行
   // 效果：避免 Long Task，保持页面响应
   
   async function renderInChunks(items, renderFn, chunkSize = 20) {
     for (let i = 0; i < items.length; i += chunkSize) {
       const chunk = items.slice(i, i + chunkSize);
       renderFn(chunk); // 渲染这一批
       
       // 让出主线程，给浏览器处理用户交互的机会
       await new Promise(resolve => requestAnimationFrame(resolve));
       // 或者使用 scheduler.yield()（实验性 API）
     }
   }
   
   // React 18 的 useTransition 也可以实现类似效果
   import { useTransition } from 'react';
   
   function LargeList({ items }) {
     const [isPending, startTransition] = useTransition();
     const [displayedItems, setDisplayedItems] = useState([]);
     
     useEffect(() => {
       startTransition(() => {
         // 低优先级更新，不会阻塞用户交互
         setDisplayedItems(items);
       });
     }, [items]);
     
     return isPending ? <Skeleton /> : displayedItems.map(/*...*/);
   }
   
   // ==========================================
   // 方案4：Web Worker 渲染（高级方案）
   // ==========================================
   // 原理：在 Worker 线程中构建 HTML 字符串，传回主线程一次性 innerHTML
   // 效果：完全不阻塞主线程
   
   // worker.js
   self.onmessage = function(e) {
     const { data, template } = e.data;
     let html = '';
     for (const item of data) {
       html += template
         .replace('{{id}}', item.id)
         .replace('{{name}}', item.name)
         .replace('{{value}}', item.value);
     }
     self.postMessage({ html });
   };
   
   // main.js
   function renderWithWorker(data) {
     const worker = new Worker('./render-worker.js');
     worker.onmessage = (e) => {
       container.innerHTML += e.data.html; // 一次性插入
       worker.terminate();
     };
     worker.postMessage({
       data,
       template: '<li id="{{id}}">{{name}}: {{value}}</li>'
     });
   }
   ```

4. **方案选型决策树**：
   ```
   需要渲染大量列表数据？
   │
   ├─ 数据量 < 200 条？
   │   └─ 直接渲染 + 基础优化（memo/key/freeze）
   │
   ├─ 数据量 200 - 10000 条？
   │   ├─ 需要全部展示在一屏内？
   │   │   └─ 虚拟列表（首选）
   │   └─ 可以分页/分段查看？
   │       └─ 分页 or 无限滚动 + 虚拟列表
   │
   └─ 数据量 > 10000 条？
       ├─ 需要复杂的交互（排序/筛选/编辑）？
       │   └─ 虚拟列表 + Web Worker 处理数据
       └─ 只读展示？
           └─ Canvas 渲染（极致性能）
   ```

> 💡 **追问链预留位置**

---

## Q27: 如何优化长任务的执行？
- **难度**：★★☆
- **知识点**：Long Task / 主线程阻塞 / 时间切片 / Scheduler API
- **题型**：简答题 + 编程实践题

### 参考答案要点：

1. **长任务（Long Task）的定义和危害**：
   - **Long Task**：执行时间**超过 50 毫秒**的任务（这是 Google 定义的标准）
   - **危害**：在长任务执行期间，**主线程完全被占用**，用户的**所有交互（点击、输入、滚动）都会被延迟响应**，造成页面"卡顿"甚至"假死"
   - **来源**：大量的 DOM 操作、复杂计算、大 JSON 解析、同步 XHR、第三方脚本等

2. **长任务的检测**：
   ```javascript
   // 使用 Performance Observer 检测 Long Task
   if ('PerformanceObserver' in window) {
     const longTaskObserver = new PerformanceObserver((list) => {
       for (const entry of list.getEntries()) {
         console.log(`⚠️ 长任务检测到:`);
         console.log(`   持续时间: ${entry.duration.toFixed(0)}ms`);
         console.log(`   名称: ${entry.name}`);
         console.log(`   开始时间: ${entry.startTime.toFixed(0)}ms`);
         console.log(`   来源: ${entry.attribution?.[0]?.containerType}`);
         console.log(`   容器名称: ${entry.attribution?.[0]?.containerName}`);
         
         // 可以上报给监控系统
         reportLongTask({
           duration: entry.duration,
           name: entry.name,
           attribution: entry.attribution
         });
       }
     });
     
     // 监听 longtask 类型
     longTaskObserver.observe({ entryTypes: ['longtask'] });
   }
   ```

3. **长任务的优化策略**：
   ```javascript
   // ==========================================
   // 策略1：时间切片（Time Slicing / Yielding）
   // ==========================================
   // 将一个大任务拆分成多个小任务，每个小任务执行后让出主线程
   
   async function runTasksInChunks(tasks, chunkSize = 5) {
     for (let i = 0; i < tasks.length; i += chunkSize) {
       const chunk = tasks.slice(i, i + chunkSize);
       
       // 执行一小批任务
       chunk.forEach(task => task.execute());
       
       // 让出主线程，等待下一帧
       await yieldToMain(); // 见下面的实现
     }
   }
   
   // 通用的"让出主线程"函数
   function yieldToMain() {
     // 方式1：使用 scheduler.yield()（最新 API，Chrome 115+）
     if ('scheduler' in window && 'yield' in scheduler) {
       return scheduler.yield(); // 最优解，优先级感知
     }
     
     // 方式2：使用 requestIdleCallback（兼容性好）
     if ('requestIdleCallback' in window) {
       return new Promise(resolve =>
         requestIdleCallback(resolve, { timeout: 100 })
       );
     }
     
     // 方式3：使用 setTimeout + messageChannel（兜底方案）
     return new Promise(resolve => {
       const channel = new MessageChannel();
       channel.port1.onmessage = () => resolve();
       channel.port2.postMessage(null); // 比 setTimeout 更准时
       // setTimeout(resolve, 0); // 也可以，但有 4ms 最小延迟
     });
   }
   
   // 使用示例：处理 10000 条数据
   const bigDataSet = generateData(10000);
   
   async function processData() {
     console.time('数据处理');
     
     for (let i = 0; i < bigDataSet.length; i += 100) {
       const batch = bigDataSet.slice(i, i + 100);
       
       // 处理这一批数据
       batch.forEach(item => {
         processItem(item); // 假设这是一个耗时操作
       });
       
       // 每 100 条让出一次主线程
       await yieldToMain();
     }
     
     console.timeEnd('数据处理');
     console.log('处理完成！');
   }
   
   processData();
   
   // ==========================================
   // 策略2：Web Worker（将任务移出主线程）
   // ==========================================
   // 详见 Q24 的 Web Worker 部分
   // 核心思路：将纯计算任务放到 Worker 中执行
   
   // ==========================================
   // 策略3：requestIdleCallback（空闲时执行）
   // ==========================================
   // 利用浏览器的空闲时间执行非紧急任务
   
   function scheduleNonUrgentWork(workFn) {
     if ('requestIdleCallback' in window) {
       requestIdleCallback(
         (deadline) => {
           // deadline.timeRemaining() 返回剩余空闲时间（ms）
           while (deadline.timeRemaining() > 0 || deadline.didTimeout) {
             if (!workFn()) break; // workFn 返回 false 表示没有更多工作了
           }
           // 如果还有剩余工作，继续调度
           if (workFn.hasMoreWork()) {
             scheduleNonUrgentWork(workFn);
           }
         },
         { timeout: 2000 } // 超时时间，确保最终会执行
       );
     } else {
       // 降级到 setTimeout
       setTimeout(workFn, 1);
     }
   }
   
   // 使用示例：发送分析数据（不阻塞用户交互）
   scheduleNonUrgentWork({
     hasMoreWork: () => analyticsQueue.length > 0,
     execute: () => {
       if (analyticsQueue.length === 0) return false;
       const data = analyticsQueue.shift();
       sendAnalytics(data);
       return true;
     }
   }.execute.bind({
     hasMoreWork: () => analyticsQueue.length > 0,
     execute: function() {
       if (analyticsQueue.length === 0) return false;
       sendAnalytics(analyticsQueue.shift());
       return true;
     }
   }));
   
   // ==========================================
   // 策略4：isInputPending（React 18 的核心优化）
   // ==========================================
   // 检测是否有待处理的用户输入，如有则让出主线程
   
   async function processWithInputCheck(tasks) {
     for (const task of tasks) {
       task.execute();
       
       // 检测是否有用户输入在等待
       if ('scheduler' in window && 'isInputPending' in scheduler) {
         if (scheduler.isInputPending()) {
           await yieldToMain(); // 有输入等待，让出主线程
         }
       } else {
         // 降级：每隔几个任务就让出一次
         await yieldToMain();
       }
     }
   }
   ```

4. **长任务优化的最佳实践清单**：
   | 优化手段 | 适用场景 | 实现难度 | 效果 |
   |---------|---------|---------|------|
   | **时间切片** | 可拆分的批量操作 | 中 | ⭐⭐⭐⭐⭐ |
   | **Web Worker** | 纯计算任务 | 中 | ⭐⭐⭐⭐⭐ |
   | **requestIdleCallback** | 非紧急的后台任务 | 低 | ⭐⭐⭐⭐ |
   | **isInputPending** | 需要保持交互响应 | 中 | ⭐⭐⭐⭐ |
   | **代码分割 + 懒加载** | 大型 JS 包 | 低 | ⭐⭐⭐⭐ |
   | **避免同步 XHR** | 网络请求 | 低 | ⭐⭐⭐⭐⭐ |

> 💡 **追问链预留位置**

---

## Q28: HTTP/2 相比 HTTP/1.1 有哪些性能提升？
- **难度**：★★☆
- **知识点**：HTTP/2 / HTTP/1.1 / 网络协议 / 多路复用
- **题型**：简答题

### 参考答案要点：

1. **HTTP/2 的核心改进**：
   | 特性 | HTTP/1.1 | HTTP/2 | 性能提升 |
   |------|----------|--------|---------|
   | **多路复用** | ❌ 每个域名约 6 个 TCP 连接（并发限制） | ✅ **单个 TCP 连接上并行多个请求** | **消除队头阻塞，连接数减少 80%+** |
   | **头部压缩** | ❌ 纯文本头部，重复发送 | ✅ **HPACK 算法压缩头部** | **头部体积减少 50-85%** |
   | **服务端推送** | ❌ 不支持 | ✅ **服务器主动推送资源** | **减少一个 RTT** |
   | **二进制分帧** | ❌ 文本协议 | ✅ **二进制协议，解析更高效** | **解析性能提升** |
   | **请求优先级** | ❌ FIFO（先进先出） | ✅ **可设置依赖关系和优先级** | **关键资源优先加载** |

2. **多路复用的革命性意义**：
   ```
   HTTP/1.1 的问题 —— 队头阻塞（Head-of-Line Blocking）：
   
   浏览器对同一域名最多建立 6 个 TCP 连接
   ┌─────────────────────────────────────────────┐
   │  TCP Connection 1                           │
   │  [请求1 ████████████████████ 响应1]  等待...  │ ← 请求2 必须等请求1完成
   │  [请求2 ████ 响应2]                          │
   ├─────────────────────────────────────────────┤
   │  TCP Connection 2                           │
   │  [请求3 ██████████████████████████ 响应3]    │
   │  [请求4 等待...]                             │
   ├─────────────────────────────────────────────┤
   │  TCP Connection 3-6 ...                     │
   └─────────────────────────────────────────────┘
   问题：大响应会阻塞后面的请求！
   
   HTTP/2 的解决方案 —— 多路复用：
   
   单个 TCP 连接，多个 Stream 并行
   ┌─────────────────────────────────────────────┐
   │  TCP Connection (Multiplexed)               │
   │                                             │
   │  Stream 1: [req1][====res1====]             │
   │  Stream 2:     [req2][==res2==]              │  ← 互不阻塞！
   │  Stream 3:       [req3][=======res3=======]  │
   │  Stream 4:         [req4][=res4=]            │
   │  Stream 5:           [req5][====res5====]    │
   │  ...更多 Stream 并行...                      │
   └─────────────────────────────────────────────┘
   一个连接搞定所有请求！
   ```

3. **HPACK 头部压缩原理**：
   ```
   HTTP/1.1 的头部问题：
   GET /index.html HTTP/1.1\r\n
   Host: example.com\r\n
   User-Agent: Mozilla/5.0 ...\r\n
   Accept: text/html\r\n
   Accept-Language: zh-CN\r\n
   Accept-Encoding: gzip, deflate\r\n
   Cookie: session=abc123\r\n
   \r\n
   
   → 每个请求都要发送 ~500-800 bytes 的头部！
   → 同一个页面加载可能发送几十个请求
   → 大量重复字段（Host、Cookie、User-Agent 等）
   
   HTTP/2 的 HPACK 压缩：
   1. 静态字典：包含常见头部字段（Host、Method 等）→ 只需发送索引号
   2. 动态字典：在连接期间积累的头部 → 后续请求只需发送差量
   3. Huffman 编码：对头部值进行压缩
   
   结果：原本 800 bytes 的头部可能压缩到 ~100 bytes！
   ```

4. **启用 HTTP/2 的方法**：
   ```nginx
   # Nginx 启用 HTTP/2
   server {
     listen 443 ssl http2;  // 添加 http2 即可
     server_name example.com;
     
     ssl_certificate /path/to/cert.pem;
     ssl_certificate_key /path/to/key.pem;
     
     # 推荐同时启用 HTTP/2 Server Push
     location /index.html {
       http2_push /styles/main.css;
       http2_push /js/main.js;
     }
   }
   ```
   - **前提条件**：必须使用 **HTTPS**（HTTP/2 要求加密连接）
   - **现代 CDN 默认支持**：Cloudflare、阿里云 CDN 等默认启用 HTTP/2
   - **Node.js**：`spdy` 或原生 `http2` 模块

5. **HTTP/3（QUIC）—— 下一代**：
   - 基于 **UDP** 而非 TCP，彻底解决 **TCP 层面的队头阻塞**
   - **0-RTT 连接建立**（相比 HTTP/2 的 2-3 RTT）
   - **连接迁移**：网络切换（WiFi→4G）不断连
   - **目前已在 Chrome、Firefox 等浏览器广泛支持**

> 💡 **追问链预留位置**

---

## Q29: 图片格式选择策略（JPEG/PNG/WebP/AVIF 各自适用场景）
- **难度**：★★☆
- **知识点**：图片优化 / 图片格式 / WebP / AVIF / 响应式图片
- **题型**：简答题 + 场景设计题

### 参考答案要点：

1. **主流图片格式全面对比**：
   | 格式 | 类型 | 透明通道 | 动画 | 压缩率 | 浏览器支持 | 最佳场景 |
   |------|------|---------|------|--------|-----------|---------|
   | **JPEG** | 有损压缩 | ❌ | ❌ | 基准（100%） | ✅ 全支持 | **照片、复杂色彩图像** |
   | **PNG** | 无损压缩 | ✅ 8-bit | ❌ | 较大（JPEG的 3-5倍） | ✅ 全支持 | **截图、Logo、需要透明度的图像** |
   | **WebP** | 有损/无损 | ✅ 8-bit | ✅ | **比 JPEG 小 25-35%，比 PNG 小 26%** | ✅ 96%+ | **通用格式，大多数场景的首选** |
   | **AVIF** | 有损/无损 | ✅ 12-bit | ❌ | **比 WebP 再小 20-50%** | 🟡 91%+（2024+） | **高质量照片、艺术图像** |
   | **SVG** | 矢量图形 | ✅ | ✅ | 极小（代码） | ✅ 全支持 | **图标、Logo、简单插图** |
   | **GIF** | 有损（256色） | ✅ | ✅ | 极差（相同质量下最大） | ✅ 全支持 | **简单动画（正逐渐被替代）** |

2. **各格式的详细特性和选择策略**：
   ```
   JPEG（Joint Photographic Experts Group）
   ├── 优点：压缩率高、兼容性最好、适合照片
   ├── 缺点：无透明、有损压缩会产生伪影
   ├── 适用：摄影作品、Banner 图、背景图
   └── 优化建议：
      ├── 质量 75-85 是最佳平衡点（肉眼几乎看不出差异）
      ├── 使用 progressive JPEG（渐进式）
      └── 工具：imagemagick, mozjpeg, squoosh
   
   PNG（Portable Network Graphics）
   ├── 优点：无损压缩、支持透明、适合线条清晰的图像
   ├── 缺点：体积大（尤其是不透明的照片）
   ├── 适用：UI 元素、截图、Logo、需要透明背景的图
   └── 优化建议：
      ├── 使用 pngquant/APNG 优化
      ├── 尝试转换为 SVG（如果是矢量图）
      └── 如果不需要透明，考虑转为 WebP/JPEG
   
   WebP（Google 开发）
   ├── 优点：体积小、支持透明和动画、质量优秀
   ├── 缺点：老版 Safari/iOS 不支持（已基本解决）
   ├── 适用：**绝大多数 web 图片场景（通用首选）**
   └── 优化建议：
      ├── 有损模式 quality 80 左右
      ├── 无损模式用于 UI 截图
      └── 配合 <picture> 标签做降级
   
   AVIF（AOM Video Tech 开发，基于 AV1）
   ├── 优点：目前压缩率最高的格式
   ├── 缺点：编码速度慢、支持率还在增长中
   ├── 适用：高质量照片展示、艺术品、需要极致体积的场景
   └── 优化建议：
      ├── 用于 hero images、gallery 等重点图片
      ├── 配合 WebP 降级
      └── 编码工具：libavif, sharp, squoosh
   ```

3. **响应式图片的完整方案**：
   ```html
   <!-- 使用 picture 标签实现格式降级 + 响应式 -->
   <picture>
   <!-- AVIF（最优，现代浏览器）-->
   <source
     srcset="
       hero-small.avif  400w,
       hero-medium.avif  800w,
       hero-large.avif  1200w
     "
     sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
     type="image/avif"
   >
   
   <!-- WebP（次优，广泛支持）-->
   <source
     srcset="
       hero-small.webp  400w,
       hero-medium.webp  800w,
       hero-large.webp  1200w
     "
     sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
     type="image/webp"
   >
   
   <!-- JPEG（兜底，全兼容）-->
   <img
     src="hero-large.jpg"
     srcset="
       hero-small.jpg  400w,
       hero-medium.jpg  800w,
       hero-large.jpg  1200p
     "
     sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
     alt="Hero Image"
     loading="lazy"
     decoding="async"
     width="1200"
     height="600"
   >
   </picture>
   ```

4. **图片优化的自动化工具链**：
   ```javascript
   // 使用 sharp 进行图片优化（Node.js）
   const sharp = require('sharp');
   const path = require('path');
   
   async function optimizeImage(inputPath, outputPath) {
     await sharp(inputPath)
       .avif({ quality: 60, effort: 4 })  // 生成 AVIF
       .toFile(outputPath.replace(/\.\w+$/, '.avif'))
       .catch(() => {}); // AVIF 编码失败时忽略
     
     await sharp(inputPath)
       .webp({ quality: 80 })  // 生成 WebP
       .toFile(outputPath.replace(/\.\w+$/, '.webp'));
     
     await sharp(inputPath)
       .jpeg({ quality: 82, progressive: true })  // 生成渐进式 JPEG
       .toFile(outputPath.replace(/\.\w+$/, '.jpg'));
   }
   
   // 构建时自动生成多种格式
   // webpack/vite 插件：vite-plugin-imagemin, image-webpack-loader
   ```

5. **现代图片优化策略总结**：
   ```
   1. 格式优先级：AVIF > WebP > JPEG/PNG
   2. 始终使用 <picture> + <source> 做降级
   3. 响应式 srcset + sizes 适配不同屏幕
   4. loading="lazy" 懒加载非首屏图片
   5. 明确设置 width/height 避免布局偏移
   6. 使用 CDN 图片裁剪/格式转换 API
   7. 构建时自动优化（sharp/imagemin）
   8. 考虑使用模糊小图（BlurHash/LQIP）作为 placeholder
   ```

> 💡 **追问链预留位置**

---

## Q30: 字体加载优化的最佳实践？
- **难度**：★★☆
- **知识点**：字体优化 / FOIT / FOUT / font-display / 性能
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **字体加载的三大问题**：
   ```
   FOIT (Flash of Invisible Text) — 文本不可见闪烁
   ├── 自定义字体加载期间，文本完全不可见
   ├── 用户体验极差（看起来像页面坏了）
   └── 默认行为（不设置 font-display 时）
   
   FOUT (Flash of Unstyled Text) — 无样式文本闪烁
   ├── 先用系统字体显示文本，字体加载完成后突然变化
   ├── 体验较好但仍会有视觉跳动
   └── font-display: swap 的行为
   
   Layout Shift (布局偏移)
   ├── 自定义字体和系统字体的 metrics（宽度/高度）不同
   ├── 字体加载完成后文字重新排版，导致布局变化
   └── 影响 CLS 指标
   ```

2. **完整的字体优化方案**：
   ```html
   <!DOCTYPE html>
   <html lang="zh-CN">
   <head>
     <meta charset="UTF-8">
     
     <!-- ==================== 步骤1：预连接字体服务器 ==================== -->
     <!-- 节省 DNS + TCP + TLS 握手时间（约 100-300ms） -->
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     
     <!-- ==================== 步骤2：预加载关键字体文件 ==================== -->
     <!-- 只预加载首屏会用到的字体（不要预加载所有字体！） -->
     <link rel="preload" 
       as="font" 
       type="font/woff2" 
       href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_nVMorMxC5.woff2" 
       crossorigin>
     
     <!-- ==================== 步骤3：声明字体（带 font-display） ==================== -->
     <style>
       /* 方式A：使用 @font-face + font-display */
       @font-face {
         font-family: 'Inter';
         src: url('/fonts/inter-var.woff2') format('woff2');
         font-weight: 100 900; /* 可变字体支持所有字重 */
         font-display: swap; /* 关键！先显示后备字体，加载后替换 */
         font-style: normal;
         unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
       }
       
       /* 使用字体 */
       body {
         font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
         /* Inter 是理想字体，后面的是后备栈（Fallback Stack） */
       }
       
       /* 方式B：使用 Google Fonts（已内置优化） */
       /* Google Fonts 自动添加 font-display: swap 和 unicode-range */
       /* 但建议自行托管以获得更好控制 */
     </style>
     
     <!-- ==================== 步骤4：子集化字体（减少体积） ==================== -->
     <!-- 使用 pyftsubset 或 google fonts 子集化工具 -->
     <!-- 只保留页面实际使用的字符 -->
     <!-- 中文：常用汉字约 3500 个，全量中文字体 5-10MB → 子集化后 1-2MB -->
   </style>
   
   <!-- ==================== 步骤5：使用 Font Loading API 精细控制 ==================== -->
   <script>
   document.fonts.ready.then(() => {
     console.log('所有字体加载完成');
     document.documentElement.classList.add('fonts-loaded');
   });
   </script>
  </head>
  ```

3. **font-display 各值详解**：
   ```css
   @font-face {
     font-family: 'CustomFont';
     /* auto / block / swap / fallback / optional */
     font-display: swap; /* 最常用：先显示后备字体，加载后替换 */
   }
   ```

4. **中文字体优化特殊策略**：
   - 使用 `font-spider` 提取实际用到的汉字
   - 考虑使用系统默认中文字体栈（避免加载大体积自定义中文字体）

> 💡 **追问链预留位置**

---

## Q31: 如何设计一套完整的缓存策略？
- **难度**：★★☆
- **知识点**：缓存策略 / HTTP 缓存 / Service Worker / CDN
- **题型**：场景设计题

### 参考答案要点：

1. **分层缓存架构**：浏览器(Browser Cache) → CDN(Edge Cache) → 源站(Origin Cache)

2. **Nginx 完整配置要点**：
   - 带 hash 的静态资源：`Cache-Control: public, max-age=31536000, immutable`
   - 图片资源：`max-age=604800, stale-while-revalidate=86400`
   - HTML 文件：`no-cache`（协商缓存）
   - API 接口：`no-store, private`
   - SW 文件：`no-cache, no-store, must-revalidate`

3. **更新机制**：Content Hash（Webpack/Vite 的 `[contenthash]`）+ SW 版本管理 + CDN 刷新

> 💡 **追问链预留位置**

---

## Q32: 资源预加载（resource hints）的使用策略？
- **难度**：★★☆
- **知识点**：Resource Hints / preload / prefetch / preconnect
- **题型**：简答题 + 场景设计题

### 参考答案要点：

1. **决策树**：当前页关键资源→preload | 未来可能需要→prefetch | 仅需建立连接→preconnect/dns-prefetch

2. **最佳实践模板**：preconnect（最高优先级）→ preload 关键资源（第二优先级）→ prefetch 下一步路由（第三优先级）

3. **常见错误**：❌ preload 不必要的资源 ❌ 缺少 as 属性 ❌ 过度 prefetch 浪费带宽

> 💡 **追问链预留位置**

---

## Q33: 打包体积过大的排查思路和优化方案？
- **难度**：★★☆
- **知识点**：打包优化 / Bundle Analysis / Webpack / Vite
- **题型**：综合简答题

### 参考答案要点：

1. **排查工具**：webpack-bundle-analyzer、vite-bundle-visualizer、source-map-explorer

2. **常见原因及解决方案**：
   - 大库全量引入（lodash/moment.js）→ 按需引入或替代轻量方案
   - Moment.js 含全部语言包(~300KB) → 迁移到 dayjs(~2KB)
   - 图片/字体未优化 → file-loader 阈值 + CDN
   - 重复依赖 → resolve.alias 统一版本

3. **系统性流程**：测量→识别 Top N 大模块→针对性优化→设置预算→CI 门禁→持续监控

> 💡 **追问链预留位置**

---

## ★★★ 专家题（Q34-Q50）— 源码级深度、架构设计

---

## Q34: 设计一个前端性能监控系统，需要考虑哪些方面？
- **难度**：★★★
- **知识点**：性能监控 / SDK 设计 / 数据采集 / 上报体系
- **题型**：架构设计题

### 参考答案要点：

1. **整体架构**：数据采集层(SDK) → 数据处理层(Server) → 数据展示层(Dashboard)

2. **核心采集维度**：加载性能(LCP/FCP/TTFB/TTI/TBT)、运行性能(Long Task/Memory/FPS)、资源性能(Resource Timing)、错误监控(JS Error/Promise Rejection)、交互性能(INP)、视觉稳定性(CLS)

3. **关键技术决策**：
   - 上报方式：sendBeacon > Image > XHR
   - 采样策略：全量采(关键错误) + 概率采(普通性能数据)
   - 批量上报 + 多级降级

4. **SDK 核心结构**：初始化 → 采集 Core Web Vitals → Resource Timing → Long Tasks → 错误捕获 → Visibility Change 时上报

> 💡 **追问链预留位置**

---

## Q35: 如何建立性能预算体系并在 CI 中落地？
- **难度**：★★★
- **知识点**：性能预算 / CI/CD / Lighthouse CI / 自动化
- **题型**：架构设计题

### 参考答案要点：

1. **核心概念**：为性能指标设定量化上限，超出应被阻止或警告

2. **配置示例**：Core Web Vitals 预算（LCP ≤2500warn/4000error）+ 资源体积预算（JS≤300KB/CSS≤100KB/总资源≤1MB）+ 数量限制（maxScripts/maxDomElements）

3. **CI 落地**：GitHub Actions + Lighthouse CI → PR 自动跑测试 → 断言检查 → PR Comment 展示结果

4. **运营流程**：建立基线(P75/P90) → CI门禁 → 月度回顾 → 团队文化(Code Review关注性能)

> 💡 **追问链预留位置**

---

## Q36: SSR/SSG/ISR 对于性能优化的意义和取舍？
- **难度**：★★★
- **知识点**：SSR / SSG / ISR / 渲染模式选型 / Next.js
- **题型**：综合简答题

### 参考答案要点：

1. **对比**：CSR(慢/无SEO) vs SSR(快/SEO好/服务器成本高) vs SSG(最快/零成本/内容需稳定) vs ISR(SSG速度+SSR灵活性)

2. **选型决策树**：高度个性化→CSR | 稳定且页少→SSG | 页多但稳定→ISR | 实时性高→SSR

3. **混合渲染**：Next.js 可在同一应用混用 getStaticProps/getServerSideProps/revalidate + 组件级 CSR

> 💡 **追问链预留位置**

---

## Q37: 微前端架构下的性能挑战和优化策略？
- **难度**：★★★
- **知识点**：微前端 / qiankun / Module Federation
- **题型**：架构设计题

### 参考答案要点：

1. **四大挑战**：①资源冗余(框架重复加载) ②初始化开销 ③运行时损耗 ④CSS冲突

2. **核心优化**：Module Federation shared 共享依赖 + 按需加载+智能预加载 + 子应用自身代码分割 + 样式隔离 + 专项监控

> 💡 **追问链预留位置**

---

## Q38: 设计一个支持百万级数据的表格组件
- **难度**：★★★
- **知识点**：虚拟滚动 / 大数据处理 / Web Worker
- **题型**：编程实践题 + 架构设计题

### 参考答案要点：

1. **架构**：Virtual Scroll Engine + Data Manager(Web Worker处理排序/过滤/聚合) + Render Engine + Event System

2. **核心实现**：虚拟滚动只渲染可视区±N行 + Web Worker 处理纯计算 + 分块处理大数据 + 固定列/冻结行

3. **成熟方案参考**：ag-grid、@tanstack/react-virtual

> 💡 **追问链预留位置**

---

## Q39: 手写一个带取消功能的 debounce 函数
- **难度**：★★★
- **知识点**：防抖 / 手写实现 / TypeScript
- **题型**：编程实践题

### 参考答案要点：

```typescript
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300,
  options: { leading?: boolean; trailing?: boolean } = {}
): ((...args: Parameters<T>) => ReturnType<T> | undefined) & {
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
  pending: () => boolean;
} {
  let timerId = null;
  let lastArgs = null;
  const { leading = false, trailing = true } = options;

  const debounced = function(this: any, ...args: Parameters<T>) {
    lastArgs = args;
    if (timerId === null && leading) {
      fn.apply(this, args);
      timerId = setTimeout(() => { timerId = null; }, delay);
      return;
    }
    if (timerId !== null) clearTimeout(timerId);
    timerId = setTimeout(() => {
      timerId = null;
      if (trailing && lastArgs) fn.apply(this, lastArgs);
    }, delay);
  };

  debounced.cancel = () => { if (timerId) { clearTimeout(timerId); timerId = null; } };
  debounced.flush = () => { if (timerId && lastArgs) { clearTimeout(timerId); timerId = null; return fn.apply(this, lastArgs); } };
  debounced.pending = () => timerId !== null;
  return debounced;
}
```

**关键点**：leading(首次是否立即执行)、trailing(结束后是否执行)、cancel(取消)、flush(立即执行)、pending(状态检查)

### 深度拓展：增强版实现

#### 增加组合式用法（debounce + throttle）与 this 绑定支持

```typescript
/**
 * 增强版防抖函数 - 完整实现
 * 
 * 相比基础版本增加了：
 * 1. 完整的 this 绑定支持（使用 call/apply 保存上下文）
 * 2. 组合式用法：debounce + throttle 联合使用
 * 3. 更完善的状态管理
 */

// ========================================
// 1. 完整版 debounce（带详细注释）
// ========================================
function createDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300,
  options: { leading?: boolean; trailing?: boolean } = {}
): ((...args: Parameters<T>) => ReturnType<T> | undefined) & {
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
  pending: () => boolean;
} {
  let timerId: ReturnType<typeof setTimeout> | null = null;   // 定时器ID
  let lastArgs: Parameters<T> | null = null;                    // 最后一次调用的参数
  let lastThis: any = undefined;                                // 最后一次调用的this上下文
  let result: ReturnType<T>;                                    // 返回值（用于flush）
  const { leading = false, trailing = true } = options;

  const debounced = function(this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    lastArgs = args;                                            // 保存参数
    lastThis = this;                                            // 保存this上下文（关键！）

    // Leading 模式：首次触发立即执行
    if (timerId === null && leading) {
      result = fn.apply(this, args);                            // 立即执行，保存返回值
      timerId = setTimeout(() => { timerId = null; }, delay);   // 设置冷却期
      return result;                                            // 返回结果
    }

    // 清除之前的定时器（核心：重新计时）
    if (timerId !== null) clearTimeout(timerId);
    
    // Trailing 模式：延迟结束后执行
    timerId = setTimeout(() => {
      timerId = null;
      if (trailing && lastArgs) {
        result = fn.apply(lastThis, lastArgs);                  // 使用保存的this和args
        lastArgs = null;
        lastThis = undefined;
      }
    }, delay);

    return undefined;
  };

  // cancel 方法：取消防抖
  debounced.cancel = function() {
    if (timerId !== null) {
      clearTimeout(timerId);                                    // 清除定时器
      timerId = null;
    }
    lastArgs = null;                                             // 清空参数
    lastThis = undefined;                                        // 重置this
  };

  // flush 方法：立即执行待执行的回调
  debounced.flush = function(): ReturnType<T> | undefined {
    if (timerId !== null && lastArgs !== null) {
      clearTimeout(timerId);                                    // 先清除定时器
      timerId = null;
      const res = fn.apply(lastThis, lastArgs);                 // 立即执行
      lastArgs = null;                                           // 清空状态
      lastThis = undefined;
      return res;                                                // 返回结果
    }
    return undefined;
  };

  // pending 方法：检查是否有待执行的回调
  debounced.pending = function(): boolean {
    return timerId !== null;                                     // 有定时器说明有pending的调用
  };

  return debounced;
}

// ========================================
// 2. 完整版 throttle（基于 debounce 实现）
// ========================================
function createThrottle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number = 300,
  options: { trailing?: boolean } = {}
): ((...args: Parameters<T>) => void) & {
  cancel: () => void;
} {
  const { trailing = true } = options;
  let lastExecTime: number = 0;                                  // 上次执行时间
  let timerId: ReturnType<typeof setTimeout> | null = null;     // 定时器ID
  let pendingArgs: Parameters<T> | null = null;                  // 待执行的参数

  const throttled = function(this: any, ...args: Parameters<T>) {
    const now = Date.now();                                      // 当前时间戳
    const remaining = interval - (now - lastExecTime);           // 距离下次可执行的剩余时间
    
    pendingArgs = args;                                          // 保存参数

    if (remaining <= 0) {
      // 已超过冷却期，可以立即执行
      if (timerId !== null) {
        clearTimeout(timerId);                                   // 清除可能存在的trailing定时器
        timerId = null;
      }
      fn.apply(this, args);                                      // 执行原函数
      lastExecTime = now;                                        // 更新执行时间
      pendingArgs = null;                                         // 清空参数
    } else if (trailing && !timerId) {
      // 还在冷却期内，设置trailing补充执行
      timerId = setTimeout(() => {
        if (pendingArgs) {
          fn.apply(this, pendingArgs);                           // 补充执行最后一次
          lastExecTime = Date.now();
          pendingArgs = null;
        }
        timerId = null;
      }, remaining);
    }
    // 否则忽略本次触发
  };

  // cancel 方法
  throttled.cancel = function() {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
    pendingArgs = null;
  };

  return throttled as any;
}

// ========================================
// 3. 组合式用法：debounce + throttle 联合使用
// ========================================
/**
 * 创建一个既防抖又节流的函数
 * 
 * 使用场景：
 * - 无限滚动加载：需要限制频率，又需要在停止滚动后触发最终逻辑
 * - 搜索建议：限制API调用频率，但要在用户停止输入后才发送请求
 * 
 * 工作原理：
 * 先通过 throttle 限制调用频率（最多每 throttleInterval ms 一次）
 * 再通过 debounce 等待稳定（停止触发 debounceDelay ms 后才真正执行）
 */
function composeDebounceThrottle<T extends (...args: any[]) => any>(
  fn: T,
  debounceDelay: number,
  throttleInterval: number
): ((...args: Parameters<T>) => void) & {
  cancel: () => void;
} {
  // 第一步：创建节流版本的函数
  const throttledFn = createThrottle(fn, throttleInterval);
  
  // 第二步：对节流后的函数再应用防抖
  const debouncedFn = createDebounce(throttledFn, debounceDelay);
  
  // 组合 cancel 方法
  const composed = function(this: any, ...args: Parameters<T>) {
    debouncedFn.apply(this, args);
  } as any;
  
  composed.cancel = () => {
    debouncedFn.cancel();  // 取消防抖会自动取消内部的throttle
  };
  
  return composed;
}
```

#### 使用示例与场景演示

```typescript
// ========== 场景1：搜索框输入（经典防抖）==========
const searchInput = document.getElementById('search') as HTMLInputElement;

const handleSearch = createDebounce((keyword: string) => {
  console.log('🔍 发起搜索:', keyword);
  // 调用搜索 API
}, 500);

searchInput.addEventListener('input', (e) => {
  handleSearch((e.target as HTMLInputElement).value);
});
// 用户快速输入 "react" → 只会在停止输入500ms后执行一次
// ========== 场景2：按钮防重复点击（leading模式）==========
const submitBtn = document.getElementById('submit') as HTMLButtonElement;

const handleSubmit = createDebounce((e: Event) => {
  console.log('✅ 提交表单');
  e.preventDefault();
}, 1000, { leading: true });  // 首次点击立即执行，之后1秒内忽略

submitBtn.addEventListener('click', handleSubmit);
// ========== 场景3：滚动事件处理（节流 + trailing）==========
const handleScroll = createThrottle((scrollY: number) => {
  console.log('📜 滚动位置:', scrollY);
  // 更新回到顶部按钮的显示/隐藏
}, 100, { trailing: true });

window.addEventListener('scroll', () => handleScroll(window.scrollY));
// ========== 场景4：自动保存（cancel + flush 的实际应用）==========
const editorContent = document.getElementById('editor') as HTMLElement;

const autoSave = createDebounce((content: string) => {
  console.log('💾 自动保存:', content.substring(0, 50) + '...');
  // 调用保存 API
}, 2000);

editorContent.addEventListener('input', () => {
  autoSave(editorContent.innerText);
});

// 用户点击"手动保存"
document.getElementById('save-btn')?.addEventListener('click', () => {
  const saved = autoSave.flush();  // 立即执行待执行的保存
  if (saved !== undefined) {
    console.log('💾 手动触发保存成功');
  }
});

// 表单验证失败时取消自动保存
document.getElementById('validation-error')?.addEventListener('click', () => {
  autoSave.cancel();  // 取消待执行的保存操作
  console.log('❌ 已取消自动保存');
});
// ========== 场景5：组合用法 - 无限滚动加载（debounce + throttle）==========
const loadMoreData = composeDebounceThrottle(
  (scrollPosition: number) => {
    console.log('📦 加载更多数据... 当前位置:', scrollPosition);
    // 调用分页加载 API
  },
  300,   // 防抖延迟：停止滚动300ms后执行
  200    // 节流间隔：最多每200ms触发一次检查
);

window.addEventListener('scroll', () => {
  const scrollTop = window.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  
  // 接近底部时触发
  if (scrollTop + clientHeight >= scrollHeight - 200) {
    loadMoreData(scrollTop);
  }
});
// ========== 场景6：this 绑定的验证 ==========
const user = {
  name: '张三',
  greet: createDebounce(function(this: any, message: string) {
    console.log(`${this.name} 说: ${message}`);  // this 应该指向 user 对象
  }, 500)
};

// 正确绑定 this
user.greet.call(user, 'Hello!');  // 输出: 张三 说: Hello!
user.greet.call({ name: '李四' }, 'Hi!');  // 输出: 李四 说: Hi!
// ========== 场景7：pending 状态的使用（UI 反馈）==========
const searchHandler = createDebounce((keyword: string) => {
  console.log('搜索完成:', keyword);
  // 隐藏 loading 状态
  hideLoadingIndicator();
}, 800);

searchInput.addEventListener('input', (e) => {
  const value = (e.target as HTMLInputElement).value;
  searchHandler(value);
  
  // 如果有 pending 的请求，显示 loading
  if (searchHandler.pending()) {
    showLoadingIndicator();
  }
});
```

#### 架构设计图

```
┌─────────────────────────────────────────────────────────────┐
│                    函数组合架构                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  原函数 fn ──▶ [Throttle] ──▶ [Debounce] ──▶ 最终执行       │
│                   │                │                        │
│              限制频率          等待稳定                       │
│            (interval)        (delay)                         │
│                                                             │
│  时间线示例（throttle=200ms, debounce=500ms）：               │
│                                                             │
│  触发 触发 触发     触发 触发        触发                     │
│   │    │    │       │    │           │                      │
│   ▼    │    │       ▼    │           ▼                      │
│  [执行] │    │    [执行]  │      [等待500ms后执行]           │
│         │    │           │                                   │
│         ▼    ▼           ▼                                   │
│      [忽略] [忽略]     [忽略]                                │
│                                                             │
│  特点：                                                     │
│  ✅ 即使高频触发，也不会过于频繁执行                          │
│  ✅ 停止触发后会等待一段时间确保稳定                          │
│  ✅ 适合需要"最终确认"但又要控制频率的场景                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

> 💡 **追问链预留位置**

---

## Q40: 手写一个图片懒加载指令（支持 IntersectionObserver 降级）
- **难度**：★★★
- **知识点**：图片懒加载 / Vue 自定义指令 / IntersectionObserver
- **题型**：编程实践题

### 参考答案要点：

核心实现要点：
- 支持 loading/error 占位图 + opacity 渐显动画
- IntersectionObserver（现代浏览器）+ scroll 事件 + getBoundingClientRect（降级）
- rootMargin 提前加载 + 完整生命周期管理（防止内存泄漏）
- Vue 2/3 兼容（beforeMount/unmounted）

### 深度拓展：增强版实现

#### 增强版图片懒加载 —— 支持降级策略 / LQIP / Vue3 完整实现

```typescript
/**
 * 增强版图片懒加载指令
 * 
 * 功能特性：
 * 1. IntersectionObserver 优先，自动降级到 scroll+getBoundingClientRect
 * 2. 支持 loading="lazy" 原生降级
 * 3. 支持 LQIP（低质量图片占位符）预加载
 * 4. 完整的 Vue3 自定义指令实现
 * 5. 错误重试机制
 * 6. 渐显动画效果
 */

// ========================================
// 核心懒加载类（框架无关）
// ========================================
interface LazyImageOptions {
  /** 真实图片地址 */
  src: string;
  /** 加载中的占位图 */
  loading?: string;
  /** 加载失败的占位图 */
  error?: string;
  /** LQIP（低质量图片占位符）- 极小尺寸的模糊预览图 */
  lqip?: string;
  /** 提前加载的距离阈值（px），默认 200 */
  rootMargin?: string;
  /** 是否使用原生 loading="lazy" 降级 */
  useNativeLazy?: boolean;
  /** 最大重试次数 */
  maxRetry?: number;
}

class LazyImageManager {
  private observer: IntersectionObserver | null = null;      // IO 观察者实例
  private fallbackHandlers: Map<Element, () => void> = new Map(); // 降级处理器映射
  private isIOSupported: boolean;                             // 是否支持 IO
  private retryCount: Map<Element, number> = new Map();       // 重试计数器
  
  constructor() {
    // 检测浏览器是否支持 IntersectionObserver
    this.isIOSupported = 'IntersectionObserver' in window && 
                        'IntersectionObserverEntry' in window &&
                        'intersectionRatio' in window.IntersectionObserverEntry.prototype;
    
    if (this.isIOSupported) {
      // 创建全局 IO 观察者（共享实例，性能更优）
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          rootMargin: '200px',                                // 提前200px开始加载
          threshold: 0.01                                      // 只要进入视口1%就触发
        }
      );
    }
  }
  
  /**
   * 观察一个图片元素
   * @param el 图片元素（img 或 div）
   * @param options 配置选项
   */
  observe(el: HTMLElement, options: LazyImageOptions): void {
    // 存储配置到元素上（用于后续访问）
    (el as any)._lazyOptions = options;
    (el as any)._lazyLoaded = false;                          // 标记是否已加载
    
    // 1. 设置初始状态：显示 LQIP 或 loading 占位图
    this.setPlaceholder(el, options);
    
    // 2. 尝试使用原生 loading="lazy"
    if (options.useNativeLazy && 'loading' in HTMLImageElement.prototype) {
      if (el.tagName === 'IMG') {
        (el as HTMLImageElement).loading = 'lazy';            // 设置原生懒加载
        this.loadImage(el, options.src);                       // 直接设置src
        return;
      }
    }
    
    // 3. 使用 IntersectionObserver
    if (this.isIOSupported && this.observer) {
      this.observer.observe(el);                              // 开始观察
      return;
    }
    
    // 4. 降级方案：scroll 事件 + getBoundingClientRect
    this.setupFallback(el, options);
  }
  
  /**
   * 设置占位图（LQIP > loading 占位图）
   */
  private setPlaceholder(el: HTMLElement, options: LazyImageOptions): void {
    const placeholder = options.lqip || options.loading;       // 优先使用 LQIP
    
    if (el.tagName === 'IMG') {
      const imgEl = el as HTMLImageElement;
      imgEl.style.opacity = '0';                              // 初始透明（渐显动画准备）
      imgEl.style.transition = 'opacity 0.3s ease-in';        // 渐显过渡效果
      
      if (placeholder) {
        imgEl.src = placeholder;                               // 设置占位图
      }
    } else {
      // 背景图模式
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.style.backgroundRepeat = 'no-repeat';
      
      if (placeholder) {
        el.style.backgroundImage = `url(${placeholder})`;     // 设置背景占位图
        el.style.filter = 'blur(10px)';                        // LQIP 模糊效果
        el.style.transition = 'filter 0.3s ease-out';          // 清晰后移除模糊
      }
    }
  }
  
  /**
   * 处理 IntersectionObserver 回调
   */
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {                              // 元素进入视口
        const el = entry.target as HTMLElement;
        const options = (el as any)._lazyOptions as LazyImageOptions;
        
        if (options && !(el as any)._lazyLoaded) {
          this.loadImage(el, options.src);                     // 开始加载真实图片
          
          if (this.observer) {
            this.observer.unobserve(el);                       // 停止观察（只加载一次）
          }
        }
      }
    });
  }
  
  /**
   * 设置降级方案：scroll 事件 + getBoundingClientRect
   */
  private setupFallback(el: HTMLElement, options: LazyImageOptions): void {
    const checkVisibility = () => {
      if ((el as any)._lazyLoaded) return;                     // 已加载则跳过
      
      const rect = el.getBoundingClientRect();                  // 获取元素位置信息
      
      // 检查是否在可视区域内（加上 rootMargin 的 200px 缓冲）
      const isInViewport = (
        rect.top <= (window.innerHeight + 200) &&             // 顶部进入可视区+缓冲
        rect.bottom >= -200 &&                                 // 底部未完全滚过可视区+缓冲
        rect.left <= (window.innerWidth + 200) &&
        rect.right >= -200
      );
      
      if (isInViewport) {
        this.loadImage(el, options.src);                       // 开始加载
        window.removeEventListener('scroll', checkVisibility); // 移除监听
        window.removeEventListener('resize', checkVisibility);
        this.fallbackHandlers.delete(el);                      // 删除处理器引用
      }
    };
    
    // 使用节流优化滚动事件（避免频繁计算）
    let ticking = false;
    const throttledCheck = () => {
      if (!ticking) {
        requestAnimationFrame(() => {                          // 使用 rAF 节流
          checkVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // 绑定事件
    window.addEventListener('scroll', throttledCheck, { passive: true });  // passive提升滚动性能
    window.addEventListener('resize', throttledCheck);
    
    // 首次检查（可能已在可视区内）
    checkVisibility();
    
    // 保存处理器引用（用于取消）
    this.fallbackHandlers.set(el, () => {
      window.removeEventListener('scroll', throttledCheck);
      window.removeEventListener('resize', throttledCheck);
    });
  }
  
  /**
   * 加载真实图片
   */
  private loadImage(el: HTMLElement, src: string): void {
    if (el.tagName === 'IMG') {
      const imgEl = el as HTMLImageElement;
      
      // 创建临时 Image 对象预加载（支持错误处理和重试）
      const tempImg = new Image();
      
      tempImg.onload = () => {
        // 加载成功
        imgEl.src = src;                                       // 设置真实图片
        imgEl.style.opacity = '1';                             // 渐显显示
        
        // 如果有 LQIP 模糊效果，清除它
        if (imgEl.style.filter) {
          imgEl.style.filter = 'none';
        }
        
        (el as any)._lazyLoaded = true;                        // 标记已加载
      };
      
      tempImg.onerror = () => {
        // 加载失败，尝试重试
        const options = (el as any)._lazyOptions as LazyImageOptions;
        const currentRetry = this.retryCount.get(el) || 0;
        
        if (currentRetry < (options?.maxRetry ?? 2)) {
          // 重试
          this.retryCount.set(el, currentRetry + 1);
          setTimeout(() => this.loadImage(el, src), 1000 * (currentRetry + 1));  // 延迟重试
        } else {
          // 重试耗尽，显示 error 占位图
          if (options?.error) {
            imgEl.src = options.error;
          }
          console.error(`图片加载失败（已重试${currentRetry}次）:`, src);
        }
      };
      
      tempImg.src = src;                                       // 触发加载
      
    } else {
      // 背景图模式
      const bgImg = new Image();
      
      bgImg.onload = () => {
        el.style.backgroundImage = `url(${src})`;              // 设置真实背景图
        el.style.filter = 'none';                              // 移除模糊
        (el as any)._lazyLoaded = true;
      };
      
      bgImg.onerror = () => {
        const options = (el as any)._lazyOptions as LazyImageOptions;
        if (options?.error) {
          el.style.backgroundImage = `url(${options.error})`;
        }
      };
      
      bgImg.src = src;
    }
  }
  
  /**
   * 取消观察某个元素
   */
  unobserve(el: HTMLElement): void {
    if (this.observer) {
      this.observer.unobserve(el);
    }
    
    // 如果使用了降级方案，移除事件监听
    const handler = this.fallbackHandlers.get(el);
    if (handler) {
      handler();
      this.fallbackHandlers.delete(el);
    }
  }
  
  /**
   * 销毁管理器（释放所有资源）
   */
  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();                              // 断开所有观察
      this.observer = null;
    }
    
    // 清理所有降级处理器
    this.fallbackHandlers.forEach(handler => handler());
    this.fallbackHandlers.clear();
    this.retryCount.clear();
  }
}

// ========================================
// Vue3 自定义指令实现
// ========================================
import type { App, Directive, DirectiveBinding } from 'vue';

// 全局单例
const lazyImageManager = new LazyImageManager();

/**
 * v-lazy 指令
 * 
 * 使用方式：
 * <img v-lazy="'https://example.com/image.jpg'" />
 * <img v-lazy="{ src: '...', lqip: '...', error: '...' }" />
 * <div v-lazy="{ src: '...' }"></div>
 */
const lazyDirective: Directive<HTMLElement, string | LazyImageOptions> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | LazyImageOptions>) {
    // 解析参数
    const value = binding.value;
    const options: LazyImageOptions = typeof value === 'string'
      ? { src: value }                                          // 字符串形式
      : value;                                                  // 对象形式
    
    // 开始观察
    lazyImageManager.observe(el, options);
  },
  
  updated(el: HTMLElement, binding: DirectiveBinding<string | LazyImageOptions>) {
    // 参数变化时重新加载
    const value = binding.value;
    const options: LazyImageOptions = typeof value === 'string'
      ? { src: value }
      : value;
    
    // 先取消旧观察
    lazyImageManager.unobserve(el);
    
    // 重置状态
    (el as any)._lazyLoaded = false;
    
    // 重新观察
    lazyImageManager.observe(el, options);
  },
  
  unmounted(el: HTMLElement) {
    // 组件卸载时清理资源
    lazyImageManager.unobserve(el);
  }
};

/**
 * 安装插件到 Vue 应用
 */
export default {
  install(app: App) {
    // 注册全局指令
    app.directive('lazy', lazyDirective);
    
    // 在应用卸载时销毁管理器
    if (app.config.globalProperties.$onUnmount) {
      app.config.globalProperties.$onUnmount(() => {
        lazyImageManager.destroy();
      });
    }
  }
};
```

#### 使用示例

```html
<!-- ======================================== -->
<!-- Vue3 组件中使用示例 -->
<!-- ======================================== -->

<template>
  <div>
    <!-- 示例1：基本用法 -->
    <img 
      v-lazy="'https://cdn.example.com/large-image.jpg'"
      alt="大图"
      style="width:100%;height:auto;"
    />
    
    <!-- 示例2：完整配置 -->
    <img
      v-lazy="{
        src: 'https://cdn.example.com/product.jpg',
        lqip: 'https://cdn.example.com/product-small.jpg',
        loading: '/images/loading-spinner.gif',
        error: '/images/error-placeholder.png',
        useNativeLazy: true,
        maxRetry: 3
      }"
      alt="商品图"
    />
    
    <!-- 示例3：背景图模式 -->
    <div
      v-lazy="{
        src: 'https://cdn.example.com/banner.jpg',
        lqip: 'https://cdn.example.com/banner-blur.jpg'
      }"
      class="banner"
      style="width:100%;height:400px;"
    ></div>
    
    <!-- 示例4：图片列表 -->
    <div class="image-grid">
      <div
        v-for="item in imageList"
        :key="item.id"
        class="grid-item"
      >
        <img
          v-lazy="{
            src: item.url,
            lqip: item.thumbnail,
            error: '/images/broken-image.png'
          }"
          :alt="item.title"
        />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface ImageItem {
  id: number;
  url: string;
  thumbnail: string;  // LQIP 小图
  title: string;
}

const imageList = ref<ImageItem[]>([
  {
    id: 1,
    url: 'https://cdn.example.com/photo1.jpg',
    thumbnail: 'https://cdn.example.com/photo1-thumb.jpg',
    title: '风景照 1'
  },
  {
    id: 2,
    url: 'https://cdn.example.com/photo2.jpg',
    thumbnail: 'https://cdn.example.com/photo2-thumb.jpg',
    title: '风景照 2'
  },
  // ... 更多图片
]);
</script>

<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.grid-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.grid-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
```

#### 降级策略流程图

```
┌──────────────────────────────────────────────────────────────┐
│                 图片懒加载决策流程                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  开始加载图片                                                 │
│      │                                                       │
│      ▼                                                       │
│  ┌─────────────────┐                                        │
│  │ 是否支持原生     │                                         │
│  │ loading="lazy"? │                                         │
│  └────────┬────────┘                                        │
│           │                                                   │
│     ┌─────┴─────┐                                            │
│     ▼           ▼                                            │
│   [是]         [否]                                          │
│     │           │                                            │
│     ▼           ▼                                            │
│  使用原生懒加载  ┌─────────────────┐                         │
│                │ 是否支持          │                         │
│                │ IntersectionObs?  │                         │
│                └────────┬────────┘                         │
│                         │                                   │
│                   ┌─────┴─────┐                             │
│                   ▼           ▼                             │
│                 [是]         [否]                           │
│                   │           │                             │
│                   ▼           ▼                             │
│              使用 IO API   使用 scroll +                    │
│              （高性能）    getBoundingClientRect            │
│                           （兼容性好）                      │
│                                                              │
│  所有方案都失败 → 直接加载（同步阻塞）                        │
│                                                              │
│  加载成功？                                                   │
│      │                                                       │
│      ├── 是 → 显示图片 + 渐显动画                            │
│      │                                                       │
│      └── 否 → 重试？（最多 N 次）                             │
│                  │                                           │
│              ┌───┴───┐                                      │
│              ▼       ▼                                      │
│            [成功]  [失败]                                    │
│              │       │                                      │
│              ▼       ▼                                      │
│            显示图片 显示 error 占位图                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

#### 性能优化要点总结

```typescript
// 性能优化关键点：

// ✅ 1. 共享 IntersectionObserver 实例（避免创建多个 Observer）
//    - 所有图片共用一个 Observer，减少内存开销
//    - 通过回调中区分不同元素

// ✅ 2. passive: true 提升滚动性能
//    window.addEventListener('scroll', handler, { passive: true });
//    - 告诉浏览器不会调用 preventDefault()
//    - 浏览器可以优化滚动处理

// ✅ 3. requestAnimationFrame 节流（降级方案）
//    - 将多次滚动事件合并到一帧内处理
//    - 避免 getBoundingClientRect 频繁调用导致的强制回流

// ✅ 4. rootMargin 预加载
//    - 提前 200px 开始加载
//    - 用户滚动到图片位置时可能已经加载完成
//    - 感知上实现"即时加载"

// ✅ 5. LQIP（低质量图片占位符）
//    - 极小尺寸（如 20x20px）的高压缩图片
//    - 作为 placeholder 显示并模糊
//    - 真实图片加载完成后无缝替换
//    - 提升感知性能（用户不会看到空白）

// ✅ 6. CSS opacity 过渡动画
//    - 避免布局偏移（opacity 不触发 reflow）
//    - GPU 加速（合成层属性）
//    - 视觉体验流畅
```

> 💡 **追问链预留位置**

---

## Q41: 手写一个简单的 Performance Collector（收集核心指标并上报）
- **难度**：★★★
- **知识点**：性能采集 / Performance API / 上报 SDK
- **题型**：编程实践题

### 参考答案要点：

核心能力：
- Core Web Vitals 全覆盖（LCP/CLS/FID/INP）
- Navigation Timing（DNS/TCP/TLS/TTFB/FCP/DCL）
- Resource Timing（慢资源告警 + 统计汇总）
- Long Tasks 检测
- sendBeacon + Image + localStorage 多级降级上报
- 采样控制 + 用户维度关联 + Visibility Change 触发上报

> 💡 **追问链预留位置**

---

## Q42: 实现 LCP 的手动采集逻辑（基于 Performance Observer）
- **难度**：★★★
- **知识点**：LCP / Performance Observer / 手动采集
- **题型**：编程实践题

### 参考答案要点：

关键技术点：
- `buffered: true` 获取历史条目
- 取最新最大值作为 LCP（LCP 定义是最大元素）
- SPA 路由切换时重置 LCP 计算
- 元素信息诊断（tagName/url/size/loadTime）
- 评级系统（good ≤2.5s / needs-improvement ≤4s / poor >4s）

> 💡 **追问链预留位置**

---

## Q43: 设计并实现一个前端错误+性能一体化上报 SDK
- **难度**：★★★
- **知识点**：SDK 设计 / 错误监控 / 性能监控 / 插件化架构
- **题型**：架构设计题 + 编程实践题

### 参考答案要点：

架构亮点：
- **插件化设计**（ErrorPlugin / PerformancePlugin / BreadcrumbPlugin 等）
- **统一 enrich 上下文**（用户信息/设备信息/面包屑）
- **多级上报降级**（beacon → fetch → image → localStorage）
- **采样控制**（error 全量 / perf 按比例采样）
- **完整生命周期管理**（init → use plugin → report → flush → destroy）

### 深度拓展：完整版实现

#### PerformanceCollector 类 —— 完整的性能采集与批量上报系统

```typescript
/**
 * 前端性能监控 SDK - 完整实现
 * 
 * 核心功能：
 * 1. Core Web Vitals 采集（LCP/FID/CLS/TTFB/FCP/INP）
 * 2. 资源性能数据采集（Resource Timing）
 * 3. 长任务检测（Long Task API）
 * 4. 错误数据关联（与错误数据关联分析）
 * 5. 批量上报机制（减少网络请求）
 * 6. 采样率配置（按需控制数据量）
 */

// ========================================
// 类型定义
// ========================================

/** 性能指标类型 */
interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number;              // Largest Contentful Paint (ms)
  fid?: number;              // First Input Delay (ms)
  cls?: number;              // Cumulative Layout Shift
  inp?: number;              // Interaction to Next Paint (ms)
  ttfb?: number;             // Time to First Byte (ms)
  fcp?: number;              // First Contentful Paint (ms)
  
  // 导航时序
  dns?: number;              // DNS 查询时间 (ms)
  tcp?: number;              // TCP 连接时间 (ms)
  ssl?: number;              // SSL/TLS 握手时间 (ms)
  domInteractive?: number;   // DOM 可交互时间 (ms)
  domComplete?: number;      // DOM 完成时间 (ms);
  loadEvent?: number;        // load 事件时间 (ms);
}

/** 上报数据结构 */
interface ReportData {
  /** 数据类型 */
  type: 'performance' | 'error' | 'longtask' | 'resource';
  /** 数据内容 */
  data: any;
  /** 时间戳 */
  timestamp: number;
  /** 页面 URL */
  url: string;
  /** 用户 ID（可选） */
  userId?: string;
  /** 会话 ID */
  sessionId: string;
  /** 设备信息 */
  deviceInfo: DeviceInfo;
}

/** 设备信息 */
interface DeviceInfo {
  ua: string;                // User Agent
  screen: string;            // 屏幕分辨率
  viewport: string;          // 视口大小
  connection: string;        // 网络连接类型
  language: string;          // 语言
}

/** SDK 配置选项 */
interface MonitorConfig {
  /** 上报接口地址 */
  reportUrl: string;
  /** 应用 ID */
  appId: string;
  /** 性能数据采样率 (0-1)，默认 0.1（10%） */
  sampleRate?: number;
  /** 错误数据采样率 (0-1)，默认 1（100%） */
  errorSampleRate?: number;
  /** 批量上报数量阈值，默认 10 条 */
  batchSize?: number;
  /** 批量上报最大等待时间（ms），默认 5000ms */
  batchTimeout?: number;
  /** 是否开启 Long Task 监控 */
  enableLongTask?: boolean;
  /** 是否开启资源性能监控 */
  enableResourceTiming?: boolean;
  /** 自定义上下文 enrich 函数 */
  enrichContext?: () => Record<string, any>;
}

// ========================================
// PerformanceCollector 主类
// ========================================
class PerformanceCollector {
  private config: Required<MonitorConfig>;                     // 配置项
  private metrics: PerformanceMetrics = {};                    // 性能指标缓存
  private reportQueue: ReportData[] = [];                      // 上报队列
  private batchTimer: ReturnType<typeof setTimeout> | null = null; // 批量定时器
  private sessionId: string;                                   // 会话ID
  private observers: (PerformanceObserver | undefined)[] = [];  // 观察者实例列表
  
  constructor(config: MonitorConfig) {
    // 合并默认配置
    this.config = {
      sampleRate: 0.1,                                        // 默认10%采样
      errorSampleRate: 1,                                     // 错误全量
      batchSize: 10,                                          // 批量10条
      batchTimeout: 5000,                                     // 5秒超时
      enableLongTask: true,
      enableResourceTiming: false,
      ...config
    };
    
    // 生成会话ID
    this.sessionId = this.generateSessionId();
    
    // 初始化采集
    this.init();
  }
  
  /**
   * 初始化所有采集器
   */
  private init(): void {
    // 1. 采集 Core Web Vitals
    this.collectCoreWebVitals();
    
    // 2. 采集导航时序（Navigation Timing）
    this.collectNavigationTiming();
    
    // 3. 如果启用，采集长任务
    if (this.config.enableLongTask) {
      this.collectLongTasks();
    }
    
    // 4. 如果启用，采集资源性能
    if (this.config.enableResourceTiming) {
      this.collectResourceTiming();
    }
    
    // 5. 页面隐藏时立即上报（Visibility Change）
    this.setupVisibilityChange();
    
    // 6. 页面卸载前上报剩余数据
    this.setupBeforeUnload();
  }
  
  // ========================================
  // 1. Core Web Vitals 采集
  // ========================================
  private collectCoreWebVitals(): void {
    if (!('PerformanceObserver' in window)) return;           // 不支持则跳过
    
    // LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];         // 取最新值
        
        this.metrics.lcp = lastEntry.startTime;
        
        // 上报 LCP 数据（包含元素诊断信息）
        this.enqueueReport({
          type: 'performance',
          data: {
            metric: 'lcp',
            value: lastEntry.startTime,
            element: lastEntry.element?.tagName,               // 触发元素标签名
            url: (lastEntry.element as HTMLImageElement)?.src || '', // 图片URL
            loadTime: lastEntry.loadTime,                       // 加载时间
            renderTime: lastEntry.renderTime,                   // 渲染时间
            size: lastEntry.size                                // 元素尺寸
          },
          timestamp: Date.now(),
          url: location.href,
          sessionId: this.sessionId,
          deviceInfo: this.getDeviceInfo()
        });
      });
      
      lcpObserver.observe({ 
        type: 'largest-contentful-paint', 
        buffered: true                                         // 获取历史数据
      });
      this.observers.push(lcpObserver as any);
    } catch (e) {
      console.warn('LCP 采集失败:', e);
    }
    
    // FID (First Input Delay) / INP (Interaction to Next Paint)
    try {
      const inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            // FID：首次输入延迟
            this.metrics.fid = entry.processingStart - entry.startTime;
            
            this.enqueueReport({
              type: 'performance',
              data: { metric: 'fid', value: this.metrics.fid },
              timestamp: Date.now(),
              url: location.href,
              sessionId: this.sessionId,
              deviceInfo: this.getDeviceInfo()
            });
          } else if (entry.entryType === 'event') {
            // INP：交互到下次绘制的延迟
            const duration = entry.duration;
            const processingDuration = entry.processingDuration;
            
            this.metrics.inp = Math.max(this.metrics.inp || 0, duration); // 取最差值
            
            this.enqueueReport({
              type: 'performance',
              data: {
                metric: 'inp',
                value: duration,
                name: entry.name,                               // 事件名称（click/key等）
                startTime: entry.startTime,
                processingDuration                             // 处理时长
              },
              timestamp: Date.now(),
              url: location.href,
              sessionId: this.sessionId,
              deviceInfo: this.getDeviceInfo()
            });
          }
        }
      });
      
      inpObserver.observe({ 
        type: ['first-input', 'event'],                        // 同时监听 FID 和 INP
        buffered: true 
      });
      this.observers.push(inpObserver as any);
    } catch (e) {
      console.warn('FID/INP 采集失败:', e);
    }
    
    // CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      let sessionValue = 0;                                    // 会话窗口值
      let sessionEntries: PerformanceEntry[] = [];             // 窗口内的条目
      const SESSION_GAP = 5000;                                 // 窗口间隔 5 秒
      const SESSION_MAX = 8000;                                 // 窗口最大时长 8 秒
      
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // 只计算没有最近用户输入的布局偏移（避免惩罚用户操作导致的偏移）
          if (!(entry as any).hadRecentInput) {
            const firstEntry = sessionEntries[0];
            const lastEntry = entry;
            
            // 检查是否需要开始新窗口
            if (sessionEntries.length > 0 && 
                lastEntry.startTime - firstEntry.startTime > SESSION_MAX) {
              sessionValue += sessionEntries.reduce((sum, e) => sum + (e as any).value, 0);
              clsValue = Math.max(clsValue, sessionValue);       // 更新全局最大值
              sessionEntries = [];
              sessionValue = 0;
            }
            
            sessionEntries.push(entry);                         // 加入当前窗口
          }
        }
        
        // 计算当前会话窗口的值
        sessionValue = sessionEntries.reduce((sum, e) => sum + (e as any).value, 0);
        clsValue = Math.max(clsValue, sessionValue);
        this.metrics.cls = clsValue;
        
        this.enqueueReport({
          type: 'performance',
          data: { metric: 'cls', value: clsValue },
          timestamp: Date.now(),
          url: location.href,
          sessionId: this.sessionId,
          deviceInfo: this.getDeviceInfo()
        });
      });
      
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      this.observers.push(clsObserver as any);
    } catch (e) {
      console.warn('CLS 采集失败:', e);
    }
  }
  
  // ========================================
  // 2. Navigation Timing 采集
  // ========================================
  private collectNavigationTiming(): void {
    // 使用PerformanceNavigationTiming API（更精确）
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (!navEntry) return;
    
    // 提取关键时序指标
    this.metrics.ttfb = navEntry.responseStart - navEntry.requestStart;     // TTFB
    this.metrics.fcp = this.getFCP();                                       // FCP
    
    // DNS/TCP/SSL 时序
    this.metrics.dns = navEntry.domainLookupEnd - navEntry.domainLookupStart;
    this.metrics.tcp = navEntry.connectEnd - navEntry.connectStart;
    this.metrics.ssl = navEntry.secureConnectionStart > 0 
      ? navEntry.connectEnd - navEntry.secureConnectionStart 
      : 0;
    
    // DOM 相关时序
    this.metrics.domInteractive = navEntry.domInteractive - navEntry.fetchStart;
    this.metrics.domComplete = navEntry.domComplete - navEntry.fetchStart;
    this.metrics.loadEvent = navEntry.loadEventEnd - navEntry.fetchStart;
    
    // 上报导航时序数据
    this.enqueueReport({
      type: 'performance',
      data: {
        metric: 'navigation-timing',
        ...this.metrics
      },
      timestamp: Date.now(),
      url: location.href,
      sessionId: this.sessionId,
      deviceInfo: this.getDeviceInfo()
    });
  }
  
  /**
   * 获取 FCP（First Contentful Paint）
   */
  private getFCP(): number {
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    return fcpEntry ? fcpEntry.startTime : 0;
  }
  
  // ========================================
  // 3. Long Task 监控
  // ========================================
  private collectLongTasks(): void {
    if (!('PerformanceObserver' in window)) return;
    
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // 长任务：执行超过50ms的任务
          this.enqueueReport({
            type: 'longtask',
            data: {
              duration: entry.duration,                          // 任务持续时间
              name: entry.name,                                  // 任务名称
              startTime: entry.startTime,                        // 开始时间
              attribution: (entry as any)?.attribution?.[0]?.containerType, // 来源容器
              containerName: (entry as any)?.attribution?.[0]?.containerName
            },
            timestamp: Date.now(),
            url: location.href,
            sessionId: this.sessionId,
            deviceInfo: this.getDeviceInfo()
          });
        }
      });
      
      longTaskObserver.observe({ entryTypes: ['longtask'] });
      this.observers.push(longTaskObserver as any);
    } catch (e) {
      console.warn('Long Task 采集失败:', e);
    }
  }
  
  // ========================================
  // 4. Resource Timing 监控
  // ========================================
  private collectResourceTiming(): void {
    if (!('PerformanceObserver' in window)) return;
    
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          
          // 过滤掉自身SDK的上报请求
          if (resource.name.includes(this.config.reportUrl)) continue;
          
          // 只记录慢资源（超过阈值的）
          const SLOW_THRESHOLD = 1000;                           // 1秒阈值
          if (resource.duration < SLOW_THRESHOLD) continue;
          
          this.enqueueReport({
            type: 'resource',
            data: {
              name: resource.name,                               // 资源URL
              duration: resource.duration,                       // 加载时长
              size: resource.transferSize,                       // 传输大小（字节）
              initiatorType: resource.initiatorType,             // 类型（script/img/css等）
              decodedBodySize: resource.decodedBodySize,         // 解码后大小
              responseStatus: (resource as any).responseStatus,   // HTTP状态码
              // 详细时序
              dns: resource.domainLookupEnd - resource.domainLookupStart,
              tcp: resource.connectEnd - resource.connectStart,
              ssl: resource.secureConnectionStart > 0 
                ? resource.connectEnd - resource.secureConnectionStart 
                : 0,
              ttfb: resource.responseStart - resource.requestStart,
              download: resource.responseEnd - resource.responseStart
            },
            timestamp: Date.now(),
            url: location.href,
            sessionId: this.sessionId,
            deviceInfo: this.getDeviceInfo()
          });
        }
      });
      
      resourceObserver({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver as any);
    } catch (e) {
      console.warn('Resource Timing 采集失败:', e);
    }
  }
  
  // ========================================
  // 5. 采样率控制 & 数据入队
  // ========================================
  
  /**
   * 将数据加入上报队列
   * 根据采样率决定是否实际入队
   */
  private enqueueReport(data: ReportData): void {
    // 根据数据类型应用不同的采样率
    const shouldSample = data.type === 'error'
      ? Math.random() < this.config.errorSampleRate              // 错误使用错误采样率
      : Math.random() < this.config.sampleRate;                 // 其他使用通用采样率
    
    if (!shouldSample) return;                                   // 不在采样范围内，丢弃
    
    // 应用自定义 enrich（添加业务上下文）
    if (this.config.enrichContext) {
      Object.assign(data, this.config.enrichContext());
    }
    
    // 入队
    this.reportQueue.push(data);
    
    // 检查是否达到批量上报条件
    if (this.reportQueue.length >= this.config.batchSize) {
      this.flush();                                             // 达到阈值，立即上报
    } else if (!this.batchTimer) {
      // 启动定时器（未达到阈值但需要定时上报）
      this.batchTimer = setTimeout(() => {
        this.flush();
      }, this.config.batchTimeout);
    }
  }
  
  /**
   * 手动触发上报（清空队列）
   */
  flush(): void {
    if (this.reportQueue.length === 0) return;                  // 队列为空，不上报
    
    // 清除定时器
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }
    
    // 复制并清空队列
    const batchData = [...this.reportQueue];
    this.reportQueue = [];
    
    // 发送数据
    this.sendReport(batchData);
  }
  
  // ========================================
  // 6. 多级上报降级策略
  // ========================================
  
  /**
   * 发送上报数据（多级降级）
   * @param data 要发送的数据数组
   */
  private sendReport(data: ReportData[]): void {
    const payload = JSON.stringify({
      appId: this.config.appId,
      data: data,
      sentAt: Date.now()
    });
    
    // 优先级1：sendBeacon（页面关闭时也能发送，不阻塞）
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      const success = navigator.sendBeacon(this.config.reportUrl, blob);
      if (success) return;                                      // 发送成功
    }
    
    // 优先级2：fetch + keepalive（类似 beacon 但兼容性更好）
    if ('fetch' in window) {
      fetch(this.config.reportUrl, {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' },
        keepAlive: true                                          // 页面关闭也能完成
      }).catch(() => {
        // fetch 失败，降级到 Image
        this.sendByImage(payload);
      });
      return;
    }
    
    // 优先级3：Image 像素方式（兼容性最好）
    this.sendByImage(payload);
  }
  
  /**
   * 使用 Image 方式上报（最终降级方案）
   */
  private sendByImage(payload: string): void {
    try {
      const img = new Image();
      // 将数据编码到 URL 中（注意长度限制）
      img.src = `${this.config.reportUrl}?data=${encodeURIComponent(payload.substring(0, 2000))}`;
    } catch (e) {
      // 最后手段：存储到 localStorage，下次再发
      this.saveToLocalStorage(payload);
    }
  }
  
  /**
   * 保存到本地存储（网络完全不可用时的兜底）
   */
  private saveToLocalStorage(payload: string): void {
    try {
      const key = `monitor_data_${Date.now()}`;
      localStorage.setItem(key, payload);
      
      // 限制本地存储的数据量（避免撑爆）
      const keys = Object.keys(localStorage).filter(k => k.startsWith('monitor_data_'));
      if (keys.length > 20) {
        // 删除最早的数据
        keys.slice(0, keys.length - 10).forEach(k => localStorage.removeItem(k));
      }
    } catch (e) {
      console.error('数据保存失败:', e);
    }
  }
  
  // ========================================
  // 7. 页面生命周期管理
  // ========================================
  
  /**
   * Visibility Change 监听（页面切换到后台时上报）
   */
  private setupVisibilityChange(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        // 页面隐藏，立即上报已有数据
        this.flush();
      }
    });
  }
  
  /**
   * Before Unload 监听（页面卸载前上报）
   */
  private setupBeforeUnload(): void {
    window.addEventListener('beforeunload', () => {
      // 使用 sendBeacon 发送剩余数据
      if (this.reportQueue.length > 0 && navigator.sendBeacon) {
        const payload = JSON.stringify({
          appId: this.config.appId,
          data: this.reportQueue,
          sentAt: Date.now()
        });
        
        navigator.sendBeacon(
          this.config.reportUrl, 
          new Blob([payload], { type: 'application/json' })
        );
      }
    });
  }
  
  // ========================================
  // 8. 工具方法
  // ========================================
  
  /**
   * 获取设备信息
   */
  private getDeviceInfo(): DeviceInfo {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    return {
      ua: navigator.userAgent,
      screen: `${screen.width}x${screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      connection: connection ? `${connection.effectiveType} (${connection.downlink}Mbps)` : 'unknown',
      language: navigator.language
    };
  }
  
  /**
   * 生成会话ID
   */
  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }
  
  /**
   * 手动关联错误数据（用于错误+性能联合分析）
   * @param errorId 错误ID
   * @param errorData 错误详情
   */
  associateError(errorId: string, errorData: Record<string, any>): void {
    this.enqueueReport({
      type: 'error',
      data: {
        errorId,
        ...errorData,
        // 关联当前性能快照
        performanceSnapshot: { ...this.metrics }
      },
      timestamp: Date.now(),
      url: location.href,
      sessionId: this.sessionId,
      deviceInfo: this.getDeviceInfo()
    });
  }
  
  /**
   * 销毁实例（释放所有资源）
   */
  destroy(): void {
    // 先上报剩余数据
    this.flush();
    
    // 断开所有观察者
    this.observers.forEach(observer => observer?.disconnect());
    this.observers = [];
    
    // 清除定时器
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }
    
    // 清空队列
    this.reportQueue = [];
  }
}
```

#### 使用示例

```typescript
// ========================================
// 使用示例
// ========================================

// 1. 初始化 SDK
const monitor = new PerformanceCollector({
  reportUrl: 'https://monitor.example.com/api/report',
  appId: 'my-web-app',
  sampleRate: 0.1,              // 10%用户采集性能数据
  errorSampleRate: 1,           // 100%采集错误数据
  batchSize: 15,                // 15条批量上报
  batchTimeout: 3000,           // 3秒超时上报
  enableLongTask: true,         // 开启长任务监控
  enableResourceTiming: true,   // 开启资源性能监控
  enrichContext: () => ({
    userId: getCurrentUserId(),                    // 当前用户ID
    pageVersion: '1.2.3',                          // 页面版本号
    abTestGroup: getABTestGroup(),                 // A/B测试分组
    customTags: { feature: 'product-list' }        // 自定义标签
  })
});

// 2. 关联错误和性能数据
window.onerror = function(message, source, lineno, colno, error) {
  const errorId = `err_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  
  // 记录错误日志
  console.error(`[${errorId}]`, message);
  
  // 关联性能数据（帮助定位是否是性能问题导致错误）
  monitor.associateError(errorId, {
    message,
    source,
    line: lineno,
    column: colno,
    stack: error?.stack,
    type: error?.name || 'Error'
  });
};

// 3. 手动触发上报（如路由切换时）
router.afterEach(() => {
  monitor.flush();  // 上报当前页面的性能数据
});

// 4. 应用销毁时清理
window.addEventListener('unload', () => {
  monitor.destroy();
});
```

#### 架构设计图

```
┌─────────────────────────────────────────────────────────────────┐
│                    性能监控系统架构                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  数据采集层   │  │  数据处理层   │  │      数据上报层       │  │
│  ├──────────────┤  ├──────────────┤  ├──────────────────────┤  │
│  │ • LCP/FID/   │  │ • 采样率过滤  │  │ • sendBeacon (优先)  │  │
│  │   CLS/INP    │  │ • enrich 增强 │  │ • fetch keepalive   │  │
│  │ • Nav Timing │  │ • 批量合并    │  │ • Image pixel (降级) │  │
│  │ • Long Task  │  │ • 队列管理    │  │ • localStorage (兜底)│  │
│  │ • Resource   │  │              │  │                      │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
│         │                  │                     │              │
│         └──────────────────┼─────────────────────┘              │
│                            ▼                                    │
│                 ┌──────────────────────┐                        │
│                 │    上报服务器/API     │                        │
│                 │  • 数据接收与解析     │                        │
│                 │  • 存储到时序数据库   │                        │
│                 │  • 实时聚合计算      │                        │
│                 │  • 告警规则引擎      │                        │
│                 └──────────────────────┘                        │
│                                                                 │
│  数据流向：                                                     │
│  浏览器 → 采集 → 过滤 → 入队 → 批量 → 上报 → 服务端处理 → 存储  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 采样率设计说明

```typescript
/**
 * 采样率设计原则：
 * 
 * 1. 性能数据（sampleRate: 0.1，即10%）
 *    - 原因：性能数据量大，全量采集成本高
 *    - 10%样本已足够反映整体趋势
 *    - 可按页面重要性调整（首页100%，其他10%）
 * 
 * 2. 错误数据（errorSampleRate: 1，即100%）
 *    - 原因：错误数据量相对较小
 *    - 每个错误都可能影响用户体验
 *    - 需要完整数据做根因分析
 * 
 * 3. 动态采样策略（高级用法）：
 *    - 新版本发布后提高采样率（观察新问题）
 *    - 发现异常时自动提升采样率
 *    - 高价值用户（VIP）可以100%采集
 */

// 示例：动态采样率配置
function getDynamicSampleRate(): number {
  const isNewVersion = checkIfNewVersion();              // 是否是新版本
  const isHighValueUser = checkUserTier() === 'vip';     // 是否是VIP用户
  const hourOfDay = new Date().getHours();                // 当前小时
  
  if (isNewVersion) return 1;                            // 新版本100%采集
  if (isHighValueUser) return 1;                         // VIP用户100%
  if (hourOfDay >= 9 && hourOfDay <= 18) return 0.2;     // 高峰期20%
  return 0.05;                                           // 默认5%
}
   ```

### 🔍 追问链
1. **Containment 的浏览器兼容性和降级方案？**
   → 方向：Chrome 52+、Firefox 69+、Safari 15.4+ 支持；旧浏览器使用 `overflow: hidden` 或 `position: relative` 模拟部分效果；使用 `@supports (contain: layout)` 特性检测；渐进增强策略
2. **contain: strict 和 contain: content 的区别？**
   → 方向：`strict` = `size layout paint style`（最严格，完全隔离）；`content` = `layout paint`（推荐，平衡性能和兼容性）；`size` 需要明确尺寸（否则内容不可见）；根据场景选择合适的级别
3. **Containment 对 React/Vue 组件的优化效果？**
   → 方向：大型列表/表格组件使用 `contain: content` 可显著减少重排范围；Modal/Dialog 使用 `contain: strict` 完全隔离；虚拟列表容器使用 `contain: strict` 限制布局计算；配合 `content-visibility: auto` 实现离屏渲染优化

---

## Q44: 一个电商首页从0到1的性能优化全案
- **难度**：★★★
- **知识点**：电商性能优化 / 综合案例 / 优化路线图 / ROI 分析
- **题型**：综合场景设计题

### 参考答案要点：

三阶段路线图：
- **Phase 1（第1周，+30~40%）**：Gzip/Brotli + CDN + 图片WebP + defer脚本 + Critical CSS 内联
- **Phase 2（第2-3周，再+30%）**：骨架屏 + 代码分割(Tree Shaking/lodash-es/dayjs) + Feed流虚拟化 + API并行 + SW缓存
- **Phase 3（第4周起）**：监控体系建设 + CI性能门禁 + A/B Test验证 + 团队培训

ROI 示例：投入 ~11万/年 → 年增收 ~6500万 → ROI 数万倍

> 💡 **追问链预留位置**

---

## Q45: 低端机/弱网环境下的性能降级策略设计
- **难度**：★★★
- **知识点**：性能降级 / 弱网适配 / 渐进增强 / Network Information API
- **题型**：场景设计题

### 参考答案要点：

五级降级金字塔：L1增强体验 → L2完整体验 → L3正常(部分降级) → L4轻量 → L5最小可用

实现核心：AdaptivePerfManager 类
- detectDevice()：CPU核心数/内存/屏幕分辨率评分
- detectNetwork()：effectiveType/RTT/downlink/saveData 评分
- 综合计算等级 → 应用对应 CSS 策略（animation/imageQuality/features）
- 监听 connection change + prefers-reduced-motion 动态调整

> 💡 **追问链预留位置**

---

## Q46: 如何量化前端优化的业务价值（ROI）？
- **难度**：★★★
- **知识点**：性能 ROI / 业务指标 / A/B Test / 数据驱动
- **题型**：综合简答题

### 参考答案要点：

关联模型：LCP↓1秒 → 跳出率↓8-15% → 转化率↑5-10%

量化方法：A/B Test对照实验 / 长趋势分析 / 相关性分析 / 用户调研(NPS)

四层度量体系：技术指标(实时) → 用户体验指标(日) → 业务指标(周/月) → 财务指标(季)

> 💡 **追问链预留位置**

---

## Q47: 大型 SPA 应用的性能治理体系设计
- **难度**：★★★
- **知识点**：性能治理 / SPA 优化 / 技术债务 / 工程体系
- **题型**：架构设计题

### 参考答案要点：

四层架构：L1数据度量(RUM/Synthetic) → L2工具平台(Dashboard/报警/分析) → L3流程规范(评审/CI门禁/回归测试) → L4组织文化(OKR/Checklist/hackathon)

Code Review 性能 Checklist：10项必查（重型依赖/图片优化/内存泄漏/虚拟列表/长任务/CSS选择器/will-change/第三方脚本/N+1查询）

技术债务分级：P0紧急24h → P1重要本迭代 → P2一般2迭代 → P3优化季度清20%

> 💡 **追问链预留位置**

---

## Q48: React Server Components 对性能优化的意义？
- **难度**：★★★
- **知识点**：RSC / React Server Components / 服务端渲染
- **题型**：综合简答题

### 参考答案要点：

三大价值：
1. **Bundle Size 急剧减少**：Server Component 代码永不下载到浏览器（案例：240KB→80KB）
2. **自动代码分割**：Server/Client 边界即分割点，无需手动 lazy
3. **更少 waterfall**：数据获取+渲染在同一次服务器请求中完成

本质区别于 SSR：RSC 发送的是**组件树序列化数据**而非纯HTML，客户端无需重新执行Server Component逻辑

适用：内容展示页✅ / 数据密集Dashboard✅ / SEO需求✅ / 高度交互应用❌

> 💡 **追问链预留位置**

---

## Q49: Edge Computing 在前端性能优化中的应用前景？
- **难度**：★★★
- **知识点**：Edge Computing / Cloudflare Workers / Vercel Edge
- **题型**：综合简答题

### 参考答案要点：

六大应用场景：A/B Test分流 / 个性化渲染 / API聚合转换 / 动态路由 / 图片实时处理 / 认证鉴权

主流平台：Cloudflare Workers(300+城市, ~5ms冷启动) / Vercel Edge / Deno Deploy / Fastly Compute@Edge / AWS Lambda@Edge

局限性：执行时间受限(10-50ms)、不支持所有Node.js API、调试困难

最佳实践：I/O密集型适合Edge / CPU密集型放回源站或Wasm / 做好降级fallback

> 💡 **追问链预留位置**

---

## Q50: 如何看待 AI 辅助的前端性能优化工具？
- **难度**：★★★
- **知识点**：AI + 性能优化 / 智能化运维 / 未来趋势
- **题型**：综合简答题

### 参考答案要点：

已落地方向：智能性能分析(AIOps) / 自动化优化建议 / AI图片压缩 / 性能测试自动化

AI擅长：模式识别、异常检测、自然语言交互、重复性工作、预测性分析

AI不擅长：架构决策、业务权衡、创新方案、团队组织

前沿展望：LLM驱动的性能优化助手 / 自主优化Agent / 个性化性能优化 / 跨层协同优化

结论：不会取代而是赋能——"AI + 专家" > 单独任何一个

> 💡 **追问链预留位置**

---

## 附录

---

## 附录A：性能优化知识体系速查表

### 一、加载性能优化

| 分类 | 手段 | 收益 | 优先级 |
|------|------|------|--------|
| 网络 | CDN加速 | TTFB ↓50-80% | ⭐⭐⭐⭐⭐ |
| 压缩 | Gzip/Brotli | 体积↓60-70% | ⭐⭐⭐⭐⭐ |
| 压缩 | 图片WebP/AVIF | 图片↓30-60% | ⭐⭐⭐⭐⭐ |
| 缓存 | 强缓存+协商缓存 | 回源率<5% | ⭐⭐⭐⭐⭐ |
| 缓存 | Service Worker | 二次访问瞬时 | ⭐⭐⭐⭐ |
| 加载 | Critical CSS内联 | FCP↑30-50% | ⭐⭐⭐⭐ |
| 加载 | preload/prefetch/preconnect | 关键资源提前100-500ms | ⭐⭐⭐⭐ |
| 加载 | async/defer/module | 不阻塞渲染 | ⭐⭐⭐⭐⭐ |
| 加载 | 代码分割+懒加载 | 首屏JS↓40-60% | ⭐⭐⭐⭐⭐ |
| 加载 | Tree Shaking | 体积↓10-30% | ⭐⭐⭐⭐ |
| 图片 | 响应式srcset+lazy | 请求数↓40-60% | ⭐⭐⭐⭐⭐ |
| 字体 | font-display:swap | 消除FOIT | ⭐⭐⭐⭐ |
| 字体 | 子集化 | 中文字体5-10MB→1-2MB | ⭐⭐⭐ |

### 二、运行时性能优化

| 分类 | 手段 | 收益 | 优先级 |
|------|------|------|--------|
| 渲染 | 虚拟列表 | 万条只渲染~20个DOM | ⭐⭐⭐⭐⭐ |
| 渲染 | CSS Containment | 限制重排范围 | ⭐⭐⭐⭐ |
| 渲染 | will-change/GPU | 动画60fps | ⭐⭐⭐⭐ |
| 渲染 | transform代替位置属性 | 避免Reflow | ⭐⭐⭐⭐⭐ |
| JS | 防抖+节流 | 事件频率可控 | ⭐⭐⭐⭐⭐ |
| JS | rAF替代setTimeout | 动画更流畅 | ⭐⭐⭐⭐ |
| JS | Web Worker | 主线程不阻塞 | ⭐⭐⭐⭐⭐ |
| JS | 时间切片(yieldToMain) | 避免Long Task | ⭐⭐⭐⭐⭐ |
| DOM | Document Fragment批量操作 | Reflow降到1次 | ⭐⭐⭐⭐⭐ |
| DOM | 先读后写 | 避免Layout Thrashing | ⭐⭐⭐⭐⭐ |
| 内存 | 清理监听器/定时器 | 防泄漏 | ⭐⭐⭐⭐⭐ |
| 框架 | React.memo/useMemo等 | 避免不必要重渲染 | ⭐⭐⭐⭐⭐ |

### 三、监控与分析工具

| 工具 | 用途 | 场景 |
|------|------|------|
| Chrome DevTools | Performance/Network/Memory | 日常开发 |
| Lighthouse | 综合评分+建议 | CI/CD审计 |
| WebPageTest | 多地点视频录制 | 深度分析 |
| webpack-bundle-analyzer | Bundle体积可视化 | 打包优化 |
| Performance Observer API | 编程方式采集指标 | 自建监控 |
| Sentry/Fundebug | 错误+性能监控 | 生产环境 |

### 四、核心公式

```
CLS = Σ(影响比例 × 距离比例)
LCP = 视口内最大内容元素渲染时间
TTFB = responseStart - requestStart
TBT = FCP到TTI之间所有Long Task超出50ms部分之和
INP = 所有交互的P98延迟值（2024取代FID）
```

---

## 附录B：高频考点 TOP 20

| 排名 | 知识点 | 频率 | 难度 | 相关题目 |
|------|--------|------|------|---------|
| 🥇1 | 防抖节流区别与手写 | ★★★★★ | ★★☆ | Q12,Q39 |
| 🥈2 | 虚拟列表原理与实现 | ★★★★★ | ★★★ | Q20,Q26,Q38 |
| 🥉3 | 浏览器渲染流程CRP | ★★★★★ | ★★☆ | Q09,Q16 |
| 4 | 强缓存vs协商缓存 | ★★★★☆ | ★☆☆ | Q06,Q07 |
| 5 | async/defer区别 | ★★★★☆ | ★☆☆ | Q08 |
| 6 | Tree Shaking原理 | ★★★★☆ | ★☆☆ | Q11 |
| 7 | Reflow vs Repaint | ★★★★☆ | ★☆☆ | Q13 |
| 8 | 图片懒加载实现 | ★★★★☆ | ★★☆ | Q10,Q40 |
| 9 | Core Web Vitals | ★★★★☆ | ★☆☆ | Q02-Q04 |
| 10 | 首屏加载优化方案 | ★★★★☆ | ★★☆ | Q17,Q44 |
| 11 | HTTP/2多路复用 | ★★★★☆ | ★★☆ | Q28 |
| 12 | 代码分割Code Splitting | ★★★★☆ | ★★☆ | Q18,Q33 |
| 13 | Service Worker缓存策略 | ★★★☆☆ | ★★☆ | Q19 |
| 14 | rAF vs setTimeout | ★★★☆☆ | ★★☆ | Q25 |
| 15 | 内存泄漏场景与排查 | ★★★☆☆ | ★★☆ | Q23 |
| 16 | CDN原理与作用 | ★★★☆☆ | ★☆☆ | Q14 |
| 17 | Gzip/Brotli原理 | ★★★☆☆ | ★☆☆ | Q15 |
| 18 | will-change/GPU加速 | ★★★☆☆ | ★★☆ | Q21 |
| 19 | Web Worker使用场景 | ★★★☆☆ | ★★☆ | Q24,Q27 |
| 20 | 性能监控SDK设计 | ★★★☆☆ | ★★★ | Q34,Q41,Q43 |

---

> **题库版本**：v1.0  
> **最后更新**：2026-06-16  
> **总题数**：50 道（基础 15 + 进阶 18 + 专家 17）  
> **适用场景**：前端面试准备 / 技术分享 / 团队培训 / 知识梳理