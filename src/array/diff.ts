interface Options {
  compare?: 'same' | 'different'
  result?: 'value' | 'index'
}
/**
 * 比较两个数组，返回相同项或不同项（值或索引）
 * @description EN: Compare two arrays and return either same/different items or their indices.
 * @param {any[]} array1 First array.
 * @param {any[]} array2 Second array.
 * @param {Options} [options] Comparison options.
 * @returns {any[] | number[][]} Depending on options, returns matching values, indices, or paired differences.
 */
export function diff(
  array1: any[],
  array2: any[],
  options: Options = { compare: 'same', result: 'value' },
): any[] | number[][] {
  const same = array1.filter(item => array2.includes(item))
  const diff = array1
    .filter(item => !array2.includes(item))
    .concat(array2.filter(item => !array1.includes(item)))
  const { compare = 'same', result = 'value' } = options
  if (compare === 'same')
    return result === 'value' ? same : same.map(item => array1.indexOf(item))

  return result === 'value'
    ? splitDiff(diff)
    : diff.map(item => array1.indexOf(item)).filter((i: number) => i >= 0)
}

/**
 * 将差集拆成左右两组并配对（内部辅助函数）
 * @description EN: Helper that splits an array of differences into paired tuples.
 * @param {any[]} arr Input diff array.
 * @returns {any[][]} Paired differences.
 */
function splitDiff(arr: any[]): any[][] {
  if (!arr.length)
    return []
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
