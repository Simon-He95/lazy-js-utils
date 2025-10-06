import { isArray } from '../is/isArray'

/**
 * 反向遍历数组
 * @description EN: Iterate over an array from end to start, invoking the callback for each element.
 * @param {T[]} arr Input array.
 * @param {(item: T, i: number) => void} callback Callback called with value and index.
 * @returns {void}
 */
export function forEachBack<T>(
  arr: T[],
  callback: (item: T, i: number) => void,
): T[] {
  if (!isArray(arr))
    return arr
  const len = arr.length - 1
  for (let i = len; i >= 0; i--) callback(arr[i], i)
  return arr
}
