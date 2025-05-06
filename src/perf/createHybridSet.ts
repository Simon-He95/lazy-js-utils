type Primitive = string | number | symbol | boolean | null | undefined
type KeyType = object | Primitive

/**
 * HybridSet 是一个支持对象和原始类型（如字符串、数字、布尔值等）作为元素的 Set 实现。
 * - 对象类型的元素使用 WeakSet 存储，原始类型的元素使用 Set 存储。
 * - 这样既可以用对象做元素，也可以用字符串、数字等做元素，且对象元素不会阻止垃圾回收。
 * - 不支持遍历和 size 属性，因为 WeakSet 无法遍历。
 *
 * 示例用法：
 * ```ts
 * const set = createHybridSet<any>([{}, 'a', 123])
 * set.add('b')
 * set.add({})
 * ```
 */
export class HybridSet<T extends KeyType> {
  private objectStore: WeakSet<object>
  private primitiveStore: Set<Primitive>

  /**
   * 构造函数，可选初始化 values
   * @param values 初始元素数组
   */
  constructor(values?: readonly T[] | null) {
    this.objectStore = new WeakSet()
    this.primitiveStore = new Set()
    if (values) {
      for (const v of values) {
        this.add(v)
      }
    }
  }

  /** 判断元素是否为 object 类型 */
  private isObjectKey(key: T): key is Record<any, any> {
    return typeof key === 'object' && key !== null
  }

  /**
   * 添加元素
   * @param value 元素
   */
  add(value: T): this {
    if (this.isObjectKey(value)) {
      this.objectStore.add(value)
    }
    else {
      this.primitiveStore.add(value as Primitive)
    }
    return this
  }

  /**
   * 判断是否存在指定元素
   * @param value 元素
   */
  has(value: T): boolean {
    if (this.isObjectKey(value)) {
      return this.objectStore.has(value)
    }
    else {
      return this.primitiveStore.has(value as Primitive)
    }
  }

  /**
   * 删除指定元素
   * @param value 元素
   */
  delete(value: T): boolean {
    if (this.isObjectKey(value)) {
      return this.objectStore.delete(value)
    }
    else {
      return this.primitiveStore.delete(value as Primitive)
    }
  }

  /** 清空所有元素 */
  clear(): void {
    this.primitiveStore.clear()
    this.objectStore = new WeakSet()
  }
}

/**
 * createHybridSet 是 HybridSet 的工厂函数。
 * 用于创建支持对象和原始类型作为元素的 Set 实例。
 * @param values 可选的初始元素数组
 * @returns HybridSet 实例
 *
 * 示例用法：
 * ```ts
 * const set = createHybridSet<any>([{}, 'a', 123])
 * set.add('b')
 * set.add({})
 * ```
 */
export function createHybridSet<T extends KeyType>(
  values?: readonly T[] | null,
): HybridSet<T> {
  return new HybridSet(values)
}
