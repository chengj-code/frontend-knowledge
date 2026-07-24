# useTimeout 源码详细注释

> 简化的 setTimeout 封装，展示门面模式和条件返回类型

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/useTimeout/index.ts` |
| 代码行数 | 55 行 |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `useTimeoutFn`、`computed`、`noop` |
| 设计模式 | 门面模式 |
| 核心知识点 | 条件返回类型、函数重载、ComputedRef |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { ComputedRef, MaybeRefOrGetter } from 'vue'
// 💡 ComputedRef<T> → 只读的计算引用类型
// 💡 MaybeRefOrGetter<T> → T | Ref<T> | (() => T)

import type { UseTimeoutFnOptions } from '../useTimeoutFn'
// 💡 继承 useTimeoutFn 的选项接口

import type { Fn, Stoppable } from '../utils'
// 💡 Fn = () => void
// 💡 Stoppable 接口

// ============================================================
// 第二部分：Vue API 和工具导入
// ============================================================

import { computed } from 'vue'
// 💡 computed → 创建计算属性

import { useTimeoutFn } from '../useTimeoutFn'
// 💡 useTimeoutFn → 底层的 setTimeout 封装

import { noop } from '../utils'
// 💡 noop → 空函数，() => {}

// ============================================================
// 第三部分：选项接口定义
// ============================================================

export interface UseTimeoutOptions<Controls extends boolean> extends UseTimeoutFnOptions {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls
  // 💡 是否暴露更多控制选项
  // 💡 默认为 false，只返回 ready 计算属性
  // 💡 设为 true 时，返回 { ready, ...controls }

  /**
   * Callback on timeout
   */
  callback?: Fn
  // 💡 超时后的回调函数
  // 💡 可选，如果不传则使用 noop
}

// ============================================================
// 第四部分：返回类型定义
// ============================================================

export type UseTimoutReturn = ComputedRef<boolean> | { readonly ready: ComputedRef<boolean> } & Stoppable
// 💡 返回类型是联合类型：
//    - controls=false → ComputedRef<boolean>（只返回 ready）
//    - controls=true  → { ready: ComputedRef<boolean> } & Stoppable（返回 ready + 控制函数）

// ============================================================
// 第五部分：函数重载签名（⭐ 核心知识点）
// ============================================================

// ⭐ 重载签名 1：controls=false 时，只返回 ready
export function useTimeout(interval?: MaybeRefOrGetter<number>, options?: UseTimeoutOptions<false>): ComputedRef<boolean>

// ⭐ 重载签名 2：controls=true 时，返回 { ready, ...controls }
export function useTimeout(interval: MaybeRefOrGetter<number>, options: UseTimeoutOptions<true>): { ready: ComputedRef<boolean> } & Stoppable

// 💡 泛型参数 Controls 用于区分两种返回类型
// 💡 TypeScript 会根据 options.controls 的类型匹配重载

// ============================================================
// 第六部分：函数实现
// ============================================================

/**
 * Update value after a given time with controls.
 *
 * @see   {@link https://vueuse.org/useTimeout}
 * @param interval 超时时间（毫秒），支持响应式
 * @param options 配置选项
 */
export function useTimeout(interval: MaybeRefOrGetter<number> = 1000, options: UseTimeoutOptions<boolean> = {}): UseTimoutReturn {
  // ⭐ 解构选项，设置默认值
  const {
    controls: exposeControls = false,
    callback,
  } = options

  // ⭐ 使用 useTimeoutFn 作为底层实现
  const controls = useTimeoutFn(
    callback ?? noop,
    interval,
    options,
  )
  // 💡 如果没有 callback，使用 noop（空函数）
  // 💡 传递 options 给 useTimeoutFn（包含 immediate 等选项）

  // ⭐ 创建 ready 计算属性
  const ready = computed(() => !controls.isPending.value)
  // 💡 当 isPending 为 false 时，ready 为 true
  // 💡 这是一个反向关系：等待中 → 未就绪，已完成 → 就绪

  // ⭐ 根据 exposeControls 返回不同的结果
  if (exposeControls) {
    return {
      ready,
      ...controls,
    }
    // 💡 返回 { ready, isPending, start, stop }
  }
  else {
    return ready
    // 💡 只返回 ready
  }
}
```

---

## 设计模式解析

### 门面模式

```ts
// 门面模式：简化 useTimeoutFn 的接口
const ready = useTimeout(1000)

// vs

// useTimeoutFn 的完整接口
const { isPending, start, stop } = useTimeoutFn(callback, 1000)
const ready = computed(() => !isPending.value)
```

**门面模式的核心思想：** 提供一个简化的接口，隐藏底层复杂的实现细节。

### 条件返回类型

```ts
// 重载签名
export function useTimeout(interval?, options?: UseTimeoutOptions<false>): ComputedRef<boolean>
export function useTimeout(interval, options: UseTimeoutOptions<true>): { ready: ComputedRef<boolean> } & Stoppable

// 实现
if (exposeControls)
  return { ready, ...controls }
else
  return ready
```

**条件返回类型的作用：**
- 根据 `options.controls` 的值返回不同的类型
- TypeScript 会自动推导返回值的类型
- 这是函数重载的高级用法

---

## useTimeoutFn 与 useTimeout 的对比

| 特性 | useTimeoutFn | useTimeout |
|------|-------------|------------|
| 返回值 | `{ isPending, start, stop }` | `ready` 或 `{ ready, ... }` |
| 状态语义 | `isPending`（等待中） | `ready`（就绪） |
| 回调参数 | 必须传回调 | 可选回调 |
| 使用场景 | 需要控制定时器 | 只需要知道是否完成 |

---

## 使用示例

### 基本用法

```ts
import { useTimeout } from '@vueuse/shared'

const ready = useTimeout(1000)

console.log(ready.value) // false（等待中）
// 1 秒后
console.log(ready.value) // true（就绪）
```

### 带回调

```ts
const ready = useTimeout(1000, {
  callback: () => console.log('done'),
})
```

### 暴露控制选项

```ts
const { ready, start, stop, isPending } = useTimeout(1000, {
  controls: true,
})

// 手动启动
start()

// 手动停止
stop()

// 检查状态
console.log(ready.value)      // true/false
console.log(isPending.value)  // true/false
```

### 响应式超时时间

```ts
const delay = ref(1000)
const ready = useTimeout(delay)

// 修改超时时间
delay.value = 2000
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useTimeoutFn` | 依赖 | 底层实现 |
| `useInterval` | 同级 | 类似的 setInterval 封装 |
| `computed` | 依赖 | 创建 ready 计算属性 |

---

## 练习

1. 阅读源码，理解条件返回类型的重载设计
2. 理解 `ready` 和 `isPending` 的反向关系
3. 思考：为什么用 `callback ?? noop` 而不是 `callback || noop`？
4. 练习：实现一个简单的 `useTimeout`

---

## 笔记

```
在此记录你的学习笔记...

```
