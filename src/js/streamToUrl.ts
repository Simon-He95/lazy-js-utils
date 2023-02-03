import { toBase64 } from '../to/toBase64'
export async function streamToUrl(stream: ArrayBuffer) {
  return await toBase64(new Blob([stream], { type: 'image/*' }))
}
