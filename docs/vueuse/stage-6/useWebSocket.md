# useWebSocket 源码详细注释

> 响应式 WebSocket 客户端，支持心跳检测、自动重连、消息缓冲区

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useWebSocket/index.ts` |
| 代码行数 | 351 行 |
| 所属包 | `@vueuse/core` |
| 依赖工具 | `useIntervalFn`、`useEventListener`、`tryOnScopeDispose`、`isClient`、`isWorker` |
| 设计模式 | 状态机模式、观察者模式、守卫模式 |
| 核心知识点 | WebSocketStatus 状态机、心跳机制、自动重连、缓冲区、explicitlyClosed 标志 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { Fn } from '@vueuse/shared'
// 💡 Fn = () => void，无参数无返回值的函数类型

import type { MaybeRefOrGetter, Ref, ShallowRef } from 'vue'
// 💡 MaybeRefOrGetter<T> = T | Ref<T> | (() => T)
// 💡 Ref → 深层响应式引用
// 💡 ShallowRef → 浅层响应式引用

// ============================================================
// 第二部分：Vue API 和工具导入
// ============================================================

import { isClient, isWorker, toRef, tryOnScopeDispose, useIntervalFn } from '@vueuse/shared'
// 💡 isClient → SSR 环境检测（typeof window !== 'undefined'）
// 💡 isWorker → Web Worker 环境检测
// 💡 toRef → 将 MaybeRefOrGetter 转为 Ref
// 💡 tryOnScopeDispose → 安全的 onScopeDispose
// 💡 useIntervalFn → setInterval 的响应式封装

import { ref as deepRef, shallowRef, toValue, watch } from 'vue'
// 💡 ref as deepRef → 重命名避免与参数名冲突
// 💡 shallowRef → 浅层响应式引用（status 用）
// 💡 toValue → 解包 Ref 或调用 getter
// 💡 watch → 侦听响应式数据变化

import { useEventListener } from '../useEventListener'
// 💡 DOM 事件监听器封装

// ============================================================
// 第三部分：类型常量定义
// ============================================================

export type WebSocketStatus = 'OPEN' | 'CONNECTING' | 'CLOSED'
// ⭐ WebSocket 连接状态机，只有三种状态
// 💡 OPEN → 连接已建立，可收发消息
// 💡 CONNECTING → 正在建立连接
// 💡 CLOSED → 连接已关闭

export type WebSocketHeartbeatMessage = string | ArrayBuffer | Blob
// 💡 心跳消息类型，支持字符串、二进制数据

const DEFAULT_PING_MESSAGE = 'ping'
// 💡 默认心跳消息内容

// ============================================================
// 第四部分：选项接口定义
// ============================================================

export interface UseWebSocketOptions {
  onConnected?: (ws: WebSocket) => void
  // 💡 连接成功回调，参数为 WebSocket 实例

  onDisconnected?: (ws: WebSocket, event: CloseEvent) => void
  // 💡 连接关闭回调，参数为 WebSocket 实例和关闭事件

  onError?: (ws: WebSocket, event: Event) => void
  // 💡 连接错误回调

  onMessage?: (ws: WebSocket, event: MessageEvent) => void
  // 💡 收到消息回调（心跳响应消息会被过滤，不会触发此回调）

  /**
   * Send heartbeat for every x milliseconds passed
   *
   * @default false
   */
  heartbeat?: boolean | {
    /**
     * Message for the heartbeat
     *
     * @default 'ping'
     */
    message?: MaybeRefOrGetter<WebSocketHeartbeatMessage>
    // 💡 心跳发送的消息内容，支持响应式

    /**
     * Response message for the heartbeat, if undefined the message will be used
     */
    responseMessage?: MaybeRefOrGetter<WebSocketHeartbeatMessage>
    // 💡 期望收到的心跳响应消息
    // 💡 如果不设置，则使用 message 作为期望响应

    /**
     * Interval, in milliseconds
     *
     * @default 1000
     */
    interval?: number
    // 💡 心跳发送间隔（毫秒）

    /**
     * Heartbeat response timeout, in milliseconds
     *
     * @default 1000
     */
    pongTimeout?: number
    // 💡 等待 pong 响应的超时时间（毫秒）
    // 💡 超时未收到 pong 则关闭连接触发重连
  }

  /**
   * Enabled auto reconnect
   *
   * @default false
   */
  autoReconnect?: boolean | {
    /**
     * Maximum retry times.
     *
     * Or you can pass a predicate function (which returns true if you want to retry).
     *
     * @default -1
     */
    retries?: number | ((retried: number) => boolean)
    // 💡 重试次数：-1 表示无限重试
    // 💡 也可传入函数，返回 true 继续重试

    /**
     * Delay for reconnect, in milliseconds
     *
     * @default 1000
     */
    delay?: number
    // 💡 重连延迟时间（毫秒）

    /**
     * On maximum retry times reached.
     */
    onFailed?: Fn
    // 💡 达到最大重试次数后的回调
  }

  /**
   * Immediately open the connection when calling this composable
   *
   * @default true
   */
  immediate?: boolean
  // 💡 是否在调用时立即建立连接

  /**
   * Automatically connect to the websocket when URL changes
   *
   * @default true
   */
  autoConnect?: boolean
  // 💡 URL 变化时是否自动重新连接

  /**
   * Automatically close a connection
   *
   * @default true
   */
  autoClose?: boolean
  // 💡 组件卸载或页面关闭时是否自动关闭连接

  /**
   * List of one or more sub-protocol strings
   *
   * @default []
   */
  protocols?: string[]
  // 💡 WebSocket 子协议列表
}

// ============================================================
// 第五部分：返回类型定义
// ============================================================

export interface UseWebSocketReturn<T> {
  /**
   * Reference to the latest data received via the websocket,
   * can be watched to respond to incoming messages
   */
  data: Ref<T | null>
  // ⭐ 最新收到的消息数据，可通过 watch 监听

  /**
   * The current websocket status, can be only one of:
   * 'OPEN', 'CONNECTING', 'CLOSED'
   */
  status: ShallowRef<WebSocketStatus>
  // ⭐ 当前连接状态

  /**
   * Closes the websocket connection gracefully.
   */
  close: WebSocket['close']
  // ⭐ 主动关闭连接

  /**
   * Reopen the websocket connection.
   * If there the current one is active, will close it before opening a new one.
   */
  open: Fn
  // ⭐ 重新打开连接（会先关闭已有连接）

  /**
   * Sends data through the websocket connection.
   *
   * @param data
   * @param useBuffer when the socket is not yet open, store the data into the buffer and sent them one connected. Default to true.
   */
  send: (data: string | ArrayBuffer | Blob, useBuffer?: boolean) => boolean
  // ⭐ 发送数据，useBuffer 控制未连接时是否缓存

  /**
   * Reference to the WebSocket instance.
   */
  ws: Ref<WebSocket | undefined>
  // ⭐ WebSocket 实例引用
}

// ============================================================
// 第六部分：辅助函数
// ============================================================

function resolveNestedOptions<T>(options: T | true): T {
  if (options === true)
    return {} as T
  return options
}
// ⭐ 统一处理 boolean | object 的嵌套选项模式
// 💡 当用户传 true 时，返回空对象 {}，让后续解构使用默认值
// 💡 当用户传对象时，直接返回对象
// 💡 这是 VueUse 中常见的选项简化模式

// ============================================================
// 第七部分：主函数实现（⭐ 核心）
// ============================================================

/**
 * Reactive WebSocket client.
 *
 * @see https://vueuse.org/useWebSocket
 * @param url
 */
export function useWebSocket<Data = any>(
  url: MaybeRefOrGetter<string | URL | undefined>,
  options: UseWebSocketOptions = {},
): UseWebSocketReturn<Data> {
  // ⭐ 解构选项，设置默认值
  const {
    onConnected,
    onDisconnected,
    onError,
    onMessage,
    immediate = true,
    autoConnect = true,
    autoClose = true,
    protocols = [],
  } = options

  // ⭐ 核心响应式状态
  const data: Ref<Data | null> = deepRef(null)
  // 💡 最新收到的消息数据，使用 deepRef 保证深层响应

  const status = shallowRef<WebSocketStatus>('CLOSED')
  // ⭐ 状态机：初始状态为 CLOSED
  // 💡 使用 shallowRef 因为值是字符串，不需要深层响应

  const wsRef = deepRef<WebSocket | undefined>()
  // 💡 WebSocket 实例引用，使用 deepRef 保证深层响应

  const urlRef = toRef(url)
  // 💡 将 url 转为 Ref，支持响应式 URL

  // ⭐ 心跳控制函数（在心跳配置块中赋值）
  let heartbeatPause: Fn | undefined
  let heartbeatResume: Fn | undefined

  // ⭐ 关键标志位
  let explicitlyClosed = false
  // 💡 区分主动关闭和异常断开
  // 💡 主动关闭时为 true，不会触发自动重连
  // 💡 异常断开时为 false，会触发自动重连

  let retried = 0
  // 💡 当前重试次数

  // ⭐ 消息缓冲区
  let bufferedData: (string | ArrayBuffer | Blob)[] = []
  // 💡 存储连接未就绪时发送的消息
  // 💡 连接成功后自动发送

  // ⭐ 定时器引用
  let retryTimeout: ReturnType<typeof setTimeout> | undefined
  // 💡 重连定时器

  let pongTimeoutWait: ReturnType<typeof setTimeout> | undefined
  // 💡 等待 pong 响应的超时定时器

  // ⭐ 发送缓冲区中的数据
  const _sendBuffer = () => {
    if (bufferedData.length && wsRef.value && status.value === 'OPEN') {
      for (const buffer of bufferedData)
        wsRef.value.send(buffer)
      bufferedData = []
    }
  }
  // 💡 只在连接状态为 OPEN 时发送
  // 💡 发送后清空缓冲区

  // ⭐ 重置重连定时器
  const resetRetry = () => {
    if (retryTimeout != null) {
      clearTimeout(retryTimeout)
      retryTimeout = undefined
    }
  }

  // ⭐ 重置心跳超时定时器
  const resetHeartbeat = () => {
    clearTimeout(pongTimeoutWait)
    pongTimeoutWait = undefined
  }

  // ⭐ 关闭连接（主关闭入口）
  // Status code 1000 -> Normal Closure https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code
  const close: WebSocket['close'] = (code = 1000, reason) => {
    resetRetry()
    // 💡 清除待执行的重连定时器

    if ((!isClient && !isWorker) || !wsRef.value)
      return
    // 💡 SSR / Worker 安全检查

    explicitlyClosed = true
    // ⭐ 标记为主动关闭，阻止自动重连

    resetHeartbeat()
    // 💡 清除 pong 超时定时器

    heartbeatPause?.()
    // 💡 暂停心跳发送

    wsRef.value.close(code, reason)
    // 💡 调用原生 WebSocket.close()

    wsRef.value = undefined
    // 💡 清除实例引用
  }

  // ⭐ 发送数据
  const send = (data: string | ArrayBuffer | Blob, useBuffer = true) => {
    if (!wsRef.value || status.value !== 'OPEN') {
      if (useBuffer)
        bufferedData.push(data)
      // 💡 连接未就绪时，根据 useBuffer 决定是否缓存
      return false
    }

    _sendBuffer()
    // 💡 先发送缓冲区中的数据

    wsRef.value.send(data)
    // 💡 发送当前数据
    return true
  }

  // ⭐ 初始化 WebSocket 连接（核心函数）
  const _init = () => {
    if (explicitlyClosed || typeof urlRef.value === 'undefined')
      return
    // ⚠️ 守卫条件：
    // 1. 如果是主动关闭的，不重连
    // 2. 如果 URL 未定义，不连接

    const ws = new WebSocket(urlRef.value, protocols)
    // 💡 创建 WebSocket 实例

    wsRef.value = ws
    // 💡 保存实例引用

    status.value = 'CONNECTING'
    // ⭐ 状态机转换：CLOSED → CONNECTING

    // ⭐ onopen 事件处理
    ws.onopen = () => {
      status.value = 'OPEN'
      // ⭐ 状态机转换：CONNECTING → OPEN

      retried = 0
      // 💡 重置重试计数器

      onConnected?.(ws!)
      // 💡 触发连接成功回调

      heartbeatResume?.()
      // 💡 恢复心跳发送

      _sendBuffer()
      // 💡 发送缓冲区中的数据
    }

    // ⭐ onclose 事件处理（自动重连逻辑）
    ws.onclose = (ev) => {
      status.value = 'CLOSED'
      // ⭐ 状态机转换：OPEN → CLOSED

      resetHeartbeat()
      // 💡 清除 pong 超时定时器

      heartbeatPause?.()
      // 💡 暂停心跳发送

      onDisconnected?.(ws, ev)
      // 💡 触发断开连接回调

      // ⭐ 自动重连判断
      if (!explicitlyClosed && options.autoReconnect && (wsRef.value == null || ws === wsRef.value)) {
        // 💡 条件：
        // 1. 不是主动关闭
        // 2. 启用了自动重连
        // 3. 当前实例仍为 ws 或已清空（防止旧实例触发重连）

        const {
          retries = -1,
          delay = 1000,
          onFailed,
        } = resolveNestedOptions(options.autoReconnect)
        // 💡 解析自动重连选项

        const checkRetires = typeof retries === 'function'
          ? retries
          : () => typeof retries === 'number' && (retries < 0 || retried < retries)
        // ⭐ 重试次数判断：
        // - 如果 retries 是函数，直接使用
        // - 如果 retries 是数字：-1 表示无限重试，否则检查是否达到上限

        if (checkRetires(retried)) {
          retried += 1
          // 💡 增加重试计数

          retryTimeout = setTimeout(_init, delay)
          // ⭐ 延迟后重新初始化连接
        }
        else {
          onFailed?.()
          // 💡 达到最大重试次数，触发失败回调
        }
      }
    }

    // ⭐ onerror 事件处理
    ws.onerror = (e) => {
      onError?.(ws!, e)
      // 💡 触发错误回调
      // ⚠️ 注意：onerror 之后会紧随 onclose
    }

    // ⭐ onmessage 事件处理
    ws.onmessage = (e: MessageEvent) => {
      if (options.heartbeat) {
        resetHeartbeat()
        // 💡 收到任何消息都重置 pong 超时定时器
        // 💡 表示连接仍然存活

        const {
          message = DEFAULT_PING_MESSAGE,
          responseMessage = message,
        } = resolveNestedOptions(options.heartbeat)
        // 💡 获取心跳消息配置

        if (e.data === toValue(responseMessage))
          return
        // ⭐ 如果是心跳响应消息，直接返回，不触发 onMessage 回调
        // 💡 这样用户只会收到业务消息
      }

      data.value = e.data
      // ⭐ 更新最新消息数据

      onMessage?.(ws!, e)
      // 💡 触发消息回调
    }
  }

  // ============================================================
  // 第八部分：心跳机制配置
  // ============================================================

  if (options.heartbeat) {
    const {
      message = DEFAULT_PING_MESSAGE,
      interval = 1000,
      pongTimeout = 1000,
    } = resolveNestedOptions(options.heartbeat)
    // 💡 解析心跳配置，设置默认值

    const { pause, resume } = useIntervalFn(
      () => {
        send(toValue(message), false)
        // 💡 发送心跳消息，useBuffer = false（心跳消息不缓存）

        if (pongTimeoutWait != null)
          return
        // 💡 如果已有 pong 超时定时器，不重复设置

        pongTimeoutWait = setTimeout(() => {
          // auto-reconnect will be trigger with ws.onclose()
          close()
          explicitlyClosed = false
          // ⭐ 超时未收到 pong：
          // 1. 关闭连接（会触发 onclose）
          // 2. 重置 explicitlyClosed = false
          // 3. onclose 中的自动重连逻辑会执行
        }, pongTimeout)
      },
      interval,
      { immediate: false },
      // 💡 不立即开始心跳，等连接成功后由 heartbeatResume 启动
    )

    heartbeatPause = pause
    heartbeatResume = resume
    // 💡 保存 pause/resume 引用
  }

  // ============================================================
  // 第九部分：自动关闭配置
  // ============================================================

  if (autoClose) {
    if (isClient)
      useEventListener('beforeunload', () => close(), { passive: true })
    // 💡 页面关闭/刷新时自动关闭连接
    // 💡 passive: true 提升性能

    tryOnScopeDispose(close)
    // 💡 组件卸载或 scope 销毁时自动关闭连接
    // ⚠️ 防止内存泄漏
  }

  // ============================================================
  // 第十部分：open 函数和自动连接
  // ============================================================

  const open = () => {
    if (!isClient && !isWorker)
      return
    // 💡 SSR / Worker 安全检查

    close()
    // 💡 先关闭已有连接

    explicitlyClosed = false
    // 💡 重置主动关闭标志

    retried = 0
    // 💡 重置重试计数

    _init()
    // 💡 初始化新连接
  }

  if (immediate)
    open()
  // ⭐ 立即模式：调用时就建立连接

  if (autoConnect)
    watch(urlRef, open)
  // ⭐ URL 变化时自动重新连接

  // ============================================================
  // 第十一部分：返回值
  // ============================================================

  return {
    data,
    status,
    close,
    send,
    open,
    ws: wsRef,
  }
}
```

