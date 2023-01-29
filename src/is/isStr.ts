/**
 * 判断是否是字符串类型
 */
export function isStr(o: any): o is string {
  return typeof o === 'string'
}
