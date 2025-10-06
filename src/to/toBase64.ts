import { createElement } from '../event/createElement'
import { isFile } from '../is/isFile'
import { isBlob } from '../is/isBlob'
import { isStr } from '../is/isStr'

/**
 * 转为base64格式
 * @param { File | string | Blob } o 传入类型 File | string | Blob
 * @returns { Promise<string> }
 */
/**
 * Convert a File/Blob or URL to a base64 data URL.
 *
 * If passed a File/Blob, it will be read as data URL. If passed a string it
 * will be treated as a remote URL and loaded into a canvas to extract a data
 * URL (subject to CORS).
 *
 * @param {File|string|Blob} o Input file/blob or URL.
 * @returns {Promise<string>} Base64 data URL.
 * @description EN: Convert a File/Blob or remote URL to a base64 data URL, using FileReader or drawing an image to canvas.
 */
export async function toBase64(o: File | string | Blob): Promise<string> {
  if (isFile(o) || isBlob(o))
    return await fileToBase64(o as File | Blob)
  else if (isStr(o))
    return await urlToBase64(o as string)
  throw new Error('type must be file or blob or url')
}

/**
 * Read a File/Blob and return a data URL (base64 string).
 * @param {File|Blob} file
 * @returns {Promise<string>}
 */
export function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    try {
      reader.onload = function () {
        resolve(reader.result as string)
      }
    }
    catch (error: any) {
      reject(new Error(error))
    }
  })
}

/**
 * Load an image from `url` and draw to canvas to return data URL (base64).
 * Note: this requires the image to be CORS-enabled for canvas access.
 *
 * @param {string} url Image URL.
 * @returns {Promise<string>} Base64 data URL.
 */
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
