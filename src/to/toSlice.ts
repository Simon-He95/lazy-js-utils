/**
 * Fast slice implementation that copies elements from `start` to the end into
 * a new array. Designed to be faster than `Array.prototype.slice` in tight
 * loops for array-like structures.
 *
 * @param list - Array-like or string
 * @param start - Start index (defaults to 0)
 * @returns A new array containing the sliced values
 */
export function toSlice(list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) ret[i] = list[i + start]

  return ret
}

// const arr = [1, 3, 5, 7, 9]
// const data = toArray(arr, 2) // [5,7,9]
// console.log(data)
