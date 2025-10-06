import { isBool } from '../is/isBool'
import { isStr } from '../is/isStr'

/**
/**
 * Convert a value to number with sensible defaults.
 *
 * - `null`/`undefined` -> 0
 * - string -> parseFloat or 0 if NaN
 * - boolean -> Number(boolean)
 *
 * @param {number|string|boolean|undefined|null} val Input value.
 * @returns {number} Numeric representation.
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

  return val as number
}
