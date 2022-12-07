import { isStr } from '../is/isStr'
import { mount } from '../utils/mount'
import { unmount } from '../utils/unmount'
import { findElement } from './findElement'

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
