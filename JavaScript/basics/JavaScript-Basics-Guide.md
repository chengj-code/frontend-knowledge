# JavaScript 基础知识点指南

> **版本**: 1.0 | **更新日期**: 2026-06-14 | **适用范围**: ES3 - ES2024

---

## 目录 (Table of Contents)

- [第1章：JavaScript 概述](#第1章javascript-概述)
- [第2章：变量与数据类型](#第2章变量与数据类型)
- [第3章：运算符与表达式](#第3章运算符与表达式)
- [第4章：流程控制](#第4章流程控制)
- [第5章：函数进阶](#第5章函数进阶)
- [第6章：对象与原型链](#第6章对象与原型链)
- [第7章：ES6+ 类（Class）](#第7章es6-类class)
- [第8章：作用域与闭包](#第8章作用域与闭包)
- [第9章：异步编程](#第9章异步编程)
- [第10章：DOM 与 BOM](#第10章dom-与-bom)
- [第11章：数组方法大全](#第11章数组方法大全)
- [第12章：字符串与正则](#第12章字符串与正则)
- [第13章：Map/Set/WeakMap/WeakSet](#第13章mapsetweakmapweakset)
- [第14章：JSON 与数据序列化](#第14章json-与数据序列化)
- [第15章：错误处理与调试](#第15章错误处理与调试)
- [第16章：JavaScript 性能优化](#第16章javascript-性能优化)
- [第17章：ES2020-ES2024 新特性](#第17章es2020-es2024-新特性)

---

## 第1章：JavaScript 概述

### 1.1 JavaScript 历史

```
时间线：
1995 ── Brendan Eich 在 Netscape 用 10 天设计出 JavaScript（最初叫 Mocha → LiveScript）
1996 ── 微软在 IE 中实现 JScript（JavaScript 的克隆版）
1997 ── ECMA 国际组织制定 ECMAScript 标准（ES1）
1999 ── ES3 发布（加入 try/catch、正则等，被广泛支持）
2009 ── ES5 发布（严格模式、JSON、Array 方法等）
2015 ── ES6/ES2015 发布（重大更新：class、模块、箭头函数、Promise 等）
2016+ ── 每年发布一个新版本（ES2016~ES2024）
```

**关键里程碑：**

| 版本 | 年份 | 核心特性 |
|------|------|----------|
| ES1 | 1997 | 首次标准化 |
| ES3 | 1999 | try/catch、正则、switch |
| ES5 | 2009 | 严格模式、JSON、Array 方法、Object 方法 |
| ES6/ES2015 | 2015 | class、模块化、箭头函数、Promise、let/const、解构、模板字符串 |
| ES2016 | 2016 | Array.prototype.includes、指数运算符 ** |
| ES2017 | 2017 | async/await、Object.values/entries、String padding |
| ES2018 | 2018 | 异步迭代、Promise.finally、Rest/Spread 属性 |
| ES2019 | 2019 | Array.prototype.flat/flatMap、Object.fromEntries、trimStart/End |
| ES2020 | 2020 | 可选链 ??.、空值合并 ??、BigInt、dynamic import |
| ES2021 | 2021 | 逻辑赋值运算符、Promise.any、数字分隔符、replaceAll |
| ES2022 | 2022 | 顶层 await、at()、Object.hasOwn、Error.cause、私有字段 |
| ES2023 | 2023 | findLast/findLastIndex、Hashbang、Change Array by copy |
| ES2024 | 2024 | Promise.withResolvers、Object.groupBy、RegExp v flag |

### 1.2 JS 在浏览器与 Node.js 中的角色

```javascript
// ==================== 浏览器环境 ====================
// JavaScript 在浏览器中主要负责：
// 1. DOM 操作 - 操作页面结构和样式
// 2. 事件处理 - 用户交互响应
// 3. 网络请求 - AJAX/Fetch API
// 4. 本地存储 - localStorage/sessionStorage
// 5. 动画与多媒体 - Canvas/WebGL/Web Audio

// 浏览器提供的全局对象是 window
console.log(window === this); // true（在全局作用域中）

// ==================== Node.js 环境 ====================
// JavaScript 在 Node.js 中主要用于：
// 1. 服务器端开发 - HTTP 服务、API 接口
// 2. 文件系统操作 - fs 模块
// 3. 数据库操作 - 通过驱动连接数据库
// 4. 命令行工具 - CLI 开发
// 5. 构建工具 - webpack/vite/rollup 等
```

### 1.3 JavaScript 特性概览

```javascript
// ========== 特性 1: 动态类型 ==========
let dynamic = 42;          // Number
dynamic = "hello";         // String
dynamic = true;            // Boolean
dynamic = { key: "value" }; // Object

// ========== 特性 2: 单线程 ==========
console.log("1");           // 同步执行
setTimeout(() => {
  console.log("2");         // 异步宏任务
}, 0);
console.log("3");           // 同步执行
// 输出顺序: 1 -> 3 -> 2

// ========== 特性 3: 事件驱动 ==========
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();
emitter.on('event', () => console.log('事件触发了！'));
emitter.emit('event');

// ========== 特性 4: 原型继承 ==========
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  console.log(`${this.name} 发出了声音`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog = new Dog("旺财", "金毛");
dog.speak(); // 旺财 发出了声音
```

---

#### 本章要点速查

| 要点 | 关键词 |
|------|--------|
| 创始人 | Brendan Eich, Netscape, 1995 |
| 标准化 | ECMAScript (ECMA International) |
| 重大版本 | ES3(1999), ES5(2009), ES6/ES2015(2015) |
| 运行环境 | 浏览器(window), Node.js(global) |
| 核心特性 | 动态类型、单线程、事件驱动、原型继承 |

---

## 第2章：变量与数据类型

### 2.1 变量声明：var / let / const

```javascript
// ==================== var 的特性 ====================
// 1. 函数作用域（非块级作用域）
function varExample() {
  if (true) {
    var x = 10;  // var 不受块级作用域限制
  }
  console.log(x); // 10 - 可以访问到 if 块内的变量
}

// 2. 变量提升（Hoisting）- 声明提升到函数顶部
console.log(y);  // undefined（不是报错！因为提升了声明）
var y = 20;

// 3. 允许重复声明
var z = 1;
var z = 2;        // 不会报错，静默覆盖

// 4. 全局声明会成为 window 对象的属性
var globalVar = "我是全局的";
console.log(window.globalVar); // "我是全局的"

// ==================== let 的特性 ====================
// 1. 块级作用域
{
  let a = 100;
  console.log(a); // 100
}
// console.log(a); // ReferenceError: a is not defined

// 2. 暂时性死区（TDZ）
// console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 200;

// 3. 不允许重复声明
let c = 1;
// let c = 2;     // SyntaxError: Identifier 'c' has already been declared

// 4. 全局声明不会成为 window 的属性
let globalLet = "我是 let 全局的";
console.log(window.globalLet); // undefined

// ==================== const 的特性 ====================
// 1. 具有 let 的所有特性（块级作用域、TDZ、不可重复声明）
// 2. 必须初始化
const d = 300;

// 3. 对于基本类型：值不可变
const PI = 3.14159;
// PI = 3.14;     // TypeError

// 4. 对于引用类型：引用地址不可变，但内容可修改
const arr = [1, 2, 3];
arr.push(4);      // ✅ 合法
// arr = [5, 6];  // ❌ 非法

// ==================== 三者对比表 ====================
/*
┌─────────┬──────────────┬────────────┬────────────┐
│ 特性     │     var      │    let     │   const    │
├─────────┼──────────────┼────────────┼────────────┤
│ 作用域   │ 函数作用域    │ 块级作用域  │ 块级作用域  │
│ 提升     │ 声明提升      │ TDZ        │ TDZ        │
│ 重复声明 │ ✅ 允许       │ ❌ 禁止     │ ❌ 禁止     │
│ 全局属性 │ 是 window    │ 否         │ 否         │
│ 初始化   │ 可选         │ 可选        │ 必须        │
│ 推荐     │ ❌ 避免       │ 需要重新赋值 │ 默认首选    │
└─────────┴──────────────┴────────────┴────────────┘
*/
```

### 2.2 数据类型体系

```javascript
// ==================== 类型系统总览 ====================
/*
                    JavaScript 类型
                         │
            ┌────────────┴────────────┐
            │                         │
        原始类型                   对象类型
   (Primitive)                  (Object)
            │                         │
   ┌────────┼────────┐               │
Undefined Boolean Null      Array Function
 Number  BigInt String      Date    RegExp
          Symbol             Map/Set  ...
*/

// ==================== 7 种原始类型 ====================

// 1. Undefined - 变量已声明但未赋值
let undeclared;
console.log(typeof undeclared); // "undefined"

// 2. Null - 表示"无"的对象引用
let empty = null;
console.log(typeof empty);       // "object" ⚠️ 著名 bug

// 3. Boolean - 逻辑真假值
let isTrue = true;

// 4. Number - 双精度 64 位浮点数
let integer = 42;
let hex = 0xFF;                 // 255
let notANumber = NaN;
console.log(0.1 + 0.2);        // 0.30000000000000004（浮点精度问题）

// 5. BigInt - 任意精度整数（ES2020）
let bigNum = 9007199254740991n;

// 6. String - 文本数据
let template = `模板字符串 ${1 + 2}`;
let emoji = "🎉";

// 7. Symbol - 唯一且不可变的值（ES6）
let sym1 = Symbol("描述");
let sym2 = Symbol("描述");
console.log(sym1 === sym2);  // false - 每个 Symbol 都是唯一的

// ==================== Object（对象类型）====================
let person = { name: "Bob", age: 30 };
let colors = ["red", "green", "blue"];
function greet() { return "Hello!"; }
```

### 2.3 类型转换规则

```javascript
// ==================== 显式类型转换 ====================
String(123);          // "123"
Number("123");        // 123
Boolean(0);           // false
!!value;              // 快速转布尔值

// ==================== 隐式类型转换规则 ====================
console.log(1 + "2");     // "12"（拼接）
console.log("" == 0);         // true
console.log(null == undefined);// true
console.log(NaN == NaN);      // false
console.log([] == ![]);       // true（经典面试题）
```

### 2.4 typeof 运算符

```javascript
typeof undefined;           // "undefined"
typeof null;                // "object" ⚠️ 历史遗留 bug
typeof {};                  // "object"
typeof [];                  // "object"（数组也是 object！）
typeof function(){};        // "function"

// 精确检测方案
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
getType(null);          // "Null" ← 正确识别了 null
getType([]);            // "Array"
```

### 2.5 instanceof 原理与限制

```javascript
// 原理：沿原型链向上查找 Constructor.prototype 是否在 obj 的原型链上
[] instanceof Array;   // true
[] instanceof Object;  // true
42 instanceof Number;  // false（基本类型总是返回 false）

// 最可靠检测
Array.isArray([]);  // true
```

### 2.6 Object.is() 与 === 的区别

```javascript
/*
┌──────────────────┬───────────┬────────────┐
│     表达式         │   ===     │ Object.is  │
├──────────────────┼───────────┼────────────┤
│ NaN === NaN       │  false    │   true     │
│ +0 === -0         │  true     │   false    │
│ 其他所有情况       │  相同     │   相同     │
└──────────────────┴───────────┴────────────┘
*/
```

### 2.7 值类型 vs 引用类型

```javascript
// 值类型：复制值
let num1 = 10;
let num2 = num1;
num2 = 20;
console.log(num1); // 10（不受影响）

// 引用类型：复制引用
let obj1 = { name: "Alice" };
let obj2 = obj1;
obj2.name = "Bob";
console.log(obj1.name); // "Bob"（被影响！）

// 深拷贝方法
let deep1 = JSON.parse(JSON.stringify(original)); // 有局限性
let deep2 = structuredClone(original);           // 现代推荐
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| var/let/const | 优先用 const，其次 let，避免 var |
| 7 种原始类型 | Undefined, Null, Boolean, Number, BigInt, String, Symbol |
| typeof null | 返回 "object"，用 toString 精确检测 |
| 类型转换 | 隐式转换复杂，建议始终使用 === |
| 值 vs 引用 | 原始类型存栈（值拷贝），对象存堆（引用拷贝） |

---

## 第3章：运算符与表达式

### 3.1 运算符分类

```javascript
// 13 类运算符总览：

// 1. 算术: + - * / % ** ++ --
// 2. 比较: > < >= <= == === != !==
// 3. 逻辑: && || !
// 4. 位: & | ^ ~ << >> >>>
// 5. 赋值: = += -= *= /= %= **= &&= ||= ??=
// 6. 字符串: + （拼接）、模板字符串
// 7. 条件: ? : （三元）
// 8. 逗号: , （从左到右，返回最后一个）
// 9. void: void 0 → undefined
// 10. in: 检查属性是否存在
// 11. delete: 删除对象属性
// 12. instanceof: 原型链检测
// 13. 可选链: ?. 安全访问嵌套
// 14. 空值合并: ?? null/undefined 时返回右侧

// 逻辑赋值运算符（ES2021）
user.age ||= 18;       // falsy 时赋值
user.id ??= "default"; // null/undefined 时赋值
```

### 3.2 运算符优先级表格

```
级别  运算符                           说明
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1    . [] () ?.                      成员访问、调用、可选链
 2    new                             new（带参数列表）
 3    ++ --                           后置递增/递减
 4    ! ~ + - ++ -- typeof void delete  一元运算符
 5    **                              幂运算（右结合）
 6    * / %                           乘除模
 7    + -                             加减
 8    << >> >>>                       移位
 9    < <= > >= in instanceof         关系比较
10    == != === !==                   相等性
11    &                               按位与
12    ^                               按位异或
13    |                               按位或
14    &&                              逻辑与
15    ||                              逻辑或
16    ??                              空值合并
17    ?:                               条件（三元）（右结合）
18    = += -= ...                     赋值
19    ,                               逗号
```

### 3.3 短路求值

```javascript
// && 短路：第一个为 falsy 则返回它
true && "hello";     // "hello"
false && "hello";    // false

// || 短路：第一个为 truthy 则返回它
false || "default";  // "default"

// ?? 短路：只对 null/undefined 触发默认值
0 ?? "default";          // 0 ✅
"" ?? "default";         // "" ✅
null ?? "default";       // "default"

// ?. 短路：遇 null/undefined 返回 undefined
user?.address?.city;     // undefined（安全）
```

### 3.4 空值合并 ?? 与逻辑或 || 的区别

```javascript
/*
┌──────────────┬──────────────────┬────────────────────┐
│     值        │  a || default    │  a ?? default     │
├──────────────┼──────────────────┼────────────────────┤
│ null/undefined│  default         │  default          │
│ false        │  false ✅        │  false ✅          │
│ 0            │  default ❌      │  0 ✅             │
│ ""           │  default ❌      │  "" ✅            │
└──────────────┴──────────────────┴────────────────────┘
*/
```

### 3.5 可选链操作符 ?.

```javascript
let city = user?.address?.city;           // 安全访问
let userName = user?.profile?.displayName ?? "匿名用户";

// 注意：不能用于赋值；对其他 falsy 值不短路
```

### 3.6 展开运算符 ...

```javascript
let merged = [...arr1, ...arr2];  // 数组合并
let clone = [...original];        // 克隆（浅拷贝）
let unique = [...new Set([1,2,2])]; // 去重
Math.max(...nums);              // 展开为参数
function sum(...args) {}         // 收集剩余参数
```

### 3.7 解构赋值

```javascript
let [first, , third] = [1, 2, 3];  // 跳过元素
let [x = 10] = [1];             // 默认值
let [head, ...tail] = [1, 2, 3]; // 剩余元素
[m, n] = [n, m];                // 交换变量

let { name: userName } = { name: "Bob" }; // 重命名
let { first, ...others } = { first: 1, second: 2 }; // 剩余属性

function createUser({ name, age = 18 }) {} // 函数参数解构
```

### 3.8 逗号运算符

```javascript
let result = (1, 2, 3, 4, 5); // 5（返回最后一个）
for (let i = 0, j = 10; i < 5; i++, j--) {} // 同时更新多个变量
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| 运算符优先级 | 成员 > 一元 > 算术 > 比较 > 逻辑 > 条件 > 赋值 > 逗号 |
| 短路求值 | \|\| 对 falsy 短路，?? 对 null/undefined 短路 |
| 可选链 ?. | 安全访问嵌套属性，遇 null/undefined 返回 undefined |
| 展开 ... | 数组合并、对象合并、剩余参数收集 |
| 解构 | 数组/对象/嵌套/默认值/剩余，配合函数参数强大 |
| ?? vs \|\| | ?? 只对 null/undefined 触发默认值 |

---

## 第4章：流程控制

### 4.1 条件语句

```javascript
if (score >= 90) { console.log("优秀"); }
else if (score >= 80) { console.log("良好"); }
else { console.log("不及格"); }

switch (day) {
  case 1: dayName = "周一"; break;
  case 6: case 7: dayName = "周末"; break;
  default: dayName = "无效";
}

let status = age >= 18 ? "成年" : "未成年";
```

### 4.2 循环语句

```javascript
// for / while / do-while / for-in / for-of

for (let key in person) { /* 遍历对象键 */ }
for (let color of colors) { /* 遍历可迭代值 */ }
for (let [index, value] of colors.entries()) {} // 同时获取索引

// label 控制嵌套循环
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outer;
  }
}
```

### 4.3 for...in vs for...of

```javascript
/*
┌──────────────┬──────────────────────┬──────────────────────┐
│    特性        │     for...in         │     for...of         │
├──────────────┼──────────────────────┼──────────────────────┤
│ 遍历目标      │ 对象的可枚举属性       │ 可迭代对象的值        │
│ 返回值        │ 键（字符串）          │ 值                   │
│ 适用对象      │ 普通 Object           │ Array/String/Map/Set │
│ 遍历原型链    │ ✅ 包含               │ ❌ 不包含            │
└──────────────┴──────────────────────┴──────────────────────┘
*/
```

### 4.4 异常处理

```javascript
try { riskyOperation(); } 
catch (error) { console.error(error.message); } 
finally { console.log("清理资源"); }

// catch 参数可省略（ES2019）
try { mightFail(); } catch { console.log("出错了"); }

throw new Error("消息");
throw new TypeError("类型错误");
```

### 4.5 错误对象层次结构

```javascript
/*
                    Error (基类)
                      │
        ┌─────────────┼─────────────┐
        │             │             │
    EvalError    RangeError   ReferenceError
        │        SyntaxError   TypeError
        │        URIError
        │
    AggregateError (ES2021)
*/
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| 条件语句 | if/else、switch（多分支）、三元（简单条件） |
| 循环 | for（计数）、while/do-while（条件）、for-of（迭代）、for-in（对象属性） |
| 异常处理 | try/catch/finally；catch 参数可省略 |
| Error 体系 | Error → TypeError/ReferenceError/SyntaxError/RangeError/AggregateError |

---

## 第5章：函数进阶

### 5.1 函数定义方式

```javascript
// 函数声明（提升）
function sayHello() {}

// 函数表达式（不提升）
const sayBye = function() {};

// 箭头函数（无 this/arguments/prototype）
const double = (x) => x * 2;
const createUser = (name, age) => ({ name, age });

// Generator 函数
function* idGenerator() { yield 1; yield 2; }

// 函数是一等公民（可赋值、传参、返回、存储）
```

### 5.2 this 指向的 4 种绑定规则

```javascript
/*
优先级：new > 显式(call/apply/bind) > 隐式(对象方法) > 默认(独立调用)
特殊：箭头函数继承外层 this
*/

showThis(); // Window / undefined（严格模式）
user.greet(); // this = user
introduce.call(person, "Hi");
const bound = introduce.bind(person);
const alice = new User("Alice"); // this = 新实例

// 箭头函数继承外层 this
const team = {
  showMembers() {
    this.members.forEach(member => console.log(member, this.name));
  }
};
```

### 5.3 call / apply / bind

```javascript
/*
┌──────────┬──────────────────────┬────────────────────┬────────────────────┐
│          │       call           │      apply         │      bind          │
├──────────┼──────────────────────┼────────────────────┼────────────────────┤
│ 调用方式  │ 立即调用             │ 立即调用            │ 返回新函数（延迟）  │
│ 传参方式  │ 逐个参数             │ 参数数组            │ 逐个参数            │
└──────────┴──────────────────────┴────────────────────┴────────────────────┘
*/

// 场景：call 借用方法
Array.prototype.slice.call(arguments);

// 场景：bind 柯里化
const double = multiply.bind(null, 2);
```

### 5.4 参数处理

```javascript
// 默认参数
function createUser(name, age = 18, city = "北京") {}

// 剩余参数
function sumAll(first, ...rest) {}

// arguments 对象（非箭头函数）
function showArgs() { console.log(Array.from(arguments)); }

// 参数解构
function displayUser({ name, age, city = "未知" }) {}
```

### 5.5 闭包原理与应用

```javascript
// 本质：闭包 = 函数 + 词法环境（Lexical Environment）

// 经典应用：

// 1. 模块模式
const Module = (function() {
  let privateVar = "private";
  return { get() { return privateVar; };
})();

// 2. 柯里化
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...more) => curried(...args, ...more);
  };
}

// 3. 防抖
function debounce(fn, delay = 300) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 4. 节流
function throttle(fn, interval = 300) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) { fn.apply(this, args); lastTime = now; }
  };
}

// 5. 缓存/Memoization
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

### 5.6 高阶函数

```javascript
numbers.map(n => n * 2);           // 映射
numbers.filter(n => n % 2 === 0);   // 过滤
numbers.reduce((acc, n) => acc + n, 0); // 归约
numbers.find(n => n > 3);          // 查找元素
numbers.some(n => n > 3);          // 是否存在
numbers.every(n => n > 0);         // 是否全部
numbers.sort((a, b) => a - b);     // 排序（原地修改！）
numbers.forEach((n, i) => {});     // 遍历

// 链式调用
const result = numbers.filter(n => n % 2 === 0).map(n => n * n).reduce((s, n) => s + n, 0);
```

### 5.7 纯函数与副作用

```javascript
// 纯函数：相同输入→相同输出，无副作用
function add(a, b) { return a + b; }

// 好处：可预测、可测试、可缓存、可并行

// 函数式原则：不可变性、隔离副作用、函数组合
const compose = (f, g) => x => f(g(x));
```

### 5.8 IIFE

```javascript
(function() { /* 独立作用域 */ })();
(() => { /* 箭头 IIFE */ })();
(function(name) { console.log(name); })("World");

// 现代替代：块级作用域 {}、let/const、ES Modules
```

### 5.9 Generator 函数

```javascript
function* numberGenerator() {
  yield 1; yield 2; yield 3;
}
const gen = numberGenerator();
gen.next(); // { value: 1, done: false }

// yield* 委托
function* outer() { yield "a"; yield* inner(); yield "c"; }

// 应用：无限序列、异步迭代、状态机
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) { yield curr; [prev, curr] = [curr, prev + curr]; }
}
```

### 5.10 async/await

```javascript
async function fetchData() {
  const response = await fetch("/api/data");
  return await response.json(); // 始终返回 Promise
}

// 错误处理
try { await riskyOp(); } catch (e) { /* 处理 */ }

// 并行 vs 串行
// 并行（快）：Promise.all([fetch1, fetch2, fetch3])
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| 函数定义 | 声明（提升）、表达式、箭头（无 this）、Generator |
| this 绑定 | new > 显式 > 隐式 > 默认；箭头函数继承外层 |
| call/apply/bind | call(逐参)/apply(数组)立即调用；bind 返回新函数 |
| 闭包 | 函数 + 词法环境；模块模式、柯里化、防抖节流、缓存 |
| 高阶函数 | map/filter/reduce/find/some/every/sort/forEach |
| async/await | Promise 语法糖；try/catch 错误处理；Promise.all 并行 |

---

## 第6章：对象与原型链

### 6.1 对象创建方式

```javascript
// 1. 字面量（最常用）
const person = { name: "Alice" };

// 2. Object.create()
const dog = Object.create(animal);

// 3. new 构造函数
function Car(brand) { this.brand = brand; }
Car.prototype.drive = function() {};

// 4. 工厂模式
function createUser(name) { return { name, greet() {} }; }

// 5. ES6 Class（推荐）
class Person { constructor(name) { this.name = name; } }
```

### 6.2 属性描述符

```javascript
// 属性描述符：value, writable, enumerable, configurable, get, set

Object.defineProperty(config, "version", {
  value: "1.0",
  writable: false,
  enumerable: true,
  configurable: false
});

// Getter/Setter
const account = {
  _balance: 0,
  get balance() { return this._balance; },
  set balance(v) { if (v >= 0) this._balance = v; }
};
```

### 6.3 属性遍历方式对比

```javascript
/*
┌────────────────────┬────────┬────────┬────────┬────────┐
│ 方法                │自身属性 │Symbol  │原型链  │不可枚举│
├────────────────────┼────────┼────────┼────────┼────────┤
│ for...in            │✅      │❌      │✅      │❌      │
│ Object.keys         │✅      │❌      │❌      │❌      │
│ Object.values       │✅      │❌      │❌      │❌      │
│ Object.entries      │✅      │❌      │❌      │❌      │
│ getOwnPropertyNames │✅      │❌      │❌      │✅      │
│ getOwnPropertySymbols│✅     │✅      │❌      │-       │
└────────────────────┴────────┴────────┴────────┴────────┘
*/
```

### 6.4 原型与原型链

```javascript
// 三角关系图：
/*
Function.prototype ←—— Function (构造函数)
  ↑ constructor        prototype
  │                     ↑
  └── Person.prototype ←—— Person (构造函数)
        constructor     prototype
        ↑                   ↑
        └── person 实例     __proto__
*/

// 原型链查找过程
person.toString(); 
// 1. 查找 person 自身 → 没有
// 2. 查找 Person.prototype → 没有
// 3. 查找 Object.prototype → 找到了！

person.hasOwnProperty("name");  // true（仅自身属性）
"name" in person;               // true（含原型链）
```

### 6.5 继承方案演进

```javascript
// 1. 原型链继承 → 2. 构造函数继承 → 3. 组合继承 → 4. 寄生组合继承 → 5. class extends

// 寄生组合继承（最佳 ES5 方案）
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

// ES6 class extends（推荐）
class Child extends Parent {
  constructor(name) { super(name); }
}
```

### 6.6 Object.create(null) 的用途

```javascript
// 创建纯净对象（无原型，无 toString 等方法）
const dict = Object.create(null);
dict.key = "value";
dict.toString; // undefined
// 用途：字典/Map 替代、消除原型链干扰
```

### 6.7 冻结与密封

```javascript
Object.freeze(obj);    // 冻结（不可增删改属性值）
Object.seal(obj);      // 密封（不可增删，但可改已有属性值）
Object.isFrozen(obj);  // 检测是否冻结
Object.isSealed(obj);  // 检测是否密封
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| 对象创建 | 字面量 > Object.create > new > 工厂 > Class |
| 属性描述符 | value/writable/enumerable/configurable/get/set |
| 原型链 | prototype/__proto__/constructor 三角关系 |
| 继承演进 | 原型链→构造函数→组合→寄生组合→class extends |
| 冻结/密封 | freeze（完全不可变）、seal（不可增删） |

---

## 第7章：ES6+ 类（Class）

### 7.1 class 语法

```javascript
class Person {
  species = "人类";           // 实例属性（新写法）
  #privateField = "私密";      // 私有字段（#）

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() { return `Hi, I'm ${this.name}`; }
  get info() { return `${this.name}, ${this.age}岁`; }
  
  static create(name) { return new Person(name); }  // 静态方法
  static species = "Homo sapiens";                // 静态属性
}
```

### 7.2 extends + super

```javascript
class Student extends Person {
  #studentId;

  constructor(name, age, studentId) {
    super(name, age);  // 必须先调用 super()
    this.#studentId = studentId;
  }

  greet() { return `${super.greet()} (学号: ${this.#studentId})`; }
}
```

### 7.3 静态属性和方法

```javascript
class MathUtil {
  static PI = 3.14159;
  static circleArea(radius) { return this.PI * radius * radius; }
}
MathUtil.circleArea(10); // 314.159

// 静态方法可以被继承
class AdvancedMath extends MathUtil {}
AdvancedMath.circleArea(5); // 可以调用
```

### 7.4 实例属性的新写法

```javascript
class MyClass {
  count = 0;                  // 公共字段
  #secret = "hidden";        // 私有字段（#）
  static type = "MyClass";    // 静态公共字段
  static #instanceCount = 0;  // 静态私有字段
}
```

### 7.5 new.target

```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error("Shape 是抽象类，不能直接实例化");
    }
  }
}
new Circle(); // OK
new Shape();  // Error
```

### 7.6 类与构造函数的关系

```javascript
// class 是构造函数的语法糖
// 区别：不提升、内部严格模式、方法不可枚举、必须 new、支持 # 私有字段
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| class 语法 | constructor/static/methods/getters/setters/private # |
| extends | 继承父类；constructor 中必须先调用 super() |
| 静态成员 | static 关键字；可通过继承访问 |
| 实例属性 | 类体中直接定义；# 表示私有字段 |
| 本质 | 构造函数的语法糖；内部严格模式 |

---

## 第8章：作用域与闭包

### 8.1 词法作用域 vs 动态作用域

```javascript
// JavaScript 采用词法作用域（静态作用域）
// 作用域在代码定义时就确定了，而非运行时
```

### 8.2 作用域类型

```javascript
// 1. 全局作用域：最外层
// 2. 函数作用域：function 内部（var）
// 3. 块级作用域：{} 内部（let/const）
```

### 8.3 作用域链查找机制

```
查找顺序：当前作用域 → 外层作用域 → ... → 全局作用域
```

### 8.4 变量提升（Hoisting）

```javascript
// var: 声明提升到顶部
// let/const: 进入 TDZ（暂时性死区）
// function: 整个函数体被提升
// 函数表达式: 只有变量声明提升
// class: 声明提升但进入 TDZ
// import: 静态提升
```

### 8.5 IIFE 与块级作用域

```javascript
// ES5 用 IIFE 模拟块级作用域
(function() { var temp = "safe"; })();

// ES6+ 用块级作用域替代
{ let temp = "safe"; }
```

### 8.6 闭包的本质

```javascript
// 闭包 = 函数 + 该函数声明时的词法环境
// 即使函数在其词法环境之外执行，仍能访问该环境中的变量
```

### 8.7 经典闭包面试题

```javascript
// 循环 + 定时器问题
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 输出: 3 3 3 ❌
}

// 解决方案:
// 1. IIFE: (function(j) { setTimeout(() => console.log(j), 100); })(i);
// 2. let: for (let i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }
// 3. 传参: setTimeout(console.log, 100, i);
```

### 8.8 内存泄漏场景及预防

```javascript
// 1. 意外的全局变量
// 2. 被遗忘的定时器/回调
// 3. 闭包持有不必要的引用
// 4. DOM 引用
// 5. Maps/Sets 持有对象引用

// 预防：严格模式、及时清除引用、使用 WeakMap/WeakSet
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| 作用域类型 | 全局、函数、块级（let/const） |
| 作用域链 | 从当前作用域向外层逐级查找 |
| 提升 | var(声明)、function(整体)、let/const/class(TDZ) |
| 闭包本质 | 函数 + 词法环境；持久保存对外部变量的引用 |
| 经典面试题 | 循环+定时器：用 let/IIFE/传参解决 |
| 内存泄漏 | 全局变量、定时器、DOM 引用、闭包、Map |

---

## 第9章：异步编程

### 9.1 单线程模型与事件循环

```javascript
/*
Event Loop 执行流程：
1. 执行同步代码（Call Stack）
2. Stack 为空时，清空 Microtask Queue（全部微任务）
3. 取一个 Macrotask 执行
4. 重复 2-3

微任务: Promise.then/MutationObserver/queueMicrotask
宏任务: setTimeout/setInterval/I/O/UI渲染
*/

console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("5");
// 输出: 1 → 5 → 3 → 2
```

### 9.2 Promise 详解

```javascript
// 三种状态：pending → fulfilled/rejected（不可逆）

promise.then(result => {}).catch(err => {}).finally(() => {});

// 静态方法
Promise.resolve(42);
Promise.reject(new Error());
Promise.all([p1, p2]);           // 全部成功才算成功
Promise.allSettled([p1, p2]);    // 等待全部完成
Promise.race([p1, p2]);           // 最先完成的
Promise.any([p1, p2]);           // 第一个成功的
```

### 9.3 async/await 详解

```javascript
async function fetchData() {
  const response = await fetch("/api/data");
  return await response.json(); // 始终返回 Promise
}

// 错误处理: try/catch 或 .catch
// 并行: Promise.all([fetch1, fetch2, fetch3])

// 重要: async 函数返回值始终是 Promise
// await 后非 Promise 会自动包装
```

### 9.4 异步编程模式演进

```javascript
// 回调地狱 → Promise 链式 → async/await（最终形态）
```

### 9.5 定时器原理

```javascript
setTimeout 最小延迟 4ms（连续 5 次以上调用时）
requestAnimationFrame - 下一次重绘前调用（~16ms）
requestIdleCallback - 浏览器空闲时执行
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| 事件循环 | Stack 空 → 清空微任务 → 取一个宏任务 → 循环 |
| 微任务 | Promise.then/MutationObserver/queueMicrotask |
| 宏任务 | setTimeout/setInterval/I/O/UI渲染 |
| Promise | pending→fulfilled/rejected（不可逆）；all/allSettled/race/any |
| async/await | Promise 语法糖；try/catch 错误处理；并行用 Promise.all |

---

## 第10章：DOM 与 BOM

### 10.1 DOM 树结构

```javascript
/*
Document
├── DocumentType (<!DOCTYPE html>)
├── Element <html>
│   ├── Element <head> → Element <title> → Text
│   └── Element <body> → Element <div>, Comment, Text...

节点类型: Element(1), Text(3), Comment(8), Document(9), DocumentFragment(11)
*/
```

### 10.2 元素获取

```javascript
document.querySelector("#id");           // 单个元素
document.querySelectorAll(".class");      // NodeList
document.getElementById("id");

element.closest(".container"); // 查找最近匹配祖先
```

### 10.3 DOM 操作

```javascript
// 创建: createElement / createTextNode / createDocumentFragment
// 插入: appendChild / insertBefore / prepend / before / after
// 删除: removeChild / remove()
// 克隆: cloneNode(true)

// innerHTML vs textContent vs innerText
// DocumentFragment 批量操作优化
```

### 10.4 属性操作

```javascript
element.getAttribute / setAttribute / removeAttribute / hasAttribute
element.dataset.userId;      // data-* 属性
element.classList.add / remove / toggle / replace
element.style.color = "red"; // 行内样式
getComputedStyle(element);     // 计算后样式
```

### 10.5 事件机制

```javascript
/*
事件流三阶段：捕获(Capture) → 目标(Target) → 冒泡(Bubble)
*/

btn.addEventListener("click", handler, {
  capture: false,   // 捕获阶段触发
  passive: false,   // 是否禁止 preventDefault
  once: false        // 只触发一次
});

// 事件委托（利用冒泡在父元素统一处理）
list.addEventListener("click", (e) => {
  if (e.target.matches("li")) { /* 处理 */ }
});

// Event 对象: target/currentTarget/preventDefault/stopPropagation/stopImmediatePropagation

// 自定义事件: CustomEvent / dispatchEvent
```

### 10.6 BOM 对象

```javascript
window: innerWidth/Height, scrollTo, open/close
navigator: userAgent, language, onLine, geolocation
screen: width/height, colorDepth
location: href/protocol/hostname/pathname/search/hash
history: back/forward/go/pushState/replaceState
localStorage: setItem/getItem/removeItem/clear (~5MB)
sessionStorage: 同上（标签页级别）
cookie: document.cookie (~4KB, 每次请求携带)
```

### 10.7 跨窗口通信

```javascript
postMessage: otherWindow.postMessage(data, targetOrigin)
BroadcastChannel: new BroadcastChannel("name") (同源广播)
MessageChannel: port1/port2 (端口通信)
```

### 10.8 现代 Observer API

```javascript
IntersectionObserver: 元素可见性观察（懒加载）
ResizeObserver: 元素尺寸变化观察
MutationObserver: DOM 变化观察
```

### 10.9 虚拟 DOM 思想

```javascript
// JS 对象描述 DOM 结构 → Diff 算法找出最小变更 → Patch 到真实 DOM
// 优势：减少 DOM 操作、跨平台、声明式、易测试
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| DOM 操作 | querySelector/querySelectorAll（推荐）；create/append/remove |
| 事件机制 | 捕获→目标→冒泡；事件委托利用冒泡 |
| BOM | window/navigator/screen/location/history/localStorage/sessionStorage |
| 跨窗口 | postMessage/BroadcastChannel/MessageChannel |
| Observer API | IntersectionObserver/ResizeObserver/MutationObserver |
| 虚拟 DOM | JS 对象描述 DOM；Diff + Patch；React/Vue/Svelte 核心 |

---

## 第11章：数组方法大全

### 11.1 ES5 数组方法

```javascript
forEach / map / filter / reduce / reduceRight / some / every / indexOf / lastIndexOf
```

### 11.2 ES6+ 数组方法

```javascript
find / findIndex / includes / of / from / keys / values / entries
copyWithin / fill / flat / flatMap
```

### 11.3 ES2023 新方法

```javascript
toReversed / toSorted / toSpliced / with / findLast / findLastIndex
```

### 11.4 排序 sort 的坑

```javascript
[10, 2, 30].sort(); // [10, 2, 30] ❌ 默认字典序
[10, 2, 30].sort((a, b) => a - b); // [2, 10, 30] ✅ 数字排序
// sort 是原地排序！
```

### 11.5 数组去重的 N 种方法

```javascript
[...new Set(arr)];                    // ★ 最简洁
arr.filter((item, i) => arr.indexOf(item) === i);
arr.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);
```

### 11.6 数组扁平化的 N 种方法

```javascript
arr.flat(Infinity);     // ★ 最简洁
[].concat(...arr);      // 只展平一层
// 递归 / stack 迭代 / toString+split
```

### 11.7 类数组转数组

```javascript
Array.from(arguments);      // ★ 推荐
[...arguments];
Array.prototype.slice.call(arguments);
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| ES5 方法 | forEach/map/filter/reduce/find/some/every/sort/indexOf |
| ES6+ 方法 | find/findIndex/includes/of/from/flat/flatMap |
| ES2023 | toReversed/toSorted/toSpliced/with/findLast |
| 排序坑 | 默认字典序；数字必须提供比较函数 |
| 去重 | [...new Set(arr)]（最简洁） |
| 扁平化 | arr.flat(Infinity)（最简洁） |

---

## 第12章：字符串与正则

### 12.1 字符串常用方法

```javascript
charAt / at / charCodeAt / codePointAt
indexOf / lastIndexOf / includes / startsWith / endsWith
search / match / matchAll
slice / substring / split / repeat
trim / trimStart / trimEnd
padStart / padEnd
replace / replaceAll
toUpperCase / toLowerCase
localeCompare / normalize
```

### 12.2 模板标签函数

```javascript
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + `<mark>${values[i]}</mark>`;
  }, '');
}
highlight`${name} is ${age}`; // <mark>Alice</mark> is <mark>25</mark>
```

### 12.3 正则表达式基础

```javascript
元字符: . \d \D \w \W \s \S \b \B
字符类: [abc] [^abc] [a-z]
量词: * + ? {n} {n,} {n,m} *? +? ??
锚点: ^ $ (?=p) (?!p) (?<=p) (?<!p)
分组: (...) (?:...) \n (?<name>...) \k<name>
```

### 12.4 正则标志

```javascript
g(全局) i(忽略大小写) m(多行) s(dotAll) u(unicode) y(粘性) d(索引)
```

### 12.5 RegExp 方法

```javascript
test / exec / match / replace / split
```

### 12.6 正则性能优化

```javascript
避免回溯灾难、使用具体字符类、预编译正则、使用锚点限定
```

### 12.7 常用正则模式

```javascript
EMAIL / PHONE / URL / IPV4 / ID_CARD / PASSWORD / CHINESE / USERNAME
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| 字符串方法 | charAt/at/slice/includes/startsWith/endsWith/replace/padStart/padEnd |
| 模板标签 | 函数接收 strings 和 values；可用于高亮/i18n/CSS |
| 正则基础 | 元字符、字符类、量词、锚点、分组、反向引用 |
| 正则标志 | g/i/m/s/u/y/d |
| RegExp | test/exec/match/replace/split |
| 常用模式 | 邮箱/手机/URL/IP/身份证/密码/中文 |

---

## 第13章：Map/Set/WeakMap/WeakSet

### 13.1 Map vs Object

```javascript
/*
┌──────────────┬──────────────┬──────────────┐
│    特性        │     Map       │    Object    │
├──────────────┼──────────────┼──────────────┤
│ 键的类型      │ 任意值        │ 仅 String/Symbol│
│ 键的顺序      │ 插入顺序       │ 不保证        │
│ size 属性     │ 直接获取       │ 手动计算      │
│ 迭代          │ 默认可迭代     │ 需要转换      │
│ 序列化        │ 需手动转换     │ JSON 支持     │
└──────────────┴──────────────┴──────────────┘
*/
```

### 13.2 Set 的特性与应用

```javascript
// 自动去重
[...new Set([1, 2, 2, 3])]; // [1, 2, 3]

// 集合运算
const union = new Set([...a, ...b]);        // 并集
const intersect = new Set([...a].filter(x => b.has(x))); // 交集
const difference = new Set([...a].filter(x => !b.has(x))); // 差集
```

### 13.3 WeakMap/WeakSet

```javascript
// 弱引用特性：不影响垃圾回收
// WeakMap: 键必须是对象；用于存储对象私有数据/DOM关联数据/缓存
// WeakSet: 值必须是对象；用于跟踪对象是否被标记
// 不可枚举（没有 size、keys、values、forEach）
```

### 13.4 迭代协议

```javascript
// Iterable: 实现 [Symbol.iterator]()
// Iterator: 实现 next() → { value, done }
// Generator 自动实现迭代协议
// AsyncIterable / AsyncIterator: 异步迭代
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| Map vs Object | Map 键可以是任意类型、保持顺序、适合频繁增删 |
| Set | 自动去重；可实现集合运算（交/并/差） |
| WeakMap/WeakSet | 弱引用、键/值必须是对象、自动 GC |
| 迭代协议 | [Symbol.iterator]/next()/for...of；Generator 自动实现 |

---

## 第14章：JSON 与数据序列化

### 14.1 JSON.stringify 详解

```javascript
// 第二参数 replacer: 数组（指定属性）或函数（自定义转换）
// 第三参数 space: 美化缩进

// 特殊值处理:
// undefined/function/Symbol → 被忽略（作为对象属性值）
// NaN/Infinity → null
// Date → ISO string
// RegExp → {}
// 循环引用 → TypeError
```

### 14.2 JSON.parse 的 reviver

```javascript
// reviver 参数：转换解析后的值（恢复 Date 等）
JSON.parse(jsonStr, (key, value) => {
  if (key === "birthday") return new Date(value);
  return value;
});
```

### 14.3 JSON 不支持的类型

```javascript
undefined / function / Symbol / BigInt / 循环引用
```

### 14.4 deepClone 方案对比

```javascript
JSON.parse(JSON.stringify(obj)) // 有局限：不支持 Date/RegExp/函数/Symbol/循环引用
structuredClone(obj) // 现代推荐（支持更多类型）
```

### 14.5 structuredClone API

```javascript
// 现代深拷贝方案（推荐）
// 支持: Date/RegExp/Map/Set/ArrayBuffer/File/Blob/ImageData 等
// 支持循环引用
// 浏览器: Chrome 98+, Firefox 94+, Safari 15.1+, Edge 98+
// Node.js: v17.0+
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| stringify | replacer(过滤/转换) + space(美化)；特殊值处理规则 |
| parse | reviver(恢复 Date 等类型) |
| 不支持类型 | undefined/function/Symbol/BigInt/循环引用 |
| deepClone | JSON 方案有局限；structuredClone 推荐 |

---

## 第15章：错误处理与调试

### 15.1 Error 对象体系

```javascript
Error → EvalError / RangeError / ReferenceError / SyntaxError / TypeError / URIError / AggregateError
```

### 15.2 throw / try/catch/finally

```javascript
try { riskyOperation(); } 
catch (e) { /* e.message / e.name / e.stack */ } 
finally { /* 无论成败都执行 */ }
// finally 中避免 return
```

### 15.3 自定义 Error 类

```javascript
class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "CustomError";
    this.code = code;
  }
}
```

### 15.4 全局错误捕获

```javascript
window.onerror = (message, source, lineno, colno, error) => {};
window.addEventListener("unhandledrejection", (event) => {});
```

### 15.5 console 方法大全

```javascript
log / warn / error / info / debug
table / group / groupCollapsed / groupEnd
time / timeLog / timeEnd
assert / count / profile / profileEnd
dir / dirxml / clear
```

### 15.6 debugger 与 source map

```javascript
debugger; // 断点暂停
// Source Map: 将编译后的代码映射回源代码（便于调试压缩后的代码）
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| Error 体系 | Error → TypeError/ReferenceError/SyntaxError/RangeError/AggregateError |
| 异常处理 | try/catch/finally；finally 避免 return |
| 全局捕获 | onerror / unhandledrejection |
| console | log/warn/error/table/group/time/assert/debugger |

---

## 第16章：JavaScript 性能优化

### 16.1 V8 引擎工作原理

```javascript
/*
V8 引擎架构:

JavaScript 源代码
    ↓ Parser（解析器）
AST (抽象语法树)
    ↓ Ignition（解释器）
Bytecode（字节码）
    ↓ 热点检测
TurboFan（编译器）
Optimized Machine Code（优化后的机器码）
    ↓ 去优化（假设失败时）
Bytecode（回退到解释执行）

Ignition: 快速生成字节码，快速启动
TurboFan: 收集类型信息后进行 JIT 编译优化
*/
```

### 16.2 垃圾回收机制

```javascript
/*
GC 算法:

新生代（Young Generation / New Space）:
├── From-Space（分配新对象）
└── To-Space（Scavenge 目标）
算法: Scavenge（复制算法）
  1. 从 From 复制存活对象到 To
  2. 清空 From
  3. 交换 From/To 角色
特点: 空间小（1-8MB），GC 频繁，速度快

老生代（Old Generation / Old Space）:
算法: Mark-Sweep / Mark-Compact
  1. Mark: 从 GC Roots 开始标记所有可达对象
  2. Sweep: 回收未标记的对象（产生碎片）
  3. Compact（可选）：移动存活对象，消除碎片
特点: 空间大，GC 不频繁，可能触发全停顿（Stop-The-World）

GC Roots: 全局变量、栈中的局部变量、被引用的对象
*/
```

### 16.3 内存泄漏的 6 种常见场景

```javascript
1. 意外的全局变量（缺少 var/let/const）
2. 被遗忘的定时器/回调（持有大对象引用）
3. 闭包持有不必要的引用
4. DOM 引用（移除前需清除）
5. Maps/Sets 持有对象引用（应使用 WeakMap/WeakSet）
6. 事件监听器未移除
```

### 16.4 性能优化技巧

```javascript
// 防抖/节流（见第5章）
// 虚拟滚动（只渲染可视区域）
// 懒加载（IntersectionObserver / 动态 import）
// Web Worker（将计算密集型任务放到后台线程）
// OffscreenCanvas（离屏 Canvas 渲染）
// requestIdleCallback（空闲时执行低优先级任务）
// 代码分割（动态 import / webpack code splitting）
```

### 16.5 首屏加载优化

```javascript
// 资源压缩（gzip/brotli）
// 代码分割（路由懒加载、组件懒加载）
// 预加载（<link rel="preload/prefetch">）
// 关键渲染路径（Critical Rendering Path）优化
// CSS 提取、JS 异步、减少阻塞资源
// 字体优化（font-display: swap）
// 图片优化（懒加载、响应式图片、WebP/AVIF）
// Service Worker 缓存
```

---

#### 本章要点速查

| 要点 | 关键信息 |
|------|----------|
| V8 引擎 | Ignition（解释）+ TurboFan（JIT 编译）；热点代码优化 |
| GC 机制 | 新生代 Scavenge（复制算法）+ 老生代 Mark-Sweep/Compact |
| 内存泄漏 | 全局变量、定时器、DOM、闭包、Map、事件监听器 |
| 优化技巧 | 防抖节流、虚拟滚动、懒加载、Web Worker、代码分割 |
| 首屏优化 | 压缩、代码分割、预加载、关键路径、SW 缓存 |

---

## 第17章：ES2020-ES2024 新特性

### 17.1 ES2020 新特性

```javascript
可选链 ?.: user?.address?.city
空值合并 ??: val ?? default
BigInt: 9007199254740991n
dynamic import: const mod = await import('./module.js')
globalThis: 统一的全局对象
Promise.allSettled: 等待全部完成
String.matchAll: 迭代器匹配
String.trimStart / trimEnd
import.meta: 模块元信息
export * as ns from 'mod'
```

### 17.2 ES2021 新特性

```javascript
逻辑赋值: ||= &&= ??=
数字分隔符: 1_000_000
Promise.any: 第一个成功
String.replaceAll: 替换所有匹配
WeakRefs: WeakRef / FinalizationGroup
AggregateError: 多错误的聚合错误
Promise.any: 返回第一个成功的
```

### 17.3 ES2022 新特性

```javascript
顶层 await: module 中直接使用 await
.at(): arr.at(-1) 最后一个元素（支持负索引）
Object.hasOwn(obj, key): 替代 hasOwnProperty
Error.cause: new Error("msg", { cause: reason })
Indexed Collections: Array.prototype.sortby?
RegExp Match Indices: /d flag（返回匹配位置）
类: 私有字段 # / 静态初始化块 / 公共实例字段
```

### 17.4 ES2023 新特性

```javascript
Array.findLast / findLastIndex: 从后往前查找
Hashbang: #! (Node.js shebang)
Symbols as WeakMap keys: WeakMap 可以使用 Symbol 作为键
Change Array by copy: toReversed / toSorted / toSpliced / with
```

### 17.5 ES2024 新特性

```javascript
Promise.withResolvers(): { promise, resolve, reject }
Object.groupBy(): 按条件分组
Map.groupBy(): Map 版本分组
Atomics.waitAsync: 异步等待
RegExp v flag: verbose 正则（更详细的匹配信息）
ArrayBuffer transfer: 高性能转移 ArrayBuffer
Temporal API (Stage 3): 现代日期时间 API
```

---

#### 本章要点速查

| 版本 | 核心新特性 |
|------|-----------|
| ES2020 | ??. / ?? / BigInt / dynamic import / globalThis / allSettled |
| ES2021 | \|\|= &&= ??= / Promise.any / replaceAll / WeakRefs |
| ES2022 | 顶层 await / .at() / Object.hasOwn / Error.cause / 私有字段 |
| ES2023 | findLast / findLastIndex / Hashbang / Change Array by copy |
| ES2024 | withResolvers / groupBy / Atomics.waitAsync / v flag / Temporal |

---

> **文档结束** 📚
> 
> 本指南涵盖了 JavaScript 从基础到高级的核心知识点，建议配合实际编码练习加深理解。
> 每个章节都包含了丰富的代码示例和详细注释，可作为日常开发的参考手册。