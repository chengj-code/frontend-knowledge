# Vue.js 基础知识点指南

> **版本**：Vue 3.x | **更新日期**：2026-06-14  
> 本指南系统化整理 Vue.js 核心知识，适合入门学习和日常查阅。

---

## 目录

- [第1章：Vue 概述](#第1章vue-概述)
- [第2章：模板语法](#第2章模板语法)
- [第3章：响应式系统](#第3章响应式系统)
- [第4章：Composition API](#第4章composition-api)
- [第5章：组件化基础](#第5章组件化基础)
- [第6章：路由 Vue Router](#第6章路由-vue-router)
- [第7章：状态管理 Pinia](#第7章状态管理-pinia)
- [第8章：内置指令与特殊属性](#第8章内置指令与特殊属性)
- [第9章：过渡与动画](#第9章过渡与动画)
- [第10章：Vue 3 新特性](#第10章vue-3-新特性)
- [第11章：性能优化](#第11章性能优化)
- [第12章：工程化实践](#第12章工程化实践)
- [第13章：最佳实践与常见陷阱](#第13章最佳实践与常见陷阱)

---

## 第1章：Vue 概述

### 1.1 什么是 Vue.js

Vue.js 是一款用于构建用户界面的**渐进式 JavaScript 框架**。核心库只关注视图层，易于上手，便于与第三方库或既有项目整合。

```javascript
// Vue 的核心理念：声明式渲染
const app = Vue.createApp({
  data() {
    return { message: 'Hello Vue!' }
  },
  template: `<div>{{ message }}</div>`
})
app.mount('#app')
```

### 1.2 核心特性

| 特性 | 说明 |
|------|------|
| **声明式渲染** | 使用模板语法声明式地将数据渲染进 DOM |
| **响应式系统** | 自动追踪依赖，数据变化时自动更新视图 |
| **组件化系统** | 通过小型、独立、可复用的组件构建大型应用 |
| **虚拟 DOM** | 在内存中维护 DOM 树的 JavaScript 表示，提高渲染效率 |
| **单文件组件 (SFC)** | 将模板、逻辑、样式封装在 .vue 文件中 |
| **渐进式框架** | 可以作为库使用，也可以作为完整框架 |

### 1.3 版本演进：Vue 2 vs Vue 3

#### 主要区别对比

```javascript
// ====== Vue 2 Options API ======
export default {
  data() {
    return {
      count: 0,
      user: null
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  watch: {
    count(newVal) {
      console.log('count 变化了:', newVal)
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('组件已挂载')
  }
}

// ====== Vue 3 Composition API ======
import { ref, computed, watch, onMounted } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    const user = ref(null)

    // 计算属性
    const doubleCount = computed(() => count.value * 2)

    // 监听器
    watch(count, (newVal) => {
      console.log('count 变化了:', newVal)
    })

    // 方法
    const increment = () => count.value++

    // 生命周期
    onMounted(() => {
      console.log('组件已挂载')
    })

    // 返回给模板使用
    return { count, doubleCount, increment, user }
  }
}
```

#### Vue 3 核心改进

1. **性能提升**：虚拟 DOM 重写，编译时优化，体积更小（Tree-shaking）
2. **Composition API**：更好的代码组织和逻辑复用
3. **TypeScript 支持**：更好的类型推导和 IDE 支持
4. **响应式系统升级**：基于 Proxy 实现，支持更多数据类型
5. **Fragments**：组件可以有多个根节点
6. **Teleport**：将组件渲染到 DOM 的任意位置
7. **Suspense**：异步组件加载时的占位符

### 1.4 安装方式

#### 方式一：CDN 引入（适合快速原型开发）

```html
<!-- 开发版本（包含完整的警告和调试模式） -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- 生产版本（压缩过，删除了警告） -->
<script src="https://unpkg.com/vue@3/dist/vue.prod.js"></script>
```

#### 方式二：NPM 安装（推荐用于生产项目）

```bash
# 创建 Vite + Vue 项目（推荐）
npm create vue@latest

# 或手动安装
npm install vue@next
```

```javascript
// main.js - 应用入口文件
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

#### 方式三：Vue CLI（传统方式）

```bash
# 全局安装 Vue CLI
npm install -g @vue/cli

# 创建项目
vue create my-project
```

---

## 第2章：模板语法

### 2.1 插值表达式

#### 文本插值

```html
<template>
  <div>
    <!-- 基础文本插值 -->
    <p>消息：{{ message }}</p>

    <!-- 支持表达式 -->
    <p>计算结果：{{ number + 1 }}</p>
    <p>三元运算：{{ ok ? 'YES' : 'NO' }}</p>
    
    <!-- 调用方法 -->
    <p>反转文本：{{ message.split('').reverse().join('') }}</p>
    
    <!-- ❌ 错误示例：不能是语句或流控制 -->
    <!-- {{ var a = 1 }}        // 赋值语句无效 -->
    <!-- {{ if (ok) {} }}       // 流控制无效 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
const message = ref('Hello Vue!')
const number = ref(10)
const ok = ref(true)
</script>
```

#### 原始 HTML（v-html）

```html
<template>
  <!-- 双大括号会将数据解释为纯文本 -->
  <div>{{ rawHtml }}</div>
  <!-- 输出：<span style="color:red">这是红色文字</span> -->

  <!-- v-html 输出真正的 HTML -->
  <div v-html="rawHtml"></div>
  <!-- 输出：这是红色文字（红色样式生效）-->
</template>

<script setup>
import { ref } from 'vue'
// ⚠️ 安全警告：动态渲染任意 HTML 容易导致 XSS 攻击
// 只对可信内容使用 v-html，绝不要对用户提供的内容使用
const rawHtml = ref('<span style="color:red">这是红色文字</span>')
</script>
```

### 2.2 属性绑定 v-bind

```html
<template>
  <div>
    <!-- 动态绑定属性（简写 :） -->
    <img :src="imageUrl" :alt="imageAlt" />

    <!-- 绑定布尔属性 -->
    <button :disabled="isButtonDisabled">按钮</button>

    <!-- 动态绑定多个值 -->
    <div v-bind="objectOfAttrs">多个属性</div>

    <!-- 绑定 class（对象语法） -->
    <div 
      class="static"
      :class="{ active: isActive, 'text-danger': hasError }"
    >
      对象语法绑定 class
    </div>

    <!-- 绑定 class（数组语法） -->
    <div :class="[activeClass, errorClass]">
      数组语法绑定 class
    </div>

    <!-- 绑定 style（对象语法） -->
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">
      行内样式绑定
    </div>

    <!-- 绑定 style（数组语法） -->
    <div :style="[baseStyles, overridingStyles]">
      多个样式对象
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const imageUrl = ref('https://example.com/image.jpg')
const imageAlt = ref('示例图片')
const isButtonDisabled = ref(false)

const objectOfAttrs = reactive({
  id: 'container',
  class: 'wrapper'
})

const isActive = ref(true)
const hasError = ref(false)
const activeClass = ref('active')
const errorClass = ref('text-danger')

const activeColor = ref('red')
const fontSize = ref(14)

const baseStyles = reactive({ color: 'blue' })
const overridingStyles = reactive({ fontSize: '16px' })
</script>
```

### 2.3 条件渲染

#### v-if / v-else-if / v-else

```html
<template>
  <div>
    <!-- 条件渲染：真正地条件渲染元素 -->
    <p v-if="type === 'A'">A</p>
    <p v-else-if="type === 'B'">B</p>
    <p v-else-if="type === 'C'">C</p>
    <p v-else">不是 A/B/C</p>

    <!-- v-if 在 <template> 上使用（渲染多个元素） -->
    <template v-if="ok">
      <h1>标题</h1>
      <p>段落 1</p>
      <p>段落 2</p>
    </template>

    <!-- 用 key 管理可复用元素 -->
    <template v-if="loginType === 'username'">
      <label>用户名</label>
      <input placeholder="输入用户名" key="username-input" />
    </template>
    <template v-else>
      <label>邮箱</label>
      <input placeholder="输入邮箱" key="email-input" />
    </template>
    <!-- 加了 key 后，切换时不会复用 input，会重新渲染 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
const type = ref('A')
const ok = ref(true)
const loginType = ref('username')
</script>
```

#### v-show

```html
<template>
  <div>
    <!-- v-show 只是切换 CSS display 属性 -->
    <p v-show="isVisible">你好！</p>
    
    <!-- 不支持 <template> 元素 -->
    <!-- 不支持 v-else -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isVisible = ref(true)
</script>
```

#### v-if vs v-show 区别

| 特性 | v-if | v-show |
|------|------|--------|
| **DOM 表现** | 条件为 false 时完全移除元素 | 始终保留 DOM，仅切换 display:none |
| **初始渲染开销** | 较低（条件 false 时不渲染） | 较高（始终渲染） |
| **切换开销** | 较高（需要销毁/重建） | 较低（仅 CSS 切换） |
| **适用场景** | 运行时条件很少改变 | 需要频繁切换显示/隐藏 |

### 2.4 列表渲染 v-for

```html
<template>
  <div>
    <!-- 基本用法 -->
    <li v-for="item in items" :key="item.id">
      {{ item.message }}
    </li>

    <!-- 带索引 -->
    <li v-for="(item, index) in items" :key="index">
      {{ index }} - {{ item.message }}
    </li>

    <!-- 遍历对象 -->
    <li v-for="(value, key) in object" :key="key">
      {{ key }}: {{ value }}
    </li>

    <!-- 遍历对象（带索引） -->
    <li v-for="(value, key, index) in object" :key="key">
      {{ index }}. {{ key }}: {{ value }}
    </li>

    <!-- 遍历数字 -->
    <span v-for="n in 10" :key="n">{{ n }} </span>

    <!-- 在 <template> 上使用 v-for（渲染多个元素） -->
    <ul>
      <template v-for="item in items" :key="item.id">
        <li>{{ item.msg }}</li>
        <li class="divider">分割线</li>
      </template>
    </ul>

    <!-- v-for 与 v-if 同时使用 -->
    <!-- ⚠️ 注意：v-if 优先级高于 v-for，不推荐同时使用 -->
    <!-- 推荐做法：先用计算属性过滤，再用 v-for 渲染 -->
    <li v-for="user in activeUsers" :key="user.id">
      {{ user.name }}
    </li>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { id: 1, message: 'Foo' },
  { id: 2, message: 'Bar' }
])

const object = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})

// 推荐做法：使用计算属性过滤
const users = ref([
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true }
])

const activeUsers = computed(() => users.value.filter(u => u.active))
</script>
```

#### 为什么推荐使用 key？

```javascript
// key 的作用：帮助 Vue 识别节点，提高 diff 效率
// ✅ 推荐：使用唯一且稳定的 ID 作为 key
<li v-for="item in items" :key="item.id">

// ❌ 不推荐：使用 index 作为 key（列表增删时会导致问题）
<li v-for="(item, index) in items" :key="index">

// ❌ 不推荐：使用随机数（每次渲染都不同，失去意义）
<li v-for="item in items" :key="Math.random()">
```

### 2.5 事件处理 v-on

```html
<template>
  <div>
    <!-- 基本用法（简写 @） -->
    <button @click="count++">加 1</button>
    <button @click="greet">问候</button>

    <!-- 内联处理器中的方法调用 -->
    <button @click("say('hi')">说 hi</button>
    <button @click="warn('表单不能提交', $event)">提交</button>

    <!-- 事件修饰符 -->
    <!-- .stop - 阻止事件冒泡 -->
    <a @click.stop="doThis">阻止冒泡</a>

    <!-- .prevent - 阻止默认行为 -->
    <form @submit.prevent="onSubmit">阻止默认提交</form>

    <!-- .capture - 使用事件捕获模式 -->
    <div @click.capture="doThis">捕获模式</div>

    <!-- .self - 只当事件从元素本身触发时才执行 -->
    <div @click.self="doThat">自身触发</div>

    <!-- .once - 事件只会触发一次 -->
    <button @click.once="doOnce">只触发一次</button>

    <!-- .passive - 滚动事件的默认行为立即触发（提升移动端滚动性能） -->
    <div @scroll.passive="onScroll">滚动</div>

    <!-- 按键修饰符 -->
    <input @keyup.enter="submit" />     <!-- Enter 键 -->
    <input @keyup.page-down="onPageDown" />  <!-- PageDown 键 -->
    <input @keyup.ctrl.enter="clear" />  <!-- Ctrl + Enter -->

    <!-- 鼠标按钮修饰符 -->
    <button @click.left="onClickLeft">左键</button>
    <button @click.right.prevent="onClickRight">右键</button>
    <button @click.middle="onClickMiddle">中键</button>

    <!-- 精确修饰符 -->
    <input @keyup.ctrl.exact="onCtrlClick" />  <!-- 仅按下 Ctrl 时触发 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const greet = (event) => {
  alert(`Hello!`)
  // event 是原生 DOM 事件
  if (event) {
    console.log(event.target.tagName)
  }
}

const say = (message) => {
  alert(message)
}

const warn = (message, event) => {
  // 访问原生事件
  event.preventDefault()
  alert(message)
}
</script>
```

### 2.6 双向绑定 v-model

```html
<template>
  <div>
    <!-- 文本输入框 -->
    <input v-model="message" placeholder="编辑我" />
    <p>消息是：{{ message }}</p>

    <!-- 多行文本 -->
    <textarea v-model="message" placeholder="多行文本"></textarea>

    <!-- 复选框（单个） -->
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">{{ checked }}</label>

    <!-- 复选框（多个，绑定到数组） -->
    <input type="checkbox" value="Jack" v-model="checkedNames" />
    <input type="checkbox" value="John" v-model="checkedNames" />
    <input type="checkbox" value="Mike" v-model="checkedNames" />

    <!-- 单选按钮 -->
    <input type="radio" value="One" v-model="picked" />
    <input type="radio" value="Two" v-model="picked" />

    <!-- 选择框（单选） -->
    <select v-model="selected">
      <option disabled value="">请选择</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>

    <!-- 选择框（多选，绑定到数组） -->
    <select v-model="multiSelected" multiple>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>

    <!-- v-model 修饰符 -->
    <!-- .lazy - 在 change 事件后同步（而非 input） -->
    <input v-model.lazy="msg" />

    <!-- .number - 自动将输入值转为数字类型 -->
    <input v-model.number="age" type="number" />

    <!-- .trim - 自动过滤首尾空白字符 -->
    <input v-model.trim="msg" />

    <!-- 自定义组件上的 v-model -->
    <CustomInput v-model="searchText" />
    
    <!-- v-model 参数（Vue 3） -->
    <CustomInput v-model:title="bookTitle" />
    
    <!-- 多个 v-model 绑定 -->
    <UserName
      v-model:first-name="first"
      v-model:last-name="last"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomInput from './CustomInput.vue'
import UserName from './UserName.vue'

const message = ref('')
const checked = ref(false)
const checkedNames = ref([])
const picked = ref('')
const selected = ref('')
const multiSelected = ref([])

const msg = ref('')
const age = ref(0)
const searchText = ref('')
const bookTitle = ref('')
const first = ref('')
const last = ref('')
</script>
```

### 2.7 其他常用指令

```html
<template>
  <div>
    <!-- v-text：更新元素的 textContent -->
    <div v-text="message"></div>
    <!-- 等价于：{{ message }} -->

    <!-- v-html：更新元素的 innerHTML -->
    <div v-html="rawHtml"></div>

    <!-- v-cloak：直到实例准备完成后才显示（配合 CSS 使用） -->
    <!-- 用于解决页面加载时闪烁原始插值表达式的问题 -->
    <div v-cloak>{{ message }}</div>

    <!-- v-once：只渲染元素和组件一次，后续更新会被跳过 -->
    <div v-once>{{ message }}</div>
    <!-- 即使 message 改变，这里也不会更新 -->

    <!-- v-pre：跳过这个元素及其子元素的编译过程 -->
    <div v-pre>{{ 这里的内容不会被编译 }}</div>

    <!-- v-memo：缓存子树（Vue 3.2+） -->
    <!-- 当依赖项不变时，跳过子树的更新 -->
    <div v-memo="[user.id]">
      <p>Name: {{ user.name }}</p>
      <p>Age: {{ user.age }}</p>
    </div>
  </div>
</template>

<style>
/* v-cloak 配合 CSS 隐藏未编译的内容 */
[v-cloak] {
  display: none;
}
</style>
```

---

## 第3章：响应式系统

### 3.1 ref 和 reactive

#### ref - 基本类型和对象的响应式引用

```javascript
import { ref } from 'vue'

// 创建响应式数据
const count = ref(0)           // 数字
const message = ref('hello')   // 字符串
const flag = ref(true)         // 布尔值
const user = ref({             // 对象
  name: '张三',
  age: 18
})
const list = ref([1, 2, 3])   // 数组

// 访问和修改值（需要通过 .value）
console.log(count.value)       // 0
count.value++                  // 修改
console.log(user.value.name)   // 张三

// 在模板中使用时不需要 .value
// <template><div>{{ count }}</div></template>  ✅ 正确
```

#### reactive - 对象的深度响应式代理

```javascript
import { reactive } from 'vue'

// 创建响应式对象（返回 Proxy 代理对象）
const state = reactive({
  count: 0,
  user: {
    name: '李四',
    info: {
      email: 'lisi@example.com'
    }
  },
  items: ['a', 'b', 'c']
})

// 直接访问和修改（不需要 .value）
state.count++
state.user.name = '王五'
state.items.push('d')

// ⚠️ 解构会丢失响应性
const { count, user } = state
// count 和 user 现在不再是响应式的！

// 解决方案：使用 toRefs
```

#### ref vs reactive 对比

| 特性 | ref | reactive |
|------|-----|----------|
| **适用场景** | 基本类型、需要替换整个对象 | 对象/数组、深层嵌套结构 |
| **访问方式** | 需要 `.value` | 直接访问 |
| **解构** | 解构后仍保持响应性 | 解构会丢失响应性 |
| **传递** | 可直接传递整个 ref | 传递的是 Proxy 对象 |
| **模板使用** | 自动解包，无需 `.value` | 直接使用 |

### 3.2 响应式原理：Proxy vs Object.defineProperty

#### Vue 2 的 Object.defineProperty

```javascript
// Vue 2 响应式原理简化实现
function defineReactive(obj, key, val) {
  // 递归观察嵌套对象
  observe(val)
  
  Object.defineProperty(obj, key, {
    get() {
      // 收集依赖（Watcher）
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
    set(newVal) {
      if (val === newVal) return
      val = newVal
      // 触发更新
      dep.notify()
    }
  })
}

// ❌ Object.defineProperty 的局限性：
// 1. 无法检测对象属性的添加或删除（需要 Vue.set）
// 2. 无法检测数组下标的变化（需要 Vue.set 或数组方法重写）
// 3. 必须递归遍历所有属性，性能开销大
```

#### Vue 3 的 Proxy

```javascript
// Vue 3 响应式原理简化实现
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集
      track(target, key)
      
      const result = Reflect.get(target, key, receiver)
      
      // 深度代理（惰性）
      if (typeof result === 'object' && result !== null) {
        return reactive(result)
      }
      return result
    },

    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      
      // 触发更新
      if (oldValue !== value) {
        trigger(target, key)
      }
      return result
    },

    // 还可以拦截 deleteProperty、has 等
    deleteProperty(target, key) {
      const hadKey = Object.prototype.hasOwnProperty.call(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hadKey && result) {
        trigger(target, key)
      }
      return result
    }
  })
}

// ✅ Proxy 的优势：
// 1. 可以检测属性的添加和删除
// 2. 可以检测数组索引和长度的变化
// 3. 性能更好（惰性代理，按需深度响应式）
// 4. 支持 Map、Set、WeakMap、WeakSet 等新数据结构
```

### 3.3 computed 计算属性

```javascript
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')
const age = ref(18)

// 只读计算属性
const fullName = computed(() => {
  return `${firstName.value}${lastName.value}`
})

// 可写计算属性（较少使用）
const fullName2 = computed({
  get() {
    return `${firstName.value}${lastName.value}`
  },
  set(newValue) {
    // newValue 是设置的新值
    const names = newValue.split(' ')
    firstName.value = names[0]
    lastName.value = names[names.length - 1]
  }
})

// 使用可写计算属性
fullName2.value = '李 四'  // 会触发 setter
console.log(firstName.value)  // 李
console.log(lastName.value)   // 四

// 计算属性 vs 方法
// 计算属性：有缓存，依赖不变时不重新计算
const doubleCount = computed(() => count.value * 2)

// 方法：每次重新渲染都会执行
const getDoubleCount = () => count.value * 2

// ✅ 推荐优先使用计算属性，避免重复计算
```

### 3.4 watch 和 watchEffect

#### watch - 明确指定数据源

```javascript
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)
const name = ref('')

// 监听单个 ref
watch(count, (newValue, oldValue) => {
  console.log(`count 从 ${oldValue} 变为 ${newValue}`)
})

// 监听多个源
watch(
  [count, name],
  ([newCount, newName], [oldCount, oldName]) => {
    console.log(`${oldCount} -> ${newCount}, ${oldName} -> ${newName}`)
  }
)

// 监听 reactive 对象的某个属性
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (newVal, oldVal) => {
    console.log(`state.count: ${oldVal} -> ${newVal}`)
  }
)

// 配置选项
watch(source, callback, {
  immediate: true,    // 立即执行一次回调
  deep: true,         // 深度监听
  flush: 'post'       // 'pre'(默认) | 'post' | 'sync'
})

// flush 选项详解：
// 'pre'  - 默认，在 DOM 更新前调用回调
// 'post' - 在 DOM 更新后调用回调（可以访问更新后的 DOM）
// 'sync' - 响应式依赖变更时同步触发
```

#### watchEffect - 自动追踪依赖

```javascript
// watchEffect 立即执行，自动追踪函数内使用的响应式依赖
watchEffect(() => {
  // 自动追踪 count 和 name
  console.log(`count: ${count.value}, name: ${name.value}`)
})

// 清除副作用
watchEffect((onCleanup) => {
  const timer = setInterval(() => {
    console.log('定时器运行中...')
  }, 1000)
  
  // onCleanup 注册清理函数
  // 当依赖变化或停止监听时会自动调用
  onCleanup(() => {
    clearInterval(timer)
  })
})

// 停止监听
const stop = watchEffect(() => { /* ... */ })
stop()  // 手动停止
```

#### watch vs watchEffect 对比

| 特性 | watch | watchEffect |
|------|-------|-------------|
| **执行时机** | 懒执行（依赖变化后才执行） | 立即执行一次 |
| **指定依赖** | 显式指定数据源 | 自动追踪函数内依赖 |
| **获取旧值** | 可以获取 oldValue | 无法获取 |
| **清除副作用** | 支持 onCleanup | 支持 onCleanup |
| **适用场景** | 需要在特定数据变化时执行逻辑 | 需要自动追踪并响应变化 |

### 3.5 其他响应式 API

```javascript
import { 
  ref, 
  shallowRef, 
  triggerRef,
  toRefs, 
  toRef,
  isRef,
  unref,
  customRef
} from 'vue'

// ========== shallowRef ==========
// 浅层响应式：只有 .value 的访问是响应式的
// 内部值的改变不会触发更新
const state = shallowRef({
  count: 0
})

// ❌ 这不会触发更新（浅层响应式）
state.value.count++

// ✅ 这样才会触发更新（替换整个 .value）
state.value = { count: state.value.count + 1 }

// 或者手动触发
triggerRef(state)


// ========== toRefs ==========
// 将响应式对象转换为普通对象，每个属性都是 ref
const state = reactive({
  name: 'Alice',
  age: 18
})

// 解构后仍保持响应性
const { name, age } = toRefs(state)

console.log(name.value)  // Alice
name.value = 'Bob'      // 会触发更新


// ========== toRef ==========
// 为源响应式对象上的某个属性创建一个 ref
const state = reactive({
  foo: 1,
  bar: 2
})

// 创建 bar 属性的 ref
const barRef = toRef(state, 'bar')

barRef.value++  // 会更新 state.bar


// ========== isRef ==========
// 检查一个值是否为 ref
const count = ref(0)
isRef(count)     // true
isRef(123)       // false


// ========== unref ==========
// 如果参数是 ref 则返回其值，否则返回参数本身
unref(ref(1))    // 1
unref(1)         // 1


// ========== customRef ==========
// 创建自定义 ref，显式控制依赖追踪和更新触发
function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()  // 追踪依赖
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()  // 触发更新
        }, delay)
      }
    }
  })
}

