import { isNum } from '../is/isNum'

/**
 * Generate a UUID-like string.
 *
 * If `len` is provided a random string of that length is returned using the
 * provided radix. Otherwise a RFC-like UUID of 36 chars is returned.
 *
 * @param {number} [len] Length of id to generate.
 * @param {number|'hex'} [radix] Radix to use for character selection or 'hex'.
 * @returns {string} Generated id string.
 */
export function uuid(len?: number, radix?: number | 'hex') {
  const chars
    = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  radix = radix || chars.length
  if (len) {
    const num = isNum(radix) ? (radix as number) : 36
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * num)]
  }
  else {
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | (Math.random() * (chars.length as number))]
    }

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        const r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}
