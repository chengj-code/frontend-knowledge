# useMounted 源码详细注释

> 组件挂载状态检测，是 `useSupported` 的基础依赖

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useMounted/index.ts` |
| 代码行数 | 24 行 |
| 所属包 | `@vueuse/core` |
| 依赖工具 | `getCurrentInstance`、`onMounted`、`shallowRef` |
| 设计模式 | 状态标志模式 |
| 核心知识点 | getCurrentInstance 检测、组件上下文 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：Vue API 导入
// ============================================================

import {
  getCurrentInstance,
  // eslint-disable-next-line no-restricted-imports
  onMounted,
  shallowRef,
} from 'vue'
// ⚠️ ESLint 注释：项目通常禁止直接导入 onMounted，这里是为了内部实现
// 💡 getCurrentInstance() → 获取当前组件实例
//    - 在 setup() 中调用返回组件实例
//    - 在普通函数中调用返回 null
// 💡 onMounted(fn) → 注册组件挂载后的回调
// 💡 shallowRef(val) → 创建浅层响应式引用

// ============================================================
// 第二部分：函数实现
// ============================================================

/**
 * Mounted state in ref.
 *
 * @see https://vueuse.org/useMounted
 */
export function useMounted() {
  const isMounted = shallowRef(false)
  // 💡 初始值为 false，表示未挂载

  const instance = getCurrentInstance()
  // ⭐ 获取当前组件实例
  // 💡 如果在 setup() 中调用 → 返回组件实例
  // 💡 如果在普通函数中调用 → 返回 null

  if (instance) {
    onMounted(() => {
      isMounted.value = true
    }, instance)
    // 💡 只有在组件上下文中才注册 onMounted
    // 💡 第二个参数 instance：指定在哪个组件上注册生命周期
    // 💡 如果不在组件中，isMounted 保持 false
  }

  return isMounted
  // 💡 返回只读的挂载状态
}
```

---

## 核心设计

### getCurrentInstance 的作用

```
setup() 中调用 useMounted()
  → getCurrentInstance() 返回组件实例
  → onMounted() 注册成功
  → 组件挂载后 isMounted 变为 true

普通函数中调用 useMounted()
  → getCurrentInstance() 返回 null
  → 跳过 onMounted()
  → isMounted 保持 false
```

**为什么需要这个检查？** Vue 的 `onMounted` 要求必须在组件 setup() 中调用，否则会报警告。通过先检查 `getCurrentInstance()`，确保只在组件上下文中注册生命周期钩子。

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `useSupported` | 依赖 | 使用 useMounted 延迟检测 |
| `tryOnMounted` | 同级 | 都是生命周期相关的工具 |

---

## 笔记

```
在此记录你的学习笔记...

```
