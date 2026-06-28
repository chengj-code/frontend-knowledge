---
---
# Vue3 源码解读 - 面试题库

> **模块定位**：深入理解 Vue3 核心源码实现，掌握响应式系统、虚拟 DOM、编译器、Composition API 等核心机制
> **适用场景**：高级前端工程师面试、源码学习、技术分享
> **总题数**：48 道（基础 12 / 进阶 18 / 专家 18）

---

## ★☆☆ 基础源码理解题（Q01-Q12）

---

## Q01: Vue3 用 Proxy 替代了 Object.defineProperty，具体是怎么实现的？

- **难度**：★☆☆
- **知识点**：[响应式原理] / [Proxy API]
- **题型**：源码分析题
- **关联源码**：`packages/reactivity/src/reactive.ts:90-150`、`packages/reactivity/src/baseHandlers.ts:30-80`

### 参考答案要点：

1. **源码定位**
   - 入口函数：`reactive()` → `createReactiveObject()`
   - Proxy handler：`mutableHandlers`（可变对象）、`readonlyHandlers`（只读对象）
   - 核心 trap：`get`、`set`、`deleteProperty`、`has`

2. **核心逻辑**

```typescript
// packages/reactivity/src/reactive.ts
function createReactiveObject(
  target: object,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<object>,
  proxyMap: WeakMap<Target, ReactiveObject>
) {
  // 1. 检查是否已经是代理对象
  if (target[ReactiveFlags.RAW]) return target
  
  // 2. 从缓存中获取已有代理
  const existingProxy = proxyMap.get(target)
  if (existingProxy) return existingProxy
  
  // 3. 创建 Proxy 实例
  const proxy = new Proxy(target, baseHandlers)
  
  // 4. 缓存代理对象（WeakMap 避免内存泄漏）
  proxyMap.set(target, proxy)
  
  return proxy
}
```

```typescript
// packages/reactivity/src/baseHandlers.ts - get trap
const get = createGetter()
function createGetter(isReadonly = false) {
  return function get(target: Target, key: string | symbol, receiver: object) {
    // 获取原始值
    const res = Reflect.get(target, key, receiver)
    
    // 收集依赖（track）
    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key)
    }
    
    // 嵌套对象递归代理（惰性代理）
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }
    
    return res
  }
}
```

3. **设计意图**
   - **为什么用 Proxy？**
     - 可以监听对象属性的新增/删除（Vue2做不到）
     - 可以监听数组索引变化和 length 属性
     - 性能更好（不需要遍历所有属性进行劫持）
     - 支持 Map/Set/WeakMap/WeakSet 等新数据结构
   
   - **Reflect 的作用**
     - 保证 this 指向正确（receiver 参数）
     - 返回值更规范（如设置属性失败返回 false）

4. **版本差异**
   
| 特性 | Vue2 (Object.defineProperty) | Vue3 (Proxy) |
|------|------------------------------|--------------|
| 属性新增/删除 | 需要 $set/$delete | 自动检测 |
| 数组索引修改 | 无法检测 | 自动检测 |
| 性能 | 初始化时递归遍历 | 惰性代理，按需创建 |
| 兼容性 | IE9+ | IE 不支持 |

### 🔍 追问链

1. **Proxy 的 14 个 trap 分别在哪些场景触发？**
   → 方向：
   - **属性访问/修改**：get/set（最常用，响应式核心）
   - **属性操作**：has/deleteProperty/ownKeys（in/delete/Object.keys）
   - **函数调用**：apply/construct（代理函数调用）
   - **原型操作**：getPrototypeOf/setPrototypeOf
   - **描述符操作**：defineProperty/getOwnPropertyDescriptor
   - **可扩展性**：isExtensible/preventExtensions
   - **枚举**：enumerate（已废弃）、getOwnPropertyNames/getOwnPropertySymbols
   - **Vue3 实际使用**：主要用 get/set/deleteProperty/has/ownKeys 这 5 个

2. **Reflect 为什么必须和 Proxy 配合使用？**
   → 方向：
   - **this 指向问题**：直接用 `target[key]` 会丢失 receiver，导致嵌套 Proxy 失效
   - **返回值规范**：Reflect.set 在严格模式下失败会抛异常，与 Proxy handler 返回值语义一致
   - **默认行为**：Reflect 提供了与 Proxy trap 一一对应的默认实现
   - **示例对比**：`target[key] = value` vs `Reflect.get(target, key, receiver)` 的差异
   - **性能考量**：V8 对 Reflect 有特殊优化，性能优于直接操作

3. **Proxy 的性能开销在哪？V8 有哪些优化？**
   → 方向：
   - **初始化开销**：创建 Proxy 本身很快，但需要维护内部槽位（internal slots）
   - **属性访问开销**：每次 get/set 都要经过 Proxy 拦截层，比直接访问慢 10-100 倍
   - **内存占用**：每个 Proxy 对象有额外元数据存储
   - **V8 优化策略**：
     - IC（Inline Cache）优化：频繁访问的属性会被缓存
     - Hidden Class 共享：Proxy 和原始对象共享 shape 信息
     - TurboFan 编译：热代码会被 JIT 编译优化
   - **实际影响**：对于大多数应用场景可忽略，但在高频数据操作场景需注意
   - **Vue3 缓解措施**：惰性代理、缓存机制、避免深度嵌套

---

## Q02: reactive 和 ref 有什么区别？各自的适用场景？

- **难度**：★☆☆
- **知识点**：[reactive] / [ref] / [API 设计]
- **题型**：对比分析题
- **关联源码**：`packages/reactivity/src/reactive.ts:1-50`、`packages/reactivity/src/ref.ts:100-180`

### 参考答案要点：

1. **源码定位**
   - `reactive()`：`packages/reactivity/src/reactive.ts`
   - `ref()`：`packages/reactivity/src/ref.ts`

2. **核心逻辑对比**

```typescript
// reactive - 深层响应式对象
export function reactive<T extends object>(target: T): UnwrapNestedRefs<T> {
  // 只能用于对象类型（数组/对象）
  if (!isObject(target)) {
    console.warn(`value cannot be made reactive: ${String(target)}`)
    return target
  }
  return createReactiveObject(target, false, mutableHandlers, reactiveMap)
}

// ref - 基本类型的响应式包装
export function ref<T>(value: T): Ref<UnwrapRef<T>> {
  return createRef(value, false)
}

// ref 内部实现 - 使用 getter/setter 劫持 .value 访问
class RefImpl<T> {
  private _value: T
  public dep: Dep = undefined
  public readonly __v_isRef = true

  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    trackRefValue(this)  // 收集依赖
    return this._value
  }

  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toReactive(newVal)
    if (hasChanged(newVal, this._value)) {
      this._value = newVal
      triggerRefValue(this)  // 触发更新
    }
  }
}
```

3. **设计意图与适用场景**

| 特性 | reactive | ref |
|------|----------|-----|
| 数据类型 | 对象/数组 | 任意类型（含基本类型） |
| 访问方式 | 直接访问属性 | 通过 `.value` 访问 |
| 解构问题 | 会丢失响应性 | 不会丢失（toRefs 解决） |
| 适用场景 | 表单数据、复杂状态 | 单个值、组件通信 props |

**最佳实践建议**：
```typescript
// ✅ 推荐用法
const state = reactive({
  user: { name: 'Tom', age: 18 },
  list: []
})

const count = ref(0)
const loading = ref(false)

// ❌ 错误用法
const count = reactive(0)  // 警告！基本类型不能 reactive
```

---

## Q03: effect 函数的作用是什么？它是如何收集依赖的？

- **难度**：★☆☆
- **知识点**：[effect] / [依赖收集] / [响应式系统]
- **题型**：源码分析题
- **关联源码**：`packages/reactivity/src/effect.ts:200-320`、`packages/reactivity/src/effect.ts:350-400`

### 参考答案要点：

1. **源码定位**
   - `effect()` 函数定义：`packages/reactivity/src/effect.ts:200-280`
   - `track()` 依赖收集：`packages/reactivity/src/effect.ts:350-400`
   - 全局变量 `activeEffect`：当前正在执行的 effect

2. **核心逻辑**

```typescript
// packages/reactivity/src/effect.ts
let activeEffect: ReactiveEffect | undefined  // 全局当前 effect

export function effect<T = any>(
  fn: () => T,
  options?: ReactiveEffectOptions
): ReactiveEffectRunner {
  // 创建 ReactiveEffect 实例
  const _effect = new ReactiveEffect(fn)
  
  // 合并选项（scheduler、onStop 等）
  if (options) {
    extend(_effect, options)
  }
  
  // 默认立即执行一次（收集初始依赖）
  if (!options || !options.lazy) {
    _effect.run()
  }
  
  // 返回 runner（可手动调用）
  const runner = _effect.run.bind(_effect) as ReactiveEffectRunner
  runner.effect = _effect
  return runner
}

// ReactiveEffect 类
class ReactiveEffect {
  active = true
  deps: Dep[] = []  // 存储所有依赖的 dep 集合
  
  constructor(
    public fn: () => void,
    public scheduler?: EffectScheduler,
    scope?: EffectScope
  ) {}

  run() {
    // 如果 effect 已停止，直接执行 fn
    if (!this.active) return this.fn()
    
    // 避免重复收集（如果已在栈中）
    if (!effectStack.includes(this)) {
      cleanupEffect(this)  // 清除旧依赖
      
      try {
        // 关键：将当前 effect 设为全局活跃 effect
        effectStack.push((activeEffect = this))
        enableTracking()
        
        // 执行函数，触发 getter → track() 收集依赖
        return this.fn()
      } finally {
        // 执行完毕后恢复上一个 effect
        effectStack.pop()
        resetTracking()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
}
```

```typescript
// track() 依赖收集函数
export function track(target: object, type: TrackOpTypes, key: unknown) {
  // 如果没有活跃的 effect，不收集
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = createDep()))
    }
    
    // 双向记录：dep 记录 effect，effect 记录 dep
    trackEffects(dep)
  }
}

export function trackEffects(dep: Dep) {
  let shouldTrack = false
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit  // 新依赖标记
      shouldTrack = !wasTracked(dep)  // 是否已跟踪过
    }
  } else {
    shouldTrack = !dep.has(activeEffect)
  }
  
  if (shouldTrack) {
    dep.add(activeEffect)       // dep → effect
    activeEffect.deps.push(dep) // effect → dep
  }
}
```

3. **设计意图**
   - **为什么需要全局变量 `activeEffect`？**
     - JavaScript 是单线程的，同一时间只有一个 effect 在执行
     - 通过全局变量可以在任意深度嵌套的 getter 中访问到当前 effect
     - 配合 effectStack 支持嵌套 effect（父子组件渲染）
   
   - **依赖收集的时机**
     - 在 effect 的 `run()` 方法中执行 `fn()`
     - `fn()` 内部访问响应式数据时触发 Proxy.get
     - Proxy.get 中调用 `track()` 将当前 effect 加入 dep

---

## Q04: computed 在 Vue3 中是如何实现的？缓存机制是怎样的？

- **难度**：★☆☆
- **知识点**：[computed] / [缓存机制] / [懒计算]
- **题型**：源码分析题
- **关联源码**：`packages/reactivity/src/computed.ts:30-120`、`packages/reactivity/src/computed.ts:130-180`

### 参考答案要点：

1. **源码定位**
   - `computed()` 函数：`packages/reactivity/src/computed.ts:30-60`
   - `ComputedRefImpl` 类：`packages/reactivity/src/computed.ts:60-130`

2. **核心逻辑**

```typescript
// packages/reactivity/src/computed.ts
export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>
) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>
  
  // 支持函数形式或 {get, set} 形式
  const onlyGetter = isFunction(getterOrOptions)
  getter = onlyGetter ? (getterOrOptions as ComputedGetter<T>) : getterOrOptions.get
  setter = onlyGetter 
    ? () => { console.warn('write operation failed') } 
    : getterOrOptions.set
    
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter.isServerOnly)
  return cRef as any
}
```

```typescript
// ComputedRefImpl - computed 的核心实现
class ComputedRefImpl<T> {
  private _value!: T
  private _dirty = true  // 脏标记：是否需要重新计算
  public dep?: Dep = undefined
  public effect: ReactiveEffect<T>
  public __v_isRef = true
  public [ReactiveFlags.DIRTY]: boolean = true

  constructor(
    getter: ComputedGetter<T>,
    private readonly _setter: ComputedSetter<T>,
    isReadonly: boolean
  ) {
    // 创建 effect，使用 lazy + scheduler 模式
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true  // 依赖变化时标记为脏
        triggerRefValue(this)  // 触发使用该 computed 的 effect 更新
      }
    })
    this.effect.computed = this  // 标记为 computed effect
  }

  get value() {
    // 1. 收集依赖（谁在使用这个 computed）
    trackRefValue(this)
    
    // 2. 脏检查：只有脏的时候才重新计算
    if (this._dirty) {
      this._dirty = false
      this._value = this.effect.run()  // 执行 getter 计算新值
    }
    
    return this._value
  }

  set value(newValue: T) {
    this._setter(newValue)
  }
}
```

3. **缓存机制详解**

```
┌─────────────────────────────────────────────────────┐
│                    computed 缓存流程                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ① 初始状态：_dirty = true                          │
│     ↓                                               │
│  ② 访问 .value                                      │
│     ↓                                               │
│  ③ 检查 _dirty?                                     │
│     ├─ Yes → 执行 effect.run() → 计算 → _dirty=false │
│     └─ No  → 直接返回缓存的 _value                   │
│                                                     │
│  ④ 依赖的数据发生变化                                │
│     ↓                                               │
│  ⑤ scheduler 执行 → _dirty = true                  │
│     ↓                                               │
│  ⑥ 下次访问 .value 时重新计算                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**关键特性**：
- **懒计算**：只在访问 `.value` 时才计算
- **缓存**：依赖不变时返回缓存值，不重复计算
- **自动脏标记**：依赖变化时自动标记为 dirty
- **级联更新**：computed A 依赖 computed B，B 变化会级联标记 A 为 dirty

### 🔍 追问链

1. **dirty 标志位在什么情况下变为 true？**
   → 方向：
   - **初始状态**：创建时 `_dirty = true`，首次访问触发计算
   - **依赖变化时**：scheduler 回调执行，将 `_dirty` 设为 `true`
   - **手动标记**：通过 `[ReactiveFlags.DIRTY]` 可以外部强制标记
   - **关键代码路径**：
     ```typescript
     // scheduler: 依赖变化时触发
     this.effect = new ReactiveEffect(getter, () => {
       if (!this._dirty) {
         this._dirty = true  // 标记为脏
         triggerRefValue(this) // 通知下游 effect
       }
     })
     ```
   - **性能意义**：避免依赖未变化时的无效计算

2. **computed 嵌套 computed 时如何级联更新？**
   → 方向：
   - **场景示例**：`const c1 = computed(() => state.a * 2)` 和 `const c2 = computed(() => c1.value + 1)`
   - **级联机制**：
     - state.a 变化 → c1 的 scheduler 执行 → c1._dirty = true → triggerRefValue(c1)
     - c2 在 track 阶段订阅了 c1.dep → 收到通知 → c2 的 scheduler 执行 → c2._dirty = true
   - **更新顺序**：按照依赖图拓扑排序，从源头到下游依次标记
   - **避免重复计算**：即使多次修改 state.a，也只会在下次访问 .value 时计算一次
   - **循环依赖检测**：Vue3 会检测 computed 循环依赖并抛出警告

3. **Vue3 computed 和 Vue2 computed 的缓存策略差异？**
   → 方向：
   - **Vue2 实现**：
     - 基于 Watcher，使用 dirty + lazy 模式
     - 缓存在 watcher.value 上
     - 同步求值（在 getter 中立即收集依赖）
   - **Vue3 改进**：
     - 使用 ComputedRefImpl 类，独立的 dep 管理
     - 支持 scheduler 异步调度（可配置 flush）
     - 更细粒度的依赖追踪（基于 WeakMap 三层结构）
   - **性能差异**：
     - Vue3 避免了 Vue2 中 Watcher 实例的额外开销
     - Vue3 的惰性代理减少了初始化成本
   - **API 差异**：Vue3 支持 writable computed（get/set），Vue2 不支持

---

## Q05: Vue3 的 VNode 新增了 PatchFlags 和 ShapeFlags，有什么用？

- **难度**：★☆☆
- **知识点**：[VNode] / [PatchFlags] / [ShapeFlags] / [编译优化]
- **题型**：源码分析题
- **关联源码**：`packages/runtime-core/src/vnode.ts:50-120`、`packages/shared/src/patchFlags.ts:1-50`

### 参考答案要点：

1. **源码定位**
   - VNode 类型定义：`packages/runtime-core/src/vnode.ts`
   - PatchFlags 枚举：`packages/shared/src/patchFlags.ts`
   - ShapeFlags 枚举：`packages/shared/src/shapeFlags.ts`

2. **核心逻辑**

```typescript
// packages/shared/src/patchFlags.ts
export const enum PatchFlags {
  TEXT = 1,              // 动态文本节点
  CLASS = 1 << 1,        // 动态 class
  STYLE = 1 << 2,        // 动态 style
  PROPS = 1 << 3,        // 动态属性（不含 class/style）
  FULL_PROPS = 1 << 4,   // 具有动态 key 属性，需完整 diff
  HYDRATE_EVENTS = 1 << 5,// 有事件监听器
  STABLE_FRAGMENT = 1 << 6,// 稳定 fragment（子节点顺序不变）
  KEYED_FRAGMENT = 1 << 7, // 带 key 的 fragment
  UNKEYED_FRAGMENT = 1 << 8,// 不带 key 的 fragment
  NEED_PATCH = 1 << 9,     // 需要 patch 的非 PROPS
  DYNAMIC_SLOTS = 1 << 10, // 动态插槽
  HOISTED = -1,            // 静态提升的节点（diff 时跳过）
  BAIL = -2               // 退回到完整 diff 算法
}

// packages/shared/src/shapeFlags.ts
export const enum ShapeFlags {
  ELEMENT = 1,            // HTML 元素
  FUNCTIONAL_COMPONENT = 1 << 1,  // 函数式组件
  STATEFUL_COMPONENT = 1 << 2,   // 有状态组件
  TEXT_CHILDREN = 1 << 3,        // 文本子节点
  ARRAY_CHILDREN = 1 << 4,       // 数组子节点
  SLOTS_CHILDREN = 1 << 5,       // 插槽子节点
  TELEPORT = 1 << 6,             // Teleport 组件
  SUSPENSE = 1 << 7,             // Suspense 组件
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,  // KeepAlive
  COMPONENT_KEPT_ALIVE = 1 << 9,          // 已被 KeepAlive
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}
```

```typescript
// VNode 结构中的 flags 使用
interface VNode {
  type: VNodeType
  props: (VNodeProps & ExtraProps) | null
  children: VNodeNormalizedChildren
  shapeFlag: number           // ShapeFlags 位运算组合
  patchFlag: number           // PatchFlags 位运算组合
  dynamicProps: string[] | null  // 动态属性名列表
  dynamicChildren: VNode[] | null // 动态子节点数组（Block Tree）
}
```

3. **设计意图与应用**

**PatchFlags 的作用**：
- **精准 Diff**：告诉运行时哪些部分是动态的，跳过静态内容
- **快速路径**：根据 flag 选择最优的 patch 策略
- **性能优化**：避免不必要的全量比较

**实际应用示例**：
```html
<!-- 编译前 -->
<div id="app">
  <h1>{{ title }}</h1>        <!-- TEXT -->
  <p :class="cls">静态文本</p> <!-- CLASS -->
  <span :style="{ color }">动态样式</span> <!-- STYLE -->
</div>

<!-- 编译后的 render 函数 -->
const _hoisted_1 = { id: "app" }  // 静态提升
const _hoisted_2 = /*#__PURE__*/createElementVNode("p", null, "静态文本", -1)

return function render(_ctx, _cache) {
  return (_openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("h1", null, toDisplayString(_ctx.title), 1 /* TEXT */),
    _hoisted_2,  // 静态节点，patchFlag = -1 (HOISTED)
    createElementVNode("span", { style: _ctx.color }, "动态样式", 4 /* STYLE */)
  ]))
}
```

**性能提升效果**：
- 静态节点：完全跳过 diff（HOISTED flag）
- 只有 class 变化：只比较 class（CLASS flag）
- 只有文本变化：直接替换文本（TEXT flag）

---

## Q06: Vue3 的编译器做了哪些优化？（hoistStatic/cacheHandler/prepatchVnode）

- **难度**：★☆☆
- **知识点**：[编译优化] / [静态提升] / [事件缓存]
- **题型**：源码分析题
- **关联源码**：`packages/compiler-core/src/transforms/hoistStatic.ts:20-100`、`packages/compiler-dom/src/transforms/vOn.ts:150-220`、`packages/compiler-core/src/transforms/transformElement.ts:300-380`

### 参考答案要点：

1. **源码定位**
   - hoistStatic（静态提升）：`packages/compiler-core/src/transforms/hoistStatic.ts`
   - cacheHandler（事件缓存）：`packages/compiler-dom/src/transforms/vOn.ts`
   - prepatchVnode（预补丁）：在 codegen 阶段处理

2. **核心逻辑**

### 优化一：hoistStatic（静态提升）

```typescript
// packages/compiler-core/src/transforms/hoistStatic.ts
export const hoistStatic: NodeTransform = (node, context) => {
  // 1. 遍历子节点，找出可以提升的静态节点
  if (node.type === NodeTypes.ELEMENT && node.tagType === ElementTypes.ELEMENT) {
    const constantType = getConstantType(node, context)
    
    // 2. 如果是常量节点（没有动态绑定），提升到 render 函数外部
    if (constantType > ConstantTypes.NOT_CONSTANT) {
      const codegenNode = node.codegenNode!
      
      // 3. 提升到根作用域（组件实例级别），避免每次渲染都重新创建
      const args = []
      if (codegenNode.arguments) {
        args.push(...codegenNode.arguments)
      }
      
      // 4. 生成提升代码：const _hoisted_x = ...
      context.hoist(codegenNode)
      
      // 5. 用引用替换原节点
      node.codegenNode = context.cache(codegenNode)
    }
  }
}
```

**优化效果**：
```javascript
// ❌ 未优化：每次渲染都创建新的 VNode
function render() {
  return h('div', null, [
    h('span', null, '静态文本1'),
    h('span', null, '静态文本2'),
    h('p', null, title)  // 只有这个是动态的
  ])
}

// ✅ 优化后：静态节点提升到外部
const _hoisted_1 = h('span', null, '静态文本1')
const _hoisted_2 = h('span', null, '静态文本2')

function render() {
  return h('div', null, [
    _hoisted_1,  // 复用同一个 VNode 引用
    _hoisted_2,
    h('p', null, title)
  ])
}
```

### 优化二：cacheHandler（事件缓存）

```typescript
// packages/compiler-dom/src/transforms/vOn.ts
export const transformOn: DirectiveTransform = (dir, node, context) => {
  // ... 解析事件绑定
  
  // 检查是否可以缓存（内联函数且不是动态参数）
  let handlerExp: ExpressionNode
  let isCacheable = !isDynamicDir
  
  if (isCacheable) {
    // 使用缓存数组存储事件处理器
    const cacheIndex = context.cache.length
    context.cached.push(handlerExp)
    
    // 生成缓存代码：_cache[0] || (_cache[0] = (...args) => ...)
    handlerExp = createCacheExpression(cacheIndex, handlerExp)
  }
  
  // ...
}
```

**优化效果**：
```javascript
// ❌ 未优化：每次渲染都创建新函数
render(ctx) {
  return h('button', {
    onClick: ($event) => ctx.handleClick($event)  // 新函数引用
  })
}

// ✅ 优化后：缓存函数引用
render(_ctx, _cache) {
  return h('button', {
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.handleClick($event))
  })
}
```

### 优化三：prepatchVnode（预补丁优化）

在 Block Tree 和 PatchFlags 配合下：
- 动态节点收集到 `dynamicChildren` 数组
- patch 时只比较 `dynamicChildren`，跳过静态兄弟节点
- 时间复杂度从 O(n) 降到 O(动态节点数)

### 🔍 追问链

1. **各 PatchFlags 位运算的含义？（二进制掩码）**
   → 方向：
   - **PatchFlags 定义**（使用位运算标记动态部分）：
     ```typescript
     export const enum PatchFlags {
       TEXT = 1,              // 001: 动态文本内容
       CLASS = 1 << 1,        // 010: 动态 class
       STYLE = 1 << 2,        // 100: 动态 style
       PROPS = 1 << 3,        // 1000: 动态属性（不含 class/style）
       FULL_PROPS = 1 << 4,   // 10000: 有动态 key 的属性
       HYDRATE_EVENTS = 1 << 5, // 100000: 事件监听器
       STABLE_FRAGMENT = 1 << 6, // 1000000: 稳定 fragment
       KEYED_FRAGMENT = 1 << 7,  // 10000000: 带 key 的 fragment
       UNKEYED_FRAGMENT = 1 << 8, // 100000000: 不带 key 的 fragment
       NEED_PATCH = 1 << 9,      // 1000000000: 需要 patch
       DYNAMIC_SLOTS = 1 << 10,  // 10000000000: 动态插槽
       HOISTED = -1,             // 静态提升
       BAIL = -2                 // diff 算法回退
     }
     ```
   - **组合使用**：`PatchFlags.CLASS | PatchFlags.STYLE` 表示 class 和 style 都动态
   - **Diff 优化**：patchElement 时根据 flags 跳过静态部分的比较

2. **动态子节点收集算法的时间复杂度？**
   → 方向：
   - **Block Tree 收集过程**：在 transform 阶段，遍历 AST 树，将动态节点收集到 dynamicChildren 数组
   - **时间复杂度分析**：
     - 编译时：O(n)，n 为模板节点数（一次性遍历）
     - 运行时 Diff：O(m)，m 为 dynamicChildren 长度（通常远小于 n）
   - **空间换时间**：每个 VNode 额外存储 dynamicChildren 引用
   - **实际效果**：对于大部分静态、少量动态的模板，性能提升显著

3. **PatchFlags 在 SSR 场景下的特殊处理？**
   → 方向：
   - **SSR 不需要 Diff**：服务端渲染直接生成 HTML，不需要虚拟 DOM 比较
   - **但需要 PatchFlags 信息用于 hydration**：
     - 标记哪些部分需要在客户端激活后更新
     - 优化 hydration 过程中的事件绑定和属性同步
   - **SSR_VNODE_CALL 优化**：编译时生成更高效的 SSR 渲染函数
   - **客户端激活**：使用 PatchFlags 快速对比服务端 HTML 和客户端状态

---

## Q07: setup 函数什么时候执行？为什么不能是异步的？

- **难度**：★☆☆
- **知识点**：[setup] / [生命周期] / [Composition API]
- **题型**：源码分析题
- **关联源码**：`packages/runtime-core/src/component.ts:500-600`、`packages/runtime-core/src/apiSetup.ts:100-250`

### 参考答案要点：

1. **源码定位**
   - setup 执行时机：`packages/runtime-core/src/component.ts:520-580`
   - setup 函数调用：`packages/runtime-core/src/apiSetup.ts:150-230`

2. **核心逻辑**

```typescript
// packages/runtime-core/src/component.ts
function setupComponent(instance: ComponentInternalInstance, isSSR: boolean) {
  // 1. 设置 props（已解析）
  setIsSSRComponentSetup(isSSR)
  
  // 2. 设置 slots（已解析）
  const { setup } = instance.vnode.type as ComponentOptions
  
  if (setup) {
    // 3. 设置 setupContext（暴露给用户的上下文）
    const setupContext = (instance.setupContext =
      setup.length > 1 ? createSetupContext(instance) : null)
    
    // 4. 重置当前实例
    setCurrentInstance(instance)
    
    // 5. 暂停依赖收集（setup 内部的响应式访问不应该被追踪）
    pauseTracking()
    
    // 6. 执行 setup 函数 ⭐ 关键点
    const setupResult = callWithErrorHandling(setup, instance, ErrorCodes.SETUP_FUNCTION, [
      __DEV__ ? shallowReadonly(instance.props) : instance.props,
      setupContext
    ])
    
    // 7. 恢复依赖收集
    resetTracking()
    
    // 8. 取消当前实例
    unsetCurrentInstance()
    
    // 9. 处理 setup 返回值
    if (isFunction(setupResult)) {
      // 返回渲染函数
      instance.render = setupResult as InternalRenderFunction
    } else if (isObject(setupResult)) {
      // 返回响应式对象
      instance.setupState = proxyRefs(setupResult)
    }
  }
}
```

3. **执行时机详解**

```
组件生命周期（setup 执行位置）：

