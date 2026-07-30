# useFetch 源码详细注释

> 响应式 Fetch API 封装，支持链式调用、工厂模式和 PromiseLike 接口

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useFetch/index.ts` |
| 代码行数 | 658 行 |
| 所属包 | `@vueuse/core` |
| 设计模式 | 工厂模式、链式 API、PromiseLike |
| 核心知识点 | createFetch 工厂、链式方法、回调组合、防竞态机制 |

---

## 核心类型定义

### UseFetchReturn 接口

```typescript
export interface UseFetchReturn<T> {
  /**
   * Indicates if the fetch request has finished
   */
  isFinished: Readonly<ShallowRef<boolean>>

  /**
   * The statusCode of the HTTP fetch response
   */
  statusCode: ShallowRef<number | null>

  /**
   * The raw response of the fetch response
   */
  response: ShallowRef<Response | null>

  /**
   * Any fetch errors that may have occurred
   */
  error: ShallowRef<any>

  /**
   * The fetch response body on success, may either be JSON or text
   */
  data: ShallowRef<T | null>

  /**
   * Indicates if the request is currently being fetched.
   */
  isFetching: Readonly<ShallowRef<boolean>>

  /**
   * Indicates if the fetch request is able to be aborted
   */
  canAbort: ComputedRef<boolean>

  /**
   * Indicates if the fetch request was aborted
   */
  aborted: ShallowRef<boolean>

  /**
   * Abort the fetch request
   */
  abort: Fn

  /**
   * Manually call the fetch
   * (default not throwing error)
   */
  execute: (throwOnFailed?: boolean) => Promise<any>

  /**
   * Fires after the fetch request has finished
   */
  onFetchResponse: EventHookOn<Response>

  /**
   * Fires after a fetch request error
   */
  onFetchError: EventHookOn

  /**
   * Fires after a fetch has completed
   */
  onFetchFinally: EventHookOn

  // methods - 链式 API
  get: () => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  post: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  put: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  delete: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  patch: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  head: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  options: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>

  // type - 响应类型
  json: <JSON = any>() => UseFetchReturn<JSON> & PromiseLike<UseFetchReturn<JSON>>
  text: () => UseFetchReturn<string> & PromiseLike<UseFetchReturn<string>>
  blob: () => UseFetchReturn<Blob> & PromiseLike<UseFetchReturn<Blob>>
  arrayBuffer: () => UseFetchReturn<ArrayBuffer> & PromiseLike<UseFetchReturn<ArrayBuffer>>
  formData: () => UseFetchReturn<FormData> & PromiseLike<UseFetchReturn<FormData>>
}
```

### 内部类型

```typescript
type DataType = 'text' | 'json' | 'blob' | 'arrayBuffer' | 'formData'
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'
type Combination = 'overwrite' | 'chain'
```

### 回调上下文接口

```typescript
export interface BeforeFetchContext {
  url: string
  options: RequestInit
  cancel: Fn
}

export interface AfterFetchContext<T = any> {
  response: Response
  data: T | null
  context: BeforeFetchContext
  execute: (throwOnFailed?: boolean) => Promise<any>
}

export interface OnFetchErrorContext<T = any, E = any> {
  error: E
  data: T | null
  response: Response | null
  context: BeforeFetchContext
  execute: (throwOnFailed?: boolean) => Promise<any>
}
```

### UseFetchOptions 接口

```typescript
export interface UseFetchOptions {
  /**
   * Fetch function
   */
  fetch?: typeof window.fetch

  /**
   * Will automatically run fetch when `useFetch` is used
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Will automatically refetch when:
   * - the URL is changed if the URL is a ref
   * - the payload is changed if the payload is a ref
   *
   * @default false
   */
  refetch?: MaybeRefOrGetter<boolean>

  /**
   * Initial data before the request finished
   *
   * @default null
   */
  initialData?: any

  /**
   * Timeout for abort request after number of millisecond
   * `0` means use browser default
   *
   * @default 0
   */
  timeout?: number

  /**
   * Allow update the `data` ref when fetch error whenever provided, or mutated in the `onFetchError` callback
   *
   * @default false
   */
  updateDataOnError?: boolean

  /**
   * Will run immediately before the fetch request is dispatched
   */
  beforeFetch?: (ctx: BeforeFetchContext) => Promise<Partial<BeforeFetchContext> | void> | Partial<BeforeFetchContext> | void

  /**
   * Will run immediately after the fetch request is returned.
   * Runs after any 2xx response
   */
  afterFetch?: (ctx: AfterFetchContext) => Promise<Partial<AfterFetchContext>> | Partial<AfterFetchContext>

