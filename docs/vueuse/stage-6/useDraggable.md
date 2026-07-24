# useDraggable 源码详细注释

> 让元素可拖拽的 hook，基于 Pointer Events API，支持边界约束和轴限制

---

## 1. 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useDraggable/index.ts` |
| 代码行数 | 238 行 |
| 所属包 | `@vueuse/core` |
| 依赖工具 | `useEventListener`、`defaultWindow`、`toRefs`、`computed`、`toValue` |
| 核心知识点 | 状态机模式 + 边界约束 + Pointer Event API |

**功能概述：**
- 使任意 HTML/SVG 元素可拖拽
- 支持边界约束（限制在容器内拖拽）
- 支持轴限制（仅水平/垂直/双向拖拽）
- 支持拖拽手柄（handle）分离
- 支持鼠标/触摸/笔多种指针类型

---

## 2. 类型定义注释

### UseDraggableOptions 接口

```typescript
export interface UseDraggableOptions {
  /**
   * 是否仅在直接点击元素时触发拖拽
   * @default false
   * 
   * 当 exact 为 true 时，只有直接点击目标元素才会触发拖拽，
   * 点击子元素不会触发。适用于需要精确控制拖拽触发区域的场景。
   */
  exact?: MaybeRefOrGetter<boolean>

  /**
   * 是否阻止事件默认行为
   * @default false
   * 
   * 设置为 true 会调用 e.preventDefault()，
   * 常用于阻止浏览器的默认拖拽行为或文本选择。
   */
  preventDefault?: MaybeRefOrGetter<boolean>

  /**
   * 是否阻止事件冒泡
   * @default false
   * 
   * 设置为 true 会调用 e.stopPropagation()，
   * 防止拖拽事件向上冒泡到父元素。
   */
  stopPropagation?: MaybeRefOrGetter<boolean>

  /**
   * 是否在捕获阶段监听事件
   * @default true
   * 
   * 捕获阶段（capturing phase）是从外向内传播的阶段，
   * 设置为 true 可以在事件到达目标元素之前就捕获。
   */
  capture?: boolean

  /**
   * pointermove 和 pointerup 事件绑定的目标元素
   * @default window
   * 
   * 默认绑定到 window，这样即使鼠标移出目标元素也能继续拖拽。
   * 可以设置为特定容器元素以限制事件监听范围。
   */
  draggingElement?: MaybeRefOrGetter<HTMLElement | SVGElement | Window | Document | null | undefined>

  /**
   * 边界约束容器元素
   * @default undefined
   * 
   * 设置后，拖拽范围会被限制在该容器的可视区域内。
   * 计算边界时会考虑容器的 scrollWidth 和 scrollHeight。
   */
  containerElement?: MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>

  /**
   * 拖拽手柄元素
   * @default target（默认使用目标元素本身）
   * 
   * 可以指定目标元素的某个子元素作为拖拽手柄，
   * 实现"拖拽标题栏移动整个窗口"的效果。
   */
  handle?: MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>

  /**
   * 监听的指针类型
   * @default ['mouse', 'touch', 'pen']
   * 
   * 可以过滤只处理特定类型的指针事件，
   * 例如只监听鼠标事件，忽略触摸事件。
   */
  pointerTypes?: PointerType[]

  /**
   * 元素的初始位置
   * @default { x: 0, y: 0 }
   * 
   * 设置拖拽元素的初始坐标位置。
   */
  initialValue?: MaybeRefOrGetter<Position>

  /**
   * 拖拽开始时的回调函数
   * 
   * @param position - 当前位置 { x, y }
   * @param event - PointerEvent 事件对象
   * @returns 返回 false 可以阻止拖拽开始
   * 
   * 常用于拖拽前的条件判断或初始化操作。
   */
  onStart?: (position: Position, event: PointerEvent) => void | false

  /**
   * 拖拽过程中的回调函数
   * 
   * @param position - 当前位置 { x, y }
   * @param event - PointerEvent 事件对象
   * 
   * 在每次 pointermove 时触发，用于实时更新或联动其他组件。
   */
  onMove?: (position: Position, event: PointerEvent) => void

  /**
   * 拖拽结束时的回调函数
   * 
   * @param position - 最终位置 { x, y }
   * @param event - PointerEvent 事件对象
   * 
   * 在 pointerup 时触发，用于保存位置或执行收尾操作。
   */
  onEnd?: (position: Position, event: PointerEvent) => void

  /**
   * 拖拽轴限制
   * @default 'both'
   * 
   * - 'x': 仅允许水平拖拽
   * - 'y': 仅允许垂直拖拽
   * - 'both': 允许水平和垂直拖拽
   */
  axis?: 'x' | 'y' | 'both'

  /**
   * 是否禁用拖拽
   * @default false
   * 
   * 设置为 true 后，所有拖拽操作将被禁用。
   * 支持响应式，可以动态启用/禁用拖拽。
   */
  disabled?: MaybeRefOrGetter<boolean>

  /**
   * 允许触发拖拽的鼠标按键
   * @default [0]（仅左键）
   * 
   * - 0: 主按钮（通常是左键）
   * - 1: 辅助按钮（通常是中键/滚轮）
   * - 2: 次要按钮（通常是右键）
   * - 3: 第四个按钮（浏览器后退）
   * - 4: 第五个按钮（浏览器前进）
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value
   */
  buttons?: MaybeRefOrGetter<number[]>
}
```

