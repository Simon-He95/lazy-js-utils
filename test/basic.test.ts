import { describe, expect, it } from 'vitest'
import { deepMerge, deepCompare, asyncPool } from '../src'



describe('Test 1', () => {
  it('deepMerge test', () => {
    let b = {
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
    let c = {
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
    let b = {
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
    let c = {
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

    let d = [1, 2, 3]
    let e = [1, 2, 4]
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
          console.log(interval)
          if (interval > 1000) {
            reject(interval)
          } else {
            resolve(interval)
          }
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
      delay(1000)
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
