import { isNum } from '../is'

/**
 * 乘倍
 * @param { number | string } i
 * @param { number } multiple 倍数
 * @returns
 * @description EN: Multiply numeric inputs or repeat strings `multiple` times. If `i` is numeric, returns numeric product; otherwise repeats string.
 */
export function multiply(i: number | string, multiple: number) {
  const times = Math.trunc(Number(multiple) || 0)
  // 如果是数值字符串也转换为数字相乘
  if (isNum(i))
    return Number(i) * times
  // 字符串重复，保证非负整数次数
  if (times <= 0)
    return ''
  return String(i).repeat(times)
}
