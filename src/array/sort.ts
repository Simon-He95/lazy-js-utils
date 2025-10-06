import { isType } from '../is/isType'

/**
 *
 * @param { any[] } array 数组
 * @param { Array<string | number> | number | string } match 匹配条件
 * @returns
 */
export function sort<T>(
  array: T[],
  match: Array<string | number> | number | string,
): T[] {
  /**
   * 数组排序，支持多字段和升降顺序
   * @description EN: Sort an array by specified fields. `match` can be a string/number or an array of fields; prefix a field with '-' for descending order.
   * @param {T[]} array Input array to sort.
   * @param {Array<string|number>|number|string} match Field(s) or mode to sort by (e.g. ['-age','name'] or '1').
   * @returns {T[]} Sorted array.
   */
  if (isType(match, 's|n'))
    match = [`${match}`] as string[]

  return (match as string[]).reduce((result, cur) => {
    let flag = false
    if (cur[0] === '-') {
      flag = true
      cur = cur.slice(1)
    }
    return result.sort((a: any, b: any) => {
      if (cur !== '1' && b[cur] === a[cur])
        return 0
      if (flag) {
        if (cur === '1')
          return b > a ? 1 : -1
        return b[cur] > a[cur] ? 1 : -1
      }
      if (cur === '1')
        return a > b ? 1 : -1
      return b[cur] > a[cur] ? -1 : 1
    })
  }, array)
}
