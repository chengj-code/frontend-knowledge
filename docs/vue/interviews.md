---
---
# Vue.js 面试题库（2025-2026 企业实战版）

> 本文档涵盖 Vue2/Vue3 核心知识点，按难度分层，适合面试准备与技术复习。

---

## 一、基础层（★☆☆）

---

## Q01: 请简述 Vue 的模板语法主要包含哪些类型？分别举例说明。
- **难度**：★☆☆
- **知识点**：模板语法/插值表达式/指令
- **题型**：简答题

### 参考答案要点：

1. **插值语法（Mustache 语法）**
   - 文本插值：`{{ message }}`
   - 支持 JavaScript 表达式：`{{ message.split('').reverse().join('') }}`

2. **指令语法**
   - 内容指令：`v-text`、`v-html`
   - 属性绑定：`v-bind:id="dynamicId"` 或缩写 `:id`
   - 事件绑定：`v-click:click="handleClick"` 或缩写 `@click`
   - 条件渲染：`v-if`、`v-else-if`、`v-else`
   - 列表渲染：`v-for="item in items"`
   - 双向绑定：`v-model`

3. **动态参数**
   - `v-bind:[attributeName]="url"` （Vue3 支持方括号语法）

4. **修饰符**
   - 事件修饰符：`.stop`、`.prevent`、`.once`
   - 按键修饰符：`.enter`、`.esc`
   - v-model 修饰符：`.trim`、`.number`、`.lazy`

### 🔍 追问链
1. **v-html 有什么安全风险？如何防范 XSS？**
   → 方向：innerHTML 注入、DOMPurify、v-text 替代方案
2. **动态参数 `v-bind:[attr]` 有什么限制？**
   → 方向：不能有空格/引号、必须小写（HTML 约束）、运行时表达式求值开销
3. **模板编译后生成的渲染函数长什么样？**（进阶）
   → 方向：_c/_h/_s 等辅助函数、with(this) 包裹、render 函数优化

---

## Q02: v-if 和 v-show 有什么区别？在什么场景下选择哪个？
- **难度**：★☆☆
- **知识点**：条件渲染/性能优化
- **题型**：简答题 + 场景分析

### 参考答案要点：

1. **本质区别**
   - `v-if`：**真正的条件渲染**，条件为 false 时完全销毁 DOM 元素和事件监听器；条件切换时会触发组件的销毁和重建流程（触发生命周期钩子）
   - `v-show`：**CSS 切换**，只是简单地切换元素的 `display` 属性（`display: none`），DOM 元素始终存在

2. **性能对比**
   - `v-if`：初始渲染开销低（条件为 false 时不渲染），但切换开销高（涉及 DOM 操作和组件生命周期）
   - `v-show`：初始渲染开销高（无论条件如何都会渲染），但切换开销低（仅 CSS 切换）

3. **适用场景**
   - ✅ 选择 `v-if`：运行时条件很少改变、权限控制、首次加载不需要的内容（如：模态框、权限按钮）
   - ✅ 选择 `v-show`：需要频繁切换显示/隐藏的场景（如：Tab 切换、下拉菜单、手风琴组件）

4. **注意事项**
   - `v-if` 和 `v-for` 不建议同时使用在同一元素上（Vue2 中 v-for 优先级更高，Vue3 中 v-if 优先级更高）
   - `v-show` 不支持 `<template>` 元素，也不支持 `v-else`

### 🔍 追问链
1. **v-if 切换时生命周期怎么触发？**
   → 方向：销毁→重建流程，created/mounted/beforeDestroy/destroyed 全部重新执行
2. **v-if 和 v-for 同时使用有什么问题？Vue2/Vue3 优先级差异？**
   → 方向：Vue2 v-for优先导致每次循环都判断v-if（性能浪费），Vue3 v-if优先但需要用template包裹
3. **如果用 v-show 控制大量节点，有什么优化手段？**
   → 方向：虚拟滚动、分页渲染、v-memo

---

## Q03: v-for 中的 key 有什么作用？为什么推荐使用唯一 ID 作为 key？
- **难度**：★☆☆
- **知识点**：列表渲染/diff算法/key原理
- **题型**：简答题

### 参考答案要点：

1. **key 的作用**
   - 为 Vue 提供一个节点标识，帮助 Virtual DOM 在 diff 过程中**精准识别节点**
   - 使 Vue 能复用和重新排序现有元素，而不是强制替换它们

2. **工作原理**
   - 无 key 时：采用"就地更新"策略（in-place patch），按顺序对比，可能导致错误的 DOM 复用
   - 有 key 时：基于 key 进行精确匹配，能正确识别节点的移动、新增、删除操作

3. **为什么推荐唯一 ID**
   - 使用 index 作为 key 的问题：
     - 当列表进行插入、删除、排序操作时，index 会变化，导致 Vue 无法正确复用节点
     - 可能引发：输入框内容错位、过渡动画异常、不必要的 DOM 更新
   - 使用唯一 ID 的优势：
     - 保证 key 的稳定性，无论列表如何变化，每个数据项的 key 都保持不变
     - 最大化 DOM 复用效率，提升渲染性能

4. **最佳实践**
   ```html
   <!-- ✅ 推荐 -->
   <div v-for="item in list" :key="item.id">{{ item.name }}</div>

   <!-- ❌ 避免（仅在静态列表或无增删操作时可用） -->
   <div v-for="(item, index) in list" :key="index">{{ item.name }}</div>
   ```

### 🔍 追问链
1. **用 index 做 key 有什么问题？什么时候可以用 index？**
   → 方向：逆序添加/删除导致错误的复用、列表纯展示无状态时可用index
2. **key 的 diff 匹配过程是怎样的？（结合双端对比算法）**
   → 方向：头头、尾尾、头尾、尾头、key map 查找五种策略
3. **为什么不要用随机数做 key？**
   → 方向：每次渲染都生成新key→无法复用→全量更新DOM

---

## Q04: Vue 中常用的指令有哪些？请分类说明。
- **难度**：★☆☆
- **知识点**：指令系统/内置指令
- **题型**：简答题

### 参考答案要点：

1. **内容渲染指令**
   - `v-text`：更新元素的 textContent
   - `v-html`：更新元素的 innerHTML（⚠️ XSS 风险，需确保内容可信）

2. **属性绑定指令**
   - `v-bind` / `:`：动态绑定属性（class、style、任意属性）
   - `v-model`：双向数据绑定（表单元素）

3. **逻辑控制指令**
   - `v-if` / `v-else-if` / `v-else`：条件渲染（真正销毁/重建）
   - `v-show`：条件显示（CSS display 切换）
   - `v-for`：循环渲染

4. **事件处理指令**
   - `v-on` / `@`：事件绑定
   - 修饰符：`.stop`、`.prevent`、`.capture`、`.self`、`.once`、`.passive`

5. **特殊指令**
   - `v-once`：只渲染一次，后续视为静态内容（性能优化）
   - `v-pre`：跳过编译，直接输出原始内容
   - `v-cloak`：配合 CSS 解决模板闪烁问题（`[v-cloak] { display: none }`）
   - `v-memo`（Vue3.2+）：基于依赖的缓存，条件性地跳过 VNode 更新

6. **自定义指令**
   - 全局注册：`app.directive('focus', { ... })`
   - 局部注册：`directives: { focus: { ... } }`
   - 钩子函数：`beforeMount`、`mounted`、`beforeUpdate`、`updated`、`beforeUnmount`、`unmounted`

---

## Q05: v-model 的实现原理是什么？如何在自定义组件中实现 v-model？
- **难度**：★☆☆
- **知识点**：双向绑定/组件通信/自定义指令
- **题型**：代码分析题 + 编程实践题

### 参考答案要点：

1. **原生元素上的 v-model 本质**
   - 是 `v-bind` + `v-on` 的语法糖
   - 不同表单元素的默认行为不同：
     ```html
     <!-- 输入框 -->
     <input v-model="text" />
     <!-- 等价于 -->
     <input :value="text" @input="text = $event.target.value" />
     
     <!-- 复选框 -->
     <input type="checkbox" v-model="checked" />
     <!-- 等价于 -->
     <input type="checkbox" :checked="checked" @change="checked = $event.target.checked" />
     ```

2. **Vue3 自定义组件 v-model 实现**
   - 默认 prop：`modelValue`，默认事件：`update:modelValue`
   ```html
   <!-- 父组件使用 -->
   <CustomInput v-model="searchText" />
   
   <!-- 子组件实现 -->
   <script setup>
   const props = defineProps(['modelValue'])
   const emit = defineEmits(['update:modelValue'])
   
   function updateValue(newValue) {
     emit('update:modelValue', newValue)
   }
   </script>
   
   <template>
     <input :value="modelValue" @input="updateValue($event.target.value)" />
   </template>
   ```

3. **多个 v-model 参数（Vue3）**
   ```html
   <UserName
     v-model:first-name="first"
     v-model:last-name="last"
   />
   
   // 子组件
   defineProps(['firstName', 'lastName'])
   defineEmits(['update:firstName', 'update:lastName'])
   ```

4. **v-model 修饰符**
   - 自定义修饰符：通过 `modelModifiers` prop 接收
   ```html
   <MyComponent v-model.capitalize="myText" />
   // modelModifiers: { capitalize: true }
   ```

---

## Q06: Vue 组件的 data 为什么必须是一个函数？
- **难度**：★☆☆
- **知识点**：组件基础/data选项
- **题型**：简答题

### 参考答案要点：

1. **根本原因：避免数据污染**
   - Vue 组件可能被复用多次，如果 data 是对象，所有实例将共享同一个引用
   - 函数形式保证每次创建组件实例时返回一个全新的独立对象

2. **代码示例说明**
   ```javascript
   // ❌ 错误：data 是对象（根实例可以，组件不行）
   data: {
     count: 0
   }
   // 多个组件实例共享同一个 { count: 0 }
   
   // ✅ 正确：data 是函数
   data() {
     return {
       count: 0
     }
   }
   // 每个组件实例调用函数，获得独立的 { count: 0 }
   ```

3. **特殊情况**
   - Vue 根实例的 data 可以是对象（因为只有一个根实例）
   - 但为了保持一致性，推荐统一使用函数形式

4. **底层机制**
   - Vue 在合并选项时会对 data 进行初始化处理
   - 组件系统中通过 `Vue.extend()` 创建子类时，会执行 `data()` 返回新对象
   - 这类似于构造函数模式，每次 new 实例都执行一次初始化

---

## Q07: 请描述 Vue 组件的生命周期钩子及其执行顺序。
- **难度**：★☆☆
- **知识点**：生命周期/组件基础
- **题型**：简答题

### 参考答案要点：

1. **Vue3 Composition API 生命周期钩子**
   ```
   创建阶段：
   setup() → onBeforeMount() → onMounted()
   
   更新阶段：
   onBeforeUpdate() → onUpdated()
   
   卸载阶段：
   onBeforeUnmount() → onUnmounted()
   
   特殊钩子（keep-alive 缓存组件）：
   onActivated()    // 进入缓存
   onDeactivated()  // 离开缓存
   
   错误捕获：
   onErrorCaptured()  // 捕获子组件错误
   ```

2. **各阶段详细说明**

   | 阶段 | 钩子 | 说明 | 典型用途 |
   |------|------|------|----------|
   | 创建 | setup | props 解析后立即执行，无法访问 DOM | 初始化响应式数据、设置方法 |
   | 挂载前 | beforeMount | 首次 render 调用之前 | 最后修改数据的时机 |
   | 挂载完成 | mounted | DOM 已创建并挂载 | 操作 DOM、发起请求、初始化第三方库 |
   | 更新前 | beforeUpdate | 数据变化后，DOM 更新前 | 可访问现有 DOM，适合移除手动添加的事件监听 |
   | 更新完成 | updated | DOM 更新完成后 | 依赖更新后 DOM 的操作 |
   | 卸载前 | beforeUnmount | 实例仍可用 | 清理定时器、取消订阅、解绑事件 |
   | 卸载完成 | unmounted | 实例已销毁 | 最终清理（通常在 beforeUnmount 完成） |

3. **父子组件生命周期执行顺序**
   ```
   Parent beforeCreate → Parent created → Parent beforeMount
   → Child beforeCreate → Child created → Child beforeMount → Child mounted
   → Parent mounted
   ```

4. **注意事项**
   - `setup()` 替代了 `beforeCreate` 和 `created`
   - 不要在 `beforeUpdate` 和 `updated` 中修改状态（会导致无限循环）
   - 服务端渲染（SSR）只支持 `beforeCreate` 和 `created`（无 DOM 环境）

### 🔍 追问链
1. **父子组件的生命周期执行顺序是什么？**
   → 方向：父beforeCreate→父created→父beforeMount→子beforeCreate...→子mounted→父mounted（外层到内层的"洋葱模型"）
2. **keep-alive 包裹的组件生命周期有什么变化？**
   → 方向：新增 activated/deactivated，不再触发 created/mounted/unmounted
3. **请求应该放在 created 还是 mounted 中？为什么？**
   → 方向：created 更早（能更快拿到数据）、SSR 场景只能用 created

---

## Q08: computed 和 watch 有什么区别？各自的使用场景是什么？
- **难度**：★☆☆
- **知识点**：计算属性/侦听器/响应式
- **题型**：简答题 + 对比分析

### 参考答案要点：

1. **核心区别**

   | 特性 | computed | watch |
   |------|----------|-------|
   | **缓存** | ✅ 有缓存，依赖不变则不重新计算 | ❌ 无缓存，每次变化都执行回调 |
   | **返回值** | 必须有返回值（ getter ） | 无需返回值，用于副作用 |
   | **同步性** | 同步计算 | 支持异步操作 |
   | **参数** | 不能传参（可用闭包模拟） | 可接收新旧值 |
   | **首次执行** | 首次访问时计算 | 默认不执行，immediate: true 可立即执行 |

2. **computed 适用场景**
   - ✅ 一个数据受多个数据影响（多对一）：`fullName = firstName + lastName`
   - ✅ 模板中的复杂逻辑需要简化
   - ✅ 需要缓存以优化性能的计算
   - ✅ 过滤、格式化数据展示

   ```javascript
   const fullName = computed(() => {
     return `${person.firstName} ${person.lastName}`
   })
   ```

3. **watch 适用场景**
   - ✅ 一个数据变化影响多个数据（一对多）：监听路由变化重置数据
   - ✅ 需要执行异步或昂贵操作：API 请求、动画
   - ✅ 需要限制执行频率：debounce、throttle
   - ✅ 数据变化时需要执行副作用：日志、上报

   ```javascript
   watch(
     () => route.query.id,
     async (newId) => {
       const data = await fetchUser(newId)
       userInfo.value = data
     },
     { immediate: true }
   )
   ```

4. **computed 的进阶用法**
   - 可写计算属性（get/set）：
   ```javascript
   const fullName = computed({
     get: () => `${first.value} ${last.value}`,
     set: (val) => {
       [first.value, last.value] = val.split(' ')
     }
   })
   ```

5. **watchEffect vs watch**
   - `watchEffect`：自动追踪依赖，无需显式指定源，立即执行一次
   - `watch`：显式指定源，更精确的控制，可访问旧值

### 🔍 追问链
1. **computed 为什么有缓存而 watch 没有？**
   → 方向：computed 的 dirty 标志位机制、依赖不变则返回缓存值；watch 每次变化都执行回调
2. **watch 的 immediate 和 flush 选项分别解决什么问题？**
   → 方向：immediate 首次执行、flush:'post' 在 DOM 更新后执行（访问更新后的 DOM）
3. **computed 能否接收参数？如何实现？**
   → 方向：computed 不能直接传参，但可以返回一个函数（闭包方式）

---

## Q09: Vue 中有哪些常用的组件通信方式？请举例说明每种方式。
- **难度**：★☆☆
- **知识点**：组件通信/props/emit/provide-inject
- **题型**：综合应用题

### 参考答案要点：

1. **Props / Emit（父子通信）**
   ```javascript
   // 父传子：props
   <ChildComponent :title="pageTitle" :count="itemCount" @update="handleUpdate" />
   
   // 子传父：emit
   const emit = defineEmits(['update', 'delete'])
   emit('update', newValue)
   ```

2. **Provide / Inject（跨层级通信）**
   ```javascript
   // 祖先组件 provide
   import { provide, ref } from 'vue'
   const themeColor = ref('blue')
   provide('theme', themeColor)
   
   // 后代组件 inject
   const theme = inject('theme', 'defaultTheme')  // 第二个参数是默认值
   ```

3. **$refs（父访问子）**
   ```html
   <ChildComponent ref="childRef" />
   <script setup>
   const childRef = ref(null)
   function callChildMethod() {
     childRef.value?.childMethod()
   }
   </script>
   ```

4. **$attrs / $listeners（透传属性）**
   - `$attrs`：传递未被 props 接收的属性
   - Vue3 中 `$listeners` 合并到 `$attrs`
   ```html
   <!-- 继承非 Prop 的 attribute -->
   <div v-bind="$attrs">
   ```

5. **EventBus / mitt（兄弟/跨级通信）**
   ```javascript
   // Vue3 推荐使用 mitt 库
   import mitt from 'mitt'
   const emitter = mitt()
   
   emitter.on('foo', (e) => console.log('foo', e))
   emitter.emit('foo', { a: 'b' })
   emitter.off('foo')
   ```

6. **Pinia / Vuex（全局状态管理）**
   - 适用于复杂应用、多个不相关组件共享状态
   - 后续详见 Pinia 相关问题

7. **v-model（双向绑定）**
   - 适用于表单输入、紧密耦合的父子组件

8. **通信方式选择指南**
   - 父子简单通信 → Props / Emit
   - 跨层级主题/配置 → Provide / Inject
   - 直接调用子组件方法 → $refs
   - 兄弟组件/松耦合 → EventBus (mitt)
   - 复杂全局状态 → Pinia
   - 表单双向绑定 → v-model

---

## Q10: 什么是插槽（Slot）？请说明具名插槽和作用域插槽的区别和使用场景。
- **难度**：★☆☆
- **知识点**：插槽/组件复用/内容分发
- **题型**：简答题 + 代码示例

### 参考答案要点：

1. **插槽的基本概念**
   - 插槽是 Vue 的内容分发机制，允许父组件向子组件传递模板内容
   - 类似于"占位符"，子组件定义位置，父组件填充内容

2. **默认插槽（Default Slot）**
   ```html
   <!-- 子组件 BaseLayout.vue -->
   <template>
     <div class="container">
       <slot>默认内容</slot>  <!-- fallback content -->
     </div>
   </template>
   
   <!-- 父组件使用 -->
   <BaseLayout>
     <p>这是插入到插槽的内容</p>
   </BaseLayout>
   ```

3. **具名插槽（Named Slot）**
   - 用于组件有多个内容分发点的情况
   ```html
   <!-- 子组件 -->
   <template>
     <header><slot name="header"></slot></header>
     <main><slot></slot></main>  <!-- 默认插槽 -->
     <footer><slot name="footer"></slot></footer>
   </template>
   
   <!-- 父组件使用（Vue3 新语法） -->
   <BaseLayout>
     <template #header>
       <h1>页面标题</h1>
     </template>
     
     <p>主要内容区域</p>
     
     <template #footer>
       <p>版权信息</p>
     </template>
   </BaseLayout>
   ```

4. **作用域插槽（Scoped Slot）⭐ 重点**
   - 子组件向插槽传递数据，父组件可访问子组件的数据
   - **典型场景**：列表组件、表格组件、数据展示组件

   ```html
   <!-- 子组件 UserList.vue -->
   <template>
     <ul>
       <li v-for="user in users" :key="user.id">
         <!-- 向插槽暴露 user 数据 -->
         <slot :user="user" :index="index">
           {{ user.name }}  <!-- 默认回退内容 -->
         </slot>
       </li>
     </ul>
   </template>
   
   <!-- 父组件使用 -->
   <UserList :users="userData">
     <template #default="{ user, index }">
       <span>{{ index }}. {{ user.name }}</span>
       <button @click="edit(user)">编辑</button>
     </template>
   </UserList>
   ```

5. **动态插槽名（Vue3）**
   ```html
   <BaseLayout>
     <template #[dynamicSlotName]>
       动态插槽内容
     </template>
   </BaseLayout>
   ```

6. **实际应用场景**
   - 默认插槽：容器组件、布局组件（Card、Modal）
   - 具名插槽：复杂布局组件（Header/Main/Footer/Sidebar）
   - 作用域插槽：数据驱动型组件（Table、List、Select），让父组件决定如何渲染每一行

---

## Q11: Vue 中的过滤器（Filter）在 Vue3 中被移除了，应该如何替代？
- **难度**：★☆☆
- **知识点**：Vue2 vs Vue3/API变更
- **题型**：简答题

### 参考答案要点：

1. **为什么移除过滤器**
   - 过滤器的主要功能可以用方法调用或计算属性替代
   - 过滤器在模板中难以调试（链式调用时）
   - 过滤器只适用于文本转换，功能单一

2. **替代方案**

   **方案一：使用计算属性（推荐）**
   ```javascript
   // Vue2 写法
   {{ message | capitalize }}
   
   // Vue3 替代
   const capitalizedMessage = computed(() => capitalize(message.value))
   {{ capitalizedMessage }}
   ```

   **方案二：使用方法调用**
   ```javascript
   // Vue2 写法
   {{ price | currency('USD') }}
   
   // Vue3 替代
   {{ formatCurrency(price, 'USD') }}
   
   // 工具函数
   function formatCurrency(value, currency = 'CNY') {
     return new Intl.NumberFormat('zh-CN', {
       style: 'currency',
       currency
     }).format(value)
   }
   ```

   **方案三：全局属性（类似全局过滤器的效果）**
   ```javascript
   // main.js
   app.config.globalProperties.$filters = {
     capitalize(str) {
       return str.charAt(0).toUpperCase() + str.slice(1)
     }
   }
   
   // 组件中使用
   {{ $filters.capitalize(text) }}
   ```

3. **迁移建议**
   - 单次使用的过滤逻辑 → 计算属性或方法
   - 多处复用的格式化工具 → 提取为 utils 函数或 composable
   - 需要全局访问 → globalProperties 或 provide/inject

---

## Q12: Vue 中如何进行样式隔离？scoped 的原理是什么？
- **难度**：★☆☆
- **知识点**：CSS/scoped/样式隔离
- **题型**：简答题

### 参考答案要点：

1. **Vue 样式隔离方式**

   - **Scoped CSS**（最常用）
     ```html
     <style scoped>
     .title { color: red; }
     </style>
     ```
   
   - **CSS Modules**
     ```html
     <style module>
     .title { color: red; }
     </style>
     <!-- 使用：$style.title -->
     ```
   
   - **BEM 命名规范**（手动约定）
   
   - **Shadow DOM**（Web Components 方案）

2. **Scoped CSS 原理**
   - Vue 编译器给组件内每个 DOM 元素添加唯一的 `data-v-xxxxx` 属性
   - 将 CSS 选择器添加对应的属性选择器 `[data-v-xxxxx]`
   
   ```css
   /* 编译前 */
   .container .title { color: red; }
   
   /* 编译后 */
   .container[data-v-f3f3eg9] .title[data-v-f3f3eg9] { color: red; }
   ```

3. **Scoped 的限制与穿透**
   - **深度选择器**（修改子组件样式）：
     ```css
     /* Vue3 */
     :deep(.child-class) { color: blue; }
     
     /* Vue2 */
     >>> .child-class { color: blue; }
     /deep/ .child-class { color: blue; }
     ```
   
   - **全局样式**（不受 scoped 影响）：
     ```css
     :global(.global-class) { ... }
     ```
   
   - **插槽内容样式**：
     ```css
     :slotted(.slot-content) { ... }
     ```

4. **Scoped 的性能影响**
   - 属性选择器的匹配速度略慢于 class 选择器
   - 对于大型列表（数千项），可能有轻微性能影响
   - 通常可忽略不计，除非极端性能敏感场景

---

## Q13: 如何理解 Vue 的单向数据流？为什么要遵循这个原则？
- **难度**：★☆☆
- **知识点**：数据流/组件设计原则
- **题型**：简答题

### 参考答案要点：

1. **单向数据流的含义**
   - 数据从父组件流向子组件（通过 props）
   - 子组件不能直接修改 props，只能通过 emit 通知父组件修改
   - 形成自上而下的单向流动

2. **数据流图示**
   ```
   父组件 state
       ↓ (props)
   子组件 A ←→ 子组件 B  （兄弟间不直接通信）
       ↑ (emit)
   父组件更新 state
       ↓ (props)
   重新渲染子组件
   ```

3. **为什么要遵循单向数据流**
   - **可预测性**：数据来源清晰，易于追踪状态变化
   - **可调试性**：状态变化路径明确，方便定位问题
   - **可维护性**：降低组件耦合度，便于重构和测试
   - **防止意外修改**：避免子组件"悄悄"修改父组件数据导致的 bug

4. **常见错误及正确做法**
   ```javascript
   // ❌ 错误：直接修改 props
   props: ['count'],
   methods: {
     increment() {
       this.count++  // 警告！直接修改 props
     }
   }
   
   // ✅ 正确：通过 emit 通知父组件
   const props = defineProps(['count'])
   const emit = defineEmits(['update:count'])
   
   function increment() {
     emit('update:count', props.count + 1)
   }
   
   // 或者使用本地副本
   const localCount = ref(props.count)
   ```