---

## 3. 状态机分析（重点）

### 状态定义

useDraggable 使用 `pressedDelta` 作为状态标志，实现了一个简洁的状态机：

```typescript
const pressedDelta = deepRef<Position>()
```

**三个状态：**

1. **空闲态（Idle）**
   - `pressedDelta = undefined`
   - 元素静止，不响应 pointermove 事件
   - 等待用户按下鼠标

2. **拖拽态（Dragging）**
   - `pressedDelta = Position { x, y }`
   - 存储鼠标按下时相对于元素左上角的偏移量
   - 持续响应 pointermove 事件，更新 position

3. **结束态（End）**
   - `pressedDelta = undefined`（清空后回到空闲态）
   - 触发 onEnd 回调
   - 等待下一次拖拽

### 状态转换图

```
空闲态 --[pointerdown]--> 拖拽态
  ↑                           |
  |                           |
  +--[pointerup]--------------+
       (pressedDelta = undefined)
```

**详细转换过程：**

```
1. 空闲态 → 拖拽态（start 函数）
   - 用户按下鼠标（pointerdown）
   - 通过所有守卫条件（按键、禁用、指针类型、exact 模式）
   - 计算 pressedDelta（鼠标相对元素的偏移）
   - 设置 pressedDelta.value = pos
   - 调用 onStart 回调

2. 拖拽态 → 拖拽态（move 函数）
   - 用户移动鼠标（pointermove）
   - 检查 pressedDelta 存在（确认在拖拽中）
   - 计算新位置（考虑边界约束和轴限制）
   - 更新 position.value
   - 调用 onMove 回调

3. 拖拽态 → 空闲态（end 函数）
   - 用户释放鼠标（pointerup）
   - 检查 pressedDelta 存在（确认在拖拽中）
   - 清空 pressedDelta.value = undefined
   - 调用 onEnd 回调
```

### 状态机的优势

1. **清晰的状态判断**：通过 `pressedDelta` 的值即可判断当前状态
2. **防止状态混乱**：每个阶段都有守卫条件，避免非法状态转换
3. **易于扩展**：可以轻松添加新状态或修改状态转换逻辑

---

## 4. start 函数详细注释

