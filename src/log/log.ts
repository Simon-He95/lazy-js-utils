import { isStr } from '../is/isStr'
import { stringify } from '../object/stringify'

/**
 * 日志输出
 * @description EN: Print styled logs to console with optional level, CSS styles, and extra arguments.
 * @param { string | number } s 日志内容
 * @param {{ type?: 'warn' | 'error' | 'log'; style?: Record<string, string | number> | string; args?: any[] }} [options] 控制打印类型、样式与追加参数
 * @returns { void }
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
