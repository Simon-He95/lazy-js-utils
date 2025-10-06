/**
 * Remove an element from the DOM.
 *
 * Accepts an HTMLElement (or ChildNode/DocumentFragment) or a selector string.
 * If a selector is provided it will be resolved via `findElement` (caller
 * should resolve before calling if passing a selector).
 *
 * @param el - Element or selector to remove
 * @returns the parent HTMLElement that contained the removed node, or null
 */
export function removeElement(
  el: HTMLElement | ChildNode | DocumentFragment | string,
): HTMLElement | null {
  const p = (el as HTMLElement).parentElement
  if (p)
    p.removeChild(el as HTMLElement)
  return p
}
