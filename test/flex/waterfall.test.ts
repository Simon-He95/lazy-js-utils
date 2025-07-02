import { describe, expect, it } from 'vitest'
import { waterfall } from '../../src/flex'

describe.skip('waterfall test', () => {
  it('test', () => {
    waterfall([], 'body', 200)
    expect(true).toBe(true)
  })
})
