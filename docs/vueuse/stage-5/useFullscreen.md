# useFullscreen 源码详细注释

> 浏览器前缀兼容的典型实现

## 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useFullscreen/index.ts` |
| 代码行数 | 175 行 |
| 所属包 | `@vueuse/core` |
| 依赖工具 | `useEventListener`、`useSupported`、`unrefElement` |
| 设计模式 | 适配器模式 |
| 核心知识点 | 浏览器前缀兼容、多事件名监听、autoExit |

---

## 源码逐行注释

```ts
// ⭐ 浏览器前缀兼容：事件名
const eventHandlers = [
  'fullscreenchange',
  'webkitfullscreenchange',
  'webkitendfullscreen',
  'mozfullscreenchange',
  'MSFullscreenChange',
] as any as 'fullscreenchange'[]
// 💡 不同浏览器使用不同的事件名
// 💡 同时监听所有可能的事件名

export function useFullscreen(
  target?: MaybeElementRef,
  options: UseFullscreenOptions = {},
) {
  const {
    document = defaultDocument,
    autoExit = false,
  } = options

  const targetRef = computed(() => unrefElement(target) ?? document?.documentElement)
  const isFullscreen = shallowRef(false)

  // ⭐ 浏览器前缀兼容：请求全屏方法
  const requestMethod = computed<'requestFullscreen' | undefined>(() => {
    return [
      'requestFullscreen',
      'webkitRequestFullscreen',
      'webkitEnterFullscreen',
      'webkitEnterFullScreen',
      'webkitRequestFullScreen',
      'mozRequestFullScreen',
      'msRequestFullscreen',
    ].find(m => (document && m in document) || (targetRef.value && m in targetRef.value)) as any
  })
  // 💡 遍历所有可能的方法名，找到第一个存在的

  // ⭐ 浏览器前缀兼容：退出全屏方法
  const exitMethod = computed<'exitFullscreen' | undefined>(() => {
    return [
      'exitFullscreen',
      'webkitExitFullscreen',
      'webkitExitFullScreen',
      'webkitCancelFullScreen',
      'mozCancelFullScreen',
      'msExitFullscreen',
    ].find(m => (document && m in document) || (targetRef.value && m in targetRef.value)) as any
  })

  // ⭐ 浏览器前缀兼容：全屏状态检测
  const fullscreenEnabled = computed<'fullscreenEnabled' | undefined>(() => {
    return [
      'fullScreen',
      'webkitIsFullScreen',
      'webkitDisplayingFullscreen',
      'mozFullScreen',
      'msFullscreenElement',
    ].find(m => (document && m in document) || (targetRef.value && m in targetRef.value)) as any
  })

  // ⭐ 使用 useSupported 延迟检测
  const isSupported = useSupported(() =>
    targetRef.value
    && document
    && requestMethod.value !== undefined
    && exitMethod.value !== undefined
    && fullscreenEnabled.value !== undefined)

  // ⭐ 进入全屏
  async function enter() {
    if (!isSupported.value || isFullscreen.value)
      return

    if (isElementFullScreen())
      await exit()

    const target = targetRef.value
    if (requestMethod.value && target?.[requestMethod.value] != null) {
      await target[requestMethod.value]()
      isFullscreen.value = true
    }
  }

  // ⭐ 退出全屏
  async function exit() {
    if (!isSupported.value || !isFullscreen.value)
      return
    if (exitMethod.value) {
      if (document?.[exitMethod.value] != null) {
        await document[exitMethod.value]()
      }
      else {
        const target = targetRef.value
        if (target?.[exitMethod.value] != null)
          await target[exitMethod.value]()
      }
    }
    isFullscreen.value = false
  }

  // ⭐ 监听全屏变化事件
  useEventListener(document, eventHandlers, handlerCallback, listenerOptions)
  useEventListener(() => unrefElement(targetRef), eventHandlers, handlerCallback, listenerOptions)
  // 💡 同时监听 document 和 target 元素的全屏变化

  // ⭐ 自动退出
  if (autoExit)
    tryOnScopeDispose(exit)
  // 💡 组件卸载时自动退出全屏

  return { isSupported, isFullscreen, enter, exit, toggle }
}
```

---

## 前缀兼容模式

```
标准 API        →  WebKit           →  Mozilla          →  MS
requestFullscreen → webkitRequestFullscreen → mozRequestFullScreen → msRequestFullscreen
exitFullscreen    → webkitExitFullscreen    → mozCancelFullScreen  → msExitFullscreen
fullscreenchange  → webkitfullscreenchange  → mozfullscreenchange  → MSFullscreenChange

查找策略：.find(m => m in document)
找到第一个存在的方法名，后续通过动态调用执行
```

---

## 笔记

```
在此记录你的学习笔记...

```
