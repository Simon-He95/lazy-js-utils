export function escapeHtml(s: string): string {
  return s.replace(
    /[&<>'"]/g,
    tag =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\'': '&#39;', '"': '&quot;' }[
        tag
      ] || tag),
  )
}
