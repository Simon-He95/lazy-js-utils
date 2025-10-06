/**
 * Convert a base64 data URL to a `Blob`.
 *
 * @param {string} s Base64 data URL (e.g. 'data:image/png;base64,...').
 * @returns {Blob} A Blob containing the decoded bytes.
 */
export function base64ToBlob(s: string): Blob {
  const arr = s.split(',')
  const mime = arr[0]?.match(/:(.*?);/)?.[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) u8arr[n] = bstr.charCodeAt(n)
  return new Blob([u8arr], { type: mime })
}
