export function hyphenate(s: string): string {
  return s.replace(/([A-Z])/g, '-$1').toLowerCase()
}
