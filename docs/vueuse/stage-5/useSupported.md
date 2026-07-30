# useSupported 源码详细注释

> "挂载后才检测"模式，确保浏览器 API 检测在客户端执行

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useSupported/index.ts` |
| 代码行数 | 15 行 |
| 所属包 | `@vueuse/core` |
| 依赖工具 | `useMounted`、`computed` |
| 设计模式 | 延迟检测模式 |
| 核心知识点 | 依赖追踪、挂载后检测 |

---

## 源码逐行注释

```ts
import { computed } from 'vue'
import { useMounted } from '../useMounted'

export function useSupported(callback: () => unknown) {
  const isMounted = useMounted()
  // 💡 获取组件挂载状态

  return computed(() => {
    // to trigger the ref
    // eslint-disable-next-line ts/no-unused-expressions
    isMounted.value
    // ⭐ 关键技巧：访问 isMounted.value 建立依赖关系
    // 💡 这行代码的目的不是使用 isMounted 的值
    //    而是让 computed 依赖于 isMounted
    // 💡 当组件从"未挂载"变为"已挂载"时，computed 会重新计算
    // 💡 这确保了检测逻辑在客户端执行（挂载后才有 DOM）

    return Boolean(callback())
    // 💡 执行检测回调，返回 boolean
    // 💡 Boolean() 确保返回值是严格的 boolean 类型
  })
}

export type UseSupportedReturn = ReturnType<typeof useSupported>
```

---

## 核心设计

### 为什么需要"挂载后才检测"？

```
SSR 阶段（服务端）：
  → computed 首次执行
  → isMounted.value = false
  → callback() 可能访问浏览器 API（如 window.navigator）
  → 但此时在服务端，API 不存在
  → isMounted.value 的访问让 computed 建立了依赖

客户端挂载后：
  → isMounted.value 变为 true
  → computed 重新执行
  → callback() 现在可以安全访问浏览器 API
  → 返回正确的检测结果
```

### 使用示例

```ts
// 检测是否支持 Fullscreen API
const isSupported = useSupported(() =>
  document && 'fullscreenEnabled' in document
)

// 检测是否支持 Clipboard API
const isSupported = useSupported(() =>
  navigator && 'clipboard' in navigator
)
```

**注意：** `isMounted.value` 的访问看起来是"无用表达式"（ESLint 会警告），但它建立了 computed 与挂载状态的依赖关系，这是整个模式的关键。

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useMounted` | 依赖 | 提供挂载状态 |
| `useFullscreen` | 被依赖 | 检测 Fullscreen API 支持 |
| `useClipboard` | 被依赖 | 检测 Clipboard API 支持 |
| `useNetwork` | 被依赖 | 检测 Network API 支持 |

---

## 笔记

```
在此记录你的学习笔记...

```