// 使用防抖 ref
const text = useDebouncedRef('hello')
```

---

## 第4章：Composition API

### 4.1 setup 函数

```javascript
// setup() 是 Composition API 的入口点
// 在组件创建之前执行，此时 props 已解析

import { ref, onMounted } from 'vue'

export default {
  props: {
    title: String
  },
  // setup 不能访问 this（this 为 undefined）
  setup(props, context) {
    // props - 响应式的 props 对象（不能解构，会丢失响应性）
    // context - 非响应式对象，包含：attrs, slots, emit, expose
    
    console.log(props.title)  // 访问 props
    
    // 响应式状态
    const count = ref(0)
    
    // 方法
    const increment = () => count.value++
    
    // 生命周期钩子
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    // 返回的对象会暴露给模板和其他选项式 API
    return {
      count,
      increment
    }
  }
}


// ========== setup 语法糖 (<script setup>) ==========
// Vue 3.2+ 推荐！更简洁的写法

<script setup>
import { ref, onMounted, computed } from 'vue'

// 导入的组件可直接使用，无需注册
import ChildComponent from './ChildComponent.vue'

// 定义 props
const props = defineProps({
  title: String,
  count: {
    type: Number,
    default: 0
  }
})

// 定义 emits
const emit = defineEmits(['update', 'delete'])

