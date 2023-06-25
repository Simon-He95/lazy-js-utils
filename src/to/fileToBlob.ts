import { fileToArrayBuffer } from './fileToArrayBuffer'

/**
 * File文件转为Blob
 * @param { File } file 文件
 * @returns Blob
 */
export async function fileToBlob(file: File, type: string = file.type) {
  const buffer = await fileToArrayBuffer(file)
  const blob = new Blob([buffer], { type })
  return blob
}
