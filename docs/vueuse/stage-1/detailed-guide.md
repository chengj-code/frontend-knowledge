# 阶段 1：基础工具函数 - 详细学习指南

> 深入理解 VueUse 的代码风格和基础类型技巧，掌握 4 个核心工具函数

---

## 学习目标

- [ ] 理解 `MaybeRef<T>` = `T | Ref<T>` 的核心概念
- [ ] 掌握 `unref` 的作用：安全地从 Ref 或普通值中取值
- [ ] 掌握 TypeScript 函数重载的写法和用途
- [ ] 掌握类型守卫在 composable 中的应用

---

## 核心概念

### 1. MaybeRef 类型

`MaybeRef<T>` 是 VueUse 中最基础的类型之一，定义如下：

```ts
type MaybeRef<T> = T | Ref<T>
```

**设计思想**：允许函数同时接受普通值和响应式引用，提供更灵活的 API。

**使用场景**：
- 当你希望函数既能处理静态值，也能处理动态响应式值时
- 提高 API 的易用性，减少用户的认知负担

**示例**：
```ts
// 可以传入普通值
useTimeout(1000)

// 也可以传入 ref
const delay = ref(1000)
useTimeout(delay)

// 甚至可以传入 computed
const dynamicDelay = computed(() => someCondition.value ? 1000 : 2000)
useTimeout(dynamicDelay)
```

### 2. unref 函数

Vue 3 提供的 `unref` 函数用于安全地从 `MaybeRef<T>` 中提取值：

```ts
function unref<T>(value: MaybeRef<T>): T
```

**实现原理**：
```ts
function unref(value) {
  return isRef(value) ? value.value : value
}
```

**作用**：统一处理普通值和 Ref，无需手动判断类型。

---

## Hook 详解

### 1. toValue - 值提取工具

**文件位置**：`packages/shared/toValue/index.ts`

```ts
import { toValue as _toValue } from 'vue'

/**
 * Get the value of value/ref/getter.
 *
 * @deprecated use `toValue` from `vue` instead
 */
export const toValue = _toValue

/**
 * @deprecated use `toValue` instead
 */
export const resolveUnref = _toValue
```

**代码解析**：

1. **模块重导出**：这是纯粹的 re-export，将 Vue 3.3+ 的 `toValue` 函数导出
2. **向后兼容**：保留了 `resolveUnref` 作为别名，标记为 `@deprecated`
3. **设计意图**：
   - Vue 3.3 引入了官方的 `toValue`，VueUse 选择使用官方实现
   - 通过 re-export 保持 API 一致性，用户无需关心底层实现

**`toValue` vs `unref` 的区别**：

```ts
// unref 只处理 Ref
unref(ref(1)) // 1
unref(1)      // 1

// toValue 还支持 getter 函数
toValue(() => 1) // 1
toValue(ref(1))  // 1
toValue(1)       // 1
```

**关键知识点**：
- 模块边界的清晰划分：公共 API 通过 re-export 暴露
- 向后兼容策略：保留旧 API 并标记废弃
- 与 Vue 官方 API 的对齐

---

### 2. get - 安全的值访问

**文件位置**：`packages/shared/get/index.ts`

```ts
import type { MaybeRef } from '../utils'
// eslint-disable-next-line no-restricted-imports
import { unref } from 'vue'

/**
 * Shorthand for accessing `ref.value`
 */
export function get<T>(ref: MaybeRef<T>): T
export function get<T, K extends keyof T>(ref: MaybeRef<T>, key: K): T[K]
export function get(obj: MaybeRef<any>, key?: string | number | symbol) {
  if (key == null)
    return unref(obj)
  return unref(obj)[key]
}
```

**代码解析**：

1. **函数重载**：定义了两个重载签名
   - `get<T>(ref: MaybeRef<T>): T` - 获取整个值
   - `get<T, K extends keyof T>(ref: MaybeRef<T>, key: K): T[K]` - 获取对象的特定属性

2. **泛型约束**：
   - `K extends keyof T`：确保 key 是对象 T 的有效属性名
   - 返回类型 `T[K]`：使用索引访问类型，精确推断属性类型

3. **实现逻辑**：
   - 如果没有提供 key 参数，直接使用 `unref` 获取值
   - 如果提供了 key 参数，先 `unref` 获取对象，再访问属性

**使用场景**：

