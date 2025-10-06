import { isStr } from './isStr'

/**
 * 判断是否为 vw 单位字符串
 * @description EN: Returns true for strings ending with 'vw' (viewport width unit).
 * @param {unknown} value Candidate value.
 * @returns {value is string}
 */
export function isVw(value: unknown): value is string {
  return isStr(value) && value.endsWith('vw')
}
