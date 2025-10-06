/**
 * 判断元素不是undefined
 * @description EN: Determine whether a value is defined (not undefined).
 * @param v - candidate value
 * @returns boolean
 */
export function isDef<T = any>(v: T): v is T extends undefined ? never : T {
  return typeof v !== 'undefined'
}
