import { isStr } from './isStr'

export function addEventListener(target: Window | Document | Element | string, eventName: string, callback: (e: Event) => void, useCapture?: boolean, autoRemove?: boolean): (() => void) {
  if (isStr(target))
    target = document.querySelector(target as string) as Element
  const remove = () => (target as Element)?.removeEventListener(eventName, callback);
  (target as Element).addEventListener(eventName, (e: Event) => {
    callback.call(e.target, e)
    if (autoRemove)
      remove()
  }, useCapture)
  return remove
}
