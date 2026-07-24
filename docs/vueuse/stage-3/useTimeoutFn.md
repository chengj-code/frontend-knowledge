# useTimeoutFn 源码详细注释

> 带控制功能的 setTimeout 封装，是 Stoppable 接口的典型实现

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/useTimeoutFn/index.ts` |
| 代码行数 | 83 行 |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `shallowRef`、`shallowReadonly`、`toValue`、`tryOnScopeDispose` |
| 设计模式 | 命令模式、守卫模式 |
| 核心知识点 | Stoppable 接口、SSR 检测、生命周期清理 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { MaybeRefOrGetter } from 'vue'
// 💡 MaybeRefOrGetter<T> = T | Ref<T> | (() => T)
// 💡 比 MaybeRef 多了 getter 函数支持

import type { AnyFn, Stoppable } from '../utils'
// 💡 AnyFn = (...args: any[]) => any
// 💡 Stoppable 接口：
//    - isPending: Readonly<ShallowRef<boolean>>
//    - start: (...args: any[]) => void
//    - stop: () => void

// ============================================================
// 第二部分：Vue API 和工具导入
// ============================================================

import { shallowReadonly, shallowRef, toValue } from 'vue'
// 💡 shallowReadonly → 创建浅层只读代理
// 💡 shallowRef → 创建浅层响应式引用
// 💡 toValue → 解包 Ref 或调用 getter

import { tryOnScopeDispose } from '../tryOnScopeDispose'
// 💡 安全的 onScopeDispose

import { isClient } from '../utils'
// 💡 SSR 环境检测

// ============================================================
// 第三部分：选项接口定义
// ============================================================

export interface UseTimeoutFnOptions {
  /**
   * Start the timer immediately
   *
   * @default true
   */
  immediate?: boolean
  // 💡 是否立即启动定时器
  // 💡 默认为 true，创建时就开始计时

  /**
   * Execute the callback immediately after calling `start`
   *
   * @default false
   */
  immediateCallback?: boolean
  // 💡 调用 start() 时是否立即执行回调
  // 💡 默认为 false，等待 interval 时间后才执行
}

// ============================================================
// 第四部分：返回类型定义
// ============================================================

export type UseTimeoutFnReturn<CallbackFn extends AnyFn> = Stoppable<Parameters<CallbackFn> | []>
// 💡 返回类型是 Stoppable 接口的扩展
// 💡 Stoppable<Args> = {
//   isPending: Readonly<ShallowRef<boolean>>
//   start: (...args: Args) => void
//   stop: () => void
// }
// 💡 Parameters<CallbackFn> | [] 表示 start() 可以接受回调函数的参数，或不传参数

// ============================================================
// 第五部分：函数实现（⭐ 核心）
// ============================================================

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @param cb 回调函数
 * @param interval 延迟时间（毫秒），支持响应式
 * @param options 配置选项
 */
export function useTimeoutFn<CallbackFn extends AnyFn>(
  cb: CallbackFn,
  interval: MaybeRefOrGetter<number>,
  options: UseTimeoutFnOptions = {},
): UseTimeoutFnReturn<CallbackFn> {
  // ⭐ 解构选项，设置默认值
  const {
    immediate = true,
    immediateCallback = false,
  } = options

  // ⭐ 创建响应式状态
  const isPending = shallowRef(false)
  // 💡 表示定时器是否正在等待执行
  // 💡 用于 UI 显示加载状态或禁用按钮

  let timer: ReturnType<typeof setTimeout> | null = null
  // 💡 定时器 ID，用于清除定时器
  // 💡 `let` 而非 `const`，因为需要重新赋值
  // 💡 初始值为 null，表示没有活跃的定时器

  // ⭐ 清除定时器的内部函数
  function clear() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  // ⭐ 停止定时器
  function stop() {
    isPending.value = false
    clear()
  }
  // 💡 停止定时器并重置 isPending 状态

  // ⭐ 启动定时器
  function start(...args: Parameters<CallbackFn> | []) {
    if (immediateCallback)
      cb()
    // 💡 如果 immediateCallback 为 true，立即执行回调

    clear()
    // 💡 清除之前的定时器，防止重复

    isPending.value = true
    // 💡 标记为等待状态

    timer = setTimeout(() => {
      isPending.value = false
      timer = null
      cb(...args)
      // 💡 延迟后执行回调
      // 💡 重置状态
    }, toValue(interval))
    // 💡 toValue(interval) 解包 Ref 或调用 getter
    // 💡 支持响应式的延迟时间
  }

  // ⭐ 初始化逻辑
  if (immediate) {
    isPending.value = true
    if (isClient)
      start()
    // 💡 SSR 安全：只在客户端启动定时器
    // 💡 服务端渲染时，定时器不会启动
  }

  // ⭐ 注册清理函数
  tryOnScopeDispose(stop)
  // 💡 当组件卸载或 scope 销毁时，自动清除定时器
  // 💡 防止内存泄漏

  // ⭐ 返回控制接口
  return {
    isPending: shallowReadonly(isPending),
    start,
    stop,
  }
  // 💡 isPending 是只读的，外部不能直接修改
  // 💡 start 和 stop 是控制函数
}
```

