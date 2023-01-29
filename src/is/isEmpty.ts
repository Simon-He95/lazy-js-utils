import { isArray } from './isArray'

/**
 * 判断元素是否为空
 * @param val
 * @returns
 */
export const isEmpty = (val: unknown) =>
  val === undefined
  || val === null
  || val === ''
  || (isArray(val) && !val.length)
