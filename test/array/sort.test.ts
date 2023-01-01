import { describe, expect, it } from 'vitest'
import { sort } from '../../src/array'

describe('sort test', () => {
  it('test', () => {
    const arr = [
      {
        name: 'simon1',
        age: 11,
      },
      {
        name: 'simon3',
        age: 22,
      },
      {
        name: 'simon2',
        age: 33,
      },
      {
        name: 'simon2',
        age: 4,
      },
    ]
    expect(sort(arr, '-age')).toMatchInlineSnapshot(`
      [
        {
          "age": 33,
          "name": "simon2",
        },
        {
          "age": 22,
          "name": "simon3",
        },
        {
          "age": 11,
          "name": "simon1",
        },
        {
          "age": 4,
          "name": "simon2",
        },
      ]
    `)
  })
})
