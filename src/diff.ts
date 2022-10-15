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
    ? diff
    : diff.map(item => array1.indexOf(item))
}
