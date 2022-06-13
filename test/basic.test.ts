import { describe, expect, it } from 'vitest'
import { asyncPool, deepCompare, deepMerge, quickFind, quickFilter } from '../src'

describe('Test 1', () => {
  it('deepMerge test', () => {
    const b = {
      people: {
        name: 'xx',
        age: '11',
        fn: {},
        arr: [1, 2, 3],
      },
      name1: {
        name2: '',
      },
    }
    const c = {
      people: {
        name: 'xx',
        age: '11',
        fn: {
          name: '11',
        },
        arr: [1, 2, 4],
      },
      name1: {
        name2: {},
      },
    }
    expect(deepMerge({}, b, c)).toMatchInlineSnapshot(`
      {
        "name1": {
          "name2": {},
        },
        "people": {
          "age": "11",
          "arr": [
            1,
            2,
            4,
          ],
          "fn": {
            "name": "11",
          },
          "name": "xx",
        },
      }
    `)
  })
})

describe('Test 2', () => {
  it('deepCompare test', () => {
    const b = {
      people: {
        name: 'xx',
        age: '11',
        fn: {},
        arr: [1, 2, 3, 5],
      },
      name1: {
        name2: '',
      },
    }
    const c = {
      people: {
        name: 'xx',
        age: '11',
        fn: {
          name: '11',
        },
        arr: [1, 2, 4],
      },
      name1: {
        name2: {},
      },
    }
    expect(deepCompare(b, c)).toMatchInlineSnapshot(`
      {
        "error": [
          "people.fn.name",
          "people.arr",
          "people.arr",
          "name1.name2",
        ],
        "errorMsg": [
          "people.fn.name数据不一致，分别为undefined   =>    11",
          "people.arr数据不一致，第2项,分别为3   =>    4",
          "people.arr数据不一致，第3项,分别为5   =>    undefined",
          "name1.name2数据不一致，分别为   =>    [object Object]",
        ],
      }
    `)

    const d = [1, 2, 3]
    const e = [1, 2, 4]
    expect(deepCompare(d, e)).toMatchInlineSnapshot(`
      {
        "error": [
          "array",
        ],
        "errorMsg": [
          "array数据不一致，第2项,分别为3   =>    4",
        ],
      }
    `)
  })
})

describe('Test 3', () => {
  it('asyncPool test', async () => {
    function delay(interval: number) {
      return () => new Promise((resolve, reject) => {
        setTimeout(() => {
          if (interval > 1000)
            reject(interval)
          else
            resolve(interval)
        }, interval)
      })
    }

    const tasks = [
      delay(1000),
      delay(1000),
      delay(1000),
      delay(1000),
      delay(1000),
      delay(1000),
      delay(1000),
      delay(1000),
    ]
    expect(await asyncPool(4, tasks)).toMatchInlineSnapshot(`
      [
        1000,
        1000,
        1000,
        1000,
        1000,
        1000,
        1000,
        1000,
      ]
    `)
  })
})

describe('Test 4', () => {
  it('quickFind test', async () => {
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
    expect(quickFind(arr, 'id').find(2)).toMatchInlineSnapshot(`
      {
        "age": 29,
        "id": 2,
        "name": "simon2",
      }
    `)
  })
})

describe('Test 5', () => {
  it('quickFilter test', async () => {
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
    ]
    expect(quickFilter(arr, ['age', 'id'], '3')).toMatchInlineSnapshot(`
      [
        {
          "age": 39,
          "id": 22,
          "name": "simon3",
        },
        {
          "age": 49,
          "id": 3,
          "name": "simon5",
        },
      ]
    `)
  })
})
