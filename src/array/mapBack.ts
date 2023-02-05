import { isArray } from './../is/isArray'

/**
 * map逆序遍历
 * @param { T[] } arr 数组
 * @param { (item: T, i: number) => any } callback 回调
 * @param { boolean } [reverse] 结果是否颠倒顺序
 * @returns
 */
export function mapBack<T>(
  arr: T[],
  callback: (item: T, i: number) => any,
  reverse?: boolean,
) {
  if (!isArray(arr))
    return arr
  const len = arr.length - 1
  const result = []
  for (let i = len; i >= 0; i--) {
    reverse
      ? result.push(callback(arr[i], i))
      : result.unshift(callback(arr[i], i))
  }
  return result
}
