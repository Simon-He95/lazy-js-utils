/**
 * 判断是否是手机号
 * @description EN: Check whether a string looks like a mobile phone number (China-focused pattern).
 * @param s - phone number string
 * @returns boolean
 */
export function isMobile(s: string): boolean {
  return /^((13\d)|(14[5-9])|(15([0-35-9]))|(16[67])|(17[1-8])|(18\d)|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/.test(
    s,
  )
}
