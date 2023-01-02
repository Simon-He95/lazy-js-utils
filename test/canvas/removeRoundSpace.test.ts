import { describe, expect, it } from 'vitest'
import { removeRoundSpace } from '../../src/canvas'

describe('removeRoundSpace test', () => {
  it('test', () => {
    const arrays = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ]
    expect(removeRoundSpace(arrays)).toMatchInlineSnapshot(`
      [
        [
          1,
          0,
        ],
        [
          1,
          0,
        ],
        [
          1,
          0,
        ],
      ]
    `)
  })
})
