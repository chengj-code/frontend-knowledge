# 工程化（Engineering）面试题库

> **本模块聚焦前端工程化全栈能力**，涵盖模块化构建、工具链优化、代码质量保障、协作流程与部署体系。
>
> **适用场景**：初中高级前端工程师面试准备 / 技术团队内训 / 知识体系自查

---

## 📋 目录索引

| 题号 | 难度 | 题目概要 | 核心知识点 |
|------|------|----------|------------|
| Q01-Q15 | ★☆☆ | 基础概念与配置 | 模块化/包管理/Webpack基础/CSS预处理器/Git基础 |
| Q16-Q35 | ★★☆ | 原理理解与综合应用 | Webpack深度/Vite原理/代码规范/CI-CD/Monorepo |
| Q36-Q50 | ★★★ | 架构设计与手写实现 | 手写打包器/HMR实现/脚手架设计/工程化体系 |

---

# 第一部分：基础层（★☆☆）— 概念记忆与基础配置

> **说明**：本部分共 15 题，侧重核心概念的准确记忆、基础配置的熟练使用。适合 1-2 年经验的前端工程师。

---

## Q01: CommonJS 和 ES Modules（ESM）有哪些主要区别？
- **难度**：★☆☆
- **知识点**：模块化 / CommonJS / ESM
- **题型**：简答题

### 参考答案要点：

1. **加载机制不同**
   - CommonJS：运行时加载，`require()` 同步执行，值拷贝
   - ESM：编译时静态分析，`import` 异步加载，值的引用（live binding）

2. **输出方式不同**
   ```javascript
   // CommonJS - 值拷贝
   module.exports.count = 1
   // 引用方修改不会影响源模块

   // ESM - 动态引用
   export let count = 1
   // 引用方获取的是实时引用，源模块修改会同步反映
   ```

3. **使用限制差异**
   - CommonJS：可在任意位置调用 `require()`
   - ESM：`import` 必须在文件顶层，不能条件导入

4. **this 指向不同**
   - CommonJS：`this` 指向当前模块对象（`module.exports`）
   - ESM：顶层 `this` 为 `undefined`

5. **循环依赖处理**
   - CommonJS：返回已执行的部分（可能为空对象）
   - ESM：通过动态引用保证最终一致性

### 🔍 追问链
1. **如何在 CommonJS 项目中引入 ESM 模块？**
   → 使用动态 `import()` 或配置 `"type": "module"` + `.cjs` 后缀
2. **ESM 的 Tree Shaking 为什么比 CommonJS 更好？**
   → 静态分析可确定未使用的导出；CommonJS 动态特性无法安全删除
3. **Node.js 中如何混用两种模块系统？**
   → `package.json` 的 `type` 字段 + 文件扩展名（`.mjs` / `.cjs`）

---

## Q02: npm、yarn、pnpm 三种包管理器的核心区别是什么？
- **难度**：★☆☆
- **知识点**：包管理 / npm / yarn / pnpm
- **题型**：对比分析题

### 参考答案要点：

1. **node_modules 结构差异**
   ```
   npm/yarn (v1): 扁平化结构，可能存在重复依赖提升
   pnpm:          符号链接 + 内容寻址存储（.pnpm/store）
   ```

2. **安装速度与磁盘空间**
   - npm/yarn：依赖可能被多次下载，占用空间大
   - pnpm：硬链接共享同一份文件，节省 50%+ 磁盘空间

3. **幽灵依赖问题（Phantom Dependencies）**
   - npm/yarn v1：可以访问未声明的依赖（扁平化副作用）
   - pnpm：严格模式只能访问 `dependencies` 中声明的依赖

4. **锁定文件格式**
   - npm：`package-lock.json`
   - yarn：`yarn.lock`
   - pnpm：`pnpm-lock.yaml`

### 🔍 追问链
1. **pnpm 的 node_modules 结构具体是怎样的？**
   → `.pnpm/<name>@<version>/node_modules/<name>` 通过符号链接连接
2. **为什么 pnpm 能避免幽灵依赖？**
   → 只创建直接依赖的符号链接，不提升间接依赖
3. **yarn PnP（Plug'n'Play）是什么？**
   → 完全不生成 node_modules，通过解析控制文件直接定位包

---

## Q03: package.json 中 dependencies、devDependencies、peerDependencies 分别什么时候用？
- **难度**：★☆☆
- **知识点**：包管理 / 依赖管理 / package.json
- **题型**：简答题

### 参考答案要点：

1. **dependencies（生产依赖）**
   - 应用运行时必需的库（如 `react`、`lodash`）
   - 安装时会被一起安装到消费者项目中

2. **devDependencies（开发依赖）**
   - 仅开发阶段使用的工具（如 `webpack`、`eslint`、`typescript`）
   - `npm install --production` 时不会被安装
   - 发布库时通常不安装给使用者

3. **peerDependencies（同伴依赖）**
   - 声明宿主环境应提供的依赖（如插件对应的主框架版本）
   - **不会自动安装**，仅做版本兼容性警告
   ```json
   {
     "peerDependencies": {
       "react": ">=16.8.0 <19.0.0"
     }
   }
   ```

4. **optionalDependencies（可选依赖）**
   - 安装失败不影响整体安装流程
   - 适用于平台特定依赖（如 `fsevents` 仅 macOS 需要）

---

## Q04: 什么是语义化版本号（Semver）？请举例说明各位置的含义。
- **难度**：★☆☆
- **知识点**：版本管理 / Semver
- **题型**：简答题

### 参考答案要点：

1. **版本号格式**：`MAJOR.MINOR.PATCH`（主版本.次版本.修订号）
   - **MAJOR**：不兼容的 API 修改（如 React 16→18）
   - **MINOR**：向下兼容的功能新增（如新增 Hook API）
   - **PATCH**：向下兼容的问题修正（如 bug fix）

2. **预发布版本**：`1.0.0-beta.1`、`2.0.0-rc.1`

3. **范围写法示例**
   ```json
   "^1.2.3" : >=1.2.3 <2.0.0   // 兼容主版本（常用）
   "~1.2.3" : >=1.2.3 <1.3.0   // 兼容次版本
   ">=1.0.0 <2.0.0"            // 自定义范围
   "1.x"    : >=1.0.0 <2.0.0   // 通配符写法
   ""       : 最新版本           // 无锁定（危险）
   ```

4. **实际建议**
   - 应用项目：锁死精确版本或用 `^`
   - 发布库：严格遵循 Semver 规范

---

## Q05: Webpack 的核心概念有哪些？entry、output、loader、plugin 各自的作用？
- **难度**：★☆☆
- **知识点**：Webpack / 构建工具 / 核心概念
- **题型**：简答题

### 参考答案要点：

1. **Entry（入口）**
   - 指定 Webpack 从哪个文件开始构建依赖图
   - 可配置单入口或多入口（SPA vs MPA）

2. **Output（出口）**
   - 定义打包后的文件输出路径和命名规则
   - 支持 `[name]`、`[hash]`、`[chunkhash]` 等占位符

3. **Loader（加载器）**
   - 让 Webpack 能够处理非 JS 文件（CSS、图片、TypeScript 等）
   - 将文件转换为有效模块后加入依赖图
   ```javascript
   module: {
     rules: [
       {
         test: /\.css$/,        // 匹配文件
         use: ['style-loader', 'css-loader']  // 从右到左执行
       }
     ]
   }
   ```

4. **Plugin（插件）**
   - 扩展 Webpack 功能，在构建生命周期中注入钩子
   - 如：HtmlWebpackPlugin、MiniCssExtractPlugin、DefinePlugin

5. **Mode（模式）**
   - `development` / `production` / `none`
   - 自动启用相应优化（如 production 启用压缩、Tree Shaking）

---

## Q06: Loader 和 Plugin 有什么区别？请举例说明各自的使用场景。
- **难度**：★☆☆
- **知识点**：Webpack / Loader / Plugin
- **题型**：对比分析题

### 参考答案要点：

1. **本质区别**
   - **Loader**：文件转换器（输入 A → 输出 B），专注于单一文件的处理
   - **Plugin**：生命周期钩子（监听事件 → 执行逻辑），可访问完整编译对象

2. **Loader 特征**
   - 在 `module.rules` 中配置
   - 只负责将某种资源转换为 JS 模块
   - 可以链式调用（从右到左 / 从下到上）
   - 示例：`babel-loader`（转译 TS）、`css-loader`（解析 CSS import）、`file-loader`（处理图片）

3. **Plugin 特征**
   - 在 `plugins` 数组中实例化
   - 可访问 Webpack 编译过程的完整上下文
   - 监听 tapable 事件流中的钩子
   - 示例：HtmlWebpackPlugin（生成 HTML）、CleanWebpackPlugin（清理 dist）、CompressionPlugin（Gzip 压缩）

4. **执行时机**
   ```
   文件读取 → Loader 链处理 → 解析模块依赖 → Plugin 钩子触发 → 输出结果
   ```

### 🔍 追问链
1. **如何手写一个简单的 Loader？**
   → 导出一个函数，接收 source 参数，返回转换后的内容
2. **如何手写一个简单的 Plugin？**
   → 定义类，在 constructor 接收参数，apply 方法中注册 compiler/hooks 钩子
3. **Loader 的 pitch 阶段是什么？**
   → 从左到右执行的预处理阶段，可用于拦截后续 loader 执行

---

## Q07: ESLint 和 Prettier 分别解决什么问题？它们之间有什么关系？
- **难度**：★☆☆
- **知识点**：代码规范 / ESLint / Prettier
- **题型**：简答题

### 参考答案要点：

1. **ESLint（代码质量检查）**
   - 发现代码中的潜在错误和不符合规范的写法
   - 基于 AST（抽象语法树）进行静态分析
   - 可自定义规则（如 `no-unused-vars`、`eqeqeq`）
   - 支持修复部分问题（`--fix`）

2. **Prettier（代码格式化）**
   - 只关注代码风格（缩进、引号、分号等）
   - "Opinionated"（固执己见），几乎无配置选项
   - 统一团队代码风格的终极方案

3. **职责划分**
   ```
   ESLint:  代码质量（能不能这么写？会不会有 bug？）
   Prettier: 代码格式（好不好看？风格是否统一？）
   ```

4. **配合使用方式**
   - 使用 `eslint-config-prettier` 关闭 ESLint 中与 Prettier 冲突的规则
   - 使用 `eslint-plugin-prettier` 让 Prettier 的规则以 ESLint error 形式展示
   - 推荐做法：ESLint 管质量 + Prettier 管格式，互不干扰

---

## Q08: Husky 和 lint-staged 是什么？它们如何配合工作？
- **难度**：★☆☆
- **知识点**：Git Hooks / 代码规范 / Husky / lint-staged
- **题型**：简答题

### 参考答案要点：

1. **Husky（Git Hooks 管理）**
   - 方便地管理 Git hooks（commit 前、push 前自动执行脚本）
   - 替代手动编写 `.git/hooks/` 脚本
   - 配置方式：
   ```bash
   # .husky/pre-commit
   npx eslint .
   npx prettier --write .
   ```

2. **lint-staged（增量检查）**
   - 只对暂存区（staged）的文件运行 linter
   - 避免每次提交都检查整个项目，大幅提速
   - 配置示例：
   ```json
   {
     "lint-staged": {
       "*.{js,ts}": ["eslint --fix", "prettier --write"],
       "*.{css,scss}": ["stylelint --fix", "prettier --write"]
     }
   }
   ```

3. **典型工作流**
   ```
   git add → git commit → pre-commit hook 触发
   → lint-staged 筛选暂存文件 → 并行执行 ESLint/Prettier
   → 检查通过 → 提交成功
   ```

4. **优势**
   - 保证提交到仓库的代码符合规范
   - 只检查变更文件，性能友好
   - 团队统一配置，无需本地额外设置

---

## Q09: Sass/Less 相比原生 CSS 有哪些核心特性？请列举常用的 3-4 个。
- **难度**：★☆☆
- **知识点**：CSS 工程化 / Sass / Less / CSS 预处理器
- **题型**：简答题

### 参考答案要点：

1. **变量（Variables）**
   ```scss
   $primary-color: #1890ff;      // Sass
   @primary-color: #1890ff;      // Less

   button { background: $primary-color; }
   ```

2. **嵌套规则（Nesting）**
   ```scss
   .card {
     .title { font-size: 18px; }    // 嵌套子选择器
     &:hover { opacity: 0.8; }      // & 引用父选择器
   }
   ```

3. **Mixin（混合/复用代码块）**
   ```scss
   @mixin flex-center {
     display: flex;
     justify-content: center;
     align-items: center;
   }

   .container { @include flex-center; }
   ```

4. **模块化导入（Import）**
   ```scss
   @use 'variables';    // Sass 新语法（局部作用域）
   @import 'mixins';    // 传统语法（全局污染）
   ```

5. **其他实用功能**
   - 函数与运算（`lighten()`、`darken()`、数学计算）
   - 条件判断与循环（`@if`、`@each`、`@for`）
   - 继承/扩展（`@extend` 共享样式）

---

## Q10: CSS Modules 是什么？它解决了什么问题？
- **难度**：★☆☆
- **知识点**：CSS 工程化 / CSS Modules / 样式隔离
- **题型**：简答题

### 参考答案要点：

1. **核心原理**
   - 编译时为每个 class 名生成唯一的哈希值
   - 实现组件级别的样式作用域隔离
   ```css
   /* 源文件 */
   .container { padding: 20px; }

   /* 编译后 */
   .container_abc123_xyz { padding: 20px; }
   ```

2. **解决的问题**
   - 避免 BEM 等命名约定的繁琐
   - 消除全局样式冲突（特别是多人协作/组件库场景）
   - 明确样式的归属关系（样式跟随组件）

3. **使用方式**
   ```jsx
   // App.module.css
   .title { color: red; }

   // App.jsx
   import styles from './App.module.css'
   function App() {
     return <h1 className={styles.title}>Hello</h1>
   }
   ```

4. **注意事项**
   - 不支持伪元素选择器的组合（`:global()` 可逃逸）
   - 与动画名称冲突需特殊处理
   - 需要构建工具支持（Webpack css-loader / Vite）

---

## Q11: Conventional Commits 规范的基本格式是什么？常见的 type 有哪些？
- **难度**：★☆☆
- **知识点**：Git 工作流 / Commit 规范 / Conventional Commits
- **题型**：简答题

### 参考答案要点：

1. **基本格式**
   ```
   <type>(<scope>): <subject>

   [optional body]

   [optional footer(s)]
   ```

2. **常见 Type 类型**
   | Type | 说明 |
   |------|------|
   | `feat` | 新功能（feature） |
   | `fix` | 修复 bug（bug fix） |
   | `docs` | 文档更新（documentation） |
   | `style` | 格式调整（不影响代码运行） |
   | `refactor` | 重构（非新功能、非修复） |
   | `perf` | 性能优化（performance） |
   | `test` | 测试相关 |
   | `chore` | 构建/工具变动 |
   | `ci` | CI 配置更改 |
   | `revert` | 回滚提交 |

3. **实际示例**
   ```
   feat(auth): add JWT token refresh logic

   - Implement auto-refresh before token expiry
   - Add retry mechanism for failed requests

   Closes #123
   ```

4. **配套工具**
   - `commitlint`：强制校验 commit message 格式
   - `standard-version` / `semantic-release`：自动生成 Changelog 和版本号

---

## Q12: Git Flow、GitHub Flow、Trunk Based Development 三种分支策略的核心区别？
- **难度**：★☆☆
- **知识点**：Git 工作流 / 分支管理策略
- **题型**：对比分析题

### 参考答案要点：

1. **Git Flow（经典模型）**
   - 5 种分支：master / develop / feature / release / hotfix
   - 适合：版本发布周期长的项目
   - 缺点：复杂度高，维护成本大

2. **GitHub Flow（简化模型）**
   - 只有 master/main + feature 分支
   - 通过 PR 合并到 main
   - 适合：持续部署的 Web 项目
   - 特点：简单高效，主流选择

3. **Trunk Based Development（主干开发）**
   - 几乎所有人都在主干上开发
   - 通过 Feature Flag 控制功能开关
   - 适合：小团队 / 高频发布 / DevOps 成熟团队

4. **选型建议**
   ```
   大型传统项目 → Git Flow
   现代 Web 项目  → GitHub Flow（推荐）
   高频发布团队  → Trunk Based
   ```

### 🔍 追问链
1. **Git Flow 的 release 分支作用是什么？**
   → 版本发布前的稳定期，允许 bug 修复但不允许新功能
2. **GitHub Flow 如何处理紧急修复？**
   → 直接向 main 提交 PR，打 tag 后立即部署
3. **Feature Flag 在 Trunk Based 中怎么用？**
   → 未完成功能默认关闭，上线后远程开启

---

## Q13: GitHub Actions 的基本工作流（Workflow）由哪些核心组成部分？
- **难度**：★☆☆
- **知识点**：CI/CD / GitHub Actions / 自动化部署
- **题型**：简答题

### 参考答案要点：

1. **YAML 文件位置**
   - `.github/workflows/*.yml`

2. **核心组成**
   ```yaml
   name: CI Pipeline                    # 工作流名称
   on:                                  # 触发条件
     push:
       branches: [main]
   jobs:                                # 任务列表
     build:
       runs-on: ubuntu-latest           # 运行环境
       steps:                           # 步骤列表
         - uses: actions/checkout@v3     # 拉取代码
         - uses: actions/setup-node@v3   # 安装 Node.js
         - run: npm ci                  # 安装依赖
         - run: npm run build           # 构建项目
         - run: npm test                # 运行测试
   ```

3. **关键概念**
   - **Event（事件）**：push / pull_request / schedule / workflow_dispatch
   - **Job（任务）**：一组按顺序或并行运行的步骤
   - **Step（步骤）**：单个操作（run shell 命令 or 复用 action）
   - **Runner（运行器）**：执行任务的机器（GitHub-hosted / Self-hosted）

4. **常用 Actions**
   - `actions/checkout`：检出仓库代码
   - `actions/setup-node`：配置 Node.js 环境
   - `actions/cache`：缓存依赖加速构建
   - `peaceiris/actions-gh-pages`：部署 GitHub Pages

---

## Q14: Docker 容器化前端应用的典型 Dockerfile 应该包含哪些关键指令？
- **难度**：★☆☆
- **知识点**：Docker / 容器化 / 部署
- **题型**：简答题

### 参考答案要点：

