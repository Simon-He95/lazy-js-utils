export function toArray(list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) ret[i] = list[i + start]

  return ret
}

// const arr = [1, 3, 5, 7, 9]
// const data = toArray(arr, 2) // [5,7,9]
// console.log(data)
