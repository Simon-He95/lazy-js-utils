/**
 * 反转义html
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
