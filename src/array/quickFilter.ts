import { isArray } from '../is/isArray'
import { isUndef } from '../is/isUndef'
import { isDef } from '../is/isDef'
import { executeStr } from '../js/executeStr'

/**
 * 快速筛选数组项，支持简易条件或正则
 * @description EN: Filter an array quickly by simple conditions or regex expressions. Keys can be 'prop=value' or regex literals.
 * @param {any[]} array Input array of objects.
 * @param {string | string[]} key Filter key or array of keys.
 * @returns {any[]} Filtered array.
 */
export function quickFilter(array: any[], key: string | Array<string>) {
  const reg = /\/[\w. $]+\/[gims]*/
  return array.filter((item) => {
    if (isArray(key))
      return key.some(k => findItem(item, k))
    else return findItem(item, key)
  })
  function findItem(item: Record<any, any>, k: string): boolean {
    const [_key, _value] = k.split('=')
    if (isUndef(item[_key]))
      return false
    return isDef(_value)
      ? reg.test(_value)
        ? new RegExp(executeStr(_value)).test(item[_key])
        : _value === item[_key]
      : /.*/.test(item[k])
  }
}