  /**
   * Will run immediately after the fetch request is returned.
   * Runs after any 4xx and 5xx response
   */
  onFetchError?: (ctx: OnFetchErrorContext) => Promise<Partial<OnFetchErrorContext>> | Partial<OnFetchErrorContext>
}
```

### CreateFetchOptions 接口

```typescript
export interface CreateFetchOptions {
  /**
   * The base URL that will be prefixed to all urls unless urls are absolute
   */
  baseUrl?: MaybeRefOrGetter<string>

  /**
   * Determine the inherit behavior for beforeFetch, afterFetch, onFetchError
   * @default 'chain'
   */
  combination?: Combination

  /**
   * Default Options for the useFetch function
   */
  options?: UseFetchOptions

  /**
   * Options for the fetch request
   */
  fetchOptions?: RequestInit
}
```

---

## 辅助函数

### isFetchOptions

```typescript
function isFetchOptions(obj: object): obj is UseFetchOptions {
  return obj && containsProp(obj, 'immediate', 'refetch', 'initialData', 'timeout', 'beforeFetch', 'afterFetch', 'onFetchError', 'fetch', 'updateDataOnError')
}
```

### isAbsoluteURL

```typescript
const reAbsolute = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i
// A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
function isAbsoluteURL(url: string) {
  return reAbsolute.test(url)
}
```

### headersToObject

```typescript
function headersToObject(headers: HeadersInit | undefined) {
  if (typeof Headers !== 'undefined' && headers instanceof Headers)
    return Object.fromEntries(headers.entries())
  return headers
}
```

### combineCallbacks 回调组合

```typescript
function combineCallbacks<T = any>(combination: Combination, ...callbacks: (((ctx: T) => void | Partial<T> | Promise<void | Partial<T>>) | undefined)[]) {
  if (combination === 'overwrite') {
    // 使用最后一个回调
    return async (ctx: T) => {
      let callback
      for (let i = callbacks.length - 1; i >= 0; i--) {
        if (callbacks[i] != null) {
          callback = callbacks[i]
          break
        }
      }
      if (callback)
        return { ...ctx, ...(await callback(ctx)) }

      return ctx
    }
  }
  else {
    // 链式组合所有回调
    return async (ctx: T) => {
      for (const callback of callbacks) {
        if (callback)
          ctx = { ...ctx, ...(await callback(ctx)) }
      }

      return ctx
    }
  }
}
```

**组合模式解析：**
- `overwrite`：使用最后一个非空回调
- `chain`：依次执行所有回调，合并结果

---

## 核心实现

### createFetch 工厂函数

```typescript
export function createFetch(config: CreateFetchOptions = {}) {
  const _combination = config.combination || 'chain' as Combination
  const _options = config.options || {}
  const _fetchOptions = config.fetchOptions || {}

  function useFactoryFetch(url: MaybeRefOrGetter<string>, ...args: any[]) {
    // 计算最终 URL
    const computedUrl = computed(() => {
      const baseUrl = toValue(config.baseUrl)
      const targetUrl = toValue(url)

      return (baseUrl && !isAbsoluteURL(targetUrl))
        ? joinPaths(baseUrl, targetUrl)
        : targetUrl
    })

    let options = _options
    let fetchOptions = _fetchOptions

    // 合并参数
    if (args.length > 0) {
      if (isFetchOptions(args[0])) {
        options = {
          ...options,
          ...args[0],
          beforeFetch: combineCallbacks(_combination, _options.beforeFetch, args[0].beforeFetch),
          afterFetch: combineCallbacks(_combination, _options.afterFetch, args[0].afterFetch),
          onFetchError: combineCallbacks(_combination, _options.onFetchError, args[0].onFetchError),
        }
      }
      else {
        fetchOptions = {
          ...fetchOptions,
          ...args[0],
          headers: {
            ...(headersToObject(fetchOptions.headers) || {}),
            ...(headersToObject(args[0].headers) || {}),
          },
        }
      }
    }

    if (args.length > 1 && isFetchOptions(args[1])) {
      options = {
        ...options,
        ...args[1],
        beforeFetch: combineCallbacks(_combination, _options.beforeFetch, args[1].beforeFetch),
        afterFetch: combineCallbacks(_combination, _options.afterFetch, args[1].afterFetch),
        onFetchError: combineCallbacks(_combination, _options.onFetchError, args[1].onFetchError),
      }
    }

    return useFetch(computedUrl, fetchOptions, options)
  }

  return useFactoryFetch as typeof useFetch
}
```

**工厂模式解析：**
- `createFetch` 返回一个预配置的 `useFetch` 函数
- 支持 `baseUrl`、默认选项、回调组合
- 使用 `combineCallbacks` 组合多层回调

### useFetch 主函数

```typescript
export function useFetch<T>(url: MaybeRefOrGetter<string>, ...args: any[]): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>> {
  const supportsAbort = typeof AbortController === 'function'

  let fetchOptions: RequestInit = {}
  let options: UseFetchOptions = {
    immediate: true,
    refetch: false,
    timeout: 0,
    updateDataOnError: false,
  }

  interface InternalConfig {
    method: HttpMethod
    type: DataType
    payload: unknown
    payloadType?: string
  }

  // 内部配置
  const config: InternalConfig = {
    method: 'GET',
    type: 'text' as DataType,
    payload: undefined as unknown,
  }

  // 解析参数
  if (args.length > 0) {
    if (isFetchOptions(args[0]))
      options = { ...options, ...args[0] }
    else
      fetchOptions = args[0]
  }

  if (args.length > 1) {
    if (isFetchOptions(args[1]))
      options = { ...options, ...args[1] }
  }

  const {
    fetch = defaultWindow?.fetch,
    initialData,
    timeout,
  } = options

  // Event Hooks
  const responseEvent = createEventHook<Response>()
  const errorEvent = createEventHook<any>()
  const finallyEvent = createEventHook<any>()

  // 状态
  const isFinished = shallowRef(false)
  const isFetching = shallowRef(false)
  const aborted = shallowRef(false)
  const statusCode = shallowRef<number | null>(null)
  const response = shallowRef<Response | null>(null)
  const error = shallowRef<any>(null)
  const data = shallowRef<T | null>(initialData || null)

  const canAbort = computed(() => supportsAbort && isFetching.value)

  let controller: AbortController | undefined
  let timer: Stoppable | undefined

  // 中止请求
  const abort = () => {
    if (supportsAbort) {
      controller?.abort()
      controller = new AbortController()
      controller.signal.onabort = () => aborted.value = true
      fetchOptions = {
        ...fetchOptions,
        signal: controller.signal,
      }
    }
  }

  // 设置加载状态
  const loading = (isLoading: boolean) => {
    isFetching.value = isLoading
    isFinished.value = !isLoading
  }

  // 超时处理
  if (timeout)
    timer = useTimeoutFn(abort, timeout, { immediate: false })

  // 防竞态计数器
  let executeCounter = 0

  // 执行请求
  const execute = async (throwOnFailed = false) => {
    abort()

    loading(true)
    error.value = null
    statusCode.value = null
    aborted.value = false

    executeCounter += 1
    const currentExecuteCounter = executeCounter

    const defaultFetchOptions: RequestInit = {
      method: config.method,
      headers: {},
    }

    // 处理 payload
    const payload = toValue(config.payload)
    if (payload) {
      const headers = headersToObject(defaultFetchOptions.headers) as Record<string, string>
      // 自动推断 payload 类型
      const proto = Object.getPrototypeOf(payload)
      if (!config.payloadType && payload && (proto === Object.prototype || Array.isArray(proto)) && !(payload instanceof FormData))
        config.payloadType = 'json'

      if (config.payloadType)
        headers['Content-Type'] = payloadMapping[config.payloadType] ?? config.payloadType

      defaultFetchOptions.body = config.payloadType === 'json'
        ? JSON.stringify(payload)
        : payload as BodyInit
    }

    // beforeFetch 回调
    let isCanceled = false
    const context: BeforeFetchContext = {
      url: toValue(url),
      options: {
        ...defaultFetchOptions,
        ...fetchOptions,
      },
      cancel: () => { isCanceled = true },
    }

    if (options.beforeFetch)
      Object.assign(context, await options.beforeFetch(context))

    if (isCanceled || !fetch) {
      loading(false)
      return Promise.resolve(null)
    }

    let responseData: any = null

    // 启动超时计时器
    if (timer)
      timer.start()

    return fetch(
      context.url,
      {
        ...defaultFetchOptions,
        ...context.options,
        headers: {
          ...headersToObject(defaultFetchOptions.headers),
          ...headersToObject(context.options?.headers),
        },
      },
    )
      .then(async (fetchResponse) => {
        response.value = fetchResponse
        statusCode.value = fetchResponse.status

        // 解析响应数据
        responseData = await fetchResponse.clone()[config.type]()

        // 检查响应状态
        // see: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        if (!fetchResponse.ok) {
          data.value = initialData || null
          throw new Error(fetchResponse.statusText)
        }

        // afterFetch 回调
        if (options.afterFetch) {
          ({ data: responseData } = await options.afterFetch({
            data: responseData,
            response: fetchResponse,
            context,
            execute,
          }))
        }
        data.value = responseData

        responseEvent.trigger(fetchResponse)
        return fetchResponse
      })
      .catch(async (fetchError) => {
        let errorData = fetchError.message || fetchError.name

        // onFetchError 回调
        if (options.onFetchError) {
          ({ error: errorData, data: responseData } = await options.onFetchError({
            data: responseData,
            error: fetchError,
            response: response.value,
            context,
            execute,
          }))
        }

        error.value = errorData
        if (options.updateDataOnError)
          data.value = responseData

        errorEvent.trigger(fetchError)
        if (throwOnFailed)
          throw fetchError
        return null
      })
      .finally(() => {
        // 防竞态：只有最后一次请求才更新状态
        if (currentExecuteCounter === executeCounter)
          loading(false)
        if (timer)
          timer.stop()
        finallyEvent.trigger(null)
      })
  }

  // 响应式 refetch
  const refetch = toRef(options.refetch)
  watch(
    [
      refetch,
      toRef(url),
    ],
    ([refetch]) => refetch && execute(),
    { deep: true },
  )

  // shell 对象
  const shell: UseFetchReturn<T> = {
    isFinished: readonly(isFinished),
    isFetching: readonly(isFetching),
    statusCode,
    response,
    error,
    data,
    canAbort,
    aborted,
    abort,
    execute,

    onFetchResponse: responseEvent.on,
    onFetchError: errorEvent.on,
    onFetchFinally: finallyEvent.on,
    // method
    get: setMethod('GET'),
    put: setMethod('PUT'),
    post: setMethod('POST'),
    delete: setMethod('DELETE'),
    patch: setMethod('PATCH'),
    head: setMethod('HEAD'),
    options: setMethod('OPTIONS'),
    // type
    json: setType('json'),
    text: setType('text'),
    blob: setType('blob'),
    arrayBuffer: setType('arrayBuffer'),
    formData: setType('formData'),
  }

  // 设置 HTTP 方法
  function setMethod(method: HttpMethod) {
    return (payload?: unknown, payloadType?: string) => {
      if (!isFetching.value) {
        config.method = method
        config.payload = payload
        config.payloadType = payloadType

        // 监听 payload 变化
        if (isRef(config.payload)) {
          watch(
            [
              refetch,
              toRef(config.payload),
            ],
            ([refetch]) => refetch && execute(),
            { deep: true },
          )
        }

        // 返回带 PromiseLike 的对象
        return {
          ...shell,
          then(onFulfilled: any, onRejected: any) {
            return waitUntilFinished()
              .then(onFulfilled, onRejected)
          },
        } as any
      }
      return undefined
    }
  }

  // 等待请求完成
  function waitUntilFinished() {
    return new Promise<UseFetchReturn<T>>((resolve, reject) => {
      until(isFinished).toBe(true).then(() => resolve(shell)).catch(reject)
    })
  }

  // 设置响应类型
  function setType(type: DataType) {
    return () => {
      if (!isFetching.value) {
        config.type = type
        return {
          ...shell,
          then(onFulfilled: any, onRejected: any) {
            return waitUntilFinished()
              .then(onFulfilled, onRejected)
          },
        } as any
      }
      return undefined
    }
  }

  // 立即执行
  if (options.immediate)
    Promise.resolve().then(() => execute())

  // 返回带 PromiseLike 的对象
  return {
    ...shell,
    then(onFulfilled, onRejected) {
      return waitUntilFinished()
        .then(onFulfilled, onRejected)
    },
  }
}
```

### joinPaths 辅助函数

```typescript
function joinPaths(start: string, end: string): string {
  if (!start.endsWith('/') && !end.startsWith('/')) {
    return `${start}/${end}`
  }

  if (start.endsWith('/') && end.startsWith('/')) {
    return `${start.slice(0, -1)}${end}`
  }

  return `${start}${end}`
}
```

---

## 设计模式分析

### 工厂模式（createFetch）

```typescript
// 创建预配置的 useFetch
const useMyFetch = createFetch({
  baseUrl: 'https://api.example.com',
  combination: 'chain',
  options: {
    beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      }
    },
  },
})

