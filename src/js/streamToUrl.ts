import { toBase64 } from '../to/toBase64'

/**
 * 将流文件转为base64
 * @param { ArrayBuffer } stream 流
 * @returns
 * @description EN: Convert an ArrayBuffer (binary stream) into a data URL (base64) using a Blob and helper.
 */
export async function streamToUrl(stream: ArrayBuffer) {
  return await toBase64(new Blob([stream], { type: 'image/*' }))
}
