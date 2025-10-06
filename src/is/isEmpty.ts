import { isArray } from './isArray'
/**
 * 判断是否为空：undefined、null、空字符串 或 空数组
 * @description EN: Returns true for undefined, null, empty string, or empty arrays.
 * @param {unknown} val Candidate value to test.
 * @returns {boolean} True when the value is considered empty.
 */
export function isEmpty(val: unknown) {
  return (
    val === undefined
    || val === null
    || val === ''
    || (isArray(val) && !val.length)
  )
}
