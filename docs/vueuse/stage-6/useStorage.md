# useStorage 源码详细注释

> VueUse 最复杂的 composable，展示序列化策略、防循环机制、跨标签页同步三大核心设计

---

## 1. 基本信息

| 属性 | 值 |
|------|-----|
| 文件路径 | `packages/core/useStorage/index.ts` |
| 附加文件 | `packages/core/useStorage/guess.ts` |
| 代码行数 | 323 行 |
| 所属包 | `@vueuse/core` |
| 功能 | 响应式 LocalStorage/SessionStorage 封装 |
| 依赖工具 | `pausableWatch`、`useEventListener`、`tryOnMounted`、`guessSerializerType` |
| 设计模式 | 策略模式（Serializer）、发布-订阅模式（StorageEvent）、状态同步模式（pause/resume 防循环） |
| 核心知识点 | 序列化策略 + 跨标签页同步 + pausableWatch 防循环 |

---

## 2. 核心类型定义注释

### 2.1 Serializer<T> 接口 —— 序列化器协议（策略模式核心）

```ts
/**
 * Serializer<T> —— 序列化器协议接口
 *
 * 核心思想：Storage 只能存储字符串，所以需要序列化器做类型转换。
 * 这是一个典型的策略模式接口，定义了"读"和"写"两个方向的转换。
 *
 * T = 应用层的数据类型（number / boolean / object / Map / Set / Date 等）
 * raw = Storage 中的字符串表示
 */
export interface Serializer<T> {
  /**
   * read：从 Storage 中的字符串 → 应用层的 T 类型
   * 例如：'{"name":"张三"}' → { name: '张三' }
   */
  read: (raw: string) => T

  /**
   * write：将应用层的 T 类型 → Storage 中的字符串
   * 例如：{ name: '张三' } → '{"name":"张三"}'
   */
  write: (value: T) => string
}
```

### 2.2 SerializerAsync<T> 接口 —— 异步序列化器

```ts
/**
 * SerializerAsync<T> —— 异步版本的序列化器协议
 *
 * 与 Serializer<T> 的区别：read/write 返回 Awaitable<T>（即 T | Promise<T>）
 * 用途：支持异步解密/加密等场景，例如从远程解密服务读取数据
 *
 * 注意：当前 useStorage 主函数内部使用的是同步 Serializer，
 * 异步序列化器主要用于扩展场景（如 useAsyncStorage 等）
 */
export interface SerializerAsync<T> {
  read: (raw: string) => Awaitable<T>   // Awaitable<T> = T | Promise<T>
  write: (value: T) => Awaitable<string>
}
```

### 2.3 StorageSerializers 对象 —— 8 种内置序列化器

```ts
/**
 * StorageSerializers —— 内置序列化器集合
 *
 * 根据数据类型自动选择对应的序列化策略。
 * 每种序列化器都实现了 Serializer<any> 接口的 read/write 方法。
 *
 * 使用场景：guessSerializerType 根据默认值类型返回 type 字符串，
 * 然后通过 StorageSerializers[type] 获取对应的序列化器。
 */
export const StorageSerializers: Record<
  'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date',
  Serializer<any>
> = {

  // ────────────────────────────────────────────
  // boolean 序列化器
  // ────────────────────────────────────────────
  // read：严格比较字符串是否 === 'true'，其他任何值（包括 '1'、'yes'）都返回 false
  // write：直接调用 String() 转换，true → 'true'，false → 'false'
  // 典型场景：useStorage('darkMode', false)
  boolean: {
    read: (v: any) => v === 'true',
    write: (v: any) => String(v),
  },

  // ────────────────────────────────────────────
  // object 序列化器
  // ────────────────────────────────────────────
  // read：JSON.parse 反序列化，支持对象和数组
  // write：JSON.stringify 序列化，支持对象和数组
  // 注意：不支持 Map/Set/Date 等特殊对象，它们有专用序列化器
  // 典型场景：useStorage('user', { name: '', age: 0 })
  object: {
    read: (v: any) => JSON.parse(v),
    write: (v: any) => JSON.stringify(v),
  },

  // ────────────────────────────────────────────
  // number 序列化器
  // ────────────────────────────────────────────
  // read：Number.parseFloat 解析浮点数
  // 注意：整数也会被正确解析（'42' → 42）
  // 注意：如果字符串不是有效数字，parseFloat 返回 NaN
  // write：直接调用 String() 转换
  // 典型场景：useStorage('count', 0)
  number: {
    read: (v: any) => Number.parseFloat(v),
    write: (v: any) => String(v),
  },

  // ────────────────────────────────────────────
  // any 序列化器（兜底策略）
  // ────────────────────────────────────────────
  // read：直接返回原值，不做任何转换
  // write：直接调用 String() 转换
  // 用途：当类型无法识别时的默认序列化器
  // 注意：read 返回的是 string 类型，而不是原始类型
  any: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },

  // ────────────────────────────────────────────
  // string 序列化器
  // ────────────────────────────────────────────
  // read：直接返回原值（Storage 中本来就是字符串）
  // write：直接调用 String() 转换
  // 与 any 的区别：string 类型不需要转换，直接返回原值
  // 典型场景：useStorage('username', 'guest')
  string: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },

  // ────────────────────────────────────────────
  // map 序列化器
  // ────────────────────────────────────────────
  // write：Map → entries 数组（[[key1, val1], [key2, val2]]）→ JSON 字符串
  // read：JSON 字符串 → entries 数组 → new Map(entries)
  // 注意：Map 的 key 和 value 必须是 JSON 可序列化的类型
  // 典型场景：useStorage('cache', new Map<string, number>())
  map: {
    read: (v: any) => new Map(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from((v as Map<any, any>).entries())),
  },

  // ────────────────────────────────────────────
  // set 序列化器
  // ────────────────────────────────────────────
  // write：Set → 数组（通过 Array.from）→ JSON 字符串
  // read：JSON 字符串 → 数组 → new Set(数组)
  // 注意：Set 的元素必须是 JSON 可序列化的类型
  // 典型场景：useStorage('tags', new Set<string>())
  set: {
    read: (v: any) => new Set(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from(v as Set<any>)),
  },

  // ────────────────────────────────────────────
  // date 序列化器
  // ────────────────────────────────────────────
  // write：Date → ISO 8601 字符串（如 '2026-07-24T12:00:00.000Z'）
  // read：ISO 字符串 → new Date(isoString)
  // 注意：new Date(v) 可能返回 Invalid Date，需要额外校验
  // 典型场景：useStorage('lastLogin', new Date())
  date: {
    read: (v: any) => new Date(v),
    write: (v: any) => v.toISOString(),
  },
}
```

