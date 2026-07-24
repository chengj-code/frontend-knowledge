# useDebounceFn 源码详细注释

> 装饰器模式的典型实现：用 debounceFilter 包装普通函数

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/useDebounceFn/index.ts` |
| 代码行数 | 26 行 |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `createFilterWrapper`、`debounceFilter` |
| 设计模式 | 装饰器模式 |
| 核心知识点 | EventFilter 组合、PromisifyFn |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { MaybeRefOrGetter } from 'vue'
// 💡 MaybeRefOrGetter<T> = T | Ref<T> | (() => T)
// 💡 支持响应式的延迟时间

import type { DebounceFilterOptions, FunctionArgs, PromisifyFn } from '../utils'
// 💡 DebounceFilterOptions → 防抖选项（maxWait、rejectOnCancel）
// 💡 FunctionArgs → 函数类型约束
// 💡 PromisifyFn<T> → 将函数返回值包装为 Promise

// ============================================================
// 第二部分：工具导入
// ============================================================

import { createFilterWrapper, debounceFilter } from '../utils'
// 💡 createFilterWrapper → 将 EventFilter 应用到普通函数
// 💡 debounceFilter → 创建防抖过滤器

// ============================================================
// 第三部分：返回类型定义
// ============================================================

export type UseDebounceFnReturn<T extends FunctionArgs> = PromisifyFn<T>
// 💡 返回类型是 PromisifyFn<T>
// 💡 即：(...args) => Promise<ReturnType<T>>
// 💡 为什么返回 Promise？
//    因为 createFilterWrapper 总是返回 Promise
//    即使原函数是同步的，包装后也会返回 Promise

// ============================================================
// 第四部分：函数实现（⭐ 装饰器模式）
// ============================================================

/**
 * Debounce execution of a function.
 *
 * @see https://vueuse.org/useDebounceFn
 * @param  fn          A function to be executed after delay milliseconds debounced.
 * @param  ms          A zero-or-greater delay in milliseconds.
 * @param  options     Options
 *
 * @return A new, debounce, function.
 */
export function useDebounceFn<T extends FunctionArgs>(
  fn: T,
  ms: MaybeRefOrGetter<number> = 200,
  options: DebounceFilterOptions = {},
): UseDebounceFnReturn<T> {
  return createFilterWrapper(
    debounceFilter(ms, options),
    // ⭐ 核心：创建防抖过滤器
    // 💡 debounceFilter(ms, options) 返回一个 EventFilter
    // 💡 这个 EventFilter 会在延迟 ms 毫秒后执行 invoke
    fn,
    // ⭐ 原函数
    // 💡 createFilterWrapper 会用 debounceFilter 包装 fn
    // 💡 返回的新函数调用时，会先经过防抖过滤器
  )
}
```

---

## 装饰器模式解析

```
useDebounceFn 的本质就是：

  原函数 fn
    ↓ 被 debounceFilter 包装
  createFilterWrapper(debounceFilter(ms), fn)
    ↓ 返回
  新函数 wrapper（调用时会防抖）

调用链：
  wrapper(args)
    → debounceFilter(invoke, options)
      → 延迟 ms 毫秒后
    → invoke() = fn(args)
      → 执行原函数
```

**装饰器模式的核心思想：** 在不修改原函数的情况下，增加"防抖"行为。

---

## 使用示例

### 基本用法

```ts
import { useDebounceFn } from '@vueuse/shared'

const debouncedSearch = useDebounceFn((query: string) => {
  fetch(`/api/search?q=${query}`)
}, 300)

// 快速输入时，只有最后一次调用后 300ms 才会执行
input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value)
})
```

### 带 maxWait

```ts
const debouncedSave = useDebounceFn(save, 500, {
  maxWait: 2000,  // 最多等 2 秒
})
```

### 响应式延迟

```ts
const delay = ref(200)
const debouncedFn = useDebounceFn(callback, delay)
// 修改 delay.value 会自动使用新的延迟时间
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `debounceFilter` | 依赖 | 底层防抖过滤器 |
| `createFilterWrapper` | 依赖 | 过滤器包装桥梁 |
| `useThrottleFn` | 同级 | 类似的节流版本 |
| `refDebounced` | 被依赖 | 组合 useDebounceFn 实现 |

---

## 笔记

```
在此记录你的学习笔记...

```
