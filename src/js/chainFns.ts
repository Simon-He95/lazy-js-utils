import { noop } from './noop'

/**
 * 链式调用
 * @param { Function[] } fns 函数数组
 * @returns
 */
export function chainFns(...fns: Function[]): Function {
  if (fns.length === 0)
    return noop
  if (fns.length === 1)
    return fns[0]

  return function (this: any, ...args: any[]) {
    let result
    for (const fn of fns) result = fn.apply(this, args) || result

    return result
  }
}
