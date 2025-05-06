type Primitive = string | number | symbol | boolean | null | undefined
type KeyType = object | Primitive

/**
 * HybridMap 是一个支持对象和原始类型（如字符串、数字、布尔值等）作为 key 的 Map 实现。
 * - 对象类型的 key 使用 WeakMap 存储，原始类型的 key 使用 Map 存储。
 * - 这样既可以用对象做 key，也可以用字符串、数字等做 key，且对象 key 不会阻止垃圾回收。
 * - 不支持遍历和 size 属性，因为 WeakMap 无法遍历。
 *
 * 示例用法：
 * ```ts
 * const map = createHybridMap<any, string>([[{}, 'obj'], ['a', 'str']])
 * map.set(123, 'num')
 * map.set({}, 'another obj')
 * ```
 */
export class HybridMap<K extends KeyType, V> {
  private objectStore: WeakMap<object, V>
  private primitiveStore: Map<Primitive, V>

  /**
   * 构造函数，可选初始化 entries
   * @param entries 初始键值对数组
   */
  constructor(entries?: readonly (readonly [K, V])[] | null) {
    this.objectStore = new WeakMap()
    this.primitiveStore = new Map()
    if (entries) {
      for (const [k, v] of entries) {
        this.set(k, v)
      }
    }
  }

  /** 判断 key 是否为 object 类型 */
  private isObjectKey(key: K): key is Record<any, any> {
    return typeof key === 'object' && key !== null
  }

  /**
   * 设置键值对
   * @param key 键
   * @param value 值
   */
  set(key: K, value: V): this {
    if (this.isObjectKey(key)) {
      this.objectStore.set(key, value)
    }
    else {
      this.primitiveStore.set(key as Primitive, value)
    }
    return this
  }

  /**
   * 获取指定 key 的值
   * @param key 键
   */
  get(key: K): V | undefined {
    if (this.isObjectKey(key)) {
      return this.objectStore.get(key as object)
    }
    else {
      return this.primitiveStore.get(key as Primitive)
    }
  }

  /**
   * 判断是否存在指定 key
   * @param key 键
   */
  has(key: K): boolean {
    if (this.isObjectKey(key)) {
      return this.objectStore.has(key as object)
    }
    else {
      return this.primitiveStore.has(key as Primitive)
    }
  }

  /**
   * 删除指定 key
   * @param key 键
   */
  delete(key: K): boolean {
    if (this.isObjectKey(key)) {
      return this.objectStore.delete(key as object)
    }
    else {
      return this.primitiveStore.delete(key as Primitive)
    }
  }

  /** 清空所有 key */
  clear(): void {
    this.primitiveStore.clear()
    this.objectStore = new WeakMap()
  }

  /** 不支持 size 属性，因 WeakMap 无法遍历 */
  get size(): number {
    throw new Error(
      'HybridMap does not support size due to WeakMap limitations.',
    )
  }

  /** 不支持 forEach，因 WeakMap 无法遍历 */
  forEach(): void {
    throw new Error(
      'HybridMap does not support forEach due to WeakMap limitations.',
    )
  }

  /** 不支持 keys 迭代，因 WeakMap 无法遍历 */
  keys() {
    throw new Error(
      'HybridMap does not support iteration due to WeakMap limitations.',
    )
  }

  /** 不支持 values 迭代，因 WeakMap 无法遍历 */
  values() {
    throw new Error(
      'HybridMap does not support iteration due to WeakMap limitations.',
    )
  }

  /** 不支持 entries 迭代，因 WeakMap 无法遍历 */
  entries() {
    throw new Error(
      'HybridMap does not support iteration due to WeakMap limitations.',
    )
  }

  /** 不支持迭代器，因 WeakMap 无法遍历 */
  [Symbol.iterator]() {
    throw new Error(
      'HybridMap does not support iteration due to WeakMap limitations.',
    )
  }
}

/**
 * createHybridMap 是 HybridMap 的工厂函数。
 * 用于创建支持对象和原始类型作为 key 的 Map 实例。
 * @param entries 可选的初始键值对数组
 * @returns HybridMap 实例
 *
 * 示例用法：
 * ```ts
 * const map = createHybridMap<any, string>([[{}, 'obj'], ['a', 'str']])
 * map.set(123, 'num')
 * map.set({}, 'another obj')
 * ```
 */
export function createHybridMap<K extends KeyType, V>(
  entries?: readonly (readonly [K, V])[] | null,
): HybridMap<K, V> {
  return new HybridMap(entries)
}
