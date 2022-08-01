import { hyphenate } from './hyphenate'
import { isNum } from './isNum'
interface StringifyOptions {
  sep?: string
  eq?: string
  hyp?: boolean
  px?: boolean
}
export function stringify(o: Record<string, string>, options: StringifyOptions = {}): string {
  const { sep = '&', eq = '=', hyp = false, px = false } = options
  return Object.keys(o).map(k => `${hyp ? hyphenate(k) : k}${eq}${encodeURI(px ? isNum(o[k]) ? `${o[k]}px` : o[k] : o[k])}`).join(sep)
}
