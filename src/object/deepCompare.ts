import { isArray } from '../is/isArray'
import { isPlainObject } from '../is/isPlainObject'
import { isReg } from '../is/isReg'

// 深比较
export function deepCompare(
  comp1: any,
  comp2: any,
  ignoreKeys?: string[] | RegExp,
  error: string[] = [],
  errorMsg: string[] = [],
  name?: string,
  index?: string,
) {
  if (isPlainObject(comp1) && isPlainObject(comp2)) {
    const longer
      = Object.keys(comp1).length >= Object.keys(comp2).length ? comp1 : comp2
    for (const key in longer) {
      if (
        (isArray(ignoreKeys) && (ignoreKeys as string[]).includes(key))
        || (isReg(ignoreKeys) && (ignoreKeys as RegExp).test(key))
      )
        continue

      const value1 = comp1[key]
      const value2 = comp2[key]
      const _key = name ? `${name}.${key}` : key
      deepCompare(value1, value2, ignoreKeys, error, errorMsg, _key)
    }
  }
  else if (isArray(comp1) && isArray(comp2)) {
    const longer = comp1.length >= comp2.length ? comp1 : comp2
    for (const key in longer) {
      const value1 = comp1[key]
      const value2 = comp2[key]
      deepCompare(value1, value2, ignoreKeys, error, errorMsg, name, key)
    }
  }
  else if (comp1 !== comp2) {
    name = name || 'array'
    const msg = index
      ? `${name}数据不一致，第${index}项,分别为${comp1}   =>    ${comp2}`
      : `${name}数据不一致，分别为${comp1}   =>    ${comp2}`
    error.push(name)
    errorMsg.push(msg)
  }

  return { error, errorMsg }
}