```ts
// 场景 1：获取 ref 的值
const count = ref(42)
get(count) // 42

// 场景 2：获取 reactive 对象的属性
const state = ref({ name: 'Vue', version: 3 })
get(state, 'name') // 'Vue' (类型推断为 string)
get(state, 'version') // 3 (类型推断为 number)

// 场景 3：获取普通对象的属性
const config = { debug: true, level: 5 }
get(config, 'debug') // true

// 场景 4：类型安全
get(state, 'unknown') // 编译错误！属性不存在
```

**关键知识点**：
- **函数重载**：TypeScript 的核心特性，允许函数根据参数类型返回不同类型
- **泛型约束**：`K extends keyof T` 确保类型安全
- **索引访问类型**：`T[K]` 用于获取对象属性的类型

**为什么需要两个重载签名？**

```ts
// 签名 1：只传 ref，返回整个值
get(ref(42)) // 返回 number

// 签名 2：传 ref 和 key，返回属性值
get(ref({ a: 1, b: 2 }), 'a') // 返回 number（属性 a 的类型）
```

如果没有重载，TypeScript 无法精确推断返回类型。

---

### 3. set - 安全的值设置

**文件位置**：packages/shared/set/index.ts`

```ts
import type { Ref } from 'vue'

export function set<T>(ref: Ref<T>, value: T): void
export function set<O extends object, K extends keyof O>(target: O, key: K, value: O[K]): void

/**
 *  Shorthand for `ref.value = x`
 */
export function set(...args: any[]) {
  if (args.length === 2) {
    const [ref, value] = args
    ref.value = value
  }
  if (args.length === 3) {
    const [target, key, value] = args
    target[key] = value
  }
}
```

**代码解析**：

1. **函数重载**：定义了两个重载签名
   - `set<T>(ref: Ref<T>, value: T): void` - 设置 Ref 的值
   - `set<O extends object, K extends keyof O>(target: O, key: K, value: O[K]): void` - 设置对象的属性

2. **泛型约束**：
   - `O extends object`：确保 target 是对象类型
   - `K extends keyof O`：确保 key 是对象的有效属性名
   - `value: O[K]`：确保值的类型与属性类型匹配

3. **实现逻辑**：
   - 使用剩余参数 `...args` 收集所有参数
   - 根据参数数量判断调用方式
   - 2 个参数：设置 Ref 的 value 属性
   - 3 个参数：设置对象的特定属性

**使用场景**：

```ts
// 场景 1：设置 ref 的值
const count = ref(0)
set(count, 42) // count.value = 42

// 场景 2：设置 reactive 对象的属性
const state = ref({ name: 'Vue', version: 3 })
set(state, 'name', 'Vue 3') // state.value.name = 'Vue 3'
set(state, 'version', 4)    // state.value.version = 4

// 场景 3：类型安全
set(state, 'unknown', 'value') // 编译错误！属性不存在
set(state, 'name', 123)        // 编译错误！类型不匹配

// 场景 4：批量设置（需要多次调用）
set(state, 'name', 'Vue 3')
set(state, 'version', 4)
```

**关键知识点**：
- **参数数量判断**：通过 `args.length` 区分不同的调用方式
- **类型安全的属性设置**：确保值的类型与属性类型匹配
- **与 get 的对称设计**：get 获取值，set 设置值，API 设计一致

**为什么不使用 `Object.assign`？**

```ts
// Object.assign 可以批量设置，但类型安全性差
Object.assign(state.value, { name: 'Vue 3', version: 4 })

// set 提供精确的类型检查
set(state, 'name', 'Vue 3')  // 类型安全
set(state, 'name', 123)      // 编译错误
```

---

### 4. isDefined - 类型守卫

**文件位置**：`packages/shared/isDefined/index.ts`

```ts
import type { ComputedRef, Ref } from 'vue'

// eslint-disable-next-line no-restricted-imports
import { unref } from 'vue'

export type IsDefinedReturn = boolean

export function isDefined<T>(v: ComputedRef<T>): v is ComputedRef<Exclude<T, null | undefined>>
export function isDefined<T>(v: Ref<T>): v is Ref<Exclude<T, null | undefined>>
export function isDefined<T>(v: T): v is Exclude<T, null | undefined>
export function isDefined<T>(v: Ref<T>): IsDefinedReturn {
  return unref(v) != null
}
```

**代码解析**：

1. **函数重载**：定义了三个重载签名，分别处理：
   - `ComputedRef<T>` - 计算属性
   - `Ref<T>` - 响应式引用
   - `T` - 普通值

2. **类型谓词**：`v is Exclude<T, null | undefined>`
   - 这是 TypeScript 的类型守卫语法
   - 当函数返回 `true` 时，TypeScript 会缩小变量的类型范围
   - `Exclude<T, null | undefined>`：从类型 T 中排除 null 和 undefined

3. **实现逻辑**：
   - 使用 `unref(v)` 获取值（处理 Ref 和普通值）
   - 使用 `!= null` 同时检查 null 和 undefined

**使用场景**：

```ts
// 场景 1：检查 ref 是否有值
const maybeValue = ref<string | null>(null)