// 使用
const { data } = useMyFetch('/users').json()
```

### 链式 API

```typescript
// 链式调用
const { data } = useFetch('/api/users')
  .post({ name: 'John' }, 'json')
  .json()

// 等价于
const { data } = useFetch('/api/users', {
  method: 'POST',
  body: JSON.stringify({ name: 'John' }),
  headers: { 'Content-Type': 'application/json' },
})
```

### PromiseLike 接口

```typescript
// 可以直接 await
const response = await useFetch('/api/users').json()
console.log(response.data)
```

### 防竞态机制

```typescript
let executeCounter = 0

const execute = async () => {
  executeCounter += 1
  const currentExecuteCounter = executeCounter

  // ... fetch 逻辑

  .finally(() => {
    // 只有最后一次请求才更新状态
    if (currentExecuteCounter === executeCounter)
      loading(false)
  })
}
```

---

## 使用示例

### 基本用法

```typescript
import { useFetch } from '@vueuse/core'

const { data, error, isFetching, statusCode } = useFetch('https://api.example.com/users')
```

### JSON 响应

```typescript
interface User {
  id: number
  name: string
}

const { data } = useFetch<User[]>('https://api.example.com/users').json()
// data 类型为 Ref<User[] | null>
```

### POST 请求

```typescript
const { data, error } = useFetch('https://api.example.com/users')
  .post({ name: 'John', email: 'john@example.com' }, 'json')
  .json()
