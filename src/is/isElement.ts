/**
 * 判断元素是HTMLElement
 * @param element
 * @returns
 */
export function isElement(element: any): element is HTMLElement {
  return typeof element === 'object' && element instanceof HTMLElement
}
