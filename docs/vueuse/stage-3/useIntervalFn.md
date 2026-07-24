# useIntervalFn 源码详细注释

> 带控制功能的 setInterval 封装，是 Pausable 接口的典型实现

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/useIntervalFn/index.ts` |
| 代码行数 | 83 行 |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | `shallowRef`、`shallowReadonly`、`toValue`、`watch`、`tryOnScopeDispose` |
| 设计模式 | 命令模式、守卫模式 |
| 核心知识点 | Pausable 接口、响应式 interval、SSR 检测 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { MaybeRefOrGetter } from 'vue'
// 💡 MaybeRefOrGetter<T> = T | Ref<T> | (() => T)
// 💡 比 MaybeRef 多了 getter 函数支持

import type { Fn, Pausable } from '../utils'
// 💡 Fn = () => void
// 💡 Pausable 接口：
//    - isActive: Readonly<ShallowRef<boolean>>
//    - pause: () => void
//    - resume: () => void

// ============================================================
// 第二部分：Vue API 和工具导入
// ============================================================

import { isRef, shallowReadonly, shallowRef, toValue, watch } from 'vue'
// 💡 isRef → 判断是否是 Ref
// 💡 shallowReadonly → 创建浅层只读代理
// 💡 shallowRef → 创建浅层响应式引用
// 💡 toValue → 解包 Ref 或调用 getter
// 💡 watch → 监听响应式数据变化

import { tryOnScopeDispose } from '../tryOnScopeDispose'
// 💡 安全的 onScopeDispose

import { isClient } from '../utils'
// 💡 SSR 环境检测

// ============================================================
// 第三部分：选项接口定义
// ============================================================

export interface UseIntervalFnOptions {
  /**
   * Start the timer immediately
   *
   * @default true
   */
  immediate?: boolean
  // 💡 是否立即启动定时器
  // 💡 默认为 true，创建时就开始计时

  /**
   * Execute the callback immediately after calling `resume`
   *
   * @default false
   */
  immediateCallback?: boolean
  // 💡 调用 resume() 时是否立即执行回调
  // 💡 默认为 false，等待 interval 时间后才执行
}

// ============================================================
// 第四部分：返回类型定义
// ============================================================

export type UseIntervalFnReturn = Pausable
// 💡 返回类型是 Pausable 接口
// 💡 Pausable = {
//   isActive: Readonly<ShallowRef<boolean>>
//   pause: () => void
//   resume: () => void
// }

// ============================================================
// 第五部分：函数实现（⭐ 核心）
// ============================================================

/**
 * Wrapper for `setInterval` with controls
 *
 * @param cb 回调函数
 * @param interval 间隔时间（毫秒），支持响应式
 * @param options 配置选项
 */
export function useIntervalFn(cb: Fn, interval: MaybeRefOrGetter<number> = 1000, options: UseIntervalFnOptions = {}): UseIntervalFnReturn {
  // ⭐ 解构选项，设置默认值
  const {
    immediate = true,
    immediateCallback = false,
  } = options

  let timer: ReturnType<typeof setInterval> | null = null
  // 💡 定时器 ID，用于清除定时器
  // 💡 `let` 而非 `const`，因为需要重新赋值
  // 💡 初始值为 null，表示没有活跃的定时器

  const isActive = shallowRef(false)
  // 💡 表示定时器是否正在运行
  // 💡 用于 UI 显示状态或禁用按钮

  // ⭐ 清除定时器的内部函数
  function clean() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  // ⭐ 暂停定时器
  function pause() {
    isActive.value = false
    clean()
  }
  // 💡 暂停时清除定时器，并标记为非活跃状态

  // ⭐ 恢复定时器
  function resume() {
    const intervalValue = toValue(interval)
    if (intervalValue <= 0)
      return
    // 💡 间隔时间必须大于 0，否则不启动

    isActive.value = true
    // 💡 标记为活跃状态

    if (immediateCallback)
      cb()
    // 💡 如果 immediateCallback 为 true，立即执行回调

    clean()
    // 💡 清除之前的定时器，防止重复

    if (isActive.value)
      timer = setInterval(cb, intervalValue)
    // 💡 重新创建定时器
    // 💡 检查 isActive 是因为 immediateCallback 中可能调用了 pause()
  }

  // ⭐ 初始化逻辑
  if (immediate && isClient)
    resume()
  // 💡 SSR 安全：只在客户端启动定时器
  // 💡 服务端渲染时，定时器不会启动

  // ⭐ 响应式 interval 监听
  if (isRef(interval) || typeof interval === 'function') {
    const stopWatch = watch(interval, () => {
      if (isActive.value && isClient)
        resume()
    })
    tryOnScopeDispose(stopWatch)
  }
  // 💡 如果 interval 是 Ref 或 getter，监听其变化
  // 💡 变化时自动重启定时器（如果正在运行）
  // 💡 自动清理 watcher

  // ⭐ 注册清理函数
  tryOnScopeDispose(pause)
  // 💡 当组件卸载或 scope 销毁时，自动暂停定时器
  // 💡 防止内存泄漏

  // ⭐ 返回控制接口
  return {
    isActive: shallowReadonly(isActive),
    pause,
    resume,
  }
  // 💡 isActive 是只读的，外部不能直接修改
  // 💡 pause 和 resume 是控制函数
}
```

