---
---
# HTML & CSS 基础知识指南

> **版本**: v1.0 | **最后更新**: 2026-06-15 | **适用人群**: 前端初学者 / 面试准备者 / 工程师复习参考
>
> 本文档系统性地覆盖了 HTML5 与 CSS3 的核心知识体系，从基础语法到渲染原理，从布局方案到性能优化，旨在提供一份**面试准备级别**的完整学习资料。

---

## 第1章 概述

### 1.1 HTML 与 CSS 是什么

| 技术 | 全称 | 定位 | 核心职责 |
|------|------|------|----------|
| **HTML** | HyperText Markup Language（超文本标记语言） | **结构层** | 定义网页的内容结构与语义 |
| **CSS** | Cascading Style Sheets（层叠样式表） | **表现层** | 控制网页的视觉呈现与排版 |

```
┌─────────────────────────────────────────────────────────────┐
│                      前端技术三层架构                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│   │ JavaScript  │    │    CSS      │    │    HTML     │     │
│   │   行为层     │◄───│   表现层     │◄───│   结构层     │     │
│   │             │    │             │    │             │     │
│   │ 交互/逻辑   │    │ 样式/布局   │    │ 内容/语义   │     │
│   └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
│   关系: HTML 构建"骨架" → CSS 穿上"衣服" → JS 注入"灵魂"       │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 版本演进历程

#### HTML 版本演进

| 版本 | 发布年份 | 核心变革 | 代表性特性 |
|------|----------|----------|------------|
| **HTML 2.0** | 1995 | IETF 首次标准化 | 基础表单、表格 |
| **HTML 4.01** | 1999 | W3C 规范完善 | CSS 支持、脚本、可访问性 |
| **XHTML 1.0/1.1** | 2000/2001 | XML 严格化 | 严格语法、命名空间 |
| **HTML5** | 2014 | 语义化+API 革命 | 语义标签、Canvas、Web Storage、多媒体 |
| **HTML Living Standard** | 至今 | WHATWG 持续演进 | 无固定版本号，持续更新 |

#### CSS 版本演进

| 版本 | 范围 | 核心模块 | 代表性特性 |
|------|------|----------|------------|
| **CSS Level 1** | 1996 | 基础样式 | 字体、颜色、基础选择器 |
| **CSS Level 2 / 2.1** | 1998/2011 | 布局增强 | 定位、浮动、表格布局、媒体类型 |
| **CSS Level 3 (模块化)** | ~2011 起 | 模块化规范 | Flexbox、Grid、动画、变量、查询容器等 |
| **CSS Level 4+** | 进行中 | 新一代特性 | 容器查询、级联层、:has() 选择器、视图过渡 |

> **关键理解**: CSS3 不再是单一规范，而是由 **W3C 将功能拆分为数十个独立模块**（如 Selectors Level 4、Flexbox Level 1、Grid Level 2 等），各模块独立演进和标准化。

### 1.3 HTML5 核心特性一览

```html
<!-- HTML5 文档声明 —— 更简洁，不再需要 DTD -->
<!DOCTYPE html>

<!-- lang 属性有助于搜索引擎和屏幕阅读器 -->
<html lang="zh-CN">

<head>
    <!-- 字符编码声明必须放在前 1024 字节内 -->
    <meta charset="UTF-8">

    <!-- 视口设置：移动端适配的关键 -->
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <!-- 页面标题 -->
    <title>HTML5 示例页面</title>
</head>

<body>

    <!-- ========== 语义化结构标签 ========== -->

    <!-- header: 页面或区块的头部区域 -->
    <header>
        <nav>导航栏内容</nav>
    </header>

    <!-- main: 页面主体内容（每个页面仅一个） -->
    <main>
        <!-- article: 独立完整的内容单元 -->
        <article>
            <h1>文章标题</h1>
            <p>文章正文...</p>
            <!-- section: 主题相关的内容分组 -->
            <section>
                <h2>章节标题</h2>
            </section>
        </article>

        <!-- aside: 侧边栏/辅助信息 -->
        <aside>侧边栏内容</aside>
    </main>

    <!-- footer: 页面或区块的底部区域 -->
    <footer>版权信息</footer>

    <!-- ========== 多媒体标签 ========== -->

    <!-- video: 内嵌视频播放器 -->
    <video controls width="320">
        <!-- source: 提供多种格式以兼容不同浏览器 -->
        <source src="movie.mp4" type="video/mp4">
        <source src="movie.webm" type="video/webm">
        您的浏览器不支持 video 标签
    </video>

    <!-- audio: 内嵌音频播放器 -->
    <audio controls>
        <source src="audio.mp3" type="audio/mpeg">
    </audio>

    <!-- canvas: 使用 JavaScript 绑定的绘图画布 -->
    <canvas id="myCanvas" width="300" height="150"></canvas>

</body>
</html>
```

### 1.4 CSS3 核心特性一览

```css
/* ========================================
   CSS3 特性示例：现代 CSS 能力展示
   ======================================== */

/* --- 自定义属性（CSS 变量）--- */
:root {
    /* 在根元素定义全局变量 */
    --primary-color: #3498db;      /* 主色调 */
    --spacing-base: 16px;           /* 基础间距 */
    --font-size-base: 16px;         /* 基础字号 */
}

/* --- 弹性盒子布局（Flexbox）--- */
.flex-container {
    display: flex;                  /* 启用弹性布局 */
    justify-content: center;        /* 主轴方向居中对齐 */
    align-items: center;            /* 交叉轴方向居中对齐 */
    gap: var(--spacing-base);       /* 使用变量的项目间距 */
}

/* --- 网格布局（Grid）--- */
.grid-layout {
    display: grid;
    /* 定义列轨道模板：重复 3 列，每列最小 200px 最大 1fr */
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    /* 定义行间距和列间距 */
    gap: 20px;
}

