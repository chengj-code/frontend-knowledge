# useVirtualList 源码详细注释

> 虚拟列表（只渲染可视区域的元素）—— VueUse 核心 hook

---

## 1. 基本信息

| 属性 | 值 |
|------|-----|
| 文件位置 | `packages/core/useVirtualList/index.ts` |
| 代码行数 | 319 行 |
| 功能 | 虚拟列表（只渲染可视区域的元素） |
| 核心知识点 | 6 个工厂函数 + 方向策略模式 + 可变高度支持 |

---

## 2. 类型定义注释

### 2.1 `UseVirtualListItemSize`

```ts
type UseVirtualListItemSize = number | ((index: number) => number)
```

- **固定值**：所有项目尺寸相同，性能最优
- **函数**：根据索引返回不同尺寸，支持可变高度/宽度

### 2.2 `UseHorizontalVirtualListOptions` / `UseVerticalVirtualListOptions`

```ts
export interface UseHorizontalVirtualListOptions extends UseVirtualListOptionsBase {
  itemWidth: UseVirtualListItemSize // 项目宽度，固定值或函数
}

export interface UseVerticalVirtualListOptions extends UseVirtualListOptionsBase {
  itemHeight: UseVirtualListItemSize // 项目高度，固定值或函数
}
```

### 2.3 `UseVirtualListOptionsBase`

```ts
export interface UseVirtualListOptionsBase {
  overscan?: number // 缓冲区项目数量，默认 5
}
```

- **overscan**：在可视区域外额外渲染的项目数，防止快速滚动时出现空白

### 2.4 `UseVirtualListItem<T>`

```ts
export interface UseVirtualListItem<T> {
  data: T      // 原始数据
  index: number // 在源数组中的真实索引
}
```

### 2.5 `UseVirtualListReturn<T>`

```ts
export interface UseVirtualListReturn<T> {
  list: Ref<UseVirtualListItem<T>[]> // 当前渲染的列表项（已切片）
  scrollTo: (index: number) => void  // 滚动到指定索引
  containerProps: {
    ref: Ref<HTMLElement | null>     // 容器元素引用
    onScroll: () => void             // 滚动事件处理
    style: StyleValue                // 容器样式
  }
  wrapperProps: ComputedRef<{        // 包装器属性
    style: {
      width: string
      height: string
      marginTop: string              // 垂直列表使用
    } | {
      width: string
      height: string
      marginLeft: string             // 水平列表使用
      display: string                // 水平列表需要 flex 布局
    }
  }>
}
```

### 2.6 内部类型

```ts
type UseVirtualListContainerRef = Ref<HTMLElement | null> // 容器引用
interface UseVirtualElementSizes { width: Ref<number>; height: Ref<number> } // 元素尺寸
type UseVirtualListArray<T> = UseVirtualListItem<T>[]     // 列表项数组
type UseVirtualListRefArray<T> = Ref<UseVirtualListArray<T>> // 响应式列表项数组
type UseVirtualListSource<T> = Ref<readonly T[]> | ShallowRef<readonly T[]> // 源数据
interface UseVirtualListState { start: number; end: number } // 可视范围状态
type RefState = Ref<UseVirtualListState>                  // 响应式状态

interface UseVirtualListResources<T> {
  state: RefState                    // 当前渲染范围 { start, end }
  source: UseVirtualListSource<T>    // 源数据
  currentList: UseVirtualListRefArray<T> // 当前渲染的列表项
  size: UseVirtualElementSizes       // 容器尺寸
  containerRef: UseVirtualListContainerRef // 容器引用
}
```

---

## 3. 主函数 useVirtualList

```ts
export function useVirtualList<T = any>(
  list: MaybeRef<readonly T[]>,
  options: UseVirtualListOptions
): UseVirtualListReturn<T> {
  // 根据 options 中是否存在 itemHeight 来选择垂直/水平策略
  const { containerStyle, wrapperProps, scrollTo, calculateRange, currentList, containerRef } = 
    'itemHeight' in options
      ? useVerticalVirtualList(options, list)
      : useHorizontalVirtualList(options, list)

  // 返回值的组装方式
  return {
    list: currentList,
    scrollTo,
    containerProps: {
      ref: containerRef,
      onScroll: () => calculateRange(), // 滚动时重新计算范围
      style: containerStyle,
    },
    wrapperProps,
  }
}
```

