import { trim } from '../string'

/**
 * Convert an `rgb(r,g,b)` CSS color string to hex format `#rrggbb`.
 *
 * Returns `undefined` when input doesn't match `rgb(...)` pattern.
 *
 * @param {string} style CSS rgb string, e.g. 'rgb(255, 255, 255)'.
 * @returns {string | undefined} Hex color string or undefined.
 */
export function rgbToHex(style: string) {
  const reg = /rgb\(([\w\s,]+)\)/

  const matcher = style.match(reg)
  if (!matcher)
    return

  const [_, color] = matcher
  const [r, g, b] = trim(color, 'all').split(',')

  return `#${((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1)}`
}

// console.log(rgbToHex('rgb(255,255,255)')) // #ffffff