1. **多阶段构建（Multi-stage Build）推荐**
   ```dockerfile
   # Stage 1: 构建阶段
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   # Stage 2: 生产阶段（只包含构建产物）
   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **关键指令说明**
   - `FROM`：指定基础镜像（尽量用 alpine 精简版减小体积）
   - `WORKDIR`：设置工作目录
   - `COPY`：复制文件到容器
   - `RUN`：执行构建命令
   - `EXPOSE`：声明端口
   - `CMD`：容器启动命令

3. **最佳实践**
   - 使用 `.dockerignore` 排除无关文件（node_modules、.git）
   - 利用 Docker 层缓存（先复制 package.json 再复制源码）
   - 多阶段构建使最终镜像最小化

---

## Q15: Monorepo 和 MultiRepo（PolyRepo）分别适合什么场景？
- **难度**：★☆☆
- **知识点**：Monorepo / 仓库管理策略
- **题型**：对比分析题

### 参考答案要点：

1. **Monorepo（单仓多包）**
   - 所有项目放在同一个 Git 仓库中
   - 代表工具：pnpm workspace、Turborepo、Nx、Lerna
   - **优点**：代码共享方便、统一版本管理、原子性提交、跨项目重构容易
   - **缺点**：仓库体积大、权限粒度粗、CI 可能变慢

2. **MultiRepo（一仓一包）**
   - 每个项目独立 Git 仓库
   - **优点**：独立权限控制、CI 简单清晰、技术栈灵活
   - **缺点**：版本协调困难、代码重复、跨项目改动麻烦

3. **选型决策**
   ```
   选择 Monorepo：
   ✅ 多个包紧密关联（如 UI 库 + 文档站点 + 示例项目）
   ✅ 团队需要频繁跨项目协作
   ✅ 希望统一技术栈和工程规范

   选择 MultiRepo：
   ✅ 各项目完全独立（不同业务线/客户）
   ✅ 团队规模大且独立运作
   ✅ 需要独立的权限和部署流程
   ```

### 🔍 追问链
1. **Monorepo 下如何管理包之间的依赖？**
   → workspace 协议（`workspace:*`）+ Turborepo task 依赖图
2. **Monorepo 的 CI 如何优化构建时间？**
   → 只构建受影响的包（Turborepo --filter）、远程缓存
3. **大型 Monorepo 如何解决构建慢的问题？**
   → Nx Affected Commands、Turborepo Remote Caching、增量构建

---

# 第二部分：进阶层（★★☆）— 原理理解与综合应用

> **说明**：本部分共 20 题，需要理解底层原理、能够进行方案设计和问题排查。适合 3-5 年经验的前端工程师。

---

## Q16: 请详细解释 Webpack 的构建流程（从启动到输出）。
- **难度**：★★☆
- **知识点**：Webpack / 构建流程 / Tapable
- **题型**：简答题

### 参考答案要点：

1. **初始化阶段**
   - 读取 `webpack.config.js`，合并默认参数
   - 创建 Compiler 对象（整个 Webpack 的引擎）
   - 初始化内置插件和环境插件

2. **编译阶段（Compilation）**
   ```
   Entry → 从入口文件开始递归解析依赖（make 阶段）
   ↓
   根据 rules 匹配 Loader 链，转换单个模块
   ↓
   使用 acorn 解析 AST，找出 import/require 语句
   ↓
   递归处理所有依赖模块，构建 Module Graph
   ```

3. **输出阶段（Seal & Emit）**
   - 根据 entry 和 splitChunks 配置进行 Chunk 分割
   - 对每个 Chunk 进行模板渲染（生成最终代码）
   - 输出到文件系统（emitAssets）

4. **Tapable 事件流架构**
   - Compiler 级别钩子：`run`、`compile`、`done`、`failed`
   - Compilation 级别钩子：`buildModule`、`succeedModule`、`optimize`
   - Plugin 就是通过这些钩子介入构建过程

### 🔍 追问链
1. **Webpack 的 Module Graph 是什么样的数据结构？**
   → 图结构，节点是 Module，边是依赖关系（import/require）
2. **Compiler 和 Compilation 对象的区别？**
   → Compiler 是全局唯一的（一次构建），Compilation 每次重新编译都会新建（watch 模式下多次）
3. **异步钩子（AsyncSeriesHook）和同步钩子的区别？**
   → 异步钩子支持 Promise/callback，用于需要等待的操作（如文件读写）

---

## Q17: Webpack 的代码分割（Code Splitting）有哪些方式？各自的适用场景？
- **难度**：★★☆
- **知识点**：Webpack / Code Splitting / 性能优化
- **题型**：简答题

### 参考答案要点：

1. **入口分割（Entry Points）**
   ```javascript
   entry: {
     main: './src/index.js',
     vendor: ['react', 'react-dom']
   }
   ```
   - 手动分离第三方库
   - 缺点：如果入口间有共享模块会重复打包

2. **动态导入（Dynamic Imports）**
   ```javascript
   const Dashboard = lazy(() => import('./Dashboard'))
   ```
   - 最推荐的按需加载方式
   - 自动创建独立的 chunk
   - 配合 `React.lazy()` + `<Suspense>` 使用

3. **SplitChunksPlugin（智能分割）**
   ```javascript
   optimization: {
     splitChunks: {
       chunks: 'all',
       cacheGroups: {
         vendors: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all',
         },
         common: {
           name: 'common',
           minChunks: 2,  // 至少被引用 2 次
           chunks: 'initial',
         }
       }
     }
   }
   ```
   - 自动提取公共模块和 node_modules
   - 支持细粒度的分组策略

4. **效果**
   - 首屏加载体积减少 30-60%
   - 浏览器缓存利用率提高（vendor chunk 变动频率低）

---

## Q18: Tree Shaking 的原理是什么？为什么有些代码无法被 Tree Shaking？
- **难度**：★★☆
- **知识点**：Webpack / Tree Shaking / Dead Code Elimination
- **题型**：简答题

### 参考答案要点：

1. **基本原理**
   - 基于 ES Module 的静态结构（`import/export`）
   - 编译时标记所有导出的变量/函数是否被使用
   - 在 Uglify/Terser 压缩阶段移除未使用的代码（Dead Code Elimination）

2. **Tree Shaking 生效条件**
   - 必须使用 ES Module（`import/export`）
   - `mode: 'production'` 开启优化
   - 不能有副作用（sideEffects）

3. **导致 Tree Shaking 失效的情况**

   **情况 1：CommonJS 模块**
   ```javascript
   // ❌ 无法 Tree Shake
   const utils = require('./utils')
   export default utils

   // ✅ 可以 Tree Shake
   export const foo = () => {}
   export const bar = () => {}
   ```

   **情况 2：副作用代码**
   ```javascript
   // ❌ 有副作用，即使未使用也会保留
   import './polyfill.js'  // 修改了全局对象

   // 解决：package.json 声明
   "sideEffects": false
   ```

   **情况 3：类（Class）的所有方法都被保留**
   - 因为可能有原型链操作或反射调用

   **情况 4：re-export（再导出）**
   ```javascript
   // barrel file（桶文件）可能导致中间层无法消除
   export * from './a'
   export * from './b'
   ```

4. **优化手段**
   - 使用 `/* #__PURE__ */` 注解标记纯函数
   - 在 `package.json` 设置 `"sideEffects": false`
   - 避免导出带有副作用的模块

### 🔍 追问链
1. **Webpack 的 usedExports 和 sideEffects 两个标记的关系？**
   → usedExports 标记导出是否被使用；sideEffects 标记模块是否有副作用
2. **Terser 的 DCE（Dead Code Elimination）是如何工作的？**
   → 分析作用域，移除不可达代码、未赋值变量、死分支
3. **为什么 Vue/React 的生产构建能 Tree Shake 掉 unused features？**
   → 内部使用 __DEV__ 条件编译 + ESM 导出 + sideEffects 标记

---

## Q19: Webpack HMR（热模块替换）的工作原理是什么？
- **难度**：★★☆
- **知识点**：Webpack / HMR / 开发体验
- **题型**：简答题

### 参考答案要点：

1. **整体架构**
   ```
   ┌──────────┐  WebSocket  ┌──────────────┐
   │ Dev Server│ ◄────────► │ Browser Client│
   └──────────┘            └──────────────┘
        │                        │
   watch 文件变化          接收 hash 更新
        │                        │
   重新编译变更模块          请求 manifest
        │                        │
   推送 JSON manifest      请求更新的 chunk
        │                        │
                          执行 module.hot.accept()
   ```

2. **服务端流程**
   - webpack-dev-server 启动 WebSocket 服务
   - watch 文件变化后，只重新编译变化的模块（不是全量 rebuild）
   - 生成新的 hash 和 manifest（包含 changed modules 信息）
   - 通过 WebSocket 推送给客户端

3. **客户端流程**
   - 收到通知后，请求最新的模块代码
   - 调用 `module.hot.accept()` 回调执行替换逻辑
   - 如果没有 accept 处理，则整页刷新（fallback）

4. **HMR API**
   ```javascript
   if (module.hot) {
     module.hot.accept('./Component', () => {
       // Component 更新后的回调
       render()
     })
   }
   ```

5. **框架集成**
   - Vue CLI / @vue/cli-service：自动处理组件 HMR
   - react-refresh：React Fast Refresh 实现

---

## Q20: Webpack 有哪些常见的构建速度优化方案？请分类说明。
- **难度**：★★☆
- **知识点**：Webpack / 性能优化 / 构建速度
- **题型**：综合应用题

### 参考答案要点：

1. **缩小构建范围**
   ```javascript
   module: {
     rules: [
       {
         test: /\.js$/,
         include: path.resolve(__dirname, 'src'),
         exclude: /node_modules/,  // 排除不需要处理的
       }
     ]
   }
   resolve: {
     extensions: ['.js', '.ts', '.jsx'],  // 减少后缀尝试
     alias: { '@': path.resolve(__dirname, 'src') }  // 路径别名
   }
   ```

2. **利用缓存**
   ```javascript
   // Webpack5 内置缓存
   cache: {
     type: 'filesystem',  // 文件系统缓存（持久化）
     buildDependencies: {
       config: [__filename]  // 配置文件变更时失效
     }
   }

   // Loader 缓存
   use: [
     {
       loader: 'babel-loader',
       options: { cacheDirectory: true }  // babel 结果缓存
     }
   ]
   ```

3. **多进程构建**
   ```javascript
   // thread-loader（放置在耗时的 loader 前面）
   use: ['thread-loader', 'babel-loader']

   // 或者 parallel-webpack（多 compiler 并行）
   ```

4. **开发环境优化**
   - 使用 `eval-source-map`（构建最快）
   - 关闭不必要的 plugin（如 Terser、Compression）
   - 使用 `webpack-dev-server` 的内存文件系统

5. **DllPlugin 预编译（Webpack5 已不太需要）**
   - 将不常变的第三方库预先打包成 DLL
   - 主构建直接引用 DLL，跳过编译

6. **升级 Webpack5**
   - 持久化缓存（首次慢，后续快 90%+）
   - 更好的 Tree Shaking
   - Module Federation 支持

7. **效果量化**
   ```
   未优化：Build time 45s
   缓存后：Build time 8s（首次后）
   多线程：Build time 25s（无缓存时）
   组合后：Build time 5s（缓存命中）
   ```

### 🔍 追问链
1. **Webpack5 的 filesystem cache 存储在哪里？**
   → `node_modules/.cache/webpack/`，可通过 `cache.config` 自定义
2. **thread-loader 和 HappyPack 的区别？**
   → HappyPack 已停止维护，thread-loader 是官方推荐替代
3. **如何分析构建瓶颈？**
   → `--profile` + speed-measure-webpack-plugin 生成报告

---

## Q21: Source Map 的类型有哪些？不同环境下应该如何选择？
- **难度**：★★☆
- **知识点**：Webpack / Source Map / 调试
- **题型**：简答题

### 参考答案要点：

1. **关键字含义**
   | 关键字 | 含义 |
   |--------|------|
   | `eval` | 用 eval 执行模块代码（最快） |
   | `source-map` | 生成独立的 .map 文件（最完整） |
   | `cheap` | 不包含列信息（更快） |
   | `module` | 包含 loader 的 sourcemap（更准） |
   | `inline` | 将 map 作为 DataURL 内联（单文件） |
   | `hidden` | 生成但不引用（用于上报错误） |
   | `nosources` | 没有 sourcesContent（保护源码） |

2. **推荐配置**
   ```javascript
   devtool: process.env.NODE_ENV === 'development'
     ? 'eval-cheap-module-source-map'  // 开发：行级别映射，较快
     : 'source-map'                     // 生产：独立文件，最完整
   ```

3. **各类型对比**
   | 类型 | 构建速度 | 重建速度 | 质量 | 生产可用 |
   |------|----------|----------|------|----------|
   | eval | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ | ❌ |
   | eval-cheap-source-map | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ❌ |
   | eval-cheap-module-source-map | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ |
   | source-map | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ |
   | cheap-source-map | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ✅（可接受） |
   | hidden-source-map | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ✅（监控场景） |

4. **生产环境注意事项**
   - Source Map 会暴露源码，不应直接部署
   - 上传至 Sentry 等错误监控平台
   - 或使用 `nosources-source-map` 保护源码

---

## Q22: Webpack5 的 Module Federation 是什么？解决了什么问题？
- **难度**：★★☆
- **知识点**：Webpack5 / Module Federation / 微前端
- **题型**：简答题

### 参考答案要点：

1. **核心概念**
   - 允许多个独立的构建（build）在运行时共享模块
   - 打破"单体应用"和"微前端"的边界
   - 由 Zackary Jackson（Webpack 核心成员）提出

2. **关键配置**
   ```javascript
   // host 应用（消费方）
   new ModuleFederationPlugin({
     name: 'host',
     remotes: {
       mfApp: 'mfApp@http://localhost:3001/remoteEntry.js',
     },
   })

   // remote 应用（提供方）
   new ModuleFederationPlugin({
     name: 'mfApp',
     filename: 'remoteEntry.js',
     exposes: {
       './Button': './src/components/Button',
     },
     shared: {
       react: { singleton: true, requiredVersion: '^18.0.0' },
       'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
     },
   })
   ```

3. **解决的问题**
   - **独立部署**：各应用可独立构建和部署
   - **代码共享**：避免重复打包 React/Vue 等公共依赖
   - **运行时加载**：动态加载远程模块，无需提前知道对方代码
   - **版本协调**：shared 机制自动协商依赖版本

4. **适用场景**
   - 微前端架构（多个团队独立开发子应用）
   - 组件库动态加载
   - 大型系统的模块拆分
   - 第三方插件市场

### 🔍 追问链
1. **Module Federation 和 qiankun 的区别？**
   → MF 是构建时协议，qiankun 是运行时沙箱方案；MF 更轻量但耦合构建工具
2. **shared 的 singleton 选项作用？**
   → 确保整个应用只有一个 React 实例（避免 hooks/context 冲突）
3. **如何处理远程模块加载失败的降级？**
   → ErrorBoundary + import() 的 try-catch + fallback UI

---

## Q23: Vite 的核心原理是什么？为什么它比 Webpack 开发服务器启动快得多？
- **难度**：★★☆
- **知识点**：Vite / 构建工具 / ESM / 开发服务器
- **题型**：简答题

### 参考答案要点：

1. **核心设计理念**
   ```
   Webpack:  全量打包 → 启动 dev server（先编译完再服务）
   Vite:     先启动 dev server → 按需编译（浏览器请求时才编译）
   ```

2. **开发环境（基于 esbuild + Native ESM）**
   - 利用浏览器原生的 ESM 支持（`<script type="module">`）
   - 启动时不打包，直接返回源码
   - 首次请求某文件时，使用 esbuild（Go 语言编写）极速转译
   - esbuild 比 Webpack（基于 JS）快 10-100 倍
   - 后续请求命中内存缓存

3. **生产环境（基于 Rollup）**
   - 使用 Rollup 进行打包（生态成熟、Tree Shaking 效果更好）
   - Rollup 基于 ESM，输出更优化的产物
   - 支持 code splitting、tree shaking 等优化

4. **为什么快？**
   ```
   Webpack Dev Server 启动流程：
   1. 读取全部入口文件
   2. 递归解析所有依赖
   3. Loader 链处理每个模块
   4. 生成 bundle
   5. 启动 HTTP Server
   → 项目越大越慢（冷启动 O(n)）

   Vite Dev Server 启动流程：
   1. 启动 HTTP Server（O(1)）
   2. 浏览器请求时按需编译
   → 冷启动恒定快速
   ```

5. **依赖预构建（Dep Optimization）**
   - 第一次启动时，esbuild 预构建 `node_modules` 中的依赖
   - 将 ESM/CommonJS 统一转为 ESM
   - 将多个内部模块合并成少量模块（减少 HTTP 请求）
   - 结果缓存在 `node_modules/.vite`

### 🔍 追问链
1. **Vite 如何处理 CommonJS 依赖？**
   → 开发时通过 esbuild 预构建转为 ESM；生产时 Rollup 的 @rollup/plugin-commonjs
2. **Vite 的 HMR 和 Webpack 的 HMR 区别？**
   → Vite 利用 ESM 的动态 import，精确到模块级更新；WebSocket 只推送状态变更
3. **Vite 的环境变量是怎么注入的？**
   → 开发时通过拦截 import 替换；生产时通过 Rollup 的 define 插件

---

## Q24: Vite 的插件机制和 Webpack 的插件机制有何异同？
- **难度**：★★☆
- **知识点**：Vite / Webpack / 插件机制 / Rollup
- **题型**：对比分析题

### 参考答案要点：

1. **Vite 插件的双阶段设计**
   ```
   Vite Plugin = Rollup Plugin + Vite 特有钩子
   ```
   - **开发阶段**：可以使用 Vite 独有的钩子（`configResolved`、`configureServer`、`transformIndexHtml`）
   - **构建阶段**：兼容 Rollup 插件接口

2. **插件接口对比**
   ```javascript
   // Vite/Rollup 插件结构
   export default function myPlugin() {
     return {
       name: 'my-plugin',

       // Rollup 钩子（构建阶段生效）
       resolveId(id) {},
       load(id) {},
       transform(code, id) {},

       // Vite 独有钩子（开发阶段生效）
       config(config) {},              // 修改 Vite 配置
       configResolved(resolvedConfig) {},
       configureServer(server) {},      // 配置 dev server
       transformIndexHtml(html) {},     // 转换 HTML
     }
   }
   ```

3. **关键区别**
   | 维度 | Webpack Plugin | Vite Plugin |
   |------|---------------|-------------|
   | 接口 | Tapable 事件流 | Rollup 钩子 + Vite 钩子 |
   | 执行时机 | 编译全过程 | 开发/构建双阶段 |
   | 热更新 | 需自己处理 | 内置支持，插件只需关注 transform |
   | 生态 | 丰富的 Loader/Plugin | 兼容 Rollup 生态 + Vite 专属插件 |

4. **通用插件兼容性**
   - 很多 Rollup 插件可直接用于 Vite
   - Webpack 插件不能直接使用（需找 Vite 替代或重写）
   - 常见兼容插件：`@rollup/plugin-alias`、`@rollup/plugin-commonjs`、`rollup-plugin-postcss`

---

## Q25: Vite 与 Webpack 全面对比，在实际项目中应该如何选型？
- **难度**：★★☆
- **知识点**：Vite / Webpack / 构建工具选型
- **题型**：综合应用题

### 参考答案要点：

1. **核心指标对比**
   | 维度 | Webpack | Vite |
   |------|---------|------|
   | 冷启动速度 | 慢（项目越大越慢） | 快（恒定 < 1s） |
   | 热更新速度 | 较快（秒级） | 极快（毫秒级） |
   | 生产构建速度 | 中等 | 较快（Rollup + esbuild） |
   | 生态成熟度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
   | 配置灵活性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
   | 非 JS 资源处理 | Loader 丰富 | 插件生态成长中 |
   | SSR 支持 | 完善 | Vite SSR（较新） |
   | 大型遗留项目 | ✅ 成熟稳定 | ⚠️ 迁移成本 |

2. **选型建议**
   ```
   选 Vite：
   ✅ 新项目 / 技术栈较新
   ✅ 追求极致的开发体验（DX）
   ✅ 团队愿意接受相对新的生态
   ✅ 主要使用标准前端技术栈（Vue/React/Svelte）

   选 Webpack：
   ✅ 大型遗留项目（迁移成本高）
   ✅ 复杂的自定义构建流程
   ✅ 依赖大量 Webpack 专有 Loader/Plugin
   ✅ 企业级项目对稳定性要求极高
   ✅ 需要 Module Federation
   ```

3. **迁移路径**
   - 渐进式迁移：先用 Vite 开发新页面
   - 使用 `vite-plugin-commonjs` 兼容旧模块
   - 逐步替换 Webpack 专有配置

---

## Q26: esbuild、Rspack、Turbopack 这些新一代构建工具有什么特点？
- **难度**：★★☆
- **知识点**：构建工具 / esbuild / Rspack / Turbopack
- **题型**：对比分析题

### 参考答案要点：

1. **esbuild（JavaScript Bundler）**
   - **语言**：Go（非 JavaScript）
   - **特点**：极快的编译速度（比 Webpack 快 10-100x）
   - **定位**：作为 bundler 或被其他工具集成（Vite、Webpack5）
   - **局限**：插件生态不如 Webpack/Rollup 丰富；不支持 HMR
   - **适用**：预构建工具、简单项目的 bundler

2. **Rspack（由字节跳动开源）**
   - **语言**：Rust（基于 Webpack 架构重写）
   - **特点**：兼容 Webpack 配置（`rspack.config.js` 可直接用 webpack 配置）
   - **优势**：性能接近 esbuild，同时保持 Webpack 生态兼容
   - **亮点**：内置 CSS 支持、Module Federation（增强版）、SSR 支持
   - **适用**：想获得 Rust 级性能又不想放弃 Webpack 生态的项目

3. **Turbopack（由 Vercel 开发，Next.js 默认构建工具）**
   - **语言**：Rust（基于 Webpack 架构灵感）
   - **特点**：增量计算引擎（Incremental Computation Engine）
   - **优势**：针对 Next.js 深度优化，冷启动极快
   - **局限**：目前主要服务于 Next.js 生态
   - **适用**：Next.js 项目 / Vercel 平台用户

4. **选型总结**
   ```
   追求极致速度 + 简单需求     → esbuild
   Webpack 用户想无痛升级       → Rspack
   Next.js / Vercel 生态        → Turbopack
   稳定优先 / 复杂企业项目      → Webpack（成熟）
   开发体验优先                 → Vite（Rollup + esbuild）
   ```

### 🔍 追问链
1. **Rspack 如何做到兼容 Webpack 配置？**
   → 保持了相同的配置结构和 loader/plugin 接口，底层用 Rust 重写了编译引擎
2. **为什么 Go/Rust 写的工具比 JavaScript 快这么多？**
   → 原生多线程并行、无 GC 暂停、更好的内存管理、编译型语言优势
3. **这些工具在生产环境的稳定性如何？**
   → esbuild 已非常稳定；Rspack 在字节内部大规模使用；Turbopack 仍在快速迭代

---

## Q27: ESLint 的工作原理是什么？它是如何检测代码问题的？
- **难度**：★★☆
- **知识点**：ESLint / AST / 静态分析 / 代码质量
- **题型**：简答题

### 参考答案要点：

1. **整体流程**
   ```
   源代码 → 解析（Parser） → AST（抽象语法树）
   → 遍历（Traversal） → 匹配规则（Rules）
   → 报告问题（Report）
   ```

2. **核心步骤详解**

   **Step 1：解析源码为 AST**
   - 默认使用 Esp parser（基于 Acorn）
   - TypeScript 项目使用 `@typescript-eslint/parser`
   ```javascript
   // 解析结果示例
   {
     type: 'Program',
     body: [{
       type: 'VariableDeclaration',
       declarations: [{
         type: 'VariableDeclarator',
         id: { type: 'Identifier', name: 'foo' },
         init: { type: 'Literal', value: 42 }
       }]
     }]
   }
   ```

   **Step 2：深度优先遍历 AST**
   - 使用 `estraverse` 遍历树节点
   - 进入节点时触发 `enter` 回调，离开时触发 `exit` 回调
   - 每个 Rule 定义了自己关注的 AST 节点类型

   **Step 3：Rule 匹配与报告**
   ```javascript
   // no-unused-vars 规则简化版
   module.exports = {
     meta: { type: 'problem' },
     create(context) {
       return {
         // 关注 VariableDeclaration 节点
         VariableDeclaration(node) {
           node.declarations.forEach(decl => {
             if (!isVariableUsed(decl.id.name)) {
               context.report({
                 node: decl.id,
                 message: "'{{name}}' is defined but never used.",
                 data: { name: decl.id.name }
               })
             }
           })
         }
       }
     }
   }
   ```

3. **AST 节点类型示例**
   ```
   const x = 1              → VariableDeclaration
   function foo() {}        → FunctionDeclaration
   import { a } from 'b'    → ImportDeclaration
   class Foo {}             → ClassDeclaration
   if (true) {}             → IfStatement
   ```

4. **自动修复（--fix）**
   - Rule 可定义 `fix` 函数，返回修复动作（insert / replace / remove）
   - ESLint 应用修复后重新检查，确保不引入新问题

### 🔍 追问链
1. **ESLint 的 Parser 和 Plugin 的区别？**
   → Parser 负责生成 AST（支持不同语法）；Plugin 提供 Rules 和配置
2. **如何编写自定义 ESLint Rule？**
   → 导出包含 meta 和 create 函数的对象，create 返回 AST 访问者
3. **ESLint 和 TypeScript 的类型检查能互相替代吗？**
   → 不能。ESLint 做代码风格和质量检查；TS 做类型推断。两者互补

---

## Q28: PostCSS 是什么？它与 Sass/Less 有什么关系？常见插件有哪些？
- **难度**：★★☆
- **知识点**：PostCSS / CSS 工程化 / CSS 处理
- **题型**：简答题

### 参考答案要点：

1. **PostCSS 定位**
   - 用 JavaScript 转换 CSS 的工具（类似 Babel 对于 JS）
   - 本身不做任何事，全靠插件生态
   - 广泛应用于 Vite、Webpack、Create React App 等脚手架

2. **与 Sass/Less 的关系**
   ```
   Sass/Less：CSS 预处理器（添加新语法：变量、嵌套、mixin）
   PostCSS：CSS 后处理器（转换现有 CSS：自动补全前缀、未来语法）
   → 它们是互补关系，可以同时使用
   ```

3. **典型工作流**
   ```
   .scss 源文件
   ↓ Sass 编译
   .css 文件
   ↓ PostCSS 插件链处理
   ↓ autoprefixer（自动加前缀）
   ↓ postcss-preset-env（使用未来语法）
   ↓ cssnano（压缩优化）
   最终 .css
   ```

4. **必备插件**
   | 插件 | 功能 |
   |------|------|
   | `autoprefixer` | 根据 caniuse 自动添加浏览器前缀 |
   | `postcss-preset-env` | 允许使用最新 CSS 语法（nesting、custom media 等） |
   | `cssnano` | 压缩和优化 CSS（类似 Terser for JS） |
   | `postcss-rtl` | 自动生成 RTL（从右到左）样式 |
   | `tailwindcss` | 原子化 CSS 框架（本质是 PostCSS 插件） |

5. **配置示例**
   ```javascript
   // postcss.config.js
   module.exports = {
     plugins: [
       require('tailwindcss'),
       require('autoprefixer'),
       process.env.NODE_ENV === 'production' && require('cssnano')
     ].filter(Boolean)
   }
   ```

---

## Q29: Tailwind CSS 的原理是什么？它的优劣势分别是什么？
- **难度**：★★☆
- **知识点**：Tailwind CSS / 原子化 CSS / CSS 工程化
- **题型**：简答题

### 参考答案要点：

1. **核心原理**
   - 本质是一个 PostCSS 插件 + JIT（Just-In-Time）编译器
   - 扫描源码中使用到的 utility class 名
   - 按需生成对应的 CSS 规则（而非生成全部）
   - 通过 `@tailwind` 指令注入 base/components/utilities 三层样式

2. **工作流程**
   ```
   HTML/JSX 中写入 className="flex items-center p-4"
   ↓
   JIT 编译器扫描到这些 class 名称
   ↓
   生成对应的 CSS 规则：
   .flex { display: flex; }
   .items-center { align-items: center; }
   .p-4 { padding: 1rem; }
   ↓
   PurgeCSS 移除未使用的样式（或 JIT 直接按需生成）
   ```

3. **优势**
   - **无需切换上下文**：不用在 HTML 和 CSS 文件间来回跳转
   - **设计约束**：强制使用设计 token，保证视觉一致性
   - **产物更小**：JIT 模式只生成用到的 CSS
   - **响应式简单**：`md:flex lg:hidden` 一行搞定
   - **无 CSS 优先级烦恼**：每个 class 权重相同

4. **劣势**
   - **HTML 冗长**：className 可能很长，影响可读性
   - **学习曲线**：需要记忆大量 utility class
   - **语义化缺失**：class 名描述外观而非意图
   - **调试困难**：DevTools 中看到一堆 utility class
   - **团队接受度**：与传统 CSS 写法差异大

5. **缓解措施**
   - 使用 `@apply` 抽取复用样式
   - 结合组件库封装常用模式
   - 使用 IDE 插件（Tailwind CSS IntelliSense）

---

## Q30: Git 中 Merge、Rebase、Squash Merge 分别适用于什么场景？
- **难度**：★★☆
- **知识点**：Git / 版本控制 / 协作流程
- **题型**：对比分析题

### 参考答案要点：

1. **Merge（合并）**
   ```bash
   git merge feature-branch
   ```
   - 创建一个新的 merge commit，保留完整历史
   - **适用**：希望保留分支历史记录、公开分支合并
   - **优点**：历史真实、安全（可回退）
   - **缺点**：历史线可能变得杂乱（菱形合并）

2. **Rebase（变基）**
   ```bash
   git rebase main
   ```
   - 将分支的 commit"移动"到 main 最新位置
   - 重写 commit 历史（线性、整洁）
   - **适用**：清理本地 commit、保持历史线性
   - **优点**：历史干净、易于 code review
   - **缺点**：**切勿对已推送的公共分支 rebase**（会改写历史）

3. **Squash Merge（压缩合并）**
   - GitHub/GitLab GUI 操作：合并时选择"Squash and merge"
   - 将分支的所有 commit 压缩成一个
   - **适用**：功能分支已完成、不需要保留中间提交细节
   - **优点**：main 分支历史极度简洁
   - **缺点**：丢失详细的开发过程信息

4. **选择指南**
   ```
   个人本地整理 commit    → Rebase
   合并功能分支到 main     → Merge（保留历史）或 Squash（简洁优先）
   公共分支 / 团队协作     → Merge（安全第一）
   Pull Request 合并       → Squash Merge（推荐，保持 main 干净）
   紧急修复合入 main       → Merge（快速、不折腾历史）
   ```

### 🔍 追问链
1. **Rebase 导致冲突了怎么办？**
   → 逐个解决每个 commit 的冲突，`git rebase --continue` 继续
2. **如何撤销一次错误的 Rebase？**
   → `git reflog` 找到 rebase 前的 HEAD，`git reset --hard` 回去
3. **Interactive Rebase (`git rebase -i`) 的常见用途？**
   → 合并 commit、修改 commit message、 reorder commits、删除 commit

---

## Q31: 如何设计一套完整的前端 CI/CD 流水线？请画出流程并说明关键环节。
- **难度**：★★☆
- **知识点**：CI/CD / DevOps / 自动化部署 / GitHub Actions
- **题型**：方案设计题

### 参考答案要点：

1. **典型流水线设计**
   ```
   ┌─────────────────────────────────────────────────────┐
   │                   CI/CD Pipeline                      │
   ├─────────────────────────────────────────────────────┤
   │                                                      │
   │  Code Push                                           │
   │     ↓                                                │
   │  ┌─────────┐                                         │
   │  │ Lint &  │  ← ESLint / Prettier / Stylelint        │
   │  │ Format  │                                         │
   │  └────┬────┘                                         │
   │       ↓                                              │
   │  ┌─────────┐                                         │
   │  │  Unit   │  ← Jest / Vitest / Testing Library      │
   │  │  Test   │                                         │
   │  └────┬────┘                                         │
   │       ↓                                              │
   │  ┌─────────┐                                         │
   │  │  Build  │  ← Webpack / Vite / Rspack              │
   │  └────┬────┘                                         │
   │       ↓                                              │
   │  ┌─────────┐    ┌──────────┐                         │
   │  │ E2E Test│ →  │ Deploy   │  ← S3 / CDN / Docker   │
   │  │ (可选)  │    │ to Stag  │                         │
   │  └─────────┘    └─────┬────┘                         │
   │                        ↓                             │
   │                 ┌──────────┐                         │
   │                 │ Smoke    │  ← 基础冒烟测试          │
   │                 │ Test     │                         │
   │                 └─────┬────┘                         │
   │                       ↓                             │
   │                 ┌──────────┐                         │
   │                 │ Deploy   │  ← 生产环境              │
   │                 │ to Prod  │                         │
   │                 └──────────┘                         │
   │                                                      │
   └─────────────────────────────────────────────────────┘
   ```

2. **关键环节详解**

   **Lint 阶段**
   - 确保代码符合团队规范
   - 使用 `--max-warnings=0` 强制零警告

   **测试阶段**
   - 单元测试：覆盖核心工具函数、hooks、纯逻辑
   - 覆盖率阈值：`coverageThreshold: { global: { branches: 80 } }`

   **构建阶段**
   - 使用缓存加速（GitHub Actions Cache / Turborepo Remote Cache）
   - 构建产物上传 Artifacts 供后续阶段使用

   **部署策略**
   - **Staging**：每次 PR/merge 到 develop 自动部署
   - **Production**：
     - 主干开发：merge to main 自动部署
     - Git Flow：打 tag 触发部署
     - 蓝绿部署 / 金丝雀发布（降低风险）

3. **GitHub Actions 实现示例**
   ```yaml
   name: CI/CD Pipeline
   on:
     push:
       branches: [main, develop]
     pull_request:
       branches: [main]

   jobs:
     test-and-build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'

         - run: npm ci
         - run: npm run lint
         - run: npm run test:ci
         - run: npm run build

     deploy:
       needs: test-and-build
       if: github.ref == 'refs/heads/main'
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: npm ci && npm run build
         - name: Deploy to S3
           run: aws s3 sync ./dist s3://my-bucket --delete
   ```

4. **环境管理**
   ```
   development:  本地开发（dotenv）
   staging:       测试环境（CI 注入 secrets）
   production:    生产环境（CI 注入 secrets + 灰度策略）
   ```

---

## Q32: pnpm workspace 的工作原理是什么？如何配置和使用？
- **难度**：★★☆
- **知识点**：Monorepo / pnpm / workspace / 包管理
- **题型**：简答题

### 参考答案要点：

1. **workspace 声明**
   ```json
   // 根目录 package.json
   {
     "name": "my-monorepo",
     "private": true,
     "workspaces": [
       "packages/*",     // packages 下的所有子目录
       "apps/*",         // apps 下的所有子目录
       "docs"            // 单个目录
     ]
   }
   ```

2. **workspace 协议引用**
   ```json
   // packages/ui/package.json
   {
     "dependencies": {
       "@repo/shared-utils": "workspace:*",    // 引用 workspace 内的包
       "react": "^18.0.0"                       // 外部依赖正常声明
     }
   }
   ```
   - `workspace:*`：使用 workspace 中的版本（软链接）
   - `workspace:^`：兼容同主版本
   - `workspace:~`：兼容同次版本

3. **工作原理**
   - pnpm 在安装时识别 `workspaces` 字段
   - 为每个 workspace 包建立符号链接到根 `node_modules/.pnpm`
   - workspace 包之间通过符号链接相互引用
   - 外部依赖仍然使用 pnpm 的内容寻址存储

4. **常用命令**
   ```bash
   pnpm install                    # 安装所有 workspace 的依赖
   pnpm --filter @repo/ui build   # 只构建 ui 包
   pnpm --filter "...[DEPS]" test # 测试依赖了变更包的所有包
   pnpm -r run build              # 按拓扑顺序构建所有包
   ```

5. **目录结构示例**
   ```
   my-monorepo/
   ├── package.json          # 根 package.json（workspaces 声明）
   ├── pnpm-workspace.yaml   # 或使用 yaml 格式声明
   ├── packages/
   │   ├── ui/               # @repo/ui
   │   ├── shared/           # @repo/shared-utils
   │   └── config/           # @repo/config
   ├── apps/
   │   ├── web/              # Web 应用
   │   └── admin/            # Admin 应用
   └── docs/                 # 文档站
   ```

### 🔍 追问链
1. **pnpm workspace 和 yarn workspace 的区别？**
   → 核心区别在于 node_modules 结构：pnpm 严格无幽灵依赖；yarn 仍有提升
2. **workspace 包如何发布到 npm？**
   → `pnpm publish` 时自动将 `workspace:*` 替换为实际版本号
3. **如何处理 workspace 包之间的循环依赖？**
   → 设计上应避免；必要时提取共享层或重构依赖方向

---

## Q33: Turborepo 的核心功能是什么？它的缓存机制是如何工作的？
- **难度**：★★☆
- **知识点**：Monorepo / Turborepo / 缓存 / 构建优化
- **题型**：简答题

### 参考答案要点：

1. **核心功能**
   - **任务编排**：定义包之间的任务依赖关系
   - **增量构建**：只构建受影响的包及其下游
   - **远程缓存**：团队共享构建缓存（Turborepo Remote Cache）
   - **并行执行**：最大化利用 CPU 并行执行无依赖关系的任务

2. **配置示例**
   ```javascript
   // turbo.json
   {
     "$schema": "https://turbo.build/schema.json",
     "pipeline": {
       build: {
         dependsOn: ['^build'],    // 依赖上游包的 build 先完成
         outputs: ['dist/**']      // 声明输出文件（用于缓存判定）
       },
       test: {
         dependsOn: ['build'],     // 依赖自身 build 完成
         outputs: []                # 无输出文件（不缓存）
       },
       lint: {
         outputs: []               # 无输出文件
       }
     }
   }
   ```

3. **缓存机制工作原理**
   ```
   Task Execution:
   1. 计算 task 的 hash（源码 + 依赖 + 环境变量 + 配置）
   2. 查询本地缓存（.turbo/cache）→ 命中则直接恢复输出
   3. 未命中 → 查询远程缓存（Turborepo Cloud / 自建）
   4. 都未命中 → 执行任务 → 缓存结果
   ```

   - **Hash 计算**：综合考虑源码内容、依赖版本、环境变量、命令参数
   - **缓存命中条件**：所有输入 hash 完全一致
   - **远程缓存**：团队成员共享，一人构建全员受益

4. **实际效果**
   ```
   场景：Monorepo 有 10 个包，只改了 1 个包的源码

   无 Turborepo：构建全部 10 个包 = 120s
   有 Turborepo：
     - 受影响包：1 个重新构建 = 15s
     - 其余 9 个：缓存命中 ≈ 0.5s
     - 总计：≈ 16s（提速 7.5x）
   ```

5. **Remote Cache 配置**
   ```bash
   npx turbo login
   npx turbo link   # 连接远程缓存
   # 之后 turbo run build 自动使用远程缓存
   ```

---

## Q34: CSS-in-JS 方案（styled-components / emotion）的原理和优劣？
- **难度**：★★☆
- **知识点**：CSS-in-JS / styled-components / emotion / CSS 工程化
- **题型**：对比分析题

### 参考答案要点：

1. **核心原理**
   - 在 JavaScript 运行时动态生成 CSS
   - 将样式与组件绑定在一起（Co-location）
   - 运行时插入 `<style>` 标签或使用 CSSOM API

2. **styled-components 工作流程**
   ```jsx
   import styled from 'styled-components'

   const Button = styled.button`
     background: ${props => props.primary ? 'blue' : 'gray'};
     padding: 10px;
   `
   // 运行时：
   // 1. 解析模板字符串
   // 2. 生成唯一 class 名（hash）
   // 3. 创建 <style> 标签插入 DOM
   // 4. 返回带 className 的 React 组件
   ```

3. **优势**
   - **样式隔离**：自动生成唯一 class 名，零冲突
   - **动态样式**：基于 props 动态生成样式（主题切换利器）
   - **Scoped by Default**：无需担心全局污染
   - **消除 dead CSS**：组件卸载时样式自动移除
   - **SSR 支持**：可提取关键 CSS

4. **劣势**
   - **运行时开销**：每次渲染都可能计算和注入样式
   - **包体积**：运行时约 13-15KB（gzipped）
   - **首屏性能**：SSR 场景需要额外的样式收集步骤
   - **调试困难**：生成的 class 名无语义
   - **React Strict Mode**：可能导致双重渲染问题

5. **性能优化方案**
   - 使用 `babel-plugin-styled-components` 预计算 displayName 和 class 名
   - 使用 `StyleSheetManager` 批量注入
   - 考虑 `@emotion/react` 的 `css` prop（更轻量）
   - 迁移至编译时方案（如 linaria、vanilla-extract）

6. **趋势**
   ```
   2020-2022: CSS-in-JS 流行期
   2023+:      运行时方案受质疑，转向：
               - Tailwind CSS（原子化）
               - CSS Modules（编译时）
               - Vanilla Extract（编译时 CSS-in-JS）
   ```

### 🔍 追问链
1. **CSS-in-JS 的 SSR 问题具体是什么？**
   → 需要在服务端收集样式、注入 HTML，客户端 hydration 时再次注入（可能闪烁）
2. **Runtime CSS-in-JS vs Compile-time CSS-in-JS 的区别？**
   → Runtime：styled-components/emotion；Compile-time：linaria/vanilla-extract（零运行时）
3. **React 19 的 CSS Support 对 CSS-in-JS 的影响？**
   → React 19 内置了 CSS 编译支持，可能减少对第三方 CSS-in-JS 库的需求

---

## Q35: 如何在前端项目中落地一套完整的代码规范体系？
- **难度**：★★☆
- **知识点**：代码规范 / 工程化实践 / 团队协作
- **题型**：方案设计题

### 参考答案要点：

1. **规范体系分层**
   ```
   Layer 1: EditorConfig（编辑器统一）
   ↓
   Layer 2: Prettier（格式化 - 自动修复）
   ↓
   Layer 3: ESLint（代码质量 - 自动修复 + 手动修复）
   ↓
   Layer 4: Stylelint（CSS/SCSS 规范）
   ↓
   Layer 5: Commitlint（提交规范）
   ↓
   Layer 6: Husky + lint-staged（自动化门禁）
   ```

2. **各层配置要点**

   **EditorConfig**（`.editorconfig`）
   ```ini
   root = true
   [*]
   indent_style = space
   indent_size = 2
   end_of_line = lf
   charset = utf-8
   trim_trailing_whitespace = true
   insert_final_newline = true

   [*.md]
   trim_trailing_whitespace = false
   ```

   **Prettier**（`.prettierrc`）
   ```json
   {
     "semi": false,
     "singleQuote": true,
     "trailingComma": "all",
     "printWidth": 100,
     "tabWidth": 2
   }
   ```

   **ESLint**（`.eslintrc.js`）
   ```javascript
   module.exports = {
     extends: [
       'eslint:recommended',
       'plugin:@typescript-eslint/recommended',
       'plugin:prettier/recommended',  // 关键：让 Prettier 管理 format
       'plugin:react/recommended',
       'plugin:react-hooks/recommended',
     ],
     rules: {
       'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
       '@typescript-eslint/no-explicit-any': 'warn',
       'react-hooks/exhaustive-deps': 'warn',
     }
   }
   ```

3. **自动化门禁（Husky + lint-staged）**
   ```json
   // package.json
   "lint-staged": {
     "*.{js,jsx,ts,tsx}": [
       "eslint --fix",
       "prettier --write"
     ],
     "*.{css,scss,less}": [
       "stylelint --fix",
       "prettier --write"
     ],
     "*.{md,json}": [
       "prettier --write"
     ]
   }
   ```

4. **落地推广策略**
   - **第一步**：创建规范配置包（如 `@company/eslint-config`）
   - **第二步**：文档化（规范手册 + FAQ）
   - **第三步**：CI 强制（PR 必须 lint 通过才能合并）
   - **第四步**：IDE 配置分享（Workspace Settings）
   - **第五步**：Code Review 作为补充（人工把关 edge case）

5. **常见坑与解决方案**
   - Prettier 和 ESLint 冲突 → `eslint-config-prettier`
   - 新人忘记配置 → 脚手架模板自带配置 + `prepare` script
   - 规则太严影响效率 → 逐步收紧，先用 warn 再改 error
   - 跨项目不一致 → 抽取共享配置包

---

# 第三部分：专家层（★★★）— 架构设计与手写实现

> **说明**：本部分共 15 题，涉及源码级理解、架构设计、手写实现核心算法。适合 5+ 年经验的前端工程师 / Tech Lead。

---

## Q36: 【手写实现】请手写一个简易的 JavaScript Bundle 函数，模拟 Webpack 的打包过程。
- **难度**：★★★
- **知识点**：Webpack / 模块打包 / 依赖图 / 手写实现
- **题型**：编程实践题

### 参考答案要点：

1. **核心思路**
   - 解析模块依赖关系，构建依赖图（Module Graph）
   - 将所有模块包装成函数，放入一个闭包中
   - 实现 `require` 函数，支持模块间的引用
   - 从入口模块开始执行

2. **完整实现**
```javascript
/**
 * 简易 Bundle 函数 - 模拟 Webpack 打包核心逻辑
 *
 * 核心原理：
 * 1. 从入口文件开始，递归分析所有依赖（import/require）
 * 2. 构建模块依赖图（Module Graph）
 * 3. 将所有模块包装成函数，放入闭包
 * 4. 实现 require 机制，支持循环引用
 */

