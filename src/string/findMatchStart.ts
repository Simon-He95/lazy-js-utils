const matchMap = {
  '}': '{',
  ']': '[',
  ')': '(',
}
/**
 * 查找匹配符号的结束偏移量
 *
 * @param matchStr - 要匹配的符号
 * @param code - 包含符号的代码字符串
 * @returns 匹配符号的结束偏移量
 * @throws 如果在代码字符串中找不到匹配符号的结束偏移量，则抛出错误
 */
export function findMatchStartOffset(matchStr: string, code: string) {
  let offset = 0
  let dep = 0
  if (!code.length)
    return offset
  for (let i = code.length - 1; i > 0; i--) {
    const cur = code[i]
    if (cur === matchStr && dep === 0)
      return offset
    if (cur in matchMap) {
      dep++
    }
    else if (dep && Object.values(matchMap).includes(cur)) {
      dep--
    }
    if (cur === matchStr && dep === 0)
      return offset
    offset++
  }
  throw new Error(`Can't find match start offset for ${matchStr} in ${code}`)
}

console.log(
  findMatchStartOffset(
    '(',
    `<script setup>
// asdas

fn({name: 'simon',})`,
  ),
)
