import { isDef } from '../is/isDef'
import { isUndef } from '../is/isUndef'

/**
 *
 * @param { T[] } array 数组
 * @param { string | number } id 主键
 * @returns
 */
export function quickFind<T>(array: T[], id: T[keyof T]) {
  const indexMap = new Map()
  array.forEach((item, i) => indexMap.set((item as any)[id], i))
  return new QuickFind(array, indexMap, id)
}

class QuickFind<T> {
  constructor(
    public array: T[],
    public indexMap: Map<any, number>,
    public id: T[keyof T],
  ) {
    this.array = array
    this.indexMap = indexMap
    this.id = id
  }

  find(id: T[keyof T]) {
    const index = this.indexMap.get(id)
    if (isUndef(index))
      return undefined
    return this.array[index]
  }

  _update(id: T[keyof T], key: keyof T | T, value: any) {
    if (isUndef(key)) {
      const index = this.indexMap.get(id)
      if (isUndef(index))
        throw new Error('当前id不存在')
      if (value[this.id] !== id)
        throw new Error('不可修改唯一id')
      this.array[index] = value
    }
    else {
      const target = this.find(id)
      if (isUndef(target))
        return this.array
      target[key as keyof T] = value
    }
    return this.array
  }

  delete(id: T[keyof T]) {
    const index = this.indexMap.get(id)
    if (isUndef(index))
      return
    this.array.splice(index, 1)
    this.indexMap.delete(id)
    return this.array
  }

  set(id: T[keyof T], key: keyof T | T, value?: any) {
    let tempValue = value
    const index = this.indexMap.get(id)
    if (isUndef(value)) {
      if (isUndef(key))
        return this.array
      tempValue = key
    }
    if (isDef(index)) {
      return this._update(id, key, tempValue)
    }
    else {
      if (isUndef(value[this.id]))
        throw new Error('新增的数据必须包含唯一id')
      if (value[this.id] !== id)
        throw new Error('新增的数据id必须与当前id一致')
      this.indexMap.set(id, this.array.length)
      this.array.push(value)
      return this.array
    }
  }
}