---

## 核心设计解析

### WebSocketStatus 状态机

```ts
type WebSocketStatus = 'OPEN' | 'CONNECTING' | 'CLOSED'
```

**状态转换图：**

```
CLOSED ──(new WebSocket)──> CONNECTING ──(onopen)──> OPEN
  ^                                                       |
  |                                                       |
  └──────────────(onclose / close())──────────────────────┘
```

**状态说明：**
- `CLOSED`：初始状态，连接已关闭或未建立
- `CONNECTING`：正在建立连接（`new WebSocket()` 后立即进入）
- `OPEN`：连接已建立，可收发消息

---

### 心跳机制

```ts
// 心跳流程：
// 1. 连接成功后 heartbeatResume() 启动心跳
// 2. 每隔 interval 毫秒发送一次 ping 消息
// 3. 发送后设置 pongTimeoutWait 定时器
// 4. 收到任何消息都重置 pongTimeoutWait
// 5. 如果 pongTimeoutWait 超时，说明连接已死
// 6. 超时后 close()，然后 explicitlyClosed = false
// 7. onclose 中触发自动重连
```

**心跳消息过滤：**
```ts
ws.onmessage = (e: MessageEvent) => {
  if (options.heartbeat) {
    resetHeartbeat()
    const { responseMessage = message } = resolveNestedOptions(options.heartbeat)
    if (e.data === toValue(responseMessage))
      return  // ⭐ 心跳响应不触发 onMessage
  }
  data.value = e.data
  onMessage?.(ws!, e)
}
```

