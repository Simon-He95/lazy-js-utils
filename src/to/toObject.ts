import { isPlainObject } from '../is/isPlainObject'

/**
 * Convert an array of plain objects into an object keyed by property names.
 *
 * For each key present in the input objects, the returned object will have an
 * array of values collected from each item. Optionally restrict keys via
 * `filter`.
 *
 * @param arr - Input array of plain objects.
 * @param filter - Optional list of keys to include.
 * @returns Object mapping keys to arrays of values.
 */
export function toObject(arr: Array<any>, filter?: string[]): object {
  return arr.reduce(
    (result, item) =>
      !isPlainObject(item)
        ? result
        : Object.keys(item).reduce((result, key) => {
            if (filter && !filter.includes(key))
              return result
            if (!result[key])
              result[key] = []
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
