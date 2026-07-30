# is.ts 源码详细注释

> VueUse 的环境检测和基础工具函数集合，是所有 composable 的基础依赖

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/shared/utils/is.ts` |
| 代码行数 | 33 行 |
| 所属包 | `@vueuse/shared` |
| 依赖工具 | 无（纯工具函数） |
| 设计模式 | 无（纯函数集合） |
| 核心知识点 | 环境检测、类型守卫、SSR 兼容 |

---

## 源码逐行注释

```ts
// ============================================================
// 第一部分：ESLint 配置
// ============================================================

/* eslint-disable antfu/top-level-function */
// 💡 禁用 antfu 的"顶层函数"规则
// 💡 antfu 规则推荐使用 function 声明而非 const 箭头函数
// 💡 但这里使用 const 箭头函数是为了：
//    1. 保持一致性（所有工具函数都是 const）
//    2. 某些函数需要立即执行（如 isIOS）
//    3. 某些函数是纯表达式（如 now、timestamp）

// ============================================================
// 第二部分：环境检测常量（⭐ SSR 兼容的核心）
// ============================================================

export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'
// ⭐ 这是 VueUse 中最重要的环境检测标志
// 💡 作用：判断当前是否在浏览器环境中
// 💡 逻辑：
//    - typeof window !== 'undefined' → window 对象存在
//    - typeof document !== 'undefined' → document 对象存在
//    - 两者都存在才认为是客户端
// 💡 为什么需要两个检查？
//    - 某些环境（如 Web Worker）有 window 但没有 document
//    - 某些环境（如 Deno）有 document 但没有 window
// ⚠️ 这个常量在模块加载时就确定，不会随时间变化

export const isWorker = typeof WorkerGlobalScope !== 'undefined' && globalThis instanceof WorkerGlobalScope
// 💡 判断当前是否在 Web Worker 环境中
// 💡 逻辑：
//    - typeof WorkerGlobalScope !== 'undefined' → WorkerGlobalScope 存在
//    - globalThis instanceof WorkerGlobalScope → 当前全局对象是 WorkerGlobalScope 的实例
// 💡 用途：某些 API 在 Worker 中不可用（如 DOM 操作）

// ============================================================
// 第三部分：类型守卫函数（⭐ TypeScript 类型收窄）
// ============================================================

export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'
// 💡 判断值是否已定义（不是 undefined）
// 💡 `val is T` 是类型守卫，告诉 TypeScript：
//    如果返回 true，则 val 的类型是 T（不包括 undefined）
// 💡 泛型默认值 `T = any`：如果不指定类型，默认为 any
// 💡 参数 `val?: T`：参数本身是可选的，类型为 T | undefined
// 💡 使用场景：
//    if (isDef(value)) {
//      // 这里 value 的类型是 T，不是 T | undefined
//    }

export const notNullish = <T = any>(val?: T | null | undefined): val is T => val != null
// 💡 判断值不是 null 也不是 undefined
// 💡 `val != null` 等价于 `val !== null && val !== undefined`
// 💡 `val is T` 类型守卫：如果返回 true，则 val 的类型是 T（排除 null 和 undefined）
// 💡 使用场景：
//    const arr = [1, null, undefined, 2].filter(notNullish)
//    // arr 的类型是 number[]，不是 (number | null | undefined)[]

// ============================================================
// 第四部分：断言和类型检查
// ============================================================

export const assert = (condition: boolean, ...infos: any[]) => {
  if (!condition)
    console.warn(...infos)
}
// 💡 断言函数：条件不满足时打印警告
// 💡 不会抛出异常，只是警告（比 console.assert 更温和）
// 💡 使用场景：开发时检查参数合法性
//    assert(typeof interval === 'number', 'interval must be a number')

const toString = Object.prototype.toString
// 💡 缓存 Object.prototype.toString，避免重复访问原型链

export const isObject = (val: any): val is object =>
  toString.call(val) === '[object Object]'
// 💡 判断值是否是普通对象（不是数组、null 等）
// 💡 使用 Object.prototype.toString 而非 typeof：
//    - typeof [] === 'object'（数组也是对象）
//    - typeof null === 'object'（null 也是对象）
//    - toString.call([]) === '[object Array]'
//    - toString.call(null) === '[object Null]'
// 💡 类型守卫：返回 true 时，val 的类型收窄为 object

// ============================================================
// 第五部分：时间和数学工具
// ============================================================

