/**
 * 判断是否是绝对路径
 * @param url
 * @returns
 */
export function isAbsolute(url: string): boolean {
  return /^\/|^\\|^[a-zA-Z]:[/\\]/.test(url)
}
