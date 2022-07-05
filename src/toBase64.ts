import { createElement } from './createElement'
import type { FileType } from './types'
export async function toBase64(o: File | string, type: FileType = 'url'): Promise<string> {
  if (type === 'file' || type === 'blob')
    return await fileToBase64(o as File | Blob) as string
  else if (type === 'url')
    return await urlToBase64(o as string) as string
  throw new Error('type must be file or blob or url')
}

export function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    try {
      reader.onload = function (e) {
        resolve(e?.target?.result as string)
      }
    }
    catch (error: any) {
      reject(new Error(error))
    }
  })
}

export function urlToBase64(url: string) {
  return new Promise((resolve, reject) => {
    try {
      const canvas: HTMLCanvasElement = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = createElement('img', {
        src: `${url}?timeStamp=${new Date().getTime()}`,
        crossOrigin: 'anonymous',
      }) as HTMLImageElement
      img.onload = function () {
        ctx?.drawImage(img, 0, 0, canvas.width = img.width, canvas.height = img.height)
        resolve(canvas.toDataURL('image/png'))
      }
    }
    catch (error: any) {
      reject(new Error(error))
    }
  })
}
