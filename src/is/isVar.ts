import { isStr } from './isStr'

/**
 * 判断是否是cssvar
 */
export function isVar(value: unknown): value is string {
  return isStr(value) && value.startsWith('var(')
}
