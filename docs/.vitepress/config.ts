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
        { text: '答题系统', link: '/quiz/' },
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
            { text: 'Node.js', link: '/nodejs/basics' }
          ]
        },
        {
          text: '工程化',
          items: [
            { text: '工程化', link: '/engineering/basics' },
            { text: '性能优化', link: '/performance/basics' }
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
            { text: '网络', link: '/network/interviews' }
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
