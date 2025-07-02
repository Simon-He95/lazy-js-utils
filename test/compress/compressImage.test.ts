import { describe, expect, it } from 'vitest'
import { compressImage } from '../../src/compress'

describe.skip('compressImage test', () => {
  it('test', () => {
    const image = compressImage('../../assets/kv.png')
    expect(image).toMatchInlineSnapshot('Promise {}')
  })
})
