/**
 * Blob转为url
 * @param { Blob } blob Blob
 * @returns url
 */
export function blobToUrl(blob: Blob) {
  return window.URL.createObjectURL(blob)
}
