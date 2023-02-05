/**
 * 属性是否存在于对象
 * @param { object } obj 对象
 * @param { string } k 属性
 * @returns
 */
export function isKeyOf<T extends object>(obj: T, k: keyof any): k is keyof T {
  return k in obj
}
