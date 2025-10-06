import type { TrimType } from '../types'

/**
 * Trim whitespace from a string in different ways.
 *
 * @param s - input string
 * @param type - one of 'all' | 'pre' | 'around' | 'post'
 *  - 'all'   : remove all whitespace
 *  - 'pre'   : remove leading whitespace
 *  - 'post'  : remove trailing whitespace
 *  - 'around' (default) : remove leading and trailing whitespace
 * @returns trimmed string
 */
export function trim(s: string, type: TrimType = 'around'): string {
  if (type === 'pre')
    return s.replace(/(^\s*)/g, '')
  if (type === 'post')
    return s.replace(/(\s*$)/g, '')
  if (type === 'all')
    return s.replace(/\s+/g, '')
  if (type === 'around')
    return s.replace(/(^\s*)|(\s*$)/g, '')
  return s
}
