export function isDivElement(target: unknown): target is HTMLDivElement {
  return (target as HTMLDivElement)?.tagName?.toUpperCase() === 'DIV'
}
