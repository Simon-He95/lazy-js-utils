import { isStr } from './isStr'
import { addEventListener } from './addEventListener'
import { findElement } from './findElement'

export function useIntersectionObserver(element: Element | string, callback: (entries: IntersectionObserverEntry[]) => void, options?: IntersectionObserverInit): () => void {
  let mounted = false
  let stop = false
  const ob = new IntersectionObserver(callback, options)
  update()
  addEventListener(document, 'DOMContentLoaded', update)
  return () => {
    if (isStr(element))
      return stop = true
    ob.unobserve(element as Element)
  }

  function update() {
    if (isStr(element))
      element = findElement(element) || element
    if (!mounted && isStr(element))
      return mounted = true
    if (isStr(element))
      throw new Error(`${element} is not a element`)
    ob.observe(element as Element)
    if (stop)
      ob.unobserve(element as Element)
  }
}
