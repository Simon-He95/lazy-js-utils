import { isArray } from '../is/isArray'
import { isUndef } from '../is/isUndef'
import { isDef } from '../is/isDef'
export function quickFilter(array: any[], key: string | Array<string>) {
  const reg = /\/[\w._ $]+\/[gims]*/
  return array.filter((item) => {
    if (isArray(key))
      return key.some(k => findItem(item, k))
    else return findItem(item, key)
  })
  function findItem(item: Record<any, any>, key: string): boolean {
    const [_key, _value] = key.split('=')
    if (isUndef(item[_key] === undefined))
      return false
    return isDef(_value)
      ? reg.test(_value)
        ? new RegExp(eval(_value)).test(item[_key])
        : _value === item[_key]
      : /.*/.test(item[key])
  }
}
