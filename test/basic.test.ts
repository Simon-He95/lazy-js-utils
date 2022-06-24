import { describe, expect, it } from 'vitest'
import { asyncPool, curry, debounce, deepClone, deepCompare, deepMerge, memorizeFn, quickFilter, quickFind, throttle, transformKey, traverse, uniqueArray } from '../src'

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

describe('Test 6', () => {
  it('deepClone test', async () => {
    const arr: any = {
      name: 'simon5',
      age: 49,
      id: 3,
      fn() { },
      reg: /\test/,
      date: Date,
      null: null,
      [Symbol(1)]: 1,
      loop: null,
    }
    arr.loop = arr
    const cloneObj = deepClone(arr)
    expect(cloneObj).toMatchInlineSnapshot('false')
    expect(cloneObj.loop === arr.loop).toMatchInlineSnapshot('10')
  })
})

describe('Test 7', () => {
  it('curry test', async () => {
    function __add(a: number, b: number, c: number, d: number) {
      return a + b + c + d
    }
    const add = curry(__add)
    expect(add(1, 2)(3)(4)).toBe(10)
  })
})

describe('Test 8', () => {
  it('memorizeFn test', async () => {
    let count = 0
    function hello(name: string) {
      count++
      return `hello ${name}`
    }
    const fn = memorizeFn(hello)
    fn()
    fn()
    fn()
    expect(count).toBe(1)
  })
})

describe('Test 9', () => {
  it('traverse test', async () => {
    const arr = [
      {
        name: 'simon',
        family: {
          bro: 'simonBro',
        },
        people: {
          name: 'simonPeople',
          family: {
            bro: 'simonPeopleBro',
          },
        },
      }, {
        name: 'kitty',
        family: {
          bro: 'kittyBro',
        },
        people: {
          name: 'kittyPeople',
          family: {
            bro: 'kittyPeopleBro',
          },
        },
      },
    ]
    expect(traverse(arr, {
      'family.bro': function (target: any, index: number) {
        console.log('traverse~', target, index)
      },
      people(target: any, index: number) {
        target.name = 'haha'
        console.log('traverse~', target, index)
      },
      'people.family': function (target: any, index: number, item: any) {
        console.log('traverse~', target, index, item)
      },
    })).toMatchInlineSnapshot(`
      [
        {
          "family": {
            "bro": "simonBro",
          },
          "name": "simon",
          "people": {
            "family": {
              "bro": "simonPeopleBro",
            },
            "name": "haha",
          },
        },
        {
          "family": {
            "bro": "kittyBro",
          },
          "name": "kitty",
          "people": {
            "family": {
              "bro": "kittyPeopleBro",
            },
            "name": "haha",
          },
        },
      ]
    `)
  })
})

describe('Test 10', () => {
  it('transformKey test', async () => {
    const arr = [
      {
        name: 'simon',
        family: {
          bro: 'simonBro',
        },
        people: {
          name: 'simonPeople',
          family: {
            bro: 'simonPeopleBro',
          },
        },
      },
    ]
    expect(transformKey(arr, {
      'family.bro': 'name',
      'people.family.bro': 'familyName',
    })).toMatchInlineSnapshot(`
      [
        {
          "family": {
            "name": "simonBro",
          },
          "name": "simon",
          "people": {
            "family": {
              "familyName": "simonPeopleBro",
            },
            "name": "simonPeople",
          },
        },
      ]
    `)
  })
})

describe('Test 11', () => {
  it('debounce test', async () => {
    let count = 0
    function add() {
      count++
    }
    const fn = debounce(add, 1000)
    fn()
    fn()
    fn()
    fn()
    fn()
    setTimeout(() => {
      expect(count).toBe(1)
    }, 1000)
  })
})

describe('Test 12', () => {
  it('throttle test', async () => {
    let count = 0
    function add() {
      count++
    }
    const fn = throttle(add, 1000)
    fn()
    fn()
    fn()
    expect(count).toBe(1)
  })
})

describe('Test 13', () => {
  it('uniqueArray test', async () => {
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
