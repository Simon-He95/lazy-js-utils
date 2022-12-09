export function createElement<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  attributes?: Record<string, string>,
  innerHTML?: string,
): HTMLElementTagNameMap[T] {
  const el = document.createElement(tag) as HTMLElementTagNameMap[T]
  if (!attributes)
    return el
  for (const key in attributes) el.setAttribute(key, attributes[key])
  if (innerHTML)
    el.innerHTML = innerHTML
  return el
}