```

### 使用 createFetch 工厂

```typescript
import { createFetch } from '@vueuse/core'

const useMyFetch = createFetch({
  baseUrl: 'https://api.example.com',
  combination: 'chain',
  options: {
    timeout: 10000,
    beforeFetch({ options }) {
      const token = localStorage.getItem('token')
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        }
      }
    },
    afterFetch({ data, response }) {
      // 处理响应
      return { data }
    },
    onFetchError({ error, data, response }) {
      if (response?.status === 401) {
        // 处理未授权
      }
      return { error, data }
    },
  },
})

// 使用
const { data } = useMyFetch('/users').json()
const { data } = useMyFetch('/users').post({ name: 'John' }).json()
```

### 自动 refetch

```typescript
const url = ref('https://api.example.com/users?page=1')

const { data } = useFetch(url, { refetch: true }).json()

// URL 变化时自动重新请求
url.value = 'https://api.example.com/users?page=2'
```

### 手动执行

```typescript
const { execute, data, isFetching } = useFetch('https://api.example.com/users', {
  immediate: false,
}).json()

// 手动触发
const handleClick = () => {
  execute()
}
```

### 中止请求

```typescript
const { abort, canAbort, isFetching } = useFetch('https://api.example.com/users')

// 中止请求
if (canAbort.value) {
  abort()
}
```

### 错误处理

```typescript
const { data, error, statusCode } = useFetch('https://api.example.com/users', {
  onFetchError({ error, response }) {
    if (response?.status === 404) {
      console.log('Not found')
    }
    return { error }
  },
}).json()
```

### 超时处理

```typescript
const { data, aborted } = useFetch('https://api.example.com/users', {
  timeout: 5000,  // 5秒超时
}).json()

