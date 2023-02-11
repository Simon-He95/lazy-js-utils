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
 * 对象序列化
 * @param { Record<string, string | number> } o {}
 * @param { StringifyOptions } options {}
 * @param { string } [options.sep] 分割字符 默认 &
 * @param { string } [options.eq] 连接字符 默认 =
 * @param { boolean } [options.hyp] aBb属性名转为a-bb
 * @param { boolean } [options.px] 自动给数字添加px
 * @param { boolean } [options.encode] 将结果encode
 * @returns
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