5. **双向绑定的本质**
   - `v-model` 是单向数据流 + emit 的语法糖
   - 并没有违反单向数据流原则

---

## Q14: Vue 中的动态组件和异步组件有什么区别？如何使用？
- **难度**：★☆☆
- **知识点**：动态组件/异步组件/性能优化
- **题型**：简答题 + 代码示例

### 参考答案要点：

1. **动态组件（Dynamic Component）**
   - 根据 `is` 属性动态切换不同组件
   - 适用于 Tab 切换、多视图场景

   ```html
   <script setup>
   import { ref, markRaw } from 'vue'
   import ComponentA from './ComponentA.vue'
   import ComponentB from './ComponentB.vue'
   
   const currentComponent = ref(markRaw(ComponentA))
   
   function switchTo(name) {
     currentComponent.value = name === 'A' ? ComponentA : ComponentB
   }
   </script>
   
   <template>
     <button @click="switchTo('A')">组件A</button>
     <button @click="switchTo('B')">组件B</button>
     <component :is="currentComponent" />
   </template>
   ```

2. **异步组件（Async Component）**
   - 组件懒加载，只有在需要时才加载组件代码
   - 用于代码分割（Code Splitting）、首屏性能优化

   ```javascript
   // 方式一：defineAsyncComponent（Vue3 推荐）
   import { defineAsyncComponent } from 'vue'
   
   const AsyncComp = defineAsyncComponent(() =>
     import('./HeavyComponent.vue')
   )
   
   // 方式二：高级配置
   const AsyncCompWithConfig = defineAsyncComponent({
     loader: () => import('./HeavyComponent.vue'),
     loadingComponent: LoadingSpinner,      // 加载中显示
     errorComponent: ErrorComponent,          // 加载失败显示
     delay: 200,                              // 显示 loading 的延迟时间
     timeout: 10000,                          // 超时时间
     suspensible: true                        // 配合 Suspense 使用
   })
   ```

3. **配合 keep-alive 使用**
   ```html
   <keep-alive :include="['ComponentA']">
     <component :is="currentComponent" />
   </keep-alive>
   <!-- ComponentA 会被缓存，切换回来不会重新创建 -->
   ```

4. **配合 Suspense 使用（Vue3）**
   ```html
   <Suspense>
     <template #default>
       <AsyncComponent />
     </template>
     <template #fallback>
       <LoadingSpinner />
     </template>
   </Suspense>
   ```

5. **区别总结**
   | 特性 | 动态组件 | 异步组件 |
   |------|----------|----------|
   | 目的 | 切换不同组件 | 延迟加载组件 |
   | 加载时机 | 组件已加载，仅切换 | 需要时才加载 |
   | API | `<component :is="">` | `defineAsyncComponent` |
   | 性能收益 | 配合 keep-alive | 减少首屏包体积 |

---

## Q15: Vue 中 mixins 的优缺点是什么？Vue3 中有什么更好的替代方案？
- **难度**：★☆☆
- **知识点**：mixins/Composition API/代码复用
- **题型**：简答题 + 对比分析

### 参考答案要点：

1. **Mixins 的概念**
   - 一种分发可复用功能的灵活方式
   - mixin 对象可以包含任何组件选项
   - 当组件使用 mixin 时，所有 mixin 选项将被"混合"进入组件本身

2. **Mixins 的优点**
   - 代码复用：提取公共逻辑到 mixin
   - 灵活性：可以在多个组件中使用同一 mixin

3. **Mixins 的缺点（致命问题）⭐**
   - **命名冲突**：多个 mixin 可能包含相同名称的属性/方法，覆盖规则不直观
   - **隐式依赖**：组件使用了 mixin 的数据/方法，但代码中没有明确体现来源
   - **数据来源模糊**：难以追踪某个数据或方法来自哪里
   - **mixin 之间的耦合**：mixin 可能依赖于其他 mixin 的存在

4. **Vue3 的替代方案：Composition API + Composables**
   ```javascript
   // useMousePosition.js（Composable）
   import { ref, onMounted, onUnmounted } from 'vue'
   
   export function useMousePosition() {
     const x = ref(0)
     const y = ref(0)
     
     function update(event) {
       x.value = event.pageX
       y.value = event.pageY
     }
     
     onMounted(() => window.addEventListener('mousemove', update))
     onUnmounted(() => window.removeEventListener('mousemove', update))
     
     return { x, y }
   }
   
   // 组件中使用
   <script setup>
   import { useMousePosition } from './useMousePosition'
   
   const { x, y } = useMousePosition()  // 来源清晰！
   </script>
   ```

5. **Composable 相比 Mixins 的优势**
   - ✅ 明确的来源：从函数导入，清晰可见
   - ✅ 无命名冲突：变量名由使用者决定
   - ✅ 更好的 TypeScript 支持
   - ✅ 逻辑聚合：相关代码放在一起（而非分散在不同选项中）
   - ✅ 更灵活的组合：可以有条件地使用、嵌套使用

---

## 二、进阶层（★★☆）

---

## Q16: 请详细说明 Vue2 和 Vue3 响应式系统的区别。
- **难度**：★★☆
- **知识点**：响应式原理/Object.defineProperty/Proxy/Vue2 vs Vue3
- **题型**：简答题 + 原理分析

### 参考答案要点：

1. **Vue2 响应式：Object.defineProperty**
   ```javascript
   // 核心实现思路
   function defineReactive(obj, key, val) {
     const dep = new Dep()  // 依赖收集器
     
     Object.defineProperty(obj, key, {
       get() {
         if (Dep.target) {
           dep.depend()  // 收集依赖
         }
         return val
       },
       set(newVal) {
         if (newVal === val) return
         val = newVal
         dep.notify()  // 触发更新
       }
     })
   }
   ```

   **局限性：**
   - ❌ 无法检测对象属性的添加/删除（需要 `Vue.set` / `Vue.delete`）
   - ❌ 无法检测数组通过索引修改元素（需要 `this.$set` 或数组变异方法）
   - ❌ 无法检测数组长度的变化
   - ❌ 需要递归遍历所有属性，深层次对象性能差

2. **Vue3 响应式：Proxy**
   ```javascript
   // 核心实现思路（简化版）
   function reactive(target) {
     return new Proxy(target, {
       get(target, key, receiver) {
         track(target, key)  // 依赖收集
         return Reflect.get(target, key, receiver)
       },
       set(target, key, value, receiver) {
         const result = Reflect.set(target, key, value, receiver)
         trigger(target, key)  // 触发更新
         return result
       },
       deleteProperty(target, key) {
         const result = Reflect.deleteProperty(target, key)
         trigger(target, key)  // 可以检测删除
         return result
       },
       has(target, key) {
         track(target, key)  // 可以检测 in 操作符
       }
     })
   }
   ```

   **优势：**
   - ✅ 可以检测属性的添加、删除
   - ✅ 可以检测数组索引和长度的变化
   - ✅ 支持 Map、Set、WeakMap、WeakSet 等数据结构
   - ✅ **惰性代理**：只在访问时才递归代理深层属性（性能提升）
   - ✅ Proxy 是语言层面的能力，更完善

3. **其他重要区别**

   | 特性 | Vue2 | Vue3 |
   |------|------|------|
   | **核心 API** | Object.defineProperty | Proxy |
   | **依赖收集** | Dep 类（每个属性一个 Dep） | WeakMap + Effect（基于 target:key） |
   | **API 设计** | this.$set、this.$delete | reactive、ref、直接赋值 |
   | **性能** | 初始化时递归转化 | 懒代理，按需响应式化 |
   | **TypeScript** | 支持较弱 | 完全重写，TS 友好 |

4. **Vue3 响应式的额外特性**
   - `ref`：基本类型的响应式包装（通过 `.value` 访问）
   - `shallowReactive`：浅层响应式（只有第一层是响应式的）
   - `toRaw`：获取原始对象（绕过代理）
   - `markRaw`：标记对象永远不被代理
   - `effectScope`：批量控制副作用

### 🔍 追问链
1. **Vue 2 为什么不能检测数组下标直接修改和对象属性新增？**
   → 方向：Object.defineProperty 只能劫持已有属性的 get/set，数组长度的变更无法感知
2. **Vue 3 的 Proxy 完美解决了所有问题吗？有没有 Proxy 无法代理的情况？**
   → 方向：Proxy 不支持 IE11、对已有对象整体替换时需 reactive 重新代理
3. **嵌套对象的响应式是怎么实现的？递归深度有限制吗？**
   → 方向：Vue2 递归 Observer、Vue3 懒递归（get 时才深层代理）、toRaw 解决循环引用

---

## Q17: Vue3 的 Composition API（setup 函数）相比 Options API 有哪些优势？
- **难度**：★★☆
- **知识点**：Composition API/setup函数/代码组织
- **题型**：简答题 + 对比分析

### 参考答案要点：

1. **Options API 的问题**
   - **逻辑分散**：同一功能的代码被迫分散在 data、methods、computed、mounted 等不同选项中
   - **可读性下降**：组件变大时，需要在各选项间来回跳跃才能理解一个功能
   - **复用困难**：mixin 存在命名冲突、隐式依赖等问题
   - **TypeScript 支持**：this 类型推断困难

2. **Composition API 的优势**

   **① 逻辑组织更灵活（逻辑关注点聚合）**
   ```javascript
   // Options API：搜索功能散落在各处
   export default {
     data() { return { searchQuery: '', results: [] } },
     computed: { filteredResults() { ... } },
     methods: { search() { ... }, clearSearch() { ... } },
     mounted() { this.search() }
   }
   
   // Composition API：搜索功能聚合在一起
   export default {
     setup() {
       // 搜索相关的所有逻辑在一起
       const searchQuery = ref('')
       const results = ref([])
       const filteredResults = computed(() => { ... })
       
       async function search() { ... }
       function clearSearch() { ... }
       onMounted(() => search())
       
       return { searchQuery, results, filteredResults, search, clearSearch }
     }
   }
   ```

   **② 更好的代码复用（Composables）**
   - 将可复用逻辑抽取为组合式函数
   - 比 mixin 更灵活、更安全、来源清晰

   **③ 更好的 TypeScript 支持**
   - 大部分 API 都能自动推断类型
   - 无需频繁使用 `this`，减少类型推断难题

   **④ 更小的打包体积**
   - 支持 tree-shaking（按需引入）
   - 未使用的 API 不会被打包

   **⑤ 更灵活的组件间逻辑复用**
   - Composable 可以在任何地方调用（不仅限于组件内）
   - 可以嵌套组合、有条件使用

3. **setup 函数的关键特性**
   - 执行时机：在 props 解析之后、beforeCreate 之前
   - 接收两个参数：(props, context)
   - **this 不可用**（未指向组件实例）
   - 返回值会暴露给模板和其他选项
   - 可以是异步函数（配合 Suspense 使用）

4. **setup 语法糖 `<script setup>`**
   - 更简洁的语法，无需 return
   - 自动注册导入的组件和 Composable
   - 更好的 IDE 支持和性能表现

### 深度拓展：手写实现

#### 手写简化版 Vue2 响应式系统（Object.defineProperty）

```javascript
// =============================================
// Vue2 响应式系统核心实现（简化版）
// 核心组件：Dep（依赖收集器）+ Watcher（观察者）+ defineReactive（数据劫持）
// =============================================

// ---------- 1. Dep 类：依赖收集器 ----------
// 每个响应式属性都有一个 Dep 实例，用于存储依赖该属性的所有 Watcher
class Dep {
  constructor() {
    // 使用 Set 存储 watcher，自动去重（同一个 watcher 只收集一次）
    this.subs = new Set()
  }

  // 收集依赖：将当前活跃的 watcher 添加到 subs 中
  depend() {
    // Dep.target 是一个全局变量，指向当前正在执行的 watcher
    if (Dep.target) {
      this.subs.add(Dep.target)
    }
  }

  // 通知更新：遍历所有 watcher，触发它们的 update 方法
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}

// 静态属性：指向当前正在执行的 Watcher（全局唯一）
Dep.target = null
// watcher 栈：处理嵌套 watcher 场景（如 computed 嵌套）
const targetStack = []

// 将 watcher 入栈，并设置为当前活跃的 watcher
function pushTarget(watcher) {
  targetStack.push(watcher)
  Dep.target = watcher
}

// 出栈，恢复上一个 watcher 为活跃状态
function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}

// ---------- 2. Watcher 类：观察者 ----------
// Watcher 是依赖的具体表现形式，组件渲染函数、computed、watch 都是 watcher
class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm           // 组件实例
    this.getter = expOrFn  // 获取数据的函数（或表达式解析函数）
    this.cb = cb           // 回调函数
    this.value = this.get() // 实例化时立即执行一次 get（触发依赖收集）
    this.deps = []         // 反向记录该 watcher 依赖了哪些 dep（用于 cleanup）
  }

  // 核心：执行 getter，触发数据属性的 get 方法，从而收集依赖
  get() {
    // 1. 将当前 watcher 设为全局活跃状态
    pushTarget(this)
    // 2. 执行 getter 函数（如渲染函数），内部会读取响应式数据
    //    读取操作会触发 Object.defineProperty 的 get，get 中调用 dep.depend() 收集当前 watcher
    const value = this.getter.call(this.vm, this.vm)
    // 3. 恢复之前的 watcher（嵌套场景下恢复父级 watcher）
    popTarget()
    return value
  }

  // 当依赖的数据变化时，由 dep.notify() 调用
  update() {
    // 异步批量更新：将 watcher 加入队列，而不是立即重新执行
    queueWatcher(this)
  }

  // 真正执行回调
  run() {
    const value = this.get()     // 重新获取值（触发依赖收集）
    const oldValue = this.value  // 上次的值
    this.value = value
    // 执行回调，传入新旧值
    this.cb.call(this.vm, value, oldValue)
  }

  // 将自身从所有依赖的 dep 中移除（用于组件销毁或 computed 重新求值时的清理）
  cleanupDeps() {
    this.deps.forEach(dep => dep.delete(this))
    this.deps.length = 0
  }

  // 添加 dep 到依赖列表（反向记录）
  addDep(dep) {
    this.deps.push(dep)
  }
}

// ---------- 3. defineReactive 函数：数据劫持核心 ----------
// 使用 Object.defineProperty 劫持对象的属性的读写操作
function defineReactive(obj, key, val) {
  // 为每个属性创建一个独立的 dep（依赖收集器）
  const dep = new Dep()

  // 获取属性当前的描述符（处理属性可能已有 getter/setter 的情况）
  const property = Object.getOwnPropertyDescriptor(obj, key)

  // 如果属性已有 getter/setter 且不可配置，则无法劫持（直接返回）
  if (property && property.configurable === false) {
    return
  }

  // 兼容已有 getter/setter：保存原始的 getter 和 setter
  const getter = property && property.get
  const setter = property && property.set

  // 递归观察子对象（深度响应式：如果 val 是对象/数组，也将其转为响应式）
  // 注意：这里会导致初始化时就递归遍历所有层级，深层对象有性能问题
  observe(val)

  // 使用 Object.defineProperty 定义/修改属性
  Object.defineProperty(obj, key, {
    enumerable: true,       // 可枚举
    configurable: true,    // 可配置（可删除、可再次修改特性）

    // ---- get 拦截器：读取属性时触发 ----
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val  // 如果有原始 getter 则调用
      // 【关键】依赖收集：如果当前有活跃的 watcher，将该 watcher 收集到 dep 中
      if (Dep.target) {
        dep.depend()              // 属性自身的 dep 收集 watcher
        Dep.target.addDep(dep)    // watcher 反向记录这个 dep
      }
      return value
    },

    // ---- set 拦截器：修改属性时触发 ----
    set: function reactiveSetter(newVal) {
      // 获取旧值（用于对比和新旧值传递）
      const value = getter ? getter.call(obj) : val
      // 【优化】如果新值和旧值相同（且不是 NaN），则不触发更新
      if (newVal === value || (Number.isNaN(newVal) && Number.isNaN(value))) {
        return
      }
      // 如果有原始 setter，则调用它
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal  // 否则直接赋值给闭包中的 val
      }
      // 【关键】对新值进行响应式处理（新增属性可能是对象）
      observe(newVal)
      // 【核心】通知更新：告诉 dep 所有依赖该属性的 watcher 数据变了
      dep.notify()
    }
  })
}

// ---------- 4. Observer 类：将对象转为响应式 ----------
// 递归地为对象的所有属性定义响应式
class Observer {
  constructor(value) {
    this.value = value
    // 给对象添加 __ob__ 属性，标记已经被观测（避免重复观测）
    def(value, '__ob__', this)

    // 数组特殊处理：需要拦截能改变数组自身的方法（push/pop/shift/unshift/splice/sort/reverse）
    if (Array.isArray(value)) {
      // 重写数组的变异方法（此处省略具体实现）
      protoAugment(value, arrayMethods)
      // 递归观测数组元素
      this.observeArray(value)
    } else {
      // 对象：遍历所有属性进行 defineReactive
      this.walk(value)
    }
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i])
    }
  }
}

// 辅助函数：在对象上定义不可枚举的属性
def(obj, key, val) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: false,
    writable: true,
    configurable: true
  })
}

// 入口函数：将值转为响应式
function observe(value) {
  // 只对对象类型进行观测（基本类型无法添加属性）
  if (!isObject(value)) return
  let ob
  // 如果已经有 __ob__ 说明已经观测过，直接返回
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    // 创建新的 Observer 实例
    ob = new Observer(value)
  }
  return ob
}

// ---------- 5. 简化版异步队列（queueWatcher）----------
const queue = []          // watcher 队列
let has = {}             // 去重标记（防止同一个 watcher 多次入队）
let waiting = false      // 是否正在刷新队列
let flushing = false     // 是否正在刷新中

// 将 watcher 加入队列
function queueWatcher(watcher) {
  const id = watcher.id
  // 去重：同一个 watcher 只入队一次
  if (!has[id]) {
    has[id] = true
    queue.push(watcher)

    // 如果没有在等待刷新，则安排一次刷新
    if (!waiting) {
      waiting = true
      // 使用 nextTick（微任务/宏任务）异步刷新队列
      nextTick(flushSchedulerQueue)
    }
  }
}

// 刷新队列：按序执行所有 watcher
function flushSchedulerQueue() {
  flushing = true
  queue.sort((a, b) => a.id - b.id)  // 按 id 排序（确保父组件先于子组件更新）

  for (let i = 0; i < queue.length; i++) {
    const watcher = queue[i]
    watcher.run()  // 执行 watcher 的 run 方法（重新渲染或执行回调）
  }

  // 重置状态
  queue.length = 0
  has = {}
  waiting = false
  flushing = false
}

// ---------- 6. 使用示例 ----------
// 创建一个简单的 Vue 实例模拟
const data = { message: 'Hello', count: 0 }

// 将 data 对象转为响应式
observe(data)

// 创建一个 watcher（模拟组件渲染 watcher）
const vm = {}  // 组件实例占位
new Watcher(
  vm,
  function() {  // getter：渲染函数
    console.log('渲染:', data.message, 'count:', data.count)
    // 这里读取了 data.message 和 data.count → 触发这两个属性的 get → 收集依赖
  },
  function(newValue, oldValue) {  // cb：更新后的回调
    console.log('视图更新完成')
  }
)

// 修改数据 → 触发 set → dep.notify() → watcher.update() → queueWatcher → flushSchedulerQueue → watcher.run()
data.message = 'Hi'     // 触发更新！
data.count++            // 触发更新！（但会被合并到同一次刷新中）
```

#### 手写简化版 Vue3 响应式系统（Proxy）

```javascript
// =============================================
// Vue3 响应式系统核心实现（简化版）
// 核心组件：reactive + effect + track + trigger
// 数据结构：WeakMap(target) → Map(key) → Set(effect) 三层嵌套
// =============================================

// ---------- 1. 全局数据结构：三层嵌套存储依赖关系 ----------
// targetMap: WeakMap<target, Map<key, Set<effect>>>
// 第一层 WeakMap：以目标对象为 key（WeakMap 不影响垃圾回收，对象被回收时自动清除）
// 第二层 Map：以属性名为 key
// 第三层 Set：存储所有依赖该属性值的 effect 函数
const targetMap = new WeakMap()

// 当前正在执行的 effect（全局变量，类似 Vue2 的 Dep.target）
let activeEffect = null
// effect 执行栈（支持嵌套 effect，如 computed 内部访问其他 computed）
const effectStack = []

// ---------- 2. track 函数：依赖收集 ----------
// 在 Proxy get 中调用，建立 target → key → effect 的映射关系
function track(target, type, key) {
  // 如果当前没有活跃的 effect，不收集（说明不在 effect 上下文中读取数据）
  if (!activeEffect) return

  // 【第一层】获取或创建 target 对应的 depsMap（Map<key, Set<effect>>）
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  // 【第二层】获取或创建 key 对应的 dep（Set<effect>）
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  // 【第三层】收集依赖：将当前 effect 添加到 dep 中
  // 使用 trackEffects 进行去重处理
  trackEffects(dep)
}

// 收集依赖的具体逻辑（带去重）
function trackEffects(dep) {
  // 去重：同一个 effect 不重复收集到同一个 dep 中
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    // 反向记录：effect 记录自己属于哪些 dep（用于 cleanup 时使用）
    activeEffect.deps.push(dep)
  }
}

// ---------- 3. trigger 函数：派发更新 ----------
// 在 Proxy set 中调用，找到依赖该属性变化的所有 effect 并触发
function trigger(target, type, key, newValue, oldValue) {
  // 获取 target 对应的 depsMap
  const depsMap = targetMap.get(target)
  if (!depsMap) return  // 没有任何依赖，直接返回

  // 收集需要触发的 effects（用 Set 自动去重）
  const effects = new Set()

  // ① 精确触发：获取特定 key 的依赖
  if (key !== undefined) {
    const dep = depsMap.get(key)
    if (dep) {
      dep.forEach(effect => effects.add(effect))
    }
  }

  // ② ITERATE 触发：当新增/删除属性时，
  //    需要触发 for...in 或 Object.keys() 等迭代操作的依赖
  if (type === 'ADD' || type === 'DELETE') {
    const iterateDep = depsMap.get(Symbol.iterator)  // 迭代 symbol key
    if (iterateDep) {
      iterateDep.forEach(effect => effects.add(effect))
    }
  }

  // ③ 数组 length 特殊处理：当数组长度变短时，
  //    需要触发被删除索引对应的依赖
  if (Array.isArray(target) && key === 'length') {
    const length = newValue
    depsMap.forEach((dep, k) => {
      // 如果是数字索引且 >= 新长度，说明被"删掉"了
      if (typeof k !== 'symbol' && !Number.isNaN(k) && k >= length) {
        dep.forEach(effect => effects.add(effect))
      }
    })
  }

  // ④ 执行所有收集到的 effects
  effects.forEach(effect => {
    // 避免无限循环：如果 effect 正在执行且不允许递归，则跳过
    if (effect !== activeEffect || effect.allowRecurse) {
      // 优先使用 scheduler（调度器），否则直接执行 run
      if (effect.scheduler) {
        effect.scheduler(effect.run)
      } else {
        effect.run()
      }
    }
  })
}

// ---------- 4. effect 函数：注册副作用函数 ----------
// effect 是 Vue3 响应式的核心 API，computed、watch、组件渲染都基于 effect 实现
function effect(fn, options = {}) {
  // 创建 effect 函数（实际执行的副作用）
  const _effect = function ReactiveEffect(...args) {
    // 如果已经在运行中（非嵌套情况），不重复执行
    if (!_effect.active) return fn(...args)

    // 清理旧的依赖关系（每次重新执行前先断开旧的连接）
    if (!effectStack.includes(_effect)) {
      cleanup(_effect)
      try {
        // 【关键】入栈：将当前 effect 设为活跃状态
        enableTracking()
        effectStack.push(_effect)
        activeEffect = _effect
        // 执行用户传入的函数（fn）
        // fn 内部读取响应式数据 → 触发 Proxy get → track() → 收集当前 effect
        return fn.apply(null, args)
      } finally {
        // 【关键】出栈：恢复上一个 effect 为活跃状态
        effectStack.pop()
        resetTracking()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }

  // 配置项
  _effect.id = uid++         // 唯一标识（用于排序）
  _effect.active = true      // 是否激活
  _effect.raw = fn           // 原始函数引用
  _effect.deps = []          // 反向记录依赖的 dep 列表
  _effect.options = options  // 用户配置
  _effect.allowRecurse = !!options.allowRecurse  // 是否允许递归

  // scheduler：调度函数（如果不传则同步执行）
  // computed 会传入 scheduler，实现 lazy + 缓存机制
  if (options.scheduler) {
    _effect.scheduler = options.scheduler
  }

  // lazy: 如果为 true，创建时不立即执行（computed 用到）
  // 默认立即执行一次（触发初始依赖收集）
  if (!options.lazy) {
    _effect()
  }

  return _effect
}

let uid = 0  // 全局计数器

// 清理 effect 的所有依赖关系
function cleanup(effect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)  // 从每个 dep 中移除该 effect
    }
    deps.length = 0
  }
}

// 控制是否应该追踪依赖（用于 stop 效果的场景）
let shouldTrack = true
function enableTracking() { shouldTrack = true }
function resetTracking() { shouldTrack = false }

// ---------- 5. reactive 函数：创建响应式代理 ----------
// 使用 Proxy 创建代理对象，拦截所有操作
function reactive(target) {
  // 只对对象类型进行处理
  if (!isObject(target)) {
    console.warn(`value cannot be made reactive: ${String(target)}`)
    return target
  }

  // 如果已经是代理，直接返回（同一对象只代理一次）
  if (target[Symbol.for('__v_isReactive')]) {
    return target
  }

  // 创建 Proxy 代理
  const proxy = new Proxy(target, baseHandlers)

  // 标记为响应式（用于后续判断）
  def(proxy, Symbol.for('__v_isReactive'), true)

  return proxy
}

// ---------- 6. baseHandlers：Proxy 处理器（mutableHandlers）----------
const baseHandlers = {
  // ---- get 拦截器：读取属性时触发 ----
  get(target, key, receiver) {
    // 特殊属性拦截：__v_isReactive、__v_raw 等（内部使用的标志位）
    if (key === Symbol.for('__v_isReactive')) {
      return true
    }
    if (key === Symbol.for('__v_raw')) {
      return target  // 返回原始对象（绕过代理）
    }

    // 【核心】依赖收集：追踪谁在读取这个属性
    track(target, 'GET', key)

    // 使用 Reflect.get 获取值（保证 this 指向正确，receiver 是代理对象）
    const res = Reflect.get(target, key, receiver)

    // 【惰性代理】如果值是对象，递归转为 reactive
    // 与 Vue2 不同：Vue3 只在访问时才深层代理（懒代理），提升性能
    if (isObject(res)) {
      return reactive(res)
    }

    return res
  },

  // ---- set 拦截器：设置属性时触发 ----
  set(target, key, value, receiver) {
    // 获取旧值（用于判断是新增还是修改）
    const oldValue = target[key]
    // 判断属性是否已存在
    const hadKey = Object.prototype.hasOwnProperty.call(target, key)
    // 使用 Reflect.set 设置值（保证原型链上的 setter 正确触发）
    const result = Reflect.set(target, key, value, receiver)

    // 【关键】判断操作类型并触发更新
    // 目标对象是原始对象（非 prototype）时才触发（避免原型链设置时重复触发）
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        // 新增属性：trigger 类型为 ADD
        trigger(target, 'ADD', key, value)
      } else if (hasChanged(value, oldValue)) {
        // 修改属性且值确实变了：trigger 类型为 SET
        trigger(target, 'SET', key, value, oldValue)
      }
      // 值没变时不触发（优化：避免不必要的更新）
    }

    return result
  },

  // ---- deleteProperty 拦截器：删除属性时触发 ----
  deleteProperty(target, key) {
    // 检查属性是否存在
    const hadKey = Object.prototype.hasOwnProperty.call(target, key)
    // 执行删除
    const result = Reflect.deleteProperty(target, key)
    // 删除成功且属性存在过 → 触发更新
    if (result && hadKey) {
      trigger(target, 'DELETE', key, undefined)
    }
    return result
  },

  // ---- has 拦截器：in 操作符时触发 ----
  has(target, key) {
    // in 操作也需要追踪依赖（for...in 循环等场景）
    track(target, 'HAS', key)
    return Reflect.has(target, key)
  },

  // ---- ownKeys 拦截器：Object.keys 等操作时触发 ----
  ownKeys(target) {
    // 迭代操作追踪（用于 for...in、Object.keys 等）
    track(target, 'ITERATE')
    return Reflect.ownKeys(target)
  }
}

// 辅助函数：获取原始对象（绕过代理）
function toRaw(observed) {
  return observed && observed[Symbol.for('__v_raw')] || observed
}

// 辅助函数：比较值是否发生变化
function hasChanged(value, oldValue) {
  return value !== oldValue && !(Number.isNaN(value) && Number.isNaN(oldValue))
}

// 辅助函数：定义不可枚举属性
function def(obj, key, val) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: false,
    writable: true,
    configurable: true
  })
}

// 辅助函数：判断是否为对象
function isObject(val) {
  return val !== null && typeof val === 'object'
}

// ---------- 7. 使用示例 ----------

// 创建响应式对象
const state = reactive({
  name: 'Vue3',
  info: { version: '3.0', author: 'Evan You' },
  tags: ['reactivity', 'composition-api']
})

// 注册 effect（副作用函数）：模拟组件渲染
effect(() => {
  console.log(`📱 组件渲染: ${state.name} v${state.info.version}`)
  // 读取 state.name → track(state, 'GET', 'name')
  // 读取 state.info → track(state, 'GET', 'info') → 返回代理后的 info 对象
  // 读取 state.info.version → track(info, 'GET', 'version')
})

// 修改数据 → 触发 set → trigger → 重新执行 effect
state.name = 'Vue3.4'  // 触发 SET → effect 重新执行 ✅
state.info.version = '3.4'  // 触发 SET → effect 重新执行 ✅

// Vue3 可以检测到属性的新增和删除（Vue2 做不到）
state.info.newProp = 'hello'  // 触发 ADD → effect 重新执行 ✅
delete state.info.newProp     // 触发 DELETE → effect 重新执行 ✅

console.log('✅ Vue3 响应式系统演示完成')
```

