/**
 * 判断是否是正则
 */
export function isReg(o: any): o is RegExp {
  return typeof o === 'object' && o.constructor === RegExp
}
