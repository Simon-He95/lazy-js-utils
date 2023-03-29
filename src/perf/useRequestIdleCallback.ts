import type { Deadline } from '../types'
import { isFn } from '../is/isFn'

type Timeout = number | (() => void)

/**
 * 浏览器空闲时期被调用
 * @param { Function[] } tasks 函数队列
 * @param { number } timeRemaining 剩余时间大于多少才继续执行
 * @param { number } timeout 超时时间
 * @param { Function } callback 回调
 * @returns
 */
export function useRequestIdleCallback(
  tasks: Function[],
  timeRemaining = 0,
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
        (deadline.timeRemaining() > timeRemaining || deadline.didTimeout)
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
