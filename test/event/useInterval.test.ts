import { describe, expect, it } from 'vitest'
import { useInterval } from '../../src/event'

describe('useInterval test', () => {
  it('test', () => {
    let count = 0
    const stop = useInterval(() => {
      count++
    }, 1000)
    expect(count).toEqual(0)

    setTimeout(() => {
      stop()
      expect(count).toEqual(1)
    }, 1000)
  })
})
