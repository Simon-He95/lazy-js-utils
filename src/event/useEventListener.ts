import { mount } from '../utils/mount'
import { unmount } from '../utils/unmount'

/**
 * 事件监听
 * @param { Window | Document | Element | string } target 元素
 * @param { T } eventName 事件名
 * @param { (e: (WindowEventMap & DocumentEventMap)[T]) => void } callback 回调
 * @param { boolean | AddEventListenerOptions } useCapture 捕获
 * @param { boolean } autoRemove 是否自动被移除
 * @returns 停止
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
  let animationStop: () => void
  if (eventName === 'DOMContentLoaded') stopped = true
  function event(e: (WindowEventMap & DocumentEventMap)[T]) {
    try {
      callback?.call?.(e.target, e)
    } catch (error: any) {
      animationStop?.()
      throw new Error(error)
    }
    if (autoRemove) stop()
  }
  unmount(() => stop?.())

  mount(target, (target) => {
    const originCall = (target as any)?.[eventName]
    const eventFunction = (e: Event) => {
      if (stopped) stop?.()
      try {
        const isRawEvent =
          originCall && originCall.toString().includes('() { [native code] }')
        if (!isRawEvent && originCall) originCall?.()
      } catch (error) {
        console.error(error)
      }
      event(e as (WindowEventMap & DocumentEventMap)[T])
    }
    target.addEventListener(eventName, eventFunction, useCapture)
    stop = () =>
      (target as Element).removeEventListener(
        eventName,
        eventFunction,
        useCapture,
      )
  })
  return () => {
    if (!stop) return (stopped = true)
    stop?.()
  }
}
