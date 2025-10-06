/**
 * 判断是否是函数
 * @description EN: Check whether a value is a function.
 * @param o - candidate value
 * @returns boolean
 */
export function isFn(o: any): o is Function {
  return typeof o === 'function'
}
