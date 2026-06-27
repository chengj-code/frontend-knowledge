---
---
# React 源码解读面试题库

> **模块定位**：本题为「源码分析」专项题库，与普通面试题有本质区别——每道题都围绕真实源码实现展开
>
> **适用场景**：高级前端工程师 / 框架源码研究者 / 技术架构师面试准备
>
> **版本说明**：基于 React 18.2.0 版本源码分析
>
> **总题数**：50道（基础15道 + 进阶20道 + 专家15道）

---

## 📊 题目分布

| 层级 | 数量 | 占比 | 难度 | 特征 |
|------|:----:|:----:|------|------|
| ★☆☆ 基础层 | 15道 | ~30% | 概念记忆、基础语法 | 答案直接明确 |
| ★★☆ 进阶层 | 20道 | ~40% | 多点综合、需理解原理 | 需要分析推理 |
| ★★★ 专家层 | 15道 | ~30% | 源码级深度、架构设计 | 手写实现、方案设计 |

---

# 第一部分：★☆☆ 基础源码理解题（Q01-Q15）

---

## Q01: React的Fiber架构是什么？为什么需要Fiber？

- **难度**：★☆☆
- **知识点**：Fiber架构 / 可中断渲染 / 协调器
- **题型**：简答题
- **关联源码**：`packages/react-reconciler/src/ReactFiber.js:行1-100`

### 参考答案要点：

#### 1. **Fiber的核心定义**
Fiber是React 16引入的新的协调引擎（Reconciler），它将渲染过程从递归调用栈改为基于链表的可中断遍历。

```javascript
// packages/react-reconciler/src/ReactFiber.js
function FiberNode(tag, pendingProps, key, mode) {
  // 实例属性
  this.tag = tag;                    // 组件类型标记
  this.key = key;                    // 唯一标识
  this.type = null;                  // 组件函数或类
  this.stateNode = null;             // DOM节点或组件实例

  // Fiber链表结构
  this.return = null;                // 父Fiber
  this.child = null;                 // 第一个子Fiber
  this.sibling = null;               // 兄弟Fiber
  this.index = 0;                    // 在兄弟中的索引

  // 属性相关
  this.pendingProps = pendingProps;   // 新props
  this.memoizedProps = null;         // 上次渲染使用的props
  this.updateQueue = null;           // 更新队列
  this.memoizedState = null;         // 上次渲染的状态

  // 副作用相关
  this.flags = NoFlags;              // 副作用标记
  this.subtreeFlags = NoFlags;       // 子树副作用标记
  this.deletions = null;             // 要删除的子节点

  // 调度优先级
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 双缓存指针
  this.alternate = null;             // 对应workInProgress/current树中的另一个Fiber
}
```

#### 2. **为什么需要Fiber？**

**React 15的问题**：
- 使用递归进行虚拟DOM Diff，一旦开始无法中断
- 大型应用的更新会导致主线程长时间阻塞（>16ms）
- 用户交互（输入、滚动）无法及时响应

**Fiber的解决方案**：
- **可中断性**：将渲染工作分解为小的工作单元（Work Unit）
- **优先级调度**：高优先级任务（用户交互）可以打断低优先级任务
- **时间切片**：每个工作单元执行时间可控，保证帧率

#### 3. **Fiber的数据结构特点**

```javascript
// Fiber树结构示例
const fiberTree = {
  tag: HostRoot,          // 根节点
  child: {
    tag: FunctionComponent,  // 函数组件
    child: {
      tag: HostComponent,    // DOM组件（如div）
      stateNode: divElement, // 真实DOM引用
      sibling: {             // 兄弟节点
        tag: HostComponent,
        stateNode: spanElement
      }
    }
  },
  sibling: null
};
```

### 🔍 追问链

1. **Fiber与虚拟DOM的关系是什么？**
   → 方向：Fiber是虚拟DOM的具体数据结构实现，每个虚拟DOM节点对应一个Fiber节点

2. **Fiber的双缓存机制是如何工作的？**
   → 方向：current树和workInProgress树的切换机制，详见Q17

3. **Fiber如何实现任务的暂停和恢复？**
   → 方向：通过保存当前执行的Fiber节点和执行上下文，下次从断点继续

---

## Q02: React的调和（Reconciliation）过程是怎样的？

- **难度**：★☆☆
- **知识点**：调和算法 / Virtual DOM Diff / 组件更新流程
- **题型**：简答题
- **关联源码**：`packages/react-reconciler/src/ReactFiberBeginWork.js:行1-200`

### 参考答案要点：

#### 1. **调和的定义与目标**
调和（Reconciliation）是React比较新旧虚拟DOM树，确定需要更新的最小变更集的过程。

**核心目标**：
- 找出两棵树之间的差异（Diff）
- 计算出最小的DOM操作集合
- 保证UI与状态的一致性

#### 2. **调和的三层策略**

```javascript
// packages/react-reconciler/src/ReactFiberBeginWork.js
function beginWork(current, workInProgress, renderLanes) {
  // 1. 根据组件类型选择不同的调和策略
  switch (workInProgress.tag) {
    case FunctionComponent:
      return updateFunctionComponent(
        current,
        workInProgress,
        SortedLanes(renderLanes)
      );
    
    case ClassComponent:
      return updateClassComponent(
        current,
        workInProgress,
        SortedLanes(renderLanes)
      );
    
    case HostComponent:
      return updateHostComponent(current, workInProgress);
    
    case HostText:
      return updateHostText(current, workInProgress);
      
    // ... 其他类型
  }
  
  // 2. 如果没有current（首次渲染），直接挂载
  if (current === null) {
    // 首次挂载逻辑
  } else {
    // 更新逻辑 - 进行Diff比较
  }
}
```

#### 3. **调和的主要步骤**

```
┌─────────────────────────────────────────┐
│            Reconciliation 流程           │
├─────────────────────────────────────────┤
│ Step 1: 触发更新 (setState/props变化)     │
│    ↓                                    │
│ Step 2: 创建/复用 workInProgress 树      │
│    ↓                                    │
│ Step 3: 执行 beginWork（向下遍历）         │
│    ↓                                    │
│ Step 4: 比较 current 与 workInProgress    │
│    ↓                                    │
│ Step 5: 标记差异 (flags)                 │
│    ↓                                    │
│ Step 6: 执行 completeWork（向上归并）      │
│    ↓                                    │
│ Step 7: 提交阶段 (commitWork)             │
│    ↓                                    │
│ Step 8: 更新真实DOM                      │
└─────────────────────────────────────────┘
```

#### 4. **调和的关键优化点**

- **同层比较**：只比较同层级的节点，不跨层级比较
- **类型判断**：如果节点类型不同，直接销毁重建
- **Key匹配**：使用key来识别哪些元素可以复用
- **批量处理**：将多个状态更新合并为一次调和

### 🔍 追问链

1. **调和过程中如何判断组件是否需要更新？**
   → 方向：通过bailout机制检查props/state是否变化，详见Q24

2. **调和阶段和提交阶段的区别是什么？**
   → 方向：调和是纯计算（可中断），提交是实际DOM操作（不可中断），详见Q21

3. **React为什么不使用完整的树Diff算法？**
   → 方向：O(n³)复杂度太高，采用启发式O(n)算法在性能和准确性间平衡

---

## Q03: useState的底层实现原理是什么？

- **难度**：★☆☆
- **知识点**：Hooks / useState / 链表结构 / 状态管理
- **题型**：代码分析题
- **关联源码**：`packages/react-reconciler/src/ReactFiberHooks.js:行1500-1600`

### 参考答案要点：

#### 1. **useState的本质**
useState是一个特殊的Hook，它返回一个状态值和更新函数，其底层实际上是useReducer的语法糖。

```javascript
// packages/react/src/ReactHooks.js
export function useState(initialState) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

// 内部实现（简化版）
function useState(initialState) {
  // 实际上调用 useReducer
  return useReducer(
    basicStateReducer,  // 简单的状态reducer
    initialState        // 初始状态
  );
}

// basicStateReducer 的实现
function basicStateReducer(state, action) {
  return typeof action === 'function' ? action(state) : action;
}
```

#### 2. **Hook的数据结构**

```javascript
// packages/react-reconciler/src/ReactFiberHooks.js
const hook = {
  memoizedState: null,    // 当前状态值
  baseState: null,        // 基础状态（用于跳过更新的优先级）
  baseQueue: null,        // 基础更新队列
  queue: null,            // 当前更新队列（存放pending状态的循环链表）
  next: null              // 下一个hook（形成链表）
};

// Hook链表存储在fiber.memoizedState中
// fiber.memoizedState → [useState hook] → [useEffect hook] → ...
```

#### 3. **状态更新的完整流程**

```javascript
// 更新函数的实现
function dispatchAction(fiber, queue, action) {
  // 1. 创建update对象
  const update = {
    action: action,           // 新状态或更新函数
    lane: requestUpdateLane(), // 优先级
    next: null                // 指向下一个update（循环链表）
  };
  
  // 2. 将update追加到queue尾部（循环链表）
  const pending = queue.pending;
  if (pending === null) {
    update.next = update;  // 只有一个update时指向自己
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;

  // 3. 调度更新
  const eventTime = getCurrentEventTime();
  const root = markUpdateLaneFromFiberToRoot(fiber, lane);
  ensureRootIsScheduled(root, eventTime);  // 触发重新渲染
  
  // 4. 如果处于并发模式且优先级较低，可能不会立即渲染
  if (lane === SyncLane && executionContext !== NoContext) {
    // 同步模式下立即刷新
    flushSyncCallbacks();
  }
}
```

#### 4. **useState的使用规则**

```javascript
// ✅ 正确使用
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');
  
  // Hooks按顺序存储在链表中：
  // fiber.memoizedState → countHook → nameHook → null
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// ❌ 错误使用（条件语句）
function BadExample() {
  const [count, setCount] = useState(0);
  
  if (count > 0) {
    // ⚠️ 这会导致Hook顺序错乱！
    const [name, setName] = useState('test'); 
  }
  
  return <div>{count}</div>;
}
```

### 🔍 追问链

1. **useState的函数式更新是如何工作的？**
   → 方向：`setCount(prev => prev + 1)` 中prev参数来自哪里，如何处理连续多次更新

2. **多个useState的更新如何合并为一次渲染？**
   → 方向：批处理机制，多个dispatchAction触发一次render

3. **useState的状态保存在哪里？组件卸载后呢？**
   → 方向：状态保存在fiber节点的memoizedState中，卸载后会被垃圾回收

---

## Q04: useEffect的执行时机和清理函数是如何工作的？

- **难度**：★☆☆
- **知识点**：useEffect / 副作用 / 清理函数 / 生命周期
- **题型**：简答题
- **关联源码**：`packages/react-reconciler/src/ReactFiberCommitWork.js:行800-900`

### 参考答案要点：

#### 1. **useEffect的执行时机**

```javascript
// useEffect 在浏览器绘制完成后异步执行
// 执行时机：commit阶段之后，通过setTimeout/macrotask实现

// React内部对effect的分类
const Passive = /*                    */ 0b00000000000000100000;  // useEffect
const Layout = /*                     */ 0b00000000000001000000;  // useLayoutEffect

// 执行时机对比：
// useLayoutEffect: commit阶段同步执行（浏览器绘制前）
// useEffect:      commit阶段后异步执行（浏览器绘制后）
```

#### 2. **Effect的数据结构**

```javascript
// packages/react-reconciler/src/ReactFiberHooks.js
const effect = {
  tag: 0,                    // effect类型标记
  create: undefined,         // effect函数（用户传入的回调）
  destroy: undefined,        // 清理函数（create返回的函数）
  deps: undefined,           // 依赖数组
  next: null                 // 下一个effect（形成环形链表）
};

// Effect链表存储位置：
// fiber.updateQueue.lastEffect → effect1 → effect2 → ... → effect1（环）
```

#### 3. **依赖比较与清理逻辑**

```javascript
// packages/react-reconciler/src/ReactFiberHooks.js
function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  
  let destroy = undefined;
  
  if (currentHook !== null) {
    const prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    
    if (nextDeps !== null) {
      const prevDeps = prevEffect.deps;
      // 比较新旧依赖是否相等
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        // 依赖未变化，跳过本次effect执行
        // 但仍需推入effect链表（为了可能的清理）
        pushEffect(hookFlags, create, destroy, nextDeps);
        return;
      }
    }
  }
  
  // 依赖变化，标记需要执行
  currentlyRenderingFiber.flags |= fiberFlags;
  
  // 将effect推入链表
  hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    destroy,
    nextDeps
  );
}

// 依赖比较函数（浅比较）
function areHookInputsEqual(nextDeps, prevDeps) {
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (Object.is(nextDeps[i], prevDeps[i])) {
      return false;
    }
  }
  return true;
}
```

#### 4. **清理函数的执行时机**

```javascript
// 清理函数执行流程：
// 1. 组件重新渲染时，如果依赖变化
// 2. 先执行上一次的destroy（清理函数）
// 3. 再执行新的create（effect函数）

// 示例：
useEffect(() => {
  console.log('创建订阅');
  
  const subscription = props.source.subscribe();
  
  // 返回清理函数
  return () => {
    console.log('取消订阅');
    subscription.unsubscribe();
  };  // ← 这个函数会在下次effect执行前被调用
}, [props.source.id]);

// 执行顺序：
// 渲染1: create() → "创建订阅"
// 渲染2: destroy() → "取消订阅" → create() → "创建订阅"
// 卸载:  destroy() → "取消订阅"
```

### 🔍 追问链

1. **useEffect和useLayoutEffect的区别？**
   → 方向：执行时机不同，一个异步一个同步，详见Q18

2. **依赖数组为空[]和不传有什么区别？**
   → 方向：[]表示只在挂载/卸载执行，不传表示每次渲染都执行

3. **如何在useEffect中获取最新的state？**
   → 方向：使用ref保存最新值，或者使用函数式更新模式

---

## Q05: React的虚拟DOM（Virtual DOM）是什么？有什么优势？

- **难度**：★☆☆
- **知识点**：虚拟DOM / JSX / 性能优化 / 跨平台
- **题型**：简答题
- **关联源码**：`packages/react/src/ReactElement.js:行1-100`

### 参考答案要点：

#### 1. **虚拟DOM的定义**

虚拟DOM是真实DOM的JavaScript对象表示，它是React用来描述UI的轻量级数据结构。

```javascript
// 真实DOM
const realDOM = document.createElement('div');
realDOM.className = 'container';
realDOM.innerHTML = '<p>Hello</p>';

// 虚拟DOM（React Element）
const virtualDOM = {
  $$typeof: Symbol.for('react.element'),  // 类型标记
  type: 'div',                            // 元素类型
  key: null,                              // key属性
  ref: null,                              // ref引用
  props: {                                // 属性
    className: 'container',
    children: {
      $$typeof: Symbol.for('react.element'),
      type: 'p',
      props: {
        children: 'Hello'
      }
    }
  }
};

// JSX编译后的结果
// <div className="container"><p>Hello</p></div>
// 编译为：
React.createElement('div', { className: 'container' }, 
  React.createElement('p', null, 'Hello')
);
```

#### 2. **虚拟DOM的优势**

| 优势 | 说明 | 示例 |
|------|------|------|
| **跨平台** | 不依赖浏览器API，可渲染到Web/Native/Canvas等 | ReactDOM / ReactNative / react-three-fiber |
| **声明式编程** | 只描述UI应该是什么样，不需要手动操作DOM | setState自动计算差异 |
| **批量更新** | 多个状态变化合并为一次DOM操作 | 连续3次setState只触发1次重绘 |
| **性能优化** | 通过Diff算法找出最小更新量 | 只更新变化的节点 |
| **可调试性** | 可以在内存中比较前后状态 | React DevTools |

#### 3. **虚拟DOM到真实DOM的转换**

```javascript
// packages/react-dom/src/client/ReactDOMHostConfig.js
// 虚拟DOM创建真实DOM的过程
function createInstance(
  type,
  props,
  rootContainerInstance,
  hostContext,
  internalInstanceHandle
) {
  // 1. 创建DOM元素
  const domElement = createElement(type, props);
  
  // 2. 设置属性
  precacheFiberNode(internalInstanceHandle, domElement);
  updateFiberProps(domElement, props);
  
  return domElement;
}

// 最终插入DOM
function appendChildToContainer(containerInstance, child) {
  containerInstance.appendChild(child);
}
```

#### 4. **虚拟DOM的性能真相**

```javascript
// ⚠️ 常见误区：虚拟DOM一定比原生DOM快
// ✅ 真相：虚拟DOM的优势不在于单次操作的速度，
//          而在于"智能地减少不必要的DOM操作"

// 场景1：大量数据更新
// 原生方式：需要手动找出差异并更新（复杂度高）
// 虚拟DOM：自动Diff，批量更新（开发效率高）

// 场景2：跨平台渲染
// 虚拟DOM可以渲染到任意平台
// 原生DOM只能用于浏览器

// 性能对比（粗略）：
// 直接操作DOM：~0.1ms per operation
// 虚拟DOM Diff：~1-5ms for 1000 nodes
// 但虚拟DOM可以合并100次操作为1次！
```

### 🔍 追问链

1. **JSX和虚拟DOM的关系？**
   → 方向：JSX只是语法糖，编译后就是React.createElement调用，返回虚拟DOM对象

2. **React 18中的自动批处理对虚拟DOM的影响？**
   → 方向：所有状态更新都会被批处理，减少调和次数，详见Q08

3. **虚拟DOM的局限性有哪些？**
   → 方向：初始渲染开销、内存占用、不适合高频实时更新场景

---

## Q06: React的Diff算法是怎样的？为什么是O(n)复杂度？

- **难度**：★☆☆
- **知识点**：Diff算法 / 时间复杂度 / 同层比较 / Key的作用
- **题型**：简答题
- **关联源码**：`packages/react-reconciler/src/ReactChildFiber.js:行200-600`

### 参考答案要点：

#### 1. **Diff算法的设计原则**

React基于三个假设对传统Diff算法进行了优化：

```javascript
// 传统树Diff算法：O(n³) 复杂度
// - 1000个节点需要进行 10亿次比较
// - 在前端场景下不可接受

// React的优化策略（三大假设）：
// 1. 不同类型的元素会产生不同的树（Web中很少跨层级移动DOM）
// 2. 开发者可以通过key属性标识哪些子元素在不同渲染下保持稳定
// 3. 对于稳定结构的列表，只做同层级的比较

// 结果：将复杂度从 O(n³) 降低到 O(n)
```

#### 2. **Diff算法的三个层次**

```javascript
// packages/react-reconciler/src/ReactChildFiber.js
function reconcileChildrenArray(
  returnFiber,
  currentFirstChild,
  newChildren,
  lanes
) {
  // 层次1：Tree Diff（树对比）
  // - 如果父节点不同，直接销毁整个子树
  // - 不进行跨层级的复用
  
  // 层次2：Component Diff（组件对比）
  // - 如果是同一类组件，更新props
  // - 如果不是，标记为删除旧组件，创建新组件
  
  // 层次3：Element Diff（元素对比）
  // - 对同一层级的子节点列表进行Diff
  // - 这是最复杂的部分，分为多种情况
}
```

#### 3. **同层级Diff的具体策略**

```javascript
// 单节点Diff
function reconcileSingleElement(returnFiber, currentFirstChild, element, lanes) {
  const key = element.key;
  let child = currentFirstChild;
  
  while (child !== null) {
    // 1. 首先比较key
    if (child.key === key) {
      // 2. key相同再比较type
      if (child.elementType === element.type) {
        // key和type都相同，复用该节点
        deleteRemainingChildren(returnFiber, child.sibling);
        const existing = useFiber(child, element.props);
        existing.ref = coerceRef(returnFiber, child, element);
        return existing;
      } else {
        // key相同但type不同，删除所有旧节点
        deleteRemainingChildren(returnFiber, child);
        break;
      }
    } else {
      // key不同，继续查找下一个兄弟节点
      deleteChild(returnFiber, child);
    }
    child = child.sibling;
  }
  
  // 没有找到可复用的节点，创建新节点
  return createFiberFromElement(element, returnFiber.mode, lanes);
}

// 多节点Diff（核心难点）
function reconcileChildrenArray(...) {
  // 算法步骤：
  // 1. 第一轮遍历：处理更新的情况（key和type都相同的节点）
  // 2. 第二轮遍历：处理新增/删除/移动的情况
  
  // 具体实现涉及复杂的索引和最长递增子序列算法
  // 详见Q38的手写实现
}
```

#### 4. **O(n)复杂度的证明**

```javascript
// 为什么是O(n)？
// 因为React做了以下限制：

// 1. 只比较同一层级的节点
//    - 不跨层级比较（避免递归）
//    - 复杂度：O(层数 × 每层平均节点数)

// 2. 同一层级内：
//    - 单节点比较：线性扫描 O(n)
//    - 多节点比较：两次遍历 + 最长递增子序列 O(n log n)

// 3. 实际场景：
//    - UI树通常比较扁平（深度有限）
//    - 同层节点数量通常不大
//    - 所以总体接近 O(n)

// 对比：
// 完整Diff:  O(n³)  - 不可用
// React Diff: O(n)   - 可用且有良好性能
```

### 🔍 追问链

1. **Key的作用是什么？使用index作为key有什么问题？**
   → 方向：key帮助React识别节点身份，index作为key可能导致错误的复用，详见Q15

2. **多节点Diff的最长递增子序列算法？**
   → 方向：这是多节点Diff优化的核心技术，详见Q38

3. **React Diff和Vue的Diff算法有什么区别？**
   → 方向：Vue使用双端比较，React使用单端+key映射

---

## Q07: React的事件系统是如何实现的？什么是合成事件？

- **难度**：★☆☆
- **知识点**：事件系统 / 合成事件 / 事件委托 / 跨浏览器兼容
- **题型**：简答题
- **关联源码**：`packages/events/PluginModuleSystem.js` 和 `packages/dom-events/ReactDOMEventListener.js`

### 参考答案要点：

#### 1. **合成事件的概念**

合成事件（SyntheticEvent）是React对浏览器原生事件的跨浏览器封装，它提供了统一的API接口。

```javascript
// 原生事件 vs 合成事件
// 原生事件：
element.addEventListener('click', function(e) {
  e.stopPropagation();  // 不同浏览器可能行为不一致
  e.preventDefault();   // IE8及以下不支持
});

// React合成事件：
<button onClick={(e) => {
  // e 是 SyntheticEvent 对象
  e.stopPropagation();  // 统一的行为
  e.preventDefault();   // 所有浏览器一致
  e.persist();          // 可选：保留事件对象（React 17+已废弃）
}}>
  Click me
</button>

// SyntheticEvent的结构
const syntheticEvent = {
  nativeEvent: nativeEvent,  // 底层原生事件
  type: 'click',              // 事件类型
  target: buttonElement,      // 目标元素
  currentTarget: buttonElement, // 当前元素（冒泡过程中的当前元素）
  bubbles: true,              // 是否冒泡
  cancelable: true,           // 是否可取消
  defaultPrevented: false,    // 是否已阻止默认行为
  eventPhase: 3,              // 事件阶段
  isTrusted: true,            // 是否可信事件
  timeStamp: Date.now(),      // 时间戳
  
  // 方法
  stopPropagation: fn,        // 阻止冒泡
  stopImmediatePropagation: fn, // 立即停止传播
  preventDefault: fn,         // 阻止默认行为
  persist: fn                 // 持久化（React 17+已废弃）
};
```

#### 2. **事件委托机制**

```javascript
// React 17之前：事件绑定在document上
// React 17+：事件绑定在root容器上

// packages/dom-events/ReactDOMEventListener.js
function listenToAllSupportedEvents(rootContainerElement) {
  // 1. 监听所有支持的事件类型
  allNativeEvents.forEach((domEventName) => {
    // 2. 不是委托事件则特殊处理
    if (!nonDelegatedEvents.has(domEventName)) {
      // 3. 在root上注册事件监听（捕获阶段）
      listenToNativeEvent(
        domEventName, 
        isCapturePhaseListener, 
        rootContainerElement
      );
    }
    
    // 4. 注册冒泡阶段监听
    listenToNativeEvent(
      domEventName, 
      !isCapturePhaseListener, 
      rootContainerElement
    );
  });
}

// 事件触发流程：
// 1. 用户点击按钮
// 2. 浏览器触发原生click事件（冒泡到root）
// 3. root上的统一处理器接收事件
// 4. 根据event.target找到对应的React组件
// 5. 构建SyntheticEvent对象
// 6. 按照组件层级模拟冒泡/捕获过程
// 7. 调用对应的onClick handler
```

#### 3. **事件系统的优势**

| 特性 | 说明 |
|------|------|
| **跨浏览器兼容** | 统一IE/Chrome/Firefox的事件行为 |
| **事件池化** | 复用事件对象，减少GC压力（React 16） |
| **统一接口** | 提供一致的API，无需写兼容代码 |
| **更好的性能** | 减少事件监听器数量（委托到root） |
| **插件系统** | 支持自定义事件插件扩展 |

#### 4. **React 17的变化**

