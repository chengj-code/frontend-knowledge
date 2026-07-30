# watchDebounced 源码详细注释

> 组合 debounceFilter + watchWithFilter，实现防抖的 watch

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/watchDebounced/index.ts` |
| 代码行数 | 37 行（含别名导出） |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `debounceFilter`、`watchWithFilter` |
| 设计模式 | 组合模式、门面模式 |
| 核心知识点 | debounceFilter 应用、maxWait 透传 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { MaybeRefOrGetter, WatchCallback, WatchOptions, WatchSource, WatchStopHandle } from 'vue'
import type { DebounceFilterOptions, MapOldSources, MapSources } from '../utils'

// ============================================================
// 第二部分：工具导入
// ============================================================

import { debounceFilter } from '../utils'
import { watchWithFilter } from '../watchWithFilter'

// ============================================================
// 第三部分：选项接口定义
// ============================================================

export interface WatchDebouncedOptions<Immediate> extends WatchOptions<Immediate>, DebounceFilterOptions {
  debounce?: MaybeRefOrGetter<number>
  // 💡 防抖延迟时间（毫秒）
  // 💡 支持响应式（Ref 或 getter）
  // 💡 注意字段名是 `debounce`，不是 `delay` 或 `ms`
}
// 💡 继承 Vue WatchOptions + DebounceFilterOptions
// 💡 DebounceFilterOptions 包含 maxWait 和 rejectOnCancel

// ============================================================
// 第四部分：函数重载签名
// ============================================================

// 与 watchWithFilter 一致的重载签名
export function watchDebounced<T extends Readonly<WatchSource<unknown>[]>, Immediate extends Readonly<boolean> = false>(
  sources: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: WatchDebouncedOptions<Immediate>
): WatchStopHandle

export function watchDebounced<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchDebouncedOptions<Immediate>
): WatchStopHandle

export function watchDebounced<T extends object, Immediate extends Readonly<boolean> = false>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchDebouncedOptions<Immediate>
): WatchStopHandle

// ============================================================
// 第五部分：函数实现（⭐ 组合模式）
// ============================================================

// implementation
export function watchDebounced<Immediate extends Readonly<boolean> = false>(
  source: any,
  cb: any,
  options: WatchDebouncedOptions<Immediate> = {},
): WatchStopHandle {
  const {
    debounce = 0,
    // 💡 防抖延迟时间，默认 0（不防抖）

    maxWait = undefined,
    // 💡 最大等待时间，默认 undefined（无限制）
    // 💡 从 DebounceFilterOptions 继承

    ...watchOptions
    // 💡 剩余选项传递给 watchWithFilter
  } = options

  // ⭐ 核心：使用 watchWithFilter + debounceFilter
  return watchWithFilter(
    source,
    cb,
    {
      ...watchOptions,
      eventFilter: debounceFilter(debounce, { maxWait }),
      // 💡 创建防抖过滤器
      // 💡 debounceFilter(debounce, { maxWait }) 返回一个 EventFilter
      // 💡 这个 EventFilter 会延迟 debounce 毫秒后执行
      // 💡 如果设置了 maxWait，超过 maxWait 也会强制执行
    },
  )
}

// ============================================================
// 第六部分：别名导出
// ============================================================

// alias
export { watchDebounced as debouncedWatch }
```

---

## 组合模式解析

```
watchDebounced 的组合结构：

  debounceFilter(debounce, { maxWait })
    ↓ 返回 EventFilter
  watchWithFilter(source, cb, { eventFilter })
    ↓ 返回 stop

调用链：
  source 变化
    → watchWithFilter 的 wrapper
    → debounceFilter 的 filter
      → 清除上一个定时器
      → 设置新定时器（debounce 毫秒）
      → 如果有 maxWait，设置 maxTimer
      → debounce 毫秒后（或 maxWait 毫秒后）
    → cb()
```

---

## 使用示例

### 基本用法

```ts
import { watchDebounced } from '@vueuse/shared'

const searchQuery = ref('')

watchDebounced(
  searchQuery,
  (query) => fetchResults(query),
  { debounce: 300 },
)
// searchQuery 变化后 300ms 才会执行 fetchResults
```

### 带 maxWait

```ts
watchDebounced(
  searchQuery,
  fetchResults,
  { debounce: 300, maxWait: 2000 },
)
// 最多等 2 秒，即使持续输入也会执行
```

### 搜索框示例

```vue
<script setup>
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/shared'

const query = ref('')
const results = ref([])

watchDebounced(
  query,
  async (q) => {
    if (q.length > 2) {
      results.value = await fetch(`/api/search?q=${q}`).then(r => r.json())
    }
  },
  { debounce: 500 },
)
</script>

<template>
  <input v-model="query" placeholder="搜索...">
  <ul>
    <li v-for="item in results" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `debounceFilter` | 依赖 | 创建防抖过滤器 |
| `watchWithFilter` | 依赖 | 带过滤器的 watch |
| `watchPausable` | 同级 | 类似的可暂停版 watch |
| `useStorage` | 被依赖 | 使用 debouncedWatch 同步存储 |

---

## 笔记

```
在此记录你的学习笔记...

```
