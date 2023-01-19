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
 *
 * @param { Element | string } element 元素
 * @param { (entries: IntersectionObserverEntry[]) => void } callback 元素可见回调
 * @param { IntersectionObserverOptions } options {}
 * @param { Element | Document | string | null } options.root 相对容器节点
 * @param { string } options.rootMargin 相对容器节点位置"10px 20px 30px 40px"
 * @param { number | number[] } options.threshold 相对容器节点百分比 [0, 0.25, 0.5, 0.75, 1]
 * @returns
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
    if (options?.root && isStr(options.root))
      options.root = findElement(options.root)
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
