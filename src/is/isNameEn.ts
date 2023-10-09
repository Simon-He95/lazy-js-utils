/**
 * 判断输入的是否是英文
 */
export function isNameEn(s: string) {
  return /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(s)
}
