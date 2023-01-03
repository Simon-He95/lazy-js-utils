import { describe, expect, it } from 'vitest'
import { useKeyBoard } from '../../src/event'

describe('useKeyBoard test', () => {
  it('test', () => {
    useKeyBoard('ctrl+c', () => {
      console.log('press ctrl+c')
    })
    expect(true).toEqual(true)
  })
})