```typescript
const start = (e: PointerEvent) => {
  // ============================================================
  // 守卫条件 1：按键过滤
  // ============================================================
  // 检查按下的鼠标按键是否在允许列表中
  // 默认只允许左键（0），可以通过 buttons 选项配置
  if (!toValue(buttons).includes(e.button))
    return

  // ============================================================
  // 守卫条件 2：禁用检查
  // ============================================================
  // 检查是否禁用拖拽，以及指针类型是否匹配
  // disabled 支持响应式，可以动态禁用
  if (toValue(options.disabled) || !filterEvent(e))
    return

  // ============================================================
  // 守卫条件 3：exact 模式检查
  // ============================================================
  // exact 为 true 时，只有直接点击目标元素才会触发
  // 点击子元素不会触发拖拽
  if (toValue(exact) && e.target !== toValue(target))
    return

  // ============================================================
  // 计算鼠标按下时的偏移量
  // ============================================================
  const container = toValue(containerElement)
  const containerRect = container?.getBoundingClientRect?.()
  const targetRect = toValue(target)!.getBoundingClientRect()
  
  const pos = {
    // X 轴偏移量计算
    x: e.clientX - (container 
      ? targetRect.left - containerRect!.left + container.scrollLeft  // 有容器时：相对容器的偏移
      : targetRect.left  // 无容器时：相对视口的偏移
    ),
    // Y 轴偏移量计算
    y: e.clientY - (container
      ? targetRect.top - containerRect!.top + container.scrollTop  // 有容器时：相对容器的偏移
      : targetRect.top  // 无容器时：相对视口的偏移
    ),
  }
  // 💡 偏移量的含义：鼠标点击位置相对于元素左上角的距离
  // 💡 这个偏移量会在 move 函数中用于计算元素的新位置

  // ============================================================
  // onStart 回调（返回 false 可阻止拖拽）
  // ============================================================
  if (onStart?.(pos, e) === false)
    return

  // ============================================================
  // 进入拖拽状态
  // ============================================================
  // 设置 pressedDelta，标志进入拖拽状态
  pressedDelta.value = pos
  
  // 处理事件（阻止默认行为和冒泡）
  handleEvent(e)
}
```

**start 函数的核心职责：**
1. 验证拖拽条件（按键、禁用、指针类型、exact 模式）
2. 计算鼠标按下时的偏移量（pressedDelta）
3. 触发 onStart 回调
4. 进入拖拽状态

---

## 5. move 函数详细注释

```typescript
const move = (e: PointerEvent) => {
  // ============================================================
  // 守卫条件 1：禁用和指针类型检查
  // ============================================================
  if (toValue(options.disabled) || !filterEvent(e))
    return

  // ============================================================
  // 守卫条件 2：状态检查
  // ============================================================
  // 只有 pressedDelta 存在时才处理 move 事件
  // 这确保只有在拖拽状态下才会响应鼠标移动
  if (!pressedDelta.value)
    return

  // ============================================================
  // 计算新位置
  // ============================================================
  const container = toValue(containerElement)
  const targetRect = toValue(target)!.getBoundingClientRect()
  let { x, y } = position.value

  // ============================================================
  // X 轴计算和边界约束
  // ============================================================
  if (axis === 'x' || axis === 'both') {
    // 计算新 X 坐标：鼠标位置 - 按下时的偏移量
    x = e.clientX - pressedDelta.value.x
    
    // 如果有容器，应用边界约束
    if (container)
      x = Math.min(
        Math.max(0, x),  // 左边界：不能小于 0
        container.scrollWidth - targetRect!.width  // 右边界：不能超出容器
      )
  }
  // 💡 Math.max(0, x)：确保元素不会拖到容器左边
  // 💡 Math.min(..., max)：确保元素不会拖到容器右边

  // ============================================================
  // Y 轴计算和边界约束
  // ============================================================
  if (axis === 'y' || axis === 'both') {
    // 计算新 Y 坐标：鼠标位置 - 按下时的偏移量
    y = e.clientY - pressedDelta.value.y
    
    // 如果有容器，应用边界约束
    if (container)
      y = Math.min(
        Math.max(0, y),  // 上边界：不能小于 0
        container.scrollHeight - targetRect!.height  // 下边界：不能超出容器
      )
  }
  // 💡 边界约束的公式：Math.min(Math.max(最小值, 当前值), 最大值)
  // 💡 这是一个常用的"钳位"（clamp）操作

  // ============================================================
  // 更新位置
  // ============================================================
  position.value = {
    x,
    y,
  }

  // ============================================================
  // 触发 onMove 回调
  // ============================================================
  onMove?.(position.value, e)
  
  // 处理事件
  handleEvent(e)
}
```

**move 函数的核心职责：**
1. 验证拖拽状态
2. 计算新位置（考虑轴限制）
3. 应用边界约束（如果设置了 containerElement）
4. 更新 position
5. 触发 onMove 回调

