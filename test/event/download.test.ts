import { describe, expect, it } from 'vitest'
import { download } from '../../src/event'

describe.skip('download test', () => {
  it('test', () => {
    download('xxx.jpg')
    expect(true).toMatchInlineSnapshot('<DocumentFragment />')
  })
})
