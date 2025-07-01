import { parseTime } from './parseTime'

/**
 * 解析歌词字符串
 * 得到一个歌词对象的数组
 * 每个歌词对象包含 {time: 开始时间(秒), words: 歌词内容}
 * @param { string } lrc 歌词字符串，格式如 "[00:12.34]歌词内容"
 * @returns { ParseLrcResult[] } 解析后的歌词数组
 * @example
 * const lrc = `[00:12.34]第一句歌词
 * [00:25.67]第二句歌词`
 * parseLrc(lrc)
 * // => [
 * //   { time: 12.34, words: '第一句歌词' },
 * //   { time: 25.67, words: '第二句歌词' }
 * // ]
 */

interface ParseLrcResult {
  time: number
  words: string
}
export function parseLrc(lrc: string): ParseLrcResult[] {
  const lines = lrc.split('\n')
  return lines.reduce((result, str) => {
    // 过滤空行和无效行
    const trimmedStr = str.trim()
    if (
      !trimmedStr
      || !trimmedStr.startsWith('[')
      || !trimmedStr.includes(']')
    ) {
      return result
    }

    const parts = trimmedStr.split(']')
    if (parts.length < 2) {
      return result
    }

    const timeStr = parts[0].slice(1) // 移除开头的 '['
    const words = parts.slice(1).join(']').trim() // 处理歌词中可能包含 ']' 的情况

    try {
      const time = parseTime(timeStr)
      result.push({
        time,
        words,
      })
    }
    catch (error) {
      // 如果时间解析失败，跳过这一行
      console.warn(`Failed to parse time from: ${timeStr}`)
    }

    return result
  }, [] as ParseLrcResult[])
}
