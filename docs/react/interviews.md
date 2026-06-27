---
---
# React 面试题库（2025-2026 企业实战版）

> **版本**：v1.0 | **题目总数**：53 道 | **更新日期**：2026-06-14
>
> 本题库覆盖 React 核心知识点，从基础到专家级，适用于前端面试准备与技术深度学习。

---

## 📚 问题速查目录

> **快速导航**：点击题目即可跳转 | 共 **53** 道题（基础17 + 进阶24 + 专家12）

### 基础层（★☆☆）Q01 - Q17

| 题号 | 题目 | 难度 |
|:----:|------|:----:|
| [Q01](#q01-请解释-jsx-的编译过程babel-是如何将-jsx-转换为-javascript-的) | JSX 的编译过程与 Babel 转换 | ★☆☆ |
| [Q02](#q02-请详细说明-reactcreateelement-的参数含义及其返回值结构) | React.createElement 参数含义 | ★☆☆ |
| [Q03](#q03-请描述虚拟-dom-元素对象的完整数据结构并解释各字段的作用) | 虚拟 DOM 元素对象结构 | ★☆☆ |
| [Q04](#q04-reactfragments-的使用场景有哪些为什么需要它) | Fragments 使用场景 | ★☆☆ |
| [Q05](#q05-reactdomcreateroot-和-reactdomrender-有什么区别react-18-的变化是什么) | ReactDOM.createRoot vs render | ★☆☆ |
| [Q06](#q06-请从多个维度对比函数组件和类组件的区别) | 函数组件 vs 类组件对比 | ★☆☆ |
| [Q07](#q07-请解释-react-中-props-的只读性原则以及-childrendefaultprops-的使用方式) | Props 只读性与 children | ★☆☆ |
| [Q08](#q08-usestate-的基本用法是什么有哪些常见的错误使用方式) | useState 基本用法与常见错误 | ★☆☆ |
| [Q09](#q09-请解释-react-的合成事件syntheticevent-机制以及事件处理的注意事项) | 事件处理机制 | ★☆☆ |
| [Q10](#q10-react-中有哪些条件渲染的方式各自的适用场景是什么) | 条件渲染的各种写法 | ★☆☆ |
| [Q11](#q11-列表渲染时为什么要使用-keykey-的选择原则是什么) | 列表渲染与 key 的作用 | ★☆☆ |
| [Q12](#q12-什么是受控组件和非受控组件它们的区别和使用场景) | 受控组件与非受控组件 | ★☆☆ |
| [Q13](#q13-类组件的生命周期有哪些请按阶段分类并说明各自用途) | 组件生命周期（类组件） | ★☆☆ |
| [Q14](#q14-useeffect-的基本用法是什么它的依赖数组是如何工作的) | useEffect 基本用法 | ★☆☆ |
| [Q15](#q15-react-中有哪些常见的css样式方案它们的优缺点是什么) | 组件样式方案对比 | ★☆☆ |
| [Q16](#q16-react-developer-tools-的主要功能有哪些如何使用它进行调试) | React 开发者工具使用 | ★☆☆ |
| [Q17](#q17-react-开发中常见的错误有哪些如何快速定位和解决) | 常见 React 错误与调试 | ★☆☆ |

### 进阶层（★★☆）Q18 - Q41

| 题号 | 题目 | 难度 |
|:----:|------|:----:|
| [Q18](#q18-为什么-hooks-必须在组件的顶层调用违反规则会发生什么) | Hooks 为什么必须在顶层调用 | ★★☆ |
| [Q19](#q19-react-16-和-react-18-中-usestate-的批量更新机制有什么区别) | useState 批量更新机制 | ★★☆ |
| [Q20](#q20-useeffect-的依赖数组的工作原理是什么有哪些常见的误区) | useEffect 依赖数组工作原理 | ★★☆ |
| [Q21](#q21-useeffect-和-uselayouteffect-有什么区别什么时候应该用哪个) | useEffect vs useLayoutEffect | ★★☆ |
| [Q22](#q22-useref-和-usestate-有什么区别什么场景应该用哪个) | useRef vs useState | ★★☆ |
| [Q23](#q23-usememo-和-usecallback-有什么区别什么时候真正需要它们) | useMemo vs useCallback | ★★☆ |
| [Q24](#q24-usecontext-的性能问题是什么如何优化) | useContext 性能问题及优化 | ★★☆ |
| [Q25](#q25-自定义-hook-的设计原则和最佳实践有哪些) | 自定义 Hook 设计原则 | ★★☆ |
| [Q26](#q26-usereducer-的适用场景是什么和-usestate-相比有什么优劣) | useReducer 适用场景 | ★★☆ |
| [Q27](#q27-react-18-新增了哪些-hooks请详细介绍-useidusetransitionusedeferredvalueusesyncexternalstore) | React 18 新 Hooks 详解 | ★★☆ |
| [Q28](#q28-虚拟-dom-的优势和劣势分别是什么什么情况下虚拟-dom-反而会成为性能瓶颈) | 虚拟 DOM 的优势与劣势 | ★★☆ |
| [Q29](#q29-请详细解释-react-fiber-架构为什么引入-fiberfiber-节点的数据结构是怎样的) | Fiber 架构详解 | ★★☆ |
| [Q30](#q30-请详细解释-react-的-diff-算法reconciliation它是如何实现-on-复杂度的) | Diff 算法（Reconciliation） | ★★☆ |
| [Q31](#q31-请解释-react-18-的并发特性concurrent-modestarttransitionsuspense-和非阻塞更新是如何工作的) | React 18 并发特性 | ★★☆ |
| [Q32](#q32-react-中有哪些组件通信方式请详细说明-props-下行回调上行context-api-和状态提升) | 组件通信方式汇总 | ★★☆ |
| [Q33](#q33-什么是-render-props-模式它的优缺点是什么) | Render Props 模式 | ★★☆ |
| [Q34](#q34-什么是-compound-components组合组件模式请举例说明) | Compound Components 模式 | ★★☆ |
| [Q35](#q35-react-portal-的使用场景是什么有什么限制) | Portal 使用场景 | ★★☆ |
| [Q36](#q36-forwardref-和-useimperativehandle-的使用场景是什么) | forwardRef + useImperativeHandle | ★★☆ |
| [Q37](#q37-如何选择合适的状态管理方案context-vs-redux-vs-zustand-vs-jotai-的对比) | 全局状态方案选择 | ★★☆ |
| [Q38](#q38-redux-的核心概念是什么请解释其单向数据流) | Redux 核心概念与数据流 | ★★☆ |
| [Q39](#q39-redux-toolkitrtk-的现代写法是怎样的请介绍-createslice-和-createasyncthunk) | Redux Toolkit 现代写法 | ★★☆ |
| [Q40](#q40-tanstack-queryreact-query-是什么它解决了什么问题如何与服务端状态管理配合) | TanStack Query 服务端状态 | ★★☆ |
| [Q41](#q41-react-router-的核心概念有哪些如何实现路由守卫和权限控制) | React Router 路由守卫 | ★★☆ |

### 专家层（★★★）Q42 - Q53

| 题号 | 题目 | 难度 |
|:----:|------|:----:|
| [Q42](#q42-请从源码角度解释-react-hooks-的实现原理usestate-和-useeffect-的内部实现是怎样的) | Hooks 实现原理（源码级） | ★★★ |
| [Q43](#q43-reactmemousememo-和-usecallback-的正确使用方式是什么如何判断是否需要优化) | React.memo / useMemo / useCallback | ★★★ |
| [Q44](#q44-虚拟长列表的原理是什么react-window-是如何实现的) | 虚拟长列表原理与 react-window | ★★★ |
| [Q45](#q45-如何实现代码分割和懒加载reactlazy-和-suspense-的工作原理是什么) | 代码分割与懒加载 | ★★★ |
| [Q46](#q46-web-worker-在-react-中如何使用有什么应用场景和注意事项) | Web Worker 在 React 中的使用 | ★★★ |
| [Q47](#q47-key-的选择对-react-性能有什么影响请从-diff-算法的角度详细说明) | Key 选择对性能的影响 | ★★★ |
| [Q48](#q48-如何使用-react-profiler-进行性能分析有哪些常见的性能问题和解决方案) | Profiler 分析工具使用 | ★★★ |
| [Q49](#q49-请列举首屏加载优化的完整策略从网络层到渲染层的全方位优化方案) | 首屏加载优化策略 | ★★★ |
| [Q50](#q50-cssrssrssgisr-各有什么特点如何选择合适的技术方案) | CSR / SSR / SSG / ISR 对比 | ★★★ |
| [Q51](#q51-nextjs-app-router-的核心概念是什么server-components-rsc-是如何工作的) | Next.js App Router 与 RSC | ★★★ |
| [Q52](#q52-什么是-hydrationhydration-过程中可能出现哪些问题如何解决) | Hydration 原理与问题解决 | ★★★ |
| [Q53](#q53-react-18-的-streaming-ssr-是如何工作的请详细说明-rendertopipeablestream-的使用) | React 18 Streaming SSR | ★★★ |

---

# 第一部分：基础层（★☆☆）- 17 题

> **考察目标**：JSX、组件基础、Hooks 基本用法、Props/State、事件处理
>
> **适合人群**：React 初学者、1 年以内经验、需要夯实基础的开发者

---

## Q01: 请解释 JSX 的编译过程，Babel 是如何将 JSX 转换为 JavaScript 的？

- **难度**：★☆☆
- **知识点**：JSX / 编译原理 / Babel
- **题型**：简答题

### 参考答案要点：

1. **JSX 本质是语法糖**
   - JSX 不是 JavaScript 的标准语法，浏览器无法直接识别
   - 需要通过编译工具（如 Babel）转换为标准的 JavaScript 调用

2. **转换过程示例**
   ```jsx
   // JSX 代码
   const element = <h1 className="greeting">Hello, world!</h1>;

   // Babel 编译后的结果（React 17 之前）
   const element = React.createElement(
     'h1',
     {className: 'greeting'},
     'Hello, world!'
   );

   // React 17+ 的新 JSX 转换（自动导入）
   import { jsx as _jsx } from 'react/jsx-runtime';
   const element = _jsx('h1', {
     className: 'greeting',
     children: 'Hello, world!'
   });
   ```

3. **关键转换规则**
   - **标签名** → `type` 参数（字符串或组件引用）
   - **属性** → `props` 对象（`class` → `className`，`for` → `htmlFor`）
   - **子元素** → 后续参数（children）
   - **嵌套结构** → 递归转换

4. **Babel 插件配置**
   ```javascript
   // .babelrc 或 babel.config.js
   {
     "presets": [
       ["@babel/preset-react", {
         "runtime": "automatic"  // React 17+ 推荐配置
         // "runtime": "classic"  // 旧版配置
       }]
     ]
   }
   ```

5. **实际意义**
   - 理解 JSX 转换有助于排查编译错误
   - 有助于理解虚拟 DOM 的创建过程
   - 在某些场景下可以直接写 `React.createElement`（如动态组件）

### 🔍 追问链
1. **JSX 编译后为什么需要 import React？React 17 之后为什么不需要了？**
   → 方向：React 17 之前 JSX 编译为 React.createElement()，所以需要 import；17+ 自动引入 jsx-runtime，编译为 _jsx() 不再依赖全局 React
2. **Babel 的 @babel/plugin-transform-react-jsx 插件做了哪些转换？**
   → 方向：JSX → createElement 调用；Fragment 处理；开发模式下的额外检查；displayName 注入

---

## Q02: 请详细说明 React.createElement 的参数含义及其返回值结构。

- **难度**：★☆☆
- **知识点**：虚拟 DOM / React API / 数据结构
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **函数签名**
   ```typescript
   function createElement(
     type: string | ComponentType,
     props?: Record<string, any> | null,
     ...children: ReactNode[]
   ): ReactElement
   ```

2. **三个核心参数**

   | 参数 | 类型 | 说明 | 示例 |
   |------|------|------|------|
   | `type` | `string \| FunctionComponent` | 元素类型或组件 | `'div'`, `MyComponent` |
   | `props` | `object \| null` | 属性对象（含 key/ref） | `{className: 'box'}` |
   | `...children` | `ReactNode[]` | 子节点（可多个） | `'文本'`, `<Child/>` |

3. **返回值结构（虚拟 DOM 元素）**
   ```javascript
   // React.createElement('div', { id: 'app' }, 'Hello') 返回：
   {
     $$typeof: Symbol(react.element),  // 标识这是 React 元素（防 XSS）
     type: 'div',                      // 元素类型
     props: {                          // 属性对象
       id: 'app',
       children: 'Hello'
     },
     key: null,                        // 列表渲染时的唯一标识
     ref: null,                         // 引用
     _owner: null,                     // 所属组件（内部追踪用）
     _store: {}                        // 内部存储（用于验证等）
   }
   ```

4. **特殊属性处理**
   ```javascript
   // key 和 ref 不在 props 中，而是作为元素的顶层属性
   React.createElement('li', { key: id, ref: myRef }, item)

   // 返回值中：
   // key: id        ← 从 props 中提取出来
   // ref: myRef     ← 从 props 中提取出来
   // props: {...}   ← 不包含 key 和 ref
   ```

5. **$$typeof 的安全作用**
   - 使用 `Symbol` 防止 JSON 注入攻击
   - 即使服务器返回恶意 JSON，也无法构造有效的 React 元素
   - 这是 React 内置的 XSS 防护机制之一

---

## Q03: 请描述虚拟 DOM 元素对象的完整数据结构，并解释各字段的作用。

- **难度**：★☆☆
- **知识点**：虚拟 DOM / 数据结构 / 内部实现
- **题型**：简答题

### 参考答案要点：

1. **完整数据结构**
   ```javascript
   const virtualDOMElement = {
     // === 核心标识 ===
     $$typeof: Symbol(react.element),  // 类型标记，防 XSS

     // === 元素信息 ===
     type: 'div' | FunctionComponent,  // DOM 标签或组件函数
     props: {                           // 所有属性（不含 key/ref）
       children: [],                    // 子节点数组或单个节点
       className: '',
       onClick: () => {},
       // ...其他自定义属性
     },

     // === 协调（Reconciliation）相关 ===
     key: null | string | number,      // 列表唯一标识
     ref: null | RefObject | Callback, // DOM 或组件引用

     // === 内部字段（开发中通常不直接使用）===
     _owner: Fiber | null,             // 创建该元素的组件实例
     _store: { validated: boolean },   // 内部验证状态
   }
   ```

2. **各字段详细说明**

   - **$$typeof**：React 元素的"身份证"
     - 使用不可伪造的 Symbol 类型
     - 在服务端渲染时防止 XSS 攻击

   - **type**：决定如何渲染
     - 字符串（`'div'`, `'span'`）：创建真实 DOM 节点
     - 函数/类组件：执行组件逻辑，返回新的虚拟 DOM
     - 特殊类型：`Fragment`, `Suspense`, `Portal` 等

   - **props**：传递给元素的数据
     - 包含所有 HTML 属性和自定义属性
     - `children` 是特殊的 prop，表示子内容
     - 可以是字符串、数字、元素、数组、布尔值、null

   - **key**：协调算法的核心
     - 用于列表渲染时识别节点身份
     - 必须在同层级兄弟节点中唯一
     - 不传或使用 index 作为 key 会导致性能问题

   - **ref**：命令式操作入口
     - 访问 DOM 节点或类组件实例
     - 函数组件需配合 `forwardRef` 使用

3. **不同类型的 type 示例**
   ```javascript
   // 原生 DOM 元素
   { type: 'div', props: { children: '内容' } }

   // 函数组件
   { type: MyComponent, props: { title: '标题' } }

   // Fragment（不产生额外 DOM）
   { type: Symbol(react.fragment), props: { children: [...] } }

   // Context Consumer
   { type: Symbol(react.context), props: { ... } }
   ```

---

## Q04: React.Fragments 的使用场景有哪些？为什么需要它？

- **难度**：★☆☆
- **知识点**：JSX / 组件 / Fragment
- **题型**：简答题 + 代码实践题

### 参考答案要点：

1. **问题背景**
   - JSX 要求根元素必须是单一节点
   - 但有时组件需要返回多个同级元素而不想包裹额外 DOM

2. **三种写法对比**
   ```jsx
   // ❌ 错误：多个根元素
   function ErrorComponent() {
     return (
       <h1>标题</h1>
       <p>内容</p>
     );
   }

   // ⚠️ 可行但增加无意义 DOM
   function WithWrapper() {
     return (
       <div>  {/* 多余的 div */}
         <h1>标题</h1>
         <p>内容</p>
       </div>
     );
   }

   // ✅ 推荐：使用 Fragment
   function WithFragment() {
     return (
       <>
         <h1>标题</h1>
         <p>内容</p>
       </>
     );
   }
   ```

3. **典型使用场景**

   **场景一：列表渲染避免包裹元素**
   ```jsx
   function ListItems() {
     return (
       <>
         <li>项目 1</li>
         <li>项目 2</li>
         <li>项目 3</li>
       </>
     );
   }
   
   // 使用时：<ul><ListItems /></ul>
   // 不会出现多余的 div 包裹 li
   ```

   **场景二：条件渲染多元素**
   ```jsx
   function ConditionalBlock({ showDetail }) {
     return (
       <>
         <h2>基本信息</h2>
         {showDetail && (
           <>
             <p>详细信息 1</p>
             <p>详细信息 2</p>
           </>
         )}
       </>
     );
   }
   ```

   **场景三：表格列（严格 DOM 结构要求）**
   ```jsx
   // 表格的 select/colgroup 等只允许特定子元素
   function TableColumns() {
     return (
       <>
         <td>姓名</td>
         <td>年龄</td>
         <td>职业</td>
       </>
     );
   }
   ```

   **场景四：带 key 的 Fragment**
   ```jsx
   // 语法糖 <> 不能带 key，必须使用完整写法
   function Glossary(props) {
     return (
       <dl>
         {props.items.map(item => (
           // ✅ Fragment 可以有 key
           <Fragment key={item.id}>
             <dt>{item.term}</dt>
             <dd>{item.description}</dd>
           </Fragment>
         ))}
       </dl>
     );
   }
   ```

4. **性能影响**
   - Fragment 本身不创建真实 DOM 节点
   - 比 `display: contents` 的 div 更轻量
   - 虚拟 DOM 层面仍是一个节点，但不对应真实 DOM

---

## Q05: ReactDOM.createRoot 和 ReactDOM.render 有什么区别？React 18 的变化是什么？

- **难度**：★☆☆
- **知识点**：React 18 / 渲染 API / 并发特性
- **题型**：简答题 + 对比题

### 参考答案要点：

1. **API 用法对比**
   ```javascript
   // ❌ React 17 及之前（已废弃）
   import { render } from 'react-dom';
   render(<App />, document.getElementById('root'));

   // ✅ React 18 推荐写法
   import { createRoot } from 'react-dom/client';
   const root = createRoot(document.getElementById('root'));
   root.render(<App />);
   ```

2. **核心区别**

   | 特性 | `ReactDOM.render` (旧) | `ReactDOM.createRoot` (新) |
   |------|------------------------|---------------------------|
   **并发特性** | ❌ 不支持 | ✅ 支持 Concurrent Mode |
   **自动批处理** | 仅在事件处理中 | ✅ 所有场景（Promise/timeout/事件） |
   **回调函数** | `render(element, container, callback)` | `root.render(element)` 无回调 |
   **卸载方法** | `unmountComponentAtNode(container)` | `root.unmount()` |
   ** hydration** | `hydrate()` | `root.hydrate()` |
   **API 形态** | 全局函数 | 实例方法（返回 Root 对象） |

3. **并发特性的启用**
   ```javascript
   // createRoot 自动开启并发模式
   const root = createRoot(container, {
     // 可选配置
     identifierPrefix: '',    // 用于生成 ID（SSR 时有用）
     onRecoverableError: error => {
       console.error('可恢复错误:', error);
     },
   });

   // 支持的新特性
   root.render(
     <App>
       <Suspense fallback={<Loading />}>
         <AsyncComponent />
       </Suspense>
     </App>
   );
   ```

4. **自动批处理的差异**
   ```javascript
   // React 17 及之前：只在 React 事件中批处理
   function handleClick() {
     setCount(c => c + 1);  // 批处理 ✓
     setFlag(f => !f);      // 批处理 ✓
     // 只触发一次重渲染
   }

   setTimeout(() => {
     setCount(c => c + 1);  // 立即渲染 ✗
     setFlag(f => !f);      // 再次渲染 ✗
     // 触发两次重渲染
   });

   // React 18：所有场景都批处理
   setTimeout(() => {
     setCount(c => c + 1);  // 批处理 ✓
     setFlag(f => !f);      // 批处理 ✓
     // 只触发一次重渲染！
   });
   ```

5. **迁移建议**
   - 新项目直接使用 `createRoot`
   - 旧项目逐步迁移，注意测试回调函数的行为变化
   - 注意第三方库可能还不兼容 React 18 的并发特性

---

## Q06: 请从多个维度对比函数组件和类组件的区别。

- **难度**：★☆☆
- **知识点**：组件基础 / 函数组件 / 类组件
- **题型**：对比分析题

### 参考答案要点：

1. **7+ 维度全面对比**

   | 维度 | 函数组件 | 类组件 |
   |------|---------|--------|
   **声明方式** | `function App() {}` 或 `const App = () => {}` | `class App extends React.Component {}` |
   **状态管理** | `useState` Hook | `this.state` + `setState` |
   **生命周期** | `useEffect` 替代 | `componentDidMount` 等生命周期方法 |
   **this 绑定** | 无 this 问题 | 需要手动绑定（bind/箭头函数） |
   **代码量** | 通常更简洁 | 相对冗长（constructor/render/bind） |
   **性能** | 无实例化开销 | 每次渲染创建实例 |
   **未来趋势** | ✅ React 官方推荐 | ⚠️ 逐渐被取代但未废弃 |
   **调试体验** | Hooks DevTools 支持 | React DevTools 成熟支持 |
   **热重载** | 更好的 HMR 支持 | 可能丢失 state |

2. **代码对比示例**

   **计数器示例 - 类组件**
   ```jsx
   class Counter extends React.Component {
     constructor(props) {
       super(props);
       this.state = { count: 0 };
       // 必须绑定 this
       this.increment = this.increment.bind(this);
     }

     increment() {
       this.setState({ count: this.state.count + 1 });
     }

     render() {
       return (
         <button onClick={this.increment}>
           Count: {this.state.count}
         </button>
       );
     }
   }
   ```

   **计数器示例 - 函数组件**
   ```jsx
   function Counter() {
     const [count, setCount] = useState(0);

     const increment = () => {
       setCount(count + 1);  // 无需绑定 this
     };

     return (
       <button onClick={increment}>
         Count: {count}
       </button>
     );
   }
   ```

3. **函数组件的优势**

   - **更符合 React 理念**：UI = f(state)，纯函数思维
   - **更好的逻辑复用**：自定义 Hook 替代 HOC 和 Render Props
   - **更好的 Tree Shaking**：未使用的工具函数更容易被移除
   - **TypeScript 友好**：类型推断更简单准确
   - **更小的打包体积**：无需类相关的 polyfill

4. **类组件仍有价值的场景**

   - **错误边界（Error Boundary）**：目前只能用类组件实现
   - **遗留代码维护**：大量历史项目仍在使用
   - **需要 getSnapshotBeforeUpdate**：特定性能优化场景

5. **React 官方立场**
   > "没有计划移除类组件，但未来的新特性会优先支持函数组件（Hooks）。"

### 🔍 追问链
1. **类组件会被淘汰吗？什么时候还需要用类组件？**
   → 方向：Error Boundary 必须是类组件；需要 getSnapshotBeforeUpdate 时；维护遗留代码时
2. **函数组件能模拟所有类组件的特性吗？useRef 能替代实例变量吗？**
   → 方向：基本可以；但 forceUpdate 无法直接实现（可用一个自增的 state hack）；getDerivedStateFromError 需要 Error Boundary
3. **React.memo 对应类组件中的什么？PureComponent 和它的区别？**
   → 方向：React.memo 是 HOC 版本的 PureComponent；PureComponent 做 props 浅比较，React.memo 默认也是浅比较但可自定义比较函数

---

## Q07: 请解释 React 中 Props 的只读性原则，以及 children、defaultProps 的使用方式。

- **难度**：★☆☆
- **知识点**：Props / 组件通信 / 最佳实践
- **题型**：简答题 + 代码实践题

### 参考答案要点：

1. **Props 的只读性原则**
   ```jsx
   // ❌ 错误：直接修改 Props
   function Welcome(props) {
     props.name = '新名字';  // 报错或不生效
     return <h1>Hello, {props.name}</h1>;
   }

   // ✅ 正确：Props 是只读的，通过回调通知父组件修改
   function Welcome({ name, onUpdateName }) {
     const handleClick = () => {
       onUpdateName('新名字');  // 通过回调向上传递
     };
     return <h1 onClick={handleClick}>Hello, {name}</h1>;
   }
   ```
   - **单向数据流**：Props 从父组件流向子组件
   - **不可变性**：子组件不应修改接收到的 props
   - **好处**：数据流向清晰，易于调试和预测

2. **children 的使用**
   ```jsx
   // 父组件使用
   <Card>
     <h2>标题</h2>
     <p>内容</p>
   </Card>

   // Card 组件定义
   function Card({ children, title }) {
     return (
       <div className="card">
         {title && <header>{title}</header>}
         <main>{children}</main>  {/* children 是特殊的 prop */}
       </div>
     );
   }
   ```

   **children 的类型**
   ```jsx
   // 1. 字符串 children
   <Button>点击我</Button>

   // 2. JSX children
   <Modal>
     <Form onSubmit={handleSubmit} />
   </Modal>

   // 3. 函数作为 children（Render Props 模式）
   <DataFetcher url="/api/data">
     {(data, loading) => loading ? <Spinner /> : <List data={data} />}
   </DataFetcher>

   // 4. 多个 children（通过数组）
   <FlexContainer>
     <LeftSidebar />
     <MainContent />
     <RightPanel />
   </FlexContainer>
   ```

3. **defaultProps（已不推荐，了解即可）**
   ```jsx
   // 旧写法（已废弃）
   function Button({ size, color }) {
     return <button className={`btn-${size}-${color}`}>按钮</button>;
   }
   Button.defaultProps = {
     size: 'medium',
     color: 'primary'
   };

   // ✅ 推荐写法：ES6 默认参数
   function Button({ size = 'medium', color = 'primary' }) {
     return <button className={`btn-${size}-${color}`}>按钮</button>;
   }

   // 对于复杂默认值
   function Table({ columns = [], data = [], pageSize = 10 }) {
     // ...
   }
   ```

4. **Props 解构最佳实践**
   ```jsx
   // ✅ 推荐：解构 + 默认值 + 类型注释
   function UserCard({
     name,
     age = 0,
     avatar = '/default-avatar.png',
     onClick,
     children
   }: {
     name: string;
     age?: number;
     avatar?: string;
     onClick?: () => void;
     children?: React.ReactNode;
   }) {
     return (
       <div className="user-card" onClick={onClick}>
         <img src={avatar} alt={name} />
         <h3>{name}</h3>
         {age > 0 && <span>{age} 岁</span>}
         {children}
       </div>
     );
   }
   ```

---

## Q08: useState 的基本用法是什么？有哪些常见的错误使用方式？

- **难度**：★☆☆
- **知识点**：Hooks / State / 常见陷阱
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **基本用法**
   ```jsx
   // 语法：const [state, setState] = useState(initialValue)
   function Counter() {
     // 1. 基本用法
     const [count, setCount] = useState(0);

     // 2. 函数式初始化（惰性初始化，只执行一次）
     const [expensiveState] = useState(() => {
       console.log('这个函数只会执行一次');
       return computeExpensiveValue();
     });

     // 3. 更新状态
     const increment = () => {
       setCount(count + 1);           // 直接使用当前值
       setCount(prev => prev + 1);    // 函数式更新（推荐）
     };

     return <button onClick={increment}>{count}</button>;
   }
   ```

2. **常见错误及解决方案**

   **错误 1：直接修改 State**
   ```jsx
   // ❌ 错误：直接修改（Mutation）
   const [items, setItems] = useState([{id: 1, name: 'A'}]);
   items.push({id: 2, name: 'B'});  // 直接 push，不会触发更新！

   // ✅ 正确：创建新数组（Immutability）
   setItems([...items, {id: 2, name: 'B'}]);
   // 或
   setItems(prevItems => [...prevItems, {id: 2, name: 'B'}]);
   ```

   **错误 2：异步更新依赖旧值**
   ```jsx
   // ❌ 问题：连续多次调用可能基于相同的旧值
   const handleClick = () => {
     setCount(count + 1);  // 基于 closure 中的 count
     setCount(count + 1);  // 还是基于同一个 count
     // 结果可能是 +1 而不是 +2（取决于批处理策略）
   };

   // ✅ 解决：使用函数式更新
   const handleClick = () => {
     setCount(prev => prev + 1);  // 总是基于最新的 prev
     setCount(prev => prev + 1);  // 保证 +2
   };
   ```

   **错误 3：在条件语句中使用 Hooks**
   ```jsx
   // ❌ 错误：违反 Hooks 规则
   if (someCondition) {
     const [value, setValue] = useState(0);  // 条件调用，报错！
   }

   // ✅ 正确：始终在最顶层调用
   const [value, setValue] = useState(0);
   if (someCondition) {
     // 只在这里使用 value 和 setValue
   }
   ```

   **错误 4：忽略初始值的计算成本**
   ```jsx
   // ❌ 问题：每次渲染都会重新计算 initialValue
   const [data] = useState(expensiveFunction());  // 每次渲染都执行！

   // ✅ 正确：使用函数式初始化
   const [data] = useState(() => expensiveFunction());  // 只在首次渲染执行
   ```

   **错误 5：State 结构过于扁平或嵌套过深**
   ```jsx
   // ❌ 过于扁平：难以组织相关状态
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');

   // ✅ 合理分组：相关状态放在一起
   const [user, setUser] = useState({
     personalInfo: { firstName: '', lastName: '' },
     contactInfo: { email: '', phone: '' }
   });

   // 更新时保持不可变性
   setUser(prev => ({
     ...prev,
     personalInfo: {
       ...prev.personalInfo,
       firstName: 'John'
     }
   }));
   ```

3. **useState 的设计哲学**
   - **不可变性（Immutability）**：每次更新都是替换而非修改
   - **函数式更新**：解决闭包陷阱和异步更新的竞态问题
   - **惰性初始化**：避免昂贵的重复计算
   - **批量更新**：React 18 中自动合并多次 setState

---

## Q09: 请解释 React 的合成事件（SyntheticEvent）机制，以及事件处理的注意事项。

- **难度**：★☆☆
- **知识点**：事件系统 / 合成事件 / 跨浏览器兼容
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **什么是合成事件？**
   - React 自定义的事件系统，包装原生 DOM 事件
   - 跨浏览器兼容（IE、Firefox、Chrome 行为统一）
   - 符合 W3C 标准，消除浏览器差异

2. **合成事件的特点**
   ```jsx
   function Form() {
     const handleChange = (e) => {
       // e 是 SyntheticEvent，不是原生 Event
       console.log(e.type);          // 'change'
       console.log(e.target.value);  // 输入框的值
       e.preventDefault();           // 阻止默认行为
       e.stopPropagation();          // 阻止冒泡
     };

     return <input onChange={handleChange} />;
   }
   ```

   **核心特性**：
   - **事件委托**：所有事件绑定在 document（React 17+ 绑定在 root 容器）
   - **事件池**：复用事件对象以提高性能（React 17 已移除）
   - **统一接口**：`stopPropagation()`, `preventDefault()` 等跨浏览器一致

3. **事件命名规范**
   ```jsx
   // ✅ React 使用 camelCase 命名
   <button onClick={handleClick}>点击</button>
   <input onChange={handleChange} />
   <form onSubmit={handleSubmit} />
   <div onMouseEnter={handleHover} />

   // ❌ 不是 HTML 的全小写 + 连字符
   // <button onclick="...">  <!-- 这是 HTML 写法 -->
   ```

4. **this 绑定问题（主要针对类组件）**
   ```jsx
   class MyComponent extends React.Component {
     constructor(props) {
       super(props);
       // 方式 1：在 constructor 中 bind
       this.handleClick = this.handleClick.bind(this);
     }

     // 方式 2：类属性箭头函数（推荐）
     handleClick = () => {
       console.log(this);  // 正确指向组件实例
     };

     render() {
       return (
         <div>
           {/* 方式 3：在 render 中 bind（每次渲染都创建新函数，不推荐） */}
           <button onClick={this.handleClick.bind(this)}>方式 1</button>

           {/* 方式 4：箭头函数（同上，每次渲染都创建新函数） */}
           <button onClick={() => this.handleClick()}>方式 2</button>

           {/* ✅ 推荐：使用类属性箭头函数 */}
           <button onClick={this.handleClick}>推荐</button>
         </div>
       );
     }
   }

   // 函数组件没有 this 问题
   function FunctionalComponent() {
     const handleClick = () => {
       // 直接使用，无需绑定
     };
     return <button onClick={handleClick}>点击</button>;
   }
   ```

5. **向事件处理器传递参数**
   ```jsx
   function ListItem({ id, name, onDelete }) {
     // ✅ 方式 1：箭头函数包装
     return (
       <li onClick={() => onDelete(id)}>
         {name}
       </li>
     );

     // ✅ 方式 2：使用 data-* 属性（较少用）
     return (
       <li onClick={(e) => onDelete(e.currentTarget.dataset.id)} data-id={id}>
         {name}
       </li>
     );
   }

   // 使用
   <ListItem id={1} name="项目 1" onDelete={(id) => console.log('删除:', id)} />
   ```

6. **合成事件 vs 原生事件**
   ```jsx
   function EventDemo() {
     const handleClick = (e) => {
       // 合成事件的方法
       console.log(e.nativeEvent);  // 获取原生事件对象
       console.log(e.nativeEvent.type);  // 原生事件类型

       // 如果需要访问原生事件的其他属性
       const nativeEvent = e.nativeEvent;
       console.log(nativeEvent.clientX, nativeEvent.clientY);
     };

     // 如何绑定原生事件（一般不推荐）
     const divRef = useRef(null);
     useEffect(() => {
       const node = divRef.current;
       // 原生事件监听
       node.addEventListener('click', handleNativeClick);
       return () => node.removeEventListener('click', handleNativeClick);
   }, []);

     return <div ref={divRef} onClick={handleClick}>点击区域</div>;
   }
   ```

---

## Q10: React 中有哪些条件渲染的方式？各自的适用场景是什么？

- **难度**：★☆☆
- **知识点**：渲染模式 / JSX / 条件表达式
- **题型**：简答题 + 代码实践题

### 参考答案要点：

1. **六种条件渲染方式**

   **方式 1：三元运算符（最常用）**
   ```jsx
   function UserGreeting({ isLoggedIn, username }) {
     return (
       <div>
         {isLoggedIn ? (
           <h1>Welcome back, {username}!</h1>
         ) : (
           <h1>Please sign in.</h1>
         )}
       </div>
     );
   }
   // 适用场景：简单的二选一渲染
   ```

   **方式 2：逻辑与运算符（&&）**
   ```jsx
   function Notification({ message }) {
     return (
       <div>
         {message && (
           <div className="notification">
             {message}
           </div>
         )}
       </div>
     );
   }
   // 适用场景：有/无的单分支判断
   // ⚠️ 注意：当 message 为 0 时也会显示，可用 !!message 或 Boolean(message) 处理
   ```

   **方式 3：变量存储（提高可读性）**
   ```jsx
   function StatusBadge({ status }) {
     let badge;

     switch (status) {
       case 'success':
         badge = <span className="badge success">成功</span>;
         break;
       case 'error':
         badge = <span className="badge error">失败</span>;
         break;
       case 'warning':
         badge = <span className="badge warning">警告</span>;
         break;
       default:
         badge = <span className="badge default">未知</span>;
     }

     return <div className="status">{badge}</div>;
   }
   // 适用场景：多分支条件，逻辑较复杂
   ```

   **方式 4：立即执行函数（IIFE）（较少用）**
   ```jsx
   function List({ items, isLoading, error }) {
     return (
       <div>
         {(() => {
           if (isLoading) return <Spinner />;
           if (error) return <Error message={error} />;
           if (!items.length) return <EmptyState />;
           return <ItemList items={items} />;
         })()}
       </div>
     );
   }
   // 适用场景：需要在 JSX 中编写复杂逻辑（不推荐过度使用）
   ```

   **方式 5：提取为独立组件（最佳实践）**
   ```jsx
   // 主组件保持简洁
   function Dashboard({ user, posts, isLoading }) {
     return (
       <main>
         <ConditionalRender
           condition={isLoading}
           placeholder={<Skeleton />}
         >
           <UserCard user={user} />
           <PostList posts={posts} />
         </ConditionalRender>
       </main>
     );
   }

   // 通用条件渲染组件
   function ConditionalRender({ condition, children, placeholder }) {
     if (!condition) return placeholder ?? null;
     return children;
   }
   // 适用场景：多处复用的条件渲染逻辑
   ```

   **方式 6：高阶组件或 Render Props（进阶）**
   ```jsx
   // HOC 方式
   const withAuth = (WrappedComponent) => (props) => {
     const { isAuthenticated } = useAuth();
     if (!isAuthenticated) return <LoginPrompt />;
     return <WrappedComponent {...props} />;
   };

   // Render Props 方式
   function If({ condition, render, elseRender }) {
     return condition ? render() : elseRender?.();
   }

   // 使用
   <If
     condition={isLoggedIn}
     render={() => <Dashboard />}
     elseRender={() => <LoginPage />}
   />
   ```

2. **选择指南**

   | 场景 | 推荐方式 | 原因 |
   |------|---------|------|
   二选一（有/无） | 三元运算符 `? :` | 简洁明了 |
   显示/隐藏单元素 | `&&` 运算符 | 最简洁 |
   多个条件分支 | `switch` + 变量 | 逻辑清晰 |
   复杂条件逻辑 | 提取独立组件 | 可维护性好 |
   复用条件逻辑 | HOC / Render Props | 逻辑复用 |
   异步加载状态 | Suspense + ErrorBoundary | React 原生支持 |

3. **性能考虑**
   ```jsx
   // ⚠️ 即使条件为 false，三元的两个分支都会被评估（但不会渲染）
   {condition ? <HeavyComponent /> : <AnotherHeavy />}

   // ✅ 如果组件创建成本高，可以使用懒加载
   const HeavyComponent = React.lazy(() => import('./Heavy'));
   {condition && <Suspense fallback={<Loading />}><HeavyComponent /></Suspense>}
   ```

---

## Q11: 列表渲染时为什么要使用 key？key 的选择原则是什么？

- **难度**：★☆☆
- **知识点**：列表渲染 / Diff 算法 / 性能优化
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **key 的作用**
   - 帮助 React 识别哪些元素改变了、添加了或删除ed
   - 是 Diff 算法的核心依据
   - 决定是否复用已有 DOM 节点

2. **正确使用示例**
   ```jsx
   function TodoList({ todos }) {
     // ✅ 正确：使用唯一且稳定的 ID 作为 key
     return (
       <ul>
         {todos.map(todo => (
           <li key={todo.id}>  {/* todo.id 是唯一稳定的标识 */}
             {todo.text}
           </li>
         ))}
       </ul>
     );
   }
   ```

3. **❌ 常见错误：使用索引作为 key**
   ```jsx
   // ❌ 问题演示
   function BadKeyExample({ items }) {
     return (
       <ul>
         {items.map((item, index) => (
           <li key={index}>  {/* 使用 index 作为 key */}
             <input defaultValue={item.text} />
             {item.text}
           </li>
         ))}
       </ul>
     );
   }

   // 问题场景：在列表中间插入一项
   // 初始: [A, B, C]  key: [0, 1, 2]
   // 插入后: [A, X, B, C]  key: [0, 1, 2, 3]
   //
   // React 的 diff 结果：
   // - key=0 (A): 复用 ✓
   // - key=1 (原B→现X): 认为 B 变成了 X，更新内容 ✗
   // - key=2 (原C→现B): 认为 C 变成了 B，更新内容 ✗
   // - key=3 (新增): 创建 C ✗
   //
   // 结果：不必要的 DOM 更新，输入框状态错乱！
   ```

4. **key 选择原则**

   | 原则 | 说明 | 示例 |
   |------|------|------|
   **唯一性** | 在兄弟节点中必须唯一 | `item.id`, `item._id` |
   **稳定性** | 不随渲染改变 | 不要用 `Math.random()` |
   **可预测性** | 能够稳定地标识同一份数据 | 数据库主键 |
   **不用 index** | 除非列表静态不变 | 静态列表可以接受 |

   ```jsx
   // ✅ 好的 key 选择
   <li key={user.id}>{user.name}</li>
   <li key={`${userId}-${itemId}`}>{itemName}</li>  // 组合 key
   <li key={product.sku}>{product.name}</li>

   // ❌ 差的 key 选择
   <li key={Math.random()}>{item.name}</li>  // 每次都变
   <li key={index}>{item.name}</li>  // 动态列表有问题
   <li key={JSON.stringify(item)}>{item.name}</li>  // 性能差
   ```

5. **特殊情况：何时可以用 index？**
   ```jsx
   // ✅ 场景 1：静态列表（不会增删排序）
   function StaticNav() {
     const navItems = ['首页', '关于', '联系'];
     return (
       <nav>
         {navItems.map((item, index) => (
           <a key={index} href={`#${item}`}>{item}</a>
         ))}
       </nav>
     );
   }

   // ✅ 场景 2：列表项没有唯一 ID 且不会变化
   function Pagination({ totalPages }) {
     return Array.from({ length: totalPages }).map((_, i) => (
       <button key={i}>{i + 1}</button>
     ));
   }
   ```

6. **key 对 Diff 算法的影响**
   ```
   没有 key（或 key 相同）：
   - 就地更新：按顺序逐一比较子节点
   - 效率低：可能造成不必要的更新

   有正确的 key：
   - 基于 key 的映射：快速定位相同 key 的节点
   - 效率高：最小化 DOM 操作
   - 正确性：保持组件状态（如表单输入值）
   ```

### 🔍 追问链
1. **用 index 作为 key 在什么场景下会出问题？什么场景下可以用？**
   → 方向：列表有增删/排序操作时会出问题（状态错位/性能浪费）；纯静态展示无状态列表可以用 index
2. **key 相同但位置不同的元素，React 是移动 DOM 还是删除重建？**
   → 方向：移动！React 通过 key 匹配识别出是同一个组件，只做 DOM 移动操作，保留内部状态
3. **如果生成的列表没有唯一稳定的 id，如何生成合适的 key？**
   → 方向：nanoid/uuid 库生成唯一 ID；使用数据的组合字段 hash；使用 contenthash（如 JSON.stringify(item)）

---

## Q12: 什么是受控组件和非受控组件？它们的区别和使用场景？

- **难度**：★☆☆
- **知识点**：表单处理 / 受控组件 / 非受控组件
- **题型**：简答题 + 对比题

### 参考答案要点：

1. **受控组件（Controlled Component）**
   ```jsx
   function ControlledForm() {
     // 表单元素的值由 React state 控制
     const [username, setUsername] = useState('');
     const [email, setEmail] = useState('');

     const handleSubmit = (e) => {
       e.preventDefault();
       // 直接从 state 获取值
       console.log({ username, email });
     };

     return (
       <form onSubmit={handleSubmit}>
         <input
           type="text"
           value={username}  {/* 受 state 控制 */}
           onChange={(e) => setUsername(e.target.value)}
         />
         <input
           type="email"
           value={email}  {/* 受 state 控制 */}
           onChange={(e) => setEmail(e.target.value)}
         />
         <button type="submit">提交</button>
       </form>
     );
   }
   ```
   - **特点**：值由 React state 单一数据源控制
   - **优势**：实时验证、格式化输入、条件禁用
   - **适用**：需要即时反馈的表单（搜索、实时过滤）

2. **非受控组件（Uncontrolled Component）**
   ```jsx
   function UncontrolledForm() {
     // 使用 ref 直接访问 DOM 元素
     const usernameRef = useRef(null);
     const emailRef = useRef(null);

     const handleSubmit = (e) => {
       e.preventDefault();
       // 从 DOM 直接读取值
       console.log({
         username: usernameRef.current.value,
         email: emailRef.current.value
       });
     };

     return (
       <form onSubmit={handleSubmit}>
         <input
           type="text"
           defaultValue="初始值"  {/* 非 controlled，用 defaultValue */}
           ref={usernameRef}
         />
         <input
           type="email"
           ref={emailRef}
         />
         <button type="submit">提交</button>
       </form>
     );
   }
   ```
   - **特点**：值由 DOM 自身管理，通过 ref 读取
   - **优势**：代码量少、与非 React 代码集成方便
   - **适用**：一次性提交的表单、文件上传

3. **核心对比**

   | 维度 | 受控组件 | 非受控组件 |
   |------|---------|------------|
   **数据源** | React State | DOM |
   **读取方式** | 从 state 读取 | 从 ref/DOM 读取 |
   **设置值** | `value={state}` | `defaultValue={}` |
   **更新时机** | 每次 keystroke | 提交时 |
   **实时验证** | ✅ 容易实现 | ⚠️ 需要额外监听 |
   **代码量** | 较多（每个字段都要 state） | 较少 |
   **适用场景** | 即时反馈、复杂校验 | 简单表单、文件上传 |

4. **混合使用（实际项目中常见）**
   ```jsx
   function HybridForm() {
     // 搜索框：受控（需要实时响应）
     const [searchTerm, setSearchTerm] = useState('');

     // 文件上传：非受控（无法用 value 控制）
     const fileInputRef = useRef(null);

     // 备注：非受控（不需要实时验证）
     const notesRef = useRef(null);

     const handleSubmit = () => {
       const formData = new FormData();
       formData.append('search', searchTerm);
       formData.append('file', fileInputRef.current.files[0]);
       formData.append('notes', notesRef.current.value);
     };

     return (
       <form onSubmit={handleSubmit}>
         <input
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           placeholder="搜索..."
         />
         <input type="file" ref={fileInputRef} />
         <textarea ref={notesRef} defaultValue="" />
       </form>
     );
   }
   ```

5. **最佳实践建议**
   - 大多数情况优先使用**受控组件**（单一数据源原则）
   - 文件 `<input type="file">` 必须是非受控的
   - 与第三方库集成（如日期选择器）时可能需要非受控
   - 复杂表单考虑使用 Formik、React Hook Form 等库

---

## Q13: 类组件的生命周期有哪些？请按阶段分类并说明各自用途。

- **难度**：★☆☆
- **知识点**：生命周期 / 类组件 / 挂载/更新/卸载
- **题型**：简答题 + 图表题

### 参考答案要点：

1. **三大阶段概览**

   ```
   ┌─────────────────────────────────────────────────────────────┐
   │                    组件生命周期                              │
   ├──────────┬────────────────────┬─────────────────────────────┤
   │ 挂载阶段 │     更新阶段       │         卸载阶段            │
   │ Mounting │     Updating       │         Unmounting          │
   ├──────────┼────────────────────┼─────────────────────────────┤
   │          │                    │                             │
   │ constructor│  ↓              │  componentWillUnmount       │
   │     ↓     │  render()        │     ↓                       │
   │ static   │     ↓             │  清理工作：                   │
   │ getDerivedStateFromProps()   │  - 取消网络请求              │
   │     ↓     │  ↓               │  - 清除定时器                │
   │ render() │  ↓               │  - 取消订阅                  │
   │     ↓     │  ↓               │  - 清理事件监听              │
   │ componentDidMount()         │                             │
   │          │  ↓               │                             │
   │          │  componentDidUpdate()                            │
   │          │                    │                             │
   └──────────┴────────────────────┴─────────────────────────────┘
   ```

2. **挂载阶段（Mounting）**

   | 方法 | 说明 | 典型用途 |
   |------|------|----------|
   `constructor(props)` | 初始化 state、绑定方法 | 设置初始状态、bind this |
   `static getDerivedStateFromProps(props, state)` | 从 props 派生 state（少用） | 当 props 变化时同步更新 state |
   `render()` | **必须实现**，返回 JSX | 纯函数，不应有副作用 |
   `componentDidMount()` | DOM 已挂载完成 | 发起网络请求、添加订阅、操作 DOM |

   ```jsx
   class UserProfile extends React.Component {
     constructor(props) {
       super(props);
       this.state = { user: null, loading: true };
     }

     async componentDidMount() {
       // ✅ 适合在此发起请求
       const response = await fetch(`/api/users/${this.props.userId}`);
       const user = await response.json();
       this.setState({ user, loading: false });

       // ✅ 添加订阅
       this.subscription = subscribeToUpdates(this.handleUpdate);
     }

     componentWillUnmount() {
       // ✅ 清理：取消请求、清除订阅
       if (this.abortController) {
         this.abortController.abort();
       }
       unsubscribe(this.subscription);
     }

     render() {
       if (this.state.loading) return <Loading />;
       return <ProfileCard user={this.state.user} />;
     }
   }
   ```

3. **更新阶段（Updating）**

   | 方法 | 说明 | 典型用途 |
   |------|------|----------|
   `static getDerivedStateFromProps()` | props 变化时更新 state | 同步 props 到 state |
   `shouldComponentUpdate(nextProps, nextState)` | 是否允许更新 | 性能优化（浅比较） |
   `render()` | 重新渲染 | 同上 |
   `getSnapshotBeforeUpdate(prevProps, prevState)` | DOM 更新前获取信息 | 获取滚动位置等 |
   `componentDidUpdate(prevProps, prevState, snapshot)` | DOM 已更新完成 | 基于 props 变化发请求、操作 DOM |

   ```jsx
   class ChatWindow extends React.Component {
     getSnapshotBeforeUpdate(prevProps) {
       // 在 DOM 更新前记录滚动位置
       if (prevProps.messages.length < this.props.messages.length) {
         const list = this.listRef.current;
         return list.scrollHeight - list.scrollTop;  // 返回 snapshot
       }
       return null;
     }

     componentDidUpdate(prevProps, prevState, snapshot) {
       // 根据 snapshot 决定是否自动滚动到底部
       if (snapshot !== null) {
         const list = this.listRef.current;
         list.scrollTop = list.scrollHeight - snapshot;
       }
     }

     render() {
       return <div ref={this.listRef}>{/* 消息列表 */}</div>;
     }
   }
   ```

4. **卸载阶段（Unmounting）**
   - **`componentWillUnmount()`**：组件销毁前的最后机会
   - **必须清理的内容**：
     - 定时器 (`clearInterval`, `clearTimeout`)
     - 网络请求 (`abortController.abort()`)
     - 事件监听 (`removeEventListener`)
     - 订阅 (`unsubscribe`)
     - WebSocket 连接 (`ws.close()`)

5. **废弃的生命周期（了解即可）**
   ```
   ❌ componentWillMount()        → 用 componentDidMount() 替代
   ❌ componentWillReceiveProps() → 用 getDerivedStateFromProps() 替代
   ❌ componentWillUpdate()      → 用 getSnapshotBeforeUpdate() 替代
   ```
   - 这些方法带有副作用，可能导致 React Fiber 的可中断渲染出现问题
   - React 17 中仍然可用但会报警告

6. **函数组件等效写法**
   ```jsx
   // 类组件生命周期 → 函数组件 Hooks 映射
   function UserProfile({ userId }) {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);

     // componentDidMount + componentDidUpdate
     useEffect(() => {
       let isMounted = true;

       fetch(`/api/users/${userId}`)
         .then(res => res.json())
         .then(data => {
           if (isMounted) {  // 防止内存泄漏
             setUser(data);
             setLoading(false);
           }
         });

       return () => {
         isMounted = false;  // componentWillUnmount
       };
     }, [userId]);  // 依赖 userId 变化时重新执行

     // shouldComponentUpdate → React.memo
     // getSnapshotBeforeUpdate → useRef + useLayoutEffect

     if (loading) return <Loading />;
     return <ProfileCard user={user} />;
   }
   ```

---

## Q14: useEffect 的基本用法是什么？它的依赖数组是如何工作的？

- **难度**：★☆☆
- **知识点**：Hooks / useEffect / 副作用 / 依赖数组
- **题型**：简答题 + 代码实践题

### 参考答案要点：

1. **基本语法**
   ```jsx
   useEffect(setup, dependencies?)
   
   // setup: 执行副作用的函数（可选返回清理函数）
   // dependencies: 依赖数组（决定何时重新执行）
   ```

2. **三种典型用法**

   **用法 1：每次渲染后都执行（无依赖数组）**
   ```jsx
   function LogRender({ count }) {
     useEffect(() => {
       console.log('组件渲染了，count =', count);
       // ⚠️ 每次渲染都会执行，可能导致无限循环或性能问题
     });  // 没有依赖数组

     return <div>{count}</div>;
   }
   ```

   **用法 2：仅挂载时执行一次（空依赖数组）**
   ```jsx
   function DataFetcher({ url }) {
     const [data, setData] = useState(null);

     useEffect(() => {
       // ✅ 类似 componentDidMount
       fetch(url)
         .then(res => res.json())
         .then(setData);
     }, []);  // 空数组：只在首次渲染后执行一次

     return data ? <pre>{JSON.stringify(data)}</pre> : <Loading />;
   }
   ```

   **用法 3：依赖变化时执行（指定依赖）**
   ```jsx
   function WindowSizeTracker() {
     const [width, setWidth] = useState(window.innerWidth);

     useEffect(() => {
       const handleResize = () => setWidth(window.innerWidth);
       window.addEventListener('resize', handleResize);

       // ✅ 返回清理函数（类似 componentWillUnmount）
       return () => window.removeEventListener('resize', handleResize);
   }, []);  // 空依赖：effect 只运行一次，清理也只运行一次

     return <div>窗口宽度: {width}px</div>;
   }
   ```

3. **依赖数组的工作原理**
   ```jsx
   function Example({ userId }) {
     const [count, setCount] = useState(0);

     useEffect(() => {
       console.log('Effect 执行了！');
       fetchData(userId, count);
     }, [userId, count]);  // 只有 userId 或 count 变化时才重新执行

     /*
     * React 的比较逻辑：
     * 1. 首次渲染：执行 effect
     * 2. 后续渲染：逐个比较依赖数组的值
     *    - 使用 Object.is() 进行浅比较
     *    - 如果所有依赖都没变 → 跳过 effect
     *    - 如果任一依赖变了 → 先执行上次的清理函数，再执行新的 effect
     */
   }
   ```

4. **清理函数的重要性**
   ```jsx
   function ChatRoom({ roomId }) {
     useEffect(() => {
       const connection = createConnection(roomId);
       connection.connect();

       // ✅ 返回清理函数
       return () => {
         connection.disconnect();  // 切换房间时断开旧连接
       };
     }, [roomId]);  // roomId 变化时先清理再连接新房间

     /*
     * 执行顺序：
     * 1. 首次渲染 (roomId='general')
     *    → 执行 effect: connect('general')
     *
     * 2. roomId 变为 'music'
     *    → 执行 cleanup: disconnect('general')
     *    → 执行 effect: connect('music')
     *
     * 3. 组件卸载
     *    → 执行 cleanup: disconnect('music')
     */
   }
   ```

5. **常见的依赖数组误区**

   **误区 1：遗漏依赖**
   ```jsx
   // ❌ 问题：eslint 会警告缺少依赖
   useEffect(() => {
     fetch(`/api/user/${userId}`);  // 使用了 userId 但没在依赖数组中
   }, []);  // 应该是 [userId]

   // ✅ 正确：包含所有 effect 中使用的外部变量
   useEffect(() => {
     fetch(`/api/user/${userId}`);
   }, [userId]);
   ```

   **误区 2：依赖对象/数组导致的无限循环**
   ```jsx
   // ❌ 问题：每次渲染都创建新对象，导致 effect 反复执行
   useEffect(() => {
     doSomething(options);
   }, [options]);  // options 是对象引用，每次都是新的

   // ✅ 解决方案 1：使用 useMemo 稳定引用
   const stableOptions = useMemo(() => options, [options.a, options.b]);
   useEffect(() => {
     doSomething(stableOptions);
   }, [stableOptions]);

   // ✅ 解决方案 2：将具体值放入依赖数组
   useEffect(() => {
     doSomething({ page, size, sort });
   }, [page, size, sort]);

   // ✅ 解决方案 3：使用 JSON.stringify（不推荐用于大对象）
   useEffect(() => {
     doSomething(options);
   }, [JSON.stringify(options)]);
   ```

   **误区 3：错误的空依赖数组使用**
   ```jsx
   // ❌ 问题：获取的是旧的 state 值（闭包陷阱）
   const [count, setCount] = useState(0);
   useEffect(() => {
     const timer = setInterval(() => {
       console.log(count);  // 永远是 0！
       setCount(count + 1);
     }, 1000);
   }, []);

   // ✅ 解决：使用函数式更新
   useEffect(() => {
     const timer = setInterval(() => {
       setCount(prev => prev + 1);  // 总是拿到最新值
     }, 1000);
   }, []);
   ```

---

## Q15: React 中有哪些常见的 CSS/样式方案？它们的优缺点是什么？

- **难度**：★☆☆
- **知识点**：CSS / 样式方案 / CSS-in-JS / CSS Modules
- **题型**：对比分析题

### 参考答案要点：

1. **主流方案总览**

   | 方案 | 代表库 | 类型 | 特点 |
   |------|--------|------|------|
   **内联样式** | 原生支持 | Inline Style | 简单但功能有限 |
   **CSS Modules** | 原生/Vite/CRA | Scoped CSS | 编译时隔离 |
   **CSS-in-JS** | styled-components, Emotion | Runtime CSS | 动态样式能力强 |
   **Tailwind CSS** | Tailwind | Utility-first | 快速开发 |
   **原子化 CSS** | UnoCSS | Utility-first | 更轻量 |

2. **各方案详细对比**

   **方案 1：内联样式**
   ```jsx
   function InlineStyleDemo() {
     const style = {
       color: 'blue',
       fontSize: '16px',
       backgroundColor: '#f0f0f0',  // camelCase 命名
       padding: '10px',
     };

     return <div style={style}>内联样式</div>;
   }
   ```
   - ✅ 优点：简单直观、作用域天然隔离、可使用 JS 变量
   - ❌ 缺点：不支持伪类/媒体查询/动画、不能复用、性能稍差
   - 适用：快速原型、动态计算的样式值

   **方案 2：CSS Modules**
   ```css
   /* Button.module.css */
   .button {
     padding: 8px 16px;
     border-radius: 4px;
     background-color: #007bff;
     color: white;
   }

   .primary {
     background-color: #0056b3;
   }
   ```
   ```jsx
   import styles from './Button.module.css';

   function Button({ variant, children }) {
     return (
       <button className={`${styles.button} ${styles[variant]}`}>
         {children}
       </button>
     );
   }
   ```
   - ✅ 优点：编译时生成唯一类名、零运行时开销、支持全部 CSS 特性
   - ❌ 缺点：动态样式能力弱、需要构建工具支持
   - 适用：中大型项目、追求性能的项目

   **方案 3：CSS-in-JS（styled-components）**
   ```jsx
   import styled from 'styled-components';

   const Button = styled.button`
     padding: 8px 16px;
     border-radius: 4px;
     background-color: ${props => props.primary ? '#007bff' : '#6c757d'};
     color: white;
     
     &:hover {
       opacity: 0.9;
     }
     
     @media (max-width: 768px) {
       width: 100%;
     }
   `;

   function App() {
     return (
       <div>
         <Button primary>主要按钮</Button>
         <Button>次要按钮</Button>
       </div>
     );
   }
   ```
   - ✅ 优点：样式与组件共存、完整的 CSS 能力、主题切换方便
   - ❌ 缺点：运行时开销、增加包体积、SSR 需要额外处理
   - 适用：高度动态的主题系统、设计系统

   **方案 4：Tailwind CSS**
   ```jsx
   function Card({ title, content, image }) {
     return (
       <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
         <img className="w-full h-48 object-cover" src={image} alt={title} />
         <div className="px-6 py-4">
           <h3 className="font-bold text-xl mb-2">{title}</h3>
           <p className="text-gray-700 text-base">{content}</p>
         </div>
       </div>
     );
   }
   ```
   - ✅ 优点：开发速度快、生产包体积小、团队风格统一
   - ❌ 缺点：学习曲线、HTML 可读性降低、定制性受限
   - 适用：快速迭代的产品、设计系统完善的项目

3. **选择建议**
   ```
   小型项目/原型：Tailwind CSS 或内联样式
   中型项目：CSS Modules + Tailwind
   大型项目/设计系统：CSS-in-JS 或 Tailwind + CSS Modules
   追求极致性能：CSS Modules 或 Tailwind
   需要强动态样式：CSS-in-JS
   ```

---

## Q16: React Developer Tools 的主要功能有哪些？如何使用它进行调试？

- **难度**：★☆☆
- **知识点**：调试工具 / React DevTools / 开发效率
- **题型**：简答题

### 参考答案要点：

1. **安装方式**
   - Chrome/Firefox/Edge 扩展：搜索 "React Developer Tools"
   - standalone 版本：用于 React Native 或其他环境

2. **核心功能模块**

   **① Components 面板**
   ```
   功能：
   - 查看组件树结构和层级关系
   - 查看/修改组件的 props 和 state
   - 查看组件的 hooks 状态
   - 模拟 props 变化查看渲染结果
   
   使用技巧：
   - 点击组件可在 Elements 面板高亮对应的 DOM
   - 使用搜索功能快速定位组件
   - ⚙️ 设置中可 highlight 组件更新
   ```

   **② Profiler 面板**
   ```
   功能：
   - 记录组件渲染性能
   - 分析哪些组件导致性能问题
   - 查看渲染原因（why did you render）
   
   使用流程：
   1. 点击 Record 开始录制
   2. 执行用户操作
   3. 停止录制，查看火焰图
   4. 找出渲染时间长的组件
   ```

3. **常用调试技巧**

   ```jsx
   // 1. 使用 React DevTools 的 hooks 检查
   function DebugDemo() {
     const [count, setCount] = useState(0);
     const inputRef = useRef(null);

     // 在 DevTools Components 面板可以看到：
     // - State: count 的值
     // - Hooks: 所有 hooks 的当前状态
     // - Props: 传入的 props
     // - Source: 点击跳转到源码位置

     return <input ref={inputRef} value={count} onChange={e => setCount(+e.target.value)} />;
   }

   // 2. 使用 displayName 改善调试体验
   function WrappedComponent(props) {
     return <div>{props.children}</div>;
   }
   WrappedComponent.displayName = 'MyCustomName';  // 在 DevTools 中显示这个名字

   // 3. 使用 <StrictMode> 发现潜在问题
   function App() {
     return (
       <React.StrictMode>
         <MyComponent />  {/* 开发模式下会双重渲染以检测副作用问题 */}
       </React.StrictMode>
     );
   }
   ```

4. **性能分析实战**
   ```
   步骤 1：打开 Profiler 面板
   步骤 2：点击 Record 按钮（圆形图标）
   步骤 3：在页面中进行交互操作
   步骤 4：再次点击 Stop
   
   分析指标：
   - 渲染时长（Render duration）
   - 渲染次数（Number of renders）
   - 渲染原因（What caused the re-render）
   
   优化方向：
   - 寻找不必要的重渲染（黄色/红色标记）
   - 检查是否有组件可以 memo 化
   - 分析 props 变化的根本原因
   ```

---

## Q17: React 开发中常见的错误有哪些？如何快速定位和解决？

- **难度**：★☆☆
- **知识点**：错误处理 / 调试技巧 / 常见陷阱
- **题型**：经验总结题

### 参考答案要点：

1. **十大常见错误速查**

   **错误 1：忘记使用 `key` 属性**
   ```
   Warning: Each child in a list should have a unique "key" prop.
   
   解决：为列表项添加唯一的 key 属性（优先使用数据的唯一 ID）
   ```

   **错误 2：直接修改 State**
   ```
   问题：界面不更新或行为异常
   
   // ❌
   state.items.push(newItem);
   
   // ✅
   setState(prev => [...prev.items, newItem]);
   ```

   **错误 3：Hooks 调用顺序不一致**
   ```
   Warning: React has detected a change in the order of Hooks called by Component.
   
   原因：在条件语句/循环/早 return 中使用了 Hooks
   
   解决：确保 Hooks 在组件顶层无条件调用
   ```

   **错误 4：useEffect 中的无限循环**
   ```
   问题：页面卡死或不断发送请求
   
   原因：effect 内部更新了依赖数组中的 state，又触发了 effect
   
   解决：检查依赖数组，确保不会形成循环依赖
   ```

   **错误 5：闭包陷阱（stale closure）**
   ```
   问题：event handler 或定时器中使用的是旧的 state 值
   
   // ❌
   useEffect(() => {
     const id = setInterval(() => console.log(count), 1000);
     return () => clearInterval(id);
   }, []);
   
   // ✅ 使用 ref 保持最新值，或使用函数式更新
   const countRef = useRef(count);
   countRef.current = count;
   
   useEffect(() => {
     const id = setInterval(() => console.log(countRef.current), 1000);
     return () => clearInterval(id);
   }, []);
   ```

   **错误 6：async/await 在 useEffect 中使用不当**
   ```jsx
   // ❌ 不能直接让 effect 函数变成 async
   useEffect(async () => {  // 警告：effect 函数不应返回 Promise
     const data = await fetchData();
     setState(data);
   }, []);

   // ✅ 正确做法：在 effect 内部定义 async 函数
   useEffect(() => {
     async function loadData() {
       const data = await fetchData();
       setState(data);
     }
     loadData();
   }, []);

   // 或者使用 IIFE
   useEffect(() => {
     (async () => {
       const data = await fetchData();
       setState(data);
     })();
   }, []);
   ```

   **错误 7：内存泄漏（组件卸载后更新状态）**
   ```
   Warning: Can't perform a React state update on an unmounted component.
   
   // ✅ 使用标志位防止卸载后更新
   useEffect(() => {
     let isMounted = true;
     
     fetchData().then(data => {
       if (isMounted) {
         setState(data);
       }
     });
     
     return () => { isMounted = false; };
   }, []);
   ```

   **错误 8：PropTypes 警告（TypeScript 项目除外）**
   ```
   Warning: Failed prop type: Invalid prop `name` of type `number` supplied to `Component`.
   
   解决：检查传入的 props 类型是否符合预期
   ```

   **错误 9：key 导致的状态丢失**
   ```
   问题：列表项的状态（如输入框内容）意外消失
   
   原因：key 值变化导致 React 认为是新组件，销毁了旧组件
   
   解决：确保 key 的稳定性，不要使用随机值或频繁变化的值
   ```

   **错误 10：忘记清理副作用**
   ```
   问题：内存泄漏、重复订阅、定时器堆积
   
   // ✅ 始终在 useEffect 中返回清理函数
   useEffect(() => {
     const subscription = someSource.subscribe(handleData);
     return () => subscription.unsubscribe();  // 清理
   }, []);
   ```

2. **调试方法论**
   ```
   Step 1: 阅读控制台错误信息（红色警告通常很明确）
   Step 2: 使用 React DevTools 检查组件状态和 props
   Step 3: 检查是否有 StrictMode 下的双重渲染警告
   Step 4: 使用 console.log 断点（或 debugger 语句）
   Step 5: 检查 ESLint 的 react-hooks/rules-of-hooks 规则
   Step 6: 搜索 GitHub Issues 或 Stack Overflow
   ```

---

# 第二部分：进阶层（★★☆）- 20 题

> **考察目标**：Hooks 深入、虚拟 DOM/Fiber/Diff、组件通信、状态管理、性能优化、路由
>
> **适合人群**：1-3 年经验、准备中级面试、希望深入理解原理的开发者

---

## Q18: 为什么 Hooks 必须在组件的顶层调用？违反规则会发生什么？

- **难度**：★★☆
- **知识点**：Hooks 原理 / 链表结构 / 规则约束
- **题型**：原理分析题

### 参考答案要点：

1. **底层原因：Hooks 依赖调用顺序**
   ```javascript
   // React 内部维护一个「当前组件」的 hooks 链表
   // 每次渲染都按照相同的顺序遍历这个链表
   
   // 假设组件内部这样使用 hooks：
   function Counter() {
     const [count, setCount] = useState(0);     // hook 1: memoziedState[0]
     const [name, setName] = useState('Alice');  // hook 1: memoziedState[1]
     useEffect(() => { ... }, [count]);          // hook 2: memoziedState[2]
     
     // React 内部结构（简化版）:
     // Fiber.memoizedState = {
     //   queue: [useState queue for count],
     //   next: {
     //     queue: [useState queue for name],
     //     next: {
     //       queue: [useEffect queue],
     //       next: null
     //     }
     //   }
     // }
   }
   ```

2. **如果条件调用会怎样？**
   ```jsx
   // ❌ 错误示例：条件调用 hooks
   function BadExample({ showName }) {
     const [count, setCount] = useState(0);  // 第 1 个 hook
     
     if (showName) {
       // ⚠️ 第一次渲染：这里有 hook（第 2 个）
       const [name, setName] = useState('');
     }
     
     // 第二次渲染 showName=false 时：
     // React 期望第 2 个 hook 还是 useState，但实际上跳过了！
     // 导致后续所有 hook 都错位 → 状态混乱或报错
     
     useEffect(() => { ... }, [count]);  // 这个变成了第 2 个？
   }
   
   // React 会检测到 hooks 数量不一致，抛出错误：
   // "Rendered fewer hooks than expected"
   ```

3. **Hooks 规则的本质**
   ```
   规则 1: 只在顶层调用 Hooks
   → 不要在循环、条件或嵌套函数中调用
   → 保证每次渲染的调用顺序一致
   
   规则 2: 只在 React 函数组件或自定义 Hook 中调用
   → 不要在普通 JavaScript 函数中调用
   → 保证 Hooks 能访问到正确的 Fiber 节点
   ```

4. **React 如何检测违规？**
   ```javascript
   // 简化版的检测逻辑（React 内部）
   let currentlyRenderingFiber = null;
   let workInProgressHook = null;

   function renderWithHooks(current, workInProgress) {
     currentlyRenderingFiber = workInProgress;
     workInProgressHook = current.memoizedState;  // 上次渲染的 hooks 链表
     
     // 执行组件函数...
     // 每次调用 useState/useEffect 时：
     // 1. 检查 currentlyRenderingFiber 是否存在（不在组件内调用会报错）
     // 2. 按 workInProgressHook 链表依次取出对应的 hook
     // 3. workInProgressHook = workInProgressHook.next
   }
   ```

5. **自定义 Hook 也遵循同样规则**
   ```jsx
   // ✅ 自定义 Hook 内部的 hooks 也是按固定顺序调用
   function useUserInfo(userId) {
     const [user, setUser] = useState(null);     // 始终第 1 个
     const [loading, setLoading] = useState(true); // 始终第 2 个
     
     useEffect(() => { ... }, [userId]);           // 始终第 3 个
     
     return { user, loading };
   }
   
   // 调用时
   function Profile({ userId }) {
     const { user, loading } = useUserInfo(userId);  // 内部 3 个 hook 固定顺序
     // ...
   }
   ```

6. **ESLint 插件的保障**
   ```json
   // .eslintrc.js
   {
     "plugins": ["react-hooks"],
     "rules": {
       "react-hooks/rules-of-hooks": "error",      // 强制顶层调用
       "react-hooks/exhaustive-deps": "warn"        // 检查依赖完整性
     }
   }
   ```

### 🔍 追问链
1. **自定义 Hook 中调用其他 Hook 也必须遵守规则吗？**
   → 方向：是的！自定义 Hook 本质就是复用 Hooks 逻辑的函数，内部同样按顺序执行
2. **React 如何在运行时检测到 Hooks 规则被违反？**
   → 方向：渲染前后 hooks 数量不一致时报 "Rendered more/fewer hooks than expected"
3. **eslint-plugin-react-hooks 插件是如何检测违规的？AST 层面怎么做的？**
   → 方向：静态分析 AST，检查 useEffect/useMemo 等调用是否在条件语句/循环/嵌套函数内部

---

## Q19: React 16 和 React 18 中 useState 的批量更新机制有什么区别？

- **难度**：★★☆
- **知识点**：State 管理 / 批量更新 / React 18
- **题型**：对比分析题

### 参考答案要点：

1. **什么是批量更新（Batching）？**
   ```
   批量更新：将多次 setState 调用合并为一次渲染
   
   优势：
   - 减少渲染次数，提升性能
   - 避免中间状态的闪烁
   - 保证状态更新的原子性
   ```

2. **React 16/17 的批量更新限制**
   ```jsx
   // ✅ 在 React 事件处理中：自动批处理
   function handleClick() {
     setCount(c => c + 1);  // 不立即渲染
     setFlag(f => !f);      // 不立即渲染
     setName('new');        // 不立即渲染
     // 这三次 setState 合并为一次渲染 ✓
   }

   // ❌ 在异步操作中：不批处理（React 16/17）
   function fetchData() {
     fetch('/api/data').then(() => {
       setLoading(false);  // 立即渲染 1 次
       setData(response);  // 立即渲染 2 次
       // 两次独立渲染 ✗
     });
   }

   // ❌ 在 setTimeout 中：不批处理
   setTimeout(() => {
     setCount(1);  // 渲染 1 次
     setCount(2);  // 渲染 2 次
   }, 0);
   ```

3. **React 18 的 Automatic Batching**
   ```jsx
   // ✅ React 18：所有场景都自动批处理！

   function fetchData() {
     fetch('/api/data').then(() => {
       setLoading(false);  // 不立即渲染
       setData(response);  // 不立即渲染
       // 合并为一次渲染 ✓
     });
   }

   setTimeout(() => {
     setCount(1);  // 不立即渲染
     setCount(2);  // 不立即渲染
     // 合并为一次渲染 ✓
   });

   // 甚至 Promise.then、MutationObserver 等微任务中也批处理
   Promise.resolve().then(() => {
     setA(1);  // 批处理
     setB(2);  // 批处理
   });
   ```

4. **如何退出批量更新？（flushSync）**
   ```jsx
   import { flushSync } from 'react-dom';

   function handleClick() {
     flushSync(() => {
       setCounter(c => c + 1);  // 立即同步渲染
     });
     // 此时 DOM 已经更新，可以读取最新的 DOM 状态
     
     flushSync(() => {
       setFlag(f => !f);  // 再次同步渲染
     });
     // 两次独立的渲染
   }
   ```
   - **慎用**：`flushSync` 会强制同步渲染，可能损害性能
   - **适用场景**：需要立即操作 DOM（如测量尺寸后布局）

5. **批量更新的实现原理**
   ```javascript
   // 简化版原理（React 内部）
   
   // React 16/17: 使用 isBatchingUpdates 标记
   let isBatchingUpdates = false;
   const batchedEventQueue = [];

   function batchedUpdates(fn) {
     isBatchingUpdates = true;  // 进入批量模式
     try {
       fn();  // 执行事件处理函数
     } finally {
       isBatchingUpdates = false;
       flushBatchedUpdates();  // 结束后统一处理
     }
   }

   // React 18: 使用 lane 模型 + scheduler
   // 不再依赖 isBatchingUpdates 标记
   // 而是通过调度器决定何时执行更新
   function scheduleUpdateOnFiber(fiber, lane) {
     // 将更新加入调度队列
     ensureRootIsScheduled(root, lane);
     // 由 Scheduler 决定何时执行（通常是微任务/宏任务结束时）
   }
   ```

6. **实际影响与迁移建议**
   ```
   影响：
   - 大多数情况下是正向改进（减少不必要的渲染）
   - 极少数依赖"立即渲染"行为的代码可能出问题
   
   迁移：
   - 检查是否有代码依赖 setState 后立即读取 DOM
   - 如有必要，使用 flushSync 或 useEffect 替代
   - 测试异步场景下的状态更新行为
   ```

### 深度拓展：手写实现

#### React 16/17 的 Batch Update 实现（基于 isBatchingUpdates）

```javascript
// ==================== React 16/17 批量更新实现 ====================
/**
 * React 16 和 17 使用 isBatchingUpdates 标志位来控制批量更新
 *
 * 核心原理：
 * 1. 在事件处理函数开始时设置 isBatchingUpdates = true
 * 2. 在此期间的所有 setState 都不会立即触发重新渲染
 * 3. 而是将更新放入 dirtyComponents 队列
 * 4. 事件处理结束后（finally 块中）统一执行 flushDirtyComponents
 */

// ════════════════════════════════════════════════════════
// 第一部分：核心变量和队列
// ════════════════════════════════════════════════════════

// 全局标志：是否处于批量更新模式
let isBatchingUpdates = false;

// 脏组件队列：存放所有需要重新渲染的组件实例
const dirtyComponents = [];

// 更新队列：存放每个组件的所有 setState 更新
const updateQueue = new Map();  // componentInstance → [update1, update2, ...]

console.log('✅ React 16/17 批量更新系统初始化完成');

/**
 * batchedUpdates - 批量更新包装器
 *
 * 这是 React 内部在调用事件处理函数时使用的包装器
 * 所有合成事件（onClick、onChange 等）都会通过此函数执行
 */
function batchedUpdates(fn, a, b) {
  // 保存之前的批量状态（支持嵌套）
  const previousIsBatchingUpdates = isBatchingUpdates;

  // 🎯 进入批量模式
  isBatchingUpdates = true;

  try {
    // 执行用户的事件处理函数
    // 在这个函数中调用的所有 setState 都会被批处理
    return fn(a, b);
  } finally {
    // ⚠️ 关键：无论 fn 是否抛出异常，都要退出批量模式
    isBatchingUpdates = previousIsBatchingUpdates;

    // 如果退出了最外层的批量模式，执行刷新
    if (!isBatchingUpdates) {
      flushDirtyComponents();
    }
  }
}

/**
 * enqueueSetState - 将 setState 加入队列（不立即渲染）
 *
 * 当用户调用 this.setState({ count: 1 }) 时，
 * 实际执行的是这个函数
 */
function enqueueSetState(publicInstance, partialState) {
  // 1️⃣ 获取内部实例（组件实例）
  const internalInstance = publicInstance._reactInternalFiber;

  // 2️⃣ 创建更新对象
  const update = {
    partialState: partialState,
    callback: null,           // setState 的第二个参数回调
    isReplace: false,         // 是否是 replaceState
    isForced: false,          // 是否是 forceUpdate
    capturedValue: null,       // 错误边界捕获的错误
  };

  console.log(`📦 enqueueSetState: 添加更新`, partialState);

  // 3️⃣ 检查是否处于批量模式
  if (isBatchingUpdates) {
    // ✅ 批量模式：只入队，不渲染
    if (updateQueue.has(internalInstance)) {
      updateQueue.get(internalInstance).push(update);
    } else {
      updateQueue.set(internalInstance, [update]);
      dirtyComponents.push(internalInstance);  // 加入脏组件列表
    }

    console.log('  → 批量模式：延迟渲染');
  } else {
    // ❌ 非批量模式：立即渲染（如 setTimeout、Promise 回调中）
    console.log('  → 非批量模式：立即渲染');
    performUpdate(internalInstance, [update]);
  }
}

/**
 * flushDirtyComponents - 刷新所有脏组件
 *
 * 这个函数在事件处理结束后被调用
 * 它会遍历 dirtyComponents 数组，依次执行每个组件的更新
 */
function flushDirtyComponents() {
  console.log('\n🔄 开始 flushDirtyComponents...');
  console.log(`  待刷新的脏组件数量: ${dirtyComponents.length}`);

  // 如果没有脏组件，直接返回
  if (dirtyComponents.length === 0) {
    return;
  }

  // 排序：确保父组件先于子组件更新（从根到叶）
  sortTreeRange(dirtyComponents);

  // 遍历并执行每个脏组件的更新
  for (let i = 0; i < dirtyComponents.length; i++) {
    const component = dirtyComponents[i];
    const updates = updateQueue.get(component);

    if (updates && updates.length > 0) {
      console.log(`  🎬 刷新组件 #${i + 1}: ${component.type?.name || 'Anonymous'}`);
      performUpdate(component, updates);
    }

    // 清理已处理的组件
    updateQueue.delete(component);
  }

  // 清空脏组件数组
  dirtyComponents.length = 0;

  console.log('✅ flushDirtyComponents 完成\n');
}

/**
 * performUpdate - 执行单个组件的更新
 */
function performUpdate(component, updates) {
  // 合并所有的 state 更新
  let newState = { ...component.memoizedState };

  for (const update of updates) {
    if (typeof update.partialState === 'function') {
      // 函数式更新：setState(prev => ({...prev, count: prev.count + 1}))
      newState = { ...newState, ...update.partialState(newState) };
    } else {
      // 对象式更新：setState({ count: 1 })
      newState = { ...newState, ...update.partialState };
    }

    // 执行 callback（如果有）
    if (update.callback) {
      update.callback.call(component);
    }
  }

  // 更新 memoizedState
  component.memoizedState = newState;

  // 重新渲染组件（简化版）
  console.log(`    新状态:`, newState);
}
```

#### React 18 Automatic Batching 实现（createRoot + Lane 模型）

```javascript
// ==================== React 18 自动批处理实现 ====================
/**
 * React 18 使用 createRoot API 替代 ReactDOM.render
 * 默认开启自动批处理（Automatic Batching）
 *
 * 核心变化：
 * 1. 不再依赖 isBatchingUpdates 标志位
 * 2. 使用 Scheduler 调度器统一管理所有更新
 * 3. 所有 setState（无论在哪里调用）默认都是批量的
 * 4. 只有 flushSync 可以打破批处理
 */

// ════════════════════════════════════════════════════════
// 第二部分：React 18 的调度系统
// ════════════════════════════════════════════════════════

/**
 * createRoot - React 18 的根节点创建 API
 *
 * 替代了旧的 ReactDOM.render(element, container)
 * 开启并发特性和自动批处理
 */
function createRoot(container, options) {
  console.log('\n🚀 创建 React 18 Root（启用自动批处理）\n');

  // 创建 FiberRootNode
  const root = new FiberRootNode(container, options);

  // 创建 ConcurrentRoot（并发模式的根 Fiber）
  const uninitializedFiber = createHostRootFiber(
    ConcurrentRoot,  // 标记为并发模式
    undefined,
  );

  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  // 初始化更新队列
  initializeUpdateQueue(uninitializedFiber);

  return root;
}

/**
 * scheduleUpdateOnFiber - React 18 的调度入口
 *
 * 与 React 16 不同，这里不再检查 isBatchingUpdates
 * 而是始终将更新交给 Scheduler 处理
 */
function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  // 1. 检查根节点是否正在工作
  const root = markUpdateLaneFromFiberToRoot(fiber, lane);

  if (root === null) {
    console.warn('⚠️ 无法找到根节点');
    return;
  }

  // 2. 标记该 fiber 及其祖先需要更新
  markRootUpdated(root, lane, eventTime);

  // 3. 确保根节点已被调度（核心！）
  ensureRootIsScheduled(root, eventTime);

  console.log(`📅 调度更新: lane=${lane}, 由 Scheduler 决定何时执行`);
}

/**
 * ensureRootIsScheduled - 确保根节点的更新已被调度
 *
 * 这是自动批处理的核心！
 * 多次快速调用 setState 时，只会调度一次回调
 */
function ensureRootIsScheduled(root, currentTime) {
  // 获取现有的调度回调
  const existingCallbackPriority = root.callbackPriority;
  const existingCallbackNode = root.callbackNode;

  // 计算新的优先级（取最高优先级的 lane）
  const newCallbackPriority = getHighestPriorityLane(root.pendingLanes);

  if (existingCallbackPriority === newCallbackPriority) {
    // ✅ 优先级相同，不需要重新调度（复用已有的回调）
    // 这就是为什么多次 setState 只会触发一次渲染！
    console.log('  ♻️ 复用已有调度（自动批处理生效）');
    return;
  }

  // ❌ 优先级变了或没有现有回调，需要调度新的
  if (existingCallbackNode !== null) {
    // 取消旧的调度
    cancelCallback(existingCallbackNode);
  }

  // 根据优先级选择同步或并发调度
  let newCallbackNode;
  if (newCallbackPriority === SyncLane) {
    // 同步优先级（如 flushSync 触发的更新）
    newCallbackNode = scheduleSyncCallback(
      performSyncWorkOnRoot.bind(null, root),
    );
  } else {
    // 并发优先级（普通 setState、startTransition 等）
    newCallbackNode = scheduleCallback(
      schedulerPriorityLevel,
      performConcurrentWorkOnRoot.bind(null, root),
    );
  }

  root.callbackPriority = newCallbackPriority;
  root.callbackNode = newCallbackNode;

  console.log(`  📋 新调度已创建: priority=${newCallbackPriority}`);
}

/**
 * performConcurrentWorkOnRoot - 并发模式下执行根节点的工作
 *
 * 这是在 Scheduler 的回调中执行的
 * 可能会被高优先级任务打断
 */
function performConcurrentWorkOnRoot(root) {
  console.log('\n🔄 执行并发工作...');

  // 获取当前时间片截止时间（通常 5ms）
  const shouldYieldToHost = getCurrentTime() >= deadline;

  // 执行 workLoop（可中断）
  const exitStatus = renderRootConcurrent(root, shouldYieldToHost);

  if (exitStatus === RootCompleted) {
    // 渲染完成，提交到 DOM
    const finishedWork = root.current.alternate;
    commitRoot(root, finishedWork);

    // 返回 null 表示任务完成
    return null;
  } else if (exitStatus === RootInterrupted) {
    // 被打断，返回一个函数让 Scheduler 继续调度
    return performConcurrentWorkOnRoot.bind(null, root);
  }

  return null;
}
```

#### 两者差异对比示例

```javascript
// ════════════════════════════════════════════════════════
// 第三部分：React 16 vs React 18 差异对比演示
// ════════════════════════════════════════════════════════

function demoBatchingDifference() {
  console.log('\n'.repeat(2));
  console.log('=' .repeat(70));
  console.log('🎯 React 16 vs React 18 批量更新差异对比');
  console.log('='.repeat(70));

  // ========== 场景 1: setTimeout 中的 setState ==========

  console.log('\n📍 场景 1: setTimeout 中的多个 setState\n');

  console.log('--- React 16/17 行为 ---');
  console.log(`
setTimeout(() => {
  setCount(1);  // ❌ 立即渲染第 1 次
  setCount(2);  // ❌ 立即渲染第 2 次
  setName('Bob');  // ❌ 立即渲染第 3 次
});
→ 总共渲染 3 次！（性能浪费）
`);

  console.log('--- React 18 行为 ---');
  console.log(`
setTimeout(() => {
  setCount(1);  // ✅ 入队
  setCount(2);  // ✅ 入队（合并）
  setName('Bob');  // ✅ 入队
});
→ 只渲染 1 次！（自动批处理）
`);

  // ========== 场景 2: Promise.then 中的 setState ==========

  console.log('\n📍 场景 2: Promise.then 中的多个 setState\n');

  console.log('--- React 16/17 行为 ---');
  console.log(`
fetch('/api/data').then(() => {
  setData(res.data);  // ❌ 立即渲染
  setLoading(false);  // ❌ 再次渲染
});
→ 渲染 2 次
`);

  console.log('--- React 18 行为 ---');
  console.log(`
fetch('/api/data').then(() => {
  setData(res.data);  // ✅ 入队
  setLoading(false);  // ✅ 入队
});
→ 只渲染 1 次
`);

  // ========== 场景 3: 自定义事件中的 setState ==========

  console.log('\n📍 场景 3: 自定义事件监听器中的 setState\n');

  console.log('--- React 16/17 行为 ---');
  console.log(`
window.addEventListener('custom-event', () => {
  setValue(1);  // ❌ 立即渲染（不在 React 的事件系统中）
  setValue(2);  // ❌ 再次渲染
});
→ 渲染 2 次
`);

  console.log('--- React 18 行为 ---');
  console.log(`
window.addEventListener('custom-event', () => {
  setValue(1);  // ✅ 入队
  setValue(2);  // ✅ 合并入队
});
→ 只渲染 1 次
`);

  // ========== 场景 4: 如何退出批处理 ==========

  console.log('\n📍 场景 4: 使用 flushSync 强制同步渲染\n');

  console.log('--- React 18 + flushSync ---');
  console.log(`
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(c => c + 1);  // 💥 强制立即渲染
  });
  // 此时 DOM 已更新

  console.log(ref.current.offsetHeight);  // ✅ 可以读取最新尺寸

  flushSync(() => {
    setFlag(true);  // 💥 再次强制渲染
  });
  // 两次独立的渲染
}
`);
}

/**
 * 完整的可运行示例：模拟两种批处理机制
 */
class BatchingDemoComponent {
  constructor(props) {
    this.props = props;
    this.state = { count: 0, name: 'Alice' };
    this.updates = [];  // 模拟更新队列
  }

  // React 16/17 风格的 setState
  setState16(partialState) {
    console.log(`  [React16] setState(${JSON.stringify(partialState)})`);

    if (isBatchingUpdates) {
      // 批量模式：加入队列
      this.updates.push(partialState);
      console.log(`    → 批量模式：入队（当前队列长度: ${this.updates.length}）`);
    } else {
      // 非批量模式：立即应用
      this.state = { ...this.state, ...partialState };
      console.log(`    → 非批量模式：立即更新状态为`, this.state);
      this.render();
    }
  }

  // React 18 风格的 setState（始终批处理）
  setState18(partialState) {
    console.log(`  [React18] setState(${JSON.stringify(partialState)})`);

    // React 18: 始终入队，由 Scheduler 决定何时刷新
    this.updates.push(partialState);
    console.log(`    → 始终入队（当前队列长度: ${this.updates.length}）`);
    scheduleFlushIfNeeded(this);
  }

  render() {
    console.log(`  🎨 组件渲染! state=`, JSON.stringify(this.state));
  }

  // 应用所有排队的更新
  flushUpdates() {
    if (this.updates.length > 0) {
      console.log(`\n  💧 刷新 ${this.updates.length} 个更新:`);

      for (const update of this.updates) {
        this.state = { ...this.state, ...update };
        console.log(`    应用 ${JSON.stringify(update)}, 当前状态:`, this.state);
      }

      this.updates = [];
      this.render();
    }
  }
}

// 模拟 Scheduler（简化版）
let pendingFlush = null;
function scheduleFlushIfNeeded(component) {
  if (!pendingFlush) {
    pendingFlush = true;
    // 使用微任务模拟 Scheduler 的调度
    Promise.resolve().then(() => {
      pendingFlush = false;
      component.flushUpdates();
    });
  }
}

// 运行完整演示
demoBatchingDifference();

console.log('\n' .repeat(2));
console.log('=' .repeat(70));
console.log('🔬 可运行示例：两种机制的对比');
console.log('='.repeat(70));

const demo = new BatchingDemoComponent();

console.log('\n【测试 1】React 16: 事件处理中的批量更新');
batchedUpdates(() => {
  demo.setState16({ count: 1 });   // 入队
  demo.setState16({ count: 2 });   // 入队
  demo.setState16({ name: 'Bob' }); // 入队
});
// batchedUpdates 结束后自动 flush
// 输出：只渲染 1 次，state = { count: 2, name: 'Bob' }

console.log('\n【测试 2】React 16: setTimeout 中失去批处理');
setTimeout(() => {
  demo.setState16({ count: 3 });   // 立即渲染！
  demo.setState16({ count: 4 });   // 再次渲染！
}, 100);

console.log('\n【测试 3】React 18: setTimeout 中保持批处理');
setTimeout(() => {
  demo.setState18({ count: 5 });   // 入队
  demo.setState18({ count: 6 });   // 入队
  // 微任务结束后统一渲染
}, 200);
```

### 🔍 追问链
1. **React 18 的 automatic batching 有什么限制？什么情况下不会批处理？**
   → 方向：setTimeout/setInterval/Promise.then/.then/原生事件回调中的 setState 不会自动批处理（但在 flushSync 中可以）
2. **如何手动控制批处理？flushSync 和 batch API？**
   → 方向：flushSync 同步强制刷新（用于 DOM 操作后立即读取）；ReactDOM.unstable_batchedUpdates 手动合并
3. **setState 是同步还是异步的？为什么有时能立刻拿到最新值？**
   → 方向：异步的！但 React 18 的 concurrent 模式下或 flushSync 包裹中可能表现不同；永远不要依赖 setState 的同步行为

---

## Q20: useEffect 的依赖数组的工作原理是什么？有哪些常见的误区？

- **难度**：★★☆
- **知识点**：Hooks / useEffect / 依赖数组 / 闭包
- **题型**：深入理解题

### 参考答案要点：

1. **依赖数组的比较机制**
   ```javascript
   // React 使用 Object.is() 进行浅比较（shallow comparison）
   
   Object.is(1, 1);              // true
   Object.is('hello', 'hello');  // true
   Object.is({}, {});            // false  ← 引用类型比较的是地址
   Object.is([], []);            // false
   Object.is(NaN, NaN);          // true   ← 特殊情况
   Object.is(0, -0);             // false  ← 特殊情况
   ```

2. **依赖判断流程图**
   ```
   首次渲染？
   ├── 是 → 执行 effect
   └── 否 → 比较新旧依赖数组
            ├── 长度不同 → 执行 cleanup + 重新执行 effect
            ├── 逐个 Object.is 比较
            │   ├── 全部相同 → 跳过 effect（不执行）
            │   └── 存在不同 → 先执行 cleanup，再执行 effect
   ```

3. **四大常见误区详解**

   **误区 1：依赖数组为空 = 只执行一次？**
   ```jsx
   // ❌ 误解：认为 [] 表示永远只执行一次
   useEffect(() => {
     const id = setInterval(() => {
       console.log('tick');
     }, 1000);
     return () => clearInterval(id);
   }, []);  // 确实只执行一次 effect，但...

   // ⚠️ 如果组件因为父组件重新渲染而重新 mount，
   // effect 会再次执行！[] 只是说"不依赖任何 props/state"
   ```

   **误区 2：函数应该放在依赖数组中吗？**
   ```jsx
   function Parent() {
     const [count, setCount] = useState(0);
     
     // ❌ 每次 Parent 重渲染，handleClick 都是新函数
     const handleClick = () => {
       console.log(count);
     };
     
     return <Child onClick={handleClick} />;
   }

   function Child({ onClick }) {
     useEffect(() => {
       // 如果把 onClick 放入依赖：
       // 每次 Parent 重渲染都会触发这个 effect
       doSomething(onClick);
     }, [onClick]);  // 可能频繁触发
   }

   // ✅ 解决方案 1：使用 useCallback 稳定函数引用
   const handleClick = useCallback(() => {
     console.log(count);
   }, [count]);  // 只有 count 变化时才创建新函数

   // ✅ 解决方案 2：使用 ref 保持最新函数
   const handleClickRef = useRef(handleClick);
   handleClickRef.current = handleClick;
   
   useEffect(() => {
     doSomething(handleClickRef.current);
   }, []);  // 依赖为空，但总能访问到最新函数
   ```

   **误区 3：依赖数组中的对象/数组**
   ```jsx
   function SearchResults({ filters }) {
     // ❌ filters 每次都是新对象（即使内容相同）
     useEffect(() => {
       search(filters);
     }, [filters]);  // 可能导致无限循环！

     // ✅ 方案 1：使用 useMemo 稳定引用
     const stableFilters = useMemo(() => filters, [filters.keyword, filters.category]);
     useEffect(() => {
       search(stableFilters);
     }, [stableFilters]);

     // ✅ 方案 2：序列化（简单场景）
     useEffect(() => {
       search(filters);
     }, [JSON.stringify(filters)]);  // 注意：深对象性能差

     // ✅ 方案 3：拆分为具体依赖
     useEffect(() => {
       search({ keyword: filters.keyword, category: filters.category });
     }, [filters.keyword, filters.category]);
   }
   ```

   **误区 4：忘记在依赖数组中包含必要的值**
   ```jsx
   function Timer() {
     const [delay, setDelay] = useState(1000);
     
     // ❌ ESLint 警告：delay 在 effect 中使用但未列入依赖
     useEffect(() => {
       const id = setInterval(() => {
         console.log('tick');
       }, delay);  // 使用了 delay
       return () => clearInterval(id);
   }, []);  // 缺少 delay

   // ✅ 正确：包含 delay
   useEffect(() => {
     const id = setInterval(() => {
       console.log('tick');
     }, delay);
     return () => clearInterval(id);
   }, [delay]);  // delay 变化时重启定时器
   ```

4. **ESLint 插件 `react-hooks/exhaustive-deps`**
   ```javascript
   // .eslintrc.js 配置
   {
     "rules": {
       "react-hooks/exhaustive-deps": "warn"
     }
   }

   // 它会自动检测：
   // - effect 中使用但未声明的变量
   // - 依赖数组中多余的不需要的变量
   // - 给出修复建议
   ```

---

## Q21: useEffect 和 useLayoutEffect 有什么区别？什么时候应该用哪个？

- **难度**：★★☆
- **知识点**：Hooks 对比 / 渲染时机 / DOM 操作
- **题型**：对比分析题

### 参考答案要点：

1. **执行时机对比**
   ```
   用户交互/State 变化
         ↓
   ┌─────────────────────────────────────┐
   │  1. React 重新渲染组件（render）      │
   │  2. 更新 DOM                         │
   │  3. 浏览器绘制（Paint）之前：          │
   │     → useLayoutEffect 执行           │  ← 同步，阻塞绘制
   │  4. 浏览器绘制屏幕                    │
   │  5. 浏览器绘制之后：                  │
   │     → useEffect 执行                 │  ← 异步，不阻塞
   └─────────────────────────────────────┘
   ```

2. **代码示例对比**
   ```jsx
   function Demo() {
     const [width, setWidth] = useState(0);
     const boxRef = useRef(null);

     // useLayoutEffect：在浏览器绘制之前同步执行
     useLayoutEffect(() => {
       // ✅ 适合：读取 DOM 布局并同步修改
       const rect = boxRef.current.getBoundingClientRect();
       setWidth(rect.width);  // 用户看不到中间状态
     });

     // useEffect：在浏览器绘制之后异步执行
     useEffect(() => {
       // ✅ 适合：网络请求、日志、订阅等不紧急的操作
       logAnalytics('component rendered');
       fetchData();
     }, []);

     return <div ref={boxRef}>测量我的宽度</div>;
   }
   ```

3. **选择指南**

   | 场景 | 推荐 | 原因 |
   |------|------|------|
   **DOM 测量 & 修改** | `useLayoutEffect` | 避免闪烁 |
   **DOM 操作后立即读取** | `useLayoutEffect` | 保证数据一致性 |
   **网络请求** | `useEffect` | 不阻塞绘制 |
   **日志/分析** | `useEffect` | 不影响用户体验 |
   **订阅/定时器** | `useEffect` | 不阻塞主线程 |
   **DOM 动画（JS驱动）** | `useLayoutEffect` | 避免抖动 |

4. **经典案例：防止闪烁**
   ```jsx
   function Tooltip({ targetRef, text }) {
     const tooltipRef = useRef(null);

     // ❌ 使用 useEffect 会导致闪烁
     useEffect(() => {
       // 浏览器已经绘制了 Tooltip 在 (0, 0)
       const rect = targetRef.current.getBoundingClientRect();
       // 然后才修正位置 → 用户看到闪烁
       tooltipRef.current.style.top = `${rect.bottom}px`;
       tooltipRef.current.style.left = `${rect.left}px`;
     }, [targetRef, text]);

     // ✅ 使用 useLayoutEffect 无闪烁
     useLayoutEffect(() => {
       // 在浏览器绘制之前就计算好位置
       const rect = targetRef.current.getBoundingClientRect();
       tooltipRef.current.style.top = `${rect.bottom}px`;
       tooltipRef.current.style.left = `${rect.left}px`;
       // 用户直接看到最终位置
     }, [targetRef, text]);

     return <div ref={tooltipRef} className="tooltip">{text}</div>;
   }
   ```

5. **SSR 兼容性注意事项**
   ```jsx
   // ⚠️ useLayoutEffect 在服务端渲染时会报警告
   // 因为它需要访问 DOM，而 SSR 时没有 DOM
   
   // 解决方案：封装安全的 useIsomorphicLayoutEffect
   import { useEffect, useLayoutEffect } from 'react';

   function useIsomorphicLayoutEffect(effect, deps) {
     // 判断是否在浏览器环境
     if (typeof window !== 'undefined') {
       return useLayoutEffect(effect, deps);
     }
     return useEffect(effect, deps);  // SSR 时降级为 useEffect
   }

   // 使用
   function MyComponent() {
     useIsomorphicLayoutEffect(() => {
       // SSR 安全的 layout effect
     }, []);
   }
   ```

6. **性能影响**
   ```
   useLayoutEffect:
   - 同步执行，阻塞浏览器绘制
   - 长时间的 layout effect 会导致页面卡顿
   - 应尽量保持简短快速

   useEffect:
   - 异步执行，不阻塞绘制
   - 使用微任务（microtask）调度
   - 对性能影响较小
   ```

---

## Q22: useRef 和 useState 有什么区别？什么场景应该用哪个？

- **难度**：★★☆
- **知识点**：Hooks 对比 / 状态管理 / 引用
- **题型**：对比分析题 + 场景题

### 参考答案要点：

1. **核心区别**

   | 维度 | `useState` | `useRef` |
   |------|-----------|----------|
   **触发重渲染** | ✅ 是 | ❌ 否 |
   **值的变化感知** | 组件重新执行 | 不重新执行 |
   **用途** | 需要显示的数据 | 存储不需要渲染的数据 |
   **更新方式** | `setState(newValue)` | `ref.current = newValue` |
   **返回值** | `[value, setter]` | `{ current: value }` |
   **适合存储** | UI 状态 | 任意可变值、DOM 引用 |

2. **代码对比示例**
   ```jsx
   // 场景：记录按钮点击次数（两种实现）

   // ❌ 错误使用 useState（不需要显示时会造成不必要的渲染）
   function BadExample() {
     const [clickCount, setClickCount] = useState(0);

     return (
       <button onClick={() => setClickCount(c => c + 1)}>
         点我（实际不需要显示 clickCount）
       </button>
     );
     // 每次点击都触发重渲染，但 clickCount 从未被显示
   }

   // ✅ 正确使用 useRef
   function GoodExample() {
     const clickCountRef = useRef(0);

     return (
       <button onClick={() => {
         clickCountRef.current += 1;
         console.log(`点击了 ${clickCountRef.current} 次`);
       }}>
         点我
       </button>
     );
     // 点击时不触发重渲染，只是更新了一个变量的值
   }
   ```

3. **useRef 的两大用途**

   **用途 1：访问 DOM 元素**
   ```jsx
   function TextInputWithFocus() {
     const inputEl = useRef(null);

     // 页面加载后自动聚焦
     useEffect(() => {
       inputEl.current.focus();  // 访问 DOM 元素
   }, []);

     return <input ref={inputEl} type="text" placeholder="自动聚焦" />;
   }

   // 回调 ref（更灵活）
   function MeasureElement() {
     const measurementsRef = useRef(null);

     return (
       <div
         ref={(el) => {
           measurementsRef.current = el?.getBoundingClientRect();
         }}
       >
         测量我
       </div>
     );
   }
   ```

   **用途 2：存储可变值（不触发渲染）**
   ```jsx
   function Stopwatch() {
     const [time, setTime] = useState(0);
     const [isRunning, setIsRunning] = useState(false);
     const intervalRef = useRef(null);  // 存储 interval ID
     const startTimeRef = useRef(0);    // 存储开始时间戳

     useEffect(() => {
       if (isRunning) {
         startTimeRef.current = Date.now() - time * 1000;
         intervalRef.current = setInterval(() => {
           setTime((Date.now() - startTimeRef.current) / 1000);
         }, 100);
       } else {
         clearInterval(intervalRef.current);
       }
       return () => clearInterval(intervalRef.current);
     }, [isRunning]);

     return (
       <div>
         {time.toFixed(1)}s
         <button onClick={() => setIsRunning(!isRunning)}>
           {isRunning ? '暂停' : '开始'}
         </button>
       </div>
     );
   }
   ```

4. **解决闭包陷阱的经典模式**
   ```jsx
   // 问题：effect 中的闭包捕获的是旧值
   function ProblematicComponent() {
     const [count, setCount] = useState(0);

     useEffect(() => {
       const timer = setInterval(() => {
         // ⚠️ 这里的 count 永远是 0（首次渲染时的值）
         console.log(count);
         setCount(count + 1);
       }, 1000);
     }, []);  // 空依赖，effect 只执行一次

     return <div>{count}</div>;
   }

   // ✅ 解决方案：使用 ref 保存最新的回调/值
   function FixedComponent() {
     const [count, setCount] = useState(0);
     const countRef = useRef(count);

     // 保持 ref 和 state 同步
     useEffect(() => {
       countRef.current = count;
     }, [count]);

     useEffect(() => {
       const timer = setInterval(() => {
         // 通过 ref 读取最新值，绕过闭包
         const currentCount = countRef.current;
         console.log(currentCount);
         setCount(currentCount + 1);
       }, 1000);
     }, []);

     return <div>{count}</div>;
   }
   ```

5. **选择决策树**
   ```
   需要存储一个值？
   ├── 需要在界面上显示？
   │   └── → useState（值变化时触发重渲染）
   │
   ├── 需要在下次渲染时保持？（跨渲染持久化）
   │   └── → useRef（值变化不触发重渲染）
   │
   ├── 需要访问 DOM 元素？
   │   └── → useRef + ref 属性
   │
   └── 需要在 effect 中读取最新值（避免闭包陷阱）？
       └── → useRef（配合 useEffect 保持同步）
   ```

### 🔍 追问链
1. **useRef 存储的值变化会触发子组件重渲染吗？**
   → 方向：不会！ref.current 的修改完全绕过 React 的调度系统，这是它的核心特性
2. **useRef 可以用来解决闭包陷阱吗？和函数式更新有什么区别？**
   → 方向：可以！ref.current 始终指向最新值，不受闭包影响；函数式更新 `setCount(c => c + 1)` 也能解决但语义不同
3. **useCallback 内部是否也用了 useRef 来保持引用稳定？**
   → 方向：是的！useCallback 内部通常用 ref 缓存最新回调，避免因依赖变化导致子组件不必要的重渲染

---

## Q23: useMemo 和 useCallback 有什么区别？什么时候真正需要它们？

- **难度**：★★☆
- **知识点**：性能优化 / Hooks / 记忆化
- **题型**：对比分析题 + 最佳实践题

### 参考答案要点：

1. **基本概念与区别**
   ```jsx
   // useMemo: 缓存「计算结果」（值）
   const expensiveValue = useMemo(() => {
     return computeExpensiveValue(a, b);
   }, [a, b]);  // a/b 不变时返回缓存的结果

   // useCallback: 缓存「函数本身」（函数引用）
   const handleClick = useCallback(() => {
     doSomething(a, b);
   }, [a, b]);  // a/b 不变时返回缓存的函数
   ```

   **本质关系**：
   ```jsx
   // useCallback(fn, deps) 等价于：
   // useMemo(() => fn, deps)

   // 所以 useCallback 是 useMemo 的语法糖
   ```

2. **useMemo 的正确使用场景**
   ```jsx
   // ✅ 场景 1：昂贵的计算
   function FilteredList({ items, filterText }) {
     const filteredItems = useMemo(() => {
       // 假设这是一个 O(n²) 的过滤+排序操作
       return items
         .filter(item => item.name.includes(filterText))
         .sort((a, b) => a.price - b.price);
     }, [items, filterText]);  // 只在依赖变化时重新计算

     return <ul>{filteredItems.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
   }

   // ✅ 场景 2：避免引用类型导致的子组件不必要的重渲染
   function Parent() {
     const [count, setCount] = useState(0);

     // 每次渲染都是新对象，会导致 Child 重新渲染
     // const config = { theme: 'dark', lang: 'zh' };  // ❌

     // 使用 useMemo 稳定引用
     const config = useMemo(() => ({ theme: 'dark', lang: 'zh' }), []);
     // 只有当依赖变化时才创建新对象

     return (
       <div>
         <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
         <Child config={config} />  {/* Child 被 React.memo 包装 */}
       </div>
     );
   }

   // ✅ 场景 3：复杂的派生状态
   function Chart({ rawData }) {
     const chartData = useMemo(() => {
       // 数据转换、聚合、格式化
       return transformAndAggregate(rawData);
     }, [rawData]);

     return <ChartComponent data={chartData} />;
   }
   ```

3. **useCallback 的正确使用场景**
   ```jsx
   // ✅ 场景 1：传递给被 React.memo 包裹的子组件
   function Parent({ itemId }) {
     // ❌ 每次渲染都是新函数，导致 MemoizedChild 重新渲染
     // const handleClick = () => { doSomething(itemId); };

     // ✅ 使用 useCallback 稳定函数引用
     const handleClick = useCallback(() => {
       doSomething(itemId);
     }, [itemId]);  // itemId 不变时返回同一函数

     return <MemoizedChild onClick={handleClick} />;
   }

   // ✅ 场景 2：作为其他 Hook 的依赖
   function DebouncedSearch({ searchQuery }) {
     const fetchData = useCallback(async (query) => {
       const results = await api.search(query);
       setResults(results);
     }, []);

     // debounce 的回调需要稳定引用
   const debouncedFetch = useDebounce(fetchData, 300);

     useEffect(() => {
       debouncedFetch(searchQuery);
     }, [searchQuery, debouncedFetch]);
   }

   // ✅ 场景 3：事件监听器的回调
   function ScrollListener({ onScroll }) {
     const stableCallback = useCallback((event) => {
       onScroll(event.target.scrollTop);
     }, [onScroll]);

     useEffect(() => {
       window.addEventListener('scroll', stableCallback);
       return () => window.removeEventListener('scroll', stableCallback);
     }, [stableCallback]);
   }
   ```

4. **⚠️ 过度优化的陷阱（重要！）**
   ```jsx
   // ❌ 陷阱 1：缓存简单的原始值（毫无意义）
   const double = useMemo(() => count * 2, [count]);
   // 乘法很快，缓存的开销比计算还大

   // ❌ 陷阱 2：缓存简单的对象字面量
   const config = useMemo(() => ({ enabled: true }), []);
   // 这种简单对象的创建成本极低

   // ❌ 陷阱 3：过早优化（没有性能问题时不要加）
   function SimpleComponent({ name }) {
     // 还没遇到性能问题就不要加 memo
     const processedName = useMemo(() => name.trim().toLowerCase(), [name]);
     return <div>{processedName}</div>;
   }

   // ✅ 正确的做法：先用 Profiler 分析，确认瓶颈后再优化
   // 1. 使用 React DevTools Profiler 找出慢的组件
   // 2. 确认是因为不必要的重渲染
   // 3. 再针对性地使用 useMemo/useCallback
   ```

5. **性能权衡**
   ```
   useMemo/useCallback 的代价：
   - 内存占用：需要保存上次计算结果
   - 代码复杂性：增加了代码量和认知负担
   - 依赖数组维护：需要正确声明依赖

   收益：
   - 避免昂贵的重复计算（useMemo）
   - 避免子组件不必要的重渲染（两者都可以）

   建议：
   - 默认不加，除非有明确需求
   - 通过性能分析确定优化点
   - 优先考虑算法/架构层面的优化
   ```

---

## Q24: useContext 的性能问题是什么？如何优化？

- **难度**：★★☆
- **知识点**：Context / 性能优化 / 不必要渲染
- **题型**：问题分析与解决方案

### 参考答案要点：

1. **Context 的性能问题根源**
   ```jsx
   // 问题：Context value 变化时，所有消费者都会重渲染
   // 即使某个消费者只使用了 value 的一小部分

   const ThemeContext = createContext({ theme: 'light', fontSize: 14, language: 'zh' });

   function App() {
     const [theme, setTheme] = useState('light');
     const [fontSize, setFontSize] = useState(14);
     const [language, setLanguage] = useState('zh');

     // ⚠️ 任何一个 state 变化，整个 value 对象都是新的
     const contextValue = { theme, fontSize, language };

     return (
       <ThemeContext.Provider value={contextValue}>
         <Header />      {/* 只关心 theme */}
         <Content />     {/* 只关心 fontSize */}
         <Footer />      {/* 只关心 language */}
       </ThemeContext.Provider>
     );
   }

   // 当 theme 变化时：
   // Header 重渲染 ✓（合理）
   // Content 重渲染 ✗（不需要，fontSize 没变）
   // Footer 重渲染 ✗（不需要，language 没变）
   ```

2. **解决方案 1：拆分 Context**
   ```jsx
   // ✅ 将大的 Context 拆分成多个小的 Context
   const ThemeContext = createContext('light');
   const FontSizeContext = createContext(14);
   const LanguageContext = createContext('zh');

   function App() {
     const [theme, setTheme] = useState('light');
     const [fontSize, setFontSize] = useState(14);
     const [language, setLanguage] = useState('zh');

     return (
       <ThemeContext.Provider value={theme}>
         <FontSizeContext.Provider value={fontSize}>
           <LanguageContext.Provider value={language}>
             <Header />    {/* 只订阅 ThemeContext */}
             <Content />   {/* 只订阅 FontSizeContext */}
             <Footer />    {/* 只订阅 LanguageContext */}
           </LanguageContext.Provider>
         </FontSizeContext.Provider>
       </ThemeContext.Provider>
     );
   }

   // 各组件只订阅自己关心的 Context
   function Header() {
     const theme = useContext(ThemeContext);  // 只在这个 context 变化时重渲染
     return <header className={theme}>...</header>;
   }
   ```

3. **解决方案 2：Memoize Context Value**
   ```jsx
   // ✅ 使用 useMemo 稳定 context value 的引用
   function App() {
     const [user, setUser] = useState(null);
     const [theme, setTheme] = useState('light');

     // ❌ 每次渲染都创建新对象
     // const value = { user, theme, login: () => {}, logout: () => {} };

     // ✅ 使用 useMemo，只有依赖变化时才创建新对象
     const value = useMemo(() => ({
       user,
       theme,
       login: () => {},
       logout: () => {},
     }), [user, theme]);  // user 或 theme 变化时才更新

     return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
   }
   ```

4. **解决方案 3：拆分状态和 dispatch**
   ```jsx
   // ✅ 经典模式：将不常变化的值和经常变化的 dispatch 分开
   const StateContext = createStateContext(null);
   const DispatchContext = createDispatchContext(null);

   function AppProvider({ children }) {
     const [state, dispatch] = useReducer(appReducer, initialState);

     // state 对象可能频繁变化
     // dispatch 函数引用永远稳定（由 useReducer 保证）
     return (
       <DispatchContext.Provider value={dispatch}>
         <StateContext.Provider value={state}>
           {children}
         </StateContext.Provider>
       </DispatchContext.Provider>
     );
   }

   // 子组件只需要 dispatch 时，不会因为 state 变化而重渲染
   function ActionButtons() {
     const dispatch = useContext(DispatchContext);  // dispatch 永远不变
     return (
       <div>
         <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
         <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
       </div>
     );
   }
   ```

5. **解决方案 4：使用 selector 模式（高级）**
   ```jsx
   // 自定义 Hook 实现 selector 模式
   function useContextSelector(Context, selector) {
     const contextValue = useContext(Context);
     const selectedValue = selector(contextValue);

     // 使用 useRef 存储上一次的选择结果
     const previousSelectedRef = useRef(selectedValue);

     // 使用一个额外的 state 来触发重渲染
     const [, forceUpdate] = useState(0);

     // 检查选择的值是否真的变化了
     if (!shallowEqual(previousSelectedRef.current, selectedValue)) {
       previousSelectedRef.current = selectedValue;
       forceUpdate(n => n + 1);  // 只有值变化时才触发重渲染
     }

     return previousSelectedRef.current;
   }

   // 使用
   function Content() {
     // 只在 fontSize 变化时重渲染
     const fontSize = useContextSelector(
       ThemeContext,
       ctx => ctx.fontSize
     );
     return <div style={{ fontSize }}>内容</div>;
   }
   ```

6. **选择建议**
   ```
   小型应用（< 50 个组件）：直接使用 Context，不必过早优化
   中型应用：拆分 Context，按关注点分离
   大型应用：考虑使用 Redux/Zustand 等专业状态管理库
   需要细粒度更新：使用 selector 模式或第三方库（zustand 的 slice）
   ```

---

## Q25: 自定义 Hook 的设计原则和最佳实践有哪些？

- **难度**：★★☆
- **知识点**：Hooks 进阶 / 代码复用 / 设计模式
- **题型**：最佳实践题

### 参考答案要点：

1. **命名规范**
   ```jsx
   // ✅ 必须以 "use" 开头
   function useLocalStorage(key, initialValue) { ... }
   function useDebounce(value, delay) { ... }
   function useMediaQuery(query) { ... }
   function useOnClickOutside(ref, handler) { ... }

   // 这样 ESLint 插件才能检查内部的 hooks 规则
   // 其他开发者也能一眼看出这是一个 Hook
   ```

2. **设计原则**

   **原则 1：单一职责**
   ```jsx
   // ❌ 一个 Hook 做太多事
   function useEverything(userId) {
     const [user, setUser] = useState(null);
     const [theme, setTheme] = useState('light');
     const [notifications, setNotifications] = useState([]);

     useEffect(() => { /* 获取用户 */ }, [userId]);
     useEffect(() => { /* 监听主题 */ }, []);
     useEffect(() => { /* 获取通知 */ }, [userId]);

     return { user, theme, notifications, setTheme, setNotifications };
   }

   // ✅ 拆分为多个 focused 的 Hook
   function useUser(userId) { ... }           // 用户数据
   function useTheme() { ... }                // 主题管理
   function useNotifications(userId) { ... }   // 通知管理

   // 组合使用
   function UserProfile({ userId }) {
     const { user } = useUser(userId);
     const { theme } = useTheme();
     const { notifications } = useNotifications(userId);
     // ...
   }
   ```

   **原则 2：清晰的接口设计**
   ```jsx
   // ✅ 好的设计：返回值语义明确
   function useToggle(initialValue = false) {
     const [value, setValue] = useState(initialValue);
     const toggle = useCallback(() => setValue(v => !v), []);
     const setTrue = useCallback(() => setValue(true), []);
     const setFalse = useCallback(() => setValue(false), []);

     return { value, toggle, setTrue, setFalse, setValue };
   }

   // 使用
   function Modal() {
     const { value: isOpen, toggle, setTrue: open, setFalse: close } = useToggle();
     return (
       <>
         <button onClick={open}>打开</button>
         {isOpen && <ModalDialog onClose={close} />}
       </>
     );
   }
   ```

   **原则 3：处理边界情况**
   ```jsx
   function useFetch(url, options = {}) {
     const [data, setData] = useState(null);
     const [error, setError] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       // 处理空 URL
       if (!url) {
         setLoading(false);
         return;
       }

       const abortController = new AbortController();

       async function fetchData() {
         try {
           setLoading(true);
           setError(null);
           const response = await fetch(url, {
             ...options,
             signal: abortController.signal,  // 支持取消
           });

           if (!response.ok) throw new Error(`HTTP ${response.status}`);

           const json = await response.json();
           setData(json);
         } catch (err) {
           if (err.name !== 'AbortError') {  // 忽略取消错误
             setError(err.message);
           }
         } finally {
           setLoading(false);
         }
       }

       fetchData();

       return () => abortController.abort();  // 清理
     }, [url, options.method]);  // 精确的依赖

     return { data, error, loading, refetch: () => {} };  // 提供 refetch 方法
   }
   ```

3. **常见自定义 Hook 模式**

   **模式 1：状态增强 Hook**
   ```jsx
   function useLocalStorage(key, initialValue) {
     const [storedValue, setStoredValue] = useState(() => {
       try {
         const item = window.localStorage.getItem(key);
         return item ? JSON.parse(item) : initialValue;
       } catch (error) {
         console.error(error);
         return initialValue;
       }
     });

     const setValue = useCallback((value) => {
       try {
         const valueToStore = value instanceof Function ? value(storedValue) : value;
         setStoredValue(valueToStore);
         window.localStorage.setItem(key, JSON.stringify(valueToStore));
       } catch (error) {
         console.error(error);
       }
     }, [key, storedValue]);

     return [storedValue, setValue];
   }

   // 使用
   function Settings() {
     const [theme, setTheme] = useLocalStorage('theme', 'light');
     return <select value={theme} onChange={e => setTheme(e.target.value)}>...</select>;
   }
   ```

   **模式 2：事件监听 Hook**
   ```jsx
   function useEventListener(eventName, handler, element = window) {
     const savedHandler = useRef(handler);

     // 保持 handler 引用最新
     useEffect(() => {
       savedHandler.current = handler;
     }, [handler]);

     useEffect(() => {
       const el = element.current || element;
       if (!el) return;

       const eventListener = (event) => savedHandler.current(event);
       el.addEventListener(eventName, eventListener);

       return () => el.removeEventListener(eventName, eventListener);
     }, [eventName, element]);
   }

   // 使用
   function EscapeHandler({ onEscape }) {
     useEventListener('keydown', (e) => {
       if (e.key === 'Escape') onEscape();
     });
     return null;
   }
   ```

   **模式 3：异步操作 Hook**
   ```jsx
   function useAsync(asyncFunction, immediate = true) {
     const [state, setState] = useState({
       status: 'idle',  // idle | pending | success | error
       value: null,
       error: null,
     });

     const execute = useCallback(async (...args) => {
       setState({ status: 'pending', value: null, error: null });
       try {
         const response = await asyncFunction(...args);
         setState({ status: 'success', value: response, error: null });
       } catch (error) {
         setState({ status: 'error', value: null, error });
       }
     }, [asyncFunction]);

     useEffect(() => {
       if (immediate) execute();
     }, [execute, immediate]);

     return { ...state, execute };
   }
   ```

4. **自定义 Hook 的测试**
   ```jsx
   import { renderHook, act } from '@testing-library/react';
   import { useCounter } from './useCounter';

   test('should increment counter', () => {
     const { result } = renderHook(() => useCounter());

     act(() => {
       result.current.increment();
     });

     expect(result.current.count).toBe(1);
   });

   test('should update when initial value changes', () => {
     const { result, rerender } = renderHook(
       ({ initialCount }) => useCounter(initialCount),
       { initialProps: { initialCount: 0 } }
   );

     expect(result.current.count).toBe(0);

     rerender({ initialCount: 10 });
     expect(result.current.count).toBe(10);
   });
   ```

---

## Q26: useReducer 的适用场景是什么？和 useState 相比有什么优劣？

- **难度**：★★☆
- **知识点**：State 管理 / useReducer / 状态逻辑复杂度
- **题型**：对比分析题

### 参考答案要点：

1. **基本用法**
   ```jsx
   // 语法：const [state, dispatch] = useReducer(reducer, initialArg, init?)

   // 定义 reducer（纯函数）
   function counterReducer(state, action) {
     switch (action.type) {
       case 'INCREMENT':
         return { count: state.count + 1 };
       case 'DECREMENT':
         return { count: state.count - 1 };
       case 'SET_VALUE':
         return { count: action.payload };
       default:
         return state;
     }
   }

   // 使用
   function Counter() {
     const [state, dispatch] = useReducer(counterReducer, { count: 0 });

     return (
       <div>
         Count: {state.count}
         <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
         <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
         <button onClick={() => dispatch({ type: 'SET_VALUE', payload: 0 })}>Reset</button>
       </div>
     );
   }
   ```

2. **适用场景判断**
   ```
   使用 useState：
   - 状态是简单的基本类型（string, number, boolean）
   - 状态更新逻辑简单
   - 状态之间独立性高

   使用 useReducer：
   - 状态是复杂对象，多个字段相互关联
   - 状态更新逻辑复杂（多种 action 类型）
   - 下一个状态依赖于前一个状态
   - 需要可预测的状态管理（类似 Redux 思想）
   - 需要向深层子组件传递 dispatch（配合 Context）
   ```

3. **复杂状态管理示例**
   ```jsx
   // 复杂表单状态管理
   const initialState = {
     values: {
       username: '',
       email: '',
       password: '',
     },
     errors: {},
     touched: {},
     isSubmitting: false,
   };

   function formReducer(state, action) {
     switch (action.type) {
       case 'FIELD_CHANGE': {
         const { field, value } = action.payload;
         return {
           ...state,
           values: { ...state.values, [field]: value },
           errors: { ...state.errors, [field]: validate(field, value) },
         };
       }
       case 'FIELD_BLUR': {
         return {
           ...state,
           touched: { ...state.touched, [action.payload]: true },
         };
       }
       case 'SUBMIT_START':
         return { ...state, isSubmitting: true };
       case 'SUBMIT_SUCCESS':
         return { ...initialState };
       case 'SUBMIT_ERROR':
         return { ...state, isSubmitting: false, errors: action.payload };
       default:
         return state;
     }
   }

   function useForm(initialValues) {
     const [state, dispatch] = useReducer(formReducer, {
       ...initialState,
       values: initialValues,
     });

     const handleChange = (field) => (e) => {
       dispatch({ type: 'FIELD_CHANGE', payload: { field, value: e.target.value } });
     };

     const handleBlur = (field) => () => {
       dispatch({ type: 'FIELD_BLUR', payload: field });
     };

     const handleSubmit = async (onSubmit) => {
       dispatch({ type: 'SUBMIT_START' });
       try {
         await onSubmit(state.values);
         dispatch({ type: 'SUBMIT_SUCCESS' });
       } catch (errors) {
         dispatch({ type: 'SUBMIT_ERROR', payload: errors });
       }
     };

     return { ...state, handleChange, handleBlur, handleSubmit };
   }
   ```

4. **useReducer + Context：轻量级全局状态**
   ```jsx
   // 创建 Context
   const StateContext = createContext(null);
   const DispatchContext = createContext(null);

   function AppProvider({ children }) {
     const [state, dispatch] = useReducer(appReducer, initialState);

     return (
       <StateContext.Provider value={state}>
         <DispatchContext.Provider value={dispatch}>
           {children}
         </DispatchContext.Provider>
       </StateContext.Provider>
     );
   }

   // 任意层级的子组件都能使用
   function DeepChildComponent() {
     const state = useContext(StateContext);
     const dispatch = useContext(DispatchContext);

     return (
       <button onClick={() => dispatch({ type: 'SOME_ACTION' })}>
         {state.someValue}
       </button>
     );
   }
   ```

5. **useState vs useReducer 对比**

   | 维度 | useState | useReducer |
   |------|----------|------------|
   **适用状态复杂度** | 简单 | 复杂 |
   **更新方式** | 直接设置新值 | 通过 dispatch action |
   **可预测性** | 一般 | 高（纯函数 reducer） |
   **可测试性** | 一般 | 高（reducer 易测试） |
   **调试便利性** | 一般 | 好（可记录 action 日志） |
   **学习成本** | 低 | 中等 |
   **代码量** | 少 | 多 |
   **性能** | 相近 | 相近（React 18 都批量更新） |

6. **惰性初始化（lazy initialization）**
   ```jsx
   // useReducer 支持第三个参数作为初始化函数
   function init(initialCount) {
     return {
       count: initialCount,
       history: [],
       lastAction: null,
     };
   }

   function reducer(state, action) {
     // ...
   }

   // 初始化函数只执行一次
   const [state, dispatch] = useReducer(reducer, 0, init);
   ```

---

## Q27: React 18 新增了哪些 Hooks？请详细介绍 useId、useTransition、useDeferredValue、useSyncExternalStore。

- **难度**：★★☆
- **知识点**：React 18 / 新 Hooks / 并发特性
- **题型**：综合应用题

### 参考答案要点：

1. **useId：生成唯一 ID**
   ```jsx
   function CheckboxGroup({ options, name }) {
     // ✅ 生成稳定的、唯一的 ID（SSR 安全）
     const generatedId = useId();
     const baseId = `checkbox-${generatedId}`;

     return (
       <fieldset>
         {options.map((option, index) => (
           <label key={option.value}>
             <input
               type="checkbox"
               name={name}
               id={`${baseId}-${index}`}
               value={option.value}
             />
             {option.label}
           </label>
         ))}
       </fieldset>
     );
   }

   // 特点：
   // - 生成的 ID 在同一组件的不同渲染间保持稳定
   // - SSR 时客户端和服务端生成的 ID 一致（解决了 hydration 不匹配问题）
   // - 同一组件中多次调用 useId 会生成不同的 ID
   // - 接受 prefix 参数：useId('prefix')
   ```

2. **useTransition：标记非紧急更新**
   ```jsx
   function SearchPage() {
     const [query, setQuery] = useState('');
     const [results, setResults] = useState([]);
     const [isPending, startTransition] = useTransition();

     const handleChange = (e) => {
       // ✅ 紧急更新：立即响应用户输入
       setQuery(e.target.value);

       // ✅ 非紧急更新：可以延迟的搜索
       startTransition(() => {
         // 这个 setState 会被标记为"过渡更新"
         // React 可能中断或延迟它，优先处理紧急更新
         const filtered = filterResults(e.target.value, allData);
         setResults(filtered);
       });
     };

     return (
       <div>
         <input value={query} onChange={handleChange} />
         {isPending && <Spinner />}  {/* 显示加载指示器 */}
         <ResultList results={results} />
       </div>
     );
   }

   // 应用场景：
   // - 搜索过滤（输入即时响应，结果延迟加载）
   // - 切换标签页（tab 切换即时，内容延迟加载）
   // - 大列表筛选
   // - 导航切换
   ```

3. **useDeferredValue：延迟更新某个值**
   ```jsx
   function Typeahead({ allItems }) {
     const [inputValue, setInputValue] = useState('');

     // ✅ deferredInputValue 会"滞后"于 inputValue
     // 在紧急更新期间，它会保留旧值
     const deferredInputValue = useDeferredValue(inputValue);

     // 立即响应用户输入（紧急）
   const displayValue = inputValue;

     // 使用延迟的值进行昂贵操作（非紧急）
     const filteredItems = useMemo(
       () => allItems.filter(item =>
         item.toLowerCase().includes(deferredInputValue.toLowerCase())
       ),
       [allItems, deferredInputValue]
   );

     return (
       <div>
         <input
           value={inputValue}
           onChange={e => setInputValue(e.target.value)}
           placeholder="搜索..."
         />
         <List items={filteredItems} />
       </div>
     );
   }

   // useTransition vs useDeferredValue：
   // - useTransition：触发更新的方（主动延迟 setState）
   // - useDeferredValue：被更新的值（被动接受延迟版本）
   // - 两者本质相同，只是 API 角度不同
   ```

4. **useSyncExternalStore：订阅外部数据源**
   ```jsx
   // 用于订阅 React 外部的数据源（如 store、浏览器 API、数据库等）
   import { useSyncExternalStore } from 'react';

   // 示例：订阅浏览器在线状态
   function subscribe(callback) {
     window.addEventListener('online', callback);
     window.addEventListener('offline', callback);
     return () => {
       window.removeEventListener('online', callback);
       window.removeEventListener('offline', callback);
     };
   }

   function getSnapshot() {
     return navigator.onLine;  // 返回当前的快照值
   }

   function getServerSnapshot() {
     return true;  // SSR 时假设在线（必须与客户端初始值一致）
   }

   function OnlineStatusIndicator() {
     // ✅ 订阅外部 store，并在数据变化时触发重渲染
     const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

     return <span>{isOnline ? '✅ Online' : '❌ Offline'}</span>;
   }

   // 主要用于第三方状态管理库（如 Redux、Zustand）的内部实现
   // 确保对外部数据源的订阅与 React 的并发渲染模式兼容
   ```

5. **新 Hooks 的设计理念**
   ```
   共同目标：区分"紧急更新"和"非紧急更新"

   紧急更新（Urgent）：
   - 直接的用户交互（打字、点击、拖拽）
   - 需要立即响应
   - 不能被中断

   非紧急更新（Transition）：
   - 视图切换、数据加载、列表过滤
   - 可以延迟
   - 可以被中断
   - 可以被更高优先级的更新抢占

   好处：
   - 让应用在大数据量/复杂计算时依然流畅
   - 优先保证用户交互的响应速度
   ```

---

## Q28: 虚拟 DOM 的优势和劣势分别是什么？什么情况下虚拟 DOM 反而会成为性能瓶颈？

- **难度**：★★☆
- **知识点**：虚拟 DOM / 性能 / 架构权衡
- **题型**：分析评价题

### 参考答案要点：

1. **虚拟 DOM 的核心优势**

   **优势 1：声明式编程模型**
   ```jsx
   // 开发者只需描述"UI 应该是什么样子"，而不是"如何操作 DOM"
   // 虚拟 DOM 框架负责找出最小的 DOM 操作集合

   // 命令式（jQuery 时代）
   $('#list').empty();
   items.forEach(item => {
     $('#list').append(`<li>${item.name}</li>`);  // 手动管理 DOM
   });

   // 声明式（React）
   function List({ items }) {
     return (
       <ul>
         {items.map(item => <li key={item.id}>{item.name}</li>)}
       </ul>
     );  // 只描述最终的 UI 状态
   }
   ```

   **优势 2：跨浏览器兼容**
   ```
   - 虚拟 DOM 屏蔽了浏览器差异
   - 统一的事件系统和更新机制
   - 不需要手动处理 IE 兼容等问题
   ```

   **优势 3：批处理与高效更新**
   ```
   - 多次状态变更合并为一次 DOM 更新
   - Diff 算法找出最小变更集
   - 避免不必要的 DOM 操作（DOM 操作比 JS 计算昂贵得多）
   ```

   **优势 4：框架无关的抽象层**
   ```
   - 同一套虚拟 DOM 可以渲染到不同平台：
     - 浏览器（ReactDOM）
     - 移动端（React Native）
     - 服务端（SSR）
     - Canvas/SVG
     - 终端/VR
   ```

2. **虚拟 DOM 的劣势**

   **劣势 1：额外的内存开销**
   ```
   - 需要维护虚拟 DOM 树（JavaScript 对象）
   - 大型应用的虚拟 DOM 可能占用较多内存
   - 每次渲染都要创建新的虚拟 DOM 树（即使大部分没变）
   ```

   **劣势 2：初次渲染较慢**
   ```
   - 首次渲染需要：
     1. 创建虚拟 DOM 树
     2. Diff（首次无旧树可比较）
     3. 创建真实 DOM
   - 相比直接操作 DOM，首屏可能有额外开销
   ```

   **劣势 3：不适合极高频更新场景**
   ```jsx
   // ❌ 问题：每帧都需要更新大量节点的场景
   function ParticleSystem({ particles }) {
     // 1000+ 个粒子每帧都在移动
     // 虚拟 DOM 的 diff 开销可能超过直接操作 DOM
     return (
       <canvas-container>
         {particles.map(p => (
           <Particle
             key={p.id}
             x={p.x}
             y={p.y}
             rotation={p.rotation}
           />
         ))}
       </canvas-container>
     );
   }

   // ✅ 这种场景应使用 Canvas/WebGL 或直接 DOM 操作
   ```

3. **虚拟 DOM 成为瓶颈的场景**
   ```
   场景 1：超大列表（10000+ 项）
   → 解决：虚拟滚动（react-window, react-virtualized）

   场景 2：高频实时数据（股票行情、游戏）
   → 解决：绕过 React，直接操作 DOM 或使用 Canvas

   场景 3：深层嵌套的大规模更新
   → 解决：拆分组件、使用 key 优化、避免不必要渲染

   场景 4：低性能设备（老旧手机）
   → 解决：代码分割、懒加载、减少首屏内容
   ```

4. **性能对比：直觉 vs 现实**
   ```
   直觉："虚拟 DOM 一定比直接操作 DOM 慢"

   现实：
   - DOM 操作成本 >> JavaScript 计算
   - innerHTML = '' （清空容器）比逐个 removeChild 快
   - 虚拟 DOM 的批量更新通常比手动的精细 DOM 操作更快
   - 关键在于"最小化 DOM 操作次数"，而不是"避免虚拟 DOM"

   数据参考（粗略）：
   - 创建 1000 个 DOM 节点：~10ms
   - 创建 1000 个虚拟 DOM 节点：~1ms
   - Diff 1000 个节点：~1-5ms
   - 所以虚拟 DOM 方案总计 ~2-6ms vs 直接 DOM ~10ms+
   ```

5. **现代框架的演进**
   ```
   React: 虚拟 DOM + Fiber + 并发模式
   Vue 3: 虚拟 DOM + 编译时优化（静态提升、PatchFlags）
   Svelte: 编译时框架，无虚拟 DOM（编译成命令式 DOM 操作）
   Solid: 细粒度响应式，无虚拟 DOM

   结论：
   - 虚拟 DOM 是一种工程上的权衡取舍
   - 对于大多数业务应用，利大于弊
   - 特殊场景可以选择更适合的技术方案
   ```

### 🔍 追问链
1. **虚拟 DOM 一定比直接操作 DOM 快吗？什么场景下反而更慢？**
   → 方向：小规模更新（改一个文本）虚拟 DOM 的创建+diff 开销可能超过直接操作；大规模/复杂场景下优势明显
2. **Svelte 没有虚拟 DOM，它是怎么做到高性能的？**
   → 方向：编译时将响应式更新直接编译为精确的 DOM 操作指令，运行时无需 diff；牺牲了灵活性换取性能
3. **Vue 3 的虚拟 DOM 和 React 的有什么核心区别？**
   → 方向：Vue 用 Proxy 做细粒度依赖收集（知道哪个属性变了），React 整体 re-render 再 diff（不知道哪里变了）

---

## Q29: 请详细解释 React Fiber 架构。为什么引入 Fiber？Fiber 节点的数据结构是怎样的？

- **难度**：★★☆
- **知识点**：Fiber 架构 / 内部原理 / 调度机制
- **题型**：原理深入题

### 参考答案要点：

1. **为什么引入 Fiber？（Stack Reconciler 的局限性）**
   ```
   React 15 及之前的 Stack Reconciler 问题：

   1. 递归更新，一旦开始就无法中断
   ┌────────────────────────────────────┐
   │  render()                          │
   │    └→ ComponentA.render()          │
   │         └→ ComponentB.render()     │
   │              └→ ComponentC.render()│  ← 递归栈
   │                   └→ ...           │
   └────────────────────────────────────┘
   整个过程是同步的、不可中断的

   2. 主线程被占用，用户交互无响应
   - 如果组件树很大， reconcilation 可能耗时 100ms+
   - 这期间浏览器无法处理用户输入、动画等
   - 造成"掉帧"、"卡顿"的感觉

   3. 无法实现优先级更新
   - 所有更新同等重要
   - 无法让紧急更新（输入）插队
   ```

2. **Fiber 的核心思想**
   ```
   Fiber 将递归的 reconcilation 改为可中断的循环

   Stack Reconciler（旧）：
   递归 → 一口气做完 → 返回结果

   Fiber Reconciler（新）：
   循环 → 做一小段时间 → 检查是否有更重要的事 → 继续/暂停

   类似于：
   - 时间切片（Time Slicing）：每工作一小段时间就让出主线程
   - 协作式调度（Cooperative Scheduling）：React 自己决定何时暂停
   ```

3. **Fiber 节点的数据结构**
   ```javascript
   // 简化版的 Fiber 节点结构
   function FiberNode({
     // === 节点类型信息 ===
     tag,                    // 组件类型标记（Function/Class/Host/等）
     type,                   // 具体类型（div / MyApp / etc.）
     key,                    // 唯一标识

     // === 树形结构（链表形式） ===
     return,                 // 父 Fiber
     child,                  // 第一个子 Fiber
     sibling,                // 下一个兄弟 Fiber

     // === 双缓存 ===
     alternate,              // 对应的另一棵树的 Fiber（current ↔ workInProgress）

     // === 状态 ===
     memoizedState,          // Hooks 链表头（useState/useReducer 等）
     memoizedProps,          // 上次渲染的 props
     pendingProps,           // 等待应用的 props
     updateQueue,            // 状态更新队列

     // === Effect 链表 ===
     flags,                  // Effect 标记（ Placement | Update | Deletion ）
     subtreeFlags,           // 子树的 Effect 标记
     firstEffect,            // Effect 链表头
     lastEffect,             // Effect 链表尾
     nextEffect,             // 下一个 Effect

     // === 调度信息 ===
     lanes,                  // 优先级标记（Lane 模型）
     childLanes,

     // === 其他 ===
     ref,                    // ref 引用
     stateNode,              // 对应的真实 DOM 节点或组件实例
   }) {
     // ...
   }
   ```

4. **Fiber 树的结构示意**
   ```
   组件树（JSX）          Fiber 树（链表结构）
   ┌─────┐               ┌─────┐
   │ App │               │ App │──return──→ null
   └──┬──┘               ├──child──→ ┌─────┐
      │                  │  A   │←return──┤
   ┌──┴──┐               ├──child──→┌───┐
   │  A  │               │  B  │    │ B │
   └──┬──┘               ├──sibling→└───┘
      │                  │
   ┌──┴────┐             └──child──→ ┌───┐
   │B   C  │                       │ D │
   └──┬┬──┘                       └───┘
      ││
   ┌──┘└──┐
   │D     E│
   └──────┘

   遍历顺序（深度优先）：
   App → A → B → D → (回溯) → C → E → (回溯完成)
   ```

5. **双缓存技术（Double Buffering）**
   ```
   React 维护两棵 Fiber 树：

   current 树：          workInProgress 树：
   （当前屏幕显示的）    （正在构建的）
   ┌─────┐              ┌─────┐
   │ App │              │ App'│
   └─────┘              └─────┘

   流程：
   1. 基于 current 树克隆出 workInProgress 树
   2. 在 workInProgress 树上进行更新
   3. 更新完成后，交换指针：
      current = workInProgress
      workInProgress = old current
   4. 屏幕显示新的 current 树

   好处：
   - 更新过程中不影响当前显示
   - 可以随时丢弃 workInProgress 树（中断恢复）
   - 交替使用两棵树，减少内存分配
   ```

6. **可中断渲染的实现**
   ```javascript
   // 简化版的工作循环
   function workLoopConcurrent() {
     // 每次执行前检查是否应该让出
     while (workInProgress !== null && !shouldYield()) {
       performUnitOfWork(workInProgress);
     }
   }

   // shouldYield 的判断逻辑
   function shouldYield() {
     // 检查是否有更高优先级的任务
     // 检查是否已经工作了足够长时间（通常 5ms）
     // 如果浏览器需要处理用户输入/动画，返回 true
     return getCurrentTime() >= deadline;
   }

   // 调度器（Scheduler）的作用
   // - 使用 requestIdleCallback / MessageChannel 实现时间切片
   // - 不同更新有不同的优先级（Lane 模型）
   // - 高优先级任务可以打断低优先级任务
   ```

7. **优先级机制（Lane 模型）**
   ```
   React 18 使用 Lane（车道）模型表示优先级：

   SyncLane (最高)：        同步任务（如用户点击的直接结果）
   InputContinuousLane:     连续输入（如输入框打字）
   DefaultLane:             默认优先级（如 setState、fetch 完成）
   TransitionLane:          过渡更新（startTransition 标记的）
   IdleLane (最低):         空闲时执行（如预加载数据）

   调度策略：
   - 高优先级可以打断低优先级
   - 被打断的低优先级任务稍后重新执行
   - 同优先级按顺序执行
   ```

### 深度拓展：手写实现

#### 1. Fiber 节点完整数据结构定义

```javascript
// ==================== Fiber 节点完整数据结构 ====================
// 这是 React 内部 Fiber 节点的简化但完整的实现

function FiberNode(tag, pendingProps, key) {
  // ============ 实例属性（每个节点独立） ============

  // 1️⃣ 节点类型标记 - 决定这个 Fiber 代表什么
  this.tag = tag;  // 如: FunctionComponent=0, ClassComponent=1, HostRoot=3, HostComponent=5 等

  // 2️⃣ 节点唯一标识符
  this.key = key;           // React 的 key 属性，用于 Diff 算法复用判断
  this.type = null;         // 组件类型（函数/类组件）或 DOM 标签名（'div'/'span'）

  // 3️⃣ DOM 相关
  this.stateNode = null;    // 对应的真实 DOM 节点 或 组件实例（class component）

  // 4️⃣ Fiber 树结构指针（形成树形结构）
  this.return = null;       // 指向父节点（注意：不叫 parent，因为 return 是保留字）
  this.child = null;        // 指向第一个子节点
  this.sibling = null;      // 指向下一个兄弟节点
  this.index = 0;           // 在父节点的 children 数组中的索引位置

  // 5️⃣ Props 相关
  this.pendingProps = pendingProps;  // 新的 props（待处理）
  this.memoizedProps = null;        // 上一次渲染时使用的 props（用于判断是否更新）

  // 6️⃣ State/Hooks 相关
  this.memoizedState = null;        // 上一次渲染后的 state（函数组件指向 hooks 链表头）
  this.updateQueue = null;          // 更新队列（存放 setState 触发的更新）
  this.dependencies = null;         // context/lane 依赖（用于判断是否需要更新）

  // 7️⃣ 双缓存机制的核心字段
  this.alternate = null;            // 指向另一棵树中对应的 Fiber 节点（current ↔ workInProgress）

  // 8️⃣ 副作用标记（Side-Effects / Flags）
  this.flags = NoFlags;             // 当前节点的副作用标记（如：插入、更新、删除、ref）
  this.subtreeFlags = NoFlags;      // 子树的副作用标记（聚合了所有子孙节点的 flags）
  this.deletions = null;            // 需要删除的子节点数组

  // 9️⃣ Effect 链表（用于 commit 阶段遍历所有有副作用的节点）
  this.nextEffect = null;           // 单向链表：指向下一个有副作用的节点（单链表）
  this.firstEffect = null;          // 子树中第一个有副作用的节点
  this.lastEffect = null;           // 子树中最后一个有副作用的节点

  // 🔟 Lane 优先级相关（React 18）
  this.lanes = NoLanes;             // 当前节点涉及的更新优先级
  this.childLanes = NoLanes;        // 子树的更新优先级
}

// ==================== Tag 类型常量 ====================
const FunctionComponent = 0;       // 函数组件
const ClassComponent = 1;          // 类组件
const IndeterminateComponent = 2;  // 不确定类型（首次渲染时）
const HostRoot = 3;                // 根节点（FiberRoot 的直接子节点）
const HostPortal = 4;              // Portal
const HostComponent = 5;           // 原生 DOM 元素（div, span 等）
const HostText = 6;                // 文本节点
const Fragment = 7;                // React.Fragment
const Mode = 8;                    // StrictMode / ConcurrentMode
const ContextConsumer = 9;         // Context.Consumer
const ContextProvider = 10;        // Context.Provider
const ForwardRef = 11;             // React.forwardRef
const Profiler = 12;               // DevTools Profiler
const SuspenseComponent = 13;      // Suspense
const MemoComponent = 14;          // React.memo
const LazyComponent = 15;          // React.lazy
const OffscreenComponent = 23;     // Offscreen（隐藏/显示）

// ==================== Flags 副作用标记常量 ====================
const NoFlags = 0b00000000000000000000;
const Placement = 0b00000000000000000010;     // 插入 DOM
const Update = 0b00000000000000000100;        // 更新 props/state
const Deletion = 0b00000000000000001000;      // 删除 DOM
const ChildDeletion = 0b00000000000000010000; // 删除子节点
const Ref = 0b00000000000000100000;           // ref 变更
const Snapshot = 0b00000000000001000000;      // 快照（getSnapshotBeforeUpdate）
const Passive = 0b00000000000010000000;       // useEffect
const LayoutMask = 0b00000000000100000000;    // useLayoutEffect
const MountPassiveDevtools = 0b00001000000000000000;

console.log('✅ Fiber 节点数据结构定义完成');
```

#### 2. 从 JSX 构建 Fiber 树的过程

```javascript
// ==================== 从 JSX 创建 Fiber 树 ====================

/**
 * 将 JSX 元素转换为 Fiber 节点并构建 Fiber 树
 * 模拟 React 的 reconcile 过程
 */

// 示例 JSX 结构：
// <App>
//   <Header />
//   <Main>
//     <Sidebar />
//     <Content>
//       <Item /> <Item /> <Item />
//     </Content>
//   </Main>
//   <Footer />
// </App>

/**
 * 步骤 1: 将 JSX 转换为 Element 对象（简化版 createElement）
 */
function createElement(type, config, ...children) {
  const props = { ...config };

  if (children.length === 1) {
    props.children = children[0];
  } else if (children.length > 1) {
    props.children = children;
  }

  // 提取 key 和 ref
  const key = props.key || null;
  delete props.key;
  const ref = props.ref || null;
  delete props.ref;

  return { type, props, key, ref };
}

/**
 * 步骤 2: 根据 Element 创建 Fiber 节点
 */
function createFiberFromElement(element) {
  const { type, key, props } = element;

  // 判断节点类型
  let tag;
  if (typeof type === 'function') {
    tag = typeof type.prototype?.render === 'function'
      ? ClassComponent   // 类组件
      : FunctionComponent; // 函数组件
  } else if (typeof type === 'string') {
    tag = HostComponent;  // DOM 元素
  } else if (type === Symbol.for('react.fragment')) {
    tag = Fragment;
  }

  // 创建 Fiber 节点
  const fiber = new FiberNode(tag, props, key);
  fiber.type = type;

  console.log(`🔨 创建 Fiber 节点: ${type.name || type}`, { tag, key });

  return fiber;
}

/**
 * 步骤 3: 协调子元素，建立 child/sibling 关系
 * 这是最关键的一步！将扁平的 children 数组转换为 Fiber 树结构
 */
function reconcileChildren(returnFiber, newChildren) {
  // 如果没有子节点，直接返回
  if (!newChildren || (Array.isArray(newChildren) && newChildren.length === 0)) {
    returnFiber.child = null;
    return;
  }

  // 处理单个子节点的情况
  if (!Array.isArray(newChildren)) {
    const childFiber = createChildFiber(returnFiber, newChildren);
    childFiber.return = returnFiber;
    returnFiber.child = childFiber;
    return;
  }

  // 处理多个子节点的情况
  // ⭐ 核心：将数组转换为链表结构（child → sibling → sibling...）
  let previousSibling = null;
  let firstChildFiber = null;

  for (let i = 0; i < newChildren.length; i++) {
    const childElement = newChildren[i];

    // 跳过 null/undefined/false（React 会忽略这些）
    if (!childElement && childElement !== 0) continue;

    // 为每个子元素创建 Fiber
    const childFiber = createChildFiber(returnFiber, childElement);

    // 设置在父节点中的索引
    childFiber.index = i;
    childFiber.return = returnFiber;

    // 建立 sibling 链表关系
    if (previousSibling === null) {
      // 第一个子节点
      firstChildFiber = childFiber;
    } else {
      // 后续子节点作为前一个节点的 sibling
      previousSibling.sibling = childFiber;
    }
    previousSibling = childFiber;
  }

  // 将第一个子节点挂载到父节点的 child 属性
  returnFiber.child = firstChildFiber;
}

/**
 * 辅助函数：创建子 Fiber 节点
 */
function createChildFiber(returnFiber, element) {
  // 处理文本节点
  if (typeof element === 'string' || typeof element === 'number') {
    const textFiber = new FiberNode(HostText, null, null);
    textFiber.stateNode = String(element);
    textFiber.memoizedProps = String(element);
    return textFiber;
  }

  // 处理普通元素/组件
  return createFiberFromElement(element);
}

/**
 * 步骤 4: 完整的 Fiber 树构建示例
 */
function buildFiberTree(rootElement) {
  console.log('🌳 开始构建 Fiber 树...\n');

  // 1. 创建根 Fiber 节点（HostRoot）
  const rootFiber = new FiberNode(HostRoot, null, null);
  rootFiber.stateNode = { containerInfo: document.getElementById('root') };

  console.log('📍 创建根节点 (HostRoot)', rootFiber);

  // 2. 递归构建整个 Fiber 树
  function processElement(element, parentFiber) {
    // 创建当前元素的 Fiber 节点
    const fiber = createFiberFromElement(element);
    fiber.return = parentFiber;

    // 如果是 DOM 节点或组件，创建 stateNode
    if (fiber.tag === HostComponent) {
      fiber.stateNode = document.createElement(fiber.type);  // 创建真实 DOM
    }

    // 递归处理子节点
    if (element.props && element.props.children) {
      const children = Array.isArray(element.props.children)
        ? element.props.children
        : [element.props.children];

      reconcileChildren(fiber, children);
    }

    return fiber;
  }

  // 3. 从根元素开始构建
  const appFiber = processElement(rootElement, rootFiber);
  rootFiber.child = appFiber;

  console.log('\n✅ Fiber 树构建完成！');
  printFiberTree(rootFiber, 0);

  return rootFiber;
}

/**
 * 打印 Fiber 树结构（辅助调试）
 */
function printFiberTree(fiber, depth) {
  const indent = '  '.repeat(depth);
  const typeName = typeof fiber.type === 'function'
    ? fiber.type.name
    : fiber.type || (fiber.tag === HostRoot ? 'ROOT' : 'TEXT');

  console.log(`${indent}├─ [${typeName}] tag=${fiber.tag}, key=${fiber.key}`);

  // 先遍历 child
  if (fiber.child) {
    printFiberTree(fiber.child, depth + 1);
  }

  // 再遍历 sibling
  if (fiber.sibling) {
    printFiberTree(fiber.sibling, depth);
  }
}
```

#### 3. 双缓存切换过程（Double Buffering）

```javascript
// ==================== 双缓存机制（核心原理）====================

/**
 * React 使用双缓存技术来实现可中断渲染
 * 两棵树交替使用，避免频繁创建/销毁
 *
 * currentTree: 当前屏幕上显示的 Fiber 树（稳定不变）
 * workInProgressTree: 正在构建中的 Fiber 树（可以随时丢弃）
 */

// 全局变量：两棵树的根节点引用
let currentRoot = null;        // 当前树根（屏幕显示的）
let workInProgressRoot = null; // 工作中树根（正在构建的）

/**
 * 🔄 完整的双缓存切换流程
 */
function performSyncWorkOnRoot(root) {
  console.log('\n🔄 开始双缓存切换流程');

  // ========== 第 1 步：创建 workInProgress 树 ==========
  // 从 current 树克隆一份作为工作副本
  const current = root.current;  // 当前的 Fiber 根节点
  const workInProgress = current.alternate
    ? prepareWorkInProgress(current)  // 如果已有 alternate，复用并重置
    : createWorkInProgress(current);  // 首次渲染，创建全新的 alternate

  workInProgressRoot = workInProgress;
  console.log('📋 Step 1: 创建 workInProgress 树', {
    hasAlternate: !!current.alternate,
    workInProgressTag: workInProgress.tag,
  });

  // ========== 第 2 步：在工作树上进行协调和渲染 ==========
  // 在 workInProgress 树上执行 render 阶段（可中断）
  workLoopSync(workInProgress);
  console.log('📋 Step 2: 完成 render 阶段（workInProgress 树已就绪）');

  // ========== 第 3 步：提交更新到 DOM（commit 阶段）==========
  // 这个阶段不可中断，会直接操作真实 DOM
  commitRoot(workInProgress);
  console.log('📋 Step 3: 完成 commit 阶段（DOM 已更新）');

  // ========== 第 4 步：交换双缓存指针 ==========
  // 最关键的一步！将 workInProgress 变成新的 current
  root.current = workInProgress;  // 🎯 屏幕现在显示 workInProgress 树

  // 更新全局引用
  currentRoot = workInProgress;
  console.log('📋 Step 4: ✅ 双缓存切换完成！');
  console.log(`   currentRoot 现在指向之前的 workInProgress 树`);
  console.log(`   下次更新时，会基于这棵新树创建新的 workInProgress`);

  // ========== 第 5 步：清理旧树 ==========
  // 旧的 current 树现在变成了 alternate（备用）
  // 可以在下一次更新时复用，避免重复创建
}

/**
 * 创建 workInProgress Fiber（clone Fiber 节点）
 */
function createWorkInProgress(current) {
  // 创建一个新的 Fiber 节点，复用 current 的基本信息
  const workInProgress = new FiberNode(
    current.tag,
    current.pendingProps,
    current.key
  );

  // 复制基本属性
  workInProgress.type = current.type;
  workInProgress.stateNode = current.stateNode;  // 共享同一个 DOM 节点！

  // ⭐⭐⭐ 建立双向引用（双缓存的核心）⭐⭐⭐
  workInProgress.alternate = current;  // 新节点 → 旧节点
  current.alternate = workInProgress;   // 旧节点 → 新节点

  // 复用上一次的状态（避免重新计算）
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;

  // 复制树结构指针
  workInProgress.return = current.return;
  workInProgress.child = current.child;
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.flags = NoFlags;  // 重置副作用标记
  workInProgress.subtreeFlags = NoFlags;
  workInProgress.deletions = null;

  // 复制 lane 信息
  workInProgress.lanes = current.lanes;
  workInProgress.childLanes = current.childLanes;

  return workInProgress;
}

/**
 * 准备复用已有的 workInProgress（非首次渲染）
 */
function prepareWorkInProgress(current) {
  // 取出之前创建的 alternate（就是上一轮的 workInProgress）
  const workInProgress = current.alternate;

  // 重置状态，准备新一轮的更新
  workInProgress.flags = NoFlags;
  workInProgress.subtreeFlags = NoFlags;
  workInProgress.deletions = null;

  // 重置副作用链表
  workInProgress.nextEffect = null;
  workInProgress.firstEffect = null;
  workInProgress.lastEffect = null;

  // 更新 pendingProps（可能有了新的 props）
  workInProgress.pendingProps = current.pendingProps;

  return workInProgress;
}

/**
 * 工作循环（render 阶段的调度器）
 */
function workLoopSync(workInProgress) {
  while (workInProgress !== null) {
    // 执行单个工作单元（beginWork + completeWork）
    workInProgress = performUnitOfWork(workInProgress);
  }
}

/**
 * 执行单个工作单元
 */
function performUnitOfWork(fiber) {
  // beginWork: 处理当前节点（协调子节点、Diff、打标记）
  const next = beginWork(fiber);

  if (next === null) {
    // 没有子节点了，执行 completeWork 并返回 sibling
    return completeUnitOfWork(fiber);
  }

  // 有子节点，继续深度优先遍历
  return next;
}

function beginWork(fiber) {
  console.log(`  🔧 beginWork: ${fiber.type?.name || fiber.type}`);

  // 根据不同的 tag 执行不同的协调逻辑
  switch (fiber.tag) {
    case FunctionComponent:
      return updateFunctionComponent(fiber);
    case HostComponent:
      return updateHostComponent(fiber);
    case HostRoot:
      return updateHostRoot(fiber);
    default:
      return null;
  }
}

function updateFunctionComponent(fiber) {
  // 执行组件函数，获取 JSX
  const Component = fiber.type;
  const props = fiber.pendingProps;
  const children = Component(props);

  // 协调子节点（创建/复用 Fiber）
  reconcileChildren(fiber, children);

  // 返回第一个子节点（继续深度优先遍历）
  return fiber.child;
}

function completeUnitOfWork(fiber) {
  console.log(`  ✅ completeWork: ${fiber.type?.name || fiber.type}`);

  // 如果有兄弟节点，返回兄弟节点继续处理
  if (fiber.sibling) {
    return fiber.sibling;
  }

  // 没有兄弟节点了，返回父节点（回溯）
  return fiber.return;
}

/**
 * Commit 阶段（不可中断）
 */
function commitRoot(finishedWork) {
  console.log('\n🎬 进入 Commit 阶段（不可中断）');

  // 三阶段提交：
  // 1. Before Mutation（DOM 变更前）- 读取 DOM 状态、调用 getSnapshotBeforeUpdate
  commitBeforeMutationEffects(finishedWork);

  // 2. Mutation（DOM 变更）- 插入、更新、删除 DOM 节点
  commitMutationEffects(finishedWork);

  // 3. Layout（DOM 变更后）- 调用 useEffect/useLayoutEffect、ref 回调
  commitLayoutEffects(finishedWork);
}

// ==================== 示例使用 ====================
function demoDoubleBuffering() {
  console.log('\n'.repeat(2));
  console.log('=' .repeat(60));
  console.log('🎯 双缓存机制演示');
  console.log('='.repeat(60));

  // 模拟初始渲染
  const mockRoot = {
    current: new FiberNode(HostRoot, null, null),
  };
  mockRoot.current.stateNode = { containerInfo: '#root' };

  console.log('\n📍 初始状态:');
  console.log('  currentRoot:', mockRoot.current);
  console.log('  alternate:', mockRoot.current.alternate);

  // 第一次渲染
  performSyncWorkOnRoot(mockRoot);

  console.log('\n📍 渲染后状态:');
  console.log('  currentRoot 已切换到 workInProgress 树');
  console.log('  旧的 current 树保存在 alternate 中');
  console.log('  下次更新将基于新的 current 树创建新的 workInProgress');
}

// 运行演示
demoDoubleBuffering();
```

#### 4. Fiber 树完整结构的 ASCII 图

```
═══════════════════════════════════════════════════════════════
                    Fiber 树完整结构图
═══════════════════════════════════════════════════════════════

对应 JSX 结构:
┌──────────────────────────────────────────────────────────────┐
│  <App>                                                       │
│    <Header title="首页" />                                   │
│    <Main>                                                    │
│      <Sidebar items={menu} />                                │
│      <Content>                                               │
│        <ListItem key="1" text="项目1" />                     │
│        <ListItem key="2" text="项目2" />                     │
│        <ListItem key="3" text="项目3" />                     │
│      </Content>                                              │
│    </Main>                                                   │
│    <Footer copyright="2024" />                                │
│  </App>                                                      │
└──────────────────────────────────────────────────────────────┘
═══════════════════════════════════════════════════════════════
                         CURRENT TREE（当前显示的树）
═══════════════════════════════════════════════════════════════

                          ┌─────────────┐
                          │  ROOT (tag=3) │ ← HostRoot
                          │  key=null    │
                          └──────┬──────┘
                                 │
                                 ▼ (child)
                          ┌─────────────┐
                          │  App (tag=0)  │ ← FunctionComponent
                          │  key=null    │
                          │  stateNode=  │ ← null (函数组件无实例)
                          │    undefined  │
                          └──────┬──────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼ (child)                 │ (sibling)
          ┌─────────────┐             ┌─────────────┐
          │ Header (tag=0)│            │ Main (tag=0)  │
          │ key=null    │             │ key=null    │
          └──────┬──────┘             └──────┬──────┘
                 │                           │
                 ▼ (child)                   ├────────────┐
          ┌─────────────┐             ▼ (child)    │ (sibling)
          │ "首页"(tag=6)│      ┌─────────────┐ ┌─────────────┐
          │ (HostText)   │      │ Sidebar(tag=0)│ │ Content(tag=0)│
          └─────────────┘      └──────┬──────┘ └──────┬──────┘
                                      │                │
                                      ▼ (child)        ▼ (child)
                               ┌─────────────┐  ┌─────────────┐
                               │ menu[0](tag=6)│  │ Item1(tag=0) │
                               │ (HostText)   │  │ key="1"     │
                               └─────────────┘  └──────┬──────┘
                                                        │
                                          ┌─────────────┼─────────────┐
                                          ▼ (child)     │ (sibling)   ▼ (sibling)
                                   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
                                   │"项目1"(tag=6)│ │ Item2(tag=0) │ │ Item3(tag=0) │
                                   │ (HostText)   │ │ key="2"     │ │ key="3"     │
                                   └─────────────┘ └──────┬──────┘ └──────┬──────┘
                                                  │ (child)    │ (child)
                                                  ▼            ▼
                                           ┌─────────────┐ ┌─────────────┐
                                           │"项目2"(tag=6)│ │"项目3"(tag=6)│
                                           │ (HostText)   │ │ (HostText)   │
                                           └─────────────┘ └─────────────┘
═══════════════════════════════════════════════════════════════
                      WORK IN PROGRESS TREE（工作中树）
═══════════════════════════════════════════════════════════════

  （结构与 Current Tree 相同，但是独立的对象实例）
  （正在此树上进行协调和更新，不影响 Current Tree 的显示）

  ┌─────────────────────────────────────────────────────────┐
  │                                                         │
  │   每个 WIP 节点都通过 .alternate 字段                   │
  │   指向 Current Tree 中对应的节点                        │
  │                                                         │
  │   例如：                                                │
  │   WIP_App.alternate ─────────────────→ Current_App     │
  │   Current_App.alternate ─────────────→ WIP_App         │
  │                                                         │
  │   这种双向引用实现了双缓存！                             │
  └─────────────────────────────────────────────────────────┘
═══════════════════════════════════════════════════════════════
                    关键字段说明（以 App 节点为例）
═══════════════════════════════════════════════════════════════

  ┌─────────────────────────────────────────────────────────────┐
  │  FiberNode: App                                            │
  ├─────────────────────────────────────────────────────────────┤
  │                                                             │
  │  【标识信息】                                                │
  │  ├── tag = 0 (FunctionComponent)                            │
  │  ├── type = function App() {...}                            │
  │  └── key = null                                             │
  │                                                             │
  │  【树结构】                                                  │
  │  ├── return → ROOT (父节点)                                  │
  │  ├── child → Header (第一个子节点)                           │
  │  ├── sibling → null (App 是独生子)                           │
  │  └── index = 0 (在 ROOT 的 children 中排第 0 位)             │
  │                                                             │
  │  【状态】                                                    │
  │  ├── stateNode = undefined (函数组件无实例)                  │
  │  ├── memoizedProps = { children: [...] }                    │
  │  ├── memoizedState → Hook1 → Hook2 → ... (hooks 链表)       │
  │  └── updateQueue = null (暂无待处理的 setState)              │
  │                                                             │
  │  【双缓存】                                                  │
  │  └── alternate → WorkInProgress_App (对应的工作树节点)       │
  │                                                             │
  │  【副作用】                                                  │
  │  ├── flags = 0 (无副作用)                                    │
  │  ├── subtreeFlags = 0 (子树无副作用)                         │
  │  ├── deletions = null                                       │
  │  └── lanes = 0 (无待处理更新)                                │
  │                                                             │
  └─────────────────────────────────────────────────────────────┘
═══════════════════════════════════════════════════════════════
                    SIBLING 链表示意图（重要！）
═══════════════════════════════════════════════════════════════

  Main 节点的子节点通过 sibling 形成链表：

  Content (child)
      │
      ▼
  ┌────────┐   sibling   ┌────────┐   sibling   ┌────────┐
  │ Item1  │ ──────────→ │ Item2  │ ──────────→ │ Item3  │
  │key="1" │             │key="2" │             │key="3" │
  └────────┘             └────────┘             └───┬────┘
                                                     │
                                                 sibling = null
                                                    (最后一个)

  这样设计的好处：
  ✓ 只需要 O(1) 就能找到下一个兄弟
  ✓ 避免数组操作的性能开销
  ✓ 方便进行列表 Diff（只需遍历链表）
═══════════════════════════════════════════════════════════════
                    EFFECT 链表（Commit 阶段使用）
═══════════════════════════════════════════════════════════════

  Commit 阶段不会遍历整棵树，而是只遍历有副作用的节点：

  Root.firstEffect ──→ Header (flags=Placement)
                        │
                        ▼ nextEffect
                     Item1 (flags=Placement)
                        │
                        ▼ nextEffect
                     Item2 (flags=Placement)
                        │
                        ▼ nextEffect
                     Item3 (flags=Placement)

  效果：跳过所有不需要更新的节点，O(副作用数量) 而非 O(总节点数)
═══════════════════════════════════════════════════════════════
                    双缓存切换时间线
═══════════════════════════════════════════════════════════════

  时间轴 →

  ┌──────────┐     ┌──────────────────┐     ┌──────────┐
  │ 显示 A   │ ──→ │ 构建树 B (WIP)   │ ──→ │ 显示 B   │
  │(current) │     │ (可中断/可恢复)   │     │(current) │
  └──────────┘     └──────────────────┘     └──────────┘
       ↑                  ↑                       ↑
       │                  │                       │
  current=A         workInProgress=B          current=B
  alternate=null     alternate=A             alternate=A
  (首次渲染)         (双向链接)              (A 可复用)

  下次更新：
  ┌──────────┐     ┌──────────────────┐     ┌──────────┐
  │ 显示 B   │ ──→ │ 构建树 C (WIP)   │ ──→ │ 显示 C   │
  │(current) │     │ 基于 B 创建      │     │(current) │
  └──────────┘     └──────────────────┘     └──────────┘
       ↑                  ↑                       ↑
  current=B         workInProgress=C          current=C
  alternate=A        alternate=B              alternate=B
  (复用 A 作为 WIP)  (基于 B clone)           (B 可复用)
═══════════════════════════════════════════════════════════════
```

### 🔍 追问链
1. **Fiber 架构解决了 Stack Reconciler 的什么问题？具体是什么场景下会卡顿？**
   → 方向：Stack Reconciler 递归遍历不可中断，大组件树一次更新占用主线程太久（>16ms）→ 掉帧；Fiber 可中断/恢复
2. **时间切片 Time Slicing 的最小单位是什么？requestIdleCallback 怎么配合工作？**
   → 方向：一个 Fiber 节点的处理是最小单位；Scheduler 用 rIC 在每帧空闲时间执行 workLoop
3. **current 树和 workInProgress 树同时存在于内存中，内存开销怎么办？**
   → 方向：双缓存确实增加约 2x 内存；但 Fiber 节点是轻量的（相比真实 DOM），且 GC 会及时回收旧节点

---

## Q30: 请详细解释 React 的 Diff 算法（Reconciliation）。它是如何实现 O(n) 复杂度的？

- **难度**：★★☆
- **知识点**：Diff 算法 / Reconciliation / 性能优化
- **题型**：算法原理题

### 参考答案要点：

1. **Diff 算法的三大策略**
   ```
   策略 1：只对同层节点进行比较（Tree Level）
   ┌───┐     ┌───┐
   │ A │     │ A │  ← 比较 A
   └─┬─┘     └─┬─┘
     │         │
   ┌─┴─┐     ┌─┴─┐
   │ B │     │ B │  ← 比较 B
   └───┘     └─┬─┘
               │
           ┌───┴───┐
           │ C   D  │  ← 不跨层比较！
           └───────┘

   策略 2：拥有不同类型的元素会产生不同的树（Component Level）
   策略 3：开发者可以通过 key 来暗示哪些子元素是稳定的（Element Level）
   ```

2. **Diff 的四种操作类型**
   ```javascript
   // 对比新旧虚拟 DOM 后，可能的操作：
   const Placement = /*     */ 0b00000000000100;  // 插入/移动
   const Update = /*        */ 0b00000000001000;  // 更新
   const Deletion = /*      */ 0b00000000010000;  // 删除
   ```

3. **同层比较的详细过程**

   **情况 1：节点类型不同**
   ```jsx
   // 旧：<div>...</div>
   // 新：<span>...</span>
   // → 销毁旧节点及其子树，创建新节点
   // → 不继续比较子节点（策略 2）
   ```

   **情况 2：节点类型相同（DOM 元素）**
   ```jsx
   // 旧：<div className="old">Hello</div>
   // 新：<div className="new">World</div>
   // → 复用 DOM 节点，只更新变化的属性
   // → 继续递归比较子节点
   ```

   **情况 3：节点类型相同（组件）**
   ```jsx
   // 旧：<UserProfile userId={1} />
   // 新：<UserProfile userId={2} />
   // → 组件实例保持不变
   // → 更新 props，触发组件重新渲染
   // → 继续比较组件返回的新虚拟 DOM
   ```

   **情况 4：列表渲染（最复杂的情况）**
   ```jsx
   // 旧：[A, B, C, D]
   // 新：[A, C, B, D]

   // 没有 key（或都用 index）：
   // → 就地比较：A=A ✓, B→C(更新), C→B(更新), D=D ✓
   // → 结果：2 次不必要的更新

   // 有正确的 key：
   // → A(key=a) 匹配 ✓
   // → C(key=c) 需要移动（从位置 2 → 位置 1）
   // → B(key=b) 需要移动（从位置 1 → 位置 2）
   // → D(key=d) 匹配 ✓
   // → 结果：2 次移动（DOM 操作更少）
   ```

4. **列表 Diff 的算法优化（O(n) 实现）**
   ```javascript
   // React 使用了多轮遍历的策略来优化列表 Diff：

   // 第一轮：从头开始匹配（处理前置不变节点）
   // 旧：[A, B, C, D, E]
   // 新：[A, B, X, Y, E]
   // → A, B 匹配，C 不匹配，停止

   // 第二轮：从尾部开始匹配（处理后置不变节点）
   // 旧剩余：[C, D, E]
   // 新剩余：[X, Y, E]
   // → E 匹配，D 不匹配，停止

   // 第三轮：处理只剩新节点的情况（全是插入）
   // 第四轮：处理只剩旧节点的情况（全是删除）
   // 第五轮：处理都有节点的情况（最复杂，使用 key 映射）
   function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren) {
     // 使用 Map 建立 key → oldFiber 的映射
     // 然后遍历新 children，从 map 中查找匹配的旧 fiber
     // 最终得到需要 插入/移动/删除/更新 的节点列表
   }
   ```

5. **key 在 Diff 中的关键角色**
   ```
   key 的作用：
   1. 身份标识：帮助 React 识别节点是否相同
   2. 复用决策：相同 key 的节点会被复用（而不是销毁重建）
   3. 状态保持：复用节点时保留组件内部状态（如输入框内容）

   示例：
   旧: [<Input key="a" />, <Input key="b" />]  // 用户在 a 中输入了 "hello"
   新: [<Input key="b" />, <Input key="a" />]  // 顺序交换

   有 key：
   - key="a" 的 Input 被移动，状态 "hello" 保持 ✓
   - key="b" 的 Input 被移动

   无 key（用 index）：
   - 认为 index=0 变了（更新 props），index=1 变了
   - 状态丢失 ✗
   ```

6. **O(n) 复杂度的实现方式**
   ```
   传统 Diff 算法（如虚拟 DOM 库 diff）：O(n³)
   - 树形结构对比本身是 O(n³)
   - 对每个节点都要遍历旧树找匹配

   React 的优化策略将复杂度降至 O(n)：
   1. 只比较同层节点 → 排除跨层比较（O(n²)→O(n)）
   2. 不同类型直接替换，不比较子树 → 剪枝
   3. 使用 key 进行 Map 查找 → O(1) 匹配
   4. 只遍历一次 → 单次遍历

   代价：
   - 开发者需要正确使用 key（跨层移动不会被检测到）
   - 但这是可接受的工程权衡
   ```

### 深度拓展：手写实现

#### 完整的 reconcileChildrenArray 函数（5 轮 Diff 算法）

```javascript
// ==================== 完整的列表 Diff 算法实现 ====================
/**
 * React 的 reconcileChildrenArray 是整个 Diff 算法的核心
 * 通过 5 轮遍历实现 O(n) 复杂度的列表对比
 *
 * @param {Fiber} returnFiber - 父 Fiber 节点
 * @param {Fiber|null} currentFirstChild - 当前树的第一个子 Fiber（旧节点链表头）
 * @param {Array} newChildren - 新的子元素数组（JSX 元素）
 * @returns {Fiber|null} 返回新的第一个子 Fiber
 */

function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren) {
  console.log('\n🔄 开始 reconcileChildrenArray');
  console.log('旧 children:', getFiberKeys(currentFirstChild));
  console.log('新 children:', newChildren.map(c => c.key || c.type));

  // ========== 辅助函数：将旧 Fiber 链表转换为数组 ==========
  // 因为旧 children 是通过 sibling 链接的单向链表
  function fiberToArray(firstChild) {
    const result = [];
    let node = firstChild;
    while (node !== null) {
      result.push(node);
      node = node.sibling;
    }
    return result;
  }

  // ========== 初始化变量 ==========
  // 旧的 Fiber 节点数组（从链表转换）
  const existingChildren = fiberToArray(currentFirstChild);
  let newIdx = 0;              // 新数组的当前索引
  let oldIdx = 0;              // 旧数组的当前索引
  let oldFiber = existingChildren[oldIdx];  // 当前的旧 Fiber
  let prevNewFiber = null;     // 上一个新创建的 Fiber（用于建立 sibling 链）
  let resultingFirstChild = null;  // 最终返回的第一个子 Fiber

  // ════════════════════════════════════════════════════════
  // 📍 第一轮遍历：从头开始匹配前置相同节点
  // ════════════════════════════════════════════════════════
  console.log('\n📌 第一轮：从前置位置匹配相同节点');

  for (
    ;
    newIdx < newChildren.length && oldIdx < existingChildren.length;
    newIdx++, oldIdx++
  ) {
    const newChild = newChildren[newIdx];
    oldFiber = existingChildren[oldIdx];

    // 检查 key 和 type 是否都相同
    if (oldFiber.key === (newChild.key ?? null) && oldFiber.type === newChild.type) {
      // ✅ 匹配成功！复用旧 Fiber
      console.log(`  ✅ 匹配 [${newIdx}]: key="${newChild.key}", type=${newChild.type?.name || newChild.type}`);

      const newFiber = updateSlot(returnFiber, oldFiber, newChild);

      // 建立 sibling 链表关系
      if (prevNewFiber === null) {
        resultingFirstChild = newFiber;  // 第一个子节点
      } else {
        prevNewFiber.sibling = newFiber;  // 后续节点挂到前一个的 sibling 上
      }
      prevNewFiber = newFiber;
    } else {
      // ❌ 不匹配，停止第一轮遍历
      console.log(`  ❌ 不匹配 [${newIdx}]: 停止第一轮`);
      break;
    }
  }

  // 记录第一轮处理后的位置
  const firstUnprocessedOldIdx = oldIdx;   // 第一轮后旧数组未处理的起始位置
  const firstUnprocessedNewIdx = newIdx;   // 第一轮后新数组未处理的起始位置

  console.log(`  第一轮结果: 处理了 ${firstUnprocessedOldIdx} 个前置相同节点`);

  // ════════════════════════════════════════════════════════
  // 📍 第二轮遍历：从尾部匹配后置相同节点
  // ════════════════════════════════════════════════════════
  console.log('\n📌 第二轮：从后置位置匹配相同节点');

  let newLastIdx = newChildren.length - 1;
  let oldLastIdx = existingChildren.length - 1;

  for (
    ;
    newLastIdx >= firstUnprocessedNewIdx &&
    oldLastIdx >= firstUnprocessedOldIdx &&
    newLastIdx >= newIdx;  // 确保不与第一轮重叠
    newLastIdx--, oldLastIdx--
  ) {
    const newChild = newChildren[newLastIdx];
    const lastOldFiber = existingChildren[oldLastIdx];

    // 检查 key 和 type 是否都相同
    if (lastOldFiber.key === (newChild.key ?? null) && lastOldFiber.type === newChild.type) {
      // ✅ 尾部匹配成功！
      console.log(`  ✅ 尾部匹配 [${newLastIdx}]: key="${newChild.key}"`);

      const newFiber = updateSlot(returnFiber, lastOldFiber, newChild);

      // 标记为需要移动（因为位置可能变了）
      markPlacement(newFiber, newLastIdx);

      // 注意：尾部匹配的节点暂时存起来，后面再链接到链表中
      // 这里简化处理，实际 React 会更复杂
    } else {
      // ❌ 不匹配，停止第二轮遍历
      console.log(`  ❌ 尾部不匹配: 停止第二轮`);
      break;
    }
  }

  // 记录第二轮处理后的位置
  const lastUnprocessedOldIdx = oldLastIdx + 1;  // 第二轮后旧数组未处理的结束位置+1
  const lastUnprocessedNewIdx = newLastIdx + 1;  // 第二轮后新数组未处理的结束位置+1

  console.log(`  第二轮结果: 从尾部又匹配了 ${existingChildren.length - lastUnprocessedOldIdx} 个节点`);

  // ════════════════════════════════════════════════════════
  // 📍 第三轮：处理只剩新节点的情况（全是插入）
  // ════════════════════════════════════════════════════════
  if (newIdx > newChildren.length - 1) {
    // 所有新节点都已处理完毕，但还有旧节点未处理 → 全是删除
    console.log('\n📌 第三轮：只剩旧节点 → 全部标记删除');

    for (let i = firstUnprocessedOldIdx; i <= lastUnprocessedOldIdx - 1; i++) {
      const oldFiberToDelete = existingChildren[i];
      console.log(`  🗑️ 删除旧节点: key="${oldFiberToDelete.key}"`);
      markDeletion(returnFiber, oldFiberToDelete);
    }

    return resultingFirstChild;
  }

  if (oldIdx > existingChildren.length - 1) {
    // 所有旧节点都已处理完毕，但还有新节点未处理 → 全是插入
    console.log('\n📌 第三轮：只剩新节点 → 全部创建并插入');

    for (; newIdx < newChildren.length; newIdx++) {
      const newChild = newChildren[newIdx];
      console.log(`  ➕ 插入新节点 [${newIdx}]: key="${newChild.key}"`);

      const newFiber = createChild(returnFiber, newChild);
      newFiber.flags |= Placement;  // 标记为需要插入 DOM

      if (prevNewFiber === null) {
        resultingFirstChild = newFiber;
      } else {
        prevNewFiber.sibling = newFiber;
      }
      prevNewFiber = newFiber;
    }

    return resultingFirstChild;
  }

  // ════════════════════════════════════════════════════════
  // 📍 第四轮 & 第五轮：新旧都有剩余节点（最复杂的情况）
  // 使用 Key 映射 + 最长递增子序列优化
  // ════════════════════════════════════════════════════════
  console.log('\n📌 第四、五轮：新旧都有节点 → 使用 Map + LIS 优化');

  // Step 1: 将剩余的旧 Fiber 放入 Map（key → oldFiber）
  const existingChildrenMap = new Map();
  for (let i = firstUnprocessedOldIdx; i < lastUnprocessedOldIdx; i++) {
    const oldFiber = existingChildren[i];
    if (oldFiber.key !== null) {
      existingChildrenMap.set(oldFiber.key, oldFiber);  // 用 key 作为索引
    } else {
      // 没有 key 的情况（使用 index）
      existingChildrenMap.set(i, oldFiber);
    }
  }

  console.log(`  创建了 Key-Map，包含 ${existingChildrenMap.size} 个旧节点`);

  // Step 2: 遍历新的中间部分，从 Map 中查找可复用的旧 Fiber
  // 同时记录每个新节点在旧数组中的位置（用于计算最长递增子序列）
  const newChildrenMiddle = [];
  const positionsInOldArray = [];  // 每个新节点在旧数组中的索引位置

  for (let i = firstUnprocessedNewIdx; i < lastUnprocessedNewIdx; i++) {
    const newChild = newChildren[i];
    const key = newChild.key ?? null;

    // 🔍 从 Map 中查找匹配的旧 Fiber
    let matchedOldFiber = existingChildrenMap.get(key);

    if (matchedOldFiber !== undefined) {
      // ✅ 找到了可复用的旧 Fiber
      console.log(`  🔍 找到匹配: key="${key}" → 复用旧 Fiber`);

      // 从 Map 中移除（防止重复使用）
      existingChildrenMap.delete(key);

      // 更新旧 Fiber 为新 Fiber（复用）
      const newFiber = updateSlot(returnFiber, matchedOldFiber, newChild);

      // 记录这个新节点对应的旧位置
      positionsInOldArray.push({
        newFiber,
        oldIndex: existingChildren.indexOf(matchedOldFiber),
        newIndex: i,
      });

      newChildrenMiddle.push(newFiber);
    } else {
      // ❌ 没找到匹配 → 这是一个全新的节点，需要创建
      console.log(`  🔍 未找到匹配: key="${key}" → 创建新 Fiber`);

      const newFiber = createChild(returnFiber, newChild);
      newFiber.flags |= Placement;

      positionsInOldArray.push({
        newFiber,
        oldIndex: -1,  // -1 表示是新节点
        newIndex: i,
      });

      newChildrenMiddle.push(newFiber);
    }
  }

  // Step 3: Map 中剩下的旧 Fiber 都是需要删除的
  console.log(`\n  🗑️ Map 中剩余 ${existingChildrenMap.size} 个旧节点需要删除`);
  existingChildrenMap.forEach((oldFiberToDelete, key) => {
    console.log(`    删除: key="${key}"`);
    markDeletion(returnFiber, oldFiberToDelete);
  });

  // Step 4: ⭐⭐⭐ 最长递增子序列（LIS）优化 ⭐⭐⭐
  // 目标：找出哪些节点不需要移动，只移动最少的节点
  if (positionsInOldArray.length > 0) {
    console.log('\n  ⭐ 计算 LIS（最长递增子序列）以最小化 DOM 移动次数');

    // 提取旧位置的索引数组
    const oldIndices = positionsInOldArray.map(p => p.oldIndex);

    // 计算最长递增子序列
    const lis = getLongestIncreasingSubsequence(oldIndices);
    console.log(`    旧位置数组: [${oldIndices.join(', ')}]`);
    console.log(`    LIS 结果: [${lis.join(', ')}]`);
    console.log(`    LIS 长度: ${lis.length}`);

    // Step 5: 根据 LIS 决定哪些节点需要移动
    let lisIndex = 0;  // LIS 数组的当前位置（从后往前遍历）

    // 从后往前遍历（这样移动时不会影响前面的位置）
    for (let i = positionsInOldArray.length - 1; i >= 0; i--) {
      const position = positionsInOldArray[i];
      const newFiber = position.newFiber;

      if (position.oldIndex === -1) {
        // 新节点，标记为插入
        newFiber.flags |= Placement;
        console.log(`    ➕ [${position.newIndex}] 新节点，需要插入`);
      } else if (i === lis[lisIndex]) {
        // 这个节点在 LIS 中，说明它不需要移动！
        // 但仍可能需要更新 props/state
        lisIndex++;
        console.log(`    ✓ [${position.newIndex}] 在 LIS 中，无需移动`);
      } else {
        // 不在 LIS 中，需要移动
        newFiber.flags |= Placement;
        console.log(`    🔄 [${position.newIndex}] 需要移动`);
      }

      // 将新 Fiber 链接到结果链表中
      if (prevNewFiber === null) {
        resultingFirstChild = newFiber;
      } else {
        prevNewFiber.sibling = newFiber;
      }
      prevNewFiber = newFiber;
    }
  }

  console.log('\n✅ reconcileChildrenArray 完成！');
  return resultingFirstChild;
}

// ==================== 辅助函数 ====================

/**
 * 更新已存在的 slot（复用旧 Fiber）
 */
function updateSlot(returnFiber, oldFiber, newElement) {
  // 创建新的 Fiber 节点，复用旧 Fiber 的状态
  const newFiber = {
    ...oldFiber,  // 复用所有属性
    pendingProps: newElement.props,  // 更新 props
    flags: Update,  // 标记为更新
  };

  // 如果 props 变了，标记需要更新 DOM
  if (!shallowEqual(oldFiber.memoizedProps, newElement.props)) {
    newFiber.flags |= Update;
  }

  return newFiber;
}

/**
 * 创建全新的子 Fiber
 */
function createChild(returnFiber, newElement) {
  // 创建全新的 Fiber 节点
  const newFiber = createFiberFromElement(newElement);
  newFiber.return = returnFiber;
  newFiber.flags = Placement;  // 新节点默认需要插入
  return newFiber;
}

/**
 * 标记删除
 */
function markDeletion(returnFiber, fiberToDelete) {
  // 在父节点的 deletions 数组中记录要删除的子节点
  if (returnFiber.deletions === null) {
    returnFiber.deletions = [fiberToDelete];
  } else {
    returnFiber.deletions.push(fiberToDelete);
  }

  // 标记父节点有子树删除操作
  returnFiber.flags |= ChildDeletion;
}

/**
 * 标记放置（用于尾部匹配的节点）
 */
function markPlacement(fiber, index) {
  fiber.flags |= Placement;
  // 存储目标位置信息（实际 commit 时会用到）
  fiber._index = index;
}

/**
 * 浅比较两个对象是否相等
 */
function shallowEqual(objA, objB) {
  if (Object.is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!Object.prototype.hasOwnProperty.call(objB, key) ||
        !Object.is(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}

/**
 * 获取 Fiber 链表的 key 列表（调试用）
 */
function getFiberKeys(firstFiber) {
  const keys = [];
  let node = firstFiber;
  while (node) {
    keys.push(node.key ?? node.index);
    node = node.sibling;
  }
  return keys;
}
```

#### 最长递增子序列（LIS）算法实现

```javascript
// ==================== 最长递增子序列算法 ====================
/**
 * 用于优化 DOM 移动操作
 * 时间复杂度: O(n log n)
 *
 * 示例：
 * 输入: [3, 1, 4, 2] （这些数字代表旧数组中的位置索引）
 * 输出: [1, 2] 或 [0, 2] （LIS 的索引位置）
 * 含义：位置 1 和 2（或 0 和 2）上的元素已经是有序的，不需要移动
 */

function getLongestIncreasingSubsequence(arr) {
  const n = arr.length;
  if (n === 0) return [];

  // tails[i] 表示长度为 i+1 的递增子序列的最小末尾元素值
  const tails = [];
  // prevIndices 用于回溯实际的 LIS 序列
  const prevIndices = new Array(n).fill(-1);
  // positions 记录每个元素在 tails 数组中的位置
  const positions = [];

  for (let i = 0; i < n; i++) {
    // 二分查找：找到 arr[i] 应该插入的位置
    let left = 0, right = tails.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid].value < arr[i]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    // 如果找到了合适的位置
    if (left < tails.length) {
      // 更新该位置的值为更小的值（贪心策略）
      tails[left] = { value: arr[i], index: i };
    } else {
      // 扩展 tails 数组
      tails.push({ value: arr[i], index: i });
    }

    // 记录前驱
    if (left > 0) {
      prevIndices[i] = tails[left - 1].index;
    }

    positions[i] = left;
  }

  // 回溯得到实际的 LIS 索引
  const lis = [];
  let currentIndex = tails[tails.length - 1]?.index;

  while (currentIndex !== -1) {
    lis.unshift(currentIndex);
    currentIndex = prevIndices[currentIndex];
  }

  return lis;
}

// ==================== 完整示例演示 ====================

function demoDiffAlgorithm() {
  console.log('\n'.repeat(2));
  console.log('=' .repeat(70));
  console.log('🎯 React Diff 算法完整演示');
  console.log('='.repeat(70));

  // 场景：列表中间插入了新元素，并且交换了顺序
  // 旧列表: [A, B, C, D, E]
  // 新列表: [A, B, X, C, E]

  console.log('\n📋 测试场景:');
  console.log('  旧 children: [A, B, C, D, E]');
  console.log('  新 children: [A, B, X, C, E]');
  console.log('  变化: 在 B 和 C 之间插入了 X，删除了 D');

  // 构造模拟数据
  const oldChildren = [
    { key: 'a', type: 'Item', memoizedProps: { text: 'A' } },
    { key: 'b', type: 'Item', memoizedProps: { text: 'B' } },
    { key: 'c', type: 'Item', memoizedProps: { text: 'C' } },
    { key: 'd', type: 'Item', memoizedProps: { text: 'D' } },
    { key: 'e', type: 'Item', memoizedProps: { text: 'E' } },
  ];

  const newChildren = [
    { key: 'a', type: 'Item', props: { text: 'A' } },
    { key: 'b', type: 'Item', props: { text: 'B' } },
    { key: 'x', type: 'Item', props: { text: 'X' } },  // 新增
    { key: 'c', type: 'Item', props: { text: 'C' } },
    { key: 'e', type: 'Item', props: { text: 'E' } },    // D 被删除了
  ];

  // 模拟 Fiber 链表结构
  function buildFiberChain(elements) {
    let first = null;
    let prev = null;

    elements.forEach((el, index) => {
      const fiber = {
        ...el,
        tag: 5,  // HostComponent
        index: index,
        sibling: null,
        child: null,
        return: null,
        alternate: null,
        flags: 0,
        stateNode: document.createElement('div'),
      };

      if (prev === null) {
        first = fiber;
      } else {
        prev.sibling = fiber;
      }
      prev = fiber;
    });

    return first;
  }

  const oldFirstFiber = buildFiberChain(oldChildren);
  const mockReturnFiber = { tag: 3, deletions: null, flags: 0 };

  // 执行 Diff 算法
  const result = reconcileChildrenArray(mockReturnFiber, oldFirstFiber, newChildren);

  // 打印结果
  console.log('\n📊 Diff 结果总结:');
  console.log('  ┌─────────────────────────────────────┐');
  console.log('  │ 操作类型       │ 节点                │');
  console.log('  ├─────────────────────────────────────┤');
  console.log('  │ 复用(不变)     │ A, B, C, E          │');
  console.log('  │ 新增(插入)     │ X                   │');
  console.log('  │ 删除           │ D                   │');
  console.log('  └─────────────────────────────────────┘');

  console.log('\n💡 性能分析:');
  console.log('  • 时间复杂度: O(n) - 只遍历了常数次');
  console.log('  • DOM 操作次数: 最小化（只有必要的插入和删除）');
  console.log('  • 复用率: 80%（5 个旧节点中复用了 4 个）');
}

// 运行演示
demoDiffAlgorithm();
```

---

## Q31: 请解释 React 18 的并发特性（Concurrent Mode）。startTransition、Suspense 和非阻塞更新是如何工作的？

- **难度**：★★☆
- **知识点**：并发模式 / React 18 / Suspense / startTransition
- **题型**：综合应用题

### 参考答案要点：

1. **什么是并发渲染？**
   ```
   并发（Concurrent）≠ 并行（Parallel）

   并发：交替执行多个任务，看起来像同时进行
   - React 可以在渲染一个组件的过程中暂停
   - 去处理更紧急的任务（用户输入）
   - 然后回来继续之前的渲染

   并行：真正同时执行多个任务（需要多核 CPU）
   - JavaScript 是单线程的，不存在真正的并行
   ```

2. **startTransition 与 useTransition**
   ```jsx
   import { startTransition, useTransition } from 'react';

   function SearchExample() {
     const [inputValue, setInputValue] = useState('');
     const [searchResults, setSearchResults] = useState([]);
     const [isPending, startTransition] = useTransition();

     const handleInputChange = (e) => {
       const value = e.target.value;

       // 紧急更新：立即响应用户输入
       setInputValue(value);

       // 非紧急更新：标记为 transition
       startTransition(() => {
         // 这个 setState 优先级降低
         const results = performExpensiveSearch(value);
         setSearchResults(results);
       });
     };

     return (
       <div>
         <input value={inputValue} onChange={handleInputChange} />
         {isPending ? <Spinner /> : <ResultsList items={searchResults} />}
         {/* isPending 表示 transition 正在进行中 */}
       </div>
     );
   }
   ```

3. **Suspense + React.lazy**
   ```jsx
   import { lazy, Suspense } from 'react';

   // 懒加载组件（代码分割）
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   const Chart = lazy(() => import('./Chart'));

   function Dashboard() {
     return (
       <div>
         <Header />

         {/* Suspense 包裹懒加载组件 */}
         <Suspense fallback={<Skeleton />}>
           <HeavyComponent />
         </Suspense>

         <Suspense fallback={<ChartPlaceholder />}>
           <Chart data={chartData} />
         </Suspense>
       </div>
     );
   }

   // Suspense 的工作原理：
   // 1. 组件在 render 时抛出 Promise（由 React.lazy 触发）
   // 2. React 捕获这个 Promise
   // 3. 显示 fallback UI
   // 4. Promise resolve 后重新渲染
   // 5. 显示实际组件
   ```

4. **并发特性的使用场景**
   ```
   场景 1：搜索/过滤（已展示）
   - 输入框即时响应（紧急）
   - 结果列表延迟加载（transition）

   场景 2：页面导航
   function Navigation() {
     const [isPending, startTransition] = useTransition();
     const [page, setPage] = useState('home');

     const navigate = (newPage) => {
       startTransition(() => {
         setPage(newPage);  // 页面切换是 transition
       });
     };

     return (
       <nav>
         <button onClick={() => navigate('home')}>首页</button>
         <button onClick={() => navigate('about')}>关于</button>
       </nav>
       <Suspense fallback={<PageLoader />}>
         {isPending && <PageLoader />}
         <PageContent page={page} />
       </Suspense>
     );
   }

   场景 3：大数据量更新
   function LargeList({ allItems }) {
     const [filter, setFilter] = useState('');
     const deferredFilter = useDeferredValue(filter);

     const filtered = useMemo(
       () => allItems.filter(item => item.includes(deferredFilter)),
       [allItems, deferredFilter]
     );

     return (
       <>
         <input value={filter} onChange={e => setFilter(e.target.value)} />
         <List items={filtered} />
       </>
     );
   }
   ```

5. **并发特性对现有代码的影响**
   ```
   默认开启：createRoot 自动启用并发特性

   兼容性：
   - 大多数代码无需修改即可受益
   - 可能受影响的场景：
     * 依赖同步更新的代码（如读取 DOM 后立即操作）
     * 自定义的 shouldComponentUpdate 逻辑
     * 外部 store 集成（需要 useSyncExternalStore）

   解决方案：
   - 使用 flushSync 强制同步更新
   - 使用 useSyncExternalStore 订阅外部数据源
   ```

---

## Q32: React 中有哪些组件通信方式？请详细说明 Props 下行、回调上行、Context API 和状态提升。

- **难度**：★★☆
- **知识点**：组件通信 / 数据流 / 状态管理
- **题型**：综合应用题

### 参考答案要点：

1. **通信方式总览**
   ```
   ┌─────────────────────────────────────────────┐
   │           React 组件通信方式                  │
   ├─────────────────────────────────────────────┤
   │  1. Props 下行（父 → 子）                    │
   │  2. 回调函数上行（子 → 父）                   │
   │  3. Context API（跨层级）                     │
   │  4. 状态提升（兄弟组件）                      │
   │  5. 全局事件总线（Event Bus）                 │
   │  6. 状态管理库（Redux/Zustand 等）            │
   │  7. Ref（命令式访问）                         │
   │  8. Portal（DOM 层级但逻辑关联）               │
   └─────────────────────────────────────────────┘
   ```

2. **Props 下行（Parent → Child）**
   ```jsx
   // 父组件通过 props 向子组件传递数据
   function Parent() {
     const userInfo = { name: 'Alice', age: 25 };
     const theme = 'dark';

     return <Child user={userInfo} theme={theme} />;
   }

   function Child({ user, theme }) {
     return (
       <div className={theme}>
         Hello, {user.name} ({user.age}岁)
       </div>
     );
   }

   // 特点：
   // - 单向数据流的核心
   // - Props 是只读的
   // - 支持任意类型的数据（基本类型、对象、函数、JSX）
   ```

3. **回调上行（Child → Parent）**
   ```jsx
   // 子组件通过调用父组件传递的回调函数来向上传递数据
   function Parent() {
     const [selectedItem, setSelectedItem] = useState(null);

     const handleSelect = (item) => {
       setSelectedItem(item);  // 接收子组件传来的数据
     };

     return (
       <div>
         <ItemList items={items} onSelect={handleSelect} />
         {selectedItem && <DetailPanel item={selectedItem} />}
       </div>
     );
   }

   function ItemList({ items, onSelect }) {
     return (
       <ul>
         {items.map(item => (
           <li key={item.id} onClick={() => onSelect(item)}>
             {item.name}
           </li>
         ))}
       </ul>
     );
   }

   // 特点：
   // - 本质还是 props（传递的是函数）
   // - 实现了反向通信
   // - 多层嵌套时需要逐层传递（props drilling 问题）
   ```

4. **Context API（跨层级通信）**
   ```jsx
   // 创建 Context
   const ThemeContext = createContext('light');
   const UserContext = createContext(null);

   // 提供者组件
   function App() {
     const [theme, setTheme] = useState('dark');
     const user = { name: 'Bob', role: 'admin' };

     return (
       // Provider 可以嵌套
       <ThemeContext.Provider value={theme}>
         <UserContext.Provider value={user}>
           <Header />
           <MainContent />
           <Footer />
         </UserContext.Provider>
       </ThemeContext.Provider>
     );
   }

   // 消费者组件（任意层级）
   function DeepNestedComponent() {
     // 直接消费 Context，无需中间组件传递
     const theme = useContext(ThemeContext);
     const user = useContext(UserContext);

     return (
       <div className={theme}>
         Welcome, {user.name}!
       </div>
     );
   }

   // 适用场景：
   // - 主题、语言、用户信息等全局数据
   // - 避免 props drilling（多层 props 透传）
   // - 注意：不要滥用，会增加组件耦合度
   ```

5. **状态提升（Sibling Communication）**
   ```jsx
   // 当两个兄弟组件需要共享状态时，
   // 将状态提升到它们的最近公共祖先

   function GrandParent() {
     // 状态提升到这里
     const [sharedData, setSharedData] = useState('');

     return (
       <div>
         <ParentA sharedData={sharedData} onDataChange={setSharedData} />
         <ParentB sharedData={sharedData} />
       </div>
     );
   }

   function ParentA({ sharedData, onDataChange }) {
     return <Input value={sharedData} onChange={onDataChange} />;
   }

   function ParentB({ sharedData }) {
     return <Display value={sharedData} />;
   }

   // 数据流：
   // ParentA (onChange) → GrandParent (setState) → ParentB (props)
   ```

6. **选择决策指南**
   ```
   父子通信 → Props + 回调
   跨层级通信 → Context API
   兄弟通信 → 状态提升 或 Context
   跨组件全局通信 → Redux / Zustand / Jotai
   不相关的组件 → 自定义事件 / 状态管理库
   ```

### 🔍 追问链
1. **Context.Provider 的 value 每次渲染都创建新对象会有什么问题？**
   → 方向：所有消费该 Context 的子组件都会重渲染（即使它们不关心变化的值）；解决方案：value 用 useMemo 包裹 / 拆分 Context
2. **Context 能替代 Redux 吗？两者本质区别是什么？**
   → 方向：Context 是依赖注入机制不是状态管理；缺少中间件/devtools/时间旅行调试；适合简单场景
3. **跨多层级传递数据除了 Context 还有什么方案？**
   → 方向：Component Composition（组合）、Portal（仅限 DOM 层级）、Event Bus（已不推荐）、Module Singleton（ Zustand/Jotai 全局 store）

---

## Q33: 什么是 Render Props 模式？它的优缺点是什么？

- **难度**：★★☆
- **知识点**：设计模式 / Render Props / 代码复用
- **题型**：模式分析题

### 参考答案要点：

1. **Render Props 定义**
   ```jsx
   // Render Props：一个值为函数的 prop，
   // 用于告知组件需要渲染什么内容

   // 经典示例：React Router 的 Route 组件
   <Route path="/user/:id" render={(routeProps) => (
     <UserProfile userId={routeProps.match.params.id} />
 )} />

   // 核心思想：组件不自己决定如何渲染，
   // 而是通过调用传入的函数让调用方决定
   ```

2. **实现一个 Render Props 组件**
   ```jsx
   // 数据获取组件（Render Props 模式）
   class DataFetcher extends React.Component {
     state = { data: null, loading: true, error: null };

     async componentDidMount() {
       try {
         const response = await fetch(this.props.url);
         const data = await response.json();
         this.setState({ data, loading: false });
       } catch (error) {
         this.setState({ error: error.message, loading: false });
       }
     }

     render() {
       // 将状态和控制权通过 render prop 传递给使用者
       if (this.props.render) {
         return this.props.render({
           data: this.state.data,
           loading: this.state.loading,
           error: this.state.error,
         });
       }
       return null;
     }
   }

   // 使用
   function UserProfile({ userId }) {
     return (
       <DataFetcher url={`/api/users/${userId}`}>
         {({ data, loading, error }) => {
           if (loading) return <Spinner />;
           if (error) return <Error message={error} />;
           return <UserCard user={data} />;
         }}
       </DataFetcher>
     );
   }
   ```

3. **使用 children 作为 Render Prop**
   ```jsx
   // children 函数是特殊的 render prop
   function MouseTracker({ children }) {
     const [position, setPosition] = useState({ x: 0, y: 0 });

     const handleMouseMove = (e) => {
       setPosition({ x: e.clientX, y: e.clientY });
     };

     return (
       <div style={{ height: '100vh' }} onMouseMove={handleMouseMove}>
         {/* 调用 children 函数并传入状态 */}
         {children(position)}
       </div>
     );
   }

   // 使用
   function App() {
     return (
       <MouseTracker>
         {({ x, y }) => (
           // 使用者完全控制渲染逻辑
           <h1>鼠标位置：({x}, {y})</h1>
         )}
       </MouseTracker>
     );
   }
   ```

4. **优缺点对比**

   | 维度 | 优点 | 缺点 |
   |------|------|------|
   **灵活性** | 使用者完全控制 UI 渲染 | - |
   **可读性** | JSX 结构清晰 | 嵌套过深时出现"回调地狱" |
   **可组合性** | 可以任意组合 | - |
   **性能** | - | 每次渲染创建新函数（可用 HOC 解决） |
   **TypeScript** | - | 类型定义较复杂 |

5. **与现代方案的对比**
   ```
   Render Props vs Hooks：

   Render Props 写法：
   <DataFetcher url="/api/data">
     {({ data, loading }) => loading ? <Spinner /> : <Display data={data} />}
   </DataFetcher>

   Hooks 写法（更推荐）：
   function Display() {
     const { data, loading } = useFetch('/api/data');
     if (loading) return <Spinner />;
     return <Display data={data} />;
   }

   结论：
   - Hooks 出现后，Render Props 使用减少
   - 但在某些场景仍有价值（如组件库设计）
   - Formik、React Motion 等库仍使用此模式
   ```

---

## Q34: 什么是 Compound Components（组合组件）模式？请举例说明。

- **难度**：★★☆
- **知识点**：设计模式 / 组合组件 / API 设计
- **题型**：模式分析题 + 编程实践题

### 参考答案要点：

1. **Compound Components 定义**
   ```jsx
   // Compound Components：一组协同工作的组件，
   // 通过隐式共享状态来实现功能

   // 经典例子：HTML 的 <select> 和 <option>
   <select>
     <option value="a">A</option>
     <option value="b">B</option>
     <option value="c">C</option>
   </select>
   // select 和 option 共享状态（选中值），但各自独立声明
   ```

2. **实现示例：自定义 Select 组件**
   ```jsx
   import { createContext, useContext, useState } from 'react';

   // 1. 创建 Context 用于共享状态
   const SelectContext = createContext();

   // 2. 容器组件（Provider）
   function Select({ children, defaultValue, onChange }) {
     const [selectedValue, setSelectedValue] = useState(defaultValue);

     const handleChange = (value) => {
       setSelectedValue(value);
       onChange?.(value);
     };

   // 通过 Context 共享状态给子组件
   return (
     <SelectContext.Provider value={{ selectedValue, handleChange }}>
       <div className="select">{children}</div>
     </SelectContext.Provider>
   );
   }

   // 3. Option 组件（Consumer）
   function SelectOption({ value, children }) {
     const { selectedValue, handleChange } = useContext(SelectContext);
     const isSelected = value === selectedValue;

     return (
       <div
         className={`option ${isSelected ? 'selected' : ''}`}
         onClick={() => handleChange(value)}
       >
         {children}
       </div>
     );
   }

   // 4. 挂载子组件引用
   Select.Option = SelectOption;

   // 5. 使用
   function Form() {
     const handleChange = (value) => {
       console.log('选中:', value);
     };

     return (
       <Select defaultValue="b" onChange={handleChange}>
         <Select.Option value="a">选项 A</Select.Option>
         <Select.Option value="b">选项 B</Select.Option>
         <Select.Option value="c">选项 C</Select.Option>
       </Select>
     );
   }
   ```

3. **进阶：使用 React.Children.map 实现隐式绑定**
   ```jsx
   // 更灵活的实现：不需要手动包裹 Option
   function Select({ children, value, onChange }) {
     // 克隆子组件并注入 props
     const clonedChildren = React.Children.map(children, (child) => {
       if (React.isValidElement(child)) {
         return React.cloneElement(child, {
           isSelected: child.props.value === value,
           onSelect: () => onChange(child.props.value),
         });
       }
       return child;
     });

     return <div className="select">{clonedChildren}</div>;
   }

   // Option 组件变得更简单
   function Option({ value, children, isSelected, onSelect }) {
     return (
       <div
         className={`option ${isSelected ? 'selected' : ''}`}
         onClick={onSelect}
       >
         {children}
       </div>
     );
   }
   ```

4. **真实案例：Radix UI、Headless UI**
   ```jsx
   // Radix UI 的 Dialog 组件
   import * as Dialog from '@radix-ui/react-dialog';

   function ModalExample() {
     return (
       <Dialog.Root>
         <Dialog.Trigger asChild>
           <Button>打开对话框</Button>
         </Dialog.Trigger>

         <Dialog.Portal>
           <Dialog.Overlay className="overlay" />
           <Dialog.Content className="content">
             <Dialog.Title>标题</Dialog.Title>
             <Dialog.Description>描述内容</Dialog.Title.Description>
             <Dialog.Close asChild>
               <Button variant="ghost">关闭</Button>
             </Dialog.Close>
           </Dialog.Content>
         </Dialog.Portal>
       </Dialog.Root>
     );
   }

   // 优势：
   // - 完全的可访问性支持
   // - 灵活的样式控制
   // - 清晰的语义化结构
   ```

5. **Compound Components 的优势**
   ```
   1. 声明式 API：直观表达 UI 结构
   2. 灵活性高：使用者自由组合和布局
   3. 可扩展性强：容易添加新的子组件
   4. 符合 React 理念：组合优于继承
   5. 类型安全：TypeScript 支持良好
   ```

---

## Q35: React Portal 的使用场景是什么？有什么限制？

- **难度**：★★☆
- **知识点**：Portal / DOM 操作 / 高级特性
- **题型**：应用场景题

### 参考答案要点：

1. **Portal 基本用法**
   ```jsx
   import { createPortal } from 'react-dom';

   function Modal({ isOpen, onClose, children }) {
     if (!isOpen) return null;

     // 将内容渲染到 body 下（脱离父组件的 DOM 层级）
     return createPortal(
       <div className="modal-overlay" onClick={onClose}>
         <div className="modal-content" onClick={e => e.stopPropagation()}>
           {children}
           <button onClick={onClose}>关闭</button>
         </div>
       </div>,
       document.body  // 目标 DOM 节点
     );
   }

   // Portal 的特点：
   // 1. 在不同的物理 DOM 位置渲染
   // 2. 但在 React 组件树中的位置不变（事件冒泡正常工作）
   // 3. Context 可以正常穿透
   ```

2. **典型使用场景**

   **场景 1：模态框/对话框**
   ```jsx
   function ConfirmDialog({ message, onConfirm, onCancel }) {
     return createPortal(
       <div className="dialog-overlay">
         <div className="dialog">
           <p>{message}</p>
           <div className="dialog-actions">
             <button onClick={onCancel}>取消</button>
             <button onClick={onConfirm}>确认</button>
           </div>
         </div>
       </div>,
       document.getElementById('dialog-root') || document.body
     );
   }
   ```

   **场景 2：Tooltip / Popover（避免 overflow 裁剪）**
   ```jsx
   function Tooltip({ text, children }) {
     const [position, setPosition] = useState(null);
     const triggerRef = useRef(null);

     const showTooltip = (e) => {
       const rect = triggerRef.current.getBoundingClientRect();
       setPosition({ top: rect.bottom + 8, left: rect.left });
     };

     return (
       <>
         <span ref={triggerRef} onMouseEnter={showTooltip} onMouseLeave={() => setPosition(null)}>
           {children}
         </span>
         {position && createPortal(
           <div
             className="tooltip"
             style={{ top: position.top, left: position.left }}
           >
             {text}
           </div>,
           document.body
         )}
       </>
     );
   }
   ```

   **场景 3：全局通知/Toast**
   ```jsx
   let toastCount = 0;

   function ToastContainer() {
     const [toasts, setToasts] = useState([]);

     window.showToast = (message, type = 'info') => {
       const id = ++toastCount;
       setToasts(prev => [...prev, { id, message, type }]);
       setTimeout(() => {
         setToasts(prev => prev.filter(t => t.id !== id));
       }, 3000);
     };

     return createPortal(
       <div className="toast-container">
         {toasts.map(toast => (
           <div key={toast.id} className={`toast toast-${toast.type}`}>
             {toast.message}
           </div>
         ))}
       </div>,
       document.body
     );
   }
   ```

   **场景 4：挂载到 iframe 或新窗口**
   ```jsx
   function IframeRenderer({ content }) {
     const iframeRef = useRef(null);

     useEffect(() => {
       const iframeDoc = iframeRef.current.contentDocument;
       const mountPoint = iframeDoc.createElement('div');
       iframeDoc.body.appendChild(mountPoint);

       // 渲染到 iframe 内部
       const root = createRoot(mountPoint);
       root.render(content);

       return () => root.unmount();
   }, [content]);

     return <iframe ref={iframeRef} />;
   }
   ```

3. **Portal 的特殊行为**

   **事件冒泡仍然正常工作**
   ```jsx
   function App() {
     const handleClick = () => {
       console.log('点击事件冒泡到了 App！');
     };

     return (
       <div onClick={handleClick}>
         <Modal>
           {/* 即使 Portal 内容在 body 下，点击事件仍会冒泡到这里的 div */}
           <button>点击我</button>
         </Modal>
       </div>
     );
   }
   // 这是因为 React 的事件系统是基于组件树的，不是基于 DOM 树的
   ```

   **Context 可以穿透 Portal**
   ```jsx
   const ThemeContext = createContext('light');

   function App() {
     return (
       <ThemeContext.Provider value="dark">
         <MainContent />
       </ThemeContext.Provider>
     );
   }

   function MainContent() {
     return <Modal />;  // Modal 使用 Portal 渲染到 body
   }

   function Modal() {
     const theme = useContext(ThemeContext);  // ✅ 仍然能获取到 'dark'
     // 即使 Modal 的 DOM 不在 Provider 内部，Context 仍然有效
     return createPortal(<div className={theme}>...</div>, document.body);
   }
   ```

4. **注意事项与限制**
   ```
   1. SSR 兼容性问题
      - 服务端没有 document 对象
      - 需要条件判断或使用动态导入

   2. 目标节点必须存在
      - 确保 document.getElementById('root') 存在
      - 或者提供回退机制

   3. 样式隔离
      - Portal 内容可能不受父组件 CSS 影响
      - 可能需要额外的样式处理

   4. 焦点管理
      - 打开模态框时需要管理焦点陷阱
      - 关闭时恢复焦点位置
   ```

---

## Q36: forwardRef 和 useImperativeHandle 的使用场景是什么？

- **难度**：★★☆
- **知识点**：Ref 操作 / forwardRef / 命令式 API
- **题型**：应用题 + 代码实践题

### 参考答案要点：

1. **为什么需要 forwardRef？**
   ```jsx
   // ❌ 问题：Ref 不能直接传递给函数组件
   function MyInput(props) {
     return <input {...props} />;
   }

   // 使用时 ref 不会生效！
   function App() {
     const inputRef = useRef(null);
     return <MyInput ref={inputRef} />;  // ref 为 undefined
   }

   // ✅ 解决：使用 forwardRef 转发 ref
   const MyInput = forwardRef((props, ref) => {
     return <input ref={ref} {...props} />;
   });

   // 现在 ref 可以正常工作了
   function App() {
     const inputRef = useRef(null);

     useEffect(() => {
       inputRef.current.focus();  // ✅ 有效
     }, []);

     return <MyInput ref={inputRef} placeholder="自动聚焦" />;
   }
   ```

2. **forwardRef + TypeScript**
   ```tsx
   interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
     label?: string;
   }

   const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
     ({ label, ...props }, ref) => {
       return (
         <label>
           {label && <span>{label}</span>}
           <input ref={ref} {...props} />
         </label>
       );
     }
   );

   // 显示名称（调试友好）
   MyInput.displayName = 'MyInput';
   ```

3. **useImperativeHandle：暴露自定义方法**
   ```jsx
   // 场景：封装一个 VideoPlayer 组件，对外暴露 play/pause/pause 方法
   const VideoPlayer = forwardRef((props, ref) => {
     const videoRef = useRef<HTMLVideoElement>(null);

     // 自定义暴露给父组件的方法
     useImperativeHandle(ref, () => ({
       play: () => videoRef.current?.play(),
       pause: () => videoRef.current?.pause(),
       getCurrentTime: () => videoRef.current?.currentTime ?? 0,
       seekTo: (time: number) => {
         if (videoRef.current) {
           videoRef.current.currentTime = time;
         }
       },
     }), []);  // 依赖数组（变化时重新创建句柄）

     return <video ref={videoRef} {...props} />;
   });

   // 使用
   function MoviePage() {
     const playerRef = useRef<{ play: () => void; pause: () => void }>(null);

     return (
       <div>
         <VideoPlayer ref={playerRef} src="/movie.mp4" />
         <button onClick={() => playerRef.current?.play()}>播放</button>
         <button onClick={() => playerRef.current?.pause()}>暂停</button>
       </div>
     );
   }
   ```

4. **useImperativeHandle 的常见用途**
   ```jsx
   // 用途 1：表单验证
   const FormField = forwardRef(({ label, validator }, ref) => {
     const inputRef = useRef(null);
     const [error, setError] = useState('');

     useImperativeHandle(ref, () => ({
       validate: () => {
         const value = inputRef.current?.value;
         const errorMsg = validator(value);
         setError(errorMsg);
         return !errorMsg;
       },
       getValue: () => inputRef.current?.value,
       focus: () => inputRef.current?.focus(),
     }), [validator]);

     return (
       <div>
         <label>{label}</label>
         <input ref={inputRef} />
         {error && <span className="error">{error}</span>}
       </div>
     );
   });

   // 用途 2：滚动容器
   const ScrollContainer = forwardRef((props, ref) => {
     const containerRef = useRef<HTMLDivElement>(null);

     useImperativeHandle(ref, () => ({
       scrollToTop: () => {
         containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
       },
       scrollToBottom: () => {
         const el = containerRef.current;
         if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
       },
     }), []);

     return <div ref={containerRef} {...props} style={{ overflowY: 'auto' }} />;
   });
   ```

5. **最佳实践建议**
   ```
   何时使用 forwardRef/useImperativeHandle：
   - 需要访问子组件的 DOM 节点
   - 需要触发子组件的动画
   - 需要调用子组件的方法（如表单验证、媒体控制）
   - 封装第三方库时需要暴露底层能力

   何时应避免：
   - 过度使用会导致组件耦合度增加
   - 大多数情况应该使用 props/state/回调
   - 只有确实需要命令式操作时才使用
   ```

---

## Q37: 如何选择合适的状态管理方案？Context vs Redux vs Zustand vs Jotai 的对比。

- **难度**：★★☆
- **知识点**：状态管理 / 技术选型 / 方案对比
- **题型**：技术选型题

### 参考答案要点：

1. **各方案定位与特点**
   ```
   ┌──────────┬──────────────┬──────────────┬──────────────┐
   │          │  Context     │  Redux       │  Zustand      │
   ├──────────┼──────────────┼──────────────┼──────────────┤
   复杂度     │  低          │  高          │  低           │
   学习成本   │  低          │  高          │  低           │
   包体积     │  0 (内置)    │  ~7KB        │  ~1KB         │
   DevTools   │  一般        │  优秀        │  支持         │
   中间件     │  无          │  丰富        │  内置 middleware│
   适用规模   │  小-中       │  中-大       │  小-大        │
   TypeScript │  一般        │  优秀        │  优秀         │
   └──────────┴──────────────┴──────────────┴──────────────┘
   ```

2. **各方案核心代码对比**

   **Context 方案**
   ```jsx
   const AppContext = createContext();

   function AppProvider({ children }) {
     const [state, setState] = useState(initialState);
     return (
       <AppContext.Provider value={{ state, setState }}>
         {children}
       </AppContext.Provider>
     );
   }

   // 使用
   function Component() {
     const { state, setState } = useContext(AppContext);
     // ...
   }
   ```

   **Redux Toolkit 方案**
   ```tsx
   import { createSlice, configureStore } from '@reduxjs/toolkit';
   import { Provider, useDispatch, useSelector } from 'react-redux';

   // 创建 slice
   const counterSlice = createSlice({
     name: 'counter',
     initialState: { value: 0 },
     reducers: {
       incremented: state => { state.value += 1 },
       decremented: state => { state.value -= 1 },
     },
   });

   // 配置 store
   const store = configureStore({
     reducer: {
       counter: counterSlice.reducer,
     },
   });

   // 使用
   function Counter() {
     const count = useSelector(state => state.counter.value);
     const dispatch = useDispatch();
     return (
       <div>
         <span>{count}</span>
         <button onClick={() => dispatch(counterSlice.actions.incremented())}>+</button>
       </div>
     );
   }
   ```

   **Zustand 方案**
   ```tsx
   import { create } from 'zustand';

   // 极简的 store 定义
   const useStore = create((set) => ({
     bears: 0,
     increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
     removeAllBears: () => set({ bears: 0 }),
   }));

   // 使用（无需 Provider 包裹！）
   function BearCounter() {
     const bears = useStore(state => state.bears);
     return <span>{bears} 只熊</span>;
   }

   function Controls() {
     const increasePopulation = useStore(state => state.increasePopulation);
     return <button onClick={increasePopulation}>增加一只熊</button>;
   }
   ```

   **Jotai 方案（原子化状态）**
   ```tsx
   import { atom, useAtom } from 'jotai';

   // 定义原子状态
   const countAtom = atom(0);
   const doubledAtom = atom((get) => get(countAtom) * 2);  // 派生原子

   // 使用
   function Counter() {
     const [count, setCount] = useAtom(countAtom);
     return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
   }

   function Doubled() {
     const [doubled] = useAtom(doubledAtom);  // 只在 countAtom 变化时重渲染
     return <span>双倍: {doubled}</span>;
   }
   ```

3. **选型决策指南**
   ```
   选择 Context：
   - 项目较小，状态简单
   - 只需要避免 props drilling
   - 不需要时间旅行调试
   - 团队熟悉度有限

   选择 Redux (RTK)：
   - 大型项目，状态复杂
   - 需要严格的数据流管控
   - 需要强大的 DevTools
   - 团队有 Redux 经验
   - 需要中间件（日志、持久化等）

   选择 Zustand：
   - 追求简洁和开发体验
   - 不想写大量样板代码
   - 需要在组件外访问状态
   - 需要 TypeScript 友好

   选择 Jotai：
   - 需要细粒度更新（原子化状态）
   - 类似 Recoil 但更轻量
   - 状态之间有复杂的依赖关系
   ```

4. **混合使用的可能性**
   ```tsx
   // 实际项目中可以混合使用不同方案
   // 例如：Zustand 管理全局状态 + Context 管理主题 + Jotai 管理局部复杂状态

   // Zustand：用户认证、全局配置
   const useAuthStore = create(...);

   // Context：主题、语言等 UI 状态
   const ThemeContext = createContext(...);

   // Jotai：表单状态、局部派生状态
   const formDataAtom = atom({...});
   ```

### 深度拓展：手写实现

#### 简化版 Zustand Store 实现（完整可运行）

```javascript
// ==================== 简化版 Zustand Store 实现 ====================
/**
 * Zustand 是一个轻量级的状态管理库
 * 核心特点：
 * - 极简 API（无需 Provider 包裹）
 * - 支持在组件外访问和修改状态
 * - 内置中间件机制
 * - 支持 selector 模式实现细粒度更新
 *
 * 本实现模拟了 Zustand 的核心功能
 */

import { useEffect, useSyncExternalStore, useRef } from 'react';

// ════════════════════════════════════════════════════════
// 第一部分：Store 核心实现
// ════════════════════════════════════════════════════════

/**
 * createStore - 创建 Zustand 风格的 store
 *
 * @param {Function} createState - 初始化状态的函数，接收 set/get/api 参数
 * @returns {Function} useStore hook（类似 zustand 的 create 返回值）
 */
function createStore(createState) {
  console.log('🏗️ 创建 Zustand Store');

  // ========== 状态存储 ==========
  let state;                          // 当前状态
  const listeners = new Set();         // 订阅者集合（监听状态变化的回调）
  const middlewareListeners = new Set(); // 中间件监听器

  // ========== setState 实现 ==========
  /**
   * setState - 更新状态
   *
   * 支持两种调用方式：
   * 1. 直接传值：setState({ count: 1 })
   * 2. 函数式更新：setState(prev => ({ count: prev.count + 1 }))
   *
   * @param {*} partial - 新的部分状态或更新函数
   */
  function setState(partial, replace = false) {
    // ⭐⭐⭐ 核心：支持 Immer 风格的不可变更新 ⭐⭐⭐
    // 实际 Zustand 使用 immer 中间件，这里简化为浅合并
    const nextState =
      typeof partial === 'function'
        ? partial(state)           // 函数式更新
        : partial;                  // 对象式更新

    if (replace) {
      state = nextState;            // 完全替换状态
    } else if (typeof nextState === 'object' && nextState !== null) {
      state = Object.assign({}, state, nextState);  // 浅合并
    } else {
      state = nextState;
    }

    console.log('📝 setState:', nextState);

    // 通知所有订阅者
    listeners.forEach(listener => listener(state));

    // 通知中间件
    middlewareListeners.forEach(listener => listener(state, nextState));
  }

  // ========== getState 实现 ==========
  /**
   * getState - 获取当前状态快照
   * 可以在任何地方调用（不限于 React 组件内）
   */
  function getState() {
    return state;
  }

  // ========== subscribe 实现 ==========
  /**
   * subscribe - 订阅状态变化
   *
   * @param {Function} listener - 状态变化时的回调函数 (newState) => void
   * @returns {Function} 取消订阅的函数
   */
  function subscribe(listener) {
    listeners.add(listener);

    // 返回取消订阅的函数（用于清理）
    return () => {
      listeners.delete(listener);
      console.log('🔕 取消订阅');
    };
  }

  // ========== getSnapshot 实现（用于 useSyncExternalStore）==========
  function getSnapshot() {
    return state;
  }

  // ========== API 对象（暴露给用户的高级 API）==========
  const api = { setState, getState, subscribe, getSnapshot };

  // ========== 初始化状态 ==========
  // 调用用户传入的 createState 函数来初始化状态
  state = createState(setState, getState, api);

  console.log('✅ Store 初始化完成，初始状态:', state);

  // ========== 返回 useStore hook ==========
  /**
   * useStore - 组件中使用的 hook
   *
   * 支持两种用法：
   * 1. 无参数：返回整个 state（任何变化都会触发重渲染）
   * 2. 有参数（selector）：返回选中部分（只有选中的部分变化才重渲染）
   *
   * @param {Function} [selector] - 选择器函数 (state) => selectedValue
   * @param {Function} [equalityFn] - 自定义比较函数（默认是 Object.is）
   */
  function useStore(selector, equalityFn) {
    // 如果没有提供 selector，默认返回整个 state
    const defaultSelector = (s) => s;

    const actualSelector = selector || defaultSelector;

    // 🔑🔑🔑 核心：使用 React 18 的 useSyncExternalStore 🔑🔑🔑
    // 这是 React 18 提供的官方 hook，专门用于订阅外部数据源
    // 它会自动处理服务端渲染、并发模式等边缘情况
    const slice = useSyncExternalStore(
      subscribe,       // 订阅函数
      getSnapshot,     // 获取快照函数
      () => actualSelector(getState()),  // 服务端渲染用的快照
    );

    return slice;
  }

  // 暴露更多方法供高级使用
  useStore.getState = getState;
  useStore.setState = setState;
  useStore.subscribe = subscribe;

  return useStore;
}

console.log('✅ createStore 函数定义完成');
```

#### 中间件系统实现

```javascript
// ════════════════════════════════════════════════════════
// 第二部分：中间件系统
// ════════════════════════════════════════════════════════

/**
 * applyMiddleware - 应用中间件
 *
 * 中间件的执行流程：
 * setState → middleware1 → middleware2 → ... → 原始 setState
 *
 * 每个中间件可以：
 * 1. 记录日志（logger）
 * 2. 持久化状态（persist）
 * 3. 时间旅行调试（devtools）
 * 4. 异步处理（虽然 Zustand 本身不需要）
 */
function applyMiddleware(...middlewares) {
  return (createState) => (set, get, api) => {
    // 应用中间件包装原始的 set 方法
    let currentSet = set;

    // 从右到左应用中间件（类似于 Redux）
    for (let i = middlewares.length - 1; i >= 0; i--) {
      const middleware = middlewares[i];
      currentSet = middleware(
        api.setState,   // 原始的 setState
        get,           // getState
        api            // 完整的 api 对象
      )(currentSet);
    }

    // 用包装后的 set 替换原始 set
    api.setState = currentSet;

    // 执行初始化
    return createState(currentSet, get, api);
  };
}

/**
 * logger 中间件 - 记录所有状态变更
 */
function logger(set, get) {
  return (setInner) => (partial, replace) => {
    console.group('📋 Zustand Logger');
    console.log('%c prev state', 'color: #9E9E9E', get());

    // 执行实际的 setState
    setInner(partial, replace);

    console.log('%c next state', 'color: #4CAF50', get());
    console.groupEnd();
  };
}

/**
 * persist 中间件 - 将状态持久化到 localStorage
 */
function persist(options = {}) {
  const { key = 'zustand-store', storage = localStorage } = options;

  return (set, get) => (setInner) => (partial, replace) => {
    // 先执行实际的 setState
    setInner(partial, replace);

    // 然后持久化新状态
    try {
      const stateToPersist = get();
      storage.setItem(key, JSON.stringify(stateToPersist));
      console.log(`💾 状态已持久化到 ${key}`);
    } catch (error) {
      console.error('❌ 持久化失败:', error);
    }
  };
}
```

#### 与 Redux 的核心差异对比代码

```javascript
// ════════════════════════════════════════════════════════
// 第三部分：Zustand vs Redux 核心差异对比
// ════════════════════════════════════════════════════════

/**
 * 差异点 1：不需要 Provider 包裹
 *
 * Redux 必须用 Provider 包裹整个应用：
 *   <Provider store={store}>
 *     <App />
 *   </Provider>
 *
 * Zustand 不需要！直接使用即可：
 *   const useStore = createStore(...)
 *   在任何组件中直接调用 useStore()
 */
console.log('\n📍 差异 1: Provider vs 无 Provider\n');
console.log(`
Redux:
┌─────────────────────────────┐
│ <Provider store={store}>    │ ← 必须包裹
│   ┌─────────────────────┐  │
│   │ App                 │  │
│   └─────────────────────┘  │
│ </Provider>                │
└─────────────────────────────┘

Zustand:
┌─────────────────────────────┐
│ App                         │ ← 直接使用，无需 Provider
│ (内部直接 import useStore)  │
└─────────────────────────────┘
`);

/**
 * 差异点 2：可以在组件外访问/修改状态
 *
 * Redux: 只能通过 dispatch(action) 修改，且通常在组件内
 * Zustand: 可以在任何地方调用 store.setState() 或 store.getState()
 */
console.log('\n📍 差异 2: 组件外访问状态\n');
console.log(`
// Redux ❌
// 不能在组件外直接修改状态
// 必须通过 dispatch({ type: 'INCREMENT' })

// Zustand ✅
// 可以在任何地方访问和修改状态
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// 在组件外部也能操作！
useCounterStore.getState().count;              // 读取
useCounterStore.setState({ count: 100 });       // 写入
useCounterStore.subscribe(console.log);        // 订阅
`);

/**
 * 差异点 3：Boilerplate（样板代码）对比
 */
console.log('\n📍 差异 3: 样板代码量对比\n');
console.log(`
=== Redux (RTK) ===
1️⃣ 定义 slice:
   const counterSlice = createSlice({
     name: 'counter',
     initialState: { value: 0 },
     reducers: {
       increment: (state) => { state.value += 1 },
     },
   });

2️⃣ 配置 store:
   const store = configureStore({
     reducer: { counter: counterSlice.reducer },
   });

3️⃣ Provider 包裹:
   <Provider store={store}><App /></Provider>

4️⃣ 组件中使用:
   const count = useSelector(s => s.counter.value);
   const dispatch = useDispatch();

5️⃣ 总代码量: ~40-50 行
=== Zustand ===
1️⃣ 创建 store（一步到位）:
   const useStore = create((set) => ({
     count: 0,
     increment: () => set((s) => ({ count: s.count + 1 })),
   }));

2️⃣ 组件中使用:
   const count = useStore(s => s.count);
   const increment = useStore(s => s.increment);

3️⃣ 总代码量: ~10-15 行 ✨
`);
```

#### 完整使用示例

```javascript
// ════════════════════════════════════════════════════════
// 第四部分：完整使用示例
// ════════════════════════════════════════════════════════

function ZustandDemo() {
  console.log('\n'.repeat(2));
  console.log('=' .repeat(70));
  console.log('🎯 Zustand Store 使用演示');
  console.log('='.repeat(70));

  // 创建一个带有中间件的 store
  const useStore = createStore(
    // 应用中间件（可选）
    applyMiddleware(
      logger(),                    // 日志中间件
      // persist({ key: 'my-app' })  // 持久化中间件（注释掉避免 localStorage 错误）
    )
  )((set, get) => ({
    // 初始状态
    bears: 0,
    user: null,
    theme: 'light',

    // Actions（可以直接修改状态）
    increasePopulation: () =>
      set((state) => ({ bears: state.bears + 1 })),

    removeAllBears: () =>
      set({ bears: 0 }),

    setUser: (user) =>
      set({ user }),

    toggleTheme: () =>
      set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  }));

  console.log('\n✅ Store 创建完成！\n');

  // ====== 组件定义 ======

  // 组件 1: Bear Counter（只订阅 bears 字段）
  function BearCounter() {
    const bears = useStore((state) => state.bears);  // 🎯 Selector 模式
    const increasePopulation = useStore((state) => state.increasePopulation);
    const removeAllBears = useStore((state) => state.removeAllBears);

    return (
      <div style={{
        padding: '16px', backgroundColor: '#fff7e6',
        border: '1px solid #ffd591', borderRadius: '8px'
      }}>
        <h3>🐻 熊计数器</h3>
        <p>当前熊数量：<strong style={{ fontSize: '24px', color: '#fa8c16' }}>{bears}</strong></p>
        <button onClick={increasePopulation}>➕ 增加一只熊</button>
        {' '}
        <button onClick={removeAllBears}>🗑️ 清空</button>
      </div>
    );
  }

  // 组件 2: Theme Switcher（只订阅 theme 字段）
  function ThemeSwitcher() {
    const theme = useStore((state) => state.theme);
    const toggleTheme = useStore((state) => state.toggleTheme);

    return (
      <div style={{
        padding: '16px', backgroundColor: '#e6f7ff',
        border: '1px solid #91d5ff', borderRadius: '8px'
      }}>
        <h3>🎨 主题切换</h3>
        <p>当前主题：<strong>{theme}</strong></p>
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙 切换到暗色' : '☀️ 切换到亮色'}
        </button>
      </div>
    );
  }

  // 组件 3: 展示组件外访问能力
  function ExternalAccessDemo() {
    const handleClick = () => {
      // 🔑 关键特性：在事件处理函数中直接访问/修改 store
      const currentState = useStore.getState();  // 读取当前状态
      console.log('📍 当前完整状态:', currentState);

      // 直接修改状态（不在 React 渲染周期内）
      useStore.setState({ bears: currentState.bears + 10 });
      console.log('💥 从组件外增加了 10 只熊！');
    };

    return (
      <button onClick={handleClick}>
        🔧 从外部增加 10 只熊（组件外 setState）
      </button>
    );
  }

  // 主应用组件
  return (
    <div style={{ fontFamily: '-apple-system, sans-serif', padding: '20px', maxWidth: '600px' }}>
      <h1>Zustand Store 演示</h1>

      <div style={{ display: 'grid', gap: '16px' }}>
        <BearCounter />
        <ThemeSwitcher />
        <ExternalAccessDemo />
      </div>

      {/* 特性说明 */}
      <div style={{
        marginTop: '24px', padding: '16px',
        backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '6px'
      }}>
        <strong>🎯 Zustand 核心优势：</strong><br/><br/>

        ✓ <strong>极简 API：</strong> 一行代码创建 store<br/>
        ✓ <strong>无 Provider：</strong> 不需要包裹应用<br/>
        ✓ <strong>组件外访问：</strong> 可在任何地方读写状态<br/>
        ✓ <strong>细粒度更新：</strong> Selector 模式避免不必要的重渲染<br/>
        ✓ <strong>TypeScript 友好：</strong> 完善的类型推断<br/>
        ✓ <strong>内置中间件：</strong> 日志、持久化等开箱即用<br/>
        ✓ <strong>体积小巧：</strong> 仅 ~1KB gzip
      </div>
    </div>
  );
}

export default ZustandDemo;
```

---

## Q38: Redux 的核心概念是什么？请解释其单向数据流。

- **难度**：★★☆
- **知识点**：Redux / 状态管理 / 架构模式
- **题型**：概念理解题

### 参考答案要点：

1. **三大原则**
   ```
   原则 1：单一数据源（Single Source of Truth）
   - 整个应用的 state 存储在一个 object tree 中
   - 这个 object tree 只存在于唯一一个 store 中

   原则 2：State 是只读的（State is Read-Only）
   - 唯一改变 state 的方式是触发 action
   - action 是一个描述发生什么的普通对象

   原则 3：使用纯函数执行修改（Changes are Made with Pure Functions）
   - 编写 reducers 来描述 state 如何因 action 而改变
   - reducer 是纯函数：(previousState, action) => newState
   ```

2. **核心概念**
   ```javascript
   // Action：描述"发生了什么"
   const action = {
     type: 'ADD_TODO',
     payload: {
       id: 1,
       text: 'Learn Redux',
     }
   };

   // Reducer：根据 action 计算新 state（纯函数）
   function todosReducer(state = [], action) {
     switch (action.type) {
       case 'ADD_TODO':
         return [...state, action.payload];
       case 'DELETE_TODO':
         return state.filter(todo => todo.id !== action.payload);
       default:
         return state;
     }
   }

   // Store：持有应用的 state
   // 提供：getState() / dispatch(action) / subscribe(listener)
   ```

3. **单向数据流**
   ```
   ┌──────────┐    dispatch     ┌──────────┐
   │  View     │ ──────────────→ │  Store   │
   │ (React)   │    Action       │          │
   └──────────┘                 └────┬─────┘
         ↑                            │
         │      State change          │ subscribe
         │ ←──────────────────────────┘
         │
    re-render

   详细流程：
   1. 用户在 View 上交互（点击、输入等）
   2. View dispatch 一个 Action
   3. Store 接收 Action，交给 Reducer 处理
   4. Reducer 根据 Action type 计算 new State
   5. Store 更新 State
   6. Store 通知所有订阅者（subscribe）
   7. View 收到通知，重新读取 State 并 re-render
   ```

4. **Redux 与 React 连接**
   ```jsx
   // react-redux 提供的 API
   import { Provider, useSelector, useDispatch } from 'react-redux';

   // 1. Provider 包裹应用根组件
   <Provider store={store}>
     <App />
   </Provider>

   // 2. 组件中使用 hooks
   function TodoList() {
     // 从 store 中读取 state
     const todos = useSelector(state => state.todos);
     const dispatch = useDispatch();

     return (
       <ul>
         {todos.map(todo => (
           <li key={todo.id}>
             {todo.text}
             <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
               删除
             </button>
           </li>
         ))}
       </ul>
     );
   }
   ```

5. **Middleware（中间件）的作用**
   ```
   Middleware 扩展了 Redux 的能力：

   redux-thunk：允许 dispatch 函数（异步 action）
   redux-saga：使用 Generator 管理副作用
   redux-logger：在控制台打印 action 日志
   redux-persist：持久化 state 到 localStorage

   工作流程：
   dispatch(action)
     → middleware 1 (logger: 记录 action)
     → middleware 2 (thunk: 如果是函数则执行)
     → reducer (计算新 state)
     → middleware 2 (thunk 后处理)
     → middleware 1 (logger: 记录新 state)
     → store 更新
   ```

### 🔍 追问链
1. **为什么要区分 action 和 reducer？不能直接修改 state 吗？**
   → 方向：单向数据流可预测、可追踪（devtools 记录每次 action）；直接修改 state 会导致数据流混乱难以调试
2. **Redux Toolkit 的 createSlice 和手写 reducer 相比省了什么？**
   → 方向：省去了 switch/case 样板代码、action creator 自动生成、immutable 更新由 immer 处理
3. **Redux 在 React 19 Server Components 中还能用吗？**
   → 方向：RSC 不能使用 hooks/context，但可以在 Client Component 边界内使用 RTK Query；或者用 server-only 数据获取替代

---

## Q39: Redux Toolkit (RTK) 的现代写法是怎样的？请介绍 createSlice 和 createAsyncThunk。

- **难度**：★★☆
- **知识点**：Redux Toolkit / 现代化 Redux / 最佳实践
- **题型**：代码实践题

### 参考答案要点：

1. **为什么使用 RTK？**
   ```
   传统 Redux 的问题：
   - 样板代码多（actions、reducers、constants 分散定义）
   - 手动写 immer 不可变更新容易出错
   - 配置 store 和 middleware 复杂
   - TypeScript 集成麻烦

   RTK 的解决方案：
   - 内置 Immer（可直接修改 state）
   - createSlice 合并 actions/reducers
   - createAsyncThunk 简化异步
   - 开箱即用的 devtools/configureStore
   - 优秀的 TypeScript 支持
   ```

2. **createSlice 基本用法**
   ```typescript
   // features/counter/counterSlice.ts
   import { createSlice, PayloadAction } from '@reduxjs/toolkit';

   // 定义 slice 的初始状态
   interface CounterState {
     value: number;
   }

   const initialState: CounterState = {
     value: 0,
   };

   // 创建 slice（同时生成 action creators 和 reducer）
   const counterSlice = createSlice({
     name: 'counter',  // slice 名称，会作为 action type 的前缀
     initialState,

     // 定义 reducers（自动生成对应的 action creators）
     reducers: {
       increment: (state) => {
         // ✅ 可以直接修改！RTK 内部使用 Immer
         state.value += 1;
       },

       decrement: (state) => {
         state.value -= 1;
       },

       // 带 payload 的 action
       incrementByAmount: (state, action: PayloadAction<number>) => {
         state.value += action.payload;
       },
     },
   });

   // 导出 action creators
   export const { increment, decrement, incrementByAmount } = counterSlice.actions;

   // 导出 reducer（用于配置 store）
   export default counterSlice.reducer;
   ```

3. **configureStore 配置**
   ```typescript
   // store.ts
   import { configureStore } from '@reduxjs/toolkit';
   import counterReducer from './features/counter/counterSlice';
   import userReducer from './features/user/userSlice';

   export const store = configureStore({
     reducer: {
       counter: counterReducer,
       user: userReducer,
     },
     // 开发模式下自动添加 redux-devtools 和 serializable check
     // 生产模式下自动移除
   });

   // 类型推断
   export type RootState = ReturnType<typeof store.getState>;
   export type AppDispatch = typeof store.dispatch;

   // 类型安全的 hooks
   export const useAppDispatch = () => useDispatch<AppDispatch>();
   export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
   ```

4. **createAsyncThunk 异步处理**
   ```typescript
   // features/user/userSlice.ts
   import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
   import axios from 'axios';

   // 定义 async thunk
   export const fetchUsers = createAsyncThunk(
     'users/fetchUsers',  // action type prefix
     async (_, { rejectWithValue }) => {
       try {
         const response = await axios.get('/api/users');
         return response.data;
       } catch (error) {
         return rejectWithValue(error.message);
       }
     }
   );

   interface UserState {
     users: User[];
     status: 'idle' | 'loading' | 'succeeded' | 'failed';
     error: string | null;
   }

   const userSlice = createSlice({
     name: 'users',
     initialState: { users: [], status: 'idle', error: null } as UserState,

     extraReducers: (builder) => {
       // 处理 async thunk 的三种生命周期状态
       builder
         .addCase(fetchUsers.pending, (state) => {
           state.status = 'loading';
         })
         .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
           state.status = 'succeeded';
           state.users = action.payload;
         })
         .addCase(fetchUsers.rejected, (state, action) => {
           state.status = 'failed';
           state.error = action.payload as string;
         });
     },
   });

   export default userSlice.reducer;
   ```

5. **在组件中使用**
   ```tsx
   function UserList() {
     const dispatch = useAppDispatch();
     const { users, status, error } = useAppSelector(state => state.users);

     useEffect(() => {
       if (status === 'idle') {
         dispatch(fetchUsers());
       }
   }, [status, dispatch]);

     switch (status) {
       case 'loading':
         return <Spinner />;
       case 'failed':
         return <Error message={error} />;
       case 'succeeded':
         return (
           <ul>
             {users.map(user => <li key={user.id}>{user.name}</li>)}
           </ul>
         );
       default:
         return null;
     }
   }
   ```

---

## Q40: TanStack Query (React Query) 是什么？它解决了什么问题？如何与服务端状态管理配合？

- **难度**：★★☆
- **知识点**：服务端状态 / React Query / 数据获取
- **题型**：应用题

### 参考答案要点：

1. **客户端状态 vs 服务端状态**
   ```
   客户端状态（Client State）：
   - UI 状态：开关、输入框值、模态框显隐
   - 管理：useState / useReducer / Redux / Zustand
   - 特点：完全由客户端控制

   服务端状态（Server State）：
   - 异步数据：API 返回的用户列表、文章内容
   - 特点：
     * 不由客户端完全拥有
     * 可能被其他人修改（异步更新）
     * 需要缓存策略
     * 需要处理加载/错误/过期状态

   TanStack Query 专门解决「服务端状态」的管理问题
   ```

2. **TanStack Query 核心概念**
   ```tsx
   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

   // useQuery：获取数据
   function Users() {
     const {
       data: users,
       isLoading,
       isError,
       error,
       refetch,            // 手动重新获取
       isFetching,         // 是否正在后台刷新
     } = useQuery({
       queryKey: ['users'],              // 缓存键
       queryFn: () => fetch('/api/users').then(r => r.json()),
       staleTime: 5 * 60 * 1000,         // 5 分钟内认为数据新鲜
       cacheTime: 10 * 60 * 1000,        // 10 分钟后清除缓存
       retry: 3,                          // 失败重试 3 次
       refetchOnWindowFocus: true,        // 窗口聚焦时重新获取
     });

     if (isLoading) return <Spinner />;
     if (isError) return <Error message={error.message} />;

     return (
       <ul>
         {users.map(user => <li key={user.id}>{user.name}</li>)}
       </ul>
     );
   }

   // useMutation：修改数据
   function CreateUserForm() {
     const queryClient = useQueryClient();

     const mutation = useMutation({
       mutationFn: (newUser) =>
         fetch('/api/users', {
           method: 'POST',
           body: JSON.stringify(newUser),
         }).then(r => r.json()),

       onSuccess: () => {
         // 成功后使相关查询失效，触发重新获取
         queryClient.invalidateQueries({ queryKey: ['users'] });
       },
     });

     return (
       <form onSubmit={(e) => {
         e.preventDefault();
         mutation.mutate({ name: 'New User' });
       }}>
         <button disabled={mutation.isLoading}>
           {mutation.isLoading ? '创建中...' : '创建用户'}
         </button>
       </form>
     );
   }
   ```

3. **核心功能详解**

   **缓存机制**
   ```
   queryKey: ['users', { page: 1 }]  // 数组形式的键

   缓存生命周期：
   fresh（新鲜）→ stale（过期）→ inactive（非活跃）→ garbage collected（回收）

   - fresh: 直接返回缓存，不发请求
   - stale: 返回缓存的同时后台重新获取（stale-while-revalidate）
   - inactive: 没有任何组件在使用，设置 gcTimer
   - gcTimer 到期后被清理
   ```

   **自动请求**
   ```
   - 组件挂载时自动发起请求
   - 窗口重新聚焦时重新获取（可配置）
   - 网络重连时重新获取
   - 定时轮询（refetchInterval）
   - 相关 mutation 成功后使缓存失效并重新获取
   ```

   **乐观更新（Optimistic Update）**
   ```tsx
   function LikeButton({ postId }) {
     const queryClient = useQueryClient();

     const likeMutation = useMutation({
       mutationFn: () => fetch(`/api/posts/${postId}/like`, { method: 'POST' }),

       onMutate: async () => {
         // 取消正在进行的请求，避免冲突
         await queryClient.cancelQueries({ queryKey: ['post', postId] });

         // 快照当前值
         const previousPost = queryClient.getQueryData(['post', postId]);

         // 乐观更新
         queryClient.setQueryData(['post', postId], (old: any) => ({
           ...old,
           likes: old.likes + 1,
           isLiked: true,
         }));

         return { previousPost };  // 用于回滚
       },

       onError: (err, variables, context) => {
         // 失败时回滚到快照
         queryClient.setQueryData(['post', postId], context.previousPost);
       },

       onSettled: () => {
         // 无论成功失败都重新获取确保一致性
         queryClient.invalidateQueries({ queryKey: ['post', postId] });
       },
     });

     return <button onClick={() => likeMutation.mutate()}>点赞</button>;
   }
   ```

4. **与 Redux 的关系**
   ```
   TanStack Query ≠ Redux 的替代品

   Redux：管理客户端状态（UI 状态、全局配置）
   TanStack Query：管理服务端状态（API 数据）

   最佳实践：两者搭配使用
   - Redux：用户认证、主题、表单状态、全局 UI 状态
   - TanStack Query：用户列表、文章数据、搜索结果

   也可以只用 TanStack Query + Context/Zustand 管理少量客户端状态
   ```

---

## Q41: React Router 的核心概念有哪些？如何实现路由守卫和权限控制？

- **难度**：★★☆
- **知识点**：路由 / React Router / 权限控制
- **题型**：综合应用题

### 参考答案要点：

1. **React Router v6 核心概念**
   ```tsx
   import { BrowserRouter, Routes, Route, Link, Navigate, useParams, useNavigate } from 'react-router-dom';

   function App() {
     return (
       <BrowserRouter>
         <Routes>
           {/* 精确匹配路径 */}
           <Route path="/" element={<HomePage />} />

           {/* 动态路由参数 */}
           <Route path="/users/:userId" element={<UserProfile />} />

           {/* 嵌套路由 */}
           <Route path="/dashboard" element={<DashboardLayout />}>
             <Route index element={<DashboardHome />} />
             <Route path="settings" element={<Settings />} />
             <Route path="profile" element={<Profile />} />
           </Route>

           {/* 404 页面 */}
           <Route path="*" element={<NotFound />} />
         </Routes>
       </BrowserRouter>
     );
   }
   ```

2. **常用 Hooks**
   ```tsx
   // useParams：获取路由参数
   function UserProfile() {
     const { userId } = useParams<{ userId: string }>();
     // ...
   }

   // useNavigate：编程式导航
   function LoginForm() {
     const navigate = useNavigate();

     const handleSubmit = async (values) => {
       const success = await login(values);
       if (success) {
         navigate('/dashboard');  // 替代 v5 的 useHistory
         // navigate(-1);  // 返回上一页
         // navigate('/dashboard', { replace: true });  // 替换历史记录
       }
     };
   }

   // useLocation：获取当前位置信息
   function SearchResults() {
     const location = useLocation();
     const queryParams = new URLSearchParams(location.search);
     const keyword = queryParams.get('q');
     // ...
   }

   // useSearchParams：专门处理查询参数
   function FilterPage() {
     const [searchParams, setSearchParams] = useSearchParams();
     const category = searchParams.get('category');

     const handleFilter = (cat: string) => {
       searchParams.set('category', cat);
       setSearchParams(searchParams);  // URL 会更新
     };
   }
   ```

3. **路由守卫与权限控制**
   ```tsx
   // 受保护的路由组件
   interface ProtectedRouteProps {
     children: React.ReactNode;
     allowedRoles?: string[];
   }

   function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
     const { isAuthenticated, user } = useAuth();  // 自定义 auth hook
     const location = useLocation();

     // 未登录：跳转到登录页，保存来源地址
     if (!isAuthenticated) {
       return <Navigate to="/login" state={{ from: location }} replace />;
     }

     // 角色检查
     if (allowedRoles && !allowedRoles.includes(user.role)) {
       return <Navigate to="/unauthorized" replace />;
     }

     return <>{children}</>;
   }

   // 使用
   function AppRoutes() {
     return (
       <Routes>
         {/* 公开页面 */}
         <Route path="/login" element={<LoginPage />} />
         <Route path="/public" element={<PublicPage />} />

         {/* 需要登录 */}
         <Route
           path="/dashboard"
           element={
             <ProtectedRoute>
               <Dashboard />
             </ProtectedRoute>
           }
         />

         {/* 需要特定角色 */}
         <Route
           path="/admin"
           element={
             <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
               <AdminPanel />
             </ProtectedRoute>
           }
         />
       </Routes>
     );
   }
   ```

4. **路由级别的数据加载（Loader）**
   ```tsx
   import { LoaderFunctionArgs, redirect } from 'react-router-dom';

   // 路由 loader：在渲染前加载数据
   const userProfileLoader: LoaderFunctionArgs = async ({ params }) => {
     const res = await fetch(`/api/users/${params.userId}`);
     if (!res.ok) {
       throw redirect('/login');  // 重定向
     }
     return res.json();
   };

   // 使用 loader
   <Route
     path="/users/:userId"
     element={<UserProfile />}
     loader={userProfileLoader}
   />

   // 在组件中获取 loader 数据
   function UserProfile() {
     const user = useLoaderData() as User;  // 类型安全
     // ...
   }
   ```

5. **懒加载路由（代码分割）**
   ```tsx
   import { lazy, Suspense } from 'react';

   // 懒加载路由组件
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   const AdminPanel = lazy(() => import('./pages/AdminPanel'));

   function App() {
     return (
       <Suspense fallback={<PageLoader />}>
         <Routes>
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/admin" element={<AdminPanel />} />
         </Routes>
       </Suspense>
     );
   }
   ```

---

# 第三部分：专家层（★★★）- 12 题

> **考察目标**：源码级原理、SSR/RSC、架构设计、工程化实践
>
> **适合人群**：3+ 年经验、技术负责人、准备高级面试、追求深度理解

---

## Q42: 请从源码角度解释 React Hooks 的实现原理。useState 和 useEffect 的内部实现是怎样的？

- **难度**：★★★
- **知识点**：Hooks 源码 / Fiber / 链表结构 / 内部实现
- **题型**：源码分析题

### 参考答案要点：

1. **Hooks 的数据结构**
   ```javascript
   // React 内部，每个 Fiber 节点都有一个 memoizedState 属性
   // 这是 hooks 链表的头节点

   // Hook 的基本结构
   function Hook() {
     this.memoizedState = null;    // 当前状态值（useState）或 effect 对象（useEffect）
     this.baseState = null;       // 基础状态（用于 useReducer 的跳过更新优化）
     this.baseQueue = null;       // 基础更新队列
     this.queue = null;           // 更新队列（存放 pending 的 setState）
     this.next = null;            // 指向下一个 hook（链表结构）
   }

   // Effect 的结构（用于 useEffect/useLayoutEffect/useInsertionEffect）
   function Effect() {
     this.tag = 0;                // Effect 标记位
     this.create = null;          // effect 函数本体
     this.destroy = undefined;    // 清理函数
     this.deps = null;            // 依赖数组
     this.next = null;            // 下一个 effect（单向链表）
   }
   ```

2. **useState 的简化实现**
   ```javascript
   // 全局变量：当前正在渲染的 Fiber 节点
   let currentlyRenderingFiber = null;
   // 全局变量：当前正在处理的 hook
   let workInProgressHook = null;
   // 全局变量：是否正在渲染（用于检测非法调用）
   let isRendering = false;

   function renderWithHooks(current, workInProgress, Component, props) {
     // 初始化全局变量
     currentlyRenderingFiber = workInProgress;
     isRendering = true;

     // 将 current Fiber 的 hook 链表挂载到 workInProgress
     // 这样可以复用上一次的 hook 状态
     workInProgress.memoizedState = current.memoizedState;

     // 重置当前 hook 指针
     workInProgressHook = workInProgress.memoizedState;

     // 执行组件函数
     const children = Component(props);

     // 清理
     isRendering = false;
     currentlyRenderingFiber = null;

     return children;
   }

   // useState 的简化实现
   function useState(initialState) {
     // 检查是否在渲染期间调用
     if (!isRendering) {
       throw new Error('Hooks can only be called inside the body of a function component.');
     }

     // 复用或创建新的 hook
     if (workInProgressHook === null) {
       // 第一个 hook
       workInProgressHook = {
         memoizedState: typeof initialState === 'function' ? initialState() : initialState,
         queue: { pending: null, dispatch: null },
         next: null,
       };
       currentlyRenderingFiber.memoizedState = workInProgressHook;
     } else {
       // 后续的 hook：沿链表向下
       workInProgressHook = workInProgressHook.next || {
         memoizedState: typeof initialState === 'function' ? initialState() : initialState,
         queue: { pending: null, dispatch: null },
         next: null,
       };
     }

     const hook = workInProgressHook;

     // 创建 dispatch 函数（setState）
     const dispatch = dispatchAction.bind(null, currentlyRenderingFiber, hook.queue);

     return [hook.memoizedState, dispatch];
   }

   // setState (dispatch) 的实现
   function dispatchAction(fiber, queue, action) {
     // 创建 update 对象
     const update = {
       action: action,           // 可以是值或函数 (state => newState)
       next: null,
     };

     // 将 update 加入队列（循环链表）
     if (queue.pending === null) {
       update.next = update;  // 自引用（只有一个元素时）
     } else {
       update.next = queue.pending.next;  // 插入到末尾
       queue.pending.next = update;
     }
     queue.pending = update;

     // 标记该 fiber 需要更新
     scheduleUpdateOnFiber(fiber);
   }

   // 状态处理（在 commit 阶段执行）
   function processUpdateQueue(hook) {
     let newState = hook.memoizedState;
     let queue = hook.queue;
     let first = queue.pending;

     if (first !== null) {
       // 循环链表，从头开始处理
       let update = first.next;
       do {
         if (typeof update.action === 'function') {
           // 函数式更新：newState = action(oldState)
           newState = update.action(newState);
         } else {
           // 直接设置新值
           newState = update.action;
         }
         update = update.next;
       } while (update !== first);  // 回到起点结束

       // 清空队列
       queue.pending = null;

       // 保存新状态
       hook.memoizedState = newState;
     }

     return newState;
   }
   ```

3. **useEffect 的简化实现**
   ```javascript
   function useEffect(create, deps) {
     // 同样使用链表管理，但挂在 fiber 的另一个位置
     // 或者与 useState 共用同一个链表（通过 tag 区分）

     const hook = mountWorkInProgressHook();  // 获取或创建 hook

     // 创建 effect 对象
     const effect = {
       tag: HookHasEffect | HookPassive,  // 标记：passive effect（异步）
       create: create,        // effect 函数
       destroy: undefined,    // 清理函数（首次为空）
       deps: deps,            // 依赖数组
       next: null,
     };

     hook.memoizedState = effect;

     // 将 effect 加入 fiber 的 effect 链表（稍后在 commit 阶段执行）
     currentlyRenderingFiber.flags |= PassiveEffect;  // 标记有 passive effect
     pushEffect(EffectPassive, create, destroy, deps);
   }

   // effect 执行时机（commit 阶段）
   function commitPassiveEffects(fiber) {
     // 遍历 effect 链表
     let effect = fiber.updateQueue?.lastEffect;

     while (effect !== null) {
       const { create, destroy, deps } = effect;

       if (deps !== null) {
         // 比较新旧依赖
         if (areHookInputsEqual(deps, prevDeps)) {
           // 依赖没变，跳过
         } else {
           // 依赖变了：先执行清理，再执行新 effect
           if (destroy !== undefined) destroy();
           const newDestroy = create();  // 执行 effect，获取新的清理函数
           effect.destroy = newDestroy;
         }
       }

       effect = effect.next;
     }
   }

   // 依赖比较算法
   function areHookInputsEqual(nextDeps, prevDeps) {
     if (prevDeps === null) return false;  // 首次执行
     for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
       if (!Object.is(nextDeps[i], prevDeps[i])) {
         return false;
       }
     }
     return true;
   }
   ```

4. **Hooks 链表的完整图示**
   ```
   组件 Example:
     const [count, setCount] = useState(0);      // Hook 1
     const [name, setName] = useState('Alice');   // Hook 2
     useEffect(() => { ... }, [count]);            // Hook 3
     const ref = useRef(null);                     // Hook 4

   Fiber.memoizedState:
   ┌──────────────────────────────────────────────────────┐
   │ Hook 1 (useState - count)                            │
   │  memoizedState: 0                                    │
   │  queue: {...}                                        │
   │  next ─────────────────────────────────┐             │
   ├─────────────────────────────────────────│────────────┤
   │ Hook 2 (useState - name)               ←│             │
   │  memoizedState: 'Alice'                             │
   │  next ─────────────────────────────────┤             │
   ├─────────────────────────────────────────│────────────┤
   │ Hook 3 (useEffect)                     ←│             │
   │  memoizedState: {create, destroy, deps}              │
   │  next ─────────────────────────────────┤             │
   ├─────────────────────────────────────────│────────────┤
   │ Hook 4 (useRef)                        ←│             │
   │  memoizedState: {current: null}                      │
   │  next: null                                         │
   └──────────────────────────────────────────────────────┘

   关键：
   - 每次渲染按相同顺序遍历此链表
   - 顺序错乱会导致读取错误的状态
   - 这就是为什么 Hooks 不能在条件语句中调用
   ```

5. **不同类型 Effect 的执行时机**
   ```
   Mount 阶段：
   1. useInsertionEffect（CSS-in-JS 库使用）
   2. useLayoutEffect（同步，浏览器绘制前）
   3. useEffect（异步，浏览器绘制后）

   Update 阶段：
   1. 先执行所有 cleanup（destroy）函数
   2. 再按顺序执行新的 effect（create）

   Unmount 阶段：
   - 执行所有 cleanup 函数
   ```

### 深度拓展：手写实现

#### 完整的 mini-react Hooks 系统

```javascript
// ==================== Mini-React Hooks 系统完整实现 ====================
/**
 * 这是一个简化但完整的 React Hooks 实现
 * 包含：useState, useEffect, useReducer, useRef, useCallback, useMemo
 * 以及核心的调度系统和 Fiber 节点上的 hooks 链表管理
 */

// ════════════════════════════════════════════════════════════════
// 第一部分：全局变量和基础数据结构
// ════════════════════════════════════════════════════════════════

// 全局变量：当前正在渲染的 Fiber 节点（组件函数执行期间有效）
let currentlyRenderingFiber = null;

// 全局变量：当前正在处理的 hook 节点（hooks 链表的游标）
let workInProgressHook = null;

// 全局变量：是否正在渲染（用于检测非法调用）
let isRendering = false;

// Hook 数据结构定义
function Hook() {
  this.memoizedState = null;    // 当前状态值（useState）或 effect 对象（useEffect）
  this.baseState = null;       // 基础状态（用于跳过更新的优化）
  this.baseQueue = null;       // 基础更新队列（被跳过的更新）
  this.queue = null;           // 更新队列（存放 pending 的 setState/dispatch）
  this.next = null;            // 指向下一个 hook（形成链表）
}

// Effect 数据结构定义（用于 useEffect/useLayoutEffect）
function Effect() {
  this.tag = 0;                // Effect 标记位（区分不同类型）
  this.create = null;          // effect 函数本体（用户传入的回调）
  this.destroy = undefined;    // 清理函数（create 返回的函数）
  this.deps = null;            // 依赖数组
  this.next = null;            // 下一个 effect（单向链表）
}

// Update 对象（存放在 queue 中，代表一次状态更新）
function Update(action) {
  this.action = action;        // 更新动作（新值或函数 (prev => newValue)）
  this.next = null;            // 指向下一个 update（循环链表）
}

// UpdateQueue（更新队列）
function UpdateQueue(pendingQueue) {
  this.pending = pendingQueue; // 待处理的更新（循环链表）
  this.dispatch = null;        // dispatch 函数引用（setState 返回的函数）
  this.lastRenderedState = null; // 上一次渲染时的状态值
}

console.log('✅ 基础数据结构定义完成');
```

#### 核心函数：mountWorkInProgressHook 和 updateWorkInProgressHook

```javascript
// ════════════════════════════════════════════════════════════════
// 第二部分：Hooks 链表的核心操作
// ════════════════════════════════════════════════════════════════

/**
 * mountWorkInProgressHook - 首次渲染时创建新的 hook 节点
 *
 * 首次渲染时（组件第一次挂载），hooks 链表是空的
 * 每调用一个 hook（如 useState），就创建一个新的 Hook 对象并加入链表
 */
function mountWorkInProgressHook() {
  const hook = new Hook();           // 创建新的 Hook 对象

  // 如果这是第一个 hook，将其设为链表头
  if (workInProgressHook === null) {
    currentlyRenderingFiber.memoizedState = hook;
  } else {
    // 否则，将其链接到上一个 hook 的 next 上
    workInProgressHook.next = hook;
  }

  // 移动游标到当前这个新创建的 hook
  workInProgressHook = hook;

  return hook;
}

/**
 * updateWorkInProgressHook - 更新时复用已有的 hook 节点
 *
 * 组件重新渲染时（因为 setState 触发了更新），hooks 链表已经存在
 * 只需要按顺序遍历已有的链表，读取/更新每个 hook 的状态
 *
 * ⚠️ 这就是为什么 hooks 必须按相同顺序调用的原因！
 *    如果顺序变了，会读到错误的 hook！
 */
function updateWorkInProgressHook() {
  let nextCurrentHook;

  if (currentHook === null) {
    // 当前 hook 是链表中的第一个
    const current = currentlyRenderingFiber.alternate;
    if (current !== null) {
      nextCurrentHook = current.memoizedState;
    } else {
      nextCurrentHook = null;
    }
  } else {
    // 移动到下一个 hook
    nextCurrentHook = currentHook.next;
  }

  let nextWorkInProgressHook;
  if (workInProgressHook === null) {
    // workInProgress 链表为空（首次构建 workInProgress 树时）
    nextWorkInProgressHook = currentlyRenderingFiber.memoizedState;
  } else {
    // 移动到下一个 hook
    nextWorkInProgressHook = workInProgressHook.next;
  }

  if (nextWorkInProgressHook !== null) {
    // ✅ 已有可复用的 workInProgress hook（说明之前已经创建过）
    // 直接移动游标即可，不需要创建新对象（性能优化）
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;

    currentHook = nextCurrentHook;
  } else {
    // ❌ 没有可复用的（hooks 数量比上次多了？或者 clone 了 fiber）
    // 这种情况不应该发生，如果发生了说明代码有 bug
    invariant(
      nextCurrentHook !== null,
      'Rendered more hooks than during the previous render.'
    );

    // 创建新的 hook 并复制旧 hook 的状态
    currentHook = nextCurrentHook;

    const newHook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,
      next: null,
    };

    if (workInProgressHook === null) {
      currentlyRenderingFiber.memoizedState = newHook;
    } else {
      workInProgressHook.next = newHook;
    }
    workInProgressHook = newHook;
  }

  return workInProgressHook;
}
```

#### useState 内部实现（dispatchAction + processUpdateQueue）

```javascript
// ════════════════════════════════════════════════════════════════
// 第三部分：useState 的完整内部实现
// ════════════════════════════════════════════════════════════════

/**
 * useState - 用户使用的 API
 * @param {*} initialState - 初始状态值或初始化函数
 * @returns {[*, Function]} [stateValue, dispatchFunction]
 */
function useState(initialState) {
  // 判断是首次渲染还是更新渲染
  if (currentlyRenderingFiber.alternate === null || currentlyRenderingFiber.alternate.memoizedState === null) {
    // 首次渲染 → 使用 mount 逻辑
    return mountState(initialState);
  } else {
    // 更新渲染 → 使用 update 逻辑
    return updateState(initialState);
  }
}

/**
 * mountState - useState 的首次渲染逻辑
 */
function mountState(initialState) {
  const hook = mountWorkInProgressHook();  // 创建新的 hook 节点

  // 处理初始状态（支持惰性初始化）
  if (typeof initialState === 'function') {
    // 如果传入的是函数，调用它获取初始值（惰性初始化）
    // 这样可以避免昂贵的计算在每次渲染都执行
    initialState = initialState();
  }

  hook.memoizedState = hook.baseState = initialState;  // 记录初始状态

  // 创建更新队列（循环链表结构）
  const queue = new UpdateQueue(null);
  hook.queue = queue;

  // ⭐⭐⭐ 核心：创建 dispatch 函数（就是 setState）⭐⭐⭐
  const dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue);
  queue.dispatch = dispatch;

  // 返回 [当前状态, dispatch 函数]
  return [hook.memoizedState, dispatch];
}

/**
 * updateState - useState 的更新渲染逻辑
 */
function updateState(initialState) {
  const hook = updateWorkInProgressHook();  // 复用已有的 hook 节点

  const queue = hook.queue;

  // ⭐⭐⭐ 核心：处理更新队列，计算最新状态 ⭐⭐⭐
  hook.memoizedState = processUpdateQueue(
    hook.baseState,
    queue,
    hook,
  );

  return [hook.memoizedState, queue.dispatch];
}

/**
 * dispatchAction - setState 的内部实现
 *
 * 这是 React 批量更新的核心！
 * 当你调用 setState(1) 时，实际执行的是这个函数
 *
 * @param {Fiber} fiber - 当前组件的 Fiber 节点
 * @param {UpdateQueue} queue - 该 state 的更新队列
 * @param {*} action - 新的状态值或更新函数
 */
function dispatchAction(fiber, queue, action) {
  // 1️⃣ 创建 Update 对象
  const update = new Update(action);

  // 2️⃣ 将 Update 加入循环链表（O(1) 操作）
  if (queue.pending === null) {
    // 第一个 update，指向自己（循环链表）
    update.next = update;
  } else {
    // 插入到 pending 链表的末尾
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;  // pending 指向最后一个 update

  console.log(`📝 dispatchAction: 添加了更新 ${typeof action === 'function' ? '(函数)' : action}`);

  // 3️⃣ 调度更新（告诉 React 需要重新渲染）
  scheduleUpdateOnFiber(fiber);
}

/**
 * processUpdateQueue - 处理状态更新队列
 *
 * 这是计算最终状态值的函数
 * 它会遍历整个更新队列，依次应用每个 update
 *
 * @param {*} baseState - 基础状态（上一次的 memoizedState）
 * @param {UpdateQueue} queue - 更新队列
 * @param {Hook} hook - 当前的 hook 节点
 * @returns {*} 计算后的最新状态
 */
function processUpdateQueue(baseState, queue, hook) {
  let newState = baseState;          // 从基础状态开始
  let first = queue.pending;         // 取出待处理的更新链表
  let update = first;                // 从第一个 update 开始遍历

  if (first !== null) {
    let doWhileLoopCounter = 0;      // 安全计数器（防止死循环）

    // 遍历循环链表中的所有 update
    do {
      const action = update.action;

      if (typeof action === 'function') {
        // 🔸 函数式更新：(prevState) => newState
        // 例如：setCount(c => c + 1)
        newState = action(newState);
        console.log(`  🔄 应用函数式更新: ${newState}`);
      } else {
        // 🔸 直接赋值更新：newValue
        // 例如：setState(10)
        newState = action;
        console.log(`  🔄 应用直接赋值: ${newState}`);
      }

      update = update.next;  // 移动到下一个 update
      doWhileLoopCounter++;

      // 安全检查：防止无限循环（理论上不应该发生）
      if (doWhileLoopCounter > 1000) {
        console.error('⚠️ 更新队列可能存在无限循环！');
        break;
      }
    } while (update !== first);  // 循环条件：回到起点则结束

    // 清空已处理的更新队列
    queue.pending = null;
  }

  // 记录本次渲染后的状态
  queue.lastRenderedState = newState;

  return newState;
}
```

#### scheduleUpdateOnFiber 和调度系统

```javascript
// ════════════════════════════════════════════════════════════════
// 第四部分：调度系统（触发重新渲染）
// ════════════════════════════════════════════════════════════════

/**
 * scheduleUpdateOnFiber - 调度 Fiber 节点的更新
 *
 * 这个函数是连接 "setState" 和 "重新渲染" 的桥梁
 * 它负责：
 * 1. 标记该 Fiber 及其祖先需要更新
 * 2. 根据 Lane 优先级决定何时调度
 * 3. 可能触发批量更新合并
 */
function scheduleUpdateOnFiber(fiber) {
  // 1. 标记该节点需要更新
  markUpdate(fiber);

  // 2. 向上冒泡，标记所有祖先节点也需要更新（子树更新会影响父级）
  let parent = fiber.return;
  while (parent !== null) {
    markChildNeedsUpdate(parent);
    parent = parent.return;
  }

  // 3. 根据当前环境决定调度策略
  if (isBatchingUpdates) {
    // 🎯 批量更新模式：
    // 不立即渲染，而是将任务放入队列
    // 等当前事件处理完毕后统一渲染
    console.log('📦 批量更新模式：延迟渲染');
    enqueueUpdate(fiber);
  } else {
    // 🚀 同步模式：
    // 立即开始渲染（如 setTimeout、Promise 回调中的 setState）
    console.log('🚀 同步模式：立即渲染');
    performSyncWorkOnRoot(fiber);
  }
}

/**
 * renderWithHooks - 渲染组件并设置 Hooks 环境
 *
 * 这是 React 在执行组件函数前后的包装器
 * 负责初始化和清理全局变量
 */
function renderWithHooks(current, workInProgress, Component, props) {
  // ========== 渲染前的准备工作 ==========
  currentlyRenderingFiber = workInProgress;  // 设置全局变量
  isRendering = true;

  // 将 current Fiber 的 hook 链表挂载到 workInProgress
  // 这样可以复用上一次的 hook 状态
  workInProgress.memoizedState = current?.memoizedState ?? null;

  // 重置当前 hook 指针（从链表头开始遍历）
  workInProgressHook = workInProgress.memoizedState;
  currentHook = current?.memoizedState ?? null;

  console.log('\n🔄 开始渲染组件:', Component.name || 'Anonymous');

  // ========== 执行组件函数 ==========
  // 在这里，用户的组件代码被执行
  // 用户代码中调用的 useState、useEffect 等 hooks 会使用全局变量
  const children = Component(props);  // ← 这里执行你的组件代码！

  // ========== 渲染后的清理工作 ==========
  isRendering = false;
  currentlyRenderingFiber = null;     // 清空全局变量
  workInProgressHook = null;          // 清空游标
  currentHook = null;

  console.log('✅ 组件渲染完成\n');

  return children;  // 返回 JSX
}
```

#### useEffect 的完整实现

```javascript
// ════════════════════════════════════════════════════════════════
// 第五部分：useEffect 的完整实现
// ════════════════════════════════════════════════════════════════

/**
 * useEffect - 用户 API
 * @param {Function} create - effect 函数
 * @param {Array|null} deps - 依赖数组
 */
function useEffect(create, deps) {
  if (currentlyRenderingFiber.alternate === null) {
    return mountEffect(create, deps);
  } else {
    return updateEffect(create, deps);
  }
}

/**
 * mountEffect - useEffect 的首次渲染逻辑
 */
function mountEffect(create, deps) {
  const hook = mountWorkInProgressHook();

  // 创建 Effect 对象
  const effect = new Effect();
  effect.tag = PassiveEffect;  // 标记为 passive effect（异步执行）
  effect.create = create;      // 保存 effect 函数
  effect.deps = deps;          // 保存依赖数组
  effect.destroy = undefined;  // 还没有 cleanup 函数

  // 将 effect 存入 hook 的 memoizedState
  hook.memoizedState = effect;

  // 将 effect 加入 Fiber 的副作用链表（commit 阶段会遍历此链表）
  currentlyRenderingFiber.flags |= Passive;  // 标记有 passive effect

  // 将 effect 推入组件的 effects 链表
  pushEffect(PassiveEffect, create, undefined, deps);
}

/**
 * updateEffect - useEffect 的更新渲染逻辑
 */
function updateEffect(create, deps) {
  const hook = updateWorkInProgressHook();

  // 取出上一次的 effect
  const prevEffect = hook.memoizedState;

  if (deps !== null) {
    // 比较新旧依赖数组
    if (areHookInputsEqual(deps, prevEffect.deps)) {
      // ✅ 依赖没变 → 跳过本次 effect 执行
      // 但仍需要将 effect 放入链表（保持结构一致）
      pushEffect(PassiveEffect, create, prevEffect.destroy, deps);
      hook.memoizedState = prevEffect;  // 复用旧的 effect
      return;
    }
  }

  // ❌ 依赖变了 → 需要重新执行
  // 先创建新的 effect
  const effect = new Effect();
  effect.tag = PassiveEffect;
  effect.create = create;
  effect.deps = deps;
  effect.destroy = undefined;

  hook.memoizedState = effect;

  // 将 effect 推入链表
  pushEffect(PassiveEffect, create, prevEffect.destroy, deps);

  // 标记需要执行 effect
  currentlyRenderingFiber.flags |= Passive;
}

/**
 * areHookInputsEqual - 比较两个依赖数组
 */
function areHookInputsEqual(nextDeps, prevDeps) {
  if (prevDeps === null) return false;  // 首次渲染，肯定要执行

  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (!Object.is(nextDeps[i], prevDeps[i])) {
      return false;  // 有变化
    }
  }

  return true;  // 全部相同
}

/**
 * pushEffect - 将 effect 加入组件的副作用链表
 */
function pushEffect(tag, create, destroy, deps) {
  const effect = new Effect();
  effect.tag = tag;
  effect.create = create;
  effect.destroy = destroy;
  effect.deps = deps;
  effect.next = null;

  // 获取组件 Fiber 上的 lastEffect
  let lastEffect = currentlyRenderingFiber.lastEffect;

  if (lastEffect === null) {
    // 第一个 effect
    currentlyRenderingFiber.firstEffect = effect;
    currentlyRenderingFiber.lastEffect = effect;
  } else {
    // 链接到末尾
    lastEffect.next = effect;
    currentlyRenderingFiber.lastEffect = effect;
  }

  return effect;
}
```

#### Fiber 节点上 Hooks 链表的完整示例

```javascript
// ════════════════════════════════════════════════════════════════
// 第六部分：完整示例演示 - Hooks 链表的创建和遍历过程
// ════════════════════════════════════════════════════════════════

function demoMiniReactHooks() {
  console.log('\n'.repeat(2));
  console.log('=' .repeat(70));
  console.log('🎯 Mini-React Hooks 系统完整演示');
  console.log('='.repeat(70));

  // 定义一个使用了多个 hooks 的组件
  function CounterComponent(props) {
    console.log('  ▶ 执行 CounterComponent 函数体...');

    // Hook 1: useState
    const [count, setCount] = useState(0);
    console.log(`    useState(0) → count=${count}`);

    // Hook 2: useState
    const [name, setName] = useState('Alice');
    console.log(`    useState('Alice') → name=${name}`);

    // Hook 3: useEffect
    useEffect(() => {
      console.log(`    ✨ useEffect 执行: count 变成了 ${count}`);
      return () => console.log(`    🧹 cleanup: count 从 ${count} 变化`);
    }, [count]);

    // Hook 4: useRef
    const ref = { current: null };  // 简化的 useRef
    console.log(`    useRef(null)`);

    return (
      `Count: ${count}, Name: ${name}`  // 简化返回
    );
  }

  // 模拟 Fiber 节点
  const mockFiber = {
    tag: 0,                    // FunctionComponent
    type: CounterComponent,
    memoizedState: null,       // hooks 链表头（初始为空）
    alternate: null,           // 首次渲染无 alternate
    flags: 0,
    firstEffect: null,
    lastEffect: null,
    return: null,
    child: null,
    sibling: null,
  };

  console.log('\n📍 第一次渲染（Mount）：\n');

  // 使用 renderWithHooks 包装渲染
  const result1 = renderWithHooks(null, mockFiber, CounterComponent, {});

  // 打印 hooks 链表结构
  console.log('\n📊 渲染后的 Hooks 链表结构:');
  printHooksChain(mockFiber.memoizedState);

  console.log('\n📍 第二次渲染（Update - setCount(5)）：\n');

  // 模拟 setCount(5)
  console.log('  调用 setCount(5)...');
  dispatchAction(mockFiber, mockFiber.memoizedState.queue, 5);

  // 再次渲染
  const result2 = renderWithHooks(mockFiber, mockFiber, CounterComponent, {});

  console.log('\n📊 更新后的 Hooks 链表结构:');
  printHooksChain(mockFiber.memoizedState);

  console.log('\n💡 关键观察点:');
  console.log('  • 首次渲染：创建了 4 个 Hook 节点，通过 .next 形成链表');
  console.log('  • 更新渲染：复用了相同的 Hook 节点，只更新了 memoizedState');
  console.log('  • 顺序一致性：两次渲染必须以相同顺序调用 hooks');
  console.log('  • 链表遍历：通过 workInProgressHook 游标逐个访问');
}

/**
 * 辅助函数：打印 hooks 链表
 */
function printHooksChain(firstHook) {
  let hook = firstHook;
  let index = 0;

  console.log('  ┌──────────────────────────────────────────────┐');

  while (hook !== null) {
    const stateType = index === 2 ? 'Effect' : 'State';
    const stateValue = index === 2
      ? `{create: fn, destroy: ${hook.memoizedState?.destroy ? 'fn' : 'undefined'}}`
      : JSON.stringify(hook.memoizedState);

    console.log(`  │ Hook ${index + 1} (${stateType})`);
    console.log(`  │   memoizedState: ${stateValue}`);
    console.log(`  │   queue: ${hook.queue ? '有' : '无'}pending updates`);

    if (hook.next) {
      console.log(`  │   ↓ next`);
    }

    hook = hook.next;
    index++;
  }

  console.log('  └──────────────────────────────────────────────┘');
  console.log(`  共 ${index} 个 Hook 节点`);
}

// 运行演示
demoMiniReactHooks();
```

---

## Q43: React.memo、useMemo 和 useCallback 的正确使用方式是什么？如何判断是否需要优化？

- **难度**：★★★
- **知识点**：性能优化 / 渲染优化 / 记忆化 / 最佳实践
- **题型**：最佳实践题 + 性能分析题

### 参考答案要点：

1. **React.memo 的工作原理**
   ```jsx
   // React.memo 是一个高阶组件
   // 它对 props 进行浅比较（shallow comparison），如果 props 没变则跳过渲染

   // 基本用法
   const MemoizedComponent = React.memo(function MyComponent(props) {
     /* 只在 props 变化时重新渲染 */
   });

   // 自定义比较函数（深度比较场景）
   const MemoizedList = React.memo(
     function List({ items }) {
       return <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
     },
     (prevProps, nextProps) => {
       // 返回 true 表示不需要重新渲染
       // 返回 false 表示需要重新渲染
       // 注意：这与 shouldComponentUpdate 的返回值相反！
       return prevProps.items.length === nextProps.items.length &&
         prevProps.items.every((item, index) =>
           item.id === nextProps.items[index].id && item.name === nextProps.items[index].name
         );
     }
   );
   ```

2. **React.memo 的失效场景**
   ```jsx
   // ❌ 场景 1：props 中包含函数（每次渲染都是新函数）
   function Parent() {
     const [count, setCount] = useState(0);

     const handleClick = () => console.log('clicked');  // 每次渲染都是新函数

     return (
       <>
         <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
         {/* 即使 count 变化与 Child 无关，Child 也会重渲染 */}
         <MemoizedChild onClick={handleClick} />
       </>
     );
   }

   // ✅ 解决：使用 useCallback 稳定函数引用
   function OptimizedParent() {
     const [count, setCount] = useState(0);

     const handleClick = useCallback(() => {
       console.log('clicked');
   }, []);  // 空依赖，永远返回同一函数

     return (
       <>
         <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
         <MemoizedChild onClick={handleClick} />  {/* props 引用不变 */}
       </>
     );
   }

   // ❌ 场景 2：props 中包含对象/数组（每次渲染都是新对象）
   function BadParent() {
     return <MemoizedChild config={{ theme: 'dark' }} />;  // 每次都是新对象！
   }

   // ✅ 解决：使用 useMemo 稳定对象引用
   function GoodParent() {
     const config = useMemo(() => ({ theme: 'dark' }), []);
     return <MemoizedChild config={config} />;
   }
   ```

3. **性能优化的正确流程**
   ```
   Step 1: 使用 Profiler 确认存在性能问题
   ─────────────────────────────────────────
   - 打开 React DevTools → Profiler 面板
   - 录制用户操作
   - 找出渲染时间长的组件
   - 确认是不必要的重渲染导致的

   Step 2: 分析重渲染原因
   ─────────────────────────────────────────
   - 为什么父组件重渲染会带动子组件？
   - 是 props 变了？还是 props 引用变了但内容没变？
   - 子组件真的需要每次都重渲染吗？

   Step 3: 选择合适的优化策略
   ─────────────────────────────────────────
   - React.memo：防止不必要的子组件重渲染
   - useMemo：缓存计算结果和对象/数组
   - useCallback：缓存回调函数

   Step 4: 验证优化效果
   ─────────────────────────────────────────
   - 再次使用 Profiler 测量
   - 确认渲染次数减少
   - 确认用户体验改善
   ```

4. **过度优化的反模式**
   ```jsx
   // ❌ 反模式 1：无差别地给所有组件加 memo
   export default React.memo(MyComponent);  // 不先测量就加

   // ❌ 反模式 2：过早 useMemo 简单值
   const double = useMemo(() => count * 2, [count]);  // 乘法很快，不需要缓存

   // ❌ 反模式 3：复杂的自定义比较函数
   const HeavyComparison = React.memo(Component, (prev, next) => {
     // 写了一堆复杂逻辑来比较...
     // 可能比直接渲染还慢！
   });

   // ✅ 正确的做法
   // 1. 先写清晰、正确的代码
   // 2. 发现性能问题时再优化
   // 3. 用数据驱动优化决策
   ```

5. **实际案例：列表渲染优化**
   ```tsx
   interface Item {
     id: string;
     name: string;
     price: number;
   }

   // 未优化版本
   function ItemList({ items, onItemClick }: { items: Item[]; onItemClick: (id: string) => void }) {
     return (
       <ul>
         {items.map(item => (
           <ItemRow key={item.id} item={item} onClick={onItemClick} />
         ))}
       </ul>
     );
   }

   // 问题：任何 state 变化都会导致所有 ItemRow 重渲染

   // 优化后版本
   const ItemRow = React.memo(function ItemRow({ item, onClick }: { item: Item; onClick: (id: string) => void }) {
     return (
       <li onClick={() => onClick(item.id)}>
         {item.name} - ${item.price}
       </li>
     );
   });

   function OptimizedItemList({ items, onItemClick }: { items: Item[]; onItemClick: (id: string) => void }) {
     // 稳定 onClick 引用
     const handleItemClick = useCallback((id: string) => {
       onItemClick(id);
     }, [onItemClick]);

     return (
      <ul>
        {items.map(item => (
          <ItemRow key={item.id} item={item} onClick={handleItemClick} />
        ))}
      </ul>
    );
  }
  ```

### 🔍 追问链
1. **React.memo 的浅比较是怎么实现的？Object.is 还是 === ？**
   → 方向：React 使用 Object.is（注意 Object.is(NaN, NaN) = true, Object.is(+0, -0) = false）
2. **useMemo 的计算函数什么时候会被重新执行？依赖数组是引用比较还是值比较？**
   → 方向：依赖数组的每个元素用 Object.is 比较；如果 deps 是 [] 则只在 mount 后执行一次
3. **过度使用 memo/useMemo/callback 会有什么副作用？**
   → 方向：内存开销（缓存结果占内存）、代码可读性下降、隐藏真正的性能瓶颈（过早优化）

---

## Q44: 虚拟长列表的原理是什么？react-window 是如何实现的？

- **难度**：★★★
- **知识点**：虚拟滚动 / 性能优化 / react-window / 大数据渲染
- **题型**：原理分析题 + 实践题

### 参考答案要点：

1. **问题背景**
   ```
   问题：渲染 10000 条列表项的性能瓶颈

   DOM 节点数：10000 个 li 元素
   内存占用：~50-100MB（取决于每项复杂度）
   首屏渲染时间：500ms-2000ms
   滚动卡顿：严重

   用户视角：
   - 视口高度：600px
   - 每项高度：50px
   - 可见数量：约 12 项
   - 其余 9988 项都在视口外，用户看不到！

   核心思想：只渲染可见区域 + 少量缓冲区的项目
   ```

2. **虚拟滚动的核心原理**
   ```javascript
   // 虚拟列表的核心计算逻辑
   class VirtualScroller {
     constructor(options) {
       this.itemCount = options.itemCount;       // 总条目数
       this.itemSize = options.itemSize || 50;   // 每项高度（固定）
       this.height = options.height || 600;      // 容器高度
       this.overscanCount = options.overscanCount || 5;  // 缓冲区大小
     }

     // 计算可见范围
     getVisibleRange(scrollTop) {
       const startIndex = Math.floor(scrollTop / this.itemSize);
       const endIndex = Math.min(
         startIndex + Math.ceil(this.height / this.itemSize),
         this.itemCount - 1
       );

       // 加上缓冲区
       const bufferedStart = Math.max(0, startIndex - this.overscanCount);
       const bufferedEnd = Math.min(this.itemCount - 1, endIndex + this.overscanCount);

       return {
         start: bufferedStart,
         end: bufferedEnd,
         offset: bufferedStart * this.itemSize,  // 顶部偏移量
       };
     }
   }

   // 使用示例
   // 总共 100000 条，只渲染 ~22 条（12 可见 + 10 缓冲）
   const scroller = new VirtualScroller({
     itemCount: 100000,
     itemSize: 50,
     height: 600,
   });

   scroller.getVisibleRange(2500);  // scrollTop = 2500
   // → { start: 45, end: 66, offset: 2250 }
   // 只需要渲染索引 45-66 的项目（22 个）
   ```

3. **react-window 的实现细节**
   ```jsx
   import { FixedSizeList as List } from 'react-window';

   // 基础用法
   function VirtualList({ items }) {
     const Row = ({ index, style }) => (
       <div style={style}>
         Item {items[index].name}
       </div>
     );

     return (
       <List
         height={600}          // 容器高度
         itemCount={items.length}  // 总条目数
         itemSize={50}         // 每行高度
         width="100%"
       >
         {Row}
       </List>
     );
   }

   // 内部工作原理（简化版）：
   // 1. 监听 scroll 事件
   // 2. 计算 scrollTop 对应的起始索引
   // 3. 计算可见范围内的索引列表
   // 4. 为每个可见项生成绝对定位的 div
   // 5. 设置 transform 或 top 来定位
   // 6. 使用 CSS transform 代替 top 以启用 GPU 加速
   ```

4. **动态高度的虚拟列表**
   ```jsx
   import { VariableSizeList as List } from 'react-window';

   // 当每项高度不固定时
   function DynamicHeightList({ items }) {
     // 需要提供获取每项高度的函数
     const getItemSize = (index) => {
       // 根据内容动态计算高度
       const item = items[index];
       if (item.type === 'header') return 80;
       if (item.type === 'detail') return 120;
       return 50;  // 默认
     };

     const Row = ({ index, style }) => (
       <div style={style}>
         {/* 内容可能影响高度，需要预估 */}
         <DynamicContent item={items[index]} />
       </div>
     );

     return (
       <List
         height={600}
         itemCount={items.length}
         getItemSize={getItemSize}
         width="100%"
       >
         {Row}
       </List>
     );
   }

   // 更复杂的方案：使用 react-window 的 Measure 组件
   // 先渲染一次测量真实尺寸，再缓存起来
   ```

5. **Grid 虚拟化（二维）**
   ```jsx
   import { FixedSizeGrid as Grid } from 'react-window';

   // 用于表格、日历等二维布局
   function VirtualGrid({ data, columns }) {
     const Cell = ({ columnIndex, rowIndex, style }) => (
       <div style={style}>
         {data[rowIndex]?.[columns[columnIndex]]}
       </div>
     );

     return (
       <Grid
         columnCount={columns.length}
         columnWidth={() => 150}
         height={600}
         rowCount={data.length}
         rowHeight={() => 50}
         width={900}
       >
         {Cell}
       </Grid>
     );
   }
   ```

6. **性能对比数据**
   ```
   10000 条数据的渲染性能对比：

   方案                    DOM 节点数    内存占用    首屏时间    滚动 FPS
   ─────────────────────────────────────────────────────────────────
   普通列表                 10,000       ~80MB      ~1200ms    15-30
   react-window             ~25          ~5MB       ~20ms      60
   react-virtualized        ~25          ~6MB       ~25ms      58-60
   @tanstack/virtual        ~25          ~4MB       ~15ms      60

   结论：虚拟列表将性能提升 50-100 倍
   ```

### 深度拓展：手写实现

#### 简化版 FixedSizeList 虚拟列表组件（完整可运行）

```javascript
// ==================== 简化版 FixedSizeList 实现 ====================
/**
 * 这是一个完整可运行的虚拟长列表组件
 * 模拟 react-window 的 FixedSizeList 核心功能
 *
 * 核心原理：
 * 1. 只渲染可视区域内的项目 + 少量缓冲区
 * 2. 使用绝对定位将渲染的项目放置在正确的位置
 * 3. 用一个占位元素撑开容器的总高度，使滚动条正常工作
 * 4. 监听滚动事件，动态计算并更新可见范围
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * FixedSizeList - 固定行高的虚拟列表组件
 *
 * @param {Object} props
 * @param {number} props.height - 容器高度（px）
 * @param {number} props.itemCount - 总数据量
 * @param {number} props.itemSize - 每个列表项的高度（px）
 * @param {Function} props.children - 渲染函数：(index: number) => ReactNode
 * @param {number} [props.overscanCount=5] - 可见区域上下额外渲染的数量（缓冲区）
 * @param {string} [props.width='100%'] - 容器宽度
 * @param {Object} [props.style] - 额外的容器样式
 * @param {string} [props.className] - 容器的 CSS 类名
 * @param {Function} props.onScroll - 滚动事件回调 (scrollTop: number) => void
 */
function FixedSizeList({
  height = 400,
  itemCount,
  itemSize = 50,
  children: renderItem,
  overscanCount = 5,
  width = '100%',
  style = {},
  className = '',
  onItemsRendered,
}) {
  // ════════════════════════════════════════════════════════
  // 第一部分：状态管理
  // ════════════════════════════════════════════════════════

  // useRef 存储容器 DOM 引用和当前滚动位置
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  // 节流控制：防止滚动时频繁触发重渲染
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  console.log('📋 FixedSizeList 初始化:', { height, itemCount, itemSize });

  // ════════════════════════════════════════════════════════
  // 第二部分：核心计算逻辑
  // ════════════════════════════════════════════════════════

  /**
   * 计算可见范围的起始索引
   *
   * 原理：
   * - scrollTop 是用户滚动的距离
   * - 除以每个 item 的高度，得到第一个可见项的索引
   * - 向下取整确保不会漏掉任何项
   *
   * 例如：scrollTop=250, itemSize=50 → startIndex=5
   *       说明第 5 个项（0-indexed）是第一个完全可见的项
   */
  const getStartIndex = useCallback((scrollOffset) => {
    return Math.max(
      0,
      Math.floor(scrollOffset / itemSize) - overscanCount
    );
  }, [itemSize, overscanCount]);

  /**
   * 计算可见范围的结束索引
   *
   * 原理：
   * - 容器高度 + scrollTop = 可视区域的底部位置
   * - 除以 itemSize 得到最后一项的索引
   * - 加上 overscanCount 作为缓冲区
   *
   * 例如：height=400, scrollTop=250, itemSize=50
   *       → (400+250)/50 = 13 → endIndex = 18（含 5 个缓冲项）
   */
  const getEndIndex = useCallback((scrollOffset) => {
    const visibleItemCount = Math.ceil(height / itemSize);  // 可见区域内的项数
    return Math.min(
      itemCount - 1,  // 不能超过总数
      Math.floor(scrollOffset / itemSize) + visibleItemCount + overscanCount
    );
  }, [height, itemCount, itemSize, overscanCount]);

  // 计算当前的可见范围
  const startIndex = getStartIndex(scrollTop);
  const endIndex = getEndIndex(scrollTop);

  // 计算需要渲染的项目数量
  const visibleItemCount = endIndex - startIndex + 1;

  // ════════════════════════════════════════════════════════
  // 第三部分：滚动事件处理（带节流）
  // ════════════════════════════════════════════════════════

  /**
   * handleScroll - 处理滚动事件
   *
   * 优化策略：
   * 1. 使用 requestAnimationFrame 节流（约 60fps）
   * 2. 只有当 startIndex 或 endIndex 变化时才触发重渲染
   * 3. 提供 isScrolling 状态用于显示加载指示器等
   */
  const handleScroll = useCallback((event) => {
    const { scrollTop: newScrollTop } = event.currentTarget;

    // 标记正在滚动（可用于显示"加载中"效果）
    if (!isScrollingRef.current) {
      isScrollingRef.current = true;
    }

    // 清除之前的定时器
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // 设置定时器：停止滚动 150ms 后标记为非滚动状态
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);

    // 更新滚动位置（触发重渲染）
    setScrollTop(newScrollTop);

    // 回调通知外部（如需要无限加载）
    if (onItemsRendered) {
      onItemsRendered({
        visibleStartIndex: startIndex,
        visibleStopIndex: endIndex,
        overscanStartIndex: Math.max(0, startIndex - overscanCount),
        overscanStopIndex: Math.min(itemCount - 1, endIndex + overscanCount),
      });
    }
  }, [startIndex, endIndex, overscanCount, itemCount, onItemsRendered]);

  // ════════════════════════════════════════════════════════
  // 第四部分：渲染
  // ════════════════════════════════════════════════════════

  // 计算所有项目的总高度（用于占位元素）
  const totalHeight = itemCount * itemSize;

  // 计算内容区域的偏移量（用于定位第一个可见项）
  // 这就是为什么需要绝对定位！
  const contentOffset = startIndex * itemSize;

  /**
   * 渲染可见范围内的项目
   *
   * 关键点：
   * 1. 每个项目使用绝对定位
   * 2. top 位置 = (index - startIndex) * itemSize + 内容偏移？不对！
   *    正确的是：top = index * itemSize（相对于容器顶部）
   * 3. 高度固定为 itemSize
   */
  const itemsToRender = [];

  for (let index = startIndex; index <= endIndex; index++) {
    itemsToRender.push(
      <div
        key={index}
        style={{
          position: 'absolute',
          top: index * itemSize,       // 🎯 关键：根据索引计算实际位置
          left: 0,
          width: '100%',
          height: itemSize,
        }}
      >
        {/* 调用用户的渲染函数 */}
        {renderItem({ index, style: {} })}
      </div>
    );
  }

  console.log(`📊 当前渲染: 第 ${startIndex}-${endIndex} 项 (共 ${visibleItemCount} 项)`);

  return (
    <div
      ref={containerRef}
      className={`fixed-size-list ${className}`}
      style={{
        position: 'relative',           // 相对定位作为子元素的参考系
        overflow: 'auto',              // 启用滚动
        height,                         // 固定高度
        width,
        ...style,
      }}
      onScroll={handleScroll}          // 监听滚动事件
    >
      {/* 🔑 占位元素：撑开容器的总高度，使滚动条正常工作 */}
      <div
        style={{
          height: totalHeight,         // 总高度 = 项目数 × 单项高度
          width: 1,                    // 不占用实际宽度
          pointerEvents: 'none',       // 不响应鼠标事件
        }}
      />

      {/* 🔑 内容容器：包含所有可见项目 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: totalHeight,
        }}
      >
        {itemsToRender}
      </div>
    </div>
  );
}

console.log('✅ FixedSizeList 组件定义完成');
```

#### 完整使用示例

```javascript
// ==================== 使用示例 ====================

function VirtualListDemo() {
  console.log('\n'.repeat(2));
  console.log('=' .repeat(70));
  console.log('🎯 虚拟长列表使用演示');
  console.log('='.repeat(70));

  // 模拟 10000 条数据
  const generateData = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      name: `用户 ${i + 1}`,
      email: `user${i + 1}@example.com`,
      avatar: `👤`,
    }));
  };

  const data = generateData(10000);
  console.log(`📦 生成了 ${data.length} 条数据`);

  // 自定义渲染函数
  const Row = ({ index, style }) => {
    const user = data[index];

    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          padding: '10px 16px',
          borderBottom: '1px solid #e8e8e8',
          backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff',
          transition: 'background-color 0.15s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6f7ff'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fafafa' : '#fff'}
      >
        <span style={{ fontSize: '24px', marginRight: '12px' }}>
          {user.avatar}
        </span>
        <div>
          <div style={{ fontWeight: '500', color: '#333' }}>
            {user.name}
          </div>
          <div style={{ fontSize: '12px', color: '#888' }}>
            {user.email} · ID: #{user.id}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: '-apple-system, sans-serif' }}>
      <h2>📋 虚拟长列表演示（10,000 条数据）</h2>

      <div style={{ marginBottom: '12px', color: '#666', fontSize: '14px' }}>
        💡 提示：只渲染可见区域 + 缓冲区的项目（约 20-25 个 DOM 节点），
        而不是全部 10,000 个！
      </div>

      {/* 使用 FixedSizeList 组件 */}
      <FixedSizeList
        height={500}                    // 容器高度 500px
        itemCount={data.length}         // 总共 10000 条
        itemSize={72}                   // 每项高度 72px
        overscanCount={5}               // 上下各多渲染 5 项作为缓冲
        width="800"
        style={{
          border: '1px solid #d9d9d9',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        {Row}                           {/* 渲染函数 */}
      </FixedSizeList>

      {/* 性能统计面板 */}
      <VirtualListStats />
    </div>
  );
}

/**
 * 性能统计组件（展示虚拟列表的效果）
 */
function VirtualListStats() {
  const [stats, setStats] = useState({
    renderedNodes: 0,
    totalData: 10000,
    memorySaved: '99.75%',
  });

  useEffect(() => {
    // 模拟统计
    const containerHeight = 500;
    const itemHeight = 72;
    const overscan = 5;
    const renderedNodes = Math.ceil(containerHeight / itemHeight) + overscan * 2;
    const memorySaved = ((1 - renderedNodes / 10000) * 100).toFixed(2);

    setStats({
      renderedNodes,
      totalData: 10000,
      memorySaved: `${memorySaved}%`,
    });
  }, []);

  return (
    <div style={{
      marginTop: '16px',
      padding: '12px 16px',
      backgroundColor: '#f6ffed',
      border: '1px solid #b7eb8f',
      borderRadius: '6px',
      fontSize: '14px',
    }}>
      <strong>📊 性能对比：</strong>
      {' '}普通列表会创建 <strong>{stats.totalData.toLocaleString()}</strong> 个 DOM 节点，
      {' '}虚拟列表只创建了 <strong style={{ color: '#52c41a' }}>{stats.renderedNodes}</strong> 个，
      {' '}内存节省 <strong>{stats.memorySaved}</strong> ✨
    </div>
  );
}

export default VirtualListDemo;
```

#### 核心算法图解

```
╔══════════════════════════════════════════════════════════════╗
║                 虚拟列表核心原理图解                          ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ┌──────────────────────────────────────┐  ← 容器 (500px)   ║
║  │                                      │                   ║
║  │  ┌────────────────────────────────┐  │                   ║
║  │  │ Item 25 (可见)                │  │ ← scrollTop=1250  ║
║  │  ├────────────────────────────────┤  │    (25×50=1250)   ║
║  │  │ Item 26 (可见)                │  │                   ║
║  │  ├────────────────────────────────┤  │                   ║
║  │  │ Item 27 (可见)                │  │  可见区域:         ║
║  │  ├────────────────────────────────┤  │  Item 25 ~ 34     ║
║  │  │ Item 28 (可见)                │  │  (共 10 项)        ║
║  │  ├────────────────────────────────┤  │                   ║
║  │  │ Item 29 (可见)                │  │  缓冲区:           ║
║  │  ├────────────────────────────────┤  │  Item 20~24 (上)  ║
║  │  │ Item 30 (可见)                │  │  Item 35~39 (下)  ║
║  │  ├────────────────────────────────┤  │                   ║
║  │  │ Item 31 (可见)                │  │  实际渲染:         ║
║  │  ├────────────────────────────────┤  │  Item 20 ~ 39     ║
║  │  │ Item 32 (可见)                │  │  (共 20 项)        ║
║  │  ├────────────────────────────────┤  │                   ║
║  │  │ Item 33 (可见)                │  │  未渲染:           ║
║  │  ├────────────────────────────────┤  │  Item 0~19       ║
║  │  │ Item 34 (可见)                │  │  Item 40~9999     ║
║  │  └────────────────────────────────┘  │                   ║
║  │                                      │                   ║
║  └──────────────────────────────────────┘                   ║
║                                                              ║
║  ┌──────────────────────────────────────┐                   ║
║  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← 占位元素        ║
║  │ (高度 = 10000 × 50 = 500000px)      │    (撑开总高度)   ║
║  └──────────────────────────────────────┘                   ║
║                                                              ║
║  ⚙️ 核心计算公式:                                           ║
║  • startIndex = floor(scrollTop / itemSize) - overscan      ║
║  • endIndex   = ceil((height+scrollTop)/itemSize)+overscan  ║
║  • item.top   = index × itemSize  (绝对定位)                ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Q45: 如何实现代码分割和懒加载？React.lazy 和 Suspense 的工作原理是什么？

- **难度**：★★★
- **知识点**：代码分割 / 懒加载 / Suspense / 性能优化
- **题型**：原理分析题 + 实践题

### 参考答案要点：

1. **代码分割的基本概念**
   ```
   传统打包：所有代码打包到一个 bundle.js（可能几 MB）

   代码分割（Code Splitting）：按需加载
   - 主包：核心代码（较小，快速加载）
   - 懒加载包：非关键代码（需要时才下载）

   好处：
   - 减少首屏加载时间
   - 按路由/功能拆分，并行加载
   - 用户只下载需要的代码
   ```

2. **React.lazy + Suspense 基础用法**
   ```jsx
   import { lazy, Suspense } from 'react';

   // 懒加载组件（动态 import）
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   const Settings = lazy(() => import('./pages/Settings'));
   const AdminPanel = lazy(() => import('./pages/AdminPanel'));

   function App() {
     return (
       <Suspense fallback={<PageSkeleton />}>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/settings" element={<Settings />} />
           <Route path="/admin" element={<AdminPanel />} />
         </Routes>
       </Suspense>
     );
   }

   // 工作原理：
   // 1. 首次访问时，Dashboard 等组件不会被打入主 bundle
   // 2. 导航到 /dashboard 时，才请求 dashboard.chunk.js
   // 3. 请求期间显示 fallback UI（骨架屏/加载动画）
   // 4. chunk 加载完成后渲染实际组件
   ```

3. **基于路由的代码分割策略**
   ```tsx
   // routes.tsx - 定义路由配置
   import { lazy } from 'react';

   // 每个页面单独打包
   const routes = [
     {
       path: '/',
       component: lazy(() => import('@/pages/Home')),
       exact: true,
     },
     {
       path: '/dashboard',
       component: lazy(() => import('@/pages/Dashboard')),
     },
     {
       path: '/users',
       component: lazy(() => import('@/pages/UserManagement')),
     },
     {
       path: '/reports/:id',
       component: lazy(() => import('@/pages/ReportDetail')),
     },
   ];

   // webpack/vite 会自动分割成多个 chunk
   // Home.[hash].js
   // Dashboard.[hash].js
   // UserManagement.[hash].js
   // ReportDetail.[hash].js
   ```

4. **进阶：预加载（Prefetching）**
   ```jsx
   import { lazy, Suspense } from 'react';

   // 预加载：在用户可能需要之前就开始下载
   const HeavyComponent = lazy(() =>
     import(/* webpackPrefetch: true */ './HeavyComponent')
   );

   // 预加载 vs 预取（Preload）
   // Prefetch：空闲时加载（低优先级）
   // Preload：立即加载（高优先级，通常配合 Next.js Link）

   // 手动触发预加载
   function Navigation({ onHover }) {
     const prefetchRoute = (routePath) => {
       import(`./pages/${routePath}`);  // 开始下载但不渲染
     };

     return (
       <nav>
         <Link
           to="/dashboard"
           onMouseEnter={() => prefetchRoute('Dashboard')}
         >
           Dashboard
         </Link>
       </nav>
     );
   }
   ```

5. **Suspense 的嵌套与错误边界**
   ```jsx
   import { lazy, Suspense } from 'react';
   import ErrorBoundary from './ErrorBoundary';

   const Dashboard = lazy(() => import('./Dashboard'));
   const Charts = lazy(() => import('./Charts'));

   function App() {
     return (
       <ErrorBoundary fallback={<GlobalError />}>
         <Suspense fallback={<AppSkeleton />}>
           <Header />

           {/* 每个 Suspense 可以有自己的 fallback */}
           <main>
             <ErrorBoundary fallback={<DashboardError />}>
               <Suspense fallback={<DashboardSkeleton />}>
                 <Dashboard />
               </Suspense>
             </ErrorBoundary>

             <ErrorBoundary fallback={<ChartsError />}>
               <Suspense fallback={<ChartsSkeleton />}>
                 <Charts />
               </Suspense>
             </ErrorBoundary>
           </main>

           <Footer />
         </Suspense>
       </ErrorBoundary>
     );
   }

   // 错误边界捕获懒加载失败的情况
   // 允许展示降级 UI 或重试按钮
   ```

6. **命名导出的懒加载（Webpack Magic Comments）**
   ```jsx
   // 默认导出
   const Component = lazy(() => import('./Component'));

   // 命名导出（使用 webpackChunkName）
   const AdminRoutes = lazy(() =>
     import(/* webpackChunkName: "admin-routes" */ './admin/Routes')
   );

   // 多入口分组
   const FeatureA = lazy(() =>
     import(/* webpackChunkName: "feature-a" */ './features/A')
   );
   const FeatureB = lazy(() =>
     import(/* webpackChunkName: "feature-b" */ './features/B')
   );

   // Vite 的方式
   const Module = lazy(() =>
     import('@/modules/MyModule?inline')  // Vite 特有语法
   );
   ```

7. **加载状态的最佳实践**
   ```jsx
   // 骨架屏（Skeleton Screen）优于旋转加载器
   function PageSkeleton() {
     return (
       <div className="skeleton">
         <div className="skeleton-header">
           <div className="skeleton-circle" />
           <div className="skeleton-line long" />
         </div>
         <div className="skeleton-content">
           {[...Array(5)].map((_, i) => (
             <div key={i} className="skeleton-block" />
           ))}
         </div>
       </div>
     );
   }

   // 带超时的 Suspense
   function SuspenseWithTimeout({ children, fallback, timeoutMs = 3000, timeoutFallback }) {
     const [timedOut, setTimedOut] = useState(false);

     useEffect(() => {
       const timer = setTimeout(() => setTimedOut(true), timeoutMs);
       return () => clearTimeout(timer);
   }, []);

     return (
       <Suspense fallback={timedOut ? (timeoutFallback || fallback) : fallback}>
         {children}
       </Suspense>
     );
   }
   ```

### 深度拓展：手写实现

#### 简化版 React.lazy() 实现（完整可运行）

```javascript
// ==================== 简化版 React.lazy() 实现 ====================
/**
 * React.lazy 是 React 提供的代码分割和懒加载 API
 * 它接受一个动态 import() 函数，返回一个懒加载的组件
 *
 * 核心原理：
 * 1. 接受一个返回 Promise 的工厂函数
 * 2. 返回一个 LazyComponent 包装器
 * 3. 首次渲染时触发动态导入
 * 4. 通过抛出 Promise 触发 Suspense 边界显示 fallback UI
 * 5. 模块加载完成后缓存结果，后续渲染直接使用
 */

import React, { Component } from 'react';

// ════════════════════════════════════════════════════════
// 第一部分：LazyComponent 状态机
// ════════════════════════════════════════════════════════

/**
 * 懒加载组件的状态常量
 */
const Uninitialized = 0;   // 未初始化（还没开始加载）
const Pending = 1;          // 加载中（Promise pending）
const Resolved = 2;        // 已解决（模块加载成功）
const Rejected = 3;        // 已拒绝（加载失败）

/**
 * LazyComponent - React.lazy 返回的包装器组件
 *
 * 这是一个特殊的 React 组件类，它的行为如下：
 * - 首次渲染：触发动态导入，抛出 Promise → Suspense 显示 fallback
 * - 加载完成：正常渲染实际组件
 * - 后续渲染：直接使用缓存的组件，不再加载
 */
class LazyComponent extends Component {
  constructor(props) {
    super(props);

    // 内部状态
    this.state = {
      _result: null,       // 加载的结果（Resolved 时是组件，Rejected 时是错误）
      _status: Uninitialized,  // 当前状态
    };

    // 绑定 this（因为需要在静态方法中使用实例方法）
    this._thenable = {
      then: (onFulfill, onReject) => this._loadThenable(onFulfill, onReject),
    };
  }

  componentDidMount() {
    this._loadIfNeeded();
  }

  componentDidUpdate() {
    this._loadIfNeeded();
  }

  _loadIfNeeded() {
    if (this.state._status === Uninitialized) {
      console.log('🚀 LazyComponent: 开始懒加载...');
      this._triggerLoad();
    }
  }

  /**
   * 触发动态导入
   */
  _triggerLoad() {
    const { _payload } = this.constructor;
    this.setState({ _status: Pending });

    const thenable = _payload();

    console.log('⏳ 动态导入已触发，等待模块加载...');

    thenable.then(
      (module) => {
        console.log('✅ 模块加载成功:', module);
        const DefaultComponent = module.default || module;

        this.setState({
          _status: Resolved,
          _result: { _payload: DefaultComponent },
        });
      },
      (error) => {
        console.error('❌ 模块加载失败:', error);
        this.setState({
          _status: Rejected,
          _result: error,
        });
      }
    );
  }

  /**
   * 处理 Suspense 的 thenable 协议（核心！）
   */
  _loadThenable(onFulfill, onReject) {
    if (this.state._status === Resolved) {
      onFulfill(this.state._result);
    } else if (this.state._status === Rejected) {
      onReject(this.state._result);
    } else {
      console.log('⏳ 注册 Suspense 回调，等待加载完成...');
    }
  }

  render() {
    const { _status, _result } = this.state;

    switch (_status) {
      case Uninitialized:
        console.log('📍 状态: Uninitialized → 触发加载');
        throw this._thenable;  // 抛出 Promise 给 Suspense

      case Pending:
        console.log('📍 状态: Pending → 继续等待');
        throw this._thenable;  // 继续等待

      case Resolved:
        console.log('📍 状态: Resolved → 渲染组件');
        return <_result._payload {...this.props} />;

      case Rejected:
        console.error('📍 状态: Rejected → 抛出错误');
        throw _result;

      default:
        return null;
    }
  }
}
```

#### lazy 函数实现

```javascript
// 缓存已加载的模块（避免重复加载）
const moduleCache = new Map();

/**
 * lazy - React.lazy 的简化实现
 * @param {Function} factory - 动态导入函数
 * @returns {React.ComponentType} 懒加载组件包装器
 */
function lazy(factory) {
  class LazyWrapper extends LazyComponent {}

  LazyWrapper._payload = function lazyInit() {
    const cacheKey = factory.toString();

    if (moduleCache.has(cacheKey)) {
      console.log('💾 命中缓存，复用已加载的模块');
      return Promise.resolve(moduleCache.get(cacheKey));
    }

    const promise = factory();

    promise.then((module) => {
      moduleCache.set(cacheKey, module);
    });

    return promise;
  };

  LazyWrapper.displayName = 'lazy';
  return LazyWrapper;
}
```

#### 完整使用示例

```javascript
function LazyLoadingDemo() {
  // 定义懒加载组件（模拟异步加载）
  const HeavyDashboard = lazy(() =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          default: function Dashboard({ title }) {
            return (
              <div style={{ padding: '24px', backgroundColor: '#f0f5ff', borderRadius: '8px' }}>
                <h2>📊 {title}</h2>
                <p>这是一个懒加载的重型 Dashboard 组件！</p>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  ✅ 通过 React.lazy 延迟加载<br/>
                  ✅ 只在首次访问时下载 JS bundle<br/>
                  ✅ 后续访问直接从缓存读取
                </p>
              </div>
            );
          },
        });
      }, 1500);  // 模拟网络延迟
    })
  );

  return (
    <div style={{ fontFamily: '-apple-system, sans-serif', padding: '20px' }}>
      <h1>🚀 React.lazy + Suspense 演示</h1>

      <Suspense
        fallback={
          <div style={{
            padding: '40px', textAlign: 'center',
            backgroundColor: '#fafafa', borderRadius: '8px'
          }}>
            <div style={{ fontSize: '32px' }}>⏳</div>
            <div style={{ color: '#666' }}>正在加载组件...</div>
          </div>
        }
      >
        <HeavyDashboard title="数据看板" />
      </Suspense>

      {/* 工作流程说明 */}
      <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '6px' }}>
        <strong>📚 工作流程：</strong><br/>
        ① lazy() 创建包装器 → ② 渲染时触发 import() → ③ 抛出 Promise → 
        ④ Suspense 显示 fallback → ⑤ 模块加载完成 → ⑥ 渲染实际组件
      </div>
    </div>
  );
}

export default LazyLoadingDemo;
```

---

## Q46: Web Worker 在 React 中如何使用？有什么应用场景和注意事项？

- **难度**：★★★
- **知识点**：Web Worker / 并发计算 / 性能优化 / React 集成
- **题型**：综合应用题

### 参考答案要点：

1. **为什么需要 Web Worker？**
   ```
   JavaScript 单线程的限制：
   - 主线程负责：UI 渲染、事件处理、网络请求
   - 如果主线程被大量计算占用 → UI 卡顿

   Web Worker 的优势：
   - 在独立线程中运行 JavaScript
   - 不阻塞主线程
   - 适合：大数据处理、图像处理、加密解密、复杂数学运算
   ```

2. **基础用法**
   ```jsx
   // worker.js（独立文件）
   self.onmessage = function(e) {
     const { type, data } = e.data;

     switch (type) {
       case 'PROCESS_LARGE_DATA':
         const result = processData(data);  // 耗时操作
         self.postMessage({ type: 'RESULT', data: result });
         break;

       case 'CALCULATE':
         const value = heavyCalculation(data);
         self.postMessage({ type: 'CALCULATION_DONE', data: value });
         break;
     }
   };

   // React 组件中使用
   function DataProcessor() {
     const [result, setResult] = useState(null);
     const [loading, setLoading] = useState(false);
     const workerRef = useRef<Worker | null>(null);

     useEffect(() => {
       // 创建 worker
       workerRef.current = new Worker(new URL('./worker.js', import.meta.url));

       // 监听消息
       workerRef.current.onmessage = (e) => {
         setResult(e.data.data);
         setLoading(false);
       };

       workerRef.current.onerror = (error) => {
         console.error('Worker error:', error);
         setLoading(false);
       };

       return () => {
         // 清理 worker
         workerRef.current?.terminate();
       };
     }, []);

     const processData = (data) => {
       setLoading(true);
       workerRef.current?.postMessage({
         type: 'PROCESS_LARGE_DATA',
         data: data,
       });
     };

     return (
       <div>
         <button onClick={() => processData(largeDataset)}>
           处理数据
         </button>
         {loading && <Spinner />}
         {result && <ResultDisplay data={result} />}
       </div>
     );
   }
   ```

3. **Comlink：更优雅的 Worker API**
   ```tsx
   import * as Comlink from 'comlink';

   // 定义 worker 中的 API（看起来像普通类）
   // heavyWorker.ts
   class HeavyWorker {
     async processData(data: DataType[]): Promise<ProcessedType[]> {
       // 耗时操作，不会阻塞主线程
       return data.map(item => ({
         ...item,
         computed: expensiveCalculation(item),
       }));
     }

     async filterAndSort(items: Item[], filter: FilterConfig): Promise<Item[]> {
       let result = items.filter(item => matchesFilter(item, filter));
       result = sortItems(result);
       return result;
     }
   }

   // 暴露给外部
   export default Comlink.wrap(new Worker(new URL('./heavyWorker.ts', import.meta.url)));

   // React 组件中使用（像调用本地方法一样）
   function DataProcessingView() {
     const workerApi = useRef<Comlink.Remote<typeof HeavyWorker>>(null);

     useEffect(() => {
       workerApi.current = Comlink.wrap(
         new Worker(new URL('./heavyWorker.ts', import.meta.url))
       );
       return () => workerApi.current[Comlink.releaseProxy]();
     }, []);

     const handleProcess = async () => {
       if (!workerApi.current) return;
       const result = await workerApi.current.processData(rawData);
       setProcessedData(result);
     };
   }
   ```

4. **Worker 与 React 状态同步**
   ```tsx
   // 使用 useReducer + Worker 进行状态管理
   type Action =
     | { type: 'START_PROCESS'; payload: Data[] }
     | { type: 'PROCESS_COMPLETE'; payload: Result[] }
     | { type: 'PROCESS_ERROR'; payload: string };

   interface State {
     status: 'idle' | 'processing' | 'done' | 'error';
     data: Result[] | null;
     error: string | null;
   }

   function reducer(state: State, action: Action): State {
     switch (action.type) {
       case 'START_PROCESS':
         return { status: 'processing', data: null, error: null };
       case 'PROCESS_COMPLETE':
         return { status: 'done', data: action.payload, error: null };
       case 'PROCESS_ERROR':
         return { status: 'error', data: null, error: action.payload };
       default:
         return state;
     }
   }

   function WorkerIntegratedComponent() {
     const [state, dispatch] = useReducer(reducer, {
       status: 'idle',
       data: null,
       error: null,
     });
     const workerRef = useRef<Worker>(null);

     useEffect(() => {
       const worker = new Worker(new URL('./dataWorker.ts', import.meta.url));
       workerRef.current = worker;

       worker.onmessage = (e) => {
         if (e.data.success) {
           dispatch({ type: 'PROCESS_COMPLETE', payload: e.data.result });
         } else {
           dispatch({ type: 'PROCESS_ERROR', payload: e.data.error });
         }
       };

       return () => worker.terminate();
   }, []);

     const startProcessing = (data: Data[]) => {
       dispatch({ type: 'START_PROCESS', payload: data });
       workerRef.current?.postMessage(data);
     };

     // 根据 state.status 渲染不同的 UI
   }
   ```

5. **注意事项与限制**
   ```
   限制：
   - Worker 无法访问 DOM
   - Worker 无法使用 window/document/navigator 等 API
   - Worker 间通信有序列化开销（structured clone）
   - 创建 Worker 有启动延迟（几毫秒到几十毫秒）

   最佳实践：
   - 数据量 > 10MB 或计算时间 > 100ms 时考虑使用 Worker
   - 使用 Transferable Objects 减少复制开销
   - 及时 terminate 不再使用的 Worker
   - 考虑使用 Worker 池（避免频繁创建销毁）

   不适合的场景：
   - 简单的数据转换（主线程更快因为省去通信开销）
   - 需要 DOM 操作的任务
   - I/O 密集型任务（Node.js 环境）
   ```

### 🔍 追问链
1. **Web Worker 能操作 DOM 吗？能访问 React 组件的状态吗？**
   → 方向：不能操作 DOM！Worker 是独立线程没有 window/document；可以通过 postMessage 与主线程通信间接影响 UI
2. **Comlink Worker 或 Workerize 库是如何让 Worker 使用像本地调用一样的？**
   → 方向：基于 Proxy 拦截属性访问，通过 postMessage 序列化传输到 Worker 执行后再返回结果
3. **OffscreenCanvas 在 Worker 中渲染 Canvas 有什么优势？**
   → 方向：Canvas 渲染计算在 Worker 中不阻塞主线程；适用于复杂图形/图表/视频处理

---

## Q47: Key 的选择对 React 性能有什么影响？请从 Diff 算法的角度详细说明。

- **难度**：★★★
- **知识点**：Diff 算法 / Key / 性能优化 / 内部原理
- **题型**：深入分析题

### 参考答案要点：

1. **Key 在 Diff 算法中的角色**
   ```
   React 的协调过程（Reconciliation）：

   对于同层级的子节点列表：
   1. 遍历新的 children 列表
   2. 对每个 child，尝试在旧的 children 中找到匹配
   3. 匹配依据：key（如果提供了）或 index（默认）

   有 key 时：
   - 使用 Map<key, oldFiber> 建立 O(1) 查找
   - 快速确定是 复用/移动/新建/删除

   无 key（或 key=index）时：
   - 按位置逐一比较
   - 无法识别节点的"身份"
   - 可能导致不必要的更新和状态丢失
   ```

2. **Key 选择错误的后果**

   **后果 1：不必要的 DOM 更新**
   ```jsx
   // 场景：列表中间插入一项
   // 初始: [A, B, C, D]
   // 插入: [A, X, B, C, D]

   // 使用 index 作为 key:
   // React 认为：
   // index=0: A → A ✓ (复用)
   // index=1: B → X ✗ (更新 B 的内容为 X)
   // index=2: C → B ✗ (更新 C 的内容为 B)
   // index=3: D → C ✗ (更新 D 的内容为 C)
   // index=4: 新建 D
   // 结果：4 次更新 + 1 次创建

   // 使用唯一 ID 作为 key:
   // React 通过 Map 查找：
   // key='a': A → A ✓ (复用)
   // key='x': X → 新建
   // key='b': B → B ✓ (复用，移动位置)
   // key='c': C → C ✓ (复用，移动位置)
   // key='d': D → D ✓ (复用，移动位置)
   // 结果：1 次创建 + 4 次 DOM 移动（移动比更新便宜）
   ```

   **后果 2：组件状态丢失**
   ```jsx
   function EditableListItem({ item, onUpdate }) {
     const [editingText, setEditingText] = useState(item.text);
     // 这个 state 是绑定到组件实例的

     return (
       <li>
         <input
           value={editingText}
           onChange={(e) => setEditingText(e.target.value)}
         />
       </li>
     );
   }

   // 使用 index 作为 key：
   // 用户在第 2 项输入了文字
   // 此时在第 1 项后插入新项
   // 由于 key=index，React 认为"第 2 项"变成了新插入的内容
   // 导致输入的文字出现在错误的位置，或直接丢失

   // 使用稳定 ID：
   // React 能正确识别哪个组件对应哪条数据
   // 输入的状态保持不变
   ```

   ** consequences 3：子组件不必要的重渲染**
   ```jsx
   const ExpensiveItem = React.memo(function Item({ data }) {
     // 这是一个渲染成本高的组件
     return <ComplexVisualization data={data} />;
   });

   // 即使使用了 React.memo
   // 如果 key 不当导致 props 引用变化
   // memo 的优化也会失效
   ```

3. **生成好 Key 的策略**
   ```jsx
   // ✅ 策略 1：数据库主键
   <Item key={record.id} />

   // ✅ 策略 2：复合唯一标识
   <Item key={`${parentId}-${itemId}`} />

   // ✅ 策略 3：内容的哈希（无 ID 时）
   <Item key={hash(JSON.stringify(item.uniqueFields))} />

   // ✅ 策略 4：使用 nanoid/uuid 生成（前端生成的临时数据）
   <Item key={tempId} />

   // ⚠️ 可接受的 index 使用场景
   // - 静态列表（不会增删排序）
   // - 列表项没有内部状态
   // - 列表项非常简单（纯展示）
   ```

4. **Key 与 Fiber 的关系**
   ```
   React 内部，key 存储在哪里？

   Fiber 节点结构：
   {
     key: 'unique-id',      // ← 这里
     type: ListItem,
     memoizedState: ...,    // hooks 状态
     alternate: ...,        // 双缓存指针
     ...
   }

   Diff 过程中的 key 匹配逻辑（简化）：

   function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren) {
     // 1. 如果旧节点存在，建立 key → fiber 的映射
     const existingChildren = mapRemainingChildren(currentFirstChild);

     // 2. 遍历新 children
     for (let i = 0; i < newChildren.length; i++) {
       const newChild = newChildren[i];
       const key = newChild.key ?? i;  // 没有 key 则用 index

       // 3. 从映射中查找匹配的旧 fiber
       let matchedFiber = existingChildren.get(key);

       if (matchedFiber) {
         // 找到了！复用这个 fiber
         existingChildren.delete(key);
         // 标记为更新（Placement | Update）
       } else {
         // 没找到！创建新 fiber
         // 标记为 Placement
       }
     }

     // 4. 映射中剩余的旧 fiber 都是被删除的
     // 标记为 Deletion
   }
   ```

5. **性能基准测试参考**
   ```
   测试环境：1000 条列表项，中间插入 1 条

   Key 类型          操作耗时    DOM 操作数
   ─────────────────────────────────────────
   index             ~15ms       999 次更新 + 1 次插入
   random            ~15ms       1000 次重建
   unique ID         ~3ms        1 次插入 + 若干次移动

   结论：正确的 key 可以提升 5 倍以上的 diff 性能
   ```

---

## Q48: 如何使用 React Profiler 进行性能分析？有哪些常见的性能问题和解决方案？

- **难度**：★★★
- **知识点**：性能分析 / Profiler / 性能调优 / DevTools
- **题型**：工具使用题 + 案例分析题

### 参考答案要点：

1. **Profiler 面板使用指南**
   ```jsx
   // 方法 1：React DevTools Profiler 面板（推荐）
   // 步骤：
   // 1. 打开 Chrome DevTools → Components → Profiler 标签
   // 2. 点击 Record 按钮（圆形图标）
   // 3. 在页面上进行交互操作
   // 4. 点击 Stop
   // 5. 分析火焰图

   // 方法 2：编程式 Profiler API
   function onRenderCallback(
     id,              // 发生提交的 Profiler 树的 id
     phase,           // "mount" 或 "update"
     actualDuration,  // 本次渲染花费的时间
     baseDuration,    // 不使用 memoization 的估计渲染时间
     startTime,       // React 开始渲染的时间
     commitTime,      // React 提交的时间
     interactions     // 属于本次更新的交互集合
   ) {
     console.log(`${id} ${phase}: ${actualDuration}ms`);

     // 上报性能数据到监控系统
     if (actualDuration > 100) {
       trackPerformanceIssue(id, actualDuration);
     }
   }

   <Profiler id="ExpensiveComponent" onRender={onRenderCallback}>
     <ExpensiveComponent />
   </Profiler>
   ```

2. **解读 Profiler 数据**
   ```
   火焰图的含义：

   颜色编码：
   - 灰色：组件未渲染（被 memo 跳过）
   - 绿色：渲染时间短（< 10ms）
   - 黄色：渲染时间中等（10-50ms）
   - 红色：渲染时间长（> 50ms），需要关注

   关键指标：
   - Actual Duration：实际渲染时间
   - Base Duration：理论最坏情况（无优化）
   - 如果 Actual << Base：说明 memo 优化有效
   - 如果 Actual ≈ Base：memo 可能未生效或有其他问题
   ```

3. **常见性能问题诊断**

   **问题 1：整个树不必要的重渲染**
   ```
   症状：点击一个按钮，Profiler 显示几乎所有组件都变红

   原因：
   - State 放在了太高层级的组件
   - Context value 每次渲染都是新对象
   - 缺少 React.memo

   解决：
   - State 下移（提升到真正需要的组件）
   - Context value 使用 useMemo
   - 给不需要更新的子组件加 React.memo
   ```

   **问题 2：列表渲染缓慢**
   ```
   症状：长列表首次渲染或滚动时卡顿

   原因：
   - 渲染了太多 DOM 节点
   - 没有使用虚拟滚动
   - 每个子组件都很复杂

   解决：
   - 使用 react-window / @tanstack/virtual
   - 简化列表项组件
   - 使用 React.memo 包裹列表项
   ```

   **问题 3：频繁的小更新累积**
   ```
   症状：界面整体流畅，但某些指标波动大

   原因：
   - 定时器/setInterval 频繁触发 setState
   - WebSocket 消息密集推送
   - 动画帧率过高

   解决：
   - 使用 requestAnimationFrame 合并更新
   - 使用 debounce/throttle
   - 使用 startTransition 降低优先级
   ```

4. **性能优化检查清单**
   ```
   □ 是否有不必要的重渲染？（Profiler 验证）
   □ 大列表是否使用了虚拟滚动？
   □ 昂贵计算是否使用了 useMemo？
   □ 传递给子组件的函数是否用了 useCallback？
   □ Context value 是否稳定（useMemo）？
   □ 图片是否做了懒加载和压缩？
   □ 字体和第三方脚本是否阻塞渲染？
   □ Bundle size 是否过大？是否做了 code splitting？
   □ 是否使用了 Production Build？
   ```

---

## Q49: 请列举首屏加载优化的完整策略，从网络层到渲染层的全方位优化方案。

- **难度**：★★★
- **知识点**：首屏优化 / 性能优化 / Core Web Vitals / 工程化
- **题型**：综合方案题

### 参考答案要点：

1. **优化维度总览**
   ```
   ┌─────────────────────────────────────────────────────────┐
   │                  首屏加载优化全景                         │
   ├──────────┬──────────┬──────────┬──────────┬──────────────┤
   │  网络层   │  构建层   │  代码层   │  渲染层   │   监控层     │
   ├──────────┼──────────┼──────────┼──────────┼──────────────┤
   │ CDN/缓存  │ Tree     │ Code     │ SSR/SSG  │ LCP/CLS/FID  │
   │ 压缩      │ Shaking  │ Splitting│ Skeleton │ Performance  │
   │ 预连接    │ Minify   │ Lazy     │ Priority│ Observer     │
   │ 预加载    │ Source   │ Prefetch │ Hydration│ Lighthouse   │
   │ HTTP/2   │ Map      │ Preload  │ Streaming│ RUM          │
   └──────────┴──────────┴──────────┴──────────┴──────────────┘
   ```

2. **网络层优化**
   ```html
   <!-- DNS 预解析 -->
   <link rel="dns-prefetch" href="//api.example.com" />
   <link rel="dns-prefetch" href="//cdn.example.com" />

   <!-- 预连接 -->
   <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />

   <!-- 预加载关键资源 -->
   <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
   <link rel="preload" href="/images/hero.webp" as="image" />

   <!-- 预获取后续路由 -->
   <link rel="prefetch" href="/dashboard.chunk.js" />

   <!-- 关键 CSS 内联 -->
   <style>
     /* Above-the-fold styles */
     .hero { display: flex; justify-content: center; align-items: center; }
     /* ... */
   </style>
   ```

3. **构建层优化**
   ```javascript
   // vite.config.ts / webpack.config.js

   // 1. 代码分割策略
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             // 第三方库单独打包
             'vendor-react': ['react', 'react-dom'],
             'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
             'vendor-utils': ['lodash', 'dayjs'],

             // 路由级别分割（Vite 自动处理 dynamic import）
           },
         },
       },
     },

     // 2. 压缩选项
     minify: 'terser',
     terserOptions: {
       compress: {
         drop_console: true,  // 生产环境去掉 console
         drop_debugger: true,
       },
     },

     // 3. Chunk 大小警告
     chunkSizeWarningLimit: 500,  // KB
   });
   ```

4. **代码层优化**
   ```tsx
   // 1. 路由懒加载
   const HomePage = lazy(() => import('./pages/Home'));
   const DashboardPage = lazy(() =>
     import(/* webpackPrefetch: true */ './pages/Dashboard')
   );

   // 2. 图片懒加载 + 响应式
   function OptimizedImage({ src, alt, width, height }) {
     return (
       <img
         src={src}
         alt={alt}
         width={width}
         height={height}
         loading="lazy"  // 原生懒加载
         decoding="async"  // 异步解码
         sizes="(max-width: 768px) 100vw, 50vw"
         srcSet={`
           ${src}?w=400 400w,
           ${src}?w=800 800w,
           ${src}?w=1200 1200w
         `}
       />
     );
   }

   // 3. 字体优化
   // 使用 font-display: swap 避免字体阻塞渲染
   @font-face {
     font-family: 'CustomFont';
     src: url('/fonts/custom.woff2') format('woff2');
     font-display: swap;  /* 文字先显示，字体加载完成后替换 */
     unicode-range: U+000-5FF;  /* 只下载需要的字符 */
   }

   // 4. 第三方脚本优化
   // 使用 async/defer
   <script defer src="https://example.com/analytics.js"></script>

   // 或动态加载
   useEffect(() => {
     const script = document.createElement('script');
     script.src = 'https://example.com/widget.js';
     script.async = true;
     document.body.appendChild(script);
   }, []);
   ```

5. **渲染层优化**
   ```tsx
   // 1. 骨架屏（Skeleton Screen）
   function HomePageSkeleton() {
     return (
       <div className="skeleton-container">
         <div className="skeleton-hero" />
         <div className="skeleton-grid">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="skeleton-card" />
           ))}
         </div>
       </div>
     );
   }

   // 2. 关键资源优先渲染
   function App() {
     return (
       <html>
         <head>
           {/* 关键 CSS 内联 */}
           <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
         </head>
         <body>
           <div id="root">
             <Suspense fallback={<HomePageSkeleton />}>
               <AppRouter />
             </Suspense>
           </div>
         </body>
       </html>
     );
   }

   // 3. 渐进式 hydration（Next.js/App Router）
   // 使用 <Suspense boundary> 让非关键部分延后 hydrate
   ```

6. **Core Web Vitals 优化目标**
   ```
   指标          目标值        优化手段
   ──────────────────────────────────────────────
   LCP (最大内容绘制)  < 2.5s   优化首屏资源、CDN、预加载
   FID (首次输入延迟)  < 100ms   减少 JS 执行、代码分割
   CLS (累计布局偏移)   < 0.1    固定尺寸、字体 swap、动态内容占位
   INP (下次绘制的交互)< 200ms   长任务拆分、Web Worker、startTransition

   监控工具：
   - web-vitals 库（真实用户数据）
   - Lighthouse（实验室数据）
   - CrUX（Google 的公开数据）
   ```

### 🔍 追问链
1. **Critical Rendering Path 关键指标有哪些？目标值是多少？**
   → 方向：FCP < 1.8s, LCP < 2.5s, FID < 100ms, CLS < 0.1; TTFB < 200ms
2. **preload vs prefetch vs preconnect 各自适用什么资源？**
   → 方向：preload 当前导航必需的高优先级资源；prefetch 下一步可能需要的；preconnect 建立域名连接（DNS+TCP）
3. **SSR 一定能提升首屏性能吗？TTFB 可能更差吗？**
   → 方向：不一定！SSR 的 TTFB 通常比 CSR 差（服务端要计算）；但 FCP/LCP 更好。取决于网络和服务端算力

---

## Q50: CSR、SSR、SSG、ISR 各有什么特点？如何选择合适的技术方案？

- **难度**：★★★
- **知识点**：渲染策略 / SSR / SSG / ISR / 技术选型
- **题型**：对比分析题 + 选型题

### 参考答案要点：

1. **四种渲染方式对比**

   | 维度 | CSR | SSR | SSG | ISR |
   |------|-----|-----|-----|-----|
   **全称** | Client-Side Rendering | Server-Side Rendering | Static Site Generation | Incremental Static Regeneration |
   **HTML 生成时机** | 浏览器 | 请求时 | 构建时 | 构建时 + 定期刷新 |
   **首屏速度** | 慢（需等待 JS） | 快（HTML 即达） | 最快（CDN 缓存） | 快（增量更新） |
   **SEO 友好度** | 差（爬虫难执行 JS） | 好 | 好 | 好 |
   **服务器负载** | 低 | 高（每次请求） | 无（构建时） | 中 |
   **数据新鲜度** | 实时 | 实时 | 构建时可配置 | 近实时 |
   **适用场景** | SPA、后台管理 | 动态内容网站 | 博客、文档 | 新闻、电商 |

2. **CSR（客户端渲染）**
   ```jsx
   // 特点：HTML 是空的壳，JS 加载后才渲染内容
   // 流程：请求 HTML → 加载 JS → fetch 数据 → 渲染 UI

   // 优点：
   // - 服务器压力小
   // - 页面切换快（无需刷新）
   // - 适合交互密集的应用

   // 缺点：
   // - 首屏慢（白屏时间长）
   // - SEO 不友好
   // - 依赖 JS 执行

   // 适用：后台管理系统、SAAS 应用、需要登录的应用
   ```

3. **SSR（服务端渲染）**
   ```jsx
   // 特点：服务器执行 React 组件，返回完整的 HTML
   // 流程：请求 → 服务器渲染 → 返回 HTML → Hydration

   // Next.js Pages Router 示例
   export async function getServerSideProps(context) {
     const res = await fetch(`https://api.example.com/data/${context.params.id}`);
     const data = await res.json();

     return {
       props: { data },  // 传递给页面组件
     };
   }

   function Page({ data }) {
     return <div>{data.title}</div>;
   }

   // 优点：
   // - 首屏快（HTML 即达）
   // - SEO 友好
   // - 数据可定制（基于请求参数）

   // 缺点：
   // - TTFB 较长（服务器需要计算）
   // - 服务器资源消耗大
   // - 需要部署 Node.js 服务
   ```

4. **SSG（静态站点生成）**
   ```jsx
   // 特点：构建时生成静态 HTML 文件
   // 流程：构建时 fetch 所有数据 → 生成 HTML → 部署到 CDN

   // Next.js 示例
   export async function getStaticPaths() {
     const posts = await fetch('https://api.example.com/posts').then(r => r.json());

     return {
       paths: posts.map(post => ({ params: { id: post.id } })),
       fallback: false,  // 所有路径都已预生成
     };
   }

   export async function getStaticProps({ params }) {
     const post = await fetch(`https://api.example.com/posts/${params.id}`).then(r => r.json());
     return { props: { post } };
   }

   function Post({ post }) {
     return <article>{post.content}</article>;
   }

   // 优点：
   // - 最快的加载速度（CDN 分发）
   // - 最低的服务器成本
   // - 极佳的 SEO

   // 缺点：
   // - 构建时间长（数据量大时）
   // - 数据不是实时的
   // - 不适合个性化内容

   // 适用：博客、文档站、营销页面、电商商品页
   ```

5. **ISR（增量静态再生）**
   ```jsx
   // 特点：结合 SSG 和 SSR 的优点
   // 构建时生成静态页面，过期后后台重新生成

   export async function getStaticProps({ params }) {
     const post = await fetch(`/api/posts/${params.id}`).then(r => r.json());

     return {
       props: { post },
       revalidate: 60,  // 每 60 秒检查是否需要更新
     };
   }

   // 工作流程：
   // 1. 用户请求 → 返回缓存的静态 HTML（极快）
   // 2. 后台检查是否超过 revalidate 时间
   // 3. 如果超时，在后台重新生成页面
   // 4. 下一个请求获得最新内容

   // 优点：
   // - 接近 SSG 的性能
   // - 数据相对新鲜
   // - 不需要完整的 SSR 基础设施

   // 缺点：
   // - 数据不是完全实时的
   // - stale-while-revalidate 策略需要理解
   // - 后台再生可能失败

   // 适用：新闻网站、电商、社交媒体摘要
   ```

6. **选型决策框架**
   ```
   你的应用是什么类型？
   │
   ├── 需要登录才能使用？
   │   └── → CSR（或混合：登录前 SSR，登录后 CSR）
   │
   ├── 内容变化频率？
   │   ├── 几乎不变（文档/博客）
   │   │   └── → SSG
   │   │
   │   ├── 定期更新（新闻/电商）
   │   │   └── → ISR
   │   │
   │   └── 实时变化（社交/交易）
   │       └── → SSR 或 CSR + SWR/TanStack Query
   │
   ├── SEO 重要吗？
   │   ├── 是 → SSR / SSG / ISR
   │   └── 否 → CSR
   │
   └── 团队/预算？
       ├── 小团队/低成本 → SSG / CSR
       └── 大团队/充足资源 → SSR / Next.js 全栈
   ```

### 🔍 追问链
1. **Next.js 的 ISR (Incremental Static Regeneration) 的 revalidate 机制是怎么工作的？**
   → 方向：后台触发式重新验证；用户请求时检查缓存是否过期，过期则在后台重新生成并返回新的
2. **Hydration 失败的常见原因有哪些？如何排查？**
   → 方向：服务端和客户端 HTML 不一致（时间戳/随机数/平台差异 API）、嵌套标签不匹配、注释位置不同
3. **Partial Hydration（选择性注水）和 Islands 架构是什么？**
   → 方向：只对交互区域 hydration，其余部分保持纯 HTML；Astro 框架的核心概念

---

## Q51: Next.js App Router 的核心概念是什么？Server Components (RSC) 是如何工作的？

- **难度**：★★★
- **知识点**：Next.js / App Router / RSC / 服务端组件
- **题型**：架构理解题

### 参考答案要点：

1. **App Router vs Pages Router**
   ```
   Pages Router (传统):
   - 基于 file-system routing
   - pages/ 目录
   - getServerSideProps / getStaticProps
   - 全部是 Client Components（除非特殊处理）

   App Router (新一代):
   - app/ 目录
   - Server Components by Default
   - Layouts / Loading states / Error boundaries 内置
   - Streaming / Parallel Routes
   - 更好的 TypeScript 支持
   ```

2. **Server Components (RSC) 核心概念**
   ```tsx
   // app/page.tsx

   // 🟢 Server Component（默认）
   // - 在服务器上渲染
   // - 可以直接访问数据库、文件系统
   // - 不发送 JS 到客户端（体积小）
   // - 不能使用 useState/useEffect 等客户端 Hooks
   async function Page() {
     // ✅ 可以直接查询数据库
     const posts = await db.posts.findMany();

     return (
       <main>
         <h1>Blog Posts</h1>
         {/* Server Component 可以渲染 Client Component */}
         <PostList posts={posts} />
       </main>
     );
   }

   // 🔵 Client Component（需要标记）
   'use client';

   // - 在浏览器中渲染
   // - 可以使用 Hooks、事件处理器
   // - JS 会发送到客户端
   import { useState } from 'react';

   function PostList({ posts }: { posts: Post[] }) {
     const [filter, setFilter] = useState('');

     // ✅ 可以使用客户端特性
     const filtered = posts.filter(p => p.title.includes(filter));

     return (
       <div>
         <input
           value={filter}
           onChange={(e) => setFilter(e.target.value)}
           placeholder="搜索..."
         />
         {filtered.map(post => <PostCard key={post.id} post={post} />)}
       </div>
     );
   }
   ```

3. **RSC 的工作原理**
   ```
   传统的 SSR:
   服务器渲染 HTML → 发送到客户端 → 下载 JS → Hydration（重新执行一遍）

   RSC:
   服务器渲染组件树 → 生成特殊的 RSC Payload（类似 JSON）→
   客户端接收 Payload → 仅合并差异（无需重新执行 Server Component 的代码）

   关键区别：
   - Server Component 的代码永远不会发送到浏览器
   - 只有 Client Component 的代码会被下载
   - 显著减少客户端 JS bundle 体积
   ```

4. **App Router 的文件约定**
   ```
   app/
   ├── layout.tsx          # 根 Layout（必需）
   │   ├── page.tsx        # 首页 (/)
   │   ├── loading.tsx     # 加载状态（内置 Suspense）
   │   ├── error.tsx       # 错误边界
   │   ├── not-found.tsx   # 404 页面
   │   │
   │   ├── about/
   │   │   └── page.tsx    # /about
   │   │
   │   ├── blog/
   │   │   ├── page.tsx    # /blog
   │   │   ├── [slug]/
   │   │   │   └── page.tsx  # /blog/:slug（动态路由）
   │   │   └── loading.tsx  # blog 下的加载状态
   │   │
   │   └── (marketing)/    # 路由组（不影响 URL）
   │       ├── layout.tsx  # marketing 组的共享布局
   │       └── page.tsx    # /
   │
   └── globals.css         # 全局样式
   ```

5. **Server Actions（服务端函数）**
   ```tsx
   // 定义 Server Action
   async function createPost(formData: FormData) {
     'use server';  // 标记为服务端函数

     const title = formData.get('title') as string;
     const content = formData.get('content') as string;

     // 直接操作数据库（在服务器端执行）
     await db.posts.create({ data: { title, content } });

     revalidatePath('/blog');  // 使相关页面缓存失效
   }

   // 在 Client Component 中使用
   'use client';

   import { createPost } from './actions';

   function CreatePostForm() {
     return (
       <form action={createPost}>  {/* 直接作为 form 的 action */}
         <input name="title" required />
         <textarea name="content" required />
         <button type="submit">发布</button>
       </form>
     );
   }
   ```

6. **RSC 的限制与注意事项**
   ```
   Server Component 不能：
   - 使用 useState / useReducer / useContext 等 Hooks
   - 使用 useEffect / useLayoutEffect
   - 使用仅浏览器 API（window, document, localStorage）
   - 使用事件处理器（onClick, onChange 等）
   - 引用 Client Component 但不能传入事件处理器作为 prop

   最佳实践：
   - 数据获取、数据库查询 → Server Component
   - 交互、状态、副作用 → Client Component
   - Server Component 渲染 Client Component 并传入数据
   - 保持 Server Component 的纯粹性（无副作用）
   ```

---

## Q52: 什么是 Hydration？Hydration 过程中可能出现哪些问题？如何解决？

- **难度**：★★★
- **知识点**：SSR / Hydration / 一致性 / 调试
- **题型**：原理分析题 + 问题排查题

### 参考答案要点：

1. **Hydration 的定义与流程**
   ```
   Hydration（水合/注水）：
   将服务器渲染的静态 HTML "激活" 为可交互的 React 应用

   完整流程：
   1. 服务器执行 React 组件 → 生成 HTML 字符串
   2. HTML 发送到浏览器 → 用户看到内容（快速首屏）
   3. 浏览器下载 JS bundle
   4. React 在客户端执行（不重新渲染 DOM）
   5. React 将事件监听器附加到现有 DOM 节点上
   6. 应用变为可交互（Hydration 完成）

   关键点：
   - 服务器 HTML 必须与客户端渲染结果一致
   - 否则会报 Hydration Mismatch 错误
   ```

2. **Hydration Mismatch 的常见原因及解决**

   **原因 1：使用了仅在客户端可用的 API**
   ```tsx
   // ❌ 问题：window 在服务端不存在
   function Component() {
     const [width, setWidth] = useState(window.innerWidth);
     // 服务端渲染时 window 不存在 → 报错或不一致
   }

   // ✅ 解决：使用 useEffect（只在客户端执行）
   function Component() {
     const [width, setWidth] = useState(0);

     useEffect(() => {
       setWidth(window.innerWidth);
       const handleResize = () => setWidth(window.innerWidth);
       window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize);
   }, []);

     return <div>宽度: {width}px</div>;  // 首次渲染显示 0，然后更新
   }
   ```

   **原因 2：随机值或时间戳**
   ```tsx
   // ❌ 问题：每次渲染结果不同
   function RandomId() {
     return <div>ID: {Math.random()}</div>;  // 服务端和客户端不同
   }

   function Timestamp() {
     return <div>时间: {Date.now()}</div>;  // 渲染时间不同
   }

   // ✅ 解决：使用 useId（React 18）或延迟初始化
   function SafeRandomId() {
     const [id, setId] = useState('');

     useEffect(() => {
       setId(Math.random().toString(36).substr(2, 9));
     }, []);

     return <div>ID: {id || '...'}</div>;
   }
   ```

   **原因 3：日期格式化（时区问题）**
   ```tsx
   // ❌ 问题：服务端和客户端可能在不同时区
   function DateDisplay({ date }) {
     return <div>{date.toLocaleString()}</div>;  // 结果可能不同
   }

   // ✅ 解决：统一时区或使用 UTC
   function DateDisplay({ date }) {
     return <div>{date.toISOString()}</div>;  // 时区无关
   }
   ```

   **原因 4：浏览器扩展修改 DOM**
   ```
   某些浏览器扩展（如 LastPass、Grammarly）会在页面加载时修改 DOM
   这可能导致 React 检测到不一致

   解决：
   - 开发时禁用扩展测试
   - 生产环境中这种情况较少见
   ```

3. **Hydration 策略选择**
   ```tsx
   // Next.js 中的 Hydration 选项

   // 1. 完全 Hydration（默认）
   // 严格模式：必须完全一致

   // 2.Selective Hydration（React 18）
   // 使用 Suspense 边界实现渐进式 Hydration
   <Suspense fallback={<Skeleton />}>
     <SlowComponent />  {/* 这个组件可以延迟 Hydrate */}
   </Suspense>

   // 3. Progressive Hydration（Next.js）
   // 使用 next/dynamic 的 ssr: false 选项
   import dynamic from 'next/dynamic';

   const HeavyComponent = dynamic(
     () => import('./HeavyComponent'),
     { ssr: false }  // 客户端-only，跳过 SSR/Hydration
   );
   ```

4. **调试 Hydration 问题**
   ```
   React 18 的开发模式提示：
   - Warning: Text content did not match.
   - Warning: Expected server HTML to contain a <div>.

   调试步骤：
   1. 查看控制台的具体警告信息
   2. 定位到出问题的组件
   3. 检查是否有服务端/客户端差异的代码
   4. 使用 <NoSSR> 包装仅在客户端运行的组件

   // NoSSR 组件封装
   import { useState, useEffect } from 'react';

   export function NoSSR({ children, fallback = null }) {
     const [isClient, setIsClient] = useState(false);

     useEffect(() => {
       setIsClient(true);
     }, []);

     return isClient ? <>{children}</> : <>{fallback}</>;
   }

   // 使用
   <NoSSR fallback={<div>Loading...</div>}>
     <OnlyClientComponent />
   </NoSSR>
   ```

5. **Hydration 性能优化**
   ```
   Hydration 本身也是性能瓶颈之一：
   - 大型应用的 Hydration 可能需要数百毫秒
   - 期间用户看到的页面不可交互

   优化策略：
   1. Streaming SSR：分块发送 HTML，边接收边 Hydrate
   2. Island Architecture：只有交互部分需要 Hydrate
   3. Partial Hydration：延迟 Hydrate 非关键部分
   4. React Server Components：减少需要 Hydrate 的代码量
   ```

### 🔍 追问链
1. **Hydration 和 SSR 的关系？没有 SSR 就没有 Hydration 吗？**
   → 方向：Hydration 是 SSR 流程的第二阶段（客户端激活）；CSR 没有 Hydration（因为没有预渲染 HTML）
2. **Hydration 时的警告 "Text content does not match" 通常是什么原因？**
   → 方向：服务端渲染的内容和客户端重新渲染的不一致（通常是动态数据如 Date.now()/Math.random()）
3. **React 19 的 hydration 有什么改进？Selective Hydration？**
   → 方向：支持渐进式注水（先注水可见区域，后续按需注水其他部分）；Suspense 配合 Streaming 实现

---

## Q53: React 18 的 Streaming SSR 是如何工作的？请详细说明 renderToPipeableStream 的使用。

- **难度**：★★★
- **知识点**：Streaming SSR / React 18 / renderToPipeableStream / 性能
- **题型**：原理深入题 + 代码实践题

### 参考答案要点：

1. **传统 SSR vs Streaming SSR**
   ```
   传统 SSR（全部或无）：
   服务器必须完成所有数据获取和渲染
   才能发送任何 HTML 到客户端
   TTFB = max(所有数据获取时间 + 渲染时间)

   Streaming SSR（流式）：
   服务器尽早发送初始 HTML
   后续内容逐步流式传输
   TTFB = 骨架/Shell 的渲染时间（很短）
   用户更快看到内容
   ```

2. **renderToPipeableStream 基本用法**
   ```tsx
   // server.tsx（Node.js 服务器）
   import { renderToPipeableStream } from 'react-dom/server';
   import App from './App';

   function handleRequest(req, res) {
     // 创建可写流
     const { pipe, abort } = renderToPipeableStream(
       <App />,
       {
         // Shell 准备好后触发的回调
         onShellReady() {
           // 开始向客户端发送 HTML
           res.setHeader('Content-Type', 'text/html');
           pipe(res);  // 将 React 输出管道到 HTTP response
         },

         // 所有内容渲染完成的回调
         onAllReady() {
           // 如果需要在流结束后做些什么
           // 通常不需要（shell 已发送）
         },

         // 出错时的回调
         onError(error) {
           console.error(error);
           res.statusCode = 500;
           res.send('Internal Server Error');
         },

         // 超时时间（可选）
         bootstrapScripts: ['/main.js'],  // 客户端入口
         namespaceURI: 'http://www.w3.org/1999/xhtml',
       }
     );

     // 可以在超时时中止（AbortController）
     setTimeout(() => {
       abort();  // 中止流式传输
     }, 10000);  // 10 秒超时
   }
   ```

3. **Streaming + Suspense 的协作**
   ```tsx
   // App.tsx
   import { Suspense, lazy } from 'react';

   const SlowComponent = lazy(() => import('./SlowComponent'));  // 模拟慢组件
   const FastComponent = () => <div>快速加载的内容</div>;

   function App() {
     return (
       <html>
         <body>
           <div id="root">
             {/* 这部分会最先发送到客户端 */}
             <FastComponent />

             {/* 这部分会阻塞，直到数据准备好 */}
             <Suspense fallback={<div>加载中...</div>}>
               <SlowDataComponent />
             </Suspense>

             {/* 另一个独立的 Suspense 边界 */}
             <Suspense fallback={<div>评论加载中...</div>}>
               <CommentsSection postId="123" />
             </Suspense>
           </div>
         </body>
       </html>
     );
   }

   // SlowDataComponent.tsx
   async function SlowDataComponent() {
     // 这个数据获取会阻塞这个 Suspense 边界
     const data = await fetchDataFromAPI('/slow-endpoint');  // 耗时 3 秒

     return (
       <section>
         <h2>慢数据</h2>
         <pre>{JSON.stringify(data, null, 2)}</pre>
       </section>
     );
   }

   // Streaming 传输顺序：
   // 1. <html><body><div id="root">  ← Shell（几乎立即）
   // 2. <FastComponent /> 内容     ← 立即
   // 3. <div>加载中...</div>        ← Suspense fallback
   // 4. （3秒后...）
   // 5. 替换为 <SlowDataComponent /> 的实际内容
   // 6. <div>评论加载中...</div>    ← 第二个 fallback
   // 7. （评论数据就绪后...）
   // 8. 替换为 <CommentsSection /> 的实际内容
   // 9. </div></body></html>        ← 结束标签
   ```

4. **客户端接收与处理**
   ```tsx
   // main.tsx（客户端入口）
   import { hydrateRoot } from 'react-dom/client';
   import App from './App';

   // 使用 hydrateRoot 替代 ReactDOM.hydrate
   // 支持 Concurrent Features 和 Streaming
   hydrateRoot(
     document.getElementById('root'),
     <App />
   );

   // Streaming SSR 的客户端行为：
   // 1. 收到 Shell HTML → 立即显示（用户看到内容）
   // 2. 收到更多 HTML 片段 → 插入到正确位置
   // 3. JS 加载完成 → 开始 Hydration
   // 4. Hydration 也是渐进式的（Selective Hydration）
   ```

5. **Streaming SSR 的架构优势**
   ```
   性能优势：
   - TTFB 大幅降低（从秒级降到百毫秒级）
   - 用户感知的加载速度显著提升
   - 可以利用浏览器的流式解析能力

   服务器资源优势：
   - 不需要等待所有数据就释放连接
   - 服务器可以同时服务更多请求
   - 减少内存峰值使用

   用户体验优势：
   - 渐进式内容展示（骨架 → 内容 → 交互）
   - 更好的感知性能
   - 支持 Progressive Enhancement
   ```

6. **生产环境集成示例（Express + React 18）**
   ```typescript
   // server/index.ts
   import express from 'express';
   import { renderToPipeableStream } from 'react-dom/server';
   import App from '../shared/App';
   import htmlTemplate from './template';

   const app = express();

   app.get('*', (req, res) => {
     const { pipe, abort } = renderToPipeableStream(
       <App location={req.url} />,
       {
         bootstrapScripts: ['/static/main.js'],
         onShellReady() {
           res.statusCode = 200;
           res.setHeader('Content-Type', 'text/html; charset=utf-8');

           // 注入初始 HTML shell
           const shellHtml = htmlTemplate.replace(
             '<div id="root"></div>',
             '<div id="root">'
           ).replace(
             '</body>',
             '</div></body>'
           );

           res.write(shellHtml);
           pipe(res);  // 流式输出 React 内容
         },
         onError(err) {
           console.error('Streaming error:', err);
           if (!res.headersSent) {
             res.statusCode = 500;
           }
           res.end('Internal Server Error');
         },
       }
     );

     // Abort after 10 seconds
     setTimeout(abort, 10_000);
   });

   app.listen(3000, () => {
     console.log('Server running on http://localhost:3000');
   });
   ```

---

# 附录

## 📊 知识体系速查表

| 知识模块 | 核心考点 | 对应题目 |
|---------|---------|---------|
| **JSX 与编译** | Babel 转换、createElement、虚拟 DOM 结构 | Q01-Q04 |
| **渲染机制** | createRoot、Fiber、Diff、并发模式 | Q05, Q28-Q31 |
| **组件基础** | 函数/类组件、Props、受控/非受控 | Q06-Q07, Q12 |
| **Hooks 基础** | useState、useEffect、事件处理 | Q08-Q09, Q14 |
| **渲染模式** | 条件渲染、列表渲染、Fragment | Q10-Q11 |
| **Hooks 深入** | 规则原理、批量更新、依赖数组、useRef/useMemo/useCallback | Q18-Q23, Q42 |
| **Hooks 进阶** | 自定义 Hook、useReducer、React 18 新 Hooks | Q25-Q27 |
| **Context** | API 使用、性能问题、优化方案 | Q24, Q32 |
| **设计模式** | Render Props、Compound Components、Portal | Q33-Q35 |
| **Ref 操作** | forwardRef、useImperativeHandle | Q36 |
| **状态管理** | Redux/RTK/Zustand/Jotai/TanStack Query 选型与使用 | Q37-Q41 |
| **性能优化** | React.memo、虚拟列表、代码分割、Worker、Key、Profiler | Q43-Q49 |
| **SSR / RSC** | CSR/SSR/SSG/ISR、Hydration、Streaming、Server Components | Q50-Q53 |
| **调试与工具** | DevTools、常见错误、Profiler | Q16-Q17, Q48 |
| **CSS 与样式** | 各种方案对比 | Q15 |
| **路由** | React Router v6、权限控制 | Q41 |

## 🎯 学习建议

### 按经验水平的学习路径

#### 初学者（0-1 年）
```
第 1 阶段：夯实基础（建议 2-3 周）
├── Q01-Q17（基础层全部）
├── 重点掌握：JSX、组件、Props/State、Hooks 基础
├── 动手练习：TodoMVC、天气应用
└── 目标：能够独立完成中小型 React 项目

第 2 阶段：进阶提升（建议 3-4 周）
├── Q18-Q27（Hooks 深入 + 虚拟 DOM/Fiber）
├── Q32-Q36（组件通信与设计模式）
├── 重点掌握：Hooks 原理、Diff 算法、状态管理选择
├── 动手练习：重构项目、阅读开源组件源码
└── 目标：理解 React 内部工作机制
```

#### 中级开发者（1-3 年）
```
第 1 阶段：查漏补缺（建议 1-2 周）
├── 快速浏览 Q01-Q27
├── 针对薄弱环节深入学习
└── 补齐基础知识体系

第 2 阶段：深度突破（建议 3-4 周）
├── Q28-Q41（进阶层全部）
├── Q43-Q49（性能优化专题）
├── 重点：Fiber 架构、并发模式、状态管理实战
├── 阅读 React 源码（reconciler、hooks）
├── 动手：实现简易版 React（mini-react）
└── 目标：具备技术选型和性能调优能力
```

#### 高级开发者（3 年+）
```
重点攻克：
├── Q42（Hooks 源码级实现）
├── Q50-Q53（SSR/RSC/Streaming）
├── Q47（Key 与 Diff 深入）
├── Q49（首屏优化全栈方案）
├── 研究 React 19 新特性
├── 阅读 React Repo 源码
├── 关注 RFC 和讨论
└── 目标：具备架构设计和源码级理解能力
```

### 学习资源推荐

| 类型 | 资源 | 说明 |
|------|------|------|
| **官方文档** | [React 官网](https://react.dev/) | 最权威的学习资料 |
| **源码阅读** | [React 源码 (GitHub)](https://github.com/facebook/react) | 理解内部实现 |
| **深入系列** | 《React 技术揭秘》| 卡颂著，中文最佳深度读物 |
| **视频课程** | Epic React (Kent C. Dodds) | 系统化的高级教程 |
| **实战项目** | 构建 mini-react | 从零实现 React 核心功能 |
| **社区讨论** | React GitHub Discussions | 了解设计决策和未来方向 |

### 面试准备技巧

1. **STAR 法则回答问题**
   - Situation（情境）：什么背景下遇到的问题
   - Task（任务）：需要解决什么
   - Action（行动）：具体怎么做的
   - Result（结果）：取得了什么成效

2. **画图辅助表达**
   - Fiber 树结构图
   - 数据流向图
   - 生命周期/渲染流程图
   - 架构设计图

3. **代码演示能力**
   - 白板写出清晰的代码
   - 解释每一行的作用
   - 能指出潜在问题和优化点

4. **反向提问**
   - 展现对技术的热情和思考
   - 了解团队的技术栈和工作方式

---

> **声明**：本题库基于 React 18/19 版本编写，涵盖截至 2026 年的核心知识点。
> 部分内容参考了 React 官方文档、源码及社区最佳实践。
> 如有疏漏或改进建议，欢迎反馈。

---

*最后更新：2026-06-14 | Version 1.0*