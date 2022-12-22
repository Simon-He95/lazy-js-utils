import { describe, expect, it } from 'vitest'
import { flatten } from '../../src/array/flatten'

describe('diff test', () => {
  it('test same', () => {
    const obj = {
      a: '1',
      children: [
        {
          b: '12',
          children: {
            e: '44',
          },
        },
        {
          c: '33',
          children: [{ dd: '5' }],
        },
      ],
    }
    expect(flatten(obj)).toMatchInlineSnapshot(`
      [
        {
          "a": "1",
          "children": [
            {
              "b": "12",
              "children": {
                "e": "44",
              },
            },
            {
              "c": "33",
              "children": [
                {
                  "dd": "5",
                },
              ],
            },
          ],
        },
        {
          "b": "12",
          "children": {
            "e": "44",
          },
        },
        {
          "e": "44",
        },
        {
          "c": "33",
          "children": [
            {
              "dd": "5",
            },
          ],
        },
        {
          "dd": "5",
        },
      ]
    `)
  })
})
