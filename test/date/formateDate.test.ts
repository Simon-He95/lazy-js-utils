import { describe, expect, it } from 'vitest'
import { formateDate } from '../../src/date'

describe('formateDate test', () => {
  it('test', () => {
    const d = formateDate(new Date(), 'yyyy-mm-dd')
    expect(d).toMatchInlineSnapshot('"2023-42-07"')
  })
})
