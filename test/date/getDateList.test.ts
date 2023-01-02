import { describe, expect, it } from 'vitest'
import { getDateList } from '../../src/date'

describe('getDateList test', () => {
  it('test', () => {
    const d = getDateList('1995-02-10', 10)
    expect(d).toMatchInlineSnapshot(`
      [
        "1995-02-10",
        "1995-02-11",
        "1995-02-12",
        "1995-02-13",
        "1995-02-14",
        "1995-02-15",
        "1995-02-16",
        "1995-02-17",
        "1995-02-18",
        "1995-02-19",
        "1995-02-20",
      ]
    `)
  })
})
