/**
 * 判断是否是绝对路径
 * @description EN: Return true when the provided path looks like an absolute path. Matches Unix absolute paths, Windows drive letters, or leading slashes/backslashes.
 * @param {string} url Path or URL string to test.
 * @returns {boolean} True when the path appears absolute.
 */
export function isAbsolute(url: string): boolean {
  return /^\/|^\\|^[a-z]:[/\\]/i.test(url)
}
