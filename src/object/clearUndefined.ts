/**
 * 删除对象中值为undefined的key
 * @param obj 对象
 * @returns
 */
export function clearUndefined<T extends Record<any, any>>(obj: T): T {
  Object.keys(obj).forEach((key: string) =>
    obj[key] === undefined ? delete obj[key] : {},
  )
  return obj
}
