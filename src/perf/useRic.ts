import type { Deadline } from '../types'

interface Options {
  timeRemaining?: number
  timeout?: number
  callback?: (taskArr: any[]) => void
}
/**
 * 浏览器空闲时期被调用
 * @param { Function[] } tasks 函数队列
 * @param {object} [options] 选项对象，可提供 timeRemaining/timeout/callback
 * @returns { Function } 停止调度的函数
 * @description EN: Schedule tasks during browser idle periods using requestIdleCallback (with a fallback). Executes queued tasks when the browser has available idle time and returns a stop function to cancel remaining tasks.
 */
export function useRic(tasks: Function[], options?: Options): () => void {
  const { timeRemaining = 0, timeout = 2000, callback } = options || {}
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
  const taskResult: any[] = []
  const idleCancel = window.cancelIdleCallback || clearTimeout
  const animationId = idleCallback(
    async function animationCallback(deadline: Deadline) {
      if (!work)
        return
      if (
        (deadline.timeRemaining() > +timeRemaining || deadline.didTimeout)
        && tasks.length > 0
      ) {
        taskResult.push(tasks.shift()?.())
      }
      if (tasks.length > 0) {
        idleCallback(animationCallback)
      }
      else {
        callback?.(taskResult)
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