// 响应式状态
const count = ref(0)

// 计算属性
const doubled = computed(() => count.value * 2)

// 方法
const increment = () => {
  count.value++
  emit('update', count.value)
}

// 生命周期
onMounted(() => {
  console.log('mounted:', props.title)
})

// 暴露公共方法（供父组件通过 ref 调用）
defineExpose({
  count,
  reset: () => count.value = 0
})
</script>
```

### 4.2 生命周期钩子

```javascript
import { 
  onBeforeMount, 
  onMounted,
  onBeforeUpdate, 
  onUpdated,
  onBeforeUnmount, 
  onUnmounted,
  onErrorCaptured,
  onActivated,          // KeepAlive 缓存的组件激活时
  onDeactivated,        // KeepAlive 缓存的组件停用时
  onServerPrefetch      // 服务端渲染
} from 'vue'

export default {
  setup() {
    // ========== 创建阶段 ==========
    onBeforeMount(() => {
      // DOM 还没渲染，无法访问 DOM 元素
      console.log('组件即将挂载')
    })
    
    onMounted(() => {
      // DOM 已渲染完成，可以访问 DOM
      console.log('组件已挂载')
      // 常用于：获取数据、操作 DOM、初始化第三方库
    })
    
    // ========== 更新阶段 ==========
    onBeforeUpdate(() => {
      // 数据变化，DOM 即将更新
      console.log('组件即将更新')
    })
    
    onUpdated(() => {
      // DOM 已更新完成
      console.log('组件已更新')
      // ⚠️ 不要在此修改状态，可能导致无限循环
    })
    
    // ========== 卸载阶段 ==========
    onBeforeUnmount(() => {
      // 组件即将卸载
      console.log('组件即将卸载')
      // 常用于：清除定时器、取消订阅、解绑事件
    })
    
    onUnmounted(() => {
      // 组件已卸载
      console.log('组件已卸载')
    })
    
    // ========== 错误捕获 ==========
    onErrorCaptured((err, instance, info) => {
      // 捕获子组件的错误
      console.error('捕获到错误:', err)
      // 返回 false 可以阻止错误继续向上传播
      return false
    })
  }
}


// ========== Options API vs Composition API 生命周期对照 ==========
/*
Options API          | Composition API
---------------------|------------------
beforeCreate         | setup() 中直接编写
created              | setup() 中直接编写
beforeMount          | onBeforeMount()
mounted              | onMounted()
beforeUpdate         | onBeforeUpdate()
updated              | onUpdated()
beforeUnmount        | onBeforeUnmount()  (Vue 3: beforeDestroy → beforeUnmount)
unmounted            | onUnmounted()      (Vue 3: destroyed → unmounted)
errorCaptured        | onErrorCaptured()
*/
```

### 4.3 provide/inject 依赖注入

```javascript
// ParentComponent.vue - 提供数据
<script setup>
import { provide, ref, readonly } from 'vue'
import ChildComponent from './ChildComponent.vue'

// 提供响应式数据
const themeColor = ref('blue')
const user = ref({ name: 'Admin', role: 'admin' })

// provide(key, value)
provide('theme', themeColor)
provide('user', user)

// ✅ 最佳实践：提供只读数据，防止子组件意外修改
provide('readonlyTheme', readonly(themeColor))

// 提供方法让子组件安全修改数据
const updateTheme = (color) => {
  themeColor.value = color
}
provide('updateTheme', updateTheme)
</script>


// DeepChildComponent.vue - 注入数据
<script setup>
import { inject } from 'vue'

// inject(key, defaultValue)
const theme = inject('theme')                    // 注入主题色
const user = inject('user', { name: 'Guest' })   // 注入用户（带默认值）
const updateTheme = inject('updateTheme')        // 注入修改方法

// 使用注入的数据
const changeTheme = () => {
  updateTheme('red')  // 安全地修改父组件数据
}
</script>

<template>
  <div :style="{ color: theme }">
    当前主题：{{ theme }}
    用户：{{ user.name }}
    <button @click="changeTheme">切换红色主题</button>
  </div>
</template>
```

### 4.4 自定义 Hooks（组合式函数）

```javascript
// ========== 示例1：鼠标位置 Hook ==========
// hooks/useMousePosition.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // 返回响应式状态
  return { x, y }
}

// 使用方式
<script setup>
import { useMousePosition } from './hooks/useMousePosition'

const { x, y } = useMousePosition()
</script>

<template>
  <div>鼠标位置：{{ x }}, {{ y }}</div>
</template>


// ========== 示例2：请求 Hook ==========
// hooks/useRequest.js
import { ref, isRef, unref, watchEffect } from 'vue'

