import type { IsESModule } from '../types'

/**
 * 判断对象是ESModule
 * @param obj
 * @returns
 */
export function isESModule(obj: any): obj is IsESModule {
  return obj.__esModule || obj[Symbol.toStringTag] === 'Module'
}
