# filters.ts 源码详细注释

> VueUse 最核心的抽象：EventFilter 系统，所有时间相关操作的基础设施

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/utils/filters.ts` |
| 代码行数 | ~249 行 |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `toValue`、`toRef`、`readonly`、`noop` |
| 设计模式 | 策略模式、高阶函数、装饰器模式 |
| 核心知识点 | EventFilter 抽象、debounce/throttle/pausable 过滤器 |

---

## 核心概念：EventFilter

### 什么是 EventFilter？

```ts
// EventFilter 是一个"高阶函数"
// 它接收一个"实际要执行的函数"（invoke），决定"何时执行"
// 这是一个经典的策略模式：将"执行时机"从"执行内容"中分离出来

type EventFilter<Args extends any[] = any[], This = any, Invoke extends AnyFn = AnyFn> = (
  invoke: Invoke,
  options: FunctionWrapperOptions<Args, This>
) => ReturnType<Invoke> | Promisify<ReturnType<Invoke>>
```

**核心思想图解：**

```
没有 EventFilter 时：
  用户输入 → 直接执行回调 → 大量无用调用

有 EventFilter 时：
  用户输入 → EventFilter（决定何时执行） → 执行回调
                ↑
          debounceFilter / throttleFilter / pausableFilter / bypassFilter
```

---

## 源码逐行注释

### 第一部分：类型定义

```ts
import type { MaybeRefOrGetter } from 'vue'
import type { AnyFn, ArgumentsType, Awaited, Pausable, Promisify } from './types'
import { isRef, readonly, toValue } from 'vue'
import { toRef } from '../toRef'
import { noop } from './is'

// ============================================================
// 核心类型 1：FunctionArgs
// ============================================================

export type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return
// 💡 函数类型约束：表示"接受 Args 参数，返回 Return 类型"的函数
// 💡 泛型默认值：Args 默认为 any[]，Return 默认为 void
// 💡 用途：约束 composable 接受的函数参数类型

// ============================================================
// 核心类型 2：FunctionWrapperOptions
// ============================================================

export interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
  fn: FunctionArgs<Args, This>   // 💡 原始函数引用
  args: Args                     // 💡 调用时传入的参数
  thisArg: This                  // 💡 调用时的 this 上下文
}
// 💡 封装了函数调用的所有上下文信息
// 💡 用途：传递给 EventFilter，让过滤器能访问调用详情

// ============================================================
// ⭐ 核心类型 3：EventFilter（VueUse 最重要的抽象）
// ============================================================

export type EventFilter<Args extends any[] = any[], This = any, Invoke extends AnyFn = AnyFn> = (
  invoke: Invoke,
  options: FunctionWrapperOptions<Args, This>
) => ReturnType<Invoke> | Promisify<ReturnType<Invoke>>
// ⭐ 这是整个 VueUse 最核心的类型抽象
// 💡 EventFilter 是一个函数，接收两个参数：
//    1. invoke: 要执行的实际函数（回调）
//    2. options: 调用上下文（原函数、参数、this）
// 💡 返回值：可能是同步值或 Promise
// 💡 策略模式：通过替换 EventFilter 实现不同的执行策略

// ============================================================
// 配置接口
// ============================================================

export interface ConfigurableEventFilter {
  eventFilter?: EventFilter
  // 💡 可配置的事件过滤器
  // 💡 很多 composable 的 options 中都有这个字段
}

export interface DebounceFilterOptions {
  maxWait?: MaybeRefOrGetter<number>
  // 💡 最大等待时间（毫秒）
  // 💡 即使持续触发，超过这个时间也会执行
  // 💡 类似 lodash 的 maxWait 选项

  rejectOnCancel?: boolean
  // 💡 取消时是否 reject Promise
  // 💡 默认 false（取消时 resolve，不抛错）
}
```

### 第二部分：createFilterWrapper（⭐ 核心桥梁）

```ts
/**
 * @internal
 */
