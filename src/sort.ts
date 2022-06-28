import { isType } from './isType'

export function sort(array: any[], match: Array<string | number> | number | string): any[] {
  if (isType(match, 's|n'))
    match = [`${match}`] as string[]

  return (match as string[]).reduce((result, cur) => {
    let flag = false
    if (cur[0] === '-') {
      flag = true
      cur = cur.slice(1)
    }
    return result.sort((a, b) => {
      if (cur !== '1' && (b[cur] === a[cur]))
        return 0
      if (flag) {
        if (cur === '1')
          return b > a ? 1 : -1
        return b[cur] > a[cur] ? 1 : -1
      }
      if (cur === '1')
        return a > b ? 1 : -1
      return b[cur] > a[cur] ? -1 : 1
    })
  }, array)
}
