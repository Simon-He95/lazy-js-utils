import type { Deadline } from './types'

export function idleCallbackWrapper(tasks: Function[], timeout = 2000, callback: () => {}): (() => void) {
  let work = true
  const idleCallback = window.requestIdleCallback || function (handler) {
    const startTime = Date.now()
    return setTimeout(() =>
      handler({
        didTimeout: false,
        timeRemaining() {
          return Math.max(0, 50.0 - (Date.now() - startTime))
        },
      }), 1)
  }; const idleCancel = window.cancelIdleCallback || clearTimeout
  const animationId = idleCallback(function animationCallback(deadline: Deadline) {
    if (!work)
      return
    if ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0)
      tasks.shift()?.()

    if (tasks.length > 0)
      requestIdleCallback(animationCallback)
    else
      callback()
  }, { timeout })
  return () => {
    work = false
    idleCancel(animationId)
  }
}

