import { saveAs } from 'file-saver'
import { utils, write } from 'xlsx'
import type { BookType } from 'xlsx'
import { s2ab, sheet_from_array_of_arrays, workbook } from './common'

export interface exportExcelOptions {
  header: string[]
  data?: any[][]
  fileName?: string
  multiHeader?: string[]
  merges?: string[]
  autoWidth?: Boolean
  bookType?: BookType
  sheetName?: string
}

export type exportExcelType = 'json' | 'table'

export function jsonExportExcel(options: exportExcelOptions) {
  const {
    multiHeader = [],
    header = [],
    data = [],
    fileName = 'excel-list',
    merges = [],
    autoWidth = false,
    bookType = 'xlsx',
    sheetName = 'sheet1',
  } = options
  const _data = [header, ...data]

  for (let i = multiHeader.length - 1; i > -1; i--)
    data.unshift(multiHeader[i] as any)

  const wb = workbook()
  const ws = sheet_from_array_of_arrays(_data)

  if (merges.length > 0) {
    if (!ws['!merges'])
      ws['!merges'] = []
    merges.forEach((item) => {
      ws['!merges'].push(utils.decode_range(item))
    })
  }

  if (autoWidth) {
    const colWidth = data.map(row => row.map((val) => {
      if (val == null) {
        return {
          wch: 10,
        }
      }
      else if (val.toString().charCodeAt(0) > 255) {
        return {
          wch: val.toString().length * 2,
        }
      }
      else {
        return {
          wch: val.toString().length,
        }
      }
    }))
    const result = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j] && result[j].wch < colWidth[i][j].wch)
          result[j].wch = colWidth[i][j].wch
      }
    }
    ws['!cols'] = result
  }

  wb.SheetNames.push(sheetName)
  wb.Sheets[sheetName] = ws

  const wbout = write(wb, {
    bookType: bookType as BookType,
    bookSST: false,
    type: 'binary',
  })
  saveAs(new Blob([s2ab(wbout)], {
    type: 'application/octet-stream',
  }), `${fileName}.${bookType}`)
}

