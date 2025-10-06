import { promiseFinally } from './promiseFinally'

/**
 * 超时函数
 * @param { Function } fn 函数
 * @param { number } ms 时间
 * @param { string } msg 错误消息
 * @returns
 * @description EN: Run `fn` (which may be async) but reject with an Error(msg) if it doesn't finish within `ms` milliseconds.
 */
export const timeout = function timeout(fn: Function, ms: number, msg: string) {
  let timerId: NodeJS.Timeout
  const warpPromise = promiseFinally(fn, () => clearTimeout(timerId))
  const timerPromise = new Promise((resolve, reject) => {
    timerId = setTimeout(() => reject(new Error(msg)), ms)
  })
  return Promise.race([warpPromise, timerPromise])
}
