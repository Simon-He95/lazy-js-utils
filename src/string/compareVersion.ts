/**
 * 比较两个版本字符串。
 *
 * @param {string} v1 - 第一个版本字符串。
 * @param {string} v2 - 第二个版本字符串。
 * @returns {number} - 如果 v1 大于 v2 返回 1，如果 v2 大于 v1 返回 -1，如果它们相等返回 0。
 */
export function compareVersion(v1: string, v2: string): number {
  const v1Arr = v1.split('.')
  const v2Arr = v2.split('.')
  const len = Math.max(v1Arr.length, v2Arr.length)
  for (let i = 0; i < len; i++) {
    const num1 = Number.parseInt(v1Arr[i] || '0')
    const num2 = Number.parseInt(v2Arr[i] || '0')
    if (num1 > num2) {
      return 1
    }
    else if (num1 < num2) {
      return -1
    }
  }
  return 0
}
