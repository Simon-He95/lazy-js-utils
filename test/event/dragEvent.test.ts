import { describe, expect, it } from 'vitest'
import { dragEvent } from '../../src/event'

describe.skip('dragEvent test', () => {
  it('test', () => {
    dragEvent('.drag')
    expect(true).toMatchInlineSnapshot('<DocumentFragment />')
  })
})
