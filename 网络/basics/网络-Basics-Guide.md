# 网络基础知识指南（Network Basics Guide）

> **适用人群**：初中级前端开发者 | **阅读时间**：约 8-12 小时 | **更新日期**：2026-06-16

---

## 目录

- [第1章 计算机网络概述](#第1章-计算机网络概述)
- [第2章 HTTP 协议基础](#第2章-http-协议基础)
- [第3章 HTTPS 与 TLS](#第3章-https-与-tls)
- [第4章 HTTP/2 协议](#第4章-http2-协议)
- [第5章 HTTP/3 与 QUIC](#第5章-http3-与-quic)
- [第6章 TCP 协议深入](#第6章-tcp-协议深入)
- [第7章 UDP 协议](#第7章-udp-协议)
- [第8章 DNS 域名系统](#第8章-dns-域名系统)
- [第9章 CDN 内容分发网络](#第9章-cdn-内容分发网络)
- [第10章 WebSocket 协议](#第10章-websocket-协议)
- [第11章 浏览器网络 API 详解](#第11章-浏览器网络-api-详解)
- [第12章 跨域与同源策略深度解析](#第12章-跨域与同源策略深度解析)
- [第13章 网络性能优化实战](#第13章-网络性能优化实战)
- [第14章 网络安全专题](#第14章-网络安全专题)
- [附录A：网络知识速查表](#附录a网络知识速查表)
- [附录B：综合实战案例 - 网络层封装 SDK](#附录b综合实战案例---网络层封装-sdk)

---

## 第1章 计算机网络概述

### 📚 本章学习目标

- 理解 **OSI 七层模型**（Open Systems Interconnection Model）与 **TCP/IP 四层模型**的对应关系
- 掌握**数据封装**（Encapsulation）与**解封**（Decapsulation）的完整过程
- 明确前端开发者为什么必须掌握网络知识
- 了解网络知识在前端工程中的实际应用场景

---

### 1.1 什么是计算机网络

**计算机网络**（Computer Network）是指将地理位置不同的具有独立功能的多台计算机及其外部设备，通过通信线路连接起来，在网络操作系统、网络管理软件及网络通信协议的管理和协调下，实现资源共享和信息传递的计算机系统。

简单来说，计算机网络就是让多台计算机能够"说话"并共享资源的系统。对于前端开发者而言，我们每天都在使用网络——从页面加载、API 调用到实时通信，无一不依赖网络协议的支持。

#### 1.1.1 计算机网络的分类

```javascript
/**
 * 计算机网络按覆盖范围分类
 * 前端开发者主要关注的是局域网和广域网
 */
const networkTypes = {
  // 个人区域网：覆盖范围约10米，如蓝牙设备
  PAN: {
    fullName: 'Personal Area Network',    // 个人区域网
    range: '~10米',                        // 覆盖范围
    example: '蓝牙耳机、智能手表'          // 典型应用
  },
  
  // 局域网：覆盖范围较小，如公司内部网络
  LAN: {
    fullName: 'Local Area Network',        // 局域网
    range: '几公里内',                      // 覆盖范围
    example: '办公室WiFi、家庭路由器'      // 典型应用
  },
  
  // 城域网：覆盖一个城市范围
  MAN: {
    fullName: 'Metropolitan Area Network', // 城域网
    range: '5-50公里',                     // 覆盖范围
    example: '有线电视网络、城市宽带'      // 典型应用
  },
  
  // 广域网：覆盖范围最大，可跨越国家和大陆
  WAN: {
    fullName: 'Wide Area Network',         // 广域网
    range: '数百到数万公里',                // 覆盖范围
    example: '互联网(Internet)'            // 典型应用
  }
};
```

#### 1.1.2 网络拓扑结构

网络拓扑描述了网络中各节点的连接方式，常见的有：

| 拓扑类型 | 特点 | 适用场景 |
|---------|------|---------|
| **总线型** (Bus) | 所有节点共享一条传输线 | 早期以太网 |
| **星型** (Star) | 所有节点连接到中心节点 | 现代局域网（交换机） |
| **环型** (Ring) | 节点首尾相连成环 | 令牌环网（已淘汰） |
| **网状型** (Mesh) | 节点间有多条路径 | 互联网骨干网 |

---

### 1.2 OSI 七层模型详解

**OSI 参考模型**（Open Systems Interconnection Reference Model）是国际标准化组织（ISO）在1984年提出的网络体系结构标准模型。它将网络通信过程抽象为七个层次，每层都有明确的功能定义。

```mermaid
graph TB
    subgraph "OSI 七层模型"
        L7["<b>第7层：应用层</b><br/>Application Layer<br/>为应用程序提供网络服务<br/>例：HTTP, FTP, SMTP"]
        L6["<b>第6层：表示层</b><br/>Presentation Layer<br/>数据格式转换/加密解密<br/>例：SSL/TLS, JPEG, ASCII"]
        L5["<b>第5层：会话层</b><br/>Session Layer<br/>建立/管理/终止会话<br/>例：RPC, NetBIOS"]
        L4["<b>第4层：传输层</b><br/>Transport Layer<br/>端到端可靠传输<br/>例：TCP, UDP"]
        L3["<b>第3层：网络层</b><br/>Network Layer<br/>路由选择与IP寻址<br/>例：IP, ICMP, OSPF"]
        L2["<b>第2层：数据链路层</b><br/>Data Link Layer<br/>帧传输与MAC地址<br/>例：Ethernet, PPP"]
        L1["<b>第1层：物理层</b><br/>Physical Layer<br/>比特流传输<br/>例：光纤, 网线, 电波"]
    end
    
    L7 --> L6 --> L5 --> L4 --> L3 --> L2 --> L1
    
    style L7 fill:#e1f5fe
    style L6 fill:#e8f5e9
    style L5 fill:#fff3e0
    style L4 fill:#fce4ec
    style L3 fill:#f3e5f5
    style L2 fill:#ede7f6
    style L1 fill:#efebe9
```

#### 1.2.1 各层详细说明

##### 第7层：应用层（Application Layer）

应用层是用户直接交互的层次，它为应用程序提供网络服务接口。

```javascript
/**
 * 应用层常见协议及其用途
 * 前端开发者最常接触的就是这一层的协议
 */
const applicationProtocols = {
  // 超文本传输协议 - 前端最核心的协议
  HTTP: {
    port: 80,
    description: '超文本传输协议，用于Web页面和数据传输',
    frontendRelevance: '★★★★★'  // 前端核心协议
  },
  
  // 安全的超文本传输协议
  HTTPS: {
    port: 443,
    description: 'HTTP + TLS加密，安全的Web通信',
    frontendRelevance: '★★★★★'
  },
  
  // 文件传输协议
  FTP: {
    port: 20, 21,
    description: '文件上传下载',
    frontendRelevance: '★★★☆☆'
  },
  
  // 简单邮件传输协议
  SMTP: {
    port: 25,
    description: '发送电子邮件',
    frontendRelevance: '★★☆☆☆'
  },
  
  // 邮件接收协议
  POP3: {
    port: 110,
    description: '接收电子邮件',
    frontendRelevance: '★☆☆☆☆'
  },
  
  // 域名系统
  DNS: {
    port: 53,
    description: '域名解析为IP地址',
    frontendRelevance: '★★★★☆'
  },
  
  // 远程登录协议
  SSH: {
    port: 22,
    description: '安全远程登录',
    frontendRelevance: '★★☆☆☆'
  }
};

// 前端开发者的日常工作中，90%以上的网络操作都在应用层完成
console.log('前端核心协议:', Object.keys(applicationProtocols)
  .filter(key => applicationProtocols[key].frontendRelevance.includes('★★★★'))
);
```

##### 第6层：表示层（Presentation Layer）

表示层负责数据的格式化、加密和解密。

**主要功能：**
- **数据格式转换**：不同系统之间的编码转换（如ASCII、Unicode、UTF-8）
- **数据压缩与解压缩**：减少传输数据量
- **数据加密与解密**：确保数据安全性

**前端相关示例：**
```javascript
/**
 * 表示层在前端的体现
 * 数据序列化和反序列化是前端常见的表示层操作
 */

// JSON 序列化 - 将JavaScript对象转换为可传输的字符串格式
const userData = { name: '张三', age: 25, skills: ['JavaScript', 'React'] };
const jsonString = JSON.stringify(userData);  // 序列化
console.log('序列化结果:', jsonString);
// 输出: {"name":"张三","age":25,"skills":["JavaScript","React"]}

// JSON 反序列化 - 将字符串还原为JavaScript对象
const parsedData = JSON.parse(jsonString);     // 反序列化
console.log('反序列化结果:', parsedData);

/**
 * 数据压缩示例
 * 在前端，我们经常需要对数据进行压缩以减少网络传输量
 */
async function compressData(data) {
  // Step 1: 将数据转换为JSON字符串
  const jsonString = JSON.stringify(data);
  
  // Step 2: 创建压缩流（使用Compression Streams API）
  const blob = new Blob([jsonString], { type: 'application/json' });
  const compressionStream = new CompressionStream('gzip');
  
  // Step 3: 通过压缩流处理数据
  const compressedBlob = await blob.stream()
    .pipeThrough(compressionStream)
    .collect ? blob.stream().pipeThrough(compressionStream) : 
      new Response(blob.stream().pipeThrough(compressionStream)).blob();
  
  return compressedBlob;
}
```

##### 第5层：会话层（Session Layer）

会话层负责建立、管理和终止应用程序之间的会话。

**主要功能：**
- **会话建立**：在通信双方之间建立逻辑连接
- **会话管理**：维护会话状态，处理同步点
- **会话终止**：正常或异常地结束会话

**前端相关示例：**
```javascript
/**
 * 会话管理在前端的体现
 * Cookie和Session机制本质上是会话层的实现
 */
class SessionManager {
  constructor() {
    this.sessionId = null;           // 会话ID
    this.createdAt = null;           // 会话创建时间
    this.lastActivity = null;        // 最后活动时间
    this.sessionTimeout = 30 * 60 * 1000;  // 30分钟超时
  }

  /**
   * 创建新会话
   * @returns {string} 会话ID
   */
  createSession() {
    // Step 1: 生成唯一的会话ID
    this.sessionId = this.generateUniqueId();
    
    // Step 2: 记录会话创建时间和最后活动时间
    this.createdAt = Date.now();
    this.lastActivity = Date.now();
    
    // Step 3: 将会话信息存储到Cookie中
    document.cookie = `sessionId=${this.sessionId}; path=/; max-age=${this.sessionTimeout / 1000}`;
    
    console.log(`会话已创建: ${this.sessionId}`);
    return this.sessionId;
  }

  /**
   * 更新会话活动时间
   */
  updateActivity() {
    if (!this.sessionId) return;
    
    // 更新最后活动时间
    this.lastActivity = Date.now();
    
    // 延长Cookie有效期
    document.cookie = `sessionId=${this.sessionId}; path=/; max-age=${this.sessionTimeout / 1000}`;
  }

  /**
   * 检查会话是否有效
   * @returns {boolean} 会话是否有效
   */
  isSessionValid() {
    if (!this.sessionId || !this.lastActivity) return false;
    
    // 检查是否超过超时时间
    const elapsed = Date.now() - this.lastActivity;
    return elapsed < this.sessionTimeout;
  }

  /**
   * 销毁会话
   */
  destroySession() {
    // 清除会话ID
    this.sessionId = null;
    this.createdAt = null;
    this.lastActivity = null;
    
    // 删除Cookie
    document.cookie = 'sessionId=; path=/; max-age=0';
    console.log('会话已销毁');
  }

  /**
   * 生成唯一ID
   * @returns {string} 唯一标识符
   */
  generateUniqueId() {
    return 'session_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// 使用示例
const sessionManager = new SessionManager();
sessionManager.createSession();  // 创建会话
```

##### 第4层：传输层（Transport Layer）

传输层负责端到端的可靠数据传输，是前端开发者必须重点理解的层次之一。

**核心概念：**
- **端口（Port）**：用于区分同一主机上的不同应用程序
- **TCP（Transmission Control Protocol）**：面向连接的、可靠的传输协议
- **UDP（User Datagram Protocol）**：无连接的、不可靠的传输协议

```javascript
/**
 * 常见端口号速查表
 * 前端开发者应该熟记这些常用端口
 */
const wellKnownPorts = {
  // Web服务器端口
  HTTP: 80,       // 明文HTTP
  HTTPS: 443,     // 加密HTTPS
  
  // 数据库端口（后端常用）
  MySQL: 3306,    // MySQL数据库
  PostgreSQL: 5432,  // PostgreSQL数据库
  MongoDB: 27017,  // MongoDB数据库
  Redis: 6379,    // Redis缓存
  
  // 开发工具端口
  Vite: 5173,     // Vite开发服务器默认端口
  WebpackDevServer: 8080,  // webpack-dev-server默认端口
  ReactDevTools: 3000,  // React开发服务器常见端口
  
  // 其他常用服务
  SSH: 22,        // 安全Shell
  FTP_DATA: 20,   // FTP数据传输
  FTP_CONTROL: 21,  // FTP控制连接
  DNS: 53,        // 域名解析
  SMTP: 25,       // 邮件发送
  POP3: 110,      // 邮件接收
  
  /**
   * 获取端口对应的服务名称
   * @param {number} port - 端口号
   * @returns {string|null} 服务名称
   */
  getServiceName(port) {
    for (const [name, p] of Object.entries(this)) {
      if (p === port && typeof p === 'number') return name;
    }
    return null;
  }
};

console.log('端口80对应的服务:', wellKnownPorts.getServiceName(80));  // HTTP
console.log('端口443对应的服务:', wellKnownPorts.getServiceName(443));  // HTTPS
```

##### 第3层：网络层（Network Layer）

网络层负责数据包的路由选择和转发，确保数据能够从源主机到达目标主机。

**核心协议：**
- **IP（Internet Protocol）**：互联网协议，负责地址分配和路由
- **ICMP（Internet Control Message Protocol）**：互联网控制报文协议，用于错误报告和网络诊断
- **ARP（Address Resolution Protocol）**：地址解析协议，将IP地址转换为MAC地址

**IP地址分类：**

```javascript
/**
 * IP地址分类与子网掩码
 * IPv4地址由32位二进制组成，通常用点分十进制表示
 */
const ipClasses = {
  A类: {
    range: '1.0.0.0 - 126.255.255.255',
    subnetMask: '255.0.0.0',        // 默认子网掩码
    networkBits: 8,                  // 网络位数量
    hostBits: 24,                    // 主机位数量
    maxHosts: 16777214,              // 最大主机数 (2^24 - 2)
    purpose: '大型网络'
  },
  B类: {
    range: '128.0.0.0 - 191.255.255.255',
    subnetMask: '255.255.0.0',
    networkBits: 16,
    hostBits: 16,
    maxHosts: 65534,
    purpose: '中型网络'
  },
  C类: {
    range: '192.0.0.0 - 223.255.255.255',
    subnetMask: '255.255.255.0',
    networkBits: 24,
    hostBits: 8,
    maxHosts: 254,
    purpose: '小型网络'
  },
  D类: {
    range: '224.0.0.0 - 239.255.255.255',
    purpose: '组播地址（Multicast）'
  },
  E类: {
    range: '240.0.0.0 - 255.255.255.255',
    purpose: '保留用于实验和研究'
  }
};

/**
 * 特殊IP地址
 * 前端开发者在localhost调试时会频繁使用
 */
const specialIPAddresses = {
  localhost: {
    address: '127.0.0.1',
    description: '本机回环地址，用于本地测试',
    ipv6Equivalent: '::1'
  },
  privateRange_A: {
    address: '10.0.0.0 - 10.255.255.255',
    description: '私有地址A类，常用于企业内网'
  },
  privateRange_B: {
    address: '172.16.0.0 - 172.31.255.255',
    description: '私有地址B类'
  },
  privateRange_C: {
    address: '192.168.0.0 - 192.168.255.255',
    description: '私有地址C类，家庭路由器常用'
  },
  broadcast: {
    address: '255.255.255.255',
    description: '广播地址，向所有主机发送数据'
  }
};

/**
 * IP地址验证函数
 * @param {string} ip - 待验证的IP地址字符串
 * @returns {boolean} 是否为有效的IPv4地址
 */
function isValidIPv4(ip) {
  // 使用正则表达式验证IPv4地址格式
  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = ip.match(ipv4Regex);
  
  if (!match) return false;
  
  // 检查每个部分是否在0-255范围内
  return match.slice(1, 5).every(part => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255;
  });
}

// 测试
console.log('192.168.1.1有效吗?', isValidIPv4('192.168.1.1'));  // true
console.log('256.1.1.1有效吗?', isValidIPv4('256.1.1.1'));      // false
console.log('127.0.0.1有效吗?', isValidIPv4('127.0.0.1'));      // true
```

##### 第2层：数据链路层（Data Link Layer）

数据链路层负责将网络层的数据包封装成**帧**（Frame），并在物理介质上可靠地传输。

**关键概念：**
- **MAC地址**（Media Access Control Address）：网卡硬件地址，全球唯一
- **帧**（Frame）：数据链路层的数据单元
- **交换机**（Switch）：工作在数据链路层的网络设备

```javascript
/**
 * MAC地址格式与验证
 * MAC地址是48位（6字节）的十六进制数，通常用冒号或连字符分隔
 */
const macAddressExample = '00:1A:2B:3C:4D:5E';  // 标准MAC地址格式

/**
 * MAC地址验证函数
 * @param {string} mac - 待验证的MAC地址
 * @returns {boolean} 是否为有效的MAC地址
 */
function isValidMAC(mac) {
  // 支持多种分隔符：冒号(:)、连字符(-)、无分隔符
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$|^([0-9A-Fa-f]{12})$/;
  return macRegex.test(mac);
}

// 测试MAC地址验证
console.log('00:1A:2B:3C:4D:5E有效吗?', isValidMAC('00:1A:2B:3C:4D:5E'));  // true
console.log('001A2B3C4D5E有效吗?', isValidMAC('001A2B3C4D5E'));              // true
console.log('00-1A-2B-3C-4D-5E有效吗?', isValidMAC('00-1A-2B-3C-4D-5E'));  // true

/**
 * ARP协议工作原理模拟
 * ARP用于将IP地址解析为MAC地址
 */
class ARPCache {
  constructor() {
    // ARP缓存表：存储IP到MAC的映射关系
    this.cache = new Map();
    // 缓存过期时间（单位：毫秒），通常ARP缓存项存活20秒到几分钟
    this.cacheTimeout = 60 * 1000;  // 60秒
  }

  /**
   * 查询或解析MAC地址
   * @param {string} ipAddress - 目标IP地址
   * @returns {Promise<string>} 对应的MAC地址
   */
  async resolve(ipAddress) {
    // Step 1: 先检查本地缓存
    const cachedEntry = this.cache.get(ipAddress);
    if (cachedEntry && Date.now() - cachedEntry.timestamp < this.cacheTimeout) {
      console.log(`[ARP Cache Hit] ${ipAddress} -> ${cachedEntry.mac}`);
      return cachedEntry.mac;
    }

    // Step 2: 缓存未命中，发送ARP请求广播
    console.log(`[ARP Request] 正在查询 ${ipAddress} 的MAC地址...`);
    
    // 模拟ARP请求过程（实际中这是通过广播实现的）
    const macAddress = await this.sendARPRequest(ipAddress);
    
    // Step 3: 将结果存入缓存
    this.cache.set(ipAddress, {
      mac: macAddress,
      timestamp: Date.now()
    });
    
    console.log(`[ARP Response] ${ipAddress} -> ${macAddress}`);
    return macAddress;
  }

  /**
   * 发送ARP请求（模拟）
   * @param {string} ipAddress - 目标IP
   * @returns {Promise<string>} MAC地址
   */
  sendARPRequest(ipAddress) {
    return new Promise((resolve) => {
      // 模拟网络延迟
      setTimeout(() => {
        // 根据IP生成一个模拟的MAC地址
        const parts = ipAddress.split('.');
        const mac = parts.map(part => 
          parseInt(part, 10).toString(16).padStart(2, '0').toUpperCase()
        ).join(':').padEnd(17, '0').replace(/(.{2})/g, '$1:').slice(0, -1);
        
        resolve(mac);
      }, 10);  // 模拟10ms延迟
    });
  }
}
```

##### 第1层：物理层（Physical Layer）

物理层是最底层，负责在物理介质上传输原始的**比特流**（Bit Stream）。

**主要功能：**
- 定义物理设备的电气特性（电压、时钟频率等）
- 定义物理接口的机械特性（接口形状、引脚定义等）
- 定义传输介质（光纤、双绞线、无线电波等）

**常见传输介质对比：**

| 介质类型 | 传输速度 | 传输距离 | 抗干扰性 | 成本 | 应用场景 |
|---------|---------|---------|---------|------|---------|
| 双绞线（UTP） | 10Mbps-10Gbps | 100m | 中 | 低 | 局域网 |
| 光纤（单模） | 100Gbps+ | 数十km | 高 | 高 | 骨干网 |
| 光纤（多模） | 10Gbps | 550m | 较高 | 中 | 数据中心 |
| 无线电波(WiFi) | 最高9.6Gbps(WiFi7) | 数百m | 低 | 中 | 移动设备 |

---

### 1.3 TCP/IP 四层模型

虽然 OSI 模型理论完善，但在实际应用中，**TCP/IP 模型**更为流行。它是互联网的实际协议栈，将 OSI 的七层简化为四层。

```mermaid
graph TB
    subgraph "OSI 七层模型"
        O7["<b>应用层</b><br/>Application"]
        O6["<b>表示层</b><br/>Presentation"]
        O5["<b>会话层</b><br/>Session"]
        O4["<b>传输层</b><br/>Transport"]
        O3["<b>网络层</b><br/>Network"]
        O2["<b>数据链路层</b><br/>Data Link"]
        O1["<b>物理层</b><br/>Physical"]
    end
    
    subgraph "TCP/IP 四层模型"
        T4["<b>应用层</b><br/>Application<br/><br/>HTTP, FTP, DNS, SSH"]
        T3["<b>传输层</b><br/>Transport<br/><br/>TCP, UDP"]
        T2["<b>网际层</b><br/>Internet<br/><br/>IP, ICMP, ARP"]
        T1["<b>网络接口层</b><br/>Link<br/><br/>Ethernet, WiFi"]
    end
    
    O7 -.->|"对应"| T4
    O6 -.->|"对应"| T4
    O5 -.->|"对应"| T4
    O4 -.->|"对应"| T3
    O3 -.->|"对应"| T2
    O2 -.->|"对应"| T1
    O1 -.->|"对应"| T1
    
    style O7 fill:#e3f2fd
    style O6 fill:#e3f2fd
    style O5 fill:#e3f2fd
    style O4 fill:#f3e5f5
    style O3 fill:#fff9c4
    style O2 fill:#ffebee
    style O1 fill:#ffebee
    
    style T4 fill:#bbdefb
    style T3 fill:#ce93d8
    style T2 fill:#ffd54f
    style T1 fill:#ef9a9a
```

#### 1.3.1 TCP/IP 各层详解

```javascript
/**
 * TCP/IP四层模型详细说明
 * 这是互联网的实际协议栈，前端开发者必须理解
 */
const tcpIpModel = {
  // ========== 第四层：应用层 ==========
  applicationLayer: {
    name: '应用层 (Application Layer)',
    osiLayers: ['应用层', '表示层', '会话层'],  // 对应OSI的上三层
    protocols: [
      { name: 'HTTP/HTTPS', desc: '超文本传输协议', importance: '★★★★★' },
      { name: 'FTP', desc: '文件传输协议', importance: '★★★☆☆' },
      { name: 'SMTP/POP3/IMAP', desc: '邮件协议', importance: '★★☆☆☆' },
      { name: 'DNS', desc: '域名系统', importance: '★★★★☆' },
      { name: 'SSH', desc: '安全Shell', importance: '★★★☆☆' },
      { name: 'WebSocket', desc: '全双工通信协议', importance: '★★★★★' }
    ],
    dataUnit: '消息 (Message)',
    example: `
      // 前端代码示例：应用层数据
      const requestData = {
        method: 'GET',
        url: '/api/users',
        headers: { 'Content-Type': 'application/json' },
        body: null
      };
    `
  },

  // ========== 第三层：传输层 ==========
  transportLayer: {
    name: '传输层 (Transport Layer)',
    osiLayer: '传输层',
    protocols: [
      { 
        name: 'TCP', 
        desc: '传输控制协议，可靠、面向连接',
        features: ['三次握手', '四次挥手', '流量控制', '拥塞控制'],
        useCases: ['HTTP', 'FTP', 'SMTP', 'SSH']
      },
      { 
        name: 'UDP', 
        desc: '用户数据报协议，不可靠、无连接',
        features: ['无连接', '快速', '支持广播/组播'],
        useCases: ['DNS', '视频通话', '在线游戏', 'QUIC']
      }
    ],
    dataUnit: '段 (Segment) 或 报文 (Datagram)',
    keyConcept: '端口号 (Port) - 区分不同应用程序'
  },

  // ========== 第二层：网际层 ==========
  internetLayer: {
    name: '网际层 (Internet Layer)',
    osiLayer: '网络层',
    protocols: [
      { name: 'IP', desc: '互联网协议，负责寻址和路由' },
      { name: 'ICMP', desc: '控制报文协议，用于ping和错误报告' },
      { name: 'ARP', desc: '地址解析协议，IP转MAC' },
      { name: 'RARP', desc: '反向地址解析协议，MAC转IP' }
    ],
    dataUnit: '数据包 (Packet)',
    keyConcept: 'IP地址 - 标识网络中的主机'
  },

  // ========== 第一层：网络接口层 ==========
  linkLayer: {
    name: '网络接口层 (Link Layer)',
    osiLayers: ['数据链路层', '物理层'],  // 对应OSI的下两层
    protocols: [
      { name: 'Ethernet', desc: '以太网，最常见的局域网技术' },
      { name: 'WiFi (802.11)', desc: '无线局域网' },
      { name: 'PPP', desc: '点对点协议，拨号上网' }
    ],
    dataUnit: '帧 (Frame)',
    keyConcept: 'MAC地址 - 网卡的物理地址'
  }
};
```

#### 1.3.2 五层参考模型（教学常用）

在实际教学中，为了兼顾 OSI 和 TCP/IP 的优点，常采用**五层参考模型**：

| 层数 | 名称 | 主要功能 | 数据单元 | 对应协议 |
|-----|------|---------|---------|---------|
| 5 | 应用层 | 为用户提供服务 | 报文 | HTTP, DNS, SMTP |
| 4 | 传输层 | 进程间端到端通信 | 报文段(TCP)/用户数据报(UDP) | TCP, UDP |
| 3 | 网络层 | 分组转发和路由选择 | 数据报/分组 | IP, ICMP, ARP |
| 2 | 数据链路层 | 结点间帧传输 | 帧 | Ethernet, PPP |
| 1 | 物理层 | 比特传输 | 比特 | RJ45, Fiber |

---

### 1.4 数据封装与解封过程

**数据封装**（Encapsulation）是指当数据从上层向下层传递时，每一层都会添加自己的头部信息（有时还有尾部）。这个过程就像寄信时不断加信封的过程。

**数据解封**（Decapsulation）则是相反的过程，接收方逐层去掉头部信息，最终将原始数据交给应用层。

```mermaid
sequenceDiagram
    participant App as 应用层<br/>(你的JS代码)
    participant Trans as 传输层<br/>(TCP/UDP)
    participant Net as 网络层<br/>(IP)
    participant Link as 数据链路层<br/>(Ethernet)
    participant Phy as 物理层<br/>(网线/光纤)
    participant Remote as 接收方

    Note over App: 用户数据: "Hello World!"
    
    App->>Trans: ① 下发数据
    Note right of Trans: 添加TCP头<br/>【TCP段】<br/>源端口: 12345<br/>目的端口: 80<br/>序号: 1
    
    Trans->>Net: ② 封装TCP段
    Note right of Net: 添加IP头<br/>【IP数据包】<br/>源IP: 192.168.1.100<br/>目的IP: 93.184.216.34
    
    Net->>Link: ③ 封装IP包
    Note right of Link: 添加帧头和帧尾<br/>【以太网帧】<br/>目的MAC: AA:BB:CC:DD:EE:FF<br/>源MAC: 00:11:22:33:44:55
    
    Link->>Phy: ④ 转换为比特流
    Note right of Phy: 01010101...<br/>电信号/光信号
    
    Phy->>Remote: ⑤ 通过物理介质传输
    
    Remote->>Remote: ⑥ 解封过程（反向）
    Note left of Remote: 去帧头→去IP头→去TCP头<br/>最终得到: "Hello World!"
```

#### 1.4.1 封装过程的代码模拟

```javascript
/**
 * 数据封装过程模拟
 * 这个例子展示了数据在各层如何被逐步封装
 */
class DataEncapsulationSimulator {
  constructor() {
    this.layers = [];
  }

  /**
   * 模拟应用层数据
   * 这是我们实际要传输的内容
   */
  createApplicationData() {
    return {
      type: 'HTTP Request',
      method: 'GET',
      url: '/api/user/profile',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer token123'
      },
      body: null,
      rawData: 'GET /api/user/profile HTTP/1.1\r\nHost: example.com\r\n\r\n'
    };
  }

  /**
   * 传输层封装 - 添加TCP头部
   * @param {Object} appData - 应用层数据
   * @returns {Object} TCP段
   */
  encapsulateTransport(appData) {
    console.log('\n=== 传输层封装 ===');
    
    const segment = {
      // TCP头部字段（简化版）
      header: {
        sourcePort: Math.floor(Math.random() * 65535),  // 随机源端口 (49152-65535)
        destinationPort: 443,                            // HTTPS端口
        sequenceNumber: Math.floor(Math.random() * 4294967295),  // 随机初始序号
        ackNumber: 0,                                    // 确认号（首次握手为0）
        dataOffset: 5,                                   // 数据偏移（5个32位字=20字节）
        flags: {
          SYN: true,                                     // 同步标志（首次握手）
          ACK: false,                                    // 确认标志
          FIN: false,                                    // 终止标志
          PSH: false,                                    // 推送标志
          URG: false                                     // 紧急标志
        },
        windowSize: 65535,                               // 窗口大小
        checksum: 0,                                     // 校验和（稍后计算）
        urgentPointer: 0                                 // 紧急指针
      },
      payload: appData.rawData                           // 承载的应用层数据
    };

    console.log('✅ 添加TCP头部:');
    console.log(`   源端口: ${segment.header.sourcePort}`);
    console.log(`   目的端口: ${segment.header.destinationPort}`);
    console.log(`   SYN标志: ${segment.header.flags.SYN}`);
    
    return segment;
  }

  /**
   * 网络层封装 - 添加IP头部
   * @param {Object} segment - TCP段
   * @returns {Object} IP数据包
   */
  encapsulateInternet(segment) {
    console.log('\n=== 网络层封装 ===');
    
    const packet = {
      // IP头部字段（简化版）
      header: {
        version: 4,                    // IPv4
        ihl: 5,                        // 头部长度（5个32位字=20字节）
        tos: 0,                        // 服务类型
        totalLength: 20 + segment.payload.length,  // 总长度
        identification: Math.floor(Math.random() * 65535),  // 标识
        flags: {
          dontFragment: false,         // 不分片标志
          moreFragments: false         // 更多分片标志
        },
        fragmentOffset: 0,             // 分片偏移
        ttl: 64,                       // 生存时间（跳数限制）
        protocol: 6,                   // 上层协议（6=TCP）
        headerChecksum: 0,             // 头部校验和
        sourceIP: '192.168.1.100',     // 源IP地址
        destinationIP: '93.184.216.34' // 目的IP地址（example.com）
      },
      payload: segment                 // 整个TCP段作为载荷
    };

    console.log('✅ 添加IP头部:');
    console.log(`   版本: IPv${packet.header.version}`);
    console.log(`   TTL: ${packet.header.ttl}跳`);
    console.log(`   源IP: ${packet.header.sourceIP}`);
    console.log(`   目的IP: ${packet.header.destinationIP}`);
    
    return packet;
  }

  /**
   * 数据链路层封装 - 添加以太网帧头和帧尾
   * @param {Object} packet - IP数据包
   * @returns {Object} 以太网帧
   */
  encapsulateLink(packet) {
    console.log('\n=== 数据链路层封装 ===');
    
    const frame = {
      // 以太网帧头部
      header: {
        destinationMAC: 'AA:BB:CC:DD:EE:FF',  // 目的MAC地址（网关或下一跳）
        sourceMAC: '00:11:22:33:44:55',       // 源MAC地址（本机网卡）
        etherType: 0x0800                       // 类型字段（0x0800=IPv4）
      },
      payload: packet,                          // 整个IP数据包作为载荷
      footer: {
        fcs: 'CRC校验值'                         // 帧检验序列
      }
    };

    console.log('✅ 添加以太网帧:');
    console.log(`   目的MAC: ${frame.header.destinationMAC}`);
    console.log(`   源MAC: ${frame.header.sourceMAC}`);
    console.log(`   类型: 0x${frame.header.etherType.toString(16)} (IPv4)`);
    
    return frame;
  }

  /**
   * 完整的封装流程演示
   */
  demonstrateFullProcess() {
    console.log('═══════════════════════════════════════');
    console.log('       数据封装完整流程演示');
    console.log('═══════════════════════════════════════\n');

    // Step 1: 创建应用层数据
    console.log('【Step 1】应用层数据准备');
    const appData = this.createApplicationData();
    console.log(`原始数据: "${appData.rawData.substring(0, 50)}..."`);

    // Step 2: 传输层封装
    const segment = this.encapsulateTransport(appData);

    // Step 3: 网络层封装
    const packet = this.encapsulateInternet(segment);

    // Step 4: 数据链路层封装
    const frame = this.encapsulateLink(packet);

    // Step 5: 物理层转换为比特流
    console.log('\n=== 物理层传输 ===');
    console.log('✅ 以太网帧转换为比特流...');
    console.log('✅ 通过网线/光纤传输...');

    console.log('\n═══════════════════════════════════════');
    console.log('       封装完成！数据已准备好发送');
    console.log('═══════════════════════════════════════');
    
    return frame;
  }
}

// 运行演示
const simulator = new DataEncapsulationSimulator();
simulator.demonstrateFullProcess();
```

#### 1.4.2 MTU 与数据分片

**MTU**（Maximum Transmission Unit，最大传输单元）是指网络能够传输的最大数据包大小。

```javascript
/**
 * MTU（最大传输单元）相关知识
 * 当数据超过MTU时需要进行分片
 */
const mtuKnowledge = {
  // 常见介质的MTU值
  commonMTUs: {
    'Ethernet (以太网)': 1500,      // 最常见，标准以太网帧大小
    'PPPoE': 1492,                   // 宽带拨号（减去PPP头8字节）
    'WiFi (802.11)': 2304,           // WiFi的MTU较大
    'Loopback (回环)': 65535,        // 本地回环接口
    'VPN/Tunnel': 通常更小,          // VPN隧道会额外封装，减少可用MTU
  },

  /**
   * 计算TCP最大分段大小（MSS）
   * MSS = MTU - IP头(20) - TCP头(20)
   * @param {number} mtu - MTU值
   * @returns {number} MSS值
   */
  calculateMSS(mtu) {
    const ipHeaderSize = 20;  // IPv4头部固定20字节
    const tcpHeaderSize = 20; // TCP头部固定20字节
    return mtu - ipHeaderSize - tcpHeaderSize;
  },

  /**
   * 判断数据是否需要分片
   * @param {number} dataSize - 数据大小
   * @param {number} mtu - MTU值
   * @returns {Object} 分片信息
   */
  checkFragmentation(dataSize, mtu = 1500) {
    const mss = this.calculateMSS(mtu);  // 计算MSS
    
    return {
      dataSize,
      mtu,
      mss,                               // 最大分段大小
      needsFragmentation: dataSize > mss, // 是否需要分片
      fragmentCount: Math.ceil(dataSize / mss),  // 分片数量
      lastFragmentSize: dataSize % mss || mss   // 最后一个分片的大小
    };
  }
};

// 示例：检查不同大小的数据是否需要分片
const testSizes = [100, 1460, 2000, 10000];
testSizes.forEach(size => {
  const result = mtuKnowledge.checkFragmentation(size);
  console.log(`\n数据大小: ${size} 字节`);
  console.log(`MTU: ${result.mtu}, MSS: ${result.mss}`);
  console.log(`需要分片: ${result.needsFragmentation ? '是 (' + result.fragmentCount + '个分片)' : '否'}`);
});
```

---

### 1.5 前端开发者为什么需要懂网络

很多前端初学者会有疑问："我是写页面的，为什么要学网络？"答案是：**现代前端开发已经深度依赖网络知识**。

#### 1.5.1 网络知识在前端工程中的实际应用场景

```javascript
/**
 * 场景1：API请求性能优化
 * 理解HTTP协议可以帮助我们优化API调用
 */
class OptimizedAPIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.cache = new Map();              // 响应缓存
    this.pendingRequests = new Map();    // 进行中的请求（防重复）
  }

  /**
   * 优化的GET请求方法
   * 利用HTTP缓存机制减少不必要的网络请求
   * @param {string} endpoint - API端点
   * @param {Object} options - 请求选项
   * @returns {Promise<any>} 响应数据
   */
  async get(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = url;

    // Step 1: 检查是否有相同请求正在进行（请求合并）
    if (this.pendingRequests.has(cacheKey)) {
      console.log('[合并请求] 发现重复请求，复用已有请求');
      return this.pendingRequests.get(cacheKey);
    }

    // Step 2: 检查缓存（利用强缓存策略）
    if (options.useCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      // 检查缓存是否过期
      if (Date.now() - cached.timestamp < options.cacheTime) {
        console.log('[缓存命中] 返回缓存数据');
        return cached.data;
      }
    }

    // Step 3: 发起网络请求
    const requestPromise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        // 设置缓存策略头
        'Cache-Control': options.noCache ? 'no-cache' : 'max-age=300'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // 存入缓存
      if (options.useCache) {
        this.cache.set(cacheKey, {
          data,
          timestamp: Date.now()
        });
      }
      
      // 清理pending状态
      this.pendingRequests.delete(cacheKey);
      return data;
    })
    .catch(error => {
      this.pendingRequests.delete(cacheKey);
      throw error;
    });

    // 记录进行中的请求
    this.pendingRequests.set(cacheKey, requestPromise);
    
    return requestPromise;
  }
}


/**
 * 场景2：大文件上传优化
 * 理解TCP和HTTP协议有助于实现断点续传
 */
class ResumableUploader {
  constructor(options = {}) {
    this.file = options.file;
    this.chunkSize = options.chunkSize || 5 * 1024 * 1024;  // 默认5MB分片
    this.uploadURL = options.uploadURL;
    this.onProgress = options.onProgress;  // 进度回调
  }

  /**
   * 分片上传实现
   * 利用HTTP Range请求实现断点续传
   */
  async upload() {
    const totalChunks = Math.ceil(this.file.size / this.chunkSize);
    let uploadedBytes = 0;

    console.log(`开始上传: ${this.file.name}`);
    console.log(`文件大小: ${(this.file.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`分片数量: ${totalChunks}`);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * this.chunkSize;
      const end = Math.min(start + this.chunkSize, this.file.size);
      const chunk = this.file.slice(start, end);

      try {
        // 使用FormData上传分片
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('chunkIndex', i);
        formData.append('totalChunks', totalChunks);
        formData.append('fileName', this.file.name);
        formData.append('fileHash', await this.calculateFileHash());

        const response = await fetch(this.uploadURL, {
          method: 'POST',
          body: formData,
          // 不设置Content-Type，让浏览器自动设置boundary
        });

        if (!response.ok) {
          throw new Error(`分片 ${i + 1}/${totalChunks} 上传失败`);
        }

        uploadedBytes += (end - start);
        
        // 回调进度
        if (this.onProgress) {
          this.onProgress({
            loaded: uploadedBytes,
            total: this.file.size,
            percentage: Math.round((uploadedBytes / this.file.size) * 100),
            currentChunk: i + 1,
            totalChunks: totalChunks
          });
        }

        // 小延迟，避免服务器压力过大
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error(`分片 ${i + 1} 上传失败:`, error);
        // 可以在这里实现重试逻辑
        throw error;
      }
    }

    console.log('上传完成！');
  }

  /**
   * 计算文件哈希值（用于唯一标识文件）
   * 使用Web Crypto API
   */
  async calculateFileHash() {
    const buffer = await this.file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}


/**
 * 场景3：实时通信应用
 * 理解WebSocket协议对于构建聊天、协同编辑等应用至关重要
 */
class RealtimeConnectionManager {
  constructor(url) {
    this.url = url;
    this.ws = null;               // WebSocket实例
    this.reconnectAttempts = 0;   // 重连尝试次数
    this.maxReconnectAttempts = 5; // 最大重连次数
    this.heartbeatInterval = null; // 心跳定时器
    this.listeners = new Map();   // 事件监听器
  }

  /**
   * 建立WebSocket连接
   */
  connect() {
    // Step 1: 检查是否已有连接
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('WebSocket已连接');
      return;
    }

    // Step 2: 创建新的WebSocket连接
    // wss:// 表示加密的WebSocket（类似https）
    this.ws = new WebSocket(this.url.replace('http', 'ws'));

    // Step 3: 监听连接打开事件
    this.ws.onopen = () => {
      console.log('✅ WebSocket连接已建立');
      this.reconnectAttempts = 0;  // 重置重连计数
      this.startHeartbeat();       // 启动心跳
      this.emit('connected');
    };

    // Step 4: 监听消息事件
    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        // 处理心跳响应
        if (message.type === 'pong') {
          console.log('收到心跳响应');
          return;
        }
        
        // 触发对应的事件监听器
        this.emit(message.type, message.data);
        
      } catch (error) {
        console.error('消息解析失败:', error);
      }
    };

    // Step 5: 监听关闭事件
    this.ws.onclose = () => {
      console.log('WebSocket连接已关闭');
      this.stopHeartbeat();
      this.emit('disconnected');
      
      // 自动重连
      this.attemptReconnect();
    };

    // Step 6: 监听错误事件
    this.ws.onerror = (error) => {
      console.error('WebSocket错误:', error);
      this.emit('error', error);
    };
  }

  /**
   * 发送消息
   * @param {string} type - 消息类型
   * @param {any} data - 消息数据
   */
  send(type, data) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket未连接，无法发送消息');
      return false;
    }

    const message = JSON.stringify({ type, data, timestamp: Date.now() });
    this.ws.send(message);
    return true;
  }

  /**
   * 启动心跳保活机制
   * 心跳用于检测连接是否仍然活跃
   */
  startHeartbeat() {
    // 每30秒发送一次心跳
    this.heartbeatInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.send('ping', {});
      }
    }, 30000);
  }

  /**
   * 停止心跳
   */
  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  /**
   * 尝试重新连接
   * 使用指数退避策略避免频繁重连
   */
  attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('达到最大重连次数，停止重连');
      this.emit('reconnectFailed');
      return;
    }

    this.reconnectAttempts++;
    // 指数退避：1s, 2s, 4s, 8s, 16s...
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts - 1), 30000);
    
    console.log(`${delay/1000}秒后尝试第${this.reconnectAttempts}次重连...`);
    
    setTimeout(() => {
      this.connect();
    }, delay);
  }

  /**
   * 注册事件监听器
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  /**
   * 触发事件
   */
  emit(event, data) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  /**
   * 关闭连接
   */
  disconnect() {
    this.stopHeartbeat();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
```

#### 1.5.2 网络知识帮助解决的前端问题

| 问题类别 | 具体问题 | 相关网络知识 | 解决方案方向 |
|---------|---------|-------------|-------------|
| **性能问题** | 页面加载慢 | HTTP缓存、CDN、TCP连接 | 配置缓存策略、使用CDN、连接复用 |
| **跨域问题** | API请求被阻止 | 同源策略、CORS | 配置CORS头、使用代理 |
| **安全问题** | XSS/CSRF攻击 | HTTPS、Cookie属性 | 启用安全头、SameSite Cookie |
| **实时通信** | 聊天消息延迟 | WebSocket、长轮询 | 使用WebSocket、SSE |
| **大文件** | 上传下载慢 | 分片上传、断点续传 | 实现分片上传、Range请求 |
| **离线体验** | 断网时白屏 | Service Worker | 实现离线缓存策略 |

---

### 1.6 本章要点速查

| 知识点 | 要点总结 | 前端关联度 |
|-------|---------|-----------|
| **OSI七层模型** | 应用→表示→会话→传输→网络→数据链路→物理 | ★★★★☆ |
| **TCP/IP四层模型** | 应用→传输→网际→网络接口（更实用） | ★★★★★ |
| **数据封装** | 每层添加头部，像套信封一样层层包装 | ★★★★☆ |
| **MTU** | 以太网MTU=1500字节，超出需分片 | ★★★☆☆ |
| **端口号** | 0-65535，HTTP=80，HTTPS=443 | ★★★★★ |
| **IP地址** | IPv4(32位)，IPv6(128位)，127.0.0.1是本机 | ★★★★☆ |
| **MAC地址** | 48位硬件地址，全局唯一 | ★★☆☆☆ |
| **学习理由** | 性能优化、问题排查、安全防护、架构设计 | ★★★★★ |

---

## 第2章 HTTP 协议基础

### 📚 本章学习目标

- 掌握 **HTTP/1.x** 的核心概念（请求方法、状态码、请求头、响应头）
- 理解 **HTTP 报文结构**（请求报文和响应报文的组成）
- 掌握 **URL**（统一资源定位符）的完整组成部分
- 深入理解 **Content-Type** 及各种 MIME 类型
- 理解 **HTTP 是无状态协议**的含义及其影响
- 掌握 **Cookie** 与 **Session** 的工作机制

---

### 2.1 HTTP 协议简介

**HTTP**（HyperText Transfer Protocol，超文本传输协议）是互联网上应用最为广泛的一种网络协议。它定义了客户端（通常是浏览器）和服务器之间通信的规则。

**HTTP 的特点：**
- 基于 **请求-响应** 模式（Request-Response Model）
- **无状态**（Stateless）：每次请求都是独立的
- **灵活**：可以传输任意类型的数据（通过 Content-Type 指定）
- **简单**：人类可读的文本格式

```javascript
/**
 * HTTP协议版本演进历史
 * 了解版本演进有助于理解各版本的特性
 */
const httpVersions = {
  // HTTP/0.9 (1991) - 最原始的版本
  '0.9': {
    year: 1991,
    features: ['仅支持GET方法', '仅支持HTML格式', '无请求头', '连接后立即关闭'],
    limitations: '过于简单，无法满足复杂需求'
  },

  // HTTP/1.0 (1996) - 第一个正式版本
  '1.0': {
    year: 1996,
    features: [
      '增加POST和HEAD方法',
      '引入请求头和响应头',
      '支持多种内容类型(MIME)',
      '引入状态码'
    ],
    limitation: '每次请求都需要新建TCP连接'
  },

  // HTTP/1.1 (1997) - 目前仍广泛使用的版本
  '1.1': {
    year: 1997,
    features: [
      '持久连接(Keep-Alive)',        // 默认启用
      '管道化(Pipelining)',           // 可同时发送多个请求
      '分块传输编码(Chunked)',        // 支持流式传输
      '更多请求方法(PUT, DELETE等)',   // 支持RESTful API
      'Host头(虚拟主机支持)'           // 一台服务器托管多个网站
    ],
    status: '目前仍在广泛使用'
  },

  // HTTP/2 (2015) - 性能大幅提升
  '2.0': {
    year: 2015,
    features: [
      '二进制分帧(Binary Framing)',    // 不再使用文本格式
      '多路复用(Multiplexing)',        // 解决队头阻塞
      '头部压缩(HPACK)',               // 减少头部开销
      '服务器推送(Server Push)'         // 主动推送资源
    ],
    status: '主流浏览器已全面支持'
  },

  // HTTP/3 (2022) - 基于QUIC的最新版本
  '3.0': {
    year: 2022,
    features: [
      '基于QUIC协议(UDP)',             // 不再基于TCP
      '0-RTT/1-RTT连接建立',           // 更快的握手
      '解决TCP层面的队头阻塞',         // 连接级多路复用
      '内置TLS加密'                     // 安全是标配
    ],
    status: '正在推广普及中'
  }
};

// 打印版本对比
console.log('HTTP协议版本演进:');
Object.entries(httpVersions).forEach(([version, info]) => {
  console.log(`\nHTTP/${version} (${info.year}):`);
  info.features?.forEach(f => console.log(`  ✅ ${f}`));
  if (info.limitations) console.log(`  ❌ ${info.limitations}`);
  if (info.status) console.log(`  ℹ️  ${info.status}`);
});
```

---

### 2.2 HTTP 请求方法详解

HTTP 定义了一组**请求方法**（Request Methods，也称为 HTTP 动词），用来表明对资源的操作意图。

#### 2.2.1 常用请求方法一览

```javascript
/**
 * HTTP请求方法完整指南
 * 每种方法都有其特定的语义和使用场景
 */
const httpMethods = {
  // ========== 最常用的四种方法 ==========
  
  GET: {
    idempotent: true,       // 幂等性：多次执行结果相同
    safe: true,             // 安全性：不修改服务器状态
    cacheable: true,        // 可缓存
    hasBody: false,         // 请求体
    description: '获取资源',
    usage: '查询数据、获取页面',
    example: 'GET /api/users/123',
    statusCode: '200 OK, 304 Not Modified, 404 Not Found',
    frontendUsage: `
      // 前端最常用的请求方法
      fetch('/api/users')
        .then(res => res.json())
        .then(data => console.log(data));
    `
  },

  POST: {
    idempotent: false,      // 非幂等：多次执行可能创建多条记录
    safe: false,            // 不安全：修改服务器状态
    cacheable: false,       // 不可缓存
    hasBody: true,          // 有请求体
    description: '提交数据/创建资源',
    usage: '提交表单、创建新资源、上传文件',
    example: 'POST /api/users',
    statusCode: '201 Created, 400 Bad Request, 409 Conflict',
    frontendUsage: `
      // 创建新用户的POST请求
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '张三', email: 'zhangsan@example.com' })
      }).then(res => res.json());
    `
  },

  PUT: {
    idempotent: true,       // 幂等：多次PUT结果是相同的
    safe: false,
    cacheable: false,
    hasBody: true,
    description: '替换整个资源（整体更新）',
    usage: '更新资源的所有字段',
    example: 'PUT /api/users/123',
    statusCode: '200 OK, 204 No Content, 404 Not Found',
    note: 'PUT是幂等的，多次执行结果相同'
  },

  DELETE: {
    idempotent: true,       // 幂等：删除已删除的资源结果相同
    safe: false,
    cacheable: false,
    hasBody: false,         // 通常没有请求体
    description: '删除资源',
    usage: '删除指定资源',
    example: 'DELETE /api/users/123',
    statusCode: '200 OK, 204 No Content, 404 Not Found',
    frontendUsage: `
      // 删除用户
      fetch('/api/users/123', { method: 'DELETE' })
        .then(res => {
          if (res.ok) console.log('删除成功');
        });
    `
  },

  // ========== 其他重要方法 ==========
  
  PATCH: {
    idempotent: false,      // 非幂等：可能只更新部分字段
    safe: false,
    cacheable: false,
    hasBody: true,
    description: '局部更新资源（部分修改）',
    usage: '只更新资源的某些字段',
    example: 'PATCH /api/users/123',
    statusCode: '200 OK, 204 No Content',
    differenceFromPUT: 'PUT替换整个资源，PATCH只修改指定的字段'
  },

  HEAD: {
    idempotent: true,
    safe: true,
    cacheable: true,
    hasBody: false,
    description: '类似GET，但只返回响应头（无响应体）',
    usage: '检查资源是否存在、获取元信息、验证缓存',
    example: 'HEAD /api/users/123',
    useCase: '检查资源最后修改时间而不下载整个资源'
  },

  OPTIONS: {
    idempotent: true,
    safe: true,
    cacheable: false,
    hasBody: false,
    description: '查询服务器支持的HTTP方法和CORS配置',
    usage: 'CORS预检请求、发现服务器能力',
    example: 'OPTIONS /api/users',
    corsNote: '跨域请求前浏览器自动发送OPTIONS预检'
  },

  CONNECT: {
    idempotent: false,
    safe: false,
    cacheable: false,
    hasBody: false,
    description: '建立隧道连接（主要用于HTTPS代理）',
    usage: 'SSL隧道、代理服务器',
    example: 'CONNECT example.com:443 HTTP/1.1',
    frontendRelevance: '前端较少直接使用'
  },

  TRACE: {
    idempotent: true,
    safe: true,
    cacheable: false,
    hasBody: false,
    description: '回显收到的请求（用于诊断）',
    usage: '调试、测试路径上的代理行为',
    securityWarning: '可能泄露敏感信息，通常被禁用'
  }
};


/**
 * RESTful API 设计最佳实践
 * 合理使用HTTP方法是设计RESTful API的基础
 */
class RestfulClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  /**
   * GET - 获取资源列表
   * @param {string} resource - 资源名称
   * @param {Object} params - 查询参数
   */
  async getList(resource, params = {}) {
    // 构建查询字符串
    const queryString = new URLSearchParams(params).toString();
    const url = `${this.baseURL}${resource}${queryString ? '?' + queryString : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`GET失败: ${response.status}`);
    }

    return response.json();
  }

  /**
   * GET - 获取单个资源
   * @param {string} resource - 资源名称
   * @param {string|number} id - 资源ID
   */
  async getOne(resource, id) {
    const response = await fetch(`${this.baseURL}${resource}/${id}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (response.status === 404) {
      throw new Error('资源不存在');
    }

    return response.json();
  }

  /**
   * POST - 创建新资源
   * @param {string} resource - 资源名称
   * @param {Object} data - 资源数据
   */
  async create(resource, data) {
    const response = await fetch(`${this.baseURL}${resource}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.status === 201) {
      // 201 Created - 资源创建成功
      const createdResource = await response.json();
      console.log('资源创建成功，Location:', response.headers.get('Location'));
      return createdResource;
    }

    if (response.status === 409) {
      throw new Error('资源冲突（可能已存在）');
    }

    throw new Error(`创建失败: ${response.status}`);
  }

  /**
   * PUT - 完整替换资源
   * @param {string} resource - 资源名称
   * @param {string|number} id - 资源ID
   * @param {Object} data - 完整的资源数据
   */
  async replace(resource, id, data) {
    const response = await fetch(`${this.baseURL}${resource}/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.status === 200) {
      return response.json();
    }

    if (response.status === 204) {
      // 204 No Content - 成功但无返回内容
      return { success: true };
    }

    throw new Error(`更新失败: ${response.status}`);
  }

  /**
   * PATCH - 部分更新资源
   * @param {string} resource - 资源名称
   * @param {string|number} id - 资源ID
   * @param {Object} data - 需要更新的字段
   */
  async update(resource, id, data) {
    const response = await fetch(`${this.baseURL}${resource}/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`更新失败: ${response.status}`);
    }

    return response.json();
  }

  /**
   * DELETE - 删除资源
   * @param {string} resource - 资源名称
   * @param {string|number} id - 资源ID
   */
  async delete(resource, id) {
    const response = await fetch(`${this.baseURL}${resource}/${id}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' }
    });

    if (response.status === 204) {
      return { success: true, deleted: true };
    }

    if (response.status === 404) {
      throw new Error('资源不存在或已被删除');
    }

    throw new Error(`删除失败: ${response.status}`);
  }
}

// 使用示例
const api = new RestfulClient('https://api.example.com/v1');

// CRUD 操作示例
(async () => {
  // 获取用户列表
  const users = await api.getList('/users', { page: 1, limit: 10 });
  
  // 创建新用户
  const newUser = await api.create('/users', {
    name: '李四',
    email: 'lisi@example.com'
  });
  
  // 更新用户（PATCH - 只更新邮箱）
  const updated = await api.update('/users', newUser.id, {
    email: 'newemail@example.com'
  });
  
  // 删除用户
  await api.delete('/users', newUser.id);
})();
```

---

### 2.3 HTTP 状态码详解

HTTP **状态码**（Status Code）是服务器返回的三位数字，用来告诉客户端请求的处理结果。状态码分为五大类：

#### 2.3.1 状态码分类总览

```javascript
/**
 * HTTP状态码完整分类
 * 状态码的第一位数字表示响应类别
 */
const httpStatusCodes = {
  // ========== 1xx 信息性响应 ==========
  informational: {
    range: '100-199',
    meaning: '请求已接收，继续处理',
    codes: {
      100: { name: 'Continue', desc: '客户端应继续发送请求体' },
      101: { name: 'Switching Protocols', desc: '服务器切换协议（如WebSocket升级）' },
      102: { name: 'Processing', desc: '服务器正在处理请求（WebDAV）' },
      103: { name: 'Early Hints', desc: '预加载提示，允许提前发送链接头' }
    }
  },

  // ========== 2xx 成功响应 ==========
  success: {
    range: '200-299',
    meaning: '请求成功接收、理解并接受',
    codes: {
      200: { 
        name: 'OK', 
        desc: '请求成功',
        commonUse: 'GET/POST请求的标准成功响应',
        frontendTip: '最常见的成功状态码'
      },
      201: { 
        name: 'Created', 
        desc: '资源创建成功',
        commonUse: 'POST请求创建新资源后的响应',
        frontendTip: '响应头通常包含Location指向新资源'
      },
      202: { 
        name: 'Accepted', 
        desc: '请求已接受，但尚未处理完成',
        commonUse: '异步任务、队列处理',
        frontendTip: '适合耗时操作的异步处理'
      },
      203: { 
        name: 'Non-Authoritative Information', 
        desc: '来自缓存的响应，非原始服务器',
        commonUse: '代理服务器返回的缓存内容'
      },
      204: { 
        name: 'No Content', 
        desc: '请求成功，但无返回内容',
        commonUse: 'DELETE请求成功、PUT/PATCH某些情况',
        frontendTip: '响应体为空，不要尝试解析JSON'
      },
      206: { 
        name: 'Partial Content', 
        desc: '部分内容响应（范围请求）',
        commonUse: '视频/大文件的断点续传、分片下载',
        frontendTip: '配合Range请求头使用'
      }
    }
  },

  // ========== 3xx 重定向 ==========
  redirection: {
    range: '300-399',
    meaning: '需要进一步操作才能完成请求',
    codes: {
      301: { 
        name: 'Moved Permanently', 
        desc: '资源永久移动到新URL',
        commonUse: '网站改版、域名更换',
        seoImpact: '搜索引擎会更新索引为新URL',
        browserBehavior: '浏览器会自动跳转并缓存'
      },
      302: { 
        name: 'Found (Previously Moved Temporarily)', 
        desc: '资源临时移动到新URL',
        commonUse: '临时跳转、认证后重定向',
        browserBehavior: '浏览器会跟随重定向但不缓存'
      },
      303: { 
        name: 'See Other', 
        desc: '请使用GET方法访问其他URL',
        commonUse: 'POST提交后的重定向（PRG模式）',
        pattern: 'Post/Redirect/Get模式防止表单重复提交'
      },
      304: { 
        name: 'Not Modified', 
        desc: '资源未修改，可使用缓存',
        commonUse: '协商缓存命中时的响应',
        cachingTip: '配合If-None-Match或If-Modified-Since使用',
        bandwidthSaving: '节省带宽，只返回头部'
      },
      307: { 
        name: 'Temporary Redirect', 
        desc: '临时重定向，保持原请求方法',
        differenceFrom302: '严格保持原始请求方法（POST还是POST）',
        commonUse: '需要保持请求方法的临时重定向'
      },
      308: { 
        name: 'Permanent Redirect', 
        desc: '永久重定向，保持原请求方法',
        differenceFrom301: '严格保持原始请求方法',
        commonUse: '需要保持请求方法的永久重定向'
      }
    }
  },

  // ========== 4xx 客户端错误 ==========
  clientError: {
    range: '400-499',
    meaning: '请求包含语法错误或无法完成',
    codes: {
      400: { 
        name: 'Bad Request', 
        desc: '请求语法错误或参数无效',
        commonCause: 'JSON格式错误、必填参数缺失、参数类型错误',
        debugTip: '检查请求体格式和参数'
      },
      401: { 
        name: 'Unauthorized', 
        desc: '未认证，需要身份验证',
        commonCause: '未登录、Token过期',
        solution: '引导用户登录或刷新Token',
        authHeader: '响应头WWW-Authenticate包含认证方式'
      },
      403: { 
        name: 'Forbidden', 
        desc: '已认证但权限不足',
        commonCause: '角色权限不够、IP被封禁',
        differenceFrom401: '401是没登录，403是登录了但没权限'
      },
      404: { 
        name: 'Not Found', 
        desc: '资源不存在',
        commonCause: 'URL拼写错误、资源已被删除',
        frontendTip: '显示友好的404页面'
      },
      405: { 
        name: 'Method Not Allowed', 
        desc: '请求方法不被允许',
        commonCause: '对只读接口用了POST/DELETE',
        solution: '检查Allow响应头了解允许的方法'
      },
      408: { 
        name: 'Request Timeout', 
        desc: '服务器等待请求超时',
        commonCause: '客户端发送太慢、网络问题',
        retryable: '可以重试'
      },
      409: { 
        name: 'Conflict', 
        desc: '请求与当前资源状态冲突',
        commonCause: '并发编辑、唯一约束冲突',
        solution: '提示用户冲突，提供解决方案'
      },
      413: { 
        name: 'Payload Too Large', 
        desc: '请求体过大',
        commonCause: '上传文件超过限制',
        solution: '压缩文件或分块上传'
      },
      422: { 
        name: 'Unprocessable Entity', 
        desc: '请求格式正确但语义错误',
        commonCause: '业务规则验证失败（如密码太简单）',
        differenceFrom400: '400是语法错误，422是业务逻辑错误'
      },
      429: { 
        name: 'Too Many Requests', 
        desc: '请求过于频繁（限流）',
        commonCause: '触发速率限制',
        solution: '等待Retry-After头指定的时间后重试',
        rateLimiting: '保护服务器免受滥用'
      }
    }
  },

  // ========== 5xx 服务器错误 ==========
  serverError: {
    range: '500-599',
    meaning: '服务器在处理请求时发生错误',
    codes: {
      500: { 
        name: 'Internal Server Error', 
        desc: '服务器内部错误',
        commonCause: '代码bug、数据库错误、配置错误',
        action: '联系后端排查日志'
      },
      501: { 
        name: 'Not Implemented', 
        desc: '服务器不支持该功能',
        commonCause: '使用了尚未实现的功能'
      },
      502: { 
        name: 'Bad Gateway', 
        desc: '网关或代理收到无效响应',
        commonCause: '上游服务器宕机或无响应',
        architecture: '涉及反向代理或负载均衡器'
      },
      503: { 
        name: 'Service Unavailable', 
        desc: '服务暂时不可用',
        commonCause: '服务器维护、过载',
        solution: '稍后重试，查看Retry-After头'
      },
      504: { 
        name: 'Gateway Timeout', 
        desc: '网关等待上游服务器超时',
        commonCause: '后端处理时间过长',
        differenceFrom408: '408是客户端超时，504是服务器间超时'
      }
    }
  }
};


/**
 * HTTP状态码处理工具类
 * 提供统一的错误处理和用户提示
 */
class HttpResponseHandler {
  /**
   * 处理HTTP响应
   * @param {Response} response - Fetch API的Response对象
   * @returns {Promise<Object>} 处理后的结果
   */
  static async handle(response) {
    const status = response.status;
    const statusText = response.statusText;

    // 成功响应 (2xx)
    if (status >= 200 && status < 300) {
      return this.handleSuccess(response, status);
    }

    // 重定向 (3xx) - Fetch默认会自动跟随重定向
    if (status >= 300 && status < 400) {
      console.log(`重定向到: ${response.headers.get('Location')}`);
      return { redirected: true, location: response.headers.get('Location') };
    }

    // 客户端错误 (4xx)
    if (status >= 400 && status < 500) {
      return this.handleClientError(response, status);
    }

    // 服务器错误 (5xx)
    if (status >= 500) {
      return this.handleServerError(response, status);
    }
  }

  /**
   * 处理成功响应
   */
  static async handleSuccess(response, status) {
    switch (status) {
      case 200:
      case 201:
        // 尝试解析JSON，如果失败则返回文本
        const contentType = response.headers.get('Content-Type') || '';
        if (contentType.includes('json')) {
          return { success: true, data: await response.json(), status };
        }
        return { success: true, data: await response.text(), status };

      case 204:
        // 无内容响应
        return { success: true, data: null, status };

      case 206:
        // 部分内容（范围请求）
        return {
          success: true,
          data: await response.arrayBuffer(),
          status,
          contentRange: response.headers.get('Content-Range'),
          contentLength: response.headers.get('Content-Length')
        };

      default:
        return { success: true, data: await response.text(), status };
    }
  }

  /**
   * 处理客户端错误
   */
  static async handleClientError(response, status) {
    let errorMessage = '';
    let errorDetail = null;

    // 尝试获取服务器返回的错误详情
    try {
      errorDetail = await response.json();
      errorMessage = errorDetail.message || errorDetail.error || '请求错误';
    } catch (e) {
      errorMessage = response.statusText;
    }

    // 根据状态码提供具体的用户提示
    const userMessage = this.getUserFriendlyMessage(status, errorMessage);

    const error = {
      success: false,
      status,
      userMessage,           // 面向用户的友好提示
      technicalMessage: errorMessage,  // 技术性错误信息
      detail: errorDetail,    // 完整的错误详情
      isAuthError: status === 401 || status === 403,
      isNotFound: status === 404,
      isRateLimited: status === 429,
      retryable: [408, 429].includes(status)
    };

    // 记录错误日志
    console.error(`[HTTP ${status}] ${errorMessage}`, errorDetail);

    throw new HttpError(error);
  }

  /**
   * 处理服务器错误
   */
  static async handleServerError(response, status) {
    const error = {
      success: false,
      status,
      userMessage: '服务器暂时不可用，请稍后再试',
      technicalMessage: `服务器错误: ${status}`,
      retryable: true,  // 服务器错误通常可以重试
      retryAfter: response.headers.get('Retry-After')  // 建议的重试时间
    };

    console.error(`[HTTP ${status}] 服务器错误`);
    throw new HttpError(error);
  }

  /**
   * 获取面向用户的友好错误提示
   */
  static getUserFriendlyMessage(status, serverMessage) {
    const messages = {
      400: '请求参数有误，请检查输入',
      401: '登录已过期，请重新登录',
      403: '您没有权限执行此操作',
      404: '请求的资源不存在',
      405: '请求方法不允许',
      408: '请求超时，请检查网络后重试',
      409: '操作冲突，请刷新后重试',
      413: '上传文件过大',
      422: '数据验证失败',
      429: '操作过于频繁，请稍后再试'
    };

    return messages[status] || serverMessage || '请求失败';
  }
}

/**
 * 自定义HTTP错误类
 */
class HttpError extends Error {
  constructor(errorInfo) {
    super(errorInfo.userMessage);
    this.name = 'HttpError';
    this.status = errorInfo.status;
    this.detail = errorInfo.detail;
    this.retryable = errorInfo.retryable;
  }
}
```

---

### 2.4 HTTP 报文结构

HTTP **报文**（Message）是客户端和服务器之间交换的数据单位。分为**请求报文**（Request Message）和**响应报文**（Response Message）两种。

#### 2.4.1 请求报文结构

```
┌─────────────────────────────────────────────────────────────┐
│                    HTTP 请求报文结构                          │
├─────────────────────────────────────────────────────────────┤
│  请求行 (Request Line)                                       │
│  ┌──────────┬─────────────────┬──────────────────────────┐  │
│  │ 方法     │ URL             │ 版本                     │  │
│  │ GET      │ /index.html     │ HTTP/1.1                 │  │
│  └──────────┴─────────────────┴──────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  请求头 (Headers)                                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Host: www.example.com                                │   │
│  │ User-Agent: Mozilla/5.0 ...                          │   │
│  │ Accept: text/html,application/xhtml+xml              │   │
│  │ Accept-Language: zh-CN,zh;q=0.9,en;q=0.8            │   │
│  │ Connection: keep-alive                               │   │
│  └──────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  空行 (CRLF) - 必须有空行分隔头部和正文                        │
├─────────────────────────────────────────────────────────────┤
│  请求体 (Body) - 可选                                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ {"username": "admin", "password": "123456"}          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

```javascript
/**
 * HTTP请求报文构造器
 * 用于理解和构建HTTP请求
 */
class HttpRequestBuilder {
  constructor() {
    this.method = 'GET';
    this.url = '/';
    this.version = 'HTTP/1.1';
    this.headers = {};
    this.body = null;
  }

  /**
   * 设置请求方法
   * @param {string} method - HTTP方法
   */
  setMethod(method) {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
    if (!validMethods.includes(method.toUpperCase())) {
      throw new Error(`无效的HTTP方法: ${method}`);
    }
    this.method = method.toUpperCase();
    return this;  // 支持链式调用
  }

  /**
   * 设置请求URL
   * @param {string} url - 请求路径
   */
  setURL(url) {
    this.url = url;
    return this;
  }

  /**
   * 添加请求头
   * @param {string} name - 头部名称
   * @param {string} value - 头部值
   */
  setHeader(name, value) {
    this.headers[name] = value;
    return this;
  }

  /**
   * 设置常用的请求头
   */
  setCommonHeaders(contentType = 'application/json') {
    // Host头 - 必须的头，指定服务器的主机名和端口
    const urlObj = new URL(this.url, 'http://localhost');
    this.headers['Host'] = urlObj.host;

    // User-Agent - 标识客户端信息
    this.headers['User-Agent'] = 'MyFrontendApp/1.0';

    // Accept - 声明可接受的响应内容类型
    this.headers['Accept'] = `${contentType}, */*`;

    // Accept-Language - 可接受的语言
    this.headers['Accept-Language'] = 'zh-CN,zh;q=0.9,en;q=0.8';

    // Connection - 连接管理
    this.headers['Connection'] = 'keep-alive';

    // Content-Type - 请求体的内容类型（如果有请求体）
    if (this.body !== null && !this.headers['Content-Type']) {
      this.headers['Content-Type'] = contentType;
    }

    return this;
  }

  /**
   * 设置请求体
   * @param {*} body - 请求体数据
   * @param {string} contentType - 内容类型
   */
  setBody(body, contentType = 'application/json') {
    if (contentType === 'application/json' && typeof body === 'object') {
      this.body = JSON.stringify(body);
    } else {
      this.body = String(body);
    }
    return this;
  }

  /**
   * 构建完整的HTTP请求报文字符串
   * @returns {string} 完整的HTTP请求报文
   */
  build() {
    // 构建请求行：方法 URL 版本
    let request = `${this.method} ${this.url} ${this.version}\r\n`;

    // 构建请求头
    for (const [name, value] of Object.entries(this.headers)) {
      request += `${name}: ${value}\r\n`;
    }

    // 空行 - 头部和正文的分隔符
    request += '\r\n';

    // 请求体（如果有的话）
    if (this.body !== null) {
      request += this.body;
    }

    return request;
  }

  /**
   * 打印请求报文的详细信息
   */
  printDetails() {
    console.log('═══════════════════════════════════════════');
    console.log('           HTTP 请求报文详情');
    console.log('═══════════════════════════════════════════');
    console.log('\n【请求行】');
    console.log(`  方法: ${this.method}`);
    console.log(`  URL: ${this.url}`);
    console.log(`  版本: ${this.version}`);
    
    console.log('\n【请求头】');
    for (const [name, value] of Object.entries(this.headers)) {
      console.log(`  ${name}: ${value}`);
    }
    
    console.log('\n【请求体】');
    console.log(this.body || '(空)');
    
    console.log('\n═══════════════════════════════════════════');
  }
}

// 使用示例：构建一个POST请求
const postRequest = new HttpRequestBuilder()
  .setMethod('POST')
  .setURL('/api/login')
  .setHeader('Authorization', 'Bearer token123')
  .setBody({ username: 'admin', password: 'secret123' })
  .setCommonHeaders();

postRequest.printDetails();
console.log('\n完整报文:\n', postRequest.build());
```

#### 2.4.2 响应报文结构

```
┌─────────────────────────────────────────────────────────────┐
│                    HTTP 响应报文结构                          │
├─────────────────────────────────────────────────────────────┤
│  状态行 (Status Line)                                        │
│  ┌──────────┬──────────┬────────────────────────────────┐  │
│  │ 版本     │ 状态码   │ 原因短语                       │  │
│  │ HTTP/1.1 │ 200      │ OK                             │  │
│  └──────────┴──────────┴────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  响应头 (Headers)                                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Server: nginx/1.18.0                                 │   │
│  │ Content-Type: application/json; charset=utf-8        │   │
│  │ Content-Length: 156                                  │   │
│  │ Date: Mon, 15 Jun 2026 08:00:00 GMT                  │   │
│  │ Set-Cookie: session_id=abc123; Path=/; HttpOnly      │   │
│  └──────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  空行 (CRLF)                                                 │
├─────────────────────────────────────────────────────────────┤
│  响应体 (Body)                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ {"code": 0, "data": {...}, "message": "success"}     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

```javascript
/**
 * HTTP响应解析器
 * 用于解析和理解HTTP响应
 */
class HttpResponseParser {
  /**
   * 解析原始HTTP响应
   * @param {string} rawResponse - 原始HTTP响应字符串
   * @returns {Object} 解析后的响应对象
   */
  parse(rawResponse) {
    // Step 1: 分离头部和正文（以空行分割）
    const [rawHeader, ...bodyParts] = rawResponse.split('\r\n\r\n');
    const body = bodyParts.join('\r\n\r\n');

    // Step 2: 解析状态行
    const lines = rawHeader.split('\r\n');
    const statusLine = lines[0];
    const [, version, statusCode, reasonPhrase] = statusLine.match(/^(\S+) (\d+) (.*)$/);

    // Step 3: 解析响应头
    const headers = {};
    for (let i = 1; i < lines.length; i++) {
      const colonIndex = lines[i].indexOf(':');
      if (colonIndex > 0) {
        const name = lines[i].substring(0, colonIndex).trim();
        const value = lines[i].substring(colonIndex + 1).trim();
        headers[name] = value;
      }
    }

    return {
      // 状态行信息
      version,
      statusCode: parseInt(statusCode, 10),
      reasonPhrase,
      
      // 响应头
      headers,
      
      // 响应体
      body: body || null,

      // 便捷方法
      getHeader(name) {
        return headers[name.toLowerCase()] || headers[name];
      },
      
      isSuccess() {
        return statusCode >= 200 && statusCode < 300;
      },
      
      isRedirect() {
        return statusCode >= 300 && statusCode < 400;
      },
      
      isError() {
        return statusCode >= 400;
      }
    };
  }

  /**
   * 解析Set-Cookie头
   * @param {string} setCookieHeader - Set-Cookie头的值
   * @returns {Object} Cookie对象
   */
  parseSetCookie(setCookieHeader) {
    const cookie = {};
    
    // 分割各个属性
    const parts = setCookieHeader.split(';').map(p => p.trim());
    
    // 第一个部分是 name=value
    const [nameValue, ...attributes] = parts;
    const [name, value] = nameValue.split('=');
    cookie.name = name.trim();
    cookie.value = value.trim();

    // 解析其他属性
    attributes.forEach(attr => {
      const [attrName, attrValue] = attr.split('=');
      const trimmedName = attrName.trim().toLowerCase();
      
      switch (trimmedName) {
        case 'expires':
          cookie.expires = new Date(attrValue);
          break;
        case 'max-age':
          cookie.maxAge = parseInt(attrValue, 10);
          break;
        case 'domain':
          cookie.domain = attrValue.trim();
          break;
        case 'path':
          cookie.path = attrValue.trim();
          break;
        case 'secure':
          cookie.secure = true;
          break;
        case 'httponly':
          cookie.httpOnly = true;
          break;
        case 'samesite':
          cookie.sameSite = attrValue ? attrValue.trim() : true;
          break;
      }
    });

    return cookie;
  }
}

// 使用示例：解析一个真实的HTTP响应
const sampleResponse = `HTTP/1.1 200 OK
Server: nginx/1.18.0
Content-Type: application/json; charset=utf-8
Content-Length: 89
Date: Mon, 15 Jun 2026 08:00:00 GMT
Set-Cookie: session_id=abc123xyz; Path=/; HttpOnly; Secure; SameSite=Strict
Cache-Control: public, max-age=3600

{"code": 0, "data": {"userId": 123, "name": "张三"}, "message": "success"}`;

const parser = new HttpResponseParser();
const response = parser.parse(sampleResponse);

console.log('状态码:', response.statusCode);  // 200
console.log('Content-Type:', response.getHeader('Content-Type'));
console.log('是否成功:', response.isSuccess());  // true

// 解析Cookie
const cookies = response.getHeader('Set-Cookie');
if (cookies) {
  const parsedCookie = parser.parseSetCookie(cookies);
  console.log('Cookie名称:', parsedCookie.name);      // session_id
  console.log('Cookie值:', parsedCookie.value);        // abc123xyz
  console.log('HttpOnly:', parsedCookie.httpOnly);     // true
  console.log('Secure:', parsedCookie.secure);         // true
}
```

---

### 2.5 URL 完整组成

**URL**（Uniform Resource Locator，统一资源定位符）是互联网上资源的地址。一个完整的URL包含多个组成部分：

```
  https://user:pass@example.com:8080/path/to/resource?query=value#fragment
   │       │    │     │          │     │                │           │
   │       │    │     │          │     │                │           └── 片段/锚点 (Fragment)
   │       │    │     │          │     │                └── 查询字符串 (Query String)
   │       │    │     │          │     └── 路径 (Path)
   │       │    │     │          └── 端口 (Port)
   │       │    │     └── 主机名/域名 (Hostname/Domain)
   │       │     └── 密码 (Password) - 已废弃，极少使用
   │       └── 用户名 (Username) - 已废弃，极少使用
   └── 方案/协议 (Scheme/Protocol)
```

```javascript
/**
 * URL解析器 - 详细解析URL的每个组成部分
 */
class DetailedURLParser {
  /**
   * 解析URL的所有组成部分
   * @param {string} urlString - URL字符串
   * @returns {Object} 解析后的URL组件
   */
  parse(urlString) {
    try {
      const url = new URL(urlString);
      
      return {
        // ========== 基础组件 ==========
        
        // 协议方案（scheme）：指定使用的协议
        scheme: url.protocol.replace(':', ''),
        schemeDescription: this.getSchemeDescription(url.protocol),

        // 凭证信息（credentials）- 已基本废弃
        username: url.username || '(无)',
        password: url.password ? '(已设置)' : '(无)',
        credentialsNote: 'URL中的凭证信息已废弃，不应使用',

        // 主机信息（host）
        hostname: url.hostname,
        hostnameType: this.identifyHostnameType(url.hostname),
        host: url.host,  // hostname:port

        // 端口（port）
        port: url.port || this.getDefaultPort(url.protocol),
        portNote: url.port ? '显式指定端口' : '使用默认端口',

        // ========== 路径与资源 ==========
        
        // 路径（path）：资源在服务器上的位置
        pathname: url.pathname,
        pathSegments: url.pathname.split('/').filter(Boolean),

        // 查询字符串（query string）
        search: url.search,
        queryParams: this.parseQueryString(url.searchParams),

        // 片段标识符（fragment/hash）
        hash: url.hash,
        fragment: url.hash.replace('#', ''),

        // ========== 完整URL组件 ==========
        origin: url.origin,        // 源（协议+主机+端口）
        href: url.href,            // 完整URL
        toString: url.toString(),  // 字符串形式

        // ========== 编码相关信息 ==========
        encoded: {
          original: urlString,
          encodedURI: encodeURI(urlString),
          encodedURIComponent: encodeURIComponent(urlString)
        }
      };
    } catch (error) {
      throw new Error(`无效的URL: ${urlString}`);
    }
  }

  /**
   * 获取协议说明
   */
  getSchemeDescription(protocol) {
    const schemes = {
      'http:': '超文本传输协议（明文，端口80）',
      'https:': '安全超文本传输协议（加密，端口443）',
      'ftp:': '文件传输协议（端口21）',
      'ws:': 'WebSocket协议（明文，端口80）',
      'wss:': '安全WebSocket协议（加密，端口443）',
      'mailto:': '电子邮件协议',
      'tel:': '电话号码协议',
      'file:': '本地文件协议'
    };
    return schemes[protocol] || '未知协议';
  }

  /**
   * 识别主机名类型
   */
  identifyifyHostnameType(hostname) {
    // IPv4地址
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
      return 'IPv4地址';
    }
    // IPv6地址
    if (hostname.includes(':')) {
      return 'IPv6地址';
    }
    // 域名
    return '域名(Domain Name)';
  }

  /**
   * 获取协议对应的默认端口
   */
  getDefaultPort(protocol) {
    const defaults = {
      'http:': '80 (默认)',
      'https:': '443 (默认)',
      'ftp:': '21 (默认)',
      'ws:': '80 (默认)',
      'wss:': '443 (默认)'
    };
    return defaults[protocol] || '(未知)';
  }

  /**
   * 解析查询字符串参数
   * @param {URLSearchParams} searchParams - URLSearchParams对象
   * @returns {Object} 参数对象
   */
  parseQueryString(searchParams) {
    const params = {};
    for (const [key, value] of searchParams) {
      // 支持同名参数（数组）
      if (params[key]) {
        if (Array.isArray(params[key])) {
          params[key].push(value);
        } else {
          params[key] = [params[key], value];
        }
      } else {
        params[key] = value;
      }
    }
    return params;
  }

  /**
   * 格式化输出URL分析结果
   */
  formatReport(urlString) {
    const parsed = this.parse(urlString);
    
    let report = '\n╔════════════════════════════════════════════╗\n';
    report += '║          URL 详细分析报告                  ║\n';
    report += '╠════════════════════════════════════════════╣\n';
    
    report += `\n📌 原始URL: ${parsed.href}\n`;
    report += `\n┌─ 基础信息 ─────────────────────────────┐\n`;
    report += `│ 协议(Scheme): ${parsed.scheme}\n`;
    report += `│   说明: ${parsed.schemeDescription}\n`;
    report += `│ 主机(Host): ${parsed.hostname} [${parsed.hostnameType}]\n`;
    report += `│ 端口(Port): ${parsed.port} ${parsed.portNote}\n`;
    report += `│ 源(Origin): ${parsed.origin}\n`;
    report += `└─────────────────────────────────────────┘\n`;
    
    report += `\n┌─ 路径信息 ─────────────────────────────┐\n`;
    report += `│ 路径(Path): ${parsed.pathname}\n`;
    report += `│ 路径段: [${parsed.pathSegments.join(', ')}]\n`;
    report += `└─────────────────────────────────────────┘\n`;
    
    report += `\n┌─ 查询参数 ─────────────────────────────┐\n`;
    if (Object.keys(parsed.queryParams).length > 0) {
      for (const [key, value] of Object.entries(parsed.queryParams)) {
        report += `│ ${key}: ${value}\n`;
      }
    } else {
      report += `│ (无查询参数)\n`;
    }
    report += `└─────────────────────────────────────────┘\n`;
    
    report += `\n┌─ 其他信息 ─────────────────────────────┐\n`;
    report += `│ 片段(Fragment): ${parsed.fragment || '(无)'}\n`;
    report += `└─────────────────────────────────────────┘\n`;
    
    report += '╚════════════════════════════════════════════╝\n';
    
    return report;
  }
}

// 使用示例
const urlParser = new DetailedURLParser();

// 解析一个复杂的URL
const complexURL = 'https://admin:secret@api.example.com:8443/v1/users?page=1&limit=20&sort=name#section-comments';
console.log(urlParser.formatReport(complexURL));

// 解析一个简单的URL
const simpleURL = 'https://www.example.com/products/item?id=123';
console.log(urlParser.formatReport(simpleURL));
```

---

### 2.6 Content-Type 详解

**Content-Type** 是 HTTP 中最重要的头部之一，它告诉接收方如何解释请求体或响应体的数据格式。Content-Type 的值是一个 **MIME 类型**（Multipurpose Internet Mail Extensions）。

#### 2.6.1 常见 MIME 类型

```javascript
/**
 * MIME类型完整参考手册
 * MIME类型用于标识内容的格式
 */
const mimeTypes = {
  // ========== 文本类型 ==========
  text: {
    'text/plain': {
      extension: '.txt',
      description: '纯文本',
      charset: '通常使用 utf-8 或 iso-8859-1',
      useCase: '简单的文本数据'
    },
    'text/html': {
      extension: '.html',
      description: 'HTML文档',
      charset: '几乎总是 utf-8',
      useCase: '网页内容',
      importance: '★★★★★'  // 前端最常用
    },
    'text/css': {
      extension: '.css',
      description: 'CSS样式表',
      useCase: '样式文件',
      importance: '★★★★★'
    },
    'text/javascript': {
      extension: '.js',
      description: 'JavaScript代码（旧称）',
      note: '推荐使用 application/javascript'
    },
    'text/xml': {
      extension: '.xml',
      description: 'XML文档',
      useCase: 'XML数据交换、SVG'
    },
    'text/csv': {
      extension: '.csv',
      description: '逗号分隔值',
      useCase: '表格数据导出'
    },
    'text/markdown': {
      extension: '.md',
      description: 'Markdown文档',
      useCase: '文档编写'
    }
  },

  // ========== 应用类型 ==========
  application: {
    'application/json': {
      extension: '.json',
      description: 'JSON数据格式',
      charset: 'utf-8',
      useCase: 'API数据交换',
      importance: '★★★★★',  // 前端API开发必备
      example: '{"name": "value", "count": 42}'
    },
    'application/xml': {
      extension: '.xml',
      description: 'XML数据',
      useCase: 'SOAP服务等传统API'
    },
    'application/x-www-form-urlencoded': {
      extension: null,
      description: '表单URL编码',
      format: 'key1=value1&key2=value2',
      encoding: '键值对进行URL编码',
      useCase: '普通表单提交',
      example: 'username=admin&password=123456'
    },
    'multipart/form-data': {
      extension: null,
      description: '多部分表单数据',
      boundary: '使用boundary分隔各部分',
      useCase: '文件上传、混合内容提交',
      importance: '★★★★☆',
      fileUpload: true
    },
    'application/octet-stream': {
      extension: null,
      description: '二进制流（通用）',
      useCase: '未知类型的二进制文件',
      download: true  // 浏览器通常会触发下载
    },
    'application/pdf': {
      extension: '.pdf',
      description: 'PDF文档',
      useCase: '文档展示和下载'
    },
    'application/zip': {
      extension: '.zip',
      description: 'ZIP压缩包',
      useCase: '批量文件下载'
    },
    'application/javascript': {
      extension: '.js',
      description: 'JavaScript代码（推荐）',
      note: '取代 text/javascript'
    },
    'application/typescript': {
      extension: '.ts',
      description: 'TypeScript源码',
      note: '浏览器不能直接运行，需要编译'
    },
    'application/wasm': {
      extension: '.wasm',
      description: 'WebAssembly二进制',
      useCase: '高性能计算、游戏'
    },
    'application/graphql': {
      extension: '.gql',
      description: 'GraphQL请求',
      useCase: 'GraphQL API'
    },
    'application/x-msgpack': {
      extension: '.msgpack',
      description: 'MessagePack二进制序列化',
      advantage: '比JSON更紧凑'
    },
    'application/protobuf': {
      extension: '.proto',
      description: 'Protocol Buffers',
      useCase: '高性能RPC通信'
    }
  },

  // ========== 图片类型 ==========
  image: {
    'image/jpeg': {
      extension: '.jpg/.jpeg',
      description: 'JPEG图片（有损压缩）',
      bestFor: '照片、复杂图像',
      compression: '有损',
      transparency: '不支持'
    },
    'image/png': {
      extension: '.png',
      description: 'PNG图片（无损压缩）',
      bestFor: '截图、图标、需要透明度的图片',
      compression: '无损',
      transparency: '支持'
    },
    'image/gif': {
      extension: '.gif',
      description: 'GIF图片（支持动画）',
      bestFor: '简单动画、小图标',
      animation: '支持',
      colors: '最多256色'
    },
    'image/svg+xml': {
      extension: '.svg',
      description: '矢量图形（可缩放）',
      bestFor: '图标、Logo、图表',
      scalability: '无限缩放不失真',
      size: '通常很小',
      importance: '★★★★★'  // 前端图标首选
    },
    'image/webp': {
      extension: '.webp',
      description: 'WebP图片（新一代格式）',
      advantages: ['体积更小', '支持透明', '支持动画'],
      compatibility: '现代浏览器都支持',
      recommendation: '推荐优先使用'
    },
    'image/avif': {
      extension: '.avif',
      description: 'AVIF图像（最新格式）',
      advantages: ['比WebP更小', '更好的质量'],
      compatibility: '较新浏览器支持'
    },
    'image/x-icon': {
      extension: '.ico',
      description: '图标文件',
      useCase: '网站favicon'
    }
  },

  // ========== 音频类型 ==========
  audio: {
    'audio/mpeg': { extension: '.mp3', description: 'MP3音频' },
    'audio/wav': { extension: '.wav', description: 'WAV音频（无损）' },
    'audio/ogg': { extension: '.ogg', description: 'OGG音频' },
    'audio/aac': { extension: '.aac', description: 'AAC音频' },
    'audio/webm': { extension: '.webm', description: 'WebM音频' }
  },

  // ========== 视频类型 ==========
  video: {
    'video/mp4': { extension: '.mp4', description: 'MP4视频', compatibility: '最好' },
    'video/webm': { extension: '.webm', description: 'WebM视频' },
    'video/ogg': { extension: '.ogv', description: 'OGG视频' },
    'video/quicktime': { extension: '.mov', description: 'QuickTime视频' }
  },

  // ========== 字体类型 ==========
  font: {
    'font/woff': { extension: '.woff', description: 'WOFF字体', note: '旧版' },
    'font/woff2': { extension: '.woff2', description: 'WOFF2字体', recommendation: '推荐使用' },
    'font/ttf': { extension: '.ttf', description: 'TrueType字体' },
    'font/otf': { extension: '.otf', description: 'OpenType字体' },
    'font/eot': { extension: '.eot', description: 'Embedded OpenType', note: 'IE专用' },
    'application/font-sfnt': { extension: null, description: 'SFNT字体容器' }
  }
};


/**
 * Content-Type设置辅助工具
 * 根据数据类型自动设置正确的Content-Type
 */
class ContentTypeHelper {
  /**
   * 根据文件扩展名获取MIME类型
   * @param {string} filename - 文件名
   * @returns {string} MIME类型
   */
  static getMimeType(filename) {
    const ext = filename.split('.').pop()?.toLowerCase();
    
    const extToMime = {
      html: 'text/html',
      htm: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      json: 'application/json',
      txt: 'text/plain',
      xml: 'application/xml',
      pdf: 'application/pdf',
      zip: 'application/zip',
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      svg: 'image/svg+xml',
      webp: 'image/webp',
      ico: 'image/x-icon',
      mp3: 'audio/mpeg',
      mp4: 'video/mp4',
      webm: 'video/webm',
      woff: 'font/woff',
      woff2: 'font/woff2',
      ttf: 'font/ttf',
      otf: 'font/otf'
    };

    return extToMime[ext] || 'application/octet-stream';
  }

  /**
   * 根据数据类型自动确定Content-Type
   * @param {*} data - 要发送的数据
   * @param {Object} options - 选项
   * @returns {string} Content-Type值
   */
  static determineContentType(data, options = {}) {
    // 如果明确指定了Content-Type，直接使用
    if (options.contentType) {
      return options.contentType;
    }

    // 如果是FormData，浏览器会自动设置
    if (data instanceof FormData) {
      return undefined;  // 让浏览器自动处理
    }

    // 如果是File对象
    if (data instanceof File) {
      return data.type || this.getMimeType(data.name);
    }

    // 如果是URLSearchParams（表单数据）
    if (data instanceof URLSearchParams) {
      return 'application/x-www-form-urlencoded';
    }

    // 如果是对象或数组，使用JSON
    if (typeof data === 'object' && data !== null) {
      return 'application/json';
    }

    // 如果是字符串，根据选项判断
    if (typeof data === 'string') {
      if (options.isHTML) return 'text/html';
      if (options.isXML) return 'application/xml';
      return 'text/plain';
    }

    return 'application/octet-stream';
  }

  /**
   * 创建带有正确Content-Type的fetch请求
   * @param {string} url - 请求URL
   * @param {*} data - 请求数据
   * @param {Object} options - 其他选项
   * @returns {Promise<Response>}
   */
  static async fetchWithCorrectContentType(url, data, options = {}) {
    const contentType = this.determineContentType(data, options);
    
    let body = data;
    
    // 如果数据是对象且需要发送JSON，则序列化
    if (contentType === 'application/json' && typeof data === 'object' && !(data instanceof FormData)) {
      body = JSON.stringify(data);
    }

    const fetchOptions = {
      method: options.method || (data ? 'POST' : 'GET'),
      headers: {
        ...(contentType ? { 'Content-Type': contentType } : {}),
        ...options.headers
      },
      ...(body ? { body } : {})
    };

    return fetch(url, fetchOptions);
  }
}

// 使用示例
console.log('JSON文件的MIME类型:', ContentTypeHelper.getMimeType('config.json'));
console.log('PNG图片的MIME类型:', ContentTypeHelper.getMimeType('avatar.png'));
console.log('对象的Content-Type:', ContentTypeHelper.determineContentType({ a: 1 }));
```

---

### 2.7 HTTP 是无状态协议

**无状态**（Stateless）是 HTTP 最核心的特性之一，意味着：

> **服务器不会保存任何两次请求之间的状态信息。每个请求都是完全独立的，服务器处理完请求后就忘记了这次请求的一切。**

#### 2.7.1 无状态的含义与影响

```javascript
/**
 * HTTP无状态特性演示
 * 演示为什么需要Cookie和Session来维持状态
 */
class StatelessDemo {
  /**
   * 模拟无状态的HTTP服务器
   * 注意：这个"服务器"不会记住任何东西！
   */
  constructor() {
    // 注意：这里没有任何存储用户状态的变量
    // 这就是"无状态"的含义
  }

  /**
   * 处理登录请求
   * 服务器验证用户名密码，但不会记住谁登录了
   * @param {Object} credentials - 登录凭证
   * @returns {Object} 登录结果
   */
  handleLogin(credentials) {
    console.log('\n【处理登录请求】');
    console.log(`收到凭证: ${JSON.stringify(credentials)}`);

    // 验证凭证（假设）
    if (credentials.username === 'admin' && credentials.password === '123456') {
      console.log('✅ 验证通过！');
      
      // ⚠️ 关键点：服务器返回成功，但不会记住这个用户！
      // 下次请求来的时候，服务器完全不知道你是谁
      
      return {
        success: true,
        message: '登录成功',
        warning: '⚠️ 但服务器不会记住你！下次请求需要重新证明身份'
      };
    }

    return { success: false, message: '用户名或密码错误' };
  }

  /**
   * 处理获取用户信息的请求
   * 因为是无状态的，服务器不知道是谁在请求
   * @returns {Object} 响应
   */
  handleGetUserInfo() {
    console.log('\n【处理获取用户信息请求】');
    
    // 问题来了！服务器不知道是谁在请求
    // 因为上次登录的信息没有被保存
    
    return {
      error: '我不知道你是谁！',
      reason: 'HTTP是无状态的，我不记得之前的登录请求',
      solution: '请在每次请求中携带身份证明（如Token/Cookie）'
    };
  }
}

// 演示无状态的问题
const server = new StatelessDemo();

// 第一次请求：登录
const loginResult = server.handleLogin({
  username: 'admin',
  password: '123456'
});

// 第二次请求：获取用户信息
const userInfoResult = server.handleGetUserInfo();

console.log('\n═══════════════════════════════════════');
console.log('结论：HTTP无状态意味着服务器不会记住任何东西');
console.log('═══════════════════════════════════════');
```

#### 2.7.2 无状态的优势与劣势

| 优势 | 劣势 |
|-----|------|
| **简单**：服务器不需要维护状态，实现简单 | **无法记住用户**：需要额外机制维持登录状态 |
| **可靠**：服务器故障恢复容易，无需同步状态 | **重复传输**：每次都要发送完整信息 |
| **可扩展**：易于水平扩展，负载均衡简单 | **用户体验差**：需要反复登录 |
| **高效**：减少了服务器内存消耗 | **安全性挑战**：需要在每次请求中传递凭证 |

---

### 2.8 Cookie 与 Session 机制

由于 HTTP 是无状态的，我们需要一种机制来在不同请求之间维持状态。**Cookie** 和 **Session** 就是最常用的两种方案。

#### 2.8.1 Cookie 详解

**Cookie** 是服务器发送到浏览器并保存在本地的一小块数据。浏览器会在后续请求中自动携带这些数据。

```javascript
/**
 * Cookie 完全指南
 * Cookie是在客户端（浏览器）存储状态的主要方式
 */
class CookieGuide {
  /**
   * Cookie的基本结构
   */
  static explainStructure() {
    console.log('═══════════════════════════════════════');
    console.log('           Cookie 结构详解');
    console.log('═══════════════════════════════════════\n');

    const cookieExample = 'session_id=abc123; Path=/; Domain=.example.com; Expires=Wed, 15 Jun 2027 08:00:00 GMT; Secure; HttpOnly; SameSite=Lax';
    
    console.log('Cookie示例:');
    console.log(cookieExample);
    console.log('');

    // 解析Cookie的各个属性
    const parts = {
      'Name=Value': {
        value: 'session_id=abc123',
        description: 'Cookie的名称和值，必需',
        encoding: '值通常需要进行URL编码'
      },
      'Path': {
        value: '/',
        description: 'Cookie有效的路径',
        detail: '只有访问该路径及子路径时才会发送此Cookie'
      },
      'Domain': {
        value: '.example.com',
        description: 'Cookie有效的域名',
        detail: '前面加点表示包含所有子域名'
      },
      'Expires': {
        value: 'Wed, 15 Jun 2027 08:00:00 GMT',
        description: 'Cookie的过期时间',
        alternative: '也可以使用 Max-Age（秒数）代替'
      },
      'Secure': {
        value: 'true',
        description: '只在HTTPS连接下发送',
        security: '防止中间人窃取Cookie'
      },
      'HttpOnly': {
        value: 'true',
        description: '禁止JavaScript访问此Cookie',
        security: '防止XSS攻击窃取Cookie'
      },
      'SameSite': {
        value: 'Lax',
        description: '跨站请求时的发送策略',
        options: {
          Strict: '完全不发送（最安全）',
          Lax: '导航请求发送，其他不发送（推荐）',
          None: '始终发送（需要Secure）'
        }
      }
    };

    for (const [name, info] of Object.entries(parts)) {
      console.log(`【${name}】`);
      console.log(`  值: ${info.value}`);
      console.log(`  说明: ${info.description}`);
      if (info.detail) console.log(`  详情: ${info.detail}`);
      if (info.security) console.log(`  🔒 安全: ${info.security}`);
      if (info.options) {
        console.log('  选项:');
        for (const [opt, desc] of Object.entries(info.options)) {
          console.log(`    - ${opt}: ${desc}`);
        }
      }
      console.log('');
    }
  }

  /**
   * JavaScript操作Cookie的方法
   */
  static showJsCookieOperations() {
    console.log('═══════════════════════════════════════');
    console.log('      JavaScript 操作 Cookie');
    console.log('═══════════════════════════════════════\n');

    /**
     * 设置Cookie
     * @param {string} name - Cookie名称
     * @param {string} value - Cookie值
     * @param {Object} options - Cookie选项
     */
    function setCookie(name, value, options = {}) {
      // Step 1: 构建Cookie字符串
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

      // Step 2: 添加可选属性
      if (options.expires) {
        // 可以是Date对象或天数
        const expires = options.expires instanceof Date 
          ? options.expires 
          : new Date(Date.now() + options.expires * 864e5);
        cookieString += `; expires=${expires.toUTCString()}`;
      }

      if (options.maxAge) {
        cookieString += `; max-age=${options.maxAge}`;
      }

      if (options.path) {
        cookieString += `; path=${options.path}`;
      }

      if (options.domain) {
        cookieString += `; domain=${options.domain}`;
      }

      if (options.secure) {
        cookieString += '; secure';
      }

      if (options.httpOnly) {
        // 注意：通过document.cookie设置的Cookie无法设置HttpOnly
        // HttpOnly只能通过服务器端设置
        console.warn('⚠️ HttpOnly只能通过服务器端Set-Cookie头设置');
      }

      if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
      }

      // Step 3: 设置Cookie
      document.cookie = cookieString;
      console.log(`✅ Cookie已设置: ${name}`);
    }

    /**
     * 获取Cookie值
     * @param {string} name - Cookie名称
     * @returns {string|null} Cookie值
     */
    function getCookie(name) {
      // 匹配指定的Cookie
      const match = document.cookie.match(
        new RegExp('(?:^|; )' + encodeURIComponent(name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)')
      );
      return match ? decodeURIComponent(match[1]) : null;
    }

    /**
     * 删除Cookie
     * @param {string} name - Cookie名称
     * @param {Object} options - 需要与设置时匹配的选项
     */
    function deleteCookie(name, options = {}) {
      // 删除Cookie的方法：设置过期时间为过去的时间
      setCookie(name, '', {
        ...options,
        'max-age': -1
      });
      console.log(`🗑️ Cookie已删除: ${name}`);
    }

    // 使用示例
    console.log('【设置Cookie示例】');
    setCookie('username', '张三', {
      maxAge: 3600,        // 1小时后过期
      path: '/',            // 全站有效
      secure: true,         // 仅HTTPS
      sameSite: 'Lax'       // SameSite策略
    });

    console.log('\n【读取Cookie示例】');
    const username = getCookie('username');
    console.log(`username的值: ${username}`);

    console.log('\n【删除Cookie示例】');
    deleteCookie('username', { path: '/' });
  }

  /**
   * Cookie的安全最佳实践
   */
  static showSecurityBestPractices() {
    console.log('═══════════════════════════════════════');
    console.log('      Cookie 安全最佳实践');
    console.log('═══════════════════════════════════════\n');

    const practices = [
      {
        practice: '设置 HttpOnly 标志',
        why: '防止 JavaScript 通过 document.cookie 读取 Cookie',
        protection: '防御 XSS（跨站脚本攻击）窃取 Session ID',
        code: 'Set-Cookie: session_id=xxx; HttpOnly'
      },
      {
        practice: '设置 Secure 标志',
        why: '只在 HTTPS 连接下才发送 Cookie',
        protection: '防止中间人攻击截获 Cookie',
        code: 'Set-Cookie: session_id=xxx; Secure',
        note: '生产环境强烈建议启用'
      },
      {
        practice: '设置 SameSite 属性',
        why: '控制跨站请求时 Cookie 的发送行为',
        protection: '防御 CSRF（跨站请求伪造）攻击',
        options: {
          'Strict': '最安全，所有跨站请求都不发送',
          'Lax': '推荐，允许顶级导航请求发送',
          'None': '需要配合 Secure 使用，适用于跨站需求'
        },
        code: 'Set-Cookie: session_id=xxx; SameSite=Lax'
      },
      {
        practice: '使用 Prefixes（前缀）',
        why: '强制浏览器遵循安全要求',
        types: {
          '__Host-': '必须设置 Secure、不能设置 Domain、Path必须是/',
          '__Secure-': '必须设置 Secure'
        },
        code: 'Set-Cookie: __Host-session_id=xxx; Secure; Path=/'
      },
      {
        practice: '定期轮换 Session ID',
        why: '即使 Cookie 被窃取，也会很快失效',
        recommendation: '登录成功后更换 Session ID，重要操作后也更换'
      },
      {
        practice: '避免在 Cookie 中存储敏感信息',
        why: 'Cookie 可能被截获或通过其他方式泄露',
        recommendation: '只存储 Session ID 或 Token，不要存储密码等敏感数据'
      }
    ];

    practices.forEach((p, index) => {
      console.log(`${index + 1}. ${p.practice}`);
      console.log(`   原因: ${p.why}`);
      console.log(`   保护: ${p.protection}`);
      if (p.code) console.log(`   示例: ${p.code}`);
      if (p.note) console.log(`   ⚠️ ${p.note}`);
      if (p.options) {
        console.log('   选项:');
        Object.entries(p.options).forEach(([k, v]) => {
          console.log(`     - ${k}: ${v}`);
        });
      }
      console.log('');
    });
  }
}

// 运行演示
CookieGuide.explainStructure();
CookieGuide.showJsCookieOperations();
CookieGuide.showSecurityBestPractices();
```

#### 2.8.2 Session 详解

**Session**（会话）是将用户的状态信息存储在**服务器端**的机制。服务器为每个用户创建一个唯一的 Session，并通过 Cookie 中的 Session ID 来关联。

```javascript
/**
 * Session 工作原理演示
 * Session数据存储在服务器端，只把Session ID发给客户端
 */
class SessionManager {
  constructor() {
    // 服务器端的Session存储（模拟）
    // 实际项目中通常使用Redis、数据库或内存存储
    this.sessions = new Map();
    
    // Session配置
    this.config = {
      sessionTimeout: 30 * 60 * 1000,  // 30分钟超时
      sessionIdLength: 32,              // Session ID长度
      cookieName: 'session_id',         // Cookie名称
      cookieOptions: {
        httpOnly: true,                 // 防止JS访问
        secure: true,                   // 仅HTTPS
        sameSite: 'Lax'                 // CSRF防护
      }
    };
  }

  /**
   * 创建新Session
   * @param {Object} userData - 用户数据
   * @returns {Object} 包含Set-Cookie头的对象
   */
  createSession(userData) {
    console.log('\n【创建Session】');

    // Step 1: 生成唯一的Session ID
    const sessionId = this.generateSessionId();
    console.log(`  生成Session ID: ${sessionId}`);

    // Step 2: 创建Session对象
    const session = {
      id: sessionId,
      data: {
        userId: userData.userId,
        username: userData.username,
        role: userData.role || 'user',
        loginTime: new Date().toISOString(),
        loginIP: userData.ip || 'unknown'
      },
      createdAt: Date.now(),
      lastAccessedAt: Date.now(),
      // 用于追踪Session的活动
      activityLog: [{
        action: 'login',
        timestamp: Date.now(),
        ip: userData.ip
      }]
    };

    // Step 3: 存储Session到服务器内存
    this.sessions.set(sessionId, session);
    console.log(`  Session已存储到服务器`);

    // Step 4: 返回Set-Cookie头，让浏览器保存Session ID
    const setCookieHeader = this.buildSetCookieHeader(sessionId);
    
    console.log(`  返回Set-Cookie头给浏览器`);
    
    return {
      success: true,
      setCookie: setCookieHeader,
      message: 'Session创建成功'
    };
  }

  /**
   * 验证Session
   * @param {string} sessionId - 从Cookie中获取的Session ID
   * @returns {Object|null} Session对象或null（无效）
   */
  validateSession(sessionId) {
    console.log('\n【验证Session】');

    // Step 1: 检查Session是否存在
    const session = this.sessions.get(sessionId);
    
    if (!session) {
      console.log(`  ❌ Session不存在或已过期`);
      return null;
    }

    // Step 2: 检查Session是否过期
    const elapsed = Date.now() - session.lastAccessedAt;
    if (elapsed > this.config.sessionTimeout) {
      console.log(`  ❌ Session已过期（${Math.round(elapsed/1000/60)}分钟未活动）`);
      this.destroySession(sessionId);
      return null;
    }

    // Step 3: 更新最后访问时间（滑动过期）
    session.lastAccessedAt = Date.now();
    
    // Step 4: 记录活动日志
    session.activityLog.push({
      action: 'access',
      timestamp: Date.now()
    });

    console.log(`  ✅ Session有效，用户: ${session.data.username}`);
    return session;
  }

  /**
   * 销毁Session（登出）
   * @param {string} sessionId - Session ID
   */
  destroySession(sessionId) {
    console.log('\n【销毁Session】');
    
    if (this.sessions.has(sessionId)) {
      this.sessions.delete(sessionId);
      console.log(`  ✅ Session已销毁: ${sessionId}`);
      
      // 返回清除Cookie的指令
      return {
        clearCookie: `${this.config.cookieName}=; Path=/; Max-Age=0`
      };
    }
    
    console.log(`  Session不存在: ${sessionId}`);
    return null;
  }

  /**
   * 生成安全的Session ID
   * @returns {string} 随机Session ID
   */
  generateSessionId() {
    // 使用crypto API生成随机字节
    const array = new Uint8Array(this.config.sessionIdLength);
    crypto.getRandomValues(array);
    
    // 转换为十六进制字符串
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * 构建Set-Cookie头
   * @param {string} sessionId - Session ID
   * @returns {string} Set-Cookie头的值
   */
  buildSetCookieHeader(sessionId) {
    const opts = this.config.cookieOptions;
    let header = `${this.config.cookieName}=${sessionId}`;
    
    header += '; Path=/';                              // 全站有效
    header += '; HttpOnly';                            // 防止JS访问
    if (opts.secure) header += '; Secure';             // 仅HTTPS
    if (opts.sameSite) header += `; SameSite=${opts.sameSite}`;  // CSRF防护
    header += `; Max-Age=${Math.round(this.config.sessionTimeout / 1000)}`;  // 过期时间
    
    return header;
  }

  /**
   * 获取当前活跃Session数量（监控用）
   */
  getActiveSessionCount() {
    const now = Date.now();
    let count = 0;
    
    for (const session of this.sessions.values()) {
      if (now - session.lastAccessedAt < this.config.sessionTimeout) {
        count++;
      }
    }
    
    return count;
  }
}

/**
 * 完整的Session工作流程演示
 */
function demonstrateSessionFlow() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║       Session 完整工作流程演示              ║');
  console.log('╚════════════════════════════════════════════╝');

  const sessionManager = new SessionManager();

  // ===== 场景1：用户登录 =====
  console.log('\n━━━ 场景1：用户登录 ━━━');
  
  // 用户提交登录表单
  const loginResult = sessionManager.createSession({
    userId: 'user_001',
    username: '张三',
    role: 'admin',
    ip: '192.168.1.100'
  });

  // 服务器返回Set-Cookie头
  console.log('\n服务器响应:');
  console.log(`  Set-Cookie: ${loginResult.setCookie}`);

  // 浏览器保存Cookie（模拟）
  const browserCookies = {};
  // 解析Set-Cookie并保存
  const cookieMatch = loginResult.setCookie.match(/session_id=([^;]+)/);
  if (cookieMatch) {
    browserCookies.session_id = cookieMatch[1];
    console.log('\n浏览器已保存Cookie:');
    console.log(`  session_id = ${browserCookies.session_id}`);
  }

  // ===== 场景2：用户访问需要登录的页面 =====
  console.log('\n━━━ 场景2：访问受保护的API ━━━');
  
  // 浏览器自动带上Cookie发起请求
  console.log('\n浏览器发起请求:');
  console.log(`  GET /api/user/profile`);
  console.log(`  Cookie: session_id=${browserCookies.session_id}`);

  // 服务器验证Session
  const session = sessionManager.validateSession(browserCookies.session_id);
  
  if (session) {
    console.log('\n服务器响应: 200 OK');
    console.log(`  返回用户数据: ${JSON.stringify(session.data)}`);
  }

  // ===== 场景3：用户登出 =====
  console.log('\n━━━ 场景3：用户登出 ━━━');
  
  const logoutResult = sessionManager.destroySession(browserCookies.session_id);
  if (logoutResult) {
    console.log('\n服务器响应:');
    console.log(`  Set-Cookie: ${logoutResult.clearCookie}`);
    console.log('\n浏览器已清除Cookie');
    delete browserCookies.session_id;
  }

  // ===== 场景4：尝试使用已失效的Session =====
  console.log('\n━━━ 场景4：使用已失效的Session ━━━');
  
  console.log('\n浏览器尝试使用旧的Session ID:');
  console.log(`  Cookie: session_id=${cookieMatch[1]}`);
  
  const invalidSession = sessionManager.validateSession(cookieMatch[1]);
  if (!invalidSession) {
    console.log('\n服务器响应: 401 Unauthorized');
    console.log('  请重新登录');
  }

  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║       演示结束                              ║');
  console.log('╚════════════════════════════════════════════╝');
}

// 运行完整演示
demonstrateSessionFlow();
```

#### 2.8.3 Cookie vs Session 对比

| 特性 | Cookie | Session |
|-----|--------|---------|
| **存储位置** | 客户端（浏览器） | 服务器端 |
| **存储容量** | 约4KB（每个Cookie） | 取决于服务器（通常无硬性限制） |
| **安全性** | 较低（可能被窃取或篡改） | 较高（数据不在客户端） |
| **服务器压力** | 无 | 有（需要存储和清理） |
| **跨域支持** | 可配置Domain属性 | 依赖于Cookie传递Session ID |
| **适用场景** | 存储偏好设置、非敏感信息 | 用户登录状态、购物车等 |
| **生命周期** | 可设置过期时间 | 通常配合超时机制 |

---

### 2.9 本章要点速查

| 知识点 | 要点总结 | 重要程度 |
|-------|---------|---------|
| **HTTP版本** | 0.9→1.0→1.1→2→3，目前1.1和2最常用 | ★★★★☆ |
| **请求方法** | GET(查询)/POST(创建)/PUT(替换)/PATCH(更新)/DELETE(删除) | ★★★★★ |
| **幂等性** | GET/PUT/DELETE幂等，POST/PATCH不幂等 | ★★★★☆ |
| **状态码** | 2xx成功/3xx重定向/4xx客户端错误/5xx服务器错误 | ★★★★★ |
| **报文结构** | 请求行+头部+空行+体；状态行+头部+空行+体 | ★★★★☆ |
| **URL组成** | scheme://host:port/path?query#fragment | ★★★★☆ |
| **Content-Type** | 用MIME类型标识数据格式（json/html/text等） | ★★★★★ |
| **无状态** | 服务器不保存请求间的状态 | ★★★★★ |
| **Cookie** | 客户端存储的小数据，随请求自动发送 | ★★★★★ |
| **Session** | 服务端存储的用户状态，通过Cookie中的ID关联 | ★★★★★ |
| **安全Cookie** | HttpOnly+Secure+SameSite 三件套 | ★★★★★ |

---

## 第3章 HTTPS 与 TLS

### 📚 本章学习目标

- 理解**对称加密**与**非对称加密**的原理和区别
- 掌握**数字证书**与 **CA**（证书颁发机构）体系的运作机制
- 深入理解 **TLS 1.2** 握手过程的每一个步骤
- 了解 **TLS 1.3** 的优化改进（0-RTT、1-RTT）
- 理解**证书链验证**过程
- 掌握 **HTTPS 性能优化**技术（Session Resumption、False Start、OCSP Stapling）

---

### 3.1 加密基础：对称与非对称加密

在理解 HTTPS 之前，我们必须先理解两种基本的加密方式。

#### 3.1.1 对称加密（Symmetric Encryption）

**对称加密**是指加密和解密使用**同一个密钥**的加密算法。

```
发送方: 明文 + 密钥 → 加密算法 → 密文
接收方: 密文 + 相同密钥 → 解密算法 → 明文
```

```javascript
/**
 * 对称加密原理演示
 * 使用Web Crypto API实现AES加密
 */
class SymmetricEncryptionDemo {
  constructor() {
    this.algorithm = {
      name: 'AES-GCM',        // AES-GCM模式（推荐）
      length: 256              // 256位密钥长度
    };
  }

  /**
   * 生成随机密钥
   * @returns {Promise<CryptoKey>} 加密密钥
   */
  async generateKey() {
    // 使用Web Crypto API生成AES-256密钥
    const key = await crypto.subtle.generateKey(
      this.algorithm,
      true,  // 可导出（用于演示）
      ['encrypt', 'decrypt']
    );
    console.log('✅ 对称密钥已生成 (AES-256-GCM)');
    return key;
  }

  /**
   * 加密数据
   */
  async encrypt(plaintext, key) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);
    const ciphertext = await crypto.subtle.encrypt(
      { name: this.algorithm.name, iv }, key, data
    );
    console.log(`✅ 加密完成: "${plaintext}" → ${ciphertext.byteLength}字节`);
    return { ciphertext: new Uint8Array(ciphertext), iv };
  }

  /**
   * 解密数据
   */
  async decrypt(ciphertext, iv, key) {
    const decrypted = await crypto.subtle.decrypt(
      { name: this.algorithm.name, iv }, key, ciphertext
    );
    return new TextDecoder().decode(decrypted);
  }
}
```

由于文件内容较长，我将分段继续追加剩余章节。请允许我继续写入第4章后续内容及第5-14章及附录。