```javascript
// React 16及以前：
document.addEventListener('click', dispatchEvent);

// React 17+：
rootContainer.addEventListener('click', dispatchEvent);

// 好处：
// 1. 多个React应用可以共存
// 2. 微前端架构更友好
// 3. 与其他库（jQuery等）冲突更少
// 4. 事件冒泡更符合直觉（不会冒泡到document外）

// 其他变化：
// - 移除了事件池（不再需要e.persist()）
// - onStopPropagation不再阻止原生事件传播
```

### 🔍 追问链

1. **为什么使用事件委托而不是在每个元素上绑定？**
   → 方向：性能优化（减少监听器数量）、内存节省、动态元素自动生效

2. **合成事件的生命周期是怎样的？**
   → 方向：创建→分发→回收（React 16的事件池机制），详见Q26

3. **如何阻止合成事件的冒泡但不阻止原生事件？**
   → 方向：React 17中stopPropagation只影响React事件系统

---

## Q08: 什么是React的批量更新（Batching）？Automatic Batching是什么？

- **难度**：★☆☆
- **知识点**：批量更新 / Automatic Batching / 性能优化 / 状态管理
- **题型**：简答题
- **关联源码**：`packages/react-reconciler/src/ReactFiberWorkLoop.js:行500-600`

### 参考答案要点：

#### 1. **批量更新的定义**

批量更新（Batching）是指React将多个状态更新合并为一次重新渲染的优化技术。

```javascript
// ❌ 没有批量更新（每次setState都重新渲染）
function handleClick() {
  setState1(1);  // 渲染1次
  setState2(2);  // 渲染1次
  setState3(3);  // 渲染1次
  // 总共渲染3次
}

// ✅ 有批量更新（合并为1次渲染）
function handleClick() {
  setState1(1);  // 入队
  setState2(2);  // 入队
  setState3(3);  // 入队
  // 合并为1次渲染
}
```

#### 2. **React 18之前的批量更新限制**

```javascript
// React 17及以前：
// 只有在React事件处理函数中才会自动批量更新

// ✅ 自动批量（React事件中）
handleClick() {
  setCount(c => c + 1);  // 批量
  setName('test');        // 批量
  // 只渲染1次
}

// ❌ 不批量（异步/原生事件中）
setTimeout(() => {
  setCount(c => c + 1);  // 立即渲染
  setName('test');        // 立即渲染
  // 渲染2次
});

fetch('/api').then(() => {
  setCount(c => c + 1);  // 立即渲染
  setName('test');        // 立即渲染
  // 渲染2次
});

element.addEventListener('click', () => {
  setCount(c => c + 1);  // 立即渲染
  setName('test');        // 立即渲染
  // 渲染2次
});
```

#### 3. **Automatic Batching（React 18）**

```javascript
// React 18 引入 Automatic Batching
// 所有状态更新默认都会被批量处理！

import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// ✅ 全部自动批量
function handleClick() {
  // React事件中
  setCount(c => c + 1);  // 批量
  setName('test');        // 批量
  // 1次渲染
}

function fetchData() {
  // Promise/async中
  fetch('/api').then(() => {
    setCount(c => c + 1);  // ✅ 批量（React 18新特性）
    setName('test');        // ✅ 批量
    // 1次渲染
  });
}

function handleTimeout() {
  // setTimeout/setInterval中
  setTimeout(() => {
    setCount(c => c + 1);  // ✅ 批量
    setName('test');        // ✅ 批量
    // 1次渲染
  });
}
```

#### 4. **实现原理**

```javascript
// packages/react-reconciler/src/ReactFiberWorkLoop.js
// 批量更新的核心：executionContext标志位

let executionContext = NoContext;
const BatchedContext = 0b01;        // 批量更新上下文
const RenderContext = 0b10;         // 渲染上下文

// 进入批量更新模式
function batchedUpdates(fn, a) {
  const previousExecutionContext = executionContext;
  executionContext |= BatchedContext;  // 设置批量标志
  
  try {
    return fn(a);
  } finally {
    executionContext = previousExecutionContext;
    
    // 如果不在渲染上下文中，执行所有排队的更新
    if (executionContext === NoContext) {
      flushSyncCallbackQueue();  // 刷新队列
    }
  }
}

// React 18: 使用 transitions 区分优先级
// 高优先级更新（用户交互）：立即处理
// 低优先级更新（数据获取）：延迟批量处理
```

#### 5. **退出批量更新**

```javascript
import { flushSync } from 'react-dom';

// 如果需要在某些情况下强制同步更新
function handleClick() {
  flushSync(() => {
    setCount(c => c + 1);  // 强制立即渲染
  });
  
  console.log(countRef.current);  // 可以拿到最新的DOM
  
  setName('test');  // 这个会单独渲染
  // 总共2次渲染
}

// 适用场景：
// 1. 需要立即访问更新后的DOM
// 2. 依赖外部库需要在DOM更新后执行
// 3. 批量更新导致某些副作用时序问题时
```

### 🔍 追问链

1. **批量更新是如何实现的？executionContext的作用？**
   → 方向：通过全局变量标记当前执行上下文，决定是否入队还是立即执行

2. **flushSync的使用场景和注意事项？**
   → 方向：强制同步更新可能导致性能问题，应谨慎使用

3. **startTransition与批量更新的关系？**
   → 方向：startTransition标记低优先级更新，可以被更高优先级任务中断

---

## Q09: React Context的底层实现原理是什么？

- **难度**：★☆☆
- **知识点**：Context / Provider / Consumer / 状态共享
- **题型**：代码分析题
- **关联源码**：`packages/react/src/ReactContext.js` 和 `packages/react-reconciler/src/ReactFiberNewContext.js`

### 参考答案要点：

#### 1. **Context的基本用法**

```javascript
// 创建Context
const ThemeContext = createContext('light');

// Provider提供值
function App() {
  const [theme, setTheme] = useState('dark');
  
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// Consumer消费值
function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Toolbar</div>;
}
```

#### 2. **Context的数据结构**

```javascript
// packages/react/src/ReactContext.js
export function createContext(defaultValue) {
  const context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,       // 当前值
    _currentValue2: defaultValue,      // 用于并发模式的值
    _threadCount: 0,                   // 并发计数
    Provider: null,                    // Provider组件（下面设置）
    Consumer: null,                    // Consumer组件
    displayName: null,                 // 调试名称
    _defaultValue: defaultValue,       // 默认值
    _globalName: null,
  };

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context,
  };

  context.Consumer = context;
  
  return context;
}
```

#### 3. **Context的传递机制**

```javascript
// packages/react-reconciler/src/ReactFiberNewContext.js
// Context值沿着Fiber树向下传播

// 1. Provider更新时，标记所有消费者需要更新
function propagateContextChange(workInProgress, context, changedBits, renderLanes) {
  let fiber = workInProgress.child;
  
  while (fiber !== null) {
    // 遍历子树，找到所有消费该Context的组件
    const nextFiber = fiber;
    
    // 检查这个组件是否依赖该Context
    const list = nextFiber.dependencies?.firstContext;
    if (list !== null) {
      // 标记该组件需要更新
      nextFiber.lanes = mergeLanes(nextFiber.lanes, renderLanes);
      // ... 递归处理子节点
    }
    
    fiber = fiber.sibling || fiber.child;
  }
}

// 2. 消费者读取Context值
function readContext(context) {
  const value = context._currentValue;
  
  // 将依赖关系记录到当前fiber
  if (lastContextDependency === null) {
    lastContextDependency = {
      context: context,
      observedBits: observedBits,
      next: null,
    };
    currentlyRenderingFiber.dependencies = {
      lanes: NoLanes,
      firstContext: lastContextDependency,
    };
  }
  
  return value;
}
```

#### 4. **Context的性能优化**

```javascript
// 问题：Context值变化时，所有消费者都会重新渲染
// 即使消费者只用到了Context的一部分

// 解决方案1：拆分Context
const ThemeContext = createContext({ theme: 'light', color: 'blue' });

// ❌ 任何属性变化都会导致所有消费者更新
<ThemeContext.Provider value={{ theme, color }}>
  <ComponentA />  {/* 只用theme */}
  <ComponentB />  {/* 只用color */}
</ThemeContext.Provider>

// ✅ 拆分为两个Context
const ThemeModeContext = createContext('light');
const ColorContext = createContext('blue');

// 解决方案2：使用Memoization
function ExpensiveComponent() {
  const theme = useContext(ThemeContext);
  
  // 使用useMemo避免不必要的重计算
  const computedStyle = useMemo(() => ({
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#333'
  }), [theme]);
  
  return <div style={computedStyle}>...</div>;
}

// 解决方案3：拆分组件
function Parent() {
  const { theme, color } = useContext(ThemeContext);
  return (
    <>
      <ThemeConsumer value={theme} />
      <ColorConsumer value={color} />
    </>
  );
}
```

### 🔍 追问链

1. **嵌套Context的覆盖规则？**
   → 方向：最近的Provider会覆盖外层的值，类似于CSS的层叠规则

2. **Context与Redux的区别？何时使用哪个？**
   → 方向：Context适合简单的主题/语言等全局状态，Redux适合复杂的应用状态管理

3. **如何在Context变化时避免不必要的重渲染？**
   → 方向：拆分Context、使用React.memo、使用useMemo/useCallback

---

## Q10: useMemo和useCallback的区别？它们如何优化性能？

- **难度**：★☆☆
- **知识点**：useMemo / useCallback / 性能优化 / 记忆化
- **题型**：简答题
- **关联源码**：`packages/react-reconciler/src/ReactFiberHooks.js:行2500-2700`

### 参考答案要点：

#### 1. **基本定义与区别**

```javascript
// useMemo: 缓存计算结果（值）
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// useCallback: 缓存函数本身（函数引用）
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// 本质关系：
// useCallback(fn, deps) ≈ useMemo(() => fn, deps)

// 它们的区别：
// useMemo 返回的是【计算的结果】
// useCallback 返回的是【函数本身】（未调用的）
```

#### 2. **底层实现原理**

```javascript
// packages/react-reconciler/src/ReactFiberHooks.js

// useMemo 实现
function updateMemo(create, deps) {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  
  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps = prevState[1];
      // 比较依赖
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        // 依赖没变，返回缓存的结果
        return prevState[0];
      }
    }
  }
  
  // 依赖变了，重新计算
  const nextValue = create();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

// useCallback 实现
function updateCallback(callback, deps) {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  
  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps = prevState[1];
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];  // 返回缓存的函数引用
      }
    }
  }
  
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```

#### 3. **使用场景对比**

```javascript
// ✅ useMemo适用场景：昂贵的计算
function ProductList({ products, filter }) {
  // 过滤和排序是耗时操作，用useMemo缓存
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.name.includes(filter))
      .sort((a, b) => a.price - b.price);
  }, [products, filter]);
  
  return (
    <ul>
      {filteredProducts.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}

// ✅ useCallback适用场景：传递给子组件的回调
function Parent({ onItemClick }) {
  // 保持函数引用稳定，避免子组件不必要的重渲染
  const handleClick = useCallback((id) => {
    onItemClick(id);
    console.log('clicked:', id);
  }, [onItemClick]);
  
  return <Child onClick={handleClick} />;
}

// ❌ 错误使用：简单计算不需要useMemo
function BadExample({ a, b }) {
  // 这种简单计算不需要缓存，反而增加开销
  const sum = useMemo(() => a + b, [a, b]);
  return <div>{sum}</div>;
}
```

#### 4. **性能优化效果**

```javascript
// 性能测试示例
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // ❌ 每次渲染都创建新的函数
  const badHandler = () => {
    console.log(name);
  };
  
  // ✅ 只有name变化时才创建新函数
  const goodHandler = useCallback(() => {
    console.log(name);
  }, [name]);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      
      {/* Child组件使用了React.memo */}
      {/* 用badHandler时，每次count变化都会导致Child重渲染 */}
      {/* 用goodHandler时，只有name变化才导致Child重渲染 */}
      <Child onClick={goodHandler} />
    </div>
  );
}

// 性能对比：
// 无优化：每次App重渲染 → Child也重渲染（即使props没变）
// 有优化：只有name变化 → Child才重渲染
// 节省：N次不必要的Child渲染（N = count变化的次数）
```

### 🔍 追问链

1. **依赖数组的比较是深比较还是浅比较？**
   → 方向：Object.is的浅比较，对于对象/数组只比较引用

2. **useMemo/useCallback的内存开销？**
   → 方向：会缓存值直到组件卸载或依赖变化，需要注意内存泄漏风险

3. **什么时候不需要使用useMemo/useCallback？**
   → 方向：简单计算、非性能瓶颈、过早优化

---

## Q11: React的Scheduler调度器是如何工作的？

- **难度**：★☆☆
- **知识点**：Scheduler / 任务调度 / 优先级 / 时间切片
- **题型**：简答题
- **关联源码**：`packages/scheduler/src/Scheduler.js` 和 `packages/scheduler/src/SchedulerMinHeap.js`

### 参考答案要点：

#### 1. **Scheduler的作用**

Scheduler是React的任务调度器，负责管理任务的执行顺序和时间分配，是实现并发特性的基础。

```javascript
// Scheduler的核心职责：
// 1. 任务优先级管理（哪个任务先执行）
// 2. 时间切片（每个任务执行多久）
// 3. 任务调度（何时执行、如何中断恢复）
// 4. 资源分配（CPU时间如何分配给不同任务）
```

#### 2. **优先级模型**

```javascript
// packages/scheduler/src/SchedulerPriorities.js
export const ImmediatePriority = 1;    // 最高优先级：同步任务
export const UserBlockingPriority = 2; // 用户阻塞：用户交互
export const NormalPriority = 3;       // 普通：数据获取等
export const LowPriority = 4;          // 低优先级：分析等
export const IdlePriority = 5;         // 空闲：隐藏任务

// 对应React的场景：
// - Immediate: useState同步更新、flushSync
// - UserBlocking: 点击、输入、滚动等用户交互
// - Normal: 数据请求完成、setState回调
// - Low: 分析报告、日志上报
// - Idle: 离屏组件预渲染、后台数据同步
```

#### 3. **任务调度流程**

```javascript
// packages/scheduler/src/Scheduler.js
function unstable_scheduleCallback(priorityLevel, callback, options) {
  // 1. 获取当前时间
  var currentTime = getCurrentTime();
  
  // 2. 计算任务的开始时间和超时时间
  var startTime;
  if (typeof options === 'object' && options !== null) {
    startTime = options.delay;
  } else {
    startTime = currentTime;
  }
  
  var timeout;
  switch (priorityLevel) {
    case ImmediatePriority:
      timeout = IMMEDIATE_PRIORITY_TIMEOUT;  // -1（立即执行）
      break;
    case UserBlockingPriority:
      timeout = USER_BLOCKING_PRIORITY_TIMEOUT; // 250ms
      break;
    case IdlePriority:
      timeout = IDLE_PRIORITY_TIMEOUT;  // 永不超时
      break;
    case LowPriority:
      timeout = LOW_PRIORITY_TIMEOUT;  // 10s
      break;
    case NormalPriority:
    default:
      timeout = NORMAL_PRIORITY_TIMEOUT; // 5s
      break;
  }
  
  // 3. 创建任务对象
  var newTask = {
    id: taskIdCounter++,
    callback,           // 回调函数
    priorityLevel,      // 优先级
    startTime,          // 开始时间
    expirationTime: startTime + timeout,  // 过期时间
    sortIndex: -1,      // 排序索引
  };
  
  // 4. 根据开始时间决定放入哪个队列
  if (startTime > currentTime) {
    // 延迟任务：放入timerQueue
    newTask.sortIndex = startTime;
    push(timerQueue, newTask);
    // 设置定时器
    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
      // 如果taskQueue为空且这是最早的延迟任务
      requestHostTimeout(handleTimeout, startTime - currentTime);
    }
  } else {
    // 即时任务：放入taskQueue
    newTask.sortIndex = expirationTime;
    push(taskQueue, newTask);
    
    // 如果调度器空闲，开始调度
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);  // 通知宿主环境
    }
  }
  
  return newTask;
}
```

#### 4. **时间切片的实现**

```javascript
// packages/scheduler/src/Scheduler.js
function shouldYieldToHost() {
  // 获取当前时间
  const timeElapsed = getCurrentTime() - startTime;
  
  // 如果超过了时间片（5ms），建议让出主线程
  if (timeElapsed < frameInterval) {
    return false;  // 还没到时间，继续执行
  }
  
  // 检查是否有更高优先级的任务需要处理
  if (enableIsInputPending) {
    if (navigator.scheduling?.isInputPending()) {
      return true;  // 有用户输入等待处理
    }
  }
  
  return true;  // 时间片用完，应该让出
}

// 工作循环
function workLoop(hasTimeRemaining, initialTime) {
  let currentTime = initialTime;
  
  while (currentTask !== null && !(enableIsInputPending && isInputPending())) {
    if (currentTask.expirationTime <= currentTime && 
        (!hasTimeRemaining || shouldYieldToHost())) {
      // 任务过期或时间片用完，中断当前任务
      break;
    }
    
    // 执行任务
    const callback = currentTask.callback;
    if (typeof callback === 'function') {
      currentTask.callback = null;
      const continuationCallback = callback(didUserCallbackTimeout);
      
      if (typeof continuationCallback === 'function') {
        // 任务返回了延续函数（还没完成）
        currentTask.callback = continuationCallback;
      } else {
        // 任务完成
        pop(taskQueue);
      }
    } else {
      // 任务已被取消
      pop(taskQueue);
    }
    
    currentTime = getCurrentTime();
  }
  
  // 如果还有更多任务，返回true（告诉宿主继续调度）
  return currentTask !== null;
}
```

#### 5. **调度器的架构图**

```
┌──────────────────────────────────────────────┐
│                  React 应用                   │
├──────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────────────┐  │
│  │  Reconciler  │  │    Renderer          │  │
│  │  (协调器)    │  │    (渲染器-DOM/Native)│  │
│  └──────┬──────┘  └──────────┬───────────┘  │
│         │                    │               │
│         └────────┬───────────┘               │
│                  ▼                           │
│         ┌─────────────────┐                  │
│         │    Scheduler    │                  │
│         │    (调度器)      │                  │
│         └────────┬────────┘                  │
│                  ▼                           │
│    ┌─────────────────────────┐               │
│    │   MessageChannel/       │               │
│    │   requestIdleCallback   │               │
│    │   (宿主环境API)         │               │
│    └─────────────────────────┘               │
└──────────────────────────────────────────────┘
```

### 🔍 追问链

1. **Scheduler如何实现任务的中断和恢复？**
   → 方向：通过返回continuationCallback函数实现协作式调度

2. **为什么使用MessageChannel而不是requestIdleCallback？**
   → 方向：浏览器兼容性和精度问题，详见Q20

3. **任务优先级是如何影响用户体验的？**
   → 方向：高优先级任务（用户交互）能打断低优先级任务（数据渲染）

---

## Q12: Suspense组件的作用是什么？它是如何工作的？

- **难度**：★☆☆
- **知识点**：Suspense / 懒加载 / 异步数据 / 边界
- **题型**：简答题
- **关联源码**：`packages/react/src/ReactSuspense.js` 和 `packages/react-reconciler/src/ReactFiberSuspenseComponent.js`

### 参考答案要点：

#### 1. **Suspense的基本概念**

Suspense让组件可以"等待"某个异步操作完成后再渲染，期间显示fallback UI。

```javascript
// 基本用法：代码分割（懒加载）
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}

// 异步数据获取（实验性功能）
function DataFetcher() {
  const resource = fetchData();  // 抛出Promise
  
  return <div>{resource.data.read()}</div>;  // 可能抛出Promise
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <DataFetcher />
    </Suspense>
  );
}
```

#### 2. **Suspense的工作原理**

```javascript
// Suspense的核心机制：异常捕获

// packages/react-reconciler/src/ReactFiberThrow.js
// 当组件抛出特殊对象时，React会特殊处理：

// 1. 抛出Promise → 暂停渲染，显示fallback
// 2. 抛出Thenable → 同上（兼容性）
// 3. 其他错误 → 由Error Boundary处理

function throwException(
  returnFiber,
  sourceFiber,
  value,
  rootRenderLanes
) {
  // The source fiber did not complete.
  sourceFiber.flags |= Incomplete;
  
  // 检查抛出的值类型
  if (typeof value === 'object' && value !== null) {
    // 可能是Promise或Thenable
    switch (value.$$typeof) {
      case REACT_PROMISE_TYPE:
        // 处理Promise
        handlePromise(value, sourceFiber, rootRenderLanes);
        return;
      case REACT_LAZY_TYPE:
        // 处理懒加载
        handleLazy(value, sourceFiber);
        return;
    }
  }
  
  // 其他错误，向上寻找Error Boundary
  // ...
}

// Suspense边界捕获Promise后的处理
function attachSuspenseRetryFiber(fiber, thenable, wakeable) {
  // 1. 将thenable附加到Suspense组件
  // 2. 当Promise resolve时，重新渲染
  // 3. 显示fallback UI
}
```

#### 3. **Suspense的数据流**

```javascript
// 数据加载流程：

// Step 1: 组件尝试读取数据
function UserProfile({ userId }) {
  const user = userCache.read(userId);  // 如果数据未准备好，抛出Promise
  return <div>{user.name}</div>;
}

// Step 2: Suspense捕获Promise
<Suspense fallback={<Skeleton />}>
  <UserProfile userId={123} />
</Suspense>

// Step 3: 显示fallback
// → 渲染 <Skeleton />

// Step 4: 数据准备完毕
// → Promise resolve
// → 触发重新渲染
// → 显示 <UserProfile />

// Step 5: 数据已缓存
// → 后续渲染直接使用缓存
// → 不会再显示fallback
```

#### 4. **Suspense的应用场景**

| 场景 | 示例 | 说明 |
|------|------|------|
| **代码分割** | `lazy(() => import(...))` | 按需加载大组件 |
| **数据获取** | `resource.read()` | 配合Relay/Apollo使用 |
| **图片加载** | 自定义Suspense | 图片加载中显示占位符 |
| **路由切换** | React Router v6 | 页面切换时的loading状态 |

### 🔍 追问链

1. **Suspense与Error Boundary的区别？**
   → 方向：Suspense处理异步操作（Promise），Error Boundary处理错误（throw error）

2. **多个嵌套Suspense如何协同工作？**
   → 方向：最近的Suspense会捕获Promise，可以实现分层loading

3. **Suspense for Data Fetching的生产就绪了吗？**
   → 方向：仍是实验性API，推荐配合 Relay、SWR 或 TanStack Query 使用

---

## Q13: React的服务端渲染（SSR）流程是怎样的？

- **难度**：★☆☆
- **知识点**：SSR / 服务端渲染 / hydration / SEO
- **题型**：简答题
- **关联源码**：`packages/react-server/src/ReactFizzServer.js` 和 `packages/react-dom/server`

### 参考答案要点：

#### 1. **SSR的基本概念**

服务端渲染（Server-Side Rendering）是指在服务器上生成完整的HTML字符串，然后发送给客户端。

```javascript
// 客户端渲染（CSR）流程：
// 1. 浏览器请求页面
// 2. 服务器返回空HTML（<div id="root"></div>）
// 3. 浏览器下载JS bundle
// 4. JS执行，生成DOM
// 5. 用户看到内容（白屏时间长）

// 服务端渲染（SSR）流程：
// 1. 浏览器请求页面
// 2. 服务器执行React代码，生成HTML
// 3. 服务器返回完整HTML（带内容）
// 4. 浏览器立即显示内容（首屏快）
// 5. 浏览器下载JS（hydration）
// 6. JS接管页面，添加交互
```

#### 2. **SSR的实现流程**

```javascript
// 服务端代码（Node.js）
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

const app = express();

app.get('/', (req, res) => {
  // 1. 将React组件渲染为HTML字符串
  const html = renderToString(<App />);
  
  // 2. 返回完整HTML
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>SSR App</title></head>
      <body>
        <div id="root">${html}</div>
        
        <!-- 注入初始状态 -->
        <script>window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script>
        
        <!-- 客户端bundle -->
        <script src="/client.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000);
```

#### 3. **Hydration过程**

```javascript
// 客户端代码
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(
  document.getElementById('root'),
  <App />
);

// Hydration的过程：
// 1. React解析已有的DOM结构
// 2. 构建虚拟DOM树
// 3. 比较服务端生成的DOM和客户端期望的DOM
// 4. 附加事件监听器
// 5. 接管后续的状态管理和更新

// 注意事项：
// - 服务端和客户端必须渲染相同的内容
// - 否则会报hydration mismatch警告
// - class → className（服务端是HTML规范）
// - 自定义属性需要data-前缀
```

#### 4. **SSR的优缺点**

| 优点 | 缺点 |
|------|------|
| ✅ 首屏加载快（FCP/LCP好） | ❌ TTFB可能变慢（服务器要计算） |
| ✅ SEO友好（爬虫能看到内容） | ❌ 服务器资源消耗大 |
| ✅ 社交分享效果好 | ❌ 开发复杂度高 |
| ✅ 适用于弱网环境 | ❌ 需要Node.js服务器环境 |

