# useAnimate 源码详细注释

> 响应式 Web Animations API 封装，支持双向绑定和 RAF 状态同步

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useAnimate/index.ts` |
| 代码行数 | 324 行 |
| 所属包 | `@vueuse/core` |
| 设计模式 | 双向绑定模式、观察者模式 |
| 核心知识点 | WritableComputedRef、useRafFn 状态同步、Animation API |

---

## 核心类型定义

### UseAnimateOptions 接口

```typescript
export interface UseAnimateOptions extends KeyframeAnimationOptions, ConfigurableWindow {
  /**
   * Will automatically run play when `useAnimate` is used
   *
   * @default true
   */
  immediate?: boolean
  /**
   * Whether to commits the end styling state of an animation to the element being animated
   * In general, you should use `fill` option with this.
   *
   * @default false
   */
  commitStyles?: boolean
  /**
   * Whether to persists the animation
   *
   * @default false
   */
  persist?: boolean
  /**
   * Executed after animation initialization
   */
  onReady?: (animate: Animation) => void
  /**
   * Callback when error is caught.
   */
  onError?: (e: unknown) => void
}
```

### UseAnimateKeyframes 类型

```typescript
export type UseAnimateKeyframes = MaybeRef<Keyframe[] | PropertyIndexedKeyframes | null>
```

### UseAnimateReturn 接口

```typescript
export interface UseAnimateReturn {
  isSupported: ComputedRef<boolean>
  animate: ShallowRef<Animation | undefined>
  play: () => void
  pause: () => void
  reverse: () => void
  finish: () => void
  cancel: () => void

  pending: ComputedRef<boolean>
  playState: ComputedRef<AnimationPlayState>
  replaceState: ComputedRef<AnimationReplaceState>
  startTime: WritableComputedRef<CSSNumberish | number | null>
  currentTime: WritableComputedRef<CSSNumberish | null>
  timeline: WritableComputedRef<AnimationTimeline | null>
  playbackRate: WritableComputedRef<number>
}
```

**关键点：**
- `startTime`、`currentTime`、`timeline`、`playbackRate` 是 `WritableComputedRef`，支持双向绑定
- `pending`、`playState`、`replaceState` 是只读 `ComputedRef`

### AnimateStoreKeys 类型

```typescript
type AnimateStoreKeys = Extract<keyof Animation, 'startTime' | 'currentTime' | 'timeline' | 'playbackRate' | 'pending' | 'playState' | 'replaceState'>

