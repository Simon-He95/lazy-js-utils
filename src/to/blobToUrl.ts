/**
 * Create an object URL for a Blob.
 *
 * @param blob - Blob to create a URL for
 * @returns A blob URL that can be used as a src/href
 */
export function blobToUrl(blob: Blob) {
  return window.URL.createObjectURL(blob)
}
