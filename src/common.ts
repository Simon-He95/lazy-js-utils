import { SSF, utils } from 'xlsx'
import { isNum } from './isNum'
import { isBool } from './isBool'
import { isDate } from './isDate'

export const _toString = Object.prototype.toString
export interface WorkbookType {
  SheetNames: string[]
  Sheets: Record<string, any>
}

function datenum(v: string, date1904?: number) {
  if (date1904)
    v += 1462
  const epoch = Date.parse(v)
  return (epoch - +new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

export function sheet_from_array_of_arrays(data: any[][]) {
  const ws: Record<string, any> = {}
  const range = {
    s: {
      c: 10000000,
      r: 10000000,
    },
    e: {
      c: 0,
      r: 0,
    },
  }
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R)
        range.s.r = R
      if (range.s.c > C)
        range.s.c = C
      if (range.e.r < R)
        range.e.r = R
      if (range.e.c < C)
        range.e.c = C
      const cell: Record<string, any> = {
        v: data[R][C],
      }
      if (cell.v == null)
        continue
      const cell_ref = utils.encode_cell({
        c: C,
        r: R,
      })

      if (isNum(cell.v)) { cell.t = 'n' }
      else if (isBool(cell.v)) { cell.t = 'b' }
      else if (isDate(cell.v)) {
        cell.t = 'n'
        cell.z = SSF._table[14]
        cell.v = datenum(cell.v)
      }
      else { cell.t = 's' }

      ws[cell_ref] = cell
    }
  }
  if (range.s.c < 10000000)
    ws['!ref'] = utils.encode_range(range)
  return ws
}

export function workbook(): WorkbookType {
  return {
    SheetNames: [],
    Sheets: {},
  }
}

export function s2ab(s: string) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}