watch(aborted, (isAborted) => {
  if (isAborted) {
    console.log('Request aborted due to timeout')
  }
})
```

### 事件监听

```typescript
const { onFetchResponse, onFetchError, onFetchFinally } = useFetch('https://api.example.com/users')

onFetchResponse((response) => {
  console.log('Response received:', response.status)
})

onFetchError((error) => {
  console.error('Fetch error:', error)
})

onFetchFinally(() => {
  console.log('Fetch completed')
})
```

### 响应式 payload

```typescript
const payload = ref({ name: 'John' })

const { data } = useFetch('https://api.example.com/users')
  .post(payload, 'json')  // payload 是 ref，refetch 时会自动更新
  .json()

// payload 变化时自动重新请求（需要设置 refetch: true）
```

---

## 核心知识点总结

1. **工厂模式**：`createFetch` 返回预配置的 `useFetch` 函数
2. **链式 API**：`.json()`、`.post()` 等方法返回新对象
3. **PromiseLike**：实现 `then` 方法，支持 `await`
4. **回调组合**：`combineCallbacks` 支持 `overwrite` 和 `chain` 两种模式
5. **防竞态**：`executeCounter` 确保只有最后一次请求更新状态

---

## 源码逐行注释

```typescript
import type { EventHookOn, Fn, Stoppable } from '@vueuse/shared'
import type { ComputedRef, MaybeRefOrGetter, ShallowRef } from 'vue'
import { containsProp, createEventHook, toRef, until, useTimeoutFn } from '@vueuse/shared'
import { computed, isRef, readonly, shallowRef, toValue, watch } from 'vue'
import { defaultWindow } from '../_configurable'

// 返回值接口
export interface UseFetchReturn<T> {
  /**
   * Indicates if the fetch request has finished
   */
  isFinished: Readonly<ShallowRef<boolean>>

  /**
   * The statusCode of the HTTP fetch response
   */
  statusCode: ShallowRef<number | null>

  /**
   * The raw response of the fetch response
   */
  response: ShallowRef<Response | null>

  /**
   * Any fetch errors that may have occurred
   */
  error: ShallowRef<any>

  /**
   * The fetch response body on success, may either be JSON or text
   */
  data: ShallowRef<T | null>

  /**
   * Indicates if the request is currently being fetched.
   */
  isFetching: Readonly<ShallowRef<boolean>>

  /**
   * Indicates if the fetch request is able to be aborted
   */
  canAbort: ComputedRef<boolean>

  /**
   * Indicates if the fetch request was aborted
   */
  aborted: ShallowRef<boolean>

  /**
   * Abort the fetch request
   */
  abort: Fn

  /**
   * Manually call the fetch
   * (default not throwing error)
   */
  execute: (throwOnFailed?: boolean) => Promise<any>

  /**
   * Fires after the fetch request has finished
   */
  onFetchResponse: EventHookOn<Response>

  /**
   * Fires after a fetch request error
   */
  onFetchError: EventHookOn

  /**
   * Fires after a fetch has completed
   */
  onFetchFinally: EventHookOn