**策略选择逻辑**：
- 存在 `itemHeight` → 垂直列表
- 存在 `itemWidth` → 水平列表

---

## 4. useVirtualListResources 工厂函数

```ts
function useVirtualListResources<T>(list: MaybeRef<readonly T[]>): UseVirtualListResources<T> {
  const containerRef = shallowRef<HTMLElement | null>(null) // 容器引用，浅层响应式
  const size = useElementSize(containerRef)                 // 通过 useElementSize 获取容器尺寸
  const currentList: Ref<UseVirtualListItem<T>[]> = deepRef([]) // 当前渲染的数据切片
  const source = shallowRef(list)                           // 原始数据（shallowRef）
  const state: Ref<{ start: number, end: number }> = deepRef({ start: 0, end: 10 }) // 可视范围索引

  return { state, source, currentList, size, containerRef }
}
```

**资源共享模式**：
- 避免重复创建响应式状态
- 水平和垂直列表共享相同的资源结构
- 统一管理生命周期

---

## 5. 六个工厂函数详解（重点）

### 5.1 createGetViewCapacity

**功能**：计算容器能容纳多少个元素

```ts
function createGetViewCapacity<T>(
  state: UseVirtualListResources<T>['state'],
  source: UseVirtualListResources<T>['source'],
  itemSize: UseVirtualListItemSize
) {
  return (containerSize: number) => {
    // 固定尺寸：Math.ceil(containerSize / itemSize)
    if (typeof itemSize === 'number')
      return Math.ceil(containerSize / itemSize)

    // 可变尺寸：从 start 开始累加，直到超过容器尺寸
    const { start = 0 } = state.value
    let sum = 0
    let capacity = 0
    for (let i = start; i < source.value.length; i++) {
      const size = itemSize(i)
      sum += size
      capacity = i
      if (sum > containerSize)
        break
    }
    return capacity - start
  }
}
```

### 5.2 createGetOffset

**功能**：根据滚动距离计算起始索引

```ts
function createGetOffset<T>(
  source: UseVirtualListResources<T>['source'],
  itemSize: UseVirtualListItemSize
) {
  return (scrollDirection: number) => {
    // 固定尺寸：Math.floor(scroll / itemSize) + 1
    if (typeof itemSize === 'number')
      return Math.floor(scrollDirection / itemSize) + 1

    // 可变尺寸：逐个累加直到 sum >= scroll
    let sum = 0
    let offset = 0
    for (let i = 0; i < source.value.length; i++) {
      const size = itemSize(i)
      sum += size
      if (sum >= scrollDirection) {
        offset = i
        break
      }
    }
    return offset + 1
  }
}
```

### 5.3 createCalculateRange（核心算法）

**功能**：计算可视范围 [start, end]

```ts
function createCalculateRange<T>(
  type: 'horizontal' | 'vertical',
  overscan: number,
  getOffset: ReturnType<typeof createGetOffset>,
  getViewCapacity: ReturnType<typeof createGetViewCapacity>,
  { containerRef, state, currentList, source }: UseVirtualListResources<T>
) {
  return () => {
    const element = containerRef.value
    if (element) {
      // 根据方向获取滚动偏移
      const offset = getOffset(type === 'vertical' ? element.scrollTop : element.scrollLeft)
      // 获取可视容量
      const viewCapacity = getViewCapacity(type === 'vertical' ? element.clientHeight : element.clientWidth)

      // 计算范围：offset - overscan 到 offset + viewCapacity + overscan
      const from = offset - overscan
      const to = offset + viewCapacity + overscan

      // 边界修正
      state.value = {
        start: from < 0 ? 0 : from,
        end: to > source.value.length ? source.value.length : to,
      }

      // 更新 currentList：slice + map
      currentList.value = source.value
        .slice(state.value.start, state.value.end)
        .map((ele, index) => ({
          data: ele,
          index: index + state.value.start,
        }))
    }
  }
}
```

