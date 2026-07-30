# until 源码详细注释

> 响应式等待工具，支持链式 API 和类型翻转，基于建造者模式

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/until/index.ts` |
| 代码行数 | 232 行 |
| 所属包 | `@vueuse/shared` |
| 设计模式 | 建造者模式、Promise.race 超时控制 |
| 核心知识点 | 链式 API、类型翻转、getter 属性实现惰性 not |

---

## 核心类型定义

### UntilToMatchOptions 接口

```typescript
export interface UntilToMatchOptions {
  /**
   * Milliseconds timeout for promise to resolve/reject if the when condition does not meet.
   * 0 for never timed out
   *
   * @default 0
   */
  timeout?: number

  /**
   * Reject the promise when timeout
   *
   * @default false
   */
  throwOnTimeout?: boolean

  /**
   * `flush` option for internal watch
   *
   * @default 'sync'
   */
  flush?: WatchOptions['flush']

  /**
   * `deep` option for internal watch
   *
   * @default 'false'
   */
  deep?: WatchOptions['deep']
}
```

### UntilBaseInstance 基础接口

```typescript
export interface UntilBaseInstance<T, Not extends boolean = false> {
  // 匹配条件函数，支持类型守卫
  toMatch: (<U extends T = T>(
    condition: (v: T) => v is U,
    options?: UntilToMatchOptions
  ) => Not extends true ? Promise<Exclude<T, U>> : Promise<U>) & ((
    condition: (v: T) => boolean,
    options?: UntilToMatchOptions
  ) => Promise<T>)
  // 值变化一次后 resolve
  changed: (options?: UntilToMatchOptions) => Promise<T>
  // 值变化 n 次后 resolve
  changedTimes: (n?: number, options?: UntilToMatchOptions) => Promise<T>
}
```

### UntilValueInstance 值类型接口

```typescript
export interface UntilValueInstance<T, Not extends boolean = false> extends UntilBaseInstance<T, Not> {
  // getter 属性实现惰性 not，返回新的 Until 实例
  readonly not: UntilValueInstance<T, Not extends true ? false : true>