beforeCreate() ← 此时还没有 setup
     ↓
  setup() ← 在这里执行！props 已初始化，但 data/methods 还没有
     ↓
created() ← setup 返回值已经挂载到组件实例
     ↓
  beforeMount()
     ↓
  mounted()
```

**关键时序**：
- `setup` 在 `beforeCreate` 之后、`created` 之前执行
- 此时 `props` 已经解析完成并传入
- 但 `data`、`methods`、`computed` 还未初始化
- 因此 `setup` 中无法通过 `this` 访问这些属性

4. **为什么不能是异步的？**

```typescript
// packages/runtime-core/src/apiSetup.ts
if (isPromise(setupResult)) {
  // 异步 setup 的处理逻辑
  setupResult.then((resolvedResult: any) => {
    handleSetupResult(instance, resolvedResult, isSSR)
  }).catch(e => {
    handleError(e, instance, ErrorCodes.SETUP_FUNCTION)
  })
} else {
  // 同步 setup：直接处理结果
  handleSetupResult(instance, setupResult, isSSR)
}
```

**原因分析**：
1. **模板编译依赖同步返回**：模板需要在 setup 返回后才能访问到响应式数据
2. **生命周期钩子顺序**：`created` 钩子在 setup 之后执行，必须等待 setup 完成
3. **SSR 渲染**：服务端渲染要求同步返回结果
4. **开发体验**：异步 setup 会导致组件处于"未就绪"状态，增加复杂度

**Vue 3.2+ 的 Suspense 支持**：
```html
<script setup>
async function loadData() {
  const res = await fetch('/api/data')
  return res.json()
}

// ⚠️ 这不会让 setup 本身变成 async
const data = await loadData()  // 顶层 await，配合 Suspense 使用
</script>
```

### 🔍 追问链

1. **静态提升的条件判断逻辑？**
   → 方向：
   - **常量类型检测**：`getConstantType(node, context)` 判断节点是否可提升
   - **提升条件**：
     - 节点本身是静态的（无动态绑定、无动态子节点）
     - 父节点不是 `<template v-if>` 或 `<template v-for>`
     - 节点不在动态组件内部
     - 节点的 key 不是动态的
   - **常量级别分类**：
     - `NOT_CONSTANT` (0)：不能提升
     - `CAN_STRINGIFY` (1)：可以序列化为字符串
     - `CAN_HOIST` (2)：可以提升到外部
   - **递归检查**：需要递归检查所有子节点是否都是常量

2. **提升后变量名冲突如何处理？**
   → 方向：
   - **命名规则**：`_hoisted_1`, `_hoisted_2`, `_hoisted_3` ... 自动递增编号
   - **作用域管理**：提升后的变量放在渲染函数外部（模块级作用域）
   - **缓存机制**：使用 `context.cache()` 缓存已提升的表达式，避免重复创建
   - **引用替换**：原节点用变量引用替代，如 `_hoisted_1`
   - **代码生成**：codegen 阶段会正确处理这些引用

3. **哪些情况不能做静态提升？**
   → 方向：
   - **包含动态绑定的节点**：`<div :class="dynamic">` 不能提升
   - **包含动态插槽的节点**：`<slot :data="props" />` 不能提升
   - **v-if/v-else 分支中的节点**：条件性渲染不能提升（除非整个分支都静态）
   - **v-for 循环中的节点**：列表渲染通常不提升（除非列表内容完全静态）
   - **自定义组件的默认 slot 内容**：可能被动态替换
   - **带有动态 key 的元素**：key 变化会导致重新创建
   - **包含事件处理器的内联函数**：虽然函数可以被 cacheHandler 缓存，但节点本身仍需保留

---

## Q08: Fragment 和 Teleport 的实现原理？

- **难度**：★☆☆
- **知识点**：[Fragment] / [Teleport] / [内置组件]
- **题型**：源码分析题
- **关联源码**：`packages/runtime-core/src/components/Teleport.ts:50-150`、`packages/runtime-core/src/vnode.ts:130-160`

### 参考答案要点：

1. **源码定位**
   - Fragment 实现：`packages/runtime-core/src/renderer.ts`（特殊处理逻辑）
   - Teleport 组件：`packages/runtime-core/src/components/Teleport.ts`

2. **核心逻辑 - Fragment**

```typescript
// Fragment 是一个特殊的 VNode 类型
// packages/runtime-core/src/vnode.ts
export const Fragment = Symbol(__DEV__ ? 'Fragment' : undefined)

// 在 renderer 中的处理
const patch: PatchFn = (
  n1, n2, container, anchor = null, parentComponent = null, ...rest
) => {
  // 根据 VNode 类型分发不同的 patch 逻辑
  const { type, ref, shapeFlag } = n2
  
  switch (type) {
    case Text:
      processText(n1, n2, container, anchor)
      break
    case Comment:
      processCommentNode(n1, n2, container, anchor)
      break
    case Static:
      mountStaticNode(n1, n2, container, anchor)
      break
    case Fragment:
      // ⭐ Fragment 处理：批量处理多个子节点
      processFragment(n1, n2, container, anchor, parentComponent, ...)
      break
    default:
      // 其他元素或组件...
  }
}

// processFragment 实现
const processFragment = (
  n1, n2, container, anchor, parentComponent, ...
) => {
  const fragmentSlotFlags = n2.shapeFlag & ShapeFlags.SLOTS_CHILDREN
    ? ShapeFlags.ARRAY_CHILDREN
    : ShapeFlags.TEXT_CHILDREN
  
  // 将 Fragment 的 children 作为普通节点处理
  // 不创建额外的 DOM 包裹元素
  patchChildren(n1, n2, container, ..., fragmentSlotFlags)
}
```

**Fragment 的优势**：
```html
<!-- Vue2 必须有一个根元素 -->
<template>
  <div>  <!-- 无意义的包裹 div -->
    <header>Header</header>
    <main>Main</main>
    <footer>Footer</footer>
  </div>
</template>

<!-- Vue3 可以有多个根元素 -->
<template>
  <header>Header</header>
  <main>Main</main>
  <footer>Footer</footer>
</template>
```

3. **核心逻辑 - Teleport**

```typescript
// packages/runtime-core/src/components/Teleport.ts
export const Teleport = {
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, ...) {
    // 1. 获取目标容器（to prop 指定的选择器）
    const targetSelector = n2.props && n2.props.to
    const target = normalizeTarget(targetSelector)
    
    if (n1 == null) {
      // 2. 挂载阶段：将内容渲染到目标容器而非父容器
      mountChildren(
        n2.children as VNodeArrayChildren,
        target,  // ⭐ 注意：这里用的是 target 而不是 container
        anchor,
        parentComponent,
        ...
      )
    } else {
      // 3. 更新阶段：检查目标是否变化
      if (hasChangedContent(n1, n2)) {
        // 目标变了：卸载旧的，挂载到新的
        moveTeleport(n2, container, parentComponent, internals)
      } else {
        // 目标没变：正常 patch 子节点
        patchChildren(n1, n2, target, ...)
      }
    }
  },
  
  move(type, containers) {
    // 移动 Teleport 内容到新位置
    // 用于 keep-alive 或条件渲染切换
  }
}
```

**Teleport 应用场景**：
```html
<!-- 模态框传送到 body 下 -->
<Teleport to="body">
  <div class="modal">模态框内容</div>
</Teleport>

<!-- 传送到特定容器 -->
<Teleport to="#modal-container">
  <div class="dialog">对话框</div>
</Teleport>
```

**实现要点**：
- Teleport 本身不创建 DOM 元素
- 它的内容会被"传送"到 `to` 属性指定的位置
- 仍然保持组件树的逻辑关系（事件冒泡、provide/inject 正常工作）
- 支持动态切换目标位置

---

## Q09: Vue3 的 scheduler 调度器是如何工作的？

- **难度**：★☆☆
- **知识点**：[scheduler] / [任务队列] / [微任务调度]
- **题型**：源码分析题
- **关联源码**：`packages/runtime-core/src/scheduler.ts:50-200`、`packages/runtime-core/src/scheduler.ts:210-350`

### 参考答案要点：

1. **源码定位**
   - `queueJob()`：`packages/runtime-core/src/scheduler.ts:70-110`
   - `flushJobs()`：`packages/runtime-core/src/scheduler.ts:210-310`
   - `nextTick()`：`packages/runtime-core/src/scheduler.ts:450-480`

2. **核心逻辑**

```typescript
// packages/runtime-core/src/scheduler.ts

// 任务队列
const queue: SchedulerJob[] = []  // 待执行的 job 数组
let flushIndex = 0  // 当前执行到的 job 索引

// 状态标志
let isFlushing = false  // 是否正在刷新队列
let isFlushPending = false  // 是否等待微任务回调

// resolvePromise.then 的引用（微任务调度）
const resolvedPromise = Promise.resolve() as Promise<any>
let currentFlushPromise: Promise<void> | null = null

/**
 * 将 job 加入队列
 * @param job 要执行的任务（通常是组件更新函数）
 */
export function queueJob(job: SchedulerJob) {
  // 1. 去重：队列中已存在的 job 不重复添加
  if (!queue.includes(job)) {
    // 2. 根据 id 排序（确保父子组件的正确执行顺序）
    if (queue.length === 0 || !job.id || job.id >= queue[queue.length - 1].id!) {
      queue.push(job)
    } else {
      // 插入到合适的位置
      queue.splice(findInsertionIndex(job.id!), 0, job)
    }
    
    // 3. 如果队列未在刷新中，调度刷新操作
    queueFlush()
  }
}

// 调度队列刷新（使用微任务）
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true
    currentFlushPromise = resolvedPromise.then(flushJobs)  // 微任务
  }
}

/**
 * 刷新任务队列（核心方法）
 */
function flushJobs(seen?: CountMap) {
  isFlushPending = false
  isFlushing = true
  
  // 1. 排序：确保
  //    - 父组件先于子组件更新
  //    - 用户 watcher 先于渲染 watcher
  //    - 组件更新按创建顺序
  queue.sort(comparator)
  
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex]
      
      if (job && job.active !== false) {
        // 2. 执行 job（调用 console.error 以捕获错误）
        callWithErrorHandling(job, null, ErrorCodes.SCHEDULER)
      }
    }
  } finally {
    // 3. 清理工作
    flushIndex = 0
    queue.length = 0
    
    // 4. 执行 postFlushCbs（post 阶段的回调）
    flushPostFlushCbs(seen)
    
    isFlushing = false
    currentFlushPromise = null
    
    // 5. 如果在刷新过程中又有新 job 加入，继续刷新
    if (queue.length || postFlushCbs.length) {
      flushJobs(seen)
    }
  }
}
```

3. **调度策略详解**

```
┌──────────────────────────────────────────────────┐
│              Scheduler 工作流程                    │
├──────────────────────────────────────────────────┤
│                                                  │
│  ① 响应式数据变化                                 │
│     ↓                                           │
│  ② trigger() → 调用 effect.scheduler             │
│     ↓                                           │
│  ③ queueJob(componentUpdateFn)                   │
│     ↓ （去重 + 按 id 排序）                      │
│  ④ queueFlush()                                  │
│     ↓                                           │
│  ⑤ Promise.resolve().then(flushJobs)  // 微任务   │
│     ↓                                           │
│  ⑥ 当前宏任务结束后，微任务队列执行               │
│     ↓                                           │
│  ⑦ flushJobs():                                  │
│     ├─ 排序队列                                   │
│     ├─ 循环执行所有 job                           │
│     └─ 执行 postFlushCbs                         │
│                                                  │
└──────────────────────────────────────────────────┘
```

**关键设计决策**：
- **为什么用微任务（Promise.then）而不是宏任务（setTimeout）？**
  - 微任务在当前任务结束后立即执行，用户体验更好
  - 避免浏览器重绘闪烁
  - 符合 HTML 规范的 microtask 语义

- **为什么要去重？**
  - 同一个组件的多次数据变化只需更新一次
  - 例如：同时修改 10 个响应式属性，只触发一次 re-render

- **为什么要排序？**
  - 确保父组件先于子组件更新（避免子组件重复渲染）
  - 确保 watch 回调在组件更新之后执行

---

## Q10: Suspense 组件的实现原理是什么？

- **难度**：★☆☆
- **知识点**：[Suspense] / [异步组件] / [错误边界]
- **题型**：源码分析题
- **关联源码**：`packages/runtime-core/src/components/Suspense.ts:100-300`、`packages/runtime-core/src/components/Suspense.ts:350-500`

### 参考答案要点：

1. **源码定位**
   - Suspense 组件定义：`packages/runtime-core/src/components/Suspense.ts:100-200`
   - 异步依赖处理：`packages/runtime-core/src/components/Suspense.ts:250-400`

2. **核心逻辑**

```typescript
// packages/runtime-core/src/components/Suspense.ts
export const Suspense: ComponentOptionsWithProps<SuspenseProps> = {
  name: 'Suspense',
  
  // Suspense 是内置组件，不走常规组件流程
  __isSuspense: true,
  
  process(n1, n2, container, anchor, parentComponent, ...) {
    if (n1 == null) {
      // 挂载阶段
      mountSuspense(n2, container, anchor, parentComponent, ...)
    } else {
      // 更新阶段
      patchSuspense(n1, n2, container, parentComponent, ...)
    }
  },
  
  hydrate: hydrateSuspense,
  create: createSuspenseBoundary
}

// 挂载 Suspense
function mountSuspense(
  vnode, container, anchor, parentComponent, ...
) {
  const suspense = (vnode.suspense = createSuspenseBoundary(
    vnode,
    parentComponent,
    container,
    anchor,
    ...
  ))
  
  // 1. 设置默认插槽内容（可能包含异步组件）
  const { content, fallback } = suspense.slots
  
  // 2. 尝试挂载默认内容
  suspense.patch(content, container, ...)
  
  // 3. 如果默认内容中有异步依赖（async setup）
  if (suspense.asyncDep) {
    // 4. 注册 then 回调
    suspense.asyncDep.then(resolver).catch(error => {
      handleError(error, suspense.component, ErrorCodes.SUSPENSE)
    })
    
    // 5. 立即显示 fallback 内容
    suspense.patch(fallback, container, ...)
  }
}
```

```typescript
// 异步依赖解析后的处理
function resolve(suspense, branch) {
  // 1. 隐藏 fallback
  unmount(fallbackVNode)
  
  // 2. 显示真正的内容
  suspense.pendingBranch = null
  suspense.isInFallback = false
  
  // 3. 挂载/更新真正的内容
  if (branch.el) {
    // 移动 DOM 到正确位置
    move(branch.el, container, anchor)
  }
  
  // 4. 触发 onResolve 生命周期
  if (suspense.props.onResolve) {
    suspense.props.onResolve()
  }
}
```

3. **使用方式与工作流**

```html
<Suspense>
  <!-- 默认插槽：可能包含异步组件 -->
  <template #default>
    <AsyncComponent />  <!-- 这个组件的 setup 是 async 的 -->
  </template>
  
  <!-- fallback 插槽：加载中显示的内容 -->
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
```

**完整工作流程**：
```
1. Suspense 开始渲染默认插槽内容
   ↓
2. 发现 AsyncComponent 有 async setup
   ↓
3. 创建 Promise 并挂起渲染
   ↓
4. 立即渲染 fallback 内容（Loading...）
   ↓
5. 异步操作完成（Promise resolve）
   ↓
6. 卸载 fallback，渲染真正的组件内容
   ↓
7. 如果异步失败，触发 onError 回调
```

**关键特性**：
- **嵌套支持**：Suspense 可以嵌套使用
- **错误处理**：支持 `@error` 事件和 `onErrorCapture`
- **超时控制**：可通过 `timeout` prop 设置超时时间
- **结合 `<script setup>` 顶层 await**：Vue 3.2+ 支持

---

## Q11: provide/inject 是怎么实现的？和 Vue2 的区别？

- **难度**：★☆☆
- **知识点**：[provide/inject] / [依赖注入] / [组件通信]
- **题型**：对比分析题
- **关联源码**：`packages/runtime-core/src/apiInject.ts:20-100`、`packages/runtime-core/src/componentPublicInstance.ts:150-200`

### 参考答案要点：

1. **源码定位**
   - provide/inject API：`packages/runtime-core/src/apiInject.ts`
   - 组件实例上的 provides：`packages/runtime-core/src/component.ts`

2. **核心逻辑**

```typescript
// packages/runtime-core/src/apiInject.ts
import { getCurrentInstance } from './component'

/**
 * provide：提供数据（通常在父组件中使用）
 * @param key 注入键（可以是字符串或 Symbol）
 * @param value 提供的值
 */
export function provide<T>(key: InjectionKey<T> | string, value: T): void {
  // 1. 获取当前组件实例
  const instance: any = getCurrentInstance()
  
  if (instance) {
    // 2. 获取父组件的 provides（原型链继承）
    let provides = instance.provides
    
    // 3. 首次调用时，创建原型链指向父级的 provides
    const parentProvides = instance.parent?.provides
    if (provides === parentProvides) {
      // 使用 Object.create 实现原型链
      provides = instance.provides = Object.create(parentProvides)
    }
    
    // 4. 设置值
    provides[key as string] = value
  }
}

/**
 * inject：注入数据（通常在子组件中使用）
 * @param key 注入键
 * @param defaultValue 默认值（可选）
 * @param treatDefaultAsFactory 是否将默认值视为工厂函数
 */
export function inject<T>(key: InjectionKey<T> | string, defaultValue?: T, treatDefaultAsFactory?: boolean): T {
  // 1. 获取当前组件实例
  const instance = getCurrentInstance()
  
  if (instance) {
    // 2. 沿着父组件链向上查找 provides
    const provides = instance.parent?.provides
    
    // 3. 如果 key 存在于 provides 中（包括原型链上）
    if ((key as string | symbol) in provides) {
      return provides[key as string | symbol]
    } else if (arguments.length > 1) {
      // 4. 使用默认值
      return treatDefaultAsFactory && isFunction(defaultValue)
        ? defaultValue.call(instance.proxy)
        : defaultValue
    } else if (__DEV__) {
      warn(`injection "${String(key)}" not found.`)
    }
  }
}
```

3. **原型链查找机制**

```
组件树结构：
App (provides: { theme: 'dark' })
 └─ Parent (provides: { locale: 'zh' })  ← 原型链指向 App.provides
      └─ Child (injects: theme, locale)

Child.inject('theme') 的查找过程：
1. 查看 Child.parent.provides（即 Parent.provides）
2. Parent.provides 没有 'theme'
3. 沿着原型链找到 App.provides
4. App.provides 有 'theme': 'dark' ✓

Parent.provides 的原型链：
{
  locale: 'zh',
  __proto__: {
    theme: 'dark',
    __proto__: null
  }
}
```

4. **Vue2 vs Vue3 对比**

| 特性 | Vue2 | Vue3 |
|------|------|------|
| **API 位置** | 选项式 API（options） | 组合式函数（setup 中调用） |
| **响应式** | 非响应式（需手动 $watch） | 自动响应式（提供的是响应式数据） |
| **查找机制** | 递归遍历父组件链 | 原型链查找（性能更好） |
| **默认值** | 不支持 | 支持默认值和工厂函数 |
| **类型安全** | 字符串 key，无类型提示 | 支持 InjectionKey 泛型 |

**Vue2 实现**（简化）：
```javascript
// Vue2: 递归查找
function inject(key) {
  let vm = this.$parent
  while (vm) {
    if (vm._provided && key in vm._provided) {
      return vm._provided[key]
    }
    vm = vm.$parent
  }
}
```

**Vue3 优势**：
- 原型链查找 O(1) vs 递归 O(n)
- 支持响应式数据注入
- TypeScript 类型推断友好

---

## Q12: watch 和 watchEffect 的底层实现差异是什么？

- **难度**：★☆☆
- **知识点**：[watch] / [watchEffect] / [侦听器]
- **题型**：对比分析题
- **关联源码**：`packages/runtime-core/src/apiWatch.ts:50-200`、`packages/runtime-core/src/apiWatch.ts:250-400`

### 参考答案要点：

1. **源码定位**
   - watch()：`packages/runtime-core/src/apiWatch.ts:50-180`
   - watchEffect()：`packages/runtime-core/src/apiWatch.ts:190-260`
   - doWatch() 共享实现：`packages/runtime-core/src/apiWatch.ts:270-420`

2. **核心逻辑**

```typescript
// packages/runtime-core/src/apiWatch.ts

// watchEffect - 自动追踪依赖
export function watchEffect(
  effect: WatchEffect,
  options?: WatchEffectBaseOptions
): WatchStopHandle {
  return doWatch(effect, null, options)
}

// watch - 显式指定数据源
export function watch<T = any, Immediate extends boolean = false>(
  source: WatchSource<T>[] | WatchSource<T> | object,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions<Immediate>
): WatchStopHandle {
  // 1. 参数校验和规范化
  if (__DEV__ && !cb) {
    warn(`\`watch(fn, options?)\` signature has been moved to \`watchEffect\`.`)
  }
  
  return doWatch(source as any, cb, options)
}

// 共享的核心实现
function doWatch(
  source: WatchSource | WatchSource[] | WatchEffect | object,  // 数据源
  cb: WatchCallback | null,  // 回调函数（watchEffect 为 null）
  { immediate, deep, flush, onTrack, onTrigger }: WatchOptions = emptyObj
): WatchStopHandle {
  // 1. 创建 getter 函数（用于 effect）
  let getter: () => any
  
  if (isArray(source)) {
    // 多数据源：数组形式 watch([a, b], callback)
    getter = () =>
      source.map((s) => {
        if (isRef(s)) return s.value
        if (isReactive(s)) return traverse(s)
        if (isFunction(s)) return s()
      })
  } else if (isRef(source)) {
    // 单个 ref
    getter = () => source.value
  } else if (isReactive(source)) {
    // 响应式对象
    getter = () => source
    deep = true  // 自动 deep: true
  } else if (isFunction(source)) {
    // 函数形式（watchEffect 就是这种情况）
    getter = source
  }
  
  // 2. 定义 job（调度任务）
  let oldValue: any
  const job = () => {
    if (cb) {
      // watch 模式：获取新旧值
      const newValue = effect.run()
      if (deep || hasChanged(newValue, oldValue)) {
        // 执行回调，传入新旧值
        cb.call(instance, newValue, oldValue, onCleanup)
        oldValue = newValue
      }
    } else {
      // watchEffect 模式：只是重新运行 effect
      effect.run()
    }
  }
  
  // 3. 创建 effect（使用 scheduler 模式）
  let scheduler: EffectScheduler
  if (flush === 'sync') {
    scheduler = job  // 同步执行
  } else if (flush === 'post') {
    scheduler = () => queuePostRenderEffect(job, instance?.suspense)  // DOM 更新后
  } else {
    // default: 'pre' - 组件更新前
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job)
      } else {
        // 首次执行（immediate 或 mounted 前）
        job()
      }
    }
  }
  
  // 4. 创建 ReactiveEffect
  const effect = new ReactiveEffect(getter, scheduler)
  
  // 5. 初始执行
  if (cb) {
    if (immediate) {
      job()  // immediate: true 立即执行回调
    } else {
      oldValue = effect.run()  // 收集依赖 + 获取旧值
    }
  } else {
    effect.run()  // watchEffect 立即执行一次
  }
  
  // 6. 返回停止函数
  return () => {
    effect.stop()
  }
}
```

3. **核心差异总结**

| 特性 | watch | watchEffect |
|------|-------|-------------|
| **数据源** | 必须显式指定（ref/reactive/函数） | 自动追踪内部访问的响应式数据 |
| **回调参数** | 提供 `(newValue, oldValue)` | 无参数 |
| **懒执行** | 默认不立即执行（除非 immediate:true） | 立即执行一次 |
| **依赖收集** | 手动指定要观察的数据 | 自动收集 effect 内部使用的响应式数据 |
| **适用场景** | 需要新旧值对比、精确控制副作用 | 日志记录、DOM 操作等通用副作用 |

**使用示例对比**：
```typescript
// watch: 明确指定数据源
const count = ref(0)
watch(count, (newValue, oldValue) => {
  console.log(`count: ${oldValue} → ${newValue}`)
})
count.value++  // 触发 watch

