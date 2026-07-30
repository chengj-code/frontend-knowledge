# useMagicKeys 源码详细注释

> 响应式键盘按键状态监听，支持组合键和 Proxy 懒初始化

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useMagicKeys/index.ts` |
| 代码行数 | 181 行 |
| 所属包 | `@vueuse/core` |
| 设计模式 | 代理模式（Proxy）、观察者模式 |
| 核心知识点 | Proxy 懒初始化、组合键解析、Meta 键 workaround |

---

## 核心类型定义

### UseMagicKeysOptions 接口

```typescript
export interface UseMagicKeysOptions<Reactive extends boolean> {
  /**
   * Returns a reactive object instead of an object of refs
   *
   * @default false
   */
  reactive?: Reactive

  /**
   * Target for listening events
   *
   * @default window
   */
  target?: MaybeRefOrGetter<EventTarget>

  /**
   * Alias map for keys, all the keys should be lowercase
   * { target: keycode }
   *
   * @example { ctrl: "control" }
   * @default <predefined-map>
   */
  aliasMap?: Record<string, string>

  /**
   * Register passive listener
   *
   * @default true
   */
  passive?: boolean

  /**
   * Custom event handler for keydown/keyup event.
   * Useful when you want to apply custom logic.
   *
   * When using `e.preventDefault()`, you will need to pass `passive: false` to useMagicKeys().
   */
  onEventFired?: (e: KeyboardEvent) => void | boolean
}
```

### MagicKeysInternal 接口

```typescript
export interface MagicKeysInternal {
  /**
   * A Set of currently pressed keys,
   * Stores raw keyCodes.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
   */
  current: Set<string>
}
```

### UseMagicKeysReturn 类型

```typescript
export type UseMagicKeysReturn<Reactive extends boolean> =
  Readonly<
    Omit<Reactive extends true
      ? Record<string, boolean>
      : Record<string, ComputedRef<boolean>>, keyof MagicKeysInternal>
      & MagicKeysInternal
  >
