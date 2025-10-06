import { isStr } from '../is/isStr'
import { mount } from '../utils/mount'
import { unmount } from '../utils/unmount'
import { findElement } from './findElement'

interface IntersectionObserverOptions {
  root?: Element | Document | string | null
  rootMargin?: string
  threshold?: number | number[]
}

/**
 * Observe intersection changes for an element and call callback with entries.
 * `options.root` may be a selector string; if so it will be resolved via `findElement`.
 *
 * @param element - Element or selector to observe
 * @param callback - Receives IntersectionObserverEntry[] when the observer fires
 * @param options - IntersectionObserver options (root may be selector string)
 * @returns A stop function that disconnects the observer
 */
export function useIntersectionObserver(
  element: Element | string,
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverOptions,
): () => void {
  let stopped = false
  let stop: () => void
  unmount(() => stop?.())
  mount(element, (element) => {
    if (options?.root && isStr(options.root)) {
      const r = findElement(options.root)
      options.root
        = r instanceof NodeList
          ? (r[0] as Element | null)
          : (r as Element | Document | null | undefined)
    }
    const ob = new IntersectionObserver(
      callback,
      options as IntersectionObserverInit,
    )
    ob.observe(element)
    stop = () => ob.disconnect()
    if (stopped)
      stop()
  })
  return () => {
    if (!stop)
      return (stopped = true)
    stop?.()
  }
}
