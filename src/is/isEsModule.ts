import type { IsESModule } from '../types'

/**
 * 判断对象是ESModule
 * @description EN: Detect if an object is an ES module (common __esModule or Symbol.toStringTag).
 * @param obj - candidate object
 * @returns boolean
 */
export function isESModule(obj: any): obj is IsESModule {
  return obj.__esModule || obj[Symbol.toStringTag] === 'Module'
}
