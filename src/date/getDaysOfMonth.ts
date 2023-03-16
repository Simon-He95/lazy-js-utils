export function getDaysOfMonth(currentMonth: number) {
  const d = new Date()
  d.setMonth(currentMonth + 1)
  d.setDate(0)
  return d.getDate()
}
