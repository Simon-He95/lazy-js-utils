import { addEventListener } from './addEventListener'
import { isStr } from './isStr'

export function insertElement(parent: HTMLElement | string, element: HTMLElement, target?: HTMLElement | null): void {
  let mounted = false
  update()
  addEventListener(document, 'DOMContentLoaded', update)
  function update() {
    if (isStr(parent))
      parent = document.querySelector(parent as string) as HTMLElement || parent
    if (!mounted && isStr(parent))
      return mounted = true
    if (isStr(parent))
      throw new Error(`${parent} is not a HTMLElement`);
    (parent as HTMLElement).insertBefore(element as HTMLElement, target === undefined ? (parent as HTMLElement).firstChild : target)
  }
}
