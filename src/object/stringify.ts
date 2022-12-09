import { hyphenate } from '../string/hyphenate'
import { isNum } from '../is/isNum'
interface StringifyOptions {
  sep?: string
  eq?: string
  hyp?: boolean
  px?: boolean
  encode?: boolean
}
export function stringify(
  o: Record<string, string | number>,
  options: StringifyOptions = {},
): string {
  const {
    sep = '&',
    eq = '=',
    hyp = false,
    px = false,
    encode = true,
  } = options
  return Object.keys(o)
    .map(k => `${hyp ? hyphenate(k) : k}${eq}${getString(encode, px, o, k)}`)
    .join(sep)
}

function getString(
  encode: boolean,
  px: boolean,
  o: Record<string, string | number>,
  k: string,
): string {
  const str = px
    ? isNum(o[k])
      ? `${o[k]}px`
      : o[k].toString()
    : o[k].toString()
  return encode ? encodeURI(str) : str
}
