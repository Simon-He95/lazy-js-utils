import { isDef } from '../is/isDef'

/**
 * 根据指定顺序对数组排序
 * @description EN: Sort items in `array` according to the given `order` sequence. Items not in `order` will be placed after ordered items. Use `key` to pick nested values (dot path supported).
 * @param {T[]} array The input array to sort.
 * @param {Array<string|number>} order An array specifying the desired order of values. Use "*" in `order` to mark the insertion index for remaining items.
 * @param {string} [key] Optional dot-separated key name to extract the value from objects in `array`.
 * @returns {T[]} A new array sorted according to `order`.
 */
export function sortByOrder<T>(
  array: T[],
  order: Array<string | number>,
  key?: string,
): T[] {
  if (!order || order.length === 0)
    return array

  const sortArr = array.slice()
  const result: T[] = []
  let insertIndex: number | undefined
  const _prop = key ? key.split('.') : undefined

  order.forEach((k, idx) => {
    const kk = String(k)
    if (kk === '*') {
      insertIndex = idx
      return
    }
    const index = sortArr.findIndex(item => getDepthVal(_prop, item) === kk)
    if (index !== -1) {
      result.push(sortArr[index])
      sortArr.splice(index, 1)
    }
  })

  if (isDef(insertIndex))
    result.splice(insertIndex, 0, ...sortArr)
  else result.push(...sortArr)

  return result

  function getDepthVal(_prop: string[] | undefined, item: any) {
    return _prop
      ? _prop.reduce((result: any, cur) => result?.[cur], item)
      : item
  }
}
