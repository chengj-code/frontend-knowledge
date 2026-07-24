# 阶段 6：高级 Composable（3-5 天）

> 掌握复杂业务逻辑的封装：状态机、工厂模式、双向同步

## 学习清单

| 序号 | 文件 | 行数 | 核心知识点 | 详细注释 |
|------|------|------|-----------|---------|
| 32 | `packages/core/useStorage/index.ts` | 323 | **重点** 序列化策略 + 跨标签页同步 | [useStorage.md](./useStorage.md) |
| 33 | `packages/core/onClickOutside/index.ts` | 198 | iOS workaround + 多根节点 | [onClickOutside.md](./onClickOutside.md) |
| 34 | `packages/core/useDraggable/index.ts` | 238 | 状态机 + 边界约束 | [useDraggable.md](./useDraggable.md) |
| 35 | `packages/core/useWebSocket/index.ts` | 351 | 心跳 + 重连 + 缓冲区 | [useWebSocket.md](./useWebSocket.md) |
| 36 | `packages/core/useVirtualList/index.ts` | 319 | 6 个工厂函数 + 方向策略 | [useVirtualList.md](./useVirtualList.md) |

## 阅读顺序

```
useStorage（重点精读，花 1-2 天）
  → onClickOutside
  → useDraggable
  → useWebSocket
  → useVirtualList
```

## 学习目标

- [ ] **核心目标**：精读 `useStorage`，理解最复杂的 composable 设计
- [ ] 掌握序列化器策略模式（8 种内置 + 自定义）
- [ ] 掌握 pausableWatch 防循环机制
- [ ] 掌握跨标签页同步（StorageEvent + CustomEvent）
- [ ] 掌握 iOS Safari 的事件兼容处理
- [ ] 掌握状态机模式在拖拽中的应用
- [ ] 掌握心跳机制和自动重连策略
- [ ] 掌握虚拟列表的核心算法

## 关键代码解读

**useStorage 的防循环机制：**

```ts
// 1. 监听 data 变化 → 写入 storage
watch(data, () => {
  // 暂停对 storage 事件的监听，避免循环
  pause()
  try {
    // 写入 storage
    storage.setItem(key, serializer.write(data.value))
    // 触发自定义事件，通知同文档内的其他实例
    window?.dispatchEvent(new CustomEvent(customStorageEventName, { detail: key }))
  } finally {
    // nextTick 后恢复监听
    nextTick().then(resume)
  }
}, { flush: 'post' })

// 2. 监听 storage 事件 → 更新 data
useEventListener(window, 'storage', (e) => {
  if (e.key === key) {
    data.value = serializer.read(e.newValue)
  }
})
```

**useStorage 的序列化器策略：**

```ts
const StorageSerializers: Record<string, Serializer<any>> = {
  boolean: { read: (v) => v === 'true', write: (v) => String(v) },
  object:  { read: JSON.parse, write: JSON.stringify },
  number:  { read: (v) => Number.parseFloat(v), write: String },
  string:  { read: (v) => v, write: String },
  map:     { read: (v) => new Map(JSON.parse(v)), write: (v) => JSON.stringify([...v]) },
  set:     { read: (v) => new Set(JSON.parse(v)), write: (v) => JSON.stringify([...v]) },
  date:    { read: (v) => new Date(v), write: (v) => v.toISOString() },
  any:     { read: JSON.parse, write: JSON.stringify },
}
```

**onClickOutside 的 iOS workaround：**

```ts
// iOS Safari 需要在 body 子元素上添加空 click 处理器
// 否则点击事件不会正确冒泡到 document
const _iOSWorkaround = /* 一次性标记 */ () => {
  for (const el of document.body.children)
    el.addEventListener('click', noop)
  document.documentElement.addEventListener('click', noop)
}
```

**useWebSocket 的心跳机制：**

```ts
// 心跳：定期发送 ping，超时未收到 pong 则断开
const { pause, resume } = useIntervalFn(() => {
  ws.send(heartbeat.message ?? 'ping')
  timer = setTimeout(() => {
    ws.close()  // pong 超时，主动断开
  }, heartbeat.pongTimeout ?? 1000)
}, heartbeat.interval ?? 1000)
```

## 练习

1. **精读 useStorage**（最重要）：
   - 画出 data ↔ storage ↔ StorageEvent 三者的数据流图
   - 理解 `pausableWatch` 防循环的时序
   - 理解 `mergeDefaults` 的两种合并策略
   - 理解 `initOnMounted` 延迟初始化的用途
2. 阅读 `onClickOutside`，理解 `composedPath()` 的作用
3. 阅读 `useDraggable`，画出 start/move/end 的状态转换图
4. 阅读 `useWebSocket`，理解自动重连的实现
5. 练习：实现一个 `useLocalStorage` 作为 `useStorage` 的特化版本

## 笔记

在这里记录你的学习笔记。