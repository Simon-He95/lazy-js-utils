/**
 * 检测函数执行耗时
 * @param { Function } fn 函数
 * @returns
 */
export function timeCost(fn: Function): number {
  const start = new Date().getTime()
  fn()
  const end = new Date().getTime()
  const time = (end - start) / 1000
  console.log(`timeCost: ${time}s`)
  return time
}
