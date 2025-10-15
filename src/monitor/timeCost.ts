/**
 * 检测函数执行耗时
 * @description EN: Measure and log the execution time (seconds) of the provided synchronous function.
 * @param { Function } fn 需要测量的函数
 * @returns { number } 函数执行耗时（秒）
 */
export function timeCost(fn: Function): number {
  const start = new Date().getTime()
  fn()
  const end = new Date().getTime()
  const time = (end - start) / 1000
  console.log(`timeCost: ${time}s`)
  return time
}
