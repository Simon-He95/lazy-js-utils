/**
 * 判断输入的是否是英文
 */
export const isNameEn = (s: string) =>
  /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(s)