/* --- 动画与过渡 --- */
.animated-element {
    /* 过渡效果：属性变化时的平滑过渡 */
    transition: transform 0.3s ease, opacity 0.3s ease;

    /* 关键帧动画 */
    animation: fadeInUp 0.6s ease forwards;

    /* 2D 变换 */
    transform: translateX(10px) rotate(5deg);

    /* 圆角 */
    border-radius: 12px;

    /* 阴影 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* --- 媒体查询（响应式）--- */
@media screen and (max-width: 768px) {
    /* 当视口宽度 ≤ 768px 时生效 */
    .grid-layout {
        /* 移动端切换为单列布局 */
        grid-template-columns: 1fr;
    }
}

/* --- 关键帧定义 --- */
@keyframes fadeInUp {
    from {
        /* 起始状态：透明且向下偏移 */
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        /* 结束状态：完全不透明且归位 */
        opacity: 1;
        transform: translateY(0);
    }
}
```

---

## 第2章 HTML 基础语法

### 2.1 HTML 文档结构

一个标准的 HTML5 文档由以下层次组成：

```
文档结构层级图
═══════════════════════════════════════

<!DOCTYPE html>          ← 文档类型声明（非 HTML 标签）
    │
    ▼
<html>                   ← 根元素（所有内容的容器）
    ├── <head>           ← 文档元数据区域（不可见）
    │   ├── <meta>       ← 元信息（字符集、视口、SEO 等）
    │   ├── <title>      ← 页面标题（显示在浏览器标签页）
    │   ├── <link>       ← 外部资源引用（样式表、图标）
    │   └── <script>     ← 脚本引用（可放在 head 或 body 底部）
    │
    └── <body>           ← 文档可见内容区域
        ├── 文本内容
        ├── 标签元素
        └── 嵌套子元素

═══════════════════════════════════════
```

#### 完整文档骨架

```html
<!-- 步骤1: DOCTYPE 声明 —— 告诉浏览器使用 HTML 标准模式解析 -->
<!DOCTYPE html>

<!-- 步骤2: html 根元素 —— lang 属性用于语言识别和 SEO -->
<html lang="zh-CN">

<head>
    <!-- 步骤3: 字符编码 —— 必须在 head 最前面，防止乱码 -->
    <meta charset="UTF-8">

    <!-- 步骤4: 视口元标签 —— 移动端适配核心配置 -->
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <!--
        viewport 参数说明:
        - width=device-width : 视口宽度等于设备宽度
        - initial-scale=1.0  : 初始缩放比例为 1:1
        - maximum-scale=1.0  : 禁止用户手动缩放（可选）
        - user-scalable=no   : 禁止双指缩放手势（可选）
    -->

    <!-- 步骤5: SEO 相关 meta 标签 -->
    <meta name="description" content="页面描述，建议 120-160 字符">
    <meta name="keywords" content="关键词1, 关键词2, 关键词3">
    <meta name="author" content="作者名称">

    <!-- 步骤6: Open Graph 协议 —— 社交分享时显示的信息 -->
    <meta property="og:title" content="分享标题">
    <meta property="og:description" content="分享描述">
    <meta property="og:image" content="https://example.com/image.jpg">

    <!-- 步骤7: 页面标题 -->
    <title>页面标题 - 网站名称</title>

    <!-- 步骤8: 外部样式表链接 -->
    <link rel="stylesheet" href="styles.css">

    <!-- 步骤9: 网站图标（Favicon） -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">

    <!-- 步骤10: 预连接提示（性能优化） -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://api.example.com">
</head>

<body>
    <!-- 页面可见内容从这里开始 -->

    <!-- 用户看到的所有内容 -->

    <!-- 步骤11: 脚本文件（推荐放在 body 底部，避免阻塞渲染） -->
    <script src="app.js" defer></script>
    <!-- defer 属性: 脚本下载不阻塞 DOM 解析，在 DOMContentLoaded 前执行 -->
</body>

</html>
```

### 2.2 标签、元素与属性

#### 标签分类体系

| 分类方式 | 类别 | 说明 | 示例 |
|----------|------|------|------|
| **按闭合方式** | 双标签（容器标签） | 有开始和结束标签 | `<div>...</div>` `<p>...</p>` |
| | 单标签（自闭合标签/空元素） | 无需结束标签 | `<img>` `<input>` `<br>` `<hr>` `<meta>` `<link>` |
| **按显示方式** | 块级元素（Block） | 独占一行，可设宽高 | `div` `p` `h1-h6` `ul` `li` `table` `form` |
| | 行内元素（Inline） | 不换行，宽高无效 | `span` `a` `strong` `em` `code` `label` |
| | 行内块元素（Inline-block） | 不换行但可设宽高 | `img` `input` `button` `select` |
| **按语义化** | 语义化标签 | 有明确含义 | `header` `nav` `main` `article` `section` |
| | 非语义化标签 | 无明确含义，用于布局 | `div` `span` |
| **按内容模型** | 流式内容（Flow） | 可包含文本或其他流式元素 | 大多数 body 子元素 |
| | 短语内容（Phrasing） | 文本级内容 | `span` `a` `em` `strong` |
| | 嵌入内容（Embedded） | 引入外部资源 | `img` `video` `canvas` `iframe` |
| | 交互内容（Interactive） | 专供用户交互 | `button` `input` `select` `textarea` |

#### 元素与标签的区别

```
概念辨析：
═══════════════════════════════════════

  标签（Tag）= 标记符号本身
  元素（Element）= 标签 + 内容 + 属性 的整体

  示例:

  <p class="intro">这是一个段落</p>
   │              │              │
   ├─ 开始标签     ├─ 内容         ├─ 结束标签
   │                             │
   └──────── 元素（Element） ──────┘

═══════════════════════════════════════
```

#### 属性详解

```html
<!-- 属性的基本语法: 属性名="属性值" -->

<!-- 1. 全局属性（可用于任何 HTML 元素） -->
<div id="unique-id"          <!-- id: 全局唯一标识符 -->
     class="box active"      <!-- class: 样式类名（可多个，空格分隔） -->
     style="color: red;"     <!-- style: 内联样式（优先级最高） -->
     data-user-id="12345"    <!-- data-*: 自定义数据属性 -->
     title="提示文字"        <!-- title: 鼠标悬停提示 -->
     hidden                  <!-- 布尔属性：无值即表示 true -->
     role="alert"            <!-- ARIA 角色（可访问性） -->
     tabindex="0"            <!-- Tab 键聚焦顺序 -->
     aria-label="关闭按钮">  <!-- ARIA 标签（屏幕阅读器朗读） -->
    内容
</div>

<!-- 2. 布尔属性：存在即为 true，不存在为 false -->
<input type="text" required>      <!-- required: 必填 -->
<input type="checkbox" checked>   <!-- checked: 默认选中 -->
<button disabled>禁用按钮</button> <!-- disabled: 禁用 -->
<details open>                    <!-- details: 默认展开 -->
    <summary>点击折叠</summary>
    <p>详细内容</p>
</details>

<!-- 3. 特定元素的专属属性 -->
<img src="photo.jpg"                     <!-- src: 资源路径（必需） -->
     alt="一张风景照片"                   <!-- alt: 替代文本（重要！） -->
     loading="lazy"                       <!-- loading: 懒加载策略 -->
     width="800"                          <!-- width: 固有宽度 -->
     height="600">                        <!-- height: 固有高度 -->

<a href="https://example.com"            <!-- href: 链接地址（必需） -->
   target="_blank"                        <!-- target: 打开方式 -->
   rel="noopener noreferrer"              <!-- rel: 链接关系（安全！防止钓鱼） -->
   download="report.pdf">                 <!-- download: 下载而非跳转 -->
    下载报告
</a>
```

### 2.3 DOM 树概念

DOM（Document Object Model，文档对象模型）是浏览器将 HTML 文档解析成的**树形数据结构**。

```
DOM 树结构示意
═════════════════════════════════════════════════════════════

  document（文档节点）
      │
      ▼
  ┌─── html（元素节点，根节点）
  │    │
  │    ├─── head
  │    │    ├── meta[charset]  ← 元素节点
  │    │    ├── title
  │    │    │    └── "页面标题" ← 文本节点
  │    │    └── link
  │    │
  │    └─── body
  │         ├── header
  │         │    ├── h1
  │         │    │    └── "网站标题"  ← 文本节点
  │         │    └── nav
  │         │         └── ul
  │         │              └── li × 3
  │         │
  │         ├── main
  │         │    ├── article
  │         │    │    ├── h2
  │         │    │    ├── p
  │         │    │    └── img  ← 同时是元素节点
  │         │    │
  │         │    └── aside
  │         │
  │         └── footer

═════════════════════════════════════════════════════════════

节点类型（Node Types）:
  - Element Node (元素节点): 标签本身，nodeType = 1
  - Text Node (文本节点): 标签内的纯文字，nodeType = 3
  - Comment Node (注释节点), nodeType = 8
  - Document Node (文档节点), nodeType = 9
```

#### DOM 操作示例（JavaScript）

```javascript
// ===== DOM 节点获取 =====

// 通过 ID 获取唯一元素
const header = document.getElementById('page-header');

// 通过类名获取元素集合（返回 HTMLCollection）
const boxes = document.getElementsByClassName('card');

// 通过标签名获取
const paragraphs = document.getElementsByTagName('p');

// 通过 CSS 选择器获取（推荐方式，返回第一个匹配）
const firstCard = document.querySelector('.card.highlight');

// 通过 CSS 选择器获取所有匹配（返回 NodeList）
const allCards = document.querySelectorAll('.card');

// ===== DOM 节点遍历关系 =====
const parent = element.parentNode;           // 父节点
const children = element.children;           // 所有子元素节点（不含文本）
const firstChild = element.firstElementChild; // 第一个子元素
const lastChild = element.lastElementChild;   // 最后一个子元素
const prevSibling = element.previousElementSibling; // 前一个兄弟元素
const nextSibling = element.nextElementSibling;     // 后一个兄弟元素

// ===== DOM 节点创建与操作 =====

// 创建新元素
const newDiv = document.createElement('div');
newDiv.className = 'new-item';
newDiv.textContent = '新创建的内容';

// 追加到父元素末尾
parentElement.appendChild(newDiv);

// 插入到指定元素之前
parentElement.insertBefore(newDiv, referenceElement);

// 替换已有元素
parentElement.replaceChild(newDiv, oldElement);

// 移除元素
parentElement.removeChild(oldDiv);
// 或直接调用（更简洁）
oldDiv.remove();

// ===== 属性操作 =====
element.getAttribute('data-id');       // 获取属性值
element.setAttribute('data-id', '100'); // 设置属性值
element.removeAttribute('data-id');     // 移除属性
element.hasAttribute('hidden');         // 检查是否存在
```

### 2.4 HTML 实体（字符转义）

某些字符在 HTML 中有特殊含义，需要使用实体（Entity）进行转义：

| 显示结果 | 实体名称 | 实体编号 | 说明 |
|----------|----------|----------|------|
| `<` | `&lt;` | `&#60;` | 小于号（标签起始符） |
| `>` | `&gt;` | `&#62;` | 大于号（标签结束符） |
| `&` | `&amp;` | `&#38;` | 和号（实体起始符） |
| `"` | `&quot;` | `&#34;` | 双引号（属性值定界符） |
| `'` | `&apos;` | `&#39;` | 单引号 |
| `©` | `&copy;` | `&#169;` | 版权符号 |
| `®` | `&reg;` | `&#174;` | 注册商标 |
| ` ` | `&nbsp;` | `&#160;` | 不换行空格 |
| `¥` | `&yen;` | `&#165;` | 人民币/日元符号 |

```html
<!-- 实体使用场景示例 -->
<p>使用 &lt;div&gt; 标签创建块级元素</p>
<p>价格: &yen;99.00 &copy; 2026 公司名</p>
<p>公式: a &lt; b &amp;&amp; b &lt; c</p>
<!-- 不换行空格常用于保持格式 -->
<pre>Hello&nbsp;&nbsp;&nbsp;World</pre>
```

---

## 第3章 HTML 语义化

### 3.1 为什么需要语义化

```
语义化的价值链
═══════════════════════════════════════

  ┌─────────────────────────────────────────────┐
  │              语义化 HTML 标签                  │
  │                                             │
  │  ┌─────────┐  ┌─────────┐  ┌─────────┐      │
  │  │  可访问性 │  │   SEO   │  │  可维护性 │      │
  │  │ (A11y)  │  │(搜索引擎)│  │ (代码)   │      │
  │  └────┬────┘  └────┬────┘  └────┬────┘      │
  │       │            │            │            │
  │       ▼            ▼            ▼            │
  │  屏幕阅读器    搜索引擎爬虫    开发者协作      │
  │  正确朗读      理解页面结构    代码自解释      │
  │                                             │
  └─────────────────────────────────────────────┘

═══════════════════════════════════════
```

| 维度 | 非语义化写法 | 语义化写法 | 效果差异 |
|------|-------------|-----------|----------|
| 导航区域 | `<div class="nav">` | `<nav>` | 屏幕阅读器可直接跳转到导航区 |
| 主要内容 | `<div class="main">` | `<main>` | 明确标识页面主内容，利于 SEO |
| 文章内容 | `<div class="post">` | `<article>` | 搜索引擎识别为独立内容单元 |
| 侧边栏 | `<div class="sidebar">` | `<aside>` | 辅助内容与主内容分离 |
| 页脚 | `<div class="footer">` | `<footer>` | 统一识别为页脚区域 |

### 3.2 HTML5 语义化标签详解

```html
<body>

    <!-- ==================== 页面头部 ==================== -->
    <!-- header: 页面或区块的页眉，通常包含 logo、搜索、导航 -->
    <header class="site-header">
        <a href="/" class="logo">
            <!-- 图片应始终包含有意义的 alt 文本 -->
            <img src="logo.svg" alt="公司 Logo">
        </a>

        <!-- nav: 导航链接区域（一个页面可有多个 nav） -->
        <nav aria-label="主导航">
            <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/products">产品</a></li>
                <li><a href="/about">关于我们</a></li>
                <li><a href="/contact">联系我们</a></li>
            </ul>
        </nav>
    </header>
    <!-- ==================== 页面主体 ==================== -->
    <!-- main: 页面的主要内容区域（每个页面只能有一个 main） -->
    <main>

        <!-- article: 独立的、完整的内容单元 -->
        <!-- 适用场景: 博客文章、新闻条目、论坛帖子、用户评论 -->
        <article class="blog-post">

            <!-- 文章头部 -->
            <header>
                <h1>深入理解 HTML5 语义化</h1>
                <!-- time: 机器可读的时间/日期 -->
                <time datetime="2026-06-15">2026年6月15日</time>
                <!-- datetime 属性提供标准格式供程序读取 -->
                <address>
                    作者: <a href="mailto:author@example.com">张三</a>
                </address>
            </header>

            <!-- section: 对内容进行主题分组 -->
            <!-- 应包含标题（h1-h6），表示一个主题章节 -->
            <section>
                <h2>什么是语义化</h2>
                <p>语义化指的是使用含义明确的 HTML 标签来构建页面结构...</p>
            </section>

            <section>
                <h2>为什么重要</h2>
                <p>语义化标签让机器（搜索引擎、屏幕阅读器）更好地理解内容...</p>
            </section>

            <!-- figure + figcaption: 独立的图文组合 -->
            <figure>
                <img src="diagram.png" alt="语义化标签嵌套关系示意图">
                <!-- figcaption: 图表的标题/说明文字 -->
                <figcaption>图1: HTML5 语义化标签嵌套关系</figcaption>
            </figure>

            <!-- 文章底部 -->
            <footer>
                <p>发布于 <time datetime="2026-06-15T10:30">上午 10:30</time></p>
                <!-- 标签列表 -->
                <ul>
                    <li><a href="/tag/html5" rel="tag">HTML5</a></li>
                    <li><a href="/tag/a11y" rel="tag">可访问性</a></li>
                </ul>
            </footer>
        </article>
        <!-- aside: 与主内容间接相关的辅助信息 -->
        <!-- 典型用途: 侧边栏、广告位、相关链接、引用框 -->
        <aside class="sidebar">
            <section>
                <h3>相关文章</h3>
                <ul>
                    <li><a href="#">CSS Grid 完全指南</a></li>
                    <li><a href="#">Flexbox 布局详解</a></li>
                </ul>
            </section>

            <!-- mark: 高亮/标记文本（默认黄色背景） -->
            <p>最新更新: <mark>CSS Container Queries 已正式支持</mark></p>
        </aside>

    </main>
    <!-- ==================== 页面底部 ==================== -->
    <!-- footer: 页面或区块的页脚 -->
    <footer class="site-footer">
        <p>&copy; 2026 公司名称. 保留所有权利。</p>
        <!-- details + summary: 可折叠的详情区域 -->
        <details>
            <summary>网站地图</summary>
            <nav aria-label="网站地图">
                <ol>
                    <li><a href="/about">关于</a></li>
                    <li><a href="/privacy">隐私政策</a></li>
                    <li><a href="/terms">服务条款</a></li>
                </ol>
            </nav>
        </details>
    </footer>

</body>
```

### 3.3 语义化标签使用规则

| 标签 | 使用场景 | 嵌套限制 | 注意事项 |
|------|----------|----------|----------|
| `<header>` | 页面/区块的头部 | 不能嵌套在 `footer`/`address` 中 | 一个区块可有多个 header |
| `<nav>` | 主要导航区域 | 不应用于所有链接组 | 只用于主要导航，不是所有 `<ul>` 都要包 `<nav>` |
| `<main>` | 页面主体内容 | **整个页面仅允许一个** | 不能是 `article`/`aside`/`header`/`footer`/`nav` 的后代 |
| `<article>` | 独立完整的内容 | 可嵌套（如评论中的评论） | 内容脱离上下文仍应有意义 |
| `<section>` | 按主题对内容分组 | **应包含标题** (`h1`-`h6`) | 不要滥用，不要只为了加样式而用 |
| `<aside>` | 间接相关的辅助内容 | 通常与主内容并列 | 不是所有侧边栏都必须用 aside |
| `<footer>` | 页面/区块的底部 | 不能嵌套在 `header`/`address` 中 | 可包含作者、版权、联系方式 |
| `<figure>` | 独立的图表/插图/代码 | 配合 `<figcaption>` 使用 | 从正文流中移除不影响理解 |
| `<time>` | 日期/时间 | **必须有 `datetime` 属性** | 让机器可读时间格式 |
| `<details>/<summary>` | 可折叠内容 | `summary` 必须是 `details` 的第一个子元素 | 天然的交互组件，无需 JS |
| `<mark>` | 高亮/标记文本 | 行内元素 | 用于搜索结果高亮、重点标注 |

### 3.4 ARIA 可访问性增强

当原生语义不足以表达复杂交互时，使用 ARIA（Accessible Rich Internet Applications）属性补充：

```html
<!-- ===== ARIA 三大核心类别 ===== -->

<!-- 1. Roles（角色）: 定义元素是什么 -->
<nav role="navigation" aria-label="主导航">
    <ul>
        <li><a href="/" aria-current="page">首页</a></li>
        <!-- aria-current: 表示当前激活/选中的项 -->
        <li><a href="/products">产品</a></li>
    </ul>
</nav>

<!-- 2. Properties（属性）: 描述元素的状态或特征 -->
<button aria-expanded="false" aria-controls="menu-panel">
    打开菜单
    <!-- aria-expanded: 展开/折叠状态（JS 动态切换） -->
    <!-- aria-controls: 关联被控制的元素 ID -->
</button>
<div id="menu-panel" hidden>
    菜单内容...
</div>

<!-- 3. States（状态）: 描述元素的瞬时状态 -->
<div role="alert" aria-live="polite">
    <!-- aria-live: 区域内容变化时通知屏幕阅读器 -->
    <!-- polite: 等用户空闲后再播报 -->
    <!-- assertive: 立即打断当前播报（慎用） -->
    操作成功！您的更改已保存。
</div>

<form>
    <!-- label 关联 input 的两种方式 -->
    <!-- 方式一: 显式关联（推荐）-->
    <label for="username">用户名:</label>
    <input type="text" id="username"
           aria-required="true"       <!-- 必填状态 -->
           aria-invalid="false"       <!-- 验证状态（JS 动态更新） -->
           aria-describedby="username-help">
    <!-- aria-describedby: 关联额外说明文字 -->

    <small id="username-help">用户名为 3-20 个字符</small>

    <!-- 方式二: 隐式关联 -->
    <label>
        密码:
        <input type="password" aria-required="true">
    </label>
</form>

<!-- ===== 常用 ARIA Landmark 角色 ===== -->
<body>
    <header role="banner">...</header>           <!-- 页眉横幅 -->
    <nav role="navigation">...</nav>             <!-- 导航 -->
    <main role="main">...</main>                 <!-- 主内容 -->
    <aside role="complementary">...</aside>      <!-- 补充内容 -->
    <form role="search">...</form>               <!-- 搜索 -->
    <footer role="contentinfo">...</footer>      <!-- 版权/联系信息 -->
</body>
```

#### ARIA 使用原则（第一法则）

> **只在必要时使用 ARIA。** 如果原生 HTML 标签已经能表达正确的语义和交互，就不要添加 ARIA 属性。
>
> ❌ 错误: `<div role="button" onclick="...">点击</div>`
>
> ✅ 正确: `<button onclick="...">点击</button>`

### 3.5 语义化与 SEO 影响

| SEO 因素 | 语义化做法 | 搜索引擎收益 |
|----------|-----------|--------------|
| **标题层级** | 合理使用 `h1` > `h2` > `h3`...（不跳跃） | 理解内容权重和结构 |
| **主要关键词** | 用 `<strong>` 而非 `<b>` 强调 | 识别重要词汇 |
| **图片优化** | `alt` 属性填写准确描述 | 图片搜索索引 + 降级展示 |
| **链接文本** | 有意义的锚文本，不用"点击这里" | 理解链接目标内容 |
| **结构化数据** | JSON-LD 格式的 Schema.org 标记 | 富摘要（Rich Snippets）展示 |
| **内容独立性** | `<article>` 包裹独立内容 | 可被聚合/引用/索引 |
| **时间信息** | `<time datetime="">` | 时间感知搜索结果 |

```html
<!-- 结构化数据示例: 使用 JSON-LD 标记文章 -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "深入理解 HTML5 语义化",
    "author": {
        "@type": "Person",
        "name": "张三"
    },
    "datePublished": "2026-06-15",
    "description": "全面介绍 HTML5 语义化标签的使用方法和最佳实践"
}
</script>
```

---

## 第4章 HTML 表单与多媒体

### 4.1 表单元素详解

```
表单工作流程
═══════════════════════════════════════

  用户输入 ──► 数据收集(form) ──► 验证(validation) ──► 提交(submit)
       │              │                    │               │
       │              │                    │               ▼
       │              │                    │         服务器处理
       │              │                    │         (GET/POST)
       │              │                    │
       │              │                    ▼
       │              │            客户端验证失败
       │              │            → 显示错误提示
       │              │
       ▼              ▼
  各种 input 类型   form 收集所有字段值

═══════════════════════════════════════
```

#### 基础表单结构

```html
<!--
    form 表单的核心属性:
    - action: 提交目标 URL
    - method: HTTP 方法（GET 或 POST）
    - enctype: 编码类型（上传文件时需 multipart/form-data）
    - novalidate: 禁用浏览器原生验证
    - autocomplete: 自动补全开关
-->
<form action="/api/submit"
      method="POST"
      enctype="multipart/form-data"
      autocomplete="on"
      id="registration-form">

    <!-- ===== 字段集: 对表单控件进行分组 ===== -->
    <fieldset>
        <!-- legend: 分组的标题 -->
        <legend>基本信息</legend>

        <!-- 文本输入 -->
        <div class="form-group">
            <!-- label 的 for 属性必须与 input 的 id 一致 -->
            <label for="username">用户名 <span aria-label="必填">*</span></label>
            <!--
                input 属性详解:
                - type: 输入类型（决定键盘样式和验证规则）
                - id: 唯一标识（供 label 关联和 CSS/JS 使用）
                - name: 提交时的字段名（发送给服务器）
                - required: 必填验证
                - minlength/maxlength: 长度限制
                - pattern: 正则表达式验证
                - placeholder: 占位提示文字（不应替代 label）
                - autocomplete: 自动补全提示（off/on/具体 token）
            -->
            <input type="text"
                   id="username"
                   name="username"
                   required
                   minlength="3"
                   maxlength="20"
                   pattern="[a-zA-Z0-9_]+"
                   autocomplete="username"
                   placeholder="3-20个字母数字">
            <!-- 验证反馈区域 -->
            <span class="error-message" aria-live="polite"></span>
        </div>

        <!-- 邮箱输入（自带邮箱格式验证） -->
        <div class="form-group">
            <label for="email">电子邮箱</label>
            <input type="email"
                   id="email"
                   name="email"
                   required
                   autocomplete="email">
        </div>

        <!-- 密码输入（字符自动遮蔽） -->
        <div class="form-group">
            <label for="password">密码</label>
            <input type="password"
                   id="password"
                   name="password"
                   required
                   minlength="8"
                   autocomplete="new-password">
        </div>

        <!-- 数字输入（带步进按钮） -->
        <div class="form-group">
            <label for="age">年龄</label>
            <input type="number"
                   id="age"
                   name="age"
                   min="1"
                   max="120"
                   step="1"
                   value="18">
        </div>

        <!-- 日期选择器 -->
        <div class="form-group">
            <label for="birthday">出生日期</label>
            <input type="date"
                   id="birthday"
                   name="birthday"
                   max="2026-06-15">
        </div>

        <!-- 电话号码 -->
        <div class="form-group">
            <label for="phone">手机号码</label>
            <input type="tel"
                   id="phone"
                   name="phone"
                   pattern="1[3-9]\d{9}"
                   placeholder="请输入11位手机号">
        </div>

        <!-- URL 输入 -->
        <div class="form-group">
            <label for="website">个人网站</label>
            <input type="url"
                   id="website"
                   name="website"
                   placeholder="https://">
        </div>

        <!-- 搜索框（带清除按钮，Enter 触发提交） -->
        <div class="form-group">
            <label for="search">搜索</label>
            <input type="search"
                   id="search"
                   name="q"
                   autocomplete="off">
        </div>
    </fieldset>

    <fieldset>
        <legend>其他信息</legend>

        <!-- 单选按钮组（同一 name 为一组） -->
        <div class="form-group">
            <label>性别</label>
            <!-- 每个 radio 需要独立 label -->
            <label><input type="radio" name="gender" value="male" checked> 男</label>
            <label><input type="radio" name="gender" value="female"> 女</label>
            <label><input type="radio" name="gender" value="other"> 其他</label>
        </div>

        <!-- 复选框组 -->
        <div class="form-group">
            <label>兴趣爱好</label>
            <label><input type="checkbox" name="hobbies" value="reading"> 阅读</label>
            <label><input type="checkbox" name="hobbies" value="sports"> 运动</label>
            <label><input type="checkbox" name="hobbies" value="music"> 音乐</label>
            <!-- indeterminate: 半选中状态（只能通过 JS 设置） -->
            <label><input type="checkbox" name="hobbies" value="other"> 其他</label>
        </div>

        <!-- 下拉选择 -->
        <div class="form-group">
            <label for="province">省份</label>
            <select id="province" name="province" required>
                <!-- placeholder 选项（disabled + selected） -->
                <option value="" disabled selected>请选择省份</option>
                <option value="beijing">北京</option>
                <option value="shanghai">上海</option>
                <option value="guangdong">广东</option>
                <!-- optgroup: 选项分组 -->
                <optgroup label="其他地区">
                    <option value="zhejiang">浙江</option>
                    <option value="jiangsu">江苏</option>
                </optgroup>
            </select>
        </div>

        <!-- 多行文本域 -->
        <div class="form-group">
            <label for="bio">自我介绍</label>
            <textarea id="bio"
                      name="bio"
                      rows="4"
                      cols="50"
                      maxlength="500"
                      placeholder="最多500字"></textarea>
            <!-- 字数统计可通过 JS 实现 -->
        </div>

        <!-- 文件上传 -->
        <div class="form-group">
            <label for="avatar">头像上传</label>
            <!-- accept: 限制文件类型；multiple: 允许多选 -->
            <input type="file"
                   id="avatar"
                   name="avatar"
                   accept="image/png,image/jpeg,image/gif"
                   capture="environment">
            <!-- capture: 调用设备摄像头
                 user: 前置摄像头
                 environment: 后置摄像头
            -->
        </div>

        <!-- 范围滑块 -->
        <div class="form-group">
            <label for="volume">音量: <output id="volume-output">50</output>%</label>
            <input type="range"
                   id="volume"
                   name="volume"
                   min="0"
                   max="100"
                   value="50"
                   oninput="document.getElementById('volume-output').value = this.value">
        </div>

        <!-- 颜色选择器 -->
        <div class="form-group">
            <label for="theme-color">主题色</label>
            <input type="color" id="theme-color" name="theme-color" value="#3498db">
        </div>

        <!-- 隐藏字段（不向用户展示但需随表单提交的数据） -->
        <input type="hidden" name="csrf_token" value="abc123xyz">
    </fieldset>

    <!-- ===== 表单按钮 ===== -->

    <!-- submit: 提交按钮（触发表单提交事件） -->
    <button type="submit">注册</button>

    <!-- reset: 重置按钮（将所有字段恢复到初始值） -->
    <button type="reset">重置</button>

    <!-- button: 普通按钮（默认行为，不触发表单提交） -->
    <button type="button" onclick="handlePreview()">预览</button>

    <!-- image: 图像提交按钮（点击坐标会一同提交） -->
    <!-- <input type="image" src="submit.png" alt="提交"> -->

</form>
```

### 4.2 Input 类型完整对照表

| 类型 | `type` 值 | UI 表现 | 内置验证 | 移动端键盘 | 典型用途 |
|------|-----------|---------|----------|------------|----------|
| 单行文本 | `text` | 文本框 | 无 | 标准键盘 | 通用文本输入 |
| 密码 | `password` | 遮蔽文本框 | 无 | 标准键盘 | 密码输入 |
| 邮箱 | `email` | 带 `@` 的文本框 | ✅ 邮箱格式 | 邮箱键盘 | 注册/登录 |
| 搜索 | `search` | 带 ✕ 清除按钮 | 无 | 搜索键盘 | 搜索框 |
| 电话 | `tel` | 文本框 | 无 | 数字电话键盘 | 手机号 |
| URL | `url` | 文本框 | ✅ URL 格式 | URL 键盘 | 网站地址 |
| 数字 | `number` | 带 ± 步进按钮 | ✅ 数值范围 | 数字键盘 | 年龄、数量 |
| 范围 | `range` | 滑块 | 无 | — | 音量、亮度 |
| 日期 | `date` | 日期选择器 | ✅ 有效日期 | 日期键盘 | 出生日期 |
| 时间 | `time` | 时间选择器 | ✅ 有效时间 | 时间键盘 | 预约时间 |
| 日期时间本地 | `datetime-local` | 日期+时间选择器 | ✅ 有效 | 日期时间键盘 | 预约 |
| 月 | `month` | 年月选择器 | ✅ 有效月份 | — | 信用卡到期日 |
| 周 | `week` | 年周选择器 | ✅ 有效周 | — | 周报 |
| 颜色 | `color` | 颜色拾取器 | ✅ 十六进制 | — | 主题色 |
| 文件 | `file` | 文件选择按钮 | accept 限制 | — | 头像上传 |
| 隐藏 | `hidden` | 不可见 | — | — | CSRF Token |
| 复选框 | `checkbox` | ☐ 方框 | — | — | 多选 |
| 单选 | `radio` | ○ 圆形 | — | — | 单选 |
| 按钮 | `button` | 按钮 | — | — | 自定义按钮 |
| 图像提交 | `image` | 可点击图片 | — | — | 图形提交 |
| 重置 | `reset` | 重置按钮 | — | — | 清空表单 |
| 提交 | `submit` | 提交按钮 | — | — | 表单提交 |

### 4.3 表单验证机制

```html
<!-- ===== HTML5 原生验证属性汇总 ===== -->

<form id="demo-form" novalidate>
    <!-- novalidate: 禁用浏览器默认验证弹窗，
         改用自定义验证 UI（推荐做法）-->

    <!-- 1. required: 必填 -->
    <input type="text" required>

    <!-- 2. minlength / maxlength: 长度限制 -->
    <input type="text" minlength="3" maxlength="20">

    <!-- 3. min / max: 数值/日期范围 -->
    <input type="number" min="0" max="100">
    <input type="date" min="2020-01-01" max="2026-12-31">

    <!-- 4. pattern: 正则表达式验证 -->
    <input type="text"
           pattern="^[A-Z][A-Za-z\s]*$"
           title="首字母大写的英文名称">
    <!-- title: 验证失败时显示的自定义提示 -->

    <!-- 5. step: 步进值（配合 number/range/date） -->
    <input type="number" min="0" max="10" step="0.5">
    <!-- 只能输入: 0, 0.5, 1, 1.5, ... , 10 -->

    <!-- 6. 多条件组合验证 -->
    <input type="text"
           required
           minlength="6"
           pattern="[a-zA-Z0-9]+"
           title="6位以上字母数字组合">

    <!-- 7. 伪类选择器: 用于验证状态的样式控制 -->
</form>
```

```css
/* ===== 表单验证伪类样式 ===== */

/* 有效状态（通过所有验证规则） */
input:valid {
    border-color: #27ae60;  /* 绿色边框 */
}

/* 无效状态（未通过任一验证规则） */
input:invalid {
    border-color: #e74c3c;  /* 红色边框 */
}

/* 必填但为空的状态 */
input:required:empty {
    /* 仅样式，不触发验证 */
}

/* 可选且有值的状态 */
input:optional:valid {
    /* 可选字段已填写且合法 */
}

/* 占位符正在显示的状态 */
input:placeholder-shown {
    /* 用户尚未输入任何内容 */
}

/* 用户焦点在输入框内 */
input:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
}

/* 推荐写法: 仅在有值时才显示验证状态，避免初始就变红 */
input:not(:placeholder-shown):invalid {
    border-color: #e74c3c;
}

input:not(:placeholder-shown):valid {
    border-color: #27ae60;
}
```

```javascript
// ===== JavaScript 表单验证 API =====

const form = document.getElementById('demo-form');

// 监听表单提交事件
form.addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止默认提交行为

    // 方法1: checkValidity() - 检查整个表单是否全部有效
    if (!form.checkValidity()) {
        // 方法2: reportValidity() - 显示浏览器内置的验证提示
        form.reportValidity();
        return;
    }

    // 方法3: 单个字段的验证
    const emailInput = document.getElementById('email');

    // validity 对象包含详细的验证状态
    console.log(emailInput.validity);
    /*
        ValidityState 对象属性:
        - valid:           是否完全有效
        - valueMissing:    是否违反 required
        - typeMismatch:    是否类型不匹配（如 email/url）
        - patternMismatch: 是否不符合正则
        - tooShort:        是否过短（minlength）
        - tooLong:         是否过长（maxlength）
        - rangeUnderflow:  是否小于 min
        - rangeOverflow:   是否大于 max
        - stepMismatch:    是否不符合 step
        - customError:     是否有自定义错误
    */

    // 设置自定义错误消息
    if (!emailInput.validity.valid) {
        if (emailInput.validity.valueMissing) {
            emailInput.setCustomValidity('请输入邮箱地址');
        } else if (emailInput.validity.typeMismatch) {
            emailInput.setCustomValidity('请输入有效的邮箱格式');
        } else {
            emailInput.setCustomValidity('');
        }

        // 显示错误消息
        emailInput.reportValidity();
    } else {
        emailInput.setCustomValidity(''); // 清除自定义错误
    }

    // 验证通过后执行提交逻辑
    submitFormData(formData);
});

// Constraint Validation API 还支持:
// - element.willValidate: 该元素是否会被验证
// - element.validationMessage: 当前验证消息字符串
```

### 4.4 多媒体标签

#### Video 视频

```html
<!--
    video 核心属性:
    - controls: 显示播放控制器
    - autoplay: 自动播放（多数浏览器要求 muted 才能自动播放）
    - muted: 静音
    - loop: 循环播放
    - poster: 封面图片（视频加载前显示）
    - preload: 预加载策略（none/metadata/auto）
    - playsinline: 内联播放（iOS 必须）
    - width/height: 播放器尺寸
-->
<video id="my-video"
       controls
       width="640"
       height="360"
       poster="cover.jpg"
       preload="metadata"
       playsinline>

    <!-- source: 提供多格式兼容方案 -->
    <!-- MP4: 兼容性最好（H.264 编码）-->
    <source src="video.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>

    <!-- WebM: 开源格式，质量更好（VP9/AV1 编码）-->
    <source src="video.webm" type='video/webm; codecs="vp9, vorbis"'>

    <!-- 降级内容: 浏览器不支持 video 时显示 -->
    <p>您的浏览器不支持 HTML5 视频播放。
       <a href="video.mp4">下载视频</a>
    </p>
</video>

<!-- 字幕/字幕轨（WebVTT 格式） -->
<video controls>
    <source src="movie.mp4" type="video/mp4">
    <!-- track: 字幕/章节/描述轨 -->
    <track kind="subtitles"
           src="subtitles-zh.vtt"
           srclang="zh"
           label="中文字幕"
           default>
    <track kind="subtitles"
           src="subtitles-en.vtt"
           srclang="en"
           label="English Subtitles">
</video>
```

#### Audio 音频

```html
<audio controls loop preload="auto">
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    您的浏览器不支持音频播放。
</audio>
```

#### Canvas 画布

```html
<!-- canvas: 通过 JavaScript 进行像素级绑图的画布 -->
<canvas id="game-canvas" width="800" height="600">
    <!-- 降级内容 -->
    您的浏览器不支持 Canvas
</canvas>

<script>
    // 步骤1: 获取 canvas 元素和 2D 绑图上下文
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d'); // 获取 2D 渲染上下文

    // 步骤2: 绘制矩形（填充）
    ctx.fillStyle = '#3498db';        // 设置填充颜色
    ctx.fillRect(50, 50, 200, 100);   // fillRect(x, y, width, height)

    // 步骤3: 绘制矩形（描边）
    ctx.strokeStyle = '#e74c3c';       // 设置描边颜色
    ctx.lineWidth = 3;                 // 线条宽度
    ctx.strokeRect(300, 50, 200, 100); // strokeRect(x, y, w, h)

    // 步骤4: 绘制圆形/弧线
    ctx.beginPath();                    // 开始新路径
    ctx.arc(150, 300, 50, 0, Math.PI * 2); // arc(x, y, r, startAngle, endAngle)
    ctx.fillStyle = '#27ae60';
    ctx.fill();                         // 填充路径

    // 步骤5: 绘制文本
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText('Hello Canvas!', 350, 310); // fillText(text, x, y)

    // 步骤6: 绘制图像
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 500, 250, 150, 100); // drawImage(img, x, y, w, h)
    };
    img.src = 'image.png';

    // 步骤7: 渐变色
    const gradient = ctx.createLinearGradient(0, 0, 200, 0); // 线性渐变
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, '#9b59b6');
    ctx.fillStyle = gradient;
    ctx.fillRect(50, 400, 200, 80);
</script>
```

#### SVG 矢量图形

```html
<!--
    SVG vs Canvas 对比:
    - SVG: 矢量图形，基于 DOM，可缩放不失真，适合图标/图表/简单图形
    - Canvas: 位图画布，基于像素，适合游戏/图像处理/复杂数据可视化
-->
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <!-- viewBox: 定义坐标系和可视区域（实现响应式缩放的关键） -->

    <!-- 圆形 -->
    <circle cx="100" cy="100" r="80"
            fill="#3498db"
            stroke="#2980b9"
            stroke-width="4"/>

    <!-- 矩形 -->
    <rect x="40" y="40" width="120" height="120"
          rx="10" ry="10"          <!-- 圆角半径 -->
          fill="#ffffff"
          fill-opacity="0.9"/>

    <!-- 文本 -->
    <text x="100" y="108"
          text-anchor="middle"     <!-- 水平居中 -->
          dominant-baseline="middle" <!-- 垂直居中 -->
          font-size="24"
          font-weight="bold"
          fill="#2c3e50">
        SVG
    </text>
</svg>
```

#### Picture 响应式图片

```html
<!--
    picture: 响应式图片容器
    根据 media 条件或格式支持情况加载不同的图片源
-->
<picture>
    <!-- source: 图片源（从上到下匹配，命中第一个即停止） -->

    <!-- 大屏: 加载宽屏图片 -->
    <source media="(min-width: 1200px)"
            srcset="hero-large.jpg 1920w"
            sizes="100vw">

    <!-- 中屏: 加载中等尺寸 -->
    <source media="(min-width: 768px)"
            srcset="hero-medium.jpg 1024w"
            sizes="100vw">

    <!-- 小屏: 加载小尺寸 -->
    <source media="(min-width: 480px)"
            srcset="hero-small.jpg 640w"
            sizes="100vw">

    <!-- 默认回退: img 标签（必须提供） -->
    <img src="hero-default.jpg"
         alt="网站主视觉横幅"
         loading="lazy"
         width="1920"
         height="600">
    <!-- width/height 属性可防止布局偏移（CLS） -->
</picture>

<!--
    srcset + sizes 的另一种用法（不带 picture）:
    - srcset: 描述图片的可用尺寸及其真实宽度（w 描述符）
    - sizes: 告诉浏览器该图片在不同视口下的预期显示尺寸
-->
<img src="photo-400.jpg"
     srcset="photo-400.jpg 400w,
             photo-800.jpg 800w,
             photo-1200.jpg 1200w"
     sizes="(max-width: 600px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
     alt="响应式图片示例"
     loading="lazy">
```

---

## 第5章 CSS 基础

### 5.1 CSS 引入方式

```html
<!-- 方式1: 外部样式表（推荐，生产环境首选） -->
<link rel="stylesheet" href="styles.css">

<!-- 方式2: 内部样式表（单个页面使用） -->
<style>
    .local-style { color: red; }
</style>

<!-- 方式3: 内联样式（优先级最高，尽量避免） -->
<div style="color: blue;">内联样式</div>

<!-- 方式4: @import 导入（在外部 CSS 文件中使用，不推荐——阻塞渲染） -->
<!-- @import url('other.css'); -->
```

| 引入方式 | 作用域 | 优先级 | 缓存 | 适用场景 |
|----------|--------|--------|------|----------|
| 外部样式表 | 全站/多页面 | 低 | ✅ 可缓存 | 生产环境首选 |
| 内部样式表 | 单个页面 | 中 | ❌ 不可缓存 | 单页应用、邮件模板 |
| 内联样式 | 单个元素 | **最高** | ❌ 不可缓存 | 动态样式、JS 控制、紧急修复 |
| `@import` | 取决于位置 | 低 | ✅ | **不推荐**（额外的 HTTP 请求，阻塞渲染） |

### 5.2 选择器体系

```
CSS 选择器优先级金字塔
═══════════════════════════════════════

                    ┌──────────────┐
                    │   !important  │  ← 权重最高（慎用！）
                    │  (1,0,0,0,0) │
                    └──────┬───────┘
                           │
              ┌────────────▼────────────┐
              │     行内样式 (style="")  │  (1,0,0,0)
              └────────────┬────────────┘
                           │
         ┌─────────────────▼─────────────────┐
         │           ID 选择器 (#id)           │  (0,1,0,0)
         └─────────────────┬─────────────────┘
                           │
    ┌──────────────────────▼──────────────────────┐
    │  类选择器/属性选择器/伪类 (.class [:attr])  │  (0,0,1,0)
    └──────────────────────┬──────────────────────┘
                           │
 ┌─────────────────────────▼─────────────────────────┐
│           元素选择器/伪元素 (div ::before)          │  (0,0,0,1)
 └─────────────────────────┬─────────────────────────┘
                          │
                 ┌────────▼────────┐
                 │   通配符 (*)     │  (0,0,0,0)
                 └─────────────────┘

═══════════════════════════════════════
```

#### 选择器分类详解

```css
/* ==========================================
   第一部分: 基础选择器
   ========================================== */

/* 通配符选择器 —— 匹配所有元素（慎用，性能差） */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* 统一盒模型 */
}

/* 元素选择器 —— 按标签名匹配 */
p { line-height: 1.6; }
h1, h2, h3 { font-family: sans-serif; }

/* 类选择器 —— 按 class 匹配（最常用，可复用） */
.card { background: white; border-radius: 8px; }
.card.highlight { border: 2px solid gold; } /* 多类选择器 */

/* ID 选择器 —— 按 id 匹配（唯一性，优先级高，少用） */
#header-main { position: sticky; top: 0; }
/* ==========================================
   第二部分: 关系选择器（组合器）
   ========================================== */

/* 后代选择器（空格）—— 匹配所有后代元素 */
.nav a { color: blue; }
/* .nav 下所有层级的 a 元素都会被选中 */

/* 子代选择器（>）—— 只匹配直接子元素 */
.nav > ul > li { display: inline-block; }
/* 只选中 .nav 的直接子 ul 的直接子 li */

/* 相邻兄弟选择器（+）—— 紧邻的下一个兄弟元素 */
h2 + p { margin-top: 0; }
/* 紧跟在 h2 后面的第一个 p 元素 */

/* 通用兄弟选择器（~）—— 之后的所有同级兄弟元素 */
h2 ~ p { color: gray; }
/* h2 之后的所有 p 兄弟元素 */
/* ==========================================
   第三部分: 属性选择器
   ========================================== */

/* [attr]: 存在该属性 */
[disabled] { opacity: 0.6; cursor: not-allowed; }

/* [attr=value]: 属性值精确匹配 */
[type="text"] { border: 1px solid #ccc; }

/* [attr~=value]: 属性值包含该词（词列表中的一项） */
[class~="active"] { font-weight: bold; }

/* [attr^=value]: 属性值以指定字符串开头 */
[href^="https://"]::after { content: ' 🔒'; }

/* [attr$=value]: 属性值以指定字符串结尾 */
[href$=".pdf"]::after { content: ' 📄'; }

/* [attr*=value]: 属性值包含指定字符串 */
[class*="card"] { border: 1px solid #eee; }

/* [attr|=value]: 属性值等于或以 value- 开头（用于语言代码） */
[lang|="zh"] { font-family: "PingFang SC", sans-serif; }
/* ==========================================
   第四部分: 伪类选择器（Pseudo-Classes）
   ========================================== */

/* ----- 用户交互伪类 ----- */
a:hover { color: red; }           /* 鼠标悬停 */
a:active { transform: scale(0.98); } /* 点击按下 */
a:focus { outline: 2px solid blue; } /* 键盘聚焦 */
/* :focus-visible: 仅在键盘导航时显示焦点环（推荐替代 :focus） */
button:focus-visible { outline: 3px solid #3498db; }

/* ----- 链接状态伪类（LVHA 顺序很重要!）----- */
/* Link → Visited → Hover → Active */
a:link { color: blue; }      /* 未访问的链接 */
a:visited { color: purple; } /* 已访问的链接 */
a:hover { text-decoration: underline; }
a:active { color: red; }

/* ----- 结构伪类 ----- */
/* :first-child: 父元素的第一个子元素 */
li:first-child { font-weight: bold; }

/* :last-child: 父元素的最后一个子元素 */
li:last-child { border-bottom: none; }

/* :nth-child(n): 第 n 个子元素（n 从 1 开始）*/
li:nth-child(odd) { background: #f9f9f9; }  /* 奇数行 */
li:nth-child(even) { background: #fff; }    /* 偶数行 */
li:nth-child(3n) { color: red; }            /* 每 3 个 */
li:nth-child(-n+3) { /* 前 3 个 */ }

/* :nth-of-type(n): 同类型兄弟中的第 n 个 */
p:nth-of-type(2) { font-size: 1.2em; }

/* :not(): 否定伪类（排除匹配） */
input:not([type="submit"]) { border: 1px solid #ccc; }

/* :only-child: 唯一子元素 */
li:only-child { list-style: none; }

/* :empty: 没有子元素的元素 */
.sidebar-widget:empty { display: none; }

/* :checked: 被选中的 radio/checkbox */
input:checked + label { font-weight: bold; }

/* :enabled / :disabled: 表单控件的启用/禁用状态 */
input:disabled { background: #eee; }

/* ----- 目标伪类 ----- */
/* :target: URL hash (#id) 指向的元素 */
.section:target { animation: highlight 1s; }
/* ==========================================
   第五部分: 伪元素（Pseudo-Elements）
   ========================================== */

/* ::before: 元素内容之前插入生成内容 */
.card::before {
    content: '';               /* content 属性是必须的 */
    display: block;
    width: 4px;
    height: 100%;
    background: #3498db;
    position: absolute;
    left: 0;
    top: 0;
}

/* ::after: 元素内容之后插入生成内容 */
.clearfix::after {
    content: '';
    display: table;
    clear: both; /* 清除浮动的经典用法 */
}

/* ::first-line: 元素的第一行文本 */
p.intro::first-line {
    font-weight: bold;
    color: #333;
}

/* ::first-letter: 元素的第一个字母 */
.drop-cap::first-letter {
    float: left;
    font-size: 3em;
    line-height: 1;
    margin-right: 8px;
}

/* ::selection: 用户选中文本的样式 */
::selection {
    background: #3498db;
    color: white;
}
/* ==========================================
   第六部分: CSS 新增高级选择器（Level 4）
   ========================================== */

/* :is() —— 选择器列表简写（取其中优先级最高的） */
/* 原来: .header a:hover, .footer a:hover, .sidebar a:hover {} */
:is(.header, .footer, .sidebar) a:hover { color: red; }

/* :where() —— 与 :is() 相同，但优先级权重为 0 */
:where(.header, .footer, .sidebar) a { text-decoration: none; }

/* :has() —— 父选择器！（CSS 终于有了父选择器） */
/* 选择包含 img 子元素的 article */
article:has(> img) { border: 1px solid #ddd; }

/* 选择紧邻 input 的 label（input 无效时） */
label:has(+ input:invalid) { color: red; }
```

### 5.3 层叠、继承与优先级

```
CSS 决策流程（Cascade Algorithm）
═══════════════════════════════════════════════════

  多个来源的样式同时作用于同一元素时:

  ┌─────────────────────────────────────────────────┐
  │           Step 1: 收集所有声明                    │
  │  (来自: 作者样式表、用户样式表、浏览器默认样式)      │
  └─────────────────────┬───────────────────────────┘
                        │
                        ▼
  ┌─────────────────────────────────────────────────┐
  │        Step 2: 按 Importance 排序                │
  │                                                  │
  │  ① !important 用户样式  （最高优先级）             │
  │  ② !important 作者样式                            │
  │  ③ !important 浏览器默认                           │
  │  ④ 作者普通样式                                    │
  │  ⑤ 用户普通样式                                   │
  │  ⑥ 浏览器默认样式    （最低优先级）                 │
  └─────────────────────┬───────────────────────────┘
                        │
                        ▼
  ┌─────────────────────────────────────────────────┐
  │        Step 3: 计算Specificity（特异性/优先级）     │
  │                                                  │
  │  权重比较: (a, b, c, d) 四元组逐位比较            │
  │  a = 行内样式                                     │
  │  b = ID 选择器数量                                │
  │  c = 类/属性/伪类选择器数量                        │
  │  d = 元素/伪元素选择器数量                         │
  └─────────────────────┬───────────────────────────┘
                        │
                        ▼
  ┌─────────────────────────────────────────────────┐
  │        Step 4: 源码出现顺序（后来者居上）          │
  │  优先级相同时，后声明的样式覆盖先声明的              │
  └─────────────────────────────────────────────────┘

═══════════════════════════════════════════════════
```

#### 优先级计算实例

```css
/* 优先级计算示例（四元组: inline, id, class/attr/pseudo, element/pseudo）*/

/* (0, 0, 0, 1) —— 1 个元素选择器 */
div { color: black; }

/* (0, 0, 1, 0) —— 1 个类选择器 */
.box { color: blue; }          /* ✓ 胜出: 0,0,1,0 > 0,0,0,1 */

/* (0, 0, 1, 1) —— 1 个类 + 1 个元素 */
.box div { color: green; }

/* (0, 0, 2, 0) —— 2 个类选择器 */
.box.active { color: orange; } /* ✓ 胜出: 0,0,2,0 > 0,0,1,1 */

/* (0, 1, 0, 0) —— 1 个 ID 选择器 */
#main { color: red; }          /* ✓ 胜出: 0,1,0,0 > 0,0,2,0 */

/* (1, 0, 0, 0) —— 行内样式 */
style="color: purple;"          /* ✓ 胜出: 1,0,0,0 > 0,1,0,0 */

/* (1, 0, 0, 0, 0) —— !important（超越一切） */
color: yellow !important;      /* ✓ 最高优先级（但应避免使用）*/
```

#### 继承（Inheritance）

```css
/* 某些属性会自动从父元素继承给子元素 */

body {
    font-family: system-ui, -apple-system, sans-serif; /* 所有子元素继承 */
    font-size: 16px;          /* 继承 */
    color: #333;              /* 继承 */
    line-height: 1.6;         /* 继承 */
}

/* 可继承属性: font-*, color, text-*, line-height,
   letter-spacing, word-spacing, visibility, cursor, list-style-* 等 */

/* 不可继承属性（需显式设置）:
   box-model (margin/padding/border/width/height),
   background, position, display, float, overflow,
   text-decoration (部分) 等 */

/* 强制继承关键字 */
.button {
    /* inherit: 强制继承父元素的值 */
    color: inherit;           /* 按钮文字颜色继承父元素 */

    /* initial: 重置为属性的初始值（CSS 规范定义的默认值） */
    display: initial;         /* 等同于 display: inline */

    /* unset: 继承则继承，否则用 initial */
    font-weight: unset;

    /* revert: 回退到浏览器默认样式（不同于 initial） */
    all: revert;              /* 重置所有属性为浏览器默认 */
}
```

#### 📊 CSS 层叠决策流程图

> 当多个 CSS 规则对同一元素的同一属性声明了不同值时，浏览器按以下流程决定最终使用哪个值。

```
CSS 层叠（Cascade）决策完整流程
═══════════════════════════════════════════════════

  输入: 元素 E 的属性 P，有 N 条匹配的规则声明了不同的值
  例: <div class="box" id="main" style="color:red">

                    ┌─────────────────────┐
                    │   开始: 收集所有      │
                    │   匹配的样式声明     │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │  Step 1: 检查来源    │  ← 重要性排序（最高优先）
                    │  (Importance)        │
                    └──────────┬──────────┘
                               ▼
            ┌──────────────────┼──────────────────┐
            │                  │                  │
            ▼                  ▼                  ▼
    ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
    │ !important    │  │ 普通 (Normal) │  │ 动画 (Animation)│
    │ 用户样式 ★★★  │  │               │  │ @keyframes    │
    ├───────────────┤  ├───────────────┤  ├───────────────┤
    │ 覆盖一切!     │  │ 开发者样式 >   │  │ 优先级介于     │
    │ 极少使用      │  │ 用户普通样式 > │  │ !important    │
    └───────┬───────┘  │ 浏览器默认样   │  │ 和普通之间     │
            │          └───────┬───────┘  └───────┬───────┘
            │                  │                  │
            └──────────────────┼──────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │  Step 2: 同来源内按   │
                    │  Specificity 排序    │  ← 优先级权重计算
                    │  (选择器特异性)       │
                    └──────────┬──────────┘
                               ▼

  ┌──────────────────────────────────────────────────────┐
  │  优先级四元组 (a, b, c, d) — 从左到右逐位比较         │
  │                                                      │
  │  a = 行内样式 (style="...")                           │
  │  b = ID 选择器数量 (#id)                              │
  │  c = 类/属性/伪类 (.class, [attr], :hover)           │
  │  d = 元素/伪元素 (div, ::before)                     │
  │                                                      │
  │  例: #nav .item a:hover → (0, 1, 2, 1)              │
  │      body div#main → (0, 1, 0, 2)                   │
  │      → 前者胜出! (c=2 > c=0)                         │
  └──────────────────────────────────────────────────────┘

                               ▼
                    ┌─────────────────────┐
                    │  Step 3: 优先级相同?  │
                    │  按"出现顺序"决定    │  ← 后定义的覆盖先定义的
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │  Step 4: 继承检查    │  ← 属性是否可继承?
                    │  (Inheritance)       │
                    └──────────┬──────────┘
                               ▼
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
    ┌────────────────────┐      ┌────────────────────┐
    │ 可继承属性           │      │ 不可继承属性          │
    │ font-* color text-* │      │ margin padding border │
    │ line-height ...     │      │ width height position │
    │ → 从父元素继承值     │      │ display float ...    │
    └─────────┬──────────┘      → 使用 initial 默认值  │
              │                 └────────────────────┘
              ▼
    ┌────────────────────┐
    │  Step 5: 最终值处理  │
    │  (Defaulting)       │
    └─────────┬──────────┘
              ▼
    ┌────────────────────┐
    │  使用 CSS 关键字?   │
    │  inherit / initial  │
    │  / unset / revert   │
    └─────────┬──────────┘
              ▼
    ┌────────────────────┐
    │  相对单位转换       │
    │  em→px %→px vw→px  │
    │  rem→px ...         │
    └─────────┬──────────┘
              ▼
    ═══════════════════
    ✅ 得到 Computed Style
    ═══════════════════

═══════════════════════════════════════
```

### 5.4 盒模型（Box Model）

```
标准盒模型（content-box）vs IE 盒模型（border-box）
═══════════════════════════════════════════════════

  ┌─────────────────────────────────────────────────┐
  │  标准 Box Model (box-sizing: content-box)        │
  │                                                 │
  │  设定: width: 200px; padding: 20px; border: 5px; │
  │                                                 │
  │  ┌──────────────────────────────────────────┐    │
  │  │ margin (外边距)                            │    │
  │  │  ┌────────────────────────────────────┐  │    │
  │  │  │ border (边框) 5px                  │  │    │
  │  │  │ ┌────────────────────────────────┐ │  │    │
  │  │  │ │ padding (内边距) 20px           │ │  │    │
  │  │  │ │ ┌────────────────────────────┐ │ │  │    │
  │  │  │ │ │  content (内容区) 200px    │ │ │  │    │
  │  │  │ │ │                            │ │ │  │    │
  │  │  │ │ └────────────────────────────┘ │ │  │    │
  │  │  │ └────────────────────────────────┘ │  │    │
  │  │  └────────────────────────────────────┘  │    │
  │  └──────────────────────────────────────────┘    │
  │                                                 │
  │  实际占用宽度 = 200 + 20*2 + 5*2 = 250px          │
  │  ⚠️ 这往往导致意外的布局溢出！                      │
  └─────────────────────────────────────────────────┘
  ┌─────────────────────────────────────────────────┐
  │  替代 Box Model (box-sizing: border-box) ★ 推荐   │
  │                                                 │
  │  设定: width: 200px; padding: 20px; border: 5px; │
  │                                                 │
  │  ┌──────────────────────────────────────────┐    │
  │  │ margin (外边距)                            │    │
  │  │  ┌────────────────────────────────────┐  │    │
  │  │  │ border-box 总宽度 = 200px           │  │    │
  │  │  │ ┌────────────────────────────────┐ │  │    │
  │  │  │ │ border 5px + padding 20px       │ │  │    │
  │  │  │ │ ┌────────────────────────────┐ │ │  │    │
  │  │  │ │ │ content 自动缩小 ≈ 150px   │ │ │  │    │
  │  │  │ │ │                            │ │ │  │    │
  │  │  │ │ └────────────────────────────┘ │ │  │    │
  │  │  │ └────────────────────────────────┘ │  │    │
  │  │  └────────────────────────────────────┘  │    │
  │  └──────────────────────────────────────────┘    │
  │                                                 │
  │  实际占用宽度 = 200px（设定值就是实际值！）         │
  │  ✅ content 宽度自动收缩，不会溢出                  │
  └─────────────────────────────────────────────────┘

═══════════════════════════════════════════════════
```

```css
/* ===== 全局盒模型重置（现代 CSS 最佳实践）===== */
*,
*::before,
*::after {
    /* 统一使用 border-box，避免计算烦恼 */
    box-sizing: border-box;
}

/* 或者更精细的控制（仅对需要的元素） */
html {
    box-sizing: border-box;
}
*, *::before, *::after {
    box-sizing: inherit;
}

/* 盒模型各属性详解 */
.demo-box {
    /* 内容区 */
    width: 300px;
    height: 200px;

    /* 内边距: 内容与边框之间的空间 */
    padding-top: 20px;
    padding-right: 30px;
    padding-bottom: 20px;
    padding-left: 30px;
    /* 缩写: padding: 20px 30px; (上右 下左) */

    /* 边框: 元素的边界线 */
    border-width: 2px;
    border-style: solid;
    border-color: #3498db;
    /* 缩写: border: 2px solid #3498db; */

    /* 圆角 */
    border-radius: 8px;
    /* 缩写: border-radius: 8px 8px 8px 8px; (顺时针: 左上 右上 右下 左下) */

    /* 外边距: 元素与其他元素之间的空间 */
    margin: 16px auto; /* 上下16px, 左右自动居中 */

    /* 背景 */
    background-color: #f0f0f0;
    background-image: url('pattern.png');
    background-size: cover;       /* 覆盖整个区域 */
    background-position: center;  /* 居中定位 */
    background-repeat: no-repeat; /* 不重复 */
}

/* 外边距合并（Margin Collapsing）现象 */
/*
  当两个垂直方向上的块级元素相遇时，
  它们的外边距会发生合并，取较大值作为最终外边距。

  触发条件:
  1. 相邻兄弟元素的垂直 margin
  2. 父元素与第一个/最后一个子元素的 margin
  3. 空块级元素自身的上下 margin
*/

.parent {
    margin-top: 20px;  /* 可能与子元素 margin-top 合并 */
}
.child {
    margin-top: 30px;  /* 最终父元素对外表现为 30px（取较大值）*/
}

/* 解决 margin 合并的方法 */
.solution-1 {
    /* 方法1: 给父元素添加 padding 或 border */
    padding-top: 1px; /* 或 border-top: 1px solid transparent; */
}

.solution-2 {
    /* 方法2: 使父元素成为 BFC（详见第6章、第12章） */
    overflow: hidden; /* 触发 BFC，阻止 margin 合并 */
}

.solution-3 {
    /* 方法3: 使用 flex/grid 布局（子元素 margin 不会合并） */
    display: flex;
    flex-direction: column;
}
```

#### 🔬 手写模拟：浏览器如何计算盒模型尺寸

> 以下代码模拟浏览器内核（如 Blink/WebKit）在布局阶段计算元素盒模型尺寸的核心逻辑，帮助理解 `content-box` 与 `border-box` 的本质区别。

```javascript
/**
 * 模拟浏览器计算盒模型尺寸的函数
 * 浏览器在 Layout 阶段对每个可见元素调用此逻辑
 *
 * @param {Object} elementStyle - 元素的 computed style
 * @param {Number} containingBlockWidth - 包含块的宽度（父元素内容区宽度）
 * @returns {Object} 计算后的盒模型各部分尺寸
 */
function calculateBoxModel(elementStyle, containingBlockWidth) {

    // ══════════════════════════════════════════════════
    // 第一步：解析用户设定的 width 值
    // ══════════════════════════════════════════════════
    // width 可能是 auto / 百分比 / 固定值 / 等多种情况
    let specifiedWidth = parseDimension(
        elementStyle.width,
        containingBlockWidth  // 百分比值需要相对于包含块计算
    );

    // 解析各个方向的 padding（支持四个方向独立设置）
    const padding = {
        top:    parseDimension(elementStyle.paddingTop, containingBlockWidth),
        right:  parseDimension(elementStyle.paddingRight, containingBlockWidth),
        bottom: parseDimension(elementStyle.paddingBottom, containingBlockWidth),
        left:   parseDimension(elementStyle.paddingLeft, containingBlockWidth)
    };

    // 解析 border（border-width + border-style 必须非 none 才占空间）
    const border = {
        top:    elementStyle.borderTopStyle !== 'none' ? parseDimension(elementStyle.borderTopWidth) : 0,
        right:  elementStyle.borderRightStyle !== 'none' ? parseDimension(elementStyle.borderRightWidth) : 0,
        bottom: elementStyle.borderBottomStyle !== 'none' ? parseDimension(elementStyle.borderBottomWidth) : 0,
        left:   elementStyle.borderLeftStyle !== 'none' ? parseDimension(elementStyle.borderLeftWidth) : 0
    };

    // 解析 margin（margin 可能为 auto，特殊处理）
    const margin = {
        top:    elementStyle.marginTop === 'auto' ? 0 : parseDimension(elementStyle.marginTop, containingBlockWidth),
        right:  elementStyle.marginRight,   // auto 值在后面专门处理
        bottom: elementStyle.marginBottom === 'auto' ? 0 : parseDimension(elementStyle.marginBottom, containingBlockWidth),
        left:   elementStyle.marginLeft      // auto 值在后面专门处理
    };

    // ══════════════════════════════════════════════════
    // 第二步：根据 box-sizing 模式计算实际占用宽度
    // 这是 content-box 和 border-box 的核心差异点！
    // ══════════════════════════════════════════════════

    let contentWidth;   // 内容区实际宽度
    let totalWidth;     // 元素实际占用总宽度（含 padding + border）

    if (elementStyle.boxSizing === 'border-box') {
        // ┌──────────────────────────────────────────────┐
        // │  border-box 模式（IE 盒模型 / 推荐使用）      │
        // │                                              │
        // │  用户设定的 width = 内容区 + padding + border  │
        // │  totalWidth 直接等于 specifiedWidth           │
        // │  contentWidth 需要反向扣除                    │
        // └──────────────────────────────────────────────┘

        totalWidth = specifiedWidth;  // 设定值就是总宽度

        // 从总宽度中扣除 padding 和 border，得到内容区宽度
        const horizontalPadding = padding.left + padding.right;
        const horizontalBorder = border.left + border.right;

        contentWidth = totalWidth - horizontalPadding - horizontalBorder;

        // ⚠️ 如果 contentWidth < 0，浏览器会强制将其设为 0
        // （此时内容溢出，可能配合 min-width 处理）
        if (contentWidth < 0) {
            contentWidth = 0;
            console.warn('[Layout Warning] content-width 被压缩为 0，请检查 padding/border 是否过大');
        }
    } else {
        // ┌──────────────────────────────────────────────┐
        // │  content-box 模式（标准盒模型 / 默认值）       │
        // │                                              │
        // │  用户设定的 width = 仅内容区宽度               │
        // │  实际占用宽度 = width + padding + border       │
        // │  这就是为什么常常导致布局溢出的原因！           │
        // └──────────────────────────────────────────────┘

        contentWidth = specifiedWidth;  // 设定值就是内容区宽度

        // 在内容区基础上累加 padding 和 border
        const horizontalPadding = padding.left + padding.right;
        const horizontalBorder = border.left + border.right;

        totalWidth = contentWidth + horizontalPadding + horizontalBorder;
    }

    // ══════════════════════════════════════════════════
    // 第三步：处理 margin:auto 的居中计算
    // 只有在明确设置了宽度时，margin:auto 才有意义
    // ══════════════════════════════════════════════════
    const remainingSpace = containingBlockWidth - totalWidth;

    if (elementStyle.marginLeft === 'auto' &&
        elementStyle.marginRight === 'auto') {
        // 左右都是 auto → 水平居中（剩余空间平分）
        margin.left = remainingSpace / 2;
        margin.right = remainingSpace / 2;
    } else if (elementStyle.marginLeft === 'auto') {
        // 仅左边 auto → 左边占据全部剩余空间（靠右对齐）
        margin.left = remainingSpace;
        margin.right = 0;
    } else if (elementStyle.marginRight === 'auto') {
        // 仅右边 auto → 右边占据全部剩余空间（靠左对齐）
        margin.left = 0;
        margin.right = remainingSpace;
    }

    // ══════════════════════════════════════════════════
    // 第四步：返回完整的盒模型计算结果
    // ══════════════════════════════════════════════════
    return {
        // 内容区尺寸
        contentWidth,
        // 内边距
        padding,
        // 边框
        border,
        // 外边距（已处理 auto）
        margin,
        // 元素在文档流中占用的总宽度（= margin-left + totalWidth + margin-right）
        occupiedWidth: margin.left + totalWidth + margin.right,
        // 盒模型模式
        boxSizing: elementStyle.boxSizing
    };
}
// ══════════════════════════════════════════════════════════════
//                        使用示例对比
// ══════════════════════════════════════════════════════════════

// 场景设定：父容器宽度 800px
const parentWidth = 800;

// --- 场景 A: content-box（默认） ---
const resultContentBox = calculateBoxModel({
    width: '200px',            // 设定内容区宽度为 200px
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '30px',
    paddingRight: '30px',
    borderTopWidth: '5px',
    borderBottomWidth: '5px',
    borderLeftWidth: '5px',
    borderRightWidth: '5px',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: 'auto',         // 水平居中
    marginRight: 'auto',
    boxSizing: 'content-box'    // 标准盒模型
}, parentWidth);

console.log('=== content-box 计算结果 ===');
console.log(`内容区宽度: ${resultContentBox.contentWidth}px`);       // 200px（就是设定的 width）
console.log(`实际占用宽度(含padding+border): ${resultContentBox.contentWidth + 30*2 + 5*2}px`); // 270px
console.log(`包含 margin 的总占用: ${resultContentBox.occupiedWidth}px`); // 270 + 265 + 265 = 800px（居中）

// --- 场景 B: border-box（推荐） ---
const resultBorderBox = calculateBoxModel({
    width: '200px',            // 设定总宽度为 200px
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '30px',
    paddingRight: '30px',
    borderTopWidth: '5px',
    borderBottomWidth: '5px',
    borderLeftWidth: '5px',
    borderRightWidth: '5px',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxSizing: 'border-box'     // IE 盒模型 ★
}, parentWidth);

console.log('\n=== border-box 计算结果 ===');
console.log(`内容区宽度: ${resultBorderBox.contentWidth}px`);         // ≈130px（被自动压缩！）
console.log(`实际占用宽度(含padding+border): 200px`);                 // 就是设定的 width
console.log(`包含 margin 的总占用: ${resultBorderBox.occupiedWidth}px`); // 800px（居中）
/**
 * 辅助函数：解析 CSS 尺寸值
 * 将 px/v/%/em/rem 等单位统一转换为像素数值
 */
function parseDimension(value, referenceValue) {
    if (!value || value === '0' || value === 0) return 0;
    if (typeof value === 'number') return value;  // 已经是数值

    // 匹配数值+单位的字符串，如 "200px"、"50%"、"1.5rem"
    const match = String(value).match(/^([\d.]+)(px|%|rem|em|vw|vh)?$/);
    if (!match) return 0;

    const num = parseFloat(match[1]);
    const unit = match[2] || 'px';  // 无单位默认为 px

    switch (unit) {
        case 'px':  return num;
        case '%':   return num * (referenceValue || 0) / 100;  // 百分比需参照父元素
        case 'rem': return num * 16;  // 假设根元素 font-size 为 16px
        case 'em':  return num * 16;  // 简化处理：假设当前元素 font-size 为 16px
        case 'vw':  return num * window.innerWidth / 100;
        case 'vh':  return num * window.innerHeight / 100;
        default:    return num;
    }
}
```

```
两种盒模型的计算过程可视化对比
═══════════════════════════════════════════════════

  设定值: width:200px | padding:20px 30px | border:5px | margin:auto
  父容器宽度: 800px

  ┌─ content-box (默认) ─────────────────────────────────────┐
  │                                                          │
  │  浏览器计算流程:                                          │
  │  ① width(200) → contentWidth = 200                       │
  │  ② totalWidth = 200 + 30+30 + 5+5 = 270                  │
  │  ③ 剩余空间 = 800 - 270 = 530                            │
  │  ④ margin-left = margin-right = 530/2 = 265 → 居中 ✓      │
  │                                                          │
  │  ┌265┐ ┌──────────────────────────┐ ┌265┐                │
  │  │mL │ │ b5 p30  c=200  p30 b5  │ │mR │  总计 = 800px   │
  │  └───┘ └──────────────────────────┘ └───┘                │
  │          ↑ totalWidth = 270px                             │
  │                                                          │
  └──────────────────────────────────────────────────────────┘

  ┌─ border-box (推荐★) ─────────────────────────────────────┐
  │                                                          │
  │  浏览器计算流程:                                          │
  │  ① width(200) → totalWidth = 200                         │
  │  ② contentWidth = 200 - 30-30 - 5-5 = 130               │
  │  ③ 剩余空间 = 800 - 200 = 600                            │
  │  ④ margin-left = margin-right = 600/2 = 300 → 居中 ✓      │
  │                                                          │
  │  ┌300┐ ┌────────────────────────┐ ┌300┐                  │
  │  │mL │ │b5p30 c≈130 p30b5(=200)│ │mR │  总计 = 800px    │
  │  └───┘ └────────────────────────┘ └───┘                  │
  │          ↑ totalWidth = 200px（设定值即实际值）             │
  │                                                          │
  └──────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════
```

### 5.5 CSS 单位体系

| 分类 | 单位 | 相对于 | 示例值 | 典型用途 |
|------|------|--------|--------|----------|
| **绝对单位** | `px` | 像素（逻辑像素） | `16px` | 边框、细粒度控制 |
| | `pt` | 点（1/72 英寸） | `12pt` | 打印样式 |
| | `cm/mm` | 厘米/毫米 | `10cm` | 打印样式 |
| **相对字体** | `em` | **当前元素**的 `font-size` | `1.5em` | 字体相关间距 |
| | `rem` | **根元素**（`html`）的 `font-size` | `1rem` | **推荐**：全局统一基准 |
| | `%` | 父元素对应属性值 | `80%` | 宽度、高度百分比 |
| **视口单位** | `vw` | 视口宽度的 1% | `100vw` | 全宽布局 |
| | `vh` | 视口高度的 1% | `100vh` | 全屏高度 |
| | `vmin` | vw 和 vh 中较小者 | `100vmin` | 适配短边的元素 |
| | `vmax` | vw 和 vh 中较大者 | `100vmax` | 适配长边的元素 |
| | `svw/svh/lvw/lvh/dvw/dvh` | 各类视口子区域 | `100dvh` | 移动端动态视口 |
| **相对容器** | `cqw/cqh` | 容器宽/高的 1% | `10cqw` | 容器查询（较新） |
| **函数单位** | `calc()` | 数学表达式 | `calc(100% - 40px)` | 动态计算 |
| | `min()` / `max()` | 取最小/最大值 | `min(400px, 100%)` | 响应式断点内联 |
| | `clamp()` | 三值区间约束 | `clamp(1rem, 2vw, 2rem)` | **流体排版** |

```css
/* ===== em vs rem 的区别 ===== */
html {
    font-size: 16px; /* 浏览器默认基准 */
}

.em-demo {
    font-size: 16px;
    /* em 相对于当前元素的 font-size */
    padding: 1em;   /* = 16px (相对于自身 font-size) */
}

.rem-demo {
    font-size: 20px;
    /* rem 始终相对于根元素（html）的 font-size */
    padding: 1rem;  /* = 16px (不受自身 font-size 影响!) */
}

.nested-em {
    font-size: 1.5em;  /* = 24px (相对于父元素) */
    padding: 1em;      /* = 24px (相对于自身，容易累积放大!) */
}

/* 推荐: 全局使用 rem 作为基准单位，局部用 em 处理字体相关比例 */
/* ===== calc() 动态计算 ===== */
.responsive-width {
    /* 减去两侧 padding 后的剩余宽度 */
    width: calc(100% - 40px);
    margin: 0 auto;
}

.fluid-spacing {
    /* 结合相对单位和绝对单位 */
    padding: clamp(1rem, 5vw, 3rem); /* 最小1rem, 首选5vw, 最大3rem */
}

/* ===== 流体排版（Fluid Typography）===== */
html {
    /* 让字体大小随视口平滑变化 */
    font-size: clamp(14px, 1vw + 10px, 20px);
}

h1 {
    /* 标题字号也做流体化 */
    font-size: clamp(2rem, 4vw + 1rem, 4rem);
}

/* ===== 视口单位实用技巧 ===== */
.fullscreen-hero {
    /* 全屏高度减去导航栏高度 */
    height: calc(100dvh - 64px); /* dvh: 动态视口高度（移动端更准）*/
}

.square-element {
    /* 保持正方形（宽高等于视口较小边） */
    width: 50vmin;
    height: 50vmin;
}
```

#### 🎯 本章面试高频追问

> **Q1: `rem` 和 `em` 的本质区别是什么？什么时候用哪个？**

**答案方向：**
- `em` 相对于**当前元素自身**的 `font-size` 计算，嵌套时会累积放大（如 `1.5em` 套 `1.5em` = `2.25rem`），容易失控
- `rem` 始终相对于**根元素（html）**的 `font-size`，不随嵌套变化，更可预测
- 推荐：全局布局/间距用 `rem`（统一基准），局部字体相关比例用 `em`（如按钮内图标大小跟随文字）

---

> **Q2: `box-sizing: border-box` 为什么被称为"最佳实践"？它解决了什么具体问题？**

**答案方向：**
- 解决了 `content-box` 模式下 `width` 只是内容区宽度、实际占用 = width + padding + border 导致的"意外溢出"问题
- 典型场景：给一个 `width:100%` 的元素加 padding 会撑破父容器；`border-box` 下设定值就是实际值，无需手动计算
- 现代框架/Reset CSS（如 Tailwind、normalize.css）默认全局设置 `* { box-sizing: border-box }`

---

> **Q3: `clamp()` 函数的工作原理？与媒体查询相比有什么优势？**

**答案方向：**
- `clamp(min, preferred, max)` 是一个"响应式函数"，在单行声明中实现流体排版
- 工作机制：当 preferred 值在 [min, max] 范围内时直接使用；超出时被 min 或 max 钳制
- 优势：无需写多个 `@media` 断点、无"跳跃式"断点切换、声明式且浏览器原生支持
- 示例：`font-size: clamp(1rem, 2.5vw, 2rem)` — 最小1rem，首选2.5vw视口比例，最大2rem

---
---

## 第6章 CSS 布局体系（一）：BFC 与定位浮动

### 6.1 Block Formatting Context（BFC）

**BFC（块级格式化上下文）** 是 Web 页面中一个独立的渲染区域，决定了内部元素如何布局以及与其他元素的关系。

```
BFC 的隔离特性
═══════════════════════════════════════

  普通 Flow Layout（没有 BFC 隔离）:

  ┌─────────────────────────────────────┐
  │  Parent (普通 Block)                │
  │  ┌──────────┐                      │
  │  │ Float: L  │  Block Child        │  ← 文字环绕浮动元素
  │  │          │  文字环绕效果...      │
  │  └──────────┘                      │
  │  Margin Collapsing 发生!            │  ← 子元素 margin 会穿透
  └─────────────────────────────────────┘
  BFC Layout（BFC 隔离后）:

  ┌─────────────────────────────────────┐
  │  Parent (创建了 BFC) ★              │
  │  ┌──────────────────────────────┐   │
  │  │  BFC 内部是一个独立的布局世界  │   │  ← 内部布局完全隔离
  │  │                              │   │
  │  │  Float 元素也被包含在内       │   │  ← 浮动元素不会溢出
  │  │  Margin 不会向外合并          │   │
  │  │  不受外部浮动元素影响          │   │
  │  └──────────────────────────────┘   │
  └─────────────────────────────────────┘

═══════════════════════════════════════
```

#### BFC 触发条件

| 触发方式 | CSS 声明 | 备注 |
|----------|----------|------|
| `float` | `float: left/right` | 经典触发方式 |
| `overflow` | `overflow: hidden/auto/scroll` | **最常用**的方式 |
| `display` | `display: inline-block` | |
| | `display: table-cell` | |
| | `display: flow-root` | **专门用于创建 BFC**（推荐） |
| | `display: flex/grid` | Flex/Grid 容器也是 BFC |
| `position` | `position: absolute/fixed` | 绝对/fixed 定位的元素 |
| 多列布局 | `column-count/spans` | CSS Columns |

> **推荐**: 使用 `display: flow-root` 创建 BFC，这是专门为此设计的属性，没有任何副作用。

```css
/* ===== BFC 应用场景 ===== */

/* 场景1: 清除浮动（包含浮动子元素） */
.bfc-container {
    /* 方式1: overflow:hidden（老方法，可能裁剪内容） */
    /* overflow: hidden; */

    /* 方式2: display:flow-root（推荐，无副作用） */
    display: flow-root;
}

/* 场景2: 阻止 margin 合并 */
.no-collapse-parent {
    display: flow-root; /* 创建 BFC 后，子元素的 margin 不会穿透 */
}

/* 场景3: 避免文字环绕浮动元素 */
.content-beside-float {
    display: flow-root; /* 创建 BFC 后，不会环绕外部浮动元素 */
    overflow: hidden;   /* 同样有效 */
}

/* 场景4: 两栏自适应布局（左侧固定 + 右侧自适应） */
.layout-two-col {
    display: flow-root;
}

.layout-sidebar {
    float: left;
    width: 250px;
}

.layout-main {
    /* 创建 BFC，不与左侧浮动元素重叠 */
    display: flow-root;
    /* 或 overflow: hidden; */
}
```

#### 🔬 BFC 三大经典场景完整代码演示

> 以下提供三个可直接运行的完整 HTML/CSS 示例，分别对应 BFC 的三大核心用途。

**场景一：BFC 解决外边距重叠（Margin Collapsing）**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>BFC 场景1: 解决 Margin 重叠</title>
<style>
    /* ===== 页面基础样式 ===== */
    body { margin: 0; font-family: system-ui, sans-serif; }

    /* ===== 问题复现：margin 发生重叠 ===== */
    .demo-problem {
        padding: 20px;
        background: #fff3e0;
        margin-bottom: 30px;
        border-radius: 8px;
    }
    .problem-parent {
        background: #ffcc80;
        /* 父元素没有创建 BFC → 子元素的 margin-top 会穿透！ */
    }
    .problem-parent .child {
        height: 60px;
        background: #ff9800;
        margin-top: 40px;           /* 这个 margin 会穿透到父元素外部 */
        margin-bottom: 30px;
    }
    .problem-sibling {
        height: 50px;
        background: #f57c00;
        margin-top: 20px;
        /* 预期间距 = child的margin-bottom(30) + sibling的margin-top(20) = 50px
           实际间距 = max(30, 20) = 30px !!  ← margin 重叠了! */
    }
    /* ===== 解决方案：用 BFC 阻止 margin 重叠 ===== */
    .demo-solution {
        padding: 20px;
        background: #e8f5e9;
        border-radius: 8px;
    }
    .solution-parent {
        background: #a5d6a7;
        display: flow-root;         /* ★ 创建 BFC：子元素 margin 不再穿透 */
        /* 或者使用 overflow: hidden; 也能触发 BFC（但可能裁剪内容）*/
    }
    .solution-parent .child {
        height: 60px;
        background: #66bb6a;
        margin-top: 40px;           /* margin 被包含在 BFC 内部，不穿透 */
        margin-bottom: 30px;
    }
    .solution-sibling {
        height: 50px;
        background: #43a047;
        margin-top: 20px;
        /* 现在: child(30) + sibling(20) = 50px ✓  ← 各自独立，不再重叠 */
    }

    /* 标注文字 */
    h4 { margin: 0 0 10px; font-size: 14px; }
    .note { font-size: 12px; color: #666; margin-top: 8px; }
</style>
</head>
<body>

<!-- 问题区域 -->
<div class="demo-problem">
    <h4>❌ 未使用 BFC：Margin 重叠问题</h4>
    <div class="problem-parent">
        <div class="problem-parent child">子元素 (margin-top:40px, margin-bottom:30px)</div>
    </div>
    <!-- 这里的实际间距只有 30px（取较大值），而不是预期的 50px -->
    <div class="problem-sibling">兄弟元素 (margin-top:20px)</div>
    <p class="note">→ 子元素的 margin-top 穿透父元素；兄弟间只取 max(30,20)=30px</p>
</div>

<!-- 解决方案区域 -->
<div class="demo-solution">
    <h4>✅ 使用 BFC：Margin 重叠已解决</h4>
    <div class="solution-parent">
        <div class="solution-parent child">子元素 (margin-top:40px, margin-bottom:30px)</div>
    </div>
    <!-- 这里的间距 = 30 + 20 = 50px ✓ -->
    <div class="solution-sibling">兄弟元素 (margin-top:20px)</div>
    <p class="note">→ 子元素 margin 被 BFC 包裹；兄弟间距 = 30+20=50px ✓</p>
</div>

</body>
</html>
```

```
场景一效果对比图示
═══════════════════════════════════════

  ❌ 无 BFC（margin 重叠）:
  ┌──────────────────────────────────┐
  │ Parent (无BFC)                    │
  │ ┌────────────────────────────┐   │
  │ │ ↑ margin-top:40px          │   │
  │ │ ┌────────────────────────┐ │   │
  │ │ │     Child 元素         │ │   │
  │ │ └────────────────────────┘ │   │
  │ │ ↓ margin-bottom:30px      │   │
  │ └────────────────────────────┘   │
  │ ↑ 只剩 30px！（被重叠为 max值）   │
  │ ┌────────────────────────────┐   │
  │ │     Sibling 元素            │   │
  │ └────────────────────────────┘   │
  └──────────────────────────────────┘

  ✅ 有 BFC（margin 独立）:
  ┌──────────────────────────────────┐
  │ Parent (display:flow-root ★)     │
  │ ┌────────────────────────────┐   │
  │ │ ↑ margin-top:40px (内部)   │   │
  │ │ ┌────────────────────────┐ │   │
  │ │ │     Child 元素         │ │   │
  │ │ └────────────────────────┘ │   │
  │ │ ↓ margin-bottom:30px (内部)│   │
  │ └────────────────────────────┘   │
  │ ↑ 30px (parent→sibling)          │
  │ ↑ 20px (sibling自身)             │
  │ ┌────────────────────────────┐   │
  │ │     Sibling 元素            │   │
  │ └────────────────────────────┘   │
  │ 总间距 = 30 + 20 = 50px ✓        │
  └──────────────────────────────────┘

═══════════════════════════════════════
```

---

**场景二：BFC 清除浮动（解决高度塌陷）**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>BFC 场景2: 清除浮动/高度塌陷</title>
<style>
    body { margin: 0; font-family: system-ui, sans-serif; padding: 20px; }

    /* ===== 问题：浮动导致父元素高度塌陷 ===== */
    .case-problem { margin-bottom: 30px; }
    .problem-container {
        background: #ffcdd2;
        /* 高度塌陷! 浮动子元素脱离文档流，父元素高度变为 0 (或只有padding) */
        /* 可以看到背景色几乎没有高度 */
    }
    .float-item {
        float: left;              /* 浮动 → 脱离文档流 */
        width: 120px;
        height: 80px;
        background: #ef5350;
        margin: 10px;
        line-height: 80px;
        text-align: center;
        color: white;
        border-radius: 6px;
    }
    .after-float-text {
        background: #e0e0e0;
        /* 文字会"钻"到浮动元素下方（因为父容器高度为0）*/
    }

    /* ===== 方案A: overflow:hidden 触发 BFC ===== */
    .solution-a {
        background: #c8e6c9;
        overflow: hidden;          /* ★ 触发 BFC → 包含浮动子元素 */
        /* 副作用: 溢出内容会被裁剪（如 dropdown、tooltip 等） */
    }

    /* ===== 方案B: display:flow-root 触发 BFC（推荐）===== */
    .solution-b {
        background: #bbdefb;
        display: flow-root;        /* ★ 专门用于创建 BFC，零副作用 */
    }

    /* ===== 方案C: 伪元素清除法（经典 hack）===== */
    .solution-c {
        background: #e1bee7;
    }
    .solution-c::after {
        content: '';              /* 必须有 content */
        display: table;           /* 或 block */
        clear: both;              /* 清除左右两侧浮动 */
        /* 在父元素末尾插入一个不可见的块级元素来撑开高度 */
    }

    /* 通用标注 */
    h4 { margin: 0 0 10px; font-size: 14px; }
    .row { display: flex; gap: 15px; flex-wrap: wrap; }
    .col { flex: 1; min-width: 280px; border-radius: 8px; padding: 15px; }
    .note { font-size: 11px; color: #555; margin-top: 8px; }
    .tag { display: inline-block; padding: 2px 8px;
           border-radius: 4px; font-size: 11px; color: white; }
</style>
</head>
<body>

<h3>BFC 清除浮动 — 三种方案对比</h3>

<div class="row">
    <!-- 问题展示 -->
    <div class="col case-problem">
        <h4>❌ 问题: 高度塌陷</h4>
        <span class="tag" style="background:#d32f2f">无 BFC</span>
        <div class="problem-container">
            <div class="float-item">Float 1</div>
            <div class="float-item">Float 2</div>
            <div class="float-item">Float 3</div>
        </div>
        <div class="after-float-text" style="padding:10px;margin-top:5px;">
            下面的文字跑上来了（因为父容器高度=0）
        </div>
        <p class="note">→ 父容器高度塌陷为 0，背景几乎不可见</p>
    </div>

    <!-- 方案 A -->
    <div class="col">
        <h4>✅ 方案A: overflow:hidden</h4>
        <span class="tag" style="background:#388e3c">overflow:hidden</span>
        <div class="solution-a">
            <div class="float-item">Float 1</div>
            <div class="float-item">Float 2</div>
            <div class="float-item">Float 3</div>
        </div>
        <div style="padding:10px;margin-top:5px;background:#eee;border-radius:4px;">
            文字在正常位置（父容器高度正常）
        </div>
        <p class="note">→ 高度恢复! ⚠️ 但溢出内容会被隐藏</p>
    </div>

    <!-- 方案 B（推荐）-->
    <div class="col">
        <h4>★ 方案B: display:flow-root</h4>
        <span class="tag" style="background:#1976d2">flow-root</span>
        <div class="solution-b">
            <div class="float-item">Float 1</div>
            <div class="float-item">Float 2</div>
            <div class="float-item">Float 3</div>
        </div>
        <div style="padding:10px;margin-top:5px;background:#eee;border-radius:4px;">
            文字在正常位置（父容器高度正常）
        </div>
        <p class="note">→ 高度恢复! ✅ 无任何副作用（推荐）</p>
    </div>
</div>

<!-- 方案 C 单独一行展示 -->
<div class="col" style="max-width:600px;">
    <h4>✅ 方案C: ::after 伪元素清除法（经典兼容方案）</h4>
    <span class="tag" style="background:#7b1fa2">::after clear:both</span>
    <div class="solution-c">
        <div class="float-item">Float 1</div>
        <div class="float-item">Float 2</div>
        <div class="float-item">Float 3</div>
    </div>
    <div style="padding:10px;margin-top:5px;background:#eee;border-radius:4px;">
        文字在正常位置（伪元素撑开了父容器高度）
    </div>
    <p class="note">→ 兼容性最好（IE6+），但属于 hack 技巧</p>
</div>

</body>
</html>
```

---

**场景三：BFC 阻止元素被浮动覆盖（自适应两栏布局）**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>BFC 场景3: 阻止浮动覆盖 / 自适应两栏</title>
<style>
    body { margin: 0; font-family: system-ui, sans-serif; padding: 20px; }

    /* ===== 布局容器 ===== */
    .layout {
        border: 2px dashed #bbb;
        border-radius: 8px;
        overflow: hidden; /* 仅为了圆角裁剪 */
    }

    /* 左侧固定宽度侧边栏 —— 浮动 */
    .sidebar {
        float: left;               /* 左浮动，脱离文档流 */
        width: 200px;
        height: 300px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 20px;
        box-sizing: border-box;
        /* 浮动后，后续行内/块级元素会环绕它 */
    }

    /* ===== 问题：右侧内容被浮动元素侵入 ===== */
    .content-bad {
        /* 没有 BFC → 内容文字会环绕浮动元素 */
        background: #ffebee;
        padding: 15px;
        min-height: 300px;
    }

    /* ===== 解决方案：右侧内容创建 BFC ===== */
    .content-good {
        display: flow-root;        /* ★ 创建 BFC → 不与浮动元素重叠 */
        /* 或者: overflow: hidden; */
        background: #e8f5e9;
        padding: 15px;
        min-height: 300px;
    }

    h4 { margin: 0 0 10px; font-size: 14px; }
    h3 { margin: 0 0 15px; color: #333; }
    .comparison { display: flex; gap: 20px; flex-wrap: wrap; }
    .case-box { flex: 1; min-width: 320px; border-radius: 8px; }
    .note { font-size: 12px; color: #666; margin-top: 8px;
            background: rgba(0,0,0,0.05); padding: 8px; border-radius: 4px; }
</style>
</head>
<body>

<h3>BFC 阻止浮动覆盖 — 自适应两栏布局</h3>

<div class="comparison">

    <!-- === 问题案例 === -->
    <div class="case-box">
        <h4>❌ 右侧未创建 BFC：文字环绕浮动元素</h4>
        <div class="layout">
            <div class="sidebar">
                <strong>侧边栏</strong><br>
                (float:left)<br>
                width:200px<br><br>
                固定宽度浮动区
            </div>
            <div class="content-bad">
                <strong>主内容区（无 BFC）</strong><br><br>
                这段文字会环绕左侧的浮动元素。你可以看到文字流入了
                左侧栏下方的空间。这是因为普通流中的块级盒子会
                忽略浮动元素的位置，但其中的**行内内容**（文字、图片等）
                却会感知到浮动元素的存在并围绕它排列。<br><br>
                这种行为在排版中有时是有用的（如首字下沉效果），
                但在做两栏布局时通常是我们<strong>不想要</strong>的效果。<br><br>
                文字继续环绕...
            </div>
        </div>
        <p class="note">→ 内容区的文字"钻"到了侧边栏下面，不是真正的两栏并排</p>
    </div>

    <!-- === 解决方案 === -->
    <div class="case-box">
        <h4>✅ 右侧创建 BFC：真正独立的两栏</h4>
        <div class="layout">
            <div class="sidebar">
                <strong>侧边栏</strong><br>
                (float:left)<br>
                width:200px<br><br>
                固定宽度浮动区
            </div>
            <div class="content-good">
                <strong>主内容区（display:flow-root ★）</strong><br><br>
                创建 BFC 后，这个内容区变成了一个独立的渲染容器。
                它不会与外部的浮动元素发生重叠——浏览器会自动计算
                浮动元素的占用空间，并将 BFC 区域排在浮动元素之后。<br><br>
                这样就实现了一个经典的<strong>左固定 + 右自适应</strong>两栏布局：
                <ul style="padding-left: 20px; margin: 10px 0;">
                    <li>左侧栏：固定 200px，通过 float 定位</li>
                    <li>右侧栏：自动填充剩余空间，通过 BFC 实现</li>
                    <li>无需计算宽度、无需 calc()、响应式友好</li>
                </ul>
                这就是 BFC 在实际项目中最常用的布局技巧之一。
            </div>
        </div>
        <p class="note">→ 内容区与侧边栏完全分离，各自独立 ✓</p>
    </div>

</div>

</body>
</html>
```

```
场景三效果对比图示
═══════════════════════════════════════

  ❌ 无 BFC（文字环绕浮动元素）:
  ┌──────────────────────────────────────────┐
  │ ┌────────┐                               │
  │ │Sidebar │  主内容区的文字会环绕过来...    │
  │ │200px   │  就像报纸排版一样...            │
  │ │float   │  文字流入侧边栏下方的空间       │
  │ │        │  ...这通常不是我们想要的         │
  │ └────────┘                               │
  └──────────────────────────────────────────┘

  ✅ 有 BFC（阻止浮动覆盖，形成两栏）:
  ┌──────────────────────────────────────────┐
  │ ┌────────┐ ┌───────────────────────────┐ │
  │ │Sidebar │ │                           │ │
  │ │200px   │ │  主内容区 (BFC)           │ │
  │ │float   │ │  自动占满剩余空间          │ │
  │ │        │ │  文字不会环绕              │ │
  │ │        │ │                           │ │
  │ └────────┘ └───────────────────────────┘ │
  └──────────────────────────────────────────┘

═══════════════════════════════════════
```

### 6.2 Position 定位体系

```
Position 定位模式对比
═══════════════════════════════════════

  static (默认)          relative              absolute
  ┌─────────┐           ┌────┐                ┌─────────┐
  │         │           │rel │                │  abs    │
  │ normal  │           │ ↓  │ offset:        │  ↑left:  │
  │ flow    │           └────┘ top:10px       │  20px   │
  │         │     原位置保留!         脱离文档流!
  └─────────┘

  fixed                   sticky
  ┌─────────────────┐    ┌──────┐
  │  fixed          │    │sticky│
  │  相对视口定位     │    │      │ 滚动到阈值时
  │  脱离文档流       │    └──────┘ 变为 fixed
  │  滚动也不移动     │    原位置保留!
  └─────────────────┘

═══════════════════════════════════════
```

```css
/* ===== 1. static（静态定位）—— 默认值 ===== */
.static-box {
    position: static;
    /* top/right/bottom/left/z-index 均不生效 */
    /* 元素处于正常的文档流中 */
}

/* ===== 2. relative（相对定位）===== */
.relative-box {
    position: relative;
    /* 相对于元素在正常文档流中的"原始位置"进行偏移 */
    top: 10px;    /* 向下移动 10px（注意方向是反直觉的）*/
    left: 20px;   /* 向右移动 20px */

    /* 关键特点: 原始位置仍被保留（不脱离文档流）*/
    /* 其他元素不会填补它的空位 */
}

/* ===== 3. absolute（绝对定位）===== */
.absolute-box {
    position: absolute;
    /* 相对于最近的"定位祖先"（非 static 的祖先）进行定位 */
    /* 如果没有定位祖先，则相对于初始包含块（通常是视口）*/

    top: 0;
    right: 0;
    /* 定位到父容器的右上角 */

    /* 关键特点: 完全脱离文档流 */
    /* 原位置不被保留，其他元素会填补 */
}

/* 绝对定位的典型用法: 子绝父相 */
.parent-relative {
    position: relative; /* 父元素设置为 relative */
    /* 成为子元素 absolute 定位的参照物 */
}
.child-absolute {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* 居中技巧 */
}

/* ===== 4. fixed（固定定位）===== */
.fixed-header {
    position: fixed;
    /* 相对于浏览器视口（viewport）进行定位 */
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;

    /* 关键特点:
       - 脱离文档流
       - 滚动时位置不变（始终固定在视口的某个位置）
       - 不随页面滚动而移动
    */
}

.fixed-bottom-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;
}

/* ===== 5. sticky（粘性定位）★ ===== */
.sticky-header {
    position: sticky;
    /* 基于 scroll container（滚动容器）进行定位 */
    top: 0; /* 距离滚动容器顶部为 0 时"粘住" */

    /* 工作原理:
       1. 初始时在正常文档流中（类似 relative）
       2. 滚动到设定的阈值（top: 0）时，变为 fixed
       3. 滚回去时，又回到正常文档流
       4. 原始位置始终保留
    */
}

.sticky-sidebar {
    position: sticky;
    top: 80px; /* 距顶部 80px 时粘住（考虑固定 header 高度）*/
}

/* sticky 的注意事项:
   - 父容器不能有 overflow: hidden/auto/scroll（会破坏 sticky）
   - 必须指定 top/bottom/left/right 之一
   - 父容器高度不能低于 sticky 元素
   - 父容器不能比 sticky 元素高不了多少
*/
```

### 6.3 浮动布局（Float）

> **历史地位**: Float 曾是 CSS 布局的王者（2002-2015），如今主要用于文字环绕场景。新的布局任务应优先使用 Flexbox 或 Grid。

```css
/* ===== 浮动基本原理 ===== */
.float-left {
    float: left;  /* 向左浮动 */
    /* 元素脱离正常文档流，向左/右移动直到碰到边界或其他浮动元素 */
    /* 后续的非浮动元素会环绕它（文字环绕效果）*/
}

.float-right {
    float: right; /* 向右浮动 */
}

.float-none {
    float: none;  /* 不浮动（默认值）*/
}

/* ===== 清除浮动的方法 ===== */

/* 方法1: clear 属性（经典方法） */
.clearfix-old {
    clear: both;  /* 清除左右两边的浮动影响 */
    /* clear: left;   只清除左浮动 */
    /* clear: right;  只清除右浮动 */
}

/* 方法2: 伪元素清除法（最常用） */
.clearfix::after {
    content: '';
    display: table;  /* 或 block */
    clear: both;     /* 清除浮动 */
}

/* 方法3: overflow 法 */
.float-container {
    overflow: hidden; /* 或 auto */
    /* 触发 BFC，从而包含浮动子元素 */
}

/* 方法4: display: flow-root（现代推荐） */
.float-container-modern {
    display: flow-root; /* 专门用于创建 BFC 来包含浮动 */
}

/* ===== 浮动布局实战: 两栏布局（旧方案）===== */
.two-column-layout {
    /* 容器 */
}

.sidebar-float {
    float: left;
    width: 250px;
}

.main-content-float {
    /* 不浮动，但创建 BFC 避免与浮动元素重叠 */
    display: flow-root;
    /* 或: overflow: hidden; */
    /* 或: margin-left: 270px; */
}
```

```html
<!-- 浮动的典型应用: 文字环绕图片 -->
<article class="article-with-image">
    <img src="photo.jpg"
         alt="文章配图"
         class="float-image"
         width="300"
         height="200">
    <!-- 图片浮动后，文字自然环绕 -->
    <p>这是一段很长的文字内容，它会自动环绕在浮动图片的周围。
       浮动布局最初的设计目的就是为了实现这种文字环绕效果。
       虽然现在我们更多使用 Flexbox 和 Grid 来做整体布局，
       但 Float 在文字环绕场景仍然是最合适的方案。</p>
</article>

<style>
    .float-image {
        float: left;
        margin: 0 20px 20px 0; /* 右下留出边距，文字更美观 */
        shape-outside: circle(50%); /* 高级: 文字沿圆形环绕 */
        shape-margin: 10px;
    }
</style>
```

### 6.4 Display 属性总览

| 值 | 产生盒子类型 | 特点 | 典型用途 |
|----|-------------|------|----------|
| `block` | 块级盒子 | 独占一行，可设宽高 | `div`, `p`, `h1-h6` |
| `inline` | 行内盒子 | 不换行，宽高无效 | `span`, `a`, `strong` |
| `inline-block` | 行内块盒子 | 不换行，可设宽高 | 按钮、小图标容器 |
| `none` | 不产生盒子 | 完全不渲染，不占空间 | 隐藏元素、响应式隐藏 |
| `flex` | 弹性容器 | 子元素变为弹性项目 | 一维布局 |
| `grid` | 网格容器 | 子元素放入网格单元格 | 二维布局 |
| `table` 系列 | 表格盒子 | 模拟表格布局 | 特殊对齐需求 |
| `contents` | 无盒子 | 子元素提升一级 | 辅助网格/Flex 嵌套 |
| `flow-root` | BFC 块级盒子 | 创建独立的 BFC | 清除浮动、阻止 margin 合并 |

```css
/* inline-block 的经典应用: 水平排列元素 */
.nav-inline-block > li {
    display: inline-block;
    /* 块级特性: 可以设置 padding/margin/宽高 */
    /* 行内特性: 水平排列，不换行 */
    padding: 8px 16px;
}

/* 注意: inline-block 元素之间会有空白间隙（源于 HTML 中的换行/空格）*/
/* 解决方法: 父元素 font-size:0 或 HTML 不换行 或 flex 替代 */
```

---

## 第7章 CSS 布局体系（二）：Flexbox

### 7.1 Flexbox 核心概念

```
Flexbox 布局模型
═══════════════════════════════════════

  ┌─────────────────────────────────────────────────┐
  │           Flex Container（弹性容器）              │
  │  display: flex;                                 │
  │                                                 │
  │  Main Axis（主轴）━━━━━━━━━━▶  direction: row   │
  │  ↗                                            │
  │  │ Cross Axis（交叉轴）↕                        │
  │  │                                            │
  │  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐               │
  │  │  │ F1 │ │ F2 │ │ F3 │ │ F4 │  Flex Items   │
  │  │  └────┘ └────┘ └────┘ └────┘  （弹性项目）   │
  │  │                                            │
  │  ◀━━━━━━━━━━━━━━━━━━━━━━━━━━━ Main Size       │
  │         Cross Size                             │
  │                                                 │
  │  主轴方向由 flex-direction 决定:                │
  │  - row (默认): 主轴水平向右                      │
  │  - row-reverse: 主轴水平向左                     │
  │  - column: 主轴垂直向下                          │
  │  - column-reverse: 主轴垂直向上                  │
  └─────────────────────────────────────────────────┘

═══════════════════════════════════════
```

### 7.2 容器属性（Container Properties）

```css
/* ===== Flex 容器属性（写在父元素上）===== */

.flex-container {
    display: flex; /* 启用弹性布局 */

    /* ---- 1. flex-direction: 主轴方向 ---- */
    flex-direction: row;            /* 默认: 水平向右 */
    /* flex-direction: row-reverse; */ /* 水平向左（反转顺序）*/
    /* flex-direction: column; */     /* 垂直向下 */
    /* flex-direction: column-reverse; */ /* 垂直向上 */

    /* ---- 2. flex-wrap: 是否换行 ---- */
    flex-wrap: nowrap;              /* 默认: 不换行（项目可能溢出）*/
    /* flex-wrap: wrap; */           /* 换行，第一行在上 */
    /* flex-wrap: wrap-reverse; */   /* 换行，第一行在下 */

    /* flex-flow 是 direction + wrap 的简写 */
    /* flex-flow: row wrap; */

    /* ---- 3. justify-content: 主轴对齐 ---- */
    /* 控制项目在主轴上的分布方式 */
    justify-content: flex-start;    /* 默认: 起点（左/上）对齐 */
    /* justify-content: flex-end; */    /* 终点（右/下）对齐 */
    /* justify-content: center; */      /* 居中对齐 */
    /* justify-content: space-between; */ /* 两端对齐，项目之间均分空间 */
    /* justify-content: space-around; */ /* 每个项目两侧空间相等 */
    /* justify-content: space-evenly; */  /* 项目之间及两端空间完全相等 */

    /* ---- 4. align-items: 交叉轴对齐（单行） ---- */
    /* 控制项目在交叉轴上的对齐方式 */
    align-items: stretch;           /* 默认: 拉伸至填满容器 */
    /* align-items: flex-start; */   /* 交叉轴起点对齐 */
    /* align-items: flex-end; */     /* 交叉轴终点对齐 */
    /* align-items: center; */       /* 交叉轴居中对齐 */
    /* align-items: baseline; */     /* 基线对齐（文字底对齐）*/

    /* ---- 5. align-content: 多行交叉轴对齐 ---- */
    /* 仅在有多行（wrap）时生效 */
    align-content: stretch;         /* 默认: 多行拉伸平分空间 */
    /* align-content: flex-start; */
    /* align-content: center; */
    /* align-content: space-between; */
    /* align-content: space-evenly; */

    /* ---- 6. gap: 项目之间的间距 ---- */
    gap: 16px;                      /* 行列统一间距 */
    /* row-gap: 16px; */            /* 行间距（主轴方向）*/
    /* column-gap: 16px; */         /* 列间距（交叉轴方向）*/
}
```

### 7.3 项目属性（Item Properties）

```css
/* ===== Flex 项目属性（写在子元素上）===== */

.flex-item {
    /* ---- 1. order: 排列顺序 ---- */
    order: 0;                      /* 默认: 0，数值越小越靠前 */
    /* order: -1; */               /* 排在最前面 */
    /* order: 1; */                /* 排到最后面 */

    /* ---- 2. flex-grow: 放大比例 ---- */
    /* 容器有剩余空间时，项目的放大比例 */
    flex-grow: 0;                  /* 默认: 0（不放大）*/
    /* flex-grow: 1; */            /* 等分剩余空间 */
    /* flex-grow: 2; */            /* 占 2 份（别人 1 份的话占 2/3）*/

    /* ---- 3. flex-shrink: 缩小比例 ---- */
    /* 容器空间不足时，项目的缩小比例 */
    flex-shrink: 1;                /* 默认: 1（等比例缩小）*/
    /* flex-shrink: 0; */          /* 不缩小（可能溢出）*/

    /* ---- 4. flex-basis: 基础大小 ---- */
    /* 在分配多余空间之前，项目占据的主轴大小 */
    flex-basis: auto;              /* 默认: auto（根据内容）*/
    /* flex-basis: 200px; */       /* 固定 200px */
    /* flex-basis: 0; */           /* 0 时 grow/shrink 计算更可控 */

    /* ---- 5. flex: 简写属性 ---- */
    /* 语法: flex: grow shrink basis */
    flex: 0 1 auto;                /* 默认值（等同于 flex: initial）*/
    /* flex: 1; */                  /* 等同于 flex: 1 1 0%（常用简写）*/
    /* flex: auto; */               /* 等同于 flex: 1 1 auto */
    /* flex: none; */               /* 等同于 flex: 0 0 auto（完全不伸缩）*/

    /* ---- 6. align-self: 单独覆盖 align-items ---- */
    align-self: auto;              /* 默认: 继承容器的 align-items */
    /* align-self: flex-start; */   /* 此项单独起点对齐 */
    /* align-self: center; */       /* 此项单独居中 */
    /* align-self: stretch; */      /* 此项单独拉伸 */
}
```

### 7.4 常见 Flexbox 布局模式

```css
/* ===== 模式1: 水平居中 ===== */
.center-horizontal {
    display: flex;
    justify-content: center; /* 主轴居中 */
}

/* ===== 模式2: 垂直居中 ===== */
.center-vertical {
    display: flex;
    flex-direction: column;  /* 主轴改为纵向 */
    justify-content: center; /* 主轴（此时是纵向）居中 */
}

/* ===== 模式3: 完美居中（水平+垂直）★★★ ===== */
.perfect-center {
    display: flex;
    justify-content: center; /* 主轴居中 */
    align-items: center;     /* 交叉轴居中 */
    min-height: 100vh;       /* 确保容器有足够高度 */
}

/* ===== 模式4: 两端对齐导航栏 ===== */
.navbar {
    display: flex;
    justify-content: space-between; /* 两端对齐 */
    align-items: center;            /* 垂直居中 */
    padding: 0 20px;
    height: 64px;
}

/* ===== 模式5: 等分三栏布局 ===== */
.equal-columns {
    display: flex;
    gap: 20px;
}
.equal-columns > * {
    flex: 1; /* 每个子元素等分剩余空间 */
}

/* ===== 模式6: 左固定 + 右自适应（圣杯布局简化版）===== */
.main-layout {
    display: flex;
    gap: 20px;
}
.sidebar-fixed {
    flex: 0 0 250px; /* 不伸缩，固定 250px */
    /* 等同于: width: 250px; flex-shrink: 0; */
}
.content-flexible {
    flex: 1; /* 占据剩余所有空间 */
}

/* ===== 模式7: 底部固定（Footer 始终在底部）===== */
.page-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* 至少占满视口高度 */
}
.header-area {
    flex: 0 0 auto; /* 头部不伸缩 */
}
.main-area {
    flex: 1; /* 主体占据剩余空间（把 footer 推到底部）*/
}
.footer-area {
    flex: 0 0 auto; /* 底部不伸缩 */
}

/* ===== 模式8: 卡片内部布局 ===== */
.card {
    display: flex;
    flex-direction: column;
}
.card-body {
    flex: 1; /* 主体内容区占据剩余空间 */
}
.card-footer {
    /* footer 自然沉底 */
}

/* ===== 模式9: 媒体对象模式（头像 + 内容）===== */
.media-object {
    display: flex;
    align-items: flex-start; /* 顶部对齐 */
    gap: 12px;
}
.media-avatar {
    flex: 0 0 auto; /* 头像不伸缩 */
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
.media-content {
    flex: 1; /* 内容区自适应 */
    min-width: 0; /* 重要！防止内容撑开（配合 text-overflow）*/
}
.media-content h4 {
    margin: 0 0 4px;
}
.media-content p {
    margin: 0;
    /* 文本溢出省略 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

#### 🔬 手写模拟：Flex 布局算法核心思路（伪代码 + 图解）

> 以下伪代码模拟浏览器 Flex 布局引擎的核心计算流程，帮助理解 `flex-grow`、`flex-shrink`、`flex-basis` 的协作机制。

```
Flex 布局算法 — 9 步核心流程（基于 W3C Flexbox 规范 §9.7）
═════════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────────┐
  │                  输入: 容器 + 子元素                   │
  │  container: { width, direction, wrap, justify, ... }  │
  │  items: [ { flex, basis, grow, shrink, ... }, ... ]  │
  └──────────────────┬───────────────────────────────────┘
                     ▼
  ┌──────────────────────────────────────────────────────┐
  │ Step 1-3: 初始化                                      │
  │  → 确定主轴/交叉轴方向                                 │
  │  → 收集所有 flex item，按 order 排序                   │
  │  → 建立 flex lines（换行时可能有多行）                 │
  └──────────────────┬───────────────────────────────────┘
                     ▼
  ┌──────────────────────────────────────────────────────┐
  │ Step 4-5: 计算 flex basis（基础尺寸）★ 关键步骤        │
  │  → 解析每个 item 的 flex-basis 值                    │
  │  → 如果 basis=auto → 取内容固有宽度（内容优先）        │
  │  → 如果有 min-width/max-width 约束 → 应用约束         │
  └──────────────────┬───────────────────────────────────┘
                     ▼
  ┌──────────────────────────────────────────────────────┐
  │ Step 6: 计算放大（flex-grow）                          │
  │  if (容器剩余空间 > 0) {                               │
  │    totalGrow = Σ(item.flexGrow)                       │
  │    每个item分配 = 剩余空间 × (grow / totalGrow)       │
  │  }                                                    │
  └──────────────────┬───────────────────────────────────┘
                     ▼
  ┌──────────────────────────────────────────────────────┐
  │ Step 7-8: 计算缩小（flex-shrink）                      │
  │  if (容器空间不足 < 0) {                               │
  │    totalShrink = Σ(basis×shrink)  // 加权求和          │
  │    每个item收缩 = 不足量 × (basis×shrink/totalShrink) │
  │    // 注意: shrink 是按比例"加权"收缩的!               │
  │  }                                                    │
  └──────────────────┬───────────────────────────────────┘
                     ▼
  ┌──────────────────────────────────────────────────────┐
  │ Step 9: 交叉轴对齐 & 最终定位                          │
  │  → align-items / align-self 设置交叉轴位置             │
  │  → justify-content 设置主轴分布                        │
  │  → 绝对定位每个 item 的 x, y 坐标                      │
  └──────────────────┬───────────────────────────────────┘
                     ▼
  ┌──────────────────────────────────────────────────────┐
  │              输出: 每个 item 的最终尺寸和坐标           │
  └──────────────────────────────────────────────────────┘

═════════════════════════════════════════════════════════
```

```javascript
/**
 * ============================================================
 *  简易 Flex 布局引擎（伪代码）
 *  模拟浏览器在 Layout 阶段对 flex 容器的布局计算过程
 *  仅展示核心逻辑，省略了边界情况和 W3C 规范的细节
 * ============================================================
 */

function performFlexLayout(container, items) {

    // ══════════════════════════════════════════════════
    // 第一阶段：初始化与轴方向确定
    // ══════════════════════════════════════════════════
    const isRow = (container.flexDirection === 'row' ||
                   container.flexDirection === 'row-reverse');
    // 主轴方向: row→水平(x), column→垂直(y)
    const mainAxis  = isRow ? 'width' : 'height';   // 主轴尺寸属性
    const crossAxis = isRow ? 'height' : 'width';   // 交叉轴尺寸属性

    // 容器在主轴上的可用空间
    const containerMainSize = container[mainAxis];  // 如 container.width

    // 按 order 属性排序（默认 order=0）
    const sortedItems = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));

    // ══════════════════════════════════════════════════
    // 第二阶段：解析每个 item 的 flex-basis（基础主轴尺寸）
    // 这是整个算法的起点！所有后续计算都基于此值
    // ══════════════════════════════════════════════════
    sortedItems.forEach(item => {
        // 解析 flex-basis 值
        if (item.flexBasis === 'auto') {
            // auto → 取元素的"内容固有尺寸"
            // 例如: 文字长度决定宽度、图片原始大小等
            item.resolvedBasis = item.intrinsicMainSize;  // 内容决定的尺寸
        } else {
            // 具体数值（如 200px、0%、150px 等）
            item.resolvedBasis = item.flexBasis;
        }

        // 应用 min/max 约束（不能小于 min-width，不能大于 max-width）
        item.resolvedBasis = clamp(
            item.resolvedBasis,
            item.minSize || 0,     // 默认最小为 0（但 auto 时可能由内容决定）
            item.maxSize || Infinity
        );
    });

    // ══════════════════════════════════════════════════
    // 第三阶段：计算总的基础尺寸占用
    // ══════════════════════════════════════════════════
    let totalBasis = 0;             // 所有 item 的 basis 总和
    let totalGap = 0;               // gap 间距总和
    const gapValue = container.gap || 0;

    sortedItems.forEach((item, index) => {
        totalBasis += item.resolvedBasis;
        if (index > 0) totalGap += gapValue;  // 第一个 item 前没有 gap
    });

    // 核心判断：容器是"有剩余空间"还是"空间不足"？
    const freeSpace = containerMainSize - totalBasis - totalGap;

    // ══════════════════════════════════════════════════
    // 第四阶段：分支处理 —— 放大 or 缩小
    // ══════════════════════════════════════════════════
    if (freeSpace > 0 && container.flexWrap !== 'wrap') {
        // ── 情况 A：有剩余空间 → 执行 flex-grow 放大 ──
        // 只有当 flex-wrap 为 nowrap 且有空闲空间时才放大

        const totalGrowFactor = sortedItems.reduce(
            (sum, item) => sum + (item.flexGrow || 0), 0
        );

        sortedItems.forEach(item => {
            if (totalGrowFactor > 0 && (item.flexGrow || 0) > 0) {
                // ★ 核心: 按比例分配剩余空间
                const growShare = freeSpace * (item.flexGrow / totalGrowFactor);
                item.finalMainSize = item.resolvedBasis + growShare;

                // 再次应用 max 约束（放大后可能超过 max-width）
                item.finalMainSize = Math.min(item.finalMainSize, item.maxSize || Infinity);
            } else {
                // grow=0 的 item 保持原大小
                item.finalMainSize = item.resolvedBasis;
            }
        });

    } else if (freeSpace < 0) {
        // ── 情况 B：空间不足 → 执行 flex-shrink 缩小 ──

        const totalShrinkWeight = sortedItems.reduce((sum, item) => {
            // ★ 关键: shrink 权重 = basis × shrink因子
            // 这意味着基础越大的元素，收缩越多！
            return sum + item.resolvedBasis * (item.flexShrink || 0);
        }, 0);

        sortedItems.forEach(item => {
            if (totalShrinkWeight > 0 && (item.flexShrink || 0) > 0) {
                // ★ 核心: 按"加权比例"收缩
                const shrinkWeight = item.resolvedBasis * item.flexShrink;
                const shrinkAmount = Math.abs(freeSpace) * (shrinkWeight / totalShrinkWeight);
                item.finalMainSize = item.resolvedBasis - shrinkAmount;

                // 不能低于 min 约束
                item.finalMainSize = Math.max(item.finalMainSize, item.minSize || 0);
            } else {
                // shrink=0 的 item 不收缩（可能导致溢出）
                item.finalMainSize = item.resolvedBasis;
            }
        });
    } else {
        // ── 情况 C：刚好填满，无需伸缩 ──
        sortedItems.forEach(item => {
            item.finalMainSize = item.resolvedBasis;
        });
    }

    // ══════════════════════════════════════════════════
    // 第五阶段：主轴对齐（justify-content）
    // 计算每个 item 在主轴上的起始位置
    // ══════════════════════════════════════════════════
    // 先重新计算实际占用的总尺寸（可能有约束截断后的差异）
    let actualTotal = 0;
    sortedItems.forEach((item, i) => {
        actualTotal += item.finalMainSize;
        if (i > 0) actualTotal += gapValue;
    });
    const actualFreeSpace = containerMainSize - actualTotal;

    // 根据 justify-content 分配起始偏移
    let mainOffset = 0;  // 主轴方向当前偏移量
    switch (container.justifyContent) {
        case 'flex-start':  mainOffset = 0; break;                         // 默认: 从起点排列
        case 'flex-end':    mainOffset = actualFreeSpace; break;           // 从终点排列
        case 'center':      mainOffset = actualFreeSpace / 2; break;       // 居中
        case 'space-between':
            // 两端对齐: item 之间均分剩余空间
            mainOffset = 0;
            const betweenGap = sortedItems.length > 1
                ? actualFreeSpace / (sortedItems.length - 1)
                : 0;
            // 后面在循环中累加 betweenGap
            break;
        case 'space-around':
            // 每个项目两侧空间相等
            mainOffset = actualFreeSpace / sortedItems.length / 2;
            break;
        case 'space-evenly':
            // 完全等分（含两端）
            mainOffset = actualFreeSpace / (sortedItems.length + 1);
            break;
    }

    // 分配主轴位置
    sortedItems.forEach((item, index) => {
        item.mainStart = mainOffset;
        item.mainEnd = mainOffset + item.finalMainSize;

        // 更新偏移（为下一个 item 准备）
        mainOffset += item.finalMainSize + gapValue;

        // space-between 特殊处理: 在项目之间插入额外间距
        if (container.justifyContent === 'space-between' &&
            index < sortedItems.length - 1) {
            mainOffset += (sortedItems.length > 1)
                ? actualFreeSpace / (sortedItems.length - 1)
                : 0;
        }
    });

    // ══════════════════════════════════════════════════
    // 第六阶段：交叉轴对齐（align-items / align-self）
    // ══════════════════════════════════════════════════
    const containerCrossSize = container[crossAxis];

    sortedItems.forEach(item => {
        // align-self 可以覆盖容器的 align-items
        const align = item.alignSelf || container.alignItems || 'stretch';

        switch (align) {
            case 'stretch':
                // 拉伸: 将 item 的交叉轴尺寸拉伸到与容器一致
                // （前提: item 在交叉轴上没有设置固定尺寸或 auto）
                if (!item[crossAxis] || item[crossAxis] === 'auto') {
                    item.finalCrossSize = containerCrossSize;
                } else {
                    item.finalCrossSize = item[crossAxis];
                }
                item.crossStart = 0;
                break;

            case 'flex-start':
                // 交叉轴起点对齐
                item.finalCrossSize = item[crossAxis] || item.intrinsicCrossSize;
                item.crossStart = 0;
                break;

            case 'flex-end':
                // 交叉轴终点对齐
                item.finalCrossSize = item[crossAxis] || item.intrinsicCrossSize;
                item.crossStart = containerCrossSize - item.finalCrossSize;
                break;

            case 'center':
                // 交叉轴居中
                item.finalCrossSize = item[crossAxis] || item.intrinsicCrossSize;
                item.crossStart = (containerCrossSize - item.finalCrossSize) / 2;
                break;

            case 'baseline':
                // 基线对齐（文字底对齐）—— 最复杂的情况
                // 需要测量每个 item 中第一行文字的基线位置
                item.finalCrossSize = item[crossAxis] || item.intrinsicCrossSize;
                // 基线对齐需要额外计算（此处简化）
                item.crossStart = 0;  // 实际实现需遍历计算基线偏移
                break;
        }

        item.crossEnd = item.crossStart + item.finalCrossSize;
    });

    // ══════════════════════════════════════════════════
    // 第七阶段：输出最终布局结果
    // ══════════════════════════════════════════════════
    return sortedItems.map(item => ({
        // 转换为实际的 x/y/width/height（考虑主轴方向）
        ...(isRow ? {
            x: item.mainStart,
            y: item.crossStart,
            width: item.finalMainSize,
            height: item.finalCrossSize,
        } : {
            x: item.crossStart,
            y: item.mainStart,
            width: item.finalCrossSize,
            height: item.finalMainSize,
        }),
        // 调试信息
        _debug: {
            basis: item.resolvedBasis,
            grow: item.flexGrow,
            shrink: item.flexShrink,
        }
    }));
}
// ══════════════════════════════════════════════════════════════
//              使用示例：具体数值走一遍流程
// ══════════════════════════════════════════════════════════════

/*
  场景: 容器 width:500px, 包含 3 个子元素

  ┌─────────────────────────────────────────────────────┐
  │  Container (display:flex, width:500px)              │
  │                                                     │
  │  ┌──────────┐ ┌────────────────┐ ┌──────────┐       │
  │  │ Item A   │ │     Item B     │ │ Item C   │       │
  │  │ flex:1   │ │   flex:2       │ │ flex:1   │       │
  │  └──────────┘ └────────────────┘ └──────────┘       │
  │                                                     │
  └─────────────────────────────────────────────────────┘

  计算过程:
  ───────────────────────────────────────────────────────
  ① 所有 item 的 flex-basis: 0（因为 flex:1 = flex:1 1 0%）
  ② totalBasis = 0 + 0 + 0 = 0
  ③ freeSpace = 500 - 0 = 500px（大量剩余空间!）
  ④ totalGrow = 1 + 2 + 1 = 4
  ⑤ 分配:
     Item A: 0 + 500 × (1/4) = 125px
     Item B: 0 + 500 × (2/4) = 250px
     Item C: 0 + 500 × (1/4) = 125px
  ⑥ 结果: 125 + 250 + 125 = 500px ✓ 刚好填满!
*/

const result = performFlexLayout(
    // 容器配置
    {
        width: 500,
        height: 200,
        flexDirection: 'row',         // 主轴水平向右
        justifyContent: 'flex-start', // 主轴起点对齐
        alignItems: 'stretch',        // 交叉轴拉伸
        flexWrap: 'nowrap',
        gap: 0,
    },
    // 子元素配置
    [
        { flexGrow: 1, flexShrink: 1, flexBasis: 0, order: 0 },  // A: flex:1
        { flexGrow: 2, flexShrink: 1, flexBasis: 0, order: 0 },  // B: flex:2
        { flexGrow: 1, flexShrink: 1, flexBasis: 0, order: 0 },  // C: flex:1
    ]
);

console.log('=== Flex 布局结果 ===');
result.forEach((r, i) => {
    console.log(`Item ${String.fromCharCode(65+i)}: x=${r.x}, y=${r.y}, ` +
                `w=${r.width}px, h=${r.height}px`);
});
// 输出: Item A: x=0, y=0, w=125, h=200
//       Item B: x=125, y=0, w=250, h=200
//       Item C: x=375, y=0, w=125, h=200
/**
 * 辅助函数: 数值裁剪到指定范围 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
```

```
Flex 布局算法核心计算可视化
═══════════════════════════════════════════════════

  示例: 容器 500px, 三个子元素 flex:1 | flex:2 | flex:1

  ┌─ Step 1-3: 解析 flex-basis ──────────────────────────┐
  │                                                        │
  │  flex:1  →  grow:1, shrink:1, basis:0                 │
  │  flex:2  →  grow:2, shrink:1, basis:0                 │
  │  flex:1  →  grow:1, shrink:1, basis:0                 │
  │                                                        │
  │  totalBasis = 0+0+0 = 0                               │
  │                                                        │
  └────────────────────────────────────────────────────────┘
                           ▼
  ┌─ Step 4-6: 分配剩余空间 (freeSpace = 500-0 = 500px) ──┐
  │                                                        │
  │  totalGrow = 1+2+1 = 4                                │
  │                                                        │
  │  Item A: 0 + 500×(1/4) = ┌────┐                      │
  │                           │125px│ ← 25% 的剩余空间     │
  │  Item B: 0 + 500×(2/4) = ┌────────────┐              │
  │                           │   250px    │ ← 50% 的剩余空间│
  │  Item C: 0 + 500×(1/4) = ┌────┐                      │
  │                           │125px│ ← 25% 的剩余空间     │
  │                                                        │
  │  验证: 125+250+125 = 500px ✓                         │
  │                                                        │
  └────────────────────────────────────────────────────────┘
                           ▼
  ┌─ Step 7-9: 对齐与定位 ────────────────────────────────┐
  │                                                        │
  │  主轴(justify-content:flex-start):                     │
  │  ┌────┬────────────┬────┐                              │
  │  │ A  │     B      │ C  │  宽度500px                  │
  │  │125 │    250     │125 │                              │
  │  └────┴────────────┴────┘                              │
  │  ↑x=0  ↑x=125      ↑x=375                            │
  │                                                        │
  │  交叉轴(align-items:stretch):                          │
  │  所有 item 高度拉伸至容器高度(200px)                    │
  │                                                        │
  └────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════
```

#### 🎯 本章面试高频追问

> **Q1: `flex: 0 1 auto` 和 `flex: 1` 分别代表什么？为什么推荐用 `flex: 1` 而不是 `flex-grow: 1`？**

**答案方向：**
- `flex: 0 1 auto`（即 `flex: initial`）：grow=0 不放大，shrink=1 可缩小，basis=auto 按内容定尺寸 — 这是默认值，项目不会主动占满剩余空间
- `flex: 1` = `flex: 1 1 0%`：grow=1 可放大，shrink=1 可缩小，basis=0% 基础尺寸为0 — 所有项目从0开始等分空间，分配更均匀可控
- 推荐原因：`basis=0%` 让 grow 计算的起点一致，避免因内容长度不同导致分配不均

---

> **Q2: Flexbox 如何实现"不等分"的弹性布局？比如一个固定侧栏 + 一个自适应主内容区？**

**答案方向：**
- 固定区域：`flex: 0 0 200px`（或简写为 `width: 200px; flex-shrink: 0`）— 完全不伸缩
- 自适应区域：`flex: 1`（或 `flex: auto`）— 占据所有剩余空间
- 经典圣杯/双飞翼布局简化版就是基于此模式实现
- 如果需要最小宽度保护：加 `min-width: 0`（防止内容过长把 flex 项目撑开导致溢出）

---

> **Q3: `align-items: stretch` 为什么有时不生效？如何让子元素不被拉伸？**

**答案方向：**
- `stretch` 默认只在子元素的交叉轴尺寸为 `auto` 时才生效。如果子元素显式设置了 `height`（row 方向）或 `width`（column 方向），则不会被拉伸
- 要阻止拉伸：给子元素设置固定的交叉轴尺寸（如 `height: auto` 或具体像素值）
- 或者使用 `align-self: flex-start/flex-end/center` 覆盖容器的 `align-items` 设置

---

## 第8章 CSS 布局体系（三）：Grid

### 8.1 Grid 核心概念

```
Grid 布局模型 vs Flexbox 对比
═══════════════════════════════════════

  Flexbox（一维布局）              Grid（二维布局）
  ══════════════════              ══════════════════

  只处理一个方向                  同时处理行和列
  (主轴 OR 交叉轴)                (行 AND 列)

  ┌──────────────────┐           ┌───┬───┬───┬───┐
  │ Item Item Item   │           │ 1 │ 2 │ 3 │ 4 │
  └──────────────────┘           ├───┼───┼───┤
                                  │ 5 │ 6 │ 7 │ 8 │
  适用场景:                        └───┴───┴───┴───┘
  · 导航栏/工具栏                 适用场景:
  · 卡片列表                     · 整体页面布局
  · 居中对齐                     · 复杂仪表盘
  · 一行/一列排列                 · 网格卡片墙
  · 内容不确定的列表              · 行列都确定的布局

  核心差异:
  ════════
  Flex: Content-first（内容驱动）
        子元素大小影响布局

  Grid:  Layout-first（布局驱动）
        先定义轨道再放内容

═══════════════════════════════════════
```

### 8.2 Grid 容器属性

```css
/* ===== Grid 容器属性（写在父元素上）===== */

.grid-container {
    display: grid; /* 启用网格布局 */

    /* ---- 1. 定义列轨道（Columns） ---- */
    /* 显式定义每一列的宽度 */
    grid-template-columns: 200px 1fr 200px;
    /* 含义: 第1列200px, 第2列自适应剩余空间, 第3列200px */

    /* 使用 repeat() 简化重复定义 */
    grid-template-columns: repeat(4, 1fr);
    /* 等同于: 1fr 1fr 1fr 1fr（四等分）*/

    /* 使用 minmax() 设置最小/最大值 */
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    /* 每列至少 200px，最大平分剩余空间 */

    /* 使用 auto-fit/auto-fill 自适应列数 */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    /* 自动填充尽可能多的 250px 以上宽度的列 */

    /* 命名网格线 */
    grid-template-columns: [sidebar-start] 250px [sidebar-end main-start] 1fr [main-end];
    /* 网格线可以拥有名称，方便引用 */

    /* ---- 2. 定义行轨道（Rows） ---- */
    grid-template-rows: auto 1fr auto;
    /* 第1行: 根据内容高度 */
    /* 第2行: 占据剩余空间 */
    /* 第3行: 根据内容高度 */

    grid-template-rows: repeat(2, 100px) 200px;
    /* 两行 100px + 一行 200px */

    /* ---- 3. 间距（Gap） ---- */
    gap: 20px;           /* 行和列统一间距 */
    row-gap: 16px;       /* 行间距 */
    column-gap: 24px;    /* 列间距 */

    /* ---- 4. 区域命名（Grid Areas） ---- */
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
    /* 用文字画出一个布局草图！非常直观 */

    /* ---- 5. 项目放置方式 ---- */
    justify-items: start;    /* 项目在单元格内水平对齐 */
    /* stretch(默认) | start | end | center | baseline */

    align-items: start;      /* 项目在单元格内垂直对齐 */
    /* stretch(默认) | start | end | center | baseline */

    place-items: center;    /* justify-items + align-items 的简写 */

    /* ---- 6. 整体内容对齐（网格小于容器时） ---- */
    justify-content: center; /* 整个网格在容器内水平对齐 */
    align-content: center;   /* 整个网格在容器内垂直对齐 */
    place-content: center;   /* 简写 */
}

/* ---- 7.隐式网格（Implicit Grid） ---- */
.grid-auto {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 显式定义了3列 */

    /* 当项目超出 3 列时，自动创建隐式行/列 */
    grid-auto-rows: minmax(100px, auto); /* 隐式行的默认高度 */
    grid-auto-columns: 100px;            /* 隐式列的默认宽度 */
    grid-auto-flow: row; /* 填充方向: row(先行后列) 或 column(先列后行)*/
    /* grid-auto-flow: row dense; */ /* dense: 尝试填充空隙（打包算法）*/
}
```

### 8.3 Grid 项目属性

```css
/* ===== Grid 项目属性（写在子元素上）===== */

.grid-item {
    /* ---- 1. 指定行列位置（基于网格线编号） ---- */
    grid-column-start: 1;  /* 从第 1 条列线开始 */
    grid-column-end: 3;    /* 到第 3 条列线结束（跨越 2 列）*/
    grid-row-start: 1;
    grid-row-end: 2;

    /* 简写形式 */
    grid-column: 1 / 3;    /* 从第 1 条线到第 3 条线 */
    grid-row: 1 / 2;

    /* 使用 span 关键字（跨越） */
    grid-column: 1 / span 2; /* 从第 1 条线开始，跨 2 列 */
    grid-row: span 2;        /* 跨 2 行（起始位置自动）*/

    /* 使用命名的网格线 */
    grid-column: sidebar-start / sidebar-end;

    /* ---- 2. 使用 grid-area 指定区域 ---- */
    grid-area: header;       /* 放入名为 "header" 的区域 */
    /* 需要父元素先定义 grid-template-areas */

    /* grid-area 也是 grid-row + grid-column 的超级简写 */
    grid-area: 1 / 1 / 3 / 4; /* row-start / col-start / row-end / col-end */

    /* ---- 3. 单个项目对齐（覆盖容器的 justify/align-items） ---- */
    justify-self: start;     /* 在单元格内水平对齐 */
    align-self: center;      /* 在单元格内垂直对齐 */
    place-self: center;      /* 简写 */
}
```

### 8.4 Grid 实战布局案例

```css
/* ===== 案例1: 经典 Holy Grail（圣杯）布局 ===== */
.holy-grail {
    display: grid;
    /* 定义 3 列: 侧边栏固定 + 主内容自适应 + 侧边栏固定 */
    grid-template-columns: 220px 1fr 220px;
    /* 定义 3 行: 头部自适应 + 主体占满剩余 + 底部自适应 */
    grid-template-rows: auto 1fr auto;
    /* 定义区域 */
    grid-template-areas:
        "header  header  header"
        "left    main    right"
        "footer  footer  footer";
    gap: 16px;
    min-height: 100vh;
}

.hg-header { grid-area: header; }
.hg-left   { grid-area: left; }
.hg-main   { grid-area: main; }
.hg-right  { grid-area: right; }
.hg-footer { grid-area: footer; }

/* ===== 案例2: 响应式自适应网格 ===== */
.auto-grid {
    display: grid;
    /* 核心: auto-fill + minmax 实现真正的响应式网格 */
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    /* auto-fill: 尽可能多地填充列，即使有空余 */
    /* auto-fit: 类似 auto-fill，但列会拉伸填满空间 */
}

/* ===== 案例3: 仪表盘 Dashboard 布局 ===== */
.dashboard {
    display: grid;
    /* 定义复杂的网格系统 */
    grid-template-columns: repeat(12, 1fr); /* 12 列栅格系统 */
    grid-template-rows: auto 200px 300px auto;
    gap: 16px;
}

.dash-header {
    grid-column: 1 / -1; /* 横跨所有列（-1 表示最后一条线）*/
}

.dash-stat-1 {
    grid-column: span 3;  /* 占 3 列 */
    grid-row: span 1;
}

.dash-chart {
    grid-column: 4 / -1;  /* 从第 4 列到最后一列 */
    grid-row: span 2;      /* 跨 2 行 */
}

.dash-table {
    grid-column: 1 / -1;  /* 全宽 */
}

/* ===== 案例4: Grid + Flex 混合布局（推荐实践）===== */
/* Grid 负责宏观二维布局，Flex 负责微观一维排列 */
.page-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    grid-template-rows: 64px 1fr auto;
    grid-template-areas:
        "header  header"
        "sidebar main"
        "sidebar footer";
    min-height: 100vh;
}