#### Vue2 vs Vue3 响应式核心区别总结

| 特性 | Vue2 (defineProperty) | Vue3 (Proxy) |
|------|----------------------|--------------|
| **原理** | 劫持对象单个属性 | 劫持整个对象 |
| **新增属性** | ❌ 需要 Vue.set | ✅ 自动检测 |
| **删除属性** | ❌ 需要 Vue.delete | ✅ 自动检测 |
| **数组索引** | ❌ 无法检测 | ✅ 自动检测 |
| **性能** | 初始化递归全部转化 | 惰性代理，按需转化 |
| **内存** | 为每个属性创建 Dep | 三层 Map 结构更节省 |
| **API 设计** | this.$set / this.$delete | 直接赋值即可 |

---

## Q18: ref 和 reactive 应该如何选择？有什么使用建议？
- **难度**：★★☆
- **知识点**：ref/reactive/响应式API
- **题型**：简答题 + 最佳实践

### 参考答案要点：

1. **两者的区别**

   | 特性 | ref | reactive |
   |------|-----|----------|
   | **目标** | 任意类型（基本类型+对象） | 仅对象/数组 |
   | **访问** | 需要 `.value` | 直接访问 |
   | **解构** | 解构后保持响应式 | 解构后丢失响应式 |
   | **重新赋值** | 可以整体替换 | 不能替换整个对象（丢失响应式） |
   | **模板中使用** | 自动解包（无需 .value） | 正常使用 |

2. **使用建议（官方推荐）**

   **✅ 推荐使用 ref 的场景：**
   - 基本类型数据（string、number、boolean）
   - 需要替换整个对象的场景
   - 需要在函数中传递并保持响应式
   - 团队统一规范（降低认知负担）

   ```javascript
   // ✅ 推荐：统一使用 ref
   const count = ref(0)
   const user = ref({ name: 'Tom', age: 18 })
   
   function updateUser() {
     // 可以整体替换
     user.value = { name: 'Jerry', age: 20 }
   }
   ```

   **✅ 适合使用 reactive 的场景：**
   - 对象结构较深且稳定（如表单数据）
   - 不需要替换整个对象
   - 与 template 绑定时（自动解包）

   ```javascript
   // ✅ 适合：表单对象
   const form = reactive({
     username: '',
     password: '',
     email: ''
   })
   
   function resetForm() {
     form.username = ''
     form.password = ''
     form.email = ''
     // 注意：不能 form.value = {...} 这样做
   }
   ```

3. **常见陷阱与解决方案**

   **reactive 解构丢失响应式：**
   ```javascript
   const state = reactive({ count: 0, name: 'test' })
   
   // ❌ 解构后不再是响应式
   let { count, name } = state
   count++  // 不会触发更新
   
   // ✅ 使用 toRefs 保持响应式
   let { count, name } = toRefs(state)
   count.value++  // ✅ 响应式生效
   ```

   **reactive 数组/Map 中的元素：**
   ```javascript
   const list = reactive([{ id: 1 }])
   // 数组中的对象是 reactive 的，可以直接修改
   list[0].id = 2  // ✅ 响应式
   // 但替换整个元素需要注意
   list[0] = { id: 3 }  // ✅ 也是响应式的（Proxy 拦截了 set）
   ```

4. **团队最佳实践建议**
   - **新手团队**：全部使用 ref，降低心智负担
   - **熟练团队**：基本类型用 ref，复杂对象用 reactive
   - **关键原则**：保持项目风格一致

---

## Q19: 请解释 Vue 的虚拟 DOM（Virtual DOM）概念及其优势。
- **难度**：★★☆
- **知识点**：虚拟DOM/渲染机制/性能
- **题型**：简答题

### 参考答案要点：

1. **什么是虚拟 DOM**
   - 用 JavaScript 对象描述真实 DOM 结构的抽象表示
   - 是一个轻量级的 JavaScript 对象树（VNode tree）
   ```javascript
   // 真实 DOM
   <div id="app" class="container">
     <p>Hello</p>
   </div>
   
   // 虚拟 DOM（VNode 对象）
   {
     tag: 'div',
     props: { id: 'app', class: 'container' },
     children: [
       { tag: 'p', children: 'Hello' }
     ]
   }
   ```

2. **虚拟 DOM 的工作流程**
   ```
   状态变化 → 生成新的 VNode Tree → Diff 算法比较新旧 VNode 
   → 计算最小变更（Patch） → 批量更新真实 DOM
   ```

3. **虚拟 DOM 的优势**
   
   - **✅ 提升开发体验**
     - 声明式编程：只需描述 UI 应该是什么样子
     - 框架负责高效的 DOM 更新
   
   - **✅ 跨平台能力**
     - VNode 是抽象表示，可以渲染到不同平台
     - Web、Native（Weex/RN）、Canvas、SSR 等
   
   - **✅ 批量更新优化**
     - 多次状态变化合并为一次 DOM 操作
     - 减少 reflow/repaint 次数
   
   - **✅ Diff 算法的优化**
     - 只更新变化的部分（最小化 DOM 操作）
     - DOM 操作成本高（JS 操作相对便宜）

4. **Vue3 虚拟 DOM 的改进**
   - **静态提升（Static Hoisting）**：不参与更新的节点提升到渲染函数外，只创建一次
   - **Patch Flags**：标记节点类型（如 TEXT、CLASS、STYLE、PROPS），diff 时只检查标记的部分
   - **Block Tree**：收集动态子节点，跳过静态树的 diff
   - **Cache Handler**：缓存事件处理函数
   - 这些优化使 Vue3 的更新性能提升数倍

5. **虚拟 DOM 不是万能的**
   - 首次渲染可能比直接操作 DOM 慢（需要创建 VNode）
   - 极端性能场景下（大量节点），可能不如手动优化
   - Vue3 提供 `v-memo` 指令进一步优化特定场景

### 🔍 追问链
1. **为什么需要虚拟 DOM？直接操作真实 DOM 不行吗？**
   → 方向：批量更新减少回流重绘、跨平台能力（Weex/UniApp）、声明式编程基础
2. **diff 算法的时间复杂度是多少？O(n³) 优化到 O(n) 的关键是什么？**
   → 方向：同层比较策略（只比较同级节点不跨层）、key 优化（避免全量对比）
3. **Vue 3 的 diff 算法相比 Vue 2 做了哪些优化？**
   → 方向：最长递增子序列(LIS)算法减少移动次数、静态节点标记跳过、PatchFlag 编译优化

### 深度拓展：手写实现

#### 手写简化版虚拟 DOM 核心（createElement / render / patch）

```javascript
// =============================================
// 虚拟 DOM 核心实现（简化版）
// 核心函数：createElement → h() 创建 VNode
//           render → 将 VNode 渲染为真实 DOM
//           patch → 对比新旧 VNode 并更新 DOM
// =============================================

// ---------- 1. VNode 类：虚拟节点 ----------
// VNode 是对真实 DOM 节点的 JavaScript 描述
class VNode {
  constructor(tag, props, children, key, text, elm) {
    this.tag = tag          // 标签名，如 'div'、'span'；文本节点为 undefined
    this.props = props || {} // 属性对象，如 { id: 'app', class: 'container' }
    this.children = children || []  // 子节点数组
    this.key = key          // 节点唯一标识（用于 diff 算法的复用判断）
    this.text = text        // 文本内容（文本节点使用）
    this.elm = elm          // 对应的真实 DOM 元素引用（初始为 null，render 后赋值）
  }
}

// ---------- 2. createElement (h 函数)：创建虚拟节点 ----------
// 这是用户编写渲染函数时调用的 API，返回一个 VNode 对象
function createElement(tag, props = {}, children) {
  let key = null
  let text = null

  // 如果传入了 key，从 props 中提取（key 不需要渲染到 DOM 上）
  if (props && props.key !== undefined) {
    key = props.key
    delete props.key  // 从属性中移除 key
  }

  // 规范化 children 参数（支持多种形式）
  // 形式1：字符串或数字 → 转为文本节点
  // 形式2：数组 → 子节点数组
  // 形式3：VNode 对象 → 包裹为数组
  if (children === undefined) {
    children = []
  } else if (typeof children === 'string' || typeof children === 'number') {
    text = String(children)
    children = []
  } else if (!Array.isArray(children)) {
    children = [children]
  }

  return new VNode(tag, props, children, key, text, null)
}

// 简写别名（类似 Vue 的 h 函数）
const h = createElement

// ---------- 3. render 函数：将 VNode 渲染为真实 DOM ----------
// 首次渲染时调用，将整棵 VNode 树转换为真实 DOM 树
function render(vnode, container) {
  // container 是挂载容器（如 document.getElementById('app')）
  const elm = createElm(vnode)  // 根据 VNode 创建真实 DOM 元素
  container.appendChild(elm)    // 将 DOM 插入容器
}

// 根据 VNode 创建真实的 DOM 元素（递归创建子树）
function createElm(vnode) {
  // 【情况1】文本节点：直接创建文本节点
  if (vnode.text !== null) {
    vnode.elm = document.createTextNode(vnode.text)
    return vnode.elm
  }

  // 【情况2】元素节点：创建对应的 DOM 元素
  const el = document.createElement(vnode.tag)

  // 设置属性到 DOM 元素上
  updateProps(el, {}, vnode.props)

  // 【递归】创建子节点并挂载
  if (vnode.children.length > 0) {
    vnode.children.forEach(child => {
      const childElm = createElm(child)  // 递归创建子节点
      el.appendChild(childElm)
    })
  }

  // 将真实 DOM 引用保存回 VNode（后续 patch 时用到）
  vnode.elm = el
  return el
}

// 更新/设置 DOM 属性
function updateProps(elm, oldProps, newProps) {
  // 遍历新属性，更新或添加
  for (let key in newProps) {
    const newVal = newProps[key]
    const oldVal = oldProps[key]

    // 特殊处理：事件绑定（以 on 开头的属性）
    if (key.startsWith('on')) {
      const eventName = key.slice(2).toLowerCase()  // onClick → click
      // 移除旧事件监听器（如果存在）
      if (oldVal) {
        elm.removeEventListener(eventName, oldVal)
      }
      // 绑定新的事件监听器
      elm.addEventListener(eventName, newVal)
    }
    // 特殊处理：style 对象
    else if (key === 'style') {
      Object.assign(elm.style, newVal)
    }
    // 特殊处理：class
    else if (key === 'class' || key === 'className') {
      elm.className = newVal
    }
    // 普通属性
    else {
      elm.setAttribute(key, newVal)
    }
  }

  // 删除旧属性中不存在于新属性的
  for (let key in oldProps) {
    if (!(key in newProps)) {
      if (key.startsWith('on')) {
        const eventName = key.slice(2).toLowerCase()
        elm.removeEventListener(eventName, oldProps[key])
      } else {
        elm.removeAttribute(key)
      }
    }
  }
}

// ---------- 4. patch 函数：核心 Diff 算法入口 ----------
// 对比新旧两个 VNode，将差异应用到真实 DOM 上
function patch(oldVnode, newVnode) {
  // 【情况1】新旧节点都是同一个元素的引用（引用相等）
  // 说明数据没变，直接返回（优化：跳过不必要的比较）
  if (oldVnode === newVnode) return

  // 【情况2】新旧节点的标签不同 → 直接替换（不深入比较）
  // 这就是"同层比较"策略的核心：标签不同就整体替换
  if (oldVnode.tag !== newVnode.tag) {
    replaceVNode(oldVnode, newVnode)
    return
  }

  // 【情况3】都是文本节点 → 更新文本内容
  if (newVnode.text !== null) {
    if (oldVnode.text !== newVnode.text) {
      oldVnode.elm.nodeValue = newVnode.text
    }
    // 同步 elm 引用
    newVnode.elm = oldVnode.elm
    return
  }

  // 【情况4】相同标签的元素节点 → 深入比较
  newVnode.elm = oldVnode.elm  // 复用相同的 DOM 元素

  // ① 更新属性（props）
  patchProps(oldVnode.elm, oldVnode.props, newVnode.props)

  // ② 更新子节点（children）—— 这是最复杂的部分
  patchChildren(oldVnode, newVnode)
}

// 替换节点：销毁旧节点，创建新节点
function replaceVNode(oldVnode, newVnode) {
  // 创建新的 DOM 元素
  const newElm = createElm(newVnode)
  // 在旧节点的父节点中替换
  if (oldVnode.elm && oldVnode.elm.parentNode) {
    oldVnode.elm.parentNode.replaceChild(newElm, oldVnode.elm)
  }
}
```

#### 手写简化版 Diff 算法核心逻辑（同层比较 + Key 对比）

```javascript
// =============================================
// Diff 算法核心：子节点对比（patchChildren）
// 这是 Vue Diff 算法最核心、最复杂的部分
// =============================================

// ---------- 1. patchChildren：子节点 Diff 入口 ----------
function patchChildren(oldVnode, newVnode) {
  const oldCh = oldVnode.children  // 旧子节点数组
  const newCh = newVnode.children  // 新子节点数组
  const parentElm = oldVnode.elm   // 父级 DOM 元素

  // 【情况A】旧节点有子节点，新节点没有 → 清空所有子节点
  if (oldCh.length > 0 && newCh.length === 0) {
    parentElm.innerHTML = ''
  }
  // 【情况B】旧节点没有子节点，新节点有 → 创建所有新子节点
  else if (oldCh.length === 0 && newCh.length > 0) {
    newCh.forEach(child => {
      const childElm = createElm(child)
      parentElm.appendChild(childElm)
    })
  }
  // 【情况C】新旧都有子节点 → 执行核心 Diff 算法 ⭐⭐⭐
  else if (oldCh.length > 0 && newCh.length > 0) {
    updateChildren(parentElm, oldCh, newCh)
  }
}

// ---------- 2. updateChildren：核心 Diff 算法（Key 对比）----------
// 使用双端指针 + Key 映射的方式找出最小变更操作
function updateChildren(parentElm, oldCh, newCh) {
  // 四个指针：
  let oldStartIdx = 0     // 旧列表头指针
  let oldEndIdx = oldCh.length - 1  // 旧列表尾指针
  let newStartIdx = 0     // 新列表头指针
  let newEndIdx = newCh.length - 1  // 新列表尾指针

  // 四个指针对应的 VNode：
  let oldStartVnode = oldCh[oldStartIdx]  // 旧头节点
  let oldEndVnode = oldCh[oldEndIdx]      // 旧尾节点
  let newStartVnode = newCh[newStartIdx]  // 新头节点
  let newEndVnode = newCh[newEndIdx]      // 新尾节点

  let keyToOldIdxMap   // 旧节点的 key → index 映射表
  let idxInOld         // 在旧列表中的位置

  // 循环遍历，直到任一方的指针越界
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {

    // 【前置处理】如果旧节点已经被标记为 undefined（已移动），跳过
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx]
      continue
    }
    if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx]
      continue
    }

    // ====== 尝试四种匹配方式（Vue2 双端 Diff 策略）======

    // 【匹配1】旧头 vs 新头（同一位置未变）
    // 场景：列表头部没有变化
    if (sameVnode(oldStartVnode, newStartVnode)) {
      // 相同节点，继续深入 patch（递归比较子节点和属性）
      patch(oldStartVnode, newStartVnode)
      // 指针向内移动
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    }

    // 【匹配2】旧尾 vs 新尾（尾部未变）
    // 场景：列表尾部没有变化
    else if (sameVnode(oldEndVnode, newEndVnode)) {
      patch(oldEndVnode, newEndVnode)
      // 指针向内移动
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    }

    // 【匹配3】旧头 vs 新尾（节点右移了）
    // 场景：某个节点从头部移动到了尾部
    else if (sameVnode(oldStartVnode, newEndVnode)) {
      patch(oldStartVnode, newEndVnode)
      // 将旧头节点移动到当前旧尾节点的后面（DOM 操作）
      parentElm.insertBefore(
        oldStartVnode.elm,
        oldEndVnode.elm.nextSibling
      )
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    }

    // 【匹配4】旧尾 vs 新头（节点左移了）
    // 场景：某个节点从尾部移动到了头部
    else if (sameVnode(oldEndVnode, newStartVnode)) {
      patch(oldEndVnode, newStartVnode)
      // 将旧尾节点移动到当前旧头节点的前面（DOM 操作）
      parentElm.insertBefore(
        oldEndVnode.elm,
        oldStartVnode.elm
      )
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    }

    // 【匹配5】以上四种都没命中 → 使用 Key 进行查找（最复杂的情况）
    else {
      // 第一次进入时，构建旧节点的 key → index 映射表（只构建一次）
      if (keyToOldIdxMap === undefined) {
        keyToOldIdxMap = buildKeyToOldIdxMap(oldCh, oldStartIdx, oldEndIdx)
      }

      // 在映射表中查找新头节点的 key 对应的旧索引
      idxInOld = keyToOldIdxMap[newStartVnode.key] !== undefined
        ? keyToOldIdxMap[newStartVnode.key]
        : null

      // 【情况5a】key 在旧列表中不存在 → 新增节点
      if (idxInOld === undefined) {
        // 创建全新的 DOM 元素并插入到旧头节点前面
        const newElm = createElm(newStartVnode)
        parentElm.insertBefore(newElm, oldStartVnode ? oldStartVnode.elm : null)
        newStartVnode = newCh[++newStartIdx]
      }

      // 【情况5b】key 存在 → 可能是复用或移动
      else {
        // 获取旧列表中对应位置的 VNode
        const vnodeToMove = oldCh[idxInOld]

        // 【安全检查】虽然 key 相同，但标签不同 → 不能复用，当作新增处理
        if (vnodeToMove.tag !== newStartVnode.tag) {
          const newElm = createElm(newStartVnode)
          parentElm.insertBefore(newElm, oldStartVnode ? oldStartVnode.elm : null)
        }

        // 【正常情况】key 和 tag 都相同 → 复用节点
        else {
          // 深入 patch（比较子节点和属性）
          patch(vnodeToMove, newStartVnode)
          // 将该节点移动到旧头节点前面（DOM 移动操作）
          parentElm.insertBefore(vnodeToMove.elm, oldStartVnode ? oldStartVnode.elm : null)
          // 将旧列表中的该位置标记为 undefined（表示已被处理/移动）
          oldCh[idxInOld] = undefined
        }

        newStartVnode = newCh[++newStartIdx]
      }
    }
  }

  // ====== 循环结束后的收尾工作 ======

  // 【收尾A】新列表还有剩余节点 → 全部是新增的
  if (newStartIdx <= newEndIdx) {
    // 计算插入位置：在旧尾节点后面插入（或者如果是全部新增，在旧头前插入）
    const beforeRef = newEndIdx + 1 < newCh.length
      ? newCh[newEndIdx + 1].elm
      : null

    // 批量插入剩余的新节点
    addVnodes(parentElm, beforeRef, newCh, newStartIdx, newEndIdx)
  }

  // 【收尾B】旧列表还有剩余节点 → 全部是需要删除的
  if (oldStartIdx <= oldEndIdx) {
    // 批量删除多余的旧节点
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
  }
}

// ---------- 3. 辅助函数 ----------

// 判断两个 VNode 是否是"同一个节点"（可复用的前提条件）
function sameVnode(vnode1, vnode2) {
  // 必须同时满足：
  // 1. 标签相同（div 只能和 div 比较）
  // 2. key 相同（如果有 key 的话）
  // 注意：这里不做严格相等，允许 key 都为 undefined 的情况
  return (
    vnode1.tag === vnode2.tag &&
    vnode1.key === vnode2.key
  )
}

// 构建 key → index 映射表（用于 O(1) 时间复杂度查找）
// 这是 Diff 算法性能的关键：避免每次都遍历查找
function buildKeyToOldIdxMap(children, startIdx, endIdx) {
  const map = {}
  for (let i = startIdx; i <= endIdx; i++) {
    const key = children[i].key
    if (key !== undefined && key !== null) {
      map[key] = i  // key → 在旧列表中的索引位置
    }
  }
  return map
}

// 批量新增节点
function addVnodes(parentElm, beforeRef, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const elm = createElm(vnodes[startIdx])  // 创建 DOM
    // 在 beforeRef 节点之前插入（beforeRef 为 null 则追加到末尾）
    if (beforeRef) {
      parentElm.insertBefore(elm, beforeRef)
    } else {
      parentElm.appendChild(elm)
    }
  }
}

// 批量删除节点
function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx]
    if (ch != null && ch.elm) {
      parentElm.removeChild(ch.elm)  // 从 DOM 中移除
    }
  }
}
```

#### Diff 算法执行流程图解

