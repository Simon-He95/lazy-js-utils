import { formateDate } from './formateDate'

/**
 * Generates a list of dates starting from a given date.
 *
 * @param {string} start - The start date in the format 'YYYY-MM-DD' or 'YYYY/MM/DD'.
 * @param {number} [day] - The number of days to generate. If negative, dates will be generated in reverse order.
 * @returns {string[]} An array of date strings in the format 'YYYY-MM-DD'.
 *
 * @example
 * ```typescript
 * getDateList('2023-01-01', 5);
 * // Returns ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06']
 * ```
 */
export function getDateList(start: string, day = 0): string[] {
  const tag = start.includes('-') ? '-' : '/'
  const [startY, startM, startD] = start.split(tag)
  const startTime = new Date(+startY, +startM - 1, +startD).getTime()
  const dateList: string[] = []
  let flag = true
  if (day < 0)
    flag = false
  day = Math.abs(day)
  for (let i = 0; i <= day; i++) {
    const timestamp = flag
      ? startTime + i * 24 * 60 * 60 * 1000
      : startTime - i * 24 * 60 * 60 * 1000
    dateList.push(formateDate(new Date(timestamp)))
  }
  return dateList
}
