/**
 * Normalize repeated whitespace in a string by replacing runs of whitespace
 * characters with a single replacer string (default is a single space).
 *
 * @param str - input string
 * @param replacer - replacement for runs of whitespace (default: ' ')
 * @returns normalized string
 * @description EN: Replace consecutive whitespace characters with a single replacer string.
 */
export function spaceFormat(str: string, replacer = ' ') {
  return str.replace(/\s+/g, replacer)
}
