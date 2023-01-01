import { describe, expect, it } from 'vitest'
import { quickFilter } from '../../src/array'

describe('quickFilter test', () => {
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
        hobby: 18,
        id: 1,
      },
      {
        name: 'simon2',
        age: 29,
        id: 2,
      },
      {
        name: 'simon3',
        age: 29,
        id: 20,
      },
      {
        name: 'simon3',
        age: 39,
        id: 22,
      },
      {
        name: 'simon5',
        age: 49,
        id: 3,
      },
      {
        name: 'hi',
      },
      {
        name: 'hi',
        age: '2',
        en: '0',
      },
    ]
    expect(quickFilter(arr, ['name=/h/'])).toMatchInlineSnapshot(`
      [
        {
          "name": "hi",
        },
        {
          "age": "2",
          "en": "0",
          "name": "hi",
        },
      ]
    `)
  })
})
