import { describe, expect, it } from 'vitest'
import { Canvas } from '../../src/canvas'

describe('canvas test', () => {
  it.skip('test', () => {
    const { canvas } = new Canvas(200, 300)
    const { width, height } = canvas
    expect(width).toEqual(200)
    expect(height).toEqual(300)
  })
})