.pl-header {
    grid-area: header;
    display: flex; /* Header 内部用 Flex 做水平排列 */
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
}

.pl-sidebar {
    grid-area: sidebar;
    display: flex; /* 侧边栏内部用 Flex 做垂直菜单 */
    flex-direction: column;
    gap: 4px;
    padding: 16px;
}

.pl-main {
    grid-area: main;
    display: flex; /* 主内容区用 Flex 做卡片列表 */
    flex-direction: column;
    gap: 20px;
    padding: 24px;
}

.pl-footer {
    grid-area: footer;
}
```

### 8.5 Flexbox vs Grid 选型指南

| 对比维度 | Flexbox | Grid | 建议 |
|----------|---------|------|------|
| **维度** | 一维（行 **或** 列） | 二维（行 **和** 列） | 需要二维→Grid |
| **内容适应性** | 内容驱动（Content-first） | 布局驱动（Layout-first） | 内容大小不一→Flex |
| **重叠/层叠** | 不支持（需 margin 负值 hack） | 天然支持（`grid-area` 可重叠） | 需要重叠→Grid |
| **浏览器支持** | 更早广泛支持 | 现代浏览器全面支持 | 都没问题 |
| **学习曲线** | 较简单 | 概念较多 | 快速上手→Flex |
| **典型场景** | 导航栏、卡片内部、居中、组件级 | 页面框架、仪表盘、卡片墙、复杂布局 | **两者经常配合使用** |

> **黄金法则**: 先问自己——这个布局是一维的还是二维的？
> - 一维（一行或一列排列）→ **Flexbox**
> - 二维（同时控制行和列）→ **Grid**
> - **最佳实践**: Grid 做整体框架（宏观），Flex 做组件内部（微观）

---

## 第9章 CSS 响应式设计

### 9.1 响应式设计核心理念

```
响应式设计策略对比
═══════════════════════════════════════

  Desktop First（桌面优先）        Mobile First（移动优先）★ 推荐
  ══════════════════════          ══════════════════════

  从大屏开始写                    从小屏开始写
  用 max-width 媒体查询增加       用 min-width 媒体查询增强
  ↓                               ↓

  base styles (desktop)           base styles (mobile)
      ↓                               ↓
  @media (max-width: 1024px)     @media (min-width: 768px)
      ↓                               ↓
  @media (max-width: 768px)       @media (min-width: 1024px)
      ↓                               ↓
  ...                              ...

  问题:                            优势:
  · 基础样式臃肿（桌面版代码量大）   · 基础样式精简（移动版代码量小）
  · 可能遗漏移动端样式             · 移动端天然优先（流量大）
  · max-width 条件叠加混乱          · 样式递进增强，清晰明了

