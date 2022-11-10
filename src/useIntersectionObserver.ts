import { isStr } from './isStr'
import { findElement } from './findElement'
import { unmount } from './unmount'
import { mount } from './mount'

interface IntersectionObserverOptions {
  root?: Element | Document | string | null
  rootMargin?: string
  threshold?: number | number[]
}

export function useIntersectionObserver(element: Element | string, callback: (entries: IntersectionObserverEntry[]) => void, options?: IntersectionObserverOptions): () => void {
  let stopped = false
  let stop: () => void
  unmount(() => stop?.())
  mount(element, (element) => {
    if (options?.root && isStr(options.root))
      options.root = findElement(options.root)
    const ob = new IntersectionObserver(callback, options as IntersectionObserverInit)
    ob.observe(element)
    stop = () => ob.disconnect()
    if (stopped)
      stop()
  })
  return () => {
    if (!stop)
      return stopped = true
    stop?.()
  }
}
