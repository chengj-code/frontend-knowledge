# useClipboard 源码详细注释

> 降级策略 + 权限检查的典型实现

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useClipboard/index.ts` |
| 代码行数 | 135 行 |
| 所属包 | `@vueuse/core` |
| 依赖工具 | `useEventListener`、`useSupported`、`usePermission`、`useTimeoutFn` |
| 设计模式 | 降级策略模式 |
| 核心知识点 | API 降级、权限检查、函数重载 |

---

## 源码逐行注释

```ts
export function useClipboard(options: UseClipboardOptions<MaybeRefOrGetter<string> | undefined> = {}): UseClipboardReturn<boolean> {
  const {
    navigator = defaultNavigator,
    read = false,
    source,
    copiedDuring = 1500,
    // 💡 "已复制"状态持续时间，默认 1.5 秒

    legacy = false,
    // 💡 是否启用降级模式（使用 document.execCommand）
  } = options

  const isClipboardApiSupported = useSupported(() => (navigator && 'clipboard' in navigator))
  // 💡 检测是否支持现代 Clipboard API

  const permissionRead = usePermission('clipboard-read')
  const permissionWrite = usePermission('clipboard-write')
  // 💡 检查剪贴板读写权限

  const isSupported = computed(() => isClipboardApiSupported.value || legacy)
  // 💡 支持条件：Clipboard API 可用 OR 启用了降级模式

  const text = shallowRef('')
  const copied = shallowRef(false)
  const timeout = useTimeoutFn(() => copied.value = false, copiedDuring, { immediate: false })
  // 💡 用 useTimeoutFn 实现"已复制"状态的自动重置

  // ⭐ 读取剪贴板（带降级）
  async function updateText() {
    let useLegacy = !(isClipboardApiSupported.value && isAllowed(permissionRead.value))
    if (!useLegacy) {
      try {
        text.value = await navigator!.clipboard.readText()
      }
      catch {
        useLegacy = true
        // 💡 如果读取失败（权限被拒绝等），降级到 legacy 模式
      }
    }
    if (useLegacy) {
      text.value = legacyRead()
    }
  }

  // ⭐ 监听 copy/cut 事件
  if (isSupported.value && read)
    useEventListener(['copy', 'cut'], updateText, { passive: true })

  // ⭐ 写入剪贴板（带降级）
  async function copy(value = toValue(source)) {
    if (isSupported.value && value != null) {
      let useLegacy = !(isClipboardApiSupported.value && isAllowed(permissionWrite.value))
      if (!useLegacy) {
        try {
          await navigator!.clipboard.writeText(value)
        }
        catch {
          useLegacy = true
          // 💡 如果写入失败，降级到 legacy 模式
        }
      }
      if (useLegacy)
        legacyCopy(value)

      text.value = value
      copied.value = true
      timeout.start()
      // 💡 设置"已复制"状态，copiedDuring 后自动重置
    }
  }

  // ⭐ 降级方案：使用 document.execCommand
  function legacyCopy(value: string) {
    const ta = document.createElement('textarea')
    ta.value = value ?? ''
    ta.style.position = 'absolute'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
    // 💡 经典的"隐藏 textarea + select + execCommand"方案
    // 💡 虽然已废弃，但在旧浏览器中仍然有效
  }

  function legacyRead() {
    return document?.getSelection?.()?.toString() ?? ''
    // 💡 降级读取：获取当前选中的文本
  }

  function isAllowed(status: PermissionState | undefined) {
    return status === 'granted' || status === 'prompt'
    // 💡 权限检查：granted（已授权）或 prompt（待确认）都可以尝试
  }

  return {
    isSupported,
    text: text as ComputedRef<string>,
    copied: copied as ComputedRef<boolean>,
    copy,
  }
}
```

---

## 降级策略模式

```
优先使用 Clipboard API：
  navigator.clipboard.writeText(value)
    ↓ 如果失败（权限/兼容性）
降级到 legacy 模式：
  document.execCommand('copy')

流程：
  1. 检测 Clipboard API 是否可用
  2. 检查权限状态
  3. 尝试使用 Clipboard API
  4. 如果 try/catch 捕获到错误 → 降级
```

---

## 使用示例

```ts
import { useClipboard } from '@vueuse/core'

const { copy, text, copied, isSupported } = useClipboard()

// 复制文本
await copy('Hello World')
console.log(copied.value) // true
// 1.5 秒后
console.log(copied.value) // false

// 带降级
const { copy } = useClipboard({ legacy: true })

// 带预设源
const { copy } = useClipboard({ source: '预设文本' })
copy() // 不传参数，使用预设文本
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useSupported` | 依赖 | 检测 Clipboard API 支持 |
| `usePermission` | 依赖 | 检查剪贴板权限 |
| `useTimeoutFn` | 依赖 | "已复制"状态自动重置 |
| `useEventListener` | 依赖 | 监听 copy/cut 事件 |

---

## 笔记

```
在此记录你的学习笔记...

```
