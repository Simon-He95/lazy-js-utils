import { describe, expect, it } from 'vitest'
import { findElement } from '../../src/event'

describe('findElement test', () => {
  it('test', () => {
    const div = findElement('div')
    expect(div).toMatchInlineSnapshot('null')
  })
})
