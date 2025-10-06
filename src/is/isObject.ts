/**
 * 判断是否为对象类型
 * @description EN: Returns true for values with typeof 'object' (note: arrays/null are objects too).
 * @param {any} value Candidate value.
 * @returns {boolean}
 */
export function isObject(value: any): boolean {
  return typeof value === 'object'
}
