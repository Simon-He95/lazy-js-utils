/**
 * 截流函数
 * @param { Function } fn 要执行的函数
 * @param { number } stop 限流时间窗口（毫秒）
 * @returns { Function } 返回被节流包装后的函数
 * @description EN: Create a throttled version of `fn` that ensures `fn` runs at most once every `stop` milliseconds.
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
