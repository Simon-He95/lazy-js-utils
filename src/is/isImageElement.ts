export function isImageElement(target: unknown): target is HTMLImageElement {
  return (target as HTMLImageElement)?.tagName?.toUpperCase() === 'IMG'
}
