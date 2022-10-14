export function createElement(tag: string, attributes?: Record<string, string>, innerHTML?: string) {
  const el = document.createElement(tag)
  if (!attributes)
    return el
  for (const key in attributes)
    el.setAttribute(key, attributes[key])
  if (innerHTML)
    el.innerHTML = innerHTML
  return el
}