═══════════════════════════════════════
```

### 9.2 媒体查询（Media Queries）

```css
/* ===== 媒体查询基本语法 ===== */

/* 语法: @media 媒体类型 and (媒体特征) { ... } */

/* ---- 常用断点（Breakpoints）参考 ---- */

/* 超小屏手机 (< 576px) —— 基础样式（Mobile First 起始）*/
/* 默认样式写在这里 */

/* 小屏手机 (≥ 576px) */
@media screen and (min-width: 576px) {
    .container { max-width: 540px; }
}

/* 平板竖屏 (≥ 768px) */
@media screen and (min-width: 768px) {
    .container { max-width: 720px; }
    .grid { grid-template-columns: repeat(2, 1fr); }
}

/* 平板横屏 / 小笔记本 (≥ 992px) */
@media screen and (min-width: 992px) {
    .container { max-width: 960px; }
    .grid { grid-template-columns: repeat(3, 1fr); }
}

/* 桌面显示器 (≥ 1200px) */
@media screen and (min-width: 1200px) {
    .container { max-width: 1140px; }
    .grid { grid-template-columns: repeat(4, 1fr); }
}

/* 大屏显示器 (≥ 1400px) */
@media screen and (min-width: 1400px) {
    .container { max-width: 1320px; }
}

