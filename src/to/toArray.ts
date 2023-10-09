import { isArray } from './../is/isArray'

/**
 * 如果是数组直接返回否则封装成数组
 * @param { any } array
 * @returns T & any[]
 */
export function toArray<T>(array: T) {
  return isArray(array) ? array : [array]
}
