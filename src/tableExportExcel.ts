import { saveAs } from 'file-saver'
import { write } from 'xlsx'
import type { BookType } from 'xlsx'
import { s2ab, sheet_from_array_of_arrays, workbook } from './common'
import { findElement } from './findElement'
import { isStr } from './isStr'
import { addEventListener } from './addEventListener'

export function tableExportExcel(selector: string | HTMLTableElement, fileName = 'test.xlsx', sheetName = 'sheet1') {
  let mounted = false
  update()
  addEventListener(document, 'DOMContentLoaded', update)
  function update() {
    if (isStr(selector))
      selector = findElement(selector as string) as HTMLTableElement || selector
    if (!mounted && isStr(selector))
      return mounted = true
    else if (isStr(selector))
      throw new Error(`${selector} is not a table`)
    const oo = generateArray(selector as HTMLTableElement)
    const ranges = oo[1]
    const data: any[] = oo[0]

    const wb = workbook()
    const ws: Record<string, any> = sheet_from_array_of_arrays(data)

    ws['!merges'] = ranges

    wb.SheetNames.push(sheetName)
    wb.Sheets[sheetName] = ws
    const bookType = (fileName.split('.')[1] || 'xlsx') as BookType
    const wbout = write(wb, {
      bookType,
      bookSST: false,
      type: 'binary',
    })

    saveAs(new Blob([s2ab(wbout)], {
      type: 'application/octet-stream',
    }), `${fileName.split('.')[0]}.${bookType}`)
  }
}

function generateArray(table: HTMLTableElement) {
  const out = []
  const rows = table.querySelectorAll('tr')
  const ranges = []
  for (let R = 0; R < rows.length; ++R) {
    const outRow = []
    const row = rows[R]
    const headers = row.querySelectorAll('th')
    if (headers.length) {
      out.push(Array.from(headers).reduce((result, header) => {
        result.push(header.innerText)
        return result
      }, [] as string[]))
      continue
    }

    const columns = row.querySelectorAll('td')
    for (let C = 0; C < columns.length; ++C) {
      const cell = columns[C]
      let colspan: number | string | null = cell.getAttribute('colspan')
      let rowspan: number | string | null = cell.getAttribute('rowspan')
      const cellValue = cell.innerText
      ranges.forEach((range) => {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c)
          for (let i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null)
      })
      if (rowspan || colspan) {
        rowspan = rowspan || 1
        colspan = colspan || 1
        ranges.push({
          s: {
            r: R,
            c: outRow.length,
          },
          e: {
            r: R + +rowspan - 1,
            c: outRow.length + +colspan - 1,
          },
        })
      }
      outRow.push(cellValue !== '' ? cellValue : null)
      if (colspan)
        for (let k = 0; k < +colspan - 1; ++k) outRow.push(null)
    }
    out.push(outRow)
  }
  return [out, ranges]
}
