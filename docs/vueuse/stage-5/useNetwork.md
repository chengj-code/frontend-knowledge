# useNetwork 源码详细注释

> Network API 封装，多属性只读 ref 模式

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useNetwork/index.ts` |
| 代码行数 | 128 行 |
| 所属包 | `@vueuse/core` |
| 依赖工具 | `useEventListener`、`useSupported`、`readonly` |
| 设计模式 | 观察者模式 |
| 核心知识点 | 多属性只读 ref、API 兼容检测、时间戳记录 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：类型定义
// ============================================================

export type NetworkType = 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown'
// 💡 网络连接类型

export type NetworkEffectiveType = 'slow-2g' | '2g' | '3g' | '4g' | undefined
// 💡 有效连接速度类型

// ============================================================
// 第二部分：函数实现
// ============================================================

export function useNetwork(options: ConfigurableWindow = {}): Readonly<NetworkState> {
  const { window = defaultWindow } = options
  const navigator = window?.navigator
  const isSupported = useSupported(() => navigator && 'connection' in navigator)
  // 💡 检测是否支持 Network Information API

  // ⭐ 多个只读 ref 表示网络状态
  const isOnline = shallowRef(true)
  const saveData = shallowRef(false)
  const offlineAt = shallowRef<number | undefined>(undefined)
  const onlineAt = shallowRef<number | undefined>(undefined)
  const downlink = shallowRef<number | undefined>(undefined)
  const downlinkMax = shallowRef<number | undefined>(undefined)
  const rtt = shallowRef<number | undefined>(undefined)
  const effectiveType = shallowRef<NetworkEffectiveType>(undefined)
  const type = shallowRef<NetworkType>('unknown')

  const connection = isSupported.value && (navigator as any).connection
  // 💡 获取 Network Information API 的 connection 对象

  // ⭐ 更新函数：同步所有网络属性
  function updateNetworkInformation() {
    if (!navigator)
      return

    isOnline.value = navigator.onLine
    offlineAt.value = isOnline.value ? undefined : Date.now()
    onlineAt.value = isOnline.value ? Date.now() : undefined

    if (connection) {
      downlink.value = connection.downlink
      downlinkMax.value = connection.downlinkMax
      effectiveType.value = connection.effectiveType
      rtt.value = connection.rtt
      saveData.value = connection.saveData
      type.value = connection.type
    }
  }

  // ⭐ 监听 online/offline 事件
  if (window) {
    useEventListener(window, 'offline', () => {
      isOnline.value = false
      offlineAt.value = Date.now()
    }, listenerOptions)

    useEventListener(window, 'online', () => {
      isOnline.value = true
      onlineAt.value = Date.now()
    }, listenerOptions)
  }

  // ⭐ 监听 connection 对象的变化
  if (connection)
    useEventListener(connection, 'change', updateNetworkInformation, listenerOptions)

  updateNetworkInformation()

  // ⭐ 返回只读状态
  return {
    isSupported,
    isOnline: readonly(isOnline),
    saveData: readonly(saveData),
    offlineAt: readonly(offlineAt),
    onlineAt: readonly(onlineAt),
    downlink: readonly(downlink),
    downlinkMax: readonly(downlinkMax),
    effectiveType: readonly(effectiveType),
    rtt: readonly(readonly(rtt)),
    type: readonly(type),
  }
  // 💡 所有属性都是 readonly，防止外部直接修改
  // 💡 外部只能通过返回值读取状态
}
```

---

## 设计模式解析

### 多属性只读 ref 模式

```
useNetwork 的返回值结构：

  {
    isSupported: ComputedRef<boolean>
    isOnline: Readonly<ShallowRef<boolean>>
    offlineAt: Readonly<ShallowRef<number | undefined>>
    onlineAt: Readonly<ShallowRef<number | undefined>>
    downlink: Readonly<ShallowRef<number | undefined>>
    ...
  }

所有属性都是 readonly，外部只能读取，不能修改
状态变化只能通过事件触发
```

**为什么用 readonly？**
- 网络状态是浏览器环境决定的，不是用户可以主动修改的
- 如果允许外部修改，会造成状态不一致
- readonly 在开发模式下会打印警告

---

## 使用示例

```ts
import { useNetwork } from '@vueuse/core'

const { isOnline, offlineAt, downlink, effectiveType } = useNetwork()

console.log(isOnline.value)       // true/false
console.log(offlineAt.value)      // 最后离线时间戳
console.log(downlink.value)       // 下载速度 (Mbps)
console.log(effectiveType.value)  // '4g' | '3g' | ...
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useEventListener` | 依赖 | 监听 online/offline/change 事件 |
| `useSupported` | 依赖 | 检测 Network API 支持 |
| `readonly` | 依赖 | 创建只读 ref |

---

## 笔记

```
在此记录你的学习笔记...

```