export function createFilterWrapper<T extends AnyFn>(filter: EventFilter, fn: T) {
  // ⭐ 这是连接 EventFilter 和普通函数的桥梁
  // 💡 接受一个 EventFilter 和一个普通函数，返回一个"被过滤包装"的新函数

  function wrapper(this: any, ...args: ArgumentsType<T>) {
    // 💡 保留原函数的 this 上下文和参数
    return new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
      // ⭐ 关键：将 filter 的执行包装为 Promise
      // 💡 这样无论 filter 是同步还是异步，都能统一处理
      Promise.resolve(
        filter(
          () => fn.apply(this, args),
          // 💡 invoke：用箭头函数包装原函数调用
          // 💡 fn.apply(this, args) 保留 this 上下文和参数
          { fn, thisArg: this, args }
          // 💡 options：传递调用上下文
        )
      )
        .then(resolve)
        .catch(reject)
    })
  }

  return wrapper
  // 💡 返回包装后的函数
  // 💡 调用者不需要知道 filter 的存在，直接调用 wrapper 即可
}
```

**调用链图解：**

```
用户调用 wrapper(args)
  → filter(invoke, options)
    → debounceFilter: 延迟后调用 invoke
    → throttleFilter: 节流后调用 invoke
    → pausableFilter: 暂停时不调用，活跃时调用 invoke
    → bypassFilter: 直接调用 invoke
  → invoke() = fn.apply(this, args)
    → 执行原函数
```

### 第三部分：bypassFilter（透传过滤器）

```ts
export const bypassFilter: EventFilter = (invoke) => {
  return invoke()
}
// 💡 透传过滤器：直接执行，不做任何延迟或控制
// 💡 用途：作为默认的 EventFilter
// 💡 当用户没有自定义 eventFilter 时使用
```

### 第四部分：debounceFilter（⭐ 防抖过滤器）

```ts
/**
 * Create an EventFilter that debounce the events
 */
export function debounceFilter(ms: MaybeRefOrGetter<number>, options: DebounceFilterOptions = {}) {
  // 💡 ms: 延迟时间，支持响应式（Ref 或 getter）
  // 💡 options: 可选配置（maxWait、rejectOnCancel）

  let timer: ReturnType<typeof setTimeout> | undefined
  // 💡 防抖定时器 ID
  // 💡 每次触发时清除上一个，重新计时

  let maxTimer: ReturnType<typeof setTimeout> | undefined | null
  // 💡 最大等待定时器 ID
  // 💡 用于 maxWait 功能：即使持续触发，超过 maxWait 也会执行

  let lastRejector: AnyFn = noop
  // 💡 上一次 Promise 的 reject/resolve 函数
  // 💡 用于在取消时处理上一个等待中的 Promise

  const _clearTimeout = (timer: ReturnType<typeof setTimeout>) => {
    clearTimeout(timer)
    lastRejector()
    lastRejector = noop
  }
  // 💡 清除定时器并处理上一个 Promise
  // 💡 lastRejector 要么是 reject（rejectOnCancel=true），要么是 resolve（默认）

  let lastInvoker: () => void
  // 💡 保存最后一次的 invoke 函数
  // 💡 用于 maxTimer 到期时执行最新的回调

  const filter: EventFilter = (invoke) => {
    const duration = toValue(ms)
    // 💡 toValue 解包 Ref 或调用 getter，获取实际延迟时间

    const maxDuration = toValue(options.maxWait)
    // 💡 获取最大等待时间

    if (timer)
      _clearTimeout(timer)
    // ⭐ 防抖核心：清除上一个定时器，重新计时

    // 💡 快速路径：如果延迟时间 <= 0，直接执行
    if (duration <= 0 || (maxDuration !== undefined && maxDuration <= 0)) {
      if (maxTimer) {
        _clearTimeout(maxTimer)
        maxTimer = null
      }
      return Promise.resolve(invoke())
    }

    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve
      // 💡 根据配置决定取消时是 reject 还是 resolve
      // 💡 默认 resolve：取消时不报错，只是不执行

      lastInvoker = invoke
      // 💡 保存最新的 invoke，用于 maxTimer 到期时执行

      // ⭐ maxTimer：最大等待时间定时器
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer)
          maxTimer = null
          resolve(lastInvoker())
          // 💡 maxTimer 到期时，执行最新的回调
          // 💡 确保不会无限延迟
        }, maxDuration)
      }

      // ⭐ timer：常规防抖定时器
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer)
        maxTimer = null
        resolve(invoke())
        // 💡 延迟到期后执行回调
      }, duration)
    })
  }

  return filter
}
```

**防抖流程图：**

```
触发 1 → [timer 1: 200ms] → 清除 timer 1
触发 2 → [timer 2: 200ms] → 清除 timer 2
触发 3 → [timer 3: 200ms]
                ↓ 200ms 后
          执行 invoke()

