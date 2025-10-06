import { isStr } from './isStr'

/**
 * 判断是否为 rem 单位字符串
 * @description EN: Returns true for strings ending with 'rem' (e.g. '1.2rem').
 * @param {unknown} value Candidate value.
 * @returns {value is string}
 */
export function isRem(value: unknown): value is string {
  return isStr(value) && value.endsWith('rem')
}