  // 等待值等于指定值
  toBe: <P = T>(value: MaybeRefOrGetter<P>, options?: UntilToMatchOptions) => Not extends true ? Promise<T> : Promise<P>
  // 等待值为真值（非 falsy）
  toBeTruthy: (options?: UntilToMatchOptions) => Not extends true ? Promise<T & Falsy> : Promise<Exclude<T, Falsy>>
  // 等待值为 null
  toBeNull: (options?: UntilToMatchOptions) => Not extends true ? Promise<Exclude<T, null>> : Promise<null>
  // 等待值为 undefined
  toBeUndefined: (options?: UntilToMatchOptions) => Not extends true ? Promise<Exclude<T, undefined>> : Promise<undefined>
  // 等待值为 NaN
  toBeNaN: (options?: UntilToMatchOptions) => Promise<T>
}
```

### UntilArrayInstance 数组类型接口

```typescript
export interface UntilArrayInstance<T> extends UntilBaseInstance<T> {
  // getter 属性实现惰性 not
  readonly not: UntilArrayInstance<T>
  // 等待数组包含指定值
  toContains: (value: MaybeRefOrGetter<ElementOf<ShallowUnwrapRef<T>>>, options?: UntilToMatchOptions) => Promise<T>
}
```

### Falsy 类型

```typescript
type Falsy = false | void | null | undefined | 0 | 0n | ''
```

---

## 核心实现

### createUntil 工厂函数

```typescript
function createUntil<T>(r: any, isNot = false) {
  // toMatch 是核心方法，所有其他方法都基于它实现
  function toMatch(
    condition: (v: any) => boolean,
    { flush = 'sync', deep = false, timeout, throwOnTimeout }: UntilToMatchOptions = {},
  ): Promise<T> {
    let stop: (() => void) | null = null
    // 创建 Promise，内部使用 watch 监听值变化
    const watcher = new Promise<T>((resolve) => {
      stop = watch(
        r,
        (v) => {
          // 条件满足时（考虑 isNot 翻转）
          if (condition(v) !== isNot) {
            if (stop)
              stop()
            else
              nextTick(() => stop?.())
            resolve(v)
          }
        },
        {
          flush,
          deep,
          immediate: true, // 立即检查当前值
        },
      )
    })

    const promises = [watcher]
    // 超时处理
    if (timeout != null) {
      promises.push(
        promiseTimeout(timeout, throwOnTimeout)
          .then(() => toValue(r))
          .finally(() => stop?.()),
      )
    }

    // 使用 Promise.race 实现超时
    return Promise.race(promises)
  }

  // toBe 支持 Ref 类型的值
  function toBe<P>(value: MaybeRefOrGetter<P | T>, options?: UntilToMatchOptions) {
    if (!isRef(value))
      return toMatch(v => v === value, options)

    // 当 value 是 Ref 时，监听两个源
    const { flush = 'sync', deep = false, timeout, throwOnTimeout } = options ?? {}
    let stop: (() => void) | null = null
    const watcher = new Promise<T>((resolve) => {
      stop = watch(
        [r, value],
        ([v1, v2]) => {
          if (isNot !== (v1 === v2)) {
            if (stop)
              stop()
            else
              nextTick(() => stop?.())
            resolve(v1)
          }
        },
        {
          flush,
          deep,
          immediate: true,
        },
      )
    })

    const promises = [watcher]
    if (timeout != null) {
      promises.push(
        promiseTimeout(timeout, throwOnTimeout)
          .then(() => toValue(r))
          .finally(() => {
            stop?.()
            return toValue(r)
          }),
      )
    }

    return Promise.race(promises)
  }

  // 以下方法都是 toMatch 的便捷封装
  function toBeTruthy(options?: UntilToMatchOptions) {
    return toMatch(v => Boolean(v), options)
  }

  function toBeNull(options?: UntilToMatchOptions) {
    return toBe<null>(null, options)
  }

  function toBeUndefined(options?: UntilToMatchOptions) {
    return toBe<undefined>(undefined, options)
  }

  function toBeNaN(options?: UntilToMatchOptions) {
    return toMatch(Number.isNaN, options)
  }

  function toContains(
    value: any,
    options?: UntilToMatchOptions,
  ) {
    return toMatch((v) => {
      const array = Array.from(v as any)
      return array.includes(value) || array.includes(toValue(value))
    }, options)
  }

  function changed(options?: UntilToMatchOptions) {
    return changedTimes(1, options)
  }

  function changedTimes(n = 1, options?: UntilToMatchOptions) {
    let count = -1 // skip the immediate check
    return toMatch(() => {
      count += 1
      return count >= n
    }, options)
  }

  // 根据类型返回不同的实例
  if (Array.isArray(toValue(r))) {
    const instance: UntilArrayInstance<T> = {
      toMatch: toMatch as any,
      toContains,
      changed,
      changedTimes,
      get not() {
        // getter 属性实现惰性 not，翻转 isNot 参数
        return createUntil(r, !isNot) as UntilArrayInstance<T>
      },
    }
    return instance
  }
  else {
    const instance: UntilValueInstance<T, boolean> = {
      toMatch: toMatch as any,
      toBe,
      toBeTruthy: toBeTruthy as any,
      toBeNull: toBeNull as any,
      toBeNaN,
      toBeUndefined: toBeUndefined as any,
      changed,
      changedTimes,
      get not() {
        // getter 属性实现惰性 not，翻转 isNot 参数
        return createUntil(r, !isNot) as UntilValueInstance<T, boolean>
      },
    }

    return instance
  }
}
```

### until 导出函数

```typescript
/**
 * Promised one-time watch for changes
 *
 * @see https://vueuse.org/until
 * @example
 * ```
 * const { count } = useCounter()
 *
 * await until(count).toMatch(v => v > 7)
 *
 * alert('Counter is now larger than 7!')
 * ```
 */
// 重载：数组类型返回 UntilArrayInstance
export function until<T extends unknown[]>(r: WatchSource<T> | MaybeRefOrGetter<T>): UntilArrayInstance<T>
// 重载：普通类型返回 UntilValueInstance
export function until<T>(r: WatchSource<T> | MaybeRefOrGetter<T>): UntilValueInstance<T>
// 实现
export function until<T>(r: any): UntilValueInstance<T> | UntilArrayInstance<T> {
  return createUntil(r)
}
```

---

## 设计模式分析

### 建造者模式（Builder Pattern）

until 使用建造者模式提供链式 API：

```typescript
// 链式调用示例
await until(count).toBe(7)
await until(count).not.toBe(0)
await until(count).toMatch(v => v > 7)
await until(count).changed()
await until(count).changedTimes(3)
await until(list).toContains('item')
```

**关键实现：**
- `get not()` getter 属性返回新的 Until 实例，实现惰性求值
- 每个方法返回 Promise，支持 await
- 根据数据类型（数组/值）返回不同的接口实例

### 类型翻转

```typescript
// Not 为 false 时：等到值为 U，返回 U
// Not 为 true 时：等到值不为 U，返回 Exclude<T, U>
type UntilValueInstance<T, Not extends boolean> = {
  toBe: <U extends T>(
    value: U,
    options?: UntilToBeOptions,
  ) => Promise<Not extends true ? T : U>
}
```

### Promise.race 超时控制

```typescript
const promises = [watcher]
if (timeout != null) {
  promises.push(
    promiseTimeout(timeout, throwOnTimeout)
      .then(() => toValue(r))
      .finally(() => stop?.()),
  )
}
return Promise.race(promises)
```

---

## 使用示例

### 基本用法

```typescript
import { until, useCounter } from '@vueuse/shared'

