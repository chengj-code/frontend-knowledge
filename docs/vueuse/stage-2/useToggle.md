# useToggle 源码详细注释

> 一个带切换功能的布尔值 ref，是 VueUse 中最基础的 composable 之一

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/useToggle/index.ts` |
| 代码行数 | 54 行 |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `shallowRef`、`isRef`、`toValue` |
| 设计模式 | 策略模式 |
| 核心知识点 | 条件返回类型、函数重载、`as const` |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { MaybeRef, MaybeRefOrGetter, Ref, ShallowRef } from 'vue'
// 💡 MaybeRef<T> = T | Ref<T>     → 表示"可能是 Ref 也可能是普通值"
// 💡 MaybeRefOrGetter<T> = T | Ref<T> | (() => T)  → 比 MaybeRef 多了 getter 函数
// 💡 Ref<T>                      → Vue 的响应式引用类型
// 💡 ShallowRef<T>               → 浅层响应式引用，只追踪 .value 变化，不深度追踪
// ⚠️ 注意：这里用 `import type` 只导入类型，不会产生运行时代码

import { isRef, shallowRef, toValue } from 'vue'
// 💡 isRef(val)     → 判断一个值是否是 Ref
// 💡 shallowRef(val) → 创建一个浅层响应式引用
// 💡 toValue(val)   → 如果是 Ref 返回 .value，如果是 getter 返回调用结果，否则返回原值

// ============================================================
// 第二部分：类型定义
// ============================================================

type ToggleFn = (value?: boolean) => void
// 💡 定义 toggle 函数的类型
// ⚠️ 参数是可选的 boolean：
//    - 传参时：直接设置为指定值
//    - 不传参时：切换当前值（true↔false）

export type UseToggleReturn = [ShallowRef<boolean>, ToggleFn] | ToggleFn
// 💡 返回值类型是一个联合类型：
//    - [ShallowRef<boolean>, ToggleFn] → 元组形式（当传入普通值时）
//    - ToggleFn                        → 单独函数（当传入 Ref 时）
// ⚠️ 这个类型定义是简化版，实际重载签名更精确

export interface UseToggleOptions<Truthy, Falsy> {
  // 💡 策略模式的核心：通过 options 配置 truthy/falsy 值
  // 💡 泛型参数 Truthy 和 Falsy 允许自定义真值/假值的类型
  truthyValue?: MaybeRefOrGetter<Truthy>
  // 💡 自定义"真值"，默认为 true
  // 💡 支持 MaybeRefOrGetter：可以是普通值、Ref 或 getter 函数

  falsyValue?: MaybeRefOrGetter<Falsy>
  // 💡 自定义"假值"，默认为 false
}

// ============================================================
// 第三部分：函数重载签名（⭐ 核心知识点）
// ============================================================

// ⭐ 重载签名 1：当传入 Ref 时，只返回 toggle 函数
export function useToggle<Truthy, Falsy, T = Truthy | Falsy>(
  initialValue: Ref<T>,           // 💡 参数类型是 Ref<T>，不是 MaybeRef<T>
  options?: UseToggleOptions<Truthy, Falsy>
): (value?: T) => T               // 💡 返回值是单个函数，不是元组
// 💡 为什么传入 Ref 时只返回函数？
//    因为外部已经有了 Ref，不需要 composable 再创建一个
//    所以只返回 toggle 函数，由外部自己管理 Ref

// ⭐ 重载签名 2：当传入普通值（或不传）时，返回 [ref, toggle] 元组
export function useToggle<Truthy = true, Falsy = false, T = Truthy | Falsy>(
  initialValue?: T,               // 💡 参数类型是普通值 T
  options?: UseToggleOptions<Truthy, Falsy>
): [ShallowRef<T>, (value?: T) => T]  // 💡 返回元组：[ref, toggle函数]
// 💡 泛型默认值：Truthy = true, Falsy = false
// 💡 这是 TypeScript 函数重载的典型用法：
//    - 重载签名 1 更具体（Ref<T>），放在前面
//    - 重载签名 2 更通用（T），放在后面
//    TypeScript 会按顺序匹配，先匹配到具体的

// ============================================================
// 第四部分：函数实现
// ============================================================

/**
 * A boolean ref with a toggler
 *
 * @see https://vueuse.org/useToggle
 * @param [initialValue] 初始值，默认为 false
 * @param options 配置选项，可自定义 truthy/falsy 值
 */
export function useToggle(
  initialValue: MaybeRef<boolean> = false,  // 💡 MaybeRef<boolean> 兼容 Ref 和普通值
  options: UseToggleOptions<true, false> = {},  // 💡 默认 options 为空对象
): UseToggleReturn {  // 💡 返回类型是前面定义的联合类型

  // 💡 解构 options，设置默认值
  const {
    truthyValue = true,   // 默认真值为 true
    falsyValue = false,   // 默认假值为 false
  } = options

  const valueIsRef = isRef(initialValue)
  // 💡 判断传入的 initialValue 是否是 Ref
  // 💡 这个变量决定了最终返回什么：
  //    - true  → 只返回 toggle 函数（因为外部已有 Ref）
  //    - false → 返回 [ref, toggle] 元组

  const _value = shallowRef(initialValue) as ShallowRef<boolean>
  // 💡 无论传入的是 Ref 还是普通值，都用 shallowRef 包装
  // 💡 如果传入的是 Ref，shallowRef 会解包：
  //    shallowRef(ref(0)) → shallowRef(0)（不是嵌套的 ref）
  // ⚠️ `as ShallowRef<boolean>` 是类型断言，因为 shallowRef 的泛型推导可能不准确

  // 💡 定义 toggle 函数
  function toggle(value?: boolean) {
    // ⭐ arguments.length 检查是否传入了参数
    // 💡 这比 `value !== undefined` 更准确：
    //    - toggle(undefined) → arguments.length === 1 → 进入 if 分支
    //    - toggle()          → arguments.length === 0 → 进入 else 分支
    if (arguments.length) {
      // 💡 有参数时：直接设置为指定值
      _value.value = value!  // 💡 `!` 是非空断言，因为重载签名保证了 value 存在
      return _value.value
    }
    else {
      // 💡 无参数时：切换当前值
      const truthy = toValue(truthyValue)
      // 💡 toValue 会解包 Ref 和调用 getter
      // 💡 如果 truthyValue 是 ref(true) 或 () => true，都会得到 true

      _value.value = _value.value === truthy
        ? toValue(falsyValue)  // 💡 当前是真值 → 切换为假值
        : truthy               // 💡 当前是假值 → 切换为真值
      return _value.value
    }
  }

  // ⭐ 关键：根据输入类型返回不同的结果
  if (valueIsRef)
    return toggle        // 💡 传入 Ref → 只返回 toggle 函数
  else
    return [_value, toggle] as const
    // 💡 传入普通值 → 返回 [ref, toggle] 元组
    // ⭐ as const 的作用：
    //    - 没有 as const：类型是 [ShallowRef<boolean>, ToggleFn]
    //    - 有 as const：类型是 readonly [ShallowRef<boolean>, ToggleFn]
    //    - 更重要的是，as const 让 TypeScript 推导出字面量类型
    //    - 这使得解构时类型更精确：const [value, toggle] = useToggle()
}
```

