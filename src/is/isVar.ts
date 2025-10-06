import { isStr } from './isStr'

/**
 * 判断是否是 css 变量表达式 (var(...))
 * @description EN: Check whether a string is a CSS variable usage like "var(--x)".
 * @param {unknown} value Candidate value.
 * @returns {value is string} True when the value is a string starting with 'var('.
 */
export function isVar(value: unknown): value is string {
  return isStr(value) && value.startsWith('var(')
}