### 2.4 StorageEventLike 接口 —— 跨标签页事件兼容类型

```ts
/**
 * StorageEventLike —— 跨标签页事件的兼容接口
 *
 * 问题：浏览器原生 StorageEvent 只能由 localStorage/sessionStorage 触发，
 *       无法用自定义 storage 后端构造 StorageEvent。
 * 解决：定义一个兼容接口，统一原生 StorageEvent 和自定义事件的类型。
 *
 * 使用场景：
 * - 原生 Storage 实例 → 浏览器自动触发 StorageEvent（实现了此接口）
 * - 自定义 storage 后端 → 手动构造 CustomEvent，detail 中包含此接口的字段
 *
 * 字段说明：
 * - storageArea：触发事件的存储区域（用于过滤非目标 storage 的事件）
 * - key：发生变化的键名（null 表示 storage 被清空）
 * - oldValue：变化前的值（null 表示之前不存在）
 * - newValue：变化后的值（null 表示被删除）
 */
export interface StorageEventLike {
  storageArea: StorageLike | null
  key: StorageEvent['key']         // string | null
  oldValue: StorageEvent['oldValue']  // string | null
  newValue: StorageEvent['newValue']  // string | null
}
```

### 2.5 UseStorageOptions<T> 接口 —— 配置选项

```ts
/**
 * UseStorageOptions<T> —— useStorage 的配置选项
 *
 * 继承自：
 * - ConfigurableEventFilter：事件过滤器（控制 watch 的触发时机）
 * - ConfigurableWindow：可配置的 window 对象（SSR 兼容）
 * - ConfigurableFlush：watch 的 flush 时机（'pre' | 'post' | 'sync'）
 */
export interface UseStorageOptions<T>
  extends ConfigurableEventFilter, ConfigurableWindow, ConfigurableFlush {

  /**
   * deep —— 是否深度监听 data 变化
   * 默认值：true
   * 说明：对于对象类型，必须开启深度监听才能检测到嵌套属性的变化。
   *       对于基本类型（string/number/boolean），深度监听没有额外开销。
   */
  deep?: boolean

  /**
   * listenToStorageChanges —— 是否监听跨标签页的 storage 变化
   * 默认值：true
   * 说明：开启后会监听 window 的 'storage' 事件（原生 Storage）
   *       或 'vueuse-storage' 自定义事件（自定义 storage 后端）。
   *       关闭后不同标签页之间的数据不会自动同步。
   */
  listenToStorageChanges?: boolean

  /**
   * writeDefaults —— 当 storage 中不存在该 key 时，是否将默认值写入 storage
   * 默认值：true
   * 说明：如果 storage 中没有该 key，read() 会将默认值写入 storage。
   *       设为 false 则只返回默认值，不写入 storage。
   */
  writeDefaults?: boolean

  /**
   * mergeDefaults —— 合并策略
   * 默认值：false
   * 说明：
   *   - false：不合并，直接使用 storage 中的值（忽略默认值中存在但 storage 中不存在的字段）
   *   - true：浅合并（仅对对象类型生效），等价于 { ...defaults, ...storageValue }
   *   - 函数：自定义合并逻辑，接收 (storageValue, defaults) 两个参数
   *
   * 典型场景：
   *   默认值 { theme: 'dark', lang: 'zh', fontSize: 14 }
   *   storage 中只有 { theme: 'light' }
   *   mergeDefaults: true → { theme: 'light', lang: 'zh', fontSize: 14 }
   *   mergeDefaults: false → { theme: 'light' }（丢失了 lang 和 fontSize）
   */
  mergeDefaults?: boolean | ((storageValue: T, defaults: T) => T)

  /**
   * serializer —— 自定义序列化器
   * 说明：覆盖自动推断的序列化器。当你需要自定义读写逻辑时使用。
   *       例如：加密/解密、压缩/解压缩、自定义格式等。
   */
  serializer?: Serializer<T>

  /**
   * onError —— 错误回调
   * 默认值：(e) => { console.error(e) }
   * 说明：当 JSON.parse/stringify 失败、storage.setItem 抛出异常等时触发。
   *       可以自定义错误处理逻辑（如上报监控）。
   */
  onError?: (error: unknown) => void

  /**
   * shallow —— 是否使用 shallowRef（浅层响应式）
   * 默认值：false
   * 说明：设为 true 时使用 shallowRef 而非 deepRef（即 ref）。
   *       只监听 .value 的变化，不监听嵌套属性的变化。
   *       适用于大型对象且不需要深度监听的场景，可提升性能。
   */
  shallow?: boolean

  /**
   * initOnMounted —— 是否延迟到组件挂载后才读取 storage
   * 默认值：false
   * 说明：在 SSR 环境中，服务端没有 storage，读取会失败。
   *       设为 true 后，首次读取会延迟到 onMounted 生命周期，
   *       此时已在客户端，storage 可用。
   *       在首次挂载前，data.value 只包含默认值。
   */
  initOnMounted?: boolean
}
```

---

## 3. guessSerializerType 函数注释

文件位置：`packages/core/useStorage/guess.ts`

