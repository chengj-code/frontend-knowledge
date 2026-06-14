# TypeScript 面试题库（2025-2026 企业实战版）

> 本题库基于全网最新面试趋势整理，涵盖基础、进阶、专家三个难度层级，重点考察实际工程应用能力。
> 题目形式包含：选择题（10道）、简答题（15道）、代码分析题（10道）、编程实践题（8道），共 **43 道**。

---

## 第一部分：基础层（初级难度）

> **考察目标**：TypeScript 基本类型系统、接口定义、函数注解、类的使用
> **适用岗位**：初级前端开发、实习生、转岗开发者

---

### 一、选择题（5道）

#### 题 1：TypeScript 的基本类型系统中，`any`、`unknown`、`never` 三者的核心区别是？ `⭐ 难度：★☆☆（初级）`

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

---

#### 题 2：以下关于接口（Interface）和类型别名（Type Alias）的说法，**错误**的是？ `⭐ 难度：★☆☆（初级）`

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

---

#### 题 3：以下 TypeScript 代码的输出结果是什么？ `⭐ 难度：★☆☆（初级）`

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

#### 题 4：以下关于元组（Tuple）的描述，**正确**的是？ `⭐ 难度：★☆☆（初级）`

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

#### 题 5：以下代码中，哪个位置会产生**编译错误**？ `⭐ 难度：★☆☆（初级）`

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

#### 题 6：请解释 TypeScript 与 JavaScript 的核心区别，并说明在什么场景下应该选择 TypeScript？ `⭐ 难度：★☆☆（初级）`

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

#### 题 7：什么是类型推断（Type Inference）？举例说明 TypeScript 在哪些情况下会进行类型推断。 `⭐ 难度：★★☆（初级+）`

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

#### 题 8：请解释 `public`、`private`、`protected` 三种访问修饰符的作用，并给出代码示例。 `⭐ 难度：★☆☆（初级）`

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

#### 题 9：什么是类型断言（Type Assertion）？`as` 语法和 `<>` 语法有什么区别？什么时候应该使用非空断言 `!`？ `⭐ 难度：★★☆（初级+）`

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

---

#### 题 10：如何定义一个函数的类型？请写出函数重载的完整示例。 `⭐ 难度：★★☆（初级+）`

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

---

### 三、代码分析题（3道）

#### 题 11：分析以下代码，找出所有类型错误并说明原因。 `⭐ 难度：★☆☆（初级）`

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

#### 题 12：以下代码的输出是什么？请解释每一步的类型变化。 `⭐ 难度：★★☆（初级+）`

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

#### 题 13：阅读以下代码，指出 `void` 和 `undefined` 作为返回类型的区别。 `⭐ 难度：★★☆（初级+）`

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

#### 题 14：实现一个泛型 identity 函数，并扩展为可以获取数组首元素的 `first` 函数。 `⭐ 难度：★★☆（初级+）`

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

#### 题 15：定义一个 `User` 接口和一个 `formatUser` 函数，要求处理可选字段和默认值。 `⭐ 难度：★★☆（初级+）`

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

#### 题 16：以下关于泛型约束（Generic Constraints）的代码，输出结果是？ `⭐ 难度：★★☆（中级）`

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

#### 题 17：以下自定义类型守卫的实现，**最佳**的是？ `⭐ 难度：★★★（中级偏难）`

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

---

#### 题 18：以下联合类型与交叉类型的代码，运行结果正确的是？ `⭐ 难度：★★☆（中级）`

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

#### 题 19：请详细解释 TypeScript 中的四种内置类型守卫，并分别给出示例。 `⭐ 难度：★★★（中级偏难）`

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

---

#### 题 20：什么是泛型？请列举泛型的三种主要应用场景（函数、接口、类），并说明泛型约束的作用。 `⭐ 难度：★★☆（中级）`

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

---

#### 题 21：请解释 TypeScript 内置工具类型 `Partial<T>`、`Required<T>`、`Pick<T, K>`、`Omit<T, K>` 的作用及实现原理。 `⭐ 难度：★★★（中级偏难）`

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

---

#### 题 22：TypeScript 中的模块系统如何工作？`import/export` 和 `namespace` 各自的使用场景是什么？ `⭐ 难度：★★☆（中级）`

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

