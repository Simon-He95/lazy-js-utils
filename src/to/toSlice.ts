/**
 * 截取函数
 * @param { string | any[] } list 数组
 * @param { number } start 启示索引
 * @returns
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
