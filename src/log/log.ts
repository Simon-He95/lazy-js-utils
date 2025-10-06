import { isStr } from '../is/isStr'
import { stringify } from '../object/stringify'

/**
 * 日志输出
 * @param { string } s 内容
 * @param { Record<string, string | number>  } styleObj 样式
 * @param { string } type 类型 'warn' | 'error' | 'log'
 * @description EN: Print styled logs to console with optional type and extra args. Accepts style object or CSS string.
 */
export function log(
  s: string | number,
  options?: {
    type?: 'warn' | 'error' | 'log'
    style?: Record<string, string | number> | string
    args?: any[]
  },
): void {
  const { type = 'log', style = '', args = [] } = options || {}
  console[type](
    `%c${s}`,
    isStr(style)
      ? style
      : stringify(style, {
          sep: ';',
          eq: ':',
          hyp: true,
          px: true,
          encode: false,
        }),
    ...args,
  )
}
