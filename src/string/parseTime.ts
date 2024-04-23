/**
 * 将时间字符串解析为数字 (秒)
 * '01:02:03' => 1 * 60 * 60 + 2 * 60 + 3
 * @param { string } timeStr 字符串
 * @returns number
 */
export function parseTime(timeStr: string) {
  const parts = timeStr.split(':')
  const len = parts.length - 1
  return parts.reduce((pre, cur, i) => pre + +cur * 60 ** (len - i), 0)
}

// console.log(parseTime('01:02:03'))
