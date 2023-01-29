import { isStr } from './isStr'

/**
 * 判断是否是vw
 */
export const isVw = (value: unknown): value is string =>
  isStr(value) && value.endsWith('vw')
