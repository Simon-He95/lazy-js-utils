/**
 * 判断是否是相对路径
 */
/**
 * 判断路径是否为相对路径
 * @description EN: Returns true for strings starting with './' or '../'.
 * @param {string} str Path string.
 * @returns {boolean}
 */
export function isRelative(str: string): boolean {
  return /^(\.\.\/|\.\/)/.test(str)
}
