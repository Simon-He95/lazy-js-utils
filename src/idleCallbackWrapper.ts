import type { Deadline } from './types'

export function idleCallbackWrapper(tasks: Function[], timeout = 2000): (() => void) {
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
    if ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0)
      tasks.shift()?.()

    if (tasks.length > 0)
      requestIdleCallback(animationCallback)
  }, { timeout })
  return () => idleCancel(animationId)
}