---

## 设计模式解析

### 命令模式

```ts
// 命令模式：将操作封装为对象
const { pause, resume, isActive } = useIntervalFn(callback, 1000)

// 执行命令
resume()

// 暂停命令
pause()

// 查询状态
console.log(isActive.value)
```

**命令模式的核心思想：** 将请求封装为对象，从而支持：
- 参数化命令（resume 可以传参数）
- 暂停命令（pause）
- 恢复命令（resume）

### Pausable 接口

```ts
interface Pausable {
  readonly isActive: Readonly<ShallowRef<boolean>>
  pause: () => void
  resume: () => void
}
```

**Pausable 的设计：**
- `isActive`：只读的响应式状态，用于 UI 显示
- `pause`：暂停命令
- `resume`：恢复命令

---

## 响应式 interval

```ts
if (isRef(interval) || typeof interval === 'function') {
  const stopWatch = watch(interval, () => {
    if (isActive.value && isClient)
      resume()
  })
  tryOnScopeDispose(stopWatch)
}
```

**响应式 interval 的作用：**
1. 如果 interval 是 Ref，修改其值会自动重启定时器
2. 如果 interval 是 getter，返回值变化会自动重启定时器
3. 只有在定时器活跃时才重启

**使用场景：**
```ts
const delay = ref(1000)
const { isActive } = useIntervalFn(callback, delay)

// 修改间隔时间，定时器自动重启
delay.value = 2000
```

---

## SSR 兼容设计

```ts
if (immediate && isClient)
  resume()
```

**为什么需要 `isClient` 检查？**
- `setInterval` 是浏览器 API，Node.js 中不可用
- SSR 时如果调用 `setInterval`，会报错
- 所以只在客户端启动定时器

---

## 生命周期清理

```ts
tryOnScopeDispose(pause)
```

**清理逻辑：**
1. 组件卸载时 → `onScopeDispose` 触发 → `pause()` 被调用
2. `pause()` 会：
   - 设置 `isActive.value = false`
   - 调用 `clearInterval(timer)` 清除定时器
   - 设置 `timer = null`

**防止内存泄漏：**
- 如果不清理，定时器回调会在组件卸载后执行
- 回调可能访问已销毁的组件实例，导致错误
- 定时器本身也会阻止垃圾回收

---

## 使用示例

### 基本用法

```ts
const { isActive, pause, resume } = useIntervalFn(() => {
  console.log('tick')
}, 1000)

// 默认立即启动
// 每秒输出 "tick"

console.log(isActive.value) // true（正在运行）
```

### 延迟启动

```ts
const { pause, resume } = useIntervalFn(callback, 1000, {
  immediate: false,
})

// 手动启动
resume()

// 手动暂停
pause()
```

### 立即执行回调

```ts
const { resume } = useIntervalFn(callback, 1000, {
  immediateCallback: true,
})

// 调用 resume() 时立即执行 callback
// 之后每秒执行一次
resume()
```

### 响应式间隔

```ts
const delay = ref(1000)
const { isActive } = useIntervalFn(callback, delay)

// 修改间隔时间，定时器自动重启
delay.value = 2000
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useInterval` | 依赖 useIntervalFn | 门面模式封装 |
| `useTimeoutFn` | 同级 | 类似的 setTimeout 封装 |
| `tryOnScopeDispose` | 被依赖 | 生命周期清理 |
| `isClient` | 被依赖 | SSR 检测 |

---

## 练习

1. 阅读源码，理解 `Pausable` 接口的设计
2. 理解响应式 interval 的监听逻辑
3. 思考：为什么在 `resume()` 中检查 `isActive.value`？
4. 练习：实现一个简单的 `useIntervalFn`

---

## 笔记

```
在此记录你的学习笔记...

```
