import { addEventListener } from './addEventListener'
import { findElement } from './findElement'
import { isStr } from './isStr'

export function insertElement(parent: HTMLElement | string, element: HTMLElement | string, target?: HTMLElement | null): void {
  let isMounted = false
  let hasMounted = false
  update()
  addEventListener(document, 'DOMContentLoaded', update)
  function update() {
    if (hasMounted)
      return
    if (isStr(parent))
      parent = findElement(parent) || parent
    if (isStr(element))
      element = findElement(element) || element
    if (!isMounted && (isStr(parent) || isStr(element)))
      return isMounted = true
    if (isStr(parent))
      throw new Error(`${parent} is not a HTMLElement`)
    if (isStr(element))
      throw new Error(`${element} is not a HTMLElement`);
    (parent as HTMLElement).insertBefore(element as HTMLElement, target === undefined ? (parent as HTMLElement).firstChild : target)
    hasMounted = true
  }
}
