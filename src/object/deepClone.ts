const types = [Set, Map, WeakMap, WeakSet, RegExp, Date]
const targetMap = new WeakMap()
export function deepClone(target: any) {
  if (targetMap.has(target))
    return targetMap.get(target)
  if (typeof target === 'function' || target === null)
    return target
  if (types.includes(target.constructor))
    return new target.constructor(target)
  if (typeof target !== 'object')
    return target
  const cloneObj = Object.create(
    Object.getPrototypeOf(target),
    Object.getOwnPropertyDescriptors(target),
  )
  targetMap.set(target, cloneObj)
  for (const key of Reflect.ownKeys(target)) {
    if (typeof target[key] === 'object')
      cloneObj[key] = deepClone(target[key])
    else cloneObj[key] = target[key]
  }
  return cloneObj
}
