/**
 * 判断是否为 NaN
 * @description EN: Wraps Number.isNaN for a consistent helper.
 * @param o Candidate value.
 * @returns {boolean}
 */
export function isNaN(o: any): boolean {
  return Number.isNaN(o)
}
