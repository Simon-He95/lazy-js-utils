/**
 * 判断是否为 null
 * @description EN: Check if a value is strictly `null`.
 * @param {any} o Candidate value.
 * @returns {o is null} True when the value is exactly null.
 */
export function isNull(o: any): o is null {
  return o === null
}