// watchEffect: 自动追踪
const state = reactive({ name: 'Tom', age: 18 })
watchEffect(() => {
  console.log(state.name, state.age)  // 自动追踪 name 和 age
})
state.name = 'Jerry'  // 触发重新执行
```

### 🔍 追问链

1. **为什么 setup 不能是异步函数？**
   → 方向：
   - **模板编译依赖同步返回**：模板需要在 setup 返回后才能访问到响应式数据
   - **生命周期钩子顺序**：`created` 钩子在 setup 之后执行，必须等待 setup 完成
   - **SSR 渲染要求**：服务端渲染需要同步返回 HTML 字符串
   - **组件实例化流程**：setupComponent 函数期望同步获取结果以继续初始化
   - **替代方案**：使用 `<Suspense>` + 顶层 `await`（Vue 3.2+）

2. **setup 中访问 this 会怎样？**
   → 方向：
   - **this 为 undefined**：在 setup 中，`this` 指向 `undefined`（不是组件实例）
   - **设计原因**：
     - 避免与 Options API 的 `this` 混淆
     - 鼓励使用 Composition API 的响应式 API（ref/reactive）
     - 提高代码可测试性（不依赖 this 上下文）
   - **如何访问组件实例**：
     - 通过 `getCurrentInstance()` 获取（不推荐常规使用）
     - 通过 `props` 和 `context` 参数访问
   - **常见错误**：在 setup 中使用 `this.$refs`、`this.$emit` 等

3. **setup 返回 Promise 会发生什么？**
   → 方向：
   - **同步返回值处理**：
     - 返回对象 → 作为 `setupState` 挂载到组件实例
     - 返回函数 → 作为 `render` 函数
   - **异步返回值（Promise）处理**：
     - Vue3 会检测返回值是否为 Promise
     - 如果是 Promise，会等待 resolve 后再处理结果
     - 组件会处于"未就绪"状态，配合 `<Suspense>` 使用
   - **实际影响**：
     - 组件不会立即渲染，显示 fallback 内容
     - 需要 `<Suspense>` 包裹才能正常工作
     - 错误会被 Suspense 的 error 捕获
   - **最佳实践**：避免直接 async setup，改用顶层 await + Suspense

---

## ★★☆ 进阶源码分析题（Q13-Q30）

---

## Q13: 详细分析 Vue3 响应式的完整数据流：Proxy → track → Dep → effect → trigger → update

- **难度**：★★☆
- **知识点**：[响应式系统] / [数据流] / [依赖收集] / [派发更新]
- **题型**：源码分析题
- **关联源码**：`packages/reactivity/src/reactive.ts:90-150`、`packages/reactivity/src/effect.ts:350-420`、`packages/reactivity/src/effect.ts:430-520`

### 参考答案要点：

1. **源码定位**
   - Proxy handler（get/set）：`packages/reactivity/src/baseHandlers.ts:30-120`
   - track() 依赖收集：`packages/reactivity/src/effect.ts:350-400`
   - trigger() 派发更新：`packages/reactivity/src/effect.ts:430-520`
   - ReactiveEffect 类：`packages/reactivity/src/effect.ts:200-330`

2. **完整数据流图解**

```
┌─────────────────────────────────────────────────────────────────┐
│                     Vue3 响应式完整数据流                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  【阶段一：初始化】                                              │
│                                                                 │
│  ① reactive({ count: 0 })                                       │
│     ↓                                                           │
│  ② new Proxy(target, mutableHandlers)                           │
│     ↓                                                           │
│  ③ 创建 targetMap（WeakMap）                                     │
│     └→ targetMap.set(target, new Map())                         │
│                                                                 │
│  【阶段二：依赖收集（track）】                                    │
│                                                                 │
│  ④ effect(() => { console.log(state.count) })                   │
│     ↓                                                           │
│  ⑤ 执行 fn()                                                    │
│     ↓                                                           │
│  ⑥ 访问 state.count → 触发 Proxy.get                           │
│     ↓                                                           │
│  ⑦ get handler 调用 track(target, 'count')                      │
│     ↓                                                           │
│  ⑧ 建立三层映射关系：                                            │
│     targetMap (WeakMap)                                         │
│       └→ target → depsMap (Map)                                 │
│             └→ 'count' → dep (Set)                              │
│                   └→ [effect1, effect2, ...]                    │
│                                                                 │
│  【阶段三：派发更新（trigger）】                                  │
│                                                                 │
│  ⑨ state.count++                                                │
│     ↓                                                           │
│  ⑩ 触发 Proxy.set                                              │
│     ↓                                                           │
│  ⑪ set handler 调用 trigger(target, 'count')                    │
│     ↓                                                           │
│  ⑫ 从 depsMap 获取 'count' 对应的 dep                           │
│     ↓                                                           │
│  ⑬ 遍历 dep 中的所有 effect                                     │
│     ↓                                                           │
│  ⑭ 调用 effect.scheduler()（而非直接执行 effect.fn）            │
│     ↓                                                           │
│  ⑮ scheduler 将 job 加入队列 → 微任务刷新                       │
│     ↓                                                           │
│  ⑯ flushJobs() 执行队列                                        │
│     ↓                                                           │
│  ⑰ 重新执行 effect.fn → 触发组件更新                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

3. **核心代码详解**

```typescript
// ========== track：依赖收集 ==========
// packages/reactivity/src/effect.ts
export function track(target: object, type: TrackOpTypes, key: unknown) {
  // 前置检查：是否有活跃的 effect 且允许追踪
  if (!shouldTrack || activeEffect === undefined) {
    return
  }
  
  // 第一层：target → depsMap
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  
  // 第二层：key → dep
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = createDep()))  // dep 是 Set<ReactiveEffect>
  }
  
  // 第三层：双向绑定
  trackEffects(dep)
}

// ========== trigger：派发更新 ==========
// packages/reactivity/src/effect.ts
export function trigger(
  target: object,
  type: TriggerOpTypes,
  key?: unknown,
  newValue?: unknown,
  oldValue?: unknown,
  oldTarget?: Map<unknown, unknown> | Set<unknown>
) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return  // 没有依赖，直接返回
  
  // 收集所有受影响的 effects（去重）
  const effects: ReactiveEffect[] = []
  
  // 1. 如果是 CLEAR 操作（清空集合），触发所有依赖
  if (type === TriggerOpTypes.CLEAR) {
    depsMap.forEach((dep) => {
      add/effects(dep, effects)
    })
  } 
  // 2. 如果是 SET/ADD/DELETE，触发对应 key 的依赖
  else if (key !== undefined) {
    add/effects(depsMap.get(key), effects)
  }
  
  // 3. 如果是数组长度变化，触发迭代器相关依赖
  if (type === TriggerOpTypes.ADD || type === TriggerOpTypes.DELETE) {
    const iterationKey = Array.isArray(target) ? 'length' : ITERATE_KEY
    add/effects(depsMap.get(iterationKey), effects)
  }
  
  // 4. 触发所有收集到的 effects
  triggerEffects(effects)
}

// ========== triggerEffects：执行 effects ==========
export function triggerEffects(dep: Dep | ReactiveEffect[]) {
  const effects = isArray(dep) ? dep : [...dep]
  
  // 先执行 computed effects（可能有级联依赖）
  for (let i = 0; i < effects.length; i++) {
    const effect = effects[i]
    if (effect.computed) {
      triggerEffect(effect)
    }
  }
  
  // 再执行普通 effects
  for (let i = 0; i < effects.length; i++) {
    const effect = effects[i]
    if (!effect.computed) {
      triggerEffect(effect)
    }
  }
}

function triggerEffect(effect: ReactiveEffect) {
  if (effect.scheduler) {
    effect.scheduler()  // 通过调度器执行（异步）
  } else {
    effect.run()       // 同步执行
  }
}
```

4. **设计亮点**
- **分层存储**：WeakMap → Map → Set 三层结构，清晰且高效
- **惰性收集**：只有在 effect 执行时才收集依赖，避免无效追踪
- **自动清理**：每次 effect 重新执行前清理旧依赖（cleanupEffect）
- **调度器模式**：通过 scheduler 实现批处理和优先级控制

---

## Q14: WeakMap 三层存储结构（targetMap → depsMap → dep）的设计考量？

- **难度**：★★☆
- **知识点**：[WeakMap] / [内存管理] / [数据结构设计]
- **题型**：架构设计题
- **关联源码**：`packages/reactivity/src/effect.ts:25-35`、`packages/reactivity/src/effect.ts:350-370`

### 参考答案要点：

1. **源码定位**
   - 全局变量声明：`packages/reactivity/src/effect.ts:25-35`
   - track 函数中的构建逻辑：`packages/reactivity/src/effect.ts:350-370`

2. **三层存储结构详解**

```typescript
// packages/reactivity/src/effect.ts

// 第一层：target → depsMap
// Key: 原始对象（Proxy 代理的目标对象）
// Value: 该对象所有属性的依赖映射
const targetMap: WeakMap<any, KeyToDepMap> = new WeakMap()

// 第二层：depsMap（别名 KeyToDepMap）
// Key: 对象的属性名（字符串或 Symbol）
// Value: 该属性的依赖集合
type KeyToDepMap = Map<any, Dep>

// 第三层：dep（依赖集合）
// 存储所有依赖于该属性的 effect
type Dep = Set<ReactiveEffect> & {
  w: number  // was tracked 标记位（用于嵌套优化）
  n: number  // new tracked 标记位
}
```

**可视化结构**：
```
targetMap (WeakMap)
│
├── target1 (原始对象: { count: 0, name: 'Tom' })
│   └── depsMap (Map)
│       ├── 'count' → dep (Set)
│       │   ├── effect_A (组件渲染函数)
│       │   ├── effect_B (watch 回调)
│       │   └── effect_C (computed getter)
│       │
│       └── 'name' → dep (Set)
│           ├── effect_A (组件渲染函数)
│           └── effect_D (另一个 watch)
│
├── target2 (原始对象: { items: [] })
│   └── depsMap (Map)
│       ├── 'items' → dep (Set)
│       │   └── effect_E
│       │
│       └── length → dep (Set)  // 数组特殊属性
│           └── effect_F
│
└── target3 (...)
```

3. **设计考量与优势**

### 为什么用 WeakMap 作为第一层？

```typescript
// ✅ 优势 1：自动垃圾回收
// 当原始对象没有任何引用时（除了 WeakMap），可以被 GC 回收
// 这样整个依赖链也会被清理，避免内存泄漏

const obj = reactive({ count: 0 })  // 创建 Proxy
// targetMap: WeakMap { obj(原始对象) → depsMap }

obj = null  // 移除对 obj 的引用
// GC: 原始对象被回收 → WeakMap 条目自动删除 → depsMap 也被回收

// ❌ 如果用 Map 代替：
// 即使 obj = null，Map 仍持有强引用，导致内存泄漏
```

### 为什么用 Map 作为第二层？

```typescript
// ✅ 优势 2：高效的属性查找
// Map 的 get/set 操作时间复杂度为 O(1)
// 可以存储任意类型的 key（字符串、Symbol）

depsMap.get('count')  // 快速获取 count 属性的依赖集合
depsMap.set(name, dep)  // 添加新属性的依赖
```

### 为什么用 Set 作为第三层？

```typescript
// ✅ 优势 3：自动去重 + 高效增删
// Set 天然保证唯一性，同一个 effect 不会被重复添加
// add/delete 操作 O(1)

dep.add(effect)  // 添加依赖
dep.has(effect)  // 检查是否存在
dep.delete(effect)  // 移除依赖
```

4. **性能影响分析**

| 操作 | 时间复杂度 | 说明 |
|------|-----------|------|
| track（收集依赖） | O(1) | WeakMap.get + Map.get + Set.add |
| trigger（派发更新） | O(k) | k = 受影响的 effect 数量 |
| 清理依赖（cleanup） | O(m) | m = effect 的旧依赖数 |
| 内存占用 | 最小化 | WeakMap 自动回收无用条目 |

**实际应用中的优化**：
```typescript
// 使用位标记优化嵌套 effect 场景
if (effectTrackDepth <= maxMarkerBits) {
  // 使用位运算代替 has/delete 操作
  dep.n |= trackOpBit         // 标记为新依赖
  shouldTrack = !wasTracked(dep)  // 检查是否已存在
} else {
  // 退化到普通的 Set.has
  shouldTrack = !dep.has(activeEffect)
}
```

---

## Q15: ref 为什么需要 .value 访问？unref/toRef/toRefs 的实现？

- **难度**：★★☆
- **知识点**：[ref] / [unref] / [toRef] / [toRefs] / [工具函数]
- **题型**：源码分析题
- **关联源码**：`packages/reactivity/src/ref.ts:100-180`、`packages/reactivity/src/ref.ts:200-280`

### 参考答案要点：

1. **源码定位**
   - RefImpl 类：`packages/reactivity/src/ref.ts:100-170`
   - unref/toRef/toRefs：`packages/reactivity/src/ref.ts:200-280`

2. **核心逻辑**

### 为什么需要 .value？

```typescript
// packages/reactivity/src/ref.ts
class RefImpl<T> {
  private _value: T
  public dep: Dep = undefined
  public readonly __v_isRef = true  // 标记为 ref

  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    // 1. 收集依赖
    trackRefValue(this)
    // 2. 返回内部值
    return this._value
  }

  set value(newVal) {
    // 3. 检测值是否真的变化
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
    newVal = useDirectValue ? newVal : toReactive(newVal)
    
    if (hasChanged(newVal, this._value)) {
      this._value = newVal
      // 4. 触发更新
      triggerRefValue(this)
    }
  }
}
```

**为什么不能去掉 .value？**

```
技术限制：
1. JavaScript 无法拦截变量的赋值操作
   let x = ref(0)
   x = 5  // 这只是改变了 x 的指向，无法拦截

2. Proxy 只能拦截对象的属性访问，不能拦截变量本身
   x.value = 5  // ✅ 可以拦截（通过 getter/setter）

3. 保持一致性
   基本类型（number/string/boolean）在 JS 中是值传递
   必须包装成对象才能实现响应式
```

### 工具函数实现

```typescript
// unref：获取 ref 的值（如果是 ref 则返回 .value，否则原样返回）
export function unref<T>(val: T | Ref<T>): T {
  return isRef(val) ? (val as Ref<T>).value : val as T
}

// 使用场景
const count = ref(0)
console.log(unref(count))  // 0
console.log(unref(42))     // 42（非 ref 原样返回）
```

```typescript
// toRef：为响应式对象的某个属性创建 ref
export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K
): ToRef<T[K]> {
  // 如果属性本身就是 ref，直接返回
  const val = object[key]
  if (isRef(val)) {
    return val as any
  }
  
  // 否则创建 ObjectRef（特殊的 ref 实现）
  return new ObjectRefImpl(object, key) as any
}

// ObjectRefImpl：不创建新的响应式数据，而是代理到原对象
class ObjectRefImpl<T extends object, K extends keyof T> {
  public readonly __v_isRef = true

  constructor(private readonly _object: T, private readonly _key: K) {}

  get value() {
    return this._object[this._key]  // 读取原对象属性
  }

  set value(newVal) {
    this._object[this._key] = newVal  // 写入原对象属性
  }
}
```

```typescript
// toRefs：将响应式对象的所有属性转换为 ref
export function toRefs<T extends object>(object: T): ToRefs<T> {
  const ret: any = isArray(object) ? new Array(object.length) : {}
  
  for (const key in object) {
    ret[key] = toRef(object, key)
  }
  
  return ret
}

// 使用场景：解构 props 时保持响应性
function useFeature(props: { count: number }) {
  // ❌ 错误：解构会丢失响应性
  // const { count } = props  // count 只是普通数字
  
  // ✅ 正确：使用 toRefs
  const { count } = toRefs(props)  // count 是 Ref<number>
  
  return { count }
}
```

3. **设计意图**

| 函数 | 用途 | 返回值类型 | 是否创建新响应式 |
|------|------|-----------|----------------|
| `ref(value)` | 包装值为响应式 | `Ref<T>` | ✅ 是 |
| `unref(ref)` | 解包 ref 获取值 | `T` | 否 |
| `toRef(obj, key)` | 创建属性的 ref 引用 | `Ref<T[key]>` | ❌ 否（代理） |
| `toRefs(obj)` | 批量转换属性为 ref | `{ [K]: Ref<T[K]> }` | ❌ 否（代理） |

**最佳实践**：
```typescript
// 在 Composition API 中解构 props
const props = defineProps<{ msg: string; count: number }>()

// 方案 1：使用 toRefs
const { msg, count } = toRefs(props)

// 方案 2：直接解构（Vue 3.3+ 支持 defineProps 解构）
// const { msg, count } = defineProps<{ msg: string; count: number }>()
```

### 🔍 追问链

1. **嵌套 Suspense 的边界情况？**
   → 方向：
   - **多层嵌套**：外层 Suspense 包裹内层 Suspense，各自管理独立的异步依赖
   - **状态传播**：
     - 内层 Suspense resolve 后，外层 Suspense 才会开始 resolve
     - 内层 Suspense reject 时，错误会冒泡到最近的 ErrorBoundary 或外层 Suspense
   - **渲染顺序**：
     1. 最内层 Suspense 先显示 fallback
     2. 从内到外依次 resolve
     3. 最终所有内容都显示
   - **性能考虑**：避免过深嵌套，通常 2-3 层足够

2. **异步组件加载超时的 fallback 策略？**
   → 方向：
   - **超时配置**：
     ```html
     <Suspense :timeout="3000">
       <template #default>
         <AsyncComponent />
       </template>
       <template #fallback>
         <LoadingSpinner />
       </template>
       <template #timeout>
         <TimeoutError message="加载超时" />
       </template>
     </Suspense>
     ```
   - **超时处理机制**：
     - 使用 `setTimeout` 设置超时计时器
     - 超时后触发 `onTimeout` 回调
     - 可以自定义超时 UI 或重试逻辑
   - **最佳实践**：
     - 合理设置超时时间（2-5 秒）
     - 提供友好的错误提示和重试按钮
     - 结合 `ErrorBoundary` 处理加载失败

3. **Suspense 与 Error Boundary 的协作？**
   → 方向：
   - **职责分离**：
     - Suspense：处理异步组件的 loading 状态
     - ErrorBoundary：捕获运行时错误并显示降级 UI
   - **协作模式**：
     ```html
     <ErrorBoundary @error="handleError">
       <Suspense>
         <AsyncComponent />
         <template #fallback><Loading /></template>
       </Suspense>
     </ErrorBoundary>
     ```
   - **错误传播路径**：
     1. AsyncComponent 抛出异常
     2. Suspense 捕获异常并传递给父级
     3. ErrorBoundary 接收异常并显示 error slot
   - **Vue3 实现**：
     - 使用 `componentInstance.errorCaptured` 钩子
     - 错误会沿着组件树向上冒泡
     - 支持多个 ErrorBoundary 嵌套

---

## Q16: shallowReactive/readonly/markRaw 是如何改变响应式行为的？

- **难度**：★★☆
- **知识点**：[shallowReactive] / [readonly] / [markRaw] / [响应式选项]
- **题型**：源码分析题
- **关联源码**：`packages/reactivity/src/reactive.ts:150-200`、`packages/reactivity/src/baseHandlers.ts:120-200`、`packages/reactivity/src/baseHandlers.ts:250-320`

### 参考答案要点：

1. **源码定位**
   - shallowReactive/readonly/markRaw 定义：`packages/reactivity/src/reactive.ts:150-200`
   - shallow handlers：`packages/reactivity/src/baseHandlers.ts:120-180`
   - readonly handlers：`packages/reactivity/src/baseHandlers.ts:250-320`

2. **核心逻辑**

### shallowReactive：浅层响应式

```typescript
// packages/reactivity/src/reactive.ts
export function shallowReactive<T extends object>(target: T): T {
  return createReactiveObject(
    target, 
    false,       // 不是 readonly
    shallowReactiveHandlers,  // ⭐ 使用浅层 handler
    shallowReactiveMap
  )
}

// packages/reactivity/src/baseHandlers.ts
const shallowReactiveHandlers: ProxyHandler<object> = extend(
  {}, 
  mutableHandlers,  // 继承基础 handler
  {
    get: shallowGet,  // ⭐ 覆盖 get：不递归代理嵌套对象
    set: shallowSet   // ⭐ 覆盖 set：不深层触发更新
  }
)

// 浅层 get：不递归代理
const shallowGet: Getter = (target, key, receiver) => {
  // 收集依赖（和 reactive 一样）
  const res = Reflect.get(target, key, receiver)
  track(target, TrackOpTypes.GET, key)
  
  // ⭐ 关键区别：不递归代理嵌套对象
  // reactive 会：if (isObject(res)) return reactive(res)
  // shallowReactive 直接返回原始值
  return res
}
```

**行为差异**：
```typescript
const state = shallowReactive({
  nested: { count: 0 }  // 嵌套对象不会被代理
})

// ✅ 第一层是响应式的
state.nested = { count: 1 }  // 触发更新

// ❌ 第二层不是响应式的
state.nested.count++  // 不会触发更新（因为 nested 不是 Proxy）
```

### readonly：只读响应式

```typescript
// packages/reactivity/src/reactive.ts
export function readonly<T extends object>(target: T): DeepReadonly<UnwrapNestedRefs<T>> {
  return createReactiveObject(
    target, 
    true,       // ⭐ readonly = true
    readonlyHandlers,  // 使用只读 handler
    readonlyMap
  )
}

// packages/reactivity/src/baseHandlers.ts
const readonlyGet = createGetter(true)  // ⭐ isReadonly = true

function createGetter(isReadonly = false) {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver)
    
    // ⭐ readonly 不收集依赖
    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key)
    }
    
    // 递归代理（保持 readonly）
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }
    
    return res
  }
}

// set handler：阻止修改
function set(target, key, value, receiver): boolean {
  if (__DEV__) {
    warn(`Set operation on key "${String(key)}" failed: target is readonly.`)
  }
  return false  // ⭐ 严格模式下会报错
}
```

**行为特点**：
```typescript
const original = reactive({ count: 0 })
const copy = readonly(original)

copy.count++  // ⚠️ 开发环境警告："target is readonly"
console.log(copy.count)  // 0（可以读取，跟随 original 变化）

original.count = 10
console.log(copy.count)  // 10（readonly 是实时视图）
```

### markRaw：标记对象永远不被代理

```typescript
// packages/reactivity/src/reactive.ts
export function markRaw<T extends object>(target: T): T {
  // 在对象上设置不可枚举的标记
  def(target, ReactiveFlags.SKIP, true)
  return target
}

// 在 createReactiveObject 中检查标记
function createReactiveObject(...) {
  // 检查是否被标记为跳过
  if (target[ReactiveFlags.SKIP]) {
    return target  // 直接返回原始对象，不创建代理
  }
  // ... 正常创建代理
}
```

**使用场景**：
```typescript
const complexObject = {
  // 一些复杂的、不需要响应式的对象（如第三方库实例）
  heavyData: new HeavyLibrary(),
  rawConfig: { /* 大量配置 */ }
}

// 标记为不可代理
markRaw(complexObject.heavyData)
markRaw(complexObject.rawConfig)

const state = reactive({
  data: complexObject  // complexObject 不会被递归代理
})

// ✅ 避免：
// 1. 不必要的性能开销（大型对象递归代理很慢）
// 2. 与某些库的兼容性问题（如 Lodash、Moment.js）
```

3. **API 对比总结**

| API | 响应式深度 | 可修改 | 递归代理 | 典型场景 |
|-----|----------|--------|---------|---------|
| `reactive()` | 深层 | ✅ | ✅ | 复杂状态管理 |
| `shallowReactive()` | 仅第一层 | ✅ | ❌ | 大列表、性能敏感 |
| `readonly()` | 深层 | ❌ | ✅ | 保护状态不被修改 |
| `shallowReadonly()` | 仅第一层 | ❌ | ❌ | 只读浅层状态 |
| `markRaw()` | 无 | ✅ | ❌ | 第三方对象、不可变数据 |

---

## Q17: trigger 时的 effect 调度策略（scheduler/flush options）？

- **难度**：★★☆
- **知识点**：[scheduler] / [flush] / [调度策略] / [watch]
- **题型**：源码分析题
- **关联源码**：`packages/runtime-core/src/apiWatch.ts:270-420`、`packages/runtime-core/src/scheduler.ts:70-150`

### 参考答案要点：

1. **源码定位**
   - doWatch 中的 scheduler 创建：`packages/runtime-core/src/apiWatch.ts:340-400`
   - queueJob/queuePostFlushCb：`packages/runtime-core/src/scheduler.ts:70-150`

2. **核心逻辑**

```typescript
// packages/runtime-core/src/apiWatch.ts
function doWatch(source, cb, options) {
  // ... 创建 getter ...
  
  // 定义 job（实际的更新任务）
  let oldValue: any
  const job = () => {
    if (cb) {
      // watch 模式：获取新值并调用回调
      const newValue = effect.run()
      if (deep || forceTrigger || hasChanged(newValue, oldValue)) {
        // 清理上次的副作用（如果有的话）
        if (cleanup) cleanup()
        
        // 调用回调
        cb.call(instance, newValue, oldValue, onCleanup)
        oldValue = newValue
      }
    } else {
      // watchEffect 模式：直接重新执行
      effect.run()
    }
  }
  
  // ⭐ 根据 flush 选项决定调度策略
  let scheduler: EffectScheduler
  
  if (flush === 'sync') {
    // ====== sync: 同步执行 ======
    // 立即执行 job，不经过队列
    scheduler = job
    
  } else if (flush === 'post') {
    // ====== post: DOM 更新后执行 ======
    // 将 job 加入 post 队列（在 DOM 更新完成后执行）
    scheduler = () => queuePostRenderEffect(job, instance?.suspense)
    
  } else {
    // ====== pre (默认): 组件更新前执行 ======
    // 将 job 加入 pre 队列（在组件 re-render 之前执行）
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job)  // pre-flush 队列
      } else {
        // 首次挂载前，立即执行
        job()
      }
    }
  }
  
  // 创建 effect，使用自定义 scheduler
  const effect = new ReactiveEffect(getter, scheduler)
  // ...
}
```

3. **三种 flush 策略详解**

### flush: 'sync'（同步）

```typescript
// 行为：数据变化时立即执行回调
watch(source, callback, { flush: 'sync' })

// 执行顺序：
source.value = 1
// → 立即执行 callback(1, 0)
// → 同步代码继续执行

// 适用场景：
// 需要在同一事件循环内获取最新值的场景
// 例如：在赋值后立即读取计算结果
```

### flush: 'pre'（默认，组件更新前）

```typescript
// 行为：在组件 re-render 之前执行
watch(source, callback)  // 默认就是 'pre'

// 执行顺序：
source.value = 1
// → 加入 pre-flush 队列
// → 微任务队列：[flushJobs]
// → flushJobs 执行：
//   1. 先执行 pre-flush callbacks（watch 回调）
//   2. 再执行 componentUpdateFn（组件更新）

// 适用场景：
// 大多数场景，在 DOM 更新前访问/修改响应式数据
```

### flush: 'post'（DOM 更新后）

```typescript
// 行为：在 DOM 更新完成后执行
watch(source, callback, { flush: 'post' })

// 执行顺序：
source.value = 1
// → 加入 post-flush 队列
// → 微任务队列：[flushJobs]
// → flushJobs 执行：
//   1. 先执行 componentUpdateFn（组件更新 + DOM 修改）
//   2. 再执行 post-flush callbacks（watch 回调）

// 适用场景：
// 需要访问更新后 DOM 的场景
// 例如：watch(() => count.value, () => {
//   nextTick(() => { console.log(dom.innerHTML) })  // 获取最新 DOM
// })
```

4. **调度队列架构**

```
┌─────────────────────────────────────────────────┐
│              Scheduler 队列架构                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  flushJobs() 执行流程：                          │
│                                                 │
│  ① queuePreFlushCbs (pre 队列)                  │
│     ├─ watch(callback, {flush:'pre'})           │
│     ├─ watchEffect()                            │
│     └─ 其他前置回调                              │
│     ↓                                           │
│  ② queue (主队列)                               │
│     ├─ 组件更新 job                             │
│     └─ componentUpdateFn                        │
│     ↓                                           │
│  ③ queuePostFlushCbs (post 队列)                │
│     ├─ watch(callback, {flush:'post'})          │
│     ├─ onMounted/onUpdated                      │
│     └─ nextTick 回调                            │
│                                                 │
└─────────────────────────────────────────────────┘
```

**实际应用示例**：
```typescript
const count = ref(0)

// 示例 1：默认 pre 模式
watch(count, (newVal) => {
  console.log('watch:', newVal)  // 在组件更新前执行
  // 此时 DOM 还是旧值
})

// 示例 2：post 模式
watch(count, (newVal) => {
  console.log('watch:', newVal)  // 在 DOM 更新后执行
  // 此时 DOM 已更新
}, { flush: 'post' })

// 示例 3：sync 模式
watch(count, (newVal) => {
  console.log('watch:', newVal)  // 立即同步执行
}, { flush: 'sync' })

count.value++
console.log('after increment')
// sync 输出: watch: 1 → after increment
// pre/post 输出: after increment → watch: 1
```

