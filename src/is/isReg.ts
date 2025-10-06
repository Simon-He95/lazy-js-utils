/**
 * 判断是否是正则
 * @description EN: Check whether a value is a RegExp instance.
 * @param o Candidate value.
 * @returns {o is RegExp} True when the value is a regular expression.
 */
export function isReg(o: any): o is RegExp {
  return typeof o === 'object' && o.constructor === RegExp
}
