/**
 * 判断是否包含中文
 * @param s
 * @returns
 */
export function isContainCn(s: string): boolean {
  return /[\u4E00-\u9FA5]/.test(s)
}
