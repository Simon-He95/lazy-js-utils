import { describe, expect, it } from 'vitest'
import { escapeHtml } from '../../src/html'

describe('escapeHtml test', () => {
  it('test', () => {
    const template = `
    <div style="background:red;">hello, world</div>
    `

    expect(escapeHtml(template)).toMatchInlineSnapshot(`
      "
          &lt;div style=&quot;background:red;&quot;&gt;hello, world&lt;/div&gt;
          "
    `)
  })
})
