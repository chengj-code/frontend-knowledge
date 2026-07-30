# useWindowSize 源码详细注释

> 三种视口类型 + 方向变化监听

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useWindowSize/index.ts` |
| 代码行数 | 92 行 |
| 所属包 | `@vueuse/core` |
| 依赖工具 | `useEventListener`、`useMediaQuery`、`tryOnMounted` |
| 设计模式 | 策略模式 |
| 核心知识点 | 三种视口类型、滚动条处理、方向监听 |

---

## 源码逐行注释

```ts
export function useWindowSize(options: UseWindowSizeOptions = {}) {
  const {
    window = defaultWindow,
    initialWidth = Number.POSITIVE_INFINITY,
    // 💡 默认初始宽度：Infinity
    // 💡 SSR 时返回 Infinity，客户端挂载后更新为实际值
    initialHeight = Number.POSITIVE_INFINITY,
    listenOrientation = true,
    includeScrollbar = true,
    type = 'inner',
    // 💡 默认使用 innerWidth/innerHeight
  } = options

  const width = shallowRef(initialWidth)
  const height = shallowRef(initialHeight)

  // ⭐ 更新函数：根据 type 选择不同的视口测量方式
  const update = () => {
    if (window) {
      if (type === 'outer') {
        width.value = window.outerWidth
        height.value = window.outerHeight
        // 💡 outer: 浏览器窗口外部尺寸（包含工具栏、滚动条等）
      }
      else if (type === 'visual' && window.visualViewport) {
        const { width: visualViewportWidth, height: visualViewportHeight, scale } = window.visualViewport
        width.value = Math.round(visualViewportWidth * scale)
        height.value = Math.round(visualViewportHeight * scale)
        // 💡 visual: 可视视口（考虑缩放）
        // 💡 移动端缩放时，visualViewport 会变化
        // 💡 乘以 scale 得到 CSS 像素
      }
      else if (includeScrollbar) {
        width.value = window.innerWidth
        height.value = window.innerHeight
        // 💡 inner + 包含滚动条：视口尺寸（含滚动条）
      }
      else {
        width.value = window.document.documentElement.clientWidth
        height.value = window.document.documentElement.clientHeight
        // 💡 inner + 不含滚动条：视口尺寸（不含滚动条）
        // 💡 clientWidth/clientHeight 不包含滚动条宽度
      }
    }
  }

  update()
  // 💡 立即执行一次（客户端）

  tryOnMounted(update)
  // 💡 挂载后再执行一次（确保 DOM 就绪）

  // ⭐ 监听 resize 事件
  const listenerOptions = { passive: true }
  useEventListener('resize', update, listenerOptions)

  // ⭐ visualViewport 需要额外监听
  if (window && type === 'visual' && window.visualViewport) {
    useEventListener(window.visualViewport, 'resize', update, listenerOptions)
  }

  // ⭐ 方向变化监听
  if (listenOrientation) {
    const matches = useMediaQuery('(orientation: portrait)')
    watch(matches, () => update())
    // 💡 使用 CSS 媒体查询检测方向变化
    // 💡 比 orientationchange 事件更可靠
  }

  return { width, height }
}
```

---

## 三种视口类型对比

| 类型 | API | 包含滚动条 | 适用场景 |
|------|-----|-----------|---------|
| `inner`（默认） | `innerWidth/Height` | 可配置 | 通用布局 |
| `outer` | `outerWidth/Height` | 是 | 浏览器窗口大小 |
| `visual` | `visualViewport` | 否 | 移动端缩放 |

---

## 笔记

```
在此记录你的学习笔记...

```
