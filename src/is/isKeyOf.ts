/**
 * 属性是否存在于对象
 * @param { object } obj 对象
 * @param { string } k 属性
 * @returns
 */
/**
 * 判断属性是否存在于对象上
 * @description EN: Narrowing helper that checks whether a given key exists on an object (using the `in` operator).
 * @param {object} obj Target object.
 * @param {string|symbol} k Candidate key.
 * @returns {k is keyof T}
 */
export function isKeyOf<T extends object>(obj: T, k: keyof any): k is keyof T {
  return k in obj
}
