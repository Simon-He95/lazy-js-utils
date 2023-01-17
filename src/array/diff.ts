interface Options {
  compare?: 'same' | 'different'
  result?: 'value' | 'index'
}
/**
 *
 * @param { any[] } array1 数组1
 * @param { any[] } array2 数组2
 * @param { Options } [options] {}
 * @param { 'same' | 'different' } [options.compare] 'same' | 'different'
 * @param { 'value' | 'index' } [options.compresultare] 'value' | 'index'
 * @returns 返回相同项或不同项的索引或值
 */

export function diff(
  array1: any[],
  array2: any[],
  options: Options = { compare: 'same', result: 'value' },
) {
  const same = array1.filter(item => array2.includes(item))
  const diff = array1
    .filter(item => !array2.includes(item))
    .concat(array2.filter(item => !array1.includes(item)))
  const { compare = 'same', result = 'value' } = options
  if (compare === 'same')
    return result === 'value' ? same : same.map(item => array1.indexOf(item))

  return result === 'value'
    ? splitDiff(diff)
    : diff.map(item => array1.indexOf(item)).filter(i => i >= 0)
}

function splitDiff(arr: any[]) {
  if (!arr.length)
    return arr
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  const result: any[][] = []
  for (let i = 0; i < mid; i++) result.push([left[i], right[i]])

  return result
}

// const arr1 = [1, 3, 8, 5]
// const arr2 = [1, 4, 6, 5]
// console.log(diff(arr1, arr2, { compare: 'different', result: 'value' }))
