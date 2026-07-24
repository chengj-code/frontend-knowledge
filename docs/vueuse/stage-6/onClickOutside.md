# onClickOutside 源码详细注释

> 监听元素外部的点击事件，支持 iOS Safari workaround、Shadow DOM 兼容、多根节点检测和控制模式

## 1. 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/onClickOutside/index.ts` |
| 代码行数 | 198 行 |
| 功能 | 监听元素外部的点击事件 |
| 核心知识点 | iOS Safari workaround、多根节点检测、Shadow DOM 支持、controls 模式 |

---

## 2. 类型定义注释

### 2.1 OnClickOutsideOptions 接口

```ts
export interface OnClickOutsideOptions<Controls extends boolean = false> extends ConfigurableWindow {
  /**
   * List of elements that should not trigger the event.
   */
  ignore?: MaybeRefOrGetter<(MaybeElementRef | string)[]>
  /**
   * Use capturing phase for internal event listener.
   * @default true
   */
  capture?: boolean
  /**
   * Run handler function if focus moves to an iframe.
   * @default false
   */
  detectIframe?: boolean
  /**
   * Use controls to cancel/trigger listener.
   * @default false
   */
  controls?: Controls
}
```

**选项说明：**

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `ignore` | `MaybeRefOrGetter<(MaybeElementRef \| string)[]>` | `[]` | 需要忽略的元素列表，支持 DOM 元素、Ref、CSS 选择器字符串 |
| `capture` | `boolean` | `true` | 是否使用捕获阶段，捕获阶段可以更早地捕获事件，避免被 `stopPropagation` 阻止 |
| `detectIframe` | `boolean` | `false` | 是否检测 iframe 获得焦点，当用户点击 iframe 时，外层页面会触发 blur 事件 |
| `controls` | `boolean` | `false` | 是否启用控制模式，启用后返回 `{ stop, cancel, trigger }` 而非单个 stop 函数 |

### 2.2 OnClickOutsideHandler 类型

```ts
export type OnClickOutsideHandler<
  T extends {
    detectIframe: OnClickOutsideOptions['detectIframe']
    controls: boolean
  } = { detectIframe: false, controls: false },
> = (
  event: T['controls'] extends true ? Event | (T['detectIframe'] extends true
    ? PointerEvent | FocusEvent
    : PointerEvent) : T['detectIframe'] extends true
    ? PointerEvent | FocusEvent
    : PointerEvent,
) => void
```

**条件类型解析：**

- `controls=true` 时，event 可能是 `Event`（trigger 手动触发时）
- `detectIframe=true` 时，event 可能是 `FocusEvent`（iframe blur）
- 默认情况下，event 是 `PointerEvent`（click 事件）

### 2.3 函数重载签名

```ts
// 重载 1：controls = true 时，返回 { stop, cancel, trigger }
export function onClickOutside(
  target: MaybeElementRef,
  handler: OnClickOutsideHandler<{ detectIframe: OnClickOutsideOptions['detectIframe'], controls: true }>,
  options: OnClickOutsideOptions<true>,
): { stop: Fn, cancel: Fn, trigger: (event: Event) => void }

// 重载 2：controls = false 时，返回 stop 函数
export function onClickOutside(
  target: MaybeElementRef,
  handler: OnClickOutsideHandler<{ detectIframe: OnClickOutsideOptions['detectIframe'], controls: false }>,
  options?: OnClickOutsideOptions<false>,
): Fn
```

---

## 3. iOS Safari 兼容处理（重点注释）

### 3.1 问题描述

iOS Safari 中，click 事件不会冒泡到 document/window，除非目标元素或其祖先有 `cursor: pointer` CSS 样式。这导致 `onClickOutside` 绑定在 window 上的监听器无法捕获 click 事件。

### 3.2 解决方案