---

### 自动重连

```ts
// 重连流程：
// 1. onclose 触发时检查是否需要重连
// 2. 条件：!explicitlyClosed && autoReconnect && 实例匹配
// 3. 获取重连配置：retries、delay、onFailed
// 4. 检查重试次数：
//    - retries 为函数：调用函数判断
//    - retries 为数字：-1 无限重试，否则检查 retried < retries
// 5. 未达上限：retried += 1，setTimeout(_init, delay)
// 6. 已达上限：调用 onFailed()
```

**重试次数配置：**
```ts
const checkRetires = typeof retries === 'function'
  ? retries
  : () => typeof retries === 'number' && (retries < 0 || retried < retries)

// 用法示例：
autoReconnect: {
  retries: 5,           // 最多重试 5 次
  retries: -1,          // 无限重试（默认）
  retries: (n) => n < 5 // 函数形式
}
```

---

### 缓冲区机制

```ts
let bufferedData: (string | ArrayBuffer | Blob)[] = []

const send = (data, useBuffer = true) => {
  if (!wsRef.value || status.value !== 'OPEN') {
    if (useBuffer)
      bufferedData.push(data)
    return false
  }
  _sendBuffer()  // 先发送缓冲区
  wsRef.value.send(data)
  return true
}

const _sendBuffer = () => {
  if (bufferedData.length && wsRef.value && status.value === 'OPEN') {
    for (const buffer of bufferedData)
      wsRef.value.send(buffer)
    bufferedData = []
  }
}
```

