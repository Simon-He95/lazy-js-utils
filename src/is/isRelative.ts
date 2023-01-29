/**
 * 判断是否是相对路径
 */
export function isRelative(str: string): boolean {
  return /^(\.\.\/|\.\/)/.test(str)
}
