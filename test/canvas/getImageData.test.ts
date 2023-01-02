import { describe, expect, it } from 'vitest'
import { getImageData } from '../../src/canvas'

describe('getImageData test', () => {
  it('test', () => {
    getImageData('../../assets/kv.png')
    expect(true).toBe(true)
  })
})
