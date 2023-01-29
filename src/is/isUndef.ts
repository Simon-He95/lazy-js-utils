/**
 * 判断是否是undefined
 */
export function isUndef(o: any): o is undefined {
  return typeof o === 'undefined'
}
