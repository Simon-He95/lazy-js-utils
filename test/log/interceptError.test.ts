import { describe, expect, it } from 'vitest'
import { interceptError } from '../../src/log/interceptError'

describe('interceptError', () => {
  it('should catch synchronous errors and rethrow as Error', () => {
    function bad() {
      // throw a non-Error value
      // eslint-disable-next-line no-throw-literal
      throw 'sync-fail'
    }

    const wrapped = interceptError(bad)

    expect(() => wrapped()).toThrowError(/sync-fail/)
  })

  it('should catch rejected promises and rethrow as Error', async () => {
    async function badAsync() {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('async-fail')
    }

    const wrapped = interceptError(badAsync)

    await expect(wrapped()).rejects.toThrowError(/async-fail/)
  })

  it('should preserve this context and forward return value', () => {
    const obj = {
      x: 1,
      getX(add: number) {
        return this.x + add
      },
    }

    obj.getX = interceptError(obj.getX as any) as any

    expect(obj.getX(2)).toBe(3)
  })
})