**缓冲区使用场景：**
- 组件初始化时发送消息，但连接尚未建立
- 连接断开后自动重连期间发送消息
- `send(data, false)` 可禁用缓冲

---

### explicitlyClosed 标志

```ts
let explicitlyClosed = false

// close() 中：
explicitlyClosed = true  // 主动关闭

// 心跳超时中：
close()
explicitlyClosed = false  // 超时关闭，允许重连

// _init() 中：
if (explicitlyClosed)
  return  // 主动关闭后不重连
```

**标志位作用：**
- 区分「主动关闭」和「异常断开」
- 主动关闭：用户调用 `close()` 或页面关闭时触发，`explicitlyClosed = true`
- 异常断开：网络断开、服务器关闭、心跳超时，`explicitlyClosed = false`
- 只有异常断开才会触发自动重连

---

### resolveNestedOptions 模式

```ts
function resolveNestedOptions<T>(options: T | true): T {
  if (options === true)
    return {} as T
  return options
}
```

**设计意图：**
```ts
// 用户可以这样写：
useWebSocket(url, { heartbeat: true })           // 使用默认配置
useWebSocket(url, { heartbeat: { interval: 5000 } })  // 自定义配置

// 内部统一处理：
const { interval = 1000 } = resolveNestedOptions(options.heartbeat)
```