/* ---- 媒体查询的特性 ---- */

/* 视口宽度/高度 */
@media (min-width: 768px) { }
@media (max-height: 500px) { } /* 适用于横屏手机等 */

/* 屏幕方向（横屏/竖屏）*/
@media (orientation: portrait) { }  /* 竖屏 */
@media (orientation: landscape) { } /* 横屏 */

/* 悬停能力检测（是否有鼠标）*/
@media (hover: hover) { }
/* 有鼠标时才显示 hover 效果，触摸设备不需要 */

/* 指针精度检测 */
@media (pointer: fine) { }   /* 精确指针（鼠标）*/
@media (pointer: coarse) { } /* 粗略指针（触摸屏）*/

/* 颜色方案偏好（深色/浅色模式）*/
@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #1a1a2e;
        --text-color: #eee;
        --card-bg: #16213e;
    }
}

/* 减弱动画偏好（无障碍）*/
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}

/* 组合条件 */
@media screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    /* 平板横屏专用样式 */
}

/* 逻辑运算符 */
@media not (min-width: 768px) { }       /* 非 */
@media (min-width: 768px), (print) { }  /* 或（满足其一即可）*/
```

### 9.3 响应式单位与技巧

```css
/* ===== 响应式单位体系 ===== */

:root {
    /* 基准字体大小（配合 rem 使用）*/
    font-size: 16px; /* 浏览器默认 */

    /* 设计稿基准宽度（用于 vw 计算）*/
    --design-width: 375;  /* 移动端设计稿通常 375px */
}

/* rem 方案: 根元素字体大小 + 媒体查询调整 */
html {
    font-size: 14px; /* 移动端基准 */
}

@media (min-width: 768px) {
    html { font-size: 16px; } /* 平板基准 */
}

@media (min-width: 1200px) {
    html { font-size: 18px; } /* 桌面基准 */
}

/* 使用 rem 的元素会随断点自动调整大小 */
.title {
    font-size: 2rem;   /* 移动: 28px, 平板: 32px, 桌面: 36px */
    padding: 1rem;
    margin-bottom: 1.5rem;
}

/* vw 方案: 直接相对于视口宽度 */
.vw-title {
    font-size: 4vw; /* 视口宽度的 4%，自动适应 */
    /* 但要注意: 太大的屏幕会变得过大 */
}

/* ★ clamp() 流体排版（最佳实践）*/
.fluid-type {
    /* 语法: clamp(最小值, 首选值, 最大值) */
    font-size: clamp(1rem, 2.5vw, 2rem);
    /* 最小 1rem, 最大 2rem, 中间用 2vw 过渡 */
    /* 完美的平滑缩放体验 */
}

.fluid-heading {
    font-size: clamp(1.5rem, 4vw + 1rem, 3.5rem);
    line-height: clamp(1.2, 2vw + 1, 1.5);
}

.fluid-spacing {
    padding: clamp(1rem, 5vw, 3rem);
    margin: clamp(0.5rem, 3vw, 2rem);
}

/* 响应式容器 */
.container-fluid {
    width: 100%;
    padding: 0 clamp(1rem, 5vw, 3rem);
    margin: 0 auto;
}

/* ===== 响应式图片 ===== */
.responsive-img {
    max-width: 100%;     /* 不超过容器宽度 */
    height: auto;        /* 保持原始宽高比 */
    display: block;      /* 消除底部间隙 */
}

/* 使用 object-fit 控制图片填充方式 */
.img-cover {
    width: 100%;
    height: 200px;
    object-fit: cover;   /* 裁剪填满（保持比例）*/
    /* object-fit: contain; */ /* 完整显示（可能有留白）*/
    /* object-fit: fill; */    /* 拉伸填满（可能变形）*/
    /* object-position: center; */ /* 调整对齐位置 */
}

/* ===== 响应式排版 ===== */
.responsive-text {
    /* 移动端: 较小的字号和行高 */
    font-size: clamp(0.875rem, 2vw, 1.125rem);
    line-height: 1.5;

    /* 桌面端: 更大的字号 */
    @media (min-width: 1024px) {
        font-size: 1.125rem;
        line-height: 1.7;
    }
}

/* ===== 响应式隐藏/显示 ===== */
/* Mobile First 思路: 默认显示，大屏隐藏 */
.hide-on-desktop {
    display: block;
}
@media (min-width: 1024px) {
    .hide-on-desktop { display: none; }
}

/* 默认隐藏，移动端显示 */
.show-on-mobile {
    display: none;
}
@media (max-width: 767px) {
    .show-on-mobile { display: block; }
}
```

### 9.4 完整响应式页面示例

```css
/* ===== 响应式个人主页布局（Mobile First）===== */

/* === 基础重置 === */
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* === CSS 变量（主题配置）=== */
:root {
    --color-primary: #6366f1;
    --color-primary-light: #818cf8;
    --color-bg: #ffffff;
    --color-bg-alt: #f8fafc;
    --color-text: #1e293b;
    --color-text-muted: #64748b;
    --color-border: #e2e8f0;
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
    --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);
    --radius: 12px;
    --transition: 0.3s ease;
}

/* === 基础排版（Mobile First 基准样式）=== */
body {
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    font-size: clamp(0.875rem, 2vw, 1rem);
    line-height: 1.6;
    color: var(--color-text);
    background: var(--color-bg);
}

/* === 导航栏 === */
.site-nav {
    display: flex;
    flex-direction: column; /* 移动端: 纵向堆叠 */
    gap: 12px;
    padding: 16px;
    position: sticky;
    top: 0;
    background: var(--color-bg);
    z-index: 100;
    box-shadow: var(--shadow-sm);
}

.nav-logo {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-primary);
    text-decoration: none;
}

.nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    list-style: none;
}

.nav-links a {
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color var(--transition);
}
.nav-links a:hover {
    color: var(--color-primary);
}

/* === Hero 区域 === */
.hero {
    padding: 48px 16px;
    text-align: center;
}

.hero-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--color-primary-light);
    margin-bottom: 24px;
}

.hero-name {
    font-size: clamp(1.75rem, 5vw, 2.5rem);
    font-weight: 800;
    margin-bottom: 8px;
}

.hero-title {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    color: var(--color-text-muted);
    margin-bottom: 24px;
}

.hero-buttons {
    display: flex;
    flex-direction: column; /* 移动端: 按钮纵向排列 */
    gap: 12px;
    align-items: center;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 28px;
    border-radius: 9999px;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all var(--transition);
    min-width: 160px;
}

.btn-primary {
    background: var(--color-primary);
    color: white;
}
.btn-primary:hover {
    background: var(--color-primary-light);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.btn-outline {
    border: 2px solid var(--color-primary);
    color: var(--color-primary);
    background: transparent;
}
.btn-outline:hover {
    background: var(--color-primary);
    color: white;
}

/* === 技能/项目卡片区 === */
.section {
    padding: 48px 16px;
    max-width: 1200px;
    margin: 0 auto;
}

.section-title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    text-align: center;
    margin-bottom: 32px;
}

.cards-grid {
    display: grid;
    grid-template-columns: 1fr; /* 移动端: 单列 */
    gap: 20px;
}

.card {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 24px;
    transition: transform var(--transition), box-shadow var(--transition);
}
.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.card-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 8px;
}

.card-desc {
    color: var(--color-text-muted);
    font-size: 0.9rem;
    line-height: 1.6;
}

/* === Footer === */
.site-footer {
    text-align: center;
    padding: 32px 16px;
    color: var(--color-text-muted);
    font-size: 0.875rem;
    border-top: 1px solid var(--color-border);
}
/* ============================================================
   响应式增强: 平板及以上 (≥ 768px)
   ============================================================ */