export function useRequest(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function fetchData() {
    loading.value = true
    error.value = null
    
    try {
      // 支持传入 ref 或普通值
      const res = await fetch(unref(url))
      data.value = await res.json()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  // 如果 url 是 ref，当 url 变化时自动重新请求
  if (isRef(url)) {
    watchEffect(fetchData)
  } else {
    fetchData()
  }

  return { data, error, loading, refresh: fetchData }
}

// 使用方式
<script setup>
import { ref } from 'vue'
import { useRequest } from './hooks/useRequest'

const apiUrl = ref('/api/users')
const { data, error, loading, refresh } = useRequest(apiUrl)
</script>


// ========== 示例3：本地存储 Hook ==========
// hooks/useStorage.js
import { ref, watch } from 'vue'

export function useStorage(key, defaultValue) {
  // 从 localStorage 读取初始值
  const storedValue = localStorage.getItem(key)
  const data = ref(storedValue ? JSON.parse(storedValue) : defaultValue)

  // 数据变化时自动保存到 localStorage
  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  return data
}

// 使用方式
<script setup>
import { useStorage } from './hooks/useStorage'

const todos = useStorage('todos', [])
const theme = useStorage('theme', 'light')
</script>
```

---

## 第5章：组件化基础

### 5.1 组件定义与注册

#### 单文件组件 (SFC) 结构

```vue
<!-- MyComponent.vue -->
<!-- template: 模板部分（必需） -->
<template>
  <div class="my-component">
    <h2>{{ title }}</h2>
    <slot></slot>  <!-- 插槽 -->
  </div>
</template>

<!-- script: 逻辑部分（可选） -->
<script setup>
import { ref, computed } from 'vue'

// 定义 props
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

// 定义 emits
const emit = defineEmits(['update', 'delete'])

// 响应式状态
const count = ref(0)

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
const handleClick = () => {
  count.value++
  emit('update', count.value)
}
</script>

<!-- style: 样式部分（可选） -->
<style scoped>
/* scoped 表示样式只在当前组件内生效 */
.my-component {
  padding: 16px;
  border: 1px solid #eee;
}
</style>
```

#### 组件注册方式

```javascript
// ========== 全局注册 ==========
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import MyComponent from './components/MyComponent.vue'

const app = createApp(App)

// 全局注册后可在任何组件中直接使用
app.component('MyComponent', MyComponent)

app.mount('#app')


// ========== 局部注册 ==========
// ParentComponent.vue
<script setup>
// 在 <script setup> 中导入的组件可以直接使用
import MyComponent from './MyComponent.vue'
import AnotherComponent from './AnotherComponent.vue'
</script>

<template>
  <div>
    <MyComponent title="Hello" />
    <AnotherComponent />
  </div>
</template>
```

### 5.2 Props

```vue
<!-- ChildComponent.vue -->
<script setup>
// 定义 props（支持多种写法）

// 写法1：数组形式（简单场景）
// const props = defineProps(['title', 'likes'])

// 写法2：对象形式（推荐，支持类型检查和验证）
const props = defineProps({
  // 基础类型检查
  title: String,
  
  // 多个可能的类型
  value: [String, Number],
  
  // 必填字段
  requiredProp: {
    type: String,
    required: true
  },
  
  // 默认值
  optionalProp: {
    type: Number,
    default: 42
  },
  
  // 对象/数组默认值应当从一个工厂函数返回
  complexProp: {
    type: Object,
    default: () => ({
      key: 'value'
    })
  },
  
  // 自定义验证函数
  customProp: {
    type: Number,
    validator(value) {
      // 值必须匹配下列字符串中的一个
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  
  // 函数类型默认值（Vue 3.3+）
  callback: {
    type: Function,
    default: () => 'default function'
  }
})

// 使用 TypeScript 时可以这样写
// interface Props {
//   title: string
//   likes?: number
// }
// const props = withDefaults(defineProps<Props>(), {
//   likes: 0
// })
</script>

<template>
  <div>
    <h3>{{ title }}</h3>
    <p>点赞数：{{ likes || 0 }}</p>
  </div>
</template>
```

#### 父组件传参方式

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <!-- 静态传参 -->
    <ChildComponent title="静态标题" />
    
    <!-- 动态传参（: 是 v-bind 的简写） -->
    <ChildComponent :title="dynamicTitle" :likes="likeCount" />
    
    <!-- 传入各种类型的值 -->
    <ChildComponent
      :title="'字符串'"
      :likes="100"
      :is-published="true"
      :comment-ids="[1, 2, 3]"
      :author="{ name: '张三' }"
      :callback="myFunction"
    />
    
    <!-- 传入对象的所有属性（展开运算符） -->
    <ChildComponent v-bind="postObject" />
  </div>
</template>
```

### 5.3 Emits 自定义事件

```vue
<!-- ChildComponent.vue -->
<script setup>
// 定义组件触发的事件
const emit = defineEmits([
  'update',      // 基本事件
  'delete',      // 带校验的事件
])

// 或带验证的写法
// const emit = defineEmits({
//   // 无校验
//   click: null,
//   
//   // 带校验
//   submit: payload => {
//     if (!payload.email) {
//       console.warn('submit 事件需要 email 参数')
//       return false
//     }
//     return true
//   }
// })

// 触发事件
const handleSubmit = () => {
  emit('update', { value: 123 })  // 传递参数
  
  emit('delete', { id: 456 })
}
</script>

<template>
  <button @click="handleSubmit">提交</button>
</template>
```

#### 父组件监听事件

```vue
<!-- ParentComponent.vue -->
<template>
  <ChildComponent
    @update="handleUpdate"
    @delete="handleDelete"
  />
</template>

<script setup>
const handleUpdate = (payload) => {
  console.log('收到更新事件:', payload)
}

const handleDelete = ({ id }) => {
  console.log('删除ID:', id)
}
</script>
```

### 5.4 Slots 插槽

```vue
<!-- BaseLayout.vue - 带插槽的布局组件 -->
<template>
  <div class="container">
    <!-- 默认插槽 -->
    <header class="header">
      <slot name="header">
        <p>默认头部内容</p>  <!-- 兜底内容 -->
      </slot>
    </header>
    
    <main class="main">
      <slot>
        <p>默认主体内容</p>
      </slot>
    </main>
    
    <footer class="footer">
      <slot name="footer" />
    </footer>
  </div>
</template>
```

```vue
<!-- ParentComponent.vue - 使用插槽 -->
<template>
  <BaseLayout>
    <!-- 具名插槽（v-slot:header 或 #header） -->
    <template #header>
      <h1>页面标题</h1>
    </template>
    
    <!-- 默认插槽内容 -->
    <p>这是主要内容区域</p>
    
    <!-- 另一个具名插槽 -->
    <template #footer>
      <p>版权信息 © 2024</p>
    </template>
  </BaseLayout>
</template>
```

#### 作用域插槽

```vue
<!-- UserList.vue - 提供数据的组件 -->
<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      <!-- 将数据通过 v-bind 传递给插槽使用者 -->
      <slot :user="user" :index="index">
        {{ user.name }}  <!-- 兜底内容 -->
      </slot>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    required: true
  }
})
</script>
```

```vue
<!-- ParentComponent.vue - 使用作用域插槽 -->
<template>
  <UserList :users="userList">
    <!-- 接收作用域插槽的数据 -->
    <template #default="{ user, index }">
      <span>{{ index + 1 }}. {{ user.name }} - {{ user.email }}</span>
      <button @click="editUser(user)">编辑</button>
    </template>
  </UserList>
</template>
```

### 5.5 父子组件通信

#### 父 → 子：Props

```vue
<!-- 父组件 -->
<ChildComponent :message="parentMsg" :user="userInfo" />

<!-- 子组件接收 -->
<script setup>
const props = defineProps({
  message: String,
  user: Object
})
</script>
```

#### 子 → 父：Emits

```vue
<!-- 子组件触发事件 -->
<button @click="$emit('update', newValue)">更新</button>

<!-- 父组件监听 -->
<ChildComponent @update="handleUpdate" />
```

#### 父 → 子：ref（调用子组件方法）

```vue
<!-- 子组件暴露方法和属性 -->
<script setup>
const count = ref(0)
const increment = () => count.value++
const reset = () => count.value = 0

// 暴露给父组件
defineExpose({ count, increment, reset })
</script>
```

```vue
<!-- 父组件通过 ref 调用 -->
<template>
  <ChildComponent ref="childRef" />
  <button @click="childRef.increment()">调用子组件方法</button>
</template>

<script setup>
import { ref } from 'vue'
const childRef = ref(null)
</script>
```

#### v-model 双向绑定通信

```vue
<!-- 子组件实现 v-model -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const updateValue = (newValue) => {
  emit('update:modelValue', newValue)
}
</script>

<template>
  <input
    :value="modelValue"
    @input="updateValue($event.target.value)"
  />
</template>
```

```vue
<!-- 父组件使用 v-model -->
<ChildComponent v-model="searchText" />
```

### 5.6 动态组件 & 异步组件 & Teleport & KeepAlive

#### 动态组件

```vue
<template>
  <div>
    <!-- 通过 :is 切换组件 -->
    <component :is="currentTab" :key="currentTabKey" />
    
    <!-- 切换按钮 -->
    <button @click="currentTab = 'ComponentA'">A</button>
    <button @click="currentTab = 'ComponentB'">B</button>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const currentTab = ref(markRaw(ComponentA))  // markRaw 避免被代理
</script>
```

#### 异步组件

```javascript
import { defineAsyncComponent } from 'vue'

// 定义异步组件
const AsyncComp = defineAsyncComponent(() =>
  import('./components/HeavyComponent.vue')
)

// 高级配置
const AdvancedAsyncComp = defineAsyncComponent({
  loader: () => import('./components/HeavyComponent.vue'),
  
  // 加载异步组件时使用的组件
  loadingComponent: LoadingSpinner,
  
  // 加载失败时使用的组件
  errorComponent: ErrorDisplay,
  
  // 显示 loading 组件前的延迟时间（默认 200ms）
  delay: 200,
  
  // 超时时间（超时后显示 error 组件）
  timeout: 3000
})
```

#### Teleport（传送门）

```vue
<template>
  <div>
    <button @showModal = true">打开模态框</button>
    
    <!-- Teleport 将内容传送到 body 下 -->
    <!-- 解决 z-index 层叠问题 -->
    <teleport to="body">
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <p>这是一个模态框</p>
          <button @showModal = false">关闭</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style>
.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
```

#### KeepAlive（缓存组件）

```vue
<template>
  <keep-alive>
    <!-- 缓存的组件在切换时不会销毁，保留状态 -->
    <component :is="currentTab" />
  </keep-alive>
  
  <!-- 包含/排除特定组件 -->
  <keep-al :include="['ComponentA', 'ComponentB']">
    <component :is="currentTab" />
  </keep-alive>
  
  <keep-al :exclude="['ComponentC']">
    <component :is="currentTab" />
  </keep-alive>
  
  <!-- 最多缓存 10 个组件实例 -->
  <keep-al :max="10">
    <router-view />
  </keep-alive>
</template>

<script setup>
// 被 keep-alive 缓存的组件可以使用 onActivated/onDeactivated
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 组件被激活（从缓存恢复）时调用
  console.log('组件被激活')
})

onDeactivated(() => {
  // 组件被停用（进入缓存）时调用
  console.log('组件被停用')
})
</script>
```

---

## 第6章：路由 Vue Router

### 6.1 基本配置

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 定义路由配置
const routes = [
  {
    path: '/',                    // URL 路径
    name: 'home',                 // 路由名称
    component: HomeView,          // 对应组件
    alias: '/home',               // 别名
    redirect: '/dashboard',       // 重定向
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),  // 懒加载
    meta: {                       // 路由元信息
      requiresAuth: true,
      title: '关于我们'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  // history 模式
  routes,
  
  // 其他配置
  scrollBehavior(to, from, savedPosition) {
    // 控制路由切换时的滚动行为
    if (savedPosition) {
      return savedPosition  // 浏览器前进/后退时恢复位置
    } else if (to.hash) {
      return { el: to.hash }  // 有锚点时滚动到对应位置
    } else {
      return { top: 0 }  // 滚动到顶部
    }
  }
})

export default router
```

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)  // 注册路由插件
app.mount('#app')
```

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <!-- 导航链接 -->
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
      
      <!-- 编程式导航的对象写法 -->
      <router-link :to="{ name: 'user', params: { id: 123 } }">
        用户页面
      </router-link>
    </nav>
    
    <!-- 路由出口（渲染匹配的组件） -->
    <main>
      <router-view />
    </main>
  </div>
</template>
```

### 6.2 路由模式

#### Hash 模式

```javascript
// URL 格式：http://example.com/#/home
// 使用 URL 的 hash 部分（#）来模拟路径
// 优点：兼容性好，无需服务器配置
// 缺点：URL 不美观，SEO 不友好

import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
```

#### History 模式

```javascript
// URL 格式：http://example.com/home
// 使用 HTML5 History API
// 优点：URL 美观，利于 SEO
// 缺点：需要服务器配置（404 重定向到 index.html）

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Nginx 配置示例
/*
location / {
  try_files $uri $uri/ /index.html;
}
*/
```

#### Memory 模式（抽象模式）

```javascript
// 不依赖于浏览器环境，适用于非浏览器场景（如 Node.js、SSR）
import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes
})
```

### 6.3 导航守卫

#### 全局守卫

```javascript
// router/index.js

// 全局前置守卫（每次导航前触发）
router.beforeEach((to, from, next) => {
  // to: 即将进入的目标路由
  // from: 当前正要离开的路由
  // next: 放行函数（可选，推荐返回值方式）
  
  console.log('从', from.path, '到', to.path)
  
  // 判断是否需要登录
  if (to.meta.requiresAuth) {
    const isAuthenticated = checkAuth()
    
    if (!isAuthenticated) {
      // 未登录，重定向到登录页
      return { path: '/login', query: { redirect: to.fullPath } }
    }
  }
  
  // 设置页面标题
  document.title = to.meta.title || '默认标题'
  
  // 放行
  return true
})

// 全局后置钩子（导航成功后触发，不接受 next）
router.afterEach((to, from) => {
  // 常用于：分析、更改页面标题、声明页面等辅助功能
  console.log('导航完成:', to.path)
})

// 全局解析守卫（在组件内守卫和异步路由组件被解析之后触发）
router.beforeResolve(async (to) => {
  if (to.meta.requiresData) {
    // 可以在这里预取数据
    await store.dispatch('fetchData')
  }
})
```

#### 路由独享守卫

```javascript
const routes = [
  {
    path: '/admin/:id',
    component: AdminPanel,
    // 进入该路由前触发
    beforeEnter: (to, from) => {
      // 检查权限
      if (!isAdmin()) {
        return { name: 'Forbidden' }
      }
    }
  }
]

// 也可以传入数组（多个守卫）
{
  path: '/admin/:id',
  beforeEnter: [
    checkAuth,
    checkPermission,
    validateParams
  ]
}
```

#### 组件内守卫

```vue
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

// 离开当前路由时触发
// 常用于：防止用户未保存就离开
onBeforeRouteLeave((to, from) => {
  const answer = window.confirm('确定要离开吗？未保存的更改将会丢失！')
  if (!answer) return false  // 取消导航
})

// 当前路由改变但组件被复用时触发
// 例如：/user/123 切换到 /user/456
onBeforeRouteUpdate(async (to) => {
  // 根据新的路由参数获取数据
  userData.value = await fetchUser(to.params.id)
})
</script>
```

#### 完整导航流程

```
1. 导航被触发
2. 在失活的组件里调用 beforeRouteLeave
3. 调用全局 beforeEach 守卫
4. 在重用的组件里调用 beforeRouteUpdate
5. 调用路由配置里的 beforeEnter
6. 解析异步路由组件
7. 在被激活的组件里调用 beforeRouteEnter
8. 调用全局 beforeResolve 守卫
9. 导航被确认
10. 调用全局 afterEach 钩子
11. 触发 DOM 更新
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数
```

### 6.4 懒加载（代码分割）

```javascript
// 路由懒加载：将每个路由对应的组件打包成独立的 chunk
// 只有访问该路由时才加载对应的代码

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // webpackChunkName: 指定打包后的文件名
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    // 将同一组的路由打包在一起
    component: () => import(/* webpackChunkName: "group-admin" */ '../views/Admin.vue')
  }
]

// 打包后的文件结构：
// Home.[hash].js
// about.[hash].js
// group-admin.[hash].js
```

### 6.5 嵌套路由 & 动态路由

#### 嵌套路由

```javascript
const routes = [
  {
    path: '/user/:id',
    component: User,
    // 子路由
    children: [
      {
        // 空路径：/user/:id 时渲染 UserProfile
        path: '',
        component: UserProfile
      },
      {
        // /user/:id/posts 时渲染 UserPosts
        path: 'posts',
        component: UserPosts
      },
      {
        // /user/:id/settings 时渲染 UserSettings
        path: 'settings',
        component: UserSettings
      }
    ]
  }
]
```

```vue
<!-- User.vue - 父组件需要有 router-view 来渲染子路由 -->
<template>
  <div class="user-container">
    <h2>用户 {{ $route.params.id }}</h2>
    
    <!-- 子路由导航 -->
    <router-link to="">个人资料</router-link>
    <router-link to="posts">文章</router-link>
    <router-link to="settings">设置</router-link>
    
    <!-- 子路由出口 -->
    <router-view />
  </div>
</template>
```

#### 动态路由

```javascript
// 添加路由（动态添加）
router.addRoute({
  path: '/new-page',
  name: 'NewPage',
  component: NewPage
})

// 添加嵌套路由
router.addRoute('ParentName', {
  path: 'child',
  component: ChildComponent
})

// 删除路由
router.removeRoute('routeName')

// 检查路由是否存在
router.hasRoute('routeName')

// 获取当前路由的所有记录
router.getRoutes()

// 常见应用场景：根据权限动态添加路由
function addRoutesByPermission(permissions) {
  permissions.forEach(perm => {
    router.addRoute(generateRoute(perm))
  })
}
```

#### 路由参数

```javascript
// 定义带参数的路由
{
  path: '/user/:id',           // 动态段以冒号开始
  path: '/search/:keyword?',   // 可选参数（?）
  path: '/files/*',            // 匹配所有（0 个或多个）
  path: '/files/*.jpg',        // 以 .jpg 结尾的路径
}

// 获取参数
// 在组件中：
this.$route.params.id

// 在 setup 中：
import { useRoute } from 'vue-router'
const route = useRoute()
const userId = route.params.id

// 查询参数
// URL: /search?q=vue&lang=zh
route.query.q      // 'vue'
route.query.lang   // 'zh'

