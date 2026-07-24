# tryOnMounted 源码详细注释

> 安全的 onMounted，在组件外也能立即执行

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/tryOnMounted/index.ts` |
| 代码行数 | 15 行 |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `getLifeCycleTarget`、`onMounted`、`nextTick` |
| 设计模式 | 守卫模式 |
| 核心知识点 | 生命周期安全、同步/异步执行 |

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

// eslint-disable-next-line no-restricted-imports
import { nextTick, onMounted } from 'vue'
// ⚠️ ESLint 注释：项目通常禁止直接导入 onMounted，这里是为了内部实现
// 💡 nextTick → 在下一个 DOM 更新周期后执行回调
// 💡 onMounted → 注册组件挂载后的回调

// ============================================================
// 第三部分：工具导入
// ============================================================

import { getLifeCycleTarget } from '../utils'
// 💡 getLifeCycleTarget(target?) → 获取当前组件实例
//    - 如果在 setup() 中调用，返回组件实例
//    - 如果不在组件中调用，返回 undefined

// ============================================================
// 第四部分：函数实现（⭐ 核心）
// ============================================================

/**
 * Call onMounted() if it's inside a component lifecycle, if not, just call the function
 *
 * @param fn 要执行的函数
 * @param sync if set to false, it will run in the nextTick() of Vue
 * @param target 目标组件实例（可选）
 */
export function tryOnMounted(fn: Fn, sync = true, target?: any) {
  // ⭐ 核心逻辑：先检查是否在组件中
  const instance = getLifeCycleTarget(target)
  
  if (instance)
    // 💡 在组件中：注册到 onMounted 生命周期
    onMounted(fn, target)
  else if (sync)
    // 💡 不在组件中，sync=true：立即执行
    fn()
  else
    // 💡 不在组件中，sync=false：在 nextTick 后执行
    nextTick(fn)
}
// ⭐ 设计思想：
//    - onMounted 要求必须在组件 setup() 中调用
//    - tryOnMounted 包装了这个检查，提供安全的调用方式
//    - 根据 sync 参数决定：组件内等挂载，组件外立即或异步执行
```

---

## 设计模式解析

### 守卫模式

```ts
export function tryOnMounted(fn: Fn, sync = true, target?: any) {
  const instance = getLifeCycleTarget(target)
  
  if (instance)
    // 在组件中 → 注册到 onMounted
    onMounted(fn, target)
  else if (sync)
    // 不在组件中，同步 → 立即执行
    fn()
  else
    // 不在组件中，异步 → nextTick 执行
    nextTick(fn)
}
```

**守卫模式的核心思想：** 根据环境选择不同的执行策略，而不是抛出异常。

### 三种执行策略

| 场景 | 执行策略 | 说明 |
|------|---------|------|
| 在组件中 | `onMounted(fn)` | 等待组件挂载后执行 |
| 不在组件中，sync=true | `fn()` | 立即执行 |
| 不在组件中，sync=false | `nextTick(fn)` | 等待 DOM 更新后执行 |

---

## 使用场景详解

### 场景 1：在 composable 中访问 DOM

```ts
export function useElementSize(element: Ref<HTMLElement | null>) {
  const width = ref(0)
  const height = ref(0)
  
  tryOnMounted(() => {
    // DOM 已就绪，可以安全访问
    if (element.value) {
      const rect = element.value.getBoundingClientRect()
      width.value = rect.width
      height.value = rect.height
    }
  })
  
  return { width, height }
}
```

### 场景 2：在 setup() 外调用 composable

```ts
// 在普通函数中调用
function initWidget() {
  tryOnMounted(() => {
    // 会立即执行（sync=true）
    console.log('widget initialized')
  })
}

// 在 setup() 中调用
setup() {
  tryOnMounted(() => {
    // 会等到组件挂载后执行
    console.log('component mounted')
  })
}
```

### 场景 3：异步执行

```ts
// sync=false 时，等待 DOM 更新后执行
tryOnMounted(() => {
  // 此时 DOM 已更新
  console.log('DOM updated')
}, false)
```

---

## getLifeCycleTarget 工具函数

### 源码

```ts
// packages/shared/utils/vue.ts
export function getLifeCycleTarget(target?: any) {
  return target || getCurrentInstance()
}
```

### 作用

```ts
// 1. 如果传了 target，直接返回
getLifeCycleTarget(myComponent) → myComponent

// 2. 如果没传 target，返回当前组件实例
getLifeCycleTarget() → getCurrentInstance() | undefined
```

---

## 与 tryOnScopeDispose 的对比

| 特性 | tryOnMounted | tryOnScopeDispose |
|------|-------------|-------------------|
| 生命周期 | 组件挂载后 | Scope 销毁时 |
| 执行时机 | 组件挂载时 | 组件卸载时 |
| 在组件外 | 立即执行或 nextTick | 静默跳过 |
| 返回值 | 无 | boolean |

---

## TypeScript 技巧总结

### 1. 默认参数

```ts
export function tryOnMounted(fn: Fn, sync = true, target?: any) {
  // sync 默认为 true
  // target 默认为 undefined
}
```

### 2. 类型断言

```ts
const instance = getLifeCycleTarget(target)
if (instance) {
  // instance 的类型是 ComponentInternalInstance
  onMounted(fn, target)
}
```

---

## 使用示例

### 基本用法

```ts
import { tryOnMounted } from '@vueuse/shared'

// 在 setup() 中
setup() {
  tryOnMounted(() => {
    console.log('component mounted')
  })
}

// 在普通函数中
function init() {
  tryOnMounted(() => {
    console.log('initialized')  // 立即执行
  })
}
```

### 异步执行

```ts
// sync=false
tryOnMounted(() => {
  console.log('DOM updated')
}, false)
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `tryOnScopeDispose` | 同级 | 都是生命周期安全包装 |
| `useEventListener` | 被依赖 | 使用 tryOnMounted 注册事件 |
| `useElementSize` | 被依赖 | 使用 tryOnMounted 访问 DOM |

---

## 练习

1. 阅读源码，理解 `getLifeCycleTarget` 的作用
2. 理解 `sync` 参数的不同行为
3. 思考：为什么需要 `nextTick` 而不是直接执行？
4. 练习：写一个 composable，使用 `tryOnMounted` 访问 DOM

---

## 笔记

```
在此记录你的学习笔记...

```
