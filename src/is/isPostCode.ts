/**
 * 判断是否是邮编
 */
export function isPostCode(s: string | number): boolean {
  return /^[1-9][0-9]{5}$/.test(s.toString())
}
