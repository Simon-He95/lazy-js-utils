import { isBool } from '../is/isBool'
import { isStr } from '../is/isStr'

/**
 * 转换成数字
 * @param {  number | string | boolean | undefined | null } val
 * @returns 数字
 */
export function toNumber(
  val: number | string | boolean | undefined | null,
): number {
  if (val == null)
    return 0

  if (isStr(val)) {
    val = Number.parseFloat(val)
    val = Number.isNaN(val) ? 0 : val
    return val
  }

  if (isBool(val))
    return Number(val)

  return val
}
