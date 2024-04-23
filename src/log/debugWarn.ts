import process from 'node:process'
import { isStr } from '../is/isStr'

class CustomerError extends Error {
  constructor(m: string) {
    super(m)
    this.name = 'CustomerError'
  }
}

export function throwError(scope: string, m: string): never {
  throw new CustomerError(`[${scope}] ${m}`)
}

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
