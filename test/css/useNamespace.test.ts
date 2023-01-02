import { describe, expect, it } from 'vitest'
import { useNamespace } from '../../src/css'

describe('useNamespace test', () => {
  it('test', () => {
    const namespace = useNamespace('vi')
    const select = namespace('select')
    const css = select.b('primary')
    expect(css).toMatchInlineSnapshot('"vi-select-primary"')
  })
})
