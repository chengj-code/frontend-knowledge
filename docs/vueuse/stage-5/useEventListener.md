# useEventListener 源码详细注释

> VueUse 的基石 hook，6 种重载覆盖所有事件监听场景

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useEventListener/index.ts` |
| 代码行数 | 185 行 |
| 所属包 | `@vueuse/core` |
| 依赖工具 | `watchImmediate`、`tryOnScopeDispose`、`unrefElement`、`defaultWindow` |
| 设计模式 | 函数重载、响应式重注册 |
| 核心知识点 | 6 种重载签名、响应式 target/event/listener、自动清理 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型定义
// ============================================================

interface InferEventTarget<Events> {
  addEventListener: (event: Events, fn?: any, options?: any) => any
  removeEventListener: (event: Events, fn?: any, options?: any) => any
}
// 💡 推断事件目标的接口
// 💡 只要对象有 addEventListener 和 removeEventListener 方法，就可以作为事件目标
// 💡 这使得 useEventListener 可以接受任何符合 DOM 事件接口的对象

export type WindowEventName = keyof WindowEventMap
// 💡 窗口事件名称类型：'click' | 'scroll' | 'resize' | ...

export type DocumentEventName = keyof DocumentEventMap
// 💡 文档事件名称类型

export interface GeneralEventListener<E = Event> {
  (evt: E): void
}
// 💡 通用事件监听器类型

// ============================================================
// 第二部分：6 种重载签名（⭐ 核心难点）
// ============================================================

// 重载 1：省略 target → 默认 window
export function useEventListener<E extends keyof WindowEventMap>(
  event: MaybeRefOrGetter<Arrayable<E>>,
  listener: MaybeRef<Arrayable<(this: Window, ev: WindowEventMap[E]) => any>>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn
// 💡 最简用法：useEventListener('click', handler)
// 💡 自动监听 window 上的事件

// 重载 2：显式 Window target
export function useEventListener<E extends keyof WindowEventMap>(
  target: Window,
  event: MaybeRefOrGetter<Arrayable<E>>,
  listener: MaybeRef<Arrayable<(this: Window, ev: WindowEventMap[E]) => any>>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn
// 💡 显式指定 window：useEventListener(window, 'click', handler)

// 重载 3：显式 Document target
export function useEventListener<E extends keyof DocumentEventMap>(
  target: DocumentOrShadowRoot,
  event: MaybeRefOrGetter<Arrayable<E>>,
  listener: MaybeRef<Arrayable<(this: Document, ev: DocumentEventMap[E]) => any>>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn
// 💡 监听文档事件：useEventListener(document, 'visibilitychange', handler)

// 重载 4：显式 HTMLElement target（⭐ 支持响应式 target）
export function useEventListener<E extends keyof HTMLElementEventMap>(
  target: MaybeRefOrGetter<Arrayable<HTMLElement> | null | undefined>,
  event: MaybeRefOrGetter<Arrayable<E>>,
  listener: MaybeRef<(this: HTMLElement, ev: HTMLElementEventMap[E]) => any>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): () => void
// 💡 监听元素事件：useEventListener(element, 'click', handler)
// 💡 target 支持响应式：useEventListener(refToElement, 'click', handler)

// 重载 5：自定义事件目标（带类型推断）
export function useEventListener<Names extends string, EventType = Event>(
  target: MaybeRefOrGetter<Arrayable<InferEventTarget<Names>> | null | undefined>,
  event: MaybeRefOrGetter<Arrayable<Names>>,
  listener: MaybeRef<Arrayable<GeneralEventListener<EventType>>>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn
// 💡 自定义事件目标：useEventListener(customTarget, 'my-event', handler)

// 重载 6：通用 EventTarget fallback
export function useEventListener<EventType = Event>(
  target: MaybeRefOrGetter<Arrayable<EventTarget> | null | undefined>,
  event: MaybeRefOrGetter<Arrayable<string>>,
  listener: MaybeRef<Arrayable<GeneralEventListener<EventType>>>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn
// 💡 最通用的 fallback：任何 EventTarget 都可以

// ============================================================
// 第三部分：函数实现（⭐ 核心逻辑）
// ============================================================

export function useEventListener(...args: Parameters<typeof useEventListener>) {
  // ⭐ 参数清理机制
  const cleanups: Function[] = []
  const cleanup = () => {
    cleanups.forEach(fn => fn())
    cleanups.length = 0
  }
  // 💡 保存所有的清理函数
  // 💡 cleanup() 会执行所有清理函数并清空数组

  // ⭐ 注册函数：添加事件监听并返回清理函数
  const register = (
    el: EventTarget,
    event: string,
    listener: any,
    options: boolean | AddEventListenerOptions | undefined,
  ) => {
    el.addEventListener(event, listener, options)
    return () => el.removeEventListener(event, listener, options)
  }
  // 💡 标准的 add/removeEventListener 模式
  // 💡 返回清理函数，方便后续移除

  // ⭐ 关键：推断第一个参数是否是事件目标
  const firstParamTargets = computed(() => {
    const test = toArray(toValue(args[0])).filter(e => e != null)
    return test.every(e => typeof e !== 'string') ? test : undefined
  })
  // 💡 检查第一个参数：
  //    - 如果所有元素都不是字符串 → 它们是 target
  //    - 否则 → 第一个参数是 event name
  // 💡 这是区分重载 1（省略 target）和重载 2-6（有 target）的关键

  // ⭐ 响应式重注册（⭐⭐ 最核心的部分）
  const stopWatch = watchImmediate(
    () => [
      // 解析 target
      firstParamTargets.value?.map(e => unrefElement(e as never)) ?? [defaultWindow].filter(e => e != null),
      // 💡 如果有 target → 解包每个 target 的 DOM 元素
      // 💡 如果没有 target → 使用 defaultWindow

      // 解析 event
      toArray(toValue(firstParamTargets.value ? args[1] : args[0]) as string[]),
      // 💡 如果有 target → event 在 args[1]
      // 💡 如果没有 target → event 在 args[0]

      // 解析 listener
      toArray(unref(firstParamTargets.value ? args[2] : args[1]) as Function[]),
      // 💡 如果有 target → listener 在 args[2]
      // 💡 如果没有 target → listener 在 args[1]

      // 解析 options
      toValue(firstParamTargets.value ? args[3] : args[2]) as boolean | AddEventListenerOptions | undefined,
      // 💡 如果有 target → options 在 args[3]
      // 💡 如果没有 target → options 在 args[2]
    ] as const,
    ([raw_targets, raw_events, raw_listeners, raw_options]) => {
      cleanup()
      // ⭐ 每次变化时，先清理旧的监听器

      if (!raw_targets?.length || !raw_events?.length || !raw_listeners?.length)
        return
      // 💡 如果 target/event/listener 任何一个为空，跳过注册

      // ⭐ 克隆 options，避免响应式变化影响已注册的监听器
      const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options

      // ⭐ 笛卡尔积注册：target × event × listener
      cleanups.push(
        ...raw_targets.flatMap(el =>
          raw_events.flatMap(event =>
            raw_listeners.map(listener => register(el, event, listener, optionsClone)),
          ),
        ),
      )
      // 💡 如果有 2 个 target、3 个 event、1 个 listener → 注册 6 个监听器
      // 💡 每个注册都返回清理函数，存入 cleanups 数组
    },
    { flush: 'post' },
    // ⭐ flush: 'post' 的作用：
    //    确保在 DOM 更新后执行
    //    这样 unrefElement() 能获取到最新的 DOM 元素
  )

  // ⭐ 停止函数
  const stop = () => {
    stopWatch()
    cleanup()
  }
  // 💡 停止 watcher + 清理所有监听器

  // ⭐ 自动清理
  tryOnScopeDispose(cleanup)
  // 💡 组件卸载时自动清理所有监听器
  // 💡 防止内存泄漏

  return stop
  // 💡 返回停止函数，允许手动清理
}
```

