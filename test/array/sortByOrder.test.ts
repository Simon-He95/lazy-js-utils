import { describe, expect, it } from 'vitest'
import { sortByOrder } from '../../src/array'

describe('sortByOrder test', () => {
  it('test', () => {
    const order = ['name', '*', 'weight']

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
    expect(sortByOrder(arr, order, 'props.key')).toMatchInlineSnapshot(`
      [
        {
          "age": 11,
          "name": "simon1",
        },
        {
          "age": 22,
          "name": "simon3",
        },
        {
          "age": 33,
          "name": "simon2",
        },
        {
          "age": 4,
          "name": "simon2",
        },
      ]
    `)
  })
})
