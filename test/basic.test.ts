/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { asyncPool, curry, debounce, deepClone, deepCompare, deepMerge, escapeHtml, getDateList, getLru, htmlTransform, isType, memorizeFn, pwdLevel, quickFilter, quickFind, sleep, sort, sortByOrder, throttle, transformKey, traverse, unescapeHtml, uniqueArray } from '../src'

describe('Test deepMerge', () => {
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

describe('Test deepCompare', () => {
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

describe('Test asyncPool', () => {
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

describe('Test quickFind', () => {
  it('quickFind test', () => {
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

describe('Test quickFilter', () => {
  it('quickFilter test', () => {
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
    expect(quickFilter(arr, 'name=/h/')).toMatchInlineSnapshot(`
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

describe('Test deepClone', () => {
  it('deepClone test', () => {
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

describe('Test curry', () => {
  it('curry test', () => {
    function __add(a: number, b: number, c: number, d: number) {
      return a + b + c + d
    }
    const add = curry(__add)
    expect(add(1, 2)(3)(4)).toBe(10)
  })
})

describe('Test memorizeFn8', () => {
  it('memorizeFn test', () => {
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

describe('Test traverse9', () => {
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

describe('Test transformKey', () => {
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

describe('Test debounce', () => {
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
    await sleep(1000)
    expect(count).toBe(1)
  })
})

describe('Test throttle', () => {
  it('throttle test', async () => {
    let count = 0
    function add() {
      count++
    }
    const fn = throttle(add, 1000)
    fn()
    fn()
    fn()
    await sleep(1000)
    expect(count).toBe(1)
  })
})

describe('Test uniqueArray', () => {
  it('uniqueArray test', () => {
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

describe('Test isType', () => {
  it('isType test', async () => {
    expect(isType([], 'A')).toBe(true)
  })
})

describe('Test getDateList', () => {
  it('getDateList test', () => {
    expect(getDateList('1991/3/02', 7)).toMatchInlineSnapshot(`
      [
        "1991-03-02",
        "1991-03-03",
        "1991-03-04",
        "1991-03-05",
        "1991-03-06",
        "1991-03-07",
        "1991-03-08",
        "1991-03-09",
      ]
    `)
  })
})

describe('Test escapeHtml', () => {
  it('escapeHtml test', () => {
    expect(escapeHtml('< a href=" ">xx</ a>')).toBe('&lt; a href=&quot; &quot;&gt;xx&lt;/ a&gt;')
  })
})

describe('Test unescapeHtml', () => {
  it('unescapeHtml test', async () => {
    expect(unescapeHtml('&lt; a href=&quot; &quot;&gt;xx&lt;/ a&gt;')).toBe('< a href=" ">xx</ a>')
  })
})

describe('Test getLru', () => {
  it('getLru test', async () => {
    const lru = getLru(2)
    lru.set('a', 10)
    lru.set('b', 22)
    lru.get('a')
    lru.set('c', 32)
    expect(lru.get('b')).toBe(undefined)
  })
})

describe('Test sort', () => {
  it('sort test', () => {
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
    expect(sort(arr, 1)).toMatchInlineSnapshot(`
      [
        {
          "age": 4,
          "name": "simon2",
        },
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
      ]
    `)
  })
})

describe('Test pwdLevel', () => {
  it('pwdLevel test', async () => {
    let pwd = '!dasdasdqq12QQ3456'
    expect(pwdLevel(pwd)).toBe(4)
    pwd = '123456'
    expect(pwdLevel(pwd)).toBe(1)
  })
})

// describe('Test exportsCode', () => {
//   it('exportsCode test', async () => {
//     const result = await exportsCode('../package.json')
//     expect(result.version).toMatchInlineSnapshot('"<div :class=\\"myclass\\"></div>"')
//   })
// })

describe('Test htmlTransform', () => {
  it('htmlTransform test', async () => {
    const code = await htmlTransform('<div class="_ee">hello</div><view bindtap="xx"></view>', {
      div(node, { setAttribs, beforeInsert, afterInsert }) {
        node.name = 'p'
        setAttribs('age', '19')
        beforeInsert('<span>hi</span>')
        afterInsert('<span>你好</span>')
      },
      '*': function (node) {
        // 所有的节点都会进入这里
        console.log(node)
      },
      '$attr$_ee': function (node) {
        // $attr开头会匹配存在_ee属性的节点
        console.log(node)
      },
      '$attr$bindtap': function (node, { renameAttribs }) {
        renameAttribs('bindtap', 'onTap')
      },
    })
    expect(code).toMatchSnapshot()
  })
})

describe('Test sortByOrder', () => {
  const order = ['name', '*', 'weight']
  const arr = [{
    props: {
      key: 'weight',
    },
  }, {
    props: {
      key: 'name',
    },
  }, {
    props: {
      key: 'width',
    },
  }, {
    props: {
      key: 'age',
    },
  }]

  it('sortByOrder test', () => {
    expect(sortByOrder(arr, order, 'props.key')).toMatchInlineSnapshot(`
      [
        {
          "props": {
            "key": "name",
          },
        },
        {
          "props": {
            "key": "width",
          },
        },
        {
          "props": {
            "key": "age",
          },
        },
        {
          "props": {
            "key": "weight",
          },
        },
      ]
    `)
  })
})
