/**
 * 判断元素是HTMLElement
 * @description EN: Check whether a value is an HTMLElement.
 * @param element - candidate value
 * @returns boolean
 */
export function isElement(element: any): element is HTMLElement {
  return typeof element === 'object' && element instanceof HTMLElement
}
