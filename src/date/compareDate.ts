/**
 * 比较2个月份的大小
 * @param date1 '2021-02-01' | '2021/02/01'
 * @param date2 '2021-03-02' | '2021/03/02'
 * @param separator '-' | '/' 默认 '-'
 * @returns -1 | 1 | 0
 */
export function compareDate(
  date1: string,
  date2: string,
  separator: '-' | '/' = '-',
) {
  const date1Parts = date1.split(separator)
  const date2Parts = date2.split(separator)
  if (date1Parts[0] < date2Parts[0])
    return -1
  if (date1Parts[0] > date2Parts[0])
    return 1

  // 比较月份
  if (date1Parts[1] < date2Parts[1])
    return -1
  if (date1Parts[1] > date2Parts[1])
    return 1

  // 比较日
  if (date1Parts[2] < date2Parts[2])
    return -1
  if (date1Parts[2] > date2Parts[2])
    return 1

  // 日期相同
  return 0
}
