import { describe, expect, it } from 'vitest'
import { useTimeout } from '../../src/event'

describe('useTimeout test', () => {
  it('test', () => {
    let count = 0
    const stop = useTimeout(() => {
      count++
    }, 1000)
    setTimeout(() => {
      stop()
      expect(count).toEqual(1)
    }, 1001)
  })
})
