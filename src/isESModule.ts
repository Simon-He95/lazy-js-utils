import type { IsESModule } from './types'
export function isESModule(obj: any): obj is IsESModule {
  return obj.__esModule || obj[Symbol.toStringTag] === 'Module'
}