if (isDefined(maybeValue)) {
  // TypeScript 知道 maybeValue 是 Ref<string>，不是 Ref<string | null>
  console.log(maybeValue.value.length) // 安全访问
}

// 场景 2：检查 computed 是否有值
const computedValue = computed(() => someCondition.value ? 'value' : null)

if (isDefined(computedValue)) {
  // TypeScript 知道 computedValue 是 ComputedRef<string>
  console.log(computedValue.value.toUpperCase())
}

// 场景 3：检查普通值
function processValue(value: string | null | undefined) {
  if (isDefined(value)) {
    // TypeScript 知道 value 是 string
    console.log(value.length)
  }
}

// 场景 4：在数组过滤中使用
const values = [ref('a'), ref(null), ref('b'), ref(undefined)]
const definedValues = values.filter(isDefined)
// 类型为 Ref<string>[]，过滤掉了 null 和 undefined
```

**关键知识点**：

1. **类型守卫（Type Guard）**：
   - 返回类型为 `v is SomeType` 的函数
   - 在条件语句中使用时，TypeScript 会自动缩小变量类型

2. **Exclude 类型工具**：
   ```ts
   type Exclude<T, U> = T extends U ? never : T
   
   // 示例
   type T = Exclude<string | null | undefined, null | undefined>
   // T = string
   ```

3. **类型缩小（Type Narrowing）**：
   ```ts
   let value: string | null = null
   
   if (isDefined(value)) {
     // 这里 value 的类型被缩小为 string
     console.log(value.length) // 安全
   }
   
   // 这里 value 的类型仍然是 string | null
   console.log(value?.length) // 需要可选链
   ```

**为什么需要三个重载签名？**

```ts
// 重载 1：处理 ComputedRef
const computed = computed(() => someCondition.value ? 'value' : null)
if (isDefined(computed)) {
  // 类型：ComputedRef<string>
}

// 重载 2：处理 Ref
const refValue = ref<string | null>(null)
if (isDefined(refValue)) {
  // 类型：Ref<string>
}

// 重载 3：处理普通值
const plainValue: string | null = null
if (isDefined(plainValue)) {
  // 类型：string
}
```

每个重载签名针对不同的输入类型，提供精确的类型推断。

---

## 综合练习

### 练习 1：理解 MaybeRef

```ts
import { ref, computed } from 'vue'
import { get } from '../packages/shared/get'

// 1. 以下哪些调用是合法的？
get(42)           // ✓ 普通值
get(ref(42))      // ✓ Ref
get(computed(() => 42)) // ✓ ComputedRef
get([1, 2, 3])    // ✓ 数组也是普通值
get(null)         // ✓ null 也是普通值

// 2. 解释为什么 get 可以接受这么多类型？
// 因为 MaybeRef<T> = T | Ref<T>，而 T 可以是任何类型
```

### 练习 2：函数重载

```ts
// 以下代码的返回类型分别是什么？
const obj = ref({ a: 1, b: 'hello', c: true })

get(obj)          // 类型：{ a: number, b: string, c: boolean }
get(obj, 'a')     // 类型：number
get(obj, 'b')     // 类型：string
get(obj, 'c')     // 类型：boolean
```

### 练习 3：类型守卫

```ts
import { ref } from 'vue'
import { isDefined } from '../packages/shared/isDefined'

const value = ref<string | null>(null)

// 1. 以下代码中，value 的类型是什么？
if (isDefined(value)) {
  // value 的类型：Ref<string>
  console.log(value.value.length)
}

// 2. 为什么需要类型守卫？
// 因为 TypeScript 无法自动推断 ref 内部值的类型变化

// 3. 尝试不用 isDefined，如何实现相同的效果？
if (value.value != null) {
  // 这里 value 的类型仍然是 Ref<string | null>
  // 需要使用 value.value.length，但 value.value 可能为 null
  console.log(value.value.length) // 编译错误！
}
```

### 练习 4：实际应用

```ts
import { ref, computed } from 'vue'
import { get, set, isDefined } from '../packages/shared'

