/**
 * 判断是否是symbol类型
 */
/**
 * 判断是否为 symbol
 * @description EN: Check whether a value has type 'symbol'.
 * @param {any} o Candidate value.
 * @returns {o is symbol}
 */
export function isSymbol(o: any): o is symbol {
  return typeof o === 'symbol'
}
