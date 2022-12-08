interface Options {
  compare: 'same' | 'different'
  result: 'value' | 'index'
}

export function diff(array1: any[], array2: any[], options: Options = { compare: 'same', result: 'value' }) {
  const same = array1.filter(item => array2.includes(item))
  const diff = array1.filter(item => !array2.includes(item)).concat(array2.filter(item => !array1.includes(item)))
  const { compare, result } = options
  if (compare === 'same') {
    return result === 'value'
      ? same
      : same.map(item => array1.indexOf(item))
  }

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
  for (let i = 0; i < mid; i++)
    result.push([left[i], right[i]])

  return result
}

// const arr1 = [1, 3, 8, 5]
// const arr2 = [1, 4, 6, 5]
// console.log(diff(arr1, arr2, { compare: 'different', result: 'value' }))
