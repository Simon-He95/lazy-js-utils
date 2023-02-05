/**
 * 确保前缀有这个字符串
 * @param { string } prefix 前缀
 * @param { string } str 字符串
 * @returns
 */
export function ensurePrefix(prefix: string, str: string) {
  if (!str.startsWith(prefix))
    return prefix + str
  return str
}
