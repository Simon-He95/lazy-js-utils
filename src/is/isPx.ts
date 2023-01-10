import { isNum } from './isNum'
import { isStr } from './isStr'

export const isPx = (value: unknown): value is string | number =>
  (isStr(value) && value.endsWith('px')) || isNum(value)
