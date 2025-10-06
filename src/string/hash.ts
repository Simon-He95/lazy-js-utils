/**
 * Fast string hash that returns a small alphanumeric token for the input.
 * This is non-cryptographic and intended for short, human-friendly keys.
 *
 * @param str - input string to hash
 * @returns 6-character base36 hash string
 */
export function hash(str: string) {
  let i
  let l
  let hval = 0x811C9DC5

  for (i = 0, l = str.length; i < l; i++) {
    hval ^= str.charCodeAt(i)
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24)
  }
  return `00000${(hval >>> 0).toString(36)}`.slice(-6)
}
