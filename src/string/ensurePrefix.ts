/**
 * Ensure the given string starts with the provided prefix. If it already
 * starts with the prefix, the original string is returned; otherwise the
 * prefix is prepended.
 *
 * @param prefix - prefix to ensure
 * @param str - input string
 * @returns string that starts with prefix
 */
export function ensurePrefix(prefix: string, str: string) {
  if (!str.startsWith(prefix))
    return prefix + str
  return str
}
