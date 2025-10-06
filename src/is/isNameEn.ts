/**
 * 判断输入是否为英文姓名样式
 * @description EN: Simple heuristic to test for English name-like strings (letters and spaces, 2-22 chars).
 * @param {string} s Candidate string.
 * @returns {boolean}
 */
export function isNameEn(s: string) {
  return /(^[a-z][a-z\s]{0,20}[a-z]$)/i.test(s)
}
