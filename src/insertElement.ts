import { addEventListener } from './addEventListener'
import { isStr } from './isStr'

export function insertElement(parent: HTMLElement | string, element: HTMLElement, target?: HTMLElement | null): void {
  let isMounted = false
  let hasMounted = false
  update()
  addEventListener(document, 'DOMContentLoaded', update)
  function update() {
    if (hasMounted)
      return
    if (isStr(parent))
      parent = document.querySelector(parent as string) as HTMLElement || parent
    if (!isMounted && isStr(parent))
      return isMounted = true
    if (isStr(parent))
      throw new Error(`${parent} is not a HTMLElement`);
    (parent as HTMLElement).insertBefore(element as HTMLElement, target === undefined ? (parent as HTMLElement).firstChild : target)
    hasMounted = true
  }
}
