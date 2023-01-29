/**
 * 判读是否是函数
 * @param o
 * @returns
 */
export function isFn(o: any): o is Function {
  return typeof o === 'function'
}
