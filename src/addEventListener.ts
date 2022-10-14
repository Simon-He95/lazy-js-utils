import { mount } from './mount'

export function addEventListener(target: Window | Document | Element | string, eventName: string, callback: (e: any) => void, useCapture?: boolean | AddEventListenerOptions, autoRemove?: boolean): (() => void) {
  let stopped = false
  let stop: () => void
  let animationStop: (() => void)
  if (eventName === 'DOMContentLoaded')
    stopped = true
  function event(e: Event) {
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

  window.onunload = () => stop?.()

  mount(target, (target) => {
    const originCall = (target as any)?.[eventName]
    const eventFunction = (e: Event) => {
      try {
        const isRawClick = originCall && originCall.toString() === 'function click() { [native code] }'
        if (!isRawClick && originCall)
          originCall?.()
      }
      catch (error) {
        console.error(error)
      }
      event(e)
    }
    target.addEventListener(eventName, eventFunction, useCapture)
    stop = () => (target as Element).removeEventListener(eventName, eventFunction, useCapture)
    if (stopped)
      stop?.()
  })
  return () => {
    if (!stop)
      return stopped = true
    stop?.()
  }
}
