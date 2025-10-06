import { isStr } from './isStr'

/**
 * 判断是否为 vh 单位字符串
 * @description EN: Returns true for strings ending with 'vh' (viewport height unit).
 * @param {unknown} value Candidate value.
 * @returns {value is string}
 */
export function isVh(value: unknown): value is string {
  return isStr(value) && value.endsWith('vh')
}
