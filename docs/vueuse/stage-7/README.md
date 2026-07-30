# 阶段 7：专家级抽象（3-5 天）

> 掌握最高级的设计模式：建造者、代理、双向绑定

## 学习清单

| 序号 | 文件 | 行数 | 核心知识点 |
|------|------|------|-----------|
| 37 | `packages/shared/until/index.ts` | 232 | 建造者模式 + 类型翻转 |
| 38 | `packages/core/useMagicKeys/index.ts` | 181 | Proxy 懒初始化 + 组合键 |
| 39 | `packages/core/useAnimate/index.ts` | 324 | RAF 状态同步 + 双向绑定 |
| 40 | `packages/core/useFetch/index.ts` | 658 | 综合：工厂 + 链式 + PromiseLike |

## 阅读顺序

```
until → useMagicKeys → useAnimate → useFetch（最后，综合所有模式）
```

## 学习目标

- [ ] **核心目标**：理解 VueUse 中最高级的 TypeScript 类型体操
- [ ] 掌握建造者模式的链式 API 设计
- [ ] 掌握 Proxy 在 composable 中的应用（懒初始化）
- [ ] 掌握 `WritableComputedRef` 的双向绑定模式
- [ ] 掌握 `PromiseLike` 接口实现（thenable）
- [ ] 掌握 `createFetch` 工厂模式

## 关键代码解读

**until 的建造者模式：**

```ts
// 链式 API: until(x).toBe(value)
//          until(x).not.toBe(value)
//          until(x).changed()
//          until(x).changedTimes(n)
//          until(x).toMatch(pred)
//          until(x).toContains(value)

// 关键：getter 属性实现惰性 not
get not() {
  return createUntil(source, true as Not)  // 翻转 Not 类型参数
}
```

**until 的类型翻转：**

```ts
// Not 为 false 时：等到值为 U，返回 U
// Not 为 true 时：等到值不为 U，返回 Exclude<T, U>
type UntilValueInstance<T, Not extends boolean> = {
  toBe: <U extends T>(
    value: U,
    options?: UntilToBeOptions,
  ) => Promise<Not extends true ? T : U>
}
```

**useMagicKeys 的 Proxy 懒初始化：**

```ts
const proxy = new Proxy(props, {
  get(_, prop: string) {
    // 按需创建 ref：首次访问某个键时才创建
    if (!refs.has(prop)) {
      refs.set(prop, computed(() => pressedKeys.has(prop)))
    }
    return refs.get(prop)
  },
})

// 组合键访问：proxy['ctrl+c'] 通过 Proxy 分割为 ctrl 和 c
// 然后递归访问 proxy.ctrl && proxy.c
```

**useMagicKeys 的 Meta 键 workaround：**

```ts
// macOS 上 keyup 事件不会在 Meta 键组合中触发其他键
// 解决方案：当 Meta 键释放时，清除所有依赖 Meta 的组合键
useEventListener('keyup', (e) => {
  if (e.key === 'Meta') {
    // 清除所有被 Meta 键按住时按下的键
    for (const key of metaDeps)
      pressedKeys.delete(key)
    metaDeps.clear()
  }
})
```

**useFetch 的 PromiseLike 实现：**

```ts
// 让 useFetch 的返回值可以直接 await
// const data = await useFetch('/api/data').json()
const then: PromiseLike<UseFetchReturn<T>>['then'] = (onfulfilled, onrejected) =>
  finished.value
    ? Promise.resolve(response).then(onfulfilled, onrejected)
    : new Promise<any>((resolve, reject) => {
        // 等待请求完成
        onFetchFinally(() => resolve(response))
      }).then(onfulfilled, onrejected)
```

**useFetch 的链式 API：**

```ts
// .json() 设置响应类型为 JSON
// .text() 设置响应类型为 Text
// .post() 设置请求方法为 POST
// .get() 设置请求方法为 GET
// 这些方法返回同一个对象，只是修改内部状态

function json<T>() { return { ...returnData, json: () => json<T>() as any } as any }
function text() { return { ...returnData, text: () => text() as any } as any }
```

## 详细注释文档

| Hook | 注释文档 | 核心知识点 |
|------|----------|-----------|
| until | [until.md](./until.md) | 建造者模式、类型翻转、Promise.race 超时控制 |
| useMagicKeys | [useMagicKeys.md](./useMagicKeys.md) | Proxy 懒初始化、组合键解析、Meta 键 workaround |
| useAnimate | [useAnimate.md](./useAnimate.md) | WritableComputedRef 双向绑定、useRafFn 状态同步、Web Animations API |
| useFetch | [useFetch.md](./useFetch.md) | 工厂模式、链式 API、PromiseLike、防竞态机制 |

## 练习

1. **精读 until**：
   - 理解 `Not` 类型参数如何实现类型翻转
   - 理解 getter 属性 `get not()` 如何返回新的 Until 实例
   - 理解 `Promise.race` 实现超时的写法
2. **精读 useMagicKeys**：
   - 理解 Proxy 的 get trap 如何实现懒初始化
   - 理解组合键 `ctrl+c` 的解析流程
   - 理解 `metaDeps` Set 如何追踪 Meta 键组合
3. **精读 useAnimate**：
   - 理解 `useRafFn` 如何持续同步 Animation 对象状态
   - 理解 `WritableComputedRef` 的 getter/setter 双向绑定
4. **精读 useFetch**：
   - 画出 `createFetch` → `useFetch` → 链式调用的完整流程
   - 理解 `beforeFetch`/`afterFetch`/`onFetchError` 回调链
   - 理解 `executeCounter` 防竞态机制

## 笔记

在这里记录你的学习笔记。