import { describe, expect, it } from 'vitest'
import { unescapeHtml } from '../../src/html'

describe('unescapeHtml test', () => {
  it('test', () => {
    const template
      = '&lt;div style=&quot;background:red;&quot;&gt;hello, world&lt;/div&gt;'

    expect(unescapeHtml(template)).toMatchInlineSnapshot(
      '"<div style=\\"background:red;\\">hello, world</div>"',
    )
  })
})
