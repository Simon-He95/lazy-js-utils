import { isUndef } from '../is/isUndef'

interface ForEachCallback<T> {
  (value: T, index: number, array: T[]): any
}
/**
 * 遍历数组并允许通过返回值提前退出
 * @description EN: Iterate over an array and allow early return if the callback returns a defined value.
 * @param {T[]} array Input array to iterate.
 * @param {(value: T, index: number, array: T[]) => any} callback Callback invoked for each element.
 * @returns {any} The first defined (non-undefined) return value from the callback, or undefined.
 */
export function forEach<T>(array: T[], callback: ForEachCallback<T>): any {
  for (let i = 0; i < array.length; i++) {
    const res = callback(array[i], i, array)
    if (!isUndef(res))
      return res
  }
  return undefined
}
