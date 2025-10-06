/**
 * 判断是否是十六进制颜色值
 * @description EN: Check whether a string is a hex color (e.g. "#fff", "#ffffff").
 * @param {string} hex The input string to test.
 * @returns {boolean} True if the input matches a hex color pattern.
 */
export function isHex(hex: string) {
  return /^#[0-9A-F]{2,}$/i.test(hex)
}
