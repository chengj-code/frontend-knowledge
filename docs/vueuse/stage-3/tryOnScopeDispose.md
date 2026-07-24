# tryOnScopeDispose 源码详细注释

> 安全的 onScopeDispose，是 VueUse 中所有资源清理的基石

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/tryOnScopeDispose/index.ts` |
| 代码行数 | 15 行 |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `getCurrentScope`、`onScopeDispose`（Vue 内置） |
| 设计模式 | 守卫模式 |
| 核心知识点 | Effect Scope 生命周期、安全注册清理函数 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { Fn } from '../utils'
// 💡 Fn 类型：() => void 的别名
// 💡 表示一个无参数、无返回值的函数

// ============================================================
// 第二部分：Vue API 导入
// ============================================================

import { getCurrentScope, onScopeDispose } from 'vue'
// 💡 getCurrentScope() → 获取当前的 EffectScope 实例
//    - 如果在 setup() 或 effectScope() 中调用，返回 scope 实例
//    - 如果在普通函数中调用，返回 undefined
// 💡 onScopeDispose(fn) → 注册清理函数，当 scope 销毁时执行
//    - 必须在 setup() 或 effectScope() 中调用
//    - 如果不在 scope 中调用，会抛出警告

// ============================================================
// 第三部分：函数实现（⭐ 核心）
// ============================================================

/**
 * Call onScopeDispose() if it's inside an effect scope lifecycle, if not, do nothing
 *
 * @param fn 要注册的清理函数
 */
export function tryOnScopeDispose(fn: Fn) {
  // ⭐ 核心逻辑：先检查是否在 scope 中
  if (getCurrentScope()) {
    // 💡 在 scope 中：安全地注册清理函数
    onScopeDispose(fn)
    return true
  }
  // 💡 不在 scope 中：静默跳过，不抛出警告
  return false
}
// ⭐ 设计思想：
//    - onScopeDispose 要求必须在 scope 中调用，否则会警告
//    - tryOnScopeDispose 包装了这个检查，提供安全的调用方式
//    - 这使得 composable 可以在任何地方调用，而不用担心警告
// 💡 使用场景：
//    - 在 setup() 中：正常注册清理函数
//    - 在普通函数中：静默跳过，不抛出警告
//    - 在测试中：不需要 mock scope，直接调用即可
```

---

## 设计模式解析

### 守卫模式

```ts
export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    // 有 scope → 注册清理函数
    onScopeDispose(fn)
    return true
  }
  // 无 scope → 静默跳过
  return false
}
```

**守卫模式的核心思想：** 在执行操作前先检查前置条件，如果条件不满足则安全退出，而不是抛出异常。

### 与 onScopeDispose 的对比

```ts
// ❌ 直接使用 onScopeDispose
function useMouse() {
  const handler = (e: MouseEvent) => { ... }
  window.addEventListener('mousemove', handler)
  onScopeDispose(() => window.removeEventListener('mousemove', handler))
  // ⚠️ 如果不在 scope 中调用，会抛出警告
}

// ✅ 使用 tryOnScopeDispose
function useMouse() {
  const handler = (e: MouseEvent) => { ... }
  window.addEventListener('mousemove', handler)
  tryOnScopeDispose(() => window.removeEventListener('mousemove', handler))
  // ✅ 如果不在 scope 中调用，静默跳过
}
```

---

## Effect Scope 生命周期

### 什么是 Effect Scope？

Effect Scope 是 Vue 3.2 引入的特性，用于管理响应式副作用的生命周期。

```ts
import { effectScope, onScopeDispose } from 'vue'

// 创建一个 scope
const scope = effectScope()

// 在 scope 中运行副作用
scope.run(() => {
  const count = ref(0)
  watch(count, () => console.log('count changed'))
  
  // 注册清理函数
  onScopeDispose(() => {
    console.log('scope disposed')
  })
})

// 销毁 scope（触发所有清理函数）
scope.stop()
// 输出: "scope disposed"
```

### Vue 组件的 scope

每个 Vue 组件的 `setup()` 函数都在一个隐式的 scope 中运行：

```ts
export default {
  setup() {
    // 这里自动在一个 scope 中
    const handler = () => { ... }
    window.addEventListener('resize', handler)
    
    // 组件销毁时自动清理
    onScopeDispose(() => {
      window.removeEventListener('resize', handler)
    })
  }
}
```