```

**类型解析：**
- `Reactive extends true`：返回 `Record<string, boolean>`，每个键是普通布尔值
- `Reactive extends false`：返回 `Record<string, ComputedRef<boolean>>`，每个键是 ComputedRef
- 两种情况都包含 `current: Set<string>` 属性

---

## 核心实现

### 函数签名与重载

```typescript
// 重载：reactive 为 false（默认）时返回 Record<string, ComputedRef<boolean>>
export function useMagicKeys(options?: UseMagicKeysOptions<false>): UseMagicKeysReturn<false>
// 重载：reactive 为 true 时返回 Record<string, boolean>
export function useMagicKeys(options: UseMagicKeysOptions<true>): UseMagicKeysReturn<true>
// 实现
export function useMagicKeys(options: UseMagicKeysOptions<boolean> = {}): any {
```

### 初始化

```typescript
const {
  reactive: useReactive = false,
  target = defaultWindow,
  aliasMap = DefaultMagicKeysAliasMap,
  passive = true,
  onEventFired = noop,
} = options

// 当前按下的键集合（响应式）
const current = reactive(new Set<string>())
const obj = {
  toJSON() { return {} },  // 防止序列化
  current,
}
// 根据 reactive 选项决定使用 reactive 还是普通对象
const refs: Record<string, any> = useReactive ? reactive(obj) : obj
// 追踪 Meta 键组合的依赖
const metaDeps = new Set<string>()
// 追踪所有使用过的键
const usedKeys = new Set<string>()
```

### setRefs 辅助函数

```typescript
function setRefs(key: string, value: boolean) {
  if (key in refs) {
    if (useReactive)
      refs[key] = value
    else
      refs[key].value = value
  }
}
```

### reset 函数

```typescript
function reset() {
  current.clear()
  for (const key of usedKeys)
    setRefs(key, false)
}
```

**作用：** 当窗口失焦时，清除所有按键状态（防止按键卡住）

### updateRefs 核心更新函数

```typescript
function updateRefs(e: KeyboardEvent, value: boolean) {
  const key = e.key?.toLowerCase()
  const code = e.code?.toLowerCase()
  const values = [code, key].filter(Boolean)

  // 更新 current set
  if (key) {
    if (value)
      current.add(key)
    else
      current.delete(key)
  }

  // 更新 refs
  for (const key of values) {
    usedKeys.add(key)
    setRefs(key, value)
  }

  // #1312
  // In macOS, keys won't trigger "keyup" event when Meta key is released
  // We track it's combination and release manually
  if (key === 'meta' && !value) {
    // Meta key released
    metaDeps.forEach((key) => {
      current.delete(key)
      setRefs(key, false)
    })
    metaDeps.clear()
  }
  else if (typeof e.getModifierState === 'function' && e.getModifierState('Meta') && value) {
    [...current, ...values].forEach(key => metaDeps.add(key))
  }
}
```

**Meta 键 workaround 解析：**
1. macOS 上，当 Meta 键与其他键组合时，keyup 事件不会触发其他键
2. 解决方案：当 Meta 键释放时，清除所有在 Meta 按下期间按下的键
3. `metaDeps` Set 追踪这些依赖 Meta 的键

### 事件监听

```typescript
useEventListener(target, 'keydown', (e: KeyboardEvent) => {
  updateRefs(e, true)
  return onEventFired(e)
}, { passive })

useEventListener(target, 'keyup', (e: KeyboardEvent) => {
  updateRefs(e, false)
  return onEventFired(e)
}, { passive })

// #1350
// 窗口失焦/获焦时重置状态
useEventListener('blur', reset, { passive })
useEventListener('focus', reset, { passive })
```

### Proxy 懒初始化（核心设计）

```typescript
const proxy = new Proxy(
  refs,
  {
    get(target, prop, rec) {
      if (typeof prop !== 'string')
        return Reflect.get(target, prop, rec)

      prop = prop.toLowerCase()
      // alias
      if (prop in aliasMap)
        prop = aliasMap[prop]
      // create new tracking
      if (!(prop in refs)) {
        // 组合键处理：ctrl+c, shift+a 等
        if (/[+_-]/.test(prop)) {
          const keys = prop.split(/[+_-]/g).map(i => i.trim())
          refs[prop] = computed(() => keys.map(key => toValue(proxy[key])).every(Boolean))
        }
        else {
          // 单个键：创建 shallowRef
          refs[prop] = shallowRef(false)
        }
      }
      const r = Reflect.get(target, prop, rec)
      return useReactive ? toValue(r) : r
    },
  },
)

return proxy as any
```

**Proxy get trap 解析：**
1. 首次访问某个键时才创建对应的 ref（懒初始化）
2. 支持组合键：`proxy['ctrl+c']` 会自动解析为 `proxy.ctrl && proxy.c`
3. 支持别名：通过 `aliasMap` 映射键名
4. 支持 `+`、`-`、`_` 作为组合键分隔符

---

## 设计模式分析

### 代理模式（Proxy Pattern）

```typescript
// 懒初始化：首次访问时才创建 ref
const proxy = new Proxy(refs, {
  get(target, prop) {
    if (!(prop in refs)) {
      refs[prop] = shallowRef(false)  // 按需创建
    }
    return refs[prop]
  }
})
```

**优点：**
- 节省内存：不需要预先创建所有可能的键
- 自动组合键：访问 `ctrl+c` 时自动解析组合

### 观察者模式

```typescript
// 监听键盘事件，更新状态
useEventListener(target, 'keydown', (e) => updateRefs(e, true))
useEventListener(target, 'keyup', (e) => updateRefs(e, false))
```

---

## 使用示例

### 基本用法

```typescript
import { useMagicKeys } from '@vueuse/core'

const { ctrl, shift, a } = useMagicKeys()

// 监听单个键
watch(a, (pressed) => {
  console.log('a key pressed:', pressed)
})

// 监听组合键
watch(ctrl, (pressed) => {
  console.log('ctrl key pressed:', pressed)
})
```

### 使用组合键字符串

```typescript
const keys = useMagicKeys()

// 使用字符串访问组合键
watch(keys['ctrl+c'], (pressed) => {
  if (pressed) {
    console.log('Ctrl+C pressed!')
  }
})

watch(keys['shift+a'], (pressed) => {
  if (pressed) {
    console.log('Shift+A pressed!')
  }
})
```

### 使用 reactive 模式

```typescript
const keys = useMagicKeys({ reactive: true })

// 直接访问布尔值
watchEffect(() => {
  if (keys.ctrl && keys.c) {
    console.log('Ctrl+C pressed!')
  }
})
```

### 自定义事件处理

```typescript
const keys = useMagicKeys({
  passive: false,  // 需要 preventDefault 时设置为 false
  onEventFired(e) {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault()  // 阻止浏览器默认行为
      console.log('Ctrl+S pressed, save!')
    }
  },
})
```

### 使用别名

```typescript
const keys = useMagicKeys({
  aliasMap: {
    ctrl: 'control',
    esc: 'escape',
  },
})

