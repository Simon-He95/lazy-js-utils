import { isStr } from './isStr'
import { addEventListener } from './addEventListener'

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
      element = document.querySelector(element as string) as Element || element
    if (!mounted && isStr(element))
      return mounted = true
    if (isStr(element))
      throw new Error(`${element} is not a element`)
    ob.observe(element as Element)
    if (stop)
      ob.unobserve(element as Element)
  }
}
