import { isStr } from './isStr'

/**
 * 判断是否是vh
 */
export function isVh(value: unknown): value is string {
  return isStr(value) && value.endsWith('vh')
}