```
示例：旧列表 [A, B, C, D] → 新列表 [D, A, B, C]

初始状态:
  旧: [A, B, C, D]          新: [D, A, B, C]
       ↑   ↑                    ↑   ↑
   oldStart              newStart
       ↑   ↑                    ↑   ↑
   oldEnd                newEnd

步骤1: oldStart(A) vs newStart(D) → 不匹配 ❌
步骤2: oldEnd(D) vs newEnd(C) → 不匹配 ❌
步骤3: oldStart(A) vs newEnd(C) → 不匹配 ❌
步骤4: oldEnd(D) vs newStart(D) → 匹配 ✅！【匹配4：旧尾→新头】

  结果: D 被移动到 A 前面
  旧: [A, B, C, D(已移)]    新: [(D), A, B, C]
       ↑   ↑                      ↑   ↑
   oldStart                  newStart
       ↑                       ↑
   oldEnd                    newEnd

步骤5-7: oldStart(A) vs newStart(A) → 匹配 ✅【匹配1：头头】
         oldStart(B) vs newStart(B) → 匹配 ✅
         oldStart(C) vs newStart(C) → 匹配 ✅

最终结果: D 被移动了一次，A/B/C 保持不动 ✅
DOM 操作最少化！
```

#### Vue3 的优化：最长递增子序列（LIS）

```javascript
// Vue3 改进了 Diff 算法，使用最长递增子序列（LIS）来减少移动次数
// 核心思路：先通过 key 建立 Map 映射，然后计算 LIS，只移动不在 LIS 中的节点

function vue3Diff(parentElm, oldCh, newCh) {
  // 1. 构建 newCh 的 key → index 映射
  const keyToNewIndexMap = new Map()
  newCh.forEach((vnode, i) => {
    if (vnode.key != null) {
      keyToNewIndexMap.set(vnode.key, i)
    }
  })

  // 2. 为每个旧节点计算在新列表中的位置（-1 表示被删除）
  const newIndexMapping = new Array(oldCh.length).fill(-1)
  for (let i = 0; i < oldCh.length; i++) {
    const oldKey = oldCh[i].key
    if (keyToNewIndexMap.has(oldKey)) {
      newIndexMapping[i] = keyToNewIndexMap.get(oldKey)
    }
  }

  // 3. 计算最长递增子序列（LIS）
  // LIS 中的节点不需要移动，只需要移动不在 LIS 中的节点
  const lis = getLongestIncreasingSubsequence(
    newIndexMapping.filter(idx => idx !== -1)
  )

  // 4. 从后向前遍历，根据 LIS 决定哪些节点需要移动
  let lisIdx = lis.length - 1  // LIS 指针（从后往前）
  for (let j = newCh.length - 1; j >= 0; j--) {
    // ... 具体的移动/新增/删除逻辑 ...
  }
}

// 最长递增子序列算法（O(n log n)）
function getLongestIncreasingSubsequence(arr) {
  const piles = []       // 牌堆数组
  const topOfPiles = []  // 每个牌堆顶部的牌
  const predecessors = []  // 前驱记录（用于回溯路径）

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i]
    // 二分查找：找到第一个 >= num 的牌堆位置
    let left = 0, right = piles.length
    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (topOfPiles[mid] < num) {
        left = mid + 1
      } else {
        right = mid
      }
    }

    // 放入牌堆（新建或追加）
    if (left === piles.length) {
      piles.push([i])
      topOfPiles.push(num)
    } else {
      piles[left].push(i)
      topOfPiles[left] = num
    }

    predecessors[i] = left > 0 ? piles[left - 1][piles[left - 1].length - 1] : -1
  }

  // 回溯得到最长递增子序列
  const result = []
  let curr = piles[piles.length - 1][piles[piles.length - 1].length - 1]
  while (curr !== -1) {
    result.push(curr)
    curr = predecessors[curr]
  }

  return result.reverse()
}
```

---

## Q20: 请详细说明 Vue 的 diff 算法原理。
- **难度**：★★☆
- **知识点**：diff算法/虚拟DOM/核心原理
- **题型**：原理解析题

### 参考答案要点：

1. **Diff 策略（四个假设/优化前提）**
   - **同层比较**：只比较同一层级，不跨层级比较（O(n) 复杂度）
   - **相同类型**：相同类型的节点才有必要继续比较
   - **key 标识**：通过 key 判断是否是同一节点
   - **可复用性**：尽量复用已有 DOM 节点

2. **Diff 过程的核心步骤（patch）**

   **第一步：判断节点类型**
   - 新旧节点标签不同 → 销毁旧节点，创建新节点
   - 标签相同 → 继续 patch 子节点

   **第二步：文本节点**
   - 新旧文本不同 → 更新文本内容

   **第三步：元素节点**
   - 更新属性（props）
   - 更新子节点（children）

3. **子节点 Diff（核心难点）——双端比较算法**

   Vue2 采用**双端 Diff 算法**（同步比较头头、尾尾、头尾、尾头）：
   ```
   旧: [A, B, C, D]
   新: [D, A, B, C]
   
   过程：
   1. oldStart(A) vs newStart(D) → 不匹配
   2. oldEnd(D) vs newStart(D) → 匹配！移动 D 到前面
   3. oldStart(A) vs newStart(A) → 匹配！
   4. oldStart(B) vs newStart(B) → 匹配！
   5. oldStart(C) vs newStart(C) → 匹配！
   ```

   Vue3 采用**最长递增子序列（LIS）算法**优化：
   - 先通过 key 建立 Map 映射
   - 计算最长递增子序列
   - 只移动不在 LIS 中的节点
   - 时间复杂度 O(n log n)

4. **Key 在 Diff 中的作用**
   - 无 key：就地复用（按位置对应），可能导致错误复用
   - 有 key：基于 key 精确匹配，正确识别移动/新增/删除
   - 示例：列表中间插入元素，有 key 能正确复用，无 key 导致后续元素全部更新

5. **Diff 算法的时间复杂度**
   - 理论最优：O(n³)（传统树 diff）
   - Vue 实际：O(n)（通过同层比较等策略优化）

---

## Q21: Vue Router 的 hash 模式和 history 模式有什么区别？
- **难度**：★★☆
- **知识点**：Vue Router/路由原理/前端路由
- **题型**：简答题 + 原理分析

### 参考答案要点：

1. **Hash 模式**
   - **原理**：利用 URL 中的 `#` 符号（hash/fragment）
   - **监听方式**：`window.addEventListener('hashchange', callback)`
   - **URL 示例**：`http://example.com/#/home`
   - **特点**：
     - `#` 后面的内容不会发送到服务器
     - 兼容性好（IE8+）
     - 不需要服务器配置
     - URL 不够美观（带 # 号）

   ```javascript
   // Hash 模式实现原理（简化）
   window.addEventListener('hashchange', () => {
     const path = window.location.hash.slice(1) || '/'
     router.match(path)  // 匹配路由
   })

   // 导航
   location.hash = '/about'  // 触发 hashchange 事件
   ```

2. **History 模式**
   - **原理**：利用 HTML5 History API（pushState / replaceState）
   - **监听方式**：`window.addEventListener('popstate', callback)`
   - **URL 示例**：`http://example.com/home`
   - **特点**：
     - URL 更美观（无 # 号）
     - 利用 pushState 改变 URL 时不刷新页面
     - **需要服务器配置**（否则刷新 404）
     - 兼容性 IE10+

   ```javascript
   // History 模式实现原理（简化）
   window.addEventListener('popstate', () => {
     const path = window.location.pathname
     router.match(path)
   })

   // 导航（编程式）
   history.pushState({}, '', '/about')  // 不触发 popstate
   // 需要手动调用 router.match()
   ```

3. **服务器配置（History 模式必须）**
   ```nginx
   # Nginx 配置
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```
   所有未知路径都返回 index.html，由前端路由接管

4. **两者对比总结**

   | 特性 | Hash 模式 | History 模式 |
   |------|-----------|-------------|
   | URL 美观度 | 带 # | 干净美观 |
   | 服务器配置 | 不需要 | 必须配置 |
   | 兼容性 | IE8+ | IE10+ |
   | SEO 友好 | 一般 | 更好（配合 SSR） |
   | 第三方集成 | 可能冲突（如微信分享） | 更好 |

5. **选择建议**
   - 静态网站 / 不想配置服务器 → Hash 模式
   - 生产环境 / 追求用户体验 → History 模式
   - SSR 应用 → History 模式

### 🔍 追问链
1. **hash 模式和 history 模式的区别？history 模式刷新 404 怎么解决？**
   → 方向：hash 用 onhashchange（#后面变化不请求服务器）、history 用 pushState（需要服务端 fallback）
2. **路由守卫的完整执行顺序是什么？导航解析流程？**
   → 方向：beforeEach → 路由独享beforeEnter → 组件内beforeRouteEnter → beforeResolve → afterEach
3. **路由懒加载的原理是什么？import() 动态 import？**
   → 方向：Webpack 的魔法注释、chunk 分割、预加载 prefetch/preload

---

## Q22: Vue Router 的导航守卫有哪些？它们的执行顺序是怎样的？
- **难度**：★★☆
- **知识点**：Vue Router/导航守卫/路由控制
- **题型**：简答题 + 流程图

### 参考答案要点：

1. **导航守卫的分类**

   **全局守卫**
   - `router.beforeEach((to, from, next) => {})` — 全局前置守卫
   - `router.afterEach((to, from) => {})` — 全局后置钩子
   - `router.beforeResolve((to, from, next) => {})` — 全局解析守卫（确认前）

   **路由独享守卫**
   - `beforeEnter: (to, from, next) => {}` — 定义在路由配置中

   **组件内守卫**
   - `onBeforeRouteLeave((to, from) => {})` — 离开当前路由
   - `onBeforeRouteUpdate((to, from) => {})` — 路由参数变化时（复用组件）

2. **完整的导航解析流程**
   ```
   导航触发
     ↓
   1. 失活组件的 beforeRouteLeave 守卫
     ↓
   2. 调用全局 beforeEach 守卫
     ↓
   3. 重用的组件调用 beforeRouteUpdate 守卫（如果有）
     ↓
   4. 路由配置里的 beforeEnter 守卫
     ↓
   5. 解析异步路由组件
     ↓
   6. 激活组件的 beforeRouteEnter 守卫（注意：此时还不能访问 this）
     ↓
   7. 调用全局 beforeResolve 守卫
     ↓
   8. 导航被确认
     ↓
   9. 调用全局 afterEach 钩子
     ↓
   10. 触发 DOM 更新
     ↓
   11. 调用 beforeRouteEnter 守卫中的 next 回调（传入组件实例）
   ```

3. **常用场景示例**

   **登录鉴权：**
   ```javascript
   router.beforeEach(async (to, from, next) => {
     const authStore = useAuthStore()
     
     if (to.meta.requiresAuth && !authStore.isLoggedIn) {
       // 未登录，跳转登录页
       next({ name: 'login', query: { redirect: to.fullPath }})
     } else {
       next()
     }
   })
   ```

   **离开确认：**
   ```javascript
   onBeforeRouteLeave((to, from) => {
     if (hasUnsavedChanges.value) {
       const answer = window.confirm('确定要离开吗？未保存的更改将丢失')
       if (!answer) return false
     }
   })
   ```

4. **注意事项**
   - `next()` 在 Vue4 中已被废弃，改为返回值控制
   - `beforeRouteEnter` 中无法访问 `this`（组件还未创建），可通过 `next(vm => {})` 访问
   - 确保每个守卫都调用 `next()` 或返回 true/false，否则导航会被挂起

---

## Q23: Pinia 和 Vuex 有什么区别？为什么 Vue 官方推荐使用 Pinia？
- **难度**：★★☆
- **知识点**：状态管理/Pinia/Vuex/架构设计
- **题型**：对比分析题

### 参考答案要点：

1. **核心区别对比**

   | 特性 | Vuex | Pinia |
   |------|------|-------|
   | **Mutation** | 必须（严格模式下） | ❌ 取消了 Mutation |
   | **Action** | 异步操作 | ✅ 保留，更简洁 |
   | **Getter** | 类似 computed | ✅ 保留，类似 computed |
   | **Module** | 内置命名空间 | 每个 store 独立文件 |
   | **TypeScript** | 需要额外装饰器 | ✅ 完美支持，自动推断 |
   | **DevTools** | 支持 | ✅ 更好的支持 |
   | **体积** | 较大 | ~1KB（gzip） |
   | **Vue2 支持** | ✅ | 需要插件 |
   | **Vue3 支持** | Vuex4 | ✅ 原生支持 |

2. **Pinia 的优势**

   **① 更简洁的 API**
   ```javascript
   // Vuex（繁琐）
   const store = createStore({
     state: () => ({ count: 0 }),
     mutations: {
       INCREMENT(state) { state.count++ }
     },
     actions: {
       increment({ commit }) { commit('INCREMENT') }
     },
     getters: {
       doubleCount: (state) => state.count * 2
     }
   })
   
   // Pinia（简洁）
   export const useCounterStore = defineStore('counter', {
     state: () => ({ count: 0 }),
     actions: {
       increment() { this.count++ }  // 直接修改 state！
     },
     getters: {
       doubleCount: (state) => state.count * 2
     }
   })
   ```

   **② 更好的 TypeScript 支持**
   - 自动推断 state、getter、action 的类型
   - 无需手动编写接口定义
   - IDE 智能提示完善

   **③ 没有 Mutation**
   - Action 中可直接修改 State（简化开发）
   - 通过 devtools 依然能追踪变化

   **④ 更灵活的 Store 组织**
   - 不再需要 modules 和 namespaces
   - 每个 store 都是独立的
   - Store 之间可以互相引用

   **⑤ 支持 Composition API 风格**
   ```javascript
   // Setup Store 风格
   export const useCounterStore = defineStore('counter', () => {
     const count = ref(0)
     const doubleCount = computed(() => count.value * 2)
     
     function increment() {
       count.value++
     }
     
     return { count, doubleCount, increment }
   })
   ```

3. **Vuex 仍然适用的场景**
   - 维护旧的 Vue2 项目
   - 团队习惯严格的 Flux 模式
   - 需要严格的状态修改追踪（mutation 日志）

4. **迁移指南**
   - State → State
   - Getters → Getters
   - Mutations + Actions → Actions
   - Modules → 独立的 Store 文件
   - `mapState` / `mapActions` → `storeToRefs` / 直接解构

### 🔍 追问链
1. **Pinia 相比 Vuex 3 的核心优势有哪些？**
   → 方向：更好的 TypeScript 支持、更简洁的 API（去掉了 mutation）、支持 Composition API 风格
2. **Vuex 为什么要区分 action 和 mutation？Pinia 为什么去掉了 mutation？**
   → 方向：Vuex 的 mutation 必须同步（devtools 追踪）、action 可异步；Pinia 用 devtools 插件追踪无需区分
3. **模块化状态下，命名空间 namespace 的作用？**
   → 方向：防止不同模块的 getter/action/mutation 同名冲突

---

## Q24: 请说明 keep-alive 组件的作用和工作原理。
- **难度**：★★☆
- **知识点**：keep-alive/组件缓存/LRU/性能优化
- **题型**：原理解析题

### 参考答案要点：

1. **keep-alive 的作用**
   - 缓存不活动的组件实例，而不是销毁它们
   - 切换回来时保留之前的状态（如表单输入、滚动位置）
   - 避免重复渲染，提升性能

2. **基本用法**
   ```html
   <keep-alive :include="['ComponentA']" :exclude="['ComponentB']" :max="10">
     <component :is="currentComponent" />
   </keep-alive>
   ```

   - `include`：只缓存匹配的组件（字符串/正则/数组）
   - `exclude`：不缓存匹配的组件
   - `max`：最大缓存实例数量（LRU 策略）

3. **工作原理**

   **缓存机制（LRU - 最近最少使用）**
   ```
   1. 首次渲染组件 → 正常创建 → 渲染后存入 cache
   2. 切换离开 → 不执行 unmounted → 存入 cache（执行 deactivated）
   3. 切换回来 → 从 cache 取出 → 执行 activated（不重新创建）
   4. 超过 max 限制 → 移除最早未使用的缓存
   ```

   **内部实现要点：**
   - 使用 `cache` 对象存储 VNode（key 为组件的 key/name）
   - 使用 `keys` 数组记录缓存顺序（用于 LRU 淘汰）
   - 当 `keys.length > max` 时，移除 `keys[0]` 对应的缓存

4. **生命周期变化**
   ```
   正常组件：
   created → mounted → [更新] → beforeUnmount → unmounted
   
   keep-alive 包裹：
   created → mounted → activated → deactivated → activated → ...
                                              ↓（销毁时）
                                        beforeUnmount → unmounted
   ```

   - `activated`：组件被激活（从缓存恢复显示）
   - `deactivated`：组件被停用（进入缓存）

5. **典型应用场景**
   - Tab 切换（保留各 tab 的状态）
   - 多步骤表单（返回上一步不丢失数据）
   - 路由缓存（列表页详情页来回切换）
   - 复杂计算结果的缓存

6. **注意事项**
   - `<keep-alive>` 要求其子组件只有一个（或配合 `<component>` 使用）
   - 缓存的组件不会再触发 `created` 和 `mounted`
   - 配合路由使用时，需要在路由 meta 信息中配置 include/exclude

---

## Q25: Vue3 的 Teleport（传送门）组件有什么作用？使用场景有哪些？
- **难度**：★★☆
- **知识点**：Teleport/组件通信/DOM操作
- **题型**：简答题 + 应用场景

### 参考答案要点：

1. **Teleport 的作用**
   - 将组件的一部分模板"传送"到 DOM 中的任意位置
   - 逻辑上属于当前组件，但渲染在指定的 DOM 节点下
   - 解决模态框、弹窗等需要脱离父组件层级的问题

2. **基本用法**
   ```html
   <teleport to="body">
     <div class="modal-overlay">
       <div class="modal">这是一个模态框</div>
     </div>
   </teleport>
   
   <!-- 传送到指定元素 -->
   <teleport to="#modal-container">
     <div class="modal">...</div>
   </teleport>
   
   <!-- 条件禁用 teleport -->
   <teleport :to="disabled ? undefined : 'body'">
     <div>...</div>
   </teleport>
   ```

3. **解决的问题**
   - **z-index 层级问题**：模态框被父元素的 overflow:hidden 裁剪
   - **CSS 隔离**：弹窗样式不受父组件样式影响
   - **无障碍访问**：模态框可以放在正确的 DOM 位置（body 下）

4. **实际应用场景**
   - 模态框（Modal Dialog）
   - 通知/消息提示（Toast/Notification）
   - 确认对话框（Confirm Dialog）
   - 下拉菜单/弹出层（Dropdown/Popover）
   - 全屏 loading 遮罩

5. **注意事项**
   - `to` 目标必须在挂载时已存在
   - 可以嵌套使用（多层 teleport）
   - 在 SSR 中，teleported 内容会被忽略（或需要特殊处理）

### 🔍 追问链
1. **Teleport 传送后的组件事件冒泡行为是怎样的？**
   → 方向：仍然沿着 Vue 组件树冒泡，不是沿 DOM 树冒泡（这是一个常见的坑）
2. **Teleport 与 Portal（React）有什么异同？**
   → 方向：概念类似但 API 设计不同、Vue 的 Teleport 支持禁用（:to="undefined"）

---

## Q26: Vue3 的 Suspense 组件是什么？如何使用？
- **难度**：★★☆
- **知识点**：Suspense/异步组件/加载状态
- **题型**：简答题 + 代码示例

### 参考答案要点：

1. **Suspense 的作用**
   - 协调异步组件依赖的加载状态
   - 在异步内容加载完成前显示加载中的内容（fallback）
   - 提供统一的异步加载体验

2. **基本用法**
   ```html
   <Suspense>
     <template #default>
       <!-- 异步组件（顶层有 await 或异步组件） -->
       <AsyncComponent />
     </template>
     
     <template #fallback>
       <!-- 加载中显示的内容 -->
       <LoadingSpinner />
     </template>
   </Suspense>
   ```

3. **两种触发异步的方式**

   **方式一：异步组件（defineAsyncComponent）**
   ```javascript
   const AsyncComp = defineAsyncComponent({
     loader: () => import('./HeavyComponent.vue'),
     loadingComponent: LoadingSpinner,
     delay: 200
   })
   ```

   **方式二：setup 中的 async/await**
   ```html
   <script setup>
   const data = await fetch('/api/user')  // Suspense 会等待
   </script>
   
   <template>
     <div>{{ data.name }}</div>
   </template>
   ```

4. **高级特性**
   - **嵌套 Suspense**：外层等待所有内层完成
   - **事件**：`@pending`、`@resolve`、`@fallback`
   - **超时处理**：结合 `setTimeout` 处理长时间加载

5. **注意事项**
   - Vue3.2+ Suspense 文档仍标记为实验性 API（但已稳定可用）
   - `#fallback` 插槽只在首次加载或组件切换时显示
   - 结合 `<KeepAlive>` 使用可实现更复杂的缓存策略

---

## Q27: Vue3 的 Fragment（片段）特性解决了什么问题？
- **难度**：★★☆
- **知识点**：Fragment/多根节点/模板语法
- **题型**：简答题

### 参考答案要点：

1. **Vue2 的限制**
   - 每个组件必须有**且仅有**一个根元素
   - 强制包裹多余的 div，影响语义化和样式

   ```html
   <!-- Vue2：必须有一个根元素 -->
   <template>
     <div class="wrapper">  <!-- 多余的包裹元素 -->
       <header>标题</header>
       <main>内容</main>
       <footer>底部</footer>
     </div>
   </template>
   ```

2. **Vue3 的 Fragment**
   - 支持组件返回多个根节点
   - 不再需要额外的包裹元素

   ```html
   <!-- Vue3：支持多根节点 -->
   <template>
     <header>标题</header>
     <main>内容</main>
     <footer>底部</footer>
   </template>
   ```

3. **解决的实际问题**
   - **语义化 HTML**：不再需要无意义的包裹 div
   - **CSS Grid/Flexbox 布局**：避免多余元素干扰布局
   - **渲染性能**：减少 DOM 节点数量
   - **组件灵活性**：条件渲染时更自然

4. **注意事项**
   - 需要给每个根节点设置独立的 `:key`（当使用 `v-for` 时）
   - 事件监听器需要绑定到具体元素（非继承）
   - 非 prop attributes 需要显式绑定（不会自动继承到多个根节点）

---

## Q28: 如何理解 Vue 中的依赖收集和派发更新机制？
- **难度**：★★☆
- **知识点**：响应式原理/依赖收集/发布订阅
- **题型**：原理解析题

### 参考答案要点：

1. **核心角色**

   | 角色 | 作用 | Vue2 | Vue3 |
   |------|------|------|------|
   | **Observer** | 监听数据变化 | Object.defineProperty | Proxy |
   | **Dep** | 依赖收集器 | 每个属性一个 Dep | 基于 target:key 的 Map |
   | **Watcher** | 依赖（观察者） | 组件渲染 Watcher、用户 Watcher | effect 函数 |
   | **Scheduler** | 调度器 | queueWatcher | queueJob / queueEffect |

2. **依赖收集过程（何时收集？）**
   ```
   1. 组件渲染（或 computed/watch 执行）
   2. 触发 getter（读取响应式属性）
   3. getter 中记录当前活跃的 Watcher/effect
   4. 将 Watcher 添加到该属性的 Dep 中
   5. 完成依赖关系建立
   ```

   ```javascript
   // Vue3 简化的依赖收集
   let activeEffect = null
   
   function track(target, key) {
     if (!activeEffect) return
     // targetMap: WeakMap<target, Map<key, Set<effect>>>
     let depsMap = targetMap.get(target)
     if (!depsMap) {
       targetMap.set(target, (depsMap = new Map()))
     }
     let dep = depsMap.get(key)
     if (!dep) {
       depsMap.set(key, (dep = new Set()))
     }
     dep.add(activeEffect)  // 收集依赖
   }
   ```

3. **派发更新过程（何时更新？）**
   ```
   1. 修改响应式数据（触发 setter）
   2. setter 中找到该属性的所有依赖（Dep）
   3. 通知所有依赖的 Watcher/effect
   4. Watcher 重新执行（重新渲染或执行回调）
   ```

   ```javascript
   // Vue3 简化的派发更新
   function trigger(target, key) {
     const depsMap = targetMap.get(target)
     if (!depsMap) return
     
     const dep = depsMap.get(key)
     if (dep) {
       dep.forEach(effect => {
         // 加入调度队列，不是立即执行
         scheduler(effect)
       })
     }
   }
   ```

4. **调度器的作用**
   - **去重**：同一 watcher 多次触发只执行一次
   - **批处理**：微任务中统一执行，避免频繁渲染
   - **优先级**：组件更新优先于用户 watch

5. **完整流程示例**
   ```javascript
   const count = ref(0)
   
   // 1. 注册 effect（依赖）
   effect(() => {
     console.log(`count is: ${count.value}`)  // 读取 count → 触发 track
   })
   
   // 2. 修改数据
   count.value++  // 触发 setter → trigger → 通知 effect 重新执行
   ```

---

## Q29: Vue3 的 `v-memo` 指令是什么？它如何优化性能？
- **难度**：★★☆
- **知识点**：v-memo/性能优化/指令
- **题型**：简答题 + 应用实践

### 参考答案要点：

