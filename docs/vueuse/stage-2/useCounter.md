# useCounter 源码详细注释

> 带边界钳制的基础计数器，展示了门面模式和只读 ref 的典型用法

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/useCounter/index.ts` |
| 代码行数 | 73 行 |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `shallowRef`、`shallowReadonly`、`unref` |
| 设计模式 | 门面模式 |
| 核心知识点 | 浅层只读 ref、接口定义、边界钳制 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { MaybeRef, Ref } from 'vue'
// 💡 MaybeRef<T> = T | Ref<T> → 接受普通值或 Ref
// 💡 Ref<T> → Vue 响应式引用类型
// ⚠️ `import type` 只导入类型，不产生运行时代码

import {
  shallowReadonly,
  shallowRef,
  // eslint-disable-next-line no-restricted-imports
  unref,  // ⚠️ ESLint 注释：项目通常禁止直接使用 unref，这里是为了内部使用
} from 'vue'
// 💡 shallowReadonly → 创建浅层只读代理，阻止外部修改 .value
// 💡 shallowRef → 创建浅层响应式引用
// 💡 unref → 如果是 Ref 返回 .value，否则返回原值（Vue 内置工具）

// ============================================================
// 第二部分：选项接口定义
// ============================================================

export interface UseCounterOptions {
  min?: number  // 💡 最小值边界，默认 -Infinity
  max?: number  // 💡 最大值边界，默认 +Infinity
}
// 💡 简洁的选项接口，只包含两个可选的边界配置
// 💡 使用 `?` 标记为可选，调用时可以不传

// ============================================================
// 第三部分：返回值接口定义（⭐ 门面模式的核心）
// ============================================================

export interface UseCounterReturn {
  /**
   * The current value of the counter.
   */
  readonly count: Readonly<Ref<number>>
  // 💡 只读的计数器值
  // 💡 `readonly` 修饰符：TypeScript 层面防止属性被重新赋值
  // 💡 `Readonly<Ref<number>>`：运行时通过 shallowReadonly 实现

  /**
   * Increment the counter.
   *
   * @param {number} [delta=1] The number to increment.
   */
  inc: (delta?: number) => void
  // 💡 增加计数器，delta 默认为 1
  // 💡 自动钳制到 [min, max] 范围

  /**
   * Decrement the counter.
   *
   * @param {number} [delta=1] The number to decrement.
   */
  dec: (delta?: number) => void
  // 💡 减少计数器，delta 默认为 1
  // 💡 自动钳制到 [min, max] 范围

  /**
   * Get the current value of the counter.
   */
  get: () => number
  // 💡 获取当前值（返回普通 number，不是 Ref）
  // 💡 等价于 count.value，但更语义化

  /**
   * Set the counter to a new value.
   *
   * @param val The new value of the counter.
   */
  set: (val: number) => void
  // 💡 设置为指定值
  // 💡 自动钳制到 [min, max] 范围

  /**
   * Reset the counter to an initial value.
   */
  reset: (val?: number) => number
  // 💡 重置为初始值（或指定的新初始值）
  // 💡 返回重置后的值
}
// ⭐ 门面模式：将复杂的内部逻辑（边界计算、类型转换）
//    封装为简洁的 API（inc/dec/set/reset/get）

// ============================================================
// 第四部分：函数实现
// ============================================================

/**
 * Basic counter with utility functions.
 *
 * @see https://vueuse.org/useCounter
 * @param [initialValue] 初始值，默认为 0
 * @param options 配置选项，可设置 min/max 边界
 */
export function useCounter(
  initialValue: MaybeRef<number> = 0,  // 💡 初始值，支持 Ref 或普通值，默认 0
  options: UseCounterOptions = {}      // 💡 选项，默认空对象
) {
  let _initialValue = unref(initialValue)
  // 💡 unref 解包：如果是 Ref 返回 .value，否则返回原值
  // 💡 `let` 而非 `const`：因为 reset() 可能会更新初始值
  // 💡 保存初始值的副本，用于 reset() 功能

  const count = shallowRef(initialValue)
  // 💡 创建响应式状态
  // 💡 shallowRef：只追踪 .value 变化，不深度追踪
  // 💡 如果 initialValue 是 Ref，shallowRef 会自动解包
  //    例：shallowRef(ref(5)) → shallowRef(5)，不是嵌套 ref

  const {
    max = Number.POSITIVE_INFINITY,  // 💡 默认最大值：+Infinity
    min = Number.NEGATIVE_INFINITY,  // 💡 默认最小值：-Infinity
  } = options
  // 💡 解构选项，设置默认边界值
  // 💡 使用 Infinity 作为默认值，意味着"无限制"

  // ⭐ 核心操作函数（门面模式）

  const inc = (delta = 1) =>
    count.value = Math.max(Math.min(max, count.value + delta), min)
  // 💡 增加操作的边界钳制逻辑：
  //    1. count.value + delta → 原始增加结果
  //    2. Math.min(max, ...) → 不超过上限
  //    3. Math.max(..., min) → 不低于下限
  // 💡 例：count=8, max=10, delta=5
  //    → Math.max(Math.min(10, 13), 0) = Math.max(10, 0) = 10

  const dec = (delta = 1) =>
    count.value = Math.min(Math.max(min, count.value - delta), max)
  // 💡 减少操作的边界钳制逻辑：
  //    1. count.value - delta → 原始减少结果
  //    2. Math.max(min, ...) → 不低于下限
  //    3. Math.min(..., max) → 不超过上限
  // 💡 例：count=2, min=0, delta=5
  //    → Math.min(Math.max(0, -3), 100) = Math.min(0, 100) = 0
  // ⚠️ 注意 inc 和 dec 的钳制顺序不同：
  //    - inc：先钳制上界，再钳制下界
  //    - dec：先钳制下界，再钳制上界
  //    这是为了处理 delta 为负数的边界情况

  const get = () => count.value
  // 💡 简单的 getter，返回当前值
  // 💡 等价于 `count.value`，但提供了语义化的 API

  const set = (val: number) =>
    (count.value = Math.max(min, Math.min(max, val)))
  // 💡 设置指定值，自动钳制到 [min, max]
  // 💡 例：set(15)，min=0, max=10
  //    → Math.max(0, Math.min(10, 15)) = Math.max(0, 10) = 10

  const reset = (val = _initialValue) => {
    _initialValue = val  // 💡 更新初始值（下次 reset 会用新值）
    return set(val)      // 💡 设置为初始值，并返回结果
  }
  // 💡 重置功能的双重含义：
  //    1. 设置当前值为初始值
  //    2. 如果传了新参数，同时更新"初始值"
  // 💡 这允许动态改变"初始值"：
  //    const counter = useCounter(0)
  //    counter.reset(5)  → count=5, 初始值变为 5
  //    counter.reset()   → count=5（用新的初始值 5 重置）

  return { count: shallowReadonly(count), inc, dec, get, set, reset }
  // ⭐ shallowReadonly(count) 的作用：
  //    - 创建一个只读代理，外部不能修改 .value
  //    - 但内部的 inc/dec/set/reset 仍然可以修改
  //    - 这是"封装"的核心：暴露只读接口，隐藏可写实现
  // 💡 返回对象（而非数组），这是门面模式的标准做法
}
```

