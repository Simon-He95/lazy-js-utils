export function quickFilter(array: any[], key: string | number | Array<string | number>, value: string | number | RegExp) {
  const val = String(value)
  return array.filter((item) => {
    if (Array.isArray(key))
      return key.some(k => findItem(item, k, val))
    else
      return findItem(item, key, val)
  })
  function findItem(item: Record<any, any>, key: string | number, value: string | RegExp): boolean {
    const reg = new RegExp(value)
    return reg.test(item[key])
  }
}

