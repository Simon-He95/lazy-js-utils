export function isStyleElement(target: unknown): target is HTMLStyleElement {
  return (target as HTMLStyleElement)?.tagName?.toUpperCase() === 'STYLE'
}
