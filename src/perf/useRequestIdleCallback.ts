import type { Deadline } from '../types'
import { isFn } from '../is/isFn'

type Timeout = number | (() => void)

export function useRequestIdleCallback(
  tasks: Function[],
  timeout: Timeout = 2000,
  callback?: () => void,
): () => void {
  if (isFn(timeout)) {
    callback = timeout as unknown as () => void
    timeout = 2000
  }
  let work = true
  const idleCallback
    = window.requestIdleCallback
    || function (handler) {
      const startTime = Date.now()
      return setTimeout(
        () =>
          handler({
            didTimeout: false,
            timeRemaining() {
              return Math.max(0, 50.0 - (Date.now() - startTime))
            },
          }),
        1,
      )
    }
  const idleCancel = window.cancelIdleCallback || clearTimeout
  const animationId = idleCallback(
    async function animationCallback(deadline: Deadline) {
      if (!work)
        return
      if (
        (deadline.timeRemaining() > 0 || deadline.didTimeout)
        && tasks.length > 0
      )
        tasks.shift()?.()
      if (tasks.length > 0) {
        idleCallback(animationCallback)
      }
      else {
        callback?.()
        stop()
      }
    },
    { timeout: timeout as number },
  )

  function stop() {
    work = false
    idleCancel(animationId)
  }
  return stop
}
