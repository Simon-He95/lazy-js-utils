export function isScriptElement(target: unknown): target is HTMLScriptElement {
  return (target as HTMLScriptElement)?.tagName?.toUpperCase() === 'SCRIPT'
}
