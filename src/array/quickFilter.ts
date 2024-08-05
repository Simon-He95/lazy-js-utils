import { isArray } from '../is/isArray'
import { isUndef } from '../is/isUndef'
import { isDef } from '../is/isDef'
import { executeStr } from '../js/executeStr'

/**
 *
 * @param { any[] } array 数组
 * @param { string | Array<string> } key 过滤条件
 * @returns
 */
export function quickFilter(array: any[], key: string | Array<string>) {
  const reg = /\/[\w. $]+\/[gims]*/
  return array.filter((item) => {
    if (isArray(key))
      return key.some(k => findItem(item, k))
    else return findItem(item, key)
  })
  function findItem(item: Record<any, any>, key: string): boolean {
    const [_key, _value] = key.split('=')
    if (isUndef(item[_key]))
      return false
    return isDef(_value)
      ? reg.test(_value)
        ? new RegExp(executeStr(_value)).test(item[_key])
        : _value === item[_key]
      : /.*/.test(item[key])
  }
}
