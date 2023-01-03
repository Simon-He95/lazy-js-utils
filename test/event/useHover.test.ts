import { describe, expect, it } from 'vitest'
import { useHover } from '../../src/event'

describe('useHover test', () => {
  it('test', () => {
    useHover('div', () => {
      console.log('isHovered')
    })

    expect(true).toBe(true)
  })
})