```ts
/**
 * guessSerializerType —— 根据默认值的类型自动推断序列化器类型
 *
 * 这个函数实现了一个优先级链，从最具体的类型到最通用的类型：
 *
 * 优先级链（从高到低）：
 *   1. null/undefined → 'any'（无法推断，使用兜底策略）
 *   2. Set 实例       → 'set'
 *   3. Map 实例       → 'map'
 *   4. Date 实例      → 'date'
 *   5. boolean        → 'boolean'（typeof rawInit === 'boolean'）
 *   6. string         → 'string'（typeof rawInit === 'string'）
 *   7. object         → 'object'（typeof rawInit === 'object'，兜底了 Array、普通对象等）
 *   8. number         → 'number'（!Number.isNaN(rawInit) 为 true 时）
 *   9. 其他           → 'any'（最终兜底）
 *
 * 设计思路：
 *   - 特殊对象（Set/Map/Date）优先于普通 object，因为 typeof 返回 'object'
 *   - boolean 优先于 string，因为 typeof 从左到右匹配
 *   - number 放在最后，通过 isNaN 排除 NaN 的情况
 *
 * 返回值类型：'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date'
 * 返回值用途：作为 StorageSerializers 的键，获取对应的序列化器
 *
 * 使用示例：
 *   guessSerializerType(null)          → 'any'
 *   guessSerializerType(new Set())     → 'set'
 *   guessSerializerType(new Map())     → 'map'
 *   guessSerializerType(new Date())    → 'date'
 *   guessSerializerType(true)          → 'boolean'
 *   guessSerializerType('hello')       → 'string'
 *   guessSerializerType({ a: 1 })      → 'object'
 *   guessSerializerType(42)            → 'number'
 *   guessSerializerType(NaN)           → 'any'
 */
export function guessSerializerType<T extends (string | number | boolean | object | null)>(rawInit: T) {
  return rawInit == null
    ? 'any'
    // ① null/undefined → 'any'（无法推断类型，使用兜底序列化器）

    : rawInit instanceof Set
      ? 'set'
      // ② Set 实例 → 'set'（必须在 object 之前，因为 typeof new Set() === 'object'）

      : rawInit instanceof Map
        ? 'map'
        // ③ Map 实例 → 'map'（同上，instanceof 优先于 typeof）

        : rawInit instanceof Date
          ? 'date'
          // ④ Date 实例 → 'date'（同上）

          : typeof rawInit === 'boolean'
            ? 'boolean'
            // ⑤ boolean 类型（typeof 精确匹配）

            : typeof rawInit === 'string'
              ? 'string'
              // ⑥ string 类型（typeof 精确匹配）

              : typeof rawInit === 'object'
                ? 'object'
                // ⑦ 普通对象/数组（typeof === 'object'，排除了上面的 Set/Map/Date）

                : !Number.isNaN(rawInit)
                  ? 'number'
                  // ⑧ 有效数字（排除 NaN）

                  : 'any'
                  // ⑨ 最终兜底（NaN 等无法识别的类型）
}
```

---

## 4. useStorage 主函数完整注释

### 4.1 初始化阶段

```ts
/**
 * useStorage —— 响应式 LocalStorage/SessionStorage 封装
 *
 * 函数签名（5 个重载）：
 *   useStorage(key, defaults: string, storage?, options?)  → RemovableRef<string>
 *   useStorage(key, defaults: boolean, storage?, options?) → RemovableRef<boolean>
 *   useStorage(key, defaults: number, storage?, options?)  → RemovableRef<number>
 *   useStorage<T>(key, defaults: T, storage?, options?)    → RemovableRef<T>
 *   useStorage<T>(key, defaults: null, storage?, options?) → RemovableRef<T>
 *
 * 参数说明：
 *   key     —— Storage 的键名（支持 Ref<string> 或 getter 函数，即响应式键名）
 *   defaults —— 默认值（支持 Ref 或 getter，即响应式默认值）
 *   storage —— StorageLike 实例（可选，默认 localStorage）
 *   options —— 配置选项（可选）
 *
 * 返回值：RemovableRef<T>（带 .remove() 方法的 Ref）
 */
export function useStorage<T extends (string | number | boolean | object | null)>(
  key: MaybeRefOrGetter<string>,
  defaults: MaybeRefOrGetter<T>,
  storage: StorageLike | undefined,
  options: UseStorageOptions<T> = {},
): RemovableRef<T> {

  // ────────────────────────────────────────────
  // 步骤 1：解构配置选项
  // ────────────────────────────────────────────
  const {
    flush = 'pre',           // watch 的 flush 时机：'pre'（DOM 更新前触发）
    deep = true,             // 默认深度监听（对象嵌套属性变化也能检测）
    listenToStorageChanges = true,  // 默认监听跨标签页变化
    writeDefaults = true,    // 默认将不存在的 key 写入默认值
    mergeDefaults = false,   // 默认不合并（直接使用 storage 中的值）
    shallow,                 // 是否使用 shallowRef
    window = defaultWindow,  // window 对象（SSR 时可能为 undefined）
    eventFilter,             // 事件过滤器（用于 throttle/debounce 等）
    onError = (e) => {
      console.error(e)       // 默认错误处理：打印到控制台
    },
    initOnMounted,           // 是否延迟到挂载后初始化
  } = options

  // ────────────────────────────────────────────
  // 步骤 2：创建响应式数据 data
  // ────────────────────────────────────────────
  const data = (shallow ? shallowRef : deepRef)(
    typeof defaults === 'function' ? defaults() : defaults
  ) as RemovableRef<T>
  /**
   * 根据 shallow 选项选择 ref 类型：
   *   - shallow = true  → shallowRef（只监听 .value 引用变化）
   *   - shallow = false → ref（即 deepRef，深度监听嵌套属性变化）
   *
   * 如果 defaults 是函数（getter），立即调用获取初始值。
   * 类型断言为 RemovableRef<T>（带 .remove() 方法）。
   */

  // ────────────────────────────────────────────
  // 步骤 3：创建响应式的 key
  // ────────────────────────────────────────────
  const keyComputed = computed<string>(() => toValue(key))
  /**
   * 将 MaybeRefOrGetter<string> 统一转为 computed<string>。
   * 这样 key 可以是：
   *   - 普通字符串：computed 直接返回
   *   - Ref<string>：computed 追踪其变化
   *   - getter 函数：computed 调用并追踪依赖
   */

  // ────────────────────────────────────────────
  // 步骤 4：获取 storage 实例（SSR 兼容）
  // ────────────────────────────────────────────
  if (!storage) {
    try {
      storage = getSSRHandler('getDefaultStorage', () => defaultWindow?.localStorage)()
    }
    catch (e) {
      onError(e)
    }
  }
  /**
   * 如果用户没有传入 storage 参数，默认使用 localStorage。
   * 通过 getSSRHandler 获取，确保 SSR 环境安全：
   *   - 客户端：返回 window.localStorage
   *   - 服务端：返回 undefined（由 SSR handler 决定）
   */

  if (!storage)
    return data
  /**
   * 如果 storage 仍然不存在（SSR 环境），直接返回只包含默认值的 data。
   * 此时 data 不会与任何 storage 同步，仅作为普通的响应式变量使用。
   */

  // ────────────────────────────────────────────
  // 步骤 5：确定序列化器
  // ────────────────────────────────────────────
  const rawInit: T = toValue(defaults)
  /**
   * 获取默认值的原始值（解包 Ref/getter）。
   * rawInit 用于：
   *   1. guessSerializerType 推断类型
   *   2. read() 函数中作为默认值返回
   *   3. mergeDefaults 合并时作为基础对象
   */

  const type = guessSerializerType<T>(rawInit)
  /**
   * 根据默认值类型自动推断序列化器类型。
   * 例如：rawInit = {} → type = 'object'
   *       rawInit = 0  → type = 'number'
   *       rawInit = '' → type = 'string'
   */

  const serializer = options.serializer ?? StorageSerializers[type]
  /**
   * 优先使用用户自定义的序列化器，否则使用内置的。
   * 选项模式（Options Pattern）：用户可以通过 options.serializer 覆盖默认行为。
   */
```

