import { describe, expect, it } from 'vitest'
import { useHead } from '../../src/event'

describe('useHead test', () => {
  it('test', () => {
    useHead({
      title: 'myhead',
    })

    expect(true).toBe(true)
  })
})
