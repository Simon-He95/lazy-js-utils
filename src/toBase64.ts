import type { FileType } from './types'
export async function toBase64(o: File | string, type: FileType = 'url') {
  if (type === 'file' || type === 'blob')
    return await fileToBase64(o as File | Blob)
  else if (type === 'url')
    return await urlToBase64(o as string)
}

export function fileToBase64(file: File | Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    try {
      reader.onload = function (e) {
        resolve(e?.target?.result)
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
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = `${url}?timeStamp=${new Date().getTime()}`
      img.onload = function () {
        ctx?.drawImage(img, 0, 0, canvas.width = img.width, canvas.height = img.height)
        resolve(canvas.toDataURL())
      }
    }
    catch (error: any) {
      reject(new Error(error))
    }
  })
}
