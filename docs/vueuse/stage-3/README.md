# 阶段 3：定时器与生命周期管理

> 掌握定时器封装、生命周期管理和 SSR 兼容的核心模式

## 学习清单

| 序号 | 文件 | 行数 | 核心知识点 |
|------|------|------|-----------|
| 1 | `packages/shared/utils/is.ts` | 33 | 环境检测、类型守卫、SSR 兼容 |
| 2 | `packages/shared/tryOnScopeDispose/index.ts` | 15 | 安全的 onScopeDispose、守卫模式 |
| 3 | `packages/shared/tryOnMounted/index.ts` | 15 | 安全的 onMounted、同步/异步执行 |
| 4 | `packages/shared/useTimeoutFn/index.ts` | 83 | Stoppable 接口、命令模式、SSR 检测 |
| 5 | `packages/shared/useIntervalFn/index.ts` | 83 | Pausable 接口、响应式 interval |
| 6 | `packages/shared/useTimeout/index.ts` | 55 | 门面模式、条件返回类型、ComputedRef |
| 7 | `packages/shared/useInterval/index.ts` | 75 | 门面模式、条件返回类型、ShallowRef |

## 学习目标

- [ ] 理解 `isClient` 的 SSR 安全作用
- [ ] 掌握 `tryOnScopeDispose` 和 `tryOnMounted` 的守卫模式
- [ ] 掌握 `Stoppable` 和 `Pausable` 接口设计
- [ ] 掌握条件返回类型的重载技巧
- [ ] 理解定时器的生命周期清理机制

## 详细文档

本阶段已为每个 hook 创建了详细的注释文档：

| 文档 | 内容 |
|------|------|
| [is.ts.md](./is.ts.md) | 环境检测和基础工具函数 |
| [tryOnScopeDispose.md](./tryOnScopeDispose.md) | 安全的 onScopeDispose |
| [tryOnMounted.md](./tryOnMounted.md) | 安全的 onMounted |
| [useTimeoutFn.md](./useTimeoutFn.md) | 带控制功能的 setTimeout 封装 |
| [useIntervalFn.md](./useIntervalFn.md) | 带控制功能的 setInterval 封装 |
| [useTimeout.md](./useTimeout.md) | 简化的 setTimeout 封装 |
| [useInterval.md](./useInterval.md) | 简化的 setInterval 封装 |

## 学习路径

### 顺序阅读建议

```
is.ts → tryOnScopeDispose → tryOnMounted
  → useTimeoutFn（重点精读）
  → useIntervalFn（重点精读）
  → useTimeout → useInterval
```

### 每个文件的学习重点

| 文件 | 学习重点 |
|------|---------|
| `is.ts` | 理解 `isClient` 的作用，类型守卫语法 |
| `tryOnScopeDispose` | 理解守卫模式，Effect Scope 生命周期 |
| `tryOnMounted` | 理解同步/异步执行策略 |
| `useTimeoutFn` | **重点**：Stoppable 接口、命令模式、SSR 兼容 |
| `useIntervalFn` | **重点**：Pausable 接口、响应式 interval |
| `useTimeout` | 理解门面模式、条件返回类型 |
| `useInterval` | 理解门面模式、条件返回类型 |

## 核心概念总结

### 1. SSR 兼容

```ts
const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'

// 使用
if (isClient) {
  window.addEventListener('resize', handler)
}
```

### 2. 守卫模式

```ts
// 安全的生命周期钩子
export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
```

### 3. Stoppable 接口

```ts
interface Stoppable<Args extends any[] = any[]> {
  readonly isPending: Readonly<ShallowRef<boolean>>
  start: (...args: Args) => void
  stop: () => void
}
```

### 4. Pausable 接口

```ts
interface Pausable {
  readonly isActive: Readonly<ShallowRef<boolean>>
  pause: () => void
  resume: () => void
}
```

### 5. 条件返回类型

```ts
// 重载签名
export function useTimeout(interval?, options?: UseTimeoutOptions<false>): ComputedRef<boolean>
export function useTimeout(interval, options: UseTimeoutOptions<true>): { ready: ComputedRef<boolean> } & Stoppable
```

## 练习

### 练习 1：理解 SSR 兼容

阅读 `is.ts`，理解 `isClient` 为什么需要同时检查 `window` 和 `document`。

### 练习 2：理解守卫模式

阅读 `tryOnScopeDispose` 和 `tryOnMounted`，理解它们如何安全地调用生命周期钩子。

### 练习 3：实现 useTimeoutFn

自己实现一个简单的 `useTimeoutFn`，包含：
- `isPending` 状态
- `start` 和 `stop` 函数
- SSR 兼容
- 生命周期清理

### 练习 4：理解条件返回类型

阅读 `useTimeout` 和 `useInterval`，理解：
- 函数重载签名的作用
- 泛型参数如何区分不同的返回类型
- `shallowReadonly` 的作用

## 设计模式总结

| 模式 | 使用场景 | 示例 |
|------|---------|------|
| 守卫模式 | 安全调用可能失败的操作 | `tryOnScopeDispose`、`tryOnMounted` |
| 命令模式 | 将操作封装为对象 | `useTimeoutFn`、`useIntervalFn` |
| 门面模式 | 简化复杂接口 | `useTimeout`、`useInterval` |
| 条件返回类型 | 根据参数返回不同类型 | `useTimeout`、`useInterval` |

## 笔记

```
在此记录你的学习笔记...

```