type AnimateStore = Mutable<Pick<Animation, AnimateStoreKeys>>
```

---

## 核心实现

### 参数解析

```typescript
export function useAnimate(
  target: MaybeComputedElementRef,
  keyframes: UseAnimateKeyframes,
  options?: number | UseAnimateOptions,
): UseAnimateReturn {
  let config: UseAnimateOptions
  let animateOptions: undefined | number | KeyframeAnimationOptions

  if (isObject(options)) {
    config = options
    animateOptions = objectOmit(options, ['window', 'immediate', 'commitStyles', 'persist', 'onReady', 'onError'])
  }
  else {
    config = { duration: options }
    animateOptions = options
  }
```

### 初始化

```typescript
const {
  window = defaultWindow,
  immediate = true,
  commitStyles,
  persist,
  playbackRate: _playbackRate = 1,
  onReady,
  onError = (e: unknown) => {
    console.error(e)
  },
} = config

// 检测浏览器支持
const isSupported = useSupported(() => window && HTMLElement && 'animate' in HTMLElement.prototype)

// Animation 实例
const animate = shallowRef<Animation | undefined>(undefined)
// 状态存储
const store = shallowReactive<AnimateStore>({
  startTime: null,
  currentTime: null,
  timeline: null,
  playbackRate: _playbackRate,
  pending: false,
  playState: immediate ? 'idle' : 'paused',
  replaceState: 'active',
})
```

### 只读计算属性

```typescript
const pending = computed(() => store.pending)
const playState = computed(() => store.playState)
const replaceState = computed(() => store.replaceState)
```

### WritableComputedRef 双向绑定

```typescript
// startTime 双向绑定
const startTime = computed<CSSNumberish | number | null>({
  get() {
    return store.startTime
  },
  set(value) {
    store.startTime = value
    if (animate.value)
      animate.value.startTime = value
  },
})

// currentTime 双向绑定
const currentTime = computed({
  get() {
    return store.currentTime
  },
  set(value) {
    store.currentTime = value
    if (animate.value) {
      animate.value.currentTime = value
      syncResume()
    }
  },
})

// timeline 双向绑定
const timeline = computed({
  get() {
    return store.timeline
  },
  set(value) {
    store.timeline = value
    if (animate.value)
      animate.value.timeline = value
  },
})

// playbackRate 双向绑定
const playbackRate = computed({
  get() {
    return store.playbackRate
  },
  set(value) {
    store.playbackRate = value
    if (animate.value)
      animate.value.playbackRate = value
  },
})
```

**WritableComputedRef 模式：**
- `get()`：从 store 读取值
- `set()`：同时更新 store 和 Animation 对象

### 动画控制方法

```typescript
const play = () => {
  if (animate.value) {
    try {
      animate.value.play()
      syncResume()
    }
    catch (e) {
      syncPause()
      onError(e)
    }
  }
  else {
    update()
  }
}

const pause = () => {
  try {
    animate.value?.pause()
    syncPause()
  }
  catch (e) {
    onError(e)
  }
}

const reverse = () => {
  if (!animate.value)
    update()
  try {
    animate.value?.reverse()
    syncResume()
  }
  catch (e) {
    syncPause()
    onError(e)
  }
}

const finish = () => {
  try {
    animate.value?.finish()
    syncPause()
  }
  catch (e) {
    onError(e)
  }
}

const cancel = () => {
  try {
    animate.value?.cancel()
    syncPause()
  }
  catch (e) {
    onError(e)
  }
}
```

### 监听器

```typescript
// 监听 target 元素变化
watch(() => unrefElement(target), (el) => {
  if (el) {
    update()
  }
  else {
    animate.value = undefined
  }
})

// 监听 keyframes 变化
watch(() => keyframes, (value) => {
  if (animate.value) {
    update()

    const targetEl = unrefElement(target)
    if (targetEl) {
      animate.value.effect = new KeyframeEffect(
        targetEl,
        toValue(value),
        animateOptions,
      )
    }
  }
}, { deep: true })

// 挂载时初始化
tryOnMounted(() => update(true), false)

// 销毁时取消动画
tryOnScopeDispose(cancel)
```

### update 初始化函数

```typescript
function update(init?: boolean) {
  const el = unrefElement(target)
  if (!isSupported.value || !el)
    return

  if (!animate.value)
    animate.value = el.animate(toValue(keyframes), animateOptions)

  if (persist)
    animate.value.persist()
  if (_playbackRate !== 1)
    animate.value.playbackRate = _playbackRate

  if (init && !immediate)
    animate.value.pause()
  else
    syncResume()

  onReady?.(animate.value)
}
```

### 事件监听

```typescript
const listenerOptions = { passive: true }
// 监听动画取消、完成、移除事件
useEventListener(animate, ['cancel', 'finish', 'remove'], syncPause, listenerOptions)
// 监听动画完成事件，提交样式
useEventListener(animate, 'finish', () => {
  if (commitStyles)
    animate.value?.commitStyles()
}, listenerOptions)
```

### useRafFn 状态同步

```typescript
const { resume: resumeRef, pause: pauseRef } = useRafFn(() => {
  if (!animate.value)
    return
  // 持续同步 Animation 对象状态到 store
  store.pending = animate.value.pending
  store.playState = animate.value.playState
  store.replaceState = animate.value.replaceState
  store.startTime = animate.value.startTime
  store.currentTime = animate.value.currentTime
  store.timeline = animate.value.timeline
  store.playbackRate = animate.value.playbackRate
}, { immediate: false })

function syncResume() {
  if (isSupported.value)
    resumeRef()
}

function syncPause() {
  if (isSupported.value && window)
    window.requestAnimationFrame(pauseRef)
}
```

**RAF 状态同步解析：**
- 动画播放时，通过 `useRafFn` 持续同步状态
- 动画暂停/完成时，停止同步
- 使用 `requestAnimationFrame` 确保在下一帧暂停

---

## 设计模式分析

### 双向绑定模式（WritableComputedRef）

```typescript
const currentTime = computed({
  get() {
    return store.currentTime  // 从 store 读取
  },
  set(value) {
    store.currentTime = value  // 更新 store
    if (animate.value) {
      animate.value.currentTime = value  // 同步到 Animation 对象
      syncResume()
    }
  },
})
```

**优点：**
- 响应式：修改 `currentTime.value` 会自动同步到动画
- 双向：动画状态变化会反映到 `currentTime`

### 观察者模式

```typescript
// 监听 target 和 keyframes 变化
watch(() => unrefElement(target), (el) => { ... })
watch(() => keyframes, (value) => { ... }, { deep: true })

// 监听动画事件
useEventListener(animate, ['cancel', 'finish', 'remove'], syncPause)
```

### RAF 状态同步

```typescript
// 使用 requestAnimationFrame 持续同步状态
const { resume, pause } = useRafFn(() => {
  store.currentTime = animate.value.currentTime
  // ... 其他状态
}, { immediate: false })
```

---

## 使用示例

### 基本用法

```typescript
import { useAnimate } from '@vueuse/core'

const target = ref<HTMLElement>()

const { isSupported, play, pause, reverse, finish, cancel } = useAnimate(
  target,
  [
    { transform: 'translateX(0)' },
    { transform: 'translateX(100px)' },
  ],
  {
    duration: 1000,
    iterations: Infinity,
    direction: 'alternate',
  },
)
```

### 双向绑定 currentTime

```typescript
const target = ref<HTMLElement>()
const currentTime = ref(0)

const { currentTime: animateCurrentTime } = useAnimate(
  target,
  [
    { opacity: 0 },
    { opacity: 1 },
  ],
  { duration: 2000 },
)

// 双向绑定
watch(currentTime, (time) => {
  animateCurrentTime.value = time
})

watch(animateCurrentTime, (time) => {
  currentTime.value = time
})
```

### 使用 playbackRate

```typescript
const { playbackRate } = useAnimate(target, keyframes, options)

// 加速
playbackRate.value = 2

// 减速
playbackRate.value = 0.5

// 倒放
playbackRate.value = -1
```

### 监听动画状态

```typescript
const { playState, pending, isSupported } = useAnimate(target, keyframes, options)

watch(playState, (state) => {
  console.log('Animation state:', state)
  // 'idle' | 'running' | 'paused' | 'finished'
})

watch(pending, (isPending) => {
  console.log('Animation pending:', isPending)
})
```

### 提交样式

```typescript
const { finish } = useAnimate(
  target,
  [
    { transform: 'translateX(0)' },
    { transform: 'translateX(100px)' },
  ],
  {
    duration: 1000,
    fill: 'forwards',
    commitStyles: true,  // 动画完成时提交样式到元素
    persist: true,        // 保持动画效果
  },
)
```

### 动态 keyframes

```typescript
const keyframes = ref([
  { transform: 'translateX(0)' },
  { transform: 'translateX(100px)' },
])

const { animate } = useAnimate(target, keyframes, { duration: 1000 })

// 动态更新 keyframes
setTimeout(() => {
  keyframes.value = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(100px)' },
  ]
}, 3000)
```

### 响应式 target

```typescript
const target = ref<HTMLElement | null>(null)

