export function isSameDay(dateLeft: Date, dateRight: Date): boolean {
  return (
    dateLeft.getFullYear() === dateRight.getFullYear()
    && dateLeft.getMonth() === dateRight.getMonth()
    && dateLeft.getDate() === dateRight.getDate()
  )
}
