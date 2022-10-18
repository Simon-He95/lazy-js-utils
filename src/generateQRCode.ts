import { isElement } from './isElement'
const QRCode = require('qrcode')
type Options<T, K> = T extends HTMLCanvasElement ? {
  errorCorrectionLevel: 'H'
} : K extends true ? {
  errorCorrectionLevel?: 'H'
  type?: 'image/png' | 'image/jpeg' | 'image/webp'
  quality?: number
  margin?: number
  color?: {
    dark: string
    light: string
  }
}
  : {
      type?: 'terminal' | 'utf8' | 'svg'
    }

export function generateQRCode<T extends string | HTMLCanvasElement, K extends boolean>(content: T, base64?: K, options?: Options<T, K>) {
  return new Promise((resolve, reject) => {
    let type: 'toCanvas' | 'toString' | 'toDataURL'
    if (isElement(content))
      type = 'toCanvas'
    else if (base64)
      type = 'toDataURL'
    else
      type = 'toString'
    QRCode[type](content, options, (err: any, url: string) => {
      if (err)
        reject(err)
      resolve(url)
    })
  })
}
