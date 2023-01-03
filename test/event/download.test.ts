import { describe, expect, it } from 'vitest'
import { download } from '../../src/event'

describe('download test', () => {
  it.skip('test', () => {
    download('xxx.jpg')
    expect(true).toMatchInlineSnapshot('<DocumentFragment />')
  })
})
