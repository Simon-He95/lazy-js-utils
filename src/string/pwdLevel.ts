/**
 * 检测字符串强度
 * @param { string | number } s 字符串
 * @param { number } minimum 长度 默认 6
 * @returns
 */
export function pwdLevel(s: string | number, minimum = 6): number {
  let level = 0
  s = `${s}`
  if (s.match(/[a-z]/g))
    level++
  if (s.match(/[A-Z]/g))
    level++
  if (s.match(/\d/g))
    level++
  if (s.match(/[^a-z0-9]/gi))
    level++
  if (s.length < minimum)
    level = 0
  return level
}
