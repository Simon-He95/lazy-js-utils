import type { Options } from 'tsup'
import { deepMerge } from '../object'

export const unConfig = (options: Options = {}) =>
  deepMerge(
    {
      name: 'tsup',
      target: 'node14',
      minify: true,
      dts: {
        resolve: true,
        // build types for `src/index.ts` only
        // otherwise `Options` will not be exported by `tsup`, not sure how this happens, probably a bug in rollup-plugin-dts
        entry: './src/index.ts',
      },
    },
    options,
  )