### 5.4 createGetDistance

**功能**：计算前 N 个元素的总高度/宽度

```ts
function createGetDistance<T>(
  itemSize: UseVirtualListItemSize,
  source: UseVirtualListResources<T>['source']
) {
  return (index: number) => {
    // 固定尺寸：index * itemSize
    if (typeof itemSize === 'number') {
      return index * itemSize
    }

    // 可变尺寸：slice(0, index).reduce(sum)
    return source.value
      .slice(0, index)
      .reduce((sum, _, i) => sum + itemSize(i), 0)
  }
}
```

### 5.5 createComputedTotalSize

**功能**：计算列表总高度/宽度，用于设置 wrapper 的总尺寸

```ts
function createComputedTotalSize<T>(
  itemSize: UseVirtualListItemSize,
  source: UseVirtualListResources<T>['source']
) {
  return computed(() => {
    // 固定尺寸：length * itemSize
    if (typeof itemSize === 'number')
      return source.value.length * itemSize

    // 可变尺寸：reduce 累加
    return source.value.reduce((sum, _, index) => sum + itemSize(index), 0)
  })
}
```

### 5.6 createScrollTo

**功能**：滚动到指定索引

```ts
const scrollToDictionaryForElementScrollKey = {
  horizontal: 'scrollLeft',
  vertical: 'scrollTop',
} as const

function createScrollTo<T>(
  type: 'horizontal' | 'vertical',
  calculateRange: () => void,
  getDistance: ReturnType<typeof createGetDistance>,
  containerRef: UseVirtualListResources<T>['containerRef']
) {
  return (index: number) => {
    if (containerRef.value) {
      // 通过 getDistance 计算目标位置
      // 设置 scrollTop/scrollLeft
      containerRef.value[scrollToDictionaryForElementScrollKey[type]] = getDistance(index)
      calculateRange() // 重新计算范围
    }
  }
}
```

---

## 6. useWatchForSizes

```ts
function useWatchForSizes<T>(
  size: UseVirtualElementSizes,
  list: MaybeRef<readonly T[]>,
  containerRef: Ref<HTMLElement | null>,
  calculateRange: () => void
) {
  // 监听容器尺寸、列表数据、containerRef 变化时重新计算范围
  watch([size.width, size.height, list, containerRef], () => {
    calculateRange()
  })
}
```

**监听场景**：
- 窗口 resize → 容器尺寸变化
- 数据源变化 → list 更新
- 容器引用变化 → containerRef 更新

---

## 7. 水平 vs 垂直策略对比

| 特性 | 垂直列表 | 水平列表 |
|------|----------|----------|
| **配置项** | `itemHeight` | `itemWidth` |
| **containerStyle** | `overflowY: auto` | `overflowX: auto` |
| **wrapperProps** | `height: totalHeight - offsetTop`<br>`marginTop: offsetTop` | `width: totalWidth - offsetLeft`<br>`marginLeft: offsetLeft`<br>`display: flex` |
| **scroll 方向** | `scrollTop` | `scrollLeft` |
| **布局方式** | 默认块级 | flex 布局 |

---

## 8. wrapperProps 的计算逻辑

### 垂直列表

```ts
const wrapperProps = computed(() => ({
  style: {
    width: '100%',
    height: `${totalHeight.value - offsetTop.value}px`,
    marginTop: `${offsetTop.value}px`,
  }
}))
```

### 水平列表

```ts
const wrapperProps = computed(() => ({
  style: {
    height: '100%',
    width: `${totalWidth.value - offsetLeft.value}px`,
    marginLeft: `${offsetLeft.value}px`,
    display: 'flex',
  }
}))
```

### 为什么是 totalSize - offset（而不是 totalSize）

