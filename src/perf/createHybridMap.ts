type Primitive = string | number | symbol | boolean | null | undefined
type KeyType = object | Primitive

export class HybridMap<K extends KeyType, V> {
  private objectStore: WeakMap<object, V>
  private primitiveStore: Map<Primitive, V>

  constructor(entries?: readonly (readonly [K, V])[] | null) {
    this.objectStore = new WeakMap()
    this.primitiveStore = new Map()
    if (entries) {
      for (const [k, v] of entries) {
        this.set(k, v)
      }
    }
  }

  private isObjectKey(key: K): key is Record<any, any> {
    return typeof key === 'object' && key !== null
  }

  set(key: K, value: V): this {
    if (this.isObjectKey(key)) {
      this.objectStore.set(key, value)
    }
    else {
      this.primitiveStore.set(key as Primitive, value)
    }
    return this
  }

  get(key: K): V | undefined {
    if (this.isObjectKey(key)) {
      return this.objectStore.get(key as object)
    }
    else {
      return this.primitiveStore.get(key as Primitive)
    }
  }

  has(key: K): boolean {
    if (this.isObjectKey(key)) {
      return this.objectStore.has(key as object)
    }
    else {
      return this.primitiveStore.has(key as Primitive)
    }
  }

  delete(key: K): boolean {
    if (this.isObjectKey(key)) {
      return this.objectStore.delete(key as object)
    }
    else {
      return this.primitiveStore.delete(key as Primitive)
    }
  }

  clear(): void {
    this.primitiveStore.clear()
    this.objectStore = new WeakMap()
  }

  get size(): number {
    throw new Error(
      'HybridMap does not support size due to WeakMap limitations.',
    )
  }

  forEach(): void {
    throw new Error(
      'HybridMap does not support forEach due to WeakMap limitations.',
    )
  }

  keys() {
    throw new Error(
      'HybridMap does not support iteration due to WeakMap limitations.',
    )
  }

  values() {
    throw new Error(
      'HybridMap does not support iteration due to WeakMap limitations.',
    )
  }

  entries() {
    throw new Error(
      'HybridMap does not support iteration due to WeakMap limitations.',
    )
  }

  [Symbol.iterator]() {
    throw new Error(
      'HybridMap does not support iteration due to WeakMap limitations.',
    )
  }
}

export function createHybridMap<K extends KeyType, V>(
  entries?: readonly (readonly [K, V])[] | null,
): HybridMap<K, V> {
  return new HybridMap(entries)
}
