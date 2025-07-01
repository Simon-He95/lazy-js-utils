import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // 配置测试环境
  },
  assetsInclude: ['**/*.lrc'], // 让 Vite 将 .lrc 文件视为资源
})