// Hash
// URL: /page#section
route.hash         // '#section'
```

---

## 第7章：状态管理 Pinia

### 7.1 Store 定义

```javascript
// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 定义 store（类似组合式函数）
// useCounterStore 是 store 的 id，必须唯一
export const useCounterStore = defineStore('counter', () => {
  // ========== State（状态）==========
  const count = ref(0)
  const name = ref('计数器')
  
  // ========== Getters（ getters）==========
  const doubleCount = computed(() => count.value * 2)
  
  // 获取其他 getter
  const doubleCountPlusOne = computed(() => doubleCount.value + 1)
  
  // getter 可以接受参数
  const getUserById = computed(() => {
    return (userId) => users.value.find(user => user.id === userId)
  })
  
  // ========== Actions（ actions）==========
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  function reset() {
    count.value = 0
    name.value = '计数器'
  }
  
  // action 可以是异步的
  async function fetchData() {
    const response = await fetch('/api/data')
    const data = await response.json()
    count.value = data.count
  }
  
  // 返回需要在组件中使用的状态和方法
  return {
    count,
    name,
    doubleCount,
    doubleCountPlusOne,
    increment,
    decrement,
    reset,
    fetchData
  }
})


// ========== 选项式 API 风格的定义方式 ==========
export const useUserStore = defineStore('user', {
  // State（相当于组件的 data）
  state: () => ({
    users: [],
    currentUser: null,
    isLoading: false
  }),
  
  // Getters（相当于组件的 computed）
  getters: {
    // 箭头函数，可以通过 this 访问 state 和其他 getters
    getUserCount: (state) => state.users.length,
    
    // 普通函数，可以通过 this 访问整个 store 实例
    getCurrentUserName(state) {
      return state.currentUser?.name ?? '未登录'
    },
    
    // 传递参数给 getter
    getUserById: (state) => {
      return (id) => state.users.find(user => user.id === id)
    }
  },
  
  // Actions（相当于组件的 methods）
  actions: {
    // 可以是同步的
    addUser(user) {
      this.users.push(user)
    },
    
    // 也可以是异步的
    async fetchUsers() {
      this.isLoading = true
      try {
        const response = await fetch('/api/users')
        this.users = await response.json()
      } finally {
        this.isLoading = false
      }
    },
    
    // 可以调用其他 action
    async login(credentials) {
      const user = await api.login(credentials)
      this.setCurrentUser(user)
      this.fetchUserPreferences()
    }
  }
})
```

### 7.2 在组件中使用

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

// 获取 store 实例
const counterStore = useCounterStore()

// ✅ 推荐方式：使用 storeToRefs 保持响应性
// （直接解构会丢失响应性）
const { count, name, doubleCount } = storeToRefs(counterStore)

// actions 可以直接解构（它们只是函数）
const { increment, decrement, reset } = counterStore

// 在模板中使用
// {{ count }}
// <button @click="increment">+1</button>
</script>
```

```vue
<template>
  <div>
    <!-- 直接在模板中使用 store -->
    <p>计数：{{ counterStore.count }}</p>
    <p>双倍：{{ counterStore.doubleCount }}</p>
    
    <button @click="counterStore.increment()">增加</button>
    <button @click="counterStore.decrement()">减少</button>
    
    <!-- 批量修改状态 -->
    <button @click="patchState">批量更新</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()

// 直接修改 state（Pinia 允许直接修改）
const patchState = () => {
  counterStore.$patch({
    count: counterStore.count + 10,
    name: '新名称'
  })
  
  // 或者使用函数进行复杂修改
  counterStore.$patch((state) => {
    state.count += 5
    state.items.push({ name: '新项', id: Date.now() })
  })
}

// 重置状态到初始值
const resetAll = () => {
  counterStore.$reset()
}

// 订阅状态变化
counterStore.$subscribe((mutation, state) => {
  console.log('状态变化:', mutation.type, mutation.storeId)
  // mutation.type: 'direct' | 'patch object' | 'patch function'
  // localStorage.setItem('counter', JSON.stringify(state))
}, { detached: true })  // detached: 组件卸载后继续监听
</script>
```

### 7.3 模块化管理

```javascript
// stores/index.js - 统一导出
export { useCounterStore } from './counter'
export { useUserStore } from './user'
export { useCartStore } from './cart'


// stores/cart.js - 购物车模块
import { defineStore } from 'pinia'
import { useUserStore } from './user'  // 可以引用其他 store

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const userStore = useUserStore()  // 在 store 内部使用另一个 store
  
  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })
  
  function addItem(product) {
    // 可以访问其他 store 的数据
    if (!userStore.isLoggedIn) {
      throw new Error('请先登录')
    }
    
    const existingItem = items.value.find(i => i.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }
  
  function removeItem(productId) {
    const index = items.value.findIndex(i => i.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }
  
  function clearCart() {
    items.value = []
  }
  
  return { items, totalPrice, addItem, removeItem, clearCart }
})
```

### 7.4 插件系统

```javascript
// plugins/piniaPersistence.js
// 示例：持久化插件 - 将状态保存到 localStorage
export function piniaPersistencePlugin({ store }) {
  // 从 localStorage 恢复状态
  const savedState = localStorage.getItem(`pinia-${store.$id}`)
  if (savedState) {
    store.$patch(JSON.parse(savedState))
  }
  
  // 状态变化时保存到 localStorage
  store.$subscribe((mutation, state) => {
    localStorage.setItem(`pinia-${store.$id}`, JSON.stringify(state))
  })
}

// plugins/piniaLogger.js
// 示例：日志插件
export function piniaLoggerPlugin({ store }) {
  store.$subscribe((mutation, state) => {
    console.log(`[Pinia] [${store.$id}]`, {
      type: mutation.type,
      payload: mutation.payload,
      newState: state
    })
  })
}


// main.js - 注册插件
import { createPinia } from 'pinia'
import { piniaPersistencePlugin } from './plugins/piniaPersistence'
import { piniaLoggerPlugin } from './plugins/piniaLogger'

const pinia = createPinia()

// 使用插件
pinia.use(piniaPersistencePlugin)
pinia.use(piniaLoggerPlugin)

app.use(pinia)
```

### 7.5 Pinia vs Vuex 对比

| 特性 | Pinia (Vue 3 推荐) | Vuex (Vue 2/3) |
|------|-------------------|----------------|
| **安装** | 需要单独安装 `pinia` | Vue 3 需安装 `vuex@4` |
| **Mutation** | ❌ 不需要，直接修改 state | ✅ 必须通过 mutation 修改 |
| **Action** | 支持同步和异步 | 支持同步和异步 |
| **Getter** | 类似 computed | 类似 computed |
| **TypeScript** | ✅ 完美支持，自动推断类型 | 需要额外装饰器 |
| **Modules** | 每个 store 独立文件，天然扁平化 | 需要命名空间管理 |
| **代码分割** | ✅ 天然支持（store 按需加载） | 通常全部打包在一起 |
| **DevTools** | ✅ 支持 Vue DevTools | ✅ 支持 Vue DevTools |
| **体积** | ~1KB (gzipped) | ~10kb+ (gzipped) |
| **API 风格** | Composition API / Options API | Options API |

```javascript
// Vuex 4 写法对比（仅供参考）
// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    INCREMENT(state) {
      state.count++
    }
  },
  actions: {
    increment({ commit }) {
      commit('INCREMENT')
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  },
  modules: {
    // 子模块...
  }
})
```

---

## 第8章：内置指令与特殊属性

### 8.1 key 的作用与原理

```html
<template>
  <div>
    <!-- key 是 Vue 虚拟 DOM Diff 算法的标识 -->
    <!-- 用于判断两个节点是否相同，决定是否复用 DOM 元素 -->
    
    <!-- ✅ 正确：使用唯一且稳定的 ID -->
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
    
    <!-- ⚠️ 不推荐：使用 index 作为 key -->
    <!-- 问题：列表插入/删除/排序时会导致错误的 DOM 复用 -->
    <li v-for="(item, index in items" :key="index">
      {{ item.text }}
    </li>
    
    <!-- key 的工作原理示意 -->
    <!-- 
    旧节点: [A, B, C]  key: [1, 2, 3]
    新节点: [D, B, C]  key: [4, 2, 3]
    
    Diff 过程:
    - key=1 (A) → 不存在 → 移除 A
    - key=2 (B) → 存在 → 复用
    - key=3 (C) → 存在 → 复用  
    - key=4 (D) → 不存在 → 新增 D
    
    结果: 最小化 DOM 操作
    -->
  </div>
</template>
```

### 8.2 v-model 原理与参数

#### v-model 的本质

```vue
<!-- v-model 是以下语法的语法糖 -->
<!-- 等价于： -->
<input
  :model-value="searchText"
  @update:model-value="searchText = $event"
/>

<!-- 自定义组件实现 v-model -->
<!-- CustomInput.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

#### v-model 参数（自定义参数名）

```vue
<!-- Vue 3 支持自定义 v-model 参数 -->
<!-- CustomTitle.vue -->
<script setup>
const props = defineProps(['title'])
const emit = defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="emit('update:title', $event.target.value)"
  />
</template>
```

```vue
<!-- 使用自定义参数的 v-model -->
<CustomTitle v-model:title="pageTitle" />

<!-- 等价于 -->
<CustomTitle
  :title="pageTitle"
  @update:title="pageTitle = $event"
/>
```

#### v-model 修饰符

```vue
<!-- 自定义组件支持修饰符 -->
<!-- CustomInput.vue -->
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: {    // 接收修饰符对象
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  // 根据修饰符处理值
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input :value="modelValue" @input="emitValue" />
</template>
```

```vue
<!-- 使用带修饰符的自定义 v-model -->
<CustomInput v-model.capitalize="text" />
```

### 8.3 v-slot 插槽详解

#### 默认插槽

```vue
<!-- BaseButton.vue -->
<template>
  <button class="btn">
    <!-- 默认插槽：没有 name 的插槽 -->
    <slot>
      <!-- 兜底内容：当没有提供插槽内容时显示 -->
      默认按钮
    </slot>
  </button>
</template>
```

```vue
<!-- 使用默认插槽 -->
<BaseButton>
  <span>点击我</span>  <!-- 替换兜底内容 -->
</BaseButton>

<!-- 使用 v-slot 简写 # -->
<BaseButton>
  <template #default>
    <strong>重要按钮</strong>
  </template>
</BaseButton>
```

#### 具名插槽

```vue
<!-- BaseCard.vue -->
<template>
  <div class="card">
    <header class="card-header">
      <slot name="header">
        <h3>默认标题</h3>
      </slot>
    </header>
    
    <main class="card-body">
      <slot />
    </main>
    
    <footer class="card-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>
```

```vue
<!-- 使用具名插槽 -->
<BaseCard>
  <template #header>
    <h1>自定义标题</h1>
  </template>
  
  <p>这是卡片主体内容</p>
  
  <template #footer>
    <small>版权所有 © 2024</small>
  </template>
</BaseCard>
```

#### 作用域插槽

```vue
<!-- UserDataList.vue - 提供数据的作用域插槽 -->
<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      <!-- 通过 v-bind 将数据传递出去 -->
      <slot name="user-item" :user="user" :index="index">
        {{ user.name }}  <!-- 兜底内容 -->
      </slot>
    </li>
  </ul>
</template>
```

```vue
<!-- 使用作用域插槽（解构接收数据） -->
<UserDataList :users="userList">
  <template #user-item="{ user, index }">
    <div class="user-card">
      <span class="index">{{ index + 1 }}</span>
      <img :src="user.avatar" :alt="user.name" />
      <div class="info">
        <h4>{{ user.name }}</h4>
        <p>{{ user.email }}</p>
      </div>
      <button @click="editUser(user)">编辑</button>
    </div>
  </template>
</UserDataList>
```

#### 动态插槽名

```vue
<template>
  <BaseLayout>
    <!-- 动态插槽名（使用方括号语法） -->
    <template #[dynamicSlotName]>
      动态内容
    </template>
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue'
const dynamicSlotName = ref('header')
</script>
```

#### 插槽的最佳实践

```vue
<!--
插槽设计原则：
1. 提供合理的兜底内容
2. 使用作用域插槽提供数据
3. 具名插槽语义化命名
4. 保持插槽的灵活性
-->

<!-- 好的设计示例 -->
<template>
  <div class="table-wrapper">
    <!-- 表头插槽 -->
    <div class="table-header">
      <slot name="header" :columns="columns" />
    </div>
    
    <!-- 表体插槽（作用域插槽） -->
    <div class="table-body">
      <slot name="row" v-for="item in data" :key="item.id" :row="item" />
    </div>
    
    <!-- 空状态插槽 -->
    <div v-if="data.length === 0" class="empty-state">
      <slot name="empty">
        <p>暂无数据</p>
      </slot>
    </div>
    
    <!-- 分页插槽 -->
    <div class="pagination">
      <slot name="pagination" :total="data.length" />
    </div>
  </div>
</template>
```

---

## 第9章：过渡与动画

### 9.1 Transition 组件

```vue
<template>
  <div>
    <button @toggle = !show">切换显示</button>
    
    <!-- 基础过渡 -->
    <Transition>
      <p v-if="show">hello</p>
    </Transition>
  </div>
</template>

<style>
/* 
Transition 组件会自动应用以下 CSS 类：

进入过渡：
- v-enter-from: 进入开始状态
- v-enter-active: 进入过程中（定义过渡时长、延迟、曲线）
- v-enter-to: 进入结束状态（Vue 3，Vue 2 为 v-enter）

离开过渡：
- v-leave-from: 离开开始状态（Vue 3，Vue 2 为 v-leave）
- v-leave-active: 离开过程中
- v-leave-to: 离开结束状态
*/

/* 自定义过渡名称 */
.my-transition-enter-active,
.my-transition-leave-active {
  transition: opacity 0.5s ease;
}

.my-transition-enter-from,
.my-transition-leave-to {
  opacity: 0;
}

/* 默认类名（v- 前缀） */
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
```

#### Transition 组件属性

```vue
<template>
  <!-- 
    Transition 组件支持的属性：
    - name: 自定义过渡类名前缀
    - appear: 是否在初始渲染时应用过渡
    - mode: in-out / out-in（控制进出顺序）
    - duration: 过渡持续时间
    - enter-active-class / leave-active-class: 自定义类名
    - css: 是否使用 CSS 过渡（false 时使用 JS 钩子）
    - type: 指定过渡事件类型（transition / animation）
  -->
  
  <Transition
    name="fade"
    appear
    :duration="{ enter: 500, leave: 300 }"
  >
    <div v-if="show">内容</div>
  </Transition>
</template>
```

### 9.2 CSS 过渡动画

```vue
<template>
  <div>
    <!-- 示例1：淡入淡出 -->
    <Transition name="fade">
      <h1 v-if="showTitle">标题</h1>
    </Transition>
    
    <!-- 示例2：滑动效果 -->
    <Transition name="slide">
      <p v-if="showContent">内容区域</p>
    </Transition>
    
    <!-- 示例3：缩放效果 -->
    <Transition name="zoom">
      <div v-if="showBox" class="box">盒子</div>
    </Transition>
  </div>
</template>

<style>
/* 淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 滑动效果 */
.slide-enter-active {
  transition: all 0.3s ease-out;
}
.slide-leave-active {
  transition: all 0.2s ease-in;
}
.slide-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

/* 缩放效果 */
.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s ease;
}
.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0);
  opacity: 0;
}

