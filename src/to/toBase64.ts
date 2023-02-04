import { createElement } from '../event/createElement'
import { isFile } from '../is/isFile'
import { isBlob } from '../is/isBlob'
import { isStr } from '../is/isStr'

/**
 * 转为base64格式
 * @param { File | string | Blob } o 传入类型 File | string | Blob
 * @returns
 */
export async function toBase64(
  o: File | string | Blob,
): Promise<Blob | string> {
  if (isFile(o) || isBlob(o))
    return await fileToBase64(o as File | Blob)
  else if (isStr(o))
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
        ctx?.drawImage(
          img,
          0,
          0,
          (canvas.width = img.width),
          (canvas.height = img.height),
        )
        resolve(canvas.toDataURL('image/png'))
      }
    }
    catch (error: any) {
      reject(new Error(error))
    }
  })
}
