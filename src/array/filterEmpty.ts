/**
 *
 * @param {any[]}array 数组
 * @returns 过滤空值后的数组
 */
export function filterEmpty(array: any[]) {
  return array.filter(Boolean)
}