.box {
  width: 100px;
  height: 100px;
  background: #42b983;
}
</style>
```

### 9.3 JS 钩子函数

```vue
<template>
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled"
    :css="false"  <!-- 禁用 CSS 过渡，只用 JS -->
  >
    <div v-if="show" class="box"></div>
  </Transition>
</template>

<script setup>
// 进入阶段钩子
function onBeforeEnter(el) {
  // 设置初始状态
  el.style.opacity = 0
  el.style.transformOrigin = 'left'
}

function onEnter(el, done) {
  // done 是回调函数，表示过渡结束
  // 对于 JS 动画，必须调用 done
  Velocity(el, { opacity: 1, fontSize: '1.5em' }, { duration: 300, done })
}

function onAfterEnter(el) {
  console.log('进入动画完成')
}

function onEnterCancelled(el) {
  // 进入动画被取消时调用
}

// 离开阶段钩子
function onBeforeLeave(el) {
  el.style.height = el.offsetHeight + 'px'  // 固定高度
}

function onLeave(el, done) {
  Velocity(el, { opacity: 0, height: 0 }, { duration: 300, done })
}

function onAfterLeave(el) {
  console.log('离开动画完成')
}

function onLeaveCancelled(el) {
  // 仅在使用 v-show 时可能触发
}
</script>
```

### 9.4 TransitionGroup 列表动画

```vue
<template>
  <div>
    <button @addItem">添加</button>
    <button @removeIndex(0)">移除第一个</button>
    <button @shuffle">打乱顺序</button>
    
    <!-- 
      TransitionGroup:
      - 默认渲染 <span>（可通过 tag 属性更改）
      - 过渡模式不可用
      - 内部元素必须有唯一的 key
      - 支持 FLIP 动画
    -->
    <TransitionGroup
      name="list"
      tag="ul"
      class="list-container"
    >
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="list-item"
      >
        {{ item.text }}
        <button @removeItem(index)">×</button>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, text: '项目 1' },
  { id: 2, text: '项目 2' },
  { id: 3, text: '项目 3' }
])

let idCounter = 4

function addItem() {
  items.value.push({
    id: idCounter++,
    text: `项目 ${items.value.length + 1}`
  })
}

function removeItem(index) {
  items.value.splice(index, 1)
}

function shuffle() {
  items.value = [...items.value].sort(() => Math.random() - 0.5)
}
</script>

<style>
/* 列表过渡动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 列表移动动画（FLIP） */
/* 当元素的位置发生变化时应用 */
.list-move {
  transition: transform 0.3s ease;
}

.list-container {
  position: relative;
}

.list-item {
  transition: all 0.3s ease;
  margin: 8px 0;
  padding: 8px 16px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
```

---

## 第10章：Vue 3 新特性

### 10.1 Fragments（多根节点）

```vue
<!-- Vue 2：只能有一个根节点 -->
<!-- ❌ 报错 -->
<template>
  <div>Header</div>
  <div>Main</div>
  <div>Footer</div>
</template>

<!-- Vue 3：支持多根节点（Fragments） -->
<!-- ✅ 正确 -->
<template>
  <header>Header</header>
  <main>Main Content</main>
  <footer>Footer</footer>
</template>

<!-- 多根节点注意事项 -->
<template>
  <!-- 
    多根节点时，属性继承不会自动应用
    需要明确指定哪个根节点接收属性
  -->
  <header>...</header>
  <main v-bind="$attrs">Main Content</main>
  <footer>...</footer>
</template>
```

### 10.2 Suspense（异步组件加载）

```vue
<template>
  <Suspense>
    <!-- 异步组件（默认插槽） -->
    <template #default>
      <AsyncComponent />
    </template>
    
    <!-- 加载中显示的内容（fallback 插槽） -->
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
</template>

<script setup>
// 异步组件：setup 函数可以是 async 的
const AsyncComponent = defineAsyncComponent(() =>
  import('./AsyncComponent.vue')
)

// 或者在组件内部使用 async setup
// AsyncComponent.vue
async function setup() {
  // 加载数据
  const res = await fetch('/api/data')
  const data = await res.json()
  
  return {
    data
  }
}
</script>
```

#### Suspense 的事件

```vue
<template>
  <Suspense
    @pending="onPending"
    @resolve="onResolve"
    @reject="onReject"
  >
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
</template>
```

### 10.3 emits 选项

```vue
<script setup>
// 定义组件可以触发的事件（推荐）
// 优点：
// 1. 更好的文档说明
// 2. 可以进行事件验证
// 3. 帮助 Vue 更好地优化（fallthrough attributes）

// 基本定义
const emit = defineEmits(['update', 'delete', 'close'])

// 带验证的定义
const emit = defineEmits({
  // 无验证
  click: null,
  
  // 带验证
  submit: payload => {
    if (!payload.email) {
      console.warn('submit 事件需要 email 参数')
      return false
    }
    return true
  }
})

// 触发事件
emit('update', { value: 123 })
emit('submit', { email: 'test@example.com' })
</script>
```

### 10.4 自定义指令 API 变更

```javascript
// Vue 2 自定义指令
// Vue.directive('focus', {
//   bind(el, binding, vnode) { ... },      // 指令第一次绑定
//   inserted(el, binding, vnode) { ... },  // 元素插入父节点时
//   update(el, binding, vnode, oldVnode) { ... },  // 组件更新时
//   componentUpdated(el, binding, vnode, oldVnode) { ... },
//   unbind(el, binding, vnode) { ... }     // 指令解绑时
// })


// Vue 3 自定义指令（简化版）
const vFocus = {
  mounted(el, binding) {
    // mounted: 元素插入父节点后调用（替代 bind + inserted）
    el.focus()
    
    // binding 对象属性：
    // - value: 指令绑定的值
    // - oldValue: 之前的值（仅在 update 和 componentUpdated 中可用）
    // - arg: 传给指令的参数（如 v-focus:arg 中的 'arg'）
    // - modifiers: 包含修饰符的对象（如 v-focus.foo.bar 中的 { foo: true, bar: true }）
    // - dir: 指令对象
    // - instance: 使用指令的组件实例
  },
  
  updated(el, binding) {
    // updated: 组件更新后调用（替代 update + componentUpdated）
  },
  
  unmounted(el) {
    // unmounted: 指令解绑时调用（替代 unbind）
  }
}

// 注册全局自定义指令
app.directive('focus', vFocus)

// 注册局部自定义指令（在 SFC 中）
<script setup>
const vFocus = {
  mounted(el) {
    el.focus()
  }
}
</script>

// 使用
<input v-focus />
<input v-focus.auto-focus />  <!-- 带修饰符 -->
<div v-color="colorValue" />  <!-- 带值 -->
<div v-position:bottom="positionValue" />  <!-- 带参数 -->
```

#### 自定义指令示例

```javascript
// 权限指令：根据权限控制元素显示
const vPermission = {
  mounted(el, binding) {
    const { value } = binding
    const permissions = getUserPermissions()
    
    if (value && !permissions.includes(value)) {
      // 没有权限则移除元素
      el.parentNode?.removeChild(el)
    }
  }
}

// 使用
<button v-permission="'user:create'">创建用户</button>


// 防抖点击指令
const vDebounce = {
  mounted(el, binding) {
    let timer
    const delay = binding.value || 300
    
    el.addEventListener('click', () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        // 触发原始点击事件
        el.dispatchEvent(new Event('debounce-click'))
      }, delay)
    })
  },
  
  unmounted(el) {
    // 清理事件监听
  }
}

// 使用
<button v-debounce="500" @debounce-click="handleSubmit">提交</button>
```

### 10.5 Tree-shaking 支持

```javascript
// Vue 3 支持 Tree-shaking（摇树优化）
// 未使用的功能会在打包时被移除，减小最终包体积

// ✅ 按需导入（支持 Tree-shaking）
import { createApp, ref, computed, onMounted } from 'vue'

// 如果你的项目中只用了这些 API，
// 那么 Transition、KeepAlive、Teleport 等未使用的功能不会被打包

// Vue 3 内置组件也支持 Tree-shaking
import { Transition, KeepAlive, Teleport, Suspense } from 'vue'

// 按需注册内置指令
app.directive('focus', focusDirective)

// 未使用的内置组件/指令/过滤器不会被打包进去
// 例如：如果没用 v-model，相关代码就不会被打包
```

---

## 第11章：性能优化

### 11.1 v-memo（记忆化）

```vue
<template>
  <div>
    <!-- 
      v-memo: 缓存子树，当依赖项不变时跳过更新
      适用于：大型列表渲染、复杂计算的场景
      
      语法：v-memo="[dependency1, dependency2, ...]"
      传入空数组 v-memo="[]" 相当于 v-once
    -->
    
    <!-- 示例：大型列表优化 -->
    <div v-for="item in list" :key="item.id" v-memo="[item.id === selectedId]">
      <!-- 
        只有当 item.id === selectedId 的结果变化时才更新
        其他属性变化不会触发此元素的更新
      -->
      <span>{{ item.name }}</span>
      <span>{{ item.description }}</span>
      <span v-memo="[item.price]">价格：{{ item.price }}</span>
    </div>
    
    <!-- v-once：只渲染一次 -->
    <div v-once>
      {{ staticContent }}  <!-- 内容不再更新 -->
    </div>
  </div>
</template>
```

### 11.2 虚拟滚动

```vue
<template>
  <!-- 
    虚拟滚动：只渲染可视区域内的列表项
    适用于：大数据量列表（成千上万条数据）
    
    推荐库：vue-virtual-scroller、vue-virtual-scroll-grid
  -->
  
  <RecycleScroller
    class="scroller"
    :items="hugeList"
    :item-size="50"
    key-field="id"
    v-slot="{ item }"
  >
    <div class="item">{{ item.name }}</div>
  </RecycleScroller>
