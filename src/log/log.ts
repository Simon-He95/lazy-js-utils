import { isStr } from '../is/isStr'
import { stringify } from '../object/stringify'
export function log(
  s: string | number,
  styleObj: Record<string, string | number> | string,
  type: 'warn' | 'error' | 'log' = 'log',
): void {
  console[type](
    '%c%s',
    isStr(styleObj)
      ? styleObj
      : stringify(styleObj, {
        sep: ';',
        eq: ':',
        hyp: true,
        px: true,
        encode: false,
      }),
    s,
  )
}
