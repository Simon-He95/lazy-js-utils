/**
 * Returns the number of days in a given month.
 *
 * @param {number} currentMonth - The month for which to get the number of days (0-based, where 0 = January, 11 = December).
 * @returns {number} The number of days in the specified month.
 */
export function getDaysOfMonth(currentMonth: number) {
  const d = new Date()
  d.setMonth(currentMonth + 1)
  d.setDate(0)
  return d.getDate()
}
