/**
 * 函数缓存结果
 * @param { Function } fn 函数
 * @param { Map<string, any> } cache 缓存对象
 * @param { number } maxSize 最大缓存条目数，默认为100
 * @returns { Function } 带缓存的函数
 * @description EN: Return a memoized version of `fn` that caches results by JSON-stringified arguments up to maxSize.
 */
export function memorizeFn(
  fn: Function,
  cache: Map<string, any> = new Map(),
  maxSize: number = 100,
): (...args: any[]) => any {
  return function (this: any, ...args: any[]) {
    const _args = JSON.stringify(args)

    if (cache.has(_args)) {
      const value = cache.get(_args)
      cache.delete(_args)
      cache.set(_args, value)
      return value
    }

    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value!
      cache.delete(firstKey)
    }

    // 使用当前调用的 this，而不是 fn 作为 this
    const result = fn.apply(this, args)
    cache.set(_args, result)
    return result
  }
}
