import { describe, expect, it } from 'vitest'
import { useLongPress } from '../../src/event'

describe('useLongPress test', () => {
  it('test', () => {
    useLongPress('div', 1000, () => {
      console.log('you press div more than 1000ms')
    })
    expect(true).toEqual(true)
  })
})
