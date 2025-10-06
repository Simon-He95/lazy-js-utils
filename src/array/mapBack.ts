import { isArray } from './../is/isArray'

/**
 * 反向 map 操作（从后向前遍历）
 * @description EN: Map over an array in reverse order. Optionally return results reversed or in original order.
 * @param {T[]} arr Input array.
 * @param {(item: T, i: number) => any} callback Mapping callback.
 * @param {boolean} [reverse] When true, push results so the returned array is reversed; otherwise maintain original order.
 * @returns {any[]} Mapped array.
 */
export function mapBack<T, R = any>(
  arr: T[],
  callback: (item: T, i: number) => R,
  reverse?: boolean,
): R[] {
  if (!isArray(arr))
    return arr as any
  const len = arr.length - 1
  const result: R[] = []
  for (let i = len; i >= 0; i--) {
    reverse
      ? result.push(callback(arr[i], i))
      : result.unshift(callback(arr[i], i))
  }
  return result
}
