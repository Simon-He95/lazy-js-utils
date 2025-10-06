/**
 * 判断是否为 undefined
 * @description EN: Returns true when the value is exactly `undefined`.
 * @param o Candidate value.
 * @returns {o is undefined}
 */
export function isUndef(o: any): o is undefined {
  return typeof o === 'undefined'
}
