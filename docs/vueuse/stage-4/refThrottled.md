# refThrottled 源码详细注释

> 组合模式的典型实现：组合 useThrottleFn 生成节流的 ref

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/refThrottled/index.ts` |
| 代码行数 | 32 行（含别名导出） |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `useThrottleFn`、`ref`、`watch` |
| 设计模式 | 组合模式 |
| 核心知识点 | watch + useThrottleFn、快速路径 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { Ref } from 'vue'

// ============================================================
// 第二部分：Vue API 和工具导入
// ============================================================

import { ref as deepRef, toValue, watch } from 'vue'
import { useThrottleFn } from '../useThrottleFn'

// ============================================================
// 第三部分：返回类型定义
// ============================================================

export type RefThrottledReturn<T = any> = Ref<T>

// ============================================================
// 第四部分：函数实现（⭐ 组合模式）
// ============================================================

/**
 * Throttle execution of a function.
 *
 * @param value Ref value to be watched with throttle effect
 * @param  delay  延迟时间（毫秒），默认 200
 * @param trailing 是否在尾部执行，默认 true
 * @param leading 是否在头部执行，默认 true
 */
export function refThrottled<T = any>(
  value: Ref<T>,
  delay = 200,
  trailing = true,
  leading = true
): RefThrottledReturn<T> {
  // ⭐ 快速路径：如果延迟 <= 0，直接返回原 ref
  if (delay <= 0)
    return value
  // 💡 优化：避免不必要的包装
  // 💡 refDebounced 没有这个快速路径

  // ⭐ 创建一个新的 ref，用于存储节流后的值
  const throttled = deepRef(toValue(value))
  // 💡 初始值 = 原 ref 的当前值

  // ⭐ 创建节流更新函数
  const updater = useThrottleFn(() => {
    throttled.value = value.value
    // 💡 将原 ref 的当前值同步到 throttled ref
    // 💡 这个赋值会被节流控制
  }, delay, trailing, leading)

  // ⭐ 监听原 ref 的变化
  watch(value, () => updater())
  // 💡 当原 ref 变化时，调用 updater（节流函数）
  // 💡 在冷却期内，多次变化只会执行一次

  // ⭐ 返回节流后的 ref
  return throttled as Ref<T>
  // ⚠️ 注意：这里没有用 shallowReadonly
  // 💡 refDebounced 返回 Readonly<Ref<T>>
  // 💡 refThrottled 返回 Ref<T>（可写）
  // 💡 这是一个设计上的不一致
}

// ============================================================
// 第五部分：别名导出
// ============================================================

// alias
export {
  refThrottled as throttledRef,
  refThrottled as useThrottle,
}
```

---

## refDebounced 与 refThrottled 的对比

| 特性 | refDebounced | refThrottled |
|------|-------------|-------------|
| 底层 hook | `useDebounceFn` | `useThrottleFn` |
| 行为 | 延迟执行，持续触发重新计时 | 冷却期内忽略 |
| 返回类型 | `Readonly<Ref<T>>` | `Ref<T>` |
| 快速路径 | 无 | `delay <= 0` 直接返回原 ref |
| 默认 trailing | N/A | true |
| 默认 leading | N/A | true |

---

## 使用示例

### 基本用法

```ts
import { refThrottled } from '@vueuse/shared'

const scrollY = ref(0)
const throttledScrollY = refThrottled(scrollY, 200)

// 快速滚动时，throttledScrollY 每 200ms 最多更新一次
```

### 用于实时数据

```ts
const price = ref(100)
const throttledPrice = refThrottled(price, 1000)

// 价格频繁变化时，throttledPrice 每秒最多更新一次
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useThrottleFn` | 依赖 | 底层节流函数 |
| `refDebounced` | 同级 | 类似的防抖版本 |

---

## 笔记

```
在此记录你的学习笔记...

```
