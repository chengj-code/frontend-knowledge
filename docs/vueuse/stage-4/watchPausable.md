# watchPausable 源码详细注释

> 组合 pausableFilter + watchWithFilter，实现可暂停的 watch

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/watchPausable/index.ts` |
| 代码行数 | 41 行（含别名导出） |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `pausableFilter`、`watchWithFilter` |
| 设计模式 | 组合模式、门面模式 |
| 核心知识点 | pausableFilter 应用、Pausable 接口扩展 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { WatchCallback, WatchSource, WatchStopHandle } from 'vue'
import type { MapOldSources, MapSources, Pausable, PausableFilterOptions } from '../utils'
import type { WatchWithFilterOptions } from '../watchWithFilter'

// ============================================================
// 第二部分：工具导入
// ============================================================

import { pausableFilter } from '../utils'
import { watchWithFilter } from '../watchWithFilter'

// ============================================================
// 第三部分：返回类型定义
// ============================================================

export interface WatchPausableReturn extends Pausable {
  stop: WatchStopHandle
}
// 💡 返回类型：Pausable 接口 + stop 函数
// 💡 Pausable = { isActive, pause, resume }
// 💡 stop = 停止 watch 的函数

// ============================================================
// 第四部分：选项类型定义
// ============================================================

export type WatchPausableOptions<Immediate> = WatchWithFilterOptions<Immediate> & PausableFilterOptions
// 💡 继承 WatchWithFilterOptions + PausableFilterOptions
// 💡 即：watch 选项 + eventFilter + initialState

// ============================================================
// 第五部分：函数重载签名
// ============================================================

// 与 watchWithFilter 一致的重载签名
export function watchPausable<T extends Readonly<WatchSource<unknown>[]>, Immediate extends Readonly<boolean> = false>(
  sources: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: WatchPausableOptions<Immediate>
): WatchPausableReturn

export function watchPausable<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchPausableOptions<Immediate>
): WatchPausableReturn

export function watchPausable<T extends object, Immediate extends Readonly<boolean> = false>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchPausableOptions<Immediate>
): WatchPausableReturn

// ============================================================
// 第六部分：函数实现（⭐ 组合模式）
// ============================================================

export function watchPausable<Immediate extends Readonly<boolean> = false>(
  source: any,
  cb: any,
  options: WatchPausableOptions<Immediate> = {},
): WatchPausableReturn {
  const {
    eventFilter: filter,
    // 💡 用户自定义的内部过滤器（可选）
    // 💡 如果用户传了 debounceFilter，pause 时会同时暂停防抖

    initialState = 'active',
    // 💡 初始状态，默认 'active'

    ...watchOptions
    // 💡 剩余选项传递给 watchWithFilter
  } = options

  // ⭐ 核心：创建 pausableFilter
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter, { initialState })
  // 💡 pausableFilter 包装了用户传入的 filter（如果有的话）
  // 💡 返回的 eventFilter 会在 isActive=false 时跳过执行

  // ⭐ 核心：使用 watchWithFilter
  const stop = watchWithFilter(
    source,
    cb,
    {
      ...watchOptions,
      eventFilter,
      // 💡 将 pausableFilter 的 eventFilter 传给 watchWithFilter
    },
  )

  // ⭐ 返回控制接口
  return { stop, pause, resume, isActive }
  // 💡 stop: 停止 watch
  // 💡 pause: 暂停回调执行
  // 💡 resume: 恢复回调执行
  // 💡 isActive: 当前是否活跃
}

// ============================================================
// 第七部分：别名导出
// ============================================================

// alias
export { watchPausable as pausableWatch }
```

---

## 组合模式解析

```
watchPausable 的组合结构：

  pausableFilter(extendFilter)
    ↓ 返回 { eventFilter, pause, resume, isActive }
  watchWithFilter(source, cb, { eventFilter })
    ↓ 返回 stop
  { stop, pause, resume, isActive }

调用链：
  source 变化
    → watchWithFilter 的 wrapper
    → pausableFilter 的 eventFilter
      → isActive?
        → true: 调用 extendFilter（如果有）→ 调用 cb
        → false: 不调用
```

**暂停/恢复的实现：**
```
pause()  → isActive.value = false → 后续 source 变化不会触发 cb
resume() → isActive.value = true  → 后续 source 变化会触发 cb
```

---

## 使用示例

### 基本用法

```ts
import { watchPausable } from '@vueuse/shared'

const source = ref(0)
const { isActive, pause, resume, stop } = watchPausable(
  source,
  (value) => console.log('value changed:', value),
)

source.value = 1  // 输出: "value changed: 1"

pause()
source.value = 2  // 不输出（已暂停）

resume()
source.value = 3  // 输出: "value changed: 3"

stop()  // 停止 watch
```

### 初始暂停

```ts
const { isActive, resume } = watchPausable(
  source,
  callback,
  { initialState: 'paused' },
)
// isActive.value === false
// 需要手动 resume() 才会开始监听
```

### 组合防抖

```ts
import { watchPausable, debounceFilter } from '@vueuse/shared'

const { pause, resume } = watchPausable(
  searchQuery,
  fetchResults,
  { eventFilter: debounceFilter(300) },
)
// 同时具有防抖和暂停功能
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `pausableFilter` | 依赖 | 创建可暂停的过滤器 |
| `watchWithFilter` | 依赖 | 带过滤器的 watch |
| `watchDebounced` | 同级 | 类似的防抖版 watch |
| `useStorage` | 被依赖 | 使用 pausableWatch 防止循环 |

---

## 笔记

```
在此记录你的学习笔记...

```
