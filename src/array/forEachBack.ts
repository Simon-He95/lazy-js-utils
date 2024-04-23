import { isArray } from '../is/isArray'

/**
 * forEach 逆序遍历
 * @param { T[] } arr 数组
 * @param { (item: T, i: number) => void } callback 回调
 * @returns
 */
export function forEachBack<T>(
  arr: T[],
  callback: (item: T, i: number) => void,
) {
  if (!isArray(arr))
    return arr
  const len = arr.length - 1
  for (let i = len; i >= 0; i--) callback(arr[i], i)
}
