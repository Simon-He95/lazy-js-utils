export function addEventListener(eventName: string, callback: (...args: any[]) => void, useCapture?: boolean, autoStop?: boolean): (() => void) {
  const remove = () => window.removeEventListener(eventName, callback)
  window.addEventListener(eventName, (e: Event) => {
    callback.call(e.target, e)
    if (autoStop)
      remove()
  }, useCapture)
  return remove
}
