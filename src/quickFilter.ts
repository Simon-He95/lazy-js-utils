export function quickFilter(array: any[], key: string | Array<string>) {
  const reg = /\/[\w._ $]+\/[gims]{0,}/
  return array.filter((item) => {
    if (Array.isArray(key))
      return key.some(k => findItem(item, k))
    else
      return findItem(item, key)
  })
  function findItem(item: Record<any, any>, key: string): boolean {
    const [_key, _value] = key.split('=')
    if (item[_key] === undefined)
      return false
    return _value !== undefined
      ? reg.test(_value)
        ? new RegExp(eval(_value)).test(item[_key])
        : _value === item[_key]
      : /.*/.test(item[key])
  }
}

