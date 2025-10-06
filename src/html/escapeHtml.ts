/**
 * 转义html
 * @description EN: Escape HTML special characters in a string to their entity equivalents.
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
