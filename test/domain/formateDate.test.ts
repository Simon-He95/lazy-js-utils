import { describe, expect, it } from 'vitest'
import { crossImageElement } from '../../src/domain'

describe('crossImageElement test', () => {
  it('test', () => {
    crossImageElement()
    expect(true).toMatchInlineSnapshot('true')
  })
})