  // methods
  get: () => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  post: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  put: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  delete: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  patch: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  head: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  options: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>

  // type
  json: <JSON = any>() => UseFetchReturn<JSON> & PromiseLike<UseFetchReturn<JSON>>
  text: () => UseFetchReturn<string> & PromiseLike<UseFetchReturn<string>>
  blob: () => UseFetchReturn<Blob> & PromiseLike<UseFetchReturn<Blob>>
  arrayBuffer: () => UseFetchReturn<ArrayBuffer> & PromiseLike<UseFetchReturn<ArrayBuffer>>
  formData: () => UseFetchReturn<FormData> & PromiseLike<UseFetchReturn<FormData>>
}

// 内部类型
type DataType = 'text' | 'json' | 'blob' | 'arrayBuffer' | 'formData'
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'
type Combination = 'overwrite' | 'chain'

// payload 类型映射
const payloadMapping: Record<string, string> = {
  json: 'application/json',
  text: 'text/plain',
}

// 回调上下文接口
export interface BeforeFetchContext {
  url: string
  options: RequestInit
  cancel: Fn
}

export interface AfterFetchContext<T = any> {
  response: Response
  data: T | null
  context: BeforeFetchContext
  execute: (throwOnFailed?: boolean) => Promise<any>
}

export interface OnFetchErrorContext<T = any, E = any> {
  error: E
  data: T | null
  response: Response | null
  context: BeforeFetchContext
  execute: (throwOnFailed?: boolean) => Promise<any>
}

// 选项接口
export interface UseFetchOptions {
  fetch?: typeof window.fetch
  immediate?: boolean
  refetch?: MaybeRefOrGetter<boolean>
  initialData?: any
  timeout?: number
  updateDataOnError?: boolean
  beforeFetch?: (ctx: BeforeFetchContext) => Promise<Partial<BeforeFetchContext> | void> | Partial<BeforeFetchContext> | void
  afterFetch?: (ctx: AfterFetchContext) => Promise<Partial<AfterFetchContext>> | Partial<AfterFetchContext>
  onFetchError?: (ctx: OnFetchErrorContext) => Promise<Partial<OnFetchErrorContext>> | Partial<OnFetchErrorContext>
}

// 工厂选项接口
export interface CreateFetchOptions {
  baseUrl?: MaybeRefOrGetter<string>
  combination?: Combination
  options?: UseFetchOptions
  fetchOptions?: RequestInit
}

// 判断是否为 UseFetchOptions
function isFetchOptions(obj: object): obj is UseFetchOptions {
  return obj && containsProp(obj, 'immediate', 'refetch', 'initialData', 'timeout', 'beforeFetch', 'afterFetch', 'onFetchError', 'fetch', 'updateDataOnError')
}

// 判断是否为绝对 URL
const reAbsolute = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i
function isAbsoluteURL(url: string) {
  return reAbsolute.test(url)
}

// Headers 转对象
function headersToObject(headers: HeadersInit | undefined) {
  if (typeof Headers !== 'undefined' && headers instanceof Headers)
    return Object.fromEntries(headers.entries())
  return headers
}

// 回调组合函数
function combineCallbacks<T = any>(combination: Combination, ...callbacks: (((ctx: T) => void | Partial<T> | Promise<void | Partial<T>>) | undefined)[]) {
  if (combination === 'overwrite') {
    // 使用最后一个回调
    return async (ctx: T) => {
      let callback
      for (let i = callbacks.length - 1; i >= 0; i--) {
        if (callbacks[i] != null) {
          callback = callbacks[i]
          break
        }
      }
      if (callback)
        return { ...ctx, ...(await callback(ctx)) }

      return ctx
    }
  }
  else {
    // 链式组合所有回调
    return async (ctx: T) => {
      for (const callback of callbacks) {
        if (callback)
          ctx = { ...ctx, ...(await callback(ctx)) }
      }

      return ctx
    }
  }
}

