import { describe, expect, it } from 'vitest'
import { useIntersectionObserver } from '../../src/event'

describe('useIntersectionObserver test', () => {
  it('test', () => {
    useIntersectionObserver('div', (res) => {
      console.log(res)
    })

    expect(true).toBe(true)
  })
})