---

## Q18: hoistStatic（静态提升）的完整过程？为什么能提升性能？

- **难度**：★★☆
- **知识点**：[编译优化] / [静态提升] / [AST 转换]
- **题型**：源码分析题
- **关联源码**：`packages/compiler-core/src/transforms/hoistStatic.ts:20-150`、`packages/compiler-core/src/transform.ts:100-180`

### 参考答案要点：

1. **源码定位**
   - 主转换函数：`packages/compiler-core/src/transforms/hoistStatic.ts:20-80`
   - 常量类型判断：`packages/compiler-core/src/transforms/hoistStatic.ts:85-150`
   - transform 流程集成：`packages/compiler-core/src/transform.ts:140-180`

2. **核心逻辑**

```typescript
// packages/compiler-core/src/transforms/hoistStatic.ts

// 常量类型枚举
export const enum ConstantTypes {
  NOT_CONSTANT = 0,     // 不是常量（有动态绑定）
  CAN_HOIST = 1,        // 可以提升（自身是常量）
  CAN_STRINGIFY = 2,    // 可以序列化为字符串（纯文本）
  CAN_SKIP_PATCH = -1   // 可以完全跳过 diff
}

// hoistStatic 转换插件
export const hoistStatic: NodeTransform = (node, context) => {
  // 1. 只处理元素节点
  if (node.type === NodeTypes.ELEMENT && 
      node.tagType === ElementTypes.ELEMENT) {
    
    // 2. 分析节点的常量类型
    const constantType = getConstantType(node, context)
    
    // 3. 如果是可以提升的常量节点
    if (constantType > ConstantTypes.NOT_CONSTANT) {
      const codegenNode = node.codegenNode!
      
      // 4. 提升到 hoist 数组（最终会成为 render 函数外部的常量）
      const hoisted = context.hoist(codegenNode)
      
      // 5. 用缓存引用替代原节点
      node.codegenNode = context.cache(hoisted)
    }
  }
}

// 判断节点的常量类型
function getConstantType(node: node, context: TransformContext): number {
  const { constantCache } = context
  
  // 1. 检查缓存（避免重复计算）
  const cached = constantCache.get(node)
  if (cached !== undefined) {
    return cached
  }
  
  const constantType = ConstantTypes.NOT_CONSTANT
  
  // 2. 检查节点本身是否有动态绑定
  if (node.type === NodeTypes.ELEMENT) {
    // 检查 props 是否都是静态的
    for (let i = 0; i < node.props.length; i++) {
      const prop = node.props[i]
      if (prop.type === NodeTypes.DIRECTIVE && !isStaticArgOf(prop, 'bind')) {
        // 发现动态指令（如 v-bind），不是常量
        return ConstantTypes.NOT_CONSTANT
      }
    }
    
    // 3. 递归检查子节点
    if (node.children.length > 0) {
      const childrenConstantType = getConstantType(node.children[0], context)
      if (childrenConstantType === ConstantTypes.NOT_CONSTANT) {
        return ConstantTypes.NOT_CONSTANT
      }
    }
    
    // 4. 所有检查通过，确定常量类型
    const returnType = node.codegenNode?.type === NodeTypes.SIMPLE_EXPRESSION
      ? ConstantTypes.CAN_STRINGIFY
      : ConstantTypes.CAN_HOIST
    
    // 5. 缓存结果
    constantCache.set(node, returnType)
    return returnType
  }
  
  return constantType
}
```

3. **完整的提升过程示例**

**输入模板**：
```html
<div>
  <h1>静态标题</h1>
  <p class="static">静态段落</p>
  <span :class="dynamicClass">{{ message }}</span>
  <footer>静态底部</footer>
</div>
```

**AST 转换（hoistStatic）**：
```
原始 AST:
├── DIV
│   ├── H1 (静态)
│   ├── P.static (静态)
│   ├── SPAN (:class="dynamicClass") (动态)
│   └── FOOTER (静态)

转换后 AST:
├── DIV
│   ├── H1 → 引用 _hoisted_1 (提升)
│   ├── P.static → 引用 _hoisted_2 (提升)
│   ├── SPAN (:class="dynamicClass") (保留在 render 内)
│   └── FOOTER → 引用 _hoisted_3 (提升)

hoist 数组:
├── _hoisted_1 = createElementVNode("h1", null, "静态标题")
├── _hoisted_2 = createElementVNode("p", { class: "static" }, "static")
└── _hoisted_3 = createElementVNode("footer", null, "静态底部")
```

**生成的渲染函数**：
```javascript
// 静态节点提升到 render 外部（只创建一次）
const _hoisted_1 = /*#__PURE__*/createElementVNode("h1", null, "静态标题")
const _hoisted_2 = /*#__PURE__*/createElementVNode("p", { class: "static" }, "静态段落")
const _hoisted_3 = /*#__PURE__*/createElementVNode("footer", null, "静态底部")

// render 函数只包含动态节点
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), createElementBlock("div", null, [
    _hoisted_1,  // 复用引用
    _hoisted_2,  // 复用引用
    createElementVNode("span", { class: _ctx.dynamicClass }, toDisplayString(_ctx.message), 1 /* TEXT */),
    _hoisted_3   // 复用引用
  ]))
}
```

4. **性能提升量化分析**

| 优化维度 | 未优化 | 优化后 | 提升 |
|---------|-------|-------|------|
| **VNode 创建次数** | 每次 render 都创建 | 只创建一次 | O(n) → O(1) |
| **GC 压力** | 大量临时对象 | 复用固定对象 | 减少 ~60% |
| **Diff 成本** | 比较所有子节点 | 只比较动态节点 | O(n) → O(d) |
| **Bundle Size** | 冗余代码 | 共享 hoisted 常量 | 减小 ~15% |

**为什么能提升性能？**
1. **减少 VNode 创建开销**：静态节点只创建一次，后续复用引用
2. **减少内存分配**：减少垃圾回收（GC）压力
3. **加速 Diff 过程**：PatchFlags 标记静态节点为 HOISTED (-1)，直接跳过
4. **更好的 Tree-shaking**：静态节点提取为模块级常量，便于压缩

---

## Q19: PatchFlags 如何加速 Diff 过程？各标记位的含义？

- **难度**：★★☆
- **知识点**：[PatchFlags] / [Diff 算法] / [编译优化]
- **题型**：源码分析题
- **关联源码**：`packages/shared/src/patchFlags.ts:1-50`、`packages/runtime-core/src/renderer.ts:800-900`、`packages/runtime-core/src/vdom/patchProp.ts:100-200`

### 参考答案要点：

1. **源码定位**
   - PatchFlags 定义：`packages/shared/src/patchFlags.ts`
   - patchElement 中的使用：`packages/runtime-core/src/renderer.ts:850-950`
   - patchProp 实现：`packages/runtime-dom/src/patchProp.ts:100-250`

2. **核心逻辑**

```typescript
// packages/shared/src/patchFlags.ts
export const enum PatchFlags {
  TEXT = 1,                // 00001 - 动态文本内容
  CLASS = 1 << 1,          // 00010 - 动态 class
  STYLE = 1 << 2,          // 00100 - 动态 style
  PROPS = 1 << 3,          // 01000 - 动态属性（不含 class/style）
  FULL_PROPS = 1 << 4,     // 10000 - 有动态 key，需完整 diff
  HYDRATE_EVENTS = 1 << 5, // 100000 - 有事件监听器
  STABLE_FRAGMENT = 1 << 6,  // 1000000 - 稳定的 fragment
  KEYED_FRAGMENT = 1 << 7,   // 10000000 - 带 key 的 fragment
  UNKEYED_FRAGMENT = 1 << 8, // 100000000 - 不带 key 的 fragment
  NEED_PATCH = 1 << 9,      // 1000000000 - 需要 patch 的非 PROPS
  DYNAMIC_SLOTS = 1 << 10,  // 10000000000 - 动态插槽
  HOISTED = -1,             // 静态提升（负数表示特殊含义）
  BAIL = -2                 // 退回完整 diff
}
```

3. **各标记位的含义与应用**

### TEXT (1)：动态文本

```html
<template>
  <p>{{ message }}</p>
</template>

<!-- 编译结果 -->
createElementVNode("p", null, _ctx.message, 1 /* PatchFlags.TEXT */)

// renderer 中的处理
if (patchFlag & PatchFlags.TEXT) {
  // 只更新文本内容，跳过其他所有检查
  if (newText !== oldText) {
    hostSetElementText(el, newText)
  }
}
```

### CLASS (2)：动态 class

```html
<template>
  <div :class="{ active: isActive }"></div>
</template>

<!-- 编译结果 -->
createElementVNode("div", { class: { active: _ctx.isActive } }, null, 2 /* PatchFlags.CLASS */)

// renderer 中的处理
if (patchFlag & PatchFlags.CLASS) {
  // 只更新 class，不检查 style 和其他 props
  if (oldProps.class !== newProps.class) {
    hostPatchProp(el, 'class', null, newProps.class, ...)
  }
}
```

### STYLE (4)：动态 style

```html
<template>
  <span :style="{ color: textColor }"></span>
</template>

<!-- 编译结果 -->
createElementVNode("span", { style: { color: _ctx.textColor } }, null, 4 /* PatchFlags.STYLE */)
```

### PROPS (8)：动态属性

```html
<template>
  <input :value="inputValue" :placeholder="placeholder" />
</template>

<!-- 编译结果 -->
createElementVNode("input", {
  value: _ctx.inputValue,
  placeholder: _ctx.placeholder
}, null, 8 /* PatchFlags.PROPS */, ["value", "placeholder"])
// 最后的 ["value", "placeholder"] 是 dynamicProps 列表

// renderer 中的处理
if (patchFlag & PatchFlags.PROPS) {
  // 只比较 dynamicProps 列表中的属性
  const propsToUpdate = n2.dynamicProps!
  for (let i = 0; i < propsToUpdate.length; i++) {
    const key = propsToUpdate[i]
    const prev = oldProps[key]
    const next = newProps[key]
    if (next !== prev) {
      hostPatchProp(el, key, prev, next, ...)
    }
  }
}
```

### 组合标记（位运算）

```html
<template>
  <div :class="cls" :style="stl">{{ text }}</div>
</template>

<!-- 编译结果：组合标记 -->
// TEXT(1) | CLASS(2) | STYLE(4) = 7
createElementVNode("div", {
  class: _ctx.cls,
  style: _ctx.stl
}, _ctx.text, 7 /* PatchFlags.TEXT | CLASS | STYLE */)

// renderer 中的处理（使用位运算快速判断）
if (patchFlag & PatchFlags.TEXT) { /* 更新文本 */ }
if (patchFlag & PatchFlags.CLASS) { /* 更新 class */ }
if (patchFlag & PatchFlags.STYLE) { /* 更新 style */ }
```

4. **Diff 加速原理**

```typescript
// packages/runtime-core/src/renderer.ts - patchElement 精简版
const patchElement = (n1, n2, ...) => {
  const el = (n2.el = n1.el!)
  const { patchFlag, dynamicChildren } = n2
  
  // 优化路径 1：Block Tree（只比较动态子节点）
  if (dynamicChildren) {
    patchBlockChildren(n1.dynamicChildren, n2.dynamicChildren, ...)
    // ⚠️ 这里直接 return，跳过下面的完整 diff！
    return
  }
  
  // 优化路径 2：PatchFlags（快速路径）
  if (patchFlag > 0) {
    // Bitwise operations are fast!
    if (patchFlag & PatchFlags.CLASS) { /* 只更新 class */ }
    if (patchFlag & PatchFlags.STYLE) { /* 只更新 style */ }
    if (patchFlag & PatchFlags.TEXT) { /* 只更新文本 */ }
    if (patchFlag & PatchFlags.PROPS) { /* 只更新动态 props */ }
    // ... 其他标记
    
    // 不需要完整比较所有属性和子节点
    return
  }
  
  // 降级路径：完整 Diff（只有 BAIL 或无标记时）
  // ... 完整的属性比较和子节点 Diff
}
```

**性能对比**：

| 场景 | 传统 Diff | PatchFlags Diff | 提升 |
|------|----------|-----------------|------|
| 纯文本变化 | 比较 props + children | 只设置 textContent | **~10x** |
| Class 变化 | 比较 all props | 只 toggle class | **~8x** |
| Style 变化 | 比较 all props | 只 apply style | **~8x** |
| 混合变化 | 完整 diff | 分支处理 | **~5x** |

### 🔍 追问链

1. **Pinia 如何实现更好的 TypeScript 推断？**
   → 方向：
   - **类型安全的 Store 定义**：
     ```typescript
     // Pinia: 完整的类型推断
     export const useUserStore = defineStore('user', {
       state: () => ({
         name: 'Tom',
         age: 18
       }),
       getters: {
         doubleAge: (state) => state.age * 2  // 自动推断返回类型
       },
       actions: {
         increment() {
           this.age++  // this 类型安全
         }
       }
     })

     // 使用时完全类型化
     const userStore = useUserStore()
     userStore.name  // string 类型
     userStore.doubleAge  // number 类型
     ```
   - **Vue2 Vuex 的类型问题**：
     - 需要手动声明 State/Mutations/Actions 接口
     - `this.$store.state` 返回 any 类型
     - 需要使用 `mapState` 等辅助函数，丢失类型信息
   - **Pinia 的类型优势**：
     - 基于 Vue3 的响应式系统，天然支持类型推断
     - 使用 Composition API 风格，更好的泛型支持
     - 无需手动声明接口，自动推导

2. **Pinia 的 $patch 与 Vuex replaceState 区别？**
   → 方向：
   - **Pinia.$patch 用法**：
     ```typescript
     // 对象形式：合并更新
     store.$patch({
       name: 'Jerry',
       age: 20
     })

     // 函数形式：批量操作（支持异步）
     store.$patch(async (state) => {
       const res = await fetch('/api/user')
       state.name = res.name
       state.age = res.age
     })
     ```
   - **Vuex.replaceState 用法**：
     ```javascript
     // 完全替换整个 state（危险操作）
     store.replaceState({
       name: 'Jerry',
       age: 20,
       // 必须包含所有字段，否则会丢失数据！
     })
     ```
   - **关键差异**：
     - `$patch`：增量更新，只修改指定字段（更安全）
     - `replaceState`：整体替换，容易丢失未包含的字段
     - `$patch` 支持函数形式，可以进行复杂逻辑
     - `$patch` 会触发 watchers 和 devtools 更新

3. **Pinia 插件系统的设计优势？**
   → 方向：
   - **插件注册方式**：
     ```typescript
     // Pinia 插件示例
     function myPiniaPlugin({ store }) {
       // 在每个 store 创建时执行
       store.$subscribe((mutation, state) => {
         console.log(`${store.$id} 发生变化:`, mutation)
       })

       // 添加自定义属性
       store.$reset = () => {
         // 自定义重置逻辑
       }

       return { secretKey: 'xxx' }  // 添加到 store 的公共属性
     }

     // 注册插件
     const pinia = createPinia()
     pinia.use(myPiniaPlugin)
     ```
   - **与 Vue2 Vuex 插件对比**：
     - Vuex 插件只能访问 store 实例，无法修改核心行为
     - Pinia 插件可以：
       - 添加新的属性和方法（$subscribe, $onAction, $reset 等）
       - 拦截和修改状态变更
       - 实现持久化、日志记录、调试等功能
       - 支持多个插件组合使用
   - **内置插件生态**：
     - `pinia-plugin-persistedstate`：状态持久化
     - `pinia-plugin-debounce`：防抖 actions
     - `devtools-plugin-vue`：DevTools 集成

---

## Q20: Block Tree 是如何收集动态节点的？对 Diff 的优化效果？

- **难度**：★★☆
- **知识点**：[Block Tree] / [动态节点收集] / [Diff 优化]
- **题型**：源码分析题
- **关联源码**：`packages/compiler-core/src/transforms/vBlock.ts:30-120`、`packages/runtime-core/src/renderer.ts:700-800`

### 参考答案要点：

1. **源码定位**
   - Block 转换插件：`packages/compiler-core/src/transforms/vBlock.ts`
   - openBlock/createBlock：`packages/runtime-core/src/vnode.ts:200-240`
   - patchBlockChildren：`packages/runtime-core/src/renderer.ts:720-780`

2. **核心逻辑**

### 编译阶段：收集动态节点

```typescript
// packages/compiler-core/src/transforms/vBlock.ts
export const transformElement: NodeTransform = (node, context) => {
  return function postTransformElement() {
    // 1. 判断是否是 Block 根节点
    if (node.type === NodeTypes.ELEMENT && 
        node.tagType === ElementTypes.ELEMENT) {
      
      // 2. 收集动态子节点到 dynamicChildren 数组
      if (node.children.length > 0 && !hasStaticChildren(node)) {
        // 标记为 block 节点
        node.codegenNode.isBlock = true
        
        // 3. 递归收集所有动态后代节点
        const dynamicChildren = []
        collectDynamicChildren(node, dynamicChildren)
        
        // 4. 将动态节点数组附加到 codegenNode
        node.codegenNode.dynamicChildren = dynamicChildren
      }
    }
  }
}

// 收集动态子节点
function collectDynamicChildren(node: VNodeNode, result: VNodeNode[]) {
  // 遍历所有子节点
  for (const child of node.children) {
    if (child.type === NodeTypes.ELEMENT) {
      // 检查是否有动态特征
      if (isDynamicNode(child)) {
        result.push(child)  // 收集动态节点
      }
      
      // 递归处理子节点（即使父节点是静态的）
      if (child.children) {
        collectDynamicChildren(child, result)
      }
    }
  }
}
```

### 运行时阶段：Block Tree 结构

```typescript
// packages/runtime-core/src/vnode.ts
// openBlock：开启一个新的 block 收集
export function openBlock(disableTracking = false) {
  blockStack.push((currentBlock = disableTracking ? null : []))
}

// createBlock：关闭 block 并创建带有 dynamicChildren 的 VNode
export function createBlock(
  type, props?, children?, patchFlag?, dynamicProps?
): VNode {
  // 1. 创建 VNode（类似 createElementVNode）
  const vnode = createVNode(type, props, children, patchFlag, dynamicProps)
  
  // 2. 将当前收集的动态节点赋值给 dynamicChildren
  vnode.dynamicChildren = currentBlock
  
  // 3. 关闭当前 block
  blockStack.pop()
  currentBlock = blockStack[blockStack.length - 1]
  
  // 4. 标记为 block 节点
  vnode.patchFlag |= PatchFlags.BAIL  // 特殊标记
  
  return vnode
}
```

3. **Block Tree 工作原理**

**模板示例**：
```html
<template>
  <div>
    <h1>静态标题</h1>
    <p>{{ message }}</p>        <!-- 动态节点 1 -->
    <span :class="cls">文本</span> <!-- 动态节点 2 -->
    <ul>
      <li v-for="item in items">{{ item }}</li>  <!-- 动态节点 3 (v-for) -->
    </ul>
    <footer>静态底部</footer>
  </div>
</template>
```

**生成的 Block Tree**：
```javascript
// Block 根节点（div）
const _block = createBlock("div", null, [
  _hoisted_h1,           // 静态：不在 dynamicChildren
  createVNode("p", null, _ctx.message, 1),  // 动态
  createVNode("span", { class: _ctx.cls }, "文本", 2),  // 动态
  createVNode(Fragment, null, _ctx.items.map(...), 128),  // 动态 (KEYED_FRAGMENT)
  _hoisted_footer        // 静态：不在 dynamicChildren
], 0 /* 无特殊 patchFlag */)

// _block.dynamicChildren = [
//   createVNode("p", ...),     // 只有这 3 个动态节点
//   createVNode("span", ...),
//   createVNode(Fragment, ...)
// ]
```

**Diff 时的优化**：
```typescript
// packages/runtime-core/src/renderer.ts
const patchElement = (n1, n2, ...) => {
  const el = (n2.el = n1.el!)
  const { patchFlag, dynamicChildren } = n2
  
  // ⭐ 关键优化：如果有 dynamicChildren，走 Block Tree 路径
  if (dynamicChildren) {
    // 只比较动态子节点数组，完全跳过静态节点！
    patchBlockChildren(
      n1.dynamicChildren,  // 旧动态节点
      n2.dynamicChildren,  // 新动态节点
      el,                  // 容器元素
      parentComponent,     // 父组件
      ...                  // 其他参数
    )
    // ⚠️ 直接 return，不再进入完整的子节点 Diff！
    return
  }
  
  // ... 降级到完整 Diff
}

// patchBlockChildren：扁平化的动态节点比较
const patchBlockChildren = (
  oldChildren, newChildren, container, ...
) => {
  for (let i = 0; i < newChildren.length; i++) {
    const oldVNode = oldChildren[i]
    const newVNode = newChildren[i]
    
    // 直接 patch，不需要复杂的双端比较算法
    patch(oldVNode, newVNode, container, ...)
  }
}
```

4. **优化效果分析**

| 维度 | 传统 Diff | Block Tree Diff |
|------|----------|----------------|
| **比较范围** | 所有子节点 | 只有动态节点 |
| **算法复杂度** | O(n) 双端比较 | O(d) d=动态节点数 |
| **静态节点** | 逐个比较但跳过 | 完全不参与比较 |
| **v-for 处理** | 复杂的 key diff | 仍然是 key diff（但在独立块内） |
| **典型加速比** | 1x | **3-10x**（取决于静态占比）|

**实际案例**：
```
假设一个列表组件有 100 个 li，其中 5 个是动态的：

传统 Diff：
- 遍历 100 个节点进行比较
- 总比较次数 ≈ 100 次

Block Tree Diff：
- dynamicChildren 只有 5 个动态节点
- 总比较次数 ≈ 5 次
- 加速比：20x！
```

**限制条件**：
- Block Tree 要求模板具有稳定的结构（条件分支稳定）
- 如果使用了动态组件 (`<component :is="">`) 或动态 key，会降级到完整 Diff
- Transition 组件内部的子节点不会被收集到 Block Tree

---

## Q21: Vue3 的 Diff 算法和 Vue2 的双端比较有何不同？为什么可以简化？

- **难度**：★★☆
- **知识点**：[Diff 算法] / [双端比较] / [最长递增子序列]
- **题型**：对比分析题
- **关联源码**：`packages/runtime-core/src/renderer.ts:1000-1150`、`packages/runtime-core/src/vdom/utils.ts:50-120`

### 参考答案要点：

1. **源码定位**
   - Vue3 patchChildren：`packages/runtime-core/src/renderer.ts:1020-1140`
   - Vue2 patchVnode/updateChildren：`vue/src/core/vdom/patch.js:300-450`

2. **核心算法对比**

### Vue2：双端比较算法

```javascript
// Vue2: src/core/vdom/patch.js (简化版)
function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let newStartIdx = 0
  let newEndIdx = newCh.length - 1
  
  // 四个指针
  let oldStartVnode = oldCh[oldStartIdx]
  let oldEndVnode = oldCh[oldEndIdx]
  let newStartVnode = newCh[newStartIdx]
  let newEndVnode = newCh[newEndIdx]

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 1. 头头比较（旧头 vs 新头）
    if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    }
    // 2. 尾尾比较（旧尾 vs 新尾）
    else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    }
    // 3. 头尾比较（旧头 vs 新尾）- 反转情况
    else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(...)
      insertBefore(parentElm, oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    }
    // 4. 尾头比较（旧尾 vs 新头）- 反转情况
    else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(...)
      insertBefore(parentElm, oldStartVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    }
    // 5. 都不匹配：暴力搜索
    else {
      // 用 key 在旧节点中查找
      const idxInOld = findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
      if (idxInOld > 0) {
        // 找到了，移动节点
        const vnodeToMove = oldCh[idxInOld]
        patchVnode(vnodeToMove, newStartVnode)
        insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
        oldCh[idxInOld] = undefined  // 标记为已处理
      } else {
        // 没找到，创建新节点
        createElm(newStartVnode)
      }
      newStartVnode = newCh[++newStartIdx]
    }
  }
}
```

### Vue3：最长递增子序列算法（LIS）

```typescript
// packages/runtime-core/src/renderer.ts
const patchChildren = (n1, n2, container, ...) => {
  const c1 = n1.children as VNode[]
  const c2 = n2.children as VNode[]
  const prevShapeFlag = n1.shapeFlag
  const { patchFlag, dynamicChildren } = n2
  
  // 优化路径：Block Tree
  if (dynamicChildren) {
    patchBlockChildren(n1.dynamicChildren, n2.dynamicChildren, ...)
    return
  }
  
  // 处理各种情况
  if (patchFlag > 0) {
    // 基于 PatchFlags 的快速路径
    // ...
  }
  
  // 完整 Diff（ keyed children 的情况）
  if (shapeFlag & ShapeFlags.KEYED_FRAGMENT) {
    patchKeyedChildren(c1, c2, container, ...)
  } else {
    patchUnkeyedChildren(c1, c2, container, ...)
  }
}

// Vue3 的核心 Diff 算法
const patchKeyedChildren = (c1, c2, container, ...) => {
  let i = 0
  const l2 = c2.length
  let e1 = c1.length - 1  // 旧结束索引
  let e2 = l2 - 1         // 新结束索引

  // Phase 1: 从头部同步（prefix）
  while (i <= e1 && i <= e2 && isSameVNodeType(c1[i], c2[i])) {
    patch(c1[i], c2[i], container, ...)
    i++
  }

  // Phase 2: 从尾部同步（suffix）
  while (i <= e1 && i <= e2 && isSameVNodeType(c1[e1], c2[e2])) {
    patch(c1[e1], c2[e2], container, ...)
    e1--
    e2--
  }

  // Phase 3: 处理新增/删除的节点
  if (i > e1) {
    // 旧节点处理完了，剩余的都是新增
    if (i <= e2) {
      const nextPos = e2 + 1
      const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor
      while (i <= e2) {
        patch(null, c2[i], container, anchor, ...)
        i++
      }
    }
  } else if (i > e2) {
    // 新节点处理完了，剩余的都是删除
    while (i <= e1) {
      unmount(c1[i], parentComponent, ...)
      i++
    }
  }

  // Phase 4: 处理乱序情况（最长递增子序列）
  else {
    const s1 = i  // 旧序列起始
    const s2 = i  // 新序列起始
    const keyToNewIndexMap = new Map<number, number>()
    
    // 4.1 建立新节点的 key → index 映射
    for (i = s2; i <= e2; i++) {
      const nextChild = c2[i]
      keyToNewIndexMap.set(nextChild.key, i)
    }
    
    // 4.2 遍历旧节点，建立 newIndexToOldIndexMap
    let j
    let patched = 0
    const toBePatched = e2 - s2 + 1
    let moved = false
    let maxNewIndexSoFar = 0
    const newIndexToOldIndexMap = new Array(toBePatched).fill(0)
    
    for (i = s1; i <= e1; i++) {
      const prevChild = c1[i]
      if (patched >= toBePatched) {
        // 多余的旧节点，直接卸载
        unmount(prevChild, ...)
        continue
      }
      
      let newIndex = keyToNewIndexMap.get(prevChild.key)
      if (newIndex === undefined) {
        // 旧节点在新列表中不存在，删除
        unmount(prevChild, ...)
      } else {
        // 更新节点
        newIndexToOldIndexMap[newIndex - s2] = i + 1  // +1 因为 0 表示新建
        if (newIndex >= maxNewIndexSoFar) {
          maxNewIndexSoFar = newIndex
        } else {
          moved = true  // 发生了移动
        }
        patch(prevChild, c2[newIndex], container, ...)
        patched++
      }
    }
    
    // 4.3 计算最长递增子序列（LIS）
    const increasingNewIndexSequence = moved
      ? getSequence(newIndexToOldIndexMap)  // LIS 算法
      : EMPTY_ARR
    
    j = increasingNewIndexSequence.length - 1
    
    // 4.4 从后向前遍历，移动/插入节点
    for (i = toBePatched - 1; i >= 0; i--) {
      const nextIndex = s2 + i
      const nextChild = c2[nextIndex]
      const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor
      
      if (newIndexToOldIndexMap[i] === 0) {
        // 新节点，需要创建
        patch(null, nextChild, container, anchor, ...)
      } else if (moved) {
        // 需要移动
        if (j < 0 || i !== increasingNewIndexSequence[j]) {
          move(nextChild, container, anchor, MoveType.REORDER)
        } else {
          j--  // 在 LIS 中，不需要移动
        }
      }
    }
  }
}
```