- **totalSize**：整个列表的总尺寸（包含不可见部分）
- **offset**：当前渲染起始位置的偏移量
- **totalSize - offset**：从当前位置到列表末尾的尺寸
- **原理**：
  1. `marginTop/marginLeft` 将可视区域推到正确位置
  2. `height/width` 保持滚动条长度正确（只显示剩余部分）
  3. 浏览器原生滚动条，无需自定义

---

## 9. 设计模式分析

### 9.1 工厂函数模式（6 个 create*）

- **createGetViewCapacity**：计算可视容量
- **createGetOffset**：计算滚动偏移
- **createCalculateRange**：计算渲染范围
- **createGetDistance**：计算累计距离
- **createComputedTotalSize**：计算总尺寸
- **createScrollTo**：滚动到指定位置

**优势**：
- 单一职责：每个函数只做一件事
- 可复用：水平和垂直列表共享相同的工厂函数
- 可测试：纯函数，易于单元测试

### 9.2 策略模式（垂直/水平）

```ts
const { ... } = 'itemHeight' in options
  ? useVerticalVirtualList(options, list)
  : useHorizontalVirtualList(options, list)
```

**优势**：
- 运行时根据配置选择不同策略
- 策略之间互不影响，易于扩展

### 9.3 资源共享模式（UseVirtualListResources）

```ts
interface UseVirtualListResources<T> {
  state: RefState
  source: UseVirtualListSource<T>
  currentList: UseVirtualListRefArray<T>
  size: UseVirtualElementSizes
  containerRef: UseVirtualListContainerRef
}
```

**优势**：
- 避免重复创建响应式状态
- 统一管理生命周期
- 水平和垂直列表共享相同的资源结构

### 9.4 计算属性驱动

- `wrapperProps`、`offsetTop`、`totalHeight` 等都是计算属性
- 依赖变化时自动更新
- 保持响应式一致性

---

## 10. 使用示例

### 10.1 固定高度列表

```vue
<template>
  <div v-bind="containerProps" style="height: 400px;">
    <div v-bind="wrapperProps">
      <div v-for="item in list" :key="item.index" style="height: 50px;">
        {{ item.data }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVirtualList } from '@vueuse/core'

const data = Array.from({ length: 10000 }, (_, i) => `Item ${i}`)

const { list, containerProps, wrapperProps } = useVirtualList(data, {
  itemHeight: 50,  // 固定高度
  overscan: 10,    // 预渲染 10 个项目
})
</script>
```

### 10.2 可变高度列表

```vue
<template>
  <div v-bind="containerProps" style="height: 400px;">
    <div v-bind="wrapperProps">
      <div v-for="item in list" :key="item.index" :style="{ height: `${item.data.height}px` }">
        {{ item.data.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVirtualList } from '@vueuse/core'

const data = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  content: `Item ${i}`,
  height: 30 + Math.random() * 70, // 30-100px 随机高度
}))

const { list, containerProps, wrapperProps } = useVirtualList(data, {
  itemHeight: (index) => data[index].height,  // 动态高度函数
})
</script>
```

### 10.3 水平列表

```vue
<template>
  <div v-bind="containerProps" style="width: 100%; height: 200px;">
    <div v-bind="wrapperProps">
      <div v-for="item in list" :key="item.index" style="width: 200px; flex-shrink: 0;">
        {{ item.data }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVirtualList } from '@vueuse/core'

const data = Array.from({ length: 1000 }, (_, i) => `Card ${i}`)

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(data, {
  itemWidth: 200,
})
</script>
```

### 10.4 动态数据

```vue
<template>
  <button @click="addItem">添加项目</button>
  <div v-bind="containerProps" style="height: 400px;">
    <div v-bind="wrapperProps">
      <div v-for="item in list" :key="item.index" style="height: 50px;">
        {{ item.data }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVirtualList } from '@vueuse/core'

const data = ref(Array.from({ length: 1000 }, (_, i) => `Item ${i}`))

const { list, containerProps, wrapperProps } = useVirtualList(data, {
  itemHeight: 50,
})

const addItem = () => {
  data.value = [...data.value, `Item ${data.value.length}`]
}
</script>
```

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型导入
// ============================================================

