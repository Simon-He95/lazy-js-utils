/**
 * 判断是否为字符串
 * @description EN: Check whether a value has type 'string'.
 * @param {any} o Candidate value.
 * @returns {o is string}
 */
export function isStr(o: any): o is string {
  return typeof o === 'string'
}
