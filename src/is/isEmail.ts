/**
 * 判断邮箱地址
 * @param s
 * @returns
 */
export function isEmail(s: string | number): boolean {
  return /^[\w.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z0-9]{2,6}$/i.test(
    s.toString(),
  )
}