const fs = require('fs')
const path = require('path')

// ========== Step 1: 模块解析器 ==========
function createModuleResolver(rootDir) {
  const moduleCache = new Map()

  /**
   * 解析单个模块
   * @param {string} modulePath - 模块绝对路径
   * @returns {Object} 模块信息 { id, dependencies, code }
   */
  function resolveModule(modulePath) {
    // 绝对路径规范化
    const absolutePath = path.resolve(rootDir, modulePath)

    // 缓存命中直接返回
    if (moduleCache.has(absolutePath)) {
      return moduleCache.get(absolutePath)
    }

    // 读取文件内容
    const code = fs.readFileSync(absolutePath, 'utf-8')

    // 简单的依赖提取（匹配 require/import 语句）
    // 正则匹配: require('./xxx') 或 import xxx from './xxx'
    const depRegex = /(?:require\s*\(\s*['"]([^'"]+)['"]\s*\)|from\s*['"]([^'"]+)['"])/g
    const dependencies = []
    let match

    while ((match = depRegex.exec(code)) !== null) {
      const depPath = match[1] || match[2]
      // 跳过 node_modules 和内置模块
      if (!depPath.startsWith('.') && !depPath.startsWith('@')) continue
      // 转换为相对于当前文件的路径
      const resolvedDep = path.resolve(path.dirname(absolutePath), depPath)
      dependencies.push(resolvedDep)
    }

    const moduleInfo = {
      id: absolutePath,
      dependencies,
      code,
    }

    moduleCache.set(absolutePath, moduleInfo)
    return moduleInfo
  }

  return { resolveModule }
}