const { play, pause } = useAnimate(target, keyframes, options)

// target 变化时自动重新初始化动画
watch(target, (el) => {
  if (el) {
    play()
  }
})
```

### 错误处理

```typescript
const { play } = useAnimate(
  target,
  keyframes,
  {
    duration: 1000,
    onError(e) {
      console.error('Animation error:', e)
    },
    onReady(animate) {
      console.log('Animation ready:', animate)
    },
  },
)
```

---

## 核心知识点总结

1. **WritableComputedRef**：实现双向绑定，getter 从 store 读取，setter 同时更新 store 和 Animation 对象
2. **useRafFn 状态同步**：通过 requestAnimationFrame 持续同步动画状态
3. **Animation API**：使用 Web Animations API (`element.animate()`)
4. **事件监听**：监听 cancel、finish、remove 事件自动暂停同步
5. **commitStyles**：动画完成时提交样式到元素

---

## 源码逐行注释

```typescript
import type { Mutable } from '@vueuse/shared'
import type { ComputedRef, MaybeRef, ShallowRef, WritableComputedRef } from 'vue'
import type { ConfigurableWindow } from '../_configurable'
import type { MaybeComputedElementRef } from '../unrefElement'
import { isObject, objectOmit, tryOnMounted, tryOnScopeDispose } from '@vueuse/shared'
import { computed, shallowReactive, shallowRef, toValue, watch } from 'vue'
import { defaultWindow } from '../_configurable'
import { unrefElement } from '../unrefElement'
import { useEventListener } from '../useEventListener'
import { useRafFn } from '../useRafFn'
import { useSupported } from '../useSupported'

