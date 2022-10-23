import { isStr } from './isStr'
import { addEventListener } from './addEventListener'
import { findElement } from './findElement'
import { unmount } from './unmount'

export function useIntersectionObserver(element: Element | string, callback: (entries: IntersectionObserverEntry[]) => void, options?: IntersectionObserverInit): () => void {
  let mounted = false
  let stopped = false
  const ob = new IntersectionObserver(callback, options)
  update()
  addEventListener(document, 'DOMContentLoaded', update)
  const stop = () => {
    if (isStr(element))
      return stopped = true
    ob.unobserve(element)
  }
  unmount(() => stop?.())

  return stop

  function update() {
    if (isStr(element))
      element = findElement(element) || element
    if (!mounted && isStr(element))
      return mounted = true
    if (isStr(element))
      throw new Error(`${element} is not a element`)
    ob.observe(element)
    if (stopped)
      ob.unobserve(element as Element)
  }
}
