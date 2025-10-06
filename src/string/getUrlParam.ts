/**
 * Parse query parameters from a URL or a raw query string into an object.
 *
 * @param s - full URL or query string (if omitted, uses window.location.search)
 * @returns an object mapping keys to values, or undefined if no query present
 */
export function getUrlParam(s?: string): Record<string, string> | undefined {
  s = (s || window.location.search).split('?')[1]
  if (!s)
    return
  return s.split('&').reduce((pre, cur) => {
    const [key, value] = cur.split('=')
    pre[key] = value
    return pre
  }, {} as Record<string, string>)
}