@media (min-width: 768px) {

    /* 导航栏改为横向 */
    .site-nav {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 16px 32px;
    }

    /* Hero 区域增大 */
    .hero {
        padding: 80px 32px;
    }

    .hero-avatar {
        width: 160px;
        height: 160px;
    }

    /* 按钮改为横向排列 */
    .hero-buttons {
        flex-direction: row;
        justify-content: center;
    }

    /* 卡片改为双列 */
    .cards-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
/* ============================================================
   响应式增强: 桌面 (≥ 1024px)
   ============================================================ */
@media (min-width: 1024px) {

    .site-nav {
        padding: 16px 48px;
    }

    .hero {
        padding: 120px 48px;
    }

    .hero-avatar {
        width: 200px;
        height: 200px;
    }

    .section {
        padding: 80px 48px;
    }

    /* 卡片改为三列 */
    .cards-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

---

## 第10章 CSS 进阶特性

### 10.1 CSS 自定义属性（Variables）

```css
/* ===== CSS 变量基础 ===== */

/* 1. 在 :root（或 html）中定义全局变量 */
:root {
    /* 颜色系统 */
    --color-primary: #3b82f6;
    --color-primary-dark: #2563eb;
    --color-success: #22c55e;
    --color-warning: #f59e0b;
    --color-danger: #ef4444;
    --color-text: #1f2937;
    --color-text-secondary: #6b7280;
    --color-bg: #ffffff;
    --color-bg-secondary: #f3f4f6;
    --color-border: #e5e7eb;

    /* 间距系统（8px 基准）*/
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    --space-2xl: 48px;

    /* 字体系统 */
    --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;

    /* 圆角 */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-full: 9999px;

    /* 阴影 */
    --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

    /* 过渡 */
    --transition-fast: 150ms ease;
    --transition-normal: 300ms ease;
    --transition-slow: 500ms ease;

    /* 层级 */
    --z-dropdown: 100;
    --z-sticky: 200;
    --z-modal: 1000;
    --z-tooltip: 1100;
}

/* 2. 使用 var() 函数引用变量 */
.button {
    /* 使用颜色变量 */
    background-color: var(--color-primary);
    color: white;

    /* 使用间距变量 */
    padding: var(--space-sm) var(--space-lg);

    /* 使用圆角变量 */
    border-radius: var(--radius-md);

    /* 使用阴影变量 */
    box-shadow: var(--shadow-sm);

    /* 使用过渡变量 */
    transition: all var(--transition-normal);
}

/* 3. 变量的默认值（fallback）*/
.element {
    /* 如果 --custom-color 未定义，则使用 #333 作为后备值 */
    color: var(--custom-color, #333);
    /* 可以链式 fallback */
    font-size: var(--size, var(--font-size-base, 16px));
}

/* 4. 作用域: 变量可以被子元素继承，也可以在特定选择器中覆盖 */
.card {
    --card-bg: var(--color-bg-secondary);
    background: var(--card-bg);
}

.card.featured {
    /* 在此选择器中重新定义变量，影响其所有子元素 */
    --card-bg: #fef3c7; /* 金色背景 */
    /* 子元素中使用 var(--card-bg) 会自动获得新值 */
}

/* 5. JavaScript 读写 CSS 变量 */
/*
  // 读取
  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue('--color-primary').trim();

  // 写入
  document.documentElement.style.setProperty('--color-primary', '#ec4899');

  // 删除（恢复为继承值或初始值）
  document.documentElement.style.removeProperty('--color-primary');
*/
```

### 10.2 CSS 动画与过渡

```css
/* ===== 过渡（Transition）===== */

/* 过渡: 属性从一个值平滑地变到另一个值 */
.transition-basic {
    /* 基本语法: property duration timing-function delay */
    transition: background-color 0.3s ease;

    /* 或分别指定多个属性 */
    transition-property: background-color, transform, opacity;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;

    /* 简写: transition: all 0.3s ease; */
    /* 注意: all 会过渡所有属性（包括不必要的），性能较差 */
}

/* 常用的 timing-function（缓动函数）*/
.transition-ease {
    /* ease: 默认值，相当于 cubic-bezier(0.25, 0.1, 0.25, 1.0) */
    transition: all 0.3s ease;
}
.transition-linear {
    transition: all 0.3s linear; /* 匀速 */
}
.transition-ease-in {
    transition: all 0.3s ease-in; /* 慢→快（加速）*/
}
.transition-ease-out {
    transition: all 0.3s ease-out; /* 快→慢（减速）★ 最自然 */
}
.transition-ease-in-out {
    transition: all 0.3s ease-in-out; /* 慢→快→慢 */
}
.transition-bounce {
    /* 自定义贝塞尔曲线（模拟弹跳效果）*/
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* ===== 关键帧动画（Keyframes Animation）===== */

/* 定义关键帧动画 */
@keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%   { transform: scale(1); }
    50%  { transform: scale(1.05); }
    100% { transform: scale(1); }
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
}

@keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        transform: translateY(0);
    }
    40%, 43% {
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        transform: translateY(-30px);
    }
    70% {
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        transform: translateY(-15px);
    }
    90% {
        transform: translateY(-4px);
    }
}

/* 应用动画 */
.animated-element {
    /* animation: name duration timing-function delay iteration-count direction fill-mode; */
    animation: fadeIn 0.6s ease forwards;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e2e8f0;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 0.8s linear infinite; /* 无限循环旋转 */
}

.pulse-button {
    animation: pulse 2s ease-in-out infinite; /* 无限脉冲效果 */
}

/* 动画属性详解 */
.animation-detail {
    animation-name: slideInUp;       /* 动画名称 */
    animation-duration: 0.6s;         /* 持续时间 */
    animation-timing-function: ease;  /* 缓动函数 */
    animation-delay: 0.2s;            /* 延迟时间 */
    animation-iteration-count: 3;     /* 播放次数（infinite=无限）*/
    animation-direction: normal;      /* 播放方向 */
    /*
        normal:           0% → 100%（正常）
        reverse:          100% → 0%（反向播放）
        alternate:        0% → 100% → 0%（来回）
        alternate-reverse: 100% → 0% → 100%（反向来回）
    */
    animation-fill-mode: both;        /* 填充模式 */
    /*
        none:   不保留动画样式
        forwards:  保留最后一帧的样式
        backwards: 立即应用第一帧样式（在延迟期间）
        both:    同时应用 forwards + backwards
    */
    animation-play-state: running;    /* 播放状态（running/paused）*/
}
/* ===== Transform 变换 ===== */

.transform-demo {
    /* --- 2D 变换 --- */

    /* 位移 */
    transform: translateX(100px);  /* 向右移动 100px */
    transform: translateY(-50px); /* 向上移动 50px */
    transform: translate(50px, 20px); /* 同时 X 和 Y */

    /* 缩放 */
    transform: scaleX(1.5);       /* 水平放大 1.5 倍 */
    transform: scaleY(0.8);       /* 垂直缩小到 0.8 */
    transform: scale(1.2);        /* 整体等比缩放 */

    /* 旋转 */
    transform: rotate(45deg);     /* 顺时针旋转 45 度 */
    transform: rotate(-90deg);    /* 逆时针旋转 90 度 */

    /* 倾斜 */
    transform: skewX(15deg);      /* X 轴倾斜 15 度 */
    transform: skewY(10deg);      /* Y 轴倾斜 10 度 */

    /* 组合变换（注意顺序影响结果！）*/
    transform: translate(50px, 50px) rotate(45deg) scale(1.2);

    /* 变换原点（默认 center）*/
    transform-origin: top left;    /* 从左上角开始变换 */
    transform-origin: 50% 50%;     /* 从中心点 */
    transform-origin: bottom right;

    /* --- 3D 变换 --- */
    /* 需要父元素设置 perspective（透视距离）*/

    /* 沿 Z 轴移动（近大远小）*/
    transform: translateZ(100px);
    transform: translate3d(10px, 20px, 50px);

    /* 3D 旋转 */
    transform: rotateX(45deg);     /* 绕 X 轴旋转（上下翻转感）*/
    transform: rotateY(45deg);     /* 绕 Y 轴旋转（左右翻转感）*/
    transform: rotate3d(1, 1, 0, 45deg);

    /* 缩放 Z 轴 */
    transform: scaleZ(2) rotateX(45deg);
}

/* 3D 变换容器设置 */
.scene-3d {
    /* 透视距离：越小透视效果越强烈 */
    perspective: 1000px;
    /* 透视原点 */
    perspective-origin: 50% 50%;
    /* 为子元素创建 3D 渲染空间 */
    transform-style: preserve-3d;
}

.card-3d {
    transform-style: preserve-3d;
    backface-visibility: hidden; /* 隐藏背面 */
}

.card-3d:hover {
    transform: rotateY(180deg); /* 翻转到背面 */
}

/* ===== 滤镜与混合模式 ===== */

.filter-demo {
    /* 基础滤镜函数 */
    filter: blur(5px);            /* 高斯模糊 */
    filter: brightness(1.2);      /* 亮度（1=原始, >1更亮）*/
    filter: contrast(1.5);        /* 对比度 */
    filter: grayscale(100%);      /* 灰度（0%=彩色, 100%=全灰）*/
    filter: sepia(80%);           /* 褐色调 */
    filter: saturate(2);          /* 饱和度 */
    filter: hue-rotate(90deg);    /* 色相旋转 */
    filter: invert(1);            /* 反色 */
    filter: opacity(0.7);         /* 透明度 */
    filter: drop-shadow(4px 4px 8px rgba(0,0,0,0.3)); /* 投影（支持透明）*/
    filter: brightness(1.1) contrast(1.1) saturate(1.1); /* 组合滤镜 */
}

/* 混合模式 */
.blend-mode-demo {
    /* background-blend-mode: 背景图/颜色之间的混合 */
    background-blend-mode: multiply;    /* 正片叠底（变暗）*/
    background-blend-mode: screen;      /* 滤色（变亮）*/
    background-blend-mode: overlay;     /* 叠加 */
    background-blend-mode: color-dodge; /* 颜色减淡 */
    background-blend-mode: luminosity;  /* 亮度 */

    /* mix-blend-mode: 元素与其下层内容的混合 */
    mix-blend-mode: multiply;
    /* 常用于文字叠加在图片上的效果 */
}

/* ===== will-change 属性 ===== */

/*
  will-change: 提前告知浏览器某个属性将会发生变化
  浏览器可以提前做好优化准备（如创建独立的图层）

  ⚠️ 使用原则:
  1. 不要过度使用（每个都会占用内存）
  2. 在动画开始前设置，结束后移除
  3. 只声明实际会变化的属性
*/

.will-change-transform {
    /* 告知浏览器 transform 将会变化 */
    will-change: transform;
    transition: transform 0.3s ease;
}
.will-change-transform:hover {
    transform: scale(1.05);
}

.will-change-opacity {
    will-change: opacity;
    transition: opacity 0.3s ease;
}

/* 复杂动画元素 */
.animated-card {
    will-change: transform, opacity; /* 多个属性用逗号分隔 */
}

/* 不要这样滥用！ */
/* * { will-change: transform; } */ /* ❌ 极其浪费内存 */

/* 推荐: 用 JS 在交互前后动态添加/移除 */
/*
  // 交互前添加
  element.style.willChange = 'transform';
  // 交互后移除
  element.addEventListener('transitionend', () => {
      element.style.willChange = 'auto';
  });
*/
```

---

## 第11章 CSS 现代方案概览

### 11.1 方案对比总览

| 方案 | 类型 | 作用域 | 运行时 | 全局污染 | 适用场景 |
|------|------|--------|--------|----------|----------|
| **原生 CSS** | 无工具 | 全局 | 无 | ✅ 有 | 小型项目、静态页面 |
| **CSS Modules** | 编译时构建 | 组件级 | 无 | ❌ 自动隔离 | React/Vue 组件库 |
| **CSS-in-JS** | 运行时 JS | 组件级 | 有（注入 `<style>`）| ❌ 隔离 | 动态主题、SSR 项目 |
| **Tailwind CSS** | 原子化/JIT | 工具类优先 | 无（编译后）| ❌ 原子化 | 快速开发、设计系统 |
| **Sass/Less** | 预处理器 | 文件级 | 编译阶段 | 取决于用法 | 大型项目、设计 Token |

### 11.2 CSS Modules

```css
/* ===== CSS Modules 工作原理 ===== */

/* 文件: Button.module.css */

/* CSS Modules 会自动将类名转换为唯一标识符 */

.baseButton {
    /* 基础按钮样式 */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.primary {
    background-color: #3b82f6;
    color: white;
}

.primary:hover {
    background-color: #2563eb;
}

.secondary {
    background-color: transparent;
    color: #3b82f6;
    border: 1px solid #3b82f6;
}

.large {
    padding: 14px 28px;
    font-size: 16px;
}

.small {
    padding: 6px 12px;
    font-size: 12px;
}

/* :global() —— 声明为全局类名（不进行转换）*/
:global .active {
    font-weight: bold;
}

/* composes —— 组合其他类的规则 */
.iconButton {
    composes: baseButton; /* 继承 baseButton 的所有规则 */
    gap: 8px;
    padding: 8px 16px;
}
```

```jsx
// CSS Modules 的使用方式（React 示例）
import styles from './Button.module.css';

function Button({ variant = 'primary', size = 'md', children }) {
    // styles 对象的 key 就是类名，value 是编译后的唯一类名
    return (
        <button className={`${styles.baseButton} ${styles[variant]} ${styles[size]}`}>
            {children}
        </button>
    );
}

// 编译后的 HTML:
// <button class="baseButton_abc123 primary_def456 lg_xyz789">
//   点击我
// </button>
// 类名被自动哈希化，避免全局冲突
```

### 11.3 CSS-in-JS

```jsx
// ===== styled-components (最流行的运行时 CSS-in-JS)=====

import styled from 'styled-components';

// 创建带样式的组件（标签模板字面量语法）
const StyledButton = styled.button`
    /* 直接写 CSS，支持嵌套、变量、伪类等 */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${props => props.$lg ? '14px 28px' : '10px 20px'};
    border-radius: 8px;
    font-size: ${props => props.$lg ? '16px' : '14px'};
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;

    /* 根据 props 动态改变样式 */
    background-color: ${props => {
        if (props.variant === 'secondary') return 'transparent';
        if (props.variant === 'danger') return '#ef4444';
        return '#3b82f6'; /* default primary */
    }};

    color: ${props => props.variant === 'secondary' ? '#3b82f6' : 'white'};

    border: ${props => props.variant === 'secondary' ? '1px solid #3b82f6' : 'none'};

    &:hover {
        background-color: ${props => {
            if (props.variant === 'secondary') return '#eff6ff';
            if (props.variant === 'danger') return '#dc2626';
            return '#2563eb';
        }};
    }

    &:active {
        transform: scale(0.98);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

// 继承 / 扩展样式
const PrimaryButton = styled(StyledButton)`
    background-color: #8b5cf6;
    &:hover { background-color: #7c3aed; }
`;

// 使用主题
const ThemedCard = styled.div`
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    padding: ${props => props.theme.spacing.lg};
    border-radius: ${props => props.theme.radius.md}`;
```

```jsx
// ===== emotion (另一种流行的 CSS-in-JS)=====

/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';

// css prop 方式（推荐）
function Button({ variant = 'primary' }) {
    const buttonStyles = css`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        background-color: ${variant === 'danger' ? '#ef4444' : '#3b82f6'};
        color: white;

        &:hover {
            background-color: ${variant === 'danger' ? '#dc2626' : '#2563eb'};
        }
    `;

    return <button css={buttonStyles}>点击</button>;
}

// 样式复用
const flexCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

// 动画
const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;
```

### 11.4 Tailwind CSS 原子化方案

```html
<!-- ===== Tailwind CSS 核心理念 ===== -->
<!--
  Tailwind 提供大量低级、单一职责的 CSS 工具类（Utility-First）
  通过组合这些原子类来快速构建任意 UI

  设计决策: 不再编写自定义 CSS，直接在 HTML 中组合工具类
-->

<!-- 基础示例 -->
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <!-- max-w-md: 最大宽度 28rem -->
    <!-- mx-auto: 水平居中 (margin-left/right: auto) -->
    <!-- bg-white: 白色背景 -->
    <!-- rounded-xl: 圆角 0.75rem -->
    <!-- shadow-md: 中等阴影 -->
    <!-- overflow-hidden: 内容溢出隐藏 -->

    <div class="md:flex">
        <!-- md:flex: 中屏及以上启用 flex 布局 -->

        <div class="md:shrink-0">
            <!-- md:shrink-0: flex 子项不收缩 -->
            <img class="h-48 w-full object-cover md:h-full md:w-48"
                 src="/img.jpg" alt="图片">
        </div>

        <div class="p-8">
            <!-- p-8: padding 2rem -->
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                <!-- uppercase: 大写字母 -->
                <!-- tracking-wide: 加宽字间距 -->
                <!-- text-sm: 小字号 -->
                <!-- text-indigo-500: 靛蓝色 -->
                <!-- font-semibold: 半粗体 -->
                博客文章
            </div>
            <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                <!-- block: 块级显示 -->
                <!-- mt-1: margin-top 0.25rem -->
                <!-- leading-tight: 紧凑行高 -->
                <!-- hover:underline: 悬停下划线 -->
                用 Tailwind 构建现代界面
            </a>
            <p class="mt-2 text-slate-500">
                Tailwind 是一个实用优先的 CSS 框架...
            </p>
        </div>
    </div>
</div>
```

```css
/* ===== Tailwind 配置文件 (tailwind.config.js) ===== */
/*
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                },
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            screens: {
                'xs': '475px',
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
            },
        },
    },
    plugins: [],
};
*/
```

### 11.5 预处理器对比：Sass vs Less

```
预处理器能力对比
═══════════════════════════════════════

  ┌────────────────┬───────────────┬───────────────┐
  │     特性        │     Sass      │     Less      │
  ├────────────────┼───────────────┼───────────────┤
  │ 语法风格        │ SCSS (类CSS)  │ 类CSS          │
  │               │ 或 Sass (缩进) │               │
  ├────────────────┼───────────────┼───────────────┤
  │ 变量           │ $var          │ @var          │
  ├────────────────┼───────────────┼───────────────┤
  │ 嵌套           │ ✅ 支持       │ ✅ 支持        │
  ├────────────────┼───────────────┼───────────────┤
  │ Mixin (混入)   │ ✅ 强大       │ ✅ 基础        │
  ├────────────────┼───────────────┼───────────────┤
  │ 函数           │ ✅ 丰富内置    │ 有限           │
  ├────────────────┼───────────────┼───────────────┤
  │ 条件/循环       │ @if/@each/... │ guarded mixins │
  ├────────────────┼───────────────┼───────────────┤
  │ 模块化 (@use)  │ ✅ Dart Sass  │ @import       │
  ├────────────────┼───────────────┼───────────────┤
  │ 运行环境        │ Node.js/Ruby  │ JavaScript    │
  ├────────────────┼───────────────┼───────────────┤
  │ 生态成熟度      │ ★★★★★        │ ★★★☆☆         │
  ├────────────────┼───────────────┼───────────────┤
  │ 推荐度          │ ★★★★★        │ ★★☆☆☆         │
  └────────────────┴───────────────┴───────────────┘

═══════════════════════════════════════
```

```scss
// ===== Sass (SCSS) 语法示例 =====

// ---- 变量 ----
$primary-color: #3b82f6;
$font-size-base: 1rem;
$spacing-unit: 8px;
$border-radius: 8px;

// ---- 嵌套 ----
.card {
    background: white;
    border-radius: $border-radius;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    &-header { // => .card-header
        padding: 16px;
        border-bottom: 1px solid #e5e7eb;

        // 媒体查询也可以嵌套!
        @media (min-width: 768px) {
            padding: 24px;
        }
    }

    &-body { // => .card-body
        padding: 16px;
    }

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
    }

    .title { // => .card .title
        font-size: $font-size-base * 1.25;
        color: $primary-color;
    }
}

// ---- Mixin（混入）：可复用的代码块 ----
@mixin flex-center($direction: row) {
    display: flex;
    flex-direction: $direction;
    align-items: center;
    justify-content: center;
}

@mixin respond-to($breakpoint) {
    @if $breakpoint == tablet {
        @media (min-width: 768px) { @content; }
    } @else if $breakpoint == desktop {
        @media (min-width: 1024px) { @content; }
    } @else if $breakpoint == wide {
        @media (min-width: 1400px) { @content; }
    }
}

// 使用 Mixin
.navbar {
    @include flex-center(row);
    gap: 24px;
    padding: 0 16px;

    @include respond-to(tablet) {
        padding: 0 32px;
    }
}

// ---- 函数 ----
@function px-to-rem($px, $base: 16) {
    @return calc($px / $base) * 1rem;
}

.title-h1 {
    font-size: px-to-rem(32); // => 2rem
}

// ---- 循环 ----
// 生成间距工具类
@for $i from 1 through 6 {
    .mt-#{$i} { margin-top: $spacing-unit * $i; }
    .mb-#{$i} { margin-bottom: $spacing-unit * $i; }
    .ml-#{$i} { margin-left: $spacing-unit * $i; }
    .mr-#{$i} { margin-right: $spacing-unit * $i; }
}

// ---- Map 数据结构 + each 循环 ----
$colors: (
    'primary': #3b82f6,
    'success': #22c55e,
    'warning': #f59e0b,
    'danger': #ef4444,
);

@each $name, $color in $colors {
    .text-#{$name} { color: $color; }
    .bg-#{$name} { background-color: $color; }
    .border-#{$name} { border-color: $color; }
}

// ---- 模块化 (@use 替代 @import) ----
// _variables.scss (下划线开头表示局部文件)
// _mixins.scss
// _reset.scss

// main.scss
// @use 'variables' as vars;
// @use 'mixins' as *;
// @use 'reset';
```

### 11.6 选型建议

| 场景 | 推荐方案 | 理由 |
|------|----------|------|
| 个人博客/静态页 | 原生 CSS + 少量变量 | 简单直接，无构建依赖 |
| 中小型企业站 | Tailwind CSS | 开发速度快，产出一致性好 |
| 大型组件库/Design System | CSS Modules + Sass | 样式隔离、可维护性强 |
| 需要 SSR 的应用 | CSS Modules 或 Tailwind | 无运行时开销 |
| 高度动态主题切换 | CSS-in-JS (styled-components) | 运行时动态生成样式 |
| 传统大型项目重构 | Sass/SCSS | 平滑迁移，团队熟悉度高 |

> **2026 年趋势**: CSS 原生能力持续增强（Container Queries、Cascade Layers、`:has()` 等），许多以前需要预处理器的场景现在可以用纯 CSS 实现。

---

## 第12章 BFC 与层叠上下文

### 12.1 BFC 深入理解

```
BFC 完整触发条件与应用场景
═══════════════════════════════════════

  触发 BFC 的方式:

  ┌──────────────────────────────────────────────────┐
  │  1. float: left / right                          │
  │  2. overflow: hidden / auto / scroll             │
  │  3. display: inline-block                        │
  │  4. display: table-cell / table-row / ...        │
  │  5. display: flow-root  ← ★ 专门为此设计的属性    │
  │  6. display: flex / grid                         │
  │  7. position: absolute / fixed                   │
  │  8. column-span: all                             │
  │  9. contain: layout / content / paint / strict   │
  └──────────────────────────────────────────────────┘
  BFC 的核心特性:

  ┌──────────────────────────────────────────────────┐
  │  特性1: 内部盒子的布局不受外部影响                  │
  │  特性2: 外部浮动元素不会侵入 BFC 内部              │
  │  特性3: BFC 内部的浮动元素会被包含（高度塌陷解决）  │
  │  特性4: 属于同一个 BFC 的相邻块级元素的             │
  │         margin 会发生合并（不同 BFC 之间不合并）     │
  │  特性5: BFC 是一个独立的渲染区域                   │
  └──────────────────────────────────────────────────┘
  BFC 解决的问题:

  ┌─────────────┬────────────────────────────────────┐
  │  问题        │  解决方案                            │
  ├─────────────┼────────────────────────────────────┤
  │  浮动高度塌陷  │  父元素创建 BFC (overflow:hidden)  │
  │              │  或 display:flow-root              │
  ├─────────────┼────────────────────────────────────┤
  │  margin 合并  │  父元素或子元素创建 BFC              │
  ├─────────────┼────────────────────────────────────┤
  │  两栏自适应   │  右侧栏创建 BFC (不与左侧浮动重叠)   │
  ├─────────────┼────────────────────────────────────┤
  │  文字环绕     │  内容区创建 BFC (阻止文字环绕)       │
  └─────────────┴────────────────────────────────────┘

═══════════════════════════════════════
```

#### BFC 实战代码

```css
/* ===== 问题1: 浮动导致的高度塌陷 ===== */
/* 当子元素全部浮动时，父元素高度变为 0 */

.parent-collapsed {
    background: #f0f0f0;
    /* 高度为 0! 因为浮动子元素脱离文档流 */
}

.child-float {
    float: left;
    width: 200px;
    height: 200px;
}

/* 解决方案 A: overflow:hidden（老方法，副作用: 可能裁剪内容）*/
.parent-fix-a {
    overflow: hidden; /* 触发 BFC，包含浮动子元素 */
}

/* 解决方案 B: display:flow-root（推荐，无副作用）*/
.parent-fix-b {
    display: flow-root; /* 专门用来创建 BFC 的属性 */
}

/* 解决方案 C: 伪元素清除法（经典方法）*/
.parent-fix-c::after {
    content: '';
    display: table;
    clear: both;
}
/* ===== 问题2: Margin 合并 ===== */
/* 相邻块级元素的垂直 margin 会取较大值而非相加 */

.box-top {
    margin-bottom: 20px;
    background: blue;
}
.box-bottom {
    margin-top: 30px;
    background: red;
}
/* 实际间距 = max(20px, 30px) = 30px, 不是 50px! */

/* 解决方案: 给任一元素创建 BFC */
.margin-fixed {
    display: flow-root; /* 阻止 margin 合并 */
}
/* ===== 问题3: 两栏自适应布局 ===== */
.layout-bfc {
    display: flow-root;
}

.sidebar-bfc {
    float: left;
    width: 250px;
    background: #e8f4fd;
}

.main-bfc {
    /* 创建 BFC 后，自动避开左侧浮动区域 */
    display: flow-root;
    /* 或者: overflow: hidden; */
    min-height: 400px;
    background: #fff;
}
```

### 12.2 层叠上下文（Stacking Context）

**层叠上下文**是 HTML 元素的三维概念，决定了元素在 z 轴方向上的层叠顺序。

```
层叠上下文的层级关系（z-index 仅在同一上下文中比较）
═══════════════════════════════════════

  浏览器视口（根层叠上下文）
  ┌─────────────────────────────────────────────────┐
  │                                                 │
  │  z-index: 负值                                   │
  │  ┌───────────────────────────────────────────┐  │
  │  │  (层叠等级 0-7: 背景和边框)               │  │
  │  │  (层叠等级 1: 负 z-index 的子上下文)       │  │
  │  │                                           │  │
  │  │  z-index: auto / 未定位                     │  │
  │  │  (层叠等级 2-6: 块级/浮动/inline/...)      │  │
  │  │                                           │  │
  │  │  z-index: 0 或 auto 的定位元素              │  │
  │  │  (层叠等级 7: z-index:0/auto 的定位元素)    │  │
  │  │                                           │  │
  │  │  ═══ z-index: 正值 ═══                      │  │
  │  │  (层叠等级 8+: 正 z-index 的定位元素)       │  │
  │  │                                           │  │
  │  │  ┌─ 子层叠上下文 A (z-index: 10) ──────┐  │  │
  │  │  │  内部的 z-index 只在 A 内部比较!      │  │  │
  │  │  │  A 内 z-index:999 < 根 z-index:10    │  │  │
  │  │  └───────────────────────────────────────┘  │  │
  │  │                                           │  │
  │  │  ═══ z-index: 更大的正值 ═══               │  │
  │  │  (层叠等级更高)                            │  │
  │  │                                           │  │
  │  └───────────────────────────────────────────┘  │
  │                                                 │
  └─────────────────────────────────────────────────┘

═══════════════════════════════════════
```

#### 创建层叠上下文的方式

| 方式 | 条件 | 备注 |
|------|------|------|
| **`position` + `z-index`** | 非 static 且 z-index 不是 auto | 最常见的方式 |
| **`opacity`** | 值小于 1 | 如 `opacity: 0.9` |
| **`transform`** | 非 none | 如 `transform: scale(1)` |
| **`filter`** | 非 none | 如 `filter: blur(0)` |
| **`will-change`** | 指定可创建上下文的属性 | |
| **`isolation`** | `isolate` | 专门用于创建层叠上下文 |
| **`mix-blend-mode`** | 非 normal | |
| **`backdrop-filter`** | 非 none | |
| **`clip-path`** | 非 none | |
| **`mask`** | 非 none | |
| **`contain`** | `paint` | |
| Flex/Grid 子项 | `z-index` 不是 auto | 即使父元素没有 z-index |

```css
/* ===== 层叠上下文实战 ===== */

/* 场景1: z-index "失效"问题 */
/* 子元素的 z-index 再高也无法突破父元素的层叠上下文 */
.parent-context {
    position: relative;
    z-index: 1; /* 创建了层叠上下文 */
    background: white;
}

.child-high-z {
    position: relative;
    z-index: 9999; /* 在父上下文内部很高 */
    /* 但无法超过父元素的同级兄弟元素（如果兄弟 z-index > 1）*/
}

/* 解决方案: 将需要高层级的元素提升到正确的层级位置 */
/* 场景2: 使用 isolation 显式创建层叠上下文 */
.isolated-component {
    isolation: isolate; /* 专门用于创建层叠上下文 */
    /* 优点: 语义清晰，不影响视觉表现 */
}
/* 场景3: 常见的"意外"创建层叠上下文的情况 */
.unintended-context {
    /* 这些属性都会意外创建新的层叠上下文! */
    opacity: 0.99;          /* 小于 1 即可 */
    transform: translateZ(0); /* 即使是不做任何变换 */
    filter: blur(0px);      /* 即使是无效果的滤镜 */
    will-change: transform;  /* 性能优化但副作用是创建上下文 */
}

/* 层叠顺序规则（从底到顶）：
   1. 背景色和边框
   2. 负 z-index 的子层叠上下文
   3. 块级盒子（正常流中的非定位元素）
   4. 浮动盒子
   5. 行内/内联盒子（正常流中的）
   6. z-index: 0 / auto 的定位元素
   7. 正 z-index 的定位元素
*/
```

---

## 第13章 浏览器渲染原理

### 13.1 渲染流水线全景

```
浏览器渲染流水线完整流程
═══════════════════════════════════════════════════

  用户输入 URL 或点击链接
          │
          ▼
  ┌──────────────────┐
  │  1. 网络请求      │  DNS解析 → TCP连接 → HTTP请求 → 接收响应
  │     (Network)    │  HTML/CSS/JS/图片等资源下载
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │  2. HTML 解析     │  字节 → 字符 → Token → Node → DOM Tree
  │     (Parsing)    │
  │                 │  ┌──────────────────────────────┐
  │                 │  │  <html>                     │
  │                 │  │   ├── <head> → meta, title.. │
  │                 │  │   └── <body> → div, p, img.. │
  │                 │  └──────────────────────────────┘
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │  3. CSS 解析      │  CSS 字节 → CSSOM (CSS Object Model)
  │     (Style)      │
  │                 │  ┌──────────────────────────────┐
  │                 │  │  body { font: 16px sans; }  │
  │                 │  │  .card { bg: white; ... }    │
  │                 │  └──────────────────────────────┘
  └────────┬─────────┘
           │
           ▼
  ┌────────────────────────┐
  │  4. JavaScript 执行     │  解析到 <script> 时暂停 HTML 解析
  │     (Script Execution) │  执行 JS（可能修改 DOM/CSSOM）
  └────────┬───────────────┘
           │
           ▼
  ┌──────────────────────────┐
  │  5. 样式计算（Render树）  │  DOM + CSSOM → Render Tree
  │     (Style Calculation) │  匹配选择器 → 计算最终样式
  │                         │  （不可见元素不加入 Render Tree）
  └────────┬─────────────────┘
           │
           ▼
  ┌──────────────────────────┐
  │  6. 布局（Layout/Reflow）│  计算几何信息（位置+大小）
  │     (Layout)            │  → 盒模型 → BFC → Flex → Grid...
  │                         │  第一次布局称为 "Layout"
  │                         │  后续重新计算称为 "Reflow"
  └────────┬─────────────────┘
           │
           ▼
  ┌──────────────────────────┐
  │  7. 绘制（Paint）        │  将渲染树转为像素
  │     (Paint)             │  → 文字/颜色/边框/阴影/图像...
  │                         │  → 分层(Layer) → 生成绘制指令
  │                         │  后续重新绘制称为 "Repaint"
  └────────┬─────────────────┘
           │
           ▼
  ┌──────────────────────────┐
  │  8. 合成（Composite）    │  将各图层合成最终画面
  │     (Compositing)       │  GPU 加速合成 → 显示在屏幕上
  └──────────────────────────┘

═══════════════════════════════════════════════════
```

#### 🔬 手写模拟：从输入 URL 到页面渲染的完整流程（伪代码）

> 以下伪代码模拟浏览器从用户在地址栏输入 URL 到最终像素显示在屏幕上的完整过程。每个阶段对应浏览器内核的一个真实模块。

```javascript
/**
 * ============================================================
 *  浏览器页面加载与渲染 — 完整流程模拟
 *  对应浏览器真实模块: Network → Parser → DOM/CSSOM → RenderTree
 *                      → Layout → Paint → Composite → Display
 * ============================================================
 */

/**
 * ════════════════════════════════════════════════════════
 * 阶段 0: 用户触发导航
 * ════════════════════════════════════════════════════════
 */
async function navigateToUrl(browser, url) {

    // 更新地址栏 UI
    browser.addressBar.value = url;
    browser.showLoadingIndicator();        // 显示加载中的旋转图标
    browser.stopButton.enable();           // 启用"停止"按钮

    // ★ 关键: 检查 Service Worker 缓存（PWA 离线能力）
    const cachedResponse = await checkServiceWorkerCache(url);
    if (cachedResponse) {
        // 命中 SW 缓存 → 跳过网络请求，直接使用缓存资源
        console.log('[SW Cache] 命中缓存，跳过网络请求');
        return renderPageFromResponse(cachedResponse);
    }

    // 未命中缓存 → 发起网络请求
    return fullNetworkPipeline(url);
}
/**
 * ════════════════════════════════════════════════════════
 * 阶段 1: 网络请求阶段（Network）
 * DNS → TCP → TLS → HTTP Request → Response
 * ════════════════════════════════════════════════════════
 */
async function fullNetworkPipeline(url) {
    console.log(`[Network] 开始请求: ${url}`);

    // Step 1.1: DNS 解析（域名 → IP 地址）
    // 浏览器先查本地缓存 → 操作系统缓存 → Hosts文件 → DNS服务器
    const ipAddress = await resolveDNS(url.hostname);
    // 例: www.example.com → 93.184.216.34

    // Step 1.2: TCP 三次握手（建立可靠连接）
    // SYN → SYN-ACK → ACK （约 1-3 个 RTT，取决于网络延迟）
    const tcpConnection = await establishTCPConnection(ipAddress, url.port || 443);

    // Step 1.3: TLS 握手（HTTPS 加密连接，仅 HTTPS 需要）
    // ClientHello → ServerHello + 证书 → 密钥交换 → 加密通道建立
    let encryptedConnection = tcpConnection;
    if (url.protocol === 'https:') {
        encryptedConnection = await performTLSHandshake(tcpConnection);
    }

    // Step 1.4: 发送 HTTP 请求
    const httpRequest = buildHTTPRequest({
        method: 'GET',
        path: url.pathname || '/',
        headers: {
            'User-Agent': navigator.userAgent,
            'Accept': 'text/html,application/xhtml+xml',  // 接受 HTML 格式
            'Accept-Language': 'zh-CN,zh;q=0.9',          // 语言偏好
            'Accept-Encoding': 'gzip, deflate, br',         // 支持压缩传输
            'Connection': 'keep-alive',                     // 复用 TCP 连接
            // 如果是重复访问，带上缓存验证头:
            // 'If-None-Match': '"abc123"',                   // ETag
            // 'If-Modified-Since': 'Wed, 21 Oct 2025 ...'   // Last-Modified
        },
        // Cookie 会自动附加（同源策略控制）
    });

    // 发送请求字节流
    await encryptedConnection.send(httpRequest);

    // Step 1.5: 接收响应
    const response = await encryptedConnection.receiveResponse();

    // 处理响应状态码
    switch (response.statusCode) {
        case 200:
            console.log('[Network] OK — 收到 HTML 文档');
            break;  // 正常，继续处理
        case 301:
        case 302:
            // 重定向 → 自动跟随 Location 头部的新 URL
            console.log(`[Network] 重定向到: ${response.headers['Location']}`);
            return navigateToUrl(browser, response.headers['Location']);
        case 304:
            // Not Modified — 使用本地缓存
            console.log('[Network] 304 — 使用本地缓存');
            return loadFromDiskCache(url);
        default:
            throw new Error(`HTTP ${response.statusCode}: ${response.statusText}`);
    }

    // 进入下一阶段: 解析 HTML
    return parseAndRenderHTML(response.body, response.encoding);
}
/**
 * ════════════════════════════════════════════════════════
 * 阶段 2: HTML 解析 + 构建 DOM 树（Parsing / DOM Construction）
 *
 * 核心概念: "预解析器"（Preload Scanner）
 * 浏览器在解析 HTML 的同时，会扫描文档中引用的外部资源
 * （CSS、JS、图片等），提前发起请求以减少总耗时。
 * ════════════════════════════════════════════════════════
 */
function parseAndRenderHTML(htmlBytes, encoding) {
    console.log('[Parser] 开始构建 DOM 树...');

    // 将字节数组解码为字符串
    const htmlString = decodeBytes(htmlBytes, encoding);  // 通常为 UTF-8

    // 创建 Document 根节点
    const document = new DocumentNode('document');

    // ── 词法分析（Tokenization）─────────────────────
    // 将 HTML 字符串转换为 Token 流
    // 使用状态机逐字符扫描（类似有限自动机）
    const tokens = tokenizeHTML(htmlString);

    // ── 语法分析（Tree Construction）──────────────────
    // 根据 Token 构建树形结构（DOM Tree）
    // 同时维护一个"开放元素栈"来处理嵌套关系
    const openElementStack = [];  // 当前未闭合的标签栈

    for (const token of tokens) {
        switch (token.type) {
            case 'StartTag':
                // 创建 DOM 元素节点
                const element = new ElementNode(token.tagName, token.attributes);

                // 处理特殊标签的立即行为
                handleSpecialTags(element, token, openElementStack, document);

                // 将新元素添加为当前栈顶元素的子节点
                if (openElementStack.length > 0) {
                    const parent = openElementStack[openElementStack.length - 1];
                    parent.appendChild(element);
                } else {
                    document.documentElement = element;  // <html> 根元素
                }

                // 自闭合标签不入栈（如 <img>, <br>, <input>）
                if (!token.selfClosing) {
                    openElementStack.push(element);
                }
                break;

            case 'EndTag':
                // 弹出栈直到找到匹配的开始标签
                while (openElementStack.length > 0) {
                    const popped = openElementStack.pop();
                    if (popped.tagName === token.tagName.toLowerCase()) {
                        break;  // 找到匹配，停止弹出
                    }
                    // 不匹配的情况由浏览器的容错机制处理
                }
                break;

            case 'Character':
                // 文本内容 → 创建文本节点
                if (openElementStack.length > 0) {
                    const textNode = new TextNode(token.data);
                    openElementStack[openElementStack.length - 1].appendChild(textNode);
                }
                break;

            case 'Comment':
                // 注释节点（不参与渲染但保留在 DOM 中）
                const commentNode = new CommentNode(token.data);
                if (openElementStack.length > 0) {
                    openElementStack[openElementStack.length - 1].appendChild(commentNode);
                }
                break;
        }
    }

    console.log(`[Parser] DOM 树构建完成，共 ${countNodes(document)} 个节点`);

    // DOM 树构建完成 → 继续后续阶段
    return { document, htmlString };
}

/**
 * 处理需要特殊行为的 HTML 标签
 * 这些标签会在解析过程中触发额外的操作
 */
function handleSpecialTags(element, token, stack, document) {
    switch (element.tagName) {
        case 'link':
            // ★ CSS 外链: 触发异步下载（不阻塞 HTML 解析）
            if (element.getAttribute('rel') === 'stylesheet') {
                preloadScanner.scheduleDownload(
                    element.getAttribute('href'),
                    'stylesheet'
                );
            }
            break;

        case 'style':
            // ★ 内联样式: 直接提取 CSS 文本，稍后解析
            element.pendingCSSContent = true;  // 标记有待处理的 CSS
            break;

        case 'script':
            // ★ JavaScript: 关键! 默认会阻塞 HTML 解析!
            if (!element.hasAttribute('async') &&
                !element.hasAttribute('defer')) {
                // 同步脚本: 暂停 HTML 解析 → 下载 JS → 执行 JS → 恢复解析
                pauseParsing();   // ⚠️ 这里就是"渲染阻塞"的关键点！
                downloadAndExecuteScript(element.getAttribute('src'));
                resumeParsing();
            } else if (element.hasAttribute('defer')) {
                // defer: 异步下载，但在 DOMContentLoaded 前按顺序执行
                deferScriptQueue.push(element.getAttribute('src'));
            } else if (element.hasAttribute('async')) {
                // async: 完全异步下载和执行（不保证顺序）
                asyncDownloadAndExecute(element.getAttribute('src'));
            }
            break;

        case 'img':
        case 'video':
        case 'iframe':
            // 多媒体资源: 通过预扫描器提前请求
            preloadScanner.scheduleDownload(
                element.getAttribute('src'),
                'image'  // 或 video/embed 等
            );
            break;
    }
}
/**
 * ════════════════════════════════════════════════════════
 * 阶段 3: CSS 解析 + 构建 CSSOM（CSS Object Model）
 *
 * 与 DOM 并行构建（CSS 下载不阻塞 DOM 构建，
 * 但会阻塞 Render Tree 构建 和 首次渲染）
 * ════════════════════════════════════════════════════════
 */
function buildCSSOM(document, htmlString) {
    console.log('[Style] 开始构建 CSSOM...');

    const cssomRoot = new CSSOMNode('root');  // CSSOM 根节点

    // 1. 收集所有 CSS 来源
    const cssSources = [];

    // 来源 A: 内联样式 (<style> 标签)
    const styleTags = document.querySelectorAll('style');
    styleTags.forEach(tag => {
        cssSources.push({ type: 'inline', content: tag.textContent });
    });

    // 来源 B: 外部样式表 (<link rel="stylesheet">)
    // 注意: 此时这些 CSS 应该已经下载完成了（通过预扫描器）
    const linkTags = document.querySelectorAll('link[rel="stylesheet"]');
    linkTags.forEach(tag => {
        cssSources.push({ type: 'external', href: tag.href });
    });

    // 来源 C: 行内样式 (style 属性) —— 在样式计算时才处理
    // 来源 D: 用户代理样式表（浏览器默认样式）
    cssSources.push({ type: 'user-agent', content: userAgentDefaultStyles });

    // 2. 解析每份 CSS 为规则集合
    for (const source of cssSources) {
        const cssText = source.type !== 'external'
            ? source.content
            : getFromResourceCache(source.href);  // 从已下载的资源缓存取

        // CSS 解析过程（比 HTML 简单，因为 CSS 是上下文无关文法）
        const rules = parseCSS(cssText);  // → 返回 [{ selectors, declarations }]

        // 将规则插入 CSSOM 树
        for (const rule of rules) {
            cssomRoot.addRule(rule);
        }
    }

    console.log(`[Style] CSSOM 构建完成`);
    return cssomRoot;
}
/**
 * ════════════════════════════════════════════════════════
 * 阶段 4: 样式计算（Style Calculation / Render Tree）
 *
 * 将 DOM + CSSOM 合并 → 计算每个元素的"计算样式"（Computed Style）
 * 过滤掉不可见元素（<head>, <script>, display:none 等）
 * ════════════════════════════════════════════════════════
 */
function buildRenderTree(document, cssomRoot) {
    console.log('[StyleCalc] 开始匹配选择器并计算样式...');

    const renderTree = [];  // 渲染树（只包含可见元素）

    // 遍历 DOM 树中的每个元素
    traverseDOM(document.documentElement, (element) => {

        // ── 第一步：过滤不可见元素 ──
        // 以下元素不会出现在渲染树中:
        if (element.tagName === 'SCRIPT' ||
            element.tagName === 'STYLE' ||
            element.tagName === 'LINK' ||
            element.tagName === 'META' ||
            computedStyle.display === 'none') {
            return;  // 跳过，不加入渲染树
        }

        // ── 第二步：样式匹配（核心!）──
        // 对每个元素，找出所有匹配的 CSS 规则
        const matchedRules = [];

        // 遍历所有 CSS 规则进行匹配
        for (const rule of cssomRoot.getAllRules()) {
            for (const selector of rule.selectors) {
                if (selectorMatches(element, selector)) {
                    matchedRules.push(rule);
                    break;  // 一个规则的任意一个选择器匹配即可
                }
            }
        }

        // ── 第三步：层叠与优先级计算（Cascade & Specificity）──
        // 按优先级排序: !important > inline-style > ID > class > tag > *
        // 同优先级时: 后定义的覆盖先定义的（来源顺序）
        const cascadedStyle = applyCascade(matchedRules, element);

        // ── 第四步：继承（Inheritance）──
        // 某些属性从父元素继承（如 font-size, color, line-height 等）
        const inheritedProps = applyInheritance(cascadedStyle, element.parentElement);

        // ── 第五步：使用默认值 ──
        // 未设置且不继承的属性使用初始值（initial value）
        const computedStyle = applyDefaults(inheritedProps);

        // ── 第六步：相对值转换 ──
        // 将 em/rem/%/vw/vh 等相对单位转为绝对 px 值
        const resolvedStyle = resolveRelativeUnits(computedStyle, element);

        // 创建渲染树节点
        const renderNode = new RenderTreeNode({
            element,
            domNode: element,
            computedStyle: resolvedStyle,
            children: [],       // 后续填充子节点
        });

        renderTree.push(renderNode);
        return renderNode;
    });

    console.log(`[StyleCalc] 渲染树构建完成，共 ${renderTree.length} 个可渲染节点`);
    return renderTree;
}

/**
 * 选择器匹配函数
 * 浏览器的选择器引擎是从右向左匹配的！（性能优化关键）
 * 例: .nav a { } → 先找所有 <a>，再检查是否有 .nav 祖先
 */
function selectorMatches(element, selector) {
    // 选择器解析为选择器链: [".nav", "a"]
    const selectorChain = parseSelector(selector);

    // 从右向左匹配
    let currentEl = element;
    for (let i = selectorChain.length - 1; i >= 0; i--) {
        const part = selectorChain[i];

        if (!matchSingleSelector(currentEl, part)) {
            return false;  // 当前层级不匹配 → 整个选择器失败
        }

        // 向上查找祖先元素
        if (i > 0) {
            currentEl = currentEl.parentElement;
            if (!currentEl) return false;  // 已经到达根节点还没匹配完
        }
    }
    return true;
}
/**
 * ════════════════════════════════════════════════════════
 * 阶段 5: 布局（Layout / Reflow）
 *
 * 计算每个渲染节点的几何信息: 位置(x,y) + 尺寸(width,height)
 * 这是整个渲染流水线中最耗时的阶段之一
 * 第一次布局称为 Layout，后续更新称为 Reflow
 * ════════════════════════════════════════════════════════
 */
function performLayout(renderTree, viewportWidth, viewportHeight) {
    console.log('[Layout] 开始计算布局（Reflow）...');
    const startTime = performance.now();

    // 布局是递归的: 先布局父容器，再布局子元素
    // 因为子元素的尺寸可能依赖父容器（如 % 宽度）

    layoutNode(renderTree[0], {
        x: 0,
        y: 0,
        width: viewportWidth,   // 初始可用宽度 = 视口宽度
        height: viewportHeight,  // 初始可用高度 = 视口高度
    });

    const elapsed = performance.now() - startTime;
    console.log(`[Layout] 布局完成，耗时 ${elapsed.toFixed(2)}ms`);

    return renderTree;
}

/**
 * 递归布局单个节点及其子节点
 * 这就是盒模型、BFC、Flex、Grid 算法的实际执行位置!
 */
function layoutNode(node, containingBlock) {
    const style = node.computedStyle;

    // ── A. 确定元素的 display 类型 ──
    const displayType = style.display;  // block | inline | flex | grid | none ...

    // ── B. 根据盒模型计算尺寸 ──
    // 调用前面 P0-1 中介绍的盒模型计算逻辑
    const boxModel = calculateBoxModel(style, containingBlock.width);

    // 设置节点自身的位置和尺寸
    node.layoutBox = {
        x: containingBlock.x + boxModel.margin.left,
        y: containingBlock.y + boxModel.margin.top,
        width: boxModel.totalWidth,     // 含 padding + border（border-box 下）
        height: /* 类似地计算高度 */,
        contentWidth: boxModel.contentWidth,
        contentHeight: /* ... */,
    };

    // ── C. 处理不同的布局模式 ──
    if (displayType === 'flex') {
        // Flex 布局: 调用前面 P0-3 中介绍的 Flex 算法
        performFlexLayout(node, node.children);
    } else if (displayType === 'grid') {
        // Grid 布局: 调用 Grid 布局算法
        performGridLayout(node, node.children);
    } else if (displayType === 'block') {
        // 块级布局: BFC 计算（垂直排列，处理 margin 合并等）
        performBlockLayout(node, node.children);
    } else if (displayType === 'inline') {
        // 行内布局: 行内格式化上下文（IFC）
        performInlineLayout(node, node.children);
    }

    // ── D. 递归布局子节点 ──
    for (const child of node.children) {
        layoutNode(child, {
            x: node.layoutBox.x + style.paddingLeft + style.borderLeftWidth,
            y: /* 交叉轴方向类似 */,
            width: node.layoutBox.contentWidth,
            height: node.layoutBox.contentHeight,
        });
    }
}
/**
 * ════════════════════════════════════════════════════════
 * 阶段 6: 绘制（Paint / Repaint）
 *
 * 将渲染树的每个节点转换为绘制指令（Display List）
 * 包括: 背景、边框、文字、阴影、图像等
 * 输出的是一系列绘图命令，还不是最终的像素
 * ════════════════════════════════════════════════════════
 */
function paint(renderTree) {
    console.log('[Paint] 生成绘制指令...');

    const displayList = [];  // 绘制指令列表

    for (const node of renderTree) {
        const box = node.layoutBox;
        const style = node.computedStyle;

        // 按照绘制顺序生成指令（注意: z-index 影响绘制顺序）

        // 1. 背景色 / 背景图
        if (style.backgroundColor && style.backgroundColor !== 'transparent') {
            displayList.push({
                type: 'drawRect',
                x: box.x, y: box.y,
                width: box.width, height: box.height,
                color: style.backgroundColor,
            });
        }
        if (style.backgroundImage) {
            displayList.push({
                type: 'drawImage',
                image: style.backgroundImage,
                x: box.x, y: box.y,
                size: style.backgroundSize,
                position: style.backgroundPosition,
            });
        }

        // 2. 边框（四条边分别绘制）
        if (style.borderTopWidth > 0) {
            displayList.push({ type: 'drawBorder', side: 'top', ... });
        }
        // ... 其他三边同理

        // 3. 文字内容（最复杂的部分! 涉及字体 shaping、排版等）
        if (node.textNodes && node.textNodes.length > 0) {
            for (const textNode of node.textNodes) {
                // 字体排版的复杂步骤:
                // a. 字符 → 字形（Glyph）映射
                // b. 文本整形（Shaping: 连字、kerning 等）
                // c. 断行（Line Breaking / Wrapping）
                // d. 对齐（Alignment）
                displayList.push({
                    type: 'drawText',
                    text: textNode.content,
                    x: box.x + style.paddingLeft,
                    y: box.y + style.paddingTop,
                    fontFamily: style.fontFamily,
                    fontSize: style.fontSize,
                    color: style.color,
                    fontWeight: style.fontWeight,
                    lineHeight: style.lineHeight,
                    letterSpacing: style.letterSpacing,
                });
            }
        }

        // 4. 阴影
        if (style.boxShadow && style.boxShadow !== 'none') {
            displayList.push({
                type: 'drawShadow',
                shadow: style.boxShadow,
                targetRect: { x: box.x, y: box.y, w: box.width, h: box.height },
            });
        }

        // 5. 裁剪（overflow:hidden 等）
        if (style.overflow === 'hidden' || style.overflow === 'scroll') {
            displayList.push({
                type: 'setClip',
                rect: { x: box.x, y: box.y, w: box.width, h: box.height },
            });
        }
    }

    console.log(`[Paint] 共生成 ${displayList.length} 条绘制指令`);
    return displayList;
}
/**
 * ════════════════════════════════════════════════════════
 * 阶段 7: 分层（Layerization）
 *
 * 将渲染树划分为独立的合成层（Compositing Layers）
 * 原因: 不是所有元素变化都需要重绘其他部分
 * 如: transform/opacity 动画可以在独立图层中由 GPU 单独合成
 * ════════════════════════════════════════════════════════
 */
function createLayers(displayList, renderTree) {
    const layers = [];

    // 主图层（默认层）—— 大多数普通元素在此
    layers.push(new Layer({ name: 'main', zIndex: 0 }));

    // 检查每个渲染节点是否需要提升为独立合成层
    for (const node of renderTree) {
        const style = node.computedStyle;

        // 需要提升为合成层的条件（详见第13.3节 GPU 加速章节）:
        if (needsCompositingLayer(style)) {
            const layer = new Layer({
                name: `layer-${node.element.tagName}`,
                // 该层包含的所有绘制指令
                displayItems: filterDisplayListForNode(displayList, node),
                // 合成属性
                opacity: style.opacity,
                transform: style.transform,
                // 提示 GPU 预合成
                willChange: style.willChange,
            });
            layers.push(layer);
        }
    }

    return layers;
}

/** 判断元素是否需要独立的合成层 */
function needsCompositingLayer(style) {
    return style.transform && style.transform !== 'none'         // 有 transform
        || (style.opacity != null && style.opacity < 1)         // 有透明度
        || style.willChange                                    // 有 will-change 提示
        || style.filter && style.filter !== 'none'              // 有滤镜
        || style.position === 'fixed'                           // 固定定位
        || style.position === 'absolute' && style.zIndex !== 'auto'  // 绝对定位+z-index
        || style.backdropFilter && style.backdropFilter !== 'none';  // 背景滤镜
}
/**
 * ════════════════════════════════════════════════════════
 * 阶段 8: 合成（Compositing）+ 光栅化（Rasterization）
 *
 * 将各图层的绘制指令转换为实际的像素位图
 * 然后 GPU 将各图层合成为最终画面输出到屏幕
 * ════════════════════════════════════════════════════════
 */
function compositeAndDisplay(layers, viewportSize) {
    console.log('[Composite] GPU 合成各图层...');

    // ── 光栅化: 绘制指令 → 像素位图（Texture）──
    // 这一步可能在主线程或 GPU 进程中进行
    // 现代浏览器通常将光栅化交给 GPU 合成线程
    for (const layer of layers) {
        // 将该层的所有绘制指令渲染为一个纹理位图
        layer.texture = rasterize(layer.displayItems, layer.bounds);

        // 上传纹理到 GPU 显存
        uploadToGPU(layer.texture);
    }

    // ── GPU 合成: 将多个图层叠加为最终画面 ──
    // 由合成线程（Compositor Thread）执行，不占用主线程!
    gpu.executeCompositeProgram({
        layers: layers.map(l => ({
            texture: l.texture,
            position: { x: l.bounds.x, y: l.bounds.y },
            opacity: l.opacity,
            transform: l.transform,      // 3D 变换矩阵
            clippingRect: l.clipRect,    // 裁剪区域
        })),
        viewport: viewportSize,
        // 合成策略: 按 z-index 从低到高依次叠加
        blendMode: 'normal',
    });

    // ── 输出到屏幕（VSync 垂直同步）──
    // 等待显示器的下一个刷新周期（通常 16.6ms @60Hz 或 8.3ms @120Hz）
    waitForVSync();

    // 将合成后的帧缓冲区内容提交给显示器
    presentFrame();

    console.log('[Display] ✅ 第一帧画面已显示在屏幕上!');
    console.log(`[Performance] 首次内容绘制(FCP) 完成`);
    // ══════════════════════════════════════════════════
    // 后续: 页面交互期间的增量更新循环
    // ══════════════════════════════════════════════════
    startEventLoop();  // 监听用户事件、动画帧等
}
// ══════════════════════════════════════════════════════════════
//                  主入口: 整合全部阶段
// ══════════════════════════════════════════════════════════════

async function renderPage(url) {
    const t0 = performance.now();

    try {
        // 阶段 0-1: 网络请求
        const response = await navigateToUrl(browser, url);
        logPhase('Network', t0);

        // 阶段 2: DOM 构建（与 CSS 下载并行）
        const { document, htmlString } = parseAndRenderHTML(response.html);
        logPhase('DOM', t0);

        // 阶段 3: CSSOM 构建（CSS 应该已经下载好了）
        const cssomRoot = buildCSSOM(document, htmlString);
        logPhase('CSSOM', t0);

        // 阶段 4: 渲染树构建（样式计算）
        const renderTree = buildRenderTree(document, cssomRoot);
        logPhase('RenderTree', t0);

        // 阶段 5: 布局（Reflow）
        performLayout(renderTree, window.innerWidth, window.innerHeight);
        logPhase('Layout', t0);

        // 阶段 6: 绘制（Paint）
        const displayList = paint(renderTree);
        logPhase('Paint', t0);

        // 阶段 7-8: 分层 + 合成 + 显示
        const layers = createLayers(displayList, renderTree);
        compositeAndDisplay(layers, { width: window.innerWidth, height: window.innerHeight });
        logPhase('Composite+Display', t0);

        const totalTime = performance.now() - t0;
        console.log(`\n🎉 页面完全加载并渲染完毕! 总耗时: ${totalTime.toFixed(1)}ms`);

    } catch (error) {
        console.error('[Render Error]', error);
        showErrorPage(error.message);
    }
}

/** 辅助: 记录每个阶段的耗时 */
function logPhase(phaseName, startTime) {
    const elapsed = performance.now() - startTime;
    console.log(`  ⏱️  ${phaseName.padEnd(18)} +${elapsed.toFixed(1)}ms`);
}
```

```
完整渲染流程 — 时间线视图
═══════════════════════════════════════════════════

  时间 →

  ┌─ Network ─┬─ DOM ─┬─ CSSOM ─┬─ Style ─┬─ Layout ─┬─ Paint ─┬─ Composite ─┐
  │           │       │         │         │          │         │             │
  │  DNS/TCP  │ 解析   │ 解析CSS  │ 匹配选择 │ 盒模型   │ 生成绘  │ GPU合成    │
  │  TLS/HTTP │ HTML   │ 构建     │ 器计算   │ BFC/Flex │ 制指令   │ 显示屏幕   │
  │  下载资源 │ Token→ │ 规则树   │ 层叠     │ 定位尺寸 │ Display │ VSync      │
  │           │ Node→  │         │ 继承     │ 递归     │ List    │             │
  │           │ Tree   │         │ 单位转换 │         │         │             │
  │           │       │         │         │          │         │             │
  │ ← 预扫描器并行下载 CSS/Img ──→│          │         │             │
  │                                   │          │         │             │
  │  ⚠️ JS会暂停DOM解析!              │          │         │             │
  └───────────┴───────┴─────────┴─────────┴──────────┴─────────┴─────────────┘

  关键性能指标（Core Web Vitals 相关）:

  FCP (First Contentful Paint):  首次内容绘制 ≈ Paint 阶段结束
  LCP (Largest Contentful Paint): 最大内容绘制 ≈ 主图片/文字绘制定成
  DCL (DOMContentLoaded):         DOM + CSSOM 都构建完成
  L (Load):                       所有资源（含图片）加载完成

═══════════════════════════════════════════════════
```

### 13.2 重排（Reflow）与重绘（Repaint）

```
重排 vs 重绘 vs 合成
═══════════════════════════════════════

  ┌──────────────────────────────────────────────────┐
  │                                                  │
  │   触发 Reflow (重排/回流)的操作:                  │
  │                                                  │
  │   · 添加/删除 DOM 元素                             │
  │   · 显示/隐藏元素 (display:none)                  │
  │   · 移动元素位置                                  │
  │   · 修改元素尺寸 (width/height/padding/margin)    │
  │   · 修改字体大小/font-family                       │
  │   · 读取 offsetWidth/offsetHeight 等属性           │
  │   · 调用 getComputedStyle()                       │
  │   · 滚动窗口                                      │
  │   · 改变窗口大小                                  │
  │                                                  │
  │   成本: ★★★★★ (最高)                              │
  │   影响: 需要重新计算布局 → 可能触发后续的重绘和合成  │
  │                                                  │
  ├──────────────────────────────────────────────────┤
  │                                                  │
  │   触发 Repaint (重绘)的操作:                       │
  │                                                  │
  │   · 修改颜色 (color/background/border-color)      │
  │   · 修改背景图                                    │
  │   · 修改 visibility (不触发布局变化)               │
  │   · 修改 box-shadow                               │
  │   · 修改 outline                                  │
  │                                                  │
  │   成本: ★★★☆☆                                     │
  │   影响: 不需要重新计算布局，只需重新绘制像素         │
  │                                                  │
  ├──────────────────────────────────────────────────┤
  │                                                  │
  │   仅触发 Composite (合成)的操作: ★ 最佳性能         │
  │                                                  │
  │   · transform: translate() (GPU 加速)             │
  │   · transform: rotate() / scale()                │
  │   · opacity (GPU 加速)                            │
  │   · will-change: transform / opacity              │
  │                                                  │
  │   成本: ★☆☆☆☆ (最低)                              │
  │   影响: 在独立图层中完成，不触发重排/重绘            │
  │                                                  │
  └──────────────────────────────────────────────────┘

═══════════════════════════════════════
```

```javascript
// ===== JavaScript 中触发重排的操作 =====

// 以下操作会强制同步触发 reflow（强制布局/Forced Synchronous Layout）
const element = document.getElementById('box');

// 这些属性的读取会触发 reflow:
element.offsetWidth;       // 元素宽度
element.offsetHeight;      // 元素高度
element.offsetTop;         // 相对于 offsetParent 的顶部距离
element.offsetLeft;        // 相对于 offsetParent 的左侧距离
element.clientTop;         // 边框宽度
element.clientLeft;        // 边框宽度
element.scrollTop;         // 滚动偏移
element.scrollLeft;        // 滚动偏移
getComputedStyle(element); // 计算后的所有样式值

// 典型的"读写交替"性能陷阱（Layout Thrashing）
// ❌ 错误做法: 每次写入后立即读取
for (let i = 0; i < items.length; i++) {
    items[i].style.width = i * 10 + 'px';  // 写入 → 触发 dirty
    console.log(items[i].offsetWidth);      // 读取 → 强制 reflush!
    // 循环 N 次 = N 次 reflow!
}

// ✅ 正确做法: 批量写入，批量读取
// 先收集所有写入操作
const widths = items.map((_, i) => i * 10 + 'px');
// 批量写入
items.forEach((item, i) => item.style.width = widths[i]);
// 批量读取
items.forEach(item => console.log(item.offsetWidth));
// 只有 1 次 reflow!

// 或使用 requestAnimationFrame 将读写分离到不同帧
const readData = [];
requestAnimationFrame(() => {
    // 写入阶段
    items.forEach((item, i) => item.style.width = widths[i]);
});
requestAnimationFrame(() => {
    // 读取阶段（下一帧）
    items.forEach(item => readData.push(item.offsetWidth));
});
```

### 13.3 GPU 加速与合成层

```
GPU 合成层机制
═══════════════════════════════════════

  主线程 (Main Thread)              GPU (Composite Thread)
  ════════════════════              ════════════════════════

  Layout + Paint                     Layer Compositing
  ┌──────────────┐                  ┌──────────────┐
  │  Layer 1     │ ──纹理位图────▶  │  GPU 合成     │
  │  (Header)    │                  │              │
  ├──────────────┤                  │  最终画面     │
  │  Layer 2     │ ──纹理位图────▶  │  输出到屏幕   │
  │  (Content)   │                  │              │
  ├──────────────┤                  │              │
  │  Layer 3     │ ──纹理位图────▶  │              │
  │  (Overlay)   │                  │              │
  └──────────────┘                  └──────────────┘

  创建合成层的条件:
  ┌──────────────────────────────────────┐
  │ · transform: translateZ(0)          │
  │ · transform: translate3d(0,0,0)     │
  │ · will-change: transform            │
  │ · opacity (非默认值)                │
  │ · filter (非none)                   │
  │ · backdrop-filter                  │
  │ · <video>/<canvas>                 │
  │ · position: fixed                  │
  │ · animation/transition of above    │
  │ · z-index > 同层兄弟 (某些条件下)   │
  └──────────────────────────────────────┘

  ⚠️ 注意: 过多的合成层会占用大量内存!
     每个合成层都需要分配独立的显存空间

═══════════════════════════════════════
```

```css
/* ===== GPU 加速最佳实践 ===== */

/* 推荐: 使用 transform 和 opacity 做动画 */
.gpu-animated {
    /* 这两个属性由 GPU 合成线程处理 */
    /* 不经过主线程的 Layout/Paint 流程 */
    transform: translateX(100px);
    opacity: 0.5;
    will-change: transform, opacity;
}

/* 不推荐: 用 left/top 做动画 */
.cpu-animated {
    /* left/top 会触发整个 Layout → Paint → Composite */
    left: 100px;
    top: 50px;
    /* 每一帧都要重新计算布局，性能差很多 */
}

/* 合成层优化技巧 */
.optimized-card {
    /* 方法1: 提升为合成层 */
    transform: translateZ(0); /* 零位移也能提升为合成层 */

    /* 方法2: will-change 提示 */
    will-change: transform; /* 浏览器提前优化 */
}

/* 但不要过度使用! */
/* .everything { transform: translateZ(0); } */ 
/* ❌ 所有元素都变成合成层 → 内存爆炸 */
```

#### 🎯 本章面试高频追问

> **Q1: 从输入 URL 到页面展示，哪些步骤会阻塞渲染？如何优化首屏加载速度？**

**答案方向：**
- **阻塞渲染的关键路径**: HTML 解析 → DOM 构建 → CSSOM 构建 → Render Tree → Layout → Paint
- **CSS 加载会阻塞渲染**（浏览器需要完整的 CSSOM 才能绘制任何内容），但不会阻塞 DOM 解析
- **JS（同步脚本）会阻塞 DOM 解析和渲染**（因为 JS 可能操作 DOM/CSSOM）
- **优化策略**: 
  1. CSS 放 `<head>` 中尽早加载；JS 用 `defer`/`async`
  2. 关键 CSS 内联（Critical CSS）；非关键 JS 延迟加载
  3. 使用 `<link rel="preload">` 预加载关键资源
  4. 启用 gzip/Brotli 压缩传输；利用 HTTP/2 多路复用

---

> **Q2: 什么是"强制同步布局"（Forced Synchronous Layout / Layout Thrashing）？如何避免？**

**答案方向：**
- 当 JavaScript 在同一帧内**交替读写** DOM 布局属性时触发：每次写入使布局变"脏"，读取时浏览器被迫立即执行 reflush 来返回准确值
- 典型模式：循环中 `element.style.width = ...` 后紧跟 `element.offsetWidth` — N 次循环 = N 次 reflow!
- **避免方法**：
  1. 批量写入后再批量读取（先收集所有样式修改，一次性应用，再读取）
  2. 用 `requestAnimationFrame` 将读写分离到不同帧
  3. 缓存已读取的布局值，避免重复读取

---

> **Q3: `transform` 和 `opacity` 动画为什么比 `left/top` 性能好？GPU 加速的本质是什么？**

**答案方向：**
- `transform` 和 `opacity` 由**合成线程（Compositor Thread）直接处理**，不经过主线程的 Layout → Paint 流程
- 浏览器会将这些属性的动画元素提升为独立的**合成层（Compositing Layer）**，每层生成纹理交由 GPU 合成
- 而 `left/top` 属于几何属性，修改会触发整个 Layout → Paint → Composite 流程（重排+重绘），成本高约 10-100 倍
- 注意：过度使用合成层会导致**内存膨胀**（每个层都需要 GPU 显存存储纹理位图），应配合 `will-change` 精准控制

---
---

## 第14章 性能优化与最佳实践

### 14.1 选择器优化

```css
/* ===== 选择器性能指南 ===== */

/* CSS 选择器是从右向左匹配的! */
/* .nav a { ... } 浏览器先找到所有 a，再向上检查是否有 .nav 祖先 */

/* ✅ 高效的选择器 */
.class-name { }           /* 类选择器 —— 最快 */
#id-name { }             /* ID 选择器 —— 很快 */
.tag-name { }            /* 标签选择器 —— 较快 */
.parent > .child { }     /* 直接子代 —— 高效（限制匹配范围）*/

/* ❌ 低效的选择器（应避免）*/
/* 通配符选择器 */
* { }                     /* 匹配所有元素 */

/* 过深的后代选择器 */
body header nav ul li a span { } /* 5 层嵌套! */

/* 通用/标签限定类选择器 */
div.container { }         /* 不必要的 div 限定 */
ul.menu-list { }          /* 不必要的 ul 限定 */

/* 复杂属性选择器 */
[class*="icon-"] { }     /* 部分匹配需遍历所有类名 */

/* :not() 包含复杂选择器 */
:not(.some-long-class-name-with-other-stuff) { }

/* 性能优化的通用原则:
   1. 选择器越简单越好
   2. 避免超过 3 层的嵌套
   3. 右边的选择器应该尽量具体
   4. 避免通配符和通用选择器
   5. 现代浏览器引擎已经做了大量优化，
      选择器性能差异在大多数情况下可以忽略
      但保持简洁仍有价值（可维护性）
*/
```

### 14.2 减少重排重绘的策略

```css
/* ===== CSS 层面的优化 ===== */

/* 1. 使用 transform 代替 top/left 定位 */
.animate-element {
    /* ❌ 触发 reflow */
    /* top: 100px; left: 200px; */

    /* ✅ 仅触发 composite */
    transform: translate(200px, 100px);
}

/* 2. 使用 opacity 代替 visibility/display 切换显示 */
.fade-element {
    /* ❌ display:none 触发 reflow */
    /* display: none; */

    /* ✅ opacity 只触发 composite（如果已提升为合成层）*/
    opacity: 0;
    pointer-events: none; /* 禁止鼠标事件穿透 */
    transition: opacity 0.3s ease;
}

/* 3. 批量修改 DOM 样式（通过 class 切换）*/
/* ❌ 逐个修改属性 */
/*
element.style.width = '100px';
element.style.height = '200px';
element.style.background = 'red'; // 每次都可能触发 reflow
*/

/* ✅ 通过切换 class 一次性应用 */
.element-updated {
    width: 100px;
    height: 200px;
    background: red;
}
/* JS 中只需: element.classList.add('element-updated'); */

/* 4. 对频繁变化的元素使用 will-change */
.frequently-animated {
    will-change: transform;
    /* 让浏览器提前为该元素做好准备 */
}

/* 5. 使用 contain 属性限制浏览器布局范围 */
.contained-widget {
    /* 告诉浏览器这个元素的布局变化不会影响外部 */
    contain: layout style paint;
    /* layout: 内部布局不影响外部 */
    /* style: 样式计数器等不影响外部 */
    /* paint: 不会绘制到边界外 */
    /* strict: 最大程度的隔离 */
}
```

### 14.3 字体加载策略

```html
<!-- ===== 字体优化策略 ===== -->

<!-- 方式1: font-display 控制 FOIT/FOUT -->
<style>
    @font-face {
        font-family: 'CustomFont';
        src: url('/fonts/custom.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;

        /* font-display 策略:
           auto: 浏览器默认行为
           block: 短时间隐藏文本（最多3秒），然后降级
           swap: 立即显示后备字体，自定义字体加载后替换 ★ 推荐
           optional: 如果自定义字体很快加载就使用，否则一直用后备字体
           fallback: 约100ms的隐藏期，然后显示后备字体
        */
        font-display: swap;
    }
</style>

<!-- 方式2: 预加载关键字体 -->
<link rel="preload" href="/fonts/custom.woff2" as="font" type="font/woff2" crossorigin>

<!-- 方式3: 使用 system-ui 字体栈（无需网络请求）-->
<body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;">
    <!-- 系统原生字体，零加载延迟 -->
</body>

<!-- 方式4: 字体子集化（仅包含需要的字符）-->
<!-- 使用工具如 glyphhanger 或 font-spider 生成精简字体文件 -->
```

### 14.4 关键 CSS 内联（Critical CSS）

```
Critical CSS 内联策略
═══════════════════════════════════════

  页面加载过程:

  ┌─────────────────────────────────────────────┐
  │                                             │
  │  1. HTML 开始解析                           │
  │     ↓                                       │
  │  2. 遇到 <link rel="stylesheet">             │
  │     ↓                                       │
  │  3. ⚠️ 渲染阻塞! 等待 CSS 下载完成           │
  │     ↓                                       │
  │  4. CSS 下载完毕 → 解析 → 构建 CSSOM        │
  │     ↓                                       │
  │  5. 继续解析 HTML → 构建 Render Tree         │
  │     ↓                                       │
  │  6. Layout → Paint → 首屏渲染               │
  │                                             │
  │  问题: 步骤 3~4 导致用户看到空白屏幕          │
  │                                             │
  └─────────────────────────────────────────────┘

  Critical CSS 解决方案:

  ┌─────────────────────────────────────────────┐
  │                                             │
  │  1. 提取首屏可见区域所需的 CSS（< 15KB）      │
  │     ↓                                       │
  │  2. 将其内联到 <style> 标签中（放在 <head>）  │
  │     ↓                                       │
  │  3. 其余 CSS 异步加载（不阻塞渲染）           │
  │     ↓                                       │
  │  结果: 用户更快看到有样式的页面内容!           │
  │                                             │
  └─────────────────────────────────────────────┘

═══════════════════════════════════════
```

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <!-- Critical CSS: 内联首屏关键样式（通常 < 14KB）-->
    <style>
        /* 只包含首屏可见元素所需的样式 */
        body { margin: 0; font-family: system-ui, sans-serif; }
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }
        .hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); margin-bottom: 1rem; }
        .hero p { font-size: clamp(1rem, 2vw, 1.25rem); opacity: 0.9; }
        .nav {
            display: flex;
            justify-content: space-between;
            padding: 1rem 2rem;
            position: sticky;
            top: 0;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px);
        }
        /* ... 其他首屏必要样式 ... */
    </style>

    <!-- 其余 CSS 异步加载（多种方式）-->

    <!-- 方式1: preload + onload（推荐）-->
    <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <!-- preload 提示浏览器优先下载，下载完成后改为 stylesheet -->

    <!-- 方式2: JS 动态插入（兼容性好）-->
    <script>
        // 页面加载完成后异步加载其余 CSS
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href='styles.css';
        document.head.appendChild(link);
    </script>

    <!-- noscript 降级: 如果 JS 禁用则同步加载 -->
    <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```

### 14.5 CSS 容器查询（Container Queries）

```css
/* ===== Container Queries: 基于容器尺寸而非视口的响应式 ===== */

/* 传统媒体查询: 基于视口（viewport）大小 */
@media (min-width: 768px) {
    .card { /* 当视口 ≥ 768px 时生效 */ }
}

/* 容器查询: 基于父容器的实际大小 ★ 新一代响应式方案 */
.card-container {
    /* 声明为查询容器 */
    container-type: inline-size; /* 基于行内方向的尺寸查询 */
    /* container-type: size; */   /* 基于两个方向的尺寸查询 */
    /* container-name: card-wrap; */ /* 可选: 给容器命名 */
}

/* 使用 @container 规则 */
@container (min-width: 400px) {
    /* 当 .card-container 的宽度 ≥ 400px 时生效 */
    .card {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 20px;
    }
}

@container (min-width: 600px) {
    /* 当容器更宽时的布局 */
    .card {
        grid-template-columns: 250px 1fr 150px;
    }
}

/* 实际应用: 卡片组件在不同宽度的容器中自适应 */
.card-layout {
    container-type: inline-size;
}

.card-inner {
    display: flex;
    flex-direction: column; /* 默认: 窄容器中纵向排列 */
    gap: 12px;
}

@container (min-width: 350px) {
    .card-inner {
        flex-direction: row; /* 宽容器中横向排列 */
    }
}

/* 容器查询长度单位 */
@container (min-width: 30cqw) {
    /* cqw: 容器宽度的 1% */
    /* cqh: 容器高度的 1% */
    .responsive-text {
        font-size: clamp(1rem, 4cqw, 2rem);
    }
}
```

### 14.6 CSS 性能检查清单

| 优化类别 | 检查项 | 工具/方法 |
|----------|--------|-----------|
| **文件体积** | CSS 总大小是否合理 (< 300KB gzip 后) | Bundle Analyzer |
| | 是否移除了未使用的 CSS | PurgeCSS / Tailwind JIT |
| **加载策略** | 关键 CSS 是否内联 | Lighthouse / PageSpeed Insights |
| | 非关键 CSS 是否异步加载 | Network Panel |
| **选择器** | 选择器深度不超过 3 层 | CSS Linter |
| | 避免通配符和复杂选择器 | Code Review |
| **渲染性能** | 动画使用 transform/opacity | DevTools Performance |
| | 避免 Layout Thrashing | Performance Panel |
| | 合理控制合成层数量 | Layers Panel (Chrome) |
| **字体** | 使用 font-display: swap | DevTools Network |
| | 关键字体预加载 | `<link rel="preload">` |
| | 字体文件格式为 woff2 | Network Panel |
| **兼容性** | 使用 @supports 特性检测 | CanIUse |
| | 提供合理的 fallback | Browser Testing |

---

## 附录A HTML 标签速查表

### A.1 文档结构标签

| 标签 | 说明 | 分类 | HTML5 新增 |
|------|------|------|------------|
| `<!DOCTYPE>` | 文档类型声明 | 声明 | — |
| `<html>` | 根元素 | 结构 | — |
| `<head>` | 文档头部元数据 | 结构 | — |
| `<body>` | 文档主体内容 | 结构 | — |
| `<title>` | 页面标题 | 元数据 | — |
| `<meta>` | 元信息（字符集、视口、SEO 等） | 元数据 | — |
| `<link>` | 外部资源链接（CSS、图标等） | 元数据 | — |
| `<style>` | 内部样式表 | 元数据 | — |
| `<script>` | 脚本（内联或外部引用） | 元数据/嵌入 | — |
| `<base>` | 基准 URL | 元数据 | — |
| `<noscript>` | 脚本禁用时的替代内容 | 元数据 | — |

### A.2 文本内容标签

| 标签 | 说明 | 分类 |
|------|------|------|
| `<h1>` ~ `<h6>` | 一级至六级标题 | 文本/标题 |
| `<p>` | 段落 | 文本 |
| `<span>` | 通用行内容器 | 文本 |
| `<br>` | 换行 | 文本/编辑 |
| `<hr>` | 水平分割线 | 文本 |
| `<pre>` | 预格式化文本（保留空格换行） | 文本 |
| `<blockquote>` | 块级引用 | 文本 |
| `<q>` | 行内引用 | 文本 |
| `<cite>` | 作品标题引用 | 文本 |
| `<abbr>` | 缩写（配合 title 属性） | 文本 |
| `<dfn>` | 定义术语 | 文本 |
| `<code>` | 代码片段 | 文本 |
| `<kbd>` | 键盘输入 | 文本 |
| `<samp>` | 程序输出样本 | 文本 |
| `<var>` | 变量 | 文本 |
| `<strong>` | 重要文本（粗体） | 文本/强调 |
| `<em>` | 强调文本（斜体） | 文本/强调 |
| `<mark>` | 高亮/标记文本 | 文本 |
| `<small>` | 旁注/小字（如版权声明） | 文本 |
| `<del>` | 已删除文本（删除线） | 文本/编辑 |
| `<ins>` | 新增文本（下划线） | 文本/编辑 |
| `<sub>` | 下标 | 文本 |
| `<sup>` | 上标 | 文本 |
| `<time>` | 日期/时间（机器可读） | 文本 |
| `<data>` | 机器可读的数据 | 文本 |
| `<address>` | 联系信息 | 文本 |
| `<bdo>` | 文本方向覆盖 | 文本 |
| `<bdi>` | 双向文本隔离 | 文本 |
| `<ruby>` | 日文注音 | 文本 |
| `<rt>` | 注音文本 | 文本 |
| `<rp>` | 注音括号 | 文本 |

### A.3 语义化结构标签（HTML5）

| 标签 | 说明 | 使用场景 |
|------|------|----------|
| `<header>` | 页眉/区块头部 | 页面顶部、区块头部 |
| `<nav>` | 导航区域 | 主导航、侧边导航、页脚导航 |
| `<main>` | 主要内容 | 页面主体（每页仅一个） |
| `<article>` | 独立完整的内容单元 | 博客文章、新闻条目、论坛帖子 |
| `<section>` | 主题相关的内容分组 | 文章章节、功能分区 |
| `<aside>` | 辅助/补充内容 | 侧边栏、广告、相关链接 |
| `<footer>` | 页脚/区块底部 | 版权信息、联系方式 |
| `<figure>` | 独立的图表/插图/代码 | 图片+说明、代码块+说明 |
| `<figcaption>` | 图表的标题/说明 | figure 的子元素 |
| `<details>` | 可折叠详情区域 | FAQ、帮助文档 |
| `<summary>` | 折叠区域的标题 | details 的第一个子元素 |
| `<dialog>` | 对话框/模态窗 | 弹窗、确认对话框 |
| `<menu>` | 菜单列表 | 工具菜单、上下文菜单 |

### A.4 表单与交互标签

| 标签 | 说明 | 关键属性 |
|------|------|----------|
| `<form>` | 表单容器 | action, method, enctype, novalidate |
| `<input>` | 输入控件 | type, name, value, required, pattern |
| `<textarea>` | 多行文本域 | rows, cols, maxlength, placeholder |
| `<select>` | 下拉选择 | multiple, size, required |
| `<option>` | 选项 | value, selected, disabled |
| `<optgroup>` | 选项分组 | label |
| `<button>` | 按钮 | type(submit/reset/button), disabled |
| `<label>` | 标签 | for, 关联 input |
| `<fieldset>` | 字段集分组 | disabled |
| `<legend>` | 字段集标题 | — |
| `<datalist>` | 预设选项列表 | 关联 input[list] |
| `<output>` | 计算结果输出 | for, name |
| `<progress>` | 进度条 | value, max |
| `<meter>` | 度量衡/指示器 | value, min, max, low, high |

### A.5 多媒体与嵌入标签

| 标签 | 说明 | 关键属性 |
|------|------|----------|
| `<video>` | 视频 | controls, autoplay, muted, loop, poster, playsinline |
| `<audio>` | 音频 | controls, autoplay, loop |
| `<source>` | 媒体源 | src, type, media |
| `<track>` | 字幕轨 | kind, srclang, label, default |
| `<canvas>` | 绑图画布 | width, height |
| `<svg>` | 矢量图形 | viewBox, xmlns |
| `<picture>` | 响应式图片容器 | — |
| `<iframe>` | 嵌入页面 | src, sandbox, loading, allow |
| `<embed>` | 嵌入外部内容 | src, type |
| `<object>` | 嵌入对象 | data, type |
| `<map>` | 图像热点映射 | name |
| `<area>` | 热点区域 | shape, coords, href, alt |

### A.6 表格标签

| 标签 | 说明 |
|------|------|
| `<table>` | 表格 |
| `<caption>` | 表格标题 |
| `<thead>` | 表头区域 |
| `<tbody>` | 表体区域 |
| `<tfoot>` | 表尾区域 |
| `<tr>` | 表格行 |
| `<th>` | 表头单元格（scope, abbr）|
| `<td>` | 表格数据单元格（colspan, rowspan）|
| `<colgroup>` | 列分组 |
| `<col>` | 单列属性定义 |

### A.7 其他常用标签

| 标签 | 说明 | 分类 |
|------|------|------|
| `<a>` | 超链接 | 交互 |
| `<img>` | 图像 | 嵌入/交互 |
| `<div>` | 通用块级容器 | 结构 |
| `<ul>` | 无序列表 | 结构 |
| `<ol>` | 有序列表（start, reversed, type） | 结构 |
| `<li>` | 列表项 | 结构 |
| `<dl>` | 定义描述列表 | 结构 |
| `<dt>` | 定义术语 | 结构 |
| `<dd>` | 定义描述 | 结构 |
| `<template>` | HTML 模板（不渲染） | 元数据 |
| `<slot>` | Web Component 插槽 | 元数据 |

---

## 附录B 实战案例——响应式个人主页搭建

### B.1 项目概述

本附录将贯穿本文档的核心知识点，搭建一个完整的**响应式个人主页**，涵盖 HTML 语义化、CSS 布局（Flexbox + Grid）、响应式设计、动画效果等内容。

### B.2 功能与知识点对照表

| 页面模块 | 涉及章节 | 核心知识点 |
|----------|----------|-----------|
| 页面骨架 | 第2章 | DOCTYPE、meta 标签、viewport 设置 |
| 导航栏 | 第7/9章 | Flexbox 布局、sticky 定位、响应式折叠 |
| Hero 区域 | 第5/9/10章 | rem/vw 单位、clamp() 流体排版、渐变背景 |
| 关于我 | 第3/7章 | 语义化标签 article/section、Flexbox 媒体对象 |
| 技能展示 | 第7/8章 | Flexbox 进度条、Grid 标签云 |
| 项目展示 | 第8/9章 | Grid 卡片布局、媒体查询响应式 |
| 联系方式 | 第4章 | 表单元素、HTML5 验证 |
| 页脚 | 第3章 | 语义化 footer、社交链接 |
| 动画效果 | 第10章 | keyframes 动画、transform、transition |
| 深色模式 | 第9/11章 | 媒体查询 prefers-color-scheme、CSS 变量 |

### B.3 完整代码实现

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="张三的个人主页 - 前端工程师">
    <meta name="author" content="张三">

    <title>张三 | 前端工程师</title>

    <!-- 关键资源预加载 -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👨‍💻</text></svg>">

    <style>
        /* ========================================
           CSS 自定义属性（设计令牌）
           知识点: 第10章 - CSS Variables
           ======================================== */
        :root {
            /* 颜色系统 */
            --c-bg: #ffffff;
            --c-bg-alt: #f8fafc;
            --c-text: #1e293b;
            --c-text-muted: #64748b;
            --c-primary: #6366f1;
            --c-primary-light: #818cf8;
            --c-primary-dark: #4f46e5;
            --c-accent: #f59e0b;
            --c-border: #e2e8f0;
            --c-card: #ffffff;
            --c-success: #22c55e;

            /* 间距系统（基于 4px 网格）*/
            --space-1: 4px;
            --space-2: 8px;
            --space-3: 12px;
            --space-4: 16px;
            --space-6: 24px;
            --space-8: 32px;
            --space-12: 48px;
            --space-16: 64px;

            /* 字体 */
            --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
            --font-mono: 'JetBrains Mono', monospace;

            /* 圆角 */
            --radius-sm: 6px;
            --radius-md: 10px;
            --radius-lg: 16px;
            --radius-full: 9999px;

            /* 阴影 */
            --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);

            /* 过渡 */
            --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
            --duration-normal: 300ms;

            /* 层级 */
            --z-nav: 100;
            --z-modal: 1000;
        }

        /* 深色模式变量覆盖
           知识点: 第9章 - 媒体查询 prefers-color-scheme */
        @media (prefers-color-scheme: dark) {
            :root {
                --c-bg: #0f172a;
                --c-bg-alt: #1e293b;
                --c-text: #f1f5f9;
                --c-text-muted: #94a3b8;
                --c-border: #334155;
                --c-card: #1e293b;
                --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.2);
                --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3);
                --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.3);
            }
        }
        /* ========================================
           全局重置与基础样式
           知识点: 第5章 - 盒模型、单位
           ======================================== */
        *,
        *::before,
        *::after {
            box-sizing: border-box; /* 统一 border-box 盒模型 */
            margin: 0;
            padding: 0;
        }

        html {
            scroll-behavior: smooth; /* 平滑滚动 */
            -webkit-text-size-adjust: 100%;
        }

        body {
            font-family: var(--font-sans);
            font-size: clamp(0.875rem, 1.5vw + 0.5rem, 1rem); /* 流体字号 */
            line-height: 1.6;
            color: var(--c-text);
            background-color: var(--c-bg);
            /* 知识点: 第10章 - 过渡 */
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        img {
            max-width: 100%; /* 响应式图片 */
            height: auto;
            display: block;
        }

        a {
            color: inherit;
            text-decoration: none;
        }

        ul { list-style: none; }
        /* ========================================
           导航栏组件
           知识点: 第7章 - Flexbox 布局
                  第6章 - sticky 定位
                  第9章 - 响应式设计
           ======================================== */
        .site-nav {
            /* Flexbox 水平布局 */
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-4) var(--space-6);

            /* 固定在顶部 */
            position: sticky;
            top: 0;
            z-index: var(--z-nav);

            /* 半透明毛玻璃效果 */
            background: rgb(from var(--c-bg) r g b / 0.85);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--c-border);
        }

        .nav-logo {
            font-size: 1.25rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--c-primary), var(--c-accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .nav-links {
            display: flex;
            gap: var(--space-6);
        }

        .nav-links a {
            font-weight: 500;
            color: var(--c-text-muted);
            transition: color var(--duration-normal) var(--ease-out);
            position: relative;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--c-primary);
            transition: width var(--duration-normal) var(--ease-out);
        }

        .nav-links a:hover {
            color: var(--c-primary);
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        /* 移动端汉堡菜单按钮 */
        .nav-toggle {
            display: none; /* 桌面端隐藏 */
            flex-direction: column;
            gap: 5px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
        }

        .nav-toggle span {
            display: block;
            width: 24px;
            height: 2px;
            background: var(--c-text);
            transition: all var(--duration-normal) var(--ease-out);
        }

        /* 汉堡按钮动画（打开状态）*/
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }

        /* 响应式: 移动端导航 */
        @media (max-width: 767px) {
            .nav-toggle { display: flex; }
            .nav-links {
                /* 移动端: 导航变为垂直下拉菜单 */
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                flex-direction: column;
                background: var(--c-bg);
                padding: var(--space-4);
                gap: var(--space-3);
                border-bottom: 1px solid var(--c-border);
                box-shadow: var(--shadow-lg);
            }
            .nav-links.open { display: flex; }
        }
        /* ========================================
           Hero 区域
           知识点: 第5章 - rem/vw 单位、渐变
                  第9章 - clamp() 流体排版
                  第10章 - keyframes 动画
           ======================================== */
        .hero {
            /* Flexbox 垂直居中 */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            min-height: 100vh;
            padding: var(--space-12) var(--space-6);

            /* 渐变背景 */
            background: radial-gradient(
                ellipse at 50% 0%,
                rgb(from var(--c-primary) r g b / 0.15) 0%,
                transparent 70%
            );
        }

        .hero-avatar-wrapper {
            position: relative;
            margin-bottom: var(--space-8);
            /* 入场动画 */
            animation: fadeSlideUp 0.8s var(--ease-out) both;
        }

        .hero-avatar {
            width: clamp(100px, 20vw, 160px);
            height: clamp(100px, 20vw, 160px);
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid var(--c-primary-light);
            box-shadow: var(--shadow-xl);
            /* 知识点: 第10章 - 过渡 */
            transition: transform 0.3s var(--ease-out);
        }

        .hero-avatar:hover {
            transform: scale(1.05) rotate(2deg);
        }

        /* 在线状态指示灯 */
        .status-dot {
            position: absolute;
            bottom: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
            background: var(--c-success);
            border: 3px solid var(--c-bg);
            border-radius: 50%;
            /* 脉冲动画表示在线 */
            animation: pulse-ring 2s ease-out infinite;
        }

        .hero-greeting {
            font-size: clamp(1rem, 2vw, 1.25rem);
            color: var(--c-text-muted);
            margin-bottom: var(--space-2);
            animation: fadeSlideUp 0.8s var(--ease-out) 0.1s both;
        }

        .hero-name {
            /* 流体排版 */
            font-size: clamp(2rem, 6vw, 4rem);
            font-weight: 800;
            letter-spacing: -0.02em;
            line-height: 1.1;
            margin-bottom: var(--space-4);
            animation: fadeSlideUp 0.8s var(--ease-out) 0.2s both;
        }

        .hero-title {
            font-size: clamp(1.1rem, 2.5vw, 1.5rem);
            color: var(--c-text-muted);
            margin-bottom: var(--space-8);
            animation: fadeSlideUp 0.8s var(--ease-out) 0.3s both;
        }

        .hero-title .highlight {
            color: var(--c-primary);
            font-weight: 600;
        }

        /* CTA 按钮组: Flexbox 水平排列 */
        .hero-actions {
            display: flex;
            gap: var(--space-4);
            flex-wrap: wrap;
            justify-content: center;
            animation: fadeSlideUp 0.8s var(--ease-out) 0.4s both;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            padding: var(--space-3) var(--space-6);
            border-radius: var(--radius-full);
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all var(--duration-normal) var(--ease-out);
        }

        .btn-primary {
            background: var(--c-primary);
            color: white;
            box-shadow: var(--shadow-md), 0 0 0 0 rgb(from var(--c-primary) r g b / 0.4);
        }

        .btn-primary:hover {
            background: var(--c-primary-dark);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg), 0 0 0 0 rgb(from var(--c-primary) r g b / 0);
        }

        .btn-outline {
            border-color: var(--c-border);
            background: var(--c-card);
            color: var(--c-text);
        }

        .btn-outline:hover {
            border-color: var(--c-primary);
            color: var(--c-primary);
        }
        /* ========================================
           通用 Section 样式
           知识点: 第3章 - 语义化 section
           ======================================== */
        .section {
            padding: var(--space-16) var(--space-6);
            max-width: 1100px;
            margin: 0 auto;
        }

        .section-label {
            display: inline-block;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--c-primary);
            margin-bottom: var(--space-2);
        }

        .section-title {
            font-size: clamp(1.75rem, 4vw, 2.5rem);
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: var(--space-3);
        }

        .section-desc {
            font-size: 1.05rem;
            color: var(--c-text-muted);
            max-width: 600px;
            margin-bottom: var(--space-8);
        }
        /* ========================================
           关于我（About）区域
           知识点: 第3章 - article/section 语义化
                  第7章 - Flexbox 媒体对象模式
           ======================================== */
        .about-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-8);
            align-items: start;
        }

        @media (min-width: 768px) {
            .about-grid {
                grid-template-columns: 1fr 1.2fr; /* 左右两栏 */
            }
        }

        .about-image {
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow-lg);
        }

        .about-image img {
            width: 100%;
            aspect-ratio: 4/3;
            object-fit: cover;
            transition: transform 0.5s var(--ease-out);
        }

        .about-image:hover img {
            transform: scale(1.03);
        }

        .about-content h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: var(--space-4);
        }

        .about-content p {
            color: var(--c-text-muted);
            margin-bottom: var(--space-4);
            line-height: 1.8;
        }

        /* 信息列表 */
        .info-list {
            display: flex;
            flex-direction: column;
            gap: var(--space-3);
        }

        .info-item {
            display: flex;
            align-items: center;
            gap: var(--space-3);
            font-size: 0.95rem;
        }

        .info-icon {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgb(from var(--c-primary) r g b / 0.1);
            color: var(--c-primary);
            border-radius: var(--radius-sm);
            flex-shrink: 0;
            font-size: 0.9rem;
        }
        /* ========================================
           技能展示（Skills）区域
           知识点: 第7章 - Flexbox
                  第8章 - Grid 标签云
           ======================================== */
        .skills-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-6);
        }

        @media (min-width: 768px) {
            .skills-grid {
                grid-template-columns: 1fr 1fr;
            }
        }

        .skill-category h3 {
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: var(--space-4);
            display: flex;
            align-items: center;
            gap: var(--space-2);
        }

        /* 技能进度条 */
        .skill-list {
            display: flex;
            flex-direction: column;
            gap: var(--space-4);
        }

        .skill-item {
            /* Flexbox 行内排列 */
            display: flex;
            flex-direction: column;
            gap: var(--space-1);
        }

        .skill-header {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
        }

        .skill-bar {
            height: 8px;
            background: var(--c-bg-alt);
            border-radius: var(--radius-full);
            overflow: hidden;
        }

        .skill-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--c-primary), var(--c-primary-light));
            border-radius: var(--radius-full);
            /* 进度条填充动画 */
            transform-origin: left;
            animation: skillFill 1s var(--ease-out) both;
        }

        /* 技术标签云: Grid 自适应 */
        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-2);
        }

        .tech-tag {
            padding: var(--space-1) var(--space-3);
            background: rgb(from var(--c-primary) r g b / 0.08);
            color: var(--c-primary-dark);
            border-radius: var(--radius-full);
            font-size: 0.85rem;
            font-weight: 500;
            border: 1px solid rgb(from var(--c-primary) r g b / 0.15);
            transition: all var(--duration-normal) var(--ease-out);
        }

        .tech-tag:hover {
            background: var(--c-primary);
            color: white;
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }
        /* ========================================
           项目展示（Projects）区域
           知识点: 第8章 - Grid 布局
                  第9章 - 响应式 Grid
                  第10章 - hover 动画
           ======================================== */
        .projects-grid {
            /* 核心: auto-fit + minmax 响应式网格 */
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: var(--space-6);
        }

        .project-card {
            background: var(--c-card);
            border: 1px solid var(--c-border);
            border-radius: var(--radius-lg);
            overflow: hidden;
            transition: transform var(--duration-normal) var(--ease-out),
                        box-shadow var(--duration-normal) var(--ease-out);
        }

        .project-card:hover {
            transform: translateY(-6px);
            box-shadow: var(--shadow-xl);
        }

        .project-thumb {
            aspect-ratio: 16/10;
            overflow: hidden;
        }

        .project-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s var(--ease-out);
        }

        .project-card:hover .project-thumb img {
            transform: scale(1.08);
        }

        .project-info {
            padding: var(--space-5);
        }

        .project-tags {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-2);
            margin-bottom: var(--space-3);
        }

        .project-tag {
            font-size: 0.75rem;
            padding: 2px 8px;
            background: var(--c-bg-alt);
            color: var(--c-text-muted);
            border-radius: var(--radius-sm);
        }

        .project-title {
            font-size: 1.15rem;
            font-weight: 700;
            margin-bottom: var(--space-2);
        }

        .project-desc {
            font-size: 0.9rem;
            color: var(--c-text-muted);
            line-height: 1.6;
            margin-bottom: var(--space-4);
        }

        .project-links {
            display: flex;
            gap: var(--space-3);
        }

        .project-link {
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--c-primary);
            display: inline-flex;
            align-items: center;
            gap: 4px;
            transition: gap var(--duration-normal) var(--ease-out);
        }

        .project-link:hover {
            gap: 8px;
        }
        /* ========================================
           联系表单（Contact）区域
           知识点: 第4章 - 表单与验证
                  第7章 - Flexbox/Grid 表单布局
           ======================================== */
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-8);
        }

        @media (min-width: 768px) {
            .contact-grid {
                grid-template-columns: 1fr 1fr;
            }
        }

        .contact-form {
            display: flex;
            flex-direction: column;
            gap: var(--space-4);
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: var(--space-1);
        }

        .form-group label {
            font-size: 0.9rem;
            font-weight: 600;
        }

        .form-group input,
        .form-group textarea {
            padding: var(--space-3) var(--space-4);
            border: 2px solid var(--c-border);
            border-radius: var(--radius-md);
            font-size: 0.95rem;
            font-family: inherit;
            background: var(--c-bg);
            color: var(--c-text);
            transition: border-color var(--duration-normal) var(--ease-out),
                        box-shadow var(--duration-normal) var(--ease-out);
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--c-primary);
            box-shadow: 0 0 0 3px rgb(from var(--c-primary) r g b / 0.15);
        }

        .form-group textarea {
            min-height: 120px;
            resize: vertical;
        }

        /* 表单验证样式 */
        .form-group input:invalid:not(:placeholder-shown) {
            border-color: #ef4444;
        }

        .form-group input:valid:not(:placeholder-shown) {
            border-color: var(--c-success);
        }

        .submit-btn {
            align-self: flex-start;
            padding: var(--space-3) var(--space-8);
            background: var(--c-primary);
            color: white;
            border: none;
            border-radius: var(--radius-full);
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all var(--duration-normal) var(--ease-out);
        }

        .submit-btn:hover {
            background: var(--c-primary-dark);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        /* 联系信息卡片 */
        .contact-info {
            display: flex;
            flex-direction: column;
            gap: var(--space-4);
        }

        .contact-card {
            display: flex;
            align-items: center;
            gap: var(--space-4);
            padding: var(--space-4);
            background: var(--c-bg-alt);
            border-radius: var(--radius-md);
            transition: transform var(--duration-normal) var(--ease-out);
        }

        .contact-card:hover {
            transform: translateX(4px);
        }

        .contact-icon {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--c-primary);
            color: white;
            border-radius: var(--radius-md);
            font-size: 1.2rem;
            flex-shrink: 0;
        }

        .contact-detail h4 {
            font-size: 0.9rem;
            font-weight: 700;
            margin-bottom: 2px;
        }

        .contact-detail p {
            font-size: 0.85rem;
            color: var(--c-text-muted);
        }
        /* ========================================
           页脚（Footer）
           知识点: 第3章 - 语义化 footer
           ======================================== */
        .site-footer {
            border-top: 1px solid var(--c-border);
            padding: var(--space-8) var(--space-6);
            text-align: center;
        }

        .footer-socials {
            display: flex;
            justify-content: center;
            gap: var(--space-4);
            margin-bottom: var(--space-6);
        }

        .social-link {
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--c-bg-alt);
            color: var(--c-text-muted);
            border-radius: var(--radius-md);
            font-size: 1.2rem;
            transition: all var(--duration-normal) var(--ease-out);
        }

        .social-link:hover {
            background: var(--c-primary);
            color: white;
            transform: translateY(-3px);
        }

        .footer-copy {
            font-size: 0.85rem;
            color: var(--c-text-muted);
        }
        /* ========================================
           动画关键帧定义
           知识点: 第10章 - @keyframes
           ======================================== */
        @keyframes fadeSlideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes pulse-ring {
            0% {
                box-shadow: 0 0 0 0 rgb(from var(--c-success) r g b / 0.6);
            }
            80% {
                box-shadow: 0 0 0 12px rgb(from var(--c-success) r g b / 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgb(from var(--c-success) r g b / 0);
            }
        }

        @keyframes skillFill {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
        }
        /* ========================================
           滚动显示动画（Intersection Observer 辅助类）
           知识点: 第10章 - 动画
           ======================================== */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s var(--ease-out),
                        transform 0.6s var(--ease-out);
        }

        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* 减弱动画偏好（无障碍）
           知识点: 第9章 - prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                transition-duration: 0.01ms !important;
            }
            .reveal {
                opacity: 1;
                transform: none;
            }
        }
    </style>
