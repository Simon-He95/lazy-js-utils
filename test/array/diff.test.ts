import { describe, expect, it } from 'vitest'
import { diff } from '../../src/array/diff'

describe('diff test', () => {
  it('test same', () => {
    const arr1 = ['1', '2']
    const arr2 = ['2', '3']
    expect(
      diff(arr1, arr2, {
        compare: 'same',
        result: 'value',
      }),
    ).toEqual(['2'])
  })
  it('test different', () => {
    const arr1 = ['1', '2']
    const arr2 = ['2', '3']
    expect(
      diff(arr1, arr2, {
        compare: 'different',
        result: 'value',
      }),
    ).toMatchInlineSnapshot([['1', '3']])
  })
})
