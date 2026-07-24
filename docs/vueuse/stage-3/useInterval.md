# useInterval 源码详细注释

> 简化的 setInterval 封装，展示门面模式和条件返回类型

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/useInterval/index.ts` |
| 代码行数 | 75 行 |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `useIntervalFn`、`shallowRef`、`shallowReadonly` |
| 设计模式 | 门面模式 |
| 核心知识点 | 条件返回类型、函数重载、ShallowRef |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { MaybeRefOrGetter, ShallowRef } from 'vue'
// 💡 MaybeRefOrGetter<T> = T | Ref<T> | (() => T)
// 💡 ShallowRef<T> → 浅层响应式引用

import type { Pausable } from '../utils'
// 💡 Pausable 接口：
//    - isActive: Readonly<ShallowRef<boolean>>
//    - pause: () => void
//    - resume: () => void

// ============================================================
// 第二部分：Vue API 和工具导入
// ============================================================

import { shallowReadonly, shallowRef } from 'vue'
// 💡 shallowReadonly → 创建浅层只读代理
// 💡 shallowRef → 创建浅层响应式引用

import { useIntervalFn } from '../useIntervalFn'
// 💡 useIntervalFn → 底层的 setInterval 封装

// ============================================================
// 第三部分：选项接口定义
// ============================================================

export interface UseIntervalOptions<Controls extends boolean> {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls
  // 💡 是否暴露更多控制选项
  // 💡 默认为 false，只返回 counter
  // 💡 设为 true 时，返回 { counter, reset, ...controls }

  /**
   * Execute the update immediately on calling
   *
   * @default true
   */
  immediate?: boolean
  // 💡 是否立即启动定时器
  // 💡 默认为 true

  /**
   * Callback on every interval
   */
  callback?: (count: number) => void
  // 💡 每次 interval 触发时的回调
  // 💡 接收当前计数作为参数
}

// ============================================================
// 第四部分：返回类型定义
// ============================================================

export interface UseIntervalControls {
  counter: ShallowRef<number>
  // 💡 计数器，每次 interval 触发时递增

  reset: () => void
  // 💡 重置计数器为 0
}

export type UseIntervalReturn = Readonly<ShallowRef<number>> | Readonly<UseIntervalControls & Pausable>
// 💡 返回类型是联合类型：
//    - controls=false → Readonly<ShallowRef<number>>（只返回 counter）
//    - controls=true  → Readonly<UseIntervalControls & Pausable>（返回 counter + reset + 控制函数）

// ============================================================
// 第五部分：函数重载签名（⭐ 核心知识点）
// ============================================================

// ⭐ 重载签名 1：controls=false 时，只返回 counter
export function useInterval(interval?: MaybeRefOrGetter<number>, options?: UseIntervalOptions<false>): Readonly<ShallowRef<number>>

// ⭐ 重载签名 2：controls=true 时，返回 { counter, reset, ...controls }
export function useInterval(interval: MaybeRefOrGetter<number>, options: UseIntervalOptions<true>): Readonly<UseIntervalControls & Pausable>

// 💡 泛型参数 Controls 用于区分两种返回类型
// 💡 TypeScript 会根据 options.controls 的类型匹配重载

// ============================================================
// 第六部分：函数实现
// ============================================================

/**
 * Reactive counter increases on every interval
 *
 * @see https://vueuse.org/useInterval
 * @param interval 间隔时间（毫秒），支持响应式
 * @param options 配置选项
 */
export function useInterval(interval: MaybeRefOrGetter<number> = 1000, options: UseIntervalOptions<boolean> = {}): UseIntervalReturn {
  // ⭐ 解构选项，设置默认值
  const {
    controls: exposeControls = false,
    immediate = true,
    callback,
  } = options

  // ⭐ 创建响应式状态
  const counter = shallowRef(0)
  // 💡 计数器，每次 interval 触发时递增

  // ⭐ 更新计数器的函数
  const update = () => counter.value += 1
  // 💡 递增计数器

  // ⭐ 重置计数器的函数
  const reset = () => {
    counter.value = 0
  }
  // 💡 重置计数器为 0

  // ⭐ 使用 useIntervalFn 作为底层实现
  const controls = useIntervalFn(
    callback
      ? () => {
          update()
          callback(counter.value)
        }
      : update,
    interval,
    { immediate },
  )
  // 💡 如果有 callback，先更新计数器，再调用 callback
  // 💡 如果没有 callback，只更新计数器
  // 💡 传递 immediate 选项

  // ⭐ 根据 exposeControls 返回不同的结果
  if (exposeControls) {
    return {
      counter: shallowReadonly(counter),
      reset,
      ...controls,
    }
    // 💡 返回 { counter, reset, isActive, pause, resume }
  }
  else {
    return shallowReadonly(counter)
    // 💡 只返回 counter（只读）
  }
}
```

