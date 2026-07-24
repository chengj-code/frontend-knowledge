# 阶段 5：DOM 事件与浏览器 API（3-5 天）

> 掌握 useEventListener——VueUse 的基石 hook

## 学习清单

| 序号 | 文件 | 行数 | 核心知识点 |
|------|------|------|-----------|
| 22 | `packages/core/useMounted/index.ts` | 24 | getCurrentInstance |
| 23 | `packages/core/useSupported/index.ts` | 15 | 挂载后检测模式 |
| 24 | `packages/core/_configurable.ts` | ~40 | 可配置环境注入 |
| 25 | `packages/core/useEventListener/index.ts` | 185 | **重点** 6 种重载、响应式 target |
| 26 | `packages/core/useMouse/index.ts` | 167 | 策略模式、多事件源 |
| 27 | `packages/core/useWindowSize/index.ts` | 92 | 三种视口类型 |
| 28 | `packages/core/useFullscreen/index.ts` | 175 | 浏览器前缀兼容 |
| 29 | `packages/core/useNetwork/index.ts` | 128 | Network API 封装 |
| 30 | `packages/core/useIdle/index.ts` | 99 | 事件过滤器 + 多事件聚合 |
| 31 | `packages/core/useClipboard/index.ts` | 135 | 降级策略 + 权限检查 |

## 详细文档

本阶段已为每个 hook 创建了详细的注释文档：

| 文档 | 内容 |
|------|------|
| [useMounted.md](./useMounted.md) | 组件挂载状态检测 |
| [useSupported.md](./useSupported.md) | 挂载后才检测模式 |
| [_configurable.md](./_configurable.md) | 可配置环境注入系统 |
| [useEventListener.md](./useEventListener.md) | ⭐ VueUse 基石（重点精读） |
| [useMouse.md](./useMouse.md) | 策略模式 + 多事件源聚合 |
| [useWindowSize.md](./useWindowSize.md) | 三种视口类型 |
| [useFullscreen.md](./useFullscreen.md) | 浏览器前缀兼容 |
| [useNetwork.md](./useNetwork.md) | 多属性只读 ref 模式 |
| [useIdle.md](./useIdle.md) | 事件过滤器 + 多事件聚合 |
| [useClipboard.md](./useClipboard.md) | 降级策略 + 权限检查 |

## 阅读顺序

```
useMounted → useSupported → _configurable.ts
  → useEventListener（⭐ 重点精读，建议花 1 天）
  → useMouse → useWindowSize → useFullscreen
  → useNetwork → useIdle → useClipboard
```

## 学习目标

- [ ] **核心目标**：精读 `useEventListener`，理解其 6 种函数重载的设计
- [ ] 理解 `defaultWindow`/`defaultDocument` 可配置模式
- [ ] 理解 `useSupported` 的"挂载后才检测"模式
- [ ] 掌握事件监听的自动清理机制（`tryOnScopeDispose`）
- [ ] 掌握响应式 target/event/listener 的 watch 重启机制
- [ ] 掌握浏览器 API 的前缀兼容处理
- [ ] 掌握多事件源聚合（mouse + touch + scroll）

## 关键代码解读

**useEventListener 的参数推断：**

```ts
// 核心难点：第一个参数可能是 target 也可能是 event name
// 通过判断第一个参数是否为"事件目标"来区分
const isTarget = firstParamTargets.some(el => Array.isArray(el) ? el.includes(firstParam) : el === firstParam)

if (isTarget) {
  [target, event, listener, options] = args
} else {
  [event, listener, options] = args
  target = defaultWindow  // 默认监听 window
}
```

**useEventListener 的响应式重启：**

```ts
// 当 target/event/listener/options 任何变化时，自动重新注册
watchImmediate(
  () => [unrefElement(target), toValue(event), toValue(listener), toValue(raw_options)],
  ([el, event, listener, options]) => {
    cleanup()           // 清理旧监听器
    if (!el) return     // target 为空时跳过
    // 注册新监听器
    const events = Array.isArray(event) ? event : [event]
    for (const e of events) {
      el.addEventListener(e, listener, options)
      cleanups.push(() => el.removeEventListener(e, listener, options))
    }
  },
  { flush: 'post' },    // DOM 更新后执行
)
```

**useMouse 的策略模式：**

```ts
// 内置 4 种坐标提取策略
const extractorMap: UseMouseBuiltinExtractors = {
  page: (event) => [event.pageX, event.pageY],
  client: (event) => [event.clientX, event.clientY],
  screen: (event) => [event.screenX, event.screenY],
  movement: (event) => event.type === 'mousemove' ? [event.movementX, event.movementY] : null,
}

// 支持自定义提取函数
const extractor = options.type === 'function'
  ? options.type  // 用户自定义
  : extractorMap[options.type || 'page']  // 内置策略
```

## 练习

1. **精读 useEventListener**（最重要）：
   - 理解 6 种重载签名的参数差异
   - 理解 `firstParamTargets` 如何推断参数位置
   - 理解 `watchImmediate` 的响应式重启机制
   - 理解 `flush: 'post'` 的作用
2. 阅读 `_configurable.ts`，理解为什么需要可配置的 window/document
3. 阅读 `useMouse`，理解 4 种坐标提取策略的实现
4. 阅读 `useFullscreen`，理解浏览器前缀兼容的处理方式
5. 练习：基于 `useEventListener` 实现一个 `useKeyPress` composable

## 笔记

在这里记录你的学习笔记。