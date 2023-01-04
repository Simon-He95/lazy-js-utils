import { describe, expect, it } from 'vitest'
import { waterfall } from '../../src/flex'

describe('waterfall test', () => {
  it.skip('test', () => {
    waterfall([], 'body', 200)
    expect(true).toBe(true)
  })
})
