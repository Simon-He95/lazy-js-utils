/**
 *
 * @param { Function } fn 函数
 * @returns
 */
export function memorizeFn(
  fn: Function,
  cache: Map<string, string> = new Map(),
): (...args: any[]) => any {
  return function (...args: any[]) {
    const _args = JSON.stringify(args)
    if (cache.has(_args))
      return cache.get(_args)
    const result = fn.apply(fn, args)
    cache.set(_args, result)
    return result
  }
}
