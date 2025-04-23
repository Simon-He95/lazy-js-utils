import { defineConfig } from 'tsdown'

export default defineConfig({
  target: 'node14',
  format: ['cjs', 'esm'],
  // splitting: true,
  // bundle: true,
  sourcemap: false,
  clean: true,
  dts: true,
  entry: [
    'src/index.ts',
    'src/node/index.ts',
    'src/worker/*.ts',
    'src/webComponent/index.ts',
    'src/vite/index.ts',
  ],
  define: {
    __DEV__: 'false',
  },
  external: ['spark-md5', 'qrcode', 'htmlparser2'],
  platform: 'node',
})