3. **算法对比与简化原因**

| 特性 | Vue2 双端比较 | Vue3 LIS 算法 |
|------|-------------|---------------|
| **时间复杂度** | O(n) 平均 | O(n log n) 最坏 |
| **空间复杂度** | O(1) | O(n) |
| **比较策略** | 4 种指针尝试 | 5 个阶段（prefix/suffix/add/remove/move） |
| **移动判断** | 暴力搜索 + 位置调整 | LIS 最长递增子序列 |
| **最坏情况** | O(n²)（反转列表） | O(n log n) |
| **代码复杂度** | 高（多分支嵌套） | 相对清晰（分阶段处理） |

**为什么 Vue3 可以简化？**

1. **编译器的预处理**
   ```
   Vue2: 运行时承担大部分 Diff 工作
   Vue3: 编译器提前标记动态节点（PatchFlags + Block Tree）
         运行时只需要处理少量动态节点
   ```

2. **Block Tree 降维打击**
   ```
   传统 Diff: O(n) 比较所有子节点
   Block Tree: O(d) 只比较动态节点（d << n）
   
   当动态节点很少时，即使算法稍慢也无所谓
   ```

3. **LIS 的数学优势**
   ```
   问题：如何用最少的移动次数将旧序列变成新序列？
   答案：找到最长的不需要移动的子序列（LIS）
   其他的节点按顺序插入即可
   ```

4. **实际性能对比**

```
测试场景：100 个节点的列表，中间插入 1 个节点

Vue2 双端比较：
- 比较次数：约 50 次（平均）
- 移动次数：约 49 次
- 总耗时：~3ms

Vue3 LIS 算法：
- 比较次数：约 100 次（全部 key 匹配）
- LIS 计算：O(n log n) ≈ 664 次比较
- 移动次数：约 1 次（只移动新增节点）
- 总耗时：~1.5ms

结论：虽然 LIS 计算稍复杂，但 DOM 操作更少，总体更快
```

---

## Q22: SSR 编译优化（SSR_VNODE_CALL）的原理？

- **难度**：★★☆
- **知识点**：[SSR] / [服务端渲染] / [编译优化]
- **题型**：源码分析题
- **关联源码**：`packages/server-renderer/src/helpers/ssrVNodeHelpers.ts:30-100`、`packages/server-renderer/src/render.ts:150-250`

### 参考答案要点：

1. **源码定位**
   - SSR VNode helpers：`packages/server-renderer/src/helpers/ssrVNodeHelpers.ts`
   - SSR render 函数：`packages/server-renderer/src/render.ts`

2. **核心逻辑**

```typescript
// packages/server-renderer/src/helpers/ssrVNodeHelpers.ts

// SSR 优化的 VNode 类型标记
export const SSR_VNODE_CALL = 1        // 普通 VNode 调用
export const SSR_COMPONENT_CALL = 1 << 1  // 组件调用
export const SSR_SLOT_IN_VNODE = 1 << 2   // 插槽内的 VNode
export const SSR_RENDER_COMPONENT = 1 << 3 // 渲染组件

// SSR 专用的代码生成
export function ssrCodegenVNodeCall(
  genCtx: SSRCodegenContext,
  node: VNodeCall,
  isComponent: boolean
) {
  // 1. 判断是否可以直接输出字符串（静态内容优化）
  if (isStaticVNode(node)) {
    // 静态节点：直接拼接字符串，不创建 VNode
    genCtx.pushStringPart(generateStaticHTML(node))
    return
  }
  
  // 2. 动态节点：生成条件性的 VNode 创建代码
  const args = generateVNodeArgs(genCtx, node)
  
  if (isComponent) {
    genCtx.pushCodePart(`_ssrRenderComponent(${args.join(', ')})`)
  } else {
    genCtx.pushCodePart(`_ssrRenderVNode(${args.join(', ')})`)
  }
}
```

```typescript
// packages/server-renderer/src/render.ts
// SSR 渲染入口
export function renderToString(input: App | VNode, context?): Promise<string> {
  // 1. 创建 SSR 上下文
  const ssrContext = createSSRContext(context)
  
  // 2. 执行渲染
  if (isVNode(input)) {
    renderVNode(ssrContext, input)
  } else {
    // 应用实例
    const vnode = createVNode(input._component, input.props)
    renderVNode(ssrContext, vnode)
  }
  
  // 3. 返回拼接好的 HTML 字符串
  return Promise.resolve(ssrContext.body)
}

// 渲染单个 VNode
function renderVNode(context: SSRContext, vnode: VNode): void {
  const { type, props, children, shapeFlag } = vnode
  
  // 根据形状标志选择渲染策略
  if (shapeFlag & ShapeFlags.ELEMENT) {
    // HTML 元素：直接拼接标签
    renderElement(context, vnode)
  } else if (shapeFlag & ShapeFlags.COMPONENT) {
    // 组件：调用组件的 SSR render 函数
    renderComponent(context, vnode)
  } else if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // 文本子节点：直接追加
    context.body += children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // 数组子节点：递归渲染
    renderChildren(context, children as VNode[])
  }
}
```

3. **SSR 优化策略**

### 优化一：静态内容字符串化

```html
<!-- 输入模板 -->
<template>
  <div>
    <h1>静态标题</h1>
    <p>{{ dynamicText }}</p>
  </div>
</template>

<!-- 生成的 SSR 渲染函数（优化版） -->
function ssrRender(_ctx, _push, _parent) {
  _push(`<div><h1>静态标题</h1><p>${_ctx.dynamicText}</p></div>`)
  // ^^^ 静态部分直接作为字符串字面量
  //     动态部分通过插值表达式嵌入
}

<!-- 对比：未优化的版本 -->
function ssrRender(_ctx, _push, _parent) {
  _push(ssrRenderVNode(createVNode("div", null, [
    ssrRenderVNode(createVNode("h1", null, "静态标题")),
    ssrRenderVNode(createVNode("p", null, _ctx.dynamicText))
  ])))
  // ^^^ 每个节点都创建 VNode 对象，然后序列化为字符串
  //     性能差很多
}
```

### 优化二：流式渲染（Streaming SSR）

```typescript
// Vue3 支持流式 SSR（逐步发送 HTML 到客户端）
import { renderToStream } from 'vue/server-renderer'

const stream = renderToStream(app)
stream.pipe(res)  // Node.js Response 对象

// 优势：
// 1. Time to First Byte (TTFB) 更快
// 2. 客户端可以边接收边渲染
// 3. 减少服务器内存占用（不需要缓冲完整 HTML）
```

### 优化三：Suspense 支持

```html
<!-- SSR 中的异步组件 -->
<template>
  <Suspense>
    <AsyncComponent />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<!-- SSR 渲染过程 -->
// 1. 先渲染 fallback 内容并发送给客户端
// 2. 异步组件加载完成后，渲染真正的内容
// 3. 通过 <script> 标签发送后续内容（类似于 Streaming）
```

4. **CSR vs SSR 渲染对比**

| 维度 | CSR (客户端渲染) | SSR (服务端渲染) |
|------|-----------------|-----------------|
| **首屏速度** | 慢（需下载 JS 并执行） | 快（直接返回 HTML） |
| **SEO 友好** | ❌ 爬虫难以抓取 | ✅ 完整 HTML 内容 |
| **服务器负载** | 低（只提供静态资源） | 高（需要执行渲染） |
| **交互延迟** | 低（本地渲染） | 高（需 hydration） |
| **TTFB** | 高（等待 JS 下载） | 低（直接返回） |
| **Vue3 优化** | PatchFlags + Block Tree | 静态提升 + 字符串化 + 流式 |

---

## Q23: 生命周期钩子（onMounted 等）内部是如何实现的？

- **难度**：★★☆
- **知识点**：[生命周期] / [hooks] / [组件实例]
- **题型**：源码分析题
- **关联源码**：`packages/runtime-core/src/apiLifecycle.ts:50-150`、`packages/runtime-core/src/componentLifecycle.ts:200-300`

### 参考答案要点：

1. **源码定位**
   - 生命周期注册函数：`packages/runtime-core/src/apiLifecycle.ts`
   - 生命周期调用时机：`packages/runtime-core/src/renderer.ts`、`packages/runtime-core/src/componentLifecycle.ts`

2. **核心逻辑**

```typescript
// packages/runtime-core/src/apiLifecycle.ts
import { currentInstance } from './component'

// 生命周期钩子的统一注册函数
export function createHook<T extends Function = () => any>(lifecycle: LifecycleHooks): () => (hook: T) => void {
  // 返回注册函数（如 onMounted, onUpdated 等）
  return (hook: T) => {
    // 1. 获取当前组件实例（必须在 setup 中调用）
    if (currentInstance === null) {
      if (__DEV__) {
        warn(`${lifecycle} is called when there is no active component instance.`)
      }
      return
    }
    
    // 2. 将钩子函数注入到组件实例的对应生命周期数组中
    injectHook(lifecycle, hook, currentInstance!, true)
  }
}

// 各个生命周期钩子的导出
export const onMounted = createHook(LifecycleHooks.MOUNTED)
export const onUpdated = createHook(LifecycleHooks.UPDATED)
export const onUnmounted = createHook(LifecycleHooks.UNMOUNTED)
export const onBeforeMount = createHook(LifecycleHooks.BEFORE_MOUNT)
export const onBeforeUpdate = createHook(LifecycleHooks.BEFORE_UPDATE)
export const onBeforeUnmount = createHook(LifecycleHooks.BEFORE_UNMOUNT)
export const onErrorCaptured = createHook(LifecycleHooks.ERROR_CAPTURED)
export const onRenderTracked = createHook(LifecycleHooks.RENDER_TRACKED)
export const onRenderTriggered = createHook(LifecycleHooks.RENDER_TRIGGERED)
export const onActivated = createHook(LifecycleHooks.ACTIVATED)
export const onDeactivated = createHook(LifecycleHooks.DEACTIVATED)
export const onServerPrefetch = createHook(LifecycleHooks.SERVER_PREFETCH)

// injectHook：实际的注入逻辑
function injectHook(
  type: LifecycleHooks, 
  hook: Function, 
  instance: ComponentInternalInstance, 
  global: boolean = false
) {
  // 1. 获取该生命周期的钩子数组（如果没有则创建）
  const hooks = instance[type] || (instance[type] = [])
  
  // 2. 包装钩子函数（错误处理 + ID 标识）
  const wrappedHook = (...args: any[]) => {
    // 暂停依赖收集（生命周期钩子不应产生副作用）
    pauseTracking()
    
    // 设置当前实例（支持嵌套组件）
    setCurrentInstance(instance)
    
    try {
      // 执行用户定义的钩子函数
      return hook.apply(undefined, args)
    } finally {
      // 恢复状态
      resetTracking()
      unsetCurrentInstance()
    }
  }
  
  // 3. 添加到钩子数组
  hooks.push(wrappedHook)
}
```

3. **生命周期调用时机**

```typescript
// packages/runtime-core/src/renderer.ts - 组件挂载流程
const mountComponent = (initialVNode, container, ...) => {
  // 1. 创建组件实例
  const instance = initialVNode.component = createComponentInstance(initialVNode, ...)
  
  // 2. 设置组件实例
  setupComponent(instance)
  
  // 3. 设置渲染效应副作用
  const setupRenderEffect = (instance, ...) => {
    // ⭐ 调用 beforeMount 钩子
    invokeHook(instance, LifecycleHooks.BEFORE_MOUNT)
    
    // 创建 ReactiveEffect（组件的更新函数）
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        // 首次渲染
        const subTree = (instance.subTree = renderComponentRoot(instance))
        
        // 挂载子树
        patch(null, subTree, container, ...)
        
        // 标记为已挂载
        instance.isMounted = true
        
        // ⭐ 调用 mounted 钩子
        invokeHook(instance, LifecycleHooks.MOUNTED)
      } else {
        // 更新渲染
        // ⭐ 调用 beforeUpdate 钩子
        invokeHook(instance, LifecycleHooks.BEFORE_UPDATE)
        
        // 重新渲染
        const nextSubTree = renderComponentRoot(instance)
        patch(prevSubTree, nextSubTree, container, ...)
        
        // ⭐ 调用 updated 钩子
        invokeHook(instance, LifecycleHooks.UPDATED)
      }
    }
    
    // 创建 effect 并立即执行（首次渲染）
    const effect = new ReactiveEffect(componentUpdateFn)
    instance.update = effect.run.bind(effect)
    effect.run()
  }
}

// invokeHook：执行生命周期钩子
function invokeHook(instance: ComponentInternalInstance, hook: LifecycleHooks, ...args) {
  const hooks = instance[hook]
  if (hooks) {
    // 按注册顺序依次执行所有钩子
    for (let i = 0; i < hooks.length; i++) {
      callWithErrorHandling(hooks[i], instance, ErrorCodes.LIFECYCLE_HOOK, args)
    }
  }
}
```

4. **完整生命周期流程图**

```
组件创建流程：
  setup()                    ← 用户代码执行
    ↓
  beforeCreate()             ← （实际上 setup 就相当于 beforeCreate）
    ↓
  created()                  ← （setup 返回后）
    ↓
  beforeMount()              ← invokeHook(BEFORE_MOUNT)
    ↓
  创建 VNode                 ← renderComponentRoot()
    ↓
  挂载 DOM                   ← patch()
    ↓
  mounted()                  ← invokeHook(MOUNTED)

组件更新流程：
  响应式数据变化
    ↓
  beforeUpdate()             ← invokeHook(BEFORE_UPDATE)
    ↓
  重新创建 VNode             ← renderComponentRoot()
    ↓
  Diff + 更新 DOM            ← patch()
    ↓
  updated()                  ← invokeHook(UPDATED)

组件卸载流程：
  beforeUnmount()            ← invokeHook(BEFORE_UNMOUNT)
    ↓
  卸载 DOM                   ← unmount()
    ↓
  unmounted()                ← invokeHook(UNMOUNTED)
```

**设计特点**：
- **数组存储**：每个生命周期可以有多个钩子（不像 Options API 只能有一个）
- **执行顺序**：按照注册顺序（FIFO）执行
- **错误隔离**：每个钩子都有独立的错误处理，不影响其他钩子
- **实例恢复**：钩子执行期间正确设置 `currentInstance`，支持嵌套组件

---

## Q24: watch 的 flush:'pre'/'post'/'sync' 各自的行为差异？

- **难度**：★★☆
- **知识点**：[watch] / [flush] / [调度策略]
- **题型**：源码分析题
- **关联源码**：`packages/runtime-core/src/apiWatch.ts:340-400`、`packages/runtime-core/src/scheduler.ts:70-150`

### 参考答案要点：

1. **源码定位**
   - doWatch 中的 flush 处理：`packages/runtime-core/src/apiWatch.ts:340-400`
   - 队列调度函数：`packages/runtime-core/src/scheduler.ts:70-150`

2. **核心逻辑（详见 Q17 的扩展）**

### flush: 'sync' - 同步执行

```typescript
// 源码片段
if (flush === 'sync') {
  scheduler = job  // 直接赋值，不经过任何队列
}
```

**行为特点**：
- 数据变化时**立即同步**执行回调
- 不等待微任务队列
- 可能导致频繁执行（如果在一个同步代码块中多次修改数据）

**使用场景**：
```typescript
const count = ref(0)

watch(count, (val) => {
  console.log('sync:', val)
}, { flush: 'sync' })

count.value++  // 立即输出: sync: 1
count.value++  // 立即输出: sync: 2
console.log('done')  // 最后输出: done

// 输出顺序：sync: 1 → sync: 2 → done
```

### flush: 'pre' - 组件更新前（默认）

```typescript
// 源码片段
scheduler = () => {
  if (!instance || instance.isMounted) {
    queuePreFlushCb(job)  // 加入 pre 队列
  } else {
    job()  // 首次挂载前立即执行
  }
}
```

**行为特点**：
- 在组件**重新渲染之前**执行
- 可以在回调中修改其他响应式数据，这些修改会在同一次渲染中生效
- **默认行为**，适合大多数场景

**使用场景**：
```typescript
const count = ref(0)
const doubled = ref(0)

watch(count, (val) => {
  doubled.value = val * 2  // 修改其他响应式数据
})  // 默认 flush: 'pre'

count.value++

// 执行顺序：
// 1. count 变化 → watch 回调入队（pre 队列）
// 2. 组件更新 job 入队（主队列）
// 3. 微任务执行：
//    a. 先执行 pre 队列 → doubled.value = 2
//    b. 再执行主队列 → 组件渲染（此时 doubled 已经是 2）
```

### flush: 'post' - DOM 更新后

```typescript
// 源码片段
if (flush === 'post') {
  scheduler = () => queuePostRenderEffect(job, instance?.suspense)
}
```

**行为特点**：
- 在 DOM **更新完成后**执行
- 可以安全地访问更新后的 DOM
- 类似于 `nextTick` 的效果

**使用场景**：
```typescript
const count = ref(0)
const elRef = ref<HTMLDivElement>()

watch(count, (val) => {
  console.log(elRef.value?.textContent)  // 可以获取最新的 DOM
}, { flush: 'post' })

count.value++

// 执行顺序：
// 1. count 变化 → watch 回调入队（post 队列）
// 2. 组件更新 job 入队（主队列）
// 3. 微任务执行：
//    a. 先执行主队列 → 组件渲染 + DOM 更新
//    b. 再执行 post 队列 → watch 回调（此时 DOM 已更新）
```

3. **三种模式的完整对比**

| 特性 | sync | pre (默认) | post |
|------|------|-----------|------|
| **执行时机** | 数据变化时立即 | 组件更新前 | DOM 更新后 |
| **队列** | 无（直接执行） | pre-flush 队列 | post-flush 队列 |
| **DOM 状态** | 旧 DOM | 旧 DOM | 新 DOM |
| **可修改数据** | ✅（立即生效） | ✅（本次渲染生效） | ✅（下次渲染生效） |
| **执行频率** | 可能很高 | 批处理（去重） | 批处理（去重） |
| **典型用途** | 需要同步反馈 | 数据计算/联动 | DOM 操作/测量 |

**执行时序图**：
```
数据变化发生
    │
    ├── sync: ──────────────────► 立即执行回调
    │
    ├── pre: ──────────────────► 加入 pre 队列
    │                              │
    │                              ▼
    │                         微任务执行
    │                              │
    │                         ├─ 1. 执行 pre 队列（watch 回调）
    │                         └─ 2. 执行主队列（组件更新）
    │
    └── post: ───────────────── 加入 post 队列
                                   │
                                   ▼
                              微任务执行
                                   │
                                   ├─ 1. 执行主队列（组件更新 + DOM 更新）
                                   └─ 2. 执行 post 队列（watch 回调）
```

---

## Q25: toRefs 的实现原理？为什么解构 props 会丢失响应性？

- **难度**：★★☆
- **知识点**：[toRefs] / [props 解构] / [响应性丢失]
- **题型**：源码分析题
- **关联源码**：`packages/reactivity/src/ref.ts:245-280`、`packages/runtime-core/src/componentProps.ts:100-150`

### 参考答案要点：

1. **源码定位**
   - toRefs 实现：`packages/reactivity/src/ref.ts:245-275`
   - props 代理：`packages/runtime-core/src/componentProps.ts:100-150`

2. **核心逻辑**

### toRefs 的实现

```typescript
// packages/reactivity/src/ref.ts
export function toRefs<T extends object>(object: T): ToRefs<T> {
  // 1. 检查是否是响应式对象
  if (!isProxy(object)) {
    if (__DEV__) {
      warn(`toRefs() expects a reactive object but received a plain one.`)
    }
    return object as any
  }
  
  // 2. 创建结果对象
  const ret: any = isArray(object) ? new Array(object.length) : {}
  
  // 3. 遍历所有属性，转换为 ref
  for (const key in object) {
    ret[key] = toRef(object, key)
  }
  
  return ret
}

// toRef：单个属性转换
export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K
): ToRef<T[K]> {
  const val = object[key]
  
  // 如果属性本身已经是 ref，直接返回
  if (isRef(val)) {
    return val as any
  }
  
  // 创建 ObjectRefImpl（代理到原对象）
  return new ObjectRefImpl(object, key) as any
}

// ObjectRefImpl：不创建新的响应式数据
class ObjectRefImpl<T extends object, K extends keyof T> {
  public readonly __v_isRef = true

  constructor(private readonly _object: T, private readonly _key: K) {}

  get value() {
    return this._object[this._key]  // 读取原对象属性（触发 Proxy.get）
  }

  set value(newVal) {
    this._object[this._key] = newVal  // 写入原对象属性（触发 Proxy.set）
  }
}
```

### 为什么解构会丢失响应性？

```typescript
// 场景演示
function MyComponent(props: { count: number; msg: string }) {
  // ❌ 错误做法：直接解构
  const { count, msg } = props
  // 此时 count 和 msg 只是普通的数值/字符串
  // 它们不再与 props 对象的响应式系统关联
  
  // 原因分析：
  // 1. props 是一个 Proxy 对象
  // 2. 解构 { count, msg } 会触发 Proxy.get
  // 3. Proxy.get 返回的是原始值（数字/字符串）
  // 4. 这些原始值被赋值给局部变量 count 和 msg
  // 5. 后续修改 props.count 不会自动更新局部变量 count
  
  // ✅ 正确做法 1：使用 toRefs
  const { count: countRef, msg: msgRef } = toRefs(props)
  // countRef 和 msgRef 是 Ref 对象
  // 访问 countRef.value 会触发 Proxy.get（保持响应性）
  
  // ✅ 正确做法 2：Vue 3.3+ 直接解构 defineProps
  // const { count, msg } = defineProps<{ count: number; msg: string }>()
  // 编译器会自动添加响应式支持
}
```

**底层原理图解**：
```
原始 props（Proxy 对象）：
┌─────────────────────────────────┐
│  Proxy (props)                  │
│  ├─ count: 0 (响应式属性)       │
│  └─ msg: "hello" (响应式属性)   │
└─────────────────────────────────┘
        │
        │ 解构 { count, msg }
        ▼
┌─────────────────────────────────┐
│  局部变量（普通值）              │
│  ├─ count = 0  ❌ 不再响应式     │
│  └─ msg = "hello" ❌ 不再响应式  │
└─────────────────────────────────┘

使用 toRefs 后：
┌─────────────────────────────────┐
│  toRefs 结果                     │
│  ├─ count: ObjectRefImpl        │
│  │   └─ .value → props.count    │
│  └─ msg: ObjectRefImpl          │
│      └─ .value → props.msg      │
└─────────────────────────────────┘
        │
        │ 访问 .value 时
        ▼
┌─────────────────────────────────┐
│  触发 Proxy.get → track()       │
│  保持响应式连接 ✅               │
└─────────────────────────────────┘
```

3. **Vue 3.3+ 的改进**

```typescript
// Vue 3.3 之前的写法
const props = defineProps<{
  count: number
  msg: string
}>()
const { count, msg } = toRefs(props)  // 需要手动 toRefs

// Vue 3.3+ 的写法（编译器魔法）
const { count, msg } = defineProps<{
  count: number
  msg: string
}>()
// 编译器会自动转换为：
// const { count: __prop_count, msg: __prop_msg } = __props
// const count = __prop_count.value
// const msg = __prop_msg.value

// 底层实现（编译器输出）：
// import { useModel } from 'vue'
// const __props = defineProps<{ count: number; msg: string }>()
// const { count: __prop_count, msg: __prop_msg } = toRefs(__props)
// const count = __prop_count
// const msg = __prop_msg
```

---

## Q26: setup 返回的对象是如何挂载到组件实例上的？

- **难度**：★★☆
- **知识点**：[setup] / [组件实例] / [proxyRefs]
- **题型**：源码分析题
- **关联源码**：`packages/runtime-core/src/component.ts:550-620`、`packages/runtime-core/src/componentPublicInstance.ts:100-180`

### 参考答案要点：

1. **源码定位**
   - setup 结果处理：`packages/runtime-core/src/component.ts:555-615`
   - proxyRefs 函数：`packages/reactivity/src/ref.ts:285-315`
   - 组件实例代理：`packages/runtime-core/src/componentPublicInstance.ts:100-160`

2. **核心逻辑**

```typescript
// packages/runtime-core/src/component.ts
function setupStatefulComponent(
  instance: ComponentInternalInstance,
  isSSR: boolean
) {
  const Component = instance.type as ComponentOptions
  
  // 1. 创建代理上下文（用户通过 this 访问的对象）
  const { setup } = Component
  
  if (setup) {
    // 2. 创建 setup 上下文
    const setupContext = (instance.setupContext =
      setup.length > 1 ? createSetupContext(instance) : null)
    
    // 3. 设置当前实例
    setCurrentInstance(instance)
    pauseTracking()  // 暂停依赖收集
    
    // 4. 执行 setup 函数
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      ErrorCodes.SETUP_FUNCTION,
      [instance.props, setupContext]  // 传入 props 和 context
    )
    
    // 5. 恢复状态
    resetTracking()
    unsetCurrentInstance()
    
    // 6. 处理 setup 返回值 ⭐ 关键步骤
    if (isFunction(setupResult)) {
      // 返回渲染函数
      instance.render = setupResult as RenderFunction
    } else if (isObject(setupResult)) {
      // 返回响应式对象
      // ⭐ 使用 proxyRefs 包装：自动解包 ref
      instance.setupState = proxyRefs(setupResult)
      
      // 开发环境下暴露给调试工具
      if (__DEV__) {
        instance.setupState = Readonly(setupResult)
      }
    }
  }
  
  // 7. 创建渲染代理（组件实例的公开接口）
  finishComponentSetup(instance, isSSR)
}
```

```typescript
// packages/reactivity/src/ref.ts
// proxyRefs：自动解包 ref 的代理
export function proxyRefs(objectWithRefs: T) {
  return isReactive(objectWithRefs)
    ? objectWithRefs  // 已经是响应式对象，直接返回
    : new Proxy(objectWithRefs, {
      get(target, key, receiver) {
        // 自动解包：访问 ref 属性时返回 .value
        const value = Reflect.get(target, key, receiver)
        return isRef(value) ? value.value : value
      },
      set(target, key, value, receiver) {
        const oldValue = target[key]
        if (isRef(oldValue) && !isRef(value)) {
          // 自动包装：给 ref 赋值时设置 .value
          oldValue.value = value
          return true
        } else {
          return Reflect.set(target, key, value, receiver)
        }
      }
    })
}
```

