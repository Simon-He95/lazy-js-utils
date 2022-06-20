export function memorizeFn(fn: Function, cache: Record<string, Function> = {}) {
  return function (...args: any[]) {
    const _args = JSON.stringify(args)
    return cache[_args] || (cache[_args] = fn.apply(fn, args))
  }
}