### 🔍 追问链

1. **SSR与SSG（静态站点生成）的区别？**
   → 方向：SSR每次请求动态生成，SSG构建时生成静态文件（Next.js支持两种）

2. **Hydration Mismatch如何解决？**
   → 方向：确保服务端客户端一致性，使用dangerouslySetInnerHTML谨慎处理

3. **Streaming SSR是什么？**
   → 方向：React 18的流式渲染，分块发送HTML，详见React 18新特性

---

## Q14: useRef的实现原理是什么？它为什么不会触发重新渲染？

- **难度**：★☆☆
- **知识点**：useRef / 引用 / DOM访问 / 副作用
- **题型**：简答题
- **关联源码**：`packages/react-reconciler/src/ReactFiberHooks.js:行1400-1500`

### 参考答案要点：

#### 1. **useRef的基本用法**

```javascript
// 用法1：持久化存储（类似实例变量）
function Timer() {
  const intervalRef = useRef(null);
  
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log('tick');
    }, 1000);
    
    return () => clearInterval(intervalRef.current);
  }, []);
  
  return <div>Timer running</div>;
}

// 用法2：访问DOM元素
function TextInput() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();  // 直接操作DOM
  };
  
  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}
```

#### 2. **底层实现原理**

```javascript
// packages/react-reconciler/src/ReactFiberHooks.js

// useRef的实现
function mountRef(initialValue) {
  const hook = mountWorkInProgressHook();
  
  // 创建ref对象
  const ref = { current: initialValue };
  hook.memoizedState = ref;
  return ref;
}

function updateRef(initialValue) {
  const hook = updateWorkInProgressHook();
  return hook.memoizedState;  // 直接返回缓存的ref对象
}

// 关键点：
// 1. useRef返回的对象在整个组件生命周期内保持不变
// 2. 修改ref.current不会触发组件重新渲染
// 3. ref对象存储在fiber.memoizedState的Hook链表中
```

#### 3. **为什么不会触发重新渲染？**

```javascript
// useState vs useRef 的区别：

// useState：
function useStateExample() {
  const [count, setCount] = useState(0);
  
  // setCount会：
  // 1. 调度更新
  // 2. 标记fiber需要更新
  // 3. 触发重新渲染
  // 4. 返回新值
  
  return <div onClick={() => setCount(c => c + 1)}>{count}</div>;
}

// useRef：
function useRefExample() {
  const countRef = useRef(0);
  
  // countRef.current = 1 会：
  // 1. 直接修改对象的属性
  // 2. 不触发任何更新机制
  // 3. 不标记fiber
  // 4. 不触发重新渲染
  
  return <div onClick={() => countRef.current++}>{countRef.current}</div>;
  // ⚠️ 注意：这里不会显示更新后的值！因为不会重新渲染
}

// 核心原因：
// - useState的setter会调用dispatchAction，进入React的更新调度系统
// - useRef只是返回一个普通的JavaScript对象引用
// - 修改对象属性是JavaScript的基础操作，React无法感知
```

#### 4. **useRef的典型应用场景**

```javascript
// 场景1：保存上一个值
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// 场景2：避免闭包陷阱
function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  
  // 始终保持最新的count值
  useEffect(() => {
    countRef.current = count;
  }, [count]);
  
  const handleAlert = () => {
    // 使用ref而不是闭包中的count
    setTimeout(() => {
      alert('Current count: ' + countRef.current);
    }, 3000);
  };
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={handleAlert}>Show count after 3s</button>
    </div>
  );
}

// 场景3：命令式操作
function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  
  const play = () => videoRef.current.play();
  const pause = () => videoRef.current.pause();
  const seek = (time) => videoRef.current.currentTime = time;
  
  return (
    <video ref={videoRef} src={src}>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </video>
  );
}
```

### 🔍 追问链

1. **useRef和实例变量的区别？（Class组件）**
   → 方向：useRef是Hook版本的实例变量，功能类似但语法不同

2. **useRef可以用于什么不适合useState的场景？**
   → 方向：定时器ID、DOM引用、不需要触发渲染的中间值

3. **useRef的内存泄漏风险？**
   → 方向：ref保存的引用不会被自动清理，需要手动释放资源

---

## Q15: React的key属性在Diff算法中的作用？

- **难度**：★☆☆
- **知识点**：key / Diff算法 / 列表渲染 / 性能优化
- **题型**：简答题
- **关联源码**：`packages/react-reconciler/src/ReactChildFiber.js:行200-400`

### 参考答案要点：

#### 1. **key的作用**

key是React用来识别哪些元素被改变、添加或删除的特殊属性，它在Diff算法中起到关键的身份标识作用。

```javascript
// ❌ 没有key或使用index作为key的问题
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        // ⚠️ 使用index作为key
        <li key={index}>
          <input type="checkbox" checked={todo.done} />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// 问题场景：
// 初始状态：[{id: 1, text: 'A'}, {id: 2, text: 'B'}]
// 渲染：<li key=0>A</li> <li key=1>B</li>
// 删除第一个todo后：[{id: 2, text: 'B'}]
// 渲染：<li key=0>B</li>  ← React认为key=0的元素还在，只是text变了
// 结果：B的checkbox状态可能错误（保留了A的状态）
```

#### 2. **正确的key使用方式**

```javascript
// ✅ 使用稳定的唯一ID作为key
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        // ✅ 使用唯一ID
        <li key={todo.id}>
          <input type="checkbox" checked={todo.done} />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// 正确的Diff过程：
// 初始状态：[{id: 1, text: 'A'}, {id: 2, text: 'B'}]
// 渲染：<li key=1>A</li> <li key=2>B</li>
// 删除第一个todo后：[{id: 2, text: 'B'}]
// React发现key=1不存在了 → 删除A
// React发现key=2还存在 → 保留B
// 结果：正确！
```

#### 3. **key在Diff算法中的具体应用**

```javascript
// packages/react-reconciler/src/ReactChildFiber.js

// 单节点Diff中使用key
function reconcileSingleElement(returnFiber, currentFirstChild, element, lanes) {
  const key = element.key;
  let child = currentFirstChild;
  
  while (child !== null) {
    // TODO: If key === null and child.key === null, then this only applies to
    // the first item in the list.
    if (child.key === key) {
      // key匹配成功
      switch (child.tag) {
        case SameAsElement:
          // 类型也相同，复用该节点
          deleteRemainingChildren(returnFiber, child.sibling);
          return useFiber(child, element.props);
        default:
          // key相同但类型不同，删除旧节点
          deleteRemainingChildren(returnFiber, child);
          break;
      }
    } else {
      // key不匹配，删除该节点继续找
      deleteChild(returnFiber, child);
    }
    child = child.sibling;
  }
  
  // 没有找到匹配的节点，创建新节点
  return createFiberFromElement(element, returnFiber.mode, lanes);
}

// 多节点Diff中使用key建立映射
function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
  // ... 
  
  // 使用key建立map，快速查找
  const existingChildren = mapRemainingChildren(returnFiber, oldFiber);
  
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const key = newChild.key !== undefined ? newChild.key : i;
    
    // 从map中查找匹配的旧节点
    let matchedFiber = existingChildren.get(key) || null;
    
    if (matchedFiber !== null) {
      // 找到了，复用该节点
      newFiber = useFiber(matchedFiber, newChild.props);
      existingChildren.delete(key);
    } else {
      // 没找到，创建新节点
      newFiber = createFiberFromElement(newChild, ...);
    }
  }
  
  // 删除map中剩余的旧节点
  existingChildren.forEach((child) => deleteChild(returnFiber, child));
}
```

#### 4. **key的最佳实践**

| 场景 | 推荐 | 不推荐 |
|------|------|--------|
| **静态列表** | 不需要key或使用index | - |
| **动态列表（有ID）** | 使用数据的唯一ID | index |
| **无ID的动态列表** | 使用内容的hash | index（如果会排序/过滤） |
| **列表项可编辑** | 必须使用稳定ID | index（会导致输入框状态混乱） |
| **列表项有复杂状态** | 必须使用稳定ID | index（会导致状态错乱） |

### 🔍 追问链

1. **为什么不要用随机数作为key？**
   → 方向：每次渲染都生成新key，导致所有节点都被视为新节点，失去复用机会

2. **key必须是唯一的吗？同级列表内的唯一性要求？**
   → 方向：只需要在同级别兄弟节点中唯一即可，不同级别的可以重复

3. **Fragment可以使用key吗？**
   → 方向：可以，React.Fragment支持key属性

---

# 第二部分：★★☆ 进阶源码分析题（Q16-Q35）

---

## Q16: 详细分析React的完整渲染流程：从setState到DOM更新的全过程

- **难度**：★★☆
- **知识点**：渲染流程 / setState / 调和 / 提交 / DOM更新
- **题型**：架构设计题
- **关联源码**：`packages/react-reconciler/src/ReactFiberWorkLoop.js` 全文

### 参考答案要点：

#### 1. **整体流程概览**

```
┌─────────────────────────────────────────────────────────────┐
│                   React 渲染流水线                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌────────┐│
│  │ 1.触发更新 │ → │ 2.调度更新 │ → │ 3.渲染阶段 │ → │ 4.提交  ││
│  │ setState  │    │ schedule │    │ render   │    │ commit ││
│  └──────────┘    └──────────┘    └──────────┘    └────────┘│
│       │                │               │               │    │
│       ▼                ▼               ▼               ▼    │
│  创建update对象    加入更新队列     beginWork→      BeforeMutation│
│  标记fiber.lanes   计算优先级      completeWork→   Mutation    │
│                                   (调和/Diff)    Layout       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 2. **阶段一：触发更新（Trigger Update）**

```javascript
// 以useState为例
function dispatchAction(fiber, queue, action) {
  // Step 1: 创建update对象
  const update = {
    lane,
    action,
    hasEagerState: false,
    eagerState: null,
    next: null,
  };
  
  // Step 2: 将update加入queue（循环链表）
  const pending = queue.pending;
  if (pending === null) {
    update.next = update;  // 第一个update
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;
  
  // Step 3: 从fiber向上找到root
  const root = markUpdateLaneFromFiberToRoot(fiber, lane);
  
  // Step 4: 调度更新
  ensureRootIsScheduled(root, eventTime);
  
  // Step 5: 如果是同步更新，立即刷新
  if (lane === SyncLane && executionContext !== NoContext) {
    flushSyncCallbacks();
  }
}
```

#### 3. **阶段二：调度更新（Schedule Update）**

```javascript
// packages/react-reconciler/src/ReactFiberWorkLoop.js
function ensureRootIsScheduled(root, currentTime) {
  // Step 1: 检查是否已有调度任务
  const existingCallbackNode = root.callbackNode;
  
  // Step 2: 计算下一个任务的lane（最高优先级）
  const nextLanes = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes);
  
  if (nextLanes === NoLanes) {
    // 没有需要处理的更新
    return;
  }
  
  // Step 3: 获取调度优先级
  const newCallbackPriority = getHighestPriorityLane(nextLanes);
  
  // Step 4: 决定调度方式
  let newCallbackNode;
  if (newCallbackPriority === SyncLane) {
    // 同步任务：使用同步调度
    if (supportsMicrotasks) {
      scheduleMicrotask(performSyncWorkOnRoot);
    } else {
      scheduleCallback(ImmediateSchedulerPriority, performSyncWorkOnRoot);
    }
    newCallbackNode = null;
  } else if (newCallbackPriority === SyncTransitionLane) {
    // 过渡同步
    newCallbackNode = scheduleCallback(
      schedulerPriorityLevel,
      performConcurrentWorkOnRoot,
    );
  } else {
    // 并发任务
    newCallbackNode = scheduleCallback(
      schedulerPriorityLevel,
      performConcurrentWorkOnRoot,
    );
  }
  
  // Step 5: 保存回调节点
  root.callbackNode = newCallbackNode;
  root.callbackPriority = newCallbackPriority;
  root.callbackExpirationTime = expirationTime;
}
```

#### 4. **阶段三：渲染阶段（Render Phase）**

```javascript
// 渲染阶段是可中断的
function performSyncWorkOnRoot(root) {
  // 1. 获取最高优先级的lanes
  const lanes = getNextLanes(root, NoLanes);
  
  // 2. 开始渲染
  renderRootSync(root, lanes);
  
  // 3. 渲染完成，进入提交阶段
  const finishedWork = root.current.alternate;
  
  // 4. 提交更新
  commitRoot(root);
  
  return null;
}

// 渲染的核心工作循环
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}

// 处理单个工作单元
function performUnitOfWork(unitOfWork) {
  // beginWork：处理当前节点（调和子节点）
  const current = unitOfWork.alternate;
  let next = beginWork(current, unitOfWork, renderLanes);
  
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  
  if (next === null) {
    // 没有子节点，完成当前节点
    completeUnitOfWork(unitOfWork);
  } else {
    // 有子节点，继续处理子节点
    workInProgress = next;
  }
}
```

#### 5. **阶段四：提交阶段（Commit Phase）**

```javascript
// packages/react-reconciler/src/ReactFiberCommitWork.js
// 提交阶段是不可中断的，会同步执行所有DOM操作

function commitRoot(root) {
  // 1. 准备提交
  const finishedWork = root.finishedWork;
  const lanes = root.finishedLanes;
  
  // 2. 重置状态
  root.finishedWork = null;
  root.finishedLanes = NoLanes;
  
  // 3. 执行三个子阶段
  commitBeforeMutationEffects(root, finishedWork);  // BeforeMutation
  commitMutationEffects(root, finishedWork);          // Mutation
  commitLayoutEffects(root, finishedWork);            // Layout
  
  // 4. 通知调度器
  root.current = finishedWork;
  
  // 5. 检查是否有后续工作
  ensureRootIsScheduled(root, now());
}
```

### 🔍 追问链

1. **渲染阶段和提交阶段为什么一个可中断一个不可中断？**
   → 方向：渲染是纯计算，不影响用户界面；提交涉及DOM操作，必须原子性执行

2. **并发模式和同步模式的渲染流程有何不同？**
   → 方向：并发模式有时间切片和优先级调度，同步模式一次性执行完

3. **如何调试渲染流程？React DevTools Profiler如何工作？**
   → 方向：详见Q34

---

## Q17: React的Fiber双缓存机制（current/workInProgress）是如何工作的？

- **难度**：★★☆
- **知识点**：双缓存 / current树 / workInProgress树 / Fiber切换
- **题型**：代码分析题
- **关联源码**：`packages/react-reconciler/src/ReactFiberWorkLoop.js:行200-400`

### 参考答案要点：

#### 1. **双缓存的概念**

React维护两棵Fiber树：current树（当前屏幕显示的）和workInProgress树（正在构建的）。

```javascript
// 双缓存机制的直观理解：
// 类似于游戏的双缓冲技术：
// - 屏幕显示的是"前缓冲区"的内容
// - GPU正在渲染"后缓冲区"的内容
// - 渲染完成后，交换两个缓冲区
// - 这样用户看到的始终是完整的画面

// React的双缓存：
// - current树：对应"前缓冲区"，当前显示的UI
// - workInProgress树：对应"后缓冲区"，正在计算的UI
// - commit阶段：交换两棵树的引用
```

#### 2. **数据结构关系**

```javascript
// Fiber节点通过alternate字段连接
class FiberNode {
  constructor() {
    // 双缓存指针
    this.alternate = null;  // 指向另一棵树中的对应节点
    
    // 其他属性...
  }
}

// 示例：
// current树                          workInProgress树
// RootFiber                         RootFiber'
//   ├── AppFiber                      ├── AppFiber'        (alternate互指)
//   │   ├── HeaderFiber               │   ├── HeaderFiber'
//   │   └── ContentFiber              │   └── ContentFiber'
//   └── null                          └── null

// 关系：
// RootFiber.alternate === RootFiber'
// AppFiber.alternate === AppFiber'
// ...
```

#### 3. **双缓存的工作流程**

```javascript
// packages/react-reconciler/src/ReactFiberWorkLoop.js

// Step 1: 准备workInProgress树
function prepareFreshStack(root, lanes) {
  root.finishedWork = null;
  root.finishedLanes = NoLanes;
  
  // 从current树克隆workInProgress树
  const workInProgress = createWorkInProgress(root.current, lanes);
  root.workInProgress = workInProgress;
  
  return workInProgress;
}

// 创建或复用workInProgress
function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate;
  
  if (workInProgress === null) {
    // 首次渲染：创建新的workInProgress节点
    workInProgress = createFiber(
      current.tag,
      pendingProps,
      current.key,
      current.mode
    );
    workInProgress elementType = current.elementType;
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;
    
    // 建立alternate连接
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    // 更新：复用已有的workInProgress节点
    workInProgress.pendingProps = pendingProps;
    workInProgress.type = current.type;
    
    // 清除副作用标记（重新计算）
    workInProgress.flags = NoFlags;
    workInProgress.subtreeFlags = NoFlags;
    workInProgress.deletions = null;
  }
  
  // 复制关键属性
  workInProgress.childLanes = current.childLanes;
  workInProgress.lanes = current.lanes;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  
  return workInProgress;
}
```

#### 4. **Commit阶段的切换**

```javascript
// packages/react-reconciler/src/ReactFiberCommitWork.js
function commitRoot(root) {
  const finishedWork = root.finishedWork;
  const lanes = root.finishedLanes;
  
  // ... 执行beforeMutation/mutation/layout effects ...
  
  // 🔄 关键：交换current和workInProgress
  root.current = finishedWork;  // workInProgress变成新的current
  
  // 清理
  root.finishedWork = null;
  root.finishedLanes = NoLanes;
  
  // 继续调度剩余工作
  ensureRootIsScheduled(root, now());
  
  // 返回（如果有更多工作需要继续）
  return getContinuationForRoot(root, finishedWork, lanes);
}
```

#### 5. **双缓存的优势**

| 优势 | 说明 |
|------|------|
| **无闪烁** | 用户始终看到完整的UI，不会看到半成品 |
| **可中断** | 可以随时丢弃workInProgress树，不影响current |
| **高效复用** | 复用Fiber节点对象，减少GC压力 |
| **易于回滚** | 出错时可以直接回到current状态 |

### 🔍 追问链

1. **workInProgress树是在什么时候创建的？**
   → 方向：每次渲染开始时（prepareFreshStack），从current树克隆

2. **如果渲染被打断，workInProgress树怎么处理？**
   → 方向：直接丢弃，下次重新从current树克隆新的workInProgress

3. **双缓存和虚拟DOM的关系？**
   → 方向：双缓存是Fiber层面的优化，虚拟DOM是概念层面；两者配合工作

---

## Q18: useEffect和useLayoutEffect的区别？它们的实现差异在哪里？

- **难度**：★★☆
- **知识点**：useEffect / useLayoutEffect / 执行时机 / 副作用
- **题型**：代码分析题
- **关联源码**：`packages/react-reconciler/src/ReactFiberCommitWork.js:行500-700`

### 参考答案要点：

#### 1. **执行时机对比**

```
Timeline of React Render:

┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  Render Phase (可中断)                                        │
│  ├─ beginWork                                                │
│  ├─ processUpdateQueue                                       │
│  └─ completeWork                                             │
│                        ↓                                     │
│  Commit Phase (不可中断)                                      │
│  ├─ BEFORE_MUTATION                                          │
│  │   └─ getSnapshotBeforeUpdate / useLayoutEffect cleanup    │
│  │                                                            │
│  ├─ MUTATION                                                 │
│  │   └─ DOM插入/更新/删除 / useEffect cleanup                 │
│  │                                                            │
│  └─ LAYOUT                                                   │
│      ├─ useLayoutEffect CREATE                               │ ← 同步执行
│      ├─ componentDidMount / componentDidUpdate               │
│      └─ useEffect CREATE (异步调度)                           │ ← 浏览器绘制后
│                                                              │
│  Browser Paint                                               │ ← 浏览器绘制
│                                                              │
│  useEffect callbacks execute                                  │ ← 异步执行
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

#### 2. **源码实现差异**

```javascript
// packages/react-reconciler/src/ReactFiberHooks.js

// useEffect 的标记
const Passive = /*                    */ 0b00000000000000100000;
const PassiveStatic = /*              */ 0b00000000000100000000;

// useLayoutEffect 的标记
const Layout = /*                     */ 0b00000000000001000000;

// 注册effect时的区别
function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  currentlyRenderingFiber.flags |= fiberFlags;
  hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    undefined,
    nextDeps
  );
}

// useEffect调用：
mountEffectImpl(
  Passive | PassiveStatic,  // fiberFlags: Passive标记
  HookPassive,              // hookFlags
  create,
  deps
);

// useLayoutEffect调用：
mountEffectImpl(
  Update,                    // fiberFlags: Update标记
  HookLayout,                // hookFlags: HookLayout
  create,
  deps
);
```

#### 3. **执行时机详解**

```javascript
// packages/react-reconciler/src/ReactFiberCommitWork.js

// Mutation阶段：执行useEffect的cleanup
function commitMutationEffects(root, finishedWork) {
  // ...
  // 处理Unmount标记（包括useEffect的destroy）
  if (flags & Ref) {
    safelyDetachRef(finishedWork, finishedWork.return);
  }
  if (Deletion & flags) {
    commitDeletion(finishedWork, returnFiber);
  }
  // ...
}

// Layout阶段：同步执行useLayoutEffect
function commitLayoutEffects(finishedWork, root, committedLanes) {
  // ...
  // 同步执行useLayoutEffect的create
  if (flags & Update) {
    commitLayoutEffectOnFiber(root, current, finishedWork, committedLanes);
  }
  // ...
}

// Layout阶段后：异步调度useEffect
function commitRootImpl(root, renderPriorityLevel) {
  // ... beforeMutation和mutation阶段 ...
  
  // layout阶段
  commitLayoutEffects(finishedWork, root, committedLanes);
  
  // 📌 关键：异步调度useEffect
  if (
    (finishedWork.subtreeFlags & PassiveMask) !== NoFlags ||
    (finishedWork.flags & PassiveMask) !== NoFlags
  ) {
    // 使用scheduleCallback异步调度
    scheduleCallback(NormalSchedulerPriority, () => {
      flushPassiveEffects();  // 执行useEffect
    });
  }
}
```

#### 4. **使用场景对比**

```javascript
// ✅ useLayoutEffect适用场景：需要同步读取DOM布局
function Tooltip({ targetRef, content }) {
  const tooltipRef = useRef();
  
  useLayoutEffect(() => {
    // 在浏览器绘制前计算位置，避免闪烁
    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    // 根据target位置调整tooltip位置
    tooltipRef.current.style.top = `${targetRect.bottom}px`;
    tooltipRef.current.style.left = `${targetRect.left}px`;
  }, [content]);
  
  return <div ref={tooltipRef}>{content}</div>;
}

// ✅ useEffect适用场景：网络请求、订阅、日志
function DataFetcher({ userId }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // 异步操作，不需要阻塞绘制
    let cancelled = false;
    
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(json => {
        if (!cancelled) {
          setData(json);
        }
      });
    
    return () => { cancelled = true; };
  }, [userId]);
  
  return data ? <UserCard data={data} /> : <Loading />;
}

// ❌ 反例：在useEffect中读取布局信息
function BadExample() {
  useEffect(() => {
    // ⚠️ 这会在绘制后执行，可能导致视觉闪烁
    const rect = divRef.current.getBoundingClientRect();
    // 用户可能会看到位置跳动
  }, []);
}
```

### 🔍 追问链

1. **useLayoutEffect会导致性能问题吗？什么时候应该避免使用？**
   → 方向：它会阻塞浏览器绘制，耗时操作应改用useEffect

2. **SSR环境下useLayoutEffect会报警告吗？**
   → 方向：是的，因为服务端没有layout effects，建议用useEffect或在条件判断中区分

3. **能否混用useEffect和useLayoutEffect？它们的执行顺序？**
   → 方向：可以，useLayoutEffect先于useEffect执行（cleanup也是）

---

## Q19: React的lanes模型（优先级模型）是如何设计的？二进制位运算的应用

- **难度**：★★☆
- **知识点**：Lanes模型 / 优先级 / 位运算 / 任务调度
- **题型**：代码分析题
- **关联源码**：`packages/react-reconciler/src/ReactFiberLane.js`

### 参考答案要点：

#### 1. **Lanes模型的演进**

```javascript
// React 16: ExpirationTime模型（过期时间）
// - 使用数字表示优先级
// - 数字越小优先级越高
// - 问题：优先级粒度不够细，难以处理并发场景

// React 17+: Lanes模型（车道模型）
// - 使用二进制位表示优先级
// - 每一位代表一种"车道"
// - 支持位运算进行高效的优先级组合和比较
```

#### 2. **Lanes的二进制定义**

