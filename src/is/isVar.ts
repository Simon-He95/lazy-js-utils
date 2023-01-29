import { isStr } from './isStr'

/**
 * 判断是否是cssvar
 */
export const isVar = (value: unknown): value is string =>
  isStr(value) && value.startsWith('var(')
