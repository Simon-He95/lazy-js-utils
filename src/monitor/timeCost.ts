/**
 * 检测函数执行耗时
 * @param { Function } fn 函数
 * @returns number
 * @description EN: Measure and log the execution time (in seconds) of the provided synchronous function.
 */
export function timeCost(fn: Function): number {
  const start = new Date().getTime()
  fn()
  const end = new Date().getTime()
  const time = (end - start) / 1000
  console.log(`timeCost: ${time}s`)
  return time
}
