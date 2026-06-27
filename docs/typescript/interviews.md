---
---
# TypeScript 面试题库（2025-2026 企业实战版）

> 本题库基于全网最新面试趋势整理，涵盖基础、进阶、专家三个难度层级，重点考察实际工程应用能力。
> 题目形式包含：选择题（10道）、简答题（15道）、代码分析题（10道）、编程实践题（8道），共 **43 道**。

---
---
### 一、选择题（5道）

## Q01: TypeScript 的基本类型系统中，`any`、`unknown`、`never` 三者的核心区别是？
- **难度**：★☆☆

**A)** `any` 绕过所有类型检查；`unknown` 使用前需类型收窄；`never` 表示永不存在的值  
**B)** `any` 和 `unknown` 完全等价；`never` 只用于抛异常的函数  
**C)** `any` 是最安全的类型；`unknown` 最危险；`never` 已被废弃  
**D)** 三者没有区别，都可以互相赋值  

**正确答案**：A  
**知识点**：[特殊类型 any/unknown/never](https://juejin.cn/post/7530179511728930856)  
**解析**：
- `any`：完全绕过类型检查，可访问任意属性，应尽量避免使用
- `unknown`：类型安全的 `any`，使用前必须通过类型守卫或断言确定具体类型
- `never`：表示永远不会出现的值的类型，常用于：
  - 总是抛出异常的函数
  - 永远不会返回的函数（无限循环）
  - 类型穷尽检查（switch 的 default 分支）

```typescript
// any 示例
let a: any = 'hello';
a.toFixed(2); // 编译通过但运行时报错 ❌

// unknown 示例
let b: unknown = 'hello';
if (typeof b === 'string') {
  b.toUpperCase(); // ✅ 类型收窄后安全使用
}

// never 示例
function throwError(msg: string): never {
  throw new Error(msg);
}
```

### 🔍 追问链
1. **unknown 类型安全怎么体现？实际项目中如何逐步替换 any？**
   → 方向：unknown 使用前必须类型收窄（typeof/instanceof/自定义守卫）；迁移策略：先 any→unknown，再逐步加守卫
2. **never 在 switch 语句的 default 分支中有什么作用？**
   → 方向：穷尽性检查（exhaustiveness check），确保所有分支都处理了；配合 never 赋值检测遗漏分支
3. **unknown 和 object 有什么区别？什么时候用哪个？**
   → 方向：object 是所有非原始类型的父类（但不能直接访问属性）；unknown 是所有类型的父类（需要收窄后使用）

---

## Q02: 以下关于接口（Interface）和类型别名（Type Alias）的说法，**错误**的是？
- **难度**：★☆☆

**A)** 接口支持声明合并（同名接口自动合并）  
**B)** 类型别名支持联合类型、交叉类型等高级特性  
**C)** 接口可以使用 `extends` 继承，类型别名也可以用 `extends` 继承  
**D)** 类可以实现（implements）接口，但不能实现类型别名  

**正确答案**：C  
**知识点**：[interface vs type 区别](https://blog.csdn.net/m0_44973790/article/details/151803965)  
**解析**：

| 特性 | interface | type |
|------|-----------|------|
| 声明合并 | ✅ 支持 | ❌ 不支持 |
| 继承/扩展 | `extends` | 交叉类型 `&` |
| 联合/交叉类型 | ❌ | ✅ |
| 基本类型定义 | ❌ | ✅ (`type ID = string \| number`) |
| 类可实现 | ✅ `implements` | ✅ 也可实现 |

**关键纠正**：类型别名不能使用 `extends` 关键字继承，而是通过 `&` 交叉类型实现类似效果。

```typescript
// 接口声明合并
interface User {
  name: string;
}
interface User {
  age: number; // 自动合并为 { name: string; age: number }
}

// type 的高级用法
type ID = string | number;
type Combined = { a: number } & { b: string };
```

### 🔍 追问链
1. **声明合并在实际项目中有什么应用场景？**
   → 方向：为第三方库扩展类型声明（declare module + interface 合并）、monorepo 中跨包类型扩展
2. **type 的交叉类型 `A & B` 和 interface 的 extends 有什么区别？**
   → 方向：extends 检查子类型关系（可赋值性），& 只是简单合并属性（不检查冲突）
3. **什么情况下只能用 type 不能用 interface？**
   → 方向：联合类型 `type ID = string | number`、元组 `type Tuple = [string, number]、条件类型、模板字面量、原始类型别名

---

## Q03: 以下 TypeScript 代码的输出结果是什么？
- **难度**：★☆☆

```typescript
function greet(name: string, greeting?: string): string {
  return `${greeting ?? 'Hello'}, ${name}!`;
}

console.log(greet('Tom'));
console.log(greet('Jerry', 'Hi'));
```

**A)** `"Hello, Tom!"` 和 `"Hello, Jerry!"`  
**B)** `"Hello, Tom!"` 和 `"Hi, Jerry!"`  
**C)** `"undefined, Tom!"` 和 `"Hi, Jerry!"`  
**D)** 编译错误  

**正确答案**：B  
**知识点**：[可选参数与空值合并](https://blog.51cto.com/u_16213566/14206672)  
**解析**：
- `greeting?` 表示可选参数，不传时为 `undefined`
- `??` 空值合并运算符：仅当左侧为 `null` 或 `undefined` 时返回右侧值（区别于 `||`，后者对 `''`、`0`、`false` 也触发）

---

## Q04: 以下关于元组（Tuple）的描述，**正确**的是？
- **难度**：★☆☆

**A)** 元组和数组完全相同，没有任何区别  
**B)** 元组可以随意增删元素，长度不固定  
**C)** 元组定义了已知数量和类型的数组，元素类型和位置一一对应  
**D)** 元组只能存储两种类型的元素  

**正确答案**：C  
**知识点**：[元组类型](https://juejin.cn/post/7530179511728930856)  
**解析**：

```typescript
// 元组：固定长度 + 固定类型顺序
let person: [string, number, boolean] = ['Alice', 25, true];
person[0] = 'Bob';      // ✅
person[1] = '30';       // ❌ 类型错误：不能将 string 赋给 number
person[3] = 'extra';    // ❌ 超出元组长度

// 带可选元素和剩余元素的元组
type Flexible = [string, ...number[]];
let data: Flexible = ['header', 1, 2, 3]; // ✅
```

---

## Q05: 以下代码中，哪个位置会产生**编译错误**？
- **难度**：★☆☆

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

let d: Direction = Direction.Up;
d = 100;        // 位置 A
d = 'Up';       // 位置 B
d = Direction.Down; // 位置 C
```

**A)** 位置 A  
**B)** 位置 B  
**C)** 位置 C  
**D)** 以上都不会报错  