// ========== Step 2: 依赖图构建 ==========
/**
 * 从入口文件开始，递归构建完整的模块依赖图
 * @param {string} entry - 入口文件路径
 * @param {Function} resolver - 模块解析器
 * @returns {Map} 模块图 { moduleId: moduleInfo }
 */
function buildDependencyGraph(entry, resolver) {
  const graph = new Map()
  const queue = [entry]

  while (queue.length > 0) {
    const currentPath = queue.shift()

    // 已处理则跳过（防止循环依赖导致的无限递归）
    if (graph.has(currentPath)) continue

    const moduleInfo = resolver.resolveModule(currentPath)
    graph.set(currentPath, moduleInfo)

    // 将依赖加入队列继续处理
    for (const dep of moduleInfo.dependencies) {
      if (!graph.has(dep)) {
        queue.push(dep)
      }
    }
  }

  return graph
}

// ========== Step 3: 代码生成（Bundle） ==========
/**
 * 生成最终的 bundle 代码
 * @param {Map} graph - 模块依赖图
 * @param {string} entryId - 入口模块 ID
 * @returns {string} 可执行的 bundle 字符串
 */
function generateBundle(graph, entryId) {
  let modules = ''

  // 将每个模块包装成函数
  for (const [moduleId, moduleInfo] of graph) {
    // 转换 require 路径为模块 ID 映射
    let transformedCode = moduleInfo.code

    // 简单的 require 替换为 __webpack_require__
    transformedCode = transformedCode.replace(
      /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
      (match, depPath) => {
        const resolvedDep = path.resolve(path.dirname(moduleId), depPath)
        return `__webpack_require__("${resolvedDep}")`
      }
    )

    modules += `  "${moduleId}": function(module, exports, __webpack_require__) {\n`
    modules += `    ${transformedCode}\n`
    modules += `  },\n`
  }

  // 生成 IIFE（立即执行函数）包裹的 bundle
  return `
(function(modules) {
  // 模块缓存
  var installedModules = {};

  // Webpack require 函数
  function __webpack_require__(moduleId) {
    // 检查缓存
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }

    // 创建新模块并放入缓存
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // 执行模块函数
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );

    // 标记模块已加载
    module.l = true;

    return module.exports;
  }

  // 暴露入口模块
  return __webpack_require__("${entryId}");

})({
${modules}
});
`.trim()
}

// ========== Step 4: 主函数 ==========
/**
 * 简易 Webpack 打包函数
 * @param {Object} options - 配置选项
 * @param {string} options.entry - 入口文件路径
 * @param {string} options.output - 输出文件路径
 * @param {string} options.context - 项目根目录
 */
function simpleWebpack(options) {
  const { entry, output, context = process.cwd() } = options

  console.log(`📦 Starting bundle...`)
  console.log(`   Entry: ${entry}`)

  // 1. 创建模块解析器
  const resolver = createModuleResolver(context)

  // 2. 解析入口模块
  const entryPath = path.resolve(context, entry)

  // 3. 构建依赖图
  console.log(`📊 Building dependency graph...`)
  const graph = buildDependencyGraph(entryPath, resolver)
  console.log(`   Found ${graph.size} modules`)

  // 4. 生成 bundle 代码
  console.log(`🔨 Generating bundle...`)
  const bundleCode = generateBundle(graph, entryPath)

  // 5. 写入输出文件
  const outputPath = path.resolve(context, output)
  fs.writeFileSync(outputPath, bundleCode, 'utf-8')
  console.log(`✅ Bundle written to ${outputPath}`)
  console.log(`   Size: ${(bundleCode.length / 1024).toFixed(2)} KB`)
}

// ========== 使用示例 ==========
// simpleWebpack({
//   entry: './src/index.js',
//   output: './dist/bundle.js',
//   context: __dirname
// })

module.exports = { simpleWebpack, buildDependencyGraph, generateBundle }
```

3. **实现要点说明**
   - **模块包装**：每个模块被包装成 `(module, exports, require) => { ... }` 函数
   - **缓存机制**：`installedModules` 防止重复执行，也是处理循环依赖的关键
   - **依赖图遍历**：BFS（广度优先）确保按正确顺序处理模块
   - **路径解析**：将相对路径转为绝对路径作为模块唯一标识

### 🔍 追问链
1. **如何支持 ES Module 的 export 语法？**
   → 在代码转换阶段将 `export default` 转为 `module.exports`，具名导出挂载到 `exports`
2. **如何实现 Code Splitting（代码分割）？**
   → 识别动态 `import()`，将其拆分为异步 chunk，生成 JSONP 加载逻辑
3. **如何处理循环依赖？**
   → 当前实现已处理：模块先注册到缓存（exports 为空对象），执行时拿到的是引用（可能还未填充完毕）

---

## Q37: 【手写实现】请手写一个简易的文件监听 + HMR（热更新）服务。
- **难度**：★★★
- **知识点**：HMR / 文件监听 / WebSocket / Node.js / 手写实现
- **题型**：编程实践题

### 参考答案要点：

1. **核心思路**
   - 使用 Node.js `fs.watch` 监听文件变化
   - 使用 `chokidar`（更可靠）替代原生 `watch`
   - 启动 HTTP 服务器提供文件访问
   - 建立 WebSocket 连接推送更新通知给浏览器
   - 浏览器端接收通知后，使用动态 `import()` 热更新模块

2. **完整实现**
```javascript
/**
 * 简易 HMR（Hot Module Replacement）开发服务器
 *
 * 核心组件：
 * 1. File Watcher - 监听文件变化
 * 2. HTTP Server - 提供静态文件服务 + ESM 转换
 * 3. WebSocket Server - 推送 HMR 更新通知
 * 4. Client Runtime - 浏览器端接收并执行热更新
 */

const http = require('http')
const fs = require('fs')
const path = require('path')
const { WebSocketServer } = require('ws')  // 需安装 ws 库
const chokidar = require('chokidar')        // 需安装 chokidar

// ==================== 配置 ====================
const CONFIG = {
  port: 3000,              // 开发服务器端口
  wsPort: 3001,            // WebSocket 端口
  rootDir: process.cwd(),  // 项目根目录
  hmrPath: '/__hmr__',     // HMR 客户端脚本路径
}

// ==================== HMR 客户端运行时代码 ====================
/**
 * 这段代码会被注入到每个 HTML 页面中
 * 负责与服务器建立 WebSocket 连接并处理热更新
 */
const HMRRuntimeScript = `
(function() {
  'use strict';

  // 当前已加载的模块及其 accept 回调
  const hotModules = new Map();
  let socket = null;
  let reconnectTimer = null;

  // ====== WebSocket 连接管理 ======
  function connect() {
    socket = new WebSocket('ws://localhost:${CONFIG.wsPort}');

    socket.addEventListener('open', () => {
      console.log('[HMR] Connected to dev server');
      clearTimeout(reconnectTimer);
    });

    socket.addEventListener('message', async (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'update':
          await handleUpdate(data.modules);
          break;
        case 'full-reload':
          console.log('[HMR] Full page reload');
          window.location.reload();
          break;
        case 'error':
          console.error('[HMR]', data.error);
          break;
      }
    });

    socket.addEventListener('close', () => {
      console.log('[HMR] Disconnected, reconnecting...');
      reconnectTimer = setTimeout(connect, 2000);
    });
  }

  // ====== HMR API（暴露给用户代码使用）=====
  const hot = {
    // 注册模块的热更新回调
    accept(dependencies, callback) {
      if (typeof dependencies === 'function') {
        callback = dependencies;
        dependencies = null;
      }

      // 获取当前正在执行的模块路径
      const currentModule = getCurrentModuleName();
      hotModules.set(currentModule, { dependencies, callback });
      console.log(\`[HMR] Hot update accepted for: \${currentModule}\`);
    },

    // 模块被 dispose 时的清理回调
    dispose(callback) {
      const currentModule = getCurrentModuleName();
      const mod = hotModules.get(currentModule);
      if (mod) mod.dispose = callback;
    }
  };

  // 将 hot API 挂载到全局（模拟 Webpack 的 module.hot）
  window.__hmr_hot__ = hot;

  // ====== 处理热更新 ======
  async function handleUpdate(changedModules) {
    console.log(\`[HMR] Modules updated: \${changedModules.join(', ')}\`);

    // Phase 1: 执行 dispose 回调（清理旧模块的副作用）
    for (const modPath of changedModules) {
      const mod = hotModules.get(modPath);
      if (mod?.dispose) {
        mod.dispose();
      }
    }

    // Phase 2: 重新加载变更的模块
    const newModules = {};
    for (const modPath of changedModules) {
      try {
        // 使用动态 import 重新加载模块
        const timestamp = Date.now();
        const newMod = await import(modPath + '?t=' + timestamp);
        newModules[modPath] = newMod;
      } catch (e) {
        console.error(\`[HMR] Failed to reload \${modPath}:\`, e);
        // 加载失败，回退到整页刷新
        window.location.reload();
        return;
      }
    }

    // Phase 3: 执行 accept 回调（让应用自行处理更新）
    for (const modPath of changedModules) {
      const mod = hotModules.get(modPath);
      if (mod?.callback) {
        try {
          mod.callback(newModules[modPath]);
          console.log(\`[HMR] ✓ \${modPath} updated successfully\`);
        } catch (e) {
          console.error(\`[HMR] Error in accept callback for \${modPath}:\`, e);
          window.location.reload();
        }
      }
    }
  }

  // ====== 辅助函数 ======
  function getCurrentModuleName() {
    // 简化实现：通过 document.currentScript 或 stack trace 获取
    // 实际 Vite/Webpack 通过 inject 的模块 ID 传递
    if (document.currentScript) {
      return document.currentScript.src.split('?')[0];
    }
    return 'unknown';
  }

  // 启动连接
  connect();
})();
`

// ==================== HTTP 服务器 ====================
/**
 * 创建开发用 HTTP 服务器
 * - 提供静态文件服务
 * - 将 ESM 的裸模块名转换为完整路径
 * - 注入 HMR 客户端脚本
 */
