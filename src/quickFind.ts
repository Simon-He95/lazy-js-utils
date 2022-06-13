export function quickFind(array: any[], key: any) {
  const indexMap = new Map()
  array.forEach((item, i) => {
    indexMap.set(item[key], i)
  })
  return new QuickFind(array, indexMap)
}

class QuickFind {
  constructor(public array: any[], public indexMap: Map<any, number>) {
    this.array = array
    this.indexMap = indexMap
  }

  find(key: any) {
    const index = this.indexMap.get(key)
    if (index === undefined)
      return undefined
    return this.array[index]
  }
}

