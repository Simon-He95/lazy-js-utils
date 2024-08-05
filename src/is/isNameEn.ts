/**
 * 判断输入的是否是英文
 */
export function isNameEn(s: string) {
  return /(^[a-z][a-z\s]{0,20}[a-z]$)/i.test(s)
}
