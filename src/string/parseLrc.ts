import { parseTime } from './parseTime'

/**
 * 解析歌词字符串
 * 得到一个歌词对象的数组
 * 每个歌词对象
 * {time: 开始时间, words: 歌词内容}
 * @param lrc
 */

interface ParseLrcResult {
  time: number
  words: string
}
export function parseLrc(lrc: string) {
  const lines = lrc.split('\n')
  return lines.reduce((result, str) => {
    const parts = str.split(']')
    const timeStr = parts[0].slice(1)
    result.push({
      time: parseTime(timeStr),
      words: parts[1],
    })
    return result
  }, [] as ParseLrcResult[])
}
