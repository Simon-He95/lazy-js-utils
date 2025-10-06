import { isStr } from '../is'
import { isRem } from '../is/isRem'
import { isVh } from '../is/isVh'
import { isVw } from '../is/isVw'
import { toNumber } from './toNumber'

/**
 * Convert various CSS length formats to a pixel number.
 *
 * Supports:
 * - numbers (returned as-is)
 * - '12px' => 12
 * - '2rem' => rem * root font-size
 * - '10vw'/'5vh' => percentage of viewport width/height
 * - other numeric strings parsed via `toNumber`
 * Falls back to 0 for unsupported formats (e.g. percentages without context).
 *
 * @param value - Input value (number or CSS length string)
 * @returns Pixel value as number
 */
export function toPxNum(value: unknown): number {
  if (value == null)
    return 0

  if (typeof value === 'number')
    return value

  const s = String(value).trim()

  if (s.endsWith('px'))
    return Number.parseFloat(s.replace('px', ''))

  if (isVw(s)) {
    const n = Number.parseFloat((s as string).replace('vw', ''))
    return (n * window.innerWidth) / 100
  }

  if (isVh(s)) {
    const n = Number.parseFloat((s as string).replace('vh', ''))
    return (n * window.innerHeight) / 100
  }

  if (isRem(s)) {
    const num = Number.parseFloat((s as string).replace('rem', ''))
    const rootFontSize
      = window.getComputedStyle(document.documentElement).fontSize || '16px'
    return num * Number.parseFloat(rootFontSize)
  }

  if (isStr(s))
    return toNumber(s)

  // unsupported (percentages, etc.)
  return 0
}
