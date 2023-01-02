import { describe, expect, it } from 'vitest'
import { compressCss } from '../../src/compress'

describe('Canvas test', () => {
  it('test', () => {
    const css = `
    div {
      background: red;
    }
    `
    const compress = compressCss(css)
    expect(compress).toMatchInlineSnapshot('"div{background:red;}"')
  })
})
