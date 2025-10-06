/**
 * 判断是否为 null 或 undefined
 * @description EN: Returns true when the value is strictly null or undefined.
 * @param {any} value Candidate value.
 * @returns {value is null | undefined}
 */
export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined
}
