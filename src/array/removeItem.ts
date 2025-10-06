import { isEqual } from '../is/isEqual'

/**
 * 从数组中移除与指定项深度相等的第一个元素
 * @description EN: Remove the first array element that deeply equals the given item. Optionally mutate the original array.
 * @param {Array<T>} arr Input array.
 * @param {unknown} item Item to remove (deep equality via isEqual).
 * @param {boolean} [isOriginArray] When true, mutate the original array; otherwise return a new array.
 * @returns {Array<T>} Array with the item removed (or original if not found).
 */
export function removeItem<T>(
  arr: Array<T>,
  item: unknown,
  isOriginArray = true,
): Array<T> {
  if (arr.length) {
    const index: number = arr.findIndex(a => isEqual(a, item))
    if (index > -1) {
      if (isOriginArray) {
        arr.splice(index, 1)
        return arr
      }
      else {
        return arr.filter((_, i) => i !== index)
      }
    }
  }
  return arr
}
