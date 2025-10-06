import type { MaybeElement } from '../types'
import { mount } from '../utils/mount'
import { useEventListener } from './useEventListener'

/**
 * Listen for hover enter/leave on a target and invoke callback with the hover state.
 *
 * @param target - Element or selector to observe
 * @param callback - Called with (isHover, event)
 * @returns A function that stops both listeners
 */
export function useHover(
  target: MaybeElement,
  callback: (isHover: boolean, e: MouseEvent) => void,
): () => void {
  let stopped = false
  const stop: (() => void)[] = []
  mount(target, (target) => {
    stop.push(useEventListener(target, 'mouseenter', e => callback(true, e)))
    stop.push(useEventListener(target, 'mouseleave', e => callback(false, e)))
    if (stopped)
      stop.forEach(stop => stop())
  })
  return () => {
    if (!stop.length)
      return (stopped = true)
    stop.forEach(fn => fn())
  }
}
