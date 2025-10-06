import { createElement } from '../event/createElement'
import { isStr } from '../is/isStr'
import { uuid } from '../random/uuid'

interface Target {
  style?: string
  background?: string
  color?: string
  width?: number
  height?: number
}

interface IArrayToExcel {
  data: Record<string, any>[]
  filename?: string
  title?: string[]
  filter?: string[]
}

/**
 * Convert an array of objects into an Excel-compatible HTML table and
 * trigger a download as an .xls file.
 *
 * Each item may be a primitive value or an object with display metadata
 * (value, width, colspan, rowspan, style).
 *
 * @param options - Data and output options
 */
export function arrayToExcel(options: IArrayToExcel) {
  const { data, filename = uuid(), title, filter } = options
  if (!data)
    return
  const arrData = typeof data != 'object' ? JSON.parse(data) : data
  let excel = `<table><tr>${
    title
      ? title.map(item => `<th align='center'>${item}</th>`).join('')
      : Object.keys(arrData[0])
          .map((key) => {
            if (filter && filter.includes(key))
              return ''
            return `<th align='center'>${key}</th>`
          })
          .join('')
  }</tr>`
  for (let i = 0; i < arrData.length; i++) {
    let row = '<tr>'
    for (const index in arrData[i]) {
      if (filter) {
        if (!filter.includes(index)) {
          const target = arrData[i][index] == null ? '' : arrData[i][index]
          if (isStr(target)) {
            row += `<td>${target}</td>`
          }
          else {
            const { value, width, colspan = 0, rowspan = 0 } = target
            row += `<td width=${width} colspan=${colspan} rowspan=${rowspan} style="${generateStyle(
              target,
            )}">${value}</td>`
          }
        }
      }
      else {
        const target = arrData[i][index] == null ? '' : arrData[i][index]
        if (isStr(target)) {
          row += `<td align='center'>${target}</td>`
        }
        else {
          const { value, width, colspan = 0, rowspan = 0 } = target
          row += `<td align='center' width=${width} colspan=${colspan} rowspan=${rowspan} style="${generateStyle(
            target,
          )}">${value}</td>`
        }
      }
    }

    excel += `${row}</tr>`
  }
  excel += '</table>'
  createElement('a', {
    href: `data:application/vnd.ms-excel;charset=utf-8,${encodeURIComponent(
      generateHtml(excel),
    )}`,
    style: 'visibility:hidden',
    download: `${filename}.xls`,
  }).click()
}

function generateStyle(target: Target) {
  let result = ''
  const { style = '', background, color } = target
  if (background)
    result += `background:${background};`
  if (color)
    result += `color:${color};`
  return (result += style)
}

function generateHtml(excel: string) {
  return `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
  <meta http-equiv="content-type" content="application/vnd.ms-excel';charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>${excel}</body></html>`
}
