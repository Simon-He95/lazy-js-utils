import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom', // 使用 jsdom 环境来模拟浏览器 DOM
  },
  assetsInclude: ['**/*.lrc'], // 让 Vite 将 .lrc 文件视为资源
})