function createDevServer() {
  return http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0]

    // HMR 客户端脚本请求
    if (urlPath === CONFIG.hmrPath) {
      res.setHeader('Content-Type', 'application/javascript')
      res.end(HMRRuntimeScript)
      return
    }

    // 解析文件路径
    const filePath = path.join(CONFIG.rootDir, urlPath === '/' ? '/index.html' : urlPath)

    // 读取文件
    fs.readFile(filePath, 'utf-8', (err, content) => {
      if (err) {
        res.statusCode = 404
        res.end('Not Found')
        return
      }

      // 如果是 HTML，注入 HMR 客户端脚本
      if (filePath.endsWith('.html')) {
        const injectScript = `<script src="${CONFIG.hmrPath}"></script>`
        content = content.replace('</head>', `${injectScript}</head>`)

        res.setHeader('Content-Type', 'text/html')
      } else if (filePath.endsWith('.js')) {
        // 简单的 ESM 裸模块名转换
        // 将 import xxx from 'xxx' 中的裸模块名转为 node_modules 路径
        content = transformEsmImports(content)
        res.setHeader('Content-Type', 'application/javascript')
      } else if (filePath.endsWith('.css')) {
        // 将 CSS 转为 JS（以便 HMR 更新）
        content = `
const style = document.createElement('style');
style.textContent = \`${escapeForTemplateLiteral(content)}\`;
document.head.appendChild(style);
export default style;
`
        res.setHeader('Content-Type', 'application/javascript')
      }

      res.end(content)
    })
  })
}

/**
 * 简单的 ESM import 路径转换
 * 将裸模块名（如 'react'）转为相对路径
 */
function transformEsmImports(code) {
  // 匹配 import 语句中的裸模块名
  return code.replace(
    /from\s*['"]([^'"][^./][^'"]*)['"]/g,
    (match, moduleName) => {
      // 尝试查找 node_modules 中的文件
      const nodeModulesPath = path.join(CONFIG.rootDir, 'node_modules', moduleName)
      if (fs.existsSync(nodeModulesPath + '.js')) {
        return `from '/node_modules/${moduleName}.js'`
      }
      if (fs.existsSync(path.join(nodeModulesPath, 'index.js'))) {
        return `from '/node_modules/${moduleName}/index.js'`
      }
      return match  // 找不到就保持原样
    }
  )
}

/**
 * 转义字符串中的特殊字符，用于模板字面量
 */
function escapeForTemplateLiteral(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')
}

// ==================== 文件监听器 ====================
/**
 * 使用 chokidar 监听文件变化
 * 比原生 fs.watch 更可靠（跨平台、减少误报）
 */
function createFileWatcher(wsServer) {
  const watcher = chokidar.watch(CONFIG.rootDir, {
    ignored: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**',
      '*.log',
    ],
    ignoreInitial: true,  // 忽略初始扫描
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 100,  // 文件写入稳定后再触发（防抖）
      pollInterval: 10,
    },
  })

  // 文件变更事件
  watcher.on('change', (filePath) => {
    console.log(`📝 File changed: ${filePath}`)

    // 获取相对于项目根目录的路径
    const relativePath = path.relative(CONFIG.rootDir, filePath)

    // 向所有连接的客户端推送更新
    broadcastUpdate(wsServer, [relativePath])
  })

  // 文件新增事件
  watcher.on('add', (filePath) => {
    console.log(`➕ File added: ${filePath}`)
    const relativePath = path.relative(CONFIG.rootDir, filePath)
    broadcastUpdate(wsServer, [relativePath])
  })

  return watcher
}

/**
 * 向所有 WebSocket 客户端广播更新消息
 */
function broadcastUpdate(wsServer, changedModules) {
  const message = JSON.stringify({
    type: 'update',
    modules: changedModules,
    timestamp: Date.now(),
  })

  wsServer.clients.forEach(client => {
    if (client.readyState === 1) {  // WebSocket.OPEN
      client.send(message)
    }
  })
}

// ==================== WebSocket 服务器 ====================
/**
 * 创建 WebSocket 服务器，用于 HMR 推送
 */
function createWSServer() {
  const wss = new WebSocketServer({ port: CONFIG.wsPort })

  wss.on('connection', (ws) => {
    console.log('🔌 HMR client connected')

    ws.on('close', () => {
      console.log('🔌 HMR client disconnected')
    })
  })

  console.log(`✅ WebSocket server running on ws://localhost:${CONFIG.wsPort}`)
  return wss
}

// ==================== 主函数：启动开发服务器 ====================
function startDevServer() {
  console.log('\n🚀 Simple HMR Dev Server\n')
  console.log(`   Root: ${CONFIG.rootDir}`)
  console.log(`   HTTP: http://localhost:${CONFIG.port}`)
  console.log(`   WS:   ws://localhost:${CONFIG.wsPort}\n`)

  // 1. 启动 WebSocket 服务器
  const wss = createWSServer()

  // 2. 启动 HTTP 开发服务器
  const server = createDevServer()
  server.listen(CONFIG.port, () => {
    console.log(`✅ Dev server running at http://localhost:${CONFIG.port}`)
  })

  // 3. 启动文件监听
  const watcher = createFileWatcher(wss)
  console.log('👀 Watching for file changes...\n')

  // 优雅退出
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down...')
    watcher.close()
    wss.close()
    server.close()
    process.exit(0)
  })
}

