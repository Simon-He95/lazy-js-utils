/**
 * 判断是否是同一天
 * @param { Date } dateLeft 日期一
 * @param { Date } dateRight 日期二
 */
/**
 * 判断两个日期是否为同一天
 * @description EN: Compares year, month and date to determine whether two Date
 * objects represent the same calendar day.
 * @param {Date} dateLeft First date.
 * @param {Date} dateRight Second date.
 * @returns {boolean}
 */
export function isSameDay(dateLeft: Date, dateRight: Date): boolean {
  return (
    dateLeft.getFullYear() === dateRight.getFullYear()
    && dateLeft.getMonth() === dateRight.getMonth()
    && dateLeft.getDate() === dateRight.getDate()
  )
}
