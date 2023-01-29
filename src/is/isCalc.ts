import { isStr } from './isStr'

/**
 * 判断字符串是calc()
 * @param value
 * @returns
 */
export const isCalc = (value: unknown): value is string =>
  isStr(value) && value.startsWith('calc(')