export const now = () => Date.now()
// 💡 获取当前时间戳（毫秒）
// 💡 返回类型：number
// 💡 等价于 Date.now()，但更简洁

export const timestamp = () => +Date.now()
// 💡 获取当前时间戳（毫秒），强制转换为数字
// 💡 `+Date.now()` 等价于 `Number(Date.now())`
// 💡 实际上 Date.now() 已经返回 number，+ 是冗余的
// 💡 但这是为了确保类型安全（防止某些奇怪的 polyfill）

export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
// 💡 将数字限制在 [min, max] 范围内
// 💡 逻辑：
//    1. Math.max(min, n) → 确保不小于 min
//    2. Math.min(max, ...) → 确保不大于 max
// 💡 例：clamp(15, 0, 10) → Math.min(10, Math.max(0, 15)) → Math.min(10, 15) → 10
// 💡 与 useCounter 中的边界钳制逻辑相同

// ============================================================
// 第六部分：空函数和随机数
// ============================================================

export const noop = () => {}
// 💡 空函数（no operation）
// 💡 用途：
//    1. 作为默认回调：callback ?? noop
//    2. 作为占位符：不需要执行任何操作的地方
//    3. 清除事件监听：el.addEventListener('click', noop)

export const rand = (min: number, max: number) => {
  min = Math.ceil(min)   // 向上取整
  max = Math.floor(max)  // 向下取整
  return Math.floor(Math.random() * (max - min + 1)) + min
}
// 💡 生成 [min, max] 范围内的随机整数（包含 min 和 max）
// 💡 逻辑：
//    1. Math.random() → [0, 1) 的随机小数
//    2. * (max - min + 1) → [0, max - min + 1) 的随机小数
//    3. Math.floor() → [0, max - min] 的随机整数
//    4. + min → [min, max] 的随机整数
// 💡 例：rand(1, 6) → 1, 2, 3, 4, 5, 6 中的随机一个

// ============================================================
// 第七部分：对象工具和 iOS 检测
// ============================================================

export const hasOwn = <T extends object, K extends keyof T>(val: T, key: K): key is K =>
  Object.prototype.hasOwnProperty.call(val, key)
// 💡 判断对象是否有自己的属性（非继承属性）
// 💡 使用 Object.prototype.hasOwnProperty.call 而非 val.hasOwnProperty：
//    - 防止对象重写了 hasOwnProperty 方法
//    - 防止 val 是 Object.create(null) 创建的对象
// 💡 类型守卫：返回 true 时，key 的类型收窄为 K（keyof T）
// 💡 使用场景：
//    if (hasOwn(obj, 'name')) {
//      // 这里 obj.name 类型安全
//    }

export const isIOS = /* #__PURE__ */ getIsIOS()
// 💡 判断当前是否是 iOS 设备
// 💡 `/* #__PURE__ */` 注释：告诉打包工具这个表达式是"纯"的
//    - 如果结果没有被使用，可以安全地 tree-shake 掉
//    - 这是 esbuild/rollup 的优化标记
// 💡 使用函数包装而非直接赋值：
//    - 避免在模块加载时执行复杂的检测逻辑
//    - 只有在实际使用 isIOS 时才执行检测

