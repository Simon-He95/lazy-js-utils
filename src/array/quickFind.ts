import { isDef } from '../is/isDef'
import { isUndef } from '../is/isUndef'

/**
 *
 * @param { any[] } array 数组
 * @param { string | number } id 主键
 * @returns
 */
export function quickFind(array: any[], id: string | number) {
  const indexMap = new Map()
  array.forEach((item, i) => indexMap.set(item[id], i))
  return new QuickFind(array, indexMap, id)
}

class QuickFind {
  constructor(
    public array: any[],
    public indexMap: Map<any, number>,
    public id: string | number,
  ) {
    this.array = array
    this.indexMap = indexMap
    this.id = id
  }

  find(id: any) {
    const index = this.indexMap.get(id)
    if (isUndef(index))
      return undefined
    return this.array[index]
  }

  _update(id: any, key: any, value: any) {
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
        return
      target[key] = value
    }
    return this.array
  }

  delete(id: any) {
    const index = this.indexMap.get(id)
    if (isUndef(index))
      return
    this.array.splice(index, 1)
    this.indexMap.delete(id)
    return this.array
  }

  set(id: any, key: any, value?: any) {
    const index = this.indexMap.get(id)
    if (isUndef(value)) {
      if (isUndef(key))
        return
      value = key
      key = undefined
    }
    if (isDef(index)) {
      return this._update(id, key, value)
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
