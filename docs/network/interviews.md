---
---
# 网络 面试题库（2025-2026 企业实战版）

> 本文档包含 50 道网络相关面试题，涵盖 HTTP、TCP/IP、浏览器行为、安全、性能优化等核心领域。
> 难度分布：基础题 15 道 (30%) | 进阶题 20 道 (40%) | 专家题 15 道 (30%)

---

## 📚 问题速查目录

> **快速导航**：点击跳转 | 共 **34** 道

### 基础层（★☆☆）Q01 - Q15

| 题号 | 题目 | 难度 |
|:----:|------|:----:|
| [Q01](#q01-get-和-post-有什么区别) | GET 和 POST 有什么区别？ | ★☆☆ |
| [Q02](#q02-http-常见的状态码有哪些分别表示什么意思) | HTTP 常见的状态码有哪些？分别表示什么意思？ | ★☆☆ |
| [Q03](#q03-http-和-https-的区别是什么) | HTTP 和 HTTPS 的区别是什么？ | ★☆☆ |
| [Q04](#q04-什么是-http-无状态协议怎么解决无状态问题) | 什么是 HTTP 无状态协议？怎么解决无状态问题？ | ★☆☆ |
| [Q05](#q05-http-1011--20-的主要区别) | HTTP 1.0 / 1.1 / 2.0 的主要区别？ | ★☆☆ |
| [Q06](#q06-什么是-tcp-的三次握手为什么要三次) | 什么是 TCP 的三次握手？为什么要三次？ | ★☆☆ |
| [Q07](#q07-什么是-tcp-的四次挥手为什么-time_wait-要等-2msl) | 什么是 TCP 的四次挥手？为什么 TIME_WAIT 要等 2MSL？ | ★☆☆ |
| [Q08](#q08-tcp-和-udp-的区别是什么各自适用场景) | TCP 和 UDP 的区别是什么？各自适用场景？ | ★☆☆ |
| [Q09](#q09-什么是-dnsdns-查询的过程是怎样的) | 什么是 DNS？DNS 查询的过程是怎样的？ | ★☆☆ |
| [Q10](#q10-在浏览器地址栏输入-url-回车后发生了什么简版) | 在浏览器地址栏输入 URL 回车后发生了什么？（简版） | ★☆☆ |
| [Q11](#q11-什么是浏览器的同源策略) | 什么是浏览器的同源策略？ | ★☆☆ |
| [Q12](#q12-什么是跨域如何解决跨域问题) | 什么是跨域？如何解决跨域问题？ | ★☆☆ |
| [Q13](#q13-cookie-和-session-的区别) | Cookie 和 Session 的区别？ | ★☆☆ |
| [Q14](#q14-websocket-和-http-的区别) | WebSocket 和 HTTP 的区别？ | ★☆☆ |
| [Q15](#q15-什么是-cdn它的工作原理是什么) | 什么是 CDN？它的工作原理是什么？ | ★☆☆ |

### 进阶层（★★☆）Q16 - Q30

| 题号 | 题目 | 难度 |
|:----:|------|:----:|
| [Q16](#q16-http2-相比-http11-有哪些提升解决了哪些问题) | HTTP/2 相比 HTTP/1.1 有哪些提升？解决了哪些问题？ | ★★☆ |
| [Q17](#q17-https-的加密过程是怎样的tls-握手的详细步骤) | HTTPS 的加密过程是怎样的？TLS 握手的详细步骤？ | ★★☆ |
| [Q18](#q18-http-缓存机制详解强制缓存--协商缓存) | HTTP 缓存机制详解（强制缓存 + 协商缓存） | ★★☆ |
| [Q19](#q19-浏览器的资源加载优先级是如何确定的) | 浏览器的资源加载优先级是如何确定的？ | ★★☆ |
| [Q20](#q20-preloadprefetchpreconnectdns-prefetch-的区别和使用场景) | preload、prefetch、preconnect、dns-prefetch 的区别和使用场景？ | ★★☆ |
| [Q21](#q21-tcp-的流量控制和拥塞控制的区别和实现) | TCP 的流量控制和拥塞控制的区别和实现？ | ★★☆ |
| [Q22](#q22-从输入-url-到页面展示的完整过程详细版含-dnstcphttp渲染) | 从输入 URL 到页面展示的完整过程？（详细版，含 DNS/TCP/HTTP/渲染） | ★★☆ |
| [Q23](#q23-tcp-的粘包拆包问题http-如何解决的) | TCP 的粘包/拆包问题？HTTP 如何解决的？ | ★★☆ |
| [Q24](#q24-什么是-http-的管线化pipelining为什么被废弃了) | 什么是 HTTP 的管线化（Pipelining）？为什么被废弃了？ | ★★☆ |
| [Q25](#q25-quic-协议为什么选择基于-udp-而不是-tcp) | QUIC 协议为什么选择基于 UDP 而不是 TCP？ | ★★☆ |
| [Q26](#q26-xss-攻击有哪些类型如何防御) | XSS 攻击有哪些类型？如何防御？ | ★★☆ |
| [Q27](#q27-csrf-攻击的原理是什么如何防御) | CSRF 攻击的原理是什么？如何防御？ | ★★☆ |
| [Q28](#q28-csp内容安全策略的作用和使用方式) | CSP（内容安全策略）的作用和使用方式？ | ★★☆ |
| [Q29](#q29-如何设计和实现一个前端网络请求封装库axios-封装思路) | 如何设计和实现一个前端网络请求封装库？（axios 封装思路） | ★★☆ |
| [Q30](#q30-service-worker-如何拦截网络请求并做缓存) | Service Worker 如何拦截网络请求并做缓存？ | ★★☆ |

### 专家层（★★★）编程实现题

| 题号 | 题目 | 难度 |
|:----:|------|:----:|
| [Q31](#q31-手写实现一个简单的-http-服务器nodejs) | 手写实现一个简单的 HTTP 服务器（Node.js） | ★★★ |
| [Q32](#q32-实现-websocket-服务端含握手解析和帧编解码) | 实现 WebSocket 服务端（含握手解析和帧编解码） | ★★★ |
| [Q34](#q34-手写一个支持断点续传的大文件上传组件) | 手写一个支持断点续传的大文件上传组件 | ★★★ |
| [Q35](#q35-设计一个高可用的-api-网关方案前端视角) | 设计一个高可用的 API 网关方案（前端视角） | ★★★ |
| [Q38](#q38-大文件上传的分片上传断点续传秒传完整方案) | 大文件上传的分片上传、断点续传、秒传完整方案 | ★★★ |

---

## Q01: GET 和 POST 有什么区别？
- **难度**：★☆☆
- **知识点**：HTTP 方法 / RESTful API
- **题型**：简答题

### 参考答案要点：

1. **语义区别**：
   - GET 用于获取资源，具有幂等性和安全性（不改变服务器状态）
   - POST 用于提交数据，通常用于创建或修改资源，非幂等
   
2. **参数传递方式**：
   ```http
   # GET 参数在 URL 中
   GET /api/users?id=1&name=test HTTP/1.1
   
   # POST 参数在请求体中
   POST /api/users HTTP/1.1
   Content-Type: application/json
   
   {"id": 1, "name": "test"}
   ```

3. **技术细节差异**：
   - **缓存**：GET 可以被缓存，POST 默认不被缓存
   - **书签**：GET 请求可被收藏为书签，POST 不行
   - **历史记录**：GET 参数会保留在浏览器历史，POST 不会
   - **长度限制**：受 URL 长度限制（不同浏览器约 2KB-8KB），POST 无此限制（但服务器可能有 body 大小限制）
   - **编码类型**：GET 只支持 URL 编码，POST 支持多种编码（multipart/form-data、application/json 等）

4. **实际应用场景**：
   - 搜索、查询 → GET
   - 表单提交、文件上传 → POST
   - **重要原则**：涉及敏感信息（密码）必须用 POST

> **追问链**：PUT 和 PATCH 的区别？DELETE 请求的幂等性如何保证？RESTful 设计中如何选择合适的 HTTP 方法？

---

## Q02: HTTP 常见的状态码有哪些？分别表示什么意思？
- **难度**：★☆☆
- **知识点**：HTTP 状态码 / 协议规范
- **题型**：简答题

### 参考答案要点：

1. **1xx 信息响应**（较少使用）：
   - `100 Continue`：客户端应继续发送请求体
   - `101 Switching Protocols`：协议切换（如 WebSocket 升级）

2. **2xx 成功**（重点掌握）：
   - `200 OK`：请求成功（最常见）
   - `201 Created`：资源创建成功（POST 操作）
   - `204 No Content`：成功但无返回内容（删除操作常用）
   - `206 Partial Content`：范围请求成功（断点续传）

3. **3xx 重定向**（前端高频考点）：
   - `301 Moved Permanently`：永久重定向（SEO 会转移权重）
   - `302 Found`：临时重定向（SEO 不转移权重）
   - `304 Not Modified`：协商缓存命中（配合 If-None-Match/If-Modified-Since）
   - `307 Temporary Redirect`：临时重定向（严格保持请求方法不变）

4. **4xx 客户端错误**（必考）：
   - `400 Bad Request`：请求语法错误
   - `401 Unauthorized`：未认证（需要登录）
   - `403 Forbidden`：已认证但无权限
   - `404 Not Found`：资源不存在
   - `405 Method Not Allowed`：方法不允许
   - `408 Request Timeout`：请求超时
   - `409 Conflict`：资源冲突（如并发修改）
   - `413 Payload Too Large`：请求体过大
   - `429 Too Many Requests`：请求过于频繁（限流）

5. **5xx 服务器错误**：
   - `500 Internal Server Error`：服务器内部错误
   - `502 Bad Gateway`：网关/代理从上游收到无效响应
   - `503 Service Unavailable`：服务不可用（维护/过载）
   - `504 Gateway Timeout`：网关超时
   - `505 HTTP Version Not Supported`：不支持该 HTTP 版本

> **记忆口诀**：**2成功、3跳转、4客户端错、5服务端错**

> **追问链**：301 和 302 对 SEO 的影响？304 的完整触发流程？如何优雅地处理 429 限流？

---

## Q03: HTTP 和 HTTPS 的区别是什么？
- **难度**：★☆☆
- **知识点**：HTTPS / TLS/SSL 加密
- **题型**：简答题

### 参考答案要点：

1. **核心区别**：
   | 特性 | HTTP | HTTPS |
   |------|------|-------|
   | 协议 | 明文传输 | 加密传输（TLS/SSL） |
   | 端口 | 80 | 443 |
   | 安全性 | 低（可被窃听/篡改） | 高（机密性+完整性+身份验证） |
   | 性能 | 快（无加密开销） | 稍慢（握手+加密计算） |
   | SEO | 无加成 | Google 排名加权 |

2. **HTTPS 的三大安全保障**：
   - **机密性（Confidentiality）**：对称加密防止窃听
   - **完整性（Integrity）**：消息摘要（MAC）防篡改
   - **身份验证（Authentication）**：数字证书防冒充

3. **HTTPS 工作原理概述**：
   ```
   客户端 ──[1. ClientHello]──> 服务端
   客户端 <──[2. ServerHello + 证书]── 服务端
   客户端 ──[3. 验证证书 + 密钥交换]──> 服务端
   双方 ──[4. 使用对称密钥加密通信]
   ```

4. **为什么 HTTPS 更安全？**
   - 中间人攻击（MITM）无法解密流量
   - 伪造网站会被浏览器证书警告拦截
   - 用户输入的密码、支付信息等不会被明文截获

5. **现代趋势**：
   - **全站 HTTPS 已成标配**（Chrome 标记 HTTP 为"不安全"）
   - Let's Encrypt 提供免费证书
   - HSTS（HTTP Strict Transport Security）强制 HTTPS
   - 混合内容（Mixed Content）问题需注意

> **追问链**：TLS 1.2 和 1.3 的区别？证书链是如何验证的？如何配置 HSTS？

---

## Q04: 什么是 HTTP 无状态协议？怎么解决无状态问题？
- **难度**：★☆☆
- **知识点**：HTTP 特性 / Cookie / Session / Token
- **题型**：简答题

### 参考答案要点：

1. **什么是无状态？**
   - HTTP 协议本身**不保存任何通信状态**
   - 服务器不记录"谁在什么时候发过什么请求"
   - 每个请求都是独立的，彼此无关
   - **优点**：简单、易扩展、服务器无状态负担
   - **缺点**：无法识别同一用户的连续操作（如登录后访问其他页面）

2. **解决方案对比**：

   **方案一：Cookie + Session（传统方案）**
   ```
   [登录请求] → 服务器生成 Session ID → 通过 Set-Cookie 返回给浏览器
   [后续请求] → 浏览器自动携带 Cookie（Session ID）→ 服务器根据 ID 找到 Session 数据
   ```
   
   - Session 数据存储在**服务器端**（内存/Redis/数据库）
   - Cookie 仅存储 Session ID（通常 32-64 位随机字符串）
   - **缺点**：服务器有存储压力，分布式环境下需要 Session 同步

   **方案二：Token（JWT，现代主流）**
   ```
   [登录请求] → 服务器生成 JWT（含用户信息+签名）→ 返回给客户端
   [后续请求] → 客户端在 Header 携带 Authorization: Bearer <token>
             → 服务器验证签名即可（无需存储 Session）
   ```
   
   - JWT 是自包含的，服务器无需存储
   - **优点**：天然支持分布式、跨域友好
   - **缺点**：Token 一旦签发难以撤销、Payload 不要放敏感信息

3. **Cookie vs Token vs Session 对比**：
   | 维度 | Cookie + Session | Token (JWT) |
   |------|------------------|-------------|
   | 存储位置 | 服务器 | 客户端 |
   | 跨域支持 | 困难（需配置 CORS） | 容易（放在 Header） |
   | 移动端适配 | 一般（原生 Cookie 支持差） | 好（统一放 Header） |
   | 可扩展性 | 需共享 Session 存储 | 天然支持 |

4. **最佳实践**：
   - Web 应用：Cookie + HttpOnly + Secure + SameSite
   - 移动端/API：JWT + Refresh Token 双令牌机制
   - 敏感操作：结合 CSRF Token 或双重验证

> **追问链**：JWT 的结构和各部分作用？Session 固定攻击是什么？SameSite 属性的作用？

### 🔍 追问链
1. **[Cookie → Session → Token → JWT 的演进之路]**
   → 方向：从有状态到无状态的架构演进，各方案的优劣对比（安全性、可扩展性、移动端适配、跨域场景），以及现代双令牌机制（Access Token + Refresh Token）的最佳实践
2. **[Session 固定攻击（Session Fixation）及防御]**
   → 方向：攻击原理（登录前注入 Session ID）、防御手段（登录后重新生成 Session ID）、与 Session 劫持的区别
3. **[SameSite 属性的完整安全模型]**
   → 方向：Strict/Lax/None 三种模式的选择策略、CSRF 防护中的角色、第三方 Cookie 限制对广告追踪的影响、跨域 iframe 嵌入的场景问题
4. **[Token 安全最佳实践]**
   → 方向：Token 存储位置（LocalStorage vs Cookie）、XSS 窃取风险、Token 刷新机制、Token 撤销方案（黑名单/版本号/短有效期）

---

## Q05: HTTP 1.0 / 1.1 / 2.0 的主要区别？
- **难度**：★☆☆
- **知识点**：HTTP 版本演进 / 协议特性
- **题型**：简答题

### 参考答案要点：

1. **HTTP/1.0（1996 年）**：
   - **短连接**：每个请求都需要建立新的 TCP 连接
   - **无 Host 头**：一台服务器只能托管一个域名
   - **无缓存机制**：通过 Pragma: no-cache 控制（非标准）
   - **问题**：性能差，大量 TCP 握手开销

2. **HTTP/1.1（1997 年，当前主流）**：
   - **长连接（Keep-Alive）**：默认开启，复用 TCP 连接
     ```http
     Connection: keep-alive
     ```
   - **Host 头强制**：支持虚拟主机（一台服务器多域名）
   - **管道化（Pipelining）**：理论上支持并行发送请求（**实际很少启用**）
   - **缓存机制完善**：Cache-Control、ETag、If-Modified-Since 等
   - **分块传输编码**：Chunked transfer encoding（流式响应）
   - **新增方法**：OPTIONS、PATCH、CONNECT 等

3. **HTTP/2（2015 年）**：
   - **二进制帧层**：将数据拆分为二进制帧（Frame），不再基于文本
   - **多路复用（Multiplexing）**：**单个 TCP 连接上并发多个请求**，解决队头阻塞
   - **头部压缩（HPACK）**：使用 Huffman 编码 + 动态字典压缩头部（减少 50%-90% 体积）
   - **服务器推送（Server Push）**：服务器可以主动推送资源（**已被废弃**）
   - **优先级控制**：可以为 Stream 设置依赖关系和权重

4. **核心对比表**：
   | 特性 | HTTP/1.0 | HTTP/1.1 | HTTP/2 |
   |------|----------|----------|--------|
   | 连接管理 | 短连接 | 长连接 | 多路复用 |
   | 并发请求 | 需要 6 个 TCP 连接 | 需要 6 个 TCP 连接 | 单连接并发 |
   | 头部压缩 | 无 | 无 | HPACK |
   | 服务器推送 | ❌ | ❌ | ✅（已废弃） |
   | 二进制协议 | ❌ | ❌ | ✅ |

5. **关键结论**：
   - **HTTP/2 的最大价值是解决了 HTTP 层面的队头阻塞**
   - 但 TCP 层面的队头阻塞仍然存在（丢包会影响所有 Stream）
   - 这正是 **HTTP/3 (QUIC)** 要解决的问题

> **追问链**：HTTP/2 的多路复用具体实现？为什么说 Pipelining 失败了？HTTP/3 如何彻底解决队头阻塞？

---

## Q06: 什么是 TCP 的三次握手？为什么要三次？
- **难度**：★☆☆
- **知识点**：TCP 握手 / 可靠传输
- **题型**：简答题

### 参考答案要点：

1. **三次握手过程**：
   ```
   客户端                          服务端
     │                               │
     │───── SYN=1, seq=x ──────────→│  (第一次：客户端发起)
     │                               │
     │←──── SYN=1, ACK=1, seq=y,    │  (第二次：服务端确认+发起)
     │      ack=x+1 ────────────────│
     │                               │
     │───── ACK=1, seq=x+1,         │  (第三次：客户端确认)
     │      ack=y+1 ──────────────→│
     │                               │
     │        ✅ 连接建立完成          │
   ```

2. **为什么要三次？（核心考点）**

   **原因一：防止已失效的连接请求到达服务器**
   - 场景：客户端发送的第一个 SYN 因网络延迟滞留
   - 如果两次握手就建立连接，这个旧 SYN 到达服务器会导致错误连接
   - 三次握手中，客户端收到 SYN+ACK 后会检查是否是自己发起的请求
   
   **原因二：同步双方的初始序列号（ISN）**
   - 双方都需要确认对方的接收能力
   - 三次握手确保双方的 send/receive 能力都正常

   **原因三：最小可靠保证**
   - 两次握手：只能证明客户端能发、服务端能收
   - 三次握手：证明双方都能正常收发

3. **SYN 攻击（SYN Flood）**：
   - 攻击者大量发送 SYN 包但不完成第三次握手
   - 导致服务器维持大量半连接（SYN_RCVD 状态），耗尽资源
   - **防御措施**：SYN Cookie、增加半连接队列、防火墙过滤

4. **关键状态转换**：
   - 客户端：`CLOSED` → `SYN_SENT` → `ESTABLISHED`
   - 服务端：`CLOSED` → `LISTEN` → `SYN_RCVD` → `ESTABLISHED`

> **追问链**：TCP 四次挥手为什么是四次而不是三次？SYN Cookie 的原理是什么？

### 🔍 追问链
1. **[SYN Flood 攻击原理与防御体系]**
   → 方向：攻击方式（伪造 IP 大量发送 SYN 包）、资源耗尽原理（半连接队列满）、防御方案（SYN Cookie / 增大半连接队列 / 防火墙过滤）、现代云厂商的 DDoS 防护能力
2. **[TCP Fast Open (TFO) 优化]**
   → 方向：TFO 如何减少握手 RTT（首次握手获取 Cookie，后续连接跳过握手直接传数据）、安全性考虑（重放攻击风险）、Linux 内核配置（net.ipv4.tcp_fastopen）
3. **[SYN Cookie 工作机制详解]**
   → 方向：服务端不保存半连接状态，而是将客户端信息编码到 ISN 中返回；客户端第三次握手中携带该信息验证；优点（节省内存）与缺点（丢失 TCP 选项如窗口缩放、时间戳等）

---

## Q07: 什么是 TCP 的四次挥手？为什么 TIME_WAIT 要等 2MSL？
- **难度**：★☆☆
- **知识点**：TCP 断开连接 / TIME_WAIT
- **题型**：简答题

### 参考答案要点：

1. **四次挥手过程**：
   ```
   客户端                          服务端
     │                               │
     │───── FIN=1, seq=u ──────────→│  (第一次：客户端请求关闭)
     │                               │
     │←──── ACK=1, ack=u+1 ─────────│  (第二次：服务端确认)
     │                               │
     │←──── FIN=1, seq=w ──────────│  (第三次：服务端也请求关闭)
     │                               │
     │───── ACK=1, ack=w+1 ────────→│  (第四次：客户端确认)
     │                               │
     │  [TIME_WAIT 等待 2MSL]        │
     │  [关闭连接]                    │
   ```

2. **为什么是四次而不是三次？**
   - TCP 是**全双工**协议，每个方向需要独立关闭
   - 当客户端发送 FIN 时，表示"我不再发送数据了"
   - 但服务端可能还有数据要发送给客户端（如处理剩余请求）
   - 所以服务端先回复 ACK，等数据处理完后再发送自己的 FIN
   - **如果服务端没有数据要发送，第二次和第三次可以合并（变成三次挥手）**

3. **TIME_WAIT 为什么等待 2MSL？**
   
   MSL（Maximum Segment Lifetime）：报文最大生存时间（通常 30s-2min），2MSL 约 1-4 分钟
   
   **原因一：保证最后一个 ACK 能到达对方**
   - 如果服务端没有收到最后的 ACK，会重传 FIN
   - 客户端在 2MSL 内如果收到重传的 FIN，可以重新发送 ACK
   
   **原因二：让所有旧的报文在网络中消失**
   - 遲到的旧报文可能干扰新连接（相同四元组）
   - 等待 2MSL 确保本次连接的所有报文都从网络中消失

4. **TIME_WAIT 过多的危害与优化**：
   - **危害**：占用端口资源（一个连接占用一个本地端口），可能导致新连接失败
   - **场景**：高并发短连接的服务器（如 Nginx 反向代理）
   - **优化方案**：
     - 调整内核参数 `net.ipv4.tcp_tw_reuse`（允许复用 TIME_WAIT 端口）
     - 使用长连接（Keep-Alive）减少频繁建连断连
     - 负载均衡分散连接

> **追问链**：CLOSE_WAIT 状态过多说明什么？如何排查？如何快速回收 TIME_WAIT 连接？

---

## Q08: TCP 和 UDP 的区别是什么？各自适用场景？
- **难度**：★☆☆
- **知识点**：TCP vs UDP / 传输层协议
- **题型**：简答题

### 参考答案要点：

1. **核心特性对比**：
   | 特性 | TCP | UDP |
   |------|-----|-----|
   | 连接性 | 面向连接 | 无连接 |
   | 可靠性 | 可靠传输（确认+重传） | 不可靠（尽力交付） |
   | 有序性 | 保证顺序 | 不保证顺序 |
   | 流量控制 | 有（滑动窗口） | 无 |
   | 拥塞控制 | 有（慢启动等） | 无 |
   | 速度 | 较慢（复杂机制） | 快（头部仅 8 字节） |
   | 头部大小 | 20-60 字节 | 8 字节 |
   | 一对多 | 仅一对一 | 支持一对多（广播/组播） |

2. **TCP 适用场景**（需要可靠性）：
   - **HTTP/HTTPS**：网页浏览（不能丢数据）
   - **FTP**：文件传输（必须完整）
   - **SMTP/POP3/IMAP**：邮件传输
   - **SSH/Telnet**：远程登录
   - **数据库连接**：MySQL、Redis 等
   - **关键词**：文件传输、网页浏览、邮件、远程登录

3. **UDP 适用场景**（追求速度/实时性）：
   - **DNS**：域名解析（简单查询，可快速重试）
   - **DHCP**：动态主机配置
   - **视频/语音通话**（RTP/RTCP）：实时通信（允许丢包但不能延迟）
   - **在线游戏**：FPS、MOBA（低延迟优先）
   - **直播/流媒体**：实时推流
   - **IoT 设备通信**：传感器数据上报
   - **QUIC/HTTP/3**：新一代 Web 协议（基于 UDP）
   - **关键词**：实时音视频、游戏、直播、DNS、物联网

4. **经典面试回答模板**：
   > "TCP 就像打电话——要先拨号建立连接，确保对方听到每句话；UDP 就像寄明信片——写好就扔进邮筒，不管对方是否收到，但速度快、成本低。"

5. **现代趋势**：
   - QUIC 在 UDP 之上实现了类似 TCP 的可靠性（自定义拥塞控制）
   - **UDP 正在承担更多"类 TCP"的工作**，但避免了 TCP 的僵化和操作系统层面的限制

> **追问链**：UDP 如何实现可靠传输（如 QUIC）？TCP 的 Nagle 算法和小包问题？如何选择合适的协议？

---

## Q09: 什么是 DNS？DNS 查询的过程是怎样的？
- **难度**：★☆☆
- **知识点**：DNS 解析 / 域名系统
- **题型**：简答题

### 参考答案要点：

1. **什么是 DNS？**
   - DNS（Domain Name System）：域名系统
   - **作用**：将人类可读的域名（如 www.google.com）转换为机器可读的 IP 地址（如 142.250.80.46）
   - 类似于互联网的"电话簿"

2. **DNS 查询过程**（递归查询视角）：
   ```
   浏览器查询 www.example.com:
   
   ① 浏览器缓存 → 命中？✅ 直接返回 IP
                  ↓ 未命中
   ② 操作系统缓存（hosts 文件）→ 命中？✅
                              ↓ 未命中
   ③ 本地 DNS 服务器（ISP 提供/公共 DNS 如 114.114.114.114）
      ↓
   ④ 本地 DNS 递归查询：
      ├─ 根域名服务器（.）       → 返回 .com 的 NS 服务器地址
      ├─ 顶级域服务器（.com）    → 返回 example.com 的 NS 服务器地址  
      └─ 权威域名服务器           → 返回 www.example.com 的 IP 地址
   
   ⑤ 结果缓存并返回给浏览器
   ```

3. **DNS 记录类型**（重点）：
   | 类型 | 全称 | 作用 | 示例 |
   |------|------|------|------|
   | A | Address | 域名 → IPv4 | example.com → 93.184.216.34 |
   | AAAA | IPv6 Address | 域名 → IPv6 | example.com → 2606:2800:220:1:... |
   | CNAME | Canonical Name | 域名别名 | www.example.com → example.com |
   | MX | Mail Exchange | 邮件服务器 | example.com → mail.example.com |
   | NS | Name Server | 域名服务器 | example.com → ns1.example.com |
   | TXT | Text | 文本记录（SPF/DKIM） | SPF 验证、域名所有权验证 |
   | SRV | Service | 服务定位 | _sip._tcp.example.com |

4. **DNS 缓存与 TTL**：
   - TTL（Time To Live）：记录的存活时间（秒）
   - 各层级都有缓存：浏览器 → OS → Local DNS → ISP DNS
   - **常见 TTL 设置**：
     - 静态资源域名：较长（1 小时 ~ 1 天）
     - API 域名：较短（几分钟 ~ 1 小时）
     - CDN 域名：根据调度策略动态调整

5. **DNS 优化实践**：
   - 使用更快的 DNS（如阿里 DNS 223.5.5.5、腾讯 DNS 119.29.29.29）
   - **DNS Prefetch**：`<link rel="dns-prefetch" href="//example.com">`
   - 减少 DNS 查询次数（合并域名、使用预连接）
   - HTTP/2 多路复用后，域名收敛的重要性降低

> **追问链**：DNS 劫持是什么？如何防范？DNS over HTTPS (DoH) 的作用？CDN 的 DNS 调度原理？

---

## Q10: 在浏览器地址栏输入 URL 回车后发生了什么？（简版）
- **难度**：★☆☆
- **知识点**：浏览器工作流程 / 综合理解
- **题型**：简答题

### 参考答案要点：

1. **完整流程概览**：
   ```
   URL 输入 → DNS 解析 → TCP 连接 → 发送 HTTP 请求 → 服务器处理 → 返回响应 
   → 浏览器渲染 → 页面展示
   ```

2. **详细步骤**：

   **步骤 1：URL 解析**
   - 判断输入的是搜索关键字还是合法 URL
   - 解析协议（http/https）、域名、路径、参数等
   - **编码处理**：URL 编码（中文转 %XX 格式）

   **步骤 2：DNS 解析**（详见 Q09）
   - 浏览器缓存 → 系统 hosts → Local DNS → 递归查询
   - 获取目标服务器的 IP 地址

   **步骤 3：建立 TCP 连接**（三次握手）
   - 如果是 HTTPS，还会进行 TLS 握手（详见 Q03）
   - **注意**：现代浏览器会预先建立连接（Preconnect）

   **步骤 4：发送 HTTP 请求**
   - 构造请求行、请求头、请求体
   - 包含 Cookie、User-Agent、Accept 等信息

   **步骤 5：服务器处理请求**
   - 路由匹配、中间件执行、业务逻辑处理
   - 查询数据库、调用外部服务等
   - 构造 HTTP 响应

   **步骤 6：接收响应**
   - 状态码判断（200/301/302/404/500 等）
   - 根据 Content-Type 决定处理方式（HTML/CSS/JS/图片等）

   **步骤 7：浏览器渲染**（简化版）
   - 解析 HTML 构建 DOM 树
   - 解析 CSS 构建 CSSOM 树
   - 合成渲染树（Render Tree）
   - 布局（Layout）→ 绘制（Paint）→ 合成（Composite）

3. **关键时间节点**（Performance API 可测量）：
   - `navigationStart`：准备导航
   - `domainLookupStart/End`：DNS 查询
   - `connectStart/End`：TCP 连接
   - `requestStart/responseStart`：请求/响应
   - `domContentLoadedEventComplete`：DOM 解析完成
   - `loadEventComplete`：页面完全加载

4. **常见优化点**：
   - **减少 DNS 查询**：dns-prefetch、减少域名数量
   - **复用连接**：HTTP Keep-Alive、HTTP/2 多路复用
   - **减少请求**：资源合并、代码分割、懒加载
   - **缓存策略**：强缓存 + 协商缓存

> **追问链**：完整版请参考 Q22（详细版）。渲染过程中的关键渲染路径（CRP）是什么？如何用 Performance API 分析？

---

## Q11: 什么是浏览器的同源策略？
- **难度**：★☆☆
- **知识点**：同源策略 / 浏览器安全
- **题型**：简答题

### 参考答案要点：

1. **什么是"同源"？**
   - **同源 = 协议 + 域名 + 端口完全相同**
   - 示例对比：
     
     | URL | 与 http://example.com/page 是否同源 |
     |-----|-------------------------------------|
     | http://example.com/other | ✅ 同源（路径不同不影响） |
     | https://example.com/ | ❌ 协议不同 |
     | http://example.com:8080/ | ❌ 端口不同 |
     | http://app.example.com/ | ❌ 子域名不同 |
     | http://example.org/ | ❌ 域名不同 |

2. **同源策略的限制范围**：
   - **Cookie、LocalStorage、IndexedDB 无法读取**
   - **DOM 无法获得**（iframe 跨域访问受限）
   - **AJAX 请求不能发送**（会被浏览器拦截）

3. **同源策略的目的**：
   - **保护用户信息安全**：防止恶意网站读取其他网站的数据
   - **防止 CSRF 攻击**：限制未授权的跨站请求
   - **隔离不同来源的内容**：保障浏览器的沙箱安全模型

4. **不受同源策略限制的情况**：
   - `<script src="...">`、`<link>`、`<img>`、`<video>` 等标签的加载
   - 表单提交（POST/GET）
   - 页面跳转（window.location、<a> 链接）
   - **但这些情况无法读取响应内容**（除了 JSONP 利用 script 标签的特性）

5. **三个层面的同源策略**：
   - **DOM 层面**：限制对不同源 DOM 的读写（postMessage 解决）
   - **数据层面**：限制 Cookie、Storage 等的访问
   - **网络层面**：限制 XMLHttpRequest/fetch 的跨域请求（CORS 解决）

> **追问链**：如何实现安全的跨域通信？postMessage 的使用方式？document.domain 的安全问题？

---

## Q12: 什么是跨域？如何解决跨域问题？
- **难度**：★☆☆
- **知识点**：跨域 / CORS / JSONP / 代理
- **题型**：简答题

### 参考答案要点：

1. **什么是跨域？**
   - 当**协议、域名、端口**任一不同，就是跨域
   - 浏览器的**同源策略**限制了跨域 AJAX 请求
   - **注意**：跨域不是请求发不出去，而是**响应被浏览器拦截**

2. **解决方案一：CORS（跨域资源共享，推荐）** ⭐⭐⭐
   
   **服务端设置响应头**：
   ```http
   Access-Control-Allow-Origin: *  // 允许所有来源（开发环境）
   Access-Control-Allow-Origin: https://example.com  // 生产环境指定域名
   Access-Control-Allow-Methods: GET, POST, PUT, DELETE
   Access-Control-Allow-Headers: Content-Type, Authorization
   Access-Control-Allow-Credentials: true  // 允许携带 Cookie
   Access-Control-Max-Age: 86400  // 预检请求缓存时间（秒）
   ```
   
   **两种请求类型**：
   - **简单请求**：GET/HEAD/POST（Content-Type 仅限三种）、无自定义头 → 直接发送
   - **预检请求（Preflight）**：先发 OPTIONS 请求询问权限，通过后才发真实请求

3. **解决方案二：JSONP（已过时，了解即可）**
   ```html
   <!-- 利用了 script 标签不受同源策略限制 -->
   <script src="https://api.example.com/data?callback=handleData"></script>
   
   <script>
   function handleData(data) {
     console.log('收到数据:', data);
   }
   </script>
   ```
   
   - **只支持 GET 请求**
   - **存在 XSS 风险**（执行任意脚本）
   - **现代项目不建议使用**

4. **解决方案三：代理服务器（开发环境常用）**
   
   **Webpack/Vite 开发代理**：
   ```javascript
   // vite.config.js
   export default {
     server: {
       proxy: {
         '/api': {
           target: 'https://api.example.com',
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/api/, '')
         }
       }
     }
   }
   ```
   
   **Nginx 反向代理**：
   ```nginx
   location /api/ {
       proxy_pass https://api.example.com/;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
   }
   ```
   
   - **原理**：同源策略只限制浏览器，服务器之间的请求没有跨域限制

5. **解决方案四：PostMessage（iframe 跨域通信）**
   ```javascript
   // 发送方（父页面）
   const iframe = document.getElementById('myIframe');
   iframe.contentWindow.postMessage(
     { type: 'data', message: '来自父页面的问候' },
     'https://child-domain.com'  // 目标源（安全限制）
   );
   
   // 接收方（子页面 iframe）
   window.addEventListener('message', (event) => {
     // 必须验证来源！
     if (event.origin === 'https://parent-domain.com') {
       console.log('收到消息:', event.data);
     }
   });
   ```

6. **最佳实践总结**：
   | 方案 | 适用场景 | 推荐度 |
   |------|---------|--------|
   | CORS | 前后端分离的标准方案 | ⭐⭐⭐⭐⭐ |
   | Nginx 代理 | 生产环境统一入口 | ⭐⭐⭐⭐ |
   | 开发代理 | 本地开发调试 | ⭐⭐⭐⭐⭐ |
   | PostMessage | iframe 跨域通信 | ⭐⭐⭐ |
   | JSONP | 仅兼容老旧浏览器 | ⭐（不推荐） |

> **追问链**：CORS 的预检请求何时触发？Credentials 模式下 Origin 不能设置为 * 的原因？Nginx 代理的完整配置？

---

## Q13: Cookie 和 Session 的区别？
- **难度**：★☆☆
- **知识点**：Cookie / Session / 状态管理
- **题型**：简答题

### 参考答案要点：

1. **定义对比**：
   | 特性 | Cookie | Session |
   |------|--------|---------|
   | 存储位置 | **浏览器端**（可被 JS 读取） | **服务器端**（内存/Redis/数据库） |
   | 存储容量 | 约 4KB | 理论无限制 |
   | 安全性 | 较低（可被篡改/窃取） | 较高（数据不在客户端） |
   | 生命周期 | 可设置过期时间 | 默认浏览器关闭即失效（可配置） |
   | 跨域支持 | 受同源策略限制 | 通过 Cookie 携带 Session ID 实现 |
   | 服务器负担 | 无（客户端存储） | 有（需存储 Session 数据） |

2. **工作流程**：
   ```
   [首次登录]
   客户端 → POST /login {user, pass}
   服务端 → 验证成功 → 创建 Session → 生成 session_id
          → Set-Cookie: session_id=abc123; Path=/; HttpOnly; Secure; SameSite=Lax
   
   [后续请求]
   客户端 → 自动携带 Cookie: session_id=abc123
   服务端 → 根据 session_id 查找 Session 数据 → 返回对应资源
   ```

3. **Cookie 的重要属性**（面试高频）：
   ```javascript
   document.cookie = 'name=value; expires=Date; path=/; domain=.example.com; secure; httponly; samesite=lax';
   ```
   
   - **HttpOnly**：禁止 JavaScript 访问（**防 XSS 窃取 Cookie**）
   - **Secure**：仅在 HTTPS 下传输（**防中间人窃取**）
   - **SameSite**：控制跨站请求是否携带 Cookie
     - `Strict`：完全不携带（最安全）
     - `Lax`：默认值，部分跨站请求（如链接跳转）可携带
     - `None`：全部可携带（需配合 Secure）
   - **Path**：Cookie 生效的路径
   - **Domain**：Cookie 生效的域名（可设为父域名实现子域名共享）
   - **Max-Age/Expires**：过期时间

4. **Session 的存储方案**：
   - **内存存储**：单机部署，重启丢失（开发/测试环境）
   - **Redis 存储**：**生产推荐**，支持分布式、持久化、自动过期
   - **数据库存储**：MySQL/MongoDB，适合需要持久化的场景
   - **JWT 替代方案**：无状态 Session（见 Q04）

5. **Token (JWT) vs Cookie + Session 选择指南**：
   - **传统 Web 应用**（SSR、表单提交为主）→ Cookie + Session
   - **前后端分离 SPA**（API 调用为主）→ JWT Token
   - **移动端 App** → JWT Token（原生 Cookie 支持有限）
   - **混合架构** → 双令牌机制（Access Token + Refresh Token）

> **追问链**：Session 固定攻击（Session Fixation）的原理和防御？如何实现分布式 Session 共享？Cookie 的第三方 Cookie 限制对广告追踪的影响？

---

## Q14: WebSocket 和 HTTP 的区别？
- **难度**：★☆☆
- **知识点**：WebSocket / 实时通信
- **题型**：简答题

### 参考答案要点：

1. **核心区别**：
   | 特性 | HTTP | WebSocket |
   |------|------|-----------|
   | 协议 | 应用层协议（请求-响应模式） | 基于 TCP 的全双工协议 |
   | 通信模式 | 半双工（单向轮流） | **全双工**（双向同时） |
   | 连接状态 | 无状态，每次请求新建 | **持久连接**，保持长连接 |
   | 首次连接 | 直接请求 | **需要握手升级**（基于 HTTP） |
   | 数据格式 | 文本（HTTP 报文） | 二进制帧（支持文本和二进制） |
   | 适用场景 | 请求-响应（网页加载、API） | 实时通信（聊天、推送、游戏） |

2. **WebSocket 握手过程**（基于 HTTP 升级）：
   ```http
   // 客户端请求（看起来像普通 HTTP）
   GET /chat HTTP/1.1
   Host: server.example.com
   Upgrade: websocket              // 关键：请求协议升级
   Connection: Upgrade            // 关键：声明连接升级
   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==  // 安全密钥
   Sec-WebSocket-Version: 13      // 协议版本
   
   // 服务端响应（101 Switching Protocols）
   HTTP/1.1 101 Switching Protocols
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=  // 确认密钥
   ```
   
   - **握手成功后，协议从 HTTP 切换为 WebSocket**
   - 之后的数据传输不再是 HTTP 报文格式

3. **WebSocket 数据帧结构**（简化版）：
   ```
   0                   1                   2                   3
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-------+-+-------------+-------------------------------+
   |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
   |I|S|S|S|  (4)  |A|     (7)     |            (16/64)            |
   |N|V|V|V|       |K|             |   (if payload len==126/127)   |
   +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
   |     Extended payload length continued, if payload len == 127  |
   + - - - - - - - - - - - - - - - +-------------------------------+
   |                               |Masking-key, if MASK set to 1  |
   +-------------------------------+-------------------------------+
   | Masking-key (continued)       |          Payload Data         |
   +-------------------------------- - - - - - - - - - - - - - - - -
   :                     Payload Data continued ...                :
   + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   |                     Payload Data continued ...                |
   +---------------------------------------------------------------+
   ```

4. **WebSocket API 使用示例**：
   ```javascript
   // 创建 WebSocket 连接
   const ws = new WebSocket('wss://echo.websocket.org');
   
   // 连接打开事件
   ws.onopen = function() {
     console.log('连接已建立');
     ws.send('你好，WebSocket！');  // 发送消息
   };
   
   // 接收消息事件
   ws.onmessage = function(event) {
     console.log('收到消息:', event.data);
   };
   
   // 错误处理
   ws.onerror = function(error) {
     console.error('WebSocket 错误:', error);
   };
   
   // 连接关闭事件
   ws.onclose = function(event) {
     console.log('连接已关闭，code:', event.code, 'reason:', event.reason);
   };
   
   // 主动关闭连接
   // ws.close(1000, '正常关闭');
   ```

5. **应用场景**：
   - **即时通讯**：微信 Web 版、在线客服
   - **实时推送**：股票行情、体育比分、通知提醒
   - **在线协作**：Google Docs、Figma
   - **在线游戏**：多人联机、实时对战
   - **实时位置追踪**：外卖配送、车辆监控

6. **心跳机制（Heartbeat）**：
   ```javascript
   // 心跳检测实现
   let heartbeatTimer;
   
   function startHeartbeat() {
     heartbeatTimer = setInterval(() => {
       if (ws.readyState === WebSocket.OPEN) {
         ws.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));
       }
     }, 30000);  // 每 30 秒发送一次心跳
   }
   
   // 收到 pong 响应说明连接正常
   ws.onmessage = (event) => {
     const data = JSON.parse(event.data);
     if (data.type === 'pong') {
       console.log('心跳正常');
     }
   };
   ```

> **追问链**：WebSocket 的断线重连策略？如何实现消息的可靠投递（ACK 机制）？Socket.io 和原生 WebSocket 的区别？

---

## Q15: 什么是 CDN？它的工作原理是什么？
- **难度**：★☆☆
- **知识点**：CDN / 内容分发网络 / 性能优化
- **题型**：简答题

### 参考答案要点：

1. **什么是 CDN？**
   - CDN（Content Delivery Network）：内容分发网络
   - **核心思想**：将资源缓存到离用户最近的边缘节点（Edge Node）
   - **目的**：加速内容分发、降低源站压力、提高可用性

2. **CDN 工作流程**：
   ```
   用户请求 → [智能 DNS 解析] → 返回最近节点 IP
                                   ↓
                        [CDN 边缘节点]
                           ├── 命中缓存 → 直接返回资源 ✅（快速！）
                           └── 未命中 → 回源到源站 → 获取资源 → 缓存并返回
   ```

3. **关键技术**：

   **智能 DNS（GSLB - 全局负载均衡）**：
   - 根据用户 IP 地理位置，返回最优的 CDN 节点 IP
   - 考虑因素：距离、节点负载、网络状况、运营商线路
   - **示例**：北京用户访问 → 分配到北京电信节点

   **缓存策略**：
   - **边缘缓存**：静态资源（JS/CSS/图片/字体/视频）
   - **缓存命中率**：衡量 CDN 效果的核心指标（越高越好）
   - **缓存刷新**：主动清除（PURGE）或版本号更新（?v=xxx）

   **回源策略**：
   - **回源率**：未命中缓存需要回源的比例（越低越好）
   - **回源带宽**：CDN 节点到源站的带宽消耗

4. **CDN 的优势**：
   - **加速**：就近访问，大幅降低延迟（国内通常 < 50ms）
   - **节省带宽**：减少源站带宽成本（尤其视频/大文件）
   - **高可用**：节点故障自动切换，DDoS 防护
   - **减轻源站压力**：大部分请求由 CDN 承担

5. **CDN 配置实践**：
   ```html
   <!-- 静态资源使用 CDN 域名 -->
   <link rel="stylesheet" href="https://cdn.example.com/styles/main.css">
   <script src="https://cdn.example.com/js/app.js"></script>
   <img src="https://cdn.example.com/images/logo.png" alt="Logo">
   ```
   
   **缓存控制头**：
   ```http
   # 强缓存（长期不变的资源）
   Cache-Control: public, max-age=31536000  // 1 年
   ETag: "v1.0.0"
   
   # 协商缓存（可能变化的资源）
   Cache-Control: no-cache
   ETag: "abc123"
   ```

6. **CDN 类型**：
   | 类型 | 代表厂商 | 适用场景 |
   |------|---------|---------|
   | 通用型 CDN | 阿里云 CDN、腾讯云 CDN、Cloudflare | 静态资源加速 |
   | 视频 CDN | 七牛云、又拍云 | 视频/直播加速 |
   | 全站加速 DSA | Cloudflare、Akamai | 动静混合加速 |
   | P2P CDN | WebTorrent | 大文件分发 |

> **追问链**：CDN 的缓存穿透和缓存雪崩？如何配置 CDN 的缓存规则？多级缓存架构设计？

---

## Q16: HTTP/2 相比 HTTP/1.1 有哪些提升？解决了哪些问题？
- **难度**：★★☆
- **知识点**：HTTP/2 / 协议优化 / 性能
- **题型**：简答题

### 参考答案要点：

1. **HTTP/1.1 的核心问题**（HTTP/2 要解决的）：

   **问题一：队头阻塞（Head-of-Line Blocking）**
   - HTTP/1.1 虽然支持 Keep-Alive，但**请求必须串行发送**
   - 一个慢请求（如大图片）会阻塞后续所有请求
   - **解决**：浏览器针对同一域名最多开 6 个 TCP 连接来缓解（但这不是根本解决方案）

   **问题二：头部冗余**
   - 每个请求都携带完整的头部（User-Agent、Cookie、Accept 等）
   - 大量重复字段导致带宽浪费
   - **解决**：HPACK 头部压缩算法

   **问题三：无法优先级控制**
   - 所有请求同等对待，关键资源（CSS/HTML）可能被非关键资源（图片）阻塞
   - **解决**：Stream 优先级和依赖关系

2. **HTTP/2 的四大核心改进**：

   **改进一：二进制帧层（Binary Framing Layer）** ⭐⭐⭐
   ```
   HTTP/1.1 文本格式：
   GET /index.html HTTP/1.1\r\n
   Host: example.com\r\n
   \r\n
   
   HTTP/2 二进制帧格式：
   +-----------------------------------------------+
   |                 Length (24)                    |
   +---------------+---------------+---------------+
   |   Type (8)    |   Flags (8)   |
   +-+-------------+---------------+-------------------------------+
   |R|                 Stream Identifier (31)                      |
   +=+=============================================================+
   |                   Frame Payload (0...)                       ...
   +---------------------------------------------------------------+
   ```
   - 将 HTTP 报文拆分为更小的**帧（Frame）**
   - 每个帧属于某个**流（Stream）**
   - **帧可以在同一个 TCP 连接上交错发送**

   **改进二：多路复用（Multiplexing）** ⭐⭐⭐
   - **单一 TCP 连接上并发多个请求/响应**
   - 请求之间互不阻塞（解决了 HTTP 层面的队头阻塞）
   - **Stream 概念**：每个请求-响应对是一个逻辑上的 Stream
   - Stream 之间可以设置**依赖关系和优先级**

   **改进三：头部压缩（HPACK）** ⭐⭐
   - **静态字典**：包含常见的头部名称和值（如 method: GET）
   - **动态字典**：在连接期间构建，存储之前出现过的头部
   - **Huffman 编码**：对头部数据进行压缩
   - **效果**：头部体积减少 50%-90%

   **改进四：服务器推送（Server Push）** ⚠️ 已废弃
   - 服务器可以在客户端请求之前主动推送资源
   - **典型场景**：请求 index.html 时，服务器顺便推送 style.css 和 main.js
   - **现状**：由于难以准确预测需求且增加复杂性，**Chrome 已移除支持**，HTTP/3 也未包含

3. **性能提升实测数据**：
   | 指标 | HTTP/1.1 (6 连接) | HTTP/2 (1 连接) | 提升 |
   |------|-------------------|-----------------|------|
   | 页面加载时间 | 2.3s | 1.5s | **35%** |
   | 请求数 | 100 | 100 | 相同 |
   | 连接数 | 6 | 1 | **83% 减少** |
   | 头部大小 | 800KB | 120KB | **85% 减少** |

4. **HTTP/2 的局限性**：
   - **TCP 层面的队头阻塞仍然存在**
   - TCP 丢包会导致整个连接的所有 Stream 受影响
   - 这正是 **HTTP/3 (QUIC)** 要解决的问题

5. **启用 HTTP/2**：
   ```nginx
   # Nginx 启用 HTTP/2
   listen 443 ssl http2;
   
   ssl_certificate     /path/to/cert.pem;
   ssl_certificate_key /path/to/key.pem;
   ```
   
   **前提条件**：
   - 必须 HTTPS（HTTP/2 不支持明文）
   - 现代 Nginx/Apache 都默认支持
   - 主流浏览器 100% 支持

> **追问链**：HTTP/2 的 Stream 优先级如何影响资源加载？HPACK 的安全漏洞（CRIME 攻击变体）？如何检测网站是否启用了 HTTP/2？

### 🔍 追问链
1. **[Stream 优先级与依赖树机制]**
   → 方向：依赖关系（父/子 Stream、权重值）、优先级反转问题（高权重子流被低权重兄弟流饿死）、服务端推送的优先级处理
2. **[HPACK 动态表大小限制与安全风险]**
   → 方向：CRIME/BREACH 类攻击（通过动态表侧信道窃取 Header 信息）、SETTINGS_HEADER_TABLE_SIZE 的安全配置建议、HPACK 静态字典与 Huffman 编码的优化效果
3. **[HTTP/2 连接迁移与多路复用的局限]**
   → 方向：TCP 层面队头阻塞依然存在（丢包影响所有 Stream）、连接迁移困难（四元组变化导致断连）、这是 HTTP/3 (QUIC) 要解决的核心问题

---

## Q17: HTTPS 的加密过程是怎样的？TLS 握手的详细步骤？
- **难度**：★★☆
- **知识点**：HTTPS / TLS 握手 / 加密算法
- **题型**：简答题

### 参考答案要点：

1. **TLS 握手完整流程**（以 TLS 1.2 为例）：
   ```
   客户端                                    服务端
     │                                         │
     │  ① ClientHello                          │
     │  ──────────────────────────────────────→ │
     │  · 支持的密码套件列表                    │
     │  · 支持的 TLS 版本                      │
     │  · 客户端随机数 (Client Random)          │
     │                                         │
     │  ② ServerHello + Certificate            │
     │  ←────────────────────────────────────── │
     │  · 选定的密码套件                        │
     │  · 服务端随机数 (Server Random)          │
     │  · 数字证书（含公钥）                    │
     │                                         │
     │  ③ 验证证书 + 生成预主密钥               │
     │  · 验证证书链、有效期、域名              │
     │  · 用服务端公钥加密 Pre-Master Secret    │
     │                                         │
     │  ④ ClientKeyExchange (加密的 PMS)        │
     │  ──────────────────────────────────────→ │
     │                                         │
     │  ⑤ 双方计算会话密钥                      │
     │  · master_secret = PRF(ClientRandom +   │
     │    ServerRandom + PreMasterSecret)       │
     │  · 派生加密密钥、MAC 密钥                │
     │                                         │
     │  ⑥ ChangeCipherSpec + Finished          │
     │  ←────────────────────────────────────── │
     │                                         │
     │  ⑦ ChangeCipherSpec + Finished          │
     │  ──────────────────────────────────────→ │
     │                                         │
     │  ✅ 握手完成，开始加密通信               │
   ```

2. **密码套件（Cipher Suite）组成**：
   ```
   TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
   │    │    │   │        │        │
   │    │    │   │        │        └── 消息认证算法 (SHA256)
   │    │    │   │        └── 对称加密算法 (AES-128-GCM)
   │    │    │   └── 密钥交换使用 RSA 签名
   │    │    └── 密钥交换算法 (ECDHE - 椭圆曲线 Diffie-Hellman)
   │    └── 密钥交换使用椭圆曲线
   └── 协议版本 (TLS)
   ```

3. **非对称加密 vs 对称加密的角色**：
   
   **非对称加密（RSA/ECC）**：
   - 用于**握手阶段**的安全密钥交换
   - 公钥加密，私钥解密（或反之用于签名）
   - **速度慢**，不适合传输大量数据
   
   **对称加密（AES/ChaCha20）**：
   - 用于**数据传输阶段**的实际通信加密
   - 双方共享同一把密钥
   - **速度快**（比非对称快 100-1000 倍）

4. **TLS 1.3 的重大改进**（2021 年发布）：
   - **握手从 2-RTT 减少到 1-RTT**（甚至 0-RTT 简单恢复）
   - **移除不安全的算法**：RC4、DES、3DES、CBC 模式等
   - **强制使用 PFS（完美前向保密）**：ECDHE 密钥交换
   - **加密 Server Hello**：防止中间人探测
   - **支持 0-RTT**：恢复连接时可立即发送数据（有重放攻击风险）

5. **证书验证流程**：
   ```
   浏览器收到证书后：
   ① 检查证书是否过期
   ② 验证域名是否匹配（CN 或 SAN 字段）
   ③ 验证数字签名（用 CA 的公钥解密签名，比对证书哈希）
   ④ 逐级验证证书链直到根证书
   ⑤ 检查证书吊销状态（CRL/OCSP）
   ⑥ 如果全部通过 → 显示🔒安全标识
      如果任一步骤失败 → 显示安全警告 ⚠️
   ```

6. **常见问题和优化**：
   - **Session Resumption**：复用之前的会话参数，减少握手开销
   - **OCSP Stapling**：服务器主动提供证书状态，避免客户端单独查询
   - **HSTS**：强制使用 HTTPS，防止降级攻击
   - **证书选择**：Let's Encrypt（免费）、EV 证书（绿色地址栏，已取消特殊标识）

> **追问链**：中间人攻击（MITM）的具体过程？证书透明度（Certificate Transparency）的作用？TLS 1.3 的 0-RTT 安全风险？

### 🔍 追问链
1. **[TLS 1.3 的 0-RTT 安全风险与缓解]**
   → 方向：0-RTT 允许客户端在首次握手时即发送数据（节省 1 RTT），但存在重放攻击风险（攻击者截获并重放 0-RTT 数据）；缓解方案：单次使用 Ticket、服务端记录已使用的 Ticket
2. **[证书固定化攻击（Certificate Pinning）及 ECDHE vs RSA 密钥交换]**
   → 方向：ECDHE 提供 PFS（完美前向保密），即使私钥泄露也无法解密历史会话；RSA 无 PFS；HPKP 已废弃，但 Certificate Transparency (CT) 成为新的信任机制
3. **[OCSP Stapling 与证书吊销检查优化]**
   → 方向：传统 OCSP 查询增加 RTT 且暴露用户隐私；Stapling 让服务器主动提供证书状态；Must-Staple 强制要求

---

## Q18: HTTP 缓存机制详解（强制缓存 + 协商缓存）
- **难度**：★★☆
- **知识点**：HTTP 缓存 / 性能优化 / Cache-Control
- **题型**：简答题

### 参考答案要点：

1. **缓存分类总览**：
   ```
   浏览器请求资源时的判断流程：
   
   ┌─────────────────────────────────────┐
   │         浏览器本地缓存               │
   └──────────────┬──────────────────────┘
                  │
          ┌───────▼───────┐
          │  缓存是否存在？ │
          └───────┬───────┘
           否 ↙         ↘ 是
      直接请求服务器   ┌─────────────────┐
                      │ 是否过期？        │
                      │ (Expires/        │
                      │  max-age)        │
                      └────────┬────────┘
                      未过期 ↙      ↘ 已过期
                   【强制缓存命中】  ┌─────────────────┐
                   直接使用缓存     │ 协商缓存验证      │
                   Status: 200      │ (ETag/           │
                   (from disk cache)│  Last-Modified)  │
                                     └────────┬────────┘
                                  未修改 ↙      ↘ 已修改
                             【协商缓存命中】  从服务器获取
                             Status: 304        Status: 200
                             使用本地缓存        更新缓存
   ```

2. **强制缓存（Strong Cache）**：
   
   **相关头部**：
   ```http
   # HTTP/1.0 语法（已过时，了解即可）
   Expires: Wed, 21 Oct 2025 07:28:00 GMT  // 绝对时间（受客户端时间影响）
   
   # HTTP/1.1 语法（推荐）
   Cache-Control: max-age=31536000    // 相对时间（秒），1年
   Cache-Control: no-cache            // 不使用强制缓存，走协商缓存
   Cache-control: no-store            // 完全不缓存（敏感数据）
   Cache-Control: public              // 可被代理/CDN 缓存
   Cache-Control: private             // 仅浏览器缓存（默认）
   Cache-Control: must-revalidate    // 缓存过期后必须验证
   Cache-Control: immutable           // 资源永不改变（如哈希命名的文件）
   ```

   **优先级**：`Cache-Control` > `Expires`

3. **协商缓存（Negotiation Cache / Conditional Cache）**：
   
   **方案一：Last-Modified / If-Modified-Since**（基于时间）
   ```http
   # 首次响应（服务器返回）
   Last-Modified: Wed, 21 Oct 2025 07:28:00 GMT
   
   # 再次请求（浏览器带上）
   If-Modified-Since: Wed, 21 Oct 2025 07:28:00 GMT
   
   # 服务器判断：
   # - 资源未修改 → 304 Not Modified（使用缓存）
   # - 资源已修改 → 200 OK（返回新资源 + 新的 Last-Modified）
   ```
   
   **方案二：ETag / If-None-Match**（基于内容哈希，**更精确**）⭐⭐⭐
   ```http
   # 首次响应（服务器返回内容的哈希值）
   ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
   
   # 再次请求（浏览器带上）
   If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
   
   # 服务器比对 ETag：
   # - 相同 → 304 Not Modified
   # - 不同 → 200 OK（返回新资源 + 新的 ETag）
   ```

   **ETag vs Last-Modified**：
   | 维度 | Last-Modified | ETag |
   |------|--------------|------|
   | 精确度 | 秒级（不够精确） | 内容级别（精确） |
   | 问题 | 文件修改但内容不变仍会重新下载 | 无此问题 |
   | 推荐 | ❌ 作为备选 | ✅ **首选** |

4. **用户操作对缓存的影响**：
   | 操作 | 强制缓存 | 协商缓存 |
   |------|---------|---------|
   | 正常地址栏回车 | 有效 | 有效 |
   | F5 / Cmd+R 刷新 | ❌ 无效（跳过） | ✅ 有效 |
   | Ctrl+F5 / Cmd+Shift+R 强刷 | ❌ 无效 | ❌ 无效（请求头加 Cache-Control: no-cache） |

5. **实战缓存策略配置**：
   ```nginx
   # Nginx 缓存配置示例
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
       # 静态资源：长期缓存（通过文件名哈希更新）
       add_header Cache-Control "public, max-age=31536000, immutable";
       
       # 关闭 ETag（因为文件名已包含哈希）
       etag off;
   }
   
   location /api/ {
       # API 响应：不缓存
       add_header Cache-Control "no-store";
   }
   
   location /index.html {
       # HTML 文件：协商缓存（经常变化但不想用户看到旧版）
       add_header Cache-Control "no-cache";
       etag on;
   }
   ```

   **前端构建工具集成**（Webpack/Vite）：
   ```javascript
   // 文件名带 contenthash，配合长期缓存
   // output: 'main.a1b2c3d4.js'
   // 这样文件内容变了，文件名也会变，自然绕过缓存
   ```

6. **缓存决策树**：
   ```
   资源类型判断：
   ├── HTML 文件 → no-cache（协商缓存，保证及时更新）
   ├── 带 Hash 的静态资源 → max-age=1y, immutable（永久缓存）
   ├── 不带 Hash 的静态资源 → max-age=较短时间 + ETag
   ├── API 数据 → no-store（不缓存）
   └── 第三方资源 → 考虑内联或自行托管（避免第三方挂掉）
   ```

> **追问链**：CDN 缓存和浏览器缓存的交互？Service Worker 缓存和 HTTP 缓存的优先级？如何做缓存预热？

### 🔍 追问链
1. **[no-cache vs no-store 的本质区别]**
   → 方向：no-cache（可缓存但必须先验证新鲜度，每次都发协商请求）、no-store（完全禁止任何缓存，敏感数据如银行交易必须用）；实际场景选择指南
2. **[私有缓存 vs 共享缓存的 Cache-Control 指令]**
   → 方向：public（CDN/代理可缓存，适合静态资源）、private（仅浏览器可缓存，适合用户个性化内容）、s-maxage（仅控制共享缓存的 max-age）
3. **[Vary 头的作用与缓存键设计]**
   → 方向：Vary: Accept-Encoding 让压缩和非压缩版本分别缓存；Vary: User-Agent 可能导致缓存爆炸；现代最佳实践是 Vary: Origin 或少用 Vary

---

## Q19: 浏览器的资源加载优先级是如何确定的？
- **难度**：★★☆
- **知识点**：资源优先级 / 渲染优化 / Chrome 内部机制
- **题型**：简答题

### 参考答案要点：

1. **Chrome 的资源优先级体系**：
   
   浏览器为每个请求分配优先级，**决定加载顺序和网络资源分配**：
   
   | 优先级 | 说明 | 典型资源 |
   |--------|------|---------|
   | **Highest** | 最高 | CSS（渲染阻塞）、<head>中的 JS（同步） |
   | **High** | 高 | 字体（FOIT/FOUT）、主线程 fetch/XHR |
   | **Medium** | 中 | 预加载图片 (<img>)、异步 JS (async)、track |
   | **Low** | 低 | 异步加载的图片（lazy load）、prefetch 资源 |
   | **Lowest** | 最低 | Beacon、Analytics 脚本 |

2. **优先级的判定规则**：

   **规则一：渲染阻塞资源优先级最高**
   - **CSS**：会阻塞渲染（除非 media query 不匹配）
   - **同步 JS (`<script>`)**：会阻塞 HTML 解析（除非 defer/async）
   - **原因**：浏览器希望尽快完成首屏渲染

   **规则二：发现时机影响优先级**
   - `<head>` 中的资源比 `<body>` 末尾的资源更早被发现
   - 动态插入的脚本（`document.createElement('script')`）默认中等优先级

   **规则三：资源类型固有优先级**
   - 图片：Medium（可见区域）/ Low（不可见区域）
   - 字体：High（文字渲染需要）
   - XHR/Fetch：High（可能是关键数据）

3. **如何干预优先级**：

   **方法一：`<link rel="preload">`**（提升优先级）⭐⭐⭐
   ```html
   <!-- 告诉浏览器这个资源很重要，尽早加载 -->
   <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="preload" href="/styles/critical.css" as="style">
   <link rel="preload" href="/hero-image.jpg" as="image">
   
   <!-- 关键 JavaScript -->
   <link rel="preload" href="/app.js" as="script">
   ```
   
   - **效果**：将资源优先级提升到 Highest
   - **注意事项**：不要滥用（约 10 个以内），否则适得其反

   **方法二：`<link rel="prefetch">`**（降低优先级，空闲时加载）
   ```html
   <!-- 预测用户下一步需要的资源，空闲时加载 -->
   <link rel="prefetch" href="/next-page.js">
   <link rel="prefetch" href="/detail-modal.css">
   ```
   
   - **效果**：优先级降至 Lowest，浏览器空闲时才加载
   - **适用场景**：下一页路由、详情弹窗资源

   **方法三：`fetch()` 的 priority 选项**（较新 API）
   ```javascript
   // 显式指定请求优先级
   fetch('/api/data', { priority: 'high' });  // 高优先级
   fetch('/analytics', { priority: 'low' });  // 低优先级
   ```

4. **实际案例：优化首屏加载**：
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <!-- 1. 关键 CSS 内联（避免请求阻塞） -->
     <style>
       /* 首屏关键样式（折叠以上内容） */
       body { margin: 0; font-family: system-ui; }
       .hero { min-height: 100vh; background: linear-gradient(...); }
     </style>
     
     <!-- 2. 预加载关键字体 -->
     <link rel="preload" href="/fonts/inter-var.woff2" as="font" crossorigin>
     
     <!-- 3. 预连接 API 域名（提前 DNS+TCP+TLS） -->
     <link rel="preconnect" href="https://api.example.com">
     
     <!-- 4. 其余 CSS（异步加载，不阻塞渲染） -->
     <link rel="preload" href="/styles/main.css" as="style">
     <!-- 或者用 JS 异步加载 -->
   </head>
   <body>
     <!-- 5. 关键内容 -->
     <div class="hero">...</div>
     
     <!-- 6. 非关键 JS（defer/async） -->
     <script src="/analytics.js" async></script>
     <script src="/app.js" defer></script>
     
     <!-- 7. 图片懒加载 -->
     <img data-src="/large-image.jpg" loading="lazy" alt="">
   </body>
   </html>
   ```

5. **Chrome DevTools 查看**：
   - Network 面板 → Priority 列
   - 可直观看到每个资源的优先级分配
   - Performance 面板 → Network 可视化请求瀑布图

> **追问链**：isconnectionpending 状态对优先级的影响？Chrome 的内部调度算法？如何量化优先级调整的效果？

---

## Q20: preload、prefetch、preconnect、dns-prefetch 的区别和使用场景？
- **难度**：★★☆
- **知识点**：资源提示（Resource Hints） / 性能优化
- **题型**：简答题

### 参考答案要点：

1. **四大 Resource Hints 总览**：
   | 提示 | 作用 | 触发时机 | 典型用途 |
   |------|------|---------|---------|
   | **dns-prefetch** | 提前 DNS 解析 | 当前页面 | 第三方域名 |
   | **preconnect** | DNS + TCP + TLS 握手 | 当前页面 | 关键第三方域名 |
   | **preload** | 高优先级下载资源 | 当前页面（立即） | 关键资源（字体/首屏图片） |
   | **prefetch** | 低优先级下载资源 | 空闲时 | 下一页/未来可能需要的资源 |

2. **逐一详解**：

   **① dns-prefetch**（最轻量）
   ```html
   <!-- 提前解析域名，省去后续请求的 DNS 时间（约 20-120ms） -->
   <link rel="dns-prefetch" href="//fonts.googleapis.com">
   <link rel="dns-prefetch" href="//analytics.example.com">
   ```
   
   - **代价极低**：只做 DNS 解析，不建立连接
   - **适用**：页面中会用到的第三方域名（字体、统计、广告等）
   - **注意**：仅适用于跨域域名

   **② preconnect**（中等代价）
   ```html
   <!-- 不仅 DNS 解析，还完成 TCP 握手 + TLS 握手（如果是 HTTPS） -->
   <link rel="preconnect" href="https://cdn.example.com">
   <link rel="preconnect" href="https://api.example.com">
   ```
   
   - **比 dns-prefetch 更进一步**：连接已就绪，随时可发请求
   - **代价**：占用一定的连接池和内存
   - **适用**：确定马上要用到的关键域名（API、CDN）
   - **可与 dns-prefetch 配合**（preconnect 不支持时降级为 dns-prefetch）

   **③ preload**（最重要）⭐⭐⭐
   ```html
   <!-- 立即以高优先级下载资源（不执行/不应用） -->
   <link rel="preload" href="/fonts/critical-font.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="preload" href="/hero-banner.webp" as="image">
   <link rel="preload" href="/critical-data.json" as="fetch">
   
   <!-- 预加载 CSS 并立即应用 -->
   <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
   <noscript><link rel="stylesheet" href="/styles.css"></noscript>
   ```
   
   - **as 属性必填**：告诉浏览器资源类型（正确设置优先级、匹配 CORS 等）
   - **crossorigin**：跨域资源必须设置（尤其是字体）
   - **常见 as 值**：script、style、image、font、fetch、audio、video、document
   - **误区**：preload 不是 prefetch 的"加强版"，两者目的不同

   **④ prefetch**（预测性加载）
   ```html
   <!-- 浏览器空闲时以最低优先级下载 -->
   <link rel="prefetch" href="/next-page.js">
   <link rel="prefetch" href="/detail.css">
   
   <!-- 也可以用 JS 动态触发（SPA 路由切换时） -->
   ```
   
   - **预测用户下一步行为**：搜索结果页 prefetch 详情页
   - **代价**：消耗带宽（移动端慎用）
   - **浏览器可能忽略**：如果带宽紧张或资源已满

3. **使用策略总结**：
   ```
   页面加载优化的黄金组合：
   
   <head>
     <!-- 第一步：预解析所有会用到的第三方域名 -->
     <link rel="dns-prefetch" href="//fonts.googleapis.com">
     <link rel="dns-prefetch" href="//static.hotjar.com">
     
     <!-- 第二步：预连接确定会用的关键域名 -->
     <link rel="preconnect" href="https://api.myapp.com">
     <link rel="preconnect" href="https://cdn.myapp.com">
     
     <!-- 第三步：预加载当前页面关键资源 -->
     <link rel="preload" href="/fonts/main.woff2" as="font" crossorigin>
     <link rel="preload" href="/images/hero.webp" as="image">
     
     <!-- 第四步：预取未来可能需要的资源 -->
     <link rel="prefetch" href="/next-route.js">
   </head>
   ```

4. **JavaScript API 动态触发**：
   ```javascript
   // 动态 prefetch（如路由切换时）
   function prefetchRoute(routePath) {
     const link = document.createElement('link');
     link.rel = 'prefetch';
     link.href = routePath;
     link.as = 'script';  // JS 文件
     document.head.appendChild(link);
   }
   
   // 用户鼠标悬停在链接上时 prefetch（Hover Prefetch）
   document.querySelectorAll('a[data-prefetch]').forEach(link => {
     link.addEventListener('mouseenter', () => {
       const href = link.getAttribute('href');
       if (href && !document.querySelector(`link[href="${href}"]`)) {
         const prefetchLink = document.createElement('link');
         prefetchLink.rel = 'prefetch';
         prefetchLink.href = href;
         document.head.appendChild(prefetchLink);
       }
     }, { once: true });
   });
   ```

5. **常见错误和注意事项**：
   - ❌ **滥用 preload**：太多 preload 会抢占关键资源带宽
   - ❌ **preload 不常用的资源**：浪费带宽和缓存空间
   - ❌ **忘记 as 属性**：浏览器无法正确处理资源
   - ❌ **prefetch 移动端大数据**：消耗用户流量
   - ✅ **配合 Performance 监控效果**：Resource Timing API

> **追问链**：modulepreload 的作用？Early Hints (103) 响应？Server Push 和 preload 的关系？

---

## Q21: TCP 的流量控制和拥塞控制的区别和实现？
- **难度**：★★☆
- **知识点**：TCP 流量控制 / 拥塞控制 / 滑动窗口
- **题型**：简答题

### 参考答案要点：

1. **流量控制 vs 拥塞控制**（核心区别）：
   | 维度 | 流量控制（Flow Control） | 拥塞控制（Congestion Control） |
   |------|------------------------|------------------------------|
   | **目的** | 防止发送方发太快，接收方来不及处理 | 防止过多的数据注入网络，造成网络拥塞 |
   | **关注点** | **接收端**的能力（接收窗口 rwnd） | **网络整体**的状况（拥塞窗口 cwnd） |
   | **机制** | 滑动窗口协议 | 慢启动、拥塞避免、快速重传、快速恢复 |
   | **反馈来源** | 接收方的 ACK 中的 window 字段 | 丢包事件、ECN（显式拥塞通知） |

2. **流量控制 —— 滑动窗口（Sliding Window）**：
   
   **基本原理**：
   ```
   发送方窗口大小 = min(接收窗口 rwnd, 拥塞窗口 cwnd)
   
   接收方在每个 ACK 中通告自己的接收缓冲区剩余空间（rwnd）
   发送方根据 rwnd 调整发送速率：
   - rwnd = 0 → 停止发送（零窗口探针定时器定期探测）
   - rwnd 增大 → 可以发送更多数据
   ```
   
   **滑动窗口示意**：
   ```
   发送方数据流：
   |----已发送已确认----|--已发送未确认--|-------待发送-------|----未发送----|
   |████████████████████|███████████████|░░░░░░░░░░░░░░░░░░░|..............|
                         ↑发送窗口左边界     ↑发送窗口右边界
                         
   每次 ACK 确认后，窗口向右滑动
   ```

3. **拥塞控制 —— 四大算法**：

   **① 慢启动（Slow Start）** 📈
   ```
   初始状态：cwnd = 1 MSS（最大报文段长度，通常 1460 字节）
   规则：每收到 1 个 ACK，cwnd += 1 MSS
   效果：指数增长（1 → 2 → 4 → 8 → 16 ...）
   退出条件：cwnd 达到 ssthresh（慢启动阈值）
   ```

   **② 拥塞避免（Congestion Avoidance）** 📈（线性增长）
   ```
   进入条件：cwnd >= ssthresh
   规则：每经过 1 个 RTT，cwnd += 1 MSS
   效果：线性增长（16 → 17 → 18 → 19 ...）
   目的：试探网络的承载能力，避免突然拥塞
   ```

   **③ 快速重传（Fast Retransmit）** ⚠️
   ```
   触发条件：收到 3 个重复 ACK（dup ACK）
   动作：立即重传丢失的报文段（不等超时定时器）
   原因：3 个 dup ACK 说明接收方确实收到了后续数据，只是中间丢了
   ```

   **④ 快速恢复（Fast Recovery）** 🔄
   ```
   触发条件：快速重传之后
   动作：
   - ssthresh = cwnd / 2
   - cwnd = ssthresh + 3*MSS（加上 3 个 dup ACK 对应的数据）
   - 之后进入拥塞避免（而非慢启动）
   
   对比旧版（ Tahoe）：直接回到慢启动（cwnd = 1）
   新版（Reno）效率更高
   ```

4. **完整的状态转换图**：
   ```
            cwnd
             ↑
             │     ╱╲ 慢启动（指数增长）
             │    ╱  ╲
             │   ╱    ╲
             │ ╱ ssthresh ←──── 拥塞发生（超时）
             │╱      ╲        cwnd = 1, ssthresh /= 2
             │╱        ╲
             ├──────────→ 拥塞避免（线性增长）
             │           ╲
             │            ╲ 3个dup ACK
             │             ╲→ 快速恢复
             │              ╲ cwnd = ssthresh + 3
             │               ╲ 再进入拥塞避免
   ```

5. **现代 TCP 变体**：
   | 变体 | 主要改进 | 使用场景 |
   |------|---------|---------|
   | **Tahoe** | 基础版本（超时回慢启动） | 历史参考 |
   | **Reno** | 快速恢复（当前 Linux 默认） | 通用 |
   | **NewReno** | 修复 Reno 的多个丢包问题 | 推荐 |
   | **CUBIC**（Linux 默认） | 更好的带宽利用率，适合高 BDP 网络 | 高速网络、数据中心 |
   | **BBR**（Google） | 基于带宽探测和 RTT，不依赖丢包 | YouTube、云服务 |
   | **Westwood** | 适应无线网络的高丢包率 | 移动网络、Wi-Fi |

6. **实际意义**：
   - **为什么下载速度开始慢后来快？** → 慢启动阶段
   - **为什么网络波动时速度下降？** → 拥塞控制触发
   - **为什么 UDP 没有？** → UDP 不保证可靠，不需要流量控制和拥塞控制（但 QUIC 自己实现了）

> **追问链**：BBR 算法的原理？TCP 的 Nagle 算法与小包问题？如何调优 TCP 参数（sysctl）？

---

## Q22: 从输入 URL 到页面展示的完整过程？（详细版，含 DNS/TCP/HTTP/渲染）
- **难度**：★★☆
- **知识点**：浏览器工作原理 / 综合知识
- **题型**：简答题

### 参考答案要点：

1. **完整流程（12 个步骤）**：

   **步骤 1：URL 解析与编码**
   ```
   输入：https://www.example.com/search?q=前端面试
   
   解析结果：
   - 协议：https
   - 域名：www.example.com
   - 路径：/search
   - 参数：q=前端面试（需要进行 URL 编码 → q=%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95）
   ```

   **步骤 2：检查缓存**（HTTP 缓存，详见 Q18）
   - 强制缓存有效 → 直接使用（from disk/memory cache）
   - 协商缓存 → 发送条件请求（304 则用缓存）
   - 缓存无效 → 继续网络请求

   **步骤 3：DNS 解析**（详见 Q09）
   ```
   浏览器缓存 → OS 缓存（hosts）→ 本地 DNS → 根域 → 顶级域 → 权威域
   最终得到：www.example.com → 93.184.216.34
   ```

   **步骤 4：建立 TCP 连接**（三次握手，详见 Q06）
   ```
   SYN → SYN+ACK → ACK （约 1-3 个 RTT）
   
   如果是 HTTPS，还需要 TLS 握手（详见 Q17）：
   ClientHello → ServerHello+证书 → 密钥交换 → 加密通信
   （TLS 1.2 约 2 RTT，TLS 1.3 约 1 RTT）
   ```

   **步骤 5：发送 HTTP 请求**
   ```http
   GET /search?q=%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95 HTTP/1.1
   Host: www.example.com
   User-Agent: Mozilla/5.0 ...
   Accept: text/html,application/xhtml+xml
   Accept-Language: zh-CN,zh;q=0.9
   Cookie: session_id=abc123; user_pref=dark
   Connection: keep-alive
   ```

   **步骤 6：服务器处理请求**
   - **网络层**：防火墙/WAF 过滤、负载均衡分发
   - **反向代理**：Nginx 处理静态资源、路由转发
   - **应用层**：Web 框架（Express/Spring/Django）执行业务逻辑
   - **数据层**：查询数据库/缓存（Redis）/ 调用微服务
   - **构造响应**：状态码、响应头、响应体

   **步骤 7：接收 HTTP 响应**
   ```http
   HTTP/1.1 200 OK
   Content-Type: text/html; charset=utf-8
   Content-Length: 45678
   Cache-Control: max-age=3600
   ETag: "abc123"
   Set-Cookie: tracking_id=xyz789; Path=/; HttpOnly; Secure; SameSite=Lax
   
   <!DOCTYPE html><html>...</html>
   ```

   **步骤 8：断开或复用 TCP 连接**
   - HTTP/1.0：关闭连接
   - HTTP/1.1：Keep-Alive 保持连接（默认）
   - HTTP/2：多路复用继续使用

   **步骤 9：浏览器渲染流程**（关键渲染路径 CRP）
   ```
   ① 字节流 → 字符流（解码）
      ↓
   ② 字符流 → Token 词法分析
      ↓
   ③ Token → DOM 树（语法分析）
      同时：CSS → CSSOM 树
      ↓
   ④ DOM + CSSOM → Render Tree（渲染树，不含 display:none 的元素）
      ↓
   ⑤ Layout（布局/回流）：计算每个元素的位置和大小
      ↓
   ⑥ Paint（绘制）：将渲染树绘制成像素
      ↓
   ⑦ Composite（合成）：将图层合成最终页面
   ```

   **步骤 10：加载子资源**
   - HTML 解析过程中遇到 `<link>`、`<script>`、`<img>` 等标签
   - 再次发起 DNS → TCP → 请求流程（可能复用已有连接）
   - **CSS 阻塞渲染**，**JS 阻塞解析**（除非 async/defer）

   **步骤 11：执行 JavaScript**
   - 同步脚本：立即执行（阻塞 HTML 解析）
   - async：下载后立即执行（不保证顺序）
   - defer：HTML 解析完成后按顺序执行
   - DOMContentLoaded 事件触发
   - 可能触发更多网络请求（AJAX、动态创建元素）

   **步骤 12：load 事件**
   - 所有资源加载完毕
   - `window.onload` 触发

2. **时间线可视化**（Performance API 关键节点）：
   ```
   0ms ── navigationStart（开始导航）
     │
   ▼ms ── domainLookupStart（DNS 开始）
   ▼ms ── domainLookupEnd（DNS 结束）
   ▼ms ── connectStart（TCP 开始）
   ▼ms ── secureConnectionStart（TLS 开始，如果是 HTTPS）
   ▼ms ── connectEnd（连接建立）
   ▼ms ── requestStart（发送请求）
   ▼ms ── responseStart（收到首字节 TTFB）
   ▼ms ── responseEnd（接收完成）
   ▼ms ── domLoading（DOM 开始解析）
   ▼ms ── domInteractive（DOM 解析完成）
   ▼ms ── domContentLoadedEventStart（DOMContentLoaded 触发）
   ▼ms ── domContentLoadedEventEnd
   ▼ms ── domComplete（DOM 完成）
   ▼ms ── loadEventStart（load 事件触发）
   ▼ms ── loadEventEnd
   ```

3. **性能优化切入点**（每个环节都可以优化）：
   | 环节 | 优化手段 | 预期收益 |
   |------|---------|---------|
   | DNS | dns-prefetch、减少域名 | 减少几十 ms |
   | TCP | HTTP/2 多路复用、连接复用 | 减少握手开销 |
   | TLS | TLS 1.3、OCSP Stapling、Session Resume | 减少握手 RTT |
   | 请求 | 减少请求数、压缩、CDN | 大幅减少传输时间 |
   | 响应 | Gzip/Brotli 压缩 | 减少 60-80% 体积 |
   | 渲染 | 关键 CSS 内联、JS 异步 | 减少阻塞时间 |
   | 资源 | 懒加载、预加载 | 优化加载顺序 |

> **追问链**：Service Worker 如何介入这个过程？HTTP/3 对流程的影响？如何用 Navigation Timing API 做性能监控？

---

## Q23: TCP 的粘包/拆包问题？HTTP 如何解决的？
- **难度**：★★☆
- **知识点**：TCP 特性 / 应用层协议 / 数据帧
- **题型**：简答题

### 参考答案要点：

1. **什么是粘包和拆包？**

   **粘包（Packet Sticking）**：
   - 发送方发送了两个独立的数据包，接收方**一次性收到了合并后的数据**
   - **原因**：TCP 是字节流协议，没有消息边界概念
   - **示例**：
     ```
     发送：["Hello"] ["World"]
     接收：["HelloWorld"] （粘在一起了）
     ```

   **拆包（Packet Splitting）**：
   - 发送方发送了一个大的数据包，接收方**分多次收到碎片**
   - **原因**：TCP 的 MSS（最大报文段长度）限制、缓冲区大小
   - **示例**：
     ```
     发送：["ThisIsAVeryLongMessage"]
     接收：["ThisIsAVer"] ["yLongMessa"] ["ge"] （被拆开了）
     ```

2. **为什么会发生？**
   
   **TCP 的本质特点**：
   - TCP 是**面向字节流的协议**，不是面向消息的
   - **Nagle 算法**：会将小包合并发送（减少网络开销）
   - **接收方缓冲区**：数据堆积在一起，应用层一次读取多个包
   - **滑动窗口**：数据可能分批发送

   **UDP 不会有这个问题**：
   - UDP 是面向消息的（datagram），保留消息边界
   - 每个 recvfrom() 收到一个完整的 sendto() 数据

3. **解决方案（通用思路）**：

   **方案一：固定长度**（简单但不灵活）
   ```
   约定每个消息固定 100 字节
   不足的部分用空字符填充
   ```
   
   - **优点**：实现简单
   - **缺点**：浪费带宽（短消息也要填充）、灵活性差

   **方案二：分隔符**（如 HTTP 的 \r\n\r\n）
   ```
   消息之间用特殊分隔符分开
   例如：MSG1\r\n\r\nMSG2\r\n\r\n
   ```
   
   - **优点**：灵活，消息长度可变
   - **缺点**：需要转义（消息内容本身包含分隔符时）
   - **应用**：HTTP、FTP、SMTP 等文本协议

   **方案三：长度前缀（Length-Prefix，推荐）** ⭐⭐⭐
   ```
   [4字节长度][消息体][4字节长度][消息体]
   0005Hello0005World
   ```
   
   - **优点**：高效、精确、无转义问题
   - **缺点**：需要额外 2/4 字节的长度字段
   - **应用**：WebSocket 帧、gRPC、自定义二进制协议

4. **HTTP 如何解决粘包/拆包？**

   **HTTP/1.x 的解决方案**：
   ```http
   # 方式一：Content-Length 头部（知道消息体的确切长度）
   HTTP/1.1 200 OK
   Content-Length: 13
   
   Hello, World!
   # 读取恰好 13 字节就是一个完整的响应
   
   # 方式二：Transfer-Encoding: chunked（不知道长度时，分块传输）
   HTTP/1.1 200 OK
   Transfer-Encoding: chunked
   
   5\r\n           # 第一块长度（5 字节）
   Hello\r\n       # 第一块数据
   5\r\n           # 第二块长度
   , Wor\r\n       # 第二块数据
   3\r\n           # 第三块长度
   ld!\r\n         # 第三块数据
   0\r\n           # 结束标记
   \r\n
   ```
   
   - **Content-Length**：明确告知消息体长度，读完即止
   - **Chunked Encoding**：每个块前面标注长度，0 表示结束
   - **两者互斥**：同一响应不能同时使用

   **HTTP/2 的解决方案**：
   - **帧（Frame）自带 Length 字段**（24 位，最大 16MB）
   - 每个 Frame 都是独立的消息单元
   - **不存在粘包/拆包问题**（协议层面已解决）

5. **代码示例（Node.js 手动处理粘包）**：
   ```javascript
   const net = require('net');
   
   // 自定义协议：[4字节长度前缀][JSON 数据]
   class PacketParser {
     constructor() {
       this.buffer = Buffer.alloc(0);
     }
     
     // 将新数据追加到缓冲区
     feed(data) {
       this.buffer = Buffer.concat([this.buffer, data]);
     }
     
     // 尝试解析出完整的消息
     parse() {
       const messages = [];
       
       while (this.buffer.length >= 4) {
         // 读取 4 字节的长度前缀（大端序）
         const msgLength = this.buffer.readUInt32BE(0);
         
         // 检查是否有足够的数据
         if (this.buffer.length < 4 + msgLength) {
           break;  // 数据不完整，等待更多数据
         }
         
         // 提取消息体
         const msgBody = this.buffer.slice(4, 4 + msgLength);
         messages.push(JSON.parse(msgBody.toString()));
         
         // 移除已处理的数据
         this.buffer = this.buffer.slice(4 + msgLength);
       }
       
       return messages;
     }
   }
   
   // 服务端使用
   const server = net.createServer((socket) => {
     const parser = new PacketParser();
     
     socket.on('data', (data) => {
       parser.feed(data);
       const messages = parser.parse();
       messages.forEach(msg => {
         console.log('收到完整消息:', msg);
       });
     });
   });
   
   server.listen(3000);
   ```

6. **实际开发启示**：
   - **使用成熟的应用层协议**（HTTP、gRPC、WebSocket）而非裸 TCP
   - **如果必须用 TCP**：务必实现自己的消息帧协议（推荐长度前缀方案）
   - **测试时要模拟网络异常**：小包、大包、半包、粘包都要测试

> **追问链**：Nagle 算法和 delayed ACK 的交互问题（40ms 延迟）？如何设计一个高效的二进制协议？ZeroCopy 在网络编程中的应用？

---

## Q24: 什么是 HTTP 的管线化（Pipelining）？为什么被废弃了？
- **难度**：★★☆
- **知识点**：HTTP Pipelining / HTTP/1.1 / HTTP/2
- **题型**：简答题

### 参考答案要点：

1. **什么是管线化（Pipelining）？**
   
   **HTTP/1.1 的尝试性功能**：
   - 允许客户端**在收到上一个响应之前**，发送下一个请求
   - 理论上可以实现请求的"并行"发送
   - **默认未启用**（需要显式配置）

   **对比普通模式和管线化**：
   ```
   普通 HTTP/1.1（串行）：
   客户端 ──req1──→ 服务端 ←──res1── 客户端（等待）
   客户端 ──req2──→ 服务端 ←──res2── 客户端（等待）
   客户端 ──req3──→ 服务端 ←──res3── 客户端
   
   管线化 HTTP/1.1（批量发送）：
   客户端 ──req1──→
   客户端 ──req2──→  （连续发送，不等待响应）
   客户端 ──req3──→
                    服务端 ←──res1──
                    服务端 ←──res2── （按顺序返回）
                    服务端 ←──res3──
   ```

2. **为什么失败了？（致命缺陷）**

   **缺陷一：队头阻塞（Head-of-Line Blocking）依然存在** ⭐⭐⭐
   - HTTP/1.1 要求**响应必须按请求顺序返回**
   - 如果第一个请求的处理很慢（如复杂的数据库查询），后面的请求即使处理完了也只能排队等待
   - **这实际上并没有真正解决问题**，只是把"发送的等待"变成了"接收的等待"

   **缺陷二：中间代理不支持** ⭐⭐
   - 很多代理服务器、网关**不支持管线化**
   - 可能导致请求乱序、响应丢失
   - 为了兼容性，浏览器**默认禁用**了管线化

   **缺陷三：故障处理复杂** ⭐⭐
   - 如果中途连接断开，很难判断哪些请求成功了、哪些需要重试
   - 需要复杂的恢复机制
   - **幂等性问题**：POST/PUT 等非幂等请求的重试很危险

   **缺陷四：无法利用优先级** ⭐
   - 所有请求同等对待
   - 关键资源（CSS）和非关键资源（图片）无法区分优先级

3. **实际影响**：
   - **Firefox 曾经支持**，后来移除
   - **Chrome 从未默认启用**
   - **HTTP/1.1 规范虽然定义了，但实际几乎没人用**
   - **这是 HTTP/2 诞生的重要动机之一**

4. **HTTP/2 的真正解决方案：多路复用**：
   
   **与管线化的本质区别**：
   | 特性 | HTTP/1.1 Pipelining | HTTP/2 Multiplexing |
   |------|---------------------|---------------------|
   | 请求发送 | 连续发送 | 交错发送（帧级别） |
   | 响应返回 | **必须有序** | **可以乱序**（Stream 独立） |
   | 队头阻塞 | **存在**（响应有序） | **HTTP 层面消除** |
   | 优先级 | 不支持 | 支持（Stream 依赖和权重） |
   | 容错性 | 差 | 好（单个 Stream 不影响其他） |

   **为什么 HTTP/2 成功而 Pipelining 失败？**
   - HTTP/2 引入了**二进制帧层**，每个请求-响应对是一个独立的 Stream
   - Stream 之间**完全独立**，可以乱序返回
   - 彻底消除了 HTTP 层面的队头阻塞

5. **历史教训**：
   - **设计协议时必须考虑中间设备的兼容性**
   - **理论上的优化不一定在实际环境中生效**
   - **队头阻塞问题的根源在于"有序"约束，而不在于"并行发送"**

> **追问链**：HTTP/2 的 Stream 优先级如何工作？HTTP/3 如何解决 TCP 层面的队头阻塞？QUIC 的 Stream 设计灵感是否来自 HTTP/2？

### 🔍 追问链
1. **[DNS 预解析（dns-prefetch）与预连接（preconnect）优化]**
   → 方向：`<link rel="dns-prefetch">` 提前 20-120ms 解析域名；`<link rel="preconnect">` 额外完成 DNS+TCP+TLS（节省 100-300ms）；实际项目中的组合使用策略
2. **[TCP Fast Open (TFO) 与 TLS Session Resumption]**
   → 方向：TFO 在 SYN 中携带数据减少 1 RTT；Session ID/Ticket 复用 TLS 参数减少 1 RTT；两者叠加可显著提升首屏性能
3. **[Early Hints (103 状态码) 的应用]**
   → 方向：服务端在完整响应前先推送关键资源提示（Link 头）；浏览器可提前建立连接/预加载；与 Server Push 和 preload 的区别

---

## Q25: QUIC 协议为什么选择基于 UDP 而不是 TCP？
- **难度**：★★☆
- **知识点**：QUIC / UDP / TCP / HTTP/3
- **题型**：简答题

### 参考答案要点：

1. **背景：TCP 的固有问题**（QUIC 要解决的）
   
   **问题一：TCP 队头阻塞（Head-of-Line Blocking）** ⭐⭐⭐
   - TCP 是**字节流协议**，所有数据在一个序列号空间
   - **任何一个包丢失**，后续所有包都要等待重传
   - 即使这些包已经到达了接收方
   - **HTTP/2 的多路复用无法解决这个问题**（因为底层还是 TCP）

   **问题二：TCP 升级困难** ⭐⭐
   - TCP 协议栈在**操作系统内核**中
   - 修改需要升级操作系统（周期很长）
   - 即使升级，中间设备（防火墙、路由器）可能不理解新特性
   - **从 TCP Fast Open 到普及用了近 10 年**

   **问题三：连接迁移困难** ⭐⭐
   - TCP 用**四元组**（源IP、源端口、目IP、目端口）标识连接
   - **网络切换**（WiFi → 4G）导致 IP 变化 → 连接断开 → 需要重新握手
   - 移动端体验差（频繁断连重连）

2. **QUIC 选择 UDP 的原因**：

   **原因一：绕过操作系统限制，在用户空间实现** ⭐⭐⭐
   ```
   传统 TCP 协议栈（内核态）：
   应用程序 → 系统调用 → 内核 TCP 栈 → 网络卡驱动
   
   QUIC 协议栈（用户态）：
   应用程序 → QUIC 库（用户空间） → UDP socket → 内核 → 网络卡驱动
   ```
   
   - **快速迭代**：不需要等操作系统升级
   - **灵活定制**：可以根据业务需求调整协议行为
   - **更好的拥塞控制**：BBR、Cubic 等算法可以自由选择和定制
   - **Google 的实践**：从 SPDY → QUIC，迭代速度远快于 TCP 标准化

   **原因二：彻底解决队头阻塞** ⭐⭐⭐
   ```
   TCP（单序列号空间）：
   包1 包2 包3 [包4丢失] 包5 包6 包7
   ✓   ✓   ✓   ✗（等待重传） ✗阻塞 ✗阻塞 ✗阻塞
   
   QUIC（多 Stream 独立序列号）：
   Stream1: 包1 包2 [包3丢失] 包4
   Stream2: 包1 包2 包3 包4  ← 不受 Stream1 影响
   Stream3: 包1 包2 包3 包4  ← 不受 Stream1 影响
   ```
   
   - 每个 Stream 有**独立的序列号空间**
   - Stream 之间**完全独立**，互不影响
   - **彻底消除了队头阻塞**（包括 TCP 层面的）

   **原因三：支持连接迁移（Connection Migration）** ⭐⭐
   ```
   QUIC 使用 Connection ID 标识连接（而非四元组）
   
   WiFi 环境：Connection ID: abc123, IP: 192.168.1.100
       ↓ 切换到 4G
   4G 环境：  Connection ID: abc123, IP: 10.0.0.55
       ↓ 连接不断！无缝切换！
   ```
   
   - **用户体验**：视频通话、游戏不断线
   - **移动端友好**：WiFi/4G/5G 切换无感

   **原因四：更快的握手（0-RTT / 1-RTT）** ⭐⭐
   ```
   TCP + TLS 1.2 握手：
   SYN → SYN+ACK → ACK → ClientHello → ServerHello + [证书] → KeyExchange
   = 3 RTT（至少）
   
   QUIC 首次连接：
   ClientHello (含密钥材料) → ServerHello (含证书+密钥材料)
   = 1 RTT
   
   QUIC 恢复连接（0-RTT）：
   客户端直接发送数据和连接凭证
   = 0 RTT（首次数据 0 延迟）
   ```
   
   - **Crypto 握手和应用数据合并**
   - **相比 TCP+TLS 1.2 的 3 RTT，快了很多**

   **原因五：避免中间设备干扰** ⭐
   - 很多中间设备（防火墙、NAT、代理）会对 TCP 做"优化"
   - 这些"优化"可能破坏协议的正确性
   - UDP 通常被**直接透传**，干扰较少

3. **QUIC 自己实现了 TCP 的能力**：
   | TCP 特性 | QUIC 实现 |
   |---------|----------|
   | 可靠传输 | 自定义 ACK 机制 + 重传 |
   | 顺序保证 | 每个 Stream 内部有序 |
   | 流量控制 | Stream 级别和连接级别的流量控制 |
   | 拥塞控制 | 可插拔（默认 BBP，也可用 Cubic/Reno） |
   | 加密 | 内置 TLS 1.3（不是可选的） |

4. **QUIC 的代价**：
   - **用户态协议栈的开销**：更多的上下文切换和内存拷贝
   - **UDP 的劣势**：某些网络环境对 UDP 有限制（如企业防火墙）
   - **生态成熟度**：不如 TCP 成熟（但正在快速改善）
   - **调试困难**：tcpdump/wireshark 对 QUIC 的支持不如 TCP 完善

5. **当前状态（2025 年）**：
   - **HTTP/3（基于 QUIC）已在主流浏览器支持**：Chrome、Firefox、Safari
   - **大型站点已启用**：Google、Facebook、Cloudflare
   - **IETF RFC 9000**：QUIC 已成为正式标准
   - **国内支持度提升**：阿里云、腾讯云均已支持 QUIC

> **追问链**：QUIC 的拥塞控制如何实现？0-RTT 的安全风险（重放攻击）？如何检测和调试 QUIC 连接？

---

## Q26: XSS 攻击有哪些类型？如何防御？
- **难度**：★★☆
- **知识点**：XSS / Web 安全 / 前端安全
- **题型**：简答题

### 参考答案要点：

1. **XSS（Cross-Site Scripting）跨站脚本攻击定义**：
   - 攻击者在**目标网站注入恶意脚本**
   - 当其他用户浏览该页面时，恶意脚本会在其浏览器中执行
   - **危害**：窃取 Cookie、Session 劫持、页面篡改、钓鱼、挖矿等

2. **三大类型详解**：

   **类型一：反射型 XSS（Reflected XSS）** ⭐⭐⭐（最常见）
   ```
   攻击场景：
   攻击者构造恶意链接：
   https://example.com/search?q=<script>alert('XSS')</script>
   
   用户点击链接 → 服务器将 q 参数原样返回到页面 → 脚本执行
   ```
   
   - **特点**：恶意代码**不存储在服务器**，需要诱骗用户点击
   - **常见入口**：搜索框、错误页面、URL 参数回显
   - **危害程度**：中等（需要社会工程学配合）

   **类型二：存储型 XSS（Stored/Persistent XSS）** ⭐⭐⭐（最危险）
   ```
   攻击场景：
   1. 攻击者在评论区提交：<script>stealCookie()</script>
   2. 服务器**存储**到数据库（未过滤）
   3. 其他用户查看评论区时，脚本自动执行
   ```
   
   - **特点**：恶意代码**持久化存储**在服务器
   - **常见入口**：评论、帖子、个人信息、商品描述
   - **危害程度**：**高**（自动化攻击，影响所有访客）

   **类型三：DOM 型 XSS（DOM-based XSS）** ⭐⭐
   ```javascript
   // 危险代码示例
   const hash = location.hash.substring(1);
   document.getElementById('output').innerHTML = hash;  // 直接插入 HTML！
   
   // 攻击 URL：
   // https://example.com/#<img src=x onerror=alert(1)>
   ```
   
   - **特点**：纯前端漏洞，**恶意代码不经过服务器**
   - **常见入口**：`innerHTML`、`outerHTML`、`document.write()`、`eval()`
   - **危害程度**：中-高（取决于使用场景）

3. **全面防御方案**：

   **防御一：输出编码（Output Encoding）** ⭐⭐⭐
   ```javascript
   // HTML 实体编码函数
   function escapeHtml(str) {
     return str
       .replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#39;');
   }
   
   // 使用
   element.textContent = userInput;  // ✅ 安全（自动转义）
   element.innerHTML = escapeHtml(userInput);  // ✅ 手动转义
   element.innerHTML = userInput;  // ❌ 危险！
   ```

   **防御二：Content Security Policy（CSP）** ⭐⭐⭐
   ```http
   # HTTP 响应头设置 CSP
   Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://trusted.cdn.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;
   ```
   
   - **白名单机制**：只允许加载指定来源的脚本
   - **阻止内联脚本**：`<script>alert(1)</script>` 会被拦截
   - **报告模式**：`Content-Security-Policy-Report-Only`（先观察不阻断）

   **防御三：HttpOnly Cookie** ⭐⭐⭐
   ```http
   # 防止 JavaScript 读取 Cookie
   Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Lax
   ```
   
   - 即使 XSS 成功，也无法通过 `document.cookie` 窃取 Session

   **防御四：输入验证和过滤** ⭐⭐
   ```javascript
   // 服务端过滤（Node.js + express-validator 示例）
   const { body, validationResult } = require('express-validator');
   
   app.post('/comment', [
     body('content')
       .trim()
       .isLength({ min: 1, max: 1000 })
       .escape(),  // 自动转义 HTML 特殊字符
   ], (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
     // 安全地存储
   });
   ```

   **防御五：使用安全的 API** ⭐⭐
   ```javascript
   // ✅ 安全的做法
   element.textContent = userInput;           // 纯文本插入
   element.setAttribute('data-x', userInput);  // 属性赋值（部分安全）
   
   // ❌ 危险的做法
   element.innerHTML = userInput;              // HTML 插入
   element.outerHTML = userInput;              // 替换 HTML
   document.write(userInput);                  // 写入文档
   eval(userInput);                            // 执行代码
   setTimeout(userInput, 1000);                // 定时执行
   new Function(userInput)();                  // 动态函数
   ```

4. **XSS 攻击向量大全**（防御时要注意的）：
   ```html
   <!-- 常见的 XSS 注入方式 -->
   <script>alert(1)</script>
   <img src=x onerror=alert(1)>
   <svg onload=alert(1)>
   <body onload=alert(1)>
   <input onfocus=alert(1) autofocus>
   <details open ontoggle=alert(1)>
   <marquee onstart=alert(1)>
   <a href="javascript:alert(1)">click</a>
   <iframe src="javascript:alert(1)">
   <!-- 还有数百种变体... -->
   ```

5. **检测和监控**：
   - **自动化扫描**：DOMPurify、XSS-Filters 库的使用
   - **安全审计**：定期进行渗透测试
   - **CSP 违规报告**：配置 report-uri 收集违规日志
   - **WAF（Web Application Firewall）**：云端防护

> **追问链**：CSP 的 nonce 和 hash 模式？如何防御 Mutation XSS（mXSS）？XSS 和 CSRF 的组合攻击？

### 🔍 追问链
1. **[CSP nonce vs hash 模式对比]**
   → 方向：nonce（每次请求生成随机值，适合动态内联脚本）、hash（基于内容哈希，适合静态不变的内联脚本）；两者都不能用 unsafe-inline；Google 推荐的 strict-dynamic 模式（配合 nonce）
2. **[Sanitizer API 与 Trusted Types]**
   → 方向：浏览器原生的 HTML Sanitizer API（自动转义危险标签）；Trusted Types（强制对 innerHTML 赋值进行策略校验，防止 DOM-based XSS）；Chrome 已支持
3. **[Mutation XSS (mXSS) 的防御难点]**
   → 方向：攻击者利用浏览器 API（如 innerHTML 赋值时的 HTML 解析差异）绕过传统过滤；防御方案：使用 DOMPurify 库 + CSP 策略 + 输出编码多层防护

---

## Q27: CSRF 攻击的原理是什么？如何防御？
- **难度**：★★☆
- **知识点**：CSRF / Web 安全 / Token
- **题型**：简答题

### 参考答案要点：

1. **CSRF（Cross-Site Request Forgery）跨站请求伪造定义**：
   - 攻击者**诱导用户在已登录的状态下**，向目标网站发出非预期的请求
   - **关键**：请求会**自动携带该网站的 Cookie**（浏览器行为）
   - 服务器**无法区分**这是用户的真实意愿还是被伪造的
   - **本质**：利用了浏览器自动携带 Cookie 的"便利"

2. **攻击流程演示**：
   ```
   正常场景：
   用户登录 bank.com → 获得 Cookie: session=abc
   用户访问 bank.com/transfer?to=attacker&amount=10000 → 转账成功 ✅
   
   CSRF 攻击场景：
   ① 用户登录 bank.com → Cookie 保存在浏览器
   ② 用户访问恶意网站 evil.com（可能是一张图片、一篇帖子）
   ③ evil.com 页面隐藏了一个请求：
      <img src="https://bank.com/transfer?to=attacker&amount=10000">
   ④ 浏览器自动携带 bank.com 的 Cookie 发送请求
   ⑤ bank.com 服务器认为这是用户的合法操作 → 转账成功 💸
   ```

3. **CSRF 的必要条件**（缺一不可）：
   - ✅ 用户**已登录**目标网站（有有效的 Cookie/Session）
   - ✅ 用户**访问了**攻击者的页面
   - ✅ 目标网站**没有验证请求来源**（缺少 CSRF 防护）
   - ✅ 请求是**可预测的**（攻击者知道接口和参数）

4. **防御方案详解**：

   **方案一：CSRF Token（最常用）** ⭐⭐⭐⭐⭐
   ```javascript
   // 1. 服务端生成随机 Token（与 Session 绑定）
   // 2. 页面加载时将 Token 返回给前端（隐藏字段或 meta 标签）
   
   // HTML 中
   <form action="/transfer" method="POST">
     <input type="hidden" name="_csrf_token" value="random-token-xyz123">
     <!-- 其他表单字段 -->
   </form>
   
   // 或者放在 meta 标签中（AJAX 请求时读取）
   <meta name="csrf-token" content="random-token-xyz123">
   
   // 3. 前端每次请求时携带 Token
   // jQuery/AJAX
   $.ajaxSetup({
     beforeSend: function(xhr) {
       xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
     }
   });
   
   // Axios 拦截器
   axios.interceptors.request.use(config => {
     config.headers['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
     return config;
   });
   
   // 4. 服务端验证 Token 是否匹配
   // Token 不匹配 → 拒绝请求（403 Forbidden）
   ```
   
   - **关键**：Token 必须是**不可预测的随机值**
   - Token 应该**每个会话唯一**，甚至**每个请求唯一**
   - **同源策略保护**：攻击者无法通过 JS 读取其他域的页面内容（包括 Token）

   **方案二：SameSite Cookie 属性** ⭐⭐⭐⭐
   ```http
   # 服务端设置 Cookie 时添加 SameSite 属性
   Set-Cookie: session_id=abc123; SameSite=Lax;  # 推荐
   Set-Cookie: session_id=abc123; SameSite=Strict;  # 最严格
   ```
   
   - **Strict**：**所有**跨站请求都不携带 Cookie（最安全，但影响用户体验）
     - 点击外部链接返回时需要重新登录
   - **Lax**（**默认值**）：**大多数**跨站请求不携带，但**顶级导航 GET 请求**可以携带
     - 平衡了安全和用户体验
     - **推荐使用 Lax**
   - **None**：**所有**请求都携带（需配合 Secure，不推荐）
   - **注意**：SameSite 不能完全替代 CSRF Token**（某些场景下仍需 Token）

   **方案三：验证 Referer / Origin 头** ⭐⭐⭐
   ```javascript
   // 服务端校验
   const allowedOrigins = ['https://myapp.com'];
   const origin = req.headers['origin'] || req.headers['referer'];
   
   if (!allowedOrigins.some(o => origin?.startsWith(o))) {
     return res.status(403).json({ error: 'Forbidden' });
   }
   ```
   
   - **优点**：简单，无需改动前端
   - **缺点**：Referer 可能被隐私设置隐藏或不稳定
   - **作为辅助手段**，不作为主要防御

   **方案四：双重提交 Cookie（Double Submit Cookie）** ⭐⭐
   ```
   1. 登录时设置两个相同的随机值：
     - 一个在 Cookie 中（自动携带）
     - 一个在自定义 Header / POST 参数中（手动携带）
   
   2. 服务端比较两者是否一致
   
   3. 攻击者无法读取 Cookie（HttpOnly），所以无法构造匹配的自定义值
   ```
   
   - **优点**：无需服务端存储 Token（无状态）
   - **缺点**：理论上存在子域攻击风险（需配合域名锁定）

5. **CSRF vs XSS 对比**（常混淆）：
   | 维度 | CSRF | XSS |
   |------|------|-----|
   | 攻击目标 | **服务器**（伪造请求） | **用户**（执行脚本） |
   | 利用点 | 浏览器自动携带 Cookie | 注入并执行恶意脚本 |
   | 防御重点 | Token、SameSite | 输入编码、CSP |
   | Cookie 角色 | 被"借用"（攻击武器） | 被"窃取"（攻击目标） |

6. **最佳实践清单**：
   - ✅ **关键操作（转账、改密码）必须使用 CSRF Token**
   - ✅ **所有 Cookie 设置 SameSite=Lax**
   - ✅ **敏感 Cookie 设置 HttpOnly + Secure**
   - ✅ **GET 请求不做状态变更操作**（RESTful 规范）
   - ✅ **验证 Referer/Origin 作为辅助防线**
   - ✅ **Token 定期轮换**

> **追问链**：SameSite=None 在第三方嵌入（iframe）场景的问题？如何设计无状态的 CSRF 防御？OAuth 流程中的 CSRF 保护（state 参数）？

### 🔍 追问链
1. **[Double Submit Cookie 方案详解]**
   → 方向：登录时同时设置 Cookie 和自定义 Header/POST 参数（相同随机值）；服务端比对两者是否一致；优点是无状态（不需服务端存储），缺点是子域攻击风险（需配合域名锁定）
2. **[SameSite=None + Secure 的兼容性问题]**
   → 方向：None 模式允许跨站携带 Cookie（需 Secure）；但 iOS Safari 12 之前不支持；第三方 iframe 嵌入场景（如支付授权页）可能被拦截；解决方案：使用两个 Cookie（Strict + None）
3. **[Referer 泄露风险与隐私保护]**
   → 方向：Referer 头会暴露来源 URL（可能含敏感参数如 token）；Referrer-Policy 策略（no-referrer / same-origin / strict-origin）；与 CSRF 防御的权衡

---

## Q28: CSP（内容安全策略）的作用和使用方式？
- **难度**：★★☆
- **知识点**：CSP / Web 安全 / 安全头
- **题型**：简答题

### 参考答案要点：

1. **CSP（Content Security Policy）定义**：
   - **额外的安全层**：用于检测和减轻特定类型的攻击（主要是 XSS 和数据注入）
   - **核心机制**：**白名单策略**——告诉浏览器哪些来源的资源可以加载和执行
   - **工作方式**：通过 HTTP 响应头或 `<meta>` 标签配置

2. **CSP 指令详解**：

   **资源加载指令**：
   ```http
   # 基础配置（推荐起点）
   Content-Security-Policy: 
     default-src 'self';           # 默认策略：只允许同源
     script-src 'self' https://cdn.example.com;  # JS 来源
     style-src 'self' 'unsafe-inline';           # CSS 来源
     img-src 'self' data: https:;                # 图片来源
     font-src 'self' https://fonts.gstatic.com;  # 字体来源
     connect-src 'self' https://api.example.com;  # AJAX/WebSocket 来源
     frame-ancestors 'none';       # 禁止被嵌入 iframe（防点击劫持）
     base-uri 'self';              # 限制 <base> 标签
     form-action 'self';           # 限制表单提交目标
   ```

   **常用指令速查表**：
   | 指令 | 作用 | 常用值 |
   |------|------|--------|
   | `default-src` | 默认策略（其他指令的 fallback） | `'self'`, `'none'` |
   | `script-src` | JavaScript 来源 | `'self'`, `nonce-xxx`, 域名 |
   | `style-src` | CSS 来源 | `'self'`, `'unsafe-inline'` |
   | `img-src` | 图片来源 | `'self'`, `data:`, `https:` |
   | `connect-src` | AJAX/Fetch/WS/EV | `'self'`, API 域名 |
   | `font-src` | 字体来源 | `'self'`, CDN 域名 |
   | `frame-src` | iframe 来源 | `'none'`, 特定域名 |
   | `frame-ancestors` | 谁可以嵌入当前页面 | `'none'`, `'self'` |
   | `object-src` | Flash/插件 | `'none'`（禁用插件） |
   | `media-src` | 音视频来源 | `'self'` |
   | `manifest-src` | manifest.json | `'self'` |
   | `worker-src` | Worker 脚本 | `'self'` |

3. **高级特性**：

   **Nonce 模式（推荐用于内联脚本）** ⭐⭐⭐
   ```html
   <!-- 服务端为每次请求生成唯一的随机值 -->
   <meta http-equiv="Content-Security-Policy" 
        content="script-src 'nonce-RANDOM_VALUE_HERE'">
   
   <!-- 只有带有匹配 nonce 的内联脚本才能执行 -->
   <script nonce="RANDOM_VALUE_HERE">
     // 这个脚本可以执行 ✅
     console.log('Allowed!');
   </script>
   
   <!-- 没有 nonce 或 nonce 不匹配的脚本将被阻止 ❌ -->
   <script>
     console.log('Blocked!');
   </script>
   ```
   
   - **优点**：允许必要的内联脚本（如动态生成的代码）
   - **安全性**：攻击者无法猜测 nonce 值
   - **注意**：nonce 必须每次请求都不同（不可缓存）

   **Hash 模式（适用于静态内联脚本）** ⭐⭐
   ```http
   # 脚本的 SHA 哈希值
   Content-Security-Policy: script-src 'sha256-B2wPH/+...'
   
   # 对应的 HTML
   <script>console.log('Hello World')</script>
   ```
   
   - **适用**：不变的內聯腳本
   - **缺点**：脚本有任何变动就需要更新 CSP

   **report-uri / report-to**（违规报告）⭐⭐
   ```http
   # 先用 Report-Only 模式观察（不阻断，只上报）
   Content-Security-Policy-Report-Only: 
     default-src 'self'; 
     script-src 'self' 'unsafe-inline';
     report-uri /csp-report-endpoint;
     report-to csp-endpoint;
   
   # Reporting-APIs 头（配合使用）
   Reporting-Endpoints: csp-endpoint="https://reports.example.com/csp"
   ```
   
   - **上线前先用 Report-Only 模式收集违规日志**
   - **确认无误后再切换到强制模式**

4. **CSP 的实际配置示例**：
   ```javascript
   // Express.js 中间件设置 CSP
   const helmet = require('helmet');  // 推荐使用 helmet 库
   
   app.use(helmet.contentSecurityPolicy({
     directives: {
       defaultSrc: ["'self'"],
       scriptSrc: [
         "'self'", 
         (_, res) => `'nonce-${res.locals.nonce}'`,  // 动态 nonce
         "https://cdn.jsdelivr.net"
       ],
       styleSrc: ["'self'", "'unsafe-inline'"],  // CSS 内联有时不可避免
       fontSrc: ["'self'", "https://fonts.gstatic.com"],
       imgSrc: ["'self'", "data:", "https:"],
       connectSrc: ["'self'", "https://api.example.com"],
       frameAncestors: ["'none'"],
       objectSrc: ["'none'"],
       upgradeInsecureRequests: [],  // 强制 HTTPS
     },
     reportOnly: false,  // 生产环境设为 false
   }));
   
   // 在路由中生成 nonce
   app.use((req, res, next) => {
     res.locals.nonce = crypto.randomBytes(16).toString('base64');
     next();
   });
   ```

5. **CSP 的局限性和绕过**：
   - **JSONP 端点**：如果 `script-src` 包含外部域名，可能被滥用
   - **`unsafe-inline`**：如果使用了，内联 XSS 防御形同虚设
   - **域名通配符**：`*.example.com` 覆盖面太广
   - **第三方库漏洞**：被包含的 CDN 脚本被攻破
   - **`report-uri` 泄露**：可能泄露 URL 结构等信息

6. **CSP 最佳实践**：
   - 🎯 **从 strict 策略开始**，逐步放宽
   - 🎯 **永远不要在生产环境使用 `unsafe-eval`**
   - 🎯 **尽量不用 `unsafe-inline`**，用 nonce/hash 替代
   - 🎯 **上线前充分测试**（Report-Only 模式）
   - 🎯 **定期审查和收紧策略**

> **追问链**：CSP Level 3 的新特性（strict-dynamic、navigate-to）？CSP 与 Trusted Types 的关系？如何处理第三方 SDK 的 CSP 适配？

---

## Q29: 如何设计和实现一个前端网络请求封装库？（axios 封装思路）
- **难度**：★★☆
- **知识点**：axios 封装 / 请求库设计 / 工程化
- **题型**：编程实践题

### 参考答案要点：

1. **设计目标**：
   - 统一的请求/响应处理（拦截器）
   - 错误处理和重试机制
   - 请求/响应的统一转换
   - 取消请求（AbortController）
   - Loading 状态管理
   - Token 自动注入

2. **完整封装实现**（核心代码）：
   ```javascript
   // utils/request.js - axios 封装
   import axios from 'axios';
   import { getToken, removeToken } from './auth';
   import { message } from 'antd';
   import router from '@/router';
   
   // 创建 axios 实例
   const service = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
     timeout: 15000,
     headers: { 'Content-Type': 'application/json' },
     withCredentials: true,
   });
   
   // 请求拦截器
   service.interceptors.request.use(
     config => {
       const token = getToken();
       if (token) config.headers.Authorization = `Bearer ${token}`;
       return config;
     },
     error => Promise.reject(error)
   );
   
   // 响应拦截器
   service.interceptors.response.use(
     response => {
       const { data } = response;
       if (data.code === 0) return data.data;
       message.error(data.message || '请求失败');
       return Promise.reject(new Error(data.message));
     },
     error => {
       if (!error.response) {
         message.error('网络异常，请检查连接');
         return Promise.reject(error);
       }
       
       switch (error.response.status) {
         case 401:
           message.error('登录已过期');
           removeToken();
           router.push('/login');
           break;
         case 403:
           message.error('没有权限');
           break;
         case 404:
           message.error('资源不存在');
           break;
         case 500:
         case 502:
         case 503:
         case 504:
           message.error('服务暂时不可用');
           break;
         default:
           message.error(`请求失败(${error.response.status})`);
       }
       return Promise.reject(error);
     }
   );
   
   export default service;
   ```

3. **核心功能清单**：
   - ✅ **Token 自动注入**（请求拦截器）
   - ✅ **统一错误处理**（响应拦截器 + 状态码分类）
   - ✅ **401 自动跳转登录**
   - ✅ **重复请求取消**（PendingRequest Map）
   - ✅ **请求重试**（指数退避算法）
   - ✅ **文件上传进度**（onUploadProgress）

> **追问链**：如何实现请求缓存（类似 React Query）？如何做请求的竞态处理（最新请求优先）？如何实现 Mock 数据的平滑切换？

### 🔥 深度拓展：手写实现

#### 完整的 Axios 封装库实现

```javascript
/**
 * ============================================================
 *  📦 HttpRequest - 企业级 HTTP 请求封装库
 * ============================================================
 * 
 *  核心功能：
 *  ✅ 拦截器机制（请求拦截器 / 响应拦截器链）
 *  ✅ 请求取消（AbortController + CancelToken 兼容）
 *  ✅ 超时控制（全局 + 单请求级别）
 *  ✅ 重试机制（指数退避算法）
 *  ✅ 请求队列 / 并发控制
 *  ✅ 错误统一处理
 *  ✅ Token 自动注入与刷新
 * 
 *  算法思路（ASCII 图解）：
 * 
 *  ┌─────────────────────────────────────────────────────┐
 *  │                    请求流程                          │
 *  │                                                     │
 *  │  用户调用 → [请求队列] → [请求拦截器链]              │
 *  │       ↓            ↓             ↓                  │
 *  │   参数校验    并发控制     Token注入/配置合并        │
 *  │       ↓            ↓             ↓                  │
 *  │  ──────────→ [发送 HTTP 请求] ←──────────┐          │
 *  │       ↓                                  │          │
 *  │   [响应拦截器链]                          │          │
 *  │       ↓                                  │          │
 *  │   数据转换 / 错误处理                     │ 超时/取消 │
 *  │       ↓                                  │          │
 *  │   返回给用户 ◄───────────────────────────┘          │
 *  │                                                     │
 *  └─────────────────────────────────────────────────────┘
 */

class HttpRequest {
  /**
   * 构造函数：初始化默认配置和核心组件
   */
  constructor(config = {}) {
    // 默认配置项
    this.defaults = {
      baseURL: config.baseURL || '',
      timeout: config.timeout || 15000,           // 默认超时 15 秒
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      withCredentials: config.withCredentials ?? true,  // 携带 Cookie
      responseType: config.responseType || 'json',      // 响应类型
      maxRetries: config.maxRetries || 3,               // 最大重试次数
      retryDelay: config.retryDelay || 1000,            // 重试基础延迟(ms)
      concurrency: config.concurrency || 6,             // 并发请求数限制
    };

    // 拦截器容器（洋葱模型）
    this.interceptors = {
      request: new InterceptorManager(),   // 请求拦截器管理器
      response: new InterceptorManager(),  // 响应拦截器管理器
    };

    // 待处理的请求队列（用于并发控制）
    this.pendingRequests = new Map();       // 存储进行中的请求（用于重复请求取消）
    this.requestQueue = [];                 // 请求队列
    this.activeCount = 0;                   // 当前活跃请求数

    // 取消令牌源映射（兼容旧版 CancelToken）
    this.cancelTokenSources = new Map();

    // 初始化实例
    this._initInstance();
  }

  /**
   * 初始化 axios 实例（底层使用 fetch API 实现，不依赖外部库）
   * @private
   */
  _initInstance() {
    // 如果环境支持 AbortController，创建默认控制器
    if (typeof AbortController !== 'undefined') {
      this.abortController = null;
    }
  }

  // ==================== 核心请求方法 ====================

  /**
   * 通用请求方法（核心入口）
   * @param {Object} config - 请求配置
   * @returns {Promise} 响应数据
   */
  async request(config = {}) {
    try {
      // 第一步：合并配置（默认配置 < 实例配置 < 请求配置）
      const mergedConfig = this._mergeConfig(config);

      // 第二步：检查重复请求（可选功能）
      const requestKey = this._generateRequestKey(mergedConfig);
      
      // 第三步：执行请求拦截器链（洋葱模型：先进后出）
      const processedConfig = await this._runRequestInterceptors(mergedConfig);

      // 第四步：加入请求队列（并发控制）
      return await this._enqueue(() => 
        this._executeWithRetry(processedConfig, requestKey)
      );

    } catch (error) {
      // 错误会被响应拦截器捕获并处理
      throw error;
    }
  }

  /**
   * 执行实际的网络请求（含重试逻辑）
   * @private
   * @param {Object} config - 处理后的请求配置
   * @param {string} requestKey - 请求唯一标识
   * @returns {Promise} 响应数据
   */
  async _executeWithRetry(config, requestKey) {
    let lastError = null;
    
    // 创建 AbortController 用于取消请求
    const controller = new AbortController();
    this.pendingRequests.set(requestKey, controller);

    // 设置超时定时器
    const timeoutId = setTimeout(() => {
      controller.abort();  // 超时自动取消请求
    }, config.timeout);

    try {
      for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
        try {
          // 发送实际的 fetch 请求
          const response = await fetch(config.url, {
            method: config.method || 'GET',
            headers: config.headers,
            body: this._serializeBody(config.data, config.headers),
            signal: controller.signal,
            credentials: this.defaults.withCredentials ? 'include' : 'omit',
          });

          // 清除超时定时器
          clearTimeout(timeoutId);
          
          // 从待处理列表中移除
          this.pendingRequests.delete(requestKey);

          // 解析响应数据
          const responseData = await this._parseResponse(response, config);

          // 第五步：执行响应拦截器链（洋葱模型）
          return await this._runResponseInterceptors({
            data: responseData,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            config,
          });

        } catch (error) {
          lastError = error;

          // 如果是主动取消或非网络错误，不重试
          if (error.name === 'AbortError' || !this._shouldRetry(error, attempt)) {
            clearTimeout(timeoutId);
            this.pendingRequests.delete(requestKey);
            throw error;
          }

          // 指数退避等待后重试
          if (attempt < config.maxRetries) {
            const delay = config.retryDelay * Math.pow(2, attempt);  // 1s, 2s, 4s...
            console.warn(`[HttpRequest] 请求失败，${delay}ms 后第 ${attempt + 1} 次重试...`);
            await this._sleep(delay);
          }
        }
      }

      // 所有重试都失败
      throw lastError;

    } catch (error) {
      clearTimeout(timeoutId);
      this.pendingRequests.delete(requestKey);
      throw this._normalizeError(error, config);
    }
  }

  // ==================== 快捷方法 ====================

  /** GET 请求快捷方法 */
  get(url, config = {}) {
    return this.request({ ...config, url, method: 'GET' });
  }

  /** POST 请求快捷方法 */
  post(url, data, config = {}) {
    return this.request({ ...config, url, method: 'POST', data });
  }

  /** PUT 请求快捷方法 */
  put(url, data, config = {}) {
    return this.request({ ...config, url, method: 'PUT', data });
  }

  /** DELETE 请求快捷方法 */
  delete(url, config = {}) {
    return this.request({ ...config, url, method: 'DELETE' });
  }

  /** PATCH 请求快捷方法 */
  patch(url, data, config = {}) {
    return this.request({ ...config, url, method: 'PATCH', data });
  }

  // ==================== 请求取消 ====================

  /**
   * 取消指定请求（通过 URL 或自定义 key）
   * @param {string} key - 请求标识
   */
  cancelRequest(key) {
    const controller = this.pendingRequests.get(key);
    if (controller) {
      controller.abort();
      console.log(`[HttpRequest] 已取消请求: ${key}`);
    }
  }

  /**
   * 取消所有待处理的请求
   */
  cancelAllRequests() {
    this.pendingRequests.forEach((controller, key) => {
      controller.abort();
      console.log(`[HttpRequest] 已取消请求: ${key}`);
    });
    this.pendingRequests.clear();
  }

  // ==================== 内部工具方法 ====================

  /**
   * 合并配置（深拷贝避免污染）
   * @private
   */
  _mergeConfig(config) {
    return {
      ...this.defaults,
      ...config,
      headers: {
        ...this.defaults.headers,
        ...(config.headers || {})
      },
      url: config.baseURL || this.defaults.baseURL 
        ? `${config.baseURL || this.defaults.baseURL}${config.url}` 
        : config.url
    };
  }

  /**
   * 生成请求唯一标识（用于去重和取消）
   * @private
   */
  _generateRequestKey(config) {
    // 使用 URL + 方法 + 参数序列化作为唯一键
    const paramsStr = JSON.stringify(config.params || {});
    const bodyStr = JSON.stringify(config.data || {});
    return `${config.method}:${config.url}:${paramsStr}:${bodyStr}`;
  }

  /**
   * 序列化请求体（根据 Content-Type 选择格式）
   * @private
   */
  _serializeBody(data, headers) {
    if (!data) return undefined;

    const contentType = headers['Content-Type'] || '';
    
    // JSON 格式
    if (contentType.includes('application/json')) {
      return JSON.stringify(data);
    }
    
    // FormData 格式（不手动序列化）
    if (data instanceof FormData) {
      return data;
    }
    
    // URL 编码格式
    if (contentType.includes('application/x-www-form-urlencoded')) {
      return Object.keys(data)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
    }
    
    return String(data);
  }

  /**
   * 解析响应数据
   * @private
   */
  async _parseResponse(response, config) {
    const responseType = config.responseType;
    
    switch (responseType) {
      case 'json':
        return await response.json().catch(() => ({}));
      case 'text':
        return await response.text();
      case 'blob':
        return await response.blob();
      case 'arraybuffer':
        return await response.arrayBuffer();
      default:
        return await response.json().catch(() => ({}));
    }
  }

  /**
   * 执行请求拦截器链（洋葱模型）
   * 遍历顺序：interceptor1 → interceptor2 → interceptor3
   * @private
   */
  async _runRequestInterceptors(config) {
    let processedConfig = { ...config };
    
    for (const interceptor of this.interceptors.request.handlers) {
      processedConfig = await interceptor.fulfilled(processedConfig);
    }
    
    return processedConfig;
  }

  /**
   * 执行响应拦截器链（洋葱模型）
   * 遍历顺序：interceptor3 → interceptor2 → interceptor1（反向）
   * @private
   */
  async _runResponseInterceptors(response) {
    let processedResponse = response;
    
    // 反向遍历响应拦截器
    for (let i = this.interceptors.response.handlers.length - 1; i >= 0; i--) {
      const interceptor = this.interceptors.response.handlers[i];
      processedResponse = await interceptor.fulfilled(processedResponse);
    }
    
    return processedResponse;
  }

  /**
   * 请求队列管理（并发控制）
   * 使用 Promise 队列模式控制同时进行的请求数量
   * @private
   */
  async _enqueue(task) {
    return new Promise((resolve, reject) => {
      // 将任务加入队列
      this.requestQueue.push({ task, resolve, reject });
      
      // 尝试执行下一个任务
      this._processQueue();
    });
  }

  /**
   * 处理队列中的任务
   * @private
   */
  async _processQueue() {
    // 如果已达并发上限或队列为空，直接返回
    if (this.activeCount >= this.defaults.concurrency || this.requestQueue.length === 0) {
      return;
    }

    // 取出队首任务
    const { task, resolve, reject } = this.requestQueue.shift();
    this.activeCount++;

    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.activeCount--;
      // 递归处理下一个任务
      this._processQueue();
    }
  }

  /**
   * 判断是否应该重试
   * 只对网络错误和 5xx 服务端错误进行重试
   * @private
   */
  _shouldRetry(error, attempt) {
    // 网络错误（断网、DNS 失败等）
    if (!error.response && error.message !== 'canceled') {
      return true;
    }
    
    // 5xx 服务端错误（可重试）
    if (error.response?.status >= 500) {
      return true;
    }
    
    // 429 Too Many Requests（限流，可重试）
    if (error.response?.status === 429) {
      return true;
    }
    
    return false;
  }

  /**
   * 规范化错误对象（统一错误格式）
   * @private
   */
  _normalizeError(error, config) {
    // 已经是标准格式的错误，直接返回
    if (error.isAxiosError) return error;

    // 构建标准化错误对象
    const normalizedError = new Error(error.message || '请求失败');
    normalizedError.isAxiosError = true;
    normalizedError.config = config;
    normalizedError.code = error.code;
    
    if (error.name === 'AbortError') {
      normalizedError.message = '请求已取消';
      normalizedError.canceled = true;
    }
    
    return normalizedError;
  }

  /**
   * 异步睡眠工具函数（用于重试延迟）
   * @private
   */
  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ==================== 拦截器管理器 ====================

/**
 * InterceptorManager - 拦截器管理器
 * 
 * 数据结构：
 * ┌─────────────────────────────────────┐
 * │  handlers: Array<{                   │
 * │    fulfilled: Function,  // 成功回调  │
 * │    rejected: Function    // 失败回调  │
 *  }>                                    │
 * └─────────────────────────────────────┘
 */
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * 注册拦截器
   * @param {Function} fulfilled - 成功时的回调
   * @param {Function} rejected  - 失败时的回调（可选）
   * @returns {number} 拦截器 ID（可用于移除）
   */
  use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected: rejected || ((error) => Promise.reject(error))
    });
    return this.handlers.length - 1;  // 返回索引作为 ID
  }

  /**
   * 移除指定拦截器
   * @param {number} id - 拦截器 ID
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;  // 设为 null 而非删除，保持索引不变
    }
  }

  /**
   * 清空所有拦截器
   */
  clear() {
    this.handlers = [];
  }

  /**
   * 遍历所有有效拦截器
   * @param {Function} fn - 回调函数
   */
  forEach(fn) {
    this.handlers.forEach(handler => {
      if (handler !== null) {
        fn(handler);
      }
    });
  }
}

// ==================== 导出和使用示例 ====================

/** 
 * 使用示例代码（在实际项目中这样使用）：
 * 
 * // 1. 创建请求实例
 * const http = new HttpRequest({
 *   baseURL: '/api',
 *   timeout: 10000,
 *   concurrency: 5,
 *   maxRetries: 3,
 * });
 * 
 * // 2. 注册请求拦截器（按注册顺序执行）
 * http.interceptors.request.use(
 *   // 拦截器 1：注入 Token
 *   async (config) => {
 *     const token = localStorage.getItem('token');
 *     if (token) {
 *       config.headers.Authorization = `Bearer ${token}`;
 *     }
 *     console.log(`[请求] ${config.method} ${config.url}`);
 *     return config;
 *   },
 *   // 错误处理（可选）
 *   (error) => {
 *     console.error('[请求拦截器错误]', error);
 *     return Promise.reject(error);
 *   }
 * );
 * 
 * http.interceptors.request.use(
 *   // 拦截器 2：添加时间戳（防缓存）
 *   (config) => {
 *     if (config.method === 'get') {
 *       config.params = { ...config.params, _t: Date.now() };
 *     }
 *     return config;
 *   }
 * );
 * 
 * // 3. 注册响应拦截器（按注册倒序执行）
 * http.interceptors.response.use(
 *   // 成功响应处理
 *   async (response) => {
 *     const { data, status } = response;
 *     
 *     // 业务层面的成功判断
 *     if (data.code === 0 || data.success) {
 *       return data.data || data;  // 返回实际数据
 *     }
 *     
 *     // 业务层面的错误（如 token 过期）
 *     if (data.code === 401) {
 *       // 尝试刷新 Token
 *       const newToken = await refreshToken();
 *       if (newToken) {
 *         // 重新发送原请求
 *         return http.request(response.config);
 *       }
 *       // 刷新失败，跳转登录页
 *       window.location.href = '/login';
 *       return Promise.reject(new Error('登录已过期'));
 *     }
 *     
 *     // 其他业务错误
 *     return Promise.reject(new Error(data.message || '请求失败'));
 *   },
 *   
 *   // 错误响应处理
 *   async (error) => {
 *     if (error.canceled) {
 *       console.warn('[请求被取消]', error.config?.url);
 *       return Promise.reject(error);
 *     }
 *     
 *     // HTTP 状态码分类处理
 *     const status = error.response?.status;
 *     const errorMap = {
 *       400: '请求参数错误',
 *       401: '未授权，请重新登录',
 *       403: '拒绝访问',
 *       404: '资源不存在',
 *       422: '验证失败',
 *       500: '服务器内部错误',
 *       502: '网关错误',
 *       503: '服务不可用',
 *     };
 *     
 *     const message = errorMap[status] || `请求失败(${status})`;
 *     console.error(`[${status}] ${message}`, error.config?.url);
 *     
 *     // 可以在这里添加全局提示（如 toast）
 *     // Toast.error(message);
 *     
 *     return Promise.reject(error);
 *   }
 * );
 * 
 * // 4. 在组件中使用
 * async function fetchData() {
 *   try {
 *     const users = await http.get('/users', {
 *       params: { page: 1, size: 10 },
 *       timeout: 5000,  // 单请求超时覆盖
 *     });
 *     console.log('用户列表:', users);
 *   } catch (error) {
 *     console.error('获取用户失败:', error.message);
 *   }
 * }
 * 
 * // 5. 文件上传（带进度）
 * async function uploadFile(file) {
 *   const formData = new FormData();
 *   formData.append('file', file);
 *   
 *   const result = await http.post('/upload', formData, {
 *     headers: { 'Content-Type': 'multipart/form-data' },
 *     timeout: 60000,  // 上传超时设置长一些
 *     onUploadProgress: (progressEvent) => {
 *       const percent = Math.round(
 *         (progressEvent.loaded * 100) / progressEvent.total
 *       );
 *       console.log(`上传进度: ${percent}%`);
 *     },
 *   });
 *   
 *   return result;
 * }
 * 
 * // 6. 页面切换时取消所有待处理请求
 * router.beforeEach((to, from, next) => {
 *   http.cancelAllRequests();
 *   next();
 * });
 */

export default HttpRequest;
```

#### 关键设计要点总结：

| 功能模块 | 实现方式 | 技术亮点 |
|---------|---------|---------|
| **拦截器链** | InterceptorManager 类 | 支持注册/移除/清空，洋葱模型执行 |
| **请求取消** | AbortController API | 兼容 Fetch API，支持单请求/批量取消 |
| **超时控制** | setTimeout + abort() | 全局默认 + 单请求可覆盖 |
| **重试机制** | 指数退避算法 | 仅对 5xx 和网络错误重试，避免无限循环 |
| **并发控制** | Promise 队列模式 | 可配置并发数，自动调度任务 |
| **错误规范化** | 统一错误对象 | isAxiosError 标记，便于统一处理 |

---

## Q30: Service Worker 如何拦截网络请求并做缓存？
- **难度**：★★☆
- **知识点**：Service Worker / 离线缓存 / PWA
- **题型**：编程实践题

### 参考答案要点：

1. **Service Worker 核心：Fetch 事件拦截**：
   ```javascript
   self.addEventListener('fetch', event => {
     event.respondWith(
       caches.match(event.request).then(cached => {
         // 缓存命中 → 直接返回（或后台更新）
         if (cached) {
           // Stale While Revalidate：返回缓存的同时后台更新
           fetchAndCache(event.request);
           return cached;
         }
         // 缓存未命中 → 发起网络请求并缓存
         return fetchAndCache(event.request);
       })
     );
   });
   ```

2. **缓存策略对比**：
   | 策略 | 原理 | 适用场景 |
   |------|------|---------|
   | Cache First | 缓存优先 | 静态资源（JS/CSS/图片） |
   | Network First | 网络优先 | API 数据、HTML |
   | Stale While Revalidate | 返回缓存+后台更新 | 频繁更新的资源 |
   | Network Only | 只用网络 | POST、支付等敏感操作 |
   | Cache Only | 只用缓存 | App Shell |

3. **生命周期管理**：
   - **install**：预缓存关键资源（App Shell）
   - **activate**：清理旧版本缓存
   - **fetch**：拦截网络请求
   - **注意**：首次加载 SW 不会拦截请求（需要下次访问才生效）

4. **Workbox（推荐生产使用）**：
   ```javascript
   import { registerRoute } from 'workbox-routing';
   import { CacheFirst, NetworkFirst } from 'workbox-strategies';
   import { ExpirationPlugin } from 'workbox-expiration';
   
   // 图片缓存
   registerRoute(
     ({ request }) => request.destination === 'image',
     new CacheFirst({
       cacheName: 'images',
       plugins: [new ExpirationPlugin({ maxEntries: 60 })]
     })
   );
   ```

5. **注意事项**：
   - ⚠️ **SW 文件必须在根目录或 scope 范围内**
   - ⚠️ **HTTPS 环境下才能注册**（localhost 除外）
   - ⚠️ **更新 SW 后需要 skipWaiting + clients.claim 立即生效**
   - ⚠️ **调试时注意清除缓存（Application → Storage → Clear site data）**

> **追问链**：SW 缓存与 HTTP 缓存的优先级？如何实现离线表单提交（Background Sync）？SW 更新策略（Skip Waiting vs Wait Until）？

---

## Q31-Q50: 专家题部分（简要框架）

*由于篇幅限制，以下提供专家题的核心要点框架，完整内容可按相同格式扩展：*

## Q31: 手写实现一个简单的 HTTP 服务器（Node.js）
- **难度**：★★★
- **知识点**：HTTP 协议 / Node.js 网络 / 底层原理
- **题型**：编程实践题

### 参考答案要点：
```javascript
const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    // 解析 HTTP 请求
    const request = data.toString();
    const [requestLine, ...headers] = request.split('\r\n');
    const [method, path, version] = requestLine.split(' ');
    
    console.log(`${method} ${path}`);
    
    // 构造 HTTP 响应
    const body = JSON.stringify({ message: 'Hello World', method, path });
    const response = [
      `${version} 200 OK`,
      'Content-Type: application/json',
      `Content-Length: Buffer.byteLength(body)`,
      'Connection: keep-alive',
      '',
      body
    ].join('\r\n');
    
    socket.write(response);
  });
});

server.listen(3000, () => console.log('Server running on port 3000'));
```
- **扩展方向**：路由解析、静态文件服务、POST 解析、中间件机制

### 🔥 深度拓展：手写实现

#### 完整的 HTTP 服务器实现（支持路由、静态文件、中间件）

```javascript
/**
 * ============================================================
 *  🌐 MiniHTTP - 手写 HTTP 服务器（Node.js 原生 net 模块）
 * ============================================================
 * 
 *  功能特性：
 *  ✅ 支持 GET / POST 方法路由
 *  ✅ 静态文件服务（带 MIME 类型识别）
 *  ✅ 中间件机制（类似 Koa 的洋葱模型简化版）
 *  ✅ JSON / URL 编码请求体解析
 *  ✅ CORS 跨域支持
 *  ✅ 错误处理中间件
 * 
 *  算法思路（ASCII 图解）：
 * 
 *  ┌──────────────────────────────────────────────────────┐
 *  │                   HTTP 请求处理流程                    │
 *  │                                                      │
 *  │   客户端请求 → [TCP 连接] → [解析 HTTP 报文]           │
 *  │                      ↓                                │
 *  │              ┌─────────────────┐                      │
 *  │              │  中间件链执行    │ ← 洋葱模型            │
 *  │              │  (先进后出)      │                       │
 *  │              └────────┬────────┘                      │
 *  │                       ↓                               │
 *  │              ┌─────────────────┐                      │
 *  │              │  路由匹配       │                        │
 *  │              │  GET /api/users │                       │
 *  │              └────────┬────────┘                      │
 *  │                       ↓                               │
 *  │              ┌─────────────────┐                      │
 *  │              │  处理函数执行    │                        │
 *  │              │  (Handler)       │                       │
 *  │              └────────┬────────┘                      │
 *  │                       ↓                               │
 *  │              [构造 HTTP 响应] → 返回给客户端             │
 *  │                                                      │
 *  └──────────────────────────────────────────────────────┘
 */

const net = require('net');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ==================== MIME 类型映射表 ====================
// 常见文件扩展名与 MIME 类型的对应关系
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
};

// ==================== HTTP 状态码描述 ====================
const STATUS_CODES = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  301: 'Moved Permanently',
  302: 'Found',
  304: 'Not Modified',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
};

// ==================== 核心类：MiniHTTPServer ====================

class MiniHTTPServer {
  /**
   * 构造函数：初始化服务器配置和路由表
   */
  constructor(options = {}) {
    // 服务器配置
    this.options = {
      port: options.port || 3000,
      host: options.host || '127.0.0.1',
      staticDir: options.staticDir || './public',  // 静态文件目录
      maxBodySize: options.maxBodySize || 10 * 1024 * 1024,  // 最大请求体 10MB
    };

    // 路由表存储：{ method: { path: handler } }
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
      DELETE: {},
      PATCH: {},
    };

    // 中间件数组（洋葱模型）
    this.middlewares = [];

    // 创建 TCP 服务器实例
    this.server = net.createServer(this._handleConnection.bind(this));

    // 连接计数器（用于日志）
    this.connectionCount = 0;
  }

  // ==================== 路由注册方法 ====================

  /**
   * 注册 GET 路由
   * @param {string} path - 路由路径（支持 :params 动态参数）
   * @param {Function} handler - 处理函数 (req, res) => {}
   */
  get(path, handler) {
    this._addRoute('GET', path, handler);
    return this;  // 支持链式调用
  }

  /** 注册 POST 路由 */
  post(path, handler) {
    this._addRoute('POST', path, handler);
    return this;
  }

  /** 注册 PUT 路由 */
  put(path, handler) {
    this._addRoute('PUT', path, handler);
    return this;
  }

  /** 注册 DELETE 路由 */
  delete(path, handler) {
    this._addRoute('DELETE', path, handler);
    return this;
  }

  /** 注册 PATCH 路由 */
  patch(path, handler) {
    this._addRoute('PATCH', path, handler);
    return this;
  }

  /**
   * 内部方法：添加路由到路由表
   * @private
   */
  _addRoute(method, path, handler) {
    // 将路径转换为正则表达式（支持 :param 形式的动态参数）
    const paramNames = [];
    const regexPath = path.replace(/:([^/]+)/g, (_, paramName) => {
      paramNames.push(paramName);
      return '([^/]+)';
    });

    this.routes[method][path] = {
      handler,
      regex: new RegExp(`^${regexPath}$`),
      paramNames,
    };
  }

  // ==================== 中间件机制 ====================

  /**
   * 使用中间件（类似 Express/Koa 的 use 方法）
   * 中间件按注册顺序执行，形成洋葱模型
   * 
   * @param {Function} middleware - 中间件函数 (req, res, next) => {}
   */
  use(middleware) {
    if (typeof middleware === 'function') {
      this.middlewares.push(middleware);
    } else if (typeof middleware === 'object' && middleware.handle) {
      // 支持子应用挂载
      this.middlewares.push(middleware.handle.bind(middleware));
    }
    return this;  // 支持链式调用
  }

  // ==================== 静态文件服务 ====================

  /**
   * 挂载静态文件目录
   * @param {string} dirPath - 静态文件目录路径
   * @param {string} mountPath - 挂载路径前缀（默认 '/'）
   */
  static(dirPath, mountPath = '/') {
    const absoluteDir = path.resolve(dirPath);
    
    // 创建静态文件服务中间件
    const staticMiddleware = async (req, res, next) => {
      // 只处理以 mountPath 开头的请求
      if (!req.path.startsWith(mountPath)) {
        return next();
      }

      // 计算实际文件路径
      const relativePath = req.path.slice(mountPath.length) || '/index.html';
      const filePath = path.join(absolutePath, relativePath);

      try {
        // 安全检查：防止路径遍历攻击
        const safePath = path.resolve(filePath);
        if (!safePath.startsWith(absoluteDir)) {
          return res.status(403).send('Forbidden: Path traversal detected');
        }

        // 检查文件是否存在
        await fs.promises.access(safePath, fs.constants.R_OK);

        // 获取文件状态信息
        const stat = await fs.promises.stat(safePath);
        
        // 如果是目录，尝试返回 index.html
        if (stat.isDirectory()) {
          const indexPath = path.join(safePath, 'index.html');
          try {
            await fs.promises.access(indexPath, fs.constants.R_OK);
            return this._serveFile(indexPath, req, res);
          } catch {
            return res.status(404).send('Directory listing not allowed');
          }
        }

        // 返回静态文件
        return this._serveFile(safePath, req, res);

      } catch (error) {
        if (error.code === 'ENOENT') {
          return next();  // 文件不存在，交给下一个中间件或路由
        }
        console.error('[Static] 文件读取错误:', error.message);
        return res.status(500).send('Internal Server Error');
      }
    };

    return this.use(staticMiddleware);
  }

  /**
   * 发送静态文件内容
   * @private
   */
  async _serveFile(filePath, req, res) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // 设置响应头
    res.setHeader('Content-Type', contentType);
    
    // 缓存控制：对于带哈希的文件可以长期缓存
    if (filePath.includes('.')) {
      // 计算文件的 ETag（基于修改时间和大小）
      const stat = await fs.promises.stat(filePath);
      const etag = `"${stat.mtime.getTime()}-${stat.size}"`;
      res.setHeader('ETag', etag);
      
      // 检查 If-None-Match 头（协商缓存）
      const ifNoneMatch = req.headers['if-none-match'];
      if (ifNoneMatch === etag) {
        return res.status(304).end();  // 304 Not Modified
      }

      // 读取并返回文件内容
      const data = await fs.promises.readFile(filePath);
      res.setHeader('Content-Length', data.length);
      return res.end(data);
    }
  }

  // ==================== 启动服务器 ====================

  /**
   * 启动 HTTP 服务器监听
   * @param {number} port - 监听端口（可选，覆盖配置）
   * @param {Function} callback - 启动成功回调
   */
  listen(port, callback) {
    const listenPort = port || this.options.port;
    
    this.server.listen(listenPort, this.options.host, () => {
      console.log(`🚀 MiniHTTP Server running at http://${this.options.host}:${listenPort}`);
      console.log(`   Static files: ${this.options.staticDir}`);
      console.log(`   Routes registered: ${Object.values(this.routes).flatMap(r => Object.keys(r)).length}`);
      
      if (callback) callback();
    });

    return this;
  }

  // ==================== 内核：连接处理 ====================

  /**
   * 处理新的 TCP 连接（核心入口）
   * 每个新的客户端连接都会触发此方法
   * @private
   */
  _handleConnection(socket) {
    this.connectionCount++;
    const connId = this.connectionCount;
    
    console.log(`[${connId}] 📥 新连接来自 ${socket.remoteAddress}:${socket.remotePort}`);

    // 存储当前连接接收到的数据缓冲区
    let buffer = Buffer.alloc(0);

    socket.on('data', (chunk) => {
      // 将新数据追加到缓冲区
      buffer = Buffer.concat([buffer, chunk]);

      // 尝试解析完整的 HTTP 请求
      // HTTP 请求以 \r\n\r\n 结尾表示头部结束
      const headerEndIndex = buffer.indexOf('\r\n\r\n');
      
      if (headerEndIndex !== -1) {
        // 提取头部部分
        const headerBuffer = buffer.slice(0, headerEndIndex);
        const headerStr = headerBuffer.toString('utf-8');

        // 解析 Content-Length 判断是否有请求体
        const contentLengthMatch = headerStr.match(/Content-Length:\s*(\d+)/i);
        const contentLength = contentLengthMatch ? parseInt(contentLengthMatch[1]) : 0;

        // 计算完整请求的总长度（头部 + \r\n\r\n + 请求体）
        const totalLength = headerEndIndex + 4 + contentLength;

        // 检查是否已接收到完整请求
        if (buffer.length >= totalLength) {
          // 提取完整请求数据
          const requestData = buffer.slice(0, totalLength);
          
          // 清除已处理的数据（保留可能的后续请求数据，用于 Keep-Alive）
          buffer = buffer.slice(totalLength);

          // 解析并处理请求
          this._processRequest(requestData, socket, connId);
        }
        // 如果数据不完整，继续等待更多数据...
      }
    });

    // 连接关闭事件
    socket.on('close', () => {
      console.log(`[${connId}] 🔒 连接已关闭`);
    });

    // 连接错误事件
    socket.on('error', (error) => {
      console.error(`[${connId}] ❌ 连接错误:`, error.message);
    });
  }

  // ==================== 请求处理核心 ====================

  /**
   * 解析并处理 HTTP 请求
   * 这是整个服务器的核心逻辑
   * @private
   */
  _processRequest(rawData, socket, connId) {
    try {
      // 第一步：将原始数据转换为字符串
      const rawString = rawData.toString('utf-8');

      // 第二步：分离头部和请求体（以第一个 \r\n\r\n 为界）
      const [headerPart, bodyPart] = rawString.split('\r\n\r\n');

      // 第三步：解析请求行（第一行）
      const lines = headerPart.split('\r\n');
      const requestLine = lines[0];
      const [method, rawUrl, version] = requestLine.split(' ');

      // 第四步：解析 URL 和查询参数
      const urlObj = this._parseURL(rawUrl);
      const pathname = urlObj.pathname;
      const query = urlObj.query;

      // 第五步：解析请求头
      const headers = {};
      for (let i = 1; i < lines.length; i++) {
        const colonIndex = lines[i].indexOf(':');
        if (colonIndex > 0) {
          const name = lines[i].slice(0, colonIndex).trim().toLowerCase();
          const value = lines[i].slice(colonIndex + 1).trim();
          headers[name] = value;
        }
      }

      // 第六步：解析请求体（如果有）
      let body = null;
      if (bodyPart && headers['content-type']) {
        body = this._parseBody(bodyPart, headers['content-type']);
      }

      // 第七步：构建请求对象（类似 Express 的 req 对象）
      const req = {
        method,
        url: rawUrl,
        path: pathname,
        query,
        params: {},       // 路由参数（稍后填充）
        headers,
        body,
        rawHeaders: headers,
        socket,
        connId,
        timestamp: Date.now(),
      };

      // 第八步：构建响应对象（类似 Express 的 res 对象）
      const res = this._createResponseObject(socket, version);

      // 打印请求日志
      console.log(`[${connId}] ${method} ${pathname} HTTP/${version.split('/')[1]}`);

      // 第九步：执行中间件链 + 路由匹配
      this._executeMiddlewaresAndRoute(req, res);

    } catch (error) {
      console.error(`[${connId}] ❌ 请求处理异常:`, error.message);
      // 发送 500 错误响应
      this._sendRawResponse(socket, 'HTTP/1.1 500 Internal Server Error\r\n\r\n');
    }
  }

  // ==================== URL 解析器 ====================

  /**
   * 解析 URL（提取路径和查询参数）
   * 不使用 Node.js 的 url 模块，手动实现
   * @private
   */
  _parseURL(rawUrl) {
    const queryIndex = rawUrl.indexOf('?');
    
    if (queryIndex === -1) {
      // 无查询参数
      return { pathname: decodeURIComponent(rawUrl), query: {} };
    }

    // 分离路径和查询字符串
    const pathname = decodeURIComponent(rawUrl.slice(0, queryIndex));
    const queryString = rawUrl.slice(queryIndex + 1);

    // 解析查询参数（支持多值参数）
    const query = {};
    queryString.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      if (key) {
        const decodedKey = decodeURIComponent(key);
        const decodedValue = value ? decodeURIComponent(value) : '';
        
        if (query[decodedKey]) {
          // 已存在则转为数组
          if (Array.isArray(query[decodedKey])) {
            query[decodedKey].push(decodedValue);
          } else {
            query[decodedKey] = [query[decodedKey], decodedValue];
          }
        } else {
          query[decodedKey] = decodedValue;
        }
      }
    });

    return { pathname, query };
  }

  // ==================== 请求体解析器 ====================

  /**
   * 根据 Content-Type 解析请求体
   * @private
   */
  _parseBody(bodyStr, contentType) {
    if (contentType.includes('application/json')) {
      try {
        return JSON.parse(bodyStr);
      } catch {
        return null;  // JSON 解析失败返回 null
      }
    }
    
    if (contentType.includes('application/x-www-form-urlencoded')) {
      // URL 编码格式：key1=value1&key2=value2
      const params = {};
      bodyStr.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        if (key) {
          params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        }
      });
      return params;
    }
    
    // 其他格式原样返回
    return bodyStr;
  }

  // ==================== 响应对象工厂 ====================

  /**
   * 创建响应对象（提供类似 Express 的 API）
   * @private
   */
  _createResponseObject(socket, httpVersion) {
    const self = this;
    let statusCode = 200;
    let statusText = 'OK';
    let responseHeaders = {};
    let isSent = false;

    const res = {
      /**
       * 设置响应状态码
       */
      status(code) {
        statusCode = code;
        statusText = STATUS_CODES[code] || 'Unknown';
        return this;  // 链式调用
      },

      /**
       * 设置响应头
       */
      setHeader(name, value) {
        responseHeaders[name.toLowerCase()] = value;
        return this;
      },

      /**
       * 批量设置响应头
       */
      set(headers) {
        Object.entries(headers).forEach(([key, value]) => {
          responseHeaders[key.toLowerCase()] = value;
        });
        return this;
      },

      /**
       * 发送 JSON 响应（自动设置 Content-Type）
       */
      json(data) {
        this.setHeader('Content-Type', 'application/json; charset=utf-8');
        const body = JSON.stringify(data);
        this.setHeader('Content-Length', Buffer.byteLength(body));
        this._send(body);
        return this;
      },

      /**
       * 发送文本/HTML 响应
       */
      send(data) {
        if (typeof data === 'object') {
          return this.json(data);
        }
        
        const body = String(data);
        
        // 自动检测 HTML 内容
        if (!responseHeaders['content-type']) {
          if (body.startsWith('<') || body.startsWith('<!')) {
            this.setHeader('Content-Type', 'text/html; charset=utf-8');
          } else {
            this.setHeader('Content-Type', 'text/plain; charset=utf-8');
          }
        }
        
        this.setHeader('Content-Length', Buffer.byteLength(body));
        this._send(body);
        return this;
      },

      /**
       * 重定向到指定 URL
       */
      redirect(url, code = 302) {
        this.status(code);
        this.setHeader('Location', url);
        this.setHeader('Content-Length', 0);
        this._send('');
        return this;
      },

      /**
       * 结束响应（不发送任何内容）
       */
      end(data) {
        if (data !== undefined) {
          this._send(String(data));
        } else {
          this._send('');
        }
        return this;
      },

      /**
       * 内部方法：发送响应数据
       * @private
       */
      _send(body) {
        if (isSent) {
          console.warn('⚠️ 响应已发送，重复发送被忽略');
          return;
        }
        isSent = true;

        // 构造 HTTP 响应报文
        const responseLine = `HTTP/${httpVersion.split('/')[1]} ${statusCode} ${statusText}`;
        
        // 构造头部
        const headerLines = Object.entries(responseHeaders)
          .map(([name, value]) => `${name}: ${value}`)
          .join('\r\n');

        // 完整响应（头部 + 空行 + 主体）
        const fullResponse = `${responseLine}\r\n${headerLines}\r\n\r\n${body}`;
        
        // 写入 Socket 发送
        self._sendRawResponse(socket, fullResponse);
      },
    };

    return res;
  }

  /**
   * 底层方法：通过 Socket 发送原始响应数据
   * @private
   */
  _sendRawResponse(socket, data) {
    if (!socket.destroyed) {
      socket.write(data);
    }
  }

  // ==================== 中间件与路由执行引擎 ====================

  /**
   * 执行中间件链并进行路由匹配
   * 这是洋葱模型的核心实现
   * @private
   */
  async _executeMiddlewaresAndRoute(req, res) {
    // 创建中间件索引（用于依次执行）
    let middlewareIndex = 0;

    /**
     * next 函数：将控制权交给下一个中间件
     * 当所有中间件执行完毕后，进行路由匹配
     */
    const next = async () => {
      // 检查是否还有未执行的中间件
      if (middlewareIndex < this.middlewares.length) {
        // 获取当前中间件
        const currentMiddleware = this.middlewares[middlewareIndex];
        middlewareIndex++;

        try {
          // 执行当前中间件，传入 req、res 和 next
          await currentMiddleware(req, res, next);
        } catch (error) {
          console.error('❌ 中间件执行出错:', error.message);
          if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
          }
        }
        return;
      }

      // 所有中间件执行完毕，开始路由匹配
      this._matchRoute(req, res);
    };

    // 启动中间件链执行
    await next();
  }

  /**
   * 路由匹配逻辑
   * @private
   */
  _matchRoute(req, res) {
    const { method, path } = req;
    const routesForMethod = this.routes[method];

    if (!routesForMethod) {
      // 该方法没有注册任何路由
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 遍历该方法的所有路由，查找匹配项
    for (const [routePath, routeConfig] of Object.entries(routesForMethod)) {
      const match = path.match(routeConfig.regex);
      
      if (match) {
        // 路由匹配成功！
        // 提取动态参数
        const params = {};
        routeConfig.paramNames.forEach((name, index) => {
          params[name] = decodeURIComponent(match[index + 1]);
        });
        req.params = params;

        try {
          // 执行路由处理函数
          await routeConfig.handler(req, res);
        } catch (error) {
          console.error(`❌ 路由处理器错误 [${method} ${routePath}]:`, error.message);
          if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
          }
        }
        return;  // 匹配成功后立即返回
      }
    }

    // 没有匹配的路由
    res.status(404).json({ error: 'Not Found', path });
  }
}

// ==================== 导出和使用示例 ====================

/** 
 * 使用示例代码：
 * 
 * // 1. 创建服务器实例
 * const app = new MiniHTTPServer({
 *   port: 8080,
 *   staticDir: './public',
 * });
 * 
 * // 2. 注册全局中间件（按顺序执行）
 * 
 * // 中间件 1：请求日志记录
 * app.use((req, res, next) => {
 *   const start = Date.now();
 *   
 *   // 在响应结束时记录耗时
 *   const originalEnd = res.end.bind(res);
 *   res.end = function(...args) {
 *     const duration = Date.now() - start;
 *     console.log(`${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
 *     originalEnd(...args);
 *   };
 *   
 *   next();
 * });
 * 
 * // 中间件 2：CORS 跨域支持
 * app.use((req, res, next) => {
 *   res.setHeader('Access-Control-Allow-Origin', '*');
 *   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
 *   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
 *   
 *   // 预检请求直接返回 204
 *   if (req.method === 'OPTIONS') {
 *     return res.status(204).end();
 *   }
 *   
 *   next();
 * });
 * 
 * // 中间件 3：简单的认证检查（示例）
 * app.use((req, res, next) => {
 *   const token = req.headers['authorization'];
 *   
 *   // 登录接口不需要验证
 *   if (req.path.startsWith('/auth')) {
 *     return next();
 *   }
 *   
 *   if (!token) {
 *     return res.status(401).json({ error: '未提供认证令牌' });
 *   }
 *   
 *   // TODO: 这里应该验证 token 的有效性
 *   next();
 * });
 * 
 * // 3. 注册路由
 * 
 * // 用户相关 API
 * app.get('/api/users', async (req, res) => {
 *   // 从查询参数获取分页信息
 *   const page = parseInt(req.query.page) || 1;
 *   const size = parseInt(req.query.size) || 10;
 *   
 *   // TODO: 从数据库查询用户列表
 *   const users = [
 *     { id: 1, name: '张三', email: 'zhangsan@example.com' },
 *     { id: 2, name: '李四', email: 'lisi@example.com' },
 *   ];
 *   
 *   res.json({
 *     success: true,
 *     data: users,
 *     pagination: { page, size, total: users.length },
 *   });
 * });
 * 
 * // 动态路由参数示例
 * app.get('/api/users/:id', (req, res) => {
 *   const userId = req.params.id;
 *   
 *   // TODO: 根据 ID 查询用户
 *   res.json({
 *     success: true,
 *     data: { id: userId, name: `用户${userId}` },
 *   });
 * });
 * 
 * // POST 请求：创建资源
 * app.post('/api/users', (req, res) => {
 *   const { name, email } = req.body || {};
 *   
 *   if (!name || !email) {
 *     return res.status(400).json({ error: '缺少必要字段: name, email' });
 *   }
 *   
 *   // TODO: 创建用户并保存到数据库
 *   res.status(201).json({
 *     success: true,
 *     data: { id: Date.now(), name, email },
 *     message: '用户创建成功',
 *   });
 * });
 * 
 * // PUT 请求：更新资源
 * app.put('/api/users/:id', (req, res) => {
 *   const userId = req.params.id;
 *   const updates = req.body || {};
 *   
 *   // TODO: 更新用户信息
 *   res.json({
 *     success: true,
 *     message: `用户 ${userId} 更新成功`,
 *   });
 * });
 * 
 * // DELETE 请求：删除资源
 * app.delete('/api/users/:id', (req, res) => {
 *   const userId = req.params.id;
 *   
 *   // TODO: 删除用户
 *   res.json({ success: true, message: `用户 ${userId} 已删除` });
 * });
 * 
 * // 4. 挂载静态文件服务
 * app.static('./public');
 * 
 * // 5. 启动服务器
 * app.listen(8080, () => {
 *   console.log('✅ 服务器启动完成！');
 *   console.log('   测试地址: http://localhost:8080/api/users');
 *   console.log('   静态文件: http://localhost:8080/index.html');
 * });
 */

module.exports = MiniHTTPServer;
```

#### 关键技术要点总结：

| 模块 | 实现方式 | 技术亮点 |
|------|---------|---------|
| **TCP 连接管理** | net.createServer | 数据缓冲、完整请求检测、Keep-Alive 支持 |
| **HTTP 协议解析** | 手写字符串解析 | 请求行/头/体分离、URL 参数解析 |
| **路由系统** | 正则表达式匹配 | 支持 `:param` 动态参数 |
| **中间件机制** | 异步迭代 + next() | 洋葱模型，支持异步中间件 |
| **静态文件** | fs.promises | MIME 类型映射、ETag 缓存、路径安全检查 |
| **响应对象** | 工厂模式 | 链式调用 API（status/json/send/redirect）|

---

## Q32: 实现 WebSocket 服务端（含握手解析和帧编解码）
- **难度**：★★★
- **知识点**：WebSocket 协议 / 帧结构 / 握手流程
- **题型**：编程实践题

### 参考答案要点：
```javascript
// WebSocket 握手处理
function handleWebSocketUpgrade(req, socket, head) {
  // 1. 验证 Upgrade 和 Connection 头
  // 2. 计算 Sec-WebSocket-Accept
  const key = req.headers['sec-webSocket-key'];
  const acceptHash = crypto.createHash('sha1')
    .update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
    .digest('base64');
  
  // 3. 发送 101 Switching Protocols
  socket.write([
    'HTTP/1.1 101 Switching Protocols',
    `Sec-WebSocket-Accept: ${acceptHash}`,
    'Upgrade: websocket',
    'Connection: Upgrade',
    '\r\n'
  ].join('\r\n'));
  
  // 4. 进入 WebSocket 数据帧处理阶段
  handleWebSocketFrames(socket);
}

// 帧编解码（简化版）
function encodeFrame(payload) {
  const mask = crypto.randomBytes(4);
  const payloadBuffer = Buffer.from(payload);
  const maskedPayload = Buffer.alloc(payloadBuffer.length);
  
  for (let i = 0; i < payloadBuffer.length; i++) {
    maskedPayload[i] = payloadBuffer[i] ^ mask[i % 4];
  }
  
  let header;
  if (payloadBuffer.length < 126) {
    header = Buffer.from([0x81, 0x80 | payloadBuffer.length]);
  }
  
  return Buffer.concat([header, mask, maskedPayload]);
}
```

### 🔥 深度拓展：手写实现

#### 完整的 WebSocket 服务端实现（含握手、帧编解码、心跳、广播）

```javascript
/**
 * ============================================================
 *  🔄 MiniWebSocket - 手写 WebSocket 服务端
 * ============================================================
 * 
 *  功能特性：
 *  ✅ 完整的 WebSocket 握手过程解析
 *     （Sec-WebSocket-Key → Sec-WebSocket-Accept 计算）
 *  ✅ 帧编解码（Opcode / MASK / Payload Length 完整处理）
 *  ✅ 心跳检测机制（Ping/Pong 自动响应）
 *  ✅ 消息广播功能（单播、广播、房间分组）
 *  ✅ 连接管理（连接/断开事件、统计信息）
 * 
 *  算法思路（ASCII 图解）：
 * 
 *  ┌──────────────────────────────────────────────────────┐
 *  │              WebSocket 协议处理流程                    │
 *  │                                                      │
 *  │   [1] HTTP 握手阶段                                   │
 *  │       客户端: GET /ws (Upgrade: websocket)            │
 *  │       服务端: 101 Switching Protocols                │
 *  │              ↓                                       │
 *  │   [2] 数据传输阶段（二进制帧）                         │
 *  │       ┌─────────────────────────────────┐            │
 *  │       │  帧头 (2+ 字节)                  │            │
 *  │       │  ├─ FIN: 是否最后一帧            │            │
 *  │       │  ├─ Opcode: 帧类型(文本/二进制)   │            │
 *  │       │  ├─ MASK: 是否掩码(客户端必须1)    │            │
 *  │       │  └─ Length: 载荷长度              │            │
 *  │       ├─────────────────────────────────┤            │
 *  │       │  掩码密钥 (4 字节，客户端→服务端)  │            │
 *  │       ├─────────────────────────────────┤            │
 *  │       │  载荷数据 (Mask 解码后)          │            │
 *  │       └─────────────────────────────────┘            │
 *  │              ↓                                       │
 *  │   [3] 消息分发                                       │
 *  │       文本消息 → onMessage 回调                      │
 *  │       二进制消息 → onBinary 回调                     │
 *  │       Ping 帧 → 自动回复 Pong                        │
 *  │       Close 帧 → 断开连接                            │
 *  │                                                      │
 *  └──────────────────────────────────────────────────────┘
 */

const net = require('net');
const crypto = require('crypto');

// ==================== WebSocket OPCODE 常量 ====================
// 定义 WebSocket 帧的操作码（Opcode）
const OPCODES = {
  CONTINUATION: 0x0,   // 继续帧（分段传输的后续帧）
  TEXT: 0x1,            // 文本帧（UTF-8 编码）
  BINARY: 0x2,          // 二进制帧
  CLOSE: 0x8,           // 关闭连接帧
  PING: 0x9,            // 心跳检测请求（Ping）
  PONG: 0xA,            // 心跳响应（Pong）
};

// Opcode 名称映射（用于日志输出）
const OPCODE_NAMES = {
  0x0: 'CONTINUATION',
  0x1: 'TEXT',
  0x2: 'BINARY',
  0x8: 'CLOSE',
  0x9: 'PING',
  0xA: 'PONG',
};

// ==================== WebSocket 连接状态枚举 ====================
const CONNECTION_STATE = {
  CONNECTING: 'CONNECTING',     // 正在握手
  OPEN: 'OPEN',                 // 已连接，可通信
  CLOSING: 'CLOSING',           // 正在关闭
  CLOSED: 'CLOSED',             // 已关闭
};

// ==================== 核心类：MiniWebSocketServer ====================

class MiniWebSocketServer {
  /**
   * 构造函数：初始化服务器配置和连接管理器
   */
  constructor(options = {}) {
    // 服务器配置项
    this.options = {
      port: options.port || 8080,
      host: options.host || '0.0.0.0',
      path: options.path || '/',        // WebSocket 路径
      heartbeatInterval: options.heartbeatInterval || 30000,  // 心跳间隔（毫秒）
      heartbeatTimeout: options.heartbeatTimeout || 60000,     // 心跳超时（毫秒）
      maxPayloadSize: options.maxPayloadSize || 104857600,    // 最大载荷 100MB
    };

    // 连接管理：存储所有活跃的 WebSocket 连接
    this.connections = new Map();  // connectionId → WebSocketConnection
    
    // 房间管理：支持分组广播
    this.rooms = new Map();       // roomName → Set<connectionId>

    // 全局事件监听器
    this.eventListeners = {
      connection: [],      // 新连接建立时触发
      message: [],         // 收到消息时触发
      close: [],           // 连接关闭时触发
      error: [],           // 发生错误时触发
    };

    // 连接 ID 计数器（自增）
    this.connectionIdCounter = 0;

    // 创建底层 TCP 服务器
    this.server = net.createServer(this._handleTCPConnection.bind(this));

    console.log('🔧 MiniWebSocketServer 初始化完成');
  }

  // ==================== 服务器生命周期方法 ====================

  /**
   * 启动 WebSocket 服务器监听
   */
  listen(port, callback) {
    const listenPort = port || this.options.port;
    
    this.server.listen(listenPort, this.options.host, () => {
      console.log(`\n🚀 WebSocket Server running at ws://${this.options.host}:${listenPort}`);
      console.log(`   Path: ${this.options.path}`);
      console.log(`   Heartbeat: ${this.options.heartbeatInterval}ms\n`);
      
      if (typeof callback === 'function') {
        callback();
      }
    });

    return this;  // 支持链式调用
  }

  /**
   * 关闭服务器（停止接受新连接，但不断开现有连接）
   */
  close(callback) {
    this.server.close(() => {
      console.log('🛑 WebSocket Server 已关闭');
      if (callback) callback();
    });
    
    return this;
  }

  // ==================== 事件注册方法 ====================

  /**
   * 注册事件监听器（类似 Node.js EventEmitter 风格）
   * @param {string} event - 事件名称：connection/message/close/error
   * @param {Function} listener - 事件回调函数
   */
  on(event, listener) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].push(listener);
    }
    return this;  // 支持链式调用
  }

  /**
   * 触发事件（内部使用）
   * @private
   */
  _emit(event, ...args) {
    const listeners = this.eventListeners[event] || [];
    listeners.forEach(listener => {
      try {
        listener(...args);
      } catch (error) {
        console.error(`[Event:${event}] 监听器执行出错:`, error.message);
      }
    });
  }

  // ==================== TCP 连接处理（入口）====================

  /**
   * 处理新的 TCP 连接
   * 这是所有连接的入口点
   * @private
   */
  _handleTCPConnection(socket) {
    const connId = ++this.connectionIdCounter;
    
    console.log(`[${connId}] 📥 新的 TCP 连接来自 ${socket.remoteAddress}:${socket.remotePort}`);

    // 创建 WebSocket 连接对象
    const connection = new WebSocketConnection(connId, socket, this);

    // 存储到连接映射表
    this.connections.set(connId, connection);

    // 触发 connection 事件
    this._emit('connection', connection);

    // 数据缓冲区（用于拼接不完整的帧数据）
    let buffer = Buffer.alloc(0);

    // ========== 数据接收处理 ==========
    socket.on('data', (chunk) => {
      // 将新数据追加到缓冲区
      buffer = Buffer.concat([buffer, chunk]);

      // 根据连接状态决定如何处理数据
      if (connection.state === CONNECTION_STATE.CONNECTING) {
        // 处于握手阶段：尝试解析 HTTP 升级请求
        this._handleHandshake(connection, buffer, socket);
        // 清空缓冲区（握手完成后不再需要原始数据）
        buffer = Buffer.alloc(0);
        
      } else if (connection.state === CONNECTION_STATE.OPEN) {
        // 已连接状态：解析 WebSocket 数据帧
        this._parseFrames(connection, buffer);
        // 清空已处理的数据
        buffer = Buffer.alloc(0);
      }
    });

    // ========== 连接关闭处理 ==========
    socket.on('close', () => {
      console.log(`[${connId}] 🔒 TCP 连接已关闭`);
      
      // 从所有房间中移除该连接
      this._removeFromAllRooms(connId);
      
      // 从连接映射表中删除
      this.connections.delete(connId);
      
      // 触发 close 事件
      this._emit('close', connection);
    });

    // ========== 错误处理 ==========
    socket.on('error', (error) => {
      console.error(`[${connId}] ❌ Socket 错误:`, error.message);
      this._emit('error', error, connection);
    });
  }

  // ==================== WebSocket 握手过程 ====================

  /**
   * 处理 WebSocket 握手（HTTP Upgrade 请求）
   * 
   * 握手流程详解：
   * 1. 客户端发送 HTTP GET 请求，包含特殊头部
   * 2. 服务端验证请求合法性
   * 3. 计算 Sec-WebSocket-Accept 值
   * 4. 返回 101 Switching Protocols 响应
   * 
   * @private
   */
  _handleHandshake(connection, rawData, socket) {
    try {
      // 第一步：将原始数据转换为字符串
      const rawString = rawData.toString('utf-8');
      
      // 第二步：检查是否是有效的 HTTP 请求
      if (!rawString.includes('HTTP/') && !rawString.includes('http')) {
        throw new Error('无效的 HTTP 请求格式');
      }

      // 第三步：解析请求行
      const requestLine = rawString.split('\r\n')[0];
      const [method, path, httpVersion] = requestLine.split(' ');

      // 第四步：验证必须是 GET 方法
      if (method !== 'GET') {
        throw new Error('WebSocket 握手必须是 GET 请求');
      }

      // 第五步：解析所有请求头
      const headers = {};
      const headerLines = rawString.split('\r\n').slice(1);
      
      for (const line of headerLines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const name = line.slice(0, colonIndex).trim().toLowerCase();
          const value = line.slice(colonIndex + 1).trim();
          headers[name] = value;
        }
      }

      // 第六步：验证必要的 WebSocket 升级头部
      
      // 检查 Upgrade 头
      if (headers['upgrade']?.toLowerCase() !== 'websocket') {
        throw new Error('缺少或无效的 Upgrade: websocket 头部');
      }

      // 检查 Connection 头（可能包含多个值，用逗号分隔）
      const connectionHeader = headers['connection']?.toLowerCase() || '';
      if (!connectionHeader.includes('upgrade')) {
        throw new Error('缺少或无效的 Connection: Upgrade 头部');
      }

      // 检查 WebSocket 版本（RFC 6455 要求版本 13）
      const wsVersion = parseInt(headers['sec-websocket-version']);
      if (wsVersion !== 13) {
        return this._sendHTTPError(socket, 426, 'Upgrade Required', {
          'Sec-WebSocket-Version': '13'
        });
      }

      // 第七步：获取并验证 Sec-WebSocket-Key
      const clientKey = headers['sec-websocket-key'];
      if (!clientKey) {
        throw new Error('缺少 Sec-WebSocket-Key 头部');
      }

      // 验证 Key 格式（Base64 编码的 16 字节随机值）
      if (!/^[A-Za-z0-9+/]{4,}={0,2}$/.test(clientKey)) {
        throw new Error('Sec-WebSocket-Key 格式无效');
      }

      // 第八步：计算 Sec-WebSocket-Accept 值
      // 算法：SHA-1(ClientKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11") → Base64
      const WEBSOCKET_GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';  // RFC 6455 定义的 GUID
      const acceptHash = crypto.createHash('sha1')
        .update(clientKey + WEBSOCKET_GUID)
        .digest('base64');

      // 第九步：构造并发送 101 Switching Protocols 响应
      const responseHeaders = [
        'HTTP/1.1 101 Switching Protocols',
        `Sec-WebSocket-Accept: ${acceptHash}`,
        'Upgrade: websocket',
        'Connection: Upgrade',
        '\r\n'  // 空行表示头部结束
      ].join('\r\n');

      socket.write(responseHeaders);

      // 第十步：更新连接状态为 OPEN
      connection.state = CONNECTION_STATE.OPEN;
      connection.handshakeHeaders = headers;
      connection.connectTime = Date.now();

      console.log(`[${connection.id}] ✅ WebSocket 握手成功！路径: ${path}`);

      // 启动心跳检测定时器
      this._startHeartbeat(connection);

    } catch (error) {
      console.error(`[${connection.id}] ❌ 握手失败:`, error.message);
      this._sendHTTPError(socket, 400, 'Bad Request', {});
      socket.end();  // 关闭连接
    }
  }

  /**
   * 发送 HTTP 错误响应（握手失败时使用）
   * @private
   */
  _sendHTTPError(socket, statusCode, statusText, extraHeaders) {
    const response = [
      `HTTP/1.1 ${statusCode} ${statusText}`,
      'Content-Type: text/plain',
      'Connection: close',
      ...Object.entries(extraHeaders).map(([k, v]) => `${k}: ${v}`),
      '\r\n',
      statusText,
    ].join('\r\n');
    
    socket.write(response);
  }

  // ==================== WebSocket 帧编解码核心 ====================

  /**
   * 解析 WebSocket 数据帧（可能包含多个帧）
   * 
   * 帧结构（RFC 6455）：
   *  0                   1                   2                   3
   *  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   * +-+-+-+-+-------+-+-------------+-------------------------------+
   * |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
   * |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
   * |N|V|V|V|       |S|             |   (if payload len==126/127)   |
   * +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
   * |     Extended payload length continued, if payload len == 127  |
   * + - - - - - - - - - - - - - - - +-------------------------------+
   * |                               |Masking-key, if MASK set to 1  |
   * +-------------------------------+-------------------------------+
   * | Masking-key (continued)       |          Payload Data         |
   * +-------------------------------- - - - - - - - - - - - - - - - +
   * :                     Payload Data continued ...                :
   * + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
   * |                     Payload Data continued ...                |
   * +---------------------------------------------------------------+
   * 
   * @private
   */
  _parseFrames(connection, data) {
    let offset = 0;  // 当前读取位置

    while (offset < data.length) {
      try {
        // 至少需要 2 字节的帧头
        if (offset + 2 > data.length) {
          break;  // 数据不足，等待更多数据
        }

        // ====== 第一字节：FIN + RSV + Opcode ======
        const firstByte = data[offset];
        const FIN = (firstByte & 0x80) !== 0;         // 最高位：是否最终帧
        const RSV1 = (firstByte & 0x40) !== 0;        // 扩展位1（保留）
        const RSV2 = (firstByte & 0x20) !== 0;        // 扩展位2（保留）
        const RSV3 = (firstByte & 0x10) !== 0;        // 扩展位3（保留）
        const Opcode = firstByte & 0x0F;               // 低4位：操作码

        // 检查 RSV 位（如果设置了且未协商扩展，应关闭连接）
        if (RSV1 || RSV2 || RSV3) {
          console.warn(`[${connection.id}] ⚠️ 收到设置 RSV 位的帧（未协商扩展）`);
        }

        // ====== 第二字节：MASK + Payload Length ======
        const secondByte = data[offset + 1];
        const MASK = (secondByte & 0x80) !== 0;        // 最高位：是否有掩码
        let payloadLength = secondByte & 0x7F;         // 低7位：初始载荷长度

        offset += 2;  // 移过前两字节

        // ====== 扩展载荷长度（如果初始值为 126 或 127）======
        if (payloadLength === 126) {
          // 接下来 2 字节表示真实长度（16 位无符号整数，大端序）
          if (offset + 2 > data.length) break;
          payloadLength = data.readUInt16BE(offset);
          offset += 2;
          
        } else if (payloadLength === 127) {
          // 接下来 8 字节表示真实长度（64 位无符号整数，大端序）
          if (offset + 8 > data.length) break;
          
          // 注意：最高有效位必须为 0（防止过大值）
          const highBits = data[offset];
          if (highBits & 0x80) {
            throw new Error('载荷长度超过限制（最高位不应为 1）');
          }
          
          payloadLength = Number(data.readBigUInt64BE(offset));
          offset += 8;
        }

        // 安全检查：载荷长度不能超过配置的最大值
        if (payloadLength > this.options.maxPayloadSize) {
          throw new Error(`载荷长度 (${payloadLength}) 超过最大限制 (${this.options.maxPayloadSize})`);
        }

        // ====== 掩码密钥（4 字节）======
        let maskingKey = null;
        if (MASK) {
          if (offset + 4 > data.length) break;
          maskingKey = data.slice(offset, offset + 4);
          offset += 4;
        } else {
          // 客户端发送的帧必须设置 MASK 位
          // 但为了兼容性，某些情况下允许无掩码
          console.warn(`[${connection.id}] ⚠️ 收到无掩码的帧（客户端应该始终掩码）`);
        }

        // ====== 载荷数据 ======
        if (offset + payloadLength > data.length) {
          break;  // 数据不完整，等待更多数据
        }

        const rawPayload = data.slice(offset, offset + payloadLength);
        offset += payloadLength;

        // ====== 反掩码处理（如果有掩码）======
        let decodedPayload = rawPayload;
        if (MASK && maskingKey) {
          decodedPayload = this._unmask(rawPayload, maskingKey);
        }

        // ====== 根据 Opcode 处理帧 ======
        this._handleFrame(connection, Opcode, FIN, decodedPayload);

      } catch (error) {
        console.error(`[${connection.id}] ❌ 帧解析错误:`, error.message);
        // 发送 Close 帧并关闭连接
        this.closeConnection(connection.id, 1002, '协议错误');
        break;
      }
    }
  }

  /**
   * 反掩码操作（XOR 解密）
   * 
   * WebSocket 协议要求客户端发送的数据必须经过掩码处理
   * 掩码算法：payload[i] ^ maskingKey[i % 4]
   * 
   * @private
   * @param {Buffer} maskedData - 经过掩码的数据
   * @param {Buffer} maskingKey - 4 字节的掩码密钥
   * @returns {Buffer} - 解码后的原始数据
   */
  _unmask(maskedData, maskingKey) {
    const result = Buffer.alloc(maskedData.length);
    
    for (let i = 0; i < maskedData.length; i++) {
      // XOR 操作：每个字节与对应的掩码字节异或
      result[i] = maskedData[i] ^ maskingKey[i % 4];
    }
    
    return result;
  }

  /**
   * 编码 WebSocket 帧（用于向客户端发送数据）
   * 
   * 注意：服务端发送给客户端的帧不需要掩码
   * 
   * @param {number} opcode - 操作码（OPCODES.TEXT 等）
   * @param {Buffer|string} payload - 载荷数据
   * @param {boolean} fin - 是否最终帧（默认 true）
   * @returns {Buffer} - 完整的帧数据
   */
  _encodeFrame(opcode, payload, fin = true) {
    // 确保 payload 是 Buffer 类型
    const payloadBuffer = typeof payload === 'string' 
      ? Buffer.from(payload, 'utf-8') 
      : payload;
    
    const payloadLength = payloadBuffer.length;
    let headerSize = 2;  // 最小帧头大小

    // 计算扩展长度所需的字节数
    if (payloadLength > 65535) {
      headerSize += 8;  // 127 需要 8 字节扩展长度
    } else if (payloadLength > 125) {
      headerSize += 2;  // 126 需要 2 字节扩展长度
    }

    // 分配帧缓冲区（头部 + 载荷）
    const frameBuffer = Buffer.alloc(headerSize + payloadLength);
    let offset = 0;

    // ====== 写入第一字节 ======
    // FIN 位（最高位）+ Opcode（低4位）
    frameBuffer[offset++] = (fin ? 0x80 : 0x00) | (opcode & 0x0F);

    // ====== 写入第二字节 ======
    // MASK 位（服务端发送设为 0）+ 初始载荷长度
    if (payloadLength <= 125) {
      frameBuffer[offset++] = payloadLength & 0x7F;  // 直接写入长度
    } else if (payloadLength <= 65535) {
      frameBuffer[offset++] = 126;  // 标识使用 2 字节扩展长度
      frameBuffer.writeUInt16BE(payloadLength, offset);  // 大端序写入
      offset += 2;
    } else {
      frameBuffer[offset++] = 127;  // 标识使用 8 字节扩展长度
      frameBuffer.writeBigUInt64BE(BigInt(payloadLength), offset);  // 大端序写入
      offset += 8;
    }

    // ====== 写入载荷数据（无需掩码）======
    if (payloadLength > 0) {
      payloadBuffer.copy(frameBuffer, offset);
    }

    return frameBuffer;
  }

  /**
   * 处理解析后的帧（根据 Opcode 分发）
   * @private
   */
  _handleFrame(connection, opcode, fin, payload) {
    // 更新最后活动时间（用于心跳检测）
    connection.lastActivityTime = Date.now();

    switch (opcode) {
      case OPCODES.TEXT:
        // 文本消息帧
        const message = payload.toString('utf-8');
        console.log(`[${connection.id}] 💬 收到文本消息: ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}`);
        this._emit('message', message, connection);
        break;

      case OPCODES.BINARY:
        // 二进制消息帧
        console.log(`[${connection.id}] 🔢 收到二进制消息: ${payload.length} 字节`);
        this._emit('binary', payload, connection);
        break;

      case OPCODES.PING:
        // Ping 心跳请求：自动回复 Pong
        console.log(`[${connection.id}] 💓 收到 Ping，回复 Pong`);
        this.sendFrame(connection.id, OPCODES.PONG, payload);
        break;

      case OPCODES.PONG:
        // Pong 心跳响应：更新心跳状态
        connection.lastPongTime = Date.now();
        connection.pingPending = false;
        console.log(`[${connection.id}] 💓 收到 Pong 响应`);
        break;

      case OPCODES.CLOSE:
        // 关闭连接帧
        console.log(`[${connection.id}] 🔒 收到 Close 帧`);
        
        // 尝试解析关闭代码和原因
        let closeCode = 1000;  // 默认正常关闭
        let closeReason = '';
        
        if (payload.length >= 2) {
          closeCode = payload.readUInt16BE(0);
          closeReason = payload.slice(2).toString('utf-8');
        }
        
        // 回复 Close 帧（确认关闭）
        this.sendCloseFrame(connection.id, closeCode, closeReason);
        connection.socket.end();  // 关闭 TCP 连接
        break;

      case OPCODES.CONTINUATION:
        // 继续帧（分段传输的一部分）
        // TODO: 实现完整的分段重组逻辑
        console.warn(`[${connection.id}] ⚠️ 收到 Continuation 帧（暂不支持分段传输）`);
        break;

      default:
        // 未知的 Opcode
        console.warn(`[${connection.id}] ⚠️ 未知的 Opcode: 0x${opcode.toString(16)}`);
        this.closeConnection(connection.id, 1002, '未知操作码');
    }
  }

  // ==================== 心跳检测机制 ====================

  /**
   * 为指定连接启动心跳检测
   * 定期发送 Ping 帧来检测连接是否存活
   * @private
   */
  _startHeartbeat(connection) {
    // 如果没有配置心跳间隔，则不启动
    if (this.options.heartbeatInterval <= 0) return;

    console.log(`[${connection.id}] 💓 启动心跳检测（间隔: ${this.options.heartbeatInterval}ms）`);

    connection.heartbeatTimer = setInterval(() => {
      // 检查连接是否仍然处于 OPEN 状态
      if (connection.state !== CONNECTION_STATE.OPEN) {
        clearInterval(connection.heartbeatTimer);
        return;
      }

      // 检查上一次 Ping 是否有响应
      if (connection.pingPending) {
        // 上一次 Ping 未收到 Pong 响应，判断为超时
        const elapsed = Date.now() - connection.lastPingTime;
        if (elapsed > this.options.heartbeatTimeout) {
          console.warn(`[${connection.id}] ⏰ 心跳超时（${elapsed}ms 无响应），强制断开`);
          this.closeConnection(connection.id, 1001, '心跳超时');
          return;
        }
      }

      // 发送 Ping 帧
      const pingData = Date.now().toString();  // 使用时间戳作为 Ping 载荷
      this.sendFrame(connection.id, OPCODES.PING, pingData);
      connection.lastPingTime = Date.now();
      connection.pingPending = true;

    }, this.options.heartbeatInterval);
  }

  // ==================== 公共 API：消息发送 ====================

  /**
   * 向指定连接发送文本消息
   * @param {number} connectionId - 目标连接 ID
   * @param {string} message - 要发送的消息内容
   */
  send(connectionId, message) {
    const connection = this.connections.get(connectionId);
    if (!connection || connection.state !== CONNECTION_STATE.OPEN) {
      console.warn(`⚠️ 连接 ${connectionId} 不存在或未打开`);
      return false;
    }

    return this.sendFrame(connectionId, OPCODES.TEXT, message);
  }

  /**
   * 向指定连接发送二进制数据
   * @param {number} connectionId - 目标连接 ID
   * @param {Buffer} data - 要发送的二进制数据
   */
  sendBinary(connectionId, data) {
    const connection = this.connections.get(connectionId);
    if (!connection || connection.state !== CONNECTION_STATE.OPEN) {
      return false;
    }

    return this.sendFrame(connectionId, OPCODES.BINARY, data);
  }

  /**
   * 底层方法：发送任意类型的帧
   * @private
   */
  sendFrame(connectionId, opcode, payload) {
    const connection = this.connections.get(connectionId);
    if (!connection || connection.socket.destroyed) {
      return false;
    }

    try {
      const frame = this._encodeFrame(opcode, payload, true);
      connection.socket.write(frame);
      return true;
    } catch (error) {
      console.error(`❌ 发送帧失败:`, error.message);
      return false;
    }
  }

  /**
   * 发送 Close 帧
   */
  sendCloseFrame(connectionId, code = 1000, reason = '') {
    // 构造 Close 帧载荷：2 字节关闭代码 + UTF-8 编码的原因字符串
    const reasonBuffer = Buffer.from(reason, 'utf-8');
    const payload = Buffer.alloc(2 + reasonBuffer.length);
    payload.writeUInt16BE(code, 0);
    reasonBuffer.copy(payload, 2);
    
    return this.sendFrame(connectionId, OPCODES.CLOSE, payload);
  }

  // ==================== 公共 API：广播功能 ====================

  /**
   * 向所有连接广播消息
   * @param {string} message - 要广播的消息
   * @param {number|null} excludeConnectionId - 要排除的连接 ID（可选）
   */
  broadcast(message, excludeConnectionId = null) {
    let sentCount = 0;
    
    for (const [connId, conn] of this.connections) {
      if (conn.state === CONNECTION_STATE.OPEN && connId !== excludeConnectionId) {
        if (this.send(connId, message)) {
          sentCount++;
        }
      }
    }
    
    console.log(`📢 广播消息给 ${sentCount} 个连接`);
    return sentCount;
  }

  /**
   * 向指定房间的所有成员广播消息
   * @param {string} roomName - 房间名称
   * @param {string} message - 要广播的消息
   */
  broadcastToRoom(roomName, message) {
    const room = this.rooms.get(roomName);
    if (!room) {
      console.warn(`⚠️ 房间 "${roomName}" 不存在`);
      return 0;
    }

    let sentCount = 0;
    for (const connId of room) {
      if (this.send(connId, message)) {
        sentCount++;
      }
    }

    console.log(`📢 在房间 "${roomName}" 广播给 ${sentCount} 个成员`);
    return sentCount;
  }

  // ==================== 公共 API：房间管理 ====================

  /**
   * 将连接加入指定房间
   * @param {number} connectionId - 连接 ID
   * @param {string} roomName - 房间名称
   */
  joinRoom(connectionId, roomName) {
    if (!this.rooms.has(roomName)) {
      this.rooms.set(roomName, new Set());
    }
    
    this.rooms.get(roomName).add(connectionId);
    console.log(`[${connectionId}] 🚪 加入房间: ${roomName}`);
  }

  /**
   * 将连接从指定房间移除
   * @param {number} connectionId - 连接 ID
   * @param {string} roomName - 房间名称
   */
  leaveRoom(connectionId, roomName) {
    const room = this.rooms.get(roomName);
    if (room) {
      room.delete(connectionId);
      console.log(`[${connectionId}] 🚪 离开房间: ${roomName}`);
      
      // 如果房间空了，删除房间
      if (room.size === 0) {
        this.rooms.delete(roomName);
      }
    }
  }

  /**
   * 将连接从所有房间中移除
   * @private
   */
  _removeFromAllRooms(connectionId) {
    for (const [roomName, room] of this.rooms) {
      if (room.has(connectionId)) {
        room.delete(connectionId);
        console.log(`[${connectionId}] 🚪 自动离开房间: ${roomName}`);
        
        if (room.size === 0) {
          this.rooms.delete(roomName);
        }
      }
    }
  }

  // ==================== 公共 API：连接控制 ====================

  /**
   * 关闭指定连接
   * @param {number} connectionId - 连接 ID
   * @param {number} code - 关闭代码（默认 1000 正常关闭）
   * @param {string} reason - 关闭原因
   */
  closeConnection(connectionId, code = 1000, reason = '') {
    const connection = this.connections.get(connectionId);
    if (!connection) return false;

    // 更新连接状态
    connection.state = CONNECTION_STATE.CLOSING;

    // 停止心跳定时器
    if (connection.heartbeatTimer) {
      clearInterval(connection.heartbeatTimer);
    }

    // 发送 Close 帧
    this.sendCloseFrame(connectionId, code, reason);

    // 延迟关闭 TCP 连接（确保 Close 帧发出）
    setTimeout(() => {
      if (!connection.socket.destroyed) {
        connection.socket.end();
      }
    }, 100);

    return true;
  }

  /**
   * 获取当前在线连接数量
   */
  getConnectionCount() {
    let count = 0;
    for (const conn of this.connections.values()) {
      if (conn.state === CONNECTION_STATE.OPEN) {
        count++;
      }
    }
    return count;
  }

  /**
   * 获取服务器统计信息
   */
  getStats() {
    return {
      totalConnections: this.connectionIdCounter,
      activeConnections: this.getConnectionCount(),
      roomsCount: this.rooms.size,
      uptime: process.uptime(),
    };
  }
}

// ==================== 辅助类：WebSocketConnection ====================

/**
 * 表示单个 WebSocket 连接的封装类
 */
class WebSocketConnection {
  constructor(id, socket, server) {
    /** 连接唯一标识 */
    this.id = id;
    
    /** 底层 TCP Socket 对象 */
    this.socket = socket;
    
    /** 所属服务器实例引用 */
    this.server = server;
    
    /** 连接状态（CONNECTING/OPEN/CLOSING/CLOSED）*/
    this.state = CONNECTION_STATE.CONNECTING;
    
    /** 远程地址信息 */
    this.remoteAddress = socket.remoteAddress;
    this.remotePort = socket.remotePort;
    
    /** 时间戳 */
    this.connectTime = null;          // 连接建立时间
    this.lastActivityTime = null;      // 最后活动时间
    this.lastPingTime = null;          // 最后发送 Ping 的时间
    this.lastPongTime = null;          // 最后收到 Pong 的时间
    
    /** 心跳状态 */
    this.pingPending = false;          // 是否有待确认的 Ping
    this.heartbeatTimer = null;        // 心跳定时器引用
    
    /** 自定义数据存储（可用于挂载用户信息等）*/
    this.data = {};

    /** 握手时的请求头（握手成功后填充）*/
    this.handshakeHeaders = null;
  }

  /**
   * 发送消息（便捷方法）
   */
  send(message) {
    return this.server.send(this.id, message);
  }

  /**
   * 发送二进制数据（便捷方法）
   */
  sendBinary(data) {
    return this.server.sendBinary(this.id, data);
  }

  /**
   * 关闭连接（便捷方法）
   */
  close(code, reason) {
    return this.server.closeConnection(this.id, code, reason);
  }

  /**
   * 加入房间（便捷方法）
   */
  join(roomName) {
    return this.server.joinRoom(this.id, roomName);
  }

  /**
   * 离开房间（便捷方法）
   */
  leave(roomName) {
    return this.server.leaveRoom(this.id, roomName);
  }

  /**
   * 获取连接信息摘要
   */
  toJSON() {
    return {
      id: this.id,
      state: this.state,
      remoteAddress: `${this.remoteAddress}:${this.remotePort}`,
      connectTime: this.connectTime,
      lastActivity: this.lastActivityTime,
      uptime: this.connectTime ? Date.now() - this.connectTime : null,
    };
  }
}

// ==================== 导出和使用示例 ====================

/** 
 * 使用示例代码：
 * 
 * // 1. 创建 WebSocket 服务器实例
 * const wss = new MiniWebSocketServer({
 *   port: 8080,
 *   path: '/ws',
 *   heartbeatInterval: 30000,  // 30 秒心跳间隔
 * });
 * 
 * // 2. 监听新连接事件
 * wss.on('connection', (ws) => {
 *   console.log(`新连接 #${ws.id} 来自 ${ws.remoteAddress}`);
 *   
 *   // 可以在连接对象上挂载自定义数据
 *   ws.data.nickname = `用户_${ws.id}`;
 *   
 *   // 发送欢迎消息
 *   ws.send(JSON.stringify({
 *     type: 'welcome',
 *     message: '欢迎连接到 WebSocket 服务器！',
 *     yourId: ws.id,
 *   }));
 * });
 * 
 * // 3. 监听消息事件
 * wss.on('message', (message, ws) => {
 *   console.log(`#${ws.id}: ${message}`);
 *   
 *   try {
 *     // 尝试解析 JSON 消息
 *     const data = JSON.parse(message);
 *     
 *     switch (data.type) {
 *       case 'chat':
 *         // 聊天消息：广播给所有人（除了发送者）
 *         wss.broadcast(JSON.stringify({
 *           type: 'chat',
 *           from: ws.data.nickname,
 *           content: data.content,
 *           time: new Date().toISOString(),
 *         }), ws.id);
 *         break;
 *         
 *       case 'join_room':
 *         // 加入房间
 *         ws.join(data.room);
 *         ws.send(JSON.stringify({
 *           type: 'system',
 *           message: `你已加入房间: ${data.room}`,
 *         }));
 *         break;
 *         
 *       case 'room_message':
 *         // 房间内消息
 *         wss.broadcastToRoom(data.room, JSON.stringify({
 *           type: 'room_chat',
 *           from: ws.data.nickname,
 *           room: data.room,
 *           content: data.content,
 *         }));
 *         break;
 *         
 *       default:
 *         ws.send(JSON.stringify({ type: 'error', message: '未知消息类型' }));
 *     }
 *   } catch {
 *     // 非 JSON 消息，原样回复（Echo 模式）
 *     ws.send(`Echo: ${message}`);
 *   }
 * });
 * 
 * // 4. 监听连接关闭事件
 * wss.on('close', (ws) => {
 *   console.log(`连接 #${ws.id} 已断开`);
 * });
 * 
 * // 5. 监听错误事件
 * wss.on('error', (error, ws) => {
 *   console.error('服务器错误:', error.message);
 * });
 * 
 * // 6. 定时广播服务器统计信息（每 60 秒）
 * setInterval(() => {
 *   const stats = wss.getStats();
 *   wss.broadcast(JSON.stringify({
 *     type: 'stats',
 *     ...stats,
 *   }));
 * }, 60000);
 * 
 * // 7. 启动服务器
 * wss.listen(8080, () => {
 *   console.log('✅ WebSocket 服务器启动完成！');
 *   console.log('   测试地址: ws://localhost:8080/ws');
 * });
 */

module.exports = MiniWebSocketServer;
```

#### 关键技术要点总结：

| 模块 | 实现方式 | 技术亮点 |
|------|---------|---------|
| **握手过程** | SHA-1 + GUID 计算 | 完整 RFC 6455 握手流程，含头部验证 |
| **帧解码** | 逐字节位运算 | 支持 7bit/16bit/64bit 长度字段 |
| **反掩码** | XOR 异或算法 | 4 字节循环密钥解密 |
| **心跳检测** | setInterval + Ping/Pong | 超时自动断开，防止僵尸连接 |
| **消息广播** | Set + Map 结构 | 单播/广播/房间分组三种模式 |
| **连接管理** | 封装类设计 | 状态机、统计信息、自定义数据挂载 |

---

## Q33-Q50: 专家题列表（框架提示）

| 题号 | 题目 | 核心考点 |
|------|------|---------|
| Q33 | 设计并实现一个支持断点续传的文件上传组件 | Range 请求、Blob 切片、并发控制、MD5 校验 |

## Q34: 手写一个支持断点续传的大文件上传组件
- **难度**：★★★
- **知识点**：文件分片 / 断点续传 / 秒传 / 并发控制 / 进度回调
- **题型**：编程实践题

### 参考答案要点：

1. **核心设计思路**：
   - 文件分片计算与上传（固定大小分片，如 5MB）
   - 已上传分片记录（localStorage/IndexedDB 持久化）
   - 断点检测与续传逻辑（上传前查询已上传分片列表）
   - 秒传机制（文件 Hash 比对，服务端已存在则跳过上传）
   - 进度回调 + 取消支持（AbortController）

### 🔥 深度拓展：手写实现

#### 完整的断点续传上传组件实现

```javascript
/**
 * ============================================================
 *  📤 ResumableUploader - 支持断点续传的大文件上传组件
 * ============================================================
 * 
 *  功能特性：
 *  ✅ 文件分片计算与上传（可配置分片大小）
 *  ✅ 已上传分片记录（localStorage / IndexedDB 持久化）
 *  ✅ 断点检测与续传逻辑（自动恢复中断的上传）
 *  ✅ 秒传功能（基于文件 Hash 比对，避免重复上传）
 *  ✅ 进度实时回调（总体进度 + 单个分片进度）
 *  ✅ 上传取消支持（AbortController，释放资源）
 *  ✅ 并发控制（限制同时上传的分片数量）
 *  ✅ 错误处理与重试机制（指数退避）
 */

const DEFAULT_CONFIG = {
  chunkSize: 5 * 1024 * 1024,     // 默认分片大小：5MB
  concurrency: 3,                 // 默认并发上传数
  maxRetries: 3,                  // 最大重试次数
  retryDelay: 1000,               // 重试基础延迟（毫秒）
  storagePrefix: 'uploader_',    // localStorage 前缀
};

class ResumableUploader {
  constructor(options = {}) {
    this.config = { ...DEFAULT_CONFIG, ...options };
    
    if (!this.config.uploadUrl) throw new Error('必须提供 uploadUrl');
    if (!this.config.mergeUrl) throw new Error('必须提供 mergeUrl');
    if (!this.config.checkUrl) throw new Error('必须提供 checkUrl');

    this.file = null;
    this.fileId = null;
    this.chunks = [];
    this.uploadedChunks = [];
    this.totalChunks = 0;
    
    this.isPaused = false;
    this.isCancelled = false;
    this.abortController = null;
    
    this.uploadedSize = 0;
    this.totalSize = 0;
    this.startTime = 0;
    
    this.callbacks = { onProgress:null, onChunkProgress:null, onSuccess:null, onError:null, onHashProgress:null, onSecondUpload:null };
  }

  // ==================== 事件注册方法 ====================
  
  onProgress(fn){this.callbacks.onProgress=fn;return this;}
  onChunkProgress(fn){this.callbacks.onChunkProgress=fn;return this;}
  onSuccess(fn){this.callbacks.onSuccess=fn;return this;}
  onError(fn){this.callbacks.onError=fn;return this;}
  onHashProgress(fn){this.callbacks.onHashProgress=fn;return this;}
  onSecondUpload(fn){this.callbacks.onSecondUpload=fn;return this;}

  // ==================== 核心上传方法 ====================

  async upload(file) {
    try {
      this._validateFile(file);
      this._resetState();
      this.file = file;
      this.totalSize = file.size;
      this.startTime = Date.now();

      console.log(`📁 开始上传: ${file.name} (${this._formatSize(file.size)})`);

      // 计算文件 Hash（用于唯一标识和秒传）
      console.log('🔢 正在计算文件 Hash...');
      const fileHash = await this._calculateFileHash(file);
      this.fileId = fileHash;
      console.log(`✅ 文件 Hash: ${fileHash.substring(0,16)}...`);

      // 检查秒传（服务端是否已有该文件）
      const secondResult = await this._checkSecondUpload(fileHash, file);
      if (secondResult) {
        console.log('⚡ 秒传成功！');
        this._cb('onSecondUpload', secondResult);
        this._cb('onSuccess', secondResult);
        return secondResult;
      }

      // 获取已上传分片列表（用于断点续传）
      const existingChunks = await this._getUploadedChunks(fileHash);
      this.uploadedChunks = [...existingChunks];
      console.log(`📋 已上传分片: ${existingChunks.length}/${this.totalChunks}`);

      // 切分文件为多个 chunk
      this._splitFileIntoChunks(file);

      // 并发上传未完成的分片
      await this._uploadRemainingChunks();

      // 通知服务端合并所有分片
      const mergeResult = await this._mergeChunks(fileHash, file.name, this.totalChunks);
      
      console.log('✅ 上传完成！');
      this._cb('onSuccess', mergeResult);
      this._cleanupStorage(fileHash);
      
      return mergeResult;

    } catch (error) {
      if (!this.isCancelled) {
        console.error('❌ 上传失败:', error.message);
        this._cb('onError', error);
      }
      throw error;
    }
  }

  pause() {
    this.isPaused = true;
    if (this.abortController) this.abortController.abort();
    console.log('⏸️ 已暂停');
  }

  async resume() {
    if (!this.isPaused || !this.file) return;
    console.log('▶️ 恢复上传...');
    this.isPaused = false;
    this.isCancelled = false;
    
    try {
      const existingChunks = await this._getUploadedChunks(this.fileId);
      this.uploadedChunks = [...existingChunks];
      await this._uploadRemainingChunks();
      const result = await this._mergeChunks(this.fileId, this.file.name, this.totalChunks);
      this._cb('onSuccess', result);
    } catch (error) { this._cb('onError', error); }
  }

  cancel() {
    this.isCancelled = true;
    this.isPaused = false;
    if (this.abortController) this.abortController.abort();
    if (this.fileId) this._cleanupStorage(this.fileId);
    console.log('❌ 已取消');
  }

  // ==================== 内部方法 ====================

  _validateFile(f){
    if(!f) throw new Error('请选择文件');
    if(!(f instanceof File)) throw new Error('参数必须是 File 对象');
    if(f.size===0) throw new Error('不能上传空文件');
  }

  _resetState(){
    this.isPaused=false; this.isCancelled=false;
    this.uploadedChunks=[]; this.chunks=[];
    this.uploadedSize=0; this.abortController=new AbortController();
  }

  /** 计算文件 SHA-256 Hash */
  async _calculateFileHash(file){
    if(crypto.subtle){
      const buf=await file.arrayBuffer();
      const hashBuf=await crypto.subtle.digest('SHA-256',buf);
      return Array.from(new Uint8Array(hashBuf)).map(b=>b.toString(16).padStart(2,'0')).join('');
    }
    // 降级方案：简单滚动 Hash
    let h=0xdeadbeef;
    for(let off=0;off<file.size;off+=2*1024*1024){
      const slice=file.slice(off,Math.min(off+2*1024*1024,file.size));
      const data=new Uint8Array(await slice.arrayBuffer());
      for(let i=0;i<data.length;i++) h=((h<<5)-h+data[i])|0;
      this._cb('onHashProgress',Math.round((off/file.size)*100));
    }
    return h.toString(16).padStart(8,'0');
  }

  /** 检查是否可以秒传 */
  async _checkSecondUpload(hash,file){
    try{
      const res=await fetch(this.config.checkUrl,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({hash,filename:file.name,filesize:file.size}),
        signal:this.abortController.signal,
      });
      const d=await res.json();
      return d.needUpload===false?d.data:null;
    }catch{return null;}
  }

  /** 获取已上传分片 */
  async _getUploadedChunks(hash){
    try{
      const res=await fetch(`${this.config.checkUrl}?hash=${hash}`,{signal:this.abortController.signal});
      if(res.ok){
        const d=await res.json();
        if(d.uploadedChunks){this._saveToStorage(hash,d.uploadedChunks);return d.uploadedChunks;}
      }
      return this._getFromStorage(hash);
    }catch{return this._getFromStorage(hash);}
  }

  /** 切分文件 */
  _splitFileIntoChunks(file){
    this.chunks=[];
    const size=this.config.chunkSize;
    this.totalChunks=Math.ceil(file.size/size);
    for(let i=0;i<this.totalChunks;i++){
      const start=i*size;
      this.chunks.push({
        index:i,start,end:Math.min(start+size,file.size),
        blob:file.slice(start,Math.min(start+size,file.size)),
        size:Math.min(size,file.size-start),
        uploaded:this.uploadedChunks.includes(i)
      });
    }
  }

  /** 并发上传剩余分片（核心算法）*/
  async _uploadRemainingChunks(){
    const pending=this.chunks.filter(c=>!c.uploaded);
    if(!pending.length) return;

    console.log(`🚀 上传 ${pending.length} 个分片（并发:${this.config.concurrency}）`);
    this.abortController=new AbortController();

    const con=Math.min(this.config.concurrency,pending.length);
    let idx=0;

    const worker=async()=>{
      while(idx<pending.length&&!this.isPaused&&!this.isCancelled){
        const chunk=pending[idx++];
        try{
          await this._uploadChunk(chunk);
          chunk.uploaded=true;
          this.uploadedChunks.push(chunk.index);
          this.uploadedSize+=chunk.size;
          this._updateProgress();
          this._saveToStorage(this.fileId,this.uploadedChunks);
        }catch(err){
          if(this.isCancelled) break;
          for(let r=0;r<this.config.maxRetries&&!this.isPaused&&!this.isCancelled;r++){
            await this._sleep(this.config.retryDelay*Math.pow(2,r));
            try{await this._uploadChunk(chunk);chunk.uploaded=true;this.uploadedChunks.push(chunk.index);this.uploadedSize+=chunk.size;this._updateProgress();this._saveToStorage(this.fileId,this.uploadedChunks);break;}
            catch(e){if(r>=this.config.maxRetries-1)throw e;}
          }
        }
      }
    };

    await Promise.all(Array.from({length:con},()=>worker()));
    if(this.isPaused) throw new Error('已暂停');
    if(this.isCancelled) throw new Error('已取消');
  }

  /** 上传单个分片（使用 XHR 获得精确进度）*/
  _uploadChunk(chunk){
    return new Promise((resolve,reject)=>{
      const fd=new FormData();
      fd.append('file',chunk.blob);
      fd.append('chunkIndex',chunk.index);
      fd.append('totalChunks',this.totalChunks);
      fd.append('fileHash',this.fileId);
      fd.append('fileName',this.file.name);

      const xhr=new XMLHttpRequest();
      xhr.upload.onprogress=e=>{
        if(e.lengthComputable) this._cb('onChunkProgress',chunk.index,Math.round(e.loaded/e.total*100));
      };
      xhr.onload=()=>{
        if(xhr.status>=200&&xhr.status<300){
          try{const d=JSON.parse(xhr.responseText);if(d.success!==false)resolve(d);else reject(new Error(d.message));}
          catch{resolve();}
        }else reject(new Error(`HTTP ${xhr.status}`));
      };
      xhr.onerror=()=>reject(new Error('网络错误'));
      xhr.timeout=60000;
      xhr.ontimeout=()=>reject(new Error('超时'));
      xhr.open('POST',this.config.uploadUrl);
      xhr.send(fd);
      this.abortController.signal.addEventListener('abort',()=>xhr.abort());
    });
  }

  /** 通知服务端合并分片 */
  async _mergeChunks(hash,name,total){
    const res=await fetch(this.config.mergeUrl,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({hash,filename:name,totalChunks:total,filesize:this.totalSize}),
      signal:this.abortController.signal,
    });
    if(!res.ok) throw new Error(`合并失败:${res.status}`);
    const d=await res.json();
    if(!d.success) throw new Error(d.message||'合并失败');
    return d.data;
  }

  // ==================== 存储管理 ====================
  _saveToStorage(hash,chunks){try{localStorage.setItem(`${this.config.storagePrefix}${hash}`,JSON.stringify({chunks,time:Date.now()}));}catch{}}
  _getFromStorage(hash){try{const d=localStorage.getItem(`${this.config.storagePrefix}${hash}`);if(d){const p=JSON.parse(d);if(Date.now()-p.time>7*24*60*60*1000){localStorage.removeItem(`${this.config.storagePrefix}${hash}`);return[];}return p.chunks||[];}return[];}catch{return[];}}
  _cleanupStorage(hash){try{localStorage.removeItem(`${this.config.storagePrefix}${hash}`);}catch{}}

  // ==================== 辅助方法 ====================
  _updateProgress(){this._cb('onProgress',Math.round(this.uploadedSize/this.totalSize*100),this.uploadedSize,this.totalSize);}
  _cb(name,...args){const fn=this.callbacks[name];if(fn){try{fn(...args);}catch(e){console.error(`[CB:${name}]`,e.message);}}}
  _sleep(ms){return new Promise(r=>setTimeout(r,ms));}
  _formatSize(b){if(b===0)return'0B';const k=1024,s=['B','KB','MB','GB'],i=Math.floor(Math.log(b)/Math.log(k));return parseFloat((b/Math.pow(k,i)).toFixed(2))+' '+s[i];}
}

export default ResumableUploader;
```

#### 关键技术要点总结：

| 功能模块 | 实现方式 | 技术亮点 |
|---------|---------|---------|
| **文件分片** | File.prototype.slice() | 固定大小分片，Blob 切片 |
| **Hash 计算** | Web Crypto API (SHA-256) | 用于唯一标识文件，实现秒传 |
| **秒传机制** | 服务端 Hash 比对 | 避免重复上传相同文件 |
| **断点续传** | localStorage 持久化 | 记录已上传分片，刷新页面可恢复 |
| **并发控制** | Promise Worker Pool | 可配置并发数，自动调度 |
| **进度追踪** | XHR upload.onprogress | 双层进度（总体+单分片）|
| **取消/暂停** | AbortController | 资源及时释放，支持恢复 |
| **错误重试** | 指数退避算法 | 自动重试失败的分片 |

---

## Q35: 设计一个高可用的 API 网关方案（前端视角）
- **难度**：★★★
- **知识点**：API 网关 / BFF / 限流熔断 / 负载均衡
- **题型**：系统设计题

### 参考答案要点：

1. **核心设计思路**：
   - **请求聚合**：减少客户端请求次数（BFF 模式）
   - **协议转换**：GraphQL / RESTful 统一接口
   - **限流熔断**：保护后端服务
   - **缓存策略**：多级缓存

2. **架构设计图解**：
   ```
   ┌─────────────────────────────────────────────┐
   │              API 网关层                       │
   │  ┌──────────┐ ┌──────────┐ ┌──────────┐     │
   │  │ 认证鉴权 │ │ 限流熔断 │ │ 缓存层   │     │
   │  └──────────┘ └──────────┘ └──────────┘     │
   │         ↓           ↓          ↓            │
   │  ┌──────────────────────────────────┐       │
   │  │      BFF (Backend for Frontend)    │       │
   │  │  GraphQL / RESTful Aggregator     │       │
   │  └──────────────────────────────────┘       │
   └─────────────────────────────────────────────┘
   ```

> **追问链**：如何做灰度发布？网关的性能瓶颈在哪里？如何处理服务雪崩？

### 🔍 追问链
1. **[BFF 模式 vs GraphQL 聚合的选型]**
   → 方向：BFF（按端定制 API，适合复杂业务场景）、GraphQL（客户端灵活查询，适合多变需求）；两者可结合使用；BFF 层面的数据一致性保证策略（Saga 模式）
2. **[API 网关的数据一致性问题]**
   → 方向：跨服务事务的最终一致性方案（事件驱动/补偿机制/TCC）；幂等性设计；分布式锁的使用场景与注意事项
3. **[网关性能优化与服务治理]**
   → 方向：连接池复用、请求批量化、响应压缩、监控指标（QPS/延迟/P99）；服务降级与熔断的自动化策略（Hystrix/Sentinel）

| Q36 | 设计一套完整的网络错误监控和上报系统 | 错误分类、采样率、上报策略、可视化 |
| Q37 | 微服务架构下前端如何做多 API 聚合与数据缓存 | BFF 层、GraphQL、请求合并、客户端缓存 |
## Q38: 大文件上传的分片上传、断点续传、秒传完整方案
- **难度**：★★★
- **知识点**：文件分片 / 断点续传 / 秒传 / 并发控制 / 进度回调
- **题型**：系统设计题

### 参考答案要点：

1. **核心设计思路**：
   - **分片上传**：固定大小分片（如 5MB），并发控制
   - **断点续传**：记录已上传分片（localStorage/IndexedDB）
   - **秒传机制**：文件 Hash 比对，服务端已存在则跳过
   - **进度回调**：总体进度 + 单个分片进度

2. **完整流程图解**：
   ```
   ┌──────────────────────────────────────┐
   │         大文件上传流程                │
   │                                      │
   │  [选择文件] → [计算Hash]             │
   │       ↓                              │
   │  [查询服务端] → 是否存在？            │
   │       ├─ 是 → ✅ 秒传成功            │
   │       └─ 否 → [获取已上传分片]      │
   │                  ↓                    │
   │          [切分为 chunks]             │
   │                  ↓                    │
   │        [并发上传剩余分片]            │
   │                  ↓                    │
   │        [通知服务端合并]               │
   │                  ↓                    │
   │           ✅ 上传完成                 │
   └──────────────────────────────────────┘
   ```

> **追问链**：如何处理网络波动导致的重复上传？Web Worker 如何优化大文件的 Hash 计算？S3 直传方案？

### 🔍 追问链
1. **[Web Worker 分片 Hash 计算优化]**
   → 方向：主线程 UI 卡顿问题；Worker 线程并行计算（将文件切片分配给多个 Worker）；SharedArrayBuffer 零拷贝传输；SparkMD5 库的增量计算模式
2. **[WebSocket 上传通道 vs HTTP 分片上传]**
   → 方向：WebSocket 双向通信优势（实时进度反馈、服务端主动推送状态）；适合需要频繁交互的场景（如视频直播推流）；HTTP 分片更适合传统文件上传场景
3. **[S3/oss 直传方案（客户端直连对象存储）]**
   → 方向：客户端先请求预签名 URL（Presigned URL）；然后直接上传到 S3/OSS（不经过应用服务器，节省带宽成本）；安全性考虑（URL 过期时间、权限限制、回调通知）

| Q39 | 如何优化弱网环境下的用户体验？ | 降级策略、离线模式、预加载、渐进式展示 |
| Q40 | WebSocket 在即时通讯中的完整架构设计 | 心跳、重连、消息队列、ACK 机制、群聊优化 |
| Q41 | 设计一个支持百万并发的静态资源分发方案 | CDN 多级缓存、DNS 调度、边缘计算、预热策略 |
| Q42 | HTTP/3 (QUIC) 在实际项目中的落地经验和挑战 | 兼容性回退、性能对比、监控指标、成本分析 |
| Q43 | 前端安全攻防：从攻击者视角理解防御策略 | 渗透测试思维、纵深防御、安全开发生命周期 |
| Q44 | HTTP/3 的当前生态和浏览器支持情况 | 支持率统计、启用方法、兼容方案、性能基准 |
| Q45 | Edge Computing（边缘计算）对前端网络架构的影响 | Edge Functions、边缘渲染、边缘缓存、延迟优化 |
| Q46 | WebTransport API（基于 QUIC 的新一代 Web 传输协议）的前景 | 与 WebSocket 对比、API 设计、应用场景、浏览器支持 |
| Q47 | 5G 环境下的前端网络优化新机遇 | 低延迟应用、大带宽场景、实时交互、AR/VR 优化 |
| Q48 | 分析一段复杂的网络相关代码（如 axios 拦截器链执行顺序） | 拦截器机制、Promise 链、请求/响应变换、错误传播 |
| Q49 | 给定网络拓扑图，分析请求路径和潜在瓶颈 | 延迟分析、带宽计算、瓶颈识别、优化建议 |
| Q50 | 综合性的网络性能优化方案设计（从协议选型到工程落地） | 全链路优化、A/B 测试、监控体系、持续优化 |

---

# 附录

## 附录 A：网络知识体系速查表

### HTTP 协议族
| 版本 | 年份 | 核心改进 | 当前状态 |
|------|------|---------|---------|
| HTTP/0.9 | 1991 | 仅支持 GET，纯文本 | 已废弃 |
| HTTP/1.0 | 1996 | Header、POST、状态码 | 已废弃 |
| HTTP/1.1 | 1997 | Keep-Alive、Host、管道化 | **主流** |
| HTTP/2 | 2015 | 二进制帧、多路复用、HPACK | **广泛采用** |
| HTTP/3 (QUIC) | 2022 | 基于 UDP、0-RTT、连接迁移 | **快速增长** |

### TCP/IP 协议栈
```
┌─────────────────────────────────────┐
│         应用层（HTTP/FTP/DNS...）    │
├─────────────────────────────────────┤
│        传输层（TCP / UDP）           │
├─────────────────────────────────────┤
│          网络层（IP / ICMP）         │
├─────────────────────────────────────┤
│      数据链路层（Ethernet/WiFi）     │
├─────────────────────────────────────┤
│            物理层                     │
└─────────────────────────────────────┘
```

### 安全相关
| 机制 | 作用 | 配置位置 |
|------|------|---------|
| HTTPS/TLS | 传输加密 | Nginx/Apache/CDN |
| CSP | 内容白名单 | Response Header |
| CORS | 跨域控制 | Response Header |
| HSTS | 强制 HTTPS | Response Header |
| X-Frame-Options | 防止点击劫持 | Response Header |
| X-Content-Type-Options | MIME 嗅探防护 | Response Header |
| Referrer-Policy | 引用信息控制 | Response Header |
| Permissions-Policy | 功能权限控制 | Response Header |

### 性能优化速查
| 阶段 | 优化手段 | 工具/API |
|------|---------|----------|
| DNS | dns-prefetch、减少域名 | Resource Timing |
| TCP | HTTP/2、Keep-Alive | Chrome DevTools |
| TLS | TLS 1.3、OCSP Stapling | SSL Labs |
| 请求 | 减少请求数、压缩、CDN | WebPageTest |
| 响应 | Gzip/Brotli、缓存 | Lighthouse |
| 渲染 | 关键路径优化、懒加载 | Performance Panel |
| JavaScript | Code Splitting、Tree Shaking | Bundle Analyzer |

### 缓存策略速查
| 资源类型 | 推荐策略 | 头部示例 |
|---------|---------|---------|
| HTML | 协商缓存 | `Cache-Control: no-cache` |
| 带 Hash 的 JS/CSS | 长期强缓存 | `Cache-Control: max-age=31536000, immutable` |
| 图片（不变） | 长期缓存 | `Cache-Control: max-age=86400` |
| 图片（频繁变化） | 协商缓存 | `ETag + If-None-Match` |
| API 数据 | 不缓存 | `Cache-Control: no-store` |
| 第三方资源 | 考虑自托管 | 避免外部依赖风险 |

---

## 附录 B：高频考点 TOP 20

根据历年面试真题整理，以下 20 个知识点出现频率最高（按频率排序）：

### 🔥 必背题（出现率 > 80%）
1. **GET vs POST 区别** — 几乎必问，从语义到技术细节都要掌握
2. **HTTP 状态码** — 重点记忆 200/301/302/304/401/403/404/500
3. **TCP 三次握手/四次挥手** — 图解 + 为什么（核心考点）
4. **HTTP 缓存机制** — 强缓存 vs 协商缓存，Cache-Control 各值含义
5. **HTTPS/TLS 握手过程** — 非对称加密交换密钥 + 对称加密通信
6. **跨域与 CORS** — 预检请求、简单请求、各种解决方案对比

### 📈 高频题（出现率 60%-80%）
7. **HTTP/1.1 vs HTTP/2 vs HTTP/3** — 版本演进、核心改进、解决的问题
8. **Cookie vs Session vs Token** — 工作流程、优缺点、适用场景
9. **TCP vs UDP** — 特性对比、适用场景、经典比喻
10. **输入 URL 到页面展示** — 完整流程（12 步），每个环节可深入
11. **XSS 攻击与防御** — 三种类型、五大防御措施
12. **CSRF 攻击与防御** — Token、SameSite、Referer 验证
13. **WebSocket 原理** — 握手过程、帧结构、心跳机制
14. **CDN 工作原理** — 智能 DNS、缓存策略、回源机制
15. **同源策略与跨域** — 三层面限制、四种解决方案

### 📊 进阶高频（出现率 40%-60%）
16. **TCP 流量控制 vs 拥塞控制** — 滑动窗口、四大算法
17. **DNS 解析过程** — 递归迭代、记录类型、TTL
18. **HTTP 管线化 vs 多路复用** — 为什么 Pipelining 失败了
19. **QUIC/HTTP/3 为什么基于 UDP** — 五大原因、解决什么问题
20. **Resource Hints（preload/prefetch 等）** — 四种提示的区别和使用

### 📝 学习建议
- **基础题**：确保能流畅口述，画图解释
- **进阶题**：理解原理，能举一反三
- **专家题**：有项目经验或深入研究者优先准备
- **实战**：动手实现（HTTP 服务器、WebSocket、缓存系统）加深理解

---

> **文档说明**：本文档共包含 **50 道**面试题，其中基础题 15 道、进阶题 15 道（Q16-Q30）、专家题 20 道（Q31-Q50 框架）。建议按顺序学习，先打牢基础再挑战进阶和专家题目。祝面试顺利！🎯