---

## 设计模式解析

### 策略模式

```ts
// 策略模式：通过 options 配置不同的行为
const [value, toggle] = useToggle(false, {
  truthyValue: 'on',    // 自定义真值为字符串 'on'
  falsyValue: 'off',    // 自定义假值为字符串 'off'
})

toggle()  // value: 'off' → 'on'
toggle()  // value: 'on' → 'off'
```

**策略模式的核心思想：** 将算法（真值/假值的定义）从使用方（toggle 函数）中分离出来，通过 options 注入。

### 条件返回类型

```ts
// TypeScript 重载签名 + 运行时判断
if (valueIsRef)
  return toggle        // 只返回函数
else
  return [_value, toggle] as const  // 返回元组
```

**为什么这样设计？**
- 传入 Ref 时：外部已经有 Ref，composable 不需要再创建一个，只提供 toggle 功能
- 传入普通值时：composable 需要创建 Ref 并返回，供外部使用

---

## TypeScript 技巧总结

### 1. MaybeRef<T>

```ts
type MaybeRef<T> = T | Ref<T>
// 💡 允许函数同时接受普通值和 Ref
// 💡 这是 VueUse 最基础的类型概念，几乎所有 composable 都用到
```

### 2. 函数重载

```ts
// 重载签名 1：更具体（Ref<T>）
export function useToggle<...>(initialValue: Ref<T>, ...): (value?: T) => T

// 重载签名 2：更通用（T）
export function useToggle<...>(initialValue?: T, ...): [ShallowRef<T>, (value?: T) => T]
```

**规则：**
- 更具体的签名放在前面
- TypeScript 按顺序匹配，第一个匹配到的重载生效

### 3. as const

```ts
return [_value, toggle] as const
```

**作用：**
- 让 TypeScript 推导出 `readonly [ShallowRef<boolean>, ToggleFn]` 类型
- 而不是宽泛的 `(ShallowRef<boolean> | ToggleFn)[]`
- 使得解构时类型精确：`const [value, toggle] = useToggle()`

### 4. arguments.length

```ts
if (arguments.length) { ... }
```

**vs**

```ts
if (value !== undefined) { ... }
```

**区别：**
- `arguments.length`：检测是否传了参数，`toggle(undefined)` 也算传了参数
- `value !== undefined`：检测参数值，`toggle(undefined)` 会进入 else 分支

---

## 使用示例

### 基本用法

```ts
const [value, toggle] = useToggle()
// value.value === false
toggle()
// value.value === true
toggle()
// value.value === false
```

### 传入 Ref

```ts
const myRef = ref(true)
const toggle = useToggle(myRef)
// myRef.value === true
toggle()
// myRef.value === false
```

### 自定义 truthy/falsy 值

```ts
const [status, toggle] = useToggle('off', {
  truthyValue: 'on',
  falsyValue: 'off',
})
// status.value === 'off'
toggle()
// status.value === 'on'
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useCounter` | 同级 | 都是状态管理 composable |
| `shallowRef` | 依赖 | 创建响应式状态 |
| `isRef` | 依赖 | 判断输入类型 |
| `toValue` | 依赖 | 解包 Ref/getter |

---

## 练习

1. 阅读源码，理解 `arguments.length` 和 `value !== undefined` 的区别
2. 尝试用 `useCounter` 实现类似 `useToggle` 的功能
3. 思考：为什么用 `shallowRef` 而不是 `ref`？

---

## 笔记

```
在此记录你的学习笔记...

```
