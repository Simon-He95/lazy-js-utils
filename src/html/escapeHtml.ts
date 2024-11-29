/**
 * 转义html
 * @param { string } s 字符串
 * @returns
 */
export function escapeHtml(s: string): string {
  return s.replace(
    /[&<>'"]/g,
    (tag: string) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\'': '&#39;', '"': '&quot;' }[
        tag
      ] || tag),
  )
}
