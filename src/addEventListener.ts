export function addEventListener(eventName: string, callback: (...args: any[]) => void, useCapture?: boolean, autoStop?: boolean) {
  const stop = () => window.removeEventListener(eventName, callback)
  window.addEventListener(eventName, (e: Event) => {
    callback.call(e.target, e)
    if (autoStop)
      stop()
  }, useCapture)
  return stop
}
