/**
 * 判断是否是boolean类型
 * @description EN: Check whether a value is a boolean.
 * @param value - candidate value
 * @returns boolean
 */
export function isBool(value: any): value is boolean {
  return typeof value === 'boolean'
}
