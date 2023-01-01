import { describe, expect, it } from 'vitest'
import { forEach } from '../../src/array'

describe('forEach test', () => {
  const array = [
    { user: '1', active: true },
    { user: '2', active: false },
    { user: '3', active: true },
    { user: '4', active: true },
    { user: '5', active: true },
  ]

  it('before return', () => {
    let count = 0
    const left = forEach(array, (item) => {
      count++
      if (!item.active)
        return item.user
    })
    expect(count).toMatchInlineSnapshot('2')
    expect(left).toMatchInlineSnapshot('"2"')
  })

  it('return undefined', () => {
    let count = 0
    const left = forEach(array, () => {
      count++
    })
    expect(count).toMatchInlineSnapshot('5')
    expect(left).toMatchInlineSnapshot('undefined')
  })
})