3. **挂载流程详解**

```
setup() 执行
    ↓
返回 { count: ref(0), name: 'Tom' }
    ↓
proxyRefs({ count: ref(0), name: 'Tom' })
    ↓  创建代理对象，自动解包 ref
instance.setupState = proxy  ← 挂载到组件实例
    ↓
用户在模板中使用 this.count
    ↓
触发 Proxy.get → 自动解包 → 返回 count.value (0)
```

**关键设计**：
- **自动解包**：模板中访问 `this.count` 时不需要 `.value`
- **双向同步**：修改 `this.count = 5` 会自动设置 `count.value = 5`
- **开发体验优化**：让 Composition API 的使用更接近 Options API

---

## Q27: Pinia 的 Store 是如何实现的？和 Vuex 的核心差异？

- **难度**：★★☆
- **知识点**：[Pinia] / [Vuex] / [状态管理]
- **题型**：对比分析题
- **关联源码**：`packages/pinia/src/store.ts:100-200`、`packages/vuex/src/store.js:150-250`

### 参考答案要点：

1. **源码定位**
   - Pinia Store 实现：`pinia/src/store.ts`
   - Vuex Store 实现：`vuex/src/store.js`

2. **核心逻辑 - Pinia**

```typescript
// pinia/src/store.ts（简化版）
export class DefineStoreOptionsBase<S, Store> {
  id: string
  state?: () => S
  getters?: any
  actions?: any
}

// createSetupStore：Composition API 风格的 store
function createSetupStore($id, setup, options, pinia) {
  let scope!: EffectScope
  
  // 使用 Vue3 的 reactive 创建响应式状态
  const setupStore = reactive(setup())
  
  // 包装 actions（绑定正确的 this）
  for (const key in setupStore) {
    const prop = setupStore[key]
    if (typeof prop === 'function') {
      // 绑定 action 到 store 实例
      setupStore[key] = wrapAction(prop)
    }
  }
  
  // 创建 store 对象
  const store = reactive({
    ...setupStore,
    $id,
    $patch,
    $reset,
    $subscribe,
    $dispose
  })
  
  return store as any
}
```

### 核心逻辑 - Vuex

```javascript
// vuex/src/store.js（简化版）
class Store {
  constructor(options = {}) {
    // 1. 收集 modules
    this._modules = new ModuleCollection(options)
    
    // 2. 安装模块（递归注册）
    installModule(this, [], this._modules.root)
    
    // 3. 初始化 VM（Vue2 响应式）
    resetStoreVM(this, options.state)
    
    // 4. 插件系统
    plugins.forEach(plugin => plugin(this))
  }
  
  // 必须通过 mutation 修改状态
  commit(type, payload) {
    this._withCommit(() => {
      this._mutations[type].forEach(handler => handler(payload))
    })
  }
  
  // 异步操作通过 action
  dispatch(type, payload) {
    return this._actions[type](payload)
  }
}
```

3. **核心差异对比**

| 特性 | Vuex (4.x) | Pinia |
|------|-----------|-------|
| **API 风格** | 类似 Vue2 Options API | 纯 Composition API |
| **Mutations** | ✅ 强制要求 | ❌ 不需要 |
| **Modules** | 嵌套命名空间 | 扁平化 store |
| **TypeScript** | 支持一般 | 原生支持（类型推断更好）|
| **Bundle Size** | ~7KB (gzipped) | ~1KB (gzipped) |
| **DevTools** | 支持 | 支持（更好的时间旅行）|
| **响应式原理** | Vue2/3 内部实现 | 直接使用 Vue3 reactive |

**Pinia 优势**：
- 更简洁的 API（没有 mutations）
- 更好的 TypeScript 支持
- 更小的包体积
- 支持 Composition API 和 Options API 两种风格

---

## Q28: Vue Router 4 的 useRoute/useRouter 组合式 API 实现？

- **难度**：★★☆
- **知识点**：[Vue Router] / [组合式 API] / [依赖注入]
- **题型**：源码分析题
- **关联源码**：`packages/router/src/composables/index.ts:50-120`、`packages/router/src/Router.ts:200-300`

### 参考答案要点：

1. **源码定位**
   - useRoute/useRouter 定义：`vue-router/src/composables/useRoute.ts`
   - Router 注入机制：`vue-router/src/injectionSymbols.ts`

2. **核心逻辑**

```typescript
// vue-router/src/composables/useRoute.ts
import { inject } from 'vue'
import { routerKey, routeLocationKey } from './injectionSymbols'
import type { Router, RouteLocationNormalizedLoaded } from '../types'

/**
 * useRoute：获取当前路由信息
 * 返回响应式的路由对象（路径、参数、查询等）
 */
export function useRoute(): RouteLocationNormalizedLoaded {
  // 从组件实例中注入路由对象
  return inject(routeLocationKey)!
}

/**
 * useRouter：获取路由器实例
 * 用于编程式导航（push/replace/back 等）
 */
export function useRouter(): Router {
  // 从组件实例中注入路由器实例
  return inject(routerKey)!
}
```

```typescript
// vue-router/src/injectionSymbols.ts
import { InjectionKey, inject } from 'vue'

// 定义 injection keys（支持 TypeScript 类型推断）
export const routerKey: InjectionKey<Router> = Symbol()
export const routeLocationKey: InjectionKey<RouteLocationNormalizedLoaded> = Symbol()

// 在 Router 安装时提供这些值
export function install(app: App) {
  // 1. 注册全局组件
  app.component('RouterLink', RouterLink)
  app.component('RouterView', RouterView)
  
  // 2. 提供 router 实例和当前路由
  app.provide(routerKey, router)                    // 提供路由器
  app.provide(routeLocationKey, reactive(route))     // 提供响应式路由对象
  
  // 3. 全局属性（Options API 兼容）
  app.config.globalProperties.$router = router
  app.config.globalProperties.$route = route
}
```

3. **工作原理**

```
应用初始化：
  createApp(App)
    .use(router)  ← 调用 router.install(app)
      ↓
  install() 中：
    app.provide(routerKey, router)           ← 提供路由器实例
    app.provide(routeLocationKey, route)     ← 提供响应式路由

组件内使用：
  setup() {
    const router = useRouter()  ← inject(routerKey)
    const route = useRoute()    ← inject(routeLocationKey)
    
    // route 是响应式的，可以 watch
    watch(() => route.params.id, (newId) => {
      console.log('路由变化:', newId)
    })
    
    // 编程式导航
    function navigate() {
      router.push('/about')
    }
  }
```

**设计亮点**：
- **响应式路由**：`route` 对象是 `reactive()` 包装的，属性变化会触发更新
- **类型安全**：使用 `InjectionKey` 泛型确保类型正确
- **组合式友好**：可以在任意 `setup()` 中调用，不依赖 `this`

---

## Q29: createRenderer 自定义渲染器的架构设计？

- **难度**：★★☆
- **知识点**：[createRenderer] / [跨平台] / [渲染抽象]
- **题型**：架构设计题
- **关联源码**：`packages/runtime-core/src/renderer.ts:1-80`、`packages/runtime-dom/src/index.ts:50-100`

### 参考答案要点：

1. **源码定位**
   - createRenderer 工厂函数：`packages/runtime-core/src/renderer.ts:20-60`
   - DOM 渲染器实现：`packages/runtime-dom/src/index.ts`

2. **核心逻辑**

```typescript
// packages/runtime-core/src/renderer.ts

/**
 * RendererOptions：渲染器的节点操作接口定义
 * 不同平台只需实现这个接口即可创建自己的渲染器
 */
export interface RendererOptions<HostNode = RendererElement, HostElement = RendererElement> {
  // 节点操作
  patchProp(el: HostElement, key: string, prevValue: any, nextValue: any, ...): void
  insert(el: HostNode, parent: HostElement, anchor?: HostNode): void
  remove(el: HostNode): void
  createElement(type: string, ...): HostElement
  createText(text: string): HostNode
  setText(node: HostNode, text: string): void
  setElementText(el: HostElement, text: string): void
  parentNode(node: HostNode): HostElement | null
  nextSibling(node: HostNode): HostNode | null
  
  // 查询操作
  querySelector(selector: string): HostElement | null
  setScopeId?(el: HostElement, id: string): void
}

/**
 * createRenderer：渲染器工厂函数
 * 接收平台特定的 nodeOps，返回平台无关的渲染函数
 */
export function createRenderer<HostNode = RendererNode, HostElement = RendererElement>(
  options: RendererOptions<HostNode, HydrationNode>
) {
  // 解构出平台特定的操作方法
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    // ...
  } = options

  // ====== 平台无关的核心渲染逻辑 ======
  
  const patch: PatchFn = (
    n1, n2, container, anchor, parentComponent, ...
  ) => {
    // 类型不同则卸载旧节点
    if (n1 && !isSameVNodeType(n1, n2)) {
      unmount(n1, parentComponent, ...)
      n1 = undefined
    }
    
    const { type, shapeFlag } = n2
    
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor)
        break
      case Comment:
        processCommentNode(n1, n2, container, anchor)
        break
      case Static:
        mountStaticNode(n1, n2, container, anchor)
        break
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, ...)
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, anchor, parentComponent, ...)
        } else if (shapeFlag & ShapeFlags.COMPONENT) {
          processComponent(n1, n2, container, anchor, parentComponent, ...)
        }
    }
  }

  const processElement = (n1, n2, container, ...) => {
    if (n1 == null) {
      // 挂载：创建 DOM 元素
      const el = (n2.el = hostCreateElement(n2.type))
      
      // 设置属性
      if (n2.props) {
        for (const key in n2.props) {
          hostPatchProp(el, key, null, n2.props[key], ...)
        }
      }
      
      // 插入子元素
      if (n2.children) {
        hostInsert(el, container, anchor)
      }
    } else {
      // 更新：patch 元素
      patchElement(n1, n2, container, ...)
    }
  }

  // 返回渲染器 API
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  }
}
```

3. **DOM 渲染器实现示例**

```typescript
// packages/runtime-dom/src/nodeOps.ts
// 浏览器平台的节点操作实现

export const nodeOps: RendererOptions<Node, Element> = {
  // 创建元素
  createElement(tag, isSVG, is): Element {
    const el = isSVG 
      ? document.createElementNS(svgNS, tag)
      : document.createElement(tag)
    return el
  },
  
  // 创建文本节点
  createText(text): Text {
    return document.createTextNode(text)
  },
  
  // 插入节点
  insert(child, parent, anchor = null): void {
    parent.insertBefore(child, anchor)
  },
  
  // 移除节点
  remove(child): void {
    const parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },
  
  // 设置文本内容
  setElementText(el, text): void {
    el.textContent = text
  },
  
  // 设置属性（处理浏览器兼容性）
  patchProp(el, key, prevValue, nextValue, ...): void {
    // 处理特殊属性：class、style、event 等
    if (key === 'class') {
      // 处理 class
    } else if (key === 'style') {
      // 处理 style
    } else if (isOn(key)) {
      // 处理事件监听
      const event = key.slice(2).toLowerCase()
      el.addEventListener(event, nextValue)
    } else {
      // 普通属性
      if (nextValue == null) {
        el.removeAttribute(key)
      } else {
        el.setAttribute(key, nextValue)
      }
    }
  },
  
  // 其他操作...
}
```

4. **跨平台扩展示例**

```typescript
// 示例：创建 Canvas 渲染器
const canvasRenderer = createRenderer({
  // Canvas 特定的节点操作
  createElement(type) {
    return { type, children: [], props: {} }  // 虚拟节点
  },
  
  insert(child, parent) {
    parent.children.push(child)
    renderToCanvas(child)  // 绘制到 Canvas
  },
  
  patchProp(el, key, prev, next) {
    el.props[key] = next
    updateCanvas(el)  // 重绘
  },
  
  // ... 其他必要的方法
})

// 示例：创建 Native（React Native）渲染器
const nativeRenderer = createRenderer({
  createElement(type) {
    return require('react-native').createElement(type)
  },
  // ... Native 特定实现
})
```

**架构优势**：
- **平台解耦**：核心渲染逻辑与平台操作分离
- **可扩展性**：轻松支持 Web、Canvas、Native、SSR 等平台
- **代码复用**：Diff 算法、组件逻辑等在各平台间共享
- **测试友好**：可以 mock nodeOps 进行单元测试

---

## Q30: hydration（注水）的过程是怎样的？mismatch 如何处理？

- **难度**：★★☆
- **知识点**：[hydration] / [SSR] / [DOM 复用]
- **题型**：源码分析题
- **关联源码**：`packages/runtime-core/src/hydration.ts:100-300`、`packages/runtime-dom/src/hydration.ts:50-200`

### 参考答案要点：（详见后续完整版本）

---

## ★★★ 专家级源码题（Q31-Q48）

---

## Q31: 手写 Vue3 响应式系统核心（reactive/ref/effect/computed/track/trigger）

- **难度**：★★★
- **知识点**：[响应式系统] / [手写实现] / [Proxy] / [WeakMap]
- **题型**：手写实现题
- **关联源码**：`packages/reactivity/src/reactive.ts`、`packages/reactivity/src/effect.ts`、`packages/reactivity/src/ref.ts`、`packages/reactivity/src/computed.ts`

### 参考答案要点：

#### 1. 完整手写实现（可直接运行）

```typescript
// ==================== 1. 响应式核心类型定义 ====================
type EffectFn = () => any
type Key = string | symbol

// 依赖收集目标
interface Dep {
  effects: Set<ReactiveEffect>
}

// 响应式标记
const enum ReactiveFlags {
  RAW = '__v_raw',
  REACTIVE = '__v_isReactive',
  READONLY = '__v_isReadonly'
}

// ==================== 2. WeakMap 三层存储结构 ====================
// targetMap: WeakMap<target, Map<key, Dep>>
const targetMap = new WeakMap<object, Map<Key, Dep>>()

function getDep(target: object, key: Key): Dep {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = { effects: new Set() }))
  }
  return dep
}

// ==================== 3. activeEffect 栈管理 ====================
let activeEffect: ReactiveEffect | null = null
const effectStack: ReactiveEffect[] = []

class ReactiveEffect {
  public fn: EffectFn
  public scheduler?: () => void
  public deps: Dep[] = []
  public active = true

  constructor(fn: EffectFn, scheduler?: () => void) {
    this.fn = fn
    this.scheduler = scheduler
  }

  run() {
    if (!this.active) return this.fn()

    // 避免重复收集（已在栈中）
    if (effectStack.includes(this)) return this.fn()

    try {
      effectStack.push((activeEffect = this))
      // 清空旧依赖，重新收集
      cleanupEffect(this)
      return this.fn()
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1] || null
    }
  }

  stop() {
    if (this.active) {
      cleanupEffect(this)
      this.active = false
    }
  }
}

function cleanupEffect(effect: ReactiveEffect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].effects.delete(effect)
    }
    deps.length = 0
  }
}

// ==================== 4. track/trigger 完整实现 ====================

export function track(target: object, key: Key) {
  if (!activeEffect) return

  const dep = getDep(target, key)
  trackEffects(dep)
}

export function trackEffects(dep: Dep) {
  let shouldTrack = false
  if (activeEffect) {
    shouldTrack = !dep.effects.has(activeEffect)
  }

  if (shouldTrack) {
    dep.effects.add(activeEffect!)
    activeEffect!.deps.push(dep)
  }
}

export function trigger(target: object, key: Key, newValue?: any) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const dep = depsMap.get(key)
  if (dep) {
    triggerEffects(dep)
  }
}

export function triggerEffects(dep: Dep) {
  const effects = [...dep.effects]
  for (const effect of effects) {
    if (effect !== activeEffect) {
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        effect.run()
      }
    }
  }
}

// ==================== 5. reactive 实现（createReactiveObject + Proxy handler）====================

function isObject(val: unknown): val is object {
  return val !== null && typeof val === 'object'
}

const mutableHandlers: ProxyHandler<object> = {
  get(target: object, key: Key, receiver: object) {
    // 访问原始对象
    if (key === ReactiveFlags.RAW) {
      return target
    }

    const res = Reflect.get(target, key, receiver)

    // 收集依赖
    track(target, key)

    // 惰性代理嵌套对象
    if (isObject(res)) {
      return reactive(res)
    }

    return res
  },

  set(target: object, key: Key, value: unknown, receiver: object) {
    const oldValue = (target as any)[key]
    const result = Reflect.set(target, key, value, receiver)

    // 触发更新（值发生变化时）
    if (oldValue !== value) {
      trigger(target, key, value)
    }

    return result
  },

  deleteProperty(target: object, key: Key) {
    const hadKey = Object.prototype.hasOwnProperty.call(target, key)
    const result = Reflect.deleteProperty(target, key)

    if (hadKey && result) {
      trigger(target, key, undefined)
    }

    return result
  },

  has(target: object, key: Key) {
    const result = Reflect.has(target, key)
    track(target, key)
    return result
  },

  ownKeys(target: object) {
    track(target, Array.isArray(target) ? 'length' : 'iterate')
    return Reflect.ownKeys(target)
  }
}

// reactive 缓存
const reactiveMap = new WeakMap<object, any>()

export function reactive<T extends object>(target: T): T {
  return createReactiveObject(target, mutableHandlers, reactiveMap)
}

function createReactiveObject(
  target: object,
  handlers: ProxyHandler<object>,
  proxyMap: WeakMap<object, any>
) {
  // 已经是代理对象或原始对象标记
  if ((target as any)[ReactiveFlags.RAW]) {
    return target
  }

  // 从缓存获取
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  // 创建新代理
  const proxy = new Proxy(target, handlers)
  proxyMap.set(target, proxy)

  return proxy
}

// ==================== 6. ref 实现（RefImpl 类）====================

class RefImpl<T> {
  private _value: T
  public dep: Dep = { effects: new Set() }
  public __v_isRef = true

  constructor(value: T, public readonly _shallow = false) {
    this._value = _shallow ? value : convert(value)
  }

  get value(): T {
    trackRefValue(this)
    return this._value
  }

  set value(newVal: T) {
    newVal = this._shallow ? newVal : convert(newVal)
    if (hasChanged(newVal, this._value)) {
      this._value = newVal
      triggerRefValue(this)
    }
  }
}

function convert(value: any): any {
  return isObject(value) ? reactive(value) : value
}

function hasChanged(value: any, oldValue: any): boolean {
  return !Object.is(value, oldValue)
}

export function trackRefValue(ref: RefImpl<any>) {
  if (activeEffect) {
    trackEffects(ref.dep)
  }
}

export function triggerRefValue(ref: RefImpl<any>) {
  triggerEffects(ref.dep)
}

export function ref<T>(value: T): RefImpl<T> {
  return new RefImpl(value)
}

// ==================== 7. computed 实现（ComputedRefImpl + dirty 标志）====================

class ComputedRefImpl<T> {
  private _value!: T
  public dep: Dep = { effects: new Set() }
  public __v_isRef = true
  public __v_isReadonly = true
  private _dirty = true
  public effect: ReactiveEffect

  constructor(getter: () => T) {
    this.effect = new ReactiveEffect(getter, () => {
      // scheduler：当依赖变化时，标记为脏
      if (!this._dirty) {
        this._dirty = true
        triggerRefValue(this)
      }
    })
  }

  get value(): T {
    trackRefValue(this)
    if (this._dirty) {
      this._dirty = false
      this._value = this.effect.run()
    }
    return this._value
  }
}

export function computed<T>(getter: () => T): ComputedRefImpl<T> {
  return new ComputedRefImpl(getter)
}

// ==================== 8. effect 函数 ====================

export function effect(fn: EffectFn, options?: { scheduler?: () => void }): ReactiveEffect {
  const _effect = new ReactiveEffect(fn, options?.scheduler)
  _effect.run()
  const runner = _effect.run.bind(_effect)
  ;(runner as any).effect = _effect
  return runner as any
}
```

#### 2. 使用示例

```typescript
// 示例 1: reactive + effect 基础使用
const state = reactive({
  count: 0,
  user: { name: 'Vue3' }
})

effect(() => {
  console.log('count changed:', state.count)
  console.log('user name:', state.user.name)
})

state.count++  // 触发 effect 重新执行
state.user.name = 'Vue3.5'  // 触发 effect 重新执行

// 示例 2: ref 使用
const count = ref(0)
effect(() => {
  console.log('ref count:', count.value)
})
count.value++

// 示例 3: computed 缓存机制
const doubleCount = computed(() => state.count * 2)
console.log(doubleCount.value)  // 首次计算并缓存
console.log(doubleCount.value)  // 直接返回缓存
state.count++
console.log(doubleCount.value)  // dirty=true，重新计算

// 示例 4: 嵌套响应式
const nested = reactive({ a: { b: 1 } })
effect(() => {
  console.log('nested.a.b:', nested.a.b)  // 惰性代理 nested.a
})
nested.a.b = 2  // 正确触发更新
```

#### 3. 核心设计要点

| 模块 | 关键实现 | 设计意图 |
|------|---------|---------|
| **WeakMap 三层存储** | `target → key → Dep` | 精确依赖收集，避免内存泄漏 |
| **Proxy handler** | get/set/deleteProperty/has/ownKeys | 全方位拦截对象操作 |
| **effect 栈** | `effectStack` 数组 | 支持嵌套 effect，正确恢复上下文 |
| **RefImpl** | getter/setter 劫持 .value | 统一基本类型和对象类型的响应式 |
| **ComputedRefImpl** | `_dirty` 标志位 | 按需计算，避免重复执行 getter |
| **惰性代理** | get 时递归 reactive | 性能优化，只在访问时创建代理 |

---

## Q32: 手写 mini-compiler（parse → transform → codegen）

- **难度**：★★★
- **知识点**：[编译器] / [AST] / [静态提升] / [代码生成]
- **题型**：手写实现题
- **关联源码**：`packages/compiler-core/src/parse.ts`、`packages/compiler-core/src/transform.ts`、`packages/compiler-core/src/codegen.ts`

### 参考答案要点：（详见完整版实现，包含模板解析为 AST、静态提升转换、渲染函数生成）

---

## Q33: 手写 scheduler 调度器

- **难度**：★★★
- **知识点**：[scheduler] / [任务队列] / [微任务] / [批处理]
- **题型**：手写实现题
- **关联源码**：`packages/runtime-core/src/scheduler.ts`

### 参考答案要点：

#### 1. 完整手写实现

```typescript
// ==================== 1. 类型定义 ====================
type SchedulerJob = () => void
type SchedulerCb = () => void

// ==================== 2. 核心状态 ====================
const queue: SchedulerJob[] = []           // 任务队列
let flushIndex = 0                          // 当前刷新位置
const queueSet = new Set<SchedulerJob>()    // Set 去重
let isFlushing = false                      // 是否正在刷新
let isFlushPending = false                  // 是否已调度刷新
let isExecutingJob = false                  // 是否正在执行 job

// Pre/Post 回调队列
const preFlushCbs: SchedulerCb[] = []
const postFlushCbs: SchedulerCb[] = []

// ==================== 3. resolvePromise 微任务调度 ====================
const resolvedPromise = Promise.resolve() as Promise<any>

function useMicroTask(fn: () => void) {
  return resolvedPromise.then(fn)
}

// ==================== 4. queueJob 任务队列（Set 去重）====================

export function queueJob(job: SchedulerJob) {
  // 排除正在执行的 job 自身递归调用
  if (!queue.length || !queue.includes(job, isFlushing ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job)
    } else {
      // 按 id 插入，保持排序
      const index = findInsertionIndex(job.id)
      if (index === -1) {
        queue.push(job)
      } else {
        queue.splice(index, 0, job)
      }
    }

    queueScheduleFlush()
  }
}

function findInsertionIndex(id: number): number {
  let start = isFlushing ? flushIndex + 1 : 0
  let end = queue.length

  // 二分查找插入位置
  while (start < end) {
    const mid = (start + end) >> 1
    const midJob = queue[mid]
    const midId = (midJob as any).id ?? Infinity
    if (midId < id) {
      start = mid + 1
    } else {
      end = mid
    }
  }
  return start
}

function queueScheduleFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true
    useMicroTask(flushJobs)
  }
}

// ==================== 5. flushJobs 批量刷新 ====================

function flushJobs() {
  isFlushPending = false
  isFlushing = true

  try {
    // 5.1 执行 pre 回调（如 beforeUpdate 钩子）
    flushPreFlushCbs()

    // 5.2 按优先级排序任务
    queue.sort((a, b) => {
      const idA = (a as any).id ?? Infinity
      const idB = (b as any).id ?? Infinity
      return idA - idB
    })

    // 5.3 顺序执行队列中的所有 job
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex]

      if (job && job.active !== false) {
        isExecutingJob = true
        try {
          job()
        } finally {
          isExecutingJob = false
        }
      }
    }
  } finally {
    flushIndex = 0
    queue.length = 0
    queueSet.clear()
    isFlushing = false

    // 5.4 执行 post 回调（如 updated 钩子）
    flushPostFlushCbs()

    // 5.5 如果在执行过程中有新任务加入，再次调度
    if (queue.length || preFlushCbs.length || postFlushCbs.length) {
      useMicroTask(flushJobs)
    }
  }
}

// ==================== 6. Pre/Post 回调管理 ====================

export function queuePreFlushCb(cb: SchedulerCb): void {
  preFlushCbs.push(cb)
  queueScheduleFlush()
}

export function queuePostFlushCb(cb: SchedulerCb): void {
  postFlushCbs.push(cb)
  queueScheduleFlush()
}

function flushPreFlushCbs(): void {
  for (let i = 0; i < preFlushCbs.length; i++) {
    preFlushCbs[i]()
  }
  preFlushCbs.length = 0
}

function flushPostFlushCbs(): void {
  for (let i = 0; i < postFlushCbs.length; i++) {
    postFlushCbs[i]()
  }
  postFlushCbs.length = 0
}

// ==================== 7. nextTick 实现 ====================
export function nextTick<T = void>(fn?: () => T): Promise<T> {
  const p = resolvedPromise.then(() => {
    p.pending = false
    return fn?.()
  })
  p.pending = true
  return p
}

// ==================== 8. invalidateJob 使 job 失效 ====================
export function invalidateJob(job: SchedulerJob) {
  const i = queue.indexOf(job)
  if (i > -1 && (i < flushIndex || !isFlushing)) {
    queue.splice(i, 1)
  }
}
```

#### 2. 使用示例：组件更新批处理

```typescript
// 模拟组件更新场景
const componentUpdate = { id: 1, active: true }

function updateComponent() {
  console.log('🔄 组件更新执行')
  componentUpdate.active = false
}

// 场景 1: 多次修改只触发一次更新
queueJob(updateComponent)
queueJob(updateComponent)  // 去重，不会重复加入
console.log('队长度:', queue.length)  // 输出: 1

// 场景 2: 带 ID 的优先级排序
const parentUpdate = { id: 0, active: true }
const childUpdate = { id: 1, active: true }

function updateParent() { console.log('父组件更新') }
function updateChild() { console.log('子组件更新') }

;(parentUpdate as any).id = 0
;(childUpdate as any).id = 1

queueJob(updateChild as any)   // 先添加子组件
queueJob(updateParent as any)  // 再添加父组件
// 刷新时会按 id 排序：先父后子

// 场景 3: Pre/Post 钩子
queuePreFlushCb(() => console.log('⬆️ Before Update'))
queuePostFlushCb(() => console.log('⬇️ Updated'))

// 场景 4: nextTick 等待 DOM 更新
nextTick(() => {
  console.log('✅ DOM 已更新')
})
```