1. **v-memo 的作用**
   - Vue3.2 新增的内置指令
   - 基于依赖值的缓存，条件性地跳过 VNode 的更新
   - 类似于 React 的 `React.memo` 或 `shouldComponentUpdate`

2. **基本用法**
   ```html
   <!-- 只有 item.id 和 item.checked 变化时才更新此行 -->
   <div v-for="item in list" :key="item.id" v-memo="[item.id, item.checked]">
     {{ item.name }}
   </div>
   
   <!-- 空数组：永不更新（纯静态内容） -->
   <div v-memo="[]">
     这是永远不会改变的内容
   </div>
   
   <!-- 条件性 memo -->
   <div v-memo="[shouldUpdate]">
     根据 shouldUpdate 决定是否更新
   </div>
   ```

3. **工作原理**
   - 记录上次渲染时的依赖值快照
   - 每次 patch 时比较新旧快照
   - 如果依赖值没变，跳过该 VNode 及其子树的 diff
   - 如果依赖值变了，正常执行 diff

4. **适用场景**
   - ✅ **大型列表渲染**：成千上万条数据，大部分行不变
   - ✅ **复杂的 VNode 树**：子树很深，diff 成本高
   - ✅ **纯展示组件**：数据变化但不影响渲染结果

5. **注意事项**
   - **必须配合 `v-for` 使用**（官方强烈建议）
   - 依赖值的比较是浅比较（===）
   - 过度使用可能适得其反（memo 本身也有开销）
   - 在简单的 VNode 上使用收益不大

6. **与其他优化手段对比**
   | 手法 | 适用场景 | 开销 |
   |------|----------|------|
   | `v-once` | 永远不变的静态内容 | 最小 |
   | `v-memo` | 依赖某些值变化的动态内容 | 中等 |
   | `shallowRef` | 大型不可变数据 | 小 |
   | 虚拟滚动 | 超长列表 | 需要额外库 |

---

## Q30: Vue3 中如何实现自定义 Hook（Composable）？请给出一个完整的示例。
- **难度**：★★☆
- **知识点**：Composable/Hook设计/代码复用
- **题型**：编程实践题

### 参考答案要点：

1. **Composable 的定义**
   - 以 `use` 开头的函数
   - 利用 Composition API 封装可复用的有状态逻辑
   - 返回响应式数据和方法

2. **设计原则**
   - **单一职责**：每个 Composable 只做一件事
   - **无副作用（外部）**：不应产生全局副作用（或在文档中说明）
   - **参数灵活**：接受配置参数，提供合理的默认值
   - **返回响应式**：始终返回 ref/reactive/computed
   - **清理资源**：提供清理方法或自动清理（onUnmounted）

3. **完整示例：usePagination**
   ```javascript
   // composables/usePagination.js
   import { ref, computed, watch } from 'vue'

   export function usePagination(fetchFn, options = {}) {
     const {
       pageSize = 10,
       initialPage = 1,
       immediate = true
     } = options
     
     const currentPage = ref(initialPage)
     const pageSizeRef = ref(pageSize)
     const total = ref(0)
     const data = ref([])
     const loading = ref(false)
     const error = ref(null)
     
     // 计算属性
     const totalPages = computed(() => Math.ceil(total.value / pageSizeRef.value))
     const hasNextPage = computed(() => currentPage.value < totalPages.value)
     const hasPrevPage = computed(() => currentPage.value > 1)
     
     // 获取数据
     async function fetchData(page = currentPage.value) {
       loading.value = true
       error.value = null
       
       try {
         const res = await fetchFn({
           page,
           pageSize: pageSizeRef.value
         })
         data.value = res.list
         total.value = res.total
       } catch (e) {
         error.value = e.message
       } finally {
         loading.value = false
       }
     }
     
     // 分页操作
     function goToPage(page) {
       if (page >= 1 && page <= totalPages.value) {
         currentPage.value = page
       }
     }
     
     function nextPage() {
       if (hasNextPage.value) goToPage(currentPage.value + 1)
     }
     
     function prevPage() {
       if (hasPrevPage.value) goToPage(currentPage.value - 1)
     }
     
     function changePageSize(size) {
       pageSizeRef.value = size
       currentPage.value = 1  // 重置到第一页
     }
     
     // 监听页码变化
     watch(currentPage, (newPage) => {
       fetchData(newPage)
     })
     
     // 初始加载
     if (immediate) {
       fetchData()
     }
     
     return {
       // 状态
       currentPage,
       pageSize: pageSizeRef,
       total,
       data,
       loading,
       error,
       // 计算属性
       totalPages,
       hasNextPage,
       hasPrevPage,
       // 方法
       fetchData,
       goToPage,
       nextPage,
       prevPage
     }
   }
   ```

4. **在组件中使用**
   ```html
   <script setup>
   import { usePagination } from '@/composables/usePagination'
   
   const { data, loading, currentPage, totalPages, nextPage, prevPage } =
     usePagination(({ page, pageSize }) => api.getUserList({ page, pageSize }))
   </script>

   <template>
     <div v-if="loading">加载中...</div>
     <ul v-else>
       <li v-for="item in data" :key="item.id">{{ item.name }}</li>
     </ul>
     <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
     <span>{{ currentPage }} / {{ totalPages }}</span>
     <button @click="nextPage" :disabled="!hasNextPage">下一页</button>
   </template>
   ```

5. **常见的 Composable 模式**
   - `useFetch`：封装请求逻辑（含取消、重试、缓存）
   - `useLocalStorage`：响应式持久化到 localStorage
   - `useMouse`：鼠标位置跟踪
   - `useDarkMode`：暗色模式切换
   - `usePermission`：权限管理
   - `useWebSocket`：WebSocket 连接管理

---

## 三、专家层（★★★）

---

## Q31: 请深入分析 Vue3 的 nextTick 实现原理。
- **难度**：★★★
- **知识点**：nextTick/异步更新队列/微任务/宏任务
- **题型**：源码级原理解析

### 参考答案要点：

1. **nextTick 的作用**
   - 在下次 DOM 更新循环结束之后执行延迟回调
   - 用于获取更新后的 DOM 状态
   - 确保 DOM 已经完成渲染

2. **为什么需要 nextTick**
   - Vue 的响应式更新是**异步的**（批处理）
   - 修改数据后 DOM 不会立即更新
   - 需要等待下一次微任务/macroTask 执行后才完成 DOM 更新

   ```javascript
   const count = ref(0)
   count.value++
   console.log(div.textContent)  // 还是 0！（DOM 还没更新）
   
   nextTick(() => {
     console.log(div.textContent)  // 1（DOM 已更新）
   })
   ```

3. **实现原理（降级策略）**

   Vue3 的 nextTick 使用以下优先级选择异步机制：
   ```
   Promise.then()（微任务）
     ↓ 不可用时
   MutationObserver（微任务）
     ↓ 不可用时
   setImmediate（宏任务，Node.js 环境）
     ↓ 不可用时
   setTimeout(fn, 0)（宏任务，最终兜底）
   ```

   **为什么优先使用微任务？**
   - 微任务在当前任务结束后、渲染前执行
   - 能更快地响应用户交互
   - 浏览器兼容性好

4. **源码级解析（Vue3 简化版）**
   ```javascript
   // 核心实现思路
   const resolvedPromise = Promise.resolve()
   let currentFlushPromise = null
   
   function nextTick(fn) {
     const p = currentFlushPromise || resolvedPromise
     return fn ? p.then(fn) : p
   }
   
   // 调度器中的使用
   function queueJob(job) {
     if (!queue.includes(job)) {
       queue.push(job)
     }
     queueFlush()
   }
   
   function queueFlush() {
     if (!isFlushing && !isFlushPending) {
       isFlushPending = true
       currentFlushPromise = resolvedPromise.then(flushJobs)
     }
   }
   
   function flushJobs() {
     isFlushing = true
     isFlushPending = false
     
     // 按 priority 排序后依次执行
     queue.sort((a, b) => a.id - b.id)
     
     for (let i = 0; i < queue.length; i++) {
       const job = queue[i]
       job()
     }
     
     queue.length = 0
     isFlushing = false
   }
   ```

5. **nextTick 的使用场景**
   - 获取更新后的 DOM 尺寸/位置
   - 操作更新后的 DOM（聚焦、滚动）
   - 第三方库需要在 DOM 更新后初始化
   - 单元测试中等待异步更新完成

6. **常见面试追问**
   - **Q: nextTick 是宏任务还是微任务？**
     - A: 优先使用微任务（Promise/MutationObserver），降级为宏任务（setImmediate/setTimeout）
   - **Q: 连续多次 nextTick 会怎样？**
     - A: 合并为一次异步执行（队列机制）
   - **Q: Vue2 和 Vue3 的 nextTick 有什么区别？**
     - A: 核心逻辑相似，Vue3 使用 Promise.resolve() 替代微任务检测，代码更简洁

### 🔍 追问链
1. **nextTick 回调是在 DOM 更新之前还是之后执行？**
   → 方向：之后！DOM 已经更新完成，可以操作最新的 DOM
2. **同时修改多个数据，nextTick 会执行几次？**
   → 方向：只执行一次（微任务队列去重），这就是异步批量更新的核心
3. **为什么不用 setTimeout(fn, 0) 直接替代 nextTick？**
   → 方向：setTimeout 是宏任务，会在微任务（Promise/MutationObserver）之后执行，时机不够精确

### 深度拓展：手写实现

#### 手写简化版 nextTick 完整实现

```javascript
// =============================================
// nextTick 完整实现（Vue3 简化版）
// 核心机制：异步降级策略 + 回调队列 + 批量刷新
// =============================================

// ---------- 1. 异步调度器的选择策略（降级策略）----------
// 为什么需要降级？因为不同环境对异步 API 的支持不同
// 优先级从高到低：微任务 → 宏任务

// 存储当前使用的异步方法（惰性初始化，只检测一次）
let useMacroTask = false

// 【优先级1】Promise.then（微任务）
// - 浏览器原生支持，性能最优
// - 微任务在当前任务结束后、渲染前执行，能更快响应
const resolvedPromise = Promise.resolve()

// 【优先级2】MutationObserver（微任务）
// - IE11+ 支持，作为 Promise 的兼容方案
// - MutationObserver 是微任务，可以监听 DOM 变化
let observer = null

// 【优先级3】setImmediate（宏任务）
// - Node.js 和 IE10+ 支持
// - 比 setTimeout 更快（不经过最小延迟）

// 【优先级4】setTimeout(fn, 0)（宏任务）
// - 最终兜底方案，所有环境都支持
// - 最小延迟约 4ms（浏览器规范限制），性能最差

// ---------- 2. 检测并选择异步调度器 ----------
function getScheduler() {
  // 如果已经确定使用宏任务，直接返回 setImmediate 或 setTimeout
  if (useMacroTask) {
    // Node.js 环境 → setImmediate（比 setTimeout 快）
    if (typeof setImmediate !== 'undefined') {
      return function scheduleMacroTask(fn) {
        setImmediate(fn)
      }
    }
    // 浏览器兜底 → setTimeout
    return function scheduleMacroTask(fn) {
      setTimeout(fn, 0)
    }
  }

  // 尝试使用微任务
  // 【方案A】Promise.then（首选）
  if (typeof Promise !== 'undefined') {
    const p = Promise.resolve()
    return function scheduleMicroTask(fn) {
      p.then(fn)
    }
  }

  // 【方案B】MutationObserver（Promise 不可用时的备选）
  if (typeof MutationObserver !== 'undefined' &&
      typeof document !== 'undefined' && document.createElement) {
    // 创建一个隐藏的文本节点用于触发观察
    let counter = 1
    const textNode = document.createTextNode(String(counter))
    observer = new MutationObserver(function(mutations) {
      // 文本节点变化时执行回调
      const callback = pendingCallback
      pendingCallback = null
      if (callback) callback()
    })
    // 观察文本节点的数据变化
    observer.observe(textNode, { characterData: true })

    let pendingCallback = null
    return function scheduleMicroTask(fn) {
      pendingCallback = fn
      // 修改文本节点内容，触发 MutationObserver 回调
      textNode.data = String(++counter)
    }
  }

  // 【兜底】如果微任务都不可用，退回到宏任务
  useMacroTask = true
  return getScheduler()  // 递归调用，这次会返回宏任务版本
}

// 获取当前环境的异步调度器（惰性单例）
const scheduler = getScheduler()

// ---------- 3. 回调队列机制 ----------
// 核心设计：将多次 nextTick 调用合并为一次异步执行

const callbacks = []   // 回调队列：存储所有待执行的回调函数
let pending = false    // 锁标记：是否正在等待异步执行（防止重复创建异步任务）

/**
 * nextTick 主函数
 * @param {Function} cb - 要在下次 DOM 更新后执行的回调
 * @param {Object} ctx - 回调的 this 上下文（可选）
 * @returns {Promise} - 如果不传 cb，则返回一个 Promise（支持 async/await 用法）
 */
function nextTick(cb, ctx) {
  let _resolve

  // 【用法1】传入回调函数：将回调加入队列
  if (cb) {
    // 使用包装函数绑定上下文（如果传入了 ctx）
    callbacks.push(function() {
      if (cb) {
        try {
          cb.call(ctx)  // 在指定上下文中执行回调
        } catch (e) {
          // 全局错误处理：防止回调报错导致后续回调无法执行
          console.error('nextTick callback error:', e)
        }
      }
    })
  }
  // 【用法2】不传回调：返回 Promise（支持 await nextTick() 写法）
  else {
    // 返回一个新的 Promise，resolve 函数存入 _resolve
    // 当 flushCallbacks 执行时会调用 _resolve()
    if (!pending && !useMacroTask) {
      return resolvedPromise  // 直接复用已 resolve 的 Promise（性能优化）
    } else {
      return new Promise(resolve => { _resolve = resolve })
      // 将 _resolve 加入回调队列
      callbacks.push(_resolve ? () => _resolve() : undefined)
    }
  }

  // 【核心】安排刷新回调队列
  // 如果当前没有正在等待的异步任务，则创建一个
  flushCallbacks()
}

// ---------- 4. flushCallbacks：批量执行回调 ----------
// 这个函数会在微任务/宏任务的时机被调用
// 它的作用是：一次性清空整个 callbacks 队列

function flushCallbacks() {
  // 【锁机制】防止重复创建异步任务
  // 场景：连续调用 100 次 nextTick，只需要创建 1 个异步任务
  if (pending) return
  pending = true  // 上锁：标记"正在等待异步执行"

  // 使用异步调度器安排真正的刷新操作
  scheduler(doFlushCallbacks)
}

// 真正的刷新逻辑：按序执行所有回调
function doFlushCallbacks() {
  // 【关键】先复制一份队列引用，然后清空原队列
  // 原因：在执行回调的过程中，可能又有新的 nextTick 调用
  // 这些新调用应该进入下一轮刷新，而不是当前的刷新中
  const copies = callbacks.slice(0)
  callbacks.length = 0  // 清空原队列（新调用会进入新的空队列）
  pending = false       // 解锁：允许下一轮异步任务

  // 【顺序执行】所有回调按照加入的顺序依次执行
  for (let i = 0; i < copies.length; i++) {
    copies[i]()  // 执行每个回调
  }

  // 【边界情况】如果在执行回调的过程中又产生了新回调
  // 且这些新回调是在 flushCallbacks 解锁之前加入的
  // 则需要再次刷新（但这种情况很少见，通常由调度器处理）
  if (callbacks.length > 0) {
    // 递归处理剩余的回调
    flushCallbacks()
  }
}
```

#### nextTick 与调度器（Scheduler）的协作流程

```javascript
// =============================================
// nextTick 与 Vue 调度器的完整协作示例
// 展示：数据修改 → watcher 入队 → nextTick 刷新 → DOM 更新 → 用户回调执行
// =============================================

// ---------- 1. 调度器中的 nextTick 应用 ----------

// 任务队列（存储需要异步执行的 watcher/job）
const queue = []
let isFlushing = false     // 是否正在刷新队列
let isFlushPending = false // 是否已经安排了刷新（防止重复安排）

/**
 * 将 job（通常是 watcher）加入队列
 * 这是响应式系统修改数据后的入口
 */
function queueJob(job) {
  // 【去重】同一个 job 只加入一次
  // 场景：同一个组件的多个属性同时变化，只需更新一次
  if (!queue.includes(job)) {
    queue.push(job)

    // 安排刷新队列的操作
    queueFlush()
  }
}

/**
 * 安排队列刷新（使用 nextTick）
 * 这就是为什么 Vue 的 DOM 更新是异步的原因！
 */
function queueFlush() {
  // 如果没有正在刷新、且没有正在等待刷新，才安排
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true  // 标记为"等待刷新"
    // 【关键】使用 nextTick 安排实际的刷新操作
    // nextTick 会将 flushJobs 放入微任务队列
    // 当前同步代码继续执行，等同步代码全部完成后才执行 flushJobs
    nextTick(flushJobs)
  }
}

/**
 * 刷新队列：按优先级依次执行所有 job
 */
function flushJobs() {
  isFlushing = true
  isFlushPending = false

  // 【排序】按 id 排序（确保父组件先于子组件更新、渲染 watcher 优先于 watch 回调）
  queue.sort((a, b) => a.id - b.id)

  try {
    // 依次执行每个 job
    for (let i = 0; i < queue.length; i++) {
      const job = queue[i]
      if (job) {
        // 执行 job（可能是组件重新渲染或用户 watch 回调）
        job()
      }
    }
  } finally {
    // 重置状态
    queue.length = 0
    isFlushing = false

    // 如果刷新过程中产生了新的 job（如 watch 回调触发了新的数据修改）
    // 继续刷新直到队列为空
    if (queue.length > 0) {
      flushJobs()
    }
  }
}

// ---------- 2. 完整执行时序图解 ----------

/*
用户代码执行：
┌─────────────────────────────────────────────────────────────┐
│ 同步代码执行阶段                                              │
│                                                              │
│  state.count++         ← 触发 setter                         │
│    └→ trigger()        ← 找到依赖该属性的 effect              │
│       └→ scheduler(effect.run)                               │
│          └→ queueJob(watcher)  ← watcher 入队                │
│             └→ queueFlush()                                  │
│                └→ nextTick(flushJobs)                        │
│                   ├→ callbacks.push(flushJobs)               │
│                   └→ flushCallbacks()                        │
│                      └→ scheduler(doFlushCallbacks)           │
│                         └── 创建微任务（Promise/MutationObs） │
│                                                              │
│  state.name = 'new'    ← 又触发了一次 setter                 │
│    └→ ...同上...                                            │
│    └→ 但 flushJobs 已经在队列中了（isFlushPending=true）      │
│       所以不会重复创建微任务 ✅                                │
│                                                              │
│  nextTick(() => {                                           │
│    console.log(div.textContent)  ← 用户的回调也入队            │
│  })                                                          │
│    └→ callbacks.push(userCallback)                           │
│    └→ flushCallbacks()                                      │
│       └→ 但 pending=true，不会重复创建微任务 ✅                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              ↓ （同步代码结束）
┌─────────────────────────────────────────────────────────────┐
│ 微任务执行阶段                                                │
│                                                              │
│  doFlushCallbacks() 执行：                                    │
│    ① flushJobs()                                             │
│       ├→ 排序队列                                             │
│       ├→ 执行 watcher.run() → 组件重新渲染 → DOM 更新完成 ✅  │
│       └→ 清空队列                                             │
│    ② userCallback() 执行                                     │
│       └→ 此时 DOM 已经更新完毕！可以安全读取最新状态 ✅          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
*/
```

#### 使用示例与常见陷阱

```javascript
// =============================================
// nextTick 使用示例
// =============================================

// 示例1：基本用法 —— 获取更新后的 DOM
import { ref, nextTick } from 'vue'

const count = ref(0)
const divRef = ref(null)

function increment() {
  count.value++

  // ❌ 错误：此时 DOM 还没更新！
  console.log(divRef.value?.textContent)  // 输出旧值（如 '0'）

  // ✅ 正确：使用 nextTick 等待 DOM 更新完成
  nextTick(() => {
    console.log(divRef.value?.textContent)  // 输出新值（'1'）✅
  })
}

// 示例2：async/await 用法（推荐）
async function incrementAsync() {
  count.value++
  await nextTick()  // 等待 DOM 更新
  console.log(divRef.value?.textContent)  // 输出新值 ✅
}

// 示例3：批量更新 —— 多次修改只触发一次渲染
function batchUpdate() {
  // 连续修改 100 次
  for (let i = 0; i < 100; i++) {
    count.value++
  }
  // 这 100 次修改只会触发 1 次 DOM 更新！（批处理优化）
  nextTick(() => {
    console.log(count.value)  // 100（最终值）
    console.log(divRef.value?.textContent)  // '100'
  })
}

// 示例4：嵌套 nextTick —— 二次更新场景
function nestedUpdate() {
  count.value++

  nextTick(() => {
    console.log('第一次 nextTick:', count.value)  // 1

    // 在 nextTick 回调中再次修改数据
    count.value++

    // 需要再等一轮 nextTick 才能看到第二次更新的结果
    nextTick(() => {
      console.log('第二次 nextTick:', count.value)  // 2
    })
  })
}
```

---

## Q32: 请深入分析 Vue3 的异步更新队列（调度器 Scheduler）的实现。
- **难度**：★★★
- **知识点**：调度器/异步队列/batch/性能优化
- **题型**：源码级原理解析

### 参考答案要点：

1. **为什么需要异步更新队列**
   - 避免不必要的重复渲染
   - 批量处理同一事件循环内的多次数据变化
   - 例如：for 循环修改 100 次 count，只触发一次渲染

2. **调度器的核心设计**
   ```javascript
   // Vue3 Scheduler 核心结构
   const queue = []           // 任务队列
   let isFlushing = false     // 是否正在刷新
   let isFlushPending = false // 是否等待刷新
   
   // 任务优先级
   const enum Id {
     // 组件更新
     COMPONENT_UPDATE = 0,
     // 用户 watch
     WATCHER_CALLBACK = 1,
     // pre watch
     PRE_WATCH_CALLBACK = 2,
   }
   ```

3. **任务入队过程**
   ```javascript
   function queueJob(job) {
     // 去重：同一个 job 只加入一次
     if (!queue.includes(job) && job === null) {
       queue.push(job)
     }
     
     // 安排刷新
     queueFlush()
   }
   ```

4. **刷新过程（flushJobs）**
   ```javascript
   function flushJobs(seen) {
     isFlushing = true
     isFlushPending = false
     
     // 1. 按优先级排序
     queue.sort(comparator)
     
     // 2. 依次执行任务
     try {
       for (let i = 0; i < queue.length; i++) {
         const job = queue[i]
         if (job) {
           job()  // 执行任务（可能是组件更新或 watch 回调）
         }
       }
     } finally {
       queue.length = 0
       isFlushing = false
      
       // 3. 如果刷新过程中产生了新任务，继续刷新
       if (queue.length || postQueue.length) {
         flushJobs(seen)
       }
     }
   }
   ```

5. **优先级机制**
   - 组件渲染 Watcher 优先级最高（ID=0）
   - 父组件的更新优先于子组件
   - 用户 watch 回调在组件更新之后
   - `watchPostEffect`（flush: 'post'）在 DOM 更新之后

6. **预/后置处理**
   - `watchEffect` 支持 `flush` 选项：
     - `'pre'`（默认）：组件更新前
     - `'sync'`：同步执行
     - `'post'`：组件更新后（使用 `nextTick`/`Promise.then`）

7. **实际意义**
   - **性能优化**：100 次 setState → 1 次 DOM 更新
   - **一致性保证**：同一 tick 内的数据变化，用户看到的是最终状态
   - **避免抖动**：防止中间状态的闪烁

---

## Q33: 请分析 Vue3 的编译原理（模板 → 渲染函数 → VNode）。
- **难度**：★★★
- **知识点**：编译原理/AST/渲染函数/代码生成
- **题型**：源码级原理解析

### 参考答案要点：

1. **编译的整体流程**
   ```
   Template（字符串）
     ↓ parse
   AST（抽象语法树）
     ↓ transform
   transformed AST（增强的 AST，含优化信息）
     ↓ generate
   Render Function（渲染函数）
     ↓ runtime
   VNode Tree
     ↓ patch
   Real DOM
   ```

2. **第一阶段：Parse（解析）**
   - 将模板字符串解析为 AST
   - 使用有限状态机逐字符扫描
   - 识别：标签、属性、文本、注释、表达式

   ```javascript
   // 输入
   '<div id="app"><p>{{ message }}</p></div>'
   
   // 输出 AST（简化）
   {
     type: 'Element',
     tag: 'div',
     props: [{ type: 'Attribute', name: 'id', value: 'app' }],
     children: [
       {
         type: 'Element',
         tag: 'p',
         children: [
           { type: 'Interpolation', content: { type: 'Expression', content: 'message' } }
         ]
       }
     ]
   }
   ```

3. **第二阶段：Transform（转换）**
   - 遍历 AST，进行语义分析和优化
   - 关键转换：
     - **v-if/v-else** → 转为三元表达式
     - **v-for** → 转为 `_renderList` + 循环
     - **v-model** → 转为 props + event
     - **v-slot** → 转为 slots 对象
     - **静态提升**：标记静态节点
     - **PatchFlags**：标记动态属性类型

   ```javascript
   // transform 后的 AST 增加了 codegenNode
   {
     type: 'Element',
     tag: 'div',
     codegenNode: {
       type: 'VNodeCall',
       tag: '"div"',
       props: { id: 'app' },
       children: [...],
       patchFlag: 1,        // TEXT 动态
       dynamicProps: ['id'], // 动态属性
       isBlock: true         // 是否需要 Block wrapper
     }
   }
   ```

