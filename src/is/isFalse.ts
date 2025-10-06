/**
 * 判断是否是false
 * @description EN: Check whether a value is the boolean false.
 * @param v - candidate value
 * @returns boolean
 */
export function isFalse(v: any): v is false {
  return v === false
}
