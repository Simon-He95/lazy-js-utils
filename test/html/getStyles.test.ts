import { describe, expect, it } from 'vitest'
import { getStyles } from '../../src/html'

describe('getStyles test', () => {
  it('test', () => {
    const template = `
    <div style="background:red;">hello, world</div>
    `
    const style = getStyles(template, (style) => {
      expect(style).toMatchInlineSnapshot('"background:red;"')
      return `${style}color:white;`
    })

    expect(style).toMatchInlineSnapshot(`
      "
          <div style=\\"background:red;color:white;\\">hello, world</div>
          "
    `)
  })
})
