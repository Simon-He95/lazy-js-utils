import { describe, expect, it } from 'vitest'
import { useFocus } from '../../src/event'

describe('useFocus test', () => {
  it('test', () => {
    const p = document.createElement('input')
    useFocus(p)

    expect(true).toBe(true)
  })
})
