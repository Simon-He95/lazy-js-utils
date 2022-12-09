import { mount } from '../utils/mount'
import { unmount } from '../utils/unmount'
import type { MutationObserverInit } from '../types'
export function useMutationObserver(
  element: Element | string | ParentNode | null,
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
