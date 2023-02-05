import { isNum } from '../is'

/**
 * 乘倍
 * @param { number | string } i
 * @param { number } multiple 倍数
 * @returns
 */
export function multiply(i: number | string, multiple: number) {
  if (isNum(i))
    return i * multiple
  else return i.repeat(multiple)
}
