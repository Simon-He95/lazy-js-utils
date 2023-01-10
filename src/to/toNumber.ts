import { isBool } from '../is/isBool'
import { isStr } from '../is/isStr'

export const toNumber = (
  val: number | string | boolean | undefined | null,
): number => {
  if (val == null)
    return 0

  if (isStr(val)) {
    val = parseFloat(val)
    val = Number.isNaN(val) ? 0 : val
    return val
  }

  if (isBool(val))
    return Number(val)

  return val
}
