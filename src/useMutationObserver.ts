import { isStr } from './isStr'
import type { MutationObserverInit } from './types'
export function useMutationObserver(element: Element | string, callback: (...args: any[]) => void, options: MutationObserverInit = {}) {
  if (isStr(element))
    element = document.querySelector(element as string) as Element || element
  if (isStr(element))
    throw new Error(`${element} is not a Element`)
  const mutationObserver = new MutationObserver(callback)
  mutationObserver.observe(element as Element, options)
  return () => mutationObserver.disconnect()
}
