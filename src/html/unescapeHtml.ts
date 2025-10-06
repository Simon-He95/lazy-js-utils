/**
 * 反转义html
 * @description EN: Convert HTML entities back into their corresponding characters.
 * @param { string } s 字符串
 * @returns
 */
export function unescapeHtml(s: string): string {
  return s.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    (tag: string) =>
      ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&#39;': '\'', '&quot;': '"' }[
        tag
      ] || tag),
  )
}