// 配置选项接口
export interface UseAnimateOptions extends KeyframeAnimationOptions, ConfigurableWindow {
  /**
   * Will automatically run play when `useAnimate` is used
   *
   * @default true
   */
  immediate?: boolean
  /**
   * Whether to commits the end styling state of an animation to the element being animated
   * In general, you should use `fill` option with this.
   *
   * @default false
   */
  commitStyles?: boolean
  /**
   * Whether to persists the animation
   *
   * @default false
   */
  persist?: boolean
  /**
   * Executed after animation initialization
   */
  onReady?: (animate: Animation) => void
  /**
   * Callback when error is caught.
   */
  onError?: (e: unknown) => void
}

// keyframes 类型
export type UseAnimateKeyframes = MaybeRef<Keyframe[] | PropertyIndexedKeyframes | null>

// 返回值接口
export interface UseAnimateReturn {
  isSupported: ComputedRef<boolean>
  animate: ShallowRef<Animation | undefined>
  play: () => void
  pause: () => void
  reverse: () => void
  finish: () => void
  cancel: () => void

  pending: ComputedRef<boolean>
  playState: ComputedRef<AnimationPlayState>
  replaceState: ComputedRef<AnimationReplaceState>
  startTime: WritableComputedRef<CSSNumberish | number | null>
  currentTime: WritableComputedRef<CSSNumberish | null>
  timeline: WritableComputedRef<AnimationTimeline | null>
  playbackRate: WritableComputedRef<number>
}

// 存储键类型
type AnimateStoreKeys = Extract<keyof Animation, 'startTime' | 'currentTime' | 'timeline' | 'playbackRate' | 'pending' | 'playState' | 'replaceState'>

// 存储类型
type AnimateStore = Mutable<Pick<Animation, AnimateStoreKeys>>

/**
 * Reactive Web Animations API
 *
 * @see https://vueuse.org/useAnimate
 * @param target
 * @param keyframes
 * @param options
 */
