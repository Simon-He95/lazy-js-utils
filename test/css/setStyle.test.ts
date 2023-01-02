import { describe, expect, it } from 'vitest'
import { setStyle } from '../../src/css'

describe('setStyle test', () => {
  it('test', () => {
    const el = document.createElement('div')
    setStyle(el, {
      background: 'red',
    })
    expect(el.style.background).toMatchInlineSnapshot('"red"')
  })
})
