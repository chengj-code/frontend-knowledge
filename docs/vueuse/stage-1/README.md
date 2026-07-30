# 阶段 1：基础工具函数（1-2 天）

> 理解 VueUse 的代码风格和基础类型技巧

## 学习清单

| 序号 | 文件 | 行数 | 核心知识点 |
|------|------|------|-----------|
| 1 | `packages/shared/toValue/index.ts` | 11 | 纯 re-export，理解模块边界 |
| 2 | `packages/shared/get/index.ts` | 14 | `MaybeRef` 概念、函数重载、`unref` |
| 3 | `packages/shared/set/index.ts` | 18 | 函数重载、泛型约束 `K extends keyof O` |
| 4 | `packages/shared/isDefined/index.ts` | 13 | 类型守卫 `v is Exclude<T, null \| undefined>` |

## 阅读顺序

```
toValue → get → set → isDefined
```

## 学习目标

- [ ] 理解 `MaybeRef<T>` = `T | Ref<T>` 的核心概念
- [ ] 掌握 `unref` 的作用：安全地从 Ref 或普通值中取值
- [ ] 掌握 TypeScript 函数重载的写法和用途
- [ ] 掌握类型守卫在 composable 中的应用

## 练习

1. 阅读 `get/index.ts`，理解为什么需要两个重载签名
2. 阅读 `isDefined/index.ts`，理解类型守卫如何缩小类型范围
3. 查看 `packages/shared/utils/types.ts` 中的 `MaybeRef`、`MaybeRefOrGetter` 定义

## 笔记

在这里记录你的学习笔记。