4. **第三阶段：Generate（代码生成）**
   - 将转换后的 AST 生成为可执行的渲染函数代码
   - 使用字符串拼接构建代码

   ```javascript
   // 生成的渲染函数（简化）
   function _sfc_render(_ctx, _cache) {
     return _createElementVNode("div", { id: _ctx.appId }, [
       _createElementVNode("p", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
     ])
   }
   ```

5. **Vue3 编译优化（关键！）**
   
   **① 静态提升（Static Hoisting）**
   ```javascript
   // 编译前：每次渲染都重新创建
   function render() {
     return h('div', null, [
       h('span', null, 'static text'),  // 每次都创建
       h('div', null, msg.value)        // 动态内容
     ])
   }
   
   // 编译后：静态内容提升到外面
   const _hoisted_1 = h('span', null, 'static text')  // 只创建一次
   
   function render() {
     return h('div', null, [_hoisted_1, h('div', null, msg.value)])
   }
   ```

   **② Patch Flags（补丁标志）**
   ```javascript
   // 告诉运行时哪些部分是动态的
   const hoistedStatic = createStaticVNode('<div>...</div>')  // 完全静态
   
   // 带有 patch flags 的 VNode
   createVNode('div', null, [children], PatchFlags.TEXT /* 1 */)  // 只有文本动态
   createVNode('div', { class: cls }, null, PatchFlags.CLASS /* 2*/)  // 只有 class 动态
   ```

   **③ Block Tree**
   - 收集所有动态子节点到一个扁平数组
   - diff 时跳过静态树，只比较 Block 内的动态节点

6. **编译时 vs 运行时**
   - Vue3 的优化策略：**编译时多做工作，运行时少做工作**
   - 通过编译器注入 hints，让运行时知道哪些可以跳过
   - 这是 Vue3 比 Vue2 快的根本原因之一

---

## Q34: 请分析 Vue3 响应式系统的完整实现（reactive 函数的源码逻辑）。
- **难度**：★★★
- **知识点**：响应式源码/Proxy/依赖收集
- **题型**：源码级原理解析

### 参考答案要点：

1. **reactive 函数的核心实现**
   ```javascript
   // Vue3 reactive 简化实现
   function reactive(target) {
     // 1. 如果已经是 proxy，直接返回
     if (target[ReactiveFlags.IS_REACTIVE]) {
       return target
     }
     
     // 2. 如果是基本类型，警告并返回
     if (!isObject(target)) {
       console.warn(`value cannot be made reactive: ${String(target)}`)
       return target
     }
     
     // 3. 查找缓存（同一对象只代理一次）
     const existingProxy = proxyMap.get(target)
     if (existingProxy) {
       return existingProxy
     }
     
     // 4. 创建 Proxy
     const proxy = new Proxy(target, baseHandlers)  // 对象/数组
     // const proxy = new Proxy(target, collectionHandlers)  // Map/Set
     
     // 5. 缓存映射
     proxyMap.set(target, proxy)
     
     // 6. 建立反向映射（proxy → raw）
     rawMap.set(proxy, target)
     
     return proxy
   }
   ```

2. **baseHandlers（mutableHandlers）详解**
   ```javascript
   const mutableHandlers = {
     get(target, key, receiver) {
       // 1. 特殊属性拦截（__v_isReactive, __v_raw 等）
       if (key === ReactiveFlags.IS_REACTIVE) {
         return true
       }
       if (key === ReactiveFlags.RAW) {
         return target
       }
       
       // 2. 依赖收集（track）
       track(target, TrackOpTypes.GET, key)
       
       // 3. 获取值（使用 Reflect 保证 this 指向正确）
       const res = Reflect.get(target, key, receiver)
       
       // 4. 懒代理（嵌套对象在访问时才转为 reactive）
       if (isObject(res)) {
         return reactive(res)  // 深层响应式
       }
       
       return res
     },
     
     set(target, key, value, receiver) {
       // 1. 获取旧值
       const oldValue = target[key]
       
       // 2. 设置值
       const result = Reflect.set(target, key, value, receiver)
       
       // 3. 触发更新（trigger）
       // 区分：新增属性 vs 修改属性
       const hadKey = hasOwn(target, key)
       if (!hadKey) {
         trigger(target, TriggerOpTypes.ADD, key)  // 新增
       } else if (value !== oldValue) {
         trigger(target, TriggerOpTypes.SET, key)  // 修改
       }
       
       return result
     },
     
     deleteProperty(target, key) {
       const hadKey = hasOwn(target, key)
       const result = Reflect.deleteProperty(target, key)
       if (hadKey) {
         trigger(target, TriggerOpTypes.DELETE, key)
       }
       return result
     },
     
     has(target, key) {
       track(target, TrackOpTypes.HAS, key)
       return Reflect.has(target, key)
     },
     
     ownKeys(target) {
       track(target, TrackOpTypes.ITERATE)
       return Reflect.ownKeys(target)
     }
   }
   ```

3. **track（依赖收集）详解**
   ```javascript
   // 全局数据结构
   const targetMap = new WeakMap()  // target → depsMap
   let activeEffect = null          // 当前正在执行的 effect
   let effectStack = []             // effect 栈（支持嵌套）
   
   function track(target, type, key) {
     // 没有活跃 effect，不收集
     if (!activeEffect) return
     // shouldTrack 标记（用于 stop 效果）
     if (!shouldTrack) return
     
     // 获取或创建 depsMap
     let depsMap = targetMap.get(target)
     if (!depsMap) {
       targetMap.set(target, (depsMap = new Map()))
     }
     
     // 获取或创建 dep
     let dep = depsMap.get(key)
     if (!dep) {
       depsMap.set(key, (dep = new Set()))
     }
     
     // 收集依赖
     trackEffects(dep)
   }
   
   function trackEffects(dep) {
     // 去重：同一个 effect 不重复收集
     if (!dep.has(activeEffect)) {
       dep.add(activeEffect)
       activeEffect.deps.push(dep)  // 反向记录：effect 记录自己属于哪些 dep
     }
   }
   ```

4. **trigger（派发更新）详解**
   ```javascript
   function trigger(target, type, key, newValue, oldValue) {
     const depsMap = targetMap.get(target)
     if (!depsMap) return
     
     // 收集要触发的 effects
     const effects = new Set()
     
     // 1. 精确触发（特定 key 的依赖）
     if (key !== undefined) {
       add(depsMap.get(key), effects)
     }
     
     // 2. ITERATE 触发（迭代相关依赖，如 for...in）
     if (type === TriggerOpTypes.ADD || type === TriggerOpTypes.DELETE) {
       add(depsMap.get(ITERATE_KEY), effects)
     }
     
     // 3. length 变化触发（数组长度变化）
     if (isArray(target) && key === 'length') {
       // 触发所有 index >= newValue 的依赖
     }
     
     // 4. 执行 effects
     effects.forEach(effect => {
       // 避免无限循环：如果 effect 正在执行且不是嵌套的，跳过
       if (effect !== activeEffect || effect.allowRecurse) {
         effect.scheduler ? effect.scheduler(effect.run) : effect.run()
       }
     })
   }
   ```

5. **ref 的实现（补充）**
   ```javascript
   class RefImpl {
     constructor(value) {
       this._value = isObject(value) ? reactive(value) : value
       this._rawValue = value
       this.dep = new Set()  // ref 有自己的 dep
       this.__v_isRef = true
     }
     
     get value() {
       trackRefValue(this)  // 依赖收集
       return this._value
     }
     
     set value(newValue) {
       // 比较 rawValue（避免对象引用不同但内容相同的情况）
       if (hasChanged(newValue, this._rawValue)) {
         this._rawValue = newValue
         this._value = isObject(newValue) ? reactive(newValue) : newValue
         triggerRefValue(this)  // 触发更新
       }
     }
   }
   ```

6. **关键设计决策**
   - **WeakMap**：不影响 GC，target 被回收时自动清除
   - **惰性代理**：只在访问深层属性时才创建 Proxy
   - **嵌套 effect 栈**：正确处理 computed 嵌套、watch 嵌套
   - **无限循环保护**：trigger 时跳过正在运行的 effect

### 🔍 追问链
1. **模板编译的三个阶段各自做了什么？AST 是什么样的结构？**
   → 方向：parse（模板→AST）、optimize（标记静态节点）、generate（AST→渲染函数字符串）
2. **静态提升（HoistStatic）是什么？为什么要做？**
   → 方向：将静态节点/变量提升到渲染函数外部，避免每次重新创建
3. **PatchFlags 是什么？编译时的优化提示如何在运行时加速 diff？**
   → 方向：编译时标注节点变化的类型（TEXT/PROPS/CLASS等），运行时只检查对应标志位

---

## Q35: Vue3 的 computed 是如何实现的？请分析其缓存和依赖追踪机制。
- **难度**：★★★
- **知识点**：computed/缓存机制/lazy effect
- **题型**：源码级原理解析

### 参考答案要点：

1. **computed 的核心实现思路**
   - computed 本质是一个特殊的 effect（lazy + scheduler + dirty 机制）
   - 只有在**被访问时**才重新计算（lazy）
   - 依赖不变时返回缓存的值（dirty 标志位）

2. **简化实现**
   ```javascript
   function computed(getterOrOptions) {
     let getter
     setter
     
     if (isFunction(getterOrOptions)) {
       getter = getterOrOptions
       setter = () => {
         console.warn('Write operation failed: computed value is readonly')
       }
     } else {
       getter = getterOrOptions.get
       setter = getterOrOptions.set
     }
     
     let dirty = true      // 脏标记：是否需要重新计算
     let value             // 缓存的值
     let computedRef       // computed 自身的 RefImpl 实例
     
     const effect = new ReactiveEffect(getter, () => {
       // scheduler：依赖变化时不是立即重新计算
       // 而是将 dirty 设为 true，触发 computed 自身的更新
       if (!dirty) {
         dirty = true
         triggerRefValue(computedRef)  // 通知使用 computed 的地方
       }
     })
     
     // lazy: true 表示创建时不立即执行
     effect.computed = true
     
     computedRef = {
       __v_isRef: true,
       get value() {
         // 依赖收集：将 computed 的 effect 作为依赖
         trackRefValue(computedRef)
         
         // dirty 为 true 时才重新计算
         if (dirty) {
           dirty = false
           value = effect.run()  // 执行 getter，内部会收集 getter 的依赖
         }
         
         return value
       },
       set value(newValue) {
         setter(newValue)
       }
     }
     
     return computedRef
   }
   ```

3. **缓存机制的运作流程**
   ```
   初始状态：dirty = true, value = undefined
   
   第一次访问 computed.value:
   1. trackRefValue → 收集外部依赖（谁在使用这个 computed）
   2. dirty === true → 执行 effect.run()（即执行 getter）
   3. getter 内部访问响应式数据 → 触发这些数据的 track
   4. getter 返回结果 → 存入 value
   5. dirty = false
   6. 返回 value
   
   第二次访问（依赖未变）:
   1. trackRefValue
   2. dirty === false → 跳过计算
   3. 直接返回缓存的 value
   
   依赖变化时:
   1. 响应式数据 trigger → 找到 computed 的 effect
   2. 执行 scheduler → dirty = true
   3. triggerRefValue → 通知使用 computed 的外部 effect
   4. 外部 effect 重新执行 → 再次访问 computed.value → 重新计算
   ```

4. **computed 嵌套的问题与解决**
   ```javascript
   const a = ref(1)
   const b = computed(() => a.value * 2)  // b 依赖 a
   const c = computed(() => b.value + 1)  // c 依赖 b
   
   // 问题：c 的 getter 执行时，b 的 getter 也执行
   // 需要正确的 effect 嵌套栈来追踪依赖
   ```
   
   - Vue 通过 `effectStack` 管理嵌套的 effect
   - 内层 effect 执行时，`activeEffect` 指向内层
   - 内层 effect 完成后恢复外层的 `activeEffect`

5. **computed vs ref 的区别（底层视角）**
   - `ref`：每次 `.value` 都返回当前值，没有缓存
   - `computed`：有 dirty 机制，依赖不变时返回缓存值
   - `computed` 的 getter 内部创建了一个 effect 来追踪依赖

6. **可写 computed 的实现**
   ```javascript
   const count = ref(1)
   const double = computed({
     get: () => count.value * 2,
     set: (val) => { count.value = val / 2 }
   })
   
   double.value = 10  // 触发 setter → count.value = 5
   ```

### 深度拓展：手写实现

#### 手写简化版 KeepAlive 组件（LRU 缓存策略）

```javascript
// =============================================
// KeepAlive 组件核心实现（Vue3 简化版）
// 核心机制：LRU 缓存 + 缓存命中/未命中判断 + 生命周期管理
// =============================================

// ---------- 1. KeepAlive 组件定义 ----------
// 这是一个内置组件，它不会渲染真实的 DOM 节点
// 而是作为抽象组件存在，负责缓存和管理子组件实例

const KeepAlive = {
  name: 'KeepAlive',

  // 抽象组件标记：Vue 渲染器会特殊处理抽象组件（不创建真实 DOM）
  abstract: true,

  // 组件 props 定义
  props: {
    // include：只缓存匹配的组件（支持字符串、正则、数组）
    // 示例：include="ComponentA" 或 :include="[/A$/]" 或 :include="['A', 'B']"
    include: [String, RegExp, Array],

    // exclude：不缓存匹配的组件（优先级高于 include）
    // 示例：exclude="ComponentB"
    exclude: [String, RegExp, Array],

    // max：最大缓存数量（超出时使用 LRU 淘汰最早未使用的）
    max: [Number, String]
  },

  // ---------- 2. 核心数据结构 ----------
  setup(props, { slots }) {
    // 【核心】cache 对象：存储缓存的 VNode 实例
    // key → VNode 的映射关系
    // key 的生成规则：
    // - 如果子组件有 props.key，使用 key
    // - 否则使用组件的构造函数/组件选项对象（componentOptions.Ctor）
    const cache = new Map()

    // keys 数组：记录所有缓存 key 的顺序（用于 LRU 算法）
    // 数组的末尾是最近使用的，开头是最早使用的
    // 当超过 max 时，移除 keys[0] 对应的缓存（LRU 淘汰）
    const keys = []

    // 当前活跃的 key（正在显示的组件的 key）
    let current = null

    // ---------- 3. LRU 缓存操作函数 ----------

    /**
     * pruneCacheEntry：淘汰单个缓存条目
     * @param {*} cachedVnode - 要淘汰的缓存的 VNode
     */
    function pruneCacheEntry(cachedVnode) {
      if (!cachedVnode) return

      // 获取缓存的组件实例
      const instance = cachedVnode.component

      if (instance) {
        // 重置实例引用（帮助 GC 回收）
        cachedVnode.component = null

        // 【关键】调用组件的 deactivate 钩子
        // 这会触发 onDeactivated 生命周期钩子
        if (instance.type.deactivated) {
          instance.type.deactivated(instance)
        }

        // 停止当前实例的所有 effect（停止响应式追踪，避免内存泄漏）
        if (instance.effect) {
          instance.effect.stop()
        }

        // 清理组件内的 effect scope（如 computed、watch 等）
        if (instance.scope) {
          instance.scope.stop()
          // 从父级 effect scope 中移除
          if (instance.scope.parent) {
            const parentEffects = instance.scope.parent.effects
            const idx = parentEffects.indexOf(instance.scope)
            if (idx > -1) parentEffects.splice(idx, 1)
          }
        }
      }

      // 从 cache 中删除
      if (cachedVnode.key != null) {
        cache.delete(cachedVnode.key)
      }
    }

    /**
     * pruneCache：根据条件清理缓存
     * 用于 include/exclude 变化时重新过滤缓存
     * @param {Function} filter - 过滤函数，返回 true 表示保留
     */
    function pruneCache(filter) {
      cache.forEach((vnode, key) => {
        // 获取组件名称（用于匹配 include/exclude）
        const name = getComponentName(vnode.type)

        // 如果不满足过滤条件，则淘汰该缓存
        if (name && !filter(name)) {
          pruneCacheEntry(cache.get(key))
          cache.delete(key)
          // 从 keys 数组中移除
          const idx = keys.indexOf(key)
          if (idx > -1) keys.splice(idx, 1)
        }
      })
    }

    // ---------- 4. include/exclude 匹配逻辑 ----------

    /**
     * matches：检查组件名是否匹配 pattern
     * @param {string} name - 组件名称
     * @param {String|RegExp|Array} pattern - 匹配模式
     */
    function matches(pattern, name) {
      if (Array.isArray(pattern)) {
        // 数组形式：任意一个元素匹配即通过
        return pattern.some(p => p === name)
      } else if (typeof pattern === 'string') {
        // 字符串形式：逗号分隔的多个组件名
        return pattern.split(',').map(s => s.trim()).includes(name)
      } else if (pattern instanceof RegExp) {
        // 正则形式：正则测试
        return pattern.test(name)
      }
      return false
    }

    /**
     * getComponentName：获取组件的名称
     * 优先级：组件 options.name > 文件名（__file） > 匿名
     */
    function getComponentName(component) {
      return component.name || component.__name || null
    }

    // ---------- 5. render 函数：KeepAlive 的核心逻辑 ----------
    // 这是 KeepAlive 最关键的部分：决定是否从缓存中取用或创建新实例

    render() {
      // 获取默认插槽内容（KeepAlive 只能有一个子元素）
      const slot = slots.default()
      if (!slot || !slot.length) return null

      // 获取第一个子节点（KeepAlive 要求只有一个直接子节点）
      const rawVnode = slot[0]

      // 如果不是组件类型的 VNode（如纯文本、普通元素），无法缓存，直接返回
      if (!isVNode(rawVnode) || !(rawVnode.shapeFlag & ShapeFlags.COMPONENT)) {
        return rawVnode
      }

      // 获取组件名称和 key
      const name = getComponentName(rawVnode.type)
      const key = rawVnode.key == null
        ? rawVnode.type  // 无 key 时使用组件构造函数作为标识
        : rawVnode.key

      // 【检查 include/exclude】决定是否应该缓存该组件
      const { include, exclude, max } = props

      if (
        // 如果配置了 exclude 且组件名匹配 → 不缓存
        (exclude && (!name || matches(exclude, name))) ||
        // 如果配置了 include 且组件名不匹配 → 不缓存
        (include && (!name || !matches(include, name)))
      ) {
        // 不缓存的情况：直接渲染原始 VNode（不走缓存逻辑）
        current = rawVnode
        return rawVnode
      }

      // ========== 缓存命中 / 未命中的核心逻辑 ==========

      // 【情况A】缓存命中：该组件之前被缓存过
      const cachedVnode = cache.get(key)
      if (cachedVnode) {
        console.log(`🎯 缓存命中: ${name || key}`)

        // 复用缓存的 VNode
        rawVnode.component = cachedVnode.component
        rawVnode.elm = cachedVnode.elm  // 复用真实 DOM 元素！

        // 【LRU 更新】将该 key 移到 keys 数组末尾（标记为最近使用）
        // 这样可以确保 keys[0] 总是最久未使用的
        const idx = keys.indexOf(key)
        if (idx > -1) {
          keys.splice(idx, 1)  // 先从原位置移除
        }
        keys.push(key)         // 追加到末尾

        // 【关键】将 VNode 标记为"已缓存"，这样 patch 时不会销毁它
        rawVnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE
      }
      // 【情况B】缓存未命中：首次渲染该组件
      else {
        console.log(`✨ 首次渲染/缓存未命中: ${name || key}`)

        // 将 key 加入 keys 数组
        keys.push(key)

        // 【LRU 淘汰检查】如果设置了 max 且缓存数量超限
        // 淘汰最早未使用的缓存（keys[0] 对应的就是最久没用的）
        if (max && keys.length > Number(max)) {
          // 取出最久未使用的 key
          const oldestKey = keys.shift()  // 移除并返回第一个元素
          console.log(`🗑️ LRU 淘汰: ${oldestKey}（缓存已满 ${max}）`)
          // 淘汰对应的缓存条目
          pruneCacheEntry(cache.get(oldestKey))
          cache.delete(oldestKey)
        }

        // 将当前 VNode 存入 cache
        cache.set(key, rawVnode)

        // 标记为需要缓存（patch 后会将 component 实例保存回 cache）
        rawVnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE
      }

      // 记录当前活跃的 key
      current = key

      // 【关键】避免 KeepAlive 本身成为真实 DOM 节点
      // 将子节点的父组件引用指向 KeepAlive 的父组件
      // 这样子组件在生命周期中访问到的 $parent 是正确的
      rawVnode.keepAlive = true

      // 返回处理后的子节点（可能是复用的缓存，也可能是新创建的）
      return rawVnode
    },

    // ---------- 6. 生命周期钩子 ----------

    // activated：当缓存的组件被激活（从缓存恢复显示）时触发
    onActivated() {
      // 可以在这里做一些恢复操作，如重新请求数据等
    },

    // deactivated：当组件被停用（进入缓存）时触发
    onDeactivated() {
      // 可以在这里做一些暂停操作，如清除定时器等
    },

    // ---------- 7. 监听 include/exclude/max 变化 ----------
    // 当这些 prop 变化时，可能需要重新过滤缓存
    watch(
      () => [props.include, props.exclude, props.max],
      ([newInclude, newExclude, newMax]) => {
        // 重新过滤缓存：只保留符合新规则的
        pruneCache((name) => {
          // 保留的条件：不在排除列表中，且在包含列表中（如果配置了包含）
          if (newExclude && name && matches(newExclude, name)) {
            return false
          }
          if (newInclude && name && !matches(newInclude, name)) {
            return false
          }
          return true
        })

        // 如果新的 max 比当前的缓存数量少，需要额外淘汰
        if (newMax && keys.length > Number(newMax)) {
          // 淘汰多余的缓存
          for (let i = 0; i < keys.length - Number(newMax); i++) {
            const key = keys[i]
            pruneCacheEntry(cache.get(key))
            cache.delete(key)
          }
          // 更新 keys 数组
          keys.splice(0, keys.length - Number(newMax))
        }
      },
      { flush: 'post' }  // 在 DOM 更新后执行
    )

    // 暴露给模板的方法（可选，用于调试或手动控制缓存）
    return {
      cache,
      keys,
      current,
      // 手动清除指定缓存
      invalidateCache(key) {
        if (key != null && cache.has(key)) {
          pruneCacheEntry(cache.get(key))
          cache.delete(key)
          const idx = keys.indexOf(key)
          if (idx > -1) keys.splice(idx, 1)
        }
      },
      // 清空所有缓存
      clearCache() {
        cache.forEach((vnode, key) => {
          pruneCacheEntry(vnode)
        })
        cache.clear()
        keys.length = 0
      }
    }
  }
}

// ---------- 8. 辅助常量和函数 ----------

// ShapeFlags：VNode 类型标志位（用于位运算优化性能）
const ShapeFlags = {
  ELEMENT: 1,           // 普通 HTML 元素
  COMPONENT: 4,         // Vue 组件
  COMPONENT_SHOULD_KEEP_ALIVE: 256,  // 应该被 KeepAlive 缓存
  COMPONENT_KEEP_ALIVE: 512       // 已被 KeepAlive 缓存（复用）
}

// 判断是否为有效的 VNode
function isVnode(value) {
  return value ? value.__v_isVnode === true : false
}
```

#### LRU 缓存策略执行流程图解

```
┌─────────────────────────────────────────────────────────────┐
│                    KeepAlive 工作流程                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  用户切换组件 A → B                                          │
│                                                              │
│  ┌──────────┐                                               │
│  │ 组件 A    │                                               │
│  │ 正在显示  │                                               │
│  └─────┬────┘                                               │
│        │ 切换事件                                            │
│        ▼                                                     │
│  ┌──────────────────────────────────────┐                   │
│  │ 1. 检查 include/exclude              │                   │
│  │    → A 是否允许缓存？                 │                   │
│  └──────────────┬───────────────────────┘                   │
│                 │ 允许缓存                                      │
│                 ▼                                             │
│  ┌──────────────────────────────────────┐                   │
│  │ 2. 缓存组件 A                         │                   │
│  │    cache.set('A_key', vnodeA)        │                   │
│  │    keys.push('A_key')                │                   │
│  │    → 触发 deactivated 生命周期        │                   │
│  │    → 不执行 unmounted！               │                   │
│  └──────────────┬───────────────────────┘                   │
│                 │                                              │
│                 ▼                                             │
│  ┌──────────────────────────────────────┐                   │
│  │ 3. 检查组件 B 是否在缓存中             │                   │
│  │    cache.get('B_key')?                │                   │
│  └──────┬────────────────────┬──────────┘                   │
│         │ 命中                │ 未命中                          │
│         ▼                    ▼                                │
│  ┌──────────────┐  ┌──────────────────────┐                  │
│  │ ✅ 复用缓存   │  │ 🆕 创建新实例         │                  │
│  │ 复用 vnodeB   │  │ cache.set('B_key')  │                  │
│  │ 复用 DOM 元素 │  │ keys.push('B_key')  │                  │
│  │ LRU: B→末尾   │  │ 检查 LRU 淘汰       │                  │
│  │ 触发 activated│  │ 触发 mounted        │                  │
│  └──────────────┘  └──────────────────────┘                  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                    LRU 淘汰示例                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  max = 3，依次切换 A → B → C → D                             │
│                                                              │
│  切换到 A: cache={A}, keys=[A]                              │
│  切换到 B: cache={A,B}, keys=[A,B]                           │
│  切换到 C: cache={A,B,C}, keys=[A,B,C]                       │
│  切换到 D:                                                    │
│    cache 已满(3)，keys=[A,B,C]                               │
│    LRU 淘汰 keys[0]=A（最久未使用）                            │
│    cache={B,C,D}, keys=[B,C,D]                              │
│                                                              │
│  再次切回 A:                                                 │
│    A 不在 cache 中 → 重新创建                                 │
│    淘汰 keys[0]=B                                            │
│    cache={C,D,A}, keys=[C,D,A]                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### 使用示例与最佳实践

```javascript
// =============================================
// KeepAlive 使用示例
// =============================================