const { count, inc } = useCounter()

// 等待 count 等于 7
await until(count).toBe(7)
console.log('count is now 7!')

// 等待 count 大于 10
await until(count).toMatch(v => v > 10)
console.log('count is now greater than 10!')
```

### 使用 not 翻转

```typescript
// 等待 count 不等于 0
await until(count).not.toBe(0)
console.log('count is no longer 0!')

// 等待 count 不为 falsy
await until(count).not.toBeTruthy()
```

### 超时控制

```typescript
try {
  // 5秒超时，超时抛出错误
  await until(count).toBe(7, { timeout: 5000, throwOnTimeout: true })
} catch (e) {
  console.log('Timeout waiting for count to be 7')
}

// 5秒超时，超时返回当前值
const value = await until(count).toBe(7, { timeout: 5000 })
```

### 监听数组

```typescript
const list = ref([1, 2, 3])

// 等待数组包含 4
await until(list).toContains(4)
console.log('list now contains 4!')
```

### 监听变化次数

```typescript
// 等待值变化 3 次
await until(count).changedTimes(3)
console.log('count has changed 3 times!')

// 等待值变化一次（简化版）
await until(count).changed()
```

### 使用 Ref 作为目标值

```typescript
const target = ref(10)

// 等待 count 等于 target（支持 Ref）
await until(count).toBe(target)
console.log('count equals target!')
```

---

## 核心知识点总结

1. **建造者模式**：通过 getter 属性 `get not()` 实现惰性 not，返回新实例
2. **类型翻转**：使用条件类型 `Not extends true ? T : U` 实现类型安全
3. **Promise.race**：实现超时控制，同时支持正常 resolve 和超时 reject
4. **watch 监听**：内部使用 Vue 的 watch 监听响应式值变化
5. **工厂函数**：`createUntil` 根据数据类型返回不同的接口实例

---

## 源码逐行注释

```typescript
import type { MaybeRefOrGetter, WatchOptions, WatchSource } from 'vue'
import type { ElementOf, ShallowUnwrapRef } from '../utils'
import { isRef, nextTick, toValue, watch } from 'vue'
import { promiseTimeout } from '../utils'

// 超时配置接口
export interface UntilToMatchOptions {
  /**
   * Milliseconds timeout for promise to resolve/reject if the when condition does not meet.
   * 0 for never timed out
   *
   * @default 0
   */
  timeout?: number

  /**
   * Reject the promise when timeout
   *
   * @default false
   */
  throwOnTimeout?: boolean

  /**
   * `flush` option for internal watch
   *
   * @default 'sync'
   */
  flush?: WatchOptions['flush']

  /**
   * `deep` option for internal watch
   *
   * @default 'false'
   */
  deep?: WatchOptions['deep']
}

// 基础实例接口
export interface UntilBaseInstance<T, Not extends boolean = false> {
  toMatch: (<U extends T = T>(
    condition: (v: T) => v is U,
    options?: UntilToMatchOptions
  ) => Not extends true ? Promise<Exclude<T, U>> : Promise<U>) & ((
    condition: (v: T) => boolean,
    options?: UntilToMatchOptions
  ) => Promise<T>)
  changed: (options?: UntilToMatchOptions) => Promise<T>
  changedTimes: (n?: number, options?: UntilToMatchOptions) => Promise<T>
}

// Falsy 类型定义
type Falsy = false | void | null | undefined | 0 | 0n | ''

// 值类型实例接口
export interface UntilValueInstance<T, Not extends boolean = false> extends UntilBaseInstance<T, Not> {
  // getter 属性实现惰性 not
  readonly not: UntilValueInstance<T, Not extends true ? false : true>

  toBe: <P = T>(value: MaybeRefOrGetter<P>, options?: UntilToMatchOptions) => Not extends true ? Promise<T> : Promise<P>
  toBeTruthy: (options?: UntilToMatchOptions) => Not extends true ? Promise<T & Falsy> : Promise<Exclude<T, Falsy>>
  toBeNull: (options?: UntilToMatchOptions) => Not extends true ? Promise<Exclude<T, null>> : Promise<null>
  toBeUndefined: (options?: UntilToMatchOptions) => Not extends true ? Promise<Exclude<T, undefined>> : Promise<undefined>
  toBeNaN: (options?: UntilToMatchOptions) => Promise<T>
}

// 数组类型实例接口
export interface UntilArrayInstance<T> extends UntilBaseInstance<T> {
  readonly not: UntilArrayInstance<T>

  toContains: (value: MaybeRefOrGetter<ElementOf<ShallowUnwrapRef<T>>>, options?: UntilToMatchOptions) => Promise<T>
}

