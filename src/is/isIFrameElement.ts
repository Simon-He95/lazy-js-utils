export function isIFrameElement(target: unknown): target is HTMLIFrameElement {
  return (target as HTMLIFrameElement)?.tagName?.toUpperCase() === 'IFRAME'
}