<template>
  <keep-alive :include="['HomeView', 'UserList']" :exclude="['DetailView']" :max="10">
    <!-- 动态组件 -->
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </keep-alive>
</template>

<script setup>
import { ref, onActivated, onDeactivated } from 'vue'

const scrollPosition = ref(0)

// 在被缓存的组件中使用生命周期钩子
onActivated(() => {
  console.log('🔄 组件被激活（从缓存恢复）')
  // 恢复滚动位置
  window.scrollTo(0, scrollPosition.value)
})

onDeactivated(() => {
  console.log('💤 组件被停用（进入缓存）')
  // 保存滚动位置
  scrollPosition.value = window.scrollY
})
</script>
```

---

## Q36: 请列举 Vue 项目中常见的性能优化手段，并说明各自的适用场景。
- **难度**：★★★
- **知识点**：性能优化/渲染优化/打包优化
- **题型**：综合应用题

### 参考答案要点：

1. **渲染层面优化**

   **① v-if vs v-show（条件渲染）**
   - 切换频率低 → `v-if`
   - 切换频率高 → `v-show`
   
   **② v-once（静态内容）**
   - 不变的内容使用 `v-once`，只渲染一次
   ```html
   <div v-once>{{ staticContent }}</div>
   ```
   
   **③ v-memo（条件缓存）**
   - 大型列表中大部分行不变时
   ```html
   <div v-for="item in list" :key="item.id" v-memo="[item.id === selectedId]">
   ```
   
   **④ 函数式组件（Vue2）/ 普通函数（Vue3）**
   - Vue2：无状态、无实例的轻量组件
   - Vue3：普通函数返回 VNode 即可（更简洁）
   ```javascript
   // Vue3 Functional Component
   const DynamicHeading = (props, context) => {
     return h(`h${props.level}`, null, context.slots.default())
   }
   ```
   
   **⑤ 虚拟滚动（Virtual Scrolling）**
   - 超长列表（1000+ 条）使用虚拟滚动
   - 只渲染可视区域内的元素
   - 库：`vue-virtual-scroller`、`@tanstack/vue-virtual`

   **⑥ 冻结数据（Object.freeze）**
   - 大型静态数据不需要响应式
   ```javascript
   const bigData = Object.freeze(largeArray)  // 不做响应式处理
   ```
   
   **⑦ shallowRef / shallowReactive**
   - 大型深层对象，只需要顶层响应式
   - 避免深层代理的性能开销

2. **代码层面优化**

   **① 路由懒加载**
   ```javascript
   const Home = () => import('./views/Home.vue')
   const About = () => import('./views/About.vue')
   ```
   
   **② 组件异步加载**
   ```javascript
   const HeavyDialog = defineAsyncComponent(() =>
     import('./components/HeavyDialog.vue')
   )
   ```
   
   **③ 第三方库按需引入**
   - Element Plus：`unplugin-vue-components` + `unplugin-auto-import`
   - Lodash：`lodash-es` + tree-shaking
   
   **④ 防抖/节流**
   - 搜索输入、窗口 resize、滚动事件
   ```javascript
   import { useDebounceFn } from '@vueuse/core'
   const debouncedSearch = useDebounceFn(search, 300)
   ```

3. **网络层面优化**

   **① CDN 加载**
   - Vue、Vue Router、Pinia 等通过 CDN 引入（不打入 bundle）
   
   **② Gzip/Brotli 压缩**
   - 服务器开启压缩（体积减小 60-80%）
   
   **③ 图片优化**
   - WebP 格式、懒加载、响应式图片、CDN
   
   **④ HTTP/2 / HTTP/3**
   - 多路复用、头部压缩、服务器推送

4. **构建层面优化**

   **① Vite/Webpack 优化**
   - Vite：原生 ESM，开发服务器极快
   - Webpack：SplitChunks、Tree Shaking、持久化缓存
   
   **② 预渲染（Prerendering）**
   - `prerender-spa-plugin`：构建时生成静态 HTML
   
   **③ PWA 离线缓存**
   - Service Worker + Workbox

5. **SSR 服务端渲染**
   - Nuxt.js（Vue 全栈框架）
   - 首屏加载快、SEO 友好
   - 成本：服务器资源、开发复杂度增加

6. **性能监控与分析**
   - Vue DevTools Performance
   - Chrome DevTools Performance Panel
   - Lighthouse 审计
   - 自定义性能埋点（FCP、LCP、CLS）

7. **优化策略选择指南**
   | 场景 | 优化手段 | 预期收益 |
   |------|----------|----------|
   | 首屏慢 | 路由懒加载 + 预加载 | ⭐⭐⭐ |
   | 页面卡顿 | 虚拟滚动 + v-memo | ⭐⭐⭐ |
   | 包体积大 | 按需引入 + CDN + Tree Shaking | ⭐⭐⭐ |
   | SEO 差 | SSR / 预渲染 / SSG | ⭐⭐⭐ |
   | 列表渲染慢 | 虚拟滚动 + key 优化 | ⭐⭐ |
   | 组件重渲染 | computed + useMemoize | ⭐⭐ |

---

## Q37: 如何设计一个高质量的 Vue 组件？请说明组件设计的原则和最佳实践。
- **难度**：★★★
- **知识点**：组件设计/SOLID/最佳实践/架构
- **题型**：架构设计题

### 参考答案要点：

1. **组件设计原则**

   **① 单一职责原则（SRP）**
   - 每个组件只做一件事
   - 好的组件：`UserCard`、`SearchInput`、`DataTable`
   - 不好的组件：`UserManagementPanel`（做了太多事）
   
   **② 开闭原则（OCP）**
   - 对扩展开放，对修改关闭
   - 通过 props、slots、events 扩展行为
   - 不需要修改组件源码就能定制

   **③ 依赖倒置原则（DIP）**
   - 依赖抽象而非具体实现
   - 通过 inject/provide 注入依赖
   - 通过 props 传入数据和回调

2. **高质量组件的特征**

   **① 良好的 Props 设计**
   ```typescript
   interface Props {
     // 必填项
     title: string
     items: Item[]
     
     // 可选项（合理默认值）
     size?: 'small' | 'medium' | 'large'
     disabled?: boolean
     
     // 回调
     onItemClick?: (item: Item) => void
     
     // 插槽
     default?: slot
     header?: slot
   }
   
   const props = withDefaults(defineProps<Props>(), {
     size: 'medium',
     disabled: false
   })
   ```

   **② 清晰的事件接口**
   ```typescript
   const emit = defineEmits<{
     'update:modelValue': [value: string]
     'change': [value: string, oldValue: string]
     'click': [event: MouseEvent]
   }>()
   ```

   **③ 灵活的插槽设计**
   ```html
   <template>
     <div class="card">
       <div class="card-header">
         <slot name="header" :title="title">
           <h3>{{ title }}</h3>  <!-- 默认内容 -->
         </slot>
       </div>
       <div class="card-body">
         <slot :items="items" :loading="loading" />  <!-- 作用域插槽 -->
       </div>
       <div class="card-footer">
         <slot name="footer" />
       </div>
     </div>
   </template>
   ```

3. **组件通信的最佳实践**

   **状态提升（Lifting State Up）**
   - 当多个组件需要共享状态时，将状态提升到最近的共同祖先
   - 避免通过深层 props 传递（prop drilling）

   **控制反转（Inversion of Control）**
   - 父组件通过 render function / slot 控制子组件的渲染细节
   - 子组件只负责"骨架"，内容由父组件决定

4. **组件的生命周期管理**
   - 在 `onMounted` 中初始化第三方库
   - 在 `onBeforeUnmount` 中清理（定时器、事件监听、订阅）
   - 使用 `try/finally` 确保清理执行

5. **可测试性设计**
   - 业务逻辑抽取为 Composable（便于单元测试）
   - 组件职责单一（便于快照测试）
   - 依赖通过 props/inject 注入（便于 mock）

6. **文档和类型**
   - 使用 JSDoc 或 TSDoc 注释 props 和 events
   - TypeScript 类型定义作为"活的文档"
   - 提供使用示例和 Storybook 故事

7. **组件设计 Checklist**
   - [ ] 命名清晰表达意图
   - [ ] Props 类型完整且有默认值
   - [ ] Events 命名符合规范（动词/名词）
   - [ ] 提供足够的插槽扩展点
   - [ ] 样式可以通过 CSS 变量定制
   - [ ] 无障碍访问（a11y）支持
   - [ ] 错误边界处理
   - [ ] 资源正确清理

---

## Q38: Vue 项目如何进行工程化配置？请说明 Vite 配置和项目结构最佳实践。
- **难度**：★★★
- **知识点**：工程化/Vite/项目结构/构建配置
- **题型**：工程实践题

### 参考答案要点：

1. **推荐的 Vue3 项目结构**
   ```
   src/
   ├── assets/              # 静态资源（图片、字体、全局样式）
   │   ├── images/
   │   └── styles/
   │       ├── variables.scss
   │       ├── mixins.scss
   │       └── global.scss
   ├── components/          # 通用组件
   │   ├── common/          # 基础组件（Button、Input、Icon）
   │   └── business/        # 业务组件（UserCard、OrderTable）
   ├── composables/         # 组合式函数（Hooks）
   │   ├── useAuth.ts
   │   ├── useRequest.ts
   │   └── usePagination.ts
   ├── layouts/             # 布局组件
   │   ├── DefaultLayout.vue
   │   └── AuthLayout.vue
   ├── pages/               # 页面组件（路由级别）
   │   ├── home/
   │   └── about/
   ├── router/              # 路由配置
   │   ├── index.ts
   │   └── routes/
   ├── stores/              # Pinia 状态管理
   │   ├── index.ts
   │   ├── modules/
   │   │   ├── user.ts
   │   │   └── app.ts
   │   └── plugins/         # Pinia 插件
   ├── services/            # API 服务层
   │   ├── http.ts          # axios 封装
   │   ├── api/
   │   │   ├── user.ts
   │   │   └── product.ts
   │   └── types/           # API 类型定义
   ├── utils/               # 工具函数
   │   ├── format.ts
   │   ├── storage.ts
   │   └── validate.ts
   ├── types/               # 全局类型定义
   │   ├── env.d.ts
   │   └── api.d.ts
   ├── App.vue
   └── main.ts
   ```

2. **Vite 核心配置**
   ```javascript
   // vite.config.ts
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   import { resolve } from 'path'
   
   export default defineConfig({
     plugins: [
       vue(),
       // 其他插件...
     ],
     
     resolve: {
       alias: {
         '@': resolve(__dirname, 'src'),  // 路径别名
       },
       extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue']
     },
     
     css: {
       preprocessorOptions: {
         scss: {
           additionalData: `@use "@/styles/variables" as *;`,  // 全局 SCSS 变量
         }
       }
     },
     
     server: {
       port: 3000,
       open: true,
       proxy: {
         '/api': {
           target: 'http://localhost:8080',
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/api/, '')
         }
       }
     },
     
     build: {
       outDir: 'dist',
       assetsDir: 'assets',
       sourcemap: process.env.NODE_ENV === 'development',
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['vue', 'vue-router', 'pinia'],
             ui: ['element-plus']
           }
         }
       },
       chunkSizeWarningLimit: 1000  // KB
     },
     
     optimizeDeps: {
       include: ['vue', 'vue-router', 'pinia', 'axios']
     }
   })
   ```

3. **环境变量管理**
   ```bash
   # .env.base
   VITE_APP_TITLE=My App
   
   # .env.development  
   VITE_API_BASE_URL=http://localhost:8080/api
   
   # .env.production
   VITE_API_BASE_URL=https://api.example.com
   ```

4. **代码规范配置**
   ```javascript
   // eslint.config.js（ESLint Flat Config）
   import pluginVue from 'eslint-plugin-vite-plugin-vue'
   import tsParser from '@typescript-eslint/parser'
   
   export default [
     {
       files: ['**/*.{ts,tsx,vue}'],
       languageOptions: {
         parser: tsParser
       },
       plugins: {
         vue: pluginVue
       },
       rules: {
         'vue/multi-word-component-names': 'off',
         'vue/no-unused-vars': 'error'
       }
     }
   ]
   ```

5. **Git Hooks（Husky + lint-staged）**
   ```json
   // package.json
   {
     "lint-staged": {
       "*.{js,ts,vue}": ["eslint --fix", "prettier --write"],
       "*.{scss,css}": ["prettier --write"],
       "*.{md,json}": ["prettier --write"]
     }
   }
   ```

6. **CI/CDM 配置建议**
   - 单元测试（Vitest）
   - E2E 测试（Playwright/Cypress）
   - 构建检查
   - Lighthouse CI（性能审计）
   - 自动部署（GitHub Actions / GitLab CI）

---

## Q39: Vue3 + TypeScript 的集成有哪些注意事项？如何写出类型安全的 Vue 代码？
- **难度**：★★★
- **知识点**：TypeScript/类型安全/泛型/工具类型
- **题型**：综合实践题

### 参考答案要点：

1. **组件 Props 的类型定义**
   ```html
   <script setup lang="ts">
   // 方式一：运行时声明 + 类型断言
   const props = defineProps<{
     title: string
     count?: number
     items?: Item[]
     onUpdate?: (value: string) => void
   }>()
   
   // 方式二：类型接口 + withDefaults
   interface Props {
     title: string
     size?: 'sm' | 'md' | 'lg'
     disabled?: boolean
   }
   
   const props = withDefaults(defineProps<Props>(), {
     size: 'md',
     disabled: false
   })
   
   // 泛型组件（Vue3.3+）
   const props = defineProps<{
     data: T[]
     columns: ColumnDef<T>[]
   }>()
   </script>
   ```

2. **Emits 的类型定义**
   ```typescript
   // Vue3.3+ 推荐语法
   const emit = defineEmits<{
     change: [value: string]
     'update:modelValue': [value: number]
     click: [event: MouseEvent, id: string]
   }>()
   
   // 使用
   emit('change', 'newValue')  // 类型安全！
   ```

3. **Ref 和 Reactive 的类型**
   ```typescript
   import type { Ref, ComputedRef } from 'vue'
   
   // Ref 泛型
   const count: Ref<number> = ref(0)
   const user: Ref<User | null> = ref(null)
   
   // Reactive
   const form: FormState = reactive({
     username: '',
     password: ''
   })
   
   // Computed
   const doubleCount: ComputedRef<number> = computed(() => count.value * 2)
   ```

4. **Composable 的类型安全**
   ```typescript
   // composables/useFetch.ts
   interface UseFetchOptions<T> {
     immediate?: boolean
     onSuccess?: (data: T) => void
     onError?: (error: Error) => void
   }
   
   interface UseFetchReturn<T> {
     data: Ref<T | null>
     error: Ref<Error | null>
     loading: Ref<boolean>
     refresh: () => Promise<void>
   }
   
   export function useFetch<T>(
     url: string,
     options?: UseFetchOptions<T>
   ): UseFetchReturn<T> {
     // ...
   }
   
   // 使用时自动推断 T
   const { data, loading } = useFetch<User[]>('/api/users')
   // data 的类型自动推断为 Ref<User[] | null>
   ```

5. **Pinia Store 的类型定义**
   ```typescript
   // stores/user.ts
   interface UserState {
     user: User | null
     token: string
   }
   
   export const useUserStore = defineStore('user', () => {
     const state = reactive<UserState>({
       user: null,
       token: ''
     })
     
     function setUser(user: User) {
       state.user = user
     }
     
     function getToken(): string {
       return state.token
     }
     
     return { ...toRefs(state), setUser, getToken }
   })
   ```

6. **Vue Router 的类型**
   ```typescript
   // router/index.ts
   const router = createRouter({
     history: createWebHistory(),
     routes: [
       {
         path: '/user/:id',
         name: 'user',
         component: UserDetail,
         meta: { requiresAuth: true } as RouteMeta
       }
     ] as RouteRecordRaw[]
   })
   
   // 在组件中使用
   const route = useRoute()
   const userId: string = route.params.id  // 自动推断
   ```

7. **实用工具类型技巧**
   ```typescript
   // 从 Props 提取事件类型
   type ExtractEmits<T> = T extends (...args: infer A) any ? A : never
   
   // 让可选 Props 变为必需
   type RequiredProps<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
   
   // 组件实例类型
   type ComponentInstance<T> = InstanceType<typeof T>
   ```

8. **常见 TS 配置（tsconfig.json）**
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "ESNext",
       "moduleResolution": "bundler",
       "strict": true,
       "jsx": "preserve",
       "resolveJsonModule": true,
       "isolatedModules": true,
       "esModuleInterop": true,
       "lib": ["ES2020", "DOM", "DOM.Iterable"],
       "skipLibCheck": true,
       "noEmit": true,
       "paths": {
         "@/*": ["./src/*"]
       },
       "types": ["vite/client"]
     },
     "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
     "references": [{ "path": "./tsconfig.node.json" }]
   }
   ```

9. **类型安全 Checklist**
   - [ ] 所有 Props 都有明确的类型定义
   - [ ] Emits 使用类型字面量语法
   - [ ] Composable 使用泛型参数
   - [ ] API 请求/响应有类型定义
   - [ ] 避免使用 `as any`（必要时用 `unknown` + 类型守卫）
   - [ ] 启用 strict 模式

### 🔍 追问链
1. **defineProps 和 defineEmits 的返回值类型是怎么推断出来的？**
   → 方向：编译器宏、泛型语法 `<script setup lang="ts" generic="T">`、运行时不存在
2. **如何给 ref 定义复杂的泛型类型？Ref<T> 的使用场景？**
   → 方向：`ref<T>(initial)` 泛型约束、`Ref<T>` 类型导入、shallowRef vs Ref 区别
3. **组件 emit 事件的类型安全如何保证？**
   → 方向：defineEmits 的类型定义格式、事件参数的类型推导

---

## Q40: 请说明 Vue SSR（服务端渲染）的原理和 Nuxt.js 的基本概念。
- **难度**：★★★
- **知识点**：SSR/Nuxt.js/hydration/服务端渲染
- **题型**：综合应用题

### 参考答案要点：

1. **什么是 SSR**
   - 在服务器端执行 Vue 组件，生成完整的 HTML 字符串
   - 将 HTML 发送给浏览器（用户第一时间看到内容）
   - 浏览器"激活"（hydrate）HTML，使其变为可交互的应用

2. **SSR vs CSR vs SSG 对比**
   | 特性 | CSR（客户端渲染） | SSR（服务端渲染） | SSG（静态生成） |
   |------|-------------------|-------------------|-----------------|
   | **首屏速度** | 慢（需等待 JS 加载） | 快（直出 HTML） | 最快（CDN 缓存） |
   | **SEO** | 差 | 好 | 好 |
   | **服务器压力** | 无 | 高 | 无（构建时） |
   | **数据时效性** | 实时 | 实时 | 构建时确定 |
   | **适用场景** | SPA后台管理 | 内容站点/SEO需求 | 博客/文档/营销页 |

3. **Vue SSR 的工作流程**
   ```
   1. 用户请求页面
      ↓
   2. 服务器接收请求
      ↓
   3. 执行 Vue 组件（服务端）
      ├─ 执行 asyncData/fetch 获取数据
      ├─ 渲染组件为 HTML 字符串
      └─ 注入初始状态（window.__INITIAL_STATE__）
      ↓
   4. 返回完整 HTML 给浏览器
      ↓
   5. 浏览器显示 HTML（用户看到内容）
      ↓
   6. 加载 JS bundle
      ↓
   7. Hydration（注水/激活）
      ├─ Vue 接管已有的 DOM
      ├─ 绑定事件监听器
      └─ 应用变为可交互
   ```

4. **Hydration（注水）的过程**
   - 将服务端生成的静态 HTML"激活"为动态 Vue 应用
   - Vue 会比对服务端 DOM 和客户端 Virtual DOM
   - 匹配成功 → 复用 DOM，绑定事件
   - 匹配失败 → 警告并可能重新渲染（hydration mismatch）

   **常见 hydration 问题：**
   - 时间戳/随机数导致的服务端客户端不一致
   - 只有客户端可用的 API（localStorage、window）
   - 时区差异

   ```javascript
   // 解决方案：使用 onMounted（只在客户端执行）
   const now = ref('')
   onMounted(() => {
     now.value = new Date().toLocaleString()
   })
   
   // 或使用 <ClientOnly> 组件（Nuxt/VueUse）
   <ClientOnly>
     <HeavyClientComponent />
   </ClientOnly>
   ```

5. **Nuxt.js 核心概念**
   - **约定优于配置**：基于文件的路由、自动导入
   - **目录结构**：
     ```
     nuxt-app/
     ├── pages/          # 自动生成路由
     ├── components/     # 自动导入组件
     ├── composables/    # 自动导入组合函数
     ├── server/         # API 路由（Nitro）
     ├── middleware/      # 路由中间件
     ├── layouts/        # 布局
     ├── plugins/        # 插件
     ├── app.vue         # 根组件
     └── nuxt.config.ts  # 配置文件
     ```
   - **渲染模式**：Universal (SSR)、SPA、SSG（预渲染）
   - **数据获取**：`useFetch`、`useAsyncData`、`useLazyFetch`
   - **自动导入**：composables、components、utils 无需手动 import

6. **SSR 注意事项**
   - 避免在 `setup` 顶层使用 `document`/`window`/`localStorage`
   - 使用 `import.meta.client` / `import.meta.server` 做环境判断
   - 第三方库需要兼容 SSR（或使用 `<ClientOnly>`）
   - 生命周期：`serverPrefetch`（仅 SSR）、`onMounted`（仅客户端）

---

## Q41: 如何设计一个 Vue 插件？请说明插件的开发规范和最佳实践。
- **难度**：★★★
- **知识点**：插件开发/Plugin API/扩展机制
- **题型**：编程实践题

### 参考答案要点：

1. **Vue 插件的基本结构**
   ```typescript
   // my-plugin.ts
   import type { App } from 'vue'
   
   interface PluginOptions {
     theme?: string
     debug?: boolean
   }
   
   export const MyPlugin = {
     install(app: App, options?: PluginOptions) {
       // 1. 注册全局属性
       app.config.globalProperties.$myMethod = function() {
         // ...
       }
       
       // 2. 注册全局组件
       app.component('MyComponent', MyComponent)
       
       // 3. 注册全局指令
       app.directive('focus', {
         mounted(el) {
           el.focus()
         }
       })
       
       // 4. provide 注入
       app.provide('pluginOptions', options)
       
       // 5. 混入（Vue3 中较少使用）
       // app.mixin({ ... })
       
       // 6. 扩展全局方法（如 app.useRouter）
       // app.myGlobalMethod = () => {}
       
       if (options?.debug) {
         console.log('MyPlugin installed with options:', options)
       }
     }
   }
   ```

2. **使用插件**
   ```typescript
   // main.ts
   import { createApp } from 'vue'
   import MyPlugin from './plugins/my-plugin'
   
   const app = createApp(App)
   app.use(MyPlugin, { theme: 'dark', debug: true })
   ```

3. **插件设计的最佳实践**

   **① 类型安全**
   ```typescript
   // 扩展全局属性的类型
   declare module 'vue' {
     interface ComponentCustomProperties {
       $myMethod: () => void
       $myPlugin: typeof MyPlugin
     }
   }
   ```

   **② 可配置性**
   - 通过 install 的第二个参数接收配置
   - 提供合理的默认值
   - 支持渐进式配置

   **③ Tree-shake 友好**
   - 避免在插件入口引入所有功能
   - 按需注册组件/指令

   **④ 无副作用**
   - 不应在 install 外部修改全局状态
   - 提供 uninstall 方法（如果需要）

4. **实战案例：HTTP 请求插件**
   ```typescript
   // plugins/http.ts
   import axios from 'axios'
   import type { App } from 'vue'
   
   export const HttpPlugin = {
     install(app: App, options: { baseURL: string }) => {
       const instance = axios.create({
         baseURL: options.baseURL,
         timeout: 10000
       })
       
       // 请求拦截器
       instance.interceptors.request.use(config => {
         const token = localStorage.getItem('token')
         if (token) {
           config.headers.Authorization = `Bearer ${token}`
         }
         return config
       })
      
       // 响应拦截器
       instance.interceptors.response.use(
         response => response.data,
         error => {
           if (error.response?.status === 401) {
             // 跳转登录
           }
           return Promise.reject(error)
         }
       )
       
       // 注入到全局
       app.provide('$http', instance)
       app.config.globalProperties.$http = instance
     }
   }
   ```

