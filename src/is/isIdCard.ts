/**
 * 判断是否是身份证
 * @param s
 * @returns
 */
export function isIdCard(s: string): boolean {
  return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|12]\d)|3[01])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|12]\d)|3[01])\d{3}([0-9X])$/.test(
    s,
  )
}
