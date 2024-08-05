/**
 * 判断是否是<! -- xxx -->注释
 * @param { string } s 字符串
 * @returns
 */
export function isComment(s: string) {
  return /<! -{2}.*?-{2}>/.test(s)
}
