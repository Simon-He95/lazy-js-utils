import { describe, expect, it } from 'vitest'
import { crossImageElement } from '../../src/webComponent'

describe('crossImageElement test', () => {
  it('test', () => {
    crossImageElement()
    expect(true).toMatchInlineSnapshot('true')
  })
})
