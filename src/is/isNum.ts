/**
 * 判断是否是number类型
 */
export function isNum(o: any): o is number {
  return typeof o === 'number'
}
