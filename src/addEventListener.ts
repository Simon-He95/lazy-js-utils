import { isStr } from './isStr'
import { animationFrameWrapper } from './animationFrameWrapper'

export function addEventListener(target: Window | Document | Element | string, eventName: string, callback: (e: any) => void, useCapture?: boolean, autoRemove?: boolean): (() => void) {
  let isMounted = false
  let hasMounted = false
  let stopped = false
  let stop: () => void
  if (eventName === 'DOMContentLoaded')
    stopped = true
  function event(e: Event) {
    callback.call(e.target, e)
    if (autoRemove)
      stop()
  }
  update()
  window.addEventListener('DOMContentLoaded', () => {
    update()
    if (stopped)
      stop()
  })
  if (eventName === 'DOMContentLoaded')
    animationFrameWrapper(callback, 0, true)
  else
    animationFrameWrapper(update, 0, true)

  function update() {
    if (hasMounted)
      return
    if (isStr(target))
      target = document.querySelector(target as string) as Element || target
    if (!isMounted && isStr(target))
      return isMounted = true
    else if (isStr(target))
      throw new Error(`${target} is not a Element`);
    (target as Element).addEventListener(eventName, event, useCapture)
    stop = () => (target as Element).removeEventListener(eventName, event, useCapture)
    hasMounted = true
  }
  return () => {
    if (!stop) {
      stopped = true
      return
    }
    setTimeout(stop)
  }
}