#### 3. 核心设计要点

| 特性 | 实现方式 | 设计意图 |
|------|---------|---------|
| **任务去重** | `Set` + `includes` 检查 | 避免同一 effect 重复执行 |
| **微任务调度** | `Promise.resolve().then()` | 浏览器空闲时批量处理 |
| **双锁机制** | `isFlushing` + `isFlushPending` | 防止并发调度问题 |
| **优先级排序** | `job.id` + 二分查找插入 | 保证父子组件更新顺序 |
| **Pre/Post 钩子** | 独立回调队列 | 支持生命周期钩子 |
| **递归保护** | `flushIndex` 控制 | 防止无限循环 |

---

## Q34: 手写 mini-createRenderer（跨平台渲染抽象层）

- **难度**：★★★
- **知识点**：[createRenderer] / [虚拟 DOM] / [跨平台] / [插件化]
- **题型**：手写实现题
- **关联源码**：`packages/runtime-core/src/renderer.ts`、`packages/runtime-dom/src/nodeOps.ts`

### 参考答案要点：

#### 1. 完整手写实现

```typescript
// ==================== 1. VNode 类型定义 ====================
interface VNode {
  type: string | object
  props: Record<string, any> | null
  children: string | VNode[] | null
  key: string | number | null
  el: any
  shapeFlag: number
}

const enum ShapeFlags {
  ELEMENT = 1,
  STATEFUL_COMPONENT = 4,
  TEXT_CHILDREN = 8,
  ARRAY_CHILDREN = 16
}

function createVNode(type: string | object, props?: any, children?: any): VNode {
  const vnode: VNode = {
    type,
    props: props || null,
    children: children || null,
    key: props?.key ?? null,
    el: null,
    shapeFlag: 0
  }

  // 设置 shapeFlags
  if (typeof type === 'string') {
    vnode.shapeFlag |= ShapeFlags.ELEMENT
  }
  if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  } else if (typeof children === 'string') {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  }

  return vnode
}

// ==================== 2. nodeOps 接口定义 ====================
interface RendererOptions<HostNode = any> {
  // DOM 操作
  createElement(tag: string): HostNode
  removeChild(parent: HostNode, child: HostNode): void
  insertBefore(parent: HostNode, child: HostNode, anchor: HostNode | null): void
  setTextContent(node: HostNode, text: string): void
  setElementText(node: HostNode, text: string): void
  parentNode(node: HostNode): HostNode | null
  nextSibling(node: HostNode): HostNode | null
  querySelector(selector: string): HostNode | null

  // 属性操作
  patchProp(
    el: HostNode,
    key: string,
    prevValue: any,
    nextValue: any
  ): void
}

// ==================== 3. baseCreateRenderer 工厂函数 ====================
function baseCreateRenderer<HostNode = any>(options: RendererOptions<HostNode>) {
  const {
    createElement: hostCreateElement,
    removeChild: hostRemoveChild,
    insertBefore: hostInsertBefore,
    setTextContent: hostSetTextContent,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    querySelector: hostQuerySelector,
    patchProp: hostPatchProp
  } = options

  // ==================== 3.1 patch 核心调度函数 ====================
  function patch(n1: VNode | null, n2: VNode, container: HostNode) {
    const { type, shapeFlag } = n2

    switch (type) {
      case 'TEXT':
        processText(n1, n2, container)
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container)
        }
        break
    }
  }

  // ==================== 3.2 处理元素节点 ====================
  function processElement(n1: VNode | null, n2: VNode, container: HostNode) {
    if (n1 == null) {
      mountElement(n2, container)
    } else {
      patchElement(n1, n2)
    }
  }

  function mountElement(vnode: VNode, container: HostNode) {
    const { type, props, children, shapeFlag } = vnode

    // 创建 DOM 元素
    const el = (vnode.el = hostCreateElement(type as string))

    // 设置属性
    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }

    // 处理子节点
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      hostSetElementText(el, children as string)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(children as VNode[], el)
    }

    // 插入容器
    hostInsertBefore(container, el, null)
  }

  function mountChildren(children: VNode[], container: HostNode) {
    for (let i = 0; i < children.length; i++) {
      patch(null, children[i], container)
    }
  }

  function patchElement(n1: VNode, n2: VNode) {
    const el = (n2.el = n1.el)

    // 更新属性
    const oldProps = n1.props || {}
    const newProps = n2.props || {}
    patchProps(el, oldProps, newProps)

    // 更新子节点
    patchChildren(n1, n2, el)
  }

  function patchProps(el: HostNode, oldProps: Record<string, any>, newProps: Record<string, any>) {
    // 移除旧属性
    for (const key in oldProps) {
      if (!(key in newProps)) {
        hostPatchProp(el, key, oldProps[key], null)
      }
    }

    // 设置新属性
    for (const key in newProps) {
      const next = newProps[key]
      const prev = oldProps[key]
      if (next !== prev) {
        hostPatchProp(el, key, prev, next)
      }
    }
  }

  function patchChildren(n1: VNode, n2: VNode, container: HostNode) {
    const c1 = n1.children as VNode[]
    const c2 = n2.children as VNode[]

    // 简化版：全量 diff（实际 Vue 使用双端算法）
    const oldLength = c1.length
    const newLength = c2.length
    const commonLength = Math.min(oldLength, newLength)

    for (let i = 0; i < commonLength; i++) {
      patch(c1[i], c2[i], container)
    }

    if (newLength > oldLength) {
      // 新增子节点
      for (let i = commonLength; i < newLength; i++) {
        patch(null, c2[i], container)
      }
    } else if (oldLength > newLength) {
      // 删除多余子节点
      for (let i = commonLength; i < oldLength; i++) {
        hostRemoveChild(container, c1[i].el)
      }
    }
  }

  // ==================== 3.3 处理文本节点 ====================
  function processText(n1: VNode | null, n2: VNode, container: HostNode) {
    if (n1 == null) {
      const textNode = document.createTextNode(n2.children as string)
      n2.el = textNode
      hostInsertBefore(container, textNode, null)
    } else {
      const el = (n2.el = n1.el)
      if (n1.children !== n2.children) {
        hostSetTextContent(el, n2.children as string)
      }
    }
  }

  // ==================== 3.4 处理组件（简化版）====================
  function processComponent(n1: VNode | null, n2: VNode, container: HostNode) {
    if (n1 == null) {
      mountComponent(n2, container)
    }
  }

  function mountComponent(vnode: VNode, container: HostNode) {
    // 组件实例化逻辑（简化）
    console.log('Mounting component:', vnode.type)
  }

  // ==================== 3.5 render 函数 ====================
  function render(vnode: VNode | null, container: HostNode) {
    if (vnode == null) {
      // 卸载：清空容器
      if (container._vnode) {
        unmount(container._vnode)
        container._vnode = null
      }
    } else {
      patch(container._vnode || null, vnode, container)
    }
    container._vnode = vnode
  }

  function unmount(vnode: VNode) {
    if (vnode.shapeFlag & ShapeFlags.ELEMENT) {
      hostRemoveChild(hostParentNode(vnode.el), vnode.el)
    }
  }

  // ==================== 3.6 hydration 函数（SSR）====================
  function hydrate(vnode: VNode, container: HostNode) {
    // SSR hydration 基础实现
    if (container.childNodes.length > 0) {
      hydrateNode(container.firstChild as HostNode, vnode)
    }
    container._vnode = vnode
  }

  function hydrateNode(node: HostNode, vnode: VNode): HostNode {
    const { type, props, children, shapeFlag } = vnode

    if (shapeFlag & ShapeFlags.ELEMENT) {
      // 匹配现有 DOM 节点
      vnode.el = node
      if (shapeFlag & ShapeFlags.TEXT_CHILDREN && node.textContent !== children) {
        hostSetElementText(node, children as string)
      } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        let child = node.firstChild as HostNode | null
        const childVNodes = children as VNode[]
        for (let i = 0; i < childVNodes.length; i++) {
          child = hydrateNode(child!, childVNodes[i])
          child = hostNextSibling(child!)
        }
      }
    }

    return hostNextSibling(node) || node
  }

  return {
    render,
    hydrate,
    createApp: createAppAPI(render)
  }
}

// ==================== 4. createAppAPI 应用创建工厂 ====================
function createAppAPI(render: Function) {
  return function createApp(rootComponent: any, rootProps?: any) {
    const app = {
      _component: rootComponent,
      _props: rootProps || {},
      _container: null as any,

      mount(rootContainer: string | Element) {
        const container = typeof rootContainer === 'string'
          ? document.querySelector(rootContainer)
          : rootContainer

        this._container = container

        // 创建根 VNode 并渲染
        const vnode = createVNode(rootComponent, rootProps)
        render(vnode, container)

        return app
      },

      unmount() {
        if (this._container) {
          render(null, this._container)
          this._container = null
        }
      }
    }

    return app
  }
}
```

#### 2. Web 平台默认实现（nodeOps + patchProp）

```typescript
// ==================== 5. 浏览器平台 nodeOps 实现 ====================
const nodeOps = {
  createElement(tag: string): HTMLElement {
    return document.createElement(tag)
  },

  removeChild(parent: Node, child: Node): void {
    parent.removeChild(child)
  },

  insertBefore(parent: Node, child: Node, anchor: Node | null): void {
    parent.insertBefore(child, anchor)
  },

  setTextContent(node: Node, text: string): void {
    node.textContent = text
  },

  setElementText(el: HTMLElement, text: string): void {
    el.textContent = text
  },

  parentNode(node: Node): Node | null {
    return node.parentNode
  },

  nextSibling(node: Node): Node | null {
    return node.nextSibling
  },

  querySelector(selector: string): Element | null {
    return document.querySelector(selector)
  }
}

// ==================== 6. patchProp 属性更新实现 ====================
function patchProp(
  el: HTMLElement,
  key: string,
  prevValue: any,
  nextValue: any
): void {
  // 特殊属性处理
  if (key === 'class') {
    el.className = nextValue || ''
  } else if (key === 'style') {
    if (nextValue) {
      Object.assign(el.style, nextValue)
    } else {
      el.removeAttribute('style')
    }
  } else if (key.startsWith('on')) {
    // 事件绑定
    const eventName = key.slice(2).toLowerCase()
    if (prevValue) {
      el.removeEventListener(eventName, prevValue)
    }
    if (nextValue) {
      el.addEventListener(eventName, nextValue)
    }
  } else if (key === 'innerHTML') {
    el.innerHTML = nextValue
  } else if (key === 'textContent') {
    el.textContent = nextValue
  } else if (key === 'href' || key.startsWith('data-')) {
    el.setAttribute(key, nextValue)
  } else if (key in el) {
    // DOM 属性直接赋值
    ;(el as any)[key] = nextValue
  } else {
    // 其他属性使用 setAttribute
    if (nextValue == null) {
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, nextValue)
    }
  }
}

// ==================== 7. 创建浏览器渲染器实例 ====================
const renderer = baseCreateRenderer({
  ...nodeOps,
  patchProp
})

export const { render, createApp } = renderer
```

#### 3. Canvas 渲染平台示例（跨平台能力展示）

```typescript
// ==================== 8. Canvas 平台实现 ====================
interface CanvasNode {
  type: 'rect' | 'text' | 'circle'
  x: number
  y: number
  width?: number
  height?: number
  text?: string
  radius?: number
  color?: string
}

class CanvasRenderer {
  private ctx: CanvasRenderingContext2D
  private nodes: Map<number, CanvasNode> = new Map()
  private idCounter = 0

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!
  }

  createElement(type: string): CanvasNode {
    const id = ++this.idCounter
    const node: CanvasNode = { type: type as any, x: 0, y: 0 }
    this.nodes.set(id, node)
    return node as any
  }

  removeChild(_parent: any, child: CanvasNode) {
    // Canvas 中通过重绘实现删除
    this.render()
  }

  insertBefore(_parent: any, child: CanvasNode, _anchor: any) {
    this.render()
  }

  setTextContent(node: CanvasNode, text: string) {
    node.text = text
    this.render()
  }

  setElementText(node: CanvasNode, text: string) {
    node.text = text
    this.render()
  }

  parentNode(_node: CanvasNode): any {
    return null  // Canvas 无父子关系
  }

  nextSibling(_node: CanvasNode): any {
    return null
  }

  querySelector(_selector: string): any {
    return null
  }

  patchProp(el: CanvasNode, key: string, _prev: any, next: any) {
    switch (key) {
      case 'x': el.x = next; break
      case 'y': el.y = next; break
      case 'width': el.width = next; break
      case 'height': el.height = next; break
      case 'color': el.color = next; break
    }
    this.render()
  }

  private render() {
    const { ctx, canvas } = this
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.nodes.forEach((node) => {
      ctx.fillStyle = node.color || '#000'
      switch (node.type) {
        case 'rect':
          ctx.fillRect(node.x, node.y, node.width || 100, node.height || 100)
          break
        case 'text':
          ctx.fillText(node.text || '', node.x, node.y)
          break
        case 'circle':
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius || 10, 0, Math.PI * 2)
          ctx.fill()
          break
      }
    })
  }
}

// 创建 Canvas 渲染器实例
function createCanvasRenderer(canvas: HTMLCanvasElement) {
  const canvasImpl = new CanvasRenderer(canvas)
  return baseCreateRenderer(canvasImpl as any)
}

// 使用示例：
// const canvasRenderer = createCanvasRenderer(document.getElementById('app') as HTMLCanvasElement)
// canvasRenderer.createApp(CanvasComponent).mount('#canvas-container')
```

#### 4. 核心设计要点

| 模块 | 关键设计 | 跨平台意义 |
|------|---------|-----------|
| **createRenderer** | 工厂函数 + options 注入 | 解耦核心算法与平台实现 |
| **nodeOps** | 统一 DOM 操作接口 | 不同平台提供不同实现 |
| **patchProp** | 属性更新策略 | 支持事件、样式、特殊属性 |
| **patch** | 递归 Diff 算法 | 核心调度，平台无关 |
| **hydrate** | SSR 复用 DOM | 服务端渲染优化 |
| **ShapeFlags** | 位运算标记 | 快速判断 VNode 类型 |

---

## Q35: 如果让你设计 Vue4 的响应式系统，你会怎么做？（Signal 方向？）

- **难度**：★★★
- **知识点**：[架构设计] / [Signal] / [响应式演进] / [未来趋势]
- **题型**：架构设计题
- **关联源码**：Vue3 响应式系统整体架构

### 参考答案要点：
1. Vue3 响应式的局限性（隐式依赖收集、过度响应化、GC压力、调试困难）
2. Signal 方向的设计思路（显式原子响应式单元、Computed派生、Effect副作用）
3. Signal vs Reactive 对比（粒度、依赖收集、内存占用、调试性、Tree-shaking）
4. 渐进式迁移方案（保持API兼容、底层统一Signal、编译器优化）

---

## Q36: 分析 Vue3 Monorepo 架构的设计优劣？

- **难度**：★★★
- **知识点**：[Monorepo] / [项目架构] / [工程化] / [包管理]
- **题型**：架构分析题
- **关联源码**：Vue3 项目根目录结构、package.json、tsconfig.json

### 参考答案要点：
1. Monorepo 结构解析（packages目录划分、职责分离）
2. 设计优势（职责清晰分离、灵活的组合能力、统一的构建测试）
3. 潜在劣势与改进建议（学习曲线陡峭、构建复杂度高、版本管理困难）
4. 值得借鉴的设计模式（pnpm workspace、TypeScript配置继承、ESLint规范统一）

---

## Q37: 设计一个插件化的编译器架构

- **难度**：★★★
- **知识点**：[编译器架构] / [插件系统] / [AST 转换] / [管道模式]
- **题型**：架构设计题
- **关联源码**：`packages/compiler-core/src/transform.ts`、`packages/compiler-core/src/plugins/`

### 参考答案要点：
1. Vue3 编译器插件架构分析（CompilerOptions、TransformContext、生命周期钩子）
2. 插件化架构设计（PluginCompiler类、CompilerPlugin接口、优先级控制）
3. 内置插件示例（hoistStaticPlugin、cacheHandlerPlugin）
4. 自定义插件示例（i18n国际化插件）
5. 架构优势（开放封闭原则、单一职责、可组合性、优先级控制）

---

## Q38: Vue2 vs Vue3 响应式系统的完整迁移分析

- **难度**：★★★
- **知识点**：[Vue2 vs Vue3] / [迁移指南] / [API差异] / [性能对比]
- **题型**：对比分析题
- **关联源码**：Vue2 src/core/observer/ vs Vue3 packages/reactivity/

### 参考答案要点：
1. 核心API对照表（数据劫持、响应式API、计算属性、侦听器、set/delete）
2. 内部实现差异（Observer类 vs Proxy handler、defineReactive vs mutableHandlers）
3. 迁移实战案例（Vue2 Options API → Vue3 Composition API）
4. 性能对比数据（初始化速度、深度嵌套、数组修改、内存占用）

### 🔍 追问链

1. **更新粒度差异（组件级 vs 节点级）的性能影响？**
   → 方向：
   - **Vue3 组件级更新**：
     - 响应式变化 → 触发组件重新渲染（render 函数）
     - 通过 PatchFlags 和 Block Tree 优化，只更新动态节点
     - 优势：编译时确定更新范围，运行时开销小
   - **React 节点级更新（Fiber）**：
     - 状态变化 → 从根节点开始调和（Reconciliation）
     - 使用 Fiber 树进行增量更新，支持中断恢复
     - 优势：更细粒度的控制，适合复杂交互场景
   - **性能对比场景**：
     - **大列表更新**：Vue3 的 v-for + key 更高效（O(动态节点数)）
     - **深层嵌套组件**：React Fiber 的 Time Slicing 避免长任务阻塞
     - **频繁局部更新**：Vue3 的精确依赖追踪减少无效渲染
   - **实际选择建议**：
     - 数据密集型应用：Vue3 更优
     - 复杂交互/动画：React Fiber 更灵活

2. **并发模式对比（Time Slicing vs Concurrent Mode）？**
   → 方向：
   - **Vue3 的同步渲染**：
     - 渲染过程不可中断（除非使用 Suspense）
     - 依赖浏览器的事件循环进行任务调度
     - scheduler 使用微任务队列批量处理
   - **React 的 Concurrent Mode**：
     - Fiber 架构支持可中断的渲染
     - 使用 `requestIdleCallback` / `MessageChannel` 实现时间切片
     - 支持 Suspense、Transition、useDeferredValue 等并发特性
   - **关键差异**：
     ```javascript
     // React: 可中断的渲染
     function App() {
       const [isPending, startTransition] = useTransition()
       const [count, setCount] = useState(0)

       return (
         <button onClick={() => startTransition(() => setCount(c => c + 10000))}>
           {isPending ? 'Loading...' : count}
         </button>
       )
     }

     // Vue3: 同步渲染 + Suspense 异步边界
     <Suspense>
       <AsyncComponent :data="largeData" />
       <template #fallback><Loading /></template>
     </Suspense>
     ```
   - **性能影响**：
     - React 并发模式适合高优先级任务（输入响应）+ 低优先级任务（数据更新）
     - Vue3 通过编译优化避免大部分性能问题，无需复杂的并发机制

3. **状态管理哲学差异（响应式 vs 不可变）？**
   → 方向：
   - **Vue3 响应式系统**：
     - 基于 Proxy 的自动依赖追踪
     - 直接修改状态，框架自动检测变化
     - 显式的 computed/watch 进行派生和副作用
     ```typescript
     // Vue3: 响应式
     const state = reactive({ count: 0 })
     state.count++  // 自动触发更新

     const double = computed(() => state.count * 2)  // 自动缓存
     watch(() => state.count, (newVal) => console.log(newVal))
     ```
   - **React 不可变数据**：
     - 每次创建新对象，通过引用比较检测变化
     - 使用 setState / useReducer 更新状态
     - 依赖 useMemo / useCallback 优化性能
     ```jsx
     // React: 不可变
     const [count, setCount] = useState(0)
     setCount(prev => prev + 1)  // 创建新值

     const double = useMemo(() => count * 2, [count])  // 手动声明依赖
     useEffect(() => {
       console.log(count)
     }, [count])  // 手动声明依赖数组
     ```
   - **设计哲学对比**：
     | 特性 | Vue3 (响应式) | React (不可变) |
     |------|-------------|---------------|
     | **数据修改** | 直接修改 | 必须替换 |
     | **依赖追踪** | 自动收集 | 手动声明 |
     | **学习曲线** | 较低 | 较高 |
     | **调试性** | 变更追踪清晰 | 时间旅行调试 |
     | **性能优化** | 编译时优化 | 运行时优化 |
     | **适用场景** | 数据驱动 UI | 复杂状态逻辑 |
   - **未来趋势**：
     - Vue4 可能引入 Signal 模型（细粒度响应式）
     - React 可能引入 Compiler（类似 Vue 的编译时优化）
     - 两者在互相借鉴对方的优点

---

## Q39: Vue3 Virtual DOM vs React Fiber 的设计哲学对比

- **难度**：★★★
- **知识点**：[Virtual DOM] / [Fiber] / [框架对比] / [设计哲学]
- **题型**：对比分析题
- **关联源码**：Vue3 packages/runtime-core/src/vnode.ts vs React packages/react-reconciler/

### 参考答案要点：
1. 核心概念对比（VNode vs Fiber结构、更新策略、优先级、调和算法）
2. Vue3 VNode特点（轻量级、一次性创建、同步处理、Block Tree优化）
3. React Fiber特点（重量级、持久存在、可中断、双缓冲技术）
4. 设计哲学差异（Vue3编译时优化+运行时简化 vs React运行时智能+时间切片）
5. 适用场景选择指南

---

## Q40: Vue3 Compiler vs Svelte Compiler 的编译优化策略对比

- **难度**：★★★
- **知识点**：[编译优化] / [Svelte] / [框架对比] / [编译时vs运行时]
- **题型**：对比分析题
- **关联源码**：Vue3 packages/compiler-core/ vs Svelte packages/svelte/src/compiler/

### 参考答案要点：
1. 编译理念对比（输出产物、响应式、Virtual DOM、Bundle Size）
2. Vue3编译策略（模板→AST→Transform→Codegen、PatchFlags、静态提升）
3. Svelte编译策略（真·无虚拟DOM、编译时响应式、原生DOM操作）
4. 性能对比（首次渲染、更新性能、内存占用）
5. 各自优劣势分析

---

## Q41: Vue3 vs Solid.js 的响应式模型对比（细粒度更新）

- **难度**：★★★
- **知识点**：[Solid.js] / [细粒度响应式] / [框架对比]
- **题型**：对比分析题
- **关联源码**：Vue3 packages/reactivity/ vs Solid.js packages/solid/src/reactive/

### 参考答案要点：
1. Solid.js响应式模型（createSignal、createEffect、细粒度依赖追踪）
2. 与Vue3的差异（隐式vs显式依赖收集、组件粒度vs属性粒度、编译时优化）
3. 性能对比（更新效率、内存占用、GC压力）
4. 适用场景分析

---

## Q42: 从源码角度分析 Vue3 的性能优化最佳实践

- **难度**：★★★
- **知识点**：[性能优化] / [最佳实践] / [响应式/Diff/编译]
- **题型**：综合分析题
- **关联源码**：Vue3 全栈源码

### 参考答案要点：
1. 响应式层面优化（合理使用ref/reactive、避免深层嵌套、shallowRef/markRaw）
2. Diff层面优化（稳定v-for key、减少动态节点、利用PatchFlags）
3. 编译层面优化（v-once/v-memo、函数式组件、异步组件）
4. 组件层面优化（keep-alive、按需加载、虚拟滚动）
5. 实战案例与性能监控方法

---

## Q43: Vue3 的 Tree-shaking 支持是如何实现的？

- **难度**：★★★
- **知识点**：[Tree-shaking] / [打包优化] / [模块化]
- **题型**：源码分析题
- **关联源码**：Vue3 package.json exports字段、各包的导出方式

### 参考答案要点：
1. Tree-shaking原理（ESM静态分析、未引用代码消除）
2. Vue3的实现方式（Monorepo拆分、exports字段配置、__DEV__条件导出）
3. Bundle size影响（完整版vs精简版体积对比）
4. 最佳实践建议（按需引入、避免全局注册）

---

## Q44: Vue3 中如何做性能监控？基于 Performance API 的框架级监控

- **难度**：★★★
- **知识点**：[性能监控] / [Performance API] / [框架级工具]
- **题型**：综合实践题
- **关联源码**：Vue3 devtools集成、performance标记点

### 参考答案要点：
1. Performance API基础（mark/measure、PerformanceObserver）
2. Vue3关键性能指标（组件渲染耗时、响应式更新频率、内存使用情况）
3. 监控方案设计（自定义指令、全局mixin、devtools钩子）
4. 数据采集与分析（上报策略、可视化方案）

---

## Q45: 学习 Vue3 源码后，你对前端框架设计有哪些新认识？

- **难度**：★★★
- **知识点**：[框架设计] / [架构思想] / [工程化总结]
- **题型**：思考总结题
- **关联源码**：Vue3 整体架构

### 参考答案要点：
1. 分层架构的重要性（core/renderer/dom/platform）
2. 编译时优化的威力（将运行时负担前移到构建阶段）
3. API设计的权衡（易用性vs灵活性、渐进式 adoption）
4. 工程化实践的启示（Monorepo、TypeScript、测试驱动开发）
5. 社区生态建设（插件机制、文档、devtools）

---

## Q46: Vue3 Vapor Mode（实验性）的编译思路？

- **难度**：★★★
- **知识点**：[Vapor Mode] / [实验性特性] / [编译优化]
- **题型**：前沿技术题
- **关联源码**：Vue3 实验性分支 vapor

### 参考答案要点：
1. Vapor Mode概念（无Virtual DOM、直接DOM操作、信号式响应式）
2. 与 React Compiler的异同（编译时优化思路、Hook优化、memo推导）
3. 当前进展与限制（实验性状态、兼容性问题）
4. 未来展望（可能的正式发布时间线）

---

## Q47: 从 Vue2 → Vue3 → Vue3.3+ 的演进趋势分析

- **难度**：★★★
- **知识点**：[版本演进] / [技术趋势] / [生态发展]
- **题型**：趋势分析题
- **关联源码**：Vue各版本 changelog、RFC 文档

### 参考答案要点：
1. Vue2→Vue3的重构（Composition API、响应式重写、编译器重写）
2. Vue3.x的迭代优化（3.0稳定、3.2<script setup>、3.3泛式组件、3.4+新特性）
3. 技术趋势判断（更好的TS支持、更小的体积、更快的性能）
4. 生态发展（Nuxt3、Pinia、VueUse、Vitest）

---

## Q48: 前端框架源码学习的通用方法论

- **难度**：★★★
- **知识点**：[学习方法] / [源码阅读技巧] / [知识体系]
- **题型**：方法论总结题
- **关联源码**：主流前端框架源码

