import { addEventListener } from './addEventListener'
import { isStr } from './isStr'

export function useElementBounding(element: Element | string, callback: (rect: DOMRect) => void) {
  let isMounted = false
  let hasMounted = false
  update()
  addEventListener(document, 'DOMContentLoaded', update)
  return addEventListener(window, 'scroll', update)
  function update() {
    if (hasMounted)
      return
    if (isStr(element))
      element = document.querySelector(element as string) as Element || element
    if (!isMounted && isStr(element))
      return isMounted = true
    if (isStr(element))
      throw new Error(`${element} is not a Element`)
    callback?.((element as Element).getBoundingClientRect())
    hasMounted = true
  }
}