---

### autoClose 双重保险

```ts
if (autoClose) {
  if (isClient)
    useEventListener('beforeunload', () => close(), { passive: true })
  // 💡 浏览器页面关闭/刷新时关闭连接

  tryOnScopeDispose(close)
  // 💡 Vue 组件卸载时关闭连接
}
```

---

### autoConnect 响应式 URL

```ts
if (autoConnect)
  watch(urlRef, open)
```

**效果：**
```ts
const url = ref('ws://localhost:8080')
const { data, status } = useWebSocket(url)

// 修改 URL 时自动重连
url.value = 'ws://localhost:9090'  // 自动断开旧连接，建立新连接
```

---

## 使用示例

### 基本用法

```ts
import { useWebSocket } from '@vuejs/core'

const { data, status, send, close, open } = useWebSocket('ws://localhost:8080')

// 监听消息
watch(data, (newVal) => {
  console.log('收到消息:', newVal)
})

// 发送消息
send('Hello Server')

// 关闭连接
close()

// 重新打开
open()
```

### 带心跳检测

```ts
const { data, status } = useWebSocket('ws://localhost:8080', {
  heartbeat: {
    message: 'ping',           // 发送的心跳消息
    responseMessage: 'pong',   // 期望收到的响应（默认同 message）
    interval: 5000,            // 每 5 秒发送一次
    pongTimeout: 3000,         // 3 秒未收到 pong 则认为连接已死
  },
})
```

