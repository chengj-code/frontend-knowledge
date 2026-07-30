import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const base = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/'

export default withMermaid(
  defineConfig({
    base,
    title: '前端知识库',
    description: '前端知识点体系化文档，涵盖前端各大核心模块的基础知识与面试题',
    lang: 'zh-CN',
    lastUpdated: true,
    cleanUrls: true,

    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    ],

    themeConfig: {
      logo: '/favicon.svg',

      nav: [
        { text: '首页', link: '/' },
        { text: '答题系统', link: 'https://chengj-code.github.io/frontend-knowledge/quiz/' },
        {
          text: '基础篇',
          items: [
            { text: 'HTML-CSS', link: '/html-css/basics' },
            { text: 'JavaScript', link: '/javascript/basics' },
            { text: 'TypeScript', link: '/typescript/basics' },
            { text: '浏览器', link: '/browser/basics' },
            { text: '网络', link: '/network/basics' }
          ]
        },
        {
          text: '框架篇',
          items: [
            { text: 'Vue', link: '/vue/basics' },
            { text: 'React', link: '/react/basics' },
            { text: 'VueUse', link: '/vueuse/' },
            { text: 'Node.js', link: '/nodejs/basics' }
          ]
        },
        {
          text: '工程化',
          items: [
            { text: '工程化', link: '/engineering/basics' },
            { text: '性能优化', link: '/performance/basics' },
            { text: '前端 AI', link: '/ai/basics' }
          ]
        },
        {
          text: '源码分析',
          items: [
            { text: 'Vue2 源码', link: '/source-code/vue2/basics' },
            { text: 'Vue3 源码', link: '/source-code/vue3/basics' },
            { text: 'React 源码', link: '/source-code/react/basics' }
          ]
        },
        {
          text: '面试题',
          items: [
            { text: 'HTML-CSS', link: '/html-css/interviews' },
            { text: 'JavaScript', link: '/javascript/interviews' },
            { text: 'TypeScript', link: '/typescript/interviews' },
            { text: 'Vue', link: '/vue/interviews' },
            { text: 'React', link: '/react/interviews' },
            { text: 'Node.js', link: '/nodejs/interviews' },
            { text: '工程化', link: '/engineering/interviews' },
            { text: '性能优化', link: '/performance/interviews' },
            { text: '浏览器', link: '/browser/interviews' },
            { text: '网络', link: '/network/interviews' },
            { text: '前端 AI', link: '/ai/interviews' }
          ]
        }
      ],

      sidebar: {
        '/html-css/': [
          {
            text: 'HTML-CSS',
            items: [
              { text: '基础知识', link: '/html-css/basics' },
              { text: '面试题库', link: '/html-css/interviews' }
            ]
          }
        ],
        '/javascript/': [
          {
            text: 'JavaScript',
            items: [
              { text: '基础知识', link: '/javascript/basics' },
              { text: '面试题库', link: '/javascript/interviews' }
            ]
          }
        ],
        '/typescript/': [
          {
            text: 'TypeScript',
            items: [
              { text: '基础知识', link: '/typescript/basics' },
              { text: '面试题库', link: '/typescript/interviews' }
            ]
          }
        ],
        '/vue/': [
          {
            text: 'Vue',
            items: [
              { text: '基础知识', link: '/vue/basics' },
              { text: '面试题库', link: '/vue/interviews' }
            ]
          }
        ],
        '/react/': [
          {
            text: 'React',
            items: [
              { text: '基础知识', link: '/react/basics' },
              { text: '面试题库', link: '/react/interviews' }
            ]
          }
        ],
        '/nodejs/': [
          {
            text: 'Node.js',
            items: [
              { text: '基础知识', link: '/nodejs/basics' },
              { text: '面试题库', link: '/nodejs/interviews' }
            ]
          }
        ],
        '/engineering/': [
          {
            text: '工程化',
            items: [
              { text: '基础知识', link: '/engineering/basics' },
              { text: '面试题库', link: '/engineering/interviews' }
            ]
          }
        ],
        '/performance/': [
          {
            text: '性能优化',
            items: [
              { text: '基础知识', link: '/performance/basics' },
              { text: '面试题库', link: '/performance/interviews' }
            ]
          }
        ],
        '/browser/': [
          {
            text: '浏览器',
            items: [
              { text: '基础知识', link: '/browser/basics' },
              { text: '面试题库', link: '/browser/interviews' }
            ]
          }
        ],
        '/network/': [
          {
            text: '网络',
            items: [
              { text: '基础知识', link: '/network/basics' },
              { text: '面试题库', link: '/network/interviews' }
            ]
          }
        ],
        '/ai/': [
          {
            text: '前端 AI',
            items: [
              { text: '基础知识', link: '/ai/basics' },
              { text: '面试题库', link: '/ai/interviews' }
            ]
          }
        ],
        '/source-code/vue2/': [
          {
            text: 'Vue2 源码解读',
            items: [
              { text: '基础知识', link: '/source-code/vue2/basics' },
              { text: '面试题库', link: '/source-code/vue2/interviews' }
            ]
          }
        ],
        '/source-code/vue3/': [
          {
            text: 'Vue3 源码解读',
            items: [
              { text: '基础知识', link: '/source-code/vue3/basics' },
              { text: '面试题库', link: '/source-code/vue3/interviews' }
            ]
          }
        ],
        '/source-code/react/': [
          {
            text: 'React 源码解读',
            items: [
              { text: '基础知识', link: '/source-code/react/basics' },
              { text: '面试题库', link: '/source-code/react/interviews' }
            ]
          }
        ],
        '/vueuse/': [
          {
            text: 'VueUse 学习指南',
            items: [
              { text: '总览说明', link: '/vueuse/' },
              { text: '编写规范', link: '/vueuse/STANDARDS' },
              { text: '学习进度', link: '/vueuse/PROGRESS' }
            ]
          },
          {
            text: '阶段 1：基础工具函数',
            items: [
              { text: '阶段总览', link: '/vueuse/stage-1/' },
              { text: '详细指南', link: '/vueuse/stage-1/detailed-guide' }
            ]
          },
          {
            text: '阶段 2：状态管理 Composable',
            items: [
              { text: '阶段总览', link: '/vueuse/stage-2/' },
              { text: 'useCounter', link: '/vueuse/stage-2/useCounter' },
              { text: 'useToggle', link: '/vueuse/stage-2/useToggle' }
            ]
          },
          {
            text: '阶段 3：定时器与生命周期管理',
            items: [
              { text: '阶段总览', link: '/vueuse/stage-3/' },
              { text: 'is.ts', link: '/vueuse/stage-3/is.ts' },
              { text: 'tryOnMounted', link: '/vueuse/stage-3/tryOnMounted' },
              { text: 'tryOnScopeDispose', link: '/vueuse/stage-3/tryOnScopeDispose' },
              { text: 'useInterval', link: '/vueuse/stage-3/useInterval' },
              { text: 'useIntervalFn', link: '/vueuse/stage-3/useIntervalFn' },
              { text: 'useTimeout', link: '/vueuse/stage-3/useTimeout' },
              { text: 'useTimeoutFn', link: '/vueuse/stage-3/useTimeoutFn' }
            ]
          },
          {
            text: '阶段 4：事件过滤器与函数增强',
            items: [
              { text: '阶段总览', link: '/vueuse/stage-4/' },
              { text: 'filters.ts', link: '/vueuse/stage-4/filters.ts' },
              { text: 'refDebounced', link: '/vueuse/stage-4/refDebounced' },
              { text: 'refThrottled', link: '/vueuse/stage-4/refThrottled' },
              { text: 'useDebounceFn', link: '/vueuse/stage-4/useDebounceFn' },
              { text: 'useThrottleFn', link: '/vueuse/stage-4/useThrottleFn' },
              { text: 'watchDebounced', link: '/vueuse/stage-4/watchDebounced' },
              { text: 'watchPausable', link: '/vueuse/stage-4/watchPausable' },
              { text: 'watchWithFilter', link: '/vueuse/stage-4/watchWithFilter' }
            ]
          },
          {
            text: '阶段 5：DOM 事件与浏览器 API',
            items: [
              { text: '阶段总览', link: '/vueuse/stage-5/' },
              { text: '可配置项约定', link: '/vueuse/stage-5/_configurable' },
              { text: 'useClipboard', link: '/vueuse/stage-5/useClipboard' },
              { text: 'useEventListener', link: '/vueuse/stage-5/useEventListener' },
              { text: 'useFullscreen', link: '/vueuse/stage-5/useFullscreen' },
              { text: 'useIdle', link: '/vueuse/stage-5/useIdle' },
              { text: 'useMounted', link: '/vueuse/stage-5/useMounted' },
              { text: 'useMouse', link: '/vueuse/stage-5/useMouse' },
              { text: 'useNetwork', link: '/vueuse/stage-5/useNetwork' },
              { text: 'useSupported', link: '/vueuse/stage-5/useSupported' },
              { text: 'useWindowSize', link: '/vueuse/stage-5/useWindowSize' }
            ]
          },
          {
            text: '阶段 6：高级 Composable',
            items: [
              { text: '阶段总览', link: '/vueuse/stage-6/' },
              { text: 'onClickOutside', link: '/vueuse/stage-6/onClickOutside' },
              { text: 'useDraggable', link: '/vueuse/stage-6/useDraggable' },
              { text: 'useStorage', link: '/vueuse/stage-6/useStorage' },
              { text: 'useVirtualList', link: '/vueuse/stage-6/useVirtualList' },
              { text: 'useWebSocket', link: '/vueuse/stage-6/useWebSocket' }
            ]
          },
          {
            text: '阶段 7：专家级抽象',
            items: [
              { text: '阶段总览', link: '/vueuse/stage-7/' },
              { text: 'until', link: '/vueuse/stage-7/until' },
              { text: 'useAnimate', link: '/vueuse/stage-7/useAnimate' },
              { text: 'useFetch', link: '/vueuse/stage-7/useFetch' },
              { text: 'useMagicKeys', link: '/vueuse/stage-7/useMagicKeys' }
            ]
          }
        ]
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/chengj-code/frontend-knowledge' }
      ],

      footer: {
        message: '基于 MIT 协议开源',
        copyright: 'Copyright © 2026 前端知识库'
      },

      search: {
        provider: 'local',
        options: {
          locales: {
            root: {
              translations: {
                button: {
                  buttonText: '搜索文档',
                  buttonAriaLabel: '搜索文档'
                },
                modal: {
                  noResultsText: '无法找到相关结果',
                  resetButtonTitle: '清除查询条件',
                  footer: {
                    selectText: '选择',
                    navigateText: '切换'
                  }
                }
              }
            }
          }
        }
      },

      outline: {
        label: '页面导航',
        level: [2, 3]
      },

      docFooter: {
        prev: '上一篇',
        next: '下一篇'
      },

      lastUpdated: {
        text: '最后更新于'
      },

      returnToTopLabel: '回到顶部',

      darkModeSwitchLabel: '外观',
      lightModeSwitchTitle: '切换到浅色模式',
      darkModeSwitchTitle: '切换到深色模式',

      sidebarMenuLabel: '菜单'
    },

    mermaid: {
      theme: 'default',
      themeVariables: {
        primaryColor: '#3eaf7c',
        primaryTextColor: '#fff',
        primaryBorderColor: '#3eaf7c',
        lineColor: '#666',
        secondaryColor: '#f9f9f9',
        tertiaryColor: '#fff'
      }
    },

    markdown: {
      lineNumbers: true,
      html: false,
      vPre: {
        blockCode: true
      },
      config(md) {
        const defaultRender = md.renderer.rules.code_inline || function(tokens, idx, options, env, slf) {
          return slf.renderToken(tokens, idx, options)
        }
        md.renderer.rules.code_inline = function(tokens, idx, options, env, slf) {
          const token = tokens[idx]
          const content = token.content
          if (content.includes('{{') || content.includes('}}') || content.includes('v-')) {
            return `<code v-pre>${md.utils.escapeHtml(content)}</code>`
          }
          return defaultRender(tokens, idx, options, env, slf)
        }
      }
    },

    ignoreDeadLinks: true
  })
)
