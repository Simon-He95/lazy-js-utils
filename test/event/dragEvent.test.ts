import { describe, expect, it } from 'vitest'
import { dragEvent } from '../../src/event'

describe('dragEvent test', () => {
  it.skip('test', () => {
    dragEvent('.drag')
    expect(true).toMatchInlineSnapshot('<DocumentFragment />')
  })
})
