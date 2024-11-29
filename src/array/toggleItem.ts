import { removeItem } from './removeItem'

/**
 *
 * @param { Array<T> } arr 数组
 * @param { T } item
 */
export function toggleItem<T>(arr: Array<T>, item: T) {
  if (arr.includes(item))
    return removeItem(arr, item)

  arr.push(item)
  return arr
}
