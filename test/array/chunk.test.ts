import { describe, expect, it } from 'vitest'
import { chunk } from '../../src/array'

describe('chunk test', () => {
  it('test', () => {
    expect(chunk([1, 3, 5, 7], 2)).toMatchInlineSnapshot(`
      [
        [
          1,
          3,
        ],
        [
          5,
          7,
        ],
      ]
    `)
  })
})