### 4.2 防循环机制（重点）

```ts
  // ────────────────────────────────────────────
  // 步骤 6：创建 pausableWatch（防循环核心）
  // ────────────────────────────────────────────
  const { pause: pauseWatch, resume: resumeWatch } = pausableWatch(
    data,
    () => write(data.value),
    { flush, deep, eventFilter },
  )
  /**
   * pausableWatch —— 可暂停的 watch
   *
   * 作用：监听 data 变化 → 调用 write() 写入 storage
   *
   * 为什么用 pausableWatch 而不是普通的 watch？
   * 因为需要在 update() 函数中暂停监听，防止循环：
   *
   *   storage 变化 → update() → data.value = read()
   *   → watch 触发 → write() → storage 再次变化
   *   → update() → data.value = read() → ...（无限循环）
   *
   * 通过 pause/resume 机制，在 update() 期间暂停 watch，
   * 避免 data 变化触发 write()，从而打断循环链。
   *
   * 参数说明：
   *   data    —— 监听的响应式数据
   *   callback —— data 变化时执行的回调（写入 storage）
   *   flush  —— 'pre'（DOM 更新前触发，性能最好）
   *   deep   —— true（深度监听对象嵌套属性）
   *   eventFilter —— 可选的事件过滤器（throttle/debounce）
   */

  // ────────────────────────────────────────────
  // 步骤 6.1：write 函数 —— 序列化并写入 storage
  // ────────────────────────────────────────────
  function write(v: unknown) {
    try {
      const oldValue = storage!.getItem(keyComputed.value)
      // 读取当前 storage 中的旧值，用于比较和事件派发

      if (v == null) {
        // 值为 null/undefined → 删除 storage 中的该 key
        dispatchWriteEvent(oldValue, null)
        storage!.removeItem(keyComputed.value)
      }
      else {
        const serialized = serializer.write(v as any)
        // 将应用层的值序列化为字符串

        if (oldValue !== serialized) {
          // ★ 关键优化：只在值真正变化时才写入
          // 避免不必要的 storage 写入和事件派发
          storage!.setItem(keyComputed.value, serialized)
          dispatchWriteEvent(oldValue, serialized)
        }
      }
    }
    catch (e) {
      onError(e)
      // storage.setItem 可能抛出异常（如存储空间已满、隐私模式等）
    }
  }

  // ────────────────────────────────────────────
  // 步骤 6.2：dispatchWriteEvent 函数 —— 派发写入事件
  // ────────────────────────────────────────────
  function dispatchWriteEvent(oldValue: string | null, newValue: string | null) {
    if (window) {
      const payload = {
        key: keyComputed.value,
        oldValue,
        newValue,
        storageArea: storage as Storage,
      }

      window.dispatchEvent(
        storage instanceof Storage
          ? new StorageEvent('storage', payload)
          // 原生 Storage → 派发 StorageEvent
          // 注意：StorageEvent 会被同一浏览器的所有标签页接收到
          // 但当前标签页不会收到自己派发的 StorageEvent（浏览器行为）

          : new CustomEvent<StorageEventLike>(customStorageEventName, {
              detail: payload,
            })
          // 自定义 storage → 派发 CustomEvent
          // CustomEvent 只在当前文档内传播，不会跨标签页
          // customStorageEventName = 'vueuse-storage'
      )
    }
  }

  // ────────────────────────────────────────────
  // 步骤 6.3：update 函数 —— 从 storage 事件更新 data（防循环核心）
  // ────────────────────────────────────────────
  function update(event?: StorageEventLike) {
    // ★ 过滤 1：只处理同一个 storage 区域的事件
    // 例如：监听的是 localStorage，但事件来自 sessionStorage → 忽略
    if (event && event.storageArea !== storage)
      return

    // ★ 过滤 2：storage 被清空时（key === null），重置为默认值
    if (event && event.key == null) {
      data.value = rawInit
      return
    }

    // ★ 过滤 3：只处理当前 key 的事件
    // storage 事件可能包含其他 key 的变化，需要过滤
    if (event && event.key !== keyComputed.value)
      return

    // ★★★ 防循环核心：暂停 watch ★★★
    pauseWatch()
    // 暂停 pausableWatch，防止 data.value = read() 触发 write()
    // 这是防循环机制的关键一步

    try {
      // ★ 只在值真正变化时才更新 data
      // 比较 event.newValue 和当前 data 的序列化结果
      if (event?.newValue !== serializer.write(data.value))
        data.value = read(event)
    }
    catch (e) {
      onError(e)
    }
    finally {
      if (event)
        nextTick(resumeWatch)
        // ★★★ nextTick 后恢复 watch ★★★
        // 为什么需要 nextTick？
        // data.value = read(event) 会触发 Vue 的响应式系统标记 dirty
        // 如果立即 resumeWatch，在同一个 tick 内 watch 会再次触发
        // nextTick 确保所有响应式更新完成后再恢复 watch
      else
        resumeWatch()
        // 非事件触发（如 key 变化或初始化），立即恢复
        // 因为此时没有外部事件，不会形成循环
    }
  }
```

### 4.3 跨标签页同步

