import { findElement } from './findElement'
import { isStr } from './isStr'
import { addEventListener } from './addEventListener'

export function useHover(target: string | HTMLElement, callback: (isHover: boolean) => void) {
  let hasMounted = false
  let isMounted = false
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
    addEventListener(target, 'mouseenter', () => callback(true))
    addEventListener(target, 'mouseleave', () => callback(false))
    hasMounted = true
  }
}
