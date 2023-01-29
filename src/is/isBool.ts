/**
 * 判断是否是boolean类型
 * @param value
 * @returns
 */
export function isBool(value: any): value is boolean {
  return typeof value === 'boolean'
}
