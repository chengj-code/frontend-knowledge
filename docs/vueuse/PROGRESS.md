# VueUse Hook 封装学习进度追踪

> 记录每个阶段的学习完成情况，方便回顾和继续学习

---

## 学习进度总览

| 阶段 | 名称 | 状态 | 完成日期 | 核心收获 |
|------|------|------|---------|---------|
| 阶段 1 | 基础工具函数 | ✅ 已完成 | 2026-07-24 | MaybeRef、函数重载、类型守卫 |
| 阶段 2 | 状态管理 Composable | ✅ 已完成 | 2026-07-24 | 策略模式、门面模式 |
| 阶段 3 | 定时器与生命周期管理 | ✅ 已完成 | 2026-07-24 | SSR 兼容、生命周期清理、Stoppable/Pausable |
| 阶段 4 | 事件过滤器与函数增强 | ✅ 已完成 | 2026-07-24 | EventFilter 抽象、装饰器模式、组合模式 |
| 阶段 5 | DOM 事件与浏览器 API | ✅ 已完成 | 2026-07-24 | useEventListener 基石、可配置环境注入 |
| 阶段 6 | 高级 Composable | ✅ 已完成 | 2026-07-24 | 状态机、工厂模式、心跳重连 |
| 阶段 7 | 专家级抽象 | ✅ 已完成 | 2026-07-24 | 建造者、代理模式、PromiseLike |

**总体进度：7/7 阶段已完成 (100%)** 🎉

---

## 阶段 1：基础工具函数 ✅

**完成日期：** 2026-07-24

### 学习内容

| 文件 | 核心知识点 | 掌握情况 |
|------|-----------|---------|
| `packages/shared/toValue/index.ts` | 纯 re-export，模块边界 | ✅ |
| `packages/shared/get/index.ts` | MaybeRef、函数重载、unref | ✅ |
| `packages/shared/set/index.ts` | 泛型约束 `K extends keyof O` | ✅ |
| `packages/shared/isDefined/index.ts` | 类型守卫 | ✅ |

### 关键收获

1. **MaybeRef<T>** = `T | Ref<T>`，是 VueUse 最基础的类型概念
2. **函数重载**：同一个函数根据参数类型返回不同结构
3. **类型守卫**：`v is Exclude<T, null | undefined>` 缩小类型范围
4. **unref**：安全地从 Ref 或普通值中取值

### 学习笔记

```
在此记录阶段1的学习笔记...

```

---

## 阶段 2：状态管理 Composable ✅

**完成日期：** 2026-07-24

### 学习清单

| 文件 | 核心知识点 | 状态 |
|------|-----------|------|
| `packages/shared/useToggle/index.ts` | 策略模式、条件返回类型、as const | ✅ |
| `packages/shared/useCounter/index.ts` | 门面模式、shallowReadonly | ✅ |

### 学习目标

- [x] 理解 composable 的标准返回模式
- [x] 理解 `shallowRef` vs `ref` 的选择依据
- [x] 理解 `shallowReadonly` 保护内部状态
- [x] 掌握条件返回类型的重载技巧
- [x] 理解策略模式的应用

### 关键收获

1. **策略模式**：`useToggle` 根据参数类型返回不同的策略函数
2. **门面模式**：`useCounter` 封装了 inc/dec/set/reset 等操作，隐藏内部实现
3. **shallowReadonly**：保护内部状态不被外部直接修改
4. **条件返回类型**：使用泛型和 `as const` 实现精确的类型推断

### 学习笔记

```
阶段2介绍了两个基础的状态管理 composable：

1. useToggle - 策略模式应用
   - 根据初始值类型（boolean/number/string）返回不同策略
   - 使用条件返回类型实现精确的类型推断
   - as const 用于固定元组类型

2. useCounter - 门面模式应用
   - 封装了计数器的所有操作：inc、dec、set、reset
   - 使用 shallowReadonly 保护内部状态
   - 返回只读的 count 和暴露的操作函数

核心理解：composable 的标准返回模式是返回一个包含响应式状态和操作函数的对象。
```

