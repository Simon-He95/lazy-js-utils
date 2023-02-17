import { fileToArrayBuffer } from './fileToArrayBuffer'

/**
 * File文件转为Blob
 * @param { File } file 文件
 * @returns Blob
 */
export async function fileToBlob(file: File) {
  const buffer = await fileToArrayBuffer(file)
  const blob = new Blob([buffer], { type: 'application/pdf;chartset=UTF-8' })
  return blob
}
