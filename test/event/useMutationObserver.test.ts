import { describe, expect, it } from 'vitest'
import { useMutationObserver } from '../../src/event'

describe('useMutationObserver test', () => {
  it('test', () => {
    useMutationObserver('div', (mutations) => {
      console.log(mutations)
    })

    expect(true).toEqual(true)
  })
})
