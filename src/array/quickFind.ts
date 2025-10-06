import { isDef } from '../is/isDef'
import { isUndef } from '../is/isUndef'

/**
 * 快速建立基于主键的查找结构（支持增删改）
 * @description EN: Build a quick-find helper for arrays keyed by a primary field. Returns an object with find/set/delete utilities.
 * @template T Record-like item type.
 * @param {T[]} array Input array of records.
 * @param {keyof T | string} id Property name used as primary key.
 * @returns {QuickFind<T>} QuickFind wrapper instance.
 */
export function quickFind<T extends Record<string, any>>(
  array: T[],
  id: keyof T | string,
) {
  const indexMap = new Map<any, number>()
  array.forEach((item, i) => indexMap.set((item as any)[id], i))
  return new QuickFind(array, indexMap, id)
}

/**
 * QuickFind helper class wrapping an array and an index map keyed by the provided id.
 * Provides convenience methods to find, set, update and delete items by id.
 * This class is returned by the `quickFind` factory function.
 *
 * @template T Item record type.
 */
class QuickFind<T extends Record<string, any>> {
  constructor(
    public array: T[],
    public indexMap: Map<any, number>,
    public id: keyof T | string,
  ) {
    this.array = array
    this.indexMap = indexMap
    this.id = id
  }

  /**
   * Find an item by its id.
   * @param id - primary key value to look up
   * @returns the found item or undefined when not present
   */
  find(id: any): T | undefined {
    const index = this.indexMap.get(id)
    if (isUndef(index))
      return undefined
    return this.array[index]
  }

  /**
   * Internal update helper. When `key` is undefined the whole item is replaced.
   * Otherwise a single property on the target item is updated.
   * @internal
   */
  _update(id: any, key: keyof T | T, value: any) {
    if (isUndef(key)) {
      const index = this.indexMap.get(id)
      if (isUndef(index))
        throw new Error('当id不存在')
      if (value[this.id as string] !== id)
        throw new Error('不可修改唯一id')
      this.array[index] = value
    }
    else {
      const target = this.find(id)
      if (isUndef(target)) {
        return this.array
      }
      ;(target as any)[key as string] = value
    }
    return this.array
  }

  /**
   * Delete an item by id. Returns the mutated array when deletion happened.
   * @param id - primary key value
   * @returns the array after deletion, or undefined when id not found
   */
  delete(id: any) {
    const index = this.indexMap.get(id)
    if (isUndef(index))
      return
    this.array.splice(index, 1)
    this.indexMap.delete(id)
    return this.array
  }

  /**
   * Set or insert an item by id. If an item with `id` exists it will be updated;
   * otherwise the provided value will be pushed (must include the primary id).
   *
   * Usage:
   * - set(id, item) -> inserts or replaces the whole item
   * - set(id, key, value) -> updates a single property on existing item
   *
   * @param id - primary key value
   * @param key - either a property key to update or the full item when inserting
   * @param value - when `key` is a property key this is the new value; optional when inserting
   * @returns the array after mutation
   */
  set(id: any, key: keyof T | T, value?: any) {
    let tempValue = value
    const index = this.indexMap.get(id)
    if (isUndef(value)) {
      if (isUndef(key))
        return this.array
      tempValue = key as any
    }
    if (isDef(index)) {
      return this._update(id, key, tempValue)
    }
    else {
      if (!value)
        value = key as any
      if (isUndef((value as any)[this.id as string]))
        throw new Error('新增的数据必须包含唯一id')
      if ((value as any)[this.id as string] !== id)
        throw new Error('新增的数据id必须与当时id一致')
      this.indexMap.set(id, this.array.length)
      this.array.push(value)
      return this.array
    }
  }
}
