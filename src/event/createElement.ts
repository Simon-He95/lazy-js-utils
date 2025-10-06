/**
 * Create a DOM element with optional attributes and innerHTML.
 *
 * @param tag - tag name to create (e.g. 'div')
 * @param attributes - optional attributes object to set on the element
 * @param innerHTML - optional innerHTML to insert
 * @param options - optional ElementCreationOptions for custom elements
 * @returns the created HTMLElement
 */
export function createElement<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  attributes?: Record<string, string>,
  innerHTML?: string,
  options?: ElementCreationOptions,
): HTMLElementTagNameMap[T] {
  const el = document.createElement(tag, options) as HTMLElementTagNameMap[T]
  if (!attributes)
    return el
  for (const key in attributes) el.setAttribute(key, attributes[key])
  if (innerHTML)
    el.innerHTML = innerHTML
  return el
}
