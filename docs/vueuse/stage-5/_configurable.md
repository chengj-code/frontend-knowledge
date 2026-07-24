# _configurable.ts 源码详细注释

> VueUse 的可配置环境注入系统，实现 iframe/SSR/测试的环境隔离

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/_configurable.ts` |
| 代码行数 | 50 行 |
| 所属包 | `@vueuse/core` |
| 依赖工具 | `isClient` |
| 设计模式 | 依赖注入模式 |
| 核心知识点 | 可配置环境、SSR 安全默认值 |

---

## 源码逐行注释

```ts
import { isClient } from '@vueuse/shared'

// ============================================================
// 第一部分：可配置接口（⭐ 依赖注入的核心）
// ============================================================

export interface ConfigurableWindow {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window
}
// 💡 允许 composable 接受自定义的 window 对象
// 💡 使用场景：
//    1. iframe 中操作其他窗口的 window
//    2. 测试时注入 mock 的 window
//    3. SSR 时传入 undefined 避免报错

export interface ConfigurableDocument {
  /*
   * Specify a custom `document` instance, e.g. working with iframes or in testing environments.
   */
  document?: Document
}
// 💡 允许 composable 接受自定义的 document 对象

export interface ConfigurableDocumentOrShadowRoot {
  /*
   * Specify a custom `document` instance or a shadow root, e.g. working with iframes or in testing environments.
   */
  document?: DocumentOrShadowRoot
}
// 💡 允许接受 Document 或 ShadowRoot
// 💡 ShadowRoot 是 Web Components 的影子 DOM

export interface ConfigurableNavigator {
  /*
   * Specify a custom `navigator` instance, e.g. working with iframes or in testing environments.
   */
  navigator?: Navigator
}
// 💡 允许 composable 接受自定义的 navigator 对象

export interface ConfigurableLocation {
  /*
   * Specify a custom `location` instance, e.g. working with iframes or in testing environments.
   */
  location?: Location
}
// 💡 允许 composable 接受自定义的 location 对象

// ============================================================
// 第二部分：默认值（⭐ SSR 安全）
// ============================================================

export const defaultWindow = /* #__PURE__ */ isClient ? window : undefined
// 💡 SSR 安全的 window 默认值
// 💡 客户端：返回 window 对象
// 💡 服务端：返回 undefined（避免 "window is not defined" 错误）
// 💡 `/* #__PURE__ */`：告诉打包工具这是纯表达式，可以 tree-shake

export const defaultDocument = /* #__PURE__ */ isClient ? window.document : undefined
// 💡 SSR 安全的 document 默认值

export const defaultNavigator = /* #__PURE__ */ isClient ? window.navigator : undefined
// 💡 SSR 安全的 navigator 默认值

export const defaultLocation = /* #__PURE__ */ isClient ? window.location : undefined
// 💡 SSR 安全的 location 默认值

// ============================================================
// 第三部分：深度引用配置
// ============================================================

export interface ConfigurableDeepRefs<D extends boolean> {
  /**
   * Return deep refs instead of shallow refs.
   *
   * @default true - will be changed to `false` by default in the next major
   */
  deepRefs?: D
}
// 💡 控制 composable 返回 deep ref 还是 shallow ref
// 💡 默认 true（当前版本），下个大版本将改为 false
// 💡 shallow ref 性能更好，但不追踪深层属性变化
```

---

## 依赖注入模式

### 使用方式

```ts
// composable 定义
export function useXxx(options: ConfigurableWindow = {}) {
  const { window = defaultWindow } = options
  // 使用 window（可能是自定义的，也可能是默认的）
}

// 使用方
useXxx()  // 使用默认 window
useXxx({ window: iframe.contentWindow })  // 使用 iframe 的 window
```

### 为什么需要可配置？

| 场景 | 问题 | 解决方案 |
|------|------|---------|
| SSR | window 不存在 | `defaultWindow` 返回 undefined |
| iframe | 需要操作其他窗口 | 传入 `iframe.contentWindow` |
| 测试 | 需要 mock 环境 | 传入 mock 对象 |
| Shadow DOM | 需要操作影子根 | 传入 ShadowRoot |

---

## 关联文件

| 文件 | 关系 | 说明 |
|------|------|------|
| `useEventListener` | 被依赖 | 使用 `defaultWindow` |
| `useMouse` | 被依赖 | 使用 `defaultWindow` |
| `useFullscreen` | 被依赖 | 使用 `defaultDocument` |
| `useClipboard` | 被依赖 | 使用 `defaultNavigator` |

---

## 笔记

```
在此记录你的学习笔记...

```
