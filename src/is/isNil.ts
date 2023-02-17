/**
 * 判断是否是null或undefined
 */
export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined
}
