export function isNm(src: string) {
  return /^[^./\s]/.test(src)
}