---

#### 题 23：什么是声明合并（Declaration Merging）？它在实际开发中有哪些应用场景？ `⭐ 难度：★★★（中级偏难）`

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

---

### 三、代码分析题（3道）

#### 题 24：分析以下泛型代码，解释每个泛型参数的含义和约束条件。 `⭐ 难度：★★☆（中级）`

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

#### 题 25：以下使用了多种高级特性的代码，请逐行分析其类型行为。 `⭐ 难度：★★★（中级偏难）`

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

#### 题 26：请分析以下代码中协变（covariance）和逆变（contravariance）的表现。 `⭐ 难度：★★★（中级偏难）`

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

---

### 四、编程实践题（3道）

#### 题 27：实现一个类型安全的深拷贝函数 `deepClone<T>`，要求保持泛型类型不变。 `⭐ 难度：★★★（中级偏难）`

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

---

#### 题 28：实现一个 `Optionalize<T, K>` 工具类型，使对象 T 中由 K 指定的属性及其嵌套路径下的属性全部变为可选。 `⭐ 难度：★★★（中级偏难）`

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

#### 题 29：实现一个类型安全的 HTTP 请求封装，支持泛型响应类型和错误处理。 `⭐ 难度：★★★（中级偏难）`

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

#### 题 30：以下条件类型代码的结果是什么？ `⭐ 难度：★★★（高级）`

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

---

#### 题 31：TypeScript 5.x 中装饰器的执行顺序是什么？ `⭐ 难度：★★☆（高级入门）`

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

#### 题 32：请详细解释条件类型（Conditional Types）的语法和 `infer` 关键字的工作原理，并手写实现 `ReturnType`、`Parameters`、`Awaited` 三个工具类型。 `⭐ 难度：★★★（高级）`

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

---

#### 题 33：请解释映射类型（Mapped Types）的语法，并实现以下高级映射类型：
1. `DeepReadonly<T>`：深度只读
2. `Mutable<T>`：移除所有 readonly
3. `RenameKey<T, OldK, NewK>`：重命名键 `⭐ 难度：★★★（高级）`

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

---

#### 题 34：请解释 TypeScript 5.x 中装饰器（Decorators）的新旧两种模式差异，并实现一个实用的方法日志装饰器和缓存装饰器。 `⭐ 难度：★★★（高级）`

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

---

#### 题 35：什么是模板字面量类型（Template Literal Types）？请用它实现一个类型安全的路由参数提取工具。 `⭐ 难度：★★★（高级）`

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

#### 题 36：在一个大型项目中，如何设计 TypeScript 配置以兼顾开发体验和构建性能？请给出推荐的 tsconfig.json 配置策略。 `⭐ 难度：★★☆（高级入门）`

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

---

### 三、代码分析题（4道）

#### 题 37：分析以下"类型体操"代码，解释每一步的类型变换过程。 `⭐ 难度：★★★（高级）`

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

---

#### 题 38：以下代码利用了互斥联合类型（Exclusive Union）来防止非法 Props 组合，请分析其工作原理。 `⭐ 难度：★★★（高级）`

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

---

#### 题 39：分析以下 TypeScript 5.x 新特性代码，解释 `const` 类型参数的作用。 `⭐ 难度：★★☆（高级入门）`

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

#### 题 40：以下是一个类型驱动的状态机实现，请分析其类型安全保障机制。 `⭐ 难度：★★★（高级）`

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

---

### 四、编程实践题（3道）

#### 题 41：实现一个完整的 TypeScript 类型-safe EventBus（事件总线），要求：
1. 支持注册/触发/移除事件监听
2. 事件名称和载荷类型严格对应
3. 支持一次性监听（once） `⭐ 难度：★★★（高级）`

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

---

#### 题 42：实现一个 TypeScript ORM 查询构建器的基础类型系统，支持链式调用的类型安全。 `⭐ 难度：★★★（高级）`

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

---

#### 题 43：设计一个 TypeScript 项目迁移策略：将一个 5 万行的纯 JavaScript 项目逐步迁移到 TypeScript，要求不影响现有功能开发。 `⭐ 难度：★★★（高级）`

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
