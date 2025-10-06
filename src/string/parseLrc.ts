import { parseTime } from './parseTime'

interface ParseLrcResult {
  time: number
  words: string
}

/**
 * Parse an LRC formatted lyrics string into an array of time/lyric pairs.
 * Each returned entry has the shape { time: seconds, words: string }.
 *
 * @param lrc - lyrics string using [MM:SS.xx] timestamp prefixes per line
 * @returns array of parsed lyric entries
 * @example
 * const lrc = `[00:12.34]First line\n[00:25.67]Second line`
 * parseLrc(lrc)
 */
export function parseLrc(lrc: string): ParseLrcResult[] {
  const lines = lrc.split('\n')
  return lines.reduce((result, str) => {
    const trimmedStr = str.trim()
    if (!trimmedStr || !trimmedStr.startsWith('[') || !trimmedStr.includes(']'))
      return result

    const parts = trimmedStr.split(']')
    if (parts.length < 2)
      return result

    const timeStr = parts[0].slice(1) // remove leading '['
    const words = parts.slice(1).join(']').trim() // handle ']' inside lyrics

    try {
      const time = parseTime(timeStr)
      result.push({ time, words })
    }
    catch (error) {
      // If parsing time fails, skip the line
      console.warn(`Failed to parse time from: ${timeStr}`)
    }

    return result
  }, [] as ParseLrcResult[])
}
