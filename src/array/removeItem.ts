import { isEqual } from '../is/isEqual'

/**
 *
 * @param { Array<unknown> } arr 数组
 * @param { unknown } item 数组中的一项
 * @returns 删除该项的数组
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
