/**
 * 柯里化
 * @description EN: Create a curried version of the provided function.
 * @param { Function } f 函数
 * @returns 函数
 */
export function curry(f: Function) {
  const g = (...args: any[]) => {
    if (args.length >= f.length)
      return f(...args)

    return (...more: any[]) => {
      return g(...args, ...more)
    }
  }
  return g
}