---

## 阶段 3：定时器与生命周期管理 ✅

**完成日期：** 2026-07-24

### 学习清单

| 文件 | 核心知识点 | 状态 |
|------|-----------|------|
| `packages/shared/utils/is.ts` | 环境检测 isClient | ✅ |
| `packages/shared/tryOnScopeDispose/index.ts` | 安全的 onScopeDispose | ✅ |
| `packages/shared/tryOnMounted/index.ts` | 安全的 onMounted | ✅ |
| `packages/shared/useTimeoutFn/index.ts` | 命令模式、SSR 检测 | ✅ |
| `packages/shared/useIntervalFn/index.ts` | 响应式 interval | ✅ |
| `packages/shared/useTimeout/index.ts` | 门面模式、条件返回 | ✅ |
| `packages/shared/useInterval/index.ts` | 门面模式、counter 累加 | ✅ |

### 学习目标

- [x] 理解 `isClient` 的 SSR 安全作用
- [x] 掌握 `tryOnScopeDispose` 生命周期管理
- [x] 掌握 `Stoppable` 和 `Pausable` 接口
- [x] 掌握条件返回类型技巧

### 关键收获

1. **SSR 安全**：`isClient` 检测当前环境，避免在服务端执行浏览器 API
2. **生命周期管理**：`tryOnScopeDispose` 安全地注册清理回调，避免内存泄漏
3. **Stoppable 接口**：提供 `stop` 方法和 `isPending` 状态，用于控制定时器
4. **Pausable 接口**：提供 `pause`/`resume` 方法和 `isActive` 状态，用于暂停/恢复
5. **门面模式**：`useTimeout`/`useInterval` 封装了底层的 `useTimeoutFn`/`useIntervalFn`

### 学习笔记

```
阶段3介绍了定时器和生命周期管理的核心工具：

1. 环境检测
   - isClient = typeof window !== 'undefined'
   - 确保浏览器 API 只在客户端执行

2. 生命周期管理
   - tryOnScopeDispose：尝试在 scope 销毁时执行清理
   - tryOnMounted：尝试在组件挂载时执行
   - 使用 try-catch 包装，避免在非组件上下文中报错

3. 定时器 Hook
   - useTimeoutFn/useIntervalFn：返回 Stoppable/Pausable 接口
   - useTimeout/useInterval：门面模式，简化使用

4. 接口设计
   - Stoppable: { stop, isPending }
   - Pausable: { pause, resume, isActive }

核心理解：VueUse 通过统一的接口设计，让定时器 hook 具有一致的 API 和可预测的行为。
```

---

## 阶段 4：事件过滤器与函数增强 ✅

**完成日期：** 2026-07-24

### 学习清单

| 文件 | 核心知识点 | 状态 |
|------|-----------|------|
| `packages/shared/utils/filters.ts` | EventFilter 抽象 | ✅ |
| `packages/shared/useDebounceFn/index.ts` | 装饰器模式 | ✅ |
| `packages/shared/useThrottleFn/index.ts` | 装饰器模式 | ✅ |
| `packages/shared/refDebounced/index.ts` | 组合模式 | ✅ |
| `packages/shared/refThrottled/index.ts` | 组合模式 | ✅ |
| `packages/shared/watchWithFilter/index.ts` | 带过滤器的 watch | ✅ |
| `packages/shared/watchPausable/index.ts` | pausableFilter | ✅ |
| `packages/shared/watchDebounced/index.ts` | debounceFilter | ✅ |

### 学习目标

- [x] 理解 EventFilter 核心抽象
- [x] 掌握装饰器模式
- [x] 掌握组合模式构建高级 hook

### 关键收获

1. **EventFilter 抽象**：统一的过滤器接口 `bypass`/`filter`，支持 debounce/throttle/pause
2. **装饰器模式**：`useDebounceFn`/`useThrottleFn` 为函数添加防抖/节流能力
3. **组合模式**：通过组合基础 hook 构建高级功能（如 watchDebounced）
4. **过滤器复用**：`debounceFilter`/`throttleFilter`/`pausableFilter` 可在多处复用

