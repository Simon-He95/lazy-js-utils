/**
 * Parse a time string (HH:MM:SS or MM:SS) into total seconds.
 *
 * Example: '01:02:03' => 1 * 3600 + 2 * 60 + 3
 *
 * @param timeStr - time string in H:M:S or M:S form
 * @returns number of seconds represented by the string
 */
export function parseTime(timeStr: string) {
  const parts = timeStr.split(':')
  const len = parts.length - 1
  return parts.reduce((pre, cur, i) => pre + +cur * 60 ** (len - i), 0)
}

// console.log(parseTime('01:02:03'))
