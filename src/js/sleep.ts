/**
 * 等待函数
 * @param { number }  ms 延迟秒数
 * @returns
 * @description EN: Pause execution for `ms` milliseconds and resolve a Promise.
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
