/**
 * 判断是否是日期格式
 * @description EN: Check whether a value is a Date instance.
 * @param d - candidate value
 * @returns boolean
 */
export function isDate(d: any): d is Date {
  return d instanceof Date
}
