export function once(fn: Function): Function {
  let called = false
  return function (this: any, ...args: any[]) {
    if (!called) {
      called = true
      fn.apply(this, args)
    }
  }
}
