/**
 *
 * @param { Array<unknown> } arr 数组
 * @param { unknown } item 数组中的一项
 * @returns 删除该项的数组
 */
export function removeItem(arr: Array<unknown>, item: unknown) {
  if (arr.length) {
    const index: number = arr.indexOf(item)
    if (index > -1) return arr.splice(index, 1)
  }
}
