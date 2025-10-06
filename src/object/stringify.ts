import { hyphenate } from '../string/hyphenate'
import { isNum } from '../is/isNum'

interface StringifyOptions {
  sep?: string // Separator character 分割字符
  eq?: string // =
  hyp?: boolean
  px?: boolean
  encode?: boolean
}
/**
 * Serialize a plain object to a query-string-like representation.
 *
 * Options allow customizing separators, equality sign, whether to hyphenate
 * keys, append `px` to numeric values, and URL-encode values.
 *
 * @param {Record<string,string|number>} o Input object.
 * @param {StringifyOptions} [options] Formatting options.
 * @returns {string} Serialized string.
 * @description EN: Convert a plain object to a delimited key-value string with optional formatting (used for style strings, query strings, etc.).
 */
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

// console.log(
//   stringify(
//     {
//       width: '&@30px',
//       height: '20',
//       minHeight: '20',
//     },
//     {
//       sep: ';',
//       eq: ':',
//       hyp: true,
//     },
//   ),
// )
