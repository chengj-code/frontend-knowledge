import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

const base = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/quiz/`
  : '/quiz/'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base,
  build: {
    outDir: '../docs/.vitepress/dist/quiz',
    emptyOutDir: false
  },
  server: {
    port: 5174,
    proxy: {
      '/data': {
        target: 'http://localhost:5174',
        rewrite: (path) => path
      }
    }
  }
})
