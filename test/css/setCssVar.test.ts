import { describe, expect, it } from 'vitest'
import { setCssVar } from '../../src/css'

describe('setCssVar test', () => {
  it('test', () => {
    const el = document.createElement('div')
    setCssVar(el, { '--main-bg': 'red' })
    expect(el.style[0]).toMatchInlineSnapshot('"--main-bg"')
  })
})
