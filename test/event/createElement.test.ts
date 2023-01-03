import { describe, expect, it } from 'vitest'
import { createElement } from '../../src/event'

describe('createElement test', () => {
  it('test', () => {
    const div = createElement('div')
    expect(div).toMatchInlineSnapshot('<div />')
  })
})
