import { isUndef } from '../is/isUndef'

interface ForEachCallback<T> {
  (value: T, index: number, array: T[]): any
}
/**
 *
 * @param {any[]} array 数组
 * @param {Function}callback ForEachCallback
 * @returns
 */
export function forEach<T>(array: T[], callback: ForEachCallback<T>): any {
  for (let i = 0; i < array.length; i++) {
    const res = callback(array[i], i, array)
    if (!isUndef(res))
      return res
  }
  return undefined
}
