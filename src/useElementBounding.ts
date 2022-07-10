import { addEventListener } from './addEventListener'
import { isStr } from './isStr'

export function useElementBounding(element: Element | string, callback: (rect: DOMRect) => void) {
  let mounted = false
  update()
  addEventListener(document, 'DOMContentLoaded', update)
  return addEventListener(window, 'scroll', update)
  function update() {
    if (isStr(element))
      element = document.querySelector(element as string) as Element || element
    if (!mounted && isStr(element))
      return mounted = true
    if (isStr(element))
      throw new Error(`${element} is not a Element`)
    callback((element as Element).getBoundingClientRect())
  }
}
