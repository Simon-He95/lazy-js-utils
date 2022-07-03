export function createElement(tag: string, attributes: Record<string, string>) {
  const el = document.createElement(tag)
  for (const key in attributes)
    el.setAttribute(key, attributes[key])

  return el
}
