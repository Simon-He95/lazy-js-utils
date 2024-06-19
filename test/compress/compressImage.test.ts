import { describe, expect, it } from 'vitest'
import { compressImage } from '../../src/compress'

describe('compressImage test', () => {
  it.skip('test', () => {
    const image = compressImage('../../assets/kv.png')
    expect(image).toMatchInlineSnapshot('Promise {}')
  })
})
