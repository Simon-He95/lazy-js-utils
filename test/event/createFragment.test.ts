import { describe, expect, it } from 'vitest'
import { createFragment } from '../../src/event'

describe('createFragment test', () => {
  it('test', () => {
    const div = createFragment()
    expect(div).toMatchInlineSnapshot('<DocumentFragment />')
  })
})
