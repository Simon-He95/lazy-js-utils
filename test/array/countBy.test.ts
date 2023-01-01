import { describe, expect, it } from 'vitest'
import { countBy } from '../../src/array'

describe('countBy test', () => {
  it('test', () => {
    const array = [
      { user: '1', active: true },
      { user: '2', active: false },
      { user: '3', active: true },
      { user: '4', active: true },
      { user: '5', active: true },
    ]
    const left = countBy(array, item => item.active)
    expect(left).toMatchInlineSnapshot(`
      {
        "false": 1,
        "true": 4,
      }
    `)
  })
})
