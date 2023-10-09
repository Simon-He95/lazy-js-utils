import { isStr } from './isStr'

/**
 * 判断是否是百分比
 */
export function isPercent(value: unknown): value is string {
  return isStr(value) && value.endsWith('%')
}
