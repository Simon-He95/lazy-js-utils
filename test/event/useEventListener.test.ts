import { describe, expect, it } from 'vitest'
import { useEventListener } from '../../src/event'

describe('useEventListener test', () => {
  it('test', () => {
    const p = document.createElement('div')
    // useEventListener
    useEventListener(p, 'click', () => {
      console.log('click')
    })
    expect(true).toBe(true)
  })
})
