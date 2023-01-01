import { describe, expect, it } from 'vitest'
import { quickFind } from '../../src/array'

describe('quickFind test', () => {
  it('test', () => {
    const arr = [
      {
        name: 'simon',
        age: 18,
        id: 0,
      },
      {
        name: 'simon1',
        age: 19,
        id: 1,
      },
      {
        name: 'simon2',
        age: 29,
        id: 2,
      },
    ]
    const finder = quickFind(arr, 'id')
    expect(finder.find(2)).toMatchInlineSnapshot(`
      {
        "age": 29,
        "id": 2,
        "name": "simon2",
      }
    `)
    expect(finder.set(2, 'name', 'new value~~')).toMatchInlineSnapshot(`
      [
        {
          "age": 18,
          "id": 0,
          "name": "simon",
        },
        {
          "age": 19,
          "id": 1,
          "name": "simon1",
        },
        {
          "age": 29,
          "id": 2,
          "name": "new value~~",
        },
      ]
    `)
    expect(finder.set(3, { id: 3, name: 'new value' })).toMatchInlineSnapshot(`
      [
        {
          "age": 18,
          "id": 0,
          "name": "simon",
        },
        {
          "age": 19,
          "id": 1,
          "name": "simon1",
        },
        {
          "age": 29,
          "id": 2,
          "name": "new value~~",
        },
        {
          "id": 3,
          "name": "new value",
        },
      ]
    `)
    expect(finder.delete(3)).toMatchInlineSnapshot(`
      [
        {
          "age": 18,
          "id": 0,
          "name": "simon",
        },
        {
          "age": 19,
          "id": 1,
          "name": "simon1",
        },
        {
          "age": 29,
          "id": 2,
          "name": "new value~~",
        },
      ]
    `)
  })
})
