/**
 * 判断是否是number类型
 */
/**
 * 判断是否为数字
 * @description EN: Check whether a value has type 'number'.
 * @param {any} o Candidate value.
 * @returns {o is number}
 */
export function isNum(o: any): o is number {
  return typeof o === 'number'
}