### 学习笔记

```
阶段4介绍了事件过滤器体系和函数增强：

1. EventFilter 核心抽象
   - 接口定义：{ bypass, filter }
   - bypass：是否绕过过滤器
   - filter：实际的过滤逻辑

2. 过滤器类型
   - debounceFilter：防抖过滤器
   - throttleFilter：节流过滤器
   - pausableFilter：可暂停过滤器
   - throttleFilter：节流过滤器

3. 装饰器模式应用
   - useDebounceFn：为函数添加防抖能力
   - useThrottleFn：为函数添加节流能力
   - 不修改原函数，而是返回新函数

4. 组合模式应用
   - watchWithFilter：带过滤器的 watch
   - watchDebounced = watchWithFilter + debounceFilter
   - watchPausable = watchWithFilter + pausableFilter

核心理解：EventFilter 是 VueUse 响应式系统的核心抽象，通过过滤器组合实现各种增强功能。
```

---

## 阶段 5：DOM 事件与浏览器 API ✅

**完成日期：** 2026-07-24

### 学习清单

| 文件 | 核心知识点 | 状态 |
|------|-----------|------|
| `packages/core/useMounted/index.ts` | getCurrentInstance | ✅ |
| `packages/core/useSupported/index.ts` | 挂载后检测 | ✅ |
| `packages/core/_configurable.ts` | 可配置环境注入 | ✅ |
| `packages/core/useEventListener/index.ts` | 6 种重载、响应式 target | ✅ |
| `packages/core/useMouse/index.ts` | 策略模式、多事件源 | ✅ |
| `packages/core/useWindowSize/index.ts` | 三种视口类型 | ✅ |
| `packages/core/useFullscreen/index.ts` | 浏览器前缀兼容 | ✅ |
| `packages/core/useNetwork/index.ts` | Network API 封装 | ✅ |
| `packages/core/useIdle/index.ts` | 事件过滤器聚合 | ✅ |
| `packages/core/useClipboard/index.ts` | 降级策略 | ✅ |

### 学习目标

- [x] 精读 useEventListener 的 6 种重载设计
- [x] 理解可配置环境注入模式
- [x] 掌握事件监听的自动清理机制

### 关键收获

1. **useEventListener 基石**：VueUse 中最核心的 hook，6 种重载支持多种使用场景
2. **响应式 target**：支持 ref 元素和 getter 函数，target 变化时自动重新绑定
3. **可配置环境注入**：通过 `_configurable` 注入 window/document，方便测试和 SSR
4. **浏览器前缀兼容**：Fullscreen API 使用 vendor prefix 兼容不同浏览器
5. **降级策略**：Clipboard API 在不支持时降级到 execCommand

### 学习笔记

```
阶段5介绍了 DOM 事件和浏览器 API 的封装：

1. useEventListener - 核心事件监听 hook
   - 6 种重载：target 类型 × 事件类型
   - 响应式 target：支持 ref 元素
   - 自动清理：在 onScopeDispose 时移除监听

2. 可配置环境注入
   - _configurable.ts 定义了 defaultWindow、defaultDocument
   - hook 内部使用 toValue(configurable.window || defaultWindow)
   - 方便测试时注入 mock 对象

3. 浏览器 API 封装
   - useFullscreen：处理 vendor prefix（webkit/moz/ms）
   - useNetwork：封装 NetworkInformation API
   - useClipboard：支持现代 API 和降级方案

4. 策略模式应用
   - useMouse：支持多种事件源（page/client/screen）
   - 通过策略函数处理不同坐标系

核心理解：useEventListener 是 VueUse 事件系统的基石，所有事件相关的 hook 都基于它构建。
```

---

## 阶段 6：高级 Composable ✅

**完成日期：** 2026-07-24

### 学习清单

