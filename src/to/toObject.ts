import { isPlainObject } from '../is/isPlainObject'

export function toObject(arr: Array<any>, filter?: string[]): object {
  return arr.reduce((result, item) => !isPlainObject(item)
    ? result
    : Object.keys(item).reduce((result, key) => {
      if (filter && !filter.includes(key))
        return result
      if (!result[key])
        result[key] = []
      result[key].push(item[key])
      return result
    }, result), {} as Record<string, any>)
}

// const arr = [{
//   a: 1,
// }, {
//   a: 3,
//   3: 5,
// }]
// const data = toObject(arr)
// console.log(data)
