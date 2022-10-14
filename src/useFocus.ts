import { findElement } from './findElement'
import { isStr } from './isStr'
import { addEventListener } from './addEventListener'

export function useFocus(target: string | HTMLElement) {
  let isMounted = false
  let hasMounted = false
  update()
  addEventListener(document, 'DOMContentLoaded', update)
  function update() {
    if (hasMounted)
      return
    if (isStr(target))
      target = findElement(target) as HTMLElement || target
    if (!isMounted && isStr(target))
      return isMounted = true
    else if (isStr(target))
      throw new Error(`${target} is not a Element`)
    findElement('input', target.parentElement!)?.focus()
    hasMounted = true
  }
}
