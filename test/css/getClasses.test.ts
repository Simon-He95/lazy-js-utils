import { describe, expect, it } from 'vitest'
import { getClasses } from '../../src/css'

describe('getClasses test', () => {
  it('test', () => {
    const str = `
    <div class="my-class"></div>
    `
    getClasses(str, (_class) => {
      expect(_class).toMatchInlineSnapshot('"my-class"')
      return _class
    })
  })
})
