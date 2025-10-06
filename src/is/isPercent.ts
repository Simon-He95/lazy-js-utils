import { isStr } from './isStr'
/**
 * 判断是否为百分比字符串
 * @description EN: Returns true for strings ending with '%' (e.g. '50%').
 * @param {unknown} value Candidate value.
 * @returns {boolean}
 */
export function isPercent(value: unknown): value is string {
  return isStr(value) && value.endsWith('%')
}
