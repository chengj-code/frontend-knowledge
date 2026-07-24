# refDebounced 源码详细注释

> 组合模式的典型实现：组合 useDebounceFn 生成防抖的 ref

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/refDebounced/index.ts` |
| 代码行数 | 29 行（含别名导出） |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `useDebounceFn`、`ref`、`watch`、`shallowReadonly` |
| 设计模式 | 组合模式 |
| 核心知识点 | watch + useDebounceFn、别名导出 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { MaybeRefOrGetter, Ref } from 'vue'
import type { DebounceFilterOptions } from '../utils'

// ============================================================
// 第二部分：Vue API 和工具导入
// ============================================================

import { ref as deepRef, shallowReadonly, toValue, watch } from 'vue'
// 💡 `ref as deepRef` → 重命名导入，避免与函数名冲突
// 💡 shallowReadonly → 创建只读代理
// 💡 toValue → 解包 Ref 或调用 getter
// 💡 watch → 监听响应式数据变化

import { useDebounceFn } from '../useDebounceFn'
// 💡 底层防抖函数

// ============================================================
// 第三部分：返回类型定义
// ============================================================

export type RefDebouncedReturn<T = any> = Readonly<Ref<T>>
// 💡 返回类型：只读的 Ref
// 💡 外部不能直接修改防抖后的 ref，只能通过修改原 ref 触发

// ============================================================
// 第四部分：函数实现（⭐ 组合模式）
// ============================================================

/**
 * Debounce updates of a ref.
 *
 * @return A new debounced ref.
 */
export function refDebounced<T>(
  value: Ref<T>,
  ms: MaybeRefOrGetter<number> = 200,
  options: DebounceFilterOptions = {}
): RefDebouncedReturn<T> {
  // ⭐ 创建一个新的 ref，用于存储防抖后的值
  const debounced = deepRef(toValue(value)) as Ref<T>
  // 💡 初始值 = 原 ref 的当前值
  // 💡 使用 `ref as deepRef` 是因为项目 ESLint 规则要求用 shallowRef
  //    但这里需要 deep ref 来存储复杂对象

  // ⭐ 创建防抖更新函数
  const updater = useDebounceFn(() => {
    debounced.value = value.value
    // 💡 将原 ref 的当前值同步到 debounced ref
    // 💡 这个赋值会延迟 ms 毫秒执行
  }, ms, options)

  // ⭐ 监听原 ref 的变化
  watch(value, () => updater())
  // 💡 当原 ref 变化时，调用 updater（防抖函数）
  // 💡 updater 会延迟 ms 毫秒后才更新 debounced
  // 💡 如果在 ms 内再次变化，会重新计时

  // ⭐ 返回只读的 debounced ref
  return shallowReadonly(debounced)
  // 💡 只读：防止外部直接修改 debounced
  // 💡 只能通过修改原 ref 来间接更新
}

// ============================================================
// 第五部分：别名导出
// ============================================================

// alias
export {
  refDebounced as debouncedRef,
  refDebounced as useDebounce,
}
// 💡 提供多个别名，方便不同使用习惯
// 💡 refDebounced = debouncedRef = useDebounce
```

---

## 组合模式解析

```
refDebounced 的组合结构：

  原 ref (value)
    ↓ watch 监听变化
  updater() = useDebounceFn(callback, ms)
    ↓ 延迟 ms 毫秒后执行
  debounced.value = value.value
    ↓ shallowReadonly
  返回只读的 debounced ref

时序图：
  value 变化 1 → updater() → [等待 200ms]
  value 变化 2 → updater() → [重新等待 200ms]
  value 变化 3 → updater() → [重新等待 200ms]
                              ↓ 200ms 后
                    debounced.value = value.value
```

**组合模式的核心思想：** 将 `useDebounceFn` + `watch` + `ref` 组合在一起，生成一个新的 composable。

---

## 使用示例

### 基本用法

```ts
import { refDebounced } from '@vueuse/shared'

const input = ref('')
const debouncedInput = refDebounced(input, 300)

// input 快速变化
input.value = 'a'
input.value = 'ab'
input.value = 'abc'

// 300ms 后
console.log(debouncedInput.value) // 'abc'
```

### 用于搜索

```ts
const searchQuery = ref('')
const debouncedQuery = refDebounced(searchQuery, 500)

watch(debouncedQuery, (query) => {
  fetch(`/api/search?q=${query}`)
})
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useDebounceFn` | 依赖 | 底层防抖函数 |
| `refThrottled` | 同级 | 类似的节流版本 |
| `watch` | 依赖 | 监听原 ref 变化 |

---

## 笔记

```
在此记录你的学习笔记...

```