如果有 maxWait = 500ms：
触发 1 → [timer 1: 200ms] + [maxTimer: 500ms]
触发 2 → 清除 timer 1，[timer 2: 200ms]（maxTimer 继续）
触发 3 → 清除 timer 2，[timer 3: 200ms]（maxTimer 继续）
      ↓ maxTimer 500ms 到期
  强制执行 lastInvoker()（即使还在触发中）
```

### 第五部分：throttleFilter（⭐ 节流过滤器）

```ts
export interface ThrottleFilterOptions {
  delay: MaybeRefOrGetter<number>
  trailing?: boolean   // 💡 是否在尾部执行
  leading?: boolean    // 💡 是否在头部执行
  rejectOnCancel?: boolean
}

// ⭐ 函数重载：支持两种调用方式
export function throttleFilter(ms: MaybeRefOrGetter<number>, trailing?: boolean, leading?: boolean, rejectOnCancel?: boolean): EventFilter
export function throttleFilter(options: ThrottleFilterOptions): EventFilter
export function throttleFilter(...args: any[]) {
  // 💡 运行时根据第一个参数类型判断使用哪种调用方式

  let lastExec = 0
  // 💡 上次执行的时间戳
  // 💡 用于计算距离上次执行的时间间隔

  let timer: ReturnType<typeof setTimeout> | undefined
  // 💡 尾部执行的定时器

  let isLeading = true
  // 💡 是否是"首次"触发
  // 💡 用于控制 leading 行为

  let lastRejector: AnyFn = noop
  let lastValue: any
  // 💡 缓存最近一次的返回值

  let ms: MaybeRefOrGetter<number>
  let trailing: boolean
  let leading: boolean
  let rejectOnCancel: boolean

  // ⭐ 参数解析：支持对象参数和位置参数
  if (!isRef(args[0]) && typeof args[0] === 'object')
    ({ delay: ms, trailing = true, leading = true, rejectOnCancel = false } = args[0])
  else
    [ms, trailing = true, leading = true, rejectOnCancel = false] = args
  // 💡 如果第一个参数是对象 → 使用对象解构
  // 💡 否则 → 使用位置参数解构
  // 💡 默认值：trailing=true, leading=true, rejectOnCancel=false

  const clear = () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
      lastRejector()
      lastRejector = noop
    }
  }
  // 💡 清除尾部定时器

  const filter: EventFilter = (_invoke) => {
    const duration = toValue(ms)
    // 💡 获取实际延迟时间

    const elapsed = Date.now() - lastExec
    // 💡 计算距离上次执行的时间

    const invoke = () => {
      return lastValue = _invoke()
    }
    // 💡 包装 invoke，同时缓存返回值

    clear()
    // 💡 清除之前的尾部定时器

    if (duration <= 0) {
      lastExec = Date.now()
      return invoke()
    }
    // 💡 快速路径：延迟 <= 0，直接执行

    // ⭐ 核心逻辑：leading 执行
    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now()
      invoke()
    }
    // 💡 如果距离上次执行已超过 duration → 立即执行（leading）
    // 💡 `leading || !isLeading` 的含义：
    //    - leading=true → 总是可以立即执行
    //    - leading=false 且 isLeading=true → 不执行（首次触发不执行）
    //    - leading=false 且 isLeading=false → 可以执行（非首次）

    // ⭐ 核心逻辑：trailing 执行
    else if (trailing) {
      lastValue = new Promise((resolve, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve
        timer = setTimeout(() => {
          lastExec = Date.now()
          isLeading = true
          resolve(invoke())
          clear()
        }, Math.max(0, duration - elapsed))
        // 💡 等待剩余时间后执行
        // 💡 Math.max(0, duration - elapsed) 确保不会是负数
      })
    }
    // 💡 如果距离上次执行不足 duration → 等待后执行（trailing）

    // 💡 处理 leading=false 的情况：需要在 duration 后重置 isLeading
    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration)

    isLeading = false
    // 💡 标记为非首次

    return lastValue
    // 💡 返回缓存的值或 Promise
  }

  return filter
}
```

**节流流程图：**

```
leading=true, trailing=true（默认）：
触发 1 → 立即执行 → [冷却期 duration]
触发 2 → 冷却中，设 trailing 定时器
触发 3 → 冷却中，更新 trailing 定时器
      ↓ duration 到期
  执行 trailing（最新的回调）

