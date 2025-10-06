/**
 * Escape special characters in a string so it can be used safely inside a
 * regular expression pattern.
 *
 * @param str - input string
 * @returns escaped string safe for use in RegExp constructors
 * @description EN: Escape special characters so the string can be used inside a RegExp pattern.
 */
export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