```ts
let _iOSWorkaround = false

if (isIOS && !_iOSWorkaround) {
  _iOSWorkaround = true
  const listenerOptions = { passive: true }
  // Not using useEventListener because this event handlers must not be disposed.
  // See previusly linked references and https://github.com/vueuse/vueuse/issues/4724
  Array.from(window.document.body.children)
    .forEach(el => el.addEventListener('click', noop, listenerOptions))
  window.document.documentElement.addEventListener('click', noop, listenerOptions)
}
```

**实现细节：**

1. **`_iOSWorkaround` 单例标记**：使用模块级变量，确保整个应用只执行一次，避免重复添加监听器
2. **为什么使用 `{ passive: true }`**：表示监听器不会调用 `preventDefault()`，浏览器可以优化滚动性能
3. **为什么不能用 `useEventListener`**：因为这些监听器必须在整个应用生命周期内存在，不能随组件销毁而移除。移除监听器会导致 iOS Safari 的问题再次出现

**相关 issue：**
- [#1520](https://github.com/vueuse/vueuse/issues/1520)
- [#4724](https://github.com/vueuse/vueuse/issues/4724)

---

## 4. shouldIgnore 函数

```ts
const shouldIgnore = (event: Event) => {
  return toValue(ignore).some((target) => {
    if (typeof target === 'string') {
      return Array.from(window.document.querySelectorAll(target))
        .some(el => el === event.target || event.composedPath().includes(el))
    }
    else {
      const el = unrefElement(target)
      return el && (event.target === el || event.composedPath().includes(el))
    }
  })
}
```

**处理逻辑：**

1. **字符串选择器**：使用 `querySelectorAll` 获取所有匹配的元素，检查事件目标是否在其中
2. **元素引用**：使用 `unrefElement` 获取真实 DOM 元素，检查事件目标是否匹配

**`composedPath()` 的作用（Shadow DOM 兼容）：**

| 特性 | `event.target` | `event.composedPath()` |
|------|---------------|----------------------|
| 返回值 | 单个元素 | 元素数组（事件传播路径） |
| Shadow DOM | 指向 shadow host | 包含 shadow root 内部元素 |
| 跨 Shadow 边界 | 不穿透 | 穿透 |

**示例场景：**
```html
<!-- Shadow DOM 中的按钮 -->
<my-component>
  #shadow-root
    <button id="btn">Click me</button>
</my-component>

<!-- ignore 列表包含 button -->
const ignore = [ref(button)]
```
- 使用 `event.target` → 指向 `<my-component>`，不匹配 button
- 使用 `event.composedPath()` → 包含 button，正确匹配

---

## 5. 多根节点检测

### 5.1 hasMultipleRoots 函数

```ts
function hasMultipleRoots(target: MaybeElementRef): boolean {
  const vm = toValue(target) as ComponentPublicInstance
  return vm && vm.$.subTree.shapeFlag === 16
}
```

**`shapeFlag === 16` 的含义：**

- `ShapeFlags.ELEMENT = 1`
- `ShapeFlags.FUNCTIONAL_COMPONENT = 2`
- `ShapeFlags.STATEFUL_COMPONENT = 4`
- `ShapeFlags.TEXT_CHILDREN = 8`
- `ShapeFlags.ARRAY_CHILDREN = 16` ← 多根节点
- `ShapeFlags.SLOTS_CHILDREN = 32`

### 5.2 checkMultipleRoots 函数

```ts
function checkMultipleRoots(target: MaybeElementRef, event: Event): boolean {
  const vm = toValue(target) as ComponentPublicInstance
  const children = vm.$.subTree && vm.$.subTree.children

  if (children == null || !Array.isArray(children))
    return false

  // @ts-expect-error should be VNode
  return children.some((child: VNode) => child.el === event.target || event.composedPath().includes(child.el))
}
```

**为什么需要这个检测：**

```vue
<!-- 单根节点 -->
<template>
  <div>Single Root</div>
</template>
// el → <div>，可以直接比较

<!-- 多根节点（Vue 3 支持） -->
<template>
  <div>Root 1</div>
  <div>Root 2</div>
</template>
// el → null，需要遍历 children
```

**检测流程：**
1. `hasMultipleRoots` → 检查 shapeFlag 是否为 16
2. `checkMultipleRoots` → 遍历子节点，检查事件目标是否在某个根节点内

---

## 6. listener 核心逻辑

```ts
const listener = (event: Event) => {
  const el = unrefElement(target)

  if (event.target == null)
    return

  if (!(el instanceof Element) && hasMultipleRoots(target) && checkMultipleRoots(target, event))
    return

  if (!el || el === event.target || event.composedPath().includes(el))
    return

  if ('detail' in event && event.detail === 0)
    shouldListen = !shouldIgnore(event)

  if (!shouldListen) {
    shouldListen = true
    return
  }

  handler(event as any)
}
```

**事件过滤逻辑的完整流程：**

1. **空目标守卫**：`event.target == null` 时直接返回
2. **多根节点检测**：如果 `unrefElement` 返回的不是 Element（多根节点组件的 el 为 null），则检查是否有多根节点，且事件目标在某个根节点内
3. **内部点击检测**：el 不存在、el 就是事件目标、事件路径包含 el 时返回
4. **`detail === 0` 的判断意义**：表示这是 pointerdown 事件（非 click 事件），pointerdown 在 capture 阶段触发，比 click 更早，用于提前判断是否应该忽略接下来的 click 事件
5. **`shouldListen` 标志的使用**：如果为 false（被 ignore），重置并返回，下次事件会重新判断

---

## 7. 事件监听策略

### 7.1 pointerdown：预判断，设置 shouldListen

```ts
useEventListener(window, 'pointerdown', (e) => {
  const el = unrefElement(target)
  shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el))
}, { passive: true })
```

**事件触发顺序：**
1. `pointerdown`（冒泡阶段）→ 设置 `shouldListen`
2. `click`（捕获阶段）→ 使用 `shouldListen` 的值

**为什么要分两步？**
- `pointerdown` 更早触发（在 click 之前）
- 可以提前判断是否应该忽略接下来的 click 事件
- 避免在 click 回调中做复杂的判断

### 7.2 click：触发实际回调

```ts
let isProcessingClick = false

useEventListener(window, 'click', (event: PointerEvent) => {
  if (!isProcessingClick) {
    isProcessingClick = true
    setTimeout(() => {
      isProcessingClick = false
    }, 0)
    listener(event)
  }
}, { passive: true, capture })
```

### 7.3 isProcessingClick 防重复机制

**为什么需要防重复？**
- 某些浏览器中，click 事件可能因为冒泡而触发多次
- 特殊场景下（如事件合成）可能出现重复触发

**实现原理：**
1. 第一次 click → `isProcessingClick = true`，执行 listener
2. `setTimeout(fn, 0)` → 在下一个宏任务中重置为 false
3. 同一个事件循环中的重复 click → `isProcessingClick = true`，被忽略

**为什么用 `setTimeout(fn, 0)` 而非同步重置？**
- 同步重置：执行完 listener 后立即重置，可能在同一个事件的冒泡过程中再次触发
- `setTimeout(fn, 0)`：确保重置发生在当前事件循环结束后

### 7.4 blur + iframe 检测

```ts
detectIframe && useEventListener(window, 'blur', (event) => {
  setTimeout(() => {
    const el = unrefElement(target)
    if (
      window.document.activeElement?.tagName === 'IFRAME'
      && !el?.contains(window.document.activeElement)
    ) {
      handler(event as any)
    }
  }, 0)
}, { passive: true })
```

**实现细节：**
- 只在 `detectIframe = true` 时注册
- 当窗口失去焦点（blur）时，可能是用户点击了 iframe
- `setTimeout(fn, 0)` 延迟检查：blur 事件触发时，activeElement 还未更新，延迟到下一个宏任务，activeElement 已经指向 iframe
- 检查条件：activeElement 是 iframe 且 iframe 不在目标元素内部

---

## 8. controls 模式

```ts
if (controls) {
  return {
    stop,
    cancel: () => {
      shouldListen = false
    },
    trigger: (event: Event) => {
      shouldListen = true
      listener(event)
      shouldListen = false
    },
  }
}
```

**三种控制方法：**

| 方法 | 作用 | 使用场景 |
|------|------|---------|
| `stop()` | 移除所有事件监听器 | 组件卸载、功能关闭 |
| `cancel()` | 临时阻止下一次触发 | 某些操作期间需要暂停监听 |
| `trigger(event)` | 手动触发 handler | 模拟外部点击、测试 |

**`trigger` 的实现细节：**
- 设置 `shouldListen = true` 确保 listener 会执行 handler
- 执行完后立即重置，避免影响后续真实事件

---

## 9. 设计模式分析

### 9.1 防御式编程（iOS 兼容）

- 使用模块级变量 `_iOSWorkaround` 确保 workaround 只执行一次
- 使用 `noop` 函数作为占位符，避免空指针错误
- SSR 环境下返回空操作，保证返回值类型一致性

### 9.2 事件委托

- 将事件监听器绑定在 `window` 上，而非目标元素
- 使用 `composedPath()` 处理 Shadow DOM 边界
- 使用捕获阶段（capture）更早地捕获事件

### 9.3 状态标志位模式

- `shouldListen`：控制 listener 是否执行 handler
- `isProcessingClick`：防止同一个 click 事件触发多次 handler
- `_iOSWorkaround`：确保 iOS workaround 只执行一次

### 9.4 策略模式

- 根据 `controls` 选项返回不同的结果类型
- 根据 `detectIframe` 选项决定是否注册 blur 监听器
- 根据 `capture` 选项决定事件监听阶段

---

## 10. 使用示例

### 10.1 基本用法

```vue
<template>
  <div ref="target">
    <p>点击此区域外部会触发事件</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const target = ref<HTMLDivElement>()

onClickOutside(target, (event) => {
  console.log('点击了外部', event)
})
</script>
```

### 10.2 忽略特定元素

```vue
<template>
  <div ref="modal">
    <button ref="closeBtn">关闭</button>
    <p>点击模态框外部关闭</p>
  </div>
  <button ref="triggerBtn">打开模态框</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const modal = ref<HTMLDivElement>()
const closeBtn = ref<HTMLButtonElement>()
const triggerBtn = ref<HTMLButtonElement>()

onClickOutside(modal, (event) => {
  console.log('点击了模态框外部')
}, {
  // 忽略关闭按钮和触发按钮
  ignore: [closeBtn, triggerBtn],
})
</script>
```

### 10.3 使用 CSS 选择器忽略

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const modal = ref<HTMLDivElement>()

onClickOutside(modal, (event) => {
  console.log('点击了模态框外部')
}, {
  // 忽略所有 .ignore 元素和 #sidebar
  ignore: ['.ignore', '#sidebar'],
})
</script>
```

### 10.4 启用 Controls 模式

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const target = ref<HTMLDivElement>()

const { stop, cancel, trigger } = onClickOutside(target, (event) => {
  console.log('点击了外部')
}, {
  controls: true,
})

// 停止监听
// stop()

// 临时取消下一次触发
// cancel()

// 手动触发
// trigger(new PointerEvent('click'))
</script>
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useEventListener` | 被依赖 | 事件监听器管理，自动清理 |
| `unrefElement` | 被依赖 | 从 Ref/组件实例提取 DOM 元素 |
| `useFocusWithin` | 同级 | 检测元素内部的焦点状态 |
| `onKeyStroke` | 同级 | 类似的键盘事件监听 hook |
| `useMouseInElement` | 同级 | 检测鼠标是否在元素内部 |

---

## 练习

1. 阅读源码，理解 iOS Safari workaround 的原理
2. 理解 `composedPath()` 在 Shadow DOM 中的作用
3. 思考：为什么 capture 阶段使用 pointerdown 而不是 click？
4. 思考：`isProcessingClick` 为什么用 `setTimeout(fn, 0)` 而非同步重置？
5. 练习：实现一个简化版的 `onClickOutside`，只支持基本功能

---

## 笔记

```
在此记录你的学习笔记...
```