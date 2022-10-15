import type { MutationObserverInit } from './types'
import { mount } from './mount'
export function useMutationObserver(element: Element | string | ParentNode | null, callback: MutationCallback, options: MutationObserverInit = { childList: true }) {
  if (!element)
    return
  let stopped = false
  let stop: () => void
  mount(element, (element) => {
    const mutationObserver = new MutationObserver(callback)
    mutationObserver.observe(element as Element, options)
    stop = () => mutationObserver.disconnect()
    if (stopped)
      stop()
  })
  return () => {
    if (!stop)
      return stopped = true
    stop?.()
  }
}