// 启动
startDevServer()
```

3. **架构说明**
   ```
   ┌──────────────────────────────────────────────────────┐
   │                   HMR Server Architecture              │
   ├──────────────────────────────────────────────────────┤
   │                                                       │
   │  ┌─────────────┐    chokidar    ┌─────────────────┐  │
   │  │ File System │ ────────────► │ File Watcher     │  │
   │  │ (源代码)    │   文件变化     │ (debounce 100ms) │  │
   │  └─────────────┘                └────────┬────────┘  │
   │                                          │           │
   │                                          ▼           │
   │                               ┌─────────────────┐   │
   │                               │ WebSocket Server │   │
   │                               │ (推送 update)    │   │
   │                               └────────┬────────┘   │
   │                                        │            │
   │  ┌─────────────┐    HTTP request   ┌────▼────────┐  │
   │  │  Browser    │ ◄─────────────── │HTTP Server   │  │
   │  │             │   (静态文件/ESM) │ + ESM Transform│  │
   │  │ ┌─────────┐ │                  └───────────────┘  │
   │  │ │HMR Client│ │ ◄── WebSocket ────┘               │
   │  │ │ Runtime  │ │    (update msg)                    │
   │  │ └─────────┘ │                                      │
   │  │             │                                      │
   │  └─────────────┘                                      │
   │                                                       │
   └──────────────────────────────────────────────────────┘
   ```

4. **与 Vite/Webpack HMR 的差距**
   - 缺少 Module Graph（不知道哪些模块依赖了变更模块）
   - 缺少 CSS HMR（当前只是整块替换）
   - 缺少 Error Overlay（错误提示遮罩层）
   - ESM 转换过于简单（不支持复杂的 import 语法）

### 🔍 追问链
1. **如何实现精确的模块级 HMR（只更新受影响的模块）？**
   → 维护 Module Graph，文件变更时沿依赖图向上传播，找到所有 accept 了该模块的边界
2. **chokidar 比 fs.watch 好在哪里？**
   → 使用 FS events（macOS）/ polling（Linux）；不丢事件；不重复触发；跨平台一致
3. **如何处理 HMR 更新后的状态保持问题？**
   → 提供 dispose 回调让用户保存/恢复状态；React Fast Refresh 自动保留 component state

---

## Q38: 请设计一个前端脚手架工具（CLI）的核心架构。需要考虑哪些方面？
- **难度**：★★★
- **知识点**：脚手架设计 / CLI 工具 / Node.js / 工程化架构
- **题型**：架构设计题

### 参考答案要点：

1. **整体架构设计**
   ```
   ┌─────────────────────────────────────────────────────┐
   │                  CLI Tool Architecture                │
   ├─────────────────────────────────────────────────────┤
   │                                                     │
   │  User Input                                          │
   │     ↓                                               │
   │  ┌──────────────┐                                   │
   │  │ Command Parser│  ← commander / yargs              │
   │  │ (命令解析)    │                                   │
   │  └──────┬───────┘                                   │
   │         ↓                                           │
   │  ┌──────────────┐                                   │
   │  │ Prompt Engine │  ← inquirer / prompts             │
   │  │ (交互式提问)  │                                   │
   │  └──────┬───────┘                                   │
   │         ↓                                           │
   │  ┌──────────────┐     ┌──────────────────┐          │
   │  │ Template      │◄──►│ Template Registry │          │
   │  │ Engine        │    │ (模板仓库/远程)    │          │
   │  │ (模板引擎)     │    │ - local templates │          │
   │  │ - handlebars  │    │ - git clone       │          │
   │  │ - ejs         │    │ - npm registry    │          │
   │  └──────┬───────┘    └──────────────────┘          │
   │         ↓                                           │
   │  ┌──────────────┐                                   │
   │  │ Generator     │  ← 文件生成 + 目录结构            │
   │  │ (项目生成器)  │                                   │
   │  └──────┬───────┘                                   │
   │         ↓                                           │
   │  ┌──────────────┐     ┌──────────────────┐          │
   │  │ Dependency    │◄──►│ Package Manager  │          │
   │  │ Installer     │    │ - npm / yarn/pnpm │          │
   │  │ (依赖安装)    │    │ - lock file       │          │
   │  └──────┬───────┘    └──────────────────┘          │
   │         ↓                                           │
   │  ┌──────────────┐                                   │
   │  │ Git Init      │  ← 初始化 Git 仓库               │
   │  └──────┬───────┘                                   │
   │         ↓                                           │
   │  Output: Ready-to-run Project                        │
   │                                                     │
   └─────────────────────────────────────────────────────┘
   ```

2. **核心模块设计**

   **A. 命令系统**
   ```javascript
   // lib/commands/index.js
   program
   .name('create-my-app')
   .description('A powerful scaffolding tool')
   .version('1.0.0')

   // 创建项目命令
   program
   .command('create <project-name>')
   .description('Create a new project')
   .option('-t, --template <template>', 'Template to use')
   .option('-p, --package-manager <pm>', 'Package manager')
   .action(async (name, options) => {
     await createProject(name, options)
   })

   // 添加插件命令
   program
   .command('add <plugin>')
   .description('Add a plugin to existing project')
   .action(addPlugin)

   program.parse(process.argv)
   ```

   **B. 交互式问答引擎**
   ```javascript
   // lib/prompts.js
   const prompts = require('prompts')

   async function promptUser(options) {
     const questions = []

     if (!options.template) {
       questions.push({
         type: 'select',
         name: 'template',
         message: 'Pick a template:',
         choices: [
           { title: 'Vue 3 + TypeScript', value: 'vue-ts' },
           { title: 'React 18 + TypeScript', value: 'react-ts' },
           { title: 'Vue 3 + Vite', value: 'vue-vite' },
           { title: 'React 18 + Vite', value: 'react-vite' },
         ],
       })
     }

     if (!options.packageManager) {
       questions.push({
         type: 'select',
         name: 'packageManager',
         message: 'Pick a package manager:',
         choices: [
           { title: 'pnpm (Recommended)', value: 'pnpm' },
           { title: 'yarn', value: 'yarn' },
           { title: 'npm', value: 'npm' },
         ],
       })
     }

     questions.push(
       {
         type: 'toggle',
         name: 'git',
         message: 'Initialize git repository?',
         initial: true,
       },
       {
         type: 'toggle',
         name: 'eslint',
         message: 'Add ESLint + Prettier?',
         initial: true,
       }
     )

     return await prompts(questions)
   }
   ```

   **C. 模板引擎与渲染**
   ```javascript
   // lib/generator.js
   const Handlebars = require('handlebars')
   const fs = require('fs-extra')
   const path = require('path')

   /**
    * 项目生成器核心
    * - 读取模板目录
    * - 使用用户输入渲染模板
    * - 写入目标目录
    */
   async function generateProject(templateDir, targetDir, context) {
     // 1. 读取模板目录下的所有文件
     const templateFiles = await readTemplateFiles(templateDir)

     // 2. 逐个渲染文件
     for (const file of templateFiles) {
       const sourcePath = path.join(templateDir, file)
       const targetPath = path.join(targetDir, replacePlaceholders(file, context))

       // 处理二进制文件（图片等）直接复制
       if (isBinaryFile(file)) {
         await fs.copy(sourcePath, targetPath)
         continue
       }

       // 读取并渲染模板
       const content = await fs.readFile(sourcePath, 'utf-8')
       const template = Handlebars.compile(content)
       const rendered = template(context)

       // 写入目标文件
       await fs.ensureDir(path.dirname(targetPath))
       await fs.writeFile(targetPath, rendered, 'utf-8')
     }

     // 3. 处理特殊文件名（如 _gitignore → .gitignore）
     await renameSpecialFiles(targetDir)
   }
   ```

   **D. 依赖安装器**
   ```javascript
   // lib/installer.js
   const { execa } = require('execa')

   async function installDependencies(dir, packageManager) {
     const commandMap = {
       pnpm: 'pnpm install',
       yarn: 'yarn install',
       npm: 'npm install',
     }

     const command = commandMap[packageManager] || 'npm install'

     const spinner = ora('Installing dependencies...\n').start()

     try {
       await execa(command, [], {
         cwd: dir,
         stdio: 'pipe',
       })
       spinner.succeed('Dependencies installed!')
     } catch (error) {
       spinner.fail('Failed to install dependencies')
       throw error
     }
   }
   ```

3. **关键设计考量**

   **模板管理策略**
   ```
   Option 1: 内置模板（打包在 CLI 中）
     → 优点：离线可用、版本一致
     → 缺点：CLI 体积大、更新需发新版

   Option 2: 远程 Git 仓库（create-vue 模式）
     → 优点：模板独立迭代、社区可贡献
     → 缺点：需要网络、版本兼容问题

   Option 3: npm 包（@create-my-app/template-react）
     → 优点：版本化管理、可独立发布
     → 缺点：需要发布流程

   推荐：Option 2（远程 Git）+ 本地缓存
   ```

   **用户体验优化**
   - 进度显示（ora spinner）
   - 颜色输出（chalk / picocolors）
   - 错误处理友好（清晰的错误信息 + 解决建议）
   - 取消支持（Ctrl+C 优雅退出 + 清理临时文件）
   - 离线模式（检测网络，使用缓存模板）

   **可扩展性设计**
   ```javascript
   // 插件系统（类似 Vue CLI / nx 的 plugin 架构）
   class PluginAPI {
     constructor(cli) {
       this.cli = cli
     }

     // 扩展命令
     registerCommand(name, handler) { ... }

     // 扩展模板选项
     extendPrompt(questions) { ... }

     // 钩子：在生成前后执行
     onGenerateBefore(fn) { ... }
     onGenerateAfter(fn) { ... }
   }
   ```

4. **完整目录结构**
   ```
   create-my-app/
   ├── bin/
   │   └── index.js              # CLI 入口（#!/usr/bin/env node）
   ├── lib/
   │   ├── commands/
   │   │   ├── create.js         # create 命令
   │   │   └── add.js            # add 命令
   │   ├── generator.js          # 项目生成器
   │   ├── installer.js          # 依赖安装
   │   ├── prompts.js            # 交互式问答
   │   ├── template-manager.js   # 模板管理（拉取/缓存）
   │   └── utils/
   │       ├── logger.js         # 日志工具
   │       └── helpers.js        # 辅助函数
   ├── templates/                # 内置模板（可选）
   │   ├── vue-ts/
   │   └── react-ts/
   ├── package.json
   └── README.md
   ```

### 🔍 追问链
1. **如何处理模板的版本管理和更新？**
   → 模板仓库打 tag；CLI 支持指定版本号；本地缓存带过期机制
2. **如何支持用户自定义模板？**
   → `create --template github:user/repo` 从任意 Git 仓库拉取模板
3. **如何确保脚手架生成的项目开箱即用？**
   → 每个模板都要有 CI 验证；模板本身要有 e2e 测试

---

## Q39: 请设计一套完整的前端工程化规范体系。应该包含哪些层面？如何落地？
- **难度**：★★★
- **知识点**：工程化体系 / 架构设计 / 团队协作 / 最佳实践
- **题型**：方案设计题

### 参考答案要点：

1. **规范体系的六个层次**

   ```
   ┌─────────────────────────────────────────────────────┐
   │           Frontend Engineering Standards              │
   ├─────────────────────────────────────────────────────┤
   │                                                     │
   │  Level 6: 📊 监控与度量                              │
   │     → 构建指标 / Bundle Size / Lighthouse Score      │
   │     → 错误率 / 性能基线 / 技术债务追踪               │
   │                                                     │
   │  Level 5: 🔄 CI/CD 与自动化                         │
   │     → PR Check / 自动部署 / 环境管理                │
   │     → 质量门禁 / 安全扫描                           │
   │                                                     │
   │  Level 4: 📝 代码规范                                │
   │     → ESLint / Prettier / Stylelint                 │
   │     → Commit Convention / Review Checklist           │
   │                                                     │
   │  Level 3: 🏗️ 项目结构与架构                          │
   │     → 目录约定 / 模块划分 / 命名规范                │
   │     → 组件设计原则 / 状态管理规范                    │
   │                                                     │
   │  Level 2: 🔧 工具链统一                              │
   │     → Node 版本 / 包管理器 / 编辑器配置             │
   │     → 构建工具 / 测试框架                            │
   │                                                     │
   │  Level 1: 📘 文档与文化                              │
   │     → 规范文档 / 最佳实践手册 / 新人 Onboarding      │
   │     → Code Review 文化 / 技术分享机制               │
   │                                                     │
   └─────────────────────────────────────────────────────┘
   ```

2. **各层面的详细规范**

   **Level 1: 文档与文化**
   - **新人 Onboarding 文档**：环境搭建、第一次提交流程、常用命令
   - **技术决策记录（ADR）**：重要技术选型的决策原因和背景
   - **Code Review 指南**：审查 checklist、评审标准、响应时效
   - **技术分享机制**：双周技术分享、RFC 流程

   **Level 2: 工具链统一**
   ```json
   // .nvmrc 或 .tool-versions
   18
   ```
   ```json
   // package.json - engines 字段
   { "engines": { "node": ">=18.0.0", "pnpm": ">=8.0.0" } }
   ```
   - 统一使用 Volta 或 fnm 管理 Node 版本
   - 统一包管理器（推荐 pnpm + workspace）
   - IDE 配置：`.vscode/settings.json` + 推荐扩展列表

   **Level 3: 项目结构与架构**
   ```
   src/
   ├── api/              # API 请求层
   │   ├── modules/      # 按业务模块划分
   │   └── request.ts    # axios 封装（拦截器/错误处理）
   ├── assets/           # 静态资源
   ├── components/       # 公共组件
   │   ├── base/         # 基础组件（Button/Input）
   │   └── business/     # 业务组件
   ├── composables/      # Vue 组合式函数 / React Hooks
   ├── layouts/          # 布局组件
   ├── pages/            # 页面（路由维度）
   │   └── dashboard/
   │       ├── components/  # 页面级组件
   │       ├── hooks/       # 页面级 hooks
   │       ├── api.ts       # 页面 API
   │       └── index.tsx    # 页面入口
   ├── stores/           # 状态管理（Pinia/Zustand）
   ├── types/            # TypeScript 类型定义
   ├── utils/            # 工具函数
   ├── constants/        # 常量
   └── styles/           # 全局样式
   ```
   - **命名规范**：文件名 kebab-case、组件名 PascalCase、变量 camelCase、常量 UPPER_SNAKE_CASE
   - **组件设计原则**：单一职责、Props 向下 Events 向上、受控/非受控明确

   **Level 4: 代码规范**
   - ESLint：继承 `@company/eslint-config`（团队统一配置）
   - Prettier：统一的格式化规则
   - Stylelint：SCSS/CSS 规范
   - TypeScript：strict 模式开启
   - **Commit 规范**：Conventional Commits + Commitlint 强制
   - **Review Checklist**：
     ```
     ☑️ 代码是否符合规范（ESLint 零 error）
     ☑️ 是否有冗余代码或 TODO 未处理
     ☑️ 是否有性能隐患（不必要的重渲染、大列表未虚拟化）
     ☑️ 错误处理是否完善
     ☑️ 是否有安全风险（XSS、敏感信息）
     ☑️ 类型定义是否完整
     ```

   **Level 5: CI/CD 与自动化**
   ```yaml
   # PR 质量门禁
   pr-check:
     - lint (ESLint + Stylelint)
     - typecheck (TypeScript)
     - test (Unit + Coverage threshold)
     - build (确认可成功构建)
     - bundle-size (对比 main 分支，增量超限告警)
     - security (npm audit / Snyk)
   ```
   - **自动化部署**：Staging 自动部署、Production 需审批或 tag 触发
   - **环境管理**：`.env.example` + CI Secrets 管理

   **Level 6: 监控与度量**
   - **构建监控**：构建时长 trend、产物大小 trend
   - **性能监控**：Lighthouse CI（Performance > 90）、Core Web Vitals
   - **错误监控**：Sentry（错误率 < 0.1%）、来源分布
   - **技术债务**：SonarQube / CodeClimate、TODO/FIXME 追踪
   - **研发效能**：PR 响应时间、构建成功率、部署频率

3. **落地路线图**
   ```
   Phase 1（第 1-2 周）：基础设施
   ✅ 创建规范配置包（eslint-config / prettier-config）
   ✅ 配置 Husky + lint-staged
   ✅ 编写 Onboarding 文档

   Phase 2（第 3-4 周）：流程建设
   ✅ 搭建 CI 流水线（lint + test + build）
   ✅ 制定 Code Review 指南
   ✅ 接入错误监控（Sentry）

   Phase 3（第 5-8 周）：深化完善
   ✅ 接入性能监控（Lighthouse CI）
   ✅ 建立技术债务追踪机制
   ✅ 完善项目模板（脚手架自带所有规范）

   Phase 4（持续）：文化沉淀
   ✅ 双周技术分享
   ✅ RFC 技术决策流程
   ✅ 规范季度 review 和更新
   ```

4. **治理组织**
   - **工程委员会**：每月 review 规范，投票决定重大变更
   - **Champion 制度**：每项规范有一个负责人（Champion）维护
   - **反馈渠道**：专门的 Slack 频道 / Issue 模板收集改进建议

---

## Q40: 循环依赖（Circular Dependency）是如何产生的？有哪些解决方案？
- **难度**：★★★
- **知识点**：模块化 / 循环依赖 / 架构设计
- **题型**：简答题 + 代码分析题

### 参考答案要点：

1. **产生原因与示例**
   ```javascript
   // a.js
   import { funcB } from './b.js'
   export function funcA() {
     return funcB() + 1
   }

   // b.js
   import { funcA } from './a.js'  // 循环！
   export function funcB() {
     return funcA() * 2
   }
   ```

2. **CommonJS 的处理方式**
   - 先导出部分完成的 `exports` 对象（初始为 `{}`）
   - 执行模块代码（此时依赖模块的 exports 可能还不完整）
   - **问题**：可能得到 `undefined` 或空对象
   ```javascript
   // CommonJS 循环依赖的实际行为
   // a.js
   const b = require('./b')
   exports.a = 1
   console.log(b.b)  // undefined！（b 还没执行完）

   // b.js
   const a = require('./a')  // 拿到的是初始 exports = {}
   exports.b = a.a + 1      // a.a 是 undefined
   console.log(a.a)         // undefined
   ```

3. **ESM 的处理方式**
   - 使用**动态引用（Live Binding）**：导出的是引用，而非值拷贝
   - 即使循环依赖，最终也能拿到正确的值
   - 但要注意 TDZ（暂时性死区）问题
   ```javascript
   // ESM 循环依赖
   // a.js
   import { b } from './b.js'
   export const a = 1
   console.log(b)  // ReferenceError! b 处于 TDZ

   // b.js
   import { a } from './a.js'
   export const b = a + 1  // a 处于 TDZ!
   ```

4. **解决方案**

   **方案 1：延迟引用（Lazy Import）— 推荐**
   ```javascript
   // a.js
   export function funcA() {
     const { funcB } = require('./b')  // 延迟到调用时才引入
     return funcB() + 1
   }
   ```

   **方案 2：依赖倒置（抽取公共模块）— 最佳架构方案**
   ```
   修改前：A ↔ B（双向依赖）
   修改后：A → Shared ← B（都依赖共享层）
   ```
   ```javascript
   // shared/types.js
   export interface SomeType { ... }

   // a.js
   import { SomeType } from './shared/types'
   import { funcB } from './b.js'

   // b.js
   import { SomeType } from './shared/types'
   // 不再依赖 a.js
   ```

   **方案 3：使用函数/类延迟初始化**
   ```javascript
   // 使用 getter 延迟求值
   export const getB = () => require('./b').b

   // 或使用 class
   class Manager {
     get dependency() {
       return require('./other-module')
     }
   }
   ```

   **方案 4：重构模块职责**
   - 循环依赖通常是模块职责不清的信号
   - 重新审视模块边界，遵循单向依赖原则

5. **检测工具**
   - **Webpack**：`circular-dependency-plugin`（构建时报错/告警）
   - **Madge**：可视化依赖图，检测循环
   ```bash
   npx madge --circular src/
   ```

### 🔍 追问链
1. **Webpack 中循环依赖会导致什么问题？**
   → 可能导致运行时错误（undefined is not a function）、代码执行顺序不确定
2. **如何在不改变模块结构的前提下解决循环依赖？**
   → 延迟引用（动态 import/require）是最快速的 workaround
3. **大型项目如何系统性预防循环依赖？**
   → 架构分层（domain/application/infrastructure）、依赖规则 lint（eslint-plugin-import 的 no-cycle rule）、定期审计

---

## Q41: Webpack 的持久化缓存（Persistent Cache）原理是什么？如何验证缓存有效性？
- **难度**：★★★
- **知识点**：Webpack5 / 持久化缓存 / 构建优化
- **题型**：简答题

### 参考答案要点：

1. **基本配置**
   ```javascript
   // webpack.config.js
   module.exports = {
     cache: {
       type: 'filesystem',  // 使用文件系统缓存
       version: '1.0.0',    // 缓存版本（配置变更时可手动递增）
       buildDependencies: {
         config: [__filename],         // 配置文件变更使缓存失效
         tsconfig: ['./tsconfig.json'], // TS 配置变更使缓存失效
       },
     },
   }
   ```

2. **缓存存储结构**
   ```
   node_modules/.cache/webpack/
   ├── default-development/          # 按 mode+name 组织
   │   ├── index.pack                # 索引文件（元数据）
   │   ├── 0.data                    # 数据文件（序列化的模块数据）
   │   ├── 1.data
   │   └── ...
   └── indexing.pack                 # 全局索引
   ```

3. **缓存失效机制**
   - **Source 文件变更**：通过文件内容的 hash 判断（mtime + size 快速排除）
   - **Loader/Plugin 变更**：通过 `buildDependencies` 声明的文件 hash
   - **配置变更**：序列化配置内容计算 hash
   - **Webpack 版本升级**：自动清除（不同版本的缓存格式不兼容）

4. **Hash 计算流程**
   ```
   缓存 Key Hash = hash([
     所有 source 文件的 content hash,
     webpack 配置的序列化结果,
     buildDependencies 文件的 hash,
     loader 选项的序列化结果,
     Node.js / OS 等环境信息（可选）
   ])
   ```

5. **验证与调试**
   ```bash
   # 查看缓存统计
   npx webpack --profile --json > stats.json

   # 分析 stats.json 中的 caching 信息
   # "cachedModules" 表示命中的模块数

   # 强制忽略缓存
   npx webpack --no-cache

   # 清除缓存目录
   rm -rf node_modules/.cache/webpack/
   ```

6. **最佳实践**
   - CI 环境中缓存 `node_modules/.cache/webpack/`（大幅缩短构建时间）
   - 注意不要将 `.cache` 提交到 Git
   - 升级 Webpack 后首次构建会稍慢（重建缓存）
   - `cache.version` 用于手动控制缓存失效（如修改了无法被检测到的隐式配置）

### 🔍 追问链
1. **filesystem cache 和 memory cache 的区别？**
   → memory cache 只在当前进程有效（dev server 模式）；filesystem cache 跨进程持久化到磁盘
2. **缓存损坏了怎么办？**
   → 删除 `node_modules/.cache/webpack/` 目录即可；Webpack 会自动重建
3. **CI 中如何利用持久化缓存？**
   → GitHub Actions Cache artifact、GitLab CI Cache、或云存储（S3）共享缓存层

---

## Q42: 如何设计 Monorepo 下包的版本管理与发布策略？
- **难度**：★★★
- **知识点**：Monorepo / 版本管理 / 发布策略 / Changesets
- **题型**：方案设计题

### 参考答案要点：

1. **版本管理挑战**
   ```
   Monorepo 版本管理的核心难题：
   - 包 A 依赖 @scope/shared@^1.0.0
   - shared 发了 1.1.0（breaking change）
   - A 不知道 shared 变了，可能出问题
   - 如何保证包之间的版本兼容性？
   ```

2. **主流方案对比**
   | 方案 | 原理 | 适用场景 |
   |------|------|----------|
   **Lerna** | 版本联动（固定/独立模式） | Legacy 项目 |
   **Changesets** | 变更集驱动（推荐） | 现代项目首选 |
   **Release-it** | 单包发布 + 手动协调 | 简单 Monorepo |
   **Rush** | 完整的 Monorepo 管理工具 | 超大型 Monorepo |

3. **Changesets 工作流（推荐方案）**
   ```
   ┌────────────────────────────────────────────────────┐
   │              Changesets 发布流程                     │
   ├────────────────────────────────────────────────────┤
   │                                                    │
   │  1. 开发者在 feature 分支开发                       │
   │     ↓                                             │
   │  2. 完成功能后运行 changeset add                    │
   │     → 选择影响的包                                 │
   │     → 选择变更类型（patch/minor/major）             │
   │     → 写变更描述                                   │
   │     → 生成 .changeset/xxx.md                       │
   │     ↓                                             │
   │  3. 提交 PR（包含 changeset 文件）                  │
   │     ↓                                             │
   │  4. Code Review（review changeset 内容）            │
   │     ↓                                             │
   │  5. 合并到 main                                    │
   │     ↓                                             │
   │  6. CI 运行 changeset version                      │
   │     → 读取所有 changeset 文件                       │
   │     → 计算版本号（Semver）                          │
   │     → 更新 package.json version                    │
   │     → 合并 changesets 为 CHANGELOG.md              │
   │     → 删除已消费的 changeset 文件                   │
   │     ↓                                             │
   │  7. CI 运行 changeset publish                      │
   │     → npm publish（只发布有版本变更的包）            │
   │     → 创建 Git Tag                                 │
   │                                                    │
   └────────────────────────────────────────────────────┘
   ```

4. **Changesets 配置示例**
   ```json
   // .changeset/config.json
   {
     "$schema": "https://unpkg.com/@changesets/config@2.3.0/schema.json",
     "changelog": "@changesets/changelog-github",
     "commit": false,
     "fixed": [],
     "linked": [[
       "@myorg/ui",
       "@myorg/utils",
       "@myorg/theme"
     ]],
     "access": "public",
     "baseBranch": "main",
     "updateInternalDependencies": "patch",
     "ignore": ["www", "documentation"]
   }
   ```

5. **关键配置说明**
   - **linked**：联动的包组，其中一个发版时同组其他包也跟着升版本（即使没直接改动）
   - **fixed**：固定版本模式（所有包共用同一个版本号）
   - **access**：npm 发布 scope 的可见性（public/private）
   - **ignore**：不被发布的包（应用层代码）

6. **CI/CD 集成**
   ```yaml
   # .github/workflows/release.yml
   name: Release
   on:
     push:
       branches: [main]

   jobs:
   release:
     runs-on: ubuntu-latest
     steps:
       - uses: actions/checkout@v3
         with:
           fetch-depth: 0  # 需要完整历史来生成 changelog

       - uses: pnpm/action-setup@v2
       - uses: actions/setup-node@v3
         with:
           node-version: 18
           registry-url: 'https://registry.npmjs.org'
           cache: 'pnpm'

       - run: pnpm install

       # 版本号更新 + Changelog 生成
       - name: Create Version Pull Request or Publish
         id: changesets
         uses: changesets/action@v1
         with:
           publish: pnpm changeset publish
           version: pnpm changeset version
         env:
           GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
           NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
           NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
   ```

7. **版本策略选择**
   ```
   Independent Mode（推荐）：
   - 每个包独立版本号
   - 只有变更的包才升版本
   - 灵活、精准

   Fixed Mode：
   - 所有包共享同一版本号
   - 适合强耦合的包集合（如 Babel monorepo）
   - 任何一个包变更，所有包都升版本
   ```

### 🔍 追问链
1. **如何处理 prerelease 版本（alpha/beta/rc）？**
   → Changesets 支持 `--snapshot` 生成快照版本；或手动使用 `prerelease` 标识
2. **包之间的 peerVersions 如何自动更新？**
   → Changesets 的 `updateInternalDependencies` 配置项控制
3. **如何回滚一个已发布的版本？**
   → npm deprecate + 发布新版本修复；或使用 npm --force unpublish（72小时内）

---

## Q43: 前端应用的多环境（dev/staging/prod）部署策略应该如何设计？
- **难度**：★★★
- **知识点**：部署 / 环境管理 / DevOps / CI/CD
- **题型**：方案设计题

### 参考答案要点：

1. **环境定义与差异**
   | 环境 | 用途 | 数据源 | 特征 |
   |------|------|--------|------|
   **Development** | 本地开发 | Mock / Dev API | 热更新、详细日志、Source Map |
   **Staging** | 预发布验证 | Staging API | 接近生产、可公开访问、QA 测试 |
   **Production** | 正式环境 | Production API | 性能最优、压缩、无 Source Map |

2. **环境变量管理**
   ```javascript
   // .env.development
   VITE_API_BASE_URL=https://api-dev.example.com
   VITE_APP_TITLE=My App (Dev)
   VITE_ENABLE_MOCK=true
   VITE_SENTRY_DSN=

   // .env.staging
   VITE_API_BASE_URL=https://api-staging.example.com
   VITE_APP_TITLE=My App (Staging)
   VITE_ENABLE_MOCK=false
   VITE_SENTRY_DSN=https://xxx@sentry.io/1

   // .env.production
   VITE_API_BASE_URL=https://api.example.com
   VITE_APP_TITLE=My App
   VITE_ENABLE_MOCK=false
   VITE_SENTRY_DSN=https://xxx@sentry.io/2
   ```

   ```javascript
   // vite.config.ts
   export default defineConfig(({ mode }) => ({
     define: {
       __APP_ENV__: JSON.stringify(mode),
     },
     // 根据不同环境加载不同配置
     envDir: 'env',  // 自定义 env 目录
   }))
   ```

3. **构建差异化策略**
   ```javascript
   // vite.config.ts - 不同环境的构建配置
   export default defineConfig(({ command, mode }) => {
     const isProd = mode === 'production'
     const isStaging = mode === 'staging'

     return {
       build: {
         sourcemap: isProd ? false : 'hidden',  // prod 不生成，staging 生成隐藏 map
         minify: isProd ? 'terser' : 'esbuild',
         rollupOptions: {
           output: {
             manualChunks: isProd
               ? {
                   vendor: ['react', 'react-dom'],
                   // 生产环境更细粒度的分包
                 }
               : undefined,
           },
         },
       },
       plugins: [
         // Staging 环境添加环境标识
         isStaging && banner(`/* Env: STAGING - ${new Date().toISOString()} */`),
       ].filter(Boolean),
     }
   })
   ```

4. **部署架构设计**
   ```
   ┌─────────────────────────────────────────────────────┐
   │              Multi-Environment Deployment             │
   ├─────────────────────────────────────────────────────┤
   │                                                     │
   │  Developer Machine                                   │
   │     │                                               │
   │     │ git push feature-branch                        │
   │     ▼                                               │
   │  ┌─────────────────────────────────────┐             │
   │  │        CI/CD Pipeline              │             │
   │  │                                     │             │
   │  │  PR to main ──► Lint/Test/Build     │             │
   │  │       │                             │             │
   │  │       ├─ merge to develop           │             │
   │  │       │   ▼                         │             │
   │  │       │  Deploy to Staging          │             │
   │  │       │  (auto)                     │             │
   │  │       │                             │             │
   │  │       └─ merge/tag to main          │             │
   │  │           ▼                         │             │
   │  │          Deploy to Production       │             │
   │  │          (manual approval / auto)   │             │
   │  └─────────────────────────────────────┘             │
   │                                                     │
   │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
   │  │ Staging  │  │ Canary   │  │ Production│           │
   │  │ Server   │  │ (5%)     │  │ Server   │           │
   │  │          │  │          │  │          │           │
   │  │ *.staging │  │ *.canary │  │ *.com    │           │
   │  │ .example  │  │ .example │  │          │           │
   │  └──────────┘  └──────────┘  └──────────┘           │
   │                                                     │
   └─────────────────────────────────────────────────────┘
   ```

5. **生产部署策略**
   - **蓝绿部署**：维护两套环境，切换 DNS/Load Balancer
   - **金丝雀发布（Canary）**：先放 5% 流量，观察无误后逐步扩大
   - **滚动更新（Rolling Update）**：Kubernetes 逐个 Pod 替换
   - **Feature Flag**：代码层面控制功能开关（配合灰度）

6. **回滚策略**
   - **快速回滚**：CDN 切换到上一个版本的静态资源
   - **Git 回滚**：`git revert` 生成新 commit 反转变更
   - **Docker 回滚**：切换到上一个镜像 Tag
   - **数据库回滚**：最难，需要预先设计向后兼容的迁移脚本

7. **安全考虑**
   - 所有密钥（API Key、DB Password）通过 CI Secrets 注入，**绝不写入代码**
   - `.env.production` 不提交到 Git（加入 `.gitignore`）
   - 生产环境 Source Map 不部署（或上传至 Sentry 等授权平台）
   - CSP（Content Security Policy）防止 XSS
   - HTTPS 强制 + HSTS

### 🔍 追问链
1. **Staging 环境如何共享生产数据（脱敏）？**
   → 数据库从生产定时备份并脱敏（PII 信息打码）；或使用合成数据
2. **前端如何感知当前环境并做出适配？**
   → 环境变量注入（构建时）、window.APP_CONFIG（运行时配置）、域名检测
3. **CDN 缓存与部署更新的矛盾如何解决？**
   → 文件名带 hash（content hash）+ HTML 不缓存 + CDN API 主动刷新

---

## Q44: 【手写实现】请实现一个简易的 Git Hook 管理工具（类似 Husky 的核心功能）。
- **难度**：★★★
- **知识点**：Git Hooks / Node.js / 工具开发 / 手写实现
- **题型**：编程实践题

### 参考答案要点：

1. **核心思路**
   - 读取配置文件（`.hooksrc` 或 `package.json` 的 hooks 字段）
   - 在 `.git/hooks/` 目录下生成对应的 hook 脚本
   - hook 脚本执行时调用配置的命令
   - 支持 `pre-commit`、`commit-msg`、`pre-push` 等常见钩子

2. **完整实现**
```javascript
#!/usr/bin/env node

