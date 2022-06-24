import { formateDate } from './formateDate'
export function getDateList(start: string, day = 0): string[] {
  const tag = start.includes('-')
    ? '-'
    : '/'
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
