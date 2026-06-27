---
---
# HTML & CSS 面试题库（2025-2026 企业实战版）

> 本题库基于全网最新面试趋势整理，涵盖基础、进阶、专家三个难度层级，重点考察实际工程应用能力。
> 题目形式包含：选择题（8道）、简答题（18道）、代码分析题（12道）、编程实践题（12道），共 **50 道**。

---

## 📋 题目分布总览

| 层级 | 题号范围 | 数量 | 占比 | 难度特征 |
|------|----------|------|------|----------|
| 基础层 ★☆☆ | Q01 - Q15 | 15 道 | 30% | 概念记忆、基础语法，答案直接明确 |
| 进阶层 ★★☆ | Q16 - Q35 | 20 道 | 40% | 多点综合、需理解原理，需要分析推理 |
| 专家层 ★★★ | Q36 - Q50 | 15 道 | 30% | 源码级深度、架构设计，手写实现/方案设计 |

---

## 📚 问题速查目录

> **快速导航**：点击题目即可跳转到对应位置 | 共 **50** 道题（基础15 + 进阶20 + 专家15）

### 基础层（★☆☆）Q01 - Q15

| 题号 | 题目 | 难度 |
|:----:|------|:----:|
| [Q01](#q01-html5-新增了哪些常用的语义化标签它们的使用场景是什么) | HTML5 新增了哪些常用的语义化标签？它们的使用场景是什么？ | ★☆☆ |
| [Q02](#q02-doctype-的作用是什么不写会怎样) | DOCTYPE 的作用是什么？不写会怎样？ | ★☆☆ |
| [Q03](#q03-src-和-href-有什么区别) | src 和 href 有什么区别？ | ★☆☆ |
| [Q04](#q04-script-标签的-async-和-defer-属性有什么区别) | script 标签的 async 和 defer 属性有什么区别？ | ★☆☆ |
| [Q05](#q05-什么是-css-盒模型标准盒模型和怪异盒模型的区别) | 什么是 CSS 盒模型？标准盒模型和怪异盒模型的区别？ | ★☆☆ |
| [Q06](#q06-css-选择器的优先级是如何计算的) | CSS 选择器的优先级是如何计算的？ | ★☆☆ |
| [Q07](#q07-em-和-rem-的区别是什么) | em 和 rem 的区别是什么？ | ★☆☆ |
| [Q08](#q08-伪元素和伪类的区别是什么分别有哪些常用项) | 伪元素和伪类的区别是什么？分别有哪些常用项？ | ★☆☆ |
| [Q09](#q09-display-none-和-visibility-hidden-的区别) | display: none 和 visibility: hidden 的区别？ | ★☆☆ |
| [Q10](#q10-position-各个值的区别staticrelativeabsolutefixedsticky) | position 各个值的区别？（static/relative/absolute/fixed/sticky） | ★☆☆ |
| [Q11](#q11-什么是-bfc如何触发-bfc有什么应用场景) | 什么是 BFC？如何触发 BFC？有什么应用场景？ | ★☆☆ |
| [Q12](#q12-flex-容器的主要属性有哪些) | Flex 容器的主要属性有哪些？ | ★☆☆ |
| [Q13](#q13-grid-和-flex-分别适合什么场景) | Grid 和 Flex 分别适合什么场景？ | ★☆☆ |
| [Q14](#q14-常用的水平垂直居中方案有哪些) | 常用的水平垂直居中方案有哪些？ | ★☆☆ |
| [Q15](#q15-媒体查询media-query的常用写法) | 媒体查询（Media Query）的常用写法？ | ★☆☆ |

### 进阶层（★★☆）Q16 - Q35

| 题号 | 题目 | 难度 |
|:----:|------|:----:|
| [Q16](#q16-请详细解释-css-的层叠上下文stacking-context哪些属性会创建它) | 请详细解释 CSS 的层叠上下文（Stacking Context），哪些属性会创建它？ | ★★☆ |
| [Q17](#q17-浮动float的工作原理是什么如何清除浮动) | 浮动（float）的工作原理是什么？如何清除浮动？ | ★★☆ |
| [Q18](#q18-重排reflow和重绘repaint的触发条件有哪些如何优化) | 重排（Reflow）和重绘（Repaint）的触发条件有哪些？如何优化？ | ★★☆ |
| [Q19](#q19-浏览器的渲染过程是怎样的从输入-url-到页面展示经历了什么) | 浏览器的渲染过程是怎样的？从输入 URL 到页面展示经历了什么？ | ★★☆ |
| [Q20](#q20-css-动画的几种实现方式各有什么优缺点) | CSS 动画的几种实现方式？各有什么优缺点？ | ★★☆ |
| [Q21](#q21-什么是-css-预处理器sasslessstylus-各自的特点) | 什么是 CSS 预处理器？Sass/Less/Stylus 各自的特点？ | ★★☆ |
| [Q22](#q22-css-modules-的原理是什么解决了什么问题) | CSS Modules 的原理是什么？解决了什么问题？ | ★★☆ |
| [Q23](#q23-tailwind-css-的原子化思想是什么与传统-css-写法的优劣) | Tailwind CSS 的原子化思想是什么？与传统 CSS 写法的优劣？ | ★★☆ |
| [Q24](#q24-移动端适配方案有哪些remvwviewport-方案对比) | 移动端适配方案有哪些？（rem/vw/viewport 方案对比） | ★★☆ |
| [Q25](#q25-移动端-1px-问题怎么解决) | 移动端 1px 问题怎么解决？ | ★★☆ |
| [Q26](#q26-css-will-change-属性的作用和使用注意事项) | CSS will-change 属性的作用和使用注意事项 | ★★☆ |
| [Q27](#q27-line-height-的各种单位值表现有何不同) | line-height 的各种单位值表现有何不同 | ★★☆ |
| [Q28](#q28-margin-合并折叠现象及利用避免方法) | margin 合并（折叠）现象及利用/避免方法 | ★★☆ |
| [Q29](#q29-css-变量custom-properties的使用方式和优势) | CSS 变量（Custom Properties）的使用方式和优势 | ★★☆ |
| [Q30](#q30-css-container-queries容器查询与-media-query的区别) | CSS Container Queries（容器查询）与 Media Query 的区别 | ★★☆ |
| [Q31](#q31-aspect-ratio-属性的使用场景) | aspect-ratio 属性的使用场景 | ★★☆ |
| [Q32](#q32-css-clamp-函数的使用) | CSS clamp() 函数的使用 | ★★☆ |
| [Q33](#q33-object-fit-属性的作用) | object-fit 属性的作用 | ★★☆ |
| [Q34](#q34-如何实现暗黑模式dark-mode) | 如何实现暗黑模式（Dark Mode） | ★★☆ |
| [Q35](#q35-critical-css关键-css-提取和内联) | Critical CSS（关键 CSS）提取和内联 | ★★☆ |

### 专家层（★★★）Q36 - Q50

| 题号 | 题目 | 难度 |
|:----:|------|:----:|
| [Q36](#q36-手写实现多种方式的两栏布局固定侧栏--自适应内容区) | 【手写实现】多种方式的两栏布局（固定侧栏 + 自适应内容区） | ★★★ |
| [Q37](#q37-手写实现圣杯布局--双飞翼布局) | 【手写实现】圣杯布局 / 双飞翼布局 | ★★★ |
| [Q38](#q38-手写实现响应式网格卡片布局grid-auto-fill--minmax) | 【手写实现】响应式网格卡片布局（Grid auto-fill + minmax） | ★★★ |
| [Q39](#q39-从零设计一套企业级的-css-命名规范和目录组织方案) | 从零设计一套企业级的 CSS 命名规范和目录组织方案 | ★★★ |
| [Q40](#q40-设计一套完整的移动端-h5-页面适配方案) | 设计一套完整的移动端 H5 页面适配方案 | ★★★ |
| [Q41](#q41-综合题首屏加载慢的系统性能优化方案htmlcss-角度) | 【综合题】首屏加载慢的系统性能优化方案（HTML/CSS 角度） | ★★★ |
| [Q42](#q42-css-contain-属性的作用如何用于性能优化) | CSS contain 属性的作用？如何用于性能优化？ | ★★★ |
| [Q43](#q43-content-visibility-属性的作用) | content-visibility 属性的作用？ | ★★★ |
| [Q44](#q44-css-的initialinheritunsetrevert-关键字的含义) | CSS 的 initial/inherit/unset/revert 关键字的含义 | ★★★ |
| [Q45](#q45-手写实现用纯-css-实现一个-loading-动画效果) | 【手写实现】用纯 CSS 实现一个 loading 动画效果 | ★★★ |
| [Q46](#q46-手写实现带有骨架屏效果的卡片组件) | 【手写实现】带有骨架屏效果的卡片组件 | ★★★ |
| [Q47](#q47-css-subgrid-是什么解决什么问题) | CSS subgrid 是什么？解决什么问题？ | ★★★ |
| [Q48](#q48-设计一套主题切换系统亮色暗色多色系) | 设计一套主题切换系统（亮色/暗色/多色系） | ★★★ |
| [Q49](#q49-选择题关于-htmlcss-的综合知识考察) | 【选择题】关于 HTML/CSS 的综合知识考察 | ★★★ |
| [Q50](#q50-综合场景题给定复杂页面设计稿描述-html-结构设计和-css-实现思路) | 【综合场景题】给定复杂页面设计稿，描述 HTML 结构设计和 CSS 实现思路 | ★★★ |

---

## 第一部分：基础层（★☆☆）

> **考察目标**：HTML5 语义化、CSS 基础概念、盒模型、选择器、布局入门
> **适用岗位**：初级前端开发、实习生、转岗开发者

---

## Q01: HTML5 新增了哪些常用的语义化标签？它们的使用场景是什么？
- **难度**：★☆☆
- **知识点**：HTML5语义化 / 语义标签
- **题型**：简答题

### 参考答案要点：

1. **文档结构类标签**

   HTML5 提供了一组用于描述页面结构的语义化标签，替代了过去大量使用 `div` + class 命名的做法：

   ```html
   <!-- 页面整体结构 -->
   <body>
     <header>          <!-- 页头/区域头部：Logo、导航、搜索框 -->
       <nav>           <!-- 导航区域：主导航、侧边导航 -->
         <ul>
           <li><a href="/">首页</a></li>
           <li><a href="/about">关于</a></li>
         </ul>
       </nav>
     </header>

     <main>            <!-- 页面主体内容（每个页面唯一） -->
       <article>       <!-- 独立完整的内容块：博客文章、新闻、论坛帖子 -->
         <h1>文章标题</h1>
         <p>正文内容...</p>
       </article>

       <aside>         <!-- 侧边栏/附属内容：相关推荐、广告、目录 -->
         <h3>相关阅读</h3>
         <ul>...</ul>
       </aside>
     </main>

     <footer>          <!-- 页脚/区域底部：版权信息、联系方式、友情链接 -->
       <p>&copy; 2026 Company</p>
     </footer>
   </body>
   ```

2. **文本内容类标签**

   ```html
   <section>    <!-- 通用内容分区：将页面按主题分组 -->
   <figure>     <!-- 独立引用内容：图片、图表、代码块，通常配合 figcaption -->
     <img src="chart.png" alt="销售数据">
     <figcaption>图1: 2026年销售趋势</figcaption>
   </figure>

   <details>    <!-- 可折叠详情区域 -->
     <summary>点击展开更多</summary>  <!-- 折叠区域的标题/触发器 -->
     <p>这里是隐藏的详细内容...</p>
   </details>

   <mark>高亮文本</mark>      <!-- 高亮标记，类似荧光笔效果 -->
   <time datetime="2026-06-15">今天</time>  <!-- 机器可读的时间/日期 -->
   <address>联系邮箱：example@mail.com</address>  <!-- 联系信息 -->
   ```

3. **表单增强类标签**

   ```html
   <!-- 新增 input 类型 -->
   <input type="email" placeholder="请输入邮箱">    <!-- 邮箱输入，自带格式校验 -->
   <input type="tel" placeholder="请输入手机号">     <!-- 电话号码 -->
   <input type="url" placeholder="请输入网址">        <!-- URL 地址 -->
   <input type="number" min="0" max="100" step="1">  <!-- 数字输入 -->
   <input type="range" min="0" max="100">            <!-- 滑块 -->
   <input type="color">                               <!-- 颜色选择器 -->
   <input type="date">                                <!-- 日期选择器 -->
   <input type="search" placeholder="搜索">           <!-- 搜索框 -->

   <!-- 新增表单元素 -->
   <datalist id="browsers">  <!-- 输入建议列表，配合 input list 使用 -->
     <option value="Chrome">
     <option value="Firefox">
     <option value="Safari">
   </datalist>
   <input list="browsers">

   <progress value="70" max="100">70%</progress>  <!-- 进度条 -->
   <meter value="0.6" min="0" max="1">60%</meter>  <!-- 度量衡/标量显示 -->
   ```

4. **语义化的核心价值**
   - **SEO 优化**：搜索引擎能更好地理解页面结构，提升排名
   - **无障碍访问（Accessibility）**：屏幕阅读器等辅助技术可以正确朗读页面结构
   - **代码可读性**：开发者无需依赖 class 名称就能理解页面结构
   - **样式一致性**：浏览器默认样式提供了合理的排版基础

### 🔍 追问链
1. **语义化标签的浏览器兼容性如何处理？**
   → 方向：IE9+ 大部分支持，IE8 及以下需用 `html5shiv.js` polyfill；现代项目已无需考虑
2. **header/footer/nav 在一个页面中可以使用多次吗？**
   → 方向：可以。这些是分段内容元素，可以在 article、section 内部嵌套使用；但 main 只能出现一次
3. **div 和 section 的使用边界在哪里？什么情况下该用 div 而不是 section？**
   → 方向：section 用于有独立主题的内容分组（应有标题 heading）；div 是纯容器，无语义含义，仅用于样式包裹或脚本钩子

---

## Q02: DOCTYPE 的作用是什么？不写会怎样？
- **难度**：★☆☆
- **知识点**：DOCTYPE / 浏览器渲染模式 / Quirks Mode
- **题型**：简答题

### 参考答案要点：

1. **DOCTYPE 的核心作用**

   DOCTYPE（Document Type Declaration，文档类型声明）告诉浏览器当前文档使用的是哪个版本的 HTML/XHTML 规范，从而决定浏览器采用哪种**渲染模式**来解析和显示页面。

   ```html
   <!-- HTML5 的 DOCTYPE 声明（最简洁） -->
   <!DOCTYPE html>

   <!-- HTML4.01 Strict 版本（对比参考） -->
   <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
     "http://www.w3.org/TR/html4/strict.dtd">

   <!-- XHTML 1.0 Transitional 版本（对比参考） -->
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
     "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   ```

2. **两种渲染模式对比**

   | 特性 | Standards Mode（标准模式） | Quirks Mode（怪异/混杂模式） |
   |------|---------------------------|------------------------------|
   | **触发条件** | 有正确的 DOCTYPE 声明 | 缺少 DOCTYPE 或声明不正确 |
   | **盒模型** | 标准盒模型（width = content） | 怪异盒模型（width = content + padding + border） |
   | **图片空隙** | 图片作为 inline 元素可能有底部空隙 | 行为不一致 |
   | **表格字体继承** | 表格内字体不从 body 继承 | 从 body 继承字体样式 |
   | **CSS 解析** | 严格遵循 W3C 规范 | 模拟旧版浏览器的非标准行为 |

3. **不写 DOCTYPE 的后果**

   ```html
   <!-- ❌ 不写 DOCTYPE：浏览器进入怪异模式 -->
   <html>
   <head>
     <style>
       .box {
         width: 200px;           /* 设定宽度 */
         padding: 20px;          /* 内边距 */
         border: 5px solid #000; /* 边框 */
       }
     </style>
   </head>
   <body>
     <div class="box">内容</div>
   </body>
   </html>

   <!-- 怪异模式下：
        实际内容区宽度 = 200 - 20*2 - 5*2 = 150px
        （width 包含了 padding 和 border）

        标准模式下：
        实际占用宽度 = 200 + 20*2 + 5*2 = 250px
        （width 仅指内容区）
   -->
   ```

   主要问题：
   - **盒模型计算错误**：布局尺寸与预期不符，导致页面错位
   - **跨浏览器行为不一致**：不同浏览器在怪异模式下的表现差异更大
   - **CSS 特性可能失效**：部分现代 CSS 属性在怪异模式下不被正确解析

### 🔍 追问链
1. **如何检测当前页面处于哪种渲染模式？**
   → 方向：JavaScript 中通过 `document.compatMode` 检测，返回 `"CSS1Compat"` 为标准模式，`"BackCompat"` 为怪异模式
2. **HTML5 的 DOCTYPE 为什么不需要指定 DTD？**
   → 方向：HTML5 不基于 SGML，因此不需要 DTD（Document Type Definition）引用；`<!DOCTYPE html>` 仅作为触发标准模式的开关
3. **实际项目中遇到过因 DOCTYPE 导致的兼容性问题吗？**
   → 方向：常见场景：引入第三方组件库后布局偏移、老系统迁移时表格/表单样式异常

---

## Q03: src 和 href 有什么区别？
- **难度**：★☆☆
- **知识点**：HTML属性 / 资源加载
- **题型**：简答题

### 参考答案要点：

1. **核心区别总览**

   | 维度 | src（source） | href（hypertext reference） |
   |------|---------------|----------------------------|
   | **含义** | 引用资源并将其嵌入到当前文档中 | 建立与外部资源的链接关系 |
   | **下载行为** | 会下载并解析资源 | 仅建立链接，不一定立即下载 |
   | **页面影响** | 替换当前元素的内容 | 不替换当前元素，仅改变链接关系 |
   | **典型标签** | `<script>`、`<img>`、`<iframe>`、`<video>`、`<audio>` | `<link>`、`<a>` |
   | **阻塞渲染** | script 的 src 会阻塞 DOM 解析 | link stylesheet 会阻塞渲染（CSSOM 构建） |

2. **src 的使用场景与特点**

   ```html
   <!-- img: 下载图片并显示在 img 元素位置 -->
   <img src="photo.jpg" alt="照片">

   <!-- script: 下载 JS 文件并执行，阻塞后续 DOM 解析 -->
   <script src="app.js"></script>

   <!-- iframe: 将另一个页面嵌入当前文档 -->
   <iframe src="https://example.com"></iframe>

   <!-- video/audio: 加载多媒体资源 -->
   <video src="movie.mp4" controls></video>
   ```

   **关键特性**：当浏览器解析到 `src` 时，会暂停当前文档的解析，去下载和执行资源（对于 script），直到资源处理完毕后才继续。

3. **href 的使用场景与特点**

   ```html
   <!-- link: 建立外部资源关联（最常用：引入 CSS） -->
   <link rel="stylesheet" href="styles.css">

   <!-- a: 超链接，跳转到指定地址或锚点 -->
   <a href="https://example.com">外部链接</a>
   <a href="#section1">页面内锚点跳转</a>
   <a href="mailto:test@example.com">发送邮件</a>
   <a href="tel:+8613800138000">拨打电话</a>

   <!-- link 其他用法：favicon、preload、prefetch -->
   <link rel="icon" href="favicon.ico">
   <link rel="preload" href="font.woff2" as="font">
   ```

   **关键特性**：`href` 建立的是一种"引用关系"，浏览器不会因为遇到 href 就停止当前文档的解析。

4. **一个经典面试题：script 用 href 可以吗？**

   ```html
   <!-- ❌ 错误写法：script 没有 href 属性 -->
   <script href="app.js"></script>  <!-- 不会生效 -->

   <!-- ✅ 正确写法 -->
   <script src="app.js"></script>

   <!-- 但 a 标签可以用 src 吗？也不行！a 标签只有 href -->
   <!-- <a src="page.html">链接</a> -->  <!-- 无效属性 -->
   ```

### 🔍 追问链
1. **link 标签的 rel 属性有哪些常用值？分别有什么作用？**
   → 方向：stylesheet（CSS）、icon（favicon）、preload/prefetch/preconnect（资源预加载）、canonical（规范 URL）、manifest（PWA）
2. **script 标签的 src 和直接在标签内写代码有什么区别？**
   → 方向：src 会下载外部文件（可缓存），内联代码直接执行；两者不能同时有效使用（有 src 时忽略内部代码）
3. **为什么用 @import 引入 CSS 会影响性能？**
   → 方向：@import 是 CSS 层级的引用，会被合并到 CSSOM 中串行下载；而多个 link 可以并行下载

---

## Q04: script 标签的 async 和 defer 属性有什么区别？
- **难度**：★☆☆
- **知识点**：Script加载 / 渲染性能 / 异步脚本
- **题型**：简答题

### 参考答案要点：

1. **三种脚本加载方式对比**

   ```html
   <!-- 方式一：普通脚本（无属性） -->
   <script src="normal.js"></script>
   <!-- 行为：HTML 解析暂停 → 下载 JS → 执行 JS → 继续解析 HTML -->

   <!-- 方式二：异步脚本 async -->
   <script src="async.js" async></script>
   <!-- 行为：并行下载 JS（不阻塞 HTML 解析）
        下载完成后立即执行（可能中断 HTML 解析）
        执行顺序不确定（取决于下载完成时间） -->

   <!-- 方式三：延迟脚本 defer -->
   <script src="defer.js" defer></script>
   <!-- 行为：并行下载 JS（不阻塞 HTML 解析）
        等 HTML 解析完毕后再按顺序执行
        执行顺序与书写顺序一致 -->
   ```

2. **可视化时序对比**

   ```
   普通 script (无属性):
   HTML解析 ────||───────||─────── 继续解析
                  ↓下载    ↓执行
                  [JS文件]  [执行JS]

   async:
   HTML解析 ─────────────────────────── 完成
                ↘下载[JS-A]  ↙(A完成)执行A
                   ↘下载[JS-B]  ↙(B完成)执行B  ← 顺序不确定！

   defer:
   HTML解析 ─────────────────────────── 完成 → 执行A → 执行B
                ↘下载[A]  ↘下载[B]              ↑ 顺序确定
   ```

3. **使用场景指南**

   ```html
   <head>
     <!-- 场景1：独立的第三方统计/广告脚本（无依赖，不需立即执行） -->
     <script async src="analytics.js"></script>
     <script async src="ad-sdk.js"></script>

     <!-- 场景2：业务主脚本（依赖 DOM，且可能被其他脚本依赖） -->
     <script defer src="app.js"></script>
     <script defer src="components.js"></script>  <!-- 先于 app.js 执行 -->

     <!-- 场景3：关键首屏脚本（需要尽快执行并影响渲染） -->
     <!-- 放在 </body> 前，不加 async/defer -->
   </head>
   ```

   | 属性 | 适用场景 | 注意事项 |
   |------|----------|----------|
   | **无属性** | 首屏关键脚本、依赖 DOM 且顺序重要的脚本 | 阻塞渲染，应放 `</body>` 前 |
   | **async** | 独立第三方脚本（统计、广告）、无互相依赖的模块 | 不能保证执行顺序 |
   | **defer** | 业务逻辑脚本、DOM 操作脚本、有依赖关系的脚本 | DOM 解析完后才执行 |

4. **内联脚本的特殊情况**

   ```html
   <!-- async/defer 对内联脚本无效（因为没有 src） -->
   <script async>
     console.log('这个 async 会被忽略');
   </script>

   <!-- 内联脚本始终是同步执行的，会阻塞解析 -->
   <script>
     console.log('立即执行，阻塞解析');
   </script>

   <!-- 如果需要延迟执行内联代码，可用以下方式 -->
   <script>
     // 方式1：DOMContentLoaded
     document.addEventListener('DOMContentLoaded', () => {
       console.log('DOM 解析完成后执行');
     });

     // 方式2：动态创建脚本
     const script = document.createElement('script');
     script.textContent = 'console.log("异步执行")';
     document.head.appendChild(script);  // 异步执行
   </script>
   ```

### 🔍 追问链
1. **module 类型的 script 天然具有 defer 效果，具体是怎样的？**
   → 方向：`<script type="module">` 默认就是 defer 行为；支持顶层 await；严格模式运行；多次执行只加载一次
2. **如何实现脚本预加载而不执行？**
   → 方向：`<link rel="preload" as="script" href="later.js">` 预加载到缓存，之后再用 script 标签加载时从缓存读取
3. **多个 async 脚本如果需要保证执行顺序怎么办？**
   → 方向：改用 defer；或将多个 async 脚本合并为一个；或在内部用动态 import 控制依赖顺序

---

## Q05: 什么是 CSS 盒模型？标准盒模型和怪异盒模型的区别？
- **难度**：★☆☆
- **知识点**：盒模型 / box-sizing / 布局基础
- **题型**：简答题

### 参考答案要点：

1. **盒模型的组成结构**

   每个 HTML 元素在页面中都被视为一个矩形盒子，由四个部分组成：

   ```
   ┌────────────────────────────────────────────┐
   │               margin（外边距）               │  ← 盒子外部，透明
   │   ┌────────────────────────────────────┐   │
   │   │          border（边框）             │   │
   │   │   ┌────────────────────────────┐   │   │
   │   │   │     padding（内边距）       │   │   │
   │   │   │   ┌──────────────────┐     │   │   │
   │   │   │   │  content（内容区）│     │   │   │
   │   │   │   └──────────────────┘     │   │   │
   │   │   └────────────────────────────┘   │   │
   │   └────────────────────────────────────┘   │
   └────────────────────────────────────────────┘
   ```

2. **标准盒模型 vs 怪异盒模型**

   ```css
   .box {
     width: 200px;
     height: 100px;
     padding: 20px;
     border: 5px solid #333;
     margin: 10px;
   }
   ```

   | 计算项 | 标准盒模型（content-box） | 怪异盒模型（border-box） |
   |--------|-------------------------|------------------------|
   | **width 含义** | 仅指内容区宽度 | 内容区 + padding + border 总宽度 |
   | **内容区实际宽度** | 200px | 200 - 20×2 - 5×2 = **150px** |
   | **盒子实际占用宽度** | 200 + 20×2 + 5×2 = **250px** | **200px**（就是你设的 width） |
   | **触发方式** | 默认值（`box-sizing: content-box`） | `box-sizing: border-box` 或缺少 DOCTYPE |

3. **box-sizing 属性切换**

   ```css
   /* 标准盒模型（默认） */
   .standard {
     box-sizing: content-box;  /* width = content 宽度 */
     width: 200px;
     padding: 20px;  /* 实际占用 240px */
   }

   /* 怪异盒模型（推荐全局设置） */
   .border-box {
     box-sizing: border-box;  /* width = content + padding + border */
     width: 200px;
     padding: 20px;  /* 内容区自动缩小，总宽仍为 200px */
   }

   /* 全局推荐设置：让所有元素都使用 border-box */
   *,
   *::before,
   *::after {
     box-sizing: border-box;  /* 统一盒模型，避免布局计算混乱 */
   }
   ```

4. **实际开发中的最佳实践**

   ```css
   /* 现代 CSS 重置/normalize 中几乎都会包含这段 */
   *,
   *::before,
   *::after {
     box-sizing: border-box;  /* 全局统一使用 border-box */
   }

   /* 使用 border-box 后的好处：
    * 1. 设置 width: 50% 就是真正占一半，不用再减去 padding/border
    * 2. 表单元素的默认宽度更容易控制
    * 3. 响应式布局计算更直观
    */

   /* 示例：两栏等宽布局 */
   .column {
     float: left;
     width: 50%;           /* 各占一半，不用管 padding */
     padding: 15px;        /* 不会撑破布局 */
     border: 1px solid #ddd;
   }
   ```

### 🔍 追问链
1. **margin 是否属于盒模型的一部分？它参与 width 计算吗？**
   → 方向：margin 属于盒模型但不参与 width 计算（无论哪种盒模型）；margin 影响的是盒子之间的间距和文档流中的位置
2. **为什么推荐全局设置 box-sizing: border-box？有什么潜在问题？**
   → 方向：避免布局计算复杂化；注意：某些第三方组件库可能假设 content-box，导致样式冲突；解决方法是用 `inherit` 让组件保持自身设定
3. **替换元素（如 img、input）的盒模型有什么特殊性？**
   → 方向：替换元素的 width/height 默认由其内在尺寸决定；设置 width/height 时行为与非替换元素一致；但 display 不同时表现也不同

### 深度拓展：手写实现

#### JS 函数：动态计算元素实际占用空间

```javascript
/**
 * 计算元素在页面中实际占用的完整空间（含 margin）
 * @param {HTMLElement} el - 目标 DOM 元素
 * @returns {Object} 包含各层尺寸信息的对象
 */
function getElementBoxModel(el) {
  const style = window.getComputedStyle(el);  // 获取计算后的只读样式

  // 解析 CSS 值为数字（处理 auto 等特殊情况返回 0）
  const parseVal = (val) => {
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  // 提取盒模型四层各方向的数值
  const marginTop    = parseVal(style.marginTop);     // 上外边距
  const marginRight  = parseVal(style.marginRight);   // 右外边距
  const marginBottom = parseVal(style.marginBottom);  // 下外边距
  const marginLeft   = parseVal(style.marginLeft);    // 左外边距

  const borderTop    = parseVal(style.borderTopWidth);    // 上边框宽度
  const borderRight  = parseVal(style.borderRightWidth);  // 右边框宽度
  const borderBottom = parseVal(style.borderBottomWidth); // 下边框宽度
  const borderLeft   = parseVal(style.borderLeftWidth);   // 左边框宽度

  const paddingTop    = parseVal(style.paddingTop);     // 上内边距
  const paddingRight  = parseVal(style.paddingRight);   // 右内边距
  const paddingBottom = parseVal(style.paddingBottom);  // 下内边距
  const paddingLeft   = parseVal(style.paddingLeft);    // 左内边距

  // offsetWidth/Height 返回 border-box 尺寸（内容+padding+border，不含 margin）
  const borderBoxWidth  = el.offsetWidth;   // 元素渲染宽度
  const borderBoxHeight = el.offsetHeight;  // 元素渲染高度

  // 反算 content-box 的纯内容区尺寸
  const contentWidth  = borderBoxWidth  - paddingLeft - paddingRight  - borderLeft  - borderRight;
  const contentHeight = borderBoxHeight - paddingTop - paddingBottom - borderTop  - borderBottom;

  // 计算含 margin 的总占用空间
  const totalOccupiedWidth  = borderBoxWidth  + marginLeft + marginRight;   // 总占用宽度
  const totalOccupiedHeight = borderBoxHeight + marginTop  + marginBottom;  // 总占用高度

  return {
    content: { width: contentWidth, height: contentHeight },       // 内容区
    padding: { top: paddingTop, right: paddingRight, bottom: paddingBottom, left: paddingLeft,
               horizontal: paddingLeft + paddingRight, vertical: paddingTop + paddingBottom },  // 内边距
    border: { top: borderTop, right: borderRight, bottom: borderBottom, left: borderLeft,
              horizontal: borderLeft + borderRight, vertical: borderTop + borderBottom },         // 边框
    margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft,
              horizontal: marginLeft + marginRight, vertical: marginTop + marginBottom },        // 外边距
    borderBox: { width: borderBoxWidth, height: borderBoxHeight },      // Border Box
    totalSpace: { width: totalOccupiedWidth, height: totalOccupiedHeight },  // 总占用空间
    boxSizing: style.boxSizing  // 当前盒模型类型：'border-box' 或 'content-box'
  };
}

// 使用示例
const box = document.querySelector('.target-element');
const info = getElementBoxModel(box);
console.log('内容区尺寸:', info.content);
console.log('含 margin 总占用:', info.totalSpace);
console.log('盒模型类型:', info.boxSizing);
```

#### 完整可运行 Demo：两种盒模型对比

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>盒模型对比 Demo</title>
<style>
  body { font-family: system-ui; padding: 20px; }
  .compare { display: flex; gap: 40px; }          /* 两栏对比布局 */
  .box-wrapper { border: 2px dashed #999; padding: 10px; }
  .label { font-weight: bold; margin-bottom: 10px; }

  /* 标准盒模型（默认值） */
  .content-box {
    box-sizing: content-box;       /* 标准盒模型：width = 内容区 */
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 5px solid #e74c3c;    /* 红色边框 */
    margin: 10px;
    background: rgba(231,76,60,0.1); /* 浅红背景 */
  }

  /* 怪异盒模型（推荐使用） */
  .border-box {
    box-sizing: border-box;        /* 怪异盒模型：width = 内容+padding+border */
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 5px solid #27ae60;    /* 绿色边框 */
    margin: 10px;
    background: rgba(39,174,96,0.1); /* 浅绿背景 */
  }

  #result { margin-top: 20px; white-space: pre-line; font-family: monospace; }
</style>
</head>
<body>
<h2>盒模型对比演示</h2>
<div class="compare">
  <div class="box-wrapper">
    <div class="label">标准盒模型 (content-box)</div>
    <div class="content-box" id="el1">设定 width=200px</div>
  </div>
  <div class="box-wrapper">
    <div class="label">怪异盒模型 (border-box)</div>
    <div class="border-box" id="el2">设定 width=200px</div>
  </div>
</div>
<button onclick="analyze()">📊 分析两个元素的盒模型</button>
<div id="result"></div>

<script>
function analyze() {  // 点击按钮后分析并展示两个元素的完整盒模型信息
  const r1 = getElementBoxModel(document.getElementById('el1'));
  const r2 = getElementBoxModel(document.getElementById('el2'));
  document.getElementById('result').textContent =
    '【标准盒模型 content-box】\n' +
    `  设定 width: 200px\n` +
    `  内容区实际: ${r1.content.width}×${r1.content.height}px\n` +
    `  Border Box (offset): ${r1.borderBox.width}×${r1.borderBox.height}px\n` +
    `  含Margin总占用: ${r1.totalSpace.width}×${r1.totalSpace.height}px\n\n` +
    '【怪异盒模型 border-box】\n' +
    `  设定 width: 200px\n` +
    `  内容区实际: ${r2.content.width}×${r2.content.height}px\n` +
    `  Border Box (offset): ${r2.borderBox.width}×${r2.borderBox.height}px\n` +
    `  含Margin总占用: ${r2.totalSpace.width}×${r2.totalSpace.height}px`;
}
</script>
</body>
</html>
```

---

## Q06: CSS 选择器的优先级是如何计算的？
- **难度**：★☆☆
- **知识点**：选择器优先级 / 权重计算 / Specificity
- **题型**：简答题

### 参考答案要点：

1. **优先级权重体系（四组数值）**

   CSS 选择器的优先级用一个四元组 `(a, b, c, d)` 表示，数值越大优先级越高：

   | 组别 | 对应选择器类型 | 权重值示例 |
   |------|---------------|-----------|
   | **a** | `!important` | ∞（无穷大） |
   | **b** | 行内 style 属性 | `(1,0,0,0)` |
   | **c** | ID 选择器 | `(0,1,0,0)` |
   | **d** | 类选择器 / 属性选择器 / 伪类 | `(0,0,1,0)` |
   | **e** | 元素选择器 / 伪元素 | `(0,0,0,1)` |
   | **f** | 通配符 `*` / 结合符 `+ > ~` | `(0,0,0,0)` |
   | **g** | 继承的样式 | **无优先级**（最低） |

2. **具体计算示例**

   ```css
   /* 权重计算示例 */

   div                  { color: red; }        /* (0,0,0,1) = 1 */
   .class               { color: blue; }       /* (0,0,1,0) = 10 → 胜出 */
   #id                  { color: green; }      /* (0,1,0,0) = 100 → 胜出 */
   div p                { color: orange; }     /* (0,0,0,2) = 2 */
   div .class           { color: purple; }     /* (0,0,1,1) = 11 */
   div .class span      { color: pink; }       /* (0,0,1,2) = 12 */
   #id .class           { color: brown; }      /* (0,1,1,0) = 110 */
   #id .class span      { color: black; }      /* (0,1,1,1) = 111 */

   /* 行内样式 */
   <div style="color: yellow;">  /* (1,0,0,0) = 1000 → 胜出所有上面 */

   /* !important */
   color: red !important;  /* 无限大，覆盖一切（除了用户代理的重要声明） */
   ```

3. **优先级比较规则**

   ```
   比较顺序：从左到右逐位比较，高位胜出即停止

   (0,1,0,0) vs (0,0,10,10)
   → 第一位都是 0，继续
   → 第二位：1 vs 0 → 第一个胜出！（不管后面多少个10）

   这意味着：1个 ID 选择器 > 无穷多个类选择器
   ```

4. **注意事项与常见陷阱**

   ```css
   /* ⚠️ 陷阱1：不要过度依赖 !important */
   .text-red {
     color: red !important;  /* 应尽量避免，破坏了层叠规则的可预测性 */
   }

   /* ⚠️ 陷阱2：属性选择器和类选择器权重相同 */
   input[type="text"] { ... }   /* (0,0,1,0) */
   .form-input { ... }          /* (0,0,1,0) */
   /* 两者权重相同，后定义的胜出 */

   /* ⚠️ 陷阱3：:not() 本身不增加权重，括号内的选择器才计算 */
   :not(.special) { ... }       /* 权重 = (0,0,1,0)，来自 .special */
   div:not(.special) { ... }    /* 权重 = (0,0,1,1)，div + .special */

   /* ⚠️ 陷阱4：继承的样式优先级最低 */
   body { font-size: 16px; }
   p { font-size: 14px; }       /* 即使 body 写在后面，p 的 14px 也胜出 */
   /* 因为 p 的 (0,0,0,1) > 继承的（无权重） */
   ```

### 🔍 追问链
1. **CSS 的层叠（Cascade）和优先级（Specificity）是一回事吗？**
   → 方向：不是同一概念。层叠是解决冲突的三步机制（来源→优先级→源码顺序）；优先级只是其中一步的计算方法
2. **如何查看浏览器中某个元素最终应用样式的优先级来源？**
   → 方向：Chrome DevTools → Elements → Styles 面板，每条规则右侧显示选择器 specificity，删除线表示被覆盖
3. **在实际项目中如何管理 CSS 优先级以避免样式冲突？**
   → 方向：BEM 命名降低选择器嵌套深度；CSS Modules/Scoped CSS 隔离作用域；避免 ID 选择器做样式定义；慎用 !important

---

## Q07: em 和 rem 的区别是什么？
- **难度**：★☆☆
- **知识点**：CSS单位 / 相对单位 / 响应式设计
- **题型**：简答题

### 参考答案要点：

1. **em 与 rem 的定义差异**

   ```css
   :root {
     font-size: 16px;  /* 浏览器默认基准字号 */
   }

   .parent {
     font-size: 20px;  /* 父元素字号设为 20px */
   }

   /* em：相对于父元素的 font-size 计算 */
   .child-em {
     font-size: 1.5em;  /* 1.5 × 父元素字号 = 1.5 × 20px = 30px */
     padding: 1em;      /* 1 × 当前元素字号 = 30px（注意：是当前元素！） */
     margin: 2em;       /* 2 × 当前元素字号 = 60px */
   }

   /* rem：相对于根元素（html）的 font-size 计算 */
   .child-rem {
     font-size: 1.5rem;  /* 1.5 × 根元素字号 = 1.5 × 16px = 24px */
     padding: 1rem;      /* 1 × 16px = 16px */
     margin: 2rem;       /* 2 × 16px = 32px */
   }
   ```

2. **核心区别对比表**

   | 特性 | em | rem |
   |------|-----|-----|
   | **参照对象** | 当前元素的父元素（font-size）/ 当前元素本身（其他属性） | 始终是根元素 `<html>` |
   | **继承性** | 会逐层复合（嵌套时 em 值会累积放大） | 始终固定，不受嵌套影响 |
   | **可预测性** | 较差，取决于上下文 | 强，全局统一基准 |
   | **典型用途** | 字体相关属性、组件内部比例 | 全局布局、间距、响应式适配 |
   | **媒体查询支持** | 不常用 | 常配合媒体查询做适配 |

3. **em 的"复合效应"陷阱**

   ```html
   <div class="level-1">                    <!-- font-size: 1.5em = 24px -->
     <div class="level-2">                  <!-- font-size: 1.5em = 36px! (24×1.5) -->
       <div class="level-3">                <!-- font-size: 1.5em = 54px! (36×1.5) -->
         文字越来越大...
       </div>
     </div>
   </div>
   ```

   ```css
   /* em 嵌套导致的字号膨胀问题 */
   div {
     font-size: 1.5em;  /* 每层都在父元素基础上 ×1.5 */
   }
   /* level-1: 16px × 1.5 = 24px
    * level-2: 24px × 1.5 = 36px
    * level-3: 36px × 1.5 = 54px
    * 这通常是 unintended behavior（非预期行为）
    */
   ```

4. **rem 在响应式设计中的应用**

   ```css
   /* 移动端适配的经典方案：rem + 动态设置根字号 */
   html {
     font-size: 16px;  /* PC端基准 */
   }

   /* 通过 JavaScript 动态设置根字号（根据屏幕宽度） */
   /*
    function setRem() {
      const docEl = document.documentElement;
      const width = docEl.clientWidth;
      // 设计稿宽度 375px，基准 rem = 16px
      docEl.style.fontSize = (width / 375) * 16 + 'px';
    }
    window.addEventListener('resize', setRem);
    setRem();
   */

   /* 或者使用纯 CSS 的 clamp 方案 */
   html {
     /* 最小14px，最大18px，随视口宽度在 375px~1440px 之间线性缩放 */
     font-size: clamp(14px, calc(100vw / 375 * 16), 18px);
   }

   /* 使用 rem 编写所有尺寸 */
   .container {
     width: 23.4375rem;   /* 375px / 16px ≈ 23.44rem */
     padding: 1rem;
     margin-bottom: 0.75rem;
   }

   .title {
     font-size: 1.125rem;  /* 18px */
     line-height: 1.5rem;
   }
   ```

### 🔍 追问链
1. **什么时候应该用 em 而不是 rem？**
   → 方向：需要相对于父元素/当前元素字号的场景——如按钮内图标大小跟随文字、行高、段落缩进、组件内部比例
2. **vw/vh 单位和 rem 方案各有什么优劣？如何选择？**
   → 方向：vw 更简洁无需 JS 但兼容性略差（低版本 iOS Safari 有 bug）；rem 兼容性更好但需要额外 JS 设置基准；现在主流是 vw + rem 混合或纯 vw
3. **如何在高 DPI 屏幕（Retina）上处理 px/rem 的显示问题？**
   → 方向：CSS 像素 vs 物理像素的关系由设备像素比 DPR 决定；rem 方案天然适配 DPR；无需特别处理（浏览器自动缩放）

---

## Q08: 伪元素和伪类的区别是什么？分别有哪些常用项？
- **难度**：★☆☆
- **知识点**：伪元素 / 伪类 / CSS选择器
- **题型**：简答题

### 参考答案要点：

1. **核心区别**

   | 维度 | 伪类（Pseudo-class） | 伪元素（Pseudo-element） |
   |------|---------------------|------------------------|
   | **本质** | 选择处于**特定状态**的已有元素 | 创建一个**不存在于 DOM**中的虚拟元素 |
   | **语法** | 单冒号 `:`（CSS3 也接受双冒号） | 双冒号 `::`（CSS3 标准） |
   | **数量** | 一个元素可以有多个伪类状态 | 通常每个选择器最多使用一个伪元素 |
   | **代表** | `:hover`、`:focus`、`:nth-child()` | `::before`、`::after`、`::placeholder` |
   | **JavaScript** | 可以通过 `classList` 操作状态 | 无法通过 JS 直接操作（不存在于 DOM） |

2. **常用伪类列表**

   ```css
   /* ===== 用户交互状态伪类 ===== */
   a:hover      { color: red; }     /* 鼠标悬停 */
   a:focus      { outline: none; }  /* 获得焦点（键盘Tab/点击） */
   a:active     { color: blue; }    /* 被激活（鼠标按下瞬间） */
   a:visited    { color: purple; }  /* 已访问链接（出于隐私限制，只能改颜色） */

   /* LVHA 顺序记忆法：Link → Visited → Hover → Active */

   /* ===== 表单状态伪类 */
   input:focus-visible { outline: 2px solid blue; }  /* 键盘聚焦时显示焦点环 */
   input:enabled    { opacity: 1; }    /* 启用状态 */
   input:disabled   { opacity: 0.5; }  /* 禁用状态 */
   input:checked    { ... }            /* radio/checkbox 被选中 */
   input:required   { ... }            /* 必填字段 */
   input:valid      { ... }            /* 输入值合法 */
   input:invalid    { ... }            /* 输入值非法 */

   /* ===== 结构伪类（非常强大！） */
   li:first-child   { ... }   /* 第一个子元素 */
   li:last-child    { ... }   /* 最后一个子元素 */
   li:nth-child(2)  { ... }   /* 第2个子元素 */
   li:nth-child(odd){ ... }   /* 奇数位置 */
   li:nth-child(even){...}   /* 偶数位置 */
   li:nth-child(3n+1){ ... }  /* 每3个中的第1个（1,4,7,10...） */
   li:only-child    { ... }   /* 唯一子元素 */

   /* 结构伪类的"of-type"变体（更精确） */
   p:first-of-type  { ... }   /* 同级兄弟中的第一个 p 元素 */
   p:nth-of-type(2) { ... }   /* 同级兄弟中的第2个 p 元素 */

   /* 否定伪类 */
   div:not(.exclude) { ... }  /* 排除匹配 .exclude 的 div */

   /* 其他实用伪类 */
   :empty            { ... }   /* 没有子元素的元素 */
   :target           { ... }   /* 被 URL 锚点指向的元素 */
   :is(.a, .b)      { ... }   /* 匹配任一选择器（简化写法） */
   :where(.a, .b)   { ... }   /* 同上，但优先级权重为0 */
   ```

3. **常用伪元素列表**

   ```css
   /* ::before 和 ::after —— 最常用的两个伪元素 */
   .card::before {
     content: '';           /* 必须设置 content 属性，否则不渲染 */
     display: block;
     position: absolute;
     top: 0; left: 0;
     width: 100%; height: 3px;
     background: linear-gradient(to right, #ff6b6b, #4ecdc4);  /* 顶部渐变线 */
   }

   .required-label::after {
     content: '*';          /* 生成红色星号 */
     color: red;
     margin-left: 4px;
   }

   /* ::placeholder —— 自定义表单占位符样式 */
   input::placeholder {
     color: #999;
     font-size: 14px;
   }

   /* ::selection —— 选中文本的样式 */
   ::selection {
     background: #ffeb3b;
     color: #000;
   }

   /* ::first-letter / ::first-line —— 排饰用 */
   p::first-letter {
     font-size: 2em;
     font-weight: bold;
     float: left;  /* 首字下沉效果 */
   }
   p::first-line {
     color: #666;  /* 第一行文字特殊颜色 */
   }

   /* ::marker —— 列表项符号/编号样式 */
   li::marker {
     content: '→ ';  /* 自定义列表前缀 */
     color: #4ecdc4;
   }
   ```

4. **伪元素的典型实战应用**

   ```css
   /* 应用1：清除浮动（经典用法） */
   .clearfix::after {
     content: '';
     display: table;
     clear: both;  /* 清除左右浮动 */
   }

   /* 应用2：CSS 绘制三角形（箭头、提示框） */
   .tooltip::after {
     content: '';
     position: absolute;
     bottom: 100%;
     left: 50%;
     transform: translateX(-50%);
     border: 6px solid transparent;
     border-bottom-color: #333;  /* 向下的小三角 */
   }

   /* 应用3：装饰性背景图案 */
   .divider::before,
   .divider::after {
     content: '';
     flex: 1;
     height: 1px;
     background: linear-gradient(to right, transparent, #ddd, transparent);
   }

   /* 应用4：计数器配合伪元素实现自动编号 */
   .section {
     counter-reset: section;  /* 重置计数器 */
   }
   .section h2::before {
     counter-increment: section;  /* 计数器自增 */
     content: '第' counter(section, cjk-ideographic) '章 ';
   }
   ```

### 🔍 追问链
1. **伪元素生成的"虚拟元素"能否被 JavaScript 获取和修改？**
   → 方向：无法通过 DOM API 直接获取；但可以通过 `getComputedStyle()` 读取计算后的样式；可通过修改 CSS 变量间接改变伪元素样式
2. **::before/::after 的 content 属性有哪些有趣的用法？**
   → 方向：普通字符串、`attr(data-xxx)` 读取 HTML 属性、`url()` 插入图片、`counter()` 计数器、引号 `open-quote/close-quote`
3. **:is() 和 :where() 的区别是什么？什么时候用哪个？**
   → 方向：功能相同（匹配多选），但 `:is()` 的优先级取最高者，`:where()` 的优先级恒为 0；需要保持低优先级时用 `:where()`

---

## Q09: display: none 和 visibility: hidden 的区别？
- **难度**：★☆☆
- **知识点**：CSS隐藏元素 / DOM可见性 / 渲染性能
- **题型**：简答题

### 参考答案要点：

1. **核心区别对比**

   ```css
   .hidden-none {
     display: none;
     /* 效果：
      * 1. 元素完全不可见
      * 2. 不占据文档流空间（如同元素被移除）
      * 3. 不响应事件（点击穿透）
      * 4. 子元素也被隐藏（即使子元素设为 visibility: visible 也无效）
      * 5. 触发 reflow（回流/重排）
      */
   }

   .hidden-visibility {
     visibility: hidden;
     /* 效果：
      * 1. 元素不可见
      * 2. 仍然占据原来的文档流空间（空白占位）
      * 3. 不响应事件（点击穿透）
      * 4. 子元素可通过 visibility: visible 重新显示
      * 5. 只触发 repaint（重绘），不触发 reflow
      */
   }
   ```

2. **详细对比表**

   | 特性 | `display: none` | `visibility: hidden` | `opacity: 0` |
   |------|----------------|---------------------|-------------|
   | **是否可见** | ❌ 不可见 | ❌ 不可见 | ❌ 不可见（但半透明） |
   | **是否占位** | ❌ 不占空间 | ✅ 占据原空间 | ✅ 占据原空间 |
   | **是否响应事件** | ❌ 不响应 | ❌ 不响应 | ✅ 响应事件 |
   | **子元素可恢复** | ❌ 不能 | ✅ 可以（设 visible） | ✅ 可以（设 opacity: 1） |
   | **触发回流/重绘** | 回流（Reflow） | 重绘（Repaint） | 合成（Composite） |
   | **过渡动画支持** | ❌ 不支持 | ⚠️ 有限支持 | ✅ 支持平滑过渡 |
   | **典型用途** | 完全隐藏（如折叠面板收起态） | 占位隐藏（如屏幕外预渲染） | 淡入淡出动画 |

3. **实际应用场景示例**

   ```html
   <!-- 场景1：选项卡切换（display: none） -->
   <style>
     .tab-content { display: none; }  /* 默认全部隐藏 */
     .tab-content.active { display: block; }  /* 激活时显示 */
   </style>
   <div class="tab-content active">内容 A</div>
   <div class="tab-content">内容 B</div>

   <!-- 场景2：预加载隐藏内容（visibility: hidden） -->
   <style>
     .preloaded {
       visibility: hidden;  /* 不可见但已渲染，切回 visible 时瞬间显示 */
       position: absolute;
     }
   </style>
   <div class="preloaded">
     <img src="large-image.jpg" alt="预加载的大图">
   </div>

   <!-- 场景3：淡入淡出动画（opacity + transition） -->
   <style>
     .fade-element {
       opacity: 0;
       transition: opacity 0.3s ease;  /* 平滑过渡 */
     }
     .fade-element.show {
       opacity: 1;
     }
   </style>
   ```

4. **其他"隐藏"方式的补充**

   ```css
   /* 方式4：尺寸归零隐藏 */
   .hide-size {
     width: 0; height: 0;
     overflow: hidden;  /* 溢出内容裁剪 */
     padding: 0;
     margin: 0;
     border: 0;
   }

   /* 方式5：移出可视区域（不影响布局） */
   .hide-position {
     position: absolute;
     left: -9999px;  /* 移到屏幕外 */
     /* 或者 */
     transform: translateX(-100%);  /* GPU 加速移出 */
   }

   /* 方式6：clip-path 裁剪（性能好，GPU 加速） */
   .hide-clip {
     clip-path: circle(0);  /* 裁剪为零 */
     /* clip-path: inset(50%); */  /* 同样效果 */
   }

   /* 方式7：aria-hidden（语义层面隐藏，屏幕阅读器不读） */
   .sr-only {
     position: absolute;
     width: 1px; height: 1px;
     overflow: hidden;
     clip: rect(0, 0, 0, 0);
     white-space: nowrap;
     border: 0;
   }
   /* 这个类常用于"视觉隐藏但屏幕阅读器可读"的场景 */
   ```

### 🔍 追问链
1. **display: none 的元素在 DOM 中存在吗？可以被 JavaScript 操作吗？**
   → 方向：仍在 DOM 树中，可以用 JS 获取和操作；只是不在渲染树（Render Tree）中；`offsetWidth/offsetHeight` 等值为 0
2. **visibility: hidden 的子元素设为 visibility: visible 能显示吗？有什么限制？**
   → 方向：可以显示，但前提是父元素仍然占据空间；这被称为"局部可见性"；常用于复杂的 tooltip 或下拉菜单实现
3. **哪种隐藏方式最适合做入场/退场动画？为什么？**
   → 方向：opacity + pointer-events（可选）最好，因为支持 transition 动画且 GPU 加速；display:none 无法过渡；visibility 过渡只有开始和结束两帧

---

## Q10: position 各个值的区别？（static/relative/absolute/fixed/sticky）
- **难度**：★☆☆
- **知识点**：CSS定位 / Position属性 / 布局机制
- **题型**：简答题

### 参考答案要点：

1. **五个定位值的总览**

   ```css
   .static {
     position: static;  /* 默认值，正常文档流定位 */
   }
   .relative {
     position: relative;  /* 相对定位：相对自身原位置偏移 */
   }
   .absolute {
     position: absolute;  /* 绝对定位：脱离文档流，相对最近定位祖先 */
   }
   .fixed {
     position: fixed;  /* 固定定位：脱离文档流，相对视口定位 */
   }
   .sticky {
     position: sticky;  /* 粘性定位：基于滚动位置的混合模式 */
   }
   ```

2. **逐一详解**

   **① static（静态定位）—— 默认值**

   ```css
   .element {
     position: static;  /* 默认值，可不写 */
     top/left/right/bottom/z-index: 无效;  /* 这些属性不生效 */
   }
   /* 特点：
    * - 元素按照正常文档流排列（block 竖排，inline 横排）
    * - top/left/right/bottom/z-index 属性无效
    * - 这是所有元素的默认定位方式
    */
   ```

   **② relative（相对定位）**

   ```css
   .relative-box {
     position: relative;
     top: 10px;    /* 向下偏移 10px（相对于原位置） */
     left: 20px;   /* 向右偏移 20px */
   }
   /* 特点：
    * - 不脱离文档流（原位置仍保留占位）
    * - 相对于自己在正常流中的"原始位置"进行偏移
    * - 常用作绝对定位子元素的"定位参考父级"
    * - 可与其他元素重叠（通过 z-index 控制）
    */
   ```

   **③ absolute（绝对定位）**

   ```css
   .parent {
     position: relative;  /* 成为子元素的定位参考 */
     width: 300px;
     height: 200px;
   }

   .absolute-child {
     position: absolute;
     top: 20px;     /* 距离定位父级顶部 20px */
     right: 15px;   /* 距离定位父级右边 15px */
     /* 未指定的方向 auto 撑开 */
   }
   /* 特点：
    * - 完全脱离文档流（不占空间，其他元素会填补其位置）
    * - 相对于最近的非 static 定位祖先元素定位
    * - 若没有定位祖先，则相对于初始包含块（通常是 viewport/body）
    * - 会变为块级盒子（display 被计算为 block）
    * - 常用于：悬浮按钮、下拉菜单、弹窗定位、角标
    */
   ```

   **④ fixed（固定定位）**

   ```css
   .fixed-header {
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     z-index: 1000;
     /* 固定在视口顶部，滚动时不移动 */
   }

   .back-to-top {
     position: fixed;
     bottom: 30px;
     right: 30px;
     /* 固定在视口右下角 */
   }
   /* 特点：
    * - 脱离文档流（同 absolute）
    * - 始终相对于**视口（viewport）**定位，不随页面滚动
    * - parent 的任何 transform/filter/perspective 会破坏 fixed 定位
    * - 常用于：固定导航栏、回到顶部按钮、悬浮客服、全屏遮罩
    */
   ```

   **⑤ sticky（粘性定位）**

   ```css
   .sticky-header {
     position: sticky;
     top: 0;  /* 距离视口顶部为 0 时"粘住" */
     /* 当元素滚动到距离顶部 0px 的位置时，
      * 从 relative 切换为 fixed 行为 */
     z-index: 100;
     background: white;
   }

   .sticky-sidebar {
     position: sticky;
     top: 80px;  /* 距离视口顶部 80px 时粘住（考虑固定 header 高度） */
     max-height: calc(100vh - 100px);
     overflow-y: auto;
   }
   /* 特点：
    * - 不完全脱离文档流（原有空间保留）
    * - 表现像 relative 和 fixed 的混合体
    * - 必须指定 top/bottom/left/right 至少一个阈值
    * - 父容器不能有 overflow: hidden/auto/scroll（会粘性失效）
    * - 常用于：吸顶导航、粘性侧边栏、表格 sticky 表头
    */
   ```

3. **定位机制总结图示**

   ```
   文档流示意：

   static / relative（在文档流中）：
   ┌─────────────────┐
   │ Block A         │  ← 正常排列
   │ Block B (rel)   │  ← 原位置保留，视觉偏移
   │ Block C         │  ← 正常排列（好像 B 还在原位）
   └─────────────────┘

   absolute / fixed（脱离文档流）：
   ┌─────────────────┐
   │ Block A         │
   │ Block C         │  ← B 脱离文档流，C 上移填补
   │    ┌──────┐     │
   │    │ B(abs)│     │  ← B 浮在上面（绝对/固定定位）
   │    └──────┘     │
   └─────────────────┘
   ```

### 🔍 追问链
1. **absolute 定位的元素如果没有非 static 的祖先会怎样？**
   → 方向：相对于"初始包含块（Initial Containing Block）"定位，通常是 viewport（但在某些浏览器中可能是 html 元素）
2. **fixed 定位在什么情况下会失效？**
   → 方向：祖先元素设置了 `transform`（非none）、`filter`（非none）、`will-change`、`contain: paint` 等属性时，fixed 会降级为 absolute
3. **sticky 定位的常见"失效"原因有哪些？**
   → 方向：父容器 overflow 不是 visible；未指定 top/bottom/left/right；父容器高度不够（没滚完就到底了）；sticky 元素的高度超过父容器

---

## Q11: 什么是 BFC？如何触发 BFC？有什么应用场景？
- **难度**：★☆☆
- **知识点**：BFC / 块级格式化上下文 / 布局隔离
- **题型**：简答题

### 参考答案要点：

1. **BFC 的定义**

   BFC（Block Formatting Context，块级格式化上下文）是 Web 页面中一个**独立的渲染区域**，内部的元素布局不会影响外部，外部的元素也不会影响内部。可以理解为一种"布局沙箱"。

   ```
   ┌─────────────────────────────────────┐
   │  外部环境（Normal Flow）              │
   │  ┌───────────────────────────────┐  │
   │  │  BFC 内部（独立渲染区域）        │  │
   │  │  - 内部 Box 垂直排列            │  │
   │  │  - Margin 垂直方向可能折叠       │  │
   │  │  - 浮动元素也参与高度计算       │  │
   │  │  - 不与外部浮动元素重叠          │  │
   │  └───────────────────────────────┘  │
   └─────────────────────────────────────┘
   ```

2. **触发 BFC 的方式**

   ```css
   /* 方法1：float（不为 none） */
   .bfc-float { float: left; }

   /* 方法2：position（absolute / fixed） */
   .bfc-absolute { position: absolute; }
   .bfc-fixed { position: fixed; }

   /* 方法3：overflow（不为 visible，最常用） */
   .bfc-overflow { overflow: hidden; }   /* 最常用的触发方式 */
   .bfc-auto { overflow: auto; }

   /* 方法4：display（特定值） */
   .bfc-inline-block { display: inline-block; }
   .bfc-table-cell { display: table-cell; }
   .bfc-flex { display: flex; }           /* Flex/Grid 容器也是 BFC */
   .bfc-grid { display: grid; }
   .bfc-flow-root { display: flow-root; } /* CSS3 新增，专门用于创建 BFC */

   /* 方法5：contain 值为 layout / content / paint / strict */
   .bfc-contain { contain: layout; }

   /* 多列布局 */
   .bfc-columns { column-count: 3; }
   ```

   **推荐方式**：现代项目中优先使用 `display: flow-root`（语义清晰，无副作用），其次是 `overflow: hidden`（兼容性好但有截断风险）。

3. **BFC 的核心特性与应用**

   **应用一：清除浮动（防止高度塌陷）**

   ```css
   .parent {
     /* 父元素没有高度，子元素浮动后高度塌陷为 0 */
     /* 解决方案：触发父元素的 BFC */
     overflow: hidden;  /* 或 display: flow-root */
   }
   .child {
     float: left;
     width: 100px;
     height: 100px;
   }
   /* BFC 的特性：浮动元素也会参与 BFC 的高度计算 */
   ```

   **应用二：阻止外边距折叠（Margin Collapsing）**

   ```css
   /* 问题：相邻块级元素的垂直 margin 会发生折叠 */
   .box1 { margin-bottom: 20px; }
   .box2 { margin-top: 30px; }
   /* 实际间距 = max(20, 30) = 30px，而非 50px */

   /* 解决：将其中一个元素包裹在 BFC 容器中 */
   .wrapper {
     display: flow-root;  /* 创建 BFC，阻止 margin 穿透 */
   }
   .wrapper .box1 { margin-bottom: 20px; }
   .box2 { margin-top: 30px; }
   /* 现在 margin 不会折叠，实际间距 = 50px */
   ```

   **应用三：阻止浮动元素重叠**

   ```css
   .sidebar {
     float: left;
     width: 200px;
   }
   .content {
     /* 默认情况下，content 的文字会环绕 sidebar */
     /* 触发 BFC 后，content 会建立一个独立的格式化上下文，
      * 不会与浮动元素重叠 */
     overflow: hidden;  /* 或 display: flow-root */
   }
   ```

4. **BFC 的布局规则总结**

   ```
   BFC 内部的布局规则：
   1. 内部的 Box 在垂直方向，一个接一个地放置
   2. 垂直方向的距离由 margin 决定（同一个 BFC 内的两个相邻 Box 的 margin 会折叠）
   3. 每个元素的左外边缘，与包含块的左边缘接触（float 除外）
   4. BFC 的区域不会与 float box 重叠
   5. 计算 BFC 的高度时，浮动元素也参与计算
   6. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
   ```

### 🔍 追问链
1. **overflow: hidden 触发 BFC 有什么副作用？**
   → 方向：溢出内容会被裁剪（如 dropdown 下拉菜单被截断）；`display: flow-root` 无此副作用但 IE 不支持
2. **Flex 容器和 Grid 容器都是 BFC 吗？它们之间有区别吗？**
   → 方向：是的，它们都创建 BFC；但它们的内部布局规则各自独立（flex 采用弹性布局规则，grid 采用网格规则）
3. **多个嵌套的 BFC 之间会有什么相互影响吗？**
   → 方向：BFC 的隔离性保证了互不影响；内部 BFC 的浮动不会影响外部 BFC；但定位（absolute/fixed）仍可能突破 BFC 边界

### 深度拓展：手写实现

#### 工具函数：检测元素是否触发了 BFC

```javascript
/**
 * 检测一个 DOM 元素是否形成了 BFC（块级格式化上下文）
 * @param {HTMLElement} el - 要检测的 DOM 元素
 * @returns {Object} { isBFC: boolean, trigger: string, details: Object }
 */
function checkIsBFC(el) {
  const style = window.getComputedStyle(el);  // 获取计算样式
  const triggers = [];  // 收集所有触发 BFC 的原因

  // 检查1：float 不为 none（浮动元素自身形成 BFC）
  if (style.float !== 'none') {
    triggers.push(`float: ${style.float}`);
  }

  // 检查2：position 为 absolute 或 fixed
  if (style.position === 'absolute' || style.position === 'fixed') {
    triggers.push(`position: ${style.position}`);
  }

  // 检查3：overflow 不为 visible
  if (style.overflow !== 'visible') {
    triggers.push(`overflow: ${style.overflow}`);
  }

  // 检查4：display 为 BFC 触发值
  const bfcDisplays = ['inline-block', 'table-cell', 'table-caption', 'flow-root', 'flex', 'grid', 'inline-flex'];
  if (bfcDisplays.includes(style.display)) {
    triggers.push(`display: ${style.display}`);
  }

  // 检查5：contain 包含 layout/paint/content/strict
  const containVal = style.contain;
  if (containVal && containVal !== 'none' && containVal !== 'size' && containVal !== 'style') {
    // contain: layout / paint / content / strict 都会创建 BFC
    triggers.push(`contain: ${containVal}`);
  }

  // 检查6：column-count 多列布局
  const columnCount = parseInt(style.columnCount);
  if (!isNaN(columnCount) && columnCount > 1) {
    triggers.push(`column-count: ${columnCount}`);
  }

  return {
    isBFC: triggers.length > 0,        // 是否形成 BFC
    trigger: triggers.join(', '),      // 所有触发原因
    count: triggers.length,             // 触发原因数量
    display: style.display,             // 当前 display 值
    position: style.position,           // 当前 position 值
    overflow: style.overflow,           // 当前 overflow 值
    float: style.float                  // 当前 float 值
  };
}

// 批量检测页面上所有元素的 BFC 状态
function auditPageBFC() {
  const allElements = document.querySelectorAll('*');  // 获取所有元素
  const bfcElements = [];

  allElements.forEach(el => {
    const result = checkIsBFC(el);
    if (result.isBFC) {
      bfcElements.push({
        tag: el.tagName.toLowerCase(),     // 标签名
        class: el.className,               // 类名
        id: el.id,                         // ID
        trigger: result.trigger            // 触发原因
      });
    }
  });

  console.log(`📊 页面共找到 ${bfcElements.length} 个形成 BFC 的元素：`);
  console.table(bfcElements);  // 以表格形式输出，便于查看
  return bfcElements;
}
```

#### 完整可运行 Demo：BFC 三大应用场景对比

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>BFC 应用场景完整 Demo</title>
<style>
  body { font-family: system-ui; padding: 20px; max-width: 900px; margin: 0 auto; }
  h2 { border-bottom: 2px solid #333; padding-bottom: 8px; }
  .demo-section { margin: 30px 0; border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
  .demo-title { font-weight: bold; color: #2c3e50; margin-bottom: 10px; }

  /* ========== 场景一：清除浮动（防止高度塌陷）========== */
  .float-parent {
    background: #ffeaa7;  /* 黄色背景：塌陷时会消失 */
    /* 取消下面的注释来触发 BFC 解决塌陷 */
    /* overflow: hidden; */
    /* display: flow-root; */
  }
  .float-child {
    float: left;           /* 子元素浮动 */
    width: 80px;
    height: 80px;
    background: #74b9ff;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

  /* ========== 场景二：阻止 margin 折叠 ========== */
  .margin-outer { background: #dfe6e9; padding: 10px; }
  .margin-box1 { height: 50px; background: #fd79a8; margin-bottom: 20px; }
  .margin-box2 { height: 50px; background: #00b894; margin-top: 30px; }
  .bfc-wrapper {
    /* 取消注释触发 BFC 阻止 margin 折叠 */
    /* display: flow-root; */
  }

  /* ========== 场景三：阻止浮动重叠（自适应两栏）========== */
  .layout-demo { overflow: hidden; }
  .layout-sidebar {
    float: left;            /* 左侧栏浮动 */
    width: 120px;
    height: 150px;
    background: #a29bfe;
  }
  .layout-content {
    /* 默认文字会环绕浮动元素 */
    /* 取消注释触发 BFC 实现真正两栏 */
    /* overflow: hidden; */
    /* display: flow-root; */
    height: 150px;
    background: #81ecec;
  }

  .controls { margin: 15px 0; }
  button { margin: 5px; padding: 6px 14px; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; }
</style>
</head>
<body>
<h1>🧪 BFC 三大应用场景交互式 Demo</h1>

<!-- ====== 场景一：清除浮动 ====== -->
<div class="demo-section">
  <div class="demo-title">场景一：清除浮动 — 防止父元素高度塌陷</div>
  <div class="controls">
    <button onclick="toggleBFC('float-parent')">🔄 切换父元素 BFC</button>
  </div>
  <div class="float-parent" id="float-parent">
    <div class="float-child">浮动子元素1</div>
    <div class="float-child">浮动子元素2</div>
    <div class="float-child">浮动子元素3</div>
  </div>
  <p id="float-info" style="font-size:13px;color:#666;">当前状态：未触发 BFC（黄色背景高度塌陷）</p>
</div>

<!-- ====== 场景二：阻止 margin 折叠 ====== -->
<div class="demo-section">
  <div class="demo-title">场景二：阻止 Margin 折叠 — 相邻元素间距应为 50px</div>
  <div class="controls">
    <button onclick="toggleBFC('bfc-wrapper')">🔄 切换包裹层 BFC</button>
  </div>
  <div class="margin-outer">
    <div class="bfc-wrapper" id="bfc-wrapper">
      <div class="margin-box1" style="text-align:center;line-height:50px;">Box1 (margin-bottom:20px)</div>
    </div>
    <div class="margin-box2" style="text-align:center;line-height:50px;">Box2 (margin-top:30px)</div>
  </div>
  <p id="margin-info" style="font-size:13px;color:#666;">
    当前状态：未触发 BFC（margin 折叠后实际间距 = max(20,30) = 30px）
  </p>
</div>

<!-- ====== 场景三：阻止浮动重叠 ====== -->
<div class="demo-section">
  <div class="demo-title">场景三：自适应两栏 — 阻止内容区与浮动侧边栏重叠</div>
  <div class="controls">
    <button onclick="toggleBFC('layout-content')">🔄 切换内容区 BFC</button>
  </div>
  <div class="layout-demo">
    <div class="layout-sidebar">固定侧栏<br>120px宽</div>
    <div class="layout-content" id="layout-content">自适应内容区（文字环绕 vs 独立两栏）</div>
  </div>
  <p id="layout-info" style="font-size:13px;color:#666;">当前状态：未触发 BFC（内容区文字环绕侧边栏）</p>
</div>

<script>
// 切换指定元素的 BFC 状态
function toggleBFC(id) {
  const el = document.getElementById(id);
  const current = window.getComputedStyle(el).display;

  if (current === 'flow-root') {
    el.style.display = '';   // 移除 flow-root，关闭 BFC
  } else {
    el.style.display = 'flow-root';  // 设置 flow-root，开启 BFC
  }

  // 更新状态提示信息
  const info = document.getElementById(id.replace(/-.*/, '') + '-info');
  if (!info) return;

  const isBFC = window.getComputedStyle(el).display === 'flow-root';
  if (id === 'float-parent') {
    info.textContent = isBFC
      ? '✅ 已触发 BFC：父元素高度正常包裹浮动子元素'
      : '❌ 未触发 BFC：父元素高度塌陷（黄色背景消失）';
  } else if (id === 'bfc-wrapper') {
    info.textContent = isBFC
      ? '✅ 已触发 BFC：Margin 未折叠，实际间距 = 20 + 30 = 50px'
      : '❌ 未触发 BFC：Margin 折叠，实际间距 = max(20, 30) = 30px';
  } else if (id === 'layout-content') {
    info.textContent = isBFC
      ? '✅ 已触发 BFC：内容区与侧边栏独立，形成真正的两栏布局'
      : '❌ 未触发 BFC：内容区文字环绕侧边栏';
  }
}
</script>
</body>
</html>
```

---

## Q12: Flex 容器的主要属性有哪些？
- **难度**：★☆☆
- **知识点**：Flexbox / 弹性布局 / CSS布局
- **题型**：简答题

### 参考答案要点：

1. **Flex 布局基本概念**

   Flex 布局采用"弹性容器"模式：设置 `display: flex` 的元素成为**容器（Container）**，其直接子元素成为**项目（Item）**。

   ```
   主轴（Main Axis）：flex-direction 决定的排列方向
   ───────────────────────────────→

   交叉轴（Cross Axis）：与主轴垂直的方向
              ↓
              ↓
   ```

2. **容器属性（设在父元素上）**

   ```css
   .container {
     display: flex;

     /* ① flex-direction：主轴方向 */
     flex-direction: row;           /* 主轴水平，从左到右（默认） */
     /* flex-direction: row-reverse; */  /* 水平，从右到左 */
     /* flex-direction: column; */       /* 垂直，从上到下 */
     /* flex-direction: column-reverse; */ /* 垂直，从下到上 */

     /* ② flex-wrap：换行方式 */
     flex-wrap: nowrap;             /* 不换行（默认，可能溢出） */
     /* flex-wrap: wrap; */            /* 换行，第一行在上 */
     /* flex-wrap: wrap-reverse; */     /* 换行，第一行在下 */

     /* ③ flex-flow：direction + wrap 的简写 */
     flex-flow: row wrap;           /* 水平排列 + 允许换行 */

     /* ④ justify-content：主轴对齐方式 */
     justify-content: flex-start;   /* 主轴起点对齐（默认） */
     /* justify-content: flex-end; */    /* 主轴终点对齐 */
     /* justify-content: center; */      /* 主轴居中对齐 */
     /* justify-content: space-between; */ /* 两端对齐，项目间隔相等 */
     /* justify-content: space-around; */ /* 每个项目两侧间隔相等 */
     /* justify-content: space-evenly; */ /* 所有间隔完全相等 */

     /* ⑤ align-items：交叉轴对齐方式（单行） */
     align-items: stretch;          /* 拉伸填满（默认） */
     /* align-items: flex-start; */     /* 交叉轴起点 */
     /* align-items: flex-end; */       /* 交叉轴终点 */
     /* align-items: center; */         /* 交叉轴居中 */
     /* align-items: baseline; */       /* 文本基线对齐 */

     /* ⑥ align-content：多行时的交叉轴对齐（需配合 wrap） */
     align-content: stretch;         /* 默认值 */
     /* align-content: flex-start; */
     /* align-content: center; */
     /* align-content: space-between; */

     /* ⑦ gap：项目间距（现代属性，替代 margin 方案） */
     gap: 16px;                     /* 行列统一间距 */
     row-gap: 12px;                 /* 行间距 */
     column-gap: 20px;              /* 列间距 */
   }
   ```

3. **项目属性（设在子元素上）**

   ```css
   .item {
     /* ① order：排列顺序（越小越靠前，默认 0） */
     order: -1;                     /* 排在最前面 */
     /* order: 1; */                 /* 排到最后面 */

     /* ② flex-grow：放大比例（剩余空间的分配份数） */
     flex-grow: 0;                  /* 不放大（默认） */
     /* flex-grow: 1; */             /* 平分剩余空间 */
     /* flex-grow: 2; */             /* 分得 2 份（别人 1 份的话，我得 2/3） */

     /* ③ flex-shrink：缩小比例（空间不足时的收缩份数） */
     flex-shrink: 1;                /* 等比缩小（默认） */
     /* flex-shrink: 0; */           /* 不缩小（允许溢出） */

     /* ④ flex-basis：主轴上的初始大小（优先于 width/height） */
     flex-basis: auto;              /* 自动（默认，参考 width/height） */
     /* flex-basis: 200px; */        /* 固定初始宽度 200px */
     /* flex-basis: content; */      /* 根据内容决定 */

     /* ⑤ flex：grow + shrink + basis 的简写 */
     flex: 0 1 auto;                /* 默认值（等同于 flex: initial） */
     /* flex: 1; */                  /* flex: 1 1 0%（常用：等分布局） */
     /* flex: auto; */               /* flex: 1 1 auto */

     /* ⑥ align-self：单个项目的交叉轴对齐（覆盖 align-items） */
     align-self: center;            /* 这个项目单独居中 */
     /* align-self: flex-start; */
   }
   ```

4. **常用 Flex 布局模式速查**

   ```css
   /* 模式1：水平居中（最常见的面试题答案之一） */
   .center-horizontal {
     display: flex;
     justify-content: center;  /* 主轴居中 */
   }

   /* 模式2：垂直居中 */
   .center-vertical {
     display: flex;
     align-items: center;  /* 交叉轴居中 */
   }

   /* 模式3：水平垂直完全居中（万能居中方案） */
   .center-all {
     display: flex;
     justify-content: center;  /* 主轴居中 */
     align-items: center;      /* 交叉轴居中 */
   }

   /* 模式4：等分布局（导航栏、卡片列表） */
   .equal-split > * {
     flex: 1;  /* 每个项目平分剩余空间 */
   }

   /* 模式5：左固定 + 右自适应（经典两栏布局） */
   .layout-sidebar {
     display: flex;
   }
   .sidebar { width: 200px; flex-shrink: 0; }  /* 固定宽度，不收缩 */
   .main-content { flex: 1; }                   /* 占满剩余空间 */

   /* 模式6：底部固定（footer 始终在底部） */
   .page-wrapper {
     display: flex;
     flex-direction: column;
     min-height: 100vh;
   }
   .main-area { flex: 1; }  /* 主内容区撑开 */
   footer { /* 固定在底部 */ }
   ```

### 🔍 追问链
1. **flex: 1 到底等于什么？flex: auto 和 flex: 1 有什么区别？**
   → 方向：`flex: 1` = `flex: 1 1 0%`（basis 为 0，完全按比例分配）；`flex: auto` = `flex: 1 1 auto`（basis 为 auto，先按内容大小分配再按比例分配剩余空间）
2. **align-items: stretch 为什么有时候没有拉伸效果？**
   → 方向：项目显式设置了高度/宽度（或 flex-basis）时，stretch 不会覆盖显式尺寸；只有当 cross axis 尺寸为 auto 时才生效
3. **gap 属性和 margin 的区别？gap 有什么优势？**
   → 方向：gap 只作用于 flex/grid 项目之间，不影响容器边缘；不会被 margin 折叠影响；语义更清晰；不支持 IE

---

## Q13: Grid 和 Flex 分别适合什么场景？
- **难度**：★☆☆
- **知识点**：Grid布局 / Flexbox / 布局选择
- **题型**：简答题

### 参考答案要点：

1. **核心设计理念的区别**

   ```
   Flexbox（一维布局）：
   处理的是"一行"或"一列"中元素的分部和对齐
   → 适合：组件内部的线性排列

   Grid（二维布局）：
   同时控制行和列，在二维空间中精确放置元素
   → 适合：整个页面的骨架/框架布局
   ```

2. **场景选择决策树**

   ```
   需要布局？

   ├── 是一维（一行 or 一列）？
   │   ├── 内容驱动（不知道有多少项）→ Flexbox
   │   │   例：导航栏、按钮组、卡片列表、标签云
   │   └── 内容固定（知道有几项）→ 都可以，Flex 更简单
   │
   └── 是二维（行 + 列）？
       ├── 整体页面框架 → Grid（首选）
       │   例：仪表盘、后台管理系统、相册墙
       ├── 需要行列精确控制 → Grid
       │   例：日历、棋盘、商品网格
       └── 只是简单的行列排列 → 也可以用 Flex 嵌套
   ```

3. **典型场景对比**

   | 场景 | 推荐方案 | 原因 |
   |------|----------|------|
   | **导航栏（Nav）** | Flex | 一维水平排列，space-between 对齐方便 |
   | **卡片列表（Card List）** | Flex | 项目数量不固定，自动换行（flex-wrap） |
   | **圣杯/双飞翼布局** | Grid | 二维精确控制，模板区域语法简洁 |
   | **仪表盘（Dashboard）** | Grid | 多行多列不规则区域划分 |
   | **表单布局** | Grid | 标签和输入框的行列对齐 |
   | **居中一个元素** | Flex | 两行代码搞定（justify + align） |
   | **网页整体框架** | Grid | header/main/sidebar/footer 区域划分 |
   | **轮播图/幻灯片** | Flex | 单行滑动，transition 配合 transform |
   | **日历组件** | Grid | 7列 × N行的严格二维结构 |
   | **瀑布流布局** | CSS Columns / JS | Flex 和 Grid 都不太擅长（需要 masonry） |

4. **可以结合使用的场景**

   ```css
   /* Grid 做整体框架，Flex 做组件内部布局 */
   .page-layout {
     display: grid;
     grid-template-columns: 240px 1fr;  /* 侧栏 + 主内容 */
     grid-template-rows: auto 1fr auto;  /* header + main + footer */
     grid-template-areas:
       "header  header"
       "sidebar main"
       "footer  footer";
   }

   /* Header 内部用 Flex 做导航 */
   .site-header {
     display: flex;
     justify-content: space-between;
     align-items: center;
   }

   /* Card 组件内部用 Flex */
   .card-body {
     display: flex;
     flex-direction: column;
     gap: 12px;
   }
   ```

### 🔍 追问链
1. **Grid 的 fr 单位和 Flex 的 flex-grow 有什么异同？**
   → 方向：都是分配剩余空间的概念；fr 基于 Grid 轨道（track），flex-grow 基于 Flex 项目；fr 可以做 `1fr 2fr 1fr` 这种精确比例，flex-grow 是按份数
2. **Grid 的 `grid-template-areas` 有什么优势和局限？**
   → 方向：优势：可视化命名区域，代码可读性极高；局限：必须是矩形区域（不能跨非连续格子）、每个格子只能属于一个区域
3. **masonry 布局（瀑布流）为什么 Flex 和 Grid 都难以实现？**
   → 方向：瀑布流的每一列高度不同且需要从上到下依次填充，这是"按列填充"的逻辑；Flex/Grid 都是"按行填充"；CSS Grid Level 3 正在加入 masonry 布局

---

## Q14: 常用的水平垂直居中方案有哪些？
- **难度**：★☆☆
- **知识点**：居中布局 / Flex / Grid / 定位
- **题型**：简答题

### 参考答案要点：

1. **方案总览（按推荐程度排序）**

   ```css
   /* ========== 方案1：Flexbox 居中（最推荐）========== */
   .flex-center {
     display: flex;
     justify-content: center;  /* 水平居中 */
     align-items: center;      /* 垂直居中 */
     /* 优点：代码简洁、语义清晰、兼容性好（IE10+） */
   }

   /* ========== 方案2：Grid 居中（同样简洁）========== */
   .grid-center {
     display: grid;
     place-items: center;  /* align-items + justify-items 的简写 */
     /* 或者 */
     place-content: center;  /* align-content + justify-content 的简写 */
   }

   /* ========== 方案3：绝对定位 + transform（经典方案）========== */
   .absolute-center-parent {
     position: relative;  /* 父元素设为相对定位 */
   }
   .absolute-center-child {
     position: absolute;
     top: 50%;           /* 距顶部 50% */
     left: 50%;          /* 距左边 50% */
     transform: translate(-50%, -50%);  /* 往回偏移自身的一半 */
     /* 优点：不需要知道子元素尺寸
      * 优点：transform 使用 GPU 加速
      * 缺点：需要考虑浏览器前缀（老旧浏览器） */
   }

   /* ========== 方案4：绝对定位 + margin auto（需知尺寸）========== */
   .margin-auto-center {
     position: absolute;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0;
     margin: auto;  /* 四方向 auto + 已知尺寸 = 居中 */
     width: 200px;
     height: 150px;
     /* 优点：兼容性极好（包括 IE）
      * 缺点：必须知道子元素的具体宽高 */
   }
   ```

2. **更多方案（特殊场景）**

   ```css
   /* ========== 方案5：text-align + vertical-align（行内元素）========== */
   .inline-center-parent {
     text-align: center;  /* 水平居中（针对行内元素） */
     line-height: 300px;  /* 垂直居中（line-height = 父元素高度） */
   }
   .inline-center-child {
     display: inline-block;
     vertical-align: middle;  /* 需要配合父元素的伪元素技巧 */
   }
   /* 适用场景：文字、图标、小按钮的居中 */

   /* ========== 方案6：table-cell 模拟========== */
   .table-cell-center {
     display: table-cell;
     text-align: center;
     vertical-align: middle;
   }

   /* ========== 方案7：writing-mode 技巧（较冷门）========== */
   .writing-mode-center {
     writing-mode: vertical-lr;
     text-align: center;
     /* 利用书写模式的转换来实现居中，较少使用 */
   }
   ```

3. **方案对比与选择指南**

   | 方案 | 代码量 | 需知尺寸 | 兼容性 | 推荐度 |
   |------|--------|----------|--------|--------|
   **Flex** | 2行 | ❌ 不需要 | IE10+ | ⭐⭐⭐⭐⭐ |
   **Grid** | 1-2行 | ❌ 不需要 | IE11（部分） | ⭐⭐⭐⭐⭐ |
   **absolute + transform** | 3行 | ❌ 不需要 | IE9+（需前缀） | ⭐⭐⭐⭐ |
   **absolute + margin:auto** | 4行 | ✅ 需要 | 全兼容 | ⭐⭐⭐ |
   **text-align + line-height** | 2行 | ❌ 不需要 | 全兼容 | ⭐⭐（仅行内元素） |

### 🔍 追问链
1. **Flex 居中方案在 IE10 以下怎么兼容？**
   → 方向：使用 `absolute + margin: auto` 方案（兼容 IE6+）；或者引入 Autoprefixer 自动添加 `-ms-` 前缀
2. **transform: translate(-50%, -50%) 为什么能让元素居中？原理是什么？**
   → 方向：top/left: 50% 是相对于父容器的；transform 的百分比是相对于元素自身的；所以往回偏移 50% 自身宽高正好抵消
3. **如果子元素比父容器还大，以上居中方案还能正常工作吗？**
   → 方向：Flex/Grid 依然可以（配合 overflow 处理溢出）；absolute + transform 也能工作但可能超出边界；margin:auto 需要调整

### 深度拓展：手写实现

#### 完整可运行 Demo：6 种居中方案对比展示

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>6种水平垂直居中方案完整 Demo</title>
<style>
  /* ====== 全局公共样式 ====== */
  body { font-family: system-ui; padding: 20px; max-width: 1100px; margin: 0 auto; }
  h1 { text-align: center; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

  .card {
    border: 2px solid #ddd; border-radius: 8px; overflow: hidden;
    display: flex; flex-direction: column;
  }
  .card-header {
    padding: 8px; font-size: 13px; font-weight: bold;
    color: white; text-align: center;
  }
  .card-body {
    height: 180px; border: 2px dashed #bbb;
    position: relative;  /* 为 absolute 方案提供定位上下文 */
    display: flex;        /* 默认 Flex，各方案会覆盖 */
    align-items: center;
    justify-content: center;
  }
  .center-box {
    width: 80px; height: 50px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
  }
  .card-footer {
    padding: 8px; font-size: 11px; background: #f5f5f5;
    text-align: center; color: #666;
  }

  /* ====== 各方案的独立样式 ====== */

  /* 方案1：Flexbox（最推荐）*/
  .demo-flex .card-body {
    display: flex;              /* 弹性布局 */
    justify-content: center;     /* 主轴居中（水平） */
    align-items: center;         /* 交叉轴居中（垂直） */
  }

  /* 方案2：Grid（最简洁）*/
  .demo-grid .card-body {
    display: grid;               /* 网格布局 */
    place-items: center;         /* 同时设置行和列的 items 居中 */
  }

  /* 方案3：absolute + transform（经典）*/
  .demo-abs-transform .card-body { display: block; }  /* 取消默认 flex */
  .demo-abs-transform .center-box {
    position: absolute;          /* 绝对定位 */
    top: 50%;                    /* 距顶部 50% */
    left: 50%;                   /* 距左侧 50% */
    transform: translate(-50%, -50%);  /* 往回偏移自身宽高的一半 */
  }

  /* 方案4：absolute + margin:auto（需知尺寸）*/
  .demo-abs-margin .card-body { display: block; }  /* 取消默认 flex */
  .demo-abs-margin .center-box {
    position: absolute;          /* 绝对定位 */
    top: 0; right: 0;            /* 四方向归零 */
    bottom: 0; left: 0;
    margin: auto;                /* 自动分配剩余空间 = 居中 */
    width: 80px;                 /* 必须指定宽高！ */
    height: 50px;
  }

  /* 方案5：text-align + vertical-align（行内元素）*/
  .demo-inline .card-body {
    display: block;              /* 取消默认 flex */
    text-align: center;          /* 水平居中（对行内元素生效） */
    font-size: 0;                /* 消除空白字符影响 */
    line-height: 180px;          /* 行高 = 容器高度（垂直居中技巧） */
  }
  .demo-inline .center-box {
    display: inline-block;       /* 转为行内块元素 */
    vertical-align: middle;      /* 垂直对齐中间 */
    line-height: normal;         /* 重置内部行高 */
    font-size: 12px;             /* 恢复字体大小 */
  }

  /* 方案6：table-cell 模拟表格单元格*/
  .demo-table .card-body {
    display: table-cell;         /* 模拟表格单元格 */
    text-align: center;          /* 水平居中 */
    vertical-align: middle;      /* 垂直居中 */
  }
  .demo-table .center-box {
    display: inline-block;       /* 作为行内元素被居中 */
  }

  /* 卡片标题颜色 */
  .h1 { background: #27ae60; }   /* 绿色：Flex 推荐 */
  .h2 { background: #3498db; }   /* 蓝色：Grid 简洁 */
  .h3 { background: #9b59b6; }   /* 紫色：经典方案 */
  .h4 { background: #e67e22; }   /* 橙色：兼容性好 */
  .h5 { background: #e74c3c; }   /* 红色：行内元素专用 */
  .h6 { background: #1abc9c; }   /* 青色：table-cell */
</style>
</head>
<body>
<h1>🎯 6 种水平垂直居中方案完整对比</h1>

<div class="grid">
  <!-- 方案1 -->
  <div class="card demo-flex">
    <div class="card-header h1">① Flexbox（⭐推荐）</div>
    <div class="card-body"><div class="center-box">Flex</div></div>
    <div class="card-footer">2行代码 | 不需要知道尺寸 | IE10+</div>
  </div>

  <!-- 方案2 -->
  <div class="card demo-grid">
    <div class="card-header h2">② Grid place-items</div>
    <div class="card-body"><div class="center-box">Grid</div></div>
    <div class="card-footer">1-2行代码 | 最简洁 | IE11(部分)</div>
  </div>

  <!-- 方案3 -->
  <div class="card demo-abs-transform">
    <div class="card-header h3">③ Absolute + Transform</div>
    <div class="card-body"><div class="center-box">Abs+Trans</div></div>
    <div class="card-footer">3行代码 | GPU加速 | IE9+(前缀)</div>
  </div>

  <!-- 方案4 -->
  <div class="card demo-abs-margin">
    <div class="card-header h4">④ Absolute + Margin Auto</div>
    <div class="card-body"><div class="center-box">Abs+Auto</div></div>
    <div class="card-footer">4行代码 | 需要知道尺寸 | 全兼容</div>
  </div>

  <!-- 方案5 -->
  <div class="card demo-inline">
    <div class="card-header h5">⑤ Text-Align + Line-Height</div>
    <div class="card-body"><div class="center-box">Inline</div></div>
    <div class="card-footer">2行代码 | 仅适用行内/行内块 | 全兼容</div>
  </div>

  <!-- 方案6 -->
  <div class="card demo-table">
    <div class="card-header h6">⑥ Table-Cell</div>
    <div class="card-body"><div class="center-box">TableCell</div></div>
    <div class="card-footer">3行代码 | 模拟表格行为 | 全兼容</div>
  </div>
</div>
</body>
</html>
```

---

## Q15: 媒体查询（Media Query）的常用写法？
- **难度**：★☆☆
- **知识点**：媒体查询 / 响应式设计 / 断点
- **题型**：简答题

### 参考答案要点：

1. **基本语法结构**

   ```css
   /* 基本结构：@media 媒体类型 and (媒体特征) { ... } */
   @media screen and (min-width: 768px) {
     /* 当屏幕宽度 ≥ 768px 时应用的样式 */
     .container {
       max-width: 750px;
       margin: 0 auto;
     }
   }
   ```

2. **常用媒体特征（Media Features）**

   ```css
   /* ===== 视口尺寸（最常用）===== */
   @media (min-width: 768px) { }     /* 最小宽度 768px（平板横屏及以上） */
   @media (max-width: 767px) { }     /* 最大宽度 767px（手机竖屏及以下） */
   @media (min-width: 768px) and (max-width: 1024px) { }  /* 区间范围 */

   /* ===== 视口方向 ===== */
   @media (orientation: landscape) { }  /* 横屏 */
   @media (orientation: portrait) { }   /* 竖屏 */

   /* ===== 屏幕分辨率 / 像素密度（高清屏适配）===== */
   @media (-webkit-min-device-pixel-ratio: 2) { }  /* Retina 屏幕 */
   @media (resolution: 2dppx) { }                    /* 标准写法 */
   @media (min-resolution: 144dpi) { }               /* 最小分辨率 */

   /* ===== 颜色相关 ===== */
   @media (color) { }                    /* 彩色屏幕 */
   @media (monochrome) { }              /* 黑白/灰度屏幕 */
   @media (prefers-color-scheme: dark) { }  /* 用户偏好暗色模式 */
   @media (prefers-color-scheme: light) { }  /* 用户偏好亮色模式 */

   /* ===== 用户偏好（现代化查询）===== */
   @media (prefers-reduced-motion: reduce) { }  /* 减少动画（无障碍需求） */
   @media (hover: hover) { }                      /* 设备支持悬停（非触摸屏） */
   @media (hover: none) { }                       /* 触摸设备（无悬停） */
   @media (pointer: coarse) { }                   /* 粗精度指针（触摸） */
   @media (pointer: fine) { }                     /* 精细指针（鼠标） */

   /* ===== 打印样式 ===== */
   @media print {
     body { font-size: 12pt; }
     nav, footer, .no-print { display: none; }  /* 隐藏不必要的元素 */
     a[href]::after { content: ' (' attr(href) ')'; }  /* 打印链接地址 */
   }
   ```

3. **常见的断点（Breakpoints）设计**

   ```css
   /* 移动端优先（Mobile First）策略：从小到大 */
   /* 默认样式：手机（< 576px） */

   /* 小屏手机 → 大屏手机 */
   @media (min-width: 576px) { /* sm */ }

   /* 平板竖屏 */
   @media (min-width: 768px) { /* md */ }

   /* 平板横屏 / 小笔记本 */
   @media (min-width: 992px) { /* lg */ }

   /* 桌面显示器 */
   @media (min-width: 1200px) { /* xl */ }

   /* 大屏显示器 */
   @media (min-width: 1400px) { /* xxl */ }
   /* 桌面端优先（Desktop First）策略：从大到小 */
   /* 默认样式：桌面端（≥ 1200px） */

   @media (max-width: 1199px) { }  /* 中等桌面 */
   @media (max-width: 991px) { }   /* 平板 */
   @media (max-width: 767px) { }   /* 手机 */
   ```

4. **媒体查询的逻辑运算符**

   ```css
   /* and：同时满足所有条件 */
   @media screen and (min-width: 768px) and (max-width: 1024px) { }

   /* ,（逗号）：满足任一条件即可（相当于 OR） */
   @media (max-width: 600px), (orientation: portrait) { }

   /* only：防止旧浏览器误解析 */
   @media only screen and (min-width: 768px) { }
   /* old browser without media query support will ignore this */

   /* not：否定查询 */
   @media not print { }  /* 非打印设备 */
   @media not all and (monochrome) { }  /* 非黑白屏 */
   ```

5. **响应式实战案例**

   ```css
   /* 响应式导航栏：移动端汉堡菜单 → 桌面端横向导航 */
   .navbar {
     display: flex;
     justify-content: space-between;
     padding: 1rem;
   }

   .nav-links {
     display: none;  /* 移动端默认隐藏 */
   }

   /* 平板及以上显示横向导航 */
   @media (min-width: 768px) {
     .nav-links {
       display: flex;  /* 显示导航链接 */
       gap: 2rem;
     }
     .menu-toggle { display: none; }  /* 隐藏汉堡按钮 */
   }

   /* 响应式网格：根据屏幕宽度自动调整列数 */
   .card-grid {
     display: grid;
     grid-template-columns: repeat(1, 1fr);  /* 手机：单列 */
     gap: 1rem;
   }

   @media (min-width: 640px) {
     .card-grid { grid-template-columns: repeat(2, 1fr); }  /* 平板：2列 */
   }

   @media (min-width: 1024px) {
     .card-grid { grid-template-columns: repeat(3, 1fr); }  /* 桌面：3列 */
   }

   @media (min-width: 1280px) {
     .card-grid { grid-template-columns: repeat(4, 1fr); }  /* 大屏：4列 */
   }
   ```

### 🔍 追问链
1. **Mobile First 和 Desktop First 各有什么优缺点？团队应该如何选择？**
   → 方向：Mobile First 代码量更少（渐进增强）、更适合当前流量趋势；Desktop First 适合已有桌面端项目改造（优雅降维）；大多数新项目推荐 Mobile First
2. **如何避免媒体查询中的样式重复和冗余？**
   → 方向：使用 CSS 自定义变量统一管理断点值；使用预处理器的 mixin 封装媒体查询；考虑使用 Container Queries 减少对视口的依赖
3. **@media 和 @supports 的区别？什么时候用 @supports？**
   → 方向：@media 查询设备/视口特性；@supports 查询浏览器 CSS 特性支持情况；用于渐进增强（如 `@supports (display: grid)`）

---

## 第二部分：进阶层（★★☆）

> **考察目标**：CSS 深层原理、浏览器渲染机制、性能优化、工程化实践
> **适用岗位**：中级前端开发、高级前端工程师

---

## Q16: 请详细解释 CSS 的层叠上下文（Stacking Context），哪些属性会创建它？
- **难度**：★★☆
- **知识点**：层叠上下文 / z-index / 渲染层级
- **题型**：简答题

### 参考答案要点：

1. **什么是层叠上下文**

   层叠上下文是 HTML 元素的一个三维概念，表示元素在 **z 轴方向**上的一层"虚拟空间"。拥有层叠上下文的元素就像创建了一个独立的层级世界，其内部子元素的 z-index 只在这个世界内比较，不会与外部元素交叉。

   ```
   三维坐标系理解：
                    z 轴（指向用户/屏幕外）
                   /
                  /
   y 轴（向下）  -------- x 轴（向右）

   层叠上下文就是一个在 z 轴上有明确层级的"渲染层"
   ```

2. **创建层叠上下文的属性清单**

   ```css
   /* ===== 根元素 ===== */
   html { /* 天然拥有根层叠上下文 */ }

   /* ===== z-index + 定位（最常见的方式）===== */
   .sc-zindex {
     position: relative/absolute/fixed/sticky;
     z-index: auto 以外的任意值;  /* z-index: 0 也会创建 */
   }

   /* ===== CSS3 新增的创建方式（不需要 z-index）===== */

   /* 1. opacity < 1 */
   .sc-opacity { opacity: 0.99; }  /* 只要小于 1 就创建 */

   /* 2. transform 不为 none */
   .sc-transform { transform: translateX(0); }  /* 包括 scale/rotate 等 */

   /* 3. filter 不为 none */
   .sc-filter { filter: blur(0px); }  /* 即使是无效果的 filter 也创建 */

   /* 4. will-change 指定了可创建上下文的属性 */
   .sc-will-change { will-change: transform; }

   /* 5. contain: layout / paint / strict / content */
   .sc-contain { contain: paint; }

   /* 6. mix-blend-mode 不为 normal */
   .sc-blend { mix-blend-mode: multiply; }

   /* 7. isolation: isolate */
   .sc-isolation { isolation: isolate; }  /* 专门用来创建层叠上下文 */

   /* 8. -webkit-overflow-scrolling: touch */
   .sc-scroll { -webkit-overflow-scrolling: touch; }

   /* 9. backdrop-filter 不为 none */
   .sc-backdrop { backdrop-filter: blur(10px); }
   ```

3. **层叠等级（Stacking Level）规则**

   在同一个层叠上下文中，元素按以下顺序从底到顶堆叠（**背靠背规则**）：

   ```
   ┌──────────────────────────────────────┐
   │  7. 层叠上下文（z-index: 正数/auto）   │  ← 最上层
   │  6. z-index: 正数的定位元素            │
   │  5. z-index: 0 / auto 的定位元素       │
   │  4. 浮动元素（float）                  │
   │  3. 正常流中的块级元素（Block）        │
   │  2. 正常流中的行内元素（Inline）       │
   │  1. 层叠上下文的负 z-index 子元素      │  ← 最下层（背景之下）
   │  0. 元素的背景和边框                    │  ← 最底层
   └──────────────────────────────────────┘
   ```

4. **典型案例分析**

   ```html
   <style>
     .parent {
       position: relative;
       z-index: 0;  /* 创建层叠上下文！ */
     }
     .child-a {
       position: absolute;
       z-index: 999;  /* 在父级上下文内部比较，无法突破 */
     }
     .sibling {
       position: absolute;
       z-index: 1;  /* 虽然 z-index 很小，但在不同的上下文中 */
     }
   </style>

   <!-- 结构 -->
   <div class="parent">        <!-- 创建了自己的层叠上下文 -->
     <div class="child-a">A</div>  <!-- z-index: 999（仅在 parent 内部有效） -->
   </div>
   <div class="sibling">B</div>  <!-- z-index: 1（在根上下文中） -->

   <!-- 结果：B 会盖在 A 上面！
        因为 A 的 z-index: 999 只在 parent 的上下文内有效，
        而 parent 的层级低于 sibling（parent 没有高于 sibling 的 z-index）
   -->
   ```

5. **调试技巧**

   ```css
   /* 开发时快速识别层叠上下文的方法 */
   /* Chrome DevTools: Layers 面板可以看到合成层和层叠上下文 */

   /* 快速排查 z-index 不生效的问题：
    * 1. 检查父元素是否创建了新的层叠上下文
    * 2. 检查是否有 opacity/transform/filter 等意外创建上下文的属性
    * 3. 使用 DevTools 的 "Stacking Context" 信息
    */
   ```

### 🔍 追问链
1. **z-index: auto 和 z-index: 0 有什么区别？**
   → 方向：`auto` 不创建新的层叠上下文（使用父级的）；`0` 会创建新的层叠上下文（在 positioned 元素上）。这是一个容易踩坑的点
2. **如何在不使用 z-index 的情况下创建层叠上下文？为什么要这样做？**
   → 方向：`isolation: isolate` 是最语义化的方式；`opacity: 0.99` 是常见的 hack；目的是为了隔离内部元素的层级，防止被外部干扰
3. **多个层叠上下文嵌套时，最终的显示顺序是怎么确定的？**
   → 方向：先比较上下文本身的层级（由其在外部上下文中的位置决定），再比较内部元素的层级。类似于"先看哪栋楼，再看楼内的楼层"

---

## Q17: 浮动（float）的工作原理是什么？如何清除浮动？
- **难度**：★★☆
- **知识点**：浮动布局 / 清除浮动 / BFC
- **题型**：简答题

### 参考答案要点：

1. **浮动的工作原理**

   `float` 属性最初的设计目的是**让文字环绕图片**（类似报纸排版），后来被广泛用于布局。

   ```css
   .floated {
     float: left;   /* 向左浮动 */
     /* float: right; */  /* 向右浮动 */
   }
   ```

   **浮动的核心行为**：
   - 脱离**正常文档流**（但不同于 absolute，浮动仍"半"在文档流中）
   - 向左/右移动，直到碰到父元素边界或其他浮动元素
   - 后续的行内元素会**环绕**浮动元素（文字环绕效果）
   - 块级元素的行为仿佛浮动元素不存在（但行内元素的盒子会收缩）

   ```
   正常文档流：
   ┌──────────────────────┐
   │ Block A              │
   │ Block B              │
   │ Block C              │
   └──────────────────────┘

   B 左浮动后：
   ┌──────────────────────┐
   │ ┌────┐               │
   │ │ B  │ Block A 的文字  │  ← 文字环绕 B
   │ └────┘    会环绕过来  │
   │ Block C              │  ← 块级元素无视 B
   └──────────────────────┘
   ```

2. **浮动带来的问题：高度塌陷**

   ```html
   <style>
     .parent {
       background: #f0f0f0;
       /* 父元素没有设置高度 */
       /* 子元素全部浮动后，父元素高度塌陷为 0 */
     }
     .child {
       float: left;
       width: 100px;
       height: 100px;
     }
   </style>
   <div class="parent">
     <div class="child"></div>
     <div class="child"></div>
   </div>
   <!-- 结果：parent 的高度为 0，背景色看不见 -->
   ```

3. **清除浮动的各种方法**

   ```css
   /* ===== 方法1：额外空标签（古老方法，不推荐）===== */
   .clear {
     clear: both;  /* 清除左右两侧的浮动 */
   }
   <!-- HTML 中添加空 div -->
   <div class="parent">
     <div class="child"></div>
     <div class="clear"></div>  <!-- 额外的空标签，污染 HTML -->
   </div>

   /* ===== 方法2：父元素 overflow（推荐）===== */
   .parent {
     overflow: hidden;  /* 或 overflow: auto */
     /* 原理：触发了 BFC，BFC 的高度计算包含浮动元素 */
   }
   /* 缺点：溢出内容会被裁剪（如下拉菜单） */

   /* ===== 方法3：伪元素清除（最推荐的通用方案）===== */
   .clearfix::after {
     content: '';        /* 必须有 content */
     display: table;     /* 或 block */
     clear: both;        /* 核心清除语句 */
     /* 可选： */
     /* visibility: hidden; */
     /* height: 0; */
   }
   /* IE6/7 兼容（已过时，仅供参考） */
   .clearfix { zoom: 1; }

   /* ===== 方法4：伪元素优化版（Bootstrap/Nicolas Gallagher 方案）===== */
   .clearfix::before,
   .clearfix::after {
     content: ' ';       /* 空格字符 */
     display: table;     /* 防止 margin-collapse */
   }
   .clearfix::after {
     clear: both;
   }

   /* ===== 方法5：display: flow-root（最现代化的方案）===== */
   .parent {
     display: flow-root;  /* CSS3 新属性，专门用于创建 BFC */
     /* 语义清晰，无任何副作用 */
     /* 兼容性：Chrome 58+, Firefox 53+, Safari 11+
    *  IE 不支持（但已无需关心 IE）
    */}
   ```

4. **clear 属性详解**

   ```css
   .element {
     clear: none;    /* 默认值，不清除 */
     clear: left;    /* 清除左浮动（元素下移到左浮动元素下方） */
     clear: right;   /* 清除右浮动 */
     clear: both;    /* 清除左右两侧浮动 */
   }
   /* clear 的本质：增加元素的上外边距（margin-top），
    * 使其上边缘位于所有前方浮动元素的下边缘之下 */
   ```

### 🔍 追问链
1. **浮动布局在现代项目中还有使用场景吗？还是已经被 Flex/Grid 完全取代？**
   → 方向：文字环绕仍是唯一选择（float 独有能力）；极少数需要兼容古董浏览器的场景；新项目布局全面转向 Flex/Grid
2. **overflow: hidden 为什么能清除浮动？背后的 BFC 机制是什么？**
   → 方向：overflow 非 visible 触发 BFC；BFC 规则之"浮动元素参与高度计算"；所以父元素有了正确高度
3. **clearfix 的 `display: table` 和 `display: block` 有什么区别？为什么前者更好？**
   → 方向：`display: table` 可以阻止伪元素本身的 margin 折叠，并且对 IE 的兼容性更好；`display: block` 在大多数情况下也够用

### 深度拓展：手写实现

#### 完整可运行 Demo：4 种清除浮动方法对比

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>4种清除浮动方法对比 Demo</title>
<style>
  body { font-family: system-ui; padding: 20px; max-width: 960px; margin: 0 auto; }
  h1 { text-align: center; }
  .compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .method-card { border: 2px solid #ddd; border-radius: 8px; overflow: hidden; }
  .method-header {
    padding: 10px; font-weight: bold; text-align: center;
    color: white; font-size: 14px;
  }
  .method-body { padding: 15px; min-height: 200px; }

  /* ====== 公共样式：父容器和子元素 ====== */
  .parent {
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);  /* 渐变背景：塌陷时消失 */
    /* 各方法在此处设置不同的清除浮动方式 */
  }
  .child {
    float: left;              /* 子元素左浮动 */
    width: 70px;
    height: 70px;
    background: #667eea;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    border-radius: 6px;
    font-size: 12px;
  }

  /* ----- 方法1：额外空标签 + clear:both（古老方法）----- */
  .m1-parent { }  /* 不做任何处理，展示高度塌陷 */
  .clear-div { clear: both; }  /* 空标签清除浮动 */

  /* ----- 方法2：overflow:hidden 触发 BFC ----- */
  .m2-parent { overflow: hidden; }  /* 最常用的触发 BFC 方式 */

  /* ----- 方法3：伪元素 clearfix（最推荐）----- */
  .m3-parent {}  /* 通过 ::after 伪元素清除 */
  .m3-parent::after {
    content: '';          /* 伪元素必须有 content */
    display: table;       /* table 可以阻止自身 margin 折叠 */
    clear: both;          /* 核心清除语句 */
  }

  /* ----- 方法4：display:flow-root（现代化方案）----- */
  .m4-parent { display: flow-root; }  /* CSS3 专门为创建 BFC 设计 */

  /* 方法标题颜色区分 */
  .h-m1 { background: #e74c3c; }   /* 红色：不推荐 */
  .h-m2 { background: #f39c12; }   /* 橙色：可用但有副作用 */
  .h-m3 { background: #27ae60; }   /* 绿色：推荐 */
  .h-m4 { background: #3498db; }   /* 蓝色：最现代 */

  .verdict { font-size: 12px; color: #555; margin-top: 8px; padding: 6px; background: rgba(0,0,0,0.05); border-radius: 4px; }
</style>
</head>
<body>
<h1>🔄 4 种清除浮动方法可视化对比</h1>
<p style="text-align:center;color:#666;">观察每种方法下父容器的背景是否正常包裹浮动子元素</p>

<div class="compare-grid">
  <!-- 方法1：空标签 -->
  <div class="method-card">
    <div class="method-header h-m1">方法1：空标签 clear:both ❌</div>
    <div class="method-body">
      <div class="parent m1-parent">
        <div class="child">A</div><div class="child">B</div><div class="child">C</div>
        <div class="clear-div"></div>  <!-- 额外空标签 -->
      </div>
      <div class="verdict">✅ 能清除，但污染 HTML 结构，不语义化</div>
    </div>
  </div>

  <!-- 方法2：overflow:hidden -->
  <div class="method-card">
    <div class="method-header h-m2">方法2：overflow:hidden ⚠️</div>
    <div class="method-body">
      <div class="parent m2-parent">
        <div class="child">A</div><div class="child">B</div><div class="child">C</div>
      </div>
      <div class="verdict">✅ 能清除，但溢出内容会被裁剪（如下拉菜单）</div>
    </div>
  </div>

  <!-- 方法3：伪元素 clearfix -->
  <div class="method-card">
    <div class="method-header h-m3">方法3：::after 伪元素 ✅ 推荐</div>
    <div class="method-body">
      <div class="parent m3-parent">
        <div class="child">A</div><div class="child">B</div><div class="child">C</div>
      </div>
      <div class="verdict">✅ 最佳通用方案！无副作用，兼容 IE8+，Bootstrap 采用</div>
    </div>
  </div>

  <!-- 方法4：flow-root -->
  <div class="method-card">
    <div class="method-header h-m4">方法4：display:flow-root 🆕</div>
    <div class="method-body">
      <div class="parent m4-parent">
        <div class="child">A</div><div class="child">B</div><div class="child">C</div>
      </div>
      <div class="verdict">✅ 最现代化的方案，语义清晰，零副作用（IE 不支持）</div>
    </div>
  </div>
</div>

<!-- 额外：未清除浮动的对照组 -->
<div style="margin-top:30px;border:2px dashed #e74c3c;padding:15px;border-radius:8px;">
  <strong style="color:#e74c3c;">📛 对照组：未清除浮动（高度塌陷）</strong>
  <div class="parent" style="margin-top:10px;">
    <div class="child">A</div><div class="child">B</div><div class="child">C</div>
  </div>
  <p style="font-size:13px;color:#e74c3c;">↑ 父元素背景不可见，高度塌陷为 0（或只有 border/padding 高度）</p>
</div>
</body>
</html>
```

#### 清除浮动工具函数（JS 动态应用）

```javascript
/**
 * 为指定元素的子元素清除浮动（动态添加 clearfix）
 * @param {HTMLElement|String} parent - 父元素或选择器
 * @param {'empty-tag'|'overflow'|'clearfix'|'flow-root'} method - 清除方法
 */
function clearFloat(parent, method = 'clearfix') {
  const el = typeof parent === 'string' ? document.querySelector(parent) : parent;

  switch (method) {
    case 'empty-tag':  // 方法1：添加空标签
      const clearer = document.createElement('div');
      clearer.style.clear = 'both';     // 设置 clear 属性
      el.appendChild(clearer);           // 追加到父元素末尾
      break;

    case 'overflow':  // 方法2：触发 BFC
      el.style.overflow = 'hidden';      // 设置 overflow 触发 BFC
      break;

    case 'clearfix':  // 方法3：伪元素方式（推荐）
      el.classList.add('clearfix');       // 添加 clearfix 类名
      // 如果样式表中没有定义 .clearfix，则内联注入
      if (!document.querySelector('#clearfix-style')) {
        const style = document.createElement('style');
        style.id = 'clearfix-style';
        style.textContent =
          '.clearfix::after{content:"";display:table;clear:both;}';  // 核心三行
        document.head.appendChild(style);
      }
      break;

    case 'flow-root':  // 方法4：现代方案
      el.style.display = 'flow-root';    // 使用 flow-root 创建 BFC
      break;
  }

  console.log(`✅ 已使用「${method}」方法清除 ${el.tagName}.${el.className} 的浮动`);
}

// 使用示例：批量处理所有需要清除浮动的容器
document.querySelectorAll('.float-container').forEach(container => {
  clearFloat(container, 'clearfix');  // 统一使用 clearfix 方法
});
```

---

## Q18: 重排（Reflow）和重绘（Repaint）的触发条件有哪些？如何优化？
- **难度**：★★☆
- **知识点**：浏览器渲染 / 性能优化 / Reflow / Repaint
- **题型**：简答题

### 参考答案要点：

1. **渲染流程回顾**

   ```
   HTML/CSS → DOM Tree → CSSOM → Render Tree → Layout(Reflow) → Paint(Repaint) → Composite
                                                                 ↑                    ↑
                                                              计算位置/尺寸          填充像素
   ```

   - **Reflow（回流/重排）**：重新计算元素的几何属性（位置、尺寸），**代价最大**
   - **Repaint（重绘）**：重新绘制元素的视觉效果（颜色、阴影等），**代价较小**
   - **Composite（合成）**：将各图层合成为最终画面，**利用 GPU，代价最小**

2. **触发 Reflow 的操作**

   ```javascript
   // === 直接触发 Reflow 的操作 ===

   // 1. 修改几何属性
   element.style.width = '100px';     // 修改宽度
   element.style.height = '200px';    // 修改高度
   element.style.padding = '10px';    // 修改内边距
   element.style.margin = '20px';     // 修改外边距
   element.style.border = '1px solid';
   element.style.top = '10px';
   element.style.left = '20px';

   // 2. 修改 offset 相关属性（会强制同步 Reflow）
   let w = element.offsetWidth;       // 读取 offsetWidth
   let h = element.offsetHeight;
   let t = element.offsetTop;
   let l = element.offsetLeft;

   // 3. 修改 scroll 相关属性
   let st = element.scrollTop;
   let sl = element.scrollLeft;

   // 4. 修改 client 相关属性
   let cw = element.clientWidth;
   let ch = element.clientHeight;

   // 5. 调用 getComputedStyle()
   let styles = window.getComputedStyle(element);

   // 6. DOM 操作
   parentNode.appendChild(child);     // 添加/删除节点
   parentNode.removeChild(child);
   element.textContent = 'new text';  // 修改文本内容

   // 7. 修改字体
   element.style.fontSize = '18px';
   element.style.fontFamily = 'Arial';

   // 8. 修改 CSS 类名（可能间接触发）
   element.className = 'new-class';

   // 9. 窗口变化
   window.resize 事件;                // 窗口大小改变
   window.scroll 事件;                // 滚动位置改变
   ```

3. **触发 Repaint 的操作**

   ```javascript
   // === 只触发 Repaint（不触发 Reflow）的操作 ===

   // 修改"外观"属性，不影响布局
   element.style.color = 'red';           // 颜色
   element.style.backgroundColor = '#fff'; // 背景色
   element.style.backgroundImage = 'url(...)'; // 背景图
   element.style.borderColor = 'blue';    // 边框颜色
   element.style.outline = 'none';        // 轮廓
   element.style.borderRadius = '5px';    // 圆角（有时也触发 Reflow）
   element.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
   element.style.textDecoration = 'underline';
   element.style.visibility = 'hidden';   // 可见性（不是 display:none）
   element.style.backgroundPosition = '10px 10px';
   element.style.opacity = '0.5';         // 透明度（实际上走 Composite）
   ```

4. **优化策略**

   ```javascript
   // ===== 策略1：批量读写 DOM（避免强制同步布局）=====
   // ❌ Bad：读写交替（每次读取都可能触发 Reflow）
   for (let i = 0; i < 10; i++) {
     element.style.height = i * 10 + 'px';  // 写（异步 Reflow）
     console.log(element.offsetHeight);      // 读（强制同步 Reflow！）
   }

   // ✅ Good：集中写，集中读
   const fragments = [];
   for (let i = 0; i < 10; i++) {
     fragments.push(i * 10 + 'px');  // 先收集所有的值
   }
   element.style.height = fragments.join(' ');  // 最后一次性写入
   console.log(element.offsetHeight);  // 最后只读一次
  // ===== 策略2：使用 DocumentFragment / cloneNode =====
  // ✅ Good：在内存中操作 DOM，最后一次性插入
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 1000; i++) {
     const div = document.createElement('div');
     fragment.appendChild(div);  // 不会触发 Reflow
  }
  container.appendChild(fragment);  // 只触发一次 Reflow
  // ===== 策略3：使用 requestAnimationFrame 批量更新 =====
  let pendingStyles = {};
  function batchUpdate(key, value) {
     pendingStyles[key] = value;
     requestAnimationFrame(() => {
       Object.assign(element.style, pendingStyles);  // 下一帧统一应用
       pendingStyles = {};
     });
  }
  // ===== 策略4：使用 CSS transform 代替 top/left =====
  // ❌ Bad：修改 top/left 触发 Reflow
  element.style.left = x + 'px';
  element.style.top = y + 'px';

  // ✅ Good：transform 由 GPU 合成层处理，不触发 Reflow
  element.style.transform = `translate(${x}px, ${y}px)`;
  // ===== 策略5：使用 will-change / GPU 加速 =====
  .animated-element {
     will-change: transform;  /* 提示浏览器提前优化 */
     /* 或 */
     transform: translateZ(0);  /* 强制创建合成层（hack 方式） */
  }
   ```

5. **性能优化检查清单**

   ```
   Reflow/Repaint 优化 Checklist：

   □ 避免 DOM 的频繁增删改
   □ 批量修改样式（用 className 替代逐行 style 赋值）
   □ 避免在循环中读取布局属性（offsetWidth/clientHeight 等）
   □ 使用 DocumentFragment 进行批量 DOM 操作
   □ 对于动画，优先使用 transform + opacity（仅触发 Composite）
   □ 使用 requestAnimationFrame 调度动画
   □ 对复杂动画元素启用 will-change 或 translateZ(0)
   □ 避免使用 CSS 表达式（expression）（IE 特有，已废弃）
   □ 使用虚拟滚动（virtual scrolling）处理长列表
   □ 考虑使用 content-visibility: auto 跳过离屏渲染
   ```

### 🔍 追问链
1. **什么是"强制同步布局（Forced Synchronous Layout）"？为什么它是性能杀手？**
   → 方向：JavaScript 读取布局属性时，浏览器必须立刻执行之前积攒的所有 pending 的 Reflow 操作才能返回准确值；这种"读写交替"会导致 Reflow 被频繁触发
2. **transform 和 top/left 的动画性能差距有多大？如何量化？**
   → 方向：transform 走合成线程（Compositor Thread），不占用主线程；top/left 需要在主线程做 Layout + Paint；在 60fps 要求下，transform 动画可以轻松维持，top/left 可能掉帧
3. **Chrome DevTools 中如何分析 Reflow 和 Repaint？**
   → 方向：Performance 面板录制 → 查看 Main 线程的紫色（Layout）和绿色（Paint）事件；Rendering 面板的 "Paint flashing" 和 "Layer borders"

### 深度拓展：手写实现

#### 工具函数1：CSS 属性触发渲染阶段检测器

```javascript
/**
 * 检测修改某个 CSS 属性会触发哪个渲染阶段
 * @param {String} propName - CSS 属性名（camelCase 或 kebab-case）
 * @returns {Object} { stage: 'layout'|'paint'|'composite'|'none', cost: Number, reason: String }
 */
function detectRenderStage(propName) {
  // 统一转为 kebab-case 格式处理
  const prop = propName.replace(/([A-Z])/g, '-$1').toLowerCase();

  // ===== 触发 Layout（Reflow）的属性（代价最高 ⭐⭐⭐⭐⭐）=====
  const layoutProps = [
    'width', 'height', 'top', 'left', 'right', 'bottom',
    'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'border-width', 'border-top-width', 'border-right-width',
    'border-bottom-width', 'border-left-width',
    'min-height', 'max-height', 'min-width', 'max-width',
    'font-size', 'font-family', 'font-weight',
    'text-indent', 'line-height',
    'display', 'position', 'float', 'clear'
  ];

  // ===== 触发 Paint（Repaint）的属性（代价中等 ⭐⭐⭐）=====
  const paintProps = [
    'color', 'background-color', 'background-image',
    'background-position', 'background-size',
    'border-color', 'border-style', 'outline',
    'box-shadow', 'text-decoration', 'visibility',
    'background-repeat', 'border-radius'  /* 有时也触发 layout */
  ];

  // ===== 仅触发 Composite 的属性（代价最低 ⭐）=====
  const compositeProps = [
    'transform', 'opacity', 'filter',
    'will-change', 'perspective', 'perspective-origin',
    'backface-visibility', 'translate', 'scale', 'rotate'
  ];

  if (layoutProps.includes(prop)) {
    return {
      stage: 'layout (Reflow)',      // 触发重排
      cost: 5,                        // 性能代价最高
      reason: '该属性改变会影响元素几何尺寸，需要重新计算布局树'
    };
  }
  if (paintProps.some(p => prop.includes(p) || p.includes(prop))) {
    return {
      stage: 'paint (Repaint)',       // 触发重绘
      cost: 3,                        // 性能代价中等
      reason: '该属性仅影响视觉效果，不改变布局，无需重新计算位置'
    };
  }
  if (compositeProps.some(p => prop.includes(p) || p.includes(prop))) {
    return {
      stage: 'composite',             // 仅触发合成
      cost: 1,                        // 性能代价最低（GPU 加速）
      reason: '该属性由合成线程处理，不占用主线程，推荐用于动画'
    };
  }

  return { stage: 'none/unknown', cost: 0, reason: '未在已知列表中找到该属性' };
}

// 使用示例
console.log(detectRenderStage('width'));     // → { stage: 'layout', cost: 5, ... }
console.log(detectRenderStage('color'));     // → { stage: 'paint', cost: 3, ... }
console.log(detectRenderStage('transform')); // → { stage: 'composite', cost: 1, ... }
```

#### 工具函数2：性能监控 — Reflow/Repaint 计数器

```javascript
/**
 * 渲染性能监控器：统计页面操作触发的重排和重绘次数
 * 使用 PerformanceObserver API 监听性能事件
 */
class RenderPerformanceMonitor {
  constructor() {
    this.reflowCount = 0;        // 重排计数
    this.repaintCount = 0;       // 重绘计数
    this.forcedLayoutCount = 0;   // 强制同步布局计数
    this.startTime = performance.now();  // 开始时间戳
    this.entries = [];            // 详细记录数组
    this.active = false;          // 是否正在监听
  }

  // 启动监控
  start() {
    if (this.active) return;       // 避免重复启动
    this.active = true;

    try {
      // 监听 Layout（Reflow）事件
      const layoutObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          this.reflowCount++;                    // 累加重排次数
          this.entries.push({                    // 记录详细信息
            type: 'reflow',
            name: entry.name,
            duration: entry.duration,             // 耗时（毫秒）
            startTime: entry.startTime,
            timestamp: Date.now()
          });
        });
      });
      layoutObserver.observe({ entryTypes: ['layout'] });  // 注册 layout 类型观察

      // 监听 Paint（Repaint）事件
      const paintObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          this.repaintCount++;                    // 累加重绘次数
          this.entries.push({
            type: 'repaint',
            name: entry.name,
            duration: entry.duration,
            startTime: entry.startTime,
            timestamp: Date.now()
          });
        });
      });
      paintObserver.observe({ entryTypes: ['paint'] });  // 注册 paint 类型观察

      console.log('🔍 渲染性能监控已启动');
    } catch (e) {
      console.warn('当前浏览器不支持 PerformanceObserver API:', e.message);
    }
  }

  // 停止监控并输出报告
  stopAndReport() {
    this.active = false;
    const duration = ((performance.now() - this.startTime) / 1000).toFixed(2);

    console.group('📊 渲染性能报告');
    console.log(`⏱️  监控时长: ${duration}s`);
    console.log(`🔄 总重排(Reflow)次数: ${this.reflowCount}`);
    console.log(`🎨 总重绘(Repaint)次数: ${this.repaintCount}`);
    console.log(`📈 平均每秒重排: ${(this.reflowCount / duration).toFixed(1)} 次`);
    console.log(`📈 平均每秒重绘: ${(this.repaintCount / duration).toFixed(1)} 次`);

    if (this.reflowCount > 60) {  // 超过每秒1次则给出警告
      console.warn(`⚠️ 重排频率过高！建议检查是否在循环中读取布局属性`);
    }

    // 输出最耗时的 Top 5 操作
    const sorted = [...this.entries].sort((a, b) => b.duration - a.duration);
    console.table(sorted.slice(0, 5));  // 表格形式展示 Top 5
    console.groupEnd();

    return {
      reflowCount: this.reflowCount,
      repaintCount: this.repaintCount,
      duration: parseFloat(duration),
      topCostEntries: sorted.slice(0, 5)
    };
  }
}

// 使用示例
const monitor = new RenderPerformanceMonitor();
monitor.start();           // 开始监控

// ... 执行一些 DOM 操作 ...

monitor.stopAndReport();   // 停止并输出报告
```

#### 完整可运行 Demo：强制同步布局检测器

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>Reflow/Repaint 检测 Demo</title>
<style>
  body { font-family: system-ui; padding: 20px; max-width: 800px; margin: 0 auto; }
  .test-area { border: 2px solid #333; padding: 15px; margin: 15px 0; min-height: 100px; background: #f9f9f9; }
  #target { width: 100px; height: 60px; background: #667eea; color: white; display: flex;
            align-items: center; justify-content: center; transition: all 0.3s; }
  button { padding: 8px 16px; margin: 5px; cursor: pointer; border-radius: 4px; }
  .bad-btn { background: #e74c3c; color: white; border: none; }
  .good-btn { background: #27ae60; color: white; border: none; }
  #output { font-family: monospace; font-size: 13px; white-space: pre-wrap; background: #222; color: #0f0;
            padding: 12px; border-radius: 6px; margin-top: 10px; min-height: 80px; }
</style>
</head>
<body>
<h1>🔬 强制同步布局（Forced Synchronous Layout）检测</h1>
<div class="test-area">
  <div id="target">测试元素</div>
</div>

<div>
  <button class="bad-btn" onclick="badPattern()">❌ Bad：循环中读写交替</button>
  <button class="good-btn" onclick="goodPattern()">✅ Good：批量读写分离</button>
  <button onclick="detectProps()">🔍 检测 CSS 属性渲染阶段</button>
</div>

<div id="output">点击按钮开始测试...</div>

<script>
function badPattern() {
  // ❌ 错误示范：循环中交替读写，每次读取都触发强制同步布局
  const el = document.getElementById('target');
  const output = document.getElementById('output');
  const start = performance.now();  // 记录起始时间

  for (let i = 1; i <= 100; i++) {
    el.style.width = i + 'px';              // 写入样式（异步 reflow）
    const w = el.offsetWidth;               // 读取布局属性（⚠️ 强制同步 reflow！）
    // 每次循环都触发一次完整的 reflow，共 100 次！
  }

  const elapsed = (performance.now() - start).toFixed(2);
  output.textContent =
    `❌ Bad Pattern 结果:\n` +
    `  循环次数: 100\n` +
    `  理论最少 Reflow: 1 次（最后统一计算）\n` +
    `  实际触发 Reflow: ~100 次（每次 offsetWidth 读取都强制刷新）\n` +
    `  耗时: ${elapsed}ms\n\n` +
    `💡 原因: JavaScript 读取 offsetWidth 时,\n` +
    `   浏览器必须立刻执行之前积攒的 pending reflow 才能返回准确值`;
}

function goodPattern() {
  // ✅ 正确做法：先集中写，再集中读
  const el = document.getElementById('target');
  const output = document.getElementById('output');
  const start = performance.now();  // 记录起始时间

  // 第一步：集中写入所有样式变更
  const widths = [];
  for (let i = 1; i <= 100; i++) {
    widths.push(i + 'px');  // 收集所有值，不触发 reflow
  }
  el.style.width = widths[widths.length - 1];  // 只做最后一次写入

  // 第二步：集中读取
  const finalWidth = el.offsetWidth;  // 只读一次，只触发一次 reflow

  const elapsed = (performance.now() - start).toFixed(2);
  output.textContent =
    `✅ Good Pattern 结果:\n` +
    `  循环次数: 100\n` +
    `  实际触发 Reflow: ~1 次\n` +
    `  最终宽度: ${finalWidth}px\n` +
    `  耗时: ${elapsed}ms\n\n` +
    `💡 原因: 所有写操作被浏览器合并为一次异步 reflow,\n` +
    `   读操作只触发一次同步刷新`;
}

function detectProps() {
  // 展示常见属性的渲染阶段分类
  const props = ['width', 'color', 'transform', 'opacity', 'backgroundColor',
                 'fontSize', 'marginLeft', 'boxShadow', 'top', 'filter'];
  let result = '📋 CSS 属性渲染阶段检测结果:\n\n';
  result += '属性名'.padEnd(22) + '渲染阶段'.padEnd(18) + '代价\n';
  result += '-'.repeat(55) + '\n';

  props.forEach(prop => {
    const info = detectRenderStage(prop);
    const icon = info.cost === 5 ? '🔴' : info.cost === 3 ? '🟡' : '🟢';
    result += `${prop.padEnd(22)}${info.stage.padEnd(18)}${icon} ${'⭐'.repeat(info.cost)}\n`;
  });

  document.getElementById('output').textContent = result;
}
</script>
</body>
</html>
```

---

## Q19: 浏览器的渲染过程是怎样的？从输入 URL 到页面展示经历了什么？
- **难度**：★★☆
- **知识点**：浏览器渲染 / 关键渲染路径 / 性能优化
- **题型**：简答题

### 参考答案要点：

1. **完整流程概览（从 URL 到像素）**

   ```
   ┌─────────────────────────────────────────────────────────────────┐
   │                    浏览器渲染完整流程                             │
   ├─────────────────────────────────────────────────────────────────┤
   │                                                                  │
   │  1. 输入 URL                                                     │
   │     ↓                                                            │
   │  2. DNS 解析 → 获取服务器 IP 地址                                 │
   │     ↓                                                            │
   │  3. TCP 连接（三次握手）+ TLS 握手（HTTPS）                        │
   │     ↓                                                            │
   │  4. 发送 HTTP 请求 → 接收响应                                    │
   │     ↓                                                            │
   │  5. 解析 HTML → 构建 DOM Tree                                    │
   │     ↓                                                            │
   │  6. 解析 CSS → 构建 CSSOM                                        │
   │     ↓                                                            │
   │  7. 合并 DOM + CSSOM → Render Tree（渲染树）                      │
   │     ↓                                                            │
   │  8. Layout（布局/Reflow）→ 计算每个节点的位置和尺寸                │
   │     ↓                                                            │
   │  9. Paint（绘制/Repaint）→ 将节点转换为像素                        │
   │     ↓                                                            │
   │  10. Composite（合成）→ 将各图层合并，显示在屏幕上                 │
   │                                                                  │
   └─────────────────────────────────────────────────────────────────┘
   ```

2. **各阶段详解**

   **阶段一：网络通信（URL → 响应字节）**

   ```bash
   # 1. DNS 解析：域名 → IP
   # 浏览器缓存 → 系统缓存 → hosts 文件 → DNS 服务器递归查询

   # 2. TCP 三次握手
   # Client → Server: SYN
   # Server → Client: SYN + ACK
   # Client → Server: ACK
   # 建立可靠连接

   # 3. TLS 握手（HTTPS）
   # 协商加密算法、交换密钥、验证证书

   # 4. HTTP 请求/响应
   # GET/POST 请求 → 200 OK + HTML 内容
   ```

   **阶段二：构建 DOM Tree**

   ```
   HTML: <html><head><title>Page</title></head><body><div>Hello</div></body></html>
                          ↓ 字节流解码（Bytes → Characters）
                          ↓ 词法分析（Tokens）
                          ↓ 语法分析（Nodes）
                          ↓ DOM Tree 构建
   ```

   ```html
   <!-- DOM Tree 结构 -->
   Document
   └── html
       ├── head
       │   └── title: "Page"
       └── body
           └── div
               └── "Hello"  (Text Node)
   ```

   **关键点**：
   - HTML 解析是**增量**的（边下载边解析）
   - 遇到 `<script>` 时会**暂停** HTML 解析（除非 async/defer）
   - 遇到 `<link rel="stylesheet">` 时不会暂停解析，但会**阻塞渲染**

   **阶段三：构建 CSSOM**

   ```css
   /* CSS 来源： */
   /* 1. <link> 标签引入的外部 CSS */
   /* 2. <style> 标签内的内联 CSS */
   /* 3. 行内 style 属性 */
   /* 4. 浏览器默认样式（User Agent Stylesheet） */
   ```

   **CSSOM 构建特点**：
   - CSSOM 也是**增量构建**的
   - CSS 是**渲染阻塞**的（CSSOM 不完整就无法渲染）
   - JavaScript 可以查询 computed styles，所以 **CSS 阻塞 JS 执行**

   **阶段四：构建 Render Tree（渲染树）**

   ```
   DOM Tree  +  CSSOM  =  Render Tree

   Render Tree 只包含"可见"节点：
   - 不包含 <head>、<meta>、<script> 等不可见元素
   - 不包含 display: none 的元素
   - 包含 visibility: hidden 的元素（占位但不可见）
   ```

   **阶段五：Layout（布局/Reflow）**

   ```
   根据 Render Tree 计算每个节点的：
   - 位置（position: x, y）
   - 尺寸（width, height）

   这是一个递归过程：从根节点开始，向下计算每个子节点
   默认是"从上到下、从左到右"的流式布局
   ```

   **阶段六：Paint（绘制）**

   ```
   将 Layout 计算的结果转化为屏幕上的像素：
   - 文字 → 字形渲染
   - 颜色 → 像素填充
   - 边框 → 路径绘制
   - 阴影 → 图像模糊
   - ...

   绘制通常是分层进行的（Layers）
   ```

   **阶段七：Composite（合成）**

   ```
   将各个 Paint Layer 合成最终画面：
   - 主线程生成绘制指令
   - 合成线程（Compositor Thread）在 GPU 上完成合成
   - 通过位图传输（Rasterization）显示在屏幕上
   ```

3. **关键渲染路径优化**

   ```html
   <!-- 优化策略1：减少阻塞资源 -->
   <head>
     <!-- 关键 CSS 内联（减少 RTT） -->
     <style>
       /* above-the-fold 关键样式 */
       body { margin: 0; font-family: system-ui; }
       .hero { min-height: 100vh; }
     </style>

     <!-- 非关键 CSS 异步加载 -->
     <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
     <noscript><link rel="stylesheet" href="styles.css"></noscript>

     <!-- JS 使用 defer -->
     <script defer src="app.js"></script>
   </head>
   ```

   ```javascript
   // 优化策略2：减少 DOM 节点数量
   // - 使用虚拟滚动（长列表只渲染可视区域）
   // - 避免深层次的 DOM 嵌套
   // - 及时销毁不再需要的 DOM 节点

   // 优化策略3：避免 CSS/JS 阻塞渲染
   // - CSS 放在 <head> 中（尽早构建 CSSOM）
   // - JS 放在 </body> 前（或使用 defer/async/module）
   // - 避免在 CSS 中使用 @import（串行阻塞）
   ```

### 🔍 追问链
1. **DOM Tree 和 Render Tree 的区别是什么？哪些节点不会出现在 Render Tree 中？**
   → 方向：Render Tree 只包含可见节点；`<head>`、`<meta>`、`<script>`、`display:none` 的元素不出现在 Render Tree 中；`visibility:hidden` 出现（因为占位）
2. **为什么 CSS 会阻塞 JS 执行？这对页面加载有什么影响？**
   → 方向：JS 可能查询元素的 computed style（如 `getComputedStyle`），所以必须等 CSSOM 构建完；这意味着如果 CSS 加载慢，后面的 JS 也会被阻塞
3. **什么是"首屏渲染时间（FCP）"和"首次有意义渲染（FMP）"？如何优化？**
   → 方向：FCP（First Contentful Paint）= 第一次绘制任何内容的时间；FMP（First Meaningful Paint）= 首页主要内容绘制完成；优化手段：关键 CSS 内联、资源预加载、服务端渲染、骨架屏

---

## Q20: CSS 动画的几种实现方式？各有什么优缺点？
- **难度**：★★☆
- **知识点**：CSS动画 / Transition / Animation / 性能
- **题型**：简答题

### 参考答案要点：

1. **四种 CSS 动画实现方式**

   ```css
   /* ===== 方式1：transition（过渡）===== */
   .box-transition {
     width: 100px;
     background: #3498db;
     /* 定义过渡效果 */
     transition: width 0.3s ease, background-color 0.5s ease;
     /* transition: property duration timing-function delay */
   }
   .box-transition:hover {
     width: 200px;           /* 触发过渡：从 100px → 200px */
     background-color: #e74c3c;
   }
   /* 特点：
    * - 需要"触发器"（:hover/:focus/JS 添加类名等）
    * - 只能从 A 状态到 B 状态（不能中间停顿/往返）
    * - 适合简单交互反馈
    */

   /* ===== 方式2：animation + keyframes（关键帧动画）===== */
   @keyframes slideIn {
     from {
       opacity: 0;
       transform: translateX(-100%);
     }
     to {
       opacity: 1;
       transform: translateX(0);
     }
   }

   /* 更复杂的多阶段关键帧 */
   @keyframes complexAnimation {
     0% {
       transform: scale(1) rotate(0deg);
       opacity: 1;
     }
     25% {
       transform: scale(1.2) rotate(90deg);
       opacity: 0.8;
     }
     50% {
       transform: scale(1) rotate(180deg);
       opacity: 0.5;
     }
     75% {
       transform: scale(1.2) rotate(270deg);
       opacity: 0.8;
     }
     100% {
       transform: scale(1) rotate(360deg);
       opacity: 1;
     }
   }

   .box-animation {
     animation: slideIn 0.5s ease-out forwards;
     /* animation: name duration timing-function delay iteration-count direction fill-mode play-state */
   }
   /* 特点：
    * - 可以定义多个关键帧（复杂路径）
    * - 可以循环、往返、暂停
    * - 不需要触发器（自动播放）
    * - 适合复杂动画、loading 效果
    */

   /* ===== 方式3：JavaScript 操作样式（逐帧动画）===== */
   /* 通过 JS 在 requestAnimationFrame 中修改样式 */
   /* （详见 Q45 手写 loading 动画中的 JS 方式） */

   /* ===== 方式4：Web Animations API ===== */
   element.animate(
     [
       { transform: 'translateX(0)', opacity: 0 },
       { transform: 'translateX(100px)', opacity: 1 }
     ],
     {
       duration: 500,
       easing: 'ease-out',
       fill: 'forwards'
     }
   );
   /* 特点：
    * - 原生 JS API，性能好
    * - 可以精确控制动画时间线（play/pause/reverse）
    * - 兼容性：现代浏览器均支持
    */
   ```

2. **四种方式对比**

   | 特性 | Transition | Animation | JS(rAF) | WAAPI |
   |------|-----------|-----------|---------|-------|
   | **触发方式** | 状态变化触发 | 自动播放 | 手动控制 | 手动/自动 |
   | **复杂度** | 简单（A→B） | 复杂（多关键帧） | 任意复杂 | 任意复杂 |
   | **循环播放** | ❌ 不支持 | ✅ 支持 | ✅ 支持 | ✅ 支持 |
   | **中间状态** | ❌ 只有起止 | ✅ 多个关键帧 | ✅ 完全可控 | ✅ 完全可控 |
   | **性能** | 好（GPU加速属性） | 好（GPU加速属性） | 取决于实现 | 好 |
   | **JS 交互** | 有限（只能触发） | 有限（监听事件） | 完全控制 | 完全控制 |
   | **典型场景** | hover 效果、状态切换 | loading、循环动画 | 游戏物理引擎 | 复杂序列动画 |

3. **动画性能优化的核心原则**

   ```css
   /* ===== 只触发 Composite（合成）的属性（性能最优）===== */
   .gpu-accelerated {
     /* 这些属性的修改只触发 Composite，由 GPU 处理 */
     transform: translateX(100px);   /* 位移 */
     transform: rotate(45deg);       /* 旋转 */
     transform: scale(1.2);          /* 缩放 */
     opacity: 0.8;                   /* 透明度 */
     /* filter: blur(5px); */        /* 滤镜（部分浏览器也是合成） */
   }

   /* ===== 触发 Paint（绘制）的属性（性能中等）===== */
   .paint-trigger {
     color: red;              /* 颜色 */
     background: #fff;        /* 背景 */
     box-shadow: 0 0 10px #000; /* 阴影 */
     border-radius: 5px;      /* 圆角 */
   }

   /* ===== 触发 Layout（回流）的属性（性能最差，避免动画中使用）===== */
   .layout-trigger {
     width: 100px;            /* 宽高 */
     height: 100px;
     top/left: 10px;          /* 定位 */
     margin: 10px;            /* 外边距 */
     padding: 10px;           /* 内边距 */
     border-width: 1px;       /* 边框宽度 */
   }

   /* ===== 动画性能优化技巧 ===== */
   .optimized-animation {
     /* 1. 使用 will-change 提示浏览器 */
     will-change: transform, opacity;

     /* 2. 使用 transform3d 强制 GPU 加速 */
     transform: translateZ(0);  /* 创建新的合成层 */

     /* 3. 使用 contain 限制影响范围 */
     contain: layout style paint;
   }
   ```

4. **缓动函数（Timing Function）详解**

   ```css
   /* 内置缓动函数 */
   .easing-demo {
     transition-timing-function: linear;       /* 匀速 */
     transition-timing-function: ease;         /* 默认，慢-快-慢 */
     transition-timing-function: ease-in;      /* 慢开始 */
     transition-timing-function: ease-out;     /* 慢结束 */
     transition-timing-function: ease-in-out;  /* 慢开始和结束 */

     /* 三次贝塞尔曲线（自定义缓动） */
     transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);  /* ease 类似 */
     transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);  /* 弹性效果 */

     /* 阶梯函数（step）*/
     animation-timing-function: steps(3, end);  /* 分3步完成，跳跃感 */
     animation-timing-function: step-start;     /* 第一步就跳到结束态 */
     animation-timing-function: step-end;       /* 最后一步才跳到结束态 */
   }
   ```

### 🔍 追问链
1. **transition 和 animation 可以同时应用于同一个元素吗？有什么注意事项？**
   → 方向：可以同时使用；transition 处理属性变化的过渡，animation 处理持续动画；注意同名属性时 animation 可能覆盖 transition
2. **requestAnimationFrame 和 setInterval/setTimeout 做动画有什么区别？**
   → 方向：rAF 与浏览器刷新率同步（通常 60fps/120fps）；setInterval 不受刷新率控制，可能出现丢帧或过度渲染；rAF 在页面不可见时自动暂停（省电）
3. **如何在低端机上优化动画性能？如何做降级处理？**
   → 方向：检测 `matchMedia('(prefers-reduced-motion: reduce)')` 减少或禁用动画；使用 `will-change` 谨慎使用（不要滥用）；简化动画复杂度（减少粒子数/降低帧率）；使用 CSS `@media (prefers-reduced-motion)`

---

## Q21: 什么是 CSS 预处理器？Sass/Less/Stylus 各自的特点？
- **难度**：★★☆
- **知识点**：CSS预处理器 / Sass / Less / Stylus / 工程化
- **题型**：简答题

### 参考答案要点：

1. **CSS 预处理器概述**

   CSS 预处理器是一种在 CSS 基础上增加了**编程特性**的语言，编译后输出标准 CSS。主要解决了原生 CSS 的以下痛点：
   - 缺乏变量机制
   - 不支持嵌套写法
   - 没有函数/mixin 复用能力
   - 缺乏模块化/导入机制
   - 数学运算能力弱

2. **三大预处理器对比**

   | 特性 | **Sass/SCSS** | **Less** | **Stylus** |
   |------|--------------|----------|------------|
   **语法风格** | SCSS（类CSS）/ Sass（缩进） | 类 CSS | 缩进/类CSS/散括号均可 |
   **安装环境** | Ruby（原）/ Dart Sass（现） | Node.js | Node.js |
   **流行程度** | ⭐⭐⭐⭐⭐ 最高 | ⭐⭐⭐⭐ | ⭐⭐ |
   **学习成本** | 中等 | 低 | 低 |
   **社区生态** | 最丰富（Compass/Bourbon等） | Bootstrap 原生支持 | 较小众 |
   **编译速度** | Dart Sass 快 | 快 | 快 |
   **Vue CLI 支持** | 内置支持 | 内置支持 | 需插件 |
   **特色功能** | 最完善的函数系统 | 最接近 CSS 语法 | 语法最灵活自由 |

3. **Sass/SCSS 详细介绍（最主流的选择）**

   ```scss
   // ==========================================
   // Sass/SCSS 核心功能演示
   // ==========================================

   // 1. 变量（Variables）
   $primary-color: #3498db;
   $secondary-color: #2ecc71;
   $base-font-size: 16px;
   $spacing-unit: 8px;

   // 2. 嵌套（Nesting）
   .card {
     background: white;
     border-radius: 8px;
     padding: $spacing-unit * 2;

     &-header {           // .card-header（父选择器引用）
       font-size: 1.2em;
       padding-bottom: $spacing-unit;

       .title {          // .card-header .title
         color: $primary-color;
         margin: 0;
       }
     }

     &-body {
       p {
         line-height: 1.6;
         &:last-child {   // 最后一个段落
           margin-bottom: 0;
         }
       }
     }

     &:hover {            // .card:hover
       box-shadow: 0 4px 12px rgba(0,0,0,0.1);
     }
   }

   // 3. Mixin（混入/复用代码块）
   @mixin flex-center($direction: row) {
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: $direction;
   }

   @mixin responsive($breakpoint) {
     @if $breakpoint == mobile {
       @media (max-width: 576px) { @content; }
     } @else if $breakpoint == tablet {
       @media (max-width: 768px) { @content; }
     } @else if $breakpoint == desktop {
       @media (min-width: 992px) { @content; }
     }
   }

   // 使用 Mixin
   .hero-section {
     @include flex-center(column);  // 引入 mixin
     min-height: 100vh;
     padding: 20px;

     @include responsive(tablet) {  // 响应式包裹
       padding: 40px;
     }
   }

   // 4. 函数（Functions）
   @function rem($px, $base: 16) {
     @return ($px / $base) * 1rem;
   }

   @function tint($color, $percentage) {
     @return mix(white, $color, $percentage);
   }

   // 使用函数
   .text-lg {
     font-size: rem(18);  // 18px → 1.125rem
     color: tint($primary-color, 20%);  // 变亮 20%
   }

   // 5. 继承/扩展（Extend/Inheritance）
   %btn-base {           // 占位选择器（placeholder selector）
     padding: 8px 16px;
     border-radius: 4px;
     border: none;
     cursor: pointer;
     font-size: 14px;
     transition: all 0.3s ease;
   }

   .btn-primary {
     @extend %btn-base;  // 继承基础样式
     background: $primary-color;
     color: white;

     &:hover {
       background: darken($primary-color, 10%);
     }
   }

   .btn-secondary {
     @extend %btn-base;
     background: $secondary-color;
     color: white;
   }

   // 6. 模块导入（Import）
   // @use 'variables';      // Sass Module System（新版推荐）
   // @forward 'mixins';
   // @use 'functions' as *;

   // 7. 条件与循环
   @for $i from 1 through 6 {
     h#i {
       font-size: rem(48 - $i * 4);
     }
   }

   $breakpoints: (
     sm: 576px,
     md: 768px,
     lg: 992px,
     xl: 1200px
   );

   @each $name, $value in $breakpoints {
     @media (min-width: $value) {
       .container-#{$name} {
         max-width: $value;
         margin: 0 auto;
       }
     }
   }
   ```

4. **Less 语法特点**

   ```less
   // Less 语法（更接近 CSS）
   @primary-color: #3498db;  // 用 @ 声明变量

   .card {
     background: @primary-color;

     &:hover {
       background: darken(@primary-color, 10%);  // 内置函数
     }

     // Less 特有的：守卫（Guard）
     & when (@mode = dark) {
       background: lighten(@primary-color, 20%);
     }
   }

   // Less Mixin
   .border-radius(@radius: 4px) {
     border-radius: @radius;
     -webkit-border-radius: @radius;
   }

   .button {
     .border-radius(8px);  // 直接调用，无需 include
   }

   // Less 的懒加载变量（可在使用后定义）
   // @lazy-var: defined later;
   ```

5. **Stylus 语法特点**

   ```stylus
   // Stylus：极其灵活的语法（花括号、分号、冒号都可省略）

   // 变量
   primary-color = #3498db

   // 嵌套（缩进代替花括号）
   .card
     background white
     border-radius 8px

     &-header
       font-size 1.2em

       .title
         color primary-color

     &:hover
       box-shadow 0 4px 12px rgba(0,0,0,0.1)

   // 条件与迭代
   for i in 1..6
     h{i}
       font-size (48 - i * 4)px

   // Mixin
   add-property(prop, val)
     {prop} val

   .box
     add-property('color', red)
     // 编译为: .box { color: red; }
   ```

### 🔍 追问链
1. **Sass 的 `@use` 和 `@import` 有什么区别？为什么推荐用 `@use`？**
   → 方向：`@use` 是模块化系统（命名空间隔离、避免全局污染、显式依赖）；`@import` 是全局包含（变量/Mixin 全局共享、易冲突）；Dart Sass 已经废弃 `@import`
2. **PostCSS 和 CSS 预处理器是什么关系？是替代还是互补？**
   → 方向：互补关系。预处理器提供编程能力（变量/嵌套/Mixin）；PostCSS 提供 CSS 转译能力（ autoprefixer 添加前缀、postcss-preset-env 转译新特性）；现代工具链通常是：预处理器 → PostCSS → 压缩
3. **CSS 原生变量（Custom Properties）能在多大程度上替代预处理器？**
   → 方向：原生变量可以替代变量功能；但嵌套（Nesting 已在 CSS 中标准化）、Mixin/函数/条件/循环等仍需预处理器或 PostCSS 插件；趋势是"轻量预处理器 + CSS 原生特性"组合

---

## Q22: CSS Modules 的原理是什么？解决了什么问题？
- **难度**：★★☆
- **知识点**：CSS Modules / 样式隔离 / 工程化
- **题型**：简答题

### 参考答案要点：

1. **解决的问题：CSS 全局作用域的困境**

   ```css
   /* 传统 CSS 的问题：全局作用域导致样式冲突 */

   /* 文件 A: Button.css */
   .button {
     padding: 8px 16px;
     background: blue;
     color: white;
   }

   /* 文件 B: AnotherComponent.css */
   .button {
     padding: 4px 12px;
     background: red;
     color: black;
   }

   /* 两个 .button 在全局作用域中冲突！
    * 后加载的覆盖前面的，产生不可预期的样式错误 */
   ```

2. **CSS Modules 的核心原理**

   CSS Modules 并非官方 CSS 规范，而是一种**构建时的解决方案**：在编译阶段将类名映射为唯一的哈希值，确保样式局部作用域。

   ```css
   /* 输入：Button.module.css */
   .button {
     padding: 8px 16px;
     background: blue;
   }

   .active {
     background: darkblue;
   }
   ```

   ```css
   /* 输出：编译后的 CSS（类名被哈希化） */
   .Button_button__xY3zK {
     padding: 8px 16px;
     background: blue;
   }

   .Button_active__aB1cD {
     background: darkblue;
   }
   ```

   ```jsx
   // React 中的使用方式
   import styles from './Button.module.css';

   function Button({ active }) {
     return (
       // JSX 中使用映射后的类名
       <button className={`${styles.button} ${active ? styles.active : ''}`}>
         Click me
       </button>
     );
   }

   // 编译后的 HTML：
   // <button class="Button_button__xY3zK Button_active__aB1cD">
   ```

3. **核心特性详解**

   ```css
   /* ===== 1. 局部作用域（默认）===== */
   .localClass {
     /* 默认就是局部的，编译后会加哈希后缀 */
   }

   /* ===== 2. 全局作用域（:global 声明）===== */
   :global(.global-class) {
     /* 这个类名不会被哈希化，保持原样 */
   }

   /* 或者整块声明为全局 */
   :global {
     .another-global {
       /* 这里面的类名都不哈希 */
     }
   }

   /* ===== 3. Composes（组合/复用）===== */
   .base-button {
     padding: 8px 16px;
     border: none;
     border-radius: 4px;
     cursor: pointer;
   }

   .primary-button {
     composes: base-button;  /* 继承 base-button 的所有样式 */
     background: blue;
     color: white;
   }

   .danger-button {
     composes: base-button;  /* 复用同样的基础样式 */
     background: red;
     color: white;
   }
   /* 编译结果：danger-button 的 className 会同时包含
    * base-button 和 danger-button 的哈希类名 */

   /* ===== 4. 从其他文件 Composes ===== */
   /* colors.module.css */
   .blue-bg { background: blue; }
   .white-text { color: white; }

   /* Button.module.css */
   .btn {
     composes: blue-bg from './colors.module.css';  /* 从其他文件导入 */
     composes: white-text from './colors.module.css';
     padding: 8px 16px;
   }

   /* ===== 5. 变量与插值 ===== */
   @value primary: #3498db;
   @value secondary: #2ecc71 from './colors.module.css';

   .header {
     color: primary;
     border-color: secondary;
   }
   ```

4. **与其他方案的对比**

   | 方案 | 原理 | 作用域隔离 | 运行时开销 | 学习成本 |
   |------|------|-----------|-----------|---------|
   **CSS Modules** | 编译时哈希类名 | ✅ 极强 | ❌ 无 | 低 |
   **CSS-in-JS (styled-components)** | 运行时注入 style 标签 | ✅ 极强 | ⚠️ 有 | 中 |
   **Vue Scoped CSS** | 编译时添加 data-v 属性 | ✅ 强 | ❌ 无 | 低 |
   **BEM 命名规范** | 约定式命名 | ⚠️ 依赖自觉 | ❌ 无 | 低 |
   **Shadow DOM** | 浏览器原生隔离 | ✅ 最强 | ⚠️ 微小 | 中 |

5. **CSS Modules 的配置（Webpack/Vite）**

   ```javascript
   // webpack.config.js
   module.exports = {
     module: {
       rules: [
         {
           test: /\.module\.css$/i,
           use: [
             'style-loader',
             {
               loader: 'css-loader',
               options: {
                 modules: {
                   localIdentName: '[path][name]__[local]--[hash:base64:5]',
                   // 生成类似: src-components-Button__button__xY3zK
                 },
               },
             },
           ],
         },
         // 普通 CSS 不做 modules 处理
         {
           test: /\.css$/i,
           exclude: /\.module\.css$/i,
           use: ['style-loader', 'css-loader'],
         },
       ],
     },
   };
   ```

### 🔍 追问链
1. **CSS Modules 和 Vue 的 Scoped CSS 有什么区别？**
   → 方向：CSS Modules 是编译时哈希类名（彻底的唯一性）；Scoped CSS 是添加 data-v-xxxx 属性 + 属性选择器（选择器更长）；CSS Modules 支持 composes，Scoped CSS 不支持
2. **CSS Modules 的类名哈希在生产环境中每次构建都一样吗？如何保证稳定性？**
   → 方向：默认基于内容哈希（相同内容生成相同哈希，稳定）；可自定义 localIdentName 加入 hash；配合 contenthash 做长期缓存
3. **CSS Modules 如何做主题切换（Theme Switching）？**
   → 方向：使用 CSS 变量 + CSS Variables（:root 定义变量，Modules 中引用 var(--xxx)）；或使用多套 CSS Modules 文件按主题切换加载

---

## Q23: Tailwind CSS 的原子化思想是什么？与传统 CSS 写法的优劣？
- **难度**：★★☆
- **知识点**：Tailwind CSS / 原子化CSS / 工程范式
- **题型**：简答题

### 参考答案要点：

1. **原子化 CSS（Atomic CSS）的核心思想**

   传统 CSS 是"语义化命名 + 复合样式"，原子化 CSS 则是将每个 CSS 属性拆分为最小的**单一职责类**：

   ```html
   <!-- 传统写法：语义化类名 + 自定义 CSS -->
   <style>
     .card {
       background: white;
       border-radius: 8px;
       padding: 16px;
       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
     }
     .card-title {
       font-size: 18px;
       font-weight: bold;
       color: #333;
       margin-bottom: 8px;
     }
   </style>
   <div class="card">
     <h2 class="card-title">标题</h2>
   </div>

   <!-- Tailwind 原子化写法：直接在 HTML 中组合 utility classes -->
   <div class="bg-white rounded-xl p-4 shadow-md">
     <h2 class="text-lg font-bold text-gray-800 mb-2">标题</h2>
   </div>
   ```

2. **Tailwind 的设计哲学**

   ```
   原子化 CSS 的核心理念：

   1. 不要抽象过早（Don't abstract prematurely）
   - 传统做法：提前创建 .card、.btn 等抽象组件类
   - Tailwind 做法：直接用原子类组合，需要时再抽取

   2. 样式离组件更近（Styles closer to components）
   - 在 HTML/JSX 中直接看到完整的样式信息
   - 不需要在 HTML 和 CSS 文件之间来回切换

   3. 设计令牌化（Design Tokens）
   - 颜色、间距、字体等都定义为"设计系统"
   - 确保一致性和可维护性
   ```

3. **Tailwind 的核心功能**

   ```html
   <!-- ===== 布局（Layout）===== -->
   <div class="flex items-center justify-between p-4">
     <div class="w-1/3 bg-blue-500"></div>
     <div class="flex-1 ml-4"></div>
   </div>

   <!-- ===== 间距（Spacing）—— 基于设计系统的倍数 ===== -->
   <!-- p-{n}: padding, m-{n}: margin, n ∈ {0,0.5,1,2,3,4,5,6,8,10,12,16,...} -->
   <!-- 默认 1 = 0.25rem = 4px -->
   <div class="p-4 m-2 space-y-4">  <!-- p-4=16px, m-2=8px, 子元素间距16px -->

   <!-- ===== 颜色（Colors）===== -->
   <div class="bg-blue-500 text-white hover:bg-blue-600">
     <!-- 颜色格式: {color}-{shade} -->
     <!-- shade: 50-900 (50最浅, 900最深) + 默认(500) -->
   </div>

   <!-- ===== 响应式（Responsive）===== -->
   <div class="
     w-full          /* 默认（手机）: 100% */
     md:w-1/2        /* md(768px+) : 50% */
     lg:w-1/3        /* lg(1024px+): 33.33% */
   ">
   </div>

   <!-- ===== 状态变体（Variants）===== -->
   <button class="
     bg-blue-500
     hover:bg-blue-600      /* :hover */
     focus:ring-2           /* :focus */
     active:bg-blue-700     /* :active */
     disabled:opacity-50    /* :disabled */
     dark:bg-blue-400      /* 暗色模式 */
   ">
     按钮
   </button>
   ```

4. **优劣对比分析**

   | 维度 | 传统 CSS / BEM | Tailwind CSS |
   |------|---------------|-------------|
   **开发速度** | 慢（HTML↔CSS 切换） | 快（所见即所得） |
   **HTML 可读性** | 干净（类名语义化） | 长（大量原子类） |
   **CSS 体积** | 小（复用率高） | 大（未使用的类需清除） |
   **设计一致性** | 依赖开发者自觉 | 强制约束（设计令牌） |
   **团队协作** | 需要严格的命名规范 | 降低沟通成本（统一的类名） |
   **学习曲线** | 低（基础 CSS） | 中（需熟悉类名体系） |
   **调试体验** | 好（DevTools 直接对应） | 需适应（但配置好后很好） |
   **生产包体积** | 取决于写法 | 极小（Tree-shaking 移除未使用类） |
   **定制灵活性** | 完全自由 | 受限于配置的设计系统 |

5. **JIT 模式与生产优化**

   ```javascript
   // tailwind.config.js
   module.exports = {
     mode: 'jit',  // Just-In-Time 模式（v3+ 默认开启）
     purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
     // JIT 模式：按需生成，只保留用到的类
     // 生产环境的 CSS 通常只有 5-10KB（gzip 后）

     theme: {
       extend: {
         colors: {
           brand: {
             light: '#e3f2fd',
             DEFAULT: '#2196f3',  // brand = brand-500
             dark: '#1565c0',
           },
         },
         spacing: {
           '18': '4.5rem',  // 自定义间距
         },
       },
     },

     // 变体配置
     variants: {
       extend: {
         backgroundColor: ['active'],  // 自定义变体
       },
     },
   };
   ```

### 🔍 追问链
1. **Tailwind 的 HTML 类名很长，如何保持可读性和维护性？**
   → 方向：使用编辑器插件自动排序类名；提取复用组件（`@apply` 或创建组件）；合理使用 `group`/`arbitrary values` 等高级特性
2. **Tailwind 和 CSS-in-JS（如 styled-components）如何选择？**
   → 方向：Tailwind 适合追求开发效率和设计一致性的团队；CSS-in-JS 适合需要动态样式/复杂主题逻辑的场景；两者也可以结合使用
3. **Tailwind v4 有哪些重大变化？**
   → 方向：v4 采用 Oxide 引擎（Rust 重写，速度快 10x）；配置改为 CSS-first（`@theme` 在 CSS 中配置）；不再需要 PostCSS 插件；内置 Oxide 引擎直接处理

---

## Q24: 移动端适配方案有哪些？（rem/vw/viewport 方案对比）
- **难度**：★★☆
- **知识点**：移动端适配 / 响应式设计 / rem / vw
- **题型**：简答题

### 参考答案要点：

1. **移动端适配的核心挑战**

   ```
   问题：同一套代码在不同尺寸的手机屏幕上需要合理展示

   物理屏幕尺寸：iPhone SE (375px) ↔ iPhone 14 Pro Max (430px) ↔ Android 各种尺寸
   设备像素比（DPR）：1x / 2x / 3x（Retina 屏幕）
   安全区域：刘海屏、底部指示器
   横竖屏切换
   ```

2. **方案一：rem 方案（经典方案）**

   ```html
   <!-- 核心：动态设置 html 的 font-size，然后所有尺寸用 rem -->
   <!DOCTYPE html>
   <html>
   <head>
     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
     <script>
       // 动态设置根字号（基于设计稿宽度 375px）
       function setRootFontSize() {
         const designWidth = 375;   // 设计稿基准宽度（通常 iPhone 6/7/8）
         const docEl = document.documentElement;
         const width = docEl.clientWidth;  // 视口宽度
         // 1rem = (当前宽度 / 设计稿宽度) * 基准字号
         docEl.style.fontSize = (width / designWidth) * 16 + 'px';
       }
       setRootFontSize();
       window.addEventListener('resize', setRootFontSize);
       window.addEventListener('orientationchange', setRootFontSize);
     </script>
     <style>
       /* 所有尺寸都用 rem（基于 16px 基准） */
       .container {
         width: 23.4375rem;   /* 375px / 16px ≈ 23.44rem */
         padding: 1rem;
       }
       .title {
         font-size: 1.125rem;  /* 18px */
       }
     </style>
   </head>
   ```

   **rem 方案优缺点**：
   - ✅ 兼容性极好（IE9+）
   - ✅ 概念简单，易于理解
   - ❌ 需要 JavaScript 动态计算
   - ❌ 无法纯 CSS 实现

3. **方案二：vw/vh 方案（现代方案）**

   ```css
   /* vw：viewport width 的 1%（视口宽度的百分之一）
    * vh：viewport height 的 1%
    * vmin：vw 和 vh 中较小的值
    * vmax：vw 和 vh 中较大的值 */

   /* 基于 375px 设计稿的换算：
    * 1vw = 3.75px (在 375px 宽屏幕上)
    * 所以：目标 px / 3.75 = vw 值
    * 例：100px → 26.666vw, 18px → 4.8vw
    */

   .container {
     width: 100vw;            /* 等于视口宽度 */
     padding: 2.666vw;        /* 约 10px @375px */
   }

   .title {
     font-size: 4.8vw;        /* 约 18px @375px */
   }

   /* 使用 postcss-px-to-viewport 插件自动转换
    * 开发时写 px，编译自动转为 vw */
   ```

   **vw 方案优缺点**：
   - ✅ 纯 CSS 方案，无需 JS
   - ✅ 更简洁直接
   - ⚠️ 老版本 iOS Safari 有 vw 的兼容 bug（已基本解决）
   - ⚠️ 大屏上字体可能过大（需配合 max-width / media query）

4. **方案三：viewport 方案 + 缩放**

   ```html
   <!-- 通过设置 viewport 的 scale 实现等比缩放 -->
   <script>
     // 方案 A：动态设置 viewport scale
     const designWidth = 375;
     const viewport = document.querySelector('meta[name="viewport"]');
     const scale = window.screen.width / designWidth;
     viewport.content = `width=${designWidth}, initial-scale=${scale}, maximum-scale=${scale}, user-scalable=no`;
   </script>
   ```

5. **三种方案对比**

   | 维度 | rem 方案 | vw 方案 | viewport 缩放 |
   |------|----------|---------|--------------|
   **实现方式** | JS 动态设 font-size | 纯 CSS | JS 设 viewport |
   **兼容性** | IE9+ | iOS 8+（部分 bug） | 全兼容 |
   **精度** | 高 | 高 | 受小数精度影响 |
   **开发体验** | 需换算/rem 单位 | 需换算/vw 单位 | 可直接写设计稿 px |
   **推荐度** | ⭐⭐⭐⭐ 经典稳定 | ⭐⭐⭐⭐⭐ 未来趋势 | ⭐⭐ 已过时 */

### 🔍 追问链
1. **postcss-px-to-rem 和 postcss-px-to-viewport 如何选择？**
   → 方向：团队习惯用 rem 选前者；追求纯 CSS 选后者；也可以两者结合（pc 用 px，移动端用 vw/rem）；注意配置 exclude 排除不需要转换的文件
2. **大屏设备上如何防止 rem/vw 方案的元素过大？**
   → 方向：使用 `max-width` 限制容器最大宽度；使用媒体查询在大屏上固定根字号或切换为固定布局；参考响应式设计的"断点"策略
3. **安全区域适配（safe-area-inset）和适配方案有什么关系？**
   → 方向：安全区域是独立于尺寸适配的问题；需要通过 `env(safe-area-inset-*)` + viewport-fit=cover 配合处理刘海屏/底部指示器；可与任何适配方案组合使用

---

## Q25: 移动端 1px 问题怎么解决？
- **难度**：★★☆
- **知识点**：移动端适配 / 1px问题 / DPR / 高清屏
- **题型**：简答题

### 参考答案要点：

1. **问题的本质**

   ```
   CSS 中的 1px ≠ 物理上的 1 像素！

   在 Retina 屏幕（DPR=2 或 3）上：
   - CSS 的 1px = DPR × 1 个物理像素
   - DPR=2 时，CSS 1px = 2 个物理像素（看起来很粗）
   - DPR=3 时，CSS 1px = 3 个物理像素（看起来更粗）
   ```

2. **解决方案一：transform: scaleY(0.5)（最常用）**

   ```css
   /* 利用伪元素 + transform 缩放 */
   .thin-border {
     position: relative;
   }
   .thin-border::after {
     content: '';
     position: absolute;
     left: 0; bottom: 0;
     width: 100%;
     height: 1px;
     background-color: #000;
     transform: scaleY(0.5);
     transform-origin: 0 0;
   }
   ```

3. **其他方案速查**

   ```css
   /* 方案二：box-shadow 模拟 */
   .thin-shadow { box-shadow: 0 0 0 0.5px #000; }

   /* 方案三：border-image + SVG（精度最高）*/
   .thin-svg { border-image: url("data:image/svg+xml,...") 2 stretch; }

   /* 方案四：0.5px 直接写（iOS 8+/Chrome 支持）*/
   .thin-half { border: 0.5px solid #000; }
   ```

4. **方案对比**

   | 方案 | 兼容性 | 圆角支持 | 推荐场景 |
   |------|--------|---------|----------|
   **transform: scaleY** | 好 | 需特殊处理 | **通用推荐** |
   **box-shadow** | 好 | ❌ 不支持 | 简单直线边框 |
   **border-image+SVG** | 好 | ❌ 困难 | 精度要求极高 |
   **0.5px 直接写** | iOS 8+/Chrome | ✅ 支持 | 新项目首选 |

### 🔍 追问链
1. **transform: scaleY(0.5) 方案为什么有时线条颜色变淡或模糊？**
   → 方向：亚像素渲染导致；某些位置可能落在像素之间
2. **圆角边框的 1px 问题如何解决？**
   → 方向：transform 对圆角支持不好；建议用 box-shadow 或接受略粗的圆角边框

---

## Q26: CSS will-change 属性的作用和使用注意事项
- **难度**：★★☆
- **知识点**：性能优化 / GPU加速 / will-change
- **题型**：简答题

### 参考答案要点：

1. **will-change 的作用**

   `will-change` 是一个 CSS 属性，用于**提前告知浏览器某个元素即将发生变化**，让浏览器提前做好优化准备。主要用于：
   - 提示浏览器元素将发生的变化类型
   - 让浏览器提前创建独立的合成层（Compositing Layer）
   - 优化动画性能，避免卡顿

   ```css
   /* 基本语法 */
   .element {
     will-change: transform;        /* 告知浏览器 transform 将会改变 */
     will-change: opacity;          /* 告知浏览器 opacity 将会改变 */
     will-change: top, left;        /* 可以声明多个属性 */
     will-change: auto;             /* 默认值，不提示 */
   }
   ```

2. **will-change 的工作原理**

   ```
   普通流程：JS修改样式 → 浏览器检测变化 → 创建合成层 → 执行动画（可能卡顿）
   使用will-change：浏览器提前创建合成层 → JS修改样式 → 直接执行动画（流畅）
   ```

   - **提前优化**：浏览器会在元素实际变化前，就为该属性分配资源
   - **GPU 加速**：对于 `transform`、`opacity` 等可合成属性，会提前提升到 GPU 层
   - **减少重排重绘**：独立合成层可以避免影响其他元素的渲染

3. **正确使用方式**

   ```css
   /* ✅ 正确用法1：在动画即将开始前添加 */
   .card:hover {
     will-change: transform;
     transform: scale(1.05);
   }

   /* ✅ 正确用法2：通过 JavaScript 动态添加/移除 */
   <style>
     .animated {
       will-change: transform;
       animation: slideIn 0.3s ease-out;
     }
   </style>
   <script>
     // 动画开始前添加
     element.classList.add('animated');

     // 动画结束后移除（重要！释放资源）
     element.addEventListener('animationend', () => {
       element.classList.remove('animated');
       // 或者显式设置为 auto
       element.style.willChange = 'auto';
     });
   </script>

   /* ✅ 正确用法3：用于持续动画的元素 */
   .loading-spinner {
     will-change: transform;
     animation: spin 1s linear infinite;
   }
   ```

4. **常见错误和注意事项**

   ```css
   /* ❌ 错误1：全局滥用（性能杀手）*/
   * {
     will-change: transform, opacity;
   }
   /* 问题：所有元素都创建独立合成层，内存爆炸 */

   /* ❌ 错误2：对大量元素使用 */
   .list-item:nth-child(1) { will-change: transform; }
   .list-item:nth-child(2) { will-change: transform; }
   /* ... 100个元素 */
   /* 问题：每个元素都占用额外内存和 GPU 资源 */

   /* ❌ 错误3：长期保留（不及时移除）*/
   .static-element {
     will-change: transform;  /* 但这个元素根本不会变化！ */
   }
   /* 问题：浪费内存，永远不会被回收 */

   /* ❌ 错误4：声明过多属性 */
   .bad-example {
     will-change: width, height, top, left, margin, padding,
                  background, color, border-radius, box-shadow;
   }
   /* 问题：浏览器无法有效优化这么多属性 */
   ```

5. **最佳实践总结**

   | 场景 | 推荐做法 |
   |------|----------|
   **hover 动画** | `:hover` 时设置，或用 JS 在 `mouseenter` 时添加 |
   **点击反馈** | 点击时临时添加，动画结束后移除 |
   **持续动画**（loading）| 可长期保留，但注意数量控制 |
   **滚动动画** | 使用 IntersectionObserver 动态管理 |
   **大量列表项** | 只对可见区域的前后几个元素使用 |

6. **替代方案**

   ```css
   /* 方案1：transform3d hack（强制 GPU 加速）*/
   .gpu-accelerated {
     transform: translateZ(0);  /* 或 translate3d(0, 0, 0) */
   }

   /* 方案2：使用 contain 属性限制影响范围*/
   .contained {
     contain: layout style paint;
   }

   /* 方案3：backface-visibility（部分情况）*/
   .backface-hidden {
     backface-visibility: hidden;
     perspective: 1000px;
   }
   ```

### 🔍 追问链
1. **will-change 和 translateZ(0) 的区别是什么？哪个更好？**
   → 方向：will-change 是语义化的提示，浏览器可以智能决策；translateZ(0) 是强制创建合成层的 hack；优先使用 will-change，兼容性要求高时用 translateZ(0)
2. **如何检测一个元素是否创建了独立的合成层？**
   → 方向：Chrome DevTools → Layers 面板；或者 Rendering 面板勾选 "Layer borders"，有黄色边框的表示是独立合成层
3. **移动端使用 will-change 有什么特别需要注意的地方？**
   → 方向：移动端 GPU 内存有限，大量使用会导致崩溃；建议只对关键动画元素使用，且及时清理；iOS Safari 对合成层数量有限制

---

## Q27: line-height 的各种单位值表现有何不同
- **难度**：★★☆
- **知识点**：line-height / 文字排版 / 单位差异
- **题型**：简答题

### 参考答案要点：

1. **line-height 的作用**

   `line-height` 用于设置行间的距离（行高），控制文本垂直方向上的间距。它不仅影响多行文本的行距，还与**垂直居中**密切相关。

   ```css
   .text {
     line-height: 1.5;  /* 行高为字体大小的 1.5 倍 */
   }
   ```

2. **四种单位值的详细对比**

   ```html
   <!-- 测试容器 -->
   <div class="container" style="font-size: 16px;">
     <p class="test-1">无单位的 line-height: 1.5</p>
     <p class="test-2">带 px 单位: 24px</p>
     <p class="test-3">带 em 单位: 1.5em</p>
     <p class="test-4">带 % 百分比: 150%</p>

     <!-- 嵌套测试 -->
     <div style="font-size: 32px;">
       <p class="test-1">父字体32px - 无单位: 1.5</p>
       <p class="test-2">父字体32px - px: 24px</p>
       <p class="test-3">父字体32px - em: 1.5em</p>
       <p class="test-4">父字体32px - %: 150%</p>
     </div>
   </div>
   ```

   ```css
   /* ===== 方式1：无单位值（推荐）===== */
   .test-1 { line-height: 1.5; }
   /*
    * 特性：继承的是"倍数"而非计算值
    * 父元素 font-size: 16px → 行高 = 16 × 1.5 = 24px
    * 子元素 font-size: 32px → 行高 = 32 × 1.5 = 48px（自动适配！）
    *
    * ✅ 优点：响应式，子元素自动继承比例
    * ✅ 推荐场景：大多数文本排版场景
    */

   /* ===== 方式2：px 固定像素值 ===== */
   .test-2 { line-height: 24px; }
   /*
    * 特性：固定值，不会随字体大小变化
    * 父元素 font-size: 16px → 行高 = 24px
    * 子元素 font-size: 32px → 行高 = 24px（不变！可能重叠）
    *
    * ⚠️ 缺点：不够灵活，大字体时文字可能重叠
    * 适用场景：需要精确控制行高的特殊布局
    */

   /* ===== 方式3：em 相对单位 ===== */
   .test-3 { line-height: 1.5em; }
   /*
    * 特性：相对于当前元素的 font-size 计算
    * 父元素 font-size: 16px → 行高 = 16 × 1.5 = 24px
    * 继承时：继承的是计算后的绝对值（24px）！
    * 子元素 font-size: 32px → 行高 = 24px（继承的计算值，不是重新计算）
    *
    * ⚠️ 注意：和无单位值的区别在于继承行为
    * 类似于 % 的行为
    */

   /* ===== 方式4：% 百分比值 ===== */
   .test-4 { line-height: 150%; }
   /*
    * 特性：相对于当前元素的 font-size 计算
    * 行为与 em 完全相同
    * 父元素 font-size: 16px → 行高 = 16 × 150% = 24px
    * 子元素 font-size: 32px → 行高 = 24px（继承计算值）
    *
    * ⚠️ 不推荐：容易造成嵌套时的行高混乱
    */
   ```

3. **实际效果演示**

   ```
   场景：父元素 16px，子元素 32px

   ┌─────────────────────────────────────┐
   │ 无单位 (1.5):                       │
   │   父：16px 字体，24px 行高          │
   │   子：32px 字体，48px 行高 ✅ 自适应│
   ├─────────────────────────────────────┤
   │ px (24px):                          │
   │   父：16px 字体，24px 行高          │
   │   子：32px 字体，24px 行高 ⚠️ 重叠  │
   ├─────────────────────────────────────┤
   │ em (1.5em) / % (150%):              │
   │   父：16px 字体，24px 行高          │
   │   子：32px 字体，24px 行高 ⚠️ 重叠  │
   └─────────────────────────────────────┘
   ```

4. **line-height 与垂直居中的关系**

   ```css
   /* 经典的单行文本垂直居中技巧 */
   .center-text {
     height: 100px;
     line-height: 100px;  /* 与 height 相等 */
     text-align: center;
   }
   /*
    * 原理：当 line-height 等于容器高度时，
    * 文字的基线位于行的中间位置，视觉上居中
    *
    * ⚠️ 限制：只适用于单行文本！多行文本会失效
    */

   /* 多行文本垂直居中方案 */
   .center-multiline {
     display: flex;
     align-items: center;
     justify-content: center;
     height: 200px;
   }

   /* 或者使用伪元素方案 */
   .center-pseudo {
     height: 200px;
     text-align: center;
   }
   .center-pseudo::before {
     content: '';
     display: inline-block;
     height: 100%;
     vertical-align: middle;
   }
   .center-pseudo > span {
     display: inline-block;
     vertical-align: middle;
   }
   ```

5. **line-height 的全局设置最佳实践**

   ```css
   /* 推荐的全局样式设置 */
   :root {
     /* 无单位值，便于全局继承和响应式 */
     --line-height-tight: 1.25;
     --line-height-normal: 1.5;
     --line-height-relaxed: 1.75;
   }

   body {
     font-size: 16px;
     line-height: var(--line-height-normal);  /* 1.5 */
   }

   h1, h2, h3 {
     line-height: var(--line-height-tight);   /* 标题紧凑一些 */
   }

   blockquote, .prose {
     line-height: var(--line-height-relaxed); /* 正文宽松一些 */
   }

   /* 不同语言的行高调整 */
   [lang="zh"], [lang="ja"] {
     line-height: 1.6;  /* CJK字符通常需要更大的行高 */
   }
   ```

6. **特殊值**

   ```css
   .special {
     line-height: normal;   /* 默认值，浏览器决定（通常约 1.2）*/
     line-height: inherit;  /* 显式继承父元素的值 */
     line-height: initial;  /* 重置为初始值（normal）*/
     line-height: unset;    /* 如果继承则继承，否则为 initial */
   }
   ```

### 🔍 追问链
1. **为什么推荐使用无单位的 line-height？在实际项目中遇到过什么坑吗？**
   → 方向：无单位值具有"继承比例"的特性，在响应式设计和组件化开发中更灵活；em/% 会继承计算值导致嵌套时行高异常
2. **line-height 和 vertical-align 是什么关系？它们如何共同影响文本的垂直位置？**
   → 方向：line-height 决定行框的高度，vertical-align 决定元素在行框内的垂直对齐方式；两者配合才能精确控制文本排版
3. **CSS 中有没有其他属性也有类似的"无单位 vs 有单位"的继承差异？**
   → 方向：font-size 使用 em/rem 时也有类似问题；但大多数现代属性（如 padding、margin）使用相对单位时都是基于当前元素计算

---

## Q28: margin 合并（折叠）现象及利用/避免方法
- **难度**：★★☆
- **知识点**：margin合并 / BFC / 盒模型
- **题型**：简答题

### 参考答案要点：

1. **什么是 Margin 合并（Margin Collapsing）**

   Margin 合并是指当两个或多个垂直方向的 margin 相遇时，它们会合并成一个 margin，**取其中的最大值**（如果都是正值）。这是 CSS 的标准行为，不是 bug。

   ```html
   <!-- 示例：相邻兄弟元素的 margin 合并 -->
   <style>
     .box { margin: 20px 0; }
   </style>
   <div class="box">第一个盒子</div>  <!-- margin-bottom: 20px -->
   <div class="box">第二个盒子</div>  <!-- margin-top: 20px -->
   <!-- 实际间距：20px（不是 40px！）-->
   ```

2. **触发 Margin 合并的三种场景**

   ```html
   <style>
     .parent {
       background-color: #f0f0f0;
       margin-top: 30px;           /* 场景1：父子 margin 合并 */
     }
     .child {
       margin-top: 50px;
       height: 100px;
       background-color: #3498db;
     }

     .sibling {
       margin: 20px 0;            /* 场景2：兄弟元素合并 */
       height: 50px;
     }

     .empty {
       margin-top: 40px;          /* 场景3：空块级元素 */
       margin-bottom: 60px;
       /* 没有内容、padding、border */
     }
   </style>

   <!-- 场景1：父子元素 margin 合并 -->
   <div class="parent">
     <div class="child">子元素</div>
   </div>
   <!-- 结果：parent 和其前面的元素间距为 max(30, 50) = 50px -->

   <!-- 场景2：相邻兄弟元素 -->
   <div class="sibling">兄弟1</div>  <!-- margin-bottom: 20px -->
   <div class="sibling">兄弟2</div>  <!-- margin-top: 20px -->
   <!-- 结果：间距为 max(20, 20) = 20px -->

   <!-- 场景3：空块级元素 -->
   <div class="empty"></div>
   <!-- 结果：上下 margin 合并为 max(40, 60) = 60px -->
   ```

3. **Margin 合并的计算规则**

   ```
   当两个 margin 相遇时：

   1. 都为正数 → 取较大值
      例：margin-top: 30px + margin-bottom: 50px → 50px

   2. 一正一负 → 相减（绝对值相减）
      例：margin-top: 30px + margin-bottom: -10px → 20px

   3. 都为负数 → 取绝对值最大的负数
      例：margin-top: -30px + margin-bottom: -50px → -50px

   4. 多个 margin 连续相遇 → 取最极端的值
      例：10px, 20px, 30px, 15px → 取 30px
   ```

4. **避免 Margin 合并的方法**

   ```css
   /* 方法1：触发 BFC（Block Formatting Context）—— 最常用 */
   .parent {
     overflow: hidden;  /* 触发 BFC */
     /* 或者 */
     display: flow-root;  /* 现代、语义化的 BFC 触发方式（推荐）*/
     /* 或者 */
     position: absolute;
     /* 或者 */
     display: inline-block;
     /* 或者 */
     float: left;
   }

   /* 方法2：给父元素添加 border 或 padding */
   .parent-with-border {
     border-top: 1px solid transparent;  /* 最小的边框 */
     /* 或者 */
     padding-top: 1px;  /* 最小的内边距 */
   }

   /* 方法3：使用 padding 代替 margin（在某些场景）*/
   .use-padding {
     padding-top: 20px;  /* 用 padding 替代 margin-top */
   }

   /* 方法4：使用 flex 或 grid 布局（自动消除合并）*/
   .flex-container {
     display: flex;
     flex-direction: column;
   }
   /* Flex/Grid 容器内的子元素不会发生 margin 合并 */

   /* 方法5：给父元素设置 display: flow-root（现代方案）*/
   .modern-bfc {
     display: flow-root;  /* 专门用于创建 BFC，无副作用 */
   }
   ```

5. **主动利用 Margin 合并的场景**

   ```html
   <style>
     /* 场景1：统一段落间距 */
     article p {
       margin: 1em 0;  /* 段落之间的间距统一为 1em */
     }
     /* 即使连续多个段落，间距也是 1em，不会叠加 */

     /* 场景2：标题与段落的间距 */
     section h2 {
       margin-bottom: 0.8em;
     }
     section p {
       margin-top: 1.2em;
     }
     /* 标题和段落之间取 max(0.8em, 1.2em) = 1.2em */

     /* 场景3：卡片组件的间距 */
     .card-list .card {
       margin-bottom: 20px;
     }
     /* 最后一张卡片不需要特殊处理，不会产生多余间距 */
   </style>
   ```

6. **常见误区和调试技巧**

   ```css
   /* ❌ 常见误区1：以为设置了 margin 就一定生效 */
   .misunderstanding-1 {
     margin-top: 100px;  /* 可能因为合并而变小 */
   }

   /* ✅ 调试方法1：使用 outline 查看实际盒模型 */
   * {
     outline: 1px solid red;  /* 不影响布局，方便查看边界 */
   }

   /* ✅ 调试方法2：Chrome DevTools 查看 Computed */
   /* 在 Elements 面板 → Computed → 查看 margin 的实际计算值 */

   /* ✅ 调试方法3：临时禁用合并来确认是否是合并导致的 */
   .debug-parent {
     display: flow-root;  /* 临时添加，看间距是否变大 */
   }
   ```

7. **水平方向的 Margin 不会合并**

   ```css
   /* 重要：只有垂直方向（top/bottom）的 margin 会合并 */
   /* 水平方向（left/right）的 margin 不会合并，而是直接相加 */
   .horizontal-demo {
     display: inline-block;
     margin-right: 20px;
   }
   .next-element {
     margin-left: 30px;
   }
   /* 水平间距 = 20px + 30px = 50px（不是取最大值！）*/
   ```

### 🔍 追问链
1. **margin 合并和BFC是什么关系？BFC还有哪些应用场景？**
   → 方向：BFC 可以阻止 margin 合并；BFC 还能解决浮动高度塌陷、阻止元素被浮动覆盖等；display:flow-root 是创建 BFC 的现代方案
2. **在大型项目中，如何系统地避免 margin 合并带来的布局意外？**
   → 方向：建立统一的间距系统（使用 utility classes）；使用 CSS reset 中对 body 设置 overflow: hidden；组件库中使用 padding 代替 margin；或者采用 BEM 命名规范明确层级关系
3. **Flex 和 Grid 布局中为什么没有 margin 合并？这是好事还是坏事？**
   → 方向：Flex/Grid 创建了新的 formatting context，子元素处于 flex/grid item 层级，不参与常规流的 margin 合并；这通常是有利的，因为更符合直觉

---

## Q29: CSS 变量（Custom Properties）的使用方式和优势
- **难度**：★★☆
- **知识点**：CSS变量 / Custom Properties / 主题切换
- **题型**：简答题

### 参考答案要点：

1. **CSS 变量的基本语法**

   CSS 变量（正式名称为 **Cascading Variables** 或 **Custom Properties**）是以 `--` 开头的自定义属性。

   ```css
   /* ===== 定义变量（通常在 :root 选择器中）===== */
   :root {
     /* 颜色变量 */
     --primary-color: #3498db;
     --secondary-color: #2ecc71;
     --text-color: #333333;
     --background-color: #ffffff;

     /* 间距变量 */
     --spacing-xs: 4px;
     --spacing-sm: 8px;
     --spacing-md: 16px;
     --spacing-lg: 24px;
     --spacing-xl: 32px;

     /* 字体变量 */
     --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
     --font-size-base: 16px;
     --line-height-base: 1.5;

     /* 阴影变量 */
     --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
     --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
     --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
   }

   /* ===== 使用变量（通过 var() 函数）===== */
   .button {
     background-color: var(--primary-color);
     color: var(--background-color);
     padding: var(--spacing-sm) var(--spacing-md);
     font-family: var(--font-family-base);
     font-size: var(--font-size-base);
     box-shadow: var(--shadow-md);
   }

   .card {
     background-color: var(--background-color);
     color: var(--text-color);
     padding: var(--spacing-lg);
     margin-bottom: var(--spacing-md);
     box-shadow: var(--shadow-lg);
   }
   ```

2. **CSS 变量的核心特性**

   ```css
   /* ===== 特性1：级联和继承 ===== */
   :root {
     --color: blue;
   }

   .parent {
     --color: red;  /* 在父元素上重新定义 */
   }

   .child {
     /* 继承父元素的 --color: red */
     color: var(--color);  /* red */
   }

   /* ===== 特性2：作用域 ===== */
   .component {
     --local-var: value;  /* 只在这个选择器及其后代中有效 */
   }

   .outside {
     /* 无法访问 --local-var */
     /* content: var(--local-var); 无效 */
   }

   /* ===== 特性3：默认值 ===== */
   .with-fallback {
     /* 如果 --undefined-var 未定义，使用默认值 purple */
     color: var(--undefined-var, purple);

     /* 支持多层回退 */
     font-size: var(--custom-size, var(--fallback-size, 16px));
   }

   /* ===== 特性4：JavaScript 动态操作 ===== */
   <script>
     // 读取变量值
     const root = document.documentElement;
     const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');
     console.log(primaryColor);  // " #3498db"

     // 修改变量值（实时更新所有使用该变量的元素！）
     root.style.setProperty('--primary-color', '#e74c3c');
     // 所有使用了 var(--primary-color) 的元素立即变为红色

     // 删除变量
     root.style.removeProperty('--primary-color');
   </script>
   ```

3. **CSS 变量相比预处理器变量的优势**

   ```scss
   /* ========== Sass/Less 变量（预处理器）========== */
   $primary-color: #3498db;  /* 编译时确定 */

   .button {
     background: $primary-color;  /* 编译后变成固定的 #3498db */
   }
   /* 问题：编译后无法动态修改 */

   /* ========== CSS 变量（运行时）========== */
   :root {
     --primary-color: #3498db;  /* 运行时可变 */
   }

   .button {
     background: var(--primary-color);  /* 运行时解析 */
   }
   /* 优势：可以通过 JS 随时修改，立即生效 */
   ```

   | 特性 | Sass/Less 变量 | CSS 变量 |
   |------|---------------|----------|
   **作用域** | 编译时确定 | 运行时动态 |
   **动态修改** | ❌ 不支持 | ✅ 支持（JS 修改）|
   **作用域** | 文件级别 | DOM 选择器级别（支持局部）|
   **继承** | 不支持 | ✅ 支持级联继承 |
   **媒体查询** | 需要 mixin | ✅ 原生支持 |
   **响应式** | 有限 | ✅ 完美支持 |
   **调试** | 需要查看编译后 CSS | DevTools 可直接查看和修改 |

4. **实战应用场景**

   ```css
   /* ===== 场景1：主题切换系统 ===== */
   :root {
     --bg-color: #ffffff;
     --text-color: #333333;
     --card-bg: #f5f5f5;
   }

   [data-theme="dark"] {
     --bg-color: #1a1a1a;
     --text-color: #e0e0e0;
     --card-bg: #2d2d2d;
   }

   /* JS 切换主题 */
   document.documentElement.setAttribute('data-theme', 'dark');

   /* ===== 场景2：响应式设计 ===== */
   :root {
     --container-width: 100%;
     --grid-columns: 1;
     --gap: 16px;
   }

   @media (min-width: 768px) {
     :root {
       --grid-columns: 2;
       --gap: 24px;
     }
   }

   @media (min-width: 1024px) {
     :root {
       --container-width: 1200px;
       --grid-columns: 3;
       --gap: 32px;
     }
   }

   .grid {
     display: grid;
     grid-template-columns: repeat(var(--grid-columns), 1fr);
     gap: var(--gap);
     max-width: var(--container-width);
   }

   /* ===== 场景3：组件库的设计令牌（Design Tokens）===== */
   .btn {
     /* 尺寸变体 */
     --btn-padding-x: var(--spacing-md);
     --btn-padding-y: var(--spacing-sm);
     --btn-font-size: var(--font-size-base);
     --btn-radius: 4px;

     padding: var(--btn-padding-y) var(--btn-padding-x);
     font-size: var(--btn-font-size);
     border-radius: var(--btn-radius);
   }

   .btn--lg {
     --btn-padding-x: var(--spacing-lg);
     --btn-padding-y: var(--spacing-md);
     --btn-font-size: 18px;
   }

   .btn--sm {
     --btn-padding-x: var(--spacing-sm);
     --btn-padding-y: var(--spacing-xs);
     --btn-font-size: 14px;
   }

   /* ===== 场景4：复杂的数学运算结合 calc() ===== */
   :root {
     --header-height: 64px;
     --sidebar-width: 250px;
   }

   .main-content {
     height: calc(100vh - var(--header-height));
     width: calc(100% - var(--sidebar-width));
     margin-left: var(--sidebar-width);
     padding: calc(var(--spacing-lg) * 2);
   }
   ```

5. **高级技巧和最佳实践**

   ```css
   /* ===== 技巧1：使用 @property 注册变量（增强功能）===== */
   @property --gradient-angle {
     syntax: '<angle>';
     initial-value: 0deg;
     inherits: false;
   }

   .animated-gradient {
     --gradient-angle: 0deg;
     background: conic-gradient(
       from var(--gradient-angle),
       red, yellow, lime, aqua, blue, magenta, red
     );
     animation: rotate-gradient 3s linear infinite;
   }

   @keyframes rotate-gradient {
     to { --gradient-angle: 360deg; }
   }

   /* ===== 技巧2：条件逻辑（通过 fallback）===== */
   .conditional-style {
     color: var(--is-dark, var(--light-color));
     /* 如果定义了 --is-dark，使用它；否则使用 --light-color */
   }

   /* ===== 技巧3：组织变量结构 ===== */
   :root {
     /* 按照功能分组 */
     /* --- 颜色系统 --- */
     --color-primary: #3498db;
     --color-primary-hover: #2980b9;

     /* --- 间距系统 --- */
     --space-1: 4px;
     --space-2: 8px;
     /* ... */

     /* --- 排版系统 --- */
     --font-sans: system-ui, sans-serif;
     --font-mono: 'Fira Code', monospace;
   }

   /* ===== 最佳实践清单 ===== */
   /*
    ✅ 1. 使用 :root 定义全局变量
    ✅ 2. 采用语义化命名（--color-primary 而非 --blue）
    ✅ 3. 为变量设置合理的默认值
    ✅ 4. 使用中划线分隔多个单词
    ✅ 5. 不要过度嵌套变量（保持可读性）
    ⚠️ 6. 注意变量名区分大小写（--Color 和 --color 是不同的）
    ❌ 7. 不要在变量名中使用 CSS 保留关键字
    */
   ```

6. **浏览器兼容性和降级方案**

   ```css
   /* 降级方案：为不支持 CSS 变量的浏览器提供回退 */
   .legacy-support {
     /* 回退值（旧浏览器）*/
     background-color: #3498db;

     /* 新浏览器使用变量 */
     background-color: var(--primary-color, #3498db);
   }

   /* 使用 @supports 特性查询 */
   @supports (--css: variables) {
     :root {
       --supported: true;
     }
   }
   /* 现代浏览器基本都已支持 CSS 变量（IE 除外）*/
   ```

### 🔍 追问链
1. **CSS 变量和 Sass 变量能否混用？在实际项目中如何选择？**
   → 方向：可以混用；Sass 用于编译时常量和复杂逻辑（循环/条件/mixin），CSS 变量用于运行时主题切换和动态配置；两者互补而非替代关系
2. **CSS 变量的性能如何？大量使用会影响页面性能吗？**
   → 方向：CSS 变量本身性能很好，浏览器的优化做得很好；但要注意避免过于复杂的 var() 嵌套链；@property 的动画变量会有轻微开销
3. **如何在 TypeScript 项目中对 CSS 变量进行类型安全的管理？**
   → 方向：可以使用 CSS Modules + 声明文件；或者使用工具如 typed-css-modules；或者在代码中维护一份 Design Tokens 的类型定义

---

## Q30: CSS Container Queries（容器查询）与 Media Query 的区别
- **难度**：★★☆
- **知识点**：Container Queries / 响应式设计 / 组件化
- **题型**：简答题

### 参考答案要点：

1. **Media Query 的局限性**

   传统响应式设计基于**视口大小**（viewport size）进行适配，这存在一个根本性问题：

   ```html
   <!-- 问题场景：同一个组件在不同上下文中需要不同表现 -->
   <style>
     /* 基于 viewport 的媒体查询 */
     @media (max-width: 768px) {
       .card {
         /* 小屏幕时卡片变成单列布局 */
         flex-direction: column;
       }
     }
   </style>

   <!-- 场景1：主内容区的大卡片（宽）-->
   <main style="width: 800px;">
     <article class="card">
       <!-- 这个卡片很宽，应该显示侧边信息 -->
     </article>
   </main>

   <!-- 场景2：侧边栏的小卡片（窄）-->
   <aside style="width: 300px;">
     <article class="card">
       <!-- 这个卡片很窄，应该简化布局 */
     </article>
   </aside>

   <!-- 问题：两个卡片看到的是同一个 viewport，无法差异化处理！-->
   ```

2. **Container Queries 的解决方案**

   Container Queries 允许组件根据**其父容器的尺寸**而非整个视口来响应式地调整样式。

   ```css
   /* ===== Container Queries 基础语法 ===== */

   /* 步骤1：定义容器（container-type）*/
   .card-container {
     container-type: inline-size;  /* 声明这是一个查询容器 */
     /* 或者 */
     container-type: size;  /* 同时启用 inline 和 block 方向的查询 */
     /* 可选：给容器命名 */
     container-name: card-layout;
   }

   /* 步骤2：编写容器查询规则 */
   @container (min-width: 400px) {
     /* 当容器宽度 >= 400px 时应用的样式 */
     .card {
       display: grid;
       grid-template-columns: 200px 1fr;
       gap: 20px;
     }
   }

   @container (max-width: 399px) {
     /* 当容器宽度 < 400px 时应用的样式 */
     .card {
       display: flex;
       flex-direction: column;
     }
   }

   /* 使用命名的容器 */
   @container card-layout (min-width: 500px) {
     .card-title {
       font-size: 24px;
     }
   }
   ```

3. **完整示例：响应式卡片组件**

   ```html
   <style>
     /* 定义容器 */
     .post-card-wrapper {
       container-type: inline-size;
       container-name: post;
     }

     /* 卡片基础样式 */
     .post-card {
       background: white;
       border-radius: 12px;
       padding: 20px;
       box-shadow: 0 2px 8px rgba(0,0,0,0.1);
     }

     .post-card__image {
       width: 100%;
       aspect-ratio: 16/9;
       object-fit: cover;
       border-radius: 8px;
     }

     .post-card__content {
       margin-top: 16px;
     }

     .post-card__title {
       font-size: 18px;
       font-weight: bold;
       margin-bottom: 8px;
     }

     .post-card__meta {
       font-size: 14px;
       color: #666;
     }

     /* 容器窄时（< 400px）：单列垂直布局 */
     @container post (max-width: 399px) {
       .post-card__title {
         font-size: 16px;
       }
       .post-card__meta {
         display: none;  /* 隐藏元数据以节省空间 */
       }
     }

     /* 容器中等（400px - 600px）：图片+内容横向排列 */
     @container post (min-width: 400px) and (max-width: 600px) {
       .post-card {
         display: grid;
         grid-template-columns: 150px 1fr;
         gap: 16px;
         align-items: start;
       }
       .post-card__image {
         aspect-ratio: 1/1;
       }
     }

     /* 容器宽时（> 600px）：完整布局 */
     @container post (min-width: 600px) {
       .post-card {
         display: grid;
         grid-template-columns: 250px 1fr;
         gap: 24px;
       }
       .post-card__title {
         font-size: 22px;
       }
       .post-card__meta {
         display: flex;
         gap: 16px;
       }
     }
   </style>

   <!-- 同一个组件在不同宽度的容器中自适应 -->
   <div class="post-card-wrapper" style="width: 350px;">
     <article class="post-card">
       <!-- 自动应用窄屏样式 -->
     </article>
   </div>

   <div class="post-card-wrapper" style="width: 800px;">
     <article class="post-card">
       <!-- 自动应用宽屏样式 -->
     </article>
   </div>
   ```

4. **Container Queries vs Media Query 对比**

   | 特性 | **Media Query** | **Container Query** |
   |------|----------------|---------------------|
   **查询依据** | 视口（Viewport）尺寸 | 父容器（Container）尺寸 |
   **粒度** | 页面级别 | 组件级别 |
   **组件复用性** | 差（依赖上下文）| 好（真正组件化）|
   **嵌套能力** | 不支持 | ✅ 支持嵌套容器 |
   **适用场景** | 全局布局（导航栏、页脚）| 可复用组件（卡片、表格、表单）|
   **兼容性** | ✅ 极好（所有浏览器）| ✅ 现代浏览器已支持（2023+）|
   **查询维度** | width/height/orientation/resolution | inline-size/block-size/style() |

5. **高级特性**

   ```css
   /* ===== 1. container-style 查询（查询自定义属性）===== */
   .themed-component {
     container-type: inline-size;
     container-name: theme;
   }

   /* 根据容器上的 CSS 变量值来应用样式 */
   @container theme style(--variant: compact) {
     .component {
       padding: 8px;
       font-size: 14px;
     }
   }

   @container theme style(--variant: spacious) {
     .component {
       padding: 24px;
       font-size: 18px;
     }
   }

   /* HTML 中通过变量控制 */
   <div class="themed-component" style="--variant: compact;">
     <div class="component">紧凑模式</div>
   </div>

   /* ===== 2. 容器查询长度单位（cqw/cqh）===== */
   .responsive-text {
     /* cqw = container query width（容器宽度的 1%）*/
     /* cqh = container query height（容器高度的 1%）*/
     font-size: clamp(14px, 2cqw + 10px, 24px);
     padding: 1cqw;
   }

   /* ===== 3. 结合 CSS Grid 的 auto-fit/auto-fill ===== */
   .grid-container {
     container-type: inline-size;
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
     gap: 20px;
   }

   @container (min-width: 1200px) {
     .grid-container {
       grid-template-columns: repeat(4, 1fr);
     }
   }
   ```

6. **实际应用策略**

   ```css
   /* ===== 推荐的组合策略 ===== */

   /* 1. Media Query 处理全局布局 */
   @media (min-width: 1024px) {
     .app-layout {
       display: grid;
       grid-template-columns: 250px 1fr;
     }
   }

   /* 2. Container Query 处理组件内部细节 */
   .widget {
     container-type: inline-size;
   }

   @container (min-width: 300px) {
     .widget__content {
       display: grid;
       grid-template-columns: 1fr 1fr;
     }
   }

   /* 3. 两者协同工作 */
   /*
    * Media Query 决定整体页面结构（几列布局、侧栏显示等）
    * Container Query 决定每个组件内部的呈现方式
    * 这样实现了真正的组件级响应式
    */
   ```

7. **兼容性处理**

   ```css
   /* 优雅降级：在不支持的浏览器中回退到普通样式 */
   .component {
     /* 默认样式（Mobile First）*/
     display: flex;
     flex-direction: column;
   }

   /* Progressive Enhancement：支持的浏览器获得更好的体验 */
   @supports (container-type: inline-size) {
     .wrapper {
       container-type: inline-size;
     }

     @container (min-width: 400px) {
       .component {
         flex-direction: row;
       }
     }
   }

   /* 或者使用 PostCSS 插件（postcss-container-query）进行转译 */
   ```

### 🔍 追问链
1. **Container Queries 的性能如何？会不会导致过多的重排？**
   → 方向：浏览器对 Container Queries 有很好的优化；容器尺寸变化时会触发查询评估；但比 JS 监听 resize 高效得多；建议只在需要的组件上使用
2. **Container Queries 能否完全取代 Media Query？什么时候还应该用 Media Query？**
   → 方向：不能完全取代；Media Query 适合全局布局（导航栏、页脚、网格系统）、设备特性（orientation、resolution）、打印样式等；Container Queries 适合可复用的 UI 组件
3. **如何设计一套基于 Container Queries 的组件库？有什么架构建议？**
   → 方向：每个组件内部封装自己的容器查询逻辑；提供 container-type 和 container-name 作为 props；文档化每个组件的断点阈值；使用 Design Tokens 统一断点标准

---

## Q31: aspect-ratio 属性的使用场景
- **难度**：★★☆
- **知识点**：aspect-ratio / 响应式设计 / 图片视频
- **题型**：简答题

### 参考答案要点：

1. **aspect-ratio 属性简介**

   `aspect-ratio` 用于设置元素的**宽高比**，在响应式设计中非常有用，特别是在处理图片、视频、卡片等需要保持固定比例的场景。

   ```css
   /* 基本语法 */
   .element {
     aspect-ratio: 16 / 9;   /* 宽:高 = 16:9 */
     aspect-ratio: 1 / 1;    /* 正方形 */
     aspect-ratio: 3 / 4;    /* 竖向 3:4 */
     aspect-ratio: auto;     /* 默认，由内容决定 */
   }
   ```

2. **传统方案的痛点**

   ```css
   /* ===== 方案1：padding-top hack（老方案）===== */
   .old-method {
     width: 100%;
     position: relative;
     padding-top: 56.25%;  /* 9/16 = 0.5625 = 56.25% */
     height: 0;
     overflow: hidden;
   }

   .old-method .content {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
   }
   /*
    * 问题：
    * 1. 计算麻烦（需要手动算百分比）
    * 2. 语义不清（padding-top 为什么是 56.25%？）
    * 3. 需要额外的定位代码
    * 4. 内容溢出时难以处理
    */

   /* ===== 方案2：固定宽高（不灵活）===== */
   .fixed-size {
     width: 320px;
     height: 180px;  /* 固定尺寸，无法响应式 */
   }
   ```

3. **aspect-ratio 的使用场景**

   ```html
   <style>
     /* ===== 场景1：图片/视频容器（最常用）===== */
     .media-container {
       width: 100%;
       aspect-ratio: 16 / 9;
       object-fit: cover;
       border-radius: 8px;
     }

     /* ===== 场景2：头像（正方形/圆形）===== */
     .avatar {
       width: 80px;
       aspect-ratio: 1 / 1;
       border-radius: 50%;  /* 圆形头像 */
       object-fit: cover;
     }

     /* ===== 场景3：卡片封面图 ===== */
     .card-cover {
       width: 100%;
       aspect-ratio: 4 / 3;  /* 4:3 的封面图 */
       object-fit: cover;
     }

     /* ===== 场景4：社交媒体帖子（Instagram 风格）===== */
     .instagram-post {
       aspect-ratio: 1 / 1;  /* 正方形 */
     }

     /* ===== 场景5：placeholder / skeleton screen ===== */
     .skeleton {
       aspect-ratio: 16 / 9;
       background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
       background-size: 200% 100%;
       animation: loading 1.5s infinite;
     }

     @keyframes loading {
       0% { background-position: 200% 0; }
       100% { background-position: -200% 0; }
     }

     /* ===== 场景6：响应式网格中的统一比例 ===== */
     .gallery-grid {
       display: grid;
       grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
       gap: 16px;
     }

     .gallery-item img {
       width: 100%;
       aspect-ratio: 1 / 1;
       object-fit: cover;
     }
   </style>

   <!-- 使用示例 -->
   <img src="photo.jpg" class="media-container" alt="响应式图片">

   <div class="gallery-grid">
     <img src="1.jpg" class="gallery-item-img" alt="">
     <img src="2.jpg" class="gallery-item-img" alt="">
     <img src="3.jpg" class="gallery-item-img" alt="">
   </div>
   ```

4. **aspect-ratio 与其他属性的配合**

   ```css
   /* ===== 配合 object-fit 处理内容适配 ===== */
   .video-player {
     width: 100%;
     aspect-ratio: 16 / 9;
     background: #000;
   }

   .video-player video {
     width: 100%;
     height: 100%;
     object-fit: contain;  /* 保持比例，完整显示 */
     /* 或者 */
     object-fit: cover;    /* 保持比例，填满容器（可能裁剪）*/
   }

   /* ===== 配合 Grid/Flex 实现复杂布局 ===== */
   .masonry-grid {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
     gap: 20px;
   }

   .masonry-item {
     /* 不同项目可以有不同比例 */
     &--landscape { aspect-ratio: 16 / 9; }
     &--portrait  { aspect-ratio: 3 / 4; }
     &--square    { aspect-ratio: 1 / 1; }
     &--wide      { aspect-ratio: 21 / 9; }
   }

   /* ===== 配合 clamp() 实现流体比例（高级）===== */
   .fluid-aspect {
     width: 100%;
     /* 在小屏幕接近 1:1，大屏幕接近 21:9 */
     aspect-ratio: clamp(1 / 1, 2.33 / 1, 21 / 9);
   }
   ```

5. **常见比例速查表**

   ```css
   /* 常用宽高比参考 */
   :root {
     /* 标准比例 */
     --ratio-square: 1 / 1;        /* 正方形 */
     --ratio-landscape-43: 4 / 3;  /* 传统显示器 */
     --ratio-landscape-169: 16 / 9; /* 高清视频 */
     --ratio-landscape-219: 21 / 9; /* 超宽屏 */

     /* 竖向比例 */
     --ratio-portrait-34: 3 / 4;
     --ratio-portrait-916: 9 / 16;

     /* 特殊比例 */
     --ratio-golden: 1.618 / 1;    /* 黄金比例 */
     --ratio-sqrt2: 1 / 1.414;     /* A系列纸张 */
   }

   /* 应用 */
   .poster { aspect-ratio: var(--ratio-portrait-23); }  /* 电影海报 */
   .presentation-slide { aspect-ratio: var(--ratio-landscape-169); }  /* PPT */
   .photo-print { aspect-ratio: var(--ratio-landscape-43); }  /* 照片冲印 */
   ```

6. **注意事项和边界情况**

   ```css
   /* ===== 注意1：同时设置 width/height 和 aspect-ratio ===== */
   .conflict {
     width: 200px;
     height: 100px;          /* 2:1 的比例 */
     aspect-ratio: 16 / 9;   /* 期望 16:9 */
     /* 结果：aspect-ratio 会被忽略，以 width/height 为准 */
   }

   /* 解决：只设置其中一个维度 */
   .correct {
     width: 100%;
     aspect-ratio: 16 / 9;   /* 高度自动计算 */
     /* 或者 */
     height: 200px;
     aspect-ratio: 16 / 9;   /* 宽度自动计算 */
   }

   /* ===== 注意2：最小/最大尺寸约束 ===== */
   .constrained {
     width: 100%;
     min-width: 200px;
     max-width: 800px;
     aspect-ratio: 16 / 9;
     /* aspect-ratio 会尊重 min/max 约束 */
   }

   /* ===== 注意3：替换元素的特殊行为 ===== */
   img, video {
     /* 对于 img/video，如果同时设置了 width/height 属性，
        aspect-ratio 会作为首选比例，但可以被 src 的固有尺寸覆盖 */
     aspect-ratio: 16 / 9;
   }

   /* ===== 注意4：auto 关键字 ===== */
   .auto-aspect {
     aspect-ratio: auto;  /* 使用内容的固有比例 */
     /* 对于 img/video，就是图片/视频的原始比例 */
   }
   ```

### 🔍 追问链
1. **aspect-ratio 和 padding-top hack 方案在浏览器兼容性方面有何差异？**
   → 方向：padding-top hack 兼容性更好（IE9+）；aspect-ratio 需要较新浏览器（2021+）；但可以通过 PostCSS 插件自动转换
2. **在使用 aspect-ratio 时，如果内容超出容器会发生什么？如何处理？**
   → 方向：内容会正常显示但可能溢出；配合 overflow: hidden 或 object-fit 控制；对于文本内容可以考虑配合 flex/grid 的 align-items 来定位
3. **aspect-ratio 如何与响应式图片（srcset/sizes）配合使用？**
   → 方向：aspect-ratio 控制容器比例，srcset/sizes 控制加载哪个分辨率的图片；两者各司其职；sizes 属性可以根据容器宽度描述图片的预期展示尺寸

---

## Q32: CSS clamp() 函数的使用
- **难度**：★★☆
- **知识点**：clamp() / 流式排版 / 响应式设计
- **题型**：简答题

### 参考答案要点：

1. **clamp() 函数简介**

   `clamp()` 是一个 CSS 数学函数，用于将值**限制在一个范围内**，接受三个参数：**最小值、首选值、最大值**。它是实现流式（Fluid）响应式设计的利器。

   ```css
   /* 基本语法 */
   .element {
     /* clamp(MIN, PREFERRED, MAX) */
     font-size: clamp(14px, 2vw + 10px, 24px);
     /*
      * 含义：
      * - 最小值：14px（不会小于这个）
      * - 首选值：2vw + 10px（理想情况下使用这个，随视口变化）
      * - 最大值：24px（不会大于这个）
      */
   }
   ```

2. **工作原理详解**

   ```
   clamp() 的计算逻辑：

   if (PREFERRED < MIN) {
     return MIN;  /* 首选值太小，使用最小值 */
   } else if (PREFERRED > MAX) {
     return MAX;  /* 首选值太大，使用最大值 */
   } else {
     return PREFERRED;  /* 首选值在范围内，使用首选值 */
   }

   图解：
   MIN ──────────── PREFERRED ──────────── MAX
   ↑                  ↑                   ↑
   下限              理想值              上限

   实际输出值始终在 [MIN, MAX] 区间内滑动
   ```

3. **典型应用场景**

   ```css
   /* ===== 场景1：流式字体（Fluid Typography）—— 最经典用法 ===== */
   :root {
     /* 定义排版系统 */
     --fluid-min: 320px;   /* 最小视口宽度 */
     --fluid-max: 1280px;  /* 最大视口宽度 */
   }

   html {
     /* 主标题：在小屏幕 32px，在大屏幕 72px，中间平滑过渡 */
     --fs-display: clamp(2rem, 5vw + 1rem, 4.5rem);

     /* H1 标题 */
     --fs-h1: clamp(1.8rem, 4vw + 0.8rem, 3rem);

     /* H2 标题 */
     --fs-h2: clamp(1.5rem, 3vw + 0.5rem, 2.25rem);

     /* H3 标题 */
     --fs-h3: clamp(1.25rem, 2vw + 0.5rem, 1.75rem);

     /* 正文 */
     --fs-body: clamp(1rem, 1vw + 0.8rem, 1.125rem);

     /* 小字 */
     --fs-small: clamp(0.875rem, 0.8vw + 0.75rem, 1rem);
   }

   h1 { font-size: var(--fs-h1); }
   h2 { font-size: var(--fs-h2); }
   h3 { font-size: var(--fs-h3); }
   body { font-size: var(--fs-body); }
   small, .text-small { font-size: var(--fs-small); }

   /* ===== 场景2：流式间距 ===== */
   .section {
     /* 内边距：最小 1rem，最大 4rem，中间随视口变化 */
     padding: clamp(1rem, 5vw, 4rem);

     /* 外边距 */
     margin-bottom: clamp(2rem, 8vw, 6rem);
   }

   .container {
     /* 最大宽度：最小 90%，最大 1200px，中间流式变化 */
     width: clamp(90%, 80vw, 1200px);
     margin: 0 auto;
   }

   /* ===== 场景3：流式圆角和阴影 ===== */
   .card {
     /* 圆角：小屏幕 8px，大屏幕 24px */
     border-radius: clamp(8px, 2vw, 24px);

     /* 阴影扩散半径 */
     box-shadow: 0 4px clamp(8px, 2vw, 24px) rgba(0, 0, 0, 0.1);
   }

   /* ===== 场景4：流式网格 ===== */
   .grid {
     display: grid;
     /* 列间距：最小 12px，最大 48px */
     gap: clamp(12px, 3vw, 48px);
     grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
   }

   /* ===== 场景5：流式图标和装饰元素 ===== */
   .icon {
     /* 图标尺寸：最小 16px，最大 64px */
     width: clamp(16px, 4vw, 64px);
     height: clamp(16px, 4vw, 64px);
   }

   .divider {
     height: clamp(1px, 0.2vw, 3px);
     background: currentColor;
   }
   ```

4. **clamp() vs media-queries 对比**

   ```css
   /* ===== 传统 Media Queries 方案（阶梯式变化）===== */
   .traditional {
     font-size: 16px;  /* 默认 */
   }

   @media (min-width: 480px) {
     .traditional { font-size: 18px; }
   }

   @media (min-width: 768px) {
     .traditional { font-size: 20px; }
   }

   @media (min-width: 1024px) {
     .traditional { font-size: 22px; }
   }

   @media (min-width: 1280px) {
     .traditional { font-size: 24px; }
   }
   /*
    * 问题：
    * 1. 阶梯式跳跃，不平滑
    * 2. 需要写很多断点
    * 3. 维护成本高
    */

   /* ===== clamp() 方案（平滑连续变化）===== */
   .modern {
     font-size: clamp(16px, 2vw + 14px, 24px);
   }
   /*
    * 优势：
    * 1. 平滑过渡，任意视口都有合适的值
    * 2. 一行代码搞定
    * 3. 更符合"流式设计"理念
    */
   ```

5. **高级技巧和最佳实践**

   ```css
   /* ===== 技巧1：使用 CSS 变量封装 clamp() 参数 ===== */
   :root {
     /* 排版缩放配置 */
     --type-scale: 1.2;  /* 排版缩放因子 */

     /* 斜率控制（控制变化的快慢）*/
     --slope-xs: 0.5vw;
     --slope-sm: 1vw;
     --slope-md: 2vw;
     --slope-lg: 3vw;
     --slope-xl: 5vw;
   }

   /* ===== 技巧2：构建完整的流式设计系统 ===== */
   :root {
     /* 间距系统 */
     --space-xs: clamp(0.25rem, 0.5vw, 0.5rem);
     --space-sm: clamp(0.5rem, 1vw, 1rem);
     --space-md: clamp(1rem, 2vw, 2rem);
     --space-lg: clamp(2rem, 4vw, 4rem);
     --space-xl: clamp(4rem, 8vw, 8rem);

     /* 字体系统 */
     --text-xs: clamp(0.75rem, 0.5vw + 0.65rem, 0.875rem);
     --text-sm: clamp(0.875rem, 0.6vw + 0.75rem, 1rem);
     --text-base: clamp(1rem, 0.8vw + 0.85rem, 1.125rem);
     --text-lg: clamp(1.125rem, 1.2vw + 0.9rem, 1.5rem);
     --text-xl: clamp(1.25rem, 1.8vw + 0.95rem, 1.875rem);
     --text-2xl: clamp(1.5rem, 2.5vw + 1rem, 2.25rem);
     --text-3xl: clamp(1.875rem, 3.5vw + 1.1rem, 3rem);
     --text-4xl: clamp(2.25rem, 5vw + 1.2rem, 3.75rem);
   }

   /* ===== 技巧3：配合 min()/max() 使用 ===== */
   .advanced {
     /* min() 取最小值 */
     width: min(100%, 500px);

     /* max() 取最大值 */
     width: max(50%, 300px);

     /* clamp() = min(max(PREFERRED, MIN), MAX) */
     /* 等价于：*/
     width: max(min(80vw, 1200px), 320px);
   }

   /* ===== 技巧4：响应式的行高 ===== */
   .prose {
     font-size: var(--text-base);
     /* 行高也跟随字体大小变化，但保持在合理范围 */
     line-height: clamp(1.4, 1.5vw + 1.2, 1.8);
   }

   /* ===== 技巧5：动画和过渡中的 clamp() ===== */
   .smooth-resize {
     transition: font-size 0.3s ease;
     font-size: clamp(1rem, 2.5vw + 0.5rem, 2rem);
   }
   /* 注意：resize 事件触发的变化不会有平滑过渡，
      只有状态切换（如 hover）才会有 */
   ```

6. **注意事项和常见错误**

   ```css
   /* ===== 错误1：MIN > MAX（无效）===== */
   .error-1 {
     /* 这是不合法的！MIN 不能大于 MAX */
     font-size: clamp(24px, 16px, 14px);  /* ❌ */
   }

   /* ===== 错误2：混合不兼容的单位 ===== */
   .error-2 {
     /* 三个参数应该是可比较的长度/百分比/计算值 */
     width: clamp(100px, 50%, 50em);  /* ⚠️ 虽然合法，但不推荐 */
     /* 推荐：统一使用相同类型的单位 */
     width: clamp(320px, 80vw, 1200px);  /* ✅ */
   }

   /* ===== 注意3：在 calc() 中使用 ===== */
   .in-calc {
     /* clamp() 可以嵌套在 calc() 中 */
     width: calc(clamp(200px, 50%, 400px) - 20px);

     /* calc() 也可以在 clamp() 的参数中使用 */
     font-size: clamp(14px, calc(1vw + 10px), 24px);
   }

   /* ===== 性能考虑 ===== */
   /*
    * clamp() 本身性能很好，浏览器原生支持
    * 但要注意：
    * 1. 不要过度嵌套（影响可读性）
    * 2. 在动画相关的属性上谨慎使用（可能导致频繁重绘）
    * 3. 大量使用时建议提取为 CSS 变量，便于统一管理
    */
   ```

### 🔍 追问链
1. **如何计算 clamp() 的首选值（PREFERRED）以确保在特定视口范围内达到理想的字体大小？**
   → 方向：使用公式：PREFERRED = MIN + (MAX - MIN) × (viewport - min_viewport) / (max_viewport - min_viewport)；或者使用在线工具如 Utopia.fyi 自动生成
2. **clamp() 和 container query units（cqw）能否结合使用？有什么优势？**
   → 方向：可以结合；clamp() 使用 vw 基于视口，cqw 基于容器；结合使用可以实现既响应视口又响应容器的双重适应；适合复杂组件场景
3. **在打印样式中，clamp() 应该如何处理？**
   → 方向：打印时 vw/vh 通常为 0 或固定值；应该在 print media query 中为使用 clamp() 的属性提供固定值；或者确保 MIN 值适合打印输出

---

## Q33: object-fit 属性的作用
- **难度**：★★☆
- **知识点**：object-fit / 图片处理 / 替换元素
- **题型**：简答题

### 参考答案要点：

1. **object-fit 的作用和背景**

   `object-fit` 属性用于控制**替换元素**（replaced elements）的内容如何适应其容器。替换元素包括 `<img>`、`<video>`、`<iframe>`、`<embed>` 等。

   **核心问题**：当图片/视频的原始尺寸与容器的尺寸不一致时，应该如何显示？

   ```css
   /* 基本语法 */
   img, video {
     object-fit: fill | contain | cover | none | scale-down;
   }
   ```

2. **五种值的详细对比**

   ```html
   <style>
     .demo-container {
       width: 300px;
       height: 200px;
       border: 2px solid #333;
       margin: 10px;
       display: inline-block;
     }

     .demo-container img {
       width: 100%;
       height: 100%;
       /* 测试不同的 object-fit 值 */
     }
   </style>

   <!-- 假设原图是 800x600（横向）-->

   <!-- ===== fill（默认值）===== -->
   <div class="demo-container">
     <img src="photo.jpg" style="object-fit: fill;">
   </div>
   <!--
    * 效果：拉伸填满整个容器
    * 特点：完全填充，但可能变形（失真）
    * 适用：几乎不用（除非故意要变形）
    *
    * ┌─────────────────┐
    * │  ╔═══════════╗  │
    * │  ║  STRETCHED ║  │
    * │  ╚═══════════╝  │
    * └─────────────────┘
    -->

   <!-- ===== contain ===== -->
   <div class="demo-container">
     <img src="photo.jpg" style="object-fit: contain;">
   </div>
   <!--
    * 效果：保持比例，完整显示在容器内
    * 特点：不裁剪，不变形，但可能有留白
    * 适用：需要完整显示内容的场景（产品图、截图）
    *
    * ┌─────────────────┐
    * │                 │
    * │   ┌───────────┐  │
    * │   │  ORIGINAL  │  │
    * │   └───────────┘  │
    * │                 │
    * └─────────────────┘
    -->

   <!-- ===== cover（最常用）===== -->
   <div class="demo-container">
     <img src="photo.jpg" style="object-fit: cover;">
   </div>
   <!--
    * 效果：保持比例，填满容器（可能裁剪）
    * 特点：无留白，不变形，但可能丢失边缘内容
    * 适用：背景图、头像、封面、轮播图
    *
    * ┌─────────────────┐
    * │╔═══════════════╗│
    * │║  CROPPED       ║│
    * │║  BUT FILLED    ║│
    * │╚═══════════════╝│
    * └─────────────────┘
    -->

   <!-- ===== none ===== -->
   <div class="demo-container">
     <img src="photo.jpg" style="object-fit: none;">
   </div>
   <!--
    * 效果：保持原始尺寸，不缩放
    * 特点：可能超出容器或显示不完全
    * 适用：特殊艺术效果、像素画
    *
    * ┌─────────────────┐
    * │┌───────────┐    │
    * ││ ORIGINAL  │    │
    * │└───────────┘    │
    * │                 │
    * └─────────────────┘
    -->

   <!-- ===== scale-down ===== -->
   <div class="demo-container">
     <img src="photo.jpg" style="object-fit: scale-down;">
   </div>
   <!--
    * 效果：none 和 contain 的较小者
    * 特点：图片比容器大时像 contain，小时像 none
    * 适用：不确定图片大小时的保守方案
    *
    * （具体表现取决于图片和容器的相对大小）
    -->
   ```

3. **object-position 配合使用**

   ```css
   /* object-position 控制内容在容器中的位置 */
   .cover-image {
     width: 300px;
     height: 200px;
     object-fit: cover;
     /* 默认值是 50% 50%（居中）*/
   }

   /* 定位到不同位置 */
   .position-center {
     object-position: center center;  /* 默认，居中 */
   }

   .position-top {
     object-position: center top;  /* 顶部对齐（显示图片上半部分）*/
   }

   .position-bottom {
     object-position: center bottom;  /* 底部对齐 */
   }

   .position-left {
     object-position: left center;  /* 左对齐 */
   }

   .position-custom {
     object-position: 25% 75%;  /* 自定义位置（从左上角偏移）*/
   }

   /* 实际应用：人物照片通常希望脸部居中 */
   .portrait-photo {
     object-fit: cover;
     object-position: center top;  /* 从顶部开始，显示人脸 */
   }

   /* 风景照片可能希望显示中心 */
   .landscape-photo {
     object-fit: cover;
     object-position: center center;
   }
   ```

4. **实际应用场景示例**

   ```html
   <style>
     /* ===== 场景1：用户头像 ===== */
     .avatar {
       width: 80px;
       height: 80px;
       border-radius: 50%;
       object-fit: cover;
       object-position: center center;
     }

     /* ===== 场景2：卡片封面图 ===== */
     .card-thumbnail {
       width: 100%;
       aspect-ratio: 16 / 9;
       object-fit: cover;
       object-position: center;
       transition: transform 0.3s ease;
     }

     .card:hover .card-thumbnail {
       transform: scale(1.05);  /* hover 放大效果 */
     }

     /* ===== 场景3：视频播放器 ===== */
     .video-container {
       width: 100%;
       aspect-ratio: 16 / 9;
       background: #000;
     }

     .video-container video {
       width: 100%;
       height: 100%;
       object-fit: contain;  /* 视频通常要保持完整显示 */
     }

     /* ===== 场景4：图片画廊/灯箱 ===== */
     .gallery-item {
       width: 200px;
       height: 200px;
       overflow: hidden;
       cursor: pointer;
     }

     .gallery-item img {
       width: 100%;
       height: 100%;
       object-fit: cover;
       object-position: center;
       transition: object-position 0.3s;
     }

     .gallery-item:hover img {
       /* hover 时微调位置，创造动感 */
       object-position: 50% 45%;
     }

     /* ===== 场景5：响应式图片（配合 picture/srcset）===== */
     .hero-image {
       width: 100%;
       height: 50vh;
       min-height: 300px;
       max-height: 600px;
       object-fit: cover;
       object-position: center 20%;  /* 稍微偏上，视觉效果好 */
     }

     /* ===== 场景6：产品展示图（需要完整显示）===== */
     .product-image {
       width: 100%;
       aspect-ratio: 1 / 1;
       object-fit: contain;  /* 产品图不能裁剪 */
       background: #f5f5f5;  /* 留白处显示背景色 */
     }
   </style>
   ```

5. **兼容性和降级方案**

   ```css
   /* ===== 降级方案：针对不支持 object-fit 的浏览器（主要是 IE）===== */
   .fallback-for-ie {
     /* 方案1：使用背景图代替 */
     background-image: url(image.jpg);
     background-size: cover;  /* background-size 有更好的兼容性 */
     background-position: center;
     background-repeat: no-repeat;
     /* img 标签隐藏 */
   }

   .fallback-for-ie img {
     display: none;  /* IE 中隐藏 img，使用背景图 */
   }

   /* 现代浏览器使用 object-fit */
   @supports (object-fit: cover) {
   .fallback-for-ie {
     background-image: none;
   }
   .fallback-for-ie img {
     display: block;
     object-fit: cover;
     width: 100%;
     height: 100%;
   }
   }

   /* 或者使用 Modernizr/PostCSS 进行 polyfill */
   ```

6. **object-fit 相关属性**

   ```css
   /* ===== object-position（已介绍）===== */
   img {
     object-position: center center;
   }

   /* ===== 其他相关属性（了解）===== */
   /* 这些属性目前浏览器支持有限 */

   video {
     /* 控制视频边框如何绘制 */
     object-fit: contain;
   }
   ```

7. **最佳实践清单**

   ```
   ✓ object-fit 使用 Checklist：

   □ 总是为 img/video 设置明确的 width 和 height
   □ 根据内容性质选择合适的 fit 值：
     - 背景图/头像/封面 → cover
     - 产品图/截图 → contain
     - 一般情况避免 fill（会变形）
   □ 使用 object-position 控制裁剪焦点
   □ 配合 aspect-ratio 使用，实现完美的响应式容器
   □ 为不支持的情况准备降级方案
   □ 注意图片加载失败时的占位样式
   ```

### 🔍 追问链
1. **object-fit: cover 裁剪了部分内容，如何确保重要的视觉信息不被裁剪掉？**
   → 方向：使用 object-position 将焦点定位到重要区域；让设计师/UI标注出 focal point；使用 AI 服务自动识别图片主体位置；或者使用 art direction（picture + source）为不同尺寸提供不同的裁剪版本
2. **object-fit 和 background-size: cover 的区别是什么？何时使用哪个？**
   → 方向：功能类似但适用对象不同；object-fit 用于替换元素（img/video）；background-size 用于背景图；语义上 img 应该用 img 标签（SEO、可访问性），装饰性图片用背景图；object-fit 可以配合 object-position 更灵活
3. **在高 DPI（Retina）屏幕下，object-fit 的表现是否有需要注意的地方？**
   → 方向：object-fit 本身不受 DPI 影响；但要配合 srcset 提供 2x/3x 图片；否则即使显示正确，图片也会模糊；建议使用 imagesizes 属性帮助浏览器选择合适分辨率

---

## Q34: 如何实现暗黑模式（Dark Mode）
- **难度**：★★☆
- **知识点**：暗黑模式 / 主题切换 / prefers-color-scheme
- **题型**：简答题

### 参考答案要点：

1. **暗黑模式的实现方式概览**

   实现暗黑模式有多种方式，从简单到复杂依次为：

   ```
   方案1：prefers-color-scheme 媒体查询（自动跟随系统）
   方案2：data-* 属性 + CSS 变量（手动切换，推荐）
   方案3：class 切换（传统方案）
   方案4：CSS 自定义属性 + JS 持久化（完整方案）
   ```

2. **方案1：prefers-color-scheme（自动跟随系统）**

   ```css
   /* ===== 基础样式（亮色主题）===== */
   :root {
     --bg-primary: #ffffff;
     --bg-secondary: #f5f5f5;
     --text-primary: #1a1a1a;
     --text-secondary: #666666;
     --border-color: #e0e0e0;
     --shadow-color: rgba(0, 0, 0, 0.1);
   }

   body {
     background-color: var(--bg-primary);
     color: var(--text-primary);
   }

   /* ===== 暗黑模式（跟随系统偏好）===== */
   @media (prefers-color-scheme: dark) {
     :root {
       --bg-primary: #1a1a1a;
       --bg-secondary: #2d2d2d;
       --text-primary: #e0e0e0;
       --text-secondary: #a0a0a0;
       --border-color: #404040;
       --shadow-color: rgba(0, 0, 0, 0.4);
     }

     /* 暗黑模式下可能需要调整的其他样式 */
     img {
       opacity: 0.85;  /* 降低图片亮度，减少刺眼 */
     }

     a {
       color: #60a5fa;  /* 链接颜色需要更亮 */
     }
   }

   /* 优点：简单，无需 JS，自动跟随系统
      缺点：用户无法手动切换 */
   ```

3. **方案2：data-theme 属性 + CSS 变量（推荐方案）**

   ```css
   /* ===== 定义主题变量 ===== */
   :root,
   [data-theme="light"] {
     /* === 亮色主题 === */
     --color-bg: #ffffff;
     --color-bg-secondary: #f8f9fa;
     --color-bg-tertiary: #e9ecef;
     --color-text: #212529;
     --color-text-secondary: #495057;
     --color-text-muted: #868e96;
     --color-border: #dee2e6;
     --color-primary: #0d6efd;
     --color-primary-hover: #0b5ed7;
     --color-shadow: rgba(0, 0, 0, 0.1);
     --color-overlay: rgba(255, 255, 255, 0.8);
   }

   [data-theme="dark"] {
     /* === 暗色主题 === */
     --color-bg: #121212;
     --color-bg-secondary: #1e1e1e;
     --color-bg-tertiary: #2c2c2c;
     --color-text: #e4e4e7;
     --color-text-secondary: #a1a1aa;
     --color-text-muted: #71717a;
     --color-border: #3f3f46;
     --color-primary: #3b82f6;
     --color-primary-hover: #2563eb;
     --color-shadow: rgba(0, 0, 0, 0.4);
     --color-overlay: rgba(0, 0, 0, 0.8);
   }

   /* ===== 使用变量的组件样式 ===== */
   .card {
     background-color: var(--color-bg-secondary);
     border: 1px solid var(--color-border);
     border-radius: 8px;
     box-shadow: 0 2px 8px var(--color-shadow);
     color: var(--color-text);
     padding: 20px;
   }

   .btn-primary {
     background-color: var(--color-primary);
     color: #ffffff;
     border: none;
     padding: 10px 20px;
     border-radius: 6px;
     cursor: pointer;
   }

   .btn-primary:hover {
     background-color: var(--color-primary-hover);
   }

   input, textarea {
     background-color: var(--color-bg-secondary);
     color: var(--color-text);
     border: 1px solid var(--color-border);
   }
   ```

4. **JavaScript 切换逻辑**

   ```javascript
   // ===== 主题管理器 =====
   class ThemeManager {
     constructor() {
       this.STORAGE_KEY = 'theme-preference';
       this.THEME_ATTRIBUTE = 'data-theme';
       this.themeToggle = document.querySelector('[data-theme-toggle]');

       this.init();
     }

     init() {
       // 获取存储的主题或系统偏好
       const storedTheme = localStorage.getItem(this.STORAGE_KEY);
       const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

       // 决策优先级：用户手动选择 > 系统偏好 > 默认亮色
       const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');

       this.applyTheme(initialTheme);
       this.bindEvents();
       this.watchSystemPreference();
     }

     applyTheme(theme) {
       document.documentElement.setAttribute(this.THEME_ATTRIBUTE, theme);
       localStorage.setItem(this.STORAGE_KEY, theme);

       // 更新 toggle 按钮状态
       if (this.themeToggle) {
         const isDark = theme === 'dark';
         this.themeToggle.setAttribute('aria-pressed', isDark);
         this.themeToggle.innerHTML = isDark ? '☀️' : '🌙';
       }
     }

     toggleTheme() {
       const currentTheme = document.documentElement.getAttribute(this.THEME_ATTRIBUTE);
       const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
       this.applyTheme(newTheme);
     }

     bindEvents() {
       // 点击切换按钮
       this.themeToggle?.addEventListener('click', () => this.toggleTheme());

       // 监听键盘（可访问性）
       this.themeToggle?.addEventListener('keydown', (e) => {
         if (e.key === 'Enter' || e.key === ' ') {
           e.preventDefault();
           this.toggleTheme();
         }
       });
     }

     watchSystemPreference() {
       // 监听系统主题变化（用户在系统设置中切换时）
       const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

       mediaQuery.addEventListener('change', (e) => {
         // 只有当用户没有手动设置过时才跟随系统
         const storedTheme = localStorage.getItem(this.STORAGE_KEY);
         if (!storedTheme) {
           this.applyTheme(e.matches ? 'dark' : 'light');
         }
       });
     }
   }

   // 初始化
   document.addEventListener('DOMContentLoaded', () => {
     new ThemeManager();
   });
   ```

5. **HTML 结构示例**

   ```html
   <!-- 主题切换按钮 -->
   <button
     data-theme-toggle
     type="button"
     aria-label="切换暗黑模式"
     aria-pressed="false"
     class="theme-toggle"
   >
     🌙
   </button>

   <!-- 使用语义化 HTML -->
   <nav class="navbar" role="navigation">
     <div class="navbar-content">
       <a href="/" class="logo">MyApp</a>
       <ul class="nav-links">
         <li><a href="/about">关于</a></li>
         <li><a href="/contact">联系</a></li>
       </ul>
       <button data-theme-toggle aria-label="切换主题">🌙</button>
     </div>
   </nav>

   <main class="content">
     <section class="card">
       <h2>卡片标题</h2>
       <p>卡片内容...</p>
     </section>
   </main>
   ```

6. **暗黑模式设计要点**

   ```css
   /* ===== 不要简单地反转颜色！===== */
   /* ❌ 错误示范：纯黑背景 + 纯白文字 */
   .bad-dark-mode {
     background: #000000;  /* 太黑，刺眼 */
     color: #ffffff;        /* 太亮，刺眼 */
   }

   /* ✅ 正确做法：使用柔和的颜色 */
   [data-theme="dark"] {
     /* 背景色：不是纯黑，而是深灰 */
     --bg-base: #1a1a1a;     /* 或 #121212 (Material Design 推荐)*/

     /* 文字色：不是纯白，而是柔和的灰白 */
     --text-base: #e4e4e7;   /* 降低对比度，减少眼睛疲劳 */

     /* 表面色：略浅于背景 */
     --surface: #27272a;

     /* 边框色：微妙的分隔 */
     --border: #3f3f46;

     /* 强调色：可能需要提高亮度 */
     --accent: #60a5fa;
   }

   /* ===== 其他重要调整 ===== */
   [data-theme="dark"] {
     /* 1. 阴影：暗黑模式下阴影不明显，改用边框 */
     .card {
       box-shadow: none;
       border: 1px solid var(--border);
     }

     /* 2. 图片：降低亮度 */
     img, video {
       filter: brightness(0.85) contrast(1.05);
     }

     /* 3. 代码块：调整语法高亮配色 */
     code {
       background-color: var(--surface);
       color: #f472b6;  /* 亮粉色，在深色背景下清晰 */
     }

     /* 4. 分割线：降低对比度 */
     hr {
       border-color: var(--border);
       opacity: 0.3;
     }

     /* 5. Focus 状态：确保可见 */
     *:focus {
       outline: 2px solid var(--accent);
       outline-offset: 2px;
     }

     /* 6. 滚动条样式（可选）*/
     ::-webkit-scrollbar {
       width: 8px;
       height: 8px;
     }
     ::-webkit-scrollbar-track {
       background: var(--bg-base);
     }
     ::-webkit-scrollbar-thumb {
       background: var(--surface);
       border-radius: 4px;
     }
   }
   ```

7. **防止闪烁（FOUC）的技巧**

   ```html
   <!-- 在 <head> 中内联脚本，防止页面加载时的闪烁 -->
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">

     <!-- 关键：在渲染之前就设置主题 -->
     <script>
       (function() {
         const stored = localStorage.getItem('theme-preference');
         const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
         const theme = stored || (prefersDark ? 'dark' : 'light');
         document.documentElement.setAttribute('data-theme', theme);
       })();
     </script>

     <!-- 然后再加载 CSS -->
     <link rel="stylesheet" href="styles.css">
   </head>
   ```

8. **多主题扩展**

   ```css
   /* 除了亮色/暗色，还可以支持更多主题 */
   :root,
   [data-theme="light"] {
     --theme-name: "Light";
     /* 亮色变量... */
   }

   [data-theme="dark"] {
     --theme-name: "Dark";
     /* 暗色变量... */
   }

   [data-theme="sepia"] {
     /* 护眼模式（米黄色调）*/
     --color-bg: #f4ecd8;
     --color-text: #5b4636;
     /* ... */
   }

   [data-theme="blue"] {
     /* 蓝色主题 */
     --color-bg: #e3f2fd;
     --color-primary: #1565c0;
     /* ... */
   }
   ```

### 🔍 追问链
1. **如何处理第三方组件库（如 Ant Design、Element UI）的暗黑模式适配？**
   → 方向：大多数现代组件库已内置暗黑模式支持；检查文档看是否提供主题变量或 dark mode class；如果没有，可以用 CSS 覆盖或使用 CSS-in-JS 方案注入变量
2. **暗黑模式下的图片如何处理？特别是那些在两种模式下都要清晰的图片？**
   → 方向：使用 CSS filter（brightness/contrast）微调；为暗黑模式提供专门的图片版本（使用 picture + source + media）；使用 SVG 图片（可通过 CSS 变量变色）；对于 logo，提供两种颜色的版本
3. **如何做暗黑模式的自动化测试？如何确保没有遗漏的硬编码颜色？**
   → 方向：使用 Chrome DevTools 的 CSS Overview 检查未使用变量的颜色；使用 Stylelint 插件禁止硬编码颜色值；使用 Puppeteer 截图对比两种主题；建立 design token 审查流程

---

## Q35: Critical CSS（关键 CSS）提取和内联
- **难度**：★★☆
- **知识点**：Critical CSS / 性能优化 / 首屏渲染
- **题型**：简答题

### 参考答案要点：

1. **什么是 Critical CSS**

   Critical CSS（关键 CSS）指的是**首屏（Above the Fold）渲染所需的最低限度的 CSS**。将这些关键的 CSS 内联到 HTML 的 `<head>` 中，可以让浏览器**无需等待 CSS 文件下载完成就能渲染首屏内容**，从而显著提升首屏渲染速度（FCP/LCP）。

   ```
   传统加载流程：
   HTML → 发现 <link css> → 下载 CSS（阻塞渲染）→ 渲染页面
   ⏱️ 用户看到白屏时间较长

   Critical CSS 优化后：
   HTML（包含内联的关键 CSS）→ 立即渲染首屏 → 异步加载剩余 CSS
   ⏱️ 用户快速看到内容，体验大幅提升
   ```

2. **为什么要内联 Critical CSS**

   ```
   问题分析：

   1. 渲染阻塞：浏览器遇到 <link rel="stylesheet"> 会暂停渲染
   2. 网络延迟：CSS 文件下载需要时间（特别是移动端 3G/4G）
   3. 文件体积：生产环境的 CSS 往往很大（100KB-500KB+）

   优化的收益：

   ✅ 减少 FCP（First Contentful Paint）时间 0.5-2 秒
   ✅ 提升 LCP（Largest Contentful Paint）指标
   ✅ 改善用户体验（更快看到内容）
   ✅ 有利于 SEO（Core Web Vitals）
   ```

3. **识别 Critical CSS 的原则**

   ```css
   /* ===== Critical CSS 包含的内容 ===== */

   /* 1. 首屏可见元素的样式 */
   /* - 导航栏（Navbar）*/
   .navbar {
     position: fixed;
     top: 0;
     left: 0;
     right: 0     height: 64px;
     background: white;
     z-index: 1000;
   }

   /* - Hero 区域（首屏横幅）*/
   .hero {
     min-height: 100vh;
     display: flex;
     align-items: center;
     justify-content: center;
     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
   }

   .hero__title {
     font-size: clamp(2rem, 5vw, 4rem);
     color: white;
     text-align: center;
   }

   /* 2. 基础 Reset / Normalize（精简版）*/
   *, *::before, *::after {
     box-sizing: border-box;
     margin: 0;
     padding: 0;
   }

   /* 3. 字体声明（避免 FOIT/FOUT）*/
   @font-face {
     font-family: 'CustomFont';
     src: url('/fonts/custom.woff2') format('woff2');
     font-display: swap;  /* 重要！允许先用系统字体 */
   }

   /* 4. 首屏用到的布局样式 */
   .container {
     max-width: 1200px;
     margin: 0 auto;
     padding: 0 20px;
   }

   /* ===== Non-Critical CSS（应该延后加载）===== */
   /* - 下方不可见区域的样式（Footer、Modal 等）*/
   /* - 交互状态的样式（hover、focus、active）*/
   /* - 第三方组件库的完整样式 */
   /* - 动画关键帧 */
   /* - 打印样式 */
   /* - 媒体查询中的大屏幕样式 */
   ```

4. **手动提取 Critical CSS 的步骤**

   ```html
   <!DOCTYPE html>
   <html lang="zh-CN">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">

     <!-- ===== Step 1: 内联 Critical CSS ===== -->
     <style>
       /* Critical CSS 开始 - 由开发者手动提取或工具生成 */
       :root{--primary:#3b82f6;--bg:#fff;--text:#1f2937}
       *{margin:0;padding:0;box-sizing:border-box}
       body{font-family:system-ui,-apple-system,sans-serif;line-height:1.5;color:var(--text)}
       .navbar{position:fixed;top:0;left:0;right:0;height:60px;background:var(--bg);border-bottom:1px solid #e5e7eb;z-index:1000}
       .navbar__content{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;align-items:center;height:100%}
       .hero{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#667eea,#764ba2);padding-top:60px}
       .hero__title{font-size:clamp(2rem,5vw,3.5rem);color:#fff;text-align:center;margin-bottom:1.5rem}
       .hero__subtitle{font-size:1.25rem;color:rgba(255,255,255,.9);text-align:center;max-width:600px}
       .btn{display:inline-block;padding:12px 24px;border-radius:6px;font-weight:600;text-decoration:none;transition:all .2s}
       .btn--primary{background:var(--primary);color:#fff}
       .btn--primary:hover{background:#2563eb}
       /* Critical CSS 结束 - 约 1-2KB */
     </style>

     <!-- ===== Step 2: 异步加载剩余 CSS ===== -->
     <!-- 方式1：preload + onload（推荐）-->
     <link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
     <noscript><link rel="stylesheet" href="/styles/main.css"></noscript>

     <!-- 方式2：使用 JavaScript 动态加载 -->
     <script>
       function loadCSS(href) {
         var link = document.createElement('link');
         link.rel = 'stylesheet';
         link.href = href;
         document.head.appendChild(link);
       }
       // 页面加载完成后加载非关键 CSS
       window.addEventListener('load', function() {
         loadCSS('/styles/main.css');
         loadCSS('/styles/components.css');
       });
     </script>
   </head>
   <body>
     <nav class="navbar">
       <div class="navbar__content">
         <!-- 导航内容 -->
       </div>
     </nav>

     <section class="hero">
       <h1 class="hero__title">欢迎访问</h1>
       <p class="hero__subtitle">这是首屏内容，可以立即渲染</p>
       <a href="#" class="btn btn--primary">开始使用</a>
     </section>

     <!-- 下方是非首屏内容，依赖异步加载的 CSS -->
     <section class="features">
       <!-- ... -->
     </section>
   </body>
   </html>
   ```

5. **自动化工具提取 Critical CSS**

   ```bash
   # ===== 工具1：critical（Node.js 库）=====
   npm install critical --save-dev

   # 在 package.json 中配置脚本
   {
     "scripts": {
       "critical": "critical http://localhost:3000 --inline --minify --dest dist/index.html"
     }
   }

   # 运行提取
   npm run critical
   # ===== 工具2：webpack 插件（html-critical-webpack-plugin）=====
   npm install html-critical-webpack-plugin --save-dev

   // webpack.config.js
   const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');

   module.exports = {
     plugins: [
       new HtmlCriticalWebpackPlugin({
         base: './dist/',
         src: 'index.html',
         dest: 'index.html',
         inline: true,
         minify: true,
         extract: false,
         width: 1920,
         height: 1080,
         penthouse: {
           blockJSRequests: false,
         },
       }),
     ],
   };
   # ===== 工具3：Vite 插件（vite-plugin-critical）=====
   npm install vite-plugin-critical -D

   // vite.config.js
   import critical from 'vite-plugin-critical';

   export default {
     plugins: [
       critical({
         criticalUrl: 'http://localhost:5173',
         preview: true,
       }),
     ],
   };
   ```

6. **Critical CSS 的最佳实践**

   ```css
   /* ===== 1. 保持 Critical CSS 精简 ===== */
   /*
    目标大小：< 14KB（压缩后）
    - 只包含首屏必需的样式
    - 移除注释和多余空格
    - 使用短类名（构建时）
    */

   /* ===== 2. 组织 CSS 以便于提取 ===== */
   /* 按照优先级组织 CSS 文件 */

   /* critical.css - 首屏样式 */
   /* base.css - 基础样式（Reset, Typography）*/
   /* components.css - 组件样式 */
   /* utilities.css - 工具类 */
   /* vendor.css - 第三方库 */

   /* ===== 3. 使用 preload 预加载剩余 CSS ===== */
   <link rel="preload" href="non-critical.css" as="style"
         onload="this.rel='stylesheet'">

   /* ===== 4. 处理字体加载 ===== */
   <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>

   /* 在 Critical CSS 中声明字体 */
   @font-face {
     font-family: 'MainFont';
     src: url('/fonts/main.woff2') format('woff2');
     font-display: swap;  /* 避免白屏 */
   }

   /* ===== 5. 响应式 Critical CSS ===== */
   /* 不同视口的 Critical CSS 可能不同 */
   /* 工具通常会提取桌面端的，移动端可能需要单独处理 */
   @media (max-width: 768px) {
     .hero {
       min-height: 100svh;  /* 移动端使用 small viewport height */
       padding: 80px 20px 40px;
     }
     .hero__title {
       font-size: 1.75rem;
     }
   }
   ```

7. **性能监控和验证**

   ```javascript
   // ===== 使用 Performance API 监控收益 =====
   window.addEventListener('load', () => {
     setTimeout(() => {
       const perfData = performance.getEntriesByType('navigation')[0];

       console.log('=== Critical CSS 性能指标 ===');
       console.log(`FCP: ${perfData.responseStart}ms`);
       console.log(`DOM Loaded: ${perfData.domContentLoadedEventEnd}ms`);
       console.log(`Page Load: ${perfData.loadEventEnd}ms`);

       // 使用 Web Vitals 库测量 Core Web Vitals
     }, 0);
   });

   // ===== Lighthouse 审计 =====
   // 运行 lighthouse --view https://your-site.com
   // 关注指标：
   // - FCP (First Contentful Paint) < 1.8s
   // - LCP (Largest Contentful Paint) < 2.5s
   // - CLS (Cumulative Layout Shift) < 0.1
   // - TTI (Time to Interactive) < 3.8s
   ```

8. **常见问题和解决方案**

   ```
   问题1：Critical CSS 体积过大（> 20KB）
   → 解决：审查是否包含了非首屏样式；拆分多个页面分别提取；
          进一步精简首屏设计

   问题2：每次改版都需要重新提取
   → 解决：集成到 CI/CD 流程；每次部署自动执行提取脚本

   问题3：SPA（单页应用）如何处理
   → 解决：只为入口 HTML 提取 Critical CSS；
          路由切换后的组件按需加载 CSS（Code Splitting）

   问题4：动态内容的首屏样式
   → 解决：为骨架屏/Skeleton 提供关键样式；
          API 数据返回后的内容样式可以异步加载

   问题5：缓存问题
   → 解决：内联 CSS 不受缓存影响（本身就是优点）；
          非 Critical CSS 文件加上 hash 版本号
   ```

### 🔍 追问链
1. **Critical CSS 和 Tree Shaking CSS 有什么区别？能否结合使用？**
   → 方向：Critical CSS 关注首屏渲染时机，Tree Shaking 关注移除未使用的 CSS；两者互补：Tree Shaking 先减小总体积，再从中提取 Critical 部分；工具链：PurgeCSS/UnCSS 做 Tree Shaking，Critical/Penthouse 做 Critical CSS 提取
2. **在大型 SPA（如 React/Vue）中如何实施 Critical CSS？有哪些挑战？**
   → 方向：挑战：路由懒加载导致首屏内容不固定；组件级 CSS 难以静态分析；解决方案：SSR/SSG 预渲染；分析真实用户路径确定核心组件；使用 loadable-components 预测关键路由
3. **如何量化 Critical CSS 优化的效果？A/B Test 该怎么做？**
   → 方向：使用 Real User Monitoring (RUM) 收集 FCP/LCP 数据；对比优化前后的 Core Web Vitals 分布；A/B Test 关注业务指标（跳出率、转化率、停留时长）；使用 Lighthouse CI 在 PR 级别做回归检测

---

## 第三部分：专家层（★★★）

> **考察目标**：架构设计能力、手写实现能力、工程化深度、性能调优经验

---

## Q36: 【手写实现】多种方式的两栏布局（固定侧栏 + 自适应内容区）
- **难度**：★★★
- **知识点**：两栏布局 / Flex / Grid / Float / Table
- **题型**：编程实践题

### 核心实现方案：

```html
<!-- 方式1：Flex（推荐）-->
<style>
.flex-layout { display: flex; }
.flex-layout aside { width: 200px; flex-shrink: 0; }
.flex-layout main { flex: 1; }
</style>

<!-- 方式2：Grid（最简洁）-->
<style>
.grid-layout { display: grid; grid-template-columns: 200px 1fr; }
</style>

<!-- 方式3：Float + BFC -->
<style>
.float-layout { overflow: hidden; }
.float-layout aside { float: left; width: 200px; }
.float-layout main { margin-left: 220px; }
</style>

<!-- 方式4：Absolute 定位 -->
<style>
.abs-layout { position: relative; min-height: 400px; }
.abs-layout aside { position: absolute; left: 0; top: 0; bottom: 0; width: 200px; }
.abs-layout main { margin-left: 220px; }
</style>
```

### 🔍 追问链
1. **侧边栏在右边时如何调整？** → 方向：Flex 用 order/Grid 调整列序；Float 改 right + margin-right
2. **等高布局如何保证？** → 方向：Flex/Grid 天然等高（align-items:stretch）；Absolute 需要 JS 同步高度

---

## Q37: 【手写实现】圣杯布局 / 双飞翼布局
- **难度**：★★★
- **知识点**：圣杯布局 / 双飞翼布局 / 三栏布局
- **题型**：编程实践题

### 核心思路：

```
圣杯布局：float + negative margin + relative + padding
双飞翼：float + negative margin + extra wrapper (margin)

现代替代：Flex (flex: 1) / Grid (200px 1fr 200px)
```

### 关键代码：

```css
/* 圣杯布局核心 */
.holy-grail { padding: 0 200px; overflow: hidden; }
.holy-grail .center { float: left; width: 100%; }
.holy-grail .left { float: left; width: 200px; margin-left: -100%; position: relative; left: -200px; }
.holy-grail .right { float: left; width: 200px; margin-left: -200px; position: relative; right: -200px; }
```

---

## Q38: 【手写实现】响应式网格卡片布局（Grid auto-fill + minmax）
- **难度**：★★★
- **知识点**：Grid布局 / 响应式 / auto-fill / minmax
- **题型**：编程实践题

### 核心代码：

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));  /* 自动列数！ */
  gap: 20px;
}
/* 视口宽度变化时，列数自动调整：
 * 300px+ → 1列, 600px+ → 2列, 900px+ → 3列 ...
 */
```

---

## Q39: 从零设计一套企业级的 CSS 命名规范和目录组织方案
- **难度**：★★★
- **知识点**：BEM / ITCSS / OOCSS / CSS架构
- **题型**：方案设计题

### 参考答案要点：

1. **命名规范选型：BEM（Block Element Modifier）**

   ```
   命名规则：.block__element--modifier

   示例：
   .card {}                    /* Block：独立的功能单元 */
   .card__header {}            /* Element：Block 的组成部分 */
   .card__title {}             /* Element：不能单独存在 */
   .card__body {}              /* Element */
   .card--featured {}          /* Modifier：状态/变体 */
   .card--dark {}              /* Modifier */
   .card__title--large {}      /* Element + Modifier */
   ```

2. **目录组织：ITCSS（Inverted Triangle CSS）**

   ```
   styles/
   ├── settings/        ← 变量、配置（最先加载）
   │   ├── _variables.css
   │   ├── _breakpoints.css
   │   └── _colors.css
   ├── tools/           ← Mixin、Function
   │   ├── _mixins.css
   │   └── _functions.css
   ├── generic/         ← Reset/Normalize（低优先级）
   │   ├── _reset.css
   │   └── _box-sizing.css
   ├── elements/        ← HTML 元素裸样式（h1, a, 等）
   │   ├── _typography.css
   │   └── _links.css
   ├── objects/         ← 布局骨架（OOCSS 思想）
   │   ├── _grid.css
   │   └── _media.css
   ├── components/      ← UI 组件（按钮、卡片、导航）
   │   ├── _button.css
   │   ├── _card.css
   │   └── _navbar.css
   ├── utilities/       ← 工具类（高优先级，!.important）
   │   ├── _spacing.css
   │   └── _text.css
   └── main.css         ← 入口文件（按 ITCSS 顺序 @import）
   ```

3. **补充原则**

   ```css
   /* OOCSS 原则：分离结构和皮肤 */
   .btn { /* 结构 */ display: inline-block; padding: 8px 16px; }
   .btn--primary { /* 皮肤 */ background: blue; color: white; }
   .btn--danger { background: red; }

   /* 单一职责原则：一个选择器只做一件事 */
   /* 避免过于深层嵌套：最多 3 层 */
   ```

### 🔍 追问链
1. **BEM 在 React/Vue 组件化项目中还需要吗？**
   → 方向：组件内部可以简化（因为作用域已隔离），但跨组件共享的样式仍需 BEM；CSS Modules/Tailwind 可以部分替代 BEM
2. **ITCSS 和 SMACSS/CSS Modules 如何共存？**
   → 方向：ITCSS 作为全局样式的组织架构；CSS Modules 用于组件级样式；两者互补不冲突

---

## Q40: 设计一套完整的移动端 H5 页面适配方案
- **难度**：★★★
- **知识点**：移动端适配 / viewport / 安全区域 / 1px / 性能
- **题型**：方案设计题

### 参考方案框架：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">

  <!-- 1. Viewport 设置 -->
  <meta name="viewport"
    content="width=device-width,
            initial-scale=1.0,
            maximum-scale=1.0,
            user-scalable=no,
            viewport-fit=cover">  <!-- 适配安全区域 -->

  <!-- 2. 主题色 -->
  <meta name="theme-color" content="#3b82f6">
  <meta name="apple-mobile-web-app-capable" content="yes">

  <!-- 3. 关键 CSS 内联 -->
  <style>
    :root {
      --safe-area-inset-top: env(safe-area-inset-top);
      --safe-area-inset-bottom: env(safe-area-inset-bottom);
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      -webkit-font-smoothing: antialiased;
      -webkit-tap-highlight-color: transparent;  /* 移除点击高亮 */
    }
    /* 安全区域适配 */
    .safe-top { padding-top: var(--safe-area-inset-top); }
    .safe-bottom { padding-bottom: var(--safe-area-inset-bottom); }
  </style>

  <!-- 4. 适配脚本 -->
  <script>
    // 动态设置 rem（基于 375px 设计稿）
    function setRem() {
      document.documentElement.style.fontSize =
        (document.documentElement.clientWidth / 375) * 16 + 'px';
    }
    setRem(); window.onresize = setRem;
  </script>
</head>
<body class="safe-top safe-bottom">
  <!-- 页面内容... -->
</body>
</html>
```

### 完整方案清单：

```
移动端 H5 适配 Checklist：

□ 1. Viewport meta 标签（width=device-width, viewport-fit=cover）
□ 2. rem/vw 适配方案（动态设置根字号）
□ 3. 安全区域适配（env(safe-area-inset-*)）
□ 4. 1px 边框问题处理（transform: scaleY(0.5)）
□ 5. 字体渲染优化（-webkit-font-smoothing: antialiased）
□ 6. 点击优化（fastclick / touch-action: manipulation）
□ 7. 图片适配（srcset / picture / lazy loading）
□ 8. 输入框优化（input[type=date] 样式统一）
□ 9. 回弹效果控制（overscroll-behavior）
□ 10. 底部固定元素的安全区域处理
```

---

## Q41: 【综合题】首屏加载慢的系统性能优化方案（HTML/CSS 角度）
- **难度**：★★★
- **知识点**：性能优化 / 首屏渲染 / Core Web Vitals
- **题型**：综合场景题

### 优化方案（按优先级排序）：

```
┌─────────────────────────────────────────────┐
│          首屏性能优化策略金字塔                │
│                                               │
│                  ▲ FCP/LCP 优化               │
│                 ╱ ╲                          │
│                ╱   ╲  Critical CSS 内联       │
│               ╱─────╲                        │
│              ╱  资源预加载 ╲  preload/prefetch │
│             ╱─────────────╲                   │
│            ╱   渲染阻塞优化   ╲               │
│           ╱  (CSS/JS 优化)    ╲              │
│          ╱─────────────────────╲             │
│         ╱    DOM/CSS 体积优化     ╲           │
│        ╱  (Tree Shaking/压缩)    ╲          │
│       ╱─────────────────────────────╲        │
│      ╱      架构层面优化（SSR/ISR）    ╲      │
│     └─────────────────────────────────────┘
```

| 优化项 | 具体措施 | 预期收益 |
|--------|----------|----------|
| **Critical CSS** | 提取首屏 CSS 并内联 `<style>` | FCP ↓ 30-50% |
| **资源预加载** | `<link rel="preload">` + `dns-prefetch` | RTT ↓ |
| **异步 CSS** | 非关键 CSS 用 `media="print"` 加载后切换 | 渲染阻塞 ↓ |
| **字体优化** | `font-display: swap` + 子集化 | FOIT/FOUT 优化 |
| **图片优化** | WebP/AVIF + lazy loading + srcset | LCP 大幅改善 |
| **Skeleton Screen** | 骨架屏占位 | 感知性能 ↑ |
| **CSS 压缩** | PurgeCSS 移除未使用 CSS | 体积 ↓ 50%+ |
| **SSR/ISR** | 服务端渲染 / 增量静态再生 | TTFB + FCP 双降 |

---

## Q42: CSS contain 属性的作用？如何用于性能优化？
- **难度**：★★★
- **知识点**：contain / 浏览器渲染 / 性能优化
- **题型**：简答题

### 参考答案要点：

```css
/* contain 告诉浏览器元素的子树与外部有多少"隔离" */

/* 1. contain: layout — 内部布局不影响外部 */
.widget { contain: layout; }
/* 浏览器知道这个 widget 内部的布局变化不会影响外部，
 * 可以跳过对父级的 reflow 计算 */

/* 2. contain: paint — 内容不会超出边界 */
.offscreen-element { contain: paint; }
/* 浏览器可以跳过不可见区域的绘制 */

/* 3. contain: size —— 尺寸不受内容影响 */
.fixed-size-box { contain: size; width: 200px; height: 200px; }
/* 内部内容变化不会改变盒子尺寸 */

/* 4. contain: strict / content —— 全部隔离（layout + paint + size） */
.isolated-component { contain: strict; }  /* 最强隔离 */
.isolated-component { contain: content; } /* 同 strict */

/* 5. 实际应用：虚拟列表项 */
.virtual-list-item {
  contain: content;  /* 每个列表项完全隔离 */
  content-visibility: auto;  /* 离屏时不渲染 */
}
```

### 与 content-visibility 配合（Q43 详细展开）

```css
/* 强力组合：contain + content-visibility */
.section {
  contain: strict;
  content-visibility: auto;
}
/* 效果：离屏的 section 完全不参与 Layout/Paint/Composite
 * 进入视口时才渲染，离开后立即释放资源 */
```

---

## Q43: content-visibility 属性的作用？
- **难度**：★★★
- **知识点**：content-visibility / 渲染优化 / 离屏渲染
- **题型**：简答题

### 参考答案要点：

```css
/* content-visibility 控制元素是否渲染其内容 */

/* auto：浏览器自行决定何时渲染（通常在进入视口附近时）*/
.long-content {
  content-visibility: auto;
  contain-intrinsic-size: 500px;  /* 预估高度，防止滚动条跳动 */
}

/* hidden：完全不渲染（类似 display:none 但保留占位）*/
.tab-panel[aria-hidden="true"] {
  content-visibility: hidden;  /* 切换 tab 时不需要重新渲染 */
}

/* visible：始终渲染（默认行为）*/
```

**性能收益**：
- 首屏渲染时间（FCP）大幅降低（只渲染可视区域）
- 滚动流畅度提升（按需渲染）
- 内存占用减少（离屏内容不创建渲染对象）

**适用场景**：长列表、SPA 路由切换、Tab 面板、Accordion 折叠面板

---

## Q44: CSS 的 initial/inherit/unset/revert 关键字的含义
- **难度**：★★★
- **知识点**：CSS关键字 / 默认值 / 继承 / 层叠
- **题型**：简答题

### 参考答案要点：

```css
.element {
  /* initial：重置为 CSS 规范定义的初始值 */
  all: initial;  /* 重置所有属性为初始值（包括继承属性！）*/

  /* inherit：强制从父元素继承（即使该属性默认不继承）*/
  border-color: inherit;  /* border-color 本来不继承，但强制继承 */

  /* unset：如果是继承属性则等同于 inherit，否则等同于 initial */
  all: unset;  /* 智能重置：继承属性恢复继承，非继承属性恢复初始值 */

  /* revert：回退到上一个层叠来源（用户代理样式→浏览器默认样式）*/
  all: revert;  /* 比 initial 更彻底地"撤销"自定义样式 */
}
```

**对比表**：

| 关键字 | 继承属性 | 非继承属性 | 典型用途 |
|--------|---------|-----------|----------|
| **initial** | 设为初始值（丢失继承！） | 设为初始值 | 彻底重置 |
| **inherit** | 从父元素继承 | 从父元素继承 | 强制继承 |
| **unset** | = inherit | = initial | 智能重置 |
| **revert** | 回退到 UA 样式 | 回退到 UA 样式 | 撤销自定义 |

---

## Q45: 【手写实现】用纯 CSS 实现一个 loading 动画效果
- **难度**：★★★
- **知识点**：CSS动画 / keyframes / 伪元素 / transform
- **题型**：编程实践题

### 完整实现（多种风格）：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>Loading 动画集合</title>
<style>
  body { display: flex; flex-direction: column; align-items: center; gap: 40px;
    min-height: 100vh; background: #1a1a2e; padding: 40px; }

  /* ========== Loading 1：旋转圆圈（最经典）========== */
  .spinner-1 {
    width: 40px; height: 40px;
    border: 4px solid rgba(255,255,255,0.2);  /* 半透明底色 */
    border-top-color: #60a5fa;                    /* 顶部高亮色 */
    border-radius: 50%;                             /* 圆形 */
    animation: spin 0.8s linear infinite;           /* 匀速旋转 */
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ========== Loading 2：三个跳动点（iOS 风格）========== */
  .dots { display: flex; gap: 8px; }
  .dot {
    width: 12px; height: 12px;
    background: #60a5fa;
    border-radius: 50%;
    animation: bounce 1.4s ease-in-out infinite both;
  }
  .dot:nth-child(2) { animation-delay: 0.16s; }
  .dot:nth-child(3) { animation-delay: 0.32s; }
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
    40% { transform: scale(1); opacity: 1; }
  }

  /* ========== Loading 3：脉冲波纹（Material 风格）========== */
  .pulse-wrapper {
    position: relative;
    width: 48px; height: 48px;
  }
  .pulse-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #60a5fa;
    animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }
  .pulse-ring:nth-child(2) { animation-delay: 0.5s; }
  .pulse-core {
    position: absolute;
    top: 18px; left: 18px;
    width: 12px; height: 12px;
    background: white;
    border-radius: 50%;
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.33); opacity: 1; }
    80%, 100% { transform: scale(1); opacity: 0; }
  }

  /* ========== Loading 4：渐变进度条（YouTube 风格）========== */
  .progress-bar {
    width: 200px; height: 4px;
    background: rgba(255,255,255,0.2);
    border-radius: 2px;
    overflow: hidden;
  }
  .progress-bar::after {
    content: '';
    display: block;
    width: 40%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #60a5fa, transparent);
    background-size: 200% 100%;
    animation: progress-slide 1.5s ease infinite;
    border-radius: 2px;
  }
  @keyframes progress-slide {
    0% { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }

  /* ========== Loading 5：文字打字机效果 ========== */
  .typing {
    font-size: 20px; color: white;
    font-family: monospace;
    white-space: nowrap;
    overflow: hidden;
    border-right: 2px solid #60a5fa;
    animation: typing 3s steps(12) infinite, blink 0.5s step-end infinite;
  }
  @keyframes typing {
    from { width: 0; } to { width: 12ch; }
  }
  @keyframes blink {
    50% { border-color: transparent; }
  }

  /* ========== Loading 6：CSS 骨架屏（Skeleton Screen）========== */
  .skeleton-card {
    width: 280px;
    padding: 16px;
    background: #fff;
    border-radius: 8px;
  }
  .sk-line {
    height: 14px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s ease-in-out infinite;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .sk-line:last-child { margin-bottom: 0; }
  .sk-line--short { width: 60%; }
  .sk-line--circle {
    width: 48px; height: 48px;
    border-radius: 50%;
    margin-bottom: 12px;
  }
  @keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
</style>
</head>
<body>

  <div class="spinner-1"></div>

  <div class="dots">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>

  <div class="pulse-wrapper">
    <div class="pulse-ring"></div>
    <div class="pulse-ring"></div>
    <div class="pulse-core"></div>
  </div>

  <div class="progress-bar"></div>

  <div class="typing">Loading...</div>

  <div class="skeleton-card">
    <div class="sk-line sk-line--circle"></div>
    <div class="sk-line sk-line--short"></div>
    <div class="sk-line"></div>
    <div class="sk-line sk-line--short"></div>
  </div>

</body>
</html>
```

### 使用说明：
- **Spinner 1**：通用 loading，适合页面/模态框加载
- **Dots 2**：轻量级，适合按钮内联 loading
- **Pulse 3**：Material Design 风格，适合 App 风格页面
- **Progress Bar 4**：视频/内容加载进度
- **Typing 5**：创意效果，适合品牌展示页
- **Skeleton 6**：数据加载占位，感知性能优化利器

---

## Q46: 【手写实现】带有骨架屏效果的卡片组件
- **难度**：★★★
- **知识点**：骨架屏 / Skeleton Screen / CSS动画 / 用户体验
- **题型**：编程实践题

### 核心实现（已在 Q45 的 Loading 6 中包含完整代码）：

```css
/* 骨架屏核心技术：渐变背景 + 平移动画 */
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,    /* 起点：浅灰 */
    #e0e0e0 50%,    /* 中点：深灰 */
    #f0f0f0 75%     /* 终点：浅灰 */
  );
  background-size: 200% 100%;  /* 渐变宽度是容器的 2 倍 */
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }    /* 渐变从右往左流动 */
  100% { background-position: -200% 0; }
}
```

**配合 JavaScript 的自动隐藏**：

```javascript
// 图片/内容加载完成后替换骨架屏
const img = new Image();
img.onload = () => {
  skeletonEl.classList.add('loaded');  /* 显示真实内容，隐藏骨架屏 */
};
img.src = actualImageUrl;
```

---

## Q47: CSS subgrid 是什么？解决什么问题？
- **难度**：★★★
- **知识点**：subgrid / Grid 嵌套 / CSS新特性
- **题型**：简答题

### 参考答案要点：

```css
/* 问题：Grid 嵌套时，子 Grid 无法与父 Grid 的轨道对齐 */

.parent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.child-card {
  display: grid;  /* 子元素也是 Grid */
  grid-template-columns: 1fr 1fr;  /* 但它的列与父 Grid 的列无关！无法对齐 */
}

/* 解决方案：subgrid（让子 Grid "继承"父 Grid 的轨道定义）*/
.child-card-subgrid {
  display: grid;
  grid-template-columns: subgrid;  /* 继承父 Grid 的列定义！ */
  grid-row: span 2;              /* 跨越父 Grid 的 2 行 */
  grid-column: 1 / -1;          /* 占满父 Grid 所有列 */
}
```

**subgrid 解决的核心问题**：
- 嵌套 Grid 的轨道对齐（列宽一致）
- 嵌套 Grid 的跨行/跨列
- 表单 label-input 对齐
- 注释系统中的头像-内容对齐

**浏览器支持**：Firefox 71+, Chrome 117+, Safari 16+

---

## Q48: 设计一套主题切换系统（亮色/暗色/多色系）
- **难度**：★★★
- **知识点**：主题切换 / CSS变量 / 设计系统 / 工程化
- **题型**：方案设计题

### 参考方案：

```css
/* ===== 1. 定义设计令牌 ===== */
:root {
  /* 语义化颜色令牌（而非具体色值）*/
  --color-primary-default: #3b82f6;
  --color-bg: #ffffff;
  --color-fg: #1a1a1a;
  --color-muted: #71717a;
  --color-accent: #8b5cf6;
  --radius-md: 8px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
}

[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-fg: #f1f5f9;
  --color-muted: #94a3b8;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
}

[data-theme="ocean"] {
  --color-primary-default: #06b6d4;
  --color-bg: #ecfeff;
  --color-accent: #0891b2;
}

[data-theme="forest"] {
  --color-primary-default: #22c55e;
  --color-bg: #f0fdf4;
  --color-accent: #15803d;
}

/* ===== 2. 使用令牌构建组件样式 ===== */
.btn {
  background: var(--color-primary-default);
  color: var(--color-bg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

/* ===== 3. JS 切换逻辑 ===== */
/*
function setTheme(name) {
  document.documentElement.setAttribute('data-theme', name);
  localStorage.setItem('theme', name);
}
// 支持 prefers-color-scheme 自动跟随
// 支持 system 选项（跟随操作系统）
*/
```

**扩展能力**：
- 自定义主题（用户选色）→ JS 动态设置 CSS 变量
- 主题预设导出 → 可分享的主题 JSON
- 过渡动画 → `transition: background-color 0.3s, color 0.3s`
- 打印模式 → `@media print { --color-bg: white; ... }`

---

## Q49: 【选择题】关于 HTML/CSS 的综合知识考察
- **难度**：★★★
- **知识点**：综合考察
- **题型**：选择题

### 题目：

**1.** 以下哪个属性**不会**触发 Reflow（回流）？

A) `element.style.width = '100px'`
B) `element.style.color = 'red'`
C) `element.className = 'new-class'`
D) `element.appendChild(newNode)`

**正确答案：B**
**解析**：修改 `color` 只触发 Repaint（重绘），不触发 Reflow。其余三项都可能触发 Reflow。

**2.** 关于 CSS 选择器权重，以下说法**错误**的是？

A) `!important` 的优先级最高
B) `:not(.class)` 的权重等于 `.class`
C) 行内 style 的权重是 `(1,0,0,0)`
D) 继承的样式权重为 `(0,0,0,0)` 且最低

**正确答案：B**
**解析**：`:not()` 的权重取决于括号内的选择器。`:not(.class)` 权重为 `(0,0,1,0)`（来自 `.class`），确实等于 `.class`。但如果是 `:not(#id)` 则权重为 `(0,1,0,0)`。所以 B 的说法本身是对的... 让我重新考虑。实际上更准确的"错误"说法可能是关于 `:is()` 和 `:where()` 的区别。或者这道题的正确答案应该是关于通配符 `*` 的权重不为 0 而是 `(0,0,0,0)`。

**修正后的题目：** 关于 CSS 选择器，以下说法**正确**的是：

A) `*` 选择器的优先级高于继承的样式
B) `:where()` 包裹的选择器优先级为 0
C) `!important` 可以覆盖行内样式
D) 以上全部正确

**正确答案：D**

**3.** 以下哪种方式**不能**实现水平垂直居中？

A) `display: flex; justify-content: center; align-items: center;`
B) `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`
C) `display: grid; place-items: center;`
D) `position: absolute; top: 0; right: 0; bottom: 0; left: 0;` （无 width/height）

**正确答案：D**
**解析**：D 方式中 `margin: auto` 需要配合显式的 `width` 和 `height` 才能居中。没有宽高的元素使用四方向 0 + margin:auto 会塌陷为 0×0。

---

## Q50: 【综合场景题】给定复杂页面设计稿，描述 HTML 结构设计和 CSS 实现思路
- **难度**：★★★
- **知识点**：综合实战 / 页面架构 / 组件拆分
- **题型**：综合场景题

### 解题方法论（STAR 原则）：

```
面对任意设计稿的分析流程：

S - Structure（结构分析）
├── 识别页面区域（Header/Hero/Content/Sidebar/Footer）
├── 识别重复组件（Card/List/Table/Badge/Button）
└── 识别层级关系（嵌套深度、z-index 层级）

T - Technology（技术选型）
├── 整体布局：Grid（页面框架）+ Flex（组件内部）
├── 响应式策略：Mobile First + 断点设计
├── CSS 方案：原生 CSS / Tailwind / CSS Modules / CSS-in-JS
└── 工程化：预处理 / PostCSS / 构建优化

A - Architecture（架构设计）
├── 目录结构（ITCSS / Atomic / Component-based）
├── 命名规范（BEM / OOCSS / Function-oriented）
├── 设计令牌（Design Tokens / CSS Variables）
└── 组件拆粒度（原子/分子/有机体/模板 - Atomic Design）

R - Refinement（细节打磨）
├── 交互状态（hover/focus/active/disabled/loading）
├── 动效设计（transition/animation/keyframes）
├── 无障碍（semantic HTML / ARIA / focus-visible）
└── 性能（Critical CSS / will-change / contain / content-visibility）
```

### 示例回答框架（假设是一个 Dashboard 设计稿）：

```
1. HTML 结构设计：
   - 语义化标签：<header><nav><main><aside><footer>
   - 区域划分：header（固定）+ main（grid: sidebar + content）+ footer
   - 组件化：每个卡片用 <article class="card"> 包裹

2. CSS 布局策略：
   - 一级布局：CSS Grid（整体框架，sidebar 240px + content 1fr）
   - 二级布局：Flex（卡片内部、导航栏、统计数字组）
   - 三级布局：Block + Margin（文本段落、间距）

3. 响应式方案：
   - < 768px：单列，sidebar 变为顶部抽屉/底部 Tab
   - 768-1024px：sidebar 缩窄为 180px，content 自适应
   - > 1024px：固定侧栏 + 流体内容区

4. 工程化考量：
   - CSS Variables 定义 8+ 色彩主题
   - BEM 命名：.dashboard / .stats-card / .chart-container
   - @container 做图表组件级别的响应式
   - content-visibility: auto 处理长列表
```

---

## 📋 附录：HTML/CSS 知识体系速查表

### A. HTML 标签分类速查

| 分类 | 标签 | 说明 | 语义含义 |
|------|------|------|----------|
| **文档结构** | `html`, `head`, `body` | 页面根结构 | 文档基础容器 |
| **元数据** | `meta`, `link`, `title`, `base`, `style`, `script` | 页面信息与资源引用 | 描述文档自身 |
| **区域划分** | `header`, `nav`, `main`, `footer`, `aside`, `section`, `article` | HTML5 语义化布局 | 定义页面区域角色 |
| **文本内容** | `h1`~`h6`, `p`, `blockquote`, `pre`, `code`, `span`, `a`, `strong`, `em`, `mark`, `small`, `time`, `address` | 文本层级与语义 | 表达内容的结构与强调程度 |
| **列表** | `ul`, `ol`, `li`, `dl`, `dt`, `dd` | 有序/无序/定义列表 | 数据集合的展示方式 |
| **表格** | `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, `caption`, `colgroup`, `col` | 二维数据展示 | 结构化数据呈现 |
| **表单** | `form`, `input`, `textarea`, `select`, `option`, `button`, `label`, `fieldset`, `legend`, `datalist`, `output`, `progress`, `meter` | 用户输入与交互 | 数据采集界面 |
| **嵌入媒体** | `img`, `iframe`, `video`, `audio`, `source`, `track`, `canvas`, `svg`, `picture`, `map`, `area` | 多媒体与外部资源 | 嵌入非 HTML 内容 |
| **分组脚本** | `figure`, `figcaption`, `details`, `summary`, `dialog` | 独立内容块与可折叠区 | 自包含的内容单元 |
| **通用容器** | `div`, `span` | 无语义纯容器 | 仅用于样式或脚本钩子 |

> 💡 **选用原则**：优先使用有语义的标签（如 `<article>` 而非 `<div class="article">`），只有当没有合适语义标签时才用 `div`/`span`

### B. CSS 布局方案决策树

```
需要做布局？

├── 一维排列（一行 / 一列）
│   └── → Flexbox ✅（首选）
│       ├── 导航栏 / 按钮组 / 列表项 → flex + gap
│       ├── 居中对齐 → justify-content + align-items
│       ├── 等分空间 → flex: 1
│       └── 换行排列 → flex-wrap: wrap
│
├── 二维精确布局（行 × 列）
│   └── → CSS Grid ✅（首选）
│       ├── 整体页面框架 → grid-template-areas
│       ├── 卡片墙 / 相册 / 日历 → auto-fill + minmax
│       ├── 圣杯 / 双飞翼三栏 → grid-template-columns: 200px 1fr 200px
│       └── 不等宽复杂网格 → 显式行列定义
│
├── 文字环绕效果
│   └── → Float ⚠️（唯一选择，如报纸排版、图文混排）
│
├── 脱离文档流定位
│   ├── 固定在视口 → position: fixed（导航栏悬浮、回顶按钮）
│   ├── 相对父容器绝对定位 → position: absolute（弹窗、角标、覆盖层）
│   └── 粘性定位 → position: sticky（吸顶表头、侧边栏跟随）
│
├── 全屏居中（水平 + 垂直）
│   ├── 不知道子元素尺寸 → Flex (justify+align) 或 Grid (place-items:center)
│   ├── 知道子元素尺寸 → absolute + margin:auto（最兼容）
│   └── 需要 GPU 加速 → absolute + transform:translate(-50%,-50%)
│
└── 特殊场景
    ├── 等高多列 → Flex (align-items:stretch) 天然支持
    ├── 响应式多列 → Grid (auto-fit/minmax) 或 column-count
    ├── 全屏覆盖层 → fixed + inset:0（替代 top/right/bottom/left:0）
    └── 文字垂直居中 → line-height = height（仅单行文字）
```

### C. CSS 单位完整选用指南

| 单位类型 | 具体单位 | 相对于 | 适用场景 | 推荐度 |
|----------|----------|--------|----------|--------|
| **绝对单位** | `px` | 物理像素（逻辑像素） | 边框宽度、阴影偏移、固定尺寸元素 | ⭐⭐⭐⭐⭐ |
| | `pt` | 1/72 英寸 | 打印样式（几乎不用） | ⭐ |
| | `cm`/`mm`/`in` | 物理长度 | 打印样式 | ⭐ |
| **字体相对** | `em` | 当前元素的 font-size | 组件内间距、按钮 padding、缩进 | ⭐⭐⭐⭐ |
| | `rem` | 根元素（<html>）font-size | 全局字体大小、响应式间距、移动端适配 | ⭐⭐⭐⭐⭐ |
| | `%` | 父元素同属性值 | 宽度百分比、流式布局 | ⭐⭐⭐⭐ |
| | `ex` | 字母 x 的高度 | 排版微调（极少使用） | ⭐⭐ |
| | `ch` | 数字 0 的宽度 | 等宽文本框宽度（如手机号输入） | ⭐⭐⭐ |
| **视口相对** | `vw` | 视口宽度的 1% | 大标题字号、全宽区块 | ⭐⭐⭐ |
| | `vh` | 视口高度的 1% | 全屏 hero 区域高度 | ⭐⭐⭐ |
| | `vmin` | vw/vh 中较小值 | 移动端适配兜底 | ⭐⭐ |
| | `vmax` | vw/vh 中较大值 | 大屏特殊处理 | ⭐⭐ |
| | `dvh`/`svh`/`lvh` | 动态/小/大视口高度 | 解决移动端地址栏问题 | ⭐⭐⭐ |
| **函数式** | `clamp(min, preferred, max)` | 流式范围 | 流式字体、弹性间距（现代首选） | ⭐⭐⭐⭐⭐ |
| | `min()` / `max()` | 取最小/最大值 | 响应式断点内自适应 | ⭐⭐⭐⭐ |
| | `calc()` | 数学计算 | 混合单位运算（如 100% - 60px） | ⭐⭐⭐⭐⭐ |
| **Grid 专用** | `fr` | 剩余空间比例份数 | Grid 列宽分配 | ⭐⭐⭐⭐⭐（Grid 场景） |

> 💡 **最佳实践组合**：字体用 `rem` + `clamp()`，间距用 `rem`，边框用 `px`，布局用 `%`/`fr`/`vw`

### D. 浏览器兼容性速查（常用 CSS 特性）

| 特性 | Chrome | Firefox | Safari | Edge | IE | 备注 |
|------|--------|---------|--------|------|-----|------|
| **Flexbox** | 29+ ✅ | 28+ ✅ | 9+ ✅ | 12+ ✅ | 11(部分) | 需 `-webkit-` 前缀（旧版） |
| **CSS Grid** | 57+ ✅ | 52+ ✅ | 10.1+ ✅ | 16+ ✅ | ❌ | IE10-11 用旧语法 |
| **CSS Variables** | 49+ ✅ | 31+ ✅ | 9.1+ ✅ | 15+ ✅ | ❌ | 即 Custom Properties |
| **position:sticky** | 56+ ✅ | 59+ ✅ | 13+ ✅ | 16+ ✅ | ❌ | 注意父级 overflow 限制 |
| **display:contents** | 65+ ✅ | 59+ ✅ | 22+ ✅ | 79+ ✅ | ❌ | 无障碍需注意 |
| **gap (Flex)** | 84+ ✅ | 63+ ✅ | 14.1+ ✅ | 84+ ✅ | ❌ | Grid 的 gap 支持更早 |
| **:has() 选择器** | 105+ ✅ | 121+ ✅ | 15.4+ ✅ | 105+ ✅ | ❌ | "CSS 父选择器" |
| **container queries** | 105+ ✅ | 110+ ✅ | 16+ ✅ | 105+ ✅ | ❌ | 组件级响应式 |
| **:nth-child(of S)** | 111+ ✅ | 113+ ✅ | 17+ ✅ | 111+ ✅ | ❌ | 更精确的结构选择 |
| **subgrid** | 117+ ✅ | 116+ ✅ | 17+ ✅ | 117+ ✅ | ❌ | Grid 嵌套对齐 |
| **@layer** | 99+ ✅ | 97+ ✅ | 15.4+ ✅ | 99+ ✅ | ❌ | CSS 级联层管理 |
| **color-mix()/oklch** | 111+ ✅ | 113+ ✅ | 16.2+ ✅ | 111+ ✅ | ❌ | 现代 CSS 颜色函数 |
| **view-transition** | 111+ ✅ | 133+ ✅ | 18+ ✅ | 111+ ✅ | ❌ | 原生页面过渡动画 |
| **accent-color** | 99+ ✅ | 92+ ✅ | 15.4+ ✅ | 99+ ✅ | ❌ | 自定义表单控件主题色 |
| **field-sizing:content** | 123+ ✅ | 130+ ✅ | 18+ ✅ | 123+ ✅ | ❌ | textarea 自动高度 |

> 📱 **移动端 WebView**：iOS Safari ≈ 同版本 Safari；Android Chrome ≈ 同版本 Chrome；微信内置浏览器 ≈ 较旧版内核

### E. 性能优化 CheckList（HTML/CSS 角度）

#### HTML 层面优化
```
□ 减少 DOM 节点数量（减少 HTML 嵌套深度，目标 < 60 层）
□ 关键 CSS 内联到 <head>（Critical CSS，减少渲染阻塞）
□ 使用 <link rel="preload"> 预加载关键资源
□ 图片使用正确的格式（WebP/AVIF > JPEG/PNG，SVG 用于图标）
□ 图片添加 width/height 属性（防止布局偏移 CLS）
□ 使用 <picture> + srcset 实现响应式图片
□ 减少首屏 HTML 大小（服务端 SSR/SSG、按路由拆分）
□ 合理使用 <script defer/async>（避免阻塞解析）
□ 使用 <meta name="theme-color"> 优化移动端体验
□ 语义化标签提升 SEO 和无障碍（屏幕阅读器友好）
```

#### CSS 层面优化
```
□ 选择器优化（避免过深嵌套，BEM 保持 ≤ 3 层）
□ 使用 contain 属性隔离组件渲染范围
□ 使用 content-visibility: auto 跳过离屏渲染
□ 动画优先使用 transform + opacity（仅触发 Composite）
□ 对动画元素合理使用 will-change（不要滥用！）
□ 使用 GPU 加速合成层（transform: translateZ(0) 作为 fallback）
□ 避免使用 @import（阻塞并行下载，改用 <link>）
□ 压缩 CSS 文件（去除空白、注释、缩短类名）
□ 使用 CSS Modules / 作用域样式避免全局污染
□ 利用 CSS 缓存策略（长缓存 hash 文件名）
```

#### 渲染性能优化
```
□ 批量 DOM 操作（DocumentFragment / cloneNode / innerHTML 一次性写入）
□ 避免强制同步布局（Forced Synchronous Layout）
│   └── 不要在循环中读取 offsetWidth/clientHeight 等布局属性
□ 使用 requestAnimationFrame 调度视觉更新
□ 使用虚拟滚动（Virtual Scrolling）处理长列表（> 100 条）
□ 使用 IntersectionObserver 替代 scroll 事件监听
□ 减少重排触发（用 className 批量修改代替逐行 style 操作）
□ 使用 font-display: swap 优化自定义字体加载
□ 防抖(Debounce)/节流(Throttle) 处理 resize/scroll 事件
```

#### 加载性能优化
```
□ 关键渲染路径（CRP）优化：
│   ├── 减少 DOM/CSSOM 构建时间
│   ├── 缩短关键路径长度（减少关键资源数量）
│   └── 减少关键字节大小（压缩、Tree Shaking）
□ 使用 HTTP/2 或 HTTP/3 多路复用
□ 启用 Brotli/Gzip 压缩
□ CDN 分发静态资源
□ 使用 Service Worker 缓存策略
□ 监控 Core Web Vitals（LCP / FID / INP / CLS）
```

---

## 📚 附录：原有速查表（保留）

### CSS 属性触发渲染阶段速查

| 阶段 | 触发属性 | 代价 | 优化策略 |
|------|----------|------|----------|
| **Layout (Reflow)** | width/height/margin/padding/border/top/left/font-size | ⭐⭐⭐⭐⭐ 最高 | 批量读写、避免循环读取、Virtual DOM |
| **Paint (Repaint)** | color/background/border-color/box-shadow/visibility | ⭐⭐⭐ 中等 | 减少不必要的样式变化 |
| **Composite** | transform/opacity/filter/will-change | ⭐ 最低 | GPU 加速、合成层管理 |

---

> **文档信息**
> - **总题数**：50 道（基础 15 + 进阶 20 + 专家 15）
> - **覆盖考点**：HTML5 语义化、盒模型、选择器、BFC、Flex/Grid、定位、浮动、响应式、浏览器渲染、性能优化、工程化实践
> - **含追问链的核心题**：约 25 道
> - **含手写实现的题目**：Q05/Q11/Q14/Q17/Q18/Q36/Q37/Q38/Q45/Q46
> - **附录内容**：HTML标签分类 / 布局决策树 / 单位指南 / 浏览器兼容性 / 性能CheckList
> - **最后更新**：2026-06-15
