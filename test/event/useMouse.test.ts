import { describe, expect, it } from 'vitest'
import { useMouse } from '../../src/event'

describe('useMouse test', () => {
  it('test', () => {
    useMouse((e) => {
      console.log(e)
    }, 100)

    expect(true).toEqual(true)
  })
})
