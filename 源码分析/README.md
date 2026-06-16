# 源码分析模块 — 规划文档

> 本文档定义了 Vue2 / Vue3 / React 三个框架源码解读模块的完整规划。
> 生成日期：2026-06-16 | 状态：执行中

---

## 一、目录结构

```
源码分析/
├── Vue2/
│   ├── basics/
│   │   └── Vue2-源码解读-Guide.md
│   └── interviews/
│       └── Vue2-源码解读-Questions.md
├── Vue3/
│   ├── basics/
│   │   └── Vue3-源码解读-Guide.md
│   └── interviews/
│       └── Vue3-源码解读-Questions.md
└── React/
    ├── basics/
    │   └── React-源码解读-Guide.md
    └── interviews/
        └── React-源码解读-Questions.md
```

---

## 二、内容定位：与现有模块的区别

| 维度 | 基础知识指南（已有） | 源码解读 Guide（本计划） |
|------|:------------------:|:---------------------:|
| **目标读者** | 初中级开发者 | 中高级 / 资深开发者 |
| **内容性质** | 知识点讲解（是什么/怎么用） | **逐行代码剖析**（为什么这样设计） |
| **代码来源** | 示例代码（教学用） | **真实源码片段**（带行号引用） |
| **深度要求** | 会用即可 | 知其然且知其所以然 |
| **面试价值** | 面试问答（Q&A 形式） | 源码级追问的底气 |
| **典型读者反馈** | "我知道怎么用" | "我懂底层原理" |

---

## 三、SOP 特殊规范

### 3.1 文件命名

```
{框架名}-源码解读-Guide.md        # 基础知识指南
{框架名}-源码解读-Questions.md     # 面试题库
```

### 3.2 内容格式要求

每个核心知识点必须包含以下 5 个要素：

```markdown
#### X.X 【知识点名称】

> **源码位置**：`packages/reactivity/src/reactive.ts:120-185`
> **对应版本**：Vue 3.4.21

##### 1. 源码片段

// 精简后的核心逻辑（保留关键分支和边界处理）
function reactive(target) {
  // Step 1: 基础类型直接返回
  if (!isObject(target)) {
    return target
  }
  // Step 2: 已代理对象直接返回（避免重复代理）
  if (target[ReactiveFlags.IS_REACTIVE]) { ... }
  // Step 3: 创建 Proxy 代理
  const proxy = new Proxy(target, baseHandlers)
  // ...
}

##### 2. 逐行注释

| 行号 | 代码 | 说明 |
|------|------|------|
| 121 | `if (!isObject(target))` | 守卫：基础类型无法被 Proxy 代理 |
| ... | ... | ... |

##### 3. 设计意图

为什么要做这个判断？
→ 性能优化：避免对原始值创建无意义的 Proxy 对象
→ 安全性：防止 `reactive(1)` 返回一个行为怪异的对象

##### 4. 版本差异

与 Vue 2 的 Object.defineProperty 方案对比：
- Vue 2：只能监听对象已存在的属性，需要 $set
- Vue 3：Proxy 可以拦截动态属性访问，天然支持新增属性

##### 5. 关联面试题

→ Q: reactive 为什么不能代理基本类型？ref 是如何解决的？
→ Q: reactive 如何避免重复代理？用了什么标记？
```

### 3.3 P0 手写实现标准

必须包含：
1. **核心机制的简化版手写复现**
   - 如：从零实现 mini-reactive（含 track/trigger/effect）
   - 如：从零实现 mini-Fiber 调度器
   - 如：从零实现 mini-Virtual DOM diff
2. **与官方实现的对比说明表**

| 能力 | 手写版 | 官方版 | 差异原因 |
|------|:------:|:------:|---------|
| 嵌套对象支持 | ✅ | ✅ | 递归 proxy |
| WeakMap 清理 | ❌ | ✅ | 生产环境需考虑内存 |
| 数组方法劫持 | 部分 | 全部 | 7 个变异方法 |

---

## 四、各模块章节详细规划

### 4.1 Vue2 源码解读（12 章 + 附录）

