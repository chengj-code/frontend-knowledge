# VueUse Hook 封装学习计划文档

> 本文件夹包含 VueUse Hook 封装学习计划的各个阶段文档，每个阶段都有独立的 README.md 文件，用于记录学习笔记和进度。

## 开始学习前必读

> **每次学习前，请先阅读 [STANDARDS.md](./STANDARDS.md) 了解文档规范，再阅读 [PROGRESS.md](./PROGRESS.md) 确认当前进度。**

## 文件夹结构

```
learning-docs/
├── STANDARDS.md              # 文档规范（优先阅读）
├── PROGRESS.md               # 学习进度追踪
├── README.md                 # 本文件，总览和说明
├── stage-1/                  # 阶段 1：基础工具函数
│   └── README.md             # 阶段 1 的学习目标、清单和笔记
├── stage-2/                  # 阶段 2：状态管理 Composable
│   └── README.md             # 阶段 2 的学习目标、清单和笔记
├── stage-3/                  # 阶段 3：定时器与生命周期管理
│   └── README.md             # 阶段 3 的学习目标、清单和笔记
├── stage-4/                  # 阶段 4：事件过滤器与函数增强
│   └── README.md             # 阶段 4 的学习目标、清单和笔记
├── stage-5/                  # 阶段 5：DOM 事件与浏览器 API
│   ├── README.md             # 阶段 5 总览
│   ├── useEventListener.md   # 单 hook 详细文档
│   └── ...
├── stage-6/                  # 阶段 6：高级 Composable
│   ├── README.md             # 阶段 6 总览
│   ├── useStorage.md         # 单 hook 详细文档
│   └── ...
└── stage-7/                  # 阶段 7：专家级抽象
    ├── README.md             # 阶段 7 总览
    ├── until.md              # 单 hook 详细文档
    └── ...
```

## 使用说明

1. **阅读规范**：每次学习前先阅读 `STANDARDS.md`，了解文档组织和编写规范。
2. **查看进度**：打开 `PROGRESS.md` 确认当前学习进度和下一步计划。
3. **按阶段学习**：按照 `stage-1` 到 `stage-7` 的顺序逐步学习。
4. **阅读 README.md**：每个阶段的 README.md 文件包含该阶段的学习目标、学习清单、关键代码解读和练习。
5. **阅读单 hook 文档**：如果阶段中某个 hook 有独立文档（如 `useStorage.md`），优先阅读该文档。
6. **记录笔记**：在对应文档的"笔记"部分记录学习心得和疑问。
7. **完成练习**：按照练习部分的要求完成实践任务。
8. **更新进度**：完成阶段后，更新 `PROGRESS.md` 标记完成状态。

## 学习计划概览

| 阶段 | 主题 | 预计时间 | 核心内容 |
|------|------|----------|----------|
| 1 | 基础工具函数 | 1-2 天 | MaybeRef、函数重载、类型守卫 |
| 2 | 状态管理 Composable | 1-2 天 | 标准返回模式、策略模式、门面模式 |
| 3 | 定时器与生命周期管理 | 2-3 天 | SSR 兼容、生命周期清理、条件返回类型 |
| 4 | 事件过滤器与函数增强 | 2-3 天 | EventFilter 抽象、装饰器模式、组合模式 |
| 5 | DOM 事件与浏览器 API | 3-5 天 | useEventListener、响应式 target、浏览器兼容 |
| 6 | 高级 Composable | 3-5 天 | 序列化策略、状态机、心跳机制 |
| 7 | 专家级抽象 | 3-5 天 | 建造者模式、Proxy 懒初始化、PromiseLike |

## 推荐学习节奏

- **第 1 周**：阶段 1 + 2 + 3（每天 2-3 小时）
- **第 2 周**：阶段 4 + 5（每天 3-4 小时）
- **第 3 周**：阶段 6（每天 3-4 小时）
- **第 4 周**：阶段 7（每天 3-4 小时）

> 总计约 4 周，每天 2-4 小时，可系统掌握 VueUse 的设计思想和封装技巧。

## 相关资源

- [VueUse 官方文档](https://vueuse.org)
- [Vue 3 Composition API 文档](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript 官方文档 - 泛型](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [REPOWIKI.md](./REPOWIKI.md) — 项目架构详解

## 学习检查清单

完成每个阶段后，请参考原始学习计划中的“学习检查清单”部分，确保已掌握所有核心知识点。

---

**提示**：学习过程中遇到问题，可以随时在对应的 README.md 文件中记录，方便后续回顾和解决。