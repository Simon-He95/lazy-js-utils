import { isArray } from './../is/isArray'
/**
 * 如果是数组直接返回否则封装成数组
 * @param { any } array
 * @returns
 */
export function toArray(array: any) {
  return isArray(array) ? array : [array]
}
