import { describe, expect, it } from 'vitest'
import { crossVideoElement } from '../../src/domain'

describe('crossVideoElement test', () => {
  it('test', () => {
    crossVideoElement()
    expect(true).toMatchInlineSnapshot('true')
  })
})
