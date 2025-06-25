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

  it('test with keys parameter', () => {
    // 测试按单个键去重
    const arrayWithName = [
      { name: 'Tom', age: 20 },
      { name: 'Tom', age: 25 },
      { name: 'Jerry', age: 20 },
    ]
    expect(uniqueArray(arrayWithName, ['name'])).toEqual([
      { name: 'Tom', age: 20 },
      { name: 'Jerry', age: 20 },
    ])

    // 测试按多个键去重
    const arrayWithMultipleKeys = [
      { name: 'Tom', age: 20, city: 'New York' },
      { name: 'Tom', age: 20, city: 'Los Angeles' },
      { name: 'Tom', age: 25, city: 'New York' },
      { name: 'Jerry', age: 20, city: 'New York' },
    ]
    expect(uniqueArray(arrayWithMultipleKeys, ['name', 'age'])).toEqual([
      { name: 'Tom', age: 20, city: 'New York' },
      { name: 'Tom', age: 25, city: 'New York' },
      { name: 'Jerry', age: 20, city: 'New York' },
    ])

    // 测试嵌套对象键
    const arrayWithNestedKeys = [
      { name: 'Tom', target: { age: 20, skills: ['js', 'ts'] } },
      { name: 'Tom', target: { age: 20, skills: ['js', 'ts'] } },
      { name: 'Jerry', target: { age: 20, skills: ['python'] } },
      { name: 'Bob', target: { age: 25, skills: ['js', 'ts'] } },
    ]
    expect(uniqueArray(arrayWithNestedKeys, ['target.age'])).toEqual([
      { name: 'Tom', target: { age: 20, skills: ['js', 'ts'] } },
      { name: 'Bob', target: { age: 25, skills: ['js', 'ts'] } },
    ])

    // 测试嵌套对象完整比较
    expect(uniqueArray(arrayWithNestedKeys, ['target'])).toEqual([
      { name: 'Tom', target: { age: 20, skills: ['js', 'ts'] } },
      { name: 'Jerry', target: { age: 20, skills: ['python'] } },
      { name: 'Bob', target: { age: 25, skills: ['js', 'ts'] } },
    ])

    // 测试空keys数组，应该使用原有逻辑
    expect(uniqueArray([1, 2, 2, 3], [])).toEqual([1, 2, 3])
  })
})
