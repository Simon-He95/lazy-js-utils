import { isNum } from './isNum'
import { isStr } from './isStr'

/**
 * 判断是否是px
 */
export const isPx = (value: unknown): value is string | number =>
  (isStr(value) && value.endsWith('px')) || isNum(value)
