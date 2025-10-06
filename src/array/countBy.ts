/**
 * 按照迭代器结果统计数组中元素出现次数
 * @description EN: Count elements in an array grouped by the value returned from the iterator.
 * @param { any[] } array Input array to count.
 * @param { Function } iterator Function that maps each item to a key.
 * @returns {Record<string, number>} Map from key to its occurrence count.
 */
export function countBy<T extends Record<string, any>>(
  array: T[],
  iterator: (item: T) => any,
) {
  return array.reduce((result, item) => {
    const val = iterator(item)
    if (!result[val])
      result[val] = 1
    else result[val]++
    return result
  }, {} as Record<string, number>)
}

// const array = [
//   { 'user': '1', 'active': true },
//   { 'user': '2', 'active': false },
//   { 'user': '3', 'active': true },
//   { 'user': '4', 'active': true },
//   { 'user': '5', 'active': true },
// ]
// console.log(countBy(array, (item) => {
//   return item.active
// })) // { true: 4, false: 1 }
