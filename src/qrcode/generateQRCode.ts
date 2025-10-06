import QRCode from 'qrcode'
import { isElement } from '../is/isElement'

type Options<T, K> = T extends HTMLCanvasElement
  ? {
      errorCorrectionLevel: 'H'
    }
  : K extends true
    ? {
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
/**
 * 生成二维码
 * @param { string | HTMLCanvasElement } content 元素
 * @param { boolean } base64 生成base64格式
 * @param options
 * @returns
 * @description EN: Generate a QR code for content. If `content` is a canvas element it renders to it; if `base64` is true, returns a data URL; otherwise returns a string/terminal/svg depending on options.
 */
export function generateQRCode<
  T extends string | HTMLCanvasElement,
  K extends boolean,
>(content: T, base64?: K, options?: Options<T, K>) {
  return new Promise((resolve, reject) => {
    let type: 'toCanvas' | 'toString' | 'toDataURL'
    if (isElement(content))
      type = 'toCanvas'
    else if (base64)
      type = 'toDataURL'
    else type = 'toString'
    ;(QRCode as any)[type](content, options, (err: any, url: string) => {
      if (err)
        reject(err)
      resolve(url)
    })
  })
}
