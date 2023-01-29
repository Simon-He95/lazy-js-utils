/**
 * 判断元素不是undefined
 * @param v
 * @returns
 */
export function isDef<T = any>(v: T): v is T extends undefined ? never : T {
  return typeof v !== 'undefined'
}