**正确答案**：B  
**知识点**：[枚举类型](https://blog.51cto.com/u_16213566/14206672)  
**解析**：
- 数字枚举允许反向映射（`Direction[1] === 'Up'`）
- 枚举值可以被数字赋值（位置 A 合法，因为数字枚举本质是 number）
- 但不能直接赋字符串字面量（除非是字符串枚举）

---

### 二、简答题（5道）

## Q06: 请解释 TypeScript 与 JavaScript 的核心区别，并说明在什么场景下应该选择 TypeScript？
- **难度**：★☆☆

**参考答案要点**：

| 维度 | JavaScript | TypeScript |
|------|-----------|------------|
| 类型系统 | 动态类型，运行时检查 | 静态类型，编译时检查 |
| 执行方式 | 直接运行 | 编译为 JS 后执行 |
| IDE 支持 | 基础补全 | 强大的智能提示、重构 |
| 错误发现 | 运行时才暴露 | 编译阶段即可捕获 |
| 学习成本 | 低 | 中等 |

**选择 TS 的场景**：
1. 中大型项目（代码量 > 10k 行）
2. 多人协作开发
3. 需要长期维护的项目
4. 对代码质量有较高要求的团队
5. 使用 React/Vue/Angular 等框架的项目

**参考来源**：[TS 与 JS 对比](https://juejin.cn/post/7512277099413012514)

---

## Q07: 什么是类型推断（Type Inference）？举例说明 TypeScript 在哪些情况下会进行类型推断。
- **难度**：★★☆

**参考答案要点**：

类型推断是指 TypeScript 编译器能够**自动推导**变量或表达式的类型，无需开发者显式标注。

**推断场景**：

```typescript
// 1. 变量初始化推断
let x = 10;              // 推断为 number（非 10 字面量类型）
let y = 'hello';         // 推断为 string
const z = 'world';       // 推断为 'world'（字面量类型）

// 2. 函数返回值推断
function add(a: number, b: number) {
  return a + b;          // 推断返回值为 number
}

// 3. 上下文推断
const numbers = [1, 2, 3];         // number[]
numbers.forEach(n => console.log); // n 被推断为 number

// 4. 最佳通用类型推断
let arr = [1, 'hello', true];     // (string | number | boolean)[]
```

**类型拓宽（Widening）**：`let x = 'hello'` 从 `'hello'` 拓宽为 `string`
**const 断言阻止拓宽**：`let arr = [1, 2] as const;` → `readonly [1, 2]`

**参考来源**：[类型推断详解](https://juejin.cn/post/7530179511728930856)

---

## Q08: 请解释 `public`、`private`、`protected` 三种访问修饰符的作用，并给出代码示例。
- **难度**：★☆☆

**参考答案要点**：

```typescript
class Animal {
  public name: string;       // 默认，任何地方可访问
  protected age: number;     // 类内部及子类可访问
  private secret: string;    // 仅类内部可访问

  constructor(name: string, age: number, secret: string) {
    this.name = name;
    this.age = age;
    this.secret = secret;
  }

  public getInfo(): string {
    return `${this.name}, ${this.age}, ${this.secret}`; // 内部都可访问
  }
}

class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, 'hidden');
  }

  bark() {
    console.log(this.name);    // ✅ public 可访问
    console.log(this.age);     // ✅ protected 子类可访问
    // console.log(this.secret); // ❌ private 不可访问
  }
}

const dog = new Dog('Buddy', 3);
console.log(dog.name);        // ✅ 外部可访问 public
// console.log(dog.age);      // ❌ 外部不可访问 protected
// console.log(dog.secret);   // ❌ 外部不可访问 private
```

**参数属性简写**：`constructor(public name: string)` 自动创建并赋值

**参考来源**：[访问修饰符](https://blog.csdn.net/m0_44973790/article/details/151803965)

---

## Q09: 什么是类型断言（Type Assertion）？`as` 语法和 `<>` 语法有什么区别？什么时候应该使用非空断言 `!`？
- **难度**：★★☆

**参考答案要点**：

**类型断言**：告诉编译器"我比它更了解这个值的类型"，**不会影响运行时行为**。

```typescript
// as 语法（推荐，JSX 兼容）
const input = document.getElementById('username') as HTMLInputElement;

// <> 语法（JSX 中与标签冲突，不推荐）
const input2 = <HTMLInputElement>document.getElementById('username');

// 非空断言 !（告诉编译器这个值不为 null/undefined）
function getElement(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}
const el = getElement('.btn')!; // 断言非空，后续无需判空
el.click(); // ✅ 不需要 el?.click()
```

**⚠️ 注意事项**：
1. 非空断言 `!` 有运行时风险，仅在确信值存在时使用
2. 双重断言 `(value as any) as SomeType` 应极力避免
3. 优先使用类型守卫而非断言

**参考来源**：[类型断言](https://juejin.cn/post/7530179511728930856)

### 🔍 追问链
1. **as const 和 readonly 有什么区别？**
   → 方向：as const 是编译时断言（让字面量不拓宽），readonly 是类型修饰符（运行时也不可修改）；as const 可以递归深化
2. **const 声明的对象和 as const 的区别？**
   → 方向：`const obj = { x: 1 }` 推断为 `{ x: number }`；`obj as const` 推断为 `{ x: 1 }`（值也变为字面量）
3. **satisfies 操作符和 as 有什么区别？（TS 4.9+）**
   → 方向：satisfies 验证类型但不拓宽（保持精确推断）；as 强制断言可能绕过检查

---

## Q10: 如何定义一个函数的类型？请写出函数重载的完整示例。
- **难度**：★★☆

**参考答案要点**：

```typescript
// 方式一：类型表达式
type AddFn = (a: number, b: number) => number;
const add: AddFn = (x, y) => x + y;

// 方式二：接口定义
interface Calculator {
  (a: number, b: number): number;
  description: string;
}
const calc: Calculator = (a, b) => a + b;
calc.description = '加法计算器';

// 方式三：函数重载（根据参数类型返回不同类型）
function format(value: string): string;                    // 重载签名 1
function format(value: number): string;                    // 重载签名 2
function format(value: boolean): string;                   // 重载签名 3
function format(value: string | number | boolean): string { // 实现签名
  if (typeof value === 'string') return value.toUpperCase();
  if (typeof value === 'number') return value.toFixed(2);
  return value ? 'TRUE' : 'FALSE';
}

format('hello');   // 返回 string
format(3.14159);   // 返回 string
format(true);      // 返回 string
```

**关键点**：重载签名只用于类型检查，不包含实现体；实现签名对外不可见。

### 🔍 追问链
1. **函数重载在哪些场景下特别有用？**
   → 方向：根据不同参数类型返回不同类型（如 fetchAPI 根据配置返回不同响应）、构造函数模式
2. **重载签名和实现签名的区别？为什么实现签名不对外暴露？**
   → 方向：重载签名定义公共 API（更严格），实现签名必须兼容所有重载（通常更宽松），外部调用看不到实现签名
3. **泛型能否替代函数重载？什么情况选哪个？**
   → 方向：泛型适用于"输入输出类型有规律关联"；重载适用于"不同参数组合对应完全不同的行为"

---

### 三、代码分析题（3道）

## Q11: 分析以下代码，找出所有类型错误并说明原因。
- **难度**：★☆☆

```typescript
interface Person {
  name: string;
  age?: number;  // 可选
  readonly id: number;
}

let p: Person = { name: 'Tom', id: 1 };
p.age = 25;           // 行 A
p.id = 2;            // 行 B
p.name = 'Jerry';    // 行 C
p.gender = 'M';      // 行 D
```

**参考答案**：

| 行号 | 是否报错 | 原因 |
|------|---------|------|
| 行 A | ✅ 正常 | `age` 是可选属性，可以赋值 |
| 行 B | ❌ 报错 | `id` 是 `readonly` 属性，不可重新赋值 |
| 行 C | ✅ 正常 | `name` 非 readonly，可以修改 |
| 行 D | ❌ 报错 | `Person` 接口中不存在 `gender` 属性（多余属性检查） |

**知识点**：[接口的可选属性与只读属性](https://blog.51cto.com/u_16213566/14206672)

---

## Q12: 以下代码的输出是什么？请解释每一步的类型变化。
- **难度**：★★☆

```typescript
let arr = [1, 2, 3];          // 类型？
arr.push('4');                // 是否报错？
console.log(arr[0].toFixed()); // 输出？

const tuple: [string, number] = ['hello', 42];
tuple[0] = 'world';           // 是否合法？
tuple[1] = '100';             // 是否合法？
```

**参考答案**：

```typescript
let arr = [1, 2, 3];          // 推断为 number[]
arr.push('4');                // ❌ 报错：Argument of type 'string' is not assignable to parameter of type 'number'
// 若初始为 let arr = [1, 'hello', true]，则类型为 (string | number | boolean)[]
// 此时 push('4') 就不会报错

const tuple: [string, number] = ['hello', 42];
tuple[0] = 'world';           // ✅ 合法，string 赋给 string
tuple[1] = '100';             // ❌ 报错，string 不能赋给 number
```

**知识点**：[数组与元组的类型推断](https://juejin.cn/post/7530179511728930856)

---

## Q13: 阅读以下代码，指出 `void` 和 `undefined` 作为返回类型的区别。
- **难度**：★★☆

```typescript
type VoidFunc = () => void;

const fn1: VoidFunc = () => {
  return true;  // 这里返回了 true，会报错吗？
};

const fn2: () => undefined = () => {
  return;       // 这样写呢？
};
```

**参考答案**：

- `fn1` **不会报错**。`() => void` 返回类型具有特殊兼容性：实现可以返回任意值，但调用方无法使用返回值。这是为了兼容 `Array.prototype.forEach` 等回调的场景。
- `fn2` **会报错**。`() => undefined` 要求显式返回 `undefined`，仅 `return;` 或 `return undefined;` 合法。

**实际应用**：

```typescript
// void 用于副作用操作
function logMessage(msg: string): void {
  console.log(msg);
  // 隐式返回 undefined
}

// undefined 用于明确无返回值
const requireUndefined = (): undefined => {
  return undefined; // 必须显式
};
```

**知识点**：[void 与 undefined 的区别](https://juejin.cn/post/7530179511728930856)

---

### 四、编程实践题（2道）

## Q14: 实现一个泛型 identity 函数，并扩展为可以获取数组首元素的 `first` 函数。
- **难度**：★★☆

**参考答案**：

```typescript
// 基础版：identity 函数
function identity<T>(arg: T): T {
  return arg;
}

// 使用
identity<string>('hello');  // 显式指定
identity(42);               // 自动推断为 number

// 进阶版：获取数组首元素
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const nums = [1, 2, 3];
const firstNum = first(nums);        // number | undefined
const strs = ['a', 'b', 'c'];
const firstStr = first(strs);        // string | undefined

// 更安全版本：确保数组非空
function firstOrThrow<T>(arr: T[] & { 0: T }): T {
  return arr[0];
}
```

**考察点**：泛型基本语法、自动类型推断、数组类型约束

---

## Q15: 定义一个 `User` 接口和一个 `formatUser` 函数，要求处理可选字段和默认值。
- **难度**：★★☆

**参考答案**：

```typescript
interface User {
  id: number;
  name: string;
  email?: string;       // 可选
  avatar?: string;      // 可选
  role?: 'admin' | 'user' | 'guest';  // 字面量联合类型
  createdAt: Date;
}

interface FormattedUser {
  displayName: string;
  email: string;
  initials: string;
  role: string;
}

function formatUser(user: User): FormattedUser {
  const initials = user.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return {
    displayName: user.name,
    email: user.email ?? 'no-email@example.com',
    initials,
    role: user.role ?? 'guest',
  };
}

// 使用示例
const user: User = {
  id: 1,
  name: 'Alice Johnson',
  createdAt: new Date(),
  // email 和 role 未提供，使用默认值
};

const formatted = formatUser(user);
// formatted = { displayName: 'Alice Johnson', email: 'no-email@example.com', initials: 'AJ', role: 'guest' }
```

**考察点**：接口定义、可选属性、联合类型、空值合并运算符、字符串处理

---

## 第二部分：进阶层（中级难度）

> **考察目标**：泛型编程、高级类型、类型守卫、模块化开发
> **适用岗位**：中级前端开发、全栈开发、技术骨干

---

### 一、选择题（3道）

## Q16: 以下关于泛型约束（Generic Constraints）的代码，输出结果是？
- **难度**：★★☆

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): number {
  return arg.length;
}

logLength('hello');     // 结果 A
logLength([1, 2, 3]);   // 结果 B
logLength(100);         // 结果 C
logLength({ length: 10, value: 'test' }); // 结果 D
```

**A)** A=5, B=3, C=报错, D=10  
**B)** A=5, B=3, C=100, D=报错  
**C)** 全部正常输出  
**D)** A 和 B 报错，C 和 D 正常  

**正确答案**：A  
**知识点**：[泛型约束](https://juejin.cn/post/7523878122645520384)  
**解析**：
- `T extends Lengthwise` 要求参数必须有 `length` 属性
- `string` 和 `array` 都有 `.length` 属性 ✅
- `number` 没有 `.length` 属性 ❌ 编译报错
- 对象 `{ length: 10 }` 满足约束 ✅

---

## Q17: 以下自定义类型守卫的实现，**最佳**的是？
- **难度**：★★★

```typescript
interface Cat { type: 'cat'; meow(): void; }
interface Dog { type: 'dog'; bark(): void; }
type Pet = Cat | Dog;
```

**A)**
```typescript
function isCat(pet: Pet): boolean {
  return pet.type === 'cat';
}
```
**B)**
```typescript
function isCat(pet: Pet): pet is Cat {
  return pet.type === 'cat';
}
```
**C)**
```typescript
function isCat(pet: Cat | Dog): Cat {
  return pet as Cat;
}
```
**D)**
```typescript
function isCat(pet: any): pet is Cat {
  return pet.type === 'cat';
}
```

**正确答案**：B  
**知识点**：[自定义类型守卫](https://blog.csdn.net/weixin_60526471/article/details/153528752)  
**解析**：
- **选项 A**：返回 `boolean`，虽然逻辑正确，但 TypeScript **不会**在调用后自动收窄类型
- **选项 B** ✅：**类型谓词** `pet is Cat` 告诉编译器"当返回 true 时，pet 就是 Cat 类型"，之后自动收窄
- **选项 C**：始终返回 `Cat`，不安全
- **选项 D**：使用 `any` 失去类型安全

**使用示例**：
```typescript
function play(pet: Pet) {
  if (isCat(pet)) {
    pet.meow();  // ✅ pet 收窄为 Cat
  } else {
    pet.bark();  // ✅ pet 收窄为 Dog
  }
}
```

### 🔍 追问链
1. **extends 关键字在不同上下文中的含义有哪些？**
   → 方向：泛型约束 `<T extends U>`、条件类型 `T extends U ? A : B`、类继承 `class A extends B`、接口继承 `interface I extends J`、类型推断位置 infer
2. **多重约束怎么写？**
   → 方向：`<T extends U & V>` 用交叉类型实现多个约束
3. **默认类型参数和约束可以同时使用吗？**
   → 方向：可以，`<T = string extends Serializable ? string : never>` 约束和默认值结合

---

## Q18: 以下联合类型与交叉类型的代码，运行结果正确的是？
- **难度**：★★☆

```typescript
type A = { name: string };
type B = { age: number };

type Union = A | B;
type Intersection = A & B;

let u: Union = { name: 'Tom' };        // ①
let i: Intersection = { name: 'Tom', age: 25 }; // ②
```

**A)** ① 和 ② 都报错  
**B)** ① 正常，② 报错  
**C)** ① 正常，② 正常  
**D)** ① 报错，② 正常  

**正确答案**：C  
**知识点**：[联合类型与交叉类型](https://juejin.cn/post/7523878122645520384)  
**解析**：
- **联合类型 `A | B`**：值可以是 A 或 B 的形状（满足其一即可）
- **交叉类型 `A & B`**：值必须同时具备 A 和 B 的所有属性

---

### 二、简答题（5道）

## Q19: 请详细解释 TypeScript 中的四种内置类型守卫，并分别给出示例。
- **难度**：★★★

**参考答案要点**：

**1. typeof 守卫**（适用于原始类型）
```typescript
function printId(id: string | number) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());  // id 收窄为 string
  } else {
    console.log(id.toFixed(2));    // id 收窄为 number
  }
}
// 支持判断：'string' | 'number' | 'boolean' | 'symbol' | 'bigint' | 'function' | 'object'
```

**2. instanceof 守卫**（适用于类实例）
```typescript
class Dog { bark() {} }
class Cat { meow() {} }

function play(pet: Dog | Cat) {
  if (pet instanceof Dog) {
    pet.bark();  // pet 收窄为 Dog
  }
}
```

**3. in 操作符守卫**（检查对象属性是否存在）
```typescript
interface Fish { swim(): void; }
interface Bird { fly(): void; }

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    animal.swim();  // animal 收窄为 Fish
  } else {
    animal.fly();   // animal 收窄为 Bird
  }
}
```

**4. 可辨识联合（Discriminated Union）**（利用共同字面量字段）
```typescript
interface Success { type: 'success'; data: string; }
interface Error { type: 'error'; message: string; }

function handle(result: Success | Error) {
  switch (result.type) {
    case 'success':
      console.log(result.data);    // result 收窄为 Success
      break;
    case 'error':
      console.log(result.message); // result 收窄为 Error
      break;
  }
}
```

**参考来源**：[四种类型守卫详解](https://blog.csdn.net/qq_17859117/article/details/161644680)

### 🔍 追问链
1. **typeof 能判断 null 吗？为什么不行？**
   → 方向：`typeof null === 'object'`（JS 历史遗留 bug），所以 typeof 无法区分 null 和普通对象
2. **自定义 is 谓词函数的原理是什么？TypeScript 如何知道返回 true 后类型收窄？**
   → 方向：is 是 TS 特殊的类型谓词标记，编译器识别 `(x): x is T` 这种返回值标注后自动做类型断言
3. **discriminated union（可辨识联合）相比 if-else + typeof 有什么优势？**
   → 方向： exhaustive check（switch + never 确保穷尽）、代码自文档化（type 字段明确语义）、IDE 跳转支持更好

---

## Q20: 什么是泛型？请列举泛型的三种主要应用场景（函数、接口、类），并说明泛型约束的作用。
- **难度**：★★☆

**参考答案要点**：

**泛型定义**：一种在定义时不指定具体类型、使用时才确定的参数化类型机制，提升代码复用性和类型安全性。

**场景一：泛型函数**
```typescript
function toArray<T>(arg: T): T[] {
  return [arg];
}
toArray(1);           // number[]
toArray('hello');     // string[]
```

**场景二：泛型接口**
```typescript
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

type UserResponse = ApiResponse<{ name: string; id: number }>;
type ListResponse = ApiResponse<string[]>;
```

**场景三：泛型类**
```typescript
class Stack<T> {
  private items: T[] = [];
  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
}

const numStack = new Stack<number>();
numStack.push(1);

const strStack = new Stack<string>();
strStack.push('hello');
```

**泛型约束**：限制泛型类型的范围
```typescript
// 约束 T 必须有 length 属性
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

// 约束 T 必须是某个类的子类
function createInstance<T extends Animal>(c: new () => T): T {
  return new c();
}

// keyof 约束：K 必须是 T 的键
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

**参考来源**：[泛型详解](https://juejin.cn/post/7523878122645520384)

### 🔍 追问链
1. **泛型接口和泛型类的区别？选择依据是什么？**
   → 方向：接口用于"数据形状描述"，类用于"包含逻辑的容器"；接口可以被 implements，类可以被 extends
2. **泛型函数的类型推断是怎么工作的？**
   → 方向：从实参类型推导类型参数（如 `identity("hello")` 自动推断 T=string），也可以显式指定覆盖推断
3. **什么是高阶泛型？`<T>() => <U>(x: U) => [T, U]` 这种写法？**
   → 方向：返回泛型函数的泛型函数（泛型工厂），用于构建灵活的 API 封装

---

## Q21: 请解释 TypeScript 内置工具类型 `Partial<T>`、`Required<T>`、`Pick<T, K>`、`Omit<T, K>` 的作用及实现原理。
- **难度**：★★★

**参考答案要点**：

```typescript
// 1. Partial<T>: 将所有属性变为可选
type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface User {
  name: string;
  age: number;
  email: string;
}
type PartialUser = Partial<User>;
// 等价于 { name?: string; age?: number; email?: string; }

// 2. Required<T>: 将所有属性变为必填（移除 ?）
type Required<T> = {
  [P in keyof T]-?: T[P];  // - 移除可选修饰符
};

// 3. Pick<T, K>: 只选取指定的属性
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type UserName = Pick<User, 'name' | 'email'>;
// { name: string; email: string; }

// 4. Omit<T, K>: 排除指定的属性
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type UserWithoutEmail = Omit<User, 'email'>;
// { name: string; age: number; }
```

**底层原理**：都基于**映射类型** `[P in Keys]: Type`，遍历键名批量转换属性。

**其他常用工具类型**：
- `Record<K, V>`：创建键值对对象类型
- `Exclude<T, U>`：从 T 中排除可分配给 U 的类型
- `Extract<T, U>`：从 T 中提取可分配给 U 的类型
- `ReturnType<T>`：获取函数返回值类型
- `Parameters<T>`：获取函数参数类型元组

**参考来源**：[工具类型精讲](https://blog.csdn.net/weixin_60526471/article/details/153528752)

### 🔍 追问链
1. **Partial<T> 的底层原理是什么？映射类型 `[P in keyof T]?: T[P]` 怎么理解？**
   → 方向：keyof T 取出所有属性名 → in 遍历每个属性名 → `?` 变为可选 → `T[P]` 取出原类型
2. **Pick 和 Omit 的关系？Omit 能否用 Pick 实现？**
   → 方向：`Omit<T, K> = Pick<T, Exclude<keyof T, K>>`，Omit 就是 Pick + Exclude 的组合
3. **如何手写一个 `RequiredDeep<T>` 让嵌套对象的所有层都变成 required？**
   → 方向：递归映射类型 + 条件类型判断是否为 object

---

## Q22: TypeScript 中的模块系统如何工作？`import/export` 和 `namespace` 各自的使用场景是什么？
- **难度**：★★☆

**参考答案要点**：

**ES Module（推荐）**：
```typescript
// utils.ts
export const PI = 3.14;
export function add(a: number, b: number): number {
  return a + b;
}
export default class Calculator {}

// main.ts
import Calculator, { add, PI } from './utils';
import * as Utils from './utils';  // 命名空间导入
```

**Namespace（遗留代码/全局库声明）**：
```typescript
// shapes.ts
namespace Geometry {
  export interface Point {
    x: number;
    y: number;
  }
  export function distance(p1: Point, p2: Point): number {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p2.y - p1.y) ** 2);
  }
}

// 使用
const p1: Geometry.Point = { x: 0, y: 0 };
Geometry.distance(p1, { x: 3, y: 4 }); // 5
```

**对比**：

| 特性 | ES Module | Namespace |
|------|-----------|-----------|
| 作用域 | 文件级 | 块级 |
| 加载方式 | 静态/动态 import | 编译时合并 |
| 树摇（Tree-shaking） | ✅ 支持 | ❌ 不支持 |
| 适用场景 | 应用代码 | 全局变量组织、UMD 库 |
| 推荐度 | ✅ 首选 | 仅限特定场景 |

**参考来源**：[模块与命名空间](https://blog.csdn.net/qq_41221596/article/details/132632184)

### 🔍 追问链
1. **什么情况下还需要用 Namespace？**
   → 方向：遗留代码维护、全局变量组织（如 jQuery 插件）、声明合并扩展第三方库、D.ts 中的形状描述
2. **Namespace 和 Module 混合使用的注意事项？**
   → 方向：Namespace 不能用在模块文件中导出（会被视为模块内部作用域）；只在 .d.ts 中用于全局声明
3. **import type 和 import 的区别？什么时候用 import type？**
   → 方向：import type 只导入类型信息，编译后完全消除（减小打包体积）；纯类型导入时推荐使用

---

## Q23: 什么是声明合并（Declaration Merging）？它在实际开发中有哪些应用场景？
- **难度**：★★★

**参考答案要点**：

**声明合并**：TypeScript 编译器将多个同名声明的信息合并为一个定义。

**接口合并**：
```typescript
interface Box {
  height: number;
}
interface Box {
  width: number;
}
// 合并为 { height: number; width: number }

const box: Box = { height: 10, width: 20 }; // ✅
```

**命名空间合并**：
```typescript
class Album {
  label: string;
}
namespace Album {
  export const MAX_TRACKS = 20;
  export function create(label: string) {
    const album = new Album();
    album.label = label;
    return album;
  }
}

Album.create('Sony').label;  // ✅
Album.MAX_TRACKS;            // ✅
```

**实际应用场景**：
1. **扩展第三方库类型**（无需修改源码）
2. **Vue 插件扩展**
   ```typescript
   // 扩展 Vue 组件选项
   declare module '@vue/runtime-core' {
     export interface ComponentCustomOptions {
       myPluginOption?: string;
     }
   }
   ```
3. **全局类型增强**
   ```typescript
   // global.d.ts
   interface Window {
     __APP_CONFIG__: AppConfig;
   }
   ```

**注意**：`type` 别名不支持声明合并，重复定义会报错。

**参考来源**：[声明合并](https://juejin.cn/post/7523878122645520384)

### 深度拓展：手写模拟合并过程

#### 1. 伪代码：接口声明合并策略

```typescript
/**
 * 【伪代码】模拟 TypeScript 编译器的接口合并算法
 *
 * 编译器在遇到多个同名 interface 时，会执行以下合并流程：
 */

// ===== 合并引擎（简化版）=====

interface DeclarationMerger {
  /**
   * 合并两个同名接口的成员
   * @param original 原始声明（先出现的）
   * @param extension 扩展声明（后出现的）
   */
  mergeInterfaces(
    original: InterfaceDeclaration,
    extension: InterfaceDeclaration
  ): MergedInterface {
    const result: MergedInterface = {
      name: original.name,  // 名称相同
      members: new Map<string, MemberInfo>(),
      typeParameters: [...original.typeParameters],
      heritageClauses: [...original.heritageClauses],
    };

    // 步骤 1: 先将原始声明的所有成员加入结果
    for (const [key, member] of original.members) {
      result.members.set(key, { ...member });
    }

    // 步骤 2: 遍历扩展声明的每个成员，逐个处理冲突
    for (const [key, extMember] of extension.members) {
      const existing = result.members.get(key);

      if (!existing) {
        // 情况 A: 新属性 → 直接添加
        result.members.set(key, { ...extMember });
      } else if (isFunctionMember(existing) && isFunctionMember(extMember)) {
        // 情况 B: 函数成员 → 重载合并（不是覆盖！）
        result.members.set(key, mergeFunctionOverloads(existing, extMember));
      } else if (isPropertyMember(existing) && isPropertyMember(extMember)) {
        // 情况 C: 非函数属性 → 类型必须兼容，后者覆盖前者
        if (!isTypeCompatible(extMember.type, existing.type)) {
          throw new Error(
            `Subsequent property declaration must have the same type. ` +
            `Property '${key}' must be of type '${existing.type}', ` +
            `but here has type '${extMember.type}'.`
          );
        }
        // 类型相同或后者是前者的子类型 → 允许覆盖
        result.members.set(key, { ...extMember });  // 后者胜出
      } else {
        // 情况 D: 属性类型冲突（一个是函数一个不是）
        throw new Error(
          `Member '${key}' inconsistently declared as property and function`
        );
      }
    }

    return result;
  }

  /**
   * 【关键】函数重载合并规则
   *
   * 当两个声明都有同名函数时：
   * - 所有函数签名被收集为重载列表
   * - 原始声明的重载排在前面
   * - 扩展声明的重载追加在后面
   * - 实现签名（如果有）必须是最后一个
   */
  mergeFunctionOverloads(
    original: FunctionMember,
    extension: FunctionMember
  ): FunctionMember {
    return {
      kind: 'function',
      // 原始的重载在前，扩展的重载在后
      overloads: [
        ...original.overloads,
        ...extension.overloads,
      ],
      implementation: extension.implementation || original.implementation,
    };
  }
}

// ========== 完整示例演示 ==========

// 声明 1：原始接口
interface User {
  id: number;
  name: string;
  greet(greeting: string): string;  // 函数重载 #1
}

// 声明 2：扩展接口
interface User {
  email?: string;                    // 新增可选属性
  age: number;                       // 新增必填属性
  greet(name: string): string;       // 函数重载 #2（追加）
  getFullName(): string;             // 新增方法
}

/**
 * 【编译器合并后的结果】等价于：
 *
 * interface User {
 *   id: number;                      // 来自声明 1
 *   name: string;                    // 来自声明 1
 *   email?: string;                  // 来自声明 2（新增）
 *   age: number;                     // 来自声明 2（新增）
 *
 *   // 函数重载列表（按声明顺序排列）
 *   greet(greeting: string): string; // 来自声明 1（优先匹配）
 *   greet(name: string): string;     // 来自声明 2（次级匹配）
 *
 *   getFullName(): string;           // 来自声明 2（新增）
 * }
 */

// 使用示例
const user: User = {
  id:1,
  name: 'Alice',
  age: 30,
  // email 是可选的，可以不提供

  // greet 有两种调用方式（重载）
  greet: (arg: string) => {
    // 根据参数类型/数量自动选择正确的重载
    return `Hello, ${arg}!`;
  },

  getFullName: () => 'Alice',
};

user.greet('Hi');      // ✅ 匹配重载 #1: (greeting: string) => string
user.greet('Alice');   // ✅ 匹配重载 #2: (name: string) => string
```

#### 2. 命名空间与类的声明合并

```typescript
/**
 * 【命名空间 + 类】声明合并
 *
 * 场景：为类添加静态成员（静态属性、工厂方法、工具函数）
 * 这是 jQuery、axios 等库常用的模式
 *
 * 【合并规则】
 * - 类定义实例成员（prototype 上的属性和方法）
 * - 同名命名空间定义静态成员（构造函数本身的属性）
 * - 两者合并后，类既有实例方法又有静态方法
 */

// ===== 手写模拟 =====

class Validator {
  /** 实例方法：验证单个值 */
  validate(value: any): boolean {
    return value !== null && value !== undefined;
  }
}

// 命名空间与类合并！为 Validator 类添加静态成员
namespace Validator {
  /** 静态属性：内置规则集合 */
  export const rules: Record<string, RegExp> = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^1[3-9]\d{9}$/,
  };

  /** 静态方法：快速创建预配置的验证器 */
  static create(ruleName: string): Validator {
    const validator = new Validator();
    (validator as any).rule = rules[ruleName];
    return validator;
  }

  /** 静态工具方法：邮箱格式检查 */
  static isEmail(value: string): boolean {
    return rules.email.test(value);
  }
}

// ===== 使用效果 =====

const v = new Validator();
v.validate('test');              // ✅ 实例方法

Validator.isEmail('a@b.com');    // ✅ 静态方法（来自命名空间）
Validator.rules.email;           // ✅ 静态属性（来自命名空间）

const emailValidator = Validator.create('email');
// ✅ 静态工厂方法（来自命名空间），返回类实例

/**
 * 【实际应用场景】
 * 这种模式常见于：
 * 1. 类库的核心类设计（如 axios 的 Axios 类 + 静态工具方法）
 * 2. 为现有类补充静态工具函数而不修改原始类定义
 * 3. 声明文件中为 JavaScript 库补充类型信息
 */
```

#### 3. 命名空间与枚举的声明合并

```typescript
/**
 * 【命名空间 + 枚举】声明合并
 *
 * 场景：为枚举添加相关的方法和常量
 * 使枚举不仅是值集合，还携带行为
 *
 * 【典型用例】
 * - 枚举值的反向映射增强
 * - 枚举相关的工具函数
 * - 枚举的类型守卫
 */

// ===== 基础枚举定义 =====
enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

// 命名空间与枚举合并！为 HttpMethod 添加功能
namespace HttpMethod {
  /** 判断是否是"安全"方法（不修改服务端数据） */
  export function isSafe(method: HttpMethod): boolean {
    return method === GET;  // 只有 GET 是安全的
  }

  /** 判断是否需要请求体 */
  export function requiresBody(method: HttpMethod): boolean {
    return method === POST || method === PUT || method === PATCH;
  }

  /** 获取所有允许的方法列表 */
  export function getAll(): HttpMethod[] {
    return Object.values(HttpMethod) as HttpMethod[];
  }

  /** 类型守卫：检查值是否是合法的 HttpMethod */
  export function isHttpMethod(value: string): value is HttpMethod {
    return Object.values(HttpMethod).includes(value as HttpMethod);
  }
}

// ===== 使用效果 =====

const method = HttpMethod.POST;

HttpMethod.isSafe(method);         // false
HttpMethod.requiresBody(method);   // true

const allMethods = HttpMethod.getAll();
// ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

// 类型守卫使用
function makeRequest(url: string, method: string) {
  if (HttpMethod.isHttpMethod(method)) {
    // method 在此块内被收窄为 HttpMethod 类型
    console.log(`${method} requires body:`, HttpMethod.requiresBody(method));
  } else {
    throw new Error(`Invalid HTTP method: ${method}`);
  }
}
```

#### 4. 命名空间与函数的声明合并

```typescript
/**
 * 【命名空间 + 函数】声明合并
 *
 * 场景：为函数添加属性（使其成为"可调用的对象"）
 * 这是最灵活的合并形式，函数既可调用又可访问属性
 *
 * 【经典案例】
 * - jQuery: $('selector') 同时有 $.ajax, $.fn 等属性
 * - lodash: _.map() 同时有 _.version 等属性
 */

// ===== 基础函数定义 =====
function createRouter(basePath: string) {
  let currentPath = basePath;

  return {
    navigate(path: string) {
      currentPath = `${basePath}/${path}`;
      console.log(`Navigated to: ${currentPath}`);
      return currentPath;
    },
    getCurrentPath() {
      return currentPath;
    },
  };
}

// 命名空间与函数合并！为 createRouter 添加静态能力
namespace createRouter {
  /** 全局路由实例缓存 */
  export const cache = new Map<string, ReturnType<typeof createRouter>>();

  /** 预设的路由配置 */
  export const presets = {
    api: '/api/v1',
    admin: '/admin',
    user: '/user',
  } as const;

  /** 工厂快捷方式：使用预设创建路由器 */
  export function fromPreset(preset: keyof typeof presets) {
    const cached = cache.get(preset);
    if (cached) return cached;

    const router = createRouter(presets[preset]);
    cache.set(preset, router);
    return router;
  }

  /** 清除所有缓存的实例 */
  export function clearCache() {
    cache.clear();
  }
}

// ===== 使用效果 =====

// 方式 1: 直接调用（作为普通函数）
const apiRouter = createRouter('/api/v1');
apiRouter.navigate('/users');

// 方式 2: 使用预设（通过合并的命名空间属性）
const adminRouter = createRouter.fromPreset('admin');
adminRouter.navigate('/dashboard');

// 访问合并的静态属性
console.log(createRouter.presets.api);    // '/api/v1'
createRouter.clearCache();                 // 清除缓存

/**
 * 【为什么这种模式有用？】
 *
 * 1. 组织性：将相关的功能聚合在一个标识符下
 * 2. 可发现性：createRouter. 可以触发 IDE 自动补全，展示所有可用选项
 * 3. 向后兼容：不破坏原有的函数调用方式，同时增加新能力
 * 4. 类型安全：所有新增属性都有完整的类型信息
 */
```

#### 5. 声明合并完整流程图解

```
┌─────────────────────────────────────────────────────────────────┐
│              TypeScript 声明合并工作流                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  输入源码:                                                      │
│  ┌─────────────────┐  ┌─────────────────┐                      │
│  │ 文件 A.ts        │  │ 文件 B.ts        │                      │
│  │                 │  │                 │                      │
│  │ interface Foo { │  │ interface Foo { │                      │
│  │   a: number;   │  │   b: string;   │                      │
│  │   bar(): void; │  │   bar(x: number):│                      │
│  │ }               │  │   void;         │                      │
│  └─────────────────┘  └─────────────────┘                      │
│                                                                 │
│                          ↓                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 编译器合并引擎                                            │   │
│  │                                                          │   │
│  │  1. 收集所有名为 "Foo" 的接口声明                           │   │
│  │  2. 按出现顺序排序                                        │   │
│  │  3. 逐个成员合并:                                         │   │
│  │     ├─ a: number → 直接加入                              │   │
│  │     ├─ b: string → 直接加入                              │   │
│  │     └─ bar: 函数 → 重载合并!                             │   │
│  │        ├─ bar(): void           (来自文件 A)             │   │
│  │        └─ bar(x: number): void   (来自文件 B)             │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓                                      │
│  输出结果:                                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ interface Foo {                                         │   │
│  │   a: number;                                           │   │
│  │   b: string;                                           │   │
│  │   bar(): void;          // 重载 1（优先匹配）            │   │
│  │   bar(x: number): void;  // 重载 2                      │   │
│  │ }                                                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  【支持的合并组合】                                              │
│  ┌──────────────┬──────────────┬────────────────────────────┐   │
│  │ 类型 A        │ 类型 B        │ 合并结果                   │   │
│  ├──────────────┼──────────────┼────────────────────────────┤   │
│  │ Interface     │ Interface     │ 成员合并（函数重载）        │   │
│  │ Namespace     │ Namespace     │ 成员合并                   │   │
│  │ Class         │ Namespace     │ 静态成员附加到类           │   │
│  │ Enum          │ Namespace     │ 方法/属性附加到枚举        │   │
│  │ Function      │ Namespace     │ 属性附加到函数             │   │
│  │ Enum          │ Enum          │ ❌ 不支持（会报错）        │   │
│  │ Class         │ Class         │ ❌ 不支持（会报错）        │   │
│  │ Type Alias    │ Type Alias    │ ❌ 不支持（重复定义错误）   │   │
│  └──────────────┴──────────────┴────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 三、代码分析题（3道）

## Q24: 分析以下泛型代码，解释每个泛型参数的含义和约束条件。
- **难度**：★★☆

```typescript
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const response = await fetch(url, options);
  const json = await response.json();
  return json as ApiResponse<T>;
}

interface User {
  id: number;
  name: string;
  email: string;
}

async function getUser(id: number) {
  const result = await fetchData<User>(`/api/users/${id}`);
  // result.data 的类型是什么？
  console.log(result.data.name);  // 安全吗？
}
```

**参考答案**：

- `fetchData<T>`：T 是响应数据的类型参数
- 返回 `Promise<ApiResponse<T>>`：包装后的 API 响应结构
- `fetchData<User>` 调用时，T 被确定为 `User`
- 因此 `result.data` 类型为 `User`，`result.data.name` 类型为 `string` ✅ 安全

**潜在问题**：`as ApiResponse<T>` 是类型断言，运行时并不验证数据结构。生产环境建议使用 zod/valibot 等 schema 验证库做运行时校验。

---

## Q25: 以下使用了多种高级特性的代码，请逐行分析其类型行为。
- **难度**：★★★

```typescript
type EventMap = {
  click: { x: number; y: number };
  keydown: { key: string; code: number };
};

type EventHandler<K extends keyof EventMap> = (event: EventMap[K]) => void;

class EventEmitter<Events extends Record<string, any>> {
  private listeners = new Map<keyof Events, Set<Function>>();

  on<K extends keyof Events>(event: K, handler: EventHandler<any>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    this.listeners.get(event)?.forEach(handler => handler(payload));
  }
}

const emitter = new EventEmitter<EventMap>();

emitter.on('click', (e) => {
  console.log(e.x, e.y);  // e 的类型？
});

emitter.emit('click', { x: 100, y: 200 });  // payload 需要什么结构？
emitter.emit('keydown', { key: 'Enter', code: 13 }); // 合法吗？
// emitter.emit('click', { x: 100 });  // 这行会怎样？
```

**参考答案**：

- 这是一个**类型安全的事件系统**实现
- `EventMap` 定义事件名称到事件载荷的映射
- `EventHandler<K>` 根据 K 从 `EventMap` 中取出对应的事件载荷类型
- `emitter.on('click', handler)` 中，handler 参数 `e` 的类型自动推断为 `{ x: number; y: number }`
- `emitter.emit('click', { x: 100, y: 200 })` ✅ 符合 `EventMap['click']` 结构
- `emitter.emit('keydown', { key: 'Enter', code: 13 })` ✅ 符合 `EventMap['keydown']` 结构
- `emit('click', { x: 100 })` ❌ 缺少必需属性 `y`，编译报错

**考察点**：泛型约束、索引类型访问、映射类型、回调类型推断

---

## Q26: 请分析以下代码中协变（covariance）和逆变（contravariance）的表现。
- **难度**：★★★

```typescript
class Animal { name: string = 'animal'; }
class Dog extends Animal { breed: string = 'golden'; }
class Cat extends Animal { color: string = 'white'; }

type AnimalHandler = (a: Animal) => void;
type DogHandler = (d: Dog) => void;

let handleAnimal: AnimalHandler = (a) => console.log(a.name);
let handleDog: DogHandler = (d) => { console.log(d.name); console.log(d.breed); };

// 以下赋值哪些合法？（假设 strictFunctionTypes: true）
handleDog = handleAnimal;  // ①
handleAnimal = handleDog;  // ②

// 数组的协变
let animals: Animal[] = [new Dog(), new Cat()];
let dogs: Dog[] = [new Dog(), new Dog()];
animals = dogs;  // ③
dogs = animals;   // ④
```

**参考答案**：

| 赋值 | 是否合法 | 原因 |
|------|---------|------|
| ① `handleDog = handleAnimal` | ✅ 合法 | **逆变**：函数参数位置，父类型函数可以赋给子类型函数（更宽泛的参数接受范围更安全） |
| ② `handleAnimal = handleDog` | ❌ 不合法 | 如果允许，传入 Animal 时调用 `d.breed` 会崩溃 |
| ③ `animals = dogs` | ✅ 合法 | **协变**：Dog[] 是 Animal[] 的子类型 |
| ④ `dogs = animals` | ❌ 不合法 | animals 可能包含 Cat，不是 Dog |

**记忆口诀**：
- **参数逆变**（In）：子→父安全（更宽松的入参）
- **返回值协变**（Out）：子→父安全（更具体的返回）

**参考来源**：[协变与逆变](https://blog.51cto.com/u_17171324/14506902)

### 深度拓展：手写模拟 TypeScript 类型检查器

#### 1. 伪代码：协变/逆变判断逻辑

```typescript
/**
 * 【伪代码】模拟 TypeScript 编译器的类型兼容性检查
 * 这段代码展示编译器内部如何判断两个类型是否可以互相赋值
 *
 * 核心原则：类型安全优先
 * - 如果赋值可能导致运行时错误，则不允许
 */

// ===== 类型层次定义 =====
// 继承链: Dog → Animal (Dog 是 Animal 的子类)
class Animal { name: string = 'animal'; }
class Dog extends Animal { breed: string = 'golden'; }
class Cat extends Animal { color: string = 'white'; }

/**
 * 模拟编译器的子类型检查函数
 * @param source 源类型（被赋值的类型）
 * @param target 目标类型（要赋值给的目标）
 */
function isSubtype(source: Type, target: Type): boolean {
  // 规则 1: 同一类型总是兼容
  if (source === target) return true;

  // 规则 2: 类的继承关系（Dog 是 Animal 的子类）
  if (source instanceof ClassType && target instanceof ClassType) {
    return source.extends(target); // Dog extends Animal → true
  }

  // 规则 3: 数组类型的协变检查
  if (source instanceof ArrayType && target instanceof ArrayType) {
    return isSubtype(source.elementType, target.elementType);
    // Dog[] → Animal[] ✅ 因为 Dog 是 Animal 子类型（协变）
    // Animal[] → Dog[] ❌ 因为 Animal 不是 Dog 子类型
  }

  // 规则 4: 函数类型的特殊检查（关键！）
  if (source instanceof FunctionType && target instanceof FunctionType) {
    return checkFunctionCompatibility(source, target);
  }

  return false;
}

/**
 * 函数类型兼容性检查（核心！）
 *
 * 【双变性规则】
 * - 参数位置：逆变（Contravariant）— 需要更宽泛的参数类型
 * - 返回值位置：协变（Covariant）— 可以返回更具体的类型
 */
function checkFunctionCompatibility(
  source: FunctionType,  // 源函数（被赋值的函数）
  target: FunctionType   // 目标函数（期望的类型）
): boolean {

  // 步骤 1: 检查参数数量（源函数参数可以少于目标，但不能多）
  if (source.params.length > target.params.length) return false;

  // 步骤 2: 检查每个参数的类型（⚠️ 逆变规则）
  for (let i = 0; i < target.params.length; i++) {
    const srcParam = source.params[i] ?? target.params[i]; // 缺失参数使用目标参数
    const tgtParam = target.params[i];

    /**
     * 【逆变的直觉解释】
     *
     * 假设目标函数签名是 handleDog(dog: Dog)
     * 源函数签名是 handleAnimal(animal: Animal)
     *
     * 当调用 handleDog 时，传入的一定是 Dog 实例
     * handleAnimal 能处理 Animal，而 Dog 是 Animal 的子类
     * 所以 handleAnimal 完全可以安全地处理 Dog → 赋值合法！✅
     *
     * 反过来：
     * 目标函数签名是 handleAnimal(animal: Animal)
     * 源函数签名是 handleDog(dog: Dog)
     *
     * 当调用 handleAnimal 时，可能传入 Cat（也是 Animal）
     * 但 handleDog 内部访问 dog.breed 会崩溃（Cat 没有 breed）
     * 所以这种赋值不安全 → 不允许！❌
     */
    if (!isSubtype(tgtParam, srcParam)) {  // 注意顺序反转了！
      return false; // 目标参数必须是源参数的子类型
    }
  }

  // 步骤 3: 检查返回值类型（协变规则）
  /**
   * 【协变的直觉解释】
   *
   * 目标期望返回 Animal
   * 源函数实际返回 Dog
   *
   * 返回 Dog 是安全的，因为 Dog 包含 Animal 的所有属性
   * 使用方按 Animal 接口访问，完全没问题 → 合法！✅
   */
  if (!isSubtype(source.returnType, target.returnType)) {
    return false; // 源返回值必须是目标返回值的子类型
  }

  return true;
}

// ===== 具体例子验证 =====

// 例 1: 函数参数逆变
type AnimalHandler = (a: Animal) => void;
type DogHandler = (d: Dog) => void;

// isSubtype(AnimalHandler, DogHandler)?
// 检查参数: isSubtype(Dog, Animal)? → true (Dog 是 Animal 子类)
//           注意: 这里是 tgtParam(Dog) vs srcParam(Animal)，所以是逆序
// 检查返回: isSubtype(void, void)? → true
// 结果: ✅ handleDog = handleAnimal 合法

// 例 2: 数组协变
// isSubtype(Dog[], Animal[])?
// 等价于: isSubtype(Dog, Animal)? → true
// 结果: ✅ animals = dogs 合法
```

#### 2. 为什么数组是协变的？

```typescript
/**
 * 【数组协变的原理】
 *
 * 从数学角度理解：
 * - 如果 A <: B（A 是 B 的子类型）
 * - 那么 Array<A> <: Array<B>（A数组 是 B数组的子类型）
 *
 * 这符合直觉：
 * - Dog[] 数组中的每个元素都是 Dog
 * - Dog 也是 Animal
 * - 所以 Dog[] 数组中的每个元素都可以当作 Animal 用
 * - 因此 Dog[] 可以赋给 Animal[]
 *
 * 【为什么这是安全的？】
 * 只读操作时完全安全：
 */
function printNames(animals: Animal[]): void {
  animals.forEach(a => console.log(a.name));  // 只读取 name 属性
}

const dogs: Dog[] = [new Dog(), new Dog()];
printNames(dogs);  // ✅ 安全！Dog 有 name 属性

/**
 * ⚠️ 但写入操作时有潜在风险（变异问题 Mutation）
 * 这就是为什么 Java 泛型是不变（invariant）的原因
 */
function addCat(animals: Animal[]): void {
  animals.push(new Cat());  // 如果 dogs 被传入这里...
}

const myDogs: Dog[] = [new Dog()];
// addCat(myDogs);  // TS 报错阻止了这个危险操作
// 如果允许，myDogs[0] 现在是 Cat，但类型系统认为是 Dog！
```

#### 3. strictFunctionTypes 开启前后的差异

```typescript
/**
 * 【strictFunctionTypes 配置的影响】
 *
 * strictFunctionTypes: false（默认关闭，为了向后兼容）
 * - 对象属性中的函数：双变（bivariant），参数既协变又逆变
 * - 更宽松，但不安全
 *
 * strictFunctionTypes: true（推荐开启）
 * - 所有函数：参数严格逆变
 * - 更安全，能捕获更多潜在 bug
 */

// ===== 场景演示 =====

interface EventHandlers {
  // 对象属性中的函数
  onClick: (event: MouseEvent) => void;
  onInput: (event: KeyboardEvent) => void;
}

const handlers: EventHandlers = {
  // strictFunctionTypes: false 时这段代码通过（不安全！）
  onClick: (e: Event) => {  // Event 比 MouseEvent 更宽泛
    // e.clientX;  // ❌ Event 上不存在 clientX！运行时可能出错
    console.log('clicked');
  },

  // strictFunctionTypes: true 时上面会报错：
  // Type '(e: Event) => void' is not assignable to type '(event: MouseEvent) => void'
};

/**
 * 【为什么默认是双变？】
 * 历史原因：早期 TypeScript 为了与 JavaScript 的宽松特性保持一致
 * 很多现有代码依赖这种行为
 *
 * 【建议】始终开启 strictFunctionTypes: true
 * 它能在编译期发现潜在的运行时错误
 */

// 另一个对比示例
type NumberToString = (n: number) => string;
type AnyToString = (a: any) => string;

let numToStr: NumberToString = n => n.toFixed(2);
let anyToStr: AnyToString = a => String(a);

// strictFunctionTypes: false
anyToStr = numToStr;  // ✅ 双变允许
numToStr = anyToStr;  // ✅ 双变允许（不安全！）

// strictFunctionTypes: true
anyToStr = numToStr;  // ✅ 逆变：number 是 any 的子类型，所以合法
// numToStr = anyToStr;  // ❌ 逆变不满足：any 不是 number 的子类型
```

#### 4. 里氏替换原则（LSP）与逆变的联系

```typescript
/**
 * 【里氏替换原则 Liskov Substitution Principle】
 * "所有引用基类的地方必须能透明地使用其子类对象"
 *
 * 在函数参数上的体现：
 * - 如果一个函数能处理 Animal
 * - 那么它一定也能处理 Dog（因为 Dog 是一种 Animal）
 * - 所以接受 Animal 参数的函数，可以用在接受 Dog 参数的地方
 *
 * 这就是"逆变"的数学基础！
 */

// ===== 直观类比 =====

/**
 * 【现实世界类比：宠物护理服务】
 *
 * 假设有一个"狗美容师"服务，只接收狗
 * 和一个"动物医生"服务，接收任何动物
 *
 * 问：能否让动物医生去当狗美容师？
 * 答：可以！因为动物医生能处理任何动物，当然也能处理狗 ✅
 *       （这就是 handleDog = handleAnimal 合法的原因）
 *
 * 问：能否让狗美容师去当动物医生？
 * 答：不行！如果送来一只猫，狗美容师不知道怎么处理 ❌
 *       （这就是 handleAnimal = handleDog 非法的原因）
 */

// ===== 代码化的 LSP 示例 =====

abstract class AnimalCare {
  abstract careFor(animal: Animal): void;
}

class Veterinarian extends AnimalCare {
  // 兽医可以照顾任何动物
  careFor(animal: Animal): void {
    console.log(`检查 ${animal.name} 的健康状况`);
  }
}

class DogGroomer extends AnimalCare {
  // 狗美容师只能照顾狗
  careFor(animal: Animal): void {  // LSP 要求参数至少是 Animal
    // 但实际上我们只处理 Dog
    const dog = animal as Dog;
    console.log(`给 ${dog.name} (${dog.breed}) 做美容`);
  }
}

// LSP 允许用 Veterinarian 替代 DogGroomer 的位置吗？
// 从类型系统的角度：是的（因为参数逆变）
// 从业务逻辑的角度：需要具体分析

// ===== 协变/逆变速查表 =====

/**
 * ┌─────────────────┬──────────────────┬────────────────────┐
 * │ 位置             │ 方向              │ 记忆方式            │
 * ├─────────────────┼──────────────────┼────────────────────┤
 * │ 函数参数         │ 逆变 Contravariant│ In → Inverted      │
 * │ 函数返回值       │ 协变 Covariant   │ Out → Ordinary     │
 * │ 普通对象属性     │ 协变 Covariant   │ 与继承方向一致      │
 * │ 数组元素        │ 协变 Covariant   │ Dog[] <: Animal[]  │
 * │ 泛型接口(只读)   │ 协变 Covariant   │ ReadonlyArray      │
 * │ 泛型接口(读写)   │ 不变 Invariant   │ 不能随便赋值        │
 * └─────────────────┴──────────────────┴────────────────────┘
 *
 * 【不变的场景】为什么有些情况下既不协变也不逆变？
 * 当一个泛型类型同时用于输入和输出时，必须保证精确匹配
 *
 * interface Box<T> {
 *   get(): T;      // T 用于输出 → 希望协变
 *   set(value: T): void;  // T 用于输入 → 希望逆变
 * }
 * 两者冲突 → 只能不变（invariant）
 */
```

### 🔍 追问链
1. **这个事件系统的类型安全是如何保证的？回调参数类型是怎么自动推导出来的？**
   → 方向：通过 Map 映射事件名到参数元组类型，on/emit 通过泛型约束从 Map 中取出对应的参数类型
2. **如果事件需要支持异步回调（返回 Promise），类型定义要怎么改？**
   → 方向：将回调类型改为 `(args) => Promise<void>` 或 `(args) => void | Promise<void>`
3. **如何支持一次性事件（once）并自动取消订阅？**
   → 方向：once 方法注册后首次触发时自动 off，类型与 on 一致

---

### 四、编程实践题（3道）

## Q27: 实现一个类型安全的深拷贝函数 `deepClone<T>`，要求保持泛型类型不变。
- **难度**：★★★

**参考答案**：

```typescript
function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  if (obj instanceof Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        (clonedObj as any)[key] = deepClone((obj as any)[key]);
      }
    }
    return clonedObj;
  }

  return obj;
}

// 使用示例
const original = {
  name: 'Tom',
  scores: [90, 85, 92],
  meta: { created: new Date(), tags: ['student'] },
};

const cloned = deepClone(original);
cloned.scores.push(100);  // 不影响 original
console.log(cloned.meta.created instanceof Date); // true
```

**考察点**：泛型保留、递归类型处理、Date/Array 等内置对象处理

### 🔍 追问链
1. **Date 对象为什么要特殊处理？JSON.parse(JSON.stringify(date)) 会丢失什么？**
   → 方向：Date 序列化后变成字符串，反序列化后是字符串不是 Date 对象；还会丢失 undefined、function、Symbol、循环引用
2. **深拷贝中如何处理循环引用？**
   → 方向：使用 WeakMap<object, object> 缓存已复制对象，每次复制前检查缓存避免无限递归
3. **结构化克隆（structuredClone）API 和手写深拷贝的区别？**
   → 方向：structuredClone 浏览器原生支持，能处理更多类型（RegExp、ArrayBuffer、Map/Set 等），但不能处理 function/class 实例

---

## Q28: 实现一个 `Optionalize<T, K>` 工具类型，使对象 T 中由 K 指定的属性及其嵌套路径下的属性全部变为可选。
- **难度**：★★★

**参考答案**：

```typescript
// 基础版本：将指定属性设为可选
type Optionalize<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 进阶版本：支持嵌套路径（如 'address.city'）
type PathKeys<T, Path extends string> =
  Path extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? { [K in Key]: Optionalize<T[K], Rest> } & Omit<T, Key>
      : T
    : Path extends keyof T
      ? Partial<Pick<T, Path>> & Omit<T, Path>
      : T;

interface UserProfile {
  id: number;
  name: string;
  address: {
    city: string;
    street: string;
  };
  contacts: {
    email: string;
    phone: string;
  };
}

// 使用
type OptionalCity = PathKeys<UserProfile, 'address.city'>;
// address 变为可选，且 city 也变为可选

// 更实用的：多路径同时处理
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type FullyOptional = DeepPartial<UserProfile>;
// 所有层级的属性都是可选的
```

**考察点**：映射类型、模板字面量类型、递归类型、Pick/Omit 组合

---

## Q29: 实现一个类型安全的 HTTP 请求封装，支持泛型响应类型和错误处理。
- **难度**：★★★

**参考答案**：

```typescript
// 定义通用 API 错误类型
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

// 包装后的响应类型
type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };

// 请求配置
interface RequestConfig<T = any> extends Omit<RequestInit, 'body'> {
  url: string;
  params?: Record<string, string>;
  body?: T;
  timeout?: number;
}

class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<ApiResult<T>> {
    const url = new URL(`${this.baseURL}${path}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }
    return this.request<T>(url.toString());
  }

  async post<T, B = any>(path: string, body?: B): Promise<ApiResult<T>> {
    return this.request<T>(`${this.baseURL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  private async request<T>(url: string, init?: RequestInit): Promise<ApiResult<T>> {
    try {
      const response = await fetch(url, init);
      if (!response.ok) {
        const error: ApiError = await response.json().catch(() => ({
          code: String(response.status),
          message: response.statusText,
        }));
        return { success: false, error };
      }
      const data: T = await response.json();
      return { success: true, data };
    } catch (networkError) {
      return {
        success: false,
        error: { code: 'NETWORK_ERROR', message: (networkError as Error).message },
      };
    }
  }
}

// 使用示例
const api = new HttpClient('/api/v1');

async function loadUser(id: number) {
  const result = await api.get<{ name: string; email: string }>(`/users/${id}`);

  if (result.success) {
    console.log(result.data.name);  // ✅ 类型安全
    console.log(result.data.email); // ✅ 类型安全
    // result.data.age;             // ❌ 不存在此属性
  } else {
    console.error(`[${result.error.code}] ${result.error.message}`);
  }
}
```

**考察点**：联合类型区分成功/失败、泛型请求/响应、Discriminated Union 模式

---

## 第三部分：专家层（高级难度）

> **考察目标**：条件类型、映射类型进阶、装饰器、类型体操、工程架构
> **适用岗位**：高级/资深前端开发、Tech Lead、架构师

---

### 一、选择题（2道）

## Q30: 以下条件类型代码的结果是什么？
- **难度**：★★★

```typescript
type ToArray<T> = T extends any ? T[] : never;

type StrArr = ToArray<string>;        // A
type NumArr = ToArray<number>;        // B
type UnionArr = ToArray<string | number>; // C（分布式条件类型）
```

**A)** A=string[], B=number[], C=(string | number)[]  
**B)** A=string[], B=number[], C=string[] | number[]  
**C)** A=never, B=never, C=never  
**D)** 以上都不对  

**正确答案**：B  
**知识点**：[分布式条件类型](https://blog.csdn.net/weixin_60526471/article/details/153528752)  
**解析**：
- 当 T 是**裸类型参数**（未被包装在元组、Promise、数组等中）且是联合类型时，条件类型会**分布式地**应用于联合类型的每个成员
- `ToArray<string | number>` ≡ `ToArray<string> | ToArray<number>` ≡ `string[] | number[]`
- 这就是**分布式条件类型（Distributive Conditional Types）**

**避免分布式的技巧**：将 T 放入元组 `[T]` 即可
```typescript
type NonDistributed<T> = [T] extends [any] ? T[] : never;
type Result = NonDistributed<string | number>; // (string | number)[] — 不再分布式
```

### 深度拓展：手写实现

#### 手写实现 MyExclude 和 MyExtract

```typescript
/**
 * MyExclude<T, U>: 从联合类型 T 中排除可分配给 U 的类型成员
 * 核心原理：利用分布式条件类型的分发特性 + never 吸收律
 *
 * 【关键机制】当 T 是裸类型参数（如 A | B | C）时：
 * T extends U ? X : Y 会被展开为：
 * (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
 *
 * 【never 吸收律】A | never = A（never 在联合类型中被吸收）
 * 这使得"被排除的成员"自动消失，只保留目标成员
 */
type MyExclude<T, U> = T extends U ? never : T;

/**
 * MyExtract<T, U>: 从联合类型 T 中提取可分配给 U 的类型成员
 * 与 Exclude 相反的逻辑：保留匹配的，丢弃不匹配的（返回 never）
 */
type MyExtract<T, U> = T extends U ? T : never;

// ========== 使用示例 ==========
type Status = 'pending' | 'success' | 'error' | 'loading';

// 示例 1: 排除特定状态
type NonErrorStatus = MyExclude<Status, 'error'>;
// 推导过程：
// MyExclude<'pending' | 'success' | 'error' | 'loading', 'error'>
// ≡ ('pending' extends 'error' ? never : 'pending')    → 'pending'
//   | ('success' extends 'error' ? never : 'success')   → 'success'
//   | ('error' extends 'error' ? never : 'error')       → never ❗
//   | ('loading' extends 'error' ? never : 'loading')   → 'loading'
// = 'pending' | 'success' | never | 'loading'
// 应用 never 吸收律：= 'pending' | 'success' | 'loading'

// 示例 2: 提取字符串类型成员
type Mixed = string | number | boolean | (() => void);
type OnlyStringOrNumber = MyExtract<Mixed, string | number>;
// = string | number （boolean 和函数类型被排除为 never 后吸收）

// 示例 3: 实际应用 - 过滤函数参数的可选性
type RequiredKeys<T> = MyExclude<
  { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T],
  undefined
>;

interface UserInfo {
  id: number;           // 必填
  name?: string;        // 可选
  email?: string;       // 可选
  age: number;          // 必填
}
type ReqKeys = RequiredKeys<UserInfo>; // 'id' | 'age'
```

#### 完整推导过程图解

```
输入: MyExclude<string | number | boolean, number>

步骤 1: 检测到 T 是联合类型（裸类型参数），触发分布式条件类型

步骤 2: 分发展开（Distribute）
┌─────────────────────────────────────────────────────────────┐
│  T extends U ? never : T                                    │
│                                                             │
│  ↓ 分发为每个成员独立判断                                     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ① string extends number ? never : string             │   │
│  │   └─→ string 不能赋给 number                         │   │
│  │       └─→ 取假值: string                             │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ ② number extends number ? never : number             │   │
│  │   └─→ number 可以赋给 number ✅                       │   │
│  │       └─→ 取真值: never                              │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ ③ boolean extends number ? never : boolean           │   │
│  │   └─→ boolean 不能赋给 number                        │   │
│  │       └─→ 取假值: boolean                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  结果: string | never | boolean                              │
└─────────────────────────────────────────────────────────────┘

步骤 3: 应用 never 吸收律（Absorption Law）
┌─────────────────────────────────────────────────────────────┐
│  联合类型中的 never 会被"吸收"（消失）                        │
│                                                             │
│  A | never = A     （never 是空集合，并集不影响）             │
│  A | never | B = A | B                                      │
│                                                             │
│  string | never | boolean                                   │
│       ↓                                                      │
│  string | boolean  ← 最终结果                                │
└─────────────────────────────────────────────────────────────┘
```

#### 为什么包装后就不分发？

```typescript
/**
 * 【核心区别】裸类型参数 vs 包装后的类型参数
 *
 * "裸类型参数"指：T 直接出现在 extends 左侧，没有被元组/数组/Promise 等包装
 * 一旦包装成 [T]、T[]、Promise<T> 等，就不再是"裸"的，不会触发分发
 */

type Distributive<T> = T extends any ? [T] : never;
// T 是裸的 → 触发分发

type R1 = Distributive<string | number>;
// = [string] | [number]  ← 分发了！

type NonDistributive<T> = [T] extends [any] ? T : never;
// T 被 [ ] 包装 → 不触发分发，整体判断

type R2 = NonDistributive<string | number>;
// = string | number  ← 整体作为 [string|number] 判断，不分发

/** 应用场景：对联合类型整体做操作而非逐个处理 */
type UnionToIntersection<U> =
  (U extends any ? (arg: U) => void : never) extends (arg: infer I) => void ? I : never;
// 利用函数参数逆变性将联合转为交叉：A | B → A & B
```

---

## Q31: TypeScript 5.x 中装饰器的执行顺序是什么？
- **难度**：★★☆

```typescript
function First() {
  console.log('First: factory');
  return function (target: any, context: ClassMethodDecoratorContext) {
    console.log('First: called');
  };
}

function Second() {
  console.log('Second: factory');
  return function (target: any, context: ClassMethodDecoratorContext) {
    console.log('Second: called');
  };
}

class Example {
  @First()
  @Second()
  method() {}
}
```

**A)** First: factory → Second: factory → Second: called → First: called  
**B)** Second: factory → First: factory → First: called → Second: called  
**C)** First: factory → First: called → Second: factory → Second: called  
**D)** First: factory → Second: factory → First: called → Second: called  

**正确答案**：A  
**知识点**：[装饰器执行顺序](https://juejin.cn/post/7530179511728930856)  
**解析**：
1. **工厂函数求值**：从上到下（First → Second）
2. **装饰器调用**：从下到上（Second → First），即离目标最近的先执行

**完整执行顺序**（类装饰器场景）：
- 类成员装饰器：工厂上到下，调用下到上
- 类装饰器：最后执行

---

### 二、简答题（5道）

## Q32: 请详细解释条件类型（Conditional Types）的语法和 `infer` 关键字的工作原理，并手写实现 `ReturnType`、`Parameters`、`Awaited` 三个工具类型。
- **难度**：★★★

**参考答案要点**：

**条件类型语法**：`T extends U ? X : Y`
- 判断 T 是否可分配给 U
- 是则取 X 类型，否则取 Y 类型

**infer 关键字**：在条件类型的 `extends` 子句中进行**类型推断**，声明一个待推断的类型变量。

```typescript
// 1. ReturnType: 提取函数返回值类型
type MyReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : never;

function getData(): Promise<string[]> {
  return Promise.resolve(['a', 'b']);
}
type Data = MyReturnType<typeof getData>; // Promise<string[]>

// 2. Parameters: 提取函数参数类型为元组
type MyParameters<T extends (...args: any[]) => any> =
  T extends (...args: infer P) => any ? P : never;

function addUser(name: string, age: number, active?: boolean): User {}
type AddUserParams = MyParameters<typeof addUser>;
// [name: string, age: number, active?: boolean | undefined]

// 3. Awaited: 递归解包 Promise（TS 4.5+ 内置）
type MyAwaited<T> =
  T extends Promise<infer U> ? MyAwaited<U> : T;

type Unpacked = MyAwaited<Promise<Promise<string>>>; // string
```

**更多 infer 用例**：
```typescript
// 提取数组元素类型
type ElementOf<T> = T extends (infer E)[] ? E : never;

// 提取函数第一个参数
type FirstParam<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never;

// 提取 Promise 成功值
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
```

**参考来源**：[条件类型与 infer](https://blog.csdn.net/weixin_60526471/article/details/153528752)

### 深度拓展：手写实现

#### 1. MyReturnType<T> — 从函数类型中提取返回值类型

```typescript
/**
 * MyReturnType<T>: 提取函数 T 的返回值类型
 *
 * 【语法拆解】
 * - T extends (...args: any[]) => any  → 约束 T 必须是函数类型
 * - extends (...args: any[]) => infer R  → 匹配任意函数签名，用 infer R 推断返回值类型
 * - ? R : never  → 匹配成功返回 R，否则返回 never
 *
 * 【infer 的作用】
 * infer 是"推断声明"关键字，只能在 extends 条件类型的子句中使用
 * 它告诉 TypeScript 编译器："在这里捕获一个类型变量，具体是什么类型由实际传入的类型决定"
 */
type MyReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R
    ? R   // ✅ 匹配成功：R 被推断为函数的实际返回值类型
    : never; // ❌ 不匹配（理论上不会触发，因为有约束）

// ========== 使用示例 ==========
function greet(name: string): string {
  return `Hello, ${name}`;
}
async function fetchData(url: string): Promise<{ data: string }> {
  return { data: 'result' };
}
function getNumbers(): number[] {
  return [1, 2, 3];
}

type GreetReturn = MyReturnType<typeof greet>;           // string
type DataReturn = MyReturnType<typeof fetchData>;        // Promise<{ data: string }>
type NumArrReturn = MyReturnType<typeof getNumbers>;     // number[]

// 实际应用：获取 API 函数的返回类型用于类型注解
const result: MyReturnType<typeof fetchData> = await fetchData('/api');
// result 类型自动推断为 Promise<{ data: string }>
```

#### 2. MyParameters<T> — 从函数类型中提取参数元组类型

```typescript
/**
 * MyParameters<T>: 提取函数 T 的参数类型，以元组形式返回
 *
 * 【关键点】
 * - infer P 出现在参数位置 (...args: infer P)
 * - P 会自动被推断为一个元组类型，包含所有参数的类型信息
 * - 可选参数和剩余参数也会保留在元组中
 *
 * 【为什么用 ...args?】
 * 因为要匹配任意数量、任意类型的参数列表
 * ...args 表示这是一个参数元组展开
 */
type MyParameters<T extends (...args: any[]) => any> =
  T extends (...args: infer P) => any
    ? P    // ✅ 返回推断出的参数元组类型
    : never;

// ========== 使用示例 ==========
function createUser(
  name: string,
  age: number,
  active?: boolean,
  ...tags: string[]
): { id: number } {
  return { id: 1 };
}

type CreateUserParams = MyParameters<typeof createUser>;
// = [name: string, age: number, (active?: boolean | undefined), ...tags: string[]]

// 解构使用（自动获得正确的类型）
function wrapper(...args: MyParameters<typeof createUser>) {
  // args[0] 的类型是 string
  // args[1] 的类型是 number
  // args[2] 的类型是 boolean | undefined
  // args[3...] 的类型是 string[]
  return createUser(...args);
}

// 实际应用：高阶函数包装器
function withLogging<T extends (...args: any[]) => any>(
  fn: T,
  logName: string
): (...args: MyParameters<T>) => MyReturnType<T> {
  return (...args) => {
    console.log(`[${logName}] called with`, args);
    const result = fn(...args);
    console.log(`[${logName}] returned`, result);
    return result;
  };
}

const loggedCreateUser = withLogging(createUser, 'createUser');
// loggedCreateUser 的签名与 createUser 完全一致！
```

#### 3. MyAwaited<T> — 递归解包 Promise

```typescript
/**
 * MyAwaited<T>: 递归解包嵌套的 Promise 类型
 *
 * 【递归逻辑】
 * - 检查 T 是否是 Promise<某个类型 U>
 * - 如果是，对 U 继续调用 MyAwaited（递归）
 * - 如果不是 Promise 了，直接返回 T（到达底层类型）
 *
 * 【为什么需要递归？】
 * 因为实际代码中经常出现 Promise 嵌套：
 * async function foo(): Promise<string> { ... }
 * async function bar(): Promise<Promise<string>> { return foo(); }
 * 我们希望 Awaited<Promise<Promise<string>>> 直接得到 string
 */
type MyAwaited<T> =
  // 第一步：检查 T 是否是 Promise-like 类型
  T extends null | undefined
    ? T  // null 和 undefined 直接返回，不处理
    : T extends Promise<infer U>
      ? MyAwaited<U>  // ✅ 是 Promise：解包 U 并继续递归检查
      : T extends object  // 处理 thenable 对象（有 .then 方法的非标准 Promise）
        ? T extends { then(onfulfilled: infer F): any }
          ? F extends (value: infer V) => any
            ? MyAwaited<V>  // 从 then 方法推断成功回调的参数类型
            : T
          : T
        : T;  // 不是 Promise，直接返回

// 简化版（适用于大多数场景）
type SimpleAwaited<T> = T extends Promise<infer U> ? SimpleAwaited<U> : T;

// ========== 使用示例 ==========
async function fetchUser(): Promise<{ name: string }> {
  return { name: 'Alice' };
}
async function doubleWrap(): Promise<Promise<number>> {
  return Promise.resolve(42);
}

type UserName = MyAwaited<ReturnType<typeof fetchUser>>;     // { name: string }
type UnwrappedNum = MyAwaited<ReturnType<typeof doubleWrap>>; // number

// 实际应用：async 函数的返回值提取
async function apiCall() {
  const response = await fetch('/api/users');
  const json = await response.json();
  return json as Array<{ id: number; name: string }>;
}

type ApiResult = MyAwaited<ReturnType<typeof apiCall>>;
// = Array<{ id: number; name: string }>  ← 自动解包 Promise
```

#### 4. MyConstructorParameters<T> — 从构造函数提取参数类型

```typescript
/**
 * MyConstructorParameters<T>: 提取构造函数（类）的参数类型
 *
 * 【与 Parameters 的区别】
 * - Parameters 针对普通函数：(arg1, arg2) => ReturnType
 * - ConstructorParameters 针对构造函数：new (arg1, arg2) => InstanceType
 *
 * 【关键差异】多了 new 关键字】
 * 构造函数的类型签名需要 new 前缀来标识它是构造器
 */
type MyConstructorParameters<T extends abstract new (...args: any[]) => any> =
  T extends abstract new (...args: infer P) => any
    ? P    // ✅ 返回构造函数参数元组
    : never;

// ========== 使用示例 ==========
class Person {
  constructor(
    public name: string,
    public age: number,
    private email?: string
  ) {}
}

class HttpClient {
  constructor(baseURL: string, timeout?: number, headers?: Record<string, string>) {}
}

type PersonCtorParams = MyConstructorParameters<typeof Person>;
// = [name: string, age: number, (email?: string | undefined)]

type HttpCtorParams = MyConstructorParameters<typeof HttpClient>;
// = [baseURL: string, (timeout?: number | undefined), (headers?: Record<string, string> | undefined)]

// 实例应用：通用工厂函数
function createInstance<
  Ctor extends abstract new (...args: any[]) => any,
  Args extends MyConstructorParameters<Ctor>
>(
  ctor: Ctor,
  ...args: Args
): InstanceType<Ctor> {
  return new ctor(...args);
}

const person = createInstance(Person, 'Bob', 25);
// person 类型: Person
// 参数类型完全由构造函数决定，且受类型约束保护！

const http = createInstance(HttpClient, '/api', 5000);
// http 类型: HttpClient
```

#### infer 工作原理总结图

```
┌─────────────────────────────────────────────────────────────────┐
│                    infer 工作流程                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  输入: type R = MyReturnType<(x: string) => number>              │
│                                                                 │
│  步骤 1: 约束检查                                               │
│  ┌──────────────────────────────────────┐                       │
│  │ (x: string) => number extends       │                       │
│  │ (...args: any[]) => any ?           │                       │
│  │ ✓ 函数类型满足约束                   │                       │
│  └──────────────────────────────────────┘                       │
│                                                                 │
│  步骤 2: 条件匹配 + infer 推断                                  │
│  ┌──────────────────────────────────────┐                       │
│  │ (x: string) => number extends       │                       │
│  │ (...args: any[]) => infer R ?       │                       │
│  │                                     │                       │
│  │ 编译器模式匹配:                      │                       │
│  │ • ...args 匹配 (x: string)          │                       │
│  │ • infer R 匹配 number  ← R 被推断!  │                       │
│  └──────────────────────────────────────┘                       │
│                                                                 │
│  步骤 3: 返回推断结果                                           │
│  ┌──────────────────────────────────────┐                       │
│  │ R = number                          │                       │
│  │ 最终结果: number                     │                       │
│  └──────────────────────────────────────┘                       │
│                                                                 │
│  【infer 使用限制】                                              │
│  ⚠️ 只能在 extends 右侧的条件表达式中使用                         │
│  ⚠️ 同一个条件分支可以出现多个 infer                              │
│  ⚠️ infer 声明的变量只能在真值分支中使用                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Q33: 请解释映射类型（Mapped Types）的语法，并实现以下高级映射类型：
- **难度**：★★★
1. `DeepReadonly<T>`：深度只读
2. `Mutable<T>`：移除所有 readonly
3. `RenameKey<T, OldK, NewK>`：重命名键

**参考答案要点**：

**映射类型基础语法**：`{ [P in K]: T }` —— 遍历键集合 K，生成新类型

```typescript
// 1. DeepReadonly<T>
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepReadonly<T[P]>
    : T[P];
};

interface Nested {
  user: {
    name: string;
    address: { city: string };
  };
  items: number[];
}

type ReadonlyNested = DeepReadonly<Nested>;
// 所有层级都是 readonly

// 2. Mutable<T>: 移除 readonly
type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends object
    ? Mutable<T[P]>
    : T[P];
};

// 3. RenameKey<T, OldK, NewK>
type RenameKey<T, OldK extends keyof T, NewK extends string> = {
  [P in keyof T as P extends OldK ? NewK : P]: T[P];
};

interface Original {
  id: number;
  userName: string;
  userEmail: string;
}

type Renamed = RenameKey<Original, 'userName', 'name'>;
// { id: number; name: string; userEmail: string }
```

**as 键重映射**（TS 4.1+）：`[P in K as NewKey]` 可以在遍历时修改键名

**参考来源**：[映射类型与键重映射](https://blog.51cto.com/u_17171324/14506902)

### 深度拓展：手写实现

#### 1. DeepPartial<T> — 递归将所有属性变为可选

```typescript
/**
 * DeepPartial<T>: 递归地将 T 的所有层级（包括嵌套对象）的属性变为可选
 *
 * 【与内置 Partial 的区别】
 * - Partial<T> 只处理第一层：{ a: { b: string } } → { a?: { b: string } }
 * - DeepPartial<T> 递归处理所有层：{ a?: { b?: string | undefined } }
 *
 * 【核心逻辑】
 * - 遍历 T 的每个键 P
 * - 如果 T[P] 是对象类型（非数组、非函数、非 null），则递归调用 DeepPartial
 * - 否则直接加 ? 变为可选
 */
type DeepPartial<T> = {
  // 遍历 T 的所有键，对每个键做如下转换
  [P in keyof T]?:  // ? 将当前层属性变为可选
    // 检查属性值是否是可递归的对象类型
    T[P] extends object
      ? T[P] extends Array<any>
        ? T[P]  // 数组保持不变（不递归进数组元素）
        : T[P] extends Function
          ? T[P]  // 函数保持不变
          : DeepPartial<T[P]>  // ✅ 普通对象：递归深入下一层
      : T[P];  // 基本类型（string/number/boolean）直接返回
};

// ========== 使用示例 ==========
interface UserProfile {
  id: number;
  name: string;
  contact: {
    email: string;
    phone: string;
    address: {
      city: string;
      street: string;
      zipCode: number;
    };
  };
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  tags: string[];
}

type PartialUser = DeepPartial<UserProfile>;
// 等价于：
// {
//   id?: number | undefined;
//   name?: string | undefined;
//   contact?: {
//     email?: string | undefined;
//     phone?: string | undefined;
//     address?: {
//       city?: string | undefined;
//       street?: string | undefined;
//       zipCode?: number | undefined;
//     } | undefined;
//   } | undefined;
//   preferences?: {
//     theme?: ('light' | 'dark') | undefined;
//     notifications?: boolean | undefined;
//   } | undefined;
//   tags?: string[];  // 数组不被拆开
// }

// 实际应用：部分更新 API 的参数类型
function updateUser(
  userId: number,
  updates: DeepPartial<UserProfile>
): Promise<UserProfile> {
  // 只传需要更新的字段，其他字段自动合并
  return fetch(`/api/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  }).then(r => r.json());
}

// 调用时可以只更新深层嵌套的字段
updateUser(1, {
  contact: {
    address: {
      city: 'Beijing',  // ✅ 只更新 city
      // street 和 zipCode 不需要提供
    },
  },
});
```

#### 2. DeepRequired<T> — 递归将所有属性变为必填

```typescript
/**
 * DeepRequired<T>: 递归地将 T 的所有层级的可选属性变为必填
 *
 * 【与内置 Required 的区别】
 * - Required<T> 只处理第一层：{ a?: { b?: string } } → { a: { b?: string } }
 * - DeepRequired<T> 递归处理所有层：{ a: { b: string } }
 *
 * 【关键语法：-?】
 * -? 是移除可选修饰符的操作符
 * 与 +?（或简写 ?）添加可选修饰符相对
 */
type DeepRequired<T> = {
  // 遍历 T 的所有键，-? 移除可选修饰符使其变为必填
  [P in keyof T]-?:  // -? 关键！移除 ? 可选标记
    T[P] extends object
      ? T[P] extends Array<any>
        ? DeepRequired<T[P]>  // 数组也递归处理其结构
        : T[P] extends Function
          ? T[P]
          : DeepRequired<T[P]>  // ✅ 对象递归
      : NonNullable<T[P]>;  // 基本类型同时移除可能的 undefined
};

// ========== 使用示例 ==========
interface Config {
  database?: {
    host?: string;
    port?: number;
    credentials?: {
      username?: string;
      password?: string;
    };
  };
  features?: {
    cache?: boolean;
    logging?: {
      level?: 'info' | 'warn' | 'error';
      enabled?: boolean;
    };
  };
}

type FullConfig = DeepRequired<Config>;
// 所有层级的 ? 都被移除：
// {
//   database: {
//     host: string;
//     port: number;
//     credentials: {
//       username: string;
//       password: string;
//     };
//   };
//   features: {
//     cache: boolean;
//     logging: {
//       level: 'info' | 'warn' | 'error';
//       enabled: boolean;
//     };
//   };
// }

// 实际应用：确保配置完整性检查
function validateConfig(config: Config): config is DeepRequired<Config> {
  // 运行时验证所有字段都存在
  return !!(
    config.database?.host &&
    config.database?.port !== undefined &&
    config.database?.credentials?.username &&
    config.features?.logging?.level
  );
}
```

#### 3. PickByValue<T, V> — 按值类型选取属性

```typescript
/**
 * PickByValue<T, V>: 从 T 中选取值类型为 V（或可分配给 V）的属性
 *
 * 【工作原理】
 * 1. 先遍历所有键，用条件类型筛选出值类型匹配 V 的键
 * 2. 用 Pick 提取这些键对应的属性
 *
 * 【两步走的原因】
 * 不能在映射类型中直接条件性地"跳过"某个键，
 * 所以先用条件类型生成 { match: K; noMatch: never } 结构，
 * 再通过 keyof 取出所有非 never 的键名组成联合类型
 */
type PickByValue<T, V> = Pick<
  T,
  // 筛选步骤：遍历每个键，如果值类型匹配 V 则保留键名，否则返回 never
  {
    [P in keyof T]: T[P] extends V ? P : never
  }[keyof T]  // 取出所有值（never 会被联合类型吸收）
>;

// ========== 进阶变体 ==========

/** PickByValueExact: 精确匹配值类型（不使用子类型兼容） */
type PickByValueExact<T, V> = Pick<
  T,
  {
    [P in keyof T]: [T[P]] extends [V]
      ? [V] extends [T[P]]
        ? P
        : never
      : never
  }[keyof T]
>;

/** OmitByValue: 排除特定值类型的属性 */
type OmitByValue<T, V> = Pick<
  T,
  {
    [P in keyof T]: T[P] extends V ? never : P
  }[keyof T]
>;

// ========== 使用示例 ==========
interface ApiResponse {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata: Record<string, any>;
  tags: string[];
}

// 选取所有字符串类型的属性
type StringFields = PickByValue<ApiResponse, string>;
// = { name: string }

// 选取所有日期类型的属性
type DateFields = PickByValue<ApiResponse, Date>;
// = { createdAt: Date; updatedAt: Date }

// 排除所有函数类型的属性
type NonFunctionFields = OmitByValue<ApiResponse, Function>;
// = { id: number; name: string; isActive: boolean; ... }

// 实际应用：表单数据提取
interface UserForm {
  name: string;
  email: string;
  age: number;
  avatar: File;
  onSubmit: () => void;  // 不应提交到服务器
  onReset: () => void;
}

// 自动提取可序列化的字段（排除函数和 File）
type SubmittableData = OmitByValue<OmitByValue<UserForm, Function>, File>;
// = { name: string; email: string; age: number }
```

#### 映射类型底层原理图解

```
┌─────────────────────────────────────────────────────────────────┐
│              映射类型底层原理：[P in K]: Type                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  输入接口:                                                       │
│  interface Person {                                             │
│    readonly name: string;                                       │
│    age?: number;                                                │
│    email: string;                                               │
│  }                                                              │
│                                                                 │
│  映射类型定义:                                                   │
│  type MutablePartial<T> = {                                     │
│    -readonly [P in keyof T]?: T[P];                             │
│  };                                                             │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 执行过程（编译器视角）：                                   │   │
│  │                                                          │   │
│  │  步骤 1: 计算 keyof T                                    │   │
│  │  ┌────────────────────────────────────┐                  │   │
│  │  │ keyof Person = 'name' | 'age' | 'email'             │   │
│  │  └────────────────────────────────────┘                  │   │
│  │                                                          │   │
│  │  步骤 2: 遍历键集合 K（类似 for...in 循环）               │   │
│  │  ┌──────────────────────────────────────────────────┐    │   │
│  │  │ P = 'name'                                      │    │   │
│  │  │   → -readonly 移除 readonly                      │    │   │
│  │  │   → ? 添加可选标记                               │    │   │
│  │  │   → T['name'] = string                          │    │   │
│  │  │   → 结果: name?: string                          │    │   │
│  │  ├──────────────────────────────────────────────────┤    │   │
│  │  │ P = 'age'                                        │    │   │
│  │  │   → -readonly (无效果，本身不是 readonly)         │    │   │
│  │  │   → ? (已有 ?，无变化)                           │    │   │
│  │  │   → T['age'] = number                            │    │   │
│  │  │   → 结果: age?: number                           │    │   │
│  │  ├──────────────────────────────────────────────────┤    │   │
│  │  │ P = 'email'                                      │    │   │
│  │  │   → -readonly (无效果)                           │    │   │
│  │  │   → ? 添加可选标记                               │    │   │
│  │  │   → T['email'] = string                         │    │   │
│  │  │   → 结果: email?: string                         │    │   │
│  │  └──────────────────────────────────────────────────┘    │   │
│  │                                                          │   │
│  │  最终结果:                                                │   │
│  │  {                                                        │   │
│  │    name?: string;                                         │   │
│  │    age?: number;                                          │   │
│  │    email?: string;                                        │   │
│  │  }                                                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  【修饰符速查表】                                                │
│  ┌────────────┬──────────┬────────────────────────────────┐    │
│  │  修饰符     │  操作    │  示例                          │    │
│  ├────────────┼──────────┼────────────────────────────────┤    │
│  │  ?         │  添加可选 │  [P in K]: T → key?: Type      │    │
│  │  -?        │  移除可选 │  [P in K]-?: T → key: Type     │    │
│  │  readonly  │  添加只读 │  readonly [P]: T → readonly key│    │
│  │  -readonly │  移除只读 │  -readonly [P]: T → key        │    │
│  │  as NewKey │  键重映射 │  [P in K as `get_${string & P}`]│   │
│  └────────────┴──────────┴────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Q34: 请解释 TypeScript 5.x 中装饰器（Decorators）的新旧两种模式差异，并实现一个实用的方法日志装饰器和缓存装饰器。
- **难度**：★★★

**参考答案要点**：

**新旧模式对比**：

| 特性 | 旧模式（实验性） | 新模式（TC39 标准，TS 5.0+） |
|------|------------------|------------------------------|
| 启用方式 | `experimentalDecorators: true` | `decorators: true` |
| 表达式 | 装饰器工厂返回函数 | 装饰器工厂返回函数 |
| 参数 | `(target, propertyKey, descriptor)` | `(value, context)` |
| context 信息 | 分散在各参数中 | 统一的 `ClassMethodDecoratorContext` 对象 |
| 可替换性 | 手动修改 descriptor | 直接返回新函数替代原函数 |
| 类成员装饰器 | 支持 | 支持 |
| 类装饰器 | 支持 | 支持 |
| auto-accessor | 不支持 | TS 5.2+ 支持 |

**新版装饰器实现**：

```typescript
// 方法日志装饰器
function log(
  value: Function,
  context: ClassMethodDecoratorContext
) {
  const methodName = String(context.name);

  return function (this: any, ...args: any[]) {
    console.log(`[${methodName}] Called with:`, args);
    const start = performance.now();
    const result = value.apply(this, args);
    const duration = performance.now() - start;
    console.log(`[${methodName}] Returned:`, result, `(${duration.toFixed(2)}ms)`);
    return result;
  };
}

// 方法缓存装饰器
function cache(
  ttlMs: number = 5000
) {
  return function (
    value: Function,
    context: ClassMethodDecoratorContext
  ) {
    const cache = new Map<string, { data: any; expiry: number }>();

    return function (this: any, ...args: any[]) {
      const key = JSON.stringify(args);
      const now = Date.now();
      const cached = cache.get(key);

      if (cached && cached.expiry > now) {
        console.log(`Cache hit for ${String(context.name)}(${args.join(', ')})`);
        return cached.data;
      }

      const result = value.apply(this, args);
      cache.set(key, { data: result, expiry: now + ttlMs });
      return result;
    };
  };
}

// 使用
class ApiService {
  @log
  async getUser(id: number) {
    // 会自动打印调用参数、返回值和耗时
    return fetch(`/api/users/${id}`).then(r => r.json());
  }

  @cache(10_000)
  expensiveComputation(n: number) {
    console.log('Computing...');
    return n * n * n; // 结果会被缓存 10 秒
  }
}
```

**参考来源**：[TS 5.0 装饰器](https://blog.csdn.net/weixin_60526471/article/details/153528752)

### 🔍 追问链
1. **装饰器的执行顺序是怎样的？多个装饰器叠加时的顺序？**
   → 方向：工厂函数从外到内执行（求值阶段），装饰器函数从内到外执行（应用阶段）
2. **auto-accessor 装饰器（TS 5.2+）解决了什么问题？**
   → 方向：简化 getter/setter 模式，自动生成 get/set 并允许装饰器拦截读写操作
3. **装饰器和 mixin/HOC（高阶组件）的关系？各自适用场景？**
   → 方向：装饰器用于方法/属性的横切关注点（日志/缓存/验证）；mixin 用于复用类级别逻辑；HOC 用于 React 组件增强

---

## Q35: 什么是模板字面量类型（Template Literal Types）？请用它实现一个类型安全的路由参数提取工具。
- **难度**：★★★

**参考答案要点**：

**模板字面量类型**（TS 4.1+）：类似模板字符串语法的类型运算能力。

```typescript
// 基础用法
type EventName = `on${'Click' | 'Focus' | 'Blur'}`;
// = 'onClick' | 'onFocus' | 'onBlur'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Route = `/api/${string}/${HttpMethod}`;
// = "/api/${string}/GET" | "/api/${string}/POST" | ...

// 内置字符串操作类型
type Greeting = `hello ${Capitalize<'world'>}`;  // "hello World"
type Lower = LowerCase<'HELLO'>;                  // "hello"
type Upper = UpperCase<'hello'>;                  // "HELLO"
type Uncap = Uncapitalize<'Hello'>;              // "hello"
type Cap = Capitalize<'hello'>;                  // "Hello"

// 实战：路由参数提取
type ExtractRouteParams<Route extends string> =
  Route extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<Rest>]: string }
    : Route extends `${infer _Start}:${infer Param}`
      ? { [K in Param]: string }
      : {};

type UserParams = ExtractRouteParams<'/users/:userId/posts/:postId'>;
// { userId: string; postId: string }

type ProfileParams = ExtractRouteParams<'/profile/:username'>;
// { username: string }

type NoParams = ExtractRouteParams<'/home'>;
// {}

// 进阶：结合路由定义实现类型安全的导航函数
type AppRoutes = {
  '/': {};
  '/users': { page?: string; limit?: string };
  '/users/:id': { id: string };
  '/users/:id/posts/:postId': { id: string; postId: string };
};

type NavigateParams<R extends keyof AppRoutes> =
  ExtractRouteParams<R> & AppRoutes[R];

declare function navigate<R extends keyof AppRoutes>(
  route: R,
  params?: NavigateParams<R>
): void;

navigate('/', {});                                          // ✅
navigate('/users', { page: '1' });                          // ✅
navigate('/users/:id', { id: '123' });                      // ✅
navigate('/users/:id/posts/:postId', {                     // ✅
  id: '123',
  postId: '456',
});
// navigate('/users/:id', {});                              // ❌ 缺少 id
// navigate('/unknown', {});                                // ❌ 不是有效路由
```

**参考来源**：[模板字面量类型](https://blog.51cto.com/u_17171324/14506902)

---

## Q36: 在一个大型项目中，如何设计 TypeScript 配置以兼顾开发体验和构建性能？请给出推荐的 tsconfig.json 配置策略。
- **难度**：★★☆

**参考答案要点**：

**推荐的多层 tsconfig 策略**：

```jsonc
// 根目录 tsconfig.json（基础配置）
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",

    // 严格模式（强烈推荐）
    "strict": true,
    "noUncheckedIndexedAccess": true,  // TS 4.1+: 数组/对象索引不再隐含 undefined
    "exactOptionalPropertyTypes": true, // TS 4.4+: 精确可选属性类型
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,

    // 类型检查控制
    "skipLibCheck": true,              // 跳过 .d.ts 检查，加速构建
    "forceConsistentCasingInFileNames": true,

    // 输出控制
    "declaration": true,               // 生成 .d.ts
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",

    // 高级
    "isolatedModules": true,           // 确保每个文件可被单独转译
    "resolveJsonModule": true,
    "esModuleInterop": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

```jsonc
// tsconfig.build.json（构建专用，继承基础配置）
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,                   // 构建时输出 JS
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

```jsonc
// tsconfig.node.json（Node 工具脚本）
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "NodeNext",
    "target": "ES2022",
    "outDir": "./dist-node",
    "types": ["node"]
  },
  "include": ["scripts", "vite.config.ts"]
}
```

**关键配置项决策指南**：

| 场景 | 推荐 | 原因 |
|------|------|------|
| 新项目 | `strict: true` | 最大程度类型安全 |
| JS 迁移 | 先不加 strict，逐步开启 | 降低迁移阻力 |
| 库开发 | `declaration: true` | 为消费者提供类型 |
| 单仓（monorepo）| `composite: true`, `project references` | 增量编译加速 |
| 大项目 | `skipLibCheck: true` | 显著减少类型检查时间 |

**性能优化技巧**：
1. 使用 `project references` 做增量编译
2. 排除测试文件和非 TS 目录
3. 开启 `incremental` + `tsBuildInfoFile`
4. 考虑使用 `tsc --watch` 替代每次全量编译

**参考来源**：[tsconfig 最佳实践](https://juejin.cn/post/7512277099413012514)

### 深度拓展：手写模拟 tsc 编译器配置加载流程

#### 1. 伪代码：tsc 配置解析流程

```typescript
/**
 * 【伪代码】模拟 TypeScript 编译器（tsc）读取和合并 tsconfig 的完整流程
 *
 * 当你在终端运行 `tsc` 时，编译器会按以下顺序解析配置：
 */

// ===== 配置解析引擎 =====

interface TSConfigResolver {
  /**
   * 解析 tsconfig 配置的完整流程
   * @param projectPath 项目根目录路径
   * @param commandLineOptions 命令行传入的选项
   */
  resolveConfig(
    projectPath: string,
    commandLineOptions: CommandLineOptions = {}
  ): ResolvedConfig {

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 步骤 1: 定位 tsconfig.json 文件
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const configPath = this.locateConfigFile(projectPath);
    // 查找逻辑：
    // 1. 如果命令行指定了 --project 或 -p，使用该路径
    // 2. 否则从当前目录向上查找，直到找到 tsconfig.json
    // 3. 如果都没找到，使用默认配置（不处理任何文件）

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 步骤 2: 解析 JSON 并加载基础配置
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const rawConfig = this.readConfigFile(configPath);
    let parsedConfig: ParsedTSConfig = this.parseJSON(rawConfig);

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 步骤 3: 处理 extends 继承链（递归）
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (parsedConfig.extends) {
      const baseConfigs = Array.isArray(parsedConfig.extends)
        ? parsedConfig.extends
        : [parsedConfig.extends];

      let mergedBase: CompilerOptions = {};

      for (const baseRef of baseConfigs) {
        // 解析相对路径（相对于当前配置文件所在目录）
        const basePath = this.resolvePath(configPath, baseRef);
        const baseConfig = this.resolveConfig(basePath);  // 递归调用！

        // 合并规则：
        // - 对象类型：深度合并（如 compilerOptions）
        // - 数组类型：后者追加（如 include, plugins）
        // - 基本类型：后者覆盖前者
        mergedBase = this.deepMerge(mergedBase, baseConfig.compilerOptions);
      }

      // 将继承的基配置与当前配置合并
      // 当前配置优先级更高（覆盖基配置的同名字段）
      parsedConfig.compilerOptions = {
        ...mergedBase,
        ...parsedConfig.compilerOptions,
      };
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 步骤 4: 应用命令行覆盖
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 命令行参数拥有最高优先级！
    // 例如: tsc --strict --target ES2020
    const finalConfig: ResolvedConfig = {
      ...parsedConfig.compilerOptions,
      ...commandLineOptions,  // 命令行覆盖所有其他来源
    };

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 步骤 5: 解析文件通配符（include/exclude/files）
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    finalConfig.files = this.resolveFilePatterns({
      include: parsedConfig.include || ['**/*'],
      exclude: [
        'node_modules',
        'dist',
        'bower_components',
        'jspm_packages',
        ...(parsedConfig.exclude || []),
      ],
      files: parsedConfig.files,  // files 显式指定时忽略 include
    }, configPath);

    return finalConfig;
  }
}

// ========== 优先级总结 ==========
/**
 * 配置优先级（从低到高）：
 *
 * 1. TypeScript 内置默认值
 *    ↓ 被 extends 的最顶层基配置覆盖
 * 2. tsconfig.base.json（基础配置）
 *    ↓ 被中间层配置覆盖
 * 3. 中间层 extends 链（按继承顺序）
 *    ↓ 被最终配置覆盖
 * 4. tsconfig.json（项目根配置）的 compilerOptions
 *    ↓ 被命令行覆盖
 * 5. 命令行参数（--xxx 形式）【最高优先级】
 */
```

#### 2. extends 继承链示例

```typescript
/**
 * 【实际案例】企业级 monorepo 的三层继承链
 *
 * 目录结构:
 * my-monorepo/
 * ├── tsconfig.json              # 根配置（Web 应用）
 * ├── tsconfig.node.json         # Node 工具配置
 * ├── tsconfig.build.json        # 生产构建配置
 * ├── packages/
 * │   ├── shared/
 * │   │   └── tsconfig.json      # 共享包配置
 * │   └── web/
 * │       └── tsconfig.json      # Web 包配置
 * └── tsconfig.base.json         # ⭐ 基础配置（所有配置的起点）
 */

// ===== 第 1 层：tsconfig.base.json（基础配置）=====

/**
 * 设计思路：
 * - 只包含所有子项目共享的基础设置
 * - 不包含任何业务相关的特定配置
 * - 类似于 "抽象基类"，不会被直接用于编译
 */
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Base Config",
  "compilerOptions": {
    // === 语言目标 ===
    "target": "ES2022",                    // 现代浏览器/Node 都支持
    "module": "ESNext",                    // 使用原生 ESM
    "moduleResolution": "bundler",          // Vite/Rspack 等打包工具模式

    // === 类型严格性（所有子项目统一标准）===
    "strict": true,                        // 开启所有严格检查
    "noUncheckedIndexedAccess": true,      // 数组索引不再隐含 undefined
    "exactOptionalPropertyTypes": true,    // 可选属性不能显式赋 undefined
    "noImplicitOverride": true,            // override 必须显式标注
    "noFallthroughCasesInSwitch": true,    // switch 必须 break/return
    "forceConsistentCasingInFileNames": true,

    // === 互操作 ===
    "esModuleInterop": true,               // 兼容 CJS/ESM 混用
    "resolveJsonModule": true,             // 允许 import json
    "isolatedModules": true,               // 确保每个文件可被转译（Vite 要求）

    // === 性能优化 ===
    "skipLibCheck": true,                  // 跳过 .d.ts 类型检查
    "incremental": true,                   // 增量编译
  },
  "exclude": ["node_modules", "dist"]
}

// ===== 第 2 层：tsconfig.json（Web 应用主配置）=====

/**
 * 继承自 base，添加 Web 应用特有配置
 * 用于开发时的类型检查（tsc --noEmit）
 */
{
  "extends": "./tsconfig.base.json",       // ← 继承基础配置
  "compilerOptions": {
    // Web 特有
    "jsx": "react-jsx",                    // React 17+ 自动运行时 JSX
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client"],              // Vite 提供的类型声明

    // 开发体验优化
    "declaration": true,                   // 生成 .d.ts（供库消费者使用）
    "sourceMap": true,                     // 生成 sourcemap
    "declarationMap": true,                // 声明文件的 sourcemap
  },
  "include": ["src", "env.d.ts"],          // Web 源码 + 环境变量声明
  "exclude": ["node_modules", "dist", "**/*.test.ts", "scripts"]
}

// ===== 第 2 层变体：tsconfig.node.json（Node 工具配置）=====

/**
 * 同样继承自 base，但针对 Node.js 环境
 * 用于构建脚本、server 等
 */
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    // Node 特有
    "module": "NodeNext",                  // 使用 Node.js 原生 ESM
    "target": "ES2022",
    "outDir": "./dist-node",               // 输出到独立目录
    "types": ["node"],                     // 只包含 Node 类型（不含 DOM）

    // Node 工具通常不需要生成声明文件
    "declaration": false,
  },
  "include": ["scripts", "vite.config.ts", "tailwind.config.ts"],
  "references": [                          // ← Project References!
    { "path": "./tsconfig.json" }          // 引用 Web 项目（可选）
  ]
}

// ===== 第 3 层：tsconfig.build.json（生产构建专用）=====

/**
 * 继承自主配置，仅用于 CI/CD 构建
 * 开启代码输出，关闭开发辅助功能
 */
{
  "extends": "./tsconfig.json",            // ← 继承 Web 配置
  "compilerOptions": {
    "noEmit": false,                       // 构建时输出 JS 文件
    "rootDir": "./src",                    // 明确源码根目录
    "sourceMap": false,                    // 生产环境可关闭 sourcemap（减小体积）
    "declarationMap": false,

    // 构建优化
    "removeComments": true,                // 移除注释
    "importHelpers": true,                 // 从 tslib 导入辅助函数（减小代码体积）
  },
  "include": ["src"]
}
```

#### 3. Project References 工作原理

```typescript
/**
 * 【Project References】项目引用机制
 *
 * 解决的问题：
 * 大型 monorepo 中，每次 tsc 都要重新分析所有依赖的 .d.ts，
 * 即使依赖没有变化。这导致大型项目编译很慢。
 *
 * 解决方案：
 * 将项目拆分为多个独立的"子项目"，每个子项目预先编译为 .d.ts 声明文件。
 * 子项目之间通过 references 建立依赖关系。
 * 当某个子项目的源码没变化时，可以直接使用缓存的 .d.ts，跳过类型检查。
 */

// ===== 伪代码：增量编译决策算法 =====

interface ProjectReferenceManager {
  /**
   * 判断是否需要重新编译某个引用项目
   */
  needsRebuild(project: ProjectConfig): boolean {
    // 检查 1: 源文件是否有变化
    if (this.hasSourceChanges(project)) return true;

    // 检查 2: 依赖的项目是否已更新
    for (const ref of project.references) {
      const depProject = this.loadProject(ref.path);
      if (this.needsRebuild(depProject)) {
        // 依赖更新了 → 需要重新编译（因为 .d.ts 可能变了）
        return true;
      }
    }

    // 检查 3: 输出的 .d.ts 是否存在且是最新的
    const outputTimestamp = this.getOutputTimestamp(project);
    const sourceMaxTimestamp = this.getMaxSourceTimestamp(project);

    return outputTimestamp < sourceMaxTimestamp;
  }

  /**
   * 执行增量编译
   */
  incrementalBuild(rootProject: string): BuildResult {
    const buildOrder = this.topologicalSort(rootProject);
    // 拓扑排序确保先编译被依赖的项目

    const results: Map<string, BuildStatus> = new Map();

    for (const project of buildOrder) {
      if (!this.needsRebuild(project)) {
        results.set(project, 'cached');     // 使用缓存 ✅
        continue;
      }

      try {
        // 只编译本项目（假设依赖的 .d.ts 已就绪）
        this.tscBuild(project, {
          // --build 模式下的特殊行为：
          composite: true,           // 强制生成 .d.ts 和 .d.ts.map
          declaration: true,
          declarationMap: true,
          noEmit: false,
          // 不做类型检查依赖项目（信任它们的 .d.ts）
          skipDefaultLibCheck: true,
        });
        results.set(project, 'built');
      } catch (error) {
        results.set(project, 'failed');
        throw new Error(`Build failed for ${project}: ${error}`);
      }
    }

    return { results, status: 'success' };
  }
}

// ===== 实际配置示例 =====

/**
 * packages/shared/tsconfig.json（共享库）
 * 作为被依赖方，需要开启 composite 以生成 .d.ts
 */
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,                     // ⭐ 关键！启用项目引用模式
    "rootDir": "src",
    "outDir": "dist",
    "declaration": true,
    "declarationMap": true,
  },
  "include": ["src"]
}

/**
 * packages/web/tsconfig.json（Web 应用）
 * 引用 shared 库，利用其预编译的 .d.ts
 */
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client"],
    "rootDir": "src",
    "outDir": "dist",
  },
  "references": [                          // ⭐ 声明对 shared 的依赖
    { "path": "../shared", "prepend": false }
    // prepend: false 表示不在输出中包含 shared 的代码
    // （shared 会作为独立包被 import）
  ],
  "include": ["src"]
}
```

#### 4. 企业级 Monorepo 完整方案

```typescript
/**
 * 【企业级 Monorepo 推荐架构】
 *
 * 典型场景：中大型前端团队（5-20 人），多应用 + 共享组件库
 * 技术栈：pnpm workspace + TypeScript + Vite + React
 */

// ===== 目录结构设计 =====
/**
 * enterprise-app/
 * ├── tsconfig.base.json              # L1: 全局基础配置
 * ├── tsconfig.json                   # L2: 主应用（Web）
 * ├── tsconfig.node.json              # L2: Node 工具
 * ├── tsconfig.build.json             # L3: 生产构建
 * ├── tsconfig.test.json              # L3: 测试环境
 * │
 * ├── packages/
 * │   ├── ui/                         # UI 组件库
 * │   │   ├── tsconfig.json           # (composite)
 * │   │   └── src/
 * │   ├── utils/                      # 工具函数库
 * │   │   ├── tsconfig.json           # (composite)
 * │   │   └── src/
 * │   └── types/                      # 共享类型定义
 * │       ├── tsconfig.json           # (composite)
 * │       └── src/
 * │
 * ├── apps/
 * │   ├── web/                        # 主 Web 应用
 * │   │   └── tsconfig.json           # 引用 ui, utils, types
 * │   └── admin/                      # 管理后台
 * │       └── tsconfig.json           # 引用 ui, utils, types
 * │
 * └── scripts/                        # 构建/部署脚本
 *     └── tsconfig.json               # Node 环境
 */

// ===== 各层配置要点速查表 =====

/**
 * ┌─────────────────────┬────────────────────────────────────────┐
 * │ 配置文件              │ 核心职责                              │
 * ├─────────────────────┼────────────────────────────────────────┤
 * │ tsconfig.base.json   │ strict、module、target、通用插件        │
 * ├─────────────────────┼────────────────────────────────────────┤
 * │ apps/*/tsconfig.json │ jsx/lib/types/references(引用packages) │
 * ├─────────────────────┼────────────────────────────────────────┤
 * │ packages/*/tsconfig   │ composite:true、declaration、rootDir   │
 * ├─────────────────────┼────────────────────────────────────────┤
 * │ tsconfig.build.json   │ noEmit:false、removeComments、optimize │
 * ├─────────────────────┼────────────────────────────────────────┤
 * │ tsconfig.test.json    │ types:["jest"/"vitest"]、isolatedModules│
 * └─────────────────────┴────────────────────────────────────────┘
 */

// ===== 常见问题排查指南 =====

/**
 * Q1: extends 后某些配置项不生效？
 * A: 检查拼写错误；注意 null/undefined 不会覆盖基配置；
 *    某些数组字段是替换而非合并（如 lib、types）
 *
 * Q2: Project References 报循环依赖？
 * A: 使用 tsc --showConfig 查看实际的引用图；
 *    确保 references 方向与 import 方向一致
 *
 * Q3: 增量编译后类型信息过期？
 * A: 运行 tsc -b --clean 清理缓存后重新构建；
 *    检查 .tsbuildinfo 文件的时间戳
 *
 * Q4: 不同 IDE 打开不同目录时行为不一致？
 * A: VS Code 使用工作区打开的根目录的 tsconfig；
 *    可在 .vscode/settings.json 中指定 tsconfig 路径
 */
```

#### 5. 配置加载流程图解

```
┌─────────────────────────────────────────────────────────────────┐
│           tsc 配置解析完整流程                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  用户执行: tsc --strict --project ./tsconfig.web.json           │
│                                                                 │
│                          ↓                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 1. 定位配置文件                                           │   │
│  │    → --project 指定了 ./tsconfig.web.json                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 2. 解析 extends 链                                       │   │
│  │                                                          │   │
│  │  tsconfig.web.json                                      │   │
│  │    └─ extends: ../tsconfig.base.json                    │   │
│  │          └─ (无更多 extends)                             │   │
│  │                                                          │   │
│  │  加载顺序:                                               │   │
│  │  ① tsconfig.base.json  → { strict: true, target: ... }  │   │
│  │  ② tsconfig.web.json   → { jsx: 'react-jsx', ... }     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 3. 合并 compilerOptions                                  │   │
│  │                                                          │   │
│  │  结果 = {                                                │   │
│  │    ...base 配置,                                         │   │
│  │    ...web 配置（覆盖 base 的同名字段）,                    │   │
│  │  }                                                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 4. 应用命令行覆盖                                        │   │
│  │                                                          │   │
│  │  --strict → strict: true（即使配置里是 false 也被覆盖）    │   │
│  │  命令行始终拥有最高优先级！                                │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 5. 解析文件范围                                          │   │
│  │                                                          │   │
│  │  根据 include/exclude/files 确定要编译的文件列表          │   │
│  │  处理 **/*.ts, *.tsx 等通配符                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 6. 开始类型检查 / 编译                                   │   │
│  │                                                          │   │
│  │  如有 references → 先构建依赖项目（增量）                  │   │
│  │  无 references → 直接编译当前项目                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 🔍 追问链
1. **模板字面量类型的底层原理是什么？它是怎么做到字符串拼接后仍保留类型信息的？**
   → 方向：编译时字符串字面量运算，类似 C++ 的 constexpr；`${infer Prefix}_${infer Suffix}` 利用 infer 从固定模式中提取子串
2. **模板字面量类型和 Uppercase/Lowercase/Capitalize/Uncapitalize 内置类型怎么配合使用？**
   → 方向：`Uppercase<'hello'>` → `'HELLO'`，常用于 CSS-in-JS 的属性名转换（camelCase → kebab-case）
3. **如何用模板字面量实现一个类型安全的 CSS 属性名系统？**
   → 方向：`type CssProperty = \`margin${'Top' | 'Bottom' | 'Left' | 'Right'}\`` → margin | marginTop | marginBottom ...

---

### 三、代码分析题（4道）

## Q37: 分析以下"类型体操"代码，解释每一步的类型变换过程。
- **难度**：★★★

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type Stringify<T> = { [K in keyof T]: string };

type MakeAllFieldsString<T> = {
  [K in keyof T]: T[K] extends object
    ? MakeAllFieldsString<T[K]>
    : string
};

type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;

interface ComplexType {
  id: number;
  name: string;
  meta?: { tags?: string[]; version?: number };
  config: { theme: 'light' | 'dark' };
}

type R = RequiredKeys<ComplexType>;  // 结果？
type O = OptionalKeys<ComplexType>;   // 结果？
```

**参考答案**：

- `NonNullable<T>`：如果 T 是 null 或 undefined 则返回 never（即排除它们），否则返回 T
- `Stringify<T>`：将所有属性值转为 string 类型
- `MakeAllFieldsString<T>`：递归地将所有叶子属性转为 string
- **`OptionalKeys<T>`**：这是经典的"提取可选属性键名"技巧
  - `{}` extends Pick<T, K> 检查 K 属性是否可选（因为 `{}` 可以赋给可选属性但不可以赋给必需属性）
  - 如果 K 是可选的，返回 K；否则返回 never
  - 最后 `[keyof T]` 取出所有值组成联合类型
- **结果**：
  - `R = RequiredKeys<ComplexType>` = `'id' | 'name' | 'config'`
  - `O = OptionalKeys<ComplexType>` = `'meta'`

**考察点**：条件类型的高级用法、可选属性的类型检测技巧

### 🔍 追问链
1. **这个技巧利用了什么 TypeScript 行为来实现可选属性的提取？**
   → 方向：利用 `undefined` 可以赋值给可选属性但不能赋值给必填属性的特性，通过 `{}` 包裹后筛选
2. **RequiredKeys 必填属性提取怎么做？思路是否对称？**
   → 方向：不完全对称。可以用 `T[P] extends Required<T>[P] ? P : never` 或利用 `Exclude<keyof T, OptionalKeys<T>>`
3. **这个技巧在工程中有哪些实际用途？**
   → 方向：表单校验（区分必填/可选字段）、API 参数文档生成、ORM schema 推导

---

## Q38: 以下代码利用了互斥联合类型（Exclusive Union）来防止非法 Props 组合，请分析其工作原理。
- **难度**：★★★

```typescript
type ButtonProps = {
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
} & (
  | { href: string; onClick?: never }
  | { onClick: () => void; href?: never }
);

// 以下使用哪些合法？
const a: ButtonProps = { size: 'md', children: 'Text' };                           // A
const b: ButtonProps = { size: 'sm', href: '/page', children: 'Link' };            // B
const c: ButtonProps = { size: 'lg', onClick: () => {}, children: 'Button' };      // C
const d: ButtonProps = { size: 'md', href: '/', onClick: () => {}, children: 'X' }; // D
```

**参考答案**：

| 用例 | 合法性 | 说明 |
|------|--------|------|
| A | ✅ | 基础按钮，无 href 无 onClick |
| B | ✅ | 链接按钮（href 存在，onClick 为 never 即不允许） |
| C | ✅ | 点击按钮（onClick 存在，href 为 never 即不允许） |
| D | ❌ | **非法！** 同时提供了 href 和 onClick，违反互斥约束 |

**工作原理**：
- 使用 `&` 交叉类型连接共享属性和互斥选项
- 互斥部分使用 `|` 联合类型
- 通过将对方属性设为 `never` 来实现互斥——如果同时传两个，其中一个必然是 `never` 类型导致赋值失败

**这是 React 组件类型设计的经典模式**，确保按钮要么是链接（href），要么是可点击的（onClick），不能两者兼有。

### 🔍 追问链
1. **互斥联合和 Discriminated Union（可辨识联合）的区别？**
   → 方向：Discriminated Union 通过共享字段区分变体；Exclusive Union 确保两个属性不会同时存在（xor 关系）
2. **如何在运行时校验互斥约束？**
   → 方向：编写运行时类型守卫或使用 zod/io-ts 等验证库配合类型
3. **这种模式在表单设计中有何优势？**
   → 方向：确保用户不会同时提交矛盾的字段组合（如同时传 userId 和 email）

---

## Q39: 分析以下 TypeScript 5.x 新特性代码，解释 `const` 类型参数的作用。
- **难度**：★★☆

```typescript
// 普通泛型：类型会被拓宽
function createRoutes<T extends string>(routes: T[]): T[] {
  return routes;
}
const routes = createRoutes(['/home', '/about', '/settings']);
// routes 类型：string[]（被拓宽了！）

// const 类型参数：保持字面量精确类型（TS 5.0+）
function createExactRoutes<const T extends string>(routes: T[]): T[] {
  return routes;
}
const exactRoutes = createExactRoutes(['/home', '/about', '/settings']);
// exactRoutes 类型：readonly ['/home', '/about', '/settings']

// 实际用途：基于精确类型做进一步类型约束
function defineConfig<const T extends Record<string, any>>(config: T): T {
  return config;
}

const config = defineConfig({
  apiBase: '/api/v1',
  timeout: 5000,
  features: {
    auth: true,
    darkMode: false,
  },
});

// config.apiBase 的精确类型是 '/api/v1' 而非 string
// config.features.darkMode 的精确类型是 false 而非 boolean
```

**参考答案**：

**`const` 类型参数**（TS 5.0+）：
- 在泛型参数前加 `const` 修饰符
- 使传入的参数表达式像被 `as const` 修饰一样，**保持字面量类型不被拓宽**
- 对于对象/数组参数，效果等同于整体添加 `readonly` 和字面量类型

**优势**：
1. 基于配置对象的**精确类型**做下游类型推断
2. 减少 `as const` 的手动使用
3. 特别适合配置对象、路由定义、状态定义等场景

**参考来源**：[TS 5.0 const 类型参数](https://blog.csdn.net/weixin_60526471/article/details/153528752)

---

## Q40: 以下是一个类型驱动的状态机实现，请分析其类型安全保障机制。
- **难度**：★★★

```typescript
type State = 'idle' | 'loading' | 'success' | 'error';

type Transitions = {
  idle: 'loading';
  loading: 'success' | 'error';
  success: 'idle';
  error: 'idle';
};

type NextStates<S extends State> = S extends keyof Transitions
  ? Transitions[S]
  : never;

class StateMachine<S extends State = 'idle'> {
  private state: S;

  constructor(initial: S) {
    this.state = initial;
  }

  getState(): S {
    return this.state;
  }

  transition<N extends NextStates<S>>(nextState: N): StateMachine<N> {
    this.state = nextState as any;
    return this as any;
  }
}

// 使用
const sm = new StateMachine('idle');

const s1 = sm.transition('loading');   // ✅ idle → loading 合法
// sm.transition('success');           // ❌ idle 不能直接跳到 success！

const s2 = s1.transition('success');   // ✅ loading → success 合法
// s1.transition('idle');              // ❌ loading 不能直接跳到 idle！

const s3 = s2.transition('idle');      // ✅ success → idle 合法
```

**参考答案**：

这是一个**编译时状态机**，核心类型安全机制：

1. **`Transitions` 类型**：定义合法的状态转移映射表
2. **`NextStates<S>`**：给定当前状态 S，返回所有合法的下一状态
3. **`transition<N extends NextStates<S>>(nextState: N)`**：
   - 泛型 N 被约束为当前状态的合法下一状态
   - 尝试非法转移时，N 无法匹配 `NextStates<S>`，编译报错
4. **返回 `StateMachine<N>`**：转移后机器状态类型更新为新的状态 N

**效果**：非法状态转移在**编译期**就被拦截，不需要运行时检查。

**扩展方向**：加入转移时的 Payload 类型、并行状态、嵌套状态机等。

### 🔍 追问链
1. **const 类型参数和 as const 的区别？**
   → 方向：as const 作用于表达式（让整个表达式的结果不变宽）；const 类型参数作用于泛型（让传入的字面量参数不变宽）
2. **const 类型参数对于 API 设计有什么意义？**
   → 方向：让库的使用者获得更精确的类型推断（如路由路径、CSS 类名、事件名称等字符串字面量不再被拓宽为 string）
3. **const 类型参数会有什么性能影响吗？**
   → 方向：无运行时影响（纯编译时特性）；但可能导致类型计算复杂度增加（大量字面量联合时）

---

### 四、编程实践题（3道）

## Q41: 实现一个完整的 TypeScript 类型-safe EventBus（事件总线），要求：
- **难度**：★★★
1. 支持注册/触发/移除事件监听
2. 事件名称和载荷类型严格对应
3. 支持一次性监听（once）

**参考答案**：

```typescript
// 定义事件映射
interface EventMap {
  'user:login': { userId: string; timestamp: number };
  'user:logout': { userId: string };
  'data:fetched': { data: string[]; page: number };
  'route:changed': { from: string; to: string };
}

type EventKey = keyof EventMap;
type EventPayload<K extends EventKey> = EventMap[K];

type Listener<K extends EventKey> = (payload: EventPayload<K>) => void;

class TypedEventBus<Events extends Record<string, any>> {
  private listeners = new Map<EventKey, Set<Listener<any>>>();
  private onceListeners = new Map<EventKey, Set<Listener<any>>>();

  on<K extends EventKey>(event: K, listener: Listener<K>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);

    // 返回取消订阅函数
    return () => {
      this.listeners.get(event)?.delete(listener);
    };
  }

  once<K extends EventKey>(event: K, listener: Listener<K>): () => void {
    if (!this.onceListeners.has(event)) {
      this.onceListeners.set(event, new Set());
    }
    const wrapper: Listener<any> = (payload) => {
      listener(payload);
      this.offOnce(event, wrapper);
    };
    this.onceListeners.get(event)!.add(wrapper);

    return () => this.offOnce(event, wrapper);
  }

  emit<K extends EventKey>(event: K, payload: EventPayload<K>): void {
    this.listeners.get(event)?.forEach(listener => listener(payload));
    this.onceListeners.get(event)?.forEach(listener => listener(payload));
  }

  off<K extends EventKey>(event: K, listener: Listener<K>): void {
    this.listeners.get(event)?.delete(listener);
  }

  private offOnce<K extends EventKey>(event: K, listener: Listener<K>): void {
    this.onceListeners.get(event)?.delete(listener);
  }

  removeAllListeners(event?: EventKey): void {
    if (event) {
      this.listeners.delete(event);
      this.onceListeners.delete(event);
    } else {
      this.listeners.clear();
      this.onceListeners.clear();
    }
  }
}

// 使用示例
const bus = new TypedEventBus<EventMap>();

const unsub = bus.on('user:login', (payload) => {
  console.log(payload.userId);    // ✅ string
  console.log(payload.timestamp); // ✅ number
  // payload.page;               // ❌ 不存在此属性
});

bus.emit('user:login', { userId: 'u123', timestamp: Date.now() }); // ✅
// bus.emit('user:login', { userId: 'u123' }); // ❌ 缺少 timestamp

bus.once('data:fetched', (payload) => {
  console.log(payload.data); // ✅ string[]
  console.log(payload.page); // ✅ number
});

unsub(); // 取消订阅
```

**考察点**：泛型约束事件映射、索引类型访问、回调类型推断、类型安全的发布-订阅模式

### 🔍 追问链
1. **如何防止内存泄漏？off 的正确使用方式？**
   → 方向：组件卸载时调用 off 移除所有监听器；或使用 WeakRef 存储回调引用
2. **如何支持通配符事件监听（如 `'*'` 监听所有事件）？**
   → 方向：增加特殊处理分支，匹配 '*' 时触发所有事件的回调
3. **EventBus 和 Observable（观察者模式）的区别？选型建议？**
   → 方向：EventBus 是发布-订阅（一对多，解耦通信）；Observable 是数据流管道（支持操作符 map/filter 等）。组件间通信用 EventBus，异步数据流用 Observable

---

## Q42: 实现一个 TypeScript ORM 查询构建器的基础类型系统，支持链式调用的类型安全。
- **难度**：★★★

**参考答案**：

```typescript
// ===== 类型定义 =====

interface ColumnSchema {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date';
  nullable: boolean;
}

interface TableSchema<T extends string> {
  tableName: T;
  columns: ColumnSchema[];
}

// 用户表 Schema
const userSchema: TableSchema<'users'> = {
  tableName: 'users',
  columns: [
    { name: 'id', type: 'number', nullable: false },
    { name: 'name', type: 'string', nullable: false },
    { name: 'email', type: 'string', nullable: true },
    { name: 'age', type: 'number', nullable: true },
    { name: 'active', type: 'boolean', nullable: false },
    { name: 'createdAt', type: 'date', nullable: false },
  ],
};

// 从 Schema 推导行类型
type SchemaToRow<S extends TableSchema<string>> = {
  [C in S['columns'][number] as C['name']]: C['nullable'] extends true
    ? C['type'] extends 'date' ? Date | null : C['type'] extends 'string' ? string | null : C['type'] extends 'number' ? number | null : boolean | null
    : C['type'] extends 'date' ? Date : C['type'] extends 'string' ? string : C['type'] extends 'number' ? number : boolean
};

type UserRow = SchemaToRow<typeof userSchema>;
// {
//   id: number;
//   name: string;
//   email: string | null;
//   age: number | null;
//   active: boolean;
//   createdAt: Date;
// }

// 查询条件类型
type WhereCondition<
  Row,
  Col extends keyof Row = keyof Row
> = {
  [K in Col]?: Row[K] | { $eq: Row[K] } | { $ne: Row[K] } | { $in: Row[K][] } | { $gt: Row[K] } | { $lt: Row[K] };
};

// 查询构建器
class QueryBuilder<Row, S extends TableSchema<string>> {
  private conditions: WhereCondition<Row>[] = [];
  private selects: (keyof Row)[] = [];
  private orderByField?: keyof Row;
  private orderDir?: 'asc' | 'desc';
  private limitCount?: number;

  constructor(private schema: S) {}

  select<K extends keyof Row>(...keys: K[]): Pick<Row, K> {
    this.selects = keys;
    // 实际查询后返回 Pick<Row, K> 类型
    return {} as Pick<Row, K>;
  }

  where(cond: WhereCondition<Row>): this {
    this.conditions.push(cond);
    return this;
  }

  orderBy<K extends keyof Row>(field: K, dir: 'asc' | 'desc' = 'asc'): this {
    this.orderByField = field;
    this.orderDir = dir;
    return this;
  }

  limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  async findMany(): Promise<Row[]> {
    // 实际 SQL 执行...
    return [] as Row[];
  }

  async findOne(): Promise<Row | null> {
    return null;
  }
}

// 创建查询
function fromTable<S extends TableSchema<string>>(schema: S): QueryBuilder<SchemaToRow<S>, S> {
  return new QueryBuilder(schema);
}

// ===== 使用 =====
const query = fromTable(userSchema);

// 类型安全的链式查询
const result = query
  .select('id', 'name', 'email')
  .where({ active: { $eq: true }, age: { $gt: 18 } })
  .orderBy('createdAt', 'desc')
  .limit(10)
  .findMany();

// result 类型: Promise<Array<{ id: number; name: string; email: string | null }>>
```

**考察点**：从 Schema 推导类型、条件类型、映射类型、泛型链式调用、Pick 工具类型

### 🔍 追问链
1. **查询构建器的类型安全是如何逐级传递的？**
   → 方向：每个 .where()/.select()/.orderBy() 方法返回新的类型化 Builder 实例，泛型参数随操作逐步收窄
2. **如何支持 JOIN 查询后的类型推导？**
   → 方向：JOIN 时将多个 Schema 的 Row 类型做交叉类型合并
3. **这种模式和 Prisma / Drizzle ORM 的类型系统有何异同？**
   → 方向：Prisma 用代码生成（schema.prisma → 生成 TS 类型）；Drizzle 用类型推导（纯 TS 表达式）；本题更接近 Drizzle 的思路

---

## Q43: 设计一个 TypeScript 项目迁移策略：将一个 5 万行的纯 JavaScript 项目逐步迁移到 TypeScript，要求不影响现有功能开发。
- **难度**：★★★

**参考答案要点**：

**分阶段迁移策略**：

```
阶段 1: 基础设施搭建（1 周）
├── 安装 TypeScript 及配置
├── 创建 tsconfig.json（allowJs: true, strict: false）
├── 配置 ESLint + Prettier + TS 规则
└── 建立 CI 类型检查流水线

阶段 2: 新代码 TS 化（持续）
├── 所有新文件使用 .ts/.tsx
├── 启用 noImplicitAny（渐进开启严格模式）
└── 第三方库安装 @types/*

阶段 3: 核心模块迁移（按优先级）
├── 公共工具函数 / utils
├── 类型定义 / types 和 interfaces
├── 数据模型 / models
├── API 层 / services
└── 业务组件 / components

阶段 4: 严格模式升级
├── strict: true
├── noUncheckedIndexedAccess: true
├── 修复所有类型错误
└── 补充单元测试覆盖

阶段 5: 清理与优化
├── 移除 allowJs
├── 删除冗余 .js 文件
├── 优化类型定义（消除 any）
└── 性能优化（project references）
```

**关键技术决策**：

```jsonc
// 迁移期 tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,           // 允许共存
    "checkJs": true,           // 对 .js 文件也做类型检查（JSDoc）
    "noEmit": true,            // 由 bundler 处理编译
    "strict": false,           // 初期关闭
    "noImplicitAny": true,     // 第一步开启
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
}
```

**迁移实用技巧**：

1. **JSDoc 过渡**：在不改后缀的情况下添加 JSDoc 注释获得类型检查
   ```javascript
   /** @type {{ name: string; age: number }} */
   const user = getUser();
   ```

2. **模块声明文件**：为无类型的 JS 模块快速创建声明
   ```typescript
   // legacy-module.d.ts
   declare module 'legacy-lib' {
     export function doSomething(config: any): Promise<any>;
   }
   ```

3. **coerce-types 规则**：ESLint 规则禁止 `as any` 等 unsafe 断言

4. **类型覆盖率指标**：在 CI 中监控 `any` 使用率，逐步降低

**风险控制**：
- 每次迁移一个独立模块，确保可回滚
- 保持单次 PR 的改动量可控（< 500 行）
- 迁移前后必须有自动化测试保障

**参考来源**：[JS 到 TS 迁移策略](https://www.secondtalent.com/interview-guide/typescript-developer/)

---

## 附录：知识点速查表与难度评级标准

### 难度评级说明

| 等级 | 星级 | 标签 | 说明 |
|------|------|------|------|
| **L1 入门** | ★☆☆ | 初级 | 基础概念辨析、语法记忆，掌握 TS 即可作答 |
| **L2 基础** | ★★☆ | 初级+ / 中级 / 高级入门 | 需理解原理、能写出正确代码，涉及多知识点综合 |
| **L3 进阶** | ★★★ | 中级偏难 / 高级 | 需深入理解类型系统底层机制，具备复杂类型设计能力 |

### 各题难度总览

#### 第一部分：基础层（题 1~15）

| 题号 | 类型 | 考察知识点 | 难度 |
|------|------|-----------|------|
| 题 1 | 选择 | any/unknown/never 核心区别 | ★☆☆ |
| 题 2 | 选择 | interface vs type | ★☆☆ |
| 题 3 | 选择 | 可选参数与空值合并 `??` | ★☆☆ |
| 题 4 | 选择 | 元组（Tuple）类型 | ★☆☆ |
| 题 5 | 选择 | 枚举（Enum）数字映射特性 | ★☆☆ |
| 题 6 | 简答 | TypeScript vs JavaScript 全面对比 | ★☆☆ |
| 题 7 | 简答 | 类型推断、拓宽、const 断言 | ★★☆ |
| 题 8 | 简答 | public/private/protected 访问修饰符 | ★☆☆ |
| 题 9 | 简答 | 类型断言（as / <> / !） | ★★☆ |
| 题 10 | 简答 | 函数类型定义与重载 | ★★☆ |
| 题 11 | 代码分析 | 接口可选属性、readonly、多余属性检查 | ★☆☆ |
| 题 12 | 代码分析 | 数组/元组类型推断与拓宽行为 | ★★☆ |
| 题 13 | 代码分析 | void 与 undefined 返回类型兼容性差异 | ★★☆ |
| 题 14 | 编程实践 | 泛型 identity 函数 + first 函数 | ★★☆ |
| 题 15 | 编程实践 | 接口设计、可选字段、联合类型、默认值 | ★★☆ |

#### 第二部分：进阶层（题 16~29）

| 题号 | 类型 | 考察知识点 | 难度 |
|------|------|-----------|------|
| 题 16 | 选择 | 泛型约束（extends） | ★★☆ |
| 题 17 | 选择 | 自定义类型守卫（is 类型谓词） | ★★★ |
| 题 18 | 选择 | 联合类型与交叉类型赋值规则 | ★★☆ |
| 题 19 | 简答 | 四种内置类型守卫（typeof/in/instanceof/可辨识联合） | ★★★ |
| 题 20 | 简答 | 泛型三场景（函数/接口/类）+ 约束方式 | ★★☆ |
| 题 21 | 简答 | 工具类型源码实现（Partial/Required/Pick/Omit） | ★★★ |
| 题 22 | 简答 | ES Module vs Namespace 模块系统对比 | ★★☆ |
| 题 23 | 简答 | 声明合并（接口/命名空间）及实际应用场景 | ★★★ |
| 题 24 | 代码分析 | 泛型 API 封装、Promise 泛型响应推断 | ★★☆ |
| 题 25 | 代码分析 | 类型安全事件系统（泛型+索引类型+回调推断） | ★★★ |
| 题 26 | 代码分析 | 协变与逆变原理（函数参数/返回值/数组） | ★★★ |
| 题 27 | 编程实践 | 泛型深拷贝函数（递归+Date/Array处理） | ★★★ |
| 题 28 | 编程实践 | 高级工具类型 Optionalize + DeepPartial（模板字面量+递归） | ★★★ |
| 题 29 | 编程实践 | 类型安全 HTTP 客户端（Discriminated Union 模式） | ★★★ |

#### 第三部分：专家层（题 30~43）

| 题号 | 类型 | 考察知识点 | 难度 |
|------|------|-----------|------|
| 题 30 | 选择 | 分布式条件类型（Distributive Conditional Types） | ★★★ |
| 题 31 | 选择 | 装饰器执行顺序（工厂求值+调用时序） | ★★☆ |
| 题 32 | 简答 | 条件类型 + infer 手写 ReturnType/Parameters/Awaited | ★★★ |
| 题 33 | 简答 | 映射类型进阶：DeepReadonly/Mutable/RenameKey | ★★★ |
| 题 34 | 简答 | TS 5.x 新旧装饰器模式对比 + 日志/缓存装饰器实现 | ★★★ |
| 题 35 | 简答 | 模板字面量类型 + infer 路由参数提取 | ★★★ |
| 题 36 | 简答 | tsconfig.json 多层配置策略与工程化决策 | ★★☆ |
| 题 37 | 代码分析 | 类型体操：OptionalKeys 可选属性提取技巧 | ★★★ |
| 题 38 | 代码分析 | 互斥联合类型（Exclusive Union）Props 设计模式 | ★★★ |
| 题 39 | 代码分析 | const 类型参数（TS 5.0+ 字面量保持） | ★★☆ |
| 题 40 | 代码分析 | 类型驱动状态机（编译时转移约束） | ★★★ |
| 题 41 | 编程实践 | 完整类型安全 EventBus（on/emit/once/off） | ★★★ |
| 题 42 | 编程实践 | ORM 查询构建器（Schema→Row推导+链式调用） | ★★★ |
| 题 43 | 编程实践 | 大规模 JS→TS 分阶段迁移策略方案 | ★★★ |

### 难度分布统计

| 难度等级 | 题目数量 | 占比 | 典型特征 |
|----------|---------|------|----------|
| ★☆☆ 初级 | 8 道 | 18.6% | 概念记忆、基础语法 |
| ★★☆ 中级/入门 | 12 道 | 27.9% | 多点综合、需理解原理 |
| ★★★ 高级/进阶 | 23 道 | 53.5% | 复杂类型设计、工程架构 |

---

## 参考来源

- [TS常规面试题 - 掘金](https://juejin.cn/post/7512277099413012514)
- [2025前端面试题-TS理论篇 - 掘金](https://juejin.cn/post/7530179511728930856)
- [TypeScript高频面试题与核心知识总结 - 掘金](https://juejin.cn/post/7523878122645520384)
- [2025前端最新高频TypeScript面试题 - CSDN](https://blog.csdn.net/weixin_60526471/article/details/153528752)
- [TypeScript基础面试题整理 - CSDN](https://blog.csdn.net/m0_44973790/article/details/151803965)
- [TypeScript完全指南（下）- CSDN](https://blog.csdn.net/qq_17859117/article/details/161644680)
- [TypeScript 5.x高级技巧与类型体操实战 - 51CTO](https://blog.51cto.com/u_17171324/14506902)
- [6个题检测是否熟悉typescript - 掘金](https://juejin.cn/post/7473464790696165385)
- [Top 15 TypeScript Developer Interview Questions - Second Talent](https://www.secondtalent.com/interview-guide/typescript-developer/)
- [TypeScript常见面试问题 - CSDN](https://blog.csdn.net/qq_39903567/article/details/155846294)
- [40道TypeScript面试题 - 51CTO](https://www.51cto.com/article/772925.html)
- [原生JS：TypeScript最常用20道面试题 - 51CTO](https://blog.51cto.com/u_16213566/14206672)
- [分享25道常见TypeScript面试题 - CSDN](https://blog.csdn.net/qq_41221596/article/details/132632184)

---

> **文档版本**：v2.0 | **更新日期**：2026-06-10 | **总题数**：43 道 | **新增**：每题难度评级 + 附录评级标准总览
>
> **使用建议**：
> - 初级开发者：完成 ★☆☆ 全部题目 + ★★☆ 基础层题目
> - 中级开发者：完成 ★★☆ 全部题目 + ★★★ 进阶层题目
> - 高级/Tech Lead：完成全部 ★★★ 题目，重点关注编程实践题（27~29, 41~43）
> - 面试官：每轮面试从中选取 3-5 遘不同难度、不同类型题目组合考查