```ts
  // ────────────────────────────────────────────
  // 步骤 7：跨标签页事件监听
  // ────────────────────────────────────────────

  // 自定义事件名称常量
  // 用于自定义 storage 后端在同文档内通信
  const customStorageEventName = 'vueuse-storage'

  // firstMounted 标志：用于 initOnMounted 选项
  // 在组件未挂载前，忽略所有 storage 事件
  let firstMounted = false

  // 原生 StorageEvent 处理函数
  const onStorageEvent = (ev: StorageEvent): void => {
    if (initOnMounted && !firstMounted) {
      return
      // 延迟初始化模式下，挂载前忽略事件
    }
    update(ev)
    // 调用 update 处理跨标签页的变化
  }

  // 自定义 StorageEvent 处理函数
  const onStorageCustomEvent = (ev: CustomEvent<StorageEventLike>): void => {
    if (initOnMounted && !firstMounted) {
      return
    }
    updateFromCustomEvent(ev)
    // 从 CustomEvent.detail 中提取 StorageEventLike 并处理
  }

  // 注册事件监听器
  if (window && listenToStorageChanges) {
    if (storage instanceof Storage)
      // 原生 Storage 实例 → 监听浏览器原生 'storage' 事件
      // 注意：storage 事件只在其他标签页修改 storage 时触发
      //       当前标签页自己修改 storage 不会触发此事件
      useEventListener(window, 'storage', onStorageEvent, { passive: true })
    else
      // 自定义 storage 后端 → 监听 'vueuse-storage' 自定义事件
      // 自定义事件在当前文档内传播，用于同页面内多个 useStorage 实例同步
      useEventListener(window, customStorageEventName, onStorageCustomEvent)
  }

  /**
   * 跨标签页同步的工作原理：
   *
   * 标签页 A 修改了 data：
   *   data.value = 'new' → pausableWatch 触发 → write()
   *   → storage.setItem('key', 'new')
   *   → dispatchWriteEvent() → 派发 StorageEvent
   *   → 浏览器将 StorageEvent 发送给所有其他标签页
   *
   * 标签页 B 收到事件：
   *   StorageEvent 触发 → onStorageEvent()
   *   → update(event) → pauseWatch()
   *   → data.value = read(event)
   *   → nextTick(resumeWatch)
   *
   * 关键：标签页 A 自己不会收到 StorageEvent（浏览器行为），
   * 所以不会形成 A → A 的循环。
   * 但如果在同一标签页内有多个 useStorage 实例监听同一个 key，
   * dispatchWriteEvent 派发的 StorageEvent 会被同实例的 onStorageEvent 接收，
   * 此时通过 update() 中的值比较和 pause/resume 机制避免循环。
   */
```

### 4.4 read 函数

```ts
  // ────────────────────────────────────────────
  // 步骤 8：read 函数 —— 从 storage 或事件中读取值
  // ────────────────────────────────────────────
  function read(event?: StorageEventLike) {
    // 确定原始值来源：
    //   - 有 event → 从事件中获取 newValue（跨标签页同步的值）
    //   - 无 event → 从 storage 中读取（初始化或 key 变化时）
    const rawValue = event
      ? event.newValue
      : storage!.getItem(keyComputed.value)

    if (rawValue == null) {
      // ── 情况 1：值不存在 ──
      // storage 中没有该 key 的值
      if (writeDefaults && rawInit != null)
        // writeDefaults 为 true 且默认值不为 null → 将默认值写入 storage
        storage!.setItem(keyComputed.value, serializer.write(rawInit))
      return rawInit
      // 返回默认值
    }

    else if (!event && mergeDefaults) {
      // ── 情况 2：需要合并默认值（仅在非事件触发时）──
      // 注意：mergeDefaults 只在初始化时生效，跨标签页事件不合并
      const value = serializer.read(rawValue)

      if (typeof mergeDefaults === 'function')
        // 函数合并：调用用户自定义的合并函数
        // 例如：(storageValue, defaults) => deepMerge(defaults, storageValue)
        return mergeDefaults(value, rawInit)

      else if (type === 'object' && !Array.isArray(value))
        // 浅合并：只对普通对象生效（排除数组）
        // { ...defaults, ...storageValue } → storage 中的值覆盖默认值
        return { ...rawInit as any, ...value }

      // 其他类型（数组、基本类型等）：直接返回 storage 中的值
      return value
    }

    else if (typeof rawValue !== 'string') {
      // ── 情况 3：rawValue 不是字符串 ──
      // 某些 storage 实现可能返回非字符串类型，直接返回
      return rawValue
    }

    else {
      // ── 情况 4：正常读取并反序列化 ──
      return serializer.read(rawValue)
    }
  }
```

### 4.5 延迟初始化

```ts
  // ────────────────────────────────────────────
  // 步骤 9：初始化读取
  // ────────────────────────────────────────────
  if (initOnMounted) {
    // 延迟模式：等待组件挂载后再读取 storage
    tryOnMounted(() => {
      firstMounted = true
      // 标记已挂载，此后 storage 事件才会被处理
      update()
      // 从 storage 读取值并更新 data
    })
    // 在挂载前，data.value 只包含默认值
    // 挂载后，update() 会从 storage 读取实际值
    // 适用场景：SSR 环境中，服务端没有 storage
  }
  else {
    // 立即模式：立即从 storage 读取值
    update()
    // 此时 update() 没有 event 参数，所以：
    //   1. 直接从 storage 读取（read()）
    //   2. 如果值不存在且 writeDefaults=true，写入默认值
    //   3. 如果 mergeDefaults=true，合并默认值
  }

  // ────────────────────────────────────────────
  // 辅助函数：updateFromCustomEvent
  // ────────────────────────────────────────────
  function updateFromCustomEvent(event: CustomEvent<StorageEventLike>) {
    update(event.detail)
    // 从 CustomEvent 中提取 detail（StorageEventLike 类型）
    // 然后调用统一的 update 处理逻辑
  }

  return data
  // 返回响应式 data，用户可以直接修改 data.value 来同步到 storage
}
```

---

## 5. 数据流图

```
┌─────────────────────────────────────────────────────────────────┐
│                    useStorage 完整数据流                          │
└─────────────────────────────────────────────────────────────────┘

  ┌──────────┐         watch 触发          ┌──────────┐
  │   data   │ ──────────────────────────→ │  write() │
  │  (Ref)   │                             │          │
  └──────────┘                             └────┬─────┘
       ↑                                        │
       │                                    ┌───▼────────────┐
       │                                    │ serializer     │
       │                                    │ .write(v)      │
       │                                    └───┬────────────┘
       │                                        │
       │                                    ┌───▼────────────┐
       │                                    │ storage        │
       │                                    │ .setItem(k, v) │
       │                                    └───┬────────────┘
       │                                        │
       │                                    ┌───▼──────────────┐
       │                                    │ dispatchWrite    │
       │                                    │ Event()          │
       │                                    └───┬──────────────┘
       │                                        │
       │                              ┌─────────▼─────────┐
       │                              │ StorageEvent      │
       │                              │ / CustomEvent     │
       │                              └─────────┬─────────┘
       │                                        │
       │                              ┌─────────▼─────────┐
       │                              │ onStorageEvent()  │
       │                              │ → update(event)   │
       │                              └─────────┬─────────┘
       │                                        │
       │                              ┌─────────▼─────────┐
       │                              │ pauseWatch()      │
       │                              │ → read(event)     │
       │                              │ → serializer      │
       │                              │   .read(rawValue) │
       │                              │ → data.value = v  │
       │                              │ → nextTick(       │
       │                              │     resumeWatch)  │
       │                              └───────────────────┘

  ┌──────────────────────────────────────────────────────────┐
  │ 跨标签页场景：                                             │
  │                                                          │
  │ 标签页 A                    标签页 B                      │
  │ ┌──────┐                   ┌──────┐                      │
  │ │ data │ → write()         │ data │                      │
  │ └──┬───┘   → setItem()     └──▲───┘                      │
  │    │        → StorageEvent     │                          │
  │    │          ────────────→    │                          │
  │    │                           │ update()                 │
  │    │                           │ pauseWatch()             │
  │    │                           │ read(event)              │
  │    │                           │ data.value = newValue    │
  │    │                           │ nextTick(resumeWatch)    │
  └──────────────────────────────────────────────────────────┘
```