/**
 * 简易 Git Hook 管理工具（类似 Husky 核心功能）
 *
 * 核心原理：
 * 1. 读取用户配置的 hooks（从 .hooksrc 或 package.json）
 * 2. 在 .git/hooks/ 目录生成可执行的 shell 脚本
 * 3. 每次 hook 触发时，shell 脚本调用 Node 执行配置的命令
 * 4. 支持并行执行多个命令、失败中断
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// ==================== 配置 ====================
const GIT_HOOKS_DIR = '.git/hooks'
const CONFIG_FILES = ['.hooksrc', '.hooks.json', 'package.json']

// 支持的 Git Hooks 类型
const SUPPORTED_HOOKS = [
  'applypatch-msg',
  'pre-applypatch',
  'post-applypatch',
  'pre-commit',
  'pre-merge-commit',
  'commit-msg',
  'post-commit',
  'pre-rebase',
  'post-checkout',
  'post-merge',
  'pre-push',
  'pre-receive',
  'update',
  'post-receive',
  'post-update',
  'push-to-checkout',
  'pre-auto-gc',
  'post-rewrite',
  'sendemail-validate',
]

// ==================== 配置读取 ====================
/**
 * 读取 hook 配置
 * 优先级：.hooksrc > .hooks.json > package.json.hooks
 */
function readConfig(cwd) {
  for (const configFile of CONFIG_FILES) {
    const filePath = path.join(cwd, configFile)
    if (fs.existsSync(filePath)) {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

      if (configFile === 'package.json') {
        return content.hooks || {}
      }

      return content
    }
  }
  return {}
}

// ==================== Hook 脚本生成 ====================
/**
 * 生成单个 Git Hook 的 shell 脚本
 *
 * 脚本逻辑：
 * 1. 读取 hook 配置
 * 2. 执行配置的命令（可以是数组，串行执行）
 * 3. 任一命令失败则以非零退出（阻止 git 操作）
 */
function generateHookScript(hookName, config) {
  const commands = config[hookName]

  if (!commands || (Array.isArray(commands) && commands.length === 0)) {
    return null
  }

  // 将命令统一为数组
  const commandList = Array.isArray(commands) ? commands : [commands]

  // 生成 shell 脚本内容
  const scriptLines = [
    '#!/bin/sh',
    '# Generated by my-hooks (do not edit manually)',
    '',
    '# 获取 hook 名称和 Git 参数',
    `HOOK_NAME="${hookName}"`,
    '# Git 传递的参数（如 commit-msg 的 .git/COMMIT_EDITMSG 路径）',
    '"$@" | while read -r line; do HOOK_ARGS="$HOOK_ARGS $line"; done',
    '',
    '# 执行配置的命令',
  ]

  // 生成命令执行逻辑
  commandList.forEach((cmd, index) => {
    const cmdStr = typeof cmd === 'object' ? cmd.command : cmd
    const ignoreFail = typeof cmd === 'object' ? cmd.ignoreFail : false

    scriptLines.push('')
    scriptLines.push(`# Command ${index + 1}: ${cmdStr}`)
    if (ignoreFail) {
      scriptLines.push(`${cmdStr} || true`)
    } else {
      scriptLines.push(`if ! ${cmdStr}; then`)
      scriptLines.push(`  echo ""`)
      scriptLines.push(`  echo "❌ Hook \\`${hookName}\\` failed: ${cmdStr}"`)
      scriptLines.push(`  exit 1`)
      scriptLines.push(`fi`)
    }
  })

  scriptLines.push('')
  scriptLines.push('exit 0')

  return scriptLines.join('\n')
}

// ==================== 核心功能 ====================

/**
 * 安装（生成）所有配置的 hooks
 */
function install(cwd) {
  const config = readConfig(cwd)
  const hooksDir = path.join(cwd, GIT_HOOKS_DIR)

  // 确保 .git/hooks 目录存在
  if (!fs.existsSync(hooksDir)) {
    console.error('❌ Not a git repository (or .git not found)')
    process.exit(1)
  }

  let installedCount = 0
  const installedHooks = []

  // 遍历所有支持的 hook 类型
  for (const hookName of SUPPORTED_HOOKS) {
    // 只生成有配置的 hook
    if (!config[hookName]) continue

    const script = generateHookScript(hookName, config)
    if (!script) continue

    const hookFilePath = path.join(hooksDir, hookName)

    // 写入 hook 文件
    fs.writeFileSync(hookFilePath, script, 'utf-8')

    // 设置可执行权限（Unix 系统）
    try {
      fs.chmodSync(hookFilePath, 0o755)
    } catch (e) {
      // Windows 系统可能不支持 chmod
    }

    installedCount++
    installedHooks.push(hookName)
  }

  if (installedCount > 0) {
    console.log(`\n✅ Installed ${installedCount} hooks:`)
    installedHooks.forEach(name => console.log(`   📎 ${name}`))
  } else {
    console.log('\n⚠️  No hooks configured. Add hooks to your config file.')
  }
}

/**
 * 卸载所有 hooks（删除生成的脚本）
 */
function uninstall(cwd) {
  const hooksDir = path.join(cwd, GIT_HOOKS_DIR)

  if (!fs.existsSync(hooksDir)) {
    console.log('ℹ️  No hooks directory found.')
    return
  }

  let removedCount = 0
  for (const hookName of SUPPORTED_HOOKS) {
    const hookFilePath = path.join(hooksDir, hookName)
    if (fs.existsSync(hookFilePath)) {
      // 检查是否是我们生成的 hook（通过 shebang 注释判断）
      const content = fs.readFileSync(hookFilePath, 'utf-8')
      if (content.includes('Generated by my-hooks')) {
        fs.unlinkSync(hookFilePath)
        removedCount++
      }
    }
  }

  console.log(`🗑️  Removed ${removedCount} hooks`)
}

/**
 * 列出当前已安装的 hooks
 */
function list(cwd) {
  const hooksDir = path.join(cwd, GIT_HOOKS_DIR)

  if (!fs.existsSync(hooksDir)) {
    console.log('ℹ️  No hooks directory found.')
    return
  }

  console.log('\n📋 Installed Git Hooks:\n')
  let found = false

  for (const hookName of SUPPORTED_HOOKS) {
    const hookFilePath = path.join(hooksDir, hookName)
    if (fs.existsSync(hookFilePath)) {
      found = true
      const stat = fs.statSync(hookFilePath)
      const isExecutable = !(stat.mode & 0o111) === 0
      console.log(
        `   ${isExecutable ? '✅' : '⚠️ '} ${hookName.padEnd(20)} ` +
        `${stat.size.toString().padStart(5)} bytes  ` +
        `${stat.mtime.toLocaleString()}`
      )
    }
  }

  if (!found) {
    console.log('   (none)')
  }
}

// ==================== CLI 入口 ====================
const args = process.argv.slice(2)
const command = args[0]

switch (command) {
  case 'install':
    install(process.cwd())
    break
  case 'uninstall':
    uninstall(process.cwd())
    break
  case 'list':
  case 'ls':
    list(process.cwd())
    break
  default:
    console.log(`
Usage: my-hooks <command>

Commands:
  install     Install all configured hooks
  uninstall   Remove all managed hooks
  list        List installed hooks

Configuration files (.hooksrc example):
{
  "pre-commit": ["npm run lint", "npm run format"],
  "commit-msg": "commitlint --edit $HOOK_ARGS",
  "pre-push": "npm test"
}
    `)
}
```

3. **配置示例**
   ```json
   // .hooksrc
   {
     "pre-commit": [
       "lint-staged",
       { "command": "tsc --noEmit", "ignoreFail": false }
     ],
     "commit-msg": "commitlint --edit $HOOK_ARGS",
     "pre-push": "vitest run"
   }
   ```

4. **与 Husky 的对比**
   | 维度 | Husky | 我们的实现 |
   |------|-------|-----------|
   | 安装方式 | `husky install` + `.husky/` 目录 | `my-hooks install` 直接写 `.git/hooks/` |
   | 配置方式 | 独立 shell 脚本 | JSON/YAML 配置文件 |
   | 版本管理 | hook 脚本纳入 Git 管理 | 不纳入 Git（自动生成） |
   | 兼容性 | v4/v5/v9 行为差异大 | 简单稳定 |

### 🔍 追问链
1. **如何让 hook 脚本能够接收 Git 参数（如 commit-msg 的 commit 文件路径）？**
   → Shell 脚本中通过 `$@` 或 `$1` 接收参数，传递给实际命令
2. **如何避免覆盖用户手动创建的 hook？**
   → 检查文件的 shebang 或特殊注释标记；只管理自己生成的 hook
3. **Windows 系统下 Git Hooks 有什么特殊之处？**
   → Windows 下 `.git/hooks` 中的文件需要 `.sh` 后缀才能被执行；或者使用 Git Bash

---

## Q45: Webpack 的 Loader 执行机制是怎样的？请说明 Loader 的 Pitch 阶段和 Normal 阶段。
- **难度**：★★★
- **知识点**：Webpack / Loader / 执行机制 / Pitching Loader
- **题型**：简答题

### 参考答案要点：

1. **Loader 链的基础概念**
   ```javascript
   use: [
     'loader-A',  // 第 1 个（后执行 normal）
     'loader-B',  // 第 2 个
     'loader-C',  // 第 3 个（先执行 normal）
   ]
   ```

2. **两个阶段**
   ```
   Loader 链: [A, B, C]
   
   Pitch 阶段（从左到右）：
   A.pitch() → B.pitch() → C.pitch()
   
   Normal 阶段（从右到左）：
   C.normal() → B.normal() → A.normal()
   
   整体流程：
   A.pitch ──→ B.pitch ──→ C.pitch
                              ↓ (返回结果或继续)
   A.normal ←── B.normal ←── C.normal (接收源文件内容)
   ```

3. **Pitch 阶段的作用**
   - 在 Normal 阶段之前执行
   - 可以**拦截**后续 loader 的执行
   - 如果 pitch 返回了值，则跳过后续的 pitch 和 normal 阶段
   - 典型用途：`style-loader` 通过 pitch 先注入 CSS 导入逻辑

4. **Pitch Loader 示例**
   ```javascript
   // 一个带 pitch 的 loader
   module.exports = function(source) {
     // Normal 阶段：处理源码
     return `/* processed by my-loader */\n${source}`
   }

   // Pitch 阶段：前置处理
   module.exports.pitch = function(remainingRequest, precedingRequest, data) {
     // remainingRequest: 后续 loader 链的请求字符串
     // precedingRequest: 前一个 loader 的路径
     // data: 在 pitch 和 normal 间共享的数据对象
   
     // 如果返回非 undefined，跳过后续所有 loader
     // if (someCondition) {
     //   return '// skipped!'
     // }
   }
   ```

5. **实际案例：style-loader 的 pitch 机制**
   ```javascript
   // style-loader 简化原理
   pitch(remainingRequest) {
     // 在 pitch 阶段就返回 JS 代码
     // 这段代码会在运行时去 require CSS 内容
     return `
       var style = require(${remainingRequest});
       style.use();
       module.exports = {};
     `
     // 因为 pitch 返回了值，后续的 css-loader 不会在 normal 阶段执行
     // 而是等到运行时动态 require 时才执行
   }
   ```

6. **Loader 的上下文（this）**
   - `this.callback(err, content, sourceMap, ast)`：异步回调
   - `this.async()`：标记为异步 loader
   - `this.getOptions(schema)`：获取 loader 选项（Webpack5 推荐）
   - `this.cacheable()`：控制缓存
   - `this.resourcePath` / `this.resourceQuery`：资源路径

### 🔍 追问链
1. **inline loader（内联 loader）和配置文件中 loader 的优先级？**
   → inline > pre > normal > post（!前缀表示 inline，!- 表示忽略 pre/post）
2. **如何编写一个异步 Loader？**
   → 调用 `this.async()` 获得回调函数，异步操作完成后调用 callback
3. **Loader 之间如何传递额外数据？**
   → 使用 `pitch` 的第三个参数 `data` 对象，在 pitch 和 normal 间共享

---

## Q46: Vite 的环境变量和模式（Mode）是如何工作的？有哪些最佳实践？
- **难度**：★★★
- **知识点**：Vite / 环境变量 / 模式 / 配置管理
- **题型**：简答题

### 参考答案要点：

1. **环境变量的分类**
   ```
   VITE_ 开头的变量：暴露给客户端代码（打包进 bundle）
   非 VITE_ 开头的变量：仅在 vite.config.js 和插件中使用
   内置变量：MODE、BASE_URL、PROD、DEV、SSR
   ```

2. **加载优先级**
   ```
   .env.[mode].local    ← 最高优先级（本地，不提交 Git）
   .env.[mode]           ← 模式特定
   .env.local            ← 本地通用
   .env                  ← 通用基础
   ```

3. **工作原理**
   ```javascript
   // 开发阶段
   // Vite Dev Server 拦截 import 语句
   // 将 import.meta.env.VITE_xxx 替换为实际值
   
   // 生产阶段（Rollup 构建）
   // 通过 define 插件做全局替换
   define: {
     'import.meta.env.VITE_API_URL': JSON.stringify('https://api.example.com'),
     'import.meta.env.MODE': '"production"',
   }
   ```

4. **类型安全（TypeScript 支持）**
   ```typescript
   // src/env.d.ts
   /// <reference types="vite/client" />

   interface ImportMetaEnv {
     readonly VITE_API_BASE_URL: string
     readonly VITE_APP_TITLE: string
     readonly VITE_ENABLE_MOCK: boolean
     readonly VITE_SENTRY_DSN: string
   }

   interface ImportMeta {
     readonly env: ImportMetaEnv
   }
   ```

5. **最佳实践**
   - **敏感信息绝不放入 `.env.*` 文件提交 Git**
   - 使用 `.env.example` 作为模板（含占位符）
   - CI/CD 中通过 Secrets 注入环境变量
   - 区分构建时变量和运行时变量
   - 避免在客户端代码中出现条件分支过多（影响 tree shaking）

6. **高级用法**
   ```javascript
   // vite.config.ts - 动态加载环境变量
   export default defineConfig(({ mode }) => {
     // 加载对应模式的 env 文件
     const env = loadEnv(mode, process.cwd(), '')
     
     // 可以根据 env 做条件配置
     return {
       define: {
         __APP_CONFIG__: JSON.stringify({
           apiBaseUrl: env.VITE_API_BASE_URL,
           mode,
         }),
       },
       plugins: [
         // 仅在生产环境启用某插件
         mode === 'production' && SomePlugin(),
       ].filter(Boolean),
     }
   })
   ```

### 🔍 追问链
1. **如何在浏览器运行时动态获取环境变量（而非构建时硬编码）？**
   → 通过 `/config.json` 接口返回；或 `window.__APP_CONFIG__` 由后端模板注入
2. **多个微前端应用的环境变量如何协调？**
   → 各应用独立管理自己的 env；共享变量通过主应用传递或 runtime config
3. **Vite 的 loadEnv 函数的实现原理？**
   → 读取对应优先级的 .env 文件，解析键值对，过滤非 VITE_ 前缀的变量

---

## Q47: 请设计一套 Monorepo 下包的测试策略。
- **难度**：★★★
- **知识点**：Monorepo / 测试策略 / CI/CD / Turborepo
- **题型**：方案设计题

### 参考答案要点：

1. **Monorepo 测试挑战**
   - 包数量多，全量测试耗时长
   - 包间有依赖关系，改动传播需要正确识别
   - 不同包可能需要不同的测试框架/配置
   - 需要平衡测试覆盖率与 CI 时间成本

2. **分层测试策略**
   ```
   Layer 1: 单元测试（每个包独立）
   ├── 核心工具库：覆盖率要求 > 90%
   ├── UI 组件库：覆盖率要求 > 80%
   └── 应用层：关键业务逻辑 > 70%

   Layer 2: 集成测试（包与包之间）
   ├── API 层集成测试
   ├── Store 集成测试
   └── 跨包功能测试

   Layer 3: E2E 测试（应用级别）
   ├── 关键用户路径
   └── 冒烟测试（Smoke Test）
   ```

3. **增量测试方案（Turborepo 实现）**
   ```javascript
   // turbo.json
   {
     "pipeline": {
       "test": {
         "dependsOn": ["build"],  // 先 build 再 test
         "outputs": [],            // 无产物输出
         "inputs": ["src/**/*.tsx", "test/**/*.ts"]  // 输入范围
       },
       "test:e2e": {
         "dependsOn": ["build"],
         "outputs": [],
         "cache": false  // E2E 通常不缓存
       }
     }
   }
   ```

   ```bash
   # 只测试受影响的包及其下游
   turbo run test --filter='...[HEAD]^'

   # 测试特定包及其依赖
   turbo run test --filter=@repo/ui...

   # 并行运行所有测试
   turbo run test --parallel
   ```

4. **测试配置共享**
   ```javascript
   // packages/config/jest.config.js
   module.exports = {
     testEnvironment: 'jsdom',
     moduleNameMapper: {
       '^@/(.*)$': '<rootDir>/src/$1',
     },
     setupFilesAfterSetup: ['<rootDir>/tests/setup.ts'],
     collectCoverageFrom: [
       'src/**/*.{ts,tsx}',
       '!src/**/*.d.ts',
       '!src/**/*.stories.{ts,tsx}',
     ],
     coverageThreshold: {
       global: {
         branches: 70,
         functions: 80,
         lines: 80,
         statements: 80,
       },
     },
   }

   // 各包继承并扩展
   // packages/ui/jest.config.js
   const baseConfig = require('@repo/config/jest')
   module.exports = {
     ...baseConfig,
     // UI 包特有配置
     moduleNameMapper: {
       ...baseConfig.moduleNameMapper,
       '^@ui/(.*)$': '<rootDir>/src/$1',
     },
   }
   ```

5. **CI 流水线设计**
   ```yaml
   # .github/workflows/test.yml
   name: Test Pipeline
   on: [push, pull_request]

   jobs:
   unit-test:
     runs-on: ubuntu-latest
     steps:
       - uses: actions/checkout@v3
       - uses: pnpm/action-setup@v2
       - uses: actions/setup-node@v3
         with:
           node-version: 18
           cache: 'pnpm'
       - run: pnpm install
       # 增量测试：只测受影响的包
       - run: pnpm turbo test --filter='...[HEAD]^'

   e2e-test:
     needs: unit-test
     runs-on: ubuntu-latest
     steps:
       - uses: actions/checkout@v3
       - run: pnpm install && pnpm turbo build --filter=www
       - run: pnpm turbo test:e2e --filter=www
   ```

6. **测试隔离注意事项**
   - 每个包的测试应该独立运行，不依赖其他包的全局状态
   - 使用 mock 隔离外部依赖（数据库、API 等）
   - 并行测试时注意端口冲突
   - 共享 fixtures 通过 workspace 协议引用

### 🔍 追问链
1. **如何处理 Monorepo 中包间的 Mock 问题？**
   → 创建 shared testing utilities 包，提供通用 mock 工厂函数
2. **测试报告如何聚合？**
   → 使用 Jest 的 --reporters 选项配合自定义 reporter 合并；或 CI 层面收集
3. **如何保证跨包重构的安全性？**
   → 结合 typedoc/typecheck + 高覆盖率单元测试 + 变更包的集成测试

---

## Q48: Docker 前端容器化的高级实践有哪些？（多阶段构建、镜像优化、安全加固）
- **难度**：★★★
- **知识点**：Docker / 容器化 / 安全 / 镜像优化 / DevOps
- **题型**：综合应用题

### 参考答案要点：

1. **多阶段构建详解**
   ```dockerfile
   # ========== Stage 1: 依赖安装 ==========
   FROM node:18-alpine AS deps
   WORKDIR /app
   COPY package.json pnpm-lock.yaml ./
   RUN corepack enable && corepack prepare pnpm@latest --activate \
     && pnpm install --frozen-lockfile --prod=false

   # ========== Stage 2: 构建 ==========
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN corepack enable && corepack prepare pnpm@latest--activate \
     && pnpm build

   # ========== Stage 3: 生产镜像（最小化） ==========
   FROM nginx:alpine AS runner
   # 使用非 root 用户运行
   RUN addgroup -g 1001 -S nodejs \
     && adduser -S nextjs -u 1001
   # 复制构建产物
   COPY --from=builder /app/dist /usr/share/nginx/html
   # 自定义 nginx 配置
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   # 安全头
   RUN chmod -R 755 /usr/share/nginx/html
   EXPOSE 8080
   USER nextjs
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **镜像优化技巧**
   ```dockerfile
   # 1. 利用 Docker 层缓存（顺序很重要！）
   COPY package*.json ./    # 先复制依赖声明
   RUN npm ci               # 安装依赖（这层会缓存）
   COPY . .                 # 最后复制源码（频繁变化）

   # 2. 使用 .dockerignore
   # .dockerignore
   node_modules
   dist
   .git
   *.md
   .env*

   # 3. 使用 alpine 最小化基础镜像
   # 4. 清理不必要的包（apk 缓存等）
   RUN apk add --no-cache ... && rm -rf /var/cache/apk/*

   # 5. 多阶段构建最终只保留必要文件
   ```

