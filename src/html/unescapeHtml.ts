export function unescapeHtml(s: string): string {
  return s.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&#39;': '\'', '&quot;': '"' }[
        tag
      ] || tag),
  )
}