---

## 6. 防循环时序图

### 6.1 场景一：用户修改 data → 写入 storage

```
时间轴 →
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

用户操作     │ data.value = 'new'
             │
data 响应式  │ data 被标记为 dirty
             │
pausableWatch│ ★ 检测到 data 变化，触发回调
             │ → write(data.value)
             │   → oldValue = storage.getItem(key)     // 'old'
             │   → serialized = serializer.write('new') // 'new'
             │   → oldValue !== serialized → true       // 值确实变了
             │   → storage.setItem(key, 'new')          // 写入 storage
             │   → dispatchWriteEvent('old', 'new')     // 派发事件
             │     → window.dispatchEvent(StorageEvent)
             │
★ 注意：     │ 标签页 A 不会收到自己派发的 StorageEvent（浏览器行为）
             │ 所以不会触发 onStorageEvent，不会形成循环
             │
             │ ✓ 完成
```

### 6.2 场景二：外部 StorageEvent → 更新 data

```
时间轴 →
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

浏览器       │ StorageEvent 触发（来自其他标签页）
             │ ev = { key: 'theme', newValue: '"light"', storageArea: localStorage }
             │
onStorage    │ onStorageEvent(ev)
Event        │ → initOnMounted && !firstMounted? → false（已挂载）
             │ → update(ev)
             │
update()     │ ★ ev.storageArea !== storage? → false（同一个 storage）
             │ ★ ev.key == null? → false
             │ ★ ev.key !== keyComputed.value? → false（同一个 key）
             │
             │ ★★★ pauseWatch() ★★★
             │ pausableWatch 暂停，data 变化不会触发 write()
             │
             │ event.newValue !== serializer.write(data.value)?
             │ → '"light"' !== '"dark"' → true（值确实不同）
             │ → data.value = read(ev)
             │   → rawValue = ev.newValue  // '"light"'
             │   → serializer.read('"light"')  // 'light'
             │   → data.value = 'light'
             │
             │ ★ data.value 被修改，Vue 响应式系统标记 dirty
             │ ★ 但 watch 已暂停，不会触发 write()
             │
finally      │ ★ nextTick(resumeWatch)
             │ → 等待当前 tick 的所有响应式更新完成
             │ → 在下一个 tick 恢复 watch
             │
下个 tick    │ watch 恢复，但 data 没有新的变化，不会触发回调
             │
             │ ✓ 完成，无循环
```

### 6.3 场景三：如何避免 A → B → A 的无限循环

```
问题场景：如果标签页 A 修改 storage → 标签页 B 收到事件并修改 storage
         → 标签页 A 再次收到事件 → 无限循环

解决方案（三层防护）：

防护层 1：浏览器行为
  ━━━━━━━━━━━━━━━━━━━━━
  标签页 A 自己派发的 StorageEvent 不会被标签页 A 收到。
  所以 A → write() → StorageEvent → A 这条路径不存在。

防护层 2：值比较（write 函数中）
  ━━━━━━━━━━━━━━━━━━━━━
  write() 函数中：
    if (oldValue !== serialized) {  // 只在值变化时才写入
      storage.setItem(...)
      dispatchWriteEvent(...)
    }
  如果 B 收到 A 的事件后写入相同的值（没有变化），不会再次派发事件。

防护层 3：值比较 + pause/resume（update 函数中）
  ━━━━━━━━━━━━━━━━━━━━━
  update() 函数中：
    pauseWatch()  // 暂停 watch
    if (event.newValue !== serializer.write(data.value))
      data.value = read(event)  // 只在值不同才更新
    nextTick(resumeWatch)  // 下一 tick 恢复

  即使同一标签页内有多个 useStorage 实例：
  实例 1 write() → StorageEvent → 实例 2 update()
  → pauseWatch() → 值相同? → 跳过 → nextTick(resumeWatch)
  → 不会触发实例 2 的 write()，无循环

完整防循环流程图：
  ┌─────────────────────────────────────────────────┐
  │ data 变化                                        │
  │   → pausableWatch 触发                           │
  │     → write(data.value)                          │
  │       → oldValue !== serialized?                  │
  │       → YES → storage.setItem()                  │
  │              → dispatchWriteEvent()               │
  │                → StorageEvent/CustomEvent         │
  │                  → onStorageEvent()               │
  │                    → update()                     │
  │                      → pauseWatch()    ★ 暂停     │
  │                      → event.newValue             │
  │                        !== serializer              │
  │                        .write(data.value)?        │
  │                      → NO → 跳过更新              │
  │                      → nextTick(resumeWatch) ★ 恢复│
  │       → NO → 不写入，不派发事件                     │
  └─────────────────────────────────────────────────┘
```

---

## 7. 设计模式分析

### 7.1 策略模式（Serializer）

```
┌─────────────────────────────────────────────────────────┐
│                    策略模式（Strategy Pattern）            │
└─────────────────────────────────────────────────────────┘

接口定义：
  Serializer<T> { read(raw: string): T; write(value: T): string }

具体策略（8 种内置序列化器）：
  ┌─────────┬──────────────────┬───────────────────┐
  │  类型    │     read         │     write         │
  ├─────────┼──────────────────┼───────────────────┤
  │ boolean │ v === 'true'     │ String(v)         │
  │ object  │ JSON.parse(v)    │ JSON.stringify(v) │
  │ number  │ parseFloat(v)    │ String(v)         │
  │ any     │ v（直接返回）     │ String(v)         │
  │ string  │ v（直接返回）     │ String(v)         │
  │ map     │ new Map(JSON     │ JSON.stringify    │
  │         │   .parse(v))     │   (entries)       │
  │ set     │ new Set(JSON     │ JSON.stringify    │
  │         │   .parse(v))     │   (Array.from)    │
  │ date    │ new Date(v)      │ v.toISOString()   │
  └─────────┴──────────────────┴───────────────────┘

策略选择：
  guessSerializerType(defaultValue) → type → StorageSerializers[type]

策略覆盖：
  用户可以通过 options.serializer 传入自定义序列化器，覆盖自动推断的结果。
  这是"开放-封闭原则"的体现：对扩展开放，对修改封闭。

典型应用：
  // 加密存储
  useStorage('secret', '', localStorage, {
    serializer: {
      read: (v) => decrypt(v),      // 自定义解密策略
      write: (v) => encrypt(v),     // 自定义加密策略
    }
  })
```

