/**
 * 数字格式化
 * @param { number } number 数字
 * @param { number } decimals 小数位
 * @param { 'floor' | 'ceil' } integer 向上截取 ｜ 向下截取 默认 'ceil'
 * @returns
 * @description EN: Format a number with thousands separators and a fixed number of decimal places. Supports rounding via 'floor' or 'ceil'.
 */
export function formateNum(
  number: number | string,
  decimals = 2,
  integer: 'floor' | 'ceil' = 'ceil',
) {
  number = `${number}`.replace(/[^+-Ee]/g, '')
  const n = !Number.isFinite(+number) ? 0 : +number
  const prec = !Number.isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = ','
  const dec = '.'
  const s = (prec ? toFixedFix(n, prec) : `${Math.round(n)}`).split('.')
  const re = /(-?\d+)(\d{3})/

  while (re.test(s[0])) s[0] = s[0].replace(re, `$1${sep}$2`)

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += Array.from({ length: prec - s[1].length + 1 }).join('0')
  }
  return s.join(dec)

  function toFixedFix(n: number, prec: number): string {
    const k = 10 ** prec
    return `${
      integer === 'ceil' ? Math.ceil(n * k) / k : Math.floor(n * k) / k
    }`
  }
}
