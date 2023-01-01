import { describe, expect, it } from 'vitest'
import { uniqueArray } from '../../src/array'

describe('uniqueArray test', () => {
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
      {
        name: 'simon',
        age: 19,
      },
      {
        name: 'simon',
        age: '19',
        hobby: ['1', '2', '3'],
      },
      {
        name: 'simon',
        age: '19',
        hobby: ['1', '2', '3'],
      },
      {
        name: 'simon',
        age: '19',
      },
    ]
    expect(uniqueArray(array)).toMatchInlineSnapshot(`
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
        {
          "age": 19,
          "name": "simon",
        },
        {
          "age": "19",
          "hobby": [
            "1",
            "2",
            "3",
          ],
          "name": "simon",
        },
        {
          "age": "19",
          "name": "simon",
        },
      ]
    `)
  })
})
