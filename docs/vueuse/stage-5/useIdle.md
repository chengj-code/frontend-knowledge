# useIdle 源码详细注释

> 事件过滤器 + 多事件聚合的典型应用

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useIdle/index.ts` |
| 代码行数 | 99 行 |
| 所属包 | `@vueuse/core` |
| 依赖工具 | `useEventListener`、`createFilterWrapper`、`throttleFilter` |
| 设计模式 | 观察者模式、策略模式 |
| 核心知识点 | 多事件聚合、事件过滤器应用、visibilitychange |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：默认配置
// ============================================================

const defaultEvents: WindowEventName[] = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']
// 💡 默认监听的用户活动事件
// 💡 覆盖鼠标、键盘、触摸、滚轮、窗口大小变化

const oneMinute = 60_000
// 💡 默认空闲超时：1 分钟

// ============================================================
// 第二部分：函数实现
// ============================================================

export function useIdle(
  timeout: number = oneMinute,
  options: UseIdleOptions = {},
): UseIdleReturn {
  const {
    initialState = false,
    listenForVisibilityChange = true,
    events = defaultEvents,
    window = defaultWindow,
    eventFilter = throttleFilter(50),
    // ⭐ 默认使用节流过滤器，每 50ms 最多触发一次
    // 💡 防止高频事件（如 mousemove）导致过多的状态更新
  } = options

  const idle = shallowRef(initialState)
  const lastActive = shallowRef(timestamp())

  let timer: any

  // ⭐ 重置函数：标记为活跃 + 设置新的空闲定时器
  const reset = () => {
    idle.value = false
    clearTimeout(timer)
    timer = setTimeout(() => idle.value = true, timeout)
    // 💡 每次用户活动时：
    //    1. 标记为活跃
    //    2. 清除旧的空闲定时器
    //    3. 设置新的空闲定时器（timeout 后标记为空闲）
  }

  // ⭐ 事件处理函数：用过滤器包装
  const onEvent = createFilterWrapper(
    eventFilter,
    () => {
      lastActive.value = timestamp()
      reset()
    },
  )
  // 💡 createFilterWrapper 包装了回调
  // 💡 默认 throttleFilter(50) 确保每 50ms 最多执行一次
  // 💡 这样 mousemove 等高频事件不会导致过度更新

  // ⭐ 注册事件监听
  if (window) {
    const document = window.document
    const listenerOptions = { passive: true }

    // 💡 为每个事件注册监听器
    for (const event of events)
      useEventListener(window, event, onEvent, listenerOptions)

    // ⭐ 监听页面可见性变化
    if (listenForVisibilityChange) {
      useEventListener(document, 'visibilitychange', () => {
        if (!document.hidden)
          onEvent()
        // 💡 页面从隐藏变为可见时，触发活动事件
        // 💡 这解决了"页面隐藏时 timeout 已过期，但用户回来后应该重置"的问题
      }, listenerOptions)
    }

    reset()
    // 💡 初始化时设置空闲定时器
  }

  return { idle, lastActive, reset }
}
```

---

## 核心设计

### 多事件聚合

```
mousemove  ──┐
mousedown  ──┤
resize     ──┤
keydown    ──┼──→ onEvent() ──→ reset() ──→ idle = false
touchstart ──┤                         └──→ setTimeout(timeout) ──→ idle = true
wheel      ──┤
visibility ──┘

所有事件共享同一个 onEvent 回调
onEvent 经过 throttleFilter(50) 节流
```

### 事件过滤器的作用

```
没有过滤器时：
  mousemove 触发 100 次/秒 → reset() 执行 100 次/秒 → 性能问题

有 throttleFilter(50) 时：
  mousemove 触发 100 次/秒 → onEvent 执行最多 20 次/秒 → 性能良好
```

---

## 使用示例

```ts
import { useIdle } from '@vueuse/core'

const { idle, lastActive, reset } = useIdle(5000) // 5 秒空闲

console.log(idle.value)       // false（活跃中）
console.log(lastActive.value) // 最后活动时间戳

// 5 秒无操作后
console.log(idle.value)       // true（空闲）

// 手动重置
reset()
console.log(idle.value)       // false（活跃中）
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useEventListener` | 依赖 | 监听多个用户活动事件 |
| `createFilterWrapper` | 依赖 | 事件过滤器包装 |
| `throttleFilter` | 依赖 | 默认的节流过滤器 |

---

## 笔记

```
在此记录你的学习笔记...

```
