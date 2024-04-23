/**
 * 将xx-xx转为xxXx 大驼峰格式
 * @param { string } s 字符串
 * @returns string
 */
export function camelize(s: string): string {
  return s.replace(/-(\w)/g, (all, letter) => letter.toUpperCase())
}
