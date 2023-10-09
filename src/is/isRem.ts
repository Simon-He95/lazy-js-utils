import { isStr } from './isStr'

/**
 * 判断是否是rem
 */
export function isRem(value: unknown): value is string {
  return isStr(value) && value.endsWith('rem')
}