function getIsIOS() {
  return isClient && window?.navigator?.userAgent && (
    (/iP(?:ad|hone|od)/.test(window.navigator.userAgent))
    // The new iPad Pro Gen3 does not identify itself as iPad, but as Macintosh.
    // https://github.com/vueuse/vueuse/issues/3577
    || (window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent))
  )
}
// 💡 iOS 设备检测的完整逻辑：
//    1. isClient → 确保在浏览器环境
//    2. window?.navigator?.userAgent → 确保 userAgent 存在
//    3. /iP(?:ad|hone|od)/ → 匹配 iPhone、iPad、iPod
//    4. 或者：maxTouchPoints > 2 且匹配 iPad/Macintosh
//       → 处理 iPad Pro 伪装 Macintosh 的情况
// 💡 为什么要处理 iPad Pro？
//    - iPad Pro（第 3 代及以后）的 userAgent 报告为 Macintosh
//    - 但 maxTouchPoints > 2 表明它是触摸设备
//    - 这是 Apple 为了"桌面级浏览体验"的策略
```

---

## 设计模式解析

### 纯函数集合

`is.ts` 不是一个 composable，而是一组纯函数和常量的集合。它的设计原则是：

1. **无状态**：所有函数都不依赖外部状态
2. **无副作用**：不修改任何外部变量
3. **可预测**：相同输入总是产生相同输出
4. **可 tree-shake**：未使用的函数不会被打包

### 类型守卫模式

```ts
export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'
export const notNullish = <T = any>(val?: T | null | undefined): val is T => val != null
export const isObject = (val: any): val is object => toString.call(val) === '[object Object]'
export const hasOwn = <T extends object, K extends keyof T>(val: T, key: K): key is K => ...
```

**类型守卫的核心：** `val is T` 返回类型告诉 TypeScript，当函数返回 true 时，参数的类型可以收窄为 T。

---

## SSR 兼容设计

### isClient 的作用

```ts
export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'
```

**使用场景：**
1. **条件执行**：只在客户端执行某些代码
   ```ts
   if (isClient) {
     window.addEventListener('resize', handler)
   }
   ```

2. **默认值**：提供 SSR 安全的默认值
   ```ts
   const defaultWindow = isClient ? window : undefined
   ```

3. **功能检测**：检查 API 是否可用
   ```ts
   const isSupported = isClient && 'clipboard' in navigator
   ```

### 为什么需要两个检查？

```ts
// 只检查 window
typeof window !== 'undefined'

// 检查 window 和 document
typeof window !== 'undefined' && typeof document !== 'undefined'
```

**区别：**
- Web Worker：有 window，没有 document
- Deno：有 document，没有 window
- Node.js：都没有
- 浏览器：都有

---

## TypeScript 技巧总结

### 1. 类型守卫（Type Guard）

```ts
const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'
```

**`: val is T` 的作用：**
- 告诉 TypeScript：当函数返回 true 时，val 的类型是 T
- 这样在 if 分支中，val 的类型会自动收窄

### 2. 泛型默认值

```ts
const isDef = <T = any>(val?: T): val is T => ...
const notNullish = <T = any>(val?: T | null | undefined): val is T => ...
```

**`T = any` 的作用：**
- 如果调用时不指定类型参数，T 默认为 any
- 这样可以保持灵活性，同时提供类型安全

### 3. 可选参数 + 类型守卫

```ts
const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'
```

**`val?: T` 的含义：**
- 参数类型是 `T | undefined`
- 如果不传参数，val 是 undefined
- 类型守卫 `val is T` 在返回 true 时排除 undefined

---

## 使用示例

### 环境检测

```ts
import { isClient, isWorker, isIOS } from '@vueuse/shared'

if (isClient) {
  // 浏览器环境
  window.addEventListener('resize', handler)
}

if (isWorker) {
  // Web Worker 环境
  postMessage('hello')
}

if (isIOS) {
  // iOS 设备
  // 应用 iOS 特定的修复
}
```

### 类型守卫

```ts
import { isDef, notNullish, isObject } from '@vueuse/shared'

// 过滤 undefined
const arr1 = [1, undefined, 2, undefined].filter(isDef)
// arr1: number[] = [1, 2]

// 过滤 null 和 undefined
const arr2 = [1, null, undefined, 2].filter(notNullish)
// arr2: number[] = [1, 2]

// 类型收窄
function process(val: unknown) {
  if (isObject(val)) {
    // val 的类型是 object
    console.log(Object.keys(val))
  }
}
```

### 边界钳制

```ts
import { clamp } from '@vueuse/shared'

const value = clamp(15, 0, 10)  // 10
const value2 = clamp(-5, 0, 10) // 0
const value3 = clamp(5, 0, 10)  // 5
```

---

## 关联 hook

| 工具 | 关系 | 说明 |
|------|------|------|
| `useTimeoutFn` | 被依赖 | 使用 `isClient` 检测 SSR |
| `useIntervalFn` | 被依赖 | 使用 `isClient` 检测 SSR |
| `tryOnScopeDispose` | 同级 | 都是基础设施工具 |
| `tryOnMounted` | 同级 | 都是基础设施工具 |

---

## 练习

1. 阅读源码，理解 `isClient` 为什么需要检查 window 和 document 两个对象
2. 理解 `val is T` 类型守卫的语法和作用
3. 思考：为什么 `isObject` 使用 `Object.prototype.toString` 而不是 `typeof`？
4. 练习：写一个 `isArray` 类型守卫函数

---

## 笔记

```
在此记录你的学习笔记...

```
