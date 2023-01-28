import { isFn } from '../is/isFn'
import { isNull } from '../is/isNull'
import { isObject } from '../is/isObject'

const types = [Set, Map, WeakMap, WeakSet, RegExp, Date]
const targetMap = new WeakMap()
/**
 * 神拷贝
 * @param { any } target 克隆的目标
 * @returns
 */
export function deepClone(target: any) {
  if (targetMap.has(target))
    return targetMap.get(target)
  if (isFn(target) || isNull(target))
    return target
  if (types.includes(target.constructor))
    return new target.constructor(target)
  if (!isObject(target))
    return target
  const cloneObj = Object.create(
    Object.getPrototypeOf(target),
    Object.getOwnPropertyDescriptors(target),
  )
  targetMap.set(target, cloneObj)
  for (const key of Reflect.ownKeys(target)) {
    if (isObject(target[key]))
      cloneObj[key] = deepClone(target[key])
    else cloneObj[key] = target[key]
  }
  return cloneObj
}
