import { describe, expect, it } from 'vitest'
import { crossVideoElement } from '../../src/webComponent'

describe('crossVideoElement test', () => {
  it('test', () => {
    crossVideoElement()
    expect(true).toMatchInlineSnapshot('true')
  })
})
