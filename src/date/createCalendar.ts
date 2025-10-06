import { getDaysOfMonth } from './getDaysOfMonth'

/**
 * 返回当前月份的日历数组信息
 * @description EN: Generate a 6x7 calendar grid for the specified month index (0-based), returning an array of weeks with day numbers.
 * @param currentMonth 今天的月份-1 从0开始
 * @returns number[][]
 */
export function createCalendar(currentMonth: number) {
  const monthList = []
  const d = new Date()
  d.setMonth(currentMonth)
  d.setDate(1)
  let count = 0
  const currentDay = d.getDay()
  const preMonthDays = getDaysOfMonth(currentMonth - 1)
  console.log(currentDay)

  for (let i = 0; i < 6; i++) {
    const weekList = Array.from({ length: 7 })
    if (i === 0) {
      for (let j = 0; j < weekList.length; j++) {
        weekList[j]
          = j < currentDay ? preMonthDays - currentDay + j + 1 : ++count
      }
    }
    else {
      for (let j = 0; j < weekList.length; j++) {
        if (count >= getDaysOfMonth(currentMonth))
          count = 0
        weekList[j] = ++count
      }
    }
    monthList.push(weekList)
  }
  return monthList
}