### getCurrentScope() 的返回值

```ts
// 在 setup() 中
getCurrentScope() → EffectScope 实例

// 在 effectScope() 中
getCurrentScope() → EffectScope 实例

// 在普通函数中
getCurrentScope() → undefined

// 在 scope.run() 的回调中
getCurrentScope() → EffectScope 实例
```

---

## 使用场景详解

### 场景 1：在 composable 中注册清理

```ts
export function useEventListener(target: EventTarget, event: string, handler: Fn) {
  target.addEventListener(event, handler)
  
  // 安全地注册清理函数
  tryOnScopeDispose(() => {
    target.removeEventListener(event, handler)
  })
}
```

### 场景 2：在 composable 中清理定时器

```ts
export function useIntervalFn(cb: Fn, interval: number) {
  const timer = setInterval(cb, interval)
  
  // 安全地注册清理函数
  tryOnScopeDispose(() => {
    clearInterval(timer)
  })
}
```

### 场景 3：在普通函数中调用 composable

```ts
function useMouse() {
  const x = ref(0)
  const handler = (e: MouseEvent) => { x.value = e.clientX }
  window.addEventListener('mousemove', handler)
  
  // 如果在普通函数中调用 useMouse，不会警告
  tryOnScopeDispose(() => {
    window.removeEventListener('mousemove', handler)
  })
  
  return { x }
}

// 在 setup() 中调用 ✅
setup() {
  const { x } = useMouse()
}

// 在普通函数中调用 ✅（不会警告）
function handleClick() {
  const { x } = useMouse()
}
```

---

## TypeScript 技巧总结

### 1. 返回值作为状态指示

```ts
export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true   // ✅ 成功注册
  }
  return false    // ❌ 未注册（不在 scope 中）
}
```

**作用：**
- 调用者可以根据返回值判断是否成功注册
- 但大多数情况下不需要检查，因为清理逻辑是"有则清理，无则跳过"

### 2. 类型导入

```ts
import type { Fn } from '../utils'
```

**`Fn` 的定义：**
```ts
type Fn = () => void
```

**作用：**
- 简化类型签名
- 保持一致性（整个项目都使用 Fn）

---

## 与其他工具的关系

```
┌─────────────────────────────────────────────────────────────┐
│                    tryOnScopeDispose                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ getCurrentScope()  →  检查是否在 scope 中          │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ onScopeDispose(fn)  →  注册清理函数                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         ↓ 被以下 composable 依赖
┌─────────────────────────────────────────────────────────────┐
│  useEventListener  │  useTimeoutFn  │  useIntervalFn  │ ... │
└─────────────────────────────────────────────────────────────┘
```

---

## 常见问题

### Q1: 为什么不直接使用 onScopeDispose？

**A:** `onScopeDispose` 要求必须在 scope 中调用，否则会抛出警告。`tryOnScopeDispose` 提供了安全的包装，使得 composable 可以在任何地方调用。

### Q2: 如果不在 scope 中调用，资源会泄漏吗？

**A:** 取决于使用场景：
- 如果在 setup() 中调用 composable，通常在 scope 中，会自动清理
- 如果在普通函数中调用，资源不会自动清理，需要手动管理

### Q3: 如何手动清理资源？

**A:** composable 通常返回清理函数：

```ts
const { stop } = useEventListener(target, event, handler)
// 手动清理
stop()
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useTimeoutFn` | 被依赖 | 使用 tryOnScopeDispose 清理定时器 |
| `useIntervalFn` | 被依赖 | 使用 tryOnScopeDispose 清理定时器 |
| `useEventListener` | 被依赖 | 使用 tryOnScopeDispose 清理事件监听 |
| `tryOnMounted` | 同级 | 都是生命周期安全包装 |

---

## 练习

1. 阅读源码，理解 `getCurrentScope()` 的返回值
2. 理解为什么需要 `tryOnScopeDispose` 而不是直接用 `onScopeDispose`
3. 思考：在普通函数中调用 composable 时，资源如何清理？
4. 练习：写一个简单的 composable，使用 `tryOnScopeDispose` 清理事件监听

---

## 笔记

```
在此记录你的学习笔记...

```
