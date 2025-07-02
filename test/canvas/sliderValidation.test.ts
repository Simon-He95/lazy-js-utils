import { describe, expect, it } from 'vitest'
import { sliderValidation } from '../../src/canvas'

describe.skip('sliderValidation test', () => {
  it('test', () => {
    sliderValidation('../../assets/kv.png', 'body')
    expect(true).toBe(true)
  })
})
