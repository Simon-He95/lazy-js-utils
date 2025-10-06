import { mount } from '../utils/mount'
import { unmount } from '../utils/unmount'
import type { MutationObserverInit } from '../types'

/**
 * Observe DOM mutations on a parent node and invoke callback when changes occur.
 *
 * @param element - The node or selector to observe
 * @param callback - MutationCallback invoked with mutations
 * @param options - MutationObserverInit options (defaults to { childList: true })
 * @returns A stop function to disconnect the observer
 */
export function useMutationObserver(
  element: Element | string | ParentNode | Text | null,
  callback: MutationCallback,
  options: MutationObserverInit = { childList: true },
) {
  if (!element)
    return
  let stopped = false
  let stop: () => void
  mount(element, (element) => {
    const mutationObserver = new MutationObserver(callback)
    mutationObserver.observe(element, options)
    stop = () => mutationObserver.disconnect()
    if (stopped)
      stop()
  })
  unmount(() => stop?.())
  return () => {
    if (!stop)
      return (stopped = true)
    stop?.()
  }
}
