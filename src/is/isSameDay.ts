/**
 * 判断是否是同一天
 * @param { Date } dateLeft 日期一
 * @param { Date } dateRight 日期二
 */
export function isSameDay(dateLeft: Date, dateRight: Date): boolean {
  return (
    dateLeft.getFullYear() === dateRight.getFullYear()
    && dateLeft.getMonth() === dateRight.getMonth()
    && dateLeft.getDate() === dateRight.getDate()
  )
}