---

## 设计模式解析

### 命令模式

```ts
// 命令模式：将操作封装为对象
const { start, stop, isPending } = useTimeoutFn(callback, 1000)

// 执行命令
start()

// 撤销命令
stop()

// 查询状态
console.log(isPending.value)
```

**命令模式的核心思想：** 将请求封装为对象，从而支持：
- 参数化命令（start 可以传参数）
- 排队命令（可以多次调用 start）
- 撤销命令（stop）

### Stoppable 接口

```ts
interface Stoppable<Args extends any[] = any[]> {
  readonly isPending: Readonly<ShallowRef<boolean>>
  start: (...args: Args) => void
  stop: () => void
}
```

**Stoppable 的设计：**
- `isPending`：只读的响应式状态，用于 UI 显示
- `start`：启动命令，可以传参数
- `stop`：停止命令

---

## SSR 兼容设计

```ts
if (immediate) {
  isPending.value = true
  if (isClient)
    start()
}
```

**为什么需要 `isClient` 检查？**
- `setTimeout` 是浏览器 API，Node.js 中不可用
- SSR 时如果调用 `setTimeout`，会报错
- 所以只在客户端启动定时器

---

## 生命周期清理

```ts
tryOnScopeDispose(stop)
```

**清理逻辑：**
1. 组件卸载时 → `onScopeDispose` 触发 → `stop()` 被调用
2. `stop()` 会：
   - 设置 `isPending.value = false`
   - 调用 `clearTimeout(timer)` 清除定时器
   - 设置 `timer = null`

**防止内存泄漏：**
- 如果不清理，定时器回调会在组件卸载后执行
- 回调可能访问已销毁的组件实例，导致错误
- 定时器本身也会阻止垃圾回收

---

## 使用示例

### 基本用法

```ts
const { isPending, start, stop } = useTimeoutFn(() => {
  console.log('executed')
}, 1000)

// 默认立即启动
// 1 秒后输出 "executed"

console.log(isPending.value) // true（等待中）
```

### 延迟启动

```ts
const { start, stop } = useTimeoutFn(callback, 1000, {
  immediate: false,
})

// 手动启动
start()

// 手动停止
stop()
```

### 立即执行回调

```ts
const { start } = useTimeoutFn(callback, 1000, {
  immediateCallback: true,
})

// 调用 start() 时立即执行 callback
// 1 秒后再次执行 callback
start()
```

### 响应式延迟

```ts
const delay = ref(1000)
const { start } = useTimeoutFn(callback, delay)

// 修改延迟时间
delay.value = 2000
start()  // 使用新的延迟时间
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useTimeout` | 依赖 useTimeoutFn | 门面模式封装 |
| `useIntervalFn` | 同级 | 类似的 setInterval 封装 |
| `tryOnScopeDispose` | 被依赖 | 生命周期清理 |
| `isClient` | 被依赖 | SSR 检测 |

---

## 练习

1. 阅读源码，理解 `Stoppable` 接口的设计
2. 理解 `isClient` 检查的 SSR 兼容作用
3. 思考：为什么用 `shallowRef` 而不是 `ref`？
4. 练习：实现一个简单的 `useTimeoutFn`

---

## 笔记

```
在此记录你的学习笔记...

```
