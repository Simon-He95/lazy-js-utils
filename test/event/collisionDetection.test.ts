import { describe, expect, it } from 'vitest'
import { collisionDetection } from '../../src/event'

describe('collisionDetection test', () => {
  it('test', () => {
    expect(collisionDetection('.div1', '.div2')).toMatchInlineSnapshot('false')
  })
})