| 序号 | 章节 | 核心源码文件 | 关键知识点 |
|------|------|-------------|-----------|
| 1 | 项目结构与构建 | `/build/*.js`, `/scripts/*` | rollup 配置、web/runtime/cjs/weex 多构建目标、入口文件关系 |
| 2 | 数据响应式原理 | `src/core/observer/index.js` | Object.defineProperty、Observer 类、defineReactive、Dep 收集器、Watcher 订阅器（三种 Watcher）|
| 3 | 虚拟 DOM 与 Diff | `src/core/vdom/vnode.js`, `src/core/vdom/patch.js` | VNode 创建工厂函数、patch 算法、diff 同层比较策略（4 种命中判断）、key 的作用原理 |
| 4 | 模板编译 | `src/compiler/parser.js`, `codegen.js` | parse → optimize → codegen 三阶段、AST 构建、指令编译（v-model/v-for/v-if）、静态树提升 |
| 5 | 组件化机制 | `src/core/vdom/create-component.js`, `instance/index.js` | 组件生命周期（beforeCreate → destroyed）、$mount 过程、组件合并策略（strats merge）|
| 6 | 计算属性与侦听 | `src/core/instance/state.js` | Watcher 三种类型（render/user/computed）、computed 缓存机制（dirty 标志位）、watch 深度遍历 |
| 7 | 事件系统 | `src/core/instance/events.js` | $on/$emit/$off/$once 实现、$listeners、父子通信 / 跨组件通信 |
| 8 | 指令系统 | `src/platforms/web/compiler/directives/model.js` | v-model 编译差异（input text/textarea/select/checkbox/radio）、v-if vs v-show 编译结果对比 |
| 9 | 插槽与 keep-alive | `src/core/components/keep-alive.js` | 作用域插槽编译（_t/_u 函数）、keep-alive LRU 缓存算法（max 限制）、pruneCacheEntry |
| 10 | nextTick 原理 | `src/core/util/next-tick.js` | 微任务降级策略（Promise → MutationObserver → setImmediate → setTimeout）、callbacks 队列、pending 锁 |
| 11 | Vue Router 源码 | `vue-router/src/history/*.js` | hash/history 模式实现差异、路由匹配（path-to-regexp）、导航守卫（resolveQueue 执行链）|
| 12 | Vuex 源码 | `vuex/src/store.js` | Store 类构造、install 注入 $store、响应式 state（resetStoreVM）、mutation/action/dispatch 流程 |

**附录 A**：Vue2 源码调试指南（source-map 配置、关键断点位置）
**附录 B**：Vue2 → Vue3 迁移对照表（API 变更 / 内部实现变化）

---

### 4.2 Vue3 源码解读（12 章 + 附录）

| 序号 | 章节 | 核心源码文件 | 关键知识点 |
|------|------|-------------|-----------|
| 1 | Monorepo 架构 | `pnpm-workspace.yaml`, `packages/*` | pnpm workspace 管理、packages 职责划分（reactivity/runtime/compiler/shared/server）、包间依赖关系图 |
| 2 | Proxy 响应式系统 | `packages/reactivity/src/reactive.ts`, `effect.ts`, `dep.ts` | reactive/ref/toRef/toRefs、effect 副作用收集、track/trigger 依赖收集与触发、WeakMap 存储结构、嵌套 trigger 控制深度 |
| 3 | Composition API | `packages/runtime-core/src/apiSetup.ts`, `component.ts` | setup 函数执行时机（beforeCreate 前）、provide/inject、生命周期 hooks 封装（onMounted/onUnmounted 等）|
| 4 | 虚拟 DOM 重构 | `packages/runtime-core/src/vnode.ts`, `renderer.ts` | PatchFlags 静态标记（TEXT/CLASS/STYLE/PROPS/FULL_PROPS 等）、Block Tree 收集动态节点、快速 diff 算法 |
| 5 | 编译器优化 | `packages/compiler-core/src/transform.ts`, `transformElement.ts` | transform 阶段三大优化（hoistStatic/cacheHandler/prepatch）、静态提升（hoistStatic）、事件缓存（cacheHandler）|
| 6 | 组件更新调度 | `packages/runtime-core/src/scheduler.ts` | scheduler 调度器（queueJob/flushJob）、异步批量更新（nextTick 集成）、job queue 去重、pre/post 钩子 |
| 7 | Suspense 与异步组件 | `packages/runtime-core/src/components/Suspense.ts` | 异步边界处理（default/fallback/error slots）、错误边界集成、嵌套 Suspense |
| 8 | Teleport 与 Fragments | `packages/runtime-core/src/components/Teleport.ts`, `vnode.ts` | Teleport 传送门实现（move 逻辑）、Fragments 多根节点处理（Array children）|
| 9 | 自定义渲染器 | `packages/runtime-core/src/renderer.ts` | createRenderer API 参数（nodeOps/patchProp）、跨平台渲染本质（操作抽象层）|
| 10 | Pinia 源码 | `pinia/src/store.ts`, `createPinia.ts` | defineStore（setup/options 两种风格）、状态树（reactive 包装）、插件系统（use 方法）|
| 11 | Vue Router 4 | `vue-router/src/composables/*` | useRoute/useRouter 组合式 API、动态路由 addRoute、路由守卫封装（onBeforeRouteLeave 等）|
| 12 | Vue2 ↔ Vue3 核心差异 | 对比分析 | 响应式（Object.defineProperty → Proxy）、虚拟 DOM（全量 diff → PatchFlags）、组件初始化（Options → Setup）、Tree-shaking 支持、Monorepo 架构 |