---

## 核心设计解析

### 1. 参数推断机制

```
useEventListener('click', handler)
  → args[0] = 'click'（字符串）
  → firstParamTargets = undefined
  → event = args[0] = 'click'
  → listener = args[1] = handler
  → target = defaultWindow

useEventListener(element, 'click', handler)
  → args[0] = element（非字符串）
  → firstParamTargets = [element]
  → target = args[0]
  → event = args[1] = 'click'
  → listener = args[2] = handler
```

### 2. 响应式重注册

```
target 变化 → watchImmediate 触发
  → cleanup()（清理旧监听器）
  → register(newTarget, event, listener)
  → cleanups.push(newCleanup)

event 变化 → watchImmediate 触发
  → cleanup()（清理旧监听器）
  → register(target, newEvent, listener)
  → cleanups.push(newCleanup)
```

### 3. 笛卡尔积注册

```
targets: [el1, el2]
events: ['click', 'dblclick']
listeners: [handler]

注册结果：
  el1.addEventListener('click', handler)
  el1.addEventListener('dblclick', handler)
  el2.addEventListener('click', handler)
  el2.addEventListener('dblclick', handler)
```

---

## 使用示例

```ts
// 重载 1：省略 target
useEventListener('scroll', handler)

// 重载 2：Window target
useEventListener(window, 'resize', handler)

// 重载 3：Document target
useEventListener(document, 'visibilitychange', handler)

// 重载 4：HTMLElement target（响应式）
const el = ref<HTMLElement>()
useEventListener(el, 'click', handler)

// 重载 5：自定义事件目标
useEventListener(customTarget, 'my-event', handler)

// 响应式 event
const eventName = ref('click')
useEventListener(eventName, handler)

// 数组事件
useEventListener(['mousedown', 'mouseup'], handler)
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useMouse` | 被依赖 | 监听 mousemove/touchmove |
| `useWindowSize` | 被依赖 | 监听 resize |
| `useFullscreen` | 被依赖 | 监听 fullscreenchange |
| `useNetwork` | 被依赖 | 监听 online/offline |
| `useIdle` | 被依赖 | 监听多个用户活动事件 |

---

## 笔记

```
在此记录你的学习笔记...

```
