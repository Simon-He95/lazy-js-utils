/**
 * 判断是否是nodemodule依赖
 */
export function isNm(src: string) {
  return /^[^./\s]/.test(src)
}