// 实现一个安全的属性访问器
function safeGet<T, K extends keyof T>(
  obj: MaybeRef<T>,
  key: K
): T[K] | undefined {
  const value = get(obj)
  if (value == null) return undefined
  return value[key]
}

// 实现一个带验证的 setter
function validatedSet<T>(
  ref: Ref<T>,
  value: T,
  validator: (value: T) => boolean
): boolean {
  if (validator(value)) {
    set(ref, value)
    return true
  }
  return false
}

// 使用示例
const age = ref(0)
validatedSet(age, 25, (v) => v >= 0 && v <= 150) // true
validatedSet(age, -5, (v) => v >= 0 && v <= 150) // false
```

---

## 设计模式总结

### 1. 函数重载模式

**用途**：处理多种输入类型，提供精确的类型推断

**模式**：
```ts
function fn(arg: TypeA): ReturnTypeA
function fn(arg: TypeB): ReturnTypeB
function fn(arg: any): any {
  // 实现
}
```

**优势**：
- 类型安全：TypeScript 在编时检查参数类型
- 代码补全：IDE 提供精确的代码提示
- 自文档化：函数签名清晰表达意图

### 2. 类型守卫模式

**用途**：在运行时缩小变量的类型范围

**模式**：
```ts
function isType(value: unknown): value is SomeType {
  return /* 类型检查逻辑 */
}
```

**优势**：
- 类型安全：TypeScript 在条件分支中自动推断类型
- 代码简洁：避免重复的类型断言
- 可复用：封装类型检查逻辑

### 3. MaybeRef 模式

**用途**：统一处理普通值和响应式值

**模式**：
```ts
type MaybeRef<T> = T | Ref<T>

function useSomething(value: MaybeRef<T>) {
  const unwrapped = unref(value) // 或 toValue(value)
  // 使用 unwrapped
}
```

**优势**：
- API 灵活：用户可以选择传入普通值或 Ref
- 渐进式：可以逐步将静态值改为响应式值
- 易于测试：普通值更容易测试

---

## 常见问题

### Q1: 为什么不直接使用 `ref.value`？

**A1**：
1. **类型安全**：`get` 提供类型推断，避免手动类型断言
2. **统一 API**：处理 MaybeRef，无需判断是 Ref 还是普通值
3. **代码简洁**：`get(ref)` 比 `ref.value` 更简洁

### Q2: `set` 和直接赋值有什么区别？

**A2**：
1. **类型安全**：`set` 检查值类型是否匹配属性类型
2. **统一 API**：可以同时处理 Ref 和对象属性
3. **可读性**：`set(state, 'name', 'Vue')` 明确表达意图

### Q3: 什么时候使用 `isDefined`？

**A3**：
1. **处理可能为 null/undefined 的 Ref**
2. **在条件语句中缩小类型范围**
3. **过滤数组中的 null/undefined 值**

### Q4: `toValue` 和 `unref` 什么时候用哪个？

**A4**：
- **`unref`**：只处理 Ref 和普通值，Vue 3.0+
- **`toValue`**：还支持 getter 函数，Vue 3.3+
- **推荐**：使用 `toValue`，因为它更通用

---

## 扩展阅读

1. **TypeScript 官方文档**
   - [函数重载](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)
   - [类型守卫](https://www.typescriptlang.org/docs/handbook/2/types-from-expressions.html#type-predicates)
   - [泛型约束](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)

2. **Vue 3 文档**
   - [响应式基础](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
   - [computed](https://vuejs.org/api/reactivity-core.html#computed)
   - [ref](https://vuejs.org/api/reactivity-core.html#ref)

3. **VueUse 源码**
   - [shared/utils/types.ts](./packages/shared/utils/types.ts) - 核心类型定义
   - [shared/get/index.ts](./packages/shared/get/index.ts) - get 函数实现
   - [shared/set/index.ts](./packages/shared/set/index.ts) - set 函数实现
   - [shared/isDefined/index.ts](./packages/shared/isDefined/index.ts) - isDefined 函数实现

---

## 学习检查清单

完成本阶段学习后，你应该能够：

- [ ] 解释 `MaybeRef<T>` 的含义和用途
- [ ] 写出带重载的 TypeScript 函数
- [ ] 使用类型守卫缩小类型范围
- [ ] 理解 `unref` 和 `toValue` 的区别
- [ ] 在实际项目中应用这些工具函数

---

## 笔记区

在这里记录你的学习心得和疑问：

### 我的理解


### 我的疑问


### 实践心得


---

**下一步**：完成本阶段后，进入 [阶段 2：状态管理 Composable](./stage-2/README.md)