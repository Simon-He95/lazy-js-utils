/**
 * 比较两个时间的大小
 *
 * 该函数接受两个时间字符串，格式为 'HH:MM'，并比较它们的大小。
 * 返回值为 0 表示两个时间相同，1 表示第一个时间大于第二个时间，-1 表示第一个时间小于第二个时间。
 * @description EN: Compare two times given as 'HH:MM'. Returns 0 if equal, 1 if time1 > time2, -1 if time1 < time2.
 *
 * @param {string} time1 - 第一个时间字符串，格式为 'HH:MM'
 * @param {string} time2 - 第二个时间字符串，格式为 'HH:MM'
 * @returns {number} - 返回 0 表示两个时间相同，1 表示第一个时间大于第二个时间，-1 表示第一个时间小于第二个时间
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