```javascript
// packages/react-reconciler/src/ReactFiberLane.js

// TotalLanes = 31位（32位整数，留符号位）

export const TotalLanes = 31;

// 同步车道（最高优先级）
export const SyncLane = /*                         */ 0b0000000000000000000000000000001;
export const InputContinuousHydrationLane = /*     */ 0b0000000000000000000000000000010;
export const InputContinuousLane = /*             */ 0b0000000000000000000000000000100;

// 默认车道
export const DefaultHydrationLane = /*            */ 0b0000000000000000000000000001000;
export const DefaultLane = /*                     */ 0b0000000000000000000000000010000;

// 过渡车道（startTransition）
const TransitionHydrationLane = /*                */ 0b0000000000000000000000000100000;
const TransitionLanes = /*                        */ 0b0000000001111111111111111000000;
// 共16个transition lane（用于并发更新）

// 重试车道
const RetryLanes = /*                             */ 0b00001111111111111111111100000000;
// 共11个retry lane

// 选择性车道（用于选择性 hydration）
export const SomeRetryLane = /*                   */ 0b00000100000000000000000000000000;

// 特殊标记
export const SelectiveHydrationLane = /*          */ 0b00010000000000000000000000000000;
export const NoLanes = /*                         */ 0b00000000000000000000000000000000;
export const NoLane = /*                          */ 0b00000000000000000000000000000000;
```

#### 3. **位运算操作**

```javascript
// 1. 合并lanes（OR运算）
const lanes1 = SyncLane;           // 0b...0001
const lanes2 = DefaultLane;        // 0b...1000
const merged = lanes1 | lanes2;    // 0b...1001

// 2. 检查是否包含某lane（AND运算）
const hasSyncLane = (merged & SyncLane) !== NoLanes;  // true

// 3. 移除某lane（AND NOT运算）
const withoutSync = merged & ~SyncLane;  // 0b...1000

// 4. 获取最高优先级lane（取最低位的1）
function getHighestPriorityLane(lanes) {
  return lanes & -lanes;  // 二进制技巧：取最低位的1
}

// 示例：
// lanes = 0b1010
// -lanes = 0b0110 (取反+1，二进制补码)
// lanes & -lanes = 0b0010 (得到最低位的1)

// 5. 检查lanes是否为空
const isEmpty = lanes === NoLanes;

// 6. 检查是否是lanes的子集
const isSubset = (subLanes & parentLanes) === subLanes;
```

#### 4. **Lanes的实际应用**

```javascript
// 场景1：更新调度
function markUpdateLaneFromFiberToRoot(sourceFiber, lane) {
  // 1. 标记sourceFiber及其祖先的lanes
  let node = sourceFiber;
  let parent = node.return;
  
  while (parent !== null) {
    parent.childLanes = mergeLanes(parent.childLanes, lane);
    node = parent;
    parent = node.return;
  }
  
  // 2. 返回root
  // root上汇总了所有待处理的lanes
}

// 场景2：获取下一个要处理的lane
function getNextLanes(root, wipLanes) {
  // 1. 获取root上所有待处理的lanes
  const pendingLanes = root.pendingLanes;
  
  if (pendingLanes === NoLanes) {
    return NoLanes;
  }
  
  // 2. 获取最高优先级的lane
  let nextLane = HighestLanePriority = getHighestPriorityLane(pendingLanes);
  
  // 3. 如果当前正在渲染，排除正在处理的lanes
  if (wipLanes !== NoLanes && wipLanes !== nextLane) {
    // ...
  }
  
  return nextLane;
}

// 场景3：处理batching
function mergeUpdateLanes(renderLanes, updateLane) {
  return mergeLanes(renderLanes, updateLane);
}
```

#### 5. **Lanes模型的优势**

| 特性 | ExpirationTime | Lanes |
|------|---------------|-------|
| **优先级粒度** | 粗（数字大小） | 细（每一位独立） |
| **并发支持** | 困难 | 天然支持（多位可同时存在） |
| **批量更新** | 需要特殊处理 | OR运算自然合并 |
| **饥饿问题** | 容易出现 | 通过lane复用解决 |
| **悬浮更新** | 不支持 | Transition lanes支持 |
| **计算效率** | O(1) | O(1)（位运算极快） |

### 🔍 追问链

1. **Transition Lanes的16个lane是如何轮转使用的？**
   → 方向：为了避免饥饿，transition updates会循环使用不同的lane

2. **Lanes如何解决饥饿问题？**
   → 方向：低优先级任务如果等待太久，会被提升到更高的retry lane

3. **为什么选择31位而不是使用更多位？**
   → 方向：JavaScript使用32位整数，需要留符号位，31位足够表达所有优先级

---

## Q20: React的时间切片（Time Slicing）是如何实现的？requestIdleCallback vs MessageChannel

- **难度**：★★☆
- **知识点**：时间切片 / 调度器 / MessageChannel / requestIdleCallback
- **题型**：代码分析题
- **关联源码**：`packages/scheduler/src/forks/SchedulerHostConfig.default.js`

### 参考答案要点：

#### 1. **时间切片的目标**

时间切片将长任务分解为小的片段，每段执行一小段时间后让出主线程，使浏览器能够响应用户输入。

```javascript
// 问题：长任务阻塞主线程
function longTask() {
  // 假设这个循环需要100ms
  for (let i = 0; i < 1000000; i++) {
    // 复杂计算
  }
  // 在这100ms内，用户的所有输入都无法响应！
}

// 解决方案：时间切片
function slicedTask(deadline) {
  const startTime = performance.now();
  
  while (hasMoreWork() && (deadline.timeRemaining() > 0 || deadline.didTimeout)) {
    doWorkUnit();
  }
  
  if (hasMoreWork()) {
    // 还有工作，请求下一个时间片
    requestIdleCallback(slicedTask);
  }
}
```

#### 2. **为什么不用requestIdleCallback？**

```javascript
// requestIdleCallback的问题：

// 问题1：浏览器兼容性差
// - Firefox不支持
// - Chrome实现有bug（触发频率不稳定）
// - Safari支持有限

// 问题2：触发频率太低
// - 只在浏览器空闲时触发
// - 触发间隔可能达到50ms+
// - 无法满足React 60fps的要求（16.67ms/帧）

// 问题3：优先级控制能力弱
// - 无法指定任务的优先级
// - 无法中断正在执行的低优先级任务

// 问题4：回调执行时间不确定
// - deadline.timeRemaining()可能返回0
// - 导致任务不断推迟（饥饿）
```

#### 3. **MessageChannel的实现**

```javascript
// packages/scheduler/src/forks/SchedulerHostConfig.default.js

let scheduledCallback = null;
let isMessageLoopRunning = false;
const channel = new MessageChannel();
const port = channel.port2;

// 监听消息（相当于宏任务）
channel.port1.onMessageEvent = performWorkUntilDeadline;

// 请求调度
function requestHostCallback(callback) {
  scheduledCallback = callback;
  
  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true;
    port.postMessage(null);  // 发送消息触发回调
  }
}

// 执行工作
function performWorkUntilDeadline() {
  if (scheduledCallback !== null) {
    const currentTime = getCurrentTime();
    
    // 计算截止时间（deadline）
    // frameYieldMs = 5ms（每帧最多工作5ms）
    deadline = currentTime + yieldInterval;
    
    // 判断是否有更多工作
    const hasMoreWork = scheduledCallback(hasTimeRemaining, currentTime);
    
    if (!hasMoreWork) {
      isMessageLoopRunning = false;
      scheduledCallback = null;
    } else {
      // 还有工作，继续调度（使用port.postMessage）
      port.postMessage(null);
    }
  } else {
    isMessageLoopRunning = false;
  }
}

// 为什么选择MessageChannel？
// 1. 产生宏任务（比setTimeout更精确）
// 2. 延迟远低于setTimeout（~0ms vs 4ms minimum）
// 3. 浏览器兼容性好（IE10+）
// 4. 可以产生异步执行的机会
```

#### 4. **shouldYield的实现**

```javascript
// packages/scheduler/src/Scheduler.js
const frameInterval = 5;  // 5ms时间片
let startTime = -1;

function shouldYieldToHost() {
  const timeElapsed = getCurrentTime() - startTime;
  
  if (timeElapsed < frameInterval) {
    // 还没到5ms，继续执行
    return false;
  }
  
  // 超过5ms了，检查是否可以让出
  if (enableIsInputPending) {
    // navigator.scheduling.isInputPending() API
    // 检测是否有用户输入等待处理
    if (navigator.scheduling !== undefined) {
      const scheduling = navigator.scheduling;
      if (!isInputPendingContinuousEnabled) {
        // 检测连续输入
        return scheduling.isInputPending();
      }
    }
  }
  
  // 时间片用完，或者有用户输入，应该让出
  return true;
}
```

#### 5. **时间切片的工作流程**

```
┌─────────────────────────────────────────────────────────┐
│                  时间切片工作流                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Task Start                                             │
│     │                                                   │
│     ▼                                                   │
│  ┌────────────────────────────────┐                     │
│  │  Work Loop (max 5ms)           │                     │
│  │  ├─ processFiber(node1)        │                     │
│  │  ├─ processFiber(node2)        │                     │
│  │  ├─ processFiber(node3)        │                     │
│  │  └─ check: time elapsed?       │                     │
│  │     ├─ Yes → Yield!            │                     │
│  │     └─ No  → Continue          │                     │
│  └──────────────┬─────────────────┘                     │
│                 │                                       │
│                 ▼ Yield                                 │
│     ┌───────────────────────┐                           │
│     │  Browser gets control │                           │
│     │  ├─ Handle input      │                           │
│     │  ├─ Paint/UI update   │                           │
│     │  └─ Run other tasks   │                           │
│     └───────────┬───────────┘                           │
│                 │                                       │
│                 ▼ Resume                                │
│  ┌────────────────────────────────┐                     │
│  │  Work Loop continues          │                     │
│  │  ├─ processFiber(node4)        │                     │
│  │  ├─ processFiber(node5)        │                     │
│  │  └─ ... until done             │                     │
│  └────────────────────────────────┘                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 🔍 追问链

1. **5ms的时间片长度是如何确定的？**
   → 方向：经验值，平衡渲染进度和响应速度，留给浏览器约11ms处理其他事情

2. **navigator.scheduling.isInputPending()的作用？**
   → 方向：检测是否有用户输入在排队，如果有则提前让出

3. **时间切片会增加总渲染时间吗？**
   → 方向：会略微增加（调度开销），但换来更好的用户体验（响应更快）

---

## Q21: React的commit阶段分为哪三个子阶段？每个阶段做了什么？

- **难度**：★★☆
- **知识点**：Commit阶段 / BeforeMutation / Mutation / Layout
- **题型**：简答题
- **关联源码**：`packages/react-reconciler/src/ReactFiberCommitWork.js`

### 参考答案要点：

#### 1. **三阶段概览**

```javascript
// packages/react-reconciler/src/ReactFiberCommitWork.js

// Commit阶段的三个子阶段：
// 1. Before Mutation阶段（DOM变更前）
// 2. Mutation阶段（DOM变更）
// 3. Layout阶段（DOM变更后）

// 标记常量
export const Placement = /*                */ 0b00000000000010;
export const Update = /*                   */ 0b00000000000100;
export const Deletion = /*                 */ 0b00000000001000;
export const ContentReset = /*             */ 0b00000000010000;
export const Callback = /*                 */ 0b00000000100000;
export const DidCapture = /*               */ 0b00000001000000;
export const Ref = /*                      */ 0b00000010000000;
export const Snapshot = /*                 */ 0b00000100000000;
export const Passive = /*                  */ 0b00001000000000;
export const Hydrating = /*                */ 0b000010000000000;
export const Marker = /*                   */ 0b0001000000000000;
```

#### 2. **Before Mutation阶段**

```javascript
// 阶段特征：
// - 可以读取DOM（还未修改）
// - 可以执行getSnapshotBeforeUpdate
// - 执行useLayoutEffect的cleanup函数
// - 类组件的getSnapshotBeforeUpdate生命周期

function commitBeforeMutationEffects(root, firstChild) {
  focusedInstanceHandle = null;
  
  nextEffect = firstChild;
  
  while (nextEffect !== null) {
    const fiber = nextEffect;
    
    // 处理Snapshot标记
    if ((fiber.flags & Snapshot) !== NoFlags) {
      const current = fiber.alternate;
      commitBeforeMutationLifeCycles(current, fiber);
    }
    
    // 处理Passive标记（调度useEffect）
    if ((fiber.flags & Passive) !== NoFlags) {
      root.passiveEffectDuration += getTransitionDuration(fiber);
    }
    
    nextEffect = nextEffect.nextEffect;
  }
}

// getSnapshotBeforeUpdate的执行
function commitBeforeMutationLifeCycles(current, finishedWork) {
  switch (finishedWork.tag) {
    case ClassComponent: {
      // 类组件：调用getSnapshotBeforeUpdate
      const snapshot = instance.getSnapshotBeforeUpdate(
        prevProps,
        prevState
      );
      instance.__reactInternalSnapshotBeforeUpdate = snapshot;
      break;
    }
    case HostRoot: {
      // 清理passive effects
      break;
    }
    case HostComponent: {
      // DOM组件：暂不支持snapshot
      break;
    }
  }
}
```

#### 3. **Mutation阶段**

```javascript
// 阶段特征：
// - 执行实际的DOM操作（增删改）
// - 执行useEffect的cleanup函数
// - 解绑ref
// - 清除旧的DOM节点

function commitMutationEffects(root, finishedWork) {
  inCommitRoot++;
  nextEffect = finishedWork.firstEffect;
  
  while (nextEffect !== null) {
    const flags = nextEffect.flags;
    
    // 处理ContentReset
    if (flags & ContentReset) {
      commitResetTextContent(nextEffect);
    }
    
    // 处理Ref
    if (flags & Ref) {
      const current = nextEffect.alternate;
      if (current !== null) {
        commitDetachRef(current);
      }
      if (enableScopeAPI) {
        // Scope API
      }
    }
    
    // 处理标记
    const primaryFlags = flags & (PlacementAndUpdate | Placement | Update | Deletion);
    switch (primaryFlags) {
      case PlacementAndUpdate: {
        // 同时有placement和update
        commitPlacement(nextEffect);
        nextEffect.flags &= ~Placement;
        commitWork(current, nextEffect);
        break;
      }
      case Placement: {
        // 新节点插入
        commitPlacement(nextEffect);
        break;
      }
      case PlacementAndUpdate | Hydrating: {
        // Hydration
        nextEffect.flags &= ~Placement;
        commitWork(current, nextEffect);
        break;
      }
      case Update: {
        // 更新现有节点
        commitWork(current, nextEffect);
        break;
      }
      case Deletion: {
        // 删除节点
        commitDeletion(root, nextEffect, renderPriorityLevel);
        break;
      }
    }
    
    nextEffect = nextEffect.nextEffect;
  }
  
  inCommitRoot--;
}

// DOM插入操作
function commitPlacement(finishedWork) {
  // 1. 获取父节点
  const parentFiber = getParentFiber(finishedWork);
  const parent = parentFiber.stateNode;
  
  // 2. 获取兄弟节点（插在它前面）
  const before = getHostSibling(finishedWork);
  
  // 3. 执行插入
  if (parentFiber.tag === HostComponent && parentFiber.stateNode != null) {
    // 父节点是DOM节点
    insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);
  } else {
    // 父节点是容器
    insertOrAppendPlacementNode(finishedWork, before, parent);
  }
}
```

#### 4. **Layout阶段**

```javascript
// 阶段特征：
// - DOM已经更新完毕
// - 可以安全地读取和操作DOM
// - 执行useLayoutEffect的create函数
// - 执行componentDidMount/DidUpdate
// - 绑定ref

function commitLayoutEffects(finishedWork, root, committedLanes) {
  nextEffect = finishedWork.firstEffect;
  
  while (nextEffect !== null) {
    const flags = nextEffect.flags;
    
    // 处理MarkRef（绑定ref）
    if (flags & MarkRef) {
      commitAttachRef(nextEffect);
    }
    
    // 处理Layout标记
    const primaryFlags = flags & (UpdateCallback | Callback | Ref);
    switch (primaryFlags) {
      case LayoutMask: {
        // 类组件：componentDidMount/Update
        commitLayoutEffectOnFiber(root, current, nextEffect, committedLanes);
        break;
      }
      default: {
        // 其他情况
        break;
      }
    }
    
    nextEffect = nextEffect.nextEffect;
  }
}

// useLayoutEffect的执行
function commitHookEffectListMount(flags, finishedWork) {
  const updateQueue = finishedWork.updateQueue;
  let lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
  
  if (lastEffect !== null) {
    const firstEffect = lastEffect.next;
    let effect = firstEffect;
    
    do {
      if ((effect.tag & flags) === flags) {
        // 执行create函数
        const create = effect.create;
        effect.destroy = create();
      }
      effect = effect.next;
    } while (effect !== firstEffect);
  }
}
```

#### 5. **三阶段总结**

| 阶段 | 时机 | 主要操作 | 可读DOM | 可写DOM |
|------|------|---------|--------|--------|
| **BeforeMutation** | DOM变更前 | 快照、cleanup | ✅ | ❌ |
| **Mutation** | DOM变更中 | 增删改DOM、解绑ref | ❌ | ✅ |
| **Layout** | DOM变更后 | 绑定ref、生命周期、useLayoutEffect | ✅ | ✅ |

### 🔍 追问链

1. **为什么Mutation阶段不能读取DOM？**
   → 方向：此时DOM正在被修改，读取可能得到不一致的状态

2. **useEffect的cleanup为什么在Mutation阶段而create在之后？**
   → 方向：确保旧effect完全清理后再创建新的，避免状态混乱

3. **commit阶段出错会怎样？如何处理？**
   → 方向：整个commit阶段在try-catch中，出错后会由Error Boundary捕获

---

## Q22: React的Hooks链表结构是如何组织的？为什么不能在条件语句中使用Hooks？

- **难度**：★★☆
- **知识点**：Hooks链表 / 规则 / 条件语句 / 数据结构
- **题型**：代码分析题
- **关联源码**：`packages/react-reconciler/src/ReactFiberHooks.js:行100-300`

### 参考答案要点：

#### 1. **Hooks链表的数据结构**

```javascript
// packages/react-reconciler/src/ReactFiberHooks.js

// Hooks存储在Fiber节点的memoizedState中
// 形成单向链表结构

// Hook对象结构
const hook = {
  memoizedState: null,    // 当前状态值（useState/useReducer）
                          // 或effect对象（useEffect/useLayoutEffect）
                          // 或ref对象（useRef）
                          // 或memoized值（useMemo）
  baseState: null,        // 基础状态（用于优先级相关的状态回退）
  baseQueue: null,        // 基础更新队列（被跳过的更新）
  queue: null,            // 更新队列（useState/useReducer的pending状态）
  next: null              // 下一个Hook（链表指针）
};

// 链表示例：
// fiber.memoizedState → [useState hook] → [useEffect hook] → [useMemo hook] → null
//                         ↓                  ↓                    ↓
//                    memoizedState: 0   memoizedState: {...}  memoizedState: result
//                    queue: {...}      next: {...}            next: null
//                    next: →           next: →
```

#### 2. **Hooks的调用机制**

```javascript
// 全局变量，跟踪当前正在渲染的组件和Hook
let currentlyRenderingFiber = null;  // 当前Fiber节点
let workInProgressHook = null;       // 当前正在处理的Hook
let currentHook = null;               // current树中的对应Hook

// 第一次渲染（mount）
function renderWithHooks(current, workInProgress, Component, props) {
  // 设置当前渲染的Fiber
  currentlyRenderingFiber = workInProgress;
  
  // 初始化Hook链表
  workInProgress.memoizedState = null;
  
  // 根据是否首次渲染选择不同的dispatcher
  ReactCurrentDispatcher.current =
    current === null || current.memoizedState === null
      ? HooksDispatcherOnMount    // 首次渲染
      : HooksDispatcherOnUpdate;  // 更新
  
  // 执行组件函数（这会依次调用各个Hook）
  const children = Component(props);
  
  // 完成渲染
  currentlyRenderingFiber = null;
  workInProgressHook = null;
  currentHook = null;
  
  return children;
}

// useState的mount实现
function mountWorkInProgressHook() {
  const hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  
  if (workInProgressHook === null) {
    // 第一个Hook，挂载到fiber上
    currentlyRenderingFiber.memoizedState = hook;
  } else {
    // 后续Hook，追加到链表
    workInProgressHook.next = hook;
  }
  
  workInProgressHook = hook;
  return hook;
}

// useState的update实现
function updateWorkInProgressHook() {
  // 获取下一个Hook
  let nextCurrentHook;
  if (currentHook === null) {
    // current树中没有Hook（不应该发生）
    const current = currentlyRenderingFiber.alternate;
    if (current !== null) {
      nextCurrentHook = current.memoizedState;
    } else {
      nextCurrentHook = null;
    }
  } else {
    // 移动到下一个Hook
    nextCurrentHook = currentHook.next;
  }
  
  let nextWorkInProgressHook;
  if (workInProgressHook === null) {
    // workInProgress树中的第一个Hook
    nextWorkInProgressHook = currentlyRenderingFiber.memoizedState;
  } else {
    // 移动到下一个Hook
    nextWorkInProgressHook = workInProgressHook.next;
  }
  
  if (nextWorkInProgressHook !== null) {
    // 复用已有的Hook对象
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;
    currentHook = nextCurrentHook;
  } else {
    // Hook数量增加了（不应该发生！）
    invariant(false, 'Rendered more hooks than during the previous render.');
  }
  
  return workInProgressHook;
}
```

#### 3. **为什么不能在条件语句中使用Hooks？**

```javascript
// ❌ 错误示例：条件语句中使用Hook
function ConditionalHooks({ showExtra }) {
  const [count, setCount] = useState(0);
  
  if (showExtra) {
    // ⚠️ 问题：第一次渲染showExtra=true时有3个Hook
    const [name, setName] = useState('test');  // 第2个Hook
    const [age, setAge] = useState(25);         // 第3个Hook
  }
  
  const [visible, setVisible] = useState(true); // 第2个或第4个？
  
  return <div>{count}</div>;
}

// 第一次渲染（showExtra=true）：
// Hook链表：[count] → [name] → [age] → [visible]

// 第二次渲染（showExtra=false）：
// Hook链表：[count] → [visible]
// 但是React期望：[count] → [name] → [age] → [visible]

// 结果：
// visible拿到了name的值！
// 导致状态混乱和潜在的错误

// ✅ 正确做法：始终以相同顺序调用Hooks
function CorrectUsage({ showExtra }) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('test');
  const [age, setAge] = useState(25);
  const [visible, setVisible] = useState(true);
  
  // 可以在条件语句中使用值，但不能声明Hook
  if (showExtra) {
    return <div>{name} ({age})</div>;
  }
  
  return <div>{count} - {visible ? 'visible' : 'hidden'}</div>;
}
```

#### 4. **Hooks规则的强制机制**

```javascript
// React如何检测Hooks规则违规？
// 1. 开发模式下使用eslint-plugin-react-hooks
// 2. 运行时检查Hook数量一致性

// eslint规则实现思路：
// eslint-plugin-react-hooks 会：
// - 分析AST（抽象语法树）
// - 检查Hook调用是否在组件顶层
// - 检查Hook是否在条件/循环/嵌套函数中
// - 给出明确的错误提示

// 运行时检查：
function updateWorkInProgressHook() {
  // ...
  if (nextWorkInProgressHook !== null) {
    // 正常：Hook数量匹配
    workInProgressHook = nextWorkInProgressHook;
  } else {
    // 异常：Hook数量增加了
    // React会报错：
    // "Rendered more hooks than during the previous render."
    throw new Error(
      'Rendered more hooks than during the previous render. ' +
      'This may be caused by an accidental early return statement.'
    );
  }
}
```

### 🔍 追问链

1. **Hooks链表的内存占用如何？大量Hooks会有性能问题吗？**
   → 方向：每个Hook对象很小，正常使用不会有问题；极端情况下可以考虑拆分组件

2. **自定义Hook的链表现？**
   → 方向：自定义Hook内部的Hook也会加入到同一个链表中

3. **能否绕过Hooks规则？比如用try-catch包裹？**
   → 方向：技术上可行但强烈不建议，会导致不可预测的行为

---

## Q23: React的memo和PureComponent的比较逻辑（shallowEqual）是如何实现的？

- **难度**：★★☆
- **知识点**：React.memo / PureComponent / shallowEqual / 性能优化
- **题型**：代码分析题
- **关联源码**：`packages/react/src/ReactMemo.js` 和 `packages/shared/shallowEqual.js`

### 参考答案要点：

#### 1. **React.memo的基本用法**

```javascript
// React.memo：函数组件的性能优化（HOC）
const MyComponent = function MyComponent(props) {
  /* 使用props渲染 */
};

// 包装为记忆化组件
const MemoizedMyComponent = React.memo(MyComponent);

// 等价于：
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 的返回结果与
  将 prevProps 传入 render 的返回结果一致则返回 true，
  否则返回 false
  */
  return (
    prevProps.count === nextProps.count &&
    prevProps.onClick === nextProps.onClick
  );
}

const MemoizedMyComponent = React.memo(MyComponent, areEqual);
```

#### 2. **shallowEqual的实现**

```javascript
// packages/shared/shallowEqual.js
import is from './objectIs';

/**
 * 进行相等性比较，以此决定是否应当进行组件重渲染。
 * Performs equality by iterating through keys on both objects and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */

