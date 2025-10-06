import { isStr } from './isStr'

/**
 * 判断字符串是calc()
 * @description EN: Check whether a value is a CSS calc() string.
 * @param value - candidate value
 * @returns boolean
 */
export function isCalc(value: unknown): value is string {
  return isStr(value) && value.startsWith('calc(')
}
