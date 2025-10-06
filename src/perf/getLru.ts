import type { LRU } from '../types'

/**
 *
 * @param max 最大存储量 默认 50
 * @returns
 * @description EN: Create and return a small LRU cache object with `get`, `set`, `cache`, `max` and `size()`.
 */
export function getLru(max = 50): LRU {
  return {
    set(key: string, value: any) {
      if (this.cache.has(key))
        this.cache.delete(key)
      this.cache.set(key, value)
      if (this.cache.size > this.max)
        this.cache.delete(this.cache.keys().next().value!)
    },
    get(key: string) {
      if (this.cache.has(key)) {
        const value = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, value)
        return value
      }
      return undefined
    },
    cache: new Map(),
    max,
    size() {
      return this.cache.size
    },
  }
}

// const lru = getLru(3)
// lru.set('a', 1)
// lru.set('b', 2)
// lru.set('c', 3)
// lru.set('d', 4)
// console.log(lru.cache) // => { c: 3, d: 4 }