import type { ComputedRef, MaybeRef, Ref, ShallowRef, StyleValue } from 'vue'
// ComputedRef → 计算属性引用类型
// MaybeRef<T> = T | Ref<T> → 可以是原始值或 Ref
// Ref → 标准响应式引用类型
// ShallowRef → 浅层响应式引用类型
// StyleValue → Vue 样式值类型

import { computed, ref as deepRef, shallowRef, watch } from 'vue'
// computed → 创建计算属性
// ref as deepRef → 重命名 ref 为 deepRef，避免与类型 Ref 混淆
// shallowRef → 创建浅层响应式引用（只跟踪 .value 变化）
// watch → 侦听器

import { useElementSize } from '../useElementSize'
// 监听元素尺寸变化的 hook

// ============================================================
// 第二部分：类型定义
// ============================================================

type UseVirtualListItemSize = number | ((index: number) => number)
// 项目尺寸类型：固定数字或根据索引返回尺寸的函数
// 固定数字：所有项目高度/宽度相同，性能最优
// 函数：项目高度/宽度不同，更灵活但计算复杂

export interface UseHorizontalVirtualListOptions extends UseVirtualListOptionsBase {
  /**
   * item width, accept a pixel value or a function that returns the width
   *
   * @default 0
   */
  itemWidth: UseVirtualListItemSize
  // 水平列表的项目宽度配置
  // 支持固定值或动态函数
}

export interface UseVerticalVirtualListOptions extends UseVirtualListOptionsBase {
  /**
   * item height, accept a pixel value or a function that returns the height
   *
   * @default 0
   */
  itemHeight: UseVirtualListItemSize
  // 垂直列表的项目高度配置
  // 支持固定值或动态函数
}

export interface UseVirtualListOptionsBase {
  /**
   * the extra buffer items outside of the view area
   *
   * @default 5
   */
  overscan?: number
  // 预渲染缓冲区项目数量
  // 默认 5，表示在可视区域外额外渲染 5 个项目
  // 防止快速滚动时出现空白
}

export type UseVirtualListOptions = UseHorizontalVirtualListOptions | UseVerticalVirtualListOptions
// 联合类型，根据配置自动判断方向

export interface UseVirtualListItem<T> {
  data: T
  index: number
}
// 虚拟列表项结构
// data: 原始数据
// index: 在源数组中的真实索引

export interface UseVirtualListReturn<T> {
  list: Ref<UseVirtualListItem<T>[]>
  // 当前渲染的列表项（已切片）
  scrollTo: (index: number) => void
  // 滚动到指定索引的方法
  containerProps: {
    ref: Ref<HTMLElement | null>
    // 容器元素引用
    onScroll: () => void
    // 滚动事件处理函数
    style: StyleValue
    // 容器样式（overflow: auto）
  }
  wrapperProps: ComputedRef<{
    style: {
      width: string
      height: string
      marginTop: string
    } | {
      width: string
      height: string
      marginLeft: string
      display: string
    }
  }>
  // 包装器属性，用于模拟滚动位置
  // 垂直列表：marginTop 模拟偏移
  // 水平列表：marginLeft 模拟偏移
}

// ============================================================
// 第三部分：主函数（核心入口）
// ============================================================

/**
 * Please consider using [`vue-virtual-scroller`](https://github.com/Akryum/vue-virtual-scroller) if you are looking for more features.
 */
export function useVirtualList<T = any>(list: MaybeRef<readonly T[]>, options: UseVirtualListOptions): UseVirtualListReturn<T> {
  // 根据配置自动选择方向策略
  const { containerStyle, wrapperProps, scrollTo, calculateRange, currentList, containerRef } = 'itemHeight' in options
    ? useVerticalVirtualList(options, list)
    : useHorizontalVirtualList(options, list)
  // 通过 'itemHeight' in options 判断方向
  // 存在 itemHeight → 垂直列表
  // 存在 itemWidth → 水平列表
  // 策略模式：不同方向使用不同的实现

  // 返回统一的接口
  return {
    list: currentList,
    scrollTo,
    containerProps: {
      ref: containerRef,
      onScroll: () => {
        calculateRange()
        // 每次滚动都重新计算可视范围
      },
      style: containerStyle,
    },
    wrapperProps,
  }
}