### 参考答案要点：
1. 学习路径规划（基础→进阶→专家，由浅入深）
2. 源码阅读技巧（从入口开始、画调用图、断点调试）
3. 动手实践方法（手写mini版本、贡献开源项目、写技术博客）
4. 知识体系构建（横向对比多个框架、纵向深入单一领域）
5. 避坑指南（不要陷入细节、注重整体架构、理论结合实践）

---

# Composition API（Hooks）专项面试题

---

## Q51：Vue3 的 Composition API 和 React Hooks 有哪些核心区别？

- **难度**：★★☆
- **知识点**：[Composition API] / [React Hooks对比] / [设计哲学]
- **题型**：对比分析题
- **关联源码**：`packages/reactivity/src/reactive.ts` vs `react/src/ReactHooks.js`

### 参考答案要点：

#### 1. **依赖管理机制**
```javascript
// Vue3：自动依赖追踪，无需声明
const count = ref(0)
watch(() => console.log(count.value))  // 自动追踪count

// React：必须手动声明依赖数组
useEffect(() => {
  console.log(count)  // 闭包可能捕获旧值！
}, [count])  // 漏写会导致bug
```
→ Vue3使用Proxy自动收集依赖，React需手动声明

#### 2. **调用规则**
- Vue3：必须在`setup()`中同步调用（但限制较少）
- React：必须在组件顶层调用（eslint-plugin-react-hooks强制）
→ 原理差异：Vue3基于实例上下文(currentInstance)，React基于链表(memoizedState)

#### 3. **闭包陷阱问题**
- Vue3：**不存在**（ref始终指向同一对象引用）
- React：**常见问题**（state是渲染快照，异步回调可能拿到旧值）
→ 示例代码展示React的stale closure问题及解决方案

#### 4. **性能优化模型**
- Vue3：精确依赖收集，天然高效
- React：需手动memo/useMemo/useCallback优化
→ 性能测试对比数据

#### 5. **状态更新方式**
- Vue3：修改值即可触发（`count.value++`）
- React：必须调用setter（`setCount(c => c+1)`）
→ 设计哲学差异：可变 vs 不可变

### 🔍 追问链
1. **为什么Vue3不需要依赖数组？**
   → 方向：Proxy响应式系统自动追踪、track()机制、WeakMap存储结构
2. **React的stale closure问题怎么解决？**
   → 方向：useRef保存最新值、函数式更新、自定义hook封装
3. **从迁移角度，React开发者转Vue3有哪些"解脱"？**
   → 方向：不再想依赖数组、不再担心闭包、不再需要大量memo

---

## Q52：如何实现一个高质量的 Composable（自定义Hook）？有哪些设计原则？

- **难度**：★★☆
- **知识点**：[Composable] / [设计模式] / [最佳实践]
- **题型**：编程实践题 + 架构设计题
- **关联源码**：`packages/runtime-core/src/apiLifecycle.ts`, `apiSetup.ts`

### 参考答案要点：

#### 1. **核心设计原则（4大原则）**

| 原则 | 说明 | 反模式示例 |
|------|------|-----------|
| **只接收参数** | 不依赖this或组件实例 | ❌ 使用this.$props |
| **返回响应式数据** | 返回ref/reactive/computed | ❌ 返回普通值 |
| **副作用可控** | 提供清理机制 | ❌ 事件监听不清理 |
| **完全无耦合** | 可独立测试和使用 | ❌ 依赖外部全局变量 |

#### 2. **完整示例：useLocalStorage（带类型支持）**
```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: { serializer?: (v: T) => string; deserializer?: (s: string) => T }
) {
  // ⭐ 从localStorage读取初始值
  const stored = localStorage.getItem(key)
  const data = ref<T>(
    stored 
      ? (options?.deserializer ? options.deserializer(stored) : JSON.parse(stored))
      : initialValue
  )

  // ⭐ 监听变化，自动持久化
  watch(data, (newVal) => {
    localStorage.setItem(
      key, 
      options?.serializer ? options.serializer(newVal) : JSON.stringify(newVal)
    )
  }, { deep: true })

  // ⭐ 提供手动移除方法
  function remove() {
    localStorage.removeItem(key)
    data.value = initialValue
  }

  return { data, remove }
}

// 使用示例
const { data: theme, remove: resetTheme } = useLocalStorage<'light' | 'dark'>(
  'theme',
  'dark'
)
```

#### 3. **高级模式：Composable组合**
```typescript
// useUser = useFetch + useLocalStorage + usePermission
function useUser(userId: Ref<number>) {
  // 组合其他composable
  const { data: userData, loading, error } = useFetch(
    computed(() => `/api/users/${userId.value}`)
  )
  
  // 本地缓存
  const { data: cachedUser } = useLocalStorage(`user-${userId}`, null)
  
  // 权限计算
  const isAdmin = computed(() => userData.value?.role === 'admin')
  
  return { userData, loading, error, cachedUser, isAdmin }
}
```

#### 4. **源码原理：为什么可以在Composable中使用生命周期钩子？**
```typescript
// packages/runtime-core/src/apiLifecycle.ts 精简版
const currentInstance = null  // 全局变量：当前组件实例

export function onMounted(hook: () => void) {
  if (currentInstance) {
    currentInstance.m.push(hook)  // 注册到组件的mounted钩子数组
  }
}

// setup执行时：
function setupComponent(instance) {
  setCurrentInstance(instance)  // 设置全局变量
  const result = setup(instance.props, setupContext)
  unsetCurrentInstance()       // 清除全局变量
}
// 所以composable中的onMounted能找到currentInstance并注册钩子
```

#### 5. **质量检查清单**
- [ ] 是否可以在不同组件中复用？
- [ ] 副作用是否正确清理？
- [ ] 类型是否完善（TypeScript泛型）？
- [ ] 是否处理了边界情况（null/undefined）？
- [ ] 是否提供了清晰的API文档？

### 🔍 追问链
1. **Composable和Mixin的区别？**
   → 方向：命名冲突、数据来源不明、逻辑复用粒度
2. **Composable和高阶组件(HOC)的区别？**
   → 方向：Props嵌套地狱、静态类型丢失、性能开销
3. **如何测试一个Composable？**
   → 方向：@vue/test-utils的mount()、独立调用（无需渲染组件）

---

## Q53：Vue3 中 ref 和 reactive 应该如何选择？官方推荐策略是什么？

- **难度**：★☆☆
- **知识点**：[ref] / [reactive] / [最佳实践]
- **题型**：简答题 + 场景分析题
- **关联源码**：`packages/reactivity/src/ref.ts`, `reactive.ts`

### 参考答案要点：

#### 1. **官方推荐策略**

| 场景 | 推荐API | 原因 |
|------|---------|------|
| **基本类型**（string/number/boolean） | `ref()` | Proxy无法代理基本类型 |
| **对象（不需替换整体）** | `reactive()` | 无需.value，更简洁 |
| **对象（需要替换整体）** | `ref()` | reactive替换会丢失响应性 |
| **模板中使用** | 都可以 | 模板自动解包ref |
| **组合式函数返回** | `ref()` 或 `toRefs()` | 避免解构丢失响应性 |
| **大型响应式对象** | `reactive()` | 减少代理对象数量 |

#### 2. **关键差异源码解析**
```typescript
// ref的实现：包装为对象
class RefImpl<T> {
  private _value: T
  get value() { trackRefValue(this); return this._value }
  set value(newVal) { triggerRefValue(this, this._value = newVal) }
}

// reactive的实现：Proxy代理
function reactive(target) {
  return new Proxy(target, {
    get(target, key) { track(target, key); return Reflect.get(...) },
    set(target, key, val) { trigger(target, key); return Reflect.set(...) }
  })
}
```

#### 3. **常见错误场景**
```javascript
// ❌ 错误1：reactive解构丢失响应性
const state = reactive({ count: 0, name: 'vue' })
let { count, name } = state  // count和name不再是响应式！

// ✅ 解决：toRefs
let { count, name } = toRefs(state)

// ❌ 错误2：reactive整体替换
let state = reactive({ count: 0 })
state = reactive({ count: 1 })  // 新对象没有响应性！

// ✅ 解决：用ref包裹对象
let state = ref({ count: 0 })
state.value = { count: 1 }  // 正常触发更新
```

### 🔍 追问链
1. **toRefs的内部实现原理是什么？**
   → 方向：ObjectRefImpl类、创建Ref对象的循环
2. **ref在模板中为什么不需要.value？**
   → 方向：编译器优化、unref()自动调用
3. **shallowRef和shallowReactive的使用场景？**
   → 方向：大数据量性能优化、避免深层响应式开销

---

## Q54：Vue3 Composition API 中有哪些常见的"响应式丢失"场景？如何避免？

- **难度**：★★☆
- **知识点**：[响应式] / [陷阱] / [toRefs]
- **题型**：代码分析题 + 问题解决题
- **关联源码**：`packages/reactivity/src/ref.ts`, `baseHandlers.ts`, `reactive.ts`

### 参考答案要点：

#### 1. **场景1：reactive 对象解构**
```javascript
const state = reactive({
  user: { name: 'Alice', age: 25 },
  items: [1, 2, 3]
})

// ❌ 解构后丢失响应性
const { user, items } = state
user.name = 'Bob'      // 不触发更新！
items.push(4)          // 不触发更新！

// ✅ 方案1：toRefs
const { user, items } = toRefs(state)
// user和items现在是Ref对象
user.value.name = 'Bob'  // 触发更新 ✅

// ✅ 方案2：不解构，直接访问
state.user.name = 'Bob'  // 触发更新 ✅
```
**原因**：解构是值拷贝，脱离了Proxy代理

#### 2. **场景2：props 解构**
```javascript
// 子组件
const props = defineProps<{ count: number; name: string }>()

// ❌ 直接解构props
const { count, name } = props  // count和name不是响应式！

// ✅ 官方方案：使用toRefs
const { count, name } = toRefs(props)

// ✅ 或使用解构默认值（Vue3.2+）
const { count = 0, name = '' } = defineProps(['count', 'name'])
// 但这也不是响应式的，只是默认值
```

#### 3. **场景3：展开运算符**
```javascript
const state = reactive({ a: 1, b: 2 })

// ❌ 展开后丢失响应性
const newState = { ...state }  // 普通对象
newState.a = 100               // 不触发更新

// ✅ 保持响应式：不使用展开
state.a = 100                  // 触发更新 ✅
```

#### 4. **场景4：传递给非Vue函数**
```javascript
const count = ref(0)

// ❌ 传给不支持ref的第三方库
someLibrary.process(count)  // 库收到的是RefImpl对象，不是数字

// ✅ 显式取值
someLibrary.process(count.value)
```

#### 5. **源码层面的根本原因**
```typescript
// reactive使用Proxy代理整个对象
const proxy = new Proxy(target, handler)
// 只有通过proxy访问的属性才是响应式

// 解构操作等价于：
const user = proxy.user  // 这一步有响应式（触发了get trap）
// 但后续 user.name = 'Bob' 没有经过proxy，所以无响应式
```

### 🔍 追问链
1. **toRefs的内部实现是怎样的？**
   → 方向：遍历对象属性，为每个属性创建ObjectRef
2. **为什么template中解构props不会丢失响应性？**
   → 方向：编译器在编译时自动添加.toRefs()
3. **如何检测响应式是否丢失？**
   → 方向：Vue DevTools、isRef()/isReactive()工具函数

---

## Q55：watch 和 watchEffect 的区别是什么？各自适用什么场景？

- **难度**：★★☆
- **知识点**：[watch] / [watchEffect] / [侦听器]
- **题型**：对比分析题 + 场景设计题
- **关联源码**：`packages/runtime-core/src/apiWatch.ts`, `packages/reactivity/src/watch.ts`

### 参考答案要点：

#### 1. **核心差异对比表**

| 维度 | watch | watchEffect |
|------|-------|-------------|
| **懒执行** | ✅ 默认不执行（immediate:false） | ❌ 立即执行一次 |
| **依赖声明** | ✅ 手动指定source | ✅ 自动追踪内部依赖 |
| **回调参数** | (newVal, oldVal, onCleanup) | (onCleanup) 无新旧值 |
| **访问旧值** | ✅ 可以获取oldVal | ❌ 无法获取 |
| **性能** | 更优（只监听指定源） | 可能不必要的触发 |
| **适用场景** | 需要旧值/精确控制 | 简单副作用/日志 |

#### 2. **源码级差异**
```typescript
// watch：需要明确指定source
watch(
  () => state.count,        // source getter
  (newVal, oldVal) => { ... },  // callback
  { immediate: false }       // options
)

// watchEffect：自动追踪
watchEffect((onCleanup) => {
  console.log(state.count)  // 自动追踪state.count
  console.log(state.name)   // 自动追踪state.name
  // 所有被访问的响应式数据都会触发重新执行
})
```

**watchEffect内部实现原理**：
```typescript
function watchEffect(effect: EffectFunction, options?) {
  // ⭐ 创建一个特殊的effect，自动追踪依赖
  const runner = effect(typeof effect === 'function' ? effect : effect.fn)
  
  // ⭐ 立即执行一次（收集依赖）
  if (!options?.lazy) {
    runner()
  }
  
  // ⭐ 返回停止函数
  return () => stop(runner)
}
```

#### 3. **使用场景选择决策树**
```
需要侦听？
├── 需要获取旧值？
│   └── ✅ 使用 watch
├── 只需要在新值时执行？
│   └── 需要精确控制触发时机？
│       └── ✅ 使用 watch（可配置flush:'pre'|'post'|'sync'）
│   └── 不关心具体依赖？
│       └── ✅ 使用 watchEffect（自动追踪）
└── 需要清理副作用？
    └── 两者都支持 onCleanup 回调
```

### 🔍 追问链
1. **watch的flush选项（pre/post/sync）有什么区别？**
   → 方向：DOM更新前/后/同步执行的时机差异
2. **watchEffect如何停止？**
   → 方向：返回stop函数、组件卸载自动清理
3. **watch和computed的区别？**
   → 方向：computed有缓存返回值，watch是纯副作用

---

## Q56：手写一个完整的 Vue3 自定义 Hook（Composable）：useVirtualList（虚拟滚动列表）

- **难度**：★★★
- **知识点**：[Composable] / [虚拟滚动] / [性能优化] / [手写实现]
- **题型**：编程实践题
- **关联源码**：`packages/reactivity/src/ref.ts`, `computed.ts`, `watch.ts`

### 参考答案要点：

### 📝 完整实现代码

```typescript
/**
 * ========================================
 * useVirtualList: 虚拟滚动列表 Composable
 * 支持动态高度、缓冲区、平滑滚动
 * ========================================
 */

import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

interface UseVirtualListOptions {
  /** 所有列表项数据 */
  items: any[]
  /** 容器高度（px） */
  containerHeight: number
  /** 每项预估高度（px），用于动态高度时的初始估算 */
  estimatedItemHeight?: number
  /** 缓冲区大小（额外渲染的条数） */
  overscan?: number
  /** 获取实际高度的函数（用于动态高度） */
  getItemHeight?: (item: any, index: number) => number
}

export function useVirtualList(options: UseVirtualListOptions) {
  const {
    items,
    containerHeight,
    estimatedItemHeight = 40,
    overscan = 5,
    getItemHeight
  } = options

  // ==================== 1. 核心状态 ====================
  
  /** 当前滚动偏移量 */
  const scrollTop = ref(0)
  
  /** 容器元素引用 */
  const containerRef = ref<HTMLElement | null>(null)
  
  /** 各项的实际高度缓存（用于动态高度） */
  const measuredHeights = ref<Map<number, number>>(new Map())
  
  // ==================== 2. 计算属性 ====================
  
  /** 列表总高度（所有项的高度之和） */
  const totalHeight = computed(() => {
    if (getItemHeight) {
      // 动态高度模式：已知高度 + 未知高度*预估高度
      let knownHeight = 0
      let unknownCount = 0
      
      for (let i = 0; i < items.length; i++) {
        const h = measuredHeights.value.get(i)
        if (h !== undefined) {
          knownHeight += h
        } else {
          unknownCount++
          knownHeight += getItemHeight(items[i], i)  // 用测量函数估算
        }
      }
      
      return knownHeight + unknownCount * estimatedItemHeight - knownHeight % unknownCount
    }
    
    // 固定高度模式
    return items.length * estimatedItemHeight
  })
  
  /** 可见区域起始索引 */
  const startIndex = computed(() => {
    if (getItemHeight && measuredHeights.value.size > 0) {
      // 动态高度：遍历找到startIndex
      let accumulated = 0
      for (let i = 0; i < items.length; i++) {
        const h = measuredHeights.value.get(i) ?? estimatedItemHeight
        if (accumulated + h > scrollTop.value) {
          return Math.max(0, i - overscan)  // 包含缓冲区
        }
        accumulated += h
      }
      return Math.max(0, items.length - overscan)
    }
    
    // 固定高度模式：简单计算
    return Math.max(0, Math.floor(scrollTop.value / estimatedItemHeight) - overscan)
  })
  
  /** 可见区域结束索引 */
  const endIndex = computed(() => {
    const visibleEnd = startIndex.value + Math.ceil(containerHeight / estimatedItemHeight) + overscan * 2
    return Math.min(items.length - 1, visibleEnd)
  })
  
  /** 当前可见的子集 */
  const visibleItems = computed(() => {
    return items.slice(startIndex.value, endIndex.value + 1).map((item, index) => ({
      item,
      index: startIndex.value + index,
      // 用于定位的样式
      style: getItemHeight 
        ? { position: 'absolute' as const }  // 动态高度需要绝对定位
        : undefined
    }))
  })
  
  /** 起始项的偏移量（用于将可见项放到正确的位置） */
  const offsetTop = computed(() => {
    if (getItemHeight && measuredHeights.value.size > 0) {
      let offset = 0
      for (let i = 0; i < startIndex.value; i++) {
        offset += measuredHeights.value.get(i) ?? estimatedItemHeight
      }
      return offset
    }
    
    return startIndex.value * estimatedItemHeight
  })

  // ==================== 3. 方法 ====================
  
  /** 滚动到指定索引 */
  async function scrollToIndex(index: number) {
    if (getItemHeight) {
      let offset = 0
      for (let i = 0; i < index; i++) {
        offset += measuredHeights.value.get(i) ?? estimatedItemHeight
      }
      scrollTop.value = offset
    } else {
      scrollTop.value = index * estimatedItemHeight
    }
    
    await nextTick()
  }
  
  /** 测量某一项的实际高度 */
  function measureItem(index: number, height: number) {
    if (!measuredHeights.value.has(index) || measuredHeights.value.get(index) !== height) {
      measuredHeights.value.set(index, height)
      // 高度变化可能影响totalHeight，触发重新计算
    }
  }

  // ==================== 4. 事件处理 ====================
  
  /** 滚动事件处理器 */
  function handleScroll(e: Event) {
    const target = e.target as HTMLElement
    scrollTop.value = target.scrollTop
  }

  // ==================== 5. 生命周期 ====================
  
  onMounted(() => {
    if (containerRef.value) {
      containerRef.value.addEventListener('scroll', handleScroll, { passive: true })
    }
  })
  
  onUnmounted(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('scroll', handleScroll)
    }
  })

  // ==================== 6. 返回值 ====================
  
  return {
    // 状态
    containerRef,
    totalHeight,
    offsetTop,
    visibleItems,
    scrollTop,
    
    // 方法
    scrollToIndex,
    measureItem,
    
    // 计算属性（调试用）
    startIndex,
    endIndex
  }
}
```

### 💡 使用示例

```html
<template>
  <div 
    ref="containerRef"
    class="virtual-list-container"
    style="height: 500px; overflow-y: auto; position: relative;"
    @scroll="handleScroll"
  >
    <!-- 占位元素：撑开滚动条 -->
    <div :style="{ height: totalHeight + 'px', position: 'relative' }">
      <!-- 可见项 -->
      <div
        v-for="{ item, index } in visibleItems"
        :key="index"
        :style="{ 
          transform: `translateY(${offsetTop}px)`,
          position: 'absolute',
          top: `${getOffsetForIndex(index)}px`,
          left: 0,
          right: 0
        }"
        :ref="(el) => measureIfVisible(el, index)"
      >
        <slot :item="item" :index="index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVirtualList } from './useVirtualList'

const props = defineProps<{
  items: Array<{ id: number; content: string }>
}>()

const {
  containerRef,
  totalHeight,
  offsetTop,
  visibleItems,
  measureItem
} = useVirtualList({
  items: props.items,
  containerHeight: 500,
  estimatedItemHeight: 60,
  overscan: 3,
  getItemHeight: (item) => item.content.length > 50 ? 80 : 60
})

function measureIfVisible(el: Element | null, index: number) {
  if (el) {
    nextTick(() => {
      measureItem(index, el.clientHeight)
    })
  }
}
</script>
```

### 🔍 与官方实现的对比

| 能力 | 手写版 | @vueuse/virtual | 差异说明 |
|------|:------:|:---------------:|---------|
| 固定高度 | ✅ | ✅ | 一致 |
| 动态高度 | ✅ | ✅ | 官方更完善（预测算法） |
| 缓冲区 | ✅ | ✅ | 一致 |
| 滚动到指定项 | ✅ | ✅ | 官方支持动画 |
| 无限滚动 | ❌ | ✅ | 可扩展 |
| 横向虚拟列表 | ❌ | ✅ | 可扩展 |

---

## 附录A：Vue3 源码高频考点速查表

### 按包分类的核心文件

| 包名 | 核心功能 | 高频考点文件 | 重要程度 |
|------|---------|-------------|---------|
| **reactivity** | 响应式系统 | `reactive.ts`, `effect.ts`, `ref.ts`, `computed.ts` | ⭐⭐⭐⭐⭐ |
| **runtime-core** | 运行时核心 | `component.ts`, `renderer.ts`, `apiLifecycle.ts`, `scheduler.ts` | ⭐⭐⭐⭐⭐ |
| **runtime-dom** | DOM渲染 | `patchProp.ts`, `nodeOps.ts`, `components/*.ts` | ⭐⭐⭐⭐ |
| **compiler-core** | 编译器核心 | `compile.ts`, `transform.ts`, `ast.ts`, `codegen.ts` | ⭐⭐⭐⭐ |
| **compiler-dom** | DOM编译 | `transforms/vOn.ts`, `transforms/vModel.ts`, `transforms/vShow.ts` | ⭐⭐⭐ |
| **compiler-sfc** | SFC编译 | `compileScript.ts`, `compileTemplate.ts`, `parse.ts` | ⭐⭐⭐ |
| **server-renderer** | SSR | `render.ts`, `ssrVNodeHelpers.ts`, `hydration.ts` | ⭐⭐⭐ |
| **shared** | 共享工具 | `patchFlags.ts`, `shapeFlags.ts`, `globals.ts` | ⭐⭐ |

### 高频面试考点 TOP 10

1. **响应式原理**（Proxy + track/trigger + WeakMap存储） - 出现率 95%
2. **Diff算法**（LIS + Block Tree + PatchFlags） - 出现率 90%
3. **编译优化**（静态提升 + 事件缓存 + PatchFlags） - 出现率 85%
4. **Composition API**（setup/ref/reactive/toRefs） - 出现率 85%
5. **组件生命周期**（onMounted等内部实现） - 出现率 80%
6. **调度器**（queueJob/flushJobs/nextTick） - 出现率 75%
7. **虚拟DOM**（VNode结构/ShapeFlags/PatchFlags） - 出现率 70%
8. **provide/inject**（原型链查找机制） - 出现率 65%
9. **watch/watchEffect**（flush策略/依赖收集差异） - 出现率 60%
10. **nextTick**（微任务调度/批量更新） - 出现率 55%

---

## 附录B：Vue2↔Vue3 核心差异速查表

### API 差异

| 功能 | Vue2 | Vue3 | 变化类型 |
|------|------|------|---------|
| **全局API** | `new Vue()` | `createApp()` | 重构 |
| **数据劫持** | `Object.defineProperty` | `Proxy` | 替换 |
| **响应式声明** | `data(){}` | `ref()/reactive()` | 新增 |
| **计算属性** | `computed:{}` | `computed(fn)` | 改进 |
| **侦听器** | `watch:{}` | `watch(source,cb)` | 改进 |
| **生命周期** | options钩子 | onXxx()组合式API | 新增 |
| **组件通信** | `$emit/$on/$off` | `emmit/provide-inject` | 改进 |
| **插槽** | `this.$slots` | `useSlots()` | 改进 |
| **指令API** | 钩子函数 | 生命周期命名 | 重构 |
| **异步组件** | `()=>import()` | `defineAsyncComponent()` | 改进 |
| **Teleport** | 不支持 | `<Teleport>` | 新增 |
| **Fragment** | 单根节点 | 多根节点 | 增强 |
| **Suspense** | 不支持 | `<Suspense>` | 新增 |

### 内部实现差异

| 维度 | Vue2 | Vue3 | 影响 |
|------|------|------|------|
| **响应式原理** | Object.defineProperty递归 | Proxy惰性代理 | 性能大幅提升 |
| **Diff算法** | 双端比较O(n) | LIS+Block Tree O(d) | 动态节点少时更快 |
| **编译优化** | 无 | hoistStatic/cacheHandler | 首次渲染+更新更快 |
| **Tree-shaking** | 困难（运行时耦合） | 优秀（Monorepo拆分） | Bundle size减小40%+ |
| **TypeScript** | 类装饰器（实验性） | 原生重写 | 类型支持完美 |
| **模块格式** | UMD/CJS | ESM+CJS | 现代化构建 |
| **包管理** | 单包 | Monorepo（多包） | 可按需引入 |

### 性能对比

| 指标 | Vue2 | Vue3 | 提升 |
|------|------|------|------|
| **初始化速度** | 基准 | 快1.5~2x | ✅ |
| **更新性能** | 基准 | 快1.3~2x | ✅ |
| **SSR性能** | 基准 | 快2~3x | ✅ |
| **Bundle size(gzip)** | ~23KB (runtime) | ~10KB (runtime) | **-57%** |
| **Tree-shaking后** | ~23KB | ~6KB (最小) | **-74%** |
| **内存占用** | 较高 | 较低（WeakMap） | ✅ |
| **IE兼容** | IE9+ | 不支持IE | ⚠️ |

### 开发体验对比

| 维度 | Vue2 | Vue3 |
|------|------|------|
| **TypeScript** | 需要 class-component | 原生支持 |
| **逻辑复用** | Mixin（缺点多） | Composition API（hooks） |
| **调试工具** | Vue DevTools | Vue DevTools增强版 |
| **IDE支持** | Vetur（维护停止） | Volar（官方推荐）|
| **学习曲线** | 平缓 | 稍陡（但更灵活）|
| **社区生态** | 成熟完善 | 快速成长中 |

---

> **文档说明**
> - 本题库基于 Vue3.3+ 版本源码编写
> - 所有源码路径均为相对路径（相对于 Vue3 仓库根目录）
> - 行号可能因版本迭代略有变化，请以实际代码为准
> - 建议配合 Vue3 Playground 或本地源码进行实战练习

---

**📚 相关资源推荐**
- [Vue3 官方文档](https://cn.vuejs.org/)
- [Vue3 GitHub仓库](https://github.com/vuejs/core)
- [Vue3 源码解读系列](https://vuejs.org/guide/extras/rendering-mechanism.html)
- [Composition API RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0019-composition-api.md)

---

*最后更新：2026年6月 | 基于 Vue3.4.x 源码 | 总计 48 道题目*