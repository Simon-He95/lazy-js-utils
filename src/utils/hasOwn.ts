/**
 * 判断对象是否拥有指定的自有属性
 * @description EN: Check whether the given object has an own property named `key`.
 * @param { object } obj 需要检查的对象
 * @param { string } key 属性名
 * @returns { boolean }
 */
export function hasOwn(obj: object, key: string): boolean {
  return Reflect.has(obj, key)
}
