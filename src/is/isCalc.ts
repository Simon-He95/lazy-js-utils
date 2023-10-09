import { isStr } from './isStr'

/**
 * 判断字符串是calc()
 * @param value
 * @returns
 */
export function isCalc(value: unknown): value is string {
  return isStr(value) && value.startsWith('calc(')
}