| 文件 | 核心知识点 | 状态 |
|------|-----------|------|
| `packages/core/useStorage/index.ts` | 序列化策略 + 跨标签页同步 | ✅ |
| `packages/core/onClickOutside/index.ts` | iOS workaround | ✅ |
| `packages/core/useDraggable/index.ts` | 状态机 + 边界约束 | ✅ |
| `packages/core/useWebSocket/index.ts` | 心跳 + 重连 | ✅ |
| `packages/core/useVirtualList/index.ts` | 工厂函数 + 方向策略 | ✅ |

### 学习目标

- [x] 精读 useStorage 的防循环机制
- [x] 掌握状态机模式
- [x] 掌握心跳机制和自动重连

### 关键收获

1. **防循环机制**：useStorage 使用 `ignoreWatch` 和 `pause` 避免 watch 和 storage 事件的循环触发
2. **序列化策略**：支持自定义 serializer/deserializer，处理复杂类型
3. **跨标签页同步**：监听 storage 事件实现多标签页状态同步
4. **状态机模式**：useDraggable 使用状态机管理拖拽状态（idle/dragging/dropped）
5. **心跳重连**：useWebSocket 实现了心跳检测和自动重连机制
6. **边界约束**：useDraggable 支持自定义边界函数限制拖拽范围

### 学习笔记

```
阶段6介绍了高级 composable 的实现：

1. useStorage - 持久化存储
   - 序列化策略：支持 JSON/自定义 serializer
   - 防循环机制：ignoreWatch 标记 + pause 控制
   - 跨标签页：监听 storage 事件同步状态
   - SSR 安全：检测 isClient 环境

2. useDraggable - 拖拽功能
   - 状态机：idle → dragging → dropped
   - 边界约束：bounds 函数限制拖拽范围
   - 坐标系转换：page/client/screen 坐标

3. useWebSocket - WebSocket 封装
   - 心跳机制：定时发送 ping 保持连接
   - 自动重连：指数退避重试策略
   - 状态管理：CONNECTING/OPEN/CLOSING/CLOSED

4. useVirtualList - 虚拟列表
   - 工厂模式：createVirtualList 返回配置化的 hook
   - 方向策略：支持水平和垂直滚动

核心理解：高级 hook 需要处理更多边界情况和性能优化，如防循环、重连、虚拟滚动等。
```

---

## 阶段 7：专家级抽象 ✅

**完成日期：** 2026-07-24

### 学习清单

| 文件 | 核心知识点 | 状态 |
|------|-----------|------|
| `packages/shared/until/index.ts` | 建造者模式 + 类型翻转 + Promise.race 超时控制 | ✅ |
| `packages/core/useMagicKeys/index.ts` | Proxy 懒初始化 + 组合键解析 + Meta 键 workaround | ✅ |
| `packages/core/useAnimate/index.ts` | WritableComputedRef 双向绑定 + useRafFn 状态同步 + Web Animations API | ✅ |
| `packages/core/useFetch/index.ts` | 工厂模式 + 链式 API + PromiseLike + 防竞态机制 | ✅ |

### 学习目标

- [x] 掌握建造者模式的链式 API 设计
- [x] 掌握 Proxy 在 composable 中的应用
- [x] 掌握 PromiseLike 接口实现（thenable）
- [x] 掌握 `WritableComputedRef` 的双向绑定模式
- [x] 掌握 `createFetch` 工厂模式

### 关键收获

1. **建造者模式**：通过 getter 属性 `get not()` 实现链式 API，返回新的实例而不是修改当前实例
2. **类型翻转**：使用 `Not extends boolean` 类型参数和条件类型实现类型推断翻转
3. **Proxy 懒初始化**：使用 Proxy 的 get trap 实现按需创建 ref，首次访问时才创建
4. **组合键解析**：通过正则 `/[+_-]/` 分割组合键字符串，递归访问 proxy 对象
5. **WritableComputedRef**：通过 getter/setter 实现双向绑定，内部状态变化自动同步到外部
6. **PromiseLike 接口**：实现 `then` 方法，让返回值可以直接 await
7. **防竞态机制**：使用 `executeCounter` 计数器确保只有最后一次请求才更新状态
8. **工厂模式**：`createFetch` 返回预配置的 `useFetch` 函数，支持 baseUrl 和回调组合

