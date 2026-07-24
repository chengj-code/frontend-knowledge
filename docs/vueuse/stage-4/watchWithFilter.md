# watchWithFilter 源码详细注释

> 将 EventFilter 应用到 Vue watch 的桥梁，是所有增强版 watch 的基础

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/watchWithFilter/index.ts` |
| 代码行数 | 32 行 |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `watch`、`createFilterWrapper`、`bypassFilter` |
| 设计模式 | 装饰器模式、函数重载 |
| 核心知识点 | EventFilter + watch 组合、函数重载签名 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { WatchCallback, WatchOptions, WatchSource, WatchStopHandle } from 'vue'
// 💡 Vue watch 的类型定义
// 💡 WatchCallback → watch 的回调函数类型
// 💡 WatchOptions → watch 的配置选项
// 💡 WatchSource → watch 的监听源
// 💡 WatchStopHandle → watch 返回的停止函数

import type { ConfigurableEventFilter, MapOldSources, MapSources } from '../utils'
// 💡 ConfigurableEventFilter → 可配置事件过滤器接口
// 💡 MapSources<T> → 将 WatchSource 数组映射为值类型
// 💡 MapOldSources<T, Immediate> → 将 WatchSource 数组映射为旧值类型

// ============================================================
// 第二部分：Vue API 和工具导入
// ============================================================

import { watch } from 'vue'
import { bypassFilter, createFilterWrapper } from '../utils'

// ============================================================
// 第三部分：选项接口定义
// ============================================================

export interface WatchWithFilterOptions<Immediate> extends WatchOptions<Immediate>, ConfigurableEventFilter {}
// 💡 继承 Vue 的 WatchOptions + VueUse 的 ConfigurableEventFilter
// 💡 这样用户可以同时配置 watch 选项和事件过滤器

// ============================================================
// 第四部分：函数重载签名（⭐ 与 Vue watch 完全一致的重载）
// ============================================================

// 重载 1：监听多个源
export function watchWithFilter<T extends Readonly<WatchSource<unknown>[]>, Immediate extends Readonly<boolean> = false>(
  sources: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: WatchWithFilterOptions<Immediate>
): WatchStopHandle

// 重载 2：监听单个 Ref 或 getter
export function watchWithFilter<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchWithFilterOptions<Immediate>
): WatchStopHandle

// 重载 3：监听响应式对象
export function watchWithFilter<T extends object, Immediate extends Readonly<boolean> = false>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchWithFilterOptions<Immediate>
): WatchStopHandle

// 💡 这些重载签名与 Vue 的 watch 完全一致
// 💡 目的：让 watchWithFilter 可以作为 watch 的直接替代品

// ============================================================
// 第五部分：函数实现（⭐ 核心）
// ============================================================

// implementation
export function watchWithFilter<Immediate extends Readonly<boolean> = false>(
  source: any,
  cb: any,
  options: WatchWithFilterOptions<Immediate> = {},
): WatchStopHandle {
  const {
    eventFilter = bypassFilter,
    // 💡 默认使用 bypassFilter（透传，不做过滤）
    ...watchOptions
    // 💡 剩余的选项传递给 Vue 的 watch
  } = options

  return watch(
    source,
    createFilterWrapper(
      eventFilter,
      cb,
    ),
    // ⭐ 核心：用 createFilterWrapper 包装回调函数
    // 💡 这样 watch 的回调就会经过 EventFilter 的过滤
    // 💡 如果 eventFilter 是 debounceFilter → 回调会防抖
    // 💡 如果 eventFilter 是 throttleFilter → 回调会节流
    // 💡 如果 eventFilter 是 pausableFilter → 回调可暂停
    // 💡 如果 eventFilter 是 bypassFilter → 回调直接执行（默认）
    watchOptions,
  )
}
```

---

## 核心思想

```
watchWithFilter 的本质：

  Vue watch(source, callback, options)
    ↓ 替换 callback
  Vue watch(source, createFilterWrapper(eventFilter, callback), options)

调用链：
  source 变化
    → watch 触发
    → createFilterWrapper 的 wrapper 函数
    → eventFilter(invoke, options)
      → debounceFilter: 延迟执行
      → throttleFilter: 节流执行
      → pausableFilter: 暂停时不执行
      → bypassFilter: 直接执行
    → invoke() = callback()
```

**关键洞察：** watchWithFilter 不是"增强版 watch"，而是"用 EventFilter 包装了 watch 的回调"。它只增加了一行核心代码（`createFilterWrapper`），但这一行代码让所有 EventFilter 都能应用到 watch 上。

---

## 使用示例

### 基本用法（bypassFilter）

```ts
import { watchWithFilter, bypassFilter } from '@vueuse/shared'

watchWithFilter(
  source,
  (value) => console.log(value),
  { eventFilter: bypassFilter }
)
// 等价于 watch(source, callback)
```

### 带防抖

```ts
import { watchWithFilter, debounceFilter } from '@vueuse/shared'

watchWithFilter(
  searchQuery,
  (query) => fetchResults(query),
  { eventFilter: debounceFilter(300) }
)
```

### 带节流

```ts
import { watchWithFilter, throttleFilter } from '@vueuse/shared'

watchWithFilter(
  scrollY,
  (y) => updatePosition(y),
  { eventFilter: throttleFilter(100) }
)
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `watchPausable` | 依赖 | 使用 watchWithFilter + pausableFilter |
| `watchDebounced` | 依赖 | 使用 watchWithFilter + debounceFilter |
| `createFilterWrapper` | 依赖 | 过滤器包装桥梁 |
| `bypassFilter` | 依赖 | 默认的透传过滤器 |

---

## 笔记

```
在此记录你的学习笔记...

```
