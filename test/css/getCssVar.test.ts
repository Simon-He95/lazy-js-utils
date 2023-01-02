import { describe, expect, it } from 'vitest'
import { getCssVar } from '../../src/css'

describe('getCssVar test', () => {
  it('test', () => {
    const el = document.createElement('div')
    el.setAttribute('style', '--main-bg: red;')

    getCssVar(el, '--main-bg', (_class) => {
      expect(_class).toMatchInlineSnapshot('""')
      return _class
    })
  })
})