---

## 设计模式解析

### 门面模式

```ts
// 门面模式：简化 useIntervalFn 的接口
const counter = useInterval(1000)

// vs

// useIntervalFn 的完整接口
const { isActive, pause, resume } = useIntervalFn(() => {
  counter.value += 1
}, 1000)
```

**门面模式的核心思想：** 提供一个简化的接口，隐藏底层复杂的实现细节。

### 条件返回类型

```ts
// 重载签名
export function useInterval(interval?, options?: UseIntervalOptions<false>): Readonly<ShallowRef<number>>
export function useInterval(interval, options: UseIntervalOptions<true>): Readonly<UseIntervalControls & Pausable>

// 实现
if (exposeControls)
  return { counter: shallowReadonly(counter), reset, ...controls }
else
  return shallowReadonly(counter)
```

**条件返回类型的作用：**
- 根据 `options.controls` 的值返回不同的类型
- TypeScript 会自动推导返回值的类型
- 这是函数重载的高级用法

---

## useIntervalFn 与 useInterval 的对比

| 特性 | useIntervalFn | useInterval |
|------|--------------|-------------|
| 返回值 | `{ isActive, pause, resume }` | `counter` 或 `{ counter, ... }` |
| 状态语义 | `isActive`（是否活跃） | `counter`（计数器） |
| 回调参数 | 必须传回调 | 可选回调 |
| 使用场景 | 需要控制定时器 | 只需要计数器 |

---

## 使用示例

### 基本用法

```ts
import { useInterval } from '@vueuse/shared'

const counter = useInterval(1000)

console.log(counter.value) // 0
// 1 秒后
console.log(counter.value) // 1
// 2 秒后
console.log(counter.value) // 2
```

### 带回调

```ts
const counter = useInterval(1000, {
  callback: (count) => console.log(`count: ${count}`),
})
```

### 暴露控制选项

```ts
const { counter, reset, pause, resume, isActive } = useInterval(1000, {
  controls: true,
})

// 手动暂停
pause()

// 手动恢复
resume()

// 重置计数器
reset()

// 检查状态
console.log(counter.value)   // 当前计数
console.log(isActive.value)  // 是否活跃
```

### 响应式间隔

```ts
const delay = ref(1000)
const counter = useInterval(delay)

// 修改间隔时间
delay.value = 2000
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useIntervalFn` | 依赖 | 底层实现 |
| `useTimeout` | 同级 | 类似的 setTimeout 封装 |
| `shallowRef` | 依赖 | 创建响应式状态 |
| `shallowReadonly` | 依赖 | 创建只读代理 |

---

## 练习

1. 阅读源码，理解条件返回类型的重载设计
2. 理解 `update` 和 `reset` 函数的作用
3. 思考：为什么用 `shallowReadonly` 包装 counter？
4. 练习：实现一个简单的 `useInterval`

---

## 笔记

```
在此记录你的学习笔记...

```
