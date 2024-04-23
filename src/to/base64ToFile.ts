/**
 *
 * @param { string } s base64
 * @param { string } filename 文件名
 * @returns File
 */
export function base64ToFile(s: string, filename: string): File {
  const arr = s.split(',')
  const mime = arr[0]?.match(/:(.*?);/)?.[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) u8arr[n] = bstr.charCodeAt(n)
  return new File([u8arr], filename, { type: mime })
}
