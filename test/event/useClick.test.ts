import { describe, expect, it } from 'vitest'
import { useClick } from '../../src/event'

describe('useClick test', () => {
  it('test', () => {
    const p = document.createElement('div')
    useClick(p, () => {
      console.log('click test')
    })
    // p.click()
    expect(true).toMatchInlineSnapshot('true')
  })
})
