/**
 * 判断是否为 HTML 注释
 * @description EN: Test whether a string looks like an HTML comment (<!-- ... -->).
 * Matches across newlines as well.
 * @param {string} s Input string.
 * @returns {boolean}
 */
export function isComment(s: string) {
  return /<!--[\s\S]*?-->/.test(s)
}
