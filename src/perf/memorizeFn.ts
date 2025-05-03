/**
 * 函数缓存结果
 * @param { Function } fn 函数
 * @param { Map<string, any> } cache 缓存对象
 * @param { number } maxSize 最大缓存条目数，默认为100
 * @returns { Function } 带缓存的函数
 */
export function memorizeFn(
  fn: Function,
  cache: Map<string, any> = new Map(),
  maxSize: number = 100,
): (...args: any[]) => any {
  return function (...args: any[]) {
    const _args = JSON.stringify(args)

    // 如果找到缓存，返回并更新使用顺序（实现LRU）
    if (cache.has(_args)) {
      const value = cache.get(_args)

      // LRU策略：删除后重新添加，使其成为"最近使用"
      cache.delete(_args)
      cache.set(_args, value)

      return value
    }

    // 检查缓存大小，如果达到最大值，删除最早的条目（Map的第一个条目）
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value!
      cache.delete(firstKey)
    }

    // 计算结果并缓存
    const result = fn.apply(fn, args)
    cache.set(_args, result)
    return result
  }
}