// 工厂函数
export function createFetch(config: CreateFetchOptions = {}) {
  const _combination = config.combination || 'chain' as Combination
  const _options = config.options || {}
  const _fetchOptions = config.fetchOptions || {}

  function useFactoryFetch(url: MaybeRefOrGetter<string>, ...args: any[]) {
    // 计算最终 URL
    const computedUrl = computed(() => {
      const baseUrl = toValue(config.baseUrl)
      const targetUrl = toValue(url)

      return (baseUrl && !isAbsoluteURL(targetUrl))
        ? joinPaths(baseUrl, targetUrl)
        : targetUrl
    })

    let options = _options
    let fetchOptions = _fetchOptions

    // 合并参数
    if (args.length > 0) {
      if (isFetchOptions(args[0])) {
        options = {
          ...options,
          ...args[0],
          beforeFetch: combineCallbacks(_combination, _options.beforeFetch, args[0].beforeFetch),
          afterFetch: combineCallbacks(_combination, _options.afterFetch, args[0].afterFetch),
          onFetchError: combineCallbacks(_combination, _options.onFetchError, args[0].onFetchError),
        }
      }
      else {
        fetchOptions = {
          ...fetchOptions,
          ...args[0],
          headers: {
            ...(headersToObject(fetchOptions.headers) || {}),
            ...(headersToObject(args[0].headers) || {}),
          },
        }
      }
    }

    if (args.length > 1 && isFetchOptions(args[1])) {
      options = {
        ...options,
        ...args[1],
        beforeFetch: combineCallbacks(_combination, _options.beforeFetch, args[1].beforeFetch),
        afterFetch: combineCallbacks(_combination, _options.afterFetch, args[1].afterFetch),
        onFetchError: combineCallbacks(_combination, _options.onFetchError, args[1].onFetchError),
      }
    }

    return useFetch(computedUrl, fetchOptions, options)
  }

  return useFactoryFetch as typeof useFetch
}

// useFetch 重载
export function useFetch<T>(url: MaybeRefOrGetter<string>): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
export function useFetch<T>(url: MaybeRefOrGetter<string>, useFetchOptions: UseFetchOptions): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
export function useFetch<T>(url: MaybeRefOrGetter<string>, options: RequestInit, useFetchOptions?: UseFetchOptions): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>