---

## 设计模式解析

### 门面模式

```ts
// 门面模式：将复杂的内部逻辑封装为简洁的接口
const counter = useCounter(0, { min: 0, max: 10 })

// 复杂的边界计算被隐藏在简洁的方法后面
counter.inc(5)   // 内部：Math.max(Math.min(10, 0+5), 0) = 5
counter.dec(3)   // 内部：Math.min(Math.max(0, 5-3), 10) = 2
counter.set(15)  // 内部：Math.max(0, Math.min(10, 15)) = 10（钳制到上限）
```

**门面模式的核心思想：** 提供一个简化的接口，隐藏底层复杂的实现细节。调用者不需要知道边界计算的具体逻辑。

### 只读封装

```ts
return { count: shallowReadonly(count), inc, dec, get, set, reset }
```

**为什么 count 是只读的？**
- 外部只能通过 `inc/dec/set/reset` 修改值
- 这些方法都包含边界检查逻辑
- 如果允许直接 `counter.count.value = 999`，就会绕过边界检查
- `shallowReadonly` 在开发模式下会打印警告，提醒开发者不要直接修改

---

## 边界钳制的数学原理

### inc 的钳制公式

```
result = max(min(maxVal, current + delta), minVal)
```

以 `current=8, max=10, delta=5` 为例：
```
1. current + delta = 8 + 5 = 13
2. min(10, 13) = 10     ← 钳制上界
3. max(0, 10) = 10      ← 钳制下界
结果：10
```

