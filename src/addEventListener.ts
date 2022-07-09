import { isStr } from './isStr'

export function addEventListener(target: Window | Document | Element | string, eventName: string, callback: (e: any) => void, useCapture?: boolean, autoRemove?: boolean): (() => void) {
  let mounted = false
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
  window.addEventListener('DOMContentLoaded', update)

  function update() {
    if (isStr(target))
      target = document.querySelector(target as string) as Element || target
    if (!mounted && isStr(target))
      return mounted = true
    else if (isStr(target))
      throw new Error(`${target} is not a Element`);
    (target as Element).addEventListener(eventName, event, useCapture)
    stop = () => (target as Element).removeEventListener(eventName, event, useCapture)
    if (stopped)
      stop()
  }
  return () => {
    if (!stop) {
      stopped = true
      return
    }
    stop?.()
  }
}