### 学习笔记

```
阶段7是VueUse中最高级的hook，涵盖了多种设计模式和TypeScript高级特性：

1. until - 建造者模式的典型应用
   - 通过 getter 属性实现惰性 not，避免每次都创建新实例
   - 类型翻转使用条件类型 Promise<Not extends true ? T : U>
   - Promise.race 实现超时控制

2. useMagicKeys - Proxy 模式的创新应用
   - Proxy 的 get trap 实现懒初始化，按需创建 ref
   - 组合键解析：'ctrl+c' → proxy['ctrl'] && proxy['c']
   - Meta 键 workaround：macOS 上 keyup 事件不触发其他键的问题

3. useAnimate - 双向绑定模式
   - WritableComputedRef 的 getter/setter 实现状态双向同步
   - useRafFn 持续同步 Animation 对象状态
   - Web Animations API 的完整封装

4. useFetch - 综合运用所有模式
   - createFetch 工厂函数返回预配置的 useFetch
   - 链式 API：.json()、.post() 等方法返回新对象
   - PromiseLike 接口实现 await 支持
   - combineCallbacks 回调组合：overwrite 和 chain 两种模式
   - executeCounter 防竞态机制

整体感悟：阶段7的代码体现了VueUse团队对TypeScript类型系统和设计模式的深刻理解。
建造者模式、Proxy模式、工厂模式的综合运用，让API既灵活又类型安全。
```

---

## 设计模式学习记录

| 模式 | 首次接触阶段 | 理解程度 | 笔记 |
|------|-------------|---------|------|
| 函数重载 | 阶段 1 | ✅ 掌握 | |
| 类型守卫 | 阶段 1 | ✅ 掌握 | |
| 策略模式 | 阶段 2 | ✅ 掌握 | useToggle 根据参数类型返回不同策略 |
| 门面模式 | 阶段 2 | ✅ 掌握 | useCounter 封装操作隐藏实现 |
| 命令模式 | 阶段 3 | ✅ 掌握 | useTimeoutFn 封装命令和执行 |
| 装饰器模式 | 阶段 4 | ✅ 掌握 | useDebounceFn/useThrottleFn 增强函数 |
| 组合模式 | 阶段 4 | ✅ 掌握 | watchDebounced = watch + debounceFilter |
| 适配器模式 | 阶段 5 | ✅ 掌握 | useFullscreen 适配浏览器前缀 |
| 观察者模式 | 阶段 5 | ✅ 掌握 | useEventListener 监听事件变化 |
| 状态机模式 | 阶段 6 | ✅ 掌握 | useDraggable 管理拖拽状态 |
| 中介者模式 | 阶段 6 | ✅ 掌握 | useWebSocket 协调连接和消息 |
| 工厂模式 | 阶段 7 | ✅ 掌握 | createFetch 返回预配置的 useFetch 函数 |
| 建造者模式 | 阶段 7 | ✅ 掌握 | until 通过 getter 属性实现链式 API |
| 代理模式 | 阶段 7 | ✅ 掌握 | useMagicKeys 使用 Proxy 懒初始化 |

---

## 遇到的问题与解决方案

### 阶段 1

```
问题：...
解决：...

```

### 阶段 2

```
待记录...

```

---

## 学习心得

### 阶段 1 心得

```
在此记录阶段1的学习心得...

```

---

## 下一步计划

**当前状态：** 全部阶段已完成 🎉

**复习建议：**
1. 定期回顾各阶段的详细注释文档，加深理解
2. 尝试自己实现类似的 hook，巩固所学知识
3. 阅读 VueUse 源码中的其他 hook，扩展知识面
4. 将所学的设计模式应用到实际项目中

**进阶学习：**
1. 阅读 `packages/core/useAsyncQueue/index.ts` - 异步队列
2. 阅读 `packages/core/useAsyncValidator/index.ts` - 异步验证
3. 阅读 `packages/core/useChangeCase/index.ts` - 字符串转换
4. 阅读 `packages/shared/createUnheadFn/index.ts` - Head 管理
