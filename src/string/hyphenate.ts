/**
 * 将大驼峰转为xx-xx
 * @param { string } s 字符串
 * @returns string
 */
export function hyphenate(s: string): string {
  return s.replace(/([A-Z])/g, '-$1').toLowerCase()
}
