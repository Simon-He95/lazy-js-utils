import { describe, expect, it } from 'vitest'
import { useWindowScroll } from '../../src/event'

describe('useWindowScroll test', () => {
  it('test', () => {
    useWindowScroll((left, top) => {
      console.log(left, top)
    })
    expect(true).toEqual(true)
  })
})