### 自动重连

```ts
const { data, status } = useWebSocket('ws://localhost:8080', {
  autoReconnect: {
    retries: 10,        // 最多重试 10 次
    delay: 2000,        // 每次重试间隔 2 秒
    onFailed: () => {
      console.error('重连失败，已达最大重试次数')
    },
  },
})

// 或者使用函数控制重试逻辑
const { data, status } = useWebSocket('ws://localhost:8080', {
  autoReconnect: {
    retries: (retried) => retried < 10,  // 最多重试 10 次
    delay: 1000,
  },
})
```

### 缓冲区

```ts
const { send, status } = useWebSocket('ws://localhost:8080', {
  immediate: true,
})

// 连接尚未建立时发送消息，会自动缓存
send('消息1')  // 缓存
send('消息2')  // 缓存

// 连接成功后自动发送
// status.value === 'OPEN' 时，缓冲区中的消息会被依次发送
```

### 响应式 URL

```ts
const url = ref('ws://localhost:8080')
const { data, status } = useWebSocket(url, {
  autoConnect: true,  // 默认值
})

// 修改 URL 自动重连
url.value = 'ws://localhost:9090'
```

### 事件回调

```ts
const { data, status } = useWebSocket('ws://localhost:8080', {
  onConnected: (ws) => {
    console.log('连接成功', ws.url)
  },
  onDisconnected: (ws, event) => {
    console.log('连接关闭', event.code, event.reason)
  },
  onError: (ws, event) => {
    console.error('连接错误', event)
  },
  onMessage: (ws, event) => {
    console.log('收到业务消息', event.data)
  },
})
```

### 禁用自动行为

```ts
const { open, close, send, status } = useWebSocket('ws://localhost:8080', {
  immediate: false,    // 不立即连接
  autoConnect: false,  // URL 变化不自动重连
  autoClose: false,    // 组件卸载不自动关闭
})

// 手动控制
open()
send('Hello')
close()
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useIntervalFn` | 被依赖 | 心跳定时发送 |
| `useEventListener` | 被依赖 | 监听 `beforeunload` 事件 |
| `tryOnScopeDispose` | 被依赖 | 组件卸载时自动关闭连接 |
| `toRef` / `toValue` | 被依赖 | 响应式值解包 |
| `isClient` / `isWorker` | 被依赖 | 环境检测 |

---

## 练习

1. 阅读源码，理解 `WebSocketStatus` 状态机的转换逻辑
2. 理解 `explicitlyClosed` 标志位如何区分主动关闭和异常断开
3. 思考：心跳超时后为什么先 `close()` 再设置 `explicitlyClosed = false`？
4. 思考：`resolveNestedOptions` 模式有什么好处？
5. 练习：实现一个简化版的 `useWebSocket`（只支持基本连接和消息收发）

---

## 笔记

```
在此记录你的学习笔记...

```