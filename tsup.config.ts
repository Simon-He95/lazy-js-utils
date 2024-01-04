import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'tsup',
  target: 'node14',
  format: ['cjs', 'esm'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  entryPoints: ['src/index.ts'],
  define: {
    __DEV__: 'false',
  },
  bundle: true,
  external: [
    'vite',
    'vue',
    'vue/compiler-sfc',
    'webpack',
    'rollup',
    'esbuild',
    'tsup',
    'spark-md5',
    'qrcode',
    'htmlparser2',
    '@vueuse/core',
  ],
  platform: 'node',
})