// ============================================================
// 第四部分：内部类型定义
// ============================================================

type UseVirtualListContainerRef = Ref<HTMLElement | null>
// 容器元素引用类型

interface UseVirtualElementSizes {
  width: Ref<number>
  height: Ref<number>
}
// 元素尺寸类型

type UseVirtualListArray<T> = UseVirtualListItem<T>[]
// 虚拟列表项数组类型

type UseVirtualListRefArray<T> = Ref<UseVirtualListArray<T>>
// 响应式虚拟列表项数组类型

type UseVirtualListSource<T> = Ref<readonly T[]> | ShallowRef<readonly T[]>
// 源数据类型

interface UseVirtualListState { start: number, end: number }
// 虚拟列表状态：当前渲染的起始和结束索引

type RefState = Ref<UseVirtualListState>
// 响应式状态类型

interface UseVirtualListResources<T> {
  state: RefState
  source: UseVirtualListSource<T>
  currentList: UseVirtualListRefArray<T>
  size: UseVirtualElementSizes
  containerRef: UseVirtualListContainerRef
}
// 共享资源接口
// 包含所有虚拟列表需要的响应式状态
// 被水平和垂直列表策略共享

// ============================================================
// 第五部分：useVirtualListResources 函数（共享资源管理）
// ============================================================

function useVirtualListResources<T>(list: MaybeRef<readonly T[]>): UseVirtualListResources<T> {
  const containerRef = shallowRef<HTMLElement | null>(null)
  // 容器元素引用，浅层响应式

  const size = useElementSize(containerRef)
  // 使用 useElementSize 监听容器尺寸变化
  // 返回 { width, height } 响应式引用

  const currentList: Ref<UseVirtualListItem<T>[]> = deepRef([])
  // 当前渲染的列表项，深层响应式

  const source = shallowRef(list)
  // 源数据，浅层响应式
  // 使用 shallowRef 避免深度监听大型数组

  const state: Ref<{ start: number, end: number }> = deepRef({ start: 0, end: 10 })
  // 当前可视范围状态
  // 初始值 start: 0, end: 10

  return { state, source, currentList, size, containerRef }
  // 返回所有共享资源
}

// ============================================================
// 第六部分：工厂函数（核心算法）
// ============================================================

function createGetViewCapacity<T>(state: UseVirtualListResources<T>['state'], source: UseVirtualListResources<T>['source'], itemSize: UseVirtualListItemSize) {
  // 工厂函数：创建获取可视容量的函数
  // 可视容量 = 容器尺寸内能显示多少个项目
  return (containerSize: number) => {
    if (typeof itemSize === 'number')
      return Math.ceil(containerSize / itemSize)
    // 固定尺寸：容器尺寸 / 项目尺寸，向上取整

    const { start = 0 } = state.value
    let sum = 0
    let capacity = 0
    for (let i = start; i < source.value.length; i++) {
      const size = itemSize(i)
      sum += size
      capacity = i
      if (sum > containerSize)
        break
    }
    return capacity - start
    // 动态尺寸：从 start 开始累加，直到超过容器尺寸
    // 返回能显示的项目数量
  }
}

function createGetOffset<T>(source: UseVirtualListResources<T>['source'], itemSize: UseVirtualListItemSize) {
  // 工厂函数：创建获取偏移量的函数
  // 偏移量 = 滚动位置对应的项目索引
  return (scrollDirection: number) => {
    if (typeof itemSize === 'number')
      return Math.floor(scrollDirection / itemSize) + 1
    // 固定尺寸：滚动位置 / 项目尺寸，向下取整再 +1

    let sum = 0
    let offset = 0
    for (let i = 0; i < source.value.length; i++) {
      const size = itemSize(i)
      sum += size
      if (sum >= scrollDirection) {
        offset = i
        break
      }
    }
    return offset + 1
    // 动态尺寸：累加项目尺寸，直到超过滚动位置
    // 返回对应的项目索引
  }
}

