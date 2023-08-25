/**
 * 截流函数
 * @param { Function } fn 函数
 * @param { number } stop 时间
 * @returns
 */
export function throttle(fn: Function, stop: number) {
  let start = 0
  return function (this: any, ...args: any[]) {
    const end = Date.now()
    if (end - start >= stop) {
      const result = fn.call(this, ...args)
      start = end
      return result
    }
  }
}
