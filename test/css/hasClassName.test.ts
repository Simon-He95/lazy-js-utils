import { describe, expect, it } from 'vitest'
import { hasClassName } from '../../src/css'

describe('hasClassName test', () => {
  it('test', () => {
    const el = document.createElement('div')
    el.setAttribute('class', 'my-class')
    expect(hasClassName(el, 'my-class')).toMatchInlineSnapshot('true')
  })
})
