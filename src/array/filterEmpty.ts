/**
 *
 * @param { any[] } array 数组
 * @returns 过滤空值后的数组
 */
export function filterEmpty<T>(array: T[]) {
  return array.filter(Boolean)
}