function createCalculateRange<T>(type: 'horizontal' | 'vertical', overscan: number, getOffset: ReturnType<typeof createGetOffset>, getViewCapacity: ReturnType<typeof createGetViewCapacity>, { containerRef, state, currentList, source }: UseVirtualListResources<T>) {
  // 工厂函数：创建计算可视范围的函数
  // 这是虚拟滚动的核心算法
  return () => {
    const element = containerRef.value
    if (element) {
      const offset = getOffset(type === 'vertical' ? element.scrollTop : element.scrollLeft)
      // 根据方向获取滚动偏移对应的项目索引

      const viewCapacity = getViewCapacity(type === 'vertical' ? element.clientHeight : element.clientWidth)
      // 获取可视区域能显示的项目数量

      const from = offset - overscan
      const to = offset + viewCapacity + overscan
      // 计算渲染范围：偏移量 ± 缓冲区

      state.value = {
        start: from < 0 ? 0 : from,
        end: to > source.value.length
          ? source.value.length
          : to,
      }
      // 边界处理：确保 start >= 0，end <= 总长度

      currentList.value = source.value
        .slice(state.value.start, state.value.end)
        .map((ele, index) => ({
          data: ele,
          index: index + state.value.start,
        }))
      // 切片源数组，生成当前渲染的列表项
      // 保留真实索引（index + state.value.start）
    }
  }
}

function createGetDistance<T>(itemSize: UseVirtualListItemSize, source: UseVirtualListResources<T>['source']) {
  // 工厂函数：创建获取距离的函数
  // 距离 = 从开始到指定索引的总尺寸
  return (index: number) => {
    if (typeof itemSize === 'number') {
      const size = index * itemSize
      return size
    }
    // 固定尺寸：索引 * 项目尺寸

    const size = source.value
      .slice(0, index)
      .reduce((sum, _, i) => sum + itemSize(i), 0)
    return size
    // 动态尺寸：累加从 0 到 index 的所有项目尺寸
  }
}

function useWatchForSizes<T>(size: UseVirtualElementSizes, list: MaybeRef<readonly T[]>, containerRef: Ref<HTMLElement | null>, calculateRange: () => void) {
  // 监听容器尺寸变化
  watch([size.width, size.height, list, containerRef], () => {
    calculateRange()
  })
  // 当容器宽度、高度、数据源或容器引用变化时，重新计算可视范围
  // 响应式更新：窗口 resize、数据变化等场景
}

function createComputedTotalSize<T>(itemSize: UseVirtualListItemSize, source: UseVirtualListResources<T>['source']) {
  // 工厂函数：创建计算总尺寸的计算属性
  return computed(() => {
    if (typeof itemSize === 'number')
      return source.value.length * itemSize
    // 固定尺寸：项目数量 * 项目尺寸

    return source.value.reduce((sum, _, index) => sum + itemSize(index), 0)
    // 动态尺寸：累加所有项目尺寸
  })
}

const scrollToDictionaryForElementScrollKey = {
  horizontal: 'scrollLeft',
  vertical: 'scrollTop',
} as const
// 方向到滚动属性的映射常量
// 水平列表 → scrollLeft
// 垂直列表 → scrollTop

function createScrollTo<T>(type: 'horizontal' | 'vertical', calculateRange: () => void, getDistance: ReturnType<typeof createGetDistance>, containerRef: UseVirtualListResources<T>['containerRef']) {
  // 工厂函数：创建滚动到指定索引的函数
  return (index: number) => {
    if (containerRef.value) {
      containerRef.value[scrollToDictionaryForElementScrollKey[type]] = getDistance(index)
      calculateRange()
    }
    // 设置容器的 scrollTop 或 scrollLeft
    // 然后重新计算可视范围
  }
}