</template>

<script setup>
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const hugeList = ref(Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  description: `Description for item ${i}`
})))
</script>

<style>
.scroller {
  height: 400px;  /* 固定高度 */
}

.item {
  height: 50px;  /* 每项固定高度 */
  line-height: 50px;
}
</style>
```

### 11.3 函数式组件

```vue
<!-- 
  Vue 3 中函数式组件的变化：
  - Vue 2: 函数式组件性能更高（无状态、无实例）
  - Vue 3: 普通组件性能已经很好，函数式组件优势不明显
  - Vue 3 中函数式组件只是一个返回 JSX/H 函数的简单函数
-->

<!-- 函数式组件（Vue 3 风格） -->
<script>
import { h } from 'vue'

// 函数式组件就是一个函数
export default function Heading(props, context) {
  // props: 传入的属性
  // context: { slots, attrs, emit, expose }
  
  return h(`h${props.level}`, context.attrs, context.slots.default())
}

Heading.props = {
  level: {
    type: Number,
    required: true
  }
}
</script>

<!-- 使用 -->
<Heading :level="1">标题</Heading>
<Heading :level="2">副标题</Heading>
```

### 11.4 KeepAlive 缓存策略

```vue
<template>
  <!-- 
    KeepAlive 缓存策略优化：
    - include: 只缓存匹配的组件
    - exclude: 不缓存匹配的组件
    - max: 最大缓存实例数量（LRU 淘汰策略）
  -->
  
  <!-- 基础用法 -->
  <keep-alive>
    <component :is="currentTab" />
  </keep-alive>
  
  <!-- 缓存指定组件（支持字符串、正则、数组） -->
  <keep-al :include="['HomeView', 'AboutView']">
    <router-view />
  </keep-alive>
  
  <!-- 排除指定组件 -->
  <keep-al :exclude="/Detail/" exclude="DetailView">
    <router-view />
  </keep-alive>
  
  <!-- 限制最大缓存数量（LRU 最近最少使用淘汰） -->
  <keep-al :max="10">
    <router-view />
  </keep-alive>
</template>

<script setup>
// 被缓存的组件生命周期
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 组件被激活（从缓存恢复）时
  // 适合：刷新数据、恢复滚动位置
  console.log('组件被激活')
  refreshData()
})

onDeactivated(() => {
  // 组件被停用（进入缓存）时
  // 适合：暂停定时器、保存状态
  console.log('组件被停用')
  pauseTimer()
})
</script>
```

### 11.5 长列表优化

```vue
<template>
  <div>
    <!-- 
      长列表优化策略：
      1. 虚拟滚动（最有效）
      2. 分页加载
      3. 分批渲染（requestAnimationFrame）
      4. v-memo 缓存
      5. 冻结数据（Object.freeze）
    -->
    
    <!-- 策略1：分页加载 -->
    <div class="list">
      <div v-for="item in pagedItems" :key="item.id" class="item">
        {{ item.name }}
      </div>
    </div>
    <button @loadMore" :disabled="loading">
      {{ loading ? '加载中...' : '加载更多' }}
    </button>
    
    <!-- 策略2：冻结数据（不需要响应式的数据） -->
    <div v-for="item in frozenList" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ========== 分页加载 ==========
const allItems = ref([])
const pageSize = 20
const currentPage = ref(1)
const loading = ref(false)

const pagedItems = computed(() => {
  return allItems.value.slice(0, pageSize * currentPage.value)
})

async function loadMore() {
  loading.value = true
  // 模拟请求
  const newItems = await fetchMoreData(currentPage.value)
  allItems.value.push(...newItems)
  currentPage.value++
  loading.value = false
}

// ========== 冻结数据 ==========
// 对于纯展示的大列表，不需要响应式
const frozenList = ref(Object.freeze(largeDataSet))

// frozenList 的属性变化不会触发视图更新
// 但可以显著降低内存占用和提高渲染性能
</script>
```

#### 其他性能优化技巧

```javascript
// 1. 使用 ShallowRef 处理大型数据
const bigData = shallowRef(null)

// 只在整体替换时触发更新
fetchBigData().then(data => {
  bigData.value = data  // ✅ 触发更新
})
// bigData.value.items.push(...)  // ❌ 不触发更新

// 2. 合理使用 computed 缓存计算结果
const expensiveComputed = computed(() => {
  // 这个函数只会在依赖变化时执行
  return hugeArray.value.filter(/* 复杂过滤 */).map(/* 复杂转换 */)
})

// 3. 避免不必要的响应式转换
// ❌ 不必要的响应式
const config = reactive({
  apiUrl: 'https://api.example.com',
  timeout: 5000
  // 这些配置通常不会变，不需要响应式
})

// ✅ 使用普通对象
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
}

// 4. 使用 v-once 静态化不变内容
// <div v-once>{{ staticContent }}</div>

// 5. 图片懒加载
// <img v-lazy="imageUrl" alt="" />

// 6. 路由懒加载
// const Home = () => import('./views/Home.vue')
```

---

## 第12章：工程化实践

### 12.1 Vite 构建工具

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  // 插件
  plugins: [vue()],
  
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,                // 启动时自动打开浏览器
    cors: true,
    proxy: {
      // 代理配置（解决开发环境跨域问题）
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  // 构建配置
  build: {
    outDir: 'dist',           // 输出目录
    assetsDir: 'assets',      // 静态资源目录
    sourcemap: false,         // 是否生成 sourcemap
    minify: 'esbuild',        // 压缩方式：esbuild | terser
    chunkSizeWarningLimit: 1000,  // chunk 大小警告阈值（KB）
    rollupOptions: {
      output: {
        // 手动分包
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'ui-element': ['element-plus']
        }
      }
    }
  },
  
  // 路径别名配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  },
  
  // CSS 配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`  // 全局注入变量
      }
    }
  },
  
  // 环境变量前缀
  envPrefix: 'VITE_'
})
```

#### Vite 常用命令

```bash
# 开发
npm run dev          # 启动开发服务器

# 构建
npm run build        # 生产环境构建
npm run preview      # 预览生产构建

# 类型检查
npm run type-check   # TypeScript 类型检查

# 代码检查
npm run lint         # ESLint 检查
npm run format       # Prettier 格式化
```

### 12.2 单文件组件 (SFC)

```vue
<!-- 
  单文件组件 (Single File Component) 结构：
  - <template>: 模板（最多一个根元素或 Fragment）
  - <script> / <script setup>: 脚本逻辑
  - <style>: 样式（可有多个，scoped 限定作用域）
-->

<template>
  <!-- 
    模板部分：
    - 使用 Vue 模板语法
    - 支持完整的 HTML5
    - 可使用组件标签
  -->
  <div class="component">
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>

<!-- 
  <script setup> 特性：
  - 更简洁的语法
  - 导入的组件自动注册
  - 顶层变量/函数自动暴露给模板
  - 支持 TypeScript
  - 支持 Props/Emits 的类型声明
-->
<script setup lang="ts">
// TypeScript 支持
interface Props {
  title: string
  count?: number
}

// 带 TS 类型注解的 Props
const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// Emits 类型声明
const emit = defineEmits<{
  (e: 'update', value: number): void
  (e: 'delete', id: string): void
}>()

// 响应式数据
const count = ref(props.count)

// 方法
const increment = () => {
  count.value++
  emit('update', count.value)
}
</script>

<!-- 
  样式部分：
  - scoped: 样式只作用于当前组件
  - module: CSS Modules 模式
  - 可使用预处理器（SCSS/Less/Stylus）
-->
<style scoped>
.component {
  padding: 16px;
  border-radius: 8px;
}

h2 {
  color: #42b983;
}
</style>

<!-- 全局样式（不带 scoped） -->
<style>
/* 全局样式定义 */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
</style>
```

#### SFC 自定义块

```vue
<template>
  <div>...</div>
</template>

<script setup>
// 可以通过自定义块添加额外信息
// 如：docs、i18n、route 等
</script>

<!-- 自定义块：文档注释 -->
<docs>
  ## Component Description
  This is a description of the component.
</docs>

<!-- 自定义块：国际化 -->
<i18n>
{
  "en": {
    "welcome": "Welcome"
  },
  "zh": {
    "welcome": "欢迎"
  }
}
</i18n>
```

### 12.3 TypeScript 集成

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "noEmit": true,
    
    // 路径别名
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    },
    
    // Vue 相关
    "types": ["vite/client"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "env.d.ts"
  ],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

```typescript
// src/env.d.ts - Vue 文件的类型声明
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

// 环境变量类型增强
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

#### TypeScript 最佳实践

```vue
<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'

// 1. 明确定义 ref 的类型
const count: Ref<number> = ref(0)
const message = ref<string>('hello')

// 2. 接口定义 Props
interface UserProps {
  id: number
  name: string
  avatar?: string
  roles?: string[]
}

const props = withDefaults(defineProps<UserProps>(), {
  avatar: '',
  roles: () => []
})

// 3. 类型化的 Emits
const emit = defineEmits<{
  'update:user': [value: string]
  delete: [id: number]
}>()

// 4. Computed 返回类型
const fullName = computed<string>(() => {
  return `${props.firstName} ${props.lastName}`
})

// 5. 泛型组件
// 定义泛型组件（Vue 3.3+）
// function useList<T>(initial: T[]) { ... }
</script>
```

### 12.4 环境变量

```bash
# .env                # 所有环境都会加载
# .env.local          # 所有环境都会加载，但被 git 忽略
# .env.development    # development 模式加载
# .env.production     # production 模式加载

# 环境变量必须以 VITE_ 开头才能在代码中访问
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=我的应用
VITE_ENABLE_DEBUG=true
```

```javascript
// 使用环境变量
// src/config/index.js
export const config = {
  // 通过 import.meta.env 访问
  apiUrl: import.meta.env.VITE_API_BASE_URL,
  appName: import.meta.env.VITE_APP_TITLE,
  isDev: import.meta.env.DEV,           // 开发环境为 true
  isProd: import.meta.env.PROD,         // 生产环境为 true
  isSSR: import.meta.env.SSR,           // SSR 环境为 true
  mode: import.meta.env.MODE            // 当前模式
}

// 封装 API 请求
const apiClient = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000
})
```

### 12.5 代码规范 ESLint + Prettier

```javascript
// .eslintrc.cjs
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',       // Vue 3 基本规则
    'eslint:recommended',
    '@vue/eslint-config-typescript',   // TypeScript 规则
    '@vue/eslint-config-prettier/skip-formatting'  // 与 Prettier 配合
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // 自定义规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',  // 关闭组件名多词要求
    'vue/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  }
}
```

```javascript
// .prettierrc
{
  "semi": false,                    // 不使用分号
  "singleQuote": true,              // 使用单引号
  "tabWidth": 2,                    // 缩进 2 格
  "trailingComma": "none",          // 尾逗号
  "printWidth": 100,                // 行宽 100
  "bracketSpacing": true,           // 对象括号空格
  "arrowParens": "avoid",           // 箭头函数单参数不加括号
  "endOfLine": "lf",                // 换行符
  "vueIndentScriptAndStyle": false  // Vue script/style 不缩进
}
```

```json
// package.json scripts
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix",
    "format": "prettier --write src/",
    "type-check": "vue-tsc --noEmit"
  }
}
```

---

## 第13章：最佳实践与常见陷阱

### 13.1 命名规范

```javascript
// ========== 组件命名 ==========
// ✅ 推荐：多单词，PascalCase
// components/UserProfile.vue
// components/SearchResultList.vue

// ❌ 避免：单单词
// components/User.vue
// components/Button.vue

// ========== 文件命名 ==========
// 基础组件：BaseButton.vue、BaseIcon.vue、BaseInput.vue
// 单例组件：TheHeader.vue、TheSidebar.vue、TheFooter.vue
// 紧密耦合组件：TodoList.vue、TodoListItem.vue、TodoListButton.vue


// ========== 变量命名 ==========
// 响应式变量：使用描述性名称
const userList = ref([])           // ✅ 清晰
const list = ref([])               // ❌ 太模糊

// 布尔值：使用 is/has/can/should 前缀
const isVisible = ref(false)       // ✅
const visible = ref(false)         // ❌ 不够清晰
const hasPermission = ref(false)   // ✅

// 函数：动词开头， camelCase
const getUserData = () => {}       // ✅
const fetchData = async () => {}   // ✅
const handle_submit = () => {}     // ❌ 不要用下划线


// ========== 常量命名 ==========
// 常量：UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3
const API_BASE_URL = 'https://api.example.com'


// ========== 事件命名 ==========
// 自定义事件：kebab-case
emit('update-user')        // ✅
emit('updateUser')         // ❌
emit('update_user')        // ❌

// v-model 事件：update:xxx
emit('update:modelValue')
emit('update:title')


// ========== Props 命名 ==========
// Props：camelCase（JS），kebab-case（模板）
// 定义
defineProps({
  greetingText: String      // camelCase
})
// 使用
<MyComponent greeting-text="hello" />  <!-- kebab-case -->
```

