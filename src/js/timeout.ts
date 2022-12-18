import { promiseFinally } from './promiseFinally'

export const timeout = function timeout(fn: Function, ms: number, msg: string) {
  let timerId: NodeJS.Timeout
  const warpPromise = promiseFinally(fn, () => clearTimeout(timerId))
  const timerPromise = new Promise((resolve, reject) => {
    timerId = setTimeout(() => reject(new Error(msg)), ms)
  })
  return Promise.race([warpPromise, timerPromise])
}
