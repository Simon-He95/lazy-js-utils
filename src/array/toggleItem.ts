import { removeItem } from './removeItem'

/**
 *
 * @param { Array<unknown> } arr 数组
 * @param { unknown } item
 */
export const toggleItem = (arr: Array<unknown>, item: unknown) => {
  arr.includes(item) ? removeItem(arr, item) : arr.push(item)
}