export function useAnimate(
  target: MaybeComputedElementRef,
  keyframes: UseAnimateKeyframes,
  options?: number | UseAnimateOptions,
): UseAnimateReturn {
  let config: UseAnimateOptions
  let animateOptions: undefined | number | KeyframeAnimationOptions

  // 解析参数
  if (isObject(options)) {
    config = options
    animateOptions = objectOmit(options, ['window', 'immediate', 'commitStyles', 'persist', 'onReady', 'onError'])
  }
  else {
    config = { duration: options }
    animateOptions = options
  }

  const {
    window = defaultWindow,
    immediate = true,
    commitStyles,
    persist,
    playbackRate: _playbackRate = 1,
    onReady,
    onError = (e: unknown) => {
      console.error(e)
    },
  } = config

  // 检测浏览器支持
  const isSupported = useSupported(() => window && HTMLElement && 'animate' in HTMLElement.prototype)

  // Animation 实例
  const animate = shallowRef<Animation | undefined>(undefined)
  // 状态存储
  const store = shallowReactive<AnimateStore>({
    startTime: null,
    currentTime: null,
    timeline: null,
    playbackRate: _playbackRate,
    pending: false,
    playState: immediate ? 'idle' : 'paused',
    replaceState: 'active',
  })

  // 只读计算属性
  const pending = computed(() => store.pending)
  const playState = computed(() => store.playState)
  const replaceState = computed(() => store.replaceState)

  // WritableComputedRef 双向绑定
  const startTime = computed<CSSNumberish | number | null>({
    get() {
      return store.startTime
    },
    set(value) {
      store.startTime = value
      if (animate.value)
        animate.value.startTime = value
    },
  })

  const currentTime = computed({
    get() {
      return store.currentTime
    },
    set(value) {
      store.currentTime = value
      if (animate.value) {
        animate.value.currentTime = value
        syncResume()
      }
    },
  })

  const timeline = computed({
    get() {
      return store.timeline
    },
    set(value) {
      store.timeline = value
      if (animate.value)
        animate.value.timeline = value
    },
  })

  const playbackRate = computed({
    get() {
      return store.playbackRate
    },
    set(value) {
      store.playbackRate = value
      if (animate.value)
        animate.value.playbackRate = value
    },
  })

  // 动画控制方法
  const play = () => {
    if (animate.value) {
      try {
        animate.value.play()
        syncResume()
      }
      catch (e) {
        syncPause()
        onError(e)
      }
    }
    else {
      update()
    }
  }

  const pause = () => {
    try {
      animate.value?.pause()
      syncPause()
    }
    catch (e) {
      onError(e)
    }
  }

  const reverse = () => {
    if (!animate.value)
      update()
    try {
      animate.value?.reverse()
      syncResume()
    }
    catch (e) {
      syncPause()
      onError(e)
    }
  }

  const finish = () => {
    try {
      animate.value?.finish()
      syncPause()
    }
    catch (e) {
      onError(e)
    }
  }

  const cancel = () => {
    try {
      animate.value?.cancel()
      syncPause()
    }
    catch (e) {
      onError(e)
    }
  }

  // 监听 target 元素变化
  watch(() => unrefElement(target), (el) => {
    if (el) {
      update()
    }
    else {
      animate.value = undefined
    }
  })

  // 监听 keyframes 变化
  watch(() => keyframes, (value) => {
    if (animate.value) {
      update()

      const targetEl = unrefElement(target)
      if (targetEl) {
        animate.value.effect = new KeyframeEffect(
          targetEl,
          toValue(value),
          animateOptions,
        )
      }
    }
  }, { deep: true })

  // 挂载时初始化
  tryOnMounted(() => update(true), false)

  // 销毁时取消动画
  tryOnScopeDispose(cancel)

  // 初始化函数
  function update(init?: boolean) {
    const el = unrefElement(target)
    if (!isSupported.value || !el)
      return

    if (!animate.value)
      animate.value = el.animate(toValue(keyframes), animateOptions)

    if (persist)
      animate.value.persist()
    if (_playbackRate !== 1)
      animate.value.playbackRate = _playbackRate

    if (init && !immediate)
      animate.value.pause()
    else
      syncResume()

    onReady?.(animate.value)
  }

  // 事件监听
  const listenerOptions = { passive: true }
  useEventListener(animate, ['cancel', 'finish', 'remove'], syncPause, listenerOptions)
  useEventListener(animate, 'finish', () => {
    if (commitStyles)
      animate.value?.commitStyles()
  }, listenerOptions)

  // RAF 状态同步
  const { resume: resumeRef, pause: pauseRef } = useRafFn(() => {
    if (!animate.value)
      return
    store.pending = animate.value.pending
    store.playState = animate.value.playState
    store.replaceState = animate.value.replaceState
    store.startTime = animate.value.startTime
    store.currentTime = animate.value.currentTime
    store.timeline = animate.value.timeline
    store.playbackRate = animate.value.playbackRate
  }, { immediate: false })

  function syncResume() {
    if (isSupported.value)
      resumeRef()
  }

  function syncPause() {
    if (isSupported.value && window)
      window.requestAnimationFrame(pauseRef)
  }

  return {
    isSupported,
    animate,

    // actions
    play,
    pause,
    reverse,
    finish,
    cancel,

    // state
    pending,
    playState,
    replaceState,
    startTime,
    currentTime,
    timeline,
    playbackRate,
  }
}
```
