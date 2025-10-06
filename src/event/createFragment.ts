/**
 * Create and return a DocumentFragment. Useful as a lightweight container
 * for building up DOM nodes before inserting them into the live document.
 *
 * @returns DocumentFragment
 */
export function createFragment() {
  return document.createDocumentFragment()
}
