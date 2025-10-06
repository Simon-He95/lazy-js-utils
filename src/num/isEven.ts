/**
 * 判断偶数
 * @param { number } n 数字
 * @returns
 * @description EN: Return true if `n` is an even integer (coerced to number).
 */
export function isEven(n: number | string) {
  return +n % 2 === 0
}