// 使用别名访问
const { ctrl, esc } = keys
```

### 组合使用

```typescript
const keys = useMagicKeys()

// 监听 Ctrl+Shift+S 保存
const ctrlShiftS = keys['ctrl+shift+s']

watch(ctrlShiftS, (pressed) => {
  if (pressed) {
    console.log('Save as...')
  }
})
```

### 当前按下的键

```typescript
const { current } = useMagicKeys()

// current 是一个 Set，包含当前所有按下的键
watchEffect(() => {
  console.log('Currently pressed keys:', [...current])
})
```

---

## 核心知识点总结

1. **Proxy 懒初始化**：首次访问时才创建 ref，节省内存
2. **组合键解析**：通过正则 `/[+_-]/` 分割字符串，递归访问
3. **Meta 键 workaround**：macOS 特殊处理，使用 `metaDeps` 追踪依赖
4. **别名映射**：通过 `aliasMap` 支持键名别名
5. **窗口失焦重置**：防止按键卡住

---

## 源码逐行注释

```typescript
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { noop } from '@vueuse/shared'
import { computed, reactive, shallowRef, toValue } from 'vue'
import { defaultWindow } from '../_configurable'
import { useEventListener } from '../useEventListener'
import { DefaultMagicKeysAliasMap } from './aliasMap'

// 配置选项接口
export interface UseMagicKeysOptions<Reactive extends boolean> {
  /**
   * Returns a reactive object instead of an object of refs
   *
   * @default false
   */
  reactive?: Reactive

  /**
   * Target for listening events
   *
   * @default window
   */
  target?: MaybeRefOrGetter<EventTarget>

  /**
   * Alias map for keys, all the keys should be lowercase
   * { target: keycode }
   *
   * @example { ctrl: "control" }
   * @default <predefined-map>
   */
  aliasMap?: Record<string, string>

  /**
   * Register passive listener
   *
   * @default true
   */
  passive?: boolean

  /**
   * Custom event handler for keydown/keyup event.
   * Useful when you want to apply custom logic.
   *
   * When using `e.preventDefault()`, you will need to pass `passive: false` to useMagicKeys().
   */
  onEventFired?: (e: KeyboardEvent) => void | boolean
}

// 内部接口：当前按下的键
export interface MagicKeysInternal {
  /**
   * A Set of currently pressed keys,
   * Stores raw keyCodes.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
   */
  current: Set<string>
}

// 返回类型：根据 Reactive 参数决定返回值类型
export type UseMagicKeysReturn<Reactive extends boolean> =
  Readonly<
    Omit<Reactive extends true
      ? Record<string, boolean>
      : Record<string, ComputedRef<boolean>>, keyof MagicKeysInternal>
      & MagicKeysInternal
  >

