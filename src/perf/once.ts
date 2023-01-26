/**
 *
 * @param { Function } fn 函数
 * @returns
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
