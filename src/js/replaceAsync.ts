import { isFn } from '../is/isFn'
import { isStr } from '../is/isStr'

/**
 * @description EN: Perform asynchronous replacements on matches in a string using a sync or async replacer.
 * @param {string} str The source string
 * @param {string|RegExp} searchValue Pattern to search for
 * @param {string|Function} replaceValue Replacement string or async replacer function
 */
export async function replaceAsync(
  str: string,
  searchValue: string | RegExp,
  replaceValue: string | ((...args: any[]) => string | Promise<string>),
): Promise<string> {
  // 创建正则表达式
  const regex = isStr(searchValue) ? new RegExp(searchValue, 'g') : searchValue

  // 如果没有匹配项，直接返回原字符串
  const matches = str.match(regex)
  if (!matches)
    return str

  let result = ''
  let lastIndex = 0

  // 使用正则表达式的 exec 方法，获取匹配项和位置
  let match
  while ((match = regex.exec(str)) !== null) {
    const matchedString = match[0] // 当前匹配
    const index = match.index // 当前匹配的起始索引

    // 将非匹配部分添加到结果中
    result += str.slice(lastIndex, index)

    // 将捕获组参数传递给替换函数
    const replacement = isFn(replaceValue)
      ? await replaceValue(...match, match.index) // 使用扩展运算符传递所有捕获组
      : replaceValue

    // 将替换内容添加到结果中
    result += replacement

    // 更新最后一个匹配的索引
    lastIndex = index + matchedString.length
  }

  // 添加剩余部分
  result += str.slice(lastIndex)
  return result
}
