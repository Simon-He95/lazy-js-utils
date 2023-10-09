import { isPlainObject } from '../is/isPlainObject'

/**
 * 将数组中指定的元素转换为对象
 * @param { Array<any> } arr 数组
 * @param { string[] } filter 指定数组
 * @returns
 */
export function toObject(arr: Array<any>, filter?: string[]): object {
  return arr.reduce(
    (result, item) =>
      !isPlainObject(item)
        ? result
        : Object.keys(item).reduce((result, key) => {
            if (filter && !filter.includes(key)) return result
            if (!result[key]) result[key] = []
            result[key].push(item[key])
            return result
          }, result),
    {} as Record<string, any>,
  )
}

// const arr = [{
//   a: 1,
// }, {
//   a: 3,
//   3: 5,
// }]
// const data = toObject(arr)
// console.log(data)
