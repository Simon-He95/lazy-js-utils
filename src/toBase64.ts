import { createElement } from './createElement'
import type { FileType } from './types'
export async function toBase64(o: File | string | Blob, type: FileType = 'url'): Promise<Blob | string> {
  if (type === 'file' || type === 'blob')
    return await fileToBase64(o as File | Blob)
  else if (type === 'url')
    return await urlToBase64(o as string)
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

export function urlToBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = createElement('img', {
        src: `${url}?timeStamp=${new Date().getTime()}`,
        crossOrigin: 'anonymous',
      })
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
