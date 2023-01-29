import { isStr } from '../is/isStr'
import { stringify } from '../object/stringify'

/**
 * 日志输出
 * @param { string } s 内容
 * @param { Record<string, string | number>  } styleObj 样式
 * @param { string } type 类型 'warn' | 'error' | 'log'
 */
export function log(
  s: string | number,
  styleObj: Record<string, string | number> | string = {},
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
