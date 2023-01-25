import { camelize } from '../string/camelize'

interface ParseOptions {
  sep?: string
  eq?: string
  camel?: boolean
}
/**
 *
 * @param { string } str 字符串
 * @param { ParseOptions } options {
  sep?: string
  eq?: string
  camel?: boolean
}
 * @param { string } options.seq 默认 &
 * @param { string } options.eq 默认 =
 * @param { string } options.camel 默认 false
 * @returns
 */
export function parse(str: string, options: ParseOptions = {}) {
  const { sep = '&', eq = '=', camel = false } = options
  return str.split(sep).reduce((pre, cur) => {
    const [key, value] = cur.split(eq)
    if (camel)
      pre[camelize(key)] = value
    else pre[key] = value
    return pre
  }, {} as Record<string, string>)
}
