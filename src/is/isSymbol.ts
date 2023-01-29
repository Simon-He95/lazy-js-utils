/**
 * 判断是否是symbol类型
 */
export function isSymbol(o: any): o is symbol {
  return typeof o === 'symbol'
}
