# useThrottleFn 源码详细注释

> 装饰器模式的典型实现：用 throttleFilter 包装普通函数

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/useThrottleFn/index.ts` |
| 代码行数 | 33 行 |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `createFilterWrapper`、`throttleFilter` |
| 设计模式 | 装饰器模式 |
| 核心知识点 | leading/trailing 配置、EventFilter 组合 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { MaybeRefOrGetter } from 'vue'
import type { FunctionArgs, PromisifyFn } from '../utils'
import { createFilterWrapper, throttleFilter } from '../utils'

// ============================================================
// 第二部分：函数实现（⭐ 装饰器模式）
// ============================================================

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param   fn             要节流的函数
 * @param   ms             延迟时间（毫秒），默认 200
 * @param [trailing]       是否在尾部执行，默认 false
 * @param [leading]        是否在头部执行，默认 true
 * @param [rejectOnCancel] 取消时是否 reject，默认 false
 *
 * @return  A new, throttled, function.
 */
export function useThrottleFn<T extends FunctionArgs>(
  fn: T,
  ms: MaybeRefOrGetter<number> = 200,
  trailing = false,
  // ⚠️ 注意：这里默认值和 throttleFilter 不同！
  // useThrottleFn 默认 trailing=false
  // throttleFilter 默认 trailing=true
  // 这是因为 useThrottleFn 是面向用户的 API，
  // 用户通常期望"只在第一次触发时执行"
  leading = true,
  rejectOnCancel = false,
): PromisifyFn<T> {
  return createFilterWrapper(
    throttleFilter(ms, trailing, leading, rejectOnCancel),
    // ⭐ 核心：创建节流过滤器
    // 💡 throttleFilter(ms, trailing, leading, rejectOnCancel) 返回一个 EventFilter
    // 💡 这个 EventFilter 会在冷却期内忽略调用
    fn,
    // ⭐ 原函数
  )
}
```

---

## useDebounceFn 与 useThrottleFn 的对比

| 特性 | useDebounceFn | useThrottleFn |
|------|--------------|---------------|
| 过滤器 | `debounceFilter` | `throttleFilter` |
| 行为 | 延迟执行，持续触发则重新计时 | 冷却期内忽略，冷却后可执行 |
| 默认 trailing | N/A | false |
| 默认 leading | N/A | true |
| 适用场景 | 输入搜索、表单验证 | 滚动、resize、按钮防重复点击 |

---

## 使用示例

### 基本用法

```ts
import { useThrottleFn } from '@vueuse/shared'

const throttledScroll = useThrottleFn(() => {
  console.log('scroll position:', window.scrollY)
}, 200)

window.addEventListener('scroll', throttledScroll)
// 每 200ms 最多执行一次
```

### trailing 模式

```ts
// 等待输入停止 100ms 后执行最后一次
const throttledInput = useThrottleFn(handleInput, 100, true)
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `throttleFilter` | 依赖 | 底层节流过滤器 |
| `createFilterWrapper` | 依赖 | 过滤器包装桥梁 |
| `useDebounceFn` | 同级 | 类似的防抖版本 |
| `refThrottled` | 被依赖 | 组合 useThrottleFn 实现 |

---

## 笔记

```
在此记录你的学习笔记...

```
