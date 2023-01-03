import { describe, expect, it } from 'vitest'
import { insertElement } from '../../src/event'

describe('insertElement test', () => {
  it('test', () => {
    const p = document.createElement('div')
    const div = document.createElement('div')
    insertElement(p, div)
    expect(p.childNodes).toMatchInlineSnapshot(`
      [
        <div />,
      ]
    `)
  })
})