// ============================================================
// 第七部分：方向策略实现
// ============================================================

function useHorizontalVirtualList<T>(options: UseHorizontalVirtualListOptions, list: MaybeRef<readonly T[]>) {
  // 水平虚拟列表实现
  const resources = useVirtualListResources(list)
  // 创建共享资源

  const { state, source, currentList, size, containerRef } = resources
  // 解构资源

  const containerStyle: StyleValue = { overflowX: 'auto' }
  // 容器样式：水平溢出自动滚动

  const { itemWidth, overscan = 5 } = options
  // 解构配置，overscan 默认 5

  const getViewCapacity = createGetViewCapacity(state, source, itemWidth)
  // 创建获取可视容量的函数

  const getOffset = createGetOffset(source, itemWidth)
  // 创建获取偏移量的函数

  const calculateRange = createCalculateRange('horizontal', overscan, getOffset, getViewCapacity, resources)
  // 创建计算可视范围的函数

  const getDistanceLeft = createGetDistance(itemWidth, source)
  // 创建获取水平距离的函数

  const offsetLeft = computed(() => getDistanceLeft(state.value.start))
  // 计算当前渲染起始位置的水平偏移

  const totalWidth = createComputedTotalSize(itemWidth, source)
  // 计算总宽度

  useWatchForSizes(size, list, containerRef, calculateRange)
  // 监听尺寸变化

  const scrollTo = createScrollTo('horizontal', calculateRange, getDistanceLeft, containerRef)
  // 创建滚动到指定索引的函数

  const wrapperProps = computed(() => {
    return {
      style: {
        height: '100%',
        width: `${totalWidth.value - offsetLeft.value}px`,
        marginLeft: `${offsetLeft.value}px`,
        display: 'flex',
      },
    }
  })
  // 包装器属性
  // width = 总宽度 - 已滚动宽度
  // marginLeft = 已滚动宽度（模拟滚动位置）
  // display: flex 用于水平布局

  return {
    scrollTo,
    calculateRange,
    wrapperProps,
    containerStyle,
    currentList,
    containerRef,
  }
}

function useVerticalVirtualList<T>(options: UseVerticalVirtualListOptions, list: MaybeRef<readonly T[]>) {
  // 垂直虚拟列表实现
  const resources = useVirtualListResources(list)
  // 创建共享资源

  const { state, source, currentList, size, containerRef } = resources
  // 解构资源

  const containerStyle: StyleValue = { overflowY: 'auto' }
  // 容器样式：垂直溢出自动滚动

  const { itemHeight, overscan = 5 } = options
  // 解构配置，overscan 默认 5

  const getViewCapacity = createGetViewCapacity(state, source, itemHeight)
  // 创建获取可视容量的函数

  const getOffset = createGetOffset(source, itemHeight)
  // 创建获取偏移量的函数

  const calculateRange = createCalculateRange('vertical', overscan, getOffset, getViewCapacity, resources)
  // 创建计算可视范围的函数

  const getDistanceTop = createGetDistance(itemHeight, source)
  // 创建获取垂直距离的函数

  const offsetTop = computed(() => getDistanceTop(state.value.start))
  // 计算当前渲染起始位置的垂直偏移

  const totalHeight = createComputedTotalSize(itemHeight, source)
  // 计算总高度

  useWatchForSizes(size, list, containerRef, calculateRange)
  // 监听尺寸变化

  const scrollTo = createScrollTo('vertical', calculateRange, getDistanceTop, containerRef)
  // 创建滚动到指定索引的函数

  const wrapperProps = computed(() => {
    return {
      style: {
        width: '100%',
        height: `${totalHeight.value - offsetTop.value}px`,
        marginTop: `${offsetTop.value}px`,
      },
    }
  })
  // 包装器属性
  // height = 总高度 - 已滚动高度
  // marginTop = 已滚动高度（模拟滚动位置）

  return {
    calculateRange,
    scrollTo,
    containerStyle,
    wrapperProps,
    currentList,
    containerRef,
  }
}
```