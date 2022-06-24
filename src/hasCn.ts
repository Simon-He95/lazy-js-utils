export function hasCn(s: string): boolean {
  return /[\u4E00-\u9FA5]/.test(s)
}
