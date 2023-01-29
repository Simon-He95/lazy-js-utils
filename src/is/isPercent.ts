import { isStr } from './isStr'

/**
 * 判断是否是百分比
 */
export const isPercent = (value: unknown): value is string =>
  isStr(value) && value.endsWith('%')
