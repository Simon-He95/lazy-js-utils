import { isNum } from './isNum'
import { isStr } from './isStr'

/**
 * 判断是否是px
 */
export function isPx(value: unknown): value is string | number {
  return (isStr(value) && value.endsWith('px')) || isNum(value)
}
