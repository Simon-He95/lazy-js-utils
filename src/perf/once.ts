/**
 * 只执行一次函数
 * @param { Function } fn 函数
 * @returns { Function } 函数
 */
export function once(fn: Function): Function {
  let called = false
  return function (this: any, ...args: any[]) {
    if (!called) {
      called = true
      return fn.apply(this, args)
    }
  }
}