### 7.2 发布-订阅模式（StorageEvent / CustomEvent）

```
┌─────────────────────────────────────────────────────────┐
│              发布-订阅模式（Pub-Sub Pattern）              │
└─────────────────────────────────────────────────────────┘

发布者（Publisher）：
  dispatchWriteEvent() → window.dispatchEvent(event)

事件通道（Event Channel）：
  ┌──────────────────────────────────────────────────┐
  │ 原生 Storage：                                    │
  │   浏览器自动将 StorageEvent 分发给所有其他标签页      │
  │   + 当前标签页内监听 'storage' 事件的其他实例        │
  │                                                    │
  │ 自定义 Storage：                                   │
  │   CustomEvent('vueuse-storage') 只在当前文档内传播   │
  │   不会跨标签页（因为自定义 storage 不触发浏览器事件）  │
  └──────────────────────────────────────────────────┘

订阅者（Subscriber）：
  ┌──────────────────────────────────────────────────┐
  │ 原生 Storage → useEventListener(                  │
  │   window, 'storage', onStorageEvent              │
  │ )                                                 │
  │                                                    │
  │ 自定义 Storage → useEventListener(                │
  │   window, 'vueuse-storage', onStorageCustomEvent  │
  │ )                                                 │
  └──────────────────────────────────────────────────┘

事件过滤（在 update 函数中）：
  1. storageArea !== storage → 忽略（不同 storage 区域）
  2. key === null → 重置为默认值（storage 被清空）
  3. key !== keyComputed.value → 忽略（不同 key）

设计优势：
  - 解耦：发布者和订阅者互不依赖
  - 可扩展：可以有任意多个 useStorage 实例监听同一个 key
  - 统一接口：StorageEvent 和 CustomEvent 通过 StorageEventLike 统一处理
```

### 7.3 状态同步模式（pause/resume 防循环）

```
┌─────────────────────────────────────────────────────────┐
│          状态同步模式（State Sync with Break）             │
└─────────────────────────────────────────────────────────┘

核心问题：
  data ↔ storage 双向绑定可能导致无限循环：
  data 变化 → write → storage 变化 → update → data 变化 → ...

解决方案：pause/resume 机制

┌─────────────────────────────────────────────────────────┐
│ 写入路径（data → storage）：                               │
│   data 变化 → pausableWatch 触发 → write()               │
│   → storage.setItem() → dispatchWriteEvent()             │
│   （watch 保持激活状态）                                    │
│                                                           │
│ 读取路径（storage → data）：                               │
│   StorageEvent → update()                                │
│   → pauseWatch()       ★ 暂停 watch                      │
│   → data.value = read()  ★ 更新 data（不会触发 watch）     │
│   → nextTick(            ★ 等待响应式更新完成               │
│       resumeWatch)       ★ 恢复 watch                     │
└─────────────────────────────────────────────────────────┘

nextTick 的必要性：
  Vue 的响应式系统在同一 tick 内批量处理更新。
  如果立即 resumeWatch：
    data.value = newValue  // 标记 dirty
    resumeWatch()          // watch 恢复
    // watch 在同一 tick 内检测到 dirty → 触发 write()
    // 但此时 data 的值是来自外部事件的，不应该写回 storage

  使用 nextTick：
    data.value = newValue  // 标记 dirty
    nextTick(resumeWatch)  // 延迟到下一 tick
    // 当前 tick：所有响应式更新完成，dirty 被消费
    // 下一 tick：watch 恢复，但 data 没有新的变化，不触发
```

---

## 8. 常见使用场景示例

### 8.1 基本用法

```ts
import { useStorage } from '@vueuse/core'

// ── 字符串类型 ──
const theme = useStorage('theme', 'dark')
// 自动推断 type = 'string'，使用 StorageSerializers.string
// localStorage 中：theme → 'dark'
// 修改：theme.value = 'light' → 自动同步到 localStorage

// ── 数字类型 ──
const fontSize = useStorage('fontSize', 16)
// 自动推断 type = 'number'，使用 StorageSerializers.number
// localStorage 中：fontSize → '16'
// 读取时：'16' → parseFloat('16') → 16

// ── 布尔类型 ──
const isDark = useStorage('isDark', false)
// 自动推断 type = 'boolean'
// localStorage 中：isDark → 'false'
// 读取时：'false' === 'true' → false

// ── 对象类型 ──
const user = useStorage('user', { name: '张三', age: 25 })
// 自动推断 type = 'object'，使用 StorageSerializers.object
// localStorage 中：user → '{"name":"张三","age":25}'
// 深度监听：修改 user.value.name 也会自动同步

// ── 使用 sessionStorage ──
const tempData = useStorage('temp', '', sessionStorage)
// 第三个参数指定 storage 实例
```

### 8.2 自定义序列化器

```ts
import { useStorage } from '@vueuse/core'

// ── 加密存储（保护敏感数据）──
const secret = useStorage('secret', '', localStorage, {
  serializer: {
    read: (v) => {
      // 自定义解密逻辑
      return atob(v) // Base64 解码（示例，实际应使用更强的加密）
    },
    write: (v) => {
      // 自定义加密逻辑
      return btoa(v) // Base64 编码（示例）
    },
  },
})
// localStorage 中：secret → 'aGVsbG8='（Base64 编码后的值）
// secret.value → 'hello'（解码后的原始值）

// ── 自定义 JSON 格式（带缩进）──
const config = useStorage('config', { debug: false }, localStorage, {
  serializer: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v, null, 2), // 带 2 空格缩进
  },
})

// ── 版本兼容序列化器 ──
const data = useStorage('app-data', { version: 2, items: [] }, localStorage, {
  serializer: {
    read: (v) => {
      const parsed = JSON.parse(v)
      // 处理旧版本数据格式
      if (parsed.version === 1) {
        return { version: 2, items: parsed.list || [] }
      }
      return parsed
    },
    write: (v) => JSON.stringify(v),
  },
})
```

### 8.3 mergeDefaults 合并默认值

