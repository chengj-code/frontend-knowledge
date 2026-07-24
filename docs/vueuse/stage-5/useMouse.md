# useMouse 源码详细注释

> 策略模式的典型应用：4 种坐标提取策略 + 多事件源聚合

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useMouse/index.ts` |
| 代码行数 | 167 行 |
| 所属包 | `@vueuse/core` |
| 依赖工具 | `useEventListener`、`shallowRef` |
| 设计模式 | 策略模式 |
| 核心知识点 | 内置策略 + 自定义策略、多事件源、事件过滤器 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型定义
// ============================================================

export type UseMouseCoordType = 'page' | 'client' | 'screen' | 'movement'
// 💡 4 种坐标类型：
//    - page: 相对于整个页面（含滚动）
//    - client: 相对于视口（不含滚动）
//    - screen: 相对于屏幕
//    - movement: 相对于上一次位置的增量

export type UseMouseSourceType = 'mouse' | 'touch' | null
// 💡 事件来源：鼠标、触摸或未知

export type UseMouseEventExtractor = (event: MouseEvent | Touch) => [x: number, y: number] | null | undefined
// 💡 坐标提取函数类型
// 💡 接收事件对象，返回 [x, y] 坐标或 null（表示忽略）

// ============================================================
// 第二部分：内置策略（⭐ 策略模式的核心）
// ============================================================

const UseMouseBuiltinExtractors: Record<UseMouseCoordType, UseMouseEventExtractor> = {
  page: event => [event.pageX, event.pageY],
  // 💡 page 坐标：相对于整个文档（包含滚动偏移）

  client: event => [event.clientX, event.clientY],
  // 💡 client 坐标：相对于视口（不包含滚动偏移）

  screen: event => [event.screenX, event.screenY],
  // 💡 screen 坐标：相对于物理屏幕

  movement: event => (event instanceof MouseEvent
    ? [event.movementX, event.movementY]
    : null
  ),
  // 💡 movement 坐标：相对于上一次事件的增量
  // 💡 只有 MouseEvent 有 movementX/Y，TouchEvent 返回 null
} as const

// ============================================================
// 第三部分：函数实现
// ============================================================

export function useMouse(options: UseMouseOptions = {}) {
  const {
    type = 'page',
    touch = true,
    resetOnTouchEnds = false,
    initialValue = { x: 0, y: 0 },
    window = defaultWindow,
    target = window,
    scroll = true,
    eventFilter,
  } = options

  let _prevMouseEvent: MouseEvent | null = null
  // 💡 缓存上一次的鼠标事件
  // 💡 用于 scroll 事件时重新计算 page 坐标

  let _prevScrollX = 0
  let _prevScrollY = 0
  // 💡 缓存上一次的滚动位置
  // 💡 用于计算滚动引起的坐标变化

  const x = shallowRef(initialValue.x)
  const y = shallowRef(initialValue.y)
  const sourceType = shallowRef<UseMouseSourceType>(null)

  // ⭐ 策略选择
  const extractor = typeof type === 'function'
    ? type
    : UseMouseBuiltinExtractors[type]
  // 💡 如果 type 是函数 → 使用自定义策略
  // 💡 如果 type 是字符串 → 使用内置策略

  // ⭐ 鼠标事件处理
  const mouseHandler = (event: MouseEvent) => {
    const result = extractor(event)
    _prevMouseEvent = event

    if (result) {
      [x.value, y.value] = result
      sourceType.value = 'mouse'
    }

    if (window) {
      _prevScrollX = window.scrollX
      _prevScrollY = window.scrollY
    }
  }

  // ⭐ 触摸事件处理
  const touchHandler = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      const result = extractor(event.touches[0])
      // 💡 取第一个触摸点
      if (result) {
        [x.value, y.value] = result
        sourceType.value = 'touch'
      }
    }
  }

  // ⭐ 滚动事件处理（只在 type='page' 时生效）
  const scrollHandler = () => {
    if (!_prevMouseEvent || !window)
      return
    const pos = extractor(_prevMouseEvent)

    if (_prevMouseEvent instanceof MouseEvent && pos) {
      x.value = pos[0] + window.scrollX - _prevScrollX
      y.value = pos[1] + window.scrollY - _prevScrollY
      // 💡 page 坐标 = 原始坐标 + 滚动变化量
      // 💡 这样即使鼠标不动，滚动页面也会更新 page 坐标
    }
  }

  const reset = () => {
    x.value = initialValue.x
    y.value = initialValue.y
  }

  // ⭐ 事件过滤器包装
  const mouseHandlerWrapper = eventFilter
    ? (event: MouseEvent) => eventFilter(() => mouseHandler(event), {} as any)
    : (event: MouseEvent) => mouseHandler(event)

  const touchHandlerWrapper = eventFilter
    ? (event: TouchEvent) => eventFilter(() => touchHandler(event), {} as any)
    : (event: TouchEvent) => touchHandler(event)

  const scrollHandlerWrapper = eventFilter
    ? () => eventFilter(() => scrollHandler(), {} as any)
    : () => scrollHandler()
  // 💡 如果有 eventFilter，用过滤器包装处理函数
  // 💡 这样可以实现节流/防抖

  // ⭐ 注册事件监听
  if (target) {
    const listenerOptions = { passive: true }
    // 💡 passive: true 告诉浏览器这个监听器不会调用 preventDefault()
    // 💡 这允许浏览器优化滚动性能

    useEventListener(target, ['mousemove', 'dragover'], mouseHandlerWrapper, listenerOptions)
    // 💡 监听鼠标移动和拖拽

    if (touch && type !== 'movement') {
      useEventListener(target, ['touchstart', 'touchmove'], touchHandlerWrapper, listenerOptions)
      // 💡 监听触摸事件（movement 模式不支持触摸）

      if (resetOnTouchEnds)
        useEventListener(target, 'touchend', reset, listenerOptions)
      // 💡 触摸结束时重置坐标
    }

    if (scroll && type === 'page')
      useEventListener(window, 'scroll', scrollHandlerWrapper, listenerOptions)
    // 💡 只在 page 模式下监听滚动
  }

  return { x, y, sourceType }
}

export type UseMouseReturn = ReturnType<typeof useMouse>
```

---

## 策略模式解析

```
4 种内置策略：
  page    → event.pageX, event.pageY
  client  → event.clientX, event.clientY
  screen  → event.screenX, event.screenY
  movement → event.movementX, event.movementY

自定义策略：
  type: (event) => [event.clientX + 100, event.clientY + 100]

选择逻辑：
  typeof type === 'function' ? type : extractorMap[type]
```

---

## 多事件源聚合

```
鼠标事件：mousemove + dragover → mouseHandler
触摸事件：touchstart + touchmove → touchHandler
滚动事件：scroll → scrollHandler（仅 page 模式）

所有事件共享同一个 (x, y) 状态
sourceType 记录最后一次事件的来源
```

---

## 笔记

```
在此记录你的学习笔记...

```