/**
 * Reactive keys pressed state, with magical keys combination support.
 *
 * @see https://vueuse.org/useMagicKeys
 */
export function useMagicKeys(options?: UseMagicKeysOptions<false>): UseMagicKeysReturn<false>
export function useMagicKeys(options: UseMagicKeysOptions<true>): UseMagicKeysReturn<true>
export function useMagicKeys(options: UseMagicKeysOptions<boolean> = {}): any {
  const {
    reactive: useReactive = false,
    target = defaultWindow,
    aliasMap = DefaultMagicKeysAliasMap,
    passive = true,
    onEventFired = noop,
  } = options

  // 当前按下的键集合（响应式）
  const current = reactive(new Set<string>())
  const obj = {
    toJSON() { return {} },  // 防止序列化
    current,
  }
  // 根据 reactive 选项决定使用 reactive 还是普通对象
  const refs: Record<string, any> = useReactive ? reactive(obj) : obj
  // 追踪 Meta 键组合的依赖
  const metaDeps = new Set<string>()
  // 追踪所有使用过的键
  const usedKeys = new Set<string>()

  // 设置 ref 值
  function setRefs(key: string, value: boolean) {
    if (key in refs) {
      if (useReactive)
        refs[key] = value
      else
        refs[key].value = value
    }
  }

  // 重置所有按键状态（窗口失焦时调用）
  function reset() {
    current.clear()
    for (const key of usedKeys)
      setRefs(key, false)
  }

  // 更新 refs 的核心函数
  function updateRefs(e: KeyboardEvent, value: boolean) {
    const key = e.key?.toLowerCase()
    const code = e.code?.toLowerCase()
    const values = [code, key].filter(Boolean)

    // 更新 current set
    if (key) {
      if (value)
        current.add(key)
      else
        current.delete(key)
    }

    // 更新 refs
    for (const key of values) {
      usedKeys.add(key)
      setRefs(key, value)
    }

    // #1312
    // In macOS, keys won't trigger "keyup" event when Meta key is released
    // We track it's combination and release manually
    if (key === 'meta' && !value) {
      // Meta key released
      metaDeps.forEach((key) => {
        current.delete(key)
        setRefs(key, false)
      })
      metaDeps.clear()
    }
    else if (typeof e.getModifierState === 'function' && e.getModifierState('Meta') && value) {
      [...current, ...values].forEach(key => metaDeps.add(key))
    }
  }

  // 监听 keydown 事件
  useEventListener(target, 'keydown', (e: KeyboardEvent) => {
    updateRefs(e, true)
    return onEventFired(e)
  }, { passive })

  // 监听 keyup 事件
  useEventListener(target, 'keyup', (e: KeyboardEvent) => {
    updateRefs(e, false)
    return onEventFired(e)
  }, { passive })

  // #1350
  // 窗口失焦/获焦时重置状态
  useEventListener('blur', reset, { passive })
  useEventListener('focus', reset, { passive })

  // Proxy 懒初始化
  const proxy = new Proxy(
    refs,
    {
      get(target, prop, rec) {
        if (typeof prop !== 'string')
          return Reflect.get(target, prop, rec)

        prop = prop.toLowerCase()
        // alias
        if (prop in aliasMap)
          prop = aliasMap[prop]
        // create new tracking
        if (!(prop in refs)) {
          // 组合键处理：ctrl+c, shift+a 等
          if (/[+_-]/.test(prop)) {
            const keys = prop.split(/[+_-]/g).map(i => i.trim())
            refs[prop] = computed(() => keys.map(key => toValue(proxy[key])).every(Boolean))
          }
          else {
            // 单个键：创建 shallowRef
            refs[prop] = shallowRef(false)
          }
        }
        const r = Reflect.get(target, prop, rec)
        return useReactive ? toValue(r) : r
      },
    },
  )

  return proxy as any
}

export { DefaultMagicKeysAliasMap } from './aliasMap'
```
