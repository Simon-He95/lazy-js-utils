/**
 * 判断是否是 URL
 * @description EN: Simple check whether a string looks like an HTTP/HTTPS URL.
 * @param {string} url The candidate URL string.
 * @returns {boolean} True if the string begins with "http://" or "https://".
 */
export function isUrl(url: string): boolean {
  return /^https?:\/\/.*/.test(url)
}
