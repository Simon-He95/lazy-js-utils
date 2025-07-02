import { describe, expect, it } from 'vitest'
import { insertElement, removeElement } from '../../src/event'

describe('removeElement test', () => {
  it('test', () => {
    const p = document.createElement('div')
    const div = document.createElement('div')
    insertElement(p, div)
    expect(p.childNodes).toMatchInlineSnapshot(`
      NodeList [
        <div />,
      ]
    `)
    removeElement(div)
    expect(p.childNodes).toMatchInlineSnapshot(`NodeList []`)
  })
})
