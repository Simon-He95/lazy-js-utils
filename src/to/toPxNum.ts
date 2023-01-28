import { isNum, isStr } from '../is'
import { isPx } from '../is/isPx'
import { isRem } from '../is/isRem'
import { isVh } from '../is/isVh'
import { isVw } from '../is/isVw'
import { toNumber } from './toNumber'

/**
 * 将长度单位转换为数字
 * @param value
 * @returns
 */
export const toPxNum = (value: unknown): number => {
  if (isNum(value))
    return value

  if (isPx(value))
    return +(value as string).replace('px', '')

  if (isVw(value))
    return (+(value as string).replace('vw', '') * window.innerWidth) / 100

  if (isVh(value))
    return (+(value as string).replace('vh', '') * window.innerHeight) / 100

  if (isRem(value)) {
    const num = +(value as string).replace('rem', '')
    const rootFontSize = window.getComputedStyle(
      document.documentElement,
    ).fontSize

    return num * parseFloat(rootFontSize)
  }

  if (isStr(value))
    return toNumber(value)

  // % and other
  return 0
}
