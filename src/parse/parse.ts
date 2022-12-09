import { camelize } from '../string/camelize'

interface ParseOptions {
  sep?: string
  eq?: string
  camel?: boolean
}
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
