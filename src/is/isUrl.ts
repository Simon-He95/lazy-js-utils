/**
 * 判断是否是url
 */
export function isUrl(url: string): boolean {
  return /^http[s]?:\/\/.*/.test(url)
}
