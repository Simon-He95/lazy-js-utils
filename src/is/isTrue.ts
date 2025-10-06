/**
 * 判断是否是true
/**
 * \u5224\u65ad\u662f\u5426\u662ftrue
 * @description EN: Check whether a value is the boolean literal true.
 * @param v - candidate value
 * @returns v is true
 */
export function isTrue(v: any): v is true {
  return v === true
}
