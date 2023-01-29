import { isStr } from './isStr'

/**
 * 判断是否是vh
 */
export const isVh = (value: unknown): value is string =>
  isStr(value) && value.endsWith('vh')