</head>
<body>

    <!-- ==================== 导航栏 ==================== -->
    <!-- 知识点: 第3章 - nav 语义化标签 -->
    <nav class="site-nav" aria-label="主导航">
        <a href="#" class="nav-logo">ZS.dev</a>

        <!-- 移动端菜单按钮 -->
        <button class="nav-toggle" aria-label="打开菜单" aria-expanded="false">
            <span></span><span></span><span></span>
        </button>

        <!-- 知识点: 第7章 - Flexbox 导航布局 -->
        <ul class="nav-links">
            <li><a href="#about">关于我</a></li>
            <li><a href="#skills">技能</a></li>
            <li><a href="#projects">项目</a></li>
            <li><a href="#contact">联系</a></li>
        </ul>
    </nav>
    <!-- ==================== Hero 区域 ==================== -->
    <!-- 知识点: 第5章 - fluid排版 clamp() -->
    <header class="hero">
        <div class="hero-avatar-wrapper">
            <!-- 知识点: 第4章 - img alt 属性（可访问性）-->
            <img class="hero-avatar"
                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                 alt="张三的头像照片">
            <span class="status-dot" title="当前在线"></span>
        </div>

        <p class="hero-greeting">👋 你好，我是</p>
        <h1 class="hero-name">张三</h1>
        <p class="hero-title">
            一名热爱<span class="highlight">创造优雅体验</span>的前端工程师
        </p>

        <!-- 知识点: 第7章 - Flexbox 按钮组 -->
        <div class="hero-actions">
            <a href="#projects" class="btn btn-primary">
                📂 查看作品
            </a>
            <a href="#contact" class="btn btn-outline">
                ✉️ 联系我
            </a>
        </div>
    </header>
    <!-- ==================== 关于我 ==================== -->
    <!-- 知识点: 第3章 - main/article/section 语义化 -->
    <main>
        <section id="about" class="section reveal">
            <span class="section-label">About Me</span>
            <h2 class="section-title">关于我</h2>
            <p class="section-desc">
                5年前端开发经验，专注于构建高性能、可访问的现代 Web 应用。
            </p>

            <!-- 知识点: 第8章 - Grid 两栏布局 -->
            <div class="about-grid">
                <div class="about-image">
                    <!-- 知识点: 第4章 - picture 响应式图片 -->
                    <img src="https://picsum.photos/600/450?random=1"
                         alt="工作中的照片"
                         loading="lazy"
                         width="600" height="450">
                </div>

                <article class="about-content">
                    <h3>🚀 我的故事</h3>
                    <p>
                        我是一名充满热情的前端开发者，热衷于将设计转化为流畅、
                        优雅的用户界面。我相信好的代码不仅要能运行，
                        更要让人愉悦地阅读和维护。
                    </p>
                    <p>
                        在工作之余，我喜欢参与开源项目、撰写技术博客，
                        以及探索最新的前端技术趋势。
                    </p>

                    <!-- 知识点: 第7章 - Flexbox 信息列表 -->
                    <div class="info-list">
                        <div class="info-item">
                            <span class="info-icon">📍</span>
                            <span>北京，中国</span>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">💼</span>
                            <span>高级前端工程师 @ 某科技公司</span>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">🎓</span>
                            <span>计算机科学与技术 · 本科</span>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">💡</span>
                            <span>开源爱好者 / 技术博主</span>
                        </div>
                    </div>
                </article>
            </div>
        </section>
        <!-- ==================== 技能展示 ==================== -->
        <section id="skills" class="section reveal">
            <span class="section-label">Skills</span>
            <h2 class="section-title">专业技能</h2>
            <p class="section-desc">
                多年积累的技术栈，持续学习与成长。
            </p>

            <!-- 知识点: 第8章 - Grid 技能双栏布局 -->
            <div class="skills-grid">

                <!-- 前端核心技能 -->
                <div class="skill-category reveal">
                    <h3>⚛️ 前端开发</h3>
                    <div class="skill-list">
                        <div class="skill-item">
                            <div class="skill-header">
                                <span>React / Next.js</span>
                                <span>95%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 95%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-header">
                                <span>TypeScript</span>
                                <span>90%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 90%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-header">
                                <span>HTML5 / CSS3</span>
                                <span>92%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 92%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-header">
                                <span>Vue.js</span>
                                <span>85%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 85%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 工具与其他 -->
                <div class="skill-category reveal">
                    <h3>🛠️ 工具与方法</h3>
                    <div class="skill-list">
                        <div class="skill-item">
                            <div class="skill-header">
                                <span>Git / GitHub</span>
                                <span>90%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 90%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-header">
                                <span>Webpack / Vite</span>
                                <span>88%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 88%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-header">
                                <span>Figma / Design</span>
                                <span>80%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 80%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- 技术标签云 -->
                    <h3 style="margin-top: var(--space-6);">🏷️ 技术标签</h3>
                    <!-- 知识点: 第7章 - Flex wrap 标签云 -->
                    <div class="tech-tags">
                        <span class="tech-tag">JavaScript</span>
                        <span class="tech-tag">React</span>
                        <span class="tech-tag">Next.js</span>
                        <span class="tech-tag">TypeScript</span>
                        <span class="tech-tag">Node.js</span>
                        <span class="tech-tag">Vue</span>
                        <span class="tech-tag">Tailwind</span>
                        <span class="tech-tag">Webpack</span>
                        <span class="tech-tag">Vite</span>
                        <span class="tech-tag">GraphQL</span>
                        <span class="tech-tag">REST API</span>
                        <span class="tech-tag">CSS Animations</span>
                        <span class="tech-tag">Performance</span>
                        <span class="tech-tag">Accessibility</span>
                    </div>
                </div>
            </div>
        </section>
        <!-- ==================== 项目展示 ==================== -->
        <!-- 知识点: 第8章 - Grid auto-fit 响应式卡片墙 -->
        <section id="projects" class="section reveal">
            <span class="section-label">Projects</span>
            <h2 class="section-title">精选项目</h2>
            <p class="section-desc">
                一些我引以为傲的作品，每个项目都是一次学习和成长的旅程。
            </p>

            <div class="projects-grid">

                <!-- 项目卡片 1 -->
                <article class="project-card reveal">
                    <div class="project-thumb">
                        <img src="https://picsum.photos/600/375?random=10"
                             alt="电商平台项目截图"
                             loading="lazy"
                             width="600" height="375">
                    </div>
                    <div class="project-info">
                        <div class="project-tags">
                            <span class="project-tag">Next.js</span>
                            <span class="project-tag">TypeScript</span>
                            <span class="project-tag">Stripe</span>
                        </div>
                        <h3 class="project-title">电商购物平台</h3>
                        <p class="project-desc">
                            一个功能完整的电商平台，支持商品浏览、购物车、
                            支付集成和订单管理。
                        </p>
                        <div class="project-links">
                            <a href="#" class="project-link">
                                查看详情 →
                            </a>
                            <a href="#" class="project-link">
                                源代码 ↗
                            </a>
                        </div>
                    </div>
                </article>

                <!-- 项目卡片 2 -->
                <article class="project-card reveal">
                    <div class="project-thumb">
                        <img src="https://picsum.photos/600/375?random=11"
                             alt="任务管理应用截图"
                             loading="lazy"
                             width="600" height="375">
                    </div>
                    <div class="project-info">
                        <div class="project-tags">
                            <span class="project-tag">React</span>
                            <span class="project-tag">Redux</span>
                            <span class="project-tag">Node.js</span>
                        </div>
                        <h3 class="project-title">任务管理应用</h3>
                        <p class="project-desc">
                            类似 Trello 的看板式项目管理工具，
                            支持拖拽排序、实时协作和数据可视化。
                        </p>
                        <div class="project-links">
                            <a href="#" class="project-link">查看详情 →</a>
                            <a href="#" class="project-link">源代码 ↗</a>
                        </div>
                    </div>
                </article>

                <!-- 项目卡片 3 -->
                <article class="project-card reveal">
                    <div class="project-thumb">
                        <img src="https://picsum.photos/600/375?random=12"
                             alt="AI 聊天助手截图"
                             loading="lazy"
                             width="600" height="375">
                    </div>
                    <div class="project-info">
                        <div class="project-tags">
                            <span class="project-tag">Vue 3</span>
                            <span class="project-tag">OpenAI</span>
                            <span class="project-tag">WebSocket</span>
                        </div>
                        <h3 class="project-title">AI 智能聊天助手</h3>
                        <p class="project-desc">
                            基于 GPT API 的智能对话应用，
                            支持多轮对话、上下文记忆和流式输出。
                        </p>
                        <div class="project-links">
                            <a href="#" class="project-link">查看详情 →</a>
                            <a href="#" class="project-link">在线演示 ↗</a>
                        </div>
                    </div>
                </article>

                <!-- 项目卡片 4 -->
                <article class="project-card reveal">
                    <div class="project-thumb">
                        <img src="https://picsum.photos/600/375?random=13"
                             alt="数据可视化仪表盘截图"
                             loading="lazy"
                             width="600" height="375">
                    </div>
                    <div class="project-info">
                        <div class="project-tags">
                            <span class="project-tag">D3.js</span>
                            <span class="project-tag">ECharts</span>
                            <span class="project-tag">Python</span>
                        </div>
                        <h3 class="project-title">数据可视化仪表盘</h3>
                        <p class="project-desc">
                            企业级数据分析仪表盘，集成多种图表类型、
                            实时数据更新和自定义报表导出功能。
                        </p>
                        <div class="project-links">
                            <a href="#" class="project-link">查看详情 →</a>
                            <a href="#" class="project-link">源代码 ↗</a>
                        </div>
                    </div>
                </article>
            </div>
        </section>
        <!-- ==================== 联系方式 ==================== -->
        <!-- 知识点: 第4章 - 表单元素与验证 -->
        <section id="contact" class="section reveal">
            <span class="section-label">Contact</span>
            <h2 class="section-title">联系我</h2>
            <p class="section-desc">
                有项目想法或合作机会？欢迎随时联系我！
            </p>

            <div class="contact-grid">
                <!-- 联系表单 -->
                <!-- 知识点: 第4章 - HTML5 表单验证 -->
                <form class="contact-form" action="#" method="POST" novalidate>
                    <div class="form-group">
                        <label for="contact-name">姓名 *</label>
                        <input type="text"
                               id="contact-name"
                               name="name"
                               required
                               minlength="2"
                               placeholder="您的姓名"
                               autocomplete="name">
                    </div>

                    <div class="form-group">
                        <label for="contact-email">邮箱 *</label>
                        <input type="email"
                               id="contact-email"
                               name="email"
                               required
                               placeholder="your@email.com"
                               autocomplete="email">
                    </div>

                    <div class="form-group">
                        <label for="contact-subject">主题</label>
                        <input type="text"
                               id="contact-subject"
                               name="subject"
                               placeholder="消息主题">
                    </div>

                    <div class="form-group">
                        <label for="contact-message">消息内容 *</label>
                        <textarea id="contact-message"
                                  name="message"
                                  required
                                  minlength="10"
                                  placeholder="请描述您的需求或想法..."></textarea>
                    </div>

                    <button type="submit" class="submit-btn">
                        发送消息 ✉️
                    </button>
                </form>

                <!-- 联系信息 -->
                <div class="contact-info">
                    <div class="contact-card">
                        <span class="contact-icon">📧</span>
                        <div class="contact-detail">
                            <h4>电子邮件</h4>
                            <p>zhangsan@example.com</p>
                        </div>
                    </div>

                    <div class="contact-card">
                        <span class="contact-icon">💬</span>
                        <div class="contact-detail">
                            <h4>微信</h4>
                            <p>zhangsan_dev</p>
                        </div>
                    </div>

                    <div class="contact-card">
                        <span class="contact-icon">🔗</span>
                        <div class="contact-detail">
                            <h4>GitHub</h4>
                            <p>github.com/zhangsan</p>
                        </div>
                    </div>

                    <div class="contact-card">
                        <span class="contact-icon">📍</span>
                        <div class="contact-detail">
                            <h4>位置</h4>
                            <p>北京市朝阳区</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <!-- ==================== 页脚 ==================== -->
    <!-- 知识点: 第3章 - footer 语义化 -->
    <footer class="site-footer">
        <!-- 社交链接 -->
        <div class="footer-socials">
            <a href="#" class="social-link" aria-label="GitHub">GH</a>
            <a href="#" class="social-link" aria-label="Twitter">TW</a>
            <a href="#" class="social-link" aria-label="LinkedIn">LI</a>
            <a href="#" class="social-link" aria-label="微信">WX</a>
        </div>

        <p class="footer-copy">
            &copy; 2026 张三. 用 ❤️ 和
            <span style="color: var(--c-primary); font-weight: 600;">HTML + CSS</span>
            构建
        </p>
    </footer>
    <!-- ==================== JavaScript 交互逻辑 ==================== -->
    <script>
        // ===== 移动端导航菜单切换 =====
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');

        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // 点击导航链接后关闭菜单
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // ===== Intersection Observer: 滚动显示动画 =====
        // 知识点: 第13章 - 性能优化（优于 scroll 事件监听）
        const observerOptions = {
            root: null,          // 视口作为观察容器
            rootMargin: '0px 0px -50px 0px', // 提前 50px 触发
            threshold: 0.1       // 元素 10% 可见时触发
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // 可选: 只触发一次后停止观察
                    // revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 观察所有需要动画的元素
        document.querySelectorAll('.reveal').forEach(el => {
            revealObserver.observe(el);
        });
        // ===== 表单提交处理 =====
        const contactForm = document.querySelector('.contact-form');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 知识点: 第4章 - Constraint Validation API
            if (!this.checkValidity()) {
                this.reportValidity();
                return;
            }

            // 收集表单数据
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            console.log('表单提交数据:', data);

            // 模拟提交成功
            alert('感谢您的消息！我会尽快回复您。');
            this.reset();
        });
        // ===== 平滑滚动（增强版，兼容性更好）=====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>