**边界约束的数学原理：**
```
新位置 = Math.min(Math.max(最小边界, 计算位置), 最大边界)

X 轴：
- 最小边界 = 0（容器左边缘）
- 最大边界 = container.scrollWidth - targetRect.width（容器右边缘 - 元素宽度）

Y 轴：
- 最小边界 = 0（容器上边缘）
- 最大边界 = container.scrollHeight - targetRect.height（容器下边缘 - 元素高度）
```

---

## 6. end 函数详细注释

```typescript
const end = (e: PointerEvent) => {
  // ============================================================
  // 守卫条件 1：禁用和指针类型检查
  // ============================================================
  if (toValue(options.disabled) || !filterEvent(e))
    return

  // ============================================================
  // 守卫条件 2：状态检查
  // ============================================================
  // 只有 pressedDelta 存在时才处理 end 事件
  // 这确保只有在拖拽状态下才会响应鼠标释放
  if (!pressedDelta.value)
    return

  // ============================================================
  // 退出拖拽状态
  // ============================================================
  // 清空 pressedDelta，标志退出拖拽状态
  // 这会使 isDragging 计算属性变为 false
  pressedDelta.value = undefined

  // ============================================================
  // 触发 onEnd 回调
  // ============================================================
  // 传递最终位置和事件对象
  onEnd?.(position.value, e)
  
  // 处理事件
  handleEvent(e)
}
```

**end 函数的核心职责：**
1. 验证拖拽状态
2. 清空 pressedDelta，退出拖拽状态
3. 触发 onEnd 回调

**状态转换：**
```
拖拽态 (pressedDelta = { x, y })
    ↓ pointerup
    ↓ 清空 pressedDelta
空闲态 (pressedDelta = undefined)
```

---

## 7. 事件注册策略

### 事件绑定策略

```typescript
if (isClient) {
  const config = () => ({
    capture: options.capture ?? true,
    passive: !toValue(preventDefault),
  })

  // pointerdown 绑定在 draggingHandle（默认是 target）
  useEventListener(draggingHandle, 'pointerdown', start, config)
  
  // pointermove 和 pointerup 绑定在 draggingElement（默认是 window）
  useEventListener(draggingElement, 'pointermove', move, config)
  useEventListener(draggingElement, 'pointerup', end, config)
}
```

### 为什么 pointerdown 绑定在 target，而 move/up 绑定在 window？

**设计原因：**

1. **pointerdown 绑定在 target/handle**
   - 只有在目标元素（或手柄）上按下鼠标才应该开始拖拽
   - 这是拖拽的"触发点"
   - 如果绑定在 window，点击页面任意位置都会触发拖拽

2. **pointermove/pointerup 绑定在 window**
   - **关键设计**：确保鼠标移出元素外仍能继续拖拽
   - 如果绑定在 target，鼠标移出元素后就无法继续拖拽
   - 这是拖拽的"持续监听"
   - window 是最大的监听范围，确保不会丢失事件

**场景示例：**
```
用户拖拽一个元素，鼠标移动很快，移出了元素边界：
- 如果 move 绑定在 target：鼠标移出后，move 事件不再触发，拖拽中断
- 如果 move 绑定在 window：鼠标移出后，move 事件仍然触发，拖拽继续
```

### capture 和 passive 配置

```typescript
const config = () => ({
  capture: options.capture ?? true,  // 默认在捕获阶段触发
  passive: !toValue(preventDefault),  // 如果不需要阻止默认行为，设置为 passive
})
```

**capture（捕获阶段）：**
- 默认为 `true`，在捕获阶段触发事件
- 捕获阶段是从外向内传播的阶段
- 可以在事件到达目标元素之前就捕获
- 适用于需要优先处理事件的场景

**passive（被动模式）：**
- 如果 `preventDefault` 为 false，设置 `passive: true`
- 告诉浏览器这个事件监听器不会调用 `preventDefault()`
- 浏览器可以优化滚动性能
- 如果 `preventDefault` 为 true，设置 `passive: false`，允许调用 `preventDefault()`

---

## 8. 返回值注释