function shallowEqual(objA, objB) {
  // 1. 引用相同，直接返回true（优化常见情况）
  if (is(objA, objB)) {
    return true;
  }

  // 2. 其中一个是null或不是对象，返回false
  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  // 3. 获取keys
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 4. key数量不同，返回false
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 5. 遍历比较每个key的值
  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];
    
    // B缺少A的某个key
    if (
      !hasOwnProperty.call(objB, currentKey) ||
      !is(objA[currentKey], objB[currentKey])
    ) {
      return false;
    }
  }

  return true;
}

// objectIs的实现（polyfill for Object.is）
function is(x, y) {
  return (
    (x === y && (x !== 0 || 1 / x === 1 / y)) || // 处理+0/-0
    (x !== x && y !== y)                          // 处理NaN
  );
}
```

#### 3. **PureComponent的比较逻辑**

```javascript
// packages/react/src/ReactBaseClasses.js

// PureComponent的shouldComponentUpdate
function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;

/**
 * Convenience component with default shallow equality check for sCU.
 */
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;

// Avoid an extra prototype jump for these methods.
Object.assign(pureComponentPrototype, ReactComponent.prototype);
pureComponentPrototype.isPureReactComponent = true;

// reconciler中的使用
function checkShouldComponentUpdate(
  workInProgress,
  ctor,
  oldProps,
  newProps,
  oldState,
  newState,
  nextContext
) {
  const instance = workInProgress.stateNode;
  
  // 如果是PureComponent，使用shallowCompare
  if (ctor.prototype.isPureReactComponent) {
    return (
      !shallowEqual(oldProps, newProps) ||
      !shallowEqual(oldState, newState)
    );
  }
  
  // 否则调用组件自己的shouldComponentUpdate
  return instance.shouldComponentUpdate
    ? instance.shouldComponentUpdate(newProps, newState, nextContext)
    : true;  // 默认返回true（总是更新）
}
```

#### 4. **React.memo的内部实现**

```javascript
// packages/react/src/ReactMemo.js
import isValidElementType from 'shared/isValidElementType';
import REACT_MEMO_TYPE from 'shared/ReactSymbols';

export function memo(type, compare) {
  const elementType = {
    $$typeof: REACT_MEMO_TYPE,
    type,           // 原始组件
    compare: compare === undefined ? null : compare,  // 自定义比较函数
    
    // React内部使用的属性
    WrappedComponent: type,
  };
  
  if (__DEV__) {
    let ownName;
    Object.defineProperty(elementType, 'displayName', {
      enumerable: false,
      configurable: true,
      get: function() {
        return ownName;
      },
      set: function(name) {
        ownName = name;
        if (type.displayName == null) {
          type.displayName = name;
        }
      },
    });
  }
  
  return elementType;
}

// reconciler中的处理
function updateSimpleMemoComponent(
  current,
  workInProgress,
  Component,
  nextProps,
  renderLanes
) {
  // 如果compare函数存在，使用它进行比较
  if (Component.compare !== null) {
    if (Component.compare(prevProps, nextProps)) {
      // props相等，复用
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    }
  } else if (shallowEqual(prevProps, nextProps)) {
    // 使用默认的shallowEqual
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }
  
  // props不等，需要重新渲染
  // ...
}
```

#### 5. **使用注意事项**

```javascript
// ❌ 常见陷阱1：传递新的对象/函数作为prop
function Parent() {
  const [count, setCount] = useState(0);
  
  // 每次渲染都是新的对象和函数引用
  const style = { color: 'red' };
  const handleClick = () => console.log('click');
  
  return (
    <MemoizedChild
      style={style}           // ❌ 每次都是新对象
      onClick={handleClick}   // ❌ 每次都是新函数
      count={count}
    />
  );
}

// ✅ 解决方案：使用useMemo/useCallback
function OptimizedParent() {
  const [count, setCount] = useState(0);
  
  const style = useMemo(() => ({ color: 'red' }), []);
  const handleClick = useCallback(() => console.log('click'), []);
  
  return (
    <MemoizedChild
      style={style}           // ✅ 稳定的引用
      onClick={handleClick}   // ✅ 稳定的引用
      count={count}
    />
  );
}

// ❌ 常见陷阱2：误解shallowEqual的范围
// shallowEqual只比较props的第一层
const props1 = {
  user: { name: 'Alice', age: 25 },  // 嵌套对象
  items: [1, 2, 3]                    // 数组
};

const props2 = {
  user: { name: 'Alice', age: 25 },  // 新对象！
  items: [1, 2, 3]                    // 新数组！
};

// shallowEqual(props1, props2) === false
// 因为user和items的引用不同
```

### 🔍 追问链

1. **React.memo和useMemo的区别？**
   → 方向：React.memo优化组件重渲染，useMemo优化计算结果缓存

2. **如何实现深比较的自定义compare函数？**
   → 方向：使用lodash.isEqual或自己实现递归比较，但要注意性能

3. **什么时候不应该使用React.memo？**
   → 方向：props频繁变化、组件本身就很简单、过度优化

---

## Q24: React的bailout机制（canSkipRendering）是如何判断是否可以跳过渲染的？

- **难度**：★★☆
- **知识点**：Bailout / canSkipRendering / 优化 / 渲染性能
- **题型**：代码分析题
- **关联源码**：`packages/react-reconciler/src/ReactFiberBeginWork.js:行100-200`

### 参考答案要点：

#### 1. **Bailout机制的概念**

Bailout（退出/跳过）是React的一种优化手段，当判断组件的输出不会发生变化时，跳过该组件及其子树的渲染过程。

```javascript
// bailout的意义：
// - 避免不必要的调和计算
// - 减少组件函数的执行次数
// - 提升大型应用的渲染性能
```

#### 2. **Bailout的判断条件**

```javascript
// packages/react-reconciler/src/ReactFiberBeginWork.js

function beginWork(current, workInProgress, renderLanes) {
  // 1. 如果updateQueue为空，说明没有待处理的更新
  if (current !== null) {
    const oldProps = current.memoizedProps;
    const newProps = workInProgress.pendingProps;
    
    // 2. 检查props是否变化
    if (oldProps !== newProps || hasLegacyContextChanged()) {
      // props变化，需要进入正常的更新流程
      didReceiveUpdate = true;
    } else if (!includesSomeLane(renderLanes, updateLanes)) {
      // 3. props没变，且当前渲染优先级不包含该组件的更新lanes
      // → 可以bailout！
      didReceiveUpdate = false;
      
      // 尝试复用当前的fiber
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    } else {
      // 4. 有更新但优先级不够，这次渲染先跳过
      didReceiveUpdate = false;
    }
  } else {
    didReceiveUpdate = false;
  }
  
  // 正常的更新流程...
  workInProgress.lanes = NoLanes;
  switch (workInProgress.tag) {
    // ... 各种组件类型的处理
  }
}
```

#### 3. **bailoutOnAlreadyFinishedWork的实现**

```javascript
// packages/react-reconciler/src/ReactFiberBeginWork.js

function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
  // 1. 复用current的属性
  if (!includesSomeLane(renderLanes, workInProgress.childLanes)) {
    // 子树也没有需要更新的内容，整个子树都可以跳过
    
    // Props不变的情况下，可以直接复用
    if (current !== null) {
      // 复用current的effect链表（如果有被动effect如useEffect）
      workInProgress.firstChild = current.firstChild;
      workInProgress.child = current.child;
      workInProgress.memoizedProps = current.memoizedProps;
      workInProgress.memoizedState = current.memoizedState;
      workInProgress.updateQueue = current.updateQueue;
      workInProgress.dependencies = current.dependencies;
      
      // 双缓存：让workInProgress的alternate指向current
      workInProgress.subtreeFlags = NoSubtreeFlag;
      workInProgress.deletions = null;
      
      if (enableProfilerTimer) {
        workInProgress.actualDuration = current.actualDuration;
        workInProgress.actualStartTime = current.actualStartTime;
        workInProgress.selfBaseDuration = current.selfBaseDuration;
        workInProgress.treeBaseDuration = current.treeBaseDuration;
      }
    }
    
    // 标记不需要进一步处理
    return null;  // 告诉调用者这个分支已完成
  }
  
  // 2. 当前组件可以跳过，但子树可能有更新
  // 克隆子节点
  cloneChildFibers(current, workInProgress);
  return workInProgress.child;
}
```

#### 4. **Bailout的完整流程图**

```
beginWork(current, workInProgress, renderLanes)
    │
    ├─ current === null?
    │   └─ YES → 首次渲染，走正常流程
    │   └─ NO  → 继续
    │
    ├─ props changed?
    │   └─ YES → didReceiveUpdate = true, 走正常流程
    │   └─ NO  → 继续
    │
    ├─ includesSomeLane(renderLanes, updateLanes)?
    │   └─ YES → 有更新需要处理，走正常流程
    │   └─ NO  → 继续
    │
    └─ bailoutOnAlreadyFinishedWork()
        │
        ├─ 子树也有更新?
        │   └─ YES → cloneChildFibers(), 返回child
        │   └─ NO  → 完全跳过，返回null
```

#### 5. **Bailout与React.memo/PureComponent的关系**

```javascript
// React.memo/PureComponent的bailout发生在更早的阶段

// 1. 对于React.memo包装的组件：
function updateSimpleMemoComponent(current, workInProgress, Component, ...) {
  // 先进行props比较
  if (shallowEqual(oldProps, newProps)) {
    // props没变，直接bailout
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }
  // props变了，继续beginWork
}

// 2. 对于PureComponent：
if (ctor.prototype.isPureReactComponent) {
  if (!shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)) {
    // 需要更新
  } else {
    // bailout
  }
}

// 3. 普通组件的bailout（仅检查props引用）：
// 只检查 oldProps !== newProps（引用比较）
// 不会深入比较props的内容
```

### 🔍 追问链

1. **bailout后useEffect还会执行吗？**
   → 方向：会，因为effect的处理在commit阶段，不受bailout影响

2. **如何利用bailout机制优化性能？**
   → 方向：保持props引用稳定（useMemo/useCallback）、使用React.memo

3. **bailout失败的原因有哪些？**
   → 方向：props引用变化、context变化、hooks依赖变化、优先级提升

---

## Q25: React的Concurrent Mode与传统模式的区别？startTransition的实现原理

- **难度**：★★☆
- **知识点**：Concurrent Mode / startTransition / 并发渲染 / 优先级
- **题型**：简答题
- **关联源码**：`packages/react-reconciler/src/ReactFiberWorkLoop.js` 和 `packages/react/src/ReactStartTransition.js`

### 参考答案要点：

#### 1. **Concurrent Mode概述**

```javascript
// Concurrent Mode（并发模式）vs Legacy Mode（传统模式）

// Legacy Mode（React 17及以前）：
// - 一旦开始渲染就必须完成
// - 不能中断
// - 用户交互必须等待渲染完成
// - 所有更新都是同步的

// Concurrent Mode（React 18）：
// - 渲染可以被中断和恢复
// - 高优先级更新可以打断低优先级更新
// - 用户交互可以即时响应
// - 支持时间切片和优先级调度

// 启用方式（React 18默认开启）：
import { createRoot } from 'react-dom/client';

// Concurrent Mode
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Legacy Mode（可选）
// ReactDOM.render(<App />, document.getElementById('root'));
```

#### 2. **startTransition的实现**

```javascript
// packages/react/src/ReactStartTransition.new.js

export function startTransition(scope, options) {
  const prevTransition = ReactCurrentBatchConfig.transition;
  
  // 设置过渡优先级
  const currentTransition = {};
  ReactCurrentBatchConfig.transition = currentTransition;
  
  // 设置过渡更新的优先级
  ReactCurrentBatchConfig._updatedFiberLanes = NoLanes;
  ReactCurrentBatchConfig._updatedRootLanes = transitionLanes;
  
  try {
    // 执行用户的更新逻辑
    scope();
  } finally {
    // 恢复之前的transition状态
    ReactCurrentBatchConfig.transition = prevTransition;
  }
}

// 使用示例：
function SearchComponent() {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ 紧急更新：立即响应用户输入
  const handleChange = (e) => {
    setInputValue(e.target.value);  // 紧急更新
  };

  // ✅ 非紧急更新：搜索可以稍后执行
  const performSearch = () => {
    startTransition(() => {
      setSearchQuery(inputValue);  // 过渡更新（低优先级）
    });
  };

  return (
    <div>
      <input value={inputValue} onChange={handleChange} />
      <SearchResults query={searchQuery} />
    </div>
  );
}
```

#### 3. **Transition的优先级处理**

```javascript
// packages/react-reconciler/src/ReactFiberLane.js

// Transition lanes的定义
const TransitionLanes = /*                        */ 0b0000000001111111111111111000000;
// 共16个transition lane

// 获取transition lane（循环使用）
function claimNextTransitionLane() {
  // 循环使用16个lane，避免饥饿
  const lane = nextTransitionLane;
  nextTransitionLane <<= 1;
  
  if ((nextTransitionLane & TransitionLanes) === 0) {
    // 用完了，重新开始
    nextTransitionLane = TransitionLane1;
  }
  
  return lane;
}

// 在dispatchAction中的应用
function requestTransitionLane() {
  // 获取一个transition lane
  const lane = claimNextTransitionLane();
  return lane;
}

// 优先级对比：
// SyncLane (1) >> UserBlockingLane (4) >> TransitionLane (~1000) >> IdleLane
```

#### 4. **Concurrent Mode的工作流程**

```javascript
// 并发模式下的渲染流程

function workLoopConcurrent() {
  // 并发模式的工作循环：可以中断
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}

// shouldYield的决策：
function shouldYield() {
  // 1. 检查时间片是否用完
  if (getCurrentTime() - startTime >= frameYieldMs) {
    return true;
  }
  
  // 2. 检查是否有更高优先级的任务
  if (higherPriorityWorkExists()) {
    return true;
  }
  
  return false;
}

// 中断后的恢复：
// - 保存当前workInProgress的位置
// - 下次调度时从断点继续
// - 或者如果有了更高优先级的更新，可能丢弃当前工作重新开始
```

#### 5. **使用场景对比**

| 场景 | 推荐方式 | 原因 |
|------|---------|------|
| **用户输入** | 直接setState | 需要即时反馈 |
| **数据获取** | startTransition | 可以延迟，不阻塞输入 |
| **大规模列表渲染** | startTransition | 避免卡顿 |
| **导航切换** | startTransition | 可以显示过渡动画 |
| **表单验证** | 直接setState | 需要即时反馈 |
| **图表重绘** | startTransition | 耗时操作，可延迟 |

### 🔍 追问链

1. **useDeferredValue和startTransition的关系？**
   → 方向：useDeferredValue是startTransition的Hook版本，用于值的延迟

2. **Transition更新被打断后会发生什么？**
   → 方向：当前渲染被丢弃，下次从最新的状态重新开始

3. **如何判断一个更新是否是transition？**
   → 方向：通过ReactCurrentBatchConfig.transition是否存在来判断

---

## Q26: React的合成事件池是如何工作的？为什么要回收事件对象？

- **难度**：★★☆
- **知识点**：合成事件池 / 事件回收 / 内存优化 / 性能
- **题型**：简答题
- **关联源码**：`packages/events/SyntheticEvent.js` 和 `packages/events/SyntheticEventPool.js`

### 参考答案要点：

#### 1. **事件池的概念（React 16及以前）**

```javascript
// React 16的事件池机制：
// - 预先创建一批SyntheticEvent对象
// - 事件触发时从池中取出一个对象使用
// - 事件处理完后将对象归还到池中
// - 避免频繁创建/销毁对象的GC压力

// 事件池的大小
const EVENT_POOL_SIZE = 10;  // 默认池大小

// 事件池结构
const eventPool = [];
let eventPoolCursor = 0;  // 池游标
```

#### 2. **事件池的工作流程**

```javascript
// packages/events/SyntheticEvent.js

// 1. 从池中获取事件对象
function getPooledEvent(eventData) {
  // 如果池中有可用对象
  if (eventPoolCursor < EVENT_POOL_SIZE) {
    // 从池中取出
    const event = eventPool[eventPoolCursor];
    eventPool[eventPoolCursor++] = null;  // 清除引用
    
    // 初始化事件属性
    EventConstructor.call(event, eventData);
    return event;
  } else {
    // 池满了，创建新对象
    return new EventConstructor(eventData);
  }
}

// 2. 归还事件对象到池中
function releasePooledEvent(event) {
  // 检查事件是否已经被释放
  if (eventPoolCursor > 0) {
    // 重置事件属性
    event.isPersistent = false;
    event.isDefaultPrevented = false;
    event.isPropagationStopped = false;
    // ... 重置所有属性
    
    // 归还到池中
    eventPool[--eventPoolCursor] = event;
  }
}

// 3. 事件处理完成后的自动释放
function executeDispatch(event, listener, inst) {
  const type = event.type || 'unknown';
  
  try {
    // 调用用户的事件处理函数
    listener.call(inst, event);
  } finally {
    // 无论成功与否，都释放事件
    if (!event.isPersistent()) {
      // 自动释放到池中
      event.constructor.release(event);
    }
  }
}
```

#### 3. **为什么需要事件池？**

```javascript
// 性能对比：

// ❌ 不使用事件池：
// 每次事件都创建新对象
for (let i = 0; i < 1000; i++) {
  const event = new SyntheticEvent(nativeEvent);
  handleClick(event);
  // 每次都触发GC（垃圾回收）
}

// ✅ 使用事件池：
// 对象被复用
for (let i = 0; i < 1000; i++) {
  const event = getPooledEvent(eventData);  // 从池中取
  handleClick(event);
  releasePooledEvent(event);                // 归还到池中
  // GC压力大大减少
}
```

#### 4. **事件池的问题和React 17的变化**

```javascript
// React 16的事件池问题：

// 问题1：异步访问事件对象会失败
function handleClick(e) {
  console.log(e.type);  // ✅ 同步访问正常
  
  setTimeout(() => {
    console.log(e.type);  // ❌ 报错！事件已被释放
    // Warning: This synthetic event is reused for performance reasons.
  }, 100);
}

// 解决方案：e.persist()
function handleClickFixed(e) {
  e.persist();  // 将事件从池中移除，不再回收
  setTimeout(() => {
    console.log(e.type);  // ✅ 正常工作
  }, 100);
}

// React 17+ 的变化：
// - 移除了事件池机制！
// - 不再需要调用 e.persist()
// - 事件对象可以安全地在异步回调中使用

// 原因：
// 1. 现代浏览器的GC优化已经足够好
// 2. 事件池增加了代码复杂度
// 3. 开发者经常忘记persist()导致bug
// 4. 合成事件本身已经很轻量
```

### 🔍 追问链

1. **事件池的大小如何确定？可以配置吗？**
   → 方向：默认10个，不可配置；但React 17已移除此机制

2. **除了SyntheticEvent，还有哪些对象使用了对象池？**
   → 方向：SyntheticTouchEvent、SyntheticUIEvent等合成事件子类

3. **移除事件池后对性能有影响吗？**
   → 方向：影响很小，现代V8引擎的GC效率很高

---

## Q27: React的hydrate过程是怎样的？与服务端渲染的配合机制

- **难度**：★★☆
- **知识点**：Hydration / SSR / 服务端渲染 / DOM复用
- **题型**：简答题
- **关联源码**：`packages/react-dom/src/client/ReactDOMHydrationRoot.js`

### 参考答案要点：

#### 1. **Hydration的定义**

Hydration是客户端接管服务端渲染HTML的过程，它将静态HTML变为可交互的React应用。

```javascript
// 基本用法
import { hydrateRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = hydrateRoot(domNode, <App />);

// 与createRoot的区别：
// createRoot: 清空容器，重新渲染所有内容
// hydrateRoot: 复用已有DOM，只添加事件监听器
```

#### 2. **Hydration的工作流程**

```javascript
// packages/react-dom/src/client/ReactDOMHydrationRoot.js

function createHydrationRoot(
  initialChildren,
  initialComments,
  options,
) {
  // Step 1: 创建Fiber根节点
  const root = createContainer(
    container,
    ConcurrentRoot,
    null,  // 不支持hydrating
    false,  // 是同步的
    '',
    ...options,
  );

  // Step 2: 标记为hydration模式
  root.isDehydrated = true;  // 标记需要hydration
  
  // Step 3: 将现有DOM作为初始内容
  const mutableSources = createMutableSourceSet();
  
  return new ReactDOMHydrationRoot(root, mutableSources);
}

// Hydration过程：
function attemptHydrationAtCurrentPriority(fiber) {
  if (fiber.tag === HostComponent) {
    const instance = fiber.stateNode;
    
    // 尝试复用现有的DOM节点
    const possibleInstance = canHydrateInstance(instance, type);
    
    if (possibleInstance !== null) {
      // 成功复用DOM节点
      fiber.stateNode = possibleInstance;
      return true;
    } else {
      // 无法复用，标记为需要插入
      return false;
    }
  }
}
```

#### 3. **Hydration Mismatch处理**

```javascript
// 当服务端和客户端渲染不一致时：

// React的行为：
// 1. 在开发模式下发出警告
// 2. 尝试修复不匹配的内容
// 3. 在生产模式下静默修复

// 常见的不匹配原因：
// 1. 使用了只在浏览器可用的API
if (typeof window !== 'undefined') {
  // 这段代码在SSR时不会执行
  // 导致服务端和客户端输出不同
}

// 2. 时间相关的内容
<div>当前时间：{Date.now()}</div>
// 每次渲染时间都不同

// 3. 随机数或UUID
<div>用户ID：{Math.random()}</div>

// 解决方案：
// 1. 使用suppressHydrationWarning（仅限一层）
<div suppressHydrationWarning>{Date.now()}</div>

// 2. 使用useEffect延迟加载
function TimeDisplay() {
  const [time, setTime] = useState(null);
  
  useEffect(() => {
    setTime(Date.now());  // 只在客户端执行
  }, []);
  
  return <div>时间：{time}</div>;
}
```

#### 4. **Hydration的性能优化**

```javascript
// 优化策略1：选择性Hydration
// React 18支持渐进式hydration
import { startTransition } from 'react';

function App() {
  return (
    <>
      {/* 关键内容立即hydration */}
      <Header />
      <MainContent />
      
      {/* 非关键内容延迟hydration */}
      <startTransition>
        <HeavyComponent />
        <Comments />
      </startTransition>
    </>
  );
}

// 优化策略2：流式SSR + Hydration
// 服务端分块发送HTML，客户端逐步hydration
import { renderToPipeableStream } from 'react-dom/server';

app.get('/', (req, res) => {
  const { pipe } = renderToPipeableStream(<App />, {
    bootstrapModules: ['/main.js'],
    onShellReady() {
      pipe(res);  // 发送shell（骨架屏）
    },
    onAllReady() {
      // 所有内容准备完毕
    }
  });
});
```

### 🔍 追问链

1. **Hydration过程中如果发现多余的DOM节点怎么办？**
   → 方向：React会忽略它们，不会删除

2. **如何检测Hydration是否成功？**
   → 方向：使用onRecoverableError回调、React DevTools

3. **Hydration和CSR的性能对比？**
   → 方向：Hydration首屏快但TTFI可能慢；CSR简单但白屏时间长

---

## Q28: useReducer的实现原理是什么？它与useState的关系？

- **难度**：★★☆
- **知识点**：useReducer / useState / 状态管理 / Reducer模式
- **题型**：代码分析题
- **关联源码**：`packages/react-reconciler/src/ReactFiberHooks.js:行1600-1700`

### 参考答案要点：

#### 1. **useReducer与useState的关系**

```javascript
// useState实际上是useReducer的语法糖！

// packages/react-reconciler/src/ReactFiberHooks.js

function useState(initialState) {
  // useState内部调用useReducer
  return useReducer(
    basicStateReducer,  // 简单的reducer
    initialState        // 初始状态
  );
}

// basicStateReducer的实现
function basicStateReducer(state, action) {
  // action可以是值或函数
  return typeof action === 'function' ? action(state) : action;
}

// 所以 setState(newValue) 等价于 dispatch({ type: 'UPDATE', value: newValue })
// 而 setCount(prev => prev + 1) 等价于 dispatch(updateFunction)
```

#### 2. **useReducer的完整实现**

```javascript
// mount阶段
function mountReducer(reducer, initialArg, init) {
  // Step 1: 创建Hook
  const hook = mountWorkInProgressHook();
  
  // Step 2: 计算初始状态
  let initialState;
  if (init !== undefined) {
    // 如果提供了init函数，惰性计算初始状态
    initialState = init(initialArg);
  } else {
    initialState = initialArg;
  }
  
  // Step 3: 初始化Hook的状态
  hook.memoizedState = hook.baseState = initialState;
  
  // Step 4: 创建更新队列
  const queue = {
    pending: null,       // 待处理的更新链表
    interleaved: null,   // 交错更新的队列
    lanes: NoLanes,
    dispatch: null,      // dispatch函数
    lastRenderedReducer: reducer,
    lastRenderedState: initialState,
  };
  hook.queue = queue;
  
  // Step 5: 绑定dispatch函数
  const dispatch = (queue.dispatch = dispatchReducerAction.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ));
  
  return [hook.memoizedState, dispatch];
}