### dec 的钳制公式

```
result = min(max(minVal, current - delta), maxVal)
```

以 `current=2, min=0, delta=5` 为例：
```
1. current - delta = 2 - 5 = -3
2. max(0, -3) = 0       ← 钳制下界
3. min(100, 0) = 0      ← 钳制上界
结果：0
```

### 为什么 inc 和 dec 的顺序不同？

这是为了处理 **负数 delta** 的情况：

```ts
// inc(delta) 用负数 delta 实际上是减少
counter.inc(-5)  // 相当于 dec(5)

// 如果顺序和 dec 相同，负数 delta 会导致边界检查失效
// 所以 inc 先检查上界，dec 先检查下界
```

---

## TypeScript 技巧总结

### 1. MaybeRef<T> + unref

```ts
export function useCounter(initialValue: MaybeRef<number> = 0, ...) {
  let _initialValue = unref(initialValue)
  const count = shallowRef(initialValue)
```

**模式：**
- 参数类型用 `MaybeRef<T>` 兼容 Ref 和普通值
- 用 `unref()` 取出原始值保存到局部变量
- 用 `shallowRef()` 创建响应式状态

### 2. shallowReadonly 封装

```ts
return { count: shallowReadonly(count), ... }
```

**效果：**
- 外部读取：`counter.count.value` → 正常
- 外部修改：`counter.count.value = 999` → 开发模式警告 + 修改无效
- 内部修改：`inc/dec/set/reset` 通过闭包直接修改原始 `count`，绕过只读代理

### 3. 接口定义模式

```ts
export interface UseCounterReturn {
  readonly count: Readonly<Ref<number>>
  inc: (delta?: number) => void
  dec: (delta?: number) => void
  // ...
}
```

**优点：**
- 类型定义与实现分离，提高可读性
- JSDoc 注释自动生成文档
- `readonly` 修饰符在 TypeScript 层面防止误用

---

## 使用示例

### 基本用法

```ts
const { count, inc, dec } = useCounter()
// count.value === 0
inc()
// count.value === 1
inc(5)
// count.value === 6
dec(3)
// count.value === 3
```

### 带边界限制

```ts
const { count, inc, set } = useCounter(5, { min: 0, max: 10 })
inc(100)
// count.value === 10（钳制到上限）
set(-5)
// count.value === 0（钳制到下限）
```

### 动态初始值

```ts
const counter = useCounter(0)
counter.inc(5)   // count = 5
counter.reset()  // count = 0（重置到初始值 0）
counter.reset(10) // count = 10，初始值变为 10
counter.reset()  // count = 10（重置到新的初始值 10）
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useToggle` | 同级 | 都是状态管理 composable |
| `shallowRef` | 依赖 | 创建响应式状态 |
| `shallowReadonly` | 依赖 | 创建只读代理 |
| `unref` | 依赖 | 解包 Ref |

---

## 练习

1. 阅读源码，理解 `inc` 和 `dec` 中 `Math.max/Math.min` 的顺序差异
2. 尝试给 `useCounter` 添加一个 `multiply` 方法
3. 思考：为什么用 `let _initialValue` 而不是 `const`？
4. 思考：`shallowReadonly` 和 `readonly` 有什么区别？

---

## 笔记

```
在此记录你的学习笔记...

```
