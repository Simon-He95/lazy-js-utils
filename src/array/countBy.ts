export function countBy(
  array: any[],
  iterator: (item: Record<string, any>) => any,
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