```typescript
return {
  // ============================================================
  // 解构后的响应式坐标
  // ============================================================
  ...toRefs(position),
  // toRefs 将 position 对象转换为 { x: Ref<number>, y: Ref<number> }
  // 可以直接解构使用：const { x, y } = useDraggable(target)

  // ============================================================
  // 完整的位置对象
  // ============================================================
  position,
  // 原始的 position ref，包含 { x, y }
  // 适用于需要传递整个位置对象的场景

  // ============================================================
  // 拖拽状态
  // ============================================================
  isDragging: computed(() => !!pressedDelta.value),
  // 计算属性：是否正在拖拽
  // 当 pressedDelta 有值时为 true，否则为 false
  // 可以用于显示拖拽状态或应用拖拽样式

  // ============================================================
  // CSS 样式字符串
  // ============================================================
  style: computed(
    () => `left:${position.value.x}px;top:${position.value.y}px;`,
  ),
  // 计算属性：生成 CSS 样式字符串
  // 可以直接绑定到元素的 style 属性：:style="style"
  // 格式：left:100px;top:200px;
}
```

**返回值的使用方式：**

```typescript
// 方式 1：解构使用 x, y
const { x, y } = useDraggable(target)
// x 和 y 是独立的 ref，可以单独使用

// 方式 2：使用完整 position
const { position } = useDraggable(target)
// position.value.x, position.value.y

// 方式 3：使用 style
const { style } = useDraggable(target)
// 直接绑定：<div :style="style">

// 方式 4：使用 isDragging
const { isDragging } = useDraggable(target)
// 用于条件渲染或样式切换
```

---

## 9. 设计模式分析

### 1. 状态机模式

**核心实现：**
```typescript
const pressedDelta = deepRef<Position>()
// undefined → 空闲态
// Position → 拖拽态
```

**应用：**
- start 函数：空闲态 → 拖拽态
- move 函数：拖拽态 → 拖拽态（更新位置）
- end 函数：拖拽态 → 空闲态

**优势：**
- 状态清晰，易于理解
- 通过 pressedDelta 的值判断当前状态
- 防止非法状态转换

### 2. 策略模式（axis 限制）

**核心实现：**
```typescript
if (axis === 'x' || axis === 'both') {
  x = e.clientX - pressedDelta.value.x
  // ...
}
if (axis === 'y' || axis === 'both') {
  y = e.clientY - pressedDelta.value.y
  // ...
}
```

**应用：**
- 根据 axis 配置选择不同的计算策略
- 'x'：只更新 x 坐标
- 'y'：只更新 y 坐标
- 'both'：同时更新 x 和 y 坐标

**优势：**
- 通过配置选择行为，而不是修改代码
- 易于扩展新的轴限制策略

### 3. 观察者模式（onStart/onMove/onEnd 回调）

**核心实现：**
```typescript
onStart?.(pos, e)  // 拖拽开始时通知
onMove?.(position.value, e)  // 拖拽过程中通知
onEnd?.(position.value, e)  // 拖拽结束时通知
```

**应用：**
- 用户可以通过回调函数监听拖拽事件
- 可以在回调中执行自定义逻辑
- onStart 返回 false 可以阻止拖拽

**优势：**
- 解耦拖拽逻辑和业务逻辑
- 用户可以在不修改源码的情况下扩展功能

### 4. 边界约束模式

**核心实现：**
```typescript
x = Math.min(Math.max(0, x), container.scrollWidth - targetRect.width)
y = Math.min(Math.max(0, y), container.scrollHeight - targetRect.height)
```

**应用：**
- 使用 Math.min/Math.max 实现"钳位"操作
- 确保元素不会超出容器边界
- 公式：`newPos = Math.min(Math.max(min, current), max)`

**优势：**
- 简洁的数学表达
- 自动处理边界情况
- 易于理解和维护

---

## 10. 使用示例

### 示例 1：基本拖拽

```vue
<template>
  <div
    ref="target"
    :style="style"
    class="draggable-box"
  >
    拖拽我
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const target = ref()
const { x, y, style, isDragging } = useDraggable(target)
</script>

<style scoped>
.draggable-box {
  position: fixed;
  width: 200px;
  height: 100px;
  background: #4caf50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  user-select: none;
}
</style>
```

**说明：**
- 最简单的用法，元素可以自由拖拽
- 使用 style 计算属性直接绑定位置
- 没有边界限制，可以拖到页面任意位置

---

### 示例 2：限制在容器内拖拽

