import type { MutationObserverInit } from './types'
import { mount } from './mount'
import { unmount } from './unmount'
export function useMutationObserver(element: Element | string | ParentNode | null, callback: MutationCallback, options: MutationObserverInit = { childList: true }) {
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
      return stopped = true
    stop?.()
  }
}
