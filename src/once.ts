export function once(fn: Function): Function {
  let called = false
  return function (this: any) {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
};
