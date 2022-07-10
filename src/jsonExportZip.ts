// import { saveAs } from 'file-saver'
// import JSZip from 'jszip'

// export interface exportZipOptions {
//   header: string[]
//   data?: any[][]
//   fileName?: string
// }

// export function jsonExportZip(options: exportZipOptions) {
//   const { fileName = 'file', header, data = [] } = options
//   const zip = new JSZip()
//   zip.file(`${fileName}.txt`, data.reduce((result, row) => result += `${row.toString()}\r\n`, `${header}\r\n`))
//   zip.generateAsync({
//     type: 'blob',
//   }).then((blob: any) => {
//     saveAs(blob, `${fileName}.zip`)
//   }, () => {
//     throw new Error('exportZip error')
//   })
// }
