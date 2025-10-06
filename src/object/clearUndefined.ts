/**
 * 删除对象中值为undefined的key
 * @param obj 对象
 * @returns
 * @description EN: Remove keys whose values are `undefined` from an object (mutates and returns the same object).
 */
export function clearUndefined<T extends Record<any, any>>(obj: T): T {
  Object.keys(obj).forEach((key: string) =>
    obj[key] === undefined ? delete obj[key] : {},
  )
  return obj
}
