import { isStr } from './isStr'

/**
 * 判断是否是vw
 */
export function isVw(value: unknown): value is string {
  return isStr(value) && value.endsWith('vw')
}
