import type { LRU } from './types'
export function getLru(max = 50): LRU {
  return {
    set(key: string, value: any) {
      if (this.cache.has(key))
        this.cache.delete(key)
      this.cache.set(key, value)
      if (this.cache.size > this.max)
        this.cache.delete(this.cache.keys().next().value)
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
    size() { return this.cache.size },
  }
}
