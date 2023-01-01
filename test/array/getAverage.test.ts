import { describe, expect, it } from 'vitest'
import { getAverage } from '../../src/array'

describe('getAverage test', () => {
  it('test', () => {
    const numbers = [2, 3]
    expect(getAverage(numbers)).toMatchInlineSnapshot('"2.50"')
  })
})
