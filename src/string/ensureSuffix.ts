/**
 * 确保后缀有这个字符串
 * @param { string } suffix 后缀
 * @param { string } str 字符串
 * @returns
 */
export function ensureSuffix(suffix: string, str: string) {
  if (str.endsWith(suffix))
    return str
  return str + suffix
}
