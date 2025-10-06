/**
 * 判断是否是军官证
 * @description EN: Heuristic check for a soldier/officer ID string. This function uses a simple regex and may not cover all real-world formats; it is intended as a lightweight validator rather than authoritative verification.
 * @param {string} s Candidate ID string.
 * @returns {boolean} True when the string matches the expected pattern.
 */
export function isSoldierId(s: string) {
  return /^[\u4E00-\u9FA5](\u5B57\u7B2C)([0-9a-z]{4,8})(\u53F7?)$/i.test(s)
}
