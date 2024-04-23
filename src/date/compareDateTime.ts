/**
 * 比较2个日期时间的大小
 * @param date1 '2021-02-01 12:00:01' | '2021/02/01 12:00:01'
 * @param date2 '2021-03-02 12:00:00' | '2021/03/02 12:00:00'
 * @param separator '-' | '/' 默认 '-'
 * @returns -1 | 1 | 0
 */
export function compareDateTime(date1: string, date2: string) {
  const date1_time = new Date(date1.replace(/-/g, '/'))
  const date2_time = new Date(date2.replace(/-/g, '/'))

  if (date1_time < date2_time)
    return -1
  if (date1_time > date2_time)
    return 1

  return 0
}
