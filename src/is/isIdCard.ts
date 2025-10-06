/**
 * 判断是否是身份证
 * @param s
 * @returns
 */
/**
 * 判断是否为身份证号（中国身份证格式的简单校验）
 * @description EN: Heuristic check for Chinese ID card numbers (15 or 18 digits with possible 'X').
 * @param {string} s Candidate ID string.
 * @returns {boolean}
 */
export function isIdCard(s: string): boolean {
  return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|12]\d)|3[01])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|12]\d)|3[01])\d{3}([0-9X])$/.test(
    s,
  )
}
