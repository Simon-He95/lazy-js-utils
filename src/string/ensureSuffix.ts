/**
 * Ensure the given string ends with the provided suffix. If it already
 * ends with the suffix, the original string is returned; otherwise the
 * suffix is appended.
 *
 * @param suffix - suffix to ensure
 * @param str - input string
 * @returns string that ends with suffix
 */
export function ensureSuffix(suffix: string, str: string) {
  if (str.endsWith(suffix))
    return str
  return str + suffix
}