```vue
<template>
  <div class="container" style="width: 500px; height: 400px; border: 2px solid #ccc; position: relative;">
    <div
      ref="target"
      :style="style"
      class="draggable-box"
    >
      拖拽我（不能超出容器）
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const target = ref()
const container = ref()

const { style } = useDraggable(target, {
  containerElement: container,
})
</script>

<style scoped>
.container {
  position: relative;
  overflow: hidden;
}

.draggable-box {
  position: absolute;
  width: 100px;
  height: 50px;
  background: #2196f3;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  user-select: none;
}
</style>
```

**说明：**
- 设置 `containerElement` 限制拖拽范围
- 元素会被限制在容器的可视区域内
- 使用 Math.min/Math.max 实现边界约束

---

### 示例 3：仅允许水平拖拽

```vue
<template>
  <div class="slider-track">
    <div
      ref="target"
      :style="style"
      class="slider-thumb"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const target = ref()
const { x, style } = useDraggable(target, {
  axis: 'x',  // 仅允许水平拖拽
  containerElement: ref(null),  // 可选：限制在轨道内
})
</script>

<style scoped>
.slider-track {
  width: 300px;
  height: 10px;
  background: #ddd;
  position: relative;
  margin: 50px;
}

.slider-thumb {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #f44336;
  border-radius: 50%;
  top: -5px;
  cursor: grab;
}
</style>
```

**说明：**
- 设置 `axis: 'x'` 限制只能水平拖拽
- 适用于滑块、滚动条等场景
- y 坐标始终保持不变

---

### 示例 4：使用 handle 手柄

```vue
<template>
  <div
    ref="target"
    :style="style"
    class="window"
  >
    <div ref="handle" class="title-bar">
      标题栏（拖拽这里移动窗口）
    </div>
    <div class="content">
      窗口内容区域
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const target = ref()
const handle = ref()

const { style, isDragging } = useDraggable(target, {
  handle,  // 指定拖拽手柄
})
</script>

<style scoped>
.window {
  position: fixed;
  width: 300px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title-bar {
  background: #3f51b5;
  color: white;
  padding: 10px;
  cursor: grab;
  user-select: none;
}

.content {
  padding: 20px;
}
</style>
```

**说明：**
- 设置 `handle` 指定拖拽手柄
- 只有在手柄上按下鼠标才会触发拖拽
- 适用于窗口、面板等需要标题栏拖拽的场景

---

### 示例 5：使用回调函数

```vue
<template>
  <div
    ref="target"
    :style="style"
    class="draggable-box"
  >
    位置: ({{ x }}, {{ y }})
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const target = ref()
const { x, y, style } = useDraggable(target, {
  onStart: (position, event) => {
    console.log('拖拽开始', position)
    // 返回 false 可以阻止拖拽
    // if (someCondition) return false
  },
  onMove: (position, event) => {
    console.log('拖拽中', position)
    // 可以在这里执行实时更新逻辑
  },
  onEnd: (position, event) => {
    console.log('拖拽结束', position)
    // 可以在这里保存位置到 localStorage
  },
})
</script>
```

**说明：**
- onStart：拖拽开始时触发，返回 false 可阻止拖拽
- onMove：拖拽过程中持续触发
- onEnd：拖拽结束时触发
- 适用于需要在拖拽过程中执行自定义逻辑的场景

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useEventListener` | 被依赖 | 事件监听器管理，自动清理 |
| `useMouse` | 同级 | 鼠标位置追踪，不处理拖拽 |
| `useSwipe` | 同级 | 滑动手势识别 |
| `useScroll` | 同级 | 滚动位置管理 |
| `defaultWindow` | 被依赖 | SSR 安全的 window 对象 |
| `toValue` | 被依赖 | 解包 Ref 或 getter |
| `toRefs` | 被依赖 | 将响应式对象转换为 ref 对象 |

---

## 练习

1. 阅读源码，理解状态机模式的实现
2. 理解边界约束的 Math.min/Math.max 逻辑
3. 思考：为什么 pointermove 和 pointerup 挂载到 window 而不是 target？
4. 思考：pressedDelta 为什么用深层 ref 而不是普通变量？
5. 练习：实现一个支持多指针拖拽的版本

---

## 笔记

```
在此记录你的学习笔记...


```