**附录 A**：Vue3 源码调试指南（play 工具使用、断点技巧）
**附录 B**：从零复刻 mini-vue（项目级实战：串联 reactive → effect → renderer → compiler）

---

### 4.3 React 源码解读（12 章 + 附录）

| 序号 | 章节 | 核心源码文件 | 关键知识点 |
|------|------|-------------|-----------|
| 1 | 项目结构与 Monorepo | `packages/` 目录 | react / react-dom / react-reconciler / scheduler 分包职责、fiber 架构分层 |
| 2 | Fiber 架构 | `react-reconciler/src/ReactFiber.*.js` | FiberNode 数据结构（tag/key/stateNode/memoizedProps 等）、FiberTree 双缓存（current/workInProgress）、Fiber 创建流程 |
| 3 | 调度系统 | `scheduler/src/Scheduler.*.js` | Scheduler 优先级队列（Immediate/UserBlocking/Normal/Low/Idle）、lanes 模型（二进制位运算）、task scheduling 与 cancel |
| 4 | Render 阶段 | `react-reconciler/src/ReactFiberBeginWork.js`, `ReactFiberCompleteWork.js` | beginWork → completeWork 协调过程、reconcileChildren 子节点协调、Diff 算法（同层级比较）|
| 5 | Commit 阶段 | `react-reconciler/src/ReactFiberCommitWork.js` | beforeMutation / mutation / layout 三个子阶段、DOM 操作（insertion/update/deletion）、ref 处理 |
| 6 | Hooks 原理 | `react-reconciler/src/ReactFiberHooks.js` | useState（memoizedState 链表）、useEffect（effect 链+flush）、memo/callback 缓存逻辑、Hook 规则底层保证 |
| 7 | 并发特性 | `react-reconciler/src/ReactFiberWorkLoop.js` | Suspense/startTransition/useDeferredValue、时间切片（Time Slicing）、workLoopConcurrent 中断恢复 |
| 8 | 状态管理 | `react/src/ReactContext.js`, `ReactHooks.js` | Context 实现（Provider/Consumer/value 传播）、useReducer 实现、外部方案对比（Redux/Zustand/Jotai/Jotai 原子模型）|
| 9 | 事件系统 | `react-dom/src/events/*` | 合成事件（SyntheticEvent）、事件委托到 root、优先级事件（DiscreteEvent/UserBlockingEvent/ContinuousEvent）|
| 10 | 服务端渲染 | `react-dom/src/server/*` | renderToString/hydrate 过程、流式 SSR（renderToPipeableStream/renderToReadableStream）、选择性 Hydration |
| 11 | React 18 新特性 | `react/src/React.*.js`, `react-dom/client.js` | Automatic Batching（createRoot 模式）、并发渲染模式（Concurrent Mode）、useId / useSyncExternalStore / useInsertionEffect |
| 12 | 性能优化源码视角 | 多文件交叉分析 | memo/useMemo/useCallback 的比较逻辑（shallowEqual）、bailout 机制（canSkipRendering）、React DevTools Profiler 原理 |

**附录 A**：React 源码调试指南（devtools 集成、内部特性开启）
**附录 B**：从零复刻 mini-react（项目级实战：createElement → Fiber → reconcile → commit）

---

## 五、执行进度追踪

| # | 模块 | Phase 1 生成 | Phase 2 评审 | Phase 3 优化 | Phase 4 提交 | 评分 | 状态 |
|---|------|:----------:|:----------:|:----------:|:----------:|:----:|:----:|
| 1 | Vue2 源码解读 | ✅ 完成 | ✅ 完成 | ✅ P0-P2 完成 | ✅ 已提交 | ⭐ **9.3** | **已完成** |
| 2 | Vue3 源码解读 | — | — | — | — | — | 待开始 |
| 3 | React 源码解读 | — | — | — | — | — | 待开始 |

---

## 六、质量标准

沿用 SOP 6 维度打分制（满分 10 分），目标 **≥ 9.0**。

针对源码分析模块的特殊调整：

| 维度 | 权重 | 源码模块特殊要求 |
|------|:----:|---------------|
| 结构完整性 | 15% | 必须覆盖核心源码文件，不能遗漏主要模块 |
| 代码示例质量 | 20% | **必须是真实源码片段**（非示例代码），每段有行号引用 |
| 难度分层合理性 | 15% | 从「看懂源码」→「理解设计」→「能自己实现」递进 |
| 面试实用度 | 15% | 每个知识点关联至少 1 道高频面试追问 |
| **深度（原理级）** | **25%** | **权重提高**：必须有设计意图分析和版本对比 |
| 工程化覆盖 | 10% | 包含源码调试指南、断点推荐位置 |

---

*本文档将在执行过程中持续更新进度。*
