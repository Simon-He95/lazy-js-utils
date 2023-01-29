import { isStr } from './isStr'

/**
 * 判断是否是rem
 */
export const isRem = (value: unknown): value is string =>
  isStr(value) && value.endsWith('rem')
