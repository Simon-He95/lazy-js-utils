import { describe, expect, it } from 'vitest'
import { filterEmpty } from '../../src/array'

describe('filterEmpty test', () => {
  it('test', () => {
    const array = [
      {
        name: 'simon',
        age: '18',
      },
      {
        name: 'simon',
        age: '18',
        hobby: 'basketball',
      },
      null,
      undefined,
      '',
    ]
    expect(filterEmpty(array)).toMatchInlineSnapshot(`
      [
        {
          "age": "18",
          "name": "simon",
        },
        {
          "age": "18",
          "hobby": "basketball",
          "name": "simon",
        },
      ]
    `)
  })
})
