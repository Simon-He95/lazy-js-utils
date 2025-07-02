import { describe, expect, it } from 'vitest'
import { useElementBounding } from '../../src/event'

describe('useElementBounding test', () => {
  it('test', () => {
    const p = document.createElement('div')
    useElementBounding(p, (res) => {
      expect(res).toMatchInlineSnapshot(`
        {
          "bottom": 0,
          "height": 0,
          "left": 0,
          "right": 0,
          "top": 0,
          "width": 0,
          "x": 0,
          "y": 0,
        }
      `)
    })
  })
})
