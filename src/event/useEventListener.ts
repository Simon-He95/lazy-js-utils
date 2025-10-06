import { mount } from '../utils/mount'
import { unmount } from '../utils/unmount'
import { useMutationObserver } from './useMutationObserver'

/**
 * Add an event listener to a target. The function supports Window, Document, Element,
 * MediaQueryList or selector string. Listener is automatically cleaned up when unmounted.
 *
 * @template T - Event name type from WindowEventMap & DocumentEventMap
 * @param target - Target to attach to (element, selector, window, document, or media query list)
 * @param eventName - Event name
 * @param callback - Event handler
 * @param useCapture - Options for addEventListener (capture or options object)
 * @param autoRemove - If true the listener will remove itself after first call
 * @returns A function that stops/removes the listener
 */
export function useEventListener<
  T extends keyof (WindowEventMap & DocumentEventMap),
>(
  target: Window | Document | Element | MediaQueryList | string,
  eventName: T,
  callback: (e: (WindowEventMap & DocumentEventMap)[T]) => void,
  useCapture?: boolean | AddEventListenerOptions,
  autoRemove?: boolean,
): () => void {
  let stopped = false
  let stop: () => void
  let animationStop: (() => void) | undefined
  if (eventName === 'DOMContentLoaded')
    stopped = true
  function event(e: (WindowEventMap & DocumentEventMap)[T]) {
    try {
      callback?.call?.(e.target, e)
    }
    catch (error: any) {
      animationStop?.()
      throw new Error(error)
    }
    if (autoRemove)
      stop()
  }
  unmount(() => stop?.())

  mount(target, (target) => {
    const originCall = (target as any)?.[eventName]
    const eventFunction = (e: Event) => {
      if (stopped)
        stop?.()
      try {
        const isRawEvent
          = originCall && originCall.toString().includes('() { [native code] }')
        if (!isRawEvent && originCall)
          originCall?.()
      }
      catch (error) {
        console.error(error)
      }
      event(e as (WindowEventMap & DocumentEventMap)[T])
    }
    target.addEventListener(eventName, eventFunction, useCapture)

    let mutationStop: (() => void) | undefined
    // Only observe DOM removal for Element targets
    if (target instanceof Element && target.parentNode) {
      mutationStop = useMutationObserver(target.parentNode, (mutations) => {
        for (const mutation of mutations) {
          for (const node of Array.from(mutation.removedNodes)) {
            if (node === target) {
              stop?.()
              mutationStop?.()
            }
          }
        }
      })
    }

    stop = () => {
      target.removeEventListener(eventName, eventFunction, useCapture)
      mutationStop?.()
    }
  })
  return () => {
    if (!stop)
      return (stopped = true)
    stop?.()
  }
}