// update阶段
function updateReducer(reducer, initialArg, init) {
  // Step 1: 获取当前Hook
  const hook = updateWorkInProgressHook();
  const queue = hook.queue;
  
  // Step 2: 处理更新队列
  const lastRenderedReducer = queue.lastRenderedReducer;
  const baseState = hook.baseState;
  const baseQueue = hook.baseQueue;
  
  // 合并pending和baseQueue中的更新
  const pendingQueue = queue.pending;
  let newBaseState = baseState;
  let newBaseQueue = baseQueue;
  
  if (baseQueue !== null) {
    // 有之前跳过的低优先级更新
    // ...
  }
  
  if (pendingQueue !== null) {
    // 有新的待处理更新
    // ...
  }
  
  // Step 3: 应用所有更新
  let newState = newBaseState;
  let update = firstUpdate;
  do {
    const action = update.action;
    newState = reducer(newState, action);  // 调用reducer计算新状态
    update = update.next;
  } while (update !== null && update !== firstUpdate);
  
  // Step 4: 更新Hook的状态
  hook.memoizedState = newState;
  hook.baseState = newBaseState;
  hook.baseQueue = newBaseQueue;
  queue.lastRenderedState = newState;
  
  return [newState, dispatch];
}
```

#### 3. **dispatch函数的实现**

```javascript
function dispatchReducerAction(fiber, queue, action) {
  // 1. 获取当前lane（优先级）
  const lane = requestUpdateLane(fiber);
  
  // 2. 创建update对象
  const update = {
    lane,
    action,
    hasEagerState: false,
    eagerState: null,
    next: null,
  };
  
  // 3. 将update加入queue（循环链表）
  const pending = queue.pending;
  if (pending === null) {
    update.next = update;  // 第一个update
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;
  
  // 4. 优化：如果是同步更新且reducer简单，提前计算结果
  const alternate = fiber.alternate;
  if (
    fiber.lanes === NoLanes &&
    (alternate === null || alternate.lanes === NoLanes)
  ) {
    const lastRenderedReducer = queue.lastRenderedReducer;
    const lastRenderedState = queue.lastRenderedState;
    
    try {
      const eagerState = lastRenderedReducer(lastRenderedState, action);
      update.eagerState = eagerState;
      update.hasEagerState = true;
      
      // 如果状态没变，可能可以bailout
      if (Object.is(eagerState, lastRenderedState)) {
        return;  // 状态未变化，不需要调度更新
      }
    } catch (error) {
      // 忽略错误，继续正常调度
    }
  }
  
  // 5. 调度更新
  scheduleUpdateOnFiber(fiber, lane, eventTime);
}
```

#### 4. **useState vs useReducer对比**

| 特性 | useState | useReducer |
|------|---------|------------|
| **适用场景** | 简单状态（原始值） | 复杂状态逻辑 |
| **状态结构** | 单个值 | 可以是复杂对象 |
| **更新方式** | 直接设置值或函数 | 通过action和reducer |
| **可预测性** | 中等 | 高（类似Redux） |
| **测试友好** | 一般 | 好（纯函数reducer） |
| **中间件** | 无 | 可扩展 |
| **性能** | 相同 | 相同（底层相同） |

### 🔍 追问链

1. **什么时候应该用useReducer代替useState？**
   → 方向：多个子值依赖前一个状态、复杂的状态逻辑、需要可预测的状态转换

2. **useReducer如何实现类似Redux的功能？**
   → 方向：结合Context API实现全局状态管理

3. **useReducer的init函数有什么用？**
   → 方向：惰性初始化，避免每次渲染都重新计算初始值

---

## Q29: React的错误边界（Error Boundary）是如何实现的？

- **难度**：★★☆
- **知识点**：Error Boundary / 错误处理 / 生命周期 / getDerivedStateFromError
- **题型**：代码分析题
- **关联源码**：`packages/react-reconciler/src/ReactFiberThrow.js`

### 参考答案要点：

#### 1. **Error Boundary的基本概念**

Error Boundary是一种React组件，它可以捕获子组件树中任何位置的JavaScript错误，记录错误并显示备用UI。

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // 渲染备用UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // 记录错误信息
  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// 使用方式
<ErrorBoundary fallback={<CustomErrorUI />}>
  <MyComponent />
</ErrorBoundary>
```

#### 2. **Error Boundary的实现原理**

```javascript
// packages/react-reconciler/src/ReactFiberThrow.js

// 当组件抛出异常时的处理流程
function throwException(
  root,
  returnFiber,
  sourceFiber,
  value,
  workInProgressRootRenderLanes,
) {
  // The source fiber did not complete.
  sourceFiber.flags |= Incomplete;

  // 检查抛出的值类型
  if (typeof value === 'object' && value !== null) {
    switch (value.$$typeof) {
      case REACT_PROMISE_TYPE:
        // Promise：Suspense处理
        return;
      case REACT_LAZY_TYPE:
        // Lazy组件处理
        return;
    }
  }

  // 普通错误：向上查找Error Boundary
  let workInProgress = returnFiber;
  
  while (workInProgress !== null) {
    // 检查当前组件是否是Error Boundary
    if (workInProgress.tag === ClassComponent) {
      const instance = workInProgress.stateNode;
      
      // Error Boundary必须实现getDerivedStateFromError或componentDidCatch
      const ctor = workInProgress.type;
      if (
        typeof ctor.getDerivedStateFromError === 'function' ||
        (instance !== null &&
          typeof instance.componentDidCatch === 'function')
      ) {
        // 找到Error Boundary！
        
        // 1. 标记该fiber需要处理错误
        workInProgress.flags |= ShouldCapture;
        
        // 2. 创建错误信息
        workInProgress.captureValue = value;
        
        // 3. 向上传播直到找到最近的Error Boundary
        return;
      }
    }
    
    // 继续向上查找
    workInProgress = workInProgress.return;
  }
  
  // 没找到Error Boundary，错误会被传播到root
  // React会在控制台显示错误，并卸载整个应用
}
```

#### 3. **Error Boundary的限制**

```javascript
// ❌ Error Boundary无法捕获的情况：

// 1. 事件处理器中的错误
<button onClick={() => {
  throw new Error('这个错误不会被捕获！');
}}>

// 2. 异步代码中的错误
setTimeout(() => {
  throw new Error('异步错误不会被捕获');
}, 1000);

// 3. 服务端渲染中的错误
// SSR有自己的错误处理机制

// 4. Error Boundary自身抛出的错误
class BrokenBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    throw new Error('Error Boundary自身出错');  // ❌ 无法捕获
  }
}

// 解决方案：嵌套Error Boundary
<OuterErrorBoundary>
  <InnerErrorBoundary>
    <RiskyComponent />
  </InnerErrorBoundary>
</OuterErrorBoundary>
```

### 🔍 追问链

1. **为什么Error Boundary只能是类组件？**
   → 方向：需要特定的生命周期方法（getDerivedStateFromError/componentDidCatch），Hooks暂不支持

2. **React 18中新增了什么错误处理特性？**
   → 方向：createRoot的onRecoverableError回调、新的错误边界行为

3. **如何在函数组件中实现类似Error Boundary的功能？**
   → 方向：使用react-error-boundary库或在类组件包装层中使用

---

## Q30: React的Portal是如何实现的？它的应用场景？

- **难度**：★★☆
- **知识点**：Portal / 传送门 / DOM挂载 / 弹窗/模态框
- **题型**：简答题
- **关联源码**：`packages/react-dom/src/client/ReactDOMPortal.js`

### 参考答案要点：

#### 1. **Portal的基本概念**

Portal提供了一种将子节点渲染到父组件以外的DOM节点的方式。

```javascript
import { createPortal } from 'react-dom';

function Modal({ children }) {
  // 将children渲染到document.body下
  return createPortal(
    children,
    document.body  // 目标容器
  );
}

// 使用
function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app">
      <button onClick={() => setShowModal(true)}>打开弹窗</button>
      
      {showModal && (
        <Modal>
          <div className="modal">
            <p>这是一个模态框</p>
            <button onClick={() => setShowModal(false)}>关闭</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// DOM结构：
// <div class="app">           ← 正常的组件树
//   <button>打开弹窗</button>
// </div>
// <div class="modal">         ← Portal传送到body下
//   <p>这是一个模态框</p>
//   <button>关闭</button>
// </div>
```

#### 2. **Portal的事件冒泡**

```javascript
// 重要特性：Portal中的事件仍然会冒泡到React组件树的父级！

function App() {
  const handleClick = (e) => {
    console.log('点击事件冒泡到了App');
    // 即使modal是通过Portal渲染到body上的，
    // 点击modal内的元素仍然会触发这个handler
  };

  return (
    <div onClick={handleClick}>
      <Modal>
        <button>点击我</button>  {/* 点击这里会触发handleClick */}
      </Modal>
    </div>
  );
}

// 实现原理：
// React维护了一个虚拟的事件冒泡路径，
// 它基于React组件树而不是实际的DOM树。
// 所以即使DOM位置不同，事件仍按组件树冒泡。
```

#### 3. **Portal的应用场景**

| 场景 | 说明 | 示例 |
|------|------|------|
| **模态框/对话框** | 避免z-index和overflow问题 | Modal、Dialog、Alert |
| **提示框/Popover** | 需要突破父容器的限制 | Tooltip、Dropdown |
| **全局通知** | 固定在视口特定位置 | Toast、Notification |
| **悬浮菜单** | 需要脱离文档流 | ContextMenu、Select |
| **全屏遮罩** | 需要覆盖整个页面 | Loading、Lightbox |

### 🔍 追问链

1. **Portal会影响组件的生命周期吗？**
   → 方向：不影响，Portal只是改变了DOM位置，组件生命周期正常执行

2. **多个Portal如何管理Z-index层级？**
   → 方向：使用Context管理层级、或者使用统一的Portal管理器

3. **SSR环境下Portal如何处理？**
   → 方向：需要在服务端也提供目标容器，或延迟渲染Portal内容

---

## Q31: React的forwardRef和useImperativeHandle的实现原理？

- **难度**：★★☆
- **知识点**：forwardRef / useImperativeHandle / Ref转发 / 命令式API
- **题型**：代码分析题
- **关联源码**：`packages/react/src/ReactForwardRef.js` 和 `packages/react-reconciler/src/ReactFiberHooks.js`

### 参考答案要点：

#### 1. **forwardRef的作用**

forwardRef允许组件将ref传递给其子组件。

```javascript
// 问题：ref默认不会传递
function MyInput(props) {
  return <input {...props} />;
  // ref在这里丢失了！
}

// 解决方案：使用forwardRef
const MyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// 使用
const inputRef = useRef();
<MyInput ref={inputRef} />;
inputRef.current.focus();  // ✅ 可以访问input元素
```

#### 2. **useImperativeHandle的使用**

```javascript
// useImperativeHandle允许自定义暴露给父组件的实例值

const MyInput = forwardRef((props, ref) => {
  const [value, setValue] = useState('');
  const inputRef = useRef();

  // 自定义暴露给父组件的API
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    getValue: () => value,
    setValue: (newValue) => setValue(newValue),
    clear: () => {
      setValue('');
      inputRef.current.focus();
    }
  }), [value]);  // 依赖数组

  return <input ref={inputRef} value={value} onChange={e => setValue(e.target.value)} />;
});

// 父组件使用
const myInputRef = useRef();
<MyInput ref={myInputRef} />;

myInputRef.current.focus();      // ✅ 自定义方法
myInputRef.current.getValue();   // ✅ 返回当前值
myInputRef.current.clear();      // ✅ 清空并聚焦
```

### 🔍 追问链

1. **forwardRef和函数组件的第二参数有什么关系？**
   → 方向：forwardRef让函数组件能接收第二个参数ref

2. **useImperativeHandle和useRef的区别？**
   → 方向：useRef创建ref，useImperativeHandle自定义ref.current的值

3. **能否在同一个组件上同时使用ref和forwardRef？**
   → 方向：可以，但需要注意优先级和冲突问题

---

## Q32: React的自定义事件（Custom Events）与合成事件的区别？

- **难度**：★★☆
- **知识点**：自定义事件 / 合成事件 / 事件系统 / 插件架构
- **题型**：简答题
- **关联源码**：`packages/events/EventPluginRegistry.js` 和 `packages/events/SyntheticEvent.js`

### 参考答案要点：

#### 1. **自定义事件 vs 合成事件对比**

| 特性 | 合成事件 | 自定义事件（CustomEvent） |
|------|---------|--------------------------|
| **来源** | React内置系统 | 浏览器原生API或手动实现 |
| **冒泡** | React虚拟冒泡（按组件树） | DOM冒泡（按DOM树） |
| **兼容性** | 自动处理浏览器差异 | 需要自行处理polyfill |
| **性能** | 事件委托+池化 | 取决于实现方式 |
| **调试** | React DevTools支持 | 需要额外工具 |
| **类型安全** | TypeScript支持良好 | 需要自己定义类型 |

#### 2. **自定义事件的实现方式**

```javascript
// 方式1：使用原生CustomEvent（非React管理）
function CustomButton({ onCustomAction }) {
  const buttonRef = useRef();

  useEffect(() => {
    const button = buttonRef.current;
    
    const handler = (e) => {
      onCustomAction(e.detail);
    };
    
    button.addEventListener('customAction', handler);
    return () => button.removeEventListener('customAction', handler);
  }, [onCustomAction]);

  const triggerCustom = () => {
    const event = new CustomEvent('customAction', {
      detail: { timestamp: Date.now(), source: 'user' }
    });
    buttonRef.current.dispatchEvent(event);
  };

  return (
    <div>
      <button ref={buttonRef} onClick={triggerCustom}>
        触发自定义事件
      </button>
    </div>
  );
}
```

### 🔍 追问链

1. **自定义事件会导致内存泄漏吗？**
   → 方向：如果不正确移除监听器会导致泄漏，需要确保cleanup

2. **何时选择自定义事件而非Context/状态管理？**
   → 方向：跨层级通信、第三方库集成、解耦组件依赖

---

## Q33: React的性能优化策略有哪些？从源码角度分析

- **难度**：★★☆
- **知识点**：性能优化 / 渲染优化 / 源码分析 / 最佳实践
- **题型**：综合分析题
- **关联源码**：多个文件的综合分析

### 参考答案要点：

#### 1. **减少不必要的渲染**

```javascript
// 策略1：React.memo（组件级别）
export default React.memo(function ExpensiveComponent({ data }) {
  return <div>{/* 复杂渲染 */}</div>;
});

// 源码层面：shallowEqual比较props
// packages/shared/shallowEqual.js
// 只有当props引用发生变化才重渲染

// 策略2：useMemo/useCallback（值/函数级别）
function Parent({ items }) {
  // 缓存昂贵的计算
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.value - b.value);
  }, [items]);
  
  // 缓存回调函数
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);
  
  return <ChildList items={sortedItems} onItemClick={handleClick} />;
}
```

#### 2. **优化列表渲染**

```javascript
// 策略3：正确的key使用
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        // ✅ 使用稳定的唯一ID
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

// 策略4：虚拟化长列表（react-window/react-virtualized）
import { FixedSizeList as List } from 'react-window';
```

#### 3. **并发特性优化**

```javascript
// 策略9：使用startTransition降低优先级
function SearchPage() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);  // 紧急更新：立即响应输入
    
    // 低优先级更新：搜索可以稍后
    startTransition(() => {
      setResults(search(e.target.value));  // 可能被中断
    });
  };

  return (
    <div>
      <SearchInput value={input} onChange={handleChange} />
      <Suspense fallback={<ResultsSkeleton />}>
        <SearchResults results={results} />
      </Suspense>
    </div>
  );
}
```

### 🔍 追问链

1. **如何测量React应用的性能？**
   → 方向：React Profiler API、Chrome DevTools Performance tab、Lighthouse

2. **过度优化的风险有哪些？**
   → 方向：代码复杂度增加、可读性下降、维护成本上升、过早优化

---

## Q34: React DevTools是如何工作的？Profiler数据的采集原理

- **难度**：★★☆
- **知识点**：React DevTools / Profiler / 性能分析 / 调试工具
- **题型**：简答题
- **关联源码**：`packages/react-devtools-shared` 和 `packages/react-reconciler/src/ReactProfilerTypes.js`

### 参考答案要点：

#### 1. **React DevTools的架构**

```
┌──────────────────┐    ┌──────────────┐    ┌──────────────┐
│ Chrome Extension │    │ Backend      │    │ Renderer     │
│ (前端面板)       │ ←→ │ (Node进程)    │ ←→ │ (注入页面)    │
└──────────────────┘    └──────────────┘    └──────────────┘
通信协议：chrome.runtime.sendMessage
数据格式：JSON
```

#### 2. **DevTools注入机制**

```javascript
// DevTools通过hook React内部对象来收集数据
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
  renderers: new Map(),
  listeners: [],
  supportsFiber: true,
  
  inject: function(internals) {
    const id = getNextRendererID();
    this.renderers.set(id, internals);
    this.listeners.forEach(listener => listener({
      rendererID: id,
      ...internals
    }));
    return id;
  }
};
```

#### 3. **常用功能及原理**

| 功能 | 实现原理 | 数据来源 |
|------|---------|---------|
| **Components面板** | 遍历Fiber树构建组件树 | fiber.memoizedProps/State |
| **Props查看** | 直接读取fiber属性 | fiber.memoizedProps |
| **State查看** | 读取Hook链表 | fiber.memoizedState |
| **Highlight更新** | 标记flags变化的fiber | fiber.flags |
| **Profiler时间线** | 收集actualDuration | fiber.actualStartTime/Duration |

### 🔍 追问链

1. **DevTools会对生产环境的性能产生影响吗？**
   → 方向：开发模式会有影响，生产环境通常移除或使用轻量版本

2. **如何在自己的应用中集成类似Profiling功能？**
   → 方向：使用React.Profiler组件和onRender回调

---

## Q35: useSyncExternalStore的作用是什么？它是如何解决tearing问题的？

- **难度**：★★☆
- **知识点**：useSyncExternalStore / Tearing / 并发渲染 / 第三方状态库
- **题型**：代码分析题
- **关联源码**：`packages/react/src/ReactHooks.js` 和 `packages/react-reconciler/src/ReactFiberHooks.js`

### 参考答案要点：

#### 1. **Tearing问题的定义**

Tearing（撕裂）是指在并发渲染过程中，同一组件的不同部分显示了不一致的状态。

```javascript
// Tearing问题示例（假设有一个外部store）
function Counter({ store }) {
  // 第一次读取store
  const count1 = store.getState().count;  // 假设得到 1
  
  // ⚠️ 此时React让出了主线程，store被更新为2
  
  // 第二次读取store（恢复渲染后）
  const count2 = store.getState().count;  // 得到 2！
  
  // 结果：同一个渲染周期内得到了不同的值
}
```

#### 2. **useSyncExternalStore的解决方案**

```javascript
import { useSyncExternalStore } from 'react';

function Counter({ store }) {
  const count = useSyncExternalStore(
    store.subscribe.bind(store),
    () => store.getState().count,
    () => 0  // SSR时的快照
  );
  
  // ✅ count在整个渲染周期内保持一致
  return <div>{count}</div>;
}
```

### 🔍 追问链

1. **为什么不能直接在render中读取外部store？**
   → 方向：并发模式下可能导致tearing，违反React的渲染规则

2. **getSnapshot必须返回稳定的引用吗？**
   → 方向：是的，每次调用应返回相同的引用（除非数据真的变了），否则会导致无限循环

---

# 第三部分：★★★ 专家级源码题（Q36-Q50）

---

## Q36: 手写React Fiber调度器的简化版（含优先级队列和时间切片）

- **难度**：★★★
- **知识点**：Scheduler / 优先级队列 / 时间切片 / 任务调度
- **题型**：编程实践题
- **关联源码**：`packages/scheduler/src/Scheduler.js` 和 `packages/scheduler/src/SchedulerMinHeap.js`

### 📝 完整实现代码

```javascript
/**
 * ========================================
 * [标题]: Mini React Scheduler
 * 展示任务优先级队列和时间切片的核心实现
 * ========================================
 */

// Step 1: 定义优先级常量
const PriorityLevels = {
  IMMEDIATE_PRIORITY: 1,    // 立即执行（同步）
  USER_BLOCKING_PRIORITY: 2,// 用户阻塞（交互）
  NORMAL_PRIORITY: 3,       // 普通
  LOW_PRIORITY: 4,          // 低优先级
  IDLE_PRIORITY: 5,         // 空闲时执行
};

// Step 2: 实现最小堆（优先级队列）
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() { return this.heap.length; }
  isEmpty() { return this.heap.length === 0; }
  peek() { return this.heap.length > 0 ? this.heap[0] : null; }

  push(task) {
    this.heap.push(task);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.compare(parentIndex, index) <= 0) break;
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    const length = this.heap.length;
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestIndex = index;

      if (leftChildIndex < length && 
          this.compare(leftChildIndex, smallestIndex) < 0) {
        smallestIndex = leftChildIndex;
      }
      if (rightChildIndex < length && 
          this.compare(rightChildIndex, smallestIndex) < 0) {
        smallestIndex = rightChildIndex;
      }
      if (smallestIndex === index) break;
      this.swap(smallestIndex, index);
      index = smallestIndex;
    }
  }

  compare(i, j) {
    const taskI = this.heap[i];
    const taskJ = this.heap[j];
    const diff = taskI.sortIndex - taskJ.sortIndex;
    return diff !== 0 ? diff : taskI.id - taskJ.id;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

// Step 3: 实现Scheduler核心类
class Scheduler {
  constructor(options = {}) {
    this.frameYieldMs = options.frameYieldMs || 5;  // 时间片长度(ms)
    this.taskQueue = new MinHeap();      // 即时任务队列
    this.timerQueue = new MinHeap();     // 延迟任务队列
    this.isPerformingWork = false;
    this.currentTask = null;
    this.taskIDCounter = 0;
  }

  scheduleCallback(priorityLevel, callback, options = {}) {
    const currentTime = performance.now();
    const startTime = options.delay !== undefined 
      ? currentTime + options.delay 
      : currentTime;
    
    let timeout;
    switch (priorityLevel) {
      case PriorityLevels.IMMEDIATE_PRIORITY: timeout = -1; break;
      case PriorityLevels.USER_BLOCKING_PRIORITY: timeout = 250; break;
      case PriorityLevels.LOW_PRIORITY: timeout = 10000; break;
      case PriorityLevels.IDLE_PRIORITY: timeout = Infinity; break;
      default: timeout = 5000; break;
    }
    
    const newTask = {
      id: ++this.taskIDCounter,
      callback,
      priorityLevel,
      startTime,
      expirationTime: startTime + timeout,
      sortIndex: startTime > currentTime ? startTime : expirationTime,
    };
    
    if (startTime > currentTime) {
      newTask.sortIndex = startTime;
      this.timerQueue.push(newTask);
    } else {
      newTask.sortIndex = expirationTime;
      this.taskQueue.push(newTask);
    }
    
    return newTask;
  }

  flushWork(hasTimeRemaining, initialTime) {
    this.isPerformingWork = true;
    try {
      this.advanceTimers(initialTime);
      this.currentTask = this.peek(this.taskQueue);
      
      while (this.currentTask !== null) {
        if (this.currentTask.expirationTime > initialTime &&
            (!hasTimeRemaining || performance.now() - initialTime >= this.frameYieldMs)) {
          break;
        }
        
        const callback = this.currentTask.callback;
        if (typeof callback === 'function') {
          this.currentTask.callback = null;
          const continuationCallback = callback();
          
          if (typeof continuationCallback === 'function') {
            this.currentTask.callback = continuationCallback;
          } else {
            if (this.currentTask === this.peek(this.taskQueue)) {
              this.pop(this.taskQueue);
            }
          }
        } else {
          if (this.currentTask === this.peek(this.taskQueue)) {
            this.pop(this.taskQueue);
          }
        }
        this.currentTask = this.peek(this.taskQueue);
      }
      return this.currentTask !== null;
    } finally {
      this.isPerformingWork = false;
    }
  }

  peek(queue) { return queue.peek(); }
  pop(queue) { return queue.pop(); }
  advanceTimers(currentTime) {
    let timer = this.peek(this.timerQueue);
    while (timer !== null) {
      if (timer.callback === null) { this.pop(this.timerQueue); timer = this.peek(this.timerQueue); }
      else if (timer.startTime <= currentTime) {
        this.pop(this.timerQueue);
        timer.sortIndex = timer.expirationTime;
        this.taskQueue.push(timer);
        timer = this.peek(this.timerQueue);
      } else { return; }
    }
  }
}

// 使用示例
const scheduler = new Scheduler();

scheduler.scheduleCallback(PriorityLevels.NORMAL_PRIORITY, () => {
  console.log('Normal priority task executed');
});

scheduler.scheduleCallback(PriorityLevels.IMMEDIATE_PRIORITY, () => {
  console.log('Immediate priority task executed');
});
```

### 💡 代码逐行解析

| 行号 | 代码 | 说明 |
|------|------|------|
| 8-14 | `PriorityLevels` | 定义5个优先级等级，数值越小优先级越高 |
| 17-68 | `MinHeap` | 实现最小堆数据结构，用于优先级队列 |
| 23-25 | `size()/isEmpty()` | 堆的基本操作，判断队列状态 |
| 28-33 | `peek()` | 获取堆顶元素但不移除，O(1)时间复杂度 |
| 36-40 | `push()` | 插入元素并调整堆结构，O(log n)时间复杂度 |
| 43-50 | `pop()` | 移除并返回堆顶元素，O(log n)时间复杂度 |
| 53-59 | `bubbleUp()` | 上浮操作，维护堆性质 |
| 62-76 | `bubbleDown()` | 下沉操作，维护堆性质 |
| 79-81 | `compare()` | 比较两个任务的优先级 |
| 84-91 | `Scheduler构造函数` | 初始化调度器的各种状态和配置 |
| 94-128 | `scheduleCallback()` | 调度任务的主入口，创建任务对象并放入队列 |
| 131-167 | `flushWork()` | 核心工作循环，实现时间切片和任务执行 |

### 🔍 与官方实现的对比

| 能力 | 手写版 | 官方版 | 差异原因 |
|------|:------:|:------:|---------|
| 优先级队列 | ✅ MinHeap | ✅ MinHeap | 核心算法相同 |
| 时间切片 | ✅ shouldYield | ✅ shouldYieldToHost | 手写版简化了条件判断 |
| 任务中断/恢复 | ✅ continuationCallback | ✅ continuationCallback | 核心机制相同 |
| 延迟任务 | ✅ timerQueue | ✅ timerQueue | 实现思路一致 |
| 并发特性 | 部分 | ✅ 完整 | 手写版缺少lanes模型 |

---

## Q37: 手写mini-Hooks系统（useState/useEffect/useMemo的完整实现）

- **难度**：★★★
- **知识点**：Hooks / useState / useEffect / useMemo / 链表结构
- **题型**：编程实践题
- **关联源码**：`packages/react-reconciler/src/ReactFiberHooks.js`

### 📝 完整实现代码

```javascript
/**
 * ========================================
 * [标题]: Mini React Hooks System
 * 展示Hooks链表结构和核心Hook的实现
 * ========================================
 */

let currentComponent = null;
let hookIndex = 0;
let isMounting = true;

class MiniFiber {
  constructor(type, props) {
    this.type = type;
    this.props = props;
    this.hooks = [];
    this.oldHooks = [];
  }
}

function useState(initialState) {
  const hook = getCurrentHook();
  
  if (isMounting) {
    hook.state = typeof initialState === 'function' ? initialState() : initialState;
    hook.queue = [];
  } else {
    processUpdateQueue(hook);
  }
  
  const setState = (action) => {
    const update = typeof action === 'function' ? action(hook.state) : action;
    hook.queue.push(update);
    rerender();
  };
  
  return [hook.state, setState];
}

function useEffect(create, deps) {
  const hook = getCurrentHook();
  
  if (isMounting) {
    hook.effect = { create, deps, cleanup: undefined, tag: 'hasEffect' };
  } else {
    const oldDeps = hook.effect.deps;
    const hasChanged = !areDepsEqual(deps, oldDeps);
    if (hasChanged) {
      hook.effect.deps = deps;
      hook.effect.create = create;
      hook.effect.tag = 'hasEffect';
    } else {
      hook.effect.tag = 'noChange';
    }
  }
}

function useMemo(create, deps) {
  const hook = getCurrentHook();
  if (isMounting) {
    hook.memoizedValue = create();
    hook.deps = deps;
  } else {
    if (!areDepsEqual(deps, hook.deps)) {
      hook.memoizedValue = create();
      hook.deps = deps;
    }
  }
  return hook.memoizedValue;
}

function useCallback(fn, deps) {
  return useMemo(() => fn, deps);
}

function useRef(initialValue) {
  const hook = getCurrentHook();
  if (isMounting) {
    hook.ref = { current: initialValue };
  }
  return hook.ref;
}

function getCurrentHook() {
  const hooks = currentComponent.hooks;
  if (isMounting) {
    const hook = { state: null, memoizedValue: null, effect: null, ref: null, queue: [], deps: null };
    hooks.push(hook);
    return hook;
  } else {
    const oldHook = currentComponent.oldHooks[hookIndex];
    if (!oldHook) throw new Error('Hook数量不一致！');
    if (hooks[hookIndex]) return hooks[hookIndex];
    const newHook = { ...oldHook };
    hooks.push(newHook);
    return newHook;
  }
}

function processUpdateQueue(hook) {
  for (const update of hook.queue) { hook.state = update; }
  hook.queue = [];
}

function areDepsEqual(nextDeps, prevDeps) {
  if (nextDeps === null || prevDeps === null) return false;
  if (nextDeps.length !== prevDeps.length) return false;
  for (let i = 0; i < nextDeps.length; i++) {
    if (!Object.is(nextDeps[i], prevDeps[i])) return false;
  }
  return true;
}

function rerender() {
  currentComponent.oldHooks = currentComponent.hooks;
  hookIndex = 0;
  isMounting = false;
  runEffects();
}

function runEffects() {
  for (let i = 0; i < currentComponent.hooks.length; i++) {
    const hook = currentComponent.hooks[i];
    const oldHook = currentComponent.oldHooks[i];
    if (oldHook?.effect?.cleanup) oldHook.effect.cleanup();
    if (hook.effect?.tag === 'hasEffect') {
      const cleanup = hook.effect.create();
      hook.effect.cleanup = cleanup;
    }
  }
}

function render(component, container) {
  isMounting = true;
  hookIndex = 0;
  const fiber = new MiniFiber(component, {});
  currentComponent = fiber;
  component({});
  runEffects();
  return fiber;
}

// 使用示例
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => { console.log('Effect:', count); return () => console.log('Cleanup'); }, [count]);
  const doubled = useMemo(() => count * 2, [count]);
  return { count, doubled };
}

const fiber = render(Counter, document.body);
console.log('Initial state:', fiber.hooks.map(h => h.state));
```

### 💡 代码逐行解析

| 行号 | 代码 | 说明 |
|------|------|------|
| 4-6 | 全局变量 | 管理当前渲染上下文，对应React内部的currentlyRenderingFiber等 |
| 9-13 | `MiniFiber` | 简化的Fiber节点，存储组件信息和Hook链表 |
| 16-28 | `useState` | 状态Hook，支持初始值和更新函数，维护更新队列 |
| 31-44 | `useEffect` | 副作用Hook，支持依赖比较和cleanup函数 |
| 47-55 | `useMemo` | 记忆化Hook，根据依赖缓存计算结果 |
| 58-60 | `useCallback` | 基于useMemo实现，缓存函数引用 |
| 63-68 | `useRef` | 引用Hook，返回可变引用对象 |

### 🔍 与官方实现的对比

| 能力 | 手写版 | 官方版 | 差异原因 |
|------|:------:|:------:|---------|
| useState | ✅ | ✅ | 核心逻辑一致 |
| useEffect | ✅ | ✅ | 支持基本的cleanup和依赖比较 |
| useMemo | ✅ | ✅ | 缓存机制相同 |
| Hook链表 | ✅ 数组 | ✅ 链表 | 数组更易理解，生产环境用链表更高效 |

---

## Q38: 手写React Diff算法（同层级比较、单节点/多节点Diff）

- **难度**：★★★
- **知识点**：Diff算法 / 虚拟DOM / 树比较 / 最长递增子序列
- **题型**：编程实践题
- **关联源码**：`packages/react-reconciler/src/ReactChildFiber.js`

### 📝 完整实现代码

```javascript
/**
 * ========================================
 * [标题]: Mini React Diff Algorithm
 * 展示单节点Diff和多节点Diff的核心实现
 * ========================================
 */

const VNODE_TYPES = { TEXT: 'TEXT', ELEMENT: 'ELEMENT' };

function createElement(type, props, ...children) {
  return {
    type,
    props: { ...props, children: children.flat().map(child =>
      typeof child === 'object' ? child : { type: VNODE_TYPES.TEXT, props: { nodeValue: child }, key: null }
    )},
    key: props?.key || null,
  };
}

class Reconciler {
  constructor() { this.patches = []; }

  reconcile(oldVNode, newVNode) {
    this.patches = [];
    this.diffNode(oldVNode, newVNode, null, 0);
    return this.patches;
  }

  diffNode(oldVNode, newVNode, parent, index) {
    if (newVNode === null || newVNode === undefined) {
      this.patches.push({ type: 'REMOVE', vNode: oldVNode, parent, index });
      return;
    }
    if (oldVNode === null || oldVNode === undefined) {
      this.patches.push({ type: 'INSERT', vNode: newVNode, parent, index });
      return;
    }
    if (oldVNode.type !== newVNode.type) {
      this.patches.push({ type: 'REPLACE', oldVNode, newVNode, parent, index });
      return;
    }
    if (oldVNode.type === VNODE_TYPES.TEXT) {
      if (oldVNode.props.nodeValue !== newVNode.props.nodeValue) {
        this.patches.push({ type: 'TEXT_UPDATE', vNode: newVNode, parent, index });
      }
      return;
    }
    if (oldVNode.type === VNODE_TYPES.ELEMENT) {
      this.diffProps(oldVNode, newVNode);
      this.diffChildren(oldVNode, newVNode);
    }
  }

  diffProps(oldVNode, newVNode) {
    const oldProps = oldVNode.props || {};
    const newProps = newVNode.props || {};
    for (const key in newProps) {
      if (key !== 'children' && oldProps[key] !== newProps[key]) {
        this.patches.push({ type: 'PROP_UPDATE', vNode: newVNode, key, oldValue: oldProps[key], newValue: newProps[key] });
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps) && key !== 'children') {
        this.patches.push({ type: 'PROP_REMOVE', vNode: newVNode, key, oldValue: oldProps[key] });
      }
    }
  }

  diffChildren(oldVNode, newVNode) {
    const oldChildren = oldVNode.props.children || [];
    const newChildren = newVNode.props.children || [];

    const keyedOldChildren = {};
    const oldChildrenWithoutKey = [];
    
    oldChildren.forEach((child, index) => {
      if (child.key !== null) keyedOldChildren[child.key] = { child, index };
      else oldChildrenWithoutKey.push({ child, index });
    });

    newChildren.forEach((newChild, newIndex) => {
      if (newChild.key !== null) {
        const matched = keyedOldChildren[newChild.key];
        if (matched) {
          delete keyedOldChildren[newChild.key];
          this.diffNode(matched.child, newChild, oldVNode, newIndex);
        } else {
          this.patches.push({ type: 'INSERT', vNode: newChild, parent: oldVNode, index: newIndex });
        }
      } else {
        const oldChild = oldChildrenWithoutKey.shift();
        if (oldChild) this.diffNode(oldChild.child, newChild, oldVNode, newIndex);
        else this.patches.push({ type: 'INSERT', vNode: newChild, parent: oldVNode, index: newIndex });
      }
    });

    Object.values(keyedOldChildren).forEach(({ child, index }) => {
      this.patches.push({ type: 'REMOVE', vNode: child, parent: oldVNode, index });
    });
    oldChildrenWithoutKey.forEach(({ child, index }) => {
      this.patches.push({ type: 'REMOVE', vNode: child, parent: oldVNode, index });
    });
  }
}

// 使用示例
function testDiff() {
  const reconciler = new Reconciler();

  const oldVNode = createElement('ul', {},
    createElement('li', { key: 'a' }, 'A'),
    createElement('li', { key: 'b' }, 'B'),
    createElement('li', { key: 'c' }, 'C')
  );
  
  const newVNode = createElement('ul', {},
    createElement('li', { key: 'a' }, 'A'),
    createElement('li', { key: 'c' }, 'C'),
    createElement('li', { key: 'd' }, 'D')
  );
  
  const patches = reconciler.reconcile(oldVNode, newVNode);
  console.log('Patches:', patches);
  // 应该产生：B删除，D新增
}

testDiff();
```

### 💡 代码逐行解析

| 行号 | 代码 | 说明 |
|------|------|------|
| 4-6 | `VNODE_TYPES` | 定义虚拟DOM节点类型常量 |
| 9-15 | `createElement` | 创建虚拟DOM节点的工厂函数 |
| 18-24 | `Reconciler` | Diff协调器的主类 |
| 26-48 | `diffNode` | 单节点Diff，处理5种基本情况 |
| 51-63 | `diffProps` | 属性Diff，找出新增、修改、删除的属性 |
| 66-99 | `diffChildren` | **核心**：多节点Diff，使用key建立映射 |

### 🔍 与官方实现的对比

| 能力 | 手写版 | 官方版 | 差异原因 |
|------|:------:|:------:|---------|
| 单节点Diff | ✅ | ✅ | 算法完全一致 |
| 多节点Diff（有key） | ✅ | ✅ | 使用相同的key-map策略 |
| 移动检测 | ✅ 基础 | ✅ LIS算法 | 官方版使用最长递增子序列优化移动次数 |

---

## Q39: 如果让你重新设计React的状态管理，你会怎么做？（对比Redux/Zustand/Jotai）

- **难度**：★★★
- **知识点**：状态管理 / Redux / Zustand / Jotai / 架构设计
- **题型**：架构设计题
- **关联源码**：无特定源码，综合性设计题

### 参考答案要点：

#### 1. **理想状态管理的特征**

```javascript
// 我理想的状态管理系统应该具备：

// 1. 极简API（像Zustand一样简单）
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// 2. 细粒度更新（像Jotai一样精准）
const countAtom = atom(0);
const doubledAtom = atom((get) => get(countAtom) * 2);

// 3. 强大的DevTools（像Redux一样完善）
// - 时间旅行调试
// - Action追踪
// - 性能分析

// 4. TypeScript友好
// - 完整的类型推断
// - 泛型支持

// 5. 并发安全
// - 支持useSyncExternalStore
// - 无tearing问题
```

#### 2. **方案对比总结**

| 特征 | Redux | Zustand | Jotai | 我的方案 |
|------|-------|---------|-------|---------|
| **API复杂度** | 高 | 低 | 中 | **低** |
| **学习曲线** | 陡峭 | 平缓 | 中等 | **平缓** |
| **包大小** | ~7KB | ~200B | ~2KB | **~1KB** |
| **TypeScript** | 好 | 优秀 | 优秀 | **优秀** |
| **DevTools** | 完善 | 基础 | 基础 | **完善** |
| **细粒度更新** | 需selector | 需selector | **天然** | **天然** |
| **并发安全** | 需适配 | **原生** | **原生** | **原生** |

### 🔍 追问链

1. **如何处理状态持久化和 hydration？**
   → 方向：结合localStorage/IndexedDB，支持SSR的初始状态注入

2. **如何支持跨组件/跨tab的状态同步？**
   → 方向：BroadcastChannel API + CRDT或最后写入获胜策略

---

## Q40: 分析React Fiber架构的设计优劣？与Vue3的响应式系统对比

- **难度**：★★★
- **知识点**：Fiber架构 / Vue3响应式 / 设计哲学 / 框架对比
- **题型**：架构分析题
- **关联源码**：React和Vue3源码对比分析

### 参考答案要点：

#### 1. **React Fiber架构的优势**

```javascript
// 优势1：可中断渲染
// - 时间切片保证60fps
// - 高优先级任务可以打断低优先级任务
// - 适合复杂交互场景

// 优势2：声明式编程范式
// - "UI = f(state)"的纯函数思想
// - 减少副作用，代码可预测性强

// 优势3：强大的抽象能力
// - 虚拟DOM屏蔽平台差异
// - 同一套代码可以渲染到Web/Native/Canvas等
```

#### 2. **两者深度对比**

| 维度 | React Fiber | Vue3 Reactivity |
|------|-------------|------------------|
| **核心理念** | 不可变数据 + 重新渲染 | 可变数据 + 精准更新 |
| **更新机制** | Pull（React主动拉取变化） | Push（数据变化推送通知） |
| **性能优化** | 手动优化（memo/hooks） | 半自动（依赖追踪） |
| **心智模型** | "何时重新渲染？" | "什么触发了更新？" |
| **内存占用** | 较高（双Fiber树） | 较低（Proxy开销） |
| **包体积** | 较大（42KB+） | 较小（~33KB） |
| **TypeScript** | 好（但any较多） | 优秀（全面TS重写） |

### 🔍 追问链

1. **React会选择响应式系统吗？Signals提案的意义？**
   → 方向：React团队倾向于保持Pull模型，Signals是实验性的补充

2. **未来前端框架的发展方向是什么？**
   → 方向：编译时优化 + 运行时最小化 + 部分响应式 + Server Components

---

## Q41: 设计一个支持并发渲染的任务调度系统（基于React Scheduler思想）

- **难度**：★★★
- **知识点**：任务调度 / 并发渲染 / 优先级 / 时间切片
- **题型**：架构设计题
- **关联源码**：`packages/scheduler/src/Scheduler.js`

### 参考答案要点：

#### 1. **系统需求分析**

```javascript
// 需求清单：
// 1. 优先级管理：支持至少5个优先级等级
// 2. 时间切片：每个任务最多执行N毫秒
// 3. 可中断性：任务可以被暂停和恢复
// 4. 饥饿预防：低优先级任务最终必须被执行
// 5. 批处理：合并同类任务减少调度开销
// 6. 错误隔离：单个任务失败不影响其他任务
// 7. 可观测性：支持性能监控和调试
```

#### 2. **核心设计要点**

```javascript
class ConcurrentScheduler {
  constructor(config = {}) {
    this.config = {
      timeSlice: config.timeSlice || 5,           // 时间片(ms)
      maxConcurrentTasks: config.maxConcurrentTasks || 3,
      starvationThreshold: config.starvationThreshold || 5000,
    };
    
    this.taskQueues = {};  // 按优先级分类的队列
    this.delayedTasks = new DelayedQueue();  // 延迟任务
    
    // 调度循环
    async schedulingLoop() {
      while (this.hasWorkToDo()) {
        this.promoteDelayedTasks();
        this.handleStarvation();
        const task = this.selectNextTask();
        await this.executeWithTimeSlice(task);
      }
    }
  }
}
```

### 🔍 追问链

1. **如何处理任务间的依赖关系？**
   → 方向：引入DAG（有向无环图）拓扑排序，或使用async/await链式依赖

2. **如何保证分布式环境下的任务调度一致性？**
   → 方向：引入协调服务（如Zookeeper/etcd），使用分布式锁和事件广播

---

## Q42: React 16 → 17 → 18 的演进趋势分析？架构层面的变化

- **难度**：★★★
- **知识点**：React版本演进 / 架构变迁 / 新特性 / 设计理念
- **题型**：综合分析题
- **关联源码**：各版本的关键变更

### 参考答案要点：

#### 1. **各版本核心变革**

```javascript
// React 16 (2017): Fiber时代开启
// - Fiber架构（完全重写协调算法）
// - Error Boundaries
// - Hooks (16.8)

// React 17 (2020): 渐进式升级
// - 事件委托从document改为root容器
// - 支持多版本共存
// - 移除事件池

// React 18 (2022): 并发时代
// - Automatic Batching
// - startTransition
// - Suspense增强
// - 流式SSR
```

#### 2. **版本对比总表**

| 特性 | React 16 | React 17 | React 18 |
|------|----------|----------|----------|
| **核心架构** | Fiber | Fiber | Concurrent Fiber |
| **批处理** | 仅事件/React内 | 仅事件/React内 | 全部自动 |
| **并发特性** | ❌ | ❌ | ✅ |
| **Transitions** | ❌ | ❌ | ✅ |
| **渐进升级** | ❌ | ✅ | ✅ |

### 🔍 追问链

1. **React 19（未来）的可能方向？**
   → 方向：React Compiler稳定化、Server Components正式版、Actions稳定化

---

## Q43: React Server Components（RSC）的原理是什么？与SSR的区别？

- **难度**：★★★
- **知识点**：RSC / SSR / Server Components / 架构设计
- **题型**：架构分析题
- **关联源码**：`packages/react-server/src/ReactFizzServer.js`

### 参考答案要点：

#### 1. **RSC vs SSR vs CSR 对比**

| 特性 | CSR | SSR | RSC |
|------|-----|-----|-----|
| **渲染位置** | 客户端 | 服务端 | 服务端+客户端混合 |
| **交互性** | ✅ 完全 | ❌ 需要hydration | ✅ 组件级别 |
| **数据获取** | 客户端 | 服务端预取 | 服务端直接访问数据库 |
| **Bundle大小** | 大 | 中 | **小**（零JS） |
| **组件类型** | 所有组件 | 所有组件 | Server/Client分离 |

#### 2. **RSC的核心原理**

```javascript
// RSC将组件分为两类：
// 1. Server Components：仅在服务器运行，不发送JS给客户端
// 2. Client Components：在客户端运行，需要 hydration

// Server Component示例
async function Note({id}) {
  // ✅ 可以直接访问数据库
  const note = await db.query(`SELECT * FROM notes WHERE id = ${id}`);
  
  // ✅ 可以使用服务器资源
  const markdown = await fs.readFile(note.path, 'utf8');
  
  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      {/* Client Component */}
      <LikeButton noteId={id} />
    </div>
  );
}

// RSC的工作流程：
// 1. 服务器解析组件树
// 2. Server Components直接渲染为HTML/JSON
// 3. Client Components标记为占位符
// 4. 客户端接收序列化的结果
// 5. 客户端只下载Client Components的JS
```

### 🔍 追问链

1. **RSC的实际性能收益有多大？**
   → 方向：取决于Server Components的比例，理论上可减少30-70%的JS bundle

2. **RSC对开发者体验的影响？**
   → 方向：需要区分Server/Client组件，增加了心智负担但换来了更好的性能

---

## Q44: 从源码角度分析React的性能瓶颈及优化方向

- **难度**：★★★
- **知识点**：性能瓶颈 / 源码分析 / 优化策略 / 工程实践
- **题型**：综合分析题
- **关联源码**：性能相关模块的综合分析

### 参考答案要点：

#### 1. **主要性能瓶颈**

```javascript
// 瓶颈1：JavaScript执行耗时
// - 大型应用的bundle过大
// - 首次渲染的计算量大
// 解决：Code Splitting、Tree Shaking、Lazy Loading

// 瓶颈2：不必要的重渲染
// - props引用频繁变化
// - Context粒度过粗
// 解决：React.memo、useMemo/useCallback、Context拆分

// 瓶颈3：内存占用高
// - 双Fiber树的存在
// - 闭包导致的内存泄漏
// 解决：虚拟化长列表、及时清理effect、使用WeakMap

// 瓶颈4：调和过程的开销
// - O(n)的Diff算法在大列表时仍然慢
// - 深层嵌套组件的遍历
// 解决：虚拟滚动、扁平化组件树、使用key优化
```

#### 2. **优化方向**

```javascript
// 方向1：编译时优化（React Compiler）
// 自动插入memo/useMemo/useCallback
// 减少开发者的心智负担

// 方向2：离屏渲染（Offscreen Component）
// 预渲染不可见的内容
// 类似于虚拟DOM但针对组件级别

// 方向3：增量式静态再生（ISR）
// 只重新生成变化的页面
// 结合CDN缓存策略

// 方向4：WebAssembly集成
// 将热点路径编译为WASM
// 提升计算密集型操作的性能
```

### 🔍 追问链

1. **React Compiler（Forget）会解决多少性能问题？**
   → 方向：预计减少80%的手动优化代码，但仍需理解原理

2. **WebAssembly在前端框架中的应用前景？**
   → 方向：适合计算密集型场景（如图表、3D、视频处理），但不适合DOM操作

---

## Q45: 如何实现一个自定义的React Renderer？（参考react-three-fiber）

- **难度**：★★★
- **知识点**：自定义Renderer / react-three-fiber / 跨平台 / 架构设计
- **题型**：架构设计题
- **关联源码**：`packages/react-reconciler` 的Renderer接口

### 参考答案要点：

#### 1. **React Renderer的架构**

```javascript
// React的Reconciler（协调器）是平台无关的
// 通过HostConfig（宿主配置）适配不同平台

// Renderer接口的核心部分：
const HostConfig = {
  // 创建实例
  createInstance(type, props, rootContainerInstance, hostContext, handle),
  
  // 创建文本实例
  createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle),
  
  // 插入子节点
  appendInitialChild(parentInstance, child),
  appendChild(parentInstance, child),
  insertBefore(parentInstance, child, beforeChild),
  
  // 移除子节点
  removeChild(parentInstance, child),
  
  // 更新属性
  finalizeInitialChildren(instance, type, props, rootContainerInstance),
  prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, hostContext),
  commitUpdate(instance, updatePayload, type, oldProps, newProps),
  
  // 调度和生命周期
  schedulePassiveEffects(fiber, finishedWork),
  cancelPassiveEffects(fiber),
  
  // 其他
  getPublicInstance(instance),
  getRootHostContext(rootContainerInstance),
  getChildHostContext(parentHostContext, type, rootContainerInstance),
  // ...
};
```

#### 2. **实现一个简单的Canvas Renderer**

```javascript
import Reconciler from 'react-reconciler';

const CanvasHostConfig = {
  // 创建Canvas元素（如矩形、圆形、文字）
  createInstance(type, props) {
    switch (type) {
      case 'RECT':
        return { type: 'rect', x: props.x, y: props.y, width: props.width, height: props.height, fill: props.fill };
      case 'CIRCLE':
        return { type: 'circle', cx: props.cx, cy: props.cy, r: props.r, fill: props.fill };
      case 'TEXT':
        return { type: 'text', x: props.x, y: props.y, text: props.children, font: props.font };
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  },

  // 创建文本实例
  createTextInstance(text) {
    return { type: 'text', text };
  },

  // 插入子节点
  appendInitialChild(parent, child) {
    if (!parent.children) parent.children = [];
    parent.children.push(child);
  },

  // 更新属性
  prepareUpdate(instance, type, oldProps, newProps) {
    return Object.keys(newProps).filter(key => oldProps[key] !== newProps[key]);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    updatePayload.forEach(key => {
      instance[key] = newProps[key];
    });
  },

  // 渲染到Canvas
  commitRoot(root) {
    const ctx = root.context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    renderToCanvas(ctx, root.child);
  },
};

const CanvasRenderer = Reconciler(CanvasHostConfig);

// 使用示例
const CanvasRoot = CanvasRenderer.createContainer(
  document.getElementById('canvas').getContext('2d'),
  false,
  false
);

function App() {
  return (
    <rect x="10" y="10" width="100" height="100" fill="red" />
    <circle cx="200" cy="200" r="50" fill="blue" />
    <text x="20" y="150" font="20px Arial">Hello Canvas!</text>
  );
}

CanvasRenderer.updateContainer(App(), CanvasRoot, null, () => {});
```

### 🔍 追问链

1. **自定义Renderer的应用场景有哪些？**
   → 方向：游戏开发（react-three-fiber）、Native应用（React Native）、AR/VR、命令行界面

2. **如何处理自定义Renderer中的事件系统？**
   → 方向：需要实现自己的事件合成和分发机制，或借用现有的事件库

---

## Q46: React的Compiler（Forget编译器）的编译优化思路？

- **难度**：★★★
- **知识点**：React Compiler / Forget / 编译优化 / 自动记忆化
- **题型**：架构分析题
- **关联源码**：experimental React Compiler

### 参考答案要点：

#### 1. **Compiler的目标**

```javascript
// React Compiler（代号Forget）的目标：
// 1. 自动推断何时需要memoization
// 2. 减少手动的useMemo/useCallback/useMemo
// 3. 保持正确的语义（不改变程序行为）
// 4. 最小化运行时开销

// 编译前的代码：
function ExpensiveComponent({ items, filter }) {
  // 开发者忘记使用useMemo
  const filtered = items.filter(item => item.name.includes(filter));
  const sorted = filtered.sort((a, b) => a.price - b.price);
  return sorted.map(item => <Item key={item.id} data={item} />);
}

// 编译后的代码（自动优化）：
function ExpensiveComponent$compiled({ items, filter }) {
  // Compiler自动插入优化
  const $filtered = useMemo(() => 
    items.filter(item => item.name.includes(filter)), 
    [items, filter]
  );
  const $sorted = useMemo(() => 
    [...$filtered].sort((a, b) => a.price - b.price), 
    [$filtered]
  );
  return $sorted.map(item => <Item key={item.id} data={item} />);
}
```

#### 2. **编译优化技术**

```javascript
// 技术1：依赖图分析
// Compiler构建组件的依赖图
// 分析哪些变量依赖于哪些props/state

// 技术2：作用域分析
// 区分局部变量和跨渲染的变量
// 只有跨渲染的变量才需要memoization

// 技术3：副作用推断
// 分析函数是否是纯函数
// 纯函数可以被安全地缓存

// 技术4：HOC自动生成
// 自动为组件包裹React.memo
// 当props没变时跳过渲染
```

### 🔍 追问链

1. **Compiler的误判率如何？会不会导致bug？**
   → 方向：保守策略，宁可多优化也不遗漏；提供escape hatch禁用优化

2. **Compiler对大型项目的构建时间影响？**
   → 方向：增加约10-20%的构建时间，但换来运行时性能提升

---

## Q47: React vs Vue3 vs Svelte的架构设计哲学对比

- **难度**：★★★
- **知识点**：框架对比 / 设计哲学 / 架构选择 / 技术选型
- **题型**：综合分析题
- **关联源码**：三大框架源码对比

### 参考答案要点：

#### 1. **三大框架核心理念对比**

| 维度 | React | Vue3 | Svelte |
|------|-------|------|--------|
| **核心理念** | UI = f(state) | 渐进式框架 | 编译时框架 |
| **范式** | 命令式+声明式 | 响应式声明式 | 响应式+编译时 |
| **运行时大小** | ~42KB (gzip) | ~33KB (gzip) | **~1.6KB (gzip)** |
| **虚拟DOM** | ✅ 必须 | ✅ 默认 | ❌ 无 |
| **响应式** | 手动（hooks） | **自动**（Proxy） | **自动**（编译） |
| **TypeScript** | 好 | **优秀** | **优秀** |
| **学习曲线** | 中等 | 平缓 | **最平缓** |
| **生态成熟度** | **最高** | 高 | 成长中 |
| **SSR支持** | Next.js | Nuxt 3 | SvelteKit |

#### 2. **适用场景建议**

```javascript
// 选择React的场景：
// - 大型企业项目、团队协作规范要求高
// - 需要跨平台（React Native）
// - 已有React技术栈
// - 强调函数式编程

// 选择Vue3的场景：
// - 中小型项目、快速开发
// - 团队新手较多
// - 从Vue2迁移
// - 追求良好的DX（开发者体验）

// 选择Svelte的场景：
// - 追求极致性能和小体积
// - 内容网站、博客
// - 不想引入复杂的构建工具
// - 关注Web标准的未来
```

### 🔍 追问链

1. **Svelte没有虚拟DOM，为什么还能高效？**
   → 方向：编译时精确更新，不需要Diff算法；直接修改真实DOM

2. **三大框架的未来发展趋势？**
   → 方向：都向编译时优化发展，运行时越来越小，Server Components成为标配

---

## Q48: 学习React源码后，你对前端框架设计有哪些新认识？

- **难度**：★★★
- **知识点**：框架设计 / 架构思考 / 最佳实践 / 技术洞察
- **题型**：开放性论述题
- **关联源码**：综合性反思

### 参考答案要点：

#### 1. **架构设计的核心原则**

```javascript
// 认识1：分层架构的重要性
// React的优秀分层：
// - Scheduler（调度层）：负责时间和优先级
// - Reconciler（协调层）：负责组件树和Diff
// - Renderer（渲染层）：负责平台特定的渲染
// 各层独立，可以单独替换

// 认识2：权衡的艺术
// 没有完美的解决方案，只有合适的权衡
// - Fiber的可中断性 vs 复杂度
// - 虚拟DOM的跨平台 vs 性能开销
// - Hooks的简洁性 vs 学习曲线

// 认识3：渐进式演进的智慧
// React从不激进地破坏性变更
// - 16→17→18的平滑过渡
// - 向后兼容的同时引入新特性
// - 给社区足够的适应时间
```

#### 2. **工程实践的启示**

```javascript
// 启示1：抽象要有边界
// React的抽象恰到好处：
// - 不强制状态管理方案（Redux/Zustand/Jotai）
// - 不强制路由方案（React Router）
// - 不强制CSS方案（CSS Modules/Styled-components）
// 保持核心精简，生态繁荣

// 启示2：性能优化应该是默认行为
// - Automatic Batching（无需手动batch）
// - React Compiler（自动memoization）
// - 未来的Offscreen Component（自动懒加载）
// 让开发者专注于业务逻辑而非性能调优

// 启示3：开发者体验（DX）至关重要
// - 清晰的错误信息
// - React DevTools
// - Strict Mode的开发检查
// - 优秀的TypeScript支持
```

#### 3. **对未来技术的展望**

```javascript
// 展望1：Server Components将成为主流
// - 减少客户端JS bundle
// - 更好的首屏性能
// - 更自然的数据获取模式

// 展望2：编译时优化越来越重要
// - React Compiler
// - Vue的模板编译
// - Svelte的全程编译
// 运行时越来越薄，智能都在编译期完成

// 展望3：边缘计算的融合
// - Edge Functions + React
// - 分布式渲染
// - 全球部署的动态应用
```

### 🔍 追问链

1. **如何将React的设计原则应用到自己的项目中？**
   → 方向：分层解耦、渐进增强、关注点分离、提供良好的DX

2. **前端框架的终极形态是什么？**
   → 方向：可能是"无框架"——编译器根据代码自动选择最优的渲染策略

---

## Q49: React的Suspense for Data Fetching的完整实现思路？

- **难度**：★★★
- **知识点**：Suspense / 数据获取 / 异步组件 / 并发特性
- **题型**：架构设计题
- **关联源码**：`packages/react/src/ReactSuspense.js` 和实验性的数据获取API

### 参考答案要点：

#### 1. **Suspense Data Fetching的模式**

```javascript
// 传统模式（Promise + useEffect）：
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);
  
  if (loading) return <Spinner />;
  return <UserCard data={user} />;
}

// Suspense模式（throw Promise）：
function UserProfile({ userId }) {
  // 使用Suspense-aware的数据获取库
  const resource = fetchUser(userId);  // 返回resource对象
  
  // 如果数据还没准备好，会抛出Promise
  // Suspense会捕获这个Promise并显示fallback
  const user = resource.read();  // 可能抛出Promise！
  
  return <UserCard data={user} />;
}

// 外层用Suspense包裹
<Suspense fallback={<Spinner />}>
  <UserProfile userId={123} />
</Suspense>
```

#### 2. **Resource对象的实现思路**

```javascript
// 简化的Resource实现
function createResource(asyncFn) {
  let status = 'pending';  // pending | success | error
  let result;
  let error;
  let suspender = asyncFn()
    .then(data => {
      status = 'success';
      result = data;
    })
    .catch(err => {
      status = 'error';
      error = err;
    });

  return {
    read() {
      switch (status) {
        case 'pending':
          throw suspender;  // 关键！抛出Promise让Suspense捕获
        case 'success':
          return result;
        case 'error':
          throw error;
      }
    },
    
    // 预加载（可选）
    preload() {
      suspender.catch(() => {});  // 开始请求但不等待
    }
  };
}

// 使用示例
const userCache = {};

function getUserResource(userId) {
  if (!userCache[userId]) {
    userCache[userId] = createResource(() =>
      fetch(`/api/users/${userId}`).then(res => res.json())
    );
  }
  return userCache[userId];
}
```

#### 3. **完整的Suspense Data Fetching架构**

```javascript
// 推荐的生产级实现（配合Relay/Apollo/SWR/TanStack Query）：

// 1. 数据获取层
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users/:id" element={<UserPage />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

// 2. 页面组件（使用TanStack Query的Suspense模式）
function UserPage() {
  const { userId } = useParams();
  
  // useQuery的Suspense模式
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    suspense: true,  // 启用Suspense模式
  });
  
  return (
    <div>
      <h1>{user.name}</h1>
      <Suspense fallback={<PostsSkeleton />}>
        <UserPosts userId={userId} />
      </Suspense>
    </div>
  );
}

// 3. 嵌套Suspense实现渐进式加载
function UserPosts({ userId }) {
  const { data: posts } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchUserPosts(userId),
    suspense: true,
  });
  
  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
```

### 🔍 追问链

1. **Suspense Data Fetching的竞态条件如何处理？**
   → 方向：使用AbortController取消旧请求、请求去重、stale-while-revalidate

2. **如何实现数据的预加载（Prefetching）？**
   → 方向：路由级别的preload、link hover时的prefetch、预测性数据获取

---

## Q50: 前端框架源码学习的通用方法论

- **难度**：★★★
- **知识点**：学习方法 / 源码阅读 / 技术成长 / 知识体系
- **题型**：开放性论述题
- **关联源码**：综合性方法论总结

### 参考答案要点：

#### 1. **源码阅读的准备阶段**

```javascript
// Step 1: 选择合适的版本
// - 选择稳定的LTS版本（如React 18.2.0）
// - 不要从最新master分支开始（可能有实验性代码）
// - 配置好开发环境（IDE、调试工具）

// Step 2: 了解整体架构
// 先看目录结构，建立宏观认知：
// packages/
// ├── react/                  # 核心API（createElement、Hooks等）
// ├── react-dom/              # DOM渲染器
// ├── react-reconciler/       # 协调器（Fiber、Diff、调度）
// ├── scheduler/              # 调度器
// ├── shared/                 # 共享工具函数
// └── events/                 # 事件系统

// Step 3: 准备调试环境
// - 克隆源码仓库
// - 配置source map
// - 学会使用断点调试
```

#### 2. **推荐的阅读路线**

```javascript
// 第一阶段：基础入门（1-2周）
// 目标：理解核心概念和数据结构
// 1. createElement - JSX如何变成虚拟DOM
// 2. FiberNode - Fiber的数据结构
// 3. beginWork/completeWork - 协和过程
// 4. useState/useEffect - Hooks的基本实现

// 第二阶段：深入理解（2-4周）
// 目标：掌握关键算法和流程
// 5. Diff算法 - ReactChildFiber.js
// 6. 调度系统 - Scheduler
// 7. 批量更新 - executionContext
// 8. 优先级模型 - Lanes

// 第三阶段：融会贯通（持续）
// 目标：能够进行架构设计和优化
// 9. 并发模式的完整流程
// 10. 错误处理和恢复机制
// 11. 性能优化技巧
// 12. 与其他框架的对比
```

#### 3. **高效的阅读技巧**

```javascript
// 技巧1：从问题出发
// 不要从头读到尾，而是带着问题读：
// - "setState后发生了什么？"
// - "useEffect什么时候执行？"
// - "React如何知道需要更新哪个组件？"

// 技巧2：画图辅助理解
// - 画出Fiber树的结构
// - 画出渲染流程的时间线
// - 画出数据流向图

// 技巧3：写注释和笔记
// 在源码中添加自己的注释：
// function beginWork(current, workInProgress, renderLanes) {
//   // 这里的current是旧的Fiber，workInProgress是正在构建的新Fiber
//   // renderLanes表示本次渲染的优先级
//   
//   // 如果是首次渲染（current为空）...
// }

// 技巧4：动手实验
// 写小的demo来验证理解：
// function TestBatching() {
//   console.log('1. Before setState');
//   setState1();
//   console.log('2. After setState1');
//   setState2();
//   console.log('3. After setState2');
//   // 观察console输出顺序，理解批量更新的时机
// }

// 技巧5：结合社区资源
// - Dan Abramov的博客（overreacted.io）
// - Lin Clark的漫画（深度图文解读）
// - React官方文档的深入部分
// - 优质的视频教程（Conf演讲）
```

#### 4. **知识体系的构建**

```javascript
// 知识点之间的依赖关系：

// 基础层（必须先掌握）
// ├─ 虚拟DOM和JSX
// ├─ Fiber数据结构
// └─ 组件生命周期

// 进阶层（基于基础层）
// ├─ Diff算法
// ├─ 调和（Reconciliation）过程
// ├─ Hooks实现原理
// └─ 事件系统

// 专家层（需要综合运用）
// ├─ 并发模式和Scheduler
// ├─ Lanes优先级模型
// ├─ 性能优化策略
// └─ 自定义Renderer

// 横向扩展（对比学习）
// ├─ Vue3的响应式系统
// ├─ Svelte的编译优化
// └─ WebAssembly的可能性
```

#### 5. **常见误区和建议**

```javascript
// ❌ 常见误区：

// 误区1：试图一次性读完所有源码
// 建议：按需阅读，每次聚焦一个具体问题

// 误区2：纠结于每个细节
// 建议：先理解主流程，再逐步深入细节

// 误区3：只看不练
// 建议：边读边写，用自己的话复述，写博客分享

// 误区4：忽视版本差异
// 建议：明确你读的是哪个版本的源码，不同版本可能有较大差异

// 误区5：孤立地学习
// 建议：参与社区讨论，与他人交流，教学相长
```

### 🔍 追问链

1. **源码学习后如何应用到实际工作中？**
   → 方向：更好地做性能优化、排查疑难bug、做出更好的技术选型决策

2. **如何平衡源码学习和业务开发？**
   → 方向：利用碎片时间阅读，在工作中遇到问题时深入源码找答案

---

# 附录

## 附录A：React源码高频考点速查表

### 核心模块速查

| 模块 | 文件路径 | 核心功能 | 高频考点 |
|------|---------|---------|---------|
| **Reconciler** | `react-reconciler/src/ReactFiberWorkLoop.js` | 渲染工作循环 | workLoop、performUnitOfWork、commitRoot |
| **Fiber** | `react-reconciler/src/ReactFiber.js` | Fiber数据结构 | FiberNode、双缓存、flags标记 |
| **Diff** | `react-reconciler/src/ReactChildFiber.js` | 子节点比较 | key匹配、单/多节点Diff、LIS算法 |
| **Hooks** | `react-reconciler/src/ReactFiberHooks.js` | Hooks实现 | useState、useEffect、Hook链表 |
| **Scheduler** | `scheduler/src/Scheduler.js` | 任务调度 | 优先级队列、时间切片、MessageChannel |
| **Events** | `events/` | 事件系统 | 合成事件、事件委托、事件池 |
| **Legacy Mode** | `react-dom/src/` | DOM渲染 | ReactDOM.render、hydrate |
| **Concurrent Mode** | `react-dom/src/client/` | 新API | createRoot、hydrateRoot、Automatic Batching |

### 关键概念索引

| 概念 | 所在题目 | 核心要点 |
|------|---------|---------|
| Fiber架构 | Q01, Q17 | 可中断渲染、链表结构、双缓存 |
| 调和过程 | Q02, Q16 | beginWork→completeWork→commit |
| Hooks规则 | Q04, Q22 | 顺序调用、链表组织、条件限制 |
| Diff算法 | Q06, Q38 | 同层比较、O(n)、key作用 |
| 批量更新 | Q08, Q25 | executionContext、Automatic Batching |
| 优先级模型 | Q19, Q11 | Lanes、二进制位运算、5级优先级 |
| 时间切片 | Q20, Q41 | 5ms、shouldYield、MessageChannel |
| Commit三阶段 | Q21 | BeforeMutation→Mutation→Layout |
| Suspense | Q12, Q49 | Promise抛出、fallback、数据获取 |
| Error Boundary | Q29 | getDerivedStateFromError、componentDidCatch |
| Portal | Q30 | createPortal、事件冒泡、z-index |
| Hydration | Q27 | SSR配合、Mismatch处理、选择性Hydration |
| useSyncExternalStore | Q35 | tearing问题、外部store订阅 |
| DevTools | Q34 | __REACT_DEVTOOLS_GLOBAL_HOOK__、Profiler |
| 性能优化 | Q23, Q24, Q33 | bailout、shallowEqual、React.memo |

### 源码调试技巧

```javascript
// 1. 在本地搭建React源码调试环境
git clone https://github.com/facebook/react.git
cd react
npm install
npm run build

// 2. 在项目中使用本地构建的React
// package.json
{
  "dependencies": {
    "react": "file:../react/build/node_modules/react",
    "react-dom": "file:../react/build/node_modules/react-dom"
  }
}

// 3. 在源码中添加断点和日志
// 在ReactFiberWorkLoop.js的workLoop开头添加：
console.log('[workLoop] start', workInProgress?.type?.name);

// 4. 使用React DevTools的Profiler
// 安装React DevTools浏览器扩展
// 打开Profiler标签页，录制渲染性能
```

---

## 附录B：React源码阅读路线图

### 推荐的学习路径

```
第一阶段：基础入门（建议1-2周）
│
├─ 1.1 环境准备
│   ├─ 克隆React源码仓库
│   ├─ 配置IDE（推荐VS Code + TypeScript插件）
│   └─ 了解monorepo结构（lerna/workspace）
│
├─ 1.2 核心概念
│   ├─ Q01: Fiber架构概述
│   ├─ Q05: 虚拟DOM和JSX
│   └─ Q03: useState基本用法
│
└─ 1.3 第一个断点调试
    └─ 从ReactDOM.render开始跟踪执行流程
第二阶段：深入理解（建议2-4周）
│
├─ 2.1 渲染流程
│   ├─ Q16: 完整渲染流程（setState→DOM更新）
│   ├─ Q02: 调和（Reconciliation）过程
│   └─ Q21: Commit三阶段详解
│
├─ 2.2 核心算法
│   ├─ Q06: Diff算法原理
│   ├─ Q19: Lanes优先级模型
│   └─ Q11: Scheduler调度器
│
└─ 2.3 Hooks深入
    ├─ Q22: Hooks链表结构
    ├─ Q04: useEffect执行时机
    └─ Q28: useReducer实现
第三阶段：高级主题（建议4-8周）
│
├─ 3.1 并发特性
│   ├─ Q25: Concurrent Mode
│   ├─ Q20: 时间切片实现
│   └─ Q08: Automatic Batching
│
├─ 3.2 性能优化
│   ├─ Q23: React.memo和shallowEqual
│   ├─ Q24: Bailout机制
│   └─ Q33: 性能优化策略汇总
│
└─ 3.3 进阶特性
    ├─ Q12: Suspense
    ├─ Q29: Error Boundary
    ├─ Q35: useSyncExternalStore
    └─ Q43: Server Components
第四阶段：实战应用（持续）
│
├─ 4.1 手写实现
│   ├─ Q36: Mini Scheduler
│   ├─ Q37: Mini Hooks
│   └─ Q38: Mini Diff Algorithm
│
├─ 4.2 架构设计
│   ├─ Q39: 状态管理方案设计
│   ├─ Q41: 并发任务调度系统
│   └─ Q45: 自定义Renderer
│
└─ 4.3 框架对比与思考
    ├─ Q40: React vs Vue3
    ├─ Q47: 三大框架对比
    ├─ Q48: 学习心得总结
    └─ Q50: 方法论提炼
```

### 各知识点的依赖关系

```
                    ┌─────────────┐
                    │  虚拟DOM    │
                    │   (Q05)     │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  Fiber架构  │◄─────────────────────┐
                    │  (Q01,Q17)  │                      │
                    └──────┬──────┘                      │
                           │                             │
              ┌────────────┼────────────┐                │
              │            │            │                │
     ┌────────▼────┐ ┌────▼─────┐ ┌───▼──────┐         │
     │  调和过程    │ │ Diff算法  │ │ Hooks    │─────────┤
     │ (Q02,Q16)   │ │ (Q06,Q38)│ │(Q03,Q04, │         │
     └──────┬──────┘ └─────┬────┘ │ Q22,Q28) │         │
            │               │      └─────┬────┘         │
            │               │            │               │
     ┌──────▼───────────────▼────────────▼───────────────┤
     │                   渲染流程                            │
     │                  (Q16,Q21)                           │
     └───────────────────────┬─────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼────┐ ┌──────▼──────┐ ┌────▼─────────┐
     │  调度系统    │ │  性能优化    │ │  高级特性     │
     │(Q11,Q19,Q20)│ │(Q23,Q24,Q33)│ │(Q12,Q25,Q35) │
     └──────────────┘ └─────────────┘ └──────────────┘
```

### 配套资源推荐

#### 官方资源
- **React源码**: https://github.com/facebook/react/tree/v18.2.0
- **React文档**: https://react.dev
- **React Blog**: https://react.dev/blog （特别是Dan Abramov的文章）

#### 优质学习资源
- **Dan Abramov的博客**: https://overreacted.io （深入浅出讲解React原理）
- **Lin Clark的漫画系列**: A Cartoon Intro to Fiber （图文并茂）
- **indepth.dev**: React源码深度解析系列文章
- **《深入浅出React与Redux》**: 书籍，适合入门
- **《React设计原理》**: 卡颂著，中文优质资源

#### 视频资源
- **React Conf演讲**: 官方会议录像，了解最新动向
- **Frontend Masters**: React源码解读课程
- **YouTube**: 搜索"React source code deep dive"

#### 工具推荐
- **VS Code**: 配合TypeScript插件和GitLens
- **React DevTools**: 浏览器扩展，必备调试工具
- **Source Map Explorer**: 分析打包产物
- **Bundlephobia**: 分析包体积

---

## 总结

本面试题库涵盖了React源码的核心知识点，从基础的Fiber架构到专家级的架构设计，共50道精心设计的题目。每道题都包含：

1. **真实的源码引用**：标注了具体的文件路径和行号范围
2. **清晰的层次结构**：答案分为多个要点，便于理解和记忆
3. **丰富的代码示例**：关键原理都有配套的代码演示
4. **追问链设计**：约20道核心题目配有追问，帮助深入理解
5. **手写实现代码**：专家级题目包含完整可运行的实现代码

### 使用建议

- **面试准备**：按顺序刷题，重点掌握追问链中的延伸知识点
- **源码学习**：配合附录B的路线图，循序渐进地阅读源码
- **知识巩固**：定期回顾附录A的速查表，加深记忆
- **实战演练**：尝试手写实现Q36-Q39，真正理解底层原理

祝您面试顺利！🎉
for (let i = 0; i