</body>
</html>
```

### B.4 知识点覆盖总结

| 本文档章节 | 实战项目中对应实现 | 代码位置 |
|-----------|-------------------|---------|
| **第2章** HTML基础语法 | DOCTYPE、meta、charset、viewport | `<head>` 区域 |
| **第3章** HTML语义化 | `nav/main/section/article/header/footer` | 全文贯穿 |
| **第4章** 表单与多媒体 | 完整表单（input/textarea/select）、验证 | Contact 区域 |
| **第5章** CSS基础 | 盒模型(border-box)、选择器、单位(clamp/rem/vw) | 全局样式 |
| **第6章** 定位 | `sticky` 导航栏 | `.site-nav` |
| **第7章** Flexbox | 导航布局、Hero居中、按钮组、媒体对象、标签云 | 多处使用 |
| **第8章** Grid | About双栏、Skills双栏、Projects响应式网格 | 各Section |
| **第9章** 响应式 | Mobile First媒体查询、深色模式、流体排版 | `@media` 规则 |
| **第10章** 进阶特性 | CSS变量、keyframes动画、transition、transform | 动画系统 |
| **第13章** 渲染原理 | IntersectionObserver替代scroll事件 | JS 部分 |

---

> **文档结束**
>
> 本文档涵盖了 HTML5 与 CSS3 的核心知识体系，从基础语法到渲染原理，共 **14 章 + 2 个附录**。建议结合实际编码练习加深理解。祝学习顺利！ 🎉