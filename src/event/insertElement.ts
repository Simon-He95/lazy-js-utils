import { mount } from '../utils/mount'
import { isNull } from '../is/isNull'

/**
 * Insert an element into a parent node.
 *
 * `parent` may be an HTMLElement or a selector string (the implementation uses
 * `mount` which resolves strings). `element` may be an HTMLElement,
 * DocumentFragment, or HTML string. If `target` is supplied, the element is
 * inserted before that child; otherwise it is appended.
 *
 * @param parent - parent element or selector
 * @param element - element, fragment or HTML string to insert
 * @param target - optional node to insert before
 */
export function insertElement(
  parent: HTMLElement | string,
  element: HTMLElement | DocumentFragment | string,
  target?: HTMLElement | null,
): void {
  return mount(parent, element, (parent, element) =>
    (parent as HTMLElement).insertBefore(
      element as HTMLElement,
      isNull(target) ? null : target || (parent as HTMLElement).firstChild,
    ))
}
