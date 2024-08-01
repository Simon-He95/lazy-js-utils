/**
 * escapeRegExp
 * @description 对字符串中的特殊字符进行转义以在正则表达式中使用它
 * @param str string
 * @returns string
 */
export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
