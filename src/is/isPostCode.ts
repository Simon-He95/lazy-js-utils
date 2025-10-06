/**
 * 判断是否是邮编
 */
/**
 * 判断是否为邮政编码
 * @description EN: Simplified check for a 6-digit postal code (China-style).
 * @param {string|number} s Candidate value.
 * @returns {boolean}
 */
export function isPostCode(s: string | number): boolean {
  return /^[1-9]\d{5}$/.test(s.toString())
}
