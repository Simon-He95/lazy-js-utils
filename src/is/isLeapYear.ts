/**
 * Determine whether a year is a leap year.
 *
 * @param {number} year Year number.
 * @returns {boolean}
 */
/**
 * 判断是否为闰年
 * @description EN: Returns true for leap years (divisible by 400 or divisible by 4 and not by 100).
 * @param {number} year Year number.
 * @returns {boolean}
 */
export function isLeapYear(year: number): boolean {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
}
