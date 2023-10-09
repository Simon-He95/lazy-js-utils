/**
 * 判断是否是军官证
 */
export function isSoldierId(s: string) {
  return /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/.test(s)
}
