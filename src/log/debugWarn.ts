import process from 'node:process'
import { isStr } from '../is/isStr'

class CustomerError extends Error {
  constructor(m: string) {
    super(m)
    this.name = 'CustomerError'
  }
}

/**
 * 抛出具有作用域前缀的自定义错误
 * @description EN: Throw a namespaced `CustomerError` so invariant violations carry contextual scope information.
 * @param { string } scope 错误发生的作用域标识
 * @param { string } m 错误信息内容
 * @returns { never }
 */
export function throwError(scope: string, m: string): never {
  throw new CustomerError(`[${scope}] ${m}`)
}

/**
 * 开发环境警告输出
 * @description EN: Emit a warning in non-production builds, accepting either an error instance or scope/message pair.
 * @param { Error | string } scope 错误对象或作用域标识
 * @param { string } [message] 当 scope 为字符串时对应的警告信息
 * @returns { void }
 */
export function debugWarn(err: Error): void
export function debugWarn(scope: string, message: string): void
export function debugWarn(scope: string | Error, message?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    const error: Error = isStr(scope)
      ? new CustomerError(`[${scope}] ${message}`)
      : scope

    console.warn(error)
  }
}
