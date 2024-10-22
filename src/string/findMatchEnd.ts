const matchMap = {
  '{': '}',
  '[': ']',
  '(': ')',
}
/**
 * 查找匹配符号的结束偏移量
 *
 * @param matchStr - 要匹配的符号
 * @param code - 包含符号的代码字符串
 * @returns 匹配符号的结束偏移量
 * @throws 如果在代码字符串中找不到匹配符号的结束偏移量，则抛出错误
 */
export function findMatchEndOffset(matchStr: string, code: string) {
  let offset = 0
  let dep = 0
  if (!code.length)
    return offset
  for (let i = 0; i < code.length; i++) {
    const cur = code[i]
    const next = code[i + 1]
    if (cur === matchStr && dep === 0)
      return offset
    if (cur in matchMap && next) {
      dep++
    }
    else if (dep && Object.values(matchMap).includes(cur)) {
      dep--
    }
    if (cur === matchStr && dep === 0)
      return offset
    offset++
  }
  throw new Error(`Can't find match end offset for ${matchStr} in ${code}`)
}
