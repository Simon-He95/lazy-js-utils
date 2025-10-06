/**
 * 判断邮箱地址
 * @description EN: Validate whether the input looks like an email address.
 * @param s - email string or number
 * @returns boolean
 */
export function isEmail(s: string | number): boolean {
  return /^[\w.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z0-9]{2,6}$/i.test(
    s.toString(),
  )
}