// 工厂函数，创建 Until 实例
function createUntil<T>(r: any, isNot = false) {
  // 核心方法 toMatch
  function toMatch(
    condition: (v: any) => boolean,
    { flush = 'sync', deep = false, timeout, throwOnTimeout }: UntilToMatchOptions = {},
  ): Promise<T> {
    let stop: (() => void) | null = null
    // 创建 Promise，内部使用 watch 监听
    const watcher = new Promise<T>((resolve) => {
      stop = watch(
        r,
        (v) => {
          // 条件满足时（考虑 isNot 翻转）
          if (condition(v) !== isNot) {
            if (stop)
              stop()
            else
              nextTick(() => stop?.())
            resolve(v)
          }
        },
        {
          flush,
          deep,
          immediate: true,
        },
      )
    })

    const promises = [watcher]
    // 超时处理
    if (timeout != null) {
      promises.push(
        promiseTimeout(timeout, throwOnTimeout)
          .then(() => toValue(r))
          .finally(() => stop?.()),
      )
    }

    // 使用 Promise.race 实现超时
    return Promise.race(promises)
  }

  // toBe 方法，支持 Ref 类型
  function toBe<P>(value: MaybeRefOrGetter<P | T>, options?: UntilToMatchOptions) {
    if (!isRef(value))
      return toMatch(v => v === value, options)

    const { flush = 'sync', deep = false, timeout, throwOnTimeout } = options ?? {}
    let stop: (() => void) | null = null
    const watcher = new Promise<T>((resolve) => {
      stop = watch(
        [r, value],
        ([v1, v2]) => {
          if (isNot !== (v1 === v2)) {
            if (stop)
              stop()
            else
              nextTick(() => stop?.())
            resolve(v1)
          }
        },
        {
          flush,
          deep,
          immediate: true,
        },
      )
    })

    const promises = [watcher]
    if (timeout != null) {
      promises.push(
        promiseTimeout(timeout, throwOnTimeout)
          .then(() => toValue(r))
          .finally(() => {
            stop?.()
            return toValue(r)
          }),
      )
    }

    return Promise.race(promises)
  }

  // 便捷方法：等待真值
  function toBeTruthy(options?: UntilToMatchOptions) {
    return toMatch(v => Boolean(v), options)
  }

  // 便捷方法：等待 null
  function toBeNull(options?: UntilToMatchOptions) {
    return toBe<null>(null, options)
  }

  // 便捷方法：等待 undefined
  function toBeUndefined(options?: UntilToMatchOptions) {
    return toBe<undefined>(undefined, options)
  }

  // 便捷方法：等待 NaN
  function toBeNaN(options?: UntilToMatchOptions) {
    return toMatch(Number.isNaN, options)
  }

  // 便捷方法：等待数组包含指定值
  function toContains(
    value: any,
    options?: UntilToMatchOptions,
  ) {
    return toMatch((v) => {
      const array = Array.from(v as any)
      return array.includes(value) || array.includes(toValue(value))
    }, options)
  }

  // 便捷方法：等待值变化
  function changed(options?: UntilToMatchOptions) {
    return changedTimes(1, options)
  }

  // 便捷方法：等待值变化 n 次
  function changedTimes(n = 1, options?: UntilToMatchOptions) {
    let count = -1 // skip the immediate check
    return toMatch(() => {
      count += 1
      return count >= n
    }, options)
  }

  // 根据数据类型返回不同的实例
  if (Array.isArray(toValue(r))) {
    const instance: UntilArrayInstance<T> = {
      toMatch: toMatch as any,
      toContains,
      changed,
      changedTimes,
      get not() {
        // getter 属性实现惰性 not
        return createUntil(r, !isNot) as UntilArrayInstance<T>
      },
    }
    return instance
  }
  else {
    const instance: UntilValueInstance<T, boolean> = {
      toMatch: toMatch as any,
      toBe,
      toBeTruthy: toBeTruthy as any,
      toBeNull: toBeNull as any,
      toBeNaN,
      toBeUndefined: toBeUndefined as any,
      changed,
      changedTimes,
      get not() {
        // getter 属性实现惰性 not
        return createUntil(r, !isNot) as UntilValueInstance<T, boolean>
      },
    }

    return instance
  }
}

/**
 * Promised one-time watch for changes
 *
 * @see https://vueuse.org/until
 * @example
 * ```
 * const { count } = useCounter()
 *
 * await until(count).toMatch(v => v > 7)
 *
 * alert('Counter is now larger than 7!')
 * ```
 */
export function until<T extends unknown[]>(r: WatchSource<T> | MaybeRefOrGetter<T>): UntilArrayInstance<T>
export function until<T>(r: WatchSource<T> | MaybeRefOrGetter<T>): UntilValueInstance<T>
export function until<T>(r: any): UntilValueInstance<T> | UntilArrayInstance<T> {
  return createUntil(r)
}
```
