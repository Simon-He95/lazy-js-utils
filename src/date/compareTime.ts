/**
 *  比较2个时间的大小
 * @param time1 '12:01'
 * @param time2 '22:01'
 * @returns 0 | 1 | -1
 */
export function compareTime(time1: string, time2: string) {
  const time1Parts = time1.split(':')
  const time2Parts = time2.split(':')

  // 比较小时
  if (time1Parts[0] < time2Parts[0])
    return -1
  if (time1Parts[0] > time2Parts[0])
    return 1

  // 比较分钟
  if (time1Parts[1] < time2Parts[1])
    return -1
  if (time1Parts[1] > time2Parts[1])
    return 1

  // 时间相同
  return 0
}