3. **安全加固清单**
   ```dockerfile
   # 1. 使用非 root 用户
   RUN useradd -m appuser
   USER appuser

   # 2. 最小权限原则
   # 只开放必要端口
   EXPOSE 8080

   # 3. 只读文件系统（Kubernetes 层面）
   # securityContext:
   #   readOnlyRootFilesystem: true

   # 4. 不要在镜像中硬编码密钥
   # 使用运行时注入或 Secrets Manager

   # 5. 定期更新基础镜像
   FROM node:18-alpine@sha256:abc123...  # 固定 digest

   # 6. 镜像扫描
   # docker scan my-image
   # 或 CI 中集成 Trivy / Snyk
   ```

4. **CI/CD 中的 Docker 实践**
   ```yaml
   # GitHub Actions - 构建并推送镜像
   - name: Build and Push Docker Image
     uses: docker/build-push-action@v4
     with:
       context: .
       file: ./Dockerfile
       push: true
       tags: |
         ghcr.io/myorg/frontend:${{ github.sha }}
         ghcr.io/myorg/frontend:latest
       cache-from: type=gha
       cache-to: type=gha,mode=max
   ```

5. **高级场景**
   - **多架构构建**：`docker buildx build --platform linux/amd64,linux/arm64`
   - **Distroless 镜像**：Google 出品的极简运行时镜像（无 shell、包管理器）
   - **BuildKit 缓存挂载**：`--mount=type=cache,target=/root/.local` 加速 pip/npm
   - **SBOM（软件物料清单）**：满足合规要求的依赖清单

### 🔍 追问链
1. **Docker 镜像过大（>500MB）怎么排查和优化？**
   → `docker history` 分析各层大小；检查是否有不必要的文件；使用 dive 工具分析
2. **如何在 Kubernetes 中安全地运行前端容器？**
   → SecurityContext（readOnlyRootFilesystem、runAsNonRoot、capabilities.drop）；NetworkPolicy
3. **前端容器需要健康检查吗？**
   → 需要！即使只是静态文件服务，也要配置 livenessProbe/readinessProbe

---

## Q49: 【选择题】关于前端工程化的综合知识考察。

**题目 1**：以下关于 CommonJS 和 ESM 的说法，**错误**的是？

A. CommonJS 的 `require()` 是同步加载，ESM 的 `import` 是异步加载  
B. ESM 存在 TDZ（暂时性死区），CommonJS 没有  
C. CommonJS 的 `module.exports` 和 `exports` 指向同一对象  
D. ESM 可以在 if 语句中进行动态导入，CommonJS 不可以  

**答案**：D  
**解析**：ESM 的静态 `import` 不能在 if 中使用，但动态 `import()` 可以；CommonJS 的 `require()` 反而可以在任何地方调用（包括 if 语句）。D 选项表述不准确。

---

**题目 2**：以下哪种 Tree Shaking 场景**一定不会生效**？

A. 使用 `export const foo = () => {}` 导出但未被引用的函数  
B. 从 CommonJS 模块 `require()` 后 `export default` 出去的对象  
C. 带有副作用的 ES Module（如执行了 `window.globalVar = 1`）  
D. 被 re-export（桶文件）的未使用导出  

**答案**：B  
**解析**：CommonJS 模块的导出无法被 Tree Shaking，因为它是动态的值拷贝，编译期无法确定哪些属性被使用。C 选项如果配置了 `"sideEffects": false` 且确实没有副作用也可以生效。

---

**题目 3**：关于 Webpack HMR，以下说法**正确**的是？

A. HMR 替换了整个页面  
B. `module.hot.accept()` 用于注册模块更新的回调  
C. HMR 只能在 Webpack 中使用，Vite 不支持  
D. HMR 更新后，组件状态一定会丢失  

**答案**：B  
**解析**：A 错误，HMR 是模块级替换不是整页刷新；C 错误，Vite 也有优秀的 HMR；D 错误，React Fast Refresh 等方案可以保持组件状态。

---

**题目 4**：以下关于 pnpm 的说法，**错误**的是？

A. pnpm 使用符号链接 + 内容寻址存储管理依赖  
B. pnpm 严格模式下不存在幽灵依赖问题  
C. pnpm 的 workspace 功能类似于 Lerna  
D. pnpm 安装速度一定比 npm 快  

**答案**：D  
**解析**：pnpm 的首次安装由于需要创建链接和计算内容寻址，不一定比 npm 快；但在重复安装和大型项目中通常更快。D 选项"一定"过于绝对。

---

**题目 5**：关于 CI/CD 流水线，以下**最佳实践**是？

A. 将 `.env.production` 提交到 Git 仓库以便 CI 使用  
B. PR 合并到 main 后自动部署到 Production  
C. Lint、Test、Build 应该作为 PR 合并前的必过门禁  
D. Source Map 应该和生产代码一起部署到 CDN  

**答案**：C  
**解析**：A 错误，敏感信息不应提交；B 应该是 Staging 自动部署，Production 通常需要审批或 tag；D 错误，Source Map 不应公开部署。

---

## Q50: 【综合题】假设你加入了一个新的团队，发现他们的前端项目存在以下问题，请给出系统性的改进方案。

**问题描述**：
1. 项目启动需要 60 秒以上
2. 没有代码规范，每个人风格不同
3. 经常出现"在我机器上能跑"的问题
4. 没有自动化测试
5. 部署靠 FTP 手动上传
6. 新人入职需要 3 天才能跑起来

### 参考答案要点：

这是一个典型的**工程化成熟度为 Level 1** 的团队，需要系统性提升。以下是分阶段的改进方案：

#### Phase 1：快速见效（第 1-2 周）

**1.1 解决"在我机器上能跑"**
```bash
# 统一 Node 版本管理
echo "18" > .nvmrc
# 或使用 Volta（自动切换）
volta pin node@18

# 锁定包管理器和锁文件
echo '{"packageManager": "pnpm@8.15.0"}' > package.json  # Corepack
```

**1.2 引入基础代码规范**
```bash
# 一键配置
pnpm add -D eslint prettier eslint-config-prettier eslint-plugin-react
pnpm add -D husky lint-staged
```
- 创建 `.eslintrc.js` 和 `.prettierrc`
- 配置 `prepare` 脚本自动安装 husky
- **不要一开始就追求完美规则**，先用 warn 让大家适应

**1.3 解决启动慢的问题**
```javascript
// 如果是 Webpack 项目
// 1. 升级到 Webpack5（开启 filesystem cache）
// 2. 配置 cache.type: 'filesystem'
// 3. 或者考虑迁移到 Vite（如果是标准 SPA）

// 如果已经是 Webpack5
cache: {
  type: 'filesystem',
  buildDependencies: { config: [__filename] }
},
```

#### Phase 2：流程建设（第 3-4 周）

**2.1 建立 CI 流水线**
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm build
```

**2.2 编写新人 Onboarding 文档**
```markdown
# 新人入职指南

## 环境准备（10 分钟）
1. 安装 Node.js 18+（推荐 Volta）
2. 克隆仓库
3. pnpm install
4. cp .env.example .env.local
5. pnpm dev

## 常见问题
Q: 端口被占用？→ 修改 vite.config.js 的 server.port
Q: API 报错？→ 检查 .env.local 的配置
```

**2.3 引入自动化部署**
- 选择目标：GitHub Pages / Vercel / Netlify / S3+CloudFront
- 从 Staging 环境开始（PR 自动预览）
- 逐步替代手动 FTP 上传

#### Phase 3：质量提升（第 5-8 周）

**3.1 引入测试**
```bash
# 从最简单的开始：关键工具函数的单测
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```
- 先给 utils/ 目录加单测（投入产出比最高）
- 设置最低覆盖率门槛（先低后高：50% → 70% → 80%）
- CI 中强制测试通过

**3.2 深化代码规范**
- 抽取团队 ESLint 配置包：`@company/eslint-config`
- 加入 Commitlint 强制 Conventional Commits
- PR Template 要求填写 Checklist

**3.3 性能监控接入**
```javascript
// 接入 Sentry（错误监控）
import * as Sentry from '@sentry/browser'
Sentry.init({ dsn: import.meta.env.VITE_SENTRY_DSN })

// 接入 Web Vitals（性能指标）
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'
getCLS(console.log)
getLCP(console.log)
```

#### Phase 4：文化沉淀（持续）

**4.1 建立技术分享机制**
- 双周一次 Tech Talk（轮流主讲）
- 重要决策写 ADR（Architecture Decision Record）

**4.2 度量与迭代**
```
月度指标跟踪：
- 构建时间趋势（目标：<30s）
- PR 平均响应时间（目标：<4h）
- 线上错误率（目标：<0.1%）
- Lighthouse Performance（目标：>90）
- 新人 Onboarding 时间（目标：<半天）
```

**4.3 进阶方向**
- 考虑 Monorepo 拆分（如果有多项目）
- 引入 Design System（如果 UI 一致性问题严重）
- 探索微前端（如果巨石应用维护困难）

### 🔍 追问链
1. **如果团队对改革抵触情绪强烈怎么办？**
   → 小步快跑，先展示价值（如自动格式化节省的时间），再逐步推广；争取 TL/Manager 的支持
2. **如何衡量工程化改进的效果？**
   → 建立量化指标体系（构建时间、部署频率、错误率、新人上手时间等），定期回顾
3. **有限的人力下应该优先做什么？**
   → 优先级排序：统一环境（消除"在我机器上能跑"）> 基础规范（Husky）> CI 门禁 > 测试 > 监控

---

# 附录：工程化知识体系速查表

## 📊 知识图谱总览

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Frontend Engineering Knowledge Graph          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐                                                    │
│  │  模块化体系   │  CJS / ESM / UMD / AMD / SystemJS                │
│  └──────┬───────┘                                                    │
│         ↓                                                            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│  │  包管理器    │    │  构建工具     │    │  代码质量     │             │
│  │ npm/yarn/   │◄──►│ Webpack/Vite │◄──►│ ESLint/Prettier│            │
│  │ pnpm/bun    │    │ Rspack/esbuild│    │ Stylelint    │             │
│  └──────┬───────┘    └──────┬──────┘    └──────┬──────┘             │
│         │                   │                   │                     │
│         ↓                   ↓                   ↓                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│  │  Monorepo   │    │  CSS 工程    │    │  Git 工作流   │             │
│  │ Turborepo/  │    │ Sass/Less/  │    │ Flow/Branch  │             │
│  │ Nx/Lerna    │    │ Tailwind/   │    │ Conventional │             │
│  │ Changesets  │    │ PostCSS/    │    │ Changelog    │             │
│  └──────┬───────┘    │ CSS-in-JS   │    └──────┬──────┘             │
│         │            └─────────────┘           │                     │
│         ↓                                       ↓                     │
│  ┌─────────────┐                        ┌─────────────┐             │
│  │  CI/CD      │                        │  部署与运维  │             │
│  │ GitHub Actions│                       │ Docker/K8s  │             │
│  │ Jenkins/CD  │                        │ CDN/Edge    │             │
│  │ 蓝绿/金丝雀  │                        │ 监控/告警    │             │
│  └─────────────┘                        └─────────────┘             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 🗂️ 工具链选型速查

| 类别 | 推荐方案 | 替代方案 | 选型依据 |
|------|----------|----------|----------|
| **包管理器** | pnpm | yarn (berry) / bun | 磁盘效率、幽灵依赖防护 |
| **构建工具（新项目）** | Vite | Rspack / Webpack5 | DX 体验、生态成熟度 |
| **构建工具（遗留项目）** | Webpack5 | Rspack | 兼容性、迁移成本 |
| **CSS 方案** | Tailwind CSS + SCSS | CSS Modules / UnoCSS | 原子化 + 可编程性 |
| **代码规范** | ESLint + Prettier | Biome (新兴) | 生态、IDE 支持 |
| **Git Hooks** | Husky (v9+) | simple-git-hooks / lefthook | 易用性、兼容性 |
| **Monorepo** | pnpm workspace + Turborepo | Nx / Rush | 简洁 vs 功能丰富 |
| **版本发布** | Changesets | semantic-release | 人工审核 vs 全自动 |
| **CI 平台** | GitHub Actions | GitLab CI / Jenkins | 生态、免费额度 |
| **容器化** | Docker (multi-stage) | Distroless | 大小、安全性 |
| **错误监控** | Sentry | Datadog / 阿里云 ARMS | 开源、前端专精 |
| **性能监控** | Web Vitals + Lighthouse CI | 针对平台 APM | 标准 vs 商业 |

## 📈 成熟度评估模型

| 等级 | 名称 | 特征 | 关键指标 |
|------|------|------|----------|
| **L1** | 混乱期 | 无规范、手动部署、无测试 | 构建时间不可控、频繁线上故障 |
| **L2** | 规范期 | 有基础 lint、简单 CI | 构建时间稳定、有基本质量门禁 |
| **L3** | 自动化 | 完整 CI/CD、自动化测试、监控 | 部署频率高、错误率可控 |
| **L4** | 优化期 | 性能优化、Monorepo、工程化度量 | 构建效率高、研发效能可见 |
| **L5** | 卓越期 | 自愈系统、智能化、平台化 | 工程化驱动业务创新 |

## 🔑 核心命令速查

```bash
# ===== 包管理 =====
pnpm install                    # 安装依赖
pnpm add -D eslint             # 添加开发依赖
pnpm --filter @repo/ui build   # 只构建指定包
pnpm -r run lint               # 所有包执行 lint

# ===== Git =====
git rebase -i HEAD~3           # 交互式变基（合并 commit）
git reflog                     # 查看 HEAD 历史（找回丢失的 commit）
git cherry-pick <sha>          # 摘取某个 commit

# ===== 构建调试 =====
npx webpack --profile          # 生成构建分析报告
npx vite build --debug module  # Vite 调试模块解析
npx madge --circular src/      # 检测循环依赖

# ===== 代码质量 =====
npx eslint . --fix             # 检查并自动修复
npx prettier --write .         # 格式化所有文件
npx commitlint --from=HEAD~1   # 校验最近一条 commit

# ===== Monorepo =====
npx changeset add              # 添加变更记录
npx changeset version          # 版本号升级
npx changeset publish          # 发布到 npm
turbo run build --filter='...[HEAD]^'  # 增量构建

# ===== Docker =====
docker build -t myapp .        # 构建镜像
docker images                  # 查看镜像
docker system df                # 磁盘占用分析
docker scan myapp              # 安全扫描
```

## 📚 学习路线建议

```
初级（0-2 年）：
  模块化基础 → npm/yarn 使用 → Webpack 基础配置
  → Git 常用操作 → ESLint/Prettier 配置
  → 能独立完成项目的构建和部署

中级（2-4 年）：
  Webpack 深度（Loader/Plugin/HMR/优化）
  → Vite 原理与实践
  → CI/CD 流水线搭建
  → Monorepo 实践（pnpm workspace）
  → CSS 工程化（Tailwind/CSS Modules）

高级（4-6 年）：
  手写 Loader/Plugin → 手写简易打包器
  → 构建工具源码阅读（Webpack/Vite/Rollup）
  → 工程化体系设计与落地
  → 性能优化体系建设
  → 团队工程化文化建设

专家（6 年+）：
  构建工具内核贡献 → 自研工程化平台
  → 大规模 Monorepo 治理
  → 跨端工程化方案
  → 工程化前沿探索（Rust 工具链/边缘计算/AI 辅助）
```

---

> **文档信息**
> - **总题数**：50 道（基础 15 + 进阶 20 + 专家 15）
> - **追问链题目**：17 道
> - **手写实现题目**：5 道（Q36 Bundle / Q37 HMR / Q44 Git Hooks / 含架构设计 Q38/Q39）
> - **选择题**：Q49（5 道）
> - **最后更新**：2026-06-15