// useFetch 实现
export function useFetch<T>(url: MaybeRefOrGetter<string>, ...args: any[]): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>> {
  const supportsAbort = typeof AbortController === 'function'

  let fetchOptions: RequestInit = {}
  let options: UseFetchOptions = {
    immediate: true,
    refetch: false,
    timeout: 0,
    updateDataOnError: false,
  }

  interface InternalConfig {
    method: HttpMethod
    type: DataType
    payload: unknown
    payloadType?: string
  }

  // 内部配置
  const config: InternalConfig = {
    method: 'GET',
    type: 'text' as DataType,
    payload: undefined as unknown,
  }

  // 解析参数
  if (args.length > 0) {
    if (isFetchOptions(args[0]))
      options = { ...options, ...args[0] }
    else
      fetchOptions = args[0]
  }

  if (args.length > 1) {
    if (isFetchOptions(args[1]))
      options = { ...options, ...args[1] }
  }

  const {
    fetch = defaultWindow?.fetch,
    initialData,
    timeout,
  } = options

  // Event Hooks
  const responseEvent = createEventHook<Response>()
  const errorEvent = createEventHook<any>()
  const finallyEvent = createEventHook<any>()

  // 状态
  const isFinished = shallowRef(false)
  const isFetching = shallowRef(false)
  const aborted = shallowRef(false)
  const statusCode = shallowRef<number | null>(null)
  const response = shallowRef<Response | null>(null)
  const error = shallowRef<any>(null)
  const data = shallowRef<T | null>(initialData || null)

  const canAbort = computed(() => supportsAbort && isFetching.value)

  let controller: AbortController | undefined
  let timer: Stoppable | undefined

  // 中止请求
  const abort = () => {
    if (supportsAbort) {
      controller?.abort()
      controller = new AbortController()
      controller.signal.onabort = () => aborted.value = true
      fetchOptions = {
        ...fetchOptions,
        signal: controller.signal,
      }
    }
  }

  // 设置加载状态
  const loading = (isLoading: boolean) => {
    isFetching.value = isLoading
    isFinished.value = !isLoading
  }

  // 超时处理
  if (timeout)
    timer = useTimeoutFn(abort, timeout, { immediate: false })

  // 防竞态计数器
  let executeCounter = 0

  // 执行请求
  const execute = async (throwOnFailed = false) => {
    abort()

    loading(true)
    error.value = null
    statusCode.value = null
    aborted.value = false

    executeCounter += 1
    const currentExecuteCounter = executeCounter

    const defaultFetchOptions: RequestInit = {
      method: config.method,
      headers: {},
    }

    // 处理 payload
    const payload = toValue(config.payload)
    if (payload) {
      const headers = headersToObject(defaultFetchOptions.headers) as Record<string, string>
      // 自动推断 payload 类型
      const proto = Object.getPrototypeOf(payload)
      if (!config.payloadType && payload && (proto === Object.prototype || Array.isArray(proto)) && !(payload instanceof FormData))
        config.payloadType = 'json'

      if (config.payloadType)
        headers['Content-Type'] = payloadMapping[config.payloadType] ?? config.payloadType

      defaultFetchOptions.body = config.payloadType === 'json'
        ? JSON.stringify(payload)
        : payload as BodyInit
    }

    // beforeFetch 回调
    let isCanceled = false
    const context: BeforeFetchContext = {
      url: toValue(url),
      options: {
        ...defaultFetchOptions,
        ...fetchOptions,
      },
      cancel: () => { isCanceled = true },
    }

    if (options.beforeFetch)
      Object.assign(context, await options.beforeFetch(context))

    if (isCanceled || !fetch) {
      loading(false)
      return Promise.resolve(null)
    }

    let responseData: any = null

    // 启动超时计时器
    if (timer)
      timer.start()

    return fetch(
      context.url,
      {
        ...defaultFetchOptions,
        ...context.options,
        headers: {
          ...headersToObject(defaultFetchOptions.headers),
          ...headersToObject(context.options?.headers),
        },
      },
    )
      .then(async (fetchResponse) => {
        response.value = fetchResponse
        statusCode.value = fetchResponse.status

        // 解析响应数据
        responseData = await fetchResponse.clone()[config.type]()

        // 检查响应状态
        // see: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        if (!fetchResponse.ok) {
          data.value = initialData || null
          throw new Error(fetchResponse.statusText)
        }

        // afterFetch 回调
        if (options.afterFetch) {
          ({ data: responseData } = await options.afterFetch({
            data: responseData,
            response: fetchResponse,
            context,
            execute,
          }))
        }
        data.value = responseData

        responseEvent.trigger(fetchResponse)
        return fetchResponse
      })
      .catch(async (fetchError) => {
        let errorData = fetchError.message || fetchError.name

        // onFetchError 回调
        if (options.onFetchError) {
          ({ error: errorData, data: responseData } = await options.onFetchError({
            data: responseData,
            error: fetchError,
            response: response.value,
            context,
            execute,
          }))
        }

        error.value = errorData
        if (options.updateDataOnError)
          data.value = responseData

        errorEvent.trigger(fetchError)
        if (throwOnFailed)
          throw fetchError
        return null
      })
      .finally(() => {
        // 防竞态：只有最后一次请求才更新状态
        if (currentExecuteCounter === executeCounter)
          loading(false)
        if (timer)
          timer.stop()
        finallyEvent.trigger(null)
      })
  }

  // 响应式 refetch
  const refetch = toRef(options.refetch)
  watch(
    [
      refetch,
      toRef(url),
    ],
    ([refetch]) => refetch && execute(),
    { deep: true },
  )

  // shell 对象
  const shell: UseFetchReturn<T> = {
    isFinished: readonly(isFinished),
    isFetching: readonly(isFetching),
    statusCode,
    response,
    error,
    data,
    canAbort,
    aborted,
    abort,
    execute,

    onFetchResponse: responseEvent.on,
    onFetchError: errorEvent.on,
    onFetchFinally: finallyEvent.on,
    // method
    get: setMethod('GET'),
    put: setMethod('PUT'),
    post: setMethod('POST'),
    delete: setMethod('DELETE'),
    patch: setMethod('PATCH'),
    head: setMethod('HEAD'),
    options: setMethod('OPTIONS'),
    // type
    json: setType('json'),
    text: setType('text'),
    blob: setType('blob'),
    arrayBuffer: setType('arrayBuffer'),
    formData: setType('formData'),
  }

  // 设置 HTTP 方法
  function setMethod(method: HttpMethod) {
    return (payload?: unknown, payloadType?: string) => {
      if (!isFetching.value) {
        config.method = method
        config.payload = payload
        config.payloadType = payloadType

        // 监听 payload 变化
        if (isRef(config.payload)) {
          watch(
            [
              refetch,
              toRef(config.payload),
            ],
            ([refetch]) => refetch && execute(),
            { deep: true },
          )
        }

        // 返回带 PromiseLike 的对象
        return {
          ...shell,
          then(onFulfilled: any, onRejected: any) {
            return waitUntilFinished()
              .then(onFulfilled, onRejected)
          },
        } as any
      }
      return undefined
    }
  }

  // 等待请求完成
  function waitUntilFinished() {
    return new Promise<UseFetchReturn<T>>((resolve, reject) => {
      until(isFinished).toBe(true).then(() => resolve(shell)).catch(reject)
    })
  }

  // 设置响应类型
  function setType(type: DataType) {
    return () => {
      if (!isFetching.value) {
        config.type = type
        return {
          ...shell,
          then(onFulfilled: any, onRejected: any) {
            return waitUntilFinished()
              .then(onFulfilled, onRejected)
          },
        } as any
      }
      return undefined
    }
  }

  // 立即执行
  if (options.immediate)
    Promise.resolve().then(() => execute())

  // 返回带 PromiseLike 的对象
  return {
    ...shell,
    then(onFulfilled, onRejected) {
      return waitUntilFinished()
        .then(onFulfilled, onRejected)
    },
  }
}

// 路径拼接
function joinPaths(start: string, end: string): string {
  if (!start.endsWith('/') && !end.startsWith('/')) {
    return `${start}/${end}`
  }

  if (start.endsWith('/') && end.startsWith('/')) {
    return `${start.slice(0, -1)}${end}`
  }

  return `${start}${end}`
}
```
