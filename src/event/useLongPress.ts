import type { MaybeElement } from '../types'
import { mount } from '../utils/mount'
import { useEventListener } from './useEventListener'
import { useTimeout } from './useTimeout'

/**
 * Fire callback when the target receives a long mouse press (mousedown -> mouseup after ms).
 *
 * @param el - target element or selector
 * @param ms - duration threshold in milliseconds
 * @param callback - invoked when a long press is detected
 * @returns A stop function to remove listeners
 */
export function useLongPress(
  el: MaybeElement,
  ms: number,
  callback: () => void,
) {
  const stops: (() => void)[] = []
  let hasStopped = false
  mount(el, (el) => {
    let timerStop: () => void
    let start: number
    const evt = document.createEvent('Event')
    evt.initEvent('longpress', true, true)

    stops.push(
      useEventListener(
        el,
        'mousedown',
        () => {
          start = Date.now()
          timerStop = useTimeout(() => el.dispatchEvent(evt), ms)
        },
        false,
      ),
    )

    stops.push(
      useEventListener(
        el,
        'mouseup',
        () => {
          if (Date.now() - start < ms)
            timerStop?.()
          else callback?.()
        },
        false,
      ),
    )
    if (hasStopped)
      stops.forEach(fn => fn())
  })
  return () => {
    if (!stops.length)
      hasStopped = true
    else stops.forEach(fn => fn())
  }
}
