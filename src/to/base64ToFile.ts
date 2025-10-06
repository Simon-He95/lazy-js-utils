/**
 * Convert a base64 data URL to a File object.
 *
 * @param s - Base64 data URL (e.g. 'data:image/png;base64,...')
 * @param filename - Desired filename for the File
 * @returns A File built from the decoded base64 data
 */
export function base64ToFile(s: string, filename: string): File {
  const arr = s.split(',')
  if (arr.length < 2)
    throw new Error('Invalid base64 string')

  const mimeMatch = arr[0].match(/:(.*?);/)
  const mime = mimeMatch?.[1] ?? ''
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) u8arr[n] = bstr.charCodeAt(n)
  return new File([u8arr], filename, { type: mime })
}