### 13.2 组件设计原则

```vue
<!-- ========== 原则1：单一职责原则 ========== -->
<!-- 每个组件只做一件事 -->

<!-- ❌ 反例：一个组件做了太多事 -->
<!-- UserProfile.vue -->
<template>
  <div>
    <UserInfo />          <!-- 用户信息 -->
    <UserPosts />         <!-- 用户文章 -->
    <UserSettings />      <!-- 用户设置 -->
    <UserNotifications /> <!-- 用户通知 -->
  </div>
</template>

<!-- ✅ 正例：拆分为独立组件 -->
<!-- UserProfile.vue - 只负责布局 -->
<template>
  <div class="profile">
    <UserInfo />
    <UserPosts />
    <UserSettings />
    <UserNotifications />
  </div>
</template>


<!-- ========== 原则2：Props 向下，Events 向上 ========== -->
<!-- 父子组件通信遵循单向数据流 -->

<!-- Parent.vue -->
<template>
  <ChildComponent
    :items="data"           <!-- Props 向下传递 -->
    @update="handleUpdate"  <!-- Events 向上传递 -->
  />
</template>


<!-- ========== 原则3：合理控制组件粒度 ========== -->

<!-- 太细：过度拆分，增加复杂度 -->
<!-- <UserAvatarImage />
<UserAvatarBorder />
<UserAvatarStatus /> -->

<!-- 太粗：组件太大，难以维护 -->
<!-- <UserProfileWithPostsAndSettingsAndNotifications /> -->

<!-- 适中：功能相关的放一起 -->
<!-- <UserAvatar />  包含图片、边框、状态 -->


<!-- ========== 原则4：状态提升 ========== -->
<!-- 
  当多个组件需要共享状态时，
  将状态提升到它们的共同父组件
-->

<!-- ✅ 状态提升到父组件 -->
<template>
  <div>
    <SearchInput v-model="searchQuery" />
    <SearchResults :query="searchQuery" />
    <SearchFilters v-model="filters" />
  </div>
</template>


<!-- ========== 原则5：关注点分离 ========== -->
<template>
  <!-- 模板：只关心 UI 结构 -->
  <div class="todo-list">
    <TodoItem
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @toggle="toggleTodo"
      @delete="deleteTodo"
    />
  </div>
</template>

<script setup>
// 脚本：只关心业务逻辑
import { computed } from 'vue'
import TodoItem from './TodoItem.vue'

const props = defineProps({
  todos: { type: Array, required: true }
})

const emit = defineEmits(['toggle', 'delete'])

const filteredTodos = computed(() => /* 过滤逻辑 */)

function toggleTodo(id) { /* 切换逻辑 */ }
function deleteTodo(id) { /* 删除逻辑 */ }
</script>

<style scoped>
/* 样式：只关心外观 */
.todo-list {
  /* 样式代码 */
}
</style>
```

### 13.3 常见 Bug 及解决方案

#### 问题1：响应式数据更新但视图不刷新

```javascript
// ❌ 问题代码
const state = reactive({
  items: []
})

// 直接通过索引修改数组 - 不会触发更新
state.items[0] = 'new value'        // ❌ 不响应
state.items.length = 0              // ❌ 不响应

// 添加新属性到对象 - Vue 2 中不响应（Vue 3 中可以）
// state.newProp = 'value'           // Vue 2 ❌ | Vue 3 ✅

// ✅ 解决方案
// 数组：使用响应式方法
state.items.splice(0, 1, 'new value')  // ✅
state.items.length = 0                   // ✅（Vue 3）

// 或整体替换
state.items = [...state.items]           // ✅

// 对象：使用 reactive 或展开
const newObj = { ...state.obj, newProp: 'value' }  // ✅
state.obj = newObj
```

#### 问题2：解构 reactive 丢失响应性

```javascript
const state = reactive({
  count: 0,
  name: 'test'
})

// ❌ 解构后丢失响应性
const { count, name } = state
count++  // 不会触发更新

// ✅ 解决方案1：使用 toRefs
const { count, name } = toRefs(state)
count.value++  // ✅ 响应式

// ✅ 解决方案2：直接访问
state.count++  // ✅ 响应式

// ✅ 解决方案3：改用 ref
const count = ref(0)
const name = ref('test')
```

#### 问题3：watch 不触发

```javascript
const count = ref(0)
const obj = reactive({ nested: { count: 0 } })

// ❌ 问题1：监听 ref 时忘记 .value
watch(count, cb)           // ✅ 正确（Vue 3 自动解包）
watch(count.value, cb)     // 也正确

// ❌ 问题2：reactive 对象需要用函数返回属性
watch(obj.nested.count, cb)  // ❌ 不工作
watch(() => obj.nested.count, cb)  // ✅ 正确

// ❌ 问题3：deep 选项问题
watch(obj, cb)             // ❌ 默认不深层监听
watch(obj, cb, { deep: true })  // ✅ 深层监听

// ❌ 问题4：immediate 不生效
watch(source, cb, { immediate: true })  // ✅ 立即执行一次
```

#### 问题4：v-for 与 v-if 优先级问题

```vue
<template>
  <!-- ❌ 不推荐：v-if 优先级高于 v-for -->
  <!-- v-if 无法访问 v-for 中的变量 -->
  <li v-for="user in users" v-if="user.active">
    {{ user.name }}
  </li>
  
  <!-- ✅ 推荐方案1：使用计算属性过滤 -->
  <li v-for="user in activeUsers" :key="user.id">
    {{ user.name }}
  </li>
  
  <!-- ✅ 推荐方案2：使用 <template> 包裹 -->
  <template v-for="user in users" :key="user.id">
    <li v-if="user.active">{{ user.name }}</li>
  </template>
</template>

<script setup>
const users = ref([...])
const activeUsers = computed(() => users.value.filter(u => u.active))
</script>
```

#### 问题5：异步操作中的状态问题

```javascript
// ❌ 问题：在异步操作中使用过期状态
const userId = ref(1)

watch(userId, async (newId) => {
  const res = await fetch(`/api/users/${newId}`)
  // 此时 userId 可能已经变了！
  // 可能导致数据显示不一致
  userInfo.value = await res.json()
})

// ✅ 解决方案：使用标志位或 AbortController
watch(userId, async (newId) => {
  let cancelled = false
  
  const res = await fetch(`/api/users/${newId}`)
  
  if (!cancelled) {  // 检查是否仍然需要
    userInfo.value = await res.json()
  }
  
  // cleanup 函数
  return () => { cancelled = true }
})

// ✅ 更好的解决方案：AbortController
watch(userId, async (newId, _, onCleanup) => {
  const controller = new AbortController()
  
  onCleanup(() => controller.abort())  // 变化时取消请求
  
  try {
    const res = await fetch(`/api/users/${newId}`, {
      signal: controller.signal
    })
    userInfo.value = await res.json()
  } catch (e) {
    if (e.name !== 'AbortError') {
      console.error(e)
    }
  }
})
```

#### 问题6：内存泄漏

```javascript
// ❌ 常见泄漏场景

// 1. 定时器未清理
onMounted(() => {
  setInterval(() => { /* ... */ }, 1000)  // ❌ 组件卸载后仍在运行
})

// 2. 事件监听未移除
onMounted(() => {
  window.addEventListener('resize', handleResize)  // ❌ 未移除
})

// 3. 订阅未取消
onMounted(() => {
  eventBus.on('some-event', handler)  // ❌ 未取消订阅
})

// ✅ 正确做法：在 onUnmounted 中清理
onMounted(() => {
  const timer = setInterval(() => { /* ... */ }, 1000)
  const handleResize = () => { /* ... */ }
  
  window.addEventListener('resize', handleResize)
  
  // 清理函数
  onUnmounted(() => {
    clearInterval(timer)
    window.removeEventListener('resize', handleResize)
  })
})

// ✅ 或使用 watchEffect 自动清理
watchEffect((onCleanup) => {
  const timer = setInterval(callback, 1000)
  onCleanup(() => clearInterval(timer))  // 自动清理
})
```

#### 问题7：this 指向问题（Options API）

```javascript
// ❌ 问题：箭头函数没有自己的 this
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    // 箭头函数的 this 指向外层作用域，不是 Vue 实例
    increment: () => {
      this.count++  // ❌ this 不是 Vue 实例
    },
    
    // setTimeout 回调中的 this
    startTimer() {
      setTimeout(function() {
        this.count++  // ❌ this 不是 Vue 实例
      }, 1000)
    }
  }
}

// ✅ 解决方案
export default {
  methods: {
    // 使用普通函数
    increment() {
      this.count++  // ✅
    },
    
    // 使用箭头函数（外层 this 就是 Vue 实例）
    startTimer() {
      setTimeout(() => {
        this.count++  // ✅ 箭头函数继承外层 this
      }, 1000)
    },
    
    // 或使用 bind/call/apply
    startTimer2() {
      setTimeout(function() {
        this.count++  // ✅
      }.bind(this), 1000)
    }
  }
}

// 💡 推荐使用 Composition API（setup）彻底避免 this 问题
```

---

## 附录：快速参考卡片

### 常用 API 速查

| API | 用途 | 示例 |
|-----|------|------|
| `ref()` | 基本类型响应式 | `const count = ref(0)` |
| `reactive()` | 对象响应式 | `const state = reactive({...})` |
| `computed()` | 计算属性 | `const dbl = computed(() => c*2)` |
| `watch()` | 监听特定源 | `watch(src, cb)` |
| `watchEffect()` | 自动追踪依赖 | `watchEffect(() => {...})` |
| `toRefs()` | 解构保持响应性 | `const {x,y} = toRefs(state)` |
| `defineProps()` | 定义 props | `defineProps<{n:number}>()` |
| `defineEmits()` | 定义事件 | `defineEmits(['update'])` |
| `defineExpose()` | 暴露公共方法 | `defineExpose({method})` |
| `provide/inject` | 依赖注入 | `provide('k',v)` / `inject('k')` |
| `nextTick()` | 下次 DOM 更新 | `await nextTick()` |

### 生命周期顺序

```
创建阶段：
  setup() → onBeforeMount() → onMounted()

更新阶段：
  onBeforeUpdate() → onUpdated()

卸载阶段：
  onBeforeUnmount() → onUnmounted()

KeepAlive 缓存：
  onDeactivated() → [缓存] → onActivated()
```

### 常用指令速查

| 指令 | 说明 | 示例 |
|------|------|------|
| `v-text` | 更新 textContent | `<div v-text="msg">` |
| `v-html` | 更新 innerHTML | `<div v-html="html">` |
| `v-show` | 切换 display | `<div v-show="ok">` |
| `v-if` | 条件渲染 | `<div v-if="ok">` |
| `v-else` | 否则分支 | `<div v-else>` |
| `v-else-if` | 否则如果 | `<div v-else-if="ok">` |
| `v-for` | 循环渲染 | `<div v-for="i in list">` |
| `v-on` | 事件绑定 | `<div @click="fn">` |
| `v-bind` | 属性绑定 | `<div :id="id">` |
| `v-model` | 双向绑定 | `<input v-model="val">` |
| `v-pre` | 跳过编译 | `<div v-pre>` |
| `v-cloak` | 隐藏未编译 | `<div v-cloak>` |
| `v-once` | 只渲染一次 | `<div v-once>` |
| `v-memo` | 缓存子树 | `<div v-memo="[dep]">` |
| `v-slot` | 插槽内容 | `<template #default>` |

---

> **文档维护**：本文档随 Vue.js 版本更新持续完善。如有疑问或建议，欢迎反馈。
> 
> **学习资源**：
> - [Vue.js 官方文档](https://cn.vuejs.org/)
> - [Vue Router 文档](https://router.vuejs.org/zh/)
> - [Pinia 文档](https://pinia.vuejs.org/zh/)
> - [Vite 文档](https://cn.vitejs.dev/)