```ts
import { useStorage } from '@vueuse/core'

// ── 浅合并（mergeDefaults: true）──
const settings = useStorage('settings', {
  theme: 'dark',
  lang: 'zh-CN',
  fontSize: 14,
  sidebar: true,
}, localStorage, {
  mergeDefaults: true,
})

/**
 * 场景：应用升级后新增了 fontSize 和 sidebar 字段
 *
 * 用户 localStorage 中已有：
 *   { "theme": "light", "lang": "en" }
 *
 * mergeDefaults: true 的效果：
 *   { ...defaults, ...storageValue }
 *   = { theme: 'light', lang: 'en', fontSize: 14, sidebar: true }
 *
 * 如果不使用 mergeDefaults（默认 false）：
 *   直接使用 storage 中的值 = { theme: 'light', lang: 'en' }
 *   fontSize 和 sidebar 会丢失！
 */

// ── 自定义合并函数（深度合并）──
const config = useStorage('config', {
  database: { host: 'localhost', port: 3306 },
  cache: { ttl: 3600, maxSize: 100 },
}, localStorage, {
  mergeDefaults: (storageValue, defaults) => {
    // 自定义深度合并逻辑
    return {
      ...defaults,
      ...storageValue,
      database: { ...defaults.database, ...storageValue.database },
      cache: { ...defaults.cache, ...storageValue.cache },
    }
  },
})

/**
 * 用户 localStorage 中已有：
 *   { "database": { "host": "192.168.1.1" } }
 *
 * 合并结果：
 *   { database: { host: '192.168.1.1', port: 3306 }, cache: { ttl: 3600, maxSize: 100 } }
 *
 * host 从 storage 读取，port 从默认值获取
 */
```

### 8.4 initOnMounted 延迟初始化

```ts
import { useStorage } from '@vueuse/core'

// ── SSR 安全的延迟初始化 ──
const userPreferences = useStorage('prefs', {
  theme: 'light',
  notifications: true,
}, localStorage, {
  initOnMounted: true,
})

/**
 * 为什么需要 initOnMounted？
 *
 * 在 SSR（服务端渲染）环境中：
 *   - 服务端没有 window，也没有 localStorage
 *   - 如果在 setup 阶段就读取 storage，会报错或返回 null
 *
 * initOnMounted: true 的行为：
 *   1. 组件 setup 阶段：data.value = defaults（只使用默认值）
 *   2. 组件 mounted 后：从 localStorage 读取实际值并更新 data
 *   3. mounted 后 storage 事件才会被处理（firstMounted 标志控制）
 *
 * 时序：
 *   setup → data = { theme: 'light', notifications: true }
 *   mounted → update() → data = { theme: 'dark', notifications: false }（从 storage 读取）
 *   此后 → storage 事件正常处理
 */
```

### 8.5 SSR 兼容 + 自定义 storage

```ts
import { useStorage } from '@vueuse/core'

// ── 使用自定义 storage 后端（如内存存储）──
const memoryStorage = new Map<string, string>()

const customStorage: StorageLike = {
  getItem: (key) => memoryStorage.get(key) ?? null,
  setItem: (key, value) => { memoryStorage.set(key, value) },
  removeItem: (key) => { memoryStorage.delete(key) },
}

const data = useStorage('custom-key', 'default', customStorage, {
  listenToStorageChanges: true, // 会监听 'vueuse-storage' 自定义事件
})

/**
 * 自定义 storage 的跨实例同步：
 *   使用 CustomEvent('vueuse-storage') 而非 StorageEvent
 *   因为 StorageEvent 只能由原生 localStorage/sessionStorage 触发
 *
 * 注意：自定义 storage 只能在同文档内同步，不能跨标签页
 * （源码注释提到：TODO: 考虑使用 BroadcastChannel 实现跨标签页）
 */

// ── 错误处理 ──
const safeData = useStorage('important', {}, localStorage, {
  onError: (error) => {
    // 自定义错误处理：上报监控系统
    console.error('Storage error:', error)
    // reportToSentry(error)
  },
})

// ── shallowRef 优化大型对象 ──
const largeConfig = useStorage('large-config', { /* 大量数据 */ }, localStorage, {
  shallow: true,
  // 使用 shallowRef：只监听 .value 引用变化，不监听嵌套属性
  // 适用于不需要深度监听的大型对象，提升性能
  // 注意：修改嵌套属性后需要重新赋值整个对象才能触发同步
  // largeConfig.value = { ...largeConfig.value, nested: 'new' }
})
```

---

## 关联 hook

| hook | 关系 | 说明 |
|------|------|------|
| `pausableWatch` | 核心依赖 | 防循环机制的核心，提供 pause/resume 能力 |
| `useEventListener` | 依赖 | 监听 StorageEvent 和 CustomEvent，自动清理 |
| `guessSerializerType` | 依赖 | 根据默认值类型自动推断序列化器 |
| `tryOnMounted` | 依赖 | 延迟初始化，确保 SSR 安全 |
| `deepRef` / `shallowRef` | 依赖 | 响应式数据容器，控制深度监听 |
| `computed` | 依赖 | 响应式 key，支持 Ref 和 getter |
| `nextTick` | 依赖 | 防循环机制中的时序控制 |

---

## 关键设计总结

```
┌─────────────────────────────────────────────────────────────────┐
│                    useStorage 设计精华总结                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. 策略模式（Serializer）                                        │
│     → 8 种内置序列化器 + 自定义覆盖                                │
│     → guessSerializerType 自动推断                                │
│     → 开放-封闭原则：扩展开放，修改封闭                             │
│                                                                 │
│  2. 发布-订阅模式（StorageEvent / CustomEvent）                    │
│     → 解耦：发布者和订阅者互不依赖                                 │
│     → 统一接口：StorageEventLike 兼容原生和自定义                   │
│     → 可扩展：任意多个实例可监听同一个 key                          │
│                                                                 │
│  3. 状态同步模式（pause/resume 防循环）                             │
│     → pausableWatch 提供可暂停的监听                               │
│     → nextTick 确保时序正确                                        │
│     → 三层防护：浏览器行为 + 值比较 + pause/resume                  │
│                                                                 │
│  4. SSR 兼容                                                     │
│     → getSSRHandler 安全获取 storage                              │
│     → initOnMounted 延迟初始化                                    │
│     → storage 不存在时返回纯响应式 data                            │
│                                                                 │
│  5. 细节优化                                                     │
│     → 值比较避免无效写入（write 中）                                │
│     → storageArea 过滤不同存储区域                                 │
│     → key 过滤只处理目标 key                                      │
│     → writeDefaults 控制默认值写入                                 │
│     → mergeDefaults 支持浅合并和自定义合并                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 笔记

```
在此记录你的学习笔记...


```
