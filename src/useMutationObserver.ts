import { isStr } from './isStr'
import { addEventListener } from './addEventListener'
import type { MutationObserverInit } from './types'
export function useMutationObserver(element: Element | string | ParentNode | null, callback: MutationCallback, options: MutationObserverInit = {}) {
  if (!element)
    return
  let isMounted = false
  let hasMounted = false
  let stopped = false
  let stop: () => void

  update()
  addEventListener(document, 'DOMContentLoaded', update)
  function update() {
    if (hasMounted)
      return
    if (isStr(element))
      element = document.querySelector(element as string) as Element || element
    if (!isMounted && isStr(element))
      return isMounted = true
    else if (isStr(element))
      throw new Error(`${element} is not a Element`)
    const mutationObserver = new MutationObserver(callback)
    mutationObserver.observe(element as Element, options)
    stop = () => mutationObserver.disconnect()
    hasMounted = true
    if (stopped)
      stop()
  }
  return () => {
    if (!stop)
      return stopped = true
    stop?.()
  }
}

