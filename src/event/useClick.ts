import type { MaybeElement } from '../types'
import { mount } from '../utils/mount'
import { useEventListener } from './useEventListener'

/**
 * Attach a click listener to a target (element or selector).
 * The listener will be mounted when the element becomes available and can be stopped.
 *
 * @param target - A DOM element, selector string, or Document to attach the listener to
 * @param callback - MouseEvent handler
 * @returns A function that stops the listener. If called before the element exists, it will cancel mounting.
 */
export function useClick(
  target: MaybeElement | Document,
  callback: (e: MouseEvent) => void,
) {
  let stop: () => void
  let stopped = false
  mount(target, (target) => {
    stop = useEventListener(target as Element, 'click', callback)
    if (stopped)
      stop?.()
  })
  return () => {
    if (!stop)
      return (stopped = true)
    stop?.()
  }
}