leading=true, trailing=false：
触发 1 → 立即执行 → [冷却期 duration]
触发 2 → 冷却中，忽略
触发 3 → 冷却中，忽略
      ↓ duration 到期
  不执行

leading=false, trailing=true：
触发 1 → 不执行（首次） → [冷却期 duration]
触发 2 → 冷却中，设 trailing 定时器
触发 3 → 冷却中，更新 trailing 定时器
      ↓ duration 到期
  执行 trailing（最新的回调）
```

### 第六部分：pausableFilter（⭐ 可暂停过滤器）

```ts
export interface PausableFilterOptions {
  initialState?: 'active' | 'paused'
  // 💡 初始状态：默认 'active'（活跃）
}

/**
 * EventFilter that gives extra controls to pause and resume the filter
 *
 * @param extendFilter  Extra filter to apply when the PausableFilter is active, default to none
 * @param options Options to configure the filter
 */
export function pausableFilter(
  extendFilter: EventFilter = bypassFilter,
  options: PausableFilterOptions = {}
): Pausable & { eventFilter: EventFilter } {
  // ⭐ 参数说明：
  //    extendFilter: 内部使用的过滤器，默认是 bypassFilter（透传）
  //    你可以传入 debounceFilter 或 throttleFilter 作为内部过滤器
  //    pausableFilter 只是在外面加了一层"暂停/恢复"控制

  const {
    initialState = 'active',
  } = options

  const isActive = toRef(initialState === 'active')
  // 💡 响应式的活跃状态
  // 💡 toRef(true) → Ref<boolean>
  // 💡 不用 ref(true) 是因为 toRef 可以接受一个 getter

  function pause() {
    isActive.value = false
  }
  // 💡 暂停：设置 isActive 为 false

  function resume() {
    isActive.value = true
  }
  // 💡 恢复：设置 isActive 为 true

  const eventFilter: EventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args)
    // ⭐ 核心逻辑：只有在活跃状态下才调用内部过滤器
    // 💡 暂停时什么都不做，回调不会被执行
  }

  return { isActive: readonly(isActive), pause, resume, eventFilter }
  // 💡 返回 Pausable 接口 + eventFilter
  // 💡 isActive 是只读的，防止外部直接修改
  // 💡 eventFilter 可以传给 watchWithFilter 或 createFilterWrapper
}
```

**pausableFilter 组合模式：**

```
pausableFilter()                     → 可暂停的透传
pausableFilter(debounceFilter(200))  → 可暂停的防抖
pausableFilter(throttleFilter(200))  → 可暂停的节流

┌─────────────────────────────────────┐
│         pausableFilter              │
│  ┌─────────────────────────────┐   │
│  │  isActive? → extendFilter   │   │
│  │  pause()   → isActive=false │   │
│  │  resume()  → isActive=true  │   │
│  └─────────────────────────────┘   │
│              ↓                      │
│  ┌─────────────────────────────┐   │
│  │  extendFilter               │   │
│  │  (bypassFilter / debounce   │   │
│  │   / throttle)               │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## 设计模式总结

| 模式 | 体现 | 说明 |
|------|------|------|
| 策略模式 | EventFilter 类型 | 通过替换过滤器改变执行策略 |
| 高阶函数 | createFilterWrapper | 接受函数，返回新函数 |
| 装饰器模式 | debounceFilter/throttleFilter | 在不修改原函数的情况下增加行为 |
| 组合模式 | pausableFilter(extendFilter) | 组合多个过滤器 |

---

## 笔记

```
在此记录你的学习笔记...

```
