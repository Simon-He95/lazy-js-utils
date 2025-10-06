import { isNum } from './isNum'
import { isStr } from './isStr'

/**
 * 判断是否为 px 单位或数字
 * @description EN: Returns true for numbers or strings ending with 'px' (e.g. '12px').
 * @param {unknown} value Candidate value.
 * @returns {value is string | number}
 */
export function isPx(value: unknown): value is string | number {
  return (isStr(value) && value.endsWith('px')) || isNum(value)
}
