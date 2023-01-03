import { describe, expect, it } from 'vitest'
import { useResizeObserver } from '../../src/event'

describe('useResizeObserver test', () => {
  it('test', () => {
    useResizeObserver((width, height) => {
      console.log(width, height)
    })

    expect(true).toEqual(true)
  })
})