5. **常见插件模式**
   - **UI 组件库**：Element Plus、Ant Design Vue
   - **状态管理**：Pinia、Vuex
   - **路由**：Vue Router
   - **i18n**：Vue I18n
   - **工具库**：VueUse、@vueuse/core

---

## Q42: Vue 中如何实现权限控制（路由权限 + 按钮权限）？
- **难度**：★★★
- **知识点**：权限控制/路由守卫/指令/安全
- **题型**：架构设计题

### 参考答案要点：

1. **整体架构设计**
   ```
   登录 → 获取 Token + 权限列表
     ↓
   存储 Token（Pinia/Pinia + persist）
     ↓
   路由守卫：验证 Token → 获取用户信息 → 动态添加路由
     ↓
   按钮权限：自定义指令 v-permission
     ↓
   接口权限：请求拦截器携带 Token
   ```

2. **路由权限实现**
   ```typescript
   // router/guards.ts
   import router from './index'
   import { useUserStore } from '@/stores/user'
   import { dynamicRoutes } from './dynamicRoutes'
   
   const whiteList = ['/login', '/register']  // 白名单
   
   router.beforeEach(async (to, from) => {
     const userStore = useUserStore()
     
     // 1. 有 Token
     if (userStore.token) {
       if (to.path === '/login') {
         return '/'  // 已登录，重定向首页
       }
       
       // 2. 是否已获取用户信息
       if (!userStore.userInfo) {
         try {
           await userStore.getUserInfo()  // 获取用户信息和权限
           
           // 3. 动态添加路由
           const accessRoutes = filterRoutes(dynamicRoutes, userStore.roles)
           accessRoutes.forEach(route => router.addRoute(route))
           
           // 4. 重新导航（确保动态路由已添加）
           return { ...to, replace: true }
         } catch (error) {
           // Token 失效，清除并跳转登录
           userStore.logout()
           return `/login?redirect=${to.path}`
         }
       }
       
       return true
     }
     
     // 3. 无 Token
     if (whiteList.includes(to.path)) {
       return true
     }
     
     return `/login?redirect=${to.path}`
   })
   ```

3. **动态路由生成**
   ```typescript
   // router/dynamicRoutes.ts
   export const dynamicRoutes: RouteRecordRaw[] = [
     {
       path: '/system',
       component: Layout,
       meta: { roles: ['admin'] },
       children: [
         {
           path: 'user',
           component: () => import('@/pages/system/UserManage.vue'),
           meta: { title: '用户管理', roles: ['admin'] }
         },
         {
           path: 'role',
           component: () => import('@/pages/system/RoleManage.vue'),
           meta: { title: '角色管理', roles: ['admin'] }
         }
       ]
     }
   ]
   
   // 根据角色过滤路由
   function filterRoutes(routes: RouteRecordRaw[], roles: string[]) {
     return routes.filter(route => {
       if (route.meta?.roles) {
         return roles.some(role => (route.meta.roles as string[]).includes(role))
       }
       if (route.children) {
         route.children = filterRoutes(route.children, roles)
       }
       return true
     })
   }
   ```

4. **按钮权限（自定义指令）**
   ```typescript
   // directives/permission.ts
   import type { Directive } from 'vue'
   
   const permissionDirective: Directive = {
     mounted(el, binding) => {
       const { value } = binding
       const permissions = useUserStore().permissions  // ['user:create', 'user:edit', ...]
       
       if (value && Array.isArray(value)) {
         const hasPermission = permissions.some(permission =>
           value.includes(permission)
         )
         
         if (!hasPermission) {
           // 移除元素
           el.parentNode?.removeChild(el)
         }
       } else {
         throw new Error('need permissions! Like v-permission="[\'admin\',\'editor\']"')
       }
     }
   }
   
   export default permissionDirective
   ```

   ```html
   <!-- 使用 -->
   <el-button v-permission="['user:create']">新建用户</el-button>
   <el-button v-permission="['user:edit']">编辑</el-button>
   <el-button v-permission="['user:delete']">删除</el-button>
   ```

5. **请求权限（Axios 拦截器）**
   ```typescript
   // services/http.ts
   service.interceptors.request.use(config => {
     const token = userStore.token
     if (token) {
       config.headers['Authorization'] = `Bearer ${token}`
     }
     return config
   })
   
   service.interceptors.response.use(
     response => response,
     error => {
       if (error.response?.status === 401) {
         Modal.confirm({
           title: '提示',
           content: '登录已过期，请重新登录',
           onOk: () => userStore.logout()
         })
       }
       if (error.response?.status === 403) {
         Message.error('没有权限访问')
       }
       return Promise.reject(error)
     }
   )
   ```

6. **菜单权限**
   - 根据权限过滤侧边栏菜单
   - 路由 meta 中定义 hidden、icon 等信息
   - 递归生成菜单树

7. **安全注意事项**
   - ⚠️ 前端权限只是"UI 级别"的保护
   - ⚠️ 真正的安全必须在后端实现（接口鉴权）
   - ⚠️ Token 应设置过期时间并支持刷新
   - ⚠️ 敏感操作需要二次验证

---

## Q43: Vue 项目中如何进行状态管理的设计？请说明什么情况下应该使用 Pinia。
- **难度**：★★★
- **知识点**：状态管理/架构设计/Pinia/数据流
- **题型**：架构设计题

### 参考答案要点：

1. **什么时候需要状态管理？**
   - 多个不相关的组件需要共享同一份数据
   - 组件之间隔了多层，props 传递变得复杂
   - 需要持久化某些状态（localStorage + 状态同步）
   - 需要对状态变更进行追踪和调试

2. **什么时候不需要状态管理？**
   - 简单的父子组件通信（props/emit 足够）
   - 状态只在局部使用（组件内 ref/reactive）
   - 项目规模小、组件数量少
   - "过早优化是万恶之源"

3. **Pinia Store 设计原则**
   
   **① 按领域划分 Store**
   ```
   stores/
   ├── user.ts        # 用户信息、Token、权限
   ├── app.ts         # 应用全局状态（主题、语言、侧边栏）
   ├── cart.ts        # 购物车（电商场景）
   └── tagsView.ts    # 标签页导航
   ```
   
   **② Store 的粒度**
   - 太粗：单个 store 包含所有状态（混乱、难维护）
   - 太细：每个字段一个 store（过度设计）
   - 合理：按业务模块/功能域划分

4. **Store 设计模式**

   **Setup Store 风格（推荐）**
   ```typescript
   // stores/cart.ts
   export const useCartStore = defineStore('cart', () => {
     // State
     const items = ref<CartItem[]>([])
     const couponCode = ref<string | null>(null)
     
     // Getters
     const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
     const totalPrice = computed(() => {
       const subtotal = items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
       // 应用折扣...
       return subtotal
     })
     
     // Actions
     function addItem(product: Product) {
       const existing = items.value.find(item => item.id === product.id)
       if (existing) {
         existing.quantity++
       } else {
         items.value.push({ ...product, quantity: 1 })
       }
     }
     
     function removeItem(productId: string) {
       const index = items.value.findIndex(item => item.id === productId)
       if (index > -1) {
         items.value.splice(index, 1)
       }
     }
     
     function clearCart() {
       items.value = []
       couponCode.value = null
     }
     
     // Persistence
     function loadFromStorage() {
       const saved = localStorage.getItem('cart')
       if (saved) {
         items.value = JSON.parse(saved)
       }
     }
     
     function saveToStorage() {
       localStorage.setItem('cart', JSON.stringify(items.value))
     }
     
     // 监听变化自动保存
     watch(items, saveToStorage, { deep: true })
     
     // 初始化
     loadFromStorage()
     
     return {
       // State (通过 toRefs 保持响应式解构)
       ...toRefs({ items, couponCode }),
       // Getters
       itemCount,
       totalPrice,
       // Actions
       addItem,
       removeItem,
       clearCart
     }
   })
   ```

5. **Store 之间的通信**
   ```typescript
   // Store A 可以直接使用 Store B
   export const useOrderStore = defineStore('order', () => {
     const cartStore = useCartStore()
     
     const orderItems = computed(() => cartStore.items)
     
     async function placeOrder() {
       // 使用 cartStore 的数据创建订单
       await api.createOrder({
         items: cartStore.items,
         total: cartStore.totalPrice
       })
       
       // 订单成功后清空购物车
       cartStore.clearCart()
     }
     
     return { orderItems, placeOrder }
   })
   ```

6. **Pinia 插件（扩展功能）**
   ```typescript
   // plugins/piniaPersist.ts
   import type { PiniaPluginContext } from 'pinia'
   
   export function piniaPersistPlugin({ store }: PiniaPluginContext) {
     // 从 localStorage 恢复状态
     const saved = localStorage.getItem(`pinia-${store.$id}`)
     if (saved) {
       store.$patch(JSON.parse(saved))
     }
     
     // 状态变化时自动保存
     store.$subscribe((mutation, state) => {
       localStorage.setItem(`pinia-${store.$id}`, JSON.stringify(state))
     })
   }
   
   // 使用
   const pinia = createPinia()
   pinia.use(piniaPersistPlugin)
   ```

7. **状态管理最佳实践**
   - [ ] Store 只做状态管理，不含业务逻辑（业务逻辑放 Composable）
   - [ ] Getter 只做计算，不要有副作用
   - [ ] Action 中处理异步和副作用
   - [ ] 避免在 Store 中直接操作 DOM
   - [ ] 使用 DevTools 调试状态变化
   - [ ] 敏感信息（Token）考虑加密存储

---

## Q44: Vue 项目中如何进行错误处理和异常捕获？
- **难度**：★★★
- **知识点**：错误处理/errorCaptured/异常捕获/日志
- **题型**：工程实践题

### 参考答案要点：

1. **Vue 错误处理的层次**

   ```
   全局错误处理（app.config.errorHandler）
     ↓
   onErrorCaptured（组件级错误边界）
     ↓
   Promise rejection（window.onerror / unhandledrejection）
     ↓
   try/catch（代码块级）
     ↓
   Axios 拦截器（接口错误）
   ```

2. **全局错误处理器**
   ```typescript
   // main.ts
   app.config.errorHandler = (err, vm, info) => {
     // err: 错误对象
     // vm: 报错的组件实例
     // info: Vue 特定的错误来源信息（如生命周期钩子）
     
     // 上报错误到监控系统
     reportError({
       error: err,
       component: vm?.$options?.name,
       info,
       url: window.location.href,
       userAgent: navigator.userAgent
     })
     
     // 开发环境打印详细信息
     if (import.meta.env.DEV) {
       console.error('[Global Error]', err, info)
     }
   }
   
   // 全局 warn 处理
   app.config.warnHandler = (msg, vm, trace) => {
     console.warn('[Global Warn]', msg, trace)
   }
   ```

3. **错误边界组件（Error Boundary）**
   ```html
   <!-- components/ErrorBoundary.vue -->
   <script setup lang="ts">
   import { ref, onErrorCaptured } from 'vue'
   
   interface Props {
     fallback?: Component
     onError?: (error: Error) => void
   }
   
   const props = withDefaults(defineProps<Props>(), {})
   
   const hasError = ref(false)
   const error = ref<Error | null>(null)
   
   onErrorCaptured((err, instance, info) => {
     hasError.value = true
     error.value = err
     props.onError?.(err)
     
     // 返回 false 阻止错误继续向上传播
     return false
   })
   
   function retry() {
     hasError.value = false
     error.value = null
   }
   </script>
   
   <template>
     <div v-if="hasError" class="error-boundary">
       <slot name="error" :error="error" :retry="retry">
         <div class="error-content">
           <p>出现了一些问题</p>
           <button @click="retry">重试</button>
         </div>
       </slot>
     </div>
     <slot v-else />
   </template>
   ```

   ```html
   <!-- 使用 -->
   <ErrorBoundary :on-error="handleError">
     <RiskyComponent />
   </ErrorBoundary>
   ```

4. **异步错误处理**
   ```typescript
   // 1. 全局未捕获的 Promise rejection
   window.addEventListener('unhandledrejection', (event) => {
     console.error('Unhandled promise rejection:', event.reason)
     event.preventDefault()  // 防止默认的 console 输出
     reportError({ error: event.reason, type: 'unhandledrejection' })
   })
   
   // 2. async/await 的 try/catch
   async function fetchData() {
     try {
       const data = await api.getData()
       return data
     } catch (error) {
       // 分类处理错误
       if (error instanceof NetworkError) {
         showNetworkErrorToast()
       } else if (error instanceof AuthError) {
         redirectToLogin()
       } else {
         throw error  // 重新抛出，交给上层处理
       }
     }
   }
   
   // 3. Composable 中的错误处理
   export function useAsync<T>(asyncFn: () => Promise<T>) {
     const data = ref<T | null>(null)
     const error = ref<Error | null>(null)
     const loading = ref(false)
     
     async function execute() {
       loading.value = true
       error.value = null
       try {
         data.value = await asyncFn()
       } catch (e) {
         error.value = e as Error
       } finally {
         loading.value = false
       }
     }
     
     return { data, error, loading, execute }
   }
   ```

5. **接口错误处理（Axios 拦截器）**
   ```typescript
   // services/http.ts
   service.interceptors.response.use(
     response => {
       // 业务错误码处理
       const { code, message } = response.data
       if (code !== 200) {
         showToast(message || '请求失败')
         return Promise.reject(new BusinessError(code, message))
       }
       return response.data
     },
     error => {
       // HTTP 错误分类
       if (error.response) {
         const { status } = error.response
         switch (status) {
           case 400: showError('请求参数错误'); break
           case 401: handleUnauthorized(); break
           case 403: showError('无权限'); break
           case 404: showError('资源不存在'); break
           case 500: showError('服务器错误'); break
           default: showError(`请求失败(${status})`)
         }
       } else if (error.request) {
         showError('网络连接失败')
       } else {
         showError('请求配置错误')
       }
       return Promise.reject(error)
     }
   )
   ```

6. **错误上报方案**
   ```typescript
   // utils/report.ts
   interface ErrorReport {
     error: Error | string
     type: 'js' | 'promise' | 'network' | 'business'
     extra?: Record<string, any>
   }
   
   export function reportError(report: ErrorReport) {
     // 开发环境不上报
     if (import.meta.env.DEV) return
     
     // 使用 sendBeacon（页面关闭也能发送）
     const payload = JSON.stringify({
       ...report,
       timestamp: Date.now(),
       url: location.href,
       userAgent: navigator.userAgent,
       userId: getCurrentUserId()
     })
     
     navigator.sendBeacon('/api/errors', payload)
   }
   ```

7. **错误处理最佳实践**
   - [ ] 全局 error handler 作为兜底
   - [ ] 关键组件使用 ErrorBoundary 包裹
   - [ ] 异步操作统一用 Composable 封装
   - [ ] 接口错误统一拦截和处理
   - [ ] 错误信息对用户友好（不暴露技术细节）
   - [ ] 生产环境错误上报到监控系统

---

## Q45: 请设计一个 Vue 微前端架构方案。
- **难度**：★★★
- **知识点**：微前端/qiankun/wujie/架构设计
- **题型**：架构设计题

### 参考答案要点：

1. **微前端的概念和价值**
   - **定义**：将前端应用拆分为多个独立的、可独立开发和部署的子应用
   - **价值**：
     - 技术栈无关（不同团队可以使用不同框架）
     - 独立开发/独立部署
     - 增量升级（逐步重构老旧系统）
     - 隔离故障（一个子系统崩溃不影响整体）

2. **主流微前端方案对比**

| 方案 | 原理 | 优势 | 劣势 | 适用场景 |
|------|------|------|------|----------|
| **qiankun** | 基于 single-spa + sandbox | 成熟稳定、生态完善、文档齐全 | 样式隔离有坑、接入成本中等 | 企业级应用、存量系统改造 |
| **wujie** | 基于 WebComponent + iframe | 原生隔离、接入简单、支持预加载 | 依赖浏览器 API、IE 不兼容 | 新项目、快速集成 |
| **micro-app** | 基于 WebComponent | 轻量级、配置简单、支持 keep-alive | 社区较小、部分场景兼容性问题 | 中小型项目 |
| **Module Federation** | Webpack5 原生支持 | 无需额外框架、共享依赖 | 版本要求高、配置复杂 | 现代化工程体系 |

3. **基于 qiankun 的 Vue 微前端架构设计**

```typescript
// 主应用 - main/src/micro/index.ts
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'

// 子应用配置
const microApps = [
  {
    name: 'vue3-app',
    entry: '//localhost:8081',
    container: '#subapp-viewport',
    activeRule: '/vue3-app',
    props: { 
      getToken: () => localStorage.getItem('token'),
      globalState: {} 
    }
  },
  {
    name: 'react-app',
    entry: '//localhost:3000',
    container: '#subapp-viewport',
    activeRule: '/react-app'
  }
]

// 注册子应用
registerMicroApps(microApps, {
  beforeLoad: [
    async app => console.log('before load', app.name)
  ],
  beforeMount: [
    async app => console.log('before mount', app.name)
  ],
  afterUnmount: [
    async app => console.log('after unmount', app.name)
  ]
})

// 启动 qiankun
start({ prefetch: true })
```

4. **子应用（Vue3）接入配置**

```typescript
// 子应用 - src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

let app: any = null

// 渲染函数
function render(props: any = {}) {
  const { container } = props
  app = createApp(App)
  app.use(router)
  
  // 挂载到主应用容器或自身容器
  app.mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时直接渲染
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// qiankun 生命周期
export async function bootstrap() {
  console.log('vue3 app bootstraped')
}

export async function mount(props: any) {
  console.log('vue3 app mount, props from main:', props)
  render(props)
}

export async function unmount() {
  app.unmount()
  app = null
}
```

```javascript
// vite.config.ts - 子应用打包配置
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/vue3-app/',  // 与主应用 activeRule 对应
  server: {
    port: 8081,
    cors: true,
    origin: 'http://localhost:8081'
  },
  build: {
    lib: {
      entry: './src/main.ts',
      formats: ['umd'],
      fileName: () => '[name].[hash].js'
    }
  },
  plugins: [
    vue(),
    // 使用 vite-plugin-qiankun 处理生命周期导出
  ]
})
```

5. **样式隔离方案**

```typescript
// 方案1: qiankun strictStyleIsolation (Shadow DOM)
start({
  sandbox: {
    strictStyleIsolation: true,  // Shadow DOM 隔离
    experimentalStyleIsolation: false
  }
})

// 方案2: scoped + CSS Modules (推荐)
// 子应用组件中使用 scoped 或 CSS Modules
<style scoped>
.app-container { /* ... */ }
</style>

// 方案3: 统一前缀约定
// 各子应用统一添加独特的前缀避免冲突
// vue3-app: .v3-xxx
// react-app: .r-xxx

// 方案4: PostCSS 自动添加命名空间
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-prefix-selector')({
      prefix: '.vue3-subapp',
      transform(prefix, selector) {
        return `${prefix} ${selector}`
      }
    })
  ]
}
```

6. **通信机制**

```typescript
// ========== 全局状态通信 (InitGlobalState) ==========
// 主应用
import { initGlobalState } from 'qiankun'
const actions = initGlobalState({
  user: null,
  token: '',
  theme: 'light'
})

// 监听变化
actions.onGlobalStateChange((state, prev) => {
  console.log('main state change:', state)
})

// 子应用接收
export function mount(props) {
  props.onGlobalStateChange((state) => {
    console.log('sub state:', state.user)
  })
  
  // 子应用修改全局状态
  props.setGlobalState({ theme: 'dark' })
}

// ========== 自定义事件通信 (EventBus) ==========
// utils/eventBus.ts
class MicroEventBus {
  private events: Map<string, Function[]> = new Map()
  
  on(event: string, callback: Function) {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(callback)
  }
  
  emit(event: string, data?: any) {
    const callbacks = this.events.get(event) || []
    callbacks.forEach(cb => cb(data))
  }
  
  off(event: string, callback?: Function) {
    if (!callback) {
      this.events.delete(event)
    } else {
      const callbacks = this.events.get(event) || []
      this.events.set(event, callbacks.filter(cb => cb !== callback))
    }
  }
}

export const microEventBus = new MicroEventBus()

// ========== URL 参数通信 ==========
// 路由跳转时携带参数
router.push('/vue3-app?userId=123&from=main')
```

7. **路由协同方案**

```typescript
// 主应用路由配置
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      // 子应用路由 - 使用通配符或重定向
      {
        path: '/vue3-app/*',
        component: () => import('./views/MicroContainer.vue')
      },
      {
        path: '/react-app/*',
        component: () => import('./views/MicroContainer.vue')
      }
    ]
  }
]

// MicroContainer.vue
<template>
  <div id="subapp-viewport" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  // qiankun 会根据 activeRule 自动匹配并加载子应用
})
</script>
```

8. **实施步骤与最佳实践**

**阶段一：基础设施搭建**
- [ ] 搭建主应用基座（Vue3 + Vue Router + qiankun）
- [ ] 配置开发环境代理（解决跨域）
- [ ] 建立统一的 UI 组件库和设计规范
- [ ] 配置 Git 多仓库管理策略

**阶段二：子应用拆分**
- [ ] 按业务域拆分子应用（用户中心/订单/商品/营销...）
- [ ] 每个子应用独立配置构建和部署流水线
- [ ] 实现公共依赖提取和共享
- [ ] 建立子应用脚手架模板

**阶段三：治理与优化**
- [ ] 建立应用监控和错误上报机制
- [ ] 实现子应用的按需加载和预加载策略
- [ ] 统一登录鉴权和权限控制
- [ ] 性能优化（资源缓存、代码分割）

**注意事项**
- ⚠️ 避免 `window` / `document` 直接操作，使用 `props.container` 获取容器
- ⚠️ 子应用资源必须支持跨域（CORS）
- ⚠️ 注意版本冲突（Vue/Element-UI 等公共库版本一致）
- ⚠️ 开发环境配置代理解决跨域问题
- ⚠️ 生产环境考虑 CDN 加速和资源缓存策略

---

## 📚 附录：知识体系速查表

### 核心概念与基础
| 知识点 | 对应题目 |
|--------|----------|
| 模板语法与指令 | Q01 |
| v-if vs v-show 区别 | Q02 |
| key 的作用与原理 | Q03 |
| Vue 指令分类 | Q04 |
| v-model 双向绑定原理 | Q05 |
| data 为什么是函数 | Q06 |
| 生命周期钩子 | Q07 |
| computed vs watch | Q08 |
| 组件通信方式汇总 | Q09 |
| 插槽（默认/具名/作用域） | Q10 |
| Vue3 过滤器替代方案 | Q11 |
| scoped 样式隔离原理 | Q12 |
| 单向数据流原则 | Q13 |
| 动态组件与异步组件 | Q14 |
| mixins 替代方案 | Q15 |

### 响应式系统
| 知识点 | 对应题目 |
|--------|----------|
| Vue2 vs Vue3 响应式区别 | Q16 |
| Composition API 优势 | Q17 |
| ref vs reactive 选择 | Q18 |
| 依赖收集与派发更新原理 | Q28 |
| reactive 源码实现 | Q34 |
| computed 缓存机制 | Q35 |
| v-memo 指令 | Q29 |

### 虚拟 DOM 与编译
| 知识点 | 对应题目 |
|--------|----------|
| 虚拟 DOM 概念与作用 | Q19 |
| diff 算法详解 | Q20 |
| 编译原理（Parse → Transform → Generate） | Q32 |
| 静态提升 / PatchFlags / Block Tree | Q32 |

### 异步机制
| 知识点 | 对应题目 |
|--------|----------|
| nextTick 原理与实现 | Q31 |
| 异步更新队列 Scheduler | Q33 |

### 路由与状态管理
| 知识点 | 对应题目 |
|--------|----------|
| Vue Router hash/history 模式 | Q21 |
| 导航守卫执行顺序 | Q22 |
| Pinia vs Vuex 对比 | Q23 |
| keep-alive 原理与 LRU | Q24 |
| Pinia 状态管理设计 | Q43 |

### Vue3 新特性
| 知识点 | 对应题目 |
|--------|----------|
| Teleport 传送门 | Q25 |
| Suspense 异步组件 | Q26 |
| Fragment 片段 | Q27 |

### 工程化与性能
| 知识点 | 对应题目 |
|--------|----------|
| 自定义 Hook 设计 | Q30 |
| 性能优化手段汇总 | Q36 |
| 高质量组件设计原则 | Q37 |
| Vite 工程化配置 | Q38 |
| TypeScript 与 Vue3 集成 | Q39 |
| SSR 与 Nuxt.js | Q40 |
| Vue 插件设计规范 | Q41 |
| 权限控制架构方案 | Q42 |
| 错误处理与异常捕获 | Q44 |
| 微前端架构方案 | Q45 |

---

> **📖 文档说明**：
> - 本题库共 **45 题**，覆盖 Vue2/Vue3 核心知识点
> - 基础层（★☆☆）15 题：适合初中级开发者快速复习核心概念
> - 进阶层（★★☆）15 题：深入理解原理和最佳实践
> - 专家层（★★★）15 题：源码级解析与架构设计能力
> - 建议结合官方文档和源码学习，面试前按知识体系速查表查漏补缺
> 
> **💡 学习建议**：
> 1. 先完成基础层全部题目，建立完整知识框架
> 2. 进阶层重点理解"为什么"，而不仅仅是"怎么做"
> 3. 专家层尝试手写简化版实现（如 reactive、diff 算法）
> 4. 结合实际项目经验准备案例，面试时更有说服力

---

*最后更新时间：2026 年 6 月*