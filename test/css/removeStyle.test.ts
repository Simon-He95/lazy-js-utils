import { describe, expect, it } from 'vitest'
import { removeStyle } from '../../src/css'

describe('removeStyle test', () => {
  it('test', () => {
    const el = document.createElement('div')
    // el.setAttribute('style', 'background:red;')
    el.style.background = 'red'
    expect(el.style.background).toMatchInlineSnapshot('"red"')
    removeStyle(el, 'background')
    expect(el.style.background).toMatchInlineSnapshot('""')
  })
})
