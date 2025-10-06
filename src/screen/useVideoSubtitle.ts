import { toArray } from '../to/toArray'

interface UseVideoSubtitle {
  start: number
  duration?: number
  end?: number
  left: number
  top: number
  content: string
}

/**
 * 生成弹幕内容
 * @param options
 * @param name
 */
export function useVideoSubtitle(options: UseVideoSubtitle[], name = 'zh') {
  /**
   * @description EN: Generate subtitle (VTT-like) content from a list of timed subtitle objects.
   */
  const result = toArray(options)
    .map(option => getTitle(option as UseVideoSubtitle))
    .join('\n')
  return result
  // generateVtt(result, name)
}

function getTitle(options: UseVideoSubtitle) {
  const { start, end, left, top, content, duration } = options
  const startTime = getTime(start)
  const endTime = getTime(end || start + (duration ?? 0))
  const result = `${startTime} --> ${endTime} line:${left}% position:${top}% ${content}`
  return result
}

function getTime(t: number) {
  const _ss = Math.floor(t / 1000)
  const ttt = addZero(t % 1000, 3) // ms
  const _mm = Math.floor(_ss / 60) // mm
  const ss = addZero(_ss % 60, 2)
  const hh = addZero(Math.floor(_mm / 60), 2)
  const mm = addZero(_mm % 60, 2)
  return `${hh}:${mm}:${ss}.${ttt}`
}

function addZero(n: number, len: number) {
  if (String(n).length === len)
    return n
  const l = len - String(n).length
  return '0'.repeat(l) + n
}

// function generateVtt(content: string, name: string) {
//   fsp.writeFile(`${name}.vtt`, content, 'utf-8')
// }
