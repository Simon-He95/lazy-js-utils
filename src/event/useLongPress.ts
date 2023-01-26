import type { MaybeElement } from '../types'
import { mount } from '../utils/mount'
import { useEventListener } from './useEventListener'
import { useTimeout } from './useTimeout'

/**
 *
 * @param { MaybeElement } el 元素
 * @param { number } ms 时长
 * @param { Function } callback 回调
 * @returns 停止
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
