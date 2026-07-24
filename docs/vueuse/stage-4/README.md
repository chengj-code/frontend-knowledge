# 阶段 4：事件过滤器与函数增强（2-3 天）

> 掌握 VueUse 最核心的抽象：EventFilter 系统

## 学习清单

| 序号 | 文件 | 行数 | 核心知识点 |
|------|------|------|-----------|
| 14 | `packages/shared/utils/filters.ts` | ~249 | EventFilter 抽象、debounce/throttle/pausable |
| 15 | `packages/shared/useDebounceFn/index.ts` | 26 | 装饰器模式 |
| 16 | `packages/shared/useThrottleFn/index.ts` | 33 | 装饰器模式 |
| 17 | `packages/shared/refDebounced/index.ts` | 29 | 组合模式 |
| 18 | `packages/shared/refThrottled/index.ts` | 32 | 组合模式 |
| 19 | `packages/shared/watchWithFilter/index.ts` | 32 | 带过滤器的 watch |
| 20 | `packages/shared/watchPausable/index.ts` | 41 | pausableFilter + watchWithFilter |
| 21 | `packages/shared/watchDebounced/index.ts` | 37 | debounceFilter + watchWithFilter |

## 详细文档

本阶段已为每个 hook 创建了详细的注释文档：

| 文档 | 内容 |
|------|------|
| [filters.ts.md](./filters.ts.md) | ⭐ EventFilter 系统（最核心） |
| [useDebounceFn.md](./useDebounceFn.md) | 装饰器模式：防抖函数 |
| [useThrottleFn.md](./useThrottleFn.md) | 装饰器模式：节流函数 |
| [refDebounced.md](./refDebounced.md) | 组合模式：防抖 ref |
| [refThrottled.md](./refThrottled.md) | 组合模式：节流 ref |
| [watchWithFilter.md](./watchWithFilter.md) | EventFilter + watch 桥梁 |
| [watchPausable.md](./watchPausable.md) | pausableFilter + watchWithFilter |
| [watchDebounced.md](./watchDebounced.md) | debounceFilter + watchWithFilter |

## 阅读顺序

```
filters.ts（⭐ 重点精读，建议花 1 天）
  → useDebounceFn → useThrottleFn
  → refDebounced → refThrottled
  → watchWithFilter → watchPausable → watchDebounced
```

## 学习目标

- [ ] **核心目标**：理解 `EventFilter` 抽象——VueUse 最重要的设计模式
- [ ] 理解 `createFilterWrapper` 的作用：将 EventFilter 应用到回调函数
- [ ] 理解 `debounceFilter` 的实现：支持 `maxWait` 和 `rejectOnCancel`
- [ ] 理解 `throttleFilter` 的实现：支持 `leading`/`trailing` 配置
- [ ] 理解 `pausableFilter` 的实现：返回 `pause`/`resume` 控制
- [ ] 掌握装饰器模式：用过滤器包装原函数
- [ ] 掌握组合模式：组合底层 hook 生成高级 hook

## 关键代码解读

**EventFilter 的核心抽象：**

```ts
// EventFilter 是一个高阶函数
// invoke: 实际要执行的回调
// options.abort: 用于 Promise 场景，取消等待中的过滤器
type EventFilter<T> = (invoke: Fn<T>, options: { abort: () => void }) => T

// 透传过滤器（默认行为）
export const bypassFilter: EventFilter = invoke => invoke()

// 防抖过滤器
export function debounceFilter(ms: number, options?: DebounceFilterOptions): EventFilter {
  return (invoke, { abort }) => {
    // ... setTimeout 逻辑
  }
}

// 将 EventFilter 应用到普通函数
export function createFilterWrapper<T>(filter: EventFilter, fn: T): T {
  return ((...args) => filter(() => fn(...args), { abort: () => { /* ... */ } })) as any
}
```

**useDebounceFn 的装饰器模式：**

```ts
export function useDebounceFn<T extends FunctionArgs>(
  fn: T,
  ms: MaybeRefOrGetter<number> = 200,
  options: DebounceFilterOptions = {},
): PromisifyFn<T> {
  return createFilterWrapper(
    debounceFilter(ms, options),  // 用防抖过滤器包装
    fn,
  )
}
```

**refDebounced 的组合模式：**

```ts
export function refDebounced<T>(value: Ref<T>, ms: number = 200): Readonly<Ref<T>> {
  const debounced = ref(value.value) as Ref<T>  // 创建新 ref
  const updater = useDebounceFn((val: T) => { debounced.value = val }, ms)  // 组合 useDebounceFn
  watch(value, updater)  // 监听原 ref，通过防抖函数更新新 ref
  return debounced
}
```

## 练习

1. 精读 `filters.ts`，理解每个过滤器的完整实现
2. 画出 `EventFilter` → `createFilterWrapper` → `useDebounceFn` 的调用链
3. 阅读 `watchWithFilter`，理解它如何将 EventFilter 应用到 watch
4. 阅读 `watchPausable`，理解 `pausableFilter` 如何实现 pause/resume
5. 练习：实现一个自定义的 `useRetryFn`，支持失败后自动重试

## 笔记

在这里记录你的学习笔记。