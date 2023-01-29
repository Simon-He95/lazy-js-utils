/**
 * 判断是否是日期格式
 * @param d
 * @returns
 */
export function isDate(d: any): d is Date {
  return d instanceof Date
}
