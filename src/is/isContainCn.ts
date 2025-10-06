/**
 * 判断是否包含中文
 * @description EN: Returns true if the input string contains any CJK Unified Ideographs (Chinese characters).
 * @param s - input string
 * @returns boolean
 */
export function isContainCn(s: string): boolean {
  return /[\u4E00-\u9FA5]/.test(s)
}
