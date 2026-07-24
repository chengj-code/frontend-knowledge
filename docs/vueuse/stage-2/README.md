# 阶段 2：状态管理 Composable（1-2 天）

> 学习 composable 的标准返回模式和基本设计模式

## 学习清单

| 序号 | 文件 | 行数 | 核心知识点 |
|------|------|------|-----------|
| 5 | `packages/shared/useToggle/index.ts` | 54 | 策略模式、条件返回类型、`as const` |
| 6 | `packages/shared/useCounter/index.ts` | 73 | 门面模式、`shallowReadonly`、标准返回结构 |

## 阅读顺序

```
useToggle → useCounter
```

## 学习目标

- [ ] 理解 composable 的标准返回模式：返回对象而非数组
- [ ] 理解 `shallowRef` vs `ref` 的选择依据
- [ ] 理解 `shallowReadonly` 保护内部状态不被外部修改
- [ ] 掌握"根据输入参数返回不同结构"的重载技巧
- [ ] 理解策略模式：通过 options 配置行为差异

## 关键代码解读

**useToggle 的重载设计：**

```ts
// 传入 Ref 时，只返回 toggle 函数（因为外部已有 ref）
export function useToggle(value: Ref<Truthy, Falsy>): UseToggleReturn<Truthy, Falsy>
// 传入普通值时，返回 [value, toggle] 元组
export function useToggle(initialValue?: T): [Ref<Truthy | Falsy>, UseToggleReturn<Truthy, Falsy>]
```

**useCounter 的门面模式：**

```ts
// 封装了 Math.min/Math.max 边界逻辑，暴露简洁的接口
return {
  count: shallowReadonly(count),  // 只读
  inc,    // 增加（自动钳制到 max）
  dec,    // 减少（自动钳制到 min）
  set,    // 设置（自动钳制）
  reset,  // 重置到初始值
}
```

## 练习

1. 阅读 `useToggle/index.ts`，理解 `as const` 在返回值类型推导中的作用
2. 阅读 `useCounter/index.ts`，理解 `Readonly<Ref<number>>` 如何保护状态
3. 尝试自己实现一个 `useToggle`，体会条件返回类型的写法

## 笔记

在这里记录你的学